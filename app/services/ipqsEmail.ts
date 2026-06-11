// app/services/ipqsEmail.ts
import { getCached, setCached } from '@/app/lib/cache';

export interface IPQSEmailResult {
  success: boolean;
  fraudScore: number;
  reasons: string[];
  raw?: any;
}

export async function getIPQSEmailReputation(email: string): Promise<IPQSEmailResult | null> {
  const cacheKey = `email:${email}`;
  const cached = getCached<IPQSEmailResult>(cacheKey);
  if (cached) return cached;

  const apiKey = process.env.IPQS_API_KEY;
  if (!apiKey) {
    console.error('[IPQS-EMAIL] API key missing');
    return null;
  }

  const url = `https://ipqualityscore.com/api/json/email/${apiKey}/${encodeURIComponent(email)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error(`[IPQS-EMAIL] HTTP error ${response.status}`);
      return null;
    }

    const data = await response.json();

    if (!data.valid) {
      const result = {
        success: false,
        fraudScore: 100,
        reasons: [`Invalid email address (${data.message || 'unknown reason'})`],
        raw: data,
      };
      setCached(cacheKey, result, 86400);
      return result;
    }

    let fraudScore = data.fraud_score ?? 0;
    fraudScore = Math.min(100, Math.max(0, fraudScore));

    const reasons: string[] = [];
    if (fraudScore >= 85) reasons.push('IPQualityScore: Very high fraud risk');
    else if (fraudScore >= 60) reasons.push('IPQualityScore: High fraud risk');
    else if (fraudScore >= 30) reasons.push('IPQualityScore: Medium fraud risk');
    else reasons.push('IPQualityScore: Low fraud risk');

    if (data.disposable) reasons.push('This is a disposable email address');
    if (data.leaked) reasons.push('Email has been leaked in a data breach');
    if (data.spam_trap_score === 'high') reasons.push('High risk of being a spam trap');
    if (data.deliverability === 'low') reasons.push('Low deliverability – email may bounce');
    if (data.first_seen && data.first_seen !== 'N/A') reasons.push(`First seen: ${data.first_seen}`);

    const result = { success: true, fraudScore, reasons, raw: data };
    setCached(cacheKey, result, 86400);
    return result;
  } catch (err) {
    console.error('[IPQS-EMAIL] Request failed:', err);
    return null;
  }
}
