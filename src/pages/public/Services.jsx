import { Link } from "react-router-dom";
import SectionHeading from "../../components/ui/SectionHeading";
import Icon from "../../components/ui/Icons";
import Button from "../../components/ui/Button";
import { services } from "../../data/siteData";

export default function Services() {
  return (
    <div>
      <section className="brand-gradient-bg text-white py-16 sm:py-20">
        <div className="container-app text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-200">Our Services</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mt-3 mb-4">
            Everything Your Business Needs, Online
          </h1>
          <p className="text-white/75 max-w-xl mx-auto">
            Web development, app development, SEO, aur digital marketing — end-to-end digital
            services under one roof.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-app grid sm:grid-cols-2 gap-8">
          {services.map((s) => (
            <div key={s.slug} className="group bg-white border border-surface-alt rounded-3xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="h-44 overflow-hidden relative">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
                <span className="absolute bottom-4 left-4 w-12 h-12 rounded-xl brand-gradient-bg text-white flex items-center justify-center shadow-lg">
                  <Icon name={s.icon} className="w-6 h-6" />
                </span>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h2 className="text-2xl font-display font-bold text-navy-900 mb-2">{s.title}</h2>
                <p className="text-navy-600 leading-relaxed mb-5">{s.description}</p>
                <ul className="space-y-2 mb-6">
                  {s.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-navy-700">
                      <Icon name="check" className="w-4 h-4 text-brand-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  as="link"
                  to={`/services/${s.slug}`}
                  variant="outline"
                  className="!px-5 !py-2.5 !text-sm mt-auto group-hover:!bg-navy-900 group-hover:!text-white group-hover:!border-navy-900"
                >
                  View Details <Icon name="arrowRight" className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
