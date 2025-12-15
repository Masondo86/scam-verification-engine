export function calculateScore(signals: {
  domainAge?: number;
  blacklist?: boolean;
  social?: number;
}) {
  let score = 100;

  if (signals.domainAge && signals.domainAge < 30) score -= 30;
  if (signals.blacklist) score -= 40;
  if (signals.social) score -= signals.social * 10;

  return {
    score: Math.max(score, 0),
    risk:
      score < 40 ? "high" : score < 70 ? "medium" : "safe",
  };
}
