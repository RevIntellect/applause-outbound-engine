"use client";

import { useState } from "react";
import Link from "next/link";
import type { AccountId } from "@/data/types";
import { accounts } from "@/data/accounts";
import { getContactsByAccount } from "@/data/contacts";
import { getCadenceByContact } from "@/data/cadences";
import AccountSelector from "@/components/shared/AccountSelector";
import RoleBadge from "@/components/shared/RoleBadge";
import ScoreBadge from "@/components/shared/ScoreBadge";

export default function IntelligencePage() {
  const [selected, setSelected] = useState<AccountId>("robinhood");
  const account = accounts[selected];
  const contactList = getContactsByAccount(selected);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Intelligence</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Pipeline outputs from Stages 1-3: research, ICP profiles, and scored contacts.
        </p>
      </div>

      <AccountSelector selected={selected} onChange={setSelected} />

      {/* Stage 1: Forensic B2B Analysis */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold">Stage 1</span>
          <h2 className="text-lg font-semibold">Forensic B2B Analysis</h2>
        </div>
        <div className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost space-y-6">
          {/* Quick Take */}
          <div>
            <h3 className="text-sm font-semibold text-on-surface-variant mb-2">Quick Take</h3>
            <p className="text-sm leading-relaxed">{account.quickTake}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Recent News */}
            <div>
              <h3 className="text-sm font-semibold text-on-surface-variant mb-2">Recent News & Signals</h3>
              <ul className="space-y-2">
                {account.recentNews.map((item, i) => (
                  <li key={i} className="text-sm">
                    <span className="font-medium">{item.headline}</span>
                    <span className="text-on-surface-variant"> - {item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hiring Signals */}
            <div>
              <h3 className="text-sm font-semibold text-on-surface-variant mb-2">Hiring Signals</h3>
              <ul className="space-y-1.5">
                {account.hiringSignals.map((signal, i) => (
                  <li key={i} className="text-sm text-on-surface-variant flex gap-2">
                    <span className="text-primary mt-0.5">+</span>
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Qualification Signals */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-surface-container-low rounded-lg p-4">
              <h4 className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">Positive Signals</h4>
              <ul className="space-y-1">
                {account.qualificationSignals.positive.map((s, i) => (
                  <li key={i} className="text-xs text-on-surface-variant flex gap-1.5">
                    <span className="text-primary shrink-0">&#10003;</span>{s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-container-low rounded-lg p-4">
              <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wide">Potential Concerns</h4>
              <ul className="space-y-1">
                {account.qualificationSignals.concerns.map((s, i) => (
                  <li key={i} className="text-xs text-on-surface-variant flex gap-1.5">
                    <span className="text-secondary shrink-0">&#9888;</span>{s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-container-low rounded-lg p-4">
              <h4 className="text-xs font-semibold text-outline mb-2 uppercase tracking-wide">Unknown (Ask in Discovery)</h4>
              <ul className="space-y-1">
                {account.qualificationSignals.unknown.map((s, i) => (
                  <li key={i} className="text-xs text-on-surface-variant flex gap-1.5">
                    <span className="text-outline shrink-0">?</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 2: Strategic ICP Profiles */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold">Stage 2</span>
          <h2 className="text-lg font-semibold">Strategic ICP Profiles</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {account.keyPeople.map((person) => (
            <div key={person.name} className="bg-surface-container-lowest rounded-lg p-5 shadow-ghost">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{person.name}</h3>
                  <p className="text-sm text-on-surface-variant">{person.title}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                  <span className="text-sm font-bold text-on-surface-variant">
                    {person.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant mb-3">{person.background}</p>
              {person.focus && (
                <p className="text-xs text-on-surface-variant mb-3">
                  <span className="font-medium text-on-surface">Focus:</span> {person.focus}
                </p>
              )}
              <div>
                <h4 className="text-xs font-semibold text-on-surface-variant mb-1">Talking Points</h4>
                <ul className="space-y-1">
                  {person.talkingPoints.map((tp, i) => (
                    <li key={i} className="text-xs text-on-surface-variant flex gap-1.5">
                      <span className="text-primary shrink-0">&bull;</span>{tp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stage 3: Prioritized Contact List */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold">Stage 3</span>
          <h2 className="text-lg font-semibold">Prioritized Contact List</h2>
        </div>
        <div className="bg-surface-container-lowest rounded-lg shadow-ghost overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-container-low text-left">
                <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-on-surface-variant">Contact</th>
                <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-on-surface-variant">Score</th>
                <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-on-surface-variant">Buyer Profile</th>
                <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-on-surface-variant">Persona</th>
                <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-on-surface-variant">Cadence</th>
                <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-on-surface-variant">Messaging</th>
              </tr>
            </thead>
            <tbody>
              {contactList.map((contact, i) => {
                const hasCadence = !!getCadenceByContact(contact.id);
                return (
                  <tr key={contact.id} className={i % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface/50"}>
                    <td className="px-5 py-3">
                      <div className="font-medium">
                        {hasCadence ? (
                          <Link href={`/cadences#${contact.id}`} className="text-primary hover:underline">
                            {contact.name}
                          </Link>
                        ) : (
                          contact.name
                        )}
                      </div>
                      <div className="text-xs text-on-surface-variant">{contact.title}</div>
                    </td>
                    <td className="px-5 py-3">
                      <ScoreBadge score={contact.score} />
                    </td>
                    <td className="px-5 py-3">
                      <RoleBadge role={contact.role} />
                    </td>
                    <td className="px-5 py-3 text-xs text-on-surface-variant max-w-48">
                      {contact.painToPersonMapping.substring(0, 120)}...
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-xs">
                        <span className="font-medium capitalize">{contact.cadenceType}</span>
                        <div className="text-on-surface-variant">{contact.cadenceDays}d / {contact.cadenceTouches} touches</div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      {hasCadence ? (
                        <Link href={`/cadences#${contact.id}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>open_in_new</span>
                          View Cadence
                        </Link>
                      ) : (
                        <span className="text-xs text-outline">Pending</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
