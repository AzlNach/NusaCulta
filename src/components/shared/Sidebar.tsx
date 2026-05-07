"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import type { Role } from "@/lib/mock-data";

interface SidebarItem {
  label: string;
  href: string;
  icon: string;
  roles: Role[];
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard Petani",   href: "/dashboard/petani",      icon: "🌾", roles: ["PETANI", "GAPOKTAN"] },
  { label: "Lahan Saya",         href: "/lahan/tambah",          icon: "📍", roles: ["PETANI", "GAPOKTAN"] },
  { label: "Prediksi Panen",     href: "/prediksi-panen",        icon: "📅", roles: ["PETANI", "GAPOKTAN"] },
  { label: "Jual Produk",        href: "/jual/listing",          icon: "🏷️", roles: ["PETANI", "GAPOKTAN"] },
  { label: "Kredit Skor",        href: "/kredit-skor",           icon: "💳", roles: ["PETANI", "GAPOKTAN"] },
  { label: "Marketplace",        href: "/marketplace",           icon: "🛒", roles: ["PETANI","GAPOKTAN","KONSUMEN_B2C","KONSUMEN_B2B"] },
  { label: "Keranjang",          href: "/keranjang",             icon: "🛍️", roles: ["KONSUMEN_B2C","KONSUMEN_B2B"] },
  { label: "Pesanan",            href: "/pesanan",               icon: "📦", roles: ["PETANI","GAPOKTAN","KONSUMEN_B2C","KONSUMEN_B2B"] },
  { label: "Standing Order",     href: "/b2b/standing-order",    icon: "📋", roles: ["KONSUMEN_B2B"] },
  { label: "Portal ACS",         href: "/fintech/portal",        icon: "🏦", roles: ["FINTECH"] },
  { label: "Dashboard Gov",      href: "/pemerintah/dashboard",  icon: "🏛️", roles: ["PEMERINTAH"] },
  { label: "Admin Overview",     href: "/dashboard/admin",       icon: "📊", roles: ["ADMIN"] },
  { label: "Kelola Pengguna",    href: "/admin/users",           icon: "👥", roles: ["ADMIN"] },
  { label: "Moderasi Listing",   href: "/admin/listings",        icon: "🔍", roles: ["ADMIN"] },
  { label: "Dynamic Pricing",    href: "/admin/dynamic-pricing", icon: "💹", roles: ["ADMIN"] },
  { label: "Route Optimizer",    href: "/admin/route-optimizer", icon: "🗺️", roles: ["ADMIN"] },
  { label: "Anomali Subsidi",    href: "/admin/anomali-subsidi", icon: "🚨", roles: ["ADMIN"] },
  { label: "Profil",             href: "/profil",                icon: "👤", roles: ["PETANI","GAPOKTAN","KONSUMEN_B2C","KONSUMEN_B2B","FINTECH","PEMERINTAH","ADMIN"] },
  { label: "Notifikasi",         href: "/notifikasi",            icon: "🔔", roles: ["PETANI","GAPOKTAN","KONSUMEN_B2C","KONSUMEN_B2B","FINTECH","PEMERINTAH","ADMIN"] },
];

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const visible = sidebarItems.filter((item) => user && item.roles.includes(user.role));

  return (
    <aside
      className="hidden md:flex flex-col shrink-0 h-full border-r border-gray-100 bg-white transition-all duration-300"
      style={{ width: collapsed ? 64 : 220 }}
    >
      {/* Toggle */}
      <div className="flex items-center justify-end px-3 py-3 border-b border-gray-100">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm transition-colors"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {visible.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-colors ${
                active
                  ? "bg-[#2D6A4F]/10 text-[#2D6A4F]"
                  : "text-[#6B7280] hover:bg-gray-100 hover:text-[#1A1A2E]"
              }`}
            >
              <span className="text-base shrink-0">{item.icon}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
