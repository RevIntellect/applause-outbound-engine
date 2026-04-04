import { AccountDetail, Campaign, StageData } from "./outputs-types";

/* ── All account details with contacts and cadences ── */

export const accounts: AccountDetail[] = [
  {
    id: "glean",
    company: "Glean",
    fitScore: "89/100",
    priority: "HIGH",
    color: "#2db87e",
    description:
      "Full pipeline: 100+ connector attack surface, browser compatibility gaps, RAG hallucination risk. 3 contacts tied to QA, engineering, and R&D operations.",
    rep: "Kacie Taylor",
    contacts: [
      {
        name: "Navaneethakrishnan R",
        title: "Head of QA",
        score: 84,
        cadenceType: "Standard",
        roleClass: "Technical Buyer",
        capability: "Functional testing to complement automation gaps",
        touches: [
          {
            day: 1,
            channel: "Email",
            action: "Email 1",
            variants: [
              {
                label: "Variant A: Browser Coverage",
                subject: "browser coverage gaps",
                content: `Hi {{firstName}},

Glean's enterprise customers deploy across Safari, Firefox, and locked-down corporate browser builds. Chrome and Edge focus leaves blind spots when enterprises roll out at scale.

Applause tests across real browsers, devices, and network conditions to catch the compatibility issues automation misses.

Does this match a challenge your QA team is working on?

Best,`,
              },
              {
                label: "Variant B: Connector Quality",
                subject: "connector failures at scale",
                content: `Hi {{firstName}},

100+ SaaS connectors means 100+ OAuth flows, token expirations, and API rate limits to maintain. When one connector fails silently, Glean's RAG layer serves stale data and users see hallucinated results.

Applause validates real connector flows across live SaaS environments to catch these failures before production.

Worth a conversation?

Best,`,
              },
              {
                label: "Variant C: Enterprise Deployment",
                subject: "enterprise deployment confidence",
                content: `Hi {{firstName}},

Enterprise deployments require validation across browsers, networks, and OS configurations your QA team cannot cover in staging alone.

A global media company validates across 750+ device combinations in 70 countries with Applause, catching issues automation misses.

Worth exploring?

Best,`,
              },
            ],
          },
          { day: 2, channel: "LinkedIn", action: "Profile view" },
          {
            day: 3,
            channel: "Phone",
            action: "Call 1 + voicemail",
            content: `Talk track: "Hi Navaneethakrishnan, this is [Name] with Applause. I sent you a note about QA coverage for Glean's enterprise deployments. With 100+ connectors and enterprise browser diversity, how is your team validating quality across those permutations?"

Voicemail: "Hi Navaneethakrishnan, calling about QA coverage at Glean. Sent you a note. [Name] from Applause. [number]. Talk soon."`,
          },
          {
            day: 5,
            channel: "Email",
            action: "Email 2",
            variants: [
              {
                label: "Variant A: Proof",
                subject: "what we found",
                content: `Hi {{firstName}},

Following up. A leading ride-sharing platform uses Applause to maintain quality across hundreds of cities by testing where their users actually are.

If enterprise browser and connector coverage is a gap your team is working to close, worth 15 minutes?

Best,`,
              },
            ],
          },
          {
            day: 7,
            channel: "LinkedIn",
            action: "Connection request",
            content: "Hi Navaneethakrishnan, saw you lead QA at Glean. Working in the real-device testing space. Thought it would be good to connect.",
          },
          {
            day: 9,
            channel: "Phone",
            action: "Call 2 + voicemail",
            content: `Talk track: "Hi Navaneethakrishnan, following up on QA coverage. Curious if browser diversity and connector validation are areas your team is actively tackling?"

Voicemail: "Following up on QA coverage at Glean. [Name] from Applause. [number]."`,
          },
          {
            day: 11,
            channel: "Email",
            action: "Email 3",
            variants: [
              {
                label: "Variant A: Gentle Close",
                subject: "last thought",
                content: `Hi {{firstName}},

Last note. If real-world testing across enterprise browsers and connector environments is on your radar, happy to share how similar platforms handle it.

If not the right time, no worries. Appreciate your time.

Best,`,
              },
            ],
          },
          {
            day: 14,
            channel: "LinkedIn",
            action: "InMail",
            content: "Hi Navaneethakrishnan, sent a couple notes about QA coverage for Glean's enterprise deployments. Short version: 100+ connectors and enterprise browser diversity need validation automation cannot cover. Applause fills that gap. Worth a quick chat?",
          },
        ],
      },
      {
        name: "Sagar Vare",
        title: "Engineering Manager",
        score: 79,
        cadenceType: "Compact",
        roleClass: "Champion",
        capability: "Real-world testing across devices, networks, and locations",
        touches: [
          {
            day: 1,
            channel: "Email",
            action: "Email 1",
            variants: [
              {
                label: "Variant A: RAG Quality",
                subject: "RAG accuracy at scale",
                content: `Hi {{firstName}},

Stale connector data feeds Glean's RAG layer with outdated information. Users see hallucinated answers because retrieval ground truth is corrupted upstream.

Applause validates connector sync, OAuth reliability, and data freshness across real SaaS environments.

Does this match what your team sees?

Best,`,
              },
              {
                label: "Variant B: Release Quality",
                subject: "cherry-pick hotfixes",
                content: `Hi {{firstName}},

Cherry-picked hotfixes dominating your release cycle means cross-browser and deployment validation are slipping. Enterprise customers expect consistency across browsers, networks, and OS builds.

Applause tests across the real environments your enterprise customers use.

Worth a quick chat?

Best,`,
              },
            ],
          },
          { day: 2, channel: "LinkedIn", action: "Profile view" },
          {
            day: 3,
            channel: "Phone",
            action: "Call 1 + voicemail",
            content: `Talk track: "Hi Sagar, this is [Name] with Applause. Sent you a note about release quality at Glean. Curious how your engineering team handles cross-browser validation when hotfixes dominate the release cycle?"

Voicemail: "Hi Sagar, calling about release quality at Glean. [Name] from Applause. [number]. Talk soon."`,
          },
          {
            day: 5,
            channel: "Email",
            action: "Email 2",
            variants: [
              {
                label: "Variant A: Proof",
                subject: "real-world validation",
                content: `Hi {{firstName}},

Following up. A global media company uses Applause to validate across 750+ device combinations, catching issues their automation missed.

If release quality across enterprise environments is on your radar, worth a quick call?

Best,`,
              },
            ],
          },
          {
            day: 7,
            channel: "LinkedIn",
            action: "Connection request or message",
            content: "Hi Sagar, saw you manage engineering at Glean. Working in the real-device testing space. Thought it would be good to connect.",
          },
        ],
      },
      {
        name: "Jen Zagofsky",
        title: "Head of R&D Operations",
        score: 77,
        cadenceType: "Compact",
        roleClass: "Champion",
        capability: "Functional testing to complement automation gaps",
        touches: [
          {
            day: 1,
            channel: "Email",
            action: "Email 1",
            variants: [
              {
                label: "Variant A: R&D Efficiency",
                subject: "R&D operations",
                content: `Hi {{firstName}},

Glean's engineering, product, and design teams ship continuously, but QA coverage across enterprise browsers and connector environments creates a bottleneck that slows the release cycle.

Applause provides on-demand real-device testing so your R&D org maintains velocity without absorbing more QA overhead.

Worth a quick conversation?

Best,`,
              },
              {
                label: "Variant B: Enterprise Scale",
                subject: "enterprise quality",
                content: `Hi {{firstName}},

Enterprise customers expect Glean to work across Safari, Firefox, locked-down corporate browsers, and international data centers. Validating that matrix internally is a resource constraint.

Applause extends your QA coverage with real-world testing across the environments your customers actually use.

Does this resonate?

Best,`,
              },
            ],
          },
          { day: 2, channel: "LinkedIn", action: "Profile view" },
          {
            day: 3,
            channel: "Phone",
            action: "Call 1 + voicemail",
            content: `Talk track: "Hi Jen, this is [Name] with Applause. Sent you a note about QA coverage efficiency for Glean's R&D operations. With enterprise browser diversity and 100+ connectors, how is your team balancing release velocity with quality coverage?"

Voicemail: "Hi Jen, calling about R&D operations and quality coverage at Glean. [Name] from Applause. [number]. Talk soon."`,
          },
          {
            day: 5,
            channel: "Email",
            action: "Email 2",
            variants: [
              {
                label: "Variant A: Proof",
                subject: "scaling QA",
                content: `Hi {{firstName}},

Following up. A leading ride-sharing platform uses Applause to scale QA across hundreds of cities without adding permanent headcount.

If scaling quality coverage is an R&D priority, worth a quick call?

Best,`,
              },
            ],
          },
          {
            day: 7,
            channel: "LinkedIn",
            action: "Connection request or message",
            content: "Hi Jen, saw you lead R&D operations at Glean. Working in the testing operations space. Thought it would be good to connect.",
          },
        ],
      },
    ],
    stages: {
      forensic: {
        summary: "Enterprise AI search platform with 100+ SaaS connectors, browser compatibility gaps across enterprise deployments, and RAG hallucination risk from stale connector data.",
        forensic: {
          companyStats: {
            founded: "2019",
            valuation: "$4.6B",
            employees: "800+",
            funding: "$360M+ (Series D, Sequoia/Kleiner Perkins)",
            hq: "Palo Alto, CA",
            extra: [
              { label: "Connectors", value: "100+ SaaS integrations" },
              { label: "Customers", value: "500+ enterprise" },
            ],
          },
          realitySnapshot: {
            triggerEvent: "Enterprise buyers evaluating Glean across their org hit browser compatibility walls. Corporate browser builds (locked-down Chrome, Safari, Firefox ESR) break connector OAuth flows and search rendering that pass internal QA on standard Chrome.",
            bleedingNeck: "100+ SaaS connectors mean 100+ OAuth flows, token expirations, and API rate limits. When one connector fails silently, Glean's RAG layer serves stale data and users see hallucinated results. Enterprise customers lose trust in search accuracy.",
            enemy: "Internal QA tests on standard Chrome + Edge. Enterprise customers deploy across Safari, Firefox ESR, locked-down corporate browser builds, and international data centers. The gap between test coverage and real deployment is invisible until a customer reports it.",
          },
          psychologicalArchitecture: {
            silentObjection: "We have automation that covers our connector testing. External testers won't understand our RAG architecture or enterprise deployment models.",
            greenLight: "When they realize automation validates the happy path but cannot test real OAuth flows across 100+ SaaS environments with actual enterprise browser configurations and network conditions.",
          },
          insiderVocabulary: ["RAG", "connector sync", "OAuth flow", "token expiration", "hallucination rate", "retrieval ground truth", "enterprise browser build", "data freshness", "search relevance", "knowledge graph"],
          strategicEntryPoints: [
            { angle: "Browser Coverage Gap", opener: "Enterprise customers deploy across Safari, Firefox, and locked-down corporate browser builds. Chrome and Edge focus leaves blind spots when enterprises roll out at scale." },
            { angle: "Connector Quality at Scale", opener: "100+ SaaS connectors means 100+ OAuth flows, token expirations, and API rate limits to maintain. When one connector fails silently, Glean's RAG layer serves stale data." },
            { angle: "Enterprise Deployment Confidence", opener: "Enterprise deployments require validation across browsers, networks, and OS configurations your QA team cannot cover in staging alone." },
          ],
          evidenceTable: [
            { signal: "100+ SaaS connectors", detail: "Each connector has unique OAuth, API, and sync patterns requiring real-environment validation" },
            { signal: "Enterprise browser diversity", detail: "Corporate browser builds, Safari, Firefox ESR not covered in standard Chrome/Edge QA" },
            { signal: "RAG hallucination risk", detail: "Stale connector data feeds hallucinated search results. Users lose trust." },
            { signal: "Cherry-pick hotfixes", detail: "Engineering Manager role suggests reactive release cycle, cross-browser validation gaps" },
            { signal: "R&D operations role", detail: "Dedicated ops function = scaling pain, process bottlenecks in QA coverage" },
          ],
        },
        personas: [
          { name: "Navaneethakrishnan R", title: "Head of QA", forensicHook: "Owns QA coverage across 100+ connector integrations. Browser diversity in enterprise deployments creates a test matrix automation cannot cover.", whyNow: "Enterprise adoption accelerating, each new customer brings unique browser and network configurations.", silentObjection: "We have comprehensive automation coverage already." },
          { name: "Sagar Vare", title: "Engineering Manager", forensicHook: "Cherry-pick hotfixes dominating release cycle signal cross-browser validation gaps. Enterprise customers expect consistency across browsers, networks, and OS builds.", whyNow: "Hotfix-driven releases indicate quality gaps in pre-production testing.", silentObjection: "Our engineering team handles this internally." },
          { name: "Jen Zagofsky", title: "Head of R&D Operations", forensicHook: "R&D operations bottleneck: engineering, product, and design ship continuously but QA coverage across enterprise environments creates drag on release velocity.", whyNow: "Scaling R&D org needs QA coverage that scales without adding permanent headcount.", silentObjection: "We can scale QA internally as we grow." },
        ],
      } as StageData,
      icp: {
        summary: "Target persona: Head of QA / Engineering Manager / Head of R&D Operations. Pain: browser diversity + connector quality at enterprise scale. Silent objection: external testers won't understand RAG architecture.",
        personas: [
          { name: "Head of QA", title: "Technical Buyer", forensicHook: "Connector validation across 100+ SaaS environments with enterprise browser diversity", whyNow: "Enterprise adoption acceleration" },
          { name: "Engineering Manager", title: "Champion", forensicHook: "Release quality across enterprise browser/OS configurations during rapid shipping", whyNow: "Hotfix-driven release cycle" },
          { name: "Head of R&D Operations", title: "Champion", forensicHook: "QA coverage scalability without absorbing headcount into R&D org", whyNow: "R&D org scaling" },
        ],
      } as StageData,
      leads: "1. Navaneethakrishnan R, Head of QA (Score: 84, Technical Buyer, Standard cadence)\n2. Sagar Vare, Engineering Manager (Score: 79, Champion, Compact cadence)\n3. Jen Zagofsky, Head of R&D Operations (Score: 77, Champion, Compact cadence)",
      deployment: "Load cadence JSON via salesloft_batch_import_cadences. Create contacts via salesloft_create_person. Enroll via salesloft_add_person_to_cadence. 3 contacts, 28 total touchpoints across email/phone/LinkedIn.",
      feedback: "Measure: open rates (40%+ target), reply rates (5%+ target), phone connect rate, LinkedIn acceptance rate, meetings booked. Track connector/browser messaging resonance across variants.",
    },
  },
  {
    id: "harness",
    company: "Harness",
    fitScore: "85/100",
    priority: "HIGH",
    color: "#7c6bc4",
    description:
      "Full pipeline: 36 incidents in 90 days, multi-cloud testing gaps. New contacts focused on platform engineering and cloud operations.",
    rep: "Kacie Taylor",
    contacts: [
      {
        name: "Navaneeth KN",
        title: "Head of Engineering, Cloud Optimization",
        score: 84,
        cadenceType: "Standard",
        roleClass: "Technical Buyer",
        capability: "Real-world testing across devices, networks, and locations",
        touches: [
          {
            day: 1,
            channel: "Email",
            action: "Email 1",
            variants: [
              {
                label: "Variant A: Cloud Optimization",
                subject: "multi-cloud testing gaps",
                content: `Hi {{firstName}},

Harness orchestrates deployments across AWS, Azure, and GCP. But validating that each deployment works correctly in real customer environments across all three clouds is a coverage challenge automation alone cannot solve.

A leading DevOps platform uses Applause to validate cross-cloud deployments on real devices and networks before production.

Worth a quick look at how this maps to your world?

Best,`,
              },
              {
                label: "Variant B: Cost vs Quality",
                subject: "cost optimization and quality",
                content: `Hi {{firstName}},

Cloud cost optimization assumes deployments work correctly. When they do not, the cost of incident response dwarfs the savings.

Applause provides real-world functional testing across cloud environments to catch deployment failures before they trigger incidents.

Does this resonate?

Best,`,
              },
              {
                label: "Variant C: Platform Scale",
                subject: "deployment confidence",
                content: `Hi {{firstName}},

Harness processes thousands of deployments weekly. Automated tests catch logic bugs, but real-world conditions across regions, browsers, and devices create edge cases automation misses.

Applause validates deployments against real-world conditions your automation cannot replicate.

Worth a conversation?

Best,`,
              },
            ],
          },
          { day: 2, channel: "LinkedIn", action: "Profile view" },
          {
            day: 3,
            channel: "Phone",
            action: "Call 1 + voicemail",
            content: `Talk track: "Hi Navaneeth, this is [Name] with Applause. I sent you a note about multi-cloud deployment validation at Harness. When deployments ship across AWS, Azure, and GCP simultaneously, how is your team validating that each works correctly in real customer environments?"

Voicemail: "Hi Navaneeth, calling about multi-cloud deployment testing at Harness. Sent you a note. [Name] from Applause. [number]. Talk soon."`,
          },
          {
            day: 5,
            channel: "Email",
            action: "Email 2",
            variants: [
              {
                label: "Variant A: Proof",
                subject: "incident reduction",
                content: `Hi {{firstName}},

Following up. A similar platform brought in Applause for pre-release validation across real environments and reduced post-release incidents by 40%.

If deployment confidence across clouds is on your radar, worth 15 minutes?

Best,`,
              },
            ],
          },
          {
            day: 7,
            channel: "LinkedIn",
            action: "Connection request",
            content: "Hi Navaneeth, saw you lead cloud optimization engineering at Harness. Working in the real-world testing space. Thought it would be good to connect.",
          },
          {
            day: 9,
            channel: "Phone",
            action: "Call 2 + voicemail",
            content: `Talk track: "Hi Navaneeth, following up on multi-cloud deployment validation. Curious if cross-cloud testing coverage is an area your team is actively working on?"

Voicemail: "Hi Navaneeth, following up on deployment testing. [Name] from Applause. [number]."`,
          },
          {
            day: 11,
            channel: "Email",
            action: "Email 3",
            variants: [
              {
                label: "Variant A: Gentle Close",
                subject: "last thought",
                content: `Hi {{firstName}},

Last note. If real-world deployment validation across cloud providers is on your radar, happy to share how similar platforms handle it.

If not the right time, no worries. Appreciate your time.

Best,`,
              },
            ],
          },
          {
            day: 14,
            channel: "LinkedIn",
            action: "InMail",
            content: "Hi Navaneeth, sent a couple notes about real-world deployment testing for Harness. Short version: multi-cloud deployments need validation your automation cannot cover. Applause fills that gap. Worth a quick chat?",
          },
        ],
      },
      {
        name: "Puneet Saraswat",
        title: "VP, Engineering",
        score: 86,
        cadenceType: "Standard",
        roleClass: "Technical Buyer",
        capability: "Functional testing to complement automation gaps",
        touches: [
          {
            day: 1,
            channel: "Email",
            action: "Email 1",
            variants: [
              {
                label: "Variant A: Platform Quality",
                subject: "platform quality at scale",
                content: `Hi {{firstName}},

Harness ships features across CI, CD, feature flags, chaos engineering, and security testing simultaneously. Every new module expands the test surface your team needs to cover.

A leading platform company uses Applause to extend QA coverage across real environments without adding headcount.

Worth a quick look?

Best,`,
              },
              {
                label: "Variant B: Incident Reduction",
                subject: "36 incidents in 90 days",
                content: `Hi {{firstName}},

Harness had 36 incidents in 90 days, including 7 major outages. UI rendering bugs, notification failures, and multi-browser inconsistencies compound when test coverage cannot keep pace with release velocity.

Applause provides real-device testing across the browsers and environments your customers actually use.

Does this match what your team is seeing?

Best,`,
              },
              {
                label: "Variant C: Automation Gaps",
                subject: "beyond automation",
                content: `Hi {{firstName}},

Selenium-based test automation runs on Chrome in Docker. Your customers use Safari, Edge, Firefox, and mobile browsers on real networks with real latency.

Applause bridges that gap with real-world functional testing across the environments automation cannot replicate.

Worth a conversation?

Best,`,
              },
            ],
          },
          { day: 2, channel: "LinkedIn", action: "Profile view" },
          {
            day: 3,
            channel: "Phone",
            action: "Call 1 + voicemail",
            content: `Talk track: "Hi Puneet, this is [Name] with Applause. I sent you a note about platform quality at Harness. With the incident count and multi-module expansion, how is your engineering org thinking about test coverage beyond automation?"

Voicemail: "Hi Puneet, calling about platform testing at Harness. Sent you a note. [Name] from Applause. [number]. Talk soon."`,
          },
          {
            day: 5,
            channel: "Email",
            action: "Email 2",
            variants: [
              {
                label: "Variant A: Proof",
                subject: "canary validation",
                content: `Hi {{firstName}},

Following up. Cost of one incident response at Harness's scale: roughly $400K. Cost of Applause pre-release validation: $8K.

If reducing incident volume is a priority, worth 15 minutes to explore?

Best,`,
              },
            ],
          },
          {
            day: 7,
            channel: "LinkedIn",
            action: "Connection request",
            content: "Hi Puneet, saw you lead engineering at Harness. Working in the platform testing space. Thought it would be good to connect.",
          },
          {
            day: 9,
            channel: "Phone",
            action: "Call 2 + voicemail",
            content: `Talk track: "Hi Puneet, following up on platform quality. With 36 incidents in 90 days, curious if pre-release testing coverage is something your team is actively investing in?"

Voicemail: "Hi Puneet, following up on platform testing. [Name] from Applause. [number]."`,
          },
          {
            day: 11,
            channel: "Email",
            action: "Email 3",
            variants: [
              {
                label: "Variant A: Gentle Close",
                subject: "one more thought",
                content: `Hi {{firstName}},

Last note. If reducing platform incidents and extending test coverage beyond automation is on your radar, happy to share how similar DevOps platforms handle it.

If not, no worries at all. Appreciate your time.

Best,`,
              },
            ],
          },
          {
            day: 14,
            channel: "LinkedIn",
            action: "InMail",
            content: "Hi Puneet, sent a couple notes about platform quality at Harness. Short version: real-world testing catches what Selenium in Docker misses. Applause extends your coverage without adding headcount. Worth a quick chat?",
          },
        ],
      },
      {
        name: "[Verify Title] Srinivas Bandi",
        title: "VP Engineering",
        score: 80,
        cadenceType: "Standard",
        roleClass: "Technical Buyer",
        apolloRequired: true,
        capability: "Functional testing to complement automation gaps",
        touches: [],
      },
    ],
    stages: {
      forensic: {
        summary: "CI/CD platform with 36 production incidents in 90 days, multi-cloud testing gaps across AWS/Azure/GCP/on-prem, and Selenium-in-Docker limitations that miss real infrastructure behavior.",
        forensic: {
          companyStats: {
            founded: "2017",
            valuation: "$3.7B",
            employees: "1,200+",
            funding: "$425M+ (Series D)",
            hq: "San Francisco, CA",
            extra: [
              { label: "Platform", value: "CI/CD + Feature Flags + Cloud Cost" },
              { label: "Incidents (90d)", value: "36 production incidents" },
            ],
          },
          realitySnapshot: {
            triggerEvent: "36 production incidents in 90 days across the Harness platform. Multi-cloud deployments (AWS, Azure, GCP, on-prem) create an exponential test matrix that internal QA cannot cover with Selenium-in-Docker.",
            bleedingNeck: "Platform customers deploy Harness across multi-cloud environments. Each cloud provider has unique networking, IAM, and infrastructure behavior. Selenium tests in Docker containers validate UI flows but miss real infrastructure interactions, cloud-specific edge cases, and cross-provider inconsistencies.",
            enemy: "Selenium-in-Docker. It validates the happy path in a controlled container but cannot replicate multi-cloud networking, IAM policies, region-specific latency, or the real infrastructure behavior that causes production incidents.",
          },
          psychologicalArchitecture: {
            silentObjection: "We have Selenium automation running in our CI pipeline. External testing would be redundant and slow down our release velocity.",
            greenLight: "When they realize 36 incidents in 90 days means their automation is validating synthetic flows while real infrastructure behavior goes untested. The incidents are not automation gaps, they are environment gaps.",
          },
          insiderVocabulary: ["multi-cloud", "Selenium-in-Docker", "pipeline execution", "feature flags", "cloud cost management", "GitOps", "infrastructure as code", "deployment verification", "chaos engineering", "platform engineering"],
          strategicEntryPoints: [
            { angle: "Incident Reduction", opener: "36 production incidents in 90 days. Your Selenium automation validates UI flows but cannot test real infrastructure behavior across AWS, Azure, GCP, and on-prem environments." },
            { angle: "Multi-Cloud Coverage", opener: "Each cloud provider has unique networking, IAM, and infrastructure behavior. Docker-based testing misses the cross-provider inconsistencies that cause production incidents." },
            { angle: "Platform Reliability at Scale", opener: "Enterprise customers run Harness across multi-cloud environments with unique configurations. Validating that matrix requires testing where your customers actually deploy." },
          ],
          evidenceTable: [
            { signal: "36 incidents / 90 days", detail: "Production issues outpacing automation coverage across cloud environments" },
            { signal: "Multi-cloud deployments", detail: "AWS, Azure, GCP, on-prem each have unique infrastructure behavior" },
            { signal: "Selenium-in-Docker stack", detail: "Container-based testing misses real networking, IAM, and cloud-specific edge cases" },
            { signal: "Platform engineering roles", detail: "Active hiring in platform engineering suggests scaling infrastructure challenges" },
            { signal: "Feature flag complexity", detail: "Flag combinations across environments create exponential test surface" },
          ],
        },
        personas: [
          { name: "Puneet Singla", title: "Director of Quality Engineering", forensicHook: "Owns quality across a platform generating 36 production incidents in 90 days. Selenium-in-Docker validates synthetic flows while real multi-cloud infrastructure behavior goes untested.", whyNow: "Incident rate indicates quality coverage gaps that automation alone cannot close.", silentObjection: "Our Selenium pipeline is comprehensive and our team knows the platform better than external testers." },
          { name: "Srinivas Bandi", title: "VP Engineering", forensicHook: "Engineering leadership accountable for platform reliability across multi-cloud deployments. 36 incidents in 90 days is a board-level quality metric.", whyNow: "Scaling enterprise customers means each incident affects more deployments.", silentObjection: "We can solve this with better automation and more engineering hires." },
        ],
      } as StageData,
      icp: {
        summary: "Target persona: Director of Quality Engineering / VP Engineering. Pain: production incidents from multi-cloud environment gaps that Selenium-in-Docker cannot cover.",
        personas: [
          { name: "Director of Quality Engineering", title: "Technical Buyer", forensicHook: "Multi-cloud quality coverage across real infrastructure environments", whyNow: "36 incidents in 90 days" },
          { name: "VP Engineering", title: "Technical Buyer", forensicHook: "Platform reliability at enterprise scale across AWS/Azure/GCP/on-prem", whyNow: "Scaling enterprise customer base" },
        ],
      } as StageData,
      leads: "1. Puneet Singla, Director of Quality Engineering (Score: 85, Technical Buyer, Standard cadence)\n2. [Verify Title] Srinivas Bandi, VP Engineering (Score: 80, Technical Buyer, Apollo required)\n3. Additional contacts via Apollo: VP Platform Engineering, Head of DevOps, Sr. Director Cloud Operations",
      deployment: "Load cadence JSON via salesloft_batch_import_cadences. Create contacts via salesloft_create_person. Enroll via salesloft_add_person_to_cadence. Apollo enrichment needed for Srinivas Bandi title verification.",
      feedback: "Measure: open rates (40%+ target), reply rates (5%+ target), phone connect rate, LinkedIn acceptance rate, meetings booked. Track incident-reduction messaging resonance.",
    },
  },
  {
    id: "jasper",
    company: "Jasper",
    fitScore: "82/100",
    priority: "MED-HIGH",
    color: "#4a90d9",
    description:
      "Full pipeline: 15-20% hallucination rate, Chrome-only, platform freezes, data loss. 3 contacts tied to agent engineering, product management, and engineering leadership.",
    rep: "Kacie Taylor",
    contacts: [
      {
        name: "Rohini Patil",
        title: "Head of Engineering, Agentic Automation",
        score: 82,
        cadenceType: "Standard",
        roleClass: "Technical Buyer",
        capability: "Functional testing to complement automation gaps",
        touches: [
          {
            day: 1,
            channel: "Email",
            action: "Email 1",
            variants: [
              {
                label: "Variant A: Agent Validation",
                subject: "agent validation at scale",
                content: `Hi {{firstName}},

Jasper's AI agents generate content across email, social, blogs, and landing pages simultaneously. When agents produce inaccurate content or break on Safari and Firefox, enterprise customers lose trust.

Applause provides real-world functional testing to validate agent workflows across browsers, devices, and content scenarios your automation cannot cover.

Worth a quick conversation?

Best,`,
              },
              {
                label: "Variant B: Hallucination Risk",
                subject: "content accuracy",
                content: `Hi {{firstName}},

Jasper confidently states incorrect information 15-20% of the time according to user reports. For enterprise customers, that accuracy gap is a deployment blocker.

Applause tests AI agent outputs with real users in real scenarios to surface hallucination patterns your internal validation misses.

Does this resonate?

Best,`,
              },
              {
                label: "Variant C: Enterprise Readiness",
                subject: "enterprise agent readiness",
                content: `Hi {{firstName}},

Enterprise buyers ask one question before adopting AI agents: will this work consistently? Agentic automation needs functional validation beyond Chrome and Edge.

A leading healthcare app validates AI-powered updates across 20+ languages with Applause before rollout.

Worth exploring?

Best,`,
              },
            ],
          },
          { day: 2, channel: "LinkedIn", action: "Profile view" },
          {
            day: 3,
            channel: "Phone",
            action: "Call 1 + voicemail",
            content: `Talk track: "Hi Rohini, this is [Name] with Applause. I sent you a note about validating Jasper's agent workflows before enterprise rollout. With agents generating content across multiple channels simultaneously, how is your team validating accuracy and consistency across browsers and use cases?"

Voicemail: "Hi Rohini, calling about agent workflow validation at Jasper. Sent you a note. [Name] from Applause. [number]. Talk soon."`,
          },
          {
            day: 5,
            channel: "Email",
            action: "Email 2",
            variants: [
              {
                label: "Variant A: Proof",
                subject: "what similar teams do",
                content: `Hi {{firstName}},

Following up. A global media company uses Applause to validate across 750+ device combinations in 70 countries, catching content and rendering issues automation missed.

If agent validation is on your roadmap, worth 15 minutes?

Best,`,
              },
            ],
          },
          {
            day: 7,
            channel: "LinkedIn",
            action: "Connection request",
            content: "Hi Rohini, saw you lead agentic automation engineering at Jasper. Working in the AI testing and validation space. Thought it would be good to connect.",
          },
          {
            day: 9,
            channel: "Phone",
            action: "Call 2 + voicemail",
            content: `Talk track: "Hi Rohini, following up on agent validation. Curious if cross-browser testing and content accuracy are areas your team is actively working on before enterprise rollout?"

Voicemail: "Hi Rohini, following up on agent testing. [Name] from Applause. [number]."`,
          },
          {
            day: 11,
            channel: "Email",
            action: "Email 3",
            variants: [
              {
                label: "Variant A: Gentle Close",
                subject: "last thought",
                content: `Hi {{firstName}},

Last note. If validating agent workflows across real browsers and use cases is on your radar, happy to share how similar AI platforms handle it.

If not the right time, no worries. Appreciate your time.

Best,`,
              },
            ],
          },
          {
            day: 14,
            channel: "LinkedIn",
            action: "InMail",
            content: "Hi Rohini, sent a couple notes about real-world testing for Jasper's agent workflows. Short version: enterprise customers need proof that agents work consistently across browsers and scenarios. Applause provides that validation. Worth a quick chat?",
          },
        ],
      },
      {
        name: "Daniel Su",
        title: "Director of Product Management",
        score: 78,
        cadenceType: "Compact",
        roleClass: "Champion",
        capability: "Functional testing to complement automation gaps",
        touches: [
          {
            day: 1,
            channel: "Email",
            action: "Email 1",
            variants: [
              {
                label: "Variant A: Product Quality",
                subject: "product quality at scale",
                content: `Hi {{firstName}},

Jasper's platform freezes, data loss mid-workflow, and Chrome-only support create friction that slows enterprise adoption.

Applause tests product workflows across real browsers, devices, and network conditions to catch the issues that block enterprise deals.

Does this match what your product team hears from customers?

Best,`,
              },
              {
                label: "Variant B: Enterprise Adoption",
                subject: "enterprise adoption blockers",
                content: `Hi {{firstName}},

Enterprise buyers evaluate AI platforms on reliability. Users report losing 10 hours of work to data loss and encountering platform freezes during critical workflows.

Applause validates product stability across the environments your enterprise customers actually use.

Worth a conversation?

Best,`,
              },
            ],
          },
          { day: 2, channel: "LinkedIn", action: "Profile view" },
          {
            day: 3,
            channel: "Phone",
            action: "Call 1 + voicemail",
            content: `Talk track: "Hi Daniel, this is [Name] with Applause. Sent you a note about product quality for Jasper's enterprise customers. Curious how your product team is thinking about cross-browser support and platform stability as you scale?"

Voicemail: "Hi Daniel, calling about product quality at Jasper. [Name] from Applause. [number]. Talk soon."`,
          },
          {
            day: 5,
            channel: "Email",
            action: "Email 2",
            variants: [
              {
                label: "Variant A: Proof",
                subject: "enterprise confidence",
                content: `Hi {{firstName}},

Following up. A leading ride-sharing platform uses Applause to maintain product quality across hundreds of markets, catching issues before they reach enterprise customers.

If product stability is a priority for Jasper's enterprise push, worth a quick call?

Best,`,
              },
            ],
          },
          {
            day: 7,
            channel: "LinkedIn",
            action: "Connection request or message",
            content: "Hi Daniel, saw you lead product management at Jasper. Working in the product quality and testing space. Thought it would be good to connect.",
          },
        ],
      },
      {
        name: "Jonathan Blanchet",
        title: "VP of Engineering",
        score: 80,
        cadenceType: "Standard",
        roleClass: "Technical Buyer",
        capability: "Real-world testing across devices, networks, and locations",
        touches: [
          {
            day: 1,
            channel: "Email",
            action: "Email 1",
            variants: [
              {
                label: "Variant A: Platform Stability",
                subject: "platform stability",
                content: `Hi {{firstName}},

Jasper users report platform freezes and losing hours of work to data loss. Enterprise customers need confidence that the platform works reliably across browsers and devices.

Applause provides real-world functional testing across the environments your enterprise customers use, catching stability issues before they block deals.

Worth a quick look?

Best,`,
              },
              {
                label: "Variant B: Browser Coverage",
                subject: "beyond chrome and edge",
                content: `Hi {{firstName}},

Jasper currently supports Chrome and Edge. Enterprise customers deploy on Safari, Firefox, and locked-down corporate browsers. That gap is an enterprise adoption blocker.

Applause tests across real browsers, devices, and network conditions to validate cross-platform quality.

Does this resonate?

Best,`,
              },
              {
                label: "Variant C: Engineering Scale",
                subject: "scaling quality",
                content: `Hi {{firstName}},

Jasper's engineering team is rebuilding after rapid pivots. Scaling quality coverage across browsers, devices, and AI agent workflows without adding permanent headcount is the challenge.

Applause provides on-demand real-world testing that scales with your release calendar.

Worth a conversation?

Best,`,
              },
            ],
          },
          { day: 2, channel: "LinkedIn", action: "Profile view" },
          {
            day: 3,
            channel: "Phone",
            action: "Call 1 + voicemail",
            content: `Talk track: "Hi Jonathan, this is [Name] with Applause. I sent you a note about platform quality at Jasper. With enterprise customers expecting cross-browser support and AI agent reliability, how is your engineering team handling quality coverage?"

Voicemail: "Hi Jonathan, calling about platform quality at Jasper. Sent you a note. [Name] from Applause. [number]. Talk soon."`,
          },
          {
            day: 5,
            channel: "Email",
            action: "Email 2",
            variants: [
              {
                label: "Variant A: Proof",
                subject: "40% fewer escalations",
                content: `Hi {{firstName}},

Following up. A similar AI platform brought in Applause for real-device testing before major releases and saw post-release escalations drop 40%.

If platform stability is a priority, worth 15 minutes?

Best,`,
              },
            ],
          },
          {
            day: 7,
            channel: "LinkedIn",
            action: "Connection request",
            content: "Hi Jonathan, saw you lead engineering at Jasper. Working in the platform testing space. Thought it would be good to connect.",
          },
          {
            day: 9,
            channel: "Phone",
            action: "Call 2 + voicemail",
            content: `Talk track: "Hi Jonathan, following up on platform quality. Curious if cross-browser support and agent reliability are areas your team is actively investing in?"

Voicemail: "Hi Jonathan, following up on platform testing. [Name] from Applause. [number]."`,
          },
          {
            day: 11,
            channel: "Email",
            action: "Email 3",
            variants: [
              {
                label: "Variant A: Gentle Close",
                subject: "last thought",
                content: `Hi {{firstName}},

Last note. If real-world testing across browsers and devices is on your radar as Jasper scales enterprise, happy to share how similar platforms handle it.

If not the right time, no worries. Appreciate your time.

Best,`,
              },
            ],
          },
          {
            day: 14,
            channel: "LinkedIn",
            action: "InMail",
            content: "Hi Jonathan, sent a couple notes about platform quality at Jasper. Short version: enterprise customers need cross-browser reliability and agent consistency. Applause provides that validation. Worth a quick chat?",
          },
        ],
      },
    ],
    stages: {
      forensic: {
        summary: "AI content platform with 15-20% hallucination rate, Chrome-only enterprise deployment, platform freezes during content generation, and data loss risk from unsaved drafts. Pivoting from consumer AI writing to enterprise marketing platform.",
        forensic: {
          companyStats: {
            founded: "2017",
            valuation: "$1.5B (down from $1.5B peak)",
            employees: "350+",
            funding: "$250M+",
            hq: "Austin, TX",
            extra: [
              { label: "Platform", value: "Enterprise AI content + agents" },
              { label: "Pivot", value: "Consumer AI writing to enterprise marketing" },
            ],
          },
          realitySnapshot: {
            triggerEvent: "Jasper pivoting from consumer AI writing to enterprise marketing platform with agentic automation. Enterprise customers require cross-browser reliability, multi-user collaboration stability, and consistent agent output across environments.",
            bleedingNeck: "15-20% hallucination rate across content generation. Platform freezes during long-form content creation. Chrome-only optimization means enterprise customers on Safari, Firefox, and locked-down corporate browsers experience degraded or broken UX. Unsaved draft data loss during crashes.",
            enemy: "Chrome-only development and testing. Enterprise marketing teams use Safari, Firefox, and managed browser environments. Jasper's platform breaks in ways that only appear outside the Chrome bubble their engineering team develops in.",
          },
          psychologicalArchitecture: {
            silentObjection: "We're focused on our AI models and agent architecture. Browser compatibility is a lower priority than model quality and feature velocity.",
            greenLight: "When they realize enterprise buyers evaluate platforms across their existing browser environments. Chrome-only support is a sales blocker, not just a quality issue. Platform freezes and data loss erode enterprise trust faster than hallucination improvements can rebuild it.",
          },
          insiderVocabulary: ["agentic automation", "content generation", "hallucination rate", "brand voice", "enterprise marketing", "multi-user collaboration", "AI agents", "content workflow", "brand guidelines", "template system"],
          strategicEntryPoints: [
            { angle: "Enterprise Browser Gap", opener: "Enterprise marketing teams run Safari, Firefox, and managed browser builds. Chrome-only optimization means broken UX for the enterprise buyers Jasper is pivoting toward." },
            { angle: "Platform Stability", opener: "Platform freezes during content generation and unsaved draft data loss. Enterprise customers need reliability before they trust an AI platform with their marketing workflow." },
            { angle: "Agent Consistency", opener: "Agentic automation requires consistent output across environments. Browser and device variability affects how agents render, execute, and present results to enterprise users." },
          ],
          evidenceTable: [
            { signal: "15-20% hallucination rate", detail: "Content accuracy issues compound with browser rendering inconsistencies" },
            { signal: "Chrome-only optimization", detail: "Enterprise buyers on Safari/Firefox experience broken or degraded UX" },
            { signal: "Platform freezes", detail: "Long-form content generation crashes, data loss from unsaved drafts" },
            { signal: "Enterprise pivot", detail: "Moving from consumer AI to enterprise marketing platform with higher reliability bar" },
            { signal: "Agentic automation launch", detail: "New agent architecture needs cross-environment validation" },
          ],
        },
        personas: [
          { name: "Rohini Patil", title: "Head of Engineering, Agentic Automation", forensicHook: "Leading Jasper's agent engineering. Agentic automation requires cross-environment validation that Chrome-only testing misses. Enterprise customers need consistent agent behavior across browsers and devices.", whyNow: "Agent platform launch requires enterprise-grade reliability.", silentObjection: "We're focused on agent intelligence, not browser compatibility." },
          { name: "James De Roche", title: "Director of Product Management", forensicHook: "Product owner for enterprise features. Platform freezes, data loss, and Chrome-only UX are product-level risks that affect enterprise adoption and retention.", whyNow: "Enterprise pivot demands product reliability metrics.", silentObjection: "Browser support is an engineering issue, not a product priority." },
          { name: "Jonathan Marek", title: "VP Engineering", forensicHook: "Engineering leadership accountable for platform reliability. 15-20% hallucination rate, platform crashes, and Chrome-only deployment are technical debt blocking enterprise credibility.", whyNow: "Enterprise customers require platform stability before committing budgets.", silentObjection: "We can address this with internal engineering improvements." },
        ],
      } as StageData,
      icp: {
        summary: "Target persona: Head of Engineering / Director of Product / VP Engineering. Pain: Chrome-only enterprise deployment, platform instability, and agent consistency across environments.",
        personas: [
          { name: "Head of Engineering, Agentic", title: "Technical Buyer", forensicHook: "Agent cross-environment validation", whyNow: "Agent platform launch" },
          { name: "Director of Product", title: "Champion", forensicHook: "Enterprise product reliability and adoption", whyNow: "Enterprise pivot" },
          { name: "VP Engineering", title: "Technical Buyer", forensicHook: "Platform reliability and technical debt", whyNow: "Enterprise credibility" },
        ],
      } as StageData,
      leads: "1. Rohini Patil, Head of Engineering, Agentic Automation (Score: 82, Technical Buyer, Standard cadence)\n2. James De Roche, Director of Product Management (Score: 78, Champion, Compact cadence)\n3. Jonathan Marek, VP Engineering (Score: 75, Technical Buyer, Compact cadence)",
      deployment: "Load cadence JSON via salesloft_batch_import_cadences. Create contacts via salesloft_create_person. Enroll via salesloft_add_person_to_cadence. 3 contacts, 26 total touchpoints.",
      feedback: "Measure: open rates (40%+ target), reply rates (5%+ target), phone connect rate, LinkedIn acceptance rate, meetings booked. Track enterprise-pivot and agent messaging resonance.",
    },
  },
  {
    id: "snap",
    company: "Snap Inc.",
    fitScore: "N/A",
    priority: "HIGH",
    color: "#2db87e",
    description:
      "Full pipeline: Android device fragmentation across 200+ models, AR Lens crashes, Spectacles launch, $500M subscription risk. 3 contacts at Director/Manager level tied to quality, app platform, and AR camera.",
    rep: "Andrew Goble",
    contacts: [
      {
        name: "Vivitha Venugopal",
        title: "Engineering Manager, Quality",
        score: 82,
        cadenceType: "Standard",
        roleClass: "Technical Buyer",
        capability: "Real-world testing across devices, networks, and locations",
        touches: [
          {
            day: 1,
            channel: "Email",
            action: "Email 1",
            variants: [
              {
                label: "Variant A: Device Coverage",
                subject: "device coverage gaps",
                content: `Hi {{firstName}},

Snap ships to 500M+ users across 200+ Android models. Validating quality across that device matrix is nearly impossible with automation alone.

A global media company uses Applause to test across 750+ device combinations in 70 countries, catching fragmentation issues before users do.

Applause provides on-demand real-device testing so your QA team extends coverage without adding headcount.

Does this match a challenge your team is working on?

Best,`,
              },
              {
                label: "Variant B: AR Quality",
                subject: "AR quality at scale",
                content: `Hi {{firstName}},

AR Lenses that exceed 275MB crash lower-end Android devices. Camera rendering varies wildly across the Galaxy A series, Pixel, and mid-range Samsung models.

A leading ride-sharing platform uses Applause to validate app quality across hundreds of real devices in real markets.

Applause provides real-world functional testing across the device tiers your automation cannot replicate.

Worth a quick conversation?

Best,`,
              },
              {
                label: "Variant C: Spectacles",
                subject: "spectacles testing",
                content: `Hi {{firstName}},

Spectacles with Snap OS adds an entirely new hardware platform to your testing surface. Sub-13ms motion-to-photon latency can only be validated with real users in real environments.

Applause provides on-demand testers across real devices and AR hardware to catch performance issues before launch.

Worth exploring?

Best,`,
              },
            ],
          },
          { day: 2, channel: "LinkedIn", action: "Profile view" },
          {
            day: 3,
            channel: "Phone",
            action: "Call 1 + voicemail",
            content: `Talk track: "Hi Vivitha, this is [Name] with Applause. I sent you a note about device coverage for Snap's quality program. With 200+ Android models and AR Lens performance varying by device tier, how is your team currently validating across that fragmentation?"

Voicemail: "Hi Vivitha, calling about device coverage for Snap's quality program. Sent you a note with context. [Name] from Applause. [number]. Talk soon."`,
          },
          {
            day: 5,
            channel: "Email",
            action: "Email 2",
            variants: [
              {
                label: "Variant A: Proof",
                subject: "what we found",
                content: `Hi {{firstName}},

Following up on device coverage at Snap.

A similar platform brought in Applause for real-device regression testing and reduced post-release escalations by 40% without adding QA headcount.

If your team is absorbing more test surface with each release, worth 15 minutes to explore?

Best,`,
              },
            ],
          },
          {
            day: 7,
            channel: "LinkedIn",
            action: "Connection request",
            content: "Hi Vivitha, saw you lead quality engineering at Snap. Working in the real-device testing space. Thought it would be good to connect.",
          },
          {
            day: 9,
            channel: "Phone",
            action: "Call 2 + voicemail",
            content: `Talk track: "Hi Vivitha, following up on the device coverage note. Curious if Android fragmentation and AR quality are areas your team is actively tackling?"

Voicemail: "Hi Vivitha, following up on device testing at Snap. [Name] from Applause. [number]. Talk soon."`,
          },
          {
            day: 11,
            channel: "Email",
            action: "Email 3",
            variants: [
              {
                label: "Variant A: Gentle Close",
                subject: "last thought",
                content: `Hi {{firstName}},

Last note on this. If real-device testing across Android tiers and AR hardware is on your radar, happy to share how similar platforms handle it.

If not the right time, no worries. Appreciate your time.

Best,`,
              },
            ],
          },
          {
            day: 14,
            channel: "LinkedIn",
            action: "InMail",
            content: "Hi Vivitha, sent a couple notes about real-device testing for Snap's quality program. Short version: 200+ Android models and AR hardware need validation your automation cannot cover. Applause fills that gap. Worth a quick chat?",
          },
        ],
      },
      {
        name: "Gustavo Moura",
        title: "Director of Engineering, App Platform",
        score: 80,
        cadenceType: "Standard",
        roleClass: "Technical Buyer",
        capability: "Functional testing to complement automation gaps",
        touches: [
          {
            day: 1,
            channel: "Email",
            action: "Email 1",
            variants: [
              {
                label: "Variant A: Ship Speed",
                subject: "shipping speed vs coverage",
                content: `Hi {{firstName}},

Snap's app platform ships at a pace that makes comprehensive device testing nearly impossible internally. Every new Snapchat+ feature, Lens, and platform update expands the test surface.

A leading DevOps platform uses Applause to validate releases across real devices before production, maintaining velocity without absorbing QA overhead.

Worth a quick look at how this maps to your release process?

Best,`,
              },
              {
                label: "Variant B: Snapchat+",
                subject: "subscription quality",
                content: `Hi {{firstName}},

Snapchat+ hit 24M subscribers at $500M+ annualized. Every app crash that breaks a Snap Streak is a subscription cancellation risk.

Applause provides on-demand functional testing across real devices and networks to catch the crashes that break premium features before paying users see them.

Does this resonate?

Best,`,
              },
              {
                label: "Variant C: Platform Scale",
                subject: "platform scale",
                content: `Hi {{firstName}},

Maintaining app platform quality across 200+ Android models while shipping continuously is a coverage challenge automation alone cannot solve.

Applause extends your testing reach with real-device, real-network validation across the device tiers your users actually run.

Worth a conversation?

Best,`,
              },
            ],
          },
          { day: 2, channel: "LinkedIn", action: "Profile view" },
          {
            day: 3,
            channel: "Phone",
            action: "Call 1 + voicemail",
            content: `Talk track: "Hi Gustavo, this is [Name] with Applause. I sent you a note about app platform quality at Snap's shipping pace. How is your team balancing release velocity with device coverage across 200+ Android models?"

Voicemail: "Hi Gustavo, calling about app platform testing coverage at Snap. Sent you a note. [Name] from Applause. [number]. Talk soon."`,
          },
          {
            day: 5,
            channel: "Email",
            action: "Email 2",
            variants: [
              {
                label: "Variant A: Proof",
                subject: "40% fewer escalations",
                content: `Hi {{firstName}},

Following up on platform quality at scale.

A similar platform brought in Applause for pre-release testing across real devices and saw post-release escalations drop 40%.

If your app platform team is feeling the strain of an expanding test surface, worth 15 minutes?

Best,`,
              },
            ],
          },
          {
            day: 7,
            channel: "LinkedIn",
            action: "Connection request",
            content: "Hi Gustavo, saw you lead app platform engineering at Snap. Working in the real-device testing space. Thought it would be useful to connect.",
          },
          {
            day: 9,
            channel: "Phone",
            action: "Call 2 + voicemail",
            content: `Talk track: "Hi Gustavo, following up on app platform quality. With Snapchat+ growing and features shipping continuously, curious how your team is handling device coverage?"

Voicemail: "Hi Gustavo, following up on app platform testing. [Name] from Applause. [number]."`,
          },
          {
            day: 11,
            channel: "Email",
            action: "Email 3",
            variants: [
              {
                label: "Variant A: Gentle Close",
                subject: "one more thought",
                content: `Hi {{firstName}},

Last note. If device coverage for app platform releases is a challenge your team is working through, happy to share how similar platforms handle it.

If not, no worries at all. Appreciate your time.

Best,`,
              },
            ],
          },
          {
            day: 14,
            channel: "LinkedIn",
            action: "InMail",
            content: "Hi Gustavo, sent a couple notes about real-device testing for Snap's app platform. If device coverage at your shipping pace is on your radar, worth a quick chat?",
          },
        ],
      },
      {
        name: "Oleksandr Opara",
        title: "Sr. Software Engineering Manager, AR Camera Platform",
        score: 78,
        cadenceType: "Compact",
        roleClass: "Champion",
        capability: "Real-world testing across devices, networks, and locations",
        touches: [
          {
            day: 1,
            channel: "Email",
            action: "Email 1",
            variants: [
              {
                label: "Variant A: Camera Fragmentation",
                subject: "camera quality across android",
                content: `Hi {{firstName}},

Snapchat's camera quality on mid-range Android phones is still years behind iOS. The Galaxy A series outsells the S series 10-to-1, and those are the devices where camera rendering falls apart.

Applause tests camera and AR features across 200+ real Android devices to catch the device-tier issues before your 500M users do.

Does this match what your team sees?

Best,`,
              },
              {
                label: "Variant B: AR Rendering",
                subject: "AR rendering on real devices",
                content: `Hi {{firstName}},

AR Lens rendering varies wildly across Android device tiers. Memory limits, GPU differences, and camera hardware create edge cases automation cannot replicate.

Applause provides real-device testing across the Android models your users actually run, catching AR performance issues before launch.

Worth a conversation?

Best,`,
              },
            ],
          },
          { day: 2, channel: "LinkedIn", action: "Profile view" },
          {
            day: 3,
            channel: "Phone",
            action: "Call 1 + voicemail",
            content: `Talk track: "Hi Oleksandr, this is [Name] with Applause. I sent you a note about camera and AR quality across Android device tiers. With 200+ models and varying GPU capabilities, how is your team validating AR rendering across that fragmentation?"

Voicemail: "Hi Oleksandr, calling about AR camera testing across Android devices. Sent you a note. [Name] from Applause. [number]. Talk soon."`,
          },
          {
            day: 5,
            channel: "Email",
            action: "Email 2",
            variants: [
              {
                label: "Variant A: Proof",
                subject: "what similar teams do",
                content: `Hi {{firstName}},

Following up. A global media company uses Applause to validate across 750+ device combinations in 70 countries, catching rendering and performance issues their automation missed.

If AR camera quality across device tiers is on your radar, worth a quick call?

Best,`,
              },
            ],
          },
          {
            day: 7,
            channel: "LinkedIn",
            action: "Connection request or message",
            content: "Hi Oleksandr, saw you lead AR camera platform at Snap. Working in the real-device testing space and thought it would be good to connect.",
          },
        ],
      },
    ],
  },
  {
    id: "robinhood",
    company: "Robinhood",
    fitScore: "N/A",
    priority: "HIGH",
    color: "#2db87e",
    description:
      "Full pipeline: 177+ outages, $71.75M in fines, Legend platform issues, mobile trading quality gaps. 1 confirmed QA contact, 2 need Apollo enrichment.",
    rep: "Andrew Goble",
    contacts: [
      {
        name: "Kristina Tuchkova",
        title: "Quality Engineering Manager",
        score: 82,
        cadenceType: "Standard",
        roleClass: "Technical Buyer",
        capability: "Real-world testing across devices, networks, and locations",
        touches: [
          {
            day: 1,
            channel: "Email",
            action: "Email 1",
            variants: [
              {
                label: "Variant A: Device Coverage",
                subject: "trading on real devices",
                content: `Hi {{firstName}},

Robinhood traders make critical decisions on phones with spotty connectivity during volatile markets. Legend shows "data not found" errors and lag when it matters most.

Applause tests trading workflows across real devices and network conditions to catch the performance failures that cost trades.

Does this match a challenge your QA team is tackling?

Best,`,
              },
              {
                label: "Variant B: Quality at Scale",
                subject: "QA coverage gap",
                content: `Hi {{firstName}},

177 outages in 6 years. The most recent was February 2026. Every outage during a volatile market costs trust and revenue.

Applause provides on-demand real-device testing across the phones, tablets, and network conditions your internal QA cannot replicate at scale.

Worth a quick conversation?

Best,`,
              },
              {
                label: "Variant C: Mobile Quality",
                subject: "mobile options execution",
                content: `Hi {{firstName}},

Options execution failures on mobile are driving user complaints. Auto-execution for buying and selling has consistent failures that your traders report publicly.

Applause tests trading workflows on real phones under real 4G and Wi-Fi conditions to catch execution issues before they reach production.

Worth exploring?

Best,`,
              },
            ],
          },
          { day: 2, channel: "LinkedIn", action: "Profile view" },
          {
            day: 3,
            channel: "Phone",
            action: "Call 1 + voicemail",
            content: `Talk track: "Hi Kristina, this is [Name] with Applause. I sent you a note about real-device testing for Robinhood's trading platform. With Legend performance issues and mobile execution failures, how is your QA team currently handling device and network coverage?"

Voicemail: "Hi Kristina, calling about real-device testing for Robinhood. Sent you a note. [Name] from Applause. [number]. Talk soon."`,
          },
          {
            day: 5,
            channel: "Email",
            action: "Email 2",
            variants: [
              {
                label: "Variant A: Proof",
                subject: "what we found",
                content: `Hi {{firstName}},

Following up. Fidelity and Schwab maintain 4.5+ app ratings because they test trading workflows on real devices under real market conditions.

Applause provides the same real-world testing coverage for fintech platforms. If device coverage is a gap your team is working to close, worth 15 minutes?

Best,`,
              },
            ],
          },
          {
            day: 7,
            channel: "LinkedIn",
            action: "Connection request",
            content: "Hi Kristina, saw you lead quality engineering at Robinhood. Working in the real-device testing space. Thought it would be good to connect.",
          },
          {
            day: 9,
            channel: "Phone",
            action: "Call 2 + voicemail",
            content: `Talk track: "Hi Kristina, following up on real-device testing for Robinhood. Curious if mobile trading quality and device coverage are areas your QA team is actively tackling?"

Voicemail: "Hi Kristina, following up on testing coverage. [Name] from Applause. [number]."`,
          },
          {
            day: 11,
            channel: "Email",
            action: "Email 3",
            variants: [
              {
                label: "Variant A: Gentle Close",
                subject: "last thought",
                content: `Hi {{firstName}},

Last note. If real-device testing for trading workflows is on your radar, happy to share how similar fintech platforms handle coverage at scale.

If not the right time, no worries. Appreciate your time.

Best,`,
              },
            ],
          },
          {
            day: 14,
            channel: "LinkedIn",
            action: "InMail",
            content: "Hi Kristina, sent a couple notes about real-device testing for Robinhood's trading platform. Short version: device and network coverage gaps drive the outages and execution failures your users report. Applause fills that gap. Worth a quick chat?",
          },
        ],
      },
      {
        name: "[Verify Title] Johann Kerbrat",
        title: "Head of Crypto Engineering",
        score: 78,
        cadenceType: "Compact",
        roleClass: "Champion",
        apolloRequired: true,
        capability: "Payment and transaction testing in production-like environments",
        touches: [],
      },
      {
        name: "[Verify Title] Tony Wong",
        title: "Software Engineering Manager",
        score: 75,
        cadenceType: "Compact",
        roleClass: "Champion",
        apolloRequired: true,
        capability: "Functional testing to complement automation gaps",
        touches: [],
      },
    ],
  },
  {
    id: "intuit",
    company: "Intuit",
    fitScore: "N/A",
    priority: "HIGH",
    color: "#2db87e",
    description:
      "Full pipeline: 1,800 layoffs gutted QA capacity, broken releases across TurboTax/QuickBooks/Credit Karma, AI hallucination risk. 1 confirmed engineering contact, 2 need Apollo enrichment.",
    rep: "Andrew Goble",
    contacts: [
      {
        name: "Rajat Khare",
        title: "Director, Distinguished Engineer",
        score: 79,
        cadenceType: "Compact",
        roleClass: "Champion",
        capability: "Functional testing to complement automation gaps",
        touches: [
          {
            day: 1,
            channel: "Email",
            action: "Email 1",
            variants: [
              {
                label: "Variant A: Quality Collapse",
                subject: "product quality after restructuring",
                content: `Hi {{firstName}},

Intuit shipped broken releases across TurboTax, QuickBooks, and Credit Karma after the July 2024 restructuring. Community forums are calling the 2025 releases "the worst product ever since the 80s."

Applause provides on-demand real-device testing to extend your engineering team's coverage without adding permanent headcount.

Does this resonate with what your team is seeing?

Best,`,
              },
              {
                label: "Variant B: Mobile Quality",
                subject: "quickbooks mobile",
                content: `Hi {{firstName}},

QuickBooks iOS app logs users out continuously and takes forever to sign back in. SMB customers in the field depend on mobile access.

Applause tests across real iOS and Android devices under real network conditions to catch login and performance issues before they drive churn.

Worth a conversation?

Best,`,
              },
            ],
          },
          { day: 2, channel: "LinkedIn", action: "Profile view" },
          {
            day: 3,
            channel: "Phone",
            action: "Call 1 + voicemail",
            content: `Talk track: "Hi Rajat, this is [Name] with Applause. I sent you a note about product quality across the Intuit suite after the restructuring. With reduced QA capacity and expanding product surface, how is your team handling the coverage gap?"

Voicemail: "Hi Rajat, calling about testing coverage at Intuit. Sent you a note. [Name] from Applause. [number]. Talk soon."`,
          },
          {
            day: 5,
            channel: "Email",
            action: "Email 2",
            variants: [
              {
                label: "Variant A: Proof",
                subject: "what similar teams do",
                content: `Hi {{firstName}},

Following up. A similar financial platform brought in Applause for real-device regression testing and reduced post-release escalations significantly without adding QA headcount.

If your team is feeling the strain of reduced capacity, worth a quick call?

Best,`,
              },
            ],
          },
          {
            day: 7,
            channel: "LinkedIn",
            action: "Connection request or message",
            content: "Hi Rajat, saw your work as Director, Distinguished Engineer at Intuit. Working in the real-device testing space. Thought it would be good to connect.",
          },
        ],
      },
      {
        name: "[Verify Title] Beatrice Hendra",
        title: "Group Engineering Manager",
        score: 76,
        cadenceType: "Compact",
        roleClass: "Champion",
        apolloRequired: true,
        capability: "Functional testing to complement automation gaps",
        touches: [],
      },
      {
        name: "[Verify Title] Bharath Brahmakal",
        title: "Engineering Manager",
        score: 74,
        cadenceType: "Compact",
        roleClass: "Champion",
        apolloRequired: true,
        capability: "Real-world testing across devices, networks, and locations",
        touches: [],
      },
    ],
  },
  {
    id: "sharkninja",
    company: "SharkNinja",
    fitScore: "87/100",
    priority: "HIGH",
    color: "#c94e7c",
    description: "Transitioning from hardware to connected products. CTO Dawn Fitzgerald leading IoT/AI/ML strategy. Actively hiring Sr. QA Engineer for IoT ecosystem testing.",
    rep: "Drew Delano",
    contacts: [
      { name: "Dawn Fitzgerald", title: "CTO (CISM)", score: 87, cadenceType: "Extended", roleClass: "Economic Buyer", capability: "Executive sponsor for IoT testing strategy", touches: [] },
      { name: "Steve Gacin", title: "Sr. Director Engineering", score: 82, cadenceType: "Standard", roleClass: "Technical Buyer", capability: "Engineering lead for connected product testing", touches: [] },
      { name: "Shannon McSweeney", title: "VP Product Dev", score: 78, cadenceType: "Standard", roleClass: "Champion", capability: "Product development testing advocacy", touches: [] },
      { name: "Karan Weller", title: "Director CORE Engineering", score: 75, cadenceType: "Compact", roleClass: "Influencer", capability: "Core engineering quality assurance", touches: [] },
    ],
    stages: {
      forensic: "Trigger: Connected product launches requiring firmware + cloud + mobile testing across all customer phones. Enemy: Limited internal QA trying to test 4 surfaces per product. Bleeding neck: \"Shark app not connecting to robot vacuum\"",
      icp: "Persona: CTO / VP Engineering / QA Director. Pain: shipping connected products faster than QA infrastructure can test them. Silent objection: external testers won't understand firmware/app handshake.",
      leads: "1. Dawn Fitzgerald, CTO (CISM)\n2. Steve Gacin, Sr. Director Engineering\n3. Shannon McSweeney, VP Product Dev\n4. Karan Weller, Director CORE Engineering\n5. QA hiring manager (active Sr. QA Engineer posting)",
      deployment: "Load cadence JSON via salesloft_batch_import_cadences. Create contacts via salesloft_create_person. Enroll via salesloft_add_person_to_cadence.",
      feedback: "Measure: open rates (40%+), reply rates (5%+), phone connect rate, LinkedIn acceptance, meetings booked.",
    },
  },
  {
    id: "caesars",
    company: "Caesars Sportsbook",
    fitScore: "89/100",
    priority: "HIGH",
    color: "#c94e7c",
    description: "Just migrated to fully proprietary tech stack for 2025-2026 NFL season. $1.41B digital revenue (+21% YoY). Users reporting sign-in crashes.",
    rep: "Drew Delano",
    contacts: [
      { name: "Eric Hession", title: "President Caesars Digital", score: 91, cadenceType: "Extended", roleClass: "Economic Buyer", capability: "P&L owner, $1.41B digital revenue", touches: [] },
      { name: "Derek Edwards", title: "VP Engineering", score: 86, cadenceType: "Standard", roleClass: "Technical Buyer", capability: "227-person IT department lead", touches: [] },
      { name: "Director of QA", title: "Sr. QA Automation Engineer (active posting)", score: 80, cadenceType: "Standard", roleClass: "Champion", capability: "QA leadership for platform migration", touches: [] },
    ],
    stages: {
      forensic: "Trigger: Platform migration to proprietary stack under live NFL traffic. 2-3x more betting markets. Sign-in crashes reported. Enemy: New tech stack untested across full device matrix.",
      icp: "Persona: VP Engineering / Digital President. Pain: zero tolerance for live betting failures during peak events. Silent objection: regulated industry, compliance requirements.",
      leads: "1. Eric Hession, President Caesars Digital ($1.41B P&L)\n2. Derek Edwards, VP Engineering (227-person IT dept)\n3. Director of QA (from active Sr. QA Automation Engineer posting)\n4. VP/Director Product, Sportsbook\n5. CTO / Head of Platform Engineering",
      deployment: "Load cadence JSON. Create contacts. Note: regulated industry, compliance review may be required before pilot.",
      feedback: "Measure: open/reply rates, meetings booked. Track timing against NFL/NCAA/NBA calendar for urgency triggers.",
    },
  },
  {
    id: "best-western",
    company: "Best Western",
    fitScore: "84/100",
    priority: "HIGH",
    color: "#c94e7c",
    description: "New CTO Bill Ryan (from Backcountry/PetSmart, digital transformation mandate). Former CDO Greg Adams LEFT in 2024. App serves 4,200+ properties in 100+ countries.",
    rep: "Drew Delano",
    contacts: [
      { name: "Bill Ryan", title: "SVP & CTO", score: 84, cadenceType: "Extended", roleClass: "Economic Buyer", capability: "Digital transformation mandate, appointed Oct 2024", touches: [] },
      { name: "Director of Engineering", title: "App Development", score: 76, cadenceType: "Compact", roleClass: "Technical Buyer", capability: "App dev lead for 100+ country footprint", touches: [] },
    ],
    stages: {
      forensic: "Trigger: New CTO from retail bringing fresh quality standards. CDO departed (leadership vacuum). App serves 100+ countries. Enemy: US-based QA testing US devices for global audience.",
      icp: "Persona: CTO / VP Digital. Pain: app serves 4,200 properties in 100+ countries, QA doesn't cover international devices. Silent objection: franchise model, technology decisions need owner buy-in.",
      leads: "1. Bill Ryan, SVP & CTO (CONFIRMED, appointed Oct 2024)\n2. VP/Director Digital (CDO role VACANT since Greg Adams left 2024)\n3. Director of Engineering / App Development\n4. VP/Director IT Operations (AutoClerk Atlas PMS rollout)\n5. Larry Cuculic, President & CEO (multi-threading context)",
      deployment: "Load cadence JSON. Create Bill Ryan contact. NOTE: Greg Adams (former CDO) LEFT in 2024, do NOT target. Monitor for CDO replacement hire.",
      feedback: "Measure: open/reply rates, meetings booked. Monitor for new digital leadership hires (CDO replacement).",
    },
  },
  {
    id: "elementor",
    company: "Elementor",
    fitScore: "88/100",
    priority: "HIGH",
    color: "#2db87e",
    description: "Studio adoption stalled at 8%. Website builder with complex plugin/theme ecosystem requiring cross-browser and device testing.",
    rep: "TBD",
    contacts: [],
    stages: {
      forensic: "Trigger: Studio adoption stalled at 8%, cross-browser rendering issues with plugin ecosystem. Enemy: Can't test every WordPress theme/plugin combination.",
      icp: "Persona: VP Engineering / Head of QA. Pain: Studio adoption blocked by quality issues users find before QA does.",
    },
  },
  {
    id: "crazylabs",
    company: "CrazyLabs",
    fitScore: "86/100",
    priority: "HIGH",
    color: "#2db87e",
    description: "250 games monthly at device risk. Hyper-casual game publisher needing device coverage across fragmented Android market.",
    rep: "TBD",
    contacts: [],
    stages: {
      forensic: "Trigger: 250 games published monthly, each needs device-specific testing. Android fragmentation creates invisible crashes on mid-range devices.",
      icp: "Persona: VP Publishing / QA Director. Pain: game crashes on devices QA team doesn't own or test on.",
    },
  },
  {
    id: "papaya-gaming",
    company: "Papaya Gaming",
    fitScore: "85/100",
    priority: "HIGH",
    color: "#2db87e",
    description: "Regulatory remediation mode. Real-money gaming requiring compliance testing across jurisdictions.",
    rep: "TBD",
    contacts: [],
    stages: {
      forensic: "Trigger: Regulatory remediation, real-money gaming requires compliance testing across US states. Enemy: Each jurisdiction has different rules.",
      icp: "Persona: Head of Compliance / VP Engineering. Pain: regulatory failures from untested edge cases in specific markets.",
    },
  },
  {
    id: "wix",
    company: "Wix",
    fitScore: "83/100",
    priority: "MED-HIGH",
    color: "#2db87e",
    description: "Website builder platform with massive template/app ecosystem. Cross-browser rendering consistency is critical.",
    rep: "TBD",
    contacts: [],
    stages: {
      forensic: "Trigger: Template and app marketplace creates exponential test surface. Wix Studio competing with Webflow. Enemy: Can't test every template on every browser.",
      icp: "Persona: VP Engineering / QA Lead. Pain: user-generated content creates unpredictable rendering issues.",
    },
  },
  {
    id: "yotpo",
    company: "Yotpo",
    fitScore: "78/100",
    priority: "MED-HIGH",
    color: "#2db87e",
    description: "E-commerce marketing platform. Widget rendering across thousands of Shopify/Magento storefronts.",
    rep: "TBD",
    contacts: [],
    stages: {
      forensic: "Trigger: Widgets render inside merchant storefronts with unpredictable CSS/JS environments. Enemy: Can't test on every merchant's site.",
      icp: "Persona: VP Product / Engineering Lead. Pain: review widgets breaking on merchant sites they can't control.",
    },
  },
  {
    id: "overwolf",
    company: "Overwolf",
    fitScore: "76/100",
    priority: "MED-HIGH",
    color: "#2db87e",
    description: "Gaming overlay platform. Overlay breakage after game updates, cross-platform fairness for esports.",
    rep: "TBD",
    contacts: [],
    stages: {
      forensic: "Trigger: Game updates break overlays without warning. 100K+ creators depend on stable overlay rendering. Enemy: No control over game client updates.",
      icp: "Persona: VP Engineering / Platform Lead. Pain: overlay crashes after game patches, creator churn from instability.",
    },
  },
  {
    id: "candivore",
    company: "Candivore",
    fitScore: "71/100",
    priority: "MED-HIGH",
    color: "#2db87e",
    description: "Mobile puzzle game developer. Preview-reality gaps across device tiers.",
    rep: "TBD",
    contacts: [],
    stages: {
      forensic: "Trigger: Game looks different on test devices vs. actual player devices. Mid-range Android performance gaps. Enemy: Small QA team, large device market.",
      icp: "Persona: CTO / QA Lead. Pain: players on budget phones experience crashes and rendering bugs QA never sees.",
    },
  },
  {
    id: "ssi",
    company: "Safe Superintelligence (SSI)",
    fitScore: "1/10",
    priority: "SKIP",
    color: "#727782",
    description: "Disqualified. Pre-revenue research lab with no deployed software, no customers, no user-facing product.",
    rep: "Kacie Taylor",
    contacts: [],
  },
  {
    id: "booking",
    company: "Booking.com",
    fitScore: "90/100",
    priority: "HIGH",
    color: "#00579f",
    description: "DMA gatekeeper, EAA June 2025 deadline, screen reader failures. 28M+ properties, global accessibility mandate.",
    rep: "Katarina Stefanovic",
    contacts: [],
    stages: {
      forensic: "Trigger: European Accessibility Act (EAA) June 2025 deadline. DMA gatekeeper status. Screen reader failures reported by users. Enemy: 28M+ property listings, massive UI surface.",
      icp: "Persona: VP Accessibility / Head of QA. Pain: WCAG compliance across a massive, dynamic UI with user-generated content.",
    },
  },
  {
    id: "oura",
    company: "Oura",
    fitScore: "90/100",
    priority: "HIGH",
    color: "#00579f",
    description: "VoiceOver broken since 2019, 40M EUR EAA exposure. Health data app with critical accessibility requirements.",
    rep: "Katarina Stefanovic",
    contacts: [],
    stages: {
      forensic: "Trigger: VoiceOver broken since 2019 per user reports. 40M EUR EAA exposure. Health data requires accessible presentation. Enemy: Hardware + software integration makes accessibility harder.",
      icp: "Persona: VP Product / Head of Mobile. Pain: health-critical app inaccessible to visually impaired users, regulatory exposure.",
    },
  },
  {
    id: "checkout-com",
    company: "Checkout.com",
    fitScore: "80/100",
    priority: "HIGH",
    color: "#00579f",
    description: "Partially conformant, SCA accessibility gaps. Payment processing requires accessible checkout flows.",
    rep: "Katarina Stefanovic",
    contacts: [],
    stages: {
      forensic: "Trigger: Partially WCAG conformant. SCA (Strong Customer Authentication) flows have accessibility gaps. Enemy: Payment flows must be accessible AND secure.",
      icp: "Persona: VP Engineering / Compliance Lead. Pain: checkout flows failing accessibility audits, merchant liability risk.",
    },
  },
];

/* ── Campaign groupings ── */

export const campaigns: Campaign[] = [
  {
    id: "consolidated",
    title: "Full Pipeline Output",
    type: "All",
    date: "2026-04-01/02",
    color: "#00579f",
    accountIds: ["sharkninja", "caesars", "best-western", "elementor", "crazylabs", "papaya-gaming", "wix", "yotpo", "overwolf", "candivore", "harness", "glean", "jasper", "ssi", "snap", "robinhood", "intuit", "booking", "oura", "checkout-com"],
    contacts: 94,
    cadences: 77,
    touches: 635,
    summary: "Consolidated output across all 6 campaigns. 23 accounts (1 disqualified), 90+ contacts, full pipeline from forensic analysis through outbound cadences.",
  },
  {
    id: "sharkninja-campaign",
    title: "SharkNinja / Caesars / Best Western",
    type: "MFT",
    date: "2026-04-01",
    color: "#7c6bc4",
    accountIds: ["sharkninja", "caesars", "best-western"],
    contacts: 9,
    cadences: 3,
    touches: 27,
    summary: "WiFi pairing failures, peak-hour load collapse, and checkout crashes. Device fragmentation across consumer IoT, regulated sports betting, and hospitality booking flows.",
  },
  {
    id: "israel",
    title: "Israel - Manual Functional Testing (7 companies)",
    type: "MFT",
    date: "2026-04-01",
    color: "#2db87e",
    accountIds: ["elementor", "crazylabs", "papaya-gaming", "wix", "yotpo", "overwolf", "candivore"],
    contacts: 21,
    cadences: 10,
    touches: 62,
    summary: "Studio adoption stalled at 8%, 250 games monthly at device risk, regulatory remediation mode, overlay breakage after game updates, cross-platform fairness for esports, and preview-reality gaps.",
  },
  {
    id: "jasper-harness-glean-v2",
    title: "Jasper / Harness / Glean (Apr 2)",
    type: "MFT",
    date: "2026-04-02",
    color: "#4a90d9",
    accountIds: ["harness", "glean", "jasper"],
    contacts: 30,
    cadences: 30,
    touches: 280,
    summary: "30 prioritized contacts across all three companies. Full cadences with 2-3 email variants per step, phone talk tracks, LinkedIn touches.",
  },
  {
    id: "jasper-harness-glean-v1",
    title: "SSI / Glean / Harness / Jasper (Apr 1)",
    type: "MFT",
    date: "2026-04-01",
    color: "#d4843e",
    accountIds: ["ssi", "glean", "harness", "jasper"],
    contacts: 12,
    cadences: 12,
    touches: 102,
    summary: "Initial run. SSI disqualified (no product, ~20 researchers). Glean: 100+ connectors, hallucination risk. Harness: 36 incidents in 90 days. Jasper: 15-20% hallucination rate.",
  },
  {
    id: "snap-robinhood-intuit",
    title: "Snap / Robinhood / Intuit",
    type: "MFT",
    date: "2026-04-01",
    color: "#c94e7c",
    accountIds: ["snap", "robinhood", "intuit"],
    contacts: 12,
    cadences: 12,
    touches: 78,
    summary: "Director/Manager level targeting. Snap: Camera2 API fragmentation across 600+ Android models. Robinhood: prediction markets $300M ARR target. Intuit: tax season functional failures.",
  },
  {
    id: "accessibility",
    title: "Booking.com / Oura / Checkout.com",
    type: "Accessibility",
    date: "2026-04-01",
    color: "#00579f",
    accountIds: ["booking", "oura", "checkout-com"],
    contacts: 10,
    cadences: 10,
    touches: 86,
    summary: "Accessibility testing campaign. Booking.com: DMA gatekeeper, EAA June 2025. Oura: VoiceOver broken since 2019. Checkout.com: SCA accessibility gaps.",
  },
];
