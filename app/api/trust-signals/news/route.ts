// app/api/trust-signals/news/route.ts

import { NextResponse } from 'next/server';
import { fetchNews } from '@/app/services/trust-signals/news';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const limit = parseInt(searchParams.get('limit') || '20', 10);

  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
  }

  try {
    const result = await fetchNews(query, limit);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[News API] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
