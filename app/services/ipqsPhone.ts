// app/services/ipqsPhone.ts

export interface IPQSPhoneResult {
  success: boolean;
  riskScore: number;        // 0–100 (higher = more risky)
  reasons: string[];        // human‑readable reasons for the score
  raw?: any;                // optional raw response for debugging
}

/**
 * Fetch phone reputation from IPQualityScore API.
 * Uses environment variable IPQS_API_KEY.
 */
export async function getIPQSPhoneReputation(phoneNumber: string): Promise<IPQSPhoneResult | null> {
  const apiKey = process.env.IPQS_API_KEY;
  if (!apiKey) {
    console.error('IPQS_API_KEY is missing in environment variables');
    return null;
  }

  // Normalise phone number (remove spaces, special chars)
  const normalized = phoneNumber.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
  if (!normalized) {
    console.error('Invalid phone number for IPQS lookup');
    return null;
  }

  const url = `https://ipqualityscore.com/api/json/phone/${apiKey}/${encodeURIComponent(normalized)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      // IPQS free tier may be rate‑limited; add a timeout to avoid hanging
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error(`IPQS API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    // IPQS returns a 'success' boolean field
    if (!data.success) {
      console.warn('IPQS API returned success=false', data.message);
      return null;
    }

    // Extract the risk score (0 = low risk, 100 = high risk)
    // Also check 'fraud_score' (some IPQS endpoints use that) – but for phone, it's 'risk_score'
    let riskScore = data.risk_score ?? data.fraud_score ?? 0;
    // Cap between 0 and 100
    riskScore = Math.min(100, Math.max(0, riskScore));

    // Build human‑readable reasons
    const reasons: string[] = [];
    if (riskScore >= 85) reasons.push('IPQualityScore: Very high risk – frequently reported for spam/fraud');
    else if (riskScore >= 60) reasons.push('IPQualityScore: Moderate to high risk – suspicious phone number');
    else if (riskScore >= 30) reasons.push('IPQualityScore: Some risk – proceed with caution');
    else reasons.push('IPQualityScore: Low risk – no significant reputation issues');

    // Additional details if available
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
    console.error('IPQS phone reputation request failed:', err);
    return null;
  }
}
