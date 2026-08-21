import SectionHeading from "../../components/ui/SectionHeading";
import Icon from "../../components/ui/Icons";
import Button from "../../components/ui/Button";
import { stats, whyChooseUs } from "../../data/siteData";

const coursesList = [
  {
    title: "Full-Stack Web Development",
    desc: "Master modern web development using React, Next.js, Node.js, and Firebase with real-world project deployment.",
    badge: "Popular",
  },
  {
    title: "UI/UX & Product Design",
    desc: "Learn wireframing, prototyping, and responsive layout systems using Figma and modern Tailwind styling.",
    badge: "Design",
  },
  {
    title: "Digital Marketing & Brand Strategy",
    desc: "SEO optimization, social media marketing, content design, and digital campaign execution.",
    badge: "Growth",
  },
  {
    title: "AI Tools & Automation",
    desc: "Leverage generative AI APIs and automation frameworks to accelerate software workflow.",
    badge: "New",
  },
];

const internshipPerks = [
  "100% Free - No Hidden Fees",
  "Work on Live Client Projects",
  "Mentorship from Lead Developers",
  "Verified Experience Certificate",
  "Flexible Remote Schedule",
  "Job Referral & Recommendation",
];

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="brand-gradient-bg text-white py-16 sm:py-24">
        <div className="container-app text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-200">
            About RiseDigital Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mt-3 mb-4 max-w-3xl mx-auto leading-tight">
            Empowering Businesses & Mentoring Next-Gen Tech Talent
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-base sm:text-lg">
            We are a hybrid digital agency and tech academy delivering modern software solutions to clients worldwide while training passionate developers through hands-on internships.
          </p>
        </div>
      </section>

      {/* Mission & Dual Focus Section */}
      <section className="py-16 sm:py-20">
        <div className="container-app grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow="Our Core Mission" title="Bridging the Gap Between Learning & Industry" center={false} />
            <p className="text-navy-600 leading-relaxed mb-4">
              At RiseDigital Solutions, we believe that academic learning should immediately translate into practical industry capability. 
            </p>
            <p className="text-navy-600 leading-relaxed mb-6">
              Our dual model powers business growth for our partners through custom web engineering and branding, while creating direct opportunities for students to gain verified work experience.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="p-4 rounded-2xl bg-surface border border-surface-alt flex-1 min-w-[200px]">
                <p className="font-bold text-navy-900 text-lg">Digital Agency</p>
                <p className="text-xs text-navy-600 mt-1">High-performance apps, sites & digital marketing for growing businesses.</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface border border-surface-alt flex-1 min-w-[200px]">
                <p className="font-bold text-navy-900 text-lg">Tech Academy</p>
                <p className="text-xs text-navy-600 mt-1">Practical skill development and mentorship on production codebases.</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface rounded-2xl p-6 text-center border border-surface-alt shadow-2xs">
                <p className="text-3xl sm:text-4xl font-bold font-display text-brand-500">{s.value}</p>
                <p className="text-sm font-medium text-navy-700 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Internship Program Section */}
      <section className="py-16 sm:py-20 bg-navy-900 text-white relative overflow-hidden">
        <div className="container-app relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
              Community & Skill Building
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display mt-2">
              Our 100% Free Internship Program
            </h2>
            <p className="text-navy-200 mt-3 text-sm sm:text-base leading-relaxed">
              We provide ambitious developers, designers, and marketers with real industry exposure without charging any tuition fees.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {internshipPerks.map((perk, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-navy-800/60 border border-navy-700">
                <span className="w-8 h-8 rounded-lg brand-gradient-bg text-white flex items-center justify-center shrink-0 font-bold text-sm">
                  ✓
                </span>
                <span className="text-sm font-medium text-navy-100">{perk}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="mailto:risedigitalsolutions@gmail.com?subject=Free%20Internship%20Inquiry"
              className="inline-block brand-gradient-bg text-white font-semibold text-sm px-8 py-3.5 rounded-xl hover:opacity-95 transition-opacity shadow-lg"
            >
              Apply For Next Internship Batch
            </a>
          </div>
        </div>
      </section>

      {/* Academy & Courses Section */}
      <section className="py-16 sm:py-20 bg-surface">
        <div className="container-app">
          <SectionHeading 
            eyebrow="Academy Track" 
            title="Practical Skill Courses We Offer" 
            subtitle="Designed to prepare candidates for active software development roles."
          />

          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {coursesList.map((course, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-surface-alt shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-50 text-brand-500 uppercase tracking-wider">
                      {course.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-navy-900 text-lg mb-2">{course.title}</h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{course.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20">
        <div className="container-app">
          <SectionHeading eyebrow="Our Core Values" title="What Drives Our Quality" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {whyChooseUs.map((w) => (
              <div key={w.title} className="bg-surface rounded-2xl p-6 text-center border border-surface-alt">
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