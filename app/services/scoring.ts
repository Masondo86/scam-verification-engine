import type { TimelineEvent, HeatmapData } from '@/app/lib/types';

export interface ScoringSignals {
  domainAge?: number;
  blacklist?: boolean;
  blacklistThreats?: string[];
  social?: number;
  abuseScore?: number;
  abuseReports?: number;
  country?: string;
  bankImpersonation?: boolean;
  threatIndicatorCount?: number;
  registrationDate?: string;
  lastAbuseReport?: string | null;
}

export interface ScoringResult {
  score: number;
  risk: "safe" | "medium" | "high";
  timeline: TimelineEvent[];
  heatmap: HeatmapData[];
  explanation: string;
}

export function calculateScore(signals: ScoringSignals): ScoringResult {
  let score = 100;
  const timeline: TimelineEvent[] = [];
  const heatmap: HeatmapData[] = [];
  const explanationParts: string[] = [];

  // === BLACKLIST CHECKING (Highest Priority) ===
  if (signals.blacklist) {
    score -= 50;
    const threats = signals.blacklistThreats?.join(', ') || 'malicious activity';
    heatmap.push({
      category: "Security Blacklist",
      intensity: 100,
      description: `Flagged by Google Safe Browsing: ${threats}`
    });
    timeline.push({
      date: new Date().toISOString(),
      event: `⛔ BLACKLISTED: ${threats}`,
      severity: "danger"
    });
    explanationParts.push(`**CRITICAL: Domain is blacklisted for ${threats}**`);
  }

  // === DOMAIN AGE ===
  if (signals.domainAge !== undefined) {
    if (signals.domainAge < 30) {
      score -= 30;
      heatmap.push({
        category: "Domain Age",
        intensity: 90,
        description: `Only ${signals.domainAge} days old - extremely suspicious`
      });
      explanationParts.push(`Domain registered just ${signals.domainAge} days ago (very new)`);
    } else if (signals.domainAge < 180) {
      score -= 15;
      heatmap.push({
        category: "Domain Age",
        intensity: 50,
        description: `${signals.domainAge} days old - relatively new`
      });
      explanationParts.push(`Domain is ${signals.domainAge} days old (relatively new)`);
    } else {
      heatmap.push({
        category: "Domain Age",
        intensity: 10,
        description: `${signals.domainAge} days old - established domain`
      });
    }

    if (signals.registrationDate) {
      timeline.push({
        date: signals.registrationDate,
        event: "Domain registered",
        severity: signals.domainAge < 30 ? "danger" : signals.domainAge < 180 ? "warning" : "info"
      });
    }
  }

  // === ABUSE REPORTS ===
  if (signals.abuseScore !== undefined && signals.abuseScore > 0) {
    const abusePenalty = Math.floor(signals.abuseScore / 2);
    score -= abusePenalty;
    
    heatmap.push({
      category: "Community Reports",
      intensity: signals.abuseScore,
      description: `${signals.abuseScore}% abuse confidence (${signals.abuseReports || 0} reports)`
    });

    if (signals.abuseScore > 75) {
      explanationParts.push(`**HIGH abuse score: ${signals.abuseScore}% with ${signals.abuseReports} community reports**`);
    } else if (signals.abuseScore > 25) {
      explanationParts.push(`Moderate abuse score: ${signals.abuseScore}% (${signals.abuseReports} reports)`);
    }

    timeline.push({
      date: new Date().toISOString(),
      event: `Community abuse confidence: ${signals.abuseScore}% (${signals.abuseReports} reports)`,
      severity: signals.abuseScore > 75 ? "danger" : signals.abuseScore > 25 ? "warning" : "info"
    });

    if (signals.lastAbuseReport) {
      timeline.push({
        date: signals.lastAbuseReport,
        event: "Last abuse report filed",
        severity: "warning"
      });
    }
  }

  // === SOCIAL ENGINEERING ===
  if (signals.social && signals.social > 0) {
    const socialScore = signals.social * 10;
    score -= socialScore;
    
    heatmap.push({
      category: "Social Engineering",
      intensity: Math.min(signals.social * 20, 100),
      description: `${signals.social} manipulation tactics detected`
    });
    
    timeline.push({
      date: new Date().toISOString(),
      event: `${signals.social} social engineering tactics identified`,
      severity: signals.social > 2 ? "danger" : "warning"
    });
    
    explanationParts.push(`${signals.social} social engineering tactics found`);
  }

  // === BANK IMPERSONATION (Critical for SA users) ===
  if (signals.bankImpersonation) {
    score -= 35;
    
    heatmap.push({
      category: "Bank Fraud",
      intensity: 95,
      description: "Impersonating South African financial institution"
    });
    
    timeline.push({
      date: new Date().toISOString(),
      event: "🏦 Bank impersonation detected",
      severity: "danger"
    });
    
    explanationParts.push("**Attempting to impersonate a legitimate SA bank**");
  }

  // === THREAT INDICATORS ===
  if (signals.threatIndicatorCount && signals.threatIndicatorCount > 0) {
    score -= signals.threatIndicatorCount * 5;
    
    heatmap.push({
      category: "Fraud Tactics",
      intensity: Math.min(signals.threatIndicatorCount * 25, 100),
      description: `${signals.threatIndicatorCount} common scam tactics identified`
    });
  }

  // === GEOGRAPHIC ORIGIN ===
  if (signals.country) {
    heatmap.push({
      category: "Location",
      intensity: 20,
      description: `Hosted in ${signals.country}`
    });
  }

  // === FINAL CALCULATION ===
  const finalScore = Math.max(score, 0);
  const risk = finalScore < 40 ? "high" : finalScore < 70 ? "medium" : "safe";

  // Add final assessment to timeline
  timeline.push({
    date: new Date().toISOString(),
    event: `🎯 Risk Assessment: ${risk.toUpperCase()} (${finalScore}/100)`,
    severity: risk === "high" ? "danger" : risk === "medium" ? "warning" : "info"
  });

  // Sort timeline by date (most recent first)
  timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Build explanation
  let explanation = "";
  if (explanationParts.length > 0) {
    explanation = explanationParts.join('. ') + '.';
  } else {
    explanation = risk === "safe" 
      ? "No significant threats detected. Domain appears legitimate." 
      : "Multiple risk factors identified. Exercise caution.";
  }

  return {
    score: finalScore,
    risk,
    timeline,
    heatmap: heatmap.sort((a, b) => b.intensity - a.intensity),
    explanation,
  };
}
