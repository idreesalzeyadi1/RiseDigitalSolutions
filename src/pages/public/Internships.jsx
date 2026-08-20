import { useSearchParams, Link } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";

import Icon from "../../components/ui/Icons";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import FaqAccordion from "../../components/ui/FaqAccordion";
import {
  internshipTracks,
  howItWorksInternship,
  internshipHighlights,
  internshipStats,
  internshipFaqs,
} from "../../data/siteData";

export default function Internships() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
        <div className="container-app grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-brand-500/10 text-brand-600 rounded-full px-4 py-1.5 text-xs font-bold mb-6">
              <span className="bg-brand-500 text-white text-[10px] px-2 py-0.5 rounded-full">Trending</span>
              Explore Internship Opportunities
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold font-display leading-tight text-navy-900 mb-2">
              Build Skills.
              <br />
              Get Experience.
              <br />
              <span className="brand-gradient-text">Land Your Job.</span>
            </h1>
            <p className="text-navy-600 text-lg leading-relaxed mt-5 mb-8 max-w-md">
              Stop waiting for opportunities. Kickstart your dream tech career with RiseDigital
              Internships — remote, with real projects.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button as="link" to="/internships/apply" variant="gradient">
                Apply Now <Icon name="arrowRight" className="w-4 h-4" />
              </Button>
              <Button as="a" href="#how-it-works" variant="outline">
                How It Works
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-navy-600">
              <span className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-brand-500" /> No Experience Required
              </span>
              <span className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-brand-500" /> Industry-Ready Projects
              </span>
            </div>
          </div>

          {/* Floating highlight cards */}
          <div className="relative hidden lg:grid grid-cols-2 gap-4">
            {internshipHighlights.map((h, i) => (
              <div
                key={h.title}
                className={`rounded-2xl p-5 shadow-lg animate-float ${
                  i === 1
                    ? "bg-navy-950 text-white"
                    : i === 2
                    ? "brand-gradient-bg text-white"
                    : "bg-white border border-surface-alt text-navy-900"
                } ${i % 2 === 1 ? "mt-8" : ""}`}
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <span
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                    i === 1 || i === 2 ? "bg-white/15" : "bg-brand-500/10 text-brand-500"
                  }`}
                >
                  <Icon name={h.icon} className="w-4.5 h-4.5" />
                </span>
                <h3 className="font-display font-semibold text-sm mb-1">{h.title}</h3>
                <p className={`text-xs leading-relaxed ${i === 1 || i === 2 ? "text-white/70" : "text-navy-600"}`}>
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-surface py-10">
        <div className="container-app grid grid-cols-3 gap-6 text-center">
          {internshipStats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl sm:text-4xl font-bold font-display text-navy-900">{s.value}</p>
              <p className="text-xs sm:text-sm text-navy-600 uppercase tracking-wide mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERNSHIP TRACKS */}
      <section className="py-16 sm:py-24">
        <div className="container-app">
          <SectionHeading
            eyebrow="Domains"
            title={<>Explore Our <span className="brand-gradient-text">Internship Tracks</span></>}
            desc="Choose from 10+ in-demand tech tracks and start building real-world skills today."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {internshipTracks.map((track) => (
              <div
                key={track.slug}
                className="bg-white border border-surface-alt rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <Link to={`/internships/${track.slug}`} className="block relative h-48 overflow-hidden bg-navy-950">
                  <img
                    src={track.image}
                    alt={track.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                </Link>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <Link to={`/internships/${track.slug}`}>
                      <h3 className="font-display font-bold text-lg text-navy-900 mb-1.5 group-hover:text-brand-600 transition-colors">
                        {track.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-navy-600 leading-relaxed mb-5 line-clamp-2">
                      {track.tagline}
                    </p>
                  </div>

                  <Button
                    as="link"
                    to={`/internships/apply?domain=${encodeURIComponent(track.title)}`}
                    className="w-full !py-2.5 !text-sm !bg-emerald-600 hover:!bg-emerald-700 !text-white !rounded-xl text-center font-medium shadow-sm transition-colors"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-surface scroll-mt-20">
        <div className="container-app max-w-3xl">
          <SectionHeading
            eyebrow="Process"
            title="How It Works"
            desc="Your path to an industry-ready career, in just 4 simple steps."
          />
          <div className="space-y-4">
            {howItWorksInternship.map((step, i) => (
              <div key={step.title} className="bg-white rounded-2xl p-6 flex items-start gap-5 border border-surface-alt">
                <span className="w-10 h-10 rounded-full brand-gradient-bg text-white flex items-center justify-center font-bold shrink-0">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-navy-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24">
        <div className="container-app max-w-2xl">
          <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" desc="Everything you need to know about the internship program." />
          <FaqAccordion items={internshipFaqs.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="pb-16 sm:pb-24">
        <div className="container-app">
          <div className="bg-navy-950 rounded-3xl px-8 py-14 sm:py-16 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full brand-gradient-bg opacity-20 blur-3xl" />
            <div className="relative max-w-lg">
              <span className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-300 rounded-full px-4 py-1.5 text-xs font-bold mb-5">
                <span className="bg-brand-500 text-white text-[10px] px-2 py-0.5 rounded-full">Trending</span>
                Explore Internship Opportunities
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
                Unlock New Opportunities With RiseDigital Internships.
              </h2>
              <p className="text-white/70 mb-8">
                Take the first step toward a successful career with RiseDigital Solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button as="link" to="/internships/apply" variant="gradient">
                  Get Started Now
                </Button>
                <Button as="link" to="/internships" variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-navy-900">
                  <Icon name="search" className="w-4 h-4" /> Explore Internships
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}