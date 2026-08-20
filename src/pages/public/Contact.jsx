import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import Icon from "../../components/ui/Icons";
import Button from "../../components/ui/Button";

const initial = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await addDoc(collection(db, "contactMessages"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setStatus("sent");
      setForm(initial);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div className="py-16 sm:py-20">
      <div className="container-app grid lg:grid-cols-2 gap-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-500">Get In Touch</span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 mt-3 mb-4">
            Let's Talk About Your Project
          </h1>
          <p className="text-navy-600 leading-relaxed mb-8">
            Have a question, want to discuss a project, or just want to say hello — we're here.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-xl brand-gradient-bg text-white flex items-center justify-center shrink-0">
                &#9742;
              </span>
              <div>
                <p className="text-sm text-navy-500">Phone</p>
                <p className="font-semibold text-navy-900">+92 3XX XXXXXXX</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-xl brand-gradient-bg text-white flex items-center justify-center shrink-0">
                &#9993;
              </span>
              <div>
                <p className="text-sm text-navy-500">Email</p>
                <p className="font-semibold text-navy-900">hello@risedigitalsolutions.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-xl brand-gradient-bg text-white flex items-center justify-center shrink-0">
                &#128205;
              </span>
              <div>
                <p className="text-sm text-navy-500">Location</p>
                <p className="font-semibold text-navy-900">Pakistan (Remote-first team)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-surface-alt rounded-3xl p-8 shadow-sm">
          {status === "sent" ? (
            <div className="text-center py-10">
              <Icon name="check" className="w-10 h-10 text-brand-500 mx-auto mb-4" />
              <p className="font-semibold text-navy-900 text-lg mb-1">Message Sent!</p>
              <p className="text-sm text-navy-600">We'll get in touch with you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy-800 mb-1.5">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-800 mb-1.5">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-800 mb-1.5">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-800 mb-1.5">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
                />
              </div>
              <Button type="submit" variant="gradient" className="w-full" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
