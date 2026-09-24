import React from 'react';
import { TOOLS } from '../../config/tools';
import { ToolCard } from './ToolCard';
import { LayoutGrid } from 'lucide-react';

interface RelatedToolsProps {
  currentToolId: string;
  limit?: number;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ currentToolId, limit = 3 }) => {
  const otherTools = TOOLS.filter((t) => t.id !== currentToolId).slice(0, limit);

  return (
    <section className="tool-content-section" style={{ background: '#FFFFFF' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <LayoutGrid size={20} color="var(--text-primary)" />
        <h2 className="content-h2" style={{ margin: 0 }}>Related Student Tools</h2>
      </div>
      <p className="content-p" style={{ marginBottom: '24px' }}>
        Explore more essential utilities to keep your academic targets and schedules on track:
      </p>

      <div className="tools-grid" style={{ marginBottom: 0 }}>
        {otherTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
};
