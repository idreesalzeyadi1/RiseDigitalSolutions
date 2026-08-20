import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { services } from "../../data/siteData";
import Icon from "../ui/Icons";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Academy", to: "/academy" },
  { label: "Internships", to: "/internships" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { currentUser, profile } = useAuth();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dashboardPath =
    profile?.role === "intern" ? "/intern/dashboard" : "/student/dashboard";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <nav className="container-app flex items-center justify-between h-18 py-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/assets/logo-horizontal.png"
            alt="RiseDigital Solutions"
            className="h-10 sm:h-11 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                isActive ? "text-brand-500" : "text-navy-900 hover:text-brand-500"
              }`
            }
          >
            Home
          </NavLink>

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="px-4 py-2 rounded-full text-sm font-semibold text-navy-900 hover:text-brand-500 flex items-center gap-1 focus-ring">
              Services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 pt-2 w-64">
                <div className="bg-white rounded-2xl shadow-xl border border-surface-alt p-2 animate-fade-up">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface transition-colors"
                    >
                      <span className="w-9 h-9 rounded-lg brand-gradient-bg text-white flex items-center justify-center shrink-0">
                        <Icon name={s.icon} className="w-4.5 h-4.5" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-navy-900">{s.title}</span>
                        <span className="block text-xs text-navy-600">{s.tagline}</span>
                      </span>
                    </Link>
                  ))}
                  <Link
                    to="/services"
                    className="block text-center text-sm font-semibold text-brand-500 py-2 mt-1 border-t border-surface-alt"
                  >
                    View all services
                  </Link>
                </div>
              </div>
            )}
          </div>

          {navLinks.slice(1).map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  isActive ? "text-brand-500" : "text-navy-900 hover:text-brand-500"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {currentUser ? (
            <Button as="link" to={dashboardPath} variant="outline" className="!px-5 !py-2.5 !text-sm">
              Dashboard
            </Button>
          ) : (
            <Button as="link" to="/login" variant="ghost" className="!px-4 !py-2.5 !text-sm">
              Login
            </Button>
          )}
          <Button as="link" to="/contact" variant="gradient" className="!px-5 !py-2.5 !text-sm">
            Get a Quote
          </Button>
        </div>

        <button
          className="lg:hidden p-2 text-navy-900 focus-ring rounded-lg"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <Icon name={open ? "close" : "menu"} className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-surface-alt bg-white">
          <div className="container-app py-4 flex flex-col gap-1">
            <Link to="/" className="px-3 py-2.5 rounded-lg font-semibold text-navy-900 hover:bg-surface">
              Home
            </Link>
            <span className="px-3 pt-3 pb-1 text-xs font-bold uppercase tracking-wide text-navy-600">
              Services
            </span>
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="px-3 py-2 rounded-lg text-navy-900 hover:bg-surface text-sm"
              >
                {s.title}
              </Link>
            ))}
            <div className="h-px bg-surface-alt my-2" />
            {navLinks.slice(1).map((l) => (
              <Link key={l.to} to={l.to} className="px-3 py-2.5 rounded-lg font-semibold text-navy-900 hover:bg-surface">
                {l.label}
              </Link>
            ))}
            <div className="h-px bg-surface-alt my-2" />
            {currentUser ? (
              <Button as="link" to={dashboardPath} variant="outline" className="w-full">
                Dashboard
              </Button>
            ) : (
              <Button as="link" to="/login" variant="outline" className="w-full">
                Login
              </Button>
            )}
            <Button as="link" to="/contact" variant="gradient" className="w-full">
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
