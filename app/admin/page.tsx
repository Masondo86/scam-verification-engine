// app/admin/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (using anon key for public reads)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const res = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthenticated(true);
      fetchStats();
    } else {
      alert('Wrong password');
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    const { data: scans } = await supabase
      .from('scan_events')
      .select('id, risk_score, created_at', { count: 'exact' });
    const { data: indicators } = await supabase
      .from('scam_indicators')
      .select('*')
      .order('report_count', { ascending: false })
      .limit(10);

    setStats({ scans: scans?.length || 0, topIndicators: indicators });
    setLoading(false);
  };

  if (!authenticated) {
    return (
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </div>
    );
  }

  if (loading) return <div>Loading stats...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Fraud Intelligence Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl">Total Scans</h2>
          <p className="text-4xl font-bold">{stats?.scans}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl">Top Indicators</h2>
          <ul className="list-disc pl-5">
            {stats?.topIndicators?.map((ind: any) => (
              <li key={ind.id}>
                {ind.indicator_type}: {ind.indicator_value} ({ind.report_count} reports)
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        onClick={() => fetch('/api/intelligence/campaigns')}
        className="bg-green-600 text-white px-4 py-2 rounded mr-2"
      >
        Run Campaign Detection
      </button>
      <button
        onClick={() => fetch('/api/intelligence/weekly-report')}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Generate Weekly Report
      </button>
    </div>
  );
}
