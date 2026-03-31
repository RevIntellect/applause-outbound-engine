"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCampaign } from "@/lib/store";

export default function CampaignOverviewPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    const campaign = getCampaign(params.id);
    if (campaign) {
      router.replace(`/campaigns/${params.id}/${campaign.currentStage}`);
    } else {
      router.replace("/");
    }
  }, [params.id, router]);

  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}
