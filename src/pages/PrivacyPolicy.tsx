import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  UserCheck, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  ArrowRight, 
  Download, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  Database, 
  Cpu, 
  Globe, 
  RefreshCw, 
  FileSpreadsheet, 
  Check, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2, 
  Settings,
  Sliders,
  Send,
  AlertTriangle
} from 'lucide-react';

interface PrivacyPolicyProps {
  setActivePage: (page: string) => void;
  highContrast?: boolean;
}

export default function PrivacyPolicy({ setActivePage, highContrast = false }: PrivacyPolicyProps) {
  // States
  const [activeTocSection, setActiveTocSection] = useState<string>('Introduction');
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});
  const [openRights, setOpenRights] = useState<Record<string, boolean>>({});
  
  // Interactive Simulator States
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true,
    analytics: true,
    functional: false,
    advertising: false
  });
  const [showPreferenceModal, setShowPreferenceModal] = useState<boolean>(false);
  const [showPreferencesSavedAlert, setShowPreferencesSavedAlert] = useState<boolean>(false);

  // Data Request Form States
  const [dataRequestStep, setDataRequestStep] = useState<number>(1);
  const [dataRequestForm, setDataRequestForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    requestType: 'export', // export, delete, correct
    message: ''
  });
  const [isProcessingRequest, setIsProcessingRequest] = useState<boolean>(false);
  const [requestSubmitted, setRequestSubmitted] = useState<boolean>(false);

  // Dynamic date logic
  const [currentDateString, setCurrentDateString] = useState<string>('July 5, 2026');

  useEffect(() => {
    // Set formatted dynamic current date or keep 2026 as benchmark
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    try {
      setCurrentDateString(now.toLocaleDateString('en-US', options));
    } catch (e) {
      // fallback
    }
  }, []);

  const TOC_ITEMS = [
    { id: 'Introduction', label: '1. Introduction' },
    { id: 'Information-We-Collect', label: '2. Information We Collect' },
    { id: 'How-We-Use-Information', label: '3. How We Use Information' },
    { id: 'Cookies-Analytics', label: '4. Cookies & Analytics' },
    { id: 'Data-Sharing', label: '5. Data Sharing & Third Parties' },
    { id: 'Payment-Security', label: '6. Payment Security' },
    { id: 'Data-Retention', label: '7. Data Retention' },
    { id: 'User-Rights', label: '8. Your User Rights' },
    { id: "Children's-Privacy", label: "9. Children's Privacy" },
    { id: 'Third-Party-Services', label: '10. Third-Party Services' },
    { id: 'Security-Measures', label: '11. Security Measures' },
    { id: 'Changes-To-Policy', label: '12. Changes to Policy' },
    { id: 'Contact-Information', label: '13. Contact Information' }
  ];

  const RIGHTS_ITEMS = [
    {
      id: 'access',
      title: 'Right to Access & Portability',
      description: 'You have the right to request a complete copy of all personal, donation, or volunteer records we have stored in our CRM and secure database.'
    },
    {
      id: 'correct',
      title: 'Right to Rectification & Correction',
      description: 'You can request that we immediately correct inaccurate or incomplete tax details (such as your PAN or 80G billing address).'
    },
    {
      id: 'delete',
      title: 'Right to Deletion & Erasure',
      description: 'You can request that we permanently purge your contact details or newsletter subscriptions from our mailing databases, subject to statutory taxation retention laws.'
    },
    {
      id: 'withdraw',
      title: 'Right to Withdraw Consent',
      description: 'Where you have provided explicit consent for newsletter communications or public impact testimonials, you may withdraw it at any time.'
    },
    {
      id: 'export',
      title: 'Right to Request Data Export',
      description: 'You can request an automated machine-readable export of your transactions and volunteer logs for compatibility with external software.'
    }
  ];

  const FAQS = [
    {
      q: "What information does Raita Mitra Social Trust collect?",
      a: "We collect personal identifier details (Full Name, Email Address, Contact Number, City, PAN number for tax exemptions), financial donation logs, volunteer profile logs, and basic technical website usage metrics via Google Analytics and secure tracking tags."
    },
    {
      q: "How is my donation and payment security protected?",
      a: "All online donation transactions are routed directly through PCI-DSS Level 1 compliant payment networks (Razorpay and Stripe). Raita Mitra Social Trust never directly processes, sees, or retains your credit/debit card numbers, CVVs, or Net Banking credentials."
    },
    {
      q: "Can I request complete deletion of my data?",
      a: "Yes. Under international privacy guidelines and India's Digital Personal Data Protection (DPDP) Act, you can request that we purge your personal identification records. Please note that legal financial compliance records (such as 80G tax receipts and MCA CSR utilization sheets) must be retained for statutory periods required by law."
    },
    {
      q: "Do you share my information with third-party advertisers?",
      a: "No. Raita Mitra Social Trust operates on absolute transparency. We never sell, rent, trade, or share your personal identifiers or donation history with third-party advertising brokers or commercial companies."
    },
    {
      q: "How can I contact your Privacy Officer regarding concerns?",
      a: "You can write directly to our designated Privacy Compliance Officer at contact@raitamitrasocialtrust.org, call +91 7676376221, or use the interactive Data Privacy request portal at the bottom of this page."
    }
  ];

  const handleScrollToSection = (id: string) => {
    setActiveTocSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqs(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleRight = (id: string) => {
    setOpenRights(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveCookiePreferences = () => {
    setShowPreferenceModal(false);
    setShowPreferencesSavedAlert(true);
    setTimeout(() => setShowPreferencesSavedAlert(false), 4000);
  };

  const handleDataRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataRequestForm.fullName || !dataRequestForm.email) {
      alert("Please provide both your name and email address to submit a compliance request.");
      return;
    }

    setIsProcessingRequest(true);
    setTimeout(() => {
      setIsProcessingRequest(false);
      setRequestSubmitted(true);
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`w-full overflow-hidden ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* HERO SECTION: Minimal Corporate Banner */}
      <section className="relative min-h-[380px] flex items-center justify-center py-16 bg-slate-900 text-white overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-15">
          <img 
            src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1200" 
            alt="Abstract digital privacy lines" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Soft Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 z-0" />
        {/* SVG Grid Accent */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-400">
            <button onClick={() => setActivePage('home')} className="hover:underline hover:text-white transition-colors">Home</button>
            <ChevronRight size={12} />
            <span className="text-white/70">Privacy Policy</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white"
          >
            Privacy Policy
          </motion.h1>

          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Your privacy and trust are important to us. Learn how we collect, use, protect, and transparently manage your information.
          </p>

          <div className="pt-2 text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
            <span>Last Updated:</span>
            <span className="text-gold font-bold">{currentDateString}</span>
          </div>
        </div>
      </section>

      {/* QUICK SUMMARY SECTION: Privacy At A Glance Glass Cards */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6">
          <div className="text-center md:text-left space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Compliance Overview</span>
            <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900">Privacy At A Glance</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "Secure Data Handling", desc: "Enterprise-grade SSL/TLS transport-layer encryption, safe Cloud hosting, and strictly limited database personnel access.", color: "text-emerald-600 bg-emerald-50" },
              { icon: Lock, title: "Information Protection", desc: "No direct card retention. Your transaction credentials are routed through PCI-DSS Level 1 certified hosts (Razorpay & Stripe).", color: "text-rose-600 bg-rose-50" },
              { icon: Eye, title: "Transparency First", desc: "Zero tracking trackers or broker cookies. We never rent, trade, or share your contact identities for commercial ads.", color: "text-indigo-600 bg-indigo-50" },
              { icon: UserCheck, title: "Your User Rights", desc: "Full power to access, export, correct, or permanently erase your digital footprint under India's DPDP regulations.", color: "text-amber-600 bg-amber-50" }
            ].map((card, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 flex flex-col items-start gap-3">
                <div className={`p-2.5 rounded-xl ${card.color}`}>
                  <card.icon size={20} />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">{card.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STICKY MAIN CONTENT AND SIDEBAR SECTION */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Table of Contents Sticky Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold border-b pb-2">Contents</h4>
                <nav className="flex flex-col gap-1.5" aria-label="Table of Contents">
                  {TOC_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleScrollToSection(item.id)}
                      className={`text-left text-xs py-2 px-3 rounded-lg transition-all font-sans cursor-pointer ${
                        activeTocSection === item.id
                          ? 'bg-emerald-50 text-emerald-800 font-bold border-l-4 border-emerald-600 pl-2'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Quick Consent Pref Widget shortcut in sidebar */}
              <div className="bg-emerald-950 text-white rounded-2xl p-5 border border-emerald-800 space-y-3 shadow-md">
                <Sliders size={20} className="text-gold" />
                <h4 className="text-xs font-bold font-display tracking-wide">Manage Consent</h4>
                <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                  Customize which optional tracking cookies you allow during your browsing session.
                </p>
                <button
                  onClick={() => setShowPreferenceModal(true)}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Adjust Preferences
                </button>
              </div>
            </div>
          </div>

          {/* Core Structured Privacy Sections */}
          <div className="lg:col-span-3 space-y-16">
            
            {/* 1. INTRODUCTION */}
            <article id="Introduction" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <FileText size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">1. Introduction</h2>
              </div>
              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  Welcome to <strong>Raita Mitra Social Trust (R)</strong> ("we", "us", "our", "Trust"), registered under public charity guidelines in Hubballi, Karnataka, India. We operate high-impact community programs in sustainable agriculture, climate action, rural computer skill literacy, and social security.
                </p>
                <p>
                  As an organization supported by institutional CSR grants, private philanthropists, and passionate volunteers, we hold ourselves to the highest benchmarks of transparency and ethics. This Privacy Policy outlines exactly how we handle personal identifiers, financial donation metadata, and cookies in absolute alignment with India’s <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>, and international GDPR principles.
                </p>
                <p>
                  By interacting with our platform, making financial contributions, or submitting applications for volunteering or careers, you acknowledge and agree to the procedures outlined in this policy.
                </p>
              </div>
            </article>

            {/* 2. INFORMATION WE COLLECT */}
            <article id="Information-We-Collect" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Database size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">2. Information We Collect</h2>
              </div>
              
              <div className="text-xs md:text-sm text-slate-600 leading-relaxed mb-4">
                We categorize all information we collect into discrete structured brackets. We only gather what is strictly required to process requests or comply with legal audits.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Personal Identifiers", list: ["Full legal name", "Email address", "Primary contact phone", "Current city & state"] },
                  { title: "Donation Audit Details", list: ["Permanent Account Number (PAN) for 80G tax claims", "Billing address", "Transaction IDs (no raw card data)"] },
                  { title: "Volunteer & Career Profiles", list: ["Educational qualifications", "Employment history", "LinkedIn handles", "Resume uploads"] },
                  { title: "Technical Usage Metrics", list: ["Masked IP addresses", "Device & browser models", "Session durations", "Page interaction history"] }
                ].map((cat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                    <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider font-mono">{cat.title}</h4>
                    <ul className="space-y-1.5">
                      {cat.list.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check size={13} className="text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>

            {/* 3. HOW WE USE INFORMATION */}
            <article id="How-We-Use-Information" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Cpu size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">3. How We Use Information</h2>
              </div>

              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Raita Mitra Social Trust enforces a strict "No-Abuse" policy. We utilize your collected credentials exclusively for social impact operations, statutory compliance, and transparent auditing:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: "Program Deliveries", desc: "Coordinating rural mentorship schedules, skill center admissions, and field audits." },
                  { title: "Donation Exemption Processing", desc: "Generating official, MCA-compliant 80G receipts and filing quarterly statements with Income Tax authorities." },
                  { title: "Volunteer Placement", desc: "Matching skillsets with appropriate field initiatives and dispatching coordination emails." },
                  { title: "Newsletter Communications", desc: "Sending monthly impact progress digests, audio podcasts, and CSR audit disclosures." },
                  { title: "Platform Optimization", desc: "Resolving software errors, diagnosing server latency, and improving mobile layout responsiveness." },
                  { title: "Legal & Audit Defense", desc: "Retaining documentation strictly for standard annual independent audits." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-100 space-y-1 bg-white/50">
                    <h4 className="font-bold text-slate-950 text-xs font-display">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* 4. COOKIES & ANALYTICS */}
            <article id="Cookies-Analytics" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Globe size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">4. Cookies &amp; Analytics</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  We employ cookie files and tracking tags strictly to deliver functional platform elements and compile anonymized usage statistics. We never configure trackers designed for behavioral advertisement targeting.
                </p>
                <p>
                  Our primary analytical tools are listed below. You retain absolute control over whether optional cookies are active:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "Google Analytics", type: "Analytical (Optional)", desc: "Tracks page interaction speeds and regional traffic patterns using masked, non-identifying IP records." },
                  { title: "Microsoft Clarity", type: "Usability (Optional)", desc: "Produces scroll-depth heatmaps to help our design team improve WCAG visual readability and interface flows." },
                  { title: "Cookie Preferences", type: "Essential (Required)", desc: "Stores your personal preference settings so our system remembers which optional scripts you blocked." }
                ].map((tool, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 font-display">{tool.title}</span>
                      <span className="text-[9px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full">{tool.type}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{tool.desc}</p>
                  </div>
                ))}
              </div>

              {/* In-page interactive preference simulator */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 border border-slate-800">
                <div className="flex items-center gap-2">
                  <Sliders size={18} className="text-gold" />
                  <h4 className="text-xs font-bold font-display uppercase tracking-wider">Live Preference Panel</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Toggle permissions instantly. Your settings will persist in local browser metadata.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    { key: "necessary", label: "Essential Security Cookies", desc: "Required for basic layout states and donor forms. Cannot be disabled.", disabled: true },
                    { key: "analytics", label: "Performance & Analytics Cookies", desc: "Anonymized Google Analytics tracking to audit system response metrics.", disabled: false },
                    { key: "functional", label: "Functional Accessibility Cookies", desc: "Persists your custom Font Scaling and High Contrast toggle preferences.", disabled: false }
                  ].map((item) => (
                    <div key={item.key} className="flex items-start justify-between gap-4 p-2 bg-white/5 rounded-lg border border-white/5">
                      <div>
                        <span className="text-xs font-semibold block">{item.label}</span>
                        <span className="text-[10px] text-slate-400 block">{item.desc}</span>
                      </div>
                      <input 
                        type="checkbox"
                        disabled={item.disabled}
                        checked={(cookieSettings as any)[item.key]}
                        onChange={(e) => {
                          if (!item.disabled) {
                            setCookieSettings(prev => ({ ...prev, [item.key]: e.target.checked }));
                          }
                        }}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-white/20 mt-1 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSaveCookiePreferences}
                    className="px-4 py-1.5 bg-gold hover:bg-yellow-500 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </article>

            {/* 5. DATA SHARING & THIRD PARTIES */}
            <article id="Data-Sharing" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <FileSpreadsheet size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">5. Data Sharing &amp; Third Parties</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  We maintain zero commercial affiliation. Your personal data is never shared with third parties for marketing, advertising, or profiling purposes.
                </p>
                <p>
                  Data sharing occurs exclusively with trusted cloud platforms required to fulfill your requests (such as processing donations or sending newsletters):
                </p>
              </div>

              {/* Visual Flow Diagram */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block text-center">Standard Compliance Data Pipeline</span>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
                  <div className="p-3 bg-white border rounded-xl text-center shadow-xs w-full max-w-[150px]">
                    <span className="text-xs font-bold text-slate-800 block">User Action</span>
                    <span className="text-[9px] text-slate-400 block">Donation / Application</span>
                  </div>

                  <div className="text-emerald-500 shrink-0 rotate-90 md:rotate-0">
                    <ChevronRight size={18} />
                  </div>

                  <div className="p-3 bg-white border rounded-xl text-center shadow-xs w-full max-w-[150px] border-emerald-200">
                    <span className="text-xs font-bold text-slate-800 block">SSL Gateway</span>
                    <span className="text-[9px] text-slate-400 block">Encryption Protection</span>
                  </div>

                  <div className="text-emerald-500 shrink-0 rotate-90 md:rotate-0">
                    <ChevronRight size={18} />
                  </div>

                  <div className="p-3 bg-white border rounded-xl text-center shadow-xs w-full max-w-[150px] border-emerald-200">
                    <span className="text-xs font-bold text-slate-800 block">API Integrators</span>
                    <span className="text-[9px] text-slate-400 block">Razorpay / CRM / Resend</span>
                  </div>

                  <div className="text-emerald-500 shrink-0 rotate-90 md:rotate-0">
                    <ChevronRight size={18} />
                  </div>

                  <div className="p-3 bg-slate-900 text-white rounded-xl text-center shadow-xs w-full max-w-[150px]">
                    <span className="text-xs font-bold text-emerald-400 block">Compliance Audit</span>
                    <span className="text-[9px] text-slate-300 block">80G Form / PDF Report</span>
                  </div>
                </div>
              </div>
            </article>

            {/* 6. PAYMENT SECURITY */}
            <article id="Payment-Security" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Lock size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">6. Payment Security</h2>
              </div>
              
              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  To secure your financial support, our donation portal is fully integrated with India's leading PCI-DSS Level 1 compliant gateway provider networks: <strong>Razorpay Software Pvt Ltd</strong> and <strong>Stripe Inc</strong>.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-emerald-600 flex gap-4 my-2">
                  <ShieldCheck size={24} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono">Card Protection Standards</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Our system never directly processes, captures, stores, or sees your bank passwords, credit/debit card numbers, CVVs, or Net Banking credentials. All data is securely wrapped inside end-to-end tokenized APIs processed on remote payment servers.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* 7. DATA RETENTION */}
            <article id="Data-Retention" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <RefreshCw size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">7. Data Retention</h2>
              </div>
              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  We retain your personal identification and profile datasets only for the minimum duration necessary to satisfy the objectives declared in Section 3, or to comply with statutory legal requirements.
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li><strong>Donation transaction metadata:</strong> Retained for a minimum of 8 years to comply with India's Income Tax Act regarding public charitable trusts.</li>
                  <li><strong>Volunteer profiles &amp; Resumes:</strong> Retained for up to 2 years from submission for reference when regional coordinator or project roles become open.</li>
                  <li><strong>Cookies:</strong> Analytics cookie files automatically expire after 24 months.</li>
                </ul>
              </div>
            </article>

            {/* 8. YOUR USER RIGHTS */}
            <article id="User-Rights" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <UserCheck size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">8. Your User Rights</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 leading-relaxed mb-4">
                We believe you should have complete control over your digital footprint. Under India's Digital Personal Data Protection (DPDP) Act and global GDPR benchmarks, you are entitled to exercise the following statutory rights:
              </div>

              <div className="space-y-2.5">
                {RIGHTS_ITEMS.map((item) => (
                  <div key={item.id} className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50">
                    <button
                      onClick={() => toggleRight(item.id)}
                      className="w-full text-left px-4 py-3 bg-white flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-xs font-bold text-slate-800">{item.title}</span>
                      {openRights[item.id] ? <ChevronDown size={14} className="text-slate-500" /> : <ChevronRight size={14} className="text-slate-500" />}
                    </button>
                    {openRights[item.id] && (
                      <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                        {item.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </article>

            {/* 9. CHILDREN'S PRIVACY */}
            <article id="Children's-Privacy" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <ShieldAlert size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">9. Children's Privacy</h2>
              </div>
              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  Raita Mitra Social Trust administers computational literacy and digital skills educational courses for school-going village children. However, our online donation, career application, and volunteer portals are designed strictly for individuals aged 18 and older.
                </p>
                <p>
                  We do not knowingly collect personal identity details directly from minors without verifiable parental or school authority consent. If you are a parent or legal guardian and believe your ward has registered on our website, please email us immediately so we can remove the data from our CRM databases.
                </p>
              </div>
            </article>

            {/* 10. THIRD-PARTY SERVICES */}
            <article id="Third-Party-Services" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <ExternalLink size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">10. Third-Party Services</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 leading-relaxed">
                We leverage carefully chosen, secure enterprise platforms to manage donor relations, website hosting, media files, and communication APIs. These services act as data processors bound by strictly legal non-disclosure agreements:
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Google Analytics", role: "Audience statistics" },
                  { name: "Cloudinary", role: "Media hosting" },
                  { name: "Resend", role: "Newsletter deliveries" },
                  { name: "Razorpay", role: "Domestic payment portal" },
                  { name: "Stripe", role: "International donations" },
                  { name: "Mailchimp", role: "Donor newsletter campaigns" },
                  { name: "Supabase", role: "Secure relational storage" }
                ].map((serv, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-100 bg-white text-center shadow-2xs space-y-1">
                    <span className="font-bold text-xs text-slate-900 block">{serv.name}</span>
                    <span className="text-[9px] text-slate-400 block uppercase font-mono tracking-wider">{serv.role}</span>
                  </div>
                ))}
              </div>
            </article>

            {/* 11. SECURITY MEASURES */}
            <article id="Security-Measures" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <ShieldCheck size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">11. Security Measures</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  The Trust deploys comprehensive technical, physical, and administrative protocols designed to defend against data breaches, unauthorized file disclosures, and data loss.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Transport-Layer Cryptography", desc: "All user entries and financial forms are wrapped in 256-bit SSL/TLS transport-layer encryption during data routing." },
                  { title: "Access Authorization Controls", desc: "Access to our database servers and donor CRM dashboards is restricted to validated IT administrators under multi-factor credentials." },
                  { title: "Continuous Monitoring & Auditing", desc: "Our hosting platforms undergo quarterly patch sweeps and software updates to preempt security risks." },
                  { title: "Secure Server Infrastructure", desc: "All assets are hosted within premium regional cloud centers equipped with physical guard controls and network firewalls." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-100 space-y-1 bg-slate-50">
                    <h4 className="font-bold text-slate-900 text-xs font-display">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* 12. CHANGES TO POLICY */}
            <article id="Changes-To-Policy" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Sliders size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">12. Changes to Policy</h2>
              </div>
              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  We reserve the right to modify or amend this Privacy Policy document at any time to align with legislative shifts under India’s DPDP guidelines, tax legislation changes, or technical platform refactoring.
                </p>
                <p>
                  When changes are introduced, we will update the dynamic <strong>Last Updated Date</strong> banner at the top of this page. We encourage you to check back periodically to remain informed about our privacy safeguards.
                </p>
              </div>
            </article>

            {/* 13. CONTACT INFORMATION */}
            <article id="Contact-Information" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Mail size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">13. Contact Information</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 leading-relaxed">
                For questions, complaints, or verification requests concerning our data policies, please get in touch with our Compliance Team:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-100 flex gap-3 items-start">
                  <Mail className="text-emerald-700 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">Email Address</span>
                    <a href="mailto:contact@raitamitrasocialtrust.org" className="text-xs text-slate-800 font-semibold hover:underline">contact@raitamitrasocialtrust.org</a>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 flex gap-3 items-start">
                  <Phone className="text-emerald-700 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">Helpline Number</span>
                    <a href="tel:+917676376221" className="text-xs text-slate-800 font-semibold hover:underline">+91 76763 76221</a>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 flex gap-3 items-start">
                  <MapPin className="text-emerald-700 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">Headquarters Office</span>
                    <span className="text-xs text-slate-800 leading-tight block">#37, 1st Floor, Pride Icon, Gokul Road, Hubballi - 580030</span>
                  </div>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* COMPLIANCE WORKFLOW & DATA EXPORT PORTAL */}
      <section className="bg-slate-900 text-white py-16 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Description half */}
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-widest block">Interactive Service Panel</span>
              <h3 className="text-2xl md:text-3xl font-display font-bold">Verify or Export Your Personal Records</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our database compliance engine is fully open-source. Under India's DPDP regulations, you can request an automated machine-readable export of your transactions, volunteer history, or request a complete database erasure.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex gap-3 items-start text-xs text-slate-300">
                  <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
                  <span><strong>100% Secure Gateway:</strong> All entries are routed strictly to our administrative legal desk.</span>
                </div>
                <div className="flex gap-3 items-start text-xs text-slate-300">
                  <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
                  <span><strong>7-Day Compliance Window:</strong> Inquiries are processed and verified within 7 business days under legal audit.</span>
                </div>
                <div className="flex gap-3 items-start text-xs text-slate-300">
                  <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
                  <span><strong>80G Receipts Safeguard:</strong> Donation audit documents are securely locked against accidental deletes.</span>
                </div>
              </div>
            </div>

            {/* Form half */}
            <div id="data-portal" className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-3xl space-y-4 backdrop-blur-md">
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Database size={15} />
                <span>Regulatory Data request Form</span>
              </h4>

              {requestSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="font-bold text-sm text-white">Compliance Request Filed Successfully</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Our compliance department has logged your request for <strong>{dataRequestForm.requestType === 'export' ? 'Data Export' : dataRequestForm.requestType === 'delete' ? 'Complete Erasure' : 'Correction'}</strong>. A secure validation email will be dispatched to <strong>{dataRequestForm.email}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setRequestSubmitted(false);
                      setDataRequestForm({ fullName: '', email: '', phone: '', requestType: 'export', message: '' });
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Submit New Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDataRequestSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-300 uppercase tracking-wider mb-1">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={dataRequestForm.fullName}
                        onChange={(e) => setDataRequestForm(prev => ({ ...prev, fullName: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/5 text-white rounded-lg border border-white/10 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                        placeholder="e.g. Ramesh Kumar"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-300 uppercase tracking-wider mb-1">Email Address *</label>
                      <input 
                        type="email" 
                        required
                        value={dataRequestForm.email}
                        onChange={(e) => setDataRequestForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/5 text-white rounded-lg border border-white/10 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                        placeholder="e.g. ramesh@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-300 uppercase tracking-wider mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        value={dataRequestForm.phone}
                        onChange={(e) => setDataRequestForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/5 text-white rounded-lg border border-white/10 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                        placeholder="e.g. +91 98450 12345"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-300 uppercase tracking-wider mb-1">Request Action Type</label>
                      <select 
                        value={dataRequestForm.requestType}
                        onChange={(e) => setDataRequestForm(prev => ({ ...prev, requestType: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-800 text-white rounded-lg border border-white/10 text-xs focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
                      >
                        <option value="export">Download/Export Personal Records</option>
                        <option value="delete">Erase My Personal History</option>
                        <option value="correct">Rectify PAN/Billing Details</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-300 uppercase tracking-wider mb-1">Request Notes or Verification Details</label>
                    <textarea 
                      rows={2}
                      value={dataRequestForm.message}
                      onChange={(e) => setDataRequestForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-3 py-2 bg-white/5 text-white rounded-lg border border-white/10 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="Please mention your approximate donation dates or PAN details if requesting corrections..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessingRequest}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase rounded-xl tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isProcessingRequest ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Verifying Credentials...</span>
                      </>
                    ) : (
                      <>
                        <Send size={13} />
                        <span>Submit Statutory Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 py-20 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Privacy Support</span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 font-bold">Privacy FAQ</h3>
          <p className="text-xs md:text-sm text-slate-500">
            Answers to common compliance and security questions from our donors and supporters.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xs">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-display font-semibold text-sm text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaqs[idx] ? <ChevronDown size={16} className="text-emerald-700 shrink-0" /> : <ChevronRight size={16} className="text-slate-400 shrink-0" />}
              </button>
              {openFaqs[idx] && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* DOWNLOAD POLICY & PRINT SECTION */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
            <Download size={22} />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-bold text-slate-900 text-lg">Save Offline Copy</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Download our complete official Privacy Policy handbook in machine-readable PDF or send it directly to your network printer.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="mailto:contact@raitamitrasocialtrust.org?subject=Requesting Official Privacy Policy PDF Copy"
              className="px-4 py-2.5 bg-slate-900 hover:bg-emerald-600 hover:text-white text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FileText size={14} />
              <span>Request PDF Copy</span>
            </a>
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Printer size={14} />
              <span>Print Policy Version</span>
            </button>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative min-h-[300px] flex items-center justify-center py-16 bg-emerald-950 text-white overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-15">
          <img 
            src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=1200" 
            alt="Abstract security background grid" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 to-slate-950 z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-display font-bold">Committed To Transparency &amp; Trust</h3>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Protecting your privacy while creating sustainable, digital-first agricultural and livelihoods impact across rural Karnataka.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => setActivePage('contact')}
              className="px-5 py-3 bg-gold hover:bg-yellow-500 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Contact Us Directly
            </button>
            <button
              onClick={() => setActivePage('compliance')}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              View Compliance Audit Reports
            </button>
          </div>
        </div>
      </section>

      {/* Preference Settings Overlay Modal */}
      <AnimatePresence>
        {showPreferenceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-slate-800 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative space-y-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Sliders size={20} />
                  <h4 className="font-display font-bold text-lg">Detailed Cookie Consent Panel</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We use cookies strictly to track device accessibility dimensions and compile anonymized telemetry. Adjust your settings below:
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'necessary', label: 'Strictly Necessary (Required)', desc: 'Required to process online donation payments, keep layout scaling parameters steady, and authorize SSL keys.' },
                  { key: 'analytics', label: 'Performance Analytics (Optional)', desc: 'Allows Google Analytics to log anonymized navigation duration for performance diagnostics.' },
                  { key: 'functional', label: 'Functional Preferences (Optional)', desc: 'Saves your text font scale settings and persistent high-contrast parameters.' }
                ].map((cookie) => (
                  <div key={cookie.key} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-slate-900 block">{cookie.label}</span>
                      <p className="text-[10px] text-slate-500 leading-tight">{cookie.desc}</p>
                    </div>
                    <input 
                      type="checkbox"
                      disabled={cookie.key === 'necessary'}
                      checked={(cookieSettings as any)[cookie.key]}
                      onChange={(e) => setCookieSettings(prev => ({ ...prev, [cookie.key]: e.target.checked }))}
                      className="w-4 h-4 text-emerald-600 bg-white rounded border-slate-300 focus:ring-emerald-500 mt-1 cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t flex justify-end gap-2.5">
                <button
                  onClick={() => setShowPreferenceModal(false)}
                  className="px-4 py-2 hover:bg-slate-100 text-xs font-semibold text-slate-600 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCookiePreferences}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Confirm Choices
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Consent preferences saved alert overlay */}
      <AnimatePresence>
        {showPreferencesSavedAlert && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 p-4 bg-emerald-900 text-white rounded-2xl shadow-xl border border-emerald-700 flex items-center gap-3"
          >
            <CheckCircle2 size={18} className="text-gold" />
            <div className="text-xs">
              <span className="font-bold block">Cookie Preferences Saved</span>
              <span className="text-emerald-100/85">Persisted successfully in browser cookie parameters.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
