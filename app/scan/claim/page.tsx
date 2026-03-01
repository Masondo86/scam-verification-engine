'use client';

import { useState } from 'react';
import ScanResult from '@/components/ScanResult';

type AnalyzeResult = {
  riskLevel: 'Low' | 'Medium' | 'High';
  confidence: number;
  reasons: string[];
  recommendation: string;
};

export default function ClaimScanPage() {
  const [content, setContent] = useState('');
  const [filename, setFilename] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFilename(file.name);
    const text = await file.text();
    setContent(text || file.name);
  }

  async function analyze() {
    setLoading(true);
    setResult(null);

    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'claim', content }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-3">Upload Claim Document</h1>
      <p className="text-slate-300 mb-6">Upload a PDF or CSV to screen for suspicious claim fraud signals.</p>

      <div className="glass-panel p-6">
        <input
          type="file"
          accept=".pdf,.csv,text/csv,application/pdf"
          onChange={onFileChange}
          className="w-full text-slate-200"
        />
        {filename && <p className="text-slate-400 mt-3 text-sm">Selected: {filename}</p>}

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
