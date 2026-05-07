"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { anomaliSubsidi } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useToast } from "@/components/shared/ToastNotification";

const provinsiData = [
  { name: "Jabar", petani: 18420, lahan: 42100 },
  { name: "Jateng", petani: 22300, lahan: 55800 },
  { name: "Jatim", petani: 25100, lahan: 61200 },
  { name: "Sumut", petani: 12400, lahan: 29800 },
  { name: "Sulsel", petani: 9800, lahan: 24300 },
];

const rdkkData = [
  { id: "RD-001", petani: "Pak Sumarno", nik: "3301XX****", lahan: "2.3 Ha", status: "valid", komoditas: "Padi" },
  { id: "RD-002", petani: "Bu Kartini", nik: "3302XX****", lahan: "1.5 Ha", status: "perlu_verifikasi", komoditas: "Jagung" },
  { id: "RD-003", petani: "Pak Wahyu", nik: "3204XX****", lahan: "3.1 Ha", status: "valid", komoditas: "Kedelai" },
  { id: "RD-004", petani: "Bu Sri", nik: "3501XX****", lahan: "0.8 Ha", status: "anomali", komoditas: "Cabai" },
];

export default function PemerintahDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user && user.role !== "PEMERINTAH") {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user || user.role !== "PEMERINTAH") return null;

  const handleExport = () => {
    toast("success", "Laporan pemerintah berhasil diekspor ke PDF.");
  };

  return (
    <DashboardLayout>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>🏛️ Dashboard Pemerintah</h2>
            <p className="text-sm text-[#6B7280] mt-1">Monitoring distribusi pertanian & validasi eRDKK nasional</p>
          </div>
          <button onClick={handleExport} className="px-4 py-2 rounded-[10px] text-sm font-semibold text-white bg-[#2D6A4F] hover:opacity-90 transition">⬇ Ekspor Laporan</button>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Petani Terverifikasi", value: "88,020", icon: "👨‍🌾", color: "#2D6A4F" },
            { label: "Lahan Terdaftar", value: "213,200 Ha", icon: "🌾", color: "#F4A261" },
            { label: "Anomali eRDKK", value: anomaliSubsidi.length, icon: "⚠️", color: "#E63946" },
            { label: "Provinsi Aktif", value: provinsiData.length, icon: "🗺️", color: "#3b82f6" },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-[14px] p-4" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <p className="text-2xl mb-1">{k.icon}</p>
              <p className="text-xl font-bold" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs text-[#6B7280] mt-0.5">{k.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Choropleth placeholder */}
          <div className="bg-white rounded-[14px] overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <div className="px-5 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-[#1A1A2E]">Peta Sebaran Petani</p>
            </div>
            <div className="h-64 bg-gradient-to-br from-[#e0f2fe] to-[#dcfce7] flex flex-col items-center justify-center gap-2 text-[#6B7280]">
              <span className="text-5xl">🗺️</span>
              <p className="text-sm font-medium">Choropleth Map</p>
              <p className="text-xs text-center px-6">Integrasi D3.js + GeoJSON provinsi tersedia di environment produksi.</p>
            </div>
          </div>

          {/* Bar chart */}
          <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <p className="text-sm font-semibold text-[#1A1A2E] mb-4">Distribusi Petani & Lahan per Provinsi</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={provinsiData} barSize={16} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: unknown) => (v as number).toLocaleString("id-ID")} />
                <Bar dataKey="petani" fill="#2D6A4F" radius={[4, 4, 0, 0]} name="Petani" />
                <Bar dataKey="lahan" fill="#86efac" radius={[4, 4, 0, 0]} name="Lahan (Ha)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* eRDKK Validation */}
        <div className="bg-white rounded-[14px] overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div className="px-5 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-[#1A1A2E]">Validasi Data eRDKK</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["ID", "Petani", "NIK", "Lahan", "Komoditas", "Status"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rdkkData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 text-xs font-mono text-[#6B7280]">{row.id}</td>
                    <td className="px-4 py-3 font-medium text-[#1A1A2E]">{row.petani}</td>
                    <td className="px-4 py-3 text-xs text-[#6B7280] font-mono">{row.nik}</td>
                    <td className="px-4 py-3 text-[#6B7280]">{row.lahan}</td>
                    <td className="px-4 py-3 text-[#6B7280]">{row.komoditas}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        row.status === "valid" ? "bg-green-100 text-green-700" :
                        row.status === "anomali" ? "bg-red-100 text-red-600" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {row.status === "valid" ? "✓ Valid" : row.status === "anomali" ? "⚠ Anomali" : "🔍 Perlu Verifikasi"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Anomaly quick list */}
        <div className="bg-white rounded-[14px] overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm font-semibold text-[#1A1A2E]">Anomali Subsidi Terdeteksi</p>
            <button onClick={() => router.push("/admin/anomali-subsidi")} className="text-xs text-[#2D6A4F] hover:underline">Lihat Semua →</button>
          </div>
          <div className="divide-y divide-gray-50">
            {anomaliSubsidi.map((a) => (
              <div key={a.id} className="px-5 py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-[#1A1A2E]">{a.petani} — {a.komoditas}</p>
                  <p className="text-xs text-[#6B7280]">GPS {a.lahanGPS} vs eRDKK {a.lahanRDKK}</p>
                </div>
                <span className="text-xs font-semibold text-[#E63946]">{a.confidence}% confidence</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
