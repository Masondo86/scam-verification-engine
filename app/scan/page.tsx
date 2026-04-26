'use client';

import { useState } from 'react';
import type { AnalyzeResponse, ScanType } from '@/app/lib/types';

const BANK_HELP: Record<string, string> = {
  capitec: 'https://www.capitecbank.co.za/security-centre/',
  fnb: 'https://www.fnb.co.za/security/',
  absa: 'https://www.absa.co.za/absaafrica/security-centre/',
  standard: 'https://www.standardbank.co.za/southafrica/personal/security-centre',
  nedbank: 'https://www.nedbank.co.za/content/nedbank/desktop/gt/en/security-centre.html',
};

// Input type detection
function detectInputType(input: string): { type: ScanType; extracted: string } {
  const trimmed = input.trim();

  // Email detection
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(trimmed)) {
    const domain = trimmed.split('@')[1];
    return { type: 'email', extracted: domain };
  }

  // Phone number detection (SA format)
  const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
  if (phoneRegex.test(trimmed.replace(/\s+/g, ''))) {
    return { type: 'phone', extracted: trimmed };
  }

  // URL detection
  const urlRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}/i;
  if (urlRegex.test(trimmed)) {
    const domain = trimmed
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0]
      .split('?')[0];
    return { type: 'url', extracted: domain };
  }

  // Default to text
  return { type: 'text', extracted: trimmed };
}

// Map detected type to API-supported types
function mapToApiType(type: ScanType): 'message' | 'url' | 'phone' | 'claim' {
  switch (type) {
    case 'email':
    case 'url':
      return 'url';
    case 'phone':
      return 'phone';
    case 'text':
      return 'message';
    default:
      return 'message';
  }
}

export default function Page() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analyzedInput, setAnalyzedInput] = useState<{ original: string; type: ScanType; extracted: string } | null>(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportMessage, setReportMessage] = useState<string | null>(null);

  async function analyze() {
    if (!input.trim()) {
      setError('Please enter a URL, phone number, email, or message');
      return;
    }

    setLoading(true);
    setData(null);
    setError(null);

    // Detect input type
    const detection = detectInputType(input);
    setAnalyzedInput({ original: input, ...detection });

    // Map to API type and use extracted content
    const apiType = mapToApiType(detection.type);
    const content = detection.extracted;

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: apiType, content }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function handleReportAsSpam() {
    if (!analyzedInput || !data) return;

    setReportLoading(true);
    setReportMessage(null);

    try {
      const reportType = analyzedInput.type === 'url' ? 'url' :
                         analyzedInput.type === 'email' ? 'url' :
                         analyzedInput.type === 'phone' ? 'phone' : 'message';
      const reportContent = analyzedInput.extracted;

      const res = await fetch('/api/spam/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: reportType, content: reportContent }),
      });

      if (res.ok) {
        setReportMessage('✅ Thank you for reporting. This helps the community stay safe.');
        // Increment local count
        if (data.spamReportCount !== undefined) {
          setData({ ...data, spamReportCount: data.spamReportCount + 1 });
        }
      } else {
        const errorData = await res.json();
        setReportMessage(`⚠️ ${errorData.error || 'Failed to submit report. Please try again later.'}`);
      }
    } catch (err) {
      setReportMessage('⚠️ An error occurred while submitting your report.');
    } finally {
      setReportLoading(false);
    }
  }

  const circumference = 2 * Math.PI * 45;
  const offset = data
    ? circumference - (data.confidence / 100) * circumference
    : circumference;

  // Get actionable recommendation (based on riskLevel)
  const getRecommendation = () => {
    if (!data) return null;

    if (data.riskLevel === 'High') {
      return {
        title: '🚨 DO NOT PROCEED',
        actions: [
          'Do not click any links or provide any information',
          'Block/delete this message immediately',
          'Report to your bank if financial info was requested',
          'Run a security scan on your devices',
        ],
        color: 'red',
      };
    } else if (data.riskLevel === 'Medium') {
      return {
        title: '⚠️ PROCEED WITH CAUTION',
        actions: [
          'Verify the sender through official channels',
          'Do not share sensitive information',
          'Check the domain carefully for typos',
          'Contact the company directly using known contact details',
        ],
        color: 'yellow',
      };
    } else {
      return {
        title: '✅ APPEARS SAFE',
        actions: [
          'Still verify before sharing sensitive data',
          'Bookmark official sites for future use',
          'Stay vigilant for any suspicious behavior',
          'Report anything unusual to authorities',
        ],
        color: 'green',
      };
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-10" aria-live="polite">
      {/* HEADER */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-glow bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Scam Verification Engine
        </h1>
        <p className="text-slate-400 mt-3">Understand risk. Stop fraud. Stay protected.</p>
        <p className="text-slate-500 text-sm mt-2">Powered by The Link Digital Security</p>
      </header>

      {/* INPUT */}
      <section className="glass-panel p-6 shadow-indigo">
        <label htmlFor="scanInput" className="sr-only">
          Scam search input
        </label>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            id="scanInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && analyze()}
            className="flex-1 bg-slate-900/70 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="URL, phone number, email or message text"
            disabled={loading}
          />
          <button
            onClick={analyze}
            disabled={loading}
            className="btn-3d bg-gradient-to-r from-indigo-500 to-purple-600 border-b-indigo-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Scanning…' : 'Analyze'}
          </button>
        </div>
      </section>

      {/* WHAT WAS ANALYZED */}
      {analyzedInput && data && (
        <section className="mt-6 glass-panel p-4 border-indigo-500/30">
          <div className="flex items-start gap-3">
            <div className="text-indigo-400 text-sm font-semibold uppercase">
              {analyzedInput.type === 'email'
                ? '📧 Email'
                : analyzedInput.type === 'url'
                ? '🌐 URL'
                : analyzedInput.type === 'phone'
                ? '📱 Phone'
                : '💬 Text'}
            </div>
            <div className="flex-1">
              <div className="text-white font-mono text-sm">{analyzedInput.original}</div>
              {analyzedInput.type === 'email' && (
                <div className="text-slate-400 text-xs mt-1">
                  Analyzing domain: <span className="text-indigo-300">{analyzedInput.extracted}</span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <section className="mt-6 glass-panel p-4 border-red-500/50 shadow-lg">
          <p className="text-red-400 font-medium">⚠️ {error}</p>
        </section>
      )}

      {data && (
        <>
          {/* MAIN RESULTS GRID */}
          <section className="mt-10 grid lg:grid-cols-3 gap-6">
            {/* SCORE GAUGE */}
            <div className="glass-panel p-6 text-center">
              <svg
                width="120"
                height="120"
                className="mx-auto gauge"
                role="img"
                aria-label={`Scam confidence score ${data.confidence} out of 100`}
              >
                <circle r="45" cx="60" cy="60" className="gauge-bg" />
                <circle
                  r="45"
                  cx="60"
                  cy="60"
                  className="gauge-value"
                  stroke="url(#grad)"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
                <defs>
                  <linearGradient id="grad">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-4xl font-bold mt-4 text-white">{data.confidence}</div>
              <div
                className={`text-sm font-semibold uppercase mt-2 ${
                  data.riskLevel === 'High'
                    ? 'text-red-400'
                    : data.riskLevel === 'Medium'
                    ? 'text-yellow-400'
                    : 'text-green-400'
                }`}
              >
                {data.riskLevel}
              </div>
              <p className="text-slate-400 text-sm mt-3">
                {data.riskLevel === 'High'
                  ? 'Highly suspicious – do not engage.'
                  : data.riskLevel === 'Medium'
                  ? 'Potential scam – verify carefully.'
                  : 'No obvious scam indicators.'}
              </p>
            </div>

            {/* THREAT TIMELINE */}
            <div className="glass-panel p-6">
              <h3 className="font-bold mb-4 text-indigo-300">Threat Timeline</h3>
              <div className="timeline">
                <p className="text-slate-400 text-sm">No timeline data available</p>
              </div>
            </div>

            {/* RISK FACTORS (REASONS FROM API) */}
            <div className="glass-panel p-6">
              <h3 className="font-bold mb-4 text-purple-300">Risk Indicators</h3>
              {data.reasons && data.reasons.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2 text-slate-300">
                  {data.reasons.map((reason, idx) => (
                    <li key={idx} className="text-sm">
                      {reason}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-400 text-sm">No specific risk indicators found.</p>
              )}
            </div>
          </section>

          {/* COMMUNITY SPAM REPORT COUNT */}
          {data.spamReportCount !== undefined && (
            <div className="mt-6 p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
              <p className="text-amber-200 text-sm">
                📢 This item has been reported as spam <strong>{data.spamReportCount}</strong> time{data.spamReportCount !== 1 ? 's' : ''} by our community.
              </p>
            </div>
          )}

          {/* ACTIONABLE RECOMMENDATIONS */}
          {(() => {
            const rec = getRecommendation();
            if (!rec) return null;

            const colorClasses = {
              red: 'border-red-500/50 bg-red-500/5',
              yellow: 'border-yellow-500/50 bg-yellow-500/5',
              green: 'border-green-500/50 bg-green-500/5',
            };
            const titleColors = {
              red: 'text-red-400',
              yellow: 'text-yellow-400',
              green: 'text-green-400',
            };

            return (
              <section
                className={`mt-6 glass-panel p-6 border-2 ${
                  colorClasses[rec.color as keyof typeof colorClasses]
                }`}
              >
                <h3 className={`text-xl font-bold mb-4 ${titleColors[rec.color as keyof typeof titleColors]}`}>
                  {rec.title}
                </h3>
                <ul className="space-y-2">
                  {rec.actions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <span className="text-indigo-400 mt-0.5">▸</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })()}

          {/* REPORT AS SPAM BUTTON */}
          <div className="mt-6 flex flex-col gap-3 items-center">
            <button
              onClick={handleReportAsSpam}
              disabled={reportLoading}
              className="text-sm text-slate-400 hover:text-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {reportLoading ? '📤 Submitting report...' : '🚨 Report this ' + (analyzedInput?.type === 'url' || analyzedInput?.type === 'email' ? 'URL' : analyzedInput?.type === 'phone' ? 'phone number' : 'message') + ' as spam'}
            </button>
            {reportMessage && (
              <p className={`text-xs ${reportMessage.includes('✅') ? 'text-green-300' : 'text-amber-300'}`}>
                {reportMessage}
              </p>
            )}
          </div>

          {/* ESCALATION BUTTON (only for High risk) */}
          {data.riskLevel === 'High' && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={async () => {
                  const res = await fetch('/api/intelligence/escalate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      scanContent: analyzedInput?.original,
                      riskScore: data.confidence,
                      reasons: data.reasons,
                    }),
                  });
                  if (res.ok) alert('Thank you. This scam has been reported to authorities.');
                  else alert('Failed to submit report. Please try again later.');
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
              >
                🚨 Report this scam to authorities
              </button>
            </div>
          )}

          {/* WHY THIS SCORE - simplified to use reasons */}
          <section className="mt-6 glass-panel p-6">
            <h3 className="font-bold text-slate-200 mb-4 text-lg">💡 Why This Score?</h3>
            <div className="space-y-3 text-sm">
              {data.reasons?.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span className="text-slate-300">{reason}</span>
                </div>
              ))}
              {(!data.reasons || data.reasons.length === 0) && (
                <p className="text-slate-400">No additional details available.</p>
              )}
            </div>
          </section>

          {/* DATA SOURCES (static for now) */}
          <section className="mt-6 glass-panel p-6">
            <h3 className="font-bold text-slate-200 mb-4 text-lg">🔍 Data Sources</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-slate-300">Google Safe Browsing API</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-slate-300">AbuseIPDB Community</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-slate-300">WHOIS Registry</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-slate-300">SA Banking Intelligence</span>
              </div>
            </div>
          </section>

          {/* UPSELL - PREMIUM PRODUCTS */}
          <section className="mt-6 glass-panel p-6 border-2 border-indigo-500/50 bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
            <h3 className="font-bold text-indigo-300 mb-4 text-lg">🛡️ Complete Digital Protection</h3>
            <p className="text-slate-300 mb-6">
              This free scam check is just the beginning. Protect your entire digital life:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/50 rounded-lg border border-indigo-500/30">
                <div className="text-emerald-400 text-xs font-bold mb-2 uppercase">Instant</div>
                <div className="text-indigo-400 font-semibold mb-2">🔍 Email Scan</div>
                <div className="text-slate-400 text-sm mb-3">
                  Check if your email has been breached in data leaks.
                </div>
                <div className="text-indigo-300 font-bold text-2xl">R29</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg border border-purple-500/30">
                <div className="text-slate-500 text-xs font-bold mb-2 uppercase">Full Profile</div>
                <div className="text-purple-400 font-semibold mb-2">🆔 Identity Scan</div>
                <div className="text-slate-400 text-sm mb-3">
                  Email + ID Number + Phone - comprehensive dark web scan.
                </div>
                <div className="text-purple-300 font-bold text-2xl">R59</div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
              <div className="text-emerald-400 font-semibold mb-2">🏠 Smart Home Network Agent</div>
              <div className="text-slate-400 text-sm mb-2">
                24/7 monitoring of your home network and all connected devices.
              </div>
              <div className="text-emerald-300 font-bold">Coming Soon - Join Waitlist</div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
