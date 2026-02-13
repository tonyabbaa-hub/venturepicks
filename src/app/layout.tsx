import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "VenturePicks — East Asian Prediction Markets on BSC",
  description:
    "The premier prediction market for East Asian entertainment, sports, technology, and business. Trade outcomes on BNB Smart Chain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-vp-bg text-vp-text antialiased">
        <Providers>
          <Navbar />
          <main className="pt-16">{children}</main>

          {/* Footer */}
          <footer className="border-t border-vp-border mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h4 className="text-sm font-semibold text-vp-text mb-3">
                    Markets
                  </h4>
                  <ul className="space-y-2 text-xs text-vp-text-muted">
                    <li className="hover:text-vp-accent cursor-pointer transition-colors">All Markets</li>
                    <li className="hover:text-vp-accent cursor-pointer transition-colors">Technology</li>
                    <li className="hover:text-vp-accent cursor-pointer transition-colors">Entertainment</li>
                    <li className="hover:text-vp-accent cursor-pointer transition-colors">Sports</li>
                    <li className="hover:text-vp-accent cursor-pointer transition-colors">Crypto</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-vp-text mb-3">
                    Resources
                  </h4>
                  <ul className="space-y-2 text-xs text-vp-text-muted">
                    <li className="hover:text-vp-accent cursor-pointer transition-colors">Documentation</li>
                    <li className="hover:text-vp-accent cursor-pointer transition-colors">API</li>
                    <li className="hover:text-vp-accent cursor-pointer transition-colors">How It Works</li>
                    <li className="hover:text-vp-accent cursor-pointer transition-colors">FAQ</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-vp-text mb-3">
                    Community
                  </h4>
                  <ul className="space-y-2 text-xs text-vp-text-muted">
                    <li className="hover:text-vp-accent cursor-pointer transition-colors">Discord</li>
                    <li className="hover:text-vp-accent cursor-pointer transition-colors">Twitter / X</li>
                    <li className="hover:text-vp-accent cursor-pointer transition-colors">Telegram</li>
                    <li className="hover:text-vp-accent cursor-pointer transition-colors">WeChat</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-vp-text mb-3">
                    Legal
                  </h4>
                  <ul className="space-y-2 text-xs text-vp-text-muted">
                    <li className="hover:text-vp-accent cursor-pointer transition-colors">Terms of Service</li>
                    <li className="hover:text-vp-accent cursor-pointer transition-colors">Privacy Policy</li>
                    <li className="hover:text-vp-accent cursor-pointer transition-colors">Risk Disclosure</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-vp-border gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-vp-accent to-vp-purple flex items-center justify-center">
                    <span className="text-vp-bg text-xs font-bold">V</span>
                  </div>
                  <span className="text-sm font-semibold">
                    Venture<span className="text-vp-accent">Picks</span>
                  </span>
                </div>
                <p className="text-xs text-vp-text-muted text-center">
                  Powered by BNB Smart Chain. Trade responsibly.
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-vp-yes animate-pulse" />
                  <span className="text-xs text-vp-text-muted">
                    BSC Mainnet
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
