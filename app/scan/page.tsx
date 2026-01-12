'use client';

import { useState } from 'react';
import type { AnalyzeResponse } from '@/app/lib/types';

export default function ScanPage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      setError('Please enter a URL, phone number, email, or message');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

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

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'safe': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'danger': return 'bg-red-100 text-red-800 border-red-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <main className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Scam Verification Engine
        </h1>
        <p className="text-gray-600 text-lg">
          Understand risk. Stop fraud. Stay protected.
        </p>
      </div>

      {/* Scan Form */}
      <form onSubmit={handleScan} className="mb-8">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="URL, phone number, email or message text"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">⚠️ {error}</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Risk Score Card */}
          <div className={`p-6 border-2 rounded-lg ${getRiskColor(result.riskLevel)}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  Risk Level: {result.riskLevel.toUpperCase()}
                </h2>
                <p className="text-sm opacity-80">{result.explanation}</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold">{result.score}</div>
                <div className="text-sm">/ 100</div>
              </div>
            </div>
            <div className="w-full bg-white bg-opacity-50 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-current transition-all duration-500"
                style={{ width: `${result.score}%` }}
              />
            </div>
          </div>

          {/* Bank Warnings */}
          {result.bankCheck && result.bankCheck.warnings.length > 0 && (
            <div className="p-6 bg-red-50 border-2 border-red-200 rounded-lg">
              <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                🏦 Bank Fraud Alert
              </h3>
              {result.bankCheck.warnings.map((warning, idx) => (
                <div key={idx} className="mb-3 p-3 bg-white rounded border border-red-200">
                  <div className="font-semibold text-red-700">{warning.bank}</div>
                  <div className="text-sm text-red-600">{warning.message}</div>
                </div>
              ))}
              {result.bankCheck.threatIndicators && result.bankCheck.threatIndicators.length > 0 && (
                <div className="mt-4 pt-4 border-t border-red-200">
                  <div className="font-semibold text-red-800 mb-2">Threat Indicators:</div>
                  <ul className="list-disc list-inside space-y-1 text-red-600 text-sm">
                    {result.bankCheck.threatIndicators.map((indicator, idx) => (
                      <li key={idx}>{indicator}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Timeline */}
          {result.timeline && result.timeline.length > 0 && (
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">📅 Timeline</h3>
              <div className="space-y-3">
                {result.timeline.map((event, idx) => (
                  <div key={idx} className={`p-3 rounded border ${getSeverityColor(event.severity)}`}>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="font-medium">{event.event}</div>
                      </div>
                      <div className="text-xs opacity-75 whitespace-nowrap">
                        {new Date(event.date).toLocaleDateString('en-ZA', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Heatmap */}
          {result.heatmap && result.heatmap.length > 0 && (
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">🗺️ Risk Factors</h3>
              <div className="space-y-3">
                {result.heatmap.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-sm text-gray-500">{item.intensity}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          item.intensity > 75 ? 'bg-red-500' :
                          item.intensity > 40 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${item.intensity}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Details */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* WHOIS Info */}
            {result.whois && (
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-4">🌐 Domain Information</h3>
                <dl className="space-y-2 text-sm">
                  {result.whois.domainAge !== undefined && (
                    <>
                      <dt className="font-semibold text-gray-700">Domain Age</dt>
                      <dd className="text-gray-600 mb-3">{result.whois.domainAge} days</dd>
                    </>
                  )}
                  {result.whois.registrar && (
                    <>
                      <dt className="font-semibold text-gray-700">Registrar</dt>
                      <dd className="text-gray-600 mb-3">{result.whois.registrar}</dd>
                    </>
                  )}
                  {result.whois.country && (
                    <>
                      <dt className="font-semibold text-gray-700">Country</dt>
                      <dd className="text-gray-600">{result.whois.country}</dd>
                    </>
                  )}
                </dl>
              </div>
            )}

            {/* Security Info */}
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4">🔒 Security Checks</h3>
              <dl className="space-y-2 text-sm">
                {result.safeBrowsing && (
                  <>
                    <dt className="font-semibold text-gray-700">Google Safe Browsing</dt>
                    <dd className={`mb-3 ${result.safeBrowsing.isBlacklisted ? 'text-red-600 font-semibold' : 'text-green-600'}`}>
                      {result.safeBrowsing.isBlacklisted ? `⛔ BLACKLISTED: ${result.safeBrowsing.threats.join(', ')}` : '✅ Clean'}
                    </dd>
                  </>
                )}
                {result.abuseIPDB && (
                  <>
                    <dt className="font-semibold text-gray-700">Community Reports</dt>
                    <dd className="text-gray-600 mb-3">
                      {result.abuseIPDB.totalReports} reports ({result.abuseIPDB.abuseScore}% confidence)
                    </dd>
                    <dt className="font-semibold text-gray-700">ISP</dt>
                    <dd className="text-gray-600">{result.abuseIPDB.isp}</dd>
                  </>
                )}
              </dl>
            </div>
          </div>

          {/* Social Engineering */}
          {result.socialEngineering && result.socialEngineering.count > 0 && (
            <div className="p-6 bg-orange-50 border border-orange-200 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-orange-800">
                🎭 Social Engineering Tactics Detected
              </h3>
              <ul className="list-disc list-inside space-y-1 text-orange-700">
                {result.socialEngineering.indicators.map((indicator, idx) => (
                  <li key={idx}>{indicator}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
