import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-navy-900 text-white hover:bg-navy-800 shadow-lg shadow-navy-900/20",
  gradient:
    "brand-gradient-bg text-white shadow-lg shadow-brand-500/30 hover:brightness-110",
  outline:
    "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white",
  ghost: "text-navy-900 hover:bg-surface",
  white: "bg-white text-navy-900 hover:bg-surface shadow-lg",
};

export default function Button({
  as = "button",
  to,
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const cls = `focus-ring inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] ${variants[variant]} ${className}`;

  if (as === "link" && to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    );
  }
  if (as === "a" && href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
