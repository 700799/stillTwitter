import { NextRequest, NextResponse } from 'next/server';
import { insertTweets } from '@/lib/db';
import type { TweetEntry } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Expected a JSON array of tweet entries' }, { status: 400 });
    }

    const entries: TweetEntry[] = [];
    const errors: string[] = [];

    for (let i = 0; i < body.length; i++) {
      const item = body[i];
      if (!item.subject || typeof item.subject !== 'string') {
        errors.push(`Entry ${i}: missing or invalid "subject"`);
        continue;
      }
      if (!item.category || typeof item.category !== 'string') {
        errors.push(`Entry ${i}: missing or invalid "category"`);
        continue;
      }
      if (!item.hook || typeof item.hook !== 'string') {
        errors.push(`Entry ${i}: missing or invalid "hook"`);
        continue;
      }
      if (!Array.isArray(item.parts) || item.parts.length === 0) {
        errors.push(`Entry ${i}: "parts" must be a non-empty array of strings`);
        continue;
      }
      const overlong = item.parts.findIndex((p: unknown) => typeof p !== 'string' || (p as string).length > 280);
      if (overlong !== -1) {
        errors.push(`Entry ${i}: parts[${overlong}] exceeds 280 characters`);
        continue;
      }
      entries.push({
        subject: item.subject,
        category: item.category,
        hook: item.hook,
        parts: item.parts as string[],
      });
    }

    if (errors.length > 0 && entries.length === 0) {
      return NextResponse.json({ error: 'All entries failed validation', details: errors }, { status: 400 });
    }

    insertTweets(entries);
    return NextResponse.json({ imported: entries.length, skipped: errors.length, details: errors });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
