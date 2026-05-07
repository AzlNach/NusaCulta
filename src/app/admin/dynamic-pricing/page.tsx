"use client";

import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { dynamicPricingData } from "@/lib/mock-data";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts";
import { useToast } from "@/components/shared/ToastNotification";

export default function DynamicPricingPage() {
  const { toast } = useToast();
  const [prices, setPrices] = useState(dynamicPricingData);
  const [editId, setEditId] = useState<string | null>(null);
  const [overrideVal, setOverrideVal] = useState("");

  const handleSave = (id: string) => {
    const val = parseInt(overrideVal);
    if (isNaN(val) || val <= 0) { toast("error", "Masukkan harga yang valid."); return; }
    setPrices((p) => p.map((item) => item.id === id ? { ...item, override: val } : item));
    toast("success", "Harga override berhasil disimpan.");
    setEditId(null);
    setOverrideVal("");
  };

  const resetOverride = (id: string) => {
    setPrices((p) => p.map((item) => item.id === id ? { ...item, override: null } : item));
    toast("info", "Override dihapus, kembali ke harga AI.");
  };

  return (
    <DashboardLayout>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>💰 Dynamic Pricing Panel</h2>

        {/* Alert */}
        {prices.some((p) => {
          const ai = p.aiPrice; const eff = p.override ?? p.aiPrice;
          return Math.abs(eff - ai) / ai > 0.2;
        }) && (
          <div className="bg-[#fef3c7] border border-[#fcd34d] text-[#92400e] rounded-[12px] px-4 py-3 text-sm font-medium">
            ⚠️ Satu atau lebih komoditas memiliki deviasi harga &gt;20% dari referensi pasar.
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-[14px] overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Komoditas", "Region", "Harga AI (Rp/kg)", "Override (Rp/kg)", "Δ vs Pasar", "Status", "Aksi"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {prices.map((row) => {
                  const effective = row.override ?? row.aiPrice;
                  const delta = ((effective - row.marketRef) / row.marketRef * 100).toFixed(1);
                  const isHigh = parseFloat(delta) > 20;
                  const isLow = parseFloat(delta) < -20;
                  return (
                    <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium text-[#1A1A2E]">{row.komoditas}</td>
                      <td className="px-4 py-3 text-[#6B7280]">{row.region}</td>
                      <td className="px-4 py-3 font-mono text-[#2D6A4F] font-semibold">Rp {row.aiPrice.toLocaleString("id-ID")}</td>
                      <td className="px-4 py-3">
                        {editId === row.id ? (
                          <div className="flex gap-1 items-center">
                            <input autoFocus type="number" value={overrideVal} onChange={(e) => setOverrideVal(e.target.value)}
                              className="w-28 border border-gray-200 rounded-[6px] px-2 py-1 text-xs text-[#1A1A2E] focus:outline-none focus:border-[#2D6A4F]" />
                            <button onClick={() => handleSave(row.id)} className="text-[#2D6A4F] font-bold text-xs hover:underline">✓</button>
                            <button onClick={() => setEditId(null)} className="text-[#6B7280] text-xs hover:underline">✗</button>
                          </div>
                        ) : (
                          <span className={row.override ? "font-bold text-[#F4A261]" : "text-[#6B7280]"}>
                            {row.override ? `Rp ${row.override.toLocaleString("id-ID")}` : "— (AI)"}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isHigh ? "bg-red-100 text-red-600" : isLow ? "bg-amber-100 text-amber-600" : "bg-green-50 text-green-700"}`}>
                          {delta}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${row.override ? "bg-amber-100 text-amber-700" : "bg-green-50 text-green-700"}`}>
                          {row.override ? "Manual" : "AI Auto"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditId(row.id); setOverrideVal(String(row.override ?? row.aiPrice)); }}
                            className="text-xs text-[#2D6A4F] hover:underline">Override</button>
                          {row.override && (
                            <button onClick={() => resetOverride(row.id)} className="text-xs text-[#E63946] hover:underline">Reset</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <p className="text-sm font-semibold text-[#1A1A2E] mb-4">Tren Harga 7 Hari — Cabai Merah (Jawa Barat)</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={prices[0]?.history ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: unknown) => `Rp ${(v as number).toLocaleString("id-ID")}`} />
              <ReferenceLine y={prices[0]?.marketRef} stroke="#F4A261" strokeDasharray="4 4" label={{ value: "Ref Pasar", position: "insideTopRight", fontSize: 10 }} />
              <Line type="monotone" dataKey="ai" stroke="#2D6A4F" strokeWidth={2} dot={false} name="AI Price" />
              <Line type="monotone" dataKey="actual" stroke="#E63946" strokeWidth={2} dot={false} name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
