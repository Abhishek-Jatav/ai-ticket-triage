"use client";

import { AnalyzeResponse } from "../../services/api";

interface Props {
  result: AnalyzeResponse | null;
}

export default function ResultPanel({ result }: Props) {
  if (!result) return null;

  return (
    <div className="bg-[#0f172a]/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 mb-8 border border-gray-700 text-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-white tracking-wide">
        Analysis Result
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
        <p>
          <span className="font-semibold text-gray-400">Category:</span>{" "}
          <span className="text-blue-400">{result.category}</span>
        </p>

        <p>
          <span className="font-semibold text-gray-400">Priority:</span>{" "}
          <span className="text-purple-400">{result.priority}</span>
        </p>

        <p>
          <span className="font-semibold text-gray-400">Urgency Signals:</span>{" "}
          {result.urgencySignals.length > 0
            ? result.urgencySignals.join(", ")
            : "None"}
        </p>

        <p>
          <span className="font-semibold text-gray-400">Matched Keywords:</span>{" "}
          {result.keywords.length > 0 ? result.keywords.join(", ") : "None"}
        </p>

        <p>
          <span className="font-semibold text-gray-400">Confidence:</span>{" "}
          <span className="text-green-400 font-semibold">
            {(result.confidence * 100).toFixed(0)}%
          </span>
        </p>
      </div>
    </div>
  );
}
