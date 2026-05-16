import { NextRequest, NextResponse } from 'next/server';
import { getTweetById, markPosted } from '@/lib/db';
import { postTweet } from '@/lib/twitter';

export async function POST(req: NextRequest) {
  try {
    const { tweetId } = await req.json();

    if (!tweetId || typeof tweetId !== 'number') {
      return NextResponse.json({ error: 'Invalid tweetId' }, { status: 400 });
    }

    const tweet = getTweetById(tweetId);
    if (!tweet) {
      return NextResponse.json({ error: 'Tweet not found' }, { status: 404 });
    }
    if (tweet.posted) {
      return NextResponse.json({ error: 'This tweet has already been posted' }, { status: 400 });
    }
    if (tweet.char_count > 280) {
      return NextResponse.json({ error: 'Tweet exceeds 280 characters' }, { status: 400 });
    }

    const twitterId = await postTweet(tweet.content);
    markPosted(tweetId, twitterId);

    return NextResponse.json({ success: true, twitterId });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
