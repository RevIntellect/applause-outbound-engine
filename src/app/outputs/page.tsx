"use client";

import { useState } from "react";

/* ── Output example data ── */

interface OutputExample {
  id: string;
  stage: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  format: "Google Doc" | "PDF" | "DOCX";
  description: string;
  sections: {
    heading: string;
    content: string;
  }[];
}

const outputExamples: OutputExample[] = [
  {
    id: "discovery",
    stage: 1,
    title: "Discovery Output",
    subtitle: "Forensic Research Analyst",
    icon: "search",
    color: "#7c6bc4",
    format: "Google Doc",
    description:
      "Signal analysis for a FinTech campaign targeting mobile banking apps with QA gaps. 12 accounts analyzed, 8 flagged as high priority.",
    sections: [
      {
        heading: "Campaign Context",
        content:
          "Vertical: FinTech / Mobile Banking\nTarget Problem: Mobile app releases shipping with untested edge cases on real device/network combinations.\nApplause Solution: Functional testing, payments testing, accessibility compliance.",
      },
      {
        heading: "High-Priority Signal: Chime Financial",
        content:
          'Industry: FinTech | Employees: 1,200+ | Priority: HIGH\nSignal: "Chime recently expanded to 3 new international markets while simultaneously rolling out a redesigned mobile app. Multiple app store reviews cite login failures and payment processing errors on older Android devices."\nTarget Personas: VP of Engineering, Director of QA, Head of Mobile Product',
      },
      {
        heading: "High-Priority Signal: Current (bank)",
        content:
          'Industry: FinTech | Employees: 400+ | Priority: HIGH\nSignal: "Current is hiring 4 QA engineers and 2 SDET roles simultaneously, suggesting testing capacity gaps during a feature expansion phase. Their teen banking product launched with accessibility complaints."\nTarget Personas: CTO, VP of Product, QA Manager',
      },
      {
        heading: "Medium-Priority Signal: Varo Money",
        content:
          'Industry: FinTech | Employees: 500+ | Priority: MEDIUM\nSignal: "Varo completed Series E funding and is scaling their savings and credit products. Job postings reference need for cross-device testing infrastructure."\nTarget Personas: Director of Engineering, Head of Quality',
      },
      {
        heading: "Pipeline Health",
        content:
          "Accuracy: 92% | Processing Latency: 2.4s avg | Accounts Analyzed: 12 | High Priority: 8 | Medium: 3 | Low: 1",
      },
    ],
  },
  {
    id: "icp",
    stage: 2,
    title: "ICP Builder Output",
    subtitle: "Strategic ICP Builder",
    icon: "person_search",
    color: "#2db87e",
    format: "Google Doc",
    description:
      "Enriched lead profiles for Chime Financial. 6 contacts scored and classified with enrichment signals and approval status.",
    sections: [
      {
        heading: "Lead: Marcus Chen, VP of Engineering",
        content:
          "Company: Chime Financial | Score: 94 | Status: ENRICHED\nRole Classification: Economic Buyer\nEnrichment: LinkedIn Verified, Email Verified, Crunchbase Match\nPain Mapping: Owns the engineering org scaling into 3 new markets. Directly accountable for app stability during international expansion.",
      },
      {
        heading: "Lead: Sarah Kim, Director of QA",
        content:
          "Company: Chime Financial | Score: 88 | Status: ENRICHED\nRole Classification: Technical Buyer\nEnrichment: LinkedIn Verified, Email Verified\nPain Mapping: Leading a 12-person QA team that is understaffed for the current release velocity. Has posted about device fragmentation challenges on LinkedIn.",
      },
      {
        heading: "Lead: David Okonkwo, Head of Mobile Product",
        content:
          "Company: Chime Financial | Score: 82 | Status: ENRICHED\nRole Classification: Champion\nEnrichment: LinkedIn Verified, Email Verified, Conference Speaker\nPain Mapping: Owns the mobile banking experience. App store rating dropped from 4.6 to 4.2 after international launch. Motivated to fix quality fast.",
      },
      {
        heading: "Enrichment Summary",
        content:
          "Total Leads: 6 | Enriched: 5 | Pending: 1 | Enrichment Accuracy: 94% | Data Freshness: 2 days | Flagged for Review: 1",
      },
    ],
  },
  {
    id: "leads",
    stage: 3,
    title: "Lead Research Output",
    subtitle: "Lead Research Agent",
    icon: "leaderboard",
    color: "#4a90d9",
    format: "Google Doc",
    description:
      "Scored lead list with role classification and pain-to-person mapping. Cadence type assigned based on buyer role.",
    sections: [
      {
        heading: "Marcus Chen (Score: 94) - Economic Buyer",
        content:
          "Cadence: Extended (21 days, 12 touches)\nPain-to-Person: International expansion created device/network testing gaps his team cannot cover internally. Budget authority for vendor solutions.\nApproach: Lead with ROI data. Reference specific markets (Brazil, Mexico, India). Frame Applause as capacity extension, not replacement.",
      },
      {
        heading: "Sarah Kim (Score: 88) - Technical Buyer",
        content:
          "Cadence: Standard (14 days, 8-10 touches)\nPain-to-Person: QA team is at 65% capacity against current sprint demands. Device lab covers only 40% of their target device matrix.\nApproach: Lead with technical credibility. Reference device fragmentation stats. Offer a pilot on their highest-failure device segment.",
      },
      {
        heading: "David Okonkwo (Score: 82) - Champion",
        content:
          "Cadence: Compact (7 days, 5 touches)\nPain-to-Person: App store rating decline is a board-level metric. He needs a fast win to demonstrate quality improvement.\nApproach: Lead with the app store rating data point. Low-friction, show quick time-to-value.",
      },
    ],
  },
  {
    id: "campaign",
    stage: 4,
    title: "Campaign Output",
    subtitle: "Cold Messaging Pro",
    icon: "mail",
    color: "#d4843e",
    format: "Google Doc",
    description:
      "Multi-channel cadence for Sarah Kim (Technical Buyer, Standard 14-day sequence). 9 touchpoints across email, LinkedIn, and phone.",
    sections: [
      {
        heading: "Day 1: LinkedIn Profile View",
        content: "Channel: LinkedIn\nAction: View Sarah Kim's profile. No message. Creates visibility before first email.",
      },
      {
        heading: "Day 2: Email 1 - Value First",
        content:
          'Channel: Email\nSubject: device coverage\n\nSarah, saw Chime is scaling testing across three new markets.\n\nMost QA teams we talk to cover about 40% of their target device matrix internally. The remaining 60% is where real-user edge cases live, and where app store ratings take hits.\n\nWe help teams like yours close that gap with on-demand testers across 200+ real device and network combinations.\n\nWorth a look?\n\n(94 words)',
      },
      {
        heading: "Day 4: LinkedIn Connection Request",
        content:
          "Channel: LinkedIn\nMessage: Hi Sarah, noticed we're both in the mobile QA space. Would love to connect.\n\n(76 characters, no pitch, no Applause mention)",
      },
      {
        heading: "Day 6: Phone Call",
        content:
          'Channel: Phone\nTalk Track: "Hi Sarah, this is [Name] from Applause. I sent you a note about device coverage gaps during international expansion. I know your team is scaling QA across three new markets, and I wanted to see if the device fragmentation piece is something you are actively trying to solve. What does your current approach look like?"\n\n(28 seconds)\n\nVoicemail: "Hi Sarah, [Name] from Applause. Sent you a note about closing device coverage gaps as Chime scales internationally. Happy to share how similar QA teams handle this. My number is [number]."\n\n(17 seconds)',
      },
      {
        heading: "Day 8: Email 2 - Case Study",
        content:
          "Channel: Email\nSubject: 94% to 98%\n\nSarah, a mobile banking team similar to yours was covering about 35% of their device matrix before working with us.\n\nWithin 6 weeks they hit 98% coverage and caught 23 critical bugs their internal lab missed, including a payment flow failure on Samsung Galaxy A series that affected 12% of their user base.\n\nHappy to share the full breakdown if helpful.\n\n(62 words)",
      },
      {
        heading: "Sequence Score",
        content:
          "Score: 87% | Assessment: Strong multi-channel sequence with appropriate pacing for a Technical Buyer. Good balance of value-first emails and social touches.\nAI Suggestion: Consider adding a Day 10 LinkedIn InMail referencing the case study from Email 2.",
      },
    ],
  },
  {
    id: "export",
    stage: 5,
    title: "Final Deliverable",
    subtitle: "Compiled Output",
    icon: "download",
    color: "#c94e7c",
    format: "Google Doc",
    description:
      "The complete package a rep receives. One Google Doc containing all pipeline outputs, formatted and ready to execute.",
    sections: [
      {
        heading: "Document Structure",
        content:
          "Section 1: Campaign Overview (vertical, problem, solution fit)\nSection 2: Discovery Signals (all account cards with priority and evidence)\nSection 3: ICP Package (enriched leads, scores, enrichment badges)\nSection 4: Lead Research (scored list, role classifications, pain mapping)\nSection 5: Outbound Sequences (full cadence per lead, all channels)\nSection 6: Execution Notes (timing, auto-pause rules, follow-up triggers)",
      },
      {
        heading: "Delivery Method (Current)",
        content:
          "Format: .docx exported to Google Drive\nAccess: Shared link sent to requesting rep\nTimeline: Delivered within 24 hours of campaign submission",
      },
      {
        heading: "Delivery Method (Phase 2)",
        content:
          "Format: Direct SalesLoft API push\nSequences loaded automatically into rep's SalesLoft instance\nAdditional: Automated follow-up triggers, pipeline tracking, and rep activity dashboards",
      },
    ],
  },
];

/* ── Page ── */

export default function OutputsPage() {
  const [selectedOutput, setSelectedOutput] = useState<string>("discovery");

  const current = outputExamples.find((o) => o.id === selectedOutput)!;

  return (
    <div className="max-w-[960px] mx-auto pb-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-sans text-[2rem] font-bold tracking-[-0.02em] text-on-surface">
          Output Examples
        </h1>
        <p className="text-on-surface-variant text-sm mt-1 max-w-[640px] leading-relaxed">
          Sample outputs from each pipeline stage. These are real examples generated
          by the engine for a FinTech mobile banking campaign.
        </p>
      </div>

      {/* Stage selector (horizontal tabs) */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {outputExamples.map((output) => {
          const isActive = selectedOutput === output.id;
          return (
            <button
              key={output.id}
              type="button"
              onClick={() => setSelectedOutput(output.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium shrink-0 transition-all ${
                isActive
                  ? "text-white shadow-lift"
                  : "bg-surface-container-lowest text-on-surface-variant shadow-ghost hover:shadow-lift"
              }`}
              style={isActive ? { backgroundColor: output.color } : {}}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                {output.icon}
              </span>
              Stage {output.stage}
            </button>
          );
        })}
      </div>

      {/* Output detail */}
      <div className="bg-surface-container-lowest rounded-xl shadow-ghost overflow-hidden">
        {/* Title bar */}
        <div
          className="px-6 py-4 flex items-center gap-4"
          style={{ borderBottom: `3px solid ${current.color}` }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{ backgroundColor: current.color }}
          >
            {current.stage}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-on-surface">
              {current.title}
            </h2>
            <p className="text-xs text-on-surface-variant">{current.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container text-xs font-medium text-on-surface-variant shrink-0">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
              {current.format === "Google Doc" ? "description" : "picture_as_pdf"}
            </span>
            {current.format}
          </div>
        </div>

        {/* Description */}
        <div className="px-6 py-4 border-b border-outline-variant/15">
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {current.description}
          </p>
        </div>

        {/* Document preview */}
        <div className="px-6 py-5 space-y-5">
          {current.sections.map((section, i) => (
            <div key={i}>
              <h3 className="text-sm font-semibold text-on-surface mb-2 flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded flex items-center justify-center text-[0.625rem] font-bold text-white"
                  style={{ backgroundColor: current.color }}
                >
                  {i + 1}
                </span>
                {section.heading}
              </h3>
              <div className="bg-surface-container rounded-lg p-4">
                <pre className="text-sm text-on-surface leading-relaxed whitespace-pre-wrap font-body">
                  {section.content}
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-outline-variant/15 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-outline">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
              info
            </span>
            Sample data generated for walkthrough purposes.
          </div>
          <div className="flex items-center gap-2 text-xs text-outline">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
              upcoming
            </span>
            Phase 2: Google Docs API integration for live document links.
          </div>
        </div>
      </div>
    </div>
  );
}
