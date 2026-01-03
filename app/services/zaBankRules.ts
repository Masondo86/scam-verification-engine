const BANKS = ["fnb", "capitec", "absa", "nedbank", "standard bank", "sars"];

export function detectZAFraud(text: string, domain: string) {
  const findings: string[] = [];
  const lower = text.toLowerCase();

  BANKS.forEach(bank => {
    if (lower.includes(bank) && !domain.includes(bank.replace(" ", ""))) {
      findings.push(`Impersonates ${bank}`);
    }
  });

  if (lower.includes("otp")) findings.push("OTP harvesting attempt");
  if (lower.includes("urgent") || lower.includes("act now"))
    findings.push("Urgency manipulation");

  return findings;
}
