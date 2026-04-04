/* ── Pipeline output data types ── */

export interface TouchPoint {
  day: number;
  channel: "Email" | "Phone" | "LinkedIn";
  action: string;
  content?: string;
  subject?: string;
  variants?: { label: string; subject: string; content: string }[];
}

export interface Contact {
  name: string;
  title: string;
  score: number;
  cadenceType: "Extended" | "Standard" | "Compact";
  roleClass: string;
  apolloRequired?: boolean;
  capability?: string;
  touches: TouchPoint[];
}

/* ── Structured forensic content ── */

export interface CompanyStats {
  founded?: string;
  valuation?: string;
  arr?: string;
  employees?: string;
  funding?: string;
  hq?: string;
  extra?: { label: string; value: string }[];
}

export interface RealitySnapshot {
  triggerEvent: string;
  bleedingNeck: string;
  enemy: string;
}

export interface PsychologicalArchitecture {
  silentObjection: string;
  greenLight: string;
}

export interface StrategicEntryPoint {
  angle: string;
  opener: string;
}

export interface EvidenceItem {
  signal: string;
  detail: string;
}

export interface ForensicContent {
  companyStats?: CompanyStats;
  realitySnapshot?: RealitySnapshot;
  psychologicalArchitecture?: PsychologicalArchitecture;
  insiderVocabulary?: string[];
  strategicEntryPoints?: StrategicEntryPoint[];
  evidenceTable?: EvidenceItem[];
}

export interface PersonaCard {
  name: string;
  title: string;
  forensicHook: string;
  whyNow?: string;
  silentObjection?: string;
}

export interface StageData {
  summary: string;
  forensic?: ForensicContent;
  personas?: PersonaCard[];
}

export interface AccountDetail {
  id: string;
  company: string;
  fitScore: string;
  priority: "HIGH" | "MED-HIGH" | "PENDING" | "SKIP";
  color: string;
  description: string;
  rep: string;
  contacts: Contact[];
  stages?: {
    forensic?: string | StageData;
    icp?: string | StageData;
    leads?: string | StageData;
    deployment?: string | StageData;
    feedback?: string | StageData;
  };
}

export interface Campaign {
  id: string;
  title: string;
  type: string;
  date: string;
  color: string;
  accountIds: string[];
  contacts: number;
  cadences: number;
  touches: number;
  summary: string;
}
