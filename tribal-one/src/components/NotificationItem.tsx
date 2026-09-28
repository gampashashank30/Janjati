import { AlertCircle, CheckCircle2, IndianRupee, Bell, RefreshCw, ChevronRight } from 'lucide-react';
import type { Notification } from '../types';
import { timeAgo } from '../utils/format';
import { useApp } from '../context/AppContext';

interface NotificationItemProps {
  notification: Notification;
}

const CFG = {
  document_deficiency:  { Icon: AlertCircle,   iconColor: '#dc2626', bg: '#fef2f2', dot: '#dc2626', label: 'Document issue' },
  verification_complete:{ Icon: CheckCircle2,  iconColor: '#15803d', bg: '#f0fdf4', dot: '#15803d', label: 'Verification' },
  sanctioned:           { Icon: CheckCircle2,  iconColor: '#0F766E', bg: '#f0faf9', dot: '#0F766E', label: 'Sanctioned' },
  dbt_credited:         { Icon: IndianRupee,   iconColor: '#0F766E', bg: '#f0faf9', dot: '#0F766E', label: 'Payment' },
  renewal:              { Icon: RefreshCw,     iconColor: '#d97706', bg: '#fffbeb', dot: '#d97706', label: 'Renewal' },
  info:                 { Icon: Bell,          iconColor: '#2563eb', bg: '#eff6ff', dot: '#2563eb', label: 'Info' },
};

export function NotificationItem({ notification: notif }: NotificationItemProps) {
  const { markNotificationRead, setActiveTab, navigateToScholarships, navigateToNotifications } = useApp();
  const cfg = CFG[notif.type];

  function handleClick() {
    markNotificationRead(notif.id);

    // Smart redirect based on notification type
    if (notif.type === 'document_deficiency') {
      // Documents have an issue → go to Documents tab
      setActiveTab('documents');
    } else if (
      notif.type === 'verification_complete' ||
      notif.type === 'sanctioned' ||
      notif.type === 'dbt_credited' ||
      notif.type === 'renewal' ||
      (notif.type === 'info' && notif.schemeId)
    ) {
      // Scholarship-related → My Applications in Scholarships tab
      navigateToScholarships('my_applications');
    } else {
      // Anything else → Profile > Notifications full list
      navigateToNotifications();
    }
  }

  // Contextual action label shown on the right
  const actionLabel =
    notif.type === 'document_deficiency'    ? 'Go to Documents →' :
    notif.type === 'dbt_credited'           ? 'View Payment →' :
    notif.type === 'sanctioned'             ? 'View Application →' :
    notif.type === 'verification_complete'  ? 'Track Status →' :
    notif.type === 'renewal'                ? 'Apply Now →' :
    notif.schemeId                          ? 'View Application →' :
                                              'All Notifications →';

  return (
    <button
      className="w-full text-left flex gap-3 px-4 py-4 transition-all active:scale-[0.99] group"
      style={{
        borderBottom: '1px solid #f1f5f9',
        background: !notif.read ? '#f8fffe' : '#fff',
      }}
      onClick={handleClick}
      aria-label={notif.title}
    >
      {/* Type icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
        style={{ background: cfg.bg }}
        aria-hidden
      >
        <cfg.Icon size={17} style={{ color: cfg.iconColor }} />
      </div>

      {/* Text content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-gray-900 leading-snug">{notif.title}</p>
          {!notif.read && (
            <span
              className="w-2 h-2 rounded-full shrink-0 mt-1.5"
              style={{ background: cfg.dot }}
              aria-label="Unread"
            />
          )}
        </div>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{notif.message}</p>
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-[11px] text-gray-400 font-medium">{timeAgo(notif.timestamp)}</p>
          <span
            className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ background: cfg.bg, color: cfg.iconColor }}
          >
            {actionLabel}
          </span>
        </div>
      </div>

      <ChevronRight
        size={14}
        className="text-gray-300 shrink-0 mt-2 group-hover:text-gray-400 transition-colors"
        aria-hidden
      />
    </button>
  );
}
