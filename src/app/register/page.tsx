"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/shared/ToastNotification";

type RoleOption = "PETANI" | "GAPOKTAN" | "KONSUMEN_B2C" | "KONSUMEN_B2B" | "FINTECH" | "PEMERINTAH";

const roleOptions: { role: RoleOption; icon: string; label: string; desc: string }[] = [
  { role: "PETANI",       icon: "🌾", label: "Petani",             desc: "Jual hasil panen langsung ke konsumen" },
  { role: "GAPOKTAN",     icon: "👨‍🌾", label: "Gapoktan",           desc: "Kelompok tani & koperasi pertanian" },
  { role: "KONSUMEN_B2C", icon: "🛒", label: "Konsumen Pribadi",   desc: "Beli produk segar langsung dari petani" },
  { role: "KONSUMEN_B2B", icon: "🏢", label: "Bisnis / HORECA",    desc: "Langganan pasokan untuk kebutuhan bisnis" },
  { role: "FINTECH",      icon: "🏦", label: "Mitra Fintech",      desc: "Akses kredit skor alternatif petani" },
  { role: "PEMERINTAH",   icon: "🏛️", label: "Instansi Pemerintah", desc: "Monitor data pertanian & kebijakan subsidi" },
];

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ["", "Lemah", "Cukup", "Kuat", "Sangat Kuat"];
  const colors = ["", "#E63946", "#F4A261", "#52B788", "#2D6A4F"];
  if (!password) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1,2,3,4].map((i) => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all" style={{ background: i <= score ? colors[score] : "#e5e7eb" }} />
        ))}
      </div>
      <p className="text-[11px]" style={{ color: colors[score] }}>{labels[score]}</p>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPass: "" });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (i: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) {
      document.getElementById(`otp-${i+1}`)?.focus();
    }
  };

  const handleStep1 = () => {
    if (!selectedRole) return;
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPass) {
      toast("error", "Password dan konfirmasi tidak sama.");
      return;
    }
    setStep(3);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast("success", "Pendaftaran berhasil! Silakan login.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: "#F8F4EF" }}>
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-11 h-11 rounded-[12px] bg-[#2D6A4F] flex items-center justify-center">
              <span className="text-white font-bold" style={{ fontFamily: "var(--font-sora)" }}>NC</span>
            </div>
            <span className="text-xl font-bold text-[#2D6A4F]" style={{ fontFamily: "var(--font-sora)" }}>NusaCulta</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#1A1A2E] mt-4" style={{ fontFamily: "var(--font-sora)" }}>Buat Akun Baru</h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                style={{
                  background: s <= step ? "#2D6A4F" : "#e5e7eb",
                  color: s <= step ? "#fff" : "#9ca3af",
                }}
              >
                {s < step ? "✓" : s}
              </div>
              <span className="text-xs text-[#6B7280] hidden sm:block">
                {s === 1 ? "Pilih Tipe" : s === 2 ? "Data Diri" : "Verifikasi OTP"}
              </span>
              {s < 3 && <div className="w-8 h-0.5 bg-gray-200" style={{ background: s < step ? "#2D6A4F" : "#e5e7eb" }} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[20px] p-8 shadow-sm" style={{ boxShadow: "0 4px 40px rgba(45,106,79,0.10)" }}>

          {/* ── Step 1: Pilih Role ── */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-[#1A1A2E]">Saya bergabung sebagai...</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {roleOptions.map((opt) => (
                  <button
                    key={opt.role}
                    type="button"
                    onClick={() => setSelectedRole(opt.role)}
                    className="flex items-start gap-3 p-4 rounded-[12px] border-2 text-left transition-all"
                    style={{
                      borderColor: selectedRole === opt.role ? "#2D6A4F" : "#e5e7eb",
                      background: selectedRole === opt.role ? "#2D6A4F08" : "#fff",
                    }}
                  >
                    <span className="text-2xl shrink-0">{opt.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A2E]">{opt.label}</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={handleStep1}
                disabled={!selectedRole}
                className="w-full py-3 rounded-[12px] text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 mt-2"
                style={{ background: "#2D6A4F" }}
              >
                Lanjut →
              </button>
            </div>
          )}

          {/* ── Step 2: Data Diri ── */}
          {step === 2 && (
            <form onSubmit={handleStep2} className="space-y-4">
              <h2 className="text-base font-semibold text-[#1A1A2E]">Lengkapi data diri Anda</h2>
              {[
                { label: "Nama Lengkap", key: "name", type: "text", placeholder: "Nama sesuai KTP" },
                { label: "Email", key: "email", type: "email", placeholder: "nama@email.com" },
                { label: "Nomor HP", key: "phone", type: "tel", placeholder: "08xx atau +62xx" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wide">{f.label}</label>
                  <input
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={(form as Record<string, string>)[f.key]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-[10px] border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Min. 8 karakter"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  className="w-full px-4 py-3 rounded-[10px] border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition"
                />
                <PasswordStrength password={form.password} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wide">Konfirmasi Password</label>
                <input
                  type="password"
                  required
                  placeholder="Ulangi password"
                  value={form.confirmPass}
                  onChange={(e) => setForm((p) => ({ ...p, confirmPass: e.target.value }))}
                  className="w-full px-4 py-3 rounded-[10px] border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 rounded-[12px] text-sm font-semibold text-[#6B7280] bg-gray-100 hover:bg-gray-200 transition">← Kembali</button>
                <button type="submit" className="flex-1 py-3 rounded-[12px] text-sm font-semibold text-white hover:opacity-90 transition" style={{ background: "#2D6A4F" }}>Lanjut →</button>
              </div>
            </form>
          )}

          {/* ── Step 3: OTP ── */}
          {step === 3 && (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="text-center">
                <div className="text-4xl mb-3">📩</div>
                <h2 className="text-base font-semibold text-[#1A1A2E]">Verifikasi OTP</h2>
                <p className="text-sm text-[#6B7280] mt-1">
                  Kode 6 digit telah dikirim ke <strong>{form.email}</strong>
                </p>
              </div>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-11 h-12 text-center text-lg font-bold border-2 rounded-[10px] focus:outline-none focus:border-[#2D6A4F] transition"
                    style={{ borderColor: digit ? "#2D6A4F" : "#e5e7eb" }}
                  />
                ))}
              </div>
              <p className="text-center text-xs text-[#6B7280]">
                Demo: masukkan kode apa saja (misal: 123456)
              </p>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 rounded-[12px] text-sm font-semibold text-[#6B7280] bg-gray-100 hover:bg-gray-200 transition">← Kembali</button>
                <button type="submit" disabled={loading} className="flex-1 py-3 rounded-[12px] text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60 transition" style={{ background: "#2D6A4F" }}>
                  {loading ? "Memverifikasi..." : "Verifikasi & Daftar"}
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-[#6B7280] mt-5">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-[#2D6A4F] font-semibold hover:underline">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}
