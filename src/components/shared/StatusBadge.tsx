import type { Priority } from "@/lib/types";

const priorityStyles: Record<Priority, string> = {
  high: "bg-primary/15 text-primary",
  medium: "bg-secondary/15 text-secondary",
  low: "bg-outline/15 text-outline",
};

interface StatusBadgeProps {
  priority: Priority;
  label?: string;
}

export default function StatusBadge({ priority, label }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[0.6875rem] font-medium tracking-[0.05em] uppercase ${priorityStyles[priority]}`}
    >
      {label ?? priority}
    </span>
  );
}
