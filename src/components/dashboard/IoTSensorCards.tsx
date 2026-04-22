"use client";

import { useEffect, useState } from "react";

interface SensorData {
  kelembapan: number;
  ph: number;
  nutrisi_n: number;
  suhu: number;
  last_update: string;
}

interface IoTSensorCardsProps {
  sensors: SensorData;
}

const sensorConfig = [
  {
    key: "kelembapan" as const,
    label: "Kelembapan",
    unit: "%",
    icon: "💧",
    optimal: { min: 60, max: 80 },
    color: "#2D6A4F",
  },
  {
    key: "ph" as const,
    label: "pH Tanah",
    unit: "",
    icon: "🧪",
    optimal: { min: 5.5, max: 7 },
    color: "#52B788",
  },
  {
    key: "nutrisi_n" as const,
    label: "Nutrisi (N)",
    unit: " ppm",
    icon: "🌱",
    optimal: { min: 100, max: 200 },
    color: "#F4A261",
  },
  {
    key: "suhu" as const,
    label: "Suhu",
    unit: "°C",
    icon: "🌡️",
    optimal: { min: 20, max: 30 },
    color: "#E63946",
  },
];

function getStatus(value: number, optimal: { min: number; max: number }) {
  if (value >= optimal.min && value <= optimal.max) return "optimal";
  if (
    value >= optimal.min - (optimal.max - optimal.min) * 0.2 &&
    value <= optimal.max + (optimal.max - optimal.min) * 0.2
  )
    return "warning";
  return "danger";
}

function getStatusLabel(status: string) {
  switch (status) {
    case "optimal":
      return "Optimal";
    case "warning":
      return "Perlu Perhatian";
    case "danger":
      return "Kritis";
    default:
      return "";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "optimal":
      return "bg-[#52B788]/15 text-[#2D6A4F]";
    case "warning":
      return "bg-[#F4A261]/15 text-[#F4A261]";
    case "danger":
      return "bg-[#E63946]/15 text-[#E63946]";
    default:
      return "";
  }
}

function getBarPercent(value: number, optimal: { min: number; max: number }) {
  const range = optimal.max - optimal.min;
  const extended = range * 0.5;
  const min = optimal.min - extended;
  const max = optimal.max + extended;
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}

export default function IoTSensorCards({ sensors }: IoTSensorCardsProps) {
  const [liveValues, setLiveValues] = useState(sensors);

  // Simulate real-time updates every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveValues((prev) => ({
        ...prev,
        kelembapan: +(prev.kelembapan + (Math.random() - 0.5) * 2).toFixed(1),
        ph: +(prev.ph + (Math.random() - 0.5) * 0.1).toFixed(1),
        nutrisi_n: Math.round(prev.nutrisi_n + (Math.random() - 0.5) * 5),
        suhu: +(prev.suhu + (Math.random() - 0.5) * 0.5).toFixed(1),
        last_update: "Baru saja",
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2
            className="text-lg font-semibold text-[#1A1A2E]"
            style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
          >
            IoT Sensor Lahan
          </h2>
          {/* Live indicator */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#52B788]"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#52B788]"></span>
          </span>
          <span className="text-xs text-[#6B7280]">LIVE</span>
        </div>
        <span className="text-xs text-[#6B7280]">
          Terakhir: {liveValues.last_update}
        </span>
      </div>

      {/* Sensor grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sensorConfig.map((sensor, idx) => {
          const value = liveValues[sensor.key];
          const status = getStatus(value, sensor.optimal);
          const barPercent = getBarPercent(value, sensor.optimal);

          return (
            <div
              key={sensor.key}
              className="animate-fade-in-up bg-white rounded-[12px] p-5 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-default"
              style={{
                boxShadow: "0 4px 24px rgba(45,106,79,0.12)",
                animationDelay: `${idx * 100}ms`,
              }}
            >
              {/* Pulse ring behind icon */}
              <div className="relative mb-3">
                <div
                  className="animate-pulse-ring absolute inset-0 w-11 h-11 rounded-full"
                  style={{ background: `${sensor.color}15` }}
                ></div>
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl relative z-10"
                  style={{ background: `${sensor.color}15` }}
                >
                  {sensor.icon}
                </div>
              </div>

              <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider mb-1">
                {sensor.label}
              </p>

              <div className="flex items-baseline gap-1 mb-2">
                <span
                  className="text-2xl font-bold text-[#1A1A2E] tabular-nums"
                  style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
                >
                  {value}
                </span>
                <span className="text-sm text-[#6B7280]">{sensor.unit}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-gray-100 mb-2">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${barPercent}%`,
                    background: status === "optimal" ? "#52B788" : status === "warning" ? "#F4A261" : "#E63946",
                  }}
                ></div>
              </div>

              {/* Status badge */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getStatusColor(status)}`}
                >
                  {getStatusLabel(status)}
                </span>
                <span className="text-[10px] text-[#6B7280]">
                  {sensor.optimal.min}–{sensor.optimal.max}
                  {sensor.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
