import { NextResponse } from 'next/server';

import { rateLimit } from '@/app/lib/ratelimit';
import { analyzeSocialEngineering } from '@/app/services/socialengineering';
import { detectZAFraud } from '@/app/services/zaBankRules';
import { checkSafeBrowsing } from '@/app/services/safebrowsing';
import { checkIP, resolveIPFromDomain } from '@/app/services/abuseipdb';
import { checkKnownScams } from '@/app/data/known-scams';

export async function POST(req: Request) {
  try {
    // -----------------------------
    // Rate limit
    // -----------------------------
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1';

    const rate = await rateLimit.limit(ip);

    if (!rate.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    // -----------------------------
    // Parse input
    // -----------------------------
    const body = await req.json();
    const input: string = body?.input?.trim();

    if (!input) {
      return NextResponse.json(
        { error: 'No input provided' },
        { status: 400 }
      );
    }

    let score = 100;
    const warnings: any[] = [];

    // -----------------------------
    // Known scam check
    // -----------------------------
    const knownScamCheck = checkKnownScams(input);

    if (knownScamCheck?.isKnownScam) {
      score -= 60;

      warnings.push({
        type: 'KNOWN_SCAM',
        message: `Matches known scam: ${knownScamCheck.scamName}`,
        description: knownScamCheck.description,
        severity: 'critical',
      });
    }

    // -----------------------------
    // Domain/IP checks
    // -----------------------------
    const ipAddr = await resolveIPFromDomain(input);

    if (ipAddr) {
      const abuse = await checkIP(ipAddr);

      if (abuse && abuse.abuseConfidenceScore >= 75) {
        score -= 20;

        warnings.push({
          type: 'ABUSE_IP',
          message: `IP has high abuse confidence score (${abuse.abuseConfidenceScore}%)`,
          severity: 'high',
        });
      }
    }

    // -----------------------------
    // Google Safe Browsing
    // -----------------------------
    const safeBrowsing = await checkSafeBrowsing(input);

    if (safeBrowsing?.threat) {
      score -= 30;

      warnings.push({
        type: 'SAFE_BROWSING',
        message: 'Listed by Google Safe Browsing',
        severity: 'critical',
      });
    }

    // -----------------------------
    // South Africa banking fraud rules
    // -----------------------------
    const zaFraud = detectZAFraud(input);

    if (zaFraud?.flagged) {
      score -= 25;

      warnings.push({
        type: 'ZA_BANK_FRAUD',
        message: zaFraud.reason,
        severity: 'high',
      });
    }

    // -----------------------------
    // Social engineering detection
    // -----------------------------
    const social = analyzeSocialEngineering(input);

    if (social?.risk > 0) {
      score -= social.risk;

      warnings.push({
        type: 'SOCIAL_ENGINEERING',
        message: 'Persuasion techniques detected',
        details: social.signals,
        severity: 'medium',
      });
    }

    // -----------------------------
    // Final score clamp
    // -----------------------------
    score = Math.max(0, Math.min(100, score));

    return NextResponse.json({
      input,
      score,
      verdict:
        score < 40
          ? 'Likely Scam'
          : score < 70
          ? 'Suspicious'
          : 'Likely Safe',
      warnings,
    });

  } catch (err) {
    console.error('Analyze error:', err);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
