export async function checkSafeBrowsing(url: string) {
  const body = {
    client: { clientId: "linksure", clientVersion: "1.0" },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }],
    },
  };

  const res = await fetch(
    `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSING_KEY}`,
    { method: "POST", body: JSON.stringify(body) }
  );

  const data = await res.json();
  return data.matches || [];
}
