export type AccountId = "robinhood" | "intuit" | "snap";

export type BuyerRole = "economic-buyer" | "technical-buyer" | "champion" | "influencer";

export type Priority = "high" | "medium" | "low";

export type TouchpointChannel = "email" | "linkedin" | "phone";

export type CadenceType = "compact" | "standard" | "extended";

export interface CampaignMeta {
  name: string;
  vertical: string;
  generatedDate: string;
  seller: { name: string; title: string; company: string };
  accounts: AccountId[];
}

export interface NewsItem {
  headline: string;
  detail: string;
}

export interface PersonProfile {
  name: string;
  title: string;
  background: string;
  tenure?: string;
  focus?: string;
  talkingPoints: string[];
}

export interface TechStackEntry {
  category: string;
  tools: string;
}

export interface AccountProfile {
  id: AccountId;
  name: string;
  ticker: string;
  industry: string;
  employees: number;
  headquarters: string;
  revenue: string;
  revenueGrowth: string;
  netIncome?: string;
  founded: number;
  website: string;
  quickTake: string;
  whatTheyDo: string;
  recentNews: NewsItem[];
  hiringSignals: string[];
  keyPeople: PersonProfile[];
  techStack: TechStackEntry[];
  qualificationSignals: {
    positive: string[];
    concerns: string[];
    unknown: string[];
  };
  recommendedApproach: {
    entryPoint: string;
    openingHook: string;
    discoveryQuestions: string[];
  };
}

export interface ScoredContact {
  id: string;
  accountId: AccountId;
  name: string;
  title: string;
  company: string;
  score: number;
  role: BuyerRole;
  background: string;
  talkingPoints: string[];
  painToPersonMapping: string;
  cadenceType: CadenceType;
  cadenceDays: number;
  cadenceTouches: number;
  messagingAngle: string;
}

export interface CadenceTouchpoint {
  day: number;
  channel: TouchpointChannel;
  type: string;
  subject?: string;
  htmlBody?: string;
  linkedinText?: string;
  talkTrack?: string;
  voicemail?: string;
  note?: string;
}

export interface Cadence {
  contactId: string;
  contactName: string;
  contactTitle: string;
  company: string;
  classification: string;
  cadenceType: string;
  tone: string;
  touchpoints: CadenceTouchpoint[];
}
