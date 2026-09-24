import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  Menu, 
  X, 
  ChevronDown, 
  Award, 
  CheckCircle2, 
  Percent, 
  Target, 
  ArrowRightLeft, 
  Clock, 
  CalendarCheck
} from 'lucide-react';
import { TOOLS } from '../../config/tools';

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap size={18} />,
  Award: <Award size={18} />,
  CheckCircle2: <CheckCircle2 size={18} />,
  Percent: <Percent size={18} />,
  Target: <Target size={18} />,
  ArrowRightLeft: <ArrowRightLeft size={18} />,
  Clock: <Clock size={18} />,
  CalendarCheck: <CalendarCheck size={18} />
};

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="container nav-container">
        <Link to="/" className="brand-logo" onClick={closeMobile} aria-label="StudentKit Home">
          <div className="brand-icon">
            <GraduationCap size={20} />
          </div>
          <span>Student<span className="brand-accent">Kit</span></span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li className="nav-dropdown-wrapper">
            <button 
              className={`nav-link ${location.pathname.startsWith('/student') ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Student Tools <ChevronDown size={14} />
            </button>
            <div className="nav-dropdown">
              {TOOLS.map((tool) => (
                <Link 
                  key={tool.id} 
                  to={tool.slug} 
                  className="nav-dropdown-item"
                >
                  <span className="item-icon">{iconMap[tool.icon]}</span>
                  <span>{tool.title}</span>
                </Link>
              ))}
            </div>
          </li>
          <li>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
              About
            </Link>
          </li>
        </ul>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileOpen(!mobileOpen)} 
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="mobile-nav-overlay" onClick={closeMobile}>
          <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <Link to="/" className="brand-logo" onClick={closeMobile}>
                <div className="brand-icon">
                  <GraduationCap size={18} />
                </div>
                <span>Student<span className="brand-accent">Kit</span></span>
              </Link>
              <button 
                className="mobile-menu-btn" 
                onClick={closeMobile}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                onClick={closeMobile}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} 
                onClick={closeMobile}
              >
                About StudentKit
              </Link>
            </div>

            <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                All 8 Student Tools
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {TOOLS.map((tool) => (
                  <Link 
                    key={tool.id} 
                    to={tool.slug} 
                    className="nav-dropdown-item" 
                    onClick={closeMobile}
                    style={{ background: location.pathname === tool.slug ? 'var(--bg-input)' : 'transparent' }}
                  >
                    <span className="item-icon">{iconMap[tool.icon]}</span>
                    <span>{tool.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
              <Link to="/student/cgpa-calculator" className="btn btn-primary btn-block" onClick={closeMobile}>
                Explore Tools
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
