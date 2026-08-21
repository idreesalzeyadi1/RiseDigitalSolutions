import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="bg-surface py-16 sm:py-20">
      <div className="container-app max-w-4xl bg-white border border-surface-alt rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 text-navy-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-500">Legal Agreement</span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 mt-2">Terms of Use</h1>
          <p className="text-xs text-navy-500 mt-1">Last Updated: August 2026</p>
        </div>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-navy-600">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-navy-900 font-display">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the services of <strong>RiseDigital Solutions</strong>, you agree to be bound by these Terms of Use and all applicable laws and regulations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-navy-900 font-display">2. Services & Project Work</h2>
            <p>
              RiseDigital Solutions provides web development, mobile application design, digital marketing, and software consultancy. Specific project timelines, deliverables, and payment structures are governed by individual client agreements or invoices.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-navy-900 font-display">3. Intellectual Property</h2>
            <p>
              All original source code, designs, and content created by RiseDigital Solutions for clients will be transferred upon full payment completion, unless specified otherwise. Brand logos, academy course materials, and website assets remain the exclusive property of RiseDigital Solutions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-navy-900 font-display">4. Academy & Internship Terms</h2>
            <p>
              Internships and academy tracks provided by RiseDigital Solutions are intended for educational and professional skill development. Completion certificates are issued only upon meeting project standards and code reviews.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-navy-900 font-display">5. Limitation of Liability</h2>
            <p>
              RiseDigital Solutions shall not be liable for any indirect, incidental, or consequential damages resulting from third-party server downtime, domain hosting issues, or unauthorized access outside our direct control.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-navy-900 font-display">6. Contact Us</h2>
            <p>
              For questions regarding these Terms, contact us at{" "}
              <a href="mailto:risedigitalsolutions@gmail.com" className="text-brand-500 font-medium hover:underline">
                risedigitalsolutions@gmail.com
              </a>.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-surface-alt flex justify-between items-center text-xs">
          <Link to="/" className="text-brand-500 font-semibold hover:underline">← Back to Home</Link>
          <Link to="/privacy" className="text-navy-500 hover:text-navy-900">View Privacy Policy →</Link>
        </div>
      </div>
    </div>
  );
}