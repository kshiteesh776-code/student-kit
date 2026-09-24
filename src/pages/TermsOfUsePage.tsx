import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { ShieldAlert } from 'lucide-react';

export const TermsOfUsePage: React.FC = () => {
  return (
    <div className="tool-page-wrapper">
      <SEOHead
        title="Terms of Use | StudentKit"
        description="Terms of Use and academic disclaimers for StudentKit tools and utilities."
        canonical="https://studentkit.dev/terms-of-use"
      />

      <div className="container">
        <Breadcrumbs items={[{ label: 'Terms of Use' }]} />

        <header className="tool-header">
          <h1 className="tool-h1">Terms of <span className="accent">Use</span></h1>
          <p className="tool-description">Last Updated: September 2026</p>
        </header>

        <section className="tool-content-section">
          <div className="content-block">
            <h2 className="content-h2">1. Educational Utility Disclaimer</h2>
            <div className="footer-disclaimer-box" style={{ background: 'var(--bg-input)', border: '1px solid var(--border-card)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '6px' }}>
                <ShieldAlert size={18} color="var(--text-secondary)" /> Official Academic Notice
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>
                StudentKit provides educational calculation tools for convenience. Results may vary depending on your institution's grading, attendance, or academic policies. Always verify important academic calculations with your institution.
              </p>
            </div>
            <p className="content-p">
              By accessing and using StudentKit, you acknowledge that calculations, multipliers, and grade projections provided by this website are intended for general planning and personal reference purposes.
            </p>
          </div>

          <div className="content-block">
            <h2 className="content-h2">2. Accuracy of Calculations</h2>
            <p className="content-p">
              While every algorithm on StudentKit is tested against standard mathematical principles and accredited academic guidelines, individual universities frequently implement specific rounding rules, grade condonation thresholds, or non-linear grade scales. You should always consult your college's official examination controller for authoritative grade sheets.
            </p>
          </div>

          <div className="content-block">
            <h2 className="content-h2">3. Free Use &amp; Intellectual Property</h2>
            <p className="content-p">
              StudentKit tools are provided free of charge for students, educators, and the academic community. All interface designs, tool algorithms, and brand assets are the intellectual property of StudentKit.
            </p>
          </div>

          <div className="content-block">
            <h2 className="content-h2">4. Limitation of Liability</h2>
            <p className="content-p">
              In no event shall StudentKit or its contributors be liable for any academic standing decisions, examination debarments, or grade discrepancies resulting from the use or inability to use these tools.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
