import type { Campaign, CampaignFormData } from "./types";

const STORAGE_KEY = "applause-campaigns";

function generateId(): string {
  return `camp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function getCampaigns(): Campaign[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function getCampaign(id: string): Campaign | null {
  return getCampaigns().find((c) => c.id === id) ?? null;
}

export function createCampaign(data: CampaignFormData): Campaign {
  const campaign: Campaign = {
    id: generateId(),
    name: data.name,
    vertical: data.vertical,
    accountNames: data.accountNames,
    accountsCsv: data.accountsCsv,
    createdAt: new Date().toISOString(),
    currentStage: "research",
    stages: {
      research: "active",
      enrichment: "pending",
      sequencing: "pending",
      execution: "pending",
      export: "pending",
    },
    discovery: null,
    icpBuilder: null,
    leadResearch: null,
    campaign: null,
  };

  const campaigns = getCampaigns();
  campaigns.unshift(campaign);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
  return campaign;
}

export function updateCampaign(
  id: string,
  updates: Partial<Campaign>
): Campaign | null {
  const campaigns = getCampaigns();
  const index = campaigns.findIndex((c) => c.id === id);
  if (index === -1) return null;

  campaigns[index] = { ...campaigns[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
  return campaigns[index];
}

export function approveStage(id: string): Campaign | null {
  const campaign = getCampaign(id);
  if (!campaign) return null;

  const stageOrder = [
    "research",
    "enrichment",
    "sequencing",
    "execution",
    "export",
  ] as const;

  const currentIndex = stageOrder.indexOf(campaign.currentStage);
  const updatedStages = { ...campaign.stages };
  updatedStages[campaign.currentStage] = "approved";

  const nextIndex = currentIndex + 1;
  const nextStage =
    nextIndex < stageOrder.length ? stageOrder[nextIndex] : campaign.currentStage;

  if (nextIndex < stageOrder.length) {
    updatedStages[nextStage] = "active";
  }

  return updateCampaign(id, {
    stages: updatedStages,
    currentStage: nextStage,
  });
}
