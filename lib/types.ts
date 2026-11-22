
export type AIProvider = "gemini" | "groq" | "cohere";

export type Language = "en" | "ne";

export interface ReadItem {
  label: string;
  value: string;
  confidence: number;
  status: string;
}

export interface ReadDocumentResponse {
  items: ReadItem[];
  demoMode: boolean;
}

export interface ExplainRequest {
  items: ReadItem[];
  language: Language;
}

export interface ExplainResponse {
  language: Language;
  summary: string;
  explanations: string[];
  safetyReminder: string;
  demoMode: boolean;
}
