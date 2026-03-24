export type StageSlug =
  | "research"
  | "enrichment"
  | "sequencing"
  | "execution"
  | "export";

export type StageStatus = "pending" | "active" | "approved";

export type LeadRole =
  | "economic-buyer"
  | "technical-buyer"
  | "champion"
  | "influencer";

export type Priority = "high" | "medium" | "low";

export interface Campaign {
  id: string;
  name: string;
  targetAudience: string;
  coreProblem: string;
  applauseSolutions: string;
  createdAt: string;
  currentStage: StageSlug;
  stages: Record<StageSlug, StageStatus>;
  discovery: DiscoveryOutput | null;
  icpBuilder: IcpBuilderOutput | null;
  leadResearch: LeadResearchOutput | null;
  campaign: CampaignOutput | null;
}

export interface SignalCard {
  company: string;
  industry: string;
  employeeCount: string;
  priority: Priority;
  signalQuote: string;
  targetPersonas: string[];
}

export interface DiscoveryOutput {
  signals: SignalCard[];
  pipelineHealth: number;
  processingLatency: string;
  tokenConsumption: number;
}

export interface LeadProfile {
  id: string;
  name: string;
  title: string;
  company: string;
  score: number;
  role: LeadRole;
  enrichmentSignals: string[];
  status: "enriched" | "pending" | "low-signal";
  painMapping: string;
}

export interface IcpBuilderOutput {
  leads: LeadProfile[];
  enrichmentAccuracy: number;
  dataFreshness: string;
  flaggedForReview: number;
}

export interface ScoredLead extends LeadProfile {
  painToPersonMapping: string;
}

export interface LeadResearchOutput {
  leads: ScoredLead[];
}

export type TouchpointChannel = "email" | "linkedin" | "phone";

export interface Touchpoint {
  id: string;
  day: number;
  channel: TouchpointChannel;
  title: string;
  description: string;
  metadata: string[];
}

export interface CampaignOutput {
  touchpoints: Touchpoint[];
  sequenceScore: number;
  qualityAssessment: string;
  aiSuggestion: string;
}

export interface CampaignFormData {
  name: string;
  targetAudience: string;
  coreProblem: string;
  applauseSolutions: string;
}
