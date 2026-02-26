import React from 'react';

type ScanResultProps = {
  riskLevel: 'Low' | 'Medium' | 'High';
  confidence: number;
  reasons: string[];
  recommendation: string;
};

const riskStyles: Record<ScanResultProps['riskLevel'], string> = {
  Low: 'border-green-500/40 bg-green-500/10 text-green-300',
  Medium: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300',
  High: 'border-red-500/40 bg-red-500/10 text-red-300',
};

export default function ScanResult({
  riskLevel,
  confidence,
  reasons,
  recommendation,
}: ScanResultProps) {
  return (
    <section className="glass-panel p-6 mt-6">
      <div className={`inline-flex px-3 py-1 rounded-full border text-sm font-semibold ${riskStyles[riskLevel]}`}>
        Risk Level: {riskLevel.toUpperCase()}
      </div>

      <p className="text-white font-bold text-xl mt-4">Confidence: {confidence}%</p>

      <div className="mt-4">
        <p className="text-white font-semibold mb-2">Why:</p>
        <ul className="list-disc pl-6 text-slate-300 space-y-1">
          {reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <p className="text-white font-semibold mb-1">Recommendation:</p>
        <p className="text-slate-300">{recommendation}</p>
      </div>
    </section>
  );
}
