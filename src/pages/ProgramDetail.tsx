import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  Download, 
  MapPin, 
  Calendar, 
  Clock, 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  BookOpen, 
  Globe, 
  Cpu, 
  Volume2, 
  Target, 
  Users, 
  ChevronRight, 
  X, 
  ChevronLeft, 
  HelpCircle,
  Sparkles,
  Heart,
  TrendingUp,
  FileText,
  Mail
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell, RadialBarChart, RadialBar
} from 'recharts';
import { programDetails, DetailedProgramData } from '../data/programDetails';

interface ProgramDetailProps {
  slug: string;
  setActivePage: (page: string) => void;
  highContrast: boolean;
}

export default function ProgramDetail({ slug, setActivePage, highContrast }: ProgramDetailProps) {
  const [data, setData] = useState<DetailedProgramData | null>(null);
  
  // Find program by slug
  useEffect(() => {
    const detail = programDetails[slug];
    if (detail) {
      setData(detail);
    } else {
      // Try to find by matching substring or fallback
      const found = Object.values(programDetails).find(p => p.slug === slug || p.id === slug);
      if (found) {
        setData(found);
      } else {
        // Fallback to agriculture
        setData(programDetails['sustainable-agriculture']);
      }
    }
  }, [slug]);

  // UI States
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number>(0);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'growth' | 'district' | 'progress' | 'gender'>('growth');
  const [copiedLink, setCopiedLink] = useState(false);
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Before/After Drag Slider Refs and States
  const [sliderPosition, setSliderPosition] = useState(50); // percentage
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Partners Carousel state
  const [partnerOffset, setPartnerOffset] = useState(0);

  if (!data) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white font-mono p-8">
        <Sparkles className="animate-spin text-gold mb-4" size={40} />
        <p>Analyzing and generating program workspace...</p>
      </div>
    );
  }

  // Before/After Slider Handlers
  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    handleSliderMove(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    handleSliderMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  // Lightbox Navigation
  const openLightbox = (imgUrl: string, idx: number) => {
    setLightboxImage(imgUrl);
    setLightboxIdx(idx);
  };

  const prevLightbox = () => {
    const nextIdx = (lightboxIdx - 1 + data.photoGallery.length) % data.photoGallery.length;
    setLightboxIdx(nextIdx);
    setLightboxImage(data.photoGallery[nextIdx]);
  };

  const nextLightbox = () => {
    const nextIdx = (lightboxIdx + 1) % data.photoGallery.length;
    setLightboxIdx(nextIdx);
    setLightboxImage(data.photoGallery[nextIdx]);
  };

  // Share action
  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Newsletter signup
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterName.trim() && newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterName('');
        setNewsletterEmail('');
      }, 3000);
    }
  };

  // AI Recommendation (Related programs based on relatedSlugs)
  const getRelatedPrograms = () => {
    return Object.values(programDetails).filter(p => data.relatedSlugs.includes(p.slug));
  };

  return (
    <div className={`w-full ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`} id={`program-detail-${data.id}`}>
      
      {/* 1. IMMERSIVE CINEMATIC HERO SECTION */}
      <section className="relative w-full min-h-[550px] md:min-h-[650px] flex items-center justify-center py-20 px-4 md:px-8 bg-slate-950 text-white overflow-hidden" id="program-hero">
        
        {/* Ambient Video/Image Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={data.heroFallbackImage} 
            alt={data.title}
            className="w-full h-full object-cover opacity-25 filter grayscale scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Overlay Soft Gradients */}
          <div className="absolute inset-0 bg-radial-gradient from-forest/35 via-slate-950/85 to-slate-950 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6 md:space-y-8">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-center gap-2 text-[10px] md:text-xs font-mono uppercase tracking-widest text-slate-400">
            <button onClick={() => setActivePage('home')} className="hover:text-gold transition-colors cursor-pointer font-bold">Home</button>
            <span>/</span>
            <button onClick={() => setActivePage('programs')} className="hover:text-gold transition-colors cursor-pointer font-bold">Programs</button>
            <span>/</span>
            <span className="text-gold font-black">{data.title}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Tag Badge */}
            <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs uppercase font-mono tracking-widest text-gold bg-gold/15 px-4 py-1.5 rounded-full font-black border border-gold/30">
              <Sparkles size={12} className="text-gold animate-pulse" />
              INTEGRATED SDG ACTION VERTICAL
            </span>

            <h1 className="font-display font-black text-3xl md:text-6xl text-white tracking-tight leading-none max-w-5xl mx-auto">
              {data.title}
            </h1>

            <p className="text-slate-300 text-sm md:text-xl font-sans max-w-4xl mx-auto leading-relaxed">
              {data.tagline}
            </p>

            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 max-w-2xl mx-auto">
              <p className="text-[10px] md:text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">Our Registered Target Mission Horizon</p>
              <p className="text-xs md:text-sm text-white italic font-sans">{data.mission}</p>
            </div>
          </motion.div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              onClick={() => setActivePage('donate')} 
              className="px-6 py-3.5 bg-gold hover:bg-gold/90 text-white text-xs font-extrabold rounded-xl shadow-lg hover:shadow-gold/20 hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Heart size={14} className="fill-current" />
              <span>Support This Program</span>
            </button>
            <button 
              onClick={() => setActivePage('volunteer')} 
              className="px-6 py-3.5 bg-forest hover:bg-forest-light text-white text-xs font-extrabold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Users size={14} />
              <span>Become A Volunteer</span>
            </button>
            <a 
              href="#downloads" 
              className="px-6 py-3.5 border border-slate-700 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white text-xs font-extrabold rounded-xl transition-all flex items-center gap-2"
            >
              <Download size={14} />
              <span>Download Brochure</span>
            </a>
            <button 
              onClick={handleShare}
              className="p-3.5 border border-slate-700 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white rounded-xl transition-all flex items-center justify-center relative"
              title="Share Page"
            >
              <Share2 size={16} />
              <AnimatePresence>
                {copiedLink && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-forest text-white text-[9px] font-mono rounded font-bold whitespace-nowrap"
                  >
                    Link Copied!
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>
      </section>

      {/* 2. QUICK IMPACT SECTION (ANIMATED GLASS CARDS) */}
      <section className="relative z-20 -mt-10 px-4 max-w-6xl mx-auto" id="quick-metrics">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {data.quickImpactMetrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-2xl backdrop-blur-md border text-center shadow-lg transition-all ${
                highContrast 
                  ? 'bg-black border-white text-white' 
                  : 'bg-white/95 border-slate-200/60 text-slate-800 hover:border-forest/30'
              }`}
            >
              <p className="font-display font-black text-2xl md:text-4xl text-forest dark:text-gold mb-1">
                {metric.value}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-xs font-mono uppercase tracking-wider font-extrabold">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT PROGRAM SECTION (SPLIT SCREEN LAYOUT) */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="about-program">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-black">Strategic Intent</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-forest'}`}>
              About The Program
            </h2>
            <div className="w-16 h-1 bg-gold rounded-full"></div>
            
            <p className="text-slate-600 dark:text-slate-300 text-xs md:text-base leading-relaxed font-sans">
              {data.aboutDescription}
            </p>

            <div className="space-y-3 pt-2">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest font-extrabold">Key Operational Directives:</p>
              {data.aboutHighlights.map((highlight, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 shrink-0 mt-0.5">
                    <CheckCircle size={14} className="stroke-[2.5]" />
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-sans">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Display */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-slate-800 border border-slate-200 dark:border-zinc-800">
              <img 
                src={data.aboutImage} 
                alt={data.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 p-4 rounded-2xl shadow-xl flex items-center gap-3 bg-forest text-white border border-forest">
              <Target className="text-gold" size={24} />
              <div className="text-left">
                <p className="text-[9px] uppercase font-mono tracking-wider opacity-85">Raita Mitra</p>
                <p className="text-xs font-bold font-display">Targeted Intervention</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. PROBLEM STATEMENT SECTION ( статистические индикаторы ) */}
      <section className={`py-16 px-4 md:px-8 border-y ${highContrast ? 'bg-black border-white' : 'bg-slate-100 border-slate-200'}`} id="problem-statement">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-rose-500 font-bold flex items-center justify-center gap-1.5">
              <AlertTriangle size={14} />
              Field Realities
            </span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-forest'}`}>
              Why This Program Matters
            </h2>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              {data.problemStatement.text}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.problemStatement.stats.map((stat, idx) => (
              <div 
                key={idx} 
                className={`p-6 rounded-2xl border text-left flex flex-col justify-between space-y-4 ${
                  highContrast 
                    ? 'bg-black border-white text-white' 
                    : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded border border-rose-100 dark:border-rose-900 inline-block">
                    {stat.label}
                  </span>
                  <p className="font-display font-black text-3xl md:text-4xl text-rose-600 pt-1">
                    {stat.metric}
                  </p>
                </div>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-[10px] font-mono text-slate-400 italic">
              Verified Scientific Data Sources: {data.problemStatement.researchData}
            </p>
          </div>

        </div>
      </section>

      {/* 17. WHERE WE WORK (KARNATAKA DISTRICT INTERACTIVE MAP) */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="geographic-reach">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold flex items-center gap-1.5">
              <MapPin size={14} />
              Geographic Deployment
            </span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-forest'}`}>
              Where We Work
            </h2>
            <div className="w-16 h-1 bg-gold rounded-full"></div>
            <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
              Raita Mitra concentrates all field resources in highly vulnerable dryland clusters of Northern Karnataka. We operate directly at the grassroots, auditing our physical assets weekly.
            </p>

            <div className="p-4 rounded-xl bg-forest/10 border border-forest/20 space-y-2">
              <p className="text-xs font-mono font-bold text-forest dark:text-emerald-400">Highlighted Active Territories:</p>
              <ul className="text-xs space-y-1 font-mono text-slate-500">
                <li>• <strong className="text-slate-700 dark:text-slate-300">Dharwad taluk:</strong> Sulla, Hebsur, Tarihal, Morab (Core base)</li>
                <li>• <strong className="text-slate-700 dark:text-slate-300">Haveri district:</strong> 12 active women cooperatives</li>
                <li>• <strong className="text-slate-700 dark:text-slate-300">Gadag district:</strong> Afforestation and desilting works</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-center bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-md">
            <div className="w-full max-w-[380px] space-y-4">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest text-center">Interactive Regional Map Block</p>
              
              <svg viewBox="0 0 400 420" className="w-full h-auto drop-shadow-md select-none">
                {/* Belagavi */}
                <path 
                  d="M 120 100 L 190 110 L 220 140 L 180 180 L 150 170 L 110 130 Z" 
                  className="fill-slate-100 stroke-slate-300 dark:fill-zinc-900 dark:stroke-zinc-800 stroke-[1.5]"
                />
                <text x="145" y="135" className="text-[9px] font-mono fill-slate-400 pointer-events-none">Belagavi</text>

                {/* Bagalkot */}
                <path 
                  d="M 190 110 L 250 120 L 260 160 L 230 185 L 180 180 L 220 140 Z" 
                  className="fill-slate-100 stroke-slate-300 dark:fill-zinc-900 dark:stroke-zinc-800 stroke-[1.5]"
                />
                <text x="215" y="150" className="text-[9px] font-mono fill-slate-400 pointer-events-none">Bagalkot</text>

                {/* Dharwad - Core Highlighted */}
                <path 
                  d="M 180 180 L 230 185 L 240 230 L 200 240 L 150 215 L 150 170 Z" 
                  className="fill-forest/30 stroke-forest stroke-[2] cursor-pointer hover:fill-forest/40 transition-colors"
                />
                <text x="180" y="205" className="text-[10px] font-mono fill-forest dark:fill-emerald-400 font-black pointer-events-none">DHARWAD</text>
                <circle cx="195" cy="210" r="4" className="fill-gold animate-ping" />
                <circle cx="195" cy="210" r="3" className="fill-gold" />

                {/* Gadag */}
                <path 
                  d="M 230 185 L 280 190 L 290 230 L 240 230 Z" 
                  className="fill-forest/20 stroke-forest/40 stroke-[1.5] cursor-pointer hover:fill-forest/30 transition-colors"
                />
                <text x="250" y="210" className="text-[10px] font-mono fill-forest dark:fill-emerald-400 font-bold pointer-events-none">GADAG</text>
                <circle cx="260" cy="205" r="3" className="fill-emerald-600" />

                {/* Haveri */}
                <path 
                  d="M 150 215 L 200 240 L 220 290 L 160 280 L 130 250 Z" 
                  className="fill-forest/20 stroke-forest/40 stroke-[1.5] cursor-pointer hover:fill-forest/30 transition-colors"
                />
                <text x="165" y="260" className="text-[10px] font-mono fill-forest dark:fill-emerald-400 font-bold pointer-events-none">HAVERI</text>
                <circle cx="175" cy="255" r="3" className="fill-emerald-600" />
              </svg>

              <div className="flex justify-center gap-4 text-[10px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-forest/35 rounded-sm border border-forest"></span>
                  <span>Core HQ Zone</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-forest/15 rounded-sm border border-forest/30"></span>
                  <span>Active Worksite</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. SOLUTION APPROACH SECTION (HORIZONTAL PROCESS TIMELINE) */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-zinc-800" id="approach">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Lifecycle Sequence</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-forest'}`}>
              Our Operational Approach
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              We implement a structured 6-stage operational pathway to ensure communities transition smoothly into total self-reliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
            {data.solutionSteps.map((step, idx) => (
              <div 
                key={idx} 
                className={`p-5 rounded-2xl border text-left relative flex flex-col justify-between space-y-4 ${
                  highContrast 
                    ? 'bg-black border-white text-white' 
                    : 'bg-white border-slate-150 shadow-sm'
                }`}
              >
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-wider font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-900 inline-block">
                    {step.phase}
                  </span>
                  <h4 className="font-display font-bold text-xs md:text-sm leading-tight text-slate-800 dark:text-white pt-1">
                    {step.title}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                  {step.description}
                </p>
                {idx < 5 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3.5 -translate-y-1/2 z-10 p-1 rounded-full bg-white dark:bg-black border border-slate-200 dark:border-zinc-800 text-slate-400 shadow">
                    <ChevronRight size={12} />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. SDG ALIGNMENT SECTION (OFFICIAL COLOR CODES) */}
      <section className={`py-16 px-4 md:px-8 border-y ${highContrast ? 'bg-black border-white' : 'bg-slate-900 text-white border-slate-800'}`} id="sdg-alignment">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-gold font-bold">Global Commitments</span>
            <h2 className="font-display font-black text-2xl md:text-4xl text-white">
              UN Sustainable Development Goals
            </h2>
            <p className="text-slate-400 text-xs md:text-sm">
              Raita Mitra maps every rural intervention directly to global indicators ensuring sustainable progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.sdgs.map((sdg, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-left flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl font-mono text-xl font-black ${sdg.color}`}>
                    {sdg.goalNumber}
                  </div>
                  <h3 className="font-display font-extrabold text-sm md:text-base text-white">
                    Goal {sdg.goalNumber}: {sdg.title}
                  </h3>
                </div>
                <p className="text-slate-400 text-xs font-sans leading-relaxed">
                  {sdg.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. BEFORE & AFTER INTERACTIVE DRAG SLIDER (REAL COMPONENT) */}
      <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto" id="interactive-comparisons">
        <div className="space-y-8 text-center">
          
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Visual Proof</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-forest'}`}>
              Impact Visualization
            </h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-2xl mx-auto">
              Drag or touch the handle back and forth to inspect real before/after agricultural and community transitions.
            </p>
          </div>

          {/* Slider Container */}
          <div 
            ref={sliderRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleMouseUp}
            className="relative aspect-video w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-2xl cursor-ew-resize select-none bg-slate-900"
          >
            {/* Before Image (Bottom) */}
            <img 
              src={data.beforeAfter.beforeImage} 
              alt="Before Intervention"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-mono uppercase font-bold rounded-lg tracking-wider">
              Before: {data.beforeAfter.beforeLabel}
            </div>

            {/* After Image (Top / Cropped) */}
            <div 
              className="absolute inset-y-0 left-0 right-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src={data.beforeAfter.afterImage} 
                alt="After Intervention"
                className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none"
                style={{ width: sliderRef.current?.getBoundingClientRect().width }}
                draggable={false}
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 bg-forest/90 backdrop-blur-md text-white text-[10px] font-mono uppercase font-bold rounded-lg tracking-wider">
                After: {data.beforeAfter.afterLabel}
              </div>
            </div>

            {/* Splitter Line & Handle */}
            <div 
              className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center shadow-2xl border-2 border-white pointer-events-none scale-90 md:scale-100">
                <ChevronLeft size={14} className="animate-pulse" />
                <ChevronRight size={14} className="animate-pulse" />
              </div>
            </div>

          </div>

          <p className="text-[11px] font-mono text-slate-400">
            Interactive drag mechanism. Touch/click drag handles to explore landscape changes.
          </p>

        </div>
      </section>

      {/* 7. BENEFICIARY STORIES SECTION */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto border-t border-slate-200 dark:border-zinc-800 font-sans" id="beneficiary-stories">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Personal Journeys</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-forest'}`}>
              Stories Of Transformation
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              Behind every metric is a real human life reclaimed. Read the personal narrative of our empowered community members.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Editorial Picture & Quote */}
            <div className="lg:col-span-5 relative aspect-square rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-zinc-800">
              <img 
                src={data.beneficiaryStories[activeStoryIdx].image} 
                alt={data.beneficiaryStories[activeStoryIdx].name} 
                className="w-full h-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              
              {/* Floating Quote Badge */}
              <div className="absolute bottom-6 inset-x-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md text-white border border-white/10 text-left">
                <p className="text-xs italic leading-relaxed font-sans mb-2">
                  &ldquo;{data.beneficiaryStories[activeStoryIdx].quote}&rdquo;
                </p>
                <div className="flex justify-between items-center text-[10px] font-mono text-gold font-bold uppercase tracking-wider">
                  <span>{data.beneficiaryStories[activeStoryIdx].name}</span>
                  <span>{data.beneficiaryStories[activeStoryIdx].location}</span>
                </div>
              </div>
            </div>

            {/* Narratives details */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono text-gold font-bold">{data.beneficiaryStories[activeStoryIdx].role}</span>
                <h3 className="font-display font-extrabold text-xl md:text-2xl text-slate-800 dark:text-white">
                  Meeting {data.beneficiaryStories[activeStoryIdx].name}
                </h3>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
                {data.beneficiaryStories[activeStoryIdx].narrative}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900 space-y-1.5">
                  <p className="text-[10px] font-mono uppercase text-rose-600 font-bold">The Challenge Prior:</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">{data.beneficiaryStories[activeStoryIdx].before}</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 space-y-1.5">
                  <p className="text-[10px] font-mono uppercase text-emerald-600 font-bold">The Sustainable Outcome:</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">{data.beneficiaryStories[activeStoryIdx].after}</p>
                </div>
              </div>

              {/* Story selector dots */}
              {data.beneficiaryStories.length > 1 && (
                <div className="flex gap-2">
                  {data.beneficiaryStories.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveStoryIdx(idx)}
                      className={`w-3 h-3 rounded-full transition-all cursor-pointer ${idx === activeStoryIdx ? 'bg-forest w-6' : 'bg-slate-200'}`}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 11. IMPACT DASHBOARD SECTION (5 INTERACTIVE CHARTS USING RECHARTS) */}
      <section className={`py-20 px-4 md:px-8 border-y ${highContrast ? 'bg-black border-white text-white' : 'bg-white border-slate-200'}`} id="dashboard">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Verified Analytics</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-forest'}`}>
              Program Performance Dashboard
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              Inspect live performance indexes, annual scale ratios, regional coverage divisions, and age demographics compiled directly from our registered field database.
            </p>
          </div>

          {/* Interactive Chart Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {[
              { id: 'growth', label: 'Beneficiary Scale' },
              { id: 'district', label: 'Territorial Division' },
              { id: 'progress', label: 'Baseline Comparison' },
              { id: 'gender', label: 'Beneficiary Division' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-forest text-white border-forest'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Active Recharts Panel */}
          <div className="p-6 md:p-10 rounded-3xl border border-slate-100 bg-slate-50/50 dark:bg-zinc-950/20 dark:border-zinc-800 min-h-[380px] flex items-center justify-center">
            
            {activeTab === 'growth' && (
              <div className="w-full h-[320px] space-y-2">
                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest text-center">Annual Growth Pattern (Beneficiary Headcount)</p>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.dashboard.beneficiaryGrowth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#047857" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#047857" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} fontClassName="font-mono" />
                    <YAxis stroke="#64748b" fontSize={11} fontClassName="font-mono" />
                    <Tooltip contentStyle={{ fontSize: '11px', fontFamily: 'monospace', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="value" stroke="#047857" strokeWidth={2.5} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeTab === 'district' && (
              <div className="w-full h-[320px] space-y-2">
                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest text-center">Active Villages Coverage by District</p>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.dashboard.districtCoverage}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ fontSize: '11px', fontFamily: 'monospace', borderRadius: '8px' }} />
                    <Bar dataKey="value" fill="#f59e0b" radius={[8, 8, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="w-full h-[320px] space-y-2">
                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest text-center">Target Performance (Baseline vs current achievement index %)</p>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.dashboard.yoyProgress}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ fontSize: '11px', fontFamily: 'monospace', borderRadius: '8px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                    <Bar dataKey="value" name="Baseline Index" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="secondary" name="Current Achieved Index" fill="#047857" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeTab === 'gender' && (
              <div className="w-full h-[320px] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="h-full">
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest text-center mb-4">Gender Distribution Split</p>
                  <ResponsiveContainer width="100%" height="80%">
                    <PieChart>
                      <Pie
                        data={data.dashboard.genderRatio}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {data.dashboard.genderRatio.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ fontSize: '11px', fontFamily: 'monospace', borderRadius: '8px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 text-xs font-mono">
                    {data.dashboard.genderRatio.map((entry, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                        <span>{entry.name}: {entry.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 text-left">
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">Enrollment Demographics Age Breakdown</p>
                  <div className="space-y-2">
                    {data.dashboard.ageDistribution.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
                          <span className="font-bold text-slate-800 dark:text-white">{item.value}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gold rounded-full" style={{ width: `${item.value}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 9. PHOTO GALLERY SECTION WITH LIGHTBOX */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="gallery">
        <div className="space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Field Chronicles</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-forest'}`}>
              Program Photo Gallery
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              Click any photo to open our high-resolution secure audit lightbox display.
            </p>
          </div>

          {/* Masonry Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
            {data.photoGallery.map((imgUrl, idx) => (
              <div 
                key={idx}
                onClick={() => openLightbox(imgUrl, idx)}
                className="break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 border border-slate-200 cursor-pointer bg-slate-900 group relative"
              >
                <img 
                  src={imgUrl} 
                  alt={`Audit photography ${idx + 1}`} 
                  className="w-full object-cover rounded-2xl group-hover:opacity-90 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white text-[10px] font-mono uppercase tracking-wider font-bold">
                    View Audit Frame
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-3 text-white bg-white/10 hover:bg-white/25 rounded-full transition-all cursor-pointer"
            >
              <X size={20} />
            </button>

            <button 
              onClick={prevLightbox}
              className="absolute left-4 p-3 text-white bg-white/10 hover:bg-white/25 rounded-full transition-all cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center space-y-4">
              <img 
                src={lightboxImage} 
                alt="Audit Photo Expanded" 
                className="max-w-full max-h-[75vh] object-contain rounded-xl border border-white/10 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <p className="font-mono text-xs text-slate-400">
                Frame {lightboxIdx + 1} of {data.photoGallery.length} • Certified geolocated intervention capture
              </p>
            </div>

            <button 
              onClick={nextLightbox}
              className="absolute right-4 p-3 text-white bg-white/10 hover:bg-white/25 rounded-full transition-all cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 10. VIDEO STORIES CAROUSEL */}
      <section className={`py-16 px-4 md:px-8 border-t ${highContrast ? 'bg-black border-white' : 'bg-slate-100 border-slate-200'}`} id="video-stories">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Bilingual Video Coverage</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-forest'}`}>
              Video Stories & Audits
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              Watch real baseline checks, equipment deployments, and beneficiary interviews recorded in Karnataka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {data.videoGallery.map((vid, idx) => (
              <div 
                key={idx}
                className={`rounded-2xl overflow-hidden border p-4 text-left space-y-4 transition-all duration-300 ${
                  highContrast 
                    ? 'bg-black border-white text-white' 
                    : 'bg-white border-slate-200 shadow-md hover:border-forest/30'
                }`}
              >
                {/* Thumbnails */}
                <div 
                  onClick={() => setActiveVideoUrl(vid.videoUrl)}
                  className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group bg-slate-900 border border-slate-200"
                >
                  <img 
                    src={vid.thumbnail} 
                    alt={vid.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gold text-white flex items-center justify-center shadow-2xl scale-95 group-hover:scale-100 transition-transform">
                      <Play size={20} className="fill-current translate-x-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/75 rounded text-[10px] font-mono text-white">
                    {vid.duration} mins
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-emerald-600 font-bold">VIDEO LOG #{idx + 1}</span>
                  <h4 className="font-display font-extrabold text-sm text-slate-800 dark:text-white leading-tight">
                    {vid.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* VIDEO DIALOG PLAYER MODAL */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-slate-950 rounded-2xl border border-white/10 w-full max-w-4xl p-2 relative shadow-2xl">
              <button 
                onClick={() => setActiveVideoUrl(null)}
                className="absolute -top-12 right-0 text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="aspect-video w-full rounded-xl overflow-hidden">
                <iframe 
                  src={activeVideoUrl} 
                  title="Video Player"
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 12. PROGRAM JOURNEY (TIMELINE MILESTONES) */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto" id="milestones">
        <div className="space-y-12 text-center">
          
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Historical Audits</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-forest'}`}>
              Program Journey & Milestones
            </h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-2xl mx-auto">
              Track major chronological development indices accomplished by Raita Mitra since baseline deployment.
            </p>
          </div>

          <div className="relative border-l border-slate-200 dark:border-zinc-800 ml-4 md:ml-32 space-y-8 text-left">
            {data.timeline.map((event, idx) => (
              <div key={idx} className="relative pl-8 group">
                {/* Marker Dot */}
                <div className="absolute -left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-gold border-2 border-white dark:border-black group-hover:scale-125 transition-transform" />
                
                {/* Floating Year label on desktop */}
                <div className="hidden md:block absolute -left-28 top-0.5 text-right w-20">
                  <span className="font-mono text-xs font-black text-forest dark:text-emerald-400 bg-forest/10 dark:bg-emerald-950/30 px-2 py-1 rounded border border-forest/20">
                    {event.year}
                  </span>
                </div>

                <div className={`p-5 rounded-2xl border ${
                  highContrast 
                    ? 'bg-black border-white text-white' 
                    : 'bg-white border-slate-100 shadow-sm'
                }`}>
                  <span className="md:hidden text-[10px] font-mono font-black text-forest dark:text-gold uppercase tracking-wider mb-1.5 inline-block">
                    {event.year}
                  </span>
                  <h4 className="font-display font-extrabold text-sm text-slate-800 dark:text-white">
                    {event.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans pt-1">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 13. KEY ACTIVITIES & OPERATIONS */}
      <section className={`py-16 px-4 md:px-8 border-y ${highContrast ? 'bg-black border-white' : 'bg-slate-100 border-slate-200'}`} id="key-activities">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Field Tasks</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-forest'}`}>
              Key Field Activities
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              Specific operations executed daily by our regional program officers and village volunteers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.activities.map((act, idx) => (
              <div 
                key={idx} 
                className={`p-6 rounded-2xl border text-left flex flex-col justify-between space-y-4 ${
                  highContrast 
                    ? 'bg-black border-white text-white' 
                    : 'bg-white border-slate-150 shadow-md'
                }`}
              >
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 px-2 py-0.5 rounded font-black inline-block">
                    Verified Task #{idx + 1}
                  </span>
                  <h4 className="font-display font-extrabold text-sm text-slate-800 dark:text-white">
                    {act.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans pt-1">
                    {act.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800">
                  <p className="text-[9px] font-mono uppercase text-slate-400">Current Field Capacity:</p>
                  <p className="text-xs font-bold text-forest dark:text-emerald-400 font-mono">{act.metric}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 14. RELATED EVENTS & WORKSHOPS */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto" id="events">
        <div className="space-y-10 text-center">
          
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Local Coordination</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-forest'}`}>
              Related Events & Workshops
            </h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-2xl mx-auto">
              Join or audit our live training programs and pricing panels. Attendance is open to authorized FCCC representatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {data.events.map((event, idx) => (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                  highContrast 
                    ? 'bg-black border-white text-white' 
                    : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono bg-amber-500 text-white font-extrabold px-2..5 py-0.5 rounded">
                      {event.status}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Calendar size={12} />
                      {event.date}
                    </span>
                  </div>
                  <h4 className="font-display font-extrabold text-sm text-slate-800 dark:text-white leading-snug">
                    {event.title}
                  </h4>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                  <MapPin size={12} className="text-gold" />
                  <span>{event.location}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 15. DOWNLOADS & RESOURCE REPOSITORY */}
      <section className={`py-16 px-4 md:px-8 border-y ${highContrast ? 'bg-black border-white' : 'bg-slate-100 border-slate-200'}`} id="downloads">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Document Repository</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-forest'}`}>
              Brochures & Publications
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              Access certified curriculum guides, soil diagnostics blueprints, and annual FCCC-verified field audit booklets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.downloads.map((doc, idx) => (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border flex justify-between items-center gap-4 ${
                  highContrast 
                    ? 'bg-black border-white text-white' 
                    : 'bg-white border-slate-150 shadow-sm hover:border-forest/20'
                }`}
              >
                <div className="space-y-1 text-left">
                  <span className="text-[9px] font-mono bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-slate-300 font-bold px-2 py-0.5 rounded">
                    {doc.type}
                  </span>
                  <h4 className="font-display font-bold text-xs md:text-sm leading-snug text-slate-800 dark:text-white pt-1">
                    {doc.title}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-400">File size: {doc.size} • Format: PDF</p>
                </div>

                <button 
                  className="p-3 bg-forest text-white hover:bg-forest-light rounded-xl transition-all shadow shrink-0 cursor-pointer"
                  title="Download File"
                  onClick={() => alert(`Initiating download for "${doc.title}"...`)}
                >
                  <Download size={14} />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 16. PROGRAM PARTNERS */}
      <section className="py-12 px-4 md:px-8 border-b border-slate-200 dark:border-zinc-800 overflow-hidden" id="partners">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Coordinated with certified CSR and trust institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            {data.partners.map((partner, idx) => (
              <div key={idx} className="text-center font-display font-extrabold text-slate-600 dark:text-slate-400 text-xs md:text-sm hover:opacity-100 transition-opacity">
                <span className="text-gold tracking-widest text-[9px] font-mono block uppercase">{partner.type}</span>
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 18. TESTIMONIALS (VOICES FROM COMMUNITIES) */}
      <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto font-sans" id="testimonials">
        <div className="space-y-12 text-center">
          
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Professional Backing</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-forest'}`}>
              Voices From Communities
            </h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-2xl mx-auto">
              Read how regional pediatric health experts, agricultural research directors, and municipal heads view Raita Mitra’s grassroots strategy.
            </p>
          </div>

          {data.testimonials.map((test, idx) => (
            <div 
              key={idx}
              className={`p-6 md:p-10 rounded-3xl border text-left space-y-6 relative ${
                highContrast 
                  ? 'bg-zinc-950 border-white text-white' 
                  : 'bg-white border-slate-100 shadow-xl'
              }`}
            >
              <p className="text-sm md:text-lg italic leading-relaxed text-slate-600 dark:text-slate-300 font-sans">
                &ldquo;{test.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4 border-t border-slate-100 dark:border-zinc-800 pt-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 shrink-0">
                  <img src={test.image} alt={test.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="text-left font-sans">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">{test.name}</h4>
                  <p className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">{test.designation} — {test.organization}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* 19. FAQ SECTION ACCORDION */}
      <section className={`py-16 px-4 md:px-8 border-y ${highContrast ? 'bg-black border-white' : 'bg-slate-100 border-slate-200'}`} id="faqs">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Frequently Asked Queries</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-forest'}`}>
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              Answers regarding our transparent monitoring systems, financing channels, and geographic registration parameters.
            </p>
          </div>

          <div className="space-y-4 text-left">
            {data.faqs.map((faq, idx) => {
              const isOpen = activeFaqIdx === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'border-forest/20 shadow bg-white dark:bg-zinc-950' 
                      : 'border-slate-200 bg-white/50 hover:bg-white dark:bg-black/20'
                  }`}
                >
                  <button
                    onClick={() => setActiveFaqIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 cursor-pointer font-bold select-none text-xs md:text-sm"
                  >
                    <span className="text-slate-800 dark:text-white font-display">{faq.question}</span>
                    <HelpCircle size={16} className="text-slate-400 shrink-0" />
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-slate-100 dark:border-zinc-800 overflow-hidden"
                      >
                        <p className="p-5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 20. RELATED PROGRAMS (AI RECOMMENDATION ENGINE) */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="related-programs">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-gold font-bold">Mitra Smart Matching</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-forest'}`}>
              Explore Related Programs
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              Our recommendation matching suggests adjacent programs that collaborate on agricultural and economic resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {getRelatedPrograms().map((prog) => (
              <div 
                key={prog.id}
                className={`group rounded-3xl overflow-hidden border text-left flex flex-col justify-between ${
                  highContrast 
                    ? 'bg-black border-white text-white' 
                    : 'bg-white border-slate-100 shadow-md hover:shadow-xl hover:border-forest/20'
                } transition-all duration-300`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img 
                    src={prog.heroFallbackImage} 
                    alt={prog.title} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <span className="absolute top-4 left-4 text-[9px] font-mono font-bold uppercase tracking-widest bg-forest text-white px-2.5 py-1 rounded-md">
                    Recommended Adjacent Core Pillar
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-sm md:text-base text-slate-800 dark:text-white group-hover:text-gold transition-colors leading-tight">
                      {prog.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-sans line-clamp-2">
                      {prog.tagline}
                    </p>
                  </div>

                  <button 
                    onClick={() => setActivePage(`programs/${prog.slug}`)}
                    className="w-full py-2.5 rounded-xl border border-slate-200 text-forest text-xs font-extrabold text-center hover:bg-forest hover:text-white hover:border-forest transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Inspect Recommended Pillar</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 21. DONATION BANNER SECTION */}
      <section className="relative py-20 px-4 md:px-8 text-center bg-slate-950 text-white overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 z-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1200" alt="Donate background" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="text-xs uppercase font-mono tracking-widest text-gold font-bold">Direct CSR Allocations</span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white">
            Support This Initiative Now
          </h2>
          <p className="text-slate-300 text-xs md:text-base max-w-2xl mx-auto">
            Enable smallholders and rural mothers to build robust financial barriers. Your donations are 100% tax-exempt under section 80G.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button 
              onClick={() => setActivePage('donate')} 
              className="px-6 py-3 bg-gold hover:bg-gold/90 text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer"
            >
              Donate Online Now
            </button>
            <button 
              onClick={() => setActivePage('contact')} 
              className="px-6 py-3 border border-slate-700 bg-white/5 hover:bg-white/10 text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer"
            >
              Become A CSR Partner
            </button>
          </div>
        </div>
      </section>

      {/* 22. VOLUNTEER BANNER SECTION */}
      <section className="py-20 px-4 md:px-8 text-center bg-forest text-white overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs uppercase font-mono tracking-widest text-gold font-bold">Empower On The Ground</span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white">
            Join Us As A Volunteer
          </h2>
          <p className="text-emerald-100 text-xs md:text-base max-w-2xl mx-auto">
            Contribute your technical, agricultural, or pedagogical skills directly to rural schools and cooperative dairies.
          </p>
          <button 
            onClick={() => setActivePage('volunteer')} 
            className="px-6 py-3 bg-white text-forest hover:bg-emerald-50 text-xs font-extrabold rounded-xl transition-all shadow-lg cursor-pointer"
          >
            Apply To Volunteer
          </button>
        </div>
      </section>

      {/* 23. NEWSLETTER SECTION */}
      <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto font-sans" id="newsletter">
        <div className={`p-8 md:p-12 rounded-3xl border text-center space-y-6 ${
          highContrast ? 'bg-zinc-950 border-white text-white' : 'bg-white border-slate-100 shadow-xl'
        }`}>
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono text-gold font-bold flex items-center justify-center gap-1.5">
              <Mail size={14} />
              Stay Updated
            </span>
            <h3 className={`font-display font-black text-xl md:text-3xl ${highContrast ? 'text-white' : 'text-forest'}`}>
              Subscribe to Our Field Newsletter
            </h3>
            <p className="text-slate-500 text-xs md:text-sm">
              Receive monthly audited field reviews, drone photography updates, and crop output reports.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!newsletterSubscribed ? (
              <motion.form 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
              >
                <input 
                  type="text" 
                  required
                  placeholder="Enter your name" 
                  value={newsletterName}
                  onChange={(e) => setNewsletterName(e.target.value)}
                  className="px-4 py-3 border border-slate-200 dark:border-zinc-800 rounded-xl text-xs font-sans w-full bg-white dark:bg-black focus:outline-forest focus:ring-1 focus:ring-forest text-slate-800 dark:text-white"
                />
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email address" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-3 border border-slate-200 dark:border-zinc-800 rounded-xl text-xs font-sans w-full bg-white dark:bg-black focus:outline-forest focus:ring-1 focus:ring-forest text-slate-800 dark:text-white"
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-forest text-white hover:bg-forest-light text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </motion.form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 max-w-md mx-auto text-center"
              >
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  Subscription Confirmed! Welcome to the Raita Mitra field ledger.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
}
