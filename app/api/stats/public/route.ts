import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  // Use South Africa timezone
  const now = new Date();
  const saTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Johannesburg' }));
  const todayStart = new Date(saTime);
  todayStart.setHours(0, 0, 0, 0);

  const weekStart = new Date(saTime);
  weekStart.setDate(weekStart.getDate() - 7);
  weekStart.setHours(0, 0, 0, 0);

  console.log('[Stats] Today start (SAST):', todayStart.toISOString());
  console.log('[Stats] Week start (SAST):', weekStart.toISOString());

  // Count scans today
  const { count: scamsToday, error: err1 } = await supabase
    .from('scan_events')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', todayStart.toISOString());

  if (err1) console.error('[Stats] Error counting today:', err1);

  // Count high-risk this week
  const { count: highRiskThisWeek, error: err2 } = await supabase
    .from('scan_events')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', weekStart.toISOString())
    .eq('verdict', 'High');

  if (err2) console.error('[Stats] Error counting high-risk:', err2);

  // Total scans
  const { count: totalScans, error: err3 } = await supabase
    .from('scan_events')
    .select('*', { count: 'exact', head: true });

  if (err3) console.error('[Stats] Error counting total:', err3);

  // Recent flagged domains (high-risk URL scans)
  const { data: recentHighRisk, error: err4 } = await supabase
    .from('scan_events')
    .select('input_text, created_at')
    .eq('verdict', 'High')
    .not('input_text', 'is', null)
    .order('created_at', { ascending: false })
    .limit(20);

  if (err4) console.error('[Stats] Error fetching recent high-risk:', err4);

  // Extract domains from input_text
  const domains = recentHighRisk
    ?.map(row => {
      const text = row.input_text || '';
      const urlMatch = text.match(/(?:https?:\/\/)?(?:www\.)?([a-z0-9-]+\.[a-z]{2,}(?:\.[a-z]{2,})?)/i);
      if (urlMatch) {
        return urlMatch[1].split('/')[0].split('?')[0];
      }
      const domainMatch = text.match(/\b([a-z0-9-]+\.[a-z]{2,}(?:\.[a-z]{2,})?)\b/i);
      return domainMatch ? domainMatch[1] : null;
    })
    .filter(Boolean) as string[];

  const recentFlaggedDomains = [...new Set(domains)].slice(0, 5);

  const response = {
    scamsToday: scamsToday || 0,
    highRiskThisWeek: highRiskThisWeek || 0,
    totalScans: totalScans || 0,
    recentFlaggedDomains,
  };

  console.log('[Stats] Response:', JSON.stringify(response, null, 2));

  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}
