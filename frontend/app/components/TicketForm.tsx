"use client";

import { useState } from "react";

interface Props {
  onSubmit: (message: string) => void;
  loading: boolean;
}

export default function TicketForm({ onSubmit, loading }: Props) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSubmit(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter ticket message..."
        rows={4}
        className="w-full p-5 rounded-2xl bg-[#0f172a] border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none transition shadow-lg"
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 shadow-lg">
        {loading ? "Analyzing..." : "Submit Ticket"}
      </button>
    </form>
  );
}
