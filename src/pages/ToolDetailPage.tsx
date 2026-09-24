import React from 'react';
import { ToolConfig } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { CgpaCalculator } from '../components/calculators/CgpaCalculator';
import { SgpaCalculator } from '../components/calculators/SgpaCalculator';
import { AttendanceCalculator } from '../components/calculators/AttendanceCalculator';
import { PercentageCalculator } from '../components/calculators/PercentageCalculator';
import { MarksNeededCalculator } from '../components/calculators/MarksNeededCalculator';
import { GpaToPercentageCalculator } from '../components/calculators/GpaToPercentageCalculator';
import { ExamCountdown } from '../components/calculators/ExamCountdown';
import { StudyPlanner } from '../components/calculators/StudyPlanner';

interface ToolDetailPageProps {
  tool: ToolConfig;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({ tool }) => {
  const renderCalculator = () => {
    switch (tool.id) {
      case 'cgpa-calculator':
        return <CgpaCalculator />;
      case 'sgpa-calculator':
        return <SgpaCalculator />;
      case 'attendance-calculator':
        return <AttendanceCalculator />;
      case 'percentage-calculator':
        return <PercentageCalculator />;
      case 'marks-needed-calculator':
        return <MarksNeededCalculator />;
      case 'gpa-to-percentage':
        return <GpaToPercentageCalculator />;
      case 'exam-countdown':
        return <ExamCountdown />;
      case 'study-planner':
        return <StudyPlanner />;
      default:
        return <div>Tool not found.</div>;
    }
  };

  return (
    <div className="tool-page-wrapper">
      <SEOHead
        title={tool.seoTitle}
        description={tool.seoDescription}
        canonical={tool.canonical}
        toolName={tool.title}
      />

      <div className="container">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Student Tools', url: '/#tools-section' },
            { label: tool.title }
          ]}
        />

        {/* Header */}
        <header className="tool-header">
          <h1 className="tool-h1">{tool.h1}</h1>
          <p className="tool-description">{tool.fullDescription}</p>
        </header>

        {/* Dynamic Calculator UI */}
        {renderCalculator()}
      </div>
    </div>
  );
};
