"use client";

import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { mockLahan } from "@/lib/mock-data";
import { useToast } from "@/components/shared/ToastNotification";
import { useRouter } from "next/navigation";

export default function JualListingPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [form, setForm] = useState({ lahanId: "l1", komoditas: "Cabai Merah", stok: "", harga: "" });
  const [grading, setGrading] = useState<null | { grade: string; confidence: number }>(null);
  const [gradingLoading, setGradingLoading] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const recPrice = { "Cabai Merah": 28000, "Tomat": 12500, "Bawang Daun": 18000, "Kentang": 9500 }[form.komoditas] ?? 15000;

  const handlePhotoUpload = async () => {
    const newPhotos = [...photos, `📸 Foto ${photos.length + 1}`];
    setPhotos(newPhotos);
    if (newPhotos.length >= 3 && !grading) {
      setGradingLoading(true);
      await new Promise((r) => setTimeout(r, 1500));
      setGradingLoading(false);
      setGrading({ grade: "A", confidence: 91 });
      toast("success", "AI Grading selesai — Grade A (91% confidence)");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.length < 3) { toast("error", "Upload minimal 3 foto produk."); return; }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    toast("success", "Listing berhasil dipublish ke marketplace!");
    router.push("/marketplace");
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>Jual Produk</h2>
          <p className="text-sm text-[#6B7280] mt-1">Listing produk panen untuk dijual di marketplace D2C</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[20px] p-6 space-y-5" style={{ boxShadow: "0 4px 40px rgba(45,106,79,0.10)" }}>

          {/* Lahan picker */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wide">Pilih Lahan Asal</label>
            <select value={form.lahanId} onChange={(e) => setForm((p) => ({ ...p, lahanId: e.target.value }))}
              className="w-full px-4 py-3 rounded-[10px] border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] transition">
              {mockLahan.map((l) => <option key={l.id} value={l.id}>{l.nama} — {l.komoditas.join(", ")}</option>)}
            </select>
          </div>

          {/* Komoditas */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wide">Komoditas</label>
            <select value={form.komoditas} onChange={(e) => setForm((p) => ({ ...p, komoditas: e.target.value }))}
              className="w-full px-4 py-3 rounded-[10px] border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] transition">
              {["Cabai Merah", "Tomat", "Bawang Daun", "Kentang", "Wortel"].map((k) => <option key={k}>{k}</option>)}
            </select>
          </div>

          {/* Photo upload */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-2 uppercase tracking-wide">Foto Produk (min. 3)</label>
            <div className="border-2 border-dashed border-gray-200 rounded-[12px] p-6 text-center hover:border-[#2D6A4F]/50 transition">
              {photos.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3 justify-center">
                  {photos.map((p, i) => (
                    <div key={i} className="w-16 h-16 rounded-[8px] bg-gray-100 flex items-center justify-center text-xs font-medium text-[#6B7280]">{p}</div>
                  ))}
                </div>
              )}
              <button type="button" onClick={handlePhotoUpload}
                className="px-4 py-2 rounded-[8px] text-sm font-medium text-[#2D6A4F] border border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/5 transition">
                📷 Tambah Foto
              </button>
              <p className="text-xs text-[#6B7280] mt-2">{photos.length}/10 foto · Setelah 3 foto, AI grading otomatis berjalan</p>
            </div>
          </div>

          {/* AI Grading result */}
          {gradingLoading && (
            <div className="p-4 rounded-[12px] bg-blue-50 border border-blue-100 text-center">
              <div className="text-sm text-blue-700 font-medium animate-pulse">🤖 AI sedang menganalisis kualitas produk...</div>
            </div>
          )}
          {grading && (
            <div className="p-4 rounded-[12px] bg-green-50 border border-green-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white text-lg font-bold shrink-0">{grading.grade}</div>
              <div>
                <p className="font-semibold text-[#1A1A2E] text-sm">Hasil AI Quality Grading</p>
                <p className="text-xs text-[#6B7280] mt-0.5">Grade <strong className="text-[#2D6A4F]">{grading.grade}</strong> · Confidence: <strong className="text-[#2D6A4F]">{grading.confidence}%</strong> · Metode: EfficientNet</p>
              </div>
              <button type="button" className="ml-auto text-xs text-[#E63946] font-semibold hover:underline shrink-0">Ajukan Banding</button>
            </div>
          )}

          {/* Stok */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wide">Stok Tersedia (kg)</label>
            <input required type="number" min="1" value={form.stok} onChange={(e) => setForm((p) => ({ ...p, stok: e.target.value }))}
              placeholder="Misal: 200"
              className="w-full px-4 py-3 rounded-[10px] border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] transition" />
          </div>

          {/* Harga */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#374151] uppercase tracking-wide">Harga (Rp/kg)</label>
              <button type="button" onClick={() => setForm((p) => ({ ...p, harga: recPrice.toString() }))}
                className="text-[11px] text-[#2D6A4F] font-semibold hover:underline flex items-center gap-1">
                💡 Gunakan Harga Rekomendasi: Rp {recPrice.toLocaleString("id-ID")}
              </button>
            </div>
            <input required type="number" min="1000" value={form.harga} onChange={(e) => setForm((p) => ({ ...p, harga: e.target.value }))}
              placeholder={`Rekomendasi: Rp ${recPrice.toLocaleString("id-ID")}`}
              className="w-full px-4 py-3 rounded-[10px] border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] transition" />
          </div>

          <button type="submit" disabled={submitting}
            className="w-full py-3 rounded-[12px] text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: "#2D6A4F" }}>
            {submitting ? "Mempublish..." : "🚀 Publish ke Marketplace"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
