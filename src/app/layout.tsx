import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NusaCulta — Farmer Dashboard",
  description:
    "NusaCulta End-to-End Agri-Hub: IoT monitoring, AI Quality Grading, Dynamic Pricing, dan Alternative Credit Scoring untuk petani Indonesia.",
  other: {
    "dicoding:email": "azelpandy2@gmail.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${dmSans.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
