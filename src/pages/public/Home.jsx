import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import Icon from "../../components/ui/Icons";
import {
  services,
  stats,
  whyChooseUs,
  testimonials,
  courses,
  howItWorksInternship,
  internshipTracks,
} from "../../data/siteData";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white pt-14 pb-20 sm:pt-20 sm:pb-28">
        <div className="container-app grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold font-display leading-[1.1] text-navy-900 mb-2">
              Build Your Brand.
              <br />
              Grow Online.
              <br />
              <span className="brand-gradient-text">Rise With Us.</span>
            </h1>
            <p className="text-navy-600 text-lg leading-relaxed mt-5 mb-8 max-w-lg">
              Stop settling for average. Get websites, apps, SEO, and marketing from RiseDigital
              Solutions — plus build your own career through our Academy and Internship
              program.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button as="link" to="/services" variant="gradient">
                Explore Services <Icon name="arrowRight" className="w-4 h-4" />
              </Button>
              <Button as="link" to="/contact" variant="outline">
                Get a Free Quote
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-sm text-navy-600">
              <span className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-brand-500" /> No Hidden Costs</span>
              <span className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-brand-500" /> On-Time Delivery</span>
            </div>
          </div>

          {/* Image side - full composed graphic (blob + person + floating stat cards) */}
          <div className="relative hidden lg:block">
            <img
              src="/assets/hero-full.png"
              alt="RiseDigital Solutions - Build Skills, Get Experience, Land Your Job"
              className="w-full h-auto object-contain animate-float"
            />
          </div>
        </div>
      </section>

      {/* SERVICES - main focus */}
      <section className="py-20 sm:py-24">
        <div className="container-app">
          <SectionHeading
            eyebrow="What We Do"
            title="Services Built to Grow Your Business"
            desc="From idea to launch — our team handles every digital need."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div
                key={s.slug}
                className="group bg-white rounded-2xl border border-surface-alt overflow-hidden hover:shadow-2xl hover:shadow-navy-900/10 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="h-36 overflow-hidden relative">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-navy-950/0 to-navy-950/0" />
                  <span className="absolute bottom-3 left-3 w-10 h-10 rounded-xl brand-gradient-bg text-white flex items-center justify-center shadow-lg">
                    <Icon name={s.icon} className="w-5 h-5" />
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-semibold text-lg text-navy-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-navy-600 leading-relaxed mb-5 flex-1">{s.tagline}</p>
                  <Button
                    as="link"
                    to={`/services/${s.slug}`}
                    variant="outline"
                    className="w-full !py-2.5 !text-sm group-hover:!bg-navy-900 group-hover:!text-white group-hover:!border-navy-900"
                  >
                    Learn more <Icon name="arrowRight" className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNSHIP TRACKS - same card design as Services */}
      <section className="py-20 sm:py-24 bg-surface">
        <div className="container-app">
          <SectionHeading
            eyebrow="Internships"
            title="Kickstart Your Career With Real Experience"
            desc="Choose a domain and learn practical skills through a remote internship."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {internshipTracks.map((t) => (
              <div
                key={t.slug}
                className="group bg-white rounded-2xl border border-surface-alt overflow-hidden hover:shadow-2xl hover:shadow-navy-900/10 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="h-36 overflow-hidden relative">
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={t.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full brand-gradient-bg group-hover:scale-110 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-navy-950/0 to-navy-950/0" />
                  <span className="absolute bottom-3 left-3 w-10 h-10 rounded-xl brand-gradient-bg text-white flex items-center justify-center shadow-lg">
                    <Icon name={t.icon} className="w-5 h-5" />
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-semibold text-lg text-navy-900 mb-2">{t.title}</h3>
                  <p className="text-sm text-navy-600 leading-relaxed mb-5 flex-1">{t.tagline}</p>
                  <div className="flex gap-2">
                    <Button
                      as="link"
                      to="/internships/apply"
                      variant="gradient"
                      className="flex-1 !px-3 !py-2.5 !text-sm"
                    >
                      Apply Now
                    </Button>
                    <Button
                      as="link"
                      to="/internships"
                      variant="outline"
                      className="flex-1 !px-3 !py-2.5 !text-sm"
                    >
                      See Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 sm:py-24 bg-surface">
        <div className="container-app">
          <SectionHeading eyebrow="Why RiseDigital" title="Why Businesses Choose Us" />
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

      {/* STATS */}
      <section className="py-16 bg-navy-950 text-white">
        <div className="container-app grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl sm:text-4xl font-bold font-display brand-gradient-text bg-gradient-to-r from-brand-200 to-brand-400 bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="text-sm text-white/60 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ACADEMY TEASER */}
      <section className="py-20 sm:py-24">
        <div className="container-app grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-brand-500 font-bold text-xs uppercase tracking-widest mb-3">
              <Icon name="book" className="w-4 h-4" /> RiseDigital Academy
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-navy-900 mb-4">
              Learn In-Demand Skills, At Your Own Pace
            </h2>
            <p className="text-navy-600 leading-relaxed mb-6">
              From web development to digital marketing, practical online courses that make
              you job-ready — with a completion certificate.
            </p>
            <Button as="link" to="/academy" variant="gradient">
              Browse Courses <Icon name="arrowRight" className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {courses.slice(0, 4).map((c) => (
              <Link
                key={c.id}
                to={`/academy/${c.id}`}
                className="group bg-white border-2 border-surface-alt rounded-2xl p-5 hover:border-brand-400 hover:shadow-lg transition-all duration-300"
              >
                <span className="text-xs font-bold text-brand-600 bg-brand-500/10 px-2.5 py-1 rounded-full uppercase tracking-wide">
                  {c.category}
                </span>
                <h4 className="font-display font-semibold text-navy-900 mt-3 mb-2 text-sm group-hover:text-brand-600 transition-colors">
                  {c.title}
                </h4>
                <div className="flex items-center justify-between text-xs border-t border-surface-alt pt-3 mt-1">
                  <span className="inline-flex items-center gap-1 text-navy-500">
                    <Icon name="clock" className="w-3.5 h-3.5 text-brand-500" /> {c.duration}
                  </span>
                  <span className="font-bold text-navy-900">{c.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNSHIP TEASER */}
      <section className="py-20 sm:py-24 bg-surface">
        <div className="container-app">
          <SectionHeading
            eyebrow="Remote Internships"
            title="Start Fast. Learn Smart. Get Certified."
            desc="Choose a domain, apply, perform real tasks, and earn a verified certificate."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {howItWorksInternship.map((step, i) => (
              <div key={step.title} className="bg-white rounded-2xl p-6 relative">
                <span className="text-4xl font-bold font-display text-surface-alt absolute top-4 right-5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display font-semibold text-navy-900 mb-2 relative">{step.title}</h3>
                <p className="text-sm text-navy-600 leading-relaxed relative">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button as="link" to="/internships/apply" variant="primary">
              Apply for Internship <Icon name="arrowRight" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-24">
        <div className="container-app">
          <SectionHeading eyebrow="Testimonials" title="What People Say About Us" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white border border-surface-alt rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Icon key={i} name="star" className="w-4 h-4 text-brand-400" />
                  ))}
                </div>
                <p className="text-sm text-navy-700 leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-semibold text-navy-900 text-sm">{t.name}</p>
                <p className="text-xs text-navy-600">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16">
        <div className="container-app">
          <div className="brand-gradient-bg rounded-3xl px-8 py-14 sm:py-16 text-center text-white relative overflow-hidden">
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4 relative">
              Ready to Grow Your Business?
            </h2>
            <p className="text-white/75 max-w-xl mx-auto mb-8 relative">
              Get in touch with us today and take your project to the next level.
            </p>
            <Button as="link" to="/contact" variant="white" className="relative">
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
