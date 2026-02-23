export type ClaimInput = {
  claimAmount: number;
  providerPeerAverage: number;
  duplicateFlag: boolean;
  icdCptMismatch: boolean;
  timeAnomaly: boolean;
};

export type FraudResult = {
  statisticalScore: number;
  ruleScore: number;
  llmScore: number;
  finalScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
};

function calculateStatisticalScore(
  claimAmount: number,
  providerPeerAverage: number
) {
  const safePeerAverage = providerPeerAverage > 0 ? providerPeerAverage : 1;
  const deviation = (claimAmount - safePeerAverage) / safePeerAverage;

  return Math.min(Math.abs(deviation) * 50, 40);
}

function calculateRuleScore(input: ClaimInput) {
  let score = 0;

  if (input.duplicateFlag) score += 15;
  if (input.icdCptMismatch) score += 15;
  if (input.timeAnomaly) score += 10;

  return score;
}

function simulateLLMScore(input: ClaimInput) {
  // Replace later with real LLM call
  let score = 0;
  if (input.claimAmount > input.providerPeerAverage * 1.5) score += 15;
  if (input.duplicateFlag) score += 10;
  return score;
}

export function evaluateClaim(input: ClaimInput): FraudResult {
  const statisticalScore = calculateStatisticalScore(
    input.claimAmount,
    input.providerPeerAverage
  );

  const ruleScore = calculateRuleScore(input);
  const llmScore = simulateLLMScore(input);

  const finalScore =
    statisticalScore * 0.4 +
    ruleScore * 0.3 +
    llmScore * 0.3;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  if (finalScore > 60) riskLevel = 'High';
  else if (finalScore > 30) riskLevel = 'Medium';

  return {
    statisticalScore,
    ruleScore,
    llmScore,
    finalScore: Math.round(finalScore),
    riskLevel,
  };
}

export async function getLLMScore(input: ClaimInput): Promise<number> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return simulateLLMScore(input);
  }

  try {
    const res = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? 'gpt-4.1-mini',
        input: [
          {
            role: 'system',
            content:
              'You score medical claim fraud risk in South Africa from 0 to 30. Return JSON: {"score": number}.',
          },
          {
            role: 'user',
            content: JSON.stringify(input),
          },
        ],
        text: { format: { type: 'json_object' } },
      }),
    });

    if (!res.ok) return simulateLLMScore(input);
    const data = await res.json();
    const raw = data?.output_text ?? '{}';
    const parsed = JSON.parse(raw);
    const score = Number(parsed?.score);
    if (Number.isNaN(score)) return simulateLLMScore(input);
    return Math.max(0, Math.min(30, score));
  } catch {
    return simulateLLMScore(input);
  }
}
