
export interface EmailSummary {
  id: number;
  sender: string;
  subject: string;
  body: string;
  summary: string;
  category: string;
  created_at: string;
}


export type Category = 'All' | 'Meeting' | 'Invoice' | 'Support Request' | 'Other';