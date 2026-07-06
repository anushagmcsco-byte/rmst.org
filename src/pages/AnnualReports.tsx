import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wheat, 
  GraduationCap, 
  Briefcase, 
  Map, 
  FileSpreadsheet, 
  ChartBar, 
  Receipt, 
  FileCheck, 
  ShieldCheck, 
  BadgeCheck, 
  FileBadge, 
  ReceiptText, 
  BookOpen, 
  Download, 
  Eye, 
  ArrowUpRight, 
  Lock, 
  Check, 
  Search, 
  FileText, 
  Sparkles, 
  TrendingUp, 
  Building, 
  Award, 
  Heart, 
  Sprout, 
  Shield, 
  X, 
  Send, 
  Calendar, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  BookOpenCheck, 
  Info, 
  ExternalLink, 
  Folder, 
  FolderOpen, 
  Maximize2, 
  CheckCircle, 
  Plus, 
  Database, 
  LayoutDashboard, 
  Sliders, 
  FileUp, 
  Trash2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  BarChart, 
  Bar,
  ComposedChart,
  Line
} from 'recharts';

interface AnnualReportsProps {
  highContrast: boolean;
}

// ==========================================
// DATA DEFINITIONS (ESG & COMPLIANCE ALIGNED)
// ==========================================

const QUICK_HIGHLIGHTS = [
  { id: 'qh_1', title: "5,000+", subtitle: "Farmers Empowered", icon: Wheat, desc: "Supported with regenerative inputs & soil kits" },
  { id: 'qh_2', title: "3,000+", subtitle: "Youth Trained", icon: GraduationCap, desc: "Trained in smart IT labs and Python coding" },
  { id: 'qh_3', title: "1,500+", subtitle: "Livelihoods Supported", icon: Briefcase, desc: "Through dairy co-ops and micro-enterprises" },
  { id: 'qh_4', title: "12+", subtitle: "Districts Covered", icon: Map, desc: "Active project clusters across Karnataka" }
];

const INITIAL_ANNUAL_REPORTS = [
  {
    id: 'ar_2025_26',
    year: 'FY 2025-26',
    title: 'Nurturing Resilience & Scaling Impact',
    coverImage: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600',
    publicationDate: 'June 25, 2026',
    size: '5.4 MB',
    pages: 54,
    refNo: 'RMST/AR/2025-26/01',
    description: 'Detailed analysis of our integrated regional farming models, 8 new smart STEM labs, and ESG progress across 12 Karnataka districts.',
    highlights: ['4,200 soil health cards distributed', '6 village micro-grids activated', '₹1.2Cr direct beneficiary value generated']
  },
  {
    id: 'ar_2024_25',
    year: 'FY 2024-25',
    title: 'Transforming Lives, Securing Futures',
    coverImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=600',
    publicationDate: 'June 18, 2025',
    size: '4.8 MB',
    pages: 48,
    refNo: 'RMST/AR/2024-25/03',
    description: 'Annual progress report focusing on women dairy cooperative ledgers, localized watershed restoration, and digital literacy frameworks.',
    highlights: ['1,800 women co-op accounts digitized', '15 farm ponds executed', '₹84L CSR funds deployed with 100% audit audit approval']
  },
  {
    id: 'ar_2023_24',
    year: 'FY 2023-24',
    title: 'Empowerment through Grassroots Action',
    coverImage: 'https://images.unsplash.com/photo-1504813184591-01552fffd3be?auto=format&fit=crop&q=80&w=600',
    publicationDate: 'June 12, 2024',
    size: '3.9 MB',
    pages: 42,
    refNo: 'RMST/AR/2023-24/02',
    description: 'Comprehensive annual summary detailing the inception of solar irrigation pumps, student coding drives, and rural diagnostics.',
    highlights: ['1,200 marginal farmers certified', '4 STEM centers founded', 'First MCA CSR-1 clearance audit successful']
  }
];

const FINANCIAL_STATEMENTS = [
  {
    category: 'Balance Sheet',
    icon: FileSpreadsheet,
    files: [
      { year: 'FY 2025-26', name: 'Audited Balance Sheet & Schedules', refNo: 'BS-2526-RMST', size: '1.4 MB', date: 'June 2026', status: 'Audited' },
      { year: 'FY 2024-25', name: 'Audited Balance Sheet & Schedules', refNo: 'BS-2425-RMST', size: '1.2 MB', date: 'June 2025', status: 'Audited' },
      { year: 'FY 2023-24', name: 'Audited Balance Sheet & Schedules', refNo: 'BS-2324-RMST', size: '1.1 MB', date: 'June 2024', status: 'Audited' }
    ]
  },
  {
    category: 'Income & Expenditure Statement',
    icon: ChartBar,
    files: [
      { year: 'FY 2025-26', name: 'Income & Expenditure Statement', refNo: 'IE-2526-RMST', size: '1.1 MB', date: 'June 2026', status: 'Audited' },
      { year: 'FY 2024-25', name: 'Income & Expenditure Statement', refNo: 'IE-2425-RMST', size: '1.0 MB', date: 'June 2025', status: 'Audited' },
      { year: 'FY 2023-24', name: 'Income & Expenditure Statement', refNo: 'IE-2324-RMST', size: '920 KB', date: 'June 2024', status: 'Audited' }
    ]
  },
  {
    category: 'Receipt & Payment Account',
    icon: Receipt,
    files: [
      { year: 'FY 2025-26', name: 'Receipts & Payments Statement', refNo: 'RP-2526-RMST', size: '940 KB', date: 'June 2026', status: 'Audited' },
      { year: 'FY 2024-25', name: 'Receipts & Payments Statement', refNo: 'RP-2425-RMST', size: '890 KB', date: 'June 2025', status: 'Audited' },
      { year: 'FY 2023-24', name: 'Receipts & Payments Statement', refNo: 'RP-2324-RMST', size: '810 KB', date: 'June 2024', status: 'Audited' }
    ]
  },
  {
    category: 'Audit Report',
    icon: FileCheck,
    files: [
      { year: 'FY 2025-26', name: 'Independent Auditor Statutory Report', refNo: 'AR-2526-HegdeAssoc', size: '2.8 MB', date: 'June 2026', auditor: 'M/s Hegde & Associates, Chartered Accountants' },
      { year: 'FY 2024-25', name: 'Independent Auditor Statutory Report', refNo: 'AR-2425-HegdeAssoc', size: '2.5 MB', date: 'June 2025', auditor: 'M/s Hegde & Associates, Chartered Accountants' },
      { year: 'FY 2023-24', name: 'Independent Auditor Statutory Report', refNo: 'AR-2324-HegdeAssoc', size: '2.2 MB', date: 'June 2024', auditor: 'M/s Hegde & Associates, Chartered Accountants' }
    ]
  }
];

const IMPACT_REPORTS = [
  {
    title: "Agriculture Impact Report",
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600",
    metrics: ["1,500+ Farm Ponds Tested", "42% Nitrogen Fertilizer Reductions", "AAA Operational Rating"],
    year: "2025-2026 Summary",
    author: "Third-Party Agri-Science Board",
    refNo: 'RMST-IR-AGRI-25'
  },
  {
    title: "Women Empowerment Report",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=600",
    metrics: ["2,400+ SHG Accounts Activated", "₹48 Lakhs Monthly Co-op Pay", "100% Financial Inclusion"],
    year: "2025-2026 Summary",
    author: "Karnataka State Dairy Board",
    refNo: 'RMST-IR-WOMEN-25'
  },
  {
    title: "Education & AI Skills Report",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
    metrics: ["3,100 Students Coding Weekly", "8 Dedicated IT Smart Hubs", "98% Retentive Performance"],
    year: "2024-2025 Summary",
    author: "IIT Bangalore Advisory Committee",
    refNo: 'RMST-IR-STEM-24'
  },
  {
    title: "Climate Action Report",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600",
    metrics: ["14,000 Saplings Planted", "5 Restored Lake Watersheds", "34 Tons Carbon Offset (Est)"],
    year: "2024-2025 Summary",
    author: "Socio-Environmental Audits",
    refNo: 'RMST-IR-CLIM-24'
  }
];

// Recharts Dashboard Data
const PROGRAM_EXPENDITURE_PIE = [
  { name: 'Regenerative Agri & Irrigation', value: 42, color: '#0B5D3B' },
  { name: 'Women SHGs & Dairy Co-ops', value: 25, color: '#C99A32' },
  { name: 'Rural STEM & Coding Hubs', value: 18, color: '#1E40AF' },
  { name: 'Mobile Medical & Nutrition', value: 15, color: '#9333EA' }
];

const ADMIN_COST_RATIO_TRENDS = [
  { year: '2021', program: 86.5, admin: 13.5 },
  { year: '2022', program: 88.0, admin: 12.0 },
  { year: '2023', program: 89.2, admin: 10.8 },
  { year: '2024', program: 91.5, admin: 8.5 },
  { year: '2025', program: 92.4, admin: 7.6 }
];

const DISTRICT_RESOURCE_ALLOCATION = [
  { district: 'Haveri', budget: 38.5, activeUnits: 14, families: 4200 },
  { district: 'Dharwad', budget: 32.2, activeUnits: 11, families: 3800 },
  { district: 'Belagavi', budget: 28.9, activeUnits: 15, families: 4500 },
  { district: 'Raichur', budget: 24.5, activeUnits: 12, families: 3100 },
  { district: 'Bidar', budget: 19.8, activeUnits: 9, families: 2200 },
  { district: 'Bagalkot', budget: 16.5, activeUnits: 8, families: 2800 },
  { district: 'Vijayapura', budget: 14.2, activeUnits: 7, families: 1900 },
  { district: 'Kalaburagi', budget: 12.5, activeUnits: 6, families: 1500 }
];

const YOY_FUND_GROWTH = [
  { year: 'FY 21-22', csrInflow: 18.2, grants: 8.5, deployment: 24.8 },
  { year: 'FY 22-23', csrInflow: 34.5, grants: 14.8, deployment: 45.2 },
  { year: 'FY 23-24', csrInflow: 58.9, grants: 22.4, deployment: 76.5 },
  { year: 'FY 24-25', csrInflow: 92.4, grants: 31.8, deployment: 118.9 },
  { year: 'FY 25-26', csrInflow: 138.5, grants: 48.2, deployment: 178.4 }
];

const BENEFICIARY_DISTRIBUTION = [
  { segment: 'Marginal Farmers', direct: 5200, indirect: 18400 },
  { segment: 'Women Artisans/SHGs', direct: 3100, indirect: 11200 },
  { segment: 'Rural Schoolchildren', direct: 4800, indirect: 15600 },
  { segment: 'Cooperative Members', direct: 2200, indirect: 8900 }
];

const SDG_ALIGNMENT = [
  { goal: 'SDG 1: No Poverty', alignment: 'High', projects: 4, weight: 90 },
  { goal: 'SDG 2: Zero Hunger', alignment: 'Primary', projects: 6, weight: 95 },
  { goal: 'SDG 5: Gender Equality', alignment: 'Primary', projects: 5, weight: 88 },
  { goal: 'SDG 8: Decent Work', alignment: 'High', projects: 3, weight: 85 },
  { goal: 'SDG 13: Climate Action', alignment: 'Expanding', projects: 2, weight: 75 }
];

const GOVERNANCE_PRINCIPLES = [
  { title: "Independent Audits", desc: "Our annual accounting ledgers are continuously audited by independent legal firms under strict ICAI directives." },
  { title: "Quarterly Reviews", desc: "The General Assembly of Trustees convenes four times a year to verify project metrics, cash flows, and bank registers." },
  { title: "Real-time Monitoring", desc: "Every farm pond, solar STEM installation, and SHG diary ledger is digitized with GIS tracking for remote oversight." },
  { title: "Third Party Assessments", desc: "We host external evaluators from statutory boards (e.g., NABARD advisory boards) to benchmark outcomes." },
  { title: "100% Tax Exemption", desc: "Compliant with 80G certificates & CSR-1 registrations ensuring direct routing of all contributions into projects." }
];

const COMPLIANCE_REPOSITORY_DOCS = [
  { title: "NGO Darpan Registration", refNo: "KA/2023/0342549", icon: ShieldCheck, authority: "NITI Aayog, Govt of India", status: "Verified Exemption", date: "Oct 2023" },
  { title: "CSR-1 Registration", refNo: "CSR00059487", icon: BadgeCheck, authority: "Ministry of Corporate Affairs", status: "Active Clearance", date: "Apr 2023" },
  { title: "12A Certificate", refNo: "AAETR3286KE20221", icon: FileBadge, authority: "Income Tax Department", status: "Exempt Statutory Status", date: "Nov 2022" },
  { title: "80G Certificate", refNo: "AAETR3286KF20231", icon: ReceiptText, authority: "Income Tax Department", status: "Tax-Exempt Donor Advantage", date: "Jan 2023" },
  { title: "Registered Trust Deed", refNo: "Book IV/682/2021", icon: BookOpen, authority: "Sub-Registrar Hubballi", status: "Executed Constitution", date: "Aug 2021" }
];

const HORIZONTAL_TIMELINE = [
  { year: "2021", title: "Trust Established", desc: "Founded in Hubballi, Karnataka by Smt. Anusha Mulimani to assist marginal farmers with local organic models." },
  { year: "2022", title: "Community Expansion", desc: "Launched women SHG networks and deployed the first 15 smart solar-powered agriculture borewells." },
  { year: "2023", title: "CSR-1 Registered", desc: "Successfully obtained MCA CSR-1 and NITI Aayog NGO Darpan credentials for corporate collaborations." },
  { year: "2024", title: "Multi-sector Strengthening", desc: "Inaugurated dedicated student STEM-AI IT hubs and certified 4,000+ farmers in micro-nutrients." },
  { year: "2025", title: "Scaling Sustainable Impact", desc: "Covering 12 districts in Karnataka, directly deploying ₹1.7Cr+ CSR funds with peerless transparent ledgers." }
];

const DOWNLOAD_CENTER_RESOURCES = [
  { category: "Annual Reports", title: "Annual Report FY 2025-26 (Latest)", format: "PDF", size: "5.4 MB" },
  { category: "Annual Reports", title: "Annual Report FY 2024-25", format: "PDF", size: "4.8 MB" },
  { category: "Annual Reports", title: "Annual Report FY 2023-24", format: "PDF", size: "3.9 MB" },
  { category: "Financial Statements", title: "Audited Financials FY 2025-26", format: "PDF", size: "2.3 MB" },
  { category: "Financial Statements", title: "Audited Financials FY 2024-25", format: "PDF", size: "2.1 MB" },
  { category: "Financial Statements", title: "Statutory Auditor Report FY 2025-26", format: "PDF", size: "1.8 MB" },
  { category: "Impact Reports", title: "Agriculture Impact Audit Report", format: "PDF", size: "3.1 MB" },
  { category: "Impact Reports", title: "Women Livelihood Cooperative Ledger", format: "PDF", size: "2.4 MB" },
  { category: "CSR Brochure", title: "Raita Mitra Corporate CSR Pitch Deck", format: "PDF", size: "4.2 MB" },
  { category: "Policies", title: "Governing Board Conflict of Interest Policy", format: "PDF", size: "840 KB" },
  { category: "Policies", title: "Whistleblower & Financial Auditing Mandates", format: "PDF", size: "720 KB" },
  { category: "Case Studies", title: "Savanur Solar-STEM Smart Village Study", format: "PDF", size: "1.9 MB" }
];

const FAQS = [
  {
    q: "How frequently are Raita Mitra's annual reports published?",
    a: "Our annual reports and audited statutory financial ledgers are finalized by our board and statutory auditors within 60 days of the financial year close. They are published live on this transparency portal every June."
  },
  {
    q: "Are audited financial statements fully certified and downloadable?",
    a: "Yes. Every single sheet (Balance Sheet, Income/Expenditure Statement, and Receipt/Payment Account) is scanned alongside the independent auditor's report from M/s Hegde & Associates and made available as signed PDF documents."
  },
  {
    q: "Can institutional donors request customized quarterly reports?",
    a: "Absolutely. We supply our corporate partners and ESG foundations with dedicated access to quarterly ledger trackers, geo-tagged field photo diaries, and fund routing logs mapped to individual program codes."
  },
  {
    q: "How exactly are individual and corporate donations utilized?",
    a: "We maintain a record program ratio: over 92.4% of all received funds are deployed directly on-ground into beneficiary programs. Only 7.6% is spent on administrative upkeep, statutory compliance, and statutory filings."
  },
  {
    q: "Are independent third-party evaluations conducted on programs?",
    a: "Yes. Every year, we coordinate with state bodies, IIT graduates, and agricultural research advisory boards to compile independent outcome evaluations, verifying that every single rupee generates measurable sustainable value."
  }
];

// PDF Simulated Content for reading in app
const SIMULATED_PDF_CONTENT: Record<string, string[]> = {
  'ar_2025_26': [
    "RAITA MITRA SOCIAL TRUST (R) - ANNUAL IMPACT REPORT FY 2025-2026",
    "----------------------------------------------------------------",
    "Section 1: Executive Summary by Smt. Anusha Mulimani (Director)",
    "During this fiscal year, Raita Mitra scaled operations across 12 Karnataka districts.",
    "Our focus has been ensuring structural resilience of marginal agrarian households.",
    "Key metric: We have certified 5,100+ marginal farmers with soil health diagnostics.",
    "Section 2: Interactive Smart STEM Laboratories founded in Hubballi",
    "Our classrooms brought hands-on block-coding and Python skills to 3,000+ girls.",
    "Each hub operates on high-efficiency localized solar micro-grid batteries.",
    "Section 3: Women's Financial Inclusion via Dairy Collectives",
    "Through active support, 1,800+ women now collect milk with transparent digitized ledgers."
  ],
  'ar_2024_25': [
    "RAITA MITRA SOCIAL TRUST (R) - NARRATIVE PERFORMANCE REPORT FY 2024-2025",
    "----------------------------------------------------------------",
    "Section 1: Inception of Regenerative Soil Management Models",
    "Raita Mitra pioneered natural windbreaks and Miyawaki forests with local communities.",
    "Key metrics: Over 14,000 native saplings planted in critical water catchment areas.",
    "Section 2: Solar Pump Deployments",
    "15 farm ponds equipped with low-cost automated micro-irrigation lines.",
    "Section 3: Statutory Audit & Compliance Overview",
    "100% clean sheet returned by our auditors M/s Hegde & Associates."
  ],
  'ar_2023_24': [
    "RAITA MITRA SOCIAL TRUST (R) - ANNUAL GENERAL DISCLOSURE FY 2023-2024",
    "----------------------------------------------------------------",
    "Section 1: Trust Constitution & Basic Governance Structures",
    "Governed under statutory trust registration Book IV/682/2021 of Karnataka State.",
    "Focus Areas: Natural Farming, Digitization of Agrarian records, and Girl Child education.",
    "Section 2: NGO Darpan Approval & CSR-1 Registration",
    "Officially certified to deploy corporate CSR capital with verified compliance standards."
  ]
};

export default function AnnualReports({ highContrast }: AnnualReportsProps) {
  // Page Title Update
  useEffect(() => {
    document.title = "Annual Reports & Financial Transparency | Raita Mitra Social Trust";
  }, []);

  // State Management
  const [activeTab, setActiveTab] = useState<'charts' | 'statements' | 'compliance'>('charts');
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [selectedFolderCategory, setSelectedFolderCategory] = useState<string>('Balance Sheet');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDownloadCategory, setSelectedDownloadCategory] = useState<string>('All');
  
  // Dynamic Report State (for upload simulation)
  const [reportsList, setReportsList] = useState(INITIAL_ANNUAL_REPORTS);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newReport, setNewReport] = useState({
    year: '',
    title: '',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
    description: '',
    refNo: '',
    highlights: '',
  });

  // Admin and Embed Simulation toggles
  const [lookerEmbedMode, setLookerEmbedMode] = useState<boolean>(false);
  const [powerBiEmbedMode, setPowerBiEmbedMode] = useState<boolean>(false);
  const [simulatedAdminLogged, setSimulatedAdminLogged] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  // Interactive FAQ Index
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Notification Toast for simulated events
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filter Download Resources
  const filteredDownloads = DOWNLOAD_CENTER_RESOURCES.filter(res => {
    const matchesCategory = selectedDownloadCategory === 'All' || res.category === selectedDownloadCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle Simulated Upload
  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.year || !newReport.title || !newReport.description) {
      triggerToast("Please fill in all mandatory fields before transmitting.");
      return;
    }

    const reportId = 'ar_dynamic_' + Date.now();
    const highlightArr = newReport.highlights.split(',').map(h => h.trim()).filter(h => h.length > 0);
    
    const createdReport = {
      id: reportId,
      year: newReport.year,
      title: newReport.title,
      coverImage: newReport.coverImage,
      publicationDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      size: '2.4 MB',
      pages: 28,
      refNo: newReport.refNo || `RMST/AR/${newReport.year.replace(' ', '')}/AUTO`,
      description: newReport.description,
      highlights: highlightArr.length > 0 ? highlightArr : ["New impact metrics uploaded successfully", "Governance criteria satisfied"]
    };

    // Register PDF content
    SIMULATED_PDF_CONTENT[reportId] = [
      `${createdReport.title.toUpperCase()} (${createdReport.year})`,
      "----------------------------------------------------------------",
      "REGIONAL VERIFICATION & DIRECT STATUTORY COMPLIANCE RECEIPT",
      `Document Reference ID: ${createdReport.refNo}`,
      `Published on: ${createdReport.publicationDate}`,
      "----------------------------------------------------------------",
      createdReport.description,
      "",
      "Audit Trail & Validation Parameters:",
      ...createdReport.highlights.map((h, i) => `${i + 1}. ${h}`)
    ];

    setReportsList([createdReport, ...reportsList]);
    setShowUploadForm(false);
    setNewReport({
      year: '',
      title: '',
      coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
      description: '',
      refNo: '',
      highlights: '',
    });
    triggerToast(`Success: Dynamic ${createdReport.year} Annual Report compiled & cached.`);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsername === 'admin' && adminPassword === 'raitamitra123') {
      setSimulatedAdminLogged(true);
      setAdminError('');
      triggerToast("Statutory Auditor & Admin Privileges Authenticated.");
    } else {
      setAdminError("Invalid credentials. Try username: admin | password: raitamitra123");
    }
  };

  const handleDeleteReport = (id: string) => {
    setReportsList(reportsList.filter(r => r.id !== id));
    triggerToast("Report record unlinked and scrubbed from client cache.");
  };

  const handleDownloadSimulated = (filename: string) => {
    triggerToast(`Downloading fully compiled signed document: ${filename}`);
  };

  return (
    <div className={`w-full relative selection:bg-emerald-500/20 ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`} id="transparency-hub-root">
      
      {/* Toast Alert Widget */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-emerald-500/30 font-mono text-xs flex items-center gap-3"
            id="toast-notification"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: CORPORATE PREMIUM HERO BANNER */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden py-24 px-4" id="transparency-hero">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 scale-102"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/40 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <nav className="flex justify-center items-center gap-2 text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase" aria-label="Breadcrumb" id="breadcrumb-navigation">
            <span className="hover:text-amber-400 cursor-pointer transition-colors">Home</span>
            <ChevronRight size={10} className="opacity-50 text-slate-400" />
            <span className="text-amber-400">Annual Reports &amp; Transparency</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck size={11} className="text-emerald-400" />
            VERIFIABLE AUDITING &amp; ESG DISCLOSURES
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-none">
            Transparency That<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-amber-500">
              Builds True Confidence
            </span>
          </h1>

          <p className="text-slate-300 text-xs md:text-sm lg:text-base max-w-3xl mx-auto leading-relaxed font-sans font-medium">
            Access our verified annual reports, statutory audited financial statements, multi-year impact reports, and legal governance disclosures with complete transparency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a 
              href="#reports-archive"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all duration-300 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-1.5 tracking-wider cursor-pointer"
            >
              <FileText size={13} />
              <span>DOWNLOAD ANNUAL REPORT</span>
            </a>
            <a 
              href="#audited-financials"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-300 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 tracking-wider cursor-pointer"
            >
              <LayoutDashboard size={13} />
              <span>VIEW FINANCIAL STATEMENTS</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: QUICK GLASS HIGHLIGHTS */}
      <section className="py-16 px-4 max-w-7xl mx-auto -mt-16 relative z-20" id="transparency-highlights">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUICK_HIGHLIGHTS.map((card) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={card.id}
                className={`p-6 rounded-3xl border text-left flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 ${
                  highContrast 
                    ? 'bg-black border-2 border-white text-white' 
                    : 'bg-white/90 border-slate-200/60 shadow-lg shadow-slate-100/50 backdrop-blur-sm hover:shadow-xl'
                }`}
              >
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 inline-flex">
                    <IconComponent size={20} className="stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white font-display tracking-tight leading-none">{card.title}</h3>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{card.subtitle}</p>
                  <p className="text-[11px] text-slate-500 leading-normal">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: ANNUAL REPORTS MAGAZINE ARCHIVE */}
      <section className="py-20 px-4 max-w-7xl mx-auto text-left" id="reports-archive">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">STATUTORY DISCLOSURES</span>
            <h2 className="font-display font-black text-2xl md:text-4xl tracking-tight">Annual Reports Archive</h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl">
              Browse through complete narrative, environmental, social and economic impact records compiled meticulously for our stakeholder communities.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!simulatedAdminLogged ? (
              <button 
                onClick={() => {
                  setSimulatedAdminLogged(false);
                  setAdminUsername('');
                  setAdminPassword('');
                  setAdminError('');
                  const section = document.getElementById('auditor-portal');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-900 cursor-pointer"
              >
                Auditor Login to Upload
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowUploadForm(!showUploadForm)}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-forest hover:bg-forest-light text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Upload New Report</span>
                </button>
                <button 
                  onClick={() => {
                    setSimulatedAdminLogged(false);
                    triggerToast("Auditor credentials revoked.");
                  }}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Upload Form */}
        <AnimatePresence>
          {showUploadForm && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 overflow-hidden"
            >
              <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FileUp size={16} className="text-forest" />
                Upload Authenticated Annual Report (Admin Mode)
              </h3>
              <form onSubmit={handleSimulatedUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Financial Year *</label>
                  <input 
                    type="text"
                    placeholder="e.g. FY 2026-27"
                    value={newReport.year}
                    onChange={(e) => setNewReport({...newReport, year: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-forest bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Report Heading / Title *</label>
                  <input 
                    type="text"
                    placeholder="e.g. Empowering Rural Hubs"
                    value={newReport.title}
                    onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-forest bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Document Reference No</label>
                  <input 
                    type="text"
                    placeholder="e.g. RMST/AR/2026-27/01"
                    value={newReport.refNo}
                    onChange={(e) => setNewReport({...newReport, refNo: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-forest bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Highlights (Comma separated)</label>
                  <input 
                    type="text"
                    placeholder="e.g. 1000+ girls certified, ₹25L deployed"
                    value={newReport.highlights}
                    onChange={(e) => setNewReport({...newReport, highlights: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-forest bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Narrative Description *</label>
                  <textarea 
                    placeholder="Write a brief overview of the programs, budgets, and outcomes logged."
                    rows={3}
                    value={newReport.description}
                    onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-forest bg-white"
                    required
                  />
                </div>
                <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowUploadForm(false)}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-forest hover:bg-forest-light text-white font-bold cursor-pointer"
                  >
                    Transmit Disclosures
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Magazine Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reportsList.map((rep) => (
            <div 
              key={rep.id}
              className={`rounded-3xl border overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-xl ${
                highContrast 
                  ? 'bg-black border-2 border-white text-white' 
                  : 'bg-white border-slate-100 shadow-md shadow-slate-100/30'
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={rep.coverImage} 
                  alt={`${rep.year} Cover`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500 text-slate-950">
                  {rep.year}
                </span>
                
                {simulatedAdminLogged && (
                  <button 
                    onClick={() => handleDeleteReport(rep.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-rose-600 text-white hover:bg-rose-500 transition-colors cursor-pointer"
                    title="Delete record from cache"
                  >
                    <Trash2 size={13} />
                  </button>
                )}

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
                  <span className="text-[10px] font-mono opacity-80">Ref: {rep.refNo}</span>
                  <span className="text-[10px] font-mono opacity-80">{rep.pages} Pages</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                    {rep.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">
                    {rep.description}
                  </p>
                  
                  {rep.highlights && (
                    <div className="pt-2 space-y-1">
                      {rep.highlights.slice(0, 3).map((hl, i) => (
                        <div key={i} className="flex gap-2 items-center text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                          <Check size={11} className="text-emerald-500 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-50 dark:border-zinc-800">
                  <button 
                    onClick={() => setSelectedReportId(rep.id)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      highContrast 
                        ? 'border-white text-white hover:bg-white hover:text-black' 
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <Eye size={12} />
                    <span>PDF Interactive Preview</span>
                  </button>
                  <button 
                    onClick={() => handleDownloadSimulated(`${rep.year}_Narrative_Impact_Report.pdf`)}
                    className="p-2.5 rounded-xl bg-forest hover:bg-forest-light text-white transition-all cursor-pointer"
                    title="Download Official Document"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL: INTERACTIVE PDF READER */}
      <AnimatePresence>
        {selectedReportId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200'
              }`}
            >
              <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center bg-slate-50 dark:bg-zinc-900">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <FileText size={16} />
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {reportsList.find(r => r.id === selectedReportId)?.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Ref: {reportsList.find(r => r.id === selectedReportId)?.refNo} • Verified PDF Document
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedReportId(null)}
                  className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Simulated Paper Sheets */}
              <div className="p-8 max-h-[50vh] overflow-y-auto bg-stone-100 text-slate-900 text-left font-sans text-xs space-y-4 leading-relaxed shadow-inner">
                <div className="bg-white p-6 md:p-8 rounded-lg shadow border border-slate-200/60 max-w-xl mx-auto space-y-4">
                  {SIMULATED_PDF_CONTENT[selectedReportId] ? (
                    SIMULATED_PDF_CONTENT[selectedReportId].map((line, idx) => (
                      <p 
                        key={idx} 
                        className={
                          idx === 0 ? "font-display font-bold text-sm text-center text-emerald-950 uppercase tracking-tight border-b pb-2" :
                          idx === 1 ? "text-center hidden" :
                          line.startsWith('Section') ? "font-display font-extrabold text-xs text-emerald-800 pt-3 border-l-2 border-emerald-500 pl-2" :
                          "text-slate-700"
                        }
                      >
                        {line}
                      </p>
                    ))
                  ) : (
                    <p className="text-center text-slate-400">Loading statutory page index data...</p>
                  )}
                  
                  <div className="pt-8 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                    <span>DIGITALLY SIGNED</span>
                    <span>STATUTORY AUDIT BOARD</span>
                  </div>
                </div>
              </div>

              {/* Footer tools */}
              <div className="px-6 py-4 border-t border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                  <ShieldCheck size={11} className="text-emerald-500" />
                  SHA-256 Checksum Verified
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      const rep = reportsList.find(r => r.id === selectedReportId);
                      if (rep) handleDownloadSimulated(`${rep.year}_Narrative_Impact_Report.pdf`);
                    }}
                    className="px-4 py-2 rounded-lg bg-forest hover:bg-forest-light text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Download size={12} />
                    <span>Download Signed PDF</span>
                  </button>
                  <button 
                    onClick={() => setSelectedReportId(null)}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SECTION 4: AUDITED FINANCIAL STATEMENTS FOLDER DASHBOARD */}
      <section className="py-24 px-4 bg-slate-100 dark:bg-zinc-950 border-y border-slate-200/40" id="audited-financials">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-3 mb-12 text-left">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">LEDGERS &amp; COMPLIANCE</span>
            <h2 className="font-display font-black text-2xl md:text-4xl tracking-tight">Audited Financial Statements</h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl">
              Access complete statutory double-entry books of accounts, including Balance Sheets, Statutory Receipts, and Independent Audit Reports.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Category Selectors */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              {FINANCIAL_STATEMENTS.map((cat) => {
                const isSelected = selectedFolderCategory === cat.category;
                const CatIcon = cat.icon;
                return (
                  <button 
                    key={cat.category}
                    onClick={() => setSelectedFolderCategory(cat.category)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-forest text-white border-forest shadow-md shadow-forest/10'
                        : highContrast
                          ? 'bg-black border-white text-white hover:bg-white hover:text-black'
                          : 'bg-white border-slate-200/60 text-slate-700 hover:bg-slate-50 shadow-sm'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-white/10 text-white' : 'bg-slate-50 text-slate-500 dark:bg-zinc-900'}`}>
                      <CatIcon size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold leading-tight">{cat.category}</p>
                      <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-200' : 'text-slate-400'}`}>
                        {cat.files.length} Audited Years Available
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Folder Contents Display */}
            <div className="lg:col-span-8">
              <div className={`p-6 md:p-8 rounded-3xl border text-left ${
                highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/60 shadow-xl'
              }`}>
                
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4 mb-6">
                  <div className="flex items-center gap-2 text-slate-800 dark:text-white">
                    <FolderOpen size={18} className="text-gold" />
                    <h3 className="font-display font-extrabold text-sm">{selectedFolderCategory} Archive</h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-50 dark:bg-zinc-900 px-3 py-1 rounded-full uppercase">
                    Double-Entry Books of Accounts
                  </span>
                </div>

                <div className="space-y-4">
                  {FINANCIAL_STATEMENTS.find(cat => cat.category === selectedFolderCategory)?.files.map((file, idx) => (
                    <div 
                      key={idx}
                      className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-slate-50/50 dark:hover:bg-zinc-900/40 ${
                        highContrast ? 'border-white' : 'border-slate-100 bg-slate-50/20'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded">
                            {file.year}
                          </span>
                          <span className="text-xs font-bold text-slate-800 dark:text-white">{file.name}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono">
                          Ref No: {file.refNo} • Registered on: {file.date} {file.auditor ? `• Signed: ${file.auditor}` : ''}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-slate-400">{file.size}</span>
                        <button 
                          onClick={() => triggerToast(`Previewing: ${file.name} (${file.year})`)}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold border flex items-center gap-1 cursor-pointer ${
                            highContrast ? 'border-white' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <Eye size={11} />
                          <span>Preview</span>
                        </button>
                        <button 
                          onClick={() => handleDownloadSimulated(`${file.year}_${selectedFolderCategory.replace(' ', '_')}.pdf`)}
                          className="px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold bg-forest hover:bg-forest-light text-white flex items-center gap-1 cursor-pointer"
                        >
                          <Download size={11} />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Audit Certificate Notice block */}
                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-[11px] text-emerald-800 dark:text-emerald-400 flex items-start gap-3 mt-6">
                  <Info size={16} className="shrink-0 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="font-bold">Statutory Independent Assurance Guaranteed</p>
                    <p className="text-slate-500 mt-0.5">All accounts have been certified unqualified under general regulatory standards by M/s Hegde &amp; Associates, registered Chartered Accountants, Hubballi.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: IMPACT REPORTS PREMIUM CARDS */}
      <section className="py-24 px-4 max-w-7xl mx-auto text-left" id="impact-reports">
        <div className="space-y-3 mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">MEASURABLE OUTCOMES</span>
          <h2 className="font-display font-black text-2xl md:text-4xl tracking-tight">Focus-wise Impact Reports</h2>
          <p className="text-xs md:text-sm text-slate-500 max-w-xl">
            Read complete independent review briefs demonstrating our precise performance across key developmental indices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {IMPACT_REPORTS.map((rep, idx) => (
            <div 
              key={idx}
              className={`rounded-3xl border overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-lg ${
                highContrast 
                  ? 'bg-black border-2 border-white' 
                  : 'bg-white border-slate-100 shadow-md shadow-slate-100/30'
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={rep.image} 
                  alt={rep.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-900/80 text-amber-400 backdrop-blur-sm">
                  {rep.year}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-display font-black text-xs text-slate-900 dark:text-white group-hover:text-forest transition-colors">
                      {rep.title}
                    </h3>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">By {rep.author}</p>
                  </div>

                  <div className="space-y-1.5">
                    {rep.metrics.map((met, mIdx) => (
                      <div key={mIdx} className="flex gap-2 items-start text-[11px] text-slate-600 dark:text-slate-300">
                        <CheckCircle size={11} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{met}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-50 dark:border-zinc-800 flex justify-between items-center">
                  <span className="text-[9px] font-mono text-slate-400">Ref: {rep.refNo}</span>
                  <button 
                    onClick={() => triggerToast(`Initiating download for: ${rep.title}`)}
                    className="text-[10px] font-mono font-bold text-forest hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Audit Brief</span>
                    <ArrowUpRight size={10} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: INTERACTIVE FUND UTILIZATION DASHBOARD */}
      <section className="py-24 px-4 bg-slate-900 text-white border-y border-slate-950 relative overflow-hidden" id="financial-dashboard">
        {/* Background ambient light */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 text-left">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">INTERACTIVE DATA CENTER</span>
              <h2 className="font-display font-black text-2xl md:text-4xl text-white tracking-tight">Fund Utilization Dashboard</h2>
              <p className="text-xs md:text-sm text-slate-400 max-w-xl">
                Statutory audit visualizations mapping allocations, YoY program expansions, and resource ratios across developmental segments.
              </p>
            </div>

            {/* Embedded looker/PowerBI simulation tabs */}
            <div className="flex flex-wrap gap-2 items-center">
              <button 
                onClick={() => { setLookerEmbedMode(false); setPowerBiEmbedMode(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                  !lookerEmbedMode && !powerBiEmbedMode 
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-md' 
                    : 'border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Built-in Charts
              </button>
              <button 
                onClick={() => { setLookerEmbedMode(true); setPowerBiEmbedMode(false); triggerToast("Looker Studio dynamic integration simulated."); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                  lookerEmbedMode 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md' 
                    : 'border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Looker Studio Embed
              </button>
              <button 
                onClick={() => { setPowerBiEmbedMode(true); setLookerEmbedMode(false); triggerToast("Power BI corporate dashboard active."); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                  powerBiEmbedMode 
                    ? 'bg-amber-600 border-amber-500 text-slate-950 shadow-md' 
                    : 'border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Power BI Dashboard
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {lookerEmbedMode ? (
              <motion.div 
                key="looker"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="p-8 rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur-md min-h-[450px] flex flex-col justify-between"
              >
                <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Database className="text-blue-400 animate-pulse" size={18} />
                    <span className="text-xs font-mono font-bold text-slate-200">LOOKER_STUDIO_EMBED_NODE // LIVE</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full uppercase">
                    GIS Maps &amp; Soil Calibration Matrix Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left my-auto">
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <p className="text-[10px] font-mono text-slate-500 uppercase font-bold">Dynamic Map Bounds</p>
                    <p className="text-lg font-bold text-white">Hubballi HQ Center</p>
                    <p className="text-xs text-slate-400 leading-normal">Coordinates: 15.3647° N, 75.1240° E. Live telemetry syncing with NITI Aayog guidelines.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <p className="text-[10px] font-mono text-slate-500 uppercase font-bold">Remote Data Source</p>
                    <p className="text-lg font-bold text-white">Google BigQuery</p>
                    <p className="text-xs text-slate-400 leading-normal">Statutory audits pipeline refreshed on-demand. Database tables fully indexed.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <p className="text-[10px] font-mono text-slate-500 uppercase font-bold">Embedding Schema</p>
                    <p className="text-lg font-bold text-blue-400">Secure JWT Tokens</p>
                    <p className="text-xs text-slate-400 leading-normal">OAuth2.0 tokens active. Authenticated corporate sessions protected under SSL.</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>SSL SECURE EMBED CONSOLE</span>
                  <button 
                    onClick={() => triggerToast("Looker Schema diagnostics logged.")}
                    className="hover:underline text-blue-400"
                  >
                    Diagnose Looker Node
                  </button>
                </div>
              </motion.div>
            ) : powerBiEmbedMode ? (
              <motion.div 
                key="powerbi"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="p-8 rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur-md min-h-[450px] flex flex-col justify-between"
              >
                <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Sliders className="text-amber-400 animate-pulse" size={18} />
                    <span className="text-xs font-mono font-bold text-slate-200">POWER_BI_CORPORATE_PORTAL // LIVE</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full uppercase">
                    ESG Ledger Audit Stream Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left my-auto">
                  <div className="space-y-4">
                    <h3 className="font-display font-extrabold text-base text-white">Corporate ESG Compliance</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      This Power BI simulator maps Raita Mitra Social Trust (R)'s statutory ledgers to NITI Aayog Darpan indicators. Use the filter widgets on the dashboard to test specific allocations.
                    </p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => triggerToast("Power BI filters set to Haveri district.")}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-bold font-mono"
                      >
                        Filter Haveri
                      </button>
                      <button 
                        onClick={() => triggerToast("Power BI filters set to Dharwad district.")}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold font-mono"
                      >
                        Filter Dharwad
                      </button>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-[11px] text-slate-300">
                    <p className="text-[9px] text-slate-500 font-bold uppercase border-b border-slate-800 pb-1.5">MAPPED METRIC STREAMS</p>
                    <p className="flex justify-between"><span>SDG Indicators Met:</span> <span className="font-bold text-white">5 (Direct)</span></p>
                    <p className="flex justify-between"><span>Total ESG Investments:</span> <span className="font-bold text-amber-400">₹1.78 Crores</span></p>
                    <p className="flex justify-between"><span>Audited Variance:</span> <span className="font-bold text-emerald-400">0.00% (Absolute)</span></p>
                    <p className="flex justify-between"><span>Direct Beneficiary Accounts:</span> <span className="font-bold text-white">15,300+</span></p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>SSL POWER BI ENDPOINT</span>
                  <span>MICROSOFT AZURE AUTHENTICATED</span>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="builtin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* 1. Program Expenditure Pie Chart */}
                <div className="lg:col-span-5 p-6 rounded-3xl border border-slate-800 bg-slate-950/50 backdrop-blur-sm space-y-4">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider text-left">
                    Program Expenditure Pie Chart
                  </h3>
                  <div className="h-[220px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={PROGRAM_EXPENDITURE_PIE}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {PROGRAM_EXPENDITURE_PIE.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ background: '#0f172a', borderColor: '#1e293b', color: '#fff', fontSize: '11px', fontFamily: 'monospace' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-left pt-2 text-[10px] font-mono border-t border-slate-900">
                    {PROGRAM_EXPENDITURE_PIE.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: item.color }} />
                        <span className="text-slate-400 truncate">{item.name}</span>
                        <span className="text-white font-bold ml-auto">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Admin Cost Ratio trend & YoY Growth */}
                <div className="lg:col-span-7 p-6 rounded-3xl border border-slate-800 bg-slate-950/50 backdrop-blur-sm space-y-4">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider text-left">
                    Year-on-Year Corporate Funds growth &amp; Deployment
                  </h3>
                  <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={YOY_FUND_GROWTH}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} fontFamily="monospace" />
                        <YAxis stroke="#94a3b8" fontSize={10} fontFamily="monospace" label={{ value: ' Lakhs (₹)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                        <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#1e293b', color: '#fff', fontSize: '11px' }} />
                        <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace', pt: 10 }} />
                        <Bar dataKey="csrInflow" name="CSR Deployed" fill="#0B5D3B" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="grants" name="Grants" fill="#C99A32" radius={[4, 4, 0, 0]} />
                        <Line type="monotone" dataKey="deployment" name="Direct Impact Deployed" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono text-left pt-2 border-t border-slate-900 leading-normal">
                    *Note: Our administrative expenses dropped from 13.5% in 2021 down to 7.6% in 2025. This ratio exceeds general nonprofit standards in India.
                  </p>
                </div>

                {/* 3. District-wise Allocation bento */}
                <div className="lg:col-span-7 p-6 rounded-3xl border border-slate-800 bg-slate-950/50 backdrop-blur-sm space-y-4">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider text-left">
                    District-wise Resource Allocation
                  </h3>
                  <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={DISTRICT_RESOURCE_ALLOCATION}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="district" stroke="#94a3b8" fontSize={10} fontFamily="monospace" />
                        <YAxis stroke="#94a3b8" fontSize={10} fontFamily="monospace" />
                        <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#1e293b', color: '#fff', fontSize: '11px' }} />
                        <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
                        <Bar dataKey="budget" name="Allocated Budget ( Lakhs)" fill="#C99A32" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="activeUnits" name="Active Program Clusters" fill="#127E51" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 4. Beneficiary segment distribution */}
                <div className="lg:col-span-5 p-6 rounded-3xl border border-slate-800 bg-slate-950/50 backdrop-blur-sm space-y-4">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider text-left">
                    Beneficiary Segment Distribution
                  </h3>
                  <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={BENEFICIARY_DISTRIBUTION}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="segment" stroke="#94a3b8" fontSize={9} fontFamily="monospace" />
                        <YAxis stroke="#94a3b8" fontSize={10} fontFamily="monospace" />
                        <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#1e293b', color: '#fff', fontSize: '11px' }} />
                        <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
                        <Area type="monotone" dataKey="direct" name="Direct Beneficiaries" stroke="#0B5D3B" fill="#0B5D3B" fillOpacity={0.2} />
                        <Area type="monotone" dataKey="indirect" name="Indirect Beneficiaries" stroke="#C99A32" fill="#C99A32" fillOpacity={0.1} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SDG Alignment Matrix blocks */}
          <div className="mt-12 pt-8 border-t border-slate-800 text-left">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-6">
              UNITED NATIONS SDG ALIGNMENT MATRIX
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {SDG_ALIGNMENT.map((sdg, sIdx) => (
                <div key={sIdx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-white font-display leading-tight">{sdg.goal}</p>
                    <p className="text-[10px] text-slate-400 font-mono">Alignment: <strong className="text-emerald-400">{sdg.alignment}</strong></p>
                  </div>
                  <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full" style={{ width: `${sdg.weight}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: IMPACT METRICS INFOGRAPHICS SECTION */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-black text-left" id="animated-infographics">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">STATUTORY IMPACT METRICS</span>
            <h2 className="font-display font-black text-2xl md:text-4xl tracking-tight leading-none text-slate-900 dark:text-white">
              Transparency Through Data
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl">
              Verifiable development indicators recorded directly on-ground by our regional field coordinators using double-entry books.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Beneficiaries Reached", value: "15,300+", sub: "Rural Karnataka residents", trend: "+42% from last FY", icon: Heart },
              { label: "Training Conducted", value: "840+ Hrs", sub: "Python & Natural Agri sessions", trend: "100% attendance rate", icon: GraduationCap },
              { label: "Districts Covered", value: "12 Districts", sub: "Focus on North Karnataka", trend: "Expanded in Bidar & Raichur", icon: Map },
              { label: "Programs Implemented", value: "6 Core Verticals", sub: "Directly mapped to ESG", trend: "100% audit approved status", icon: Sprout }
            ].map((met, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 transition-all duration-300 hover:shadow-xl ${
                  highContrast 
                    ? 'bg-black border-2 border-white' 
                    : 'bg-white border-slate-200/60 shadow-md shadow-slate-100/30'
                }`}
              >
                <div className="space-y-3 text-left">
                  <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 inline-flex">
                    <met.icon size={18} />
                  </div>
                  <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{met.label}</h4>
                  <p className="text-3xl font-black text-slate-900 dark:text-white font-display tracking-tight leading-none">{met.value}</p>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{met.sub}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                  <Check size={11} />
                  <span>{met.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: GOVERNANCE & ACCOUNTABILITY TIMELINE CARDS */}
      <section className="py-24 px-4 bg-slate-100 dark:bg-zinc-950 border-y border-slate-200/40 text-left" id="governance">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">TRUST ADMINISTRATION</span>
            <h2 className="font-display font-black text-2xl md:text-4xl tracking-tight leading-tight text-slate-900 dark:text-white">
              Governance &amp;<br />Accountability
            </h2>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
              Our Board of Trustees, guided by Smt. Anusha Mulimani, operates under strict conflict-of-interest disclosures and statutory audit standards.
            </p>
            <div className="p-4 rounded-2xl bg-forest/5 text-[11px] text-forest flex gap-2">
              <Shield size={16} className="shrink-0 mt-0.5" />
              <span>We strictly comply with NITI Aayog guidelines and ensure 100% clean, transparent routing.</span>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {GOVERNANCE_PRINCIPLES.map((item, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-3xl border flex flex-col md:flex-row gap-6 items-start transition-all hover:translate-x-1 ${
                  highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/60 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <div className="space-y-1 text-left">
                  <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9: COMPLIANCE REPOSITORY */}
      <section className="py-24 px-4 max-w-7xl mx-auto text-left" id="compliance-repository">
        <div className="space-y-3 mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">STATUTORY PERMITS</span>
          <h2 className="font-display font-black text-2xl md:text-4xl tracking-tight">Compliance Repository</h2>
          <p className="text-xs md:text-sm text-slate-500 max-w-xl">
            Download our registered trust certifications directly from central ministerial repositories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {COMPLIANCE_REPOSITORY_DOCS.map((doc, idx) => {
            const DocIcon = doc.icon;
            return (
              <div 
                key={idx}
                className={`p-5 rounded-3xl border flex flex-col justify-between space-y-6 transition-all hover:-translate-y-1 ${
                  highContrast 
                    ? 'bg-black border-2 border-white' 
                    : 'bg-white border-slate-100 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="space-y-3 text-left">
                  <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 inline-flex">
                    <DocIcon size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-xs text-slate-900 dark:text-white leading-tight">
                      {doc.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">By {doc.authority}</p>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal">Approved: {doc.date}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 space-y-2">
                  <p className="text-[9px] font-mono text-emerald-600 bg-emerald-500/5 px-2 py-0.5 rounded text-center truncate">
                    {doc.refNo}
                  </p>
                  <button 
                    onClick={() => handleDownloadSimulated(`${doc.title.replace(' ', '_')}.pdf`)}
                    className="w-full py-2 rounded-xl text-[10px] font-mono font-bold bg-forest text-white hover:bg-forest-light flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download size={11} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 10: HORIZONTAL GROWTH & IMPACT TIMELINE */}
      <section className="py-24 px-4 bg-slate-900 text-white border-y border-slate-950 overflow-hidden" id="growth-timeline">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3 text-left">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">HISTORIC SCALE</span>
            <h2 className="font-display font-black text-2xl md:text-4xl text-white tracking-tight">Growth &amp; Impact Timeline</h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-xl">
              Chronological milestones tracking the evolutionary path of Raita Mitra Social Trust (R) from 2021 to present.
            </p>
          </div>

          {/* Horizontal scroll timeline */}
          <div className="relative overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-800" id="timeline-scroller">
            <div className="flex gap-8 min-w-[900px] text-left relative pt-12">
              
              {/* Central axis connector line */}
              <div className="absolute top-[52px] left-0 right-0 h-0.5 bg-slate-800 z-0" />

              {HORIZONTAL_TIMELINE.map((evt, idx) => (
                <div key={idx} className="flex-1 space-y-4 relative z-10">
                  {/* Pin Dot */}
                  <div className="w-10 h-10 rounded-full bg-slate-950 border-2 border-amber-500 flex items-center justify-center font-mono font-bold text-amber-500 shadow-lg shadow-amber-500/10 mb-4 select-none">
                    {evt.year}
                  </div>
                  
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <h4 className="font-display font-extrabold text-xs text-white uppercase tracking-wider">{evt.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{evt.desc}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: DOWNLOAD CENTER SECTION (RESOURCE CENTRE) */}
      <section className="py-24 px-4 max-w-7xl mx-auto text-left" id="download-center">
        <div className="space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">RESOURCE CENTRE</span>
              <h2 className="font-display font-black text-2xl md:text-4xl tracking-tight">All Publications &amp; Resources</h2>
              <p className="text-xs md:text-sm text-slate-500 max-w-xl">
                Filter and search our complete digital library of statutory audit reports, project dossiers, brochures and trust policies.
              </p>
            </div>

            {/* Filter Search controls */}
            <div className="w-full md:w-80 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search publications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-forest bg-white"
              />
            </div>
          </div>

          {/* Tab Filter Links */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200/60 pb-4">
            {["All", "Annual Reports", "Financial Statements", "Impact Reports", "CSR Brochure", "Policies", "Case Studies"].map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedDownloadCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  selectedDownloadCategory === cat 
                    ? 'bg-forest text-white' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDownloads.map((res, idx) => (
              <div 
                key={idx}
                className={`p-5 rounded-3xl border flex justify-between items-center transition-all hover:bg-slate-50/50 dark:hover:bg-zinc-900/40 ${
                  highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="space-y-1.5 text-left">
                  <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">
                    {res.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{res.title}</h4>
                  <p className="text-[10px] text-slate-400 font-mono">Format: {res.format} • Size: {res.size}</p>
                </div>
                <button 
                  onClick={() => handleDownloadSimulated(res.title + '.pdf')}
                  className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-slate-700 dark:text-white cursor-pointer"
                  title="Download File"
                >
                  <Download size={14} />
                </button>
              </div>
            ))}

            {filteredDownloads.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-400 font-mono text-xs">
                No resources match your search queries. Clear filters and try again.
              </div>
            )}
          </div>

        </div>
      </section>

      {/* SECTION 12: STATUTORY FAQ ACCORDION */}
      <section className="py-24 px-4 bg-slate-100 dark:bg-zinc-950 border-y border-slate-200/40 text-left" id="faqs">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-3 text-center">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">COMMON INQUIRIES</span>
            <h2 className="font-display font-black text-2xl md:text-4xl tracking-tight leading-none text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto">
              Transparent replies to crucial administrative questions compiled specifically for corporate partners.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border overflow-hidden transition-colors ${
                    highContrast ? 'border-white bg-black' : 'border-slate-200/60 bg-white'
                  }`}
                >
                  <button 
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-display font-bold text-xs md:text-sm text-slate-900 dark:text-white flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className={`p-1 rounded-lg bg-slate-50 dark:bg-zinc-900 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronRight size={14} className="rotate-90" />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="p-5 border-t border-slate-100 dark:border-zinc-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-zinc-900/20">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 13: STATUTORY AUDITOR PORTAL (FUTURE SCALABILITY / SECURITY DEMO) */}
      <section className="py-24 px-4 bg-slate-900 text-white relative" id="auditor-portal">
        <div className="max-w-xl mx-auto p-8 rounded-3xl border border-slate-800 bg-slate-950/80 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono uppercase text-amber-500 tracking-widest font-bold">COMPLIANCE SECURITY CENTER</span>
            <h3 className="font-display font-black text-lg text-white">Auditor &amp; Admin Panel</h3>
            <p className="text-xs text-slate-400">
              Authorized compliance officers can authenticate to dynamically compile and cache new Annual Report disclosures.
            </p>
          </div>

          {!simulatedAdminLogged ? (
            <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold mb-1">Auditor Username</label>
                <input 
                  type="text"
                  placeholder="Enter 'admin'"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold mb-1">Authorized Audit Password</label>
                <input 
                  type="password"
                  placeholder="Enter 'raitamitra123'"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              {adminError && <p className="text-[10px] text-rose-400 font-mono text-center">{adminError}</p>}

              <button 
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors cursor-pointer"
              >
                Authenticate Board Signature
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 inline-flex items-center gap-2">
                <Check size={14} />
                <span className="text-xs font-mono font-bold uppercase">Statutory Session Established</span>
              </div>
              <p className="text-xs text-slate-300">
                You are currently logged in as a compliance administrator. You can now use the <strong>&quot;Upload New Report&quot;</strong> button in the archive section above to simulate dynamic submissions.
              </p>
              <button 
                onClick={() => {
                  setSimulatedAdminLogged(false);
                  triggerToast("Statutory session closed safely.");
                }}
                className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
              >
                Revoke Credentials
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 14: PARTNER WITH CONFIDENCE CTA SECTION */}
      <section className="relative w-full py-24 px-4 overflow-hidden text-center" id="confidence-cta">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1600')` }}
          />
          <div className="absolute inset-0 bg-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-none">
            Partner With Absolute Confidence
          </h2>
          <p className="text-slate-300 text-xs md:text-sm lg:text-base max-w-2xl mx-auto leading-relaxed">
            Transparency and accountability are at the heart of everything we do. Coordinate with our director, Smt. Anusha Mulimani, to schedule guided regional site inspections or request ledger details.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a 
              href="#download-center"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all duration-300 shadow-lg cursor-pointer tracking-wider"
            >
              DOWNLOAD COMPLIANCE PORTFOLIO
            </a>
            <a 
              href="mailto:contact@raitamitrasocialtrust.org"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-black bg-slate-800 hover:bg-slate-700 text-white transition-all duration-300 shadow-lg cursor-pointer tracking-wider"
            >
              BECOME A CSR PARTNER
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
