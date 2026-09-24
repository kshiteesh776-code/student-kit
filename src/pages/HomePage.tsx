import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';
import { TOOLS } from '../config/tools';
import { ToolCard } from '../components/common/ToolCard';
import { SEOHead } from '../components/common/SEOHead';
import { NextExamCard } from '../components/common/NextExamCard';

export const HomePage: React.FC = () => {
  return (
    <div className="main-content">
      <SEOHead
        title="StudentKit — Free Tools Students Actually Need"
        description="Calculate your CGPA, SGPA, attendance, marks needed, percentage, countdown exams and plan study tasks in seconds. Free, simple, fast academic tools for students."
        canonical="https://studentkit.dev/"
      />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">
            Student<span className="highlight">Kit</span>
          </h1>

          <p className="hero-tagline">
            "Free tools students actually need."
          </p>

          <p className="hero-supporting">
            Calculate your grades, attendance, marks and study goals in seconds.
          </p>

          <div className="hero-actions">
            <a href="#tools-section" className="btn btn-primary btn-lg">
              Explore Student Tools <ArrowRight size={18} />
            </a>
            <Link to="/student/cgpa-calculator" className="btn btn-secondary btn-lg">
              Calculate Your CGPA
            </Link>
          </div>
        </div>
      </section>

      {/* NEAREST UPCOMING EXAM BANNER */}
      <NextExamCard />

      {/* TOOLS SECTION */}
      <section id="tools-section" className="container" style={{ padding: '20px 20px 60px' }}>
        <div className="section-header">
          <div className="section-tag">Academic Toolkit</div>
          <h2 className="section-title">Student Tools</h2>
          <p className="section-subtitle">
            Everything you need for everyday academic calculations and planning.
          </p>
        </div>

        <div className="tools-grid">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* WHY STUDENTKIT SECTION */}
      <section className="why-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Built for Students</div>
            <h2 className="section-title">Why Use StudentKit?</h2>
            <p className="section-subtitle">
              Designed to be blazing fast, private, and straightforward with zero clutter.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <Zap size={22} />
              </div>
              <h3 className="benefit-title">Fast</h3>
              <p className="benefit-desc">
                Get answers without complicated forms. Instant calculations computed client-side in your browser.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <ShieldCheck size={22} />
              </div>
              <h3 className="benefit-title">Free</h3>
              <p className="benefit-desc">
                All StudentKit tools are free to use. No subscription tiers, no paywalls, and no hidden fees.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <Layers size={22} />
              </div>
              <h3 className="benefit-title">Simple</h3>
              <p className="benefit-desc">
                No account required for the core tools. Open any calculator and get accurate results immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '14px' }}>
              Ready to make studying a little easier?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto 28px' }}>
              Access all 8 student calculators and planning tools now. No registration required.
            </p>
            <a href="#tools-section" className="btn btn-primary btn-lg">
              Explore Student Tools <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
