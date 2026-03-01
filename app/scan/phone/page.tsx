'use client';

import { useState } from 'react';
import ScanResult from '@/components/ScanResult';

type AnalyzeResult = {
  riskLevel: 'Low' | 'Medium' | 'High';
  confidence: number;
  reasons: string[];
  recommendation: string;
};

export default function PhoneScanPage() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  async function analyze() {
    setLoading(true);
    setResult(null);

    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'phone', content }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-3">Check Phone Number</h1>
      <p className="text-slate-300 mb-6">Enter a phone number to check known scam or impersonation risk.</p>

      <div className="glass-panel p-6">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter phone number..."
          className="w-full bg-slate-900/60 border border-white/10 rounded-xl p-4 text-white"
        />
        <button
          onClick={analyze}
          disabled={loading || !content.trim()}
          className="mt-4 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-60"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {result && <ScanResult {...result} />}
    </main>
  );
}
