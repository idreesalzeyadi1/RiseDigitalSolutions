import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { adminLinks } from "./adminLinks";

const cards = [
  { key: "serviceHireRequests", label: "Service Requests" },
  { key: "enrollments", label: "Course Enrollments" },
  { key: "internshipApplications", label: "Internship Applications" },
  { key: "tasks", label: "Active Tasks" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const unsubs = cards.map((c) =>
      onSnapshot(collection(db, c.key), (snap) =>
        setCounts((prev) => ({ ...prev, [c.key]: snap.size }))
      )
    );
    return () => unsubs.forEach((u) => u());
  }, []);

  return (
    <DashboardLayout title="Admin Overview" links={adminLinks}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <div key={c.key} className="bg-white rounded-2xl p-6 border border-surface-alt">
            <p className="text-sm text-navy-500 mb-1">{c.label}</p>
            <p className="text-3xl font-display font-bold text-navy-900">
              {counts[c.key] ?? "—"}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-surface-alt mt-6">
        <h3 className="font-display font-semibold text-navy-900 mb-2">Quick Guide</h3>
        <ul className="text-sm text-navy-600 space-y-1.5 list-disc pl-5">
          <li>Check new service requests under "Service Requests" and contact the client yourself.</li>
          <li>Once a course payment (bank transfer) is verified, update its status under "Enrollments".</li>
          <li>Accept internship applications and manually send the offer letter via Gmail.</li>
          <li>Assign tasks to accepted interns from "Interns & Tasks".</li>
          <li>Once an internship is complete, upload the PDF certificate under "Certificates".</li>
        </ul>
      </div>
    </DashboardLayout>
  );
}
