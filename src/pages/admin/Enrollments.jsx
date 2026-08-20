import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { adminLinks } from "./adminLinks";

const statusStyle = {
  pending: "bg-amber-100 text-amber-700",
  verified: "bg-emerald-100 text-emerald-700",
};

export default function Enrollments() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "enrollments"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
    return unsub;
  }, []);

  async function verify(id) {
    await updateDoc(doc(db, "enrollments", id), { paymentStatus: "verified" });
  }

  return (
    <DashboardLayout title="Course Enrollments" links={adminLinks}>
      <div className="bg-white rounded-2xl border border-surface-alt overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-navy-500 text-xs uppercase">
            <tr>
              <th className="text-left px-5 py-3">Student</th>
              <th className="text-left px-5 py-3">Email</th>
              <th className="text-left px-5 py-3">Course</th>
              <th className="text-left px-5 py-3">Payment</th>
              <th className="text-left px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-surface-alt">
                <td className="px-5 py-3 font-medium text-navy-900">{r.userName}</td>
                <td className="px-5 py-3 text-navy-600">{r.userEmail}</td>
                <td className="px-5 py-3 text-navy-600">{r.courseTitle}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyle[r.paymentStatus]}`}>
                    {r.paymentStatus}
                  </span>
                </td>
                <td className="px-5 py-3">
                  {r.paymentStatus === "pending" && (
                    <button onClick={() => verify(r.id)} className="text-xs font-semibold text-brand-500 hover:underline">
                      Mark as Verified
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-navy-400">No enrollments yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
