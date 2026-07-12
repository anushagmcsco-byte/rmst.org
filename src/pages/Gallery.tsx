import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Newspaper, 
  Download, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Eye, 
  Play, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Share2, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Check, 
  ArrowRight, 
  Award, 
  FileDown, 
  Volume2, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Search,
  Maximize2
} from 'lucide-react';

interface GalleryProps {
  highContrast: boolean;
}

interface PhotoItem {
  id: string;
  title: string;
  category: string;
  image: string;
  location: string;
  date: string;
  photographer: string;
  desc: string;
}

interface VideoItem {
  id: string;
  category: string;
  title: string;
  thumbnail: string;
  youtubeId: string;
  duration: string;
  views: string;
  desc: string;
}

interface EventItem {
  id: string;
  title: string;
  event: string;
  coverImage: string;
  location: string;
  date: string;
  attendees: string;
  desc: string;
}

interface PressItem {
  id: string;
  category: 'Press Releases' | 'News Articles' | 'Government Recognition' | 'Awards & Appreciations';
  title: string;
  source: string;
  date: string;
  image: string;
  snippet: string;
  url?: string;
}

// Visual asset dataset optimized for performance & relevance
const PHOTO_GALLERY: PhotoItem[] = [];

const VIDEO_GALLERY: VideoItem[] = [
  {
    id: 'vid_1',
    category: 'Farmer Story',
    title: 'Reaping Gold: Mallappa\'s Solar Drip Revolution',
    thumbnail: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800',
    youtubeId: 'dQw4w9WgXcQ', // Fallback placeholder
    duration: '04:12',
    views: '1.2K Views',
    desc: 'How switching from heavy flood irrigation to solar-powered drip loops helped Mallappa triple his yield of cotton and groundnut under severe dry weather.'
  },
  {
    id: 'vid_2',
    category: 'Women Entrepreneurship',
    title: 'From Self-Help to Self-Reliance: Yaraguppi Milk Union',
    thumbnail: 'https://images.unsplash.com/photo-1605000797439-75a1500dd334?auto=format&fit=crop&q=80&w=800',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '05:40',
    views: '940 Views',
    desc: 'A look inside the daily operations of Yaraguppi’s all-women milk testing and cold-chain facility, providing stable income lines.'
  },
  {
    id: 'vid_3',
    category: 'Youth Skill Development',
    title: 'Coding in Rural Classrooms: Smart IT Labs',
    thumbnail: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=800',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '03:15',
    views: '2.1K Views',
    desc: 'Documenting the excitement of state high schoolers building custom web screens and exploring digital resources inside our solar IT hubs.'
  },
  {
    id: 'vid_4',
    category: 'Health Initiatives',
    title: 'Diagnostic Care at the Doorstep: Mobile Clinics',
    thumbnail: 'https://images.unsplash.com/photo-1504813184591-01552fffd3be?auto=format&fit=crop&q=80&w=800',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '04:45',
    views: '730 Views',
    desc: 'Tracing the path of our weekly mobile diagnostic van as it bridges critical health consultation gaps for far-flung rural elderly groups.'
  }
];

const EVENT_GALLERY: EventItem[] = [
  {
    id: 'evt_1',
    event: 'Farmer Awareness Programs',
    title: 'Regenerative Soil Health Expo 2026',
    coverImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800',
    location: 'Savanur taluk ground, Haveri',
    date: 'May 12, 2026',
    attendees: '340+ Farmers',
    desc: 'Interactive seed sorting, bio-inoculant preparation setups, and groundwater recharging consultations under the guidance of state agronomists.'
  },
  {
    id: 'evt_2',
    event: 'Women\'s Empowerment Workshops',
    title: 'Cooperative Finance & Audit Summit',
    coverImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800',
    location: 'Raita Mitra Center, Dharwad',
    date: 'April 18, 2026',
    attendees: '85 SHG Leaders',
    desc: 'Hands-on practice utilizing digital ledgers, managing regional credit pools, and filing basic micro-business GST registrations.'
  },
  {
    id: 'evt_3',
    event: 'Digital & AI Skill Programs',
    title: 'Inter-School Python & Design Hackathon',
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
    location: 'Smart IT Lab, Kundgol High School',
    date: 'June 03, 2026',
    attendees: '120 State Students',
    desc: 'A competitive coding and presentation arena showcasing rural STEM students building solutions addressing village water scarcity.'
  },
  {
    id: 'evt_4',
    event: 'Health Camps',
    title: 'Comprehensive Ophthalmology Clinic',
    coverImage: 'https://images.unsplash.com/photo-1504813184591-01552fffd3be?auto=format&fit=crop&q=80&w=800',
    location: 'Panchayat Hall, Yaraguppi',
    date: 'March 24, 2026',
    attendees: '210 Screened',
    desc: 'Providing free eye checkups, prescribing corrective spectacles, and coordinating fully-sponsored cataract surgeries in collaboration with district hospitals.'
  }
];

const PRESS_COVERAGE: PressItem[] = [
  {
    id: 'press_1',
    category: 'News Articles',
    title: 'How Raita Mitra Social Trust is Greening Northern Karnataka Farms',
    source: 'The Hindu',
    date: 'May 18, 2026',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
    snippet: 'A detailed feature highlighting the Trust\'s solar-based micro-drip networks, enabling small agricultural holdings to grow diverse cash crops despite erratic monsoons.'
  },
  {
    id: 'press_2',
    category: 'Government Recognition',
    title: 'State NITI Aayog Advisory Cites Raita Mitra Livelihood Projects',
    source: 'Govt. of Karnataka Gazette',
    date: 'March 11, 2026',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    snippet: 'The Ministry of Rural Development officially recognized Yaraguppi Dairy Union model as an exemplary template for integrated village-level asset creation.'
  },
  {
    id: 'press_3',
    category: 'Awards & Appreciations',
    title: 'Mitra awarded "Best Sustainable ESG Partner 2025"',
    source: 'Decentralized Impact Summit',
    date: 'December 15, 2025',
    image: 'https://images.unsplash.com/photo-1531058020387-3be34455976b?auto=format&fit=crop&q=80&w=800',
    snippet: 'Raita Mitra received regional honors for executing high-transparency corporate CSR projects spanning water shed restoration and high school digital setups.'
  },
  {
    id: 'press_4',
    category: 'Press Releases',
    title: 'Raita Mitra Social Trust Announces Expansion of STEM Coding Camps',
    source: 'RMST Media Bureau',
    date: 'June 10, 2026',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=800',
    snippet: 'Official dispatch announcing partnerships with five new state schools to establish solar-powered smart labs and scratch coding bootcamps reaching 2,500 more children.'
  }
];

const DISTRICTS_DATA = [
  { id: 'dharwad', name: 'Dharwad', projects: 14, reach: '1,240 Families', rating: 'AAA Optimal', x: 25, y: 40, image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=400' },
  { id: 'belagavi', name: 'Belagavi', projects: 16, reach: '1,850 Families', rating: 'AA+ Expanding', x: 15, y: 25, image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=400' },
  { id: 'bagalkot', name: 'Bagalkot', projects: 6, reach: '950 Families', rating: 'AA Stable', x: 38, y: 20, image: 'https://images.unsplash.com/photo-1605000797439-75a1500dd334?auto=format&fit=crop&q=80&w=400' },
  { id: 'gadag', name: 'Gadag', projects: 8, reach: '880 Families', rating: 'AA Optimal', x: 42, y: 45, image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400' },
  { id: 'haveri', name: 'Haveri', projects: 11, reach: '1,320 Families', rating: 'AAA Optimal', x: 30, y: 65, image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=400' },
  { id: 'koppal', name: 'Koppal', projects: 4, reach: '640 Families', rating: 'AA- Active', x: 55, y: 55, image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400' },
  { id: 'raichur', name: 'Raichur', projects: 10, reach: '1,100 Families', rating: 'AA- Expanding', x: 75, y: 35, image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400' },
  { id: 'bidar', name: 'Bidar', projects: 5, reach: '720 Families', rating: 'AA- Active', x: 80, y: 10, image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400' }
];

const MEDIA_RESOURCES = [
  { name: 'Raita Mitra High-Res Brand Logos', format: 'Vector SVG / PNG Pack', size: '2.4 MB', type: 'Logo Downloads' },
  { name: 'Trust Brand Standards & Typography Guidelines', format: 'Standard PDF Document', size: '1.8 MB', type: 'Brand Guidelines' },
  { name: 'Full CSR Partnership Brochure 2026', format: 'Executive PDF Booklet', size: '4.2 MB', type: 'CSR Brochure' },
  { name: 'Statutory Board Annual Narratives 2025', format: 'Comprehensive Report', size: '5.1 MB', type: 'Annual Reports' },
  { name: 'Decentralized Program Impact Audit', format: 'Audited Metric Case', size: '3.6 MB', type: 'Impact Reports' },
  { name: 'Raita Mitra Official Press Kit & Boilerplate', format: 'Word / PDF Handout Pack', size: '1.5 MB', type: 'Press Kit' }
];

const TESTIMONIALS = [
  {
    type: 'Beneficiary Story',
    quote: "With the solar-powered drip system installed by Raita Mitra, I am no longer dependent on uncertain rain cycles. My tomato fields yield healthy returns, and my family has economic peace.",
    author: "Basavaraj Patil",
    role: "Marginalized Farmer",
    location: "Haveri, Karnataka",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    type: 'Volunteer Story',
    quote: "Mentoring children inside the solar STEM labs has been life-changing. Seeing a 12-year-old girl construct her first scratch script to model village sanitation is the greatest award I could ask for.",
    author: "Meera Desai",
    role: "Technical STEM Mentor",
    location: "Bengaluru / Dharwad Hub",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    type: 'Corporate Partner Story',
    quote: "Raita Mitra stands out for its uncompromising operational transparency. Their live geo-tagged coordinate logs and audited quarter-on-quarter Utilization Certificates make ESG reporting simple.",
    author: "Deepak Sen",
    role: "Director of ESG & CSR",
    location: "Tata Tech Ventures",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

const STATIC_FALLBACK_GALLERY = [
  {
    id: "gallery-asset-default-1",
    title: "Precision Solar Drip Grid",
    tags: ["Agriculture", "Dharwad"],
    type: "Image",
    size: "1.8 MB",
    url: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=1000",
    date: "May 2026",
    photographer: "Raita Mitra Staff",
    desc: "Deployment of automated, low-water solar drip irrigation networks in dryland farmer holdings."
  },
  {
    id: "gallery-asset-default-2",
    title: "Organic Compost Distribution",
    tags: ["Agriculture", "Haveri"],
    type: "Image",
    size: "1.4 MB",
    url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1000",
    date: "April 2026",
    photographer: "Raita Mitra Staff",
    desc: "Distribution of high-nutrient Jeevamrutha and vermicompost batches to rural dryland farming clusters."
  },
  {
    id: "gallery-asset-default-3",
    title: "Women Cooperative Gathering",
    tags: ["Women SHGs", "Dharwad"],
    type: "Image",
    size: "2.1 MB",
    url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1000",
    date: "April 2026",
    photographer: "RMST Media",
    desc: "Local self-help group leaders organizing monthly credit ledger reconciliations and micro-finance plans."
  },
  {
    id: "gallery-asset-default-4",
    title: "Dairy Micro-Enterprise Setup",
    tags: ["Women SHGs", "Yaraguppi"],
    type: "Image",
    size: "1.7 MB",
    url: "https://images.unsplash.com/photo-1605000797439-75a1500dd334?auto=format&fit=crop&q=80&w=1000",
    date: "June 2026",
    photographer: "RMST Staff",
    desc: "Automated cold milk collection center managed entirely by rural women-led cooperatives."
  },
  {
    id: "gallery-asset-default-5",
    title: "Smart Lab Python Coding Session",
    tags: ["Skill Labs", "Kundgol"],
    type: "Image",
    size: "2.5 MB",
    url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=1000",
    date: "June 2026",
    photographer: "Tech Mentor Team",
    desc: "Students at rural high schools exploring digital workflows, basic coding, and introductory AI modules."
  },
  {
    id: "gallery-asset-default-6",
    title: "STEM Kit Assembly Workshop",
    tags: ["Skill Labs", "Hubballi"],
    type: "Image",
    size: "1.9 MB",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000",
    date: "May 2026",
    photographer: "Education Lead",
    desc: "Hands-on training session for government school science teachers using dynamic STEM kits."
  },
  {
    id: "gallery-asset-default-7",
    title: "Miyawaki Forest Plantation",
    tags: ["Eco-Climate", "Gadag"],
    type: "Image",
    size: "2.2 MB",
    url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000",
    date: "March 2026",
    photographer: "RMST Green Lead",
    desc: "Afforestation initiative using high-density native tree configurations to prevent soil erosion."
  },
  {
    id: "gallery-asset-default-8",
    title: "Groundwater Recharge Tank",
    tags: ["Eco-Climate", "Belagavi"],
    type: "Image",
    size: "1.6 MB",
    url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1000",
    date: "February 2026",
    photographer: "Watershed Officer",
    desc: "Engineering local watershed collection networks and farm ponds to retain dynamic monsoon waters."
  },
  {
    id: "gallery-asset-default-9",
    title: "Mobile Health Clinic Checkup",
    tags: ["Health Camps", "Koppal"],
    type: "Image",
    size: "2.0 MB",
    url: "https://images.unsplash.com/photo-1504813184591-01552fffd3be?auto=format&fit=crop&q=80&w=1000",
    date: "May 2026",
    photographer: "RMST Clinic Lead",
    desc: "Mobile diagnostic van screening rural community elders for basic diagnostic care."
  },
  {
    id: "gallery-asset-default-10",
    title: "Maternal Nutrition Screening",
    tags: ["Health Camps", "Savanur"],
    type: "Image",
    size: "1.5 MB",
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1000",
    date: "April 2026",
    photographer: "Medical Volunteer",
    desc: "Tracking anemia levels and distributing maternal organic nutrient meal-kits to mothers."
  }
];

export default function Gallery({ highContrast }: GalleryProps) {
  // Dynamic gallery list from server
  const [dynamicGallery, setDynamicGallery] = useState<PhotoItem[]>([]);

  // Load from server or localStorage fallback on mount to ensure we are showing up-to-date images across all devices
  useEffect(() => {
    const handleLoadData = (data: any[]) => {
      const formatted = data.map((item: any, idx: number) => {
        const tag = (item.tags?.[0] || 'Agriculture').toLowerCase();
        let category = 'Agriculture';
        if (tag.includes('women') || tag.includes('empowerment') || tag.includes('shg')) {
          category = 'Women Empowerment';
        } else if (tag.includes('education') || tag.includes('skill') || tag.includes('stem') || tag.includes('ai') || tag.includes('python')) {
          category = 'Education & AI Skills';
        } else if (tag.includes('climate') || tag.includes('environment') || tag.includes('eco')) {
          category = 'Environment';
        } else if (tag.includes('health') || tag.includes('camp') || tag.includes('clinic')) {
          category = 'Health Camps';
        } else if (tag.includes('entrepreneur')) {
          category = 'Entrepreneurship';
        } else if (tag.includes('event')) {
          category = 'Events';
        } else if (tag.includes('agri')) {
          category = 'Agriculture';
        }
        return {
          id: item.id || `dyn_photo_${idx}`,
          category,
          title: item.title,
          image: item.url || item.image || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=1000',
          location: item.tags?.[1] || 'Haveri',
          date: item.date || 'June 2026',
          photographer: item.photographer || 'RMST Staff',
          desc: item.desc || 'Visual documentation of our ongoing rural outreach programs.'
        };
      });
      setDynamicGallery(formatted);
      try {
        localStorage.setItem('raita_mitra_gallery_list', JSON.stringify(data));
      } catch (e) {}
    };

    fetch('/api/gallery?t=' + Date.now())
      .then(res => {
        if (!res.ok) throw new Error('API response not ok');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          handleLoadData(data);
        } else {
          // If server is empty, fallback to fallback list
          handleLoadData(STATIC_FALLBACK_GALLERY);
        }
      })
      .catch(err => {
        console.warn('Failed to load gallery from server:', err);
        // Default fallback when server is unreachable
        handleLoadData(STATIC_FALLBACK_GALLERY);
      });
  }, []);

  // Navigation & Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, []);

  // State Management
  const [selectedPhotoFilter, setSelectedPhotoFilter] = useState<string>('All');
  const [activePhotoLightbox, setActivePhotoLightbox] = useState<PhotoItem | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<VideoItem | null>(null);
  const [activeSocialTab, setActiveSocialTab] = useState<'Instagram' | 'LinkedIn' | 'Facebook' | 'YouTube'>('Instagram');
  const [activePressTab, setActivePressTab] = useState<string>('All');
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  const photoFilters = ['All', 'Agriculture', 'Women Empowerment', 'Education & AI Skills', 'Health Camps', 'Environment', 'Entrepreneurship', 'Events'];
  const pressCategories = ['All', 'Press Releases', 'News Articles', 'Government Recognition', 'Awards & Appreciations'];

  const filteredPhotos = selectedPhotoFilter === 'All' 
    ? dynamicGallery 
    : dynamicGallery.filter(p => p.category === selectedPhotoFilter);

  const filteredPress = activePressTab === 'All' 
    ? PRESS_COVERAGE 
    : PRESS_COVERAGE.filter(p => p.category === activePressTab);

  const startDownloadSimulation = (docName: string) => {
    if (downloadingDoc) return;
    setDownloadingDoc(docName);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadingDoc(null);
            alert(`Download Successful: "${docName}" has been simulated as a high-resolution, secure PDF download.`);
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // Scroll to targeted sectors
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`w-full transition-colors duration-300 ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`} id="gallery-root-view">
      
      {/* 1. CINEMATIC HERO BANNER SECTION */}
      <section className="relative w-full py-24 md:py-32 bg-slate-950 flex flex-col justify-center items-center overflow-hidden text-center text-white px-4" id="gallery-hero">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center mix-blend-overlay scale-105"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/50 z-10"></div>
        
        <div className="relative z-20 max-w-4xl mx-auto space-y-6">
          <nav className="flex justify-center items-center gap-2 text-xs font-mono tracking-wider text-slate-400 mb-2">
            <span className="hover:text-gold cursor-pointer transition-colors" onClick={() => window.location.hash = '#/'}>Home</span>
            <ChevronRight size={12} className="opacity-50" />
            <span className="text-gold font-bold">Gallery & Media Centre</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-gold/15 text-gold border border-gold/35">
            <VideoIcon size={12} />
            Visual Impact Archives
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
            Stories Captured <br />
            <span className="bg-gradient-to-r from-emerald-400 via-gold to-yellow-300 bg-clip-text text-transparent">
              Through Action
            </span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            A visual journey showcasing transformation, empowerment, and sustainable development across rural Karnataka. Real people, tangible impact.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              onClick={() => scrollToSection('photo-gallery-sec')}
              className="px-6 py-3 rounded-full text-xs md:text-sm font-bold bg-gold hover:bg-gold-light text-slate-950 cursor-pointer transition-all flex items-center gap-2 shadow-lg shadow-gold/20"
            >
              <ImageIcon size={16} />
              Explore Photo Stream
            </button>
            <button 
              onClick={() => scrollToSection('video-stories-sec')}
              className="px-6 py-3 rounded-full text-xs md:text-sm font-bold border border-white/20 hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-2"
            >
              <VideoIcon size={16} />
              Watch Video Stories
            </button>
          </div>
        </div>
      </section>

      {/* 2. FEATURED HIGHLIGHTS SECTION */}
      <section className="relative z-30 max-w-7xl mx-auto px-4 -mt-8" id="featured-highlights">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Photo Gallery",
              desc: "Explore high-resolution moments from our rural farm centers, coding labs, and self-help cooperatives.",
              image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=800",
              target: "photo-gallery-sec",
              icon: ImageIcon,
              badge: "8 Categories"
            },
            {
              title: "Video Stories",
              desc: "Watch inspiring documentary shorts detailing successful farmer transformations and community health programs.",
              image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=800",
              target: "video-stories-sec",
              icon: VideoIcon,
              badge: "Simulated Playback"
            },
            {
              title: "Media Coverage",
              desc: "Browse press columns, newspaper editorials, state accolades, and regional press releases.",
              image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
              target: "press-coverage-sec",
              icon: Newspaper,
              badge: "Featured Publications"
            }
          ].map((card, index) => (
            <div 
              key={index}
              onClick={() => scrollToSection(card.target)}
              className={`group relative overflow-hidden rounded-3xl border text-left cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/60 shadow-md shadow-slate-100/40'
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
                <span className="absolute top-4 right-4 bg-slate-900/95 text-gold font-mono text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm border border-gold/25">
                  {card.badge}
                </span>
                <div className="absolute bottom-4 left-4 p-2 rounded-xl bg-gold text-slate-950">
                  <card.icon size={20} />
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-base font-bold font-display tracking-tight text-slate-800 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-300 font-sans leading-relaxed">
                  {card.desc}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 group-hover:underline">
                  <span>Enter section</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PHOTO STATISTICS SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4" id="photo-statistics">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { count: "5,000+", title: "Farmers Empowered", desc: "Regenerative agrarian practices", bg: "from-emerald-50 to-emerald-500/5 dark:from-slate-950 dark:to-slate-950" },
            { count: "3,000+", title: "Youth Trained", desc: "STEM coding & AI skills", bg: "from-amber-50 to-amber-500/5 dark:from-slate-950 dark:to-slate-950" },
            { count: "1,500+", title: "Livelihoods Supported", desc: "Dairy & spice micro-units", bg: "from-cyan-50 to-cyan-500/5 dark:from-slate-950 dark:to-slate-950" },
            { count: "12+", title: "Districts Covered", desc: "Active developmental clusters", bg: "from-indigo-50 to-indigo-500/5 dark:from-slate-950 dark:to-slate-950" }
          ].map((metric, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-3xl border text-center relative overflow-hidden transition-all hover:scale-101 ${
                highContrast ? 'bg-black border-2 border-white' : `bg-gradient-to-b ${metric.bg} border-slate-200/50 shadow-sm`
              }`}
            >
              <div className="relative z-10 space-y-1">
                <span className="text-3xl md:text-4xl font-display font-black text-emerald-700 dark:text-emerald-400 block tracking-tight">
                  {metric.count}
                </span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white font-display uppercase tracking-wide">
                  {metric.title}
                </h4>
                <p className="text-[10px] text-slate-400 font-sans">
                  {metric.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PHOTO GALLERY SECTION (PINTEREST MASONRY) */}
      <section className="py-20 max-w-7xl mx-auto px-4" id="photo-gallery-sec">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">CHRONICLED TRANSFORMATION</span>
          <h2 className={`text-2xl md:text-4xl font-display font-extrabold tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
            Photo Gallery
          </h2>
          <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto font-sans leading-relaxed">
            A comprehensive, filterable archive of physical asset creations, active agrarian modules, and student computer camp classrooms.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {photoFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedPhotoFilter(filter)}
              className={`px-4 py-2 text-xs font-bold rounded-full border cursor-pointer transition-colors ${
                selectedPhotoFilter === filter
                  ? highContrast 
                    ? 'bg-white text-black border-black font-extrabold' 
                    : 'bg-emerald-900 text-white border-emerald-950 shadow-sm'
                  : highContrast
                    ? 'bg-black text-white border-white hover:bg-slate-900'
                    : 'bg-white border-slate-200/70 text-slate-600 hover:bg-slate-50 shadow-sm'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <div 
                  onClick={() => setActivePhotoLightbox(photo)}
                  className={`group relative overflow-hidden rounded-2xl border text-left cursor-pointer transition-all hover:shadow-md ${
                    highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-sm'
                  }`}
                >
                  <div className="relative overflow-hidden bg-slate-100 aspect-[4/3]">
                    <img 
                      src={photo.image} 
                      alt={photo.title} 
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-3 rounded-full bg-white text-emerald-950 shadow-md">
                        <Maximize2 size={16} />
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[8px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
                      {photo.category}
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="text-xs font-bold text-slate-800 dark:text-white leading-tight font-display">
                      {photo.title}
                    </h3>
                    <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin size={10} />
                        {photo.location}
                      </span>
                      <span>{photo.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPhotos.length === 0 && (
          <div className="py-12 text-center text-slate-400 font-mono">
            No logged photographs found for this category.
          </div>
        )}
      </section>

      {/* 5. VIDEO STORIES SECTION (HORIZONTAL CAROUSEL) */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t-2 border-b-2 border-white' : 'bg-slate-100 border-t border-b border-slate-200/40'}`} id="video-stories-sec">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">DIGITAL DOCUMENTARIES</span>
            <h2 className={`text-2xl md:text-4xl font-display font-extrabold tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
              Video Stories
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto font-sans leading-relaxed">
              Immersive, high-fidelity stories following agrarian families, SHG leads, and students, with clickable media players.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VIDEO_GALLERY.map((video) => (
              <div 
                key={video.id}
                onClick={() => setActiveVideoModal(video)}
                className={`group cursor-pointer rounded-2xl border text-left overflow-hidden transition-all hover:shadow-md ${
                  highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-sm'
                }`}
              >
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-102 group-hover:opacity-85"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/20"></div>
                  
                  {/* Glowing Video Button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gold hover:bg-gold-light text-slate-950 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 z-10">
                      <Play size={20} fill="currentColor" className="ml-1" />
                    </div>
                  </div>

                  <span className="absolute bottom-3 right-3 bg-slate-900/90 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                    {video.duration}
                  </span>
                  <span className="absolute top-3 left-3 bg-slate-900/90 text-gold font-mono text-[8px] font-bold px-2 py-0.5 rounded uppercase">
                    {video.category}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-xs md:text-sm font-bold font-display leading-tight text-slate-800 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                    {video.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-300 font-sans leading-relaxed">
                    {video.desc}
                  </p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-1">
                    <span>Documentary Short</span>
                    <span>{video.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SOCIAL MEDIA SECTION (INSTAGRAM STYLE FEED) */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t-2 border-b-2 border-white' : 'bg-white border-t border-b border-slate-200/40'}`} id="social-media-feed">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">COMMUNITY CHANNELS</span>
            <h2 className={`text-2xl md:text-4xl font-display font-extrabold tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
              Follow Our Journey
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto font-sans leading-relaxed">
              Interact with our live mockup feed mirroring current posts, user testimonials, and project dispatches from community streams.
            </p>
          </div>

          {/* Social Platform Toggle */}
          <div className="flex justify-center gap-2 mb-10">
            {['Instagram', 'LinkedIn', 'Facebook', 'YouTube'].map((platform) => (
              <button
                key={platform}
                onClick={() => setActiveSocialTab(platform as any)}
                className={`px-4 py-2 text-xs font-bold rounded-full border cursor-pointer transition-colors ${
                  activeSocialTab === platform
                    ? highContrast ? 'bg-white text-black border-black font-extrabold' : 'bg-emerald-900 text-white border-emerald-950'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200/70 shadow-sm'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>

          <div className="max-w-lg mx-auto">
            <AnimatePresence mode="wait">
              {activeSocialTab === 'Instagram' && (
                <motion.div
                  key="instagram-post"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className={`rounded-2xl border text-left overflow-hidden ${
                    highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/60 shadow-lg'
                  }`}
                >
                  {/* Inst Head */}
                  <div className="p-4 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-0.5">
                        <img 
                          src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=facearea&facepad=2&w=150&h=150&q=80" 
                          alt="Raita Mitra" 
                          className="w-full h-full object-cover rounded-full border border-white"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-slate-800 dark:text-white leading-none block">raitamitra_trust</strong>
                        <span className="text-[9px] text-slate-400 font-mono">Hubballi, Dharwad</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer">Follow</span>
                  </div>

                  {/* Inst Image */}
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600" 
                      alt="Farmer harvest success" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4 text-slate-600 dark:text-white">
                        <Heart size={20} className="hover:text-red-500 cursor-pointer transition-colors" />
                        <MessageCircle size={20} className="hover:text-emerald-500 cursor-pointer transition-colors" />
                        <Share2 size={20} className="hover:text-gold cursor-pointer transition-colors" />
                      </div>
                      <Bookmark size={20} className="hover:text-slate-800 dark:hover:text-gold cursor-pointer transition-colors" />
                    </div>

                    <div className="space-y-1 font-sans text-xs">
                      <p className="font-bold text-slate-800 dark:text-white">842 Likes</p>
                      <p className="leading-relaxed">
                        <strong className="font-bold text-slate-800 dark:text-white mr-1.5">raitamitra_trust</strong>
                        Proud moment at our Savanur training unit! Over 40 marginal farmers harvested their first batch of high-yield organic chilis. Consistent earnings ahead! 🌶️🌱
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono pt-1">
                        2 Days Ago • #RegenerativeAgri #RaitaMitra
                      </p>
                    </div>

                    {/* Inst Comments */}
                    <div className="pt-3 border-t border-slate-100 text-[11px] space-y-1">
                      <p><strong className="font-bold mr-1">anusha.gm</strong> Amazing on-ground work! Keep it up team! 🙌</p>
                      <p><strong className="font-bold mr-1">tatatech_esg</strong> Standard models executed with precision.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSocialTab === 'LinkedIn' && (
                <motion.div
                  key="linkedin-post"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className={`rounded-2xl border text-left overflow-hidden ${
                    highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/60 shadow-lg'
                  }`}
                >
                  <div className="p-4 flex gap-3 items-center border-b border-slate-100">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 border shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=150" 
                        alt="RMST Logo" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <strong className="text-xs font-bold text-slate-800 dark:text-white leading-none block">Raita Mitra Social Trust (R)</strong>
                      <span className="text-[9px] text-slate-400 font-mono block mt-0.5">34,120 Followers • 1w</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 font-sans text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                    <p>
                      We are thrilled to present our Audited Annual Narrative and CSR Progress Statements for Fiscal Year 2025-26. Raita Mitra remains committed to bringing 100% execution transparency for our corporate partners.
                    </p>
                    <p>
                      Special thanks to the ESG boards at Tata Technologies, SELCO, and our institutional volunteers for enabling sustainable irrigation and high school IT lab campaigns in Dharwad district.
                    </p>
                    
                    <div className="border border-slate-100 rounded-xl overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=600" 
                        alt="SHG Women Dairy" 
                        className="w-full h-44 object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="p-3 bg-slate-50 border-t border-slate-100">
                        <h4 className="font-bold text-slate-800">CSR Partnership Brochure & Compliance Kit 2026</h4>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">Verified NGO Darpan: KA/2023/0342549</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 text-[10px] font-bold text-slate-400 font-mono border-t border-slate-100">
                      <span>142 Likes • 18 Comments</span>
                      <span>12 Shares</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSocialTab === 'Facebook' && (
                <motion.div
                  key="facebook-post"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className={`rounded-2xl border text-left overflow-hidden ${
                    highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/60 shadow-lg'
                  }`}
                >
                  <div className="p-4 flex gap-3 items-center border-b border-slate-100">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=150" 
                        alt="RMST FB" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <strong className="text-xs font-bold text-slate-800 dark:text-white leading-none block">Raita Mitra Social Trust</strong>
                      <span className="text-[9px] text-slate-400 font-mono block mt-0.5">June 18 • Public Group</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 font-sans text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                    <p>
                      Our STEM Coding camps are sparking curiosity! 💻✨ Watch our rural high schoolers inside the solar IT Hubs construct their first interactive screens. Education is the greatest catalyst for rural youth development.
                    </p>
                    <img 
                      src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600" 
                      alt="Coding class" 
                      className="w-full h-44 object-cover rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                      <span>👍 You, Basavaraj and 212 others</span>
                      <span>44 shares</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSocialTab === 'YouTube' && (
                <motion.div
                  key="youtube-post"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className={`rounded-2xl border text-left overflow-hidden ${
                    highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/60 shadow-lg'
                  }`}
                >
                  <div className="relative aspect-video bg-slate-900">
                    <img 
                      src="https://images.unsplash.com/photo-1504813184591-01552fffd3be?auto=format&fit=crop&q=80&w=600" 
                      alt="YouTube Channel" 
                      className="w-full h-full object-cover opacity-80"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-10 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center rounded-xl cursor-pointer shadow-lg">
                        <Play size={24} fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 space-y-2 text-xs font-sans">
                    <strong className="text-slate-800 dark:text-white font-display block text-sm leading-tight">
                      Raita Mitra Trust: Transforming Rainfed Agrarian Taluks in Karnataka
                    </strong>
                    <p className="text-slate-500">
                      Our official YouTube channel showcases continuous field-recorded testimonials, live program setups, and volunteer training dispatches.
                    </p>
                    <div className="pt-2 flex justify-between items-center border-t border-slate-100 text-[10px] font-mono text-slate-400">
                      <span>Raita Mitra TV</span>
                      <span>12.4K Subscribers</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 10. MEDIA & PRESS COVERAGE (MAGAZINE CARDS) */}
      <section className="py-20 max-w-7xl mx-auto px-4" id="press-coverage-sec">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">PRESS ARCHIVES</span>
          <h2 className={`text-2xl md:text-4xl font-display font-extrabold tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
            Media & Press Coverage
          </h2>
          <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto font-sans leading-relaxed">
            Review column mentions, newspaper coverages, and official press releases from leading state and national journals.
          </p>
        </div>

        {/* Press Categories Toggle */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {pressCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActivePressTab(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-full border cursor-pointer transition-colors ${
                activePressTab === cat
                  ? highContrast ? 'bg-white text-black border-black font-extrabold' : 'bg-emerald-900 text-white border-emerald-950 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200/70 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPress.map((press) => (
            <div 
              key={press.id}
              className={`p-6 rounded-3xl border text-left flex flex-col md:flex-row gap-6 items-start transition-all hover:shadow-sm ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/50 shadow-sm'
              }`}
            >
              <div className="w-full md:w-44 h-32 overflow-hidden rounded-2xl shrink-0 bg-slate-100">
                <img 
                  src={press.image} 
                  alt={press.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">
                    {press.source}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{press.date}</span>
                </div>
                <h3 className="text-sm font-extrabold font-display leading-tight text-slate-800 dark:text-white">
                  {press.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-300 font-sans leading-relaxed">
                  {press.snippet}
                </p>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer">
                    Read Newspaper Column
                    <ExternalLink size={10} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. DOWNLOAD MEDIA KIT SECTION (PREMIUM RESOURCES) */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t-2 border-b-2 border-white' : 'bg-slate-100 border-t border-b border-slate-200/40'}`} id="media-kit-sec">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">REPRESENTATIVE RESOURCES</span>
            <h2 className={`text-2xl md:text-4xl font-display font-extrabold tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
              Media Resource Centre
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto font-sans leading-relaxed">
              Verify and download board-approved logos, compliance booklets, high-res layouts, and organizational brand guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MEDIA_RESOURCES.map((resource, i) => (
              <div 
                key={i}
                className={`p-6 rounded-3xl border text-left flex flex-col justify-between h-44 ${
                  highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/50 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-flex items-center gap-1 text-[8px] font-mono font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase">
                      {resource.type}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{resource.size}</span>
                  </div>
                  <h3 className="text-xs md:text-sm font-bold font-display leading-tight text-slate-800 dark:text-white mt-1">
                    {resource.name}
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">Format: {resource.format}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-[9px] font-mono text-emerald-600 font-bold">✓ Vetted Archive</span>
                  
                  {downloadingDoc === resource.name ? (
                    <div className="text-[10px] font-mono text-emerald-600 text-right space-y-1">
                      <span className="animate-pulse font-bold">Simulating... {downloadProgress}%</span>
                      <div className="w-20 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 transition-all duration-150" style={{ width: `${downloadProgress}%` }}></div>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => startDownloadSimulation(resource.name)}
                      className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:underline"
                    >
                      <Download size={12} />
                      Download
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. TESTIMONIALS SECTION (GLASSMORPHISM CARDS) */}
      <section className="py-20 max-w-7xl mx-auto px-4 animate-fade-in" id="testimonials">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">EMOTIONAL TESTIMONY</span>
          <h2 className={`text-2xl md:text-4xl font-display font-extrabold tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
            Voices of Impact
          </h2>
          <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto font-sans leading-relaxed">
            Real experiences from marginalized agrarian families, voluntary mentors, and corporate ESG boards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test, index) => (
            <div 
              key={index}
              className={`p-8 rounded-3xl border text-left flex flex-col justify-between backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:shadow-md ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white/80 border-slate-200/60 shadow-lg shadow-slate-100/50'
              }`}
            >
              {/* Trust watermark */}
              <div className="absolute -top-10 -right-10 text-emerald-500/5 pointer-events-none font-display font-black text-9xl">
                RMST
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full uppercase tracking-wider">
                    {test.type}
                  </span>
                  <Award size={18} className="text-slate-300 dark:text-white" />
                </div>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 italic font-sans leading-relaxed relative z-10">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-4 border-t border-slate-100 relative z-10">
                <img 
                  src={test.avatar} 
                  alt={test.author} 
                  className="w-12 h-12 rounded-full object-cover border border-emerald-500/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white font-display leading-tight">{test.author}</h4>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{test.role} • {test.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 13. CALL TO ACTION SECTION */}
      <section className="relative w-full py-20 bg-slate-950 overflow-hidden text-center text-white px-4" id="gallery-cta">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-slate-950/80 z-10"></div>

        <div className="relative z-20 max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-4xl font-display font-extrabold tracking-tight">
            Join Us In Creating Lasting Impact
          </h2>
          <p className="text-slate-300 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Together, we can scale solar crop irrigation grids, support girl-child computing coding clinics, and construct secure watershed blocks.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              onClick={() => window.location.hash = '#/volunteer'}
              className="px-6 py-3 rounded-full text-xs font-bold bg-gold hover:bg-gold-light text-slate-950 cursor-pointer transition-colors shadow-md"
            >
              Become A Volunteer
            </button>
            <button 
              onClick={() => window.location.hash = '#/compliance'}
              className="px-6 py-3 rounded-full text-xs font-bold border border-white/20 hover:bg-white/10 cursor-pointer transition-colors"
            >
              Partner With Us
            </button>
            <button 
              onClick={() => window.location.hash = '#/donate'}
              className="px-6 py-3 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer transition-colors shadow-md"
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* 14. INFINITE SCROLLING MARQUEE STRIP */}
      <section className="py-6 bg-slate-950 overflow-hidden relative z-20 border-t border-white/10" id="infinite-scroller-strip">
        <div className="flex w-[200%] gap-4 animate-marquee hover:[animation-play-state:paused]">
          {[
            { tag: "Agriculture", img: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=300" },
            { tag: "Education", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=300" },
            { tag: "Women Empowerment", img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=300" },
            { tag: "Health", img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=300" },
            { tag: "Environment", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=300" }
          ].concat([
            { tag: "Agriculture", img: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=300" },
            { tag: "Education", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=300" },
            { tag: "Women Empowerment", img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=300" },
            { tag: "Health", img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=300" },
            { tag: "Environment", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=300" }
          ]).map((item, idx) => (
            <div key={idx} className="w-48 shrink-0 relative rounded-xl overflow-hidden aspect-video group">
              <img 
                src={item.img} 
                alt={item.tag} 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-100 group-hover:opacity-70 transition-opacity"></div>
              <span className="absolute bottom-2 left-2 text-[8px] font-mono font-bold text-white uppercase bg-slate-900/80 px-2 py-0.5 rounded">
                {item.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Custom scroll animation inject directly as template literals */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
        `}</style>
      </section>

      {/* 15. PHOTO LIGHTBOX MODAL */}
      <AnimatePresence>
        {activePhotoLightbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full text-center"
            >
              <button 
                onClick={() => setActivePhotoLightbox(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-gold text-xs font-mono cursor-pointer uppercase flex items-center gap-1.5"
              >
                <X size={16} />
                CLOSE [×]
              </button>
              
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
                {/* Top-Right Absolute Close Overlay Button */}
                <button 
                  onClick={() => setActivePhotoLightbox(null)}
                  className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white hover:text-gold transition-colors border border-white/20 cursor-pointer shadow-lg"
                  aria-label="Close Lightbox"
                  id="close-photo-overlay"
                >
                  <X size={18} />
                </button>

                <img 
                  src={activePhotoLightbox.image} 
                  alt={activePhotoLightbox.title} 
                  className="w-full h-auto max-h-[65vh] object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
                
                <div className="p-6 bg-slate-900 text-left space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono font-bold uppercase bg-gold/20 text-gold-light px-2.5 py-1 rounded">
                      {activePhotoLightbox.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Photographer: {activePhotoLightbox.photographer}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white font-display leading-tight">{activePhotoLightbox.title}</h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">{activePhotoLightbox.desc}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800">
                    <span className="flex items-center gap-1">
                      <MapPin size={10} />
                      {activePhotoLightbox.location}
                    </span>
                    <span>Date logged: {activePhotoLightbox.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 16. VIDEO MODAL (SIMULATED / YOUTUBE PLAYER) */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full text-center"
            >
              <button 
                onClick={() => setActiveVideoModal(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-gold text-xs font-mono cursor-pointer uppercase flex items-center gap-1.5"
              >
                <X size={16} />
                CLOSE [×]
              </button>
              
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
                {/* Top-Right Absolute Close Overlay Button */}
                <button 
                  onClick={() => setActiveVideoModal(null)}
                  className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white hover:text-gold transition-colors border border-white/20 cursor-pointer shadow-lg animate-pulse"
                  aria-label="Close Video Player"
                  id="close-video-overlay"
                >
                  <X size={18} />
                </button>
                
                {/* Youtube Video iframe or Fallback Mock player */}
                <div className="relative aspect-video bg-black">
                  <iframe 
                    src={`https://www.youtube.com/embed/${activeVideoModal.youtubeId}?autoplay=1&mute=1`}
                    title={activeVideoModal.title}
                    className="absolute inset-0 w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  />
                </div>

                <div className="p-6 bg-slate-900 text-left space-y-2 text-white">
                  <span className="text-[9px] font-mono font-bold uppercase bg-gold/20 text-gold-light px-2 py-0.5 rounded">
                    {activeVideoModal.category}
                  </span>
                  <h3 className="text-base font-extrabold font-display leading-tight">{activeVideoModal.title}</h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">{activeVideoModal.desc}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800">
                    <span>Documentary Short ({activeVideoModal.duration})</span>
                    <span>{activeVideoModal.views}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
