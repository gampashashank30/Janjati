export type ScholarshipStatus =
  | 'not_applied'
  | 'draft'
  | 'submitted'
  | 'under_verification'
  | 'approved'
  | 'sanctioned'
  | 'rejected'
  | 'renewal_due';

export type DocumentStatus = 'verified' | 'pending' | 'expired' | 'not_uploaded';

export type PaymentStatus = 'pending' | 'processed' | 'credited' | 'failed';

/**
 * Machine-readable deadline for a scheme.
 * - annualDeadline: scheme reopens every year on the same month+day.
 * - fixedDeadline: one-time fixed ISO date (YYYY-MM-DD).
 * Both can coexist (e.g. annual with an exception override year).
 */
export interface DeadlineConfig {
  /** Recurring: month (1–12) and day of the application close date */
  annualDeadline?: { month: number; day: number };
  /** One-time fixed deadline ISO string YYYY-MM-DD */
  fixedDeadline?: string;
  /** Human label for display in ImportantDates table */
  label: string;
}

export interface ScholarshipScheme {
  id: string;
  name: string;
  shortName: string;
  ministry: string;
  level: 'Pre-Matric' | 'Post-Matric' | 'Higher Education' | 'Fellowship' | 'Overseas' | 'Skill Development' | 'Education Loan' | 'Livelihood' | 'Entrepreneurship' | 'Women Empowerment' | 'School Education' | 'Community Finance';
  description: string;
  eligibility: EligibilityCriteria;
  benefits: Benefit[];
  documents: DocumentRequirement[];
  importantDates: ImportantDate[];
  verificationProcess: string[];
  applicationUrl: string;
  portalName: string;
  schemeCode: string;
  /** Machine-readable deadline — drives the dynamic Missed Opportunities engine */
  deadlineConfig?: DeadlineConfig;
}

export interface EligibilityCriteria {
  category: string[];
  incomeLimit: number | null;
  classRange?: { min: number; max: number };
  ageLimit?: { min?: number; max?: number };
  institutionType?: string[];
  minimumMarks?: number;
  other?: string[];
}

export interface Benefit {
  label: string;
  value: string;
}

export interface DocumentRequirement {
  name: string;
  mandatory: boolean;
  description?: string;
}

export interface ImportantDate {
  event: string;
  date: string;
  note?: string;
}

export interface Student {
  id: string;
  name: string;
  aadhaar: string; // masked
  aparId: string;
  category: 'ST';
  state: string;
  district: string;
  institution: string;
  course: string;
  academicYear: string;
  annualIncome: number;
  class: number;
  dob: string;
  mobile: string;
  email?: string;
  bankAccount: string;
  ifsc: string;
  bankName: string;
}

export type RejectionStage =
  | 'institute'
  | 'district'
  | 'state'
  | 'ministry';

export interface RejectionDetail {
  stage: RejectionStage;              // At which level it was rejected
  rejectedBy: string;                 // Human-readable authority name
  rejectedOn: string;                 // Date string
  reasonCode: string;                 // Short code, e.g. 'DOC_EXPIRED'
  reasonTitle: string;                // e.g. 'Income Certificate Expired'
  reasonDescription: string;          // Full explanation
  faultDocument?: string;             // Which specific document caused the rejection
  canReapply: boolean;
  nextSteps: string[];                // Ordered action items for the student
}

export interface Application {
  id: string;
  schemeId: string;
  schemeName: string;
  status: ScholarshipStatus;
  submittedDate?: string;
  lastUpdated: string;
  amountApplied?: number;
  amountSanctioned?: number;
  applicationNumber?: string;
  remarks?: string;
  rejectionDetail?: RejectionDetail;  // Only present when status === 'rejected'
}

export interface PaymentRecord {
  id: string;
  schemeId: string;
  schemeName: string;
  amount: number;
  date: string;
  transactionId: string;
  status: PaymentStatus;
  stage: string;
  utrNumber?: string;
  bankAccount?: string;
}

export interface UserDocument {
  id: string;
  type: DocumentType;
  name: string;
  status: DocumentStatus;
  uploadDate?: string;
  expiryDate?: string;
  fileSize?: string;
  verifiedBy?: string;
}

export type DocumentType =
  | 'aadhaar'
  | 'st_certificate'
  | 'income_certificate'
  | 'domicile'
  | 'marksheet_10'
  | 'marksheet_12'
  | 'current_marksheet'
  | 'apaar'
  | 'disability_certificate'
  | 'bank_passbook'
  | 'institution_certificate'
  | 'fee_receipt'
  | 'photograph';

export interface Notification {
  id: string;
  type: 'document_deficiency' | 'verification_complete' | 'sanctioned' | 'dbt_credited' | 'renewal' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  schemeId?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  language: Language;
}

export type Language = 'en' | 'hi' | 'te' | 'kn' | 'ta' | 'ml';

export type NavTab = 'home' | 'scholarships' | 'programmes' | 'documents' | 'jago' | 'profile';
