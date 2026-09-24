export interface ToolConfig {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  badge?: string;
  category: 'Grading' | 'Attendance' | 'Calculations' | 'Planning';
  seoTitle: string;
  seoDescription: string;
  canonical: string;
  h1: string;
}

export interface GradeItem {
  id: string;
  subject: string;
  credits: number | string;
  grade: string;
}

export interface GradeOption {
  label: string;
  gradePoint: number;
}

export interface ExamItem {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  subject?: string;
  location?: string;
  targetScore?: string;
  notes?: string;
  createdAt: number;
}

export type TaskPriority = 'high' | 'medium' | 'low';

export interface StudyTask {
  id: string;
  subject: string;
  topic: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  durationMinutes: number;
  priority: TaskPriority;
  completed: boolean;
  notes?: string;
  createdAt: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
