"use client";

import { useState } from "react";
import { accounts, campaigns } from "@/lib/outputs-data";
import type {
  AccountDetail,
  Contact,
  TouchPoint,
  StageData,
  ForensicContent,
} from "@/lib/outputs-types";

/* ── Style constants matching Process Overview ── */

const stageColors: Record<string, string> = {
  forensic: "#7c6bc4",
  icp: "#2db87e",
  leads: "#4a90d9",
  deployment: "#d4843e",
  feedback: "#c94e7c",
};

const stageLabels: Record<string, { label: string; icon: string }> = {
  forensic: { label: "Forensic B2B Analysis", icon: "search" },
  icp: { label: "Strategic ICP Profile", icon: "person_search" },
  leads: { label: "Lead Research", icon: "leaderboard" },
  deployment: { label: "SalesLoft Deployment", icon: "rocket_launch" },
  feedback: { label: "Feedback Loop", icon: "loop" },
};

const channelConfig: Record<string, { icon: string; color: string }> = {
  Email: { icon: "mail", color: "#4a90d9" },
  Phone: { icon: "call", color: "#d4843e" },
  LinkedIn: { icon: "person", color: "#2db87e" },
};

/* ── Utility badges ── */

function TypeBadge({ type }: { type: string }) {
  const isA11y = type === "Accessibility";
  return (
    <span
      className="text-[0.625rem] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
      style={{
        backgroundColor: isA11y ? "#00579f20" : "#2db87e20",
        color: isA11y ? "#00579f" : "#1a7a4e",
      }}
    >
      {type}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, { bg: string; text: string }> = {
    HIGH: { bg: "#2db87e20", text: "#1a7a4e" },
    "MED-HIGH": { bg: "#d4843e20", text: "#a0632a" },
    PENDING: { bg: "#4a90d920", text: "#2a6cb0" },
    SKIP: { bg: "#72778220", text: "#727782" },
  };
  const s = styles[priority] || styles.PENDING;
  return (
    <span
      className="text-[0.6875rem] font-bold px-2 py-0.5 rounded uppercase tracking-wide"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {priority}
    </span>
  );
}

function CadenceBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    Extended: "#7c6bc4",
    Standard: "#4a90d9",
    Compact: "#2db87e",
  };
  const c = colors[type] || "#4a90d9";
  return (
    <span
      className="text-[0.625rem] font-semibold px-1.5 py-0.5 rounded"
      style={{ backgroundColor: `${c}20`, color: c }}
    >
      {type}
    </span>
  );
}

/* ── Copy button ── */

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[0.6875rem] font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors shrink-0"
    >
      <span className="material-symbols-outlined" style={{ fontSize: 13 }}>
        {copied ? "check" : "content_copy"}
      </span>
      {copied ? "Copied" : label || "Copy"}
    </button>
  );
}

/* ── Variant tabs ── */

function VariantTabs({
  variants,
}: {
  variants: { label: string; subject: string; content: string }[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = variants[activeIdx];

  return (
    <div>
      {variants.length > 1 && (
        <div className="flex gap-1 mb-2">
          {variants.map((v, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`px-2.5 py-1 rounded text-[0.6875rem] font-medium transition-colors ${
                activeIdx === i
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {v.label.replace(/^Variant\s/, "")}
            </button>
          ))}
        </div>
      )}
      <div className="bg-inverse-surface rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[0.6875rem] font-semibold text-inverse-on-surface/60 uppercase tracking-wide">
            {active.label}
          </span>
          <CopyButton text={active.content} />
        </div>
        {active.subject && (
          <div className="text-xs text-inverse-on-surface/50 mb-2">
            Subject:{" "}
            <span className="text-inverse-on-surface/80">{active.subject}</span>
          </div>
        )}
        <pre className="text-[0.8125rem] text-inverse-on-surface/90 leading-relaxed font-mono whitespace-pre-wrap">
          {active.content}
        </pre>
      </div>
    </div>
  );
}

/* ── Cadence table ── */

function CadenceTable({ contact, color }: { contact: Contact; color: string }) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  if (contact.touches.length === 0) {
    return (
      <div className="text-xs text-on-surface-variant italic px-3 py-4 text-center">
        Cadence content pending. Full touchpoints will appear here once populated.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-outline-variant/15">
      {/* Table header */}
      <div className="grid grid-cols-[56px_80px_1fr] gap-0 bg-surface-container px-3 py-2">
        <span className="text-[0.625rem] font-semibold text-on-surface-variant uppercase tracking-wide">
          Day
        </span>
        <span className="text-[0.625rem] font-semibold text-on-surface-variant uppercase tracking-wide">
          Channel
        </span>
        <span className="text-[0.625rem] font-semibold text-on-surface-variant uppercase tracking-wide">
          Content
        </span>
      </div>

      {/* Table rows */}
      {contact.touches.map((touch, ti) => {
        const ch = channelConfig[touch.channel] || {
          icon: "task",
          color: "#666",
        };
        const hasContent =
          touch.content || (touch.variants && touch.variants.length > 0);
        const isExpanded = expandedRow === ti;

        return (
          <div
            key={ti}
            className="border-t border-outline-variant/10"
          >
            <button
              type="button"
              onClick={() =>
                hasContent && setExpandedRow(isExpanded ? null : ti)
              }
              className={`w-full grid grid-cols-[56px_80px_1fr] gap-0 px-3 py-2.5 text-left transition-colors ${
                hasContent
                  ? "hover:bg-surface-container-low cursor-pointer"
                  : "cursor-default"
              } ${isExpanded ? "bg-surface-container-low" : ""}`}
            >
              {/* Day */}
              <span className="text-xs font-bold text-on-surface-variant">
                Day {touch.day}
              </span>

              {/* Channel */}
              <span className="flex items-center gap-1.5">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 14, color: ch.color }}
                >
                  {ch.icon}
                </span>
                <span
                  className="text-xs font-medium"
                  style={{ color: ch.color }}
                >
                  {touch.channel}
                </span>
              </span>

              {/* Action + subject preview */}
              <span className="flex items-center justify-between gap-2">
                <span className="text-sm text-on-surface">
                  {touch.action}
                  {touch.variants?.[0]?.subject && (
                    <span className="text-on-surface-variant ml-1.5">
                      / {touch.variants[0].subject}
                    </span>
                  )}
                </span>
                {hasContent && (
                  <span
                    className="material-symbols-outlined text-outline shrink-0 transition-transform"
                    style={{
                      fontSize: 16,
                      transform: isExpanded
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    expand_more
                  </span>
                )}
              </span>
            </button>

            {/* Expanded content */}
            {isExpanded && hasContent && (
              <div className="px-3 pb-3 pt-1">
                {touch.variants && touch.variants.length > 0 ? (
                  <VariantTabs variants={touch.variants} />
                ) : touch.content ? (
                  <div className="bg-inverse-surface rounded-lg p-4">
                    <div className="flex justify-end mb-2">
                      <CopyButton text={touch.content} />
                    </div>
                    <pre className="text-[0.8125rem] text-inverse-on-surface/90 leading-relaxed font-mono whitespace-pre-wrap">
                      {touch.content}
                    </pre>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Structured stage content renderer ── */

function StructuredStageContent({
  data,
  color,
}: {
  data: StageData;
  color: string;
}) {
  const f = data.forensic;

  return (
    <div className="space-y-5">
      {/* Summary */}
      <p className="text-sm text-on-surface leading-relaxed">{data.summary}</p>

      {/* Company Stats */}
      {f?.companyStats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {f.companyStats.founded && (
            <StatChip label="Founded" value={f.companyStats.founded} />
          )}
          {f.companyStats.valuation && (
            <StatChip label="Valuation" value={f.companyStats.valuation} />
          )}
          {f.companyStats.arr && (
            <StatChip label="ARR" value={f.companyStats.arr} />
          )}
          {f.companyStats.employees && (
            <StatChip label="Employees" value={f.companyStats.employees} />
          )}
          {f.companyStats.funding && (
            <StatChip label="Funding" value={f.companyStats.funding} />
          )}
          {f.companyStats.hq && (
            <StatChip label="HQ" value={f.companyStats.hq} />
          )}
          {f.companyStats.extra?.map((e) => (
            <StatChip key={e.label} label={e.label} value={e.value} />
          ))}
        </div>
      )}

      {/* Reality Snapshot */}
      {f?.realitySnapshot && (
        <div className="bg-surface-container rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-wide" style={{ color }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>target</span>
            Reality Snapshot
          </div>
          <div className="space-y-2.5">
            <div>
              <span className="text-[0.625rem] font-bold text-on-surface-variant uppercase tracking-wide">Trigger Event</span>
              <p className="text-sm text-on-surface leading-relaxed mt-0.5">{f.realitySnapshot.triggerEvent}</p>
            </div>
            <div>
              <span className="text-[0.625rem] font-bold text-on-surface-variant uppercase tracking-wide">Bleeding Neck</span>
              <p className="text-sm text-on-surface leading-relaxed mt-0.5">{f.realitySnapshot.bleedingNeck}</p>
            </div>
            <div>
              <span className="text-[0.625rem] font-bold text-on-surface-variant uppercase tracking-wide">The Enemy</span>
              <p className="text-sm text-on-surface leading-relaxed mt-0.5">{f.realitySnapshot.enemy}</p>
            </div>
          </div>
        </div>
      )}

      {/* Psychological Architecture */}
      {f?.psychologicalArchitecture && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-surface-container rounded-lg p-4">
            <span className="text-[0.625rem] font-bold uppercase tracking-wide" style={{ color: "#d4843e" }}>Silent Objection</span>
            <p className="text-sm text-on-surface leading-relaxed mt-1">{f.psychologicalArchitecture.silentObjection}</p>
          </div>
          <div className="bg-surface-container rounded-lg p-4">
            <span className="text-[0.625rem] font-bold uppercase tracking-wide" style={{ color: "#2db87e" }}>Green Light</span>
            <p className="text-sm text-on-surface leading-relaxed mt-1">{f.psychologicalArchitecture.greenLight}</p>
          </div>
        </div>
      )}

      {/* Insider Vocabulary */}
      {f?.insiderVocabulary && f.insiderVocabulary.length > 0 && (
        <div>
          <span className="text-[0.625rem] font-bold text-on-surface-variant uppercase tracking-wide">Insider Vocabulary</span>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {f.insiderVocabulary.map((term) => (
              <span
                key={term}
                className="text-[0.6875rem] px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Strategic Entry Points */}
      {f?.strategicEntryPoints && f.strategicEntryPoints.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-wide mb-2" style={{ color }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>strategy</span>
            Strategic Entry Points
          </div>
          <div className="space-y-2">
            {f.strategicEntryPoints.map((ep, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-[0.5rem] shrink-0 mt-0.5"
                  style={{ backgroundColor: color }}
                >
                  {i + 1}
                </div>
                <div>
                  <span className="text-xs font-semibold text-on-surface">{ep.angle}</span>
                  <p className="text-sm text-on-surface-variant leading-relaxed mt-0.5">{ep.opener}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evidence Table */}
      {f?.evidenceTable && f.evidenceTable.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-outline-variant/15">
          <div className="grid grid-cols-[200px_1fr] gap-0 bg-surface-container px-3 py-2">
            <span className="text-[0.625rem] font-semibold text-on-surface-variant uppercase tracking-wide">Signal</span>
            <span className="text-[0.625rem] font-semibold text-on-surface-variant uppercase tracking-wide">Detail</span>
          </div>
          {f.evidenceTable.map((row, i) => (
            <div key={i} className="grid grid-cols-[200px_1fr] gap-0 px-3 py-2 border-t border-outline-variant/10">
              <span className="text-xs font-medium text-on-surface">{row.signal}</span>
              <span className="text-xs text-on-surface-variant">{row.detail}</span>
            </div>
          ))}
        </div>
      )}

      {/* Persona Cards */}
      {data.personas && data.personas.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-wide mb-2" style={{ color }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>person_search</span>
            Persona Cards
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.personas.map((p) => (
              <div key={p.name} className="bg-surface-container rounded-lg p-3.5">
                <div className="text-sm font-semibold text-on-surface">{p.name}</div>
                <div className="text-[0.6875rem] text-on-surface-variant mb-2">{p.title}</div>
                <div className="text-xs text-on-surface leading-relaxed">{p.forensicHook}</div>
                {p.whyNow && (
                  <div className="mt-1.5 text-[0.6875rem] text-on-surface-variant">
                    <span className="font-semibold">Why now:</span> {p.whyNow}
                  </div>
                )}
                {p.silentObjection && (
                  <div className="mt-1 text-[0.6875rem] text-on-surface-variant">
                    <span className="font-semibold" style={{ color: "#d4843e" }}>Objection:</span> {p.silentObjection}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface-container rounded-lg px-3 py-2">
      <div className="text-[0.5625rem] font-semibold text-on-surface-variant uppercase tracking-wide">{label}</div>
      <div className="text-sm font-medium text-on-surface mt-0.5">{value}</div>
    </div>
  );
}

/* ── Account panel ── */

function AccountPanel({
  account,
  isOpen,
  onToggle,
}: {
  account: AccountDetail;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [selectedContactIdx, setSelectedContactIdx] = useState(0);
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>(
    {}
  );
  const selectedContact = account.contacts[selectedContactIdx] || null;
  const totalTouches = account.contacts.reduce(
    (sum, c) => sum + c.touches.length,
    0
  );

  const toggleStage = (key: string) =>
    setExpandedStages((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-ghost overflow-hidden">
      {/* Account tile header */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3 px-5 py-4 transition-colors text-left ${
          isOpen ? "" : "hover:bg-surface-container-low/30"
        }`}
        style={isOpen ? { borderBottom: `3px solid ${account.color}` } : {}}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0"
          style={{
            backgroundColor:
              account.priority === "SKIP" ? "#727782" : account.color,
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            {account.priority === "SKIP" ? "block" : "domain"}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-on-surface">
              {account.company}
            </span>
            <PriorityBadge priority={account.priority} />
          </div>
          <p className="text-[0.6875rem] text-on-surface-variant truncate mt-0.5">
            {account.rep && account.rep !== "TBD" ? account.rep + " · " : ""}
            {account.contacts.length} contacts
            {totalTouches > 0 ? ` · ${totalTouches} touches` : ""}
          </p>
        </div>
        <div className="text-right shrink-0">
          <div
            className="text-lg font-bold"
            style={{
              color:
                parseInt(account.fitScore) >= 85
                  ? "#1a7a4e"
                  : parseInt(account.fitScore) >= 75
                  ? "#d4843e"
                  : "#727782",
            }}
          >
            {account.fitScore}
          </div>
        </div>
        <span
          className="material-symbols-outlined text-on-surface-variant transition-transform shrink-0"
          style={{
            fontSize: 20,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="px-5 py-5 space-y-6">
          {/* Account summary */}
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {account.description}
          </p>

          {/* ── LEADS TABLE (first) ── */}
          {account.contacts.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: 18 }}
                >
                  people
                </span>
                <h3 className="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide">
                  Leads ({account.contacts.length})
                </h3>
              </div>
              <div className="overflow-hidden rounded-lg border border-outline-variant/15">
                {/* Header */}
                <div className="grid grid-cols-[1fr_1fr_56px_90px_80px] gap-0 bg-surface-container px-3 py-2">
                  <span className="text-[0.625rem] font-semibold text-on-surface-variant uppercase tracking-wide">
                    Name
                  </span>
                  <span className="text-[0.625rem] font-semibold text-on-surface-variant uppercase tracking-wide">
                    Title
                  </span>
                  <span className="text-[0.625rem] font-semibold text-on-surface-variant uppercase tracking-wide">
                    Score
                  </span>
                  <span className="text-[0.625rem] font-semibold text-on-surface-variant uppercase tracking-wide">
                    Role
                  </span>
                  <span className="text-[0.625rem] font-semibold text-on-surface-variant uppercase tracking-wide">
                    Cadence
                  </span>
                </div>
                {/* Rows */}
                {account.contacts.map((contact, idx) => (
                  <button
                    key={contact.name}
                    type="button"
                    onClick={() => setSelectedContactIdx(idx)}
                    className={`w-full grid grid-cols-[1fr_1fr_56px_90px_80px] gap-0 px-3 py-2.5 text-left border-t border-outline-variant/10 transition-colors ${
                      selectedContactIdx === idx
                        ? "bg-primary/5"
                        : "hover:bg-surface-container-low"
                    }`}
                  >
                    <span className="text-sm font-medium text-on-surface flex items-center gap-1.5">
                      {contact.apolloRequired && (
                        <span className="inline-flex items-center text-[0.5rem] font-bold text-amber-600 bg-amber-100 px-1 py-0.5 rounded">
                          APOLLO
                        </span>
                      )}
                      {contact.name}
                    </span>
                    <span className="text-xs text-on-surface-variant self-center">
                      {contact.title}
                    </span>
                    <span
                      className="text-sm font-bold self-center"
                      style={{ color: account.color }}
                    >
                      {contact.score}
                    </span>
                    <span className="text-[0.625rem] text-on-surface-variant self-center">
                      {contact.roleClass}
                    </span>
                    <span className="self-center">
                      <CadenceBadge type={contact.cadenceType} />
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* ── CADENCE TABLE for selected contact ── */}
          {selectedContact && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18, color: account.color }}
                >
                  route
                </span>
                <h3 className="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide">
                  Cadence: {selectedContact.name}
                </h3>
                <CadenceBadge type={selectedContact.cadenceType} />
                {selectedContact.touches.length > 0 && (
                  <span className="text-[0.625rem] text-outline">
                    {selectedContact.touches.length} touches
                  </span>
                )}
              </div>
              <CadenceTable contact={selectedContact} color={account.color} />
            </section>
          )}

          {/* ── PIPELINE STAGES (color-coded expandable frames) ── */}
          {account.stages &&
            Object.keys(account.stages).length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontSize: 18 }}
                  >
                    auto_awesome
                  </span>
                  <h3 className="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide">
                    Pipeline Stages
                  </h3>
                </div>
                <div className="space-y-2">
                  {Object.entries(account.stages).map(([key, content]) => {
                    if (!content) return null;
                    const stage = stageLabels[key];
                    const color = stageColors[key] || "#4a90d9";
                    const stageKey = `${account.id}-${key}`;
                    const isStageOpen = expandedStages[stageKey];
                    const isStructured = typeof content === "object";

                    return (
                      <div
                        key={stageKey}
                        className={`bg-surface-container-lowest rounded-xl shadow-ghost overflow-hidden transition-all ${
                          isStageOpen ? "border-l-4" : ""
                        }`}
                        style={isStageOpen ? { borderLeftColor: color } : {}}
                      >
                        <button
                          onClick={() => toggleStage(stageKey)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-container-low/30 transition-colors"
                        >
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0"
                            style={{ backgroundColor: color }}
                          >
                            <span
                              className="material-symbols-outlined"
                              style={{ fontSize: 14 }}
                            >
                              {stage?.icon || "info"}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-on-surface flex-1 text-left">
                            {stage?.label || key}
                          </span>
                          <span
                            className="material-symbols-outlined text-on-surface-variant transition-transform"
                            style={{
                              fontSize: 18,
                              transform: isStageOpen
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            }}
                          >
                            expand_more
                          </span>
                        </button>
                        {isStageOpen && (
                          <div className="px-4 pb-4 pl-[calc(1rem+28px+0.75rem)]">
                            {isStructured ? (
                              <StructuredStageContent data={content as StageData} color={color} />
                            ) : (
                              <p className="text-sm text-on-surface leading-relaxed whitespace-pre-line">
                                {content as string}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
        </div>
      )}
    </div>
  );
}

/* ── Page ── */

export default function OutputsPage() {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    null
  );
  const [openAccountIds, setOpenAccountIds] = useState<Record<string, boolean>>(
    {}
  );

  const activeCampaign = campaigns.find((c) => c.id === selectedCampaignId);
  const campaignAccounts = activeCampaign
    ? activeCampaign.accountIds
        .map((id) => accounts.find((a) => a.id === id))
        .filter(Boolean) as AccountDetail[]
    : [];

  const toggleAccount = (id: string) =>
    setOpenAccountIds((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="max-w-[960px] mx-auto pb-12 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-sans text-[2rem] font-bold tracking-[-0.02em] text-on-surface">
          Pipeline Outputs
        </h1>
        <p className="text-on-surface-variant text-sm mt-1 max-w-[640px] leading-relaxed">
          {campaigns.length} campaigns, 23 accounts, 90+ contacts. Select a
          campaign, then click an account to view leads, cadences, and pipeline
          output.
        </p>
      </div>

      {/* Campaign Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {campaigns.map((c) => {
          const isSelected = selectedCampaignId === c.id;
          const qualifiedCount = c.accountIds.filter((id) => {
            const a = accounts.find((acc) => acc.id === id);
            return a && a.priority !== "SKIP";
          }).length;

          return (
            <button
              key={c.id}
              onClick={() =>
                setSelectedCampaignId(isSelected ? null : c.id)
              }
              className={`relative text-left px-5 py-4 rounded-xl transition-all ${
                isSelected
                  ? "shadow-lift ring-2 scale-[1.02]"
                  : "bg-surface-container-lowest shadow-ghost hover:shadow-lift"
              }`}
              style={
                isSelected
                  ? {
                      outline: `2px solid ${c.color}`,
                      background: `${c.color}08`,
                    }
                  : {}
              }
            >
              {isSelected && (
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
                  style={{ backgroundColor: c.color }}
                />
              )}
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h2 className="text-sm font-semibold text-on-surface leading-tight flex-1 min-w-0">
                  {c.title}
                </h2>
                <TypeBadge type={c.type} />
              </div>
              <p className="text-[0.6875rem] text-on-surface-variant mb-2">
                {c.date}
              </p>
              <div className="flex gap-3 text-[0.625rem] text-on-surface-variant">
                <span>{qualifiedCount} accounts</span>
                <span>{c.contacts} contacts</span>
                <span>{c.touches} touches</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Campaign */}
      {activeCampaign && (
        <section>
          {/* Campaign header bar */}
          <div
            className="bg-surface-container-lowest rounded-xl shadow-ghost p-5 border-l-4 mb-4"
            style={{ borderLeftColor: activeCampaign.color }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: activeCampaign.color }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18 }}
                >
                  {activeCampaign.type === "Accessibility"
                    ? "accessibility_new"
                    : "devices"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold text-on-surface">
                  {activeCampaign.title}
                </h2>
                <p className="text-xs text-on-surface-variant">
                  {activeCampaign.type} / {activeCampaign.date}
                </p>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              {activeCampaign.summary}
            </p>

            <div className="flex flex-wrap gap-5 mb-3">
              {[
                { icon: "domain", val: campaignAccounts.filter((a) => a.priority !== "SKIP").length, label: "accounts" },
                { icon: "people", val: activeCampaign.contacts, label: "contacts" },
                { icon: "route", val: activeCampaign.cadences, label: "cadences" },
                { icon: "touch_app", val: activeCampaign.touches, label: "touches" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontSize: 15 }}
                  >
                    {s.icon}
                  </span>
                  <span className="text-sm font-medium text-on-surface">
                    {s.val}
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Account tiles */}
          <div className="space-y-3">
            {campaignAccounts.map((account) => (
              <AccountPanel
                key={account.id}
                account={account}
                isOpen={!!openAccountIds[account.id]}
                onToggle={() => toggleAccount(account.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Pipeline Totals */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ghost">
        <h2 className="text-sm font-semibold text-on-surface mb-3 flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontSize: 18 }}
          >
            summarize
          </span>
          Pipeline Totals
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-bold text-on-surface">6</div>
            <div className="text-xs text-on-surface-variant">Campaigns</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-on-surface">23</div>
            <div className="text-xs text-on-surface-variant">
              Accounts (1 DQ)
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-on-surface">90+</div>
            <div className="text-xs text-on-surface-variant">Contacts</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-on-surface">635+</div>
            <div className="text-xs text-on-surface-variant">
              Total Touches
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-3 pt-3 border-t border-outline-variant/15">
          <span className="text-xs text-on-surface-variant flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: "#2db87e" }}
            />
            5 MFT campaigns
          </span>
          <span className="text-xs text-on-surface-variant flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: "#00579f" }}
            />
            1 Accessibility campaign
          </span>
        </div>
      </div>
    </div>
  );
}
