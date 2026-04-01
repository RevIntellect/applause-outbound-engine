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
