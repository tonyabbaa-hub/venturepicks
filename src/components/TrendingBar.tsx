"use client";

import Link from "next/link";
import { markets, formatPercent } from "@/lib/data";
import { TrendingUp, TrendingDown, Flame } from "lucide-react";
import clsx from "clsx";

export default function TrendingBar() {
  const hotMarkets = markets
    .filter((m) => m.isHot)
    .sort((a, b) => b.volume24h - a.volume24h)
    .slice(0, 6);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <Flame className="w-4 h-4 text-vp-no" />
        <span className="text-sm font-semibold text-vp-text">
          Trending Now
        </span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
        {hotMarkets.map((m) => {
          const isPositive = m.change24h >= 0;
          return (
            <Link
              key={m.id}
              href={`/market/${m.id}`}
              className="shrink-0 w-56 bg-vp-surface-2 border border-vp-border rounded-xl p-3.5 hover:border-vp-accent/30 transition-all group"
            >
              <p className="text-xs font-medium text-vp-text leading-tight line-clamp-2 mb-2 group-hover:text-vp-accent transition-colors">
                {m.title}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold font-mono text-vp-yes">
                  {formatPercent(m.yesPrice)}
                </span>
                <span
                  className={clsx(
                    "flex items-center gap-0.5 text-xs font-mono font-semibold",
                    isPositive ? "text-vp-yes" : "text-vp-no"
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {isPositive ? "+" : ""}
                  {m.change24h}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
