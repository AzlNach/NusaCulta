"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, roleDashboard } from "@/lib/auth-context";
import { useToast } from "@/components/shared/ToastNotification";

function LoginForm() {
  const { login, user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const params = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.get("logged_out")) toast("info", "Anda berhasil keluar.");
  }, [params, toast]);

  useEffect(() => {
    if (user) router.replace(roleDashboard(user.role));
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email.trim(), password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error ?? "Login gagal.");
    }
  };

  // Demo credentials hint
  const demos = [
    { label: "Petani", email: "sugiono@petani.id", pass: "Petani@123" },
    { label: "Admin",  email: "admin@nusaculta.id", pass: "Admin@123" },
    { label: "Konsumen B2C", email: "budi@konsumen.id", pass: "Konsumen@123" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#F8F4EF" }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#2D6A4F] mb-4">
            <span className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-sora)" }}>NC</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>
            Masuk ke NusaCulta
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">Platform Agri-Hub D2C terpercaya untuk petani Indonesia</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[20px] p-8 shadow-sm" style={{ boxShadow: "0 4px 40px rgba(45,106,79,0.10)" }}>
          {error && (
            <div className="mb-5 flex items-center gap-2 px-4 py-3 rounded-[10px] bg-red-50 border border-red-100 text-sm text-[#E63946]">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wide">Email / Nomor HP</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="nama@email.com"
                className="w-full px-4 py-3 rounded-[10px] border border-gray-200 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#374151] uppercase tracking-wide">Password</label>
                <button type="button" className="text-xs text-[#2D6A4F] hover:underline">Lupa Password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Masukkan password"
                  className="w-full px-4 py-3 rounded-[10px] border border-gray-200 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-sm"
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-[12px] text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              style={{ background: "#2D6A4F" }}
            >
              {loading ? "Memverifikasi..." : "Masuk"}
            </button>
          </form>

          <p className="text-center text-sm text-[#6B7280] mt-5">
            Belum punya akun?{" "}
            <Link href="/register" className="text-[#2D6A4F] font-semibold hover:underline">Daftar sekarang</Link>
          </p>
        </div>

        {/* Demo accounts */}
        <div className="mt-6 bg-white/70 rounded-[14px] p-4 border border-dashed border-[#2D6A4F]/30">
          <p className="text-xs font-semibold text-[#6B7280] mb-3 uppercase tracking-wide">🧪 Akun Demo</p>
          <div className="space-y-2">
            {demos.map((d) => (
              <button
                key={d.email}
                type="button"
                onClick={() => { setEmail(d.email); setPassword(d.pass); }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-[8px] bg-[#2D6A4F]/5 hover:bg-[#2D6A4F]/10 transition-colors text-left"
              >
                <span className="text-xs font-medium text-[#2D6A4F]">{d.label}</span>
                <span className="text-[11px] text-[#6B7280]">{d.email}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center"><span className="text-4xl">🌿</span></div>}>
      <LoginForm />
    </Suspense>
  );
}
