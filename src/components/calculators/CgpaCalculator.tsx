import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, Calculator, Sparkles, CheckCircle2 } from 'lucide-react';
import { GradeItem } from '../../types';
import { GRADE_OPTIONS } from '../../config/tools';
import { calculateGpa, CgpaResult } from '../../utils/calculations';
import { ErrorMessage } from '../common/ErrorMessage';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';

const initialSubjects: GradeItem[] = [
  { id: '1', subject: 'Data Structures & Algorithms', credits: 4, grade: 'A+' },
  { id: '2', subject: 'Database Management Systems', credits: 4, grade: 'A' },
  { id: '3', subject: 'Computer Networks', credits: 3, grade: 'B+' },
  { id: '4', subject: 'Software Engineering', credits: 3, grade: 'A' },
  { id: '5', subject: 'Discrete Mathematics', credits: 4, grade: 'B' }
];

export const CgpaCalculator: React.FC = () => {
  const [subjects, setSubjects] = useState<GradeItem[]>(initialSubjects);
  const [result, setResult] = useState<CgpaResult | null>(() => calculateGpa(initialSubjects));
  const [error, setError] = useState<string | null>(null);

  const addSubject = () => {
    const newId = String(Date.now());
    setSubjects([
      ...subjects,
      { id: newId, subject: `Subject ${subjects.length + 1}`, credits: 3, grade: 'A' }
    ]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length <= 1) {
      setError('You must have at least one subject to calculate CGPA.');
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

    // Validate
    for (let i = 0; i < subjects.length; i++) {
      const s = subjects[i];
      const cr = typeof s.credits === 'number' ? s.credits : parseFloat(s.credits);
      if (isNaN(cr) || cr <= 0) {
        setError(`Please enter a valid credit number greater than 0 for "${s.subject || `Subject ${i + 1}`}".`);
        return;
      }
    }

    const calc = calculateGpa(subjects);
    if (calc.totalCredits === 0) {
      setError('Total credits must be greater than zero.');
      return;
    }

    setResult(calc);
  };

  const handleReset = () => {
    setSubjects([
      { id: '1', subject: 'Subject 1', credits: 4, grade: 'A' },
      { id: '2', subject: 'Subject 2', credits: 3, grade: 'A' },
      { id: '3', subject: 'Subject 3', credits: 3, grade: 'B+' }
    ]);
    setResult(null);
    setError(null);
  };

  const faqs = [
    {
      question: "How is CGPA calculated?",
      answer: "CGPA is calculated by multiplying each course's grade points by its credit units, summing those weighted values across all semesters, and dividing by the total number of registered credit hours: CGPA = Total Grade Points ÷ Total Credits."
    },
    {
      question: "Can I calculate CGPA with different subject credits?",
      answer: "Yes! StudentKit's CGPA calculator allows different credit weights (such as 1, 2, 3, 4, or 5 credits) for each subject so your lab and lecture hours are accurately weighted."
    },
    {
      question: "Does every university use the same 10-point grading scale?",
      answer: "No. While standard Indian and European universities frequently use a 10-point scale (A+ = 10, A = 9, etc.), US and Canadian universities typically follow a 4.0 scale. Grading policies vary, so always confirm with your academic handbook."
    },
    {
      question: "What is the difference between CGPA and SGPA?",
      answer: "SGPA (Semester Grade Point Average) measures your academic performance in one specific semester or term. CGPA (Cumulative Grade Point Average) is the overall cumulative average across all completed semesters combined."
    },
    {
      question: "How can I improve my overall CGPA?",
      answer: "Focus on higher-credit courses (e.g., 4 or 5 credit subjects) since they impact your weighted average more heavily. Earning top grades in heavy-credit courses raises your cumulative average significantly faster."
    }
  ];

  return (
    <div>
      {/* MAIN TOOL CARD */}
      <div className="tool-calculator-card">
        <form onSubmit={handleCalculate}>
          <div className="subject-header-labels">
            <div>Subject Name</div>
            <div>Credits</div>
            <div>Grade (Points)</div>
            <div>Action</div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            {subjects.map((sub, index) => (
              <div key={sub.id} className="subject-row">
                <div>
                  <label className="form-label-helper" style={{ display: 'none' }}>Subject Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={sub.subject}
                    onChange={(e) => updateSubject(sub.id, 'subject', e.target.value)}
                    placeholder={`e.g. Subject ${index + 1}`}
                    required
                  />
                </div>

                <div>
                  <label className="form-label-helper" style={{ display: 'none' }}>Credits</label>
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
                  <label className="form-label-helper" style={{ display: 'none' }}>Grade</label>
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
                    title="Remove subject"
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
              <Plus size={16} /> Add Subject
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
                <Calculator size={16} /> Calculate CGPA
              </button>
            </div>
          </div>
        </form>

        {/* RESULTS SECTION */}
        {result && (
          <div className="result-box">
            <div className="result-main">
              <div>
                <div className="result-label">Cumulative GPA (CGPA)</div>
                <div className="result-value">{result.cgpa.toFixed(2)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={20} color="var(--success)" />
                <span>Calculated on a 10.0 Scale</span>
              </div>
            </div>

            <div className="result-stats-grid">
              <div className="result-stat-item">
                <div className="result-stat-title">Total Credits</div>
                <div className="result-stat-val">{result.totalCredits}</div>
              </div>
              <div className="result-stat-item">
                <div className="result-stat-title">Total Grade Points</div>
                <div className="result-stat-val">{result.totalGradePoints}</div>
              </div>
              <div className="result-stat-item">
                <div className="result-stat-title">Subjects Counted</div>
                <div className="result-stat-val">{result.subjectCount}</div>
              </div>
            </div>

            <div className="result-message-badge result-badge-success">
              <Sparkles size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>CGPA Summary:</strong> Your weighted average across {result.subjectCount} courses with {result.totalCredits} total credits is <strong>{result.cgpa.toFixed(2)}</strong>.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO EXPLANATORY CONTENT */}
      <section className="tool-content-section">
        <div className="content-block">
          <h2 className="content-h2">What is CGPA?</h2>
          <p className="content-p">
            <strong>Cumulative Grade Point Average (CGPA)</strong> is the standardized metric used by colleges, universities, and academic boards worldwide to measure an undergraduate or postgraduate student's overall academic performance across multiple semesters or terms.
          </p>
          <p className="content-p">
            Unlike simple arithmetic averages, CGPA accounts for the <em>credit weighting</em> of each course. A rigorous 4-credit lecture and laboratory course carries twice the mathematical weight of a 2-credit elective when calculating your final cumulative score.
          </p>
        </div>

        <div className="content-block">
          <h2 className="content-h2">How is CGPA Calculated?</h2>
          <p className="content-p">
            To calculate your CGPA accurately, multiply the numeric grade point earned in each subject by its corresponding credit value to obtain the <strong>Quality Points</strong> (Credit Points). Sum all quality points and divide by the sum of all registered credits.
          </p>
          
          <div className="formula-card">
            CGPA = ∑ (Grade Point × Course Credits) / ∑ (Course Credits)
          </div>

          <h3 className="content-h3">Standard 10-Point Grade Scale Mapping:</h3>
          <p className="content-p">
            • A+ = 10 points (Outstanding)<br />
            • A = 9 points (Excellent)<br />
            • B+ = 8 points (Very Good)<br />
            • B = 7 points (Good)<br />
            • C+ = 6 points (Above Average)<br />
            • C = 5 points (Average)<br />
            • D = 4 points (Pass)<br />
            • F = 0 points (Fail)
          </p>
        </div>

        <div className="content-block">
          <h2 className="content-h2">Worked Example Calculation</h2>
          <div className="example-box">
            <p style={{ marginBottom: '10px', color: 'var(--text-primary)', fontWeight: 600 }}>
              Consider a student with 3 courses:
            </p>
            <ul>
              <li><strong>Advanced Math:</strong> 4 Credits × Grade A (9 points) = 36 Grade Points</li>
              <li><strong>Physics Lab:</strong> 2 Credits × Grade A+ (10 points) = 20 Grade Points</li>
              <li><strong>Computer Science:</strong> 3 Credits × Grade B+ (8 points) = 24 Grade Points</li>
            </ul>
            <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>
              Total Grade Points = 36 + 20 + 24 = <strong>80</strong><br />
              Total Credits = 4 + 2 + 3 = <strong>9</strong><br />
              <strong>CGPA = 80 ÷ 9 = 8.89</strong>
            </p>
          </div>
        </div>

        <div className="content-block">
          <h2 className="content-h2">CGPA vs SGPA: What's the Difference?</h2>
          <p className="content-p">
            <strong>SGPA (Semester Grade Point Average)</strong> reflects your academic standing for one single semester or trimester term. In contrast, <strong>CGPA</strong> accumulates all completed semesters from year one to graduation. Your final degree classification (First Class with Distinction, Honors, etc.) is awarded based on your final cumulative CGPA.
          </p>
          <div className="footer-disclaimer-box" style={{ marginTop: '16px' }}>
            <strong>Important Note:</strong> Grading systems may vary by institution. Check your university's official grading policy or academic handbook for custom credit weights and passing thresholds.
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection faqs={faqs} />

      {/* RELATED TOOLS */}
      <RelatedTools currentToolId="cgpa-calculator" />
    </div>
  );
};
