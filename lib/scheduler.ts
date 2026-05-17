import { getDb, markPosted } from './db';
import { postTweet } from './twitter';
import { getAccounts } from './accounts';

export async function checkAndPostScheduled(): Promise<void> {
  const db = getDb();
  const now = new Date().toISOString();

  const due = db
    .prepare(
      `SELECT sp.id, sp.tweet_id, sp.account_id, t.parts
       FROM scheduled_posts sp JOIN tweets t ON t.id = sp.tweet_id
       WHERE sp.status = 'pending' AND sp.scheduled_at <= ?`
    )
    .all(now) as { id: number; tweet_id: number; account_id: string; parts: string }[];

  const accounts = getAccounts();

  for (const post of due) {
    const account = accounts.find((a) => a.id === post.account_id);
    if (!account) {
      db.prepare("UPDATE scheduled_posts SET status='failed', error=? WHERE id=?")
        .run(`Account "${post.account_id}" not found`, post.id);
      continue;
    }

    const parts = JSON.parse(post.parts) as string[];
    try {
      const twitterId = await postTweet(parts, post.account_id);
      db.prepare("UPDATE scheduled_posts SET status='posted', twitter_id=? WHERE id=?")
        .run(twitterId, post.id);
      markPosted(post.tweet_id, twitterId);
    } catch (err) {
      const isRateLimit =
        String(err).includes('429') || String(err).toLowerCase().includes('rate limit');
      if (!isRateLimit) {
        db.prepare("UPDATE scheduled_posts SET status='failed', error=? WHERE id=?")
          .run(String(err), post.id);
      }
    }
  }
}
