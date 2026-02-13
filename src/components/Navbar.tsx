"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Search, Menu, X, TrendingUp, LayoutGrid, Trophy, Wallet, ChevronDown } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { href: "/", label: "Markets", icon: LayoutGrid },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/portfolio", label: "Portfolio", icon: Wallet },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-vp-accent to-vp-purple flex items-center justify-center">
                <TrendingUp className="w-4.5 h-4.5 text-vp-bg" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Venture<span className="text-vp-accent">Picks</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-vp-accent-dim text-vp-accent"
                        : "text-vp-text-secondary hover:text-vp-text hover:bg-vp-surface-2"
                    )}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg text-vp-text-secondary hover:text-vp-text hover:bg-vp-surface-2 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* BSC Network Badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-vp-surface-2 border border-vp-border text-xs">
                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse-slow" />
                <span className="text-vp-text-secondary font-medium">BSC</span>
              </div>

              {/* Wallet Connect */}
              <div className="hidden sm:block">
                <ConnectButton
                  chainStatus="icon"
                  accountStatus="avatar"
                  showBalance={false}
                />
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-vp-text-secondary hover:text-vp-text hover:bg-vp-surface-2 transition-colors"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Search bar - expandable */}
          {searchOpen && (
            <div className="pb-3 animate-slide-up">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-vp-text-muted" />
                <input
                  type="text"
                  placeholder="Search markets... (e.g., BTS, Bitcoin, Toyota)"
                  className="w-full bg-vp-surface-2 border border-vp-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-vp-text placeholder:text-vp-text-muted focus:outline-none focus:border-vp-accent/50 focus:ring-1 focus:ring-vp-accent/20 transition-all"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-vp-surface border-l border-vp-border p-6 pt-20 animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-vp-accent-dim text-vp-accent"
                        : "text-vp-text-secondary hover:text-vp-text hover:bg-vp-surface-2"
                    )}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 pt-6 border-t border-vp-border">
              <ConnectButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
