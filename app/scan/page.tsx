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

export default function Page() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analyzedInput, setAnalyzedInput] = useState<{ original: string; type: ScanType; extracted: string } | null>(null);

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

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: input.trim() }),
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
    ? circumference - (data.score / 100) * circumference
    : circumference;

  // Get actionable recommendation
  const getRecommendation = () => {
    if (!data) return null;
    
    if (data.riskLevel === 'high') {
      return {
        title: '🚨 DO NOT PROCEED',
        actions: [
          'Do not click any links or provide any information',
          'Block/delete this message immediately',
          'Report to your bank if financial info was requested',
          'Run a security scan on your devices'
        ],
        color: 'red'
      };
    } else if (data.riskLevel === 'medium') {
      return {
        title: '⚠️ PROCEED WITH CAUTION',
        actions: [
          'Verify the sender through official channels',
          'Do not share sensitive information',
          'Check the domain carefully for typos',
          'Contact the company directly using known contact details'
        ],
        color: 'yellow'
      };
    } else {
      return {
        title: '✅ APPEARS SAFE',
        actions: [
          'Still verify before sharing sensitive data',
          'Bookmark official sites for future use',
          'Stay vigilant for any suspicious behavior',
          'Report anything unusual to authorities'
        ],
        color: 'green'
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
        <p className="text-slate-400 mt-3">
          Understand risk. Stop fraud. Stay protected.
        </p>
        <p className="text-slate-500 text-sm mt-2">
          Powered by The Link Digital Security
        </p>
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
              {analyzedInput.type === 'email' ? '📧 Email' :
               analyzedInput.type === 'url' ? '🌐 URL' :
               analyzedInput.type === 'phone' ? '📱 Phone' :
               '💬 Text'}
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
                aria-label={`Scam confidence score ${data.score} out of 100`}
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
              <div className="text-4xl font-bold mt-4 text-white">{data.score}</div>
              <div className={`text-sm font-semibold uppercase mt-2 ${
                data.riskLevel === 'high' ? 'text-red-400' :
                data.riskLevel === 'medium' ? 'text-yellow-400' :
                'text-green-400'
              }`}>
                {data.riskLevel}
              </div>
              <p className="text-slate-400 text-sm mt-3">{data.explanation}</p>
            </div>

            {/* THREAT TIMELINE */}
            <div className="glass-panel p-6">
              <h3 className="font-bold mb-4 text-indigo-300">Threat Timeline</h3>
              <div className="timeline">
                {data.timeline && data.timeline.length > 0 ? (
                  data.timeline.slice(0, 5).map((t, i) => (
                    <div key={i} className={`timeline-item text-sm ${
                      t.severity === 'danger' ? 'text-red-300' :
                      t.severity === 'warning' ? 'text-yellow-300' :
                      'text-slate-300'
                    }`}>
                      <strong>{new Date(t.date).toLocaleDateString('en-ZA', { 
                        year: 'numeric',
                        month: 'short', 
                        day: 'numeric' 
                      })}</strong> — {t.event}
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm">No timeline data available</p>
                )}
              </div>
            </div>

            {/* RISK HEATMAP */}
            <div className="glass-panel p-6">
              <h3 className="font-bold mb-4 text-purple-300">Risk Factors</h3>
              {data.heatmap && data.heatmap.length > 0 ? (
                <div className="space-y-3">
                  {data.heatmap.slice(0, 5).map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">{item.category}</span>
                        <span className="text-slate-400">{item.intensity}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${item.intensity}%`,
                            background: item.intensity > 75 ? '#ef4444' :
                                      item.intensity > 40 ? '#f59e0b' :
                                      '#10b981'
                          }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-sm">No risk factors detected</p>
              )}
            </div>
          </section>

          {/* ACTIONABLE RECOMMENDATIONS */}
          {(() => {
            const rec = getRecommendation();
            if (!rec) return null;
            
            const colorClasses = {
              red: 'border-red-500/50 bg-red-500/5',
              yellow: 'border-yellow-500/50 bg-yellow-500/5',
              green: 'border-green-500/50 bg-green-500/5'
            };
            
            const titleColors = {
              red: 'text-red-400',
              yellow: 'text-yellow-400',
              green: 'text-green-400'
            };
            
            return (
              <section className={`mt-6 glass-panel p-6 border-2 ${colorClasses[rec.color as keyof typeof colorClasses]}`}>
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

          {/* WHY THIS SCORE */}
          <section className="mt-6 glass-panel p-6">
            <h3 className="font-bold text-slate-200 mb-4 text-lg">💡 Why This Score?</h3>
            <div className="space-y-3 text-sm">
              {data.safeBrowsing?.isBlacklisted && (
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">-50</span>
                  <span className="text-slate-300">Flagged by Google Safe Browsing as malicious</span>
                </div>
              )}
              {data.whois?.domainAge !== undefined && data.whois.domainAge < 30 && (
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">-30</span>
                  <span className="text-slate-300">Domain registered very recently ({data.whois.domainAge} days old)</span>
                </div>
              )}
              {data.whois?.domainAge === undefined && (
                <div className="flex items-start gap-3">
                  <span className="text-slate-500 font-bold">N/A</span>
                  <span className="text-slate-400">Domain age unavailable (WHOIS privacy enabled or corporate domain)</span>
                </div>
              )}
              {data.bankCheck?.isImpersonation && (
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">-35</span>
                  <span className="text-slate-300">Impersonating a South African bank</span>
                </div>
              )}
              {data.abuseIPDB && data.abuseIPDB.abuseScore > 0 && (
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 font-bold">-{Math.floor(data.abuseIPDB.abuseScore / 2)}</span>
                  <span className="text-slate-300">Community abuse reports ({data.abuseIPDB.abuseScore}% confidence)</span>
                </div>
              )}
              {data.socialEngineering && data.socialEngineering.count > 0 && (
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 font-bold">-{data.socialEngineering.count * 10}</span>
                  <span className="text-slate-300">{data.socialEngineering.count} social engineering tactics detected</span>
                </div>
              )}
              {data.score === 100 && (
                <div className="text-green-400">
                  ✓ No threats detected across all security checks
                </div>
              )}
            </div>
          </section>

          {/* DATA SOURCES */}
          <section className="mt-6 glass-panel p-6">
            <h3 className="font-bold text-slate-200 mb-4 text-lg">🔍 Data Sources</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${data.safeBrowsing ? 'bg-green-400' : 'bg-slate-600'}`} />
                <span className="text-slate-300">Google Safe Browsing API</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${data.abuseIPDB ? 'bg-green-400' : 'bg-slate-600'}`} />
                <span className="text-slate-300">AbuseIPDB Community</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${data.whois ? 'bg-green-400' : 'bg-slate-600'}`} />
                <span className="text-slate-300">WHOIS Registry</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-slate-300">SA Banking Intelligence</span>
              </div>
            </div>
          </section>

          {/* BANK WARNINGS */}
          {data.bankCheck && data.bankCheck.warnings && data.bankCheck.warnings.length > 0 && (
            <section className="mt-6 glass-panel p-6 border-red-500/50 shadow-lg">
              <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2 text-lg">
                🏦 Bank Fraud Alert
              </h3>
              {data.bankCheck.warnings.map((warning, idx) => (
                <div key={idx} className="mb-3 p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                  <div className="font-semibold text-red-300 text-lg">{warning.bank}</div>
                  <div className="text-red-200 text-sm mt-1">{warning.message}</div>
                  <div className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
                    warning.severity === 'high' ? 'bg-red-600 text-white' :
                    warning.severity === 'medium' ? 'bg-yellow-600 text-white' :
                    'bg-blue-600 text-white'
                  }`}>
                    {warning.severity.toUpperCase()} RISK
                  </div>
                </div>
              ))}
              
              {data.bankCheck.threatIndicators && data.bankCheck.threatIndicators.length > 0 && (
                <div className="mt-4 pt-4 border-t border-red-500/30">
                  <div className="font-semibold text-red-300 mb-2">Threat Indicators:</div>
                  <ul className="list-disc list-inside space-y-1 text-red-200 text-sm">
                    {data.bankCheck.threatIndicators.map((indicator, idx) => (
                      <li key={idx}>{indicator}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* SECURITY INTELLIGENCE */}
          <section className="mt-6 grid md:grid-cols-2 gap-6">
            {data.safeBrowsing && (
              <div className="glass-panel p-6">
                <h3 className="font-bold mb-3 text-indigo-300">🔒 Google Safe Browsing</h3>
                {data.safeBrowsing.isBlacklisted ? (
                  <div className="space-y-2">
                    <div className="text-red-400 font-semibold text-lg">⛔ BLACKLISTED</div>
                    <div className="text-red-300 text-sm">
                      Threats: {data.safeBrowsing.threats.join(', ')}
                    </div>
                  </div>
                ) : (
                  <div className="text-green-400 font-semibold">✅ Clean</div>
                )}
              </div>
            )}

            {data.abuseIPDB && (
              <div className="glass-panel p-6">
                <h3 className="font-bold mb-3 text-purple-300">👥 Community Reports</h3>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-slate-400">Abuse Score</dt>
                    <dd className={`font-semibold ${
                      data.abuseIPDB.abuseScore > 75 ? 'text-red-400' :
                      data.abuseIPDB.abuseScore > 25 ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {data.abuseIPDB.abuseScore}%
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Total Reports</dt>
                    <dd className="text-white">{data.abuseIPDB.totalReports}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">ISP</dt>
                    <dd className="text-white">{data.abuseIPDB.isp}</dd>
                  </div>
                </dl>
              </div>
            )}

            {data.whois && (
              <div className="glass-panel p-6">
                <h3 className="font-bold mb-3 text-emerald-300">🌐 Domain Info</h3>
                <dl className="space-y-2 text-sm">
                  {data.whois.domainAge !== undefined && (
                    <div>
                      <dt className="text-slate-400">Domain Age</dt>
                      <dd className="text-white">{data.whois.domainAge} days</dd>
                    </div>
                  )}
                  {data.whois.registrar && (
                    <div>
                      <dt className="text-slate-400">Registrar</dt>
                      <dd className="text-white">{data.whois.registrar}</dd>
                    </div>
                  )}
                  {data.whois.country && (
                    <div>
                      <dt className="text-slate-400">Country</dt>
                      <dd className="text-white">{data.whois.country}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {data.socialEngineering && data.socialEngineering.count > 0 && (
              <div className="glass-panel p-6">
                <h3 className="font-bold mb-3 text-orange-300">🎭 Social Engineering</h3>
                <p className="text-orange-200 text-sm mb-2">
                  {data.socialEngineering.count} tactics detected
                </p>
                <ul className="list-disc list-inside space-y-1 text-orange-100 text-sm">
                  {data.socialEngineering.indicators.slice(0, 3).map((indicator, idx) => (
                    <li key={idx}>{indicator}</li>
                  ))}
                </ul>
              </div>
            )}
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

          {/* TECHNICAL DETAILS (Collapsible) */}
          <details className="mt-6 glass-panel p-6">
            <summary className="font-bold text-slate-300 cursor-pointer hover:text-white transition-colors">
              🔧 Technical Details
            </summary>
            <div className="mt-4 grid md:grid-cols-2 gap-6 text-sm">
              {data.whois && (
                <div>
                  <h4 className="font-semibold text-emerald-300 mb-2">Domain Registration</h4>
                  <dl className="space-y-1">
                    {data.whois.domainAge !== undefined && (
                      <>
                        <dt className="text-slate-400">Age</dt>
                        <dd className="text-white mb-2">{data.whois.domainAge} days</dd>
                      </>
                    )}
                    {data.whois.registrar && (
                      <>
                        <dt className="text-slate-400">Registrar</dt>
                        <dd className="text-white mb-2">{data.whois.registrar}</dd>
                      </>
                    )}
                    {data.whois.country && (
                      <>
                        <dt className="text-slate-400">Country</dt>
                        <dd className="text-white">{data.whois.country}</dd>
                      </>
                    )}
                  </dl>
                </div>
              )}
              {data.abuseIPDB && (
                <div>
                  <h4 className="font-semibold text-purple-300 mb-2">IP Intelligence</h4>
                  <dl className="space-y-1">
                    <dt className="text-slate-400">Abuse Score</dt>
                    <dd className="text-white mb-2">{data.abuseIPDB.abuseScore}%</dd>
                    <dt className="text-slate-400">Total Reports</dt>
                    <dd className="text-white mb-2">{data.abuseIPDB.totalReports}</dd>
                    <dt className="text-slate-400">ISP</dt>
                    <dd className="text-white">{data.abuseIPDB.isp}</dd>
                  </dl>
                </div>
              )}
            </div>
          </details>

        </>
      )}

    </main>
  );
}
