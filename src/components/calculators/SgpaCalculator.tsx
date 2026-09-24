import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, Calculator, Award, CheckCircle2 } from 'lucide-react';
import { GradeItem } from '../../types';
import { GRADE_OPTIONS } from '../../config/tools';
import { calculateGpa, CgpaResult } from '../../utils/calculations';
import { ErrorMessage } from '../common/ErrorMessage';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';

const initialSemesterSubjects: GradeItem[] = [
  { id: '1', subject: 'Linear Algebra & Calculus', credits: 4, grade: 'A+' },
  { id: '2', subject: 'Engineering Physics', credits: 3, grade: 'A' },
  { id: '3', subject: 'Python Programming Lab', credits: 2, grade: 'A+' },
  { id: '4', subject: 'Basic Electrical Eng', credits: 3, grade: 'B+' },
  { id: '5', subject: 'Professional Communication', credits: 2, grade: 'A' }
];

export const SgpaCalculator: React.FC = () => {
  const [subjects, setSubjects] = useState<GradeItem[]>(initialSemesterSubjects);
  const [result, setResult] = useState<CgpaResult | null>(() => calculateGpa(initialSemesterSubjects));
  const [error, setError] = useState<string | null>(null);

  const addSubject = () => {
    const newId = String(Date.now());
    setSubjects([
      ...subjects,
      { id: newId, subject: `Semester Course ${subjects.length + 1}`, credits: 3, grade: 'A' }
    ]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length <= 1) {
      setError('You must have at least one course to compute your SGPA.');
      return;
    }
    setError(null);
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const updateSubject = (id: string, field: keyof GradeItem, value: any) => {
    setError(null);
    setSubjects(
      subjects.map((s) => {
        if (s.id === id) {
          return { ...s, [field]: value };
        }
        return s;
      })
    );
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    for (let i = 0; i < subjects.length; i++) {
      const s = subjects[i];
      const cr = typeof s.credits === 'number' ? s.credits : parseFloat(s.credits);
      if (isNaN(cr) || cr <= 0) {
        setError(`Please enter valid credit hours greater than 0 for "${s.subject || `Course ${i + 1}`}".`);
        return;
      }
    }

    const calc = calculateGpa(subjects);
    if (calc.totalCredits === 0) {
      setError('Total semester credits must be greater than zero.');
      return;
    }

    setResult(calc);
  };

  const handleReset = () => {
    setSubjects([
      { id: '1', subject: 'Course 1', credits: 4, grade: 'A' },
      { id: '2', subject: 'Course 2', credits: 3, grade: 'A' },
      { id: '3', subject: 'Course 3', credits: 3, grade: 'B+' }
    ]);
    setResult(null);
    setError(null);
  };

  const faqs = [
    {
      question: "What is SGPA and how is it calculated?",
      answer: "SGPA stands for Semester Grade Point Average. It is calculated by multiplying each course credit by the corresponding letter grade point earned, summing them up, and dividing by the total credits registered in that semester."
    },
    {
      question: "How is SGPA converted into CGPA?",
      answer: "CGPA is the weighted average of all semester SGPAs: CGPA = Sum(SGPA_i × SemesterCredits_i) ÷ Sum(SemesterCredits_i). If all semesters have identical credit weights, it is the simple arithmetic mean of your SGPAs."
    },
    {
      question: "Can SGPA be more than 10 or 4?",
      answer: "No. SGPA cannot exceed the maximum scale ceiling (10.0 on a 10-point scale, or 4.0 on a 4-point scale)."
    },
    {
      question: "What if I fail a subject in a semester?",
      answer: "An 'F' grade earns 0 grade points but its credits are still counted in total registered credits (unless your university allows grade replacement after re-examinations), which lowers your SGPA."
    },
    {
      question: "Do university grading systems vary for SGPA?",
      answer: "Yes. Grading systems, passing marks, and grade point scales (such as 10-point, 7-point, or 4-point) vary by university and accreditation body. Always verify with your college academic handbook."
    }
  ];

  return (
    <div>
      {/* MAIN TOOL CARD */}
      <div className="tool-calculator-card">
        <form onSubmit={handleCalculate}>
          <div className="subject-header-labels">
            <div>Course Name / Code</div>
            <div>Credits</div>
            <div>Grade (Points)</div>
            <div>Action</div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            {subjects.map((sub, index) => (
              <div key={sub.id} className="subject-row">
                <div>
                  <input
                    type="text"
                    className="form-input"
                    value={sub.subject}
                    onChange={(e) => updateSubject(sub.id, 'subject', e.target.value)}
                    placeholder={`e.g. Course ${index + 1}`}
                    required
                  />
                </div>

                <div>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="20"
                    className="form-input"
                    value={sub.credits}
                    onChange={(e) => updateSubject(sub.id, 'credits', e.target.value)}
                    placeholder="Credits (e.g. 4)"
                    required
                  />
                </div>

                <div>
                  <select
                    className="form-select"
                    value={sub.grade}
                    onChange={(e) => updateSubject(sub.id, 'grade', e.target.value)}
                  >
                    {GRADE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => removeSubject(sub.id)}
                    className="btn btn-outline btn-sm"
                    title="Remove course"
                    aria-label={`Remove ${sub.subject}`}
                    style={{ padding: '8px 10px' }}
                  >
                    <Trash2 size={16} color="var(--text-secondary)" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <ErrorMessage message={error || ''} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <button
              type="button"
              onClick={addSubject}
              className="btn btn-secondary"
            >
              <Plus size={16} /> Add Course
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-outline"
              >
                <RotateCcw size={16} /> Reset
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                <Calculator size={16} /> Calculate SGPA
              </button>
            </div>
          </div>
        </form>

        {/* RESULT BOX */}
        {result && (
          <div className="result-box">
            <div className="result-main">
              <div>
                <div className="result-label">Semester GPA (SGPA)</div>
                <div className="result-value">{result.cgpa.toFixed(2)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <Award size={20} color="var(--text-primary)" />
                <span>Term Performance Score</span>
              </div>
            </div>

            <div className="result-stats-grid">
              <div className="result-stat-item">
                <div className="result-stat-title">Semester Credits</div>
                <div className="result-stat-val">{result.totalCredits}</div>
              </div>
              <div className="result-stat-item">
                <div className="result-stat-title">Quality Points</div>
                <div className="result-stat-val">{result.totalGradePoints}</div>
              </div>
              <div className="result-stat-item">
                <div className="result-stat-title">Courses Completed</div>
                <div className="result-stat-val">{result.subjectCount}</div>
              </div>
            </div>

            <div className="result-message-badge result-badge-success">
              <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Semester Summary:</strong> You earned <strong>{result.totalGradePoints}</strong> total grade points across <strong>{result.totalCredits}</strong> semester credits for an SGPA of <strong>{result.cgpa.toFixed(2)}</strong>.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO EXPLANATORY CONTENT */}
      <section className="tool-content-section">
        <div className="content-block">
          <h2 className="content-h2">What is SGPA?</h2>
          <p className="content-p">
            <strong>SGPA (Semester Grade Point Average)</strong> represents the weighted grade point average obtained by a student in a single semester or term. It is used in higher education institutions and universities adhering to the Choice Based Credit System (CBCS).
          </p>
          <p className="content-p">
            SGPA provides immediate feedback on your performance during a specific semester and directly determines academic honors, Dean's List placements, scholarships, and your overall cumulative CGPA.
          </p>
        </div>

        <div className="content-block">
          <h2 className="content-h2">How to Calculate SGPA</h2>
          <p className="content-p">
            To calculate SGPA, take the sum of the product of course credits ($C_i$) and the numeric grade point ($G_i$) earned in that course, and divide it by the total credits in the semester ($∑ C_i$):
          </p>

          <div className="formula-card">
            SGPA = ∑ (Grade Point × Credit) / Total Semester Credits
          </div>
        </div>

        <div className="content-block">
          <h2 className="content-h2">SGPA Calculation Example</h2>
          <div className="example-box">
            <p style={{ marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 600 }}>
              Example Semester Grade Sheet:
            </p>
            <ul>
              <li><strong>Calculus:</strong> 4 Credits × Grade A (9) = 36 Points</li>
              <li><strong>Data Structures:</strong> 4 Credits × Grade A+ (10) = 40 Points</li>
              <li><strong>Digital Logic:</strong> 3 Credits × Grade B+ (8) = 24 Points</li>
              <li><strong>Technical Writing:</strong> 2 Credits × Grade A (9) = 18 Points</li>
            </ul>
            <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>
              Total Points = 36 + 40 + 24 + 18 = <strong>118</strong><br />
              Total Credits = 4 + 4 + 3 + 2 = <strong>13</strong><br />
              <strong>SGPA = 118 ÷ 13 = 9.08</strong>
            </p>
          </div>
        </div>

        <div className="content-block">
          <h2 className="content-h2">SGPA vs CGPA</h2>
          <p className="content-p">
            While <strong>SGPA</strong> is isolated to one discrete term, <strong>CGPA</strong> tracks your running cumulative performance across every semester completed to date. At the end of semester 1, your SGPA and CGPA are identical. In subsequent semesters, your CGPA combines all past terms weighted by their respective credit units.
          </p>
          <div className="footer-disclaimer-box" style={{ marginTop: '16px' }}>
            <strong>Institutional Disclaimer:</strong> Grading systems and passing rules vary across universities. Always check your university's official evaluation scheme.
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection faqs={faqs} />

      {/* RELATED TOOLS */}
      <RelatedTools currentToolId="sgpa-calculator" />
    </div>
  );
};
