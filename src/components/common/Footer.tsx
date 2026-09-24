import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldAlert } from 'lucide-react';
import { TOOLS } from '../../config/tools';

export const Footer: React.FC = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        {/* Academic Disclaimer Box */}
        <div className="footer-disclaimer-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '4px' }}>
            <ShieldAlert size={16} color="var(--text-secondary)" />
            <span>Academic Policy Disclaimer</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.84rem' }}>
            StudentKit provides educational calculation tools for convenience. Results may vary depending on your institution's grading, attendance, or academic policies. Always verify important academic calculations with your institution.
          </p>
        </div>

        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="brand-logo">
              <div className="brand-icon">
                <GraduationCap size={18} />
              </div>
              <span>Student<span className="brand-accent">Kit</span></span>
            </Link>
            <p className="footer-tagline">
              Simple tools for smarter studying. Calculate your grades, attendance, marks and study goals in seconds.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                100% Free • No Login Required • Privacy-First
              </span>
            </div>
          </div>

          {/* 8 Student Tools */}
          <div>
            <div className="footer-heading">Student Tools</div>
            <ul className="footer-links">
              {TOOLS.map((tool) => (
                <li key={tool.id}>
                  <Link to={tool.slug} className="footer-link">
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick & Legal */}
          <div>
            <div className="footer-heading">Information & Legal</div>
            <ul className="footer-links">
              <li>
                <Link to="/about" className="footer-link">About StudentKit</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-use" className="footer-link">Terms of Use</Link>
              </li>
              <li>
                <Link to="/student/cgpa-calculator" className="footer-link">Calculate CGPA</Link>
              </li>
              <li>
                <Link to="/student/attendance-calculator" className="footer-link">Calculate Attendance</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} StudentKit. Free tools students actually need.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Built with precision for students everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
