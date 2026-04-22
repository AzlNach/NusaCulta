"use client";

import IoTSensorCards from "@/components/dashboard/IoTSensorCards";
import HarvestPredictionChart from "@/components/dashboard/HarvestPredictionChart";
import AIGradingUpload from "@/components/dashboard/AIGradingUpload";
import MyProductsListing from "@/components/dashboard/MyProductsListing";
import CreditScoreWidget from "@/components/dashboard/CreditScoreWidget";
import NotificationFeed from "@/components/dashboard/NotificationFeed";
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";
import {
  mockData,
  harvestPredictionData,
  notifications,
  myProducts,
} from "@/lib/mock-data";

export default function FarmerDashboard() {
  const { farmer_profile, iot_sensors } = mockData;

  return (
    <div className="min-h-screen" style={{ background: "#F8F4EF" }}>
      <Navbar activePage="dashboard" />

      {/* ─── Main Content ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Welcome header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2
              className="text-2xl font-bold text-[#1A1A2E]"
              style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
            >
              Selamat Datang, {farmer_profile.name} 👋
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              📍 {farmer_profile.location} · 🌾{" "}
              {farmer_profile.land_area_ha} Ha ·{" "}
              {farmer_profile.commodities.join(", ")}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2.5 rounded-[12px] text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#2D6A4F" }}
            >
              📊 Laporan Bulanan
            </button>
            <button
              className="px-4 py-2.5 rounded-[12px] text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#F4A261", color: "#fff" }}
            >
              ➕ Panen Baru
            </button>
          </div>
        </div>

        {/* Quick stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Farmer Share", value: farmer_profile.farmer_share_improvement, icon: "📈", color: "#2D6A4F" },
            { label: "Skor ACS", value: farmer_profile.acs_score.toString(), icon: "🏆", color: "#F4A261" },
            { label: "Luas Lahan", value: `${farmer_profile.land_area_ha} Ha`, icon: "🌾", color: "#52B788" },
            { label: "Komoditas", value: `${farmer_profile.commodities.length} Aktif`, icon: "🌽", color: "#E63946" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-[12px] p-4 flex items-center gap-3 transition-all hover:scale-[1.02] cursor-default"
              style={{ boxShadow: "0 4px 24px rgba(45,106,79,0.12)" }}
            >
              <div
                className="w-10 h-10 rounded-[10px] flex items-center justify-center text-lg shrink-0"
                style={{ background: `${stat.color}18` }}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wider font-medium">
                  {stat.label}
                </p>
                <p
                  className="text-lg font-bold"
                  style={{ color: stat.color, fontFamily: "var(--font-sora), Sora, sans-serif" }}
                >
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <IoTSensorCards sensors={iot_sensors} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <HarvestPredictionChart data={harvestPredictionData} />
          </div>
          <div className="lg:col-span-1">
            <AIGradingUpload />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MyProductsListing products={myProducts} />
          </div>
          <div className="lg:col-span-1">
            <CreditScoreWidget
              score={farmer_profile.acs_score}
              status={farmer_profile.acs_status}
              shareImprovement={farmer_profile.farmer_share_improvement}
            />
          </div>
        </div>

        <NotificationFeed notifications={notifications} />

        <footer className="text-center py-6 border-t border-gray-200/60">
          <p className="text-xs text-[#6B7280]">
            © 2026 NusaCulta — End-to-End Agri-Hub D2C Platform.
            Didukung oleh IoT, AI, dan Alternative Credit Scoring.
          </p>
        </footer>
      </main>
    </div>
  );
}
