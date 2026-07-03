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
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  // Rotate ticker every 5 seconds
  useEffect(() => {
    if (!stats?.recentFlaggedDomains?.length) return;
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % stats.recentFlaggedDomains.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [stats]);

  if (loading || !stats) {
    return (
      <div className="flex gap-4 text-sm text-slate-400">
        <span>Loading live stats...</span>
      </div>
    );
  }

  // Get current ticker item
  const currentDomain = stats.recentFlaggedDomains.length > 0
    ? stats.recentFlaggedDomains[tickerIndex % stats.recentFlaggedDomains.length]
    : null;

  return (
    <div className="bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl p-5">
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-indigo-300 drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]">
            {stats.scamsToday}
          </div>
          <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">Scams Today</div>
        </div>

        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-red-300 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
            {stats.highRiskThisWeek}
          </div>
          <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">High Risk This Week</div>
        </div>

        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
            {stats.totalScans.toLocaleString()}
          </div>
          <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">Total Scans</div>
        </div>
      </div>

      {/* Ticker - only show if we have domains */}
      {currentDomain && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-center gap-2">
            <span className="text-yellow-300 font-semibold text-xs uppercase tracking-wider flex-shrink-0">
              ⚠️ Recent Threat
            </span>
            <span className="text-amber-200 font-mono text-sm truncate max-w-[200px]">
              {currentDomain}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
