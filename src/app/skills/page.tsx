"use client";

import { useState } from "react";

/* ── Content data ── */

interface MdFile {
  name: string;
  path: string;
  icon: string;
  color: string;
  content: string;
}

const claudeMd: MdFile = {
  name: "CLAUDE.md",
  path: "outbound-engine/CLAUDE.md",
  icon: "description",
  color: "#7c6bc4",
  content: `# Applause Outbound Engine

## About
This workspace runs the Applause outbound prospecting pipeline. It takes a target vertical or account list and produces fully researched, scored, and personalized multi-channel cadences ready for SalesLoft deployment. Five stages, each powered by a dedicated skill, managed by an orchestrator agent.

Applause is a crowdtesting platform providing on-demand real-world functional testing across real devices, networks, and locations that automated scripts cannot replicate.

## The 5-Stage Pipeline

| Stage | Skill | What It Produces |
|:------|:------|:-----------------|
| 1. Market Research | forensic-b2b-analyst | Forensic research memo: trigger events, pain points, insider vocabulary, entry points |
| 2. ICP Build | strategic-icp-builder | Target company matrix with fit scores, persona cards, forensic hooks, sales narratives |
| 3. Lead Research | lead-research-assistant | Prioritized contact list with 100-point scores, role classifications, cadence types |
| 4. Outbound Cadences | Cold-cadence-creator-applause | Multi-channel SalesLoft cadences (Email + Phone + LinkedIn) with variants |
| 5. Pipeline Output | Document formatting (docx) | Formatted .docx assembling all stage outputs |

## Workspace Rules
- Pick up files from each stage's \`pipeline/stage-N/inputs/\` folder.
- Save all work to \`pipeline/stage-N/outputs/\`.
- Never delete anything. Create, move, and organize only.
- \`_context/\` is read-only. Applause service descriptions, brand context, ICP research.
- \`_references/\` is read-only. Scoring rubrics, research frameworks, email rules.
- \`_os/\` is the brain. Saved agents, skills, and workspace registry.
- Always load skills from \`_os/skills/\` before using global skills.
- Stage outputs become the next stage's inputs. Follow the sequence.
- Each stage has an approval gate. Do not advance without explicit approval.

## Pipeline Flow Rules
1. Stage 1 output feeds Stage 2. Research memo is required input for ICP builder.
2. Stage 2 output feeds Stage 3. ICP segments and persona cards guide lead scoring.
3. Stage 3 output feeds Stage 4. Prioritized contacts drive cadence generation.
4. Stage 4 output feeds Stage 5. Approved cadences assembled into final document.
5. Never skip stages. Each stage's quality depends on the previous output.

## Email Rules
- Under 100 words per email. 4-6 sentences, 8-10 words each.
- Never use em dashes. Period, comma, or rewrite.
- Email 1 never asks for a meeting. Low-friction CTA only.
- HTML format: \`<div>\` tags with \`<br /><br />\` spacing. No \`<p>\` tags.
- No name after sign-off. SalesLoft appends signature.
- Subject lines: 1-4 words, ~45 chars, lowercase, curiosity-driven.
- NEVER reference breaches, incidents, outages, or bad press about the prospect.
- Do not name customer companies in social proof unless explicitly approved.

## Applause Capabilities
Choose ONE per email based on the prospect's pain:
- Real-world testing across devices, networks, and locations
- Payment and transaction testing in production-like environments
- Localization and in-country testing for global rollouts
- Functional testing to complement automation gaps
- Usability testing to surface friction before launch
- Accessibility testing for compliance and inclusion
- Security testing for login, identity, and payment flows

## Tools and Platforms
- SalesLoft (cadence deployment)
- Apollo.io (lead enrichment)
- LinkedIn Sales Navigator (stakeholder research)
- Google Drive (document storage)
- Slack (team communication)`,
};

const orchestratorMd: MdFile = {
  name: "orchestrator.md",
  path: "_os/agents/orchestrator.md",
  icon: "account_tree",
  color: "#00579f",
  content: `# Outbound Engine Orchestrator

Runs the full Applause outbound prospecting pipeline from market research through pipeline output document generation.

## Role
Orchestrate the 5-stage pipeline, manage handoffs between stages, enforce approval gates, and ensure each stage's output meets quality standards before advancing.

## Capabilities
- Uses all 4 pipeline skills in sequence
- Reads Applause context from \`_context/\`
- Reads reference instructions from \`_references/\`
- Loads product modules for Stage 4 cadence generation
- Manages stage-to-stage data flow
- Tracks pipeline state and reports progress

## Stage Execution

### Stage 1: Market Research
- **Skill:** forensic-b2b-analyst
- **Input:** Target vertical or account list
- **Output:** Forensic research memo with company snapshots, trigger events, pain points, insider vocabulary, strategic entry points
- **Gate:** Review for accuracy, specificity, and disqualification flags

### Stage 2: ICP Build
- **Skill:** strategic-icp-builder
- **Input:** Stage 1 research memo
- **Output:** Target Company Matrix with Applause Fit Scores, persona cards, forensic hooks, sales narratives
- **Gate:** Confirm ICP segments, persona types, and hooks match the target market

### Stage 3: Lead Research + Scoring
- **Skill:** lead-research-assistant
- **Input:** Stage 2 ICP package
- **Output:** Prioritized contact list ranked across all companies (100-point scores, role classifications, cadence types)
- **Gate:** Verify lead quality, scoring accuracy, cadence type assignments

### Stage 4: Outbound Cadences
- **Skill:** Cold-cadence-creator-applause
- **Input:** Stage 3 prioritized contact list
- **Output:** Multi-channel SalesLoft cadences (Email + Phone + LinkedIn) with 2-3 email variants per step
- **Gate:** All emails under 100 words, no em dashes, correct HTML formatting, cadence types match Stage 3

### Stage 5: Pipeline Output Document
- **Input:** Approved outputs from Stages 1-4
- **Output:** Formatted .docx with company profiles, persona cards, contact list, cadences, and pipeline summary
- **Gate:** Final review. Document must render correctly and match upstream outputs.

## Constraints
- Never skip a stage. Each depends on the previous stage's approved output.
- Never advance past an approval gate without explicit user confirmation.
- All output goes to \`pipeline/stage-N/outputs/\` for human review.
- Follow all email rules from CLAUDE.md.`,
};

const skillFiles: MdFile[] = [
  {
    name: "forensic-b2b-analyst/SKILL.md",
    path: "_os/skills/forensic-b2b-analyst/SKILL.md",
    icon: "search",
    color: "#7c6bc4",
    content: `# Forensic B2B Analyst (Level 5)

Elite strategic intelligence unit specializing in "Zero-Guesswork" B2B strategy. Constructs ICPs using only verifiable digital evidence of current market pain.

## Core Directive

You are a filter, not a sponge. The internet is polluted with AI-generated content and competitor marketing. Ruthlessly discard 90% to isolate the 10% of raw, human, "bleeding neck" reality.

## Phase 1: Synthetic Content Firewall

Every source must pass two checks before use:

**Vendor Camouflage Check (Anti-Marketing)**
- DISCARD: Problem > Agitation > Solution structure
- DISCARD: "How I used to have this problem" (retrospective success)
- DISCARD: Contains CTAs or links
- KEEP ONLY: Active suffering. "Help needed," "Rant," "I am drowning," specific complaints without happy endings.

**LLM Fingerprint Check (Anti-AI)**
- Reject hedging language ("It seems," "One might argue")
- Reject perfect sentence rhythm or formatted structure
- Reject: leverage, harness, unleash, delve, synergy, game-changing, transformative, seamless, holistic

## Phase 2: Dynamic Source Triangulation

Search where Active Sufferers congregate:
- Review Platforms (1-3 stars only): G2, Capterra, TrustRadius. Focus on "Cons."
- Professional Forums: Reddit niche subs, HackerNews, industry boards
- Social Complaint Threads: LinkedIn arguments, Twitter/X replies

Goal: Find the "Operational Friction" between what they need and the tools they have.

## Phase 3: Output - Strategic ICP Memo

### 1. The Reality Snapshot
- The Trigger Event: Precise moment forcing a search
- The "Bleeding Neck" (Verbatim): What they actually type into Google
- The Enemy: What they currently use that is failing them

### 2. The Psychological Architecture
- The "Silent Objection": #1 unstated reason for vendor skepticism
- The "Green Light" Outcome: Business result that overrides skepticism
- Insider Vocabulary: 5 slang terms only a true insider would know

### 3. Strategic Entry Points
- Angle 1 (The Callout): Direct address of operational pain
- Angle 2 (The Villain): Blame the old mechanism
- Angle 3 (The Result): The specific "Green Light" outcome
- Blue Ocean Gap: A need market leaders are ignoring

## Phase 4: Evidence Table (Mandatory)

Must provide at least 5 distinct sources:

| Source Type | Platform | Verbatim Quote | Analysis |
|:---|:---|:---|:---|

No unverified claims. Every insight must trace back to a source.`,
  },
  {
    name: "strategic-icp-builder/SKILL.md",
    path: "_os/skills/strategic-icp-builder/SKILL.md",
    icon: "person_search",
    color: "#2db87e",
    content: `# Strategic ICP Builder

Transform raw market research into precision-targeted sales intelligence. Sits between forensic research (input) and content creation (output).

## Input

Accepts output from forensic-b2b-analyst containing verified pain points, operational friction, insider vocabulary, and failing tools/solutions.

## Phase 1: Target Organization Profile

### Organization Criteria Matrix

| Dimension | Specification |
|:---|:---|
| Revenue Threshold | Minimum revenue (pain scales with size) |
| Geographic Complexity | Number of markets/regions |
| Tech Stack Indicators | Migration signals, legacy systems |
| Release Cadence | Weekly, bi-weekly, continuous |
| Organizational Signals | Leadership changes, M&A, IPO prep |

### Segment Identification

2-3 distinct ICP segments:
1. Primary Segment: Highest pain + budget + shortest sales cycle
2. Migration Segment: Active transition (platform changes, expansion)
3. Innovation Segment: Early adopters of emerging tech

## Phase 2: Decision-Maker Persona Matrix

For each segment, build 3 personas representing the buying committee:

**Persona Template:**
- Primary Pain (their daily nightmare)
- Success Metric (what they're measured on)
- Silent Objection (why they hesitate)
- Green Light Trigger (what overcomes objection)
- Forensic Hook (pain-specific opening line)

### Standard Buying Committee

| Persona | Focus | Pain Pattern |
|:---|:---|:---|
| Revenue Owner (VP Sales/Digital) | Conversion, pipeline, revenue | Silent losses, unexplained drops |
| Technical Owner (CTO/VP Eng) | Capacity, velocity, tech debt | Burnout, unplanned work, coverage gaps |
| Experience Owner (VP CX/Product) | Brand, NPS, satisfaction | Inconsistent experiences, trust erosion |

## Phase 3: Sales Narrative Framework

3-4 narratives translating research into stories:

1. The Hidden Cost Narrative: Small problems with massive cumulative impact
2. The Coverage Gap Narrative: What internal teams cannot replicate
3. The Velocity vs. Quality Narrative: Speed creating invisible risk
4. The ROI Recovery Narrative: Investment payback with specific metrics

Each needs: Cost Anchor, Visibility Gap, Proof Point, Differentiated Solution.

## Phase 4: Output - Strategic ICP Package

1. Executive Summary (target market, pain thesis, differentiation)
2. ICP Segment Profiles (firmographics, market size, entry point)
3. Persona Cards (role, pain with verbatim evidence, forensic hook, objection handling)
4. Sales Narrative Scripts (hook, pain amplification, solution, CTA)
5. Evidence Appendix (verbatim quotes, sources, quantified impact)

## Handoff

Output enables content creation of cold emails, LinkedIn outreach, call scripts, and landing page copy. Each element tagged with target persona, funnel stage, and narrative alignment.`,
  },
  {
    name: "lead-research-assistant/SKILL.md",
    path: "_os/skills/lead-research-assistant/SKILL.md",
    icon: "leaderboard",
    color: "#4a90d9",
    content: `# Lead Research Assistant

Identifies high-quality leads by analyzing your business, searching for target companies, and providing actionable contact strategies.

## What This Skill Does

1. Understands Your Business: Analyzes product/service, value proposition, target market
2. Identifies Target Companies: Matches against industry, size, tech stack, growth stage, pain points
3. Prioritizes Leads: Ranks on fit score and relevance using 100-point rubric
4. Provides Contact Strategies: Personalized approach for each lead
5. Enriches Data: Gathers decision-maker info and company context

## Workflow

### 1. Understand the Product/Service
- Analyze codebase if available for automatic context
- Identify key features, benefits, and problems solved
- Ask clarifying questions about value proposition

### 2. Define Ideal Customer Profile
- Target industries and sectors
- Company size ranges
- Geographic preferences
- Relevant pain points
- Technology requirements

### 3. Research and Identify Leads
- Search for companies matching criteria
- Look for signals: job postings, tech stack, recent news
- Consider growth indicators: funding, expansion, hiring
- Check for budget indicators

### 4. Prioritize and Score
Score each lead using 100-point rubric from scoring_instructions.txt:
- Seniority + Function + Triggers + Company Fit
- Alignment with ICP
- Signals of immediate need
- Competitive landscape and timing

### 5. Output Per Lead

- Company Name and website
- Why They're a Good Fit (specific reasons)
- Score: 100-point breakdown
- Decision Maker: Role/title to target
- Contact Strategy: Personalized approach
- Value Proposition: How product solves their specific problem
- Conversation Starters: Specific points for outreach
- LinkedIn URL if available

### 6. Summary Format

Results include:
- Total leads found
- High priority count (80-100)
- Medium priority count (50-79)
- Average score
- Individual lead cards with full detail

## Handoff

Output feeds directly into Stage 4 (Cold Cadence Creator) for multi-channel sequence generation. Lead scores determine cadence type assignment.`,
  },
  {
    name: "Cold-cadence-creator-applause/SKILL.md",
    path: "_os/skills/Cold-cadence-creator-applause/SKILL.md",
    icon: "mail",
    color: "#d4843e",
    content: `# Cold Cadence Creator - Applause

Generate multi-channel SalesLoft cadences that get replies, not spam complaints.

## Architecture

Two-layer system:

**Layer 1: Engine (this file)** - Channel-agnostic rules: 5-sentence framework, SalesLoft HTML spec, phone talk tracks, LinkedIn sequence logic, cadence structures, guardrails, QA checklist.

**Layer 2: Product Modules (references/)** - Product-specific positioning, messaging blocks, subject lines, CTA variations, success stories, and few-shot examples.

### Module Loading

| Product | Reference File |
|:--------|:---------------|
| Manual Functional Testing / crowdtesting | references/manual-functional-testing.md |
| Automated Functional Testing | references/automated-functional-testing.md |
| Integrated Functional Testing | references/integrated-functional-testing.md |
| Accessibility Testing / WCAG / EAA | references/accessibility-testing.md |
| Payment Testing / checkout | references/payment-testing.md |
| Customer Journey Testing / CX | references/customer-journey-testing.md |
| User Experience Testing / usability | references/user-experience-testing.md |
| AI Training and Testing / red teaming | references/ai-training-and-testing.md |
| Voice Testing / conversational AI | references/voice-testing.md |
| Security Testing / pentesting | references/security-testing.md |

Always load references/success-stories.md alongside any product module.

## Core Principles

1. Start with them, not you. Sentence 1 is always about the prospect's world.
2. One idea per touch. One capability, one CTA, one reason to respond.
3. Multi-channel pressure. Email opens the door, phone creates urgency, LinkedIn builds familiarity.
4. Low-friction CTAs. Email 1 never asks for a meeting.
5. Mobile readability. Every email must pass the phone test. Each sentence block gets a blank line between it and the next for visual spacing.

## The 5-Sentence Framework

Every email scannable in under 11 seconds. Each sentence has one job.

| Sentence | Purpose | Strategy |
|:---------|:--------|:---------|
| Sentence 1 | Pattern Interrupt | Start with them, not "I" |
| Sentences 2-4 | Value Delivery | Problem, proof, how Applause helps |
| Sentence 5 | Conversion | Interest-based CTA |
| Whitespace | The Hook | Line breaks hide body in preview pane |

1. The Observation: Hyper-relevant fact from positive signals. Never "I" or "We." Never negative events.
2. The Problem: Connect observation to a role-specific pain point.
3. The Credibility: One sentence on how Applause helped a similar company.
4. The Solution: Brief operational "how" without pitching.
5. The CTA: Interest-based question, not a meeting request.

## Email Rules

- 40 to 100 words per email. 4-6 sentences, 8-10 words each.
- Lines: 50-75 characters (80 max).
- No em dashes. Period, comma, or rewrite.
- Email 1 never asks for a meeting.
- Subject lines: 1-4 words, lowercase, curiosity-driven.
- HTML: \`<div>\` tags with \`<br /><br />\`. No \`<p>\` tags.
- No name after sign-off. "Best," stands alone. SalesLoft appends signature.
- 2-3 variants per email step using different angles.

## Stage 3 Integration: Auto-Read Lead List

When running inside the pipeline, read Stage 3 output and parse the Personalization Block for every contact:

| Block Field | What It Provides |
|:------------|:-----------------|
| Contact Name, Title, Company | SalesLoft variables and tone calibration |
| Score + Role Classification | Cadence structure selection |
| Cadence Type | Pre-assigned from Stage 3. Do not override. |
| Applause Capability Match | Product module selection |
| Trigger Signals | Sentence 1 (Observation). Each trigger feeds a variant. |
| Pain Points | Sentence 2 (Problem/Insight). Role-specific. |
| Company Initiatives | Context for Sentences 1-2. |
| Insider Vocabulary | Word choice across all channels. |
| Success Story Match | Sentence 3 (Credibility). Pre-matched proof. |

If a personalization block is missing, stop and flag it. Do not generate from summary tables alone.

### Personalization Field Mapping

| Email Element | Primary Source |
|:-------------|:--------------|
| Sentence 1 | Trigger Signals + Company Initiatives |
| Sentence 2 | Pain Points (use Insider Vocabulary) |
| Sentence 3 | Success Story Match |
| Sentence 4 | Product Module core positioning |
| Sentence 5 | Product Module CTA variations |
| Subject line | Insider Vocabulary + Trigger Signals |
| Tone | Role Classification |

## Phone Rules

- Talk track: 30 seconds max before asking a question.
- Voicemail: Under 20 seconds.
- Always reference the same initiative/pain from the email.
- Includes objection handling for common responses.

## LinkedIn Rules

Three distinct actions with specific timing:
1. Profile View (warm-up, no message)
2. Connection Request (under 300 chars, no pitch, no Applause mention)
3. Follow-up Message/InMail (under 75 words, casual CTA)

## Cadence Structures

| Type | Duration | Touches | For |
|:-----|:---------|:--------|:----|
| Compact | 7 days | 5 touches | Champions (60-79), Influencers (50-59) |
| Standard | 14 days | 8-10 touches | Technical Buyers (70-89) |
| Extended | 21 days | 12 touches | Economic Buyers (80-100) |

Separate cadences per persona. Never combine personas into one cadence.

## Guardrails

- NEVER reference breaches, incidents, outages, bad press, or negative events.
- Lead with benefits and outcomes, not past failures.
- Position Applause as augmenting internal teams, not replacing them.
- No em dashes, no exclamation marks, no name after sign-off.
- Social proof from references/success-stories.md only. One sentence max.

## QA Checklist

- [ ] Product module loaded and positioning applied
- [ ] 40 to 100 words per email (4-6 sentences, 8-10 words, 50-75 chars/line)
- [ ] No em dashes, no exclamation marks, no name after sign-off
- [ ] No references to negative events about the prospect
- [ ] Does not start with "I" or "We"
- [ ] No meeting ask in Email 1
- [ ] Each variant uses a genuinely different angle
- [ ] Personalization block consumed for every contact
- [ ] Sentence 1 uses trigger signal from personalization block
- [ ] Sentence 2 uses role-specific pain from personalization block
- [ ] Sentence 3 uses pre-matched success story
- [ ] Insider vocabulary used in word choice
- [ ] Phone talk track references trigger signal or company initiative
- [ ] LinkedIn connection request references company initiative`,
  },
];


/* ── Markdown renderer (basic) ── */

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Table block: collect consecutive | lines, skip separator row
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        // Skip separator rows like |:---|:---|
        if (!/^\|[\s:-]+\|$/.test(lines[i].trim())) {
          tableLines.push(lines[i]);
        }
        i++;
      }
      if (tableLines.length > 0) {
        const headerCells = tableLines[0]
          .split("|")
          .filter((c) => c.trim())
          .map((c) => c.trim());
        const bodyRows = tableLines.slice(1).map((row) =>
          row
            .split("|")
            .filter((c) => c.trim())
            .map((c) => c.trim())
        );
        elements.push(
          <div key={`table-${i}`} className="my-3 overflow-x-auto rounded-lg">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-inverse-on-surface/15">
                  {headerCells.map((cell, ci) => (
                    <th
                      key={ci}
                      className="text-left py-1.5 px-2 font-semibold text-inverse-on-surface/90"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri} className="border-b border-inverse-on-surface/8">
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="py-1.5 px-2 text-inverse-on-surface/75"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h4 key={i} className="text-sm font-semibold text-inverse-on-surface mt-4 mb-1">
          {line.replace("### ", "")}
        </h4>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h3 key={i} className="text-sm font-bold text-inverse-on-surface mt-5 mb-1.5">
          {line.replace("## ", "")}
        </h3>
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <h2 key={i} className="text-base font-bold text-inverse-on-surface mb-2">
          {line.replace("# ", "")}
        </h2>
      );
    } else if (line.startsWith("```")) {
      // skip
    } else if (/^\d+\.\s\*\*/.test(line)) {
      const match = line.match(/^\d+\.\s\*\*(.+?)\*\*\s*(.*)$/);
      if (match) {
        elements.push(
          <p key={i} className="text-xs text-inverse-on-surface/80 leading-relaxed pl-3">
            <span className="font-semibold text-inverse-on-surface/95">{match[1]}</span>{" "}
            {match[2]}
          </p>
        );
      }
    } else if (line.startsWith("- **")) {
      const match = line.match(/^- \*\*(.+?)\*\*\s*(.*)$/);
      if (match) {
        elements.push(
          <p key={i} className="text-xs text-inverse-on-surface/80 leading-relaxed pl-3">
            <span className="font-semibold text-inverse-on-surface/95">{match[1]}</span>{" "}
            {match[2]}
          </p>
        );
      }
    } else if (line.startsWith("- ")) {
      elements.push(
        <p key={i} className="text-xs text-inverse-on-surface/80 leading-relaxed pl-3">
          {line.replace("- ", "• ")}
        </p>
      );
    } else if (/^\d+\.\s/.test(line)) {
      elements.push(
        <p key={i} className="text-xs text-inverse-on-surface/80 leading-relaxed pl-3">
          {line}
        </p>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-1.5" />);
    } else {
      elements.push(
        <p key={i} className="text-xs text-inverse-on-surface/80 leading-relaxed">
          {line.replace(/`([^`]+)`/g, "⌜$1⌝")}
        </p>
      );
    }
    i++;
  }

  return elements;
}

/* ── Folder tree (left sidebar) ── */

function FolderTree({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (f: MdFile) => void;
}) {
  const [osOpen, setOsOpen] = useState(true);
  const [skillsOpen, setSkillsOpen] = useState(true);

  const TreeFile = ({ file, depth }: { file: MdFile; depth: number }) => (
    <button
      type="button"
      onClick={() => onSelect(file)}
      className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition-colors ${
        selected === file.path ? "bg-surface-container-high" : "hover:bg-surface-container-low"
      }`}
      style={{ paddingLeft: `${depth * 16 + 12}px` }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 16, color: file.color }}>
        {file.icon}
      </span>
      <span className="text-xs font-medium text-on-surface truncate">{file.name}</span>
    </button>
  );

  const Chevron = ({ open }: { open: boolean }) => (
    <span
      className="material-symbols-outlined text-outline transition-transform"
      style={{ fontSize: 14, transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
    >
      chevron_right
    </span>
  );

  const Folder = ({
    name,
    depth,
    open,
    onToggle,
    children,
  }: {
    name: string;
    depth: number;
    open: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  }) => (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-left hover:bg-surface-container-low"
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        <Chevron open={open} />
        <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 16 }}>
          folder
        </span>
        <span className="text-xs font-semibold text-on-surface">{name}</span>
      </button>
      {open && children}
    </div>
  );

  return (
    <div className="space-y-0.5">
      {/* CLAUDE.md at root */}
      <TreeFile file={claudeMd} depth={0} />

      {/* _os folder */}
      <Folder name="_os/" depth={0} open={osOpen} onToggle={() => setOsOpen(!osOpen)}>
        {/* agents */}
        <Folder name="agents/" depth={1} open={true} onToggle={() => {}}>
          <TreeFile file={orchestratorMd} depth={2} />
        </Folder>

        {/* skills */}
        <Folder name="skills/" depth={1} open={skillsOpen} onToggle={() => setSkillsOpen(!skillsOpen)}>
          {skillFiles.map((f) => (
            <TreeFile key={f.path} file={f} depth={2} />
          ))}
        </Folder>
      </Folder>
    </div>
  );
}

/* ── Embeddable Skills Section ── */

export function SkillsSection() {
  const [selected, setSelected] = useState<MdFile | null>(claudeMd);

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-on-surface">
          Skills &amp; Architecture
        </h2>
        <span className="text-xs text-outline font-medium px-2 py-0.5 rounded-md bg-surface-container">
          CLAUDE.md + 5 agents
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4">
        {/* Tree panel */}
        <div className="bg-surface-container-lowest rounded-xl shadow-ghost p-3 max-h-[500px] overflow-y-auto">
          <div className="flex items-center gap-2 px-3 py-2 mb-1">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>
              folder_open
            </span>
            <span className="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-wide">
              outbound-engine
            </span>
          </div>
          <FolderTree selected={selected?.path ?? null} onSelect={setSelected} />
        </div>

        {/* Content panel */}
        <div className="bg-surface-container-lowest rounded-xl shadow-ghost overflow-hidden">
          {selected ? (
            <>
              <div className="flex items-center gap-3 px-5 py-3 border-b border-outline-variant/15">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18, color: selected.color }}
                >
                  {selected.icon}
                </span>
                <span className="text-sm font-semibold text-on-surface">{selected.path}</span>
              </div>
              <div className="bg-inverse-surface rounded-b-xl p-5 max-h-[420px] overflow-y-auto">
                {renderMarkdown(selected.content)}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <span className="material-symbols-outlined text-outline mb-3" style={{ fontSize: 32 }}>
                touch_app
              </span>
              <p className="text-sm text-on-surface-variant">
                Select a file to view its contents.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Page (kept for direct /skills route) ── */

export default function SkillsPage() {
  return (
    <div className="max-w-[960px] mx-auto pb-12 space-y-6">
      <SkillsSection />
    </div>
  );
}
