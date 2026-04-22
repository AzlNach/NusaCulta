"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { mockData } from "@/lib/mock-data";

const { national_stats } = mockData;

// ─── Mock Admin Data ──────────────────────────────────────────────────────────
const monthlyGMV = [
  { month: "Nov", gmv: 2.8, farmers: 9200 },
  { month: "Des", gmv: 3.1, farmers: 10100 },
  { month: "Jan", gmv: 3.4, farmers: 10800 },
  { month: "Feb", gmv: 3.7, farmers: 11500 },
  { month: "Mar", gmv: 3.9, farmers: 12100 },
  { month: "Apr", gmv: 4.2, farmers: 12847 },
];

const commoditySupply = [
  { commodity: "Cabai Merah", jabar: 85, jateng: 62, jatim: 74, total: 221 },
  { commodity: "Tomat", jabar: 93, jateng: 55, jatim: 81, total: 229 },
  { commodity: "Bawang", jabar: 44, jateng: 88, jatim: 67, total: 199 },
  { commodity: "Kentang", jabar: 97, jateng: 41, jatim: 52, total: 190 },
  { commodity: "Wortel", jabar: 71, jateng: 39, jatim: 48, total: 158 },
  { commodity: "Kubis", jabar: 88, jateng: 76, jatim: 33, total: 197 },
];

const subsidyData = [
  { id: "NC-1247", name: "Pak Sugiono", nik: "3204XX****", lahan: "1.2 Ha", komoditas: "Cabai", status: "Valid", anomali: false, rdkk: "Sesuai" },
  { id: "NC-1248", name: "Bu Sari", nik: "3205XX****", lahan: "0.8 Ha", komoditas: "Tomat", status: "Valid", anomali: false, rdkk: "Sesuai" },
  { id: "NC-1249", name: "Pak Ahmad", nik: "3301XX****", lahan: "2.1 Ha", komoditas: "Padi", status: "Anomali", anomali: true, rdkk: "Tidak Sesuai" },
  { id: "NC-1250", name: "Bu Dewi", nik: "3201XX****", lahan: "1.5 Ha", komoditas: "Bawang", status: "Valid", anomali: false, rdkk: "Sesuai" },
  { id: "NC-1251", name: "Pak Budi", nik: "3206XX****", lahan: "0.6 Ha", komoditas: "Wortel", status: "Verifikasi", anomali: false, rdkk: "Proses" },
  { id: "NC-1252", name: "Bu Ratna", nik: "3302XX****", lahan: "3.4 Ha", komoditas: "Cabai", status: "Anomali", anomali: true, rdkk: "Tidak Sesuai" },
];

const supplyProvinces = [
  { province: "Jawa Barat", intensity: 95, farmers: 4210, color: "#2D6A4F" },
  { province: "Jawa Tengah", intensity: 78, farmers: 3180, color: "#3A8562" },
  { province: "Jawa Timur", intensity: 82, farmers: 2840, color: "#3A8562" },
  { province: "Sumatera Utara", intensity: 54, farmers: 1240, color: "#52B788" },
  { province: "Sulawesi Sel.", intensity: 61, farmers: 890, color: "#52B788" },
  { province: "Kalimantan Sel.", intensity: 38, farmers: 487, color: "#74c69d" },
];

const logisticsRoutes = [
  { from: "Lembang, Jabar", to: "Jakarta Selatan", distance: "158 km", time: "2.5 jam", cost: "Rp 320rb", optimized: true },
  { from: "Pangalengan, Jabar", to: "Bekasi", distance: "142 km", time: "2.1 jam", cost: "Rp 290rb", optimized: true },
  { from: "Garut, Jabar", to: "Bandung", distance: "62 km", time: "1.2 jam", cost: "Rp 145rb", optimized: false },
];

// ─── Metric Card ──────────────────────────────────────────────────────────────
function MetricCard({ icon, label, value, sub, trend, color }: {
  icon: string; label: string; value: string; sub: string; trend: string; color: string;
}) {
  return (
    <div className="rounded-[14px] p-5 transition-all hover:scale-[1.02]"
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-xl"
          style={{ background: `${color}22` }}>
          {icon}
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: "rgba(82,183,136,0.15)", color: "#52B788" }}>
          {trend}
        </span>
      </div>
      <p className="text-2xl font-bold text-white mb-0.5" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
        {value}
      </p>
      <p className="text-xs font-semibold text-white/60 uppercase tracking-wide">{label}</p>
      <p className="text-[10px] text-white/40 mt-0.5">{sub}</p>
    </div>
  );
}

// ─── Supply Heatmap (visual representation) ───────────────────────────────────
function SupplyHeatmap() {
  return (
    <div className="rounded-[14px] p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-white text-sm" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
            Peta Pasokan Nasional
          </h3>
          <p className="text-[11px] text-white/50 mt-0.5">Intensitas pasokan per provinsi</p>
        </div>
        <span className="text-[10px] text-white/40 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#52B788] animate-pulse" />
          Live Data
        </span>
      </div>

      {/* Indonesia map placeholder with intensity bars */}
      <div className="space-y-3">
        {supplyProvinces.map((prov) => (
          <div key={prov.province}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-white/70 font-medium">{prov.province}</span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-white/40">{prov.farmers.toLocaleString("id-ID")} petani</span>
                <span className="text-xs font-bold text-[#52B788]">{prov.intensity}%</span>
              </div>
            </div>
            <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${prov.intensity}%`, background: `linear-gradient(90deg, #2D6A4F, #52B788)` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: "#2D6A4F" }} />
          <span className="text-[10px] text-white/50">Tinggi (&gt;80%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: "#52B788" }} />
          <span className="text-[10px] text-white/50">Sedang (50-80%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: "#74c69d" }} />
          <span className="text-[10px] text-white/50">Rendah (&lt;50%)</span>
        </div>
      </div>
    </div>
  );
}

// ─── Logistics Optimizer ──────────────────────────────────────────────────────
function LogisticsOptimizer() {
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [result, setResult] = useState<typeof logisticsRoutes[0] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOptimize = () => {
    if (!origin || !dest) return;
    setLoading(true);
    setTimeout(() => {
      setResult({
        from: origin,
        to: dest,
        distance: `${Math.floor(50 + Math.random() * 200)} km`,
        time: `${(1 + Math.random() * 3).toFixed(1)} jam`,
        cost: `Rp ${Math.floor(100 + Math.random() * 400)}rb`,
        optimized: true,
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="rounded-[14px] p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <h3 className="font-semibold text-white text-sm mb-4" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
        🚛 Optimasi Rute Logistik
      </h3>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-[10px] text-white/50 uppercase tracking-wide block mb-1">Asal</label>
          <input
            value={origin}
            onChange={e => setOrigin(e.target.value)}
            placeholder="Lembang, Jabar"
            className="w-full px-3 py-2 rounded-[8px] text-sm text-white placeholder-white/30 focus:outline-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
          />
        </div>
        <div>
          <label className="text-[10px] text-white/50 uppercase tracking-wide block mb-1">Tujuan</label>
          <input
            value={dest}
            onChange={e => setDest(e.target.value)}
            placeholder="Jakarta Selatan"
            className="w-full px-3 py-2 rounded-[8px] text-sm text-white placeholder-white/30 focus:outline-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
          />
        </div>
      </div>
      <button
        onClick={handleOptimize}
        disabled={loading}
        className="w-full py-2.5 rounded-[10px] text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: "#F4A261" }}>
        {loading ? "⏳ Menghitung..." : "🔍 Optimalkan Rute"}
      </button>

      {/* Historical routes */}
      <div className="mt-4 space-y-2">
        <p className="text-[10px] text-white/40 uppercase tracking-wide">Rute Aktif</p>
        {(result ? [result] : logisticsRoutes.slice(0, 2)).map((route, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-[8px]" style={{ background: "rgba(255,255,255,0.04)" }}>
            <span className="text-base">🚛</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/80 font-medium truncate">{route.from} → {route.to}</p>
              <p className="text-[10px] text-white/40">{route.distance} · {route.time} · {route.cost}</p>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${route.optimized ? "text-[#52B788]" : "text-[#F4A261]"}`}
              style={{ background: route.optimized ? "rgba(82,183,136,0.15)" : "rgba(244,162,97,0.15)" }}>
              {route.optimized ? "Optimal" : "Manual"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "supply" | "subsidy" | "logistics">("overview");
  const [filterAnomali, setFilterAnomali] = useState(false);

  const filteredSubsidy = filterAnomali ? subsidyData.filter(d => d.anomali) : subsidyData;

  return (
    <div className="min-h-screen" style={{ background: "#0D1F1A" }}>
      {/* ─── Dark Navbar ─── */}
      <nav className="sticky top-0 z-50 w-full border-b" style={{ background: "rgba(13,31,26,0.95)", borderColor: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[8px] bg-[#52B788]/20 flex items-center justify-center">
                  <span className="text-[#52B788] text-xs font-bold" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>NC</span>
                </div>
                <span className="text-sm font-bold text-white/80" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>NusaCulta</span>
              </a>
              <span className="text-white/20">·</span>
              <span className="text-sm font-semibold text-[#52B788]">Admin Panel</span>
            </div>

            <div className="hidden md:flex items-center gap-0.5 bg-white/5 rounded-[10px] p-1">
              {(["overview", "supply", "subsidy", "logistics"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-[8px] text-xs font-semibold capitalize transition-all ${
                    activeTab === tab ? "bg-[#2D6A4F] text-white" : "text-white/50 hover:text-white/80"
                  }`}>
                  {tab === "overview" ? "📊 Overview" : tab === "supply" ? "🗺️ Supply" : tab === "subsidy" ? "📋 Subsidi" : "🚛 Logistik"}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a href="/" className="text-xs text-white/40 hover:text-white/70 transition-colors">← Kembali ke App</a>
              <div className="w-8 h-8 rounded-full bg-[#2D6A4F] flex items-center justify-center">
                <span className="text-white text-xs font-bold">AD</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Page title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
              Admin Analytics
            </h1>
            <p className="text-sm text-white/40 mt-1">Platform intelligence · Data per 22 Apr 2026</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-[10px]" style={{ background: "rgba(82,183,136,0.10)", border: "1px solid rgba(82,183,136,0.20)" }}>
            <span className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse" />
            <span className="text-xs font-semibold text-[#52B788]">Live · Auto-refresh 30s</span>
          </div>
        </div>

        {/* ─── Platform Metrics ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { icon: "👨‍🌾", label: "Petani Aktif", value: "12.847", sub: "↑ 6.2% vs bulan lalu", trend: "+6.2%", color: "#52B788" },
            { icon: "💰", label: "GMV Bulanan", value: "Rp 4,2M", sub: "Target: Rp 5M", trend: "+8.7%", color: "#F4A261" },
            { icon: "📈", label: "Farmer Share", value: "72%", sub: "vs 54% model tradisional", trend: "+18pp", color: "#2D6A4F" },
            { icon: "♻️", label: "Susut Pangan", value: "−28%", sub: "vs baseline nasional", trend: "↓ 28%", color: "#52B788" },
            { icon: "🏦", label: "ACS Disetujui", value: "3.241", sub: "Dari 4.100 pengajuan", trend: "79%", color: "#F4A261" },
          ].map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </div>

        {/* ─── TAB CONTENT ─── */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GMV Trend */}
            <div className="rounded-[14px] p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="font-semibold text-white text-sm mb-4" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
                Tren GMV & Petani Aktif (6 Bulan)
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={monthlyGMV}>
                  <defs>
                    <linearGradient id="gmvGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#52B788" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#52B788" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#1B4332", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 10, fontSize: 12, color: "#fff" }}
                    formatter={(v: unknown, name: unknown) => [name === "gmv" ? `Rp ${Number(v)}M` : Number(v).toLocaleString("id-ID"), name === "gmv" ? "GMV" : "Petani"]}
                  />
                  <Area type="monotone" dataKey="gmv" stroke="#52B788" strokeWidth={2} fill="url(#gmvGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Supply by Commodity */}
            <div className="rounded-[14px] p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="font-semibold text-white text-sm mb-4" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
                Pasokan Komoditas per Provinsi (Ton)
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={commoditySupply} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="commodity" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} width={80} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#1B4332", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 10, fontSize: 12, color: "#fff" }}
                  />
                  <Legend wrapperStyle={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }} />
                  <Bar dataKey="jabar" name="Jawa Barat" fill="#2D6A4F" radius={[0, 2, 2, 0]} />
                  <Bar dataKey="jateng" name="Jawa Tengah" fill="#52B788" radius={[0, 2, 2, 0]} />
                  <Bar dataKey="jatim" name="Jawa Timur" fill="#F4A261" radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "supply" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SupplyHeatmap />
            <div className="rounded-[14px] p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="font-semibold text-white text-sm mb-4" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
                Tren Harga vs Pasokan
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={[
                  { hari: "Sen", harga: 28000, pasokan: 85 },
                  { hari: "Sel", harga: 29500, pasokan: 72 },
                  { hari: "Rab", harga: 27200, pasokan: 94 },
                  { hari: "Kam", harga: 31000, pasokan: 61 },
                  { hari: "Jum", harga: 30200, pasokan: 68 },
                  { hari: "Sab", harga: 28800, pasokan: 82 },
                  { hari: "Min", harga: 29100, pasokan: 79 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="hari" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#1B4332", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 10, fontSize: 12, color: "#fff" }} />
                  <Legend wrapperStyle={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }} />
                  <Line yAxisId="left" type="monotone" dataKey="harga" stroke="#F4A261" strokeWidth={2} dot={false} name="Harga (Rp/kg)" />
                  <Line yAxisId="right" type="monotone" dataKey="pasokan" stroke="#52B788" strokeWidth={2} dot={false} name="Pasokan (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "subsidy" && (
          <div className="rounded-[14px] p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-white text-sm" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
                  Validasi Subsidi e-RDKK
                </h3>
                <p className="text-[11px] text-white/40 mt-0.5">Deteksi anomali petani terdaftar vs data e-RDKK Kementan</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFilterAnomali(!filterAnomali)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-all ${
                    filterAnomali ? "bg-[#E63946]/20 text-[#E63946]" : "text-white/50 border border-white/10 hover:border-white/20"
                  }`}>
                  ⚠️ Anomali Saja {filterAnomali && `(${subsidyData.filter(d => d.anomali).length})`}
                </button>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px]" style={{ background: "rgba(230,57,70,0.10)" }}>
                  <span className="text-[#E63946] text-xs font-semibold">
                    {subsidyData.filter(d => d.anomali).length} Anomali Ditemukan
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {["ID", "Nama", "NIK", "Lahan", "Komoditas", "Status e-RDKK", "Flag"].map(h => (
                      <th key={h} className="text-left py-2.5 px-3 text-[10px] font-semibold text-white/40 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredSubsidy.map((row, i) => (
                    <tr key={i} className="border-b transition-colors hover:bg-white/[0.03]"
                      style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                      <td className="py-3 px-3 text-xs font-mono text-white/60">{row.id}</td>
                      <td className="py-3 px-3 text-sm font-medium text-white/80">{row.name}</td>
                      <td className="py-3 px-3 text-xs font-mono text-white/50">{row.nik}</td>
                      <td className="py-3 px-3 text-xs text-white/60">{row.lahan}</td>
                      <td className="py-3 px-3 text-xs text-white/60">{row.komoditas}</td>
                      <td className="py-3 px-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          row.rdkk === "Sesuai" ? "text-[#52B788] bg-[#52B788]/10"
                          : row.rdkk === "Proses" ? "text-[#F4A261] bg-[#F4A261]/10"
                          : "text-[#E63946] bg-[#E63946]/10"
                        }`}>
                          {row.rdkk}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {row.anomali ? (
                          <span className="text-[10px] font-bold text-[#E63946] flex items-center gap-1">
                            ⚠️ Anomali
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#52B788]">✓ OK</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "logistics" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LogisticsOptimizer />
            <div className="rounded-[14px] p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="font-semibold text-white text-sm mb-4" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
                📦 Status Pengiriman Aktif
              </h3>
              <div className="space-y-3">
                {[
                  { id: "SHP-4821", origin: "Lembang", dest: "Jakarta Sel.", status: "Di Jalan", eta: "14:40", progress: 70, driver: "Andi S.", cargo: "Cabai 120 kg" },
                  { id: "SHP-4820", origin: "Pangalengan", dest: "Bekasi", status: "Di Jalan", eta: "15:15", progress: 45, driver: "Budi R.", cargo: "Tomat 250 kg" },
                  { id: "SHP-4819", origin: "Garut", dest: "Bandung", status: "Terkirim", eta: "Selesai", progress: 100, driver: "Cahyo W.", cargo: "Bawang 80 kg" },
                  { id: "SHP-4818", origin: "Cisarua", dest: "Depok", status: "Dipersiapkan", eta: "16:00", progress: 15, driver: "Dani P.", cargo: "Brokoli 60 kg" },
                ].map((ship, i) => (
                  <div key={i} className="p-3 rounded-[10px]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-white/50">{ship.id}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background: ship.status === "Terkirim" ? "rgba(82,183,136,0.15)" : ship.status === "Di Jalan" ? "rgba(244,162,97,0.15)" : "rgba(255,255,255,0.08)",
                            color: ship.status === "Terkirim" ? "#52B788" : ship.status === "Di Jalan" ? "#F4A261" : "rgba(255,255,255,0.5)",
                          }}>
                          {ship.status}
                        </span>
                      </div>
                      <span className="text-xs text-white/40">ETA: {ship.eta}</span>
                    </div>
                    <p className="text-xs text-white/70 mb-1">{ship.origin} → {ship.dest} · {ship.cargo}</p>
                    <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${ship.progress}%`, background: ship.progress === 100 ? "#52B788" : "linear-gradient(90deg, #2D6A4F, #52B788)" }} />
                    </div>
                    <p className="text-[10px] text-white/30 mt-1">Driver: {ship.driver}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-xs text-white/20">
            © 2026 NusaCulta Admin Panel · Data diperbarui setiap 30 detik
          </p>
        </footer>
      </main>
    </div>
  );
}
