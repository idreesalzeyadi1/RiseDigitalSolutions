import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { adminLinks } from "./adminLinks";
import Button from "../../components/ui/Button";

export default function ManageInterns() {
  const [interns, setInterns] = useState([]);
  const [selected, setSelected] = useState("");
  const [form, setForm] = useState({ title: "", description: "" });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const q = query(collection(db, "users"), where("role", "==", "intern"));
    const unsub = onSnapshot(q, (snap) => setInterns(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
    return unsub;
  }, []);

  async function handleAssign(e) {
    e.preventDefault();
    if (!selected) return;
    setStatus("sending");
    try {
      await addDoc(collection(db, "tasks"), {
        internId: selected,
        title: form.title,
        description: form.description,
        status: "pending",
        assignedAt: serverTimestamp(),
      });
      setForm({ title: "", description: "" });
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <DashboardLayout title="Interns & Tasks" links={adminLinks}>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-surface-alt p-6">
          <h3 className="font-display font-semibold text-navy-900 mb-4">Registered Interns</h3>
          <div className="space-y-2">
            {interns.map((i) => (
              <div key={i.id} className="flex items-center justify-between bg-surface rounded-xl px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-navy-900">{i.name}</p>
                  <p className="text-xs text-navy-500">{i.email}</p>
                </div>
                <span className="text-xs text-navy-500">{i.domain || "—"}</span>
              </div>
            ))}
            {interns.length === 0 && (
              <p className="text-sm text-navy-400 text-center py-6">
                No intern accounts yet. After accepting an application, create the intern's
                account in Firebase with role: "intern".
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-surface-alt p-6">
          <h3 className="font-display font-semibold text-navy-900 mb-4">Assign a Task</h3>
          <form onSubmit={handleAssign} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-800 mb-1.5">Select Intern</label>
              <select
                required
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm bg-white"
              >
                <option value="">Choose intern...</option>
                {interns.map((i) => (
                  <option key={i.id} value={i.id}>{i.name} ({i.email})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-800 mb-1.5">Task Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-800 mb-1.5">Description</label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
              />
            </div>
            <Button type="submit" variant="gradient" className="w-full" disabled={status === "sending"}>
              {status === "sent" ? "Task Assigned!" : status === "sending" ? "Assigning..." : "Assign Task"}
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
