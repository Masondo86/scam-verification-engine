export function checkKnownScams(input: string) {
  const lowerInput = input.toLowerCase();

  for (const scam of knownScams) {
    if (scam.domains?.some(d => lowerInput.includes(d))) {
      return { isKnownScam: true, ...scam };
    }

    if (scam.keywords?.some(k => lowerInput.includes(k))) {
      return { isKnownScam: true, ...scam };
    }
  }

  return { isKnownScam: false };
}
