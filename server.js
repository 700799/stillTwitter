const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const cron = require('node-cron');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

function loadAccounts() {
  const accountsPath = path.join(process.cwd(), 'data', 'accounts.json');
  if (!fs.existsSync(accountsPath)) return [];
  try {
    return JSON.parse(fs.readFileSync(accountsPath, 'utf-8'));
  } catch {
    return [];
  }
}

app.prepare().then(() => {
  const dbPath = path.join(process.cwd(), 'twitter_agent.db');

  cron.schedule('* * * * *', async () => {
    const db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    db.pragma('busy_timeout = 5000');
    const now = new Date().toISOString();

    try {
      const tableExists = db
        .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='scheduled_posts'")
        .get();
      if (!tableExists) { db.close(); return; }

      const due = db
        .prepare(
          `SELECT sp.id, sp.tweet_id, sp.account_id, t.parts
           FROM scheduled_posts sp
           JOIN tweets t ON t.id = sp.tweet_id
           WHERE sp.status = 'pending' AND sp.scheduled_at <= ?`
        )
        .all(now);

      if (due.length === 0) { db.close(); return; }

      const accounts = loadAccounts();
      const { TwitterApi } = require('twitter-api-v2');

      for (const post of due) {
        const account = accounts.find((a) => a.id === post.account_id);
        if (!account) {
          db.prepare("UPDATE scheduled_posts SET status='failed', error=? WHERE id=?")
            .run(`Account "${post.account_id}" not found in data/accounts.json`, post.id);
          continue;
        }

        const parts = JSON.parse(post.parts);
        const client = new TwitterApi({
          appKey: account.appKey,
          appSecret: account.appSecret,
          accessToken: account.accessToken,
          accessSecret: account.accessSecret,
        });

        try {
          let lastId;
          let firstId;
          for (const part of parts) {
            const result = await client.v2.tweet(
              part,
              lastId ? { reply: { in_reply_to_tweet_id: lastId } } : undefined
            );
            if (!firstId) firstId = result.data.id;
            lastId = result.data.id;
          }
          db.prepare("UPDATE scheduled_posts SET status='posted', twitter_id=? WHERE id=?")
            .run(firstId, post.id);
          db.prepare("UPDATE tweets SET posted=1, posted_at=datetime('now'), twitter_id=? WHERE id=?")
            .run(firstId, post.tweet_id);
          console.log(`[scheduler] Posted tweet ${post.tweet_id} via "${post.account_id}" => ${firstId}`);
        } catch (err) {
          const isRateLimit =
            String(err).includes('429') || String(err).toLowerCase().includes('rate limit');
          if (!isRateLimit) {
            db.prepare("UPDATE scheduled_posts SET status='failed', error=? WHERE id=?")
              .run(String(err), post.id);
            console.error(`[scheduler] Failed tweet ${post.tweet_id}:`, err);
          } else {
            console.warn(`[scheduler] Rate limited — will retry tweet ${post.tweet_id} next minute`);
          }
        }
      }
    } finally {
      db.close();
    }
  });

  // Daily news digest at 7 AM — triggers the Next.js API route so TypeScript runs
  cron.schedule('0 7 * * *', async () => {
    const http = require('http');
    const req = http.request(
      { hostname: 'localhost', port, path: '/api/admin/digest', method: 'POST' },
      (res) => { res.resume(); console.log(`[digest] Triggered — status ${res.statusCode}`); }
    );
    req.on('error', (e) => console.error('[digest] Cron trigger failed:', e));
    req.end();
  });

  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true);
    await handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    if (dev) console.log('> Scheduler active (checks every minute for scheduled tweets)');
  });
});
