"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCampaign, updateCampaign, approveStage } from "@/lib/store";
import type { Campaign, CampaignOutput, Touchpoint } from "@/lib/types";
import TouchpointTimeline from "@/components/stages/TouchpointTimeline";
import SequenceScore from "@/components/stages/SequenceScore";
import ApprovalGate from "@/components/stages/ApprovalGate";

const mockTouchpoints: Touchpoint[] = [
  {
    id: "tp_1",
    day: 1,
    channel: "linkedin",
    title: "Profile View",
    description:
      "View target's LinkedIn profile to create awareness before outreach.",
    metadata: ["WARM-UP"],
  },
  {
    id: "tp_2",
    day: 2,
    channel: "linkedin",
    title: "Connection Request",
    description:
      "Send personalized connection request. No pitch, no Applause mention. Reference shared context only.",
    metadata: ["< 300 CHARS"],
  },
  {
    id: "tp_3",
    day: 3,
    channel: "email",
    title: "Value-First Email",
    description:
      "Lead with the prospect's specific pain point. No meeting ask. Interest-based CTA only.",
    metadata: ["120 WORD MAX", "LOW-FRICTION CTA"],
  },
  {
    id: "tp_4",
    day: 5,
    channel: "phone",
    title: "Discovery Call Attempt",
    description:
      "Reference the same initiative from email. Talk track under 30 seconds before the first question.",
    metadata: ["< 30 SEC TALK TRACK", "VOICEMAIL READY"],
  },
  {
    id: "tp_5",
    day: 7,
    channel: "email",
    title: "Case Study Follow-up",
    description:
      "Share relevant case study matching prospect's industry. Tie results to their specific challenge.",
    metadata: ["CASE STUDY ATTACHED", "120 WORD MAX"],
  },
  {
    id: "tp_6",
    day: 9,
    channel: "linkedin",
    title: "LinkedIn InMail",
    description:
      "Engage with prospect's recent content or share an industry insight. Under 75 words.",
    metadata: ["< 75 WORDS", "CONTENT ENGAGEMENT"],
  },
  {
    id: "tp_7",
    day: 11,
    channel: "email",
    title: "ROI Framework Email",
    description:
      "Present quantified value: testing cost reduction, faster release cycles, or defect reduction metrics.",
    metadata: ["120 WORD MAX", "ROI DATA"],
  },
  {
    id: "tp_8",
    day: 14,
    channel: "phone",
    title: "Final Call + Breakup",
    description:
      "Last attempt with clear next-step ask. Leave voicemail if no answer. Reference full sequence context.",
    metadata: ["< 20 SEC VOICEMAIL", "BREAKUP FRAME"],
  },
];

export default function ExecutionPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [touchpoints, setTouchpoints] = useState<Touchpoint[]>([]);
  const [running, setRunning] = useState(false);
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    const c = getCampaign(params.id);
    setCampaign(c);
    if (c?.campaign) {
      setTouchpoints(c.campaign.touchpoints);
    }
  }, [params.id]);

  const runAgent = useCallback(() => {
    setRunning(true);
    setTouchpoints([]);

    mockTouchpoints.forEach((tp, i) => {
      setTimeout(() => {
        setTouchpoints((prev) => [...prev, tp]);
      }, 600 + i * 500);
    });

    setTimeout(() => {
      setRunning(false);
      const output: CampaignOutput = {
        touchpoints: mockTouchpoints,
        sequenceScore: 87,
        qualityAssessment:
          "Strong multi-channel sequence with good pacing. Email copy follows 120-word limit. LinkedIn touches provide non-intrusive warm-up.",
        aiSuggestion:
          "Consider adding a Day 7 case study touchpoint to bridge the gap between the discovery call and ROI email.",
      };
      updateCampaign(params.id, { campaign: output });
      setCampaign((prev) => (prev ? { ...prev, campaign: output } : prev));
    }, 600 + mockTouchpoints.length * 500 + 500);
  }, [params.id]);

  useEffect(() => {
    if (campaign && !campaign.campaign && !running) {
      runAgent();
    }
  }, [campaign, running, runAgent]);

  function handleApprove() {
    setApproving(true);
    approveStage(params.id);
    setTimeout(() => {
      router.push(`/campaigns/${params.id}/export`);
    }, 400);
  }

  const output = campaign?.campaign;
  const approvedLeadsCount = campaign?.icpBuilder?.leads.length ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-sans text-[2.25rem] font-bold tracking-[-0.02em] text-on-surface">
          Campaign Sequencing
        </h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Multi-channel outreach sequence for{" "}
          <span className="font-medium text-on-surface">
            {campaign?.name ?? "..."}
          </span>
        </p>
      </div>

      {/* Two column: timeline + sidebar */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Timeline */}
        <div className="col-span-2">
          {running && touchpoints.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-lg p-12 shadow-ghost flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
              <p className="text-sm text-on-surface-variant">
                Generating sequence strategy...
              </p>
            </div>
          ) : (
            <TouchpointTimeline touchpoints={touchpoints} />
          )}
        </div>

        {/* Right: Score + settings */}
        <div className="col-span-1">
          {output ? (
            <SequenceScore
              score={output.sequenceScore}
              qualityAssessment={output.qualityAssessment}
              aiSuggestion={output.aiSuggestion}
              approvedLeadsCount={approvedLeadsCount}
            />
          ) : (
            <div className="space-y-4">
              <div className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost animate-pulse">
                <div className="h-3 bg-surface-container-high rounded w-24 mb-3" />
                <div className="h-10 bg-surface-container-high rounded w-20" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Approval gate */}
      {!running && touchpoints.length > 0 && (
        <ApprovalGate
          stageName="Sequence"
          onApprove={handleApprove}
          onRerun={runAgent}
          approving={approving}
        />
      )}
    </div>
  );
}
