"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCampaign, updateCampaign, approveStage } from "@/lib/store";
import type { Campaign, IcpBuilderOutput, LeadProfile } from "@/lib/types";
import LeadTable from "@/components/stages/LeadTable";
import StatCard from "@/components/shared/StatCard";
import ApprovalGate from "@/components/stages/ApprovalGate";

const mockLeads: LeadProfile[] = [
  {
    id: "lead_1",
    name: "Sarah Chen",
    title: "VP of Engineering",
    company: "NovaPay Solutions",
    score: 94,
    role: "economic-buyer",
    enrichmentSignals: ["LinkedIn", "Crunchbase", "Email Verified", "Intent Data"],
    status: "enriched",
    painMapping: "Mobile transaction QA gaps causing release delays",
  },
  {
    id: "lead_2",
    name: "Marcus Rivera",
    title: "Director of Quality Assurance",
    company: "NovaPay Solutions",
    score: 88,
    role: "technical-buyer",
    enrichmentSignals: ["LinkedIn", "Email Verified", "Conference Speaker"],
    status: "enriched",
    painMapping: "Device fragmentation across payment flows",
  },
  {
    id: "lead_3",
    name: "Dr. Aisha Patel",
    title: "SVP Product",
    company: "MedStream Health",
    score: 91,
    role: "economic-buyer",
    enrichmentSignals: ["LinkedIn", "Crunchbase", "News Mention", "Email Verified"],
    status: "enriched",
    painMapping: "Post-release outages affecting patient-facing apps",
  },
  {
    id: "lead_4",
    name: "James Thornton",
    title: "VP Quality & Compliance",
    company: "MedStream Health",
    score: 85,
    role: "technical-buyer",
    enrichmentSignals: ["LinkedIn", "Email Verified"],
    status: "enriched",
    painMapping: "HIPAA compliance testing across 14 device types",
  },
  {
    id: "lead_5",
    name: "Lisa Nakamura",
    title: "Head of International",
    company: "CartBridge Commerce",
    score: 78,
    role: "champion",
    enrichmentSignals: ["LinkedIn", "Job Change"],
    status: "enriched",
    painMapping: "No localization testing for 6 new EU markets",
  },
  {
    id: "lead_6",
    name: "David Park",
    title: "VP of Engineering",
    company: "CartBridge Commerce",
    score: 72,
    role: "technical-buyer",
    enrichmentSignals: ["LinkedIn"],
    status: "pending",
    painMapping: "Checkout flow failures in non-English locales",
  },
  {
    id: "lead_7",
    name: "Raj Mehta",
    title: "VP Product",
    company: "StreamVault Media",
    score: 67,
    role: "champion",
    enrichmentSignals: ["LinkedIn", "App Store Review"],
    status: "enriched",
    painMapping: "Samsung device compatibility driving churn",
  },
  {
    id: "lead_8",
    name: "Emma Sullivan",
    title: "CTO",
    company: "TravelKit Global",
    score: 53,
    role: "economic-buyer",
    enrichmentSignals: ["LinkedIn", "Crunchbase"],
    status: "low-signal",
    painMapping: "Building QA function for 30-country payment integration",
  },
];

export default function EnrichmentPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [leads, setLeads] = useState<LeadProfile[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    const c = getCampaign(params.id);
    setCampaign(c);
    if (c?.icpBuilder) {
      setLeads(c.icpBuilder.leads);
      setSelectedIds(c.icpBuilder.leads.map((l) => l.id));
    }
  }, [params.id]);

  const runAgent = useCallback(() => {
    setRunning(true);
    setLeads([]);

    mockLeads.forEach((lead, i) => {
      setTimeout(() => {
        setLeads((prev) => [...prev, lead]);
      }, 800 + i * 400);
    });

    setTimeout(() => {
      setRunning(false);
      setSelectedIds(mockLeads.map((l) => l.id));

      const output: IcpBuilderOutput = {
        leads: mockLeads,
        enrichmentAccuracy: 92.8,
        dataFreshness: "2 hours ago",
        flaggedForReview: 1,
      };

      updateCampaign(params.id, { icpBuilder: output });
      setCampaign((prev) => (prev ? { ...prev, icpBuilder: output } : prev));
    }, 800 + mockLeads.length * 400 + 500);
  }, [params.id]);

  useEffect(() => {
    if (campaign && !campaign.icpBuilder && !running) {
      runAgent();
    }
  }, [campaign, running, runAgent]);

  function handleApprove() {
    setApproving(true);
    const approvedLeads = leads.filter((l) => selectedIds.includes(l.id));
    updateCampaign(params.id, {
      icpBuilder: {
        leads: approvedLeads,
        enrichmentAccuracy: 92.8,
        dataFreshness: "Just now",
        flaggedForReview: leads.length - approvedLeads.length,
      },
    });
    approveStage(params.id);
    setTimeout(() => {
      router.push(`/campaigns/${params.id}/sequencing`);
    }, 400);
  }

  const stats = campaign?.icpBuilder;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-sans text-[2.25rem] font-bold tracking-[-0.02em] text-on-surface">
          ICP Builder
        </h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Lead enrichment and scoring for{" "}
          <span className="font-medium text-on-surface">
            {campaign?.name ?? "..."}
          </span>
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Enrichment Accuracy"
          value={stats ? `${stats.enrichmentAccuracy}%` : "--"}
          icon="verified"
        />
        <StatCard
          label="Data Freshness"
          value={stats?.dataFreshness ?? "--"}
          icon="update"
        />
        <StatCard
          label="Flagged for Review"
          value={stats ? `${stats.flaggedForReview}` : "--"}
          icon="flag"
        />
        <StatCard
          label="Selected Leads"
          value={`${selectedIds.length}`}
          icon="check_circle"
          detail={`of ${leads.length} total`}
        />
      </div>

      {/* Lead table */}
      {running && leads.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-lg p-12 shadow-ghost flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
          <p className="text-sm text-on-surface-variant">
            Building ICP profiles and enriching leads...
          </p>
        </div>
      ) : (
        <LeadTable
          leads={leads}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      )}

      {/* Approval gate */}
      {!running && leads.length > 0 && (
        <ApprovalGate
          stageName="Enrichment"
          onApprove={handleApprove}
          onRerun={runAgent}
          approving={approving}
          disabled={selectedIds.length === 0}
        />
      )}
    </div>
  );
}
