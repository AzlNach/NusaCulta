"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function PembiayaanRedirect() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/kredit-skor");
    } else {
      router.replace("/login");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F4EF]">
      <div className="text-center">
        <div className="text-4xl mb-3"></div>
        <p className="text-[#6B7280] text-sm">Mengarahkan ke halaman pembiayaan...</p>
      </div>
    </div>
  );
}
