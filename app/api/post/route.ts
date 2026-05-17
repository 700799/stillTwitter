import { NextRequest, NextResponse } from 'next/server';
import { postTweet } from '@/lib/twitter';
import { getTweetById, markPosted } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { tweetId, accountId } = await req.json();

    if (!tweetId || typeof tweetId !== 'number') {
      return NextResponse.json({ error: 'Invalid tweetId' }, { status: 400 });
    }
    if (!accountId || typeof accountId !== 'string') {
      return NextResponse.json({ error: 'accountId is required — select an account first' }, { status: 400 });
    }

    const tweet = getTweetById(tweetId);
    if (!tweet) return NextResponse.json({ error: 'Tweet not found' }, { status: 404 });
    if (tweet.posted) return NextResponse.json({ error: 'This tweet has already been posted' }, { status: 400 });

    const twitterId = await postTweet(tweet.parts, accountId);
    markPosted(tweetId, twitterId);

    return NextResponse.json({ success: true, twitterId });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
