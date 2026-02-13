"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown, Clock, Users, MessageCircle } from "lucide-react";
import { Market, formatVolume, formatPercent, daysUntil } from "@/lib/data";
import clsx from "clsx";
import MiniChart from "./MiniChart";

export default function MarketCard({ market }: { market: Market }) {
  const days = daysUntil(market.endDate);
  const isPositive = market.change24h >= 0;

  return (
    <Link href={`/market/${market.id}`}>
      <div className="group relative bg-vp-surface border border-vp-border rounded-2xl p-5 hover:border-vp-accent/30 transition-all duration-300 hover:shadow-glow cursor-pointer h-full flex flex-col">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3">
          {market.isHot && (
            <span className="px-2 py-0.5 rounded-full bg-vp-no-dim text-vp-no text-[10px] font-semibold uppercase tracking-wider">
              Hot
            </span>
          )}
          {market.isNew && (
            <span className="px-2 py-0.5 rounded-full bg-vp-accent-dim text-vp-accent text-[10px] font-semibold uppercase tracking-wider">
              New
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full bg-vp-surface-2 text-vp-text-secondary text-[10px] font-medium capitalize">
            {market.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-semibold text-vp-text leading-snug mb-4 group-hover:text-vp-accent transition-colors line-clamp-2 flex-grow-0">
          {market.title}
        </h3>

        {/* Mini chart */}
        <div className="h-12 mb-4">
          <MiniChart data={market.priceHistory} />
        </div>

        {/* Price bars */}
        <div className="space-y-2 mb-4 flex-grow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-vp-yes" />
              <span className="text-xs text-vp-text-secondary">Yes</span>
            </div>
            <span className="text-sm font-bold text-vp-yes font-mono">
              {formatPercent(market.yesPrice)}
            </span>
          </div>
          <div className="relative h-2 bg-vp-surface-3 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-vp-yes/80 to-vp-yes transition-all duration-1000"
              style={{ width: `${market.yesPrice * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-vp-no" />
              <span className="text-xs text-vp-text-secondary">No</span>
            </div>
            <span className="text-sm font-bold text-vp-no font-mono">
              {formatPercent(market.noPrice)}
            </span>
          </div>
        </div>

        {/* Footer stats */}
        <div className="flex items-center justify-between pt-3 border-t border-vp-border/50">
          <div className="flex items-center gap-3 text-[11px] text-vp-text-muted">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {market.traders.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {market.comments}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {days}d
            </span>
          </div>

          <div
            className={clsx(
              "flex items-center gap-0.5 text-[11px] font-semibold font-mono",
              isPositive ? "text-vp-yes" : "text-vp-no"
            )}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {isPositive ? "+" : ""}
            {market.change24h}%
          </div>
        </div>

        {/* Volume badge */}
        <div className="absolute top-4 right-4">
          <span className="text-[10px] font-mono text-vp-text-muted">
            Vol {formatVolume(market.volume24h)}
          </span>
        </div>
      </div>
    </Link>
  );
}
