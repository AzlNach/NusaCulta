"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Pembiayaan", href: "/pembiayaan" },
  { label: "Admin", href: "/admin" },
];

interface NavbarProps {
  activePage?: string;
}

export default function Navbar({ activePage }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-[#2D6A4F]/10"
      style={{ background: "rgba(255,255,255,0.90)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-[10px] bg-[#2D6A4F] flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white text-sm font-bold" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
                NC
              </span>
            </div>
            <div>
              <p className="text-base font-bold text-[#2D6A4F] leading-none" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
                NusaCulta
              </p>
              <p className="text-[10px] text-[#6B7280] leading-none mt-0.5">Agri-Hub D2C Platform</p>
            </div>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#2D6A4F]/10 text-[#2D6A4F]"
                      : "text-[#6B7280] hover:text-[#1A1A2E] hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <svg className="w-[18px] h-[18px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#E63946] border-2 border-white" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#2D6A4F] flex items-center justify-center">
              <span className="text-white text-xs font-bold">PS</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
