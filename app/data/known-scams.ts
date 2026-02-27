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
  }
];
