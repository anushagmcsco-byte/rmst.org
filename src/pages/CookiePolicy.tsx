import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cookie, 
  BarChart3, 
  ShieldCheck, 
  Settings2, 
  MonitorSmartphone, 
  BarChart, 
  Shield, 
  CheckCircle2, 
  ChevronRight, 
  ChevronDown, 
  Download, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  Check, 
  ExternalLink, 
  Info, 
  ChartPie, 
  Eye, 
  Tags, 
  X,
  Lock,
  Compass,
  AlertCircle
} from 'lucide-react';

interface CookiePolicyProps {
  setActivePage: (page: string) => void;
  highContrast?: boolean;
}

export default function CookiePolicy({ setActivePage, highContrast = false }: CookiePolicyProps) {
  // Navigation active section tracking
  const [activeTocSection, setActiveTocSection] = useState<string>('What-Are-Cookies');
  
  // Interactive Preferences States
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean>(true);
  const [performanceConsent, setPerformanceConsent] = useState<boolean>(true);
  const [preferenceConsent, setPreferenceConsent] = useState<boolean>(false);
  const [preferencesSaved, setPreferencesSaved] = useState<boolean>(false);

  // Interactive Accordion States
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'essential': true
  });

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
    { id: 'What-Are-Cookies', label: '1. What Are Cookies?' },
    { id: 'Why-We-Use-Cookies', label: '2. Why We Use Cookies' },
    { id: 'Types-Of-Cookies', label: '3. Types of Cookies We Use' },
    { id: 'Third-Party-Services', label: '4. Third-Party Services' },
    { id: 'Analytics-Tools', label: '5. Analytics & Tracking' },
    { id: 'Managing-Cookie-Preferences', label: '6. Manage Preferences' },
    { id: 'How-To-Disable-Cookies', label: '7. How To Disable Cookies' },
    { id: 'Security-Privacy', label: '8. Security & Privacy' },
    { id: 'Frequently-Asked-Questions', label: '9. Cookie FAQ' },
    { id: 'Contact-Information', label: '10. Contact Information' }
  ];

  const handleScrollToSection = (id: string) => {
    setActiveTocSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setPreferencesSaved(true);
    setTimeout(() => {
      setPreferencesSaved(false);
    }, 4000);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqs(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`w-full overflow-hidden ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* HERO SECTION: Minimal Premium Banner */}
      <section className="relative min-h-[380px] flex items-center justify-center py-16 bg-slate-900 text-white overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-15">
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200" 
            alt="Digital privacy and data packets on screen" 
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
            <button onClick={() => setActivePage('home')} className="hover:underline hover:text-white transition-colors cursor-pointer">Home</button>
            <ChevronRight size={12} />
            <span className="text-white/70">Cookie Policy</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white"
          >
            Cookie Policy
          </motion.h1>

          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Understanding how cookies help improve your experience, website performance, security, and accessibility on the Raita Mitra Social Trust digital portal.
          </p>

          <div className="pt-2 text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
            <span>Last Updated:</span>
            <span className="text-gold font-bold">{currentDateString}</span>
          </div>
        </div>
      </section>

      {/* QUICK OVERVIEW SECTION: Cookie Policy At A Glance */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6">
          <div className="text-center md:text-left space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Policy Summary</span>
            <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900">Cookie Policy At A Glance</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cookie, title: "Essential Cookies", desc: "Always active. Necessary for basic security checks, login tokens, and payment processing integrity.", color: "text-emerald-600 bg-emerald-50" },
              { icon: BarChart3, title: "Analytics Cookies", desc: "Helps us aggregate visitor metrics anonymously to structure better agrarian modules.", color: "text-blue-600 bg-blue-50" },
              { icon: ShieldCheck, title: "Privacy Protection", desc: "We never map cookies to individual personal folders or sell analytical datasets.", color: "text-indigo-600 bg-indigo-50" },
              { icon: Settings2, title: "Cookie Preferences", desc: "Toggle, customize, and save cookie permissions directly using our Preference Center below.", color: "text-amber-600 bg-amber-50" }
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
                  Print or save an audited compliance copy of our digital cookies policy.
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
            
            {/* 1. WHAT ARE COOKIES? */}
            <article id="What-Are-Cookies" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Cookie size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">1. What Are Cookies?</h2>
              </div>
              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  Cookies are small text files containing strings of alphanumeric characters that are placed on your computer, tablet, or smartphone when you visit a website. They act as a memory key for the website, allowing it to remember your machine and store minimal preferences.
                </p>
                <p>
                  Cookies do not run programs, deploy viruses, or scan your personal local hard drive folders. They are widely used across global organizations like UNICEF, GiveIndia, and the World Bank to run high-performance forms, donation portals, and accessibility controls.
                </p>
              </div>
            </article>

            {/* 2. WHY WE USE COOKIES */}
            <article id="Why-We-Use-Cookies" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Compass size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">2. Why We Use Cookies</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Raita Mitra uses cookie mechanics to maintain safe, quick, and compliant digital programs. We use cookies for the following primary reasons:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: MonitorSmartphone, title: "Improve Website Performance", desc: "Cache layout assets, reduce database queries, and accelerate page load speed for low-bandwidth village connections." },
                  { icon: BarChart, title: "Understand Visitor Behaviour", desc: "Monitor which agrarian research papers or career listings receive the most engagements to plan better updates." },
                  { icon: Shield, title: "Enhance Platform Security", desc: "Authenticate active donation forms, prevent cross-site scripting (CSRF) exploits, and protect payment token routes." },
                  { icon: CheckCircle2, title: "Provide Better User Experience", desc: "Store accessibility parameters (e.g. high contrast theme selection), search logs, and diagnostic states." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex gap-3 items-start">
                    <div className="p-1.5 bg-white border border-slate-150 rounded-lg text-emerald-700">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block font-display">{item.title}</span>
                      <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* 3. TYPES OF COOKIES WE USE */}
            <article id="Types-Of-Cookies" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Settings2 size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">3. Types of Cookies We Use</h2>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'essential', name: "Essential Cookies", desc: "These are strictly required for standard website navigation, basic system security layers, and core transactions. Because the platform cannot operate without them, they cannot be disabled manually. They do not store personal profiles.", status: "Always Active" },
                  { id: 'analytics', name: "Analytics Cookies", desc: "These help us collect anonymous, compiled web traffic data. We use this information to determine the popularity of our soil-health blogs and on-ground reports, allowing us to align resources effectively.", status: "User Configurable" },
                  { id: 'performance', name: "Performance Cookies", desc: "These optimize caching systems, media delivery parameters (via Cloudinary), and script load times, ensuring smooth navigation even on unstable, rural mobile networks.", status: "User Configurable" },
                  { id: 'preference', name: "Preference Cookies", desc: "These remember your layout selection settings, such as high contrast toggle states or translation preferences, so you don't have to reconfigure them during every visit.", status: "User Configurable" }
                ].map((cat) => (
                  <div key={cat.id} className="border border-slate-150 rounded-xl overflow-hidden bg-slate-50/30">
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full text-left px-4 py-3.5 bg-white flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-900">{cat.name}</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono uppercase font-bold ${
                          cat.status === 'Always Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                        }`}>{cat.status}</span>
                      </div>
                      {openCategories[cat.id] ? <ChevronDown size={14} className="text-slate-500" /> : <ChevronRight size={14} className="text-slate-500" />}
                    </button>
                    {openCategories[cat.id] && (
                      <div className="p-4 bg-slate-50/50 border-t border-slate-150 text-[11px] md:text-xs text-slate-600 leading-relaxed">
                        {cat.desc}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </article>

            {/* 4. THIRD-PARTY SERVICES */}
            <article id="Third-Party-Services" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <ExternalLink size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">4. Third-Party Cookie Integrations</h2>
              </div>
              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  Some content or applications on our website are served by external partners. These third-party services may place cookies on your browser to monitor metrics or process secure, encrypted operations:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                  {["Google Analytics", "Cloudinary", "Resend Email", "Razorpay", "Stripe", "Mailchimp", "Supabase"].map((serv, idx) => (
                    <div key={idx} className="p-3 border border-slate-100 bg-slate-50/50 text-center rounded-xl font-display text-xs font-semibold text-slate-800">
                      {serv}
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* 5. ANALYTICS TOOLS */}
            <article id="Analytics-Tools" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <BarChart3 size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">5. Analytics &amp; Tracking Tools</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 leading-relaxed">
                We utilize verified and compliant tracking platforms to understand visitor interaction density, which helps us scale our server assets.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: ChartPie, name: "Google Analytics", desc: "Tracks page view duration, bounce metrics, and regional interest maps anonymously. Configured with IP masking." },
                  { icon: Eye, name: "Microsoft Clarity", desc: "Provides heatmaps and session recordings to help us debug broken buttons or complicated form layouts." },
                  { icon: Tags, name: "Google Tag Manager", desc: "Administers pixel tracking and script injection workflows safely without editing core source code." }
                ].map((tool, idx) => (
                  <div key={idx} className="p-4 border border-slate-100 bg-white rounded-2xl space-y-2 text-center">
                    <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl w-fit mx-auto">
                      <tool.icon size={18} />
                    </div>
                    <span className="text-xs font-bold text-slate-950 block">{tool.name}</span>
                    <p className="text-[10px] text-slate-500 leading-relaxed block">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* 6. MANAGING COOKIE PREFERENCES */}
            <article id="Managing-Cookie-Preferences" className="p-6 md:p-8 bg-slate-950 text-white rounded-3xl space-y-6 scroll-mt-24 border border-slate-800 shadow-md">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <Settings2 size={20} />
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-display font-bold">6. Cookie Preference Center</h2>
                  <p className="text-[10px] text-slate-400">Manage your granular cookie privacy preferences</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Use this interactive preference manager to allow or block specific cookie categories. Strictly essential cookies cannot be disabled as they govern layout stability and payment gate security.
              </p>

              <form onSubmit={handleSavePreferences} className="space-y-4 pt-2">
                {/* 1. Essential */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="space-y-1 pr-4">
                    <span className="text-xs font-bold text-white block">Essential Cookies</span>
                    <span className="text-[10px] text-slate-400 block leading-normal">Required for website security, transaction processing, and standard layout settings.</span>
                  </div>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">Always Active</span>
                </div>

                {/* 2. Analytics */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="space-y-1 pr-4">
                    <span className="text-xs font-bold text-white block">Analytics Cookies</span>
                    <span className="text-[10px] text-slate-400 block leading-normal">Allows Google Analytics and MS Clarity to track general platform metrics anonymously.</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setAnalyticsConsent(!analyticsConsent)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${analyticsConsent ? 'bg-emerald-500' : 'bg-slate-700'}`}
                  >
                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${analyticsConsent ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* 3. Performance */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="space-y-1 pr-4">
                    <span className="text-xs font-bold text-white block">Performance &amp; Caching Cookies</span>
                    <span className="text-[10px] text-slate-400 block leading-normal">Maintains optimal image sizes and cloud asset delivery (Cloudinary CDN links).</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setPerformanceConsent(!performanceConsent)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${performanceConsent ? 'bg-emerald-500' : 'bg-slate-700'}`}
                  >
                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${performanceConsent ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* 4. Preference */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="space-y-1 pr-4">
                    <span className="text-xs font-bold text-white block">Preference Cookies</span>
                    <span className="text-[10px] text-slate-400 block leading-normal">Stores accessibility selections like high contrast settings or text scaling parameters.</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setPreferenceConsent(!preferenceConsent)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${preferenceConsent ? 'bg-emerald-500' : 'bg-slate-700'}`}
                  >
                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${preferenceConsent ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Save Cookie Settings
                </button>
              </form>

              <AnimatePresence>
                {preferencesSaved && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs flex items-center gap-2"
                  >
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
                    <span>Your cookie preferences have been logged and saved successfully. Our tracking scripts will adjust immediately!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>

            {/* 7. HOW TO DISABLE COOKIES */}
            <article id="How-To-Disable-Cookies" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <MonitorSmartphone size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">7. How To Disable Cookies Via Browser</h2>
              </div>

              <div className="text-xs md:text-sm text-slate-600 leading-relaxed">
                If you wish to block all cookie files completely, you can configure your browser settings. Be advised that this may impact some interactive form functionalities:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { browser: "Google Chrome", instruction: "Go to Settings -> Privacy and Security -> Cookies and other site data. From here you can select Block All Cookies." },
                  { browser: "Apple Safari", instruction: "Go to Preferences -> Privacy -> check Block All Cookies to prevent storage activities." },
                  { browser: "Microsoft Edge", instruction: "Go to Settings -> Cookies and Site Permissions -> Manage and delete cookies and site data." },
                  { browser: "Mozilla Firefox", instruction: "Go to Options -> Privacy & Security -> Enhanced Tracking Protection and select Custom -> check Cookies." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                    <span className="font-bold text-xs text-slate-900 block font-display">{item.browser}</span>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{item.instruction}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* 8. SECURITY & PRIVACY */}
            <article id="Security-Privacy" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <ShieldCheck size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">8. Security &amp; Privacy Safeguards</h2>
              </div>
              <div className="text-xs md:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  All analytical cookie datasets we collect are fully encrypted at the transport layer using HTTPS and SSL configurations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Masked Analytical IPs", desc: "Our tracking setups truncate the last octet of your IP address, preventing the association of visit metrics with individual street coordinates." },
                    { title: "No Advertisement Mapping", desc: "Raita Mitra is a philanthropic trust; we strictly prohibit third-party marketing networks from placing behavioral ad cookies on our pages." }
                  ].map((card, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-white shadow-3xs flex gap-3">
                      <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block font-display">{card.title}</span>
                        <span className="text-[11px] text-slate-500 leading-relaxed block mt-0.5">{card.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* 9. FREQUENTLY ASKED QUESTIONS */}
            <article id="Frequently-Asked-Questions" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Info size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">9. Cookie Frequently Asked Questions</h2>
              </div>

              <div className="space-y-3">
                {[
                  { q: "What are cookies?", a: "Cookies are small text files created by websites that are stored on your browser. They are used to improve loading performance, remember settings, and safeguard payment details." },
                  { q: "Can I disable cookies?", a: "Yes. You can manage them granularly via our Cookie Preference Center on this page, or block cookies completely by adjusting your web browser settings." },
                  { q: "Will disabling cookies affect website functionality?", a: "Yes. Disabling essential cookies may prevent secure donations, make forms laggy, and reset accessibility settings like high contrast preferences." },
                  { q: "Which analytics tools are used?", a: "We utilize Google Analytics, Microsoft Clarity, and Google Tag Manager. All analytic engines are configured with IP masking to protect user privacy." },
                  { q: "How can I manage cookie preferences?", a: "You can use our active preference center dashboard in Section 6 to toggle analytical, performance, and preference cookies on or off." }
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
            </article>

            {/* 10. CONTACT INFORMATION */}
            <article id="Contact-Information" className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Mail size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900">10. Cookie Compliance Contacts</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    If you have questions, feedback, or require compliance details regarding our cookies or data handling practices, please contact our privacy desk:
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
                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600" 
                    alt="Digital security and data compliance console" 
                    className="w-full h-48 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* RELATED POLICIES SECTION: Related Legal Pages */}
      <section className="max-w-4xl mx-auto px-4 pb-20 text-center space-y-6">
        <h3 className="text-xl font-display font-bold text-slate-900">Related Guidelines &amp; Compliance</h3>
        <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto">
          Please review our other policy disclosures to gain a complete understanding of our digital compliance structures.
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
            onClick={() => setActivePage('refund')}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-700 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            Refund Policy
          </button>
        </div>
      </section>

      {/* CTA BANNER SECTION */}
      <section className="relative py-20 bg-emerald-950 text-white overflow-hidden text-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" 
            alt="Cybersecurity grid" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 to-slate-950 z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Committed To Transparency &amp; Responsible Data Practices</h2>
          <p className="text-sm md:text-base text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
            Creating a secure, accessible, and highly efficient digital platform for farmers, volunteers, and donors across India.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActivePage('contact')}
              className="px-6 py-3 bg-gold hover:bg-yellow-500 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Contact Our Desk
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
