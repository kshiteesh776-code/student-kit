import React from 'react';
import { CalendarX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon = <CalendarX size={36} color="var(--text-secondary)" />
}) => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '40px 20px',
      background: 'var(--bg-subtle)',
      border: '1px dashed var(--border-card)',
      borderRadius: 'var(--radius-lg)',
      margin: '20px 0'
    }}>
      <div style={{ display: 'inline-flex', marginBottom: '14px' }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{title}</h3>
      <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 20px' }}>
        {description}
      </p>
      {actionText && onAction && (
        <button onClick={onAction} className="btn btn-primary btn-sm">
          {actionText}
        </button>
      )}
    </div>
  );
};
