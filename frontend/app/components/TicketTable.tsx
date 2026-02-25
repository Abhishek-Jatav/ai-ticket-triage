"use client";

interface Ticket {
  _id: string;
  message: string;
  category: string;
  priority: string;
  createdAt: string;
}

interface Props {
  tickets: Ticket[];
}

export default function TicketTable({ tickets }: Props) {
  if (!tickets || tickets.length === 0) {
    return <p className="text-gray-400 text-center mt-8">No tickets yet.</p>;
  }

  return (
    <div className="overflow-x-auto bg-[#0f172a]/80 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-700 text-gray-200">
      <h2 className="text-2xl font-bold p-6 border-b border-gray-700 text-white">
        Ticket History
      </h2>

      <table className="min-w-full text-sm">
        <thead className="bg-[#1e293b] text-gray-400 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-4 text-left">Message</th>
            <th className="px-6 py-4 text-left">Category</th>
            <th className="px-6 py-4 text-left">Priority</th>
            <th className="px-6 py-4 text-left">Created At</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket._id}
              className="border-t border-gray-700 hover:bg-[#1e293b] transition">
              <td className="px-6 py-4">{ticket.message}</td>
              <td className="px-6 py-4 text-blue-400">{ticket.category}</td>
              <td className="px-6 py-4 text-purple-400">{ticket.priority}</td>
              <td className="px-6 py-4 text-gray-400">
                {new Date(ticket.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
