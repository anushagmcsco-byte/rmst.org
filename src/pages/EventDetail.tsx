import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Share2, 
  Video, 
  Check, 
  Download, 
  Award, 
  MessageSquare, 
  ChevronDown, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  QrCode, 
  Mail, 
  Phone, 
  User, 
  Building, 
  Briefcase, 
  ChevronUp, 
  Sparkles,
  ExternalLink,
  Laptop,
  HelpCircle,
  TrendingUp,
  Volume2,
  FileText,
  Play,
  Linkedin,
  ThumbsUp,
  Sliders,
  Send,
  Lock,
  Compass,
  Map,
  BadgePercent,
  CheckCircle
} from 'lucide-react';
import { RICH_EVENTS, RichEventItem } from '../data/events';

interface EventDetailProps {
  slug: string;
  setActivePage: (page: string) => void;
  highContrast: boolean;
}

export default function EventDetail({ slug, setActivePage, highContrast }: EventDetailProps) {
  // Retrieve dynamic events list
  const eventsList = useMemo(() => {
    try {
      const stored = localStorage.getItem('raita_mitra_events_list');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return RICH_EVENTS;
  }, []);

  // Fetch active event by slug or fallback to the first one
  const event = useMemo(() => {
    return eventsList.find(e => e.slug === slug) || eventsList[0] || RICH_EVENTS[0];
  }, [slug, eventsList]);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [slug]);

  // States
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [regStep, setRegStep] = useState<number>(1);
  const [isRegSubmitted, setIsRegSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [selectedCalendarPlatform, setSelectedCalendarPlatform] = useState<string>('');
  
  // Certificate verification states
  const [certificateEmail, setCertificateEmail] = useState<string>('');
  const [isVerifyingCert, setIsVerifyingCert] = useState<boolean>(false);
  const [certVerified, setCertVerified] = useState<boolean | null>(null);
  const [isDownloadingBrochure, setIsDownloadingBrochure] = useState<string | null>(null);

  // Registration Form state
  const [regForm, setRegForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    organization: '',
    occupation: 'Farmer',
    category: event.categoryLabel,
    participantsCount: 1,
    specialRequirements: ''
  });

  // Future scalability panel state
  const [scalabilityConsoleOpen, setScalabilityConsoleOpen] = useState<boolean>(false);
  const [attendanceTrackerEnabled, setAttendanceTrackerEnabled] = useState<boolean>(true);
  const [aiAssistantQuery, setAiAssistantQuery] = useState<string>('');
  const [aiAssistantReply, setAiAssistantReply] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [paidTicketPrice, setPaidTicketPrice] = useState<number>(0); // 0 = Free
  
  // SEO inspection drawer state
  const [seoConsoleOpen, setSeoConsoleOpen] = useState<boolean>(false);

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date(`${event.date}T10:00:00`);
      // Simulating from July 5, 2026, or current real-time
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      let tempTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      if (difference > 0) {
        tempTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      setTimeLeft(tempTimeLeft);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [event.date]);

  // Multi-step Registration Submission
  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRegSubmitted(true);
      
      // Simulating reduction in available seats
      if (event.seatsRemaining > 0) {
        event.seatsRemaining = Math.max(0, event.seatsRemaining - regForm.participantsCount);
      }
    }, 1500);
  };

  // Certificate generator mock
  const handleVerifyCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateEmail) return;
    setIsVerifyingCert(true);
    setTimeout(() => {
      setIsVerifyingCert(false);
      // Simulating verification match
      if (certificateEmail.toLowerCase().includes('@') && certificateEmail.length > 5) {
        setCertVerified(true);
      } else {
        setCertVerified(false);
      }
    }, 1200);
  };

  // Mock brochure/materials download
  const handleResourceDownload = (filename: string) => {
    setIsDownloadingBrochure(filename);
    setTimeout(() => {
      setIsDownloadingBrochure(null);
      alert(`"${filename}" successfully prepared. Stored securely on system.`);
    }, 1400);
  };

  // Mock Share click
  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  // Simulated AI Event Assistant
  const handleAiAssistantQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiAssistantQuery.trim()) return;
    setIsAiLoading(true);
    setTimeout(() => {
      setIsAiLoading(false);
      const query = aiAssistantQuery.toLowerCase();
      if (query.includes('fee') || query.includes('cost') || query.includes('pay')) {
        setAiAssistantReply(`Raita Mitra public training modules are 100% free of charge under our MCA CSR-1 compliant funding pathways. No tickets or gate fees will be charged.`);
      } else if (query.includes('food') || query.includes('lunch') || query.includes('meal')) {
        setAiAssistantReply(`Yes! All registered participants receive a nutritious, complimentary traditional dryland millet lunch (Ragi rotis, local pulses, buttermilk) during the afternoon networking hour.`);
      } else if (query.includes('certificate') || query.includes('cert')) {
        setAiAssistantReply(`Indeed! Every attendee completing the physical training tracks will receive a printed, QR-verifiable certificate representing ${event.certificateType}.`);
      } else if (query.includes('where') || query.includes('map') || query.includes('venue')) {
        setAiAssistantReply(`This workshop is at ${event.venue}. Detailed directions: ${event.locationDetails.address}. Landmark: ${event.locationDetails.landmarks[0]}.`);
      } else {
        setAiAssistantReply(`Hello! This is Raita Mitra’s AI Event Assistant. Yes, the event "${event.title}" is scheduled on ${event.date} at ${event.time} at ${event.venue}. Feel free to ask about certificates, catering, or transport!`);
      }
    }, 1000);
  };

  // AI-Powered Event Recommendations (matching same category or general active status)
  const relatedEvents = useMemo(() => {
    return RICH_EVENTS.filter(e => e.id !== event.id).slice(0, 2);
  }, [event.id]);

  // Gallery images (high quality representation of community engagement)
  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800', title: 'Community Soil Preparation' },
    { src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800', title: 'Interactive Field Demonstration' },
    { src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800', title: 'All-women Dairy Cooperative Session' },
    { src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800', title: 'Solar Digital Lab Training' },
    { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800', title: 'Youth Computing Mentorship' },
    { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800', title: 'Agrarian Advisory Summit 2026' }
  ];

  return (
    <div className={`w-full relative overflow-x-hidden min-h-screen ${highContrast ? 'bg-black text-white' : 'bg-[#FAFAFA]'}`} id="event-detail-template">
      
      {/* FLOATING SOCIAL SHARE BAR */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5">
        <div className={`flex flex-col gap-2.5 p-2 rounded-2xl shadow-xl border ${
          highContrast ? 'bg-black border-2 border-white' : 'bg-white/90 backdrop-blur-md border-slate-100'
        }`}>
          <button 
            onClick={() => {
              window.open(`https://api.whatsapp.com/send?text=Join+the+world-class+event+${encodeURIComponent(event.title)}+on+${event.date}+with+Raita+Mitra+Social+Trust!+Register+now:`, '_blank');
            }}
            title="Share via WhatsApp"
            className="p-3.5 rounded-xl bg-[#25D366] text-white hover:opacity-90 transition-all shadow-md hover:scale-105 cursor-pointer"
          >
            <Share2 size={16} />
          </button>
          <button 
            onClick={() => {
              window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
            }}
            title="Share via LinkedIn"
            className="p-3.5 rounded-xl bg-[#0A66C2] text-white hover:opacity-90 transition-all shadow-md hover:scale-105 cursor-pointer"
          >
            <Linkedin size={16} />
          </button>
          <button 
            onClick={handleShareClick}
            title="Copy Page Link"
            className={`p-3.5 rounded-xl text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-md hover:scale-105 cursor-pointer border ${
              highContrast ? 'border-white' : 'bg-white border-slate-200'
            }`}
          >
            {copiedText ? <Check size={16} className="text-forest font-bold" /> : <ExternalLink size={16} />}
          </button>
        </div>
      </div>

      {/* 1. IMMERSIVE EVENT HERO SECTION */}
      <section className="relative min-h-[580px] md:min-h-[640px] flex items-center justify-center pt-24 pb-16 px-4 md:px-8 bg-slate-950 text-white overflow-hidden" id="event-hero">
        <div className="absolute inset-0 z-0">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover opacity-20 filter contrast-125 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-start text-left space-y-6">
          {/* Back button */}
          <button 
            onClick={() => setActivePage('events')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all hover:bg-white/10 cursor-pointer ${
              highContrast ? 'border-white text-white' : 'border-white/10 text-slate-300 bg-white/5'
            }`}
          >
            <ArrowLeft size={14} />
            Back to Events Catalog
          </button>

          {/* Tag & Status */}
          <div className="flex flex-wrap items-center gap-3">
            <span className={`text-[10px] font-mono font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
              event.status === 'Upcoming' ? 'bg-amber-500 text-slate-950 font-black' :
              event.status === 'Live' ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-600 text-white'
            }`}>
              ● {event.status} EVENT
            </span>
            <span className="text-[10px] font-mono font-bold bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-gold">
              {event.categoryLabel}
            </span>
            {event.seatsRemaining <= 10 && event.seatsRemaining > 0 && (
              <span className="text-[10px] font-mono font-bold bg-red-600 text-white px-3 py-1.5 rounded-full animate-bounce">
                SEATS FILLING FAST: {event.seatsRemaining} LEFT
              </span>
            )}
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-3xl md:text-6xl tracking-tight leading-[1.1] text-white max-w-4xl">
            {event.title}
          </h1>

          {/* Subheading */}
          <p className="text-slate-300 font-sans text-base md:text-xl max-w-3xl font-light leading-relaxed">
            {event.tagline}
          </p>

          {/* Metadata Badges */}
          <div className="flex flex-wrap gap-4 pt-4 text-xs font-mono text-slate-300 max-w-4xl">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10">
              <CalendarIcon size={14} className="text-gold" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10">
              <Clock size={14} className="text-gold" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10">
              <MapPin size={14} className="text-gold" />
              <span>{event.venue} ({event.mode})</span>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-6">
            <a 
              href="#register"
              className={`px-8 py-4 rounded-xl font-display font-extrabold text-sm tracking-wide transition-all shadow-lg hover:scale-[1.02] cursor-pointer ${
                highContrast ? 'bg-white text-black font-black' : 'bg-gold text-slate-950 hover:bg-gold-light'
              }`}
            >
              Register Now
            </a>
            
            <button 
              onClick={() => {
                window.open(event.googleCalendarUrl, '_blank');
              }}
              className={`px-6 py-4 rounded-xl font-display font-extrabold text-sm tracking-wide transition-all border flex items-center gap-2 hover:bg-white/10 cursor-pointer ${
                highContrast ? 'border-white text-white' : 'border-white/20 bg-white/5 text-white'
              }`}
            >
              <CalendarIcon size={16} />
              Add To Calendar
            </button>
          </div>
        </div>
      </section>

      {/* 2. QUICK INFO SECTION (GLASS CARDS) */}
      <section className="relative z-30 max-w-6xl mx-auto px-4 -mt-10" id="quick-info">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-6 rounded-3xl border shadow-lg flex flex-col justify-between space-y-4 ${
            highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-100 shadow-slate-200/50'
          }`}>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl w-fit">
              <CalendarIcon className="text-indigo-600 dark:text-indigo-400" size={24} />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Event Date</p>
              <h4 className="font-display font-bold text-slate-800 dark:text-white mt-1 text-sm md:text-base">{event.date}</h4>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border shadow-lg flex flex-col justify-between space-y-4 ${
            highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-100 shadow-slate-200/50'
          }`}>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl w-fit">
              <Clock className="text-amber-600 dark:text-amber-400" size={24} />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Time Window</p>
              <h4 className="font-display font-bold text-slate-800 dark:text-white mt-1 text-sm md:text-base truncate">{event.time.split(' - ')[0]}</h4>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border shadow-lg flex flex-col justify-between space-y-4 ${
            highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-100 shadow-slate-200/50'
          }`}>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl w-fit">
              <MapPin className="text-emerald-600 dark:text-emerald-400" size={24} />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Field Venue</p>
              <h4 className="font-display font-bold text-slate-800 dark:text-white mt-1 text-sm md:text-base truncate" title={event.venue}>{event.venue.split(',')[0]}</h4>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border shadow-lg flex flex-col justify-between space-y-4 ${
            highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-100 shadow-slate-200/50'
          }`}>
            <div className="p-3 bg-pink-50 dark:bg-pink-950/40 rounded-2xl w-fit">
              <Users className="text-pink-600 dark:text-pink-400" size={24} />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Seats Left</p>
              <h4 className="font-display font-bold text-slate-800 dark:text-white mt-1 text-sm md:text-base">
                {event.seatsRemaining} / {event.totalSeats} Available
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COUNTDOWN TIMERS SECTION */}
      {event.status === 'Upcoming' && (
        <section className="py-12 px-4 max-w-6xl mx-auto text-center" id="countdown">
          <div className={`rounded-3xl p-8 border ${
            highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-200/40 shadow-sm'
          }`}>
            <span className="text-[10px] font-mono text-gold font-extrabold uppercase tracking-widest">TIME REMAINING TO COMMENCE</span>
            <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-1 mb-6">Countdown To Event</h3>
            
            <div className="grid grid-cols-4 gap-2.5 max-w-md mx-auto">
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl">
                <span className="block font-display font-black text-2xl md:text-3xl text-slate-900 dark:text-white leading-none">
                  {timeLeft.days}
                </span>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Days</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl">
                <span className="block font-display font-black text-2xl md:text-3xl text-slate-900 dark:text-white leading-none">
                  {timeLeft.hours}
                </span>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Hours</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl">
                <span className="block font-display font-black text-2xl md:text-3xl text-slate-900 dark:text-white leading-none">
                  {timeLeft.minutes}
                </span>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Minutes</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl">
                <span className="block font-display font-black text-2xl md:text-3xl text-slate-900 dark:text-white leading-none">
                  {timeLeft.seconds}
                </span>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Seconds</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* LIVE STREAMING HERO CARD SECTION */}
      {event.status === 'Live' && (
        <section className="py-12 px-4 max-w-6xl mx-auto" id="live-stream">
          <div className={`rounded-3xl p-8 border text-white overflow-hidden relative ${
            highContrast ? 'bg-black border-2 border-white' : 'bg-gradient-to-r from-red-600 to-rose-700 shadow-xl'
          }`}>
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Video size={160} />
            </div>
            
            <div className="relative z-10 space-y-4 max-w-2xl text-left">
              <span className="bg-white/20 text-white font-mono text-[9px] px-3 py-1 rounded-full uppercase tracking-wider font-bold inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                BROADCAST IS ACTIVE
              </span>
              <h3 className="font-display font-black text-2xl md:text-3xl">Join Live Stream</h3>
              <p className="text-white/80 font-sans text-sm font-light">
                This workshop is currently broadcasting online. Virtual attendees can interact with soil agronomists and presenters live using Google Meet or YouTube Live.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a 
                  href="https://meet.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-slate-900 px-5 py-2.5 rounded-xl font-display font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Video size={14} className="text-red-600" />
                  Join Google Meet Room
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-xl font-display font-bold text-xs hover:bg-white/20 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  Watch YouTube Broadcast
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. ABOUT THIS EVENT (SPLIT SCREEN) */}
      <section className="py-16 px-4 max-w-6xl mx-auto" id="about">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
            <span className="text-xs font-mono text-forest font-black uppercase tracking-widest">ABOUT THIS EVENT</span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight">
              A Deeply Vetted Interactive Community Experience
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 font-sans text-base leading-relaxed font-light">
              {event.detailedInfo}
            </p>
            
            <p className="text-slate-600 dark:text-slate-300 font-sans text-base leading-relaxed font-light">
              Raita Mitra Social Trust (R) coordinates this program in strict alignment with regional NITI Aayog development vectors. All components—including local dialect translation, catering, digital infrastructure setup, and transport offsets—are fully audited.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-forest shrink-0" />
                <span>NITI Aayog Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-forest shrink-0" />
                <span>Verified ESG/CSR Track</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-forest shrink-0" />
                <span>QR-Verifiable Credentials</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-forest shrink-0" />
                <span>Complimentary Millet Meals</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-forest/5 rounded-3xl -rotate-1 scale-[1.02]" />
            <img 
              src={event.image} 
              alt="Community workshop in action" 
              className="relative z-10 w-full h-[380px] object-cover rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* 5. AGENDA & SCHEDULE SECTION (VERTICAL TIMELINE) */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950/50 border-y border-slate-200/40" id="agenda">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
          <span className="text-xs font-mono text-forest font-black uppercase tracking-widest">HOUR-BY-HOUR CHRONOLOGY</span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
            Agenda &amp; Schedule
          </h2>
          <p className="text-slate-500 font-sans text-xs max-w-xl mx-auto">
            A comprehensive schedule featuring technical lecture sessions, dynamic field works, luncheon networks, and diagnostic assessments.
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative text-left">
          {/* Vertical axis line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2" />

          <div className="space-y-12">
            {event.agenda.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Axis anchor node */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-gold border-2 border-white dark:border-black shadow -translate-x-1/2 z-10" />

                  {/* Left Side (Time Badge) */}
                  <div className="w-full md:w-1/2 pl-14 md:pl-0 md:px-8 text-left md:text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-forest/5 text-forest font-mono text-xs font-bold border border-forest/10">
                      {item.time}
                    </span>
                  </div>

                  {/* Right Side (Content Block) */}
                  <div className="w-full md:w-1/2 pl-14 md:pl-8 md:pr-0 text-left mt-2 md:mt-0">
                    <div className={`p-6 rounded-2xl border ${
                      highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm shadow-slate-100/50'
                    }`}>
                      <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
                        {item.title}
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 font-sans text-xs mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. SPEAKERS & TRAINERS SECTION */}
      <section className="py-16 px-4 max-w-6xl mx-auto" id="speakers">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-mono text-gold font-black uppercase tracking-widest">TRUSTED OUTREACH ADVOCATES</span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
            Speakers &amp; Trainers
          </h2>
          <p className="text-slate-500 font-sans text-xs max-w-xl mx-auto">
            Experienced agrarian advisors, computer software engineers, and NABARD specialists leading change.
          </p>
        </div>

        <div className={`grid grid-cols-1 ${event.speakers.length > 1 ? 'md:grid-cols-2' : 'max-w-md mx-auto'} gap-8`}>
          {event.speakers.map((speaker, idx) => (
            <div 
              key={idx}
              className={`rounded-3xl border overflow-hidden p-6 flex flex-col md:flex-row gap-6 text-left transition-all hover:shadow-lg ${
                highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <img 
                src={speaker.image} 
                alt={speaker.name} 
                className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-slate-100 dark:border-slate-800"
              />
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
                    {speaker.name}
                  </h3>
                  <p className="text-xs font-mono text-forest font-bold">{speaker.role}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{speaker.designation}</p>
                  <p className="text-slate-500 dark:text-slate-300 font-sans text-xs mt-2 leading-relaxed">
                    {speaker.bio}
                  </p>
                </div>
                <div className="pt-2">
                  <a 
                    href={speaker.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#0A66C2] font-mono hover:underline"
                  >
                    <Linkedin size={13} />
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. REGISTRATION SECTION (SPLIT SCREEN WITH MULTI-STEP FORM) */}
      <section className="py-16 px-4 bg-[#F2F4F2] dark:bg-slate-900 border-y border-slate-200" id="register">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left side: Visual & Info */}
            <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-6 lg:py-6">
              <div className="space-y-4">
                <span className="text-xs font-mono text-forest font-black uppercase tracking-widest">NITI AAYOG COMPLIANT PORTAL</span>
                <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight">
                  Register For Event
                </h2>
                <p className="text-slate-600 dark:text-slate-300 font-sans text-sm leading-relaxed font-light">
                  Please complete this secure multi-step application to reserve your physical seat. Raita Mitra Social Trust ensures fully compliant, zero-fee access for dryland smallholders and rural students.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/50 dark:bg-black/30 border border-slate-200/50 dark:border-slate-800 space-y-3.5">
                <div className="flex gap-3 text-xs text-slate-500 font-mono">
                  <CheckCircle size={15} className="text-forest shrink-0" />
                  <span>Real-time enrollment syncs to CSR Google Sheets</span>
                </div>
                <div className="flex gap-3 text-xs text-slate-500 font-mono">
                  <CheckCircle size={15} className="text-forest shrink-0" />
                  <span>Auto-notifies regional WhatsApp API endpoints</span>
                </div>
                <div className="flex gap-3 text-xs text-slate-500 font-mono">
                  <CheckCircle size={15} className="text-forest shrink-0" />
                  <span>Generates printable participation badge</span>
                </div>
              </div>

              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600" 
                alt="Participants attending training" 
                className="w-full h-48 object-cover rounded-3xl border border-slate-200 shadow-md hidden lg:block"
              />
            </div>

            {/* Right side: Multi-step Form */}
            <div className="lg:col-span-7">
              <div className={`p-8 rounded-3xl border text-left h-full flex flex-col justify-between ${
                highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-lg shadow-slate-200/40'
              }`}>
                
                {/* Form header steps indicators */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6 text-xs font-mono">
                  <span className="font-bold text-slate-400">Step {regStep} of 3</span>
                  <div className="flex gap-1.5">
                    <span className={`w-6 h-1.5 rounded-full ${regStep >= 1 ? 'bg-forest' : 'bg-slate-200'}`} />
                    <span className={`w-6 h-1.5 rounded-full ${regStep >= 2 ? 'bg-forest' : 'bg-slate-200'}`} />
                    <span className={`w-6 h-1.5 rounded-full ${regStep >= 3 ? 'bg-forest' : 'bg-slate-200'}`} />
                  </div>
                </div>

                {!isRegSubmitted ? (
                  <form onSubmit={handleRegSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
                    
                    {/* STEP 1: Basic Bio */}
                    {regStep === 1 && (
                      <div className="space-y-4">
                        <h4 className="font-display font-extrabold text-slate-900 dark:text-white text-base">Primary Applicant Details</h4>
                        
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-slate-400 font-bold block">Full Name</label>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-slate-400"><User size={14} /></span>
                            <input 
                              type="text" 
                              required
                              value={regForm.fullName}
                              onChange={e => setRegForm({...regForm, fullName: e.target.value})}
                              placeholder="e.g. Basavaraj S. Hosmani" 
                              className={`w-full text-xs p-3 pl-10 rounded-xl border focus:ring-1 focus:ring-forest focus:outline-none ${
                                highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                              }`}
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-slate-400 font-bold block">Email Address</label>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-slate-400"><Mail size={14} /></span>
                            <input 
                              type="email" 
                              required
                              value={regForm.email}
                              onChange={e => setRegForm({...regForm, email: e.target.value})}
                              placeholder="e.g. basavaraj@gmail.com" 
                              className={`w-full text-xs p-3 pl-10 rounded-xl border focus:ring-1 focus:ring-forest focus:outline-none ${
                                highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                              }`}
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-slate-400 font-bold block">Mobile / WhatsApp Number</label>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-slate-400"><Phone size={14} /></span>
                            <input 
                              type="tel" 
                              required
                              value={regForm.phone}
                              onChange={e => setRegForm({...regForm, phone: e.target.value})}
                              placeholder="e.g. +91 94827 10394" 
                              className={`w-full text-xs p-3 pl-10 rounded-xl border focus:ring-1 focus:ring-forest focus:outline-none ${
                                highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Geographic / Occupational info */}
                    {regStep === 2 && (
                      <div className="space-y-4">
                        <h4 className="font-display font-extrabold text-slate-900 dark:text-white text-base">Demographic Background</h4>
                        
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-slate-400 font-bold block">City / Village Name</label>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-slate-400"><MapPin size={14} /></span>
                            <input 
                              type="text" 
                              required
                              value={regForm.city}
                              onChange={e => setRegForm({...regForm, city: e.target.value})}
                              placeholder="e.g. Yaraguppi Village, Haveri" 
                              className={`w-full text-xs p-3 pl-10 rounded-xl border focus:ring-1 focus:ring-forest focus:outline-none ${
                                highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                              }`}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-mono text-slate-400 font-bold block">Organization / School</label>
                            <div className="relative">
                              <span className="absolute left-3 top-3 text-slate-400"><Building size={14} /></span>
                              <input 
                                type="text" 
                                value={regForm.organization}
                                onChange={e => setRegForm({...regForm, organization: e.target.value})}
                                placeholder="e.g. Savadatti Agri Union" 
                                className={`w-full text-xs p-3 pl-10 rounded-xl border focus:ring-1 focus:ring-forest focus:outline-none ${
                                  highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                                }`}
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-mono text-slate-400 font-bold block">Occupation</label>
                            <div className="relative">
                              <span className="absolute left-3 top-3 text-slate-400"><Briefcase size={14} /></span>
                              <select 
                                value={regForm.occupation}
                                onChange={e => setRegForm({...regForm, occupation: e.target.value})}
                                className={`w-full text-xs p-3 pl-10 rounded-xl border focus:ring-1 focus:ring-forest focus:outline-none ${
                                  highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                                }`}
                              >
                                <option value="Farmer">Marginal Farmer</option>
                                <option value="Student">High School / ITI Student</option>
                                <option value="SHG Member">SHG Cooperative Lead</option>
                                <option value="Youth">Unemployed Rural Youth</option>
                                <option value="Educator">Local Teacher / Volunteer</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-slate-400 font-bold block">Event Category Selection</label>
                          <input 
                            type="text" 
                            disabled
                            value={regForm.category}
                            className="w-full text-xs p-3 rounded-xl border bg-slate-100 text-slate-400 dark:bg-slate-900 cursor-not-allowed"
                          />
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Logistics requirements */}
                    {regStep === 3 && (
                      <div className="space-y-4">
                        <h4 className="font-display font-extrabold text-slate-900 dark:text-white text-base">Group Requirements &amp; Comments</h4>
                        
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-slate-400 font-bold block">Number of Accompanying Participants</label>
                          <input 
                            type="number" 
                            min={1} 
                            max={10}
                            required
                            value={regForm.participantsCount}
                            onChange={e => setRegForm({...regForm, participantsCount: parseInt(e.target.value) || 1})}
                            className={`w-full text-xs p-3 rounded-xl border focus:ring-1 focus:ring-forest focus:outline-none ${
                              highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-slate-400 font-bold block">Special Requirements / Transport Aid / Food Allergies</label>
                          <textarea 
                            rows={3}
                            value={regForm.specialRequirements}
                            onChange={e => setRegForm({...regForm, specialRequirements: e.target.value})}
                            placeholder="e.g. Requires transport bus offset assistance from Savadatti Town square; diabetic meal requirement." 
                            className={`w-full text-xs p-3 rounded-xl border focus:ring-1 focus:ring-forest focus:outline-none ${
                              highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          />
                        </div>

                        <div className="p-4 rounded-xl bg-forest/5 border border-forest/10 flex gap-3 text-xs text-slate-500">
                          <AlertCircle size={15} className="text-forest shrink-0 mt-0.5" />
                          <p className="leading-relaxed">
                            Raita Mitra provides fully subsidized transit bus routes for groups exceeding 5 members. Please state your nearest panchayat hub.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
                      {regStep > 1 ? (
                        <button 
                          type="button" 
                          onClick={() => setRegStep(p => p - 1)}
                          className="px-4 py-2.5 rounded-xl text-xs font-mono border border-slate-200 hover:bg-slate-50 cursor-pointer text-slate-600"
                        >
                          Previous
                        </button>
                      ) : <div />}

                      {regStep < 3 ? (
                        <button 
                          type="button" 
                          onClick={() => {
                            // simple validation
                            if (regStep === 1 && (!regForm.fullName || !regForm.email || !regForm.phone)) {
                              alert("Please fill in name, email, and phone before proceeding.");
                              return;
                            }
                            if (regStep === 2 && !regForm.city) {
                              alert("Please fill in village/city.");
                              return;
                            }
                            setRegStep(p => p + 1);
                          }}
                          className={`px-6 py-2.5 rounded-xl font-display font-bold text-xs cursor-pointer ${
                            highContrast ? 'bg-white text-black' : 'bg-forest text-white hover:bg-forest-light'
                          }`}
                        >
                          Next Step
                        </button>
                      ) : (
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className={`px-8 py-3 rounded-xl font-display font-extrabold text-xs cursor-pointer shadow-md transition-all ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                          } ${
                            highContrast ? 'bg-white text-black' : 'bg-gold text-slate-900 hover:bg-gold-light'
                          }`}
                        >
                          {isSubmitting ? 'Submitting Application...' : 'Confirm Registration'}
                        </button>
                      )}
                    </div>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center space-y-4 py-12 flex-1"
                  >
                    <div className="p-4 bg-emerald-50 rounded-full text-forest shrink-0">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="font-display font-black text-xl text-slate-900 dark:text-white">Registration Application Submitted!</h3>
                    <p className="text-xs text-slate-500 font-sans max-w-sm leading-relaxed">
                      Thank you, <span className="font-bold text-slate-800 dark:text-white">{regForm.fullName}</span>. Your application for <span className="font-bold text-slate-800 dark:text-white">{event.title}</span> has been processed successfully.
                    </p>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 dark:bg-slate-900 dark:border-slate-800 text-left w-full space-y-2 font-mono text-[10px] text-slate-400">
                      <div><span className="font-bold text-slate-600">Reference ID:</span> RMST-EVT-{(Math.random() * 100000).toFixed(0)}</div>
                      <div><span className="font-bold text-slate-600">CSR Google Sheet Node:</span> COMPLETED</div>
                      <div><span className="font-bold text-slate-600">WhatsApp Notification:</span> SENT to {regForm.phone}</div>
                      <div><span className="font-bold text-slate-600">Complimentary Meals:</span> {regForm.participantsCount} Servings reserved</div>
                    </div>

                    <button 
                      onClick={() => {
                        setIsRegSubmitted(false);
                        setRegStep(1);
                        setRegForm({
                          fullName: '',
                          email: '',
                          phone: '',
                          city: '',
                          organization: '',
                          occupation: 'Farmer',
                          category: event.categoryLabel,
                          participantsCount: 1,
                          specialRequirements: ''
                        });
                      }}
                      className="text-xs font-mono text-forest hover:underline"
                    >
                      Submit another application
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE MAP & VENUE DIRECTIONS SECTION */}
      <section className="py-16 px-4 max-w-6xl mx-auto" id="location">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Interactive Simulated Map */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono text-forest font-black uppercase tracking-widest block text-left">GEOGRAPHIC VENUE ACCURACY</span>
            <h3 className="font-display font-black text-2xl text-slate-900 dark:text-white text-left">Interactive Map &amp; Directions</h3>
            
            {/* Custom simulated map layout with great styling */}
            <div className={`rounded-3xl border overflow-hidden p-1.5 relative h-[360px] ${
              highContrast ? 'border-2 border-white' : 'bg-white border-slate-100 shadow-lg shadow-slate-200/40'
            }`}>
              <div className="w-full h-full bg-[#E5E9F0] dark:bg-slate-900 rounded-2xl relative overflow-hidden flex flex-col justify-between p-6">
                
                {/* SVG styled grid representing a high quality map */}
                <div className="absolute inset-0 opacity-10 font-mono text-[8px] pointer-events-none select-none">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className="flex justify-between border-b border-slate-900 py-3">
                      <span>LAT: {(event.locationDetails.lat + i * 0.001).toFixed(4)}</span>
                      <span>LNG: {(event.locationDetails.lng - i * 0.001).toFixed(4)}</span>
                    </div>
                  ))}
                </div>

                {/* Map Pins */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-forest text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                    <MapPin size={24} />
                  </div>
                  <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-xl max-w-sm border border-slate-800 text-center space-y-1.5">
                    <h5 className="font-display font-bold text-xs">{event.venue}</h5>
                    <p className="text-[10px] text-slate-400 leading-normal">{event.locationDetails.address}</p>
                    <span className="inline-block text-[9px] font-mono text-gold bg-white/5 px-2 py-0.5 rounded">
                      GPS: {event.locationDetails.lat.toFixed(4)}, {event.locationDetails.lng.toFixed(4)}
                    </span>
                  </div>
                </div>

                {/* Map Bottom Controller */}
                <div className="relative z-10 flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">Map Scale: 100m</span>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${event.locationDetails.lat},${event.locationDetails.lng}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-slate-900 px-3.5 py-1.5 rounded-lg font-bold border border-slate-200 shadow-sm hover:bg-slate-50 inline-flex items-center gap-1"
                  >
                    Open Google Maps
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Parking & Landmark details */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="space-y-4">
              <h4 className="font-display font-extrabold text-slate-900 dark:text-white text-lg">Transit &amp; Parking Logistics</h4>
              <p className="text-slate-500 font-sans text-xs leading-relaxed font-light">
                Please review these access codes, landmarks, and parking advisories before launching your travel arrangements.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl text-slate-700 shrink-0 h-fit">
                  <Award size={18} />
                </div>
                <div>
                  <h5 className="font-display font-bold text-xs text-slate-800 dark:text-white">Parking Facility</h5>
                  <p className="text-slate-500 font-sans text-xs mt-1 font-light leading-relaxed">
                    {event.locationDetails.parking}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl text-slate-700 shrink-0 h-fit">
                  <Compass size={18} />
                </div>
                <div>
                  <h5 className="font-display font-bold text-xs text-slate-800 dark:text-white">Local Landmarks</h5>
                  <ul className="list-disc list-inside text-slate-500 font-sans text-xs mt-1.5 space-y-1 font-light">
                    {event.locationDetails.landmarks.map((mark, i) => (
                      <li key={i}>{mark}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PHOTO GALLERY SECTION (PINTEREST MASONRY) */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950/50" id="gallery">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <span className="text-xs font-mono text-forest font-black uppercase tracking-widest">VISUAL OUTREACH CHRONICLE</span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
              Photo Gallery
            </h2>
            <p className="text-slate-500 font-sans text-xs max-w-xl mx-auto">
              Click any panel below to trigger our immersive photorealistic lightbox inspect interface.
            </p>
          </div>

          {/* Pinterest style grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveLightboxImage(img.src)}
                className="break-inside-avoid relative overflow-hidden rounded-3xl border border-slate-200/50 cursor-pointer group shadow-sm hover:shadow-lg transition-all"
              >
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 text-left">
                  <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImage(null)}
            className="fixed inset-0 bg-black/95 z-[99] flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={activeLightboxImage} 
              alt="Lightbox maximized inspect" 
              className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 10. VIDEO SECTION (HORIZONTAL VIDEO CAROUSEL) */}
      {event.videoUrl && (
        <section className="py-16 px-4 max-w-6xl mx-auto" id="video">
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <span className="text-xs font-mono text-gold font-black uppercase tracking-widest">MEDIA DOCUMENTARY FILM</span>
              <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
                Event Videos
              </h2>
            </div>

            <div className={`rounded-3xl border overflow-hidden p-2.5 relative max-w-4xl mx-auto ${
              highContrast ? 'border-2 border-white' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/40'
            }`}>
              <div className="aspect-video w-full rounded-2xl bg-black overflow-hidden relative group">
                <iframe 
                  src={event.videoUrl} 
                  title={`${event.title} Workshop Footage`}
                  className="w-full h-full border-0 absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 11. DOWNLOADS & RESOURCES SECTION */}
      <section className="py-16 px-4 bg-slate-100 dark:bg-slate-950/50 border-t border-slate-200" id="downloads">
        <div className="max-w-6xl mx-auto space-y-10 text-left">
          <div className="space-y-4">
            <span className="text-xs font-mono text-forest font-black uppercase tracking-widest">COMPLIANT KITS &amp; SYLLABUS</span>
            <h2 className="font-display font-black text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight">
              Downloads &amp; Resources
            </h2>
            <p className="text-slate-500 font-sans text-xs max-w-xl">
              Vetted informational packs, worksheets, and native language checklists compiled by academic soil researchers and IT professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {event.downloads.map((doc, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-3xl border text-left flex flex-col justify-between space-y-4 ${
                  highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-900 text-slate-400 px-2.5 py-1 rounded-full">
                    {doc.type}
                  </span>
                  <h4 className="font-display font-bold text-slate-800 dark:text-white text-sm mt-3">
                    {doc.title}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">File Size: {doc.size}</p>
                </div>

                <button
                  onClick={() => handleResourceDownload(doc.title)}
                  disabled={isDownloadingBrochure === doc.title}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold border cursor-pointer w-full flex items-center justify-center gap-2 transition-all ${
                    highContrast 
                      ? 'border-white text-white bg-black hover:bg-white hover:text-black' 
                      : 'bg-forest/5 text-forest border-forest/10 hover:bg-forest/10'
                  }`}
                >
                  <Download size={14} />
                  {isDownloadingBrochure === doc.title ? 'Downloading...' : 'Download File'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CERTIFICATES SECTION (GLASS CARDS) */}
      <section className="py-16 px-4 max-w-6xl mx-auto" id="certificates">
        <div className={`rounded-3xl p-8 border ${
          highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-200/40 shadow-xl'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono text-forest font-black uppercase tracking-widest inline-flex items-center gap-1.5 font-bold">
                  <Award size={14} className="text-gold" />
                  STANDARDIZED CERTIFICATION SERVICES
                </span>
                <h3 className="font-display font-black text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight">
                  Participation Certificates
                </h3>
                <p className="text-slate-500 font-sans text-sm leading-relaxed font-light">
                  Raita Mitra Social Trust (R) issues standardized digital and physical credentials following NITI Aayog guidelines. Every certificate features a custom, secure QR code linking directly to our public MCA ledger for corporate and NGO employment audits.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-[10px] text-slate-400">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
                  <h5 className="font-bold text-slate-600">Immediate Download</h5>
                  <p>Obtain high-res PDFs instantly inside your profile dashboard.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
                  <h5 className="font-bold text-slate-600">Email Delivery</h5>
                  <p>Automated backup copies delivered to your registered inbox.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
                  <h5 className="font-bold text-slate-600">QR Verification</h5>
                  <p>Allow employers to verify credentials in 2 seconds.</p>
                </div>
              </div>
            </div>

            {/* Right Form: Simulated Verification widget */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-forest/5 border border-forest/10 text-left space-y-4">
                <div className="flex items-center gap-3">
                  <QrCode size={28} className="text-forest shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-800 dark:text-white">Verify Past Certificates</h4>
                    <p className="text-[10px] text-slate-400 font-mono">Simulated QR registry interface</p>
                  </div>
                </div>

                <form onSubmit={handleVerifyCertificate} className="space-y-3">
                  <input 
                    type="email" 
                    required
                    value={certificateEmail}
                    onChange={e => setCertificateEmail(e.target.value)}
                    placeholder="Enter registered student email..." 
                    className={`w-full text-xs p-3 rounded-xl border focus:ring-1 focus:ring-forest focus:outline-none ${
                      highContrast ? 'bg-black border-white text-white' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                  
                  <button 
                    type="submit" 
                    disabled={isVerifyingCert}
                    className="w-full py-2.5 rounded-xl font-display font-bold text-xs bg-forest text-white hover:bg-forest-light transition-all cursor-pointer"
                  >
                    {isVerifyingCert ? 'Searching Ledger...' : 'Check Registry'}
                  </button>
                </form>

                {certVerified === true && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-mono space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 size={14} />
                      <span>Ledger Match Found!</span>
                    </div>
                    <p className="text-[10px] text-emerald-600">
                      Credentials for {certificateEmail} are active. Certificate Ref: RMST-CRT-2026-904. Signed by Board Trustee.
                    </p>
                    <button 
                      onClick={() => handleResourceDownload(`Certificate-RMST-2026.pdf`)}
                      className="text-[10px] font-bold text-emerald-800 underline hover:no-underline"
                    >
                      Download verified file (1.4 MB)
                    </button>
                  </div>
                )}

                {certVerified === false && (
                  <div className="p-3.5 rounded-xl bg-red-50 text-red-800 border border-red-100 text-xs font-mono flex items-center gap-2">
                    <AlertCircle size={14} className="shrink-0" />
                    <div>
                      <p className="font-bold">No Records Found</p>
                      <p className="text-[10px] text-red-600 mt-0.5">Please check email syntax or contact administrator.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. PARTICIPANT TESTIMONIALS (GLASSMORPHISM CAROUSEL) */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950/50" id="testimonials">
        <div className="max-w-4xl mx-auto space-y-10 text-center">
          <div className="space-y-4">
            <span className="text-xs font-mono text-gold font-black uppercase tracking-widest">VOICES FROM THE SOIL</span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
              Voices From Participants
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {event.testimonials.map((test, idx) => (
              <div 
                key={idx}
                className={`p-8 rounded-3xl border flex flex-col justify-between space-y-6 relative overflow-hidden shadow-sm hover:shadow-lg transition-all ${
                  highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-slate-100/50'
                }`}
              >
                <span className="absolute top-4 right-4 text-slate-100 dark:text-slate-900 text-7xl font-serif select-none pointer-events-none">“</span>
                
                <p className="text-slate-600 dark:text-slate-300 font-sans text-xs italic leading-relaxed font-light relative z-10">
                  "{test.quote}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <img 
                    src={test.image} 
                    alt={test.name} 
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <h5 className="font-display font-bold text-xs text-slate-800 dark:text-white">{test.name}</h5>
                    <p className="text-[9px] font-mono text-slate-400">{test.role} — {test.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. FAQ SECTION (ACCORDION) */}
      <section className="py-16 px-4 max-w-4xl mx-auto" id="faq">
        <div className="space-y-10 text-left">
          <div className="space-y-4 text-center">
            <span className="text-xs font-mono text-forest font-black uppercase tracking-widest">INFORMATIONAL CLARIFICATIONS</span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {event.faqs.map((faq, idx) => {
              const isOpen = activeFAQ === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    highContrast ? 'border-white' : 'border-slate-200/60 bg-white'
                  }`}
                >
                  <button
                    onClick={() => setActiveFAQ(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 cursor-pointer font-display font-bold text-slate-800 dark:text-white text-sm"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-1 text-slate-500 font-sans text-xs leading-relaxed border-t border-slate-100 dark:border-slate-800 font-light">
                          {faq.answer}
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

      {/* 15. RELATED EVENTS SECTION (AI RECOMMENDATION ENGINE) */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200" id="related-events">
        <div className="max-w-6xl mx-auto space-y-10 text-left">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-3">
              <span className="text-xs font-mono text-forest font-black uppercase tracking-widest inline-flex items-center gap-1">
                <Sparkles size={14} className="text-gold animate-pulse" />
                AI RECOMMENDATION ENGINE
              </span>
              <h2 className="font-display font-black text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight">
                Explore More Events
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedEvents.map((evt) => (
              <div 
                key={evt.id}
                className={`group flex flex-col sm:flex-row rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-lg ${
                  highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="relative w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden shrink-0">
                  <img 
                    src={evt.image} 
                    alt={evt.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 text-[9px] font-mono font-bold bg-gold text-slate-950 px-2 py-0.5 rounded uppercase">
                    {evt.status}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-forest font-bold uppercase">{evt.categoryLabel}</span>
                    <h3 className="font-display font-extrabold text-base text-slate-800 dark:text-white group-hover:text-forest transition-colors line-clamp-1">
                      {evt.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-300 font-sans line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setActivePage(`events/${evt.slug}`);
                    }}
                    className={`w-full py-2 rounded-xl font-display font-bold text-xs text-center border cursor-pointer transition-colors ${
                      highContrast ? 'border-white text-white hover:bg-white hover:text-black' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. PAST HIGHLIGHTS SECTION (METRICS & IMAGES) */}
      {event.pastHighlights && event.pastHighlights.length > 0 && (
        <section className="py-16 px-4 max-w-6xl mx-auto border-t border-slate-200" id="past-highlights">
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <span className="text-xs font-mono text-forest font-black uppercase tracking-widest">RECORDED HISTORIC OUTCOMES</span>
              <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight animate-fade-in">
                Past Event Highlights
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
              {event.pastHighlights.map((hl, idx) => (
                <div 
                  key={idx}
                  className={`rounded-3xl border overflow-hidden p-6 flex items-center gap-6 ${
                    highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
                  }`}
                >
                  <img 
                    src={hl.image} 
                    alt={hl.title} 
                    className="w-20 h-20 rounded-2xl object-cover shrink-0"
                  />
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-sm text-slate-800 dark:text-white">{hl.title}</h4>
                    <span className="inline-block px-3 py-1 rounded-full bg-forest/5 text-forest font-mono text-[10px] font-extrabold border border-forest/10">
                      {hl.metric}
                    </span>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">Audit verification: APPROVED</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 17. NEWSLETTER INTEGRATION SECTION */}
      <section className="py-16 px-4 bg-[#F2F4F2]/50 border-t border-slate-200" id="newsletter">
        <div className="max-w-4xl mx-auto">
          <div className={`p-8 md:p-12 rounded-3xl border text-center space-y-6 ${
            highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-xl'
          }`}>
            <span className="text-xs font-mono text-forest font-black uppercase tracking-widest">TRUST WEEKLY CIRCULAR</span>
            <h3 className="font-display font-black text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight">
              Stay Updated on Future Events
            </h3>
            <p className="text-slate-500 font-sans text-xs max-w-xl mx-auto leading-relaxed">
              Subscribe to the Raita Mitra Social Trust email dispatch to receive direct circular reminders of upcoming training programs, NABARD subsidy camps, and micro-job hackathons.
            </p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you! You have been successfully registered for the Raita Mitra monthly circular dispatch.');
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input 
                type="text" 
                required
                placeholder="Your Name" 
                className={`flex-1 text-xs p-3.5 rounded-xl border focus:ring-1 focus:ring-forest focus:outline-none ${
                  highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              />
              <input 
                type="email" 
                required
                placeholder="Email Address" 
                className={`flex-1 text-xs p-3.5 rounded-xl border focus:ring-1 focus:ring-forest focus:outline-none ${
                  highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              />
              <button 
                type="submit" 
                className={`px-6 py-3.5 rounded-xl font-display font-bold text-xs cursor-pointer shadow transition-all ${
                  highContrast ? 'bg-white text-black' : 'bg-forest text-white hover:bg-forest-light'
                }`}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 18. CTA BANNER SECTION */}
      <section className="relative py-20 px-4 bg-slate-950 text-white overflow-hidden text-center" id="cta-banner">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600" 
            alt="Impact learning banner" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight leading-[1.1]">
            Learn, Connect &amp; Create Impact
          </h2>
          <p className="text-slate-300 font-sans text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Join our upcoming events and become part of the cooperative movement shaping dryland agrarian self-determination in northern Karnataka.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a 
              href="#register"
              className={`px-6 py-3.5 rounded-xl font-display font-extrabold text-xs tracking-wide shadow-md cursor-pointer ${
                highContrast ? 'bg-white text-black' : 'bg-gold text-slate-950 hover:bg-gold-light'
              }`}
            >
              Register Now
            </a>
            <button 
              onClick={() => setActivePage('volunteer')}
              className={`px-6 py-3.5 rounded-xl font-display font-extrabold text-xs tracking-wide border cursor-pointer hover:bg-white/10 ${
                highContrast ? 'border-white text-white' : 'border-white/20 bg-white/5 text-white'
              }`}
            >
              Become A Volunteer
            </button>
          </div>
        </div>
      </section>

      {/* DEVELOPER PLAYGROUND: SCALABILITY CONTROL PANEL */}
      <section className="py-6 px-4 bg-slate-900 border-t border-slate-800 text-white text-left">
        <div className="max-w-6xl mx-auto space-y-4">
          <button 
            onClick={() => setScalabilityConsoleOpen(!scalabilityConsoleOpen)}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
          >
            <Sliders size={14} />
            <span>[DEVELOPER CONSOLE] Future Scalability &amp; AI Integration Toggles</span>
            <ChevronDown size={14} className={`transition-transform ${scalabilityConsoleOpen ? 'rotate-180' : ''}`} />
          </button>

          {scalabilityConsoleOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="p-6 rounded-2xl bg-black/40 border border-slate-800 space-y-6 text-xs font-mono"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Toggle Feature 1 */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-300">Paid Ticket Subsystem</span>
                    <span className="text-[9px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-black">SCALABLE</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Optionally enable commercial payments for premium advanced classes.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button 
                      onClick={() => setPaidTicketPrice(paidTicketPrice === 0 ? 499 : 0)}
                      className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-bold"
                    >
                      {paidTicketPrice === 0 ? 'Convert to Paid (₹499)' : 'Convert to Free (₹0)'}
                    </button>
                    <span className="text-[11px] font-bold text-gold">Current: {paidTicketPrice === 0 ? 'FREE EVENT' : `₹${paidTicketPrice}`}</span>
                  </div>
                </div>

                {/* Toggle Feature 2 */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-300">Attendance Tracker API</span>
                    <span className="text-[9px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-black">ACTIVE</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Sync attendee check-ins dynamically with barcode scans at check-in gateways.
                  </p>
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input 
                      type="checkbox" 
                      checked={attendanceTrackerEnabled}
                      onChange={e => setAttendanceTrackerEnabled(e.target.checked)}
                      className="rounded border-slate-700 text-forest focus:ring-0" 
                    />
                    <span>{attendanceTrackerEnabled ? 'Tracking Activated' : 'Tracking Deactivated'}</span>
                  </label>
                </div>

                {/* Toggle Feature 3 */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-300">AI Event Assistant</span>
                    <span className="text-[9px] bg-amber-950 text-gold px-2 py-0.5 rounded font-black font-bold">READY</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Interact with a customized LLM agent trained on this event’s metadata.
                  </p>

                  <form onSubmit={handleAiAssistantQuery} className="flex gap-1.5 pt-1">
                    <input 
                      type="text" 
                      value={aiAssistantQuery}
                      onChange={e => setAiAssistantQuery(e.target.value)}
                      placeholder="Ask (e.g. Is lunch free?)..." 
                      className="bg-black border border-slate-800 p-1.5 rounded text-[10px] flex-1 text-white focus:outline-none focus:border-slate-600"
                    />
                    <button type="submit" className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold rounded">
                      Ask
                    </button>
                  </form>
                  {isAiLoading && <p className="text-[9px] text-slate-500 animate-pulse">Consulting model context...</p>}
                  {aiAssistantReply && !isAiLoading && (
                    <div className="p-2 rounded bg-black/60 text-[9px] text-slate-300 leading-relaxed border border-slate-800/50">
                      {aiAssistantReply}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* METADATA & SEO CONSOLE */}
      <section className="py-4 px-4 bg-slate-950 border-t border-slate-900 text-left">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => setSeoConsoleOpen(!seoConsoleOpen)}
            className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 hover:text-slate-400 cursor-pointer"
          >
            <Sparkles size={11} />
            <span>[SEO] Structure &amp; JSON-LD Schema Console</span>
            <ChevronDown size={11} className={`transition-transform ${seoConsoleOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {seoConsoleOpen && (
            <div className="p-4 rounded-xl bg-black/80 border border-slate-900 text-[9px] font-mono text-slate-400 mt-3 space-y-4">
              <div>
                <p className="text-white font-bold">&lt;head&gt; SEO Parameters:</p>
                <div className="pl-4 mt-1 space-y-1 text-slate-500">
                  <p><span className="text-slate-400">title:</span> {event.title} | Raita Mitra Social Trust</p>
                  <p><span className="text-slate-400">description:</span> {event.description}</p>
                  <p><span className="text-slate-400">og:type:</span> event</p>
                  <p><span className="text-slate-400">og:image:</span> {event.image}</p>
                </div>
              </div>
              <div>
                <p className="text-white font-bold">JSON-LD Schema Object:</p>
                <pre className="text-indigo-400 bg-slate-950/60 p-3 rounded-lg overflow-x-auto text-[8px] leading-relaxed mt-1">
{`{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "${event.title}",
  "description": "${event.description}",
  "startDate": "${event.date}",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/${event.mode === 'Online' ? 'OnlineEventAttendanceMode' : 'OfflineEventAttendanceMode'}",
  "location": {
    "@type": "Place",
    "name": "${event.venue}",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "${event.locationDetails.address}"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Raita Mitra Social Trust",
    "url": "https://raitamitra.org"
  }
}`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
