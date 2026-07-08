'use client';
import { useState, useEffect } from 'react';

export default function IntelligenceDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/intelligence/stats')
      .then(res => res.json())
      .then(setStats);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold">Scam Intelligence Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-4 my-8">
        <div className="bg-white shadow p-4 rounded">
          <div className="text-2xl font-bold">{stats?.totalScans}</div>
          <div className="text-sm">Total Scans</div>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <div className="text-2xl font-bold text-red-600">{stats?.highRiskCount}</div>
          <div className="text-sm">High Risk Scans</div>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <div className="text-2xl font-bold text-yellow-600">{stats?.activePatterns}</div>
          <div className="text-sm">Active Scam Patterns</div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Trending Scams</h2>
      <div className="space-y-3">
        {stats?.patterns?.map((p: any) => (
          <div key={p.id} className="bg-white shadow p-4 rounded flex justify-between">
            <div>
              <span className="font-semibold">{p.category}</span>
              <span className="text-sm text-slate-500 ml-4">{p.count} reports</span>
            </div>
            <span className="text-sm text-slate-400">Last seen: {new Date(p.last_seen).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
