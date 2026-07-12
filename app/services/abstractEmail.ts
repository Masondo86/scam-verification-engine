// app/services/abstractEmail.ts

export interface AbstractEmailResult {
  valid: boolean;
  isDisposable: boolean;
  isFreeProvider: boolean;
  deliverability: 'DELIVERABLE' | 'RISKY' | 'UNDELIVERABLE' | 'UNKNOWN';
  qualityScore: number; // 0-1
  isSMTPValid: boolean;
  isMXFound: boolean;
  riskScore: number; // 0-100 derived from quality and validity
  reasons: string[];
}

export async function getAbstractEmailReputation(email: string): Promise<AbstractEmailResult | null> {
  const apiKey = process.env.ABSTRACT_EMAIL_API_KEY;
  if (!apiKey) {
    console.error('[ABSTRACT-EMAIL] API key missing');
    return null;
  }

  const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error(`[ABSTRACT-EMAIL] HTTP error ${response.status}`);
      return null;
    }

    const data = await response.json();
    console.log('[ABSTRACT-EMAIL] Response:', JSON.stringify(data, null, 2));

    const reasons: string[] = [];

    // Validity check
    const isValid = data.is_valid_format?.value === true;
    if (!isValid) {
      reasons.push(`Abstract: Invalid email format (${data.is_valid_format?.text || 'unknown reason'})`);
    } else {
      reasons.push('Abstract: Email format is valid');
    }

    // Disposable detection
    const isDisposable = data.is_disposable_email?.value === true;
    if (isDisposable) {
      reasons.push('Abstract: Disposable email address detected');
    }

    // Free provider
    const isFreeProvider = data.is_free_provider?.value === true;
    if (isFreeProvider) {
      reasons.push('Abstract: Free email provider (e.g., Gmail, Yahoo)');
    }

    // Deliverability
    const deliverability = data.deliverability || 'UNKNOWN';
    if (deliverability === 'DELIVERABLE') {
      reasons.push('Abstract: Email is deliverable');
    } else if (deliverability === 'RISKY') {
      reasons.push('Abstract: Risky deliverability – may bounce');
    } else if (deliverability === 'UNDELIVERABLE') {
      reasons.push('Abstract: Email is undeliverable');
    }

    // SMTP and MX
    const isSMTPValid = data.is_smtp_valid?.value === true || false;
    const isMXFound = data.is_mx_found?.value === true || false;
    if (!isMXFound) {
      reasons.push('Abstract: No MX records found – domain may not accept email');
    }

    // Quality score (0-1)
    const qualityScore = data.quality_score || 0;

    // Convert to risk score (0-100, higher = more risky)
    let riskScore = 0;
    if (!isValid) riskScore += 40;
    if (isDisposable) riskScore += 25;
    if (deliverability === 'UNDELIVERABLE') riskScore += 20;
    if (!isMXFound) riskScore += 15;
    riskScore = Math.min(100, riskScore + (1 - qualityScore) * 20);

    return {
      valid: isValid,
      isDisposable,
      isFreeProvider,
      deliverability: deliverability as 'DELIVERABLE' | 'RISKY' | 'UNDELIVERABLE' | 'UNKNOWN',
      qualityScore,
      isSMTPValid,
      isMXFound,
      riskScore,
      reasons,
    };
  } catch (err) {
    console.error('[ABSTRACT-EMAIL] Request failed:', err);
    return null;
  }
}
