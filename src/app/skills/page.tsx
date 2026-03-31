"use client";

import { useState } from "react";

/* ── Folder structure data ── */

interface FileNode {
  name: string;
  type: "folder" | "file";
  icon: string;
  color: string;
  description: string;
  preview?: string[];
  children?: FileNode[];
}

const skillTree: FileNode[] = [
  {
    name: "Applause_Outbound_Engine/",
    type: "folder",
    icon: "folder",
    color: "#00579f",
    description: "Root project directory. The full Applause outbound prospecting system, organized into config, skills, inputs, outputs, and the Next.js application.",
    children: [
      {
        name: "_Config/",
        type: "folder",
        icon: "settings",
        color: "#7c6bc4",
        description: "CLAUDE.md master config and pipeline stage guide files. These define the rules, persona, and output schema for every stage of the engine.",
        children: [
          {
            name: "CLAUDE.md",
            type: "file",
            icon: "description",
            color: "#7c6bc4",
            description:
              "The master skill file. Defines the full pipeline, communication rules, cadence constraints, stage flow, and all output formats. Claude reads this at the start of every session to understand the engine's behavior.",
            preview: [
              "# The Applause Outbound Engine",
              "",
              "## About",
              "A standalone Next.js web application that executes the full",
              "Applause outbound prospecting pipeline in a single interface.",
              "",
              "## Communication Rules",
              "- Be concise and direct. No filler.",
              "- Never use em dashes.",
              "- Default output formats: .md for drafts, .docx for deliverables.",
              "",
              "## Stage Flow",
              "New Campaign (entry form)",
              "  -> Stage 1: Discovery (Forensic B2B Analysis)",
              "  -> Stage 2: ICP Builder (Persona matrix, segments, hooks)",
              "  -> Stage 3: Lead Research (Claude-powered lead list + scoring)",
              "  -> Stage 4: Campaign/Cadence (Multi-channel sequences)",
              "  -> Stage 5: Export (Compile all outputs to .docx)",
            ],
          },
          {
            name: "stage-1-market-research.md",
            type: "file",
            icon: "search",
            color: "#7c6bc4",
            description:
              "Stage 1 guide. Instructs Claude to act as a forensic B2B research analyst. Scans for buying signals, competitive landscape, pain discovery, and market triggers. Returns structured signal cards with priority scores.",
            preview: [
              "# Forensic Research Analyst",
              "",
              "## Role",
              "You are a forensic B2B research analyst specializing in",
              "identifying high-value buying signals for outbound sales.",
              "",
              "## Task",
              "Given a list of target accounts and a vertical context,",
              "analyze each company for:",
              "- Active buying signals (hiring, funding, tech changes)",
              "- Competitive displacement opportunities",
              "- Pain indicators mapped to Applause solutions",
              "",
              "## Output Schema",
              "Return an array of SignalCard objects with:",
              "company, industry, employeeCount, priority, signalQuote,",
              "targetPersonas[]",
            ],
          },
          {
            name: "stage-2-icp-build.md",
            type: "file",
            icon: "person_search",
            color: "#2db87e",
            description:
              "Stage 2 guide. Builds ideal customer profiles and persona matrices. Enriches leads with data quality scores and intent signals. Classifies each contact by enrichment status.",
            preview: [
              "# Strategic ICP Builder",
              "",
              "## Role",
              "You are a strategic ICP builder and lead enrichment agent.",
              "",
              "## Task",
              "Given discovery output from Stage 1, build enriched lead",
              "profiles for each account:",
              "- Score contacts 1-100 on data quality and fit",
              "- Tag enrichment signals (LinkedIn, email, Crunchbase)",
              "- Flag low-signal leads for manual review",
              "",
              "## Output Schema",
              "Return LeadProfile objects with:",
              "name, title, company, score, role, enrichmentSignals[],",
              "status (enriched | pending | low-signal)",
            ],
          },
          {
            name: "stage-3-lead-research.md",
            type: "file",
            icon: "leaderboard",
            color: "#4a90d9",
            description:
              "Stage 3 guide. Deep research on approved leads. Classifies by buyer role (Economic Buyer, Technical Buyer, Champion, Influencer) and maps specific pain points to each person for personalized outreach.",
            preview: [
              "# Lead Research Agent",
              "",
              "## Role",
              "You are a lead research and scoring specialist.",
              "",
              "## Task",
              "Given enriched leads from Stage 2, perform deep research:",
              "- Score each lead 1-100 on outreach priority",
              "- Classify: Economic Buyer, Technical Buyer,",
              "  Champion, or Influencer",
              "- Map specific pain points to each individual",
              "",
              "## Cadence Assignment Rules",
              "- Economic Buyer (80-100): Extended (21 days, 12 touches)",
              "- Technical Buyer (70-89): Standard (14 days, 8-10 touches)",
              "- Champion (60-79): Compact (7 days, 5 touches)",
              "- Influencer (50-59): Compact (7 days, 5 touches)",
            ],
          },
          {
            name: "stage-4-cold-outbound-cadence.md",
            type: "file",
            icon: "mail",
            color: "#d4843e",
            description:
              "Stage 4 guide. Generates the full multi-channel outbound cadence. Writes emails (120 words max), LinkedIn messages (75 words max), and phone talk tracks (30 seconds max). Enforces all cadence rules from CLAUDE.md.",
            preview: [
              "# Cold Messaging Pro",
              "",
              "## Role",
              "You are a cold outbound cadence specialist.",
              "",
              "## Cadence Rules (STRICT)",
              "Email: 120-word max. No em dashes. Email 1 never asks",
              "for a meeting. HTML format with <div> and <br /> tags.",
              "Subject lines: 1-4 words, boring > clever.",
              "",
              "Phone: Talk track under 30 sec. Voicemail under 20 sec.",
              "Reference same initiative from email.",
              "",
              "LinkedIn: Connection request under 300 chars.",
              "No pitch, no Applause mention. Messages under 75 words.",
            ],
          },
          {
            name: "stage-5-campaign-deploy.md",
            type: "file",
            icon: "download",
            color: "#c94e7c",
            description:
              "Stage 5 guide. Compiles all pipeline outputs into a single deliverable document. Formats for Google Drive upload. Phase 2 will add direct SalesLoft push.",
            preview: [
              "# Campaign Deploy / Output Compiler",
              "",
              "## Role",
              "You are a document compiler and formatter.",
              "",
              "## Task",
              "Compile all pipeline outputs into a single .docx:",
              "1. Discovery intake and signal analysis",
              "2. ICP package with enrichment data",
              "3. Scored lead list with role classifications",
              "4. Full email sequences (HTML formatted)",
              "5. Phone talk tracks and voicemail scripts",
              "6. LinkedIn connection requests and messages",
              "",
              "## Format",
              "Google Docs compatible .docx with clear section headers,",
              "tables for lead data, and formatted email previews.",
            ],
          },
        ],
      },
      {
        name: "_Skills/",
        type: "folder",
        icon: "psychology",
        color: "#2db87e",
        description: "Active skill definitions only. Each skill is a self-contained Claude instruction set for a specific capability within the engine.",
      },
      {
        name: "_Inputs/",
        type: "folder",
        icon: "input",
        color: "#4a90d9",
        description: "Prospects, templates, blueprints, and video assets. Raw materials that feed into campaign creation. Includes account lists, CSV uploads, and reusable templates.",
      },
      {
        name: "Outputs/",
        type: "folder",
        icon: "output",
        color: "#d4843e",
        description: "Campaign outputs organized by vertical and date. Each campaign run generates a folder with the full pipeline output: forensic analysis, ICP profiles, scored leads, and cadences.",
      },
      {
        name: "Presentations/",
        type: "folder",
        icon: "slideshow",
        color: "#c94e7c",
        description: "Active decks only. Leadership presentations, pipeline demos, and walkthrough materials for stakeholder reviews.",
      },
      {
        name: "App/",
        type: "folder",
        icon: "code",
        color: "#00579f",
        description: "The Sr PM in a Box Next.js application. This is the web interface that orchestrates the full pipeline, built with Next.js 16, Tailwind CSS, and Claude API integration.",
        children: [
          {
            name: "src/",
            type: "folder",
            icon: "folder",
            color: "#00579f",
            description: "Application source code. Pages, components, API routes, and library utilities.",
          },
        ],
      },
      {
        name: "Playbooks/",
        type: "folder",
        icon: "menu_book",
        color: "#455e8c",
        description: "SOPs and guides. Standard operating procedures for running campaigns, onboarding reps, and managing the pipeline end to end.",
      },
      {
        name: "z_Archive/",
        type: "folder",
        icon: "inventory_2",
        color: "#727782",
        description: "Everything else. Backup files, old skill versions, legacy documents, and deprecated assets. Nothing in this folder is active.",
      },
    ],
  },
];

/* ── File tree component ── */

function FileTreeNode({
  node,
  depth,
  selectedFile,
  onSelect,
}: {
  node: FileNode;
  depth: number;
  selectedFile: string | null;
  onSelect: (node: FileNode) => void;
}) {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const isFolder = node.type === "folder";
  const isSelected = selectedFile === node.name;

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (isFolder) setIsOpen(!isOpen);
          onSelect(node);
        }}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
          isSelected
            ? "bg-surface-container-high"
            : "hover:bg-surface-container-low"
        }`}
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
      >
        {isFolder && (
          <span
            className="material-symbols-outlined text-outline transition-transform"
            style={{
              fontSize: 16,
              transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            }}
          >
            chevron_right
          </span>
        )}
        {!isFolder && <span className="w-4" />}
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 18, color: node.color }}
        >
          {node.icon}
        </span>
        <span
          className={`text-sm ${
            isFolder
              ? "font-semibold text-on-surface"
              : "font-medium text-on-surface"
          }`}
        >
          {node.name}
        </span>
      </button>

      {isFolder && isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.name}
              node={child}
              depth={depth + 1}
              selectedFile={selectedFile}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Page ── */

export default function SkillsPage() {
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);

  return (
    <div className="max-w-[960px] mx-auto pb-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-sans text-[2rem] font-bold tracking-[-0.02em] text-on-surface">
          Skills / How It Works
        </h1>
        <p className="text-on-surface-variant text-sm mt-1 max-w-[640px] leading-relaxed">
          The Outbound Engine is powered by a set of Claude skill files. A master
          CLAUDE.md defines the pipeline rules, and each stage has its own prompt
          file that instructs Claude on what to generate and how to format the output.
        </p>
      </div>

      {/* How Claude Skills Work */}
      <section className="bg-surface-container-lowest rounded-xl p-6 shadow-ghost">
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #7c6bc4, #4a90d9)" }}
          >
            <span className="material-symbols-outlined text-white" style={{ fontSize: 20 }}>
              psychology
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-on-surface mb-1">
              What is a Claude Skill?
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
              A skill is a structured set of instructions that tells Claude how to behave
              for a specific task. The CLAUDE.md file at the project root acts as the
              master playbook. It defines communication rules, output constraints, and
              the full pipeline flow. Each stage then has its own prompt file with the
              specific role, task, and output schema for that step.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-surface-container">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>
                    description
                  </span>
                  <span className="text-xs font-semibold text-on-surface uppercase tracking-wide">
                    CLAUDE.md
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Master config. Pipeline rules, cadence constraints, output formats. Read at session start.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-surface-container">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>
                    folder
                  </span>
                  <span className="text-xs font-semibold text-on-surface uppercase tracking-wide">
                    prompts/
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  One file per stage. Each defines the AI role, task, rules, and structured output schema.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-surface-container">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>
                    sync_alt
                  </span>
                  <span className="text-xs font-semibold text-on-surface uppercase tracking-wide">
                    Pipeline
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Each stage feeds its output into the next. Approval gates between stages ensure quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* File explorer */}
      <section className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4">
        {/* Tree panel */}
        <div className="bg-surface-container-lowest rounded-xl shadow-ghost p-3 max-h-[600px] overflow-y-auto">
          <div className="flex items-center gap-2 px-3 py-2 mb-1">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>
              account_tree
            </span>
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
              Skill Structure
            </span>
          </div>
          {skillTree.map((node) => (
            <FileTreeNode
              key={node.name}
              node={node}
              depth={0}
              selectedFile={selectedNode?.name ?? null}
              onSelect={setSelectedNode}
            />
          ))}
        </div>

        {/* Detail / preview panel */}
        <div className="bg-surface-container-lowest rounded-xl shadow-ghost p-5">
          {selectedNode ? (
            <>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 22, color: selectedNode.color }}
                >
                  {selectedNode.icon}
                </span>
                <h3 className="text-base font-semibold text-on-surface">
                  {selectedNode.name}
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                {selectedNode.description}
              </p>

              {selectedNode.preview && (
                <div className="bg-inverse-surface rounded-lg p-4 overflow-x-auto">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-inverse-primary" style={{ fontSize: 14 }}>
                      code
                    </span>
                    <span className="text-[0.6875rem] text-inverse-on-surface/60 font-medium uppercase tracking-wide">
                      Preview
                    </span>
                  </div>
                  <pre className="text-[0.8125rem] text-inverse-on-surface/90 leading-relaxed font-mono">
                    {selectedNode.preview.join("\n")}
                  </pre>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <span className="material-symbols-outlined text-outline mb-3" style={{ fontSize: 36 }}>
                touch_app
              </span>
              <p className="text-sm text-on-surface-variant">
                Select a file from the tree to see its details and preview.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
