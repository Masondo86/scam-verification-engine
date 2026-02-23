
export type ScamEntry = {
  name: string
  domains: string[]
  keywords?: string[]
  type: "phishing" | "investment" | "romance" | "crypto" | "impersonation" | "loan" | "shopping"
  description: string
  reported: string
  source: string
  riskLevel: "high" | "medium"
}

export type KnownScamCheckResult =
  | { isKnownScam: true; scam: ScamEntry }
  | { isKnownScam: false }

export const KNOWN_SCAMS: ScamEntry[] = [
  {
    name: "Michellesmit Scam",
    domains: ["michellesmit.com"],
    keywords: ["michellesmit"],
    type: "phishing",
    description: "Multiple reports of users being scammed through this website.",
    reported: "2026-02",
    source: "Community reports",
    riskLevel: "high"
  },
  {
    name: "SARS Refund Phishing",
    domains: ["sars-refund.co.za", "sars-refund", "sars-tax-return", "sars-verify"],
    keywords: ["sars refund", "tax refund", "verify tax details"],
    type: "phishing",
    description: "Pretends to offer a tax refund while requesting personal or banking details.",
    reported: "2023-10",
    source: "Security alerts",
    riskLevel: "high"
  },
  {
    name: "Bank OTP Harvesting",
    domains: ["secure-banking-login", "bank-verify-now", "otp-confirm"],
    keywords: ["one-time pin", "otp", "verify your account", "confirm your card"],
    type: "phishing",
    description: "Impersonates a bank and asks for OTP or card verification details.",
    reported: "2023-01",
    source: "Fraud reports",
    riskLevel: "high"
  }
]

export function checkKnownScams(input: string): KnownScamCheckResult {
  const lowerInput = input.toLowerCase()

  for (const scam of KNOWN_SCAMS) {
    const domainMatch = scam.domains.some(domain =>
      lowerInput.includes(domain.toLowerCase())
    )

    const keywordMatch = scam.keywords?.some(keyword =>
      lowerInput.includes(keyword.toLowerCase())
    )

    if (domainMatch || keywordMatch) {
      return { isKnownScam: true, scam }
=======
export type KnownScam = {
  scamName: string;
  description: string;
  domains?: string[];
  keywords?: string[];
};


export type KnownScamCheckResult =
  | ({ isKnownScam: true } & KnownScam)
  | { isKnownScam: false };

const knownScams: KnownScam[] = [
  {
    scamName: 'SARS Refund Phishing',
    description: 'Pretends to offer a tax refund while requesting personal or banking details.',
    domains: ['sars-refund', 'sars-tax-return', 'sars-verify'],
    keywords: ['sars refund', 'tax refund', 'verify tax details'],
  },
  {
    scamName: 'Bank OTP Harvesting',
    description: 'Impersonates a bank and asks for OTP or card verification details.',
    domains: ['secure-banking-login', 'bank-verify-now', 'otp-confirm'],
    keywords: ['one-time pin', 'otp', 'verify your account', 'confirm your card'],
  },
  {
    scamName: 'Courier Reschedule Scam',
    description: 'Claims a package is delayed and asks for payment card details to reschedule.',
    domains: ['delivery-reschedule', 'parcel-track-secure', 'courier-fee-payment'],
    keywords: ['reschedule delivery', 'pay outstanding delivery fee', 'parcel on hold'],
  },
];

export function checkKnownScams(input: string): KnownScamCheckResult {
  const lowerInput = input.toLowerCase();

  for (const scam of knownScams) {
    if (scam.domains?.some((domain) => lowerInput.includes(domain))) {
      return { isKnownScam: true, ...scam };
    }

    if (scam.keywords?.some((keyword) => lowerInput.includes(keyword))) {
      return { isKnownScam: true, ...scam };
    }
  }

  return { isKnownScam: false }
}
