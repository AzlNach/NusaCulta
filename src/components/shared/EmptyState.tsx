interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ icon = "📭", title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-base font-semibold text-[#1A1A2E] mb-1">{title}</h3>
      {description && <p className="text-sm text-[#6B7280] max-w-xs">{description}</p>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "#2D6A4F" }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
