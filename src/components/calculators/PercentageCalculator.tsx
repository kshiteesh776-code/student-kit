import React, { useState } from 'react';
import { calculatePercentage, calculateMarksFromPercentage, PercentageResult } from '../../utils/calculations';
import { ErrorMessage } from '../common/ErrorMessage';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { Percent, Calculator, RotateCcw, CheckCircle2 } from 'lucide-react';

export const PercentageCalculator: React.FC = () => {
  const [mode, setMode] = useState<'calculate' | 'findMarks'>('calculate');

  // Mode 1 State: Marks -> Percentage
  const [obtainedInput, setObtainedInput] = useState<string>('450');
  const [totalInput, setTotalInput] = useState<string>('500');
  const [resultMode1, setResultMode1] = useState<PercentageResult | null>(() =>
    calculatePercentage(450, 500)
  );

  // Mode 2 State: Target % -> Marks
  const [totalMarksInput2, setTotalMarksInput2] = useState<string>('600');
  const [targetPctInput2, setTargetPctInput2] = useState<string>('85');
  const [resultMode2, setResultMode2] = useState<number | null>(() =>
    calculateMarksFromPercentage(600, 85)
  );

  const [error, setError] = useState<string | null>(null);

  const handleCalculateMode1 = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    const obt = parseFloat(obtainedInput);
    const tot = parseFloat(totalInput);

    if (isNaN(obt) || obt < 0) {
      setError('Please enter valid marks obtained (0 or positive).');
      return;
    }
    if (isNaN(tot) || tot <= 0) {
      setError('Total marks must be greater than zero.');
      return;
    }
    if (obt > tot) {
      setError('Marks obtained cannot exceed total maximum marks.');
      return;
    }

    setResultMode1(calculatePercentage(obt, tot));
  };

  const handleCalculateMode2 = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    const tot = parseFloat(totalMarksInput2);
    const pct = parseFloat(targetPctInput2);

    if (isNaN(tot) || tot <= 0) {
      setError('Total maximum marks must be greater than zero.');
      return;
    }
    if (isNaN(pct) || pct < 0 || pct > 100) {
      setError('Percentage must be between 0% and 100%.');
      return;
    }

    setResultMode2(calculateMarksFromPercentage(tot, pct));
  };

  const handleReset = () => {
    setError(null);
    if (mode === 'calculate') {
      setObtainedInput('400');
      setTotalInput('500');
      setResultMode1(calculatePercentage(400, 500));
    } else {
      setTotalMarksInput2('500');
      setTargetPctInput2('75');
      setResultMode2(calculateMarksFromPercentage(500, 75));
    }
  };

  const faqs = [
    {
      question: "How do I calculate percentage from exam marks?",
      answer: "To find your percentage, divide the marks you obtained by the total maximum possible marks and multiply the result by 100: Percentage = (Marks Obtained ÷ Total Marks) × 100."
    },
    {
      question: "How do I find how many marks I need for an 80% target?",
      answer: "To find required marks from a percentage target, multiply your target percentage (as a decimal or divided by 100) by the total maximum marks: Required Marks = (Target Percentage ÷ 100) × Total Marks."
    },
    {
      question: "Can percentage be greater than 100% in school/college?",
      answer: "In standard academic evaluations, scores cannot exceed 100% unless bonus/extra credit marks are explicitly awarded by your instructor."
    },
    {
      question: "How do I calculate the average percentage across 5 subjects?",
      answer: "Sum the marks obtained across all 5 subjects, sum the maximum marks across all 5 subjects (e.g. 500), and calculate (Total Obtained ÷ 500) × 100."
    },
    {
      question: "How is percentage rounded in academic grade cards?",
      answer: "Most academic institutions round percentages to two decimal places (e.g., 84.67%). StudentKit provides precise results up to 2 decimal places."
    }
  ];

  return (
    <div>
      {/* MAIN TOOL CARD */}
      <div className="tool-calculator-card">
        {/* Mode Selector Tabs */}
        <div className="tab-container">
          <button
            type="button"
            className={`tab-btn ${mode === 'calculate' ? 'active' : ''}`}
            onClick={() => { setMode('calculate'); setError(null); }}
          >
            Calculate Percentage (Marks → %)
          </button>
          <button
            type="button"
            className={`tab-btn ${mode === 'findMarks' ? 'active' : ''}`}
            onClick={() => { setMode('findMarks'); setError(null); }}
          >
            Find Marks (% → Marks)
          </button>
        </div>

        {mode === 'calculate' ? (
          <form onSubmit={handleCalculateMode1}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="marks-obtained">
                  Marks Obtained
                  <span className="form-label-helper">Your score</span>
                </label>
                <input
                  id="marks-obtained"
                  type="number"
                  step="0.1"
                  min="0"
                  className="form-input"
                  value={obtainedInput}
                  onChange={(e) => setObtainedInput(e.target.value)}
                  placeholder="e.g. 450"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="total-marks">
                  Total Maximum Marks
                  <span className="form-label-helper">Maximum score possible</span>
                </label>
                <input
                  id="total-marks"
                  type="number"
                  step="0.1"
                  min="1"
                  className="form-input"
                  value={totalInput}
                  onChange={(e) => setTotalInput(e.target.value)}
                  placeholder="e.g. 500"
                  required
                />
              </div>
            </div>

            <ErrorMessage message={error || ''} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" onClick={handleReset} className="btn btn-outline">
                <RotateCcw size={16} /> Reset
              </button>
              <button type="submit" className="btn btn-primary">
                <Calculator size={16} /> Calculate Percentage
              </button>
            </div>

            {/* Mode 1 Result */}
            {resultMode1 && (
              <div className="result-box">
                <div className="result-main">
                  <div>
                    <div className="result-label">Calculated Percentage</div>
                    <div className="result-value">{resultMode1.percentage}%</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                    <Percent size={20} color="var(--text-primary)" />
                    <span>Exact Score Ratio</span>
                  </div>
                </div>

                <div className="result-stats-grid">
                  <div className="result-stat-item">
                    <div className="result-stat-title">Marks Obtained</div>
                    <div className="result-stat-val">{resultMode1.obtained}</div>
                  </div>
                  <div className="result-stat-item">
                    <div className="result-stat-title">Maximum Marks</div>
                    <div className="result-stat-val">{resultMode1.total}</div>
                  </div>
                  <div className="result-stat-item">
                    <div className="result-stat-title">Fraction Ratio</div>
                    <div className="result-stat-val">{(resultMode1.obtained / resultMode1.total).toFixed(4)}</div>
                  </div>
                </div>

                <div className="result-message-badge result-badge-success">
                  <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Result:</strong> Scoring <strong>{resultMode1.obtained}</strong> out of <strong>{resultMode1.total}</strong> equals <strong>{resultMode1.percentage}%</strong>.
                  </div>
                </div>
              </div>
            )}
          </form>
        ) : (
          <form onSubmit={handleCalculateMode2}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="total-marks-2">
                  Total Maximum Marks
                  <span className="form-label-helper">Total assessment value</span>
                </label>
                <input
                  id="total-marks-2"
                  type="number"
                  step="0.1"
                  min="1"
                  className="form-input"
                  value={totalMarksInput2}
                  onChange={(e) => setTotalMarksInput2(e.target.value)}
                  placeholder="e.g. 600"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="target-pct-2">
                  Target Percentage (%)
                  <span className="form-label-helper">Desired percentage (0 - 100)</span>
                </label>
                <input
                  id="target-pct-2"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  className="form-input"
                  value={targetPctInput2}
                  onChange={(e) => setTargetPctInput2(e.target.value)}
                  placeholder="e.g. 85"
                  required
                />
              </div>
            </div>

            <ErrorMessage message={error || ''} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" onClick={handleReset} className="btn btn-outline">
                <RotateCcw size={16} /> Reset
              </button>
              <button type="submit" className="btn btn-primary">
                <Calculator size={16} /> Calculate Marks
              </button>
            </div>

            {/* Mode 2 Result */}
            {resultMode2 !== null && (
              <div className="result-box">
                <div className="result-main">
                  <div>
                    <div className="result-label">Required Marks</div>
                    <div className="result-value">{resultMode2} <span style={{ fontSize: '1.4rem', color: 'var(--text-muted)' }}>/ {totalMarksInput2}</span></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={22} color="var(--success)" />
                    <span>Target Score</span>
                  </div>
                </div>

                <div className="result-stats-grid">
                  <div className="result-stat-item">
                    <div className="result-stat-title">Target Percentage</div>
                    <div className="result-stat-val">{targetPctInput2}%</div>
                  </div>
                  <div className="result-stat-item">
                    <div className="result-stat-title">Total Max Marks</div>
                    <div className="result-stat-val">{totalMarksInput2}</div>
                  </div>
                  <div className="result-stat-item">
                    <div className="result-stat-title">Required Score</div>
                    <div className="result-stat-val">{resultMode2}</div>
                  </div>
                </div>

                <div className="result-message-badge result-badge-success">
                  <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Summary:</strong> To achieve <strong>{targetPctInput2}%</strong> on a test of <strong>{totalMarksInput2}</strong> total marks, you must score at least <strong>{resultMode2} marks</strong>.
                  </div>
                </div>
              </div>
            )}
          </form>
        )}
      </div>

      {/* SEO EXPLANATORY CONTENT */}
      <section className="tool-content-section">
        <div className="content-block">
          <h2 className="content-h2">How to Calculate Percentage</h2>
          <p className="content-p">
            In student academics, percentage signifies a quantity or ratio expressed as a fraction of 100. It is universally used across high schools, universities, and competitive exams to measure relative academic proficiency.
          </p>
          <div className="formula-card">
            Percentage (%) = (Marks Obtained / Total Maximum Marks) × 100
          </div>
        </div>

        <div className="content-block">
          <h2 className="content-h2">Percentage Examples</h2>
          <div className="example-box">
            <p style={{ marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 600 }}>
              Practical Student Examples:
            </p>
            <ul>
              <li><strong>Example 1:</strong> Scored 450 out of 500 marks &rarr; (450 ÷ 500) × 100 = <strong>90%</strong></li>
              <li><strong>Example 2:</strong> Scored 72 out of 80 marks in Chemistry &rarr; (72 ÷ 80) × 100 = <strong>90%</strong></li>
              <li><strong>Example 3:</strong> Want 75% on a 600-mark final exam board &rarr; (75 ÷ 100) × 600 = <strong>450 marks required</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection faqs={faqs} />

      {/* RELATED TOOLS */}
      <RelatedTools currentToolId="percentage-calculator" />
    </div>
  );
};
