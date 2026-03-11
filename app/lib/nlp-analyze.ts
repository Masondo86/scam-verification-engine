import nlp from 'compromise';

export type NLPAnalysis = {
  riskBoost: number;        // 0-40 additional risk points
  reasons: string[];
  features: {
    hasUrgency: boolean;
    hasFear: boolean;
    hasAuthority: boolean;
    sentenceCount: number;
    questionCount: number;
  };
};

/**
 * Analyze message text for psychological scam indicators.
 * Runs synchronously (very fast, no network calls).
 */
export function analyzeMessageNLP(text: string): NLPAnalysis {
  const doc = nlp(text.toLowerCase());

  const features = {
    hasUrgency: doc.match('(urgent|immediately|asap|now|action required|limited time)').found,
    hasFear: doc.match('(suspended|locked|closed|terminated|compromised|unauthorized)').found,
    hasAuthority: doc.match('(bank|sars|government|official|fsca|sabic|sars)').found,
    sentenceCount: doc.sentences().length,
    questionCount: doc.questions().length,
  };

  const reasons: string[] = [];
  let riskBoost = 0;

  if (features.hasUrgency) {
    reasons.push('Contains urgency language');
    riskBoost += 15;
  }
  if (features.hasFear) {
    reasons.push('Uses fear tactics (account suspension, etc.)');
    riskBoost += 15;
  }
  if (features.hasAuthority) {
    reasons.push('Impersonates authority (bank, SARS, government)');
    riskBoost += 10;
  }

  // Sophistication: longer messages with questions might be more convincing scams
  if (features.sentenceCount > 3 && features.questionCount === 0) {
    reasons.push('Unusually long and declarative – possible crafted scam');
    riskBoost += 5;
  }

  // Cap at 40
  riskBoost = Math.min(riskBoost, 40);

  return { riskBoost, reasons, features };
}
