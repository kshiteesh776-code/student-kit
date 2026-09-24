import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { Home } from 'lucide-react';
import { TOOLS } from '../config/tools';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="tool-page-wrapper" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <SEOHead
        title="404 — Page Not Found | StudentKit"
        description="The student tool page you requested does not exist. Explore our 8 core student tools."
        canonical="https://studentkit.dev/404"
      />

      <div className="container" style={{ maxWidth: '600px' }}>
        <div style={{ fontSize: '4rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
          404
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: '14px' }}>Page Not Found</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          The page or tool you are looking for might have moved or is not part of StudentKit's 8 core student tools.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '40px' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} /> Go to Homepage
          </Link>
          <Link to="/student/cgpa-calculator" className="btn btn-secondary">
            Explore Tools
          </Link>
        </div>

        <div style={{ textAlign: 'left', background: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-card)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--text-primary)' }}>
            Direct Links to Student Tools:
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {TOOLS.map((t) => (
              <Link key={t.id} to={t.slug} style={{ fontSize: '0.9rem', color: 'var(--link-color)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                • {t.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
