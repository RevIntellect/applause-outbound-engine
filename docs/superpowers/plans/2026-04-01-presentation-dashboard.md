# Presentation Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the Applause Outbound Engine from a pipeline execution tool into a 6-tab presentation dashboard displaying actual Robinhood/Intuit/Snap pipeline output data.

**Architecture:** Static presentation dashboard with data in typed TypeScript files under `src/data/`. Six page routes (Overview, Account Intelligence, SalesLoft Cadences, Briefing Doc, Detailed Reports, Analytics) replace the campaign pipeline. Sidebar navigation replaces stage-based TopNav. All existing design tokens, colors, and component patterns carry over.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Material Symbols Outlined icons

**Project Root:** `/Users/aaron/Library/Mobile Documents/com~apple~CloudDocs/_Organized/06_Development/GitHub/OLD-Applause Prospecting Agent/applause-outbound-engine`

**Design Spec:** `docs/superpowers/specs/2026-04-01-presentation-dashboard-design.md`

---

## File Map

### New Files
```
src/data/types.ts                           - All TypeScript interfaces for the data layer
src/data/campaign-meta.ts                   - Campaign metadata
src/data/accounts.ts                        - Full account profiles (Robinhood, Intuit, Snap)
src/data/contacts.ts                        - Scored contacts with buyer classifications
src/data/cadences.ts                        - Full cadences with email templates (Robinhood)
src/app/intelligence/page.tsx               - Account Intelligence page
src/app/cadences/page.tsx                   - SalesLoft Cadences page
src/app/briefing/page.tsx                   - Briefing Doc page
src/app/reports/page.tsx                    - Detailed Reports page
src/app/analytics/page.tsx                  - Analytics page
src/components/shared/AccountSelector.tsx   - Account tab selector (reused across pages)
src/components/shared/RoleBadge.tsx         - Buyer role classification chip
src/components/shared/ScoreBadge.tsx        - Large score number display
```

### Modified Files
```
src/app/layout.tsx                          - Remove TopNav import, keep Sidebar
src/app/page.tsx                            - Rewrite as Overview dashboard
src/components/layout/Sidebar.tsx           - New 6-tab navigation
src/lib/types.ts                            - Keep for backward compat, re-export from data/types
```

### Deleted Files
```
src/app/campaigns/                          - Entire directory (new/, [id]/, all stage pages)
src/components/campaign/CampaignForm.tsx
src/components/stages/ApprovalGate.tsx
src/components/stages/SequenceScore.tsx
src/components/layout/TopNav.tsx
src/components/layout/StageProgress.tsx
src/lib/store.ts
```

### Kept As-Is
```
src/app/globals.css
src/styles/design-tokens.ts
src/components/shared/StatCard.tsx
src/components/shared/StatusBadge.tsx
```

---

## Task 1: Data Layer - Types and Campaign Meta

**Files:**
- Create: `src/data/types.ts`
- Create: `src/data/campaign-meta.ts`

- [ ] **Step 1: Create `src/data/types.ts`**

```typescript
// All type definitions for the presentation dashboard data layer

export type AccountId = "robinhood" | "intuit" | "snap";

export type BuyerRole = "economic-buyer" | "technical-buyer" | "champion" | "influencer";

export type Priority = "high" | "medium" | "low";

export type TouchpointChannel = "email" | "linkedin" | "phone";

export type CadenceType = "compact" | "standard" | "extended";

export interface CampaignMeta {
  name: string;
  vertical: string;
  generatedDate: string;
  seller: { name: string; title: string; company: string };
  accounts: AccountId[];
}

export interface NewsItem {
  headline: string;
  detail: string;
}

export interface PersonProfile {
  name: string;
  title: string;
  background: string;
  tenure?: string;
  focus?: string;
  talkingPoints: string[];
}

export interface TechStackEntry {
  category: string;
  tools: string;
}

export interface AccountProfile {
  id: AccountId;
  name: string;
  ticker: string;
  industry: string;
  employees: number;
  headquarters: string;
  revenue: string;
  revenueGrowth: string;
  netIncome?: string;
  founded: number;
  website: string;
  quickTake: string;
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

export interface ScoredContact {
  id: string;
  accountId: AccountId;
  name: string;
  title: string;
  company: string;
  score: number;
  role: BuyerRole;
  background: string;
  talkingPoints: string[];
  painToPersonMapping: string;
  cadenceType: CadenceType;
  cadenceDays: number;
  cadenceTouches: number;
  messagingAngle: string;
}

export interface CadenceTouchpoint {
  day: number;
  channel: TouchpointChannel;
  type: string;
  subject?: string;
  htmlBody?: string;
  linkedinText?: string;
  talkTrack?: string;
  voicemail?: string;
  note?: string;
}

export interface Cadence {
  contactId: string;
  contactName: string;
  contactTitle: string;
  company: string;
  classification: string;
  cadenceType: string;
  tone: string;
  touchpoints: CadenceTouchpoint[];
}
```

- [ ] **Step 2: Create `src/data/campaign-meta.ts`**

```typescript
import type { CampaignMeta } from "./types";

export const campaignMeta: CampaignMeta = {
  name: "Fintech Vertical - Outbound Campaign",
  vertical: "Fintech",
  generatedDate: "2026-03-12",
  seller: {
    name: "Aaron Wolf",
    title: "Sr. Manager of Sales Effectiveness",
    company: "Applause",
  },
  accounts: ["robinhood", "intuit", "snap"],
};
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd "/Users/aaron/Library/Mobile Documents/com~apple~CloudDocs/_Organized/06_Development/GitHub/OLD-Applause Prospecting Agent/applause-outbound-engine" && npx tsc --noEmit src/data/types.ts src/data/campaign-meta.ts 2>&1 | head -20`

Expected: No errors (or only errors from missing other project files, not from these files)

- [ ] **Step 4: Commit**

```bash
git add src/data/types.ts src/data/campaign-meta.ts
git commit -m "feat: add data layer types and campaign metadata"
```

---

## Task 2: Data Layer - Account Profiles

**Files:**
- Create: `src/data/accounts.ts`

This file contains the full account research data for Robinhood, Intuit, and Snap, sourced from `outputs/Fintech Vertical - Account Research Report.md`.

- [ ] **Step 1: Create `src/data/accounts.ts`**

```typescript
import type { AccountProfile } from "./types";

export const accounts: Record<string, AccountProfile> = {
  robinhood: {
    id: "robinhood",
    name: "Robinhood Markets, Inc.",
    ticker: "HOOD",
    industry: "Financial Technology / Online Brokerage",
    employees: 4800,
    headquarters: "Menlo Park, CA",
    revenue: "$4.5B",
    revenueGrowth: "+52% YoY",
    netIncome: "$1.9B",
    founded: 2013,
    website: "robinhood.com",
    quickTake:
      "Robinhood just delivered a breakout FY2025 with $4.5B revenue (+52% YoY) and $1.9B net income, transforming from a meme-stock platform into a legitimate \"Financial SuperApp.\" They're aggressively expanding into prediction markets, crypto, and AI-driven advisory (Cortex). With 27M funded customers and $324B in assets under custody, they're scaling infrastructure fast. Best angle: platform scalability, AI/ML infrastructure, or fintech compliance tooling as they diversify product lines.",
    whatTheyDo:
      "Robinhood offers commission-free trading across equities, options, crypto, and now prediction markets. Their \"Financial SuperApp\" strategy includes Gold subscription ($5/mo, 4.18M subscribers), banking features, retirement accounts, and AI-powered advisory tools. They serve 27M funded customers with $324B in assets under custody.",
    recentNews: [
      { headline: "Breakout Financial Performance", detail: "FY2025 revenue of $4.5B (+52%) with $1.9B net income marks a dramatic turnaround from years of losses." },
      { headline: "Financial SuperApp Vision", detail: "CEO Vlad Tenev has publicly committed to transforming Robinhood beyond trading into a full-service financial platform." },
      { headline: "Prediction Markets Launch", detail: "Acquired/partnered with Rothera and MIAXdx to launch prediction markets (event contracts), expanding beyond traditional trading." },
      { headline: "Robinhood Cortex", detail: "New AI-powered tool providing personalized investment insights and portfolio analysis for users." },
      { headline: "Gold Subscriber Growth", detail: "4.18M Gold subscribers at $5/month, representing a growing recurring revenue stream." },
      { headline: "2026 OpEx Guidance", detail: "$2.6B-$2.725B, indicating significant planned investment in growth initiatives." },
    ],
    hiringSignals: [
      "Active hiring across engineering, data science, and product",
      "Specific focus on AI/ML roles for Cortex and recommendation systems",
      "Crypto and blockchain engineering roles as they expand digital assets",
      "Compliance and risk engineering as product lines diversify",
      "Growth indicator: Profitable company with $2.6B+ OpEx budget actively building new product lines",
    ],
    keyPeople: [
      {
        name: "Vlad Tenev",
        title: "CEO & Co-Founder",
        background: "Co-founded Robinhood in 2013; Stanford math/physics background",
        tenure: "CEO since founding",
        talkingPoints: [
          "Architect of the \"Financial SuperApp\" vision",
          "Publicly committed to AI-first product development",
          "Navigated company from controversy to profitability",
        ],
      },
      {
        name: "Jeff Pinner",
        title: "CTO",
        background: "Previously at Cruise (autonomous vehicles) and Lyft",
        focus: "Platform architecture, AI infrastructure, scaling engineering",
        talkingPoints: [
          "Brings autonomous vehicle/ML infrastructure experience to fintech",
          "Overseeing the Python-to-Go migration for performance",
          "Key decision-maker for engineering tooling and infrastructure",
        ],
      },
      {
        name: "Jason Warnick",
        title: "CFO",
        background: "Former VP of Finance at Amazon",
        focus: "Financial discipline, OpEx management, growth investments",
        talkingPoints: [
          "Amazon finance background means data-driven, ROI-focused decision-making",
          "Managing $2.6B+ OpEx budget with clear growth mandate",
          "Balancing investment in new product lines with profitability maintenance",
        ],
      },
    ],
    techStack: [
      { category: "Cloud", tools: "AWS (primary)" },
      { category: "Languages", tools: "Python (legacy), Go (migration target), Kotlin" },
      { category: "Infrastructure", tools: "Kubernetes, microservices" },
      { category: "Data", tools: "PostgreSQL, Apache Kafka (event streaming)" },
      { category: "AI/ML", tools: "Robinhood Cortex (proprietary), recommendation systems" },
    ],
    qualificationSignals: {
      positive: [
        "Explosive revenue growth (+52% YoY) means budget is available",
        "$2.6B+ OpEx budget with clear investment mandate",
        "Rapid product diversification (prediction markets, Cortex AI, crypto) creates infrastructure needs",
        "CTO from autonomous vehicles brings sophisticated infrastructure expectations",
        "Python-to-Go migration signals active investment in platform modernization",
      ],
      concerns: [
        "Relatively small engineering org (~4,800 total employees) may mean slower procurement",
        "Heavy regulatory scrutiny in fintech/trading means compliance overhead on new vendors",
        "Crypto revenue volatility could affect spending if market conditions shift",
      ],
      unknown: [
        "Where is the Python-to-Go migration in terms of completion and pain points?",
        "What's the AI/ML infrastructure behind Cortex and are they building or buying?",
        "How are they handling the compliance/security requirements as they add prediction markets and expand crypto?",
      ],
    },
    recommendedApproach: {
      entryPoint: "Jeff Pinner (CTO) or engineering leadership",
      openingHook:
        "Reference their remarkable FY2025 performance and the engineering challenges of scaling a \"Financial SuperApp\" across trading, crypto, prediction markets, and AI advisory simultaneously. The Python-to-Go migration is a concrete technical topic that opens doors.",
      discoveryQuestions: [
        "As you scale from trading into prediction markets, AI advisory, and expanded crypto, how is your platform architecture evolving?",
        "How is the Python-to-Go migration going, and what tooling challenges has it surfaced?",
        "With Cortex launching as your AI play, how are you thinking about ML infrastructure and model serving at scale?",
      ],
    },
  },

  intuit: {
    id: "intuit",
    name: "Intuit Inc.",
    ticker: "INTU",
    industry: "Financial Technology / Tax & Accounting Software",
    employees: 17544,
    headquarters: "Mountain View, CA",
    revenue: "$18.8B",
    revenueGrowth: "+16% YoY",
    founded: 1983,
    website: "intuit.com",
    quickTake:
      "Intuit is a $18.8B revenue fintech powerhouse undergoing a massive AI transformation through its GenOS platform, which notably uses Anthropic Claude via AWS Bedrock. The stock is down ~50% from its all-time high, creating internal pressure to demonstrate ROI on AI investments. Their Enterprise Suite expansion into verticals like construction signals appetite for new platform capabilities. Best angle: AI infrastructure optimization, developer productivity, or enterprise-grade tooling that accelerates their GenOS roadmap.",
    whatTheyDo:
      "Intuit operates TurboTax (consumer tax), QuickBooks (SMB accounting & payments), Credit Karma (personal finance), and Mailchimp (marketing automation). They serve over 100 million consumers and small businesses with an AI-driven expert platform strategy.",
    recentNews: [
      { headline: "GenOS AI Platform Expansion", detail: "Intuit is building out GenOS, their internal AI platform, as a core strategic bet. Uses large language models including Anthropic Claude via AWS Bedrock." },
      { headline: "OpenAI Partnership", detail: "Announced partnership with OpenAI to integrate additional AI capabilities, signaling a multi-model strategy rather than single-vendor lock-in." },
      { headline: "Affirm x QuickBooks Partnership", detail: "New BNPL integration for QuickBooks merchants, expanding their payments ecosystem." },
      { headline: "Enterprise Suite Construction Edition", detail: "Launched vertical-specific QuickBooks Enterprise offering for construction, signaling expansion beyond horizontal SMB play." },
      { headline: "Stock Decline ~50% from ATH", detail: "Significant stock price correction creating internal pressure to demonstrate growth and AI ROI." },
    ],
    hiringSignals: [
      "~3,956 open roles across the organization",
      "Heavy hiring in AI/ML engineering, data science, and platform engineering",
      "Significant GenOS-related roles for AI infrastructure",
      "Growth indicator: Aggressive hiring despite stock pressure suggests conviction in AI transformation thesis",
    ],
    keyPeople: [
      {
        name: "Sasan Goodarzi",
        title: "CEO",
        background: "Long-tenured Intuit executive; previously led Small Business & Self-Employed Group",
        tenure: "CEO since January 2019",
        talkingPoints: [
          "Architect of Intuit's AI-driven expert platform vision",
          "Publicly committed to GenOS as the company's strategic differentiator",
          "Under pressure from stock decline to show AI ROI",
        ],
      },
      {
        name: "Alex Balazs",
        title: "CTO",
        background: "Leads technology strategy and GenOS platform development",
        focus: "AI infrastructure, platform engineering, multi-model AI strategy",
        talkingPoints: [
          "Key decision-maker for AI infrastructure and tooling investments",
          "Overseeing GenOS buildout with multi-model approach (Claude + OpenAI)",
          "Likely evaluating developer productivity and AI deployment tools",
        ],
      },
      {
        name: "Sandeep Aujla",
        title: "CFO",
        background: "Former SVP & Corporate Controller at Intuit",
        focus: "FY2026 guidance, cost management, AI investment ROI",
        talkingPoints: [
          "Managing ~$21B revenue target while funding AI transformation",
          "Balancing growth investments with shareholder pressure from stock decline",
          "ROI-focused conversations around AI spend will resonate",
        ],
      },
    ],
    techStack: [
      { category: "Cloud", tools: "AWS (primary)" },
      { category: "AI/ML", tools: "GenOS platform, Anthropic Claude (via Bedrock), OpenAI partnership" },
      { category: "Infrastructure", tools: "Kubernetes, microservices architecture" },
      { category: "Data", tools: "Large-scale data platform supporting 100M+ users" },
      { category: "Languages", tools: "Java, Python, JavaScript/TypeScript" },
    ],
    qualificationSignals: {
      positive: [
        "Massive AI investment (GenOS) creates budget for supporting tools and infrastructure",
        "Multi-model AI strategy (Claude + OpenAI) means they're evaluating and integrating multiple vendors",
        "~3,956 open roles signal growth and budget availability",
        "Enterprise vertical expansion (Construction Edition) indicates platform maturity needs",
        "Already using Anthropic Claude, potential to expand relationship",
      ],
      concerns: [
        "Stock down ~50% may trigger cost-cutting or slower procurement cycles",
        "Large, mature engineering org may have strong \"build vs. buy\" bias",
        "FY2026 guidance of 12-13% growth is decelerating from 16% in FY2025",
      ],
      unknown: [
        "What is their current AI infrastructure spend and where are the pain points?",
        "How is GenOS team structured and who owns vendor decisions?",
        "Are they consolidating or diversifying their AI model providers?",
      ],
    },
    recommendedApproach: {
      entryPoint: "Alex Balazs (CTO) or GenOS engineering leadership",
      openingHook:
        "Reference their GenOS platform and multi-model AI strategy. The stock pressure creates urgency around demonstrating AI ROI, which means tools that accelerate AI deployment or reduce infrastructure costs will resonate.",
      discoveryQuestions: [
        "How are you managing the complexity of running multiple AI models (Claude, OpenAI) across GenOS?",
        "What's the biggest bottleneck in getting AI features from prototype to production across TurboTax, QuickBooks, and Credit Karma?",
        "With ~4,000 open roles, how are you thinking about developer productivity and onboarding velocity?",
      ],
    },
  },

  snap: {
    id: "snap",
    name: "Snap Inc.",
    ticker: "SNAP",
    industry: "Social Media / Augmented Reality",
    employees: 5700,
    headquarters: "Santa Monica, CA",
    revenue: "$5.9B",
    revenueGrowth: "+11% YoY",
    netIncome: "-$460M (improving)",
    founded: 2011,
    website: "snap.com",
    quickTake:
      "Snap is primarily an AR/social media company, not a traditional fintech player. However, they're making significant bets on AI (including a $400M Perplexity AI partnership) and AR commerce (Commerce Kit for Spectacles enabling in-lens payments). With 946M MAU approaching 1B, FY2025 revenue of $5.9B, and an aggressive AR hardware strategy through their Specs subsidiary, Snap presents opportunities around AI infrastructure, AR commerce enablement, and data platform tooling. The fintech angle is narrow but real through Commerce Kit and payments.",
    whatTheyDo:
      "Snap operates Snapchat (946M MAU), a camera-first messaging and content platform. Their strategy extends into AR hardware (Spectacles/Specs subsidiary), AI integration (My AI chatbot, Perplexity partnership), and creator/commerce tools. They serve a young, engaged audience with a focus on visual communication and augmented reality experiences.",
    recentNews: [
      { headline: "Perplexity AI Partnership ($400M)", detail: "Major strategic partnership bringing AI-powered search and answers into Snapchat, signaling heavy AI infrastructure investment." },
      { headline: "Specs AR Subsidiary", detail: "Spun out their AR glasses effort into a standalone subsidiary called \"Specs\" with ~100 new hires, indicating serious commitment to AR hardware." },
      { headline: "Commerce Kit for Spectacles", detail: "Launched commerce capabilities enabling payments within AR lens experiences, their most direct fintech play." },
      { headline: "$500M Stock Buyback", detail: "Announced buyback program, signaling confidence in financial position despite ongoing net losses." },
      { headline: "946M MAU", detail: "Approaching 1 billion monthly active users, a key milestone for advertising scale." },
      { headline: "Net Loss Improving", detail: "$460M net loss in FY2025 is a significant improvement, trending toward profitability." },
    ],
    hiringSignals: [
      "~100 new hires for Specs AR subsidiary, dedicated AR hardware and software team",
      "Active hiring in AI/ML, computer vision, and AR engineering",
      "Data engineering and infrastructure roles for scaling to 1B MAU",
      "Commerce and payments roles tied to Commerce Kit",
      "Growth indicator: Dedicated subsidiary for AR with its own hiring pipeline shows strategic commitment",
    ],
    keyPeople: [
      {
        name: "Evan Spiegel",
        title: "CEO & Co-Founder",
        background: "Co-founded Snapchat at Stanford; visionary product leader",
        tenure: "CEO since founding",
        talkingPoints: [
          "Personally drives AR strategy and long-term product vision",
          "Committed to reaching 1B MAU milestone",
          "Willing to make large bets (Perplexity partnership, Specs subsidiary)",
        ],
      },
      {
        name: "Bobby Murphy",
        title: "CTO & Co-Founder",
        background: "Co-founded Snapchat; leads engineering and technology",
        focus: "AR platform, AI integration, infrastructure scaling",
        talkingPoints: [
          "Oversees both AI and AR technology strategies",
          "Managing multicloud infrastructure (GCP + AWS) at massive scale",
          "Key technical decision-maker for platform investments",
        ],
      },
      {
        name: "Jerry Hunter",
        title: "COO",
        background: "Former VP of Engineering at Amazon Web Services",
        focus: "Operations, scaling, efficiency",
        talkingPoints: [
          "AWS background means deep infrastructure and cloud expertise",
          "Focused on operational efficiency as Snap trends toward profitability",
          "Likely involved in vendor evaluation for infrastructure tooling",
        ],
      },
    ],
    techStack: [
      { category: "Cloud", tools: "Google Cloud Platform (primary) + AWS (multicloud)" },
      { category: "Data", tools: "BigQuery, Apache Iceberg (data lakehouse)" },
      { category: "Infrastructure", tools: "Kubernetes, microservices" },
      { category: "Languages", tools: "Go, Python, C++ (for AR/ML)" },
      { category: "AI/ML", tools: "Computer vision, AR ML models, Perplexity AI integration" },
    ],
    qualificationSignals: {
      positive: [
        "$400M Perplexity AI partnership signals large AI infrastructure budget",
        "Multicloud (GCP + AWS) creates complexity that tooling can address",
        "Apache Iceberg adoption means they're modernizing their data stack",
        "COO from AWS brings sophisticated infrastructure evaluation mindset",
        "Approaching 1B MAU creates scaling challenges that need solutions",
      ],
      concerns: [
        "Not a traditional fintech company; fintech angle is limited to Commerce Kit",
        "Still unprofitable ($460M net loss) though improving",
        "History of cost-cutting and layoffs; may have tight procurement processes",
        "AR hardware (Specs) is a long-term bet with uncertain near-term ROI",
      ],
      unknown: [
        "How is the Perplexity AI integration being architected and what infrastructure is it running on?",
        "What's driving the multicloud strategy and are there pain points in managing GCP + AWS?",
        "How is Commerce Kit for Spectacles handling payments infrastructure?",
      ],
    },
    recommendedApproach: {
      entryPoint: "Bobby Murphy (CTO) or Jerry Hunter (COO, given AWS background)",
      openingHook:
        "Reference the Perplexity AI partnership and the engineering challenge of integrating AI capabilities at 946M MAU scale across a multicloud environment. The Commerce Kit launch adds a payments/fintech dimension that's new territory for their engineering team.",
      discoveryQuestions: [
        "With the Perplexity partnership and My AI chatbot, how is your AI infrastructure evolving to serve nearly 1B users?",
        "How are you managing complexity across your GCP and AWS multicloud setup, especially as you add new product surfaces like Commerce Kit?",
        "As Specs scales as its own subsidiary, how are you thinking about shared vs. dedicated infrastructure?",
      ],
    },
  },
};

export const accountList = Object.values(accounts);
export function getAccount(id: string) {
  return accounts[id];
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/accounts.ts
git commit -m "feat: add account profile data (Robinhood, Intuit, Snap)"
```

---

## Task 3: Data Layer - Contacts and Cadences

**Files:**
- Create: `src/data/contacts.ts`
- Create: `src/data/cadences.ts`

- [ ] **Step 1: Create `src/data/contacts.ts`**

Scored contacts derived from account research key people, with buyer classifications and cadence recommendations.

```typescript
import type { ScoredContact } from "./types";

export const contacts: ScoredContact[] = [
  // --- Robinhood ---
  {
    id: "vlad-tenev",
    accountId: "robinhood",
    name: "Vlad Tenev",
    title: "CEO & Co-Founder",
    company: "Robinhood",
    score: 90,
    role: "economic-buyer",
    background: "Co-founded Robinhood in 2013; Stanford math/physics background",
    talkingPoints: [
      "Architect of the \"Financial SuperApp\" vision",
      "Publicly committed to AI-first product development",
      "Navigated company from controversy to profitability",
    ],
    painToPersonMapping:
      "As CEO driving SuperApp expansion, Vlad owns the brand promise across every new product surface. Each launch (prediction markets, Cortex, crypto) is a trust moment with 27M funded customers. Quality failures create regulatory exposure and erode the brand trust rebuilt since 2021.",
    cadenceType: "extended",
    cadenceDays: 21,
    cadenceTouches: 12,
    messagingAngle: "Strategic. Business outcomes, risk reduction, brand trust, growth enablement.",
  },
  {
    id: "jeff-pinner",
    accountId: "robinhood",
    name: "Jeff Pinner",
    title: "CTO",
    company: "Robinhood",
    score: 85,
    role: "technical-buyer",
    background: "Previously at Cruise (autonomous vehicles) and Lyft",
    talkingPoints: [
      "Brings autonomous vehicle/ML infrastructure experience to fintech",
      "Overseeing the Python-to-Go migration for performance",
      "Key decision-maker for engineering tooling and infrastructure",
    ],
    painToPersonMapping:
      "As CTO running a Python-to-Go migration while simultaneously shipping prediction markets, Cortex AI, and expanded crypto, Jeff faces compounding platform complexity. Each new product surface multiplies QA requirements across device and network fragmentation.",
    cadenceType: "standard",
    cadenceDays: 14,
    cadenceTouches: 8,
    messagingAngle: "Tactical. Engineering challenges, platform reliability, infrastructure scaling.",
  },
  {
    id: "jason-warnick",
    accountId: "robinhood",
    name: "Jason Warnick",
    title: "CFO",
    company: "Robinhood",
    score: 82,
    role: "economic-buyer",
    background: "Former VP of Finance at Amazon",
    talkingPoints: [
      "Amazon finance background means data-driven, ROI-focused decision-making",
      "Managing $2.6B+ OpEx budget with clear growth mandate",
      "Balancing investment in new product lines with profitability maintenance",
    ],
    painToPersonMapping:
      "As CFO managing $2.6B+ OpEx with multiple product lines launching simultaneously, Jason needs QA spend that scales with product growth, not ahead of it. Variable cost testing replaces fixed device labs and permanent headcount.",
    cadenceType: "extended",
    cadenceDays: 21,
    cadenceTouches: 12,
    messagingAngle: "Strategic. Cost efficiency, ROI, risk reduction, operational leverage.",
  },
  // --- Intuit ---
  {
    id: "sasan-goodarzi",
    accountId: "intuit",
    name: "Sasan Goodarzi",
    title: "CEO",
    company: "Intuit",
    score: 88,
    role: "economic-buyer",
    background: "Long-tenured Intuit executive; previously led Small Business & Self-Employed Group",
    talkingPoints: [
      "Architect of Intuit's AI-driven expert platform vision",
      "Publicly committed to GenOS as the company's strategic differentiator",
      "Under pressure from stock decline to show AI ROI",
    ],
    painToPersonMapping:
      "As CEO betting the company on GenOS AI transformation while stock is down ~50%, Sasan needs every AI investment to demonstrate ROI. Ensuring AI-powered features work flawlessly across TurboTax, QuickBooks, and Credit Karma is a brand and revenue imperative.",
    cadenceType: "extended",
    cadenceDays: 21,
    cadenceTouches: 12,
    messagingAngle: "Strategic. AI ROI, brand trust, platform quality at scale.",
  },
  {
    id: "alex-balazs",
    accountId: "intuit",
    name: "Alex Balazs",
    title: "CTO",
    company: "Intuit",
    score: 91,
    role: "technical-buyer",
    background: "Leads technology strategy and GenOS platform development",
    talkingPoints: [
      "Key decision-maker for AI infrastructure and tooling investments",
      "Overseeing GenOS buildout with multi-model approach (Claude + OpenAI)",
      "Likely evaluating developer productivity and AI deployment tools",
    ],
    painToPersonMapping:
      "As CTO building GenOS with multiple AI models (Claude + OpenAI) across four major product lines, Alex faces infrastructure complexity that compounds with each new vertical (Construction Edition). Real-world testing across devices and user scenarios is critical for AI feature deployment.",
    cadenceType: "standard",
    cadenceDays: 14,
    cadenceTouches: 8,
    messagingAngle: "Tactical. AI infrastructure, developer productivity, multi-model deployment challenges.",
  },
  {
    id: "sandeep-aujla",
    accountId: "intuit",
    name: "Sandeep Aujla",
    title: "CFO",
    company: "Intuit",
    score: 78,
    role: "economic-buyer",
    background: "Former SVP & Corporate Controller at Intuit",
    talkingPoints: [
      "Managing ~$21B revenue target while funding AI transformation",
      "Balancing growth investments with shareholder pressure from stock decline",
      "ROI-focused conversations around AI spend will resonate",
    ],
    painToPersonMapping:
      "As CFO under shareholder pressure from a ~50% stock decline, Sandeep needs AI investments to show clear ROI. Testing and quality tools that reduce defect-related costs and accelerate time-to-market directly support the financial narrative.",
    cadenceType: "extended",
    cadenceDays: 21,
    cadenceTouches: 12,
    messagingAngle: "Strategic. Cost management, AI investment ROI, time-to-market acceleration.",
  },
  // --- Snap ---
  {
    id: "evan-spiegel",
    accountId: "snap",
    name: "Evan Spiegel",
    title: "CEO & Co-Founder",
    company: "Snap",
    score: 75,
    role: "economic-buyer",
    background: "Co-founded Snapchat at Stanford; visionary product leader",
    talkingPoints: [
      "Personally drives AR strategy and long-term product vision",
      "Committed to reaching 1B MAU milestone",
      "Willing to make large bets (Perplexity partnership, Specs subsidiary)",
    ],
    painToPersonMapping:
      "As CEO approaching 1B MAU with new commerce capabilities (Commerce Kit payments in AR lenses), Evan faces quality challenges at unprecedented scale. Every new surface, from Perplexity AI search to AR commerce, must work seamlessly for a young, engaged audience.",
    cadenceType: "extended",
    cadenceDays: 21,
    cadenceTouches: 12,
    messagingAngle: "Strategic. Scale, brand trust, AR commerce quality.",
  },
  {
    id: "bobby-murphy",
    accountId: "snap",
    name: "Bobby Murphy",
    title: "CTO & Co-Founder",
    company: "Snap",
    score: 80,
    role: "technical-buyer",
    background: "Co-founded Snapchat; leads engineering and technology",
    talkingPoints: [
      "Oversees both AI and AR technology strategies",
      "Managing multicloud infrastructure (GCP + AWS) at massive scale",
      "Key technical decision-maker for platform investments",
    ],
    painToPersonMapping:
      "As CTO managing a multicloud environment (GCP + AWS) with AI integration (Perplexity), AR hardware (Specs), and approaching 1B MAU, Bobby faces compounding infrastructure complexity. Testing across this fragmented stack requires real-world validation.",
    cadenceType: "standard",
    cadenceDays: 14,
    cadenceTouches: 8,
    messagingAngle: "Tactical. Multicloud complexity, AI integration, AR platform quality.",
  },
  {
    id: "jerry-hunter",
    accountId: "snap",
    name: "Jerry Hunter",
    title: "COO",
    company: "Snap",
    score: 72,
    role: "champion",
    background: "Former VP of Engineering at Amazon Web Services",
    talkingPoints: [
      "AWS background means deep infrastructure and cloud expertise",
      "Focused on operational efficiency as Snap trends toward profitability",
      "Likely involved in vendor evaluation for infrastructure tooling",
    ],
    painToPersonMapping:
      "As COO with deep AWS infrastructure background, Jerry evaluates operational tools through a scalability and efficiency lens. As Snap trends toward profitability, tools that improve operational leverage without adding headcount will resonate.",
    cadenceType: "compact",
    cadenceDays: 7,
    cadenceTouches: 5,
    messagingAngle: "Operational. Efficiency, vendor evaluation, infrastructure tooling.",
  },
];

export function getContactsByAccount(accountId: string) {
  return contacts.filter((c) => c.accountId === accountId).sort((a, b) => b.score - a.score);
}

export function getContact(id: string) {
  return contacts.find((c) => c.id === id);
}
```

- [ ] **Step 2: Create `src/data/cadences.ts`**

Contains the full Robinhood cadences from `outputs/Robinhood - Outbound Cadences.md`. Intuit and Snap cadences are not yet generated.

```typescript
import type { Cadence } from "./types";

export const cadences: Cadence[] = [
  // --- Jeff Pinner (CTO) - Standard 14-day ---
  {
    contactId: "jeff-pinner",
    contactName: "Jeff Pinner",
    contactTitle: "CTO",
    company: "Robinhood",
    classification: "Technical Buyer (Score: 85)",
    cadenceType: "Standard, 14 days, 8 touches",
    tone: "Tactical. Engineering challenges, platform reliability, infrastructure scaling.",
    touchpoints: [
      {
        day: 1,
        channel: "linkedin",
        type: "Profile View",
        note: "View Jeff Pinner's profile. No action. Creates visibility before outreach.",
      },
      {
        day: 2,
        channel: "email",
        type: "Value-First Email",
        subject: "superapp testing",
        htmlBody: `<div>Jeff,<br /><br />Robinhood's expansion into prediction markets, Cortex AI, and expanded crypto means your engineering team is shipping across more product surfaces than ever. Each one needs to work flawlessly on real devices and networks before it reaches 27M funded customers handling real money.<br /><br />Applause provides on-demand crowdtesting with real people on real devices across real networks and locations. Companies like PayPal and Western Union use us to catch the issues automated scripts miss, especially in high-stakes financial flows.<br /><br />Would it be useful to see how other fintech engineering teams are handling QA across multiple product lines simultaneously?</div>`,
      },
      {
        day: 4,
        channel: "linkedin",
        type: "Connection Request",
        linkedinText: "Jeff, impressed by the Python-to-Go migration at Robinhood. Would enjoy connecting on platform engineering challenges at scale.",
        note: "Under 300 characters. No pitch. No Applause mention.",
      },
      {
        day: 6,
        channel: "email",
        type: "Case Study Email",
        subject: "prediction markets QA",
        htmlBody: `<div>Jeff,<br /><br />When PayPal launched new payment surfaces across multiple geographies, they found that 23% of critical transaction failures only appeared on real devices in real network conditions. Their internal automation missed them entirely.<br /><br />Applause is a crowdtesting platform that deploys real testers on real devices to catch what automation can't. For a platform like Robinhood, where a failed trade or broken deposit flow has immediate financial consequences, this gap matters.<br /><br />Happy to share how their engineering team integrated crowdtesting into their release cycle without slowing velocity.</div>`,
      },
      {
        day: 8,
        channel: "phone",
        type: "Discovery Call",
        talkTrack: "Jeff, Aaron Wolf from Applause. I've been following Robinhood's expansion into prediction markets and Cortex. As you ship across more product surfaces, I'm curious how your QA strategy is scaling with it. Are you finding gaps between what automation catches and what real users experience on real devices?",
        voicemail: "Jeff, Aaron Wolf from Applause. We help fintech engineering teams like PayPal test across real devices and networks. Given everything Robinhood is shipping right now, thought it'd be worth a quick conversation. I'll follow up by email.",
      },
      {
        day: 10,
        channel: "linkedin",
        type: "InMail",
        linkedinText: "Jeff, Robinhood's pace of product launches is impressive. Prediction markets, Cortex, expanded crypto. Curious how your QA approach is keeping up across all those surfaces. Applause helps fintech teams test on real devices at scale. Worth a conversation?",
        note: "Under 75 words.",
      },
      {
        day: 11,
        channel: "email",
        type: "ROI Framework Email",
        subject: "device coverage",
        htmlBody: `<div>Jeff,<br /><br />One pattern we see with fast-scaling fintech platforms: the gap between what automated tests cover and what real users experience widens as product lines multiply. Especially on Android, where device fragmentation means your top 10 devices represent less than 40% of your user base.<br /><br />Applause is a crowdtesting platform that gives engineering teams on-demand access to real testers on thousands of real devices, networks, and locations. No hardware lab. No staffing headcount.<br /><br />Worth 20 minutes to see if there's a fit?</div>`,
      },
      {
        day: 14,
        channel: "phone",
        type: "Breakup Call",
        talkTrack: "Jeff, Aaron Wolf from Applause. I've reached out a few times about how fintech teams handle QA as they scale product lines. If the timing isn't right, no problem. If device coverage or real-world testing is something your team is thinking about, I'd still welcome the conversation.",
        voicemail: "Jeff, Aaron Wolf, Applause. Last voicemail from me. If real-device testing across your product lines becomes a priority, I'm here. Take care.",
      },
    ],
  },

  // --- Vlad Tenev (CEO) - Extended 21-day ---
  {
    contactId: "vlad-tenev",
    contactName: "Vlad Tenev",
    contactTitle: "CEO & Co-Founder",
    company: "Robinhood",
    classification: "Economic Buyer (Score: 90)",
    cadenceType: "Extended, 21 days, 12 touches",
    tone: "Strategic. Business outcomes, risk reduction, brand trust, growth enablement.",
    touchpoints: [
      { day: 1, channel: "linkedin", type: "Profile View", note: "View Vlad Tenev's profile. No action." },
      {
        day: 2,
        channel: "email",
        type: "Value-First Email",
        subject: "superapp quality",
        htmlBody: `<div>Vlad,<br /><br />Robinhood's transformation into a Financial SuperApp means your brand promise now spans trading, crypto, prediction markets, Gold banking, and AI advisory. Each new surface is a trust moment with 27M funded customers who expect flawless execution with their money.<br /><br />Applause provides on-demand crowdtesting across real devices, networks, and locations. We help companies like PayPal and Western Union ensure every financial flow works perfectly for real users before launch.<br /><br />Would it be useful to see how other fintech leaders are protecting brand trust while shipping at speed?</div>`,
      },
      {
        day: 4,
        channel: "linkedin",
        type: "Connection Request",
        linkedinText: "Vlad, the Financial SuperApp vision is compelling. Would enjoy connecting on the intersection of speed-to-market and quality at scale.",
        note: "Under 300 characters. No Applause mention.",
      },
      {
        day: 6,
        channel: "email",
        type: "Risk Angle Email",
        subject: "launch risk",
        htmlBody: `<div>Vlad,<br /><br />Every new product surface at Robinhood is a trust moment. A failed prediction market trade or a broken Cortex recommendation doesn't just frustrate users. It creates regulatory exposure and erodes the brand trust you've rebuilt since 2021.<br /><br />Applause is a crowdtesting platform that deploys real testers on real devices before launch. We catch the issues that automated testing misses, particularly in complex financial flows across fragmented mobile ecosystems.<br /><br />Happy to share how other fintech CEOs are thinking about quality as a growth enabler, not just a cost center.</div>`,
      },
      {
        day: 8,
        channel: "phone",
        type: "Discovery Call",
        talkTrack: "Vlad, Aaron Wolf from Applause. As Robinhood scales into more product lines, each one carries your brand and your customers' money. I work with fintech leaders who use crowdtesting to ensure every new launch works on real devices before it reaches users. Worth a quick conversation?",
        voicemail: "Vlad, Aaron Wolf from Applause. We help fintech companies ensure new product launches work on real devices for real users. Given everything Robinhood is shipping, thought it'd be worth connecting. I'll follow up by email.",
      },
      {
        day: 10,
        channel: "linkedin",
        type: "InMail",
        linkedinText: "Vlad, as Robinhood adds prediction markets, Cortex, and expanded crypto, each launch carries real financial risk for 27M users. Applause helps fintech leaders test across real devices at scale before launch. Worth a conversation?",
        note: "Under 75 words.",
      },
      {
        day: 12,
        channel: "email",
        type: "Social Proof Email",
        subject: "fintech quality",
        htmlBody: `<div>Vlad,<br /><br />PayPal discovered that nearly a quarter of critical transaction failures only surfaced on real devices in real network conditions. Their automation suite missed them. For a platform where users are trading, depositing, and investing real money, that gap is unacceptable.<br /><br />Applause is a crowdtesting platform that closes that gap with real testers on thousands of devices and networks. No hardware lab, no headcount expansion. Just coverage where automation falls short.<br /><br />Would 15 minutes to explore the fit make sense?</div>`,
      },
      {
        day: 14,
        channel: "phone",
        type: "Follow-Up Call",
        talkTrack: "Vlad, Aaron Wolf again from Applause. Wanted to circle back. We're working with several fintech platforms navigating the same challenge: shipping fast across multiple product lines while maintaining the quality that keeps users trusting the platform. If that's on your radar, I'd welcome the conversation.",
        voicemail: "Vlad, Aaron Wolf, Applause. Following up on real-device testing for your product launches. Happy to share what we're seeing across fintech. I'll send one more note by email.",
      },
      {
        day: 16,
        channel: "email",
        type: "New Angle Email",
        subject: "Gold growth",
        htmlBody: `<div>Vlad,<br /><br />4.18M Gold subscribers is a strong recurring revenue engine. Each Gold user expects premium reliability across every feature, from banking to margin trading to AI insights. A single broken flow at that tier erodes willingness to pay.<br /><br />Applause is a crowdtesting platform that helps fintech companies validate premium experiences across real devices and networks. We make sure the experience matches the promise, especially for your highest-value users.<br /><br />Worth a quick conversation about how this fits your quality strategy?</div>`,
      },
      {
        day: 18,
        channel: "linkedin",
        type: "LinkedIn Message",
        linkedinText: "Vlad, one more thought. As Gold subscribers hit 4.18M, the quality bar for that premium experience keeps rising. Happy to share how other fintech companies use crowdtesting to protect their highest-value user segments.",
        note: "Under 75 words.",
      },
      {
        day: 19,
        channel: "phone",
        type: "Breakup Call",
        talkTrack: "Vlad, Aaron Wolf from Applause. Last outreach from me. If real-device testing and quality across your product launches becomes a priority, I'd be glad to connect. Either way, best of luck with the SuperApp buildout.",
        voicemail: "Vlad, Aaron Wolf, Applause. Last message from me. If crowdtesting becomes relevant as you scale, my door's open. Take care.",
      },
      {
        day: 21,
        channel: "email",
        type: "Breakup Email",
        subject: "closing the loop",
        htmlBody: `<div>Vlad,<br /><br />I've reached out a few times about how Applause helps fintech platforms ensure new product launches work on real devices for real users. Sounds like the timing may not be right.<br /><br />If real-world testing across your expanding product lines becomes a priority, I'm here. Wishing Robinhood continued success with the SuperApp vision.</div>`,
      },
    ],
  },

  // --- Jason Warnick (CFO) - Extended 21-day ---
  {
    contactId: "jason-warnick",
    contactName: "Jason Warnick",
    contactTitle: "CFO",
    company: "Robinhood",
    classification: "Economic Buyer (Score: 82)",
    cadenceType: "Extended, 21 days, 12 touches",
    tone: "Strategic. Cost efficiency, ROI, risk reduction, operational leverage.",
    touchpoints: [
      { day: 1, channel: "linkedin", type: "Profile View", note: "View Jason Warnick's profile. No action." },
      {
        day: 3,
        channel: "email",
        type: "Value-First Email",
        subject: "testing costs",
        htmlBody: `<div>Jason,<br /><br />As Robinhood scales into prediction markets, Cortex AI, and expanded crypto, the QA burden multiplies with every new product line. Building internal device labs and staffing test teams for each surface is expensive and slow.<br /><br />Applause provides on-demand crowdtesting across real devices, networks, and locations. It's variable cost, not fixed headcount. Companies like PayPal use us to scale testing coverage without scaling their QA org.<br /><br />Would it be useful to see how the cost model compares to internal alternatives?</div>`,
      },
      {
        day: 5,
        channel: "linkedin",
        type: "Connection Request",
        linkedinText: "Jason, your Amazon finance background plus Robinhood's growth story is a strong combination. Would enjoy connecting.",
        note: "Under 300 characters. No pitch.",
      },
      {
        day: 7,
        channel: "email",
        type: "OpEx Angle Email",
        subject: "QA leverage",
        htmlBody: `<div>Jason,<br /><br />With $2.6B+ in planned OpEx and multiple new product lines launching, every dollar of engineering spend needs to deliver maximum coverage. Building internal QA for prediction markets, crypto, Cortex, and Gold simultaneously means hiring, hardware, and long ramp times.<br /><br />Applause is a crowdtesting platform that provides real-device testing on demand. Pay for coverage when you need it, scale down when you don't. No lab capex, no permanent headcount.<br /><br />Happy to walk through the unit economics for a platform at Robinhood's scale.</div>`,
      },
      {
        day: 9,
        channel: "phone",
        type: "Discovery Call",
        talkTrack: "Jason, Aaron Wolf from Applause. With Robinhood launching across so many product lines, I'm curious how you're thinking about QA costs. We help fintech companies replace fixed testing infrastructure with on-demand crowdtesting. Variable cost model, no hardware labs. Worth a quick conversation?",
        voicemail: "Jason, Aaron Wolf from Applause. We help fintech companies scale testing without scaling headcount. Given Robinhood's product expansion, thought it'd be worth connecting. I'll follow up by email.",
      },
      {
        day: 11,
        channel: "linkedin",
        type: "InMail",
        linkedinText: "Jason, given your Amazon finance background, you'll appreciate this: Applause replaces fixed QA infrastructure costs with variable, on-demand crowdtesting. As Robinhood's product lines multiply, that cost flexibility matters. Worth a conversation?",
        note: "Under 75 words.",
      },
      {
        day: 13,
        channel: "email",
        type: "Risk/Cost Email",
        subject: "defect costs",
        htmlBody: `<div>Jason,<br /><br />In fintech, a production defect in a transaction flow isn't just a bug. It's potential regulatory exposure, customer churn, and support cost escalation. The cost of finding these issues after launch is orders of magnitude higher than catching them before.<br /><br />Applause is a crowdtesting platform that catches real-device, real-network defects before they reach production. For a platform handling real money across 27M funded accounts, the ROI math is straightforward.<br /><br />Worth 15 minutes to run the numbers together?</div>`,
      },
      {
        day: 15,
        channel: "phone",
        type: "Follow-Up Call",
        talkTrack: "Jason, Aaron Wolf from Applause again. Wanted to follow up on how Robinhood is managing QA costs across your expanding product portfolio. We've helped fintech CFOs shift from fixed testing infrastructure to a variable model. If that's interesting, I'd welcome the conversation.",
        voicemail: "Jason, Aaron Wolf, Applause. Following up on testing cost efficiency for your product launches. Happy to share the ROI framework. I'll send one more email.",
      },
      {
        day: 17,
        channel: "email",
        type: "Operational Leverage Email",
        subject: "testing scale",
        htmlBody: `<div>Jason,<br /><br />Here's the math that resonates with most fintech finance leaders: a single device lab covers maybe 50-100 devices. Robinhood's users are on thousands of device and network combinations. Applause gives you on-demand access to that full coverage without the capital or staffing commitment.<br /><br />Applause is a crowdtesting platform that fintech companies use to scale quality assurance with product growth, not ahead of it. The spend scales with your launch calendar, not your headcount plan.<br /><br />Worth exploring if this fits your 2026 OpEx strategy?</div>`,
      },
      {
        day: 19,
        channel: "linkedin",
        type: "LinkedIn Message",
        linkedinText: "Jason, last thought. As Robinhood's product lines grow, QA spend doesn't have to grow linearly with them. Happy to share how other fintech CFOs are approaching this. Let me know if the timing works.",
        note: "Under 75 words.",
      },
      {
        day: 20,
        channel: "phone",
        type: "Breakup Call",
        talkTrack: "Jason, Aaron Wolf from Applause. Last outreach from me. If testing cost efficiency or real-device coverage becomes a conversation at Robinhood, I'm here. Either way, best of luck with the growth ahead.",
        voicemail: "Jason, Aaron Wolf, Applause. Last message. If on-demand testing costs become a priority, my door is open. Take care.",
      },
      {
        day: 21,
        channel: "email",
        type: "Breakup Email",
        subject: "closing the loop",
        htmlBody: `<div>Jason,<br /><br />I've reached out a few times about how Applause helps fintech companies scale testing coverage without scaling costs. Sounds like the timing may not be right.<br /><br />If on-demand crowdtesting becomes relevant as Robinhood's product portfolio grows, I'm here. Wishing you and the team continued success.</div>`,
      },
    ],
  },
];

export function getCadenceByContact(contactId: string) {
  return cadences.find((c) => c.contactId === contactId);
}

export function getCadencesByAccount(accountId: string) {
  // Get contact IDs for this account, then find matching cadences
  return cadences.filter((c) => {
    const contactAccountMap: Record<string, string> = {
      "vlad-tenev": "robinhood",
      "jeff-pinner": "robinhood",
      "jason-warnick": "robinhood",
      "sasan-goodarzi": "intuit",
      "alex-balazs": "intuit",
      "sandeep-aujla": "intuit",
      "evan-spiegel": "snap",
      "bobby-murphy": "snap",
      "jerry-hunter": "snap",
    };
    return contactAccountMap[c.contactId] === accountId;
  });
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data/contacts.ts src/data/cadences.ts
git commit -m "feat: add contacts and cadences data (Robinhood complete, Intuit/Snap pending)"
```

---

## Task 4: Shared Components

**Files:**
- Create: `src/components/shared/AccountSelector.tsx`
- Create: `src/components/shared/RoleBadge.tsx`
- Create: `src/components/shared/ScoreBadge.tsx`

- [ ] **Step 1: Create `src/components/shared/AccountSelector.tsx`**

```tsx
"use client";

import type { AccountId } from "@/data/types";
import { accounts } from "@/data/accounts";

interface AccountSelectorProps {
  selected: AccountId;
  onChange: (id: AccountId) => void;
}

const accountOrder: AccountId[] = ["robinhood", "intuit", "snap"];

export default function AccountSelector({ selected, onChange }: AccountSelectorProps) {
  return (
    <div className="flex gap-1 p-1 bg-surface-container rounded-lg">
      {accountOrder.map((id) => {
        const account = accounts[id];
        const isActive = selected === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-surface-container-lowest text-on-surface shadow-ghost"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            {account.name.split(/,?\s+(Inc|Markets)/)[0]}
            <span className="ml-1.5 text-xs text-outline">({account.ticker})</span>
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/shared/RoleBadge.tsx`**

```tsx
import type { BuyerRole } from "@/data/types";

const roleConfig: Record<BuyerRole, { label: string; bg: string; text: string }> = {
  "economic-buyer": { label: "Economic Buyer", bg: "bg-primary/10", text: "text-primary" },
  "technical-buyer": { label: "Technical Buyer", bg: "bg-secondary/20", text: "text-secondary" },
  champion: { label: "Champion", bg: "bg-tertiary-fixed", text: "text-tertiary" },
  influencer: { label: "Influencer", bg: "bg-surface-container-high", text: "text-on-surface-variant" },
};

export default function RoleBadge({ role }: { role: BuyerRole }) {
  const config = roleConfig[role];
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-md text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
```

- [ ] **Step 3: Create `src/components/shared/ScoreBadge.tsx`**

```tsx
export default function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 85 ? "text-primary" : score >= 70 ? "text-secondary" : "text-on-surface-variant";
  return (
    <span className={`text-2xl font-bold font-sans ${color}`}>
      {score}
    </span>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/shared/AccountSelector.tsx src/components/shared/RoleBadge.tsx src/components/shared/ScoreBadge.tsx
git commit -m "feat: add shared components (AccountSelector, RoleBadge, ScoreBadge)"
```

---

## Task 5: Update Sidebar and Layout

**Files:**
- Modify: `src/components/layout/Sidebar.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Rewrite Sidebar.tsx with new navigation**

Replace the entire content of `src/components/layout/Sidebar.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Overview", icon: "dashboard", href: "/" },
  { label: "Account Intelligence", icon: "person_search", href: "/intelligence" },
  { label: "SalesLoft Cadences", icon: "mail", href: "/cadences" },
  { label: "Briefing Doc", icon: "description", href: "/briefing" },
  { label: "Detailed Reports", icon: "summarize", href: "/reports" },
  { label: "Analytics", icon: "analytics", href: "/analytics" },
];

const bottomItems = [
  { label: "Settings", icon: "settings", href: "/settings" },
  { label: "Support", icon: "help", href: "/support" },
];

export default function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-inverse-surface flex flex-col z-30">
      {/* Logo */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary" style={{ fontSize: 18 }}>
              rocket_launch
            </span>
          </div>
          <div>
            <div className="text-inverse-on-surface font-bold text-sm tracking-wide">
              APPLAUSE
            </div>
            <div className="text-inverse-primary text-[0.6875rem] font-medium tracking-[0.05em] uppercase">
              Outbound Engine
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(item.href)
                ? "bg-primary-container text-on-primary"
                : "text-inverse-on-surface/70 hover:text-inverse-on-surface hover:bg-inverse-on-surface/5"
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-inverse-on-surface/60 hover:text-inverse-on-surface hover:bg-inverse-on-surface/5 transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}

        {/* User avatar */}
        <div className="flex items-center gap-3 px-4 py-3 mt-2">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
            <span className="text-on-primary text-xs font-bold">AW</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-inverse-on-surface text-sm font-medium truncate">
              Aaron Wolf
            </div>
            <div className="text-inverse-on-surface/50 text-[0.6875rem] truncate">
              Sr. Manager, Sales
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Update layout.tsx to remove TopNav**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Sidebar from "@/components/layout/Sidebar";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Applause Outbound Engine",
  description:
    "Applause outbound prospecting pipeline dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full bg-surface text-on-surface">
        <Sidebar />
        <main className="ml-64 min-h-screen p-6">{children}</main>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Sidebar.tsx src/app/layout.tsx
git commit -m "feat: update sidebar navigation and remove TopNav from layout"
```

---

## Task 6: Overview Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite Overview page**

Replace the entire content of `src/app/page.tsx`:

```tsx
import { campaignMeta } from "@/data/campaign-meta";
import { contacts } from "@/data/contacts";
import { cadences } from "@/data/cadences";
import StatCard from "@/components/shared/StatCard";

const pipelineSteps = [
  { icon: "search", title: "Forensic B2B Analysis", desc: "Deep account research using public signals, earnings, hiring, and news." },
  { icon: "groups", title: "Strategic ICP Builder", desc: "Persona matrix, segments, messaging hooks, and pain mapping." },
  { icon: "score", title: "Lead Research & Scoring", desc: "Scored contacts with buyer classification and cadence recommendations." },
  { icon: "mail", title: "Campaign Sequencing", desc: "Multi-channel cadences tailored to buyer role and seniority." },
  { icon: "description", title: "Export & Deploy", desc: "Compiled briefing doc for execution in SalesLoft." },
];

export default function OverviewPage() {
  const totalTouchpoints = cadences.reduce((sum, c) => sum + c.touchpoints.length, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Campaign Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{campaignMeta.name}</h1>
        <div className="mt-2 flex items-center gap-4 text-sm text-on-surface-variant">
          <span>{campaignMeta.seller.name}, {campaignMeta.seller.title}</span>
          <span className="w-1 h-1 rounded-full bg-outline-variant" />
          <span>Generated {campaignMeta.generatedDate}</span>
        </div>
        <div className="mt-4 flex gap-2">
          <span className="px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
            {campaignMeta.vertical}
          </span>
          {campaignMeta.accounts.map((id) => (
            <span key={id} className="px-3 py-1 rounded-md bg-surface-container text-on-surface-variant text-xs font-medium capitalize">
              {id}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Accounts Researched" value={String(campaignMeta.accounts.length)} icon="business" />
        <StatCard label="Contacts Identified" value={String(contacts.length)} icon="people" />
        <StatCard label="Cadences Generated" value={String(cadences.length)} icon="mail" detail="Robinhood complete" />
        <StatCard label="Total Touchpoints" value={String(totalTouchpoints)} icon="touch_app" />
      </div>

      {/* Pipeline Methodology */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Pipeline Methodology</h2>
        <div className="grid grid-cols-5 gap-3">
          {pipelineSteps.map((step, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-lg p-4 shadow-ghost">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                  {i + 1}
                </div>
                <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>
                  {step.icon}
                </span>
              </div>
              <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: rewrite overview page with campaign summary and pipeline methodology"
```

---

## Task 7: Account Intelligence Page

**Files:**
- Create: `src/app/intelligence/page.tsx`

- [ ] **Step 1: Create the Account Intelligence page**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import type { AccountId } from "@/data/types";
import { accounts } from "@/data/accounts";
import { getContactsByAccount } from "@/data/contacts";
import { getCadenceByContact } from "@/data/cadences";
import AccountSelector from "@/components/shared/AccountSelector";
import RoleBadge from "@/components/shared/RoleBadge";
import ScoreBadge from "@/components/shared/ScoreBadge";

export default function IntelligencePage() {
  const [selected, setSelected] = useState<AccountId>("robinhood");
  const account = accounts[selected];
  const contactList = getContactsByAccount(selected);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Intelligence</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Pipeline outputs from Stages 1-3: research, ICP profiles, and scored contacts.
        </p>
      </div>

      <AccountSelector selected={selected} onChange={setSelected} />

      {/* Stage 1: Forensic B2B Analysis */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold">Stage 1</span>
          <h2 className="text-lg font-semibold">Forensic B2B Analysis</h2>
        </div>
        <div className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost space-y-6">
          {/* Quick Take */}
          <div>
            <h3 className="text-sm font-semibold text-on-surface-variant mb-2">Quick Take</h3>
            <p className="text-sm leading-relaxed">{account.quickTake}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Recent News */}
            <div>
              <h3 className="text-sm font-semibold text-on-surface-variant mb-2">Recent News & Signals</h3>
              <ul className="space-y-2">
                {account.recentNews.map((item, i) => (
                  <li key={i} className="text-sm">
                    <span className="font-medium">{item.headline}</span>
                    <span className="text-on-surface-variant"> - {item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hiring Signals */}
            <div>
              <h3 className="text-sm font-semibold text-on-surface-variant mb-2">Hiring Signals</h3>
              <ul className="space-y-1.5">
                {account.hiringSignals.map((signal, i) => (
                  <li key={i} className="text-sm text-on-surface-variant flex gap-2">
                    <span className="text-primary mt-0.5">+</span>
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Qualification Signals */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-surface-container-low rounded-lg p-4">
              <h4 className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">Positive Signals</h4>
              <ul className="space-y-1">
                {account.qualificationSignals.positive.map((s, i) => (
                  <li key={i} className="text-xs text-on-surface-variant flex gap-1.5">
                    <span className="text-primary shrink-0">&#10003;</span>{s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-container-low rounded-lg p-4">
              <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wide">Potential Concerns</h4>
              <ul className="space-y-1">
                {account.qualificationSignals.concerns.map((s, i) => (
                  <li key={i} className="text-xs text-on-surface-variant flex gap-1.5">
                    <span className="text-secondary shrink-0">&#9888;</span>{s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-container-low rounded-lg p-4">
              <h4 className="text-xs font-semibold text-outline mb-2 uppercase tracking-wide">Unknown (Ask in Discovery)</h4>
              <ul className="space-y-1">
                {account.qualificationSignals.unknown.map((s, i) => (
                  <li key={i} className="text-xs text-on-surface-variant flex gap-1.5">
                    <span className="text-outline shrink-0">?</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 2: Strategic ICP Profiles */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold">Stage 2</span>
          <h2 className="text-lg font-semibold">Strategic ICP Profiles</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {account.keyPeople.map((person) => (
            <div key={person.name} className="bg-surface-container-lowest rounded-lg p-5 shadow-ghost">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{person.name}</h3>
                  <p className="text-sm text-on-surface-variant">{person.title}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                  <span className="text-sm font-bold text-on-surface-variant">
                    {person.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant mb-3">{person.background}</p>
              {person.focus && (
                <p className="text-xs text-on-surface-variant mb-3">
                  <span className="font-medium text-on-surface">Focus:</span> {person.focus}
                </p>
              )}
              <div>
                <h4 className="text-xs font-semibold text-on-surface-variant mb-1">Talking Points</h4>
                <ul className="space-y-1">
                  {person.talkingPoints.map((tp, i) => (
                    <li key={i} className="text-xs text-on-surface-variant flex gap-1.5">
                      <span className="text-primary shrink-0">&bull;</span>{tp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stage 3: Prioritized Contact List */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold">Stage 3</span>
          <h2 className="text-lg font-semibold">Prioritized Contact List</h2>
        </div>
        <div className="bg-surface-container-lowest rounded-lg shadow-ghost overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-container-low text-left">
                <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-on-surface-variant">Contact</th>
                <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-on-surface-variant">Score</th>
                <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-on-surface-variant">Buyer Profile</th>
                <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-on-surface-variant">Persona</th>
                <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-on-surface-variant">Cadence</th>
                <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-on-surface-variant">Messaging</th>
              </tr>
            </thead>
            <tbody>
              {contactList.map((contact, i) => {
                const hasCadence = !!getCadenceByContact(contact.id);
                return (
                  <tr key={contact.id} className={i % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface/50"}>
                    <td className="px-5 py-3">
                      <div className="font-medium">
                        {hasCadence ? (
                          <Link href={`/cadences#${contact.id}`} className="text-primary hover:underline">
                            {contact.name}
                          </Link>
                        ) : (
                          contact.name
                        )}
                      </div>
                      <div className="text-xs text-on-surface-variant">{contact.title}</div>
                    </td>
                    <td className="px-5 py-3">
                      <ScoreBadge score={contact.score} />
                    </td>
                    <td className="px-5 py-3">
                      <RoleBadge role={contact.role} />
                    </td>
                    <td className="px-5 py-3 text-xs text-on-surface-variant max-w-48">
                      {contact.painToPersonMapping.substring(0, 120)}...
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-xs">
                        <span className="font-medium capitalize">{contact.cadenceType}</span>
                        <div className="text-on-surface-variant">{contact.cadenceDays}d / {contact.cadenceTouches} touches</div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      {hasCadence ? (
                        <Link href={`/cadences#${contact.id}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>open_in_new</span>
                          View Cadence
                        </Link>
                      ) : (
                        <span className="text-xs text-outline">Pending</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/intelligence/page.tsx
git commit -m "feat: add Account Intelligence page with Stages 1-3 output"
```

---

## Task 8: SalesLoft Cadences Page

**Files:**
- Create: `src/app/cadences/page.tsx`

- [ ] **Step 1: Create the Cadences page**

```tsx
"use client";

import { useEffect } from "react";
import { cadences } from "@/data/cadences";
import { contacts } from "@/data/contacts";
import type { AccountId } from "@/data/types";
import RoleBadge from "@/components/shared/RoleBadge";

const channelConfig: Record<string, { icon: string; color: string; bg: string }> = {
  email: { icon: "mail", color: "text-primary", bg: "bg-primary/10" },
  linkedin: { icon: "share", color: "text-secondary", bg: "bg-secondary/10" },
  phone: { icon: "call", color: "text-tertiary", bg: "bg-tertiary-fixed" },
};

export default function CadencesPage() {
  // Scroll to anchor on load
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    }
  }, []);

  // Group cadences by account
  const accountGroups: { accountId: AccountId; accountName: string; items: typeof cadences }[] = [];
  const robinhoodCadences = cadences.filter((c) => ["vlad-tenev", "jeff-pinner", "jason-warnick"].includes(c.contactId));
  if (robinhoodCadences.length > 0) {
    accountGroups.push({ accountId: "robinhood", accountName: "Robinhood", items: robinhoodCadences });
  }

  // Pending accounts
  const pendingAccounts = [
    { id: "intuit" as AccountId, name: "Intuit" },
    { id: "snap" as AccountId, name: "Snap" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SalesLoft Cadences</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Multi-channel outreach sequences with email templates, call scripts, and LinkedIn messaging.
        </p>
      </div>

      {accountGroups.map((group) => (
        <div key={group.accountId} className="space-y-6">
          <h2 className="text-xl font-semibold">{group.accountName}</h2>

          {group.items.map((cadence) => {
            const contact = contacts.find((c) => c.id === cadence.contactId);
            return (
              <div key={cadence.contactId} id={cadence.contactId} className="scroll-mt-8">
                {/* Contact Header */}
                <div className="bg-surface-container-lowest rounded-t-lg p-5 shadow-ghost">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{cadence.contactName}</h3>
                      <p className="text-sm text-on-surface-variant">{cadence.contactTitle}, {cadence.company}</p>
                      <div className="mt-2 flex items-center gap-3">
                        {contact && <RoleBadge role={contact.role} />}
                        <span className="text-xs text-on-surface-variant">{cadence.cadenceType}</span>
                      </div>
                    </div>
                    <div className="text-right text-xs text-on-surface-variant">
                      <div>{cadence.classification}</div>
                      <div className="mt-1 italic">{cadence.tone}</div>
                    </div>
                  </div>
                </div>

                {/* Touchpoint Timeline */}
                <div className="bg-surface-container-lowest rounded-b-lg shadow-ghost px-5 pb-5">
                  <div className="relative pl-8">
                    {/* Vertical line */}
                    <div className="absolute left-3 top-0 bottom-0 w-px bg-outline-variant" />

                    {cadence.touchpoints.map((tp, i) => {
                      const ch = channelConfig[tp.channel];
                      return (
                        <div key={i} className="relative py-4">
                          {/* Day badge */}
                          <div className="absolute -left-5 top-4 w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center">
                            <span className="text-[0.6rem] font-bold text-on-surface-variant">D{tp.day}</span>
                          </div>

                          <div className="bg-surface-container-low rounded-lg p-4">
                            {/* Touchpoint header */}
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`material-symbols-outlined ${ch.color}`} style={{ fontSize: 16 }}>{ch.icon}</span>
                              <span className="text-sm font-medium">{tp.type}</span>
                              <span className={`px-1.5 py-0.5 rounded text-[0.6rem] font-medium uppercase ${ch.bg} ${ch.color}`}>
                                {tp.channel}
                              </span>
                              {tp.subject && (
                                <span className="text-xs text-on-surface-variant ml-auto">Subject: {tp.subject}</span>
                              )}
                            </div>

                            {/* Email body */}
                            {tp.htmlBody && (
                              <div
                                className="mt-2 p-4 bg-surface-container-lowest rounded-md text-sm leading-relaxed border-l-2 border-primary/20"
                                dangerouslySetInnerHTML={{ __html: tp.htmlBody }}
                              />
                            )}

                            {/* LinkedIn text */}
                            {tp.linkedinText && (
                              <p className="mt-2 p-3 bg-surface-container-lowest rounded-md text-sm leading-relaxed border-l-2 border-secondary/20">
                                {tp.linkedinText}
                              </p>
                            )}

                            {/* Phone scripts */}
                            {tp.talkTrack && (
                              <div className="mt-2 space-y-2">
                                <div className="p-3 bg-surface-container-lowest rounded-md border-l-2 border-tertiary-fixed">
                                  <span className="text-xs font-semibold text-on-surface-variant">Talk Track:</span>
                                  <p className="text-sm leading-relaxed mt-1">&ldquo;{tp.talkTrack}&rdquo;</p>
                                </div>
                                {tp.voicemail && (
                                  <div className="p-3 bg-surface-container-lowest rounded-md border-l-2 border-tertiary-fixed">
                                    <span className="text-xs font-semibold text-on-surface-variant">Voicemail:</span>
                                    <p className="text-sm leading-relaxed mt-1">&ldquo;{tp.voicemail}&rdquo;</p>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Note */}
                            {tp.note && !tp.htmlBody && !tp.linkedinText && !tp.talkTrack && (
                              <p className="mt-1 text-xs text-on-surface-variant italic">{tp.note}</p>
                            )}
                            {tp.note && (tp.htmlBody || tp.linkedinText) && (
                              <p className="mt-2 text-xs text-on-surface-variant italic">{tp.note}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Pending accounts */}
      {pendingAccounts.map((acct) => (
        <div key={acct.id} className="space-y-3">
          <h2 className="text-xl font-semibold">{acct.name}</h2>
          <div className="bg-surface-container-lowest rounded-lg p-8 shadow-ghost text-center">
            <span className="material-symbols-outlined text-outline mb-2" style={{ fontSize: 32 }}>pending</span>
            <p className="text-sm text-on-surface-variant">
              Cadences pending. Run Stage 4 in Cowork to generate {acct.name} outreach sequences.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/cadences/page.tsx
git commit -m "feat: add SalesLoft Cadences page with full Robinhood sequences"
```

---

## Task 9: Briefing Doc Page

**Files:**
- Create: `src/app/briefing/page.tsx`

- [ ] **Step 1: Create the Briefing Doc page**

```tsx
"use client";

import { useState } from "react";
import { campaignMeta } from "@/data/campaign-meta";
import { accounts } from "@/data/accounts";
import { contacts } from "@/data/contacts";
import { cadences } from "@/data/cadences";

export default function BriefingPage() {
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const sections = [
    {
      title: "Discovery Research",
      icon: "search",
      count: `${campaignMeta.accounts.length} accounts`,
      detail: campaignMeta.accounts.map((id) => accounts[id].name.split(/,?\s+(Inc|Markets)/)[0]).join(", "),
      ready: true,
    },
    {
      title: "ICP Profiles",
      icon: "groups",
      count: `${contacts.length} contacts`,
      detail: `Across ${campaignMeta.accounts.length} accounts with scores ${Math.min(...contacts.map((c) => c.score))}-${Math.max(...contacts.map((c) => c.score))}`,
      ready: true,
    },
    {
      title: "Scored Contact List",
      icon: "score",
      count: `${contacts.length} scored`,
      detail: `${contacts.filter((c) => c.role === "economic-buyer").length} Economic, ${contacts.filter((c) => c.role === "technical-buyer").length} Technical, ${contacts.filter((c) => c.role === "champion").length} Champion`,
      ready: true,
    },
    {
      title: "Outreach Sequences",
      icon: "mail",
      count: `${cadences.length} cadences`,
      detail: `${cadences.reduce((sum, c) => sum + c.touchpoints.length, 0)} total touchpoints (Robinhood)`,
      ready: cadences.length > 0,
    },
  ];

  function handleExport() {
    setExporting(true);
    // Build text export
    let output = `APPLAUSE OUTBOUND ENGINE - BRIEFING DOC\n`;
    output += `Campaign: ${campaignMeta.name}\n`;
    output += `Vertical: ${campaignMeta.vertical}\n`;
    output += `Seller: ${campaignMeta.seller.name}, ${campaignMeta.seller.title}\n`;
    output += `Generated: ${campaignMeta.generatedDate}\n`;
    output += `${"=".repeat(60)}\n\n`;

    // Discovery Research
    output += `SECTION 1: DISCOVERY RESEARCH\n${"─".repeat(40)}\n\n`;
    for (const id of campaignMeta.accounts) {
      const acct = accounts[id];
      output += `${acct.name} (${acct.ticker})\n`;
      output += `Industry: ${acct.industry}\n`;
      output += `Revenue: ${acct.revenue} (${acct.revenueGrowth})\n`;
      output += `Employees: ${acct.employees.toLocaleString()}\n`;
      output += `\nQuick Take: ${acct.quickTake}\n`;
      output += `\nRecent News:\n`;
      acct.recentNews.forEach((n) => { output += `  - ${n.headline}: ${n.detail}\n`; });
      output += `\n`;
    }

    // Contacts
    output += `\nSECTION 2: SCORED CONTACTS\n${"─".repeat(40)}\n\n`;
    for (const contact of contacts) {
      output += `${contact.name} | ${contact.title} | ${contact.company} | Score: ${contact.score} | ${contact.role}\n`;
      output += `  Cadence: ${contact.cadenceType} (${contact.cadenceDays}d, ${contact.cadenceTouches} touches)\n`;
      output += `  Angle: ${contact.messagingAngle}\n\n`;
    }

    // Cadences
    output += `\nSECTION 3: OUTREACH SEQUENCES\n${"─".repeat(40)}\n\n`;
    for (const cadence of cadences) {
      output += `${cadence.contactName} (${cadence.contactTitle}) - ${cadence.cadenceType}\n`;
      for (const tp of cadence.touchpoints) {
        output += `  Day ${tp.day} [${tp.channel.toUpperCase()}] ${tp.type}`;
        if (tp.subject) output += ` - Subject: "${tp.subject}"`;
        output += `\n`;
        if (tp.htmlBody) {
          const text = tp.htmlBody.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
          output += `    ${text}\n`;
        }
        if (tp.linkedinText) output += `    ${tp.linkedinText}\n`;
        if (tp.talkTrack) output += `    Talk Track: "${tp.talkTrack}"\n`;
        if (tp.voicemail) output += `    Voicemail: "${tp.voicemail}"\n`;
      }
      output += `\n`;
    }

    // Download
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${campaignMeta.name.replace(/\s+/g, "-").toLowerCase()}-briefing.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setExporting(false);
      setExported(true);
    }, 500);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Briefing Doc</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Compiled pipeline output for execution. Download and upload to Google Drive.
        </p>
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-2 gap-4">
        {sections.map((section) => (
          <div key={section.title} className="bg-surface-container-lowest rounded-lg p-5 shadow-ghost">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: 24 }}>
                  {section.icon}
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{section.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">{section.count}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                section.ready
                  ? "bg-tertiary-fixed text-tertiary"
                  : "bg-surface-container text-outline"
              }`}>
                {section.ready ? "Ready" : "Pending"}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-3">{section.detail}</p>
          </div>
        ))}
      </div>

      {/* Export Action */}
      <div className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost text-center">
        {exported ? (
          <>
            <span className="material-symbols-outlined text-primary mb-2" style={{ fontSize: 32 }}>check_circle</span>
            <h3 className="text-lg font-semibold mb-1">Export Complete</h3>
            <p className="text-sm text-on-surface-variant mb-4">File downloaded. Upload to Google Drive for team access.</p>
            <button
              onClick={() => { setExported(false); handleExport(); }}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-on-primary transition-transform hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #00579f, #2d70bb)" }}
            >
              Download Again
            </button>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-primary mb-2" style={{ fontSize: 32 }}>download</span>
            <h3 className="text-lg font-semibold mb-1">
              {exporting ? "Generating Export..." : "Ready to Export"}
            </h3>
            <p className="text-sm text-on-surface-variant mb-4">
              Compiles all pipeline sections into a single document.
            </p>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-on-primary transition-transform hover:scale-[1.02] disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #00579f, #2d70bb)" }}
            >
              {exporting ? "Generating..." : "Download Briefing Doc (.txt)"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/briefing/page.tsx
git commit -m "feat: add Briefing Doc page with export functionality"
```

---

## Task 10: Detailed Reports Page

**Files:**
- Create: `src/app/reports/page.tsx`

- [ ] **Step 1: Create the Detailed Reports page**

```tsx
"use client";

import { useState } from "react";
import type { AccountId } from "@/data/types";
import { accounts } from "@/data/accounts";
import AccountSelector from "@/components/shared/AccountSelector";

export default function ReportsPage() {
  const [selected, setSelected] = useState<AccountId>("robinhood");
  const account = accounts[selected];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Detailed Reports</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Full account research reports with company profiles, key people, tech stacks, and recommended approaches.
        </p>
      </div>

      <AccountSelector selected={selected} onChange={setSelected} />

      {/* Company Profile */}
      <section className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost">
        <h2 className="text-xl font-semibold mb-4">{account.name}</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
          {[
            ["Ticker", account.ticker],
            ["Industry", account.industry],
            ["Employees", account.employees.toLocaleString()],
            ["Headquarters", account.headquarters],
            ["Founded", String(account.founded)],
            ["Website", account.website],
            ["Revenue", `${account.revenue} (${account.revenueGrowth})`],
            ...(account.netIncome ? [["Net Income", account.netIncome]] : []),
          ].map(([label, value]) => (
            <div key={label} className="flex py-1.5">
              <span className="w-32 shrink-0 font-medium text-on-surface-variant">{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4">
          <h3 className="text-sm font-semibold text-on-surface-variant mb-2">What They Do</h3>
          <p className="text-sm leading-relaxed">{account.whatTheyDo}</p>
        </div>
      </section>

      {/* Recent News */}
      <section className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost">
        <h2 className="text-lg font-semibold mb-4">Recent News</h2>
        <div className="space-y-3">
          {account.recentNews.map((item, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <span className="text-primary mt-0.5 shrink-0">&#9679;</span>
              <div>
                <span className="font-medium">{item.headline}</span>
                <span className="text-on-surface-variant"> - {item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key People */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Key People</h2>
        <div className="space-y-4">
          {account.keyPeople.map((person) => (
            <div key={person.name} className="bg-surface-container-lowest rounded-lg p-5 shadow-ghost">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-on-surface-variant">
                    {person.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{person.name}</h3>
                  <p className="text-sm text-on-surface-variant">{person.title}</p>
                  <p className="text-sm text-on-surface-variant mt-1">{person.background}</p>
                  {person.tenure && <p className="text-xs text-outline mt-0.5">{person.tenure}</p>}
                  {person.focus && (
                    <p className="text-sm mt-2"><span className="font-medium">Focus:</span> <span className="text-on-surface-variant">{person.focus}</span></p>
                  )}
                  <div className="mt-3">
                    <h4 className="text-xs font-semibold text-on-surface-variant mb-1">Talking Points</h4>
                    <ul className="space-y-1">
                      {person.talkingPoints.map((tp, i) => (
                        <li key={i} className="text-sm text-on-surface-variant flex gap-2">
                          <span className="text-primary shrink-0">&bull;</span>{tp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost">
        <h2 className="text-lg font-semibold mb-4">Tech Stack</h2>
        <div className="space-y-2">
          {account.techStack.map((entry) => (
            <div key={entry.category} className="flex text-sm py-1.5">
              <span className="w-32 shrink-0 font-medium text-on-surface-variant">{entry.category}</span>
              <span>{entry.tools}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Qualification Signals */}
      <section className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost">
        <h2 className="text-lg font-semibold mb-4">Qualification Signals</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-surface-container-low rounded-lg p-4">
            <h3 className="text-xs font-semibold text-primary mb-3 uppercase tracking-wide">Positive</h3>
            <ul className="space-y-2">
              {account.qualificationSignals.positive.map((s, i) => (
                <li key={i} className="text-sm text-on-surface-variant flex gap-2">
                  <span className="text-primary shrink-0">&#10003;</span>{s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface-container-low rounded-lg p-4">
            <h3 className="text-xs font-semibold text-secondary mb-3 uppercase tracking-wide">Concerns</h3>
            <ul className="space-y-2">
              {account.qualificationSignals.concerns.map((s, i) => (
                <li key={i} className="text-sm text-on-surface-variant flex gap-2">
                  <span className="text-secondary shrink-0">&#9888;</span>{s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface-container-low rounded-lg p-4">
            <h3 className="text-xs font-semibold text-outline mb-3 uppercase tracking-wide">Unknown</h3>
            <ul className="space-y-2">
              {account.qualificationSignals.unknown.map((s, i) => (
                <li key={i} className="text-sm text-on-surface-variant flex gap-2">
                  <span className="text-outline shrink-0">?</span>{s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Recommended Approach */}
      <section className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost">
        <h2 className="text-lg font-semibold mb-4">Recommended Approach</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-on-surface-variant">Best Entry Point</h3>
            <p className="text-sm mt-1">{account.recommendedApproach.entryPoint}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-on-surface-variant">Opening Hook</h3>
            <p className="text-sm leading-relaxed mt-1">{account.recommendedApproach.openingHook}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-on-surface-variant">Discovery Questions</h3>
            <ol className="mt-1 space-y-2">
              {account.recommendedApproach.discoveryQuestions.map((q, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-primary font-medium shrink-0">{i + 1}.</span>
                  {q}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Cross-Account Summary */}
      <section className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost">
        <h2 className="text-lg font-semibold mb-4">Cross-Account Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-container-low text-left">
                <th className="px-4 py-2 font-semibold text-xs uppercase tracking-wide text-on-surface-variant">Dimension</th>
                {(["robinhood", "intuit", "snap"] as AccountId[]).map((id) => (
                  <th key={id} className={`px-4 py-2 font-semibold text-xs uppercase tracking-wide ${selected === id ? "text-primary" : "text-on-surface-variant"}`}>
                    {accounts[id].name.split(/,?\s+(Inc|Markets)/)[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Revenue", fn: (a: typeof account) => `${a.revenue} (${a.revenueGrowth})` },
                { label: "Employees", fn: (a: typeof account) => `~${a.employees.toLocaleString()}` },
                { label: "Cloud", fn: (a: typeof account) => a.techStack.find((t) => t.category === "Cloud")?.tools || "N/A" },
                { label: "AI Strategy", fn: (a: typeof account) => a.techStack.find((t) => t.category === "AI/ML")?.tools || "N/A" },
                { label: "Best Entry", fn: (a: typeof account) => a.recommendedApproach.entryPoint },
              ].map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "" : "bg-surface-container-low/50"}>
                  <td className="px-4 py-2 font-medium text-on-surface-variant">{row.label}</td>
                  {(["robinhood", "intuit", "snap"] as AccountId[]).map((id) => (
                    <td key={id} className="px-4 py-2 text-xs">{row.fn(accounts[id])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/reports/page.tsx
git commit -m "feat: add Detailed Reports page with full account research"
```

---

## Task 11: Analytics Page

**Files:**
- Create: `src/app/analytics/page.tsx`

- [ ] **Step 1: Create the Analytics page**

Uses stat cards and styled tables (no chart library).

```tsx
import { contacts } from "@/data/contacts";
import { cadences } from "@/data/cadences";
import { campaignMeta } from "@/data/campaign-meta";
import { accounts } from "@/data/accounts";
import StatCard from "@/components/shared/StatCard";

export default function AnalyticsPage() {
  const avgScore = Math.round(contacts.reduce((s, c) => s + c.score, 0) / contacts.length);
  const roleBreakdown = contacts.reduce(
    (acc, c) => { acc[c.role] = (acc[c.role] || 0) + 1; return acc; },
    {} as Record<string, number>
  );
  const totalTouchpoints = cadences.reduce((sum, c) => sum + c.touchpoints.length, 0);
  const channelBreakdown = cadences.reduce(
    (acc, c) => {
      c.touchpoints.forEach((tp) => { acc[tp.channel] = (acc[tp.channel] || 0) + 1; });
      return acc;
    },
    {} as Record<string, number>
  );

  const roleLabels: Record<string, string> = {
    "economic-buyer": "Economic Buyer",
    "technical-buyer": "Technical Buyer",
    champion: "Champion",
    influencer: "Influencer",
  };

  const channelLabels: Record<string, string> = {
    email: "Email",
    linkedin: "LinkedIn",
    phone: "Phone",
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Pipeline metrics and scoring distributions across the {campaignMeta.vertical} vertical.
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Contacts" value={String(contacts.length)} icon="people" />
        <StatCard label="Average Score" value={String(avgScore)} icon="speed" />
        <StatCard label="Cadences Complete" value={`${cadences.length} / ${contacts.length}`} icon="mail" />
        <StatCard label="Total Touchpoints" value={String(totalTouchpoints)} icon="touch_app" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Score Distribution */}
        <div className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost">
          <h2 className="text-lg font-semibold mb-4">Score Distribution</h2>
          <div className="space-y-3">
            {contacts
              .sort((a, b) => b.score - a.score)
              .map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <span className="text-sm w-28 shrink-0 truncate">{c.name}</span>
                  <div className="flex-1 bg-surface-container-low rounded-full h-5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/70 flex items-center justify-end pr-2"
                      style={{ width: `${c.score}%` }}
                    >
                      <span className="text-[0.6rem] font-bold text-on-primary">{c.score}</span>
                    </div>
                  </div>
                  <span className="text-xs text-on-surface-variant w-20 text-right capitalize">
                    {c.cadenceType}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Role Classification */}
        <div className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost">
          <h2 className="text-lg font-semibold mb-4">Role Classification</h2>
          <div className="space-y-4">
            {Object.entries(roleBreakdown).map(([role, count]) => (
              <div key={role} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{
                    backgroundColor:
                      role === "economic-buyer" ? "#00579f" :
                      role === "technical-buyer" ? "#455e8c" :
                      role === "champion" ? "#50585d" : "#727782"
                  }} />
                  <span className="text-sm">{roleLabels[role] || role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold font-sans">{count}</span>
                  <span className="text-xs text-on-surface-variant">contacts</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4">
            <h3 className="text-sm font-semibold text-on-surface-variant mb-3">Cadence Coverage by Account</h3>
            {campaignMeta.accounts.map((id) => {
              const acctContacts = contacts.filter((c) => c.accountId === id);
              const acctCadences = cadences.filter((c) =>
                acctContacts.some((ct) => ct.id === c.contactId)
              );
              const pct = acctContacts.length > 0
                ? Math.round((acctCadences.length / acctContacts.length) * 100)
                : 0;
              return (
                <div key={id} className="flex items-center gap-3 mb-2">
                  <span className="text-sm w-24 capitalize">{id}</span>
                  <div className="flex-1 bg-surface-container-low rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pct === 100 ? "bg-primary" : pct > 0 ? "bg-secondary" : "bg-outline-variant"}`}
                      style={{ width: `${Math.max(pct, 4)}%` }}
                    />
                  </div>
                  <span className="text-xs text-on-surface-variant w-20 text-right">
                    {acctCadences.length}/{acctContacts.length} ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Channel Mix */}
        <div className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost">
          <h2 className="text-lg font-semibold mb-4">Channel Mix</h2>
          {totalTouchpoints > 0 ? (
            <div className="space-y-4">
              {Object.entries(channelBreakdown).map(([channel, count]) => (
                <div key={channel} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>
                      {channel === "email" ? "mail" : channel === "linkedin" ? "share" : "call"}
                    </span>
                    <span className="text-sm">{channelLabels[channel] || channel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold font-sans">{count}</span>
                    <span className="text-xs text-on-surface-variant">
                      ({Math.round((count / totalTouchpoints) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-on-surface-variant">No touchpoint data yet.</p>
          )}
        </div>

        {/* Account Comparison */}
        <div className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost">
          <h2 className="text-lg font-semibold mb-4">Account Snapshot</h2>
          <div className="space-y-4">
            {campaignMeta.accounts.map((id) => {
              const acct = accounts[id];
              const acctContacts = contacts.filter((c) => c.accountId === id);
              const topScore = acctContacts.length > 0 ? Math.max(...acctContacts.map((c) => c.score)) : 0;
              return (
                <div key={id} className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm font-medium">{acct.name.split(/,?\s+(Inc|Markets)/)[0]}</span>
                    <span className="text-xs text-on-surface-variant ml-2">({acct.ticker})</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                    <span>{acct.revenue}</span>
                    <span>{acct.revenueGrowth}</span>
                    <span>Top: {topScore}</span>
                    <span>{acctContacts.length} contacts</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/analytics/page.tsx
git commit -m "feat: add Analytics page with scoring and channel metrics"
```

---

## Task 12: Remove Old Files and Clean Up

**Files:**
- Delete: `src/app/campaigns/` (entire directory)
- Delete: `src/components/campaign/CampaignForm.tsx`
- Delete: `src/components/stages/ApprovalGate.tsx`
- Delete: `src/components/stages/SequenceScore.tsx`
- Delete: `src/components/layout/TopNav.tsx`
- Delete: `src/components/layout/StageProgress.tsx`
- Delete: `src/lib/store.ts`

- [ ] **Step 1: Remove old campaign pipeline files**

```bash
cd "/Users/aaron/Library/Mobile Documents/com~apple~CloudDocs/_Organized/06_Development/GitHub/OLD-Applause Prospecting Agent/applause-outbound-engine"
git rm -r src/app/campaigns/
git rm src/components/campaign/CampaignForm.tsx
git rm src/components/stages/ApprovalGate.tsx
git rm src/components/stages/SequenceScore.tsx
git rm src/components/layout/TopNav.tsx
git rm src/components/layout/StageProgress.tsx
git rm src/lib/store.ts
```

- [ ] **Step 2: Update `src/lib/types.ts` to re-export from data layer**

Replace the content of `src/lib/types.ts` with:

```typescript
// Re-export all types from the data layer for backward compatibility
export type {
  AccountId,
  BuyerRole,
  Priority,
  TouchpointChannel,
  CadenceType,
  CampaignMeta,
  NewsItem,
  PersonProfile,
  TechStackEntry,
  AccountProfile,
  ScoredContact,
  CadenceTouchpoint,
  Cadence,
} from "@/data/types";
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old campaign pipeline files, update type re-exports"
```

---

## Task 13: Rename PM References in Input Files

**Files:**
- Modify: Files in `inputs/` directory containing "Sr-PM-in-a-Box" or "PM" references

Per the user's safety rules ("never delete files, only move or create"), we rename directory references and update file content.

- [ ] **Step 1: Rename the directory references in content**

Search and update "Sr. Program Manager in a Box" / "Sr-PM-in-a-Box" references to "Applause Outbound Engine" in all non-node_modules files. The directories themselves will be noted for manual rename since they're reference inputs, not app source.

Files to update (content only):
- `inputs/files/Applause-Sr-PM-in-a-Box/_os/README.md`
- `inputs/files/Applause-Sr-PM-in-a-Box/_os/agents/sr-pm-orchestrator.md`
- `inputs/files/Applause-Sr-PM-in-a-Box/_references/sequence-templates.md`
- `inputs/files/Applause-Sr-PM-in-a-Box 2/_os/README.md`
- `inputs/files/Applause-Sr-PM-in-a-Box 2/_os/agents/sr-pm-orchestrator.md`
- `inputs/files/Applause-Sr-PM-in-a-Box 2/_references/sequence-templates.md`
- `inputs/files/applause-sr-pm-dashboard.jsx`
- `inputs/files 2/applause-sr-pm-dashboard.jsx`

For each file, replace occurrences of:
- "Sr. Program Manager in a Box" -> "Applause Outbound Engine"
- "Sr-PM-in-a-Box" -> "Applause Outbound Engine"  
- "Sr PM" -> "Outbound Engine"
- "sr-pm-orchestrator" -> "outbound-orchestrator" (in agent references)

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "chore: rename PM-in-a-Box references to Applause Outbound Engine"
```

---

## Task 14: Verify Build and Push to GitHub

- [ ] **Step 1: Run the dev build to verify no errors**

```bash
cd "/Users/aaron/Library/Mobile Documents/com~apple~CloudDocs/_Organized/06_Development/GitHub/OLD-Applause Prospecting Agent/applause-outbound-engine"
npx next build 2>&1 | tail -30
```

Expected: Build succeeds with no errors. Pages should compile as static or server pages.

- [ ] **Step 2: Fix any build errors**

If there are import errors or type issues, fix them and re-run the build.

- [ ] **Step 3: Push to GitHub**

```bash
git push origin applause-outbound-engine
```

Expected: Push succeeds. Vercel auto-deploys from the branch.

- [ ] **Step 4: Verify deployment**

Check that the Vercel deployment completes and the app is accessible.
