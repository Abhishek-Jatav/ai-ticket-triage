"use client";

import { AnalyzeResponse } from "../services/api";

interface Props {
  result: AnalyzeResponse | null;
}

export default function ResultPanel({ result }: Props) {
  if (!result) return null;

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Analysis Result</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <p>
          <span className="font-semibold">Category:</span> {result.category}
        </p>
        <p>
          <span className="font-semibold">Priority:</span> {result.priority}
        </p>

        <p>
          <span className="font-semibold">Urgency Signals:</span>{" "}
          {result.urgencySignals.length > 0
            ? result.urgencySignals.join(", ")
            : "None"}
        </p>

        <p>
          <span className="font-semibold">Matched Keywords:</span>{" "}
          {result.keywords.length > 0 ? result.keywords.join(", ") : "None"}
        </p>

        <p>
          <span className="font-semibold">Confidence:</span>{" "}
          {(result.confidence * 100).toFixed(0)}%
        </p>
      </div>
    </div>
  );
}
