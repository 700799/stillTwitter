import Database from 'better-sqlite3';
import path from 'path';
import { allTweetData } from '../data';
import type { Tweet, ScheduledPost, Stats, SubjectStat, NewsSource, DigestArticle, NewsDigest } from '../types';

const DB_PATH = path.join(process.cwd(), 'twitter_agent.db');

declare global {
  // eslint-disable-next-line no-var
  var __db: Database.Database | undefined;
}

export function getDb(): Database.Database {
  if (!global.__db) {
    global.__db = new Database(DB_PATH);
    initDb(global.__db);
  }
  return global.__db;
}

function needsMigration(db: Database.Database): boolean {
  const info = db.prepare("PRAGMA table_info(tweets)").all() as { name: string }[];
  const cols = info.map((c) => c.name);
  return cols.includes('content') || !cols.includes('hook') || !cols.includes('parts');
}

function initDb(db: Database.Database): void {
  db.pragma('journal_mode = WAL');
  db.pragma('busy_timeout = 5000');

  // Drop old schema if it doesn't match new shape
  const tweetsExists = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='tweets'")
    .get();
  if (tweetsExists && needsMigration(db)) {
    db.exec('DROP TABLE IF EXISTS scheduled_posts; DROP TABLE IF EXISTS tweets;');
    global.__db = undefined;
    global.__db = db;
  }

  db.exec(`
    CREATE TABLE IF NOT EXISTS tweets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT NOT NULL,
      category TEXT NOT NULL,
      hook TEXT NOT NULL,
      parts TEXT NOT NULL,
      is_thread INTEGER DEFAULT 0,
      part_count INTEGER DEFAULT 1,
      posted INTEGER DEFAULT 0,
      posted_at TEXT,
      twitter_id TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS scheduled_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tweet_id INTEGER REFERENCES tweets(id),
      account_id TEXT NOT NULL,
      scheduled_at TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      twitter_id TEXT,
      error TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS news_sources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      url TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'General',
      active INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS news_digests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL UNIQUE,
      articles TEXT NOT NULL,
      email_sent INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  const count = (db.prepare('SELECT COUNT(*) as c FROM tweets').get() as { c: number }).c;
  if (count === 0) {
    const insert = db.prepare(
      'INSERT INTO tweets (subject, category, hook, parts, is_thread, part_count) VALUES (?, ?, ?, ?, ?, ?)'
    );
    const insertMany = db.transaction((entries: typeof allTweetData) => {
      for (const t of entries) {
        insert.run(
          t.subject,
          t.category,
          t.hook,
          JSON.stringify(t.parts),
          t.parts.length > 1 ? 1 : 0,
          t.parts.length
        );
      }
    });
    insertMany(allTweetData);
  }

  const sourceCount = (db.prepare('SELECT COUNT(*) as c FROM news_sources').get() as { c: number }).c;
  if (sourceCount === 0) {
    const ins = db.prepare('INSERT INTO news_sources (name, url, category, active) VALUES (?, ?, ?, ?)');
    const seedSources = db.transaction(() => {
      for (const s of SEED_SOURCES) ins.run(s.name, s.url, s.category, s.active);
    });
    seedSources();
  }
}

type RawTweet = Omit<Tweet, 'posted' | 'is_thread' | 'is_scheduled' | 'parts'> & {
  posted: number;
  is_thread: number;
  is_scheduled: number;
  parts: string;
  scheduled_at: string | null;
};

function hydrateTweet(raw: RawTweet): Tweet {
  return {
    ...raw,
    posted: raw.posted === 1,
    is_thread: raw.is_thread === 1,
    is_scheduled: raw.is_scheduled === 1,
    parts: JSON.parse(raw.parts) as string[],
  };
}

const SCHEDULED_SUBQUERY = `
  CASE WHEN EXISTS (
    SELECT 1 FROM scheduled_posts sp
    WHERE sp.tweet_id = t.id AND sp.status = 'pending'
  ) THEN 1 ELSE 0 END as is_scheduled,
  (SELECT sp2.scheduled_at FROM scheduled_posts sp2
   WHERE sp2.tweet_id = t.id AND sp2.status = 'pending'
   ORDER BY sp2.scheduled_at ASC LIMIT 1) as scheduled_at
`;

export function getTweets(params: { subject?: string } = {}): Tweet[] {
  const db = getDb();
  let sql = `SELECT t.*, ${SCHEDULED_SUBQUERY} FROM tweets t WHERE 1=1`;
  const args: string[] = [];
  if (params.subject) {
    sql += ' AND t.subject = ?';
    args.push(params.subject);
  }
  sql += ' ORDER BY t.id ASC';
  return (db.prepare(sql).all(...args) as RawTweet[]).map(hydrateTweet);
}

export function getTweetById(id: number): Tweet | undefined {
  const db = getDb();
  const raw = db
    .prepare(`SELECT t.*, ${SCHEDULED_SUBQUERY} FROM tweets t WHERE t.id = ?`)
    .get(id) as RawTweet | undefined;
  return raw ? hydrateTweet(raw) : undefined;
}

export function getStats(): Stats {
  const db = getDb();
  const total = (db.prepare('SELECT COUNT(*) as c FROM tweets').get() as { c: number }).c;
  const posted = (db.prepare('SELECT COUNT(*) as c FROM tweets WHERE posted = 1').get() as { c: number }).c;
  const scheduled = (
    db.prepare("SELECT COUNT(*) as c FROM scheduled_posts WHERE status = 'pending'").get() as { c: number }
  ).c;
  return { total, posted, pending: total - posted, scheduled };
}

export function getSubjectStats(): SubjectStat[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT subject as name, COUNT(*) as total, SUM(posted) as posted
       FROM tweets GROUP BY subject ORDER BY subject ASC`
    )
    .all() as SubjectStat[];
}

export function markPosted(tweetId: number, twitterId: string): void {
  const db = getDb();
  db.prepare(
    "UPDATE tweets SET posted = 1, posted_at = datetime('now'), twitter_id = ? WHERE id = ?"
  ).run(twitterId, tweetId);
}

export function createScheduledPost(tweetId: number, accountId: string, scheduledAt: string): void {
  const db = getDb();
  db.prepare(
    'INSERT INTO scheduled_posts (tweet_id, account_id, scheduled_at) VALUES (?, ?, ?)'
  ).run(tweetId, accountId, scheduledAt);
}

export function cancelScheduledPosts(tweetId: number): number {
  const db = getDb();
  const result = db
    .prepare("DELETE FROM scheduled_posts WHERE tweet_id = ? AND status = 'pending'")
    .run(tweetId);
  return result.changes;
}

export function getScheduledPosts(): ScheduledPost[] {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT sp.*, t.hook, t.subject, t.category, t.parts
       FROM scheduled_posts sp JOIN tweets t ON t.id = sp.tweet_id
       WHERE sp.status IN ('pending', 'failed')
       ORDER BY sp.scheduled_at ASC`
    )
    .all() as (Omit<ScheduledPost, 'parts'> & { parts: string })[];
  return rows.map((r) => ({ ...r, parts: JSON.parse(r.parts) as string[] }));
}

export function retryScheduledPost(scheduledId: number): void {
  const soon = new Date(Date.now() + 60_000).toISOString();
  getDb()
    .prepare("UPDATE scheduled_posts SET status='pending', error=NULL, scheduled_at=? WHERE id=?")
    .run(soon, scheduledId);
}

export function deleteScheduledPost(scheduledId: number): void {
  getDb().prepare('DELETE FROM scheduled_posts WHERE id=?').run(scheduledId);
}

// ── News Sources ────────────────────────────────────────────────────────────

const SEED_SOURCES: { name: string; url: string; category: string; active: number }[] = [
  { name: 'NPR News', url: 'https://feeds.npr.org/1001/rss.xml', category: 'National', active: 1 },
  { name: 'AP Top News', url: 'https://feeds.apnews.com/rss/topnews', category: 'National', active: 1 },
  { name: 'New York – Google News', url: 'https://news.google.com/rss/search?q=%22New+York%22+local+news&hl=en-US&gl=US&ceid=US:en', category: 'Northeast', active: 0 },
  { name: 'Boston – Google News', url: 'https://news.google.com/rss/search?q=%22Boston%22+local+news&hl=en-US&gl=US&ceid=US:en', category: 'Northeast', active: 0 },
  { name: 'Philadelphia – Google News', url: 'https://news.google.com/rss/search?q=%22Philadelphia%22+local+news&hl=en-US&gl=US&ceid=US:en', category: 'Northeast', active: 0 },
  { name: 'Miami – Google News', url: 'https://news.google.com/rss/search?q=%22Miami%22+local+news&hl=en-US&gl=US&ceid=US:en', category: 'Southeast', active: 0 },
  { name: 'Atlanta – Google News', url: 'https://news.google.com/rss/search?q=%22Atlanta%22+local+news&hl=en-US&gl=US&ceid=US:en', category: 'Southeast', active: 0 },
  { name: 'Charlotte – Google News', url: 'https://news.google.com/rss/search?q=%22Charlotte%22+local+news&hl=en-US&gl=US&ceid=US:en', category: 'Southeast', active: 0 },
  { name: 'Nashville – Google News', url: 'https://news.google.com/rss/search?q=%22Nashville%22+local+news&hl=en-US&gl=US&ceid=US:en', category: 'Southeast', active: 0 },
  { name: 'Chicago – Google News', url: 'https://news.google.com/rss/search?q=%22Chicago%22+local+news&hl=en-US&gl=US&ceid=US:en', category: 'Midwest', active: 0 },
  { name: 'Detroit – Google News', url: 'https://news.google.com/rss/search?q=%22Detroit%22+local+news&hl=en-US&gl=US&ceid=US:en', category: 'Midwest', active: 0 },
  { name: 'Minneapolis – Google News', url: 'https://news.google.com/rss/search?q=%22Minneapolis%22+local+news&hl=en-US&gl=US&ceid=US:en', category: 'Midwest', active: 0 },
  { name: 'Columbus OH – Google News', url: 'https://news.google.com/rss/search?q=%22Columbus%22+Ohio+local+news&hl=en-US&gl=US&ceid=US:en', category: 'Midwest', active: 0 },
  { name: 'Houston – Google News', url: 'https://news.google.com/rss/search?q=%22Houston%22+local+news&hl=en-US&gl=US&ceid=US:en', category: 'Southwest', active: 0 },
  { name: 'Dallas – Google News', url: 'https://news.google.com/rss/search?q=%22Dallas%22+local+news&hl=en-US&gl=US&ceid=US:en', category: 'Southwest', active: 0 },
  { name: 'San Antonio – Google News', url: 'https://news.google.com/rss/search?q=%22San+Antonio%22+local+news&hl=en-US&gl=US&ceid=US:en', category: 'Southwest', active: 0 },
  { name: 'Austin – Google News', url: 'https://news.google.com/rss/search?q=%22Austin%22+Texas+local+news&hl=en-US&gl=US&ceid=US:en', category: 'Southwest', active: 0 },
  { name: 'Phoenix – Google News', url: 'https://news.google.com/rss/search?q=%22Phoenix%22+Arizona+local+news&hl=en-US&gl=US&ceid=US:en', category: 'Southwest', active: 0 },
  { name: 'Los Angeles – Google News', url: 'https://news.google.com/rss/search?q=%22Los+Angeles%22+local+news&hl=en-US&gl=US&ceid=US:en', category: 'West', active: 0 },
  { name: 'San Francisco – Google News', url: 'https://news.google.com/rss/search?q=%22San+Francisco%22+Bay+Area+news&hl=en-US&gl=US&ceid=US:en', category: 'West', active: 0 },
  { name: 'Seattle – Google News', url: 'https://news.google.com/rss/search?q=%22Seattle%22+local+news&hl=en-US&gl=US&ceid=US:en', category: 'West', active: 0 },
  { name: 'San Diego – Google News', url: 'https://news.google.com/rss/search?q=%22San+Diego%22+local+news&hl=en-US&gl=US&ceid=US:en', category: 'West', active: 0 },
  { name: 'Denver – Google News', url: 'https://news.google.com/rss/search?q=%22Denver%22+Colorado+local+news&hl=en-US&gl=US&ceid=US:en', category: 'West', active: 0 },
  { name: 'Portland OR – Google News', url: 'https://news.google.com/rss/search?q=%22Portland%22+Oregon+local+news&hl=en-US&gl=US&ceid=US:en', category: 'West', active: 0 },
  { name: 'Las Vegas – Google News', url: 'https://news.google.com/rss/search?q=%22Las+Vegas%22+local+news&hl=en-US&gl=US&ceid=US:en', category: 'West', active: 0 },
];

type RawNewsSource = Omit<NewsSource, 'active'> & { active: number };

export function getAllSources(): NewsSource[] {
  const rows = getDb().prepare('SELECT * FROM news_sources ORDER BY category ASC, name ASC').all() as RawNewsSource[];
  return rows.map((r) => ({ ...r, active: r.active === 1 }));
}

export function getActiveSources(): NewsSource[] {
  const rows = getDb().prepare('SELECT * FROM news_sources WHERE active = 1 ORDER BY name ASC').all() as RawNewsSource[];
  return rows.map((r) => ({ ...r, active: true }));
}

export function toggleSourceActive(id: number): void {
  getDb().prepare('UPDATE news_sources SET active = CASE WHEN active = 1 THEN 0 ELSE 1 END WHERE id = ?').run(id);
}

export function deleteSource(id: number): void {
  getDb().prepare('DELETE FROM news_sources WHERE id = ?').run(id);
}

export function addSource(name: string, url: string, category: string): number {
  const result = getDb()
    .prepare('INSERT INTO news_sources (name, url, category, active) VALUES (?, ?, ?, 1)')
    .run(name, url, category);
  return result.lastInsertRowid as number;
}

// ── News Digests ─────────────────────────────────────────────────────────────

type RawDigest = Omit<NewsDigest, 'articles' | 'email_sent'> & { articles: string; email_sent: number };

function hydrateDigest(raw: RawDigest): NewsDigest {
  return { ...raw, articles: JSON.parse(raw.articles) as DigestArticle[], email_sent: raw.email_sent === 1 };
}

export function saveDigest(date: string, articles: DigestArticle[]): void {
  getDb()
    .prepare('INSERT OR REPLACE INTO news_digests (date, articles) VALUES (?, ?)')
    .run(date, JSON.stringify(articles));
}

export function getDigestByDate(date: string): NewsDigest | null {
  const row = getDb().prepare('SELECT * FROM news_digests WHERE date = ?').get(date) as RawDigest | undefined;
  return row ? hydrateDigest(row) : null;
}

export function getLatestDigest(): NewsDigest | null {
  const row = getDb().prepare('SELECT * FROM news_digests ORDER BY date DESC LIMIT 1').get() as RawDigest | undefined;
  return row ? hydrateDigest(row) : null;
}

export function markDigestEmailSent(date: string): void {
  getDb().prepare('UPDATE news_digests SET email_sent = 1 WHERE date = ?').run(date);
}

// ── Tweet helpers ─────────────────────────────────────────────────────────────

export function updateTweetHook(id: number, hook: string): void {
  getDb().prepare('UPDATE tweets SET hook = ? WHERE id = ?').run(hook, id);
}

export function insertTweet(entry: typeof allTweetData[number]): number {
  const db = getDb();
  const result = db
    .prepare('INSERT INTO tweets (subject, category, hook, parts, is_thread, part_count) VALUES (?, ?, ?, ?, ?, ?)')
    .run(
      entry.subject,
      entry.category,
      entry.hook,
      JSON.stringify(entry.parts),
      entry.parts.length > 1 ? 1 : 0,
      entry.parts.length
    );
  return result.lastInsertRowid as number;
}

export function insertTweets(entries: typeof allTweetData): number {
  const db = getDb();
  const insert = db.prepare(
    'INSERT INTO tweets (subject, category, hook, parts, is_thread, part_count) VALUES (?, ?, ?, ?, ?, ?)'
  );
  const insertMany = db.transaction((items: typeof allTweetData) => {
    for (const t of items) {
      insert.run(
        t.subject,
        t.category,
        t.hook,
        JSON.stringify(t.parts),
        t.parts.length > 1 ? 1 : 0,
        t.parts.length
      );
    }
  });
  insertMany(entries);
  return entries.length;
}
