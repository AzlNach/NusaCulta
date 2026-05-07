"use client";

import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { mockOrders } from "@/lib/mock-data";

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  selesai:    { label: "Selesai",            bg: "#f0fdf4", color: "#2D6A4F" },
  dikirim:    { label: "Dikirim",            bg: "#eff6ff", color: "#1d4ed8" },
  diproses:   { label: "Diproses",           bg: "#fef3c7", color: "#b45309" },
  menunggu:   { label: "Menunggu Konfirmasi", bg: "#f3f4f6", color: "#6B7280" },
  dibatalkan: { label: "Dibatalkan",         bg: "#fee2e2", color: "#E63946" },
};

const tabs = ["Semua", "Menunggu", "Diproses", "Dikirim", "Selesai", "Dibatalkan"];

export default function PesananPage() {
  const [activeTab, setActiveTab] = useState("Semua");

  const filtered = mockOrders.filter((o) => {
    if (activeTab === "Semua") return true;
    return o.status === activeTab.toLowerCase();
  });

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>📦 Pesanan Saya</h2>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all"
              style={{
                background: activeTab === tab ? "#2D6A4F" : "#f3f4f6",
                color: activeTab === tab ? "#fff" : "#6B7280",
              }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Orders */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-[14px] p-10 text-center"><p className="text-[#6B7280]">Tidak ada pesanan di kategori ini.</p></div>
          ) : filtered.map((order) => {
            const sc = statusConfig[order.status];
            return (
              <div key={order.id} className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[11px] text-[#6B7280] font-medium">#{order.id}</span>
                    <p className="text-sm font-semibold text-[#1A1A2E]">{order.product}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{order.date} · {order.qty} kg</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
                    <p className="text-sm font-bold text-[#1A1A2E] mt-1.5">Rp {order.total.toLocaleString("id-ID")}</p>
                  </div>
                </div>

                {order.resi && (
                  <div className="flex items-center gap-2 p-2.5 rounded-[8px] bg-blue-50 mb-3">
                    <span className="text-sm">🚚</span>
                    <span className="text-xs font-medium text-blue-800">No. Resi: <strong>{order.resi}</strong></span>
                    <button className="ml-auto text-xs text-blue-600 font-semibold hover:underline">Lacak</button>
                  </div>
                )}

                <div className="flex gap-2">
                  {order.status === "dikirim" && <button className="px-3 py-1.5 rounded-[8px] text-xs font-semibold bg-[#2D6A4F] text-white hover:opacity-90">✓ Konfirmasi Terima</button>}
                  {order.status === "selesai" && <button className="px-3 py-1.5 rounded-[8px] text-xs font-semibold bg-[#F4A261] text-white hover:opacity-90">⭐ Beri Ulasan</button>}
                  <button className="px-3 py-1.5 rounded-[8px] text-xs font-semibold bg-gray-100 text-[#6B7280] hover:bg-gray-200">Detail</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
