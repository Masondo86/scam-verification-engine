import { NextResponse } from 'next/server';
import { rateLimit } from '@/app/lib/ratelimit';
import { calculateScore } from '@/app/services/scoring';
import { whoisLookup } from '@/app/services/whois';
import { analyzeSocialEngineering } from '@/app/services/socialengineering';
import { detectZAFraud, getLegitimateZABanks } from '@/app/services/zaBankRules';
import { checkSafeBrowsing } from '@/app/services/safebrowsing';
import { checkIP, resolveIPFromDomain } from '@/app/services/abuseipdb';

export async function POST(req: Request) {
  try {
    // ---- Rate limiting (IP-based) ----
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';
    const { success } = await rateLimit.limit(ip);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.' },
        { status: 429 }
      );
    }

    // ---- Parse request ----
    const body = await req.json();
    const { input } = body;
    
    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    // ---- Extract domain from input ----
    const domain = input
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0]
      .split('?')[0]
      .toLowerCase()
      .trim();

    // ---- Parallel Intelligence Gathering (Free Tier Optimized) ----
    const [whois, social, safeBrowsing] = await Promise.all([
      whoisLookup(input),
      Promise.resolve(analyzeSocialEngineering(input)),
      checkSafeBrowsing(input),
    ]);

    // Resolve IP and check abuse (sequential to avoid rate limits)
    let abuseData = null;
    try {
      const resolvedIP = await resolveIPFromDomain(domain);
      if (resolvedIP) {
        abuseData = await checkIP(resolvedIP);
      }
    } catch (error) {
      console.warn('IP resolution/abuse check failed:', error);
    }

    // Check for bank fraud patterns
    const bankDetection = detectZAFraud(input, domain);

    // Calculate registration date
    const registrationDate = whois?.domainAgeDays 
      ? new Date(Date.now() - whois.domainAgeDays * 86400000).toISOString()
      : undefined;

    // ---- Comprehensive Scoring ----
    const result = calculateScore({
      domainAge: whois?.domainAgeDays ?? undefined,
      blacklist: safeBrowsing.isBlacklisted,
      blacklistThreats: safeBrowsing.threats,
      social: social.indicators.length,
      abuseScore: abuseData?.abuseScore ?? undefined,
      abuseReports: abuseData?.totalReports ?? undefined,
      country: whois?.country || abuseData?.country,
      bankImpersonation: bankDetection.isImpersonation,
      threatIndicatorCount: bankDetection.threatIndicators.length,
      registrationDate,
      lastAbuseReport: abuseData?.lastReportedAt ?? null,
    });

    // ---- Build Comprehensive Response ----
    return NextResponse.json({
      // Core risk assessment
      score: result.score,
      riskLevel: result.risk,
      explanation: result.explanation,
      confidence: result.score,
      
      // Target information
      target: domain,
      type: 'url' as const,
      
      // Timeline of events
      timeline: result.timeline,
      
      // Heatmap of risk factors
      heatmap: result.heatmap,
      
      // Bank fraud detection (SA-specific)
      bankCheck: {
        detected: bankDetection.detectedBanks.length > 0,
        legitimateBanks: getLegitimateZABanks(),
        warnings: bankDetection.warnings,
        isImpersonation: bankDetection.isImpersonation,
        threatIndicators: bankDetection.threatIndicators,
      },
      
      // WHOIS data
      whois: {
        domainAge: whois?.domainAgeDays,
        registrar: whois?.registrar,
        country: whois?.country,
      },
      
      // Security intelligence
      safeBrowsing: {
        isBlacklisted: safeBrowsing.isBlacklisted,
        threats: safeBrowsing.threats,
      },
      
      // Abuse intelligence
      abuseIPDB: abuseData ? {
        abuseScore: abuseData.abuseScore,
        totalReports: abuseData.totalReports,
        country: abuseData.country,
        isp: abuseData.isp,
        lastReportedAt: abuseData.lastReportedAt,
      } : null,
      
      // Social engineering analysis
      socialEngineering: {
        indicators: social.indicators,
        count: social.indicators.length,
      },
      
      // Risk breakdown
      riskBreakdown: {
        technical: safeBrowsing.isBlacklisted ? 100 : (whois?.domainAgeDays && whois.domainAgeDays < 90 ? 70 : 20),
        socialEngineering: social.indicators.length > 0 ? Math.min(social.indicators.length * 30, 100) : 10,
        community: abuseData?.abuseScore || 0,
      },
      
      // Community data
      community: {
        reportCount: abuseData?.totalReports || 0,
      },
    });
    
  } catch (error) {
    console.error('Analyze API error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}
