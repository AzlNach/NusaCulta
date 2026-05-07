"use client";

import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { useToast } from "@/components/shared/ToastNotification";

const mockRoutes = [
  { id: "R01", driver: "Pak Joko", vehicle: "L300 - B 1234 XY", stops: 5, distance: 87.4, duration: "3j 20m", capacity: "1.2 ton", status: "optimal" },
  { id: "R02", driver: "Bu Dewi", vehicle: "Pickup - D 5678 AB", stops: 3, distance: 54.2, duration: "2j 10m", capacity: "0.8 ton", status: "optimal" },
  { id: "R03", driver: "Pak Reza", vehicle: "L300 - E 9012 CD", stops: 7, distance: 112.8, duration: "4j 45m", capacity: "1.5 ton", status: "suboptimal" },
];

const mockDeliveries = [
  { id: "D001", product: "Cabai Merah 50 kg", from: "Tasikmalaya", to: "Pasar Induk Jakarta", route: "R01", time: "07:00" },
  { id: "D002", product: "Tomat 120 kg", from: "Garut", to: "Supermarket Bandung", route: "R01", time: "07:45" },
  { id: "D003", product: "Bawang Daun 30 kg", from: "Cianjur", to: "Hotel Bogor", route: "R02", time: "08:30" },
  { id: "D004", product: "Wortel 200 kg", from: "Lembang", to: "Carefour Bekasi", route: "R02", time: "09:15" },
  { id: "D005", product: "Kentang 180 kg", from: "Dieng", to: "Pasar Senen Jakarta", route: "R03", time: "06:00" },
];

export default function RouteOptimizerPage() {
  const { toast } = useToast();
  const [selectedRoute, setSelectedRoute] = useState("R01");
  const [optimizing, setOptimizing] = useState(false);

  const deliveriesForRoute = mockDeliveries.filter((d) => d.route === selectedRoute);
  const route = mockRoutes.find((r) => r.id === selectedRoute)!;

  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      toast("success", "Optimasi rute selesai. Penghematan estimasi: 12 km / 45 menit.");
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>🚚 Route Optimizer</h2>
          <button onClick={handleOptimize} disabled={optimizing}
            className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-semibold text-white bg-[#2D6A4F] hover:opacity-90 disabled:opacity-50 transition">
            {optimizing ? "⏳ Mengoptimasi..." : "⚡ Jalankan Optimasi"}
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Rute", value: mockRoutes.length, icon: "🗺️" },
            { label: "Total Pengiriman", value: mockDeliveries.length, icon: "📦" },
            { label: "Total Jarak", value: `${mockRoutes.reduce((a, r) => a + r.distance, 0).toFixed(0)} km`, icon: "📏" },
            { label: "Rute Suboptimal", value: mockRoutes.filter((r) => r.status === "suboptimal").length, icon: "⚠️" },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-[14px] p-4" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <p className="text-2xl mb-1">{card.icon}</p>
              <p className="text-xl font-bold text-[#1A1A2E]">{card.value}</p>
              <p className="text-xs text-[#6B7280] mt-0.5">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Route List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#1A1A2E]">Daftar Rute</h3>
            {mockRoutes.map((r) => (
              <button key={r.id} onClick={() => setSelectedRoute(r.id)}
                className={`w-full text-left p-4 rounded-[12px] border-2 transition ${selectedRoute === r.id ? "border-[#2D6A4F] bg-[#f0fdf4]" : "border-transparent bg-white"}`}
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-[#1A1A2E]">{r.id} — {r.driver}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${r.status === "optimal" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{r.status}</span>
                </div>
                <p className="text-xs text-[#6B7280]">{r.vehicle}</p>
                <div className="flex gap-4 mt-1.5 text-xs text-[#6B7280]">
                  <span>🛑 {r.stops} stop</span>
                  <span>📏 {r.distance} km</span>
                  <span>⏱ {r.duration}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Map placeholder + delivery list */}
          <div className="lg:col-span-2 space-y-4">
            {/* Map */}
            <div className="bg-white rounded-[14px] overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div className="h-52 bg-gradient-to-br from-[#e0f2fe] to-[#dcfce7] flex flex-col items-center justify-center gap-2 text-[#6B7280]">
                <span className="text-4xl">🗺️</span>
                <p className="text-sm font-medium">Peta Rute — {route?.id}</p>
                <p className="text-xs text-center px-4">Integrasi Google Maps / Leaflet + OR-Tools tersedia di environment produksi.</p>
              </div>
            </div>

            {/* Deliveries */}
            <div className="bg-white rounded-[14px] overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div className="px-5 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-[#1A1A2E]">Batch Pengiriman — {selectedRoute}</p>
              </div>
              <div className="divide-y divide-gray-50">
                {deliveriesForRoute.map((d, i) => (
                  <div key={d.id} className="px-5 py-3 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#2D6A4F] text-white text-xs flex items-center justify-center shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1A1A2E] truncate">{d.product}</p>
                      <p className="text-xs text-[#6B7280]">{d.from} → {d.to}</p>
                    </div>
                    <span className="text-xs font-mono text-[#2D6A4F] shrink-0">{d.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
