"use client";

import { useState } from "react";

interface Notification {
  id: number;
  type: "weather" | "price" | "delivery" | "finance";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationFeedProps {
  notifications: Notification[];
}

const typeConfig: Record<
  string,
  { icon: string; color: string; bgColor: string }
> = {
  weather: { icon: "🌦️", color: "#2D6A4F", bgColor: "#2D6A4F" },
  price: { icon: "💰", color: "#F4A261", bgColor: "#F4A261" },
  delivery: { icon: "🚚", color: "#52B788", bgColor: "#52B788" },
  finance: { icon: "🏦", color: "#1A1A2E", bgColor: "#1A1A2E" },
};

export default function NotificationFeed({
  notifications: initialNotifications,
}: NotificationFeedProps) {
  const [items, setItems] = useState(initialNotifications);
  const [filter, setFilter] = useState<string>("all");

  const unreadCount = items.filter((n) => !n.read).length;

  const filtered =
    filter === "all" ? items : items.filter((n) => n.type === filter);

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div
      className="bg-white rounded-[12px] p-6 animate-fade-in-up"
      style={{
        boxShadow: "0 4px 24px rgba(45,106,79,0.12)",
        animationDelay: "600ms",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2
            className="text-lg font-semibold text-[#1A1A2E]"
            style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
          >
            Notifikasi
          </h2>
          {unreadCount > 0 && (
            <span className="text-[10px] font-bold text-white bg-[#E63946] rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={markAllRead}
          className="text-xs text-[#52B788] font-semibold hover:underline"
        >
          Tandai semua dibaca
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {[
          { key: "all", label: "Semua" },
          { key: "weather", label: "🌦️ Cuaca" },
          { key: "price", label: "💰 Harga" },
          { key: "delivery", label: "🚚 Kirim" },
          { key: "finance", label: "🏦 Keuangan" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 ${filter === f.key
                ? "bg-[#2D6A4F] text-white"
                : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
        {filtered.map((notif) => {
          const config = typeConfig[notif.type];
          return (
            <div
              key={notif.id}
              onClick={() => markRead(notif.id)}
              className={`flex gap-3 p-3 rounded-[10px] cursor-pointer transition-all duration-200 group ${notif.read
                  ? "bg-gray-50/50 hover:bg-gray-50"
                  : "bg-white border border-gray-100 hover:border-[#52B788]/30 shadow-sm"
                }`}
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm"
                style={{ background: `${config.bgColor}12` }}
              >
                {config.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p
                    className={`text-sm font-medium truncate ${notif.read ? "text-[#6B7280]" : "text-[#1A1A2E]"
                      }`}
                  >
                    {notif.title}
                  </p>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-[#52B788] shrink-0 mt-1.5"></span>
                  )}
                </div>
                <p className="text-xs text-[#6B7280] mt-0.5 line-clamp-2">
                  {notif.message}
                </p>
                <p className="text-[10px] text-[#6B7280]/70 mt-1">
                  {notif.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
