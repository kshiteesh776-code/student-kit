import { ExamItem, StudyTask } from '../types';

const EXAMS_KEY = 'studentkit_exams_v1';
const TASKS_KEY = 'studentkit_tasks_v1';

export function getStoredExams(): ExamItem[] {
  try {
    const raw = localStorage.getItem(EXAMS_KEY);
    if (!raw) {
      return [];
    }
    const parsed: ExamItem[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Filter out previous preset dummy items if user never added them
    const cleaned = parsed.filter(
      (item) =>
        item.name !== 'Data Structures & Algorithms Final' &&
        item.name !== 'Applied Mathematics Midterm' &&
        item.id !== 'exam-1' &&
        item.id !== 'exam-2'
    );
    if (cleaned.length !== parsed.length) {
      localStorage.setItem(EXAMS_KEY, JSON.stringify(cleaned));
      return cleaned;
    }
    return parsed;
  } catch (err) {
    console.error('Failed to load exams from localStorage', err);
    return [];
  }
}

export function saveStoredExams(exams: ExamItem[]): void {
  try {
    localStorage.setItem(EXAMS_KEY, JSON.stringify(exams));
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('studentkit_exams_updated'));
  } catch (err) {
    console.error('Failed to save exams to localStorage', err);
  }
}

export function getStoredTasks(): StudyTask[] {
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    if (!raw) {
      return [];
    }
    const parsed: StudyTask[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Filter out previous preset dummy tasks
    const cleaned = parsed.filter(
      (item) => item.id !== 'task-1' && item.id !== 'task-2' && item.id !== 'task-3'
    );
    if (cleaned.length !== parsed.length) {
      localStorage.setItem(TASKS_KEY, JSON.stringify(cleaned));
      return cleaned;
    }
    return parsed;
  } catch (err) {
    console.error('Failed to load study tasks from localStorage', err);
    return [];
  }
}

export function saveStoredTasks(tasks: StudyTask[]): void {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('studentkit_tasks_updated'));
  } catch (err) {
    console.error('Failed to save study tasks to localStorage', err);
  }
}

