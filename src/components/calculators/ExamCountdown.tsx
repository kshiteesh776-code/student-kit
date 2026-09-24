import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Clock, Calendar, MapPin, Target, X } from 'lucide-react';
import { ExamItem } from '../../types';
import { getStoredExams, saveStoredExams } from '../../utils/storage';
import { calculateTimeRemaining } from '../../utils/calculations';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { EmptyState } from '../common/EmptyState';
import { ErrorMessage } from '../common/ErrorMessage';

export const ExamCountdown: React.FC = () => {
  const [exams, setExams] = useState<ExamItem[]>(() => getStoredExams());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setTick] = useState(0);

  // Form State
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examTime, setExamTime] = useState('09:00');
  const [subject, setSubject] = useState('');
  const [location, setLocation] = useState('');
  const [targetScore, setTargetScore] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Auto-update countdown every second and listen to storage updates
  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);

    const handleSync = () => {
      setExams(getStoredExams());
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('studentkit_exams_updated', handleSync);

    return () => {
      clearInterval(timer);
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('studentkit_exams_updated', handleSync);
    };
  }, []);

  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!examName.trim()) {
      setError('Please provide an exam name.');
      return;
    }
    if (!examDate) {
      setError('Please choose a valid exam date.');
      return;
    }

    const newExam: ExamItem = {
      id: `exam-${Date.now()}`,
      name: examName.trim(),
      date: examDate,
      time: examTime || '09:00',
      subject: subject.trim() || undefined,
      location: location.trim() || undefined,
      targetScore: targetScore.trim() || undefined,
      createdAt: Date.now()
    };

    const updated = [...exams, newExam];
    setExams(updated);
    saveStoredExams(updated);

    // Reset and close
    setExamName('');
    setExamDate('');
    setExamTime('09:00');
    setSubject('');
    setLocation('');
    setTargetScore('');
    setIsModalOpen(false);
  };

  const handleDeleteExam = (id: string) => {
    const updated = exams.filter((e) => e.id !== id);
    setExams(updated);
    saveStoredExams(updated);
  };

  // Sort upcoming first, then past
  const sortedExams = [...exams].sort((a, b) => {
    const timeA = new Date(`${a.date}T${a.time || '09:00'}:00`).getTime();
    const timeB = new Date(`${b.date}T${b.time || '09:00'}:00`).getTime();
    return timeA - timeB;
  });

  const faqs = [
    {
      question: "Are my saved exam countdowns stored securely?",
      answer: "Yes. All your exams are saved locally in your browser's private localStorage. Your schedules never leave your device and persist even when you refresh or revisit StudentKit."
    },
    {
      question: "How does the live countdown calculate remaining time?",
      answer: "The countdown computes the difference between the exact current second and your scheduled exam timestamp down to milliseconds, decomposing the remainder into Days, Hours, Minutes, and Seconds."
    },
    {
      question: "What happens when an exam date passes?",
      answer: "When an exam's scheduled time passes, the countdown status automatically changes to 'Completed / Past Exam' and pauses at 0 days, 0 hours, 0 minutes, 0 seconds."
    },
    {
      question: "Can I track multiple exams simultaneously?",
      answer: "Yes! You can add unlimited exams across different subjects, finals, practicals, entrance exams, or project presentation deadlines."
    },
    {
      question: "How should I structure my exam revision based on countdown days?",
      answer: "Use the countdown to divide remaining days into 3 phases: 50% for core concept mastery, 30% for past-year paper practice, and the final 20% for rapid formula/cheat sheet revisions."
    }
  ];

  return (
    <div>
      {/* MAIN TOOL CARD */}
      <div className="tool-calculator-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '4px' }}>Upcoming Exam Timers</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Live second-by-second countdowns for your scheduled tests.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            <Plus size={16} /> Add New Exam
          </button>
        </div>

        {/* EXAMS LIST */}
        {sortedExams.length === 0 ? (
          <EmptyState
            title="No Scheduled Exams Yet"
            description="Add your midterms, finals, quizzes, or entrance tests to track the exact time remaining."
            actionText="Add Your First Exam"
            onAction={() => setIsModalOpen(true)}
            icon={<Clock size={40} color="var(--text-secondary)" />}
          />
        ) : (
          <div>
            {sortedExams.map((exam) => {
              const remaining = calculateTimeRemaining(exam.date, exam.time);
              const isUrgent = !remaining.isPast && remaining.days <= 3;

              return (
                <div key={exam.id} className={`countdown-card ${isUrgent ? 'urgent' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                        <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{exam.name}</h3>
                        {remaining.isPast ? (
                          <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'var(--bg-subtle)', color: 'var(--text-muted)', border: '1px solid var(--border-card)' }}>
                            Completed / Past
                          </span>
                        ) : isUrgent ? (
                          <span className="priority-badge priority-high">
                            In {remaining.days === 0 ? 'Hours' : `${remaining.days} Days`}
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'var(--success-bg)', color: 'var(--success)', border: '1px solid var(--success-border)' }}>
                            Upcoming
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={14} color="var(--text-secondary)" />
                          {exam.date} at {exam.time}
                        </span>
                        {exam.subject && (
                          <span style={{ color: 'var(--text-muted)' }}>• {exam.subject}</span>
                        )}
                        {exam.location && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={13} /> {exam.location}
                          </span>
                        )}
                        {exam.targetScore && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--warning)' }}>
                            <Target size={13} /> Target: {exam.targetScore}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteExam(exam.id)}
                      className="btn btn-outline btn-sm"
                      title="Delete exam countdown"
                      aria-label={`Delete ${exam.name}`}
                      style={{ padding: '8px' }}
                    >
                      <Trash2 size={16} color="var(--text-secondary)" />
                    </button>
                  </div>

                  {/* Countdown Numbers Grid */}
                  <div className="countdown-grid">
                    <div className="countdown-unit">
                      <div className="countdown-number">{remaining.days}</div>
                      <div className="countdown-label">Days</div>
                    </div>
                    <div className="countdown-unit">
                      <div className="countdown-number">
                        {String(remaining.hours).padStart(2, '0')}
                      </div>
                      <div className="countdown-label">Hours</div>
                    </div>
                    <div className="countdown-unit">
                      <div className="countdown-number">
                        {String(remaining.minutes).padStart(2, '0')}
                      </div>
                      <div className="countdown-label">Minutes</div>
                    </div>
                    <div className="countdown-unit">
                      <div className="countdown-number">
                        {String(remaining.seconds).padStart(2, '0')}
                      </div>
                      <div className="countdown-label">Seconds</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ADD EXAM MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.3rem' }}>Schedule New Exam</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn btn-outline btn-sm"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddExam}>
              <div className="form-group">
                <label className="form-label" htmlFor="new-exam-name">
                  Exam / Paper Title *
                </label>
                <input
                  id="new-exam-name"
                  type="text"
                  className="form-input"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  placeholder="e.g. Operating Systems Final Exam"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="new-exam-date">
                    Exam Date *
                  </label>
                  <input
                    id="new-exam-date"
                    type="date"
                    className="form-input"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="new-exam-time">
                    Exam Start Time
                  </label>
                  <input
                    id="new-exam-time"
                    type="time"
                    className="form-input"
                    value={examTime}
                    onChange={(e) => setExamTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="new-exam-subject">
                    Subject / Department
                  </label>
                  <input
                    id="new-exam-subject"
                    type="text"
                    className="form-input"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Computer Science"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="new-exam-target">
                    Target Score / Grade
                  </label>
                  <input
                    id="new-exam-target"
                    type="text"
                    className="form-input"
                    value={targetScore}
                    onChange={(e) => setTargetScore(e.target.value)}
                    placeholder="e.g. 90% or A+"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="new-exam-location">
                  Room / Exam Centre Location
                </label>
                <input
                  id="new-exam-location"
                  type="text"
                  className="form-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Academic Block 3, Room 204"
                />
              </div>

              <ErrorMessage message={error || ''} />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Plus size={16} /> Save Exam Countdown
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SEO EXPLANATORY CONTENT */}
      <section className="tool-content-section">
        <div className="content-block">
          <h2 className="content-h2">Why Use an Exam Countdown?</h2>
          <p className="content-p">
            Tracking your examination dates with a visual, real-time countdown prevents last-minute cramming and fosters effective revision pacing. Research in cognitive psychology shows that clear temporal milestones significantly improve study consistency and reduce student exam anxiety.
          </p>
        </div>

        <div className="content-block">
          <h2 className="content-h2">How to Prepare for Exams Effectively</h2>
          <p className="content-p">
            • <strong>Spaced Repetition:</strong> Review difficult topics at increasing intervals (e.g. Day 1, Day 3, Day 7).<br />
            • <strong>Active Recall:</strong> Test yourself with past exam papers without looking at answer keys.<br />
            • <strong>Pomodoro Study Blocks:</strong> Work in focused 25 or 50-minute study sprints followed by short 5-minute mental breaks.<br />
            • <strong>Target High-Credit Subjects:</strong> Prioritize demanding subjects that contribute more credit points to your CGPA.
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection faqs={faqs} />

      {/* RELATED TOOLS */}
      <RelatedTools currentToolId="exam-countdown" />
    </div>
  );
};
