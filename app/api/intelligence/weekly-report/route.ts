// app/api/intelligence/weekly-report/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  // Optional: protect with a cron secret
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Get scans from last 7 days
  const { data: scans } = await supabase
    .from('scan_events')
    .select('*')
    .gte('created_at', oneWeekAgo.toISOString());

  const totalScans = scans?.length || 0;

  // Aggregate top scam categories (based on matched_patterns or sector)
  const sectorCounts: Record<string, number> = {};
  scans?.forEach(scan => {
    const sector = scan.sector || 'unknown';
    sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
  });

  // Get new domains/phones from the last 7 days (from scam_indicators)
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

  // Optionally send email using Resend
  // await fetch('https://api.resend.com/emails', { ... });

  return NextResponse.json(report);
}
