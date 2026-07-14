// app/services/fsca.ts

// Helper to fetch with timeout
async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number = 5000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function checkFSCARegistration(businessName: string): Promise<{ registered: boolean; details?: string }> {
  try {
    const searchUrl = `https://www.fsca.co.za/Search/FSP?query=${encodeURIComponent(businessName)}`;
    const response = await fetchWithTimeout(searchUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TheLinkDigital/1.0)' },
    }, 5000);

    if (!response.ok) {
      console.warn(`[FSCA] Search failed: ${response.status}`);
      return { registered: false };
    }

    const html = await response.text();
    const hasResults = html.includes('Results found for') || html.includes('FSP Number');
    if (hasResults) {
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
