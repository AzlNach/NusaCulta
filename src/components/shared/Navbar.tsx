"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth, roleDashboard } from "@/lib/auth-context";
import { allNotifications } from "@/lib/mock-data";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [dropOpen, setDropOpen] = useState(false);

  const unread = allNotifications.filter((n) => !n.read).length;
  const initials = user
    ? user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  const handleLogout = () => {
    logout();
    router.push("/login?logged_out=true");
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-[#2D6A4F]/10"
      style={{ background: "rgba(255,255,255,0.92)" }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={user ? roleDashboard(user.role) : "/"} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-[10px] bg-[#2D6A4F] flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white text-sm font-bold" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>NC</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-base font-bold text-[#2D6A4F] leading-none" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>NusaCulta</p>
              <p className="text-[10px] text-[#6B7280] leading-none mt-0.5">Agri-Hub D2C Platform</p>
            </div>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link href="/notifikasi" className="relative w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <svg className="w-[18px] h-[18px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unread > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#E63946] border-2 border-white text-white text-[9px] font-bold flex items-center justify-center">{unread}</span>
                  )}
                </Link>
                <div className="relative">
                  <button onClick={() => setDropOpen((o) => !o)} className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#2D6A4F] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{initials}</span>
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-xs font-semibold text-[#1A1A2E] leading-none">{user.name.split(" ")[0]}</p>
                      <p className="text-[10px] text-[#6B7280] leading-none mt-0.5 capitalize">{user.role.toLowerCase().replace("_", " ")}</p>
                    </div>
                    <svg className="w-3 h-3 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {dropOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setDropOpen(false)} />
                      <div className="absolute right-0 mt-2 w-44 bg-white rounded-[12px] shadow-lg border border-gray-100 z-50 overflow-hidden">
                        <Link href="/profil" onClick={() => setDropOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-[#1A1A2E] hover:bg-gray-50">👤 Profil</Link>
                        <Link href={roleDashboard(user.role)} onClick={() => setDropOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-[#1A1A2E] hover:bg-gray-50">📊 Dashboard</Link>
                        <hr className="border-gray-100" />
                        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-3 text-sm text-[#E63946] hover:bg-red-50 w-full text-left">🚪 Keluar</button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className={`px-4 py-2 rounded-[10px] text-sm font-medium transition-colors ${pathname === "/login" ? "text-[#2D6A4F]" : "text-[#6B7280] hover:text-[#2D6A4F]"}`}>Masuk</Link>
                <Link href="/register" className="px-4 py-2 rounded-[10px] text-sm font-semibold text-white bg-[#2D6A4F] hover:opacity-90 transition-opacity">Daftar</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
