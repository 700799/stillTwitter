import { TwitterApi } from 'twitter-api-v2';
import { getAccount } from './accounts';

export async function postTweet(parts: string[], accountId: string): Promise<string> {
  const account = getAccount(accountId);
  if (!account) {
    throw new Error(
      `Twitter account "${accountId}" not found. Add it via the Accounts panel.`
    );
  }

  const client = new TwitterApi({
    appKey: account.appKey,
    appSecret: account.appSecret,
    accessToken: account.accessToken,
    accessSecret: account.accessSecret,
  });

  if (parts.length === 1) {
    const result = await client.v2.tweet(parts[0]);
    return result.data.id;
  }

  // Post as a thread — each part replies to the previous
  let lastId: string | undefined;
  let firstId: string | undefined;
  for (const part of parts) {
    const result = await client.v2.tweet(
      part,
      lastId ? { reply: { in_reply_to_tweet_id: lastId } } : undefined
    );
    if (!firstId) firstId = result.data.id;
    lastId = result.data.id;
  }
  return firstId!;
}
