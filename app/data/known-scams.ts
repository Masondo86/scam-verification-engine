 codex/fix-deployment-issues-for-vercel-hix2ea
export type ScamEntry = {
  name: string;
  domains: string[];
  keywords?: string[];
  type: 'phishing' | 'investment' | 'romance' | 'crypto' | 'impersonation' | 'loan' | 'shopping';
  description: string;
  reported: string;
  source: string;
  riskLevel: 'high' | 'medium';
};

export type KnownScamCheckResult =
  | { isKnownScam: true; scam: ScamEntry }
  | { isKnownScam: false };

export const knownScams: ScamEntry[] = [
  {
    name: 'Michellesmit Scam',
    domains: ['michellesmit.com'],
    keywords: ['michellesmit'],
    type: 'phishing',
    description: 'Multiple reports of users being scammed through this website.',
    reported: '2026-02',
    source: 'Community reports',
    riskLevel: 'high',
  },
  {
    name: 'SARS Refund Phishing',
    domains: ['sars-refund.co.za', 'sars-refund', 'sars-tax-return', 'sars-verify'],
    keywords: ['sars refund', 'tax refund', 'verify tax details'],
    type: 'phishing',
    description: 'Pretends to offer a tax refund while requesting personal or banking details.',
    reported: '2023-10',
    source: 'Security alerts',
    riskLevel: 'high',
  },
  {
    name: 'Bank OTP Harvesting',
    domains: ['secure-banking-login', 'bank-verify-now', 'otp-confirm'],
    keywords: ['one-time pin', 'otp', 'verify your account', 'confirm your card'],
    type: 'phishing',
    description: 'Impersonates a bank and asks for OTP or card verification details.',
    reported: '2023-01',
    source: 'Fraud reports',
    riskLevel: 'high',
  },
  {
    name: 'MTI (Mirror Trading International)',
    domains: ['mirrortradinginternational.com'],
    type: 'investment',
    description: 'South African Bitcoin Ponzi scheme.',
    reported: '2020-12',
    source: 'FSCA South Africa',
    riskLevel: 'high',
  },
  {
    name: 'BTC Global Scam',
    domains: ['btcglobal.io'],
    type: 'investment',
    description: 'South African Bitcoin investment scam.',
    reported: '2018-03',
    source: 'SA media reports',
    riskLevel: 'high',
  },
  {
    name: 'Africrypt Scam',
    domains: ['africrypt.com'],
    type: 'crypto',
    description: 'South African crypto platform collapse with alleged fraud.',
    reported: '2021-04',
    source: 'Media investigations',
    riskLevel: 'high',
  },
  {
    name: 'GetBucks Impersonation Scam',
    domains: ['getbucks-loans.net'],
    type: 'impersonation',
    description: 'Fraudulent site impersonating legitimate lender.',
    reported: '2022-07',
    source: 'Consumer complaints',
    riskLevel: 'high',
  },
  {
    name: 'FNB Verification Scam',
    domains: ['fnb-secure-login.co.za'],
    type: 'phishing',
    description: 'Fake FNB login portal stealing credentials.',
    reported: '2023-09',
    source: 'Customer reports',
    riskLevel: 'high',
  },
  {
    name: 'Absa Loan Approval Scam',
    domains: ['absa-loanapproval.co.za'],
    type: 'impersonation',
    description: 'Fraudulent ABSA loan application site.',
    reported: '2024-04',
    source: 'Bank fraud reports',
    riskLevel: 'high',
  },
  {
    name: 'Shop Clearance Flash Sale Scam',
    domains: ['superclearance-deals.com'],
    type: 'shopping',
    description: 'Fake flash sale e-commerce scam site.',
    reported: '2023-12',
    source: 'Consumer complaints',
    riskLevel: 'medium',
  },
];

export function checkKnownScams(input: string): KnownScamCheckResult {
  const lowerInput = input.toLowerCase();

  for (const scam of knownScams) {
    const domainMatch = scam.domains.some((domain) =>
      lowerInput.includes(domain.toLowerCase())
    );

    const keywordMatch = scam.keywords?.some((keyword) =>
      lowerInput.includes(keyword.toLowerCase())
    );

    if (domainMatch || keywordMatch) {
      return { isKnownScam: true, scam };
    }

export interface KnownScam {
  id: string;
  name: string;
  description: string;
  indicators: string[];
}

export const knownScams: KnownScam[] = [
  {
    id: "paypal-phishing",
    name: "PayPal Phishing",
    description: "Fake PayPal emails asking to confirm your account.",
    indicators: ["verify your account", "urgent action required", "login immediately"]
  },
  {
    id: "crypto-giveaway",
    name: "Crypto Giveaway Scam",
    description: "Fake celebrity crypto giveaways.",
    indicators: ["send 0.1 btc", "double your crypto", "limited time offer"]
  },
  {
    id: "bank-sms",
    name: "Bank SMS Scam",
    description: "SMS pretending to be from your bank.",
    indicators: ["your account is locked", "click here to unlock", "verify now"]
 main
  }
];
