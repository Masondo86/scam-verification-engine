// app/services/seonEmail.ts
import { seonRequest, SEONEmailResponse } from './seon';

export interface SEONEmailResult {
  fraudScore: number;  // 0-100
  reasons: string[];
  isDisposable: boolean;
  isFreeProvider: boolean;
  breached: boolean;
  breaches: string[];
  profilesFound: number;
  fraudHistory: number;
}

export async function getSEONEmailReputation(email: string): Promise<SEONEmailResult | null> {
  const data = await seonRequest<SEONEmailResponse>('email-api/v3', { email });

  if (!data) return null;

  const fraudScore = data.risk_scores?.overall ?? 0;
  const networkScore = data.risk_scores?.network ?? 0;

  const reasons: string[] = [];
  if (fraudScore >= 85) reasons.push('SEON: Very high fraud risk – multiple fraud signals detected');
  else if (fraudScore >= 60) reasons.push('SEON: High fraud risk – suspicious email');
  else if (fraudScore >= 30) reasons.push('SEON: Medium fraud risk – proceed with caution');
  else reasons.push('SEON: Low fraud risk – email appears legitimate');

  if (data.email_details?.is_disposable) {
    reasons.push('This is a disposable email address (often used by fraudsters)');
  }
  if (data.breach_details?.breached) {
    reasons.push(`Email found in data breaches: ${data.breach_details.breaches?.join(', ') || 'multiple breaches'}`);
  }
  if (data.seon_fraud_history?.fraud_count > 0) {
    reasons.push(`SEON fraud history: ${data.seon_fraud_history.fraud_count} previous fraud reports`);
  }
  if (data.account_aggregates?.profiles_found > 5) {
    reasons.push(`Found ${data.account_aggregates.profiles_found} online profiles linked to this email`);
  }

  return {
    fraudScore,
    reasons,
    isDisposable: data.email_details?.is_disposable || false,
    isFreeProvider: data.email_details?.is_free_provider || false,
    breached: data.breach_details?.breached || false,
    breaches: data.breach_details?.breaches || [],
    profilesFound: data.account_aggregates?.profiles_found || 0,
    fraudHistory: data.seon_fraud_history?.fraud_count || 0,
  };
}
