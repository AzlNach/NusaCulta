"use client";

import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { allNotifications } from "@/lib/mock-data";
import Link from "next/link";

const tabs = ["Semua", "Pesanan", "IoT & Sensor", "Kredit & ACS", "Sistem"] as const;
const typeMap: Record<string, typeof tabs[number]> = {
  pesanan: "Pesanan",
  iot: "IoT & Sensor",
  kredit: "Kredit & ACS",
  sistem: "Sistem",
};

const typeIcons: Record<string, string> = {
  pesanan: "📦", iot: "🌡️", kredit: "💳", sistem: "⚙️",
};

export default function NotifikasiPage() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Semua");
  const [notifs, setNotifs] = useState(allNotifications);

  const filtered = notifs.filter((n) => activeTab === "Semua" || typeMap[n.type] === activeTab);
  const unread = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs((p) => p.map((n) => ({ ...n, read: true })));

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>🔔 Notifikasi</h2>
            {unread > 0 && <p className="text-sm text-[#6B7280] mt-0.5">{unread} belum dibaca</p>}
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} className="text-xs text-[#2D6A4F] font-semibold hover:underline">
              ✓ Tandai Semua Dibaca
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
              style={{ background: activeTab === tab ? "#2D6A4F" : "#f3f4f6", color: activeTab === tab ? "#fff" : "#6B7280" }}>
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="bg-white rounded-[14px] overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          {filtered.length === 0 ? (
            <div className="p-10 text-center text-[#6B7280] text-sm">Tidak ada notifikasi.</div>
          ) : filtered.map((n) => (
            <Link key={n.id} href={n.href}
              className={`flex items-start gap-4 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors ${!n.read ? "bg-[#2D6A4F]/3" : ""}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 ${!n.read ? "bg-[#2D6A4F]/10" : "bg-gray-100"}`}>
                {typeIcons[n.type] ?? "🔔"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm ${!n.read ? "font-semibold text-[#1A1A2E]" : "font-medium text-[#374151]"}`}>{n.title}</p>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-[#2D6A4F] shrink-0 mt-1.5" />}
                </div>
                <p className="text-xs text-[#6B7280] mt-0.5 line-clamp-2">{n.desc}</p>
                <p className="text-[11px] text-[#9ca3af] mt-1">{n.time}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
