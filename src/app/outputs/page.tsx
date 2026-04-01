"use client";

import { useState } from "react";

/* ── Data types ── */

interface Contact {
  name: string;
  title: string;
  score: number;
  cadenceType: "Extended" | "Standard" | "Compact";
  roleClass: string;
  apolloRequired?: boolean;
  capability?: string;
  touches: TouchPoint[];
}

interface TouchPoint {
  day: number;
  channel: "Email" | "Phone" | "LinkedIn";
  action: string;
  content?: string;
  subject?: string;
  variants?: { label: string; subject: string; content: string }[];
}

interface Account {
  id: string;
  company: string;
  fitScore: string;
  priority: "HIGH" | "MED-HIGH" | "PENDING" | "SKIP";
  color: string;
  description: string;
  rep: string;
  contacts: Contact[];
}

/* ── Account data ── */

const completedAccounts: Account[] = [
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
];

const pendingAccounts: Account[] = [
  { id: "ssi", company: "Safe Superintelligence (SSI)", fitScore: "1/10", priority: "SKIP", color: "#727782", description: "Disqualified. Pre-revenue research lab with no deployed software, no customers, no user-facing product. Revisit only if/when they launch a commercial product.", rep: "Kacie Taylor", contacts: [] },
  { id: "booking", company: "Booking.com", fitScore: "\u2014", priority: "PENDING", color: "#4a90d9", description: "Pipeline output in progress.", rep: "Katarina Stefanovic", contacts: [] },
  { id: "oura", company: "Oura", fitScore: "\u2014", priority: "PENDING", color: "#4a90d9", description: "Pipeline output in progress.", rep: "Katarina Stefanovic", contacts: [] },
  { id: "checkout", company: "Checkout.com", fitScore: "\u2014", priority: "PENDING", color: "#4a90d9", description: "Pipeline output in progress.", rep: "Katarina Stefanovic", contacts: [] },
  { id: "rippling", company: "Rippling", fitScore: "\u2014", priority: "PENDING", color: "#d4843e", description: "Pipeline output in progress.", rep: "Jeremy Ross", contacts: [] },
  { id: "optimum", company: "Optimum (Formerly Altice)", fitScore: "\u2014", priority: "PENDING", color: "#d4843e", description: "Pipeline output in progress.", rep: "Jeremy Ross", contacts: [] },
  { id: "alo-yoga", company: "Alo Yoga", fitScore: "\u2014", priority: "PENDING", color: "#d4843e", description: "Pipeline output in progress.", rep: "Jeremy Ross", contacts: [] },
  { id: "sharkninja", company: "SharkNinja", fitScore: "\u2014", priority: "PENDING", color: "#c94e7c", description: "Pipeline output in progress.", rep: "Drew Delano", contacts: [] },
  { id: "caesars", company: "Caesar's Sportsbook", fitScore: "\u2014", priority: "PENDING", color: "#c94e7c", description: "Pipeline output in progress.", rep: "Drew Delano", contacts: [] },
  { id: "best-western", company: "Best Western", fitScore: "\u2014", priority: "PENDING", color: "#c94e7c", description: "Pipeline output in progress.", rep: "Drew Delano", contacts: [] },
];

/* ── Components ── */

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, { bg: string; text: string }> = {
    HIGH: { bg: "#2db87e20", text: "#1a7a4e" },
    "MED-HIGH": { bg: "#d4843e20", text: "#a0632a" },
    PENDING: { bg: "#4a90d920", text: "#2a6cb0" },
    SKIP: { bg: "#72778220", text: "#727782" },
  };
  const s = styles[priority] || styles.PENDING;
  return (
    <span
      className="text-[0.6875rem] font-bold px-2 py-0.5 rounded uppercase tracking-wide"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {priority}
    </span>
  );
}

function CadenceBadge({ type }: { type: string }) {
  const config: Record<string, { label: string; detail: string; color: string }> = {
    Extended: { label: "Extended", detail: "21 days, 12 touches", color: "#7c6bc4" },
    Standard: { label: "Standard", detail: "14 days, 8 touches", color: "#4a90d9" },
    Compact: { label: "Compact", detail: "7 days, 5 touches", color: "#2db87e" },
  };
  const c = config[type] || config.Standard;
  return (
    <span
      className="text-[0.6875rem] font-semibold px-2 py-0.5 rounded"
      style={{ backgroundColor: `${c.color}20`, color: c.color }}
    >
      {c.label}
    </span>
  );
}

const channelIcon: Record<string, { icon: string; color: string }> = {
  Email: { icon: "mail", color: "#4a90d9" },
  Phone: { icon: "call", color: "#d4843e" },
  LinkedIn: { icon: "person", color: "#2db87e" },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="flex items-center gap-1 px-2 py-1 rounded text-[0.6875rem] font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
    >
      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
        {copied ? "check" : "content_copy"}
      </span>
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function TouchpointRow({ touch }: { touch: TouchPoint }) {
  const [expanded, setExpanded] = useState(false);
  const ch = channelIcon[touch.channel];
  const hasContent = touch.content || (touch.variants && touch.variants.length > 0);

  return (
    <div className="border-b border-outline-variant/10 last:border-0">
      <button
        type="button"
        onClick={() => hasContent && setExpanded(!expanded)}
        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
          hasContent ? "hover:bg-surface-container-low cursor-pointer" : "cursor-default"
        }`}
      >
        {/* Day */}
        <span className="text-xs font-bold text-on-surface-variant w-10 shrink-0">
          Day {touch.day}
        </span>

        {/* Channel icon */}
        <span
          className="material-symbols-outlined shrink-0"
          style={{ fontSize: 16, color: ch.color }}
        >
          {ch.icon}
        </span>

        {/* Channel + action */}
        <span className="text-sm text-on-surface flex-1">
          <span className="font-medium">{touch.channel}</span>
          <span className="text-on-surface-variant ml-1.5">{touch.action}</span>
        </span>

        {/* Expand chevron */}
        {hasContent && (
          <span
            className="material-symbols-outlined text-outline transition-transform"
            style={{
              fontSize: 16,
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            }}
          >
            chevron_right
          </span>
        )}
      </button>

      {/* Expanded content */}
      {expanded && hasContent && (
        <div className="px-4 pb-4 space-y-3">
          {touch.variants?.map((v, vi) => (
            <div key={vi} className="bg-inverse-surface rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[0.6875rem] font-semibold text-inverse-on-surface/60 uppercase tracking-wide">
                  {v.label}
                </span>
                <CopyButton text={v.content} />
              </div>
              {v.subject && (
                <div className="text-xs text-inverse-on-surface/50 mb-2">
                  Subject: <span className="text-inverse-on-surface/80">{v.subject}</span>
                </div>
              )}
              <pre className="text-[0.8125rem] text-inverse-on-surface/90 leading-relaxed font-mono whitespace-pre-wrap">
                {v.content}
              </pre>
            </div>
          ))}
          {touch.content && !touch.variants && (
            <div className="bg-inverse-surface rounded-lg p-4">
              <div className="flex justify-end mb-2">
                <CopyButton text={touch.content} />
              </div>
              <pre className="text-[0.8125rem] text-inverse-on-surface/90 leading-relaxed font-mono whitespace-pre-wrap">
                {touch.content}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ContactCard({
  contact,
  isSelected,
  onSelect,
  color,
}: {
  contact: Contact;
  isSelected: boolean;
  onSelect: () => void;
  color: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left p-4 rounded-xl transition-all ${
        isSelected
          ? "bg-surface-container-high shadow-lift"
          : "bg-surface-container-lowest shadow-ghost hover:shadow-lift"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm font-semibold text-on-surface">
            {contact.apolloRequired && (
              <span
                className="inline-flex items-center gap-0.5 text-[0.6rem] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded mr-1.5 align-middle"
              >
                <span className="material-symbols-outlined" style={{ fontSize: 10 }}>search</span>
                APOLLO
              </span>
            )}
            {contact.name}
          </p>
          <p className="text-xs text-on-surface-variant">{contact.title}</p>
        </div>
        <div
          className="text-lg font-bold"
          style={{ color }}
        >
          {contact.score}
        </div>
      </div>
      {contact.capability && (
        <p className="text-[0.625rem] text-on-surface-variant mb-1.5 leading-snug">{contact.capability}</p>
      )}
      <div className="flex items-center gap-2 mt-2">
        <CadenceBadge type={contact.cadenceType} />
        <span className="text-[0.625rem] text-outline">{contact.roleClass}</span>
      </div>
    </button>
  );
}

/* ── Page ── */

export default function OutputsPage() {
  const [selectedAccountId, setSelectedAccountId] = useState("glean");
  const [selectedContactIdx, setSelectedContactIdx] = useState(0);

  const selectedAccount =
    completedAccounts.find((a) => a.id === selectedAccountId) || completedAccounts[0];
  const selectedContact = selectedAccount.contacts[selectedContactIdx];

  const totalTouches = selectedAccount.contacts.reduce(
    (sum, c) => sum + c.touches.length,
    0
  );

  return (
    <div className="max-w-[960px] mx-auto pb-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-sans text-[2rem] font-bold tracking-[-0.02em] text-on-surface">
          Outputs
        </h1>
        <p className="text-on-surface-variant text-sm mt-1 max-w-[640px] leading-relaxed">
          Campaign outputs generated by the Outbound Engine. Each account contains
          scored contacts with full multi-channel cadences ready for SalesLoft.
        </p>
      </div>

      {/* Completed accounts */}
      <section>
        <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-2">
          Completed
          <span className="text-outline font-normal ml-1.5">
            ({completedAccounts.length})
          </span>
        </label>
        <div className="flex gap-2 flex-wrap">
          {completedAccounts.map((acc) => (
            <button
              key={acc.id}
              type="button"
              onClick={() => {
                setSelectedAccountId(acc.id);
                setSelectedContactIdx(0);
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                selectedAccountId === acc.id
                  ? "text-white shadow-lift"
                  : "bg-surface-container-lowest text-on-surface-variant shadow-ghost hover:shadow-lift"
              }`}
              style={
                selectedAccountId === acc.id
                  ? { backgroundColor: acc.color }
                  : {}
              }
            >
              {acc.company}
              <PriorityBadge priority={acc.priority} />
            </button>
          ))}
        </div>
      </section>

      {/* Account detail */}
      <section className="bg-surface-container-lowest rounded-xl shadow-ghost overflow-hidden">
        {/* Title bar */}
        <div
          className="px-6 py-4 flex items-center gap-4"
          style={{ borderBottom: `3px solid ${selectedAccount.color}` }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{ backgroundColor: selectedAccount.color }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              domain
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-on-surface">
              {selectedAccount.company}
            </h2>
            <p className="text-xs text-on-surface-variant">{selectedAccount.rep}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-lg font-bold text-on-surface">
                {selectedAccount.fitScore}
              </div>
              <div className="text-[0.6875rem] text-on-surface-variant">
                Fit Score
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-on-surface">
                {selectedAccount.contacts.length}
              </div>
              <div className="text-[0.6875rem] text-on-surface-variant">
                Contacts
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-on-surface">
                {totalTouches || "\u2014"}
              </div>
              <div className="text-[0.6875rem] text-on-surface-variant">
                Touches
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-6 py-3 border-b border-outline-variant/15">
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {selectedAccount.description}
          </p>
        </div>

        {/* Contact cards */}
        <div className="px-6 py-4 border-b border-outline-variant/15">
          <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-3">
            Contacts
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {selectedAccount.contacts.map((contact, idx) => (
              <ContactCard
                key={contact.name}
                contact={contact}
                isSelected={selectedContactIdx === idx}
                onSelect={() => setSelectedContactIdx(idx)}
                color={selectedAccount.color}
              />
            ))}
          </div>
        </div>

        {/* Cadence timeline */}
        {selectedContact && selectedContact.touches.length > 0 ? (
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                  Cadence: {selectedContact.name}
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <CadenceBadge type={selectedContact.cadenceType} />
                  <span className="text-xs text-outline">
                    {selectedContact.touches.length} touches
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl overflow-hidden">
              {selectedContact.touches.map((touch, ti) => (
                <TouchpointRow key={ti} touch={touch} />
              ))}
            </div>
          </div>
        ) : selectedContact ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span
              className="material-symbols-outlined text-outline mb-3"
              style={{ fontSize: 32 }}
            >
              description
            </span>
            <p className="text-sm font-medium text-on-surface mb-1">
              Cadence content pending
            </p>
            <p className="text-xs text-on-surface-variant">
              Email templates and touchpoints will appear here once populated.
            </p>
          </div>
        ) : null}
      </section>

      {/* In Progress section */}
      <section>
        <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-3">
          In Progress
          <span className="text-outline font-normal ml-1.5">
            ({pendingAccounts.length})
          </span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {pendingAccounts.map((acc) => (
            <div
              key={acc.id}
              className="bg-surface-container-lowest rounded-xl shadow-ghost p-4 flex items-center gap-3"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: acc.priority === "SKIP" ? "#727782" : acc.color }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                  {acc.priority === "SKIP" ? "block" : "domain"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-on-surface truncate">
                  {acc.company}
                </p>
                <p className="text-xs text-on-surface-variant">{acc.rep}</p>
              </div>
              <PriorityBadge priority={acc.priority} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
