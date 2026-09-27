import { ChevronRight } from 'lucide-react';
import type { ScholarshipScheme } from '../types';
import type { Application } from '../types';
import { statusLabel, statusBadgeClass } from '../utils/format';
import { useApp } from '../context/AppContext';
import { getLocalizedScholarship, UI_TERMS } from '../utils/localizedContent';

interface ScholarshipCardProps {
  scheme: ScholarshipScheme;
  application?: Application;
  onView: (id: string) => void;
  onApply: (id: string) => void;
}

const LEVEL_TAGS: Record<string, { bg: string; color: string }> = {
  'Pre-Matric':        { bg: '#eff6ff', color: '#2563eb' },
  'Post-Matric':       { bg: '#f5f3ff', color: '#7c3aed' },
  'Higher Education':  { bg: '#f0fdf4', color: '#15803d' },
  'Fellowship':        { bg: '#fff7ed', color: '#c2410c' },
  'Overseas':          { bg: '#f0faf9', color: '#0F766E' },
  'Skill Development': { bg: '#ecfeff', color: '#0891b2' },
  'Education Loan':    { bg: '#fef3c7', color: '#b45309' },
  'Livelihood':        { bg: '#ecfdf5', color: '#059669' },
  'Entrepreneurship':  { bg: '#fdf2f8', color: '#db2777' },
  'Women Empowerment': { bg: '#fdf4ff', color: '#9333ea' },
  'School Education':  { bg: '#e0e7ff', color: '#4338ca' },
  'Community Finance': { bg: '#fffbeb', color: '#d97706' },
};

export function ScholarshipCard({ scheme, application, onView, onApply }: ScholarshipCardProps) {
  const { language } = useApp();
  const localizedScheme = getLocalizedScholarship(scheme, language);
  const tag = LEVEL_TAGS[scheme.level] ?? { bg: '#f1f5f9', color: '#475569' };
  const hasApplied = application && application.status !== 'not_applied';

  const tTerm = (key: string) => UI_TERMS[key]?.[language] || UI_TERMS[key]?.en || key;

  return (
    <article className="card overflow-hidden" aria-label={localizedScheme.name}>
      {/* Colored top accent */}
      <div className="h-1" style={{ background: tag.color }} aria-hidden />

      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span
            className="tag"
            style={{ background: tag.bg, color: tag.color }}
          >
            {localizedScheme.level}
          </span>
          {hasApplied && (
            <span className={`badge ${statusBadgeClass(application!.status)}`}>
              {statusLabel(application!.status)}
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold text-gray-900 leading-snug">{localizedScheme.name}</h3>
        <p className="text-[11px] text-gray-400 mt-0.5 font-medium">{localizedScheme.schemeCode}</p>
      </div>

      {/* Body */}
      <div className="px-4 pb-3">
        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{localizedScheme.description}</p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="bg-gray-50 rounded-lg px-3 py-2">
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{tTerm('income_limit')}</p>
            <p className="text-xs font-bold text-gray-800 mt-0.5">
              {scheme.eligibility.incomeLimit
                ? `₹${(scheme.eligibility.incomeLimit / 100000).toFixed(1)}L/yr`
                : tTerm('no_income_bar')}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg px-3 py-2">
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{tTerm('eligibility')}</p>
            <p className="text-xs font-bold text-gray-800 mt-0.5 truncate">
              {scheme.eligibility.classRange
                ? `Class ${scheme.eligibility.classRange.min}${scheme.eligibility.classRange.max === 999 ? '+' : `–${scheme.eligibility.classRange.max}`}`
                : scheme.eligibility.ageLimit?.max
                  ? `Age ≤ ${scheme.eligibility.ageLimit.max} yrs`
                  : scheme.level}
            </p>
          </div>
        </div>

        {application?.applicationNumber && (
          <div className="mt-3 bg-gray-50 rounded-lg px-3 py-2">
            <p className="text-[10px] text-gray-400 font-medium">Application No.</p>
            <p className="text-xs font-mono font-semibold text-gray-800 mt-0.5">{application.applicationNumber}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex gap-2.5">
        <button
          id={`view-scheme-${scheme.id}`}
          onClick={() => onView(scheme.id)}
          className="flex-1 flex items-center justify-center gap-1 py-2.5 text-xs font-bold text-[#0F766E] border border-[#0F766E] rounded-xl transition-colors hover:bg-[#f0faf9] active:bg-[#e6f4f3]"
          aria-label={`View details of ${localizedScheme.name}`}
        >
          {tTerm('details')} <ChevronRight size={13} />
        </button>
        <button
          id={`apply-scheme-${scheme.id}`}
          onClick={() => hasApplied ? onView(scheme.id) : onApply(scheme.id)}
          className="flex-1 py-2.5 text-xs font-bold text-white rounded-xl transition-colors"
          style={{ background: '#0F766E' }}
          aria-label={hasApplied ? `Track ${localizedScheme.name}` : `Apply for ${localizedScheme.name}`}
        >
          {hasApplied ? tTerm('applied') : tTerm('apply_now')}
        </button>
      </div>
    </article>
  );
}
