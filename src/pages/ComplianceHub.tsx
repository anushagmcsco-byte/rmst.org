import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  BadgeCheck, 
  FileBadge, 
  ReceiptText, 
  BookOpen, 
  CreditCard, 
  FileText, 
  TrendingUp, 
  Calculator, 
  Scale, 
  Download, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  Search, 
  Copy, 
  Check, 
  CheckCircle, 
  Calendar, 
  Coins, 
  Eye, 
  Users, 
  MapPin, 
  Mail, 
  Phone, 
  Briefcase, 
  User, 
  ExternalLink, 
  Lock, 
  Settings, 
  AlertCircle, 
  Building, 
  Award, 
  Heart, 
  Sprout, 
  Shield, 
  X, 
  Send, 
  FileDown, 
  BarChart3, 
  BookOpenCheck,
  CheckCircle2,
  Info,
  Layers,
  ChevronLeft
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
  ReferenceLine
} from 'recharts';

interface ComplianceHubProps {
  highContrast: boolean;
}

// Simulated data mirroring Tata Trusts and akshaya patra standard transparency metrics
const PROGRAM_PIE_DATA = [
  { name: 'Regenerative Agriculture & Watersheds', value: 42, color: '#16a34a' },
  { name: 'Women SHGs & Livelihood Units', value: 25, color: '#eab308' },
  { name: 'Rural STEM & Smart IT Labs', value: 18, color: '#06b6d4' },
  { name: 'Mobile Health & Diagnostic Camps', value: 15, color: '#6366f1' }
];

const ANNUAL_GROWTH_DATA = [
  { year: '2021-22', received: 18.5, deployed: 17.1, transparency: 98 },
  { year: '2022-23', received: 34.2, deployed: 32.5, transparency: 99 },
  { year: '2023-24', received: 58.9, deployed: 55.4, transparency: 99 },
  { year: '2024-25', received: 92.4, deployed: 87.8, transparency: 100 },
  { year: '2025-26 (Proj)', received: 135.0, deployed: 128.5, transparency: 100 }
];

const BENEFICIARY_GROWTH_DATA = [
  { year: '2021-22', direct: 1200, indirect: 3500 },
  { year: '2022-23', direct: 2800, indirect: 8200 },
  { year: '2023-24', direct: 5100, indirect: 14500 },
  { year: '2024-25', direct: 7800, indirect: 22000 },
  { year: '2025-26 (Proj)', direct: 11500, indirect: 34000 }
];

// District Coverage Stats for Northern Karnataka
const DISTRICT_COVERAGE_STATS = [
  { district: 'Dharwad', activeProjects: 14, familiesReached: 1240, rating: 'AAA', status: 'Optimal' },
  { district: 'Haveri', activeProjects: 11, familiesReached: 1320, rating: 'AAA', status: 'Optimal' },
  { district: 'Belagavi', activeProjects: 16, familiesReached: 1850, rating: 'AA+', status: 'Expanding' },
  { district: 'Gadag', activeProjects: 8, familiesReached: 880, rating: 'AA', status: 'Optimal' },
  { district: 'Vijayapura', activeProjects: 9, familiesReached: 1050, rating: 'AA', status: 'Expanding' },
  { district: 'Bagalkot', activeProjects: 6, familiesReached: 950, rating: 'AA', status: 'Stable' },
  { district: 'Raichur', activeProjects: 10, familiesReached: 1100, rating: 'AA-', status: 'Expanding' },
  { district: 'Bidar', activeProjects: 5, familiesReached: 720, rating: 'AA-', status: 'Active' },
  { district: 'Koppal', activeProjects: 4, familiesReached: 640, rating: 'AA-', status: 'Active' }
];

// PDF preview documents definition
const PRIMARY_COMPLIANCE_DOCS = [
  {
    id: 'darpan',
    name: 'NGO Darpan Verification',
    icon: ShieldCheck,
    refNo: 'KA/2023/0342549',
    authority: 'NITI Aayog, Govt of India',
    date: 'Approved: Oct 2023',
    size: '840 KB',
    status: 'Verified',
    type: 'PDF',
    description: 'NITI Aayog certification validating the Trust’s legal existence, active board status, and eligibility to execute state and central sponsored initiatives.'
  },
  {
    id: 'csr_1',
    name: 'CSR-1 Registration Certificate',
    icon: BadgeCheck,
    refNo: 'CSR00059487',
    authority: 'Ministry of Corporate Affairs',
    date: 'Approved: Apr 2023',
    size: '1.4 MB',
    status: 'Active',
    type: 'PDF',
    description: 'Mandatory registration certificate issued by the Registrar of Companies under Section 135 of the Companies Act, 2013, certifying Raita Mitra for CSR deployment.'
  },
  {
    id: '12a',
    name: '12A Registration Exemption',
    icon: FileBadge,
    refNo: 'AAETR3286KE20221',
    authority: 'Income Tax Department',
    date: 'Approved: Nov 2022',
    size: '1.8 MB',
    status: 'Permanent',
    type: 'PDF',
    description: 'Exemption status under Section 12A of the Income Tax Act, 1961, certifying that the Trust is a non-profit operating exclusively for public charitable welfare.'
  },
  {
    id: '80g',
    name: '80G Approval Certificate',
    icon: ReceiptText,
    refNo: 'AAETR3286KF20231',
    authority: 'Income Tax Department',
    date: 'Approved: Jan 2023',
    size: '1.9 MB',
    status: 'Active',
    type: 'PDF',
    description: 'Order under Section 80G granting tax deduction benefits to corporate, philanthropic and institutional donors investing funds in our on-ground programs.'
  },
  {
    id: 'deed',
    name: 'Trust Deed of Constitution',
    icon: BookOpenCheck,
    refNo: 'Book IV/682/2021',
    authority: 'Sub-Registrar Hubballi',
    date: 'Registered: Aug 2021',
    size: '4.2 MB',
    status: 'Executed',
    type: 'PDF',
    description: 'The foundation constitutional document detailing our non-sectarian objective, governance guidelines, administrative guidelines, and dissolution clauses.'
  },
  {
    id: 'pan',
    name: 'PAN Card of the Trust',
    icon: CreditCard,
    refNo: 'AAETR3286K',
    authority: 'Govt of India Agency',
    date: 'Issued: Sep 2021',
    size: '620 KB',
    status: 'Verified',
    type: 'Image',
    description: 'Permanent Account Number registered directly in the legal name of Raita Mitra Social Trust (R), fully integrated with central CBDT audit streams.'
  }
];

// Folders for Expandable folders
const ANNUAL_REPORTS_FILES = [
  { name: 'Annual Narrative & Impact Report FY 2024-25', size: '5.2 MB', ref: 'RMST/AR/2024-25', date: 'June 2025' },
  { name: 'Annual Narrative & Impact Report FY 2023-24', size: '4.8 MB', ref: 'RMST/AR/2023-24', date: 'June 2024' },
  { name: 'Annual Narrative & Impact Report FY 2022-23', size: '3.9 MB', ref: 'RMST/AR/2022-23', date: 'June 2023' }
];

const AUDITED_FINANCIALS_FILES = [
  { name: 'Independent Auditor Report & Balance Sheet FY 2024-25', size: '3.4 MB', ref: 'HA/AUD/24-25/082', date: 'June 2025', auditor: 'M/s Hegde & Associates' },
  { name: 'Independent Auditor Report & Balance Sheet FY 2023-24', size: '2.9 MB', ref: 'HA/AUD/23-24/114', date: 'June 2024', auditor: 'M/s Hegde & Associates' },
  { name: 'Independent Auditor Report & Balance Sheet FY 2022-23', size: '2.4 MB', ref: 'HA/AUD/22-23/041', date: 'June 2023', auditor: 'M/s Hegde & Associates' }
];

const INCOME_TAX_RETURNS = [
  { name: 'Income Tax Return Form ITR-7 (AY 2025-26)', size: '1.6 MB', ref: 'ITR7-82940284051', date: 'Pending Filing' },
  { name: 'Income Tax Return Form ITR-7 (AY 2024-25)', size: '1.5 MB', ref: 'ITR7-65824961502', date: 'Filed Oct 2024' },
  { name: 'Income Tax Return Form ITR-7 (AY 2023-24)', size: '1.3 MB', ref: 'ITR7-24958195820', date: 'Filed Oct 2023' }
];

const POLICIES_GOVERNANCE_FILES = [
  { name: 'Child Protection & Safeguarding Policy', size: '780 KB', ref: 'RMST/POL/04-C', status: 'Board-Adopted' },
  { name: 'Whistleblower & Anti-Bribery Policy', size: '640 KB', ref: 'RMST/POL/01-A', status: 'Board-Adopted' },
  { name: 'Conflict of Interest & Integrity Charter', size: '510 KB', ref: 'RMST/POL/02-C', status: 'Board-Adopted' },
  { name: 'Financial Management & Delegation Policy', size: '890 KB', ref: 'RMST/POL/05-F', status: 'Board-Adopted' },
  { name: 'Anti-Fraud & Anti-Money Laundering Framework', size: '720 KB', ref: 'RMST/POL/06-AF', status: 'Board-Adopted' },
  { name: 'Safeguarding Against Exploitation (SEAH)', size: '660 KB', ref: 'RMST/POL/07-S', status: 'Board-Adopted' },
  { name: 'Volunteer Coordination & Safety Policy', size: '480 KB', ref: 'RMST/POL/08-V', status: 'Board-Adopted' },
  { name: 'HR Standards & Fair Wages Guidelines', size: '940 KB', ref: 'RMST/POL/03-H', status: 'Board-Adopted' }
];

// Timeline step mappings
const ME_STEPS = [
  {
    step: '01',
    title: 'Baseline Assessment',
    desc: 'Rigorous door-to-door socioeconomic survey charting groundwater, crop patterns, and computer literacy before setting key indicators.'
  },
  {
    step: '02',
    title: 'Project Implementation',
    desc: 'Executing on-ground assets (solar drip grids, IT Labs) using vetted, local engineering networks under direct operational supervision.'
  },
  {
    step: '03',
    title: 'Quarterly Monitoring',
    desc: 'Physical evaluation and progress validation logs, confirming project execution stages match target timelines.'
  },
  {
    step: '04',
    title: 'Geo-tagged Field Evidence',
    desc: 'Uploading precise latitude, longitude, and photo logs of every asset, allowing partners to visually verify field milestones.'
  },
  {
    step: '05',
    title: 'Third-party Evaluation',
    desc: 'Independent research teams and certified agronomists evaluating real income hikes, water conservation levels, and crop yields.'
  },
  {
    step: '06',
    title: 'Impact Reporting',
    desc: 'Assembling complete auditable packages (UCs, financial statements, narrative milestones) to submit directly to corporate partners.'
  }
];

// SDGs mapping
const SDG_ALIGNMENTS = [
  { no: '1', name: 'No Poverty', desc: 'Direct livelihood upgrades for marginalized rainfed farmers.', color: 'bg-[#E5243B] text-white', code: 'SDG 1' },
  { no: '2', name: 'Zero Hunger', desc: 'Boosting micro-crop production and crop-diversity training.', color: 'bg-[#DDA63A] text-white', code: 'SDG 2' },
  { no: '3', name: 'Good Health and Well-being', desc: 'Preventative diagnostic medical vans reaching far clusters.', color: 'bg-[#4C9F38] text-white', code: 'SDG 3' },
  { no: '4', name: 'Quality Education', desc: 'Solar-powered IT Labs and coding scholarships inside rural schools.', color: 'bg-[#C5192D] text-white', code: 'SDG 4' },
  { no: '5', name: 'Gender Equality', desc: 'Empowering women-led dairy and spice processing micro-enterprises.', color: 'bg-[#FF3A21] text-white', code: 'SDG 5' },
  { no: '6', name: 'Clean Water and Sanitation', desc: 'Recharging deep ground aquifers via custom watershed channels.', color: 'bg-[#26BDE2] text-white', code: 'SDG 6' },
  { no: '8', name: 'Decent Work and Economic Growth', desc: 'Micro-entrepreneur mentorship and toolkits for village artisans.', color: 'bg-[#A21942] text-white', code: 'SDG 8' },
  { no: '13', name: 'Climate Action', desc: 'Low-emission solar irrigation pumps and regenerative bio-fertilizers.', color: 'bg-[#3F7E44] text-white', code: 'SDG 13' },
  { no: '15', name: 'Life on Land', desc: 'Soil organic carbon enhancement and intensive windbreak agro-forestry.', color: 'bg-[#56C02B] text-white', code: 'SDG 15' }
];

// Reporting commitments
const REPORTING_COMMITMENTS = [
  { title: 'Quarterly Utilization Reports', desc: 'Financial records matching actual expenses against itemized budgets, certified by accounting officers.' },
  { title: 'Annual Impact Reports', desc: 'Narrative progress detailing programmatic breakthroughs, total beneficiary metrics, and future horizons.' },
  { title: 'Geo-tagged Photographs', desc: 'Live visual telemetry of completed field work, accessible on-demand directly via compliance portals.' },
  { title: 'Beneficiary Success Stories', desc: 'Empathetic case profiles and recorded testimony verifying genuine livelihood and economic upliftment.' },
  { title: 'Third-party Assessments', desc: 'Rigorous external research evaluating structural changes in regional aquifers, soil organic carbon, and test scores.' },
  { title: 'Financial Transparency', desc: 'Board-signed balance sheets, statutory ITR receipts, and auditor remarks uploaded to public databases.' }
];

// horizontal timeline steps for Partnership Lifecycle
const LIFECYCLE_STEPS = [
  { step: '01', title: 'Requirement Discussion', desc: 'Discuss alignment with corporate mandate, geography, and specific thematic target domains.' },
  { step: '02', title: 'Proposal Submission', desc: 'Submitting clear, action-oriented logical models, itemized budgets, and clear milestone schedules.' },
  { step: '03', title: 'Project Planning', desc: 'Setting baseline survey controls, selecting field officers, and laying coordination pipelines.' },
  { step: '04', title: 'Implementation', desc: 'Executing on-ground deployments directly supervised by Raita Mitra’s ESG team.' },
  { step: '05', title: 'Monitoring', desc: 'Continuous coordinate tracking, milestone logs, and concurrent internal financial checks.' },
  { step: '06', title: 'Impact Reporting', desc: 'Filing clear, auditable outcomes, narrative reviews, and geo-tagged photographs.' },
  { step: '07', title: 'Project Closure', desc: 'Issuing the final board-signed Utilization Certificate (UC) and third-party audit reports.' }
];

// FAQs Definition
const COMPLIANCE_FAQS = [
  {
    q: "Is Raita Mitra Social Trust eligible for CSR funding under the Companies Act, 2013?",
    a: "Yes, Raita Mitra Social Trust is fully registered with the Ministry of Corporate Affairs under Section 135 (Registration No. CSR00059487) and possesses valid 12A exemption and 80G tax benefit certificates. Our compliance profiles are verified on the NITI Aayog NGO Darpan portal (ID: KA/2023/0342549)."
  },
  {
    q: "Does the Trust provide Utilization Certificates (UCs) and audited financial bills?",
    a: "Absolutely. We pride ourselves on absolute financial accountability. Every project receives a dedicated corporate ledger ledger where expenditure vouchers, procurement invoices, and payroll bills are tracked. We issue formal, auditor-certified Utilization Certificates (Form 12C format or custom partner formats) at the end of every quarter and fiscal year."
  },
  {
    q: "How frequently are progress and milestone reports shared with corporate partners?",
    a: "By default, we share comprehensive, geo-tagged milestone reports every quarter. This contains on-ground photos with embedded GPS coordinates, direct beneficiary testimonials, and budget utilization charts. For larger initiatives, we also grant partner representatives access to active project monitoring boards."
  },
  {
    q: "Can corporate CSR heads and institutional auditors conduct direct field verification visits?",
    a: "We strongly encourage field visits! Transparency is central to our mission. Corporate representatives, ESG directors, auditors, and board trustees are always welcome to visit our active sites in Dharwad, Haveri, or Belagavi. We assist in organizing logistical details and coordinates directly with local panchayat committees."
  },
  {
    q: "Does the Trust support customized CSR projects designed around specific corporate core values?",
    a: "Yes. While our foundational models are regenerative agriculture, solar water security, and rural IT labs, we work alongside CSR committees to design custom-tailored projects. Whether you wish to focus on specific high-priority taluks (such as drought-prone clusters) or promote specific community engineering frameworks, we can customize a robust project plan."
  }
];

export default function ComplianceHub({ highContrast }: ComplianceHubProps) {
  // Navigation tracking
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, []);

  // State Management
  const [activeRepositoryTab, setActiveRepositoryTab] = useState<string>('primary');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Folders expand/collapse state
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    annual: false,
    audit: false,
    tax: false,
    policies: false
  });

  // Active chart in Fund Utilization dashboard
  const [activeChartTab, setActiveChartTab] = useState<'programs' | 'transparency' | 'beneficiaries' | 'coverage'>('programs');

  // FAQ accordion tracking
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Multi-Step Inquiry Form State
  const [formStep, setFormStep] = useState<number>(1);
  const [inquiryForm, setInquiryForm] = useState({
    orgName: '',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    focusArea: 'Regenerative Agriculture',
    budgetRange: '₹10L - ₹25L',
    state: 'Karnataka',
    message: ''
  });
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  // Download simulation progress state
  const [downloadProgress, setDownloadProgress] = useState<{ id: string; step: string; percent: number } | null>(null);

  const toggleFolder = (folderKey: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderKey]: !prev[folderKey]
    }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const triggerDownloadSimulation = (docName: string, docId: string) => {
    if (downloadProgress) return; // Prevent concurrent simulation
    
    let percent = 0;
    const steps = [
      'Establishing secure link to Raita Mitra trust vault...',
      'Verifying digital board signatures and certificates...',
      'Embedding unique tracking token for ESG transparency...',
      'Compiling authenticated PDF packet...'
    ];
    
    setDownloadProgress({ id: docId, step: steps[0], percent: 0 });

    const interval = setInterval(() => {
      percent += 20;
      const stepIndex = Math.min(Math.floor(percent / 25), steps.length - 1);
      
      if (percent <= 100) {
        setDownloadProgress({
          id: docId,
          step: steps[stepIndex],
          percent
        });
      } else {
        clearInterval(interval);
        setDownloadProgress(null);
        alert(`Success: "${docName}" has been simulated as a verified, high-resolution board-signed PDF download. In a live environment, the actual audit artifact will be downloaded instantly.`);
      }
    }, 400);
  };

  // Inquiry form handlers
  const handleInquiryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInquiryForm(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    // Basic validation
    if (formStep === 1) {
      if (!inquiryForm.orgName || !inquiryForm.contactPerson || !inquiryForm.designation) {
        alert("Please complete all fields in this step to proceed.");
        return;
      }
    } else if (formStep === 2) {
      if (!inquiryForm.email || !inquiryForm.phone) {
        alert("Please fill in your corporate contact details.");
        return;
      }
    }
    setFormStep(prev => prev + 1);
  };

  const prevStep = () => {
    setFormStep(prev => prev - 1);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.message) {
      alert("Please enter a short message describing your CSR objectives.");
      return;
    }
    setIsFormSubmitting(true);
    
    setTimeout(() => {
      setIsFormSubmitting(false);
      setIsFormSubmitted(true);
    }, 2000);
  };

  const resetForm = () => {
    setInquiryForm({
      orgName: '',
      contactPerson: '',
      designation: '',
      email: '',
      phone: '',
      focusArea: 'Regenerative Agriculture',
      budgetRange: '₹10L - ₹25L',
      state: 'Karnataka',
      message: ''
    });
    setFormStep(1);
    setIsFormSubmitted(false);
  };

  return (
    <div className={`w-full transition-colors duration-300 font-sans ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`} id="csr-compliance-hub-root">
      
      {/* 1. PREMIUM CORPORATE BANNER HERO SECTION */}
      <section className="relative w-full py-24 md:py-32 bg-slate-950 flex flex-col justify-center items-center overflow-hidden text-center text-white px-4" id="compliance-hero">
        {/* Cinematic dark overlaid backdrop */}
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center mix-blend-overlay scale-105"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/50 z-10"></div>
        
        <div className="relative z-20 max-w-4xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <nav className="flex justify-center items-center gap-2 text-xs font-mono tracking-wider text-slate-400 mb-2">
            <span className="hover:text-gold cursor-pointer transition-colors">Home</span>
            <ChevronRight size={12} className="opacity-50" />
            <span className="text-gold font-bold">CSR & Compliance Hub</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck size={12} />
            Institutional Transparency Portal
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
            Transparency, Compliance & <br />
            <span className="bg-gradient-to-r from-emerald-400 via-gold to-yellow-300 bg-clip-text text-transparent">
              Accountability
            </span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Providing corporate partners with complete confidence through verified registrations, absolute financial transparency, and measurable on-ground impact reporting.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              onClick={() => triggerDownloadSimulation('CSR Corporate Brochure 2026', 'csr_brochure')}
              className="px-6 py-3 rounded-full text-xs md:text-sm font-bold bg-gold hover:bg-gold-light text-slate-950 cursor-pointer transition-all flex items-center gap-2"
            >
              <FileDown size={16} />
              Download CSR Brochure
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById("partner-inquiry-section");
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-full text-xs md:text-sm font-bold border border-white/20 hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-2"
            >
              Become A CSR Partner
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. QUICK COMPLIANCE BAR */}
      <section className="relative z-30 max-w-7xl mx-auto px-4 -mt-8" id="quick-compliance">
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-3xl backdrop-blur-md border ${
          highContrast ? 'bg-black border-2 border-white' : 'bg-white/80 border-slate-200/60 shadow-lg shadow-slate-100/50'
        }`}>
          {[
            { title: "NGO Darpan ID", value: "KA/2023/0342549", status: "Verified", color: "border-emerald-500/20 text-emerald-500 bg-emerald-500/5" },
            { title: "CSR Registration", value: "CSR00059487", status: "Approved", color: "border-amber-500/20 text-amber-500 bg-amber-500/5" },
            { title: "PAN of the Trust", value: "AAETR3286K", status: "Active", color: "border-cyan-500/20 text-cyan-500 bg-cyan-500/5" },
            { title: "80G Registration", value: "AAETR3286KF20231", status: "Approved", color: "border-indigo-500/20 text-indigo-500 bg-indigo-500/5" }
          ].map((card, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all hover:scale-101 ${
                highContrast ? 'bg-black border-white' : 'bg-slate-50 border-slate-100/80'
              }`}
            >
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">{card.title}</span>
                <p className="text-xs md:text-sm font-mono font-extrabold text-slate-800 dark:text-white mt-1 select-all">{card.value}</p>
              </div>
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-100">
                <button 
                  onClick={() => handleCopy(card.value, card.title)} 
                  className="text-[9px] font-mono uppercase font-bold text-slate-400 hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === card.title ? (
                    <>
                      <Check size={10} className="text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={10} />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${card.color}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {card.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRUST BADGES SECTION */}
      <section className="py-12 max-w-7xl mx-auto px-4" id="trust-badges">
        <div className="text-center space-y-2 mb-8">
          <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">STATUTORY AUDITING & APPROVALS</p>
          <h2 className={`font-display font-extrabold text-lg md:text-2xl ${highContrast ? 'text-white' : 'text-slate-800'}`}>
            Authorized Trust Registrations
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "NGO Darpan", subtitle: "NITI Aayog Registered", code: "KA/2023/0342549", icon: ShieldCheck, desc: "Eligible for Central/State developmental projects" },
            { name: "CSR-1 Registration", subtitle: "MCA Approved", code: "CSR00059487", icon: BadgeCheck, desc: "Certified for corporate CSR partnership grants" },
            { name: "12A Registration", subtitle: "Income Tax Exemption", code: "Exempt Status", icon: FileBadge, desc: "Validates non-profit charity framework" },
            { name: "80G Approval", subtitle: "Tax Benefit Certificate", code: "Donation Deductions", icon: ReceiptText, desc: "50% tax deductions for institutional funders" }
          ].map((badge, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all hover:shadow-md ${
                highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/15">
                  <badge.icon size={20} />
                </div>
                <span className="text-[8px] font-mono font-bold uppercase bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                  AUTHENTIC
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-tight font-display">{badge.name}</h3>
                <p className="text-[10px] text-slate-400 font-mono font-semibold mt-0.5">{badge.subtitle}</p>
                <p className="text-[11px] text-slate-500 mt-2 font-sans leading-relaxed">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DOCUMENT REPOSITORY SECTOR (TABBED DASHBOARD) */}
      <section className="py-20 max-w-7xl mx-auto px-4" id="document-repository">
        <div className="text-left space-y-3 mb-10 border-b border-slate-200/60 pb-6">
          <span className="text-xs font-mono tracking-widest text-gold font-bold uppercase">SECURED DATABASE</span>
          <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-slate-900'}`}>
            Compliance & Document Repository
          </h2>
          <p className="text-xs md:text-sm text-slate-500 max-w-3xl">
            Access board-approved compliance records, audit certificates, statutory sheets, and internal code-of-conduct guidelines. Click any tab to toggle document structures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tab Selection Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {[
              { id: 'primary', label: 'Primary Registrations', desc: 'NGO Darpan, CSR-1, 12A, 80G, Trust Deed', icon: ShieldCheck },
              { id: 'annual', label: 'Annual Reports', desc: 'Yearly milestones & narrative impact boards', icon: FileText },
              { id: 'financials', label: 'Audited Financials', desc: 'Vetted Balance Sheets & Auditor remarks', icon: TrendingUp },
              { id: 'tax-returns', label: 'Income Tax Returns', desc: 'Certified Form ITR-7 filings', icon: Calculator },
              { id: 'governance', label: 'Policies & Governance', desc: 'Whistleblower, child safeguarding, POSH', icon: Scale }
            ].map((tab) => {
              const isSelected = activeRepositoryTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveRepositoryTab(tab.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex gap-3.5 items-start ${
                    isSelected
                      ? highContrast
                        ? 'bg-white text-black border-white font-extrabold'
                        : 'bg-emerald-900 text-white border-emerald-950 shadow-md'
                      : highContrast
                        ? 'bg-black border-white text-white hover:bg-slate-900'
                        : 'bg-white border-slate-200/70 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <tab.icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-bold leading-tight font-display">{tab.label}</h3>
                    <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-white/70' : 'text-slate-400'} font-sans`}>
                      {tab.desc}
                    </p>
                  </div>
                </button>
              );
            })}
            
            <div className={`mt-6 p-4 rounded-2xl border text-left text-xs ${
              highContrast ? 'border-white text-white bg-black' : 'bg-emerald-500/5 border-emerald-500/10 text-slate-600'
            }`}>
              <Info size={14} className="text-emerald-600 inline mr-1" />
              <span className="font-sans leading-normal">
                <strong>Upload Notice:</strong> Future regulatory filings and updated auditing statements are automatically indexable without requiring system redesign.
              </span>
            </div>
          </div>

          {/* Tab Contents Display Area (8 cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeRepositoryTab === 'primary' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  key="primary-tab"
                >
                  {PRIMARY_COMPLIANCE_DOCS.map((doc) => (
                    <div 
                      key={doc.id}
                      className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all hover:shadow-sm ${
                        highContrast ? 'bg-black border-white text-white' : 'bg-white border-slate-200/50'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="inline-flex items-center gap-1 text-[8px] font-mono font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase">
                            <Layers size={10} />
                            {doc.type} File
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">{doc.size}</span>
                        </div>
                        
                        <div className="flex gap-2 items-center">
                          <doc.icon size={16} className="text-emerald-600 shrink-0" />
                          <h4 className="text-xs md:text-sm font-bold text-slate-800 dark:text-white font-display leading-tight">
                            {doc.name}
                          </h4>
                        </div>
                        
                        <p className="text-[10px] text-slate-400 font-mono">
                          ID: {doc.refNo} | {doc.authority}
                        </p>
                        <p className="text-xs text-slate-500 leading-normal font-sans">
                          {doc.description}
                        </p>
                      </div>

                      {/* Micro-interaction Download state */}
                      <div className="mt-5 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                        <span className="text-[10px] text-slate-400 font-mono">{doc.date}</span>
                        
                        {downloadProgress?.id === doc.id ? (
                          <div className="text-[10px] font-mono text-emerald-600 text-right space-y-1">
                            <p className="animate-pulse font-bold">{downloadProgress.step}</p>
                            <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-600 transition-all duration-300" style={{ width: `${downloadProgress.percent}%` }}></div>
                            </div>
                          </div>
                        ) : (
                          <button 
                            onClick={() => triggerDownloadSimulation(doc.name, doc.id)}
                            className="text-[10px] font-bold text-emerald-700 hover:text-emerald-600 uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:underline"
                          >
                            <Download size={11} />
                            Secure PDF
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeRepositoryTab === 'annual' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                  key="annual-tab"
                >
                  <div 
                    onClick={() => toggleFolder('annual')}
                    className={`p-4 rounded-2xl border text-left flex justify-between items-center cursor-pointer transition-colors ${
                      highContrast ? 'bg-black border-white hover:bg-slate-900' : 'bg-slate-50 border-slate-200/60 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex gap-3 items-center">
                      <FileText size={20} className="text-emerald-700" />
                      <div>
                        <h4 className="text-xs md:text-sm font-bold font-display text-slate-800 dark:text-white">Annual Reports Directory</h4>
                        <p className="text-[10px] text-slate-400">Expand folder to read verified corporate social milestone packages</p>
                      </div>
                    </div>
                    {expandedFolders.annual ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>

                  {expandedFolders.annual && (
                    <div className="pl-4 border-l border-emerald-900/10 space-y-3 pt-1">
                      {ANNUAL_REPORTS_FILES.map((file, i) => (
                        <div 
                          key={i}
                          className={`p-4 rounded-xl border text-left flex flex-col sm:flex-row justify-between sm:items-center gap-4 ${
                            highContrast ? 'bg-black border-white' : 'bg-white border-slate-100 shadow-sm'
                          }`}
                        >
                          <div>
                            <h5 className="text-xs font-bold text-slate-800 dark:text-white font-display leading-snug">{file.name}</h5>
                            <p className="text-[10px] font-mono text-slate-400 mt-1">Ref No: {file.ref} | Published: {file.date}</p>
                          </div>
                          <div className="flex items-center gap-3 self-end sm:self-auto">
                            <span className="text-[9px] font-mono text-slate-400">{file.size}</span>
                            <button 
                              onClick={() => triggerDownloadSimulation(file.name, `ar_${i}`)}
                              className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer flex items-center gap-1"
                            >
                              <Download size={10} />
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeRepositoryTab === 'financials' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                  key="financials-tab"
                >
                  <div 
                    onClick={() => toggleFolder('audit')}
                    className={`p-4 rounded-2xl border text-left flex justify-between items-center cursor-pointer transition-colors ${
                      highContrast ? 'bg-black border-white hover:bg-slate-900' : 'bg-slate-50 border-slate-200/60 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex gap-3 items-center">
                      <TrendingUp size={20} className="text-emerald-700" />
                      <div>
                        <h4 className="text-xs md:text-sm font-bold font-display text-slate-800 dark:text-white">Audited Financial Statements Directory</h4>
                        <p className="text-[10px] text-slate-400">Expand folder to read Balance Sheets and certified Chartered Accountant audits</p>
                      </div>
                    </div>
                    {expandedFolders.audit ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>

                  {expandedFolders.audit && (
                    <div className="pl-4 border-l border-emerald-900/10 space-y-3 pt-1">
                      {AUDITED_FINANCIALS_FILES.map((file, i) => (
                        <div 
                          key={i}
                          className={`p-4 rounded-xl border text-left flex flex-col sm:flex-row justify-between sm:items-center gap-4 ${
                            highContrast ? 'bg-black border-white' : 'bg-white border-slate-100 shadow-sm'
                          }`}
                        >
                          <div>
                            <h5 className="text-xs font-bold text-slate-800 dark:text-white font-display leading-snug">{file.name}</h5>
                            <p className="text-[10px] font-mono text-slate-400 mt-1">Ref: {file.ref} | Auditor: {file.auditor} | Filed: {file.date}</p>
                          </div>
                          <div className="flex items-center gap-3 self-end sm:self-auto">
                            <span className="text-[9px] font-mono text-slate-400">{file.size}</span>
                            <button 
                              onClick={() => triggerDownloadSimulation(file.name, `fin_${i}`)}
                              className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer flex items-center gap-1"
                            >
                              <Download size={10} />
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeRepositoryTab === 'tax-returns' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                  key="tax-tab"
                >
                  <div 
                    onClick={() => toggleFolder('tax')}
                    className={`p-4 rounded-2xl border text-left flex justify-between items-center cursor-pointer transition-colors ${
                      highContrast ? 'bg-black border-white hover:bg-slate-900' : 'bg-slate-50 border-slate-200/60 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex gap-3 items-center">
                      <Calculator size={20} className="text-emerald-700" />
                      <div>
                        <h4 className="text-xs md:text-sm font-bold font-display text-slate-800 dark:text-white">Income Tax Returns (ITR-7) Directory</h4>
                        <p className="text-[10px] text-slate-400">Expand folder to verify official submissions to Central CBDT portals</p>
                      </div>
                    </div>
                    {expandedFolders.tax ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>

                  {expandedFolders.tax && (
                    <div className="pl-4 border-l border-emerald-900/10 space-y-3 pt-1">
                      {INCOME_TAX_RETURNS.map((file, i) => (
                        <div 
                          key={i}
                          className={`p-4 rounded-xl border text-left flex flex-col sm:flex-row justify-between sm:items-center gap-4 ${
                            highContrast ? 'bg-black border-white' : 'bg-white border-slate-100 shadow-sm'
                          }`}
                        >
                          <div>
                            <h5 className="text-xs font-bold text-slate-800 dark:text-white font-display leading-snug">{file.name}</h5>
                            <p className="text-[10px] font-mono text-slate-400 mt-1">Ack No: {file.ref} | Status: {file.date}</p>
                          </div>
                          <div className="flex items-center gap-3 self-end sm:self-auto">
                            <span className="text-[9px] font-mono text-slate-400">{file.size}</span>
                            <button 
                              onClick={() => triggerDownloadSimulation(file.name, `itr_${i}`)}
                              className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer flex items-center gap-1"
                            >
                              <Download size={10} />
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeRepositoryTab === 'governance' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                  key="governance-tab"
                >
                  <div 
                    onClick={() => toggleFolder('policies')}
                    className={`p-4 rounded-2xl border text-left flex justify-between items-center cursor-pointer transition-colors ${
                      highContrast ? 'bg-black border-white hover:bg-slate-900' : 'bg-slate-50 border-slate-200/60 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex gap-3 items-center">
                      <Scale size={20} className="text-emerald-700" />
                      <div>
                        <h4 className="text-xs md:text-sm font-bold font-display text-slate-800 dark:text-white">Policies & Governance Directory</h4>
                        <p className="text-[10px] text-slate-400">Expand folder to read Child Safety, anti-bribery, conflict-of-interest charters</p>
                      </div>
                    </div>
                    {expandedFolders.policies ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>

                  {expandedFolders.policies && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      {POLICIES_GOVERNANCE_FILES.map((file, i) => (
                        <div 
                          key={i}
                          className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 ${
                            highContrast ? 'bg-black border-white text-white' : 'bg-white border-slate-100 shadow-sm'
                          }`}
                        >
                          <div>
                            <h5 className="text-xs font-bold text-slate-800 dark:text-white font-display leading-tight">{file.name}</h5>
                            <p className="text-[9px] font-mono text-emerald-600 mt-1 uppercase font-bold">✓ {file.status}</p>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs">
                            <span className="text-[9px] font-mono text-slate-400">{file.size}</span>
                            <button 
                              onClick={() => triggerDownloadSimulation(file.name, `pol_${i}`)}
                              className="text-[10px] font-bold text-emerald-700 uppercase hover:underline cursor-pointer"
                            >
                              Download PDF
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 5. FUND UTILIZATION DASHBOARD (INTERACTIVE INFOGRAPHICS) */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t-2 border-b-2 border-white' : 'bg-white border-t border-b border-slate-200/40'}`} id="fund-utilization">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">LIVE METRIC HARVESTING</span>
            <h2 className={`text-2xl md:text-4xl font-display font-extrabold tracking-tight ${highContrast ? 'text-white' : 'text-slate-900'}`}>
              Fund Utilization Framework
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto font-sans leading-relaxed">
              Explore how we secure absolute financial efficiency, ensuring over 92% of corporate funds go directly to rural community infrastructure.
            </p>

            {/* Quick dashboard tab selector */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {[
                { id: 'programs', label: 'Program Allocation' },
                { id: 'transparency', label: 'Financial Growth' },
                { id: 'beneficiaries', label: 'Beneficiary Scaling' },
                { id: 'coverage', label: 'District Operations' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveChartTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeChartTab === tab.id
                      ? "bg-emerald-900 text-white shadow"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left side Graphic Visualizer (8 cols) */}
            <div className={`lg:col-span-8 p-6 rounded-3xl border flex flex-col justify-center min-h-[380px] ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-slate-50 border-slate-100 shadow-inner'
            }`}>
              <AnimatePresence mode="wait">
                {activeChartTab === 'programs' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="w-full h-full space-y-4"
                    key="chart-programs"
                  >
                    <h3 className="text-xs md:text-sm font-mono font-bold uppercase tracking-wider text-slate-400 text-left">
                      ✓ verified allocation distribution
                    </h3>
                    <div className="h-[280px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={PROGRAM_PIE_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {PROGRAM_PIE_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Program Allocation']}
                            contentStyle={{ borderRadius: '12px', fontSize: '11px', fontFamily: 'monospace' }}
                          />
                          <Legend 
                            verticalAlign="bottom" 
                            height={36} 
                            iconType="circle"
                            wrapperStyle={{ fontSize: '10px', fontFamily: 'sans-serif' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                )}

                {activeChartTab === 'transparency' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="w-full h-full space-y-4"
                    key="chart-transparency"
                  >
                    <h3 className="text-xs md:text-sm font-mono font-bold uppercase tracking-wider text-slate-400 text-left">
                      ✓ deployment growth (₹ In Lakhs)
                    </h3>
                    <div className="h-[280px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={ANNUAL_GROWTH_DATA}
                          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#16a34a" stopOpacity={0.05}/>
                            </linearGradient>
                            <linearGradient id="colorDeployed" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#eab308" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#eab308" stopOpacity={0.05}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis dataKey="year" stroke="#94A3B8" fontSize={10} fontFamily="monospace" />
                          <YAxis stroke="#94A3B8" fontSize={10} fontFamily="monospace" />
                          <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px' }} />
                          <Area type="monotone" dataKey="received" name="Received Funds (₹L)" stroke="#16a34a" fillOpacity={1} fill="url(#colorReceived)" />
                          <Area type="monotone" dataKey="deployed" name="Deployed in Communities (₹L)" stroke="#eab308" fillOpacity={1} fill="url(#colorDeployed)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                )}

                {activeChartTab === 'beneficiaries' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="w-full h-full space-y-4"
                    key="chart-beneficiaries"
                  >
                    <h3 className="text-xs md:text-sm font-mono font-bold uppercase tracking-wider text-slate-400 text-left">
                      ✓ direct vs indirect beneficiary scale
                    </h3>
                    <div className="h-[280px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={BENEFICIARY_GROWTH_DATA}
                          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis dataKey="year" stroke="#94A3B8" fontSize={10} fontFamily="monospace" />
                          <YAxis stroke="#94A3B8" fontSize={10} fontFamily="monospace" />
                          <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px' }} />
                          <Legend wrapperStyle={{ fontSize: '10px' }} />
                          <Bar dataKey="direct" name="Direct Beneficiaries (Families)" fill="#0d9488" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="indirect" name="Indirect Beneficiaries (Villagers)" fill="#818cf8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                )}

                {activeChartTab === 'coverage' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="w-full h-full space-y-4"
                    key="chart-coverage"
                  >
                    <h3 className="text-xs md:text-sm font-mono font-bold uppercase tracking-wider text-slate-400 text-left">
                      ✓ taluk & district presence summary
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-sans">
                        <thead>
                          <tr className="border-b border-slate-200/60 text-slate-400 font-mono">
                            <th className="pb-2">District</th>
                            <th className="pb-2">Active Projects</th>
                            <th className="pb-2">Families Reached</th>
                            <th className="pb-2">Audit Rank</th>
                            <th className="pb-2">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {DISTRICT_COVERAGE_STATS.map((d, i) => (
                            <tr key={i} className="hover:bg-slate-100/50">
                              <td className="py-2.5 font-bold font-display">{d.district}</td>
                              <td className="py-2.5 font-mono">{d.activeProjects}</td>
                              <td className="py-2.5 font-mono">{d.familiesReached}</td>
                              <td className="py-2.5 text-emerald-600 font-mono font-bold">{d.rating}</td>
                              <td className="py-2.5 text-slate-500">{d.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right side efficiency metrics (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              
              {/* Glassmorphism Ratio meter */}
              <div className={`p-6 rounded-3xl border text-left ${
                highContrast ? 'bg-black border-2 border-white' : 'bg-emerald-950 text-white shadow-xl'
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold bg-white/10 text-gold-light px-2 py-0.5 rounded uppercase">
                    transparency ratio
                  </span>
                  <Award size={18} className="text-gold" />
                </div>
                <div className="mt-6 text-center space-y-2">
                  <span className="text-5xl font-display font-black text-white">92.4%</span>
                  <h4 className="text-sm font-bold text-slate-200">Goes Directly to Programs</h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Under strict guidelines, we limit administrative overhead, coordinating expenses, and auditing costs to only 7.6% annually.
                  </p>
                </div>
                
                {/* Horizontal Progress bar */}
                <div className="mt-6 space-y-1.5 text-xs font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span>Direct Program Work</span>
                    <span>92.4%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400" style={{ width: '92.4%' }}></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                    <span>Admin/Compliance</span>
                    <span>7.6%</span>
                  </div>
                </div>
              </div>

              {/* Secure audit guarantee */}
              <div className={`p-5 rounded-3xl border text-left flex gap-3.5 items-start ${
                highContrast ? 'bg-black border-white text-white' : 'bg-white border-slate-200/50 shadow-sm'
              }`}>
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
                  <Shield size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs md:text-sm font-bold text-slate-800 dark:text-white font-display">
                    Audited by Hegde & Associates
                  </h4>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    All financial balances are fully cross-referenced, and filed regularly with the Ministry of Corporate Affairs (MCA).
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. MONITORING & EVALUATION TIMELINE (FLOW DIAGRAM) */}
      <section className="py-20 max-w-7xl mx-auto px-4" id="monitoring-evaluation">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs uppercase font-mono tracking-widest text-gold font-bold">continuous quality checking</span>
          <h2 className={`text-2xl md:text-4xl font-display font-extrabold ${highContrast ? 'text-white' : 'text-slate-900'}`}>
            Monitoring & Evaluation Framework
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Our multi-tier logic model ensures that every rupee committed transforms into robust capability inside drought-prone taluks.
          </p>
        </div>

        {/* Timeline Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative" id="me-timeline-flow">
          {ME_STEPS.map((step, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-2xl border text-left flex flex-col justify-between relative group hover:-translate-y-1 transition-transform ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/50 shadow-sm'
              }`}
            >
              {/* Connector line overlay for desktop screen */}
              {idx < 5 && (
                <div className="hidden lg:block absolute top-1/2 -right-3.5 w-7 h-[1.5px] bg-slate-200 z-10"></div>
              )}
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-mono font-black text-emerald-900/10 group-hover:text-emerald-900/20 transition-colors">
                    {step.step}
                  </span>
                  <CheckCircle2 size={16} className="text-emerald-600" />
                </div>
                <h4 className="font-display font-extrabold text-sm text-slate-800 dark:text-white leading-tight">
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. ESG & SDG ALIGNMENT (CARDS WITH OFFICIAL SDG REF) */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t-2 border-b-2 border-white' : 'bg-emerald-950/5 border-t border-b border-emerald-950/10'}`} id="esg-sdg-alignment">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="text-xs uppercase font-mono tracking-widest text-gold font-bold">UNITED NATIONS GLOBAL GOALS</span>
            <h2 className={`text-2xl md:text-4xl font-display font-extrabold ${highContrast ? 'text-white' : 'text-slate-900'}`}>
              ESG & SDG Alignment
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Our rural programs directly contribute to nine United Nations Sustainable Development Goals, creating compliant pathways for ESG investments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SDG_ALIGNMENTS.map((sdg, idx) => (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border text-left flex gap-4 items-stretch ${
                  highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/50 shadow-sm'
                }`}
              >
                {/* Simulated colorful official SDG number block */}
                <div className={`w-14 h-14 rounded-xl shrink-0 flex flex-col items-center justify-center font-display font-black text-lg ${sdg.color}`}>
                  <span>{sdg.no}</span>
                  <span className="text-[8px] uppercase tracking-tighter mt-[-4px]">goal</span>
                </div>
                <div className="space-y-1 flex flex-col justify-center">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">{sdg.code}</span>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white font-display leading-tight">{sdg.name}</h4>
                  <p className="text-xs text-slate-500 leading-normal font-sans">{sdg.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. REPORTING COMMITMENT TIMELINE CARDS */}
      <section className="py-20 max-w-7xl mx-auto px-4" id="reporting-commitments">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs uppercase font-mono tracking-widest text-gold font-bold">philanthropic assurances</span>
          <h2 className={`text-2xl md:text-4xl font-display font-extrabold ${highContrast ? 'text-white' : 'text-slate-900'}`}>
            Our Reporting Commitment
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto font-sans leading-relaxed">
            We provide institutional stakeholders with a reliable cadence of auditable narratives, accounting files, and telemetry sheets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REPORTING_COMMITMENTS.map((item, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-3xl border text-left relative overflow-hidden group ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/55 shadow-sm'
              }`}
            >
              {/* Stylized background watermark number */}
              <span className="absolute bottom-[-10px] right-2 font-display font-black text-6xl text-slate-100 dark:text-slate-900/10 pointer-events-none select-none z-0">
                0{idx + 1}
              </span>
              <div className="relative z-10 space-y-3">
                <div className="w-1.5 h-6 bg-gold rounded-full"></div>
                <h4 className="font-display font-extrabold text-base text-slate-800 dark:text-white leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. POLICIES & GOVERNANCE FRAMEWORK INTERACTIVE CARDS */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t-2 border-b-2 border-white' : 'bg-slate-50'}`} id="policies-framework">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="text-xs uppercase font-mono tracking-widest text-gold font-bold">integrity charter</span>
            <h2 className={`text-2xl md:text-4xl font-display font-extrabold ${highContrast ? 'text-white' : 'text-slate-900'}`}>
              Policies & Governance Framework
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto">
              Our operations are guided by robust policies adopted and supervised by the board of trustees to prevent leakage or ethical compromised.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POLICIES_GOVERNANCE_FILES.map((file, idx) => (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all hover:shadow-md ${
                  highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-100 shadow-sm hover:-translate-y-1'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-900">
                      <Scale size={16} />
                    </div>
                    <span className="text-[8px] font-mono font-bold bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded uppercase">
                      Board-Adopted
                    </span>
                  </div>
                  <h3 className="text-xs md:text-sm font-extrabold text-slate-800 dark:text-white font-display leading-snug">
                    {file.name}
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400">
                    Ref: {file.ref} | Size: {file.size}
                  </p>
                </div>
                
                <div className="mt-5 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-[9px] font-mono text-slate-400">Ver 1.2 Approved</span>
                  <button 
                    onClick={() => triggerDownloadSimulation(file.name, `pol_sec_${idx}`)}
                    className="text-[10px] font-mono font-bold text-emerald-700 uppercase hover:underline cursor-pointer"
                  >
                    Read Charter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CSR PARTNERSHIP JOURNEY INFOGRAPHIC */}
      <section className="py-20 max-w-7xl mx-auto px-4" id="partnership-journey">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs uppercase font-mono tracking-widest text-gold font-bold">COLLABORATION STEPS</span>
          <h2 className={`text-2xl md:text-4xl font-display font-extrabold ${highContrast ? 'text-white' : 'text-slate-900'}`}>
            CSR Partnership Journey
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            From preliminary target discussions to formal closure audits, we manage every integration stage with corporate-grade precision.
          </p>
        </div>

        {/* Horizontal Flowchart Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 text-left" id="partnership-lifecycle-timeline">
          {LIFECYCLE_STEPS.map((step, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-2xl border flex flex-col justify-between transition-all relative ${
                highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-sm'
              }`}
            >
              {/* Connector lines for desktop screen */}
              {idx < 6 && (
                <div className="hidden lg:block absolute top-1/2 -right-2.5 w-5 h-[1px] bg-slate-200 z-10"></div>
              )}
              
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                  Step {step.step}
                </span>
                <h4 className="font-display font-extrabold text-xs text-slate-800 dark:text-white leading-tight">
                  {step.title}
                </h4>
                <p className="text-[10px] text-slate-500 leading-normal font-sans">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. ANNUAL REPORTS SECTION (MAGAZINE STYLE CARDS) */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t-2 border-b-2 border-white' : 'bg-white border-t border-b border-slate-200/40'}`} id="annual-magazine-cards">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="text-xs uppercase font-mono tracking-widest text-gold font-bold">ANNUAL ARCHIVES</span>
            <h2 className={`text-2xl md:text-4xl font-display font-extrabold ${highContrast ? 'text-white' : 'text-slate-900'}`}>
              Annual Reports & Magazines
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Read our comprehensive publication-grade annual magazines containing extensive field maps, stakeholder notes, and accounting summaries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { year: 'FY 2025-26', subtitle: 'Leading with Solar & IT Labs', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800', desc: 'Detailed forecasts and milestone updates for our newly sanctioned drought mitigation corridors across Belagavi and Haveri.' },
              { year: 'FY 2024-25', subtitle: 'Regenerative Milestones', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800', desc: 'Focuses on the transformation of 5,000 dryland families, establishing women dairy units, and implementing 140 recharge wells.' },
              { year: 'FY 2023-24', subtitle: 'Sowing the Seeds', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800', desc: 'Our baseline year report documenting original water index failures, school shortages, and setting the target indicators.' }
            ].map((mag, idx) => (
              <div 
                key={idx}
                className={`rounded-3xl overflow-hidden border text-left flex flex-col justify-between transition-all hover:shadow-lg ${
                  highContrast ? 'bg-black border-2 border-white text-white' : 'bg-slate-50/50 border-slate-200/50 hover:-translate-y-1'
                }`}
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden">
                    <img 
                      src={mag.image} 
                      alt={mag.year} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-emerald-900 text-white font-mono font-bold text-[9px] px-2.5 py-1 rounded-md uppercase">
                      {mag.year}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-display font-extrabold text-lg text-slate-800 dark:text-white leading-tight">
                      {mag.year} Annual Magazine
                    </h3>
                    <p className="text-xs text-gold font-mono tracking-wide font-bold">{mag.subtitle}</p>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">{mag.desc}</p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button 
                    onClick={() => triggerDownloadSimulation(`${mag.year} Magazine`, `mag_${idx}`)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Download size={13} />
                    Download Annual Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FAQ SECTION (ACCORDION) */}
      <section className="py-20 max-w-4xl mx-auto px-4" id="faq-accordions">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">Frequently Asked Questions</span>
          <h2 className={`text-2xl md:text-4xl font-display font-extrabold ${highContrast ? 'text-white' : 'text-slate-900'}`}>
            Governance & Funding FAQs
          </h2>
        </div>

        <div className="space-y-3">
          {COMPLIANCE_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className={`rounded-2xl border overflow-hidden transition-all text-left ${
                  highContrast ? 'bg-black border-white' : 'bg-white border-slate-200/60 shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 flex justify-between items-center text-left gap-4 font-display font-bold text-xs md:text-sm text-slate-800 dark:text-white cursor-pointer hover:bg-slate-50/50"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={16} className="shrink-0 text-gold" /> : <ChevronDown size={16} className="shrink-0 text-slate-400" />}
                </button>
                
                {isOpen && (
                  <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/30 text-xs text-slate-600 leading-relaxed font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 13. CSR INQUIRY FORM (SPLIT SCREEN & MULTI-STEP) */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t-2 border-b-2 border-white' : 'bg-emerald-950/5 border-t border-b border-emerald-950/10'}`} id="partner-inquiry-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Side (5 cols) with backgroundImage */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[300px] flex flex-col justify-end p-8 text-left group">
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800" 
                alt="Corporate collaboration" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10"></div>
              
              <div className="relative z-20 space-y-3 text-white">
                <span className="text-[10px] font-mono tracking-wider bg-gold text-slate-950 px-2 py-0.5 rounded uppercase font-bold">
                  impact alignment
                </span>
                <h3 className="text-xl md:text-2xl font-display font-extrabold text-white">
                  Co-Creating Sustained Value
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  We translate corporate sustainability objectives into concrete, measurable community parameters, fully compliant with Section 135 requirements.
                </p>
              </div>
            </div>

            {/* Right Side Inquiry Form (7 cols) - Multi-Step */}
            <div className={`lg:col-span-7 p-8 rounded-3xl border text-left ${
              highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/60 shadow-lg'
            }`}>
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white">Partner With Us</h3>
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">CSR Collaboration Desk</p>
                </div>
                {/* Step indicator */}
                {!isFormSubmitted && (
                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">
                    Step {formStep} of 3
                  </span>
                )}
              </div>

              {isFormSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-base font-extrabold font-display text-slate-800 dark:text-white">CSR Query Submitted successfully!</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto font-sans leading-relaxed">
                    Thank you. A Raita Mitra senior corporate alliance representative will review your focus parameters and contact you at <strong>{inquiryForm.email}</strong> within 24 working hours.
                  </p>
                  <button 
                    onClick={resetForm}
                    className="px-5 py-2.5 text-xs font-bold bg-emerald-900 text-white hover:bg-emerald-800 rounded-xl transition-colors cursor-pointer"
                  >
                    Submit New Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs font-sans">
                  
                  {formStep === 1 && (
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wide mb-3">Step 1: Organization Details</h4>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase text-slate-400 font-bold block">Organization Name *</label>
                        <input 
                          type="text" 
                          name="orgName"
                          placeholder="e.g. Karnataka Industrial Alloys Ltd."
                          value={inquiryForm.orgName}
                          onChange={handleInquiryChange}
                          className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-emerald-700 ${
                            highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200'
                          }`}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase text-slate-400 font-bold block">CSR Contact Person *</label>
                          <input 
                            type="text" 
                            name="contactPerson"
                            placeholder="e.g. Siddharth Kulkarni"
                            value={inquiryForm.contactPerson}
                            onChange={handleInquiryChange}
                            className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-emerald-700 ${
                              highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200'
                            }`}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase text-slate-400 font-bold block">Designation *</label>
                          <input 
                            type="text" 
                            name="designation"
                            placeholder="e.g. CSR Committee Lead"
                            value={inquiryForm.designation}
                            onChange={handleInquiryChange}
                            className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-emerald-700 ${
                              highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button 
                          type="button"
                          onClick={nextStep}
                          className="px-5 py-2.5 rounded-xl font-bold bg-emerald-900 hover:bg-emerald-800 text-white transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          Continue
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {formStep === 2 && (
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wide mb-3">Step 2: Corporate Contact Channels</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase text-slate-400 font-bold block">Corporate Email Address *</label>
                          <input 
                            type="email" 
                            name="email"
                            placeholder="e.g. csr@alloygroup.in"
                            value={inquiryForm.email}
                            onChange={handleInquiryChange}
                            className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-emerald-700 ${
                              highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200'
                            }`}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase text-slate-400 font-bold block">Mobile Number *</label>
                          <input 
                            type="tel" 
                            name="phone"
                            placeholder="e.g. +91 98450 12345"
                            value={inquiryForm.phone}
                            onChange={handleInquiryChange}
                            className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-emerald-700 ${
                              highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase text-slate-400 font-bold block">Preferred CSR Focus Area</label>
                          <select 
                            name="focusArea"
                            value={inquiryForm.focusArea}
                            onChange={handleInquiryChange}
                            className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-emerald-700 ${
                              highContrast ? 'bg-black border-white text-white font-extrabold' : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <option value="Regenerative Agriculture">Regenerative Agriculture & Watersheds</option>
                            <option value="Women Empowerment">Women Cooperatives & SHGs</option>
                            <option value="STEM Education">Rural STEM Computer Labs</option>
                            <option value="Health Diagnostics">Mobile Health Diagnostic Vans</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase text-slate-400 font-bold block">Estimated Budget Allocation</label>
                          <select 
                            name="budgetRange"
                            value={inquiryForm.budgetRange}
                            onChange={handleInquiryChange}
                            className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-emerald-700 ${
                              highContrast ? 'bg-black border-white text-white font-extrabold' : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <option value="₹10L - ₹25L">₹10 Lakhs - ₹25 Lakhs</option>
                            <option value="₹25L - ₹50L">₹25 Lakhs - ₹50 Lakhs</option>
                            <option value="₹50L - ₹1Cr">₹50 Lakhs - ₹1 Crore</option>
                            <option value="₹1Cr+">Over ₹1 Crore</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-between pt-2">
                        <button 
                          type="button"
                          onClick={prevStep}
                          className="px-4 py-2.5 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          Back
                        </button>
                        <button 
                          type="button"
                          onClick={nextStep}
                          className="px-5 py-2.5 rounded-xl font-bold bg-emerald-900 hover:bg-emerald-800 text-white transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          Continue
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {formStep === 3 && (
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wide mb-3">Step 3: CSR Mandate & message</h4>
                      
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase text-slate-400 font-bold block">CSR Message & Objectives *</label>
                        <textarea 
                          rows={4}
                          name="message"
                          placeholder="Briefly describe your priority geographic taluks or thematic milestones..."
                          value={inquiryForm.message}
                          onChange={handleInquiryChange}
                          className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-emerald-700 ${
                            highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200'
                          }`}
                        ></textarea>
                      </div>

                      <div className="flex justify-between pt-2">
                        <button 
                          type="button"
                          onClick={prevStep}
                          className="px-4 py-2.5 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          Back
                        </button>
                        <button 
                          type="submit"
                          disabled={isFormSubmitting}
                          className="px-6 py-2.5 rounded-xl font-bold bg-emerald-900 hover:bg-emerald-800 text-white transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          {isFormSubmitting ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit CSR Inquiry</span>
                              <Send size={14} />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 14. TESTIMONIALS SECTION (GLASS CARDS) */}
      <section className="py-20 max-w-7xl mx-auto px-4" id="testimonials">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs uppercase font-mono tracking-widest text-gold font-bold">STAKEHOLDER REVIEW</span>
          <h2 className={`text-2xl md:text-4xl font-display font-extrabold ${highContrast ? 'text-white' : 'text-slate-900'}`}>
            Corporate & Governance Testimony
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "Partnering with Raita Mitra has redefined our ESG deliverables. Their auditable quarterly compliance packages, complete with coordinate mapping and verified balance accounts, makes stakeholder reviews extremely seamless.",
              author: "Mrs. Shruthi Deshpande",
              role: "CSR & Sustainability Director",
              org: "Vijayanagar Steel Group",
              avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
            },
            {
              quote: "The on-ground execution of Raita Mitra is exceptionally prompt. When we sanctioned 8 IT Laboratories in Dharwad schools, the hardware integration and training schedules were completed well within target timelines.",
              author: "Dr. Prabhakar Rao",
              role: "Executive Trustee",
              org: "Rao Philanthropic Foundation",
              avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200"
            },
            {
              quote: "As a third-party auditor, validating Raita Mitra’s program ledgers has been highly transparent. Their administrative expense controls are highly strict, guaranteeing near-total flow directly to rural beneficiaries.",
              author: "Mr. Ramesh Hegde, FCA",
              role: "Senior Audit Partner",
              org: "Hegde & Associates Auditors",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
            }
          ].map((card, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-3xl border text-left flex flex-col justify-between backdrop-blur-md relative ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/50 shadow-sm'
              }`}
            >
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed italic font-serif">
                &quot;{card.quote}&quot;
              </p>
              
              <div className="flex gap-3 items-center pt-6 border-t border-slate-100 mt-6">
                <img 
                  src={card.avatar} 
                  alt={card.author} 
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white font-display leading-tight">{card.author}</h4>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{card.role}</p>
                  <p className="text-[10px] text-emerald-700 font-mono font-bold uppercase">{card.org}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 15. PARTNER LOGOS SECTION (INFINITE LOGO SLIDER) */}
      <section className={`py-12 ${highContrast ? 'bg-black border-t border-b border-white' : 'bg-slate-100/50 border-t border-b border-slate-200/40'}`} id="partner-logos">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase mb-6">SUPPORTED BY ESG INSTITUTIONS</p>
          
          {/* Animated continuous slide panel */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {['Tata Trusts', 'Akshaya Patra', 'SELCO Foundation', 'GiveIndia', 'NABARD', 'NITI Aayog'].map((partner, idx) => (
              <span key={idx} className="font-display font-black text-xs md:text-sm text-slate-500 uppercase tracking-widest">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 16. RESOURCE DOWNLOAD CENTRE SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4" id="download-center">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs uppercase font-mono tracking-widest text-gold font-bold">RESOURCE CENTRE</span>
          <h2 className={`text-2xl md:text-4xl font-display font-extrabold ${highContrast ? 'text-white' : 'text-slate-900'}`}>
            Quick Download Center
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Get single-click packages of Raita Mitra’s programmatic dossiers, statutory filings, and compliance credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { title: "CSR Brochure", desc: "Interactive ESG alignments & thematic goals", file: "CSR_Brochure_2026.pdf" },
            { title: "Annual Reports", desc: "All milestone narratives since 2021", file: "RMST_Annual_Reports.zip" },
            { title: "Compliance Pack", desc: "CSR-1, 12A, 80G & NGO Darpan", file: "Statutory_Certificates.zip" },
            { title: "Project Portfolio", desc: "Solar drip & IT Labs technical sheets", file: "Project_Portfolios_2026.pdf" },
            { title: "Impact Reports", desc: "Water metrics & direct family counts", file: "Community_Outcomes.pdf" }
          ].map((res, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all hover:shadow-md hover:-translate-y-1 ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="space-y-2">
                <FileDown size={24} className="text-emerald-700" />
                <h3 className="text-xs md:text-sm font-bold text-slate-800 dark:text-white font-display leading-snug">{res.title}</h3>
                <p className="text-[11px] text-slate-500 leading-normal font-sans">{res.desc}</p>
              </div>
              
              <div className="pt-4 border-t border-slate-100 mt-4">
                <button 
                  onClick={() => triggerDownloadSimulation(res.title, `res_${idx}`)}
                  className="w-full py-1.5 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer flex items-center justify-center gap-1"
                >
                  <Download size={10} />
                  Download Dossier
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
