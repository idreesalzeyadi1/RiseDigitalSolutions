import SectionHeading from "../../components/ui/SectionHeading";
import Icon from "../../components/ui/Icons";
import { stats, whyChooseUs } from "../../data/siteData";

export default function About() {
  return (
    <div>
      <section className="brand-gradient-bg text-white py-16 sm:py-20">
        <div className="container-app text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-200">About Us</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mt-3 mb-4">
            Helping Businesses & Talent Rise Together
          </h1>
          <p className="text-white/75 max-w-2xl mx-auto">
            RiseDigital Solutions is a digital services company delivering websites, apps, SEO,
            and marketing — while also running an Academy and Internship program that makes
            new talent industry-ready.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-app grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow="Our Mission" title="Digital Growth for Everyone" center={false} />
            <p className="text-navy-600 leading-relaxed mb-4">
              Our mission is to help businesses build their digital presence, while also giving
              students and job-seekers practical skills and real experience so they can
              confidently start their careers.
            </p>
            <p className="text-navy-600 leading-relaxed">
              Whether you want a website, want to grow your marketing, want to learn a new
              skill, or want to do your first internship — RiseDigital Solutions is with you
              every step of the way.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold font-display text-navy-900">{s.value}</p>
                <p className="text-sm text-navy-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-surface">
        <div className="container-app">
          <SectionHeading eyebrow="Our Values" title="What Drives Us" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((w) => (
              <div key={w.title} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <h3 className="font-display font-semibold text-navy-900 mb-2">{w.title}</h3>
                <p className="text-sm text-navy-600 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
