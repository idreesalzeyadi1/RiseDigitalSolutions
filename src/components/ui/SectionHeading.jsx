export default function SectionHeading({ eyebrow, title, desc, center = true, light = false }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-12`}>
      {eyebrow && (
        <span
          className={`inline-block text-xs font-bold tracking-widest uppercase mb-3 ${
            light ? "text-brand-300" : "text-brand-500"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl font-bold font-display leading-tight ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {desc && (
        <p className={`mt-4 text-base leading-relaxed ${light ? "text-white/70" : "text-navy-600"}`}>
          {desc}
        </p>
      )}
    </div>
  );
}
