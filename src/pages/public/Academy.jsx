import { Link } from "react-router-dom";
import SectionHeading from "../../components/ui/SectionHeading";
import Icon from "../../components/ui/Icons";
import { courses } from "../../data/siteData";

// Direct Assets Import
import websiteImg from "../../assets/web.jpg";
import appImg from "../../assets/app.jpg";
import seo1Img from "../../assets/seo.jpg";
import digitalmarketing1Img from "../../assets/digitalmarketing.jpg";
import uiUxImg from "../../assets/ui.jpg";

// Course ID to Image Mapping
const courseImageMap = {
  "web-dev-bootcamp": websiteImg,
  "digital-marketing-mastery": digitalmarketing1Img,
  "seo-fundamentals": seo1Img,
  "ui-ux-design": uiUxImg,
};

export default function Academy() {
  return (
    <div>
      <section className="brand-gradient-bg text-white py-16 sm:py-20">
        <div className="container-app text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-200">
            RiseDigital Academy
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mt-3 mb-4">
            Learn Skills That Actually Get You Hired
          </h1>
          <p className="text-white/75 max-w-xl mx-auto">
            Practical, project-based online courses — self-paced, with a completion certificate.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-app">
          <SectionHeading eyebrow="Courses" title="Explore Our Courses" center={false} />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c) => {
              // Fallback to courseImageMap if c.image is undefined
              const imageSrc = c.image || courseImageMap[c.id];

              return (
                <Link
                  key={c.id}
                  to={`/academy/${c.id}`}
                  className="group relative bg-white border-2 border-surface-alt rounded-2xl overflow-hidden hover:border-brand-400 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Course Image Banner */}
                  <div className="h-44 overflow-hidden relative w-full bg-navy-950">
                    <img
                      src={imageSrc}
                      alt={c.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-block text-xs font-bold text-brand-600 bg-brand-500/10 px-3 py-1 rounded-full uppercase tracking-wide">
                        {c.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-navy-500 bg-surface px-2.5 py-1 rounded-full">
                        <Icon name="layers" className="w-3.5 h-3.5" /> {c.level}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-navy-900 mb-2 group-hover:text-brand-600 transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-sm text-navy-600 leading-relaxed mb-5 line-clamp-2 flex-1">
                      {c.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-surface-alt pt-4 mb-4 mt-auto">
                      <span className="inline-flex items-center gap-1.5 text-sm text-navy-600">
                        <Icon name="clock" className="w-4 h-4 text-brand-500" /> {c.duration}
                      </span>
                      <span className="text-lg font-bold font-display text-navy-900">
                        {c.price}
                      </span>
                    </div>

                    <span className="inline-flex items-center justify-center gap-1.5 w-full rounded-full border-2 border-navy-900 text-navy-900 font-semibold text-sm py-2 group-hover:bg-navy-900 group-hover:text-white transition-colors">
                      View Course <Icon name="arrowRight" className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}