"use client";

import { userPositions } from "@/lib/data";
import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PieChart,
  ArrowUpRight,
  ExternalLink,
  RefreshCcw,
} from "lucide-react";
import clsx from "clsx";

export default function PortfolioPage() {
  const totalValue = userPositions.reduce(
    (sum, p) => sum + p.shares * p.currentPrice,
    0
  );
  const totalCost = userPositions.reduce(
    (sum, p) => sum + p.shares * p.avgPrice,
    0
  );
  const totalPnl = totalValue - totalCost;
  const totalPnlPercent = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;
  const isProfitable = totalPnl >= 0;

  const yesPositions = userPositions.filter((p) => p.side === "yes");
  const noPositions = userPositions.filter((p) => p.side === "no");

  return (
    <div className="min-h-screen bg-hero-glow">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="w-7 h-7 text-vp-accent" />
              <h1 className="text-2xl sm:text-3xl font-bold text-vp-text">
                Portfolio
              </h1>
            </div>
            <p className="text-sm text-vp-text-secondary">
              Your active positions and performance
            </p>
          </div>
          <button className="p-2 rounded-lg bg-vp-surface-2 border border-vp-border hover:border-vp-accent/30 text-vp-text-muted hover:text-vp-text transition-all">
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Portfolio summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <div className="bg-vp-surface border border-vp-border rounded-xl p-4">
            <p className="text-xs text-vp-text-muted mb-1">Portfolio Value</p>
            <p className="text-xl font-bold font-mono text-vp-text">
              ${totalValue.toFixed(2)}
            </p>
          </div>
          <div className="bg-vp-surface border border-vp-border rounded-xl p-4">
            <p className="text-xs text-vp-text-muted mb-1">Total Cost</p>
            <p className="text-xl font-bold font-mono text-vp-text">
              ${totalCost.toFixed(2)}
            </p>
          </div>
          <div className="bg-vp-surface border border-vp-border rounded-xl p-4">
            <p className="text-xs text-vp-text-muted mb-1">Total P&L</p>
            <div className="flex items-center gap-2">
              <p
                className={clsx(
                  "text-xl font-bold font-mono",
                  isProfitable ? "text-vp-yes" : "text-vp-no"
                )}
              >
                {isProfitable ? "+" : ""}${totalPnl.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="bg-vp-surface border border-vp-border rounded-xl p-4">
            <p className="text-xs text-vp-text-muted mb-1">Return</p>
            <div className="flex items-center gap-1.5">
              {isProfitable ? (
                <TrendingUp className="w-4 h-4 text-vp-yes" />
              ) : (
                <TrendingDown className="w-4 h-4 text-vp-no" />
              )}
              <p
                className={clsx(
                  "text-xl font-bold font-mono",
                  isProfitable ? "text-vp-yes" : "text-vp-no"
                )}
              >
                {isProfitable ? "+" : ""}
                {totalPnlPercent.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>

        {/* Position breakdown */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-vp-surface border border-vp-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-vp-yes" />
              <p className="text-xs font-semibold text-vp-text">
                Yes Positions
              </p>
            </div>
            <p className="text-lg font-bold font-mono text-vp-text">
              {yesPositions.length}
            </p>
            <p className="text-xs text-vp-text-muted">
              {(
                yesPositions.reduce(
                  (s, p) => s + p.shares * p.currentPrice,
                  0
                )
              ).toFixed(2)}{" "}
              USDT
            </p>
          </div>
          <div className="bg-vp-surface border border-vp-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-vp-no" />
              <p className="text-xs font-semibold text-vp-text">
                No Positions
              </p>
            </div>
            <p className="text-lg font-bold font-mono text-vp-text">
              {noPositions.length}
            </p>
            <p className="text-xs text-vp-text-muted">
              {(
                noPositions.reduce(
                  (s, p) => s + p.shares * p.currentPrice,
                  0
                )
              ).toFixed(2)}{" "}
              USDT
            </p>
          </div>
        </div>

        {/* Positions table */}
        <div className="bg-vp-surface border border-vp-border rounded-2xl overflow-hidden">
          <div className="px-5 py-3 bg-vp-surface-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-vp-text flex items-center gap-2">
              <PieChart className="w-4 h-4 text-vp-accent" />
              Open Positions
            </h3>
            <span className="text-xs text-vp-text-muted">
              {userPositions.length} active
            </span>
          </div>

          {/* Table header */}
          <div className="hidden sm:grid grid-cols-12 gap-2 px-5 py-2.5 text-[11px] font-semibold text-vp-text-muted uppercase tracking-wider border-b border-vp-border/50">
            <div className="col-span-4">Market</div>
            <div className="col-span-1 text-center">Side</div>
            <div className="col-span-1 text-right">Shares</div>
            <div className="col-span-2 text-right">Avg / Current</div>
            <div className="col-span-2 text-right">P&L</div>
            <div className="col-span-2 text-right">Value</div>
          </div>

          {/* Rows */}
          {userPositions.map((pos) => {
            const value = pos.shares * pos.currentPrice;
            const isUp = pos.pnl >= 0;
            return (
              <Link
                key={pos.marketId}
                href={`/market/${pos.marketId}`}
                className="block border-t border-vp-border/50 hover:bg-vp-surface-2/50 transition-colors"
              >
                {/* Desktop row */}
                <div className="hidden sm:grid grid-cols-12 gap-2 px-5 py-4 items-center">
                  <div className="col-span-4">
                    <p className="text-sm font-medium text-vp-text truncate pr-2 hover:text-vp-accent transition-colors">
                      {pos.marketTitle}
                    </p>
                  </div>
                  <div className="col-span-1 text-center">
                    <span
                      className={clsx(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                        pos.side === "yes"
                          ? "bg-vp-yes-dim text-vp-yes"
                          : "bg-vp-no-dim text-vp-no"
                      )}
                    >
                      {pos.side}
                    </span>
                  </div>
                  <div className="col-span-1 text-right text-sm font-mono text-vp-text">
                    {pos.shares}
                  </div>
                  <div className="col-span-2 text-right text-xs font-mono text-vp-text-secondary">
                    ${pos.avgPrice.toFixed(2)} / ${pos.currentPrice.toFixed(2)}
                  </div>
                  <div className="col-span-2 text-right">
                    <p
                      className={clsx(
                        "text-sm font-mono font-semibold",
                        isUp ? "text-vp-yes" : "text-vp-no"
                      )}
                    >
                      {isUp ? "+" : ""}${pos.pnl.toFixed(2)}
                    </p>
                    <p
                      className={clsx(
                        "text-[10px] font-mono",
                        isUp ? "text-vp-yes/70" : "text-vp-no/70"
                      )}
                    >
                      {isUp ? "+" : ""}
                      {pos.pnlPercent.toFixed(2)}%
                    </p>
                  </div>
                  <div className="col-span-2 text-right flex items-center justify-end gap-1.5">
                    <span className="text-sm font-mono font-medium text-vp-text">
                      ${value.toFixed(2)}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-vp-text-muted" />
                  </div>
                </div>

                {/* Mobile row */}
                <div className="sm:hidden px-5 py-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-vp-text flex-1 pr-2">
                      {pos.marketTitle}
                    </p>
                    <span
                      className={clsx(
                        "shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                        pos.side === "yes"
                          ? "bg-vp-yes-dim text-vp-yes"
                          : "bg-vp-no-dim text-vp-no"
                      )}
                    >
                      {pos.side}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-vp-text-muted">
                      {pos.shares} shares @ ${pos.avgPrice.toFixed(2)}
                    </span>
                    <span
                      className={clsx(
                        "font-mono font-semibold",
                        isUp ? "text-vp-yes" : "text-vp-no"
                      )}
                    >
                      {isUp ? "+" : ""}${pos.pnl.toFixed(2)} (
                      {pos.pnlPercent.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Connect wallet CTA */}
        <div className="mt-8 bg-vp-surface border border-vp-border rounded-2xl p-8 text-center gradient-border">
          <Wallet className="w-10 h-10 text-vp-accent mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-vp-text mb-2">
            Connect Your Wallet
          </h3>
          <p className="text-sm text-vp-text-secondary mb-4 max-w-md mx-auto">
            Connect your BSC wallet to start trading prediction markets.
            Supports MetaMask, Trust Wallet, and WalletConnect.
          </p>
          <button className="px-6 py-3 rounded-xl bg-vp-accent text-vp-bg font-semibold text-sm hover:bg-vp-accent-hover transition-colors shadow-glow">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
