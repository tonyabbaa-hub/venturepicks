"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  YAxis,
} from "recharts";

interface MiniChartProps {
  data: { time: string; yes: number; no: number }[];
}

export default function MiniChart({ data }: MiniChartProps) {
  const last14 = data.slice(-14);
  const min = Math.min(...last14.map((d) => d.yes)) - 0.02;
  const max = Math.max(...last14.map((d) => d.yes)) + 0.02;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={last14}>
        <defs>
          <linearGradient id="miniGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00d4aa" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#00d4aa" stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis domain={[min, max]} hide />
        <Area
          type="monotone"
          dataKey="yes"
          stroke="#00d4aa"
          strokeWidth={1.5}
          fill="url(#miniGrad)"
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
