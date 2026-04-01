"use client";

import { useEffect } from "react";
import { cadences } from "@/data/cadences";
import { contacts } from "@/data/contacts";
import type { AccountId } from "@/data/types";
import RoleBadge from "@/components/shared/RoleBadge";

const channelConfig: Record<string, { icon: string; color: string; bg: string }> = {
  email: { icon: "mail", color: "text-primary", bg: "bg-primary/10" },
  linkedin: { icon: "share", color: "text-secondary", bg: "bg-secondary/10" },
  phone: { icon: "call", color: "text-tertiary", bg: "bg-tertiary-fixed" },
};

export default function CadencesPage() {
  // Scroll to anchor on load
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    }
  }, []);

  // Group cadences by account
  const accountGroups: { accountId: AccountId; accountName: string; items: typeof cadences }[] = [];
  const robinhoodCadences = cadences.filter((c) => ["vlad-tenev", "jeff-pinner", "jason-warnick"].includes(c.contactId));
  if (robinhoodCadences.length > 0) {
    accountGroups.push({ accountId: "robinhood", accountName: "Robinhood", items: robinhoodCadences });
  }

  // Pending accounts
  const pendingAccounts = [
    { id: "intuit" as AccountId, name: "Intuit" },
    { id: "snap" as AccountId, name: "Snap" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SalesLoft Cadences</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Multi-channel outreach sequences with email templates, call scripts, and LinkedIn messaging.
        </p>
      </div>

      {accountGroups.map((group) => (
        <div key={group.accountId} className="space-y-6">
          <h2 className="text-xl font-semibold">{group.accountName}</h2>

          {group.items.map((cadence) => {
            const contact = contacts.find((c) => c.id === cadence.contactId);
            return (
              <div key={cadence.contactId} id={cadence.contactId} className="scroll-mt-8">
                {/* Contact Header */}
                <div className="bg-surface-container-lowest rounded-t-lg p-5 shadow-ghost">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{cadence.contactName}</h3>
                      <p className="text-sm text-on-surface-variant">{cadence.contactTitle}, {cadence.company}</p>
                      <div className="mt-2 flex items-center gap-3">
                        {contact && <RoleBadge role={contact.role} />}
                        <span className="text-xs text-on-surface-variant">{cadence.cadenceType}</span>
                      </div>
                    </div>
                    <div className="text-right text-xs text-on-surface-variant">
                      <div>{cadence.classification}</div>
                      <div className="mt-1 italic">{cadence.tone}</div>
                    </div>
                  </div>
                </div>

                {/* Touchpoint Timeline */}
                <div className="bg-surface-container-lowest rounded-b-lg shadow-ghost px-5 pb-5">
                  <div className="relative pl-8">
                    {/* Vertical line */}
                    <div className="absolute left-3 top-0 bottom-0 w-px bg-outline-variant" />

                    {cadence.touchpoints.map((tp, i) => {
                      const ch = channelConfig[tp.channel];
                      return (
                        <div key={i} className="relative py-4">
                          {/* Day badge */}
                          <div className="absolute -left-5 top-4 w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center">
                            <span className="text-[0.6rem] font-bold text-on-surface-variant">D{tp.day}</span>
                          </div>

                          <div className="bg-surface-container-low rounded-lg p-4">
                            {/* Touchpoint header */}
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`material-symbols-outlined ${ch.color}`} style={{ fontSize: 16 }}>{ch.icon}</span>
                              <span className="text-sm font-medium">{tp.type}</span>
                              <span className={`px-1.5 py-0.5 rounded text-[0.6rem] font-medium uppercase ${ch.bg} ${ch.color}`}>
                                {tp.channel}
                              </span>
                              {tp.subject && (
                                <span className="text-xs text-on-surface-variant ml-auto">Subject: {tp.subject}</span>
                              )}
                            </div>

                            {/* Email body */}
                            {tp.htmlBody && (
                              <div
                                className="mt-2 p-4 bg-surface-container-lowest rounded-md text-sm leading-relaxed border-l-2 border-primary/20"
                                dangerouslySetInnerHTML={{ __html: tp.htmlBody }}
                              />
                            )}

                            {/* LinkedIn text */}
                            {tp.linkedinText && (
                              <p className="mt-2 p-3 bg-surface-container-lowest rounded-md text-sm leading-relaxed border-l-2 border-secondary/20">
                                {tp.linkedinText}
                              </p>
                            )}

                            {/* Phone scripts */}
                            {tp.talkTrack && (
                              <div className="mt-2 space-y-2">
                                <div className="p-3 bg-surface-container-lowest rounded-md border-l-2 border-tertiary-fixed">
                                  <span className="text-xs font-semibold text-on-surface-variant">Talk Track:</span>
                                  <p className="text-sm leading-relaxed mt-1">&ldquo;{tp.talkTrack}&rdquo;</p>
                                </div>
                                {tp.voicemail && (
                                  <div className="p-3 bg-surface-container-lowest rounded-md border-l-2 border-tertiary-fixed">
                                    <span className="text-xs font-semibold text-on-surface-variant">Voicemail:</span>
                                    <p className="text-sm leading-relaxed mt-1">&ldquo;{tp.voicemail}&rdquo;</p>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Note */}
                            {tp.note && !tp.htmlBody && !tp.linkedinText && !tp.talkTrack && (
                              <p className="mt-1 text-xs text-on-surface-variant italic">{tp.note}</p>
                            )}
                            {tp.note && (tp.htmlBody || tp.linkedinText) && (
                              <p className="mt-2 text-xs text-on-surface-variant italic">{tp.note}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Pending accounts */}
      {pendingAccounts.map((acct) => (
        <div key={acct.id} className="space-y-3">
          <h2 className="text-xl font-semibold">{acct.name}</h2>
          <div className="bg-surface-container-lowest rounded-lg p-8 shadow-ghost text-center">
            <span className="material-symbols-outlined text-outline mb-2" style={{ fontSize: 32 }}>pending</span>
            <p className="text-sm text-on-surface-variant">
              Cadences pending. Run Stage 4 in Cowork to generate {acct.name} outreach sequences.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
