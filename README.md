<div align="center">
  <img src="https://via.placeholder.com/150/2D6A4F/FFFFFF?text=NC" alt="NusaCulta Logo" width="120" style="border-radius: 20px;"/>
  <br/>
  <h1>🌾 NusaCulta 🌾</h1>
  <p><strong>End-to-End Agri-Hub Direct-to-Consumer Platform</strong></p>

  <p>
    <a href="#tech-stack"><img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js"></a>
    <a href="#tech-stack"><img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React"></a>
    <a href="#tech-stack"><img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css" alt="Tailwind"></a>
    <a href="#tech-stack"><img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript" alt="TypeScript"></a>
    <a href="#tech-stack"><img src="https://img.shields.io/badge/Azure-Cloud-0089D6?logo=microsoft-azure" alt="Azure"></a>
  </p>
</div>

<br/>

> **NusaCulta** adalah platform digital revolusioner yang menghubungkan petani langsung ke konsumen (D2C). Dilengkapi dengan IoT monitoring lahan, AI Quality Grading hasil panen, Dynamic Pricing berbasis pasar, dan *Alternative Credit Scoring (ACS)* sesuai POJK 29/2024 untuk membuka akses pembiayaan bagi petani *unbankable*.

---

## 🚀 Fitur Unggulan (3 Pilar Utama)

### 📡 1. IoT & AI Intelligence
- **IoT Monitoring:** Sensor real-time untuk memantau kelembapan, pH, suhu, dan nutrisi lahan (N).
- **AI Harvest Prediction:** Prediksi panen akurat 30 hari ke depan untuk mengoptimalkan suplai.
- **AI Quality Grading:** Petani cukup mengambil foto hasil panen, Azure Custom Vision akan secara otomatis menilai Grade (A/B/C) berdasarkan warna, ukuran, dan kualitas.

### 🛒 2. Direct-to-Consumer Marketplace
- **Dynamic Pricing:** Harga yang transparan dan *fair*, diupdate real-time berdasarkan tren *supply-demand* dari sentra pasar.
- **Anti Food-Loss:** Dengan memotong rantai pasok tengkulak panjang, NusaCulta berhasil menurunkan susut pangan hingga 28% dan meningkatkan **Farmer Share +34%**.
- **Fitur e-Commerce:** Pembelian Group-Buy (Geo-cluster), keranjang belanja cerdas, dan visualisasi rute logistik yang optimal.

### 💳 3. Alternative Credit Scoring (ACS)
- **POJK 29/2024 Compliant:** Membaca data produktivitas lahan IoT, histori panen, dan pergerakan transaksi sebagai validasi skor alternatif.
- **Fintech Integration:** Membantu ribuan petani *unbankable* di pelosok berkesempatan mendapat pembiayaan (P2P / Microfinance) dengan persetujuan cepat.
- **Subsidi Validation:** Memastikan kelayakan subsidi silang menggunakan e-RDKK anomali detection.

---

## 💻 Halaman Utama Aplikasi

Aplikasi dibangun *mobile-responsive first* untuk kemudahan akses bagi para petani di lapangan dan juga fungsionalitas bagi manajemen:

1. 🏠 **Landing Page (`/`)** — Nilai tambah NusaCulta, testimoni, partner, animasi stats, dan visualisasi ekosistem.
2. 👨‍🌾 **Farmer Dashboard (`/dashboard`)** — Kontrol pusat petani (IoT real-time, prediksi panen dengan Recharts, menu AI Grading Upload).
3. 🛍️ **Marketplace D2C (`/marketplace`)** — Etalase komoditas, filter sidebar (grade, wilayah asal), live pricing ticker, dan integrasi cart. 
4. 📈 **Pembiayaan / Scoring (`/pembiayaan`)** — Indikator ACS Score (Radar chart, Gauge diagram), kelayakan pengajuan sesuai rilis OJK, & track pencairan dana.
5. 🛡️ **Admin Analytics (`/admin`)** — Panel Dark Mode untuk *helicopter view*: Heatmap suplai nasional, grafik tren GMV vs Pasokan, validasi e-RDKK, dan optimasi Logistik.

---

## 🛠️ Tech Stack

**Frontend Framework & Styling**
- [Next.js 14](https://nextjs.org/) (App Router & React Server Components)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (dengan utilitas kustom untuk Glassmorphism & Micro-animations)
  
**Data Visualization & Map**
- [Recharts](https://recharts.org/) (Bar, Line, Area, Radar)
- [React-Leaflet](https://react-leaflet.js.org/) (Geo-clustering)

**Backend, AI & Cloud Infrastructure (Architecture)**
- Node.js & Express API
- Azure Cosmos DB (Distributed Database)
- Azure IoT Hub (Sensor Telemetry)
- Azure Custom Vision (AI Image Grading) & Azure ML (Pricing/ACS Modeling)

---

## 🏃‍♂️ Getting Started

Proyek ini telah dikonfigurasi menggunakan `npm`. Ikuti langkah di bawah untuk menjalankan server *development*.

1. **Clone repositori**
   ```bash
   git clone https://github.com/AzlNach/NusaCulta.git
   cd nusaculta-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   *(termasuk react-leaflet, recharts, dll)*

3. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

4. **Buka Browser**
   Buka URL `http://localhost:3000` untuk melihat hasilnya.

---

## 🎨 Konsep Desain (UI/UX)
- **Tema:** *Earthy-Premium SaaS*. Mengedepankan kesan teknologi tinggi namun tetap menapak pada elemen agrikultur.
- **Palet Warna:** *Forest Green* (`#2D6A4F`), *Soft Green* (`#52B788`) untuk stabilitas, dengan aksen *Harvest Amber* (`#F4A261`) untuk elemen CTA dan notifikasi kritis (`#E63946`).
- **Tipografi:** "DM Sans" untuk readibilitas data numerik padat (Sensor, harga, stock), dan "Sora" untuk heading yang berkarakter kuat.

---

<div align="center">
<p>Dibuat dengan ❤️ untuk ketahanan pangan masa depan Indonesia.</p>
</div>
