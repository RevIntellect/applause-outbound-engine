export default function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 85 ? "text-primary" : score >= 70 ? "text-secondary" : "text-on-surface-variant";
  return (
    <span className={`text-2xl font-bold font-sans ${color}`}>
      {score}
    </span>
  );
}
