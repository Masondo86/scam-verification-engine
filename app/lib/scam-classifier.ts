// app/lib/scam-classifier.ts

export function classifyScam(text: string): string | null {
  const lower = text.toLowerCase();
  
  if (/(consignment|parcel|courier|delivery|unclaimed|package|shipping)/i.test(lower)) {
    return 'parcel_delivery';
  }
  if (/(vishing|call|voice|bank fraud department|otp over phone|security team)/i.test(lower)) {
    return 'vishing';
  }
  if (/(urgent payment|otp|verify your account|suspended|locked|compromised)/i.test(lower)) {
    return 'smishing';
  }
  if (/(investment|profit|guaranteed return|bitcoin|crypto|forex)/i.test(lower)) {
    return 'investment_scam';
  }
  if (/(loan|payday|credit|ncr|upfront fee|guaranteed approval)/i.test(lower)) {
    return 'loan_scam';
  }
  if (/(medical aid|discovery|momentum|bestmed|medical scheme|claim)/i.test(lower)) {
    return 'medical_aid_fraud';
  }
  if (/(refund|sars|tax|government grant|sassa)/i.test(lower)) {
    return 'government_imposter';
  }
  if (/(bank|fnb|absa|capitec|nedbank|standard bank)/i.test(lower)) {
    return 'bank_impersonation';
  }
  return null; // uncategorised
}
