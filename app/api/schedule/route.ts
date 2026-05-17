import { NextRequest, NextResponse } from 'next/server';
import { getTweetById, createScheduledPost, cancelScheduledPosts } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { tweetId, accountId, scheduledAt } = await req.json();

    if (!tweetId || typeof tweetId !== 'number') {
      return NextResponse.json({ error: 'Invalid tweetId' }, { status: 400 });
    }
    if (!accountId || typeof accountId !== 'string') {
      return NextResponse.json({ error: 'accountId is required — select an account first' }, { status: 400 });
    }
    if (!scheduledAt || typeof scheduledAt !== 'string') {
      return NextResponse.json({ error: 'Invalid scheduledAt' }, { status: 400 });
    }

    const scheduledDate = new Date(scheduledAt);
    if (isNaN(scheduledDate.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }
    if (scheduledDate <= new Date()) {
      return NextResponse.json({ error: 'Scheduled time must be in the future' }, { status: 400 });
    }

    const tweet = getTweetById(tweetId);
    if (!tweet) return NextResponse.json({ error: 'Tweet not found' }, { status: 404 });
    if (tweet.posted) return NextResponse.json({ error: 'This tweet has already been posted' }, { status: 400 });

    createScheduledPost(tweetId, accountId, scheduledAt);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { tweetId } = await req.json();
    if (!tweetId || typeof tweetId !== 'number') {
      return NextResponse.json({ error: 'Invalid tweetId' }, { status: 400 });
    }
    const cancelled = cancelScheduledPosts(tweetId);
    if (cancelled === 0) {
      return NextResponse.json({ error: 'No pending scheduled post found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, cancelled });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
