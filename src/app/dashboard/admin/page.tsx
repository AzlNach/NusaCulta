"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { useAuth } from "@/lib/auth-context";
import { adminKpi, adminTransactionChart, anomaliSubsidi, adminUsers } from "@/lib/mock-data";
import RoleBadge from "@/components/shared/RoleBadge";
import Link from "next/link";

const commodityBarData = [
  { name: "Cabai Merah", volume: 18420 },
  { name: "Tomat", volume: 15380 },
  { name: "Bawang Daun", volume: 9240 },
  { name: "Kentang", volume: 12100 },
  { name: "Wortel", volume: 8760 },
  { name: "Kubis", volume: 7340 },
];

const userRolePie = [
  { name: "Petani", value: 9842, color: "#2D6A4F" },
  { name: "Gapoktan", value: 1204, color: "#52B788" },
  { name: "Konsumen B2C", value: 1248, color: "#3B82F6" },
  { name: "Konsumen B2B", value: 312, color: "#6366f1" },
  { name: "Fintech", value: 18, color: "#F59E0B" },
  { name: "Pemerintah", value: 23, color: "#EF4444" },
];

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) router.replace("/login");
  }, [user, loading, router]);

  if (loading || !user) return null;

  const kpiCards = [
    { label: "Pengguna Aktif", value: adminKpi.total_active_users.toLocaleString("id-ID"), icon: "👥", trend: "+3.2%", color: "#3B82F6" },
    { label: "Transaksi Hari Ini", value: `Rp ${(adminKpi.today_transactions_idr / 1_000_000).toFixed(0)}jt`, icon: "💰", trend: "+8.1%", color: "#2D6A4F" },
    { label: "Listing Aktif", value: adminKpi.active_listings.toLocaleString("id-ID"), icon: "📦", trend: "+12.4%", color: "#8B5CF6" },
    { label: "Volume (kg)", value: adminKpi.volume_kg.toLocaleString("id-ID"), icon: "⚖️", trend: "+5.7%", color: "#F4A261" },
    { label: "Rata-rata ACS", value: adminKpi.avg_acs.toString(), icon: "📊", trend: "+2.1%", color: "#52B788" },
    { label: "Anomali Baru", value: adminKpi.new_anomalies.toString(), icon: "🚨", trend: "perlu review", color: "#E63946" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>Admin Dashboard</h2>
          <p className="text-sm text-[#6B7280] mt-1">Ringkasan platform NusaCulta — {new Date().toLocaleDateString("id-ID", { dateStyle: "long" })}</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {kpiCards.map((k) => (
            <div key={k.label} className="bg-white rounded-[14px] p-4 space-y-2" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between">
                <span className="text-xl">{k.icon}</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: `${k.color}15`, color: k.color }}>{k.trend}</span>
              </div>
              <p className="text-xl font-bold text-[#1A1A2E]">{k.value}</p>
              <p className="text-[10px] text-[#6B7280] font-medium">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Transaction area chart */}
          <div className="lg:col-span-2 bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <h3 className="font-semibold text-[#1A1A2E] mb-4">Transaksi Harian (30 Hari Terakhir)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={adminTransactionChart} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="txGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="day" tick={{ fontSize: 9 }} interval={4} />
                <YAxis tick={{ fontSize: 9 }} tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}jt`} />
                <Tooltip formatter={(v: unknown) => `Rp ${((v as number) / 1_000_000).toFixed(1)}jt`} />
                <Area type="monotone" dataKey="transactions" stroke="#2D6A4F" fill="url(#txGrad)" strokeWidth={2} name="Transaksi" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* User role pie */}
          <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <h3 className="font-semibold text-[#1A1A2E] mb-4">Distribusi Pengguna per Role</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={userRolePie} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                  {userRolePie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v: unknown) => (v as number).toLocaleString("id-ID")} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {userRolePie.map((r) => (
                <div key={r.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
                    <span className="text-[#6B7280]">{r.name}</span>
                  </div>
                  <span className="font-semibold text-[#1A1A2E]">{r.value.toLocaleString("id-ID")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Commodity bar chart */}
        <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <h3 className="font-semibold text-[#1A1A2E] mb-4">Top Komoditas by Volume (kg)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={commodityBarData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v: unknown) => `${(v as number).toLocaleString("id-ID")} kg`} />
              <Bar dataKey="volume" fill="#2D6A4F" radius={[6, 6, 0, 0]} name="Volume (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent users */}
          <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#1A1A2E]">Pengguna Terbaru</h3>
              <Link href="/admin/users" className="text-xs text-[#2D6A4F] font-semibold hover:underline">Lihat semua →</Link>
            </div>
            <div className="space-y-0 divide-y divide-gray-50">
              {adminUsers.map((u) => (
                <div key={u.id} className="flex items-center gap-3 py-3">
                  <div className="w-8 h-8 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center text-xs font-bold text-[#2D6A4F] shrink-0">
                    {u.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1A1A2E] truncate">{u.name}</p>
                    <p className="text-xs text-[#6B7280] truncate">{u.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <RoleBadge role={u.role} />
                    <span className="text-[10px] text-[#6B7280]">{u.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent anomalies */}
          <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#1A1A2E]">Anomali Subsidi Terbaru</h3>
              <Link href="/admin/anomali-subsidi" className="text-xs text-[#2D6A4F] font-semibold hover:underline">Lihat semua →</Link>
            </div>
            <div className="space-y-3">
              {anomaliSubsidi.map((a) => (
                <div key={a.id} className="flex items-start gap-3 p-3 rounded-[10px] bg-red-50 border border-red-100">
                  <span className="text-red-500 text-lg shrink-0">🚨</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[#1A1A2E]">{a.petani} <span className="text-xs text-[#6B7280] font-normal">{a.nik}</span></p>
                      <span className="text-[11px] font-bold text-[#E63946]">{a.confidence}%</span>
                    </div>
                    <p className="text-xs text-[#6B7280] mt-0.5">Lahan GPS: {a.lahanGPS} vs RDKK: {a.lahanRDKK}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
