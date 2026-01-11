export interface AbuseIPResult {
  abuseScore: number;
  country: string;
  usageType: string;
  isp: string;
  totalReports: number;
  lastReportedAt: string | null;
}

export async function checkIP(ip: string): Promise<AbuseIPResult | null> {
  try {
    // Skip local/private IPs
    if (ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
      return null;
    }

    const res = await fetch(
      `https://api.abuseipdb.com/api/v2/check?ipAddress=${encodeURIComponent(ip)}&maxAgeInDays=90&verbose`,
      {
        headers: {
          Key: process.env.ABUSEIPDB_API_KEY!,
          Accept: "application/json",
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      console.warn('AbuseIPDB API error:', res.status);
      return null;
    }

    const data = await res.json();

    return {
      abuseScore: data.data?.abuseConfidenceScore || 0,
      country: data.data?.countryCode || 'Unknown',
      usageType: data.data?.usageType || 'Unknown',
      isp: data.data?.isp || 'Unknown',
      totalReports: data.data?.totalReports || 0,
      lastReportedAt: data.data?.lastReportedAt || null,
    };
  } catch (error) {
    console.error('AbuseIPDB check failed:', error);
    return null;
  }
}

export async function resolveIPFromDomain(domain: string): Promise<string | null> {
  try {
    // Use a DNS-over-HTTPS service to resolve domain to IP
    const res = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=A`,
      {
        headers: {
          Accept: "application/dns-json",
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    
    // Get the first A record
    const aRecord = data.Answer?.find((record: any) => record.type === 1);
    return aRecord?.data || null;
  } catch (error) {
    console.error('DNS resolution failed:', error);
    return null;
  }
}
