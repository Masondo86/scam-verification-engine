const BANKS = ["fnb", "capitec", "absa", "nedbank", "standard bank", "sars", "investec", "african bank", "discovery bank", "tymebank"];

export interface BankDetectionResult {
  warnings: Array<{
    bank: string;
    message: string;
    severity: "high" | "medium" | "low";
  }>;
  detectedBanks: string[];
  isImpersonation: boolean;
  threatIndicators: string[];
}

export function detectZAFraud(text: string, domain: string): BankDetectionResult {
  const warnings: Array<{
    bank: string;
    message: string;
    severity: "high" | "medium" | "low";
  }> = [];
  const detectedBanks: string[] = [];
  const threatIndicators: string[] = [];
  const lower = text.toLowerCase();
  
  // Check for bank impersonation
  BANKS.forEach(bank => {
    if (lower.includes(bank)) {
      detectedBanks.push(bank);
      
      // Check if domain doesn't match the bank mentioned
      if (!domain.includes(bank.replace(/\s+/g, ""))) {
        warnings.push({
          bank: bank.toUpperCase(),
          message: `Domain does not match ${bank.toUpperCase()} official website - likely impersonation`,
          severity: "high"
        });
      }
    }
  });
  
  // Check for common fraud tactics
  if (lower.includes("otp") || lower.includes("one-time pin") || lower.includes("verification code")) {
    threatIndicators.push("OTP/PIN harvesting attempt detected");
  }
  
  if (lower.includes("urgent") || lower.includes("act now") || lower.includes("immediate action")) {
    threatIndicators.push("Urgency manipulation tactics detected");
  }
  
  if (lower.includes("verify your account") || lower.includes("confirm your details") || lower.includes("update your information")) {
    threatIndicators.push("Account verification phishing attempt");
  }
  
  if (lower.includes("suspended") || lower.includes("blocked") || lower.includes("restricted")) {
    threatIndicators.push("Account suspension scare tactic");
  }
  
  if (lower.includes("refund") || lower.includes("tax return") || lower.includes("owed")) {
    threatIndicators.push("Fake refund/payment lure");
  }
  
  return {
    warnings,
    detectedBanks,
    isImpersonation: warnings.length > 0,
    threatIndicators
  };
}

export function getLegitimateZABanks(): string[] {
  return BANKS;
}
