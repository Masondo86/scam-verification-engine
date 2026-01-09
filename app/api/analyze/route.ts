import { NextResponse } from 'next/server';

import { rateLimit } from '@/app/lib/ratelimit';
import { calculateScore } from '@/app/services/scoring';
import { lookupWhois } from '@/app/services/whois';
import { analyzeSocialSignals } from '@/app/services/socialengineering';

export async function POST(req: Request) {
  try {
    // ---- Rate limiting (IP-based) ----
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0] ??
      '127.0.0.1';

    const { success } = await rateLimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.' },
        { status: 429 }
      );
    }

    // ---- Parse request ----
    const body = await req.json();
    const { input } = body;

    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    // ---- Intelligence gathering ----
    const whois = await lookupWhois(input);
    const social = await analyzeSocialSignals(input);

    // ---- Scoring (null-safe) ----
    const result = calculateScore({
      domainAge: whois?.domainAgeDays ?? undefined,
      blacklist: false, // placeholder (removed old blacklist engine)
      social: social.length,
    });

    // ---- Response ----
    return NextResponse.json({
      score: result.score,
      riskLevel: result.riskLevel,
      timeline: result.timeline,
      heatmap: result.heatmap,
      banks: result.banks,
    });
  } catch (error) {
    console.error('Analyze API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
