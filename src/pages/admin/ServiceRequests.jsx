import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { adminLinks } from "./adminLinks";

const statusStyle = {
  pending: "bg-amber-100 text-amber-700",
  contacted: "bg-blue-100 text-blue-700",
  closed: "bg-emerald-100 text-emerald-700",
};

export default function ServiceRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "serviceHireRequests"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => setRequests(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
    return unsub;
  }, []);

  async function setStatus(id, status) {
    await updateDoc(doc(db, "serviceHireRequests", id), { status });
  }

  return (
    <DashboardLayout title="Service Requests" links={adminLinks}>
      <div className="bg-white rounded-2xl border border-surface-alt overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-navy-500 text-xs uppercase">
            <tr>
              <th className="text-left px-5 py-3">Name</th>
              <th className="text-left px-5 py-3">Phone</th>
              <th className="text-left px-5 py-3">Service</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-t border-surface-alt">
                <td className="px-5 py-3 font-medium text-navy-900">{r.name}</td>
                <td className="px-5 py-3 text-navy-600">{r.phone}</td>
                <td className="px-5 py-3 text-navy-600">{r.serviceType}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyle[r.status] || "bg-surface"}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <select
                    value={r.status}
                    onChange={(e) => setStatus(r.id, e.target.value)}
                    className="text-xs border border-surface-alt rounded-lg px-2 py-1.5 bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-navy-400">No requests yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
