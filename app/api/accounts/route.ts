import { NextRequest, NextResponse } from 'next/server';
import { getAccounts, addAccount, removeAccount } from '@/lib/accounts';

export const dynamic = 'force-dynamic';

export async function GET() {
  const accounts = getAccounts().map(({ id, name }) => ({ id, name }));
  return NextResponse.json({ accounts });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, appKey, appSecret, accessToken, accessSecret } = body;

    if (!id || !name || !appKey || !appSecret || !accessToken || !accessSecret) {
      return NextResponse.json({ error: 'All six fields are required' }, { status: 400 });
    }

    if (!/^[a-z0-9_-]+$/.test(id)) {
      return NextResponse.json(
        { error: 'ID must be lowercase letters, numbers, hyphens, or underscores' },
        { status: 400 }
      );
    }

    addAccount({ id, name, appKey, appSecret, accessToken, accessSecret });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const removed = removeAccount(id);
    if (!removed) return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
