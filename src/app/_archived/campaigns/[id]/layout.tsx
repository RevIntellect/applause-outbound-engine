"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import StageProgress from "@/components/layout/StageProgress";
import { getCampaign } from "@/lib/store";
import type { Campaign } from "@/lib/types";

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    const c = getCampaign(params.id);
    setCampaign(c);
  }, [params.id]);

  const approvedStages = campaign
    ? Object.entries(campaign.stages)
        .filter(([, status]) => status === "approved")
        .map(([slug]) => slug)
    : [];

  return (
    <div>
      <StageProgress approvedStages={approvedStages} />
      {children}
    </div>
  );
}
