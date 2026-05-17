// app/services/ipqsPhone.ts

export interface IPQSPhoneResult {
  success: boolean;
  riskScore: number;
  reasons: string[];
  raw?: any;
}

/**
 * Normalize a South African phone number to international format (+27...)
 * Accepts numbers like 0214177148, 0821234567, +27214177148
 */
function normalizeToInternational(phoneNumber: string): string | null {
  let cleaned = phoneNumber.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
  
  // If it starts with 0, replace with +27
  if (cleaned.startsWith('0')) {
    cleaned = '+27' + cleaned.substring(1);
  }
  
  // Must start with +
  if (!cleaned.startsWith('+')) {
    console.error(`[IPQS] Invalid phone format (no +): ${phoneNumber}`);
    return null;
  }
  
  return cleaned;
}

export async function getIPQSPhoneReputation(phoneNumber: string): Promise<IPQSPhoneResult | null> {
  const apiKey = process.env.IPQS_API_KEY;
  if (!apiKey) {
    console.error('[IPQS] API key missing');
    return null;
  }

  const normalized = normalizeToInternational(phoneNumber);
  if (!normalized) {
    console.error(`[IPQS] Could not normalize phone: ${phoneNumber}`);
    return null;
  }

  // Explicitly tell IPQS the number is from South Africa
  const country = 'ZA';
  const url = `https://ipqualityscore.com/api/json/phone/${apiKey}/${encodeURIComponent(normalized)}?country=${country}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error(`[IPQS] HTTP error ${response.status}: ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    if (!data.success) {
      console.warn('[IPQS] API returned success=false', data.message);
      return null;
    }

    let riskScore = data.risk_score ?? data.fraud_score ?? 0;
    riskScore = Math.min(100, Math.max(0, riskScore));

    const reasons: string[] = [];
    if (riskScore >= 85) reasons.push('IPQualityScore: Very high risk – frequently reported for spam/fraud');
    else if (riskScore >= 60) reasons.push('IPQualityScore: Moderate to high risk – suspicious phone number');
    else if (riskScore >= 30) reasons.push('IPQualityScore: Some risk – proceed with caution');
    else reasons.push('IPQualityScore: Low risk – no significant reputation issues');

    if (data.active === false) reasons.push('Phone number appears to be inactive or disconnected');
    if (data.leaked === true) reasons.push('This number has been found in data breaches or scam lists');
    if (data.spam_score && data.spam_score > 70) reasons.push(`IPQualityScore spam score: ${data.spam_score}%`);

    return {
      success: true,
      riskScore,
      reasons,
      raw: data,
    };
  } catch (err) {
    console.error('[IPQS] Request failed:', err);
    return null;
  }
}
