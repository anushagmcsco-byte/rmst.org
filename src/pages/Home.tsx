import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, 
  Users, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  FileDown, 
  HeartHandshake, 
  Award, 
  Heart,
  Globe,
  Leaf,
  Laptop,
  HeartPulse,
  Trees,
  Store,
  Check,
  Briefcase,
  GraduationCap,
  Download,
  Calendar,
  Eye,
  FileText,
  Clock
} from 'lucide-react';
import { programsData } from '../data/programs';
import { impactStories, testimonials } from '../data/stories';
import KarnatakaImpactMap from '../components/KarnatakaImpactMap';
import home1 from '../../home_1.jpg';
import home2 from '../../home_2.jpg';
import homePartnerWithUs from '../../home_partner_with_us.jpg';

interface HomeProps {
  setActivePage: (page: string) => void;
  highContrast: boolean;
}

export default function Home({ setActivePage, highContrast }: HomeProps) {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ farmers: 0, youth: 0, livelihoods: 0 });
  const [activeGalleryTab, setActiveGalleryTab] = useState('all');
  
  // Interactive Focus Area Modal State
  const [selectedFocusArea, setSelectedFocusArea] = useState<any | null>(null);

  // CSR Brochure download simulation state
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [downloadStep, setDownloadStep] = useState<'form' | 'progress' | 'complete'>('form');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [corporateName, setCorporateName] = useState('');
  const [corporateEmail, setCorporateEmail] = useState('');
  const [downloadError, setDownloadError] = useState('');
  const [homeNewsletterName, setHomeNewsletterName] = useState('');
  const [homeNewsletterEmail, setHomeNewsletterEmail] = useState('');

  const handleHomeNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeNewsletterEmail) return;

    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'Newsletter Signup',
        name: homeNewsletterName || 'Homepage Subscriber',
        email: homeNewsletterEmail,
        phone: '',
        subject: 'Home Newsletter Signup',
        message: 'Subscribed to newsletter updates from Home page.',
        metadata: { page: 'Home' }
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Homepage newsletter subscriber logged:', data);
    })
    .catch(err => {
      console.error('Error logging homepage newsletter subscription:', err);
    });

    alert('Newsletter Subscription completed successfully!');
    setHomeNewsletterName('');
    setHomeNewsletterEmail('');
  };

  // Cinematic Hero Slide Images (Drone shots, SHGs, Classrooms, Tree plantations)
  const heroSlides = [
    {
      url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1600",
      tag: "Regenerative Systems",
      title: "Drone Shots of Karnataka Farms",
      desc: "Deploying high-altitude crop analytics and soil carbon indexing for precision agrarian development."
    },
    {
      url: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=1600",
      tag: "Agrarian Uplift",
      title: "Farmers in Dharwad & Belagavi",
      desc: "Guiding over 5,000 marginal farmers in zero-debt organic agriculture and micro-irrigation systems."
    },
    {
      url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1600",
      tag: "Gender Equity",
      title: "Women Empowerment SHGs",
      desc: "Setting up automated community dairy cooperatives and revolving micro-credit networks."
    },
    {
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1600",
      tag: "Digital Inclusion",
      title: "Rural Youth Learning AI Skills",
      desc: "Establishing Smart Digital Labs in government high schools to nurture critical tech pipelines."
    },
    {
      url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600",
      tag: "Eco-Restoration",
      title: "Tree Plantation Drives",
      desc: "Recharging vital aquifers with Miyawaki micro-forest arrays and organic lake desilting projects."
    }
  ];

  // Carousel Success Stories
  const [activeStory, setActiveStory] = useState(0);

  // Gallery Masonry Images (Dynamic from localStorage if available)
  const [galleryImages, setGalleryImages] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('raita_mitra_gallery_list');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed)) {
          return parsed.map((item: any, idx: number) => {
            const tag = (item.tags?.[0] || 'Agriculture').toLowerCase();
            let category = 'agriculture';
            if (tag.includes('women') || tag.includes('empowerment')) {
              category = 'women';
            } else if (tag.includes('education') || tag.includes('skill') || tag.includes('stem') || tag.includes('ai') || tag.includes('python')) {
              category = 'education';
            } else if (tag.includes('climate') || tag.includes('environment') || tag.includes('eco')) {
              category = 'climate';
            } else if (tag.includes('health')) {
              category = 'health';
            }
            return {
              id: item.id || `home_photo_${idx}`,
              category,
              url: item.url || item.image || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600',
              title: item.title
            };
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
    return [
      { id: 1, category: 'agriculture', url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600', title: 'Solar-Powered Drip Irrigation Setup' },
      { id: 2, category: 'women', url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=600', title: 'Yaraguppi Dairy Cooperative Ledger Review' },
      { id: 3, category: 'education', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600', title: 'High School Girls Exploring Scratch Coding' },
      { id: 4, category: 'health', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600', title: 'Mobile Diagnostic Pediatric Screening' },
      { id: 5, category: 'climate', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600', title: 'Watershed Bunding & Sapling Afforestation' },
      { id: 6, category: 'agriculture', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600', title: 'Millet Processing Unit Packaging' },
      { id: 7, category: 'agriculture', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600', title: 'Taluk Agrarian Advisory Assembly' },
      { id: 8, category: 'agriculture', url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600', title: 'Harvesting Diversified Horticulture Crops' }
    ];
  });

  // Fetch gallery list from server on mount
  useEffect(() => {
    fetch('/api/gallery')
      .then(res => {
        if (!res.ok) throw new Error('API response not ok');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item: any, idx: number) => {
            const tag = (item.tags?.[0] || 'Agriculture').toLowerCase();
            let category = 'agriculture';
            if (tag.includes('women') || tag.includes('empowerment')) {
              category = 'women';
            } else if (tag.includes('education') || tag.includes('skill') || tag.includes('stem') || tag.includes('ai') || tag.includes('python')) {
              category = 'education';
            } else if (tag.includes('climate') || tag.includes('environment') || tag.includes('eco')) {
              category = 'climate';
            } else if (tag.includes('health')) {
              category = 'health';
            }
            return {
              id: item.id || `home_photo_${idx}`,
              category,
              url: item.url || item.image || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600',
              title: item.title
            };
          });
          setGalleryImages(formatted);
          localStorage.setItem('raita_mitra_gallery_list', JSON.stringify(data));
        }
      })
      .catch(err => console.warn('Failed to load home gallery from server:', err));
  }, []);

  const filteredGallery = activeGalleryTab === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeGalleryTab);

  // Crossfading slide interval
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [heroSlides.length]);

  // Staggered counter effect
  useEffect(() => {
    const duration = 1800;
    const interval = 30;
    const steps = duration / interval;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setAnimatedStats({
        farmers: Math.min(Math.floor((5000 / steps) * step), 5000),
        youth: Math.min(Math.floor((3000 / steps) * step), 3000),
        livelihoods: Math.min(Math.floor((1500 / steps) * step), 1500),
      });
      if (step >= steps) {
        clearInterval(timer);
        setAnimatedStats({ farmers: 5000, youth: 3000, livelihoods: 1500 });
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const focusAreaIcons = {
    agriculture: Leaf,
    women: Users,
    education: Laptop,
    health: HeartPulse,
    climate: Trees,
    entrepreneurship: Store
  };

  // Trigger simulated brochure download progression
  const startBrochureDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!corporateName.trim() || !corporateEmail.trim()) {
      setDownloadError('All fields are required.');
      return;
    }
    if (!corporateEmail.includes('@')) {
      setDownloadError('Please provide a valid corporate email.');
      return;
    }

    // POST corporate prospectus download to Server backend
    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'Partner Onboarding',
        name: corporateName,
        email: corporateEmail,
        phone: '',
        subject: 'Prospectus & Audited Logs Download Request',
        message: 'Requested download access for CSR audited files, MCA clearance forms, and compliance folders.',
        metadata: {
          corporateName,
          requestType: 'Prospectus Download'
        }
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Prospectus download request logged:', data);
    })
    .catch(err => {
      console.error('Error logging prospectus download:', err);
    });

    setDownloadError('');
    setDownloadStep('progress');
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDownloadStep('complete'), 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="w-full flex flex-col items-center bg-soft-bg text-slate-800" id="home-page-view">
      
      {/* 1. CINEMATIC FULLSCREEN HERO SECTION (100vh) */}
      <section className="relative w-full min-h-screen lg:h-screen flex items-center justify-center overflow-hidden bg-slate-950 px-4 md:px-8 border-b border-white/5" id="hero-section">
        
        {/* Background Crossfading Images Carousel */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.45, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="w-full h-full absolute inset-0"
            >
              <img 
                src={heroSlides[currentHeroSlide].url} 
                alt={heroSlides[currentHeroSlide].title} 
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>
          {/* Symmetrical dark ambient overlays complying with WCAG contrast ratios */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent to-slate-950/50"></div>
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-28 sm:pt-32 lg:pt-36 pb-20 lg:pb-12">
          
          {/* Main Copywriting block */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Micro tag */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase ${
              highContrast ? 'bg-white text-black' : 'bg-forest/30 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm'
            }`}>
              <Sparkles size={13} className="animate-pulse text-gold" />
              Where Grassroots Action Meets Sustainable Impact
            </div>

            {/* Premium Headline */}
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              Empowering Farmers, <br />
              <span className={`text-gold ${highContrast ? 'underline' : ''}`}>Strengthening Communities</span>.
            </h1>

            {/* Descriptive Subheadline */}
            <p className="text-slate-300 text-sm md:text-lg max-w-2xl leading-relaxed font-sans">
              Raita Mitra Social Trust (R) transforms rural life across Karnataka. We operate at the intersection of climate action, tech integration, and women-led financial autonomy.
            </p>

            {/* Horizontal Trust Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { label: 'NGO Darpan Verified', id: 'KA/2023/0342549' },
                { label: 'MCA CSR-1 Registered', id: 'CSR00059487' },
                { label: '12A Income Tax Approved', id: 'Sec 12A(1)(ac)' },
                { label: '80G Exemption', id: 'Tax Benefit' }
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[10px] md:text-xs text-slate-300 font-semibold font-mono backdrop-blur-sm hover:border-white/20 transition-colors">
                  <Award size={13} className="text-gold shrink-0" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setActivePage('donate')}
                className={`px-6 py-4 text-xs font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all cursor-pointer ${
                  highContrast ? 'bg-white text-black hover:underline' : 'bg-gold hover:bg-gold-light text-white'
                }`}
              >
                <Heart size={15} className="fill-current" />
                Donate Now
              </button>

              <button 
                onClick={() => setActivePage('contact')}
                className="px-6 py-4 text-xs font-extrabold rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
              >
                <HeartHandshake size={15} />
                Partner With Us
              </button>

              <button 
                onClick={() => setShowBrochureModal(true)}
                className="px-6 py-4 text-xs font-extrabold rounded-xl bg-transparent hover:bg-white/5 text-slate-300 hover:text-white transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
              >
                <FileDown size={14} />
                Download CSR Brochure
              </button>
            </div>
          </div>

          {/* Floating High-Contrast Trust Metrics Bento */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className={`p-6 md:p-8 rounded-3xl w-full max-w-sm border transition-all ${
              highContrast 
                ? 'bg-black border-white text-white shadow-none' 
                : 'bg-slate-900/60 border-slate-800 backdrop-blur-md shadow-2xl hover:border-slate-700'
            }`} id="hero-stats-card">
              <span className="text-[10px] font-mono tracking-wider text-gold font-bold uppercase block mb-1">Direct Field Outputs</span>
              <h3 className="font-display font-extrabold text-white text-lg border-b border-white/10 pb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-gold" />
                Third-Party Audited Impact
              </h3>
              
              <div className="space-y-5 pt-6">
                {[
                  { value: `${animatedStats.farmers}+`, label: 'Farmers Empowered', desc: 'Transitioned to organic, soil-rebuilt systems' },
                  { value: `${animatedStats.youth}+`, label: 'Rural Youth Trained', desc: 'Acquired foundational digital & AI literacy' },
                  { value: `${animatedStats.livelihoods}+`, label: 'Livelihoods Supported', desc: 'Women SHG enterprise structures founded' }
                ].map((stat, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <span className="text-2xl md:text-3xl font-display font-extrabold text-gold font-mono tracking-tight shrink-0 w-24">
                      {stat.value}
                    </span>
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-white font-sans leading-none">{stat.label}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 font-sans leading-snug">{stat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>ESTABLISHED 2021</span>
                <span>NITI AAYOG ID: KA/2023/0342549</span>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Trust Bar - Sticky Glass Bar directly aligned at Hero Bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full bg-slate-950/40 border-t border-white/5 backdrop-blur-sm py-4 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-400">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Registry Verification:</span>
            <div className="flex flex-wrap justify-center gap-6 text-center">
              <span>NGO DARPAN: <strong className="text-white">KA/2023/0342549</strong></span>
              <span>CSR REGISTRATION: <strong className="text-white">CSR00059487</strong></span>
              <span>PAN: <strong className="text-white">AAETR3286K</strong></span>
              <span>80G REGISTRY: <strong className="text-white">AAETR3286KF20231</strong></span>
            </div>
          </div>
        </div>

      </section>

      {/* GROUND LEVEL IMPACT PHOTO SHOWCASE */}
      <section className={`py-16 px-4 md:px-8 w-full border-b ${
        highContrast ? 'bg-black border-white text-white' : 'bg-slate-50/40 border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Field-Validated Interventions</span>
            <h2 className={`font-display font-extrabold text-2xl md:text-3xl leading-tight ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Our Active Ground-Level Operations
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Real-time physical snapshots from our ongoing projects across Karnataka, delivering targeted agricultural support and sustainable livelihood systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Card 1: Sustainable Agriculture */}
            <div className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 shadow-md hover:shadow-xl flex flex-col h-full ${
              highContrast ? 'bg-black border-white' : 'bg-white border-slate-100'
            }`}>
              <div className="relative h-64 sm:h-80 overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                <img 
                  src={home1} 
                  alt="Raita Mitra Sustainable Agriculture Operations" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 text-[10px] font-mono font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full shadow-sm border border-emerald-200/50">
                  <Sprout size={12} className="text-emerald-600 animate-bounce" />
                  Eco-Farming Initiative
                </span>
              </div>
              <div className="p-6 text-left space-y-2 flex-grow">
                <h3 className={`font-display font-bold text-lg ${
                  highContrast ? 'text-white' : 'text-slate-900'
                }`}>
                  Sustainable Farming &amp; Watershed Management
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Direct agricultural interventions in Hubballi. Restoring soil microbiomes, developing decentralized rain-water recharge systems, and transitioning smallholder farmers to zero-debt organic cultivation.
                </p>
              </div>
            </div>

            {/* Image Card 2: Livelihood Training */}
            <div className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 shadow-md hover:shadow-xl flex flex-col h-full ${
              highContrast ? 'bg-black border-white' : 'bg-white border-slate-100'
            }`}>
              <div className="relative h-64 sm:h-80 overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                <img 
                  src={home2} 
                  alt="Raita Mitra Women SHG Enterprise Training" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 text-[10px] font-mono font-extrabold uppercase tracking-widest text-rose-800 bg-rose-50 px-3 py-1.5 rounded-full shadow-sm border border-rose-200/50">
                  <Laptop size={12} className="text-rose-600" />
                  Livelihood &amp; SHG Batches
                </span>
              </div>
              <div className="p-6 text-left space-y-2 flex-grow">
                <h3 className={`font-display font-bold text-lg ${
                  highContrast ? 'text-white' : 'text-slate-900'
                }`}>
                  Women-Led Self-Help Groups &amp; Skill Development
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Empowering rural women through tailoring micro-enterprises, digital literacy certification, and collaborative marketing structures to build high-margin sustainable household incomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-24 px-4 md:px-8 w-full border-b ${highContrast ? 'bg-black border-white' : 'bg-white border-slate-100'}`} id="who-we-are">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Deep Storytelling Text Block */}
          <div className="lg:col-span-7 space-y-6 text-left animate-fade-in">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Our Governance Ethos</span>
            <h2 className={`font-display font-extrabold text-3xl md:text-4xl leading-tight ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Building Sustainable Communities Since 2021
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Raita Mitra Social Trust (R) was established in Hubballi, Karnataka to strengthen rural ecosystems through sustainable agriculture, skill development, women empowerment, health initiatives, climate resilience, and entrepreneurship.
            </p>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              We translate institutional CSR capital into audited, localized interventions. Guided by Amartya Sen’s Capability Approach, we prioritize enhancing freedoms and choices for smallholders rather than implementing dry, top-down dependencies.
            </p>

            <div className="pt-4">
              <button 
                onClick={() => setActivePage('about')}
                className={`text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                  highContrast ? 'text-white underline' : 'text-forest hover:text-forest-light'
                }`}
              >
                Learn about our journey &amp; compliance frameworks
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Side: Governance Integrity Banner & Checkmark Bento Metrics Stacked */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Micro Trust Banner matching Tata standards */}
            <div className={`flex items-start gap-3.5 p-5 rounded-2xl border ${
              highContrast 
                ? 'bg-black border-white text-white' 
                : 'bg-emerald-50/50 border-emerald-100/40 text-emerald-950 shadow-sm'
            }`}>
              <ShieldCheck size={24} className="text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-left space-y-1">
                <p className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-emerald-800">Governance Integrity Guarantee</p>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Our projects match Tata Trusts &amp; leading transparency guidelines, backed by geo-tagged milestone verification.
                </p>
              </div>
            </div>

            {/* Checkmark Bento Metrics Grid */}
            <div className="space-y-4">
              <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-100/80 flex gap-3.5 items-start shadow-sm">
                <CheckCircle2 size={18} className="text-forest shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">100% Geo-tagged Milestones</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">Our audits compile physical, photographic, and location-registered logs of every active watershed and solar grid.</p>
                </div>
              </div>
              <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-100/80 flex gap-3.5 items-start shadow-sm">
                <CheckCircle2 size={18} className="text-forest shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Zero-Debt Farming Transition</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">Eliminating heavy synthetic agricultural cost chains through decentralized vermicomposting and traditional seed vaults.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE FOCUS AREAS (3x2 Interactive Grid Section) */}
      <section className={`py-24 px-4 md:px-8 w-full ${
        highContrast ? 'bg-black text-white' : 'bg-slate-50 border-b border-slate-100'
      }`} id="focus-areas">
        <div className="max-w-7xl mx-auto">
          
          {/* Grid Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Our Pillars</span>
            <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Our Core Focus Areas
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              We design intertwined vertical projects to address structural village vulnerabilities. Hover or select a program card to view exact intervention summaries.
            </p>
          </div>

          {/* Interactive 3x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programsData.map((prog) => {
              const Icon = focusAreaIcons[prog.id as keyof typeof focusAreaIcons] || Sprout;
              return (
                <div 
                  key={prog.id}
                  onClick={() => setSelectedFocusArea(prog)}
                  className={`group rounded-3xl border p-6 text-left flex flex-col justify-between transition-all duration-300 shadow-soft-elevation hover:shadow-2xl cursor-pointer ${
                    highContrast 
                      ? 'bg-black border-white text-white' 
                      : 'bg-white border-slate-100 hover:-translate-y-1.5'
                  }`}
                  id={`focus-card-${prog.id}`}
                >
                  <div className="space-y-4">
                    {/* Floating Icon Header */}
                    <div className="flex justify-between items-start">
                      <div className={`p-3 rounded-2xl ${
                        highContrast ? 'bg-white text-black' : 'bg-forest/5 text-forest group-hover:bg-forest group-hover:text-white transition-colors duration-300'
                      }`}>
                        <Icon size={22} className="stroke-[2.5]" />
                      </div>
                      <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded uppercase ${
                        highContrast ? 'bg-white text-black' : 'bg-slate-100 text-slate-500'
                      }`}>
                        ACTIVE INTERVENTION
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className={`font-display font-extrabold text-lg leading-snug group-hover:text-forest transition-colors ${
                      highContrast ? 'text-white' : 'text-slate-800'
                    }`}>
                      {prog.title}
                    </h3>

                    {/* Brief Tagline Description */}
                    <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-3">
                      {prog.description}
                    </p>

                    {/* Micro-Metrics Bento Segment */}
                    <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100 mt-4">
                      {prog.keyMetrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="bg-slate-50 p-2 rounded-xl border border-slate-100/50">
                          <p className="text-[9px] font-mono text-slate-400 leading-none uppercase">{m.label}</p>
                          <p className={`text-xs font-bold font-mono mt-1 ${highContrast ? 'text-white' : 'text-forest'}`}>{m.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Details trigger */}
                  <div className="mt-6 pt-3 flex justify-between items-center text-xs font-extrabold uppercase tracking-wider">
                    <span className={highContrast ? 'text-white underline' : 'text-forest group-hover:text-forest-light'}>
                      Expand Action Plan
                    </span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FOCUS AREA ACCORDION MODAL OVERLAY */}
      <AnimatePresence>
        {selectedFocusArea && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-2xl rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden text-left ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-gold/10 text-gold px-2 py-0.5 rounded font-bold">
                    Direct Action Framework
                  </span>
                  <h3 className="font-display font-extrabold text-xl md:text-2xl text-slate-800 mt-1">
                    {selectedFocusArea.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedFocusArea(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <ChevronRight size={22} className="rotate-90" />
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 font-sans">
                <div>
                  <h4 className="text-xs uppercase font-mono font-bold text-slate-400">Detailed Intervention Plan</h4>
                  <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">{selectedFocusArea.detailedOverview}</p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-mono font-bold text-slate-400">Target Beneficiary Segment</h4>
                  <p className="text-xs font-semibold text-slate-800 mt-1">{selectedFocusArea.beneficiaries}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {selectedFocusArea.keyMetrics.map((m: any, idx: number) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                      <p className="text-[9px] font-mono text-slate-400 leading-none uppercase">{m.label}</p>
                      <p className="text-sm font-extrabold font-mono text-forest mt-1">{m.value}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <h4 className="text-xs uppercase font-mono font-bold text-slate-400 mb-2">Primary Intervention Highlights</h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {selectedFocusArea.highlights.map((h: string, idx: number) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <Check size={14} className="text-forest shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setSelectedFocusArea(null)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                >
                  Close Panel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. GEOGRAPHIC FOOTPRINT (Karnataka Impact Map Segment) */}
      <section className={`py-24 px-4 md:px-8 w-full border-b ${
        highContrast ? 'bg-black border-white' : 'bg-white border-slate-100'
      }`} id="geographic-impact-map">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Field Coverage</span>
            <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Our Presence Across Karnataka
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              We work directly with marginal farmers and dryland micro-clusters across Northern Karnataka. Select a specific district on our interactive SVG map to load physical indicators.
            </p>
          </div>

          {/* Interactive Map Component */}
          <KarnatakaImpactMap highContrast={highContrast} />
          
        </div>
      </section>

      {/* 5. CSR CO-INVESTMENT & PARTNERSHIPS BANNER (Full Width) */}
      <section className="relative w-full py-20 px-4 md:px-8 bg-forest text-white overflow-hidden text-left" id="csr-banner">
        
        {/* Background Image with Deep Contrast Overlay */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img 
            src={homePartnerWithUs} 
            alt="Corporate NGO collaboration" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/95 to-transparent z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono uppercase bg-white/10 text-emerald-300 px-3 py-1 rounded-full font-bold inline-block">
              ESG Compliance & Co-investment
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight leading-tight">
              Partner With Us To Create <br />Sustainable Impact
            </h2>
            <p className="text-sm md:text-base text-slate-100 leading-relaxed font-sans max-w-3xl">
              Raita Mitra handles institutional ESG commitments under strict governance logs. We supply fully audited quarterly baseline logs, geo-tagged activity milestones, third-party validation, and complete Sec 80G tax clearance certificates.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 w-full">
            <button 
              onClick={() => setActivePage('contact')}
              className={`px-6 py-4 text-xs font-extrabold rounded-xl shadow-xl cursor-pointer text-center whitespace-nowrap transition-all hover:scale-[1.02] ${
                highContrast ? 'bg-white text-black' : 'bg-gold hover:bg-gold-light text-white'
              }`}
            >
              Become a CSR Partner
            </button>
            <button 
              onClick={() => setActivePage('compliance')}
              className="px-6 py-4 text-xs font-extrabold rounded-xl bg-forest-dark hover:bg-forest-light border border-white/25 text-white text-center cursor-pointer transition-all hover:scale-[1.02]"
            >
              Access Compliance Hub
            </button>
          </div>
        </div>

      </section>

      {/* 6. SUCCESS STORIES (Interactive Carousel Section) */}
      <section className={`py-24 px-4 md:px-8 w-full border-b ${
        highContrast ? 'bg-black text-white' : 'bg-white border-slate-100'
      }`} id="success-stories">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div className="text-left space-y-2">
              <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Success Stories</span>
              <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
                highContrast ? 'text-white' : 'text-forest'
              }`}>
                Stories of Restored Agency and Dignity
              </h2>
            </div>

            {/* Slider Triggers */}
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveStory((prev) => (prev - 1 + impactStories.length) % impactStories.length)}
                className={`p-2.5 rounded-xl border hover:bg-slate-50 cursor-pointer transition-colors ${
                  highContrast ? 'border-white text-white hover:bg-white hover:text-black' : 'border-slate-200 text-slate-700'
                }`}
                aria-label="Previous story"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setActiveStory((prev) => (prev + 1) % impactStories.length)}
                className={`p-2.5 rounded-xl border hover:bg-slate-50 cursor-pointer transition-colors ${
                  highContrast ? 'border-white text-white hover:bg-white hover:text-black' : 'border-slate-200 text-slate-700'
                }`}
                aria-label="Next story"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Active Carousel Card (Fade transition) */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeStory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 rounded-3xl border overflow-hidden items-center ${
                  highContrast 
                    ? 'border-white bg-black' 
                    : 'bg-slate-50 border-slate-100 shadow-soft-elevation'
                }`}
              >
                {/* Left image column */}
                <div className="lg:col-span-5 h-[260px] md:h-[400px] relative w-full">
                  <img 
                    src={impactStories[activeStory].image} 
                    alt={impactStories[activeStory].beneficiaryName} 
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/80 text-white text-[10px] font-mono tracking-wider px-3 py-1 rounded-full font-bold uppercase backdrop-blur-sm">
                    {impactStories[activeStory].focusArea}
                  </div>
                </div>

                {/* Right narrative content column */}
                <div className="lg:col-span-7 p-6 md:p-10 text-left space-y-6">
                  <span className="text-[10px] font-mono uppercase bg-gold/15 text-gold-dark px-3 py-1 rounded font-bold inline-block">
                    Verified Grassroots Case Study
                  </span>
                  
                  <h3 className={`font-display font-extrabold text-xl md:text-3xl leading-snug ${
                    highContrast ? 'text-white' : 'text-slate-800'
                  }`}>
                    {impactStories[activeStory].title}
                  </h3>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed italic font-serif">
                    &quot;{impactStories[activeStory].quote}&quot;
                  </p>

                  <div className="flex justify-between items-center border-t border-slate-200/50 pt-6">
                    <div>
                      <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">{impactStories[activeStory].beneficiaryName}</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-mono uppercase">{impactStories[activeStory].location}</p>
                    </div>
                    <button 
                      onClick={() => setActivePage('stories')}
                      className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1 transition-colors cursor-pointer ${
                        highContrast 
                          ? 'bg-white text-black hover:underline' 
                          : 'bg-forest hover:bg-forest-light text-white'
                      }`}
                    >
                      Read Impact Journal
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 7. PHOTO GALLERY (Masonry grid sorted by Interventions) */}
      <section className={`py-24 px-4 md:px-8 w-full border-b ${
        highContrast ? 'bg-black text-white' : 'bg-slate-50 border-slate-100'
      }`} id="photo-gallery">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left">
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Intervention Chronicles</span>
              <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
                highContrast ? 'text-white' : 'text-forest'
              }`}>
                Our Photo Gallery
              </h2>
            </div>

            {/* Categorized Filter Tabs */}
            <div className="flex flex-wrap gap-1.5" id="gallery-category-tabs">
              {[
                { label: 'All Projects', id: 'all' },
                { label: 'Agriculture', id: 'agriculture' },
                { label: 'Women SHGs', id: 'women' },
                { label: 'Skill Labs', id: 'education' },
                { label: 'Eco-Climate', id: 'climate' },
                { label: 'Health Camps', id: 'health' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveGalleryTab(tab.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    activeGalleryTab === tab.id
                      ? (highContrast ? 'bg-white text-black border-white' : 'bg-forest text-white border-forest')
                      : 'bg-transparent border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((img) => (
                <motion.div
                  layout
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-slate-100/50 bg-slate-900"
                >
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle hover overlay details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                    <span className="text-[9px] font-mono text-gold font-bold uppercase tracking-widest">{img.category}</span>
                    <h4 className="text-sm font-bold text-white mt-1">{img.title}</h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="pt-4 text-center">
            <button 
              onClick={() => setActivePage('gallery')}
              className={`px-6 py-3.5 text-xs font-extrabold uppercase tracking-widest border rounded-xl cursor-pointer ${
                highContrast ? 'border-white text-white hover:bg-white hover:text-black' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Explore Full Audit Logs & Media Hub
            </button>
          </div>

        </div>
      </section>

      {/* 8. TESTIMONIALS (Glass Cards Carousel) */}
      <section className={`py-24 px-4 md:px-8 w-full ${
        highContrast ? 'bg-black text-white' : 'bg-white'
      }`} id="testimonials">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Endorsements</span>
          
          <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
            highContrast ? 'text-white' : 'text-forest'
          }`}>
            Feedback From Institutional Partners
          </h2>

          <div className="relative min-h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTestimonial}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className={`p-8 rounded-3xl border text-left flex flex-col md:flex-row gap-6 items-center ${
                  highContrast ? 'border-white bg-black' : 'glass-effect border-slate-200/50 shadow-lg'
                }`}
              >
                <img 
                  src={testimonials[activeTestimonial].image} 
                  alt={testimonials[activeTestimonial].name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-gold shadow-md shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-3">
                  <p className="text-xs md:text-sm leading-relaxed text-slate-700 italic font-serif">
                    &quot;{testimonials[activeTestimonial].quote}&quot;
                  </p>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 leading-none">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1 font-mono uppercase">
                      {testimonials[activeTestimonial].designation} — <span className="font-semibold text-slate-500">{testimonials[activeTestimonial].organization}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Controls */}
          <div className="flex justify-center items-center gap-4 pt-2">
            <button 
              onClick={prevTestimonial}
              className={`p-2.5 rounded-xl border hover:bg-slate-50 cursor-pointer ${
                highContrast ? 'border-white text-white hover:bg-white hover:text-black' : 'border-slate-200 text-slate-600'
              }`}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-mono text-slate-400 font-bold">
              {activeTestimonial + 1} / {testimonials.length}
            </span>
            <button 
              onClick={nextTestimonial}
              className={`p-2.5 rounded-xl border hover:bg-slate-50 cursor-pointer ${
                highContrast ? 'border-white text-white hover:bg-white hover:text-black' : 'border-slate-200 text-slate-600'
              }`}
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>

        </div>
      </section>

      {/* 9. PARTNERS & COLLABORATORS (Infinite Logo Slider) */}
      <section className={`py-14 px-4 border-t border-slate-100 overflow-hidden relative w-full ${
        highContrast ? 'bg-black border-white' : 'bg-slate-50'
      }`} id="partner-logos">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">Certified In Collaboration With</p>
          
          <div className="w-full overflow-hidden relative py-2 select-none">
            {/* Shading gradients */}
            {!highContrast && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
              </>
            )}
            
            <div className="animate-infinite-scroll flex items-center gap-12 md:gap-24 opacity-75">
              {[
                { text: 'NITI AAYOG', id: 'darpan' },
                { text: 'UAS DHARWAD', id: 'scientific' },
                { text: 'KARNATAKA INDUSTRIAL CO', id: 'csr' },
                { text: 'NAYAK GLOBAL FOUNDATION', id: 'found' },
                { text: 'NABARD REVOLVING LINK', id: 'micro' },
                { text: 'TATA SUSTAINABILITY CO', id: 'tata' },
                { text: 'INFOSYS TRUST', id: 'infosys' }
              ].concat([
                { text: 'NITI AAYOG', id: 'darpan' },
                { text: 'UAS DHARWAD', id: 'scientific' },
                { text: 'KARNATAKA INDUSTRIAL CO', id: 'csr' },
                { text: 'NAYAK GLOBAL FOUNDATION', id: 'found' },
                { text: 'NABARD REVOLVING LINK', id: 'micro' },
                { text: 'TATA SUSTAINABILITY CO', id: 'tata' },
                { text: 'INFOSYS TRUST', id: 'infosys' }
              ]).map((p, idx) => (
                <span 
                  key={idx} 
                  className={`font-display font-extrabold text-sm md:text-base tracking-widest shrink-0 ${
                    highContrast ? 'text-white underline' : 'text-slate-400 hover:text-forest'
                  } transition-colors cursor-default`}
                >
                  {p.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. LATEST NEWS & INSIGHTS (Magazine Style Cards, featuring a primary article) */}
      <section className={`py-24 px-4 md:px-8 w-full border-t border-b ${
        highContrast ? 'bg-black border-white' : 'bg-white border-slate-100'
      }`} id="latest-news">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left">
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Media Center</span>
              <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
                highContrast ? 'text-white' : 'text-forest'
              }`}>
                Latest News & Insights
              </h2>
            </div>
            <button 
              onClick={() => setActivePage('blog')}
              className={`px-4 py-2 text-xs font-bold rounded-xl border cursor-pointer ${
                highContrast ? 'border-white text-white hover:bg-white hover:text-black' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              Read All Press Releases
            </button>
          </div>

          {/* Magazine Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Featured Article Left (7 columns) */}
            <div className={`lg:col-span-7 rounded-3xl border overflow-hidden flex flex-col justify-between text-left ${
              highContrast ? 'border-white bg-black' : 'bg-slate-50 border-slate-100 shadow-sm'
            }`} id="featured-news-card">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800" 
                  alt="Organic field overview carbon credits" 
                  className="w-full h-64 md:h-80 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1"><Calendar size={12} /> MARCH 15, 2026</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> 6 MIN READ</span>
                    <span>•</span>
                    <span className="text-gold uppercase font-bold">Featured Initiative</span>
                  </div>
                  
                  <h3 className={`font-display font-extrabold text-lg md:text-2xl leading-snug ${
                    highContrast ? 'text-white underline' : 'text-slate-800 hover:text-forest'
                  }`}>
                    Unlocking Carbon Offsets for Smallholder Farmers: The Miyawaki Framework
                  </h3>
                  
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
                    Exploring how our afforestation projects enable marginal farmers to tap into voluntary carbon credit structures, turning environmental stewardship into immediate household dividends.
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex justify-between items-center border-t border-slate-200/50 mt-4">
                <span className="text-xs text-slate-400 font-medium">By ESG Communications Officer</span>
                <button 
                  onClick={() => setActivePage('blog')}
                  className={`text-xs font-bold flex items-center gap-1 cursor-pointer ${
                    highContrast ? 'text-white underline' : 'text-forest'
                  }`}
                >
                  Read Full Article
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Side Articles List (5 columns) */}
            <div className="lg:col-span-5 space-y-6">
              {[
                {
                  title: 'Deploying STEM-AI labs in Hubballi Rural Schools',
                  date: 'FEB 28, 2026',
                  category: 'Skill Dev',
                  image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=300'
                },
                {
                  title: 'Women-led Dairy Co-ops: Tackling Rural Asset Inequality',
                  date: 'FEB 12, 2026',
                  category: 'Women SHGs',
                  image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=300'
                },
                {
                  title: 'Solar-Powered Drip Networks Combat Monsoonal Shifts',
                  date: 'JAN 24, 2026',
                  category: 'Agriculture',
                  image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=300'
                }
              ].map((art, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActivePage('blog')}
                  className={`flex gap-4 p-3 rounded-2xl border items-center text-left cursor-pointer transition-all ${
                    highContrast 
                      ? 'border-white bg-black text-white hover:underline' 
                      : 'bg-white border-slate-100 hover:shadow-md'
                  }`}
                >
                  <img 
                    src={art.image} 
                    alt={art.title} 
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[8px] font-mono font-bold text-slate-400">
                      <span>{art.date}</span>
                      <span>•</span>
                      <span className="text-gold uppercase">{art.category}</span>
                    </div>
                    <h4 className="text-xs md:text-sm font-bold text-slate-800 line-clamp-2 leading-snug">
                      {art.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 11. PREMIUM NEWSLETTER SIGNUP (Secured client validation state) */}
      <section className={`py-24 px-4 md:px-8 w-full ${
        highContrast ? 'bg-black text-white' : 'bg-white'
      }`} id="newsletter-section">
        <div className="max-w-4xl mx-auto">
          <div className={`p-8 md:p-12 rounded-3xl border text-center space-y-6 ${
            highContrast ? 'border-white bg-black' : 'bg-forest text-white shadow-2xl'
          }`} id="newsletter-container">
            <div className={`p-3 rounded-2xl inline-flex ${
              highContrast ? 'bg-white text-black' : 'bg-white/10 text-gold'
            }`}>
              <CheckCircle2 size={24} className="stroke-[2.5]" />
            </div>

            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white">
              Stay Connected With Our Impact Journey
            </h2>

            <p className="text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
              We compile certified geographical baseline data, audited financial metrics, and progress logs quarterly. Subscribe to our newsletter to receive direct updates.
            </p>

            <form onSubmit={handleHomeNewsletterSubmit} className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
              <input 
                type="text" 
                placeholder="Full Name" 
                value={homeNewsletterName}
                onChange={(e) => setHomeNewsletterName(e.target.value)}
                className={`sm:col-span-4 px-4 py-3 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-gold ${
                  highContrast ? 'bg-black border border-white text-white' : 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-400'
                }`}
                required 
              />
              <input 
                type="email" 
                placeholder="Corporate Email" 
                value={homeNewsletterEmail}
                onChange={(e) => setHomeNewsletterEmail(e.target.value)}
                className={`sm:col-span-5 px-4 py-3 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-gold ${
                  highContrast ? 'bg-black border border-white text-white' : 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-400'
                }`}
                required 
              />
              <button 
                type="submit"
                className={`sm:col-span-3 py-3 text-xs font-bold rounded-xl cursor-pointer ${
                  highContrast ? 'bg-white text-black hover:underline' : 'bg-gold hover:bg-gold-light text-white'
                }`}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 12. INTERACTIVE CSR BROCHURE DOWNLOAD MODAL */}
      <AnimatePresence>
        {showBrochureModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-md rounded-3xl shadow-2xl p-6 overflow-hidden text-left ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white'
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-4">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-slate-800">
                    Download CSR Prospectus
                  </h3>
                  <p className="text-[11px] text-slate-400">Raita Mitra Trust Governance & Project Portfolio</p>
                </div>
                <button 
                  onClick={() => { setShowBrochureModal(false); setDownloadStep('form'); }}
                  className="text-slate-400 hover:text-slate-800"
                >
                  <ChevronRight size={20} className="rotate-90" />
                </button>
              </div>

              {/* Form step */}
              {downloadStep === 'form' && (
                <form onSubmit={startBrochureDownload} className="space-y-4">
                  <p className="text-xs text-slate-500 leading-normal">
                    Provide credentials to access our audited financial logs, project milestones, and legal clearance receipts (80G, 12A, CSR-1).
                  </p>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase">Corporate / Organization Name</label>
                    <input 
                      type="text"
                      value={corporateName}
                      onChange={(e) => setCorporateName(e.target.value)}
                      placeholder="e.g. Nayak Enterprise Ltd"
                      className="w-full mt-1.5 px-4 py-2.5 text-xs rounded-xl bg-slate-100 border-none focus:outline-none focus:ring-2 focus:ring-forest text-slate-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase">Corporate Email</label>
                    <input 
                      type="email"
                      value={corporateEmail}
                      onChange={(e) => setCorporateEmail(e.target.value)}
                      placeholder="e.g. csr@company.com"
                      className="w-full mt-1.5 px-4 py-2.5 text-xs rounded-xl bg-slate-100 border-none focus:outline-none focus:ring-2 focus:ring-forest text-slate-800"
                      required
                    />
                  </div>
                  {downloadError && <p className="text-[10px] font-mono font-bold text-rose-500">{downloadError}</p>}
                  
                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full py-3 text-xs font-bold rounded-xl bg-forest text-white hover:bg-forest-light cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Download size={14} />
                      Generate Brochure Access
                    </button>
                  </div>
                </form>
              )}

              {/* Progress step */}
              {downloadStep === 'progress' && (
                <div className="py-8 text-center space-y-4">
                  <p className="text-xs font-mono text-forest font-bold animate-pulse">COMPILING GEO-TAGGED PORTFOLIO RECEIPTS...</p>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                    <div 
                      className="bg-gold h-full transition-all duration-150"
                      style={{ width: `${downloadProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">{downloadProgress}% completed</span>
                </div>
              )}

              {/* Complete step */}
              {downloadStep === 'complete' && (
                <div className="py-6 text-center space-y-4">
                  <div className="p-3 rounded-full bg-emerald-100 text-emerald-600 inline-block">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="font-display font-extrabold text-slate-800 text-base">Verification Approved</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-normal">
                    Thank you, <strong>{corporateName}</strong>. The comprehensive CSR PDF (incorporating Dharwad/Haveri baseline geo-metrics and auditable statements) has been delivered to <strong>{corporateEmail}</strong>.
                  </p>
                  <button 
                    onClick={() => { setShowBrochureModal(false); setDownloadStep('form'); }}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-forest text-white hover:bg-forest-light cursor-pointer"
                  >
                    Return to site
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
