// ─── NusaCulta Mock Data ─────────────────────────────────────────────────────

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
