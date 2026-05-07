"use client";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Ya, Lanjutkan",
  cancelLabel = "Batal",
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-[16px] shadow-2xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xl"
            style={{ background: danger ? "#FEE2E2" : "#F3F4F6" }}
          >
            {danger ? "⚠️" : "❓"}
          </div>
          <div>
            <h3 className="font-bold text-[#1A1A2E] text-base">{title}</h3>
            <p className="text-sm text-[#6B7280] mt-1">{message}</p>
          </div>
        </div>
        <div className="flex gap-2 justify-end pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-[10px] text-sm font-medium text-[#6B7280] bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-[10px] text-sm font-medium text-white transition-colors"
            style={{ background: danger ? "#E63946" : "#2D6A4F" }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
