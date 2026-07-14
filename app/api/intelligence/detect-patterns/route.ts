// app/api/intelligence/detect-patterns/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('[Detect Patterns] Missing Supabase credentials');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('scan_events')
    .select('scam_category, input_text, created_at')
    .eq('verdict', 'High')
    .gte('created_at', oneDayAgo);

  if (error) {
    console.error('[Detect Patterns] Query error:', error);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }

  const grouped = data?.reduce((acc: any, row) => {
    if (!row.scam_category) return acc;
    if (!acc[row.scam_category]) acc[row.scam_category] = [];
    acc[row.scam_category].push(row.input_text);
    return acc;
  }, {});

  const results = [];
  if (grouped) {
    for (const [category, texts] of Object.entries(grouped)) {
      if ((texts as string[]).length > 3) {
        const { error: upsertError } = await supabase
          .from('scam_patterns')
          .upsert({
            category,
            count: (texts as string[]).length,
            example_texts: (texts as string[]).slice(0, 5),
            last_seen: new Date(),
          }, { onConflict: 'category' });
        if (upsertError) console.error(`[Detect Patterns] Upsert error for ${category}:`, upsertError);
        else results.push({ category, count: (texts as string[]).length });
      }
    }
  }

  return NextResponse.json({ success: true, patterns: results });
}
