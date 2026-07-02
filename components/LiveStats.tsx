'use client';

import { useState, useEffect } from 'react';

interface Stats {
  scamsToday: number;
  highRiskThisWeek: number;
  totalScans: number;
  recentFlaggedDomains: string[];
}

export default function LiveStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [tickerIndex, setTickerIndex] = useState(0);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats/public');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  // Rotate ticker items every 5 seconds
  useEffect(() => {
    if (!stats?.recentFlaggedDomains?.length) return;
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % stats.recentFlaggedDomains.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [stats]);

  if (loading || !stats) {
    return (
      <div className="animate-pulse flex gap-4 text-sm text-slate-400">
        <span>Loading stats...</span>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-white/5 text-sm text-slate-300">
      <div className="flex flex-wrap items-center gap-4 md:gap-6">
        <div>
          <span className="font-semibold text-indigo-300">{stats.scamsToday}</span>{' '}
          <span className="text-slate-400">scams detected today</span>
        </div>
        <div>
          <span className="font-semibold text-red-300">{stats.highRiskThisWeek}</span>{' '}
          <span className="text-slate-400">high-risk this week</span>
        </div>
        <div>
          <span className="font-semibold text-purple-300">{stats.totalScans.toLocaleString()}</span>{' '}
          <span className="text-slate-400">total scans</span>
        </div>
      </div>

      {/* Ticker for recent flagged domains */}
      {stats.recentFlaggedDomains.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/10 overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-medium text-xs uppercase tracking-wider">⚠️ Recent threats</span>
            <div className="relative h-5 overflow-hidden flex-1">
              <div
                className="transition-all duration-700 ease-in-out"
                style={{ transform: `translateY(-${tickerIndex * 100}%)` }}
              >
                {stats.recentFlaggedDomains.map((domain, idx) => (
                  <div key={idx} className="h-5 flex items-center text-amber-300 font-mono text-sm">
                    {domain}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
