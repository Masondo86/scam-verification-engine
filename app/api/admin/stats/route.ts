// app/api/admin/stats/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Server config error' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Get total scans count
  const { count: totalScans } = await supabase
    .from('scan_events')
    .select('*', { count: 'exact', head: true });

  // Get top 10 indicators
  const { data: topIndicators } = await supabase
    .from('scam_indicators')
    .select('*')
    .order('report_count', { ascending: false })
    .limit(10);

  return NextResponse.json({ totalScans, topIndicators });
}
