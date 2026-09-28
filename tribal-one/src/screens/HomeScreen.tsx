import { User, ChevronRight, AlertCircle, Clock, IndianRupee, FileCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate, statusLabel, statusBadgeClass } from '../utils/format';

export function HomeScreen() {
  const { student, applications, payments, notifications, unreadCount, setActiveTab, navigateToScholarships, navigateToProgramme, markNotificationRead, t } = useApp();

  const activeApps = applications.filter((a) => ['submitted', 'under_verification', 'draft'].includes(a.status)).length;
  const approvedApps = applications.filter((a) => ['approved', 'sanctioned'].includes(a.status)).length;
  const totalReceived = payments.filter((p) => p.status === 'credited').reduce((sum, p) => sum + p.amount, 0);
  const pendingVerif = applications.filter((a) => a.status === 'under_verification').length;
  const recentNotifs = notifications.slice(0, 3);
  const latestPayment = payments[0];

  const upcomingDeadlines = [
    { scheme: 'Post-Matric Scholarship — Renewal 2025–26', date: '2025-10-31' },
    { scheme: 'Top Class Education — Institute Verification', date: '2025-11-30' },
  ];

  return (
    <div className="pb-28 screen-scroll bg-[#f5f7fa]">
      {/* ── Header ── */}
      <header className="bg-[#0F766E] px-4 pt-14 pb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 p-0.5 shadow-sm ring-2 ring-white/30 overflow-hidden">
              <img src="/logo.jpg" alt="Tribal One Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <p className="text-white/70 text-[11px] font-medium uppercase tracking-wide">{t('mota_title')}</p>
              <h1 className="text-white text-xl font-bold tracking-tight mt-0.5">{t('app_title')}</h1>
            </div>
          </div>
          <button
            id="profile-btn"
            onClick={() => setActiveTab('profile')}
            className="relative w-10 h-10 flex items-center justify-center bg-white/10 rounded-full border border-white/15"
            aria-label="Student Profile"
          >
            <User size={19} className="text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#F59E0B] text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Welcome card */}
        <div
          className="rounded-2xl px-4 py-4"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 overflow-hidden border-2 border-white/40 shadow-xs">
              <img
                src="/ramesh_paharia.jpg"
                alt={student?.name ?? 'Student Photo'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/70 text-xs">{t('welcome')}</p>
              <p className="text-white font-semibold text-base leading-snug truncate">{student?.name}</p>
              <p className="text-white/55 text-[11px] mt-0.5">
                {student?.aparId} · AY {student?.academicYear}
              </p>
            </div>
            <div className="shrink-0">
              <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30">
                {t('scheduled_tribe')}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 mt-4 space-y-5">
        {/* ── Summary grid ── */}
        <section aria-label="Summary overview">
          <div className="grid grid-cols-2 gap-3">
            <SummaryCard
              id="card-active-apps"
              Icon={Clock}
              iconBg="#f0faf9"
              iconColor="#0F766E"
              value={String(activeApps)}
              label={t('active_applications')}
              sub="In progress"
              onClick={() => navigateToScholarships('my_applications')}
            />
            <SummaryCard
              id="card-approved"
              Icon={FileCheck}
              iconBg="#f0fdf4"
              iconColor="#15803d"
              value={String(approvedApps)}
              label={t('approved_schemes')}
              sub="This year"
              onClick={() => navigateToScholarships('approved')}
            />
            <SummaryCard
              id="card-received"
              Icon={IndianRupee}
              iconBg="#f0faf9"
              iconColor="#0F766E"
              value={formatCurrency(totalReceived)}
              label={t('total_received_dbt')}
              sub="Via DBT / PFMS"
              onClick={() => setActiveTab('profile')}
            />
            <SummaryCard
              id="card-pending"
              Icon={AlertCircle}
              iconBg="#fffbeb"
              iconColor="#d97706"
              value={String(pendingVerif)}
              label={t('under_verification')}
              sub="Awaiting review"
              onClick={() => navigateToScholarships('under_verification')}
            />
          </div>
        </section>

        {/* ── DBT Payment Status ── */}
        {latestPayment && (
          <section aria-label="Latest DBT payment">
            <div className="section-header">
              <span className="section-title">DBT Payment Status</span>
              <button
                id="view-payments-btn"
                onClick={() => setActiveTab('profile')}
                className="section-link flex items-center gap-0.5"
              >
                History <ChevronRight size={13} />
              </button>
            </div>
            <div className="card px-4 py-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 leading-snug">{latestPayment.schemeName}</p>
                  <p className="text-xs text-gray-500 mt-0.5 font-mono">{latestPayment.utrNumber}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-base font-bold text-green-600">{formatCurrency(latestPayment.amount)}</p>
                  <span className="text-[10px] font-semibold text-green-600">Credited</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                  <span>Submitted</span>
                  <span>Verified</span>
                  <span>Approved</span>
                  <span>Sanctioned</span>
                  <span className="text-green-600 font-semibold">Credited</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-green-500 h-2 rounded-full w-full" />
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-2">{formatDate(latestPayment.date)} · SBI Nandurbar</p>
            </div>
          </section>
        )}

        {/* ── My Applications ── */}
        {applications.length > 0 && (
          <section aria-label="My applications">
            <div className="section-header">
              <span className="section-title">My Applications</span>
              <button
                id="view-schemes-btn"
                onClick={() => setActiveTab('scholarships')}
                className="section-link flex items-center gap-0.5"
              >
                View all <ChevronRight size={13} />
              </button>
            </div>
            <div className="space-y-2.5">
              {applications.map((app) => (
                <div key={app.id} className="card px-4 py-3.5">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className="text-sm font-semibold text-gray-900 leading-snug flex-1">{app.schemeName}</p>
                    <span className={`badge ${statusBadgeClass(app.status)} shrink-0`}>
                      {statusLabel(app.status)}
                    </span>
                  </div>
                  {app.applicationNumber && (
                    <p className="text-xs text-gray-400 font-mono">{app.applicationNumber}</p>
                  )}
                  {app.remarks && (
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed border-t border-gray-100 pt-1.5">{app.remarks}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Upcoming Deadlines ── */}
        <section aria-label="Upcoming deadlines">
          <div className="section-header">
            <span className="section-title">{t('upcoming_deadlines')}</span>
          </div>
          <div className="space-y-2.5">
            {upcomingDeadlines.map((dl) => (
              <div
                key={dl.scheme}
                className="card-sm px-4 py-3.5 flex items-center gap-3"
                style={{ borderLeft: '3px solid #F59E0B' }}
              >
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-[#d97706]" aria-hidden />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 leading-snug">{dl.scheme}</p>
                  <p className="text-xs text-[#d97706] font-semibold mt-0.5">{formatDate(dl.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Other MoTA Programmes ── */}
        <section aria-label="Other programmes">
          <div className="section-header">
            <span className="section-title">Other MoTA Programmes</span>
            <button
              id="view-programmes-btn"
              onClick={() => navigateToProgramme(null)}
              className="section-link flex items-center gap-0.5"
            >
              {t('view_all')} <ChevronRight size={13} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { id: 'emrs',     label: 'EMRS',           sub: 'School & Education', color: '#1d4ed8', bg: '#eff6ff' },
              { id: 'asry',     label: 'ASRY',           sub: 'Education Loan',     color: '#b45309', bg: '#fffbeb' },
              { id: 'goal',     label: 'GOAL',           sub: 'Skill Development',  color: '#0d6560', bg: '#f0faf9' },
              { id: 'pm_janman',label: 'PM-JANMAN',      sub: 'PVTG Welfare',       color: '#15803d', bg: '#f0fdf4' },
              { id: 'da_jgua',  label: 'DA-JGUA',        sub: 'Tribal Development', color: '#9a3412', bg: '#fff7ed' },
              { id: 'vcf_st',   label: 'VCF-ST',         sub: 'Entrepreneurship',   color: '#7c3aed', bg: '#f5f3ff' },
            ].map((prog) => (
              <button
                key={prog.id}
                id={`home-prog-${prog.id}`}
                onClick={() => navigateToProgramme(prog.id)}
                className="card p-3.5 text-left flex items-start gap-2.5 active:scale-95 transition-transform hover:shadow-md cursor-pointer"
                aria-label={`View ${prog.label} programme`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: prog.bg }}
                  aria-hidden
                >
                  <span className="text-[10px] font-black" style={{ color: prog.color }}>
                    {prog.label.slice(0, 2)}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900 leading-snug">{prog.label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{prog.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </section>


        {/* ── Recent Notifications ── */}
        <section aria-label="Recent notifications" className="mb-4">
          <div className="section-header">
            <span className="section-title">{t('notifications')}</span>
            {unreadCount > 0 && (
              <span className="text-xs font-semibold text-[#0F766E]">{unreadCount} {t('unread')}</span>
            )}
          </div>
          <div className="card overflow-hidden">
            {recentNotifs.map((notif, i) => (
              <button
                key={notif.id}
                id={`notif-home-${notif.id}`}
                onClick={() => markNotificationRead(notif.id)}
                className="w-full text-left px-4 py-3.5 flex items-start gap-3 hover:bg-gray-50 transition-colors"
                style={{
                  borderBottom: i < recentNotifs.length - 1 ? '1px solid #f1f5f9' : 'none',
                  background: !notif.read ? '#f0faf9' : '#fff',
                }}
                aria-label={notif.title}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {!notif.read && <span className="w-2 h-2 rounded-full bg-[#0F766E] shrink-0" aria-label="Unread" />}
                    <p className="text-sm font-semibold text-gray-900 leading-snug truncate">{notif.title}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">{notif.message}</p>
                </div>
                <ChevronRight size={15} className="text-gray-300 shrink-0 mt-0.5" aria-hidden />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function SummaryCard({
  id, Icon, iconBg, iconColor, value, label, sub, onClick,
}: {
  id: string;
  Icon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }>;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button
      id={id}
      onClick={onClick}
      className="card p-4 text-left w-full active:scale-95 transition-transform"
      aria-label={label}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
        style={{ background: iconBg }}
        aria-hidden
      >
        <Icon size={18} style={{ color: iconColor }} />
      </div>
      <p className="text-xl font-bold text-gray-900 leading-none tracking-tight">{value}</p>
      <p className="text-xs font-semibold text-gray-700 mt-1.5 leading-snug">{label}</p>
      <div className="flex items-center justify-between mt-0.5">
        <p className="text-[11px] text-gray-400">{sub}</p>
        <ChevronRight size={12} className="text-gray-300" aria-hidden />
      </div>
    </button>
  );
}
