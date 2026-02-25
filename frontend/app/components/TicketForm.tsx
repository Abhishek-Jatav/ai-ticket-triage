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
    <form onSubmit={handleSubmit} className="mb-8">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter ticket message..."
        rows={4}
        className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition disabled:opacity-50">
        {loading ? "Analyzing..." : "Submit Ticket"}
      </button>
    </form>
  );
}
