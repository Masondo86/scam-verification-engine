'use client';

import { useEffect, useMemo, useState } from 'react';

type ClaimRow = {
  id: string;
  provider: string;
  amount: number;
  risk: 'Low' | 'Medium' | 'High';
  score: number;
};

export default function AdminDashboard() {
  const [claims, setClaims] = useState<ClaimRow[]>([
    { id: 'CLM001', provider: 'Clinic A', amount: 4200, risk: 'High', score: 74 },
    { id: 'CLM002', provider: 'Hospital B', amount: 950, risk: 'Low', score: 18 },
  ]);

  useEffect(() => {
    const tick = async () => {
      const syntheticInput = {
        claimAmount: 800 + Math.floor(Math.random() * 5000),
        providerPeerAverage: 1200,
        duplicateFlag: Math.random() > 0.7,
        icdCptMismatch: Math.random() > 0.75,
        timeAnomaly: Math.random() > 0.65,
      };

      const res = await fetch('/api/medical-fraud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(syntheticInput),
      });

      if (!res.ok) return;
      const result = await res.json();

      setClaims((prev) => {
        const newClaim: ClaimRow = {
          id: `CLM${String(prev.length + 1).padStart(3, '0')}`,
          provider: ['Clinic A', 'Hospital B', 'Practice C'][Math.floor(Math.random() * 3)],
          amount: syntheticInput.claimAmount,
          risk: result.riskLevel,
          score: result.finalScore,
        };
        return [newClaim, ...prev].slice(0, 8);
      });
    };

    tick();
    const id = setInterval(tick, 8000);
    return () => clearInterval(id);
  }, []);

  const totals = useMemo(() => {
    const highRisk = claims.filter((c) => c.risk === 'High').length;
    const mediumRisk = claims.filter((c) => c.risk === 'Medium').length;

    return {
      totalClaims: claims.length,
      highRisk,
      mediumRisk,
    };
  }, [claims]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Administrator Fraud Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 shadow rounded-xl">
          <p>Total Claims</p>
          <p className="text-xl font-bold">{totals.totalClaims}</p>
        </div>
        <div className="bg-red-100 p-4 shadow rounded-xl">
          <p>High Risk</p>
          <p className="text-xl font-bold">{totals.highRisk}</p>
        </div>
        <div className="bg-yellow-100 p-4 shadow rounded-xl">
          <p>Medium Risk</p>
          <p className="text-xl font-bold">{totals.mediumRisk}</p>
        </div>
      </div>

      <div className="bg-white p-4 shadow rounded-xl mb-6">
        <p className="font-semibold mb-3">📊 Live Risk Score Chart</p>
        <div className="flex items-end gap-2 h-32">
          {claims.slice(0, 8).reverse().map((claim) => (
            <div key={claim.id} className="flex-1 text-center">
              <div
                className={`rounded-t ${
                  claim.risk === 'High' ? 'bg-red-500' : claim.risk === 'Medium' ? 'bg-yellow-400' : 'bg-green-500'
                }`}
                style={{ height: `${Math.max(8, claim.score)}%` }}
              />
              <p className="text-[10px] mt-1 text-gray-600">{claim.id}</p>
            </div>
          ))}
        </div>
      </div>

      <table className="w-full bg-white shadow rounded-xl overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Claim ID</th>
            <th className="p-3 text-left">Provider</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Risk</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim.id} className="border-t">
              <td className="p-3">{claim.id}</td>
              <td className="p-3">{claim.provider}</td>
              <td className="p-3">R{claim.amount}</td>
              <td className="p-3 font-semibold">{claim.risk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
