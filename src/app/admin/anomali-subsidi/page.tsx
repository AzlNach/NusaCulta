"use client";

import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { anomaliSubsidi } from "@/lib/mock-data";
import { useToast } from "@/components/shared/ToastNotification";
import ConfirmModal from "@/components/shared/ConfirmModal";

const statusColors: Record<string, { bg: string; text: string }> = {
  baru: { bg: "#fee2e2", text: "#dc2626" },
  ditinjau: { bg: "#fef3c7", text: "#d97706" },
  dilaporkan: { bg: "#dbeafe", text: "#2563eb" },
  ditutup: { bg: "#f3f4f6", text: "#6B7280" },
};

export default function AnomaliSubsidiPage() {
  const { toast } = useToast();
  const [data, setData] = useState(anomaliSubsidi);
  const [catatanEdit, setCatatanEdit] = useState<Record<string, string>>({});
  const [confirmReport, setConfirmReport] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = data.filter((d) =>
    d.petani.toLowerCase().includes(search.toLowerCase()) ||
    d.komoditas.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id: string, status: string) => {
    setData((p) => p.map((d) => d.id === id ? { ...d, status } : d));
    toast("success", `Status anomali diperbarui ke "${status}".`);
  };

  const handleReport = () => {
    if (!confirmReport) return;
    setData((p) => p.map((d) => d.id === confirmReport ? { ...d, status: "dilaporkan", catatan: catatanEdit[confirmReport] ?? d.catatan } : d));
    toast("warning", "Anomali dilaporkan ke Kementan.");
    setConfirmReport(null);
  };

  const handleExport = () => {
    toast("info", "Laporan anomali subsidi berhasil diekspor ke PDF.");
  };

  return (
    <DashboardLayout>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>🚨 Anomali Subsidi</h2>
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-semibold text-white bg-[#2D6A4F] hover:opacity-90 transition">
            ⬇ Ekspor Laporan
          </button>
        </div>

        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Cari petani atau komoditas..." className="w-full max-w-sm border border-gray-200 rounded-[10px] px-4 py-2 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#2D6A4F]" />

        <div className="space-y-4">
          {filtered.length === 0 && (
            <div className="bg-white rounded-[14px] p-10 text-center text-[#6B7280]">Tidak ada anomali ditemukan.</div>
          )}
          {filtered.map((item) => {
            const sc = statusColors[item.status] ?? statusColors.ditutup;
            const diffHa = (parseFloat(item.lahanGPS) - parseFloat(item.lahanRDKK)).toFixed(1);
            const isOver = parseFloat(diffHa) > 0;
            return (
              <div key={item.id} className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-[#1A1A2E] text-sm">{item.petani}</span>
                      <span className="text-[11px] font-mono text-[#6B7280]">{item.nik}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: sc.bg, color: sc.text }}>{item.status}</span>
                    </div>
                    <p className="text-xs text-[#6B7280]">Komoditas: <span className="text-[#1A1A2E] font-medium">{item.komoditas}</span></p>
                  </div>
                  <div className="text-right">
                    <p className={`text-base font-bold ${isOver ? "text-[#E63946]" : "text-[#2D6A4F]"}`}>Δ {isOver ? "+" : ""}{diffHa} Ha</p>
                    <p className="text-[11px] text-[#9ca3af]">Confidence: {item.confidence}%</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3 text-xs text-[#6B7280]">
                  <div className="bg-[#F8F4EF] rounded-[8px] p-3">
                    <p className="font-semibold text-[#1A1A2E] mb-0.5">GPS Lahan</p>
                    <p className="text-base font-bold text-[#2D6A4F]">{item.lahanGPS}</p>
                  </div>
                  <div className="bg-[#F8F4EF] rounded-[8px] p-3">
                    <p className="font-semibold text-[#1A1A2E] mb-0.5">Lahan eRDKK</p>
                    <p className="text-base font-bold text-[#E63946]">{item.lahanRDKK}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="text-xs font-medium text-[#6B7280]">Catatan:</label>
                  <input
                    value={catatanEdit[item.id] ?? item.catatan}
                    onChange={(e) => setCatatanEdit((p) => ({ ...p, [item.id]: e.target.value }))}
                    placeholder="Tambah catatan investigasi..."
                    className="mt-1 w-full border border-gray-200 rounded-[8px] px-3 py-1.5 text-xs text-[#1A1A2E] focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {item.status === "baru" && (
                    <button onClick={() => updateStatus(item.id, "ditinjau")} className="px-3 py-1.5 rounded-[8px] text-xs font-medium text-white bg-amber-500 hover:opacity-90 transition">Tinjau</button>
                  )}
                  {item.status !== "dilaporkan" && item.status !== "ditutup" && (
                    <button onClick={() => setConfirmReport(item.id)} className="px-3 py-1.5 rounded-[8px] text-xs font-medium text-white bg-[#E63946] hover:opacity-90 transition">Laporkan ke Kementan</button>
                  )}
                  {item.status !== "ditutup" && (
                    <button onClick={() => updateStatus(item.id, "ditutup")} className="px-3 py-1.5 rounded-[8px] text-xs font-medium text-[#6B7280] bg-gray-100 hover:bg-gray-200 transition">Tutup Kasus</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ConfirmModal
        open={!!confirmReport}
        title="Laporkan Anomali"
        message="Anomali ini akan dilaporkan ke sistem Kementerian Pertanian. Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Ya, Laporkan"
        danger
        onConfirm={handleReport}
        onCancel={() => setConfirmReport(null)}
      />
    </DashboardLayout>
  );
}
