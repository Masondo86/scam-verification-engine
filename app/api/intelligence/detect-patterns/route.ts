import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function GET() {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  // Find scam categories with >3 reports in 24 hours
  const { data } = await supabase
    .from('scan_events')
    .select('scam_category, input_text, created_at')
    .eq('verdict', 'High')
    .gte('created_at', oneDayAgo);

  // Group by category
  const grouped = data?.reduce((acc: any, row) => {
    if (!row.scam_category) return acc;
    if (!acc[row.scam_category]) acc[row.scam_category] = [];
    acc[row.scam_category].push(row.input_text);
    return acc;
  }, {});

  // For each category with >3 reports, upsert pattern
  for (const [category, texts] of Object.entries(grouped)) {
    if ((texts as string[]).length > 3) {
      await supabase
        .from('scam_patterns')
        .upsert({
          category,
          count: (texts as string[]).length,
          example_texts: (texts as string[]).slice(0,5),
          last_seen: new Date(),
        }, { onConflict: 'category' });
    }
  }

  return NextResponse.json({ success: true });
}
