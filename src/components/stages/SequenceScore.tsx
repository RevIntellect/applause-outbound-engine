interface SequenceScoreProps {
  score: number;
  qualityAssessment: string;
  aiSuggestion?: string;
  approvedLeadsCount: number;
}

export default function SequenceScore({
  score,
  qualityAssessment,
  aiSuggestion,
  approvedLeadsCount,
}: SequenceScoreProps) {
  return (
    <div className="space-y-4">
      {/* Score card */}
      <div className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost">
        <span className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant">
          Sequence Score
        </span>
        <div className="font-sans text-[3.5rem] font-bold tracking-[-0.02em] text-on-surface mt-1">
          {score}%
        </div>
        <p className="text-[0.8125rem] text-on-surface-variant mt-1">
          {qualityAssessment}
        </p>
      </div>

      {/* Approved leads */}
      <div className="bg-surface-container-lowest rounded-lg p-5 shadow-ghost">
        <span className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant">
          Approved Leads
        </span>
        <div className="font-sans text-[1.5rem] font-bold text-on-surface mt-1">
          {approvedLeadsCount}
        </div>
        <p className="text-[0.75rem] text-outline mt-0.5">
          leads will receive this sequence
        </p>
      </div>

      {/* AI suggestion */}
      {aiSuggestion && (
        <div className="bg-surface-container-low rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontSize: 18 }}
            >
              auto_awesome
            </span>
            <span className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-primary">
              AI Optimizer
            </span>
          </div>
          <p className="text-[0.8125rem] text-on-surface-variant leading-relaxed">
            {aiSuggestion}
          </p>
        </div>
      )}

      {/* Execution settings */}
      <div className="bg-surface-container-lowest rounded-lg p-5 shadow-ghost">
        <span className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant">
          Execution Settings
        </span>
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm text-on-surface">Auto-pause on reply</span>
          <div className="w-10 h-6 rounded-full bg-primary flex items-center px-0.5">
            <div className="w-5 h-5 rounded-full bg-on-primary ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
