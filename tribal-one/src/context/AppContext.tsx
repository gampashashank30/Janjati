import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  Student,
  Application,
  UserDocument,
  Notification,
  PaymentRecord,
  NavTab,
  Language,
} from '../types';
import { getTranslation, type TranslationKey } from '../utils/translations';

interface AppContextType {
  isLoggedIn: boolean;
  student: Student | null;
  applications: Application[];
  documents: UserDocument[];
  notifications: Notification[];
  payments: PaymentRecord[];
  activeTab: NavTab;
  language: Language;
  unreadCount: number;
  /** Deep-link filter for ScholarshipsScreen, consumed once and reset to null */
  scholarshipFilter: string | null;
  /** Deep-link programme ID for ProgrammesScreen */
  selectedProgrammeId: string | null;
  /** Deep-link section for ProfileScreen (e.g. 'notifications') */
  profileSection: string | null;
  login: (method: string, credential: string) => Promise<void>;
  logout: () => void;
  setActiveTab: (tab: NavTab) => void;
  /** Navigate to Scholarships tab with a pre-set filter */
  navigateToScholarships: (filter: string | null) => void;
  /** Navigate to Programmes tab with optional specific programme pre-selected */
  navigateToProgramme: (programmeId: string | null) => void;
  /** Navigate to Profile tab and open a specific section (e.g. 'notifications') */
  navigateToNotifications: () => void;
  clearProfileSection: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  uploadDocument: (docId: string) => void;
  submitApplication: (app: Application) => void;
  clearScholarshipFilter: () => void;
  clearSelectedProgramme: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

// Demo student — realistic data only, no fake names
const DEMO_STUDENT: Student = {
  id: 'STU-2025-0041872',
  name: 'Ramesh Kumar Paharia',
  aadhaar: 'XXXX XXXX 8471',
  aparId: 'AP2025MH041872',
  category: 'ST',
  state: 'Maharashtra',
  district: 'Nandurbar',
  institution: 'Government Medical College, Dhule',
  course: 'MBBS (Bachelor of Medicine and Bachelor of Surgery)',
  academicYear: '2025–26',
  annualIncome: 148000,
  class: 12,
  dob: '2003-04-15',
  mobile: '+91 98XXXXXX23',
  email: 'ramesh.paharia@student.example.in',
  bankAccount: 'XXXXXXXXXXXX4821',
  ifsc: 'SBIN0020411',
  bankName: 'State Bank of India, Nandurbar',
};

const DEMO_APPLICATIONS: Application[] = [
  {
    id: 'APP-2025-TC-00192',
    schemeId: 'top_class',
    schemeName: 'Top Class Education Scheme for ST Students',
    status: 'under_verification',
    submittedDate: '2025-09-12',
    lastUpdated: '2025-09-20',
    amountApplied: 280000,
    applicationNumber: 'MH-TCE-2025-0041872',
    remarks: 'Documents under verification at District Tribal Welfare Office, Nandurbar.',
  },
  {
    id: 'APP-2024-PM-00831',
    schemeId: 'post_matric',
    schemeName: 'Post-Matric Scholarship for ST Students',
    status: 'sanctioned',
    submittedDate: '2024-09-05',
    lastUpdated: '2024-11-14',
    amountApplied: 43200,
    amountSanctioned: 43200,
    applicationNumber: 'MH-POM-2024-0041872',
    remarks: 'Amount sanctioned and DBT credit initiated.',
  },
  {
    id: 'APP-2024-NFST-00219',
    schemeId: 'nfst',
    schemeName: 'National Fellowship for ST Students (NFST)',
    status: 'rejected',
    submittedDate: '2024-09-18',
    lastUpdated: '2024-11-05',
    amountApplied: 25000,
    applicationNumber: 'MH-NFST-2024-0041872',
    remarks: 'Application rejected at District Verification level due to expired Income Certificate.',
    rejectionDetail: {
      stage: 'district',
      rejectedBy: 'District Nodal Officer, Nandurbar (Tribal Welfare Department)',
      rejectedOn: '2024-11-05',
      reasonCode: 'DOC_EXPIRED',
      reasonTitle: 'Income Certificate Expired / Invalid',
      reasonDescription:
        'The Income Certificate submitted with your application (Cert. No. NDB-IC-2023-0418) was issued on 14 March 2023 and had expired before the application deadline. As per NSP guidelines, income certificates must be issued within the same financial year as the application. The District Nodal Officer could not verify your income eligibility and the application was rejected at District level.',
      faultDocument: 'Income Certificate (Cert. No. NDB-IC-2023-0418)',
      canReapply: true,
      nextSteps: [
        'Obtain a fresh Income Certificate from the Tehsildar (Revenue Department), Nandurbar — valid for financial year 2025–26.',
        'Ensure the certificate is signed by a Revenue Officer of Tehsildar rank or above and bears an official seal.',
        'Upload the new certificate to your NSP profile under "Document Wallet" before applying.',
        'When the NFST application window reopens (typically August–October), submit a fresh application on the NSP portal at scholarships.gov.in.',
        'After submission, track Institute → District → State verification steps to avoid a repeat rejection.',
      ],
    },
  },
];

const DEMO_DOCUMENTS: UserDocument[] = [
  { id: 'doc-1', type: 'aadhaar', name: 'Aadhaar Card', status: 'verified', uploadDate: '2024-07-10', verifiedBy: 'DigiLocker' },
  { id: 'doc-2', type: 'st_certificate', name: 'ST Certificate', status: 'verified', uploadDate: '2024-07-10', expiryDate: '2029-07-09', verifiedBy: 'District Collector, Nandurbar' },
  { id: 'doc-3', type: 'income_certificate', name: 'Income Certificate', status: 'verified', uploadDate: '2025-05-02', expiryDate: '2026-11-02', verifiedBy: 'Tehsildar, Nandurbar' },
  { id: 'doc-4', type: 'domicile', name: 'Domicile Certificate', status: 'verified', uploadDate: '2024-07-12', verifiedBy: 'Revenue Department, Maharashtra' },
  { id: 'doc-5', type: 'marksheet_10', name: 'Class X Marksheet (CBSE)', status: 'verified', uploadDate: '2024-07-15', verifiedBy: 'CBSE DigiLocker' },
  { id: 'doc-6', type: 'marksheet_12', name: 'Class XII Marksheet (CBSE)', status: 'verified', uploadDate: '2025-06-10', verifiedBy: 'CBSE DigiLocker' },
  { id: 'doc-7', type: 'apaar', name: 'APAAR Record', status: 'verified', uploadDate: '2025-07-01', verifiedBy: 'Ministry of Education' },
  { id: 'doc-8', type: 'bank_passbook', name: 'Bank Passbook (SBI)', status: 'verified', uploadDate: '2025-08-01', verifiedBy: 'PFMS DBT Cell' },
  { id: 'doc-9', type: 'institution_certificate', name: 'Bonafide Certificate — GMC Dhule', status: 'pending', uploadDate: '2025-09-10' },
  { id: 'doc-10', type: 'fee_receipt', name: 'Fee Receipt 2025–26', status: 'pending', uploadDate: '2025-09-10' },
  { id: 'doc-11', type: 'photograph', name: 'Passport Photograph', status: 'verified', uploadDate: '2025-07-05' },
  { id: 'doc-12', type: 'disability_certificate', name: 'Disability Certificate', status: 'not_uploaded' },
];

const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    type: 'verification_complete',
    title: 'State-Level Verification Completed',
    message: 'Your Post-Matric Scholarship application (MH-POM-2024-0041872) has been verified by the Maharashtra Tribal Development Department.',
    timestamp: '2025-09-20T14:30:00',
    read: false,
    schemeId: 'post_matric',
  },
  {
    id: 'notif-2',
    type: 'dbt_credited',
    title: 'DBT Credit: Rs. 43,200 Received',
    message: 'Post-Matric Scholarship amount of Rs. 43,200 has been credited to your bank account ending XXXX4821. UTR: SBINR20241114041872.',
    timestamp: '2025-09-18T09:15:00',
    read: false,
    schemeId: 'post_matric',
  },
  {
    id: 'notif-3',
    type: 'document_deficiency',
    title: 'Action Required: Document Pending',
    message: 'Your Top Class Education application requires an updated Fee Receipt for 2025–26. Please upload within 7 days to avoid rejection.',
    timestamp: '2025-09-15T11:00:00',
    read: true,
    schemeId: 'top_class',
  },
  {
    id: 'notif-4',
    type: 'renewal',
    title: 'Renewal Reminder — Post-Matric Scholarship',
    message: 'The Post-Matric Scholarship renewal window is open until 31 October 2025. Log in to NSP to renew your application for 2025–26.',
    timestamp: '2025-09-01T08:00:00',
    read: true,
    schemeId: 'post_matric',
  },
  {
    id: 'notif-5',
    type: 'info',
    title: 'Top Class Education Application Received',
    message: 'Your application for Top Class Education Scheme (MH-TCE-2025-0041872) has been received and is under Institute-level verification.',
    timestamp: '2025-09-12T16:45:00',
    read: true,
    schemeId: 'top_class',
  },
];

const DEMO_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-1',
    schemeId: 'post_matric',
    schemeName: 'Post-Matric Scholarship 2024–25',
    amount: 43200,
    date: '2024-11-14',
    transactionId: 'SBINR20241114041872',
    utrNumber: 'UTR24318041872',
    status: 'credited',
    stage: 'DBT Credited',
    bankAccount: 'XXXXXXXXXXXX4821',
  },
  {
    id: 'pay-2',
    schemeId: 'post_matric',
    schemeName: 'Post-Matric Scholarship 2023–24',
    amount: 38400,
    date: '2023-12-02',
    transactionId: 'SBINR20231202041872',
    utrNumber: 'UTR23336041872',
    status: 'credited',
    stage: 'DBT Credited',
    bankAccount: 'XXXXXXXXXXXX4821',
  },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [applications, setApplications] = useState<Application[]>(DEMO_APPLICATIONS);
  const [documents, setDocuments] = useState<UserDocument[]>(DEMO_DOCUMENTS);
  const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS);
  const [payments] = useState<PaymentRecord[]>(DEMO_PAYMENTS);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [scholarshipFilter, setScholarshipFilter] = useState<string | null>(null);
  const [selectedProgrammeId, setSelectedProgrammeId] = useState<string | null>(null);
  const [profileSection, setProfileSection] = useState<string | null>(null);
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('tribal_one_lang') as Language | null;
      if (saved && ['en', 'te', 'hi', 'kn', 'ta', 'ml'].includes(saved)) {
        return saved;
      }
    } catch {}
    return 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('tribal_one_lang', lang);
    } catch {}
  }, []);

  const t = useCallback(
    (key: TranslationKey) => getTranslation(language, key),
    [language]
  );

  // Restore session from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tribal_one_session');
    if (saved === 'true') {
      setIsLoggedIn(true);
      setStudent(DEMO_STUDENT);
    }
  }, []);

  const login = useCallback(async (_method: string, _credential: string) => {
    // Demo auth — simulates OTP verification delay
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    setIsLoggedIn(true);
    setStudent(DEMO_STUDENT);
    localStorage.setItem('tribal_one_session', 'true');
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setStudent(null);
    localStorage.removeItem('tribal_one_session');
    setActiveTab('home');
  }, []);

  const navigateToScholarships = useCallback((filter: string | null) => {
    setScholarshipFilter(filter);
    setActiveTab('scholarships');
  }, []);

  const clearScholarshipFilter = useCallback(() => {
    setScholarshipFilter(null);
  }, []);

  const navigateToProgramme = useCallback((programmeId: string | null) => {
    setSelectedProgrammeId(programmeId);
    setActiveTab('programmes');
  }, []);

  const clearSelectedProgramme = useCallback(() => {
    setSelectedProgrammeId(null);
  }, []);

  const navigateToNotifications = useCallback(() => {
    setProfileSection('notifications');
    setActiveTab('profile');
  }, []);

  const clearProfileSection = useCallback(() => {
    setProfileSection(null);
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const uploadDocument = useCallback((docId: string) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId
          ? { ...d, status: 'pending', uploadDate: new Date().toISOString().split('T')[0] }
          : d
      )
    );
  }, []);

  const submitApplication = useCallback((newApp: Application) => {
    setApplications((prev) => {
      const idx = prev.findIndex((a) => a.schemeId === newApp.schemeId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = newApp;
        return next;
      }
      return [newApp, ...prev];
    });

    const notif: Notification = {
      id: `notif-${Date.now()}`,
      title: 'Application Submitted',
      message: `Your scholarship application for ${newApp.schemeName} (${newApp.applicationNumber || 'Ref #' + Date.now().toString().slice(-6)}) has been submitted successfully.`,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'info',
      schemeId: newApp.schemeId,
    };
    setNotifications((prev) => [notif, ...prev]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        student,
        applications,
        documents,
        notifications,
        payments,
        activeTab,
        language,
        scholarshipFilter,
        selectedProgrammeId,
        profileSection,
        unreadCount,
        login,
        logout,
        setActiveTab,
        navigateToScholarships,
        clearScholarshipFilter,
        navigateToProgramme,
        clearSelectedProgramme,
        navigateToNotifications,
        clearProfileSection,
        setLanguage,
        t,
        markNotificationRead,
        markAllRead,
        uploadDocument,
        submitApplication,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
