const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const cron = require('node-cron');
const Database = require('better-sqlite3');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const dbPath = path.join(process.cwd(), 'twitter_agent.db');

  cron.schedule('* * * * *', async () => {
    const db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    db.pragma('busy_timeout = 5000');
    const now = new Date().toISOString();

    try {
      const due = db
        .prepare(
          `SELECT sp.id, sp.tweet_id, t.content
           FROM scheduled_posts sp
           JOIN tweets t ON t.id = sp.tweet_id
           WHERE sp.status = 'pending' AND sp.scheduled_at <= ?`
        )
        .all(now);

      if (due.length === 0) {
        db.close();
        return;
      }

      const {
        TWITTER_API_KEY,
        TWITTER_API_SECRET,
        TWITTER_ACCESS_TOKEN,
        TWITTER_ACCESS_SECRET,
      } = process.env;

      if (!TWITTER_API_KEY || !TWITTER_API_SECRET || !TWITTER_ACCESS_TOKEN || !TWITTER_ACCESS_SECRET) {
        console.warn('[scheduler] Twitter credentials not set — skipping scheduled posts');
        db.close();
        return;
      }

      const { TwitterApi } = require('twitter-api-v2');

      for (const post of due) {
        try {
          const client = new TwitterApi({
            appKey: TWITTER_API_KEY,
            appSecret: TWITTER_API_SECRET,
            accessToken: TWITTER_ACCESS_TOKEN,
            accessSecret: TWITTER_ACCESS_SECRET,
          });
          const result = await client.v2.tweet(post.content);
          const twitterId = result.data.id;
          db.prepare("UPDATE scheduled_posts SET status='posted', twitter_id=? WHERE id=?").run(
            twitterId,
            post.id
          );
          db.prepare(
            "UPDATE tweets SET posted=1, posted_at=datetime('now'), twitter_id=? WHERE id=?"
          ).run(twitterId, post.tweet_id);
          console.log(`[scheduler] Posted tweet ${post.tweet_id} → twitter id ${twitterId}`);
        } catch (err) {
          const isRateLimit = String(err).includes('429') || String(err).toLowerCase().includes('rate limit');
          if (!isRateLimit) {
            db.prepare("UPDATE scheduled_posts SET status='failed', error=? WHERE id=?").run(
              String(err),
              post.id
            );
            console.error(`[scheduler] Failed to post tweet ${post.tweet_id}:`, err);
          } else {
            console.warn(`[scheduler] Rate limited — will retry tweet ${post.tweet_id} next minute`);
          }
        }
      }
    } finally {
      db.close();
    }
  });

  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true);
    await handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    if (dev) console.log('> Scheduler running (checks every minute for scheduled tweets)');
  });
});
