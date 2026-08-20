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

export default function Certificates() {
  const [interns, setInterns] = useState([]);
  const [selected, setSelected] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const q = query(collection(db, "users"), where("role", "==", "intern"));
    const unsub = onSnapshot(q, (snap) => setInterns(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
    return unsub;
  }, []);

  async function handleUpload(e) {
    e.preventDefault();
    if (!selected || !pdfUrl) return;
    setStatus("sending");
    try {
      await addDoc(collection(db, "certificates"), {
        internId: selected,
        pdfUrl,
        issuedDate: serverTimestamp(),
      });
      setPdfUrl("");
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <DashboardLayout title="Certificates" links={adminLinks}>
      <div className="bg-white rounded-2xl border border-surface-alt p-6 max-w-lg">
        <h3 className="font-display font-semibold text-navy-900 mb-2">Issue a Certificate</h3>
        <p className="text-sm text-navy-600 mb-5">
          First upload the certificate PDF to Firebase Storage (or any file hosting), then
          paste its public link here.
        </p>
        <form onSubmit={handleUpload} className="space-y-4">
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
            <label className="block text-sm font-medium text-navy-800 mb-1.5">Certificate PDF URL</label>
            <input
              required
              type="url"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
            />
          </div>
          <Button type="submit" variant="gradient" className="w-full" disabled={status === "sending"}>
            {status === "sent" ? "Certificate Issued!" : status === "sending" ? "Uploading..." : "Issue Certificate"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
