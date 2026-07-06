import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RaitaMitraLogoFull } from './RaitaMitraLogo';
import { 
  Sprout, 
  Menu, 
  X, 
  Search, 
  ChevronDown, 
  Settings, 
  Eye, 
  Type, 
  PhoneCall, 
  Download, 
  FileText, 
  Heart,
  Users,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  BookOpen,
  Image,
  Calendar,
  Newspaper,
  CircleHelp,
  Briefcase,
  Scale,
  CreditCard,
  Cookie
} from 'lucide-react';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  fontScale: number;
  setFontScale: (scale: number) => void;
  highContrast: boolean;
  setHighContrast: (contrast: boolean) => void;
  onSearch: (query: string) => void;
}

export default function Header({
  activePage,
  setActivePage,
  fontScale,
  setFontScale,
  highContrast,
  setHighContrast,
  onSearch
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProgramsDropdown, setShowProgramsDropdown] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(
    ['compliance', 'transparency', 'stories', 'gallery', 'events', 'media', 'resources', 'faq'].includes(activePage)
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (['compliance', 'transparency', 'stories', 'gallery', 'events', 'media', 'resources', 'faq'].includes(activePage)) {
      setMobileResourcesOpen(true);
    }
  }, [activePage]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setScrolled(scrollPos > 40);
    };

    // Use IntersectionObserver as the primary robust method (works beautifully in iframes)
    let observer: IntersectionObserver | null = null;
    const sentinel = document.getElementById('scroll-sentinel');

    if (sentinel && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        setScrolled(!entry.isIntersecting);
      });
      observer.observe(sentinel);
    }

    // Fallback/redundant scroll listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      if (observer && sentinel) {
        observer.unobserve(sentinel);
      }
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [activePage]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setShowSearch(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us', hasDropdown: true },
    { id: 'programs', label: 'Programs', hasDropdown: true },
    { id: 'resources', label: 'Resources', hasDropdown: true },
    { id: 'careers', label: 'Careers' },
    { id: 'blog', label: 'News & Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  const toggleContrast = () => {
    setHighContrast(!highContrast);
  };

  const scaleFont = (direction: 'up' | 'down') => {
    if (direction === 'up' && fontScale < 1.3) {
      setFontScale(fontScale + 0.1);
    } else if (direction === 'down' && fontScale > 0.9) {
      setFontScale(fontScale - 0.1);
    }
  };

  return (
    <>
      {/* Invisible Sentinel for Scroll Detection */}
      <div id="scroll-sentinel" className="absolute top-10 left-0 w-px h-px pointer-events-none opacity-0" />

      {/* Accessibility Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-gold focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold focus:outline-none"
        id="skip-link"
      >
        Skip to Content
      </a>

      {/* Top Banner (Audit & Trust Accents) */}
      <div className={`w-full text-xs h-10 px-4 flex justify-between items-center transition-all duration-300 ${
        activePage === 'home' && !scrolled && !highContrast
          ? 'absolute top-0 bg-emerald-950/45 text-white/90 border-b border-white/5 backdrop-blur-sm z-50'
          : `relative ${highContrast ? 'bg-black text-white border-b border-white z-50' : 'bg-forest-dark text-white'}`
      }`} id="top-utility-bar">
        <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
          <span className="flex items-center gap-1 font-mono tracking-wider opacity-90 text-[10px] md:text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            NGO Darpan Verification ID: KA/2023/0342549
          </span>
          <span className="hidden md:inline text-white/30">|</span>
          <span className="hidden md:inline font-mono tracking-wider opacity-90 text-[10px] md:text-xs">
            CSR Registration No: CSR00059487
          </span>
        </div>
        
        {/* Font scale and high contrast adjustments */}
        <div className="flex items-center gap-3">
          {/* Font Scaling Widget */}
          <div className="flex items-center bg-white/10 rounded-lg p-0.5" id="font-scale-widget">
            <button 
              onClick={() => scaleFont('down')}
              className="p-1 hover:bg-white/20 rounded text-white text-[10px] font-bold"
              aria-label="Decrease Font Size"
              title="Decrease Font Size"
            >
              A-
            </button>
            <span className="text-[10px] px-1.5 text-white/80 font-mono font-medium">Size</span>
            <button 
              onClick={() => scaleFont('up')}
              className="p-1 hover:bg-white/20 rounded text-white text-[10px] font-bold"
              aria-label="Increase Font Size"
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          <span className="text-white/30 text-xs">|</span>

          {/* Contrast Toggle */}
          <button 
            onClick={toggleContrast}
            className="flex items-center gap-1 px-2 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-mono tracking-wider font-semibold text-white cursor-pointer transition-all"
            aria-label="Toggle High Contrast Mode"
            title="Toggle High Contrast Mode"
            id="contrast-toggle-button"
          >
            <Eye size={11} />
            {highContrast ? 'STANDARD VIEW' : 'HIGH CONTRAST'}
          </button>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className={`z-40 transition-all duration-300 w-full ${
        activePage === 'home' && !scrolled && !highContrast 
          ? 'absolute top-10' 
          : 'sticky top-0'
      } ${
        highContrast 
          ? 'bg-black text-white border-b-2 border-white shadow-none' 
          : activePage === 'home' && !scrolled
            ? 'bg-transparent text-white shadow-none border-b border-white/10'
            : 'bg-white/95 text-slate-900 shadow-md backdrop-blur-md'
      }`} id="main-navigation-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo and Branding */}
          <button 
            onClick={() => { setActivePage('home'); setIsOpen(false); }}
            className="flex items-center text-left focus:outline-none focus:ring-2 focus:ring-forest cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            id="branding-logo-group"
            aria-label="Raita Mitra Home"
          >
            <RaitaMitraLogoFull 
              width={220} 
              height={52} 
              highContrast={highContrast} 
              theme={activePage === 'home' && !scrolled && !highContrast ? 'dark' : 'light'}
              className="h-12 md:h-14 w-auto"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" id="desktop-nav-menu" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isSelected = item.id === 'resources'
                ? ['compliance', 'transparency', 'stories', 'gallery', 'events', 'media', 'resources', 'faq'].includes(activePage)
                : activePage === item.id;
              const isTransparent = activePage === 'home' && !scrolled;
              
              if (item.id === 'about') {
                return (
                  <div 
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setShowAboutDropdown(true)}
                    onMouseLeave={() => setShowAboutDropdown(false)}
                  >
                    <button
                      className={`px-2 xl:px-3 py-2 rounded-lg font-display text-xs xl:text-sm font-semibold tracking-wide flex items-center gap-1 cursor-pointer transition-colors ${
                        highContrast
                          ? isSelected ? 'bg-white text-black underline' : 'hover:underline'
                          : isTransparent
                            ? isSelected ? 'text-white bg-white/20' : 'text-white/80 hover:text-white hover:bg-white/10'
                            : isSelected ? 'text-forest bg-forest/5' : 'text-slate-700 hover:text-forest hover:bg-slate-50'
                      }`}
                      aria-expanded={showAboutDropdown}
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${showAboutDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {showAboutDropdown && (
                        <motion.div 
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: 10 }}
                           transition={{ duration: 0.15 }}
                           className={`absolute left-0 mt-1 w-64 rounded-xl shadow-xl z-50 p-2 overflow-hidden ${
                             highContrast ? 'bg-black border-2 border-white' : 'bg-white border border-slate-100'
                           }`}
                        >
                          <div className="grid gap-1">
                            <button 
                              onClick={() => { setActivePage('about'); setIsOpen(false); }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                                highContrast ? 'hover:bg-white hover:text-black' : 'hover:bg-forest/5 hover:text-forest'
                              }`}
                            >
                              <Users size={14} />
                              Journey & Board of Trustees
                            </button>
                            <button 
                              onClick={() => { setActivePage('about'); setTimeout(() => {
                                document.getElementById('capability-approach')?.scrollIntoView({ behavior: 'smooth' });
                              }, 100); }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                                highContrast ? 'hover:bg-white hover:text-black' : 'hover:bg-forest/5 hover:text-forest'
                              }`}
                            >
                              <ShieldAlert size={14} />
                              Sen\'s Capability Approach
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              if (item.id === 'programs') {
                return (
                  <div 
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setShowProgramsDropdown(true)}
                    onMouseLeave={() => setShowProgramsDropdown(false)}
                  >
                    <button
                      className={`px-2 xl:px-3 py-2 rounded-lg font-display text-xs xl:text-sm font-semibold tracking-wide flex items-center gap-1 cursor-pointer transition-colors ${
                        highContrast
                          ? isSelected ? 'bg-white text-black underline' : 'hover:underline'
                          : isTransparent
                            ? isSelected ? 'text-white bg-white/20' : 'text-white/80 hover:text-white hover:bg-white/10'
                            : isSelected ? 'text-forest bg-forest/5' : 'text-slate-700 hover:text-forest hover:bg-slate-50'
                      }`}
                      aria-expanded={showProgramsDropdown}
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${showProgramsDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {showProgramsDropdown && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className={`absolute left-0 mt-1 w-80 rounded-xl shadow-xl z-50 p-2 overflow-hidden ${
                            highContrast ? 'bg-black border-2 border-white' : 'bg-white border border-slate-100'
                          }`}
                        >
                          <div className="grid gap-1">
                            {[
                              { label: 'Agriculture & Irrigation', icon: Sprout, id: 'agriculture' },
                              { label: 'Women & Livelihoods', icon: Users, id: 'women' },
                              { label: 'Digital & AI Skill Labs', icon: Type, id: 'education' }
                            ].map((prog) => (
                              <button 
                                key={prog.id}
                                onClick={() => { setActivePage('programs'); setIsOpen(false); }}
                                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
                                  highContrast ? 'hover:bg-white hover:text-black' : 'hover:bg-forest/5 hover:text-forest'
                                }`}
                              >
                                <prog.icon size={15} />
                                {prog.label}
                              </button>
                            ))}
                            <div className="border-t border-slate-100 my-1"></div>
                            <button 
                              onClick={() => { setActivePage('programs'); }}
                              className={`w-full text-center py-2 text-xs font-bold text-forest hover:underline cursor-pointer ${
                                highContrast ? 'text-white' : ''
                              }`}
                            >
                              Explore All 6 Programs
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              if (item.id === 'resources') {
                return (
                  <div 
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setShowResourcesDropdown(true)}
                    onMouseLeave={() => setShowResourcesDropdown(false)}
                  >
                    <button
                      className={`px-2 xl:px-3 py-2 rounded-lg font-display text-xs xl:text-sm font-semibold tracking-wide flex items-center gap-1 cursor-pointer transition-colors ${
                        highContrast
                          ? isSelected ? 'bg-white text-black underline' : 'hover:underline'
                          : isTransparent
                            ? 'text-white/80 hover:text-white hover:bg-white/10'
                            : isSelected ? 'text-forest bg-forest/5' : 'text-slate-700 hover:text-forest hover:bg-slate-50'
                      }`}
                      aria-expanded={showResourcesDropdown}
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${showResourcesDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {showResourcesDropdown && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className={`absolute left-0 mt-1 w-80 rounded-xl shadow-xl z-50 p-2 overflow-hidden ${
                            highContrast ? 'bg-black border-2 border-white' : 'bg-white border border-slate-100'
                          }`}
                        >
                          <div className="grid gap-1">
                            <button 
                              onClick={() => { setActivePage('compliance'); setIsOpen(false); }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-start gap-3 cursor-pointer transition-colors ${
                                highContrast ? 'hover:bg-white hover:text-black' : 'hover:bg-forest/5 hover:text-forest'
                              }`}
                            >
                              <FileText size={15} className="text-forest shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="font-semibold">CSR &amp; Compliance Hub</span>
                                <span className={`text-[10px] font-normal ${highContrast ? 'text-white/75' : 'text-slate-500'}`}>Statutory filings, certificates, and board compliance</span>
                              </div>
                            </button>
                            <button 
                              onClick={() => { setActivePage('transparency'); setIsOpen(false); }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-start gap-3 cursor-pointer transition-colors ${
                                highContrast ? 'hover:bg-white hover:text-black' : 'hover:bg-forest/5 hover:text-forest'
                              }`}
                            >
                              <TrendingUp size={15} className="text-gold shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="font-semibold">Annual Reports &amp; Transparency</span>
                                <span className={`text-[10px] font-normal ${highContrast ? 'text-white/75' : 'text-slate-500'}`}>Financial statements, audits, and balance sheets</span>
                              </div>
                            </button>
                            <button 
                              onClick={() => { setActivePage('stories'); setIsOpen(false); }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-start gap-3 cursor-pointer transition-colors ${
                                highContrast ? 'hover:bg-white hover:text-black' : 'hover:bg-forest/5 hover:text-forest'
                              }`}
                            >
                              <BookOpen size={15} className="text-amber-600 shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="font-semibold">Impact Stories</span>
                                <span className={`text-[10px] font-normal ${highContrast ? 'text-white/75' : 'text-slate-500'}`}>Real-world farmer success stories from our initiatives</span>
                              </div>
                            </button>
                            <button 
                              onClick={() => { setActivePage('gallery'); setIsOpen(false); }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-start gap-3 cursor-pointer transition-colors ${
                                highContrast ? 'hover:bg-white hover:text-black' : 'hover:bg-forest/5 hover:text-forest'
                              }`}
                            >
                              <Image size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="font-semibold">Gallery</span>
                                <span className={`text-[10px] font-normal ${highContrast ? 'text-white/75' : 'text-slate-500'}`}>Visual moments of our field training and events</span>
                              </div>
                            </button>
                            <button 
                              onClick={() => { setActivePage('events'); setIsOpen(false); }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-start gap-3 cursor-pointer transition-colors ${
                                highContrast ? 'hover:bg-white hover:text-black' : 'hover:bg-forest/5 hover:text-forest'
                              }`}
                            >
                              <Calendar size={15} className="text-sky-600 shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="font-semibold">Events &amp; Workshops</span>
                                <span className={`text-[10px] font-normal ${highContrast ? 'text-white/75' : 'text-slate-500'}`}>Upcoming training sessions, agricultural and digital skills camps</span>
                              </div>
                            </button>
                            <button 
                              onClick={() => { setActivePage('media'); setIsOpen(false); }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-start gap-3 cursor-pointer transition-colors ${
                                highContrast ? 'hover:bg-white hover:text-black' : 'hover:bg-forest/5 hover:text-forest'
                              }`}
                            >
                              <Newspaper size={15} className="text-amber-500 shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="font-semibold">Media &amp; Press Centre</span>
                                <span className={`text-[10px] font-normal ${highContrast ? 'text-white/75' : 'text-slate-500'}`}>Official newsroom, press releases, media kit, and resource hub</span>
                              </div>
                            </button>
                            <button 
                              onClick={() => { setActivePage('resources'); setIsOpen(false); }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-start gap-3 cursor-pointer transition-colors ${
                                highContrast ? 'hover:bg-white hover:text-black' : 'hover:bg-forest/5 hover:text-forest'
                              }`}
                            >
                              <BookOpen size={15} className="text-indigo-600 shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="font-semibold">Resource Centre &amp; Knowledge Hub</span>
                                <span className={`text-[10px] font-normal ${highContrast ? 'text-white/75' : 'text-slate-500'}`}>Centralized library, policy papers, SDG audits, case studies and presentations</span>
                              </div>
                            </button>
                            <button 
                              onClick={() => { setActivePage('faq'); setIsOpen(false); }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-start gap-3 cursor-pointer transition-colors ${
                                highContrast ? 'hover:bg-white hover:text-black' : 'hover:bg-forest/5 hover:text-forest'
                              }`}
                            >
                              <CircleHelp size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="font-semibold">FAQ Centre &amp; Help Desk</span>
                                <span className={`text-[10px] font-normal ${highContrast ? 'text-white/75' : 'text-slate-500'}`}>Answers regarding donations, 80G tax exemptions, MCA CSR and schedules</span>
                              </div>
                            </button>
                            <button 
                              onClick={() => { setActivePage('careers'); setIsOpen(false); }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-start gap-3 cursor-pointer transition-colors ${
                                highContrast ? 'hover:bg-white hover:text-black' : 'hover:bg-forest/5 hover:text-forest'
                              }`}
                            >
                              <Briefcase size={15} className="text-teal-600 shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="font-semibold">Careers &amp; Opportunities</span>
                                <span className={`text-[10px] font-normal ${highContrast ? 'text-white/75' : 'text-slate-500'}`}>Join us as a fellow, intern, researcher, coordinator or domain expert</span>
                              </div>
                            </button>
                            <button 
                              onClick={() => { setActivePage('privacy'); setIsOpen(false); }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-start gap-3 cursor-pointer transition-colors ${
                                highContrast ? 'hover:bg-white hover:text-black' : 'hover:bg-forest/5 hover:text-forest'
                              }`}
                            >
                              <ShieldCheck size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="font-semibold">Data Privacy &amp; Protection</span>
                                <span className={`text-[10px] font-normal ${highContrast ? 'text-white/75' : 'text-slate-500'}`}>DPDP Act compliance, digital footprint export and cookies preferences</span>
                              </div>
                            </button>
                            <button 
                              onClick={() => { setActivePage('terms'); setIsOpen(false); }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-start gap-3 cursor-pointer transition-colors ${
                                highContrast ? 'hover:bg-white hover:text-black' : 'hover:bg-forest/5 hover:text-forest'
                              }`}
                            >
                              <Scale size={15} className="text-amber-600 shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="font-semibold">Terms &amp; Conditions</span>
                                <span className={`text-[10px] font-normal ${highContrast ? 'text-white/75' : 'text-slate-500'}`}>Usage boundaries, legal safety, volunteer code and tax exemptions</span>
                              </div>
                            </button>
                            <button 
                              onClick={() => { setActivePage('refund'); setIsOpen(false); }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-start gap-3 cursor-pointer transition-colors ${
                                highContrast ? 'hover:bg-white hover:text-black' : 'hover:bg-forest/5 hover:text-forest'
                              }`}
                            >
                              <CreditCard size={15} className="text-blue-600 shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="font-semibold">Refund &amp; Cancellation</span>
                                <span className={`text-[10px] font-normal ${highContrast ? 'text-white/75' : 'text-slate-500'}`}>Refund procedures, duplicate transactions support and timelines</span>
                              </div>
                            </button>
                            <button 
                              onClick={() => { setActivePage('cookies'); setIsOpen(false); }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-start gap-3 cursor-pointer transition-colors ${
                                highContrast ? 'hover:bg-white hover:text-black' : 'hover:bg-forest/5 hover:text-forest'
                              }`}
                            >
                              <Cookie size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="font-semibold">Cookie Policy</span>
                                <span className={`text-[10px] font-normal ${highContrast ? 'text-white/75' : 'text-slate-500'}`}>Cookie usage preferences, managing controls and security</span>
                              </div>
                            </button>
                            <button 
                              onClick={() => { setActivePage('notfound'); setIsOpen(false); }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-start gap-3 cursor-pointer transition-colors ${
                                highContrast ? 'hover:bg-white hover:text-black' : 'hover:bg-forest/5 hover:text-forest'
                              }`}
                            >
                              <ShieldAlert size={15} className="text-rose-600 shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="font-semibold">404 Error Page</span>
                                <span className={`text-[10px] font-normal ${highContrast ? 'text-white/75' : 'text-slate-500'}`}>Test page-not-found layout, search tools and metrics</span>
                              </div>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => { setActivePage(item.id); setIsOpen(false); }}
                  className={`px-2 xl:px-3 py-2 rounded-lg font-display text-xs xl:text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
                    highContrast
                      ? isSelected ? 'bg-white text-black underline' : 'hover:underline'
                      : isTransparent
                        ? isSelected ? 'text-white bg-white/20' : 'text-white/80 hover:text-white hover:bg-white/10'
                        : isSelected ? 'text-forest bg-forest/5' : 'text-slate-700 hover:text-forest hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action and Search Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={() => setShowSearch(true)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                highContrast 
                  ? 'hover:bg-white hover:text-black border border-white' 
                  : activePage === 'home' && !scrolled
                    ? 'text-white/90 hover:bg-white/10'
                    : 'text-slate-600 hover:bg-slate-50'
              }`}
              aria-label="Open Search Site"
            >
              <Search size={18} />
            </button>

            <button 
              onClick={() => setActivePage('volunteer')}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                highContrast 
                  ? 'border-white text-white hover:bg-white hover:text-black' 
                  : activePage === 'home' && !scrolled
                    ? 'border-white/30 text-white hover:bg-white/15'
                    : 'border-forest/30 text-forest hover:bg-forest/5'
              }`}
            >
              Volunteer
            </button>

            <button 
              onClick={() => setActivePage('donate')}
              className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer ${
                highContrast 
                  ? 'bg-white text-black font-extrabold hover:underline' 
                  : 'bg-gold hover:bg-gold-light text-white font-semibold'
              }`}
            >
              <Heart size={14} className="fill-current" />
              Donate Now
            </button>
          </div>

          {/* Mobile Menu Trigger & Search */}
          <div className="flex lg:hidden items-center gap-2">
            <button 
              onClick={() => setShowSearch(true)}
              className={`p-2 rounded-lg cursor-pointer transition-colors ${
                highContrast 
                  ? 'border border-white text-white hover:bg-white hover:text-black' 
                  : activePage === 'home' && !scrolled
                    ? 'text-white hover:bg-white/10'
                    : 'text-slate-600 hover:bg-slate-50'
              }`}
              aria-label="Search Site"
            >
              <Search size={18} />
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg cursor-pointer transition-colors ${
                highContrast 
                  ? 'border border-white text-white hover:bg-white hover:text-black' 
                  : activePage === 'home' && !scrolled
                    ? 'text-white hover:bg-white/10'
                    : 'text-slate-600 hover:bg-slate-50'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden border-t w-full overflow-hidden ${
                highContrast ? 'bg-black border-white' : 'bg-white border-slate-100'
              }`}
              id="mobile-nav-panel"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  if (item.id === 'resources') {
                    return (
                      <div key={item.id} className="space-y-1">
                        <button
                          onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl font-display font-semibold text-sm transition-colors cursor-pointer flex items-center justify-between ${
                            mobileResourcesOpen || ['compliance', 'transparency', 'stories', 'gallery', 'events', 'media', 'resources', 'faq', 'careers'].includes(activePage)
                              ? highContrast ? 'bg-white text-black underline font-bold' : 'bg-forest/5 text-forest font-bold'
                              : highContrast ? 'hover:underline' : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown size={16} className={`transition-transform duration-200 ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {mobileResourcesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-1 overflow-hidden"
                            >
                              {[
                                { label: 'CSR & Compliance', id: 'compliance' },
                                { label: 'Annual Reports', id: 'transparency' },
                                { label: 'Impact Stories', id: 'stories' },
                                { label: 'Gallery', id: 'gallery' },
                                { label: 'Events & Workshops', id: 'events' },
                                { label: 'Media & Press Centre', id: 'media' },
                                { label: 'Resource Centre & Knowledge Hub', id: 'resources' },
                                { label: 'FAQ Centre & Help Desk', id: 'faq' },
                                { label: 'Careers & Opportunities', id: 'careers' },
                                { label: 'Privacy & Data Protection', id: 'privacy' },
                                { label: 'Terms & Conditions', id: 'terms' },
                                { label: 'Refund & Cancellation Policy', id: 'refund' },
                                { label: 'Cookie Policy', id: 'cookies' },
                                { label: '404 Error Page', id: 'notfound' }
                              ].map((sub) => (
                                <button
                                  key={sub.id}
                                  onClick={() => { setActivePage(sub.id); setIsOpen(false); }}
                                  className={`w-full text-left px-3 py-2 rounded-lg font-display text-xs font-semibold transition-colors cursor-pointer ${
                                    highContrast
                                      ? activePage === sub.id ? 'bg-white text-black underline' : 'hover:underline'
                                      : activePage === sub.id ? 'bg-forest/10 text-forest font-bold' : 'text-slate-600 hover:bg-slate-50'
                                  }`}
                                >
                                  {sub.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActivePage(item.id); setIsOpen(false); }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl font-display font-semibold text-sm transition-colors cursor-pointer ${
                        highContrast
                          ? activePage === item.id ? 'bg-white text-black underline' : 'hover:underline'
                          : activePage === item.id ? 'bg-forest/5 text-forest' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
                
                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => { setActivePage('volunteer'); setIsOpen(false); }}
                    className={`w-full py-2.5 text-center text-xs font-bold rounded-xl border cursor-pointer ${
                      highContrast ? 'border-white hover:bg-white hover:text-black' : 'border-forest/30 text-forest'
                    }`}
                  >
                    Volunteer
                  </button>

                  <button 
                    onClick={() => { setActivePage('donate'); setIsOpen(false); }}
                    className={`w-full py-2.5 text-center text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer ${
                      highContrast ? 'bg-white text-black hover:underline' : 'bg-gold hover:bg-gold-light text-white'
                    }`}
                  >
                    <Heart size={13} className="fill-current" />
                    Donate
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Search Overlay Modal */}
      <AnimatePresence>
        {showSearch && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-xl rounded-2xl shadow-2xl p-4 overflow-hidden ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white'
              }`}
            >
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Search programs, financial reports, compliance documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`flex-1 px-4 py-2.5 text-sm rounded-xl outline-none focus:ring-2 focus:ring-forest ${
                    highContrast ? 'bg-black border border-white text-white' : 'bg-slate-100 border-none'
                  }`}
                  autoFocus
                  required
                />
                <button 
                  type="submit"
                  className={`px-4 rounded-xl text-sm font-bold cursor-pointer ${
                    highContrast ? 'bg-white text-black' : 'bg-forest hover:bg-forest-light text-white'
                  }`}
                >
                  Search
                </button>
              </form>
              <div className="mt-3 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>PRESS ENTER TO SUBMIT</span>
                <button 
                  onClick={() => setShowSearch(false)}
                  className="hover:underline cursor-pointer"
                >
                  CLOSE [ESC]
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
