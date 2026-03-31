"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCampaign, updateCampaign, approveStage } from "@/lib/store";
import type { Campaign, DiscoveryOutput, SignalCard as SignalCardType } from "@/lib/types";
import SignalCard from "@/components/stages/SignalCard";
import StatCard from "@/components/shared/StatCard";
import ApprovalGate from "@/components/stages/ApprovalGate";

const mockSignals: SignalCardType[] = [
  {
    company: "NovaPay Solutions",
    industry: "FinTech",
    employeeCount: "2,400",
    priority: "high",
    signalQuote:
      "Recent SEC filing reveals 340% increase in mobile transaction volume with no corresponding QA headcount growth.",
    targetPersonas: ["VP Engineering", "Director of QA", "CTO"],
  },
  {
    company: "MedStream Health",
    industry: "HealthTech",
    employeeCount: "8,100",
    priority: "high",
    signalQuote:
      "Glassdoor reviews cite repeated production outages post-release. Engineering team stretched across 14 device types.",
    targetPersonas: ["SVP Product", "VP Quality", "CISO"],
  },
  {
    company: "CartBridge Commerce",
    industry: "eCommerce",
    employeeCount: "1,200",
    priority: "medium",
    signalQuote:
      "Expanding to 6 new EU markets in Q3. No localization testing infrastructure mentioned in job postings.",
    targetPersonas: ["Head of International", "VP Engineering"],
  },
  {
    company: "StreamVault Media",
    industry: "Media / Streaming",
    employeeCount: "5,600",
    priority: "medium",
    signalQuote:
      "App store reviews show 2.1-star ratings on Samsung devices. Competitor gained 18% share in same period.",
    targetPersonas: ["VP Product", "Director of Mobile"],
  },
  {
    company: "TravelKit Global",
    industry: "Travel",
    employeeCount: "900",
    priority: "low",
    signalQuote:
      "Series B announcement mentions payment integration across 30+ countries. Early stage, building QA function.",
    targetPersonas: ["CTO", "Head of Product"],
  },
];

type AgentStatus = "idle" | "scanning" | "complete";

interface DataStream {
  name: string;
  icon: string;
  status: AgentStatus;
}

export default function ResearchPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("idle");
  const [signals, setSignals] = useState<SignalCardType[]>([]);
  const [approving, setApproving] = useState(false);

  const [streams, setStreams] = useState<DataStream[]>([
    { name: "SEC Filings & Financial Signals", icon: "account_balance", status: "idle" },
    { name: "Job Postings & Hiring Patterns", icon: "work", status: "idle" },
    { name: "App Store & Review Sentiment", icon: "star", status: "idle" },
    { name: "News & Press Releases", icon: "newspaper", status: "idle" },
    { name: "Social & Community Signals", icon: "forum", status: "idle" },
  ]);

  useEffect(() => {
    const c = getCampaign(params.id);
    setCampaign(c);
    if (c?.discovery) {
      setSignals(c.discovery.signals);
      setAgentStatus("complete");
      setStreams((prev) => prev.map((s) => ({ ...s, status: "complete" as AgentStatus })));
    }
  }, [params.id]);

  const runAgent = useCallback(() => {
    setAgentStatus("scanning");
    setSignals([]);

    // Simulate streams activating sequentially
    streams.forEach((_, i) => {
      setTimeout(() => {
        setStreams((prev) =>
          prev.map((s, j) => ({
            ...s,
            status: j <= i ? "scanning" : "idle",
          }))
        );
      }, i * 400);
    });

    // Simulate signals arriving
    mockSignals.forEach((signal, i) => {
      setTimeout(() => {
        setSignals((prev) => [...prev, signal]);
      }, 1500 + i * 600);
    });

    // Complete
    setTimeout(() => {
      setAgentStatus("complete");
      setStreams((prev) => prev.map((s) => ({ ...s, status: "complete" as AgentStatus })));

      const output: DiscoveryOutput = {
        signals: mockSignals,
        pipelineHealth: 94.2,
        processingLatency: "2.4s",
        tokenConsumption: 12847,
      };

      updateCampaign(params.id, { discovery: output });
      setCampaign((prev) => (prev ? { ...prev, discovery: output } : prev));
    }, 1500 + mockSignals.length * 600 + 500);
  }, [params.id]);

  // Auto-run on first load if no data
  useEffect(() => {
    if (campaign && !campaign.discovery && agentStatus === "idle") {
      runAgent();
    }
  }, [campaign, agentStatus, runAgent]);

  function handleApprove() {
    setApproving(true);
    approveStage(params.id);
    setTimeout(() => {
      router.push(`/campaigns/${params.id}/enrichment`);
    }, 400);
  }

  const stats = campaign?.discovery;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-[2.25rem] font-bold tracking-[-0.02em] text-on-surface">
            Discovery
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Forensic B2B analysis for{" "}
            <span className="font-medium text-on-surface">
              {campaign?.name ?? "..."}
            </span>
          </p>
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Active Data Streams */}
        <div className="col-span-1 space-y-4">
          <h2 className="font-sans text-[1rem] font-semibold text-on-surface">
            Active Data Streams
          </h2>
          <div className="space-y-2">
            {streams.map((stream) => (
              <div
                key={stream.name}
                className="bg-surface-container-lowest rounded-lg px-4 py-3 shadow-ghost flex items-center gap-3"
              >
                <span
                  className={`material-symbols-outlined ${
                    stream.status === "scanning"
                      ? "text-primary animate-pulse"
                      : stream.status === "complete"
                        ? "text-primary"
                        : "text-outline"
                  }`}
                  style={{ fontSize: 20 }}
                >
                  {stream.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.8125rem] font-medium text-on-surface truncate">
                    {stream.name}
                  </div>
                </div>
                {stream.status === "scanning" && (
                  <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                )}
                {stream.status === "complete" && (
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontSize: 18 }}
                  >
                    check_circle
                  </span>
                )}
                {stream.status === "idle" && (
                  <div className="w-2 h-2 rounded-full bg-outline/30" />
                )}
              </div>
            ))}
          </div>

          {/* Stats */}
          {stats && (
            <div className="space-y-3 pt-2">
              <StatCard
                label="Pipeline Health"
                value={`${stats.pipelineHealth}%`}
                icon="health_and_safety"
              />
              <StatCard
                label="Processing Latency"
                value={stats.processingLatency}
                icon="speed"
              />
              <StatCard
                label="Token Consumption"
                value={stats.tokenConsumption.toLocaleString()}
                icon="token"
              />
            </div>
          )}
        </div>

        {/* Right: Discovered Signals */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-sans text-[1rem] font-semibold text-on-surface">
              Discovered Signals &amp; Triggers
            </h2>
            {signals.length > 0 && (
              <span className="text-[0.75rem] font-medium text-on-surface-variant">
                {signals.length} signals found
              </span>
            )}
          </div>

          {signals.length === 0 && agentStatus === "scanning" && (
            <div className="bg-surface-container-lowest rounded-lg p-12 shadow-ghost flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
              <p className="text-sm text-on-surface-variant">
                Scanning data streams for signals...
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {signals.map((signal) => (
              <SignalCard key={signal.company} signal={signal} />
            ))}
          </div>
        </div>
      </div>

      {/* Agent status bar */}
      <div className="flex items-center justify-between bg-surface-container-low rounded-lg px-5 py-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full ${
              agentStatus === "scanning"
                ? "bg-primary animate-pulse"
                : agentStatus === "complete"
                  ? "bg-tertiary-fixed"
                  : "bg-outline"
            }`}
          />
          <span className="text-[0.6875rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant">
            Agent: Forensic Analyst 01
          </span>
          <span className="text-[0.75rem] text-outline">
            {agentStatus === "scanning"
              ? "Processing..."
              : agentStatus === "complete"
                ? "Analysis complete"
                : "Standing by"}
          </span>
        </div>
        {agentStatus === "complete" && (
          <span className="text-[0.75rem] text-on-surface-variant">
            {signals.length} signals · {stats?.tokenConsumption.toLocaleString() ?? 0} tokens
          </span>
        )}
      </div>

      {/* Approval gate */}
      {agentStatus === "complete" && (
        <ApprovalGate
          stageName="Research"
          onApprove={handleApprove}
          onRerun={runAgent}
          approving={approving}
          disabled={signals.length === 0}
        />
      )}
    </div>
  );
}
