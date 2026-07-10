import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  User, 
  Users, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Filter, 
  Check, 
  Award, 
  Download, 
  Video, 
  Laptop, 
  Heart, 
  Trees, 
  Briefcase, 
  ArrowRight, 
  Search, 
  Share2, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Mail, 
  Phone, 
  Building,
  HeartPulse,
  Leaf,
  FileText,
  BadgeAlert,
  ChevronDown,
  ExternalLink,
  MessageSquare,
  Sparkles,
  BookOpen,
  Image as ImageIcon,
  CheckCircle2,
  Lock,
  ArrowUpRight
} from 'lucide-react';

// Static Categories Config
const CATEGORIES = [
  { id: 'all', title: 'All Categories', icon: Filter, color: 'bg-slate-100 text-slate-800 border-slate-200' },
  { id: 'agriculture', title: 'Agriculture Programs', icon: Leaf, color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { id: 'women', title: 'Women Empowerment', icon: Users, color: 'bg-pink-50 text-pink-700 border-pink-100' },
  { id: 'digital', title: 'AI & Digital Skills', icon: Laptop, color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
  { id: 'health', title: 'Health & Nutrition', icon: HeartPulse, color: 'bg-red-50 text-red-700 border-red-100' },
  { id: 'climate', title: 'Climate Action', icon: Trees, color: 'bg-teal-50 text-teal-700 border-teal-100' },
  { id: 'entrepreneurship', title: 'Entrepreneurship', icon: Briefcase, color: 'bg-amber-50 text-amber-700 border-amber-100' }
];

// Events Dataset
interface EventItem {
  id: string;
  title: string;
  category: 'agriculture' | 'women' | 'digital' | 'health' | 'climate' | 'entrepreneurship';
  categoryLabel: string;
  date: string; // YYYY-MM-DD
  time: string;
  venue: string;
  speaker: string;
  speakerTitle: string;
  speakerImage: string;
  description: string;
  detailedInfo: string;
  seatsRemaining: number;
  totalSeats: number;
  image: string;
  status: 'Upcoming' | 'Past' | 'Ongoing';
  googleCalendarUrl: string;
}

const EVENTS_DATA: EventItem[] = [
  {
    id: 'evt-ai-skills',
    title: 'AI Skills for Rural Youth',
    category: 'digital',
    categoryLabel: 'AI & Digital Skills',
    date: '2026-07-15',
    time: '10:00 AM - 4:00 PM',
    venue: 'Digital Learning Hub, Haveri Government School',
    speaker: 'Prof. Arun Deshpande',
    speakerTitle: 'Lead AI Education Advocate & IISc Alumnus',
    speakerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    description: 'A custom vernacular introduction to generative AI tools, prompt designing, and local micro-job opportunities.',
    detailedInfo: 'This high-impact workshop introduces local high school graduates and rural youth to the foundations of the digital economy. Topics include prompt engineering, secure mobile internet usage, basic software utilities, and local e-commerce, taught completely in Kannada with low-power solar computers.',
    seatsRemaining: 14,
    totalSeats: 40,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800',
    status: 'Upcoming',
    googleCalendarUrl: 'https://calendar.google.com'
  },
  {
    id: 'evt-farmer-awareness',
    title: 'Farmer Awareness Program: Regenerative Ag',
    category: 'agriculture',
    categoryLabel: 'Agriculture Programs',
    date: '2026-07-18',
    time: '09:30 AM - 01:30 PM',
    venue: 'Raita Mitra Demonstration Field, Dharwad',
    speaker: 'Dr. Basavaraj Patil',
    speakerTitle: 'Regenerative Agronomist & Organic Input Consultant',
    speakerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    description: 'Learn bio-pesticide preparation (Jeevamrutha), organic composting, and soil microbiomics in detail.',
    detailedInfo: 'A hands-on, muddy-boots workshop designed for marginal and smallholder farmers. Participants will witness live formulation of organic insect repellents, learn soil health testing using basic test kits, and discover micro-irrigation techniques to survive arid summer cycles.',
    seatsRemaining: 8,
    totalSeats: 60,
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800',
    status: 'Upcoming',
    googleCalendarUrl: 'https://calendar.google.com'
  },
  {
    id: 'evt-women-entrepreneur',
    title: 'Women Entrepreneurship & SHG Finance',
    category: 'women',
    categoryLabel: 'Women Empowerment',
    date: '2026-07-22',
    time: '11:00 AM - 03:00 PM',
    venue: 'Town Panchayat Hall, Belagavi',
    speaker: 'Smt. Lakshmi Devamma',
    speakerTitle: 'Rural Cooperative Advisor, NABARD Fellow',
    speakerImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200',
    description: 'Capacity building and record-keeping workshops for dairy cooperatives and rural handicraft collectives.',
    detailedInfo: 'This module is tailored for Self-Help Groups (SHGs) entering rural trade. We cover simple double-entry bookkeeping, digital UPI payments, micro-grant applications, and cold-chain supply logistics for farm-gate dairy milk producers.',
    seatsRemaining: 22,
    totalSeats: 50,
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800',
    status: 'Upcoming',
    googleCalendarUrl: 'https://calendar.google.com'
  },
  {
    id: 'evt-miyawaki-climate',
    title: 'Miyawaki Forestation & Watershed Drive',
    category: 'climate',
    categoryLabel: 'Climate Action',
    date: '2026-07-28',
    time: '08:00 AM - 11:30 AM',
    venue: 'Arid Lands Perimeter, Bagalkot',
    speaker: 'Shri Suresh Hegde',
    speakerTitle: 'Environmentalist and Miyawaki Pioneer',
    speakerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    description: 'A physical tree-planting campaign combined with training in dense afforestation and water conservation.',
    detailedInfo: 'Help build a drought-shield urban forest patch. This community activity teaches school youth and civic volunteers how to design rich native sapling grids that require minimal water and grow 10x faster than traditional plantations.',
    seatsRemaining: 45,
    totalSeats: 100,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    status: 'Upcoming',
    googleCalendarUrl: 'https://calendar.google.com'
  },
  {
    id: 'evt-anemia-camp',
    title: 'Maternal Nutrition & Anemia Diagnostics',
    category: 'health',
    categoryLabel: 'Health & Nutrition',
    date: '2026-08-02',
    time: '09:00 AM - 02:00 PM',
    venue: 'Primary Healthcare Subcenter, Koppal',
    speaker: 'Dr. Anjali Kulkarni',
    speakerTitle: 'MD Gynecologist & Preventive Health Advocate',
    speakerImage: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=200',
    description: 'Free health diagnostic kits, dietary counselling, and iron-fortified supplement distribution.',
    detailedInfo: 'Mitigating anemia across northern districts. This camp runs diagnostic blood-counts for local expectant and nursing mothers, accompanied by micro-nutritional advice focused on local millets and vegetables.',
    seatsRemaining: 15,
    totalSeats: 50,
    image: 'https://images.unsplash.com/photo-1584515901160-b74a50d26824?auto=format&fit=crop&q=80&w=800',
    status: 'Upcoming',
    googleCalendarUrl: 'https://calendar.google.com'
  },
  {
    id: 'evt-millet-cooking',
    title: 'Value Added Millet Baking Workshop',
    category: 'entrepreneurship',
    categoryLabel: 'Entrepreneurship',
    date: '2026-08-08',
    time: '10:00 AM - 02:30 PM',
    venue: 'Community Kitchen Incubator, Gadag',
    speaker: 'Chef Radhika Prasad',
    speakerTitle: 'Food Technologist & Culinary Trainer',
    speakerImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    description: 'Transforming millets into high-value biscuits, rotis, and healthy snacks for packaging and local retail markets.',
    detailedInfo: 'Targeting higher agricultural margins. Learn nutritional value retention, basic moisture testing for baked products, hygienic storage techniques, and organic nutritional labeling protocols.',
    seatsRemaining: 12,
    totalSeats: 30,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800',
    status: 'Upcoming',
    googleCalendarUrl: 'https://calendar.google.com'
  }
];

// Past Highlights Dataset
const PAST_HIGHLIGHTS = [
  {
    id: 'past-1',
    title: 'Bio-Organic Inputs Masterclass',
    category: 'Agriculture',
    date: 'June 10, 2026',
    venue: 'Savadatti Village, Belagavi',
    beneficiaries: '140+ Marginal Farmers',
    impact: 'Soil health cards distributed; 20 bio-composting pits successfully built on-site.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // placeholder
  },
  {
    id: 'past-2',
    title: 'Solar Computer Lab Inception',
    category: 'AI & Digital Skills',
    date: 'May 18, 2026',
    venue: 'Rural Gov School, Haveri District',
    beneficiaries: '280+ Rural Students',
    impact: 'Installed 12 high-efficiency low-wattage solar workstations running offline learning nodes.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'past-3',
    title: 'Miyawaki Dense Afforestation Drive',
    category: 'Climate Action',
    date: 'April 22, 2026',
    venue: 'Desalinated Lake Area, Gadag',
    beneficiaries: '450 Saplings Planted',
    impact: '1,200 saplings planted using native bio-manures. Maintained by a local youth watchdog group.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

// Speakers Dataset
const SPEAKERS = [
  {
    name: 'Dr. Basavaraj Patil',
    role: 'Regenerative Agronomy Specialist',
    company: 'University of Agricultural Sciences, Dharwad',
    bio: 'An expert in dryland cultivation, Dr. Patil has helped convert 2,500+ acres of chemical-ridden farmlands into flourishing bio-diverse regenerative models.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Smt. Lakshmi Devamma',
    role: 'SHG Micro-Financing Lead & Advisor',
    company: 'Former NABARD Cooperative Officer',
    bio: 'With over 25 years of field experience in rural banking, Smt. Lakshmi counsels women-led cooperatives on self-sustaining debt relief and micro-loans.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Prof. Arun Deshpande',
    role: 'Director of AI Literacy Initiatives',
    company: 'IISc Alumnus & Tech Activist',
    bio: 'Prof. Deshpande designs modular solar-powered hardware architectures and native language curricula to bring computer intelligence to school classrooms.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    linkedin: 'https://linkedin.com'
  }
];

// Testimonials
const TESTIMONIALS = [
  {
    quote: "The AI & Computer Literacy camp at our school was amazing. I coded my first interactive drawing and learned how algorithms work. I feel confident about high school!",
    name: "Akash Kammar",
    role: "10th Grade Student",
    location: "Govt School, Savadatti",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "We formulated Jeevamrutha and Neem Astras on our own farm under Dr. Patil's direct guidance. My inputs cost dropped by 45% and my soil feels dark, moist, and alive.",
    name: "Malleshappa Gowda",
    role: "Marginal Rice Farmer",
    location: "Dharwad District",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "Before this cooperative accounting workshop, our self-help diary register was full of errors. Now we maintain precise cashbooks and have secured credit line checks.",
    name: "Rukmini Savadatti",
    role: "SHG Dairy President",
    location: "Belagavi",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  }
];

// Certificates & Presentation Downloads
const CERTIFICATES_DOWNLOADS = [
  { title: "Standard Participation Certificate Template", size: "1.4 MB", type: "PDF Document" },
  { title: "Regenerative Organic Formulation Guide (Kannada)", size: "4.8 MB", type: "Illustrated Handbook" },
  { title: "Introductory Rural AI Workshop Syllabus & Slide Deck", size: "8.2 MB", type: "PowerPoint / PDF" },
  { title: "Raita Mitra FY2026 Trust Outreach Brochure", size: "2.1 MB", type: "Compliance PDF" }
];

interface EventsProps {
  setActivePage: (page: string) => void;
  highContrast: boolean;
}

export default function Events({ setActivePage, highContrast }: EventsProps) {
  // Navigation & Page references
  const upcomingSectionRef = useRef<HTMLDivElement>(null);
  const registrationSectionRef = useRef<HTMLDivElement>(null);

  // Dynamic events list from localStorage
  const [eventsList, setEventsList] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('raita_mitra_events_list');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return EVENTS_DATA;
  });

  // Fetch events from server on mount
  useEffect(() => {
    fetch('/api/events')
      .then(res => {
        if (!res.ok) throw new Error('API response not ok');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setEventsList(data);
          try {
            localStorage.setItem('raita_mitra_events_list', JSON.stringify(data));
          } catch (err) {
            console.warn('LocalStorage quota limit exceeded when saving events list:', err);
          }
        }
      })
      .catch(err => console.warn('Failed to load events from server:', err));
  }, []);

  // States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'agenda'>('month');
  const [selectedEventId, setSelectedEventId] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('raita_mitra_events_list');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) return parsed[0].id;
      }
    } catch (e) {}
    return 'evt-ai-skills';
  });
  const [currentCalendarDate, setCurrentCalendarDate] = useState<Date>(new Date('2026-07-05')); // Base on July 2026 as per local time context

  // Multi-step Registration form states
  const [regStep, setRegStep] = useState<number>(1);
  const [regForm, setRegForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    organization: '',
    eventId: 'evt-ai-skills',
    participantsCount: 1,
    comments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Active highlighted event for modal or details card
  const selectedEvent = eventsList.find(e => e.id === selectedEventId) || eventsList[0] || EVENTS_DATA[0];

  // Calendar rendering formulas (July 2026 specific structure)
  // July 1, 2026 is a Wednesday. July has 31 days.
  const julyDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const prevMonthPadding = Array.from({ length: 3 }, (_, i) => 28 + i); // Mock padding from June (June 30 is Tuesday)
  const nextMonthPadding = Array.from({ length: 8 }, (_, i) => i + 1); // Mock padding from August

  // Newsletter states
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Sync Google Calendar alert/mock
  const handleGCalSync = (eventTitle: string) => {
    alert(`Google Calendar Integration initiated for "${eventTitle}". This will create an event on July 2026.`);
  };

  const handleRegisterClick = (eventId: string) => {
    setRegForm(prev => ({ ...prev, eventId }));
    setRegStep(1);
    setIsSubmitted(false);
    registrationSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNextStep = () => {
    if (regStep < 3) setRegStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    if (regStep > 1) setRegStep(prev => prev - 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const evt = eventsList.find(item => item.id === regForm.eventId);

    // POST event registration to Server backend
    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'Support Ticket', // Using support ticket / registration category
        name: regForm.fullName,
        email: regForm.email,
        phone: regForm.phone,
        subject: `Event Registration: ${evt?.title || 'Unknown Event'}`,
        message: regForm.comments || `Registration for event id: ${regForm.eventId}. City: ${regForm.city}`,
        metadata: {
          city: regForm.city,
          organization: regForm.organization,
          eventId: regForm.eventId,
          eventTitle: evt?.title || 'Unknown Event',
          participantsCount: regForm.participantsCount,
          comments: regForm.comments
        }
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Event registration logged:', data);
    })
    .catch(err => {
      console.error('Error logging event registration:', err);
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Decrease seat count dynamically for simulated UX
      if (evt && evt.seatsRemaining > 0) {
        evt.seatsRemaining = Math.max(0, evt.seatsRemaining - regForm.participantsCount);
        setEventsList([...eventsList]);
        localStorage.setItem('raita_mitra_events_list', JSON.stringify(eventsList));
      }
    }, 1200);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterName && newsletterEmail) {
      setNewsletterSuccess(true);

      // POST newsletter signup to Server backend
      fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'Newsletter Signup',
          name: newsletterName,
          email: newsletterEmail,
          phone: '',
          subject: 'Events Newsletter Signup',
          message: 'Subscribed to Events & Workshops Hub newsletters.',
          metadata: { page: 'Events & Workshops Hub' }
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log('Events page newsletter signup logged:', data);
      })
      .catch(err => {
        console.error('Error logging newsletter signup:', err);
      });

      setTimeout(() => {
        setNewsletterSuccess(false);
        setNewsletterName('');
        setNewsletterEmail('');
      }, 4000);
    }
  };

  // Filter events list
  const filteredEvents = selectedCategory === 'all' 
    ? eventsList 
    : eventsList.filter(e => e.category === selectedCategory);

  return (
    <div className={`w-full relative overflow-x-hidden ${highContrast ? 'bg-black text-white' : 'bg-[#FAFAFA]'}`} id="events-workshops-hub">
      
      {/* 1. HERO SECTION: CINEMATIC EVENT BANNER */}
      <section className="relative w-full min-h-[500px] md:min-h-[580px] flex items-center justify-center py-20 px-4 md:px-8 bg-slate-950 text-white overflow-hidden" id="events-hero-section">
        {/* Background Visual representation of training drive */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600" 
            alt="Farmers participating in village workshops and training camps"
            className="w-full h-full object-cover opacity-20 filter contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest text-gold font-bold">
            <Sparkles size={14} className="text-gold animate-pulse" />
            RURALLY COMMITTED ENGAGEMENT
          </div>
          
          <h1 className="font-display font-black text-4xl md:text-6xl tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
            Empowering Communities Through <span className="text-gold">Learning &amp; Action</span>
          </h1>
          
          <p className="text-slate-300 font-sans text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Join our workshops, digital literacy classrooms, agricultural field trainings and cooperative events engineered to support sustainable change across northern Karnataka.
          </p>

          {/* Breadcrumb Navigation */}
          <nav className="flex justify-center items-center gap-2.5 text-xs text-slate-400 font-mono py-2">
            <span>Home</span>
            <ChevronRight size={12} />
            <span className="text-white font-bold">Events &amp; Workshops</span>
          </nav>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <button 
              onClick={() => upcomingSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className={`px-6 py-3.5 rounded-xl font-display font-extrabold text-sm tracking-wide cursor-pointer flex items-center gap-2 transition-all shadow-lg hover:scale-[1.02] ${
                highContrast ? 'bg-white text-black' : 'bg-gold hover:bg-gold-light text-slate-950'
              }`}
            >
              <CalendarIcon size={16} />
              View Upcoming Events
            </button>
            <button 
              onClick={() => registrationSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className={`px-6 py-3.5 rounded-xl font-display font-extrabold text-sm tracking-wide cursor-pointer flex items-center gap-2 transition-all border border-white/20 hover:bg-white/10 ${
                highContrast ? 'bg-black text-white border-2 border-white' : 'bg-white/5 text-white'
              }`}
            >
              Register Now
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. FEATURED EVENTS CAROUSEL/GRID SECTION */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto" id="featured-events-section">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <span className="text-xs font-mono font-black text-gold uppercase tracking-widest">AWARDS &amp; SPOTLIGHTS</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white mt-1">
              Featured Events
            </h2>
            <p className="text-slate-500 font-sans text-sm mt-2 max-w-xl">
              Highlights of our highest priority training programs open for registration this season.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventsList.slice(0, 3).map((evt) => (
            <div 
              key={evt.id}
              className={`group flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${
                highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={evt.image} 
                  alt={evt.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] font-mono font-bold bg-gold text-slate-950 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {evt.status}
                </span>
                <span className="absolute bottom-4 left-4 text-xs font-sans text-white font-semibold bg-forest/80 backdrop-blur-md px-3 py-1 rounded-lg">
                  {evt.categoryLabel}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-left">
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-lg md:text-xl text-slate-800 dark:text-white group-hover:text-forest transition-colors">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-300 font-sans line-clamp-2">
                    {evt.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500 font-mono">
                  <div className="flex items-center gap-1">
                    <CalendarIcon size={13} className="text-gold" />
                    <span>July 2026</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-red-600">
                    <Users size={13} />
                    <span>{evt.seatsRemaining} seats left</span>
                  </div>
                </div>
                <div className="pt-2 flex gap-2">
                  <button 
                    onClick={() => {
                      const slugs: Record<string, string> = {
                        'evt-ai-skills': 'ai-skills-for-rural-youth',
                        'evt-farmer-awareness': 'farmer-awareness-program',
                        'evt-women-entrepreneur': 'women-entrepreneurship-workshop',
                        'evt-miyawaki-climate': 'climate-action-drive'
                      };
                      const slug = slugs[evt.id] || 'ai-skills-for-rural-youth';
                      setActivePage(`events/${slug}`);
                    }}
                    className={`flex-1 py-2.5 rounded-xl font-display font-bold text-xs cursor-pointer text-center transition-colors border ${
                      highContrast ? 'border-white text-white bg-black hover:bg-white hover:text-black' : 'border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => handleRegisterClick(evt.id)}
                    className={`flex-1 py-2.5 rounded-xl font-display font-bold text-xs cursor-pointer text-center transition-colors ${
                      highContrast ? 'bg-white text-black' : 'bg-forest text-white hover:bg-forest-light'
                    }`}
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EVENT CATEGORIES SECTION */}
      <section className={`py-12 ${highContrast ? 'bg-black' : 'bg-slate-50'}`} id="event-categories-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-8">
          <div>
            <span className="text-xs font-mono font-black text-forest uppercase tracking-widest">NITI AAYOG COMPLIANT INITIATIVES</span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white mt-1">
              Explore Events By Category
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all ${
                    isSelected 
                      ? highContrast ? 'bg-white text-black border-white' : 'bg-forest border-forest text-white shadow-md scale-105'
                      : highContrast ? 'bg-black text-white border-slate-700 hover:border-white' : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-900'} shrink-0`}>
                    <IconComp size={20} className={isSelected ? 'text-white' : 'text-forest'} />
                  </div>
                  <span className="font-display font-bold text-xs leading-snug">
                    {cat.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CALENDAR SECTION: MONTH/WEEK/AGENDA VIEWS */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto" id="events-calendar-section">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div className="text-left">
            <span className="text-xs font-mono font-black text-gold uppercase tracking-widest font-bold">INTERACTIVE DIALECTICS</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-950 dark:text-white mt-1">
              Outreach Calendar
            </h2>
            <p className="text-slate-500 font-sans text-xs mt-1">
              Active field agenda mapping for <span className="font-bold text-slate-800 dark:text-white">July &amp; August 2026</span> across northern districts.
            </p>
          </div>

          {/* Calendar Controller Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <div className={`p-1 rounded-xl flex items-center gap-1 border ${highContrast ? 'border-white bg-black' : 'bg-slate-100 border-slate-200'}`}>
              {(['month', 'week', 'agenda'] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setCalendarView(view)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-display font-bold capitalize transition-all cursor-pointer ${
                    calendarView === view
                      ? highContrast ? 'bg-white text-black' : 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {view} View
                </button>
              ))}
            </div>
            
            <button
              onClick={() => handleGCalSync("Raita Mitra Full Trust Calendar")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border cursor-pointer ${
                highContrast ? 'border-white text-white' : 'bg-forest/5 text-forest border-forest/10 hover:bg-forest/10'
              }`}
            >
              <CalendarIcon size={14} />
              Google Calendar Integration
            </button>
          </div>
        </div>

        {/* CALENDAR BODY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Calendar Visualizer Area */}
          <div className={`lg:col-span-2 rounded-3xl p-6 border ${
            highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
          }`}>
            
            {/* Calendar Subheader */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-lg text-slate-800 dark:text-white">
                  {calendarView === 'month' ? 'July 2026' : calendarView === 'week' ? 'Week 02 - July 2026' : 'Agenda Feed'}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold uppercase">
                  Local Standard Time
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button className={`p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer ${highContrast ? 'border-white' : ''}`}>
                  <ChevronLeft size={15} />
                </button>
                <button className={`p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer ${highContrast ? 'border-white' : ''}`}>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            {/* MONTH VIEW GRID */}
            {calendarView === 'month' && (
              <div className="space-y-4">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs font-bold text-slate-400 py-1 border-b border-slate-100 dark:border-slate-800">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
                
                {/* Day Nodes */}
                <div className="grid grid-cols-7 gap-2.5">
                  {/* Padding from June */}
                  {prevMonthPadding.map((pd, idx) => (
                    <div key={`prev-${idx}`} className="h-16 md:h-20 p-1.5 rounded-xl text-left bg-slate-50/50 dark:bg-slate-900/30 text-slate-300 dark:text-slate-700 text-xs font-mono font-medium">
                      <span>{pd}</span>
                    </div>
                  ))}

                  {/* July Dates */}
                  {julyDays.map((day) => {
                    const dateStr = `2026-07-${day < 10 ? '0' : ''}${day}`;
                    const hasEvents = eventsList.filter(e => e.date === dateStr);
                    const isToday = day === 5; // July 5, 2026

                    return (
                      <div 
                        key={`day-${day}`}
                        className={`h-16 md:h-20 p-1.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                          isToday 
                            ? 'bg-forest/5 border-forest ring-1 ring-forest/20' 
                            : 'bg-white border-slate-100 dark:bg-black dark:border-slate-800'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`text-xs font-mono font-bold ${isToday ? 'text-forest' : 'text-slate-800 dark:text-white'}`}>
                            {day}
                          </span>
                          {isToday && (
                            <span className="w-1.5 h-1.5 rounded-full bg-forest animate-ping" />
                          )}
                        </div>

                        {/* Event Tags */}
                        <div className="space-y-0.5 overflow-hidden">
                          {hasEvents.map((evt) => (
                            <button
                              key={evt.id}
                              onClick={() => setSelectedEventId(evt.id)}
                              title={evt.title}
                              className={`w-full text-[9px] font-sans truncate font-bold text-left px-1.5 py-0.5 rounded cursor-pointer ${
                                evt.category === 'digital' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40' :
                                evt.category === 'agriculture' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40' :
                                evt.category === 'women' ? 'bg-pink-50 text-pink-700 dark:bg-pink-950/40' :
                                'bg-amber-50 text-amber-700 dark:bg-amber-950/40'
                              }`}
                            >
                              {evt.title.split(':')[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Next month padding */}
                  {nextMonthPadding.map((nd, idx) => (
                    <div key={`next-${idx}`} className="h-16 md:h-20 p-1.5 rounded-xl text-left bg-slate-50/50 dark:bg-slate-900/30 text-slate-300 dark:text-slate-700 text-xs font-mono font-medium">
                      <span>{nd}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WEEK VIEW PANEL */}
            {calendarView === 'week' && (
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-2.5 text-center font-mono text-xs font-bold text-slate-400 py-1 border-b border-slate-100">
                  {['Sun 5', 'Mon 6', 'Tue 7', 'Wed 8', 'Thu 9', 'Fri 10', 'Sat 11'].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2 min-h-[220px]">
                  {/* July 5 (Today) */}
                  <div className="p-2 bg-forest/5 border border-forest rounded-xl text-xs space-y-2 flex flex-col justify-between">
                    <span className="font-bold text-forest">July 5</span>
                    <p className="text-[10px] text-slate-400 font-mono">No active field training today.</p>
                    <div />
                  </div>
                  {/* Rest of the week */}
                  {[6, 7, 8, 9, 10, 11].map((day) => (
                    <div key={day} className="p-2 border border-slate-100 rounded-xl text-xs flex flex-col justify-between dark:border-slate-800">
                      <span className="font-semibold text-slate-400">July {day}</span>
                      <p className="text-[10px] text-slate-400 font-mono">No events.</p>
                      <div />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AGENDA VIEW */}
            {calendarView === 'agenda' && (
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
                {eventsList.map((evt) => (
                  <div 
                    key={evt.id}
                    onClick={() => setSelectedEventId(evt.id)}
                    className={`p-3 rounded-2xl border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                      selectedEventId === evt.id 
                        ? 'bg-forest/5 border-forest' 
                        : 'bg-slate-50 border-slate-100 hover:bg-slate-100/50 dark:bg-slate-900/40 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-center bg-white dark:bg-black px-2.5 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800 shrink-0">
                        <span className="block text-slate-400 text-[10px] uppercase font-mono font-extrabold">Jul</span>
                        <span className="block font-display font-black text-slate-800 dark:text-white text-base leading-none">
                          {evt.date.split('-')[2]}
                        </span>
                      </div>
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-white">{evt.title}</h4>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{evt.time} - {evt.venue.split(',')[0]}</p>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Interactive Detail Area */}
          <div className="space-y-6">
            <div className={`p-6 rounded-3xl border text-left ${
              highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
            }`}>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gold">Selected Event Details</span>
              
              <div className="relative mt-3 h-40 rounded-2xl overflow-hidden">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title} 
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 text-[10px] font-mono font-bold bg-forest/80 backdrop-blur-md text-white px-2 py-0.5 rounded uppercase">
                  {selectedEvent.categoryLabel}
                </span>
              </div>

              <div className="mt-4 space-y-3.5">
                <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white leading-snug">
                  {selectedEvent.title}
                </h3>
                
                <p className="text-xs font-sans text-slate-500 dark:text-slate-300 leading-relaxed font-light">
                  {selectedEvent.detailedInfo}
                </p>

                <div className="space-y-2 pt-2 text-xs font-mono text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={14} className="text-forest shrink-0" />
                    <span>July {selectedEvent.date.split('-')[2]}, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-forest shrink-0" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-gold shrink-0 mt-0.5" />
                    <span className="font-sans text-xs leading-tight">{selectedEvent.venue}</span>
                  </div>
                </div>

                {/* Speaker profile card */}
                <div className={`p-3 rounded-2xl flex items-center gap-3 border ${highContrast ? 'border-white' : 'bg-slate-50 border-slate-100'}`}>
                  <img 
                    src={selectedEvent.speakerImage} 
                    alt={selectedEvent.speaker} 
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="block text-[9px] font-mono text-slate-400 uppercase">Trainer / Speaker</span>
                    <span className="block text-xs font-bold text-slate-800 dark:text-white truncate">{selectedEvent.speaker}</span>
                    <span className="block text-[9px] text-slate-500 truncate">{selectedEvent.speakerTitle}</span>
                  </div>
                </div>

                {/* CTA registration triggers */}
                <div className="pt-2 flex flex-col gap-2">
                  <button 
                    onClick={() => {
                      const slugs: Record<string, string> = {
                        'evt-ai-skills': 'ai-skills-for-rural-youth',
                        'evt-farmer-awareness': 'farmer-awareness-program',
                        'evt-women-entrepreneur': 'women-entrepreneurship-workshop',
                        'evt-miyawaki-climate': 'climate-action-drive'
                      };
                      const slug = slugs[selectedEvent.id] || 'ai-skills-for-rural-youth';
                      setActivePage(`events/${slug}`);
                    }}
                    className={`w-full py-2.5 rounded-xl font-display font-extrabold text-xs cursor-pointer flex items-center justify-center gap-2 transition-all ${
                      highContrast ? 'bg-gold text-slate-950 font-black' : 'bg-gold hover:bg-gold-light text-slate-950 shadow-sm font-bold'
                    }`}
                  >
                    View Full Immersive Page
                    <Sparkles size={13} className="text-slate-950 animate-pulse" />
                  </button>
                  <button 
                    onClick={() => handleRegisterClick(selectedEvent.id)}
                    className={`w-full py-2.5 rounded-xl font-display font-extrabold text-xs cursor-pointer flex items-center justify-center gap-2 transition-all ${
                      highContrast ? 'bg-white text-black' : 'bg-forest text-white hover:bg-forest-light shadow-md'
                    }`}
                  >
                    Register for Event
                    <ArrowRight size={13} />
                  </button>
                  <button 
                    onClick={() => handleGCalSync(selectedEvent.title)}
                    className="w-full py-2.5 rounded-xl font-display font-semibold text-xs border border-slate-200 hover:bg-slate-50 cursor-pointer flex items-center justify-center gap-2 text-slate-700"
                  >
                    Sync to My Google Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. MAGAZINE LAYOUT: UPCOMING EVENTS SECTION */}
      <section ref={upcomingSectionRef} className={`py-16 px-4 md:px-8 border-t border-b ${
        highContrast ? 'bg-black border-slate-800' : 'bg-[#FAFAFA] border-slate-100'
      }`} id="upcoming-magazine-events">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-left space-y-1.5">
            <span className="text-xs font-mono font-black text-forest uppercase tracking-widest">REGIONAL WORKSHOPS</span>
            <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">
              Upcoming Events &amp; Field Camps
            </h2>
            <p className="text-slate-500 font-sans text-xs max-w-xl">
              Verified statutory-compliant capacity programs available for general public, rural community workers, and CSR committees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredEvents.map((evt) => (
              <div 
                key={evt.id}
                className={`p-6 rounded-3xl border flex flex-col md:flex-row gap-6 transition-all hover:shadow-lg ${
                  highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="w-full md:w-44 h-48 md:h-full rounded-2xl overflow-hidden shrink-0">
                  <img 
                    src={evt.image} 
                    alt={evt.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between space-y-4 text-left">
                  <div className="space-y-2">
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-forest bg-forest/5 px-2.5 py-0.5 rounded">
                        {evt.categoryLabel}
                      </span>
                      <span className="text-[10px] font-mono text-red-600 bg-red-50 px-2 py-0.5 rounded font-bold">
                        {evt.seatsRemaining} seats left
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-base md:text-lg text-slate-800 dark:text-white">
                      {evt.title}
                    </h3>
                    
                    <p className="text-xs text-slate-500 font-sans line-clamp-3 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="space-y-1 text-xs font-mono text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon size={12} className="text-gold" />
                      <span>{evt.date} | {evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-gold" />
                      <span className="truncate max-w-[200px]">{evt.venue.split(',')[0]}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button 
                      onClick={() => handleRegisterClick(evt.id)}
                      className={`flex-1 py-2.5 rounded-xl font-display font-bold text-xs cursor-pointer text-center transition-all ${
                        highContrast ? 'bg-white text-slate-950' : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      Register Now
                    </button>
                    <button 
                      onClick={() => { setSelectedEventId(evt.id); upcomingSectionRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 cursor-pointer text-center"
                    >
                      <Share2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MULTI-STEP EVENT REGISTRATION FORM */}
      <section ref={registrationSectionRef} className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="event-registration-section">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          {/* Left Decorative Information */}
          <div className="lg:col-span-2 space-y-6 text-left">
            <span className="text-xs font-mono font-bold text-gold uppercase tracking-widest">NITI AAYOG COMPLIANT PROCESS</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-950 dark:text-white leading-tight">
              Register For Events
            </h2>
            <p className="text-slate-500 font-sans text-sm leading-relaxed font-light">
              All registrations are verified and catalogued for NITI Aayog audits, CSR-1 filing compliances, and general beneficiary logs.
            </p>
            
            <div className="space-y-4 pt-4 text-sm font-sans">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-forest/10 text-forest flex items-center justify-center shrink-0">
                  <Check size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">Instant WhatsApp Confirmation</h4>
                  <p className="text-xs text-slate-500">Official schedule, map coordinate links and speaker files dispatched via WhatsApp API.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-forest/10 text-forest flex items-center justify-center shrink-0">
                  <Check size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">CSR &amp; FCCC Audited Logging</h4>
                  <p className="text-xs text-slate-500">Your registration counts toward local empowerment records for state accountability auditing.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-48 md:h-64 border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600" 
                alt="Community training session"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Multi-Step Form */}
          <div className={`lg:col-span-3 rounded-3xl p-8 border ${
            highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-xl'
          }`}>
            <div className="mb-8 flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Interactive Setup</span>
                <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">Registration Portal</h3>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((step) => (
                  <div 
                    key={step} 
                    className={`h-2.5 w-6 rounded-full transition-all ${
                      regStep === step 
                        ? 'bg-forest' 
                        : regStep > step ? 'bg-forest/40' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
                  
                  {/* STEP 1: PERSONAL INFORMATION */}
                  {regStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h4 className="font-display font-extrabold text-sm text-slate-800 dark:text-white uppercase tracking-wider mb-2">
                        Step 1: Participant Information
                      </h4>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">Full Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Shri / Smt / Kumar..." 
                          value={regForm.fullName}
                          onChange={(e) => setRegForm(prev => ({ ...prev, fullName: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest text-sm bg-slate-50"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">Email Address</label>
                          <input 
                            type="email" 
                            required
                            placeholder="name@organization.org" 
                            value={regForm.email}
                            onChange={(e) => setRegForm(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest text-sm bg-slate-50"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">Mobile Number (WhatsApp Preferred)</label>
                          <input 
                            type="tel" 
                            required
                            placeholder="9100000000" 
                            value={regForm.phone}
                            onChange={(e) => setRegForm(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest text-sm bg-slate-50"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">City / District (Karnataka)</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Dharwad, Haveri, Bengaluru" 
                          value={regForm.city}
                          onChange={(e) => setRegForm(prev => ({ ...prev, city: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest text-sm bg-slate-50"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: EVENT DETAILS */}
                  {regStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h4 className="font-display font-extrabold text-sm text-slate-800 dark:text-white uppercase tracking-wider mb-2">
                        Step 2: Training &amp; Event Choice
                      </h4>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">Select Outreach Workshop</label>
                        <select 
                          value={regForm.eventId}
                          onChange={(e) => setRegForm(prev => ({ ...prev, eventId: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest text-sm bg-slate-50"
                        >
                          {EVENTS_DATA.map(evt => (
                            <option key={evt.id} value={evt.id}>{evt.title} ({evt.seatsRemaining} seats remaining)</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">Institution / Corporate Organization</label>
                          <input 
                            type="text" 
                            placeholder="Optional" 
                            value={regForm.organization}
                            onChange={(e) => setRegForm(prev => ({ ...prev, organization: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest text-sm bg-slate-50"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">No. of Participants</label>
                          <input 
                            type="number" 
                            min={1} 
                            max={10}
                            required
                            value={regForm.participantsCount}
                            onChange={(e) => setRegForm(prev => ({ ...prev, participantsCount: parseInt(e.target.value) || 1 }))}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest text-sm bg-slate-50"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: REVIEWS & COMMENTS */}
                  {regStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h4 className="font-display font-extrabold text-sm text-slate-800 dark:text-white uppercase tracking-wider mb-2">
                        Step 3: Final Review &amp; Comments
                      </h4>

                      <div className={`p-4 rounded-2xl text-xs space-y-2 border ${highContrast ? 'border-white' : 'bg-slate-50 border-slate-100'}`}>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-slate-400 font-mono">Registrant</span>
                          <span className="font-bold text-slate-800 dark:text-white">{regForm.fullName}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-slate-400 font-mono">Mobile</span>
                          <span className="font-bold text-slate-800 dark:text-white">{regForm.phone}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-slate-400 font-mono">Workshop Choice</span>
                          <span className="font-bold text-slate-800 dark:text-white truncate max-w-[200px]">
                            {EVENTS_DATA.find(e => e.id === regForm.eventId)?.title}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-mono">Count</span>
                          <span className="font-bold text-slate-800 dark:text-white">{regForm.participantsCount} Member(s)</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">Additional requirements (e.g. translation support)</label>
                        <textarea 
                          rows={3}
                          placeholder="Please let us know if you require wheelchair logistics or other regional coordination..."
                          value={regForm.comments}
                          onChange={(e) => setRegForm(prev => ({ ...prev, comments: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest text-sm bg-slate-50"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* FORM ACTION CONTROLS */}
                  <div className="pt-4 flex justify-between items-center gap-4">
                    {regStep > 1 ? (
                      <button 
                        type="button"
                        onClick={handlePrevStep}
                        className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-display font-semibold text-xs cursor-pointer hover:bg-slate-50"
                      >
                        Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {regStep < 3 ? (
                      <button 
                        type="button"
                        onClick={handleNextStep}
                        className={`px-6 py-3 rounded-xl font-display font-bold text-xs cursor-pointer flex items-center gap-1.5 ${
                          highContrast ? 'bg-white text-black' : 'bg-forest text-white hover:bg-forest-light'
                        }`}
                      >
                        Next Step
                        <ChevronRight size={13} />
                      </button>
                    ) : (
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-8 py-3.5 rounded-xl font-display font-black text-xs cursor-pointer flex items-center gap-2 tracking-wide uppercase ${
                          highContrast ? 'bg-white text-black' : 'bg-gold text-slate-950 hover:bg-gold-light'
                        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting ? 'Verifying Records...' : 'Confirm Registration'}
                        <CheckCircle2 size={14} className="animate-pulse" />
                      </button>
                    )}
                  </div>

                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 size={36} className="text-forest animate-bounce" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-display font-black text-2xl text-slate-900 dark:text-white">Registration Veridical!</h4>
                    <p className="text-slate-500 font-sans text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you, <span className="font-bold text-slate-800 dark:text-white">{regForm.fullName}</span>. Your details have been parsed and locked into the Raita Mitra Outreach Database.
                    </p>
                  </div>

                  {/* Sync Badges */}
                  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto pt-4 text-left">
                    <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-center gap-2">
                      <MessageSquare size={16} className="text-emerald-600 shrink-0" />
                      <div className="min-w-0">
                        <span className="block text-[9px] font-mono text-slate-400 uppercase">WhatsApp API</span>
                        <span className="block text-[10px] font-bold text-slate-800">Dispatch Pending</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2">
                      <Lock size={16} className="text-slate-500 shrink-0" />
                      <div className="min-w-0">
                        <span className="block text-[9px] font-mono text-slate-400 uppercase">FCCC Compliance</span>
                        <span className="block text-[10px] font-bold text-slate-800">Secure Crypt Log</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setIsSubmitted(false); setRegStep(1); }}
                    className="px-6 py-2.5 rounded-xl font-display font-bold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                  >
                    Register Another Person
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 7. FEATURED SPEAKERS & TRAINERS */}
      <section className={`py-16 border-t ${highContrast ? 'bg-black border-slate-800' : 'bg-slate-50 border-slate-100'}`} id="speaker-trainers-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-black text-forest uppercase tracking-widest">ESTEEMED EXPERTS</span>
            <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">
              Featured Speakers &amp; Trainers
            </h2>
            <p className="text-slate-500 font-sans text-xs max-w-lg mx-auto">
              Our sessions are facilitated by experienced agronomists, rural cooperative veterans, and technology specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SPEAKERS.map((sp, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-3xl border flex flex-col items-center text-center space-y-4 ${
                  highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold shrink-0">
                  <img src={sp.image} alt={sp.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-base text-slate-800 dark:text-white">{sp.name}</h3>
                  <span className="block text-[10px] font-mono font-bold text-gold uppercase">{sp.role}</span>
                  <span className="block text-[10px] text-slate-400 font-sans">{sp.company}</span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-300 font-sans leading-relaxed">
                  {sp.bio}
                </p>

                <div className="flex items-center gap-2 pt-2">
                  <a href={sp.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-700">
                    <Linkedin size={15} />
                  </a>
                  <a href="mailto:info@raitamitra.org" className="p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-700">
                    <Mail size={15} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PAST EVENTS & HIGHLIGHTS TIMELINE */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="past-events-section">
        <div className="text-left space-y-2 mb-12">
          <span className="text-xs font-mono font-black text-gold uppercase tracking-widest font-bold">OUTREACH CHRONICLES</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white">
            Past Events &amp; Highlights
          </h2>
          <p className="text-slate-500 font-sans text-xs">
            Review live field snapshots, community videos, and auditable metrics from completed workshops.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PAST_HIGHLIGHTS.map((past) => (
            <div 
              key={past.id}
              className={`rounded-3xl border overflow-hidden flex flex-col justify-between ${
                highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={past.image} alt={past.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button 
                    onClick={() => alert(`Opening Video Highlight Embed for "${past.title}"`)}
                    className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white cursor-pointer"
                  >
                    <Video size={20} className="fill-white" />
                  </button>
                </div>
                <span className="absolute bottom-2 left-2 text-[9px] font-mono font-bold bg-black/60 text-white px-2 py-0.5 rounded uppercase">
                  {past.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-400">{past.date} | {past.venue}</span>
                  <h3 className="font-display font-extrabold text-base text-slate-800 dark:text-white">{past.title}</h3>
                  <p className="text-xs text-slate-500 font-sans">{past.impact}</p>
                </div>

                <div className={`p-3 rounded-2xl text-[10px] font-mono border ${highContrast ? 'border-white' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex justify-between items-center text-slate-500 mb-1">
                    <span>Beneficiary Reach</span>
                    <span className="font-bold text-forest">{past.beneficiaries}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-forest h-full rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. PINTEREST MASONRY EVENT GALLERY */}
      <section className={`py-16 border-t ${highContrast ? 'bg-black border-slate-800' : 'bg-slate-50 border-slate-100'}`} id="event-gallery-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="text-left">
              <span className="text-xs font-mono font-black text-forest uppercase tracking-widest">SNAP DIARY</span>
              <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">
                Outreach Snapshot Gallery
              </h2>
            </div>
          </div>

          <div className="columns-1 sm:columns-2 md:columns-4 gap-4 space-y-4">
            {[
              { src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=400', label: 'Field Bio-Fertilizer Demo' },
              { src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400', label: 'Village Afforestation Saplings' },
              { src: 'https://images.unsplash.com/photo-1584515901160-b74a50d26824?auto=format&fit=crop&q=80&w=400', label: 'Koppal Mothers Nutrition camp' },
              { src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400', label: 'SHG Women Cooperative Meet' },
              { src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=400', label: 'Haveri Computer Classroom Setup' },
              { src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=400', label: 'Farmers Round-Table Conference' },
              { src: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400', label: 'Regenerative Composting Training' },
              { src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400', label: 'Culinary Millet Baking Session' }
            ].map((img, idx) => (
              <div 
                key={idx}
                className="relative break-inside-avoid rounded-2xl overflow-hidden border border-slate-200 group cursor-pointer dark:border-slate-800"
                onClick={() => alert(`Enlarging snapshot: ${img.label}`)}
              >
                <img src={img.src} alt={img.label} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4 text-left">
                  <div>
                    <span className="text-[9px] font-mono text-gold uppercase font-bold">Outreach Event</span>
                    <p className="text-xs text-white font-semibold font-display">{img.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CERTIFICATES & TRAINING DOWNLOADS */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto" id="certificate-downloads-section">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="text-left space-y-4">
            <span className="text-xs font-mono font-black text-gold uppercase tracking-widest font-bold">LEARNING VAULT</span>
            <h2 className="font-display font-extrabold text-3xl text-slate-950 dark:text-white leading-snug">
              Certificates &amp; Downloads
            </h2>
            <p className="text-slate-500 font-sans text-sm leading-relaxed font-light">
              Access digital copies of workshop presentations, agricultural recipe booklets, training slides, and verified participation templates.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => alert('Dispatched digital credentials query portfolio. Please check your system cookies.')}
                className={`px-5 py-3 rounded-xl font-display font-bold text-xs cursor-pointer flex items-center gap-2 ${
                  highContrast ? 'bg-white text-black' : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <Download size={14} />
                Download Complete Outreach Kit
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {CERTIFICATES_DOWNLOADS.map((doc, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-2xl border flex items-start gap-3 text-left ${
                  highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-forest/5 text-forest shrink-0">
                  <FileText size={18} />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate" title={doc.title}>
                    {doc.title}
                  </h4>
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>{doc.type}</span>
                    <span className="font-bold text-slate-600">{doc.size}</span>
                  </div>
                  <button 
                    onClick={() => alert(`Downloading: ${doc.title}`)}
                    className="pt-1 text-[10px] font-mono font-bold text-forest hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Download size={10} />
                    Download File
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. COMMUNITY ENGAGEMENT METRICS (ANIMATED COUNTERS) */}
      <section className={`py-16 ${highContrast ? 'bg-black text-white' : 'bg-forest text-white'}`} id="engagement-metrics">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { count: '200+', title: 'Events Conducted', label: 'Field workshops & sub-camps' },
            { count: '10,000+', title: 'Participants Reached', label: 'Rural families & school children' },
            { count: '50+', title: 'Training Programs', label: 'Cooperative modules designed' },
            { count: '12+', title: 'Districts Covered', label: 'Across northern Karnataka belt' }
          ].map((m, idx) => (
            <div key={idx} className="space-y-1 text-center md:text-left">
              <span className="font-display font-black text-3xl md:text-5xl text-gold block tracking-tight">
                {m.count}
              </span>
              <h4 className="font-display font-extrabold text-sm text-white">{m.title}</h4>
              <p className="text-[10px] text-white/70 font-mono">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 12. GLASSMORPHISM TESTIMONIALS / SUCCESS STORIES */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto text-left" id="success-stories">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-mono font-black text-forest uppercase tracking-widest">COMMUNITY IMPACT VOICE</span>
          <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">
            Stories From Participants
          </h2>
          <p className="text-slate-500 font-sans text-xs max-w-lg mx-auto">
            Read direct feedback from rural youth, dairy women, and marginal farmers empowered by our training modules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-3xl border flex flex-col justify-between space-y-6 ${
                highContrast ? 'border-2 border-white bg-black' : 'bg-white/40 backdrop-blur-md border-slate-100 shadow-sm'
              }`}
            >
              <div className="space-y-4">
                <span className="text-4xl text-forest font-serif leading-none">&ldquo;</span>
                <p className="text-xs font-sans text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  {t.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-none">{t.name}</h4>
                  <span className="text-[9px] text-slate-400 font-mono">{t.role}</span>
                  <span className="block text-[9px] text-gold font-mono font-bold">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 13. KNOWLEDGE PARTNERS LOGO SLIDER */}
      <section className={`py-12 border-t border-b ${highContrast ? 'bg-black border-slate-800' : 'bg-slate-50 border-slate-100'}`} id="knowledge-partners">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6 text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">COLLABORATIVE TRUST ECOSYSTEM</span>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {['NGO Darpan', 'NABARD', 'UAS Dharwad', 'IISc Digital', 'SELCO Foundation', 'Tata Trusts'].map((p, idx) => (
              <span key={idx} className="font-display font-black text-xs md:text-sm tracking-widest text-slate-500 uppercase">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 14. NEWSLETTER SIGN-UP GLASS CARD */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto" id="newsletter-signup">
        <div className={`p-8 rounded-3xl border text-center space-y-6 ${
          highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-xl'
        }`}>
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-gold uppercase tracking-widest">GET BULLETIN ALERTS</span>
            <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Stay Updated About Upcoming Events</h3>
            <p className="text-slate-500 font-sans text-xs max-w-md mx-auto">
              Subscribe to receive instant schedules, local dispatch files, and event alerts direct to your mailbox.
            </p>
          </div>

          {!newsletterSuccess ? (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto">
              <input 
                type="text" 
                required
                placeholder="Your Name" 
                value={newsletterName}
                onChange={(e) => setNewsletterName(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest text-xs bg-slate-50"
              />
              <input 
                type="email" 
                required
                placeholder="Your Email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest text-xs bg-slate-50"
              />
              <button 
                type="submit"
                className={`px-6 py-3 rounded-xl font-display font-bold text-xs cursor-pointer ${
                  highContrast ? 'bg-white text-black' : 'bg-forest text-white hover:bg-forest-light'
                }`}
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-xs text-forest font-semibold max-w-sm mx-auto flex items-center justify-center gap-2">
              <CheckCircle2 size={16} />
              <span>Successfully subscribed! Check your mailbox.</span>
            </div>
          )}
        </div>
      </section>

      {/* 15. CTA BANNER SECTION */}
      <section className="relative py-20 px-4 md:px-8 bg-slate-950 text-white text-center overflow-hidden" id="cta-banner">
        <div className="absolute inset-0 z-0 opacity-15">
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1600" 
            alt="Rural community training" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white leading-tight">
            Learn, Connect &amp; Create Impact
          </h2>
          <p className="text-slate-300 font-sans text-sm max-w-xl mx-auto leading-relaxed">
            Join our events and become part of a movement for sustainable development.
          </p>
          
          <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
            <button 
              onClick={() => registrationSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className={`px-6 py-3 rounded-xl font-display font-extrabold text-xs tracking-wide cursor-pointer ${
                highContrast ? 'bg-white text-black' : 'bg-gold text-slate-950 hover:bg-gold-light'
              }`}
            >
              Register For Events
            </button>
            <button 
              onClick={() => alert('Redirecting to volunteer interest forms...')}
              className="px-6 py-3 rounded-xl font-display font-bold text-xs border border-white/20 hover:bg-white/10 cursor-pointer"
            >
              Become A Volunteer
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
