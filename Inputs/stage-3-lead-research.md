# Stage 3: Lead Research and Scoring

**Skill:** Lead Research Assistant + Scoring Instructions
**Input:** Stage 2 ICP package (from `pipeline/stage-2-icp-build/outputs/`)
**Output:** Scored stakeholder list saved to `pipeline/stage-3-lead-research/outputs/`

## Overview

Stage 3 finds the actual people. Using the ICP segments and persona matrix from Stage 2, you identify specific companies and stakeholders, research each account in depth, and score every contact using the Applause scoring rubric.

This stage produces two deliverables per account: a company research summary and a scored stakeholder matrix.

## Build Steps

### Step 1: Define Account Targets

If you have specific companies, drop the list into `pipeline/stage-3-lead-research/inputs/`. Otherwise, the ICP segments from Stage 2 guide the search.

### Step 2: Run Account Research

Paste this into Cowork:

```
Read the ICP package in pipeline/stage-2-icp-build/outputs/.
Use the lead-research-assistant skill in _os/skills/ and follow the
research methodology in _references/research_instructions.txt.
Research each target account. Save to pipeline/stage-3-lead-research/outputs/.
```

The research must cover:
- Financial and investor signals (earnings, growth, operational risks)
- Product complexity signals (platforms, flows, release cadence)
- Risk and regulation signals (compliance, KYC, fraud, trust)
- User experience and reputation signals (app store reviews, social complaints, outage reports)
- Scale and internal limitation signals (hiring, QA team size, automation gaps)
- Company initiatives by function (named programs, not generic)

### Step 3: Run Stakeholder Scoring

For each account, score stakeholders using the rubric in `_references/scoring_instructions.txt`:

```
Score the stakeholders identified for [Company Name] using the
scoring rubric in _references/scoring_instructions.txt. Include
the full breakdown for each contact.
```

**Scoring formula:**
1. Seniority Score (30-100 base)
2. + Function Relevance (0-15)
3. + Trigger Signals (sum of: recently joined +10, hiring QA +15, public quality mentions +10, complex background +5, oversees multiple teams +10, recent incidents +15, user sentiment issues +10)
4. + Company Fit (product complexity +10, regulated industry +10, recent quality issues +15, global expansion +10, multiple platforms +10)
5. Cap at 100, floor at 1

**Role classification:**
- Economic Buyer (80-100): C-level or VP with budget authority
- Technical Buyer (70-89): Director/Sr. Director in QA, Engineering, Product
- Champion (60-79): Manager or Director with pain, can advocate internally
- Influencer (50-59): Has input but not decision authority
- Deprioritize (<50): Too junior or too far from pain

### Step 4: Quality Check

Verify before advancing:
- [ ] Each account has a research summary with evidence from investor materials, app reviews, or news (not just homepage info)
- [ ] Stakeholders cover primary target functions: QA, Product, Mobile, Payments/Risk, Platform/Infra
- [ ] Every score includes a full breakdown (seniority + function + triggers + company fit)
- [ ] Each stakeholder has a plausible pain mapped to their role
- [ ] Company initiatives are specific (e.g., "TD Ameritrade integration" not "platform improvement")
- [ ] Existing Applause customers are flagged for expansion messaging

## Approval Gate

Review the scored stakeholder list. If research is deep and scores are justified, approve advancement to Stage 4:

```
Approve Stage 3. Proceed to Stage 4: Cold Email Generation.
```
