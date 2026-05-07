import type { Role } from "@/lib/mock-data";

const roleConfig: Record<Role, { label: string; bg: string; color: string }> = {
  PETANI:       { label: "Petani",      bg: "#14532d22", color: "#15803d" },
  GAPOKTAN:     { label: "Gapoktan",    bg: "#bbf7d0",   color: "#166534" },
  KONSUMEN_B2C: { label: "Konsumen",    bg: "#dbeafe",   color: "#1d4ed8" },
  KONSUMEN_B2B: { label: "Bisnis B2B",  bg: "#e0e7ff",   color: "#4338ca" },
  FINTECH:      { label: "Fintech",     bg: "#fef3c7",   color: "#b45309" },
  PEMERINTAH:   { label: "Pemerintah",  bg: "#fee2e2",   color: "#b91c1c" },
  ADMIN:        { label: "Admin",       bg: "#f3f4f6",   color: "#374151" },
};

export default function RoleBadge({ role }: { role: Role }) {
  const cfg = roleConfig[role];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}
