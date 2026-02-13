"use client";

import { leaderboard } from "@/lib/data";
import { Trophy, TrendingUp, Target, Medal } from "lucide-react";
import clsx from "clsx";

const badgeColors: Record<string, string> = {
  Diamond: "from-cyan-400 to-blue-500",
  Platinum: "from-purple-400 to-indigo-500",
  Gold: "from-yellow-400 to-orange-500",
  Silver: "from-gray-300 to-gray-500",
};

export default function LeaderboardPage() {
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-hero-glow">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-7 h-7 text-vp-gold" />
            <h1 className="text-2xl sm:text-3xl font-bold text-vp-text">
              Leaderboard
            </h1>
          </div>
          <p className="text-sm text-vp-text-secondary">
            Top traders ranked by profit. Updated in real-time.
          </p>
        </div>

        {/* Top 3 podium */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[top3[1], top3[0], top3[2]].map((entry, i) => {
            if (!entry) return null;
            const place = i === 1 ? 1 : i === 0 ? 2 : 3;
            const heights = ["h-36", "h-44", "h-32"];
            const medals = ["🥈", "🥇", "🥉"];
            return (
              <div
                key={entry.rank}
                className="flex flex-col items-center"
              >
                <div className="text-3xl mb-2">{entry.avatar}</div>
                <p className="text-sm font-semibold text-vp-text mb-1 truncate max-w-full">
                  {entry.username}
                </p>
                <p className="text-xs font-mono text-vp-yes mb-3">
                  +${entry.profit.toLocaleString()}
                </p>
                <div
                  className={clsx(
                    "w-full rounded-t-xl flex items-start justify-center pt-4",
                    heights[i],
                    place === 1
                      ? "bg-gradient-to-b from-yellow-500/20 to-transparent border-t-2 border-yellow-500/50"
                      : place === 2
                      ? "bg-gradient-to-b from-gray-400/15 to-transparent border-t-2 border-gray-400/40"
                      : "bg-gradient-to-b from-orange-500/15 to-transparent border-t-2 border-orange-500/40"
                  )}
                >
                  <span className="text-2xl">{medals[i]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-vp-surface border border-vp-border rounded-xl p-4 text-center">
            <TrendingUp className="w-5 h-5 text-vp-yes mx-auto mb-2" />
            <p className="text-lg font-bold font-mono text-vp-text">
              ${(leaderboard.reduce((s, l) => s + l.profit, 0) / 1000).toFixed(0)}K
            </p>
            <p className="text-[11px] text-vp-text-muted">Total Profit</p>
          </div>
          <div className="bg-vp-surface border border-vp-border rounded-xl p-4 text-center">
            <Target className="w-5 h-5 text-vp-purple mx-auto mb-2" />
            <p className="text-lg font-bold font-mono text-vp-text">
              {(
                leaderboard.reduce((s, l) => s + l.winRate, 0) /
                leaderboard.length
              ).toFixed(1)}
              %
            </p>
            <p className="text-[11px] text-vp-text-muted">Avg Win Rate</p>
          </div>
          <div className="bg-vp-surface border border-vp-border rounded-xl p-4 text-center">
            <Medal className="w-5 h-5 text-vp-gold mx-auto mb-2" />
            <p className="text-lg font-bold font-mono text-vp-text">
              {leaderboard.reduce((s, l) => s + l.totalTrades, 0).toLocaleString()}
            </p>
            <p className="text-[11px] text-vp-text-muted">Total Trades</p>
          </div>
        </div>

        {/* Full table */}
        <div className="bg-vp-surface border border-vp-border rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 px-5 py-3 bg-vp-surface-2 text-[11px] font-semibold text-vp-text-muted uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Trader</div>
            <div className="col-span-2 text-right">Profit</div>
            <div className="col-span-2 text-right">Win Rate</div>
            <div className="col-span-2 text-right">Trades</div>
            <div className="col-span-1 text-right">Rank</div>
          </div>

          {/* Rows */}
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={clsx(
                "grid grid-cols-12 gap-2 px-5 py-3.5 items-center border-t border-vp-border/50 hover:bg-vp-surface-2/50 transition-colors",
                entry.rank <= 3 && "bg-vp-accent-dim/30"
              )}
            >
              <div className="col-span-1 text-sm font-mono font-bold text-vp-text-muted">
                {entry.rank}
              </div>
              <div className="col-span-4 flex items-center gap-2">
                <span className="text-lg">{entry.avatar}</span>
                <span className="text-sm font-medium text-vp-text truncate">
                  {entry.username}
                </span>
              </div>
              <div className="col-span-2 text-right text-sm font-mono font-semibold text-vp-yes">
                +${entry.profit.toLocaleString()}
              </div>
              <div className="col-span-2 text-right text-sm font-mono text-vp-text">
                {entry.winRate}%
              </div>
              <div className="col-span-2 text-right text-sm font-mono text-vp-text-secondary">
                {entry.totalTrades.toLocaleString()}
              </div>
              <div className="col-span-1 text-right">
                <span
                  className={clsx(
                    "inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-gradient-to-r text-white",
                    badgeColors[entry.badge]
                  )}
                >
                  {entry.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
