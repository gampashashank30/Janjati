import { useState } from 'react';
import { ChevronRight, LogOut, Shield, FileText, ChevronDown, ChevronUp, Phone, Globe, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NotificationItem } from '../components/NotificationItem';
import { StatusTimeline } from '../components/StatusTimeline';
import { formatDate } from '../utils/format';
import { SCHOLARSHIPS } from '../data/scholarships';
import { SUPPORTED_LANGUAGES } from '../utils/translations';

type Section = 'main' | 'notifications' | 'payments' | 'eligibility' | 'privacy' | 'terms' | 'language';

export function ProfileScreen() {
  const { student, notifications, payments, logout, markAllRead, unreadCount, language, setLanguage, t } = useApp();
  const [section, setSection] = useState<Section>('main');

  if (section === 'language') {
    return (
      <SubPage title={t('app_language')} onBack={() => setSection('main')}>
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <h2 className="text-sm font-bold text-gray-800">{t('select_language')}</h2>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              {t('language_description')}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100 overflow-hidden">
            {SUPPORTED_LANGUAGES.map((langOpt) => {
              const isSelected = language === langOpt.code;
              return (
                <button
                  key={langOpt.code}
                  id={`lang-select-${langOpt.code}`}
                  onClick={() => setLanguage(langOpt.code)}
                  className={`w-full flex items-center justify-between px-4 py-4 text-left transition-colors ${
                    isSelected ? 'bg-teal-50/70' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl">{langOpt.flag}</span>
                    <div>
                      <p className={`text-base leading-tight ${isSelected ? 'font-bold text-[#0F766E]' : 'font-semibold text-gray-800'}`}>
                        {langOpt.nativeName}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{langOpt.name}</p>
                    </div>
                  </div>
                  {isSelected ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F766E] bg-teal-100/70 px-2.5 py-1 rounded-full">
                      <Check size={14} strokeWidth={2.5} />
                      <span>{t('active_language')}</span>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </SubPage>
    );
  }

  if (section === 'notifications') {
    return (
      <SubPage title={t('notifications')} onBack={() => setSection('main')}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
          <p className="text-sm text-gray-500">{unreadCount > 0 ? `${unreadCount} ${t('unread')}` : t('all_caught_up')}</p>
          {unreadCount > 0 && (
            <button id="mark-all-read-btn" onClick={markAllRead} className="text-xs font-bold text-[#0F766E]">
              {t('mark_all_read')}
            </button>
          )}
        </div>
        <div className="bg-white">
          {notifications.map((n) => <NotificationItem key={n.id} notification={n} />)}
        </div>
      </SubPage>
    );
  }

  if (section === 'payments') {
    return (
      <SubPage title={t('dbt_payment_history')} onBack={() => setSection('main')}>
        <div className="px-4 space-y-4 mt-4 pb-6">
          {payments.length === 0
            ? <p className="text-sm text-gray-500 text-center py-10">No payment records found.</p>
            : payments.map((p) => <StatusTimeline key={p.id} payment={p} />)}
        </div>
      </SubPage>
    );
  }

  if (section === 'eligibility') {
    return (
      <SubPage title={t('eligibility_checker')} onBack={() => setSection('main')}>
        <EligibilityChecker />
      </SubPage>
    );
  }

  if (section === 'privacy') {
    return (
      <SubPage title={t('privacy_policy')} onBack={() => setSection('main')}>
        <PrivacyPolicy />
      </SubPage>
    );
  }

  if (section === 'terms') {
    return (
      <SubPage title={t('terms_of_service')} onBack={() => setSection('main')}>
        <TermsOfService />
      </SubPage>
    );
  }

  return (
    <div className="pb-20 bg-[#f5f7fa]">
      {/* Header */}
      <header className="bg-[#0F766E] px-4 pt-14 pb-8">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 overflow-hidden border-2 border-white/80 shadow-md bg-white"
          >
            <img
              src="/ramesh_paharia.jpg"
              alt={student?.name ?? 'Profile Photo'}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-lg leading-tight truncate">{student?.name}</p>
            <p className="text-white/65 text-xs mt-0.5 truncate">{student?.course}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30">
                {t('scheduled_tribe')}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/15 text-white/80">
                {t('verified')}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 -mt-4 space-y-4">
        {/* App Language Section */}
        <section className="card overflow-hidden" aria-label="Language selection">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between" style={{ background: '#f8fafc' }}>
            <div className="flex items-center gap-2">
              <Globe size={15} className="text-[#0F766E]" />
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">{t('app_language')}</p>
            </div>
            <button
              onClick={() => setSection('language')}
              className="text-[11px] font-semibold text-[#0F766E] hover:underline"
            >
              {t('select_language')} →
            </button>
          </div>

          <div className="p-3">
            <p className="text-xs text-gray-500 mb-2.5 px-0.5">{t('language_description')}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SUPPORTED_LANGUAGES.map((langOpt) => {
                const isSelected = language === langOpt.code;
                return (
                  <button
                    key={langOpt.code}
                    id={`profile-lang-chip-${langOpt.code}`}
                    onClick={() => setLanguage(langOpt.code)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-sm'
                        : 'bg-white text-gray-800 border-gray-200 hover:border-teal-300 hover:bg-teal-50/30'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className={`text-sm leading-tight truncate ${isSelected ? 'font-bold text-white' : 'font-semibold text-gray-800'}`}>
                        {langOpt.nativeName}
                      </p>
                      <p className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                        {langOpt.name}
                      </p>
                    </div>
                    {isSelected && <Check size={14} strokeWidth={2.5} className="text-white shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Student Profile */}
        <section className="card overflow-hidden" aria-label="Student information">
          <div className="px-4 py-3 border-b border-gray-100" style={{ background: '#f8fafc' }}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('student_profile')}</p>
          </div>
          <div>
            <ProfileRow label={t('student_id')} value={student?.id ?? '—'} mono />
            <ProfileRow label={t('apaar_id')} value={student?.aparId ?? '—'} mono />
            <ProfileRow label={t('aadhaar')} value={student?.aadhaar ?? '—'} mono />
            <ProfileRow label={t('mobile')} value={student?.mobile ?? '—'} />
            <ProfileRow label={t('dob')} value={student?.dob ? formatDate(student.dob) : '—'} />
            <ProfileRow label={t('state')} value={student?.state ?? '—'} />
            <ProfileRow label={t('district')} value={student?.district ?? '—'} />
            <ProfileRow label={t('institution')} value={student?.institution ?? '—'} />
            <ProfileRow label={t('course')} value={student?.course ?? '—'} />
            <ProfileRow label={t('academic_year')} value={student?.academicYear ?? '—'} />
            <ProfileRow label={t('bank_ifsc')} value={student?.ifsc ?? '—'} mono last />
          </div>
        </section>

        {/* Quick actions */}
        <section className="card overflow-hidden" aria-label="Quick links">
          <MenuRow
            id="nav-language-menu"
            label={t('app_language')}
            sub={`${SUPPORTED_LANGUAGES.find((l) => l.code === language)?.nativeName} (${SUPPORTED_LANGUAGES.find((l) => l.code === language)?.name})`}
            Icon={Globe}
            onClick={() => setSection('language')}
          />
          <MenuRow
            id="nav-notifs"
            label={t('notifications')}
            sub={unreadCount > 0 ? `${unreadCount} ${t('unread')}` : t('all_caught_up')}
            badge={unreadCount > 0 ? String(unreadCount) : undefined}
            onClick={() => setSection('notifications')}
          />
          <MenuRow
            id="nav-payments"
            label={t('dbt_payment_history')}
            sub="View all scholarship disbursements"
            onClick={() => setSection('payments')}
          />
          <MenuRow
            id="nav-eligibility"
            label={t('eligibility_checker')}
            sub="Find out which schemes you qualify for"
            onClick={() => setSection('eligibility')}
            last
          />
        </section>

        {/* Support & Legal */}
        <section className="card overflow-hidden" aria-label="Support and legal">
          <div className="px-4 py-3 border-b border-gray-100" style={{ background: '#f8fafc' }}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('support_legal')}</p>
          </div>
          <MenuRow
            id="nav-help"
            label={t('help_support')}
            sub={t('helpline')}
            Icon={Phone}
            onClick={() => {}}
          />
          <MenuRow
            id="nav-privacy"
            label={t('privacy_policy')}
            Icon={Shield}
            onClick={() => setSection('privacy')}
          />
          <MenuRow
            id="nav-terms"
            label={t('terms_of_service')}
            Icon={FileText}
            onClick={() => setSection('terms')}
            last
          />
        </section>

        {/* App info */}
        <div className="card-sm px-4 py-3.5 flex items-center gap-3.5">
          <img src="/logo.jpg" alt="Tribal One" className="w-10 h-10 rounded-xl object-cover shrink-0 shadow-xs border border-gray-100" />
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="font-semibold text-gray-700">Tribal One v1.0.0</span> — SIH 2026 prototype for the
            Ministry of Tribal Affairs, Government of India.
          </p>
        </div>

        {/* Logout */}
        <button
          id="logout-btn"
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-red-600 rounded-xl border border-red-200 transition-colors hover:bg-red-50 mb-4"
          aria-label="Sign out"
        >
          <LogOut size={16} />
          {t('sign_out')}
        </button>
      </div>
    </div>
  );
}

// ── Sub-components ──

function ProfileRow({ label, value, mono = false, last = false }: { label: string; value: string; mono?: boolean; last?: boolean }) {
  return (
    <div
      className="px-4 py-3 flex items-start justify-between gap-4"
      style={{ borderBottom: last ? 'none' : '1px solid #f1f5f9' }}
    >
      <p className="text-xs text-gray-400 shrink-0 pt-0.5 font-medium">{label}</p>
      <p className={`text-sm text-gray-900 text-right leading-snug ${mono ? 'font-mono' : 'font-semibold'}`}>{value}</p>
    </div>
  );
}

function MenuRow({
  id, label, sub, onClick, Icon, badge, last = false,
}: {
  id: string;
  label: string;
  sub?: string;
  onClick: () => void;
  Icon?: React.FC<{ size?: number; className?: string }>;
  badge?: string;
  last?: boolean;
}) {
  return (
    <button
      id={id}
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-gray-50 transition-colors"
      style={{ borderBottom: last ? 'none' : '1px solid #f1f5f9' }}
    >
      {Icon && (
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
          <Icon size={16} className="text-gray-500" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
      </div>
      {badge && (
        <span className="w-5 h-5 rounded-full bg-[#0F766E] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
          {badge}
        </span>
      )}
      <ChevronRight size={15} className="text-gray-300 shrink-0" />
    </button>
  );
}

function SubPage({ title, onBack, children }: { title: string; onBack: () => void; children: React.ReactNode }) {
  const { t } = useApp();
  return (
    <div className="pb-20 bg-[#f5f7fa]">
      <header className="bg-[#0F766E] px-4 pt-14 pb-5">
        <button
          id="sub-back-btn"
          onClick={onBack}
          className="flex items-center gap-1.5 text-white/70 text-sm mb-3"
          aria-label="Back to profile"
        >
          <ChevronRight size={16} className="rotate-180" /> {t('back')}
        </button>
        <h1 className="text-white font-bold text-xl tracking-tight">{title}</h1>
      </header>
      {children}
    </div>
  );
}

// ── Eligibility Checker ──

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
  'Andaman & Nicobar Islands','Chandigarh','Puducherry',
];

function EligibilityChecker() {
  const [form, setForm] = useState({ age: '', classLevel: '', income: '', state: '', institutionType: '', category: 'ST', disability: 'no' });
  const [results, setResults] = useState<{ scheme: string; eligible: boolean; reason: string }[] | null>(null);

  const sel = (field: string) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
    setForm({ ...form, [field]: e.target.value });

  function check() {
    const age = parseInt(form.age);
    const cls = parseInt(form.classLevel);
    const income = parseInt(form.income);
    const isHigher = cls >= 13;
    const isPhD = cls >= 14;

    const out = SCHOLARSHIPS.map((s) => {
      const incOk = s.eligibility.incomeLimit === null || income <= s.eligibility.incomeLimit;
      let eligible = false;
      let reason = '';

      if (s.id === 'pre_matric') {
        eligible = incOk && cls >= 9 && cls <= 10 && form.category === 'ST';
        reason = eligible ? 'You are in Class IX–X, ST category, income within Rs. 2,50,000.' : !incOk ? 'Annual income exceeds Rs. 2,50,000.' : cls < 9 || cls > 10 ? 'Scheme is only for Class IX and X students.' : 'Category must be Scheduled Tribe (ST).';
      } else if (s.id === 'post_matric') {
        eligible = incOk && cls >= 11 && form.category === 'ST';
        reason = eligible ? 'You are studying Class XI or above, ST category, income within Rs. 2,50,000.' : !incOk ? 'Annual income exceeds Rs. 2,50,000.' : cls < 11 ? 'Scheme requires Class XI or above.' : 'Category must be Scheduled Tribe (ST).';
      } else if (s.id === 'top_class') {
        eligible = incOk && cls >= 11 && form.category === 'ST' && form.institutionType === 'notified';
        reason = eligible ? 'Enrolled in MoTA-notified institution, ST, income within Rs. 6 lakh.' : !incOk ? 'Annual income exceeds Rs. 6,00,000.' : form.institutionType !== 'notified' ? 'Institution must be on MoTA notified list (IIT/NIT/IIM/AIIMS/NLU etc.).' : cls < 11 ? 'Must be Class XI or above.' : 'Category must be Scheduled Tribe (ST).';
      } else if (s.id === 'nfst') {
        eligible = form.category === 'ST' && isPhD && !isNaN(age) && age <= 35;
        reason = eligible ? 'Pursuing M.Phil/PhD, ST category, age within 35 years.' : !isPhD ? 'Must be registered for M.Phil or PhD.' : age > 35 ? 'Age must not exceed 35 years.' : 'Category must be Scheduled Tribe (ST).';
      } else if (s.id === 'nos') {
        eligible = incOk && form.category === 'ST' && isHigher && !isNaN(age) && age <= 35;
        reason = eligible ? 'Meets income, age, ST category requirements. Ensure you have a foreign university admission letter.' : !incOk ? 'Annual income exceeds Rs. 6,00,000.' : age > 35 ? 'Age must not exceed 35 years.' : !isHigher ? 'Must be pursuing PG/PhD.' : 'Category must be Scheduled Tribe (ST).';
      }

      return { scheme: s.name, eligible, reason };
    });

    setResults(out);
  }

  const inputCls = 'input-base';

  if (results) {
    const eligible = results.filter((r) => r.eligible);
    const notEligible = results.filter((r) => !r.eligible);
    return (
      <div className="px-4 py-4 space-y-3">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
          {eligible.length} of {results.length} schemes eligible
        </p>

        {eligible.map((r) => (
          <div key={r.scheme} className="card px-4 py-3.5" style={{ borderLeft: '3px solid #15803d' }}>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{r.scheme}</p>
                <p className="text-xs text-green-700 mt-0.5 leading-relaxed">{r.reason}</p>
              </div>
            </div>
          </div>
        ))}

        {notEligible.map((r) => (
          <div key={r.scheme} className="card-sm px-4 py-3">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="8" height="8" fill="none" viewBox="0 0 24 24"><path stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600">{r.scheme}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{r.reason}</p>
              </div>
            </div>
          </div>
        ))}

        <button
          id="eligibility-reset-btn"
          onClick={() => setResults(null)}
          className="w-full py-3 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors mt-2"
          style={{ minHeight: 46 }}
        >
          Check Again
        </button>

        <p className="text-[11px] text-gray-400 text-center leading-relaxed">
          Indicative assessment only. Final eligibility is determined by the Ministry of Tribal Affairs.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <p className="text-sm text-gray-600 mb-5 leading-relaxed">
        Fill in the details below to find out which of the 5 official MoTA scholarship schemes you qualify for.
      </p>

      <div className="card p-4 space-y-4">
        <Field label="Age (years)" id="elig-age">
          <input id="elig-age" type="number" min="5" max="60" value={form.age} onChange={sel('age')} placeholder="e.g. 19" className={inputCls} />
        </Field>

        <Field label="Current Class / Level" id="elig-class">
          <select id="elig-class" value={form.classLevel} onChange={sel('classLevel')} className={inputCls}>
            <option value="">Select class or level</option>
            {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>Class {n}</option>)}
            <option value="9">Class IX</option>
            <option value="10">Class X</option>
            <option value="11">Class XI</option>
            <option value="12">Class XII</option>
            <option value="13">Graduation (UG)</option>
            <option value="13">Post-Graduation (PG / Masters)</option>
            <option value="14">M.Phil</option>
            <option value="14">PhD / Doctorate</option>
          </select>
        </Field>

        <Field label="Annual Family Income (Rs.)" id="elig-income">
          <input id="elig-income" type="number" min="0" step="1000" value={form.income} onChange={sel('income')} placeholder="e.g. 150000" className={inputCls} />
        </Field>

        <Field label="State" id="elig-state">
          <select id="elig-state" value={form.state} onChange={sel('state')} className={inputCls}>
            <option value="">Select state</option>
            {INDIAN_STATES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>

        <Field label="Type of Institution" id="elig-inst">
          <select id="elig-inst" value={form.institutionType} onChange={sel('institutionType')} className={inputCls}>
            <option value="">Select institution type</option>
            <option value="govt">Government School / College</option>
            <option value="aided">Government-Aided Institution</option>
            <option value="private">Private (Recognized)</option>
            <option value="notified">MoTA-Notified Premier Institution (IIT/NIT/IIM/AIIMS/NLU etc.)</option>
            <option value="foreign">Foreign University</option>
          </select>
        </Field>

        {/* Category toggle — Haqdarshak style */}
        <Field label="Category" id="elig-cat">
          <div className="flex gap-2">
            {['ST', 'Other'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setForm({ ...form, category: c })}
                className="flex-1 py-2.5 text-sm font-semibold rounded-xl border-2 transition-all"
                style={{
                  borderColor: form.category === c ? '#0F766E' : '#e5e9ef',
                  background: form.category === c ? '#0F766E' : '#fff',
                  color: form.category === c ? '#fff' : '#6b7280',
                  minHeight: 44,
                }}
                aria-pressed={form.category === c}
              >
                {c === 'ST' ? 'Scheduled Tribe (ST)' : 'Other (not eligible)'}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <button
        id="check-eligibility-btn"
        onClick={check}
        disabled={!form.age || !form.classLevel || !form.income || !form.state}
        className="btn-primary mt-4"
      >
        Check Eligibility
      </button>
    </div>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

// ── Policy sections ──

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #f1f5f9' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        {open ? <ChevronUp size={15} className="text-gray-400 shrink-0" /> : <ChevronDown size={15} className="text-gray-400 shrink-0" />}
      </button>
      {open && <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed space-y-2">{children}</div>}
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div className="pb-4">
      <div className="px-4 py-3 bg-[#f0faf9] border-b border-teal-100">
        <p className="text-xs text-teal-800 font-medium">Last Updated: 27 September 2025 · Ministry of Tribal Affairs (Demo Project)</p>
      </div>
      <div className="bg-white">
        <PolicySection title="1. Introduction">
          <p>Tribal One is a demonstration application developed for Smart India Hackathon (SIH) 2026. It is not an official Government of India service. This Privacy Policy explains how the application handles your data.</p>
        </PolicySection>
        <PolicySection title="2. Information We Collect">
          <p>This demo application does not collect, store, or transmit any real personal data to external servers. Data entered during login is used only within your browser session for demonstration purposes.</p>
          <p>The application uses browser localStorage solely to preserve your demo session across reloads.</p>
        </PolicySection>
        <PolicySection title="3. How We Use Information">
          <p>Data is used only to demonstrate the features of the application:</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>To display a simulated student dashboard</li>
            <li>To demonstrate scholarship application workflows</li>
            <li>To test AI assistant responses</li>
          </ul>
          <p className="mt-1">No data is shared with third parties or used for analytics.</p>
        </PolicySection>
        <PolicySection title="4. Aadhaar Data">
          <p>This application does not perform real Aadhaar authentication. Any Aadhaar number entered is not verified against UIDAI systems. The displayed Aadhaar (XXXX XXXX 8471) is a demo placeholder only.</p>
        </PolicySection>
        <PolicySection title="5. Cookies & Local Storage">
          <p>The application uses browser localStorage only to save your demo session. No cookies are used for tracking or advertising.</p>
        </PolicySection>
        <PolicySection title="6. Data Retention">
          <p>All data is stored in your browser's localStorage and is deleted when you sign out or clear your browser data. No data is persisted on any server.</p>
        </PolicySection>
        <PolicySection title="7. Children's Privacy">
          <p>This application may be used by students aged 14 and above for demonstration purposes. No real personal data of minors is collected or stored.</p>
        </PolicySection>
        <PolicySection title="8. Contact">
          <p>For official MoTA privacy concerns, visit tribal.nic.in. For this demo project, contact the SIH 2026 project team.</p>
        </PolicySection>
      </div>
    </div>
  );
}

function TermsOfService() {
  return (
    <div className="pb-4">
      <div className="px-4 py-3 bg-[#f0faf9] border-b border-teal-100">
        <p className="text-xs text-teal-800 font-medium">Last Updated: 27 September 2025 · Ministry of Tribal Affairs (Demo Project)</p>
      </div>
      <div className="bg-white">
        <PolicySection title="1. Nature of the Application">
          <p>Tribal One is a prototype created for Smart India Hackathon (SIH) 2026. It is not an official Government of India service and must not be used for actual scholarship applications.</p>
        </PolicySection>
        <PolicySection title="2. Accuracy of Information">
          <p>Scholarship scheme information is sourced from official MoTA, NSP, and SFMP portals as of September 2025. Always verify from official sources before applying:</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>tribal.nic.in</li>
            <li>scholarships.gov.in</li>
            <li>sfmp.tribal.nic.in</li>
          </ul>
        </PolicySection>
        <PolicySection title="3. No Financial or Legal Advice">
          <p>Nothing in this application constitutes official financial advice, legal advice, or a guarantee of scholarship eligibility or award. Final eligibility is determined solely by the Ministry of Tribal Affairs.</p>
        </PolicySection>
        <PolicySection title="4. Demo Authentication">
          <p>The login process is simulated. No real Aadhaar, APAAR, or mobile verification is performed. Do not enter your real credentials into this demo application.</p>
        </PolicySection>
        <PolicySection title="5. Intellectual Property">
          <p>Scholarship scheme names, government designations, and official nomenclature belong to the Government of India. They are used here solely for demonstration and educational purposes.</p>
        </PolicySection>
        <PolicySection title="6. Limitation of Liability">
          <p>The developers of Tribal One are not liable for any decisions made based on information displayed in this application. Use official government portals for all actual scholarship applications.</p>
        </PolicySection>
        <PolicySection title="7. Governing Law">
          <p>This application is governed by the laws of India. Disputes are subject to the jurisdiction of courts in India.</p>
        </PolicySection>
      </div>
    </div>
  );
}
