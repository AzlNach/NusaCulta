"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";

const predictions = [
  { lahan: "Lahan Utama Lembang", komoditas: "Cabai Merah", tanggal: "18 Mei 2026", volume: 380, confidence: 87, irigasi: "Sudah" },
  { lahan: "Lahan Utama Lembang", komoditas: "Tomat", tanggal: "22 Mei 2026", volume: 520, confidence: 82, irigasi: "Belum" },
  { lahan: "Kebun Bawang Pangalengan", komoditas: "Bawang Daun", tanggal: "28 Mei 2026", volume: 180, confidence: 79, irigasi: "Belum" },
];

const totalRevenue = predictions.reduce((acc, p) => {
  const harga: Record<string, number> = { "Cabai Merah": 28000, "Tomat": 12500, "Bawang Daun": 18000 };
  return acc + p.volume * (harga[p.komoditas] ?? 15000);
}, 0);

export default function PrediksiPanenPage() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>Prediksi Panen</h2>
          <p className="text-sm text-[#6B7280] mt-1">Proyeksi panen berdasarkan model AI LSTM + data sensor IoT</p>
        </div>

        {/* Revenue summary */}
        <div className="bg-[#2D6A4F] rounded-[16px] p-6 text-white">
          <p className="text-sm opacity-80 mb-1">Total Estimasi Pendapatan (bulan ini)</p>
          <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-sora)" }}>
            Rp {totalRevenue.toLocaleString("id-ID")}
          </p>
          <p className="text-xs opacity-70 mt-1">Berdasarkan harga pasar D2C terkini</p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-[#6B7280] border-b border-gray-100">
                  {["Lahan", "Komoditas", "Tgl Panen Est.", "Volume (kg)", "Confidence", "Irigasi", "Aksi"].map((h) => (
                    <th key={h} className="text-left pb-3 font-semibold pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {predictions.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 pr-4 text-xs text-[#6B7280]">{p.lahan}</td>
                    <td className="py-4 pr-4 font-semibold text-[#1A1A2E]">{p.komoditas}</td>
                    <td className="py-4 pr-4 text-[#2D6A4F] font-medium">{p.tanggal}</td>
                    <td className="py-4 pr-4 font-bold text-[#1A1A2E]">{p.volume.toLocaleString("id-ID")}</td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${p.confidence}%`, background: p.confidence >= 85 ? "#2D6A4F" : "#F4A261" }} />
                        </div>
                        <span className="text-xs font-semibold" style={{ color: p.confidence >= 85 ? "#2D6A4F" : "#F4A261" }}>{p.confidence}%</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.irigasi === "Sudah" ? "bg-green-50 text-[#2D6A4F]" : "bg-orange-50 text-[#F4A261]"}`}>
                        {p.irigasi}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="text-xs text-[#2D6A4F] font-semibold hover:underline">Atur Irigasi</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calendar placeholder */}
        <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <h3 className="font-semibold text-[#1A1A2E] mb-4">📅 Kalender Panen Mei 2026</h3>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-[#6B7280] mb-2">
            {["Min","Sen","Sel","Rab","Kam","Jum","Sab"].map((d) => <div key={d} className="font-semibold py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {[...Array(4)].map((_, i) => <div key={`blank-${i}`} className="h-9" />)}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
              const hasPanen = [18, 22, 28].includes(day);
              return (
                <div key={day} className={`h-9 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${hasPanen ? "bg-[#2D6A4F] text-white" : "hover:bg-gray-100 text-[#374151]"}`}>
                  {day}
                  {hasPanen && <span className="absolute mt-5 w-1 h-1 rounded-full bg-[#F4A261]" />}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-[#6B7280] mt-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#2D6A4F] inline-block" /> Estimasi hari panen
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
