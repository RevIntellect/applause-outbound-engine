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
    name: "outbound-engine/",
    type: "folder",
    icon: "folder",
    color: "#00579f",
    description: "Root project directory. The Applause outbound prospecting engine, organized into agents/skills, a 5-stage pipeline with inputs/outputs, stage guides, references, and context.",
    children: [
      {
        name: "CLAUDE.md",
        type: "file",
        icon: "description",
        color: "#7c6bc4",
        description:
          "The master project instructions file. Defines the full pipeline, communication rules, cadence constraints, stage flow, and all output formats. Claude reads this at the start of every session.",
        preview: [
          "# The Applause Outbound Engine",
          "",
          "## About",
          "Executes the full Applause outbound prospecting pipeline",
          "in a single interface.",
          "",
          "## Communication Rules",
          "- Be concise and direct. No filler.",
          "- Never use em dashes.",
          "- Default output formats: .md for drafts, .docx for deliverables.",
          "",
          "## Stage Flow",
          "Stage 1: Market Research (Forensic B2B Analysis)",
          "Stage 2: ICP Build (Persona matrix, segments, hooks)",
          "Stage 3: Lead Research (Scoring + role classification)",
          "Stage 4: Outbound Cadences (Multi-channel sequences)",
          "Stage 5: Pipeline Output (Compile to deliverable)",
        ],
      },
      {
        name: "_os/",
        type: "folder",
        icon: "smart_toy",
        color: "#7c6bc4",
        description: "Agents and skills. The AI personas that power each stage of the pipeline. Each agent has a defined role, task, and output schema.",
        children: [
          {
            name: "orchestrator.md",
            type: "file",
            icon: "hub",
            color: "#7c6bc4",
            description:
              "The pipeline orchestrator. Coordinates handoffs between stages, manages approval gates, and ensures output from each stage feeds correctly into the next.",
            preview: [
              "# Pipeline Orchestrator",
              "",
              "## Role",
              "You coordinate the full outbound pipeline from intake",
              "to deliverable. You route inputs to the correct agent,",
              "validate outputs, and manage stage transitions.",
              "",
              "## Responsibilities",
              "- Accept account list from rep intake",
              "- Route to Stage 1 (Forensic Analyst)",
              "- Validate and approve stage outputs",
              "- Manage pipeline state and progression",
              "- Compile final deliverable",
            ],
          },
          {
            name: "forensic-analyst.md",
            type: "file",
            icon: "search",
            color: "#7c6bc4",
            description:
              "Stage 1 agent. Forensic B2B research analyst. Scans for buying signals, competitive landscape, pain discovery, and market triggers.",
            preview: [
              "# Forensic Research Analyst",
              "",
              "## Role",
              "You are a forensic B2B research analyst specializing in",
              "identifying high-value buying signals for outbound sales.",
              "",
              "## Task",
              "Analyze each company for:",
              "- Active buying signals (hiring, funding, tech changes)",
              "- Competitive displacement opportunities",
              "- Pain indicators mapped to Applause solutions",
            ],
          },
          {
            name: "icp-builder.md",
            type: "file",
            icon: "person_search",
            color: "#2db87e",
            description:
              "Stage 2 agent. Strategic ICP builder. Builds persona matrices, enriches leads, and scores contacts by fit and intent.",
            preview: [
              "# Strategic ICP Builder",
              "",
              "## Role",
              "You are a strategic ICP builder and lead enrichment agent.",
              "",
              "## Task",
              "Build enriched lead profiles for each account:",
              "- Score contacts 1-100 on data quality and fit",
              "- Tag enrichment signals (LinkedIn, email, Crunchbase)",
              "- Flag low-signal leads for manual review",
            ],
          },
          {
            name: "lead-research-assistant.md",
            type: "file",
            icon: "leaderboard",
            color: "#4a90d9",
            description:
              "Stage 3 agent. Lead research assistant. Deep research on approved leads. Classifies by buyer role and maps pain points to individuals.",
            preview: [
              "# Lead Research Assistant",
              "",
              "## Role",
              "You are a lead research and scoring specialist.",
              "",
              "## Task",
              "- Score each lead 1-100 on outreach priority",
              "- Classify: Economic Buyer, Technical Buyer,",
              "  Champion, or Influencer",
              "- Map specific pain points to each individual",
            ],
          },
          {
            name: "cadence-creator.md",
            type: "file",
            icon: "mail",
            color: "#d4843e",
            description:
              "Stage 4 agent. Cold outbound cadence creator. Generates multi-channel sequences with strict word limits across email, LinkedIn, and phone.",
            preview: [
              "# Cadence Creator",
              "",
              "## Role",
              "You are a cold outbound cadence specialist.",
              "",
              "## Cadence Rules (STRICT)",
              "Email: 120-word max. No em dashes.",
              "Phone: Talk track under 30 sec.",
              "LinkedIn: Connection request under 300 chars.",
            ],
          },
        ],
      },
      {
        name: "pipeline/",
        type: "folder",
        icon: "route",
        color: "#2db87e",
        description: "The 5-stage pipeline. Each stage has its own folder with inputs/ and outputs/ subdirectories. Data flows from stage 1 through stage 5 sequentially.",
        children: [
          {
            name: "stage-1-market-research/",
            type: "folder",
            icon: "search",
            color: "#7c6bc4",
            description:
              "Stage 1: Market Research. Forensic B2B analysis. Inputs are account lists. Outputs are signal cards with priority scores and buying triggers.",
            children: [
              { name: "inputs/", type: "folder", icon: "input", color: "#7c6bc4", description: "Account lists, vertical context, and targeting criteria submitted by reps." },
              { name: "outputs/", type: "folder", icon: "output", color: "#7c6bc4", description: "Signal cards, priority rankings, competitor analysis, and pain mapping per account." },
            ],
          },
          {
            name: "stage-2-icp-build/",
            type: "folder",
            icon: "person_search",
            color: "#2db87e",
            description:
              "Stage 2: ICP Build. Persona matrices and lead enrichment. Inputs are Stage 1 signals. Outputs are enriched lead profiles with scores.",
            children: [
              { name: "inputs/", type: "folder", icon: "input", color: "#2db87e", description: "Stage 1 signal output, account priority data." },
              { name: "outputs/", type: "folder", icon: "output", color: "#2db87e", description: "ICP personas, enriched lead profiles, scoring matrices." },
            ],
          },
          {
            name: "stage-3-lead-research/",
            type: "folder",
            icon: "leaderboard",
            color: "#4a90d9",
            description:
              "Stage 3: Lead Research. Scoring and role classification. Inputs are ICP profiles. Outputs are scored leads with pain-to-person mapping.",
            children: [
              { name: "inputs/", type: "folder", icon: "input", color: "#4a90d9", description: "Stage 2 ICP profiles and enrichment data." },
              { name: "outputs/", type: "folder", icon: "output", color: "#4a90d9", description: "Scored lead list, role classifications, cadence type assignments." },
            ],
          },
          {
            name: "stage-4-outbound-cadences/",
            type: "folder",
            icon: "mail",
            color: "#d4843e",
            description:
              "Stage 4: Outbound Cadences. Multi-channel sequence generation. Inputs are scored leads. Outputs are complete cadences per contact.",
            children: [
              { name: "inputs/", type: "folder", icon: "input", color: "#d4843e", description: "Stage 3 scored leads with role and pain mapping." },
              { name: "outputs/", type: "folder", icon: "output", color: "#d4843e", description: "Full cadences: emails, LinkedIn messages, phone scripts per contact." },
            ],
          },
          {
            name: "stage-5-pipeline-output/",
            type: "folder",
            icon: "download",
            color: "#c94e7c",
            description:
              "Stage 5: Pipeline Output. Final compilation. Inputs are all prior stage outputs. Output is the complete deliverable document.",
            children: [
              { name: "inputs/", type: "folder", icon: "input", color: "#c94e7c", description: "All outputs from stages 1-4." },
              { name: "outputs/", type: "folder", icon: "output", color: "#c94e7c", description: "Final compiled Google Doc / .docx deliverable for the rep." },
            ],
          },
        ],
      },
      {
        name: "guides/",
        type: "folder",
        icon: "menu_book",
        color: "#455e8c",
        description: "Stage guides. Step-by-step instructions for each pipeline stage, defining inputs, process, and expected outputs.",
        children: [
          { name: "stage-1-market-research.md", type: "file", icon: "search", color: "#7c6bc4", description: "Guide for Stage 1: how to run forensic B2B analysis, what signals to look for, and how to structure output." },
          { name: "stage-2-icp-build.md", type: "file", icon: "person_search", color: "#2db87e", description: "Guide for Stage 2: how to build ICP profiles, scoring criteria, and enrichment signal definitions." },
          { name: "stage-3-lead-research.md", type: "file", icon: "leaderboard", color: "#4a90d9", description: "Guide for Stage 3: lead scoring methodology, role classification rules, and cadence assignment criteria." },
          { name: "stage-4-outbound-cadences.md", type: "file", icon: "mail", color: "#d4843e", description: "Guide for Stage 4: cadence rules, word limits, channel-specific constraints, and sequence pacing by buyer role." },
          { name: "stage-5-pipeline-output.md", type: "file", icon: "download", color: "#c94e7c", description: "Guide for Stage 5: document compilation format, section structure, and delivery workflow." },
        ],
      },
      {
        name: "_references/",
        type: "folder",
        icon: "library_books",
        color: "#d4843e",
        description: "Output format template and reference documentation. Defines the structure and formatting standards for all pipeline deliverables.",
        children: [
          { name: "output-format-template.md", type: "file", icon: "article", color: "#d4843e", description: "The canonical output format template. Defines section headers, table structures, and formatting for the final deliverable." },
          { name: "README.md", type: "file", icon: "description", color: "#d4843e", description: "Reference documentation overview and index." },
        ],
      },
      {
        name: "_context/",
        type: "folder",
        icon: "info",
        color: "#727782",
        description: "Context files. Background information about Applause, the sales team, and the market that agents reference during pipeline execution.",
        children: [
          { name: "README.md", type: "file", icon: "description", color: "#727782", description: "Context overview. Company background, product positioning, competitive landscape, and target market definitions." },
        ],
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
          The Outbound Engine is powered by a set of Claude agents and a structured
          pipeline. CLAUDE.md defines the rules. The _os/ folder contains 5 agent
          personas. The pipeline/ folder has 5 stages, each with inputs and outputs.
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
              The engine uses a multi-agent architecture. CLAUDE.md at the root defines
              the pipeline rules and constraints. The _os/ folder contains agent definitions,
              each with a specific persona, task, and output schema. The pipeline/ folder
              organizes the 5-stage flow with inputs/ and outputs/ directories per stage.
              Stage guides in guides/ document the process for each step.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
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
                    smart_toy
                  </span>
                  <span className="text-xs font-semibold text-on-surface uppercase tracking-wide">
                    _os/
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Agent definitions. Orchestrator, forensic analyst, ICP builder, lead researcher, cadence creator.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-surface-container">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>
                    route
                  </span>
                  <span className="text-xs font-semibold text-on-surface uppercase tracking-wide">
                    pipeline/
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  5 stages, each with inputs/ and outputs/ folders. Data flows sequentially through each stage.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-surface-container">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>
                    menu_book
                  </span>
                  <span className="text-xs font-semibold text-on-surface uppercase tracking-wide">
                    guides/
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Stage guides defining process, inputs, and expected outputs for each pipeline step.
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
