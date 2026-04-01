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
