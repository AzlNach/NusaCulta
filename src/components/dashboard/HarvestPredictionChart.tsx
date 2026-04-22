"use client";

import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";

interface DataPoint {
  day: string;
  cabai: number;
  tomat: number;
  bawang: number;
}

interface HarvestPredictionChartProps {
  data: DataPoint[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div
      className="bg-white rounded-[12px] p-3 border border-gray-100"
      style={{ boxShadow: "0 4px 24px rgba(45,106,79,0.12)" }}
    >
      <p
        className="text-xs font-semibold text-[#1A1A2E] mb-2"
        style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
      >
        {label}
      </p>
      {payload.map((entry: any, idx: number) => (
        <div key={idx} className="flex items-center gap-2 text-xs mb-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: entry.color }}
          ></span>
          <span className="text-[#6B7280]">{entry.name}:</span>
          <span className="font-semibold text-[#1A1A2E]">
            {entry.value} kg
          </span>
        </div>
      ))}
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default function HarvestPredictionChart({
  data,
}: HarvestPredictionChartProps) {
  return (
    <div
      className="bg-white rounded-[12px] p-6 animate-fade-in-up"
      style={{
        boxShadow: "0 4px 24px rgba(45,106,79,0.12)",
        animationDelay: "200ms",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-lg font-semibold text-[#1A1A2E]"
            style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
          >
            Prediksi Panen 30 Hari
          </h2>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Estimasi hasil panen berdasarkan data IoT & cuaca
          </p>
        </div>
        <div className="flex gap-2">
          {[
            { color: "#2D6A4F", label: "Cabai" },
            { color: "#F4A261", label: "Tomat" },
            { color: "#52B788", label: "Bawang" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: item.color }}
              ></span>
              <span className="text-xs text-[#6B7280]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={100}>
          <ComposedChart
            data={data}
            margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="gradCabai" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2D6A4F" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#2D6A4F" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradTomat" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F4A261" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#F4A261" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              strokeOpacity={0.5}
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fill: "#6B7280" }}
              tickLine={false}
              axisLine={false}
              interval={4}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#6B7280" }}
              tickLine={false}
              axisLine={false}
              unit=" kg"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="cabai"
              fill="url(#gradCabai)"
              stroke="none"
            />
            <Area
              type="monotone"
              dataKey="tomat"
              fill="url(#gradTomat)"
              stroke="none"
            />
            <Line
              type="monotone"
              dataKey="cabai"
              stroke="#2D6A4F"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#2D6A4F", strokeWidth: 2, stroke: "#fff" }}
              name="Cabai"
            />
            <Line
              type="monotone"
              dataKey="tomat"
              stroke="#F4A261"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#F4A261", strokeWidth: 2, stroke: "#fff" }}
              name="Tomat"
            />
            <Line
              type="monotone"
              dataKey="bawang"
              stroke="#52B788"
              strokeWidth={2.5}
              dot={false}
              strokeDasharray="6 3"
              activeDot={{ r: 5, fill: "#52B788", strokeWidth: 2, stroke: "#fff" }}
              name="Bawang"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary cards below chart */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { label: "Total Cabai", value: "1.2 ton", trend: "+8%", color: "#2D6A4F" },
          { label: "Total Tomat", value: "0.9 ton", trend: "+3%", color: "#F4A261" },
          { label: "Total Bawang", value: "0.6 ton", trend: "+12%", color: "#52B788" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg p-3 text-center"
            style={{ background: `${item.color}08` }}
          >
            <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">
              {item.label}
            </p>
            <p
              className="text-lg font-bold mt-0.5"
              style={{
                color: item.color,
                fontFamily: "var(--font-sora), Sora, sans-serif",
              }}
            >
              {item.value}
            </p>
            <span className="text-[10px] text-[#52B788] font-semibold">
              {item.trend}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
