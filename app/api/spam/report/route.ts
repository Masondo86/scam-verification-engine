import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getRateLimitKey, rateLimit } from '@/app/lib/ratelimit';

export const dynamic = 'force-dynamic';
const MAX_BODY_BYTES = 10_000;

function hashIp(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex');
}

export async function POST(req: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('[Spam Report] Missing Supabase credentials');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

  try {
    const contentLength = Number(req.headers.get('content-length'));
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request body too large' }, { status: 413 });
    }
    const chunks: Uint8Array[] = [];
    let bodyBytes = 0;
    if (req.body) {
      const reader = req.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bodyBytes += value.byteLength;
        if (bodyBytes > MAX_BODY_BYTES) {
          await reader.cancel();
          return NextResponse.json({ error: 'Request body too large' }, { status: 413 });
        }
        chunks.push(value);
      }
    }
    const bodyBuffer = new Uint8Array(bodyBytes);
    let bodyOffset = 0;
    for (const chunk of chunks) {
      bodyBuffer.set(chunk, bodyOffset);
      bodyOffset += chunk.byteLength;
    }
    const body = new TextDecoder().decode(bodyBuffer);
    let payload: unknown;
    try {
      payload = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: 'Type and content are required' }, { status: 400 });
    }
    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ error: 'Type and content are required' }, { status: 400 });
    }
    const { type, content } = payload as { type?: unknown; content?: unknown };

    // Validate input
    if (!type || !content || typeof type !== 'string' || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ error: 'Type and content are required' }, { status: 400 });
    }

    const allowedTypes = ['message', 'url', 'phone', 'loan'];
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

    const sharedLimit = await rateLimit.limit(getRateLimitKey('spam-report', req), 10, '1 d');
    if (sharedLimit.unavailable) {
      return NextResponse.json({ error: 'Rate limiting is temporarily unavailable' }, { status: 503 });
    }
    if (!sharedLimit.success) {
      return NextResponse.json({ error: 'You have reached the daily limit for reports. Please try again tomorrow.' }, { status: 429 });
    }

    // Get client IP
    const ip = process.env.VERCEL === '1'
      ? req.headers.get('x-vercel-forwarded-for')?.split(',')[0].trim() || ''
      : '';
    const ipHash = hashIp(ip);

    // The RPC serializes check-and-insert per IP in one database transaction.
    const { data: outcome, error: reportError } = await supabaseAdmin.rpc('submit_user_report', {
      p_type: type,
      p_content: content,
      p_ip_hash: ipHash,
    });

    if (reportError) {
      console.error('Report submission error:', reportError);
      return NextResponse.json({ error: 'Unable to submit report safely' }, { status: 503 });
    }
    if (outcome === 'duplicate') {
      return NextResponse.json(
        { error: 'You have already reported this item in the last 24 hours. Thank you for helping.' },
        { status: 429 }
      );
    }
    if (outcome === 'daily_limit') {
      return NextResponse.json(
        { error: 'You have reached the daily limit for reports. Please try again tomorrow.' },
        { status: 429 }
      );
    }
    if (outcome !== 'accepted') {
      console.error('Unexpected report submission outcome:', outcome);
      return NextResponse.json({ error: 'Unable to submit report safely' }, { status: 503 });
    }

    return NextResponse.json({ success: true, message: 'Thank you for reporting.' });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
