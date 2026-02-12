// app/services/abuseipdb.ts

export interface AbuseIPResult {
  abuseConfidenceScore: number;
  isWhitelisted?: boolean;
  countryCode?: string;
  usageType?: string;
  isp?: string;
  domain?: string;
  totalReports?: number;
}

// ----------------------------------------
// Resolve IP from domain
// ----------------------------------------
export async function resolveIPFromDomain(input: string): Promise<string | null> {
  try {
    const url = new URL(input.startsWith('http') ? input : `https://${input}`);
    const hostname = url.hostname;

    const res = await fetch(`https://dns.google/resolve?name=${hostname}`);
    const data = await res.json();

    const answer = data?.Answer?.find((a: any) => a.type === 1);

    return answer?.data || null;
  } catch {
    return null;
  }
}

// ----------------------------------------
// Check IP with AbuseIPDB
// ----------------------------------------
export async function checkIP(ip: string): Promise<AbuseIPResult | null> {
  try {
    const apiKey = process.env.ABUSEIPDB_API_KEY;

    if (!apiKey) {
      console.warn('Missing ABUSEIPDB_API_KEY');
      return null;
    }

    const response = await fetch(
      `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}&maxAgeInDays=90`,
      {
        headers: {
          Key: apiKey,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    if (!result?.data) {
      return null;
    }

    return {
      abuseConfidenceScore: result.data.abuseConfidenceScore,
      isWhitelisted: result.data.isWhitelisted,
      countryCode: result.data.countryCode,
      usageType: result.data.usageType,
      isp: result.data.isp,
      domain: result.data.domain,
      totalReports: result.data.totalReports,
    };

  } catch (error) {
    console.error('AbuseIPDB error:', error);
    return null;
  }
}
