import Database from 'better-sqlite3';
import path from 'path';
import { tweetData } from '../data/tweets';
import type { Tweet, ScheduledPost, Stats } from '../types';

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

function initDb(db: Database.Database): void {
  db.pragma('journal_mode = WAL');
  db.pragma('busy_timeout = 5000');
  db.exec(`
    CREATE TABLE IF NOT EXISTS tweets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      char_count INTEGER NOT NULL,
      posted INTEGER DEFAULT 0,
      posted_at TEXT,
      twitter_id TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS scheduled_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tweet_id INTEGER REFERENCES tweets(id),
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
      'INSERT INTO tweets (content, category, char_count) VALUES (?, ?, ?)'
    );
    const insertMany = db.transaction((tweets: typeof tweetData) => {
      for (const t of tweets) {
        insert.run(t.content, t.category, t.content.length);
      }
    });
    insertMany(tweetData);
  }
}

type RawTweet = Omit<Tweet, 'posted' | 'is_scheduled'> & {
  posted: number;
  is_scheduled: number;
};

function hydrateTweet(raw: RawTweet): Tweet {
  return { ...raw, posted: raw.posted === 1, is_scheduled: raw.is_scheduled === 1 };
}

export function getTweets(): Tweet[] {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT t.*,
        CASE WHEN EXISTS (
          SELECT 1 FROM scheduled_posts sp
          WHERE sp.tweet_id = t.id AND sp.status = 'pending'
        ) THEN 1 ELSE 0 END as is_scheduled,
        (SELECT sp2.scheduled_at FROM scheduled_posts sp2
         WHERE sp2.tweet_id = t.id AND sp2.status = 'pending'
         ORDER BY sp2.scheduled_at ASC LIMIT 1) as scheduled_at
       FROM tweets t
       ORDER BY t.id ASC`
    )
    .all() as RawTweet[];
  return rows.map(hydrateTweet);
}

export function getTweetById(id: number): Tweet | undefined {
  const db = getDb();
  const raw = db
    .prepare(
      `SELECT t.*,
        CASE WHEN EXISTS (
          SELECT 1 FROM scheduled_posts sp
          WHERE sp.tweet_id = t.id AND sp.status = 'pending'
        ) THEN 1 ELSE 0 END as is_scheduled,
        (SELECT sp2.scheduled_at FROM scheduled_posts sp2
         WHERE sp2.tweet_id = t.id AND sp2.status = 'pending'
         ORDER BY sp2.scheduled_at ASC LIMIT 1) as scheduled_at
       FROM tweets t WHERE t.id = ?`
    )
    .get(id) as RawTweet | undefined;
  return raw ? hydrateTweet(raw) : undefined;
}

export function getStats(): Stats {
  const db = getDb();
  const total = (db.prepare('SELECT COUNT(*) as c FROM tweets').get() as { c: number }).c;
  const posted = (
    db.prepare('SELECT COUNT(*) as c FROM tweets WHERE posted = 1').get() as { c: number }
  ).c;
  const scheduled = (
    db
      .prepare("SELECT COUNT(*) as c FROM scheduled_posts WHERE status = 'pending'")
      .get() as { c: number }
  ).c;
  return { total, posted, pending: total - posted, scheduled };
}

export function markPosted(tweetId: number, twitterId: string): void {
  const db = getDb();
  db.prepare('UPDATE tweets SET posted = 1, posted_at = datetime(\'now\'), twitter_id = ? WHERE id = ?').run(
    twitterId,
    tweetId
  );
}

export function createScheduledPost(tweetId: number, scheduledAt: string): void {
  const db = getDb();
  db.prepare(
    "INSERT INTO scheduled_posts (tweet_id, scheduled_at) VALUES (?, ?)"
  ).run(tweetId, scheduledAt);
}

export function cancelScheduledPosts(tweetId: number): number {
  const db = getDb();
  const result = db
    .prepare("DELETE FROM scheduled_posts WHERE tweet_id = ? AND status = 'pending'")
    .run(tweetId);
  return result.changes;
}

export function getScheduledPosts(): (ScheduledPost & { content: string; category: string })[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT sp.*, t.content, t.category
       FROM scheduled_posts sp
       JOIN tweets t ON t.id = sp.tweet_id
       ORDER BY sp.scheduled_at ASC`
    )
    .all() as (ScheduledPost & { content: string; category: string })[];
}
