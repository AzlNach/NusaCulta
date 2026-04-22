"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/shared/Navbar";
import { mockData } from "@/lib/mock-data";

const { marketplace_products } = mockData;

// Extended products for richer marketplace
const allProducts = [
  ...marketplace_products,
  { name: "Kentang Granola", price: 9500, unit: "kg", farmer: "Pak Hendra", location: "Pangalengan", grade: "A", stock: 600, image: "🥔" },
  { name: "Wortel Premium", price: 11000, unit: "kg", farmer: "Bu Tini", location: "Lembang", grade: "A", stock: 350, image: "🥕" },
  { name: "Brokoli Organik", price: 22000, unit: "kg", farmer: "Pak Dedi", location: "Cisarua", grade: "A", stock: 120, image: "🥦" },
  { name: "Kubis Segar", price: 7500, unit: "kg", farmer: "Bu Ratna", location: "Garut", grade: "B", stock: 900, image: "🥬" },
  { name: "Tomat Cherry", price: 35000, unit: "kg", farmer: "Pak Agus", location: "Malang", grade: "A", stock: 80, image: "🍅" },
  { name: "Cabai Rawit", price: 45000, unit: "kg", farmer: "Bu Wati", location: "Magelang", grade: "A", stock: 150, image: "🌶️" },
].map((p, i) => ({
  ...p,
  id: i + 1,
  image: (p as { image?: string }).image || ["🌶️","🍅","🧅","🥔","🥕","🥦","🥬"][i % 7],
  trend: (i % 3 === 0 ? "down" : "up") as "up" | "down",
  sold: 200 + i * 87,
  prevPrice: Math.round(((p as {price: number}).price || 0) * (i % 2 === 0 ? 0.95 : 1.05)),
}));

// ─── Dynamic Pricing Ticker ──────────────────────────────────────────────────
function PricingTicker() {
  const [prices, setPrices] = useState([
    { name: "Cabai Merah", price: 28000, trend: "up" as "up" | "down" },
    { name: "Tomat", price: 12500, trend: "down" as "up" | "down" },
    { name: "Bawang Daun", price: 18000, trend: "up" as "up" | "down" },
    { name: "Kentang", price: 9500, trend: "up" as "up" | "down" },
    { name: "Wortel", price: 11000, trend: "down" as "up" | "down" },
  ]);
  const [tickKey, setTickKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(p => {
        const delta = Math.floor(Math.random() * 800) - 400;
        return { ...p, price: Math.max(5000, p.price + delta), trend: delta >= 0 ? "up" : "down" };
      }));
      setTickKey(k => k + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-[14px] p-4 mb-6" style={{ boxShadow: "0 4px 24px rgba(45,106,79,0.10)" }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse" />
        <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Live Harga Pasar</span>
        <span className="ml-auto text-xs text-[#6B7280]">Update setiap 3 detik</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {prices.map((item, i) => (
          <div key={`${i}-${tickKey}`}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 ${item.trend === "up" ? "animate-tick-up" : "animate-tick-down"}`}>
            <span className="text-xs font-medium text-[#1A1A2E]">{item.name}</span>
            <span className={`text-sm font-bold ${item.trend === "up" ? "text-[#2D6A4F]" : "text-[#E63946]"}`}>
              Rp {item.price.toLocaleString("id-ID")}
            </span>
            <span className={`text-xs ${item.trend === "up" ? "text-[#2D6A4F]" : "text-[#E63946]"}`}>
              {item.trend === "up" ? "▲" : "▼"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Grade Badge ─────────────────────────────────────────────────────────────
function GradeBadge({ grade }: { grade: string }) {
  const colors: Record<string, string> = {
    A: "bg-[#52B788]/15 text-[#2D6A4F] border-[#52B788]/40",
    B: "bg-[#F4A261]/15 text-[#d4763a] border-[#F4A261]/40",
    C: "bg-[#E63946]/15 text-[#E63946] border-[#E63946]/40",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${colors[grade] || colors.B}`}>
      AI Grade {grade}
    </span>
  );
}

// ─── Cart Sidebar ─────────────────────────────────────────────────────────────
interface CartItem { id: number; name: string; price: number; qty: number; image: string; }

function CartSidebar({ cart, onClose, onUpdate }: {
  cart: CartItem[];
  onClose: () => void;
  onUpdate: (id: number, delta: number) => void;
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-sm bg-white flex flex-col h-full" style={{ boxShadow: "-8px 0 40px rgba(0,0,0,0.15)" }}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
            🛒 Keranjang Belanja
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#6B7280] hover:bg-gray-200 transition-colors">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-4xl block mb-3">🛒</span>
              <p className="text-[#6B7280] text-sm">Keranjang masih kosong</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded-[10px] bg-gray-50">
              <span className="text-2xl">{item.image}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1A1A2E] truncate">{item.name}</p>
                <p className="text-xs text-[#6B7280]">Rp {item.price.toLocaleString("id-ID")}/kg</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onUpdate(item.id, -1)}
                  className="w-6 h-6 rounded-full bg-white border border-gray-200 text-xs font-bold hover:bg-[#E63946]/10 transition-colors">−</button>
                <span className="text-sm font-bold w-6 text-center">{item.qty}</span>
                <button onClick={() => onUpdate(item.id, 1)}
                  className="w-6 h-6 rounded-full bg-white border border-gray-200 text-xs font-bold hover:bg-[#52B788]/10 transition-colors">+</button>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-100">
            <div className="flex justify-between mb-4">
              <span className="text-sm text-[#6B7280] font-medium">Total</span>
              <span className="text-lg font-bold text-[#2D6A4F]" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>
            <button className="w-full py-3 rounded-[12px] text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#2D6A4F" }}>
              Checkout Sekarang →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [filterGrade, setFilterGrade] = useState<string>("all");
  const [filterLocation, setFilterLocation] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedId, setAddedId] = useState<number | null>(null);

  const locations = ["all", ...Array.from(new Set(allProducts.map(p => p.location)))];
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = useCallback((product: typeof allProducts[0]) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === product.id);
      if (existing) return prev.map(c => c.id === product.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1, image: product.image }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1000);
  }, []);

  const updateCart = useCallback((id: number, delta: number) => {
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0));
  }, []);

  const filtered = allProducts
    .filter(p => {
      if (filterGrade !== "all" && p.grade !== filterGrade) return false;
      if (filterLocation !== "all" && p.location !== filterLocation) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "stock") return b.stock - a.stock;
      return 0;
    });

  return (
    <div className="min-h-screen" style={{ background: "#F8F4EF" }}>
      <Navbar activePage="marketplace" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
              🌾 Marketplace D2C
            </h1>
            <p className="text-sm text-[#6B7280] mt-1">Produk segar langsung dari petani — harga transparan, kualitas terjamin</p>
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-[12px] font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: "#2D6A4F" }}>
            🛒 Keranjang
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#E63946] text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Pricing Ticker */}
        <PricingTicker />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ─── Filter Sidebar ─── */}
          <aside className="lg:w-52 shrink-0">
            <div className="bg-white rounded-[14px] p-5 sticky top-20" style={{ boxShadow: "0 4px 16px rgba(45,106,79,0.08)" }}>
              <h3 className="font-bold text-[#1A1A2E] mb-4 text-sm" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>Filter</h3>

              {/* Search */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide block mb-2">Cari Produk</label>
                <input
                  type="text"
                  placeholder="Cabai, tomat..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 rounded-[8px] border border-gray-200 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#52B788] transition-colors"
                  style={{ background: "#F8F4EF" }}
                />
              </div>

              {/* Grade filter */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide block mb-2">Grade AI</label>
                <div className="space-y-1">
                  {["all", "A", "B", "C"].map(g => (
                    <button
                      key={g}
                      onClick={() => setFilterGrade(g)}
                      className={`w-full text-left px-3 py-1.5 rounded-[8px] text-sm transition-colors ${filterGrade === g ? "bg-[#2D6A4F]/10 text-[#2D6A4F] font-semibold" : "text-[#6B7280] hover:bg-gray-50"}`}>
                      {g === "all" ? "Semua Grade" : `Grade ${g}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location filter */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide block mb-2">Wilayah Asal</label>
                <div className="space-y-1">
                  {locations.map(loc => (
                    <button
                      key={loc}
                      onClick={() => setFilterLocation(loc)}
                      className={`w-full text-left px-3 py-1.5 rounded-[8px] text-sm transition-colors ${filterLocation === loc ? "bg-[#2D6A4F]/10 text-[#2D6A4F] font-semibold" : "text-[#6B7280] hover:bg-gray-50"}`}>
                      {loc === "all" ? "Semua Wilayah" : loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide block mb-2">Urutkan</label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-[8px] border border-gray-200 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#52B788] bg-white">
                  <option value="default">Default</option>
                  <option value="price-asc">Harga Terendah</option>
                  <option value="price-desc">Harga Tertinggi</option>
                  <option value="stock">Stok Terbanyak</option>
                </select>
              </div>
            </div>
          </aside>

          {/* ─── Product Grid ─── */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-[#6B7280]">
                <span className="font-semibold text-[#1A1A2E]">{filtered.length}</span> produk ditemukan
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-[16px] overflow-hidden transition-all duration-200 hover:scale-[1.02] group"
                  style={{ boxShadow: "0 4px 16px rgba(45,106,79,0.08)" }}>
                  {/* Product Image placeholder */}
                  <div className="h-40 flex items-center justify-center relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #F8F4EF, #e8f4f0)" }}>
                    <span className="text-6xl transition-transform duration-300 group-hover:scale-110">{product.image}</span>
                    <div className="absolute top-3 left-3">
                      <GradeBadge grade={product.grade} />
                    </div>
                    <div className={`absolute top-3 right-3 flex items-center gap-1 text-xs font-semibold rounded-full px-2 py-0.5 ${product.trend === "up" ? "bg-[#2D6A4F]/10 text-[#2D6A4F]" : "bg-[#E63946]/10 text-[#E63946]"}`}>
                      {product.trend === "up" ? "▲" : "▼"} {product.trend === "up" ? "Naik" : "Turun"}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-[#1A1A2E] text-sm mb-1" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-[10px] text-[#6B7280]">👨‍🌾 {product.farmer}</span>
                      <span className="text-[10px] text-[#6B7280]">·</span>
                      <span className="text-[10px] text-[#6B7280]">📍 {product.location}</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-lg font-bold text-[#2D6A4F]" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
                          Rp {product.price.toLocaleString("id-ID")}
                        </span>
                        <span className="text-xs text-[#6B7280]">/{product.unit}</span>
                      </div>
                      <span className="text-xs text-[#6B7280]">Stok: {product.stock} kg</span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className={`w-full py-2.5 rounded-[10px] text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
                        addedId === product.id
                          ? "bg-[#52B788] text-white"
                          : "bg-[#2D6A4F] text-white hover:opacity-90"
                      }`}>
                      {addedId === product.id ? "✓ Ditambahkan!" : "Tambah ke Keranjang"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <span className="text-4xl block mb-3">🔍</span>
                <p className="text-[#6B7280]">Tidak ada produk yang sesuai filter</p>
                <button onClick={() => { setFilterGrade("all"); setFilterLocation("all"); setSearchQuery(""); }}
                  className="mt-3 text-sm text-[#2D6A4F] font-medium hover:underline">Reset filter</button>
              </div>
            )}
          </div>
        </div>
      </main>

      {showCart && (
        <CartSidebar cart={cart} onClose={() => setShowCart(false)} onUpdate={updateCart} />
      )}
    </div>
  );
}
