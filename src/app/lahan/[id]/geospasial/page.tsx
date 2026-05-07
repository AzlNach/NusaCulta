"use client";

import { use } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { mockLahan } from "@/lib/mock-data";
import { useToast } from "@/components/shared/ToastNotification";

export default function GeospasialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { toast } = useToast();
  const lahan = mockLahan.find((l) => l.id === id) ?? mockLahan[0];

  const gpsPoints = [
    { lat: -6.8200, lng: 107.6290, label: "Titik A" },
    { lat: -6.8185, lng: 107.6310, label: "Titik B" },
    { lat: -6.8175, lng: 107.6295, label: "Titik C" },
    { lat: -6.8192, lng: 107.6275, label: "Titik D" },
  ];

  const rdkkLuas = 1.5;
  const gpsLuas = 2.1;
  const selisih = gpsLuas - rdkkLuas;
  const isAnomali = selisih > 0.3;

  const handleValidasi = () => {
    toast("success", "Data geospasial lahan berhasil divalidasi dan dikirim ke eRDKK.");
  };

  const handleLaporAnoamli = () => {
    toast("warning", "Anomali lahan dilaporkan ke sistem Kementan.");
  };

  return (
    <DashboardLayout>
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-6 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>🛰️ Validasi Geospasial</h2>
            <p className="text-sm text-[#6B7280] mt-1">Lahan: <span className="font-semibold text-[#1A1A2E]">{lahan.nama}</span></p>
          </div>
          <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${isAnomali ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
            {isAnomali ? "⚠️ Anomali Terdeteksi" : "✓ Data Konsisten"}
          </span>
        </div>

        {isAnomali && (
          <div className="bg-red-50 border border-red-200 rounded-[12px] px-4 py-3 text-sm text-red-700">
            ⚠️ Luas GPS ({gpsLuas} Ha) berbeda signifikan dengan data eRDKK ({rdkkLuas} Ha). Selisih: +{selisih.toFixed(1)} Ha.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Map placeholder */}
          <div className="bg-white rounded-[16px] overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <div className="px-5 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-[#1A1A2E]">Peta Batas Lahan</p>
            </div>
            <div className="h-72 bg-gradient-to-br from-[#e0f2fe] to-[#dcfce7] flex flex-col items-center justify-center gap-2 text-[#6B7280]">
              <span className="text-5xl">🛰️</span>
              <p className="text-sm font-medium">Polygon Lahan — {lahan.nama}</p>
              <p className="text-xs text-center px-4">Peta interaktif (React-Leaflet + Polygon layer) tersedia di environment produksi.</p>
            </div>
          </div>

          {/* Data comparison */}
          <div className="space-y-4">
            <div className="bg-white rounded-[16px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <h3 className="text-sm font-semibold text-[#1A1A2E] mb-4">Perbandingan Data Lahan</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Luas GPS (Satelit)", value: `${gpsLuas} Ha`, color: "#2D6A4F" },
                  { label: "Luas eRDKK (Kementan)", value: `${rdkkLuas} Ha`, color: isAnomali ? "#E63946" : "#2D6A4F" },
                  { label: "Selisih", value: `+${selisih.toFixed(1)} Ha (${((selisih / rdkkLuas) * 100).toFixed(0)}%)`, color: isAnomali ? "#E63946" : "#2D6A4F" },
                  { label: "Komoditas", value: lahan.komoditas },
                  { label: "Lokasi", value: `${lahan.lat.toFixed(4)}, ${lahan.lng.toFixed(4)}` },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-[#6B7280]">{item.label}</span>
                    <span className="font-semibold" style={{ color: item.color ?? "#1A1A2E" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* GPS Points */}
            <div className="bg-white rounded-[16px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <h3 className="text-sm font-semibold text-[#1A1A2E] mb-3">Titik GPS Batas Lahan</h3>
              <div className="space-y-2">
                {gpsPoints.map((pt) => (
                  <div key={pt.label} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#1A1A2E]">{pt.label}</span>
                    <span className="font-mono text-[#6B7280]">{pt.lat.toFixed(4)}, {pt.lng.toFixed(4)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button onClick={handleValidasi} className="px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white bg-[#2D6A4F] hover:opacity-90 transition">✓ Validasi & Kirim ke eRDKK</button>
          {isAnomali && (
            <button onClick={handleLaporAnoamli} className="px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white bg-[#E63946] hover:opacity-90 transition">⚠️ Laporkan Anomali</button>
          )}
          <button onClick={() => toast("info", "Data GPS diperbarui dari satelit terbaru.")} className="px-5 py-2.5 rounded-[10px] text-sm font-medium text-[#6B7280] bg-gray-100 hover:bg-gray-200 transition">🛰️ Refresh Data Satelit</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
