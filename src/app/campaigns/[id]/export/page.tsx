"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCampaign } from "@/lib/store";
import type { Campaign } from "@/lib/types";

const roleLabels: Record<string, string> = {
  "economic-buyer": "Economic Buyer",
  "technical-buyer": "Technical Buyer",
  champion: "Champion",
  influencer: "Influencer",
};

interface ExportSection {
  title: string;
  icon: string;
  status: "ready" | "missing";
  itemCount: number;
  detail: string;
}

export default function ExportPage() {
  const params = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  useEffect(() => {
    const c = getCampaign(params.id);
    setCampaign(c);
  }, [params.id]);

  const sections: ExportSection[] = [
    {
      title: "Discovery Research",
      icon: "search",
      status: campaign?.discovery ? "ready" : "missing",
      itemCount: campaign?.discovery?.signals.length ?? 0,
      detail: `${campaign?.discovery?.signals.length ?? 0} signals discovered`,
    },
    {
      title: "ICP Profiles",
      icon: "person_search",
      status: campaign?.icpBuilder ? "ready" : "missing",
      itemCount: campaign?.icpBuilder?.leads.length ?? 0,
      detail: `${campaign?.icpBuilder?.leads.length ?? 0} enriched leads`,
    },
    {
      title: "Scored Lead List",
      icon: "leaderboard",
      status: campaign?.leadResearch ? "ready" : "missing",
      itemCount: campaign?.leadResearch?.leads.length ?? 0,
      detail: `${campaign?.leadResearch?.leads.length ?? 0} scored leads with role mapping`,
    },
    {
      title: "Outreach Sequence",
      icon: "mail",
      status: campaign?.campaign ? "ready" : "missing",
      itemCount: campaign?.campaign?.touchpoints.length ?? 0,
      detail: `${campaign?.campaign?.touchpoints.length ?? 0} touchpoints across ${campaign?.campaign ? [...new Set(campaign.campaign.touchpoints.map((t) => t.channel))].length : 0} channels`,
    },
  ];

  const allReady = sections.every((s) => s.status === "ready");

  function handleExport() {
    setExporting(true);

    // Simulate export generation
    setTimeout(() => {
      setExporting(false);
      setExported(true);

      // Build a text export (in production this would be .docx via a library)
      const lines: string[] = [];
      lines.push(`APPLAUSE OUTBOUND ENGINE - CAMPAIGN EXPORT`);
      lines.push(`==========================================`);
      lines.push(`Campaign: ${campaign?.name}`);
      lines.push(`Target Audience: ${campaign?.targetAudience}`);
      lines.push(`Core Problem: ${campaign?.coreProblem}`);
      lines.push(`Generated: ${new Date().toLocaleDateString()}`);
      lines.push(``);

      if (campaign?.discovery) {
        lines.push(`--- STAGE 1: DISCOVERY RESEARCH ---`);
        campaign.discovery.signals.forEach((s) => {
          lines.push(``);
          lines.push(`Company: ${s.company} (${s.industry})`);
          lines.push(`Priority: ${s.priority.toUpperCase()}`);
          lines.push(`Signal: ${s.signalQuote}`);
          lines.push(`Target Personas: ${s.targetPersonas.join(", ")}`);
        });
        lines.push(``);
      }

      if (campaign?.icpBuilder) {
        lines.push(`--- STAGE 2: ICP PROFILES ---`);
        campaign.icpBuilder.leads.forEach((l) => {
          lines.push(``);
          lines.push(`${l.name} - ${l.title} at ${l.company}`);
          lines.push(`Score: ${l.score} | Role: ${roleLabels[l.role] ?? l.role}`);
          lines.push(`Pain: ${l.painMapping}`);
        });
        lines.push(``);
      }

      if (campaign?.leadResearch) {
        lines.push(`--- STAGE 3: SCORED LEAD LIST ---`);
        campaign.leadResearch.leads
          .sort((a, b) => b.score - a.score)
          .forEach((l) => {
            lines.push(`${l.score} | ${l.name} | ${l.title} | ${l.company} | ${roleLabels[l.role] ?? l.role}`);
          });
        lines.push(``);
      }

      if (campaign?.campaign) {
        lines.push(`--- STAGE 4: OUTREACH SEQUENCE ---`);
        lines.push(`Sequence Score: ${campaign.campaign.sequenceScore}%`);
        lines.push(``);
        campaign.campaign.touchpoints.forEach((tp) => {
          lines.push(`Day ${tp.day} [${tp.channel.toUpperCase()}] ${tp.title}`);
          lines.push(`  ${tp.description}`);
          if (tp.metadata.length > 0) {
            lines.push(`  Tags: ${tp.metadata.join(", ")}`);
          }
        });
      }

      const blob = new Blob([lines.join("\n")], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${campaign?.name?.replace(/\s+/g, "-").toLowerCase() ?? "campaign"}-export.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 2000);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-sans text-[2.25rem] font-bold tracking-[-0.02em] text-on-surface">
          Export
        </h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Compile and download all pipeline outputs for{" "}
          <span className="font-medium text-on-surface">
            {campaign?.name ?? "..."}
          </span>
        </p>
      </div>

      {/* Export sections */}
      <div className="grid grid-cols-2 gap-4">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    section.status === "ready"
                      ? "bg-tertiary-fixed/40"
                      : "bg-surface-container-high"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined ${
                      section.status === "ready" ? "text-primary" : "text-outline"
                    }`}
                    style={{ fontSize: 20 }}
                  >
                    {section.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-on-surface">
                    {section.title}
                  </h3>
                  <p className="text-[0.75rem] text-on-surface-variant">
                    {section.detail}
                  </p>
                </div>
              </div>
              {section.status === "ready" ? (
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: 20 }}
                >
                  check_circle
                </span>
              ) : (
                <span
                  className="material-symbols-outlined text-outline"
                  style={{ fontSize: 20 }}
                >
                  pending
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Export action */}
      <div className="bg-surface-container-lowest rounded-lg p-8 shadow-ghost">
        <div className="flex flex-col items-center text-center">
          {exported ? (
            <>
              <div className="w-14 h-14 rounded-full bg-tertiary-fixed/40 flex items-center justify-center mb-4">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: 28 }}
                >
                  download_done
                </span>
              </div>
              <h2 className="font-sans text-[1.5rem] font-semibold text-on-surface mb-1">
                Export Complete
              </h2>
              <p className="text-sm text-on-surface-variant mb-6">
                Your campaign package has been downloaded. Upload to Google Drive for team review.
              </p>
              <button
                type="button"
                onClick={() => {
                  setExported(false);
                  handleExport();
                }}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-primary bg-surface-container-highest hover:bg-surface-container-high transition-colors"
              >
                Download Again
              </button>
            </>
          ) : exporting ? (
            <>
              <div className="w-14 h-14 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
              <h2 className="font-sans text-[1.5rem] font-semibold text-on-surface mb-1">
                Generating Export...
              </h2>
              <p className="text-sm text-on-surface-variant">
                Compiling discovery research, ICP profiles, lead scores, and outreach sequences.
              </p>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center mb-4">
                <span
                  className="material-symbols-outlined text-on-surface-variant"
                  style={{ fontSize: 28 }}
                >
                  file_download
                </span>
              </div>
              <h2 className="font-sans text-[1.5rem] font-semibold text-on-surface mb-1">
                Ready to Export
              </h2>
              <p className="text-sm text-on-surface-variant mb-6 max-w-md">
                {allReady
                  ? "All pipeline stages are complete. Generate your campaign package for download."
                  : "Some pipeline stages are incomplete. Complete all stages before exporting."}
              </p>
              <button
                type="button"
                onClick={handleExport}
                disabled={!allReady}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-on-primary transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                style={{ background: "linear-gradient(135deg, #00579f, #2d70bb)" }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18 }}
                >
                  download
                </span>
                Export Campaign Package
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
