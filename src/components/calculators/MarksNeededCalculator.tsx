import React, { useState } from 'react';
import { calculateMarksNeeded, MarksNeededResult } from '../../utils/calculations';
import { ErrorMessage } from '../common/ErrorMessage';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { Target, RotateCcw, Calculator, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export const MarksNeededCalculator: React.FC = () => {
  const [totalCourseMarksInput, setTotalCourseMarksInput] = useState<string>('100');
  const [marksObtainedInput, setMarksObtainedInput] = useState<string>('32');
  const [remainingMarksInput, setRemainingMarksInput] = useState<string>('60');
  const [targetPercentageInput, setTargetPercentageInput] = useState<string>('75');

  const [result, setResult] = useState<MarksNeededResult | null>(() =>
    calculateMarksNeeded(100, 32, 60, 75)
  );
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    const total = parseFloat(totalCourseMarksInput);
    const obtained = parseFloat(marksObtainedInput);
    const remaining = parseFloat(remainingMarksInput);
    const targetPct = parseFloat(targetPercentageInput);

    if (isNaN(total) || total <= 0) {
      setError('Total course marks must be greater than zero.');
      return;
    }
    if (isNaN(obtained) || obtained < 0) {
      setError('Marks already obtained must be 0 or positive.');
      return;
    }
    if (isNaN(remaining) || remaining < 0) {
      setError('Remaining assessment marks must be 0 or positive.');
      return;
    }
    if (obtained + remaining > total) {
      setError('The sum of obtained marks and remaining marks cannot exceed total course marks.');
      return;
    }
    if (isNaN(targetPct) || targetPct < 0 || targetPct > 100) {
      setError('Target percentage must be between 0% and 100%.');
      return;
    }

    const calc = calculateMarksNeeded(total, obtained, remaining, targetPct);
    if (!calc) {
      setError('Invalid calculation inputs. Please check the values.');
      return;
    }

    setResult(calc);
  };

  const handleReset = () => {
    setTotalCourseMarksInput('100');
    setMarksObtainedInput('25');
    setRemainingMarksInput('50');
    setTargetPercentageInput('70');
    setResult(calculateMarksNeeded(100, 25, 50, 70));
    setError(null);
  };

  const faqs = [
    {
      question: "How do I calculate how many marks I need in my final exam?",
      answer: "First find your target overall marks: Target Marks = (Target % ÷ 100) × Total Course Marks. Then subtract the marks you have already earned in midterms/assignments: Marks Needed = Target Marks - Current Marks. Finally, divide by remaining final exam marks to know the required percentage."
    },
    {
      question: "What does it mean if my target is impossible to reach?",
      answer: "If the total marks required exceed your current marks plus all remaining available assessment points, even getting 100% on every remaining test will fall short of the target."
    },
    {
      question: "Can I use this for weighted grading schemes?",
      answer: "Yes! If your course is graded on a 100-point total scale where midterm is 30 points, assignments 20 points, and finals 50 points, enter 100 as total, the points earned so far as obtained, and the final weight as remaining."
    },
    {
      question: "What if I have already scored enough marks to pass?",
      answer: "If your current marks already meet or exceed the target marks for your desired grade, the calculator will indicate that 0 additional marks are needed."
    },
    {
      question: "How can I set realistic grade targets?",
      answer: "Check the required percentage in the remaining exams calculated below. If it requires over 90% in finals, consider whether that target is feasible given your prep time."
    }
  ];

  return (
    <div>
      {/* MAIN TOOL CARD */}
      <div className="tool-calculator-card">
        <form onSubmit={handleCalculate}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="total-course-marks">
                Total Course Marks
                <span className="form-label-helper">Total assessment value (e.g. 100)</span>
              </label>
              <input
                id="total-course-marks"
                type="number"
                step="0.5"
                min="1"
                className="form-input"
                value={totalCourseMarksInput}
                onChange={(e) => setTotalCourseMarksInput(e.target.value)}
                placeholder="100"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="marks-obtained">
                Marks Already Obtained
                <span className="form-label-helper">Midterms, quizzes, assignments</span>
              </label>
              <input
                id="marks-obtained"
                type="number"
                step="0.5"
                min="0"
                className="form-input"
                value={marksObtainedInput}
                onChange={(e) => setMarksObtainedInput(e.target.value)}
                placeholder="32"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="remaining-marks">
                Remaining Marks Available
                <span className="form-label-helper">Final exam / remaining tests</span>
              </label>
              <input
                id="remaining-marks"
                type="number"
                step="0.5"
                min="0"
                className="form-input"
                value={remainingMarksInput}
                onChange={(e) => setRemainingMarksInput(e.target.value)}
                placeholder="60"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="target-percentage">
                Target Overall Percentage (%)
                <span className="form-label-helper">Your goal (e.g. 75% or 85%)</span>
              </label>
              <input
                id="target-percentage"
                type="number"
                step="0.5"
                min="0"
                max="100"
                className="form-input"
                value={targetPercentageInput}
                onChange={(e) => setTargetPercentageInput(e.target.value)}
                placeholder="75"
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
              <Calculator size={16} /> Calculate Marks Needed
            </button>
          </div>
        </form>

        {/* RESULTS SECTION */}
        {result && (
          <div className="result-box">
            <div className="result-main">
              <div>
                <div className="result-label">Marks Still Required</div>
                <div className="result-value">
                  {result.isAchievable ? (
                    <>
                      {result.marksStillNeeded}{' '}
                      <span style={{ fontSize: '1.4rem', color: 'var(--text-muted)' }}>
                        / {result.remainingMarks}
                      </span>
                    </>
                  ) : (
                    <span style={{ color: 'var(--danger)', fontSize: '2rem' }}>Impossible Target</span>
                  )}
                </div>
              </div>
              <div>
                {result.isAlreadyAchieved ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontWeight: 600 }}>
                    <CheckCircle2 size={24} color="var(--success)" />
                    <span>Goal Achieved!</span>
                  </div>
                ) : result.isAchievable ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--warning)', fontWeight: 600 }}>
                    <Target size={24} color="var(--warning)" />
                    <span>Need {result.requiredPercentageInRemaining}% in Finals</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--danger)', fontWeight: 600 }}>
                    <XCircle size={24} color="var(--danger)" />
                    <span>Target Unreachable</span>
                  </div>
                )}
              </div>
            </div>

            <div className="result-stats-grid">
              <div className="result-stat-item">
                <div className="result-stat-title">Target Total Marks</div>
                <div className="result-stat-val">{result.targetMarksOverall}</div>
              </div>
              <div className="result-stat-item">
                <div className="result-stat-title">Marks Already Earned</div>
                <div className="result-stat-val">{result.marksObtained}</div>
              </div>
              <div className="result-stat-item">
                <div className="result-stat-title">Max Reachable Marks</div>
                <div className="result-stat-val">{result.maxPossibleMarks} ({result.maxPossiblePercentage}%)</div>
              </div>
            </div>

            {result.isAlreadyAchieved ? (
              <div className="result-message-badge result-badge-success">
                <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>{result.message}</div>
              </div>
            ) : result.isAchievable ? (
              <div className="result-message-badge result-badge-warning">
                <Target size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Target Plan:</strong> {result.message}
                </div>
              </div>
            ) : (
              <div className="result-message-badge result-badge-danger">
                <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Target cannot be reached with the remaining marks.</strong> {result.message}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SEO EXPLANATORY CONTENT */}
      <section className="tool-content-section">
        <div className="content-block">
          <h2 className="content-h2">How to Calculate Required Marks</h2>
          <p className="content-p">
            Throughout a university or school semester, students accumulate marks across continuous assessments, quizzes, midterms, projects, and final examinations. The <strong>Marks Needed Calculator</strong> helps you plan backward from your target grade so you know precisely what score to aim for on your remaining papers.
          </p>
          
          <div className="formula-card">
            Overall Target Marks = (Target % / 100) × Total Course Marks<br />
            Marks Still Needed = Overall Target Marks - Marks Already Earned<br />
            Required % in Finals = (Marks Still Needed / Remaining Assessment Marks) × 100
          </div>
        </div>

        <div className="content-block">
          <h2 className="content-h2">Target Percentage Example</h2>
          <div className="example-box">
            <p style={{ marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 600 }}>
              Practical Scenario:
            </p>
            <ul>
              <li><strong>Total Course Marks:</strong> 100</li>
              <li><strong>Marks Already Obtained:</strong> 32 (from midterms and assignments)</li>
              <li><strong>Remaining Final Exam Marks:</strong> 60</li>
              <li><strong>Target Percentage:</strong> 75% (requires 75 total marks)</li>
              <li><strong>Calculation:</strong> 75 - 32 = <strong>43 marks needed</strong> out of 60 in the final exam (i.e. <strong>71.67%</strong>).</li>
            </ul>
          </div>
        </div>

        <div className="content-block">
          <h2 className="content-h2">Why Some Targets Become Impossible</h2>
          <p className="content-p">
            If you have lost too many marks earlier in the semester, your maximum attainable score (Current Marks + All Remaining Marks) might be less than the target score. When this happens, StudentKit clearly notifies you that the target is mathematically unreachable rather than displaying deceptive negative figures.
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection faqs={faqs} />

      {/* RELATED TOOLS */}
      <RelatedTools currentToolId="marks-needed-calculator" />
    </div>
  );
};
