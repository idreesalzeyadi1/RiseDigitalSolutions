import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { adminLinks } from "./adminLinks";
import Button from "../../components/ui/Button";

const initial = { name: "", role: "", quote: "", rating: 5 };

export default function Testimonials() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(initial);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "testimonials"), (snap) =>
      setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return unsub;
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    await addDoc(collection(db, "testimonials"), { ...form, createdAt: serverTimestamp() });
    setForm(initial);
  }

  async function handleDelete(id) {
    await deleteDoc(doc(db, "testimonials", id));
  }

  return (
    <DashboardLayout title="Testimonials" links={adminLinks}>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-surface-alt p-6">
          <h3 className="font-display font-semibold text-navy-900 mb-4">Add Testimonial</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <input
              required
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
            />
            <input
              required
              placeholder="Role (e.g. Client, Intern)"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
            />
            <textarea
              required
              rows={3}
              placeholder="Quote"
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
            />
            <Button type="submit" variant="gradient" className="w-full">Add Testimonial</Button>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-surface-alt p-6">
          <h3 className="font-display font-semibold text-navy-900 mb-4">All Testimonials</h3>
          <div className="space-y-3">
            {rows.map((t) => (
              <div key={t.id} className="bg-surface rounded-xl p-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                  <p className="text-xs text-navy-500 mb-1">{t.role}</p>
                  <p className="text-sm text-navy-700">&ldquo;{t.quote}&rdquo;</p>
                </div>
                <button onClick={() => handleDelete(t.id)} className="text-xs text-red-500 shrink-0">
                  Delete
                </button>
              </div>
            ))}
            {rows.length === 0 && <p className="text-sm text-navy-400 text-center py-6">No testimonials yet.</p>}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
