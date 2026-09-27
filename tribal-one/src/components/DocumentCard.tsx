import { CheckCircle2, Clock, XCircle, Upload, Eye, AlertCircle } from 'lucide-react';
import type { UserDocument } from '../types';
import { formatDate } from '../utils/format';
import { useApp } from '../context/AppContext';

const DOC_SHORT: Record<string, string> = {
  aadhaar: 'ID',
  st_certificate: 'ST',
  income_certificate: 'INC',
  domicile: 'DOM',
  marksheet_10: 'X',
  marksheet_12: 'XII',
  current_marksheet: 'MK',
  apaar: 'AP',
  disability_certificate: 'DC',
  bank_passbook: 'BK',
  institution_certificate: 'BC',
  fee_receipt: 'FR',
  photograph: 'PH',
};

const STATUS_CFG = {
  verified: {
    Icon: CheckCircle2,
    iconColor: '#15803d',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    label: 'Verified',
    labelColor: '#15803d',
  },
  pending: {
    Icon: Clock,
    iconColor: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    label: 'Pending Verification',
    labelColor: '#d97706',
  },
  expired: {
    Icon: XCircle,
    iconColor: '#dc2626',
    bg: '#fef2f2',
    border: '#fecaca',
    label: 'Expired',
    labelColor: '#dc2626',
  },
  not_uploaded: {
    Icon: AlertCircle,
    iconColor: '#9ca3af',
    bg: '#f9fafb',
    border: '#e5e9ef',
    label: 'Not Uploaded',
    labelColor: '#9ca3af',
  },
};

export function DocumentCard({ document: doc }: { document: UserDocument }) {
  const { uploadDocument } = useApp();
  const cfg = STATUS_CFG[doc.status];

  return (
    <div
      className="rounded-xl p-3.5 flex items-center gap-3"
      style={{ background: '#fff', border: `1px solid ${cfg.border}` }}
      role="article"
      aria-label={doc.name}
    >
      {/* Doc type icon */}
      <div
        className="w-11 h-13 rounded-lg flex flex-col items-center justify-center shrink-0"
        style={{ background: cfg.bg, width: 44, height: 52 }}
        aria-hidden
      >
        <span className="text-[10px] font-black leading-none" style={{ color: cfg.iconColor }}>
          {DOC_SHORT[doc.type] ?? 'DOC'}
        </span>
        <div className="w-5 h-px bg-current mt-1 opacity-30" style={{ color: cfg.iconColor }} />
        <div className="w-3 h-px bg-current mt-0.5 opacity-20" style={{ color: cfg.iconColor }} />
        <div className="w-4 h-px bg-current mt-0.5 opacity-20" style={{ color: cfg.iconColor }} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 leading-snug truncate">{doc.name}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <cfg.Icon size={12} style={{ color: cfg.iconColor, flexShrink: 0 }} />
          <span className="text-xs font-semibold" style={{ color: cfg.labelColor }}>{cfg.label}</span>
        </div>
        {doc.uploadDate && (
          <p className="text-[11px] text-gray-400 mt-0.5">Uploaded {formatDate(doc.uploadDate)}</p>
        )}
        {doc.expiryDate && (
          <p className="text-[11px] text-gray-400">Valid till {formatDate(doc.expiryDate)}</p>
        )}
        {doc.verifiedBy && (
          <p className="text-[10px] text-gray-400 mt-0.5 truncate">by {doc.verifiedBy}</p>
        )}
      </div>

      {/* Action */}
      <div className="shrink-0">
        {doc.status === 'not_uploaded' || doc.status === 'expired' ? (
          <button
            id={`upload-doc-${doc.id}`}
            onClick={() => uploadDocument(doc.id)}
            className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl border transition-colors"
            style={{ borderColor: '#0F766E', color: '#0F766E', background: '#f0faf9', minHeight: 44 }}
            aria-label={`Upload ${doc.name}`}
          >
            <Upload size={14} />
            <span className="text-[10px] font-bold">Upload</span>
          </button>
        ) : (
          <button
            id={`view-doc-${doc.id}`}
            className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
            style={{ minHeight: 44 }}
            aria-label={`View ${doc.name}`}
          >
            <Eye size={14} />
            <span className="text-[10px] font-bold">View</span>
          </button>
        )}
      </div>
    </div>
  );
}
