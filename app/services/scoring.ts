import type { TimelineEvent, HeatmapData } from '@/app/lib/types';

export interface ScoringSignals {
  domainAge?: number;
  blacklist?: boolean;
  social?: number;
  abuseScore?: number;
  country?: string;
  bankImpersonation?: boolean;
  threatIndicatorCount?: number;
  registrationDate?: string;
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
  let explanation = "";

  // Domain age scoring
  if (signals.domainAge !== undefined) {
    if (signals.domainAge < 30) {
      score -= 30;
      heatmap.push({
        category: "Domain Age",
        intensity: 90,
        description: `Domain is only ${signals.domainAge} days old - very suspicious`
      });
      explanation += `Domain registered recently (${signals.domainAge} days ago). `;
    } else if (signals.domainAge < 180) {
      score -= 15;
      heatmap.push({
        category: "Domain Age",
        intensity: 50,
        description: `Domain is ${signals.domainAge} days old - moderately suspicious`
      });
      explanation += `Domain is relatively new (${signals.domainAge} days). `;
    } else {
      heatmap.push({
        category: "Domain Age",
        intensity: 10,
        description: `Domain is ${signals.domainAge} days old - established`
      });
    }

    // Add to timeline
    if (signals.registrationDate) {
      timeline.push({
        date: signals.registrationDate,
        event: "Domain registered",
        severity: signals.domainAge < 30 ? "danger" : signals.domainAge < 180 ? "warning" : "info"
      });
    }
  }

  // Blacklist scoring
  if (signals.blacklist) {
    score -= 40;
    heatmap.push({
      category: "Blacklist Status",
      intensity: 100,
      description: "Domain found on security blacklists"
    });
    timeline.push({
      date: new Date().toISOString(),
      event: "Found on security blacklist",
      severity: "danger"
    });
    explanation += "Domain is blacklisted. ";
  }

  // Social engineering scoring
  if (signals.social && signals.social > 0) {
    const socialScore = signals.social * 10;
    score -= socialScore;
    heatmap.push({
      category: "Social Engineering",
      intensity: Math.min(signals.social * 20, 100),
      description: `${signals.social} social engineering indicators detected`
    });
    timeline.push({
      date: new Date().toISOString(),
      event: `${signals.social} social engineering tactics detected`,
      severity: signals.social > 2 ? "danger" : "warning"
    });
    explanation += `${signals.social} social engineering tactics found. `;
  }

  // Abuse score (from AbuseIPDB)
  if (signals.abuseScore !== undefined && signals.abuseScore > 0) {
    const abusePenalty = Math.floor(signals.abuseScore / 2);
    score -= abusePenalty;
    heatmap.push({
      category: "Abuse Reports",
      intensity: signals.abuseScore,
      description: `${signals.abuseScore}% abuse confidence score`
    });
    timeline.push({
      date: new Date().toISOString(),
      event: `Abuse confidence: ${signals.abuseScore}%`,
      severity: signals.abuseScore > 75 ? "danger" : signals.abuseScore > 25 ? "warning" : "info"
    });
    explanation += `Community abuse score: ${signals.abuseScore}%. `;
  }

  // Bank impersonation
  if (signals.bankImpersonation) {
    score -= 35;
    heatmap.push({
      category: "Bank Impersonation",
      intensity: 95,
      description: "Attempting to impersonate legitimate financial institution"
    });
    timeline.push({
      date: new Date().toISOString(),
      event: "Bank impersonation detected",
      severity: "danger"
    });
    explanation += "Impersonating a legitimate bank. ";
  }

  // Threat indicators
  if (signals.threatIndicatorCount && signals.threatIndicatorCount > 0) {
    score -= signals.threatIndicatorCount * 5;
    heatmap.push({
      category: "Threat Indicators",
      intensity: Math.min(signals.threatIndicatorCount * 25, 100),
      description: `${signals.threatIndicatorCount} fraud tactics identified`
    });
  }

  // Geographic risk (optional enhancement)
  if (signals.country) {
    heatmap.push({
      category: "Geographic Origin",
      intensity: 30,
      description: `Hosted in ${signals.country}`
    });
  }

  const finalScore = Math.max(score, 0);
  const risk = finalScore < 40 ? "high" : finalScore < 70 ? "medium" : "safe";

  // Add current assessment to timeline
  timeline.push({
    date: new Date().toISOString(),
    event: `Risk assessment: ${risk.toUpperCase()} (Score: ${finalScore}/100)`,
    severity: risk === "high" ? "danger" : risk === "medium" ? "warning" : "info"
  });

  // Sort timeline by date (most recent first)
  timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (!explanation) {
    explanation = risk === "safe" 
      ? "No significant threats detected." 
      : "Multiple risk factors identified.";
  }

  return {
    score: finalScore,
    risk,
    timeline,
    heatmap: heatmap.sort((a, b) => b.intensity - a.intensity), // Sort by intensity
    explanation: explanation.trim()
  };
}
