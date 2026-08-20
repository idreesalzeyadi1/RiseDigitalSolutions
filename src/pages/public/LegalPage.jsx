export default function LegalPage({ title }) {
  return (
    <div className="container-app py-20 max-w-2xl">
      <h1 className="text-3xl font-display font-bold text-navy-900 mb-6">{title}</h1>
      <p className="text-navy-600 leading-relaxed">
        This is a placeholder page. Add your actual {title.toLowerCase()} content here
        jab ready ho.
      </p>
    </div>
  );
}
