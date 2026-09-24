import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Circle, 
  Calendar, 
  Clock, 
  BookOpen, 
  X
} from 'lucide-react';
import { StudyTask, TaskPriority } from '../../types';
import { getStoredTasks, saveStoredTasks } from '../../utils/storage';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { EmptyState } from '../common/EmptyState';
import { ErrorMessage } from '../common/ErrorMessage';

export const StudyPlanner: React.FC = () => {
  const [tasks, setTasks] = useState<StudyTask[]>(() => getStoredTasks());
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'completed' | 'all'>('today');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // Form State
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('10:00');
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [priority, setPriority] = useState<TaskPriority>('high');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];

  React.useEffect(() => {
    const handleSync = () => {
      setTasks(getStoredTasks());
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('studentkit_tasks_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('studentkit_tasks_updated', handleSync);
    };
  }, []);

  const handleOpenAddModal = () => {
    setEditingTaskId(null);
    setSubject('');
    setTopic('');
    setDate(todayStr);
    setStartTime('10:00');
    setDurationMinutes(60);
    setPriority('high');
    setNotes('');
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task: StudyTask) => {
    setEditingTaskId(task.id);
    setSubject(task.subject);
    setTopic(task.topic);
    setDate(task.date);
    setStartTime(task.startTime);
    setDurationMinutes(task.durationMinutes);
    setPriority(task.priority);
    setNotes(task.notes || '');
    setError(null);
    setIsModalOpen(true);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!subject.trim()) {
      setError('Please provide a subject name.');
      return;
    }
    if (!topic.trim()) {
      setError('Please provide a study topic.');
      return;
    }
    if (!date) {
      setError('Please select a valid study date.');
      return;
    }

    if (editingTaskId) {
      const updated = tasks.map((t) => {
        if (t.id === editingTaskId) {
          return {
            ...t,
            subject: subject.trim(),
            topic: topic.trim(),
            date,
            startTime,
            durationMinutes: Number(durationMinutes) || 60,
            priority,
            notes: notes.trim() || undefined
          };
        }
        return t;
      });
      setTasks(updated);
      saveStoredTasks(updated);
    } else {
      const newTask: StudyTask = {
        id: `task-${Date.now()}`,
        subject: subject.trim(),
        topic: topic.trim(),
        date,
        startTime,
        durationMinutes: Number(durationMinutes) || 60,
        priority,
        completed: false,
        notes: notes.trim() || undefined,
        createdAt: Date.now()
      };
      const updated = [...tasks, newTask];
      setTasks(updated);
      saveStoredTasks(updated);
    }

    setIsModalOpen(false);
  };

  const handleToggleComplete = (id: string) => {
    const updated = tasks.map((t) => {
      if (t.id === id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTasks(updated);
    saveStoredTasks(updated);
  };

  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveStoredTasks(updated);
  };

  // Filter Tasks based on activeTab
  const filteredTasks = tasks.filter((t) => {
    if (activeTab === 'today') return t.date === todayStr && !t.completed;
    if (activeTab === 'upcoming') return t.date > todayStr && !t.completed;
    if (activeTab === 'completed') return t.completed;
    return true; // 'all'
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const faqs = [
    {
      question: "How do I create an effective daily study plan?",
      answer: "Break complex subjects into discrete 45-60 minute focus blocks with defined goals (e.g. 'Solve 10 Calculus integrals' instead of 'Study Math'). Prioritize difficult subjects during your peak morning energy hours."
    },
    {
      question: "Are my study tasks stored locally and privately?",
      answer: "Yes. All your study planner data is saved securely in your browser's localStorage. No account or remote database is used, so your schedule is completely private."
    },
    {
      question: "What is the recommended study session duration?",
      answer: "Cognitive studies recommend 45-60 minute study sessions followed by 10-15 minute rest intervals (the Pomodoro technique) to maintain optimal memory retention and avoid mental fatigue."
    },
    {
      question: "Can I organize tasks across multiple subjects?",
      answer: "Yes! You can add unlimited tasks, tag them by subject, assign priority levels (High, Medium, Low), and filter by Today, Upcoming, or Completed."
    },
    {
      question: "How does marking tasks complete help study momentum?",
      answer: "Tracking your progress visualizes daily momentum, reinforces dopamine rewards, and keeps you accountable leading up to major examinations."
    }
  ];

  return (
    <div>
      {/* MAIN TOOL CARD */}
      <div className="tool-calculator-card">
        {/* Progress Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '4px' }}>Study Schedule &amp; Tasks</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <strong>{completedTasks} of {totalTasks}</strong> tasks completed ({completionPercentage}%)
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddModal}
              className="btn btn-primary"
            >
              <Plus size={16} /> Add Study Task
            </button>
          </div>

          <div className="progress-bar-container" style={{ height: '8px' }}>
            <div
              className="progress-bar-fill"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* View Filter Tabs */}
        <div className="tab-container" style={{ marginBottom: '20px' }}>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'today' ? 'active' : ''}`}
            onClick={() => setActiveTab('today')}
          >
            Today's Tasks ({tasks.filter(t => t.date === todayStr && !t.completed).length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming ({tasks.filter(t => t.date > todayStr && !t.completed).length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed ({completedTasks})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Tasks ({totalTasks})
          </button>
        </div>

        {/* TASK LIST */}
        {filteredTasks.length === 0 ? (
          <EmptyState
            title={
              activeTab === 'today'
                ? "No Pending Tasks for Today"
                : activeTab === 'completed'
                ? "No Completed Tasks Yet"
                : "No Scheduled Tasks Found"
            }
            description="Organize your study blocks, assignments, and revision checklists in seconds."
            actionText="Create Study Task"
            onAction={handleOpenAddModal}
            icon={<BookOpen size={40} color="var(--text-secondary)" />}
          />
        ) : (
          <div>
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`task-item-card ${task.completed ? 'completed' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                  <button
                    type="button"
                    onClick={() => handleToggleComplete(task.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: '2px' }}
                    aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
                  >
                    {task.completed ? (
                      <CheckCircle size={22} color="var(--success)" />
                    ) : (
                      <Circle size={22} color="var(--text-muted)" />
                    )}
                  </button>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <span className="task-title" style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {task.topic}
                      </span>
                      <span className={`priority-badge priority-${task.priority}`}>
                        {task.priority} priority
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{task.subject}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} /> {task.date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} /> {task.startTime} ({task.durationMinutes} mins)
                      </span>
                    </div>

                    {task.notes && (
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                        {task.notes}
                      </p>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(task)}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '8px' }}
                    title="Edit task"
                    aria-label="Edit task"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '8px' }}
                    title="Delete task"
                    aria-label="Delete task"
                  >
                    <Trash2 size={15} color="var(--text-secondary)" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD / EDIT TASK MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.3rem' }}>
                {editingTaskId ? "Edit Study Task" : "Create Study Task"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn btn-outline btn-sm"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTask}>
              <div className="form-group">
                <label className="form-label" htmlFor="task-subject">
                  Subject Name *
                </label>
                <input
                  id="task-subject"
                  type="text"
                  className="form-input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Operating Systems"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="task-topic">
                  Topic / Goal *
                </label>
                <input
                  id="task-topic"
                  type="text"
                  className="form-input"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Memory Management & Paging practice"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="task-date">
                    Scheduled Date *
                  </label>
                  <input
                    id="task-date"
                    type="date"
                    className="form-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="task-start-time">
                    Start Time
                  </label>
                  <input
                    id="task-start-time"
                    type="time"
                    className="form-input"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="task-duration">
                    Duration (Minutes)
                  </label>
                  <input
                    id="task-duration"
                    type="number"
                    min="15"
                    step="15"
                    className="form-input"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    placeholder="60"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="task-priority">
                    Priority Level
                  </label>
                  <select
                    id="task-priority"
                    className="form-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="task-notes">
                  Additional Notes / Checklist
                </label>
                <textarea
                  id="task-notes"
                  className="form-textarea"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Complete textbook practice set exercises 1-5"
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
                  <Plus size={16} /> {editingTaskId ? "Save Changes" : "Add Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SEO EXPLANATORY CONTENT */}
      <section className="tool-content-section">
        <div className="content-block">
          <h2 className="content-h2">How to Create an Effective Study Plan</h2>
          <p className="content-p">
            A structured study plan transforms overwhelming course syllabi into bite-sized, actionable study sessions. Rather than studying passively, organizing tasks with defined time intervals and priority tags ensures balanced preparation across all subjects.
          </p>
        </div>

        <div className="content-block">
          <h2 className="content-h2">Top Study Planning Tips for Students</h2>
          <p className="content-p">
            • <strong>Time-Box Your Topics:</strong> Assign specific start times and durations (e.g., 60 minutes) to eliminate procrastination.<br />
            • <strong>Tackle High Priority First:</strong> Knock out difficult or impending coursework early in the day when your mental focus is sharpest.<br />
            • <strong>Track Completion Momentum:</strong> Checking off tasks provides visible evidence of progress, boosting confidence before exams.
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection faqs={faqs} />

      {/* RELATED TOOLS */}
      <RelatedTools currentToolId="study-planner" />
    </div>
  );
};
