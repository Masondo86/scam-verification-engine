export type ScanType = "url" | "phone" | "email" | "text";

export interface AnalyzeRequest {
  input: string;
}

export interface RiskBreakdown {
  technical: number;
  socialEngineering: number;
  community: number;
}

export interface BankWarning {
  bank: string;
  message: string;
}

export interface AnalyzeResponse {
  target: string;
  type: ScanType;
  score: number;
  riskLevel: "safe" | "medium" | "high";
  confidence: number;

  explanation: string;

  riskBreakdown: RiskBreakdown;

  community: {
    reportCount: number;
  };

  bankWarning?: BankWarning;

  screenshotUrl?: string;
}
