"use client";

import { markets } from "@/lib/data";
import { Activity, Users, DollarSign, BarChart3 } from "lucide-react";

export default function HeroStats() {
  const totalVolume = markets.reduce((sum, m) => sum + m.totalVolume, 0);
  const totalTraders = markets.reduce((sum, m) => sum + m.traders, 0);
  const totalLiquidity = markets.reduce((sum, m) => sum + m.liquidity, 0);

  const stats = [
    {
      label: "Total Volume",
      value: `$${(totalVolume / 1_000_000).toFixed(1)}M`,
      icon: DollarSign,
      color: "text-vp-accent",
    },
    {
      label: "Active Markets",
      value: markets.length.toString(),
      icon: Activity,
      color: "text-vp-purple",
    },
    {
      label: "Traders",
      value: `${(totalTraders / 1000).toFixed(1)}K`,
      icon: Users,
      color: "text-vp-gold",
    },
    {
      label: "Liquidity",
      value: `$${(totalLiquidity / 1_000_000).toFixed(1)}M`,
      icon: BarChart3,
      color: "text-vp-info",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-vp-surface border border-vp-border rounded-xl p-4 flex items-center gap-3"
        >
          <div
            className={`w-10 h-10 rounded-lg bg-vp-surface-2 flex items-center justify-center ${stat.color}`}
          >
            <stat.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-lg font-bold font-mono text-vp-text">
              {stat.value}
            </p>
            <p className="text-[11px] text-vp-text-muted">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
