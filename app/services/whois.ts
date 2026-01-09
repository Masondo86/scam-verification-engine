// app/services/whois.ts

export type WhoisResult = {
  domainAgeDays?: number;
  registrar: string;
  country: string;
};

export async function whoisLookup(domain: string): Promise<WhoisResult | null> {
  try {
    const cleanDomain = domain
      .replace(/^https?:\/\//, '')
      .split('/')[0]
      .toLowerCase();

    const res = await fetch(
      `https://api.whois.vu/?q=${encodeURIComponent(cleanDomain)}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    const domainAgeDays =
      data?.created
        ? Math.floor(
            (Date.now() - new Date(data.created).getTime()) / 86_400_000
          )
        : undefined;

    return {
      domainAgeDays,
      registrar: data?.registrar || 'Unknown',
      country: data?.country || 'Unknown',
    };
  } catch (error) {
    console.warn('WHOIS lookup failed:', error);
    return null;
  }
}
