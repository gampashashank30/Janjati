import { useState, useMemo } from 'react';
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
} from 'lucide-react';
import { SCHOLARSHIPS } from '../data/scholarships';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { StatusTimeline } from '../components/StatusTimeline';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/format';
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
  const { applications, payments, language, t } = useApp();
  const [view, setView] = useState<View>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
        onDone={() => setView('list')}
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

        {payment && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t('dbt_payment_history')}</p>
            <StatusTimeline payment={payment} />
          </div>
        )}
      </div>

      {/* Sticky Apply */}
      <div className="fixed bottom-16 left-0 right-0 px-4 py-3 bg-white z-40" style={{ boxShadow: '0 -1px 0 #e5e9ef' }}>
        {!hasApplied ? (
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

// ── Application Form ──

function ApplicationForm({ scheme, onBack, onDone }: { scheme: ScholarshipScheme; onBack: () => void; onDone: () => void }) {
  const { student } = useApp();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const steps = ['Personal', 'Academic', 'Income', 'Bank', 'Documents'];
  const progress = Math.round(((step + 1) / steps.length) * 100);

  function handleNext() {
    if (step < steps.length - 1) setStep((s) => s + 1);
    else setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24" aria-hidden>
            <path stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 text-center tracking-tight">Application Submitted</h2>
        <p className="text-sm text-gray-500 mt-2 text-center leading-relaxed max-w-xs">
          Your application for <span className="font-semibold text-gray-800">{scheme.name}</span> has been submitted. An SMS confirmation will be sent to your registered mobile.
        </p>
        <div className="card mt-6 p-4 w-full max-w-xs">
          <p className="text-xs text-gray-500 font-medium">Reference Number</p>
          <p className="text-base font-mono font-bold text-gray-900 mt-1">
            MH-{scheme.schemeCode}-2025-{student?.id.slice(-5)}
          </p>
          <p className="text-xs text-gray-400 mt-1">Save this for future reference</p>
        </div>
        <button id="done-apply-btn" onClick={onDone} className="btn-primary mt-6 max-w-xs w-full">
          Back to Schemes
        </button>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-[#f5f7fa]">
      <header className="bg-[#0F766E] px-4 pt-14 pb-5">
        <button id="back-form-btn" onClick={onBack} className="flex items-center gap-1.5 text-white/70 text-sm mb-4" aria-label="Back">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-white font-bold text-base leading-snug">Apply — {scheme.shortName}</h1>
        <p className="text-white/60 text-xs mt-0.5">Step {step + 1} of {steps.length} · {steps[step]}</p>
      </header>

      {/* Progress */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-1">
            {steps.map((s, i) => (
              <div
                key={s}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ width: 32, background: i <= step ? '#0F766E' : '#e5e9ef' }}
                aria-hidden
              />
            ))}
          </div>
          <span className="text-xs font-bold text-[#0F766E]">{progress}%</span>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="card p-5">
          {step === 0 && <PersonalStep student={student!} />}
          {step === 1 && <AcademicStep student={student!} />}
          {step === 2 && <IncomeStep student={student!} />}
          {step === 3 && <BankStep student={student!} />}
          {step === 4 && <DocumentsStep scheme={scheme} />}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-16 left-0 right-0 px-4 py-3 bg-white z-40 flex gap-3" style={{ boxShadow: '0 -1px 0 #e5e9ef' }}>
        {step > 0 && (
          <button id="form-prev-btn" onClick={() => setStep((s) => s - 1)} className="btn-outline flex-1">
            Previous
          </button>
        )}
        <button id="form-next-btn" onClick={handleNext} className="btn-primary flex-1" style={{ minHeight: 50 }}>
          {step === steps.length - 1 ? 'Submit Application' : 'Save & Continue'}
        </button>
      </div>
    </div>
  );
}

function FormField({ label, value, id, disabled = true, hint }: { label: string; value: string; id: string; disabled?: boolean; hint?: string }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      <input
        id={id}
        type="text"
        defaultValue={value}
        disabled={disabled}
        className="input-base"
        style={disabled ? { background: '#f8fafc', color: '#6b7280' } : {}}
      />
      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
      {disabled && <p className="text-[11px] text-gray-400 mt-1">Auto-filled from your verified profile</p>}
    </div>
  );
}

function PersonalStep({ student }: { student: ReturnType<typeof useApp>['student'] }) {
  if (!student) return null;
  return (
    <div>
      <h2 className="text-base font-bold text-gray-900 mb-4">Personal Details</h2>
      <FormField id="f-name" label="Full Name (as per Aadhaar)" value={student.name} />
      <FormField id="f-aadhaar" label="Aadhaar Number" value={student.aadhaar} />
      <FormField id="f-apaar" label="APAAR ID" value={student.aparId} />
      <FormField id="f-dob" label="Date of Birth" value={student.dob} />
      <FormField id="f-category" label="Category" value={student.category} />
      <FormField id="f-state" label="State" value={student.state} />
      <FormField id="f-district" label="District" value={student.district} />
    </div>
  );
}

function AcademicStep({ student }: { student: ReturnType<typeof useApp>['student'] }) {
  if (!student) return null;
  return (
    <div>
      <h2 className="text-base font-bold text-gray-900 mb-4">Academic Details</h2>
      <FormField id="f-institution" label="Institution Name" value={student.institution} />
      <FormField id="f-course" label="Course / Programme" value={student.course} />
      <FormField id="f-year" label="Academic Year" value={student.academicYear} />
      <div className="mb-4">
        <label htmlFor="f-enroll" className="block text-xs font-semibold text-gray-600 mb-1.5">Enrolment Number</label>
        <input id="f-enroll" type="text" placeholder="Enter enrolment number" className="input-base" />
      </div>
      <div className="mb-4">
        <label htmlFor="f-marks" className="block text-xs font-semibold text-gray-600 mb-1.5">Marks in Previous Exam (%)</label>
        <input id="f-marks" type="number" min="0" max="100" step="0.01" placeholder="e.g. 78.50" className="input-base" />
      </div>
    </div>
  );
}

function IncomeStep({ student }: { student: ReturnType<typeof useApp>['student'] }) {
  if (!student) return null;
  return (
    <div>
      <h2 className="text-base font-bold text-gray-900 mb-4">Family Income Details</h2>
      <FormField id="f-income" label="Annual Family Income (Rs.)" value={String(student.annualIncome)} />
      <div className="mb-4">
        <label htmlFor="f-source" className="block text-xs font-semibold text-gray-600 mb-1.5">Primary Source of Income</label>
        <select id="f-source" className="input-base">
          <option>Agriculture</option>
          <option>Daily Wages / Labour</option>
          <option>Government Service</option>
          <option>Private Employment</option>
          <option>Self-Employed / Business</option>
          <option>Pension</option>
          <option>Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="f-cert-no" className="block text-xs font-semibold text-gray-600 mb-1.5">Income Certificate Number</label>
        <input id="f-cert-no" type="text" placeholder="As on income certificate" className="input-base" />
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 leading-relaxed">
        Income certificate must be issued by a Revenue Officer (Tehsildar or above) and valid for the current academic year.
      </div>
    </div>
  );
}

function BankStep({ student }: { student: ReturnType<typeof useApp>['student'] }) {
  if (!student) return null;
  return (
    <div>
      <h2 className="text-base font-bold text-gray-900 mb-4">Bank Account for DBT</h2>
      <FormField id="f-bank" label="Bank Name" value={student.bankName} />
      <FormField id="f-account" label="Account Number (masked)" value={student.bankAccount} />
      <FormField id="f-ifsc" label="IFSC Code" value={student.ifsc} />
      <div className="bg-[#f0faf9] border border-teal-200 rounded-xl p-3 text-xs text-teal-800 leading-relaxed">
        Your bank account must be seeded with Aadhaar for Direct Benefit Transfer (DBT). Only PFMS-verified accounts are eligible for scholarship disbursement.
      </div>
    </div>
  );
}

function DocumentsStep({ scheme }: { scheme: ScholarshipScheme }) {
  const { documents } = useApp();
  return (
    <div>
      <h2 className="text-base font-bold text-gray-900 mb-1">Document Checklist</h2>
      <p className="text-xs text-gray-500 mb-4 leading-relaxed">Documents already in your wallet are auto-attached. Upload any missing documents before submitting.</p>
      <div className="space-y-2">
        {scheme.documents.map((doc) => {
          const uploaded = documents.find(
            (d) => d.name.toLowerCase().includes(doc.name.split(' ')[0].toLowerCase()) && d.status !== 'not_uploaded'
          );
          return (
            <div
              key={doc.name}
              className="rounded-xl px-3.5 py-3 flex items-center gap-3"
              style={{
                border: `1px solid ${uploaded ? '#bbf7d0' : doc.mandatory ? '#fecaca' : '#e5e9ef'}`,
                background: uploaded ? '#f0fdf4' : '#fff',
              }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: uploaded ? '#16a34a' : doc.mandatory ? '#fca5a5' : '#e5e9ef' }}
                aria-hidden
              >
                {uploaded
                  ? <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  : <svg width="8" height="8" fill="none" viewBox="0 0 24 24"><path stroke={doc.mandatory ? '#dc2626' : '#9ca3af'} strokeWidth="3" strokeLinecap="round" d="M12 5v14M5 12h14" /></svg>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 leading-snug">{doc.name}</p>
                <p className="text-[11px] mt-0.5" style={{ color: uploaded ? '#16a34a' : doc.mandatory ? '#dc2626' : '#9ca3af' }}>
                  {uploaded ? 'Uploaded & Ready' : doc.mandatory ? 'Required — Not uploaded' : 'Optional'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
