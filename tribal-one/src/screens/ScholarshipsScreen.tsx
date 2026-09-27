import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, ChevronRight, ExternalLink, BookOpen, GraduationCap, Globe, Award, Landmark } from 'lucide-react';
import { SCHOLARSHIPS } from '../data/scholarships';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { StatusTimeline } from '../components/StatusTimeline';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/format';
import type { ScholarshipScheme } from '../types';

type View = 'list' | 'detail' | 'apply';

// Scheme icon mapping
const SCHEME_ICONS: Record<string, { Icon: React.FC<{ size?: number; style?: React.CSSProperties }>; bg: string; color: string }> = {
  pre_matric:  { Icon: BookOpen,    bg: '#eff6ff', color: '#2563eb' },
  post_matric: { Icon: GraduationCap, bg: '#f5f3ff', color: '#7c3aed' },
  top_class:   { Icon: Award,       bg: '#f0fdf4', color: '#16a34a' },
  nfst:        { Icon: Landmark,    bg: '#fff7ed', color: '#c2410c' },
  nos:         { Icon: Globe,       bg: '#f0faf9', color: '#0F766E' },
};

export function ScholarshipsScreen() {
  const { applications, payments } = useApp();
  const [view, setView] = useState<View>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedScheme = SCHOLARSHIPS.find((s) => s.id === selectedId);

  function handleView(id: string) { setSelectedId(id); setView('detail'); }
  function handleApply(id: string) { setSelectedId(id); setView('apply'); }

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
    <div className="pb-20 bg-[#f5f7fa]">
      {/* Header */}
      <header className="bg-[#0F766E] px-4 pt-14 pb-6">
        <p className="text-white/60 text-[11px] font-medium uppercase tracking-wide mb-0.5">Ministry of Tribal Affairs</p>
        <h1 className="text-white text-xl font-bold tracking-tight">MoTA Scholarship Schemes</h1>
        <p className="text-white/65 text-xs mt-1">5 Central Sector Schemes for Scheduled Tribe Students</p>
      </header>

      {/* Quick scheme icon grid — inspired by Haqdarshak */}
      <div className="px-4 -mt-5">
        <div className="card p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Schemes at a Glance</p>
          <div className="grid grid-cols-5 gap-2">
            {SCHOLARSHIPS.map((s) => {
              const cfg = SCHEME_ICONS[s.id];
              return (
                <button
                  key={s.id}
                  id={`quick-scheme-${s.id}`}
                  onClick={() => handleView(s.id)}
                  className="flex flex-col items-center gap-1.5 group"
                  aria-label={s.name}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-active:scale-95"
                    style={{ background: cfg.bg, border: `1.5px solid ${cfg.color}20` }}
                  >
                    <cfg.Icon size={20} style={{ color: cfg.color }} />
                  </div>
                  <span className="text-[9px] font-semibold text-gray-500 text-center leading-tight">
                    {s.shortName.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full scheme cards */}
      <div className="px-4 mt-4 space-y-3 mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">All Schemes</p>
        {SCHOLARSHIPS.map((scheme) => (
          <ScholarshipCard
            key={scheme.id}
            scheme={scheme}
            application={applications.find((a) => a.schemeId === scheme.id)}
            onView={handleView}
            onApply={handleApply}
          />
        ))}

        <div className="card-sm px-4 py-3">
          <p className="text-[11px] text-gray-500 leading-relaxed">
            <span className="font-semibold text-gray-700">Official Sources:</span>{' '}
            tribal.nic.in · scholarships.gov.in · sfmp.tribal.nic.in
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
  const cfg = SCHEME_ICONS[scheme.id];
  const hasApplied = application && application.status !== 'not_applied';

  return (
    <div className="pb-32 bg-[#f5f7fa]">
      {/* Header */}
      <header className="bg-[#0F766E] px-4 pt-14 pb-6">
        <button id="back-btn" onClick={onBack} className="flex items-center gap-1.5 text-white/70 text-sm mb-5" aria-label="Back">
          <ArrowLeft size={16} /> Back
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
            <span className="text-[10px] font-bold text-white/60 uppercase tracking-wide">{scheme.schemeCode}</span>
            <h1 className="text-white font-bold text-base leading-snug mt-0.5">{scheme.name}</h1>
            <p className="text-white/60 text-xs mt-0.5">{scheme.ministry}</p>
          </div>
        </div>
      </header>

      {/* Sections */}
      <div className="px-4 mt-4 space-y-3">
        <div className="card overflow-hidden">
          <Section title="Overview" defaultOpen>
            <p className="text-sm text-gray-700 leading-relaxed">{scheme.description}</p>
            <a
              href={scheme.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-[#0F766E]"
            >
              {scheme.portalName} <ExternalLink size={13} />
            </a>
          </Section>

          <Section title="Eligibility Criteria">
            <div className="space-y-2">
              <InfoRow label="Category" value={scheme.eligibility.category.join(', ')} />
              {scheme.eligibility.incomeLimit && (
                <InfoRow label="Income Limit" value={`${formatCurrency(scheme.eligibility.incomeLimit)} per annum`} />
              )}
              {scheme.eligibility.classRange && (
                <InfoRow
                  label="Class / Level"
                  value={`Class ${scheme.eligibility.classRange.min}–${scheme.eligibility.classRange.max === 999 ? 'and above' : scheme.eligibility.classRange.max}`}
                />
              )}
              {scheme.eligibility.ageLimit?.max && (
                <InfoRow label="Age Limit" value={`Up to ${scheme.eligibility.ageLimit.max} years`} />
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

          <Section title="Benefits">
            <div className="space-y-2">
              {scheme.benefits.map((b) => (
                <div key={b.label} className="bg-[#f0faf9] rounded-xl px-3.5 py-3">
                  <p className="text-xs text-gray-500 leading-snug">{b.label}</p>
                  <p className="text-sm font-bold text-[#0F766E] mt-0.5">{b.value}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Documents Required">
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

          <Section title="Important Dates">
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

          <Section title="Verification Process">
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
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Payment History</p>
            <StatusTimeline payment={payment} />
          </div>
        )}
      </div>

      {/* Sticky Apply */}
      <div className="fixed bottom-16 left-0 right-0 px-4 py-3 bg-white z-40" style={{ boxShadow: '0 -1px 0 #e5e9ef' }}>
        {!hasApplied ? (
          <button id="scheme-apply-btn" onClick={onApply} className="btn-primary">
            Apply for {scheme.shortName}
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
