"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  grade: string;
  price: number;
  prevPrice: number;
  unit: string;
  stock: number;
  trend: "up" | "down";
  sold: number;
  image: string;
}

interface MyProductsListingProps {
  products: Product[];
}

function formatRupiah(num: number) {
  return "Rp " + num.toLocaleString("id-ID");
}

export default function MyProductsListing({ products }: MyProductsListingProps) {
  const [liveProducts, setLiveProducts] = useState(products);
  const [animatingIds, setAnimatingIds] = useState<Set<number>>(new Set());

  // Dynamic pricing ticker: update every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveProducts((prev) =>
        prev.map((p) => {
          const change = Math.round((Math.random() - 0.45) * 800);
          const newPrice = Math.max(5000, p.price + change);
          const newTrend = newPrice >= p.price ? "up" : "down";
          return {
            ...p,
            prevPrice: p.price,
            price: newPrice,
            trend: newTrend,
          };
        })
      );
      // Trigger animation for all items
      setAnimatingIds(new Set(products.map((p) => p.id)));
      setTimeout(() => setAnimatingIds(new Set()), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [products]);

  return (
    <div
      className="bg-white rounded-[12px] p-6 animate-fade-in-up"
      style={{
        boxShadow: "0 4px 24px rgba(45,106,79,0.12)",
        animationDelay: "400ms",
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2
            className="text-lg font-semibold text-[#1A1A2E]"
            style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
          >
            Komoditas Saya
          </h2>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Harga dinamis berdasarkan pasar real-time
          </p>
        </div>
        <button
          className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
          style={{
            background: "#F4A261",
            color: "#fff",
          }}
        >
          + Tambah Produk
        </button>
      </div>

      <div className="space-y-3">
        {liveProducts.map((product) => {
          const priceChange = product.price - product.prevPrice;
          const isAnimating = animatingIds.has(product.id);

          return (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 rounded-[12px] border border-gray-100 hover:border-[#52B788]/30 transition-all duration-200 hover:shadow-sm cursor-pointer group"
            >
              {/* Emoji icon */}
              <div className="w-12 h-12 rounded-[10px] bg-[#F8F4EF] flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                {product.image}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-[#1A1A2E] truncate">
                    {product.name}
                  </p>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      product.grade === "A"
                        ? "bg-[#52B788]/15 text-[#2D6A4F]"
                        : product.grade === "B"
                          ? "bg-[#F4A261]/15 text-[#F4A261]"
                          : "bg-[#E63946]/15 text-[#E63946]"
                    }`}
                  >
                    Grade {product.grade}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                  <span>Stok: {product.stock} {product.unit}</span>
                  <span>•</span>
                  <span>Terjual: {product.sold}</span>
                </div>
              </div>

              {/* Price with ticker animation */}
              <div className="text-right shrink-0">
                <p
                  className={`text-base font-bold tabular-nums ${
                    isAnimating
                      ? product.trend === "up"
                        ? "animate-tick-up"
                        : "animate-tick-down"
                      : ""
                  }`}
                  style={{
                    color: product.trend === "up" ? "#2D6A4F" : "#E63946",
                    fontFamily: "var(--font-sora), Sora, sans-serif",
                  }}
                >
                  {formatRupiah(product.price)}
                </p>
                <div className="flex items-center justify-end gap-1 mt-0.5">
                  <span
                    className={`text-[10px] font-semibold ${
                      product.trend === "up" ? "text-[#52B788]" : "text-[#E63946]"
                    }`}
                  >
                    {product.trend === "up" ? "▲" : "▼"}{" "}
                    {priceChange >= 0 ? "+" : ""}
                    {formatRupiah(Math.abs(priceChange))}
                  </span>
                  <span className="text-[10px] text-[#6B7280]">
                    /{product.unit}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
