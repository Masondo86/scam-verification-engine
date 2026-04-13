// app/api/intelligence/weekly-report/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Prevent static generation of this API route
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  // 1. Check cron secret (optional but recommended)
  const authHeader = req.headers.get('authorization');
  const expectedSecret = process.env.CRON_SECRET;
  if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 2. Lazy init Supabase client (inside handler)
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    return NextResponse.json({ error: 'Server config error' }, { status: 500 });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Get scans from last 7 days
  const { data: scans } = await supabase
    .from('scan_events')
    .select('*')
    .gte('created_at', oneWeekAgo.toISOString());

  const totalScans = scans?.length || 0;

  // Aggregate top scam categories (based on sector)
  const sectorCounts: Record<string, number> = {};
  scans?.forEach(scan => {
    const sector = scan.sector || 'unknown';
    sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
  });

  // Get new indicators from last 7 days
  const { data: newIndicators } = await supabase
    .from('scam_indicators')
    .select('indicator_type, indicator_value, report_count, first_seen')
    .gte('first_seen', oneWeekAgo.toISOString())
    .order('report_count', { ascending: false })
    .limit(20);

  const report = {
    week_start: oneWeekAgo.toISOString().slice(0, 10),
    total_scans: totalScans,
    top_scam_categories: Object.entries(sectorCounts).map(([sector, count]) => ({ sector, count })),
    new_indicators: newIndicators,
  };

  return NextResponse.json(report);
}
