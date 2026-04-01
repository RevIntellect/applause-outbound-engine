# Stage 2: ICP Build

**Skill:** Strategic ICP Builder
**Input:** Stage 1 forensic research memo (from `pipeline/stage-1-market-research/outputs/`)
**Output:** ICP package saved to `pipeline/stage-2-icp-build/outputs/`

## Overview

Stage 2 transforms raw market research into precision-targeted sales intelligence. The Strategic ICP Builder takes the forensic memo from Stage 1 and produces target organization profiles, decision-maker persona matrices with pain-specific "forensic hooks," sales narratives, and ROI frameworks.

This is the bridge between research (what hurts) and action (who to contact and what to say).

## Build Steps

### Step 1: Feed Stage 1 Output Forward

Copy or reference the Stage 1 research memo. The ICP Builder needs:
- Verified pain points with verbatim evidence
- Operational friction points
- Insider vocabulary and terminology
- Current tools/solutions failing the market

### Step 2: Run the Skill

Paste this into Cowork:

```
Read the forensic research memo in pipeline/stage-1-market-research/outputs/.
Use the strategic-icp-builder skill in _os/skills/ to build the full
ICP package. Save to pipeline/stage-2-icp-build/outputs/.
```

### Step 3: Review the Output

The ICP package should include:

**Target Organization Profile:**
- Organization Criteria Matrix (revenue threshold, geographic complexity, tech stack indicators, release cadence, organizational signals)
- 2-3 distinct ICP segments: Primary, Migration, Innovation

**Decision-Maker Persona Matrix:**
- Persona cards for each target function (VP QA, VP Product, Head of Mobile, VP Payments, CTO)
- Each persona includes: title patterns, KPIs, daily frustrations, forensic hooks, messaging angle

**Sales Narratives:**
- Pain-to-solution mapping for each persona
- ROI frameworks with specific metrics
- Objection handling tied to the "Silent Objection" from Stage 1

### Step 4: Quality Check

Verify before advancing:
- [ ] ICP segments are specific enough to guide lead research (not "any tech company")
- [ ] Persona matrix covers all primary target functions from the scoring rubric
- [ ] Forensic hooks reference real pain from Stage 1 research, not generic statements
- [ ] Revenue thresholds and organizational signals are defined with clear rationale
- [ ] Sales narratives connect Applause capabilities to specific persona pain points

## Approval Gate

Review the ICP package. If segments, personas, and hooks are accurate, approve advancement to Stage 3:

```
Approve Stage 2. Proceed to Stage 3: Lead Research.
```
