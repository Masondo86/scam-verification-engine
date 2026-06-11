import { getIPQSPhoneReputation } from '@/app/services/ipqsPhone';
import { getIPQSEmailReputation } from '@/app/services/ipqsEmail';
import { getIPQSURLReputation } from '@/app/services/ipqsUrl';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { analyzeMessageNLP } from '@/app/lib/nlp-analyze';
import { NextResponse } from 'next/server';
import { knownScams } from '@/app/data/known-scams';

type AnalyzeType = 'message' | 'url' | 'phone' | 'claim' | 'email';

type AnalyzeResponse = {
  riskLevel: 'Low' | 'Medium' | 'High';
  confidence: number;
  reasons: string[];
  recommendation: string;
  spamReportCount?: number;
};

const MESSAGE_FLAGS = ['urgent', 'payment', 'verify', 'suspend', 'otp'];
const KNOWN_SCAM_NUMBERS = ['+27721234567', '0721234567', '+27831234567'];
const SUPPORTED_TYPES: AnalyzeType[] = ['message', 'url', 'phone', 'claim', 'email'];

// --------------------------------------------------------------------
// Supabase client (uses environment variables)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
// --------------------------------------------------------------------

// --------------------------------------------------------------------
// Helper functions
function extractUrls(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
}

function extractPhones(text: string): string[] {
  const phoneRegex = /(\+27|0)[6-8][0-9]{8}/g;
  return text.match(phoneRegex) || [];
}

function detectSector(text: string): string | null {
  const lower = text.toLowerCase();
  if (/(fnb|absa|capitec|nedbank|standard bank|bank)/i.test(lower)) return 'banking';
  if (/(medical aid|discovery|momentum|fedhealth|bestmed)/i.test(lower)) return 'healthcare';
  if (/(sars|tax refund)/i.test(lower)) return 'government';
  return null;
}
// --------------------------------------------------------------------

function normalizePhone(value: string) {
  return value.replace(/\s+/g, '').trim();
}

async function getSpamReportCount(type: string, content: string): Promise<number> {
  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { count, error } = await supabaseAdmin
    .from('user_reports')
    .select('*', { count: 'exact', head: true })
    .eq('type', type)
    .eq('content', content);
  if (error) {
    console.error('Failed to fetch spam count:', error);
    return 0;
  }
  return count || 0;
}

function evaluateMessage(content: string): AnalyzeResponse {
  const lower = content.toLowerCase();
  const matchedFlags = MESSAGE_FLAGS.filter((flag) => lower.includes(flag));

  let result: AnalyzeResponse;

  if (matchedFlags.length >= 3) {
    result = {
      riskLevel: 'High',
      confidence: 82,
      reasons: [
        'Requests personal information',
        'Uses urgent payment language',
        'Similar to known scam patterns',
      ],
      recommendation: 'Do not respond. Contact your medical aid directly.',
    };
  } else if (matchedFlags.length > 0) {
    result = {
      riskLevel: 'Medium',
      confidence: 62,
      reasons: ['Contains pressure or verification language', 'May be a phishing attempt'],
      recommendation: 'Do not share details yet. Verify sender through official channels.',
    };
  } else {
    result = {
      riskLevel: 'Low',
      confidence: 22,
      reasons: ['No strong scam keywords detected'],
      recommendation: 'Proceed carefully and verify if unsure.',
    };
  }

  // NLP Enhancement
  const nlpAnalysis = analyzeMessageNLP(content);
  if (nlpAnalysis.riskBoost > 0) {
    result.reasons.push(...nlpAnalysis.reasons);
    result.confidence = Math.min(result.confidence + nlpAnalysis.riskBoost, 100);
    if (result.confidence >= 70) result.riskLevel = 'High';
    else if (result.confidence >= 40) result.riskLevel = 'Medium';
  }

  return result;
}

async function evaluateUrl(content: string): Promise<AnalyzeResponse> {
  const lower = content.toLowerCase();

  const knownDomain = knownScams.find((scam) =>
    scam.domains.some((domain) => lower.includes(domain.toLowerCase()))
  );

  if (knownDomain) {
    return {
      riskLevel: 'High',
      confidence: 90,
      reasons: [`Matches known scam domain: ${knownDomain.name}`, knownDomain.description],
      recommendation: 'Do not visit or submit any details. Report and block this URL.',
    };
  }

  const suspiciousParts = [
    'login-secure', 'verify-account', 'freegift', 'claim-now', 'fake-', 'phishing-',
    'urgent-action', 'confirm-identity', 'update-payment', 'validate-account',
    'secure-login', 'instant-approval', 'limited-offer', 'act-now', 'click-here-now',
    'verify-now', 'confirm-now', 'approve-now', 'download-app', 'install-now',
  ];

  const suspiciousMatch = suspiciousParts.some((part) => lower.includes(part));

  let result: AnalyzeResponse;
  if (suspiciousMatch) {
    result = {
      riskLevel: 'Medium',
      confidence: 68,
      reasons: ['URL structure resembles known phishing patterns'],
      recommendation: 'Avoid entering credentials. Verify the official domain first.',
    };
  } else {
    result = {
      riskLevel: 'Low',
      confidence: 28,
      reasons: ['No direct match to known scam domains'],
      recommendation: 'Still confirm URL legitimacy before sharing sensitive information.',
    };
  }

  // IPQS URL reputation (only if not already high)
  if (result.riskLevel !== 'High') {
    console.log(`[IPQS] Checking URL: ${content}`);
    const ipqsData = await getIPQSURLReputation(content);
    if (!ipqsData) {
      console.warn(`[IPQS] No data returned for URL: ${content}`);
    } else if (ipqsData.riskScore > 0) {
      result.reasons.push(...ipqsData.reasons);
      const boost = ipqsData.riskScore * 0.5;
      result.confidence = Math.min(result.confidence + boost, 100);
      if (result.confidence >= 70) result.riskLevel = 'High';
      else if (result.confidence >= 40) result.riskLevel = 'Medium';
    }
  }

  return result;
}

async function evaluatePhone(content: string): Promise<AnalyzeResponse> {
  const phone = normalizePhone(content);
  let result: AnalyzeResponse;

  // Existing scam detection
  if (KNOWN_SCAM_NUMBERS.includes(phone)) {
    result = {
      riskLevel: 'High',
      confidence: 86,
      reasons: ['Number appears on known scam caller list'],
      recommendation: 'Do not engage. Block the number and report it.',
    };
  } else {
    result = {
      riskLevel: 'Low',
      confidence: 24,
      reasons: ['Number is not in known scam list'],
      recommendation: 'Stay cautious and avoid sharing confidential information.',
    };
  }

  // 🔍 IPQualityScore Enhancement
  console.log(`[IPQS] Checking phone: ${phone}`);
  const ipqsData = await getIPQSPhoneReputation(phone);
  if (!ipqsData) {
    console.warn(`[IPQS] No data returned for phone: ${phone}`);
  } else if (ipqsData.riskScore > 0) {
    result.reasons.push(...ipqsData.reasons);
    const boost = ipqsData.riskScore * 0.5;
    result.confidence = Math.min(result.confidence + boost, 100);
    if (result.confidence >= 70) result.riskLevel = 'High';
    else if (result.confidence >= 40) result.riskLevel = 'Medium';
  }

  return result;
}

async function evaluateEmail(content: string): Promise<AnalyzeResponse> {
  let result: AnalyzeResponse = {
    riskLevel: 'Low',
    confidence: 15,
    reasons: ['Basic syntax passed, checking reputation...'],
    recommendation: 'Proceed with caution. Verify sender independently.',
  };

  console.log(`[IPQS] Checking email: ${content}`);
  const ipqsData = await getIPQSEmailReputation(content);
  if (!ipqsData) {
    console.warn(`[IPQS] No data returned for email: ${content}`);
  } else if (ipqsData.fraudScore > 0) {
    result.reasons.push(...ipqsData.reasons);
    const boost = ipqsData.fraudScore * 0.6;
    result.confidence = Math.min(result.confidence + boost, 100);
    if (result.confidence >= 70) result.riskLevel = 'High';
    else if (result.confidence >= 40) result.riskLevel = 'Medium';
  }

  return result;
}

function evaluateClaim(content: string): AnalyzeResponse {
  const lower = content.toLowerCase();
  let duplicateFlag = lower.includes('duplicateflag:true') || lower.includes('duplicate flag: true');
  let claimAmount: number | null = null;
  let peerAverage: number | null = null;

  try {
    const parsed = JSON.parse(content) as {
      duplicateFlag?: boolean;
      claimAmount?: number;
      providerPeerAverage?: number;
    };
    if (typeof parsed.duplicateFlag === 'boolean') duplicateFlag = parsed.duplicateFlag;
    if (typeof parsed.claimAmount === 'number') claimAmount = parsed.claimAmount;
    if (typeof parsed.providerPeerAverage === 'number') peerAverage = parsed.providerPeerAverage;
  } catch {
    const claimMatch = lower.match(/claim\s*amount\s*[:=]\s*(\d+(?:\.\d+)?)/i);
    const peerMatch = lower.match(/peer\s*average\s*[:=]\s*(\d+(?:\.\d+)?)/i);
    if (claimMatch) claimAmount = Number(claimMatch[1]);
    if (peerMatch) peerAverage = Number(peerMatch[1]);
  }

  if (duplicateFlag) {
    return {
      riskLevel: 'High',
      confidence: 84,
      reasons: ['Duplicate claim indicator detected'],
      recommendation: 'Escalate for manual review before processing.',
    };
  }

  if (claimAmount !== null && peerAverage !== null && claimAmount > peerAverage) {
    return {
      riskLevel: 'Medium',
      confidence: 66,
      reasons: ['Claim amount is above peer average'],
      recommendation: 'Verify supporting documents before approval.',
    };
  }

  return {
    riskLevel: 'Low',
    confidence: 30,
    reasons: ['No high-risk claim anomaly detected'],
    recommendation: 'Proceed with standard validation checks.',
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const type = body?.type as AnalyzeType;
    const content = String(body?.content ?? '').trim();

    if (!type || !content) {
      return NextResponse.json({ error: 'Missing type or content' }, { status: 400 });
    }

    if (!SUPPORTED_TYPES.includes(type)) {
      return NextResponse.json({ error: 'Unsupported type' }, { status: 400 });
    }

    // Declare result variable
    let result: AnalyzeResponse;

    // Run analysis
    if (type === 'message') result = evaluateMessage(content);
    else if (type === 'url') result = await evaluateUrl(content);
    else if (type === 'phone') result = await evaluatePhone(content);
    else if (type === 'email') result = await evaluateEmail(content);
    else result = evaluateClaim(content);

    // Get spam report count for all types except claim
    if (type === 'message' || type === 'url' || type === 'phone' || type === 'email') {
      const spamCount = await getSpamReportCount(type, content);
      result = { ...result, spamReportCount: spamCount };
    }

    // ---------- LOG TO SUPABASE & EXTRACT INDICATORS ----------
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '';
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex');

    const urls = extractUrls(content);
    const phones = extractPhones(content);
    const sector = detectSector(content);

    void (async () => {
      const { error: insertError } = await supabase.from('scan_events').insert({
        input_text: content,
        urls_detected: urls,
        phone_numbers: phones,
        risk_score: result.confidence,
        verdict: result.riskLevel,
        matched_patterns: result.reasons,
        sector: sector,
        ip_hash: ipHash,
        created_at: new Date(),
      });
      if (insertError) console.error('Failed to log scan:', insertError);

      const upsertIndicator = async (type: string, value: string) => {
        const { data, error } = await supabase
          .from('scam_indicators')
          .select('report_count, last_seen, id')
          .eq('indicator_type', type)
          .eq('indicator_value', value)
          .maybeSingle();

        if (data) {
          await supabase
            .from('scam_indicators')
            .update({
              report_count: data.report_count + 1,
              last_seen: new Date(),
            })
            .eq('id', data.id);
        } else if (!error) {
          await supabase
            .from('scam_indicators')
            .insert({
              indicator_type: type,
              indicator_value: value,
              report_count: 1,
              first_seen: new Date(),
              last_seen: new Date(),
              risk_level: result.riskLevel,
            });
        }
      };

      for (const url of urls) {
        const domain = url.replace(/^https?:\/\//, '').split('/')[0];
        await upsertIndicator('domain', domain);
      }
      for (const phone of phones) {
        await upsertIndicator('phone', phone);
      }
    })();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
