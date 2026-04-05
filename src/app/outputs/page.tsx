"use client";

import { useState } from "react";
import { accounts, campaigns } from "@/lib/outputs-data";
import type {
  AccountDetail,
  Contact,
  StageData,
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
  campaignTags,
}: {
  account: AccountDetail;
  isOpen: boolean;
  onToggle: () => void;
  campaignTags?: { id: string; title: string; color: string; type: string }[];
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
          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
            <span className="text-[0.6875rem] text-on-surface-variant">
              {account.rep && account.rep !== "TBD" ? account.rep + " · " : ""}
              {account.contacts.length} contacts
              {totalTouches > 0 ? ` · ${totalTouches} touches` : ""}
            </span>
            {campaignTags && campaignTags.length > 0 && campaignTags.map((ct) => (
              <span
                key={ct.id}
                className="text-[0.5625rem] font-medium px-1.5 py-0.5 rounded"
                style={{ backgroundColor: `${ct.color}15`, color: ct.color }}
              >
                {ct.type}
              </span>
            ))}
          </div>
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

/* ── Helper: get campaigns for an account ── */

function getCampaignsForAccount(accountId: string) {
  return campaigns.filter(
    (c) => c.id !== "consolidated" && c.accountIds.includes(accountId)
  );
}

/* ── Filter types ── */

type FilterMode = "all" | "high" | "med-high" | "has-cadences";
type SortMode = "priority" | "score" | "company";

const priorityOrder: Record<string, number> = {
  HIGH: 0,
  "MED-HIGH": 1,
  PENDING: 2,
  SKIP: 3,
};

/* ── Page ── */

export default function OutputsPage() {
  const [openAccountIds, setOpenAccountIds] = useState<Record<string, boolean>>(
    {}
  );
  const [filter, setFilter] = useState<FilterMode>("all");
  const [sort, setSort] = useState<SortMode>("company");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleAccount = (id: string) =>
    setOpenAccountIds((prev) => ({ ...prev, [id]: !prev[id] }));

  /* Filter accounts */
  const filteredAccounts = accounts
    .filter((a) => {
      if (filter === "high") return a.priority === "HIGH";
      if (filter === "med-high")
        return a.priority === "HIGH" || a.priority === "MED-HIGH";
      if (filter === "has-cadences")
        return a.contacts.some((c) => c.touches.length > 0);
      return true;
    })
    .filter((a) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        a.company.toLowerCase().includes(q) ||
        a.rep.toLowerCase().includes(q) ||
        a.contacts.some((c) => c.name.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sort === "priority")
        return (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9);
      if (sort === "score")
        return parseInt(b.fitScore) - parseInt(a.fitScore);
      return a.company.localeCompare(b.company);
    });

  /* Derived stats */
  const totalContacts = accounts.reduce((s, a) => s + a.contacts.length, 0);
  const totalTouches = accounts.reduce(
    (s, a) => s + a.contacts.reduce((t, c) => t + c.touches.length, 0),
    0
  );
  const highCount = accounts.filter((a) => a.priority === "HIGH").length;
  const withCadences = accounts.filter((a) =>
    a.contacts.some((c) => c.touches.length > 0)
  ).length;

  /* Filter pills config */
  const filters: { key: FilterMode; label: string; count: number }[] = [
    { key: "all", label: "All Accounts", count: accounts.length },
    { key: "high", label: "HIGH", count: highCount },
    { key: "med-high", label: "HIGH + MED", count: accounts.filter((a) => a.priority === "HIGH" || a.priority === "MED-HIGH").length },
    { key: "has-cadences", label: "With Cadences", count: withCadences },
  ];

  return (
    <div className="max-w-[960px] mx-auto pb-12 space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-sans text-[2rem] font-bold tracking-[-0.02em] text-on-surface">
            Pipeline Outputs
          </h1>
          <p className="text-on-surface-variant text-sm mt-1 leading-relaxed">
            {accounts.length} accounts, {totalContacts} contacts, {totalTouches}+ touches.
            Click any account to view leads, cadences, and full pipeline output.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-surface-container-lowest rounded-xl p-4 shadow-ghost flex flex-wrap gap-6">
        {[
          { icon: "domain", val: accounts.length, label: "Accounts", sub: `${accounts.filter((a) => a.priority === "SKIP").length} DQ` },
          { icon: "people", val: totalContacts, label: "Contacts" },
          { icon: "touch_app", val: `${totalTouches}+`, label: "Touches" },
          { icon: "campaign", val: campaigns.length - 1, label: "Campaigns" },
          { icon: "trending_up", val: highCount, label: "HIGH Priority" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>{s.icon}</span>
            <div>
              <span className="text-base font-bold text-on-surface">{s.val}</span>
              {s.sub && <span className="text-[0.625rem] text-on-surface-variant ml-1">({s.sub})</span>}
              <div className="text-[0.625rem] text-on-surface-variant">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter + Sort + Search */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Filter pills */}
        <div className="flex gap-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-[0.6875rem] font-medium transition-colors ${
                filter === f.key
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {f.label}
              <span className="ml-1 opacity-70">{f.count}</span>
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1 ml-auto">
          <span className="text-[0.625rem] text-on-surface-variant uppercase tracking-wide">Sort:</span>
          {(["priority", "score", "company"] as SortMode[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`px-2 py-1 rounded text-[0.625rem] font-medium transition-colors ${
                sort === s
                  ? "bg-surface-container-high text-on-surface"
                  : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              {s === "priority" ? "Priority" : s === "score" ? "Fit Score" : "A-Z"}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontSize: 16 }}>search</span>
          <input
            type="text"
            placeholder="Search accounts, reps, contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded-lg bg-surface-container text-sm text-on-surface placeholder:text-on-surface-variant/50 border-none outline-none focus:ring-2 focus:ring-primary/30 w-[240px]"
          />
        </div>
      </div>

      {/* Account list */}
      <div className="space-y-3">
        {filteredAccounts.length === 0 && (
          <div className="text-center py-12 text-on-surface-variant text-sm">
            No accounts match the current filter.
          </div>
        )}
        {filteredAccounts.map((account) => {
          const accountCampaigns = getCampaignsForAccount(account.id);
          return (
            <AccountPanel
              key={account.id}
              account={account}
              isOpen={!!openAccountIds[account.id]}
              onToggle={() => toggleAccount(account.id)}
              campaignTags={accountCampaigns}
            />
          );
        })}
      </div>
    </div>
  );
}
