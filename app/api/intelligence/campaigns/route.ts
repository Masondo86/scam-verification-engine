// app/api/intelligence/campaigns/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  // Lazy initialization: create client only inside the handler
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Fetch indicators with report_count >= 10 (threshold)
    const { data: indicators, error } = await supabase
      .from('scam_indicators')
      .select('*')
      .gte('report_count', 10)
      .order('report_count', { ascending: false });

    if (error) throw error;

    // Process each indicator into campaigns
    for (const ind of indicators) {
      const campaignName = `${ind.indicator_type.toUpperCase()} campaign: ${ind.indicator_value}`;
      const severity = ind.report_count > 50 ? 'HIGH' : ind.report_count > 20 ? 'MEDIUM' : 'LOW';

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
          { onConflict: 'indicator' }
        );
      if (upsertError) console.error('Campaign upsert error:', upsertError);
    }

    return NextResponse.json({ success: true, campaignsProcessed: indicators.length });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to detect campaigns' }, { status: 500 });
  }
}
