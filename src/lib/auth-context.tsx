"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { type AuthUser, mockUsers, demoCredentials } from "@/lib/mock-data";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  isRole: (...roles: AuthUser["role"][]) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "nusaculta_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const storedUser = (() => {
    if (typeof window === "undefined") return null;
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? (JSON.parse(s) as AuthUser) : null; } catch { return null; }
  })();
  const [user, setUser] = useState<AuthUser | null>(storedUser);
  const [loading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 800)); // simulate network
    const cred = demoCredentials[email.toLowerCase()];
    if (!cred) return { ok: false, error: "Akun tidak ditemukan." };
    if (cred.password !== password) return { ok: false, error: "Password salah." };
    const found = mockUsers.find((u) => u.id === cred.userId);
    if (!found) return { ok: false, error: "Akun tidak ditemukan." };
    setUser(found);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const isRole = useCallback(
    (...roles: AuthUser["role"][]) => !!user && roles.includes(user.role),
    [user]
  );

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

/** Map role → default dashboard path */
export function roleDashboard(role: AuthUser["role"]): string {
  switch (role) {
    case "PETANI":
    case "GAPOKTAN":
      return "/dashboard/petani";
    case "KONSUMEN_B2C":
    case "KONSUMEN_B2B":
      return "/marketplace";
    case "FINTECH":
      return "/fintech/portal";
    case "PEMERINTAH":
      return "/pemerintah/dashboard";
    case "ADMIN":
      return "/dashboard/admin";
    default:
      return "/dashboard";
  }
}
