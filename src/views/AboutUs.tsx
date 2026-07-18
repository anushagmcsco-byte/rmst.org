import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getBoardMembers, 
  saveBoardMembers, 
  resetBoardMembers 
} from '../data/board';
import { BoardMember } from '../types';
import { 
  Users, 
  Target, 
  Heart, 
  ShieldAlert, 
  Edit2, 
  Check, 
  RotateCcw, 
  Compass, 
  Award, 
  Globe,
  Eye,
  Shield,
  BadgeCheck,
  Lightbulb,
  Leaf,
  Scale,
  ArrowRight,
  ChevronRight,
  MapPin,
  FileText,
  Linkedin,
  Activity,
  CheckCircle,
  Building,
  UsersRound,
  Database,
  Search,
  Download,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AboutUsProps {
  setActivePage?: (page: string) => void;
  highContrast: boolean;
}

export default function AboutUs({ setActivePage, highContrast }: AboutUsProps) {
  const [board, setBoard] = useState<BoardMember[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Editor form state
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editQual, setEditQual] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editFocus, setEditFocus] = useState('');

  // Interactive Timeline state
  const [selectedYear, setSelectedYear] = useState<string>('2021');

  // Interactive Coverage Map state (district hover)
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>('Dharwad');

  // Organization chart active level state for interactive highlighters
  const [highlightedOrgLevel, setHighlightedOrgLevel] = useState<string | null>(null);

  // CSR contact simulation modal
  const [showCSRModal, setShowCSRModal] = useState(false);
  const [csrEmail, setCsrEmail] = useState('');
  const [csrCompany, setCsrCompany] = useState('');
  const [csrFocus, setCsrFocus] = useState('Sustainable Agriculture & Natural Input Mills');
  const [csrSubmitted, setCsrSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'Newsletter Signup',
        name: 'Quarterly Audit Subscriber',
        email: newsletterEmail,
        phone: '',
        subject: 'Quarterly Audit Dispatch Subscription',
        message: 'Subscribed to Quarterly Audit Dispatch from About Us page.',
        metadata: { page: 'About Us' }
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Newsletter subscription logged:', data);
    })
    .catch(err => {
      console.error('Error logging newsletter subscription:', err);
    });

    alert('Subscribed successfully to the quarterly audit newsletters.');
    setNewsletterEmail('');
  };

  useEffect(() => {
    setBoard(getBoardMembers());
  }, []);

  const handleStartEdit = (m: BoardMember) => {
    setEditingId(m.id);
    setEditName(m.name);
    setEditRole(m.role);
    setEditQual(m.qualification);
    setEditDesc(m.description);
    setEditFocus(m.focusArea || '');
  };

  const handleSaveEdit = (id: string) => {
    const updated = board.map((m) => {
      if (m.id === id) {
        return {
          ...m,
          name: editName,
          role: editRole,
          qualification: editQual,
          description: editDesc,
          focusArea: editFocus
        };
      }
      return m;
    });
    setBoard(updated);
    saveBoardMembers(updated);
    setEditingId(null);
  };

  const handleResetBoard = () => {
    if (confirm('Are you sure you want to restore the official trustee biographies? This resets any custom modifications.')) {
      const reseted = resetBoardMembers();
      setBoard(reseted);
      setEditingId(null);
    }
  };

  // Timeline events dataset
  const timelineEvents = [
    { 
      year: "2021", 
      title: "Trust Established", 
      tagline: "First Seed Seeded",
      desc: "Incorporated in Hubballi, Karnataka, in August 2021. Distributed bio-organic seed starter packages and agricultural hand-tools to 150 marginal families to survive COVID supply chain disruptions.",
      icon: Award,
      metric: "150+ Farmers Supported"
    },
    { 
      year: "2022", 
      title: "Agrarian Programs Launch", 
      tagline: "Natural Inputs & SHGs",
      desc: "Launched our primary regenerative farming training pilots. Simultaneously established our first 15 women Self-Help Groups (SHGs) linked with rural dairy micro-loans.",
      icon: Leaf,
      metric: "15 Women SHGs Formed"
    },
    { 
      year: "2023", 
      title: "NGO Darpan & CSR-1 Status", 
      tagline: "Compliance Milestones",
      desc: "Received NITI Aayog NGO Darpan registration and Ministry of Corporate Affairs CSR-1 filing approval. Opened first audited bank channel for verified corporate grants.",
      icon: Shield,
      metric: "100% Audit Compliance"
    },
    { 
      year: "2024", 
      title: "Digital Skill Labs Expansion", 
      tagline: "High-Tech Classroom Hubs",
      desc: "Installed low-power solar computers in 10 village government schools. Formulated specialized vernacular computer curriculum covering scratch coding, office suites, and introductory AI.",
      icon: Lightbulb,
      metric: "1,200+ Youth Scaled"
    },
    { 
      year: "2025", 
      title: "Integrated Scale-up Path", 
      tagline: "Resilient Ecosystem",
      desc: "Encompassed 12 districts in northern Karnataka. Successfully scaled our interventions to empower over 5,000 marginal farmers and 1,000 women micro-enterprise dairies.",
      icon: Target,
      metric: "5,000+ Active Beneficiaries"
    }
  ];

  // Karnataka districts metrics database
  const districtMetrics: Record<string, { farmers: number; youth: number; shgs: number; projects: string }> = {
    Dharwad: { farmers: 1840, youth: 1200, shgs: 25, projects: "Solar Pump Systems, Soil Health Labs, 5 Computer Centers" },
    Belagavi: { farmers: 1210, youth: 850, shgs: 18, projects: "Anemia Diagnostic Camps, Organic Millet Hubs" },
    Bagalkot: { farmers: 950, youth: 410, shgs: 12, projects: "Miyawaki Dense Forestry, Rainwater Wells" },
    Bidar: { farmers: 420, youth: 230, shgs: 6, projects: "Bio-fertility Workshops, Tailoring Centers" },
    Raichur: { farmers: 580, youth: 310, shgs: 8, projects: "Clean Watershed Desilting, Anemia Mitigation" },
    Koppal: { farmers: 350, youth: 180, shgs: 5, projects: "Kitchen Garden Kits, Financial Literacy Drives" },
    Gadag: { farmers: 710, youth: 550, shgs: 15, projects: "Heavier Lake Desilting, Micro-irrigation Networks" },
    Haveri: { farmers: 1450, youth: 950, shgs: 20, projects: "Poultry Micro-Grants, Primary AI School Labs" },
    Vijayapura: { farmers: 630, youth: 280, shgs: 9, projects: "Drought-Resilient Seed Storage, Solar Dryer Units" },
    Ballari: { farmers: 520, youth: 390, shgs: 7, projects: "Dryland Water Sheds, Local Value-Addition Mills" },
    Kalaburagi: { farmers: 480, youth: 320, shgs: 8, projects: "Pulse Processing Cooperatives, Livestock Care" },
    Yadgir: { farmers: 390, youth: 150, shgs: 4, projects: "Anemia Nutrition Camps, Digital Literacy Bundles" }
  };

  const handleCSRSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (csrEmail && csrCompany) {
      setCsrSubmitted(true);

      fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'Partner Onboarding',
          name: csrCompany,
          email: csrEmail,
          phone: '',
          subject: 'CSR Alliance Request',
          message: `Requesting ESG Proposal Portfolio. Focus Area: ${csrFocus}`,
          metadata: {
            company: csrCompany,
            focusArea: csrFocus,
            requestType: 'CSR Proposal Kit'
          }
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log('CSR request logged:', data);
      })
      .catch(err => {
        console.error('Error logging CSR request:', err);
      });

      setTimeout(() => {
        setCsrSubmitted(false);
        setCsrEmail('');
        setCsrCompany('');
        setShowCSRModal(false);
        alert('Thank you for your interest! A formal CSR portfolio, FCCC audited receipts, and compliance dossiers have been dispatched to your corporate email ID.');
      }, 1000);
    }
  };

  return (
    <div className={`w-full relative overflow-x-hidden ${highContrast ? 'bg-black text-white' : 'bg-[#FAFAFA]'}`} id="about-us-governance-view">
      
      {/* 1. HERO SECTION (WIDE BANNER WITH DARK GRADIENT OVERLAY) */}
      <section className="relative w-full min-h-[480px] md:min-h-[560px] flex items-center justify-center py-20 px-4 md:px-8 bg-slate-950 text-white overflow-hidden" id="about-hero">
        
        {/* Background Visual representation of Karnataka aerial/community perspective */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600" 
            alt="Aerial view of lush green rural Karnataka landscapes"
            className="w-full h-full object-cover opacity-25 filter contrast-125 scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Dark Gradients to optimize layout readability */}
          <div className="absolute inset-0 bg-radial-gradient from-forest/30 via-slate-950/80 to-slate-950 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
        </div>

        {/* Content Area */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-center gap-2 text-[10px] md:text-xs font-mono uppercase tracking-widest text-slate-400">
            <button 
              onClick={() => setActivePage?.('home')} 
              className="hover:text-gold transition-colors cursor-pointer font-semibold"
            >
              Home
            </button>
            <span className="opacity-50">/</span>
            <span className="text-gold font-bold">About Us & Governance</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-[10px] md:text-xs uppercase font-mono tracking-widest text-gold bg-gold/10 px-4 py-2 rounded-full font-extrabold border border-gold/20 inline-block">
              ESTABLISHED AUGUST 2021 | NGO DARPAN REGISTERED
            </span>
            
            <h1 className="font-display font-black text-3xl md:text-6xl text-white tracking-tight leading-tight max-w-4xl mx-auto">
              Building Sustainable <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-emerald-400 to-emerald-200">Communities Since 2021</span>
            </h1>
            
            <p className="text-slate-300 text-xs md:text-lg font-sans max-w-3xl mx-auto leading-relaxed">
              Rooted in Karnataka, committed to empowering farmers, strengthening rural communities and nurturing sustainable futures.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <a href="#our-story" className="px-6 py-3 bg-forest text-white hover:bg-forest-light text-xs font-extrabold rounded-xl shadow-lg transition-all flex items-center gap-2">
              <span>Read Our Story</span>
              <ArrowRight size={14} />
            </a>
            <a href="#governance-diagram" className="px-6 py-3 border border-slate-700 bg-white/5 backdrop-blur hover:bg-white/10 text-xs font-extrabold rounded-xl transition-all">
              Governance Framework
            </a>
          </div>

        </div>
      </section>

      {/* 2. OUR STORY SECTION (TWO COLUMN LAYOUT WITH TIMELINE COLLAGE) */}
      <section className={`py-20 px-4 md:px-8 border-b ${
        highContrast ? 'bg-black text-white border-white' : 'bg-white border-slate-100'
      }`} id="our-story">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Timeline Collage representing our milestones */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl group border border-slate-100/50">
              <img 
                src="https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=650" 
                alt="Marginal farmers receiving organic seeds during a training camp" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              {/* Floating micro indicators overlaying the image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-left space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-widest text-gold font-extrabold">FOUNDATION FOCUS</p>
                <p className="text-xs font-bold leading-tight">Hubballi HQ | Regional Field Offices in Dharwad, Gadag, and Haveri</p>
              </div>
            </div>

            {/* Interactive floating metric stamp */}
            <div className={`absolute -top-6 -right-4 p-4 rounded-2xl shadow-xl flex items-center gap-3 border ${
              highContrast ? 'bg-black border-white' : 'bg-forest text-white border-forest'
            }`}>
              <Award className="text-gold stroke-[2.5]" size={24} />
              <div className="text-left">
                <p className="text-[9px] uppercase font-mono tracking-widest opacity-80">Raita Mitra Trust</p>
                <p className="text-xs font-black">Registered NGO (R)</p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative content */}
          <div className="lg:col-span-7 text-left space-y-6 lg:pl-6">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Milestones & Roots</span>
            
            <h2 className={`font-display font-black text-2xl md:text-4xl leading-tight ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Our Journey
            </h2>
            
            <div className="w-16 h-1 bg-gold rounded-full"></div>

            <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
              Established in 2021 and headquartered in Hubballi, Karnataka, Raita Mitra Social Trust (R) was founded with a vision to strengthen rural communities through sustainable development. Inspired by the principles of equity and capability-building, the organization focuses on agriculture, education, women empowerment, health, environment and livelihoods.
            </p>

            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed font-sans">
              Born during the challenges of the 2021 crop-cycle disruptions, the trust was established by a collaborative panel of dryland soil scientists, local social organizers, and tech policy designers who realized that marginal farmers required hands-on support in adapting to volatile market costs, changing rain patterns, and digital skill barriers.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
              <div>
                <h4 className="text-xs font-black text-slate-800 dark:text-white font-display">Hubballi HQ</h4>
                <p className="text-[10px] text-slate-400 mt-1">Direct ground deployment center across Northern Karnataka villages.</p>
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-800 dark:text-white font-display">12+ Districts</h4>
                <p className="text-[10px] text-slate-400 mt-1">Expanding services to the most vulnerable semi-arid agrarian belts.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. VISION & MISSION SECTION (SIDE BY SIDE CARDS) */}
      <section className={`py-20 px-4 md:px-8 border-b ${
        highContrast ? 'bg-black text-white border-white' : 'bg-slate-50'
      }`} id="vision-mission">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Our North Star</span>
            <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Vision & Mission Framework
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              Connecting localized community impact to broad structural reforms aligned with national priorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Vision Card */}
            <div className={`p-8 rounded-3xl border text-left space-y-5 transition-all hover:shadow-lg ${
              highContrast 
                ? 'bg-black border-white text-white' 
                : 'bg-white border-slate-100'
            }`}>
              <div className="p-3.5 bg-forest/10 text-forest rounded-2xl inline-flex">
                <Eye size={24} className="stroke-[2.5]" />
              </div>
              <h3 className="font-display font-black text-lg text-slate-800 dark:text-white">Vision</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed font-sans">
                To create resilient and self-reliant rural communities where every individual has access to opportunities, dignity and sustainable livelihoods.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-[10px] text-slate-400 uppercase font-mono font-bold">
                <span>Core Target</span>
                <span className="text-forest dark:text-emerald-400 font-extrabold">Dignity & Livelihood</span>
              </div>
            </div>

            {/* Mission Card */}
            <div className={`p-8 rounded-3xl border text-left space-y-5 transition-all hover:shadow-lg ${
              highContrast 
                ? 'bg-black border-white text-white' 
                : 'bg-white border-slate-100'
            }`}>
              <div className="p-3.5 bg-forest/10 text-forest rounded-2xl inline-flex">
                <Target size={24} className="stroke-[2.5]" />
              </div>
              <h3 className="font-display font-black text-lg text-slate-800 dark:text-white">Mission</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed font-sans">
                To empower farmers, women and youth through education, skill development, health initiatives and sustainable community interventions.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-[10px] text-slate-400 uppercase font-mono font-bold">
                <span>Impact Target</span>
                <span className="text-forest dark:text-emerald-400 font-extrabold">20,000 Homes by 2030</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. CORE VALUES SECTION (SIX PREMIUM CARDS) */}
      <section className={`py-20 px-4 md:px-8 border-b ${
        highContrast ? 'bg-black text-white border-white' : 'bg-white border-slate-100'
      }`} id="core-values">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Institutional Sincerity</span>
            <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Our Six Core Values
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              Every operation, transaction, and village baseline audit is directed by these foundational pillars.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { title: "Integrity", icon: Shield, desc: "Ethical field practices, honest statistics, and respectful community interventions.", color: "border-emerald-500 bg-emerald-50/5 text-emerald-600" },
              { title: "Transparency", icon: BadgeCheck, desc: "FCCC audits, GPS-stamped receipt catalogs, and open ledger compliance.", color: "border-gold bg-gold/5 text-gold-dark" },
              { title: "Innovation", icon: Lightbulb, desc: "Pioneering dryland seed testing, solar drip storage, and smart primary AI skill modules.", color: "border-sky-500 bg-sky-50/5 text-sky-600" },
              { title: "Inclusiveness", icon: Users, desc: "Equal agency for female dairy co-ops, landless farmers, and minority groups.", color: "border-rose-500 bg-rose-50/5 text-rose-600" },
              { title: "Sustainability", icon: Leaf, desc: "Ecologically balanced solutions that rebuild topsoil and recharge ancient aquifers.", color: "border-lime-600 bg-lime-50/5 text-lime-600" },
              { title: "Accountability", icon: Scale, desc: "Rigorous M&E audits, regular board revisions, and dual-expenditure controls.", color: "border-purple-500 bg-purple-50/5 text-purple-600" }
            ].map((v, idx) => {
              const ValueIcon = v.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-2xl border text-center space-y-3 flex flex-col items-center justify-between transition-all hover:scale-[1.03] ${
                    highContrast 
                      ? 'bg-black border-white text-white' 
                      : 'bg-white border-slate-100 shadow-sm'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${highContrast ? 'bg-zinc-900 text-white' : 'bg-slate-50 text-slate-700'}`}>
                    <ValueIcon size={20} className="stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-xs text-slate-800 dark:text-white">{v.title}</h4>
                    <p className="text-[10px] text-slate-400 font-sans leading-relaxed line-clamp-3">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. DEVELOPMENT PHILOSOPHY (SPLIT SCREEN - AMARTYA SEN'S CAPABILITY APPROACH) */}
      <section className={`py-20 px-4 md:px-8 border-b ${
        highContrast ? 'bg-black border-white' : 'bg-slate-50'
      }`} id="development-philosophy">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Graphic summary of Sen's pillars */}
          <div className="lg:col-span-5 relative order-last lg:order-first">
            <div className={`p-6 md:p-8 rounded-3xl border text-left space-y-6 ${
              highContrast ? 'bg-zinc-950 border-white' : 'bg-white border-slate-100 shadow-xl'
            }`}>
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase font-bold text-gold">Operational Framework</span>
                <h4 className="font-display font-black text-sm text-slate-800 dark:text-white">Sen&apos;s Capability Pillars inside Raita Mitra</h4>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Enhancing Soil Agency", desc: "Chemical cartels create dependency. Organic carbon rejuvenation restores soil-holding power, returning direct agronomical agency to the cultivator." },
                  { title: "Enhancing Digital Agency", desc: "Computer literacy converts rural youth from passive data consumers into proactive software and AI creators, securing rural digital dignity." },
                  { title: "Democratic Self-Governance", desc: "Women self-help groups manage community rotating credit and elect dairy presidents, replacing external debt with community-wide cooperative leverage." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-forest text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-800 dark:text-white leading-none">{item.title}</p>
                      <p className="text-[10px] text-slate-500 font-sans leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-slate-400 font-mono italic leading-tight pt-3 border-t border-slate-100 dark:border-zinc-800">
                &quot;Development is the process of expanding the real freedoms that people enjoy.&quot; — Prof. Amartya Sen
              </p>
            </div>
          </div>

          {/* Right: Philosphy text content */}
          <div className="lg:col-span-7 text-left space-y-6">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Foundational Strategy</span>
            
            <h2 className={`font-display font-extrabold text-2xl md:text-4xl leading-tight ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Our Development Philosophy
            </h2>
            
            <div className="w-16 h-1 bg-gold rounded-full"></div>

            <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
              Inspired by Amartya Sen&apos;s Capability Approach, Raita Mitra Social Trust believes that development is about expanding people&apos;s freedoms and opportunities. We strive to transform dependency into self-reliance through sustainable practices and inclusive growth.
            </p>

            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed font-sans">
              Rather than treating communities as passive recipients of material handouts, we measure success by the level of self-governance achieved. Our programs are designed with a strict 3-year local transition lifecycle, handing total operation of solar pumps, digital labs, and dairy cooperatives over to local youth committees and women federations.
            </p>

            <div className="flex gap-4 pt-2">
              <div className="flex gap-2 items-center">
                <CheckCircle size={15} className="text-emerald-500" />
                <span className="text-xs font-bold text-slate-700 dark:text-white font-sans">Zero Handout Policy</span>
              </div>
              <div className="flex gap-2 items-center">
                <CheckCircle size={15} className="text-emerald-500" />
                <span className="text-xs font-bold text-slate-700 dark:text-white font-sans">Asset Ownership Transition</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. TIMELINE SECTION (MILESTONES & JOURNEY - INTERACTIVE HORIZONTAL TIMELINE) */}
      <section className={`py-20 px-4 md:px-8 border-b ${
        highContrast ? 'bg-black text-white border-white' : 'bg-white border-slate-100'
      }`} id="interactive-timeline">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Interactive Chronology</span>
            <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Milestones & Journey
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-sans">
              Click on a milestone year to inspect key organizational results and field-audit metrics achieved during our rapid growth.
            </p>
          </div>

          {/* Timeline Horizontal Rail */}
          <div className="relative pt-6 pb-2">
            
            {/* Background line connector */}
            <div className="absolute top-[54px] left-8 right-8 h-1 bg-slate-200 dark:bg-zinc-800 z-0 rounded"></div>
            
            <div className="grid grid-cols-5 gap-2 relative z-10">
              {timelineEvents.map((ev) => {
                const isSelected = selectedYear === ev.year;
                return (
                  <button
                    key={ev.year}
                    onClick={() => setSelectedYear(ev.year)}
                    className="flex flex-col items-center gap-3 group cursor-pointer focus:outline-none"
                    aria-label={`Select year ${ev.year}`}
                  >
                    <span className={`text-xs md:text-sm font-mono font-black transition-colors ${
                      isSelected 
                        ? 'text-forest dark:text-emerald-400 font-extrabold scale-110' 
                        : 'text-slate-400 group-hover:text-slate-600'
                    }`}>
                      {ev.year}
                    </span>

                    {/* Node Dot circle */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 transition-all ${
                      isSelected
                        ? 'bg-gold border-forest text-white scale-115 shadow-md'
                        : 'bg-white border-slate-200 text-slate-400 group-hover:border-slate-400 dark:bg-black dark:border-zinc-800'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    </div>

                    <span className="hidden md:inline-block text-[10px] font-bold text-center leading-tight truncate max-w-[120px] text-slate-500">
                      {ev.title}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Active Timeline Event Card */}
          <AnimatePresence mode="wait">
            {timelineEvents.map((ev) => {
              if (ev.year !== selectedYear) return null;
              const SelectedIcon = ev.icon;
              return (
                <motion.div
                  key={ev.year}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 md:p-8 rounded-3xl border text-left ${
                    highContrast ? 'bg-zinc-950 border-white text-white' : 'bg-slate-50 border-slate-100 shadow-sm'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    <div className="md:col-span-8 space-y-3">
                      <div className="flex gap-3 items-center">
                        <div className="p-2.5 bg-forest text-white rounded-xl">
                          <SelectedIcon size={18} />
                        </div>
                        <div className="text-left">
                          <span className="text-[10px] font-mono uppercase text-gold font-bold">{ev.tagline}</span>
                          <h4 className="font-display font-black text-sm md:text-base text-slate-800 dark:text-white">{ev.title}</h4>
                        </div>
                      </div>

                      <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm font-sans leading-relaxed">
                        {ev.desc}
                      </p>
                    </div>

                    <div className="md:col-span-4 p-5 rounded-2xl bg-white dark:bg-black border border-slate-100 dark:border-zinc-800 text-center space-y-1">
                      <p className="text-[10px] font-mono text-slate-400 uppercase font-bold">Key Result Indicator</p>
                      <p className="font-mono font-black text-base md:text-lg text-forest dark:text-emerald-400">{ev.metric}</p>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

        </div>
      </section>

      {/* 7. LEADERSHIP SECTION (PREMIUM PROFILE CARDS - READ ONLY) */}
      <section className={`py-20 px-4 md:px-8 border-b ${
        highContrast ? 'bg-black text-white border-white' : 'bg-slate-50/50'
      }`} id="leadership-team">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="text-left space-y-2 max-w-2xl">
              <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Eminent Trustees</span>
              <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
                highContrast ? 'text-white' : 'text-forest'
              }`}>
                Leadership Team
              </h2>
              <p className="text-slate-500 text-xs md:text-sm font-sans">
                Raita Mitra is directed by an eminent panel of dryland agronomists, community mobilizers, retired micro-finance directors, and technology advisors.
              </p>
            </div>
          </div>

          {/* Profile Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {board.map((member) => (
              <div 
                key={member.id}
                className={`p-6 md:p-8 rounded-3xl border text-left flex flex-col md:flex-row gap-6 transition-all relative overflow-hidden ${
                  highContrast 
                    ? 'bg-black border-white text-white' 
                    : 'bg-white border-slate-100 shadow-md'
                }`}
                id={`trustee-card-${member.id}`}
              >
                {/* Photo & Badge */}
                <div className="w-full md:w-32 shrink-0 flex flex-col items-center">
                  <div className="relative">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-gold shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-forest text-white p-1 rounded-full border border-white">
                      <BadgeCheck size={14} className="text-gold" />
                    </div>
                  </div>
                  
                  <span className="text-[9px] font-mono mt-3.5 bg-slate-100 text-slate-500 dark:bg-zinc-900 dark:text-slate-400 px-2 py-0.5 rounded font-extrabold uppercase">
                    ID: {member.id}
                  </span>
                </div>

                {/* Content Panel */}
                <div className="flex-1 space-y-3 relative z-10">
                  <div className="space-y-3 text-left">
                    <div>
                      <h3 className={`font-display font-extrabold text-sm md:text-base ${
                        highContrast ? 'text-white' : 'text-slate-800'
                      }`}>
                        {member.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        <span className={`font-extrabold ${highContrast ? 'text-white' : 'text-forest'}`}>{member.role}</span> — <span className="font-semibold text-[11px]">{member.qualification}</span>
                      </p>
                    </div>

                    {member.focusArea && (
                      <p className="text-[9px] font-mono bg-emerald-50 text-emerald-800 dark:bg-zinc-900 dark:text-emerald-300 px-2.5 py-1 rounded-md inline-block font-bold">
                        Focus: {member.focusArea}
                      </p>
                    )}

                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-sans">{member.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-3.5 pt-2 border-t border-slate-100/80 dark:border-zinc-800/80">
                      {member.linkedin && (
                        <a 
                          href={member.linkedin} 
                          className="text-[10px] text-slate-400 hover:text-forest flex items-center gap-1 font-mono uppercase font-bold"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Linkedin size={10} />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. ORGANIZATION STRUCTURE INFOGRAPHIC (GOVERNANCE HIERARCHY CHART) */}
      <section className={`py-20 px-4 md:px-8 border-b ${
        highContrast ? 'bg-black text-white border-white' : 'bg-white border-slate-100'
      }`} id="governance-diagram">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Flow of Authority</span>
            <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Governance Structure
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-sans">
              Interactive organization hierarchy showing our dual-authorization oversight, advisory structures, and grassroots field executors. Hover over any tier.
            </p>
          </div>

          {/* Org Chart Infographic Card */}
          <div className={`p-6 md:p-10 rounded-3xl border ${
            highContrast ? 'bg-zinc-950 border-white text-white' : 'bg-slate-50 border-slate-100 shadow-md'
          }`}>
            <div className="space-y-8 max-w-3xl mx-auto">
              
              {/* TIER 1: Board of Trustees */}
              <div 
                className={`transition-all duration-300 rounded-2xl border p-5 text-center cursor-pointer ${
                  highlightedOrgLevel === 'top'
                    ? 'border-forest bg-forest/5 scale-[1.01] ring-2 ring-forest/10'
                    : 'border-slate-200 bg-white dark:bg-black'
                }`}
                onMouseEnter={() => setHighlightedOrgLevel('top')}
                onMouseLeave={() => setHighlightedOrgLevel(null)}
              >
                <div className="flex justify-center mb-1"><Building size={18} className="text-forest dark:text-emerald-400" /></div>
                <h4 className="font-display font-black text-xs md:text-sm text-slate-800 dark:text-white">BOARD OF TRUSTEES</h4>
                <p className="text-[10px] text-slate-400 font-sans mt-1">Eminent 4-member panel directing policy, final CA audits, and dual authorization checks exceeding ₹25,000.</p>
              </div>

              {/* Connector line */}
              <div className="w-0.5 h-6 bg-slate-200 mx-auto"></div>

              {/* TIER 2: Advisory Committee & Managing Trustee (Side by Side) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div 
                  className={`transition-all duration-300 rounded-2xl border p-5 text-center cursor-pointer ${
                    highlightedOrgLevel === 'middle'
                      ? 'border-gold bg-gold/5 scale-[1.01]'
                      : 'border-slate-200 bg-white dark:bg-black'
                  }`}
                  onMouseEnter={() => setHighlightedOrgLevel('middle')}
                  onMouseLeave={() => setHighlightedOrgLevel(null)}
                >
                  <div className="flex justify-center mb-1"><UsersRound size={18} className="text-gold-dark" /></div>
                  <h5 className="font-display font-bold text-xs text-slate-800 dark:text-white">Advisory Committee</h5>
                  <p className="text-[9px] text-slate-400 font-sans mt-1">Independent technical consultants, agricultural scientists, and retired IAS consultants guiding interventions.</p>
                </div>

                <div 
                  className={`transition-all duration-300 rounded-2xl border p-5 text-center cursor-pointer ${
                    highlightedOrgLevel === 'middle'
                      ? 'border-gold bg-gold/5 scale-[1.01]'
                      : 'border-slate-200 bg-white dark:bg-black'
                  }`}
                  onMouseEnter={() => setHighlightedOrgLevel('middle')}
                  onMouseLeave={() => setHighlightedOrgLevel(null)}
                >
                  <div className="flex justify-center mb-1"><Compass size={18} className="text-gold-dark" /></div>
                  <h5 className="font-display font-bold text-xs text-slate-800 dark:text-white">Managing Trustee</h5>
                  <p className="text-[9px] text-slate-400 font-sans mt-1">Savitha B. Kallur overseeing day-to-day operations, bank liaison, and field manager accountability.</p>
                </div>

              </div>

              {/* Connector line */}
              <div className="w-0.5 h-6 bg-slate-200 mx-auto"></div>

              {/* TIER 3: Bottom executing verticals */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { title: "Programs Team", desc: "Coordinates field coordinators." },
                  { title: "Finance & Compliance", desc: "Monitors daily bookkeeping." },
                  { title: "Monitoring & Evaluation", desc: "Conducts independent GIS baseline audits." },
                  { title: "Administration", desc: "Coordinates Hubballi headquarters." },
                  { title: "Volunteers Network", desc: "Coordinates village-level student liaisons." }
                ].map((bot, idx) => (
                  <div 
                    key={idx}
                    className={`transition-all duration-300 rounded-xl border p-3.5 text-center cursor-pointer ${
                      highlightedOrgLevel === 'bottom'
                        ? 'border-sky-500 bg-sky-500/5'
                        : 'border-slate-100 bg-white dark:bg-zinc-900'
                    }`}
                    onMouseEnter={() => setHighlightedOrgLevel('bottom')}
                    onMouseLeave={() => setHighlightedOrgLevel(null)}
                  >
                    <div className="flex justify-center mb-1"><Database size={12} className="text-sky-500" /></div>
                    <h6 className="font-display font-extrabold text-[10px] text-slate-800 dark:text-white leading-tight">{bot.title}</h6>
                    <p className="text-[8px] text-slate-400 font-sans mt-1 leading-normal">{bot.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 9. GOVERNANCE PRINCIPLES SECTION */}
      <section className={`py-20 px-4 md:px-8 border-b ${
        highContrast ? 'bg-black text-white border-white' : 'bg-slate-50'
      }`} id="governance-principles">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Standard of Trust</span>
            <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Governance & Integrity Principles
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-sans">
              How we protect every single donor and volunteer contribution against risk or leak.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: "Transparency", desc: "Open ledger bookkeeping. All annual income tax filings, registered audits, and CSR-1 expenditure reports are hosted publicly on our Compliance Hub." },
              { title: "Financial Accountability", desc: "Dual electronic authorization protocol for every banking transaction exceeding ₹25,000, preventing unauthorized asset dissipation." },
              { title: "Ethical Governance", desc: "Strict nepotism barriers. Trustees receive zero commercial margins or administrative payouts from trust operations." },
              { title: "Impact Measurement", desc: "We utilize GPS-tagged verification and third-party independent field audits before concluding any agrarian or skill center interventions." },
              { title: "Stakeholder Participation", desc: "Democratic planning structures. Village assemblies vote directly on crop storage sites and computer school baseline requirements." },
              { title: "Community-Centric Development", desc: "Total asset transfer mechanism. Raita Mitra establishes local structures then transfers 100% ownership to community federations after 3 years." }
            ].map((item, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-2xl border text-left space-y-2.5 transition-all hover:bg-white dark:hover:bg-black hover:shadow-md ${
                  highContrast 
                    ? 'bg-black border-white' 
                    : 'bg-[#FDFCFA] border-slate-100'
                }`}
              >
                <h4 className="font-display font-black text-xs md:text-sm text-slate-800 dark:text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                  {item.title}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. COVERAGE MAP SECTION (OPERATIONAL PRESENCE ACROSS KARNATAKA) */}
      <section className={`py-20 px-4 md:px-8 border-b ${
        highContrast ? 'bg-black text-white border-white' : 'bg-white border-slate-100'
      }`} id="coverage-map">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Agrarian Presence Map</span>
            <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Operational Presence Across Karnataka
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-sans">
              Hover over or touch any active district in the control grid below to inspect our localized agrarian focus and direct beneficiary reach.
            </p>
          </div>

          {/* Interactive Coverage Hub */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* Districts Grid (Interactive Controls) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.keys(districtMetrics).map((dist) => {
                const isActive = hoveredDistrict === dist;
                return (
                  <button
                    key={dist}
                    onMouseEnter={() => setHoveredDistrict(dist)}
                    onClick={() => setHoveredDistrict(dist)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      highContrast
                        ? isActive ? 'bg-white text-black border-black font-extrabold' : 'bg-black text-white border-white'
                        : isActive 
                          ? 'bg-forest text-white border-forest shadow-md scale-[1.02]' 
                          : 'bg-slate-50 border-slate-100 hover:bg-slate-100/50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className={isActive ? 'text-gold' : 'text-slate-400'} />
                      <span className="font-display font-extrabold text-xs">{dist}</span>
                    </div>
                    <span className={`text-[9px] font-mono mt-2 uppercase ${isActive ? 'text-gold/90' : 'text-slate-400'}`}>
                      {districtMetrics[dist].farmers} Farmers
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active District Statistics Board */}
            <div className="lg:col-span-5 flex flex-col">
              <div className={`p-6 md:p-8 rounded-3xl border flex-1 flex flex-col justify-between text-left ${
                highContrast ? 'bg-zinc-950 border-white text-white' : 'bg-[#FAF9F5] border-slate-100 shadow-md'
              }`}>
                
                {hoveredDistrict && districtMetrics[hoveredDistrict] ? (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono uppercase text-gold font-bold">Active Operation Cluster</span>
                      <h4 className="font-display font-black text-lg text-slate-800 dark:text-white flex items-center gap-2">
                        <MapPin size={16} className="text-forest" />
                        {hoveredDistrict} District
                      </h4>
                    </div>

                    <div className="grid grid-cols-3 gap-3 border-t border-b border-slate-200/60 dark:border-zinc-800 py-4">
                      <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-mono">FARMERS</p>
                        <p className="font-mono font-black text-sm text-forest dark:text-emerald-400">{districtMetrics[hoveredDistrict].farmers}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-mono">STUDENTS</p>
                        <p className="font-mono font-black text-sm text-forest dark:text-emerald-400">{districtMetrics[hoveredDistrict].youth}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-mono">SHGS</p>
                        <p className="font-mono font-black text-sm text-forest dark:text-emerald-400">{districtMetrics[hoveredDistrict].shgs}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1.5">
                        <Activity size={12} className="text-gold" />
                        Pioneering Interventions
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                        {districtMetrics[hoveredDistrict].projects}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-400 flex flex-col justify-center items-center flex-1 space-y-2">
                    <MapPin size={32} className="opacity-30" />
                    <p className="text-xs font-mono">Select a district to view operational statistics.</p>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 mt-6 text-[9px] text-slate-400 font-mono leading-tight">
                  Northern Karnataka arid belt priority. Statistics updated as of July 2026 audits.
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 11. IMPACT HIGHLIGHTS SECTION */}
      <section className={`py-16 px-4 md:px-8 border-b ${
        highContrast ? 'bg-black text-white border-white' : 'bg-slate-50'
      }`} id="impact-highlights">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { count: "5,000+", title: "Farmers Empowered", desc: "Regenerative agronomical trainings and bio-inputs distributed across 12 dryland zones." },
              { count: "3,000+", title: "Youth Trained", desc: "Vernacular coding, digital toolkits, and introductory AI workshop hours completed." },
              { count: "1,500+", title: "Livelihoods Supported", desc: "Women-owned dairy self-reliance groups and tailor workshops linked directly to local markets." }
            ].map((card, idx) => (
              <div 
                key={idx}
                className={`p-6 md:p-8 rounded-3xl border text-center space-y-2 transition-all hover:shadow-lg ${
                  highContrast ? 'bg-zinc-950 border-white text-white' : 'bg-white border-slate-100'
                }`}
              >
                <p className="font-mono font-black text-3xl md:text-4xl text-forest dark:text-emerald-400 leading-none">
                  {card.count}
                </p>
                <h4 className="font-display font-extrabold text-xs text-slate-800 dark:text-white mt-1">
                  {card.title}
                </h4>
                <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CERTIFICATIONS & REGISTRATIONS (TRUST & COMPLIANCE) */}
      <section className={`py-20 px-4 md:px-8 border-b ${
        highContrast ? 'bg-black text-white border-white' : 'bg-white border-slate-100'
      }`} id="certifications">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Legitimacy Credentials</span>
            <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Trust & Compliance Registrations
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-sans">
              Raita Mitra operates with meticulous statutory compliance, certified by institutional authorities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "NGO Darpan Registered", code: "KA/2023/0389142", desc: "Verified unique ID approved by NITI Aayog for government project collaboration.", badge: "NITI Aayog" },
              { title: "CSR-1 Registered", code: "CSR00071015", desc: "Approved by Ministry of Corporate Affairs for legal receipt of corporate ESG/CSR grants.", badge: "MCA Approval" },
              { title: "12A Certification", code: "S42-CIT-EX-12A", desc: "Income tax division approval confirming complete tax-exempt NGO operational status.", badge: "Tax Exempt" },
              { title: "80G Tax Exemption", code: "80G-Approved-RMST", desc: "Exempts 50% of donor contribution value from taxable personal income.", badge: "Donor Benefit" }
            ].map((cert, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-2xl border text-left space-y-3 relative overflow-hidden transition-all hover:scale-[1.02] ${
                  highContrast ? 'bg-zinc-950 border-white text-white' : 'bg-[#FAFBF9] border-slate-100'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[8px] font-mono font-black uppercase text-forest bg-forest/5 dark:text-emerald-300 dark:bg-emerald-300/10 px-2 py-0.5 rounded">
                    {cert.badge}
                  </span>
                  <FileText size={16} className="text-slate-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-black text-xs text-slate-800 dark:text-white leading-tight">{cert.title}</h4>
                  <p className="text-[9px] font-mono font-extrabold text-gold">{cert.code}</p>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                  {cert.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 13. GALLERY PREVIEW SECTION (MASONRY GALLERY) */}
      <section className={`py-20 px-4 md:px-8 border-b ${
        highContrast ? 'bg-black text-white border-white' : 'bg-slate-50'
      }`} id="gallery-preview">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Field Chronicles</span>
            <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Impact Gallery Preview
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-sans">
              Candid perspectives from our rural dryland interventions, digital classroom modules, and community dairy audits.
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 max-w-5xl mx-auto">
            {[
              { title: "Farmers Training", src: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600" },
              { title: "Health Camps", src: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600" },
              { title: "Women SHGs", src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=600" },
              { title: "Youth Skill Programs", src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600" },
              { title: "Tree Plantation", src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600" }
            ].map((img, idx) => (
              <div key={idx} className="break-inside-avoid relative rounded-2xl overflow-hidden shadow-sm group border border-slate-100/50">
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-xs font-bold font-mono tracking-wider">{img.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button 
              onClick={() => setActivePage?.('gallery')}
              className={`px-6 py-3 rounded-xl border text-xs font-extrabold cursor-pointer transition-all ${
                highContrast 
                  ? 'border-white text-white hover:bg-white hover:text-black' 
                  : 'border-slate-200 text-forest hover:bg-forest hover:text-white hover:border-forest bg-white shadow-sm'
              }`}
            >
              Explore Full Gallery
            </button>
          </div>

        </div>
      </section>

      {/* 14. CALL TO ACTION SECTION (CSR ALLIANCES & BOARDS) */}
      <section className="relative w-full py-24 px-4 md:px-8 bg-slate-950 text-white overflow-hidden text-center" id="about-cta">
        
        {/* Background photo of corporate volunteers / community interactions */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200" 
            alt="Corporate volunteers coordinating with local rural communities" 
            className="w-full h-full object-cover opacity-15 filter grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="text-[10px] md:text-xs uppercase font-mono tracking-widest text-gold bg-gold/10 px-4 py-2 rounded-full font-extrabold border border-gold/20 inline-block">
            CORPORATE ALLIANCES & ESG SPONSORS
          </span>
          
          <h2 className="font-display font-black text-2xl md:text-5xl tracking-tight leading-tight max-w-3xl mx-auto">
            Partner With Us To Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-emerald-300 to-emerald-100">Sustainable Communities</span>
          </h2>
          
          <p className="text-slate-300 text-xs md:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            Collaborate with Raita Mitra Social Trust (R) to implement measurable, audited, and geolocated CSR initiatives that satisfy MCA guidelines and change lives.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              onClick={() => setShowCSRModal(true)}
              className="px-6 py-3.5 bg-gold hover:bg-gold-light text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Mail size={14} />
              <span>Become a CSR Partner</span>
            </button>
            <a 
              href="#certifications"
              className="px-6 py-3.5 border border-slate-700 bg-white/5 hover:bg-white/10 text-xs font-bold rounded-xl transition-all flex items-center gap-2"
            >
              <Download size={14} />
              <span>Download CSR Brochure</span>
            </a>
          </div>
        </div>
      </section>

      {/* 15. NEWSLETTER & SOCIAL SECTION (FOOTER SIMULATOR IN THE JSON SPEC) */}
      <section className={`py-12 px-4 md:px-8 border-t ${
        highContrast ? 'bg-black text-white border-white' : 'bg-slate-900 text-slate-300 border-slate-800'
      }`} id="about-footer-block">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
          
          <div className="space-y-2">
            <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <Mail size={16} className="text-gold" />
              Subscribe to our Quarterly Audit Dispatch
            </h4>
            <p className="text-xs text-slate-400 font-sans max-w-md">
              Receive direct links to NITI Aayog compliance reports, geolocated crop outcomes, and certified financial ledger audits.
            </p>
          </div>

          <div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input 
                type="email" 
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter corporate or personal email ID" 
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/50 text-white text-xs outline-none focus:border-gold font-sans"
              />
              <button 
                type="submit" 
                className="px-5 py-2.5 bg-forest text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-forest-light transition-colors"
              >
                Join Ledger
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Interactive CSR Partnership Modal */}
      {showCSRModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-6 md:p-8 rounded-3xl max-w-md w-full text-left space-y-4 shadow-2xl relative">
            
            <div className="space-y-1">
              <h4 className="font-display font-black text-sm md:text-base text-slate-800 dark:text-white">CSR Alliance Request</h4>
              <p className="text-slate-400 text-xs">Direct link to corporate CSR division for certified project proposals.</p>
            </div>

            <form onSubmit={handleCSRSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono">Corporate Entity Name</label>
                <input 
                  type="text" 
                  required
                  value={csrCompany}
                  onChange={(e) => setCsrCompany(e.target.value)}
                  placeholder="e.g. Tata Trusts / Infosys Foundation" 
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 dark:bg-black text-xs outline-none focus:border-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono">Corporate Email ID</label>
                <input 
                  type="email" 
                  required
                  value={csrEmail}
                  onChange={(e) => setCsrEmail(e.target.value)}
                  placeholder="e.g. CSR_director@corporation.com" 
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 dark:bg-black text-xs outline-none focus:border-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono">Primary Focus Interventions</label>
                <select 
                  value={csrFocus}
                  onChange={(e) => setCsrFocus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 dark:bg-black text-xs outline-none"
                >
                  <option>Sustainable Agriculture & Natural Input Mills</option>
                  <option>Women Dairy Co-operatives & Micro-loans</option>
                  <option>Solar-powered Computer Workstations in Schools</option>
                  <option>Tree Plantation & Lake Basin Rejuvenation</option>
                  <option>Preventive Nutrition & Health Diagnosis</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  type="submit"
                  disabled={csrSubmitted}
                  className="flex-1 py-2.5 bg-forest text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-forest-light transition-colors"
                >
                  {csrSubmitted ? 'Dispatching portfolio...' : 'Request ESG Portfolio'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowCSRModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
