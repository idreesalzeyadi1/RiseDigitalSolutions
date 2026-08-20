import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Icon from "../ui/Icons";

export default function DashboardLayout({ title, links, children }) {
  const { logout, profile, currentUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen flex bg-surface">
      <aside className="w-64 bg-navy-950 text-white flex-col hidden md:flex">
        <Link to="/" className="p-6 border-b border-white/10">
          <img src="/assets/logo-horizontal.png" alt="RiseDigital" className="h-8 w-auto brightness-0 invert" />
        </Link>
        <nav className="flex-1 p-4 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? "bg-brand-500 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon name={l.icon} className="w-4.5 h-4.5" />
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-white/50 mb-1">Logged in as</p>
          <p className="text-sm font-semibold truncate mb-3">{profile?.name || currentUser?.email}</p>
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm font-medium text-white/70 hover:text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-colors focus-ring"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-surface-alt px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-display font-bold text-navy-900">{title}</h1>
          <button onClick={handleLogout} className="md:hidden text-sm font-medium text-brand-500">
            Logout
          </button>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
