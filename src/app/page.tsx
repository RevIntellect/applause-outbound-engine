"use client";

import { useState } from "react";

const pipelineStages = [
  {
    number: 1,
    title: "Forensic research analyst",
    subtitle: "Market research, pain discovery, competitor landscape",
    icon: "search",
    color: "#7c6bc4",
    description:
      "AI-powered research agent scans for buying signals, company triggers, and market context. Surfaces the highest-priority accounts with supporting evidence.",
    repExperience:
      "Reps submit a list of target accounts. The engine returns a prioritized view of each account with signal cards showing company size, industry, priority level, and the key trigger that makes them worth pursuing right now.",
    output:
      "Prioritized account cards with signal quotes, industry tags, and persona mapping.",
  },
  {
    number: 2,
    title: "Strategic ICP builder",
    subtitle: "Target profiles, persona matrices, forensic hooks",
    icon: "person_search",
    color: "#2db87e",
    description:
      "Builds an enriched lead profile for each account. Scores contacts by data quality and intent signals. Flags leads that need review.",
    repExperience:
      "Reps see a scored table of leads with enrichment badges (LinkedIn, email verified, etc.). They can filter by high-intent scores and approve leads individually or in batch.",
    output:
      "Enriched lead table with AI Data Scores, enrichment signals, and approval status.",
  },
  {
    number: 3,
    title: "Lead research agent",
    subtitle: "Identify targets, score and prioritize, enrich with context",
    icon: "leaderboard",
    color: "#4a90d9",
    description:
      "Deep research on each approved lead. Classifies by buyer role (Economic, Technical, Champion, Influencer) and maps pain points to the individual.",
    repExperience:
      "Each lead gets a 1-100 score and a role classification. Reps see exactly which pain point to reference for each person, making every touchpoint relevant.",
    output:
      "Scored lead list with role classification and pain-to-person mapping.",
  },
  {
    number: 4,
    title: "Cold messaging pro",
    subtitle: "Multi-channel: phone, email, LinkedIn",
    icon: "mail",
    color: "#d4843e",
    description:
      "Generates a complete multi-channel cadence: emails, LinkedIn touches, and phone talk tracks. Tailored to each buyer role with strict word limits enforced.",
    repExperience:
      "Reps receive a timeline of touchpoints across email, LinkedIn, and phone. Each message is pre-written, personalized, and ready to execute. Sequence length adapts to the buyer role.",
    output:
      "Full cadence with emails (120 words max), LinkedIn messages (75 words max), and phone scripts (30 sec max).",
  },
  {
    number: 5,
    title: "Output",
    subtitle: "Google Doc / SalesLoft push (v2)",
    icon: "download",
    color: "#c94e7c",
    description:
      "Compiles all pipeline outputs into a single formatted Google Doc. Reps get one link with everything they need to execute.",
    repExperience:
      "Reps receive a Google Doc containing the full package: discovery intel, ICP analysis, scored leads, and every email/call/LinkedIn message ready to copy-paste.",
    output: "Formatted .docx with all pipeline outputs, ready for Google Drive.",
    futureNote:
      "Phase 2: Direct push into SalesLoft sequences + additional automations.",
  },
];

export default function Dashboard() {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);

  return (
    <div className="max-w-[960px] mx-auto space-y-10 pb-12">
      {/* Hero / Overview */}
      <section>
        <h1 className="font-sans text-[2.25rem] font-bold tracking-[-0.02em] text-on-surface leading-tight">
          Outbound Engine Walkthrough
        </h1>
        <p className="text-on-surface-variant text-[0.9375rem] mt-2 max-w-[640px] leading-relaxed">
          A five-stage AI pipeline that takes a list of target accounts and
          delivers a complete, personalized outbound package. Every email, call
          script, and LinkedIn message, written and ready to execute.
        </p>
      </section>

      {/* How It Works: Intake */}
      <section className="bg-surface-container-lowest rounded-xl p-6 shadow-ghost">
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #00579f, #2d70bb)" }}
          >
            <span className="material-symbols-outlined text-white" style={{ fontSize: 20 }}>
              input
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-on-surface mb-1">
              How a Rep Starts
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
              A rep submits their target accounts, either by pasting a list directly or uploading a CSV.
              They select the target vertical and describe the core business problem they are solving for.
              That is the only input required. The engine handles everything else.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container text-sm text-on-surface-variant">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                  list_alt
                </span>
                Paste account list
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container text-sm text-on-surface-variant">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                  upload_file
                </span>
                Upload CSV
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container text-sm text-on-surface-variant">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                  category
                </span>
                Select vertical
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container text-sm text-on-surface-variant">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                  edit_note
                </span>
                Describe problem
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-outline">
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                info
              </span>
              v2: ZoomInfo / LinkedIn Sales Nav / Apollo.io import
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline Stages */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-lg font-semibold text-on-surface">
            Pipeline Stages
          </h2>
          <span className="text-xs text-outline font-medium px-2 py-0.5 rounded-md bg-surface-container">
            5 stages
          </span>
        </div>

        {/* Horizontal stage cards */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
          {pipelineStages.map((stage) => {
            const isSelected = expandedStage === stage.number;

            return (
              <button
                key={stage.number}
                type="button"
                onClick={() =>
                  setExpandedStage(isSelected ? null : stage.number)
                }
                className={`flex-shrink-0 w-[168px] rounded-xl shadow-ghost overflow-hidden transition-all hover:shadow-lift text-left p-4 ${
                  isSelected
                    ? "ring-2 scale-[1.03]"
                    : "bg-surface-container-lowest"
                }`}
                style={
                  isSelected
                    ? { ringColor: stage.color, borderColor: stage.color, outline: `2px solid ${stage.color}`, background: `${stage.color}08` }
                    : {}
                }
              >
                {/* Number badge */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mb-3"
                  style={{ backgroundColor: stage.color }}
                >
                  {stage.number}
                </div>

                {/* Icon */}
                <span
                  className="material-symbols-outlined mb-2"
                  style={{ fontSize: 22, color: stage.color }}
                >
                  {stage.icon}
                </span>

                {/* Title + subtitle */}
                <h3 className="text-[0.8125rem] font-semibold text-on-surface leading-snug">
                  {stage.title}
                </h3>
                <p className="text-[0.6875rem] text-on-surface-variant mt-1 leading-relaxed">
                  {stage.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Expanded detail panel (below the row) */}
        {expandedStage !== null && (() => {
          const stage = pipelineStages.find((s) => s.number === expandedStage);
          if (!stage) return null;

          return (
            <div
              className="mt-4 bg-surface-container-lowest rounded-xl shadow-ghost p-5 border-l-4"
              style={{ borderLeftColor: stage.color }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: stage.color }}
                >
                  {stage.number}
                </div>
                <h3 className="text-base font-semibold text-on-surface">
                  {stage.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide">
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                      auto_awesome
                    </span>
                    What it does
                  </div>
                  <p className="text-sm text-on-surface leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide">
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                      person
                    </span>
                    Rep experience
                  </div>
                  <p className="text-sm text-on-surface leading-relaxed">
                    {stage.repExperience}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide">
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                      output
                    </span>
                    Output
                  </div>
                  <p className="text-sm text-on-surface leading-relaxed">
                    {stage.output}
                  </p>
                  {stage.futureNote && (
                    <p className="text-xs text-outline italic mt-2">
                      {stage.futureNote}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* What Reps Receive */}
      <section className="bg-surface-container-lowest rounded-xl p-6 shadow-ghost">
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #00579f, #2d70bb)" }}
          >
            <span className="material-symbols-outlined text-white" style={{ fontSize: 20 }}>
              description
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-on-surface mb-1">
              What Reps Receive
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
              Today, the final deliverable is a formatted Google Doc containing
              everything a rep needs to execute the campaign. One link, one
              document, ready to go.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 text-sm text-on-surface">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontSize: 16 }}>
                  check
                </span>
                Discovery intel on every target account
              </div>
              <div className="flex items-start gap-2.5 text-sm text-on-surface">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontSize: 16 }}>
                  check
                </span>
                ICP analysis and enrichment data
              </div>
              <div className="flex items-start gap-2.5 text-sm text-on-surface">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontSize: 16 }}>
                  check
                </span>
                Scored leads with role classification
              </div>
              <div className="flex items-start gap-2.5 text-sm text-on-surface">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontSize: 16 }}>
                  check
                </span>
                Pre-written emails, LinkedIn, and call scripts
              </div>
            </div>

            <div className="mt-5 p-3 rounded-lg bg-surface-container">
              <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-1.5">
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                  upcoming
                </span>
                Coming in Phase 2
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Direct integration with SalesLoft. Sequences loaded automatically,
                no copy-paste required. Additional automations for follow-up
                triggers and pipeline tracking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
