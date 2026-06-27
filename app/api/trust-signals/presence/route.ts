// app/api/trust-signals/presence/route.ts

import { NextResponse } from 'next/server';
import { checkPresence } from '@/app/services/trust-signals/presence';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const platformsParam = searchParams.get('platforms');

  if (!username) {
    return NextResponse.json({ error: 'Missing username parameter' }, { status: 400 });
  }

  const platforms = platformsParam ? platformsParam.split(',') : undefined;

  try {
    const result = await checkPresence(username, platforms);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[Presence API] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
