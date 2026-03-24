"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCampaign, updateCampaign, approveStage } from "@/lib/store";
import type { Campaign, LeadResearchOutput, ScoredLead } from "@/lib/types";
import LeadTable from "@/components/stages/LeadTable";
import StatCard from "@/components/shared/StatCard";
import ApprovalGate from "@/components/stages/ApprovalGate";

const roleLabels: Record<string, string> = {
  "economic-buyer": "Economic Buyer",
  "technical-buyer": "Technical Buyer",
  champion: "Champion",
  influencer: "Influencer",
};

function buildScoredLeads(icpLeads: import("@/lib/types").LeadProfile[]): ScoredLead[] {
  return icpLeads.map((lead) => ({
    ...lead,
    painToPersonMapping: lead.painMapping,
  }));
}

export default function SequencingPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [leads, setLeads] = useState<ScoredLead[]>([]);
  const [running, setRunning] = useState(false);
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    const c = getCampaign(params.id);
    setCampaign(c);
    if (c?.leadResearch) {
      setLeads(c.leadResearch.leads);
    }
  }, [params.id]);

  const runAgent = useCallback(() => {
    if (!campaign?.icpBuilder) return;
    setRunning(true);
    setLeads([]);

    const scored = buildScoredLeads(campaign.icpBuilder.leads);

    scored.forEach((lead, i) => {
      setTimeout(() => {
        setLeads((prev) => [...prev, lead]);
      }, 600 + i * 350);
    });

    setTimeout(() => {
      setRunning(false);
      const output: LeadResearchOutput = { leads: scored };
      updateCampaign(params.id, { leadResearch: output });
      setCampaign((prev) => (prev ? { ...prev, leadResearch: output } : prev));
    }, 600 + scored.length * 350 + 500);
  }, [campaign, params.id]);

  useEffect(() => {
    if (campaign && campaign.icpBuilder && !campaign.leadResearch && !running) {
      runAgent();
    }
  }, [campaign, running, runAgent]);

  function handleApprove() {
    setApproving(true);
    approveStage(params.id);
    setTimeout(() => {
      router.push(`/campaigns/${params.id}/execution`);
    }, 400);
  }

  const avgScore =
    leads.length > 0
      ? Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length)
      : 0;

  const roleCounts = leads.reduce(
    (acc, l) => {
      acc[l.role] = (acc[l.role] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-sans text-[2.25rem] font-bold tracking-[-0.02em] text-on-surface">
          Lead Research
        </h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Scored leads with role classification and pain mapping for{" "}
          <span className="font-medium text-on-surface">
            {campaign?.name ?? "..."}
          </span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Total Leads"
          value={`${leads.length}`}
          icon="people"
        />
        <StatCard
          label="Avg Lead Score"
          value={leads.length > 0 ? `${avgScore}` : "--"}
          icon="leaderboard"
        />
        <StatCard
          label="High Intent (>80)"
          value={`${leads.filter((l) => l.score > 80).length}`}
          icon="trending_up"
        />
        <StatCard
          label="Role Spread"
          value={`${Object.keys(roleCounts).length} types`}
          icon="category"
          detail={Object.entries(roleCounts)
            .map(([r, c]) => `${roleLabels[r] ?? r}: ${c}`)
            .join(", ")}
        />
      </div>

      {/* Pain-to-person mapping cards */}
      {leads.length > 0 && !running && (
        <div className="space-y-3">
          <h2 className="font-sans text-[1rem] font-semibold text-on-surface">
            Pain-to-Person Mapping
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {leads
              .filter((l) => l.score > 75)
              .map((lead) => (
                <div
                  key={lead.id}
                  className="bg-surface-container-lowest rounded-lg p-4 shadow-ghost"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
                      <span className="text-[0.6rem] font-bold text-primary">
                        {lead.score}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-on-surface">
                        {lead.name}
                      </div>
                      <div className="text-[0.75rem] text-on-surface-variant">
                        {lead.title}, {lead.company}
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-low rounded-md px-3 py-2">
                    <p className="text-[0.8125rem] text-on-surface-variant leading-relaxed">
                      {lead.painToPersonMapping}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Lead table */}
      {running && leads.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-lg p-12 shadow-ghost flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
          <p className="text-sm text-on-surface-variant">
            Researching and scoring leads...
          </p>
        </div>
      ) : (
        leads.length > 0 && <LeadTable leads={leads} />
      )}

      {/* Approval gate */}
      {!running && leads.length > 0 && (
        <ApprovalGate
          stageName="Lead Research"
          onApprove={handleApprove}
          onRerun={runAgent}
          approving={approving}
          disabled={leads.length === 0}
        />
      )}
    </div>
  );
}
