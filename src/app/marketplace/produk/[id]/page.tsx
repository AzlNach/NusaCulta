"use client";

import { use } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useToast } from "@/components/shared/ToastNotification";

const mockProduct = {
  id: "p1",
  name: "Cabai Merah Grade A",
  farmer: "Pak Sugiono Hartono",
  farmerId: "u1",
  location: "Lembang, Jawa Barat",
  grade: "A",
  stok: 450,
  harga: 28000,
  image: "🌶️",
  desc: "Cabai merah keriting segar, dipanen langsung dari kebun dataran tinggi Lembang. AI Grade A — ukuran seragam, warna merah cerah, kadar air optimal.",
  sertifikasi: ["Organik LSPO", "GAP Kementan", "ISO 22000"],
  priceHistory: [
    { day: "26/4", price: 26500 }, { day: "27/4", price: 27000 }, { day: "28/4", price: 27800 },
    { day: "29/4", price: 27500 }, { day: "30/4", price: 28000 }, { day: "1/5", price: 28200 },
    { day: "2/5", price: 28000 },
  ],
  traceability: [
    { date: "30 Apr", event: "Panen", note: "Dipanen manual, suhu 22°C, kelembaban 78%", icon: "🌾" },
    { date: "1 Mei", event: "Sortasi & Grading", note: "AI grading: 94% lulus Grade A, 6% Grade B", icon: "🤖" },
    { date: "1 Mei", event: "Pengemasan", note: "Dikemas 10 kg/karung, pre-cooling 12°C", icon: "📦" },
    { date: "2 Mei", event: "Pengiriman", note: "Dikirim via cold chain ke gudang Jakarta", icon: "🚚" },
    { date: "2 Mei", event: "QC Gudang", note: "Lolos inspeksi mutu, ready-to-sell", icon: "✅" },
  ],
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { toast } = useToast();

  // In production, fetch by id; here use mock
  const product = { ...mockProduct, id };

  const handleBuy = () => toast("success", "Produk ditambahkan ke keranjang!");
  const handleChat = () => toast("info", "Fitur chat petani segera hadir.");

  return (
    <DashboardLayout>
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link href="/marketplace" className="hover:text-[#2D6A4F]">Marketplace</Link>
          <span>›</span>
          <span className="text-[#1A1A2E]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Image gallery placeholder */}
            <div className="bg-white rounded-[16px] overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div className="h-64 bg-gradient-to-br from-[#fef9c3] to-[#dcfce7] flex items-center justify-center text-8xl">{product.image}</div>
              <div className="flex gap-2 p-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-14 h-14 rounded-[8px] bg-gray-100 flex items-center justify-center text-2xl cursor-pointer hover:ring-2 ring-[#2D6A4F] transition">{product.image}</div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-[16px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <h3 className="font-semibold text-[#1A1A2E] mb-2">Deskripsi Produk</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{product.desc}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {product.sertifikasi.map((s) => (
                  <span key={s} className="text-xs px-3 py-1 rounded-full bg-[#dcfce7] text-[#2D6A4F] font-medium">✓ {s}</span>
                ))}
              </div>
            </div>

            {/* Price history */}
            <div className="bg-white rounded-[16px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <h3 className="font-semibold text-[#1A1A2E] mb-4">Tren Harga 7 Hari</h3>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={product.priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: unknown) => `Rp ${(v as number).toLocaleString("id-ID")}`} />
                  <Line type="monotone" dataKey="price" stroke="#2D6A4F" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Traceability */}
            <div className="bg-white rounded-[16px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#1A1A2E]">Rantai Pasok (Traceability)</h3>
                <Link href={`/traceabilitas/${product.id}`} className="text-xs text-[#2D6A4F] hover:underline">Lihat halaman publik →</Link>
              </div>
              <div className="space-y-3">
                {product.traceability.map((t, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#dcfce7] flex items-center justify-center text-base shrink-0">{t.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#1A1A2E]">{t.event}</span>
                        <span className="text-xs text-[#9ca3af]">{t.date}</span>
                      </div>
                      <p className="text-xs text-[#6B7280] mt-0.5">{t.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Buy card */}
          <div className="space-y-4">
            <div className="bg-white rounded-[16px] p-5 sticky top-4" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              <h1 className="text-lg font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>{product.name}</h1>
              <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-semibold bg-[#dcfce7] text-[#2D6A4F]">Grade {product.grade}</span>

              <div className="mt-3 mb-4">
                <p className="text-2xl font-black text-[#2D6A4F]">Rp {product.harga.toLocaleString("id-ID")}<span className="text-sm font-normal text-[#6B7280]">/kg</span></p>
                <p className="text-xs text-[#6B7280] mt-0.5">Stok tersedia: <span className="font-semibold text-[#1A1A2E]">{product.stok} kg</span></p>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-[#6B7280]">
                  <span>👨‍🌾</span>
                  <span className="font-medium text-[#1A1A2E]">{product.farmer}</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B7280]">
                  <span>📍</span>
                  <span>{product.location}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <button onClick={handleBuy} className="w-full py-3 rounded-[12px] text-sm font-bold text-white bg-[#2D6A4F] hover:opacity-90 transition">🛒 Tambah ke Keranjang</button>
                <button onClick={handleChat} className="w-full py-3 rounded-[12px] text-sm font-semibold text-[#2D6A4F] bg-[#f0fdf4] hover:bg-[#dcfce7] transition">💬 Chat Petani</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
