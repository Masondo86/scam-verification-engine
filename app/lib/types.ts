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
  severity: "high" | "medium" | "low";
}

export interface TimelineEvent {
  date: string;
  event: string;
  severity: "info" | "warning" | "danger";
}

export interface HeatmapData {
  category: string;
  intensity: number;
  description: string;
}

export interface BankCheck {
  detected: boolean;
  legitimateBanks: string[];
  warnings: BankWarning[];
  isImpersonation: boolean;
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
  timeline: TimelineEvent[];
  heatmap: HeatmapData[];
  bankCheck: BankCheck;
  screenshotUrl?: string;
}
