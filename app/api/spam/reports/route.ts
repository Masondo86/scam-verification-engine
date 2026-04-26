import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function hashIp(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex');
}

export async function POST(req: Request) {
  try {
    const { phoneNumber } = await req.json();

    if (!phoneNumber || typeof phoneNumber !== 'string') {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s+/g, ''))) {
      return NextResponse.json({ error: 'Invalid South African phone number format' }, { status: 400 });
    }

    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '';
    const ipHash = hashIp(ip);

    // ---------- RATE LIMIT: 1 report per number per IP per 24 hours ----------
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const { count: recentCount, error: countError } = await supabaseAdmin
      .from('spam_reports')
      .select('*', { count: 'exact', head: true })
      .eq('phone_number', phoneNumber)
      .eq('ip_hash', ipHash)
      .gte('created_at', oneDayAgo.toISOString());

    if (countError) {
      console.error('Rate limit check error:', countError);
      // Proceed but log – fail open
    }

    if (recentCount && recentCount >= 1) {
      return NextResponse.json(
        { error: 'You have already reported this number in the last 24 hours. Thank you for helping.' },
        { status: 429 }
      );
    }

    // Optional: also enforce a global daily limit per IP (e.g., max 10 reports/day)
    const { count: totalToday, error: totalError } = await supabaseAdmin
      .from('spam_reports')
      .select('*', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', oneDayAgo.toISOString());

    if (totalError) console.error('Daily limit check error:', totalError);
    if (totalToday && totalToday >= 10) {
      return NextResponse.json(
        { error: 'You have reached the daily limit for spam reports. Please try again tomorrow.' },
        { status: 429 }
      );
    }

    // Insert the report
    const { error: insertError } = await supabaseAdmin
      .from('spam_reports')
      .insert({
        phone_number: phoneNumber,
        ip_hash: ipHash,
        created_at: new Date(),
      });

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Thank you for reporting spam.' });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
