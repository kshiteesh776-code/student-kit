import React, { useState } from 'react';
import { convertGpaToPercentage, GpaConversionResult } from '../../utils/calculations';
import { ErrorMessage } from '../common/ErrorMessage';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { ArrowRightLeft, RotateCcw, Calculator, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const GpaToPercentageCalculator: React.FC = () => {
  const [gpaInput, setGpaInput] = useState<string>('8.4');
  const [method, setMethod] = useState<'9.5' | '10' | 'custom'>('9.5');
  const [customMultiplierInput, setCustomMultiplierInput] = useState<string>('9.5');

  const [result, setResult] = useState<GpaConversionResult | null>(() =>
    convertGpaToPercentage(8.4, '9.5')
  );
  const [error, setError] = useState<string | null>(null);

  const handleConvert = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    const gpa = parseFloat(gpaInput);
    if (isNaN(gpa) || gpa < 0 || gpa > 10) {
      setError('Please enter a valid GPA / CGPA between 0.0 and 10.0.');
      return;
    }

    let mult = 9.5;
    if (method === 'custom') {
      mult = parseFloat(customMultiplierInput);
      if (isNaN(mult) || mult <= 0 || mult > 25) {
        setError('Please enter a valid custom multiplier greater than 0.');
        return;
      }
    }

    const calc = convertGpaToPercentage(gpa, method, mult);
    if (!calc) {
      setError('Conversion error. Please check your input parameters.');
      return;
    }

    setResult(calc);
  };

  const handleReset = () => {
    setGpaInput('8.0');
    setMethod('9.5');
    setCustomMultiplierInput('9.5');
    setResult(convertGpaToPercentage(8.0, '9.5'));
    setError(null);
  };

  const faqs = [
    {
      question: "Why is the CBSE / Engineering formula Percentage = CGPA × 9.5?",
      answer: "CBSE and many state technical boards analyzed past board results and found that the average percentage scored by top performers in the 10-point grade bracket was approximately 95%. Dividing 95 by 10 gives the standard 9.5 multiplier."
    },
    {
      question: "Does every university use the 9.5 multiplier?",
      answer: "No. Some universities (like VTU, Mumbai University, Anna University, or US universities) use custom linear conversions, 10x multipliers, or formula tables (such as Percentage = (CGPA - 0.75) × 10). Always follow your university's official conversion certificate."
    },
    {
      question: "Can I convert a 4.0 GPA to a percentage?",
      answer: "Yes! Select the 'Custom Multiplier' method and enter 25.0 (since 4.0 × 25 = 100%), or your institution's specific 4.0 to percentage scale."
    },
    {
      question: "What is the difference between GPA and CGPA?",
      answer: "GPA usually refers to Grade Point Average in general, often used for a specific term or semester. CGPA stands for Cumulative Grade Point Average and represents your total academic score across all semesters combined."
    },
    {
      question: "How do employers view GPA to percentage conversions?",
      answer: "Most recruitment companies and government exams require candidates to provide the official conversion formula published on the back of their degree transcript."
    }
  ];

  return (
    <div>
      {/* MAIN TOOL CARD */}
      <div className="tool-calculator-card">
        <form onSubmit={handleConvert}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="gpa-input">
                Enter GPA / CGPA (10-point scale)
                <span className="form-label-helper">e.g. 8.4, 9.2</span>
              </label>
              <input
                id="gpa-input"
                type="number"
                step="0.01"
                min="0"
                max="10"
                className="form-input"
                value={gpaInput}
                onChange={(e) => setGpaInput(e.target.value)}
                placeholder="8.4"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Conversion Method
                <span className="form-label-helper">Select university scheme</span>
              </label>
              <select
                className="form-select"
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
              >
                <option value="9.5">Method 1: Percentage = CGPA × 9.5 (Standard CBSE / AICTE)</option>
                <option value="10">Method 2: Percentage = CGPA × 10 (Direct 10x Scale)</option>
                <option value="custom">Method 3: Custom University Multiplier</option>
              </select>
            </div>
          </div>

          {method === 'custom' && (
            <div className="form-group" style={{ maxWidth: '300px' }}>
              <label className="form-label" htmlFor="custom-multiplier">
                Custom Multiplier
                <span className="form-label-helper">e.g. 9.0, 9.25, 25.0</span>
              </label>
              <input
                id="custom-multiplier"
                type="number"
                step="0.01"
                min="0.1"
                className="form-input"
                value={customMultiplierInput}
                onChange={(e) => setCustomMultiplierInput(e.target.value)}
                placeholder="9.5"
                required
              />
            </div>
          )}

          <ErrorMessage message={error || ''} />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
            <button type="button" onClick={handleReset} className="btn btn-outline">
              <RotateCcw size={16} /> Reset
            </button>
            <button type="submit" className="btn btn-primary">
              <Calculator size={16} /> Convert to Percentage
            </button>
          </div>
        </form>

        {/* RESULT BOX */}
        {result && (
          <div className="result-box">
            <div className="result-main">
              <div>
                <div className="result-label">Equivalent Percentage</div>
                <div className="result-value">{result.percentage}%</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <ArrowRightLeft size={20} color="var(--text-primary)" />
                <span>Standard Formula Conversion</span>
              </div>
            </div>

            <div className="result-stats-grid">
              <div className="result-stat-item">
                <div className="result-stat-title">Input GPA/CGPA</div>
                <div className="result-stat-val">{result.gpa}</div>
              </div>
              <div className="result-stat-item">
                <div className="result-stat-title">Multiplier Used</div>
                <div className="result-stat-val">× {result.multiplier}</div>
              </div>
              <div className="result-stat-item">
                <div className="result-stat-title">Final Equivalent</div>
                <div className="result-stat-val">{result.percentage}%</div>
              </div>
            </div>

            <div className="result-message-badge result-badge-success">
              <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Applied Formula:</strong> <code>{result.formulaString} = {result.percentage}%</code>
              </div>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <ShieldAlert size={15} color="var(--text-secondary)" />
              <span>Conversion formulas vary between institutions. Use the method specified by your university whenever available.</span>
            </div>
          </div>
        )}
      </div>

      {/* SEO EXPLANATORY CONTENT */}
      <section className="tool-content-section">
        <div className="content-block">
          <h2 className="content-h2">What is GPA and CGPA?</h2>
          <p className="content-p">
            <strong>Grade Point Average (GPA)</strong> represents a student's numeric academic average, typically scaled from 0.0 to 10.0 (or 0.0 to 4.0 in North America). <strong>CGPA (Cumulative GPA)</strong> is the cumulative average across all completed semesters in a degree program.
          </p>
        </div>

        <div className="content-block">
          <h2 className="content-h2">GPA to Percentage Conversion Methods</h2>
          <p className="content-p">
            Because different education boards and universities calculate GPA according to different grading distributions, multiple conversion standards exist:
          </p>
          
          <h3 className="content-h3">Method 1: Standard 9.5 Multiplier (CBSE & AICTE Scheme)</h3>
          <div className="formula-card">
            Percentage (%) = CGPA × 9.5
          </div>
          <p className="content-p">
            Example: A CGPA of 8.0 translates to <code>8.0 × 9.5 = 76.0%</code>.
          </p>

          <h3 className="content-h3">Method 2: Direct 10x Multiplier (Standard 10-Point Scale)</h3>
          <div className="formula-card">
            Percentage (%) = CGPA × 10
          </div>
          <p className="content-p">
            Example: A CGPA of 8.5 translates to <code>8.5 × 10 = 85.0%</code>.
          </p>
        </div>

        <div className="content-block">
          <h2 className="content-h2">Why Do Conversion Formulas Differ?</h2>
          <p className="content-p">
            Institutions choose specific conversion multipliers to align their internal letter grading with percentage thresholds required for higher education admissions, government exam eligibility, and corporate campus placements. Always check the back of your official university grade transcript for your university-specific conversion clause.
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection faqs={faqs} />

      {/* RELATED TOOLS */}
      <RelatedTools currentToolId="gpa-to-percentage" />
    </div>
  );
};
