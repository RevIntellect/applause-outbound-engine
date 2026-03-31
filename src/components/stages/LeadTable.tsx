"use client";

import { useState } from "react";
import type { LeadProfile } from "@/lib/types";

const roleLabels: Record<string, string> = {
  "economic-buyer": "Economic Buyer",
  "technical-buyer": "Technical Buyer",
  champion: "Champion",
  influencer: "Influencer",
};

const statusStyles: Record<string, string> = {
  enriched: "bg-tertiary-fixed/40 text-primary",
  pending: "bg-secondary/10 text-secondary",
  "low-signal": "bg-outline/10 text-outline",
};

interface LeadTableProps {
  leads: LeadProfile[];
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
}

export default function LeadTable({
  leads,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
}: LeadTableProps) {
  const [filter, setFilter] = useState<"all" | "high-intent">("all");
  const [sortByRank, setSortByRank] = useState(true);

  const filtered = leads.filter((lead) => {
    if (filter === "high-intent") return lead.score > 80;
    return true;
  });

  const sorted = [...filtered].sort((a, b) =>
    sortByRank ? b.score - a.score : a.name.localeCompare(b.name)
  );

  function toggleSelect(id: string) {
    if (!onSelectionChange) return;
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((s) => s !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  }

  function toggleAll() {
    if (!onSelectionChange) return;
    if (selectedIds.length === sorted.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(sorted.map((l) => l.id));
    }
  }

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 bg-surface-container-low rounded-lg p-1">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-[0.03em] transition-colors ${
              filter === "all"
                ? "bg-surface-container-lowest text-on-surface shadow-ghost"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            All Scores ({leads.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("high-intent")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-[0.03em] transition-colors ${
              filter === "high-intent"
                ? "bg-surface-container-lowest text-on-surface shadow-ghost"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            High Intent (&gt;80)
          </button>
        </div>
        <button
          type="button"
          onClick={() => setSortByRank(!sortByRank)}
          className="flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
            sort
          </span>
          {sortByRank ? "Ranked by score" : "Alphabetical"}
        </button>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-lg shadow-ghost overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[auto_2fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 bg-surface-container-low">
          {selectable && (
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedIds.length === sorted.length && sorted.length > 0}
                onChange={toggleAll}
                className="w-4 h-4 rounded accent-primary"
              />
            </div>
          )}
          {!selectable && <div />}
          <span className="text-[0.6875rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant">
            Name / Title
          </span>
          <span className="text-[0.6875rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant">
            Company
          </span>
          <span className="text-[0.6875rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant">
            Score
          </span>
          <span className="text-[0.6875rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant">
            Role
          </span>
          <span className="text-[0.6875rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant">
            Status
          </span>
          <span className="text-[0.6875rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant">
            Signals
          </span>
        </div>

        {/* Rows */}
        {sorted.map((lead, i) => (
          <div
            key={lead.id}
            className={`grid grid-cols-[auto_2fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-5 py-4 items-center transition-colors ${
              i % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface/50"
            } hover:bg-surface-container-low`}
          >
            {selectable ? (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(lead.id)}
                  onChange={() => toggleSelect(lead.id)}
                  className="w-4 h-4 rounded accent-primary"
                />
              </div>
            ) : (
              <div />
            )}

            {/* Name */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
                <span className="text-[0.6875rem] font-bold text-primary">
                  {lead.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-on-surface truncate">
                  {lead.name}
                </div>
                <div className="text-[0.75rem] text-on-surface-variant truncate">
                  {lead.title}
                </div>
              </div>
            </div>

            {/* Company */}
            <span className="text-sm text-on-surface truncate">
              {lead.company}
            </span>

            {/* Score */}
            <div className="font-sans text-[1.375rem] font-bold text-on-surface">
              {lead.score}
            </div>

            {/* Role */}
            <span className="text-[0.75rem] text-on-surface-variant">
              {roleLabels[lead.role] ?? lead.role}
            </span>

            {/* Status */}
            <span
              className={`inline-flex items-center w-fit px-2.5 py-0.5 rounded-md text-[0.6875rem] font-medium tracking-[0.05em] uppercase ${statusStyles[lead.status]}`}
            >
              {lead.status}
            </span>

            {/* Signals */}
            <div className="flex items-center gap-1">
              {lead.enrichmentSignals.slice(0, 3).map((signal) => (
                <span
                  key={signal}
                  className="inline-flex items-center px-1.5 py-0.5 rounded bg-surface-container text-[0.625rem] text-on-surface-variant"
                >
                  {signal}
                </span>
              ))}
              {lead.enrichmentSignals.length > 3 && (
                <span className="text-[0.625rem] text-outline">
                  +{lead.enrichmentSignals.length - 3}
                </span>
              )}
            </div>
          </div>
        ))}

        {sorted.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-on-surface-variant">
            No leads match the current filter.
          </div>
        )}
      </div>
    </div>
  );
}
