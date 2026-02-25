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
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] text-gray-200 p-6 sm:p-10">
      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            AI Ticket Triage
          </h1>

          <a
            href="https://nexabuild-abhishek-jatav.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-2xl transition-all duration-300 shadow-xl hover:scale-105">
            See My Portfolio
          </a>
        </div>

        {/* Error */}
        <ErrorMessage message={error} />

        {/* Ticket Form */}
        <TicketForm onSubmit={handleSubmit} loading={loading} />

        {/* Loader */}
        {loading && <Loader />}

        {/* Result Panel */}
        <ResultPanel result={result} />

        {/* Ticket Table */}
        <TicketTable tickets={tickets} />
      </div>
    </main>
  );
}
