import { ToolConfig } from '../types';

export const TOOLS: ToolConfig[] = [
  {
    id: 'cgpa-calculator',
    title: 'CGPA Calculator',
    slug: '/student/cgpa-calculator',
    shortDescription: 'Calculate your cumulative GPA using subject grades and credits.',
    fullDescription: 'Easily calculate your Cumulative Grade Point Average (CGPA) from your subject grades and credit points with weighted credit-hour mathematics.',
    icon: 'GraduationCap',
    badge: 'Popular',
    category: 'Grading',
    seoTitle: 'CGPA Calculator – Calculate Your CGPA Online | StudentKit',
    seoDescription: 'Calculate your cumulative GPA easily using subject credits and grade points. Free, instant, and accurate CGPA calculator with formula breakdown.',
    canonical: 'https://studentkit.dev/student/cgpa-calculator',
    h1: 'CGPA Calculator'
  },
  {
    id: 'sgpa-calculator',
    title: 'SGPA Calculator',
    slug: '/student/sgpa-calculator',
    shortDescription: 'Calculate your semester GPA from your subjects and credits.',
    fullDescription: 'Compute your Semester Grade Point Average (SGPA) for any academic term based on subject credits and letter grade conversions.',
    icon: 'Award',
    category: 'Grading',
    seoTitle: 'SGPA Calculator – Calculate Semester GPA Online | StudentKit',
    seoDescription: 'Free SGPA calculator to compute your semester grade point average accurately. Add subjects, credits, and grades to see immediate results.',
    canonical: 'https://studentkit.dev/student/sgpa-calculator',
    h1: 'SGPA Calculator'
  },
  {
    id: 'attendance-calculator',
    title: 'Attendance Calculator',
    slug: '/student/attendance-calculator',
    shortDescription: 'Calculate your attendance and find how many classes you can miss or need to attend.',
    fullDescription: 'Track your current class attendance percentage and find out exactly how many bunkable classes you have left or classes needed to hit 75%/85%.',
    icon: 'CheckCircle2',
    badge: 'Essential',
    category: 'Attendance',
    seoTitle: 'Attendance Calculator – Calculate Required Attendance | StudentKit',
    seoDescription: 'Calculate your attendance percentage, how many classes you can afford to miss, and how many you must attend to maintain required criteria.',
    canonical: 'https://studentkit.dev/student/attendance-calculator',
    h1: 'Attendance Calculator'
  },
  {
    id: 'percentage-calculator',
    title: 'Percentage Calculator',
    slug: '/student/percentage-calculator',
    shortDescription: 'Calculate percentages from marks quickly and easily.',
    fullDescription: 'Two-in-one percentage utility: convert marks obtained to percentage or calculate the exact marks required for a target percentage.',
    icon: 'Percent',
    category: 'Calculations',
    seoTitle: 'Percentage Calculator – Calculate Marks Percentage | StudentKit',
    seoDescription: 'Free student percentage calculator. Convert exam marks to percentage and find exact marks from target percentages instantly.',
    canonical: 'https://studentkit.dev/student/percentage-calculator',
    h1: 'Percentage Calculator'
  },
  {
    id: 'marks-needed-calculator',
    title: 'Marks Needed Calculator',
    slug: '/student/marks-needed-calculator',
    shortDescription: 'Find out how many marks you need to reach your target.',
    fullDescription: 'Determine the exact marks needed in final exams or upcoming assignments to achieve your overall course target grade percentage.',
    icon: 'Target',
    badge: 'High Demand',
    category: 'Calculations',
    seoTitle: 'Marks Needed Calculator – Calculate Required Marks | StudentKit',
    seoDescription: 'Find out exactly how many marks you need in your remaining exams or assignments to achieve your target course grade and percentage.',
    canonical: 'https://studentkit.dev/student/marks-needed-calculator',
    h1: 'Marks Needed Calculator'
  },
  {
    id: 'gpa-to-percentage',
    title: 'GPA to Percentage',
    slug: '/student/gpa-to-percentage',
    shortDescription: 'Convert GPA or CGPA into percentage using your selected conversion method.',
    fullDescription: 'Convert your 10-point, CBSE, AICTE or custom university GPA/CGPA into an accurate percentage equivalent with clear formula details.',
    icon: 'ArrowRightLeft',
    category: 'Grading',
    seoTitle: 'GPA to Percentage Calculator – Convert GPA to Percentage | StudentKit',
    seoDescription: 'Convert 10-point GPA and CGPA to percentage using standard university multipliers (9.5, 10, or custom). Fast, accurate, and free conversion.',
    canonical: 'https://studentkit.dev/student/gpa-to-percentage',
    h1: 'GPA to Percentage Calculator'
  },
  {
    id: 'exam-countdown',
    title: 'Exam Countdown',
    slug: '/student/exam-countdown',
    shortDescription: 'Track the time remaining until your upcoming exams.',
    fullDescription: 'Live countdown timers down to the exact second for all your upcoming midterms, finals, practicals, and university tests. Saved locally.',
    icon: 'Clock',
    badge: 'Live Timer',
    category: 'Planning',
    seoTitle: 'Exam Countdown – Track Your Upcoming Exams | StudentKit',
    seoDescription: 'Track your upcoming exams with live countdown clocks showing days, hours, minutes, and seconds. Auto-saved locally in your browser.',
    canonical: 'https://studentkit.dev/student/exam-countdown',
    h1: 'Exam Countdown'
  },
  {
    id: 'study-planner',
    title: 'Study Planner',
    slug: '/student/study-planner',
    shortDescription: 'Organize your subjects, topics and study tasks.',
    fullDescription: 'Lightweight study manager to organize daily and upcoming study sessions, track completion progress, and prioritize high-impact topics.',
    icon: 'CalendarCheck',
    badge: 'Productivity',
    category: 'Planning',
    seoTitle: 'Study Planner – Plan Your Study Schedule | StudentKit',
    seoDescription: 'Free offline-first study planner. Organize subjects, schedule study blocks, set priorities, and track completion progress with zero login.',
    canonical: 'https://studentkit.dev/student/study-planner',
    h1: 'Study Planner'
  }
];

export const GRADE_SCALE: Record<string, number> = {
  'A+': 10,
  'A': 9,
  'B+': 8,
  'B': 7,
  'C+': 6,
  'C': 5,
  'D': 4,
  'F': 0
};

export const GRADE_OPTIONS = [
  { label: 'A+ (10 pts - Outstanding)', gradePoint: 10, value: 'A+' },
  { label: 'A (9 pts - Excellent)', gradePoint: 9, value: 'A' },
  { label: 'B+ (8 pts - Very Good)', gradePoint: 8, value: 'B+' },
  { label: 'B (7 pts - Good)', gradePoint: 7, value: 'B' },
  { label: 'C+ (6 pts - Above Average)', gradePoint: 6, value: 'C+' },
  { label: 'C (5 pts - Average)', gradePoint: 5, value: 'C' },
  { label: 'D (4 pts - Pass)', gradePoint: 4, value: 'D' },
  { label: 'F (0 pts - Fail)', gradePoint: 0, value: 'F' }
];
