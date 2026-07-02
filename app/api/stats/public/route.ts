import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY! // anon key is safe for public stats
  );

  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const weekStart = new Date(now);
  weekStart.setDate(weekStart.getDate() - 7);

  // Count scans today
  const { count: scamsToday } = await supabase
    .from('scan_events')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', todayStart.toISOString());

  // Count high-risk this week
  const { count: highRiskThisWeek } = await supabase
    .from('scan_events')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', weekStart.toISOString())
    .eq('verdict', 'High');

  // Total scans (capped for display)
  const { count: totalScans } = await supabase
    .from('scan_events')
    .select('*', { count: 'exact', head: true });

  // Recent flagged domains (high-risk URL scans with domain extracted)
  const { data: recentHighRisk } = await supabase
    .from('scan_events')
    .select('input_text, created_at')
    .eq('verdict', 'High')
    .not('urls_detected', 'is', null)
    .order('created_at', { ascending: false })
    .limit(10);

  // Extract domains from input_text (simplified)
  const domains = recentHighRisk
    ?.map(row => {
      const url = row.input_text;
      try {
        const domain = new URL(url).hostname;
        return domain;
      } catch {
        // If not a valid URL, try to extract from text
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?([a-z0-9-]+\.[a-z]{2,})/i);
        return match ? match[1] : null;
      }
    })
    .filter(Boolean) as string[];

  // Remove duplicates, keep first 5
  const recentFlaggedDomains = [...new Set(domains)].slice(0, 5);

  return NextResponse.json({
    scamsToday: scamsToday || 0,
    highRiskThisWeek: highRiskThisWeek || 0,
    totalScans: totalScans || 0,
    recentFlaggedDomains,
  });
}
