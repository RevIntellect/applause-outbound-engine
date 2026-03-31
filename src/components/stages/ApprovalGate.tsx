"use client";

interface ApprovalGateProps {
  stageName: string;
  onApprove: () => void;
  onRerun?: () => void;
  approving?: boolean;
  running?: boolean;
  disabled?: boolean;
}

export default function ApprovalGate({
  stageName,
  onApprove,
  onRerun,
  approving = false,
  running = false,
  disabled = false,
}: ApprovalGateProps) {
  return (
    <div className="flex items-center justify-between bg-surface-container-lowest rounded-lg px-6 py-4 shadow-ghost">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant">
          Stage Gate
        </span>
        <span className="text-sm text-on-surface">
          {stageName} requires approval before advancing.
        </span>
      </div>
      <div className="flex items-center gap-3">
        {onRerun && (
          <button
            type="button"
            onClick={onRerun}
            disabled={running || approving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary bg-surface-container-highest hover:bg-surface-container-high transition-colors disabled:opacity-50"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 16 }}
            >
              refresh
            </span>
            {running ? "Running..." : "Rerun Agent"}
          </button>
        )}
        <button
          type="button"
          onClick={onApprove}
          disabled={disabled || approving}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-on-primary transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
          style={{ background: "linear-gradient(135deg, #00579f, #2d70bb)" }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 16 }}
          >
            check_circle
          </span>
          {approving ? "Approving..." : `Approve ${stageName}`}
        </button>
      </div>
    </div>
  );
}
