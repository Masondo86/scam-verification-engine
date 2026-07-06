// app/services/fsca.ts
export async function checkFSCARegistration(businessName: string): Promise<{ registered: boolean; details?: string }> {
  try {
    // FSCA FSP search endpoint
    const searchUrl = `https://www.fsca.co.za/Search/FSP?query=${encodeURIComponent(businessName)}`;
    const response = await fetch(searchUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TheLinkDigital/1.0)' },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.warn(`[FSCA] Search failed: ${response.status}`);
      return { registered: false };
    }

    const html = await response.text();
    // Look for indication of a registered FSP
    const hasResults = html.includes('Results found for') || html.includes('FSP Number');
    if (hasResults) {
      // Extract the FSP number and name for details
      const fspMatch = html.match(/FSP Number[:\s]*([A-Z0-9]+)/i);
      const nameMatch = html.match(/Name[:\s]*([^<]+)/i);
      return {
        registered: true,
        details: `FSP ${fspMatch?.[1] || ''} - ${nameMatch?.[1]?.trim() || businessName}`,
      };
    }

    return { registered: false };
  } catch (err) {
    console.error('[FSCA] Error:', err);
    return { registered: false };
  }
}
