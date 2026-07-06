
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { analyzeMessageNLP } from '@/app/lib/nlp-analyze';
import { knownScams } from '@/app/data/known-scams';
import { getSEONPhoneReputation } from '@/app/services/seonPhone';
import { getSEONEmailReputation } from '@/app/services/seonEmail';
import { getIPQSURLReputation } from '@/app/services/ipqsUrl';
import { checkPresence } from '@/app/services/trust-signals/presence';
import { fetchNews } from '@/app/services/trust-signals/news';
import { searchWeb } from '@/app/services/trust-signals/search';

type AnalyzeType = 'message' | 'url' | 'phone' | 'claim' | 'email' | 'business';

type AnalyzeResponse = {
  riskLevel: 'Low' | 'Medium' | 'High';
  confidence: number;
  reasons: string[];
  recommendation: string;
  spamReportCount?: number;
};

// ─── Flags and constants ────────────────────────────────────────────────
const MESSAGE_FLAGS = [
  // Urgency & pressure
  'urgent', 'immediately', 'asap', 'now', 'action required', 'within 24 hours',
  'today', 'as soon as possible', 'do not delay', 'time sensitive',
  // Fear & threats
  'suspended', 'locked', 'closed', 'terminated', 'compromised', 'unauthorized',
  'deactivated', 'restricted', 'pending closure', 'will be lost',
  // Authority impersonation
  'bank', 'sars', 'government', 'official', 'department', 'unit', 'agency',
  'inspection', 'fraud department', 'security team', 'head officer', 'executive',
  'commissioner', 'director', 'compliance', 'regulatory', 'authority',
  // Consignment / parcel / shipping
  'consignment', 'parcel', 'courier', 'delivery', 'unclaimed', 'package',
  'shipping', 'cargo', 'freight', 'tracking number', 'shipment',
  // Personal info requests
  'full name', 'address', 'phone number', 'email address', 'confirm your',
  'verify your account', 'update your details', 'provide your',
  'send your', 'reply with', 'confirm your identity',
  // Financial triggers
  'million', 'cash', 'wire transfer', 'bank account', 'inheritance', 'lottery',
  'prize', 'winnings', 'refund', 'tax refund', 'beneficiary', 'next of kin',
  'compensation', 'payout', 'reward', 'grant', 'relief fund',
  // Generic scam phrases
  'unexpected', 'windfall', 'guaranteed', 'risk-free', 'no risk',
  'opportunity', 'investment', 'profit', 'returns',
];

const KNOWN_SCAM_NUMBERS = ['+27721234567', '0721234567', '+27831234567'];
const SUPPORTED_TYPES: AnalyzeType[] = ['message', 'url', 'phone', 'claim', 'email', 'business'];

// ─── Supabase client ─────────────────────────────────────────────────────
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// ─── Helper functions ──────────────────────────────────────────────────
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

// ─── FSCA & NCR registration checks (inline) ──────────────────────────
async function checkFSCARegistration(businessName: string): Promise<{ registered: boolean; details?: string }> {
  try {
    const searchUrl = `https://www.fsca.co.za/Search/FSP?query=${encodeURIComponent(businessName)}`;
    const response = await fetch(searchUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TheLinkDigital/1.0)' },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.warn(`[FSCA] Search failed: ${response.status}`);
      return { registered: false };
    }

    const html = await response.text();
    const hasResults = html.includes('Results found for') || html.includes('FSP Number');
    if (hasResults) {
      const fspMatch = html.match(/FSP Number[:\s]*([A-Z0-9]+)/i);
      const nameMatch = html.match(/Name[:\s]*([^<]+)/i);
      return {
        registered: true,
        details: `FSP ${fspMatch?.[1] || ''} - ${nameMatch?.[1]?.trim() || businessName}`,
      };
    }

    return { registered: false };
  } catch (err) {
    console.error('[FSCA] Error:', err);
    return { registered: false };
  }
}

async function checkNCRRegistration(businessName: string): Promise<{ registered: boolean; details?: string }> {
  try {
    const searchUrl = `https://www.ncr.org.za/registrants?keyword=${encodeURIComponent(businessName)}`;
    const response = await fetch(searchUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TheLinkDigital/1.0)' },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.warn(`[NCR] Search failed: ${response.status}`);
      return { registered: false };
    }

    const html = await response.text();
    const ncrMatch = html.match(/NCRCP\d+/i);
    if (ncrMatch) {
      return {
        registered: true,
        details: `NCRCP ${ncrMatch[0]}`,
      };
    }

    return { registered: false };
  } catch (err) {
    console.error('[NCR] Error:', err);
    return { registered: false };
  }
}

// ─── Evaluation functions ─────────────────────────────────────────────
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
      reasons: ['Suspicious URL structure detected'],
      recommendation: 'Avoid entering credentials. Verify the official domain first.',
    };
  } else {
    result = {
      riskLevel: 'Low',
      confidence: 28,
      reasons: [],
      recommendation: 'Still confirm URL legitimacy before sharing sensitive information.',
    };
  }

  if (result.riskLevel !== 'High') {
    console.log(`[IPQS-URL] Checking URL: ${content}`);
    const ipqsData = await getIPQSURLReputation(content);

    if (!ipqsData) {
      console.warn(`[IPQS-URL] No data returned for URL: ${content}`);
    } else {
      result.reasons.push(...ipqsData.reasons);

      if (ipqsData.riskScore >= 85) {
        result.confidence = Math.max(result.confidence, 90);
        result.riskLevel = 'High';
      } else if (ipqsData.riskScore >= 60) {
        result.confidence = Math.max(result.confidence, 75);
        result.riskLevel = 'High';
      } else if (ipqsData.riskScore >= 30) {
        result.confidence = Math.max(result.confidence, 50);
        if (result.riskLevel === 'Low') result.riskLevel = 'Medium';
      } else {
        result.confidence = Math.min(result.confidence + ipqsData.riskScore, 100);
      }
    }
  }

  return result;
}

async function evaluatePhone(content: string): Promise<AnalyzeResponse> {
  const phone = normalizePhone(content);
  let result: AnalyzeResponse;

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

  console.log(`[SEON-PHONE] Checking phone: ${phone}`);
  const seonData = await getSEONPhoneReputation(phone);

  if (!seonData) {
    console.warn(`[SEON-PHONE] No data returned for phone: ${phone}`);
  } else {
    result.reasons.push(...seonData.reasons);

    if (seonData.riskScore >= 85) {
      result.confidence = Math.max(result.confidence, 90);
      result.riskLevel = 'High';
    } else if (seonData.riskScore >= 60) {
      result.confidence = Math.max(result.confidence, 75);
      result.riskLevel = 'High';
    } else if (seonData.riskScore >= 30) {
      result.confidence = Math.max(result.confidence, 50);
      if (result.riskLevel === 'Low') result.riskLevel = 'Medium';
    } else {
      result.confidence = Math.min(result.confidence + seonData.riskScore, 100);
    }
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

  console.log(`[SEON-EMAIL] Checking email: ${content}`);
  const seonData = await getSEONEmailReputation(content);

  if (!seonData) {
    console.warn(`[SEON-EMAIL] No data returned for email: ${content}`);
  } else {
    result.reasons.push(...seonData.reasons);

    if (seonData.fraudScore >= 85) {
      result.confidence = Math.max(result.confidence, 90);
      result.riskLevel = 'High';
    } else if (seonData.fraudScore >= 60) {
      result.confidence = Math.max(result.confidence, 75);
      result.riskLevel = 'High';
    } else if (seonData.fraudScore >= 30) {
      result.confidence = Math.max(result.confidence, 50);
      if (result.riskLevel === 'Low') result.riskLevel = 'Medium';
    } else {
      result.confidence = Math.min(result.confidence + seonData.fraudScore, 100);
    }
  }

  return result;
}

async function evaluateBusiness(content: string): Promise<AnalyzeResponse> {
  let result: AnalyzeResponse = {
    riskLevel: 'Low',
    confidence: 20,
    reasons: ['Checking business reputation and regulatory standing...'],
    recommendation: 'Verify the business through official channels before engaging.',
  };

  let trustPenalty = 0;
  const negativeReasons: string[] = [];
  let isRegistered = false;

  // 1. Check FSCA registration
  try {
    const fsca = await checkFSCARegistration(content);
    if (fsca.registered) {
      isRegistered = true;
      result.reasons.push(`✅ FSCA registered: ${fsca.details}`);
      result.confidence = Math.min(result.confidence + 20, 100);
    } else {
      result.reasons.push('❌ Not found on FSCA register. Financial services require FSCA registration.');
      trustPenalty += 20;
    }
  } catch (err) {
    console.warn('[FSCA] Check failed:', err);
    result.reasons.push('⚠️ FSCA registration check unavailable (service error).');
  }

  // 2. Check NCR registration
  try {
    const ncr = await checkNCRRegistration(content);
    if (ncr.registered) {
      isRegistered = true;
      result.reasons.push(`✅ NCR registered: ${ncr.details}`);
      result.confidence = Math.min(result.confidence + 15, 100);
    } else {
      result.reasons.push('❌ Not found on NCR register. Credit providers require NCR registration.');
      trustPenalty += 15;
    }
  } catch (err) {
    console.warn('[NCR] Check failed:', err);
    result.reasons.push('⚠️ NCR registration check unavailable (service error).');
  }

  // 3. News and search reputation
  try {
    const news = await fetchNews(content);
    if (news.negativeCount > 0) {
      negativeReasons.push(`Found ${news.negativeCount} negative news mentions for "${content}"`);
      trustPenalty += news.negativeCount * 5;
    }
    if (news.total === 0) {
      const searchResults = await searchWeb(content);
      const negative = searchResults.filter(r => r.sentiment === 'negative');
      if (negative.length > 0) {
        negativeReasons.push(`Found ${negative.length} negative search results for "${content}"`);
        trustPenalty += negative.length * 3;
      }
    }
  } catch (err) {
    console.warn('[Business] News/search failed:', err);
  }

  // 4. Presence check (optional)
  try {
    const presence = await checkPresence(content);
    if (presence.foundCount > 0) {
      result.reasons.push(`Found ${presence.foundCount} online profiles for this business`);
      // small positive boost if presence is found
      result.confidence = Math.min(result.confidence + 5, 100);
    }
  } catch {}

  // Apply penalties
  if (negativeReasons.length > 0) {
    result.reasons.push(...negativeReasons);
    result.confidence = Math.min(result.confidence + trustPenalty, 100);
    if (result.confidence >= 70) result.riskLevel = 'High';
    else if (result.confidence >= 40) result.riskLevel = 'Medium';
  } else {
    result.reasons.push('No significant negative reputation found for this business.');
    result.confidence = 15;
  }

  // Override if not registered and confidence is low
  if (!isRegistered && result.confidence < 30) {
    result.recommendation = 'This business appears to be operating without required regulatory registration. Do not engage.';
    result.riskLevel = 'High';
    result.confidence = Math.max(result.confidence, 75);
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

// ─── POST handler ──────────────────────────────────────────────────────
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

    let result: AnalyzeResponse;
    if (type === 'message') result = evaluateMessage(content);
    else if (type === 'url') result = await evaluateUrl(content);
    else if (type === 'phone') result = await evaluatePhone(content);
    else if (type === 'email') result = await evaluateEmail(content);
    else if (type === 'business') result = await evaluateBusiness(content);
    else result = evaluateClaim(content);

    // Spam report count
    if (type === 'message' || type === 'url' || type === 'phone' || type === 'email') {
      const spamCount = await getSpamReportCount(type, content);
      result = { ...result, spamReportCount: spamCount };
    }

    // ─── Log to Supabase ────────────────────────────────────────────────
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
