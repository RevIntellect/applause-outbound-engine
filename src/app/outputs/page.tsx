"use client";

import { useState } from "react";
import { accounts, campaigns } from "@/lib/outputs-data";
import type { AccountDetail, TouchPoint } from "@/lib/outputs-types";

/* ── Badges ── */

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

function FitBadge({ score }: { score: string }) {
  const num = parseInt(score);
  if (isNaN(num)) return <span className="text-[0.625rem] text-outline">DQ</span>;
  const color = num >= 85 ? "#1a7a4e" : num >= 75 ? "#d4843e" : "#727782";
  const bg = num >= 85 ? "#2db87e20" : num >= 75 ? "#d4843e20" : "#72778220";
  return (
    <span
      className="text-[0.625rem] font-bold px-1.5 py-0.5 rounded"
      style={{ backgroundColor: bg, color }}
    >
      {score}
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
  const config: Record<string, { color: string }> = {
    Extended: { color: "#7c6bc4" },
    Standard: { color: "#4a90d9" },
    Compact: { color: "#2db87e" },
  };
  const c = config[type] || config.Standard;
  return (
    <span
      className="text-[0.625rem] font-semibold px-1.5 py-0.5 rounded"
      style={{ backgroundColor: `${c.color}20`, color: c.color }}
    >
      {type}
    </span>
  );
}

/* ── Copy button ── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="flex items-center gap-1 px-2 py-1 rounded text-[0.6875rem] font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
    >
      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
        {copied ? "check" : "content_copy"}
      </span>
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* ── Touchpoint row ── */

const channelIcon: Record<string, { icon: string; color: string }> = {
  Email: { icon: "mail", color: "#4a90d9" },
  Phone: { icon: "call", color: "#d4843e" },
  LinkedIn: { icon: "person", color: "#2db87e" },
};

function TouchpointRow({ touch }: { touch: TouchPoint }) {
  const [expanded, setExpanded] = useState(false);
  const ch = channelIcon[touch.channel] || { icon: "task", color: "#666" };
  const hasContent =
    touch.content || (touch.variants && touch.variants.length > 0);

  return (
    <div className="border-b border-outline-variant/10 last:border-0">
      <button
        type="button"
        onClick={() => hasContent && setExpanded(!expanded)}
        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
          hasContent
            ? "hover:bg-surface-container-low cursor-pointer"
            : "cursor-default"
        }`}
      >
        <span className="text-xs font-bold text-on-surface-variant w-10 shrink-0">
          Day {touch.day}
        </span>
        <span
          className="material-symbols-outlined shrink-0"
          style={{ fontSize: 16, color: ch.color }}
        >
          {ch.icon}
        </span>
        <span className="text-sm text-on-surface flex-1">
          <span className="font-medium">{touch.channel}</span>
          <span className="text-on-surface-variant ml-1.5">{touch.action}</span>
        </span>
        {hasContent && (
          <span
            className="material-symbols-outlined text-outline transition-transform"
            style={{
              fontSize: 16,
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            }}
          >
            chevron_right
          </span>
        )}
      </button>
      {expanded && hasContent && (
        <div className="px-4 pb-4 space-y-3">
          {touch.variants?.map((v, vi) => (
            <div key={vi} className="bg-inverse-surface rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[0.6875rem] font-semibold text-inverse-on-surface/60 uppercase tracking-wide">
                  {v.label}
                </span>
                <CopyButton text={v.content} />
              </div>
              {v.subject && (
                <div className="text-xs text-inverse-on-surface/50 mb-2">
                  Subject:{" "}
                  <span className="text-inverse-on-surface/80">
                    {v.subject}
                  </span>
                </div>
              )}
              <pre className="text-[0.8125rem] text-inverse-on-surface/90 leading-relaxed font-mono whitespace-pre-wrap">
                {v.content}
              </pre>
            </div>
          ))}
          {touch.content && !touch.variants && (
            <div className="bg-inverse-surface rounded-lg p-4">
              <div className="flex justify-end mb-2">
                <CopyButton text={touch.content} />
              </div>
              <pre className="text-[0.8125rem] text-inverse-on-surface/90 leading-relaxed font-mono whitespace-pre-wrap">
                {touch.content}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Stage labels ── */

const stageLabels: Record<string, { label: string; icon: string }> = {
  forensic: { label: "Forensic B2B Analysis", icon: "search" },
  icp: { label: "Strategic ICP Profile", icon: "person_search" },
  leads: { label: "Lead Research", icon: "people" },
  deployment: { label: "SalesLoft Deployment", icon: "rocket_launch" },
  feedback: { label: "Feedback Loop", icon: "loop" },
};

/* ── Account detail panel ── */

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
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({});
  const selectedContact = account.contacts[selectedContactIdx];

  const toggleStage = (key: string) =>
    setExpandedStages((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="border border-outline-variant/15 rounded-lg overflow-hidden">
      {/* Account Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-container-low transition-colors"
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
          style={{
            backgroundColor:
              account.priority === "SKIP" ? "#727782" : account.color,
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 16 }}
          >
            {account.priority === "SKIP" ? "block" : "domain"}
          </span>
        </div>
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-on-surface">
              {account.company}
            </span>
            <PriorityBadge priority={account.priority} />
          </div>
          <p className="text-[0.6875rem] text-on-surface-variant truncate">
            {account.description}
          </p>
        </div>
        <FitBadge score={account.fitScore} />
        <span
          className="material-symbols-outlined text-on-surface-variant transition-transform"
          style={{
            fontSize: 18,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          {/* Description */}
          <div className="bg-surface-container rounded-lg px-3 py-2.5">
            <p className="text-sm text-on-surface leading-relaxed">
              {account.description}
            </p>
            {account.rep && account.rep !== "TBD" && (
              <p className="text-[0.6875rem] text-on-surface-variant mt-1">
                Rep: {account.rep}
              </p>
            )}
          </div>

          {/* Pipeline Stage Sections */}
          {account.stages &&
            Object.entries(account.stages).map(([key, content]) => {
              if (!content) return null;
              const stage = stageLabels[key];
              const stageKey = `${account.id}-${key}`;
              const isStageOpen = expandedStages[stageKey];

              return (
                <div
                  key={stageKey}
                  className="bg-surface-container rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleStage(stageKey)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-surface-container-low/50 transition-colors"
                  >
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontSize: 16 }}
                    >
                      {stage?.icon || "info"}
                    </span>
                    <span className="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide flex-1 text-left">
                      {stage?.label || key}
                    </span>
                    <span
                      className="material-symbols-outlined text-on-surface-variant transition-transform"
                      style={{
                        fontSize: 16,
                        transform: isStageOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    >
                      expand_more
                    </span>
                  </button>
                  {isStageOpen && (
                    <div className="px-3 pb-2.5">
                      <div className="bg-surface-container-lowest rounded-md px-3 py-2">
                        <p className="text-sm text-on-surface leading-relaxed whitespace-pre-line">
                          {content}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          {/* Contacts */}
          {account.contacts.length > 0 && (
            <div>
              <div className="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide mb-2">
                Contacts ({account.contacts.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {account.contacts.map((contact, idx) => (
                  <button
                    key={contact.name}
                    type="button"
                    onClick={() => setSelectedContactIdx(idx)}
                    className={`text-left p-3 rounded-lg transition-all ${
                      selectedContactIdx === idx
                        ? "bg-surface-container-high shadow-lift"
                        : "bg-surface-container shadow-ghost hover:shadow-lift"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-on-surface">
                          {contact.apolloRequired && (
                            <span className="inline-flex items-center gap-0.5 text-[0.6rem] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded mr-1.5 align-middle">
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: 10 }}
                              >
                                search
                              </span>
                              APOLLO
                            </span>
                          )}
                          {contact.name}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          {contact.title}
                        </p>
                      </div>
                      <span
                        className="text-base font-bold shrink-0"
                        style={{ color: account.color }}
                      >
                        {contact.score}
                      </span>
                    </div>
                    {contact.capability && (
                      <p className="text-[0.625rem] text-on-surface-variant leading-snug mb-1">
                        {contact.capability}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      <CadenceBadge type={contact.cadenceType} />
                      <span className="text-[0.625rem] text-outline">
                        {contact.roleClass}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected contact cadence */}
              {selectedContact && selectedContact.touches.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide">
                      Cadence: {selectedContact.name}
                    </span>
                    <CadenceBadge type={selectedContact.cadenceType} />
                    <span className="text-[0.625rem] text-outline">
                      {selectedContact.touches.length} touches
                    </span>
                  </div>
                  <div className="bg-surface-container-low rounded-lg overflow-hidden">
                    {selectedContact.touches.map((touch, ti) => (
                      <TouchpointRow key={ti} touch={touch} />
                    ))}
                  </div>
                </div>
              )}
            </div>
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
          campaign to view per-account reports.
        </p>
      </div>

      {/* Campaign Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {campaigns.map((c) => {
          const isSelected = selectedCampaignId === c.id;
          const qualified = c.accountIds.filter((id) => {
            const a = accounts.find((acc) => acc.id === id);
            return a && a.priority !== "SKIP";
          });

          return (
            <button
              key={c.id}
              onClick={() =>
                setSelectedCampaignId(isSelected ? null : c.id)
              }
              className={`relative text-left px-5 py-4 rounded-xl transition-all ${
                isSelected
                  ? "bg-surface-container-lowest shadow-lift ring-2 ring-primary"
                  : "bg-surface-container-lowest shadow-ghost hover:shadow-lift"
              }`}
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
                <span>{qualified.length} accounts</span>
                <span>{c.contacts} contacts</span>
                <span>{c.touches} touches</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Campaign */}
      {activeCampaign && (
        <div className="bg-surface-container-lowest rounded-xl shadow-lift overflow-hidden">
          {/* Campaign Header */}
          <div
            className="px-6 py-4 flex items-center gap-4"
            style={{ borderBottom: `3px solid ${activeCampaign.color}` }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: activeCampaign.color }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20 }}
              >
                {activeCampaign.type === "Accessibility"
                  ? "accessibility_new"
                  : "devices"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-on-surface">
                {activeCampaign.title}
              </h2>
              <p className="text-xs text-on-surface-variant">
                {activeCampaign.type} Campaign / {activeCampaign.date}
              </p>
            </div>
          </div>

          <div className="px-6 py-5 space-y-5">
            {/* Stats */}
            <div className="flex flex-wrap gap-5">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: 16 }}
                >
                  domain
                </span>
                <span className="text-sm text-on-surface font-medium">
                  {campaignAccounts.filter((a) => a.priority !== "SKIP").length}
                </span>
                <span className="text-xs text-on-surface-variant">
                  accounts
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: 16 }}
                >
                  people
                </span>
                <span className="text-sm text-on-surface font-medium">
                  {activeCampaign.contacts}
                </span>
                <span className="text-xs text-on-surface-variant">
                  contacts
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: 16 }}
                >
                  route
                </span>
                <span className="text-sm text-on-surface font-medium">
                  {activeCampaign.cadences}
                </span>
                <span className="text-xs text-on-surface-variant">
                  cadences
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: 16 }}
                >
                  touch_app
                </span>
                <span className="text-sm text-on-surface font-medium">
                  {activeCampaign.touches}
                </span>
                <span className="text-xs text-on-surface-variant">
                  touches
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-surface-container rounded-lg px-4 py-3">
              <div className="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide mb-1.5">
                Campaign Summary
              </div>
              <p className="text-sm text-on-surface leading-relaxed">
                {activeCampaign.summary}
              </p>
            </div>

            {/* Per-Account Reports */}
            <div>
              <div className="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide mb-2">
                Account Reports ({campaignAccounts.length})
              </div>
              <div className="space-y-2">
                {campaignAccounts.map((account) => (
                  <AccountPanel
                    key={account.id}
                    account={account}
                    isOpen={!!openAccountIds[account.id]}
                    onToggle={() => toggleAccount(account.id)}
                  />
                ))}
              </div>
            </div>

            {/* Google Doc Link */}
            <div className="border-t border-outline-variant/15 pt-4 flex items-center justify-between">
              {activeCampaign.docUrl ? (
                <a
                  href={activeCampaign.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 18 }}
                  >
                    description
                  </span>
                  View Full Google Doc
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 14 }}
                  >
                    open_in_new
                  </span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm text-on-surface-variant">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 18 }}
                  >
                    description
                  </span>
                  Google Doc not yet linked
                </span>
              )}
              <button
                onClick={() => setSelectedCampaignId(null)}
                className="text-xs text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Collapse
              </button>
            </div>
          </div>
        </div>
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
