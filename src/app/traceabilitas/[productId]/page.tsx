import Link from "next/link";

const mockTrace = {
  id: "p1",
  name: "Cabai Merah Grade A",
  farmer: "Sugiono Hartono",
  location: "Lembang, Jawa Barat",
  grade: "A",
  image: "🌶️",
  harvestDate: "30 April 2026",
  sertifikasi: ["Organik LSPO", "GAP Kementan", "ISO 22000"],
  iotSummary: { suhu: "22°C", kelembaban: "78%", pH: "6.5", cahaya: "2.4k lux" },
  timeline: [
    { date: "30 Apr", event: "Panen", note: "Dipanen manual pukul 06:00 WIB. Suhu 22°C, kelembaban 78%.", icon: "🌾" },
    { date: "30 Apr", event: "AI Grading", note: "Computer vision: 94% Grade A, 6% Grade B. Confidence 97%.", icon: "🤖" },
    { date: "1 Mei", event: "Sortasi & Pengemasan", note: "Dikemas 10 kg/karung, diberi label QR traceability.", icon: "📦" },
    { date: "1 Mei", event: "Pengiriman Cold Chain", note: "Dikirim menggunakan kendaraan cold chain 8°C.", icon: "🚚" },
    { date: "2 Mei", event: "Tiba di Gudang Jakarta", note: "QC lolos, suhu tetap terjaga. Ready-to-sell.", icon: "🏭" },
    { date: "2 Mei", event: "Tersedia di Marketplace", note: "Listing aktif di NusaCulta marketplace.", icon: "🛒" },
  ],
  distribution: [
    { buyer: "Hotel Grand Hyatt Jakarta", qty: "50 kg", date: "2 Mei 2026" },
    { buyer: "Restoran Padang Sederhana (chain)", qty: "30 kg", date: "3 Mei 2026" },
  ],
};

export default function TraceabilityPage({ params }: { params: { productId: string } }) {
  const trace = { ...mockTrace, id: params.productId };

  return (
    <div className="min-h-screen bg-[#F8F4EF]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="font-black text-[#2D6A4F] text-lg" style={{ fontFamily: "var(--font-sora)" }}>NusaCulta</span>
        </Link>
        <span className="text-xs text-[#6B7280]">Halaman Publik Traceability</span>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Hero */}
        <div className="bg-white rounded-[20px] p-6 flex items-start gap-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div className="w-20 h-20 rounded-[14px] bg-gradient-to-br from-[#fef9c3] to-[#dcfce7] flex items-center justify-center text-5xl shrink-0">{trace.image}</div>
          <div>
            <h1 className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-sora)" }}>{trace.name}</h1>
            <p className="text-sm text-[#6B7280] mt-1">👨‍🌾 {trace.farmer} · 📍 {trace.location}</p>
            <p className="text-xs text-[#9ca3af] mt-1">Dipanen: {trace.harvestDate}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {trace.sertifikasi.map((s) => (
                <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#2D6A4F] font-medium">✓ {s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* IoT Kondisi Panen */}
        <div className="bg-white rounded-[20px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <h2 className="text-base font-bold text-[#1A1A2E] mb-4">📡 Kondisi IoT saat Panen</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(trace.iotSummary).map(([key, val]) => (
              <div key={key} className="bg-[#F8F4EF] rounded-[10px] p-3 text-center">
                <p className="text-xs text-[#6B7280] capitalize">{key}</p>
                <p className="text-lg font-bold text-[#2D6A4F] mt-0.5">{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Grade Certificate */}
        <div className="bg-white rounded-[20px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <h2 className="text-base font-bold text-[#1A1A2E] mb-3">🏅 Sertifikat AI Grade</h2>
          <div className="flex items-center gap-4 p-4 rounded-[12px] bg-gradient-to-r from-[#dcfce7] to-[#f0fdf4] border border-[#86efac]">
            <div className="w-16 h-16 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white text-2xl font-black shrink-0">A</div>
            <div>
              <p className="font-bold text-[#2D6A4F] text-lg">Grade A — Premium</p>
              <p className="text-xs text-[#6B7280] mt-0.5">Diverifikasi oleh NusaCulta AI Vision · Confidence: 97%</p>
              <p className="text-xs text-[#9ca3af] mt-0.5">94% produk batch ini lulus Grade A</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-[20px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <h2 className="text-base font-bold text-[#1A1A2E] mb-4">🔗 Riwayat Rantai Pasok</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100" />
            <div className="space-y-4">
              {trace.timeline.map((t, i) => (
                <div key={i} className="flex gap-4 items-start relative">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-[#2D6A4F] flex items-center justify-center text-sm shrink-0 relative z-10">{t.icon}</div>
                  <div className="flex-1 pb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#1A1A2E]">{t.event}</span>
                      <span className="text-xs text-[#9ca3af]">{t.date}</span>
                    </div>
                    <p className="text-xs text-[#6B7280] mt-0.5">{t.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Distribution */}
        <div className="bg-white rounded-[20px] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <h2 className="text-base font-bold text-[#1A1A2E] mb-4">📤 Distribusi Produk</h2>
          <div className="space-y-3">
            {trace.distribution.map((d, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#1A1A2E]">{d.buyer}</p>
                  <p className="text-xs text-[#9ca3af]">{d.date}</p>
                </div>
                <span className="text-sm font-bold text-[#2D6A4F]">{d.qty}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map placeholder */}
        <div className="bg-white rounded-[20px] overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div className="px-5 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-[#1A1A2E]">🗺️ Lokasi Lahan</p>
          </div>
          <div className="h-48 bg-gradient-to-br from-[#e0f2fe] to-[#dcfce7] flex flex-col items-center justify-center gap-2 text-[#6B7280]">
            <span className="text-4xl">🗺️</span>
            <p className="text-sm">Lembang, Jawa Barat</p>
            <p className="text-xs">Peta interaktif tersedia di environment produksi (React-Leaflet).</p>
          </div>
        </div>

        <p className="text-center text-xs text-[#9ca3af] pb-4">
          Data traceability ini diterbitkan dan diverifikasi oleh <span className="text-[#2D6A4F] font-semibold">NusaCulta</span>. QR ID: {trace.id}
        </p>
      </main>
    </div>
  );
}
