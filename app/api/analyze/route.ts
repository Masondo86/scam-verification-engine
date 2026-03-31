import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { analyzeMessageNLP } from '@/app/lib/nlp-analyze';
import { NextResponse } from 'next/server';
import { knownScams } from '@/app/data/known-scams';

type AnalyzeType = 'message' | 'url' | 'phone' | 'claim';

type AnalyzeResponse = {
  riskLevel: 'Low' | 'Medium' | 'High';
  confidence: number;
  reasons: string[];
  recommendation: string;
};

const MESSAGE_FLAGS = ['urgent', 'payment', 'verify', 'suspend', 'otp'];
const KNOWN_SCAM_NUMBERS = ['+27721234567', '0721234567', '+27831234567'];
const SUPPORTED_TYPES: AnalyzeType[] = ['message', 'url', 'phone', 'claim'];

// --------------------------------------------------------------------
// Supabase client (uses environment variables)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
// --------------------------------------------------------------------

// --------------------------------------------------------------------
// Helper functions (add more sophisticated extraction if needed)
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

function evaluateUrl(content: string): AnalyzeResponse {
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

  const suspiciousParts = ['login-secure', 'verify-account', 'freegift', 'claim-now'];
  const suspiciousMatch = suspiciousParts.some((part) => lower.includes(part));

  if (suspiciousMatch) {
    return {
      riskLevel: 'Medium',
      confidence: 68,
      reasons: ['URL structure resembles known phishing patterns'],
      recommendation: 'Avoid entering credentials. Verify the official domain first.',
    };
  }

  return {
    riskLevel: 'Low',
    confidence: 28,
    reasons: ['No direct match to known scam domains'],
    recommendation: 'Still confirm URL legitimacy before sharing sensitive information.',
  };
}

function evaluatePhone(content: string): AnalyzeResponse {
  const phone = normalizePhone(content);

  if (KNOWN_SCAM_NUMBERS.includes(phone)) {
    return {
      riskLevel: 'High',
      confidence: 86,
      reasons: ['Number appears on known scam caller list'],
      recommendation: 'Do not engage. Block the number and report it.',
    };
  }

  return {
    riskLevel: 'Low',
    confidence: 24,
    reasons: ['Number is not in known scam list'],
    recommendation: 'Stay cautious and avoid sharing confidential information.',
  };
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

    // Run analysis
    let result: AnalyzeResponse;
    if (type === 'message') result = evaluateMessage(content);
    else if (type === 'url') result = evaluateUrl(content);
    else if (type === 'phone') result = evaluatePhone(content);
    else result = evaluateClaim(content);

      // ---------- LOG TO SUPABASE (async, non‑blocking) ----------
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '';
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex');

    const urls = extractUrls(content);
    const phones = extractPhones(content);
    const sector = detectSector(content);

    // Fire and forget – wrap in async IIFE to avoid blocking and handle errors
    void (async () => {
      try {
        const { error } = await supabase.from('scan_events').insert({
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
        if (error) console.error('Supabase insert error:', error);
      } catch (err) {
        console.error('Supabase insert exception:', err);
      }
    })();
    // ------------------------------------------------------------

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
