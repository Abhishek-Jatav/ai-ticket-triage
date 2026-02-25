import { BACKEND_URL } from "./env";

export interface AnalyzeResponse {
  category: string;
  priority: string;
  urgencySignals: string[];
  keywords: string[];
  confidence: number;
}

export async function analyzeTicket(message: string): Promise<AnalyzeResponse> {
  const response = await fetch(`${BACKEND_URL}/tickets/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      Array.isArray(errorData.message)
        ? errorData.message.join(", ")
        : errorData.message || "Analysis failed",
    );
  }

  return response.json();
}

export async function getTickets() {
  const response = await fetch(`${BACKEND_URL}/tickets`);

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return response.json();
}
