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
  embedUrl: string | null;
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
    embedUrl: "https://docs.google.com/document/d/e/2PACX-1vSPDYxLHNwIHfy7cKRWLPYwTZimIWhEc31W8GnSls3S_-xrqeC8xc-z9kEqZHUzThc-sLJvCPI7Cp9i/pub?embedded=true",
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
    embedUrl: "https://docs.google.com/document/d/e/2PACX-1vTn3Y4IamUfl2YwTNbsxlYDIKw2WDPz_F3ed0KkA2K3POCHcmdOceKS5TwK_iGX1c35HBZrVvR2v35F/pub?embedded=true",
  },
  {
    id: "israel",
    title: "Israel Accounts (7 companies)",
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
    embedUrl: "https://docs.google.com/document/d/e/2PACX-1vROTL1JZLkrQqKGv2SkwPzeqbor-JWHiMRiZJT58THYj0hGd7Tox0UG1tb6hcPiE7DnKCJRpR5_ANWj/pub?embedded=true",
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
    embedUrl: "https://docs.google.com/document/d/1mBuf4ay4APAqg94hT-GvLFXIMBnJ55yhsayJPmqctBs/preview",
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
    embedUrl: "https://docs.google.com/document/d/e/2PACX-1vRVEWb1bYnO9JR-kigxT60ARl2W5GNeUrfA_R0uT_ZKCaXtLppxheazzMbyAWoW0A/pub?embedded=true",
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
    embedUrl: null,
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
    embedUrl: "https://docs.google.com/document/d/e/2PACX-1vRpBH4TtR2czEFhIlqy48tYhMJTSOv5f5hi9kDq9vCMvCyf8kZWMYTrSPY78dfQgASf9eXLVIDcisr7/pub?embedded=true",
  },
];

/* ── Priority badge ── */

function TypeBadge({ type }: { type: string }) {
  const isA11y = type === "Accessibility";
  return (
    <span
      className="text-[0.6875rem] font-bold px-2 py-0.5 rounded uppercase tracking-wide"
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
  if (score === null) return <span className="text-[0.625rem] text-outline">DQ</span>;
  const color = score >= 85 ? "#1a7a4e" : score >= 75 ? "#d4843e" : "#727782";
  const bg = score >= 85 ? "#2db87e20" : score >= 75 ? "#d4843e20" : "#72778220";
  return (
    <span className="text-[0.625rem] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: bg, color }}>
      {score}
    </span>
  );
}

/* ── Page ── */

export default function OutputsPage() {
  const [selectedId, setSelectedId] = useState<string>("consolidated");

  const current = campaigns.find((c) => c.id === selectedId)!;
  const qualified = current.accounts.filter((a) => a.status === "qualified");
  const disqualified = current.accounts.filter((a) => a.status === "disqualified");

  return (
    <div className="max-w-[960px] mx-auto pb-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-sans text-[2rem] font-bold tracking-[-0.02em] text-on-surface">
          Pipeline Outputs
        </h1>
        <p className="text-on-surface-variant text-sm mt-1 max-w-[640px] leading-relaxed">
          6 campaigns, 23 accounts, 90+ contacts. Full pipeline output from
          forensic analysis through outbound cadences.
        </p>
      </div>

      {/* Campaign selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {campaigns.map((c) => {
          const isActive = selectedId === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedId(c.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-[0.8125rem] font-medium shrink-0 transition-all ${
                isActive
                  ? "text-white shadow-lift"
                  : "bg-surface-container-lowest text-on-surface-variant shadow-ghost hover:shadow-lift"
              }`}
              style={isActive ? { backgroundColor: c.color } : {}}
            >
              {c.title.length > 30 ? c.title.substring(0, 28) + "..." : c.title}
              <TypeBadge type={c.type} />
            </button>
          );
        })}
      </div>

      {/* Campaign detail */}
      <div className="bg-surface-container-lowest rounded-xl shadow-ghost overflow-hidden">
        {/* Title bar */}
        <div className="px-6 py-4" style={{ borderBottom: `3px solid ${current.color}` }}>
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: current.color }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                {current.type === "Accessibility" ? "accessibility_new" : "devices"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-on-surface">{current.title}</h2>
              <p className="text-xs text-on-surface-variant">{current.type} Campaign / {current.date}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 py-3 border-b border-outline-variant/15 flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>domain</span>
            <span className="text-sm text-on-surface font-medium">{qualified.length}</span>
            <span className="text-xs text-on-surface-variant">accounts</span>
            {disqualified.length > 0 && (
              <span className="text-xs text-outline">({disqualified.length} DQ)</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>people</span>
            <span className="text-sm text-on-surface font-medium">{current.contacts}</span>
            <span className="text-xs text-on-surface-variant">contacts</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>route</span>
            <span className="text-sm text-on-surface font-medium">{current.cadences}</span>
            <span className="text-xs text-on-surface-variant">cadences</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>touch_app</span>
            <span className="text-sm text-on-surface font-medium">{current.touches}</span>
            <span className="text-xs text-on-surface-variant">touches</span>
          </div>
        </div>

        {/* Account chips */}
        <div className="px-6 py-3 border-b border-outline-variant/15 flex flex-wrap gap-2">
          {current.accounts.map((a) => (
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

        {/* Description */}
        <div className="px-6 py-4 border-b border-outline-variant/15">
          <p className="text-sm text-on-surface-variant leading-relaxed">{current.summary}</p>
        </div>

        {/* Embedded doc or placeholder */}
        {current.embedUrl ? (
          <div className="w-full" style={{ height: "80vh" }}>
            <iframe
              src={current.embedUrl}
              className="w-full h-full border-0"
              title={`${current.title} Pipeline Output`}
              allowFullScreen
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="material-symbols-outlined text-outline mb-3" style={{ fontSize: 36 }}>
              description
            </span>
            <p className="text-sm font-medium text-on-surface mb-1">
              Google Doc coming soon
            </p>
            <p className="text-xs text-on-surface-variant max-w-[400px]">
              Full pipeline output document will be embedded here once published.
              Content includes all 5 stages: forensic analysis, ICP build, scored leads, cadences, and output document.
            </p>
          </div>
        )}
      </div>

      {/* Pipeline totals */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ghost">
        <h2 className="text-sm font-semibold text-on-surface mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>summarize</span>
          Pipeline Totals
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-bold text-on-surface">6</div>
            <div className="text-xs text-on-surface-variant">Campaigns</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-on-surface">23</div>
            <div className="text-xs text-on-surface-variant">Accounts (1 DQ)</div>
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
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#2db87e" }} />
            5 MFT campaigns
          </span>
          <span className="text-xs text-on-surface-variant flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#00579f" }} />
            1 Accessibility campaign
          </span>
        </div>
      </div>
    </div>
  );
}
