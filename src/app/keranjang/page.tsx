"use client";

import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { mockCartItems } from "@/lib/mock-data";
import { useToast } from "@/components/shared/ToastNotification";
import { useRouter } from "next/navigation";

export default function KeranjangPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [items, setItems] = useState(mockCartItems);
  const [shipping, setShipping] = useState("regular");

  const updateQty = (id: string, delta: number) => {
    setItems((p) => p.map((item) => item.id === id
      ? { ...item, qty: Math.max(1, Math.min(item.maxQty, item.qty + delta)) }
      : item
    ));
  };

  const removeItem = (id: string) => {
    setItems((p) => p.filter((item) => item.id !== id));
    toast("info", "Item dihapus dari keranjang.");
  };

  const subtotal = items.reduce((acc, i) => acc + i.harga * i.qty, 0);
  const ongkir = shipping === "regular" ? 25000 : 45000;
  const total = subtotal + ongkir;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>
          🛍️ Keranjang Belanja
        </h2>

        {/* Group buy banner */}
        <div className="bg-gradient-to-r from-[#2D6A4F] to-[#52B788] rounded-[14px] p-4 text-white flex items-center gap-3">
          <span className="text-2xl">🤝</span>
          <div>
            <p className="text-sm font-semibold">Gabung Group Buy!</p>
            <p className="text-xs opacity-90">3 pembeli lain di area Jakarta Selatan membeli produk serupa. Hemat ongkir 30%!</p>
          </div>
          <button className="ml-auto px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-xs font-semibold shrink-0 transition">Bergabung</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            {items.length === 0 ? (
              <div className="bg-white rounded-[14px] p-10 text-center" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <p className="text-4xl mb-3">🛒</p>
                <p className="font-semibold text-[#1A1A2E]">Keranjang kosong</p>
                <p className="text-sm text-[#6B7280] mt-1">Belum ada produk ditambahkan</p>
              </div>
            ) : items.map((item) => (
              <div key={item.id} className="bg-white rounded-[14px] p-4 flex items-center gap-4" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div className="w-14 h-14 rounded-[10px] bg-gray-100 flex items-center justify-center text-3xl shrink-0">{item.image}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1A1A2E] text-sm">{item.name}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">oleh {item.farmer}</p>
                  <p className="text-sm font-bold text-[#2D6A4F] mt-1">Rp {item.harga.toLocaleString("id-ID")}/kg</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm font-bold">−</button>
                  <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm font-bold">+</button>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-[#1A1A2E]">Rp {(item.harga * item.qty).toLocaleString("id-ID")}</p>
                  <button onClick={() => removeItem(item.id)} className="text-[11px] text-[#E63946] hover:underline mt-1">Hapus</button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="space-y-4">
            {/* Shipping */}
            <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <h3 className="font-semibold text-[#1A1A2E] mb-3">Metode Pengiriman</h3>
              {[
                { key: "regular", label: "Regular (2-3 hari)", price: 25000 },
                { key: "express", label: "Express (1 hari)", price: 45000 },
              ].map((opt) => (
                <label key={opt.key} className={`flex items-center justify-between p-3 rounded-[10px] border-2 mb-2 cursor-pointer transition-all ${shipping === opt.key ? "border-[#2D6A4F] bg-[#2D6A4F]/5" : "border-gray-100"}`}>
                  <div className="flex items-center gap-2">
                    <input type="radio" name="shipping" value={opt.key} checked={shipping === opt.key} onChange={() => setShipping(opt.key)} className="accent-[#2D6A4F]" />
                    <span className="text-sm font-medium">{opt.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#2D6A4F]">Rp {opt.price.toLocaleString("id-ID")}</span>
                </label>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <h3 className="font-semibold text-[#1A1A2E] mb-3">Ringkasan Pesanan</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#6B7280]"><span>Subtotal</span><span>Rp {subtotal.toLocaleString("id-ID")}</span></div>
                <div className="flex justify-between text-[#6B7280]"><span>Ongkos Kirim</span><span>Rp {ongkir.toLocaleString("id-ID")}</span></div>
                <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-[#1A1A2E]">
                  <span>Total</span><span>Rp {total.toLocaleString("id-ID")}</span>
                </div>
              </div>
              <button
                onClick={() => { toast("success", "Pesanan berhasil dibuat!"); router.push("/pesanan"); }}
                className="w-full mt-4 py-3 rounded-[12px] text-sm font-semibold text-white hover:opacity-90 transition"
                style={{ background: "#2D6A4F" }}
              >
                Lanjut ke Pembayaran →
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
