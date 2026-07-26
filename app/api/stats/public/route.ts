import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  // ---- SAST (UTC+2) timezone handling ----
  const now = new Date();
  // Get current SAST time by adding 2 hours to UTC
  const sastNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  // Get today's date in SAST
  const year = sastNow.getUTCFullYear();
  const month = sastNow.getUTCMonth();
  const day = sastNow.getUTCDate();
  // Create a UTC date representing midnight SAST (which is 22:00 UTC previous day)
  const todayStart = new Date(Date.UTC(year, month, day, 0, 0, 0));

  const weekStart = new Date(todayStart);
  weekStart.setUTCDate(weekStart.getUTCDate() - 7);

  console.log('[Stats] Today start (UTC):', todayStart.toISOString());
  console.log('[Stats] Week start (UTC):', weekStart.toISOString());

  // Count scans today (using UTC comparison)
  const { count: scansToday } = await supabase
    .from('scan_events')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', todayStart.toISOString());

  // Count high-risk this week
  const { count: highRiskThisWeek } = await supabase
    .from('scan_events')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', weekStart.toISOString())
    .eq('verdict', 'High');

  // Total scans
  const { count: totalScans } = await supabase
    .from('scan_events')
    .select('*', { count: 'exact', head: true });

  // Recent flagged domains (high-risk URL scans)
  const { data: recentHighRisk } = await supabase
    .from('scan_events')
    .select('input_text')
    .eq('verdict', 'High')
    .not('input_text', 'is', null)
    .order('created_at', { ascending: false })
    .limit(20);

  const domains = recentHighRisk
    ?.map(row => {
      const text = row.input_text || '';
      const match = text.match(/(?:https?:\/\/)?(?:www\.)?([a-z0-9-]+\.[a-z]{2,})/i);
      return match ? match[1] : null;
    })
    .filter(Boolean) as string[];

  const recentFlaggedDomains = [...new Set(domains)].slice(0, 5);

  const response = {
    scansToday: scansToday || 0,
    highRiskThisWeek: highRiskThisWeek || 0,
    totalScans: totalScans || 0,
    recentFlaggedDomains,
  };

  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}