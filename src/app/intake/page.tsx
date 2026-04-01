"use client";

import { useState } from "react";

/* ── Applause solution areas (from cadence-creator product modules) ── */

const solutionAreas = [
  {
    id: "mft",
    label: "Manual Functional Testing",
    icon: "devices",
    description: "Real-world testing across real devices, browsers, networks, and locations.",
  },
  {
    id: "automated",
    label: "Automated Functional Testing",
    icon: "precision_manufacturing",
    description: "Test automation engineers and framework execution across environments.",
  },
  {
    id: "integrated",
    label: "Integrated Functional Testing",
    icon: "hub",
    description: "Manual + automated testing unified into a single coverage strategy.",
  },
  {
    id: "accessibility",
    label: "Accessibility Testing",
    icon: "accessibility_new",
    description: "WCAG compliance, EAA readiness, and inclusive design validation.",
  },
  {
    id: "payments",
    label: "Payment Testing",
    icon: "payments",
    description: "Transaction testing, checkout flows, cart validation, and payment edge cases.",
  },
  {
    id: "customer-journey",
    label: "Customer Journey Testing",
    icon: "route",
    description: "Omnichannel end-to-end journey validation across touchpoints.",
  },
  {
    id: "ux",
    label: "User Experience Testing",
    icon: "psychology",
    description: "Usability testing, user research, and friction identification.",
  },
  {
    id: "ai",
    label: "AI Training & Testing",
    icon: "smart_toy",
    description: "ML data quality, AI output validation, red teaming, and generative AI testing.",
  },
  {
    id: "voice",
    label: "Voice Testing",
    icon: "mic",
    description: "Voice assistants, conversational AI, NLP validation, and Alexa/Google testing.",
  },
  {
    id: "security",
    label: "Security Testing",
    icon: "shield",
    description: "Penetration testing, ethical hacking, and vulnerability assessment.",
  },
];

export default function IntakePage() {
  const [accountNames, setAccountNames] = useState("");
  const [csvFileName, setCsvFileName] = useState<string | null>(null);
  const [salesNavUrl, setSalesNavUrl] = useState("");
  const [freeTextRequest, setFreeTextRequest] = useState("");
  const [selectedSolutions, setSelectedSolutions] = useState<Set<string>>(
    new Set()
  );
  const [personaNotes, setPersonaNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function toggleSolution(id: string) {
    setSelectedSolutions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleCsvChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFileName(file.name);
    }
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  const hasAccounts = accountNames.trim().length > 0 || csvFileName || salesNavUrl.trim().length > 0 || freeTextRequest.trim().length > 0;
  const hasSolutions = selectedSolutions.size > 0;
  const canSubmit = hasAccounts && hasSolutions;

  if (submitted) {
    return (
      <div className="max-w-[960px] mx-auto pb-12 pt-2">
        <div className="bg-surface-container-lowest rounded-xl p-8 shadow-ghost text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#2db87e20" }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 28, color: "#2db87e" }}
            >
              check_circle
            </span>
          </div>
          <h2 className="text-xl font-bold text-on-surface mb-2">
            Request Submitted
          </h2>
          <p className="text-sm text-on-surface-variant mb-6 max-w-[400px] mx-auto">
            Your account list and solution selections have been submitted. The
            Sales Effectiveness team will configure your campaign and begin
            pipeline execution.
          </p>

          <div className="bg-surface-container rounded-lg p-4 max-w-[480px] mx-auto text-left space-y-3">
            <div>
              <span className="text-[0.6875rem] text-on-surface-variant font-semibold uppercase tracking-wide">
                Accounts
              </span>
              <p className="text-sm text-on-surface mt-0.5">
                {accountNames.trim()
                  ? accountNames
                      .split("\n")
                      .filter((l) => l.trim()).length + " accounts entered"
                  : ""}
                {accountNames.trim() && csvFileName ? " + " : ""}
                {csvFileName ? csvFileName : ""}
                {(accountNames.trim() || csvFileName) && salesNavUrl.trim() ? " + " : ""}
                {salesNavUrl.trim() ? "Sales Nav list" : ""}
                {(accountNames.trim() || csvFileName || salesNavUrl.trim()) && freeTextRequest.trim() ? " + " : ""}
                {freeTextRequest.trim() ? "Free text request" : ""}
              </p>
            </div>
            {personaNotes.trim() && (
              <div>
                <span className="text-[0.6875rem] text-on-surface-variant font-semibold uppercase tracking-wide">
                  Target Persona / Notes
                </span>
                <p className="text-sm text-on-surface mt-0.5">{personaNotes}</p>
              </div>
            )}
            <div>
              <span className="text-[0.6875rem] text-on-surface-variant font-semibold uppercase tracking-wide">
                Solutions Selected
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {Array.from(selectedSolutions).map((id) => {
                  const sol = solutionAreas.find((s) => s.id === id);
                  return (
                    <span
                      key={id}
                      className="text-[0.6875rem] px-2 py-0.5 rounded-md bg-primary/10 text-primary font-medium"
                    >
                      {sol?.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setAccountNames("");
              setCsvFileName(null);
              setSelectedSolutions(new Set());
              setPersonaNotes("");
              setSalesNavUrl("");
              setFreeTextRequest("");
            }}
            className="mt-6 px-5 py-2.5 rounded-lg text-sm font-semibold text-on-surface-variant bg-surface-container hover:bg-surface-container-high transition-colors"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[960px] mx-auto pb-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-sans text-[2rem] font-bold tracking-[-0.02em] text-on-surface">
          New Pipeline Request
        </h1>
        <p className="text-on-surface-variant text-sm mt-1 max-w-[640px] leading-relaxed">
          Submit your target accounts and select the Applause solutions for
          cadence generation. The pipeline will run all 5 stages and deliver a
          complete outbound package.
        </p>
      </div>

      {/* Step 1: Accounts & Inputs */}
      <section className="bg-surface-container-lowest rounded-xl p-6 shadow-ghost">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: "#7c6bc4" }}
          >
            1
          </div>
          <h2 className="text-base font-semibold text-on-surface">
            Target Accounts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. Enter Account Names */}
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                  list_alt
                </span>
                Enter Account Names
              </span>
            </label>
            <textarea
              value={accountNames}
              onChange={(e) => setAccountNames(e.target.value)}
              placeholder={"Harness\nGlean\nJasper.ai\nDatadog"}
              rows={5}
              className="w-full rounded-lg bg-surface-container border border-outline-variant/30 px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
            <p className="text-xs text-outline mt-1.5">One account per line.</p>
          </div>

          {/* 2. Upload CSV */}
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                  upload_file
                </span>
                Upload CSV with Accounts &amp; Contacts
              </span>
            </label>
            <div className="h-[148px] rounded-lg border-2 border-dashed border-outline-variant/40 flex flex-col items-center justify-center gap-2 hover:border-primary/40 transition-colors relative">
              {csvFileName ? (
                <>
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: 28 }}>
                    description
                  </span>
                  <span className="text-sm text-on-surface font-medium">{csvFileName}</span>
                  <button
                    type="button"
                    onClick={() => setCsvFileName(null)}
                    className="text-xs text-outline hover:text-error transition-colors"
                  >
                    Remove
                  </button>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-outline" style={{ fontSize: 28 }}>
                    cloud_upload
                  </span>
                  <span className="text-sm text-on-surface-variant">Drop CSV here or click to browse</span>
                  <span className="text-xs text-outline">Accounts and contacts</span>
                </>
              )}
              <input
                type="file"
                accept=".csv"
                onChange={handleCsvChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* 3. LinkedIn Sales Navigator */}
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                  link
                </span>
                Share LinkedIn Sales Navigator List
              </span>
            </label>
            <input
              type="text"
              value={salesNavUrl}
              onChange={(e) => setSalesNavUrl(e.target.value)}
              placeholder="Paste Sales Navigator list URL..."
              className="w-full rounded-lg bg-surface-container border border-outline-variant/30 px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <p className="text-xs text-outline mt-1.5">Share a saved list or search URL from Sales Navigator.</p>
          </div>

          {/* 4. Free Text Request */}
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                  edit_note
                </span>
                Free Text Request
              </span>
            </label>
            <textarea
              value={freeTextRequest}
              onChange={(e) => setFreeTextRequest(e.target.value)}
              placeholder={"e.g. Find Series B+ FinTech companies with 500+ employees that are hiring QA engineers..."}
              rows={3}
              className="w-full rounded-lg bg-surface-container border border-outline-variant/30 px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
            <p className="text-xs text-outline mt-1.5">Describe what you are looking for in your own words.</p>
          </div>
        </div>
      </section>

      {/* Step 2: Solution Areas */}
      <section className="bg-surface-container-lowest rounded-xl p-6 shadow-ghost">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: "#2db87e" }}
          >
            2
          </div>
          <h2 className="text-base font-semibold text-on-surface">
            Applause Solutions
          </h2>
        </div>
        <p className="text-sm text-on-surface-variant mb-5 ml-11">
          Select which solution areas to target in the outbound cadences. This
          determines the product positioning and messaging in the emails.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {solutionAreas.map((sol) => {
            const isSelected = selectedSolutions.has(sol.id);
            return (
              <button
                key={sol.id}
                type="button"
                onClick={() => toggleSolution(sol.id)}
                className={`flex items-start gap-3 p-4 rounded-xl text-left transition-all ${
                  isSelected
                    ? "bg-primary/8 ring-2 ring-primary/40"
                    : "bg-surface-container hover:bg-surface-container-high"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-surface-container-high text-on-surface-variant"
                  }`}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 18 }}
                  >
                    {sol.icon}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="text-[0.8125rem] font-semibold text-on-surface leading-snug">
                    {sol.label}
                  </div>
                  <p className="text-[0.6875rem] text-on-surface-variant mt-0.5 leading-relaxed">
                    {sol.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {selectedSolutions.size > 0 && (
          <div className="mt-4 ml-11 flex items-center gap-2 text-xs text-primary font-medium">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 14 }}
            >
              check_circle
            </span>
            {selectedSolutions.size} solution
            {selectedSolutions.size !== 1 ? "s" : ""} selected
          </div>
        )}
      </section>

      {/* Step 3: Target Persona / Notes */}
      <section className="bg-surface-container-lowest rounded-xl p-6 shadow-ghost">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: "#4a90d9" }}
          >
            3
          </div>
          <h2 className="text-base font-semibold text-on-surface">
            Target Persona / Notes
          </h2>
        </div>
        <p className="text-sm text-on-surface-variant mb-4 ml-11">
          Any specific persona targets, vertical context, special instructions,
          or additional notes for this request.
        </p>
        <div className="ml-11">
          <textarea
            value={personaNotes}
            onChange={(e) => setPersonaNotes(e.target.value)}
            placeholder={"e.g. Focus on VP Engineering and Director of QA at Series B+ companies.\nVertical: FinTech / Mobile Banking.\nPrioritize accounts showing hiring signals for QA roles."}
            rows={4}
            className="w-full rounded-lg bg-surface-container border border-outline-variant/30 px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </div>
      </section>

      {/* Submit */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-outline">
          Submitted requests route to the Sales Effectiveness team for pipeline
          configuration.
        </p>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
            canSubmit
              ? "text-on-primary hover:scale-[1.02]"
              : "bg-surface-container-high text-outline cursor-not-allowed"
          }`}
          style={
            canSubmit
              ? { background: "linear-gradient(135deg, #00579f, #2d70bb)" }
              : {}
          }
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            send
          </span>
          Submit Request
        </button>
      </div>
    </div>
  );
}
