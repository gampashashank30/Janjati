import { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BookOpen,
  GraduationCap,
  Globe,
  Award,
  Landmark,
  School,
  Sparkles,
  Coins,
  HeartHandshake,
  Building,
  Briefcase,
  Trees,
  Users,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  FileX,
  ChevronRight,
  XCircle,
  CheckCircle2,
  FileWarning,
  ShieldAlert,
  Lightbulb,
  Check,
  PenLine,
  FileText,
  CreditCard,
  User,
} from 'lucide-react';
import { SCHOLARSHIPS } from '../data/scholarships';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { StatusTimeline } from '../components/StatusTimeline';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/format';
import { resolveDeadline, timeAgoLabel } from '../utils/deadlines';
import type { ScholarshipScheme } from '../types';
import {
  SCHOLARSHIP_CATEGORY_LABELS,
  UI_TERMS,
  getLocalizedScholarship,
} from '../utils/localizedContent';

type View = 'list' | 'detail' | 'apply';

// Comprehensive scheme icon mapping for all 15 verified schemes
const SCHEME_ICONS: Record<string, { Icon: React.FC<{ size?: number; style?: React.CSSProperties }>; bg: string; color: string }> = {
  pre_matric:        { Icon: BookOpen,       bg: '#eff6ff', color: '#2563eb' },
  post_matric:       { Icon: GraduationCap,  bg: '#f5f3ff', color: '#7c3aed' },
  top_class:         { Icon: Award,          bg: '#f0fdf4', color: '#16a34a' },
  nfst:              { Icon: Landmark,       bg: '#fff7ed', color: '#c2410c' },
  nos:               { Icon: Globe,          bg: '#f0faf9', color: '#0F766E' },
  emrs:              { Icon: School,         bg: '#eef2ff', color: '#4f46e5' },
  goal_program:      { Icon: Sparkles,       bg: '#ecfeff', color: '#0891b2' },
  asry_loan:         { Icon: Coins,          bg: '#fef3c7', color: '#d97706' },
  amsy_scheme:       { Icon: HeartHandshake, bg: '#fdf4ff', color: '#9333ea' },
  nstfdc_term_loan:  { Icon: Building,       bg: '#fdf2f8', color: '#db2777' },
  vcf_st:            { Icon: Briefcase,      bg: '#fef2f2', color: '#dc2626' },
  pm_janman_hostels: { Icon: School,         bg: '#ecfdf5', color: '#059669' },
  tfdes_scheme:      { Icon: Trees,          bg: '#f0fdf4', color: '#15803d' },
  micro_credit_st:   { Icon: Users,          bg: '#fffbeb', color: '#b45309' },
  pmvky_fellowship:  { Icon: GraduationCap,  bg: '#eff6ff', color: '#1d4ed8' },
};

const CATEGORIES = [
  { id: 'all', label: 'All Schemes' },
  { id: 'scholarships', label: 'Scholarships' },
  { id: 'fellowship', label: 'Fellowships' },
  { id: 'loans', label: 'Loans & Credit' },
  { id: 'school', label: 'School & PVTG' },
  { id: 'livelihood', label: 'Livelihood & Skills' },
] as const;

export function ScholarshipsScreen() {
  const { applications, payments, language, t, scholarshipFilter, clearScholarshipFilter } = useApp();
  const [view, setView] = useState<View>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  // activeFilter drives the "My Applications" overlay shown when deep-linked from Home
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Consume the deep-link filter once when the component mounts or filter changes
  useEffect(() => {
    if (scholarshipFilter) {
      setActiveFilter(scholarshipFilter);
      clearScholarshipFilter();
    }
  }, [scholarshipFilter, clearScholarshipFilter]);

  const selectedScheme = SCHOLARSHIPS.find((s) => s.id === selectedId);

  function handleView(id: string) { setSelectedId(id); setView('detail'); }
  function handleApply(id: string) { setSelectedId(id); setView('apply'); }

  const filteredSchemes = useMemo(() => {
    return SCHOLARSHIPS.filter((scheme) => {
      // Category filter
      let matchesCategory = true;
      if (selectedCategory === 'scholarships') {
        matchesCategory = ['Pre-Matric', 'Post-Matric', 'Higher Education', 'Overseas'].includes(scheme.level);
      } else if (selectedCategory === 'fellowship') {
        matchesCategory = scheme.level === 'Fellowship';
      } else if (selectedCategory === 'loans') {
        matchesCategory = ['Education Loan', 'Entrepreneurship', 'Community Finance'].includes(scheme.level);
      } else if (selectedCategory === 'school') {
        matchesCategory = scheme.level === 'School Education';
      } else if (selectedCategory === 'livelihood') {
        matchesCategory = ['Livelihood', 'Skill Development', 'Women Empowerment'].includes(scheme.level);
      }

      // Search query filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchesSearch =
          scheme.name.toLowerCase().includes(q) ||
          scheme.shortName.toLowerCase().includes(q) ||
          scheme.level.toLowerCase().includes(q) ||
          scheme.description.toLowerCase().includes(q) ||
          scheme.schemeCode.toLowerCase().includes(q);
      }

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  if (view === 'detail' && selectedScheme) {
    return (
      <SchemeDetail
        scheme={selectedScheme}
        payment={payments.find((p) => p.schemeId === selectedScheme.id)}
        onBack={() => setView('list')}
        onApply={() => setView('apply')}
        application={applications.find((a) => a.schemeId === selectedScheme.id)}
      />
    );
  }

  if (view === 'apply' && selectedScheme) {
    return (
      <ApplicationForm
        scheme={selectedScheme}
        onBack={() => setView('detail')}
        onDone={() => {
          setActiveFilter('my_applications');
          setView('list');
        }}
      />
    );
  }

  return (
    <div className="pb-24 bg-[#f5f7fa] min-h-screen">
      {/* Header */}
      <header className="bg-[#0F766E] px-4 pt-12 pb-6">
        <p className="text-white/70 text-[11px] font-semibold uppercase tracking-wider mb-1">
          {t('mota_title')} & NSTFDC
        </p>
        <h1 className="text-white text-xl font-bold tracking-tight">
          {UI_TERMS.scholarships_title[language] || 'Tribal Schemes & Scholarships'}
        </h1>
        <p className="text-white/80 text-xs mt-1">
          {UI_TERMS.scholarships_sub[language] || '15 Verified Central Sector Schemes for ST Students & Citizens'}
        </p>

        {/* Search input */}
        <div className="relative mt-4">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search_scholarships_placeholder')}
            className="w-full bg-white/95 pl-10 pr-4 py-2.5 rounded-xl text-xs text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </header>

      {/* ── Deep-link filter banner (shown when navigated from Home stat cards) ── */}
      {activeFilter && (() => {
        const filterCfg: Record<string, { label: string; color: string; bg: string; border: string; statusFilter: string[] }> = {
          my_applications:    { label: 'Active Applications',   color: '#0F766E', bg: '#f0faf9', border: '#99f6e4', statusFilter: ['submitted','under_verification','draft'] },
          approved:           { label: 'Approved & Sanctioned', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0', statusFilter: ['approved','sanctioned'] },
          under_verification: { label: 'Under Verification',    color: '#d97706', bg: '#fffbeb', border: '#fde68a', statusFilter: ['under_verification'] },
        };
        const cfg = filterCfg[activeFilter];
        if (!cfg) return null;
        const filtered = applications.filter((a) => cfg.statusFilter.includes(a.status));
        return (
          <div className="px-4 mt-3 mb-1">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: `1.5px solid ${cfg.border}`, background: cfg.bg }}
            >
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: `1px solid ${cfg.border}` }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: cfg.color }} />
                  <p className="text-sm font-bold" style={{ color: cfg.color }}>{cfg.label}</p>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: cfg.border, color: cfg.color }}
                  >
                    {filtered.length}
                  </span>
                </div>
                <button
                  onClick={() => setActiveFilter(null)}
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: cfg.border }}
                  aria-label="Clear filter"
                >
                  <XCircle size={13} style={{ color: cfg.color }} />
                </button>
              </div>
              {filtered.length === 0 ? (
                <div className="px-4 py-4 text-xs text-gray-500 text-center">No applications found.</div>
              ) : (
                <div className="divide-y" style={{ borderColor: cfg.border }}>
                  {filtered.map((app) => {
                    const scheme = SCHOLARSHIPS.find((s) => s.id === app.schemeId);
                    const iconCfg = SCHEME_ICONS[app.schemeId] ?? { Icon: BookOpen, bg: '#eff6ff', color: '#2563eb' };
                    return (
                      <button
                        key={app.id}
                        onClick={() => scheme && handleView(scheme.id)}
                        className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-white/60 transition-colors"
                        aria-label={app.schemeName}
                      >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: iconCfg.bg }}>
                          <iconCfg.Icon size={17} style={{ color: iconCfg.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-900 leading-snug truncate">{app.schemeName}</p>
                          {app.applicationNumber && (
                            <p className="text-[10px] text-gray-400 font-mono mt-0.5">{app.applicationNumber}</p>
                          )}
                          {app.remarks && (
                            <p className="text-[10px] text-gray-500 mt-0.5 truncate">{app.remarks}</p>
                          )}
                        </div>
                        <ChevronRight size={14} className="text-gray-300 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* Quick scheme icon carousel */}
      <div className="px-4 -mt-3">
        <div className="card p-3.5 shadow-sm">
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">
              {language === 'te' ? 'అన్ని 15 పథకాలు' : language === 'hi' ? 'सभी 15 योजनाएं' : language === 'kn' ? 'ಎಲ್ಲಾ 15 ಯೋಜನೆಗಳು' : language === 'ta' ? 'அனைத்து 15 திட்டங்கள்' : language === 'ml' ? 'എല്ലാ 15 പദ്ധതികളും' : 'All 15 Schemes at a Glance'}
            </p>
            <span className="text-[10px] bg-teal-50 text-[#0F766E] font-semibold px-2 py-0.5 rounded-full">
              {SCHOLARSHIPS.length} {t('verified')}
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1.5 scrollbar-none">
            {SCHOLARSHIPS.map((s) => {
              const cfg = SCHEME_ICONS[s.id] ?? { Icon: BookOpen, bg: '#eff6ff', color: '#2563eb' };
              const localized = getLocalizedScholarship(s, language);
              return (
                <button
                  key={s.id}
                  id={`quick-scheme-${s.id}`}
                  onClick={() => handleView(s.id)}
                  className="flex flex-col items-center gap-1 shrink-0 group w-14"
                  aria-label={localized.name}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-active:scale-95 shadow-xs"
                    style={{ background: cfg.bg, border: `1.5px solid ${cfg.color}30` }}
                  >
                    <cfg.Icon size={20} style={{ color: cfg.color }} />
                  </div>
                  <span className="text-[9px] font-semibold text-gray-600 text-center leading-tight line-clamp-1 w-full">
                    {localized.shortName.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="px-4 mt-3">
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            const categoryLabel = SCHOLARSHIP_CATEGORY_LABELS[cat.id]?.[language] || cat.label;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {categoryLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Missed Opportunities ── */}
      <MissedOpportunitiesSection
        applications={applications}
        onView={handleView}
      />

      {/* Full scheme cards */}
      <div className="px-4 mt-3 space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Showing {filteredSchemes.length} of {SCHOLARSHIPS.length} Schemes
          </p>
          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="text-xs text-[#0F766E] font-semibold hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {filteredSchemes.length === 0 ? (
          <div className="card p-8 text-center">
            <Filter size={32} className="mx-auto text-gray-300 mb-2" />
            <p className="text-sm font-semibold text-gray-700">No schemes found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search query or category filter</p>
          </div>
        ) : (
          filteredSchemes.map((scheme) => (
            <ScholarshipCard
              key={scheme.id}
              scheme={scheme}
              application={applications.find((a) => a.schemeId === scheme.id)}
              onView={handleView}
              onApply={handleApply}
            />
          ))
        )}

        <div className="card-sm px-4 py-3">
          <p className="text-[11px] text-gray-500 leading-relaxed">
            <span className="font-semibold text-gray-700">Official Portals:</span>{' '}
            tribal.nic.in · scholarships.gov.in · nstfdc.tribal.gov.in · emrs.tribal.gov.in · goal.tribal.gov.in · vcfst.in · pmjanman.tribal.gov.in
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Missed Opportunities Section ──

type MissReason = 'deadline_passed' | 'draft_not_submitted' | 'not_applied';

interface MissedScheme {
  scheme: (typeof SCHOLARSHIPS)[0];
  reason: MissReason;
  resolvedLabel: string;   // computed deadline that passed
  agoLabel: string;        // e.g. "11 months ago"
  nextLabel?: string;      // next window date
}

const MISS_REASON_CFG: Record<MissReason, { label: string; color: string; bg: string; border: string; Icon: React.FC<{ size?: number; style?: React.CSSProperties }> }> = {
  draft_not_submitted: {
    label: 'Draft Not Submitted',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    Icon: FileX,
  },
  deadline_passed: {
    label: 'Deadline Passed',
    color: '#dc2626',
    bg: '#fef2f2',
    border: '#fecaca',
    Icon: Clock,
  },
  not_applied: {
    label: 'Not Applied',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    Icon: AlertTriangle,
  },
};

// Schemes the student (MBBS, ST, income ₹1.48L, Maharashtra) was eligible for.
// Only IDs + base reason — all dates are computed at runtime from deadlineConfig.
const MISSED_SCHEME_IDS: { id: string; baseReason: MissReason }[] = [
  { id: 'pre_matric',       baseReason: 'deadline_passed'    },
  { id: 'nos',              baseReason: 'not_applied'         },
  { id: 'pmvky_fellowship', baseReason: 'not_applied'         },
  { id: 'nfst',             baseReason: 'draft_not_submitted' },
];

function MissedOpportunitiesSection({
  applications,
  onView,
}: {
  applications: ReturnType<typeof useApp>['applications'];
  onView: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);

  const missed: MissedScheme[] = useMemo(() => {
    const now = new Date();
    const result: MissedScheme[] = [];
    for (const { id, baseReason } of MISSED_SCHEME_IDS) {
      const app = applications.find((a) => a.schemeId === id);
      if (app && ['sanctioned', 'approved', 'under_verification', 'submitted'].includes(app.status)) continue;
      const scheme = SCHOLARSHIPS.find((s) => s.id === id);
      if (!scheme) continue;

      const effectiveReason: MissReason =
        app?.status === 'draft' ? 'draft_not_submitted' : baseReason;

      let resolvedLabel = 'Check portal';
      let agoLabel = '';
      let nextLabel: string | undefined;

      if (scheme.deadlineConfig) {
        try {
          const r = resolveDeadline(scheme.deadlineConfig, now);
          resolvedLabel = r.label;
          agoLabel = timeAgoLabel(r.daysAgo);
          nextLabel = r.nextDeadlineLabel;
        } catch {
          resolvedLabel = 'See portal';
        }
      }

      result.push({ scheme, reason: effectiveReason, resolvedLabel, agoLabel, nextLabel });
    }
    return result;
  }, [applications]);

  if (missed.length === 0) return null;

  return (
    <div className="px-4 mt-3">
      {/* Header toggle */}
      <button
        id="missed-opportunities-toggle"
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between mb-2.5"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: '#fef2f2' }}
            aria-hidden
          >
            <AlertTriangle size={13} style={{ color: '#dc2626' }} />
          </div>
          <p className="text-sm font-bold text-gray-900">Missed Opportunities</p>
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: '#fef2f2', color: '#dc2626' }}
          >
            {missed.length}
          </span>
        </div>
        {expanded
          ? <ChevronUp size={15} className="text-gray-400" />
          : <ChevronDown size={15} className="text-gray-400" />}
      </button>

      {expanded && (
        <div className="space-y-2.5">
          {/* Explanation banner */}
          <div
            className="rounded-xl px-3.5 py-3 flex items-start gap-2.5"
            style={{
              background: 'linear-gradient(135deg, #fff7ed 0%, #fef2f2 100%)',
              border: '1px solid #fde68a',
            }}
          >
            <AlertTriangle size={14} style={{ color: '#d97706', marginTop: 1 }} className="shrink-0" />
            <p className="text-[11px] text-amber-800 leading-relaxed">
              These are schemes you were <span className="font-semibold">eligible for</span> but missed in a previous cycle.
              Each new cycle reopens applications — tap a card to view details and apply for the <span className="font-semibold">next window</span>.
            </p>
          </div>

          {/* Cards */}
          {missed.map(({ scheme, reason, resolvedLabel, agoLabel, nextLabel }) => {
            const cfg = MISS_REASON_CFG[reason];
            const iconCfg = SCHEME_ICONS[scheme.id] ?? { Icon: BookOpen, bg: '#eff6ff', color: '#2563eb' };
            return (
              <button
                key={scheme.id}
                id={`missed-${scheme.id}`}
                onClick={() => onView(scheme.id)}
                className="w-full text-left rounded-2xl overflow-hidden"
                style={{
                  background: '#fff',
                  border: `1.5px solid ${cfg.border}`,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
                aria-label={`Missed: ${scheme.name}`}
              >
                <div className="px-3.5 pt-3.5 pb-3">
                  {/* Top row: icon + name + arrow */}
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: iconCfg.bg }}
                      aria-hidden
                    >
                      <iconCfg.Icon size={17} style={{ color: iconCfg.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-gray-900 leading-snug truncate">{scheme.shortName}</p>
                      <p className="text-[11px] text-gray-400 truncate">{scheme.ministry ?? scheme.portalName}</p>
                    </div>
                    <ChevronRight size={15} className="text-gray-300 shrink-0" />
                  </div>

                  {/* Reason tag + computed deadline + time-ago */}
                  <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
                    >
                      <cfg.Icon size={9} />
                      {cfg.label}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      Closed: <span className="font-semibold text-gray-600">{resolvedLabel}</span>
                      {agoLabel && <span className="text-gray-400"> ({agoLabel})</span>}
                    </span>
                  </div>

                  {/* Next window */}
                  {nextLabel && (
                    <p className="text-[10px] text-[#0F766E] font-semibold mt-1.5">
                      ↻ Next window: <span className="font-bold">{nextLabel}</span>
                    </p>
                  )}
                </div>

                {/* Bottom action strip */}
                <div
                  className="px-3.5 py-2 flex items-center justify-between"
                  style={{ background: cfg.bg, borderTop: `1px solid ${cfg.border}` }}
                >
                  <p className="text-[10px] font-semibold" style={{ color: cfg.color }}>
                    {reason === 'draft_not_submitted'
                      ? "You started but didn't submit — apply in next cycle"
                      : reason === 'not_applied'
                      ? 'You were eligible but never applied'
                      : 'Application window closed for this cycle'}
                  </p>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: '#fff', color: cfg.color, border: `1px solid ${cfg.border}` }}
                  >
                    View Details
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Expandable Section ──

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full flex items-center justify-between px-4 py-4 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="text-sm font-bold text-gray-900">{title}</span>
        {open
          ? <ChevronUp size={16} className="text-gray-400 shrink-0" />
          : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

// ── Scheme Detail ──

function SchemeDetail({
  scheme, payment, application, onBack, onApply,
}: {
  scheme: ScholarshipScheme;
  payment: ReturnType<typeof useApp>['payments'][0] | undefined;
  application: ReturnType<typeof useApp>['applications'][0] | undefined;
  onBack: () => void;
  onApply: () => void;
}) {
  const { language, t } = useApp();
  const localized = getLocalizedScholarship(scheme, language);
  const cfg = SCHEME_ICONS[scheme.id] ?? { Icon: BookOpen, bg: '#eff6ff', color: '#2563eb' };
  const hasApplied = application && application.status !== 'not_applied';

  const overviewTitle = language === 'te' ? 'అవలోకనం' : language === 'hi' ? 'अवलोकन' : language === 'kn' ? 'ಅವಲೋಕನ' : language === 'ta' ? 'கண்ணோட்டம்' : language === 'ml' ? 'അവലോകനം' : 'Overview';
  const eligibilityTitle = language === 'te' ? 'అర్హత ప్రమాణాలు' : language === 'hi' ? 'पात्रता मानदंड' : language === 'kn' ? 'ಅರ್ಹತಾ ಮಾನದಂಡಗಳು' : language === 'ta' ? 'தகுதி வரம்புகள்' : language === 'ml' ? 'യോഗ്യതാ മാനദണ്ഡങ്ങൾ' : 'Eligibility Criteria';
  const benefitsTitle = language === 'te' ? 'ఆర్థిక ప్రయోజనాలు' : language === 'hi' ? 'वित्तीय लाभ' : language === 'kn' ? 'ಆರ್ಥಿಕ ಪ್ರಯೋಜನಗಳು' : language === 'ta' ? 'நிதி சலுகைகள்' : language === 'ml' ? 'സാമ്പത്തിക ആനുകൂല്യങ്ങൾ' : 'Benefits';

  return (
    <div className="pb-32 bg-[#f5f7fa]">
      {/* Header */}
      <header className="bg-[#0F766E] px-4 pt-14 pb-6">
        <button id="back-btn" onClick={onBack} className="flex items-center gap-1.5 text-white/70 text-sm mb-5" aria-label="Back">
          <ArrowLeft size={16} /> {t('back')}
        </button>
        <div className="flex items-start gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.2)' }}
            aria-hidden
          >
            <cfg.Icon size={22} style={{ color: '#fff' }} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-white/60 uppercase tracking-wide">{localized.schemeCode}</span>
            <h1 className="text-white font-bold text-base leading-snug mt-0.5">{localized.name}</h1>
            <p className="text-white/60 text-xs mt-0.5">{localized.ministry}</p>
          </div>
        </div>
      </header>

      {/* Sections */}
      <div className="px-4 mt-4 space-y-3">
        <div className="card overflow-hidden">
          <Section title={overviewTitle} defaultOpen>
            <p className="text-sm text-gray-700 leading-relaxed">{localized.description}</p>
            <a
              href={scheme.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-[#0F766E]"
            >
              {scheme.portalName} <ExternalLink size={13} />
            </a>
          </Section>

          <Section title={eligibilityTitle}>
            <div className="space-y-2">
              <InfoRow
                label={language === 'te' ? 'వర్గం' : language === 'hi' ? 'श्रेणी' : language === 'kn' ? 'ವರ್ಗ' : language === 'ta' ? 'பிரிவு' : language === 'ml' ? 'വിഭാഗം' : 'Category'}
                value={scheme.eligibility.category.join(', ')}
              />
              {scheme.eligibility.incomeLimit && (
                <InfoRow
                  label={UI_TERMS.income_limit[language] || 'Income Limit'}
                  value={`${formatCurrency(scheme.eligibility.incomeLimit)} per annum`}
                />
              )}
              {scheme.eligibility.classRange && (
                <InfoRow
                  label={language === 'te' ? 'తరగతి / స్థాయి' : language === 'hi' ? 'कक्षा / स्तर' : language === 'kn' ? 'ತರಗತಿ / ಮಟ್ಟ' : language === 'ta' ? 'வகுப்பு / நிலை' : language === 'ml' ? 'ക്ലാസ് / തരം' : 'Class / Level'}
                  value={`Class ${scheme.eligibility.classRange.min}–${scheme.eligibility.classRange.max === 999 ? 'and above' : scheme.eligibility.classRange.max}`}
                />
              )}
              {scheme.eligibility.ageLimit?.max && (
                <InfoRow
                  label={language === 'te' ? 'వయోపరిమితి' : language === 'hi' ? 'आयु सीमा' : language === 'kn' ? 'ವಯಸ್ಸಿನ ಮಿತಿ' : language === 'ta' ? 'வயது வரம்பு' : language === 'ml' ? 'പ്രായപരിധി' : 'Age Limit'}
                  value={`Up to ${scheme.eligibility.ageLimit.max} years`}
                />
              )}
            </div>
            {scheme.eligibility.other && (
              <ul className="mt-3 space-y-2">
                {scheme.eligibility.other.map((rule, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-[#f0faf9] flex items-center justify-center shrink-0 mt-0.5 text-[#0F766E] font-bold text-[10px]">{i + 1}</span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section title={benefitsTitle}>
            <div className="space-y-2">
              {scheme.benefits.map((b) => (
                <div key={b.label} className="bg-[#f0faf9] rounded-xl px-3.5 py-3">
                  <p className="text-xs text-gray-500 leading-snug">{b.label}</p>
                  <p className="text-sm font-bold text-[#0F766E] mt-0.5">{b.value}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title={t('mandatory_docs')}>
            <div className="space-y-2">
              {scheme.documents.map((doc) => (
                <div key={doc.name} className="flex items-start gap-2.5">
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5 shrink-0"
                    style={{ background: doc.mandatory ? '#fef2f2' : '#f1f5f9', color: doc.mandatory ? '#dc2626' : '#6b7280' }}
                  >
                    {doc.mandatory ? 'REQ' : 'OPT'}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">{doc.name}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-3">REQ = Required &nbsp;|&nbsp; OPT = Optional</p>
          </Section>

          <Section title={t('important_dates')}>
            <div className="space-y-0">
              {scheme.importantDates.map((d, i) => (
                <div
                  key={d.event}
                  className="flex items-start gap-3 py-3"
                  style={{ borderBottom: i < scheme.importantDates.length - 1 ? '1px solid #f1f5f9' : 'none' }}
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{d.event}</p>
                    {d.note && <p className="text-xs text-gray-500">{d.note}</p>}
                  </div>
                  <p className="text-sm font-bold text-[#0F766E] shrink-0">{d.date}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title={t('verification_flow')}>
            <ol className="space-y-3">
              {scheme.verificationProcess.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0F766E] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </Section>
        </div>

        {/* Rejection Analysis — shown only for rejected applications */}
        {application?.status === 'rejected' && application.rejectionDetail && (
          <div className="card overflow-hidden">
            <RejectionAnalysisSection detail={application.rejectionDetail} />
          </div>
        )}

        {payment && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t('dbt_payment_history')}</p>
            <StatusTimeline payment={payment} />
          </div>
        )}
      </div>

      {/* Sticky Apply */}
      <div className="fixed bottom-16 left-0 right-0 px-4 py-3 bg-white z-40" style={{ boxShadow: '0 -1px 0 #e5e9ef' }}>
        {application?.status === 'rejected' ? (
          <div
            className="rounded-xl px-4 py-3 flex items-center gap-3"
            style={{ background: '#fef2f2', border: '1px solid #fecaca' }}
          >
            <XCircle size={18} style={{ color: '#dc2626' }} className="shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-red-700">Application Rejected</p>
              <p className="text-xs text-red-500 mt-0.5">See Rejection Analysis above · Reapply in next cycle</p>
            </div>
          </div>
        ) : !hasApplied ? (
          <button id="scheme-apply-btn" onClick={onApply} className="btn-primary">
            {UI_TERMS.apply_now[language] || 'Apply on Portal'} — {localized.shortName}
          </button>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-center">
            <p className="text-sm font-semibold text-green-700">{application?.applicationNumber}</p>
            <p className="text-xs text-green-600 mt-0.5">{application?.remarks}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-500 shrink-0">{label}</span>
      <span className="text-sm font-semibold text-gray-900 text-right">{value}</span>
    </div>
  );
}

// ── Rejection Analysis Section ──

const REJECTION_STAGES: { key: import('../types').RejectionStage; label: string; shortLabel: string }[] = [
  { key: 'institute', label: 'Institute Verification', shortLabel: 'Institute' },
  { key: 'district',  label: 'District Verification',  shortLabel: 'District' },
  { key: 'state',     label: 'State Approval',          shortLabel: 'State' },
  { key: 'ministry',  label: 'Ministry Sanction',       shortLabel: 'Ministry' },
];

function RejectionAnalysisSection({ detail }: { detail: import('../types').RejectionDetail }) {
  const rejectedIdx = REJECTION_STAGES.findIndex((s) => s.key === detail.stage);

  return (
    <div>
      {/* Section header */}
      <div
        className="px-4 py-3.5 flex items-center gap-2.5"
        style={{ background: 'linear-gradient(135deg, #fef2f2 0%, #fff7ed 100%)', borderBottom: '1px solid #fecaca' }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: '#fef2f2', border: '1px solid #fecaca' }}
          aria-hidden
        >
          <ShieldAlert size={16} style={{ color: '#dc2626' }} />
        </div>
        <div>
          <p className="text-sm font-bold text-red-700">Rejection Analysis</p>
          <p className="text-[11px] text-red-500">Application {detail.reasonCode} · {detail.rejectedOn}</p>
        </div>
      </div>

      <div className="px-4 pb-4">
        {/* Stage Timeline */}
        <div className="mt-4 mb-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Verification Pipeline</p>
          <div className="flex items-center gap-0">
            {REJECTION_STAGES.map((stage, idx) => {
              const isPassed  = idx < rejectedIdx;
              const isRejected = idx === rejectedIdx;
              const isPending  = idx > rejectedIdx;
              return (
                <div key={stage.key} className="flex items-center flex-1 min-w-0">
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: isPassed ? '#f0fdf4' : isRejected ? '#fef2f2' : '#f1f5f9',
                        border: `2px solid ${
                          isPassed ? '#16a34a' : isRejected ? '#dc2626' : '#e2e8f0'
                        }`,
                      }}
                      aria-label={stage.label}
                    >
                      {isPassed   && <CheckCircle2 size={14} style={{ color: '#16a34a' }} />}
                      {isRejected && <XCircle      size={14} style={{ color: '#dc2626' }} />}
                      {isPending  && <span className="w-2 h-2 rounded-full bg-slate-300" />}
                    </div>
                    <p
                      className="text-[9px] font-semibold mt-1 text-center leading-tight"
                      style={{ color: isPassed ? '#15803d' : isRejected ? '#dc2626' : '#94a3b8', maxWidth: 52 }}
                    >
                      {stage.shortLabel}
                    </p>
                  </div>
                  {idx < REJECTION_STAGES.length - 1 && (
                    <div
                      className="flex-1 h-0.5 mx-1 mb-4"
                      style={{ background: isPassed ? '#86efac' : '#e2e8f0' }}
                      aria-hidden
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Rejection Reason card */}
        <div
          className="rounded-xl p-3.5 mb-3"
          style={{ background: '#fef2f2', border: '1px solid #fecaca' }}
        >
          <div className="flex items-start gap-2.5">
            <FileWarning size={15} style={{ color: '#dc2626', marginTop: 1 }} className="shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-red-700">{detail.reasonTitle}</p>
              <p className="text-[11px] text-red-600 mt-1 leading-relaxed">{detail.reasonDescription}</p>
            </div>
          </div>
        </div>

        {/* Who rejected + Fault document */}
        <div className="space-y-2 mb-3">
          <div className="flex items-start justify-between gap-3 py-2 border-b border-gray-100">
            <span className="text-xs text-gray-400 shrink-0">Rejected By</span>
            <span className="text-xs font-semibold text-gray-800 text-right">{detail.rejectedBy}</span>
          </div>
          {detail.faultDocument && (
            <div className="flex items-start justify-between gap-3 py-2 border-b border-gray-100">
              <span className="text-xs text-gray-400 shrink-0">Faulty Document</span>
              <span
                className="text-xs font-bold text-right"
                style={{ color: '#d97706' }}
              >
                {detail.faultDocument}
              </span>
            </div>
          )}
          <div className="flex items-start justify-between gap-3 py-2">
            <span className="text-xs text-gray-400 shrink-0">Can Reapply?</span>
            <span
              className="text-xs font-bold"
              style={{ color: detail.canReapply ? '#15803d' : '#dc2626' }}
            >
              {detail.canReapply ? 'Yes — in next application cycle' : 'No'}
            </span>
          </div>
        </div>

        {/* What to do next */}
        <div
          className="rounded-xl p-3.5"
          style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}
        >
          <div className="flex items-center gap-1.5 mb-2.5">
            <Lightbulb size={13} style={{ color: '#15803d' }} />
            <p className="text-xs font-bold text-green-800">What to do next</p>
          </div>
          <ol className="space-y-2">
            {detail.nextSteps.map((step, i) => (
              <li key={i} className="flex gap-2.5">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold text-white"
                  style={{ background: '#15803d', minWidth: 20 }}
                >
                  {i + 1}
                </span>
                <p className="text-[11px] text-green-800 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

// ── Application Form & Editable Components ──

interface ApplicationFormData {
  // Step 1: Personal
  fullName: string;
  aadhaar: string;
  aparId: string;
  dob: string;
  gender: string;
  category: string;
  subTribe: string;
  fatherName: string;
  motherName: string;
  mobile: string;
  email: string;
  state: string;
  district: string;
  pincode: string;
  fullAddress: string;

  // Step 2: Academic
  institution: string;
  course: string;
  academicYear: string;
  enrollmentNo: string;
  previousMarks: string;
  currentYear: string;
  admissionQuota: string;
  hostelStatus: string;

  // Step 3: Income
  annualIncome: string;
  incomeSource: string;
  incomeCertNo: string;
  issuingAuthority: string;
  incomeCertDate: string;
  familyMembersCount: string;

  // Step 4: Bank
  bankName: string;
  accountNumber: string;
  confirmAccountNumber: string;
  ifsc: string;
  branchName: string;
  accountHolderName: string;
  isAadhaarSeeded: boolean;

  // Step 5: Documents & Statement
  statementOfPurpose: string;
  declarationAccepted: boolean;
}

function EditableField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  hint,
  required = true,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={id} className="block text-xs font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
          <PenLine size={10} /> Editable
        </span>
      </div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-all shadow-sm"
      />
      {hint && <p className="text-[11px] text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  hint,
  required = true,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={id} className="block text-xs font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-medium">Select</span>
      </div>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-all shadow-sm pr-9"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
      {hint && <p className="text-[11px] text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

function TextareaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  hint,
  required = true,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={id} className="block text-xs font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
          <PenLine size={10} /> Write text
        </span>
      </div>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-all shadow-sm resize-y leading-relaxed"
      />
      {hint && <p className="text-[11px] text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

function ApplicationForm({
  scheme,
  onBack,
  onDone,
}: {
  scheme: ScholarshipScheme;
  onBack: () => void;
  onDone: () => void;
}) {
  const { student, submitApplication } = useApp();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submittedAppNumber, setSubmittedAppNumber] = useState('');

  const [formData, setFormData] = useState<ApplicationFormData>(() => ({
    // Step 1: Personal
    fullName: student?.name || 'Gampa Shashank',
    aadhaar: student?.aadhaar || 'XXXX-XXXX-4182',
    aparId: student?.aparId || '9821-4321-7789',
    dob: student?.dob || '2004-06-15',
    gender: 'Male',
    category: student?.category || 'Scheduled Tribe (ST)',
    subTribe: 'Bhil',
    fatherName: 'Rameshwar Gampa',
    motherName: 'Sunita Gampa',
    mobile: student?.mobile || '9876543210',
    email: student?.email || 'shashank.gampa@example.com',
    state: student?.state || 'Maharashtra',
    district: student?.district || 'Nandurbar',
    pincode: '425412',
    fullAddress: 'Plot 42, Tribal Colony, Dhadgaon, Taluka Akrani, Nandurbar - 425412',

    // Step 2: Academic
    institution: student?.institution || 'Government Medical College, Dhule',
    course: student?.course || 'MBBS (Bachelor of Medicine & Surgery)',
    academicYear: student?.academicYear || '2025–26',
    enrollmentNo: 'GMC-DHU-2024-ST-089',
    previousMarks: '84.50',
    currentYear: '2nd Year',
    admissionQuota: 'State Quota (ST Reserved)',
    hostelStatus: 'Hosteller (Tribal Welfare Dept Hostel)',

    // Step 3: Income
    annualIncome: student?.annualIncome ? String(student.annualIncome) : '180000',
    incomeSource: 'Agriculture & Forest Produce',
    incomeCertNo: 'NDB-IC-2025-09824',
    issuingAuthority: 'Tehsildar, Nandurbar',
    incomeCertDate: '2025-05-02',
    familyMembersCount: '4',

    // Step 4: Bank
    bankName: student?.bankName || 'State Bank of India',
    accountNumber: student?.bankAccount || '39824100582',
    confirmAccountNumber: student?.bankAccount || '39824100582',
    ifsc: student?.ifsc || 'SBIN0001234',
    branchName: 'Dhadgaon Branch, Nandurbar',
    accountHolderName: student?.name || 'Gampa Shashank',
    isAadhaarSeeded: true,

    // Step 5: Documents & Statement
    statementOfPurpose: `I am applying for ${scheme.name} to continue my higher education without financial distress to my family. As a Scheduled Tribe student from a rural background in Nandurbar, I am committed to completing my academic program with excellence and contributing to the development of our tribal community.`,
    declarationAccepted: true,
  }));

  const updateField = (field: keyof ApplicationFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const steps = ['Personal', 'Academic', 'Income', 'Bank', 'Documents & Statement'];
  const progress = Math.round(((step + 1) / steps.length) * 100);

  function handleNext() {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (!formData.declarationAccepted) {
        alert('Please accept the self-declaration to submit your application.');
        return;
      }
      const refNo = `MH-${scheme.schemeCode}-2026-${Date.now().toString().slice(-5)}`;
      const newApp = {
        id: `APP-2026-${scheme.id.toUpperCase()}-${Date.now().toString().slice(-4)}`,
        schemeId: scheme.id,
        schemeName: scheme.name,
        status: 'submitted' as const,
        submittedDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        amountApplied: 45000,
        applicationNumber: refNo,
        remarks: `Application submitted by ${formData.fullName} for ${formData.course} at ${formData.institution}.`,
      };
      submitApplication(newApp);
      setSubmittedAppNumber(refNo);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] flex flex-col items-center justify-center px-4 py-12">
        <div className="card p-6 w-full max-w-md text-center shadow-lg border border-teal-100">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} />
          </div>
          <span className="inline-block px-3 py-1 bg-teal-50 text-teal-800 text-xs font-bold rounded-full mb-2">
            Application Status: Submitted
          </span>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Application Submitted!</h2>
          <p className="text-xs text-gray-600 mt-2 leading-relaxed">
            Your application for <span className="font-semibold text-gray-900">{scheme.name}</span> has been received and registered on the National Scholarship Portal.
          </p>

          {/* Reference Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-5 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Application Reference</span>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded">Active</span>
            </div>
            <p className="text-base font-mono font-bold text-gray-900 tracking-wide">
              {submittedAppNumber}
            </p>
            <div className="mt-3 pt-3 border-t border-gray-200/60 grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div>
                <span className="text-[10px] text-gray-400 block">Applicant</span>
                <span className="font-medium text-gray-800 truncate block">{formData.fullName}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Course</span>
                <span className="font-medium text-gray-800 truncate block">{formData.course}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Amount Applied</span>
                <span className="font-bold text-teal-700">{formatCurrency(45000)}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Date</span>
                <span className="font-medium text-gray-800">{new Date().toISOString().split('T')[0]}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-teal-50 border border-teal-200/80 rounded-xl text-left">
            <p className="text-xs font-semibold text-teal-900 flex items-center gap-1.5">
              <Sparkles size={14} className="text-teal-700 shrink-0" />
              What happens next?
            </p>
            <ol className="text-[11px] text-teal-800 mt-1.5 space-y-1 list-decimal list-inside leading-relaxed">
              <li>Institute Nodal Officer will verify your admission & marks</li>
              <li>District Tribal Welfare Officer conducts scrutiny</li>
              <li>Sanction order issued & DBT credited directly to your bank account</li>
            </ol>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <button
              id="view-in-apps-btn"
              onClick={onDone}
              className="w-full btn-primary py-3 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Check size={16} /> View in Active Applications
            </button>
            <button
              id="back-schemes-btn"
              onClick={onBack}
              className="w-full btn-outline py-2.5 text-xs text-gray-700"
            >
              Back to Scheme Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-[#f5f7fa] min-h-screen">
      <header className="bg-[#0F766E] px-4 pt-14 pb-5 sticky top-0 z-30 shadow-sm">
        <button id="back-form-btn" onClick={onBack} className="flex items-center gap-1.5 text-white/80 text-sm mb-3 hover:text-white" aria-label="Back">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-base leading-snug">Apply — {scheme.shortName}</h1>
            <p className="text-white/70 text-xs mt-0.5">Step {step + 1} of {steps.length} · {steps[step]}</p>
          </div>
          <span className="text-xs font-bold text-white bg-white/20 px-2 py-1 rounded-lg">
            {progress}% Completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-1.5 mt-4">
          {steps.map((s, i) => (
            <div
              key={s}
              className="h-1.5 flex-1 rounded-full transition-all duration-300"
              style={{ background: i <= step ? '#34d399' : 'rgba(255,255,255,0.25)' }}
              aria-hidden
            />
          ))}
        </div>
      </header>

      {/* Step Tabs indicator */}
      <div className="bg-white border-b border-gray-200 px-4 py-2.5 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {steps.map((s, idx) => (
            <button
              key={s}
              onClick={() => setStep(idx)}
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                idx === step
                  ? 'bg-[#0F766E] text-white'
                  : idx < step
                  ? 'bg-teal-50 text-teal-800'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{
                  background: idx === step ? 'rgba(255,255,255,0.3)' : idx < step ? '#14b8a6' : '#9ca3af',
                  color: '#fff'
                }}
              >
                {idx + 1}
              </span>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="px-4 mt-4 max-w-2xl mx-auto">
        <div className="card p-5 shadow-sm">
          {step === 0 && <PersonalStep formData={formData} updateField={updateField} />}
          {step === 1 && <AcademicStep formData={formData} updateField={updateField} />}
          {step === 2 && <IncomeStep formData={formData} updateField={updateField} scheme={scheme} />}
          {step === 3 && <BankStep formData={formData} updateField={updateField} />}
          {step === 4 && <DocumentsStep scheme={scheme} formData={formData} updateField={updateField} />}
        </div>
      </div>

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-3 bg-white z-40 flex gap-3 max-w-2xl mx-auto shadow-[0_-4px_12px_rgba(0,0,0,0.06)] border-t border-gray-200">
        {step > 0 && (
          <button id="form-prev-btn" onClick={() => { setStep((s) => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn-outline flex-1 py-3 text-xs font-semibold">
            Previous Step
          </button>
        )}
        <button id="form-next-btn" onClick={handleNext} className="btn-primary flex-1 py-3 text-xs font-semibold shadow-md">
          {step === steps.length - 1 ? 'Submit Application' : 'Save & Continue'}
        </button>
      </div>
    </div>
  );
}

function PersonalStep({
  formData,
  updateField,
}: {
  formData: ApplicationFormData;
  updateField: (field: keyof ApplicationFormData, value: string | boolean) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
        <div>
          <h2 className="text-base font-bold text-gray-900">Personal Details</h2>
          <p className="text-xs text-gray-500">You can edit any information to update your application.</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
          <User size={16} />
        </div>
      </div>

      <EditableField
        id="f-name"
        label="Full Name (as per Aadhaar)"
        value={formData.fullName}
        onChange={(v) => updateField('fullName', v)}
        placeholder="Enter your full name"
      />

      <div className="grid grid-cols-2 gap-3">
        <EditableField
          id="f-aadhaar"
          label="Aadhaar Number"
          value={formData.aadhaar}
          onChange={(v) => updateField('aadhaar', v)}
          placeholder="XXXX-XXXX-XXXX"
        />
        <EditableField
          id="f-apaar"
          label="APAAR / Edu ID"
          value={formData.aparId}
          onChange={(v) => updateField('aparId', v)}
          placeholder="XXXX-XXXX-XXXX"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <EditableField
          id="f-dob"
          label="Date of Birth"
          type="date"
          value={formData.dob}
          onChange={(v) => updateField('dob', v)}
        />
        <SelectField
          id="f-gender"
          label="Gender"
          value={formData.gender}
          onChange={(v) => updateField('gender', v)}
          options={[
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Other', label: 'Other' },
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SelectField
          id="f-category"
          label="Category"
          value={formData.category}
          onChange={(v) => updateField('category', v)}
          options={[
            { value: 'Scheduled Tribe (ST)', label: 'Scheduled Tribe (ST)' },
            { value: 'Particularly Vulnerable Tribal Group (PVTG)', label: 'PVTG' },
            { value: 'Denotified Tribe (DNT)', label: 'Denotified Tribe (DNT)' },
          ]}
        />
        <EditableField
          id="f-subtribe"
          label="Sub-Tribe / Community"
          value={formData.subTribe}
          onChange={(v) => updateField('subTribe', v)}
          placeholder="e.g. Bhil, Gond, Santhal"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <EditableField
          id="f-father"
          label="Father's / Guardian's Name"
          value={formData.fatherName}
          onChange={(v) => updateField('fatherName', v)}
          placeholder="Father's Name"
        />
        <EditableField
          id="f-mother"
          label="Mother's Name"
          value={formData.motherName}
          onChange={(v) => updateField('motherName', v)}
          placeholder="Mother's Name"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <EditableField
          id="f-mobile"
          label="Mobile Number (SMS alerts)"
          value={formData.mobile}
          onChange={(v) => updateField('mobile', v)}
          placeholder="10-digit mobile"
        />
        <EditableField
          id="f-email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(v) => updateField('email', v)}
          placeholder="name@example.com"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <EditableField
          id="f-state"
          label="State"
          value={formData.state}
          onChange={(v) => updateField('state', v)}
          placeholder="State"
        />
        <EditableField
          id="f-district"
          label="District"
          value={formData.district}
          onChange={(v) => updateField('district', v)}
          placeholder="District"
        />
        <EditableField
          id="f-pincode"
          label="PIN Code"
          value={formData.pincode}
          onChange={(v) => updateField('pincode', v)}
          placeholder="425412"
        />
      </div>

      <EditableField
        id="f-address"
        label="Permanent Address"
        value={formData.fullAddress}
        onChange={(v) => updateField('fullAddress', v)}
        placeholder="Village, Post Office, Taluka"
      />
    </div>
  );
}

function AcademicStep({
  formData,
  updateField,
}: {
  formData: ApplicationFormData;
  updateField: (field: keyof ApplicationFormData, value: string | boolean) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
        <div>
          <h2 className="text-base font-bold text-gray-900">Academic Details</h2>
          <p className="text-xs text-gray-500">Provide your current institution and course details.</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center">
          <GraduationCap size={16} />
        </div>
      </div>

      <EditableField
        id="f-institution"
        label="Institution / College Name"
        value={formData.institution}
        onChange={(v) => updateField('institution', v)}
        placeholder="Enter your college or university"
      />

      <EditableField
        id="f-course"
        label="Course / Programme of Study"
        value={formData.course}
        onChange={(v) => updateField('course', v)}
        placeholder="e.g. MBBS, B.Tech, B.Sc, M.A."
      />

      <div className="grid grid-cols-2 gap-3">
        <SelectField
          id="f-academic-year"
          label="Academic Year"
          value={formData.academicYear}
          onChange={(v) => updateField('academicYear', v)}
          options={[
            { value: '2025–26', label: '2025–26 (Current)' },
            { value: '2024–25', label: '2024–25' },
            { value: '2026–27', label: '2026–27' },
          ]}
        />
        <SelectField
          id="f-current-year"
          label="Current Class / Year"
          value={formData.currentYear}
          onChange={(v) => updateField('currentYear', v)}
          options={[
            { value: '1st Year', label: '1st Year' },
            { value: '2nd Year', label: '2nd Year' },
            { value: '3rd Year', label: '3rd Year' },
            { value: '4th Year', label: '4th Year' },
            { value: '5th Year / Intern', label: '5th Year / Intern' },
            { value: 'Post Graduate (PG) 1st Year', label: 'PG 1st Year' },
            { value: 'Post Graduate (PG) 2nd Year', label: 'PG 2nd Year' },
            { value: 'Ph.D. / M.Phil Scholar', label: 'Ph.D. / M.Phil Scholar' },
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <EditableField
          id="f-enroll"
          label="Enrolment / Roll Number"
          value={formData.enrollmentNo}
          onChange={(v) => updateField('enrollmentNo', v)}
          placeholder="e.g. GMC-DHU-2024-ST-089"
        />
        <EditableField
          id="f-marks"
          label="Marks in Previous Exam (%)"
          type="number"
          value={formData.previousMarks}
          onChange={(v) => updateField('previousMarks', v)}
          placeholder="e.g. 84.50"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SelectField
          id="f-quota"
          label="Admission Quota"
          value={formData.admissionQuota}
          onChange={(v) => updateField('admissionQuota', v)}
          options={[
            { value: 'State Quota (ST Reserved)', label: 'State Quota (ST Reserved)' },
            { value: 'All India Quota (AIQ ST)', label: 'All India Quota (AIQ ST)' },
            { value: 'Open / Merit Quota', label: 'Open / Merit Quota' },
            { value: 'Management / Institutional', label: 'Management / Institutional' },
          ]}
        />
        <SelectField
          id="f-hostel"
          label="Hostel Accommodation"
          value={formData.hostelStatus}
          onChange={(v) => updateField('hostelStatus', v)}
          options={[
            { value: 'Hosteller (Tribal Welfare Dept Hostel)', label: 'Govt. Tribal Hostel' },
            { value: 'Hosteller (College Attached)', label: 'College Hostel' },
            { value: 'Hosteller (Private / Rented)', label: 'Private / Rented PG' },
            { value: 'Day Scholar (Commuter)', label: 'Day Scholar (Commuter)' },
          ]}
        />
      </div>
    </div>
  );
}

function IncomeStep({
  formData,
  updateField,
  scheme,
}: {
  formData: ApplicationFormData;
  updateField: (field: keyof ApplicationFormData, value: string | boolean) => void;
  scheme: ScholarshipScheme;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
        <div>
          <h2 className="text-base font-bold text-gray-900">Family Income Details</h2>
          <p className="text-xs text-gray-500">Provide official income certificate figures.</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
          <Coins size={16} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <EditableField
          id="f-income"
          label="Annual Family Income (Rs.)"
          type="number"
          value={formData.annualIncome}
          onChange={(v) => updateField('annualIncome', v)}
          placeholder="e.g. 180000"
          hint={scheme.eligibility.incomeLimit ? `Limit: ${formatCurrency(scheme.eligibility.incomeLimit)}/yr` : 'No income limit'}
        />
        <EditableField
          id="f-family-count"
          label="Family Members Count"
          type="number"
          value={formData.familyMembersCount}
          onChange={(v) => updateField('familyMembersCount', v)}
          placeholder="e.g. 4"
        />
      </div>

      <SelectField
        id="f-source"
        label="Primary Source of Income"
        value={formData.incomeSource}
        onChange={(v) => updateField('incomeSource', v)}
        options={[
          { value: 'Agriculture & Forest Produce', label: 'Agriculture & Forest Produce' },
          { value: 'Daily Wages / Agricultural Labour', label: 'Daily Wages / Labour' },
          { value: 'Government Service (Group C/D)', label: 'Government Service' },
          { value: 'Private Sector Employment', label: 'Private Sector Employment' },
          { value: 'Artisan / Small Trade / Self-Employed', label: 'Artisan / Small Trade' },
          { value: 'Pensioner', label: 'Pensioner' },
          { value: 'Other', label: 'Other' },
        ]}
      />

      <div className="grid grid-cols-2 gap-3">
        <EditableField
          id="f-cert-no"
          label="Income Certificate Number"
          value={formData.incomeCertNo}
          onChange={(v) => updateField('incomeCertNo', v)}
          placeholder="e.g. NDB-IC-2025-09824"
        />
        <EditableField
          id="f-cert-date"
          label="Date of Certificate Issue"
          type="date"
          value={formData.incomeCertDate}
          onChange={(v) => updateField('incomeCertDate', v)}
        />
      </div>

      <SelectField
        id="f-authority"
        label="Issuing Authority"
        value={formData.issuingAuthority}
        onChange={(v) => updateField('issuingAuthority', v)}
        options={[
          { value: 'Tehsildar, Nandurbar', label: 'Tehsildar' },
          { value: 'Sub-Divisional Magistrate (SDM)', label: 'Sub-Divisional Magistrate (SDM)' },
          { value: 'Revenue Divisional Officer (RDO)', label: 'Revenue Divisional Officer (RDO)' },
          { value: 'District Collectorate / Deputy Commissioner', label: 'District Collectorate' },
        ]}
      />

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 leading-relaxed mt-2">
        <p className="font-semibold flex items-center gap-1.5 mb-1">
          <AlertTriangle size={13} className="text-amber-600 shrink-0" />
          Important Income Verification Requirement
        </p>
        The certificate must be valid for the current academic session (issued by Tehsildar or Revenue Officer). If expiring within 35 days, please renew promptly to prevent rejection during State scrutiny.
      </div>
    </div>
  );
}

function BankStep({
  formData,
  updateField,
}: {
  formData: ApplicationFormData;
  updateField: (field: keyof ApplicationFormData, value: string | boolean) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
        <div>
          <h2 className="text-base font-bold text-gray-900">Bank Account for DBT</h2>
          <p className="text-xs text-gray-500">Direct Benefit Transfer will be credited here via PFMS.</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
          <CreditCard size={16} />
        </div>
      </div>

      <EditableField
        id="f-holder-name"
        label="Account Holder Name (as in Passbook)"
        value={formData.accountHolderName}
        onChange={(v) => updateField('accountHolderName', v)}
        placeholder="Enter name as on passbook"
      />

      <SelectField
        id="f-bank"
        label="Bank Name"
        value={formData.bankName}
        onChange={(v) => updateField('bankName', v)}
        options={[
          { value: 'State Bank of India', label: 'State Bank of India' },
          { value: 'Bank of Maharashtra', label: 'Bank of Maharashtra' },
          { value: 'Bank of Baroda', label: 'Bank of Baroda' },
          { value: 'Punjab National Bank', label: 'Punjab National Bank' },
          { value: 'Canara Bank', label: 'Canara Bank' },
          { value: 'Union Bank of India', label: 'Union Bank of India' },
          { value: 'Central Bank of India', label: 'Central Bank of India' },
          { value: 'Maharashtra Gramin Bank', label: 'Maharashtra Gramin Bank' },
        ]}
      />

      <div className="grid grid-cols-2 gap-3">
        <EditableField
          id="f-account"
          label="Bank Account Number"
          value={formData.accountNumber}
          onChange={(v) => updateField('accountNumber', v)}
          placeholder="Enter account number"
        />
        <EditableField
          id="f-confirm-account"
          label="Confirm Account Number"
          value={formData.confirmAccountNumber}
          onChange={(v) => updateField('confirmAccountNumber', v)}
          placeholder="Re-enter account number"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <EditableField
          id="f-ifsc"
          label="IFSC Code"
          value={formData.ifsc}
          onChange={(v) => updateField('ifsc', v.toUpperCase())}
          placeholder="e.g. SBIN0001234"
        />
        <EditableField
          id="f-branch"
          label="Branch Name"
          value={formData.branchName}
          onChange={(v) => updateField('branchName', v)}
          placeholder="Branch location"
        />
      </div>

      <label className="flex items-start gap-2.5 p-3 rounded-xl bg-teal-50 border border-teal-200 cursor-pointer mt-3">
        <input
          type="checkbox"
          id="f-aadhaar-seeded"
          checked={formData.isAadhaarSeeded}
          onChange={(e) => updateField('isAadhaarSeeded', e.target.checked)}
          className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
        />
        <div className="text-xs text-teal-900 leading-snug">
          <span className="font-semibold block mb-0.5">Aadhaar-Seeded & PFMS Validated Account</span>
          I confirm this savings account is active, linked with Aadhaar, and mapped with NPCI mapper for Direct Benefit Transfer.
        </div>
      </label>
    </div>
  );
}

function DocumentsStep({
  scheme,
  formData,
  updateField,
}: {
  scheme: ScholarshipScheme;
  formData: ApplicationFormData;
  updateField: (field: keyof ApplicationFormData, value: string | boolean) => void;
}) {
  const { documents } = useApp();
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
        <div>
          <h2 className="text-base font-bold text-gray-900">Documents & Statement</h2>
          <p className="text-xs text-gray-500">Write your justification and review required attachments.</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
          <FileText size={16} />
        </div>
      </div>

      {/* Statement of Purpose / Reason for Applying */}
      <div className="mb-5">
        <TextareaField
          id="f-statement"
          label="Statement of Purpose / Reason for Applying"
          value={formData.statementOfPurpose}
          onChange={(v) => updateField('statementOfPurpose', v)}
          placeholder="Write about your academic aspirations, financial circumstances, and how this scholarship will assist your education..."
          rows={4}
          hint="Write a brief statement (100–300 words). This is reviewed by the State Selection Committee."
        />
      </div>

      <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
        Attached Verification Documents ({documents.filter((d) => d.status === 'verified').length} Verified)
      </h3>
      <div className="space-y-2 mb-5">
        {scheme.documents.map((doc) => {
          const uploaded = documents.find(
            (d) => d.name.toLowerCase().includes(doc.name.split(' ')[0].toLowerCase()) && d.status !== 'not_uploaded'
          );

          // Expiry computation
          let expiryInfo: { label: string; color: string; bg: string; urgent: boolean } | null = null;
          let diffDays = 0;
          if (uploaded?.expiryDate) {
            const expiry = new Date(uploaded.expiryDate);
            expiry.setHours(0, 0, 0, 0);
            diffDays = Math.ceil((expiry.getTime() - now.getTime()) / 86_400_000);

            if (diffDays < 0) {
              expiryInfo = {
                label: `EXPIRED ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} ago`,
                color: '#dc2626',
                bg: '#fef2f2',
                urgent: true,
              };
            } else if (diffDays === 0) {
              expiryInfo = { label: 'Expires TODAY', color: '#dc2626', bg: '#fef2f2', urgent: true };
            } else if (diffDays <= 45) {
              expiryInfo = {
                label: `Expires in ${diffDays} day${diffDays !== 1 ? 's' : ''} ⚠`,
                color: '#dc2626',
                bg: '#fef2f2',
                urgent: true,
              };
            } else if (diffDays <= 90) {
              expiryInfo = {
                label: `Expires in ${diffDays} days`,
                color: '#d97706',
                bg: '#fffbeb',
                urgent: false,
              };
            } else {
              const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
              const expiryFmt = `${String(expiry.getDate()).padStart(2,'0')} ${MONTHS[expiry.getMonth()]} ${expiry.getFullYear()}`;
              expiryInfo = {
                label: `Valid until ${expiryFmt}`,
                color: '#15803d',
                bg: '#f0fdf4',
                urgent: false,
              };
            }
          }

          const isUrgentExpiry = expiryInfo?.urgent && uploaded?.expiryDate;
          const borderColor = isUrgentExpiry
            ? '#f87171'
            : uploaded ? '#bbf7d0' : doc.mandatory ? '#fecaca' : '#e5e9ef';
          const bgColor = isUrgentExpiry ? '#fff5f5' : uploaded ? '#f0fdf4' : '#fff';

          return (
            <div
              key={doc.name}
              className="rounded-xl px-3.5 py-2.5 flex items-start gap-3"
              style={{ border: `1.5px solid ${borderColor}`, background: bgColor }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  background: uploaded
                    ? (isUrgentExpiry ? '#ef4444' : '#16a34a')
                    : doc.mandatory ? '#fca5a5' : '#e5e9ef',
                }}
                aria-hidden
              >
                {uploaded && !isUrgentExpiry ? (
                  <Check size={11} className="text-white" />
                ) : uploaded && isUrgentExpiry ? (
                  <AlertTriangle size={10} className="text-white" />
                ) : (
                  <span className="text-[10px] text-gray-500 font-bold">•</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-800 leading-snug">{doc.name}</p>
                  {doc.mandatory && (
                    <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1 rounded">Mandatory</span>
                  )}
                </div>
                <p
                  className="text-[11px] mt-0.5 font-medium"
                  style={{
                    color: isUrgentExpiry
                      ? '#dc2626'
                      : uploaded ? '#16a34a' : doc.mandatory ? '#dc2626' : '#9ca3af',
                  }}
                >
                  {isUrgentExpiry
                    ? (diffDays < 0 ? 'Uploaded — Expired' : `Uploaded — Expiring in ${diffDays} days`)
                    : uploaded ? 'Attached & Verified' : doc.mandatory ? 'Required — Auto-fetched from DigiLocker' : 'Optional'}
                </p>

                {expiryInfo && (
                  <span
                    className="inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                    style={{ background: expiryInfo.bg, color: expiryInfo.color }}
                  >
                    {expiryInfo.label}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Self-Declaration */}
      <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 mt-4">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            id="f-declaration"
            checked={formData.declarationAccepted}
            onChange={(e) => updateField('declarationAccepted', e.target.checked)}
            className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer shrink-0"
          />
          <div className="text-xs text-gray-700 leading-relaxed">
            <span className="font-bold text-gray-900 block mb-0.5">Applicant Self-Declaration</span>
            I hereby certify that all information supplied in this form is authentic, accurate, and truthful. I authorize the Ministry of Tribal Affairs and State Tribal Welfare Department to verify my records with DigiLocker, APAAR, and PFMS.
          </div>
        </label>
      </div>
    </div>
  );
}

