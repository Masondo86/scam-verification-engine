import { NextResponse } from 'next/server';
import { rateLimit } from '@/app/lib/ratelimit';
import { calculateScore } from '@/app/services/scoring';
import { whoisLookup } from '@/app/services/whois';
import { analyzeSocialEngineering } from '@/app/services/socialengineering';
import { detectZAFraud, getLegitimateZABanks } from '@/app/services/zaBankRules';

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

    // ---- Intelligence gathering ----
    const whois = await whoisLookup(input);
    const social = analyzeSocialEngineering(input);
    
    // Check for bank fraud patterns
    const bankDetection = detectZAFraud(input, domain);

    // Calculate registration date if domain age is available
    const registrationDate = whois?.domainAgeDays 
      ? new Date(Date.now() - whois.domainAgeDays * 86400000).toISOString()
      : undefined;

    // ---- Scoring with comprehensive signals ----
    const result = calculateScore({
      domainAge: whois?.domainAgeDays ?? undefined,
      blacklist: false, // TODO: Integrate with safebrowsing.ts for real blacklist checking
      social: social.indicators.length,
      abuseScore: undefined, // TODO: Integrate with abuseipdb.ts when IP is extracted
      country: whois?.country,
      bankImpersonation: bankDetection.isImpersonation,
      threatIndicatorCount: bankDetection.threatIndicators.length,
      registrationDate,
    });

    // ---- Build comprehensive response ----
    return NextResponse.json({
      // Core risk assessment
      score: result.score,
      riskLevel: result.risk,
      explanation: result.explanation,
      confidence: result.score, // Using score as confidence for now
      
      // Domain information
      target: domain,
      type: 'url' as const,
      
      // Timeline of events
      timeline: result.timeline,
      
      // Heatmap of risk factors
      heatmap: result.heatmap,
      
      // Bank fraud detection
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
      
      // Social engineering analysis
      socialEngineering: {
        indicators: social.indicators,
        count: social.indicators.length,
      },
      
      // Risk breakdown
      riskBreakdown: {
        technical: whois?.domainAgeDays && whois.domainAgeDays < 90 ? 70 : 20,
        socialEngineering: social.indicators.length > 0 ? social.indicators.length * 30 : 10,
        community: 15, // Placeholder until abuse reports are integrated
      },
      
      // Community data (placeholder)
      community: {
        reportCount: 0, // TODO: Integrate with abuse reporting system
      },
    });
    
  } catch (error) {
    console.error('Analyze API error:', error);
    
    // Provide more detailed error information in development
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
