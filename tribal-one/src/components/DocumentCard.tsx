import { CheckCircle2, Clock, XCircle, Upload, Eye, AlertCircle } from 'lucide-react';
import type { UserDocument } from '../types';
import { formatDate } from '../utils/format';
import { useApp } from '../context/AppContext';

const DOC_IMAGES: Record<string, string> = {
  aadhaar: '/docs/aadhaar.jpg',
  apaar: '/docs/apaar.jpg',
  photograph: '/docs/photograph.jpg',
  st_certificate: '/docs/st_certificate.jpg',
  domicile: '/docs/domicile.jpg',
  income_certificate: '/docs/income_certificate.jpg',
  marksheet_10: '/docs/marksheet_10.jpg',
  marksheet_12: '/docs/marksheet_12.jpg',
  current_marksheet: '/docs/current_marksheet.jpg',
  institution_certificate: '/docs/institution_certificate.jpg',
  bank_passbook: '/docs/bank_passbook.jpg',
  fee_receipt: '/docs/fee_receipt.jpg',
  disability_certificate: '/docs/disability_certificate.jpg',
};

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

export function DocumentCard({
  document: doc,
  onView,
}: {
  document: UserDocument;
  onView?: (doc: UserDocument) => void;
}) {
  const { uploadDocument } = useApp();
  const cfg = STATUS_CFG[doc.status];

  return (
    <div
      className="rounded-xl p-3.5 flex items-center gap-3 transition-shadow hover:shadow-xs"
      style={{ background: '#fff', border: `1px solid ${cfg.border}` }}
      role="article"
      aria-label={doc.name}
    >
      {/* Doc type thumbnail with realistic generated document image */}
      <div
        className="w-12 h-14 rounded-lg flex flex-col items-center justify-center shrink-0 cursor-pointer overflow-hidden border border-gray-200 shadow-2xs relative group bg-gray-50"
        onClick={() => onView?.(doc)}
        title={`Click to view ${doc.name}`}
      >
        <img
          src={DOC_IMAGES[doc.type]}
          alt={doc.name}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        <span className="text-[9px] font-black leading-none absolute bottom-0.5 right-0.5 px-1 py-0.5 bg-white/90 rounded text-gray-800 shadow-2xs">
          {DOC_SHORT[doc.type] ?? 'DOC'}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onView?.(doc)}>
        <p className="text-sm font-semibold text-gray-900 leading-snug truncate hover:text-[#0F766E] transition-colors">{doc.name}</p>
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
      <div className="shrink-0 flex items-center gap-1.5">
        {doc.status === 'not_uploaded' ? (
          <>
            <button
              id={`sample-doc-${doc.id}`}
              onClick={() => onView?.(doc)}
              className="flex flex-col items-center gap-0.5 px-2.5 py-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
              style={{ minHeight: 44 }}
              aria-label={`View template for ${doc.name}`}
              title="View Format Template"
            >
              <Eye size={14} />
              <span className="text-[9px] font-bold">Template</span>
            </button>
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
          </>
        ) : (
          <button
            id={`view-doc-${doc.id}`}
            onClick={() => onView?.(doc)}
            className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl border border-gray-200 text-gray-600 hover:text-[#0F766E] hover:border-[#0F766E] hover:bg-[#f0faf9] transition-colors"
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
