"use client";

import { useState } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Navbar from "@/components/shared/Navbar";
import { mockData, acsBreakdown } from "@/lib/mock-data";

const { farmer_profile } = mockData;

// ─── ACS Gauge ───────────────────────────────────────────────────────────────
function ACSGauge({ score }: { score: number }) {
  const maxScore = 850;
  const percent = score / maxScore;
  const radius = 80;
  const circumference = Math.PI * radius; // half-circle
  const offset = circumference - percent * circumference;

  const getColor = (s: number) => s >= 700 ? "#2D6A4F" : s >= 580 ? "#F4A261" : "#E63946";
  const getLabel = (s: number) => s >= 700 ? "Sangat Baik" : s >= 580 ? "Cukup" : "Perlu Peningkatan";

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="120" viewBox="0 0 200 120">
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none" stroke="#e5e7eb" strokeWidth="14" strokeLinecap="round"
        />
        {/* Foreground arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={getColor(score)}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="animate-gauge"
          style={{ transform: "none" }}
        />
        {/* Tick marks */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const angle = Math.PI - t * Math.PI;
          const x1 = 100 + (radius - 16) * Math.cos(angle);
          const y1 = 100 - (radius - 16) * Math.sin(angle);
          const x2 = 100 + (radius - 8) * Math.cos(angle);
          const y2 = 100 - (radius - 8) * Math.sin(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d1d5db" strokeWidth="2" />;
        })}
        {/* Score text */}
        <text x="100" y="90" textAnchor="middle" fontSize="28" fontWeight="700" fill={getColor(score)} fontFamily="Sora, sans-serif">
          {score}
        </text>
        <text x="100" y="108" textAnchor="middle" fontSize="11" fill="#6B7280" fontFamily="DM Sans, sans-serif">
          {getLabel(score)}
        </text>
      </svg>
      <div className="flex items-center justify-between w-48 -mt-1">
        <span className="text-[10px] text-[#6B7280]">300</span>
        <span className="text-[10px] text-[#6B7280]">850</span>
      </div>
    </div>
  );
}

// ─── Application Timeline ─────────────────────────────────────────────────────
const applications = [
  { id: "NC-2024-0312", lender: "Danamas", amount: 15000000, status: "Disetujui", date: "18 Apr 2026", color: "#2D6A4F", icon: "✅" },
  { id: "NC-2024-0298", lender: "Amartha", amount: 8500000, status: "Proses Review", date: "20 Apr 2026", color: "#F4A261", icon: "⏳" },
  { id: "NC-2024-0275", lender: "BRI Agro", amount: 25000000, status: "Verifikasi Dokumen", date: "21 Apr 2026", color: "#52B788", icon: "📝" },
];

// ─── Fintech Partners ─────────────────────────────────────────────────────────
const fintechPartners = [
  { name: "Danamas", category: "P2P Lending", rate: "11-18%", limit: "50 Juta", icon: "💰", status: "Terintegrasi" },
  { name: "Amartha", category: "Microfinance", rate: "15-24%", limit: "25 Juta", icon: "🌱", status: "Terintegrasi" },
  { name: "BRI Agro", category: "Bank Pertanian", rate: "7-12%", limit: "200 Juta", icon: "🏦", status: "Terintegrasi" },
  { name: "Modalku", category: "P2P Lending", rate: "12-20%", limit: "75 Juta", icon: "📈", status: "Segera" },
  { name: "Kredivo", category: "Buy Now Pay Later", rate: "0-6%", limit: "10 Juta", icon: "💳", status: "Segera" },
];

export default function PembiayaanPage() {
  const [selectedPartner, setSelectedPartner] = useState<typeof fintechPartners[0] | null>(null);
  const [showApply, setShowApply] = useState(false);

  const score = farmer_profile.acs_score;
  const getStatusColor = (s: string) => {
    if (s === "Disetujui") return { bg: "#2D6A4F/10", text: "#2D6A4F" };
    if (s === "Proses Review") return { bg: "#F4A261/10", text: "#d4763a" };
    return { bg: "#52B788/10", text: "#2D6A4F" };
  };

  return (
    <div className="min-h-screen" style={{ background: "#F8F4EF" }}>
      <Navbar activePage="pembiayaan" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
            💳 Pembiayaan Pertanian
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Alternative Credit Scoring berbasis data IoT & produktivitas lahan · Sesuai POJK 29/2024
          </p>
        </div>

        {/* ─── Top Row: Gauge + Loan Eligibility ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ACS Score Card */}
          <div className="lg:col-span-1 bg-white rounded-[16px] p-6" style={{ boxShadow: "0 4px 24px rgba(45,106,79,0.12)" }}>
            <h2 className="text-base font-semibold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
              Skor ACS Anda
            </h2>
            <p className="text-xs text-[#6B7280] mb-4">Alternative Credit Score berbasis data lahan real-time</p>
            <ACSGauge score={score} />
            <div className="mt-4 p-3 rounded-[10px] flex items-center gap-3" style={{ background: "rgba(45,106,79,0.06)" }}>
              <span className="text-xl">🏆</span>
              <div>
                <p className="text-sm font-bold text-[#2D6A4F]">{farmer_profile.acs_status}</p>
                <p className="text-xs text-[#6B7280]">Berdasarkan 6 parameter penilaian</p>
              </div>
            </div>
          </div>

          {/* Loan Eligibility */}
          <div className="lg:col-span-2 bg-white rounded-[16px] p-6" style={{ boxShadow: "0 4px 24px rgba(45,106,79,0.12)" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
                  Kelayakan Pembiayaan
                </h2>
                <p className="text-xs text-[#6B7280] mt-0.5">POJK 29/2024 · OJK Compliant</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2D6A4F]/10 text-[#2D6A4F]">✓ Layak</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {[
                { label: "Plafon Maksimal", value: "Rp 50 Juta", icon: "💰", color: "#2D6A4F" },
                { label: "Tenor Tersedia", value: "6 – 36 Bulan", icon: "📅", color: "#F4A261" },
                { label: "Bunga Estimasi", value: "11 – 15% p.a.", icon: "📊", color: "#52B788" },
              ].map(item => (
                <div key={item.label} className="p-4 rounded-[12px]" style={{ background: `${item.color}08` }}>
                  <p className="text-xs text-[#6B7280] mb-1">{item.label}</p>
                  <p className="text-lg font-bold" style={{ color: item.color, fontFamily: "var(--font-sora), Sora, sans-serif" }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* POJK Compliance Checklist */}
            <div className="border border-[#2D6A4F]/15 rounded-[12px] p-4">
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-3">
                Verifikasi POJK 29/2024
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Identitas Petani Terverifikasi",
                  "Data Lahan Valid (e-RDKK)",
                  "Riwayat Transaksi ≥ 3 Bulan",
                  "IoT Score di atas minimum",
                  "Tidak ada gagal bayar aktif",
                  "Geo-Validasi Lokasi Lahan ✓",
                ].map((check, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[#52B788] text-sm">✓</span>
                    <span className="text-xs text-[#6B7280]">{check}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowApply(true)}
              className="w-full mt-4 py-3 rounded-[12px] text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#F4A261" }}>
              ➕ Ajukan Pembiayaan Sekarang
            </button>
          </div>
        </div>

        {/* ─── ACS Score Breakdown ─── */}
        <div className="bg-white rounded-[16px] p-6" style={{ boxShadow: "0 4px 24px rgba(45,106,79,0.12)" }}>
          <h2 className="text-base font-semibold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
            Breakdown Skor ACS
          </h2>
          <p className="text-xs text-[#6B7280] mb-5">6 dimensi penilaian kredit berbasis data pertanian real-time</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={acsBreakdown}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "#6B7280", fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#9ca3af", fontSize: 10 }} />
                <Radar
                  name="Skor ACS"
                  dataKey="value"
                  stroke="#2D6A4F"
                  fill="#2D6A4F"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 12 }}
                  formatter={(v: unknown) => [`${Number(v)}/100`, "Skor"]}
                />
              </RadarChart>
            </ResponsiveContainer>

            <div className="space-y-3">
              {acsBreakdown.map((item) => (
                <div key={item.metric}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-[#1A1A2E]">{item.metric}</span>
                    <span className="text-sm font-bold text-[#2D6A4F]">{item.value}/100</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${item.value}%`, background: item.value >= 80 ? "#2D6A4F" : item.value >= 65 ? "#52B788" : "#F4A261" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Fintech Partners ─── */}
        <div className="bg-white rounded-[16px] p-6" style={{ boxShadow: "0 4px 24px rgba(45,106,79,0.12)" }}>
          <h2 className="text-base font-semibold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
            Mitra Fintech Terintegrasi
          </h2>
          <p className="text-xs text-[#6B7280] mb-5">Pilih mitra pembiayaan yang sesuai kebutuhan Anda</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fintechPartners.map((partner) => (
              <div
                key={partner.name}
                onClick={() => partner.status === "Terintegrasi" && setSelectedPartner(partner)}
                className={`p-4 rounded-[12px] border-2 transition-all duration-200 ${
                  partner.status === "Terintegrasi"
                    ? "border-transparent hover:border-[#52B788] hover:scale-[1.02] cursor-pointer"
                    : "opacity-60 cursor-not-allowed"
                } ${selectedPartner?.name === partner.name ? "border-[#2D6A4F]" : "border-gray-100"}`}
                style={{ background: "rgba(45,106,79,0.03)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{partner.icon}</span>
                  <div>
                    <p className="font-bold text-[#1A1A2E] text-sm">{partner.name}</p>
                    <p className="text-xs text-[#6B7280]">{partner.category}</p>
                  </div>
                  <span className={`ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    partner.status === "Terintegrasi" ? "bg-[#2D6A4F]/10 text-[#2D6A4F]" : "bg-gray-100 text-[#6B7280]"
                  }`}>
                    {partner.status}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#6B7280]">Bunga: <strong className="text-[#1A1A2E]">{partner.rate}</strong></span>
                  <span className="text-[#6B7280]">Limit: <strong className="text-[#1A1A2E]">{partner.limit}</strong></span>
                </div>
              </div>
            ))}
          </div>

          {selectedPartner && (
            <div className="mt-4 p-4 rounded-[12px] bg-[#2D6A4F]/5 border border-[#2D6A4F]/20 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#2D6A4F]">
                  {selectedPartner.icon} {selectedPartner.name} dipilih
                </p>
                <p className="text-xs text-[#6B7280]">Bunga {selectedPartner.rate} · Limit s/d {selectedPartner.limit}</p>
              </div>
              <button
                onClick={() => setShowApply(true)}
                className="px-4 py-2 rounded-[10px] text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: "#F4A261" }}>
                Ajukan →
              </button>
            </div>
          )}
        </div>

        {/* ─── Application Tracker ─── */}
        <div className="bg-white rounded-[16px] p-6" style={{ boxShadow: "0 4px 24px rgba(45,106,79,0.12)" }}>
          <h2 className="text-base font-semibold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
            Riwayat Pengajuan Pembiayaan
          </h2>
          <p className="text-xs text-[#6B7280] mb-5">Track status pengajuan pembiayaan secara real-time</p>

          <div className="space-y-4">
            {applications.map((app, i) => {
              return (
                <div key={i} className="flex items-center gap-4 p-4 rounded-[12px] border border-gray-100 hover:border-[#52B788]/30 transition-colors">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${app.color}12` }}>
                    {app.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono text-[#6B7280]">{app.id}</span>
                      <span className="text-xs text-[#6B7280]">·</span>
                      <span className="text-xs font-medium text-[#1A1A2E]">{app.lender}</span>
                    </div>
                    <p className="text-sm font-bold text-[#1A1A2E]">Rp {app.amount.toLocaleString("id-ID")}</p>
                    <p className="text-xs text-[#6B7280]">Diajukan: {app.date}</p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0`}
                    style={{ background: `${app.color}15`, color: app.color }}>
                    {app.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-gray-200/60">
          <p className="text-xs text-[#6B7280]">
            © 2026 NusaCulta — Pembiayaan berbasis ACS sesuai POJK 29/2024 · Diawasi OJK
          </p>
        </footer>
      </main>

      {/* Apply Modal */}
      {showApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowApply(false)} />
          <div className="relative bg-white rounded-[20px] p-6 w-full max-w-md" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h3 className="text-lg font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
              Ajukan Pembiayaan
            </h3>
            <p className="text-xs text-[#6B7280] mb-5">via {selectedPartner?.name || "Mitra Fintech NusaCulta"}</p>
            <div className="space-y-3">
              {[
                { label: "Jumlah Pinjaman (Rp)", placeholder: "Contoh: 15.000.000", type: "text" },
                { label: "Tenor (Bulan)", placeholder: "Contoh: 12", type: "number" },
                { label: "Tujuan Penggunaan", placeholder: "Beli bibit, pupuk, dll", type: "text" },
              ].map(field => (
                <div key={field.label}>
                  <label className="text-xs font-semibold text-[#6B7280] block mb-1">{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder}
                    className="w-full px-3 py-2.5 rounded-[10px] border border-gray-200 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#52B788] transition-colors" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowApply(false)}
                className="flex-1 py-3 rounded-[12px] text-sm font-semibold text-[#6B7280] border border-gray-200 hover:bg-gray-50 transition-colors">
                Batal
              </button>
              <button onClick={() => setShowApply(false)}
                className="flex-1 py-3 rounded-[12px] text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: "#2D6A4F" }}>
                Kirim Pengajuan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
