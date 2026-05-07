"use client";

import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { mockData, acsBreakdown } from "@/lib/mock-data";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { useToast } from "@/components/shared/ToastNotification";

const { farmer_profile } = mockData;

const scoreHistory = [
  { month: "Des", score: 612 },
  { month: "Jan", score: 645 },
  { month: "Feb", score: 667 },
  { month: "Mar", score: 692 },
  { month: "Apr", score: 710 },
  { month: "Mei", score: 724 },
];

function AcsGauge({ score }: { score: number }) {
  const max = 1000;
  const r = 80;
  const circ = Math.PI * r;
  const offset = circ - (score / max) * circ;
  const color = score >= 800 ? "#2D6A4F" : score >= 600 ? "#52B788" : score >= 400 ? "#F4A261" : "#E63946";
  const label = score >= 800 ? "Sangat Baik" : score >= 600 ? "Baik" : score >= 400 ? "Cukup" : "Perlu Peningkatan";
  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="120" viewBox="0 0 200 120">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e5e7eb" strokeWidth="14" strokeLinecap="round" />
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={color} strokeWidth="14" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 0.8s ease" }} />
        <text x="100" y="88" textAnchor="middle" fontSize="30" fontWeight="700" fill={color} fontFamily="Sora, sans-serif">{score}</text>
        <text x="100" y="106" textAnchor="middle" fontSize="11" fill="#6B7280" fontFamily="DM Sans, sans-serif">{label}</text>
      </svg>
      <div className="flex items-center justify-between w-48 -mt-2 text-[10px] text-[#9ca3af]">
        <span>0</span><span>1000</span>
      </div>
    </div>
  );
}

export default function KreditSkorPage() {
  const { toast } = useToast();
  const [shareLoading, setShareLoading] = useState(false);

  const handleShare = async () => {
    setShareLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setShareLoading(false);
    toast("success", "Link kredit skor dikirim! Berlaku 72 jam.");
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>Skor Kredit Alternatif (ACS)</h2>
          <p className="text-sm text-[#6B7280] mt-1">Penilaian berbasis produktivitas lahan IoT & riwayat transaksi D2C</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gauge + share */}
          <div className="bg-white rounded-[14px] p-6 flex flex-col items-center" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <AcsGauge score={farmer_profile.acs_score} />
            <p className="text-sm text-[#6B7280] mt-2 text-center">{farmer_profile.acs_status}</p>
            <button onClick={handleShare} disabled={shareLoading}
              className="mt-5 px-6 py-2.5 rounded-[10px] text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
              style={{ background: "#2D6A4F" }}>
              {shareLoading ? "Membuat link..." : "🔗 Bagikan ke Fintech (72 jam)"}
            </button>
          </div>

          {/* Score history chart */}
          <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <h3 className="font-semibold text-[#1A1A2E] mb-4">Tren Skor 6 Bulan Terakhir</h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={scoreHistory} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[550, 800]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#2D6A4F" strokeWidth={2.5} dot={{ r: 4, fill: "#2D6A4F" }} name="ACS Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Component cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Produktivitas Lahan", value: 85, icon: "🌾", desc: "Rata-rata hasil panen IoT" },
            { label: "Konsistensi Suplai", value: 78, icon: "📦", desc: "Frekuensi listing marketplace" },
            { label: "Volume Transaksi", value: 70, icon: "💰", desc: "Total penjualan terkonfirmasi" },
            { label: "Validasi Geospasial", value: 92, icon: "📍", desc: "Status verifikasi koordinat" },
          ].map((c) => (
            <div key={c.label} className="bg-white rounded-[14px] p-4" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{c.icon}</span>
                <span className="text-lg font-bold text-[#2D6A4F]">{c.value}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div className="h-full rounded-full bg-[#2D6A4F]" style={{ width: `${c.value}%` }} />
              </div>
              <p className="text-xs font-semibold text-[#1A1A2E]">{c.label}</p>
              <p className="text-[11px] text-[#6B7280] mt-0.5">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Radar chart */}
        <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <h3 className="font-semibold text-[#1A1A2E] mb-4">Profil ACS Detail</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={acsBreakdown} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar dataKey="value" stroke="#2D6A4F" fill="#2D6A4F" fillOpacity={0.25} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
