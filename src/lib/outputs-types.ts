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
    forensic?: string;
    icp?: string;
    leads?: string;
    deployment?: string;
    feedback?: string;
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
  docUrl: string | null;
}
