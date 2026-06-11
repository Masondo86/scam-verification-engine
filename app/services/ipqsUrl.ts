// app/services/ipqsUrl.ts
import { getCached, setCached } from '@/app/lib/cache';

export interface IPQSURLResult {
  success: boolean;
  riskScore: number;
  reasons: string[];
  raw?: any;
}

export async function getIPQSURLReputation(url: string): Promise<IPQSURLResult | null> {
  const cacheKey = `url:${url}`;
  const cached = getCached<IPQSURLResult>(cacheKey);
  if (cached) return cached;

  const apiKey = process.env.IPQS_API_KEY;
  if (!apiKey) {
    console.error('[IPQS-URL] API key missing');
    return null;
  }

  const encodedUrl = encodeURIComponent(url);
  const requestUrl = `https://ipqualityscore.com/api/json/url/${apiKey}/${encodedUrl}`;

  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error(`[IPQS-URL] HTTP error ${response.status}`);
      return null;
    }

    const data = await response.json();

    let riskScore = data.risk_score ?? data.fraud_score ?? 0;
    riskScore = Math.min(100, Math.max(0, riskScore));

    const reasons: string[] = [];
    if (riskScore >= 85) reasons.push('IPQualityScore: Very high risk – malicious website');
    else if (riskScore >= 60) reasons.push('IPQualityScore: High risk – suspicious');
    else if (riskScore >= 30) reasons.push('IPQualityScore: Medium risk – some signals');
    else reasons.push('IPQualityScore: Low risk – no issues detected');

    if (data.phishing) reasons.push('This URL is associated with a phishing attack');
    if (data.malware) reasons.push('This URL hosts or distributes malware');
    if (data.spamming) reasons.push('Domain associated with email spam');
    if (data.unsafe) reasons.push('Unsafe website – do not browse');
    if (data.suspicious) reasons.push('Suspicious characteristics (new domain, low traffic)');
    if (data.parking) reasons.push('This domain is parked and not actively used');
    if (data.risk_score === 100) reasons.push('Confirmed malicious – do NOT proceed');

    const result = { success: true, riskScore, reasons, raw: data };
    setCached(cacheKey, result, 86400);
    return result;
  } catch (err) {
    console.error('[IPQS-URL] Request failed:', err);
    return null;
  }
}
