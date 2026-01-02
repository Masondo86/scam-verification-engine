export async function checkIP(ip: string) {
  const res = await fetch(
    `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}`,
    {
      headers: {
        Key: process.env.ABUSEIPDB_API_KEY!,
        Accept: "application/json",
      },
    }
  );

  const data = await res.json();
  return {
    abuseScore: data.data.abuseConfidenceScore,
    country: data.data.countryCode,
  };
}
