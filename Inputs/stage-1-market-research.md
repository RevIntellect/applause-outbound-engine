# Stage 1: Market Research

**Skill:** Forensic B2B Analyst
**Input:** Target vertical or specific account names
**Output:** Forensic research memo saved to `pipeline/stage-1-market-research/outputs/`

## Overview

Stage 1 produces the raw intelligence that powers everything downstream. You're building a forensic research memo that identifies real, verifiable pain in a target market or account. This is not surface-level company research. It's strategic seller preparation for enterprise accounts.

The Forensic B2B Analyst skill applies a "Synthetic Content Firewall" to filter out AI-generated content, vendor marketing, and SEO spam. Only verified signals from authentic sources (reviews, forums, earnings reports, complaint threads) make the cut.

## Build Steps

### Step 1: Define the Target

Drop one of these into `pipeline/stage-1-market-research/inputs/`:
- A vertical name (e.g., "EdTech", "Fintech", "Healthcare")
- A list of specific company names (e.g., "SNAP, Robinhood, Intuit")
- A combination of both

### Step 2: Run the Skill

Paste this into Cowork:

```
Read the target in pipeline/stage-1-market-research/inputs/.
Use the forensic-b2b-analyst skill in _os/skills/ to produce a
forensic research memo. Follow the research methodology in
_references/research_instructions.txt. Save to
pipeline/stage-1-market-research/outputs/.
```

### Step 3: Review the Output

The memo should include:
- **The Reality Snapshot:** Trigger events, bleeding neck pain (verbatim search queries), the enemy (what's currently failing them)
- **The Psychological Architecture:** Silent objection, green light outcome, insider vocabulary
- **Strategic Entry Points:** 3 angles (The Callout, The Villain, The Reframe)
- **Company Initiatives by Function:** Specific named initiatives mapped to QA/Engineering, Product, Payments/Risk, Mobile/Platform

### Step 4: Quality Check

Verify before advancing:
- [ ] Research uses earnings reports, investor materials, app store reviews, or social sentiment (not just the company homepage)
- [ ] Pain points reference specific incidents, product issues, or operational signals
- [ ] Insider vocabulary includes 5+ terms only a domain expert would know
- [ ] Company initiatives are named programs or real signals, not generic descriptions
- [ ] No AI-generated filler language passed the Synthetic Content Firewall

## Approval Gate

Review the research memo. If the intelligence is solid and specific, approve advancement to Stage 2:

```
Approve Stage 1. Proceed to Stage 2: ICP Build.
```
