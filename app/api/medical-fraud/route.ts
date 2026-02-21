import { NextResponse } from 'next/server';

import { evaluateClaim, getLLMScore, type ClaimInput } from '@/lib/medicalFraudEngine';
import { createServerSupabaseClient } from '@/lib/supabase';

function isClaimInput(body: unknown): body is ClaimInput {
  const b = body as ClaimInput;
  return (
    typeof b?.claimAmount === 'number' &&
    typeof b?.providerPeerAverage === 'number' &&
    typeof b?.duplicateFlag === 'boolean' &&
    typeof b?.icdCptMismatch === 'boolean' &&
    typeof b?.timeAnomaly === 'boolean'
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!isClaimInput(body)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const base = evaluateClaim(body);
    const llmScore = await getLLMScore(body);

    const finalScore = Math.round(
      base.statisticalScore * 0.4 +
      base.ruleScore * 0.3 +
      llmScore * 0.3
    );

    const riskLevel = finalScore > 60 ? 'High' : finalScore > 30 ? 'Medium' : 'Low';

    const result = {
      ...base,
      llmScore,
      finalScore,
      riskLevel,
    };

    const supabase = createServerSupabaseClient();
    if (supabase) {
      await supabase.from('medical_claim_scores').insert({
        claim_amount: body.claimAmount,
        provider_peer_average: body.providerPeerAverage,
        duplicate_flag: body.duplicateFlag,
        icd_cpt_mismatch: body.icdCptMismatch,
        time_anomaly: body.timeAnomaly,
        statistical_score: result.statisticalScore,
        rule_score: result.ruleScore,
        llm_score: result.llmScore,
        final_score: result.finalScore,
        risk_level: result.riskLevel,
      });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
