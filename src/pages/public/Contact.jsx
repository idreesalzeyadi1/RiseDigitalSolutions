import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import Icon from "../../components/ui/Icons";
import Button from "../../components/ui/Button";

const initial = { name: "", email: "", phone: "", subject: "Project Inquiry", message: "" };

const servicesList = [
  "Web & Mobile App Development",
  "Custom AI & Automation Solutions",
  "UI/UX Design & Branding",
  "Digital Marketing & Strategy",
];

const faqs = [
  {
    q: "How fast do you respond to project inquiries?",
    a: "We usually respond within 24 hours to set up an initial discovery call.",
  },
  {
    q: "Are you open for internships or hiring?",
    a: "Yes! We regularly offer remote internships. You can send your CV directly with the subject 'Internship Application'.",
  },
  {
    q: "Do you work with international clients?",
    a: "Absolutely. We are a remote-first team serving clients locally in Pakistan and globally.",
  },
];

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
    <div className="py-16 sm:py-20 bg-surface">
      <div className="container-app space-y-16">
        
        {/* Main Grid: Info + Form */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Info & About */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-500">Get In Touch</span>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 mt-3 mb-4">
              Let's Talk About Your Next Big Idea
            </h1>
            <p className="text-navy-600 leading-relaxed mb-8">
              Whether you need a custom web application, AI integration, or want to discuss career & internship opportunities — we are ready to collaborate.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-surface-alt shadow-xs">
                <span className="w-11 h-11 rounded-xl brand-gradient-bg text-white flex items-center justify-center shrink-0">
                  &#9742;
                </span>
                <div>
                  <p className="text-xs text-navy-500 font-medium">Phone / WhatsApp</p>
                  <a href="https://wa.me/923179770764" target="_blank" rel="noreferrer" className="font-semibold text-navy-900 hover:text-brand-500 transition-colors">
                    +92 317 9770764
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-surface-alt shadow-xs">
                <span className="w-11 h-11 rounded-xl brand-gradient-bg text-white flex items-center justify-center shrink-0">
                  &#9993;
                </span>
                <div>
                  <p className="text-xs text-navy-500 font-medium">Official Email</p>
                  <a href="mailto:risedigitalsolutions@gmail.com" className="font-semibold text-navy-900 hover:text-brand-500 transition-colors">
                    risedigitalsolutions@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-surface-alt shadow-xs">
                <span className="w-11 h-11 rounded-xl brand-gradient-bg text-white flex items-center justify-center shrink-0">
                  &#128205;
                </span>
                <div>
                  <p className="text-xs text-navy-500 font-medium">Headquarters</p>
                  <p className="font-semibold text-navy-900">Peshawar, Pakistan (Remote-first Team)</p>
                </div>
              </div>
            </div>

            {/* Services Quick View */}
            <div className="p-6 rounded-2xl bg-navy-900 text-white space-y-3">
              <p className="font-semibold text-sm tracking-wide text-brand-400 uppercase">What We Build</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-navy-200">
                {servicesList.map((service, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-brand-400">✔</span> {service}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Form */}
          <div className="bg-white border border-surface-alt rounded-3xl p-8 shadow-sm">
            {status === "sent" ? (
              <div className="text-center py-12 space-y-3">
                <Icon name="check" className="w-12 h-12 text-brand-500 mx-auto" />
                <p className="font-bold text-navy-900 text-xl">Thank You!</p>
                <p className="text-sm text-navy-600 max-w-xs mx-auto">
                  Your message has been delivered. Our team will get back to you shortly.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => setStatus("idle")}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Full Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-1.5">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-1.5">Phone Number</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+92 300 0000000"
                      className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Inquiry Type</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400 bg-white"
                  >
                    <option value="Project Inquiry">Project Inquiry</option>
                    <option value="Internship / Careers">Internship / Careers</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project requirements or application details..."
                    className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs text-red-500 font-medium">Something went wrong. Please try again later.</p>
                )}

                <Button type="submit" variant="gradient" className="w-full" disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Careers & Internship Callout Banner */}
        <div className="rounded-3xl brand-gradient-bg p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold font-display">Looking for Internship Opportunities?</h3>
            <p className="text-navy-100 text-sm max-w-xl">
              RiseDigital Solutions offers hands-on remote internships for developers, designers, and digital marketers. Build real-world projects with us.
            </p>
          </div>
          <a
            href="mailto:risedigitalsolutions@gmail.com?subject=Internship%20Application"
            className="shrink-0 bg-white text-navy-900 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-navy-50 transition-colors"
          >
            Apply for Internship
          </a>
        </div>

        {/* Frequently Asked Questions */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-navy-900 font-display">Frequently Asked Questions</h2>
            <p className="text-sm text-navy-600 mt-1">Quick answers to common questions</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-surface-alt shadow-2xs">
                <p className="font-semibold text-navy-900 text-base mb-1">{faq.q}</p>
                <p className="text-sm text-navy-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}