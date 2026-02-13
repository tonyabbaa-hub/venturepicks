"use client";

import { categories, MarketCategory } from "@/lib/data";
import clsx from "clsx";

interface CategoryFilterProps {
  selected: MarketCategory | "all";
  onSelect: (cat: MarketCategory | "all") => void;
}

export default function CategoryFilter({
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
      <button
        onClick={() => onSelect("all")}
        className={clsx(
          "shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
          selected === "all"
            ? "bg-vp-accent text-vp-bg shadow-glow"
            : "bg-vp-surface-2 text-vp-text-secondary hover:text-vp-text border border-vp-border hover:border-vp-accent/30"
        )}
      >
        All Markets
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={clsx(
            "shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
            selected === cat.id
              ? "bg-vp-accent text-vp-bg shadow-glow"
              : "bg-vp-surface-2 text-vp-text-secondary hover:text-vp-text border border-vp-border hover:border-vp-accent/30"
          )}
        >
          <span>{cat.icon}</span>
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
