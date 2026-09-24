import React, { useState } from 'react';
import { calculateAttendance, AttendanceResult } from '../../utils/calculations';
import { ErrorMessage } from '../common/ErrorMessage';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { CheckCircle2, AlertTriangle, XCircle, RotateCcw, Calculator, ArrowRight } from 'lucide-react';

export const AttendanceCalculator: React.FC = () => {
  const [attendedInput, setAttendedInput] = useState<string>('38');
  const [totalInput, setTotalInput] = useState<string>('50');
  const [requiredPctInput, setRequiredPctInput] = useState<string>('75');
  const [targetPctInput, setTargetPctInput] = useState<string>('80');

  const [result, setResult] = useState<AttendanceResult | null>(() =>
    calculateAttendance(38, 50, 75, 80)
  );
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    const attended = parseInt(attendedInput, 10);
    const total = parseInt(totalInput, 10);
    const requiredPct = parseFloat(requiredPctInput);
    const targetPct = parseFloat(targetPctInput);

    if (isNaN(attended) || attended < 0) {
      setError('Please enter a valid number of attended classes (0 or more).');
      return;
    }

    if (isNaN(total) || total <= 0) {
      setError('Total classes conducted must be greater than 0.');
      return;
    }

    if (attended > total) {
      setError('Classes attended cannot be greater than total classes conducted.');
      return;
    }

    if (isNaN(requiredPct) || requiredPct < 0 || requiredPct > 100) {
      setError('Required attendance percentage must be between 0 and 100.');
      return;
    }

    if (isNaN(targetPct) || targetPct < 0 || targetPct > 100) {
      setError('Target attendance percentage must be between 0 and 100.');
      return;
    }

    const calc = calculateAttendance(attended, total, requiredPct, targetPct);
    if (!calc) {
      setError('Failed to compute attendance. Please verify your inputs.');
      return;
    }

    setResult(calc);
  };

  const handleReset = () => {
    setAttendedInput('30');
    setTotalInput('40');
    setRequiredPctInput('75');
    setTargetPctInput('75');
    setResult(calculateAttendance(30, 40, 75, 75));
    setError(null);
  };

  const faqs = [
    {
      question: "How is college attendance percentage calculated?",
      answer: "Attendance percentage is calculated with the formula: (Total Classes Attended ÷ Total Classes Conducted) × 100. For example, attending 45 out of 60 lectures gives (45 ÷ 60) × 100 = 75%."
    },
    {
      question: "How does the 'classes you can miss' formula work?",
      answer: "If your current attendance is above the required percentage (e.g. 75%), every class you miss adds +1 to total conducted classes while attended remains constant. The formula solves for M: Attended ÷ (Total + M) ≥ Required%, giving M = floor((Attended × 100 / Required%) - Total)."
    },
    {
      question: "How many consecutive classes do I need to attend to recover 75%?",
      answer: "To recover your attendance after dipping below 75%, you must attend upcoming classes consecutively without missing any. The formula calculates X = ceil((Required% × Total - 100 × Attended) ÷ (100 - Required%))."
    },
    {
      question: "Why is 100% target impossible once I miss a class?",
      answer: "Because 100% attendance requires attending every single class conducted. Once you have missed even 1 class, your total attended classes will always be less than total conducted classes."
    },
    {
      question: "Is medical leave or duty leave counted towards attendance?",
      answer: "Most colleges and universities have specific condonation policies (usually 5% to 10% relaxation) for certified medical leave or official college activities. Always verify with your college dean or administration."
    }
  ];

  return (
    <div>
      {/* MAIN TOOL CARD */}
      <div className="tool-calculator-card">
        <form onSubmit={handleCalculate}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="attended-classes">
                Classes Attended
                <span className="form-label-helper">Total present</span>
              </label>
              <input
                id="attended-classes"
                type="number"
                min="0"
                className="form-input"
                value={attendedInput}
                onChange={(e) => setAttendedInput(e.target.value)}
                placeholder="e.g. 38"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="total-classes">
                Total Classes Conducted
                <span className="form-label-helper">Held to date</span>
              </label>
              <input
                id="total-classes"
                type="number"
                min="1"
                className="form-input"
                value={totalInput}
                onChange={(e) => setTotalInput(e.target.value)}
                placeholder="e.g. 50"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="required-pct">
                Required Attendance (%)
                <span className="form-label-helper">College minimum (e.g. 75%)</span>
              </label>
              <input
                id="required-pct"
                type="number"
                step="1"
                min="1"
                max="100"
                className="form-input"
                value={requiredPctInput}
                onChange={(e) => setRequiredPctInput(e.target.value)}
                placeholder="75"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="target-pct">
                Your Target Attendance (%)
                <span className="form-label-helper">Desired target (e.g. 80%)</span>
              </label>
              <input
                id="target-pct"
                type="number"
                step="1"
                min="1"
                max="100"
                className="form-input"
                value={targetPctInput}
                onChange={(e) => setTargetPctInput(e.target.value)}
                placeholder="80"
                required
              />
            </div>
          </div>

          <ErrorMessage message={error || ''} />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
            <button type="button" onClick={handleReset} className="btn btn-outline">
              <RotateCcw size={16} /> Reset
            </button>
            <button type="submit" className="btn btn-primary">
              <Calculator size={16} /> Calculate Attendance
            </button>
          </div>
        </form>

        {/* RESULTS SECTION */}
        {result && (
          <div className="result-box">
            <div className="result-main">
              <div>
                <div className="result-label">Current Attendance</div>
                <div className="result-value">{result.currentPercentage}%</div>
              </div>
              <div>
                {result.currentPercentage >= result.missCalculation.targetPercentage ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontWeight: 600 }}>
                    <CheckCircle2 size={24} color="var(--success)" />
                    <span>Eligible ({result.currentPercentage}% ≥ {result.missCalculation.targetPercentage}%)</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--danger)', fontWeight: 600 }}>
                    <AlertTriangle size={24} color="var(--danger)" />
                    <span>Short Attendance ({result.currentPercentage}% &lt; {result.missCalculation.targetPercentage}%)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Attendance Progress Bar */}
            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <span>Progress to 100%</span>
                <span>{result.classesAttended} / {result.totalClasses} classes attended</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill" 
                  style={{ 
                    width: `${Math.min(100, result.currentPercentage)}%`,
                    backgroundColor: result.currentPercentage >= result.missCalculation.targetPercentage ? 'var(--success)' : 'var(--danger)'
                  }} 
                />
              </div>
            </div>

            <div className="result-stats-grid">
              <div className="result-stat-item">
                <div className="result-stat-title">Classes Attended</div>
                <div className="result-stat-val">{result.classesAttended}</div>
              </div>
              <div className="result-stat-item">
                <div className="result-stat-title">Classes Missed</div>
                <div className="result-stat-val">{result.classesMissed}</div>
              </div>
              <div className="result-stat-item">
                <div className="result-stat-title">Total Conducted</div>
                <div className="result-stat-val">{result.totalClasses}</div>
              </div>
            </div>

            {/* SECTION 1: HOW MANY CAN I MISS? */}
            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-card)' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>1.</span> How Many Classes Can I Miss?
              </h3>
              {result.missCalculation.isEligible ? (
                <div className="result-message-badge result-badge-success">
                  <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>You can miss {result.missCalculation.canMiss} class{result.missCalculation.canMiss === 1 ? '' : 'es'}!</strong>
                    <div style={{ fontSize: '0.88rem', marginTop: '4px', opacity: 0.9 }}>
                      {result.missCalculation.explanation}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="result-message-badge result-badge-danger">
                  <XCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Cannot miss any classes!</strong>
                    <div style={{ fontSize: '0.88rem', marginTop: '4px', opacity: 0.9 }}>
                      {result.missCalculation.explanation}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 2: HOW MANY NEED TO ATTEND? */}
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-card)' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>2.</span> How Many Classes Do I Need to Attend for {result.attendCalculation.targetPercentage}%?
              </h3>
              {result.attendCalculation.isAchieved ? (
                <div className="result-message-badge result-badge-success">
                  <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Target Already Achieved!</strong>
                    <div style={{ fontSize: '0.88rem', marginTop: '4px', opacity: 0.9 }}>
                      {result.attendCalculation.explanation}
                    </div>
                  </div>
                </div>
              ) : result.attendCalculation.isImpossible ? (
                <div className="result-message-badge result-badge-danger">
                  <XCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Target Mathematically Unreachable:</strong>
                    <div style={{ fontSize: '0.88rem', marginTop: '4px', opacity: 0.9 }}>
                      {result.attendCalculation.explanation}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="result-message-badge result-badge-warning">
                  <ArrowRight size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Need to attend {result.attendCalculation.neededToAttend} consecutive classes:</strong>
                    <div style={{ fontSize: '0.88rem', marginTop: '4px', opacity: 0.9 }}>
                      {result.attendCalculation.explanation}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* SEO EXPLANATORY CONTENT */}
      <section className="tool-content-section">
        <div className="content-block">
          <h2 className="content-h2">What is Attendance Percentage?</h2>
          <p className="content-p">
            <strong>Attendance Percentage</strong> measures the proportion of total scheduled lectures, practical labs, and seminars that a student was present for during an academic semester or school year.
          </p>
          <p className="content-p">
            Most colleges, universities, and regulatory councils mandate a minimum attendance benchmark (typically <strong>75% or 80%</strong>) to be eligible to sit for final semester examinations and receive course credits.
          </p>
        </div>

        <div className="content-block">
          <h2 className="content-h2">Attendance Formulas</h2>
          <p className="content-p">Standard Attendance Percentage Formula:</p>
          <div className="formula-card">
            Attendance % = (Classes Attended / Total Classes Conducted) × 100
          </div>

          <h3 className="content-h3">1. How Many Classes Can You Miss (Bunk Formula)?</h3>
          <p className="content-p">
            If your current attendance exceeds the required threshold $R\%$ ($R \le 100$), the number of future classes you can safely miss ($M$) without dropping below $R\%$ is:
          </p>
          <div className="formula-card">
            Missable Classes (M) = ⌊(Attended × 100 / Required%) - Total Classes⌋
          </div>

          <h3 className="content-h3">2. How Many Classes Must You Attend to Recover?</h3>
          <p className="content-p">
            If your attendance is currently below your target $T\%$ ($T &lt; 100$), the number of consecutive upcoming classes ($X$) you must attend without missing is:
          </p>
          <div className="formula-card">
            Classes to Attend (X) = ⌈(Target% × Total - 100 × Attended) / (100 - Target%)⌉
          </div>
        </div>

        <div className="content-block">
          <h2 className="content-h2">Attendance Recovery Example</h2>
          <div className="example-box">
            <p style={{ marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 600 }}>
              Suppose you attended 25 out of 40 classes (62.5%), and need 75%:
            </p>
            <ul>
              <li><strong>Current Percentage:</strong> (25 ÷ 40) × 100 = 62.5%</li>
              <li><strong>Formula:</strong> ⌈(75 × 40 - 100 × 25) ÷ (100 - 75)⌉ = ⌈(3000 - 2500) ÷ 25⌉ = ⌈500 ÷ 25⌉ = <strong>20</strong></li>
              <li><strong>Outcome:</strong> You must attend the next <strong>20 classes in a row</strong> without missing any. Your new record will be 45/60 = 75.0%.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection faqs={faqs} />

      {/* RELATED TOOLS */}
      <RelatedTools currentToolId="attendance-calculator" />
    </div>
  );
};
