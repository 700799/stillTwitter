import { NextResponse } from 'next/server';
import { getTweetById } from '@/lib/db';
import { optimizeTweet } from '@/lib/claude';

export async function POST(req: Request) {
  const { tweetId } = await req.json();
  if (!tweetId) return NextResponse.json({ error: 'tweetId required' }, { status: 400 });

  const tweet = getTweetById(Number(tweetId));
  if (!tweet) return NextResponse.json({ error: 'Tweet not found' }, { status: 404 });

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 503 });
  }

  try {
    const result = await optimizeTweet(
      tweet.hook,
      tweet.parts,
      tweet.subject,
      tweet.category,
      tweet.is_thread,
      tweet.part_count
    );
    return NextResponse.json({ result });
  } catch (e) {
    return NextResponse.json(
      { error: `Analysis failed: ${e instanceof Error ? e.message : String(e)}` },
      { status: 500 }
    );
  }
}
