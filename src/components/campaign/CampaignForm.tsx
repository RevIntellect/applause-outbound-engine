"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCampaign } from "@/lib/store";

const audienceOptions = [
  "FinTech / Digital Banking",
  "Healthcare / HealthTech",
  "eCommerce / Retail",
  "Media / Streaming",
  "Travel / Hospitality",
  "Insurance / InsurTech",
  "Automotive / Connected Vehicles",
  "Telecom",
  "Gaming",
  "Government / Public Sector",
  "Other",
];

const howItWorks = [
  {
    icon: "search",
    title: "Stage 1: Discovery",
    desc: "Forensic B2B analysis identifies trigger events, pain points, and strategic entry points for your target vertical.",
  },
  {
    icon: "person_search",
    title: "Stage 2: ICP Build",
    desc: "Builds persona matrix with decision-maker profiles, forensic hooks, and ROI frameworks.",
  },
  {
    icon: "leaderboard",
    title: "Stage 3: Lead Research",
    desc: "Generates scored leads (1-100) classified by role with pain-to-person mapping.",
  },
  {
    icon: "mail",
    title: "Stage 4: Campaign",
    desc: "Creates multi-channel sequences with email, LinkedIn, and phone touchpoints.",
  },
  {
    icon: "download",
    title: "Stage 5: Export",
    desc: "Compiles all outputs into a formatted document ready for deployment.",
  },
];

export default function CampaignForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [coreProblem, setCoreProblem] = useState("");
  const [applauseSolutions, setApplauseSolutions] = useState("");
  const [saving, setSaving] = useState(false);

  function handleSubmit(draft: boolean) {
    if (!name.trim() || !targetAudience || !coreProblem.trim()) return;

    setSaving(true);
    const campaign = createCampaign({
      name: name.trim(),
      targetAudience,
      coreProblem: coreProblem.trim(),
      applauseSolutions: applauseSolutions.trim(),
    });

    if (draft) {
      router.push("/");
    } else {
      router.push(`/campaigns/${campaign.id}/research`);
    }
  }

  const isValid = name.trim() && targetAudience && coreProblem.trim();

  return (
    <div className="grid grid-cols-3 gap-8">
      {/* Form (2 columns) */}
      <div className="col-span-2 space-y-8">
        <div>
          <h1 className="font-sans text-[2.25rem] font-bold tracking-[-0.02em] text-on-surface">
            New Campaign
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Define your target audience and pain points to start the prospecting pipeline.
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-lg p-8 shadow-ghost space-y-6">
          {/* Campaign name */}
          <div className="space-y-2">
            <label className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant">
              Campaign Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., FinTech Q2 Outbound"
              className="w-full px-4 py-3 bg-surface-container rounded-lg text-sm text-on-surface placeholder:text-outline outline-none transition-colors focus:bg-surface-container-lowest focus:shadow-[0_2px_0_0_#00579f_inset]"
            />
          </div>

          {/* Target audience */}
          <div className="space-y-2">
            <label className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant">
              Target B2B Audience
            </label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container rounded-lg text-sm text-on-surface outline-none transition-colors focus:bg-surface-container-lowest focus:shadow-[0_2px_0_0_#00579f_inset] appearance-none cursor-pointer"
            >
              <option value="">Select a vertical...</option>
              {audienceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Core problem */}
          <div className="space-y-2">
            <label className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant">
              Core Business Problem
            </label>
            <textarea
              value={coreProblem}
              onChange={(e) => setCoreProblem(e.target.value)}
              placeholder="What pain is this audience experiencing that Applause can solve? Be specific about the business impact."
              rows={4}
              className="w-full px-4 py-3 bg-surface-container rounded-lg text-sm text-on-surface placeholder:text-outline outline-none transition-colors focus:bg-surface-container-lowest focus:shadow-[0_2px_0_0_#00579f_inset] resize-none"
            />
          </div>

          {/* Applause solutions */}
          <div className="space-y-2">
            <label className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant">
              Applause Solutions
              <span className="normal-case tracking-normal text-outline ml-2">
                (optional)
              </span>
            </label>
            <textarea
              value={applauseSolutions}
              onChange={(e) => setApplauseSolutions(e.target.value)}
              placeholder="Which Applause capabilities are most relevant? e.g., Payment testing, Localization testing, Real-world device testing"
              rows={3}
              className="w-full px-4 py-3 bg-surface-container rounded-lg text-sm text-on-surface placeholder:text-outline outline-none transition-colors focus:bg-surface-container-lowest focus:shadow-[0_2px_0_0_#00579f_inset] resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={!isValid || saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-on-primary transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              style={{ background: "linear-gradient(135deg, #00579f, #2d70bb)" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                rocket_launch
              </span>
              Create Campaign
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={!isValid || saving}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-primary bg-surface-container-highest hover:bg-surface-container-high transition-colors disabled:opacity-50"
            >
              Save as Draft
            </button>
          </div>
        </div>
      </div>

      {/* How it works sidebar (1 column) */}
      <div className="space-y-4">
        <h2 className="font-sans text-[1rem] font-semibold text-on-surface">
          How it works
        </h2>
        <div className="space-y-3">
          {howItWorks.map((step, i) => (
            <div
              key={step.title}
              className="bg-surface-container-lowest rounded-lg p-4 shadow-ghost"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[0.6875rem] font-bold text-primary">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-on-surface">
                    {step.title}
                  </div>
                  <p className="text-[0.8125rem] text-on-surface-variant leading-relaxed mt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
