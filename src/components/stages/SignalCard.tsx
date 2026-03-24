import StatusBadge from "@/components/shared/StatusBadge";
import type { SignalCard as SignalCardType } from "@/lib/types";

interface SignalCardProps {
  signal: SignalCardType;
}

export default function SignalCard({ signal }: SignalCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-lg p-5 shadow-ghost hover:shadow-lift transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-sans text-[1rem] font-semibold text-on-surface">
            {signal.company}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[0.75rem] text-on-surface-variant">
              {signal.industry}
            </span>
            <span className="text-outline">·</span>
            <span className="text-[0.75rem] text-outline">
              {signal.employeeCount} employees
            </span>
          </div>
        </div>
        <StatusBadge priority={signal.priority} />
      </div>

      {/* Signal quote */}
      <div className="bg-surface-container-low rounded-md px-4 py-3 mb-3">
        <p className="text-[0.8125rem] text-on-surface-variant leading-relaxed italic">
          &ldquo;{signal.signalQuote}&rdquo;
        </p>
      </div>

      {/* Target personas */}
      <div className="flex flex-wrap gap-1.5">
        {signal.targetPersonas.map((persona) => (
          <span
            key={persona}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container text-[0.6875rem] font-medium text-on-surface-variant"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 14 }}
            >
              person
            </span>
            {persona}
          </span>
        ))}
      </div>
    </div>
  );
}
