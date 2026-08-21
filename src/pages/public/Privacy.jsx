import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="bg-surface py-16 sm:py-20">
      <div className="container-app max-w-4xl bg-white border border-surface-alt rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 text-navy-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-500">Data Protection</span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 mt-2">Privacy Policy</h1>
          <p className="text-xs text-navy-500 mt-1">Last Updated: August 2026</p>
        </div>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-navy-600">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-navy-900 font-display">1. Information We Collect</h2>
            <p>
              We collect information that you directly provide to us when filling out our contact form, applying for an internship, or requesting client service estimates. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Personal details (Name, Email Address, Phone Number)</li>
              <li>Project specs, messages, and uploaded documents or CVs</li>
              <li>Technical usage data collected standardly by Firebase backend and hosting services</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-navy-900 font-display">2. How We Use Your Data</h2>
            <p>Your information is strictly used for:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Responding to project inquiries and communication</li>
              <li>Evaluating candidate applications for internships and training tracks</li>
              <li>Improving web application performance and client support</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-navy-900 font-display">3. Data Sharing & Security</h2>
            <p>
              RiseDigital Solutions does <strong>not</strong> sell, rent, or lease your personal information to third parties. All messages sent via our site are securely stored in our cloud backend with restricted administrative access.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-navy-900 font-display">4. Cookies & Analytics</h2>
            <p>
              We may use essential session cookies and lightweight analytics tools to analyze site traffic and improve visitor navigation experience.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-navy-900 font-display">5. Contact Information</h2>
            <p>
              If you have any questions or data requests, please reach out directly to{" "}
              <a href="mailto:risedigitalsolutions@gmail.com" className="text-brand-500 font-medium hover:underline">
                risedigitalsolutions@gmail.com
              </a>.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-surface-alt flex justify-between items-center text-xs">
          <Link to="/" className="text-brand-500 font-semibold hover:underline">← Back to Home</Link>
          <Link to="/terms" className="text-navy-500 hover:text-navy-900">View Terms of Use →</Link>
        </div>
      </div>
    </div>
  );
}