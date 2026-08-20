import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { internshipDomains } from "../../data/siteData";
import Icon from "../../components/ui/Icons";
import Button from "../../components/ui/Button";

const initial = { name: "", email: "", phone: "", domain: internshipDomains[0], message: "" };

export default function InternshipApply() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await addDoc(collection(db, "internshipApplications"), {
        ...form,
        status: "pending",
        appliedAt: serverTimestamp(),
      });
      setStatus("sent");
      setForm(initial);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="container-app py-24 text-center max-w-lg mx-auto">
        <span className="w-16 h-16 rounded-full brand-gradient-bg text-white flex items-center justify-center mx-auto mb-6">
          <Icon name="check" className="w-8 h-8" />
        </span>
        <h1 className="text-3xl font-display font-bold text-navy-900 mb-3">Application Submitted!</h1>
        <p className="text-navy-600 leading-relaxed mb-2">
          Thank you for applying. Our team will review your application.
        </p>
        <p className="text-navy-600 leading-relaxed">
          If selected, an offer letter will be sent to the email you provided — please keep an
          eye on your inbox.
        </p>
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-20">
      <div className="container-app max-w-xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-500">Internship Application</span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 mt-3">
            Apply for a Remote Internship
          </h1>
          <p className="text-navy-600 mt-3">
            No login required. Just fill out the form — enter a valid email, since the offer
            letter will be sent there.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-surface-alt rounded-3xl p-8 space-y-5 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1.5">Full Name</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
              placeholder="you@example.com"
            />
            <p className="text-xs text-navy-500 mt-1">The offer letter will be sent to this email.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1.5">Phone Number</label>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
              placeholder="03XX-XXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1.5">Internship Domain</label>
            <select
              value={form.domain}
              onChange={(e) => setForm({ ...form, domain: e.target.value })}
              className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400 bg-white"
            >
              {internshipDomains.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1.5">
              Why do you want to join? <span className="text-navy-400">(optional)</span>
            </label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
              placeholder="Briefly tell us about yourself..."
            />
          </div>

          <Button type="submit" variant="gradient" className="w-full" disabled={status === "sending"}>
            {status === "sending" ? "Submitting..." : "Submit Application"}
          </Button>
          {status === "error" && (
            <p className="text-xs text-red-500 text-center">Something went wrong, please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}
