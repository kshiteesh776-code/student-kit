import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, Plus, Trash2, X, Sparkles } from 'lucide-react';
import { ExamItem } from '../../types';
import { getStoredExams, saveStoredExams } from '../../utils/storage';
import { calculateTimeRemaining, CountdownTime } from '../../utils/calculations';
import { ErrorMessage } from './ErrorMessage';

interface UpcomingExamData {
  exam: ExamItem;
  remaining: CountdownTime;
}

export const NextExamCard: React.FC = () => {
  const [nearestExamData, setNearestExamData] = useState<UpcomingExamData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examTime, setExamTime] = useState('09:00');
  const [subject, setSubject] = useState('');
  const [location, setLocation] = useState('');
  const [targetScore, setTargetScore] = useState('');
  const [error, setError] = useState<string | null>(null);

  const evaluateNearestExam = () => {
    const exams = getStoredExams();
    if (!exams || exams.length === 0) {
      setNearestExamData(null);
      return;
    }

    // Compute remaining time for all exams
    const upcoming: UpcomingExamData[] = [];
    for (const exam of exams) {
      const remaining = calculateTimeRemaining(exam.date, exam.time);
      if (!remaining.isPast && remaining.totalSeconds > 0) {
        upcoming.push({ exam, remaining });
      }
    }

    if (upcoming.length === 0) {
      setNearestExamData(null);
      return;
    }

    // Sort by smallest remaining total seconds
    upcoming.sort((a, b) => a.remaining.totalSeconds - b.remaining.totalSeconds);
    setNearestExamData(upcoming[0]);
  };

  useEffect(() => {
    // Initial evaluation
    evaluateNearestExam();

    // Update countdown and check expiration every second
    const interval = setInterval(() => {
      evaluateNearestExam();
    }, 1000);

    // Listen to localStorage updates across tabs / window focus / custom events
    const handleStorageChange = () => evaluateNearestExam();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);
    window.addEventListener('studentkit_exams_updated', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
      window.removeEventListener('studentkit_exams_updated', handleStorageChange);
    };
  }, []);

  const handleAddTimeline = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!examName.trim()) {
      setError('Please provide an exam or milestone title.');
      return;
    }
    if (!examDate) {
      setError('Please choose a valid target date.');
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

    const currentExams = getStoredExams();
    const updated = [...currentExams, newExam];
    saveStoredExams(updated);
    evaluateNearestExam();

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
    const currentExams = getStoredExams();
    const updated = currentExams.filter((e) => e.id !== id);
    saveStoredExams(updated);
    evaluateNearestExam();
  };

  return (
    <div className="next-exam-section container">
      {nearestExamData ? (
        <div className="next-exam-card">
          <div className="next-exam-info">
            <div className="next-exam-badge">
              <Clock size={13} />
              <span>Next Upcoming Exam</span>
            </div>
            <h3 className="next-exam-title">{nearestExamData.exam.name}</h3>
            <div className="next-exam-meta">
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={14} color="var(--text-secondary)" />
                {nearestExamData.exam.date} at {nearestExamData.exam.time}
              </span>
              {nearestExamData.exam.subject && (
                <span>• {nearestExamData.exam.subject}</span>
              )}
              {nearestExamData.exam.location && (
                <span style={{ color: 'var(--text-muted)' }}>({nearestExamData.exam.location})</span>
              )}
            </div>
          </div>

          <div className="next-exam-timer-wrapper">
            <div className="next-exam-digits">
              <div className="next-exam-unit">
                <div className="next-exam-num">{nearestExamData.remaining.days}</div>
                <div className="next-exam-lbl">Days</div>
              </div>
              <div className="next-exam-unit">
                <div className="next-exam-num">
                  {String(nearestExamData.remaining.hours).padStart(2, '0')}
                </div>
                <div className="next-exam-lbl">Hours</div>
              </div>
              <div className="next-exam-unit">
                <div className="next-exam-num">
                  {String(nearestExamData.remaining.minutes).padStart(2, '0')}
                </div>
                <div className="next-exam-lbl">Mins</div>
              </div>
              <div className="next-exam-unit">
                <div className="next-exam-num">
                  {String(nearestExamData.remaining.seconds).padStart(2, '0')}
                </div>
                <div className="next-exam-lbl">Secs</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary btn-sm"
                title="Add Another Exam / Timeline"
              >
                <Plus size={14} />
                <span>Add Exam</span>
              </button>

              <Link to="/student/exam-countdown" className="btn btn-secondary btn-sm">
                <span>View All</span>
                <ArrowRight size={14} />
              </Link>

              <button
                type="button"
                onClick={() => handleDeleteExam(nearestExamData.exam.id)}
                className="btn btn-outline btn-sm"
                title="Remove this exam timeline"
                aria-label="Remove exam timeline"
                style={{ padding: '8px' }}
              >
                <Trash2 size={15} color="var(--text-secondary)" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="next-exam-card">
          <div className="next-exam-empty">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div className="tool-card-icon" style={{ width: '42px', height: '42px', flexShrink: 0 }}>
                <Clock size={20} color="var(--accent-blue)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Exam &amp; Deadline Timeline</span>
                  <Sparkles size={14} color="var(--accent-blue)" />
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Track your midterms, finals, quizzes, or entrance tests with live countdown timers.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary btn-sm"
              >
                <Plus size={15} />
                <span>Add Timeline</span>
              </button>
              <Link to="/student/exam-countdown" className="btn btn-secondary btn-sm">
                <span>Open Tracker</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* QUICK ADD TIMELINE MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.3rem' }}>Add Exam / Timeline Countdown</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn btn-outline btn-sm"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddTimeline}>
              <div className="form-group">
                <label className="form-label" htmlFor="quick-exam-name">
                  Exam / Paper / Milestone Title *
                </label>
                <input
                  id="quick-exam-name"
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
                  <label className="form-label" htmlFor="quick-exam-date">
                    Exam Date *
                  </label>
                  <input
                    id="quick-exam-date"
                    type="date"
                    className="form-input"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="quick-exam-time">
                    Exam Start Time
                  </label>
                  <input
                    id="quick-exam-time"
                    type="time"
                    className="form-input"
                    value={examTime}
                    onChange={(e) => setExamTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="quick-exam-subject">
                    Subject / Department
                  </label>
                  <input
                    id="quick-exam-subject"
                    type="text"
                    className="form-input"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Computer Science"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="quick-exam-target">
                    Target Score / Grade
                  </label>
                  <input
                    id="quick-exam-target"
                    type="text"
                    className="form-input"
                    value={targetScore}
                    onChange={(e) => setTargetScore(e.target.value)}
                    placeholder="e.g. 90% or A+"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="quick-exam-location">
                  Room / Exam Centre Location
                </label>
                <input
                  id="quick-exam-location"
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
                  <Plus size={16} /> Save Timeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

