import type { BuyerRole } from "@/data/types";

const roleConfig: Record<BuyerRole, { label: string; bg: string; text: string }> = {
  "economic-buyer": { label: "Economic Buyer", bg: "bg-primary/10", text: "text-primary" },
  "technical-buyer": { label: "Technical Buyer", bg: "bg-secondary/20", text: "text-secondary" },
  champion: { label: "Champion", bg: "bg-tertiary-fixed", text: "text-tertiary" },
  influencer: { label: "Influencer", bg: "bg-surface-container-high", text: "text-on-surface-variant" },
};

export default function RoleBadge({ role }: { role: BuyerRole }) {
  const config = roleConfig[role];
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-md text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
