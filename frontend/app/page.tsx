"use client";

import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import TicketForm from "./components/TicketForm";
import ResultPanel from "./components/ResultPanel";
import TicketTable from "./components/TicketTable";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import { analyzeTicket, getTickets, AnalyzeResponse } from "../services/api";

export default function Home() {
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
    } catch {
      setError("Failed to load tickets");
    }
  };

  const handleSubmit = async (message: string) => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const analysis = await analyzeTicket(message);
      setResult(analysis);

      toast.success("Ticket analyzed successfully!");

      await fetchTickets();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-10">
      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            AI Ticket Triage
          </h1>

          <a
            href="https://nexabuild-abhishek-jatav.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl transition shadow-lg">
            See My Portfolio
          </a>
        </div>

        <ErrorMessage message={error} />

        <TicketForm onSubmit={handleSubmit} loading={loading} />

        {loading && <Loader />}

        <ResultPanel result={result} />

        <TicketTable tickets={tickets} />
      </div>
    </main>
  );
}
