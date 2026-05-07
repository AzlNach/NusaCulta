"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { useAuth } from "@/lib/auth-context";
import { mockData, mockLahan, sensorHistory24h, harvestPredictionData } from "@/lib/mock-data";
import Link from "next/link";

const { farmer_profile, iot_sensors } = mockData;

function IoTStatusBadge({ status }: { status: "online" | "offline" | "error" }) {
  const cfg = { online: { color: "#2D6A4F", bg: "#dcfce7", label: "Online" }, offline: { color: "#6B7280", bg: "#f3f4f6", label: "Offline" }, error: { color: "#E63946", bg: "#fee2e2", label: "Error" } };
  const c = cfg[status];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: c.bg, color: c.color }}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: c.color }} />
      {c.label}
    </span>
  );
}

export default function PetaniDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
    if (!loading && user && user.role !== "PETANI" && user.role !== "GAPOKTAN") router.replace("/login");
  }, [user, loading, router]);

  if (loading || !user) return null;

  const harvestNext = { tanggal: "18 Mei 2026", volume: 380, confidence: 87 };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>
              Selamat Datang, {farmer_profile.name} 👋
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              📍 {farmer_profile.location} · 🌾 {farmer_profile.land_area_ha} Ha · {farmer_profile.commodities.join(", ")}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/lahan/tambah"
              className="px-4 py-2.5 rounded-[12px] text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "#2D6A4F" }}
            >
              ➕ Tambah Lahan
            </Link>
            <Link
              href="/jual/listing"
              className="px-4 py-2.5 rounded-[12px] text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "#F4A261" }}
            >
              🏷️ Jual Produk
            </Link>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Farmer Share", value: farmer_profile.farmer_share_improvement, icon: "📈", color: "#2D6A4F" },
            { label: "Skor ACS", value: farmer_profile.acs_score.toString(), icon: "🏆", color: "#F4A261" },
            { label: "Luas Lahan", value: `${farmer_profile.land_area_ha} Ha`, icon: "🌾", color: "#52B788" },
            { label: "Komoditas", value: `${farmer_profile.commodities.length} Aktif`, icon: "🌽", color: "#E63946" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-[12px] p-4 flex items-center gap-3" style={{ boxShadow: "0 4px 24px rgba(45,106,79,0.08)" }}>
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-lg" style={{ background: `${stat.color}18` }}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wider font-medium">{stat.label}</p>
                <p className="text-lg font-bold text-[#1A1A2E]">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left column */}
          <div className="space-y-6">

            {/* Lahan cards */}
            <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(45,106,79,0.08)" }}>
              <h3 className="font-semibold text-[#1A1A2E] mb-4">Lahan Terdaftar</h3>
              <div className="space-y-3">
                {mockLahan.map((l) => (
                  <Link key={l.id} href={`/lahan/${l.id}/sensor`}
                    className="flex items-center justify-between p-3 rounded-[10px] bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A2E]">{l.nama}</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">{l.luas} Ha · {l.komoditas.join(", ")}</p>
                    </div>
                    <IoTStatusBadge status={l.iotStatus} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Sensor real-time chart */}
            <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(45,106,79,0.08)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#1A1A2E]">Sensor Real-time (24 Jam)</h3>
                <span className="flex items-center gap-1.5 text-xs text-[#52B788]">
                  <span className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse" />
                  Live
                </span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={sensorHistory24h} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="jam" tick={{ fontSize: 10 }} interval={5} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="kelembapan" stroke="#2D6A4F" strokeWidth={2} dot={false} name="Kelembapan (%)" />
                  <Line type="monotone" dataKey="suhu" stroke="#F4A261" strokeWidth={2} dot={false} name="Suhu (°C)" />
                  <Line type="monotone" dataKey="ph" stroke="#3B82F6" strokeWidth={2} dot={false} name="pH" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">

            {/* Harvest prediction card */}
            <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(45,106,79,0.08)" }}>
              <h3 className="font-semibold text-[#1A1A2E] mb-4">🌱 Prediksi Panen Berikutnya</h3>
              <div className="bg-[#2D6A4F]/5 rounded-[12px] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6B7280]">Estimasi Tanggal</span>
                  <span className="text-sm font-bold text-[#2D6A4F]">{harvestNext.tanggal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6B7280]">Volume Estimasi</span>
                  <span className="text-sm font-bold text-[#1A1A2E]">{harvestNext.volume.toLocaleString("id-ID")} kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6B7280]">Confidence AI</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#52B788] rounded-full" style={{ width: `${harvestNext.confidence}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-[#52B788]">{harvestNext.confidence}%</span>
                  </div>
                </div>
              </div>
              <Link href="/prediksi-panen" className="block mt-3 text-xs text-center text-[#2D6A4F] font-semibold hover:underline">
                Lihat semua prediksi →
              </Link>
            </div>

            {/* Current sensor values */}
            <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(45,106,79,0.08)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#1A1A2E]">📊 Status Sensor Sekarang</h3>
                <span className="text-[11px] text-[#6B7280]">Update: {iot_sensors.last_update}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Kelembapan", value: `${iot_sensors.kelembapan}%`, icon: "💧", color: "#3B82F6", ok: true },
                  { label: "pH Tanah", value: iot_sensors.ph.toString(), icon: "🧪", color: "#8B5CF6", ok: true },
                  { label: "Suhu", value: `${iot_sensors.suhu}°C`, icon: "🌡️", color: "#F4A261", ok: true },
                  { label: "Nitrogen (N)", value: `${iot_sensors.nutrisi_n} ppm`, icon: "🌿", color: "#2D6A4F", ok: iot_sensors.nutrisi_n > 100 },
                ].map((s) => (
                  <div key={s.label} className="p-3 rounded-[10px] bg-gray-50 space-y-1">
                    <p className="text-xs text-[#6B7280]">{s.icon} {s.label}</p>
                    <p className="text-base font-bold" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-[10px]" style={{ color: s.ok ? "#52B788" : "#E63946" }}>
                      {s.ok ? "✓ Normal" : "⚠ Perhatikan"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Irigasi recommendations */}
            <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(45,106,79,0.08)" }}>
              <h3 className="font-semibold text-[#1A1A2E] mb-4">💧 Rekomendasi Irigasi</h3>
              <div className="space-y-3">
                {[
                  { waktu: "Hari ini 06:00", volume: "45 L/m²", prioritas: "Tinggi", komoditas: "Cabai Merah" },
                  { waktu: "Besok 07:00", volume: "30 L/m²", prioritas: "Sedang", komoditas: "Tomat" },
                  { waktu: "2 hari lagi", volume: "20 L/m²", prioritas: "Rendah", komoditas: "Bawang Daun" },
                ].map((r, i) => (
                  <div key={i} className="flex items-start justify-between p-3 rounded-[10px] border border-gray-100">
                    <div>
                      <p className="text-xs font-semibold text-[#1A1A2E]">{r.komoditas}</p>
                      <p className="text-[11px] text-[#6B7280] mt-0.5">{r.waktu} · {r.volume}</p>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: r.prioritas === "Tinggi" ? "#fee2e2" : r.prioritas === "Sedang" ? "#fef3c7" : "#f0fdf4",
                        color: r.prioritas === "Tinggi" ? "#E63946" : r.prioritas === "Sedang" ? "#b45309" : "#2D6A4F",
                      }}>
                      {r.prioritas}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Harvest chart */}
        <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(45,106,79,0.08)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#1A1A2E]">📈 Proyeksi Panen 30 Hari</h3>
            <Link href="/prediksi-panen" className="text-xs text-[#2D6A4F] font-semibold hover:underline">Lihat detail →</Link>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={harvestPredictionData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} interval={4} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="cabai" stroke="#E63946" strokeWidth={2} dot={false} name="Cabai (kg)" />
              <Line type="monotone" dataKey="tomat" stroke="#F4A261" strokeWidth={2} dot={false} name="Tomat (kg)" />
              <Line type="monotone" dataKey="bawang" stroke="#2D6A4F" strokeWidth={2} dot={false} name="Bawang (kg)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
