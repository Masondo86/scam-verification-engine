'use client';

import { useState } from 'react';
import ScanResult from '@/components/ScanResult';

type AnalyzeResult = {
  riskLevel: 'Low' | 'Medium' | 'High';
  confidence: number;
  reasons: string[];
  recommendation: string;
};

export default function MessageScanPage() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  async function analyze() {
    setLoading(true);
    setResult(null);

    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'message', content }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-3">Scan Email or SMS</h1>
      <p className="text-slate-300 mb-6">Paste a suspicious message to check for scam patterns.</p>

      <div className="glass-panel p-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste suspicious email or SMS here..."
          className="w-full min-h-40 bg-slate-900/60 border border-white/10 rounded-xl p-4 text-white"
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
