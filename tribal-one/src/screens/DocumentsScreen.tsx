import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DocumentCard } from '../components/DocumentCard';
import { DocumentModal } from '../components/DocumentModal';
import type { DocumentType, UserDocument } from '../types';
import { formatDate } from '../utils/format';

const CATEGORIES: { label: string; types: DocumentType[]; icon: string }[] = [
  { label: 'Identity', types: ['aadhaar', 'apaar', 'photograph'], icon: '🪪' },
  { label: 'Caste & Domicile', types: ['st_certificate', 'domicile'], icon: '📜' },
  { label: 'Income', types: ['income_certificate'], icon: '💰' },
  { label: 'Academic Records', types: ['marksheet_10', 'marksheet_12', 'current_marksheet', 'institution_certificate'], icon: '📋' },
  { label: 'Financial', types: ['bank_passbook', 'fee_receipt'], icon: '🏦' },
  { label: 'Other', types: ['disability_certificate'], icon: '📁' },
];

export function DocumentsScreen() {
  const { documents, student } = useApp();
  const [selectedDoc, setSelectedDoc] = useState<UserDocument | null>(null);

  const verified = documents.filter((d) => d.status === 'verified').length;
  const pending = documents.filter((d) => d.status === 'pending').length;
  const missing = documents.filter((d) => d.status === 'not_uploaded').length;
  const total = documents.length;
  const pct = Math.round((verified / total) * 100);

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const expiringDocs = documents.filter((d) => {
    if (!d.expiryDate || d.status === 'not_uploaded') return false;
    const exp = new Date(d.expiryDate);
    exp.setHours(0, 0, 0, 0);
    const diff = Math.ceil((exp.getTime() - now.getTime()) / 86_400_000);
    return diff <= 45;
  });

  return (
    <div className="pb-20 bg-[#f5f7fa]">
      {/* Header */}
      <header className="bg-[#0F766E] px-4 pt-14 pb-6">
        <p className="text-white/60 text-[11px] font-medium uppercase tracking-wide mb-0.5">Digital Document Wallet</p>
        <h1 className="text-white text-xl font-bold tracking-tight">My Documents</h1>
        <p className="text-white/65 text-xs mt-1">Manage scholarship documents securely</p>
      </header>

      {/* Summary card */}
      <div className="px-4 -mt-5">
        <div className="card p-4">
          {/* Stats row */}
          <div className="flex items-center justify-between mb-4">
            <Stat value={String(verified)} label="Verified" color="#15803d" />
            <div className="w-px h-8 bg-gray-100" aria-hidden />
            <Stat value={String(pending)} label="Pending" color="#d97706" />
            <div className="w-px h-8 bg-gray-100" aria-hidden />
            <Stat value={String(missing)} label="Missing" color="#dc2626" />
            <div className="w-px h-8 bg-gray-100" aria-hidden />
            <Stat value={String(total)} label="Total" color="#0F766E" />
          </div>

          {/* Progress */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-600">Completeness</p>
              <p className="text-xs font-bold text-[#0F766E]">{pct}%</p>
            </div>
            <div
              className="h-2.5 rounded-full overflow-hidden"
              style={{ background: '#f1f5f9' }}
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  background: pct === 100 ? '#15803d' : '#0F766E',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Document Expiry Alert Banner ── */}
      {expiringDocs.length > 0 && (
        <div className="px-4 mt-3">
          <div className="rounded-2xl bg-[#fff1f2] border-2 border-red-500 p-4 shadow-sm flex items-start gap-3 ring-2 ring-red-400/30">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shrink-0 shadow-xs animate-pulse">
              <AlertTriangle size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-white bg-red-600 px-2 py-0.5 rounded-full shadow-2xs">
                  Expiry Warning
                </span>
                <span className="text-xs font-bold text-red-800">Action Required</span>
              </div>
              {expiringDocs.map((doc) => {
                const exp = new Date(doc.expiryDate!);
                exp.setHours(0, 0, 0, 0);
                const diff = Math.ceil((exp.getTime() - now.getTime()) / 86_400_000);
                return (
                  <p key={doc.id} className="text-xs font-bold text-red-950 mt-1.5 leading-snug">
                    <span className="underline decoration-red-500 font-extrabold">{doc.name}</span> will expire in{' '}
                    <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-[11px] font-black tracking-wide">
                      {diff} days
                    </span>{' '}
                    (Valid till {formatDate(doc.expiryDate!)}).
                  </p>
                );
              })}
              <p className="text-[11px] text-red-700 mt-1.5 leading-relaxed">
                Renew via local Tehsildar / MeeSeva to avoid disruption in scholarship verifications and DBT disbursements.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Document categories */}
      <div className="px-4 mt-4 space-y-4 mb-4">
        {CATEGORIES.map((cat) => {
          const catDocs = documents.filter((d) => cat.types.includes(d.type));
          if (catDocs.length === 0) return null;
          return (
            <section key={cat.label} aria-label={cat.label}>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{cat.label}</p>
              <div className="space-y-2">
                {catDocs.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    onView={(d) => setSelectedDoc(d)}
                  />
                ))}
              </div>
            </section>
          );
        })}

        <div className="card-sm px-4 py-3">
          <p className="text-[11px] text-gray-500 leading-relaxed">
            <span className="font-semibold text-gray-700">Note:</span> Verified documents have been authenticated through DigiLocker, government databases, or competent authority records. Click <strong>View</strong> or <strong>Template</strong> on any document to inspect its official layout and details.
          </p>
        </div>
      </div>

      {/* Document Template Preview Modal */}
      {selectedDoc && (
        <DocumentModal
          document={selectedDoc}
          student={student}
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </div>
  );
}

function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="text-center">
      <p className="text-xl font-bold" style={{ color }}>{value}</p>
      <p className="text-[10px] font-semibold text-gray-400 mt-0.5">{label}</p>
    </div>
  );
}
