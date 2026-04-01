"use client";

import { useState } from "react";
import { campaignMeta } from "@/data/campaign-meta";
import { accounts } from "@/data/accounts";
import { contacts } from "@/data/contacts";
import { cadences } from "@/data/cadences";

export default function BriefingPage() {
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const sections = [
    {
      title: "Discovery Research",
      icon: "search",
      count: `${campaignMeta.accounts.length} accounts`,
      detail: campaignMeta.accounts.map((id) => accounts[id].name.split(/,?\s+(Inc|Markets)/)[0]).join(", "),
      ready: true,
    },
    {
      title: "ICP Profiles",
      icon: "groups",
      count: `${contacts.length} contacts`,
      detail: `Across ${campaignMeta.accounts.length} accounts with scores ${Math.min(...contacts.map((c) => c.score))}-${Math.max(...contacts.map((c) => c.score))}`,
      ready: true,
    },
    {
      title: "Scored Contact List",
      icon: "score",
      count: `${contacts.length} scored`,
      detail: `${contacts.filter((c) => c.role === "economic-buyer").length} Economic, ${contacts.filter((c) => c.role === "technical-buyer").length} Technical, ${contacts.filter((c) => c.role === "champion").length} Champion`,
      ready: true,
    },
    {
      title: "Outreach Sequences",
      icon: "mail",
      count: `${cadences.length} cadences`,
      detail: `${cadences.reduce((sum, c) => sum + c.touchpoints.length, 0)} total touchpoints (Robinhood)`,
      ready: cadences.length > 0,
    },
  ];

  function handleExport() {
    setExporting(true);
    // Build text export
    let output = `APPLAUSE OUTBOUND ENGINE - BRIEFING DOC\n`;
    output += `Campaign: ${campaignMeta.name}\n`;
    output += `Vertical: ${campaignMeta.vertical}\n`;
    output += `Seller: ${campaignMeta.seller.name}, ${campaignMeta.seller.title}\n`;
    output += `Generated: ${campaignMeta.generatedDate}\n`;
    output += `${"=".repeat(60)}\n\n`;

    // Discovery Research
    output += `SECTION 1: DISCOVERY RESEARCH\n${"─".repeat(40)}\n\n`;
    for (const id of campaignMeta.accounts) {
      const acct = accounts[id];
      output += `${acct.name} (${acct.ticker})\n`;
      output += `Industry: ${acct.industry}\n`;
      output += `Revenue: ${acct.revenue} (${acct.revenueGrowth})\n`;
      output += `Employees: ${acct.employees.toLocaleString()}\n`;
      output += `\nQuick Take: ${acct.quickTake}\n`;
      output += `\nRecent News:\n`;
      acct.recentNews.forEach((n) => { output += `  - ${n.headline}: ${n.detail}\n`; });
      output += `\n`;
    }

    // Contacts
    output += `\nSECTION 2: SCORED CONTACTS\n${"─".repeat(40)}\n\n`;
    for (const contact of contacts) {
      output += `${contact.name} | ${contact.title} | ${contact.company} | Score: ${contact.score} | ${contact.role}\n`;
      output += `  Cadence: ${contact.cadenceType} (${contact.cadenceDays}d, ${contact.cadenceTouches} touches)\n`;
      output += `  Angle: ${contact.messagingAngle}\n\n`;
    }

    // Cadences
    output += `\nSECTION 3: OUTREACH SEQUENCES\n${"─".repeat(40)}\n\n`;
    for (const cadence of cadences) {
      output += `${cadence.contactName} (${cadence.contactTitle}) - ${cadence.cadenceType}\n`;
      for (const tp of cadence.touchpoints) {
        output += `  Day ${tp.day} [${tp.channel.toUpperCase()}] ${tp.type}`;
        if (tp.subject) output += ` - Subject: "${tp.subject}"`;
        output += `\n`;
        if (tp.htmlBody) {
          const text = tp.htmlBody.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
          output += `    ${text}\n`;
        }
        if (tp.linkedinText) output += `    ${tp.linkedinText}\n`;
        if (tp.talkTrack) output += `    Talk Track: "${tp.talkTrack}"\n`;
        if (tp.voicemail) output += `    Voicemail: "${tp.voicemail}"\n`;
      }
      output += `\n`;
    }

    // Download
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${campaignMeta.name.replace(/\s+/g, "-").toLowerCase()}-briefing.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setExporting(false);
      setExported(true);
    }, 500);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Briefing Doc</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Compiled pipeline output for execution. Download and upload to Google Drive.
        </p>
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-2 gap-4">
        {sections.map((section) => (
          <div key={section.title} className="bg-surface-container-lowest rounded-lg p-5 shadow-ghost">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: 24 }}>
                  {section.icon}
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{section.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">{section.count}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                section.ready
                  ? "bg-tertiary-fixed text-tertiary"
                  : "bg-surface-container text-outline"
              }`}>
                {section.ready ? "Ready" : "Pending"}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-3">{section.detail}</p>
          </div>
        ))}
      </div>

      {/* Export Action */}
      <div className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost text-center">
        {exported ? (
          <>
            <span className="material-symbols-outlined text-primary mb-2" style={{ fontSize: 32 }}>check_circle</span>
            <h3 className="text-lg font-semibold mb-1">Export Complete</h3>
            <p className="text-sm text-on-surface-variant mb-4">File downloaded. Upload to Google Drive for team access.</p>
            <button
              onClick={() => { setExported(false); handleExport(); }}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-on-primary transition-transform hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #00579f, #2d70bb)" }}
            >
              Download Again
            </button>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-primary mb-2" style={{ fontSize: 32 }}>download</span>
            <h3 className="text-lg font-semibold mb-1">
              {exporting ? "Generating Export..." : "Ready to Export"}
            </h3>
            <p className="text-sm text-on-surface-variant mb-4">
              Compiles all pipeline sections into a single document.
            </p>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-on-primary transition-transform hover:scale-[1.02] disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #00579f, #2d70bb)" }}
            >
              {exporting ? "Generating..." : "Download Briefing Doc (.txt)"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
