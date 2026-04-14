// app/api/intelligence/escalate/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // prevent static generation

export async function POST(req: Request) {
  try {
    const { scanContent, riskScore, reasons } = await req.json();

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials');
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert into priority_escalations table
    const { error } = await supabase.from('priority_escalations').insert({
      content: scanContent,
      risk_score: riskScore,
      reasons: reasons,
      created_at: new Date(),
      status: 'pending',
    });

    if (error) {
      console.error('Escalation insert error:', error);
      return NextResponse.json({ error: 'Failed to escalate' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
