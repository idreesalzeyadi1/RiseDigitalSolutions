import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { internshipDomains } from "../../data/siteData";
import Icon from "../../components/ui/Icons";
import Button from "../../components/ui/Button";

const initial = {
  name: "",
  email: "",
  phone: "",
  domain: internshipDomains[0] || "Web Development",
  qualification: "Undergraduate",
  message: "",
};

export default function InternshipApply() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'sent' | 'error'

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      // Direct Firestore Collection Entry
      await addDoc(collection(db, "internshipApplications"), {
        ...form,
        status: "pending",
        appliedAt: serverTimestamp(),
      });
      setStatus("sent");
      setForm(initial);
    } catch (err) {
      console.error("Firestore Error:", err);
      setStatus("error");
    }
  }

  return (
    <div className="py-16 sm:py-24 bg-surface min-h-[85vh] flex items-center justify-center">
      <div className="container-app max-w-2xl mx-auto px-4">
        
        {/* Animated Success View */}
        {status === "sent" ? (
          <div className="bg-white border border-surface-alt rounded-3xl p-8 sm:p-12 text-center shadow-xl transform transition-all duration-500 animate-in fade-in zoom-in-95">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <span className="absolute inset-0 rounded-full brand-gradient-bg opacity-25 animate-ping"></span>
              <span className="relative w-20 h-20 rounded-full brand-gradient-bg text-white flex items-center justify-center shadow-lg mx-auto">
                <Icon name="check" className="w-10 h-10 stroke-[3]" />
              </span>
            </div>

            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-500 bg-brand-50 rounded-full mb-3">
              Application Received
            </span>
            
            <h1 className="text-3xl font-display font-bold text-navy-900 mb-3">
              Application Submitted Successfully!
            </h1>
            
            <p className="text-navy-600 text-sm leading-relaxed max-w-md mx-auto mb-6">
              Thank you for applying to RiseDigital Solutions. Your details have been stored in our system.
            </p>

            <div className="p-4 rounded-2xl bg-surface border border-surface-alt text-xs text-navy-700 max-w-sm mx-auto mb-8 space-y-1">
              <p className="font-semibold text-navy-900">What happens next?</p>
              <p>Our review team will evaluate your profile. If shortlisted, an official Offer Letter will be sent directly to your registered email.</p>
            </div>

            <Button variant="outline" onClick={() => setStatus("idle")} className="px-8">
              Submit Another Application
            </Button>
          </div>
        ) : (
          /* Form Section */
          <div className="bg-white border border-surface-alt rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            {/* Top Decorative Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 brand-gradient-bg"></div>

            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-500 bg-brand-50 px-3 py-1 rounded-full">
                RiseDigital Academy
              </span>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 mt-3">
                Apply for Remote Internship
              </h1>
              <p className="text-navy-600 text-sm mt-2 max-w-md mx-auto">
                Build real projects with expert guidance. Fill out the application form below to start your journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-navy-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Muhammad Ali"
                  className="w-full rounded-xl border border-surface-alt px-4 py-3 text-sm focus-ring focus:border-brand-400 bg-surface/30 transition-all"
                />
              </div>

              {/* Email & Phone Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-navy-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-surface-alt px-4 py-3 text-sm focus-ring focus:border-brand-400 bg-surface/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-navy-700 mb-1.5">
                    WhatsApp / Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0312 3456789"
                    className="w-full rounded-xl border border-surface-alt px-4 py-3 text-sm focus-ring focus:border-brand-400 bg-surface/30 transition-all"
                  />
                </div>
              </div>

              {/* Domain & Qualification Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-navy-700 mb-1.5">
                    Internship Domain
                  </label>
                  <select
                    value={form.domain}
                    onChange={(e) => setForm({ ...form, domain: e.target.value })}
                    className="w-full rounded-xl border border-surface-alt px-4 py-3 text-sm focus-ring focus:border-brand-400 bg-surface/30 transition-all cursor-pointer"
                  >
                    {internshipDomains.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-navy-700 mb-1.5">
                    Current Qualification
                  </label>
                  <select
                    value={form.qualification}
                    onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                    className="w-full rounded-xl border border-surface-alt px-4 py-3 text-sm focus-ring focus:border-brand-400 bg-surface/30 transition-all cursor-pointer"
                  >
                    <option value="Undergraduate">Undergraduate (BS / Student)</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Self-Taught">Self-Taught / Freelancer</option>
                  </select>
                </div>
              </div>

              {/* Message / Motivation */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-navy-700 mb-1.5">
                  Why do you want to join? <span className="text-navy-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us briefly about your current skills and learning goals..."
                  className="w-full rounded-xl border border-surface-alt px-4 py-3 text-sm focus-ring focus:border-brand-400 bg-surface/30 transition-all resize-none"
                />
              </div>

              {/* Error Message */}
              {status === "error" && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 text-center font-medium">
                  Failed to submit application. Please check your network connection and try again.
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="gradient"
                className="w-full py-3.5 text-base font-semibold shadow-md hover:shadow-lg transition-shadow"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Submitting Application..." : "Submit Application"}
              </Button>

              <p className="text-[11px] text-navy-400 text-center">
                By submitting this form, you agree to receive communications regarding your application status.
              </p>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}