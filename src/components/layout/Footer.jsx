import { Link } from "react-router-dom";
import { services } from "../../data/siteData";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-app py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <img
            src="/assets/logo-horizontal.png"
            alt="RiseDigital Solutions"
            className="h-10 w-auto mb-4 brightness-0 invert opacity-95"
          />
          <p className="text-sm text-white/60 max-w-xs leading-relaxed">
            RiseDigital Solutions - Websites, apps, SEO, and marketing services, plus an online
            academy and remote internships that build careers.
          </p>
          <div className="flex gap-3 mt-5">
            {["facebook", "instagram", "linkedin"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center transition-colors focus-ring"
                aria-label={s}
              >
                <span className="text-xs uppercase">{s[0]}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-sm tracking-wide uppercase text-white/70">
            Services
          </h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="hover:text-brand-300 transition-colors">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-sm tracking-wide uppercase text-white/70">
            Company
          </h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li><Link to="/academy" className="hover:text-brand-300 transition-colors">Academy</Link></li>
            <li><Link to="/internships" className="hover:text-brand-300 transition-colors">Internships</Link></li>
            <li><Link to="/about" className="hover:text-brand-300 transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-brand-300 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-sm tracking-wide uppercase text-white/70">
            Get in Touch
          </h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li>+92 3179779764</li>
            <li>risedigitalsolutions@gmail.com</li>
            <li>Peshawar, Pakistan (Remote)</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-app py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>Copyright &copy; {year} RiseDigital Solutions. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/terms" className="hover:text-white/80">Terms of Use</Link>
            <Link to="/privacy" className="hover:text-white/80">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
