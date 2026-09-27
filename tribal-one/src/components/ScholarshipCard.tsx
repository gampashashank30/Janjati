import { ChevronRight } from 'lucide-react';
import type { ScholarshipScheme } from '../types';
import type { Application } from '../types';
import { statusLabel, statusBadgeClass } from '../utils/format';

interface ScholarshipCardProps {
  scheme: ScholarshipScheme;
  application?: Application;
  onView: (id: string) => void;
  onApply: (id: string) => void;
}

const LEVEL_TAGS: Record<string, { bg: string; color: string }> = {
  'Pre-Matric':      { bg: '#eff6ff', color: '#2563eb' },
  'Post-Matric':     { bg: '#f5f3ff', color: '#7c3aed' },
  'Higher Education':{ bg: '#f0fdf4', color: '#15803d' },
  'Fellowship':      { bg: '#fff7ed', color: '#c2410c' },
  'Overseas':        { bg: '#f0faf9', color: '#0F766E' },
};

export function ScholarshipCard({ scheme, application, onView, onApply }: ScholarshipCardProps) {
  const tag = LEVEL_TAGS[scheme.level] ?? { bg: '#f1f5f9', color: '#475569' };
  const hasApplied = application && application.status !== 'not_applied';

  return (
    <article className="card overflow-hidden" aria-label={scheme.name}>
      {/* Colored top accent */}
      <div className="h-1" style={{ background: tag.color }} aria-hidden />

      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span
            className="tag"
            style={{ background: tag.bg, color: tag.color }}
          >
            {scheme.level}
          </span>
          {hasApplied && (
            <span className={`badge ${statusBadgeClass(application!.status)}`}>
              {statusLabel(application!.status)}
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold text-gray-900 leading-snug">{scheme.name}</h3>
        <p className="text-[11px] text-gray-400 mt-0.5 font-medium">{scheme.schemeCode}</p>
      </div>

      {/* Body */}
      <div className="px-4 pb-3">
        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{scheme.description}</p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="bg-gray-50 rounded-lg px-3 py-2">
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Income Limit</p>
            <p className="text-xs font-bold text-gray-800 mt-0.5">
              {scheme.eligibility.incomeLimit
                ? `Rs. ${(scheme.eligibility.incomeLimit / 100000).toFixed(1)}L/yr`
                : 'No limit'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg px-3 py-2">
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Level</p>
            <p className="text-xs font-bold text-gray-800 mt-0.5">
              {scheme.eligibility.classRange
                ? `Class ${scheme.eligibility.classRange.min}${scheme.eligibility.classRange.max === 999 ? '+' : `–${scheme.eligibility.classRange.max}`}`
                : scheme.eligibility.ageLimit?.max
                  ? `Age ≤ ${scheme.eligibility.ageLimit.max}`
                  : 'M.Phil / PhD'}
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
          aria-label={`View details of ${scheme.name}`}
        >
          Details <ChevronRight size={13} />
        </button>
        <button
          id={`apply-scheme-${scheme.id}`}
          onClick={() => hasApplied ? onView(scheme.id) : onApply(scheme.id)}
          className="flex-1 py-2.5 text-xs font-bold text-white rounded-xl transition-colors"
          style={{ background: '#0F766E' }}
          aria-label={hasApplied ? `Track ${scheme.name}` : `Apply for ${scheme.name}`}
        >
          {hasApplied ? 'Track Status' : 'Apply Now'}
        </button>
      </div>
    </article>
  );
}
