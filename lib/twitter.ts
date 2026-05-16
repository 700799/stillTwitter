import { TwitterApi } from 'twitter-api-v2';

function getClient(): TwitterApi {
  const { TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET } =
    process.env;

  if (!TWITTER_API_KEY || !TWITTER_API_SECRET || !TWITTER_ACCESS_TOKEN || !TWITTER_ACCESS_SECRET) {
    throw new Error(
      'Twitter credentials not configured. Copy .env.local.example to .env.local and fill in your API keys.'
    );
  }

  return new TwitterApi({
    appKey: TWITTER_API_KEY,
    appSecret: TWITTER_API_SECRET,
    accessToken: TWITTER_ACCESS_TOKEN,
    accessSecret: TWITTER_ACCESS_SECRET,
  });
}

export async function postTweet(content: string): Promise<string> {
  const client = getClient();
  const result = await client.v2.tweet(content);
  return result.data.id;
}
