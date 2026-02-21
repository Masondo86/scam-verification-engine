'use client';

import { useState } from 'react';

type CsvResult = {
  row: number;
  score: number;
  riskLevel: 'Low' | 'Medium' | 'High';
};

export default function CsvBulkUploadScanner() {
  const [results, setResults] = useState<CsvResult[]>([]);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const rows = text.split('\n').map((r) => r.trim()).filter(Boolean);
    const dataRows = rows.slice(1);

    const scored: CsvResult[] = [];

    for (let i = 0; i < dataRows.length; i += 1) {
      const [claimAmount, providerPeerAverage, duplicateFlag, icdCptMismatch, timeAnomaly] = dataRows[i].split(',');
      const res = await fetch('/api/medical-fraud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claimAmount: Number(claimAmount),
          providerPeerAverage: Number(providerPeerAverage),
          duplicateFlag: duplicateFlag === 'true',
          icdCptMismatch: icdCptMismatch === 'true',
          timeAnomaly: timeAnomaly === 'true',
        }),
      });

      if (!res.ok) continue;
      const result = await res.json();
      scored.push({ row: i + 2, score: result.finalScore, riskLevel: result.riskLevel });
    }

    setResults(scored);
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 mt-6">
      <p className="mb-3 font-semibold">📁 CSV Bulk Upload Scanner</p>
      <p className="text-sm text-gray-600 mb-3">
        CSV format: claimAmount,providerPeerAverage,duplicateFlag,icdCptMismatch,timeAnomaly
      </p>
      <input type="file" accept=".csv" onChange={onUpload} className="mb-4" />
      <div className="space-y-1 text-sm">
        {results.map((r) => (
          <div key={r.row}>
            Row {r.row}: score {r.score} ({r.riskLevel})
          </div>
        ))}
      </div>
    </div>
  );
}
