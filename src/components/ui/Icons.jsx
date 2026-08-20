// Lightweight inline SVG icons - no extra dependency needed.
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
};

export const iconMap = {
  code: (props) => (
    <svg {...base} {...props}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
  ),
  smartphone: (props) => (
    <svg {...base} {...props}><rect x="6" y="2" width="12" height="20" rx="2" /><line x1="11" y1="18" x2="13" y2="18" /></svg>
  ),
  search: (props) => (
    <svg {...base} {...props}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
  ),
  megaphone: (props) => (
    <svg {...base} {...props}><path d="M3 11l18-5v12L3 13v-2z" /><path d="M7 13v5a2 2 0 0 0 2 2h1v-6" /></svg>
  ),
  check: (props) => (
    <svg {...base} {...props}><polyline points="20 6 9 17 4 12" /></svg>
  ),
  arrowRight: (props) => (
    <svg {...base} {...props}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
  ),
  star: (props) => (
    <svg {...{ ...base, fill: "currentColor", stroke: "none" }} {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
  ),
  menu: (props) => (
    <svg {...base} {...props}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
  ),
  close: (props) => (
    <svg {...base} {...props}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
  ),
  download: (props) => (
    <svg {...base} {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
  ),
  users: (props) => (
    <svg {...base} {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  ),
  briefcase: (props) => (
    <svg {...base} {...props}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
  ),
  book: (props) => (
    <svg {...base} {...props}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
  ),
  award: (props) => (
    <svg {...base} {...props}><circle cx="12" cy="8" r="6" /><path d="M15.5 13.5L17 22l-5-3-5 3 1.5-8.5" /></svg>
  ),
  clock: (props) => (
    <svg {...base} {...props}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" /></svg>
  ),
  layers: (props) => (
    <svg {...base} {...props}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
  ),
  edit: (props) => (
    <svg {...base} {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
  ),
};

export default function Icon({ name, className = "w-6 h-6" }) {
  const Cmp = iconMap[name];
  if (!Cmp) return null;
  return <Cmp className={className} />;
}
