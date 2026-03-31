"use client";

import { useEffect, useState } from "react";
import { getCampaigns } from "@/lib/store";
import type { Campaign } from "@/lib/types";

/* ── Pipeline data: 5 reps, 3 accounts each (15 accounts total) ── */

const sampleMetrics = {
  repsSubmitted: 5,
  totalAccounts: 15,
  totalContacts: 48,
  intentTopics: 12,
  avgLeadScore: 78,
  enrichedLeads: 42,
  sequencesGenerated: 12,
  touchpointsCreated: 102,
};

const repBreakdown = [
  { rep: "Rep 1", accounts: ["Harness", "Glean", "Jasper.ai"], contacts: 12, touches: 38, status: "Complete" },
  { rep: "Rep 2", accounts: ["Datadog", "LaunchDarkly", "Split.io"], contacts: 10, touches: 22, status: "Complete" },
  { rep: "Rep 3", accounts: ["Workato", "Tray.io", "Celigo"], contacts: 9, touches: 18, status: "In Progress" },
  { rep: "Rep 4", accounts: ["Figma", "Canva", "Miro"], contacts: 9, touches: 14, status: "In Progress" },
  { rep: "Rep 5", accounts: ["Notion", "Coda", "Airtable"], contacts: 8, touches: 10, status: "Stage 2" },
];

const roleDistribution = [
  { role: "Economic Buyer", count: 10, pct: 21, color: "#7c6bc4" },
  { role: "Technical Buyer", count: 16, pct: 33, color: "#4a90d9" },
  { role: "Champion", count: 12, pct: 25, color: "#2db87e" },
  { role: "Influencer", count: 10, pct: 21, color: "#d4843e" },
];

const scoringBuckets = [
  { range: "90-100", count: 4, label: "Top tier" },
  { range: "80-89", count: 12, label: "Strong" },
  { range: "70-79", count: 14, label: "Qualified" },
  { range: "60-69", count: 10, label: "Developing" },
  { range: "50-59", count: 6, label: "Low signal" },
  { range: "< 50", count: 2, label: "Unqualified" },
];

const intentTopics = [
  { topic: "Cross-Browser/Device Testing", accounts: 11, intensity: 94 },
  { topic: "Enterprise Environment Gaps", accounts: 9, intensity: 91 },
  { topic: "Connector/Integration QA", accounts: 8, intensity: 87 },
  { topic: "AI Agent Validation", accounts: 7, intensity: 84 },
  { topic: "Release Velocity vs QA Coverage", accounts: 6, intensity: 80 },
  { topic: "POC/Demo Reliability", accounts: 5, intensity: 76 },
  { topic: "Permission/Security Testing", accounts: 5, intensity: 73 },
  { topic: "Global Deployment Quality", accounts: 4, intensity: 68 },
];

const accountHeatmap = [
  { vertical: "DevOps/Platform", high: 2, med: 1, low: 0 },
  { vertical: "AI/Enterprise Search", high: 1, med: 1, low: 1 },
  { vertical: "Marketing Tech", high: 1, med: 1, low: 1 },
  { vertical: "Integration/iPaaS", high: 1, med: 1, low: 1 },
  { vertical: "Design/Collaboration", high: 1, med: 1, low: 1 },
  { vertical: "Productivity/No-Code", high: 0, med: 2, low: 1 },
];

const stageConversion = [
  { stage: "Discovery", entered: 15, passed: 13, rate: 87 },
  { stage: "ICP Builder", entered: 13, passed: 12, rate: 92 },
  { stage: "Lead Research", entered: 12, passed: 12, rate: 100 },
  { stage: "Campaign", entered: 12, passed: 10, rate: 83 },
  { stage: "Export", entered: 10, passed: 10, rate: 100 },
];

/* ── Stat card ── */

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ghost">
      <div className="flex items-center gap-2 mb-2">
        <span
          className="material-symbols-outlined text-primary"
          style={{ fontSize: 18 }}
        >
          {icon}
        </span>
        <span className="text-xs text-on-surface-variant font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className="text-2xl font-bold text-on-surface">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      {sub && (
        <div className="text-xs text-outline mt-1">{sub}</div>
      )}
    </div>
  );
}

/* ── Bar (horizontal) ── */

function HBar({
  pct,
  color,
  height = "h-3",
}: {
  pct: number;
  color: string;
  height?: string;
}) {
  return (
    <div className={`flex-1 ${height} bg-surface-container-high rounded-full overflow-hidden`}>
      <div
        className={`${height} rounded-full`}
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

/* ── Heat cell ── */

function heatColor(value: number, max: number): string {
  const ratio = value / max;
  if (ratio > 0.7) return "#00579f";
  if (ratio > 0.4) return "#4a90d9";
  if (ratio > 0.2) return "#a5c8ff";
  return "#dfe8ff";
}

/* ── Page ── */

export default function AnalyticsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    setCampaigns(getCampaigns());
  }, []);

  // Derive live metrics if campaigns exist, otherwise use sample data
  const liveCampaignCount = campaigns.length;
  const m = sampleMetrics; // walkthrough mode uses sample data

  const heatMax = Math.max(
    ...accountHeatmap.flatMap((r) => [r.high, r.med, r.low])
  );

  return (
    <div className="max-w-[960px] mx-auto pb-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-sans text-[2rem] font-bold tracking-[-0.02em] text-on-surface">
          Pipeline Analytics
        </h1>
        <p className="text-on-surface-variant text-sm mt-1">
          5 reps, 15 accounts across 6 verticals. 48 contacts scored and sequenced.
        </p>
      </div>

      {/* Top-level KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="group" label="Reps Submitted" value={m.repsSubmitted} />
        <StatCard icon="domain" label="Accounts" value={m.totalAccounts} />
        <StatCard
          icon="contacts"
          label="Contacts"
          value={m.totalContacts}
          sub={`${m.enrichedLeads.toLocaleString()} enriched`}
        />
        <StatCard icon="trending_up" label="Intent Topics" value={m.intentTopics} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          icon="score"
          label="Avg Lead Score"
          value={m.avgLeadScore}
          sub="out of 100"
        />
        <StatCard icon="verified" label="Enriched Leads" value={m.enrichedLeads} />
        <StatCard icon="route" label="Sequences" value={m.sequencesGenerated} />
        <StatCard icon="touch_app" label="Touchpoints" value={m.touchpointsCreated} />
      </div>

      {/* Rep Breakdown */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ghost">
        <h2 className="text-sm font-semibold text-on-surface mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>
            group
          </span>
          Rep Breakdown
        </h2>

        {/* Header */}
        <div className="grid grid-cols-[100px_1fr_70px_70px_90px] gap-2 mb-2 px-1">
          {["Rep", "Accounts", "Contacts", "Touches", "Status"].map((h) => (
            <span key={h} className="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide">
              {h}
            </span>
          ))}
        </div>

        <div className="space-y-1">
          {repBreakdown.map((r) => (
            <div
              key={r.rep}
              className="grid grid-cols-[100px_1fr_70px_70px_90px] gap-2 items-center px-1 py-2 rounded-lg hover:bg-surface-container-low transition-colors"
            >
              <span className="text-sm text-on-surface font-medium">{r.rep}</span>
              <div className="flex flex-wrap gap-1.5">
                {r.accounts.map((a) => (
                  <span
                    key={a}
                    className="text-[0.6875rem] px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant"
                  >
                    {a}
                  </span>
                ))}
              </div>
              <span className="text-sm text-on-surface text-center">{r.contacts}</span>
              <span className="text-sm text-on-surface text-center">{r.touches}</span>
              <span
                className="text-[0.6875rem] font-semibold px-2 py-0.5 rounded text-center"
                style={{
                  backgroundColor: r.status === "Complete" ? "#2db87e20" : r.status === "In Progress" ? "#d4843e20" : "#4a90d920",
                  color: r.status === "Complete" ? "#1a7a4e" : r.status === "In Progress" ? "#a0632a" : "#2d6ab9",
                }}
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column: Scoring Matrix + Persona Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scoring Matrix */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ghost">
          <h2 className="text-sm font-semibold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>
              leaderboard
            </span>
            Lead Scoring Distribution
          </h2>
          <div className="space-y-3">
            {scoringBuckets.map((b) => {
              const maxCount = Math.max(...scoringBuckets.map((x) => x.count));
              return (
                <div key={b.range} className="flex items-center gap-3">
                  <span className="text-xs text-on-surface-variant font-medium w-14 text-right">
                    {b.range}
                  </span>
                  <HBar pct={(b.count / maxCount) * 100} color="#00579f" />
                  <span className="text-xs text-on-surface font-semibold w-8 text-right">
                    {b.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Persona Distribution */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ghost">
          <h2 className="text-sm font-semibold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>
              people
            </span>
            Persona Distribution
          </h2>
          <div className="space-y-4">
            {roleDistribution.map((r) => (
              <div key={r.role}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-on-surface font-medium">
                    {r.role}
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    {r.count} ({r.pct}%)
                  </span>
                </div>
                <HBar pct={r.pct * 3.2} color={r.color} />
              </div>
            ))}
          </div>

          {/* Legend row */}
          <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-outline-variant/20">
            {roleDistribution.map((r) => (
              <div key={r.role} className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: r.color }}
                />
                <span className="text-[0.6875rem] text-on-surface-variant">
                  {r.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intent Topic Heatmap */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ghost">
        <h2 className="text-sm font-semibold text-on-surface mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>
            local_fire_department
          </span>
          Intent Topics
        </h2>
        <div className="space-y-2.5">
          {intentTopics.map((t) => (
            <div key={t.topic} className="flex items-center gap-3">
              <span className="text-sm text-on-surface w-48 truncate shrink-0">
                {t.topic}
              </span>
              <HBar pct={t.intensity} color="#2db87e" />
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-on-surface-variant w-12 text-right">
                  {t.accounts} accts
                </span>
                <span
                  className="text-xs font-semibold px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor:
                      t.intensity >= 80
                        ? "#2db87e20"
                        : t.intensity >= 65
                          ? "#d4843e20"
                          : "#72778220",
                    color:
                      t.intensity >= 80
                        ? "#1a7a4e"
                        : t.intensity >= 65
                          ? "#a0632a"
                          : "#727782",
                  }}
                >
                  {t.intensity}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Heatmap by Vertical */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ghost">
        <h2 className="text-sm font-semibold text-on-surface mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>
            grid_view
          </span>
          Account Heatmap by Vertical
        </h2>

        {/* Header row */}
        <div className="grid grid-cols-[1fr_80px_80px_80px_60px] gap-2 mb-2 px-1">
          <span className="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide">
            Vertical
          </span>
          <span className="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide text-center">
            High
          </span>
          <span className="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide text-center">
            Medium
          </span>
          <span className="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide text-center">
            Low
          </span>
          <span className="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide text-center">
            Total
          </span>
        </div>

        <div className="space-y-1.5">
          {accountHeatmap.map((row) => (
            <div
              key={row.vertical}
              className="grid grid-cols-[1fr_80px_80px_80px_60px] gap-2 items-center px-1"
            >
              <span className="text-sm text-on-surface font-medium">
                {row.vertical}
              </span>
              {[row.high, row.med, row.low].map((val, i) => (
                <div
                  key={i}
                  className="h-9 rounded-lg flex items-center justify-center text-xs font-semibold"
                  style={{
                    backgroundColor: heatColor(val, heatMax),
                    color: val / heatMax > 0.4 ? "#ffffff" : "#001b3f",
                  }}
                >
                  {val}
                </div>
              ))}
              <div className="text-sm text-on-surface font-semibold text-center">
                {row.high + row.med + row.low}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-outline-variant/20">
          <span className="text-[0.6875rem] text-outline">Signal intensity:</span>
          {[
            { label: "High", color: "#00579f" },
            { label: "Med-High", color: "#4a90d9" },
            { label: "Medium", color: "#a5c8ff" },
            { label: "Low", color: "#dfe8ff" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div
                className="w-4 h-3 rounded"
                style={{ backgroundColor: l.color }}
              />
              <span className="text-[0.6875rem] text-on-surface-variant">
                {l.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Conversion Funnel */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ghost">
        <h2 className="text-sm font-semibold text-on-surface mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>
            filter_alt
          </span>
          Stage Conversion Funnel
        </h2>
        <div className="space-y-2">
          {stageConversion.map((s, i) => {
            const widthPct = (s.passed / stageConversion[0].entered) * 100;
            return (
              <div key={s.stage} className="flex items-center gap-3">
                <span className="text-xs text-on-surface-variant font-medium w-24 text-right shrink-0">
                  {s.stage}
                </span>
                <div className="flex-1 h-8 bg-surface-container-high rounded-lg overflow-hidden relative">
                  <div
                    className="h-full rounded-lg flex items-center px-3"
                    style={{
                      width: `${widthPct}%`,
                      backgroundColor: [
                        "#7c6bc4",
                        "#2db87e",
                        "#4a90d9",
                        "#d4843e",
                        "#c94e7c",
                      ][i],
                    }}
                  >
                    <span className="text-[0.6875rem] font-semibold text-white">
                      {s.passed} accounts
                    </span>
                  </div>
                </div>
                <span className="text-xs text-on-surface font-semibold w-10 text-right">
                  {s.rate}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
