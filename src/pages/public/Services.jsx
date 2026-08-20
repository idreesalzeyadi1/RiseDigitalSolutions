import { Link } from "react-router-dom";
import SectionHeading from "../../components/ui/SectionHeading";
import Icon from "../../components/ui/Icons";
import Button from "../../components/ui/Button";
import { services } from "../../data/siteData";

export default function Services() {
  return (
    <div>
      <section className="brand-gradient-bg text-white py-12 sm:py-16">
        <div className="container-app text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-200">Our Services</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-display mt-2 mb-3">
            Everything Your Business Needs, Online
          </h1>
          <p className="text-white/75 text-sm max-w-xl mx-auto">
            Web development, app development, SEO, aur digital marketing — end-to-end digital
            services under one roof.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        {/* Updated Grid to 3 Columns */}
        <div className="container-app grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.slug} className="group bg-white border border-surface-alt rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col">
              {/* Compact Image Header */}
              <div className="h-44 overflow-hidden relative w-full bg-navy-950">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 w-10 h-10 rounded-lg brand-gradient-bg text-white flex items-center justify-center shadow-md z-10">
                  <Icon name={s.icon} className="w-5 h-5" />
                </span>
              </div>

              {/* Compact Card Body */}
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-xl font-display font-bold text-navy-900 mb-1.5">{s.title}</h2>
                <p className="text-xs text-navy-600 leading-relaxed mb-4 line-clamp-2">{s.description}</p>
                
                <ul className="space-y-1.5 mb-5 mt-auto">
                  {s.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-navy-700">
                      <Icon name="check" className="w-3.5 h-3.5 text-brand-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>

                <Button
                  as="link"
                  to={`/services/${s.slug}`}
                  variant="outline"
                  className="!px-4 !py-2 !text-xs mt-auto group-hover:!bg-navy-900 group-hover:!text-white group-hover:!border-navy-900 justify-center"
                >
                  View Details <Icon name="arrowRight" className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}