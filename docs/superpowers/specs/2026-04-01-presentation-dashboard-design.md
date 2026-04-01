# Applause Outbound Engine: Presentation Dashboard

**Date:** 2026-04-01
**Author:** Aaron Wolf + Claude
**Status:** Design

---

## Summary

Restructure the Applause Outbound Engine from a pipeline execution tool into a presentation dashboard that displays actual pipeline outputs. The app becomes a read-only viewer for data generated in Claude Cowork, deployed on Vercel for stakeholder walkthroughs.

The current 5-stage pipeline UI with mock data is replaced by a 6-tab navigation structure displaying real Fintech vertical data (Robinhood, Intuit, Snap).

---

## Architecture Change

**Before:** Campaign-based pipeline tool with 5 execution stages, mock data, localStorage state management.

**After:** Static presentation dashboard with 6 content tabs, real data from JSON files, no campaign creation flow.

### What Gets Removed
- Campaign creation form and flow (`/campaigns/new/`, CampaignForm component)
- Campaign routing (`/campaigns/[id]/` and all stage sub-routes)
- Stage execution logic (auto-run agents, simulated delays, sequential data arrival)
- localStorage-based state management (`lib/store.ts`)
- Approval gate flow between stages
- TopNav stage tabs (replaced by sidebar navigation)
- StageProgress component (no longer a linear pipeline)

### What Gets Kept
- Root layout shell (sidebar + main content area)
- Design system tokens, colors, typography, shadows
- Component patterns: cards, badges, tables (adapted for new content)
- Sidebar component (restructured with new nav items)
- Tailwind config and global styles

### What Gets Added
- 6 new page routes (one per tab)
- Structured JSON data files in `src/data/` containing actual pipeline outputs
- New components for each content type
- Hyperlink navigation between contacts and their cadences

---

## Data Architecture

All pipeline output data lives in `src/data/` as typed TypeScript files exporting structured objects. This approach:
- Keeps data co-located with the app
- Provides TypeScript type safety
- Enables static rendering (no API calls, no loading states for data)
- Is easy to update: re-run pipeline in Cowork, update the data files

### Data Files

```
src/data/
  accounts.ts          - Company profiles (Robinhood, Intuit, Snap)
  signals.ts           - Stage 1: Discovery signals per account
  icp-profiles.ts      - Stage 2: ICP/persona profiles per account
  contacts.ts          - Stage 3: Scored contacts with buyer profiles
  cadences.ts          - Stage 4: Full cadences with email templates
  campaign-meta.ts     - Campaign metadata (vertical, date, seller)
```

### Type Definitions

```typescript
// campaign-meta
interface CampaignMeta {
  name: string;
  vertical: string;
  generatedDate: string;
  seller: { name: string; title: string; company: string };
  accounts: string[];
}

// accounts
interface AccountProfile {
  id: string;                    // "robinhood" | "intuit" | "snap"
  name: string;                  // "Robinhood Markets, Inc."
  ticker: string;                // "HOOD"
  industry: string;
  employees: number;
  headquarters: string;
  revenue: string;               // "$4.5B"
  revenueGrowth: string;         // "+52% YoY"
  founded: number;
  website: string;
  quickTake: string;             // 2-3 sentence summary
  whatTheyDo: string;
  recentNews: NewsItem[];
  hiringSignals: string[];
  keyPeople: PersonProfile[];
  techStack: TechStackEntry[];
  qualificationSignals: {
    positive: string[];
    concerns: string[];
    unknown: string[];
  };
  recommendedApproach: {
    entryPoint: string;
    openingHook: string;
    discoveryQuestions: string[];
  };
}

// signals (Stage 1)
interface DiscoverySignal {
  accountId: string;
  company: string;
  industry: string;
  employeeCount: string;
  priority: "high" | "medium" | "low";
  signalQuote: string;
  targetPersonas: string[];
}

// icp-profiles (Stage 2)
interface ICPProfile {
  accountId: string;
  name: string;
  title: string;
  company: string;
  score: number;
  role: "economic-buyer" | "technical-buyer" | "champion" | "influencer";
  status: "enriched" | "pending" | "low-signal";
  enrichmentSignals: string[];
  painMapping: string;
}

// contacts (Stage 3)
interface ScoredContact {
  id: string;                    // "jeff-pinner"
  accountId: string;
  name: string;
  title: string;
  company: string;
  score: number;
  role: "economic-buyer" | "technical-buyer" | "champion" | "influencer";
  background: string;
  talkingPoints: string[];
  painToPersonMapping: string;
  cadenceType: "compact" | "standard" | "extended";
  cadenceDays: number;
  cadenceTouches: number;
  messagingAngle: string;        // "Tactical. Engineering challenges..."
}

// cadences (Stage 4)
interface Cadence {
  contactId: string;             // matches ScoredContact.id
  contactName: string;
  contactTitle: string;
  company: string;
  classification: string;        // "Technical Buyer (Score: 85)"
  cadenceType: string;           // "Standard, 14 days, 8 touches"
  tone: string;
  touchpoints: CadenceTouchpoint[];
}

interface CadenceTouchpoint {
  day: number;
  channel: "email" | "linkedin" | "phone";
  type: string;                  // "Value-First Email", "Connection Request", etc.
  subject?: string;              // email subject line
  htmlBody?: string;             // email HTML content
  linkedinText?: string;         // LinkedIn message text
  talkTrack?: string;            // phone talk track
  voicemail?: string;            // phone voicemail script
  note?: string;                 // "Under 300 characters. No pitch."
}
```

---

## Page Structure

### Navigation (Sidebar)

Replace current nav items (Dashboard, Campaigns, Leads, Analytics) with:

1. **Overview** - `/ ` (home route)
2. **Account Intelligence** - `/intelligence`
3. **SalesLoft Cadences** - `/cadences`
4. **Briefing Doc** - `/briefing`
5. **Detailed Reports** - `/reports`
6. **Analytics** - `/analytics`

Icons (Material Symbols Outlined):
1. Overview: `dashboard`
2. Account Intelligence: `person_search`
3. SalesLoft Cadences: `mail`
4. Briefing Doc: `description`
5. Detailed Reports: `summarize`
6. Analytics: `analytics`

Sidebar retains: Applause logo, "OUTBOUND ENGINE" text, navy background, user avatar at bottom. Remove "New Campaign" CTA button (no campaign creation in this version).

### Page 1: Overview (`/`)

Campaign summary and educational pipeline explainer.

**Top Section: Campaign Header**
- Campaign name: "Fintech Vertical - Outbound Campaign"
- Generated date, seller name, vertical badge
- Target accounts as horizontal chips (Robinhood, Intuit, Snap)

**Middle Section: Quick Stats Row (4 cards)**
- Accounts Researched: 3
- Contacts Identified: 9 (3 per account)
- Cadences Generated: 3 (Robinhood only for now)
- Total Touchpoints: 32

**Bottom Section: Pipeline Stages (Educational)**
Horizontal 5-step visual showing the pipeline methodology:
1. Forensic B2B Analysis - "Deep account research using public signals"
2. Strategic ICP Builder - "Persona matrix, segments, messaging hooks"
3. Lead Research & Scoring - "Scored contacts with buyer classification"
4. Campaign Sequencing - "Multi-channel cadences tailored to buyer role"
5. Export & Deploy - "Compiled briefing doc for execution"

Each step is a card with icon, title, and one-line description. This is the "Skills" educational content the user requested on the intro page.

### Page 2: Account Intelligence (`/intelligence`)

Displays Stages 1-3 output organized by account. This is the core research output page.

**Layout:** Account selector tabs at top (Robinhood | Intuit | Snap), content below changes per account.

**Section 1: Stage 1 Output - Forensic B2B Analysis**
- Card per account showing: quick take, recent news bullets, hiring signals, qualification signals (positive/concerns/unknown)
- Priority badge per signal

**Section 2: Stage 2 Output - Strategic ICP Profiles**
- Table or card grid of personas identified for the selected account
- Each shows: name, title, score (large number), role badge (Economic Buyer, Technical Buyer, etc.), enrichment signals, pain mapping

**Section 3: Stage 3 Output - Prioritized Contact List**
- Table of scored contacts sorted by score descending
- Columns: Name, Title, Score, Role/Buyer Profile, Persona, Recommended Cadence (Compact/Standard/Extended), Messaging Angle
- **Contact names are clickable hyperlinks** that navigate to `/cadences#contact-id` (deep link to that contact's cadence on the SalesLoft Cadences page)
- If no cadence exists yet for a contact, show "Pending" instead of a link

### Page 3: SalesLoft Cadences (`/cadences`)

Full multi-channel cadences with email templates. Each contact's cadence is an expandable section.

**Layout:** Vertical list of contact cadence sections, each with an anchor ID for deep linking from Account Intelligence.

**Per Contact Section:**
- Header: Contact name, title, company, classification badge, cadence type badge
- Tone description
- Timeline view of all touchpoints (reuse/adapt TouchpointTimeline component pattern)
  - Day badge on left
  - Channel icon + type label
  - Expandable content:
    - Email: subject line + full HTML body in a styled preview card
    - LinkedIn: message text with character/word count
    - Phone: talk track + voicemail, each in their own card
- Metadata tags on each touchpoint (word count, character count, channel rules)

**Data:** Currently only Robinhood contacts have cadences. Intuit and Snap sections show "Cadences pending - run Stage 4 in Cowork" placeholder.

### Page 4: Briefing Doc (`/briefing`)

Full pipeline export compiled into a downloadable .docx file.

**Layout:** Preview of what the export contains (section cards similar to current Stage 5 export page) + download button.

**Sections shown:**
1. Discovery Research (signal count per account)
2. ICP Profiles (contact count per account)
3. Scored Contact List (total contacts, score distribution)
4. Outreach Sequences (cadences generated, total touchpoints)

**Actions:**
- "Download Briefing Doc (.docx)" primary CTA
- For v1: generates a text file export (same as current export page logic)
- Shows "Ready" or "Pending" status per section

### Page 5: Detailed Reports (`/reports`)

Full Account Research Report rendered as rich content. This is the complete Fintech Vertical report.

**Layout:** Account selector tabs at top (same as Account Intelligence). Per account:

- Company Profile table (revenue, size, HQ, industry, founded, etc.)
- What They Do paragraph
- Recent News (bulleted list with bold headlines)
- Hiring Signals
- Key People (card per person: name, title, background, talking points)
- Tech Stack table (category + tools)
- Qualification Signals (positive checkmarks, concern warnings, unknown questions)
- Recommended Approach (entry point, opening hook, discovery questions)

**Bottom: Cross-Account Summary**
- Comparison table across all 3 accounts (revenue, growth, employees, cloud, AI strategy, fintech fit, top signal, best entry)
- Prioritized outreach order with reasoning

### Page 6: Analytics (`/analytics`)

Pipeline metrics and scoring visualizations.

**Cards/Charts:**
- Score Distribution: histogram or bar chart of contact scores across accounts
- Role Classification: donut chart (Economic Buyer, Technical Buyer, Champion, Influencer counts)
- Channel Mix: breakdown of touchpoints by channel (email, LinkedIn, phone) across all cadences
- Cadence Coverage: which accounts/contacts have cadences vs pending
- Account Comparison: radar or bar chart comparing accounts on key dimensions (revenue, growth, employees, hiring signals)

For v1, these can be simple stat cards and styled tables rather than chart libraries. Keep it lightweight.

---

## File Structure (Target)

```
src/
  app/
    layout.tsx                    - Root layout (sidebar + main)
    page.tsx                      - Overview page
    intelligence/page.tsx         - Account Intelligence
    cadences/page.tsx             - SalesLoft Cadences
    briefing/page.tsx             - Briefing Doc
    reports/page.tsx              - Detailed Reports
    analytics/page.tsx            - Analytics
  components/
    layout/
      Sidebar.tsx                 - Updated nav items
    intelligence/
      AccountSelector.tsx         - Tab selector for accounts
      SignalSection.tsx            - Stage 1 signals display
      ICPProfileCard.tsx          - Stage 2 persona cards
      ContactTable.tsx            - Stage 3 scored contacts with hyperlinks
    cadences/
      CadenceSection.tsx          - Per-contact cadence block
      TouchpointCard.tsx          - Individual touchpoint display
      EmailPreview.tsx            - Styled email body preview
    reports/
      CompanyProfile.tsx          - Full company report section
      KeyPersonCard.tsx           - Person profile card
      CrossAccountSummary.tsx     - Comparison table
    shared/
      StatCard.tsx                - Reused from current build
      StatusBadge.tsx             - Reused from current build
      ScoreBadge.tsx              - Large score number with role color
      RoleBadge.tsx               - Buyer role classification chip
  data/
    campaign-meta.ts
    accounts.ts
    signals.ts
    icp-profiles.ts
    contacts.ts
    cadences.ts
  lib/
    types.ts                      - Updated type definitions
  styles/
    design-tokens.ts              - Unchanged
```

### Removed Files
- `src/app/campaigns/` (entire directory)
- `src/components/campaign/CampaignForm.tsx`
- `src/components/stages/ApprovalGate.tsx`
- `src/components/stages/SequenceScore.tsx`
- `src/components/layout/TopNav.tsx` (stage tabs no longer needed)
- `src/components/layout/StageProgress.tsx` (linear progress no longer needed)
- `src/lib/store.ts` (localStorage management no longer needed)

---

## Design System Application

All existing design tokens apply unchanged:
- Sidebar: `inverse-surface` (#13305a) background
- Content area: `surface` (#f9f9ff) background
- Cards: `surface-container-lowest` (#ffffff) with `shadow-ghost`
- Active nav: `primary-container` pill highlight
- Score badges: `primary` for high scores, `secondary` for mid, `outline` for low
- Role badges: color-coded by classification
- Tables: alternating `surface-container-lowest` / `surface` rows
- No 1px borders (use background color shifts per the No-Line Rule)
- Fonts: Manrope headlines, Inter body
- Generous whitespace between sections (16-20px gaps)

---

## Data Population

### Robinhood (Complete)
- Stage 1: Discovery signals from Account Research Report
- Stage 2: ICP profiles derived from Key People section
- Stage 3: Scored contacts (Vlad Tenev 90, Jeff Pinner 85, Jason Warnick 82)
- Stage 4: Full cadences from "Robinhood - Outbound Cadences.md"

### Intuit (Stages 1-3 Only)
- Stage 1: Discovery signals from Account Research Report
- Stage 2: ICP profiles from Key People (Sasan Goodarzi, Alex Balazs, Sandeep Aujla)
- Stage 3: Scored contacts with classifications
- Stage 4: Cadences marked "Pending"

### Snap (Stages 1-3 Only)
- Stage 1: Discovery signals from Account Research Report
- Stage 2: ICP profiles from Key People (Evan Spiegel, Bobby Murphy, Jerry Hunter)
- Stage 3: Scored contacts with classifications
- Stage 4: Cadences marked "Pending"

---

## Navigation Behavior

- Sidebar tabs are always visible
- Active tab highlighted with `primary-container` pill
- Contact names on Account Intelligence page link to `/cadences#contact-id`
- SalesLoft Cadences page scrolls to the anchor when loaded with a hash
- No campaign creation, no stage progression, no approval gates

---

## Scope Exclusions

- No campaign creation or editing
- No Claude API calls (data is static)
- No localStorage state management
- No .docx generation (v1 briefing doc uses text export, .docx is future)
- No chart library (Analytics uses styled stat cards and tables)
- No authentication or user management
