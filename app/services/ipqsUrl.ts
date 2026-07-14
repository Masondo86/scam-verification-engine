// app/services/ipqsUrl.ts

export interface IPQSURLResult {
  success: boolean;
  riskScore: number;
  reasons: string[];
  raw?: any;
}

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number = 5000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function getIPQSURLReputation(url: string): Promise<IPQSURLResult | null> {
  const apiKey = process.env.IPQS_API_KEY;
  if (!apiKey) {
    console.error('[IPQS-URL] API key missing');
    return null;
  }

  const encodedUrl = encodeURIComponent(url);
  const requestUrl = `https://ipqualityscore.com/api/json/url/${apiKey}/${encodedUrl}`;

  try {
    const response = await fetchWithTimeout(requestUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    }, 5000);

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

    return {
      success: true,
      riskScore,
      reasons,
      raw: data,
    };
  } catch (err) {
    console.error('[IPQS-URL] Request failed:', err);
    return null;
  }
}
