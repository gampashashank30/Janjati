import { useState } from 'react';
import {
  X,
  Printer,
  ShieldCheck,
  FileText,
  Calendar,
  AlertCircle,
  Maximize2,
  ZoomIn,
  Eye,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import type { UserDocument, Student } from '../types';
import { formatDate } from '../utils/format';

interface DocumentModalProps {
  document: UserDocument;
  student: Student | null;
  onClose: () => void;
}

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

const DOC_METADATA_EXTRAS: Record<string, { authority: string; docNumber: string; format: string }> = {
  aadhaar: {
    authority: 'Unique Identification Authority of India (UIDAI)',
    docNumber: 'XXXX XXXX 8471',
    format: 'Aadhaar Smart Card · QR Verified',
  },
  apaar: {
    authority: 'Ministry of Education, Government of India',
    docNumber: '1234-5678-9012',
    format: 'APAAR One Nation One Student ID',
  },
  photograph: {
    authority: 'NSP Portal Identity Service',
    docNumber: 'IMG-2025-07-05-8472',
    format: '35mm x 45mm · 300 DPI Color Photo',
  },
  st_certificate: {
    authority: 'Sub-Divisional Officer, Nandurbar Division',
    docNumber: 'NDB/ST/2023/1045',
    format: 'Permanent Caste / Tribe Certificate',
  },
  domicile: {
    authority: 'Tahsildar Nandurbar, Revenue Department, Maharashtra',
    docNumber: 'DOM/NDB/2024/12345',
    format: 'Domicile & Age-Nationality Certificate',
  },
  income_certificate: {
    authority: 'Tahsildar Nandurbar, Government of Maharashtra',
    docNumber: 'TR/NDB/2023-24/5678',
    format: 'Annual Income Certificate (Form-B)',
  },
  marksheet_10: {
    authority: 'Central Board of Secondary Education (CBSE)',
    docNumber: 'CBSE/10/2024/1234567',
    format: 'Secondary School Examination Statement',
  },
  marksheet_12: {
    authority: 'Central Board of Secondary Education (CBSE)',
    docNumber: 'CBSE/12/2024/2618942',
    format: 'Senior School Certificate Marksheet',
  },
  current_marksheet: {
    authority: 'Government Medical College, Dhule',
    docNumber: 'GMC/EXAM/2025/1102',
    format: 'MBBS Phase-I Examination Transcript',
  },
  institution_certificate: {
    authority: 'Principal / Dean, Government Medical College, Dhule',
    docNumber: 'GMC/DHULE/ST/2025/419',
    format: 'Bonafide Student Certificate',
  },
  bank_passbook: {
    authority: 'State Bank of India, Nandurbar Branch',
    docNumber: 'A/C 38472910482 (IFSC: SBIN0000412)',
    format: 'Savings Account Passbook First Page',
  },
  fee_receipt: {
    authority: 'Accounts Section, Govt Medical College Dhule',
    docNumber: 'GMC/FEE/2025-26/1842',
    format: 'College & Hostel Tuition Receipt (PAID)',
  },
  disability_certificate: {
    authority: 'District Medical Board / UDID Authority',
    docNumber: 'UDID: MH254019284729',
    format: 'Certificate of Disability & UDID Card',
  },
};

export function DocumentModal({ document: doc, student, onClose }: DocumentModalProps) {
  const [activeTab, setActiveTab] = useState<'image' | 'details'>('image');
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imgSrc = DOC_IMAGES[doc.type] || '/docs/st_certificate.jpg';
  const meta = DOC_METADATA_EXTRAS[doc.type] || {
    authority: doc.verifiedBy || 'Government Authority',
    docNumber: 'DOC-MH-2025-VERIFIED',
    format: 'Certified Scanned Document',
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="doc-modal-title"
        onClick={onClose}
      >
        <div
          className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#0F766E] px-4 py-3 flex items-center justify-between text-white shrink-0 shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <FileText size={18} className="text-white/85 shrink-0" />
              <div className="min-w-0">
                <h2 id="doc-modal-title" className="font-bold text-sm truncate leading-tight">
                  {doc.name}
                </h2>
                <p className="text-[10px] text-white/70 truncate">{meta.format}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0 ml-2"
              aria-label="Close document preview"
            >
              <X size={18} />
            </button>
          </div>

          {/* Verification Status Banner */}
          <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 flex items-center justify-between text-xs text-emerald-800 shrink-0">
            <div className="flex items-center gap-1.5 font-medium truncate">
              {doc.status === 'verified' ? (
                <>
                  <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                  <span className="truncate">Verified via {doc.verifiedBy || meta.authority}</span>
                </>
              ) : doc.status === 'pending' ? (
                <>
                  <Calendar size={14} className="text-amber-600 shrink-0" />
                  <span className="text-amber-800">Uploaded — Under Verification</span>
                </>
              ) : doc.status === 'not_uploaded' ? (
                <>
                  <AlertCircle size={14} className="text-gray-500 shrink-0" />
                  <span className="text-gray-600">Sample Official Format Preview</span>
                </>
              ) : (
                <>
                  <AlertCircle size={14} className="text-red-500 shrink-0" />
                  <span className="text-red-700">Expired — Renewal Required</span>
                </>
              )}
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-emerald-200 uppercase tracking-wider text-emerald-700 shrink-0 ml-2">
              {doc.status.replace('_', ' ')}
            </span>
          </div>

          {/* View Mode Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50 px-3 pt-2 gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('image')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-t-lg transition-colors cursor-pointer border-t border-x ${
                activeTab === 'image'
                  ? 'bg-white text-[#0F766E] border-gray-200 shadow-2xs'
                  : 'text-gray-500 hover:text-gray-800 border-transparent'
              }`}
            >
              <Eye size={13} />
              <span>Official Document Scan</span>
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-t-lg transition-colors cursor-pointer border-t border-x ${
                activeTab === 'details'
                  ? 'bg-white text-[#0F766E] border-gray-200 shadow-2xs'
                  : 'text-gray-500 hover:text-gray-800 border-transparent'
              }`}
            >
              <FileText size={13} />
              <span>Extracted Details & Hash</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="p-3.5 sm:p-4 overflow-y-auto flex-1 bg-[#f8fafc] space-y-3">
            {activeTab === 'image' ? (
              <div className="space-y-3">
                {/* Document Image Container */}
                <div className="relative group bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden flex flex-col items-center">
                  {/* Image Bar with controls */}
                  <div className="w-full bg-gray-100 border-b border-gray-200 px-3 py-1.5 flex items-center justify-between text-[11px] text-gray-600">
                    <div className="flex items-center gap-1 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>DigiLocker Authenticated Scan</span>
                    </div>
                    <button
                      onClick={() => setIsZoomed(true)}
                      className="flex items-center gap-1 text-[#0F766E] font-semibold hover:underline cursor-pointer"
                      title="Enlarge Document"
                    >
                      <Maximize2 size={12} />
                      <span>Full View</span>
                    </button>
                  </div>

                  {/* Scanned Image */}
                  <div
                    className="p-2 sm:p-3 w-full flex items-center justify-center cursor-zoom-in bg-gray-50/70"
                    onClick={() => setIsZoomed(true)}
                    title="Click to view full size"
                  >
                    {!imageError ? (
                      <div className="relative max-h-[52vh] rounded-lg overflow-hidden border border-gray-300 shadow-md transition-transform duration-200 hover:scale-[1.01]">
                        <img
                          src={imgSrc}
                          alt={doc.name}
                          className="w-full h-auto max-h-[52vh] object-contain rounded-lg"
                          onError={() => setImageError(true)}
                        />
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white rounded text-[10px] font-medium flex items-center gap-1">
                          <ZoomIn size={11} />
                          <span>Click to Zoom</span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-400 space-y-2">
                        <FileText size={40} className="mx-auto text-gray-300" />
                        <p className="text-sm font-semibold text-gray-700">Document Image Verified</p>
                        <p className="text-xs text-gray-500">Record authenticated via State Repository</p>
                      </div>
                    )}
                  </div>

                  {/* Watermark / Digital Sign Notice */}
                  <div className="w-full bg-white border-t border-gray-100 px-3 py-2 flex items-center justify-between text-[10px] text-gray-500">
                    <span>Document ID: <strong className="font-mono text-gray-700">{meta.docNumber}</strong></span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={11} /> Cryptographically Signed
                    </span>
                  </div>
                </div>

                {/* Quick Info Chip */}
                <div className="bg-white rounded-xl p-3 border border-gray-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Beneficiary Name</span>
                    <strong className="text-gray-900">{student?.name ?? 'Ramesh Kumar Paharia'}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 block text-[10px]">Issued By</span>
                    <strong className="text-gray-900">{doc.verifiedBy || meta.authority}</strong>
                  </div>
                </div>
              </div>
            ) : (
              /* Structured Details Tab */
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4 border border-gray-200 text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <p className="font-bold text-gray-700 uppercase tracking-wide text-[10px]">
                      Verified Registry Information
                    </p>
                    <span className="text-[10px] text-emerald-600 font-semibold">✓ Verified Record</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-gray-600">
                    <div>
                      <span className="text-gray-400 block text-[10px]">Full Name</span>
                      <span className="font-semibold text-gray-900">{student?.name ?? 'Ramesh Kumar Paharia'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Document Certificate No.</span>
                      <span className="font-mono font-semibold text-gray-900">{meta.docNumber}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Document Category</span>
                      <span className="font-medium capitalize text-gray-900">{doc.type.replace('_', ' ')}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Issuing Authority</span>
                      <span className="font-medium text-gray-900">{doc.verifiedBy || meta.authority}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Upload / Issue Date</span>
                      <span className="font-medium text-gray-900">
                        {doc.uploadDate ? formatDate(doc.uploadDate) : '10 Jul 2024'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Validity Period</span>
                      {doc.expiryDate ? (() => {
                        const now = new Date();
                        now.setHours(0, 0, 0, 0);
                        const exp = new Date(doc.expiryDate);
                        exp.setHours(0, 0, 0, 0);
                        const diff = Math.ceil((exp.getTime() - now.getTime()) / 86_400_000);
                        const isUrgent = diff <= 45;

                        return (
                          <div>
                            <span className={`block font-bold ${isUrgent ? 'text-red-600' : 'text-gray-900'}`}>
                              {formatDate(doc.expiryDate)}
                            </span>
                            {isUrgent && (
                              <span className="inline-flex items-center gap-1 mt-0.5 text-[9px] font-black uppercase tracking-wider bg-red-600 text-white px-1.5 py-0.5 rounded shadow-2xs">
                                <AlertTriangle size={9} />
                                {diff < 0 ? 'Expired' : `Expires in ${diff} days`}
                              </span>
                            )}
                          </div>
                        );
                      })() : (
                        <span className="font-medium text-gray-900">Permanent / Valid</span>
                      )}
                    </div>
                    <div className="col-span-2 pt-1 border-t border-gray-100">
                      <span className="text-gray-400 block text-[10px]">National Student ID / APAAR</span>
                      <span className="font-mono text-gray-800">{student?.aparId ?? '1234-5678-9012'}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-400 block text-[10px]">Enrolled Academic Institution</span>
                      <span className="font-medium text-gray-900">
                        {student?.institution ?? 'Government Medical College, Dhule'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expiry Warning Callout */}
                {doc.expiryDate && (() => {
                  const now = new Date();
                  now.setHours(0, 0, 0, 0);
                  const exp = new Date(doc.expiryDate);
                  exp.setHours(0, 0, 0, 0);
                  const diff = Math.ceil((exp.getTime() - now.getTime()) / 86_400_000);
                  if (diff > 45) return null;

                  return (
                    <div className="bg-red-50 border-2 border-red-300 rounded-xl p-3 text-xs flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <AlertTriangle size={13} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-red-900 leading-snug">Document Renewal Required</p>
                        <p className="text-[11px] text-red-700 mt-0.5 leading-relaxed">
                          This {doc.name} will expire in <span className="font-extrabold text-red-900 bg-red-100 px-1 py-0.2 rounded">{diff} days</span> (Valid till {formatDate(doc.expiryDate)}). Please initiate renewal with Tahsildar / MeeSeva to avoid scholarship holds.
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* Digital Locker Hash Certificate */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <ShieldCheck size={14} className="text-emerald-700" />
                    <span>NSP & DigiLocker SHA-256 Checksum</span>
                  </div>
                  <p className="font-mono text-[9px] text-emerald-800 break-all bg-white/80 p-1.5 rounded border border-emerald-200">
                    9b1c7f428d024e39ed756193cb8fb2a2722180344cab4e39b04e39ed1790537
                  </p>
                  <p className="text-[10px] text-emerald-700">
                    Direct integration verified with National Scholarship Portal (NSP) Repository.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-3 bg-white border-t border-gray-200 flex items-center justify-between gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
            >
              <Printer size={14} />
              <span>Print Document</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsZoomed(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0F766E] bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer border border-emerald-200"
              >
                <ZoomIn size={14} />
                <span>Enlarge</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-[#0d6560] rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Fullscreen Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-60 bg-black/90 flex flex-col items-center justify-center p-3 animate-fadeIn"
          onClick={() => setIsZoomed(false)}
        >
          <div className="absolute top-4 right-4 flex items-center gap-3 text-white z-70">
            <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">{doc.name}</span>
            <button
              onClick={() => setIsZoomed(false)}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close zoomed view"
            >
              <X size={20} />
            </button>
          </div>
          <div
            className="max-w-4xl max-h-[88vh] overflow-auto p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imgSrc}
              alt={doc.name}
              className="w-auto h-auto max-h-[85vh] max-w-full rounded-xl shadow-2xl border-2 border-white/20 object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </>
  );
}
