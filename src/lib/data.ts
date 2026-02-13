export type MarketCategory =
  | "trending"
  | "technology"
  | "entertainment"
  | "sports"
  | "crypto"
  | "business"
  | "science"
  | "esports";

export interface Market {
  id: string;
  title: string;
  description: string;
  category: MarketCategory;
  imageUrl: string;
  yesPrice: number;
  noPrice: number;
  volume24h: number;
  totalVolume: number;
  liquidity: number;
  endDate: string;
  isHot: boolean;
  isNew: boolean;
  change24h: number;
  traders: number;
  comments: number;
  resolution: string;
  priceHistory: { time: string; yes: number; no: number }[];
  tags: string[];
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  profit: number;
  winRate: number;
  totalTrades: number;
  badge: string;
}

export interface UserPosition {
  marketId: string;
  marketTitle: string;
  side: "yes" | "no";
  shares: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

const generatePriceHistory = (
  currentYes: number,
  days: number = 30
): { time: string; yes: number; no: number }[] => {
  const history: { time: string; yes: number; no: number }[] = [];
  let price = currentYes - (Math.random() * 0.3 - 0.15);
  price = Math.max(0.05, Math.min(0.95, price));

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const change = (Math.random() - 0.48) * 0.06;
    price = Math.max(0.03, Math.min(0.97, price + change));
    history.push({
      time: date.toISOString().split("T")[0],
      yes: Math.round(price * 100) / 100,
      no: Math.round((1 - price) * 100) / 100,
    });
  }

  const last = history[history.length - 1];
  last.yes = currentYes;
  last.no = Math.round((1 - currentYes) * 100) / 100;

  return history;
};

export const markets: Market[] = [
  {
    id: "1",
    title: "Will BTS announce a world tour in 2026?",
    description:
      "Resolves YES if BTS officially announces a world tour with confirmed dates for 2026. Individual member solo tours do not count.",
    category: "entertainment",
    imageUrl: "/icons/music.svg",
    yesPrice: 0.72,
    noPrice: 0.28,
    volume24h: 284500,
    totalVolume: 3420000,
    liquidity: 890000,
    endDate: "2026-12-31",
    isHot: true,
    isNew: false,
    change24h: 5.2,
    traders: 12400,
    comments: 342,
    resolution: "Official BTS or HYBE announcement",
    priceHistory: generatePriceHistory(0.72),
    tags: ["K-pop", "Music", "Korea"],
  },
  {
    id: "2",
    title: "Will Sony release PlayStation 6 before 2027?",
    description:
      "Resolves YES if Sony officially releases the PlayStation 6 console to the public in any market before January 1, 2027.",
    category: "technology",
    imageUrl: "/icons/gaming.svg",
    yesPrice: 0.15,
    noPrice: 0.85,
    volume24h: 198000,
    totalVolume: 2100000,
    liquidity: 650000,
    endDate: "2026-12-31",
    isHot: false,
    isNew: false,
    change24h: -2.1,
    traders: 8900,
    comments: 156,
    resolution: "Official Sony product launch",
    priceHistory: generatePriceHistory(0.15),
    tags: ["Gaming", "Sony", "Console"],
  },
  {
    id: "3",
    title: "Will Toyota launch a solid-state battery EV in 2026?",
    description:
      "Resolves YES if Toyota officially launches (available for purchase) a vehicle with solid-state battery technology in any market during 2026.",
    category: "technology",
    imageUrl: "/icons/car.svg",
    yesPrice: 0.34,
    noPrice: 0.66,
    volume24h: 156000,
    totalVolume: 1890000,
    liquidity: 520000,
    endDate: "2026-12-31",
    isHot: true,
    isNew: true,
    change24h: 8.4,
    traders: 6200,
    comments: 89,
    resolution: "Official Toyota announcement and product availability",
    priceHistory: generatePriceHistory(0.34),
    tags: ["EV", "Toyota", "Battery", "Japan"],
  },
  {
    id: "4",
    title: "Will BNB reach $1000 by end of Q2 2026?",
    description:
      "Resolves YES if the Binance Coin (BNB) reaches or exceeds $1000 USD on any major exchange at any point before July 1, 2026.",
    category: "crypto",
    imageUrl: "/icons/crypto.svg",
    yesPrice: 0.41,
    noPrice: 0.59,
    volume24h: 520000,
    totalVolume: 8900000,
    liquidity: 2100000,
    endDate: "2026-06-30",
    isHot: true,
    isNew: false,
    change24h: 3.7,
    traders: 23400,
    comments: 567,
    resolution: "Price data from CoinGecko / CoinMarketCap",
    priceHistory: generatePriceHistory(0.41),
    tags: ["BNB", "Binance", "Price"],
  },
  {
    id: "5",
    title: "Will the next Studio Ghibli film release in 2026?",
    description:
      "Resolves YES if Studio Ghibli releases a new feature-length animated film in theaters during 2026.",
    category: "entertainment",
    imageUrl: "/icons/film.svg",
    yesPrice: 0.58,
    noPrice: 0.42,
    volume24h: 89000,
    totalVolume: 1200000,
    liquidity: 340000,
    endDate: "2026-12-31",
    isHot: false,
    isNew: true,
    change24h: 1.2,
    traders: 4300,
    comments: 78,
    resolution: "Official theatrical release in Japan",
    priceHistory: generatePriceHistory(0.58),
    tags: ["Anime", "Ghibli", "Film", "Japan"],
  },
  {
    id: "6",
    title: "Will T1 Faker retire from professional League of Legends?",
    description:
      "Resolves YES if Lee 'Faker' Sang-hyeok officially retires from professional competitive League of Legends play before January 1, 2027.",
    category: "esports",
    imageUrl: "/icons/esports.svg",
    yesPrice: 0.22,
    noPrice: 0.78,
    volume24h: 312000,
    totalVolume: 4500000,
    liquidity: 780000,
    endDate: "2026-12-31",
    isHot: true,
    isNew: false,
    change24h: -1.5,
    traders: 18900,
    comments: 890,
    resolution: "Official T1 or Faker announcement",
    priceHistory: generatePriceHistory(0.22),
    tags: ["LoL", "T1", "Korea", "Esports"],
  },
  {
    id: "7",
    title: "Will Shohei Ohtani win MVP again in 2026?",
    description:
      "Resolves YES if Shohei Ohtani is named the Most Valuable Player in either the American League or National League for the 2026 MLB season.",
    category: "sports",
    imageUrl: "/icons/sports.svg",
    yesPrice: 0.38,
    noPrice: 0.62,
    volume24h: 445000,
    totalVolume: 6700000,
    liquidity: 1500000,
    endDate: "2026-11-30",
    isHot: true,
    isNew: false,
    change24h: 2.8,
    traders: 15600,
    comments: 234,
    resolution: "Official MLB MVP announcement",
    priceHistory: generatePriceHistory(0.38),
    tags: ["MLB", "Baseball", "Japan", "Ohtani"],
  },
  {
    id: "8",
    title: "Will SoftBank's latest AI fund exceed $100B?",
    description:
      "Resolves YES if SoftBank officially announces an AI-focused fund with committed capital exceeding $100 billion USD before January 1, 2027.",
    category: "business",
    imageUrl: "/icons/business.svg",
    yesPrice: 0.63,
    noPrice: 0.37,
    volume24h: 178000,
    totalVolume: 2300000,
    liquidity: 610000,
    endDate: "2026-12-31",
    isHot: false,
    isNew: true,
    change24h: 4.1,
    traders: 5800,
    comments: 112,
    resolution: "Official SoftBank Group announcement",
    priceHistory: generatePriceHistory(0.63),
    tags: ["AI", "Investment", "SoftBank", "Japan"],
  },
  {
    id: "9",
    title: "Will Samsung launch a tri-fold phone in 2026?",
    description:
      "Resolves YES if Samsung officially launches a commercial tri-fold (triple-folding) smartphone available for purchase in any market during 2026.",
    category: "technology",
    imageUrl: "/icons/phone.svg",
    yesPrice: 0.55,
    noPrice: 0.45,
    volume24h: 234000,
    totalVolume: 3100000,
    liquidity: 720000,
    endDate: "2026-12-31",
    isHot: true,
    isNew: false,
    change24h: 6.3,
    traders: 9200,
    comments: 198,
    resolution: "Official Samsung product launch",
    priceHistory: generatePriceHistory(0.55),
    tags: ["Samsung", "Mobile", "Korea", "Tech"],
  },
  {
    id: "10",
    title: "Will a Japanese company enter the top 5 global market cap?",
    description:
      "Resolves YES if any Japanese company is ranked in the top 5 globally by market capitalization at any point during 2026.",
    category: "business",
    imageUrl: "/icons/chart.svg",
    yesPrice: 0.12,
    noPrice: 0.88,
    volume24h: 95000,
    totalVolume: 980000,
    liquidity: 280000,
    endDate: "2026-12-31",
    isHot: false,
    isNew: false,
    change24h: -0.8,
    traders: 3400,
    comments: 56,
    resolution: "Market cap data from Bloomberg / Reuters",
    priceHistory: generatePriceHistory(0.12),
    tags: ["Japan", "Markets", "Business"],
  },
  {
    id: "11",
    title: "Will China's CATL launch sodium-ion batteries commercially?",
    description:
      "Resolves YES if CATL begins commercial production and delivery of sodium-ion batteries in vehicles during 2026.",
    category: "science",
    imageUrl: "/icons/science.svg",
    yesPrice: 0.67,
    noPrice: 0.33,
    volume24h: 167000,
    totalVolume: 2800000,
    liquidity: 590000,
    endDate: "2026-12-31",
    isHot: false,
    isNew: true,
    change24h: 3.2,
    traders: 7100,
    comments: 134,
    resolution: "Official CATL delivery confirmation",
    priceHistory: generatePriceHistory(0.67),
    tags: ["Battery", "China", "EV", "Science"],
  },
  {
    id: "12",
    title: "Will the K-League average attendance exceed 15,000?",
    description:
      "Resolves YES if the K League 1 average match attendance exceeds 15,000 for the full 2026 season.",
    category: "sports",
    imageUrl: "/icons/football.svg",
    yesPrice: 0.45,
    noPrice: 0.55,
    volume24h: 67000,
    totalVolume: 890000,
    liquidity: 210000,
    endDate: "2026-11-30",
    isHot: false,
    isNew: false,
    change24h: 0.5,
    traders: 2100,
    comments: 34,
    resolution: "Official K League attendance data",
    priceHistory: generatePriceHistory(0.45),
    tags: ["Football", "Korea", "K-League"],
  },
  {
    id: "13",
    title: "Will Ethereum ETF daily volume exceed Bitcoin ETF?",
    description:
      "Resolves YES if on any single trading day in 2026, the combined daily trading volume of all US spot Ethereum ETFs exceeds that of all US spot Bitcoin ETFs.",
    category: "crypto",
    imageUrl: "/icons/eth.svg",
    yesPrice: 0.19,
    noPrice: 0.81,
    volume24h: 389000,
    totalVolume: 5600000,
    liquidity: 1300000,
    endDate: "2026-12-31",
    isHot: false,
    isNew: false,
    change24h: -3.2,
    traders: 14200,
    comments: 278,
    resolution: "Bloomberg / Yahoo Finance ETF volume data",
    priceHistory: generatePriceHistory(0.19),
    tags: ["ETH", "BTC", "ETF", "Crypto"],
  },
  {
    id: "14",
    title: "Will a K-drama win a major Emmy Award in 2026?",
    description:
      "Resolves YES if any Korean-language drama series wins a Primetime Emmy Award in a major category (Drama, Comedy, Limited Series, or acting) in 2026.",
    category: "entertainment",
    imageUrl: "/icons/tv.svg",
    yesPrice: 0.31,
    noPrice: 0.69,
    volume24h: 142000,
    totalVolume: 1700000,
    liquidity: 430000,
    endDate: "2026-09-30",
    isHot: false,
    isNew: false,
    change24h: 1.8,
    traders: 5400,
    comments: 167,
    resolution: "Official Emmy Awards announcement",
    priceHistory: generatePriceHistory(0.31),
    tags: ["K-drama", "Emmy", "Korea", "TV"],
  },
  {
    id: "15",
    title: "Will GPT-5 be released before July 2026?",
    description:
      "Resolves YES if OpenAI officially releases GPT-5 (or equivalent next-gen model) for public access before July 1, 2026.",
    category: "technology",
    imageUrl: "/icons/ai.svg",
    yesPrice: 0.82,
    noPrice: 0.18,
    volume24h: 678000,
    totalVolume: 12000000,
    liquidity: 3200000,
    endDate: "2026-06-30",
    isHot: true,
    isNew: false,
    change24h: 1.1,
    traders: 34500,
    comments: 1200,
    resolution: "Official OpenAI announcement and public availability",
    priceHistory: generatePriceHistory(0.82),
    tags: ["AI", "OpenAI", "GPT", "Tech"],
  },
  {
    id: "16",
    title: "Will Son Heung-min transfer from Tottenham in 2026?",
    description:
      "Resolves YES if Son Heung-min officially completes a transfer away from Tottenham Hotspur during any 2026 transfer window.",
    category: "sports",
    imageUrl: "/icons/football.svg",
    yesPrice: 0.48,
    noPrice: 0.52,
    volume24h: 356000,
    totalVolume: 4200000,
    liquidity: 980000,
    endDate: "2026-09-01",
    isHot: true,
    isNew: false,
    change24h: 7.2,
    traders: 11300,
    comments: 456,
    resolution: "Official club transfer announcement",
    priceHistory: generatePriceHistory(0.48),
    tags: ["Football", "Korea", "Premier League", "Transfer"],
  },
];

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, username: "dragon_oracle", avatar: "🐉", profit: 142350, winRate: 78.4, totalTrades: 892, badge: "Diamond" },
  { rank: 2, username: "sakura_trader", avatar: "🌸", profit: 98200, winRate: 72.1, totalTrades: 645, badge: "Platinum" },
  { rank: 3, username: "moon_walker", avatar: "🌙", profit: 87600, winRate: 69.8, totalTrades: 1203, badge: "Platinum" },
  { rank: 4, username: "cyber_kitsune", avatar: "🦊", profit: 76400, winRate: 74.2, totalTrades: 456, badge: "Gold" },
  { rank: 5, username: "neon_prophet", avatar: "⚡", profit: 65800, winRate: 67.5, totalTrades: 978, badge: "Gold" },
  { rank: 6, username: "jade_fortune", avatar: "💎", profit: 54200, winRate: 71.3, totalTrades: 334, badge: "Gold" },
  { rank: 7, username: "tokyo_drift", avatar: "🏎️", profit: 48900, winRate: 65.2, totalTrades: 567, badge: "Silver" },
  { rank: 8, username: "seoul_sniper", avatar: "🎯", profit: 43100, winRate: 73.8, totalTrades: 289, badge: "Silver" },
  { rank: 9, username: "bamboo_sage", avatar: "🎋", profit: 39500, winRate: 62.4, totalTrades: 812, badge: "Silver" },
  { rank: 10, username: "phoenix_rise", avatar: "🔥", profit: 35200, winRate: 68.9, totalTrades: 445, badge: "Silver" },
];

export const userPositions: UserPosition[] = [
  { marketId: "1", marketTitle: "Will BTS announce a world tour in 2026?", side: "yes", shares: 150, avgPrice: 0.65, currentPrice: 0.72, pnl: 10.5, pnlPercent: 10.77 },
  { marketId: "4", marketTitle: "Will BNB reach $1000 by end of Q2 2026?", side: "yes", shares: 300, avgPrice: 0.35, currentPrice: 0.41, pnl: 18.0, pnlPercent: 17.14 },
  { marketId: "6", marketTitle: "Will T1 Faker retire from professional League of Legends?", side: "no", shares: 200, avgPrice: 0.72, currentPrice: 0.78, pnl: 12.0, pnlPercent: 8.33 },
  { marketId: "15", marketTitle: "Will GPT-5 be released before July 2026?", side: "yes", shares: 100, avgPrice: 0.78, currentPrice: 0.82, pnl: 4.0, pnlPercent: 5.13 },
  { marketId: "9", marketTitle: "Will Samsung launch a tri-fold phone in 2026?", side: "no", shares: 250, avgPrice: 0.50, currentPrice: 0.45, pnl: -12.5, pnlPercent: -10.0 },
];

export const categories: { id: MarketCategory; label: string; labelZh: string; icon: string; count: number }[] = [
  { id: "trending", label: "Trending", labelZh: "热门", icon: "🔥", count: 0 },
  { id: "technology", label: "Technology", labelZh: "科技", icon: "💻", count: 4 },
  { id: "entertainment", label: "Entertainment", labelZh: "娱乐", icon: "🎬", count: 3 },
  { id: "sports", label: "Sports", labelZh: "体育", icon: "⚽", count: 3 },
  { id: "crypto", label: "Crypto", labelZh: "加密", icon: "₿", count: 2 },
  { id: "business", label: "Business", labelZh: "商业", icon: "📊", count: 2 },
  { id: "science", label: "Science", labelZh: "科学", icon: "🔬", count: 1 },
  { id: "esports", label: "Esports", labelZh: "电竞", icon: "🎮", count: 1 },
];

export function formatVolume(vol: number): string {
  if (vol >= 1_000_000) return `$${(vol / 1_000_000).toFixed(1)}M`;
  if (vol >= 1_000) return `$${(vol / 1_000).toFixed(0)}K`;
  return `$${vol}`;
}

export function formatPercent(p: number): string {
  return `${Math.round(p * 100)}%`;
}

export function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}
