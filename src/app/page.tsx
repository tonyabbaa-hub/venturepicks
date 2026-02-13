"use client";

import { useState, useMemo } from "react";
import { markets, MarketCategory } from "@/lib/data";
import MarketCard from "@/components/MarketCard";
import CategoryFilter from "@/components/CategoryFilter";
import HeroStats from "@/components/HeroStats";
import TrendingBar from "@/components/TrendingBar";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import clsx from "clsx";

type SortBy = "volume" | "newest" | "ending" | "change";

const sortOptions: { id: SortBy; label: string }[] = [
  { id: "volume", label: "Volume" },
  { id: "change", label: "24h Change" },
  { id: "newest", label: "Newest" },
  { id: "ending", label: "Ending Soon" },
];

export default function HomePage() {
  const [category, setCategory] = useState<MarketCategory | "all">("all");
  const [sortBy, setSortBy] = useState<SortBy>("volume");

  const filteredMarkets = useMemo(() => {
    let filtered = markets;

    if (category === "trending") {
      filtered = markets.filter((m) => m.isHot);
    } else if (category !== "all") {
      filtered = markets.filter((m) => m.category === category);
    }

    switch (sortBy) {
      case "volume":
        return [...filtered].sort((a, b) => b.volume24h - a.volume24h);
      case "change":
        return [...filtered].sort(
          (a, b) => Math.abs(b.change24h) - Math.abs(a.change24h)
        );
      case "newest":
        return [...filtered].sort(
          (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        );
      case "ending":
        return [...filtered].sort(
          (a, b) =>
            new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
        );
      default:
        return filtered;
    }
  }, [category, sortBy]);

  return (
    <div className="min-h-screen bg-hero-glow bg-grid">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Predict the Future of{" "}
            <span className="text-gradient">East Asia</span>
          </h1>
          <p className="text-vp-text-secondary text-sm sm:text-base max-w-xl">
            Trade on outcomes in entertainment, technology, sports, and
            business. Backed by BNB Smart Chain for fast, transparent
            settlements.
          </p>
        </div>

        <HeroStats />
      </section>

      {/* Trending */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
        <TrendingBar />
      </section>

      {/* Markets Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        {/* Filters row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <CategoryFilter selected={category} onSelect={setCategory} />

          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-vp-text-muted" />
            {sortOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSortBy(opt.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  sortBy === opt.id
                    ? "bg-vp-surface-2 text-vp-accent border border-vp-accent/30"
                    : "text-vp-text-muted hover:text-vp-text-secondary"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Market count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-vp-text-muted">
            {filteredMarkets.length} market
            {filteredMarkets.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMarkets.map((market, i) => (
            <div
              key={market.id}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <MarketCard market={market} />
            </div>
          ))}
        </div>

        {filteredMarkets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-vp-surface-2 flex items-center justify-center mb-4">
              <SlidersHorizontal className="w-8 h-8 text-vp-text-muted" />
            </div>
            <p className="text-vp-text-secondary font-medium mb-1">
              No markets found
            </p>
            <p className="text-sm text-vp-text-muted">
              Try adjusting your filters
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
