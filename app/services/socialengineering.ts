// app/services/socialengineering.ts

export type SocialEngineeringSignals = {
  urgency: boolean;
  fear: boolean;
  authority: boolean;
  reward: boolean;
  impersonation: boolean;
  otpScam: boolean;
  paymentRedirection: boolean;
  summary: string;
  indicators: string[];
};

const URGENCY_PATTERNS = [
  /act now/i,
  /urgent/i,
  /immediately/i,
  /expires today/i,
  /final notice/i,
  /last chance/i,
];

const FEAR_PATTERNS = [
  /account will be suspended/i,
  /legal action/i,
  /blocked/i,
  /fraud detected/i,
  /unauthorized activity/i,
];

const AUTHORITY_PATTERNS = [
  /bank/i,
  /sars/i,
  /fnb|absa|standard bank|nedbank|capitec/i,
  /police|saps/i,
  /support team/i,
];

const REWARD_PATTERNS = [
  /you have won/i,
  /cash reward/i,
  /refund due/i,
  /prize/i,
];

const OTP_PATTERNS = [
  /otp/i,
  /one[-\s]?time pin/i,
  /verification code/i,
];

const PAYMENT_PATTERNS = [
  /send money/i,
  /eft/i,
  /crypto/i,
  /bitcoin/i,
  /gift card/i,
  /voucher/i,
];

export function analyzeSocialEngineering(
  input: string
): SocialEngineeringSignals {
  const text = input.toLowerCase();
  const indicators: string[] = [];

  const urgency = URGENCY_PATTERNS.some(p => p.test(text));
  if (urgency) indicators.push('Urgency language detected');

  const fear = FEAR_PATTERNS.some(p => p.test(text));
  if (fear) indicators.push('Fear-based threat language detected');

  const authority = AUTHORITY_PATTERNS.some(p => p.test(text));
  if (authority) indicators.push('Authority impersonation signals');

  const reward = REWARD_PATTERNS.some(p => p.test(text));
  if (reward) indicators.push('Reward / prize bait language');

  const otpScam = OTP_PATTERNS.some(p => p.test(text));
  if (otpScam) indicators.push('OTP harvesting attempt');

  const paymentRedirection = PAYMENT_PATTERNS.some(p => p.test(text));
  if (paymentRedirection) indicators.push('Payment redirection request');

  const impersonation = authority && (urgency || fear);

  const summary = generateSummary({
    urgency,
    fear,
    authority,
    reward,
    otpScam,
    paymentRedirection,
    impersonation,
  });

  return {
    urgency,
    fear,
    authority,
    reward,
    impersonation,
    otpScam,
    paymentRedirection,
    summary,
    indicators,
  };
}

function generateSummary(flags: {
  urgency: boolean;
  fear: boolean;
  authority: boolean;
  reward: boolean;
  otpScam: boolean;
  paymentRedirection: boolean;
  impersonation: boolean;
}): string {
  if (flags.impersonation && flags.otpScam) {
    return 'Impersonates a trusted institution and requests an OTP — a common banking scam.';
  }

  if (flags.impersonation && flags.paymentRedirection) {
    return 'Impersonates an authority and attempts to redirect payments.';
  }

  if (flags.urgency && flags.fear) {
    return 'Uses urgency and fear tactics to pressure immediate action.';
  }

  if (flags.reward) {
    return 'Promises rewards or refunds — a frequent scam lure.';
  }

  return 'No strong social-engineering manipulation patterns detected.';
}
