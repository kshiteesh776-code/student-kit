import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="tool-page-wrapper">
      <SEOHead
        title="Privacy Policy | StudentKit"
        description="Privacy policy for StudentKit. We respect your privacy: zero user accounts, zero personal data harvesting, and purely client-side utilities."
        canonical="https://studentkit.dev/privacy-policy"
      />

      <div className="container">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        <header className="tool-header">
          <h1 className="tool-h1">Privacy <span className="accent">Policy</span></h1>
          <p className="tool-description">Last Updated: September 2026</p>
        </header>

        <section className="tool-content-section">
          <div className="content-block">
            <h2 className="content-h2">1. Overview &amp; Philosophy</h2>
            <p className="content-p">
              At <strong>StudentKit</strong>, privacy is fundamentally engineered into our architecture. We do not require you to create an account, register your email address, or provide any identifying personal information to use our academic tools.
            </p>
          </div>

          <div className="content-block">
            <h2 className="content-h2">2. Local Storage Usage</h2>
            <p className="content-p">
              For tools that store state between sessions (such as the <em>Exam Countdown</em> and <em>Study Planner</em>), data is stored exclusively in your browser's local storage (<code>localStorage</code>). This data resides solely on your physical device and is never transmitted to or processed on any remote server.
            </p>
          </div>

          <div className="content-block">
            <h2 className="content-h2">3. Calculations &amp; Academic Data</h2>
            <p className="content-p">
              All grade inputs, credit hours, marks, and attendance figures entered into our calculators are processed instantaneously on your client device using JavaScript. None of your grades or attendance numbers are tracked, logged, or stored by us.
            </p>
          </div>

          <div className="content-block">
            <h2 className="content-h2">4. Third-Party Services</h2>
            <p className="content-p">
              StudentKit does not sell, rent, or monetize your data. We do not use intrusive third-party trackers or cross-site fingerprinting scripts.
            </p>
          </div>

          <div className="content-block">
            <h2 className="content-h2">5. Contact</h2>
            <p className="content-p">
              For questions regarding this privacy policy or our open student utility tools, you may contact the StudentKit project team through our official community channels.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
