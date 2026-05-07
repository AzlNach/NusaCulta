// ─── NusaCulta Mock Data ─────────────────────────────────────────────────────

// ─── Auth / Role Types ───────────────────────────────────────────────────────
export type Role =
  | "PETANI"
  | "GAPOKTAN"
  | "KONSUMEN_B2C"
  | "KONSUMEN_B2B"
  | "FINTECH"
  | "PEMERINTAH"
  | "ADMIN";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  verified: boolean;
}

// ─── Mock Users ───────────────────────────────────────────────────────────────
export const mockUsers: AuthUser[] = [
  { id: "u1", name: "Pak Sugiono", email: "sugiono@petani.id", role: "PETANI", verified: true },
  { id: "u2", name: "Gapoktan Lembang Jaya", email: "gapoktan@lembang.id", role: "GAPOKTAN", verified: true },
  { id: "u3", name: "Budi Santoso", email: "budi@konsumen.id", role: "KONSUMEN_B2C", verified: true },
  { id: "u4", name: "PT. Segar Nusantara", email: "procurement@segar.co.id", role: "KONSUMEN_B2B", verified: true },
  { id: "u5", name: "Danamas Fintech", email: "analyst@danamas.id", role: "FINTECH", verified: true },
  { id: "u6", name: "Kementan RI", email: "data@kementan.go.id", role: "PEMERINTAH", verified: true },
  { id: "u7", name: "Admin NusaCulta", email: "admin@nusaculta.id", role: "ADMIN", verified: true },
];

// Demo login credentials (email → role)
export const demoCredentials: Record<string, { password: string; userId: string }> = {
  "sugiono@petani.id": { password: "Petani@123", userId: "u1" },
  "gapoktan@lembang.id": { password: "Gapoktan@123", userId: "u2" },
  "budi@konsumen.id": { password: "Konsumen@123", userId: "u3" },
  "procurement@segar.co.id": { password: "B2B@123", userId: "u4" },
  "analyst@danamas.id": { password: "Fintech@123", userId: "u5" },
  "data@kementan.go.id": { password: "Gov@123", userId: "u6" },
  "admin@nusaculta.id": { password: "Admin@123", userId: "u7" },
};

export const mockData = {
  farmer_profile: {
    name: "Pak Sugiono",
    location: "Lembang, Jawa Barat",
    land_area_ha: 1.2,
    commodities: ["Cabai Merah", "Tomat", "Bawang Daun"],
    acs_score: 724,
    acs_status: "Layak Pembiayaan",
    farmer_share_improvement: "+34%",
  },

  iot_sensors: {
    kelembapan: 68.4,
    ph: 6.2,
    nutrisi_n: 142,
    suhu: 24.5,
    last_update: "2 menit lalu",
  },

  marketplace_products: [
    {
      name: "Cabai Merah Grade A",
      price: 28000,
      unit: "kg",
      farmer: "Pak Sugiono",
      location: "Lembang",
      grade: "A",
      stock: 450,
    },
    {
      name: "Tomat Segar Grade B",
      price: 12500,
      unit: "kg",
      farmer: "Bu Sari",
      location: "Pangalengan",
      grade: "B",
      stock: 800,
    },
    {
      name: "Bawang Daun Grade A",
      price: 18000,
      unit: "kg",
      farmer: "Pak Budi",
      location: "Garut",
      grade: "A",
      stock: 200,
    },
  ],

  national_stats: {
    active_farmers: 12847,
    monthly_gmv_idr: 4200000000,
    avg_farmer_share: 72,
    food_loss_reduction: 28,
    acs_approved: 3241,
  },
};

// ─── Harvest Prediction Data (30-day forecast) ──────────────────────────────

export const harvestPredictionData = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const base = 40 + Math.sin(day / 5) * 15;
  return {
    day: `Hari ${day}`,
    cabai: Math.round(base + Math.random() * 10),
    tomat: Math.round(base * 0.7 + Math.random() * 8),
    bawang: Math.round(base * 0.5 + Math.random() * 6),
  };
});

// ─── Notification Feed ───────────────────────────────────────────────────────

export const notifications = [
  {
    id: 1,
    type: "weather" as const,
    title: "Peringatan Cuaca",
    message: "Hujan deras diprediksi besok pagi. Pastikan drainase lahan aktif.",
    time: "5 menit lalu",
    read: false,
  },
  {
    id: 2,
    type: "price" as const,
    title: "Harga Cabai Naik",
    message: "Harga cabai merah di pasar Caringin naik 12% — Rp 31.200/kg.",
    time: "1 jam lalu",
    read: false,
  },
  {
    id: 3,
    type: "delivery" as const,
    title: "Pengiriman Selesai",
    message: "Pesanan #NC-2847 telah sampai di konsumen. Rating: ⭐ 4.8",
    time: "3 jam lalu",
    read: true,
  },
  {
    id: 4,
    type: "finance" as const,
    title: "Pembiayaan Disetujui",
    message: "Pengajuan kredit Rp 15.000.000 telah disetujui oleh Mitra Fintech A.",
    time: "1 hari lalu",
    read: true,
  },
  {
    id: 5,
    type: "weather" as const,
    title: "Suhu Optimal",
    message: "Suhu lahan stabil di 24-26°C. Kondisi ideal untuk pertumbuhan tomat.",
    time: "1 hari lalu",
    read: true,
  },
];

// ─── My Products listing ─────────────────────────────────────────────────────

export const myProducts = [
  {
    id: 1,
    name: "Cabai Merah",
    grade: "A",
    price: 28000,
    prevPrice: 26500,
    unit: "kg",
    stock: 450,
    trend: "up" as const,
    sold: 1240,
    image: "🌶️",
  },
  {
    id: 2,
    name: "Tomat",
    grade: "B",
    price: 12500,
    prevPrice: 13000,
    unit: "kg",
    stock: 800,
    trend: "down" as const,
    sold: 680,
    image: "🍅",
  },
  {
    id: 3,
    name: "Bawang Daun",
    grade: "A",
    price: 18000,
    prevPrice: 17200,
    unit: "kg",
    stock: 200,
    trend: "up" as const,
    sold: 320,
    image: "🧅",
  },
];

// ─── ACS Score breakdown (for radar chart) ───────────────────────────────────

export const acsBreakdown = [
  { metric: "Produktivitas", value: 85, fullMark: 100 },
  { metric: "Konsistensi", value: 78, fullMark: 100 },
  { metric: "Volume", value: 70, fullMark: 100 },
  { metric: "Geo-Validasi", value: 92, fullMark: 100 },
  { metric: "Riwayat", value: 65, fullMark: 100 },
  { metric: "IoT Score", value: 88, fullMark: 100 },
];

// ─── Lahan / Fields data ─────────────────────────────────────────────────────
export const mockLahan = [
  { id: "l1", nama: "Lahan Utama Lembang", luas: 1.2, komoditas: ["Cabai Merah", "Tomat"], status: "aktif", lat: -6.8116, lng: 107.6211, iotStatus: "online" as const },
  { id: "l2", nama: "Kebun Bawang Pangalengan", luas: 0.8, komoditas: ["Bawang Daun"], status: "aktif", lat: -7.1532, lng: 107.5878, iotStatus: "online" as const },
  { id: "l3", nama: "Sawah Garut Selatan", luas: 2.1, komoditas: ["Padi"], status: "tidak aktif", lat: -7.2103, lng: 107.9076, iotStatus: "offline" as const },
];

// ─── Sensor history 24h ──────────────────────────────────────────────────────
export const sensorHistory24h = Array.from({ length: 24 }, (_, i) => ({
  jam: `${String(i).padStart(2, "0")}:00`,
  kelembapan: Math.round(62 + Math.sin(i / 4) * 8 + Math.random() * 3),
  ph: parseFloat((6.1 + Math.sin(i / 6) * 0.3 + Math.random() * 0.1).toFixed(1)),
  suhu: parseFloat((23 + Math.sin(i / 5) * 3 + Math.random() * 1).toFixed(1)),
}));

// ─── Admin KPI ───────────────────────────────────────────────────────────────
export const adminKpi = {
  total_active_users: 12847,
  today_transactions_idr: 248_500_000,
  active_listings: 3_412,
  volume_kg: 87_240,
  avg_acs: 681,
  new_anomalies: 14,
};

// ─── Admin transaction chart ─────────────────────────────────────────────────
export const adminTransactionChart = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1} Mei`,
  transactions: Math.round(180_000_000 + Math.sin(i / 4) * 40_000_000 + Math.random() * 20_000_000),
  orders: Math.round(420 + Math.sin(i / 3) * 80 + Math.random() * 40),
}));

// ─── Admin users table ────────────────────────────────────────────────────────
export const adminUsers = [
  { id: "u1", name: "Pak Sugiono", email: "sugiono@petani.id", role: "PETANI" as Role, status: "aktif", joined: "12 Jan 2026", lastLogin: "2 mnt lalu" },
  { id: "u3", name: "Budi Santoso", email: "budi@konsumen.id", role: "KONSUMEN_B2C" as Role, status: "aktif", joined: "15 Feb 2026", lastLogin: "1 jam lalu" },
  { id: "u4", name: "PT. Segar Nusantara", email: "procurement@segar.co.id", role: "KONSUMEN_B2B" as Role, status: "aktif", joined: "3 Mar 2026", lastLogin: "3 jam lalu" },
  { id: "u8", name: "Pak Ahmad", email: "ahmad@petani.id", role: "PETANI" as Role, status: "pending", joined: "5 Mei 2026", lastLogin: "—" },
  { id: "u9", name: "Bu Dewi", email: "dewi@petani.id", role: "PETANI" as Role, status: "suspended", joined: "20 Apr 2026", lastLogin: "2 hari lalu" },
];

// ─── Marketplace listings for moderation ─────────────────────────────────────
export const adminListings = [
  { id: "p1", farmer: "Pak Sugiono", komoditas: "Cabai Merah", grade: "A", stok: 450, harga: 28000, status: "pending", submitted: "5 mnt lalu", image: "🌶️" },
  { id: "p2", farmer: "Bu Sari", komoditas: "Tomat Segar", grade: "B", stok: 800, harga: 12500, status: "pending", submitted: "22 mnt lalu", image: "🍅" },
  { id: "p3", farmer: "Pak Budi", komoditas: "Bawang Daun", grade: "A", stok: 200, harga: 18000, status: "aktif", submitted: "1 jam lalu", image: "🧅" },
  { id: "p4", farmer: "Bu Tini", komoditas: "Wortel Premium", grade: "A", stok: 350, harga: 11000, status: "ditolak", submitted: "2 jam lalu", image: "🥕" },
];

// ─── Dynamic Pricing data ────────────────────────────────────────────────────
const cabaiHistory = [
  { day: "25/4", ai: 26000, actual: 25800 }, { day: "26/4", ai: 26500, actual: 26200 },
  { day: "27/4", ai: 27000, actual: 27500 }, { day: "28/4", ai: 27200, actual: 27000 },
  { day: "29/4", ai: 27800, actual: 28200 }, { day: "30/4", ai: 28000, actual: 27900 },
  { day: "1/5",  ai: 28000, actual: 28100 },
];
export const dynamicPricingData: {
  id: string; komoditas: string; region: string; aiPrice: number; marketRef: number;
  override: number | null; confidence: number; history: { day: string; ai: number; actual: number }[];
}[] = [
  { id: "dp1", komoditas: "Cabai Merah", region: "Jawa Barat", aiPrice: 28000, marketRef: 27500, override: null, confidence: 92, history: cabaiHistory },
  { id: "dp2", komoditas: "Tomat", region: "Jawa Tengah", aiPrice: 12500, marketRef: 13200, override: null, confidence: 88, history: [] },
  { id: "dp3", komoditas: "Bawang Daun", region: "Jawa Timur", aiPrice: 18000, marketRef: 17200, override: 19000, confidence: 85, history: [] },
  { id: "dp4", komoditas: "Kentang", region: "Jawa Barat", aiPrice: 9500, marketRef: 9800, override: null, confidence: 90, history: [] },
  { id: "dp5", komoditas: "Wortel", region: "Jawa Tengah", aiPrice: 11000, marketRef: 8900, override: 13500, confidence: 79, history: [] },
  { id: "dp6", komoditas: "Kubis", region: "Jawa Timur", aiPrice: 7500, marketRef: 7200, override: null, confidence: 83, history: [] },
];

// ─── Cart items ──────────────────────────────────────────────────────────────
export const mockCartItems = [
  { id: "c1", productId: "p1", name: "Cabai Merah Grade A", farmer: "Pak Sugiono", grade: "A", harga: 28000, qty: 5, maxQty: 50, image: "🌶️" },
  { id: "c2", productId: "p3", name: "Bawang Daun Grade A", farmer: "Pak Budi", grade: "A", harga: 18000, qty: 3, maxQty: 20, image: "🧅" },
];

// ─── Orders ──────────────────────────────────────────────────────────────────
export const mockOrders = [
  { id: "NC-8421", product: "Cabai Merah Grade A", grade: "A", qty: 10, total: 280000, status: "selesai", date: "28 Apr 2026", resi: "JNE-1234567890", image: "🌶️" },
  { id: "NC-8398", product: "Tomat Segar Grade B", grade: "B", qty: 20, total: 250000, status: "dikirim", date: "30 Apr 2026", resi: "SiCepat-9876543", image: "🍅" },
  { id: "NC-8375", product: "Bawang Daun Grade A", grade: "A", qty: 8, total: 144000, status: "diproses", date: "1 Mei 2026", resi: null, image: "🧅" },
  { id: "NC-8350", product: "Kentang Granola Grade A", grade: "A", qty: 15, total: 142500, status: "menunggu", date: "5 Mei 2026", resi: null, image: "🥔" },
];

// ─── Anomaly subsidi ──────────────────────────────────────────────────────────
export const anomaliSubsidi = [
  { id: "AN-001", petani: "Pak Ahmad", nik: "3301XX****", lahanGPS: "2.1 Ha", lahanRDKK: "0.8 Ha", komoditas: "Padi", confidence: 94, status: "baru", catatan: "" },
  { id: "AN-002", petani: "Bu Ratna", nik: "3302XX****", lahanGPS: "3.4 Ha", lahanRDKK: "1.0 Ha", komoditas: "Cabai", confidence: 87, status: "ditinjau", catatan: "Lahan milik orang tua" },
  { id: "AN-003", petani: "Pak Hendra", nik: "3204XX****", lahanGPS: "1.8 Ha", lahanRDKK: "2.0 Ha", komoditas: "Jagung", confidence: 72, status: "dilaporkan", catatan: "" },
];

// ─── B2B Standing Orders ──────────────────────────────────────────────────────
export const standingOrders: {
  id: string; komoditas: string; qtyPerPengiriman: number; frekuensi: string;
  mulai: string; durasi: string; hargaMaks: number; status: string; catatan: string;
}[] = [
  { id: "SO-001", komoditas: "Cabai Merah", qtyPerPengiriman: 500, frekuensi: "Mingguan", mulai: "1 Mei 2026", durasi: "3 bulan", hargaMaks: 30000, status: "aktif", catatan: "Grade A, dikemas per 10 kg" },
  { id: "SO-002", komoditas: "Tomat", qtyPerPengiriman: 1000, frekuensi: "2x Seminggu", mulai: "15 Apr 2026", durasi: "6 bulan", hargaMaks: 15000, status: "aktif", catatan: "" },
  { id: "SO-003", komoditas: "Bawang Daun", qtyPerPengiriman: 200, frekuensi: "Bulanan", mulai: "1 Mar 2026", durasi: "1 tahun", hargaMaks: 20000, status: "dijeda", catatan: "Sedang negosiasi harga" },
];

// ─── Notifications ────────────────────────────────────────────────────────────
export const allNotifications = [
  { id: "n1", type: "iot" as const, title: "Anomali Sensor pH", desc: "pH lahan Lembang turun ke 4.8 — di bawah batas normal.", time: "5 mnt lalu", read: false, href: "/lahan/l1/sensor" },
  { id: "n2", type: "pesanan" as const, title: "Pesanan #NC-8398 Dikirim", desc: "Pesananmu sudah dalam perjalanan. Nomor resi: SiCepat-9876543.", time: "30 mnt lalu", read: false, href: "/pesanan" },
  { id: "n3", type: "kredit" as const, title: "Skor ACS Naik", desc: "Skor kredit alternatifmu naik 18 poin menjadi 724.", time: "2 jam lalu", read: true, href: "/kredit-skor" },
  { id: "n4", type: "sistem" as const, title: "Verifikasi Akun Berhasil", desc: "Akunmu telah diverifikasi oleh tim NusaCulta.", time: "1 hari lalu", read: true, href: "/profil" },
  { id: "n5", type: "iot" as const, title: "Panen Optimal Terdeteksi", desc: "AI memprediksi panen optimal dalam 3 hari untuk Cabai Merah.", time: "1 hari lalu", read: true, href: "/prediksi-panen" },
];
