import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import { createInternAccount, generateTempPassword } from "../../firebase/createInternAccount";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { adminLinks } from "./adminLinks";
import Button from "../../components/ui/Button";
import Icon from "../../components/ui/Icons";

const statusStyle = {
  pending: "bg-amber-100 text-amber-700",
  accepted: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export default function InternshipApplications() {
  const [rows, setRows] = useState([]);
  const [creatingId, setCreatingId] = useState(null);
  const [credentials, setCredentials] = useState(null); // { name, email, password } shown once after creation
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const q = query(collection(db, "internshipApplications"), orderBy("appliedAt", "desc"));
    const unsub = onSnapshot(q, (snap) => setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
    return unsub;
  }, []);

  async function setStatus(id, status) {
    await updateDoc(doc(db, "internshipApplications", id), { status });
  }

  async function handleCreateAccount(application) {
    setErrorMsg("");
    setCreatingId(application.id);
    const tempPassword = generateTempPassword();
    try {
      await createInternAccount({
        name: application.name,
        email: application.email,
        domain: application.domain,
        tempPassword,
      });
      await updateDoc(doc(db, "internshipApplications", application.id), {
        accountCreated: true,
      });
      setCredentials({ name: application.name, email: application.email, password: tempPassword });
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err.code === "auth/email-already-in-use"
          ? "An account with this email already exists."
          : "Something went wrong while creating the account. Please try again."
      );
    } finally {
      setCreatingId(null);
    }
  }

  return (
    <DashboardLayout title="Internship Applications" links={adminLinks}>
      <p className="text-sm text-navy-600 mb-4 bg-surface rounded-xl p-4">
        Accept an application, then click <strong>Create Intern Account</strong> to automatically
        generate their login (Firebase Auth + role: "intern"). You'll get a temporary password to
        include in the offer letter you send via Gmail — ask them to change it after first login.
      </p>

      {errorMsg && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">
          {errorMsg}
        </p>
      )}

      <div className="bg-white rounded-2xl border border-surface-alt overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-navy-500 text-xs uppercase">
            <tr>
              <th className="text-left px-5 py-3">Name</th>
              <th className="text-left px-5 py-3">Email</th>
              <th className="text-left px-5 py-3">Domain</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-surface-alt">
                <td className="px-5 py-3 font-medium text-navy-900">{r.name}</td>
                <td className="px-5 py-3 text-navy-600">{r.email}</td>
                <td className="px-5 py-3 text-navy-600">{r.domain}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyle[r.status]}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-3 space-x-3">
                  {r.status === "pending" && (
                    <>
                      <button onClick={() => setStatus(r.id, "accepted")} className="text-xs font-semibold text-emerald-600 hover:underline">
                        Accept
                      </button>
                      <button onClick={() => setStatus(r.id, "rejected")} className="text-xs font-semibold text-red-500 hover:underline">
                        Reject
                      </button>
                    </>
                  )}
                  {r.status === "accepted" && !r.accountCreated && (
                    <button
                      onClick={() => handleCreateAccount(r)}
                      disabled={creatingId === r.id}
                      className="text-xs font-semibold text-brand-600 hover:underline disabled:opacity-50"
                    >
                      {creatingId === r.id ? "Creating..." : "Create Intern Account"}
                    </button>
                  )}
                  {r.status === "accepted" && r.accountCreated && (
                    <span className="text-xs font-semibold text-navy-400 inline-flex items-center gap-1">
                      <Icon name="check" className="w-3.5 h-3.5 text-emerald-500" /> Account created
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-navy-400">No applications yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Credentials modal - shown once right after account creation */}
      {credentials && (
        <div className="fixed inset-0 bg-navy-950/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-7 max-w-md w-full">
            <span className="w-12 h-12 rounded-xl brand-gradient-bg text-white flex items-center justify-center mb-4">
              <Icon name="check" className="w-6 h-6" />
            </span>
            <h3 className="font-display font-bold text-lg text-navy-900 mb-1">
              Intern Account Created
            </h3>
            <p className="text-sm text-navy-600 mb-5">
              Copy these credentials into the offer letter you send to <strong>{credentials.name}</strong>.
              This password is shown only once — it is not stored anywhere and cannot be
              retrieved later.
            </p>
            <div className="bg-surface rounded-xl p-4 space-y-2 text-sm mb-6">
              <p><span className="text-navy-500">Login URL:</span> <strong>/login</strong></p>
              <p><span className="text-navy-500">Email:</span> <strong>{credentials.email}</strong></p>
              <p><span className="text-navy-500">Temporary Password:</span> <strong>{credentials.password}</strong></p>
            </div>
            <Button
              onClick={() => {
                navigator.clipboard?.writeText(
                  `Login URL: ${window.location.origin}/login\nEmail: ${credentials.email}\nTemporary Password: ${credentials.password}`
                );
              }}
              variant="outline"
              className="w-full mb-3 !text-sm"
            >
              Copy to Clipboard
            </Button>
            <Button onClick={() => setCredentials(null)} variant="gradient" className="w-full !text-sm">
              Done
            </Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
