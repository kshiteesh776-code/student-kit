import { GradeItem } from '../types';
import { GRADE_SCALE } from '../config/tools';

export interface CgpaResult {
  cgpa: number;
  totalCredits: number;
  totalGradePoints: number;
  subjectCount: number;
}

/**
 * Calculates CGPA or SGPA based on subjects, credits and grades.
 * Formula: Sum(GradePoint * Credits) / Sum(Credits)
 */
export function calculateGpa(items: GradeItem[]): CgpaResult {
  let totalCredits = 0;
  let totalGradePoints = 0;
  let validCount = 0;

  for (const item of items) {
    const credits = typeof item.credits === 'number' ? item.credits : parseFloat(item.credits);
    const gradePoint = GRADE_SCALE[item.grade] ?? 0;

    if (!isNaN(credits) && credits > 0) {
      totalCredits += credits;
      totalGradePoints += gradePoint * credits;
      validCount++;
    }
  }

  const cgpa = totalCredits > 0 ? parseFloat((totalGradePoints / totalCredits).toFixed(2)) : 0;

  return {
    cgpa,
    totalCredits: parseFloat(totalCredits.toFixed(1)),
    totalGradePoints: parseFloat(totalGradePoints.toFixed(2)),
    subjectCount: validCount
  };
}

export interface AttendanceResult {
  currentPercentage: number;
  classesAttended: number;
  totalClasses: number;
  classesMissed: number;
  missCalculation: {
    targetPercentage: number;
    canMiss: number;
    isEligible: boolean;
    explanation: string;
  };
  attendCalculation: {
    targetPercentage: number;
    neededToAttend: number;
    isAchieved: boolean;
    isImpossible: boolean;
    explanation: string;
  };
}

/**
 * Attendance calculation with rigorous edge cases and zero NaN/Infinity bugs.
 */
export function calculateAttendance(
  attended: number,
  total: number,
  requiredPercentage: number = 75,
  targetPercentage: number = 75
): AttendanceResult | null {
  if (isNaN(attended) || isNaN(total) || total <= 0 || attended < 0 || attended > total) {
    return null;
  }

  const currentPercentage = parseFloat(((attended / total) * 100).toFixed(2));
  const classesMissed = total - attended;

  // 1. How many classes can I miss while staying >= requiredPercentage?
  // Attended / (Total + M) >= Required/100
  // M <= (Attended * 100 / Required) - Total
  let canMiss = 0;
  let missEligible = false;
  let missExplanation = '';

  if (requiredPercentage <= 0) {
    canMiss = 999;
    missEligible = true;
    missExplanation = 'With a 0% requirement, you can miss unlimited classes.';
  } else if (currentPercentage >= requiredPercentage) {
    missEligible = true;
    const maxTotalClasses = Math.floor((attended * 100) / requiredPercentage);
    canMiss = Math.max(0, maxTotalClasses - total);
    if (canMiss > 0) {
      missExplanation = `You can safely miss the next ${canMiss} class${canMiss === 1 ? '' : 'es'} and still maintain at least ${requiredPercentage}% attendance.`;
    } else {
      missExplanation = `You are on the boundary! You cannot afford to miss any classes right now to keep ${requiredPercentage}%.`;
    }
  } else {
    missEligible = false;
    canMiss = 0;
    missExplanation = `Your current attendance (${currentPercentage}%) is already below the required ${requiredPercentage}%. You cannot miss any classes.`;
  }

  // 2. How many consecutive classes do I need to attend to reach targetPercentage?
  // (Attended + X) / (Total + X) >= Target/100
  // X >= (Target * Total - 100 * Attended) / (100 - Target)
  let neededToAttend = 0;
  let isAchieved = false;
  let isImpossible = false;
  let attendExplanation = '';

  if (currentPercentage >= targetPercentage) {
    isAchieved = true;
    neededToAttend = 0;
    attendExplanation = `Goal already achieved! Your attendance is ${currentPercentage}%, which meets or exceeds your target of ${targetPercentage}%.`;
  } else if (targetPercentage >= 100) {
    if (classesMissed > 0) {
      isImpossible = true;
      neededToAttend = 0;
      attendExplanation = `100% attendance is impossible because you have already missed ${classesMissed} class${classesMissed === 1 ? '' : 'es'}.`;
    } else {
      isAchieved = true;
      neededToAttend = 0;
      attendExplanation = `You have attended 100% of your classes so far!`;
    }
  } else {
    const numerator = targetPercentage * total - 100 * attended;
    const denominator = 100 - targetPercentage;
    if (denominator <= 0) {
      isImpossible = true;
      attendExplanation = 'Target percentage must be strictly below 100% to calculate achievable recovery.';
    } else {
      neededToAttend = Math.max(0, Math.ceil(numerator / denominator));
      const projectedTotal = total + neededToAttend;
      const projectedAttended = attended + neededToAttend;
      const projectedPct = ((projectedAttended / projectedTotal) * 100).toFixed(1);
      attendExplanation = `You need to attend the next ${neededToAttend} consecutive class${neededToAttend === 1 ? '' : 'es'} without missing any to reach ${projectedPct}% (target: ${targetPercentage}%).`;
    }
  }

  return {
    currentPercentage,
    classesAttended: attended,
    totalClasses: total,
    classesMissed,
    missCalculation: {
      targetPercentage: requiredPercentage,
      canMiss,
      isEligible: missEligible,
      explanation: missExplanation
    },
    attendCalculation: {
      targetPercentage,
      neededToAttend,
      isAchieved,
      isImpossible,
      explanation: attendExplanation
    }
  };
}

export interface MarksNeededResult {
  totalCourseMarks: number;
  marksObtained: number;
  remainingMarks: number;
  targetPercentage: number;
  targetMarksOverall: number;
  marksStillNeeded: number;
  requiredPercentageInRemaining: number;
  maxPossibleMarks: number;
  maxPossiblePercentage: number;
  isAchievable: boolean;
  isAlreadyAchieved: boolean;
  message: string;
}

/**
 * Calculates marks needed in remaining assessments to achieve target percentage.
 */
export function calculateMarksNeeded(
  totalCourseMarks: number,
  marksObtained: number,
  remainingMarks: number,
  targetPercentage: number
): MarksNeededResult | null {
  if (
    isNaN(totalCourseMarks) ||
    isNaN(marksObtained) ||
    isNaN(remainingMarks) ||
    isNaN(targetPercentage) ||
    totalCourseMarks <= 0 ||
    marksObtained < 0 ||
    remainingMarks < 0 ||
    targetPercentage < 0 ||
    targetPercentage > 100
  ) {
    return null;
  }

  const targetMarksOverall = parseFloat(((targetPercentage / 100) * totalCourseMarks).toFixed(2));
  const maxPossibleMarks = marksObtained + remainingMarks;
  const maxPossiblePercentage = parseFloat(((maxPossibleMarks / totalCourseMarks) * 100).toFixed(2));
  const rawMarksNeeded = targetMarksOverall - marksObtained;

  if (targetMarksOverall <= marksObtained) {
    return {
      totalCourseMarks,
      marksObtained,
      remainingMarks,
      targetPercentage,
      targetMarksOverall,
      marksStillNeeded: 0,
      requiredPercentageInRemaining: 0,
      maxPossibleMarks,
      maxPossiblePercentage,
      isAchievable: true,
      isAlreadyAchieved: true,
      message: `Congratulations! You have already secured ${marksObtained} marks, exceeding your target of ${targetMarksOverall} marks (${targetPercentage}%).`
    };
  }

  if (targetMarksOverall > maxPossibleMarks) {
    return {
      totalCourseMarks,
      marksObtained,
      remainingMarks,
      targetPercentage,
      targetMarksOverall,
      marksStillNeeded: parseFloat(rawMarksNeeded.toFixed(2)),
      requiredPercentageInRemaining: 0,
      maxPossibleMarks,
      maxPossiblePercentage,
      isAchievable: false,
      isAlreadyAchieved: false,
      message: `Target cannot be reached with the remaining marks. Even scoring 100% in remaining tests (${remainingMarks}/${remainingMarks}) yields ${maxPossibleMarks}/${totalCourseMarks} (${maxPossiblePercentage}%).`
    };
  }

  const marksStillNeeded = parseFloat(rawMarksNeeded.toFixed(2));
  const requiredPercentageInRemaining =
    remainingMarks > 0 ? parseFloat(((marksStillNeeded / remainingMarks) * 100).toFixed(2)) : 0;

  return {
    totalCourseMarks,
    marksObtained,
    remainingMarks,
    targetPercentage,
    targetMarksOverall,
    marksStillNeeded,
    requiredPercentageInRemaining,
    maxPossibleMarks,
    maxPossiblePercentage,
    isAchievable: true,
    isAlreadyAchieved: false,
    message: `You need ${marksStillNeeded} out of ${remainingMarks} marks (${requiredPercentageInRemaining}%) in your remaining assessments to achieve ${targetPercentage}%.`
  };
}

export interface PercentageResult {
  obtained: number;
  total: number;
  percentage: number;
}

export function calculatePercentage(obtained: number, total: number): PercentageResult | null {
  if (isNaN(obtained) || isNaN(total) || total <= 0 || obtained < 0) {
    return null;
  }
  const percentage = parseFloat(((obtained / total) * 100).toFixed(2));
  return {
    obtained,
    total,
    percentage
  };
}

export function calculateMarksFromPercentage(total: number, percentage: number): number | null {
  if (isNaN(total) || isNaN(percentage) || total <= 0 || percentage < 0) {
    return null;
  }
  return parseFloat(((percentage / 100) * total).toFixed(2));
}

export interface GpaConversionResult {
  gpa: number;
  method: '9.5' | '10' | 'custom';
  multiplier: number;
  percentage: number;
  formulaString: string;
}

export function convertGpaToPercentage(
  gpa: number,
  method: '9.5' | '10' | 'custom',
  customMultiplier: number = 9.5
): GpaConversionResult | null {
  if (isNaN(gpa) || gpa < 0 || gpa > 10) {
    return null;
  }

  let multiplier = 9.5;
  if (method === '10') {
    multiplier = 10;
  } else if (method === 'custom') {
    multiplier = !isNaN(customMultiplier) && customMultiplier > 0 ? customMultiplier : 9.5;
  }

  const rawPercentage = gpa * multiplier;
  const percentage = parseFloat(Math.min(100, Math.max(0, rawPercentage)).toFixed(2));

  return {
    gpa,
    method,
    multiplier,
    percentage,
    formulaString: `Percentage = CGPA (${gpa}) × ${multiplier}`
  };
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isPast: boolean;
}

export function calculateTimeRemaining(targetDateStr: string, targetTimeStr: string): CountdownTime {
  const target = new Date(`${targetDateStr}T${targetTimeStr || '09:00'}:00`);
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();

  if (isNaN(diffMs) || diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isPast: true
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    isPast: false
  };
}
