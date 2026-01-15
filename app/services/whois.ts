// app/services/whois.ts
export type WhoisResult = {
  domainAgeDays?: number;
  registrar: string;
  country: string;
  createdDate?: string | null;
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
    
    // Parse domain age carefully
    let domainAgeDays: number | undefined = undefined;
    let createdDate: string | null = null;
    
    if (data?.created) {
      const parsedDate = new Date(data.created);
      
      // Check if date is valid and not in 1970 (Unix epoch fallback)
      if (
        !isNaN(parsedDate.getTime()) && 
        parsedDate.getFullYear() > 1990 // Domains didn't exist before 1985
      ) {
        domainAgeDays = Math.floor(
          (Date.now() - parsedDate.getTime()) / 86_400_000
        );
        createdDate = parsedDate.toISOString();
      }
    }
    
    return {
      domainAgeDays,
      registrar: data?.registrar || 'Unknown',
      country: data?.country || 'Unknown',
      createdDate,
    };
  } catch (error) {
    console.warn('WHOIS lookup failed:', error);
    return null;
  }
}
