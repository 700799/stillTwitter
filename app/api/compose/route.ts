import { NextResponse } from 'next/server';
import { insertTweet, createScheduledPost, markPosted } from '@/lib/db';
import { postTweet } from '@/lib/twitter';

export async function POST(req: Request) {
  const body = await req.json();
  const { subject, category, hook, parts, action, scheduledAt, accountId } = body;

  if (!subject || typeof subject !== 'string') return NextResponse.json({ error: 'subject is required' }, { status: 400 });
  if (!category || typeof category !== 'string') return NextResponse.json({ error: 'category is required' }, { status: 400 });
  if (!hook || typeof hook !== 'string' || !hook.trim()) return NextResponse.json({ error: 'hook is required' }, { status: 400 });
  if (!Array.isArray(parts) || parts.length === 0) return NextResponse.json({ error: 'at least one part is required' }, { status: 400 });

  for (const p of parts as unknown[]) {
    if (typeof p !== 'string' || !p.trim()) return NextResponse.json({ error: 'Each part must be a non-empty string' }, { status: 400 });
    if ((p as string).length > 280) return NextResponse.json({ error: 'Each part must be ≤280 characters' }, { status: 400 });
  }

  if (action === 'schedule' && (!scheduledAt || !accountId)) {
    return NextResponse.json({ error: 'scheduledAt and accountId required for scheduling' }, { status: 400 });
  }
  if (action === 'post' && !accountId) {
    return NextResponse.json({ error: 'accountId required for posting' }, { status: 400 });
  }

  const tweetId = insertTweet({
    subject: subject.trim(),
    category: category.trim(),
    hook: hook.trim(),
    parts: (parts as string[]).map((p) => p.trim()),
  });

  if (action === 'schedule') {
    createScheduledPost(tweetId, accountId, scheduledAt);
  } else if (action === 'post') {
    try {
      const twitterId = await postTweet(parts as string[], accountId);
      markPosted(tweetId, twitterId);
    } catch (err) {
      return NextResponse.json({ error: String(err) }, { status: 500 });
    }
  }

  return NextResponse.json({ tweetId, success: true });
}
