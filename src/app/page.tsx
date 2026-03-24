"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCampaigns } from "@/lib/store";
import type { Campaign, StageSlug } from "@/lib/types";

const stageLabels: Record<StageSlug, string> = {
  research: "Discovery",
  enrichment: "ICP Builder",
  sequencing: "Lead Research",
  execution: "Campaign",
  export: "Export",
};

const stageIcons: Record<StageSlug, string> = {
  research: "search",
  enrichment: "person_search",
  sequencing: "leaderboard",
  execution: "mail",
  export: "download",
};

function completedStageCount(campaign: Campaign): number {
  return Object.values(campaign.stages).filter((s) => s === "approved").length;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    setCampaigns(getCampaigns());
  }, []);

  return (
    <div className="max-w-[900px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-sans text-[2.25rem] font-bold tracking-[-0.02em] text-on-surface">
            Dashboard
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Recent pipeline executions across your campaigns.
          </p>
        </div>
        <Link
          href="/campaigns/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-on-primary transition-transform hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg, #00579f, #2d70bb)" }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            add_circle
          </span>
          New Campaign
        </Link>
      </div>

      {/* Recent pipeline runs */}
      {campaigns.length > 0 ? (
        <div className="space-y-3">
          {campaigns.map((campaign) => {
            const completed = completedStageCount(campaign);
            const progress = Math.round((completed / 5) * 100);

            return (
              <Link
                key={campaign.id}
                href={`/campaigns/${campaign.id}`}
                className="block bg-surface-container-lowest rounded-lg p-5 shadow-ghost hover:shadow-lift transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-primary"
                        style={{ fontSize: 20 }}
                      >
                        {stageIcons[campaign.currentStage]}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-on-surface">
                        {campaign.name}
                      </h3>
                      <p className="text-[0.75rem] text-on-surface-variant">
                        {campaign.targetAudience}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[0.75rem] text-outline">
                      {timeAgo(campaign.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${Math.max(progress, 10)}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-surface-container text-[0.6875rem] font-medium text-on-surface-variant">
                      {stageLabels[campaign.currentStage]}
                    </span>
                    <span className="text-[0.6875rem] text-outline">
                      {completed}/5
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-lg p-12 shadow-ghost">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center mb-4">
              <span
                className="material-symbols-outlined text-outline"
                style={{ fontSize: 28 }}
              >
                campaign
              </span>
            </div>
            <p className="text-on-surface-variant text-sm mb-1">
              No pipeline runs yet.
            </p>
            <p className="text-outline text-[0.8125rem] mb-6">
              Create your first campaign to start the prospecting pipeline.
            </p>
            <Link
              href="/campaigns/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-on-primary transition-transform hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #00579f, #2d70bb)" }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 18 }}
              >
                add_circle
              </span>
              New Campaign
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
