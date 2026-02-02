import { NextResponse } from 'next/server';

import { rateLimit } from '@/app/lib/ratelimit';
import { calculateScore } from '@/app/services/scoring';
import { whoisLookup } from '@/app/services/whois';
import { analyzeSocialEngineering } from '@/app/services/socialengineering';
import { detectZAFraud, getLegitimateZABanks } from '@/app/services/zaBankRules';
import { checkSafeBrowsing } from '@/app/services/safebrowsing';
import { checkIP, resolveIPFromDomain } from '@/app/services/abuseipdb';
import { checkKnownScams } from '@/app/data/known-scams';

export async function POST(req: Request) {
  try {
    /* ----------------------------------
     * Rate limiting (IP-based)
     * ---------------------------------- */
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      '127.0.0.1';

    const { success } = await rateLimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.' },
        { status: 429 }
      );
    }

    /* ----------------------------------
     * Parse & validate request
     * ---------------------------------- */
    const body = await req.json();
    const { input } = body;

    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input provided.' },
        { status: 400 }
      );
    }

    /* ----------------------------------
     * Normalize domain
     * ---------------------------------- */
    const domain = input
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0]
      .split('?')[0]
      .toLowerCase()
      .trim();

    /* ----------------------------------
     * Parallel intelligence gathering
     * ---------------------------------- */
    const [whois, social, safeBrowsing] = await Promise.all([
      whoisLookup(input),
      Promise.resolve(analyzeSocialEngineering(input)),
      checkSafeBrowsing(input),
    ]);

    /* ----------------------------------
     * Abuse IP intelligence (sequential)
     * ---------------------------------- */
    let abuseData: any = null;

    try {
      const resolvedIP = await resolveIPFromDomain(domain);
      if (resolvedIP) {
        abuseData = await checkIP(resolvedIP);
      }
    } catch (err) {
      console.warn('AbuseIPDB lookup failed:', err);
    }

    /* ----------------------------------
     * South Africa bank impersonation
     * ---------------------------------- */
    const bankDetection = detectZAFraud(input, domain);

    /* ----------------------------------
     * Registration date calculation
     * ---------------------------------- */
    const registrationDate = whois?.domainAgeDays
      ? new Date(
          Date.now() - whois.domainAgeDays * 86400000
        ).toISOString()
      : undefined;

    /* ----------------------------------
     * Baseline scoring
     * ---------------------------------- */
    let result = calculateScore({
      domainAge: whois?.domainAgeDays,
      blacklist: safeBrowsing.isBlacklisted,
      blacklistThreats: safeBrowsing.threats,
      social: social.indicators.length,
      abuseScore: abuseData?.abuseScore,
      abuseReports: abuseData?.totalReports,
      country: whois?.country || abuseData?.country,
      bankImpersonation: bankDetection.isImpersonation,
      threatIndicatorCount: bankDetection.threatIndicators.length,
      registrationDate,
      lastAbuseReport: abuseData?.lastReportedAt ?? null,
    });

    /* ----------------------------------
     * Known scam static blocklist check
     * ---------------------------------- */
    const knownScamCheck = checkKnownScams(input);
    const warnings: any[] = [];

    if (knownScamCheck.isKnownScam) {
      // Heavy penalty
      result.score = Math.max(result.score - 60, 0);

      // Force critical risk
      result.risk = 'critical';

      warnings.push({
        type: 'KNOWN_SCAM',
        severity: 'critical',
        message: `Matches known scam: ${knownScamCheck.scamName}`,
        description: knownScamCheck.description,
        riskLevel: knownScamCheck.riskLevel,
      });

      result.explanation.unshift(
        `⚠️ This input matches a confirmed known scam: ${knownScamCheck.scamName}.`
      );
    }

    /* ----------------------------------
     * Response
     * ---------------------------------- */
    return NextResponse.json({
      // Core assessment
      score: result.score,
      riskLevel: result.risk,
      confidence: result.score,
      explanation: result.explanation,

      // Target
      target: domain,
      type: 'url' as const,

      // Known scam signal
      knownScam: knownScamCheck.isKnownScam
        ? {
            detected: true,
            name: knownScamCheck.scamName,
            description: knownScamCheck.description,
            riskLevel: knownScamCheck.riskLevel,
          }
        : { detected: false },

      warnings,

      // Timeline & heatmap
      timeline: result.timeline,
      heatmap: result.heatmap,

      // Bank fraud (South Africa)
      bankCheck: {
        detected: bankDetection.detectedBanks.length > 0,
        legitimateBanks: getLegitimateZABanks(),
        warnings: bankDetection.warnings,
        isImpersonation: bankDetection.isImpersonation,
        threatIndicators: bankDetection.threatIndicators,
      },

      // WHOIS
      whois: {
        domainAge: whois?.domainAgeDays,
        registrar: whois?.registrar,
        country: whois?.country,
      },

      // Safe Browsing
      safeBrowsing: {
        isBlacklisted: safeBrowsing.isBlacklisted,
        threats: safeBrowsing.threats,
      },

      // Abuse IP
      abuseIPDB: abuseData
        ? {
            abuseScore: abuseData.abuseScore,
            totalReports: abuseData.totalReports,
            country: abuseData.country,
            isp: abuseData.isp,
            lastReportedAt: abuseData.lastReportedAt,
          }
        : null,

      // Social engineering
      socialEngineering: {
        indicators: social.indicators,
        count: social.indicators.length,
      },

      // Risk breakdown
      riskBreakdown: {
        technical: safeBrowsing.isBlacklisted
          ? 100
          : whois?.domainAgeDays && whois.domainAgeDays < 90
          ? 70
          : 20,
        socialEngineering:
          social.indicators.length > 0
            ? Math.min(social.indicators.length * 30, 100)
            : 10,
        community: abuseData?.abuseScore || 0,
      },

      // Community
      community: {
        reportCount: abuseData?.totalReports || 0,
      },
    });
  } catch (error) {
    console.error('Analyze API error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        details:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      { status: 500 }
    );
  }
}
