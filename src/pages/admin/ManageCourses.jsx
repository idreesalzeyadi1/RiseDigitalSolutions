import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { adminLinks } from "./adminLinks";
import { courses as staticCourses } from "../../data/siteData";
import Button from "../../components/ui/Button";

const initial = { title: "", category: "", duration: "", price: "", description: "" };

export default function ManageCourses() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(initial);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "courses"), (snap) =>
      setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return unsub;
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    await addDoc(collection(db, "courses"), { ...form, createdAt: serverTimestamp() });
    setForm(initial);
  }

  async function handleDelete(id) {
    await deleteDoc(doc(db, "courses", id));
  }

  return (
    <DashboardLayout title="Courses" links={adminLinks}>
      <p className="text-sm text-navy-600 mb-5 bg-surface rounded-xl p-4">
        Courses added here are saved to the Firestore <code>courses</code> collection.
        Right now the public Academy page shows starter courses from
        <code> src/data/siteData.js</code> — when you're ready, update Academy.jsx to fetch
        from this Firestore collection instead.
      </p>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-surface-alt p-6">
          <h3 className="font-display font-semibold text-navy-900 mb-4">Add New Course</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400" />
            <input required placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400" />
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="Duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400" />
              <input required placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400" />
            </div>
            <textarea required rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400" />
            <Button type="submit" variant="gradient" className="w-full">Add Course</Button>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-surface-alt p-6">
          <h3 className="font-display font-semibold text-navy-900 mb-4">Firestore Courses</h3>
          <div className="space-y-3">
            {rows.map((c) => (
              <div key={c.id} className="bg-surface rounded-xl p-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-navy-900">{c.title}</p>
                  <p className="text-xs text-navy-500">{c.category} &middot; {c.duration} &middot; {c.price}</p>
                </div>
                <button onClick={() => handleDelete(c.id)} className="text-xs text-red-500 shrink-0">Delete</button>
              </div>
            ))}
            {rows.length === 0 && (
              <p className="text-sm text-navy-400 text-center py-6">
                No Firestore courses yet. Starter courses (static): {staticCourses.length}
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
