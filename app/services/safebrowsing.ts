export interface SafeBrowsingResult {
  isBlacklisted: boolean;
  threats: string[];
  details: any[];
}

export async function checkSafeBrowsing(url: string): Promise<SafeBrowsingResult> {
  try {
    const body = {
      client: { clientId: "checkascam", clientVersion: "1.0" },
      threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: [{ url }],
      },
    };

    const res = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSING_KEY}`,
      { 
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      console.warn('Safe Browsing API error:', res.status);
      return { isBlacklisted: false, threats: [], details: [] };
    }

    const data = await res.json();
    const matches = data.matches || [];

    return {
      isBlacklisted: matches.length > 0,
      threats: matches.map((m: any) => m.threatType),
      details: matches,
    };
  } catch (error) {
    console.error('Safe Browsing check failed:', error);
    return { isBlacklisted: false, threats: [], details: [] };
  }
}
