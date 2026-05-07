"use client";

import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { adminUsers } from "@/lib/mock-data";
import RoleBadge from "@/components/shared/RoleBadge";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { useToast } from "@/components/shared/ToastNotification";

const statusColors: Record<string, { bg: string; color: string }> = {
  aktif:     { bg: "#f0fdf4", color: "#2D6A4F" },
  pending:   { bg: "#fef3c7", color: "#b45309" },
  suspended: { bg: "#fee2e2", color: "#E63946" },
};

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState(adminUsers);
  const [search, setSearch] = useState("");
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; userId: string; action: "suspend" | "delete" }>({ open: false, userId: "", action: "suspend" });

  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const handleAction = () => {
    const { userId, action } = confirmModal;
    if (action === "delete") {
      setUsers((p) => p.filter((u) => u.id !== userId));
      toast("success", "Pengguna berhasil dihapus.");
    } else {
      setUsers((p) => p.map((u) => u.id === userId ? { ...u, status: "suspended" } : u));
      toast("warning", "Pengguna berhasil disuspend.");
    }
    setConfirmModal({ open: false, userId: "", action: "suspend" });
  };

  return (
    <DashboardLayout>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>👥 Manajemen Pengguna</h2>

        {/* Search */}
        <div className="flex items-center gap-2">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama, email, atau NIK..."
            className="flex-1 px-4 py-2.5 rounded-[10px] border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] transition" />
          <button className="px-4 py-2.5 rounded-[10px] text-sm font-semibold text-white bg-[#2D6A4F] hover:opacity-90">
            Tambah Pengguna
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[14px] overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Pengguna", "Role", "Status", "Daftar", "Login Terakhir", "Aksi"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((u) => {
                  const sc = statusColors[u.status] ?? statusColors.aktif;
                  return (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center text-xs font-bold text-[#2D6A4F] shrink-0">{u.name[0]}</div>
                          <div>
                            <p className="font-medium text-[#1A1A2E]">{u.name}</p>
                            <p className="text-xs text-[#6B7280]">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4"><RoleBadge role={u.role} /></td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: sc.bg, color: sc.color }}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-[#6B7280]">{u.joined}</td>
                      <td className="px-5 py-4 text-xs text-[#6B7280]">{u.lastLogin}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {u.status === "pending" && (
                            <button onClick={() => { setUsers((p) => p.map((x) => x.id === u.id ? { ...x, status: "aktif" } : x)); toast("success", "Pengguna berhasil diverifikasi."); }}
                              className="text-xs font-semibold text-[#2D6A4F] hover:underline">Verifikasi</button>
                          )}
                          {u.status === "aktif" && (
                            <button onClick={() => setConfirmModal({ open: true, userId: u.id, action: "suspend" })}
                              className="text-xs font-semibold text-[#F4A261] hover:underline">Suspend</button>
                          )}
                          <button onClick={() => setConfirmModal({ open: true, userId: u.id, action: "delete" })}
                            className="text-xs font-semibold text-[#E63946] hover:underline">Hapus</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={confirmModal.open}
        title={confirmModal.action === "delete" ? "Hapus Pengguna" : "Suspend Pengguna"}
        message={confirmModal.action === "delete" ? "Akun pengguna akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan." : "Pengguna tidak bisa mengakses platform. Alasan suspend akan dikirim via email."}
        confirmLabel={confirmModal.action === "delete" ? "Ya, Hapus" : "Ya, Suspend"}
        danger
        onConfirm={handleAction}
        onCancel={() => setConfirmModal({ open: false, userId: "", action: "suspend" })}
      />
    </DashboardLayout>
  );
}
