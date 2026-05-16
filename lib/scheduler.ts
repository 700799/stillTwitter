import { getDb } from './db';
import { postTweet } from './twitter';

export async function checkAndPostScheduled(): Promise<void> {
  const db = getDb();
  const now = new Date().toISOString();

  const due = db
    .prepare(
      `SELECT sp.id, sp.tweet_id, t.content
       FROM scheduled_posts sp
       JOIN tweets t ON t.id = sp.tweet_id
       WHERE sp.status = 'pending' AND sp.scheduled_at <= ?`
    )
    .all(now) as { id: number; tweet_id: number; content: string }[];

  for (const post of due) {
    try {
      const twitterId = await postTweet(post.content);
      db.prepare("UPDATE scheduled_posts SET status='posted', twitter_id=? WHERE id=?").run(
        twitterId,
        post.id
      );
      db.prepare(
        "UPDATE tweets SET posted=1, posted_at=datetime('now'), twitter_id=? WHERE id=?"
      ).run(twitterId, post.tweet_id);
    } catch (err: unknown) {
      const isRateLimit =
        err instanceof Error && (err.message.includes('429') || err.message.includes('rate limit'));
      if (!isRateLimit) {
        db.prepare("UPDATE scheduled_posts SET status='failed', error=? WHERE id=?").run(
          String(err),
          post.id
        );
      }
    }
  }
}
