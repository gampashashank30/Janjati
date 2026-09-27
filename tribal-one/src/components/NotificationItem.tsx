import { AlertCircle, CheckCircle2, IndianRupee, Bell, RefreshCw } from 'lucide-react';
import type { Notification } from '../types';
import { timeAgo } from '../utils/format';
import { useApp } from '../context/AppContext';

interface NotificationItemProps {
  notification: Notification;
}

const CFG = {
  document_deficiency: { Icon: AlertCircle, iconColor: '#dc2626', bg: '#fef2f2', dot: '#dc2626' },
  verification_complete: { Icon: CheckCircle2, iconColor: '#15803d', bg: '#f0fdf4', dot: '#15803d' },
  sanctioned: { Icon: CheckCircle2, iconColor: '#0F766E', bg: '#f0faf9', dot: '#0F766E' },
  dbt_credited: { Icon: IndianRupee, iconColor: '#0F766E', bg: '#f0faf9', dot: '#0F766E' },
  renewal: { Icon: RefreshCw, iconColor: '#d97706', bg: '#fffbeb', dot: '#d97706' },
  info: { Icon: Bell, iconColor: '#2563eb', bg: '#eff6ff', dot: '#2563eb' },
};

export function NotificationItem({ notification: notif }: NotificationItemProps) {
  const { markNotificationRead } = useApp();
  const cfg = CFG[notif.type];

  return (
    <button
      className="w-full text-left flex gap-3 px-4 py-4 transition-colors"
      style={{
        borderBottom: '1px solid #f1f5f9',
        background: !notif.read ? '#f8fffe' : '#fff',
      }}
      onClick={() => markNotificationRead(notif.id)}
      aria-label={notif.title}
    >
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
        style={{ background: cfg.bg }}
        aria-hidden
      >
        <cfg.Icon size={17} style={{ color: cfg.iconColor }} />
      </div>

      {/* Content */}
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
        <p className="text-[11px] text-gray-400 mt-1.5 font-medium">{timeAgo(notif.timestamp)}</p>
      </div>
    </button>
  );
}
