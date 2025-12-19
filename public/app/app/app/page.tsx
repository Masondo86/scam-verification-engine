'use client';

import { useState } from 'react';

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
  const [data, setData] = useState<any>(null);

  async function analyze() {
    setLoading(true);
    setData(null);

    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'auto', input }),
    });

    setData(await res.json());
    setLoading(false);
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
            className="flex-1 bg-slate-900/70 border border-white/10 rounded-xl px-4 py-3"
            placeholder="URL, phone number, email or message text"
          />
          <button
            onClick={analyze}
            className="btn-3d bg-gradient-to-r from-indigo-500 to-purple-600 border-b-indigo-900"
          >
            {loading ? 'Scanning…' : 'Analyze'}
          </button>
        </div>
      </section>

      {data && (
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
            <div className="text-4xl font-bold mt-4">{data.score}</div>
            <div className="text-slate-400">{data.riskLevel}</div>
          </div>

          {/* THREAT TIMELINE */}
          <div className="glass-panel p-6">
            <h3 className="font-bold mb-4 text-indigo-300">Threat Timeline</h3>
            <div className="timeline">
              {data.timeline.map((t: any, i: number) => (
                <div key={i} className="timeline-item text-sm text-slate-300">
                  <strong>{t.date}</strong> — {t.event}
                </div>
              ))}
            </div>
          </div>

          {/* COMMUNITY HEATMAP */}
          <div className="glass-panel p-6">
            <h3 className="font-bold mb-4 text-purple-300">
              Community Reports
            </h3>
            <div className="heatmap">
              {data.heatmap.map((v: number, i: number) => (
                <div
                  key={i}
                  className="heat-cell"
                  style={{
                    background: `rgba(239,68,68,${v / 10})`,
                  }}
                  aria-label={`Report intensity ${v}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BANK HELP */}
      {data?.banks?.length > 0 && (
        <section className="mt-10 glass-panel p-6 shadow-emerald">
          <h3 className="font-bold text-emerald-400 mb-3">
            Bank Safety Resources
          </h3>
          <ul className="list-disc list-inside text-slate-300">
            {data.banks.map((b: string) => (
              <li key={b}>
                <a
                  href={BANK_HELP[b]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-emerald-300"
                >
                  {b.toUpperCase()} official fraud help page
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

    </main>
  );
}

