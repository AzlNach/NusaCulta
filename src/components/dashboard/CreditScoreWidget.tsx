"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface CreditScoreWidgetProps {
  score: number;
  status: string;
  shareImprovement: string;
}

export default function CreditScoreWidget({
  score,
  status,
  shareImprovement,
}: CreditScoreWidgetProps) {
  const maxScore = 900;
  const percentage = (score / maxScore) * 100;

  // Create gauge data (filled + remaining)
  const gaugeData = [
    { value: percentage },
    { value: 100 - percentage },
  ];

  const getScoreColor = (s: number) => {
    if (s >= 700) return "#2D6A4F";
    if (s >= 500) return "#F4A261";
    return "#E63946";
  };

  const getScoreLabel = (s: number) => {
    if (s >= 700) return "Sangat Baik";
    if (s >= 500) return "Cukup Baik";
    return "Perlu Perbaikan";
  };

  const scoreColor = getScoreColor(score);

  return (
    <div
      className="bg-white rounded-[12px] p-6 animate-fade-in-up"
      style={{
        boxShadow: "0 4px 24px rgba(45,106,79,0.12)",
        animationDelay: "500ms",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2
            className="text-lg font-semibold text-[#1A1A2E]"
            style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
          >
            Skor Kredit (ACS)
          </h2>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Alternative Credit Scoring — POJK 29/2024
          </p>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center">
          <span className="text-sm">📊</span>
        </div>
      </div>

      {/* Gauge chart */}
      <div className="relative w-full h-[200px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={100}>
          <PieChart>
            <Pie
              data={gaugeData}
              cx="50%"
              cy="60%"
              startAngle={200}
              endAngle={-20}
              innerRadius="70%"
              outerRadius="90%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              cornerRadius={8}
            >
              <Cell fill={scoreColor} />
              <Cell fill="#f3f4f6" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <span
            className="text-4xl font-bold tabular-nums"
            style={{
              color: scoreColor,
              fontFamily: "var(--font-sora), Sora, sans-serif",
            }}
          >
            {score}
          </span>
          <span className="text-xs text-[#6B7280] mt-0.5">
            dari {maxScore}
          </span>
          <span
            className="text-xs font-semibold mt-1 px-2 py-0.5 rounded-full"
            style={{
              background: `${scoreColor}15`,
              color: scoreColor,
            }}
          >
            {getScoreLabel(score)}
          </span>
        </div>
      </div>

      {/* Status + Stats */}
      <div className="space-y-3 mt-2">
        {/* Status badge */}
        <div className="flex items-center justify-between p-3 rounded-[10px] bg-[#52B788]/8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#52B788]"></div>
            <span className="text-sm font-medium text-[#2D6A4F]">
              {status}
            </span>
          </div>
          <svg className="w-4 h-4 text-[#2D6A4F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Farmer share improvement */}
        <div className="flex items-center justify-between p-3 rounded-[10px] bg-[#F4A261]/8">
          <div>
            <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">
              Peningkatan Farmer Share
            </p>
            <p
              className="text-lg font-bold text-[#F4A261]"
              style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
            >
              {shareImprovement}
            </p>
          </div>
          <span className="text-2xl">📈</span>
        </div>

        {/* Score breakdown mini */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Produktivitas", value: 85 },
            { label: "Konsistensi", value: 78 },
            { label: "IoT Score", value: 88 },
          ].map((item) => (
            <div key={item.label} className="text-center p-2 rounded-lg bg-gray-50">
              <p className="text-[10px] text-[#6B7280]">{item.label}</p>
              <p
                className="text-sm font-bold text-[#2D6A4F] mt-0.5"
                style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
