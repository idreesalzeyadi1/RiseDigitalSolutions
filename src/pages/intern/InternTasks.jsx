import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { internLinks } from "./InternDashboard";
import Button from "../../components/ui/Button";

const statusStyle = {
  pending: "bg-amber-100 text-amber-700",
  submitted: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
};

export default function InternTasks() {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [submission, setSubmission] = useState({});

  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, "tasks"), where("internId", "==", currentUser.uid));
    const unsub = onSnapshot(q, (snap) => setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
    return unsub;
  }, [currentUser]);

  async function handleSubmit(taskId) {
    const url = submission[taskId];
    if (!url) return;
    await updateDoc(doc(db, "tasks", taskId), { status: "submitted", submissionUrl: url });
  }

  return (
    <DashboardLayout title="My Tasks" links={internLinks}>
      {tasks.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-surface-alt">
          <p className="font-semibold text-navy-900 mb-1">No tasks assigned yet</p>
          <p className="text-sm text-navy-600">The admin will assign you tasks soon.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-6 border border-surface-alt">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display font-semibold text-navy-900">{t.title}</h3>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyle[t.status] || "bg-surface"}`}>
                  {t.status}
                </span>
              </div>
              <p className="text-sm text-navy-600 mb-4">{t.description}</p>
              {t.status === "pending" && (
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Submission link (Google Drive, GitHub, etc.)"
                    value={submission[t.id] || ""}
                    onChange={(e) => setSubmission({ ...submission, [t.id]: e.target.value })}
                    className="flex-1 rounded-xl border border-surface-alt px-4 py-2 text-sm focus-ring focus:border-brand-400"
                  />
                  <Button onClick={() => handleSubmit(t.id)} variant="gradient" className="!px-5 !py-2 !text-sm">
                    Submit
                  </Button>
                </div>
              )}
              {t.status === "submitted" && (
                <p className="text-xs text-navy-500">Submitted: <a href={t.submissionUrl} target="_blank" rel="noreferrer" className="text-brand-500">{t.submissionUrl}</a></p>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
