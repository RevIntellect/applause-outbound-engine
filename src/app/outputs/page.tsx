"use client";

import { useState } from "react";

/* ── Campaign data ── */

interface Campaign {
  id: string;
  title: string;
  type: string;
  date: string;
  color: string;
  accounts: { name: string; fit: number | null; status: string }[];
  contacts: number;
  cadences: number;
  touches: number;
  summary: string;
  docUrl: string | null;
}

const campaigns: Campaign[] = [
  {
    id: "consolidated",
    title: "Full Pipeline Output",
    type: "All",
    date: "2026-04-01/02",
    color: "#00579f",
    accounts: [
      { name: "SharkNinja", fit: 87, status: "qualified" },
      { name: "Caesars Sportsbook", fit: 89, status: "qualified" },
      { name: "Best Western", fit: 84, status: "qualified" },
      { name: "Elementor", fit: 88, status: "qualified" },
      { name: "CrazyLabs", fit: 86, status: "qualified" },
      { name: "Papaya Gaming", fit: 85, status: "qualified" },
      { name: "Wix", fit: 83, status: "qualified" },
      { name: "Yotpo", fit: 78, status: "qualified" },
      { name: "Overwolf", fit: 76, status: "qualified" },
      { name: "Candivore", fit: 71, status: "qualified" },
      { name: "Harness", fit: 85, status: "qualified" },
      { name: "Glean", fit: 89, status: "qualified" },
      { name: "Jasper", fit: 82, status: "qualified" },
      { name: "SSI", fit: null, status: "disqualified" },
      { name: "Snap Inc.", fit: 88, status: "qualified" },
      { name: "Robinhood", fit: 91, status: "qualified" },
      { name: "Intuit", fit: 85, status: "qualified" },
      { name: "Booking.com", fit: 90, status: "qualified" },
      { name: "Oura", fit: 90, status: "qualified" },
      { name: "Checkout.com", fit: 80, status: "qualified" },
    ],
    contacts: 94,
    cadences: 77,
    touches: 635,
    summary:
      "Consolidated output across all 6 campaigns. 23 accounts (1 disqualified), 90+ contacts, full pipeline from forensic analysis through outbound cadences. MFT and Accessibility campaigns.",
    docUrl: "https://docs.google.com/document/d/e/2PACX-1vSPDYxLHNwIHfy7cKRWLPYwTZimIWhEc31W8GnSls3S_-xrqeC8xc-z9kEqZHUzThc-sLJvCPI7Cp9i/pub",
  },
  {
    id: "sharkninja",
    title: "SharkNinja / Caesars / Best Western",
    type: "MFT",
    date: "2026-04-01",
    color: "#7c6bc4",
    accounts: [
      { name: "SharkNinja", fit: 87, status: "qualified" },
      { name: "Caesars Sportsbook", fit: 89, status: "qualified" },
      { name: "Best Western", fit: 84, status: "qualified" },
    ],
    contacts: 9,
    cadences: 3,
    touches: 27,
    summary:
      "WiFi pairing failures, peak-hour load collapse, and checkout crashes. Device fragmentation across consumer IoT, regulated sports betting, and hospitality booking flows.",
    docUrl: "https://docs.google.com/document/d/e/2PACX-1vTn3Y4IamUfl2YwTNbsxlYDIKw2WDPz_F3ed0KkA2K3POCHcmdOceKS5TwK_iGX1c35HBZrVvR2v35F/pub",
  },
  {
    id: "israel",
    title: "Israel - Manual Functional Testing (7 companies)",
    type: "MFT",
    date: "2026-04-01",
    color: "#2db87e",
    accounts: [
      { name: "Elementor", fit: 88, status: "qualified" },
      { name: "CrazyLabs", fit: 86, status: "qualified" },
      { name: "Papaya Gaming", fit: 85, status: "qualified" },
      { name: "Wix", fit: 83, status: "qualified" },
      { name: "Yotpo", fit: 78, status: "qualified" },
      { name: "Overwolf", fit: 76, status: "qualified" },
      { name: "Candivore", fit: 71, status: "qualified" },
    ],
    contacts: 21,
    cadences: 10,
    touches: 62,
    summary:
      "Studio adoption stalled at 8%, 250 games monthly at device risk, regulatory remediation mode, overlay breakage after game updates, cross-platform fairness for esports, and preview-reality gaps.",
    docUrl: "https://docs.google.com/document/d/e/2PACX-1vTQK8sCtrrgYtIBS5E03-EB4yerfUBqDnVH4vrwob7As6V5TT-qmLeAM6RLJuC9q4qCYEU0EVoY28qa/pub",
  },
  {
    id: "jasper-harness-glean-v2",
    title: "Jasper / Harness / Glean (Apr 2)",
    type: "MFT",
    date: "2026-04-02",
    color: "#4a90d9",
    accounts: [
      { name: "Harness", fit: 85, status: "qualified" },
      { name: "Glean", fit: 89, status: "qualified" },
      { name: "Jasper", fit: 82, status: "qualified" },
    ],
    contacts: 30,
    cadences: 30,
    touches: 280,
    summary:
      "30 prioritized contacts across all three companies. Full cadences with 2-3 email variants per step, phone talk tracks, LinkedIn touches. Harness: multi-browser testing gaps. Glean: connector failures. Jasper: platform instability.",
    docUrl: "https://docs.google.com/document/d/1mBuf4ay4APAqg94hT-GvLFXIMBnJ55yhsayJPmqctBs/preview",
  },
  {
    id: "jasper-harness-glean-v1",
    title: "SSI / Glean / Harness / Jasper (Apr 1)",
    type: "MFT",
    date: "2026-04-01",
    color: "#d4843e",
    accounts: [
      { name: "SSI", fit: null, status: "disqualified" },
      { name: "Glean", fit: 89, status: "qualified" },
      { name: "Harness", fit: 85, status: "qualified" },
      { name: "Jasper", fit: 82, status: "qualified" },
    ],
    contacts: 12,
    cadences: 12,
    touches: 102,
    summary:
      "Initial run. SSI disqualified (no product, ~20 researchers). Glean: 100+ connectors, hallucination risk. Harness: 36 incidents in 90 days. Jasper: 15-20% hallucination rate, Chrome-only support.",
    docUrl: "https://docs.google.com/document/d/e/2PACX-1vRVEWb1bYnO9JR-kigxT60ARl2W5GNeUrfA_R0uT_ZKCaXtLppxheazzMbyAWoW0A/pub",
  },
  {
    id: "snap-robinhood-intuit",
    title: "Snap / Robinhood / Intuit",
    type: "MFT",
    date: "2026-04-01",
    color: "#c94e7c",
    accounts: [
      { name: "Robinhood", fit: 91, status: "qualified" },
      { name: "Snap Inc.", fit: 88, status: "qualified" },
      { name: "Intuit", fit: 85, status: "qualified" },
    ],
    contacts: 12,
    cadences: 12,
    touches: 78,
    summary:
      "Director/Manager level targeting. Snap: Camera2 API fragmentation across 600+ Android models, Spectacles 2026 launch. Robinhood: prediction markets $300M ARR target, UK/EU expansion. Intuit: tax season functional failures, multi-product consolidation.",
    docUrl: null,
  },
  {
    id: "accessibility",
    title: "Booking.com / Oura / Checkout.com",
    type: "Accessibility",
    date: "2026-04-01",
    color: "#00579f",
    accounts: [
      { name: "Booking.com", fit: 90, status: "qualified" },
      { name: "Oura", fit: 90, status: "qualified" },
      { name: "Checkout.com", fit: 80, status: "qualified" },
    ],
    contacts: 10,
    cadences: 10,
    touches: 86,
    summary:
      "Accessibility testing campaign. Booking.com: DMA gatekeeper, EAA June 2025, screen reader failures. Oura: VoiceOver broken since 2019, 40M EUR EAA exposure. Checkout.com: partially conformant, SCA accessibility gaps.",
    docUrl: "https://docs.google.com/document/d/e/2PACX-1vRpBH4TtR2czEFhIlqy48tYhMJTSOv5f5hi9kDq9vCMvCyf8kZWMYTrSPY78dfQgASf9eXLVIDcisr7/pub",
  },
];

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

function FitBadge({ score }: { score: number | null }) {
  if (score === null)
    return <span className="text-[0.625rem] text-outline">DQ</span>;
  const color = score >= 85 ? "#1a7a4e" : score >= 75 ? "#d4843e" : "#727782";
  const bg = score >= 85 ? "#2db87e20" : score >= 75 ? "#d4843e20" : "#72778220";
  return (
    <span
      className="text-[0.625rem] font-bold px-1.5 py-0.5 rounded"
      style={{ backgroundColor: bg, color }}
    >
      {score}
    </span>
  );
}

/* ── Page ── */

export default function OutputsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const active = campaigns.find((c) => c.id === selectedId);

  return (
    <div className="max-w-[960px] mx-auto pb-12 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-sans text-[2rem] font-bold tracking-[-0.02em] text-on-surface">
          Pipeline Outputs
        </h1>
        <p className="text-on-surface-variant text-sm mt-1 max-w-[640px] leading-relaxed">
          {campaigns.length} campaigns, 23 accounts, 90+ contacts. Select a
          campaign to view the report.
        </p>
      </div>

      {/* Campaign Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {campaigns.map((c) => {
          const isSelected = selectedId === c.id;
          const qualified = c.accounts.filter((a) => a.status === "qualified");

          return (
            <button
              key={c.id}
              onClick={() => setSelectedId(isSelected ? null : c.id)}
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
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold text-on-surface leading-tight">
                    {c.title}
                  </h2>
                </div>
                <TypeBadge type={c.type} />
              </div>
              <p className="text-[0.6875rem] text-on-surface-variant mb-2">
                {c.date}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {c.accounts.slice(0, 4).map((a) => (
                  <span
                    key={a.name}
                    className={`text-[0.625rem] px-1.5 py-0.5 rounded ${
                      a.status === "disqualified"
                        ? "bg-surface-container text-outline line-through"
                        : "bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    {a.name}
                  </span>
                ))}
                {c.accounts.length > 4 && (
                  <span className="text-[0.625rem] px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">
                    +{c.accounts.length - 4} more
                  </span>
                )}
              </div>
              <div className="flex gap-3 text-[0.625rem] text-on-surface-variant">
                <span>{qualified.length} accounts</span>
                <span>{c.contacts} contacts</span>
                <span>{c.touches} touches</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Campaign Report */}
      {active && (
        <div className="bg-surface-container-lowest rounded-xl shadow-lift overflow-hidden">
          {/* Report Header */}
          <div
            className="px-6 py-4 flex items-center gap-4"
            style={{ borderBottom: `3px solid ${active.color}` }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: active.color }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20 }}
              >
                {active.type === "Accessibility"
                  ? "accessibility_new"
                  : "devices"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-on-surface">
                {active.title}
              </h2>
              <p className="text-xs text-on-surface-variant">
                {active.type} Campaign / {active.date}
              </p>
            </div>
          </div>

          <div className="px-6 py-5 space-y-5">
            {/* Stats Row */}
            <div className="flex flex-wrap gap-5">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: 16 }}
                >
                  domain
                </span>
                <span className="text-sm text-on-surface font-medium">
                  {
                    active.accounts.filter((a) => a.status === "qualified")
                      .length
                  }
                </span>
                <span className="text-xs text-on-surface-variant">
                  accounts
                </span>
                {active.accounts.some((a) => a.status === "disqualified") && (
                  <span className="text-xs text-outline">
                    (
                    {
                      active.accounts.filter(
                        (a) => a.status === "disqualified"
                      ).length
                    }{" "}
                    DQ)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: 16 }}
                >
                  people
                </span>
                <span className="text-sm text-on-surface font-medium">
                  {active.contacts}
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
                  {active.cadences}
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
                  {active.touches}
                </span>
                <span className="text-xs text-on-surface-variant">touches</span>
              </div>
            </div>

            {/* Account Chips */}
            <div className="flex flex-wrap gap-2">
              {active.accounts.map((a) => (
                <div
                  key={a.name}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
                    a.status === "disqualified"
                      ? "bg-surface-container text-outline line-through"
                      : "bg-surface-container text-on-surface"
                  }`}
                >
                  {a.name}
                  <FitBadge score={a.fit} />
                </div>
              ))}
            </div>

            {/* Summary Box */}
            <div className="bg-surface-container rounded-lg px-4 py-3">
              <div className="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide mb-1.5">
                Campaign Summary
              </div>
              <p className="text-sm text-on-surface leading-relaxed">
                {active.summary}
              </p>
            </div>

            {/* Google Doc Link */}
            <div className="border-t border-outline-variant/15 pt-4 flex items-center justify-between">
              {active.docUrl ? (
                <a
                  href={active.docUrl}
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
                onClick={() => setSelectedId(null)}
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
            <div className="text-xs text-on-surface-variant">Total Touches</div>
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
