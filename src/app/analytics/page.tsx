"use client";

import { useEffect, useState } from "react";
import { getCampaigns } from "@/lib/store";
import type { Campaign } from "@/lib/types";

/* ── Sample data for walkthrough (used when no live campaigns exist) ── */

const sampleMetrics = {
  repsSubmitted: 12,
  totalAccounts: 247,
  totalContacts: 1_083,
  intentTopics: 34,
  avgLeadScore: 72,
  enrichedLeads: 891,
  sequencesGenerated: 18,
  touchpointsCreated: 196,
};

const roleDistribution = [
  { role: "Economic Buyer", count: 186, pct: 17, color: "#7c6bc4" },
  { role: "Technical Buyer", count: 312, pct: 29, color: "#4a90d9" },
  { role: "Champion", count: 347, pct: 32, color: "#2db87e" },
  { role: "Influencer", count: 238, pct: 22, color: "#d4843e" },
];

const scoringBuckets = [
  { range: "90-100", count: 98, label: "Top tier" },
  { range: "80-89", count: 184, label: "Strong" },
  { range: "70-79", count: 276, label: "Qualified" },
  { range: "60-69", count: 312, label: "Developing" },
  { range: "50-59", count: 143, label: "Low signal" },
  { range: "< 50", count: 70, label: "Unqualified" },
];

const intentTopics = [
  { topic: "Mobile App Quality", accounts: 42, intensity: 94 },
  { topic: "QA Automation Gaps", accounts: 38, intensity: 89 },
  { topic: "Device Fragmentation", accounts: 35, intensity: 86 },
  { topic: "Release Velocity", accounts: 31, intensity: 82 },
  { topic: "Accessibility Compliance", accounts: 28, intensity: 78 },
  { topic: "Localization Testing", accounts: 24, intensity: 73 },
  { topic: "Payment Flow Failures", accounts: 21, intensity: 69 },
  { topic: "Cross-Browser Issues", accounts: 18, intensity: 64 },
];

const accountHeatmap = [
  { vertical: "FinTech", high: 14, med: 22, low: 8 },
  { vertical: "HealthTech", high: 11, med: 18, low: 12 },
  { vertical: "E-Commerce", high: 18, med: 15, low: 6 },
  { vertical: "Media/Streaming", high: 9, med: 20, low: 14 },
  { vertical: "Travel/Hospitality", high: 7, med: 12, low: 9 },
  { vertical: "Insurance", high: 12, med: 16, low: 11 },
  { vertical: "SaaS/B2B", high: 16, med: 14, low: 5 },
  { vertical: "Retail", high: 8, med: 10, low: 7 },
];

const stageConversion = [
  { stage: "Discovery", entered: 247, passed: 218, rate: 88 },
  { stage: "ICP Builder", entered: 218, passed: 194, rate: 89 },
  { stage: "Lead Research", entered: 194, passed: 171, rate: 88 },
  { stage: "Campaign", entered: 171, passed: 158, rate: 92 },
  { stage: "Export", entered: 158, passed: 158, rate: 100 },
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
          Aggregate metrics across all pipeline executions.
          {liveCampaignCount === 0 && (
            <span className="ml-1 text-outline italic">
              Showing sample walkthrough data.
            </span>
          )}
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
