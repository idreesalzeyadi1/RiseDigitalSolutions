import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { services } from "../../data/siteData";
import Icon from "../../components/ui/Icons";
import Button from "../../components/ui/Button";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");

  if (!service) return <Navigate to="/services" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await addDoc(collection(db, "serviceHireRequests"), {
        name: form.name,
        phone: form.phone,
        message: form.message,
        serviceType: service.title,
        serviceSlug: service.slug,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setStatus("sent");
      setForm({ name: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div>
      <section className="brand-gradient-bg text-white py-12 sm:py-16">
        <div className="container-app">
          <Link to="/services" className="text-sm text-white/70 hover:text-white inline-flex items-center gap-1 mb-6">
            &larr; All Services
          </Link>

          {/* Side-by-Side Layout to fit Square Artworks perfectly */}
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <span className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
                <Icon name={service.icon} className="w-7 h-7 text-white" />
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold font-display mb-3">{service.title}</h1>
              <p className="text-white/80 text-lg max-w-xl">{service.tagline}</p>
            </div>

            {/* Image Card Container */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl bg-white/5 border border-white/15 p-2 sm:p-3 backdrop-blur-sm">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-auto object-contain rounded-2xl" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-app grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-display font-bold text-navy-900 mb-4">Overview</h2>
            <p className="text-navy-600 leading-relaxed mb-10">{service.description}</p>

            <h2 className="text-2xl font-display font-bold text-navy-900 mb-5">What's Included</h2>
            <ul className="grid sm:grid-cols-2 gap-4 mb-10">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3 bg-surface rounded-xl p-4">
                  <Icon name="check" className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-navy-800 font-medium">{f}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-display font-bold text-navy-900 mb-5">Our Process</h2>
            <div className="space-y-4">
              {service.process.map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <span className="w-9 h-9 rounded-full brand-gradient-bg text-white flex items-center justify-center font-semibold text-sm shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy-900">{step.title}</h3>
                    <p className="text-sm text-navy-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HIRE US FORM */}
          <div>
            <div className="sticky top-24 bg-white border border-surface-alt rounded-3xl p-7 shadow-lg">
              <h3 className="text-xl font-display font-bold text-navy-900 mb-1">Hire Us for {service.title}</h3>
              <p className="text-sm text-navy-600 mb-6">
                Submit the request — our team will contact you directly to confirm.
              </p>

              {status === "sent" ? (
                <div className="bg-surface rounded-xl p-6 text-center">
                  <Icon name="check" className="w-8 h-8 text-brand-500 mx-auto mb-3" />
                  <p className="font-semibold text-navy-900">Request Received!</p>
                  <p className="text-sm text-navy-600 mt-1">
                    Our team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-1.5">Full Name</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
                      placeholder="Your name"
                    />
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
                    <label className="block text-sm font-medium text-navy-800 mb-1.5">
                      Project Details <span className="text-navy-400">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
                      placeholder="Briefly describe what you need..."
                    />
                  </div>
                  <Button type="submit" variant="gradient" className="w-full" disabled={status === "sending"}>
                    {status === "sending" ? "Submitting..." : "Submit Request"}
                  </Button>
                  {status === "error" && (
                    <p className="text-xs text-red-500 text-center">
                      Something went wrong, please try again or contact us directly.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}