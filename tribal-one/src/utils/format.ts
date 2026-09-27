import type { ScholarshipStatus, DocumentStatus, PaymentStatus } from '../types';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const then = new Date(dateStr);
  const diffMs = now.getTime() - then.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return formatDate(dateStr);
}

export function statusLabel(status: ScholarshipStatus): string {
  const map: Record<ScholarshipStatus, string> = {
    not_applied: 'Not Applied',
    draft: 'Draft Saved',
    submitted: 'Submitted',
    under_verification: 'Under Verification',
    approved: 'Approved',
    sanctioned: 'Sanctioned',
    rejected: 'Rejected',
    renewal_due: 'Renewal Due',
  };
  return map[status] ?? status;
}

export function statusBadgeClass(status: ScholarshipStatus): string {
  const map: Record<ScholarshipStatus, string> = {
    not_applied: 'badge-draft',
    draft: 'badge-draft',
    submitted: 'badge-submitted',
    under_verification: 'badge-verification',
    approved: 'badge-approved',
    sanctioned: 'badge-sanctioned',
    rejected: 'badge-rejected',
    renewal_due: 'badge-pending',
  };
  return map[status] ?? 'badge-draft';
}

export function docStatusLabel(status: DocumentStatus): string {
  const map: Record<DocumentStatus, string> = {
    verified: 'Verified',
    pending: 'Pending Verification',
    expired: 'Expired',
    not_uploaded: 'Not Uploaded',
  };
  return map[status];
}

export function paymentStatusLabel(status: PaymentStatus): string {
  const map: Record<PaymentStatus, string> = {
    pending: 'Pending',
    processed: 'Processed',
    credited: 'Credited',
    failed: 'Failed',
  };
  return map[status];
}

export function maskAadhaar(aadhaar: string): string {
  return aadhaar.replace(/\d(?=\d{4})/g, 'X');
}

export function maskAccount(account: string): string {
  return `XXXX XXXX ${account.slice(-4)}`;
}
