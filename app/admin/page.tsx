'use client';
import { useState, useEffect } from 'react';

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
    // Fetch stats from an API endpoint instead of direct Supabase call
    const res = await fetch('/api/admin/stats');
    const data = await res.json();
    setStats(data);
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
          <p className="text-4xl font-bold">{stats?.totalScans}</p>
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
