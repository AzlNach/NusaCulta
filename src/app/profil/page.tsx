"use client";

import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { useAuth } from "@/lib/auth-context";
import RoleBadge from "@/components/shared/RoleBadge";
import { useToast } from "@/components/shared/ToastNotification";

const loginHistory = [
  { ip: "182.4.112.44", device: "Chrome / Windows", time: "7 Mei 2026, 09:14" },
  { ip: "182.4.112.44", device: "Chrome / Windows", time: "6 Mei 2026, 20:33" },
  { ip: "114.79.28.12", device: "Safari / iPhone", time: "5 Mei 2026, 15:52" },
];

export default function ProfilPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: user?.name ?? "", email: user?.email ?? "" });

  if (!user) return null;

  const initials = user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    toast("success", "Profil berhasil disimpan.");
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>👤 Profil Saya</h2>

        {/* Avatar + identity */}
        <div className="bg-white rounded-[20px] p-6 space-y-5" style={{ boxShadow: "0 4px 40px rgba(45,106,79,0.10)" }}>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white text-xl font-bold">
                {initials}
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-xs hover:bg-gray-50 transition">✏️</button>
            </div>
            <div>
              <p className="font-bold text-[#1A1A2E] text-lg">{user.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <RoleBadge role={user.role} />
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${user.verified ? "bg-green-50 text-[#2D6A4F]" : "bg-orange-50 text-orange-600"}`}>
                  {user.verified ? "✓ Terverifikasi" : "⏳ Menunggu Verifikasi"}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {[
              { label: "Nama Lengkap", key: "name", type: "text" },
              { label: "Email", key: "email", type: "email" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wide">{f.label}</label>
                <input type={f.type} value={(form as Record<string, string>)[f.key]}
                  onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full px-4 py-3 rounded-[10px] border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition" />
              </div>
            ))}
            <button type="submit" disabled={saving}
              className="px-6 py-2.5 rounded-[10px] text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              style={{ background: "#2D6A4F" }}>
              {saving ? "Menyimpan..." : "💾 Simpan Perubahan"}
            </button>
          </form>
        </div>

        {/* Security */}
        <div className="bg-white rounded-[20px] p-6 space-y-4" style={{ boxShadow: "0 4px 40px rgba(45,106,79,0.10)" }}>
          <h3 className="font-semibold text-[#1A1A2E]">🔒 Keamanan Akun</h3>
          <div className="flex items-center justify-between p-3 rounded-[10px] bg-gray-50">
            <div>
              <p className="text-sm font-medium text-[#1A1A2E]">Password</p>
              <p className="text-xs text-[#6B7280]">Terakhir diubah 30 hari lalu</p>
            </div>
            <button onClick={() => toast("info", "Fitur ubah password coming soon.")} className="text-xs text-[#2D6A4F] font-semibold hover:underline">Ubah</button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-[10px] bg-gray-50">
            <div>
              <p className="text-sm font-medium text-[#1A1A2E]">Two-Factor Authentication (2FA)</p>
              <p className="text-xs text-[#6B7280]">via Google Authenticator</p>
            </div>
            <button onClick={() => toast("info", "2FA setup coming soon.")} className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-200 text-[#6B7280] hover:bg-gray-300 transition">Aktifkan</button>
          </div>
        </div>

        {/* Login history */}
        <div className="bg-white rounded-[20px] p-6" style={{ boxShadow: "0 4px 40px rgba(45,106,79,0.10)" }}>
          <h3 className="font-semibold text-[#1A1A2E] mb-4">📋 Riwayat Login</h3>
          <div className="space-y-3">
            {loginHistory.map((l, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-[10px] bg-gray-50">
                <span className="text-xl">🖥️</span>
                <div>
                  <p className="text-xs font-semibold text-[#1A1A2E]">{l.device}</p>
                  <p className="text-[11px] text-[#6B7280]">{l.ip} · {l.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
