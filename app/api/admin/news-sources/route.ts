import { NextResponse } from 'next/server';
import { getAllSources, addSource } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const sources = getAllSources();
  return NextResponse.json({ sources });
}

export async function POST(req: Request) {
  const { name, url, category } = await req.json();
  if (!name || !url || !category) {
    return NextResponse.json({ error: 'name, url, and category are required' }, { status: 400 });
  }
  const id = addSource(String(name), String(url), String(category));
  return NextResponse.json({ id });
}
