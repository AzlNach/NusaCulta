"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { mockLahan, sensorHistory24h } from "@/lib/mock-data";

const anomalyLog = [
  { waktu: "07-05-2026 14:22", sensor: "pH", nilai: 4.8, batas: "5.5 – 7.5", aksi: "Tambahkan kapur dolomit" },
  { waktu: "06-05-2026 09:10", sensor: "Kelembapan", nilai: 82, batas: "60 – 80%", aksi: "Kurangi frekuensi irigasi" },
  { waktu: "04-05-2026 17:45", sensor: "Suhu", nilai: 32, batas: "18 – 30°C", aksi: "Pasang naungan sementara" },
];

export default function SensorDetailPage() {
  const params = useParams();
  const lahanId = params?.id as string;
  const lahan = mockLahan.find((l) => l.id === lahanId) ?? mockLahan[0];

  const [range, setRange] = useState("24h");
  const ranges = ["24h", "7 hari", "30 hari", "Custom"];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>
              {lahan.nama}
            </h2>
            <p className="text-sm text-[#6B7280] mt-0.5">{lahan.komoditas.join(", ")} · {lahan.luas} Ha</p>
          </div>
          <button className="px-4 py-2 rounded-[10px] text-sm font-semibold text-white bg-[#2D6A4F] hover:opacity-90 transition">
            ⬇ Export CSV
          </button>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Kelembapan Tanah", value: "68%", icon: "💧", color: "#3B82F6", status: "Normal" },
            { label: "pH Tanah", value: "4.8", icon: "🧪", color: "#8B5CF6", status: "⚠ Rendah", alert: true },
            { label: "Suhu", value: "24.5°C", icon: "🌡️", color: "#F4A261", status: "Normal" },
            { label: "Nitrogen (N)", value: "142 ppm", icon: "🌿", color: "#2D6A4F", status: "Normal" },
          ].map((m) => (
            <div key={m.label} className="bg-white rounded-[14px] p-4" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: m.alert ? "1px solid #fee2e2" : "none" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{m.icon}</span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${m.alert ? "bg-red-100 text-[#E63946]" : "bg-green-50 text-[#2D6A4F]"}`}>
                  {m.status}
                </span>
              </div>
              <p className="text-2xl font-bold" style={{ color: m.color }}>{m.value}</p>
              <p className="text-xs text-[#6B7280] mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#1A1A2E]">Historis Sensor</h3>
            <div className="flex gap-1">
              {ranges.map((r) => (
                <button key={r} onClick={() => setRange(r)}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                  style={{
                    background: range === r ? "#2D6A4F" : "#f3f4f6",
                    color: range === r ? "#fff" : "#6B7280",
                  }}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={sensorHistory24h} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="jam" tick={{ fontSize: 10 }} interval={5} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="kelembapan" stroke="#3B82F6" strokeWidth={2} dot={false} name="Kelembapan (%)" />
              <Line type="monotone" dataKey="suhu" stroke="#F4A261" strokeWidth={2} dot={false} name="Suhu (°C)" />
              <Line type="monotone" dataKey="ph" stroke="#8B5CF6" strokeWidth={2} dot={false} name="pH" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Anomaly log */}
        <div className="bg-white rounded-[14px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <h3 className="font-semibold text-[#1A1A2E] mb-4">Log Anomali</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-[#6B7280] border-b border-gray-100">
                  <th className="text-left pb-3 font-semibold">Waktu</th>
                  <th className="text-left pb-3 font-semibold">Sensor</th>
                  <th className="text-left pb-3 font-semibold">Nilai</th>
                  <th className="text-left pb-3 font-semibold">Batas Normal</th>
                  <th className="text-left pb-3 font-semibold">Rekomendasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {anomalyLog.map((row, i) => (
                  <tr key={i}>
                    <td className="py-3 text-[#6B7280] text-xs">{row.waktu}</td>
                    <td className="py-3"><span className="font-semibold text-[#1A1A2E]">{row.sensor}</span></td>
                    <td className="py-3"><span className="font-bold text-[#E63946]">{row.nilai}</span></td>
                    <td className="py-3 text-xs text-[#6B7280]">{row.batas}</td>
                    <td className="py-3 text-xs text-[#2D6A4F] font-medium">{row.aksi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
