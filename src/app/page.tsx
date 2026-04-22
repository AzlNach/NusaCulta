"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { mockData } from "@/lib/mock-data";

const { national_stats } = mockData;

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ target, prefix = "", suffix = "", duration = 2000 }: {
  target: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString("id-ID")}{suffix}
    </span>
  );
}

// ─── Floating particle ───────────────────────────────────────────────────────
const floatingItems = ["🌾", "🌶️", "🍅", "🧅", "🥦", "🥬", "🌽", "🍃"];

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % 3), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#F8F4EF" }}>
      {/* ─── Navbar ─── */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-[#2D6A4F]/10" style={{ background: "rgba(248,244,239,0.90)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-[#2D6A4F] flex items-center justify-center">
                <span className="text-white text-sm font-bold" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>NC</span>
              </div>
              <div>
                <p className="text-base font-bold text-[#2D6A4F] leading-none" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>NusaCulta</p>
                <p className="text-[10px] text-[#6B7280] leading-none mt-0.5">End-to-End Agri-Hub D2C</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {[
                { label: "Cara Kerja", href: "#how-it-works" },
                { label: "Nilai Tambah", href: "#nilai-tambah" },
                { label: "Testimoni", href: "#testimoni" },
                { label: "Kemitraan", href: "#kemitraan" },
              ].map(link => (
                <a key={link.label} href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[#6B7280] hover:text-[#2D6A4F] hover:bg-[#2D6A4F]/5 transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="px-4 py-2 rounded-lg text-sm font-semibold text-[#2D6A4F] border border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/5 transition-colors">
                Masuk
              </Link>
              <Link href="/dashboard"
                className="px-4 py-2 rounded-[10px] text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: "#F4A261" }}>
                Daftar Gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-16 pb-24">
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle, #2D6A4F 0%, transparent 70%)", transform: "translate(20%, -20%)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(circle, #F4A261 0%, transparent 70%)", transform: "translate(-20%, 20%)" }} />
          {/* Floating emojis */}
          {floatingItems.map((emoji, i) => (
            <span key={i} className="absolute text-2xl select-none"
              style={{
                left: `${8 + i * 12}%`,
                top: `${10 + (i % 3) * 28}%`,
                opacity: 0.12,
                animation: `float-${i % 3} ${4 + i * 0.5}s ease-in-out infinite`,
                transform: `rotate(${i * 15}deg)`,
              }}>
              {emoji}
            </span>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2D6A4F]/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse" />
              <span className="text-xs font-semibold text-[#2D6A4F] tracking-wide">Platform Agri-Tech #1 Indonesia</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A2E] leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
              Petani{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#2D6A4F]">Berdaya</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 rounded" style={{ background: "rgba(82,183,136,0.2)", zIndex: 0 }} />
              </span>
              ,<br />Konsumen{" "}
              <span className="text-[#F4A261]">Terjamin</span>
            </h1>

            <p className="text-lg text-[#6B7280] mb-8 max-w-2xl leading-relaxed">
              NusaCulta menghubungkan petani langsung ke konsumen dengan teknologi IoT, AI Quality Grading,
              Dynamic Pricing, dan Alternative Credit Scoring — memotong rantai pasok, meningkatkan pendapatan petani hingga <strong className="text-[#2D6A4F]">+34%</strong>.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[12px] text-base font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "#2D6A4F", boxShadow: "0 8px 24px rgba(45,106,79,0.30)" }}>
                🌾 Mulai sebagai Petani
              </Link>
              <Link href="/marketplace"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[12px] text-base font-semibold transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "#F4A261", color: "#fff", boxShadow: "0 8px 24px rgba(244,162,97,0.30)" }}>
                🛒 Belanja Produk Segar
              </Link>
            </div>

            {/* Hero trust indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-10">
              {[
                { icon: "✅", text: "POJK 29/2024 Compliant" },
                { icon: "🏛️", text: "Terafiliasi Kementan RI" },
                { icon: "🔒", text: "Data terenkripsi AES-256" },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-sm text-[#6B7280] font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ANIMATED STATS BAR ─── */}
      <section className="py-12 border-y border-[#2D6A4F]/10" style={{ background: "rgba(45,106,79,0.03)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            {[
              { label: "Petani Aktif", target: national_stats.active_farmers, suffix: "+" },
              { label: "GMV Bulanan", target: 4.2, prefix: "Rp ", suffix: "M" },
              { label: "Farmer Share", target: national_stats.avg_farmer_share, suffix: "%" },
              { label: "Susut Pangan", target: national_stats.food_loss_reduction, suffix: "% ↓" },
              { label: "ACS Disetujui", target: national_stats.acs_approved, suffix: "+" },
            ].map((stat, i) => (
              <div key={i} className="group">
                <p className="text-3xl font-bold text-[#2D6A4F] transition-transform group-hover:scale-105"
                  style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
                  {stat.prefix || ""}
                  <AnimatedCounter target={stat.target} duration={2000} />
                  {stat.suffix}
                </p>
                <p className="text-sm text-[#6B7280] mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS — 3 PILLARS ─── */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-[#52B788] uppercase tracking-widest">Cara Kerja</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mt-2"
              style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
              Tiga Pilar Platform
            </h2>
            <p className="text-[#6B7280] mt-3 max-w-xl mx-auto">Ekosistem terintegrasi dari lahan ke meja makan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "📡",
                title: "IoT & AI Intelligence",
                color: "#2D6A4F",
                bg: "rgba(45,106,79,0.06)",
                steps: [
                  "Sensor IoT terpasang di lahan",
                  "Monitor kelembapan, pH, suhu & nutrisi real-time",
                  "AI prediksi panen 30 hari ke depan",
                  "AI Quality Grading foto hasil panen",
                ],
              },
              {
                icon: "🌐",
                title: "Direct-to-Consumer Marketplace",
                color: "#F4A261",
                bg: "rgba(244,162,97,0.06)",
                steps: [
                  "Petani listing produk dengan grade AI",
                  "Dynamic pricing berbasis data pasar nasional",
                  "Group-buy geo-cluster untuk B2C & B2B",
                  "Last-mile delivery teroptimasi",
                ],
              },
              {
                icon: "💳",
                title: "Alternative Credit Scoring",
                color: "#52B788",
                bg: "rgba(82,183,136,0.06)",
                steps: [
                  "Skor ACS berbasis data produktivitas IoT",
                  "Sesuai POJK 29/2024 OJK",
                  "Akses pembiayaan petani unbankable",
                  "Terintegrasi 5+ mitra fintech",
                ],
              },
            ].map((pillar, i) => (
              <div key={i}
                className="rounded-[16px] p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
                style={{ background: "#fff", boxShadow: "0 4px 24px rgba(45,106,79,0.10)" }}>
                <div className="w-14 h-14 rounded-[14px] flex items-center justify-center text-3xl mb-5"
                  style={{ background: pillar.bg }}>
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-4"
                  style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
                  {pillar.title}
                </h3>
                <ul className="space-y-2.5">
                  {pillar.steps.map((step, si) => (
                    <li key={si} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0 mt-0.5"
                        style={{ background: pillar.color }}>
                        {si + 1}
                      </span>
                      <span className="text-sm text-[#6B7280] leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUE PROPOSITION CARDS ─── */}
      <section id="nilai-tambah" className="py-20" style={{ background: "rgba(45,106,79,0.03)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-[#52B788] uppercase tracking-widest">Nilai Tambah</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mt-2"
              style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
              Mengapa NusaCulta?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "🚀", title: "Farmer Share +34%", desc: "Petani terima lebih banyak dari harga final konsumen vs model tradisional", color: "#2D6A4F" },
              { icon: "🤖", title: "AI Grading Akurat", desc: "Grading otomatis dengan Azure Custom Vision, akurasi 94.7% untuk Grade A", color: "#52B788" },
              { icon: "📊", title: "Dynamic Pricing", desc: "Harga update real-time berbasis supply-demand nasional, fair bagi semua pihak", color: "#F4A261" },
              { icon: "🏦", title: "Akses Pembiayaan", desc: "Skor kredit alternatif membuka akses 3.241+ petani unbankable ke pinjaman", color: "#E63946" },
              { icon: "🌍", title: "Peta Pasokan Nasional", desc: "Visualisasi real-time supply komoditas dari Sabang sampai Merauke", color: "#2D6A4F" },
              { icon: "📱", title: "Mobile First", desc: "Interface ramah petani, bisa digunakan dengan koneksi internet minimum", color: "#52B788" },
              { icon: "🛡️", title: "Anti Food Loss", desc: "Susut pangan turun 28% dengan prediksi panen dan routing logistik optimal", color: "#F4A261" },
              { icon: "🤝", title: "B2B Ready", desc: "Pengelolaan pesanan massal, kontrak, dan Group-Buy untuk restoran & ritel", color: "#E63946" },
            ].map((card, i) => (
              <div key={i}
                className="bg-white rounded-[14px] p-5 transition-all duration-200 hover:scale-[1.03] cursor-default group"
                style={{ boxShadow: "0 4px 16px rgba(45,106,79,0.08)" }}>
                <div className="w-11 h-11 rounded-[10px] flex items-center justify-center text-2xl mb-3"
                  style={{ background: `${card.color}12` }}>
                  {card.icon}
                </div>
                <h4 className="font-bold text-[#1A1A2E] mb-1.5 text-sm"
                  style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
                  {card.title}
                </h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimoni" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-[#52B788] uppercase tracking-widest">Testimoni</span>
            <h2 className="text-3xl font-bold text-[#1A1A2E] mt-2"
              style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
              Suara Para Petani
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Pak Sugiono", role: "Petani Cabai, Lembang", avatar: "PS",
                text: "Sejak pakai NusaCulta, penghasilan saya naik 34%. AI grading bikin cabai saya dapat harga Grade A yang lebih tinggi.",
                stars: 5, color: "#2D6A4F",
              },
              {
                name: "Bu Sari Dewi", role: "Petani Tomat, Pangalengan", avatar: "SD",
                text: "Pembiayaan Rp 15 juta cair dalam 3 hari! Padahal dulu selalu ditolak bank. Skor ACS NusaCulta yang membantu.",
                stars: 5, color: "#52B788",
              },
              {
                name: "Pak Budi Santoso", role: "Petani Bawang, Garut", avatar: "BS",
                text: "IoT sensor sangat membantu. Bisa pantau kondisi lahan dari HP tanpa harus ke kebun setiap saat.",
                stars: 5, color: "#F4A261",
              },
            ].map((t, i) => (
              <div key={i}
                className={`bg-white rounded-[16px] p-6 transition-all duration-300 ${activeTestimonial === i ? "scale-[1.02]" : ""}`}
                style={{ boxShadow: activeTestimonial === i ? `0 8px 32px ${t.color}30` : "0 4px 16px rgba(45,106,79,0.08)" }}>
                <div className="flex mb-4">
                  {Array(t.stars).fill(0).map((_, si) => (
                    <span key={si} className="text-[#F4A261] text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-[#1A1A2E] leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: t.color }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A2E]">{t.name}</p>
                    <p className="text-xs text-[#6B7280]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNER LOGOS ─── */}
      <section id="kemitraan" className="py-14 border-y border-[#2D6A4F]/10" style={{ background: "rgba(45,106,79,0.02)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-8">
            Dipercaya & Didukung Oleh
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {[
              { name: "Kementan RI", icon: "🏛️" },
              { name: "Azure AI", icon: "☁️" },
              { name: "OJK", icon: "🏦" },
              { name: "Danamas", icon: "💰" },
              { name: "Amartha", icon: "🌱" },
              { name: "BRI Agro", icon: "🌾" },
              { name: "Modalku", icon: "📈" },
            ].map((p) => (
              <div key={p.name}
                className="flex items-center gap-2 px-5 py-3 rounded-[10px] bg-white transition-all hover:shadow-md cursor-default"
                style={{ boxShadow: "0 2px 8px rgba(45,106,79,0.08)" }}>
                <span className="text-xl">{p.icon}</span>
                <span className="text-sm font-semibold text-[#6B7280]">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA REGISTER ─── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%)" }} />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #52B788 0%, transparent 50%), radial-gradient(circle at 80% 50%, #F4A261 0%, transparent 50%)"
        }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse" />
            Bergabunglah dengan 12.847 Petani
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>
            Siap Tingkatkan<br />Pendapatan Pertanian Anda?
          </h2>
          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
            Daftar gratis sekarang. Tidak ada biaya setup. Tim kami siap membantu onboarding lahan Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[14px] text-base font-bold text-[#2D6A4F] bg-white transition-all hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]">
              🌾 Daftar sebagai Petani
            </Link>
            <Link href="/marketplace"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[14px] text-base font-bold text-white border-2 border-white/30 transition-all hover:bg-white/10 hover:scale-[1.03]">
              🛒 Jelajahi Marketplace
            </Link>
          </div>
          <p className="text-white/50 text-sm mt-6">
            ✓ Gratis selamanya untuk petani kecil · ✓ Tanpa biaya tersembunyi · ✓ Dukungan 24/7
          </p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ background: "#1B4332" }} className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[8px] bg-[#52B788]/20 flex items-center justify-center">
                <span className="text-[#52B788] text-xs font-bold">NC</span>
              </div>
              <span className="text-white/70 text-sm">© 2026 NusaCulta — End-to-End Agri-Hub D2C Platform</span>
            </div>
            <div className="flex items-center gap-6">
              {["Kebijakan Privasi", "Syarat & Ketentuan", "Hubungi Kami"].map(link => (
                <span key={link} className="text-white/40 text-xs hover:text-white/70 cursor-pointer transition-colors">{link}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float-0 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-12px) rotate(5deg); } }
        @keyframes float-1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-18px) rotate(-5deg); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-8px) rotate(8deg); } }
      `}</style>
    </div>
  );
}
