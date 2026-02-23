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
    name: "OneCoin Crypto Scam",
    domains: ["onecoin.eu"],
    type: "crypto",
    description: "Ponzi-style cryptocurrency scheme widely exposed as fraudulent.",
    reported: "2017-04",
    source: "Global investigations",
    riskLevel: "high"
  },

  {
    name: "Bitconnect Ponzi Scheme",
    domains: ["bitconnect.co"],
    type: "crypto",
    description: "Collapsed crypto lending platform exposed as Ponzi scheme.",
    reported: "2018-01",
    source: "Regulatory warnings",
    riskLevel: "high"
  },

  {
    name: "MTI (Mirror Trading International)",
    domains: ["mirrortradinginternational.com"],
    type: "investment",
    description: "South African Bitcoin Ponzi scheme.",
    reported: "2020-12",
    source: "FSCA South Africa",
    riskLevel: "high"
  },

  {
    name: "BTC Global Scam",
    domains: ["btcglobal.io"],
    type: "investment",
    description: "South African Bitcoin investment scam.",
    reported: "2018-03",
    source: "SA media reports",
    riskLevel: "high"
  },

  {
    name: "PlusToken Scam",
    domains: ["plustoken.io"],
    type: "crypto",
    description: "Large-scale crypto Ponzi scheme targeting Asian investors.",
    reported: "2019-06",
    source: "International investigations",
    riskLevel: "high"
  },

  {
    name: "BinaryBook Scam",
    domains: ["binarybook.com"],
    type: "investment",
    description: "Binary options trading scam.",
    reported: "2016-02",
    source: "Financial regulators",
    riskLevel: "high"
  },

  {
    name: "TradeATF Scam",
    domains: ["tradeatf.com"],
    type: "investment",
    description: "Unregulated online trading platform flagged by regulators.",
    reported: "2021-05",
    source: "Financial authorities",
    riskLevel: "medium"
  },

  {
    name: "FxWinning Scam",
    domains: ["fxwinning.net"],
    type: "investment",
    description: "Forex trading scam platform.",
    reported: "2022-09",
    source: "User complaints",
    riskLevel: "high"
  },

  {
    name: "CashFX Group",
    domains: ["cashfxgroup.com"],
    type: "investment",
    description: "Multi-level marketing crypto Ponzi scheme.",
    reported: "2020-08",
    source: "Regulatory investigations",
    riskLevel: "high"
  },

  {
    name: "Africrypt Scam",
    domains: ["africrypt.com"],
    type: "crypto",
    description: "South African crypto platform collapse with alleged fraud.",
    reported: "2021-04",
    source: "Media investigations",
    riskLevel: "high"
  },

  {
    name: "GetBucks Impersonation Scam",
    domains: ["getbucks-loans.net"],
    type: "impersonation",
    description: "Fraudulent site impersonating legitimate lender.",
    reported: "2022-07",
    source: "Consumer complaints",
    riskLevel: "high"
  },

  {
    name: "Netflix Phishing Clone",
    domains: ["netflix-support-center.com"],
    type: "phishing",
    description: "Fake Netflix billing verification site.",
    reported: "2023-03",
    source: "Security researchers",
    riskLevel: "high"
  },

  {
    name: "SARS Refund Phishing",
    domains: ["sars-refund.co.za"],
    type: "phishing",
    description: "Fake SARS tax refund phishing site.",
    reported: "2023-10",
    source: "South African alerts",
    riskLevel: "high"
  },

  {
    name: "Capitec Loan Scam",
    domains: ["capitecloans-apply.co.za"],
    type: "impersonation",
    description: "Fraudulent Capitec loan approval website.",
    reported: "2024-01",
    source: "Bank warnings",
    riskLevel: "high"
  },

  {
    name: "FNB Verification Scam",
    domains: ["fnb-secure-login.co.za"],
    type: "phishing",
    description: "Fake FNB login portal stealing credentials.",
    reported: "2023-09",
    source: "Customer reports",
    riskLevel: "high"
  },

  {
    name: "Amazon Gift Card Scam",
    domains: ["amazongiftcardpromo.net"],
    type: "shopping",
    description: "Fake Amazon gift card giveaway scam.",
    reported: "2022-11",
    source: "Consumer alerts",
    riskLevel: "medium"
  },

  {
    name: "CoinDeal Investment Scam",
    domains: ["coindealpro.com"],
    type: "crypto",
    description: "Fraudulent crypto trading platform.",
    reported: "2021-02",
    source: "Regulatory warnings",
    riskLevel: "high"
  },

  {
    name: "MetaTrader Clone Scam",
    domains: ["metatrader-invest.net"],
    type: "investment",
    description: "Impersonation trading platform scam.",
    reported: "2022-05",
    source: "Security blogs",
    riskLevel: "high"
  },

  {
    name: "SA Lottery Email Scam",
    domains: ["salottery-claim.co.za"],
    type: "phishing",
    description: "Fake South African lottery winnings notification site.",
    reported: "2023-06",
    source: "Consumer warnings",
    riskLevel: "medium"
  },

  {
    name: "Romance Crypto Transfer Scam",
    domains: ["trustwallet-investments.net"],
    type: "romance",
    description: "Crypto romance scam website used for fake investments.",
    reported: "2024-03",
    source: "Victim reports",
    riskLevel: "high"
  },

  {
    name: "PayPal Security Alert Scam",
    domains: ["paypal-securityverify.com"],
    type: "phishing",
    description: "Fake PayPal login security page.",
    reported: "2023-08",
    source: "Security researchers",
    riskLevel: "high"
  },

  {
    name: "Absa Loan Approval Scam",
    domains: ["absa-loanapproval.co.za"],
    type: "impersonation",
    description: "Fraudulent ABSA loan application site.",
    reported: "2024-04",
    source: "Bank fraud reports",
    riskLevel: "high"
  },

  {
    name: "Shop Clearance Flash Sale Scam",
    domains: ["superclearance-deals.com"],
    type: "shopping",
    description: "Fake flash sale e-commerce scam site.",
    reported: "2023-12",
    source: "Consumer complaints",
    riskLevel: "medium"
  }

]
