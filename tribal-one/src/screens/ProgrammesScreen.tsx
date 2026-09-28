import { useState, useEffect } from 'react';
import {
  ArrowLeft, ExternalLink, ChevronRight,
  BookOpen, Users, AlertTriangle, Info, BadgeCheck,
  GraduationCap, Layers, TreePine, TrendingUp, Briefcase,
} from 'lucide-react';
import {
  PROGRAMMES, PROGRAMME_CATEGORIES,
  type Programme, type ProgrammeCategory,
} from '../data/programmes';
import { useApp } from '../context/AppContext';
import {
  PROGRAMME_CATEGORY_LABELS,
  UI_TERMS,
  getLocalizedProgramme,
} from '../utils/localizedContent';

// ── Category config ──────────────────────────────────────────────────────────
const CAT_CONFIG: Record<ProgrammeCategory, {
  Icon: React.FC<{ size?: number; style?: React.CSSProperties }>;
  color: string;
  bg: string;
  border: string;
}> = {
  'School & Education':       { Icon: BookOpen,      color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe' },
  'Education Loan':           { Icon: GraduationCap, color: '#b45309', bg: '#fffbeb', border: '#fde68a' },
  'Youth & Skill Development':{ Icon: TrendingUp,    color: '#0d6560', bg: '#f0faf9', border: '#99f6e4' },
  'PVTG / Tribal Welfare':    { Icon: Users,         color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
  'Tribal Development':       { Icon: Layers,        color: '#9a3412', bg: '#fff7ed', border: '#fdba74' },
  'Livelihood & Economic':    { Icon: TreePine,      color: '#166534', bg: '#f0fdf4', border: '#86efac' },
  'Entrepreneurship & Finance':{ Icon: Briefcase,    color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
};

const ROUTE_LABELS: Record<Programme['applicationRoute'], { label: Record<string, string>; color: string; bg: string }> = {
  individual_apply: {
    label: {
      en: 'Apply Online',
      te: 'ఆన్‌లైన్ దరఖాస్తు',
      hi: 'ऑनलाइन आवेदन',
      kn: 'ಆನ್‌ಲೈನ್ ಅರ್ಜಿ',
      ta: 'ஆன்லைன் விண்ணப்பம்',
      ml: 'ഓൺലൈൻ അപേക്ഷ',
    },
    color: '#166534',
    bg: '#dcfce7',
  },
  institutional: {
    label: {
      en: 'Institutional Admission',
      te: 'సంస్థాగత ప్రవేశం',
      hi: 'संस्थागत प्रवेश',
      kn: 'ಸಂಸ್ಥೆಯ ಪ್ರವೇಶ',
      ta: 'நிறுவன சேர்க்கை',
      ml: 'സ്ഥാപന പ്രവേശനം',
    },
    color: '#1e40af',
    bg: '#dbeafe',
  },
  awareness_only: {
    label: {
      en: 'Awareness / Info',
      te: 'అవగాహన / సమాచారం',
      hi: 'जागरूकता / जानकारी',
      kn: 'ಜಾಗೃತಿ / ಮಾಹಿತಿ',
      ta: 'விழிப்புணர்வு / தகவல்',
      ml: 'അവബോധം / വിവരങ്ങൾ',
    },
    color: '#854d0e',
    bg: '#fef9c3',
  },
  historical: {
    label: {
      en: 'Historical — Now DA-JGUA',
      te: 'చారిత్రక — ఇప్పుడు DA-JGUA',
      hi: 'ऐतिहासिक — अब DA-JGUA',
      kn: 'ಐತಿಹಾಸಿಕ — ಈಗ DA-JGUA',
      ta: 'வரலாற்று — இப்போது DA-JGUA',
      ml: 'ചരിത്രപരം — ഇപ്പോൾ DA-JGUA',
    },
    color: '#475569',
    bg: '#f1f5f9',
  },
};

// ── Main Screen ──────────────────────────────────────────────────────────────
type View = 'list' | 'detail';

export function ProgrammesScreen() {
  const { language, t, selectedProgrammeId, clearSelectedProgramme } = useApp();
  const [view, setView]           = useState<View>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProgrammeCategory | 'All'>('All');

  // React to deep-link from HomeScreen
  useEffect(() => {
    if (selectedProgrammeId) {
      setSelectedId(selectedProgrammeId);
      setView('detail');
      clearSelectedProgramme();
    }
  }, [selectedProgrammeId, clearSelectedProgramme]);

  const selectedProgramme = PROGRAMMES.find((p) => p.id === selectedId);

  function handleView(id: string) { setSelectedId(id); setView('detail'); }
  function handleBack() { setView('list'); setSelectedId(null); }

  if (view === 'detail' && selectedProgramme) {
    return <ProgrammeDetail programme={selectedProgramme} onBack={handleBack} />;
  }

  const displayed = activeCategory === 'All'
    ? PROGRAMMES
    : PROGRAMMES.filter((p) => p.category === activeCategory);

  return (
    <div className="pb-24 bg-[#f5f7fa]">
      {/* ── Header ── */}
      <header className="bg-[#0F766E] px-4 pt-14 pb-6">
        <p className="text-white/60 text-[11px] font-medium uppercase tracking-wide mb-0.5">
          {t('mota_title')}
        </p>
        <h1 className="text-white text-xl font-bold tracking-tight">
          {UI_TERMS.programmes_title[language] || 'MoTA Programmes & Schemes'}
        </h1>
        <p className="text-white/65 text-xs mt-1">
          {UI_TERMS.programmes_sub[language] || '10 Government programmes across 7 categories'}
        </p>
      </header>

      {/* ── Disclaimer banner ── */}
      <div className="mx-4 mt-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex items-start gap-2.5">
        <Info size={15} className="text-amber-700 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 leading-relaxed">
          {UI_TERMS.programmes_disclaimer[language] ||
            'These are government programmes and livelihood missions. Only some allow direct online applications — check the route badge on each card.'}
        </p>
      </div>

      {/* ── Category filter pills ── */}
      <div className="px-4 mt-4">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            id="cat-all"
            onClick={() => setActiveCategory('All')}
            className="shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-colors"
            style={{
              background: activeCategory === 'All' ? '#0F766E' : '#fff',
              color:      activeCategory === 'All' ? '#fff'    : '#374151',
              borderColor: activeCategory === 'All' ? '#0F766E' : '#d1d5db',
            }}
          >
            {(PROGRAMME_CATEGORY_LABELS.All[language] || 'All')} ({PROGRAMMES.length})
          </button>
          {PROGRAMME_CATEGORIES.map((cat) => {
            const cfg = CAT_CONFIG[cat];
            const count = PROGRAMMES.filter((p) => p.category === cat).length;
            const isActive = activeCategory === cat;
            const catLabel = PROGRAMME_CATEGORY_LABELS[cat]?.[language] || cat;
            return (
              <button
                key={cat}
                id={`cat-${cat.replace(/[^a-zA-Z]/g, '_')}`}
                onClick={() => setActiveCategory(cat)}
                className="shrink-0 px-3 py-2 rounded-full text-xs font-bold border transition-colors"
                style={{
                  background: isActive ? cfg.color : '#fff',
                  color:      isActive ? '#fff'    : cfg.color,
                  borderColor: isActive ? cfg.color : cfg.border,
                }}
              >
                {catLabel.split(' ')[0]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Programme cards ── */}
      <div className="px-4 mt-4 space-y-3 mb-4">
        {displayed.map((prog) => (
          <ProgrammeCard key={prog.id} programme={prog} onView={handleView} />
        ))}

        {/* Source note */}
        <div className="card-sm px-4 py-3">
          <p className="text-[11px] text-gray-500 leading-relaxed">
            <span className="font-semibold text-gray-700">Official Sources:</span>{' '}
            tribal.nic.in · pib.gov.in · nstfdc.tribal.gov.in · overseas.tribal.gov.in
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Programme Card ───────────────────────────────────────────────────────────
function ProgrammeCard({ programme: p, onView }: { programme: Programme; onView: (id: string) => void }) {
  const { language } = useApp();
  const localized = getLocalizedProgramme(p, language);
  const cfg   = CAT_CONFIG[p.category];
  const route = ROUTE_LABELS[p.applicationRoute];
  const CatIcon = cfg.Icon;
  const catLabel = PROGRAMME_CATEGORY_LABELS[p.category]?.[language] || p.category;

  return (
    <article
      onClick={() => onView(p.id)}
      className="card overflow-hidden cursor-pointer hover:shadow-md active:scale-[0.99] transition-all"
      aria-label={localized.name}
    >
      {/* Top accent bar */}
      <div className="h-1" style={{ background: p.tagColor }} aria-hidden />

      <div className="px-4 pt-3.5 pb-4">
        {/* Header row */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: cfg.bg, border: `1.5px solid ${cfg.border}` }}
            aria-hidden
          >
            <CatIcon size={18} style={{ color: cfg.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <span
                className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded"
                style={{ background: cfg.bg, color: cfg.color }}
              >
                {catLabel}
              </span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded"
                style={{ background: route.bg, color: route.color }}
              >
                {route.label[language] || route.label.en}
              </span>
            </div>
            <h3 className="text-sm font-bold text-gray-900 leading-snug mt-1.5">{localized.name}</h3>
          </div>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-3">
          {localized.overview}
        </p>

        {/* Key facts strip */}
        {p.keyFacts.slice(0, 2).map((kf) => (
          <div key={kf.label} className="flex justify-between items-center py-1 border-t border-gray-100">
            <span className="text-[11px] text-gray-500">{kf.label}</span>
            <span className="text-[11px] font-semibold text-gray-800 text-right max-w-[55%] leading-tight">{kf.value}</span>
          </div>
        ))}

        {p.status === 'Historical / Absorbed' && (
          <div className="mt-2.5 flex items-center gap-1.5 bg-gray-50 rounded-lg px-3 py-2">
            <AlertTriangle size={13} className="text-gray-400 shrink-0" />
            <p className="text-[11px] text-gray-500 leading-snug">
              Absorbed into <span className="font-semibold">DA-JGUA</span> (MoTA Dec 2025)
            </p>
          </div>
        )}

        {/* Action */}
        <button
          id={`view-prog-${p.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onView(p.id);
          }}
          className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold border transition-colors hover:bg-black/5"
          style={{ color: p.tagColor, borderColor: p.tagColor }}
          aria-label={`View details of ${localized.name}`}
        >
          {UI_TERMS.details[language] || 'View Full Details'} <ChevronRight size={13} />
        </button>
      </div>
    </article>
  );
}

// ── Programme Detail ─────────────────────────────────────────────────────────
function ProgrammeDetail({ programme: p, onBack }: { programme: Programme; onBack: () => void }) {
  const { language, t } = useApp();
  const localized = getLocalizedProgramme(p, language);
  const cfg     = CAT_CONFIG[p.category];
  const route   = ROUTE_LABELS[p.applicationRoute];
  const CatIcon = cfg.Icon;
  const catLabel = PROGRAMME_CATEGORY_LABELS[p.category]?.[language] || p.category;

  return (
    <div className="pb-32 bg-[#f5f7fa]">
      {/* Header */}
      <header style={{ background: p.tagColor }} className="px-4 pt-14 pb-6">
        <button
          id="prog-back-btn"
          onClick={onBack}
          className="flex items-center gap-1.5 text-white/70 text-sm mb-5"
          aria-label="Back to Programmes"
        >
          <ArrowLeft size={16} /> {t('back')}
        </button>
        <div className="flex items-start gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.2)' }}
            aria-hidden
          >
            <CatIcon size={22} style={{ color: '#fff' }} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-white/60 uppercase tracking-wide">
              {catLabel}
            </span>
            <h1 className="text-white font-bold text-base leading-snug mt-0.5">{localized.name}</h1>
            <p className="text-white/60 text-xs mt-0.5">{p.implementingBody}</p>
          </div>
        </div>
      </header>

      <div className="px-4 mt-4 space-y-3">
        {/* Status / Route badges */}
        <div className="flex gap-2 flex-wrap">
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ background: route.bg, color: route.color }}
          >
            {route.label[language] || route.label.en}
          </span>
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-full"
            style={{
              background: p.status === 'Active' ? '#dcfce7' : '#f1f5f9',
              color:       p.status === 'Active' ? '#166534' : '#475569',
            }}
          >
            {p.status === 'Active'
              ? (language === 'te' ? '● క్రియాశీల పథకం' : language === 'hi' ? '● सक्रिय योजना' : language === 'kn' ? '● ಸಕ್ರಿಯ ಯೋಜನೆ' : language === 'ta' ? '● செயலில் உள்ள திட்டம்' : language === 'ml' ? '● സജീവ പദ്ധതി' : '● Active Scheme')
              : (language === 'te' ? '◎ చారిత్రక / విలీనం' : language === 'hi' ? '◎ ऐतिहासिक / समाहित' : language === 'kn' ? '◎ ಐತಿಹಾಸಿಕ / ವಿಲೀನ' : language === 'ta' ? '◎ வரலாற்று / ஒருங்கிணைக்கப்பட்டது' : language === 'ml' ? '◎ ചരിത്രപരമായ / ലയിപ്പിച്ചു' : '◎ Historical / Absorbed')}
          </span>
          {p.launchDate && (
            <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600">
              {language === 'te' ? 'ప్రారంభం: ' : language === 'hi' ? 'शुरू: ' : language === 'kn' ? 'ಪ್ರಾರಂಭ: ' : language === 'ta' ? 'தொடங்கப்பட்டது: ' : language === 'ml' ? 'ആരംഭം: ' : 'Launched: '}{p.launchDate}
            </span>
          )}
        </div>

        {/* Historical notice */}
        {p.status === 'Historical / Absorbed' && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex gap-2.5">
            <AlertTriangle size={15} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-800">
                {language === 'te' ? 'పథకం విలీనం చేయబడింది' : language === 'hi' ? 'योजना समाहित' : language === 'kn' ? 'ಯೋಜನೆ ವಿಲೀನಗೊಂಡಿದೆ' : language === 'ta' ? 'திட்டம் இணைக்கப்பட்டது' : language === 'ml' ? 'പദ്ധതി ലയിപ്പിച്ചു' : 'Scheme Absorbed'}
              </p>
              <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                {p.currentStatusNote} For current support, refer to{' '}
                <span className="font-semibold">DA-JGUA</span>.
              </p>
            </div>
          </div>
        )}

        {/* Overview */}
        <div className="card px-4 py-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
            {UI_TERMS.overview?.[language] || 'Overview'}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{localized.overview}</p>
          {p.target && (
            <div className="mt-3 bg-[#f0faf9] rounded-lg px-3 py-2">
              <p className="text-[11px] text-gray-500 font-medium">
                {language === 'te' ? 'లక్ష్య లబ్ధిదారుడు' : language === 'hi' ? 'लक्षित लाभार्थी' : language === 'kn' ? 'ಗುರಿ ಫಲಾನುಭವಿ' : language === 'ta' ? 'இலக்கு பயனாளி' : language === 'ml' ? 'ലക്ഷ്യ ഗുണഭോക്താവ്' : 'Target Beneficiary'}
              </p>
              <p className="text-sm font-semibold text-[#0F766E] mt-0.5">{p.target}</p>
            </div>
          )}
        </div>

        {/* Key Facts */}
        {p.keyFacts.length > 0 && (
          <div className="card overflow-hidden">
            <div className="px-4 pt-4 pb-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                {UI_TERMS.key_facts?.[language] || 'Key Facts'}
              </p>
            </div>
            {p.keyFacts.map((kf, i) => (
              <div
                key={kf.label}
                className="px-4 py-3 flex items-start justify-between gap-4"
                style={{ borderTop: i === 0 ? '1px solid #f1f5f9' : '1px solid #f1f5f9' }}
              >
                <span className="text-xs text-gray-500 shrink-0 max-w-[45%]">{kf.label}</span>
                <span className="text-xs font-bold text-gray-900 text-right leading-snug">{kf.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* What it provides */}
        {p.whatItProvides.length > 0 && (
          <div className="card px-4 py-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
              {UI_TERMS.what_it_provides?.[language] || 'What This Programme Provides'}
            </p>
            <ul className="space-y-2.5">
              {p.whatItProvides.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <BadgeCheck size={15} style={{ color: p.tagColor }} className="shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* How to access */}
        <div className="card px-4 py-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
            {UI_TERMS.how_to_access?.[language] || 'How to Access / Apply'}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{p.howToAccess}</p>

          {p.applicationRoute === 'awareness_only' && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-xs text-amber-800 font-semibold">
                ⚠ {language === 'te' ? 'వ్యక్తిగత దరఖాస్తు మార్గం లేదు' : language === 'hi' ? 'कोई व्यक्तिगत आवेदन मार्ग नहीं' : language === 'kn' ? 'ವೈಯಕ್ತಿಕ ಅರ್ಜಿ ಮಾರ್ಗವಿಲ್ಲ' : language === 'ta' ? 'தனிநபர் விண்ணப்ப பாதை இல்லை' : language === 'ml' ? 'വ്യക്തിഗത അപേക്ഷാ മാർഗ്ഗമില്ല' : 'No Individual Application Route'}
              </p>
              <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                {language === 'te' ? 'ఈ కార్యక్రమానికి వ్యక్తిగత ఆన్‌లైన్ దరఖాస్తు లేదు. ప్రయోజనాలు ప్రభుత్వ లేదా సంస్థాగత విధానాల ద్వారా అందుతాయి.' : language === 'hi' ? 'इस कार्यक्रम में व्यक्तिगत ऑनलाइन आवेदन नहीं है। लाभ सरकारी तंत्र के माध्यम से दिए जाते हैं।' : 'This programme does not have an online application for individual beneficiaries. Benefits are delivered through government / institutional mechanisms.'}
              </p>
            </div>
          )}
        </div>

        {/* Official Links */}
        <div className="card px-4 py-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
            {UI_TERMS.official_links?.[language] || 'Official Links'}
          </p>
          <div className="space-y-2.5">
            <a
              href={p.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              id={`prog-link-main-${p.id}`}
              className="flex items-center justify-between py-2.5 px-3.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-[#f0faf9] transition-colors"
            >
              <div>
                <p className="text-xs font-semibold text-gray-800">Official MoTA Page</p>
                <p className="text-[11px] text-gray-400 mt-0.5 truncate max-w-[220px]">{p.officialUrl}</p>
              </div>
              <ExternalLink size={14} className="text-gray-400 shrink-0" />
            </a>

            {p.portalUrl && (
              <a
                href={p.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`prog-link-portal-${p.id}`}
                className="flex items-center justify-between py-2.5 px-3.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-[#f0faf9] transition-colors"
              >
                <div>
                  <p className="text-xs font-semibold text-gray-800">Programme Portal</p>
                  <p className="text-[11px] text-gray-400 mt-0.5 truncate max-w-[220px]">{p.portalUrl}</p>
                </div>
                <ExternalLink size={14} className="text-gray-400 shrink-0" />
              </a>
            )}

            {p.guidelinesUrl && (
              <a
                href={p.guidelinesUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`prog-link-guide-${p.id}`}
                className="flex items-center justify-between py-2.5 px-3.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-[#f0faf9] transition-colors"
              >
                <div>
                  <p className="text-xs font-semibold text-gray-800">Official Guidelines / Notification</p>
                  <p className="text-[11px] text-gray-400 mt-0.5 truncate max-w-[220px]">{p.guidelinesUrl}</p>
                </div>
                <ExternalLink size={14} className="text-gray-400 shrink-0" />
              </a>
            )}
          </div>
        </div>

        {/* Data disclaimer */}
        <div className="card-sm px-4 py-3">
          <p className="text-[11px] text-gray-400 leading-relaxed">
            <span className="font-semibold text-gray-500">Data Source:</span>{' '}
            Ministry of Tribal Affairs (tribal.nic.in), PIB (pib.gov.in). Last verified September 2026.
            Verify all details against the latest official notification before applying.
          </p>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3 shadow-lg"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.75rem)' }}
      >
        <div className="max-w-lg mx-auto flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 shrink-0 flex items-center gap-1"
          >
            <ArrowLeft size={14} /> {t('back')}
          </button>
          <a
            href={p.portalUrl || p.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`btn-visit-portal-${p.id}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white shadow-sm transition-all active:scale-[0.98]"
            style={{ background: p.tagColor }}
          >
            <span>
              {p.applicationRoute === 'individual_apply'
                ? (language === 'te' ? 'ఆన్‌లైన్ పోర్టల్‌ను సందర్శించండి' : language === 'hi' ? 'ऑनलाइन पोर्टल पर जाएं' : 'Apply / Visit Portal')
                : (language === 'te' ? 'అధికారిక పోర్టల్' : language === 'hi' ? 'आधिकारिक पोर्टल' : 'Visit Official Portal')}
            </span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
