// app/api/intelligence/campaigns/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // use service role for write ops
);

export async function GET() {
  try {
    // Fetch indicators with report_count >= 10 (threshold)
    const { data: indicators, error } = await supabase
      .from('scam_indicators')
      .select('*')
      .gte('report_count', 10)
      .order('report_count', { ascending: false });

    if (error) throw error;

    // For each indicator, create/update a campaign
    for (const ind of indicators) {
      const campaignName = `${ind.indicator_type.toUpperCase()} campaign: ${ind.indicator_value}`;
      const severity = ind.report_count > 50 ? 'HIGH' : ind.report_count > 20 ? 'MEDIUM' : 'LOW';

      // Upsert into scam_campaigns
      const { error: upsertError } = await supabase
        .from('scam_campaigns')
        .upsert(
          {
            name: campaignName,
            indicator: ind.indicator_value,
            report_count: ind.report_count,
            first_seen: ind.first_seen,
            last_seen: ind.last_seen,
            severity: severity,
            sector: ind.sector || null,
          },
          { onConflict: 'indicator' } // assumes indicator column is unique
        );
      if (upsertError) console.error('Campaign upsert error:', upsertError);
    }

    return NextResponse.json({ success: true, campaignsProcessed: indicators.length });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to detect campaigns' }, { status: 500 });
  }
}
