"use client";

import { usePathname } from "next/navigation";

const stages = [
  { label: "Discovery", slug: "research", icon: "search" },
  { label: "ICP Build", slug: "enrichment", icon: "person_search" },
  { label: "Lead Research", slug: "sequencing", icon: "leaderboard" },
  { label: "Campaign", slug: "execution", icon: "mail" },
  { label: "Export", slug: "export", icon: "download" },
];

const stageOrder = stages.map((s) => s.slug);

type StageStatus = "completed" | "active" | "upcoming";

function getStageStatus(
  stageSlug: string,
  activeStage: string | null,
  approvedStages: string[]
): StageStatus {
  if (approvedStages.includes(stageSlug)) return "completed";
  if (stageSlug === activeStage) return "active";
  return "upcoming";
}

interface StageProgressProps {
  approvedStages?: string[];
}

export default function StageProgress({ approvedStages = [] }: StageProgressProps) {
  const pathname = usePathname();
  const stageMatch = pathname.match(
    /\/campaigns\/[^/]+\/(research|enrichment|sequencing|execution|export)/
  );
  const activeStage = stageMatch ? stageMatch[1] : null;

  if (!activeStage) return null;

  return (
    <div className="flex items-center justify-center gap-0 py-4 px-6">
      {stages.map((stage, i) => {
        const status = getStageStatus(stage.slug, activeStage, approvedStages);

        return (
          <div key={stage.slug} className="flex items-center">
            {/* Node */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  status === "completed"
                    ? "bg-tertiary-fixed text-primary"
                    : status === "active"
                      ? "bg-primary text-on-primary shadow-lift"
                      : "bg-surface-container-high text-outline"
                }`}
              >
                {status === "completed" ? (
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                    check
                  </span>
                ) : (
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                    {stage.icon}
                  </span>
                )}
              </div>
              <span
                className={`text-[0.6875rem] font-medium tracking-[0.02em] ${
                  status === "active"
                    ? "text-primary"
                    : status === "completed"
                      ? "text-on-surface"
                      : "text-outline"
                }`}
              >
                {stage.label}
              </span>
            </div>

            {/* Connector line */}
            {i < stages.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-2 mb-5 rounded-full ${
                  approvedStages.includes(stage.slug)
                    ? "bg-tertiary-fixed"
                    : "bg-surface-variant"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
