import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scale, 
  ShieldCheck, 
  Lock, 
  BadgeCheck, 
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
  Building2, 
  Check, 
  ExternalLink, 
  FileCheck,
  UserCheck,
  Shield,
  Handshake,
  AlertTriangle,
  BookOpen,
  Calendar,
  Sliders,
  X
} from 'lucide-react';

interface TermsConditionsProps {
  setActivePage: (page: string) => void;
  highContrast?: boolean;
}

export default function TermsConditions({ setActivePage, highContrast = false }: TermsConditionsProps) {
  // States
  const [activeTocSection, setActiveTocSection] = useState<string>('Acceptance-Of-Terms');
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});
  const [openVolunteerItems, setOpenVolunteerItems] = useState<Record<string, boolean>>({});
  const [openLiabilityItems, setOpenLiabilityItems] = useState<Record<string, boolean>>({});

  // Interactive Simulator / Legal acceptance Tracker
  const [acceptedVersion, setAcceptedVersion] = useState<boolean>(false);
  const [showAcceptanceNotice, setShowAcceptanceNotice] = useState<boolean>(false);

  // Dynamic Date
  const [currentDateString, setCurrentDateString] = useState<string>('July 5, 2026');

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    try {
      setCurrentDateString(now.toLocaleDateString('en-US', options));
    } catch (e) {
      // fallback
    }
  }, []);

  const TOC_ITEMS = [
    { id: 'Acceptance-Of-Terms', label: '1. Acceptance of Terms' },
    { id: 'Use-Of-Website', label: '2. Use of Website' },
    { id: 'Intellectual-Property', label: '3. Intellectual Property' },
    { id: 'Donations-Payments', label: '4. Donations & Payments' },
    { id: 'Volunteer-Participation', label: '5. Volunteer Conduct' },
    { id: 'Third-Party-Services', label: '6. Third-Party Services' },
    { id: 'Disclaimer', label: '7. Disclaimer of Warranties' },
    { id: 'Limitation-Of-Liability', label: '8. Limitation of Liability' },
    { id: 'Termination', label: '9. Terms Termination' },
    { id: 'Indemnification', label: '10. Indemnification' },
    { id: 'Changes-To-Terms', label: '11. Changes to Terms' },
    { id: 'Governing-Law', label: '12. Governing Law' },
    { id: 'Contact-Information', label: '13. Contact Information' }
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

  const handlePrint = () => {
    window.print();
  };

  const handleAcceptTerms = () => {
    setAcceptedVersion(true);
    setShowAcceptanceNotice(true);
    setTimeout(() => {
      setShowAcceptanceNotice(false);
    }, 4500);
  };

  return (
    <div className={`w-full overflow-hidden ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* HERO SECTION: Minimal Corporate Banner */}
      <section className="relative min-h-[380px] flex items-center justify-center py-16 bg-slate-900 text-white overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-15">
          <img 
            src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200" 
            alt="Pristine abstract corporate courtroom and governance lines" 
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
            <span className="text-white/70">Terms &amp; Conditions</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white"
          >
            Terms &amp; Conditions
          </motion.h1>

          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Please review these terms governing the use of the Raita Mitra Social Trust website, services, donations, and resources.
          </p>

          <div className="pt-2 text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
            <span>Last Updated:</span>
            <span className="text-gold font-bold">{currentDateString}</span>
          </div>
        </div>
      </section>

      {/* QUICK OVERVIEW SECTION: Terms At A Glance */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6">
          <div className="text-center md:text-left space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Policy Foundations</span>
            <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900">Terms At A Glance</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Scale, title: "Fair Usage Rules", desc: "Use resources for lawful community, research, and non-commercial educational purposes.", color: "text-emerald-600 bg-emerald-50" },
              { icon: ShieldCheck, title: "User Protection", desc: "No malicious attempts to bypass system layers, scrape private databases, or post hostile comments.", color: "text-rose-600 bg-rose-50" },
              { icon: Lock, title: "Security Protocols", desc: "Your monetary logs are fully protected via standardized SSL/TLS encryptions and tokenized gateways.", color: "text-indigo-600 bg-indigo-50" },
              { icon: BadgeCheck, title: "Pure Transparency", desc: "Statutory audits, clear tax exemptions, and straightforward compliance guidelines for all stakeholders.", color: "text-amber-600 bg-amber-50" }
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

              {/* Printable Option shortcut */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-3 shadow-md">
                <Printer size={20} className="text-gold" />
                <h4 className="text-xs font-bold font-display tracking-wide">Archival Copy</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Download or print a hard-copy version of these policies for corporate legal audits.
                </p>
                <button
                  onClick={handlePrint}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download size={12} />
                  <span>Download Terms PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Core Structured Terms Sections */}
          <div className="lg:col-span-3 space-y-16">
            
            {/* 1. ACCEPTANCE OF TERMS */}
            <article id="Acceptance-Of-Terms" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <FileCheck size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">1. Acceptance of Terms</h2>
              </div>
              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and <strong>Raita Mitra Social Trust (R)</strong> ("we", "us", "our", "Trust"), concerning your access to and use of our web application, tools, resources, and public programs.
                </p>
                <p>
                  By accessing, browsing, volunteering for, or donating to Raita Mitra Social Trust, you explicitly acknowledge that you have read, understood, and agreed to be bound by all of these Terms and Conditions.
                </p>
                <p className="p-3 bg-rose-50 border-l-4 border-rose-500 text-xs text-rose-950 font-medium">
                  If you do not agree with all of these terms, you are strictly prohibited from utilizing our website, making donations, downloading compliance documents, or participating as a registered volunteer/fellow.
                </p>
              </div>
            </article>

            {/* 2. USE OF WEBSITE */}
            <article id="Use-Of-Website" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <UserCheck size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">2. Use of Website</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 leading-relaxed mb-2">
                We grant you a non-transferable, revocable, and limited privilege to navigate our web layouts, download specific reports, and use program indicators. You agree to follow the lawful boundaries below:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Lawful Usage", desc: "You agree to utilize this portal only for lawful philanthropic, academic, agrarian, and non-commercial educational purposes." },
                  { title: "No Unauthorized Access", desc: "You are forbidden from deploying scraping scripts, DDoS payloads, SQL injection matrices, or attempting database entry." },
                  { title: "Respect For Intellectual Property", desc: "You must not reproduce, sell, or commercially re-license Raita Mitra research reports without written approval." },
                  { title: "Responsible Communication", desc: "All volunteer entries, program reviews, and career form fields must be clear, honest, and entirely free of malicious materials." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-xs text-slate-800 block font-display">{item.title}</span>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* 3. INTELLECTUAL PROPERTY */}
            <article id="Intellectual-Property" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Database size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">3. Intellectual Property</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  Unless otherwise indicated, all source code, graphic designs, vectors, audio clips, interactive calculations, research papers, soil studies, and legal audit brochures on our platform are the intellectual property of <strong>Raita Mitra Social Trust</strong>.
                </p>
                <p>
                  This content is protected by trademark, copyright, and trade dress regulations within India and internationally.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { label: "Logos & Brand", desc: "Registered Trust identity" },
                  { label: "On-field Images", desc: "Photo documentary" },
                  { label: "Agrarian Reports", desc: "Soil & water audits" },
                  { label: "Scientific Articles", desc: "Climate-resilience data" },
                  { label: "Skill Vlogs", desc: "Educational tutorials" }
                ].map((ip, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center">
                    <span className="text-xs font-bold text-slate-900 block font-display leading-tight mb-1">{ip.label}</span>
                    <span className="text-[10px] text-slate-400 block leading-tight">{ip.desc}</span>
                  </div>
                ))}
              </div>
            </article>

            {/* 4. DONATIONS & PAYMENTS */}
            <article id="Donations-Payments" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Lock size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">4. Donations &amp; Payments</h2>
              </div>

              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                We accept monetary support from corporate institutions (MCA CSR criteria) and individual philanthropists. All financial flows are administered under standard compliance protocols:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "PCI-DSS Cryptography", desc: "Donations are processed on servers operated by Razorpay or Stripe. We do not process, log, or see card numbers." },
                  { title: "80G Tax Exemptions", desc: "Eligible Indian donors receive immediate MCA tax exemption receipts, provided a valid PAN card is shared." },
                  { title: "No-Refund Principle", desc: "As donations are immediately assigned to on-ground farming and laboratory programs, donations are non-refundable except under rare duplicate transactions." },
                  { title: "Auditable Allocation", desc: "We publish transparent, independent quarterly charts mapping every rupee to rural outputs." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-white shadow-3xs flex gap-3">
                    <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{item.title}</span>
                      <span className="text-[11px] text-slate-500 leading-relaxed block">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* 5. VOLUNTEER PARTICIPATION */}
            <article id="Volunteer-Participation" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Handshake size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">5. Volunteer Conduct &amp; Safety</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 leading-relaxed mb-4">
                Our volunteers and academic fellows directly represent our values in rural communities. You agree to follow our code of conduct:
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'conduct', title: 'Code of Conduct', desc: "Maintain utmost respect, ethical behavior, and professionalism when interacting with marginal households and village authorities." },
                  { id: 'safety', title: 'Community Safety & Integrity', desc: "We maintain zero-tolerance rules regarding harassment, political advocacy on-field, or commercial product promotion." },
                  { id: 'confidentiality', title: 'Confidentiality of Family Records', desc: "Socio-economic indicators and health details collected from participating rural families must remain completely confidential." }
                ].map((item) => (
                  <div key={item.id} className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50">
                    <button
                      onClick={() => setOpenVolunteerItems(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                      className="w-full text-left px-4 py-3 bg-white flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-xs font-bold text-slate-800">{item.title}</span>
                      {openVolunteerItems[item.id] ? <ChevronDown size={14} className="text-slate-500" /> : <ChevronRight size={14} className="text-slate-500" />}
                    </button>
                    {openVolunteerItems[item.id] && (
                      <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                        {item.desc}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </article>

            {/* 6. THIRD-PARTY SERVICES */}
            <article id="Third-Party-Services" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <ExternalLink size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">6. Third-Party Services</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 leading-relaxed">
                We partner with high-quality global cloud providers to maintain our infrastructure. These platforms act as service processors and adhere to standard terms of use:
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {["Google Analytics", "Razorpay", "Stripe", "Cloudinary", "Mailchimp", "Supabase"].map((p, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-100 bg-white text-center shadow-3xs">
                    <span className="font-bold text-xs text-slate-900 block font-display leading-tight">{p}</span>
                    <span className="text-[10px] text-slate-400 block mt-1 uppercase font-mono tracking-widest text-[9px]">API Provider</span>
                  </div>
                ))}
              </div>
            </article>

            {/* 7. DISCLAIMER OF WARRANTIES */}
            <article id="Disclaimer" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <AlertTriangle size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">7. Disclaimer of Warranties</h2>
              </div>
              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  Our services, agricultural calculators, and downloadable materials are provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis without warranties of any kind, whether express or implied.
                </p>
                <p>
                  While Raita Mitra takes extensive steps to verify our reports, we do not guarantee that soil health parameters, rain-fed recommendations, or crop calculations will completely prevent agricultural crop loss under adverse seasonal conditions.
                </p>
              </div>
            </article>

            {/* 8. LIMITATION OF LIABILITY */}
            <article id="Limitation-Of-Liability" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Scale size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">8. Limitation of Liability</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 leading-relaxed mb-4">
                To the maximum extent permitted by applicable Indian regulations, Raita Mitra Social Trust (R) shall not be held liable for specific damage brackets:
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'financial', title: 'Financial & Crop Loss Limitations', desc: "We are not liable for crop outcome variances or weather-induced losses resulting from implementing our resource recommendations." },
                  { id: 'server', title: 'Server Downtime & Technical Latency', desc: "We are not responsible for transient delays in donation gateways, failed SMS receipt transmissions, or cloud hosting outages." }
                ].map((item) => (
                  <div key={item.id} className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50">
                    <button
                      onClick={() => setOpenLiabilityItems(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                      className="w-full text-left px-4 py-3 bg-white flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-xs font-bold text-slate-800">{item.title}</span>
                      {openLiabilityItems[item.id] ? <ChevronDown size={14} className="text-slate-500" /> : <ChevronRight size={14} className="text-slate-500" />}
                    </button>
                    {openLiabilityItems[item.id] && (
                      <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                        {item.desc}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </article>

            {/* 9. TERMS TERMINATION */}
            <article id="Termination" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Sliders size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">9. Terms Termination</h2>
              </div>
              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  These Terms and Conditions remain active until terminated by either you or the Trust.
                </p>
                <p>
                  We reserve the right, without prior warning or legal liability, to block website navigation access or cancel registered volunteer roles for individuals who violate these policies.
                </p>
              </div>
            </article>

            {/* 10. INDEMNIFICATION */}
            <article id="Indemnification" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Shield size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">10. Indemnification</h2>
              </div>
              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  You agree to defend, indemnify, and hold harmless Raita Mitra Social Trust, our trustees, coordinators, research fellows, and partner farmers from and against any claims, damages, liabilities, or losses arising out of your violation of these terms or misuse of our materials.
                </p>
              </div>
            </article>

            {/* 11. CHANGES TO TERMS */}
            <article id="Changes-To-Terms" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Sliders size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">11. Changes to Terms</h2>
              </div>
              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  Raita Mitra Social Trust reserves the right to revise or update these terms at any time. When updates occur, we will adjust the date banner at the top of this page. Continued navigation indicates your acceptance of the updated terms.
                </p>
              </div>
            </article>

            {/* 12. GOVERNING LAW */}
            <article id="Governing-Law" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Building2 size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">12. Governing Law</h2>
              </div>
              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  These Terms and Conditions shall be governed by and constructed in strict accordance with the laws of **India**.
                </p>
                <p>
                  Any legal actions, arbitration proceedings, or disputes arising under these policies must be resolved exclusively within the courts located in **Hubballi-Dharwad, Karnataka, India**.
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
                If you have questions, feedback, or require legal clarification regarding our Terms and Conditions, please reach out to our desk:
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

      {/* USER RESPONSIBILITIES SECTION: Simple Grid Cards */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Expectations</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Your Responsibilities</h2>
            <p className="text-sm text-slate-600">
              Responsible platform engagement ensures our community resources remain available and secure for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: UserCheck, title: "Provide Accurate Data", desc: "Always submit genuine identification and billing details during donation processing." },
              { icon: Shield, title: "Maintain Site Integrity", desc: "Never attempt to execute security probes, brute-force admin panels, or scrape content." },
              { icon: Handshake, title: "Respect Community Code", desc: "Follow volunteer boundaries and maintain positive, constructive engagement." },
              { icon: Scale, title: "Follow Applicable Laws", desc: "Adhere fully to India's DPDP framework and local taxation statutes." }
            ].map((card, idx) => (
              <div key={idx} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-3">
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl w-fit">
                  <card.icon size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm font-display">{card.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED POLICIES SECTION: Related Legal Pages */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <h3 className="text-xl font-display font-bold text-slate-900">Related Policies &amp; Compliance</h3>
        <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto">
          Please review our other policy documents to gain a comprehensive understanding of our legal and administrative frameworks.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button 
            onClick={() => setActivePage('privacy')}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-700 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => setActivePage('compliance')}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-700 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            Refund &amp; Cancellation Policy
          </button>
          <button 
            onClick={() => setActivePage('faq')}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-700 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            Help &amp; Cookie Guidelines
          </button>
        </div>
      </section>

      {/* FAQ SECTION Accordion */}
      <section className="max-w-4xl mx-auto px-4 pb-24 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Legal Helpdesk</span>
          <h3 className="text-2xl font-display font-bold text-slate-900">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-3.5">
          {[
            { q: "Can the Terms & Conditions change over time?", a: "Yes. Raita Mitra Social Trust reviews these terms annually or when India introduces new personal data protection (DPDP) or NGO tax directives. We will adjust the date banner at the top of this page to reflect changes." },
            { q: "Which laws govern these terms?", a: "These terms are fully governed by and structured under the laws of India. Any legal disputes or litigation processes must be filed exclusively in Hubballi-Dharwad, Karnataka, India." },
            { q: "How are donations handled securely?", a: "Online monetary contributions are routed strictly through PCI-DSS Level 1 payment networks (Razorpay and Stripe). Raita Mitra never sees or stores your bank credentials or card numbers." },
            { q: "Can volunteers be removed for misconduct?", a: "Yes. To protect participating marginal rural families and maintain on-ground safety, we reserve the right to immediately dismiss any volunteer or fellow who violates our code of conduct." },
            { q: "How do I contact the Trust regarding legal questions?", a: "Please email our compliance desk at contact@raitamitrasocialtrust.org or call us directly at +91 76763 76221. Our legal team will address all queries within 7 business days." }
          ].map((faq, idx) => (
            <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-3xs">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left px-5 py-4 bg-white hover:bg-slate-50/50 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="text-xs md:text-sm font-bold text-slate-800">{faq.q}</span>
                {openFaqs[idx] ? <ChevronDown size={16} className="text-slate-500" /> : <ChevronRight size={16} className="text-slate-500" />}
              </button>
              {openFaqs[idx] && (
                <div className="px-5 pb-5 pt-1 bg-white text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-20 bg-emerald-950 text-white overflow-hidden text-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1200" 
            alt="Sustainability patterns" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 to-slate-950 z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Committed To Transparency &amp; Ethical Practices</h2>
          <p className="text-sm md:text-base text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
            Creating sustainable impact across Karnataka through rigorous trust, absolute corporate accountability, and responsible digital governance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActivePage('contact')}
              className="px-6 py-3 bg-gold hover:bg-yellow-500 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Contact Our Team
            </button>
            <button
              onClick={() => setActivePage('privacy')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              View Privacy Policy
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
