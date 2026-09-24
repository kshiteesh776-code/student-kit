import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Percent, 
  Target, 
  ArrowRightLeft, 
  Clock, 
  CalendarCheck,
  ArrowRight
} from 'lucide-react';
import { ToolConfig } from '../../types';

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap size={22} />,
  Award: <Award size={22} />,
  CheckCircle2: <CheckCircle2 size={22} />,
  Percent: <Percent size={22} />,
  Target: <Target size={22} />,
  ArrowRightLeft: <ArrowRightLeft size={22} />,
  Clock: <Clock size={22} />,
  CalendarCheck: <CalendarCheck size={22} />
};

interface ToolCardProps {
  tool: ToolConfig;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="tool-card">
      <div>
        <div className="tool-card-header">
          <div className="tool-card-icon">
            {iconMap[tool.icon] || <GraduationCap size={22} />}
          </div>
          {tool.badge && <span className="tool-card-badge">{tool.badge}</span>}
        </div>

        <h3 className="tool-card-title">{tool.title}</h3>
        <p className="tool-card-desc">{tool.shortDescription}</p>
      </div>

      <div className="tool-card-footer">
        <Link to={tool.slug} className="tool-card-action" aria-label={`Use ${tool.title}`}>
          <span>Use Tool</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
