"use client";

import { useState } from "react";

const pipelineStages = [
  {
    number: 1,
    title: "Forensic research analyst",
    subtitle: "Market research, pain discovery, competitor landscape",
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

function Connector() {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="w-px h-4 bg-outline-variant/40" />
      <div className="w-2 h-2 rounded-full bg-outline-variant/40" />
      <div className="w-px h-4 bg-outline-variant/40" />
    </div>
  );
}

export default function Dashboard() {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);

  return (
    <div className="max-w-[720px] mx-auto pb-12 pt-2">
      {/* Hero */}
      <section className="text-center mb-8">
        <h1 className="font-sans text-[2rem] font-bold tracking-[-0.02em] text-on-surface leading-tight">
          Outbound Engine Walkthrough
        </h1>
        <p className="text-on-surface-variant text-[0.9375rem] mt-2 max-w-[560px] mx-auto leading-relaxed">
          A five-stage AI pipeline that takes a list of target accounts and
          delivers a complete, personalized outbound package.
        </p>
      </section>

      {/* Flowchart */}
      <div className="flex flex-col items-center">
        {/* Intake box */}
        <div className="w-full max-w-[600px] rounded-2xl border-2 border-dashed border-outline-variant/50 p-6 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-outline-variant/60 bg-surface-container-lowest text-sm font-medium text-on-surface">
              <span
                className="material-symbols-outlined text-outline"
                style={{ fontSize: 16 }}
              >
                list_alt
              </span>
              Account list (text)
            </div>
            <span className="text-outline text-sm italic">or</span>
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-outline-variant/60 bg-surface-container-lowest text-sm font-medium text-on-surface">
              <span
                className="material-symbols-outlined text-outline"
                style={{ fontSize: 16 }}
              >
                upload_file
              </span>
              Contact upload (CSV)
            </div>
          </div>
        </div>

        {/* v2 note */}
        <p className="text-xs text-outline mt-3 mb-1 tracking-wide">
          v2: ZoomInfo / LinkedIn Sales Nav / Apollo.io import
        </p>

        {/* Connector from intake to first stage */}
        <Connector />

        {/* Pipeline stages */}
        {pipelineStages.map((stage, index) => {
          const isExpanded = expandedStage === stage.number;

          return (
            <div key={stage.number} className="flex flex-col items-center w-full">
              {/* Stage card */}
              <button
                type="button"
                onClick={() =>
                  setExpandedStage(isExpanded ? null : stage.number)
                }
                className="w-full max-w-[600px] text-left rounded-2xl border-2 transition-shadow hover:shadow-lift bg-surface-container-lowest overflow-hidden"
                style={{ borderColor: stage.color }}
              >
                <div className="flex items-center gap-4 p-5">
                  {/* Numbered circle */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-base"
                    style={{ backgroundColor: stage.color }}
                  >
                    {stage.number}
                  </div>

                  {/* Title + subtitle */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[1.0625rem] font-bold text-on-surface leading-snug">
                      {stage.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant mt-0.5">
                      {stage.subtitle}
                    </p>
                  </div>

                  {/* Expand indicator */}
                  <span
                    className="material-symbols-outlined text-outline transition-transform shrink-0"
                    style={{
                      fontSize: 22,
                      transform: isExpanded
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    expand_more
                  </span>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div
                    className="px-5 pb-5 pt-0 border-t"
                    style={{ borderColor: `${stage.color}30` }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide">
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: 14 }}
                          >
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
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: 14 }}
                          >
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
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: 14 }}
                          >
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
                )}
              </button>

              {/* Connector between stages (not after last) */}
              {index < pipelineStages.length - 1 && <Connector />}
            </div>
          );
        })}

        {/* Bottom divider */}
        <div className="w-48 h-px bg-outline-variant/30 mt-8" />
      </div>
    </div>
  );
}
