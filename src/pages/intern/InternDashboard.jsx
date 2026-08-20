import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Icon from "../../components/ui/Icons";

export const internLinks = [
  { to: "/intern/dashboard", label: "Overview", icon: "briefcase", end: true },
  { to: "/intern/tasks", label: "My Tasks", icon: "check" },
  { to: "/intern/certificate", label: "Certificate", icon: "award" },
];

export default function InternDashboard() {
  const { currentUser, profile } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, "tasks"), where("internId", "==", currentUser.uid));
    const unsub = onSnapshot(q, (snap) => setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
    return unsub;
  }, [currentUser]);

  const completed = tasks.filter((t) => t.status === "completed").length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <DashboardLayout title="Overview" links={internLinks}>
      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-surface-alt">
          <p className="text-sm text-navy-500 mb-1">Domain</p>
          <p className="text-xl font-display font-bold text-navy-900">{profile?.domain || "—"}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-surface-alt">
          <p className="text-sm text-navy-500 mb-1">Tasks Assigned</p>
          <p className="text-xl font-display font-bold text-navy-900">{tasks.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-surface-alt">
          <p className="text-sm text-navy-500 mb-1">Progress</p>
          <p className="text-xl font-display font-bold text-navy-900">{progress}%</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-surface-alt">
        <h3 className="font-display font-semibold text-navy-900 mb-4">Welcome, {profile?.name || "Intern"}!</h3>
        <p className="text-sm text-navy-600 leading-relaxed">
          Go to the "My Tasks" section to view and submit your assigned tasks.
          Once your internship is complete, your certificate will be available to download
          in the "Certificate" tab.
        </p>
      </div>
    </DashboardLayout>
  );
}
