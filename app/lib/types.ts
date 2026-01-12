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
  threatIndicators?: string[]; // Added this field
}

export interface WhoisData {
  domainAge?: number;
  registrar?: string;
  country?: string;
}

export interface SafeBrowsingData {
  isBlacklisted: boolean;
  threats: string[];
}

export interface AbuseIPDBData {
  abuseScore: number;
  totalReports: number;
  country: string;
  isp: string;
  lastReportedAt: string | null;
}

export interface SocialEngineeringData {
  indicators: string[];
  count: number;
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
  whois?: WhoisData;
  safeBrowsing?: SafeBrowsingData;
  abuseIPDB?: AbuseIPDBData | null;
  socialEngineering?: SocialEngineeringData;
  screenshotUrl?: string;
}
