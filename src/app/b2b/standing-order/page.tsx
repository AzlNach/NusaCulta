"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { standingOrders } from "@/lib/mock-data";
import { useToast } from "@/components/shared/ToastNotification";
import ConfirmModal from "@/components/shared/ConfirmModal";

const komoditasOptions = ["Cabai Merah", "Tomat", "Bawang Daun", "Kentang", "Wortel", "Kubis", "Jagung"];

export default function StandingOrderPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [orders, setOrders] = useState(standingOrders);
  const [showForm, setShowForm] = useState(false);
  const [cancelId, setCancelId] = useState<string | null>(null);

  const [form, setForm] = useState({
    komoditas: komoditasOptions[0],
    qtyPerPengiriman: "",
    frekuensi: "Mingguan",
    mulai: "",
    durasi: "3 bulan",
    hargaMaks: "",
    catatan: "",
  });

  useEffect(() => {
    if (user && user.role !== "KONSUMEN_B2B") {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user || user.role !== "KONSUMEN_B2B") return null;

  const handleCreate = () => {
    if (!form.qtyPerPengiriman || !form.mulai || !form.hargaMaks) {
      toast("error", "Harap lengkapi semua field wajib.");
      return;
    }
    const newOrder = {
      id: `SO-${Date.now().toString().slice(-4)}`,
      komoditas: form.komoditas,
      qtyPerPengiriman: parseInt(form.qtyPerPengiriman),
      frekuensi: form.frekuensi,
      mulai: form.mulai,
      durasi: form.durasi,
      hargaMaks: parseInt(form.hargaMaks),
      status: "aktif" as const,
      catatan: form.catatan,
    };
    setOrders((p) => [newOrder, ...p]);
    toast("success", "Standing order berhasil dibuat!");
    setShowForm(false);
    setForm({ komoditas: komoditasOptions[0], qtyPerPengiriman: "", frekuensi: "Mingguan", mulai: "", durasi: "3 bulan", hargaMaks: "", catatan: "" });
  };

  const togglePause = (id: string) => {
    setOrders((p) => p.map((o) => o.id === id ? { ...o, status: o.status === "aktif" ? "dijeda" : "aktif" } : o));
    toast("info", "Status standing order diperbarui.");
  };

  const handleCancel = () => {
    if (!cancelId) return;
    setOrders((p) => p.map((o) => o.id === cancelId ? { ...o, status: "dibatalkan" } : o));
    toast("warning", "Standing order dibatalkan.");
    setCancelId(null);
  };

  const statusColor: Record<string, { bg: string; text: string }> = {
    aktif: { bg: "#dcfce7", text: "#15803d" },
    dijeda: { bg: "#fef3c7", text: "#d97706" },
    dibatalkan: { bg: "#fee2e2", text: "#dc2626" },
  };

  return (
    <DashboardLayout>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>📋 Standing Order B2B</h2>
            <p className="text-sm text-[#6B7280] mt-1">Kelola pengiriman terjadwal produk pertanian untuk kebutuhan bisnis Anda.</p>
          </div>
          <button onClick={() => setShowForm((p) => !p)} className="px-4 py-2 rounded-[10px] text-sm font-semibold text-white bg-[#2D6A4F] hover:opacity-90 transition">
            {showForm ? "✕ Batal" : "+ Buat Standing Order"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-[16px] p-6" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            <h3 className="text-base font-bold text-[#1A1A2E] mb-4">Form Standing Order Baru</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#6B7280] mb-1">Komoditas *</label>
                <select value={form.komoditas} onChange={(e) => setForm((p) => ({ ...p, komoditas: e.target.value }))}
                  className="w-full border border-gray-200 rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:border-[#2D6A4F]">
                  {komoditasOptions.map((k) => <option key={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#6B7280] mb-1">Qty per Pengiriman (kg) *</label>
                <input type="number" value={form.qtyPerPengiriman} onChange={(e) => setForm((p) => ({ ...p, qtyPerPengiriman: e.target.value }))}
                  placeholder="Contoh: 500" className="w-full border border-gray-200 rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:border-[#2D6A4F]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#6B7280] mb-1">Frekuensi</label>
                <select value={form.frekuensi} onChange={(e) => setForm((p) => ({ ...p, frekuensi: e.target.value }))}
                  className="w-full border border-gray-200 rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:border-[#2D6A4F]">
                  {["Mingguan", "2x Seminggu", "Setiap 2 Minggu", "Bulanan"].map((f) => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#6B7280] mb-1">Tanggal Mulai *</label>
                <input type="date" value={form.mulai} onChange={(e) => setForm((p) => ({ ...p, mulai: e.target.value }))}
                  className="w-full border border-gray-200 rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:border-[#2D6A4F]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#6B7280] mb-1">Durasi Kontrak</label>
                <select value={form.durasi} onChange={(e) => setForm((p) => ({ ...p, durasi: e.target.value }))}
                  className="w-full border border-gray-200 rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:border-[#2D6A4F]">
                  {["1 bulan", "3 bulan", "6 bulan", "1 tahun"].map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#6B7280] mb-1">Harga Maks (Rp/kg) *</label>
                <input type="number" value={form.hargaMaks} onChange={(e) => setForm((p) => ({ ...p, hargaMaks: e.target.value }))}
                  placeholder="Contoh: 30000" className="w-full border border-gray-200 rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:border-[#2D6A4F]" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-[#6B7280] mb-1">Catatan Khusus</label>
              <textarea value={form.catatan} onChange={(e) => setForm((p) => ({ ...p, catatan: e.target.value }))}
                rows={2} placeholder="Spesifikasi grade, pengiriman, dll." className="w-full border border-gray-200 rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:border-[#2D6A4F] resize-none" />
            </div>
            <button onClick={handleCreate} className="mt-4 px-6 py-2.5 rounded-[10px] text-sm font-semibold text-white bg-[#2D6A4F] hover:opacity-90 transition">Buat Standing Order</button>
          </div>
        )}

        {/* Orders */}
        <div className="space-y-4">
          {orders.length === 0 && <div className="bg-white rounded-[14px] p-10 text-center text-[#6B7280]">Belum ada standing order.</div>}
          {orders.map((o) => {
            const sc = statusColor[o.status] ?? statusColor.dijeda;
            return (
              <div key={o.id} className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-[#1A1A2E] text-base">{o.komoditas}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: sc.bg, color: sc.text }}>{o.status}</span>
                    </div>
                    <p className="text-xs text-[#6B7280]">ID: <span className="font-mono">{o.id}</span> · {o.frekuensi} · {o.durasi}</p>
                    {o.catatan && <p className="text-xs text-[#6B7280] mt-1">📝 {o.catatan}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#2D6A4F]">{o.qtyPerPengiriman} kg</p>
                    <p className="text-xs text-[#6B7280]">per pengiriman</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">Maks Rp {o.hargaMaks.toLocaleString("id-ID")}/kg</p>
                  </div>
                </div>
                <p className="text-xs text-[#6B7280] mt-2">Mulai: {o.mulai}</p>
                {o.status !== "dibatalkan" && (
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => togglePause(o.id)} className="px-4 py-2 rounded-[8px] text-xs font-medium text-white transition" style={{ background: o.status === "aktif" ? "#F4A261" : "#2D6A4F" }}>
                      {o.status === "aktif" ? "⏸ Jeda" : "▶ Aktifkan"}
                    </button>
                    <button onClick={() => setCancelId(o.id)} className="px-4 py-2 rounded-[8px] text-xs font-medium text-[#E63946] bg-red-50 hover:bg-red-100 transition">Batalkan</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <ConfirmModal
        open={!!cancelId}
        title="Batalkan Standing Order"
        message="Standing order ini akan dibatalkan dan tidak dapat diaktifkan kembali."
        confirmLabel="Ya, Batalkan"
        danger
        onConfirm={handleCancel}
        onCancel={() => setCancelId(null)}
      />
    </DashboardLayout>
  );
}
