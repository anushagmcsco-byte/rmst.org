import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  Headset, 
  BadgeCheck, 
  AlertTriangle, 
  WifiOff, 
  XCircle, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown, 
  Download, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  Check, 
  ExternalLink, 
  Heart, 
  Info, 
  CheckCircle, 
  Calendar, 
  GraduationCap, 
  Award, 
  Sparkles,
  Search,
  Sliders,
  X,
  FileCheck,
  RotateCcw,
  AlertCircle,
  Clock3
} from 'lucide-react';

interface RefundPolicyProps {
  setActivePage: (page: string) => void;
  highContrast?: boolean;
}

export default function RefundPolicy({ setActivePage, highContrast = false }: RefundPolicyProps) {
  // Navigation active section tracking
  const [activeTocSection, setActiveTocSection] = useState<string>('Introduction');
  
  // Interactive Accordion States
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});
  const [openExceptions, setOpenExceptions] = useState<Record<string, boolean>>({});

  // Self-Service Refund Eligibility Checker Simulator
  const [checkerReason, setCheckerReason] = useState<string>('');
  const [checkerDays, setCheckerDays] = useState<string>('');
  const [checkerResult, setCheckerResult] = useState<{ eligible: boolean | null; text: string }>({ eligible: null, text: '' });

  // Self-Service Tracker Simulator
  const [trackTxnId, setTrackTxnId] = useState<string>('');
  const [trackedStatus, setTrackedStatus] = useState<any | null>(null);

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
    { id: 'Introduction', label: '1. Policy Introduction' },
    { id: 'Donations-Policy', label: '2. Donations Policy' },
    { id: 'Refund-Eligibility', label: '3. Refund Eligibility' },
    { id: 'Payment-Failures', label: '4. Payment Failure & Reversal' },
    { id: 'Duplicate-Transactions', label: '5. Duplicate Transactions' },
    { id: 'Event-Cancellation', label: '6. Events & Workshop Policy' },
    { id: 'Refund-Processing-Timeline', label: '7. Refund Timeline' },
    { id: 'Third-Party-Payment-Gateways', label: '8. Payment Partners' },
    { id: 'Exceptions', label: '9. Exceptions & Limitations' },
    { id: 'Contact-Support', label: '10. Need Assistance?' },
    { id: 'Frequently-Asked-Questions', label: '11. FAQ Desk' }
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

  const toggleException = (id: string) => {
    setOpenExceptions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = () => {
    window.print();
  };

  // Run Eligibility Calculation
  const handleCheckEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkerReason || !checkerDays) {
      setCheckerResult({ eligible: null, text: 'Please fill in both fields.' });
      return;
    }

    const daysAgo = parseInt(checkerDays);
    if (isNaN(daysAgo) || daysAgo < 0) {
      setCheckerResult({ eligible: false, text: 'Please enter a valid number of days.' });
      return;
    }

    if (checkerReason === 'duplicate') {
      if (daysAgo <= 30) {
        setCheckerResult({ 
          eligible: true, 
          text: 'Eligible! Accidental duplicate charges reported within 30 days are fully refundable under our Trust criteria.' 
        });
      } else {
        setCheckerResult({ 
          eligible: false, 
          text: 'Requests for duplicate transactions must be filed within 30 days of payment. Please contact our support desk for manual verification.' 
        });
      }
    } else if (checkerReason === 'unauthorized') {
      if (daysAgo <= 45) {
        setCheckerResult({ 
          eligible: true, 
          text: 'Eligible! Unauthorized gateway activities are prioritized. We will assist you and coordinate with the processing bank.' 
        });
      } else {
        setCheckerResult({ 
          eligible: false, 
          text: 'Unauthorized transactions reported after 45 days must be raised with your issuing card bank directly.' 
        });
      }
    } else if (checkerReason === 'failed') {
      setCheckerResult({ 
        eligible: true, 
        text: 'Eligible! Technical transaction failures are automatically reversed. If the money was debited but not received by us, your bank will reverse it in 5-7 business days.' 
      });
    } else {
      setCheckerResult({ 
        eligible: false, 
        text: 'Voluntary donations that do not exhibit duplicate processing errors or unauthorized system exploits are non-refundable.' 
      });
    }
  };

  // Run Tracking Simulation
  const handleTrackRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackTxnId.trim()) {
      setTrackedStatus({ error: 'Please enter a valid reference or transaction ID.' });
      return;
    }

    // Generate simulated status based on reference ID
    const hash = trackTxnId.toLowerCase();
    if (hash.includes('fail') || hash.includes('err')) {
      setTrackedStatus({
        txnId: trackTxnId.toUpperCase(),
        stage: 'Failed & Reverted',
        desc: 'This transaction failed at the banking server stage. Our gateway Razorpay has triggered an instant reversal. The funds should return to your balance in 1-2 working days.',
        color: 'text-rose-600 bg-rose-50 border-rose-200',
        progress: 100,
        updateDate: 'July 4, 2026'
      });
    } else if (hash.includes('dup') || hash.includes('double')) {
      setTrackedStatus({
        txnId: trackTxnId.toUpperCase(),
        stage: 'Refund Approved',
        desc: 'Our finance division approved your duplicate transaction report. The refund is currently in transit to your bank settlement stage.',
        color: 'text-amber-600 bg-amber-50 border-amber-200',
        progress: 75,
        updateDate: 'July 5, 2026'
      });
    } else {
      setTrackedStatus({
        txnId: trackTxnId.toUpperCase(),
        stage: 'Settled to Programs',
        desc: 'This voluntary donation has been fully received, issued an 80G tax receipt, and allocated to on-ground water management initiatives. Refunds are not applicable for settled programs.',
        color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
        progress: 100,
        updateDate: 'July 3, 2026'
      });
    }
  };

  return (
    <div className={`w-full overflow-hidden ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* HERO SECTION: Corporate Minimal Banner */}
      <section className="relative min-h-[380px] flex items-center justify-center py-16 bg-slate-900 text-white overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-15">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200" 
            alt="Secure online payment and customer compliance illustrations" 
            className="w-full h-full object-cover animate-pulse"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Soft Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 z-0" />
        {/* SVG Grid Accent */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-400">
            <button onClick={() => setActivePage('home')} className="hover:underline hover:text-white transition-colors">Home</button>
            <ChevronRight size={12} />
            <span className="text-white/70">Refund &amp; Cancellation Policy</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white"
          >
            Refund &amp; Cancellation Policy
          </motion.h1>

          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            We are committed to absolute transparency, ethical fundraising, and donor trust. Learn about our clear processing timelines, dispute handling, and refund eligibility.
          </p>

          <div className="pt-2 text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
            <span>Last Updated:</span>
            <span className="text-gold font-bold">{currentDateString}</span>
          </div>
        </div>
      </section>

      {/* QUICK HIGHLIGHTS SECTION: Glass Cards */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6">
          <div className="text-center md:text-left space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Trust Framework</span>
            <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900">Policy Overview</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "Transparent Refund Process", desc: "Clearly structured guidelines covering unintentional double donations, duplicate payment processing errors, and unauthorized cards.", color: "text-emerald-600 bg-emerald-50" },
              { icon: Clock, title: "Defined Timelines", desc: "Strict SLA constraints. Standard review takes 1-3 working days and full bank reversals conclude within 5-10 bank working days.", color: "text-amber-600 bg-amber-50" },
              { icon: CreditCard, title: "Secure Payment Handling", desc: "Every transaction process routes through certified, PCI-DSS compliant payment gateways, protecting personal records.", color: "text-indigo-600 bg-indigo-50" },
              { icon: Headset, title: "Dedicated Support", desc: "Our support officers review, approve, and resolve gateway double-debits within 24 hours of receiving a ticket.", color: "text-rose-600 bg-rose-50" }
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

      {/* MAIN STICKY SIDEBAR SECTION */}
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
                  Download or print a hard-copy version of these policies for corporate donation audits.
                </p>
                <button
                  onClick={handlePrint}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download size={12} />
                  <span>Download Policy PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Core Structured Sections */}
          <div className="lg:col-span-3 space-y-16">
            
            {/* 1. INTRODUCTION */}
            <article id="Introduction" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Info size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">1. Policy Introduction</h2>
              </div>
              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  As an esteemed registered social trust operating across Karnataka, <strong>Raita Mitra Social Trust (R)</strong> handles all contributions, volunteer fees, and educational workshops with maximum fiscal ethics.
                </p>
                <p>
                  We understand that technology hiccups, network timeouts, or double clicks may occasionally result in duplicate charges or erroneous transaction inputs. This document establishes our guidelines for requesting refunds, managing dispute settlements, and canceling registrations.
                </p>
              </div>
            </article>

            {/* 2. DONATIONS POLICY */}
            <article id="Donations-Policy" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Heart size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">2. Donations Policy</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="font-bold text-xs text-slate-950 block font-display">Voluntary Contributions</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    All monetary support, sponsorships, and donations made to Raita Mitra Social Trust are entirely voluntary contributions toward social development, seed-distribution labs, and rainwater preservation programs. Donors are requested to carefully review details prior to executing transfers.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="font-bold text-xs text-slate-950 block font-display">Refund Requests</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Refund requests may be considered under genuine and verified circumstances, such as accidental duplicate payment logs or severe technical transaction anomalies. Once funds have been assigned to on-ground village projects, a refund cannot be initiated.
                  </p>
                </div>
              </div>
            </article>

            {/* 3. REFUND ELIGIBILITY */}
            <article id="Refund-Eligibility" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <BadgeCheck size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">3. Refund Eligibility Criteria</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 leading-relaxed mb-4">
                Refunds are strictly governed by specific eligibility brackets to maintain compliance with auditing requirements:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: BadgeCheck, title: "Duplicate Transactions", desc: "The same donor is charged multiple times for the exact same amount due to slow loading or multiple button clicks within a 30-day window." },
                  { icon: AlertTriangle, title: "Incorrect Payment Amount", desc: "An extra zero or typo was entered during manual transaction input, reported immediately before funds are routed to agrarian programs." },
                  { icon: WifiOff, title: "Technical Network Failures", desc: "Payment is processed at the bank but the transaction times out, failing to record a successful donation in our database." },
                  { icon: XCircle, title: "Unauthorized Card Usage", desc: "The transaction was executed using lost, compromised, or stolen banking tools without the authorization of the legal holder." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-white shadow-3xs flex gap-3">
                    <item.icon size={18} className="text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block font-display">{item.title}</span>
                      <span className="text-[11px] text-slate-500 leading-relaxed block">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* 4. PAYMENT FAILURE & REVERSAL */}
            <article id="Payment-Failures" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Sliders size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">4. Payment Failure &amp; Reversal Workflow</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 leading-relaxed">
                When a network timeout causes a payment to drop, the bank automatically processes reversals. This visualization charts the steps:
              </div>

              <div className="relative border-l-2 border-emerald-100 ml-4 pl-6 space-y-6">
                {[
                  { title: "1. Transaction Initiated", desc: "The donor fills out the form and triggers payment via credit card, UPI, or Net Banking gateways." },
                  { title: "2. Failure Detected", desc: "Network latency or banking server handshake failure prevents completion; database marks payment as 'Incomplete'." },
                  { title: "3. Bank Verification", desc: "The payment partner (Razorpay or Stripe) reconciles records within 24 hours to verify if funds left the donor's bank account." },
                  { title: "4. Automatic Reversal", desc: "If the transaction is incomplete, the gateway initiates an automated reversal, sending the funds back to the original payment instrument." },
                  { title: "5. Reversal Confirmation", desc: "The donor receives an SMS and email notification from their bank confirming the reversal." }
                ].map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-10 top-0.5 w-6.5 h-6.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 font-display">{step.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* 5. DUPLICATE TRANSACTIONS */}
            <article id="Duplicate-Transactions" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <CreditCard size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">5. Duplicate Transaction Resolution</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 leading-relaxed">
                If you notice double charges on your banking statement, we resolve them through this transparent verification pipeline:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2 text-center">
                {[
                  { step: "Verification", desc: "Donor provides receipt screenshot & transaction IDs" },
                  { step: "Support Review", desc: "Compliance desk matches dates & gateway logs" },
                  { step: "Approval", desc: "Trustees authorize reversal of duplicate amount" },
                  { step: "Initiation", desc: "Gateway transmits reversal instructions to card issuer" },
                  { step: "Completion", desc: "Funds credit back within 5-10 banking days" }
                ].map((flow, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex flex-col justify-between">
                    <span className="text-[10px] font-mono text-emerald-600 font-bold block mb-1">STAGE 0{idx+1}</span>
                    <span className="text-xs font-bold text-slate-900 block font-display leading-tight mb-1">{flow.step}</span>
                    <span className="text-[10px] text-slate-500 leading-tight block">{flow.desc}</span>
                  </div>
                ))}
              </div>
            </article>

            {/* 6. EVENTS & WORKSHOP CANCELLATION */}
            <article id="Event-Cancellation" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Calendar size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">6. Events &amp; Workshop Policy</h2>
              </div>

              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Raita Mitra coordinates public symposiums, seed-distribution workshops, and women SHG training events. Access and refunds follow specific criteria based on event type:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Calendar, title: "Free Events", desc: "Registration can be canceled anytime. Letting us know early allows us to allocate your slot to another marginal farmer or student." },
                  { icon: GraduationCap, title: "Paid Workshops", desc: "Refundable up to 48 hours prior to start. No refunds are issued for same-day cancellations or no-shows due to pre-purchased catering and kits." },
                  { icon: Award, title: "Special Events", desc: "Corporate donor summits are governed by specific mutual agreements. Contact your designated trust representative." }
                ].map((cat, idx) => (
                  <div key={idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl space-y-2">
                    <div className="p-2 bg-white rounded-xl border border-slate-100 w-fit text-emerald-700">
                      <cat.icon size={16} />
                    </div>
                    <h4 className="text-xs font-bold text-slate-950 block">{cat.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed block">{cat.desc}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* 7. REFUND PROCESSING TIMELINE */}
            <article id="Refund-Processing-Timeline" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Clock3 size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">7. Refund Processing Timeline</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 leading-relaxed">
                The timeline for a refund to reflect in your account depends on several verification steps and clearing banks:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { days: "1-3 Business Days", stage: "Request Review", desc: "Our support and finance desk verifies details against payment gateway records and checks authorization logs." },
                  { days: "3-7 Business Days", stage: "Approval & Processing", desc: "Once approved, transaction instructions are processed through our primary bank accounts at HDFC/ICICI." },
                  { days: "5-10 Business Days", stage: "Bank Settlement", desc: "Your credit card issuer or bank completes the domestic clearing cycle, and the funds credit back to your account." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border border-emerald-100 rounded-2xl bg-emerald-50/30 text-center relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-16 h-16 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
                    <span className="text-lg font-bold text-emerald-800 font-mono block">{item.days}</span>
                    <span className="text-xs font-bold text-slate-900 block font-display mb-1">{item.stage}</span>
                    <p className="text-[10px] text-slate-500 leading-relaxed block">{item.desc}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* 8. PAYMENT PARTNERS */}
            <article id="Third-Party-Payment-Gateways" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <CreditCard size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">8. Secure Payment Partners</h2>
              </div>
              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  Raita Mitra Social Trust utilizes industry-leading, PCI-DSS certified electronic gateway routers to manage donations securely.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                  {["Razorpay (India)", "Stripe", "UPI Networks", "Net Banking Providers"].map((prov, idx) => (
                    <div key={idx} className="p-3 border border-slate-100 bg-slate-50/50 text-center rounded-xl font-display text-xs font-bold text-slate-800">
                      {prov}
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* 9. EXCEPTIONS & LIMITATIONS */}
            <article id="Exceptions" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <XCircle size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">9. Exceptions &amp; Limitations</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 leading-relaxed mb-4">
                Please review these conditions under which refunds are not eligible or cannot be processed:
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'consumed', title: 'Completed & Consumed Support Services', desc: "Donations that have already been allocated to purchase seeds, fund water research, or set up IT labs cannot be recalled." },
                  { id: 'expired', title: 'Expired Request Timelines', desc: "Refund requests raised after 30 days from the original transaction date are not eligible for standard reversals." },
                  { id: 'incorrect', title: 'Incorrect Donor Banking Credentials', desc: "We are not responsible for delayed credits if the bank account details or PAN numbers supplied by the donor contain typographical errors." },
                  { id: 'force', title: 'Force Majeure Circumstances', desc: "Refund processing timelines may be extended during severe natural disasters, internet shutdowns, or banking sector disruptions." }
                ].map((item) => (
                  <div key={item.id} className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50">
                    <button
                      onClick={() => toggleException(item.id)}
                      className="w-full text-left px-4 py-3 bg-white flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-xs font-bold text-slate-800">{item.title}</span>
                      {openExceptions[item.id] ? <ChevronDown size={14} className="text-slate-500" /> : <ChevronRight size={14} className="text-slate-500" />}
                    </button>
                    {openExceptions[item.id] && (
                      <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                        {item.desc}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </article>

            {/* 10. NEED ASSISTANCE */}
            <article id="Contact-Support" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Headset size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">10. Need Assistance?</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    If you have raised a transaction request, or believe an unauthorized charge has occurred on your card, please connect with our billing division directly.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-emerald-700" />
                      <a href="mailto:contact@raitamitrasocialtrust.org" className="text-xs text-slate-800 font-bold hover:underline">contact@raitamitrasocialtrust.org</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-emerald-700" />
                      <a href="tel:+917676376221" className="text-xs text-slate-800 font-bold hover:underline">+91 76763 76221</a>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-emerald-700 mt-0.5" />
                      <span className="text-xs text-slate-600 leading-tight">
                        #37, First Floor, Pride Icon, Gokul Road, Hubballi - 580030, Karnataka, India
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-3xs">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600" 
                    alt="Friendly support executive assisting donors" 
                    className="w-full h-48 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* INTERACTIVE COMPLIANCE SUITE (Future Scalability Portal) */}
      <section className="bg-slate-900 text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Interactive Tools</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold">Self-Service Compliance Suite</h2>
            <p className="text-xs md:text-sm text-slate-400">
              Verify eligibility and check transaction refund states instantly using our secure simulators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Tool 1: Self-Service Eligibility Checker */}
            <div className="p-6 bg-slate-950 border border-slate-800 rounded-3xl space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <Sliders size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm font-display">Refund Eligibility Checker</h3>
                  <p className="text-[10px] text-slate-500">Find out if your transaction fits our refund policies</p>
                </div>
              </div>

              <form onSubmit={handleCheckEligibility} className="space-y-4">
                <div>
                  <label htmlFor="check-reason" className="block text-xs font-semibold text-slate-400 mb-1">Reason for Request</label>
                  <select 
                    id="check-reason"
                    value={checkerReason}
                    onChange={(e) => setCheckerReason(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="">Select a reason...</option>
                    <option value="duplicate">Accidental Duplicate Charges</option>
                    <option value="unauthorized">Unauthorized Gateway Activity</option>
                    <option value="failed">Technical Connection Timeout</option>
                    <option value="voluntary">Regular Voluntary Contribution</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="check-days" className="block text-xs font-semibold text-slate-400 mb-1">Days since Transaction</label>
                  <input 
                    id="check-days"
                    type="number"
                    placeholder="e.g. 5"
                    value={checkerDays}
                    onChange={(e) => setCheckerDays(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Verify Compliance Status
                </button>
              </form>

              <AnimatePresence mode="wait">
                {checkerResult.eligible !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-xl border text-xs leading-relaxed ${
                      checkerResult.eligible 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <p>{checkerResult.text}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tool 2: Refund & Dispute Tracker Portal */}
            <div className="p-6 bg-slate-950 border border-slate-800 rounded-3xl space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <Search size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm font-display">Dispute &amp; Refund Tracker</h3>
                  <p className="text-[10px] text-slate-500">Live reconciliation state monitoring simulator</p>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80">
                <span className="font-bold text-white block">Try entering these testing keywords:</span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[10px]">
                  <li>Enter <code className="text-amber-400">dup-987</code> to simulate Approved Reversal</li>
                  <li>Enter <code className="text-rose-400">fail-302</code> to simulate Instant Timeout Reversal</li>
                  <li>Enter any standard value to check on settled donations</li>
                </ul>
              </div>

              <form onSubmit={handleTrackRefund} className="space-y-4">
                <div>
                  <label htmlFor="track-txnid" className="block text-xs font-semibold text-slate-400 mb-1">Transaction Ref / Order ID</label>
                  <input 
                    id="track-txnid"
                    type="text"
                    placeholder="e.g. DUP-987"
                    value={trackTxnId}
                    onChange={(e) => setTrackTxnId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Track Dispute Status
                </button>
              </form>

              <AnimatePresence mode="wait">
                {trackedStatus && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2.5 ${
                      trackedStatus.error 
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' 
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    {trackedStatus.error ? (
                      <div className="flex items-start gap-2">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <p>{trackedStatus.error}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                          <span className="font-bold font-mono text-emerald-400">{trackedStatus.txnId}</span>
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">{trackedStatus.stage}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal">{trackedStatus.desc}</p>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-500">
                            <span>SLA Resolution Progress</span>
                            <span>{trackedStatus.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-850 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${trackedStatus.progress}%` }} />
                          </div>
                        </div>

                        <div className="text-[10px] text-slate-500 flex justify-between pt-1">
                          <span>Last Activity Update:</span>
                          <span className="font-mono">{trackedStatus.updateDate}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>
      </section>

      {/* FAQ SECTION: Accordion */}
      <section className="max-w-4xl mx-auto px-4 py-24 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Policy FAQ</span>
          <h3 className="text-2xl font-display font-bold text-slate-900">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-3.5">
          {[
            { q: "Can donations be refunded?", a: "Yes, Raita Mitra reviews refund claims for accidental duplicate charges or gateway network timeouts raised within 30 days. Regular voluntary support cannot be returned once active on-ground agricultural distribution operations have begun." },
            { q: "How long does refund processing take?", a: "The entire cycle takes 5-10 bank working days. Our finance desk completes authorization inside 1-3 days, and gateway routing banks (ICICI/HDFC/Stripe) take another 3-7 days to credit the card." },
            { q: "What happens if a payment fails?", a: "If your bank debits the account but our system records a timeout failure, the payment gateway triggers an automatic reversal. The funds will return to your balance inside 5-7 working days without manual support intervention." },
            { q: "Who should I contact regarding duplicate transactions?", a: "Please email our dedicated billing Desk at contact@raitamitrasocialtrust.org with receipt attachments or transaction screenshots, or call +91 76763 76221." },
            { q: "Are event registrations refundable?", a: "Paid professional agricultural symposiums and workshops are fully refundable if requested up to 48 hours prior to start. No refunds apply for same-day cancellations or no-shows." }
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

      {/* RELATED POLICIES SECTION: Related Legal Pages */}
      <section className="max-w-4xl mx-auto px-4 pb-20 text-center space-y-6">
        <h3 className="text-xl font-display font-bold text-slate-900">Related Legal Guidelines</h3>
        <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto">
          Please check our terms and privacy structures to maintain comprehensive policy transparency.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button 
            onClick={() => setActivePage('privacy')}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-700 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => setActivePage('terms')}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-700 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            Terms &amp; Conditions
          </button>
          <button 
            onClick={() => setActivePage('compliance')}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-700 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            CSR &amp; Statutory Hub
          </button>
        </div>
      </section>

      {/* CTA BANNER SECTION */}
      <section className="relative py-20 bg-indigo-950 text-white overflow-hidden text-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay animate-pulse">
          <img 
            src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1200" 
            alt="Trust and support illustration" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 to-slate-950 z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Committed To Donor Trust &amp; Transparency</h2>
          <p className="text-sm md:text-base text-indigo-100/80 max-w-2xl mx-auto leading-relaxed">
            Ensuring secure, ethical, and completely transparent donation systems for all global well-wishers and rural communities.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActivePage('contact')}
              className="px-6 py-3 bg-gold hover:bg-yellow-500 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Contact Support
            </button>
            <button
              onClick={() => setActivePage('donate')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer animate-bounce"
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
