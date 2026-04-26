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
    const { type, content } = await req.json();

    // Validate input
    if (!type || !content || typeof type !== 'string' || typeof content !== 'string') {
      return NextResponse.json({ error: 'Type and content are required' }, { status: 400 });
    }

    const allowedTypes = ['message', 'url', 'phone'];
    if (!allowedTypes.includes(type)) {
      return NextResponse.json({ error: 'Invalid report type' }, { status: 400 });
    }

    // Optional: Validate phone number format (if type === 'phone')
    if (type === 'phone') {
      const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
      if (!phoneRegex.test(content.replace(/\s+/g, ''))) {
        return NextResponse.json({ error: 'Invalid South African phone number format' }, { status: 400 });
      }
    }

    // Get client IP
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '';
    const ipHash = hashIp(ip);

    // Rate limit: one report per (type, content) per IP per 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const { count: recentCount, error: countError } = await supabaseAdmin
      .from('user_reports')
      .select('*', { count: 'exact', head: true })
      .eq('type', type)
      .eq('content', content)
      .eq('ip_hash', ipHash)
      .gte('created_at', oneDayAgo.toISOString());

    if (countError) console.error('Rate limit check error:', countError);
    if (recentCount && recentCount >= 1) {
      return NextResponse.json(
        { error: 'You have already reported this item in the last 24 hours. Thank you for helping.' },
        { status: 429 }
      );
    }

    // Optional: enforce a daily global limit per IP (e.g., 10 reports/day)
    const { count: totalToday, error: totalError } = await supabaseAdmin
      .from('user_reports')
      .select('*', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', oneDayAgo.toISOString());

    if (totalError) console.error('Daily limit check error:', totalError);
    if (totalToday && totalToday >= 10) {
      return NextResponse.json(
        { error: 'You have reached the daily limit for reports. Please try again tomorrow.' },
        { status: 429 }
      );
    }

    // Insert the report
    const { error: insertError } = await supabaseAdmin
      .from('user_reports')
      .insert({
        type,
        content,
        ip_hash: ipHash,
        created_at: new Date(),
      });

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Thank you for reporting.' });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
