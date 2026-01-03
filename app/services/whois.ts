export async function whoisLookup(domain: string) {
  const res = await fetch(`https://api.whois.vu/?q=${domain}`);
  const data = await res.json();

  return {
    domainAgeDays: data.created
      ? Math.floor(
          (Date.now() - new Date(data.created).getTime()) / 86400000
        )
      : null,
    registrar: data.registrar || "Unknown",
    country: data.country || "Unknown",
  };
}
