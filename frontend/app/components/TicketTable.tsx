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
    return <p className="text-gray-500 text-center mt-6">No tickets yet.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-xl font-bold p-6 border-b">Ticket History</h2>

      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Message</th>
            <th className="px-6 py-3 text-left">Category</th>
            <th className="px-6 py-3 text-left">Priority</th>
            <th className="px-6 py-3 text-left">Created At</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4">{ticket.message}</td>
              <td className="px-6 py-4">{ticket.category}</td>
              <td className="px-6 py-4">{ticket.priority}</td>
              <td className="px-6 py-4">
                {new Date(ticket.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
