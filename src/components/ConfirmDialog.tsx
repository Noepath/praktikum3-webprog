"use client";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  loading?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Delete",
  loading = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-sm mx-4 glass-strong rounded-3xl animate-scale-in p-6">
        {/* Warning Icon */}
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-500/10">
          <svg
            className="w-6 h-6 text-danger"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h3 className="text-center text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-center text-sm text-muted-light mb-6">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 glass-input rounded-xl text-muted-light hover:text-foreground text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-danger/80 hover:bg-danger text-white rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 border border-red-400/20 shadow-lg shadow-red-500/10"
          >
            {loading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
