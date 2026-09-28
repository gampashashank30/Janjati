// ─────────────────────────────────────────────────────────────────────────────
// Deadline Engine — computes deadline status dynamically from real-world time
// All calculations are relative to Date.now() so the UI updates automatically
// as time passes without any code changes.
// ─────────────────────────────────────────────────────────────────────────────

import type { DeadlineConfig } from '../types';

export interface ResolvedDeadline {
  /** The actual Date object of the most recent application close date */
  date: Date;
  /** Formatted label, e.g. "31 Oct 2025" */
  label: string;
  /** True if the deadline has already passed (relative to now) */
  hasPassed: boolean;
  /** Days since it closed (positive) or days until it opens (negative) */
  daysAgo: number;
  /** The upcoming deadline date (for annually-recurring schemes) */
  nextDeadline?: Date;
  /** Formatted label for the next deadline */
  nextDeadlineLabel?: string;
  /** Days until the next deadline opens */
  daysUntilNext?: number;
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function formatDateLabel(d: Date): string {
  return `${String(d.getDate()).padStart(2, '0')} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * Given a DeadlineConfig and a reference "now" date, resolves the actual
 * deadline Date, whether it has passed, and info about the next cycle.
 */
export function resolveDeadline(
  config: DeadlineConfig,
  now: Date = new Date(),
): ResolvedDeadline {
  // -- Fixed (one-time) deadline
  if (config.fixedDeadline && !config.annualDeadline) {
    const date = new Date(config.fixedDeadline);
    date.setHours(23, 59, 59, 999);
    const hasPassed = now > date;
    const diffMs = now.getTime() - date.getTime();
    const daysAgo = Math.ceil(diffMs / 86_400_000);
    return { date, label: formatDateLabel(date), hasPassed, daysAgo };
  }

  // -- Annual recurring deadline
  if (config.annualDeadline) {
    const { month, day } = config.annualDeadline;
    const year = now.getFullYear();

    const thisYearDeadline = new Date(year, month - 1, day, 23, 59, 59, 999);
    const lastYearDeadline = new Date(year - 1, month - 1, day, 23, 59, 59, 999);
    const nextYearDeadline = new Date(year + 1, month - 1, day, 23, 59, 59, 999);

    let date: Date;
    if (now > thisYearDeadline) {
      date = thisYearDeadline;
    } else {
      date = lastYearDeadline;
    }

    const hasPassed = now > date;
    const diffMs = now.getTime() - date.getTime();
    const daysAgo = Math.ceil(diffMs / 86_400_000);

    const nextDeadline = now > thisYearDeadline ? nextYearDeadline : thisYearDeadline;
    const msUntilNext = nextDeadline.getTime() - now.getTime();
    const daysUntilNext = Math.ceil(msUntilNext / 86_400_000);

    return {
      date,
      label: formatDateLabel(date),
      hasPassed,
      daysAgo,
      nextDeadline,
      nextDeadlineLabel: formatDateLabel(nextDeadline),
      daysUntilNext,
    };
  }

  throw new Error(`DeadlineConfig must have annualDeadline or fixedDeadline: ${config.label}`);
}

/**
 * Returns true if the student MISSED the scheme:
 * - The deadline has passed AND
 * - There is no active/successful application for the scheme
 */
export function isMissed(
  config: DeadlineConfig,
  applicationStatus: string | undefined,
  now: Date = new Date(),
): boolean {
  const resolved = resolveDeadline(config, now);
  if (!resolved.hasPassed) return false;
  const notMissed = ['submitted', 'under_verification', 'approved', 'sanctioned'];
  return !applicationStatus || !notMissed.includes(applicationStatus);
}

/**
 * Human-readable time-since label, e.g. "2 months ago", "15 days ago"
 */
export function timeAgoLabel(daysAgo: number): string {
  if (daysAgo <= 0) return 'just now';
  if (daysAgo === 1) return 'yesterday';
  if (daysAgo < 30) return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  if (daysAgo < 365) {
    const months = Math.round(daysAgo / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
  const years = Math.round(daysAgo / 365);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}
