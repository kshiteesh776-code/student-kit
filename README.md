# 🎓 StudentKit

> **"Free tools students actually need."**

A fast, clean, privacy-first academic utility platform built specifically for students. StudentKit provides 8 purpose-built calculation and planning tools with zero ads, zero paywalls, zero accounts, and 100% client-side execution.

---

## ⚡ The 8 Core Tools

1. **CGPA Calculator (`/student/cgpa-calculator`)**
   - Weighted cumulative grade point average calculation across semesters and courses with custom credit weights.
2. **SGPA Calculator (`/student/sgpa-calculator`)**
   - Single-semester academic performance computation with letter grade point conversions.
3. **Attendance Calculator (`/student/attendance-calculator`)**
   - Live percentage tracking, 75% college minimum eligibility checks, bunkable class allowances, and recovery targets.
4. **Percentage Calculator (`/student/percentage-calculator`)**
   - Bidirectional calculation: Marks Obtained $\rightarrow$ Percentage and Target Percentage $\rightarrow$ Required Marks.
5. **Marks Needed Calculator (`/student/marks-needed-calculator`)**
   - Computes exactly what score is needed in upcoming finals or internal assessments to secure an overall course target grade.
6. **GPA to Percentage (`/student/gpa-to-percentage`)**
   - Standard CBSE/AICTE $9.5\times$ formula, standard $10\times$ multiplier, and custom university conversion schemes.
7. **Exam Countdown (`/student/exam-countdown`)**
   - Live second-by-second countdown timers for midterms, finals, quizzes, and entrance exams with persistent `localStorage`.
8. **Study Planner (`/student/study-planner`)**
   - Daily study session organization, task priorities (High, Medium, Low), completion tracking, and local device persistence.

---

## ✨ Features & Guarantees

- **Live "Nearest Exam" on Homepage**: Automatically detects and displays the nearest upcoming exam countdown from your saved schedules in real time.
- **Frosted Glass Visual Aesthetics**: Clean white/gray layered palette, frosted glass containers, restrained blue accents, and modern DM Sans typography.
- **100% Client-Side & Private**: All calculations and saved data (exams & tasks) reside exclusively in your browser's `localStorage`. No login, no telemetry, no tracking.
- **Fully Responsive**: Optimized for desktop, tablet, and mobile screens with touch-friendly controls.
- **Instant Calculations**: Zero loading latency and instantaneous mathematical feedback with comprehensive edge-case handling.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: [DM Sans](https://fonts.google.com/specimen/DM+Sans) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- **Styling**: Vanilla CSS Design System with CSS Tokens & Glassmorphism

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kshiteesh776-code/student-kit.git
   cd student-kit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build & Deployment

To compile and produce an optimized production bundle:

```bash
# Type check and build production bundle
npm run build

# Preview production build locally
npm run preview
```

The production output will be generated in the `dist/` directory, ready to be deployed to any static hosting provider (Vercel, Netlify, Cloudflare Pages, GitHub Pages, etc.).

---

## 📁 Project Structure

```text
student-kit/
├── index.html              # HTML entry with DM Sans & JetBrains Mono fonts
├── package.json            # Project dependencies & scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite bundler configuration
└── src/
    ├── main.tsx            # Application root mount
    ├── App.tsx             # Route definitions & layout wrappers
    ├── config/
    │   └── tools.ts        # Central config for the 8 tools & grading scales
    ├── types/
    │   └── index.ts        # TypeScript interfaces and types
    ├── utils/
    │   ├── calculations.ts # Pure mathematical formula implementations
    │   └── storage.ts      # LocalStorage persistence helpers
    ├── styles/
    │   └── index.css       # Design tokens, frosted glass, and responsive CSS
    ├── components/
    │   ├── common/         # Navbar, Footer, Breadcrumbs, ToolCard, NextExamCard, etc.
    │   └── calculators/    # The 8 individual calculator & planner components
    └── pages/
        ├── HomePage.tsx
        ├── ToolDetailPage.tsx
        ├── AboutPage.tsx
        ├── PrivacyPolicyPage.tsx
        ├── TermsOfUsePage.tsx
        └── NotFoundPage.tsx
```

---

## 📊 Current Project Status

- **Status**: Active / v1.0.0 Stable Release
- **Maintained By**: StudentKit Community & Contributors
