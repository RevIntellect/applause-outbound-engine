# Stage 4: Cold Email Generation

**Skill:** Cold Email Pro + Email Instructions + Sequence Templates
**Input:** Stage 3 scored stakeholders with research (from `pipeline/stage-3-lead-research/outputs/`)
**Output:** Email sequences saved to `pipeline/stage-4-cold-email/outputs/`

## Overview

Stage 4 generates personalized cold email sequences for every scored stakeholder from Stage 3. Each email connects a specific company initiative to a specific Applause capability, matched to the recipient's function and seniority level.

Two frameworks are available: the Tatulea 4-sentence personalized approach (default) and the Taylor Haren offer-first approach (for volume or weak personalization signals).

## Build Steps

### Step 1: Select Framework

Review the stakeholder list. For each contact, decide:
- **Tatulea (default):** When you have strong research signals, named initiatives, and personal triggers
- **Offer-first:** When personalization signals are weak, or you're optimizing for volume

### Step 2: Run the Skill

Paste this into Cowork:

```
Read the scored stakeholders in pipeline/stage-3-lead-research/outputs/.
Use the cold-email-pro skill in _os/skills/. Follow the email writing
rules in _references/email_instructions.txt and the sequence structure
in _references/sequence-templates.md. Generate 3-step sequences with
2-3 variants per step for each stakeholder. Save to
pipeline/stage-4-cold-email/outputs/.
```

### Step 3: Review the Output

Each email must follow these rules:

**Structure (Tatulea):**
- Sentence 1: Observation/Signal (why you, why now)
- Sentence 2: Current state/Problem (pain, not solution)
- Sentence 3: Future state + Social proof (named customer or concrete result)
- Sentence 4: Low-friction CTA (no meeting request in Email 1)

**Hard rules:**
- 120 words maximum. Count every word.
- No em dashes. Period, comma, or rewrite.
- One Applause capability per email, matched to recipient's function
- One sentence explaining what Applause is, woven naturally
- Specific company initiative named (from Stage 3 research)
- HTML format: `<div>` tags with `<br />` spacing, no `<p>` tags
- Manual signature (never `{{accountSignature}}`)
- Subject lines: 1-4 words, boring, feels internal

**Tone calibration:**
- C-Level/VP: Strategic, business outcomes and risk reduction
- Directors: Tactical, operational challenges and team gaps
- Managers: Day-to-day pain, peer-to-peer problem solving

**Existing customers:**
- Open by acknowledging the relationship
- Frame as awareness + expansion, not blind cold pitch

### Step 4: Quality Check

Verify before advancing:
- [ ] Every email is 120 words or fewer (count them)
- [ ] Email 1 opens by naming a specific problem AND how Applause solves it
- [ ] No email opens with a personal observation, compliment, or background note
- [ ] Specific company initiative named in every email (from research)
- [ ] One sentence explaining what Applause is in each email
- [ ] One Applause capability matched to initiative and role
- [ ] Peer-to-peer tone (not salesy)
- [ ] Soft CTA in every email
- [ ] No buzzwords, jargon, or em dashes
- [ ] Email 1 has NO meeting request in any variant
- [ ] HTML uses `<div>` tags with `<br />` spacing (no `<p>` tags)
- [ ] Each variant uses a genuinely different angle
- [ ] If existing customer: relationship acknowledged in opening

## Approval Gate

Review all email sequences. If every email passes the quality checklist, approve advancement to Stage 5:

```
Approve Stage 4. Proceed to Stage 5: Campaign Deploy.
```
