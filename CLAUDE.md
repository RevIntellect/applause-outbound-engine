# The Applause Outbound Engine

## About

A standalone Next.js web application that executes the full Applause outbound prospecting pipeline in a single interface. Built by Aaron Wolf, Sr. Manager of Sales Effectiveness at Applause.

Applause is a crowdtesting platform providing on-demand real-world functional testing across real devices, networks, and locations that automated scripts can't replicate.

## Communication Rules

- Be concise and direct. No filler.
- Never use em dashes. Use a period, comma, or rewrite the sentence.
- Never use the phrase "at the intersection."
- Default output formats: .md for drafts, .docx for deliverables.

## Safety Rules

- Never delete files. Only move or create.
- Always ask before overwriting an existing file.
- Ask clarifying questions before executing complex work.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript, Turbopack)
- **Styling:** Tailwind CSS with custom design tokens (see DESIGN_SYSTEM.md)
- **Fonts:** Manrope (headlines), Inter (body/data)
- **Icons:** Material Symbols Outlined (Google Fonts)
- **Deployment:** Vercel
- **Branch:** `applause-outbound-engine`

## Phase 1 Scope (Current Build)

Five pipeline stages. All content generation powered by Claude API. No external data APIs in v1.

### Stage Flow

```
New Campaign (entry form)
  -> Stage 1: Discovery (Forensic B2B Analysis)
  -> Stage 2: ICP Builder (Persona matrix, segments, hooks)
  -> Stage 3: Lead Research (Claude-powered lead list + scoring)
  -> Stage 4: Campaign/Cadence (Multi-channel SalesLoft sequences)
  -> Stage 5: Export (Compile all outputs to .docx for Google Docs)
```

### Stage Details

**New Campaign (Entry Point)**
- Form: Target B2B Audience (dropdown), Core Business Problem (textarea), Applause Solutions (textarea)
- "How it works" sidebar explanation
- Buttons: "Create Campaign" (primary CTA) + "Save as Draft"
- On submit: creates campaign object, navigates to Stage 1

**Stage 1: Discovery / Forensic B2B Analysis**
- Layout: Two-column. Left panel shows "Active Data Streams" with scanning status indicators. Right panel shows "Discovered Signals & Triggers" as company cards.
- Each signal card shows: Company name, industry tag, employee count, priority badge (HIGH/MEDIUM/LOW), key signal quote, target persona roles.
- Bottom bar: Agent status indicator ("AGENT: FORENSIC ANALYST 01"), processing stats.
- Stats panel: Pipeline Health accuracy %, processing latency, token consumption.
- Actions: "Rerun Agent" button, "Approve Research" primary CTA (navigates to Stage 2).
- API: Claude call using forensic-b2b-analyst prompt logic.
- Approval gate required before advancing.

**Stage 2: ICP Builder / Lead Enrichment**
- Layout: Data table with lead cards showing: avatar, name, title, company, AI Data Score (large number), enrichment signal badges (LinkedIn, Crunchbase, Email Verified, etc.), status chip (ENRICHED/PENDING/LOW SIGNAL), "Approval Check" action button.
- Filter tabs: "All Scores" and "High Intent (>80)"
- Sort by rank toggle.
- Right sidebar: Live Pipeline card showing leads waiting approval count, "Approve Selected Leads" CTA.
- Stats row: Enrichment Accuracy %, Data Freshness (time ago), Flagged for Review count.
- Bottom cards: Data Decay Alert, Top Profile Fit, Source Performance.
- Actions: Approve individual leads or batch approve.
- API: Claude call using strategic-icp-builder prompt logic.
- Approval gate required before advancing.

**Stage 3: Lead Research / Scoring**
- In Phase 1, this is Claude-powered research (no Apollo API).
- Claude generates lead list based on ICP output from Stage 2.
- Leads scored 1-100, classified by role (Economic Buyer, Technical Buyer, Champion, Influencer).
- Pain-to-person mapping for personalized outreach.
- Approval gate required before advancing.

**Stage 4: Campaign / Sequencing Strategy**
- Layout: Left panel shows a vertical timeline of touchpoints. Right sidebar shows Sequence Score, Approved Leads summary, Execution Settings.
- Touchpoint cards: Day number badge, channel icon (LinkedIn/Email), touchpoint title, description, metadata tags (e.g., "CASE STUDY ATTACHED", "09:00 AM LOCAL").
- Touchpoint types: LinkedIn Connection Request, Value-First Email, LinkedIn Follow-up, Phone Call, etc.
- "Add New Touchpoint" button at bottom of timeline.
- Sequence Score: percentage with quality assessment text.
- AI Optimizer: suggestion chip (e.g., "Add a Day 7 Case Study touchpoint?").
- Execution Settings: auto-pause on reply toggle.
- Actions: "Save Draft" + "Approve Sequence" primary CTA.
- API: Claude call using cold-outbound-cadence-pro prompt logic.
- Approval gate required before advancing.

**Stage 5: Export**
- Phase 1: Compile all pipeline outputs into a single .docx file.
- Includes: Discovery intake, ICP package, scored lead list, email sequences.
- Formatted for Google Drive upload.
- Phase 2 upgrade: Direct SalesLoft API push.

### Cadence Rules (Apply to All Outbound Output)

**Email touches:**
- 120-word maximum per email. Count every word. Cut until under.
- Never use em dashes. Use a period, comma, or rewrite the sentence.
- Email 1 never asks for a meeting. Low-friction, interest-based CTA only.
- HTML format: `<div>` tags with `<br />` spacing. No `<p>` tags.
- Subject lines: 1-4 words, boring > clever.

**Phone touches:**
- Talk track under 30 seconds before the first question.
- Voicemail under 20 seconds.
- Always reference the same initiative/pain from the email.

**LinkedIn touches:**
- Connection requests under 300 characters. No pitch, no Applause mention.
- Messages/InMails under 75 words.
- Profile views scheduled 1-2 days before email/phone.

**Cadence length by role classification:**
- Compact (7 days, 5 touches): Champions (60-79), Influencers (50-59)
- Standard (14 days, 8-10 touches): Technical Buyers (70-89)
- Extended (21 days, 12 touches): Economic Buyers (80-100)

---

## Phase 2 Roadmap (NOT in current build)

- SalesLoft MCP integration for Stage 5 deployment
- ZoomInfo MCP for contact data + intent signals (Stages 1-2)
- Apollo API for Stage 3 lead enrichment
- Stage 6: Enablement content generation (video scripts, objection handlers, battle cards)
- Tools under evaluation: Nooks, CommonRoom.io

---

## Global Layout

### Sidebar (Left, Fixed)
- Applause logo + "OUTBOUND ENGINE" text
- Nav items: Dashboard, Leads, Campaigns, Analytics (icon + label)
- Active state: highlighted pill shape with primary-container color
- Bottom: "New Campaign" button (teal/primary CTA), Settings, Support, User avatar
- Background: `inverse-surface` (#13305a) deep navy

### Top Navigation Bar
- Horizontal stage tabs: RESEARCH | ENRICHMENT | SEQUENCING | EXECUTION
- Active tab: primary color with underline indicator
- Search bar on the right
- Notification bell + settings gear + user avatar on far right

### Content Area
- Background: `surface` (#f9f9ff)
- Cards on `surface-container-lowest` (#ffffff)
- Generous whitespace between sections

---

## Data Persistence

- **Campaign state:** React state + localStorage for session persistence
- **Pipeline outputs:** Stored in memory during pipeline execution
- **Final export:** .docx file generation, saved to Google Drive
- **No database in v1.** All state is client-side.

---

## API Routes Needed

```
POST /api/campaign/create       - Create new campaign
POST /api/stage/discovery       - Run Stage 1 (Claude API)
POST /api/stage/icp-builder     - Run Stage 2 (Claude API)
POST /api/stage/lead-research   - Run Stage 3 (Claude API)
POST /api/stage/campaign        - Run Stage 4 (Claude API)
POST /api/stage/export          - Generate .docx
GET  /api/campaign/:id          - Get campaign state
PUT  /api/campaign/:id/approve  - Approve stage gate
```

---

## File Structure (Target)

```
src/
  app/
    layout.tsx                  - Root layout with sidebar
    page.tsx                    - Dashboard / campaign list
    campaigns/
      new/page.tsx              - New Campaign form
      [id]/
        page.tsx                - Campaign overview
        research/page.tsx       - Stage 1
        enrichment/page.tsx     - Stage 2
        sequencing/page.tsx     - Stage 3 (Lead Research)
        execution/page.tsx      - Stage 4 (Campaign)
        export/page.tsx         - Stage 5
    api/
      campaign/
        create/route.ts
        [id]/route.ts
        [id]/approve/route.ts
      stage/
        discovery/route.ts
        icp-builder/route.ts
        lead-research/route.ts
        campaign/route.ts
        export/route.ts
  components/
    layout/
      Sidebar.tsx
      TopNav.tsx
      StageProgress.tsx
    campaign/
      CampaignForm.tsx
      CampaignCard.tsx
    stages/
      SignalCard.tsx
      LeadTable.tsx
      TouchpointTimeline.tsx
      SequenceScore.tsx
      ApprovalGate.tsx
    shared/
      StatusBadge.tsx
      StatCard.tsx
      DataTable.tsx
  lib/
    types.ts                    - All TypeScript interfaces
    prompts.ts                  - Claude prompt templates per stage
    claude.ts                   - Claude API client
    store.ts                    - Campaign state management
    export.ts                   - .docx generation logic
  styles/
    design-tokens.ts            - Color/spacing/typography tokens
```

---

## Build Order

1. Design tokens + Tailwind config (colors, fonts, spacing from DESIGN_SYSTEM.md)
2. Global layout shell (Sidebar, TopNav, StageProgress)
3. New Campaign form
4. Stage 1: Discovery screen (UI only, then wire Claude API)
5. Stage 2: ICP Builder screen (UI only, then wire Claude API)
6. Stage 3: Lead Research screen (UI only, then wire Claude API)
7. Stage 4: Campaign/Sequencing screen (UI only, then wire Claude API)
8. Stage 5: Export screen + .docx generation
9. Approval gate flow between stages
10. End-to-end pipeline test
11. Deploy to Vercel
