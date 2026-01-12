'use client';

import { useState } from 'react';
import type { AnalyzeResponse } from '@/app/lib/types';

const BANK_HELP: Record<string, string> = {
  capitec: 'https://www.capitecbank.co.za/security-centre/',
  fnb: 'https://www.fnb.co.za/security/',
  absa: 'https://www.absa.co.za/absaafrica/security-centre/',
  standard: 'https://www.standardbank.co.za/southafrica/personal/security-centre',
  nedbank: 'https://www.nedbank.co.za/content/nedbank/desktop/gt/en/security-centre.html',
};

export default function Page() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function analyze() {
    if (!input.trim()) {
      setError('Please enter a URL, phone number, email, or message');
      return;
    }

    setLoading(true);
    setData(null);
    setError(null);

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
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-sm">No risk factors detected</p>
              )}
            </div>
          </section>

          {/* BANK FRAUD WARNINGS */}
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
            {/* Google Safe Browsing */}
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

            {/* AbuseIPDB */}
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

            {/* WHOIS */}
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

            {/* Social Engineering */}
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

          {/* BANK HELP RESOURCES */}
          {data.bankCheck && data.bankCheck.detected && data.bankCheck.legitimateBanks && (
            <section className="mt-6 glass-panel p-6 shadow-emerald">
              <h3 className="font-bold text-emerald-400 mb-3">
                🛡️ Official Bank Security Resources
              </h3>
              <p className="text-slate-300 text-sm mb-4">
                If you're concerned about this scan, contact your bank directly using these verified links:
              </p>
              <ul className="space-y-2">
                {data.bankCheck.legitimateBanks.slice(0, 5).map((bank) => {
                  const bankKey = bank.toLowerCase().replace(/\s+/g, '');
                  const helpUrl = BANK_HELP[bankKey];
                  return helpUrl ? (
                    <li key={bank}>
                      <a
                        href={helpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-300 hover:text-emerald-200 underline transition-colors"
                      >
                        {bank.toUpperCase()} Security Centre →
                      </a>
                    </li>
                  ) : null;
                })}
              </ul>
            </section>
          )}
        </>
      )}

    </main>
  );
}
