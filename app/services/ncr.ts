
// app/services/ncr.ts

export async function checkNCRRegistration(businessName: string): Promise<{ registered: boolean; details?: string }> {
  try {
    const searchUrl = `https://www.ncr.org.za/registrants?keyword=${encodeURIComponent(businessName)}`;
    const response = await fetch(searchUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TheLinkDigital/1.0)' },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.warn(`[NCR] Search failed: ${response.status}`);
      return { registered: false };
    }

    const html = await response.text();
    const ncrMatch = html.match(/NCRCP\d+/i);
    if (ncrMatch) {
      return {
        registered: true,
        details: `NCRCP ${ncrMatch[0]}`,
      };
    }

    return { registered: false };
  } catch (err) {
    console.error('[NCR] Error:', err);
    return { registered: false };
  }
}
