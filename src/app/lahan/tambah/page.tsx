"use client";

import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { useToast } from "@/components/shared/ToastNotification";
import { useRouter } from "next/navigation";

export default function TambahLahanPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nama: "", komoditas: [] as string[], luas: "", alamat: "", lat: "-6.8116", lng: "107.6211",
  });

  const commodityOptions = ["Cabai Merah", "Tomat", "Bawang Daun", "Kentang", "Wortel", "Kubis", "Padi", "Jagung", "Singkong"];

  const toggleKomoditas = (k: string) => {
    setForm((p) => ({
      ...p,
      komoditas: p.komoditas.includes(k) ? p.komoditas.filter((x) => x !== k) : [...p.komoditas, k],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.komoditas.length === 0) { toast("error", "Pilih minimal 1 komoditas."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast("success", "Lahan berhasil ditambahkan! Kode pairing dikirim ke email Anda.");
    router.push("/dashboard/petani");
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>Tambah Lahan Baru</h2>
          <p className="text-sm text-[#6B7280] mt-1">Daftarkan lahan pertanian Anda dan hubungkan ke sensor IoT</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[20px] p-6 space-y-5" style={{ boxShadow: "0 4px 40px rgba(45,106,79,0.10)" }}>
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wide">Nama Lahan</label>
            <input required value={form.nama} onChange={(e) => setForm((p) => ({ ...p, nama: e.target.value }))}
              placeholder="Misal: Kebun Cabai Lembang"
              className="w-full px-4 py-3 rounded-[10px] border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-2 uppercase tracking-wide">Komoditas Utama</label>
            <div className="flex flex-wrap gap-2">
              {commodityOptions.map((k) => (
                <button key={k} type="button" onClick={() => toggleKomoditas(k)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                  style={{
                    background: form.komoditas.includes(k) ? "#2D6A4F" : "#f9fafb",
                    color: form.komoditas.includes(k) ? "#fff" : "#374151",
                    borderColor: form.komoditas.includes(k) ? "#2D6A4F" : "#e5e7eb",
                  }}>
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wide">Luas Lahan (Ha)</label>
            <input required type="number" min="0.1" step="0.1" value={form.luas}
              onChange={(e) => setForm((p) => ({ ...p, luas: e.target.value }))}
              placeholder="Misal: 1.5"
              className="w-full px-4 py-3 rounded-[10px] border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wide">Alamat Lengkap</label>
            <textarea required value={form.alamat} onChange={(e) => setForm((p) => ({ ...p, alamat: e.target.value }))}
              rows={2} placeholder="Desa, Kecamatan, Kabupaten, Provinsi"
              className="w-full px-4 py-3 rounded-[10px] border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition resize-none" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-2 uppercase tracking-wide">Koordinat GPS</label>
            <div className="w-full h-48 rounded-[12px] bg-[#e8f5e9] flex items-center justify-center mb-3 border border-[#2D6A4F]/20 overflow-hidden">
              <div className="text-center space-y-2">
                <div className="text-4xl">🗺️</div>
                <p className="text-sm font-medium text-[#2D6A4F]">Peta Interaktif</p>
                <p className="text-xs text-[#6B7280]">(React-Leaflet aktif di production)</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-[#6B7280] mb-1">Latitude</label>
                <input value={form.lat} onChange={(e) => setForm((p) => ({ ...p, lat: e.target.value }))}
                  className="w-full px-3 py-2 rounded-[8px] border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] transition" />
              </div>
              <div>
                <label className="block text-[10px] text-[#6B7280] mb-1">Longitude</label>
                <input value={form.lng} onChange={(e) => setForm((p) => ({ ...p, lng: e.target.value }))}
                  className="w-full px-3 py-2 rounded-[8px] border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] transition" />
              </div>
            </div>
            <button type="button" onClick={() => toast("info", "Mengambil lokasi GPS...")}
              className="mt-2 text-xs text-[#2D6A4F] font-semibold hover:underline flex items-center gap-1">
              📍 Gunakan Lokasi Saya
            </button>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-[12px] text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: "#2D6A4F" }}>
            {loading ? "Menyimpan..." : "💾 Simpan Lahan"}
          </button>
        </form>

        {/* Info box */}
        <div className="bg-blue-50 rounded-[14px] p-4 border border-blue-100">
          <p className="text-xs font-semibold text-blue-800 mb-1">ℹ️ Setelah lahan disimpan:</p>
          <p className="text-xs text-blue-700">Sistem akan mengirimkan kode pairing ke email Anda untuk menghubungkan perangkat sensor IoT fisik di lapangan.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
