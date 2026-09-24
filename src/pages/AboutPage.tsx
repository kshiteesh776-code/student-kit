import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="tool-page-wrapper">
      <SEOHead
        title="About StudentKit — Free Academic Tools for Students"
        description="Learn about StudentKit's mission to provide fast, privacy-friendly, zero-login calculation tools for students worldwide."
        canonical="https://studentkit.dev/about"
      />

      <div className="container">
        <Breadcrumbs items={[{ label: 'About' }]} />

        <header className="tool-header">
          <h1 className="tool-h1">About <span className="accent">StudentKit</span></h1>
          <p className="tool-description">
            Simple, accurate, and free academic tools built for students who want answers without ads, accounts, or complexity.
          </p>
        </header>

        <section className="tool-content-section">
          <div className="content-block">
            <h2 className="content-h2">Our Mission</h2>
            <p className="content-p">
              We built <strong>StudentKit</strong> with one core philosophy: <em>"Free tools students actually need."</em>
            </p>
            <p className="content-p">
              Students shouldn't have to navigate bloated websites, submit their personal emails, or solve captchas just to calculate their semester CGPA or check how many classes they can afford to miss before hitting the 75% attendance threshold. StudentKit brings all 8 essential daily student utilities into one unified, blazing-fast, dark-mode web application.
            </p>
          </div>

          <div className="content-block">
            <h2 className="content-h2">Core Product Guarantees</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', margin: '20px 0' }}>
              <div style={{ background: 'var(--bg-input)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '8px' }}>
                  <ShieldCheck size={20} color="var(--success)" /> 100% No Account Required
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  All calculators and planners execute instantly in your client browser. No signups, no logins, no personal data collection.
                </p>
              </div>

              <div style={{ background: 'var(--bg-input)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '8px' }}>
                  <Zap size={20} color="var(--text-primary)" /> Instant &amp; Client-Side
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  Calculations happen with zero server latency. Local exam countdowns and study tasks persist safely in your browser storage.
                </p>
              </div>

              <div style={{ background: 'var(--bg-input)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '8px' }}>
                  <CheckCircle2 size={20} color="var(--success)" /> Zero AI Clutter
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  No hallucinating chatbots or fake AI features. Pure, mathematically verifiable algorithms and tools.
                </p>
              </div>
            </div>
          </div>

          <div className="content-block">
            <h2 className="content-h2">The 8 Core Student Tools</h2>
            <p className="content-p">
              StudentKit is intentionally focused strictly on 8 academic tools:
            </p>
            <ul style={{ paddingLeft: '24px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><Link to="/student/cgpa-calculator">CGPA Calculator</Link> — Cumulative Grade Point Average calculation</li>
              <li><Link to="/student/sgpa-calculator">SGPA Calculator</Link> — Semester Grade Point Average calculation</li>
              <li><Link to="/student/attendance-calculator">Attendance Calculator</Link> — Percentage, missable classes &amp; recovery targets</li>
              <li><Link to="/student/percentage-calculator">Percentage Calculator</Link> — Exam marks to percentage &amp; target conversions</li>
              <li><Link to="/student/marks-needed-calculator">Marks Needed Calculator</Link> — Required final exam marks for target grades</li>
              <li><Link to="/student/gpa-to-percentage">GPA to Percentage</Link> — 9.5, 10x, and custom multiplier conversions</li>
              <li><Link to="/student/exam-countdown">Exam Countdown</Link> — Live timers for upcoming exam papers</li>
              <li><Link to="/student/study-planner">Study Planner</Link> — Daily tasks, priorities, and study schedules</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};
