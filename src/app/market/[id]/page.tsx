"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import { markets, formatVolume, formatPercent, daysUntil } from "@/lib/data";
import {
  ArrowLeft,
  Clock,
  Users,
  MessageCircle,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Info,
  Share2,
  Bookmark,
  ExternalLink,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import clsx from "clsx";

type TimeRange = "1D" | "7D" | "30D" | "ALL";

export default function MarketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const market = markets.find((m) => m.id === id);
  const [side, setSide] = useState<"yes" | "no">("yes");
  const [amount, setAmount] = useState("");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [timeRange, setTimeRange] = useState<TimeRange>("30D");

  const chartData = useMemo(() => {
    if (!market) return [];
    switch (timeRange) {
      case "1D":
        return market.priceHistory.slice(-1);
      case "7D":
        return market.priceHistory.slice(-7);
      case "30D":
        return market.priceHistory;
      case "ALL":
        return market.priceHistory;
      default:
        return market.priceHistory;
    }
  }, [market, timeRange]);

  if (!market) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-vp-text-secondary">Market not found</p>
        <Link href="/" className="text-vp-accent text-sm mt-4 inline-block">
          Back to Markets
        </Link>
      </div>
    );
  }

  const days = daysUntil(market.endDate);
  const isPositive = market.change24h >= 0;
  const price = side === "yes" ? market.yesPrice : market.noPrice;
  const amountNum = parseFloat(amount) || 0;
  const shares = amountNum > 0 ? amountNum / price : 0;
  const potentialReturn = shares * 1 - amountNum;
  const roi = amountNum > 0 ? (potentialReturn / amountNum) * 100 : 0;

  return (
    <div className="min-h-screen bg-hero-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-vp-text-secondary hover:text-vp-accent transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Markets
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Chart + Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-vp-surface border border-vp-border rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 mb-2">
                  {market.isHot && (
                    <span className="px-2 py-0.5 rounded-full bg-vp-no-dim text-vp-no text-[10px] font-semibold uppercase tracking-wider">
                      Hot
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-vp-surface-2 text-vp-text-secondary text-[10px] font-medium capitalize">
                    {market.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-vp-surface-2 text-vp-text-muted hover:text-vp-text transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-vp-surface-2 text-vp-text-muted hover:text-vp-text transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-vp-text mb-3 leading-tight">
                {market.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-vp-text-muted">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {days} days left
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {market.traders.toLocaleString()} traders
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4" />
                  {market.comments} comments
                </span>
                <span className="flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4" />
                  Vol {formatVolume(market.totalVolume)}
                </span>
              </div>
            </div>

            {/* Price + Chart */}
            <div className="bg-vp-surface border border-vp-border rounded-2xl p-6">
              {/* Current prices */}
              <div className="flex items-center gap-6 mb-6">
                <div>
                  <p className="text-xs text-vp-text-muted mb-1">Yes Price</p>
                  <p className="text-3xl font-bold font-mono text-vp-yes">
                    {formatPercent(market.yesPrice)}
                  </p>
                </div>
                <div className="w-px h-12 bg-vp-border" />
                <div>
                  <p className="text-xs text-vp-text-muted mb-1">No Price</p>
                  <p className="text-3xl font-bold font-mono text-vp-no">
                    {formatPercent(market.noPrice)}
                  </p>
                </div>
                <div className="ml-auto">
                  <div
                    className={clsx(
                      "flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold font-mono",
                      isPositive
                        ? "bg-vp-yes-dim text-vp-yes"
                        : "bg-vp-no-dim text-vp-no"
                    )}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {isPositive ? "+" : ""}
                    {market.change24h}% (24h)
                  </div>
                </div>
              </div>

              {/* Time range selector */}
              <div className="flex items-center gap-1 mb-4">
                {(["1D", "7D", "30D", "ALL"] as TimeRange[]).map((tr) => (
                  <button
                    key={tr}
                    onClick={() => setTimeRange(tr)}
                    className={clsx(
                      "px-3 py-1 rounded-md text-xs font-medium transition-all",
                      timeRange === tr
                        ? "bg-vp-accent-dim text-vp-accent"
                        : "text-vp-text-muted hover:text-vp-text-secondary"
                    )}
                  >
                    {tr}
                  </button>
                ))}
              </div>

              {/* Chart */}
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="chartGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#00d4aa"
                          stopOpacity={0.25}
                        />
                        <stop
                          offset="100%"
                          stopColor="#00d4aa"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#2a2b3a"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="time"
                      tick={{ fill: "#5a5c6e", fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v: string) => {
                        const d = new Date(v);
                        return `${d.getMonth() + 1}/${d.getDate()}`;
                      }}
                    />
                    <YAxis
                      domain={[0, 1]}
                      tick={{ fill: "#5a5c6e", fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v: number) => `${Math.round(v * 100)}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1b25",
                        border: "1px solid #2a2b3a",
                        borderRadius: "12px",
                        fontSize: 12,
                      }}
                      labelStyle={{ color: "#8b8d9e" }}
                      formatter={(value: number) => [
                        `${Math.round(value * 100)}%`,
                        "",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="yes"
                      stroke="#00d4aa"
                      strokeWidth={2}
                      fill="url(#chartGrad)"
                      name="Yes"
                    />
                    <Area
                      type="monotone"
                      dataKey="no"
                      stroke="#ff4a6e"
                      strokeWidth={1.5}
                      fill="none"
                      name="No"
                      strokeDasharray="4 2"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Description + Resolution */}
            <div className="bg-vp-surface border border-vp-border rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-vp-text mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-vp-accent" />
                  About this Market
                </h3>
                <p className="text-sm text-vp-text-secondary leading-relaxed">
                  {market.description}
                </p>
              </div>
              <div className="pt-4 border-t border-vp-border">
                <h3 className="text-sm font-semibold text-vp-text mb-2">
                  Resolution Source
                </h3>
                <p className="text-sm text-vp-text-muted flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" />
                  {market.resolution}
                </p>
              </div>
              <div className="pt-4 border-t border-vp-border">
                <div className="flex flex-wrap gap-2">
                  {market.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-vp-surface-2 text-vp-text-muted text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Stats */}
            <div className="bg-vp-surface border border-vp-border rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-vp-text mb-4">
                Market Statistics
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    label: "24h Volume",
                    value: formatVolume(market.volume24h),
                  },
                  {
                    label: "Total Volume",
                    value: formatVolume(market.totalVolume),
                  },
                  {
                    label: "Liquidity",
                    value: formatVolume(market.liquidity),
                  },
                  {
                    label: "Traders",
                    value: market.traders.toLocaleString(),
                  },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xs text-vp-text-muted mb-1">
                      {stat.label}
                    </p>
                    <p className="text-base font-bold font-mono text-vp-text">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Trading Panel */}
          <div className="space-y-6">
            <div className="bg-vp-surface border border-vp-border rounded-2xl p-5 sticky top-20">
              <h3 className="text-sm font-semibold text-vp-text mb-4">
                Trade
              </h3>

              {/* Side selector */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                <button
                  onClick={() => setSide("yes")}
                  className={clsx(
                    "py-3 rounded-xl font-semibold text-sm transition-all",
                    side === "yes"
                      ? "bg-vp-yes text-vp-bg shadow-lg shadow-vp-yes/20"
                      : "bg-vp-surface-2 text-vp-text-secondary border border-vp-border hover:border-vp-yes/50"
                  )}
                >
                  Yes {formatPercent(market.yesPrice)}
                </button>
                <button
                  onClick={() => setSide("no")}
                  className={clsx(
                    "py-3 rounded-xl font-semibold text-sm transition-all",
                    side === "no"
                      ? "bg-vp-no text-white shadow-lg shadow-vp-no/20"
                      : "bg-vp-surface-2 text-vp-text-secondary border border-vp-border hover:border-vp-no/50"
                  )}
                >
                  No {formatPercent(market.noPrice)}
                </button>
              </div>

              {/* Order type */}
              <div className="flex items-center gap-1 mb-4 bg-vp-surface-2 rounded-lg p-1">
                <button
                  onClick={() => setOrderType("market")}
                  className={clsx(
                    "flex-1 py-1.5 rounded-md text-xs font-medium transition-all",
                    orderType === "market"
                      ? "bg-vp-surface-3 text-vp-text shadow-sm"
                      : "text-vp-text-muted"
                  )}
                >
                  Market
                </button>
                <button
                  onClick={() => setOrderType("limit")}
                  className={clsx(
                    "flex-1 py-1.5 rounded-md text-xs font-medium transition-all",
                    orderType === "limit"
                      ? "bg-vp-surface-3 text-vp-text shadow-sm"
                      : "text-vp-text-muted"
                  )}
                >
                  Limit
                </button>
              </div>

              {/* Amount input */}
              <div className="mb-4">
                <label className="text-xs text-vp-text-muted mb-1.5 block">
                  Amount (USDT)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-vp-surface-2 border border-vp-border rounded-xl px-4 py-3 text-sm font-mono text-vp-text placeholder:text-vp-text-muted focus:outline-none focus:border-vp-accent/50 focus:ring-1 focus:ring-vp-accent/20 transition-all"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-vp-text-muted">
                    USDT
                  </span>
                </div>

                {/* Quick amounts */}
                <div className="flex items-center gap-2 mt-2">
                  {[10, 50, 100, 500].map((v) => (
                    <button
                      key={v}
                      onClick={() => setAmount(v.toString())}
                      className="flex-1 py-1.5 rounded-lg bg-vp-surface-2 text-xs text-vp-text-muted hover:text-vp-text hover:bg-vp-surface-3 transition-colors font-mono"
                    >
                      ${v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order summary */}
              {amountNum > 0 && (
                <div className="bg-vp-surface-2 rounded-xl p-4 mb-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-vp-text-muted">Price per share</span>
                    <span className="font-mono text-vp-text">
                      ${price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-vp-text-muted">Shares</span>
                    <span className="font-mono text-vp-text">
                      {shares.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-vp-text-muted">
                      Potential return
                    </span>
                    <span className="font-mono text-vp-yes">
                      +${potentialReturn.toFixed(2)} ({roi.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex justify-between text-xs pt-2 border-t border-vp-border">
                    <span className="text-vp-text-muted">Max payout</span>
                    <span className="font-mono font-semibold text-vp-text">
                      ${shares.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                className={clsx(
                  "w-full py-3.5 rounded-xl font-semibold text-sm transition-all",
                  side === "yes"
                    ? "bg-vp-yes text-vp-bg hover:bg-vp-accent-hover shadow-lg shadow-vp-yes/20"
                    : "bg-vp-no text-white hover:brightness-110 shadow-lg shadow-vp-no/20",
                  !amountNum && "opacity-50 cursor-not-allowed"
                )}
                disabled={!amountNum}
              >
                {amountNum
                  ? `Buy ${side === "yes" ? "Yes" : "No"} — $${amountNum.toFixed(2)}`
                  : "Enter amount to trade"}
              </button>

              <p className="text-[10px] text-vp-text-muted text-center mt-3">
                Trades settle on BNB Smart Chain. Fees: 0.5%
              </p>
            </div>

            {/* Order book preview */}
            <div className="bg-vp-surface border border-vp-border rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-vp-text mb-4">
                Order Book
              </h3>
              <div className="space-y-1">
                {/* Asks */}
                {[0.05, 0.04, 0.03, 0.02, 0.01].map((offset, i) => {
                  const askPrice = Math.min(
                    0.99,
                    market.yesPrice + offset
                  );
                  const depth = (5 - i) * 20;
                  return (
                    <div key={`ask-${i}`} className="relative">
                      <div
                        className="absolute inset-y-0 right-0 bg-vp-no/8 rounded-sm"
                        style={{ width: `${depth}%` }}
                      />
                      <div className="relative flex items-center justify-between px-2 py-1 text-xs font-mono">
                        <span className="text-vp-no">
                          {formatPercent(askPrice)}
                        </span>
                        <span className="text-vp-text-muted">
                          {(Math.random() * 5000 + 500).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Spread */}
                <div className="text-center py-1.5">
                  <span className="text-xs font-mono text-vp-accent font-semibold">
                    {formatPercent(market.yesPrice)}
                  </span>
                  <span className="text-[10px] text-vp-text-muted ml-2">
                    Spread: 1%
                  </span>
                </div>

                {/* Bids */}
                {[0.01, 0.02, 0.03, 0.04, 0.05].map((offset, i) => {
                  const bidPrice = Math.max(
                    0.01,
                    market.yesPrice - offset
                  );
                  const depth = (i + 1) * 20;
                  return (
                    <div key={`bid-${i}`} className="relative">
                      <div
                        className="absolute inset-y-0 right-0 bg-vp-yes/8 rounded-sm"
                        style={{ width: `${depth}%` }}
                      />
                      <div className="relative flex items-center justify-between px-2 py-1 text-xs font-mono">
                        <span className="text-vp-yes">
                          {formatPercent(bidPrice)}
                        </span>
                        <span className="text-vp-text-muted">
                          {(Math.random() * 5000 + 500).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
