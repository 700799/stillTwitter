import Database from 'better-sqlite3';
import path from 'path';
import { allTweetData } from '../data';
import type { Tweet, ScheduledPost, Stats, SubjectStat } from '../types';

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
       ORDER BY sp.scheduled_at ASC`
    )
    .all() as (Omit<ScheduledPost, 'parts'> & { parts: string })[];
  return rows.map((r) => ({ ...r, parts: JSON.parse(r.parts) as string[] }));
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
