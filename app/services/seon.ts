// app/services/seon.ts

export interface SEONPhoneResponse {
  id: string;
  phone: string;
  risk_scores: {
    overall: number;  // 0-100
    network: number;  // 0-1 (probability)
  };
  provider_carrier_details: {
    carrier: string;
    country_code: string;
    is_valid: boolean;
    is_active: boolean;
  };
  account_aggregates: {
    profiles_found: number;
    platforms: string[];
  };
  seon_fraud_history: {
    fraud_count: number;
    first_seen: string;
    last_seen: string;
  };
}

export interface SEONEmailResponse {
  id: string;
  email: string;
  risk_scores: {
    overall: number;  // 0-100
    network: number;  // 0-1 (probability)
  };
  email_details: {
    is_disposable: boolean;
    is_free_provider: boolean;
    domain: string;
  };
  account_aggregates: {
    profiles_found: number;
    platforms: string[];
  };
  breach_details: {
    breached: boolean;
    breaches: string[];
  };
  seon_fraud_history: {
    fraud_count: number;
  };
}

export async function seonRequest<T>(
  endpoint: string,
  body: Record<string, any>
): Promise<T | null> {
  const apiKey = process.env.SEON_API_KEY;
  const apiSecret = process.env.SEON_API_SECRET;

  if (!apiKey || !apiSecret) {
    console.error('[SEON] Missing API credentials');
    return null;
  }

  const auth = btoa(`${apiKey}:${apiSecret}`);

  try {
    const response = await fetch(`https://api.seon.io/SeonRestService/${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error(`[SEON] HTTP error ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data as T;
  } catch (err) {
    console.error('[SEON] Request failed:', err);
    return null;
  }
}
