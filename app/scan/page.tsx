'use client';

import { useState, useEffect } from 'react';
import LiveStats from '@/components/LiveStats';
import type { AnalyzeResponse, ScanType } from '@/app/lib/types';

// Example queries for the "Try an example" feature
const EXAMPLES = [
  { label: 'Suspicious SMS', value: 'Your FNB account has been locked. Verify immediately: https://fnb-secure-login.co.za' },
  { label: 'Scam URL', value: 'https://fake-bank.co.za/login' },
  { label: 'Phishing Email', value: 'Dear customer, your Netflix subscription has expired. Click here to renew: https://netflix-verify.com' },
  { label: 'Scam Phone Number', value: '0825624815' },
];

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
function mapToApiType(type: ScanType): 'message' | 'url' | 'phone' | 'claim' | 'email' {
  switch (type) {
    case 'email':
      return 'email';
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
  const [scanCount, setScanCount] = useState<number | null>(null);

  // Fetch scan count on load
  useEffect(() => {
    fetch('/api/stats/scans')
      .then(res => res.json())
      .then(data => setScanCount(data.totalScans))
      .catch(() => setScanCount(300)); // fallback
  }, []);

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

  const circumference = 2 * Math.PI * 45;
  const offset = data
    ? circumference - (data.confidence / 100) * circumference
    : circumference;

  // Get actionable recommendation
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

  // Helper to check if any reason is an IPQS signal
  const hasIqpsSignals = (reasons: string[]) => {
    const keywords = ['new domain', 'low traffic', 'phishing', 'suspicious', 'malicious', 'spam', 'fraud'];
    return reasons.some(r => keywords.some(k => r.toLowerCase().includes(k)));
  };

  // Get IPQS-specific reasons for Threat Timeline
  const getIqpsTimelineItems = (reasons: string[]) => {
    const keywords = ['new domain', 'low traffic', 'phishing', 'suspicious', 'malicious', 'spam', 'fraud'];
    return reasons.filter(r => keywords.some(k => r.toLowerCase().includes(k)));
  };

  // Get non-IPQS reasons for Risk Indicators
  const getNonIqpsReasons = (reasons: string[]) => {
    const keywords = ['new domain', 'low traffic', 'phishing', 'suspicious', 'malicious', 'spam', 'fraud'];
    return reasons.filter(r => !keywords.some(k => r.toLowerCase().includes(k)));
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* HEADER */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Scam Verification Engine
          </h1>
          <p className="text-slate-600 mt-2 text-lg">Understand risk. Stop fraud. Stay protected.</p>
          <p className="text-slate-500 text-sm mt-1">Powered by The Link Digital Security</p>
        </header>

        {/* LIVESTATS */}
        <div className="max-w-3xl mx-auto mb-8">
          <LiveStats />
        </div>

        {/* INPUT SECTION - Light card style */}
        <section className="bg-white rounded-2xl shadow-md p-8 border border-slate-100 mb-8">
          <p className="text-slate-600 text-sm mb-6 text-center">
            Paste a phone number, link, email, or suspicious message below. Get a free risk score in seconds — no signup required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && analyze()}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              placeholder="e.g. 0821234567, https://example.com"
              disabled={loading}
            />
            <button
              onClick={analyze}
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Scanning…' : 'Analyze'}
            </button>
          </div>

          {/* Try an example */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-slate-500">Try an example:</span>
            {EXAMPLES.map((example, idx) => (
              <button
                key={idx}
                onClick={() => setInput(example.value)}
                className="text-indigo-600 hover:text-indigo-700 hover:underline transition text-xs"
              >
                {example.label}
                {idx < EXAMPLES.length - 1 && <span className="text-slate-300 mx-1">•</span>}
              </button>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Google Safe Browsing
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              IPQS Verified
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              No data stored
            </div>
          </div>

          {/* Stats counter */}
          <div className="mt-6 text-center text-sm text-slate-500">
            {scanCount !== null ? (
              <span className="text-indigo-600 font-semibold">{scanCount}+</span>
            ) : (
              <span className="text-indigo-600 font-semibold">300+</span>
            )}
            {' '}South Africans have verified suspicious messages this month
          </div>
        </section>

        {/* WHAT WAS ANALYZED */}
        {analyzedInput && data && (
          <section className="mb-8 bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <div className="flex items-start gap-3">
              <div className="text-indigo-700 text-sm font-semibold uppercase">
                {analyzedInput.type === 'email'
                  ? '📧 Email'
                  : analyzedInput.type === 'url'
                  ? '🌐 URL'
                  : analyzedInput.type === 'phone'
                  ? '📱 Phone'
                  : '💬 Text'}
              </div>
              <div className="flex-1">
                <div className="text-slate-900 font-mono text-sm break-all">{analyzedInput.original}</div>
                {analyzedInput.type === 'email' && (
                  <div className="text-slate-600 text-xs mt-2">
                    Analyzing domain: <span className="text-indigo-700 font-semibold">{analyzedInput.extracted}</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <section className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6">
            <p className="text-red-700 font-medium">⚠️ {error}</p>
          </section>
        )}

        {data && (
          <>
            {/* MAIN RESULTS GRID */}
            <section className="mt-8 grid lg:grid-cols-3 gap-6 mb-8">
              {/* SCORE GAUGE */}
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-md">
                <svg
                  width="120"
                  height="120"
                  className="mx-auto gauge"
                  role="img"
                  aria-label={`Scam confidence score ${data.confidence} out of 100`}
                >
                  <circle r="45" cx="60" cy="60" className="gauge-bg" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                  <circle
                    r="45"
                    cx="60"
                    cy="60"
                    className="gauge-value"
                    stroke="url(#grad)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                  />
                  <defs>
                    <linearGradient id="grad">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="text-4xl font-bold mt-4 text-slate-900">{data.confidence}</div>
                <div className={`text-sm font-semibold uppercase mt-2 ${
                  data.riskLevel === 'High'
                    ? 'text-red-600'
                    : data.riskLevel === 'Medium'
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }`}>
                  {data.riskLevel}
                </div>
                <p className="text-slate-600 text-sm mt-4">
                  {data.riskLevel === 'High'
                    ? 'Highly suspicious – do not engage.'
                    : data.riskLevel === 'Medium'
                    ? 'Potential scam – verify carefully.'
                    : 'No obvious scam indicators.'}
                </p>
              </div>

              {/* THREAT TIMELINE */}
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-md">
                <h3 className="font-bold mb-6 text-indigo-700 text-lg">Threat Timeline</h3>
                <div className="timeline">
                  {data.reasons && data.reasons.length > 0 && hasIqpsSignals(data.reasons) ? (
                    <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm">
                      {getIqpsTimelineItems(data.reasons).map((reason, idx) => (
                        <li key={idx} className="text-yellow-700">
                          ⚠️ {reason}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-600 text-sm">No significant threat signals detected.</p>
                  )}
                </div>
              </div>

              {/* RISK INDICATORS */}
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-md">
                <h3 className="font-bold mb-6 text-purple-700 text-lg">Risk Indicators</h3>
                {data.reasons && data.reasons.length > 0 ? (
                  <>
                    <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm">
                      {getNonIqpsReasons(data.reasons).map((reason, idx) => (
                        <li key={idx}>
                          {reason}
                        </li>
                      ))}
                    </ul>
                    {hasIqpsSignals(data.reasons) && (
                      <div className="mt-4 text-sm text-yellow-700 font-semibold border-t border-yellow-200 pt-3">
                        🚩 Suspicious characteristics detected
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-slate-600 text-sm">No specific risk indicators found.</p>
                )}
              </div>
            </section>

            {/* ACTIONABLE RECOMMENDATIONS */}
            {(() => {
              const rec = getRecommendation();
              if (!rec) return null;

              const colorClasses = {
                red: 'border-red-200 bg-red-50',
                yellow: 'border-yellow-200 bg-yellow-50',
                green: 'border-green-200 bg-green-50',
              };
              const titleColors = {
                red: 'text-red-700',
                yellow: 'text-yellow-700',
                green: 'text-green-700',
              };

              return (
                <section className={`mb-8 bg-white rounded-2xl p-8 border-2 shadow-md ${colorClasses[rec.color as keyof typeof colorClasses]}`}>
                  <h3 className={`text-xl font-bold mb-4 ${titleColors[rec.color as keyof typeof titleColors]}`}>
                    {rec.title}
                  </h3>
                  <ul className="space-y-3">
                    {rec.actions.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700">
                        <span className="text-indigo-600 font-bold mt-0.5">▸</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })()}

            {/* SPAM REPORT COUNT */}
            {data.spamReportCount !== undefined && (
              <div className="mb-8 bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
                <p className="text-yellow-700 text-sm">
                  ⚠️ This item has been reported as spam <strong>{data.spamReportCount}</strong> time{data.spamReportCount !== 1 ? 's' : ''} by our community.
                </p>
              </div>
            )}

            {/* ESCALATION BUTTON */}
            {data.riskLevel === 'High' && (
              <div className="mb-8 flex justify-center">
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
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-colors"
                >
                  🚨 Report this scam to authorities
                </button>
              </div>
            )}

            {/* WHY THIS SCORE */}
            <section className="mb-8 bg-white rounded-2xl p-8 border border-slate-100 shadow-md">
              <h3 className="font-bold text-slate-900 mb-6 text-lg">💡 Why This Score?</h3>
              <div className="space-y-4 text-sm">
                {data.reasons?.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span className="text-slate-700">{reason}</span>
                  </div>
                ))}
                {(!data.reasons || data.reasons.length === 0) && (
                  <p className="text-slate-600">No additional details available.</p>
                )}
              </div>
            </section>

            {/* DATA SOURCES */}
            <section className="mb-8 bg-white rounded-2xl p-8 border border-slate-100 shadow-md">
              <h3 className="font-bold text-slate-900 mb-6 text-lg">🔍 Data Sources</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-slate-700">Google Safe Browsing API</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-slate-700">AbuseIPDB Community</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-slate-700">WHOIS Registry</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-slate-700">SA Banking Intelligence</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span className="text-slate-700">Social Presence (GitHub, LinkedIn, etc.)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-slate-700">News & Web Search</span>
                </div>
              </div>
            </section>

            {/* UPSELL - PREMIUM PRODUCTS */}
            <section className="mb-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-100 shadow-md">
              <h3 className="font-bold text-indigo-700 mb-4 text-lg">🛡️ Complete Digital Protection</h3>
              <p className="text-slate-700 mb-6">
                This free scam check is just the beginning. Protect your entire digital life:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-6 bg-white rounded-xl shadow-sm border border-indigo-100">
                  <div className="text-emerald-600 text-xs font-bold mb-3 uppercase">Instant</div>
                  <div className="text-indigo-700 font-semibold mb-3">🔍 Email Scan</div>
                  <div className="text-slate-600 text-sm mb-4">
                    Check if your email has been breached in data leaks.
                  </div>
                  <div className="text-indigo-700 font-bold text-2xl">R29</div>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-purple-100">
                  <div className="text-slate-500 text-xs font-bold mb-3 uppercase">Full Profile</div>
                  <div className="text-purple-700 font-semibold mb-3">🆔 Identity Scan</div>
                  <div className="text-slate-600 text-sm mb-4">
                    Email + ID Number + Phone - comprehensive dark web scan.
                  </div>
                  <div className="text-purple-700 font-bold text-2xl">R59</div>
                </div>
              </div>
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-emerald-700 font-semibold mb-2">🏠 Smart Home Network Agent</div>
                <div className="text-slate-600 text-sm mb-3">
                  24/7 monitoring of your home network and all connected devices.
                </div>
                <div className="text-emerald-700 font-bold">Coming Soon - Join Waitlist</div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
