interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  detail?: string;
}

export default function StatCard({ label, value, icon, detail }: StatCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-lg p-5 shadow-ghost">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant">
          {label}
        </span>
        <span
          className="material-symbols-outlined text-outline"
          style={{ fontSize: 18 }}
        >
          {icon}
        </span>
      </div>
      <div className="font-sans text-[1.5rem] font-bold text-on-surface">
        {value}
      </div>
      {detail && (
        <p className="text-[0.75rem] text-outline mt-1">{detail}</p>
      )}
    </div>
  );
}
