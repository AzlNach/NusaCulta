"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { useToast } from "@/components/shared/ToastNotification";

interface ACSReport {
  token: string;
  petaniName: string;
  petaniId: string;
  score: number;
  risk: string;
  components: { label: string; value: number }[];
  sharedAt: string;
}

const mockSharedReports: ACSReport[] = [
  { token: "ACS-TK1234", petaniName: "Sugiono Hartono", petaniId: "u1", score: 820, risk: "Rendah", components: [{ label: "Riwayat Panen", value: 90 }, { label: "Ketepatan Pembayaran", value: 85 }, { label: "Konsistensi IoT", value: 80 }, { label: "Diversifikasi Komoditas", value: 70 }], sharedAt: "2 hari lalu" },
  { token: "ACS-TK5678", petaniName: "Budi Santoso", petaniId: "u5", score: 650, risk: "Sedang", components: [{ label: "Riwayat Panen", value: 65 }, { label: "Ketepatan Pembayaran", value: 70 }, { label: "Konsistensi IoT", value: 55 }, { label: "Diversifikasi Komoditas", value: 60 }], sharedAt: "5 hari lalu" },
];

const accessLog = [
  { time: "1 mnt lalu", action: "Melihat ACS Report", petani: "Sugiono Hartono", token: "ACS-TK1234" },
  { time: "3 jam lalu", action: "Download PDF", petani: "Budi Santoso", token: "ACS-TK5678" },
  { time: "1 hari lalu", action: "Melihat ACS Report", petani: "Budi Santoso", token: "ACS-TK5678" },
];

const riskColor: Record<string, { bg: string; text: string }> = {
  "Rendah": { bg: "#dcfce7", text: "#15803d" },
  "Sedang": { bg: "#fef3c7", text: "#d97706" },
  "Tinggi": { bg: "#fee2e2", text: "#dc2626" },
};

export default function FintechPortalPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState(mockSharedReports);
  const [selected, setSelected] = useState<ACSReport | null>(null);

  useEffect(() => {
    if (user && user.role !== "FINTECH") {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user || user.role !== "FINTECH") return null;

  const filtered = reports.filter((r) =>
    r.petaniName.toLowerCase().includes(search.toLowerCase()) ||
    r.token.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = (r: ACSReport) => {
    toast("success", `Laporan ACS ${r.petaniName} berhasil diunduh (watermarked).`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>🏦 Portal Fintech</h2>
            <p className="text-sm text-[#6B7280] mt-1">Akses laporan ACS (Agri Credit Score) yang dibagikan oleh petani.</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-[10px] px-3 py-2 text-xs text-amber-700 max-w-xs">
            ⚠️ Seluruh akses tercatat dan laporan dilindungi watermark digital sesuai regulasi OJK.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left: Search + List */}
          <div className="space-y-3">
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Cari nama petani atau token..."
              className="w-full border border-gray-200 rounded-[10px] px-4 py-2 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#2D6A4F]" />
            {filtered.length === 0 && <p className="text-sm text-[#6B7280] py-4 text-center">Tidak ada laporan.</p>}
            {filtered.map((r) => {
              const rc = riskColor[r.risk] ?? riskColor["Sedang"];
              return (
                <button key={r.token} onClick={() => setSelected(r)}
                  className={`w-full text-left p-4 rounded-[12px] border-2 transition ${selected?.token === r.token ? "border-[#2D6A4F] bg-[#f0fdf4]" : "border-transparent bg-white"}`}
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-[#1A1A2E]">{r.petaniName}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: rc.bg, color: rc.text }}>{r.risk}</span>
                  </div>
                  <p className="text-xs text-[#6B7280] font-mono">{r.token}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-lg font-bold text-[#2D6A4F]">{r.score}</span>
                    <span className="text-[11px] text-[#9ca3af]">{r.sharedAt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detail */}
          <div className="lg:col-span-2">
            {!selected ? (
              <div className="bg-white rounded-[14px] p-10 flex flex-col items-center justify-center gap-3 text-[#6B7280]" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <span className="text-5xl">📋</span>
                <p className="text-sm">Pilih petani untuk melihat detail ACS.</p>
              </div>
            ) : (
              <div className="bg-white rounded-[14px] p-6 space-y-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-bold text-[#1A1A2E]">{selected.petaniName}</p>
                    <p className="text-xs font-mono text-[#6B7280]">Token: {selected.token}</p>
                  </div>
                  <span className="text-3xl font-black text-[#2D6A4F]">{selected.score}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {selected.components.map((c) => (
                    <div key={c.label} className="bg-[#F8F4EF] rounded-[10px] p-3">
                      <p className="text-xs text-[#6B7280] mb-1">{c.label}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-[#2D6A4F] h-2 rounded-full" style={{ width: `${c.value}%` }} />
                        </div>
                        <span className="text-xs font-bold text-[#1A1A2E]">{c.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 rounded-[10px] p-3 text-xs text-amber-700">
                  📌 Laporan ini diterbitkan oleh sistem NusaCulta ACS dan dilindungi watermark digital. Penggunaan di luar keperluan analitik pembiayaan melanggar syarat layanan.
                </div>

                <div className="flex gap-3">
                  <button onClick={() => handleDownload(selected)} className="flex-1 py-2.5 rounded-[10px] text-sm font-semibold text-white bg-[#2D6A4F] hover:opacity-90 transition">⬇ Download PDF</button>
                  <button onClick={() => { setReports((p) => p.filter((r) => r.token !== selected.token)); setSelected(null); toast("info", "Akses laporan dicabut."); }}
                    className="px-4 py-2.5 rounded-[10px] text-sm font-medium text-[#E63946] bg-red-50 hover:bg-red-100 transition">Cabut Akses</button>
                </div>
              </div>
            )}

            {/* Access Log */}
            <div className="mt-4 bg-white rounded-[14px] overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div className="px-5 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-[#1A1A2E]">Log Akses Terbaru</p>
              </div>
              <div className="divide-y divide-gray-50">
                {accessLog.map((log, i) => (
                  <div key={i} className="px-5 py-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-medium text-[#1A1A2E]">{log.action}</p>
                      <p className="text-[#6B7280]">{log.petani} · {log.token}</p>
                    </div>
                    <span className="text-[#9ca3af]">{log.time}</span>
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
