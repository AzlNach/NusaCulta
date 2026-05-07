"use client";

import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { adminListings } from "@/lib/mock-data";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { useToast } from "@/components/shared/ToastNotification";

const tabs = ["Menunggu Review", "Aktif", "Ditolak", "Dihapus"] as const;

export default function AdminListingsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Menunggu Review");
  const [listings, setListings] = useState(adminListings);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const statusMap: Record<typeof tabs[number], string> = {
    "Menunggu Review": "pending",
    "Aktif": "aktif",
    "Ditolak": "ditolak",
    "Dihapus": "dihapus",
  };

  const filtered = listings.filter((l) => l.status === statusMap[activeTab]);

  const approve = (id: string) => {
    setListings((p) => p.map((l) => l.id === id ? { ...l, status: "aktif" } : l));
    toast("success", "Listing diapprove dan aktif di marketplace.");
  };

  const reject = (id: string) => {
    setListings((p) => p.map((l) => l.id === id ? { ...l, status: "ditolak" } : l));
    toast("warning", "Listing ditolak. Notifikasi dikirim ke petani.");
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setListings((p) => p.map((l) => l.id === deleteId ? { ...l, status: "dihapus" } : l));
    toast("info", "Listing dihapus.");
    setDeleteId(null);
  };

  return (
    <DashboardLayout>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>🔍 Moderasi Listing Produk</h2>

        {/* Tabs */}
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-full text-xs font-medium transition-all"
              style={{ background: activeTab === tab ? "#2D6A4F" : "#f3f4f6", color: activeTab === tab ? "#fff" : "#6B7280" }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-[14px] p-10 text-center text-[#6B7280]">Tidak ada listing di kategori ini.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((l) => (
              <div key={l.id} className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-14 h-14 rounded-[10px] bg-gray-100 flex items-center justify-center text-3xl shrink-0">{l.image}</div>
                  <div>
                    <p className="font-semibold text-[#1A1A2E] text-sm">{l.komoditas}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">oleh {l.farmer}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: l.grade === "A" ? "#dcfce7" : "#fef9c3", color: l.grade === "A" ? "#2D6A4F" : "#ca8a04" }}>Grade {l.grade}</span>
                      <span className="text-xs text-[#6B7280]">{l.stok} kg</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-bold text-[#2D6A4F]">Rp {l.harga.toLocaleString("id-ID")}/kg</span>
                  <span className="text-[11px] text-[#9ca3af]">{l.submitted}</span>
                </div>
                {l.status === "pending" && (
                  <div className="flex gap-2">
                    <button onClick={() => approve(l.id)} className="flex-1 py-2 rounded-[8px] text-xs font-semibold text-white bg-[#2D6A4F] hover:opacity-90 transition">✓ Approve</button>
                    <button onClick={() => reject(l.id)} className="flex-1 py-2 rounded-[8px] text-xs font-semibold text-white bg-[#E63946] hover:opacity-90 transition">✗ Tolak</button>
                  </div>
                )}
                {l.status !== "dihapus" && (
                  <button onClick={() => setDeleteId(l.id)} className="w-full mt-2 py-1.5 rounded-[8px] text-xs font-medium text-[#6B7280] bg-gray-100 hover:bg-gray-200 transition">Hapus</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        open={!!deleteId}
        title="Hapus Listing"
        message="Listing produk ini akan dihapus dari marketplace. Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Ya, Hapus"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </DashboardLayout>
  );
}
