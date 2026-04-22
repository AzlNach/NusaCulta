"use client";

import { useState, useCallback, useRef } from "react";

interface GradeResult {
  grade: "A" | "B" | "C";
  confidence: number;
  details: {
    ukuran: string;
    warna: string;
    cacat: string;
  };
}

const gradeResults: Record<string, GradeResult> = {
  A: {
    grade: "A",
    confidence: 94.7,
    details: {
      ukuran: "Sesuai standar (8-12 cm)",
      warna: "Merah merata, cerah",
      cacat: "Tidak ditemukan cacat",
    },
  },
  B: {
    grade: "B",
    confidence: 87.3,
    details: {
      ukuran: "Sedikit di bawah standar (6-8 cm)",
      warna: "Warna merata, sedikit pucat",
      cacat: "Lecet minor < 5%",
    },
  },
  C: {
    grade: "C",
    confidence: 78.1,
    details: {
      ukuran: "Di bawah standar (< 6 cm)",
      warna: "Tidak merata",
      cacat: "Cacat permukaan > 10%",
    },
  },
};

const gradeColors: Record<string, { bg: string; text: string; border: string }> = {
  A: { bg: "bg-[#52B788]/10", text: "text-[#2D6A4F]", border: "border-[#52B788]" },
  B: { bg: "bg-[#F4A261]/10", text: "text-[#F4A261]", border: "border-[#F4A261]" },
  C: { bg: "bg-[#E63946]/10", text: "text-[#E63946]", border: "border-[#E63946]" },
};

export default function AIGradingUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    setFileName(file.name);
    setResult(null);
    setIsProcessing(true);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Simulate AI processing (2 seconds)
    setTimeout(() => {
      const grades = ["A", "B", "C"];
      const randomGrade = grades[Math.floor(Math.random() * 2)]; // Favor A/B
      setResult(gradeResults[randomGrade]);
      setIsProcessing(false);
    }, 2000);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        processFile(file);
      }
    },
    [processFile]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  const reset = () => {
    setResult(null);
    setFileName("");
    setPreviewUrl("");
    setIsProcessing(false);
  };

  return (
    <div
      className="bg-white rounded-[12px] p-6 animate-fade-in-up"
      style={{
        boxShadow: "0 4px 24px rgba(45,106,79,0.12)",
        animationDelay: "300ms",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2
            className="text-lg font-semibold text-[#1A1A2E]"
            style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
          >
            AI Quality Grading
          </h2>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Upload foto hasil panen untuk grading otomatis
          </p>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center">
          <span className="text-base">🤖</span>
        </div>
      </div>

      {!result && !isProcessing && (
        <div
          className={`border-2 border-dashed rounded-[12px] p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-[#52B788] bg-[#52B788]/5"
              : "border-gray-200 hover:border-[#52B788]/50 hover:bg-[#52B788]/[0.02]"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#2D6A4F]/8 flex items-center justify-center">
            <svg
              className="w-7 h-7 text-[#2D6A4F]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-[#1A1A2E]">
            Drag & drop foto panen di sini
          </p>
          <p className="text-xs text-[#6B7280] mt-1">
            atau klik untuk pilih file — PNG, JPG hingga 10MB
          </p>
        </div>
      )}

      {/* Processing spinner */}
      {isProcessing && (
        <div className="py-10 text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-16 h-16 rounded-full object-cover opacity-50"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="animate-spin-slow w-16 h-16"
                viewBox="0 0 50 50"
              >
                <circle
                  cx="25"
                  cy="25"
                  r="22"
                  fill="none"
                  stroke="#2D6A4F"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="80 60"
                />
              </svg>
            </div>
          </div>
          <p className="text-sm font-medium text-[#1A1A2E]">
            Menganalisis kualitas...
          </p>
          <p className="text-xs text-[#6B7280] mt-1">{fileName}</p>
        </div>
      )}

      {/* Result */}
      {result && !isProcessing && (
        <div className="space-y-4">
          {/* Grade badge */}
          <div className="flex items-center gap-4">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Hasil panen"
                className="w-20 h-20 rounded-[12px] object-cover border-2"
                style={{ borderColor: "#e5e7eb" }}
              />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-xl font-bold border-2 ${gradeColors[result.grade].bg} ${gradeColors[result.grade].text} ${gradeColors[result.grade].border}`}
                  style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
                >
                  {result.grade}
                </span>
                <div>
                  <p
                    className="text-base font-semibold text-[#1A1A2E]"
                    style={{
                      fontFamily: "var(--font-sora), Sora, sans-serif",
                    }}
                  >
                    Grade {result.grade}
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    Confidence: {result.confidence}%
                  </p>
                </div>
              </div>
              {/* Confidence bar */}
              <div className="w-full h-1.5 rounded-full bg-gray-100 mt-2">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${result.confidence}%`,
                    background:
                      result.grade === "A"
                        ? "#52B788"
                        : result.grade === "B"
                          ? "#F4A261"
                          : "#E63946",
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Detail breakdown */}
          <div className="space-y-2">
            {Object.entries(result.details).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50/80"
              >
                <span className="text-xs text-[#6B7280] capitalize font-medium">
                  {key}
                </span>
                <span className="text-xs text-[#1A1A2E] font-medium">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={reset}
            className="w-full py-2.5 rounded-[12px] text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ background: "#2D6A4F" }}
          >
            Upload Foto Lain
          </button>
        </div>
      )}
    </div>
  );
}
