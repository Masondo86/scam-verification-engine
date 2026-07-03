// app/services/seonPhone.ts
import { seonRequest, SEONPhoneResponse } from './seon';

export interface SEONPhoneResult {
  riskScore: number;  // 0-100
  reasons: string[];
  carrier?: string;
  isActive?: boolean;
  profilesFound: number;
  fraudHistory: number;
}

export async function getSEONPhoneReputation(phoneNumber: string): Promise<SEONPhoneResult | null> {
  const normalized = phoneNumber.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
  
  // Ensure international format with country code
  let phone = normalized;
  if (!phone.startsWith('+')) {
    // If starts with 0, assume South African number
    if (phone.startsWith('0')) {
      phone = '+27' + phone.substring(1);
    } else {
      // Assume it's already a valid international number
      phone = '+' + phone;
    }
  }

  const data = await seonRequest<SEONPhoneResponse>('phone-api/v2', { phone });

  if (!data) return null;

  const riskScore = data.risk_scores?.overall ?? 0;
  const networkScore = data.risk_scores?.network ?? 0;

  const reasons: string[] = [];
  if (riskScore >= 85) reasons.push('SEON: Very high fraud risk – multiple fraud signals detected');
  else if (riskScore >= 60) reasons.push('SEON: High fraud risk – suspicious phone number');
  else if (riskScore >= 30) reasons.push('SEON: Medium fraud risk – proceed with caution');
  else reasons.push('SEON: Low fraud risk – no significant issues detected');

  if (data.provider_carrier_details?.is_valid === false) {
    reasons.push('Phone number appears to be invalid or disconnected');
  }
  if (data.seon_fraud_history?.fraud_count > 0) {
    reasons.push(`SEON fraud history: ${data.seon_fraud_history.fraud_count} previous fraud reports`);
  }
  if (data.account_aggregates?.profiles_found > 5) {
    reasons.push(`Found ${data.account_aggregates.profiles_found} online profiles linked to this number`);
  }

  return {
    riskScore,
    reasons,
    carrier: data.provider_carrier_details?.carrier,
    isActive: data.provider_carrier_details?.is_active,
    profilesFound: data.account_aggregates?.profiles_found || 0,
    fraudHistory: data.seon_fraud_history?.fraud_count || 0,
  };
}
