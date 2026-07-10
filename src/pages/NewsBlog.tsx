import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Calendar, 
  User, 
  BookOpen, 
  ArrowRight, 
  X,
  Clock,
  Leaf,
  Users,
  Laptop,
  HeartPulse,
  Trees,
  Briefcase,
  Building2,
  Download,
  Play,
  Volume2,
  Award,
  TrendingUp,
  Newspaper,
  FileText,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  MessageSquare,
  Send,
  ExternalLink,
  Eye,
  Sparkles,
  Globe,
  ThumbsUp,
  Check
} from 'lucide-react';
import { 
  AreaChart, Area, 
  BarChart, Bar, 
  PieChart, Cell, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, RadialBarChart, RadialBar 
} from 'recharts';
import { RICH_ARTICLES, ExtendedArticle } from '../data/blogArticles';

interface NewsBlogProps {
  setActivePage: (page: string) => void;
  highContrast: boolean;
}

// Multilingual translations dictionary
const TRANSLATIONS = {
  en: {
    heroTitle: "Stories, Insights & Knowledge",
    heroSubtitle: "Explore stories, reports, events, research and thought leadership from Raita Mitra Social Trust (R).",
    searchPlaceholder: "Search articles, reports, insights...",
    categoriesTitle: "Browse by Focus Area",
    latestTitle: "Latest Publications",
    successTitle: "Impact Stories",
    reportsTitle: "Research & Impact Reports",
    infographicsTitle: "Knowledge Through Visual Insights",
    popularTitle: "Popular Topics",
    newsletterTitle: "Stay Updated on our Work",
    newsletterSub: "Subscribe to our monthly digest on rural development, natural agriculture, and STEM education.",
    socialTitle: "Follow Our Journey",
    mediaTitle: "Media Mentions & Press Coverage",
    downloadsTitle: "Knowledge Resources",
    volunteerButton: "Become A Volunteer",
    partnerButton: "Partner With Us",
    donateButton: "Donate Now",
    ctaTitle: "Join Our Journey Towards Sustainable Development",
    ctaSub: "Become a partner, donor or volunteer and help create lasting impact.",
    readArticle: "Read Full Article",
    simulatedDownload: "Secure Download Simulated Successfully!",
    recommendationsTitle: "AI-Powered Recommendations",
    relatedTitle: "Based on your interest in this topic, the RMST AI recommended:",
    timelineTitle: "Events & Workshops",
    timelineSub: "A chronological timeline of active on-field programs, skill workshops, and healthcare expos."
  },
  kn: {
    heroTitle: "ಕಥೆಗಳು, ಒಳನೋಟಗಳು ಮತ್ತು ಜ್ಞಾನ",
    heroSubtitle: "ರೈತ ಮಿತ್ರ ಸೋಷಿಯಲ್ ಟ್ರಸ್ಟ್ (R) ನಿಂದ ಕಥೆಗಳು, ವರದಿಗಳು, ಸಂಶೋಧನೆ ಮತ್ತು ನಾಯಕತ್ವದ ಒಳನೋಟಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
    searchPlaceholder: "ಲೇಖನಗಳು, ವರದಿಗಳು, ಒಳನೋಟಗಳನ್ನು ಹುಡುಕಿ...",
    categoriesTitle: "ಗಮನಹರಿಸುವ ಕ್ಷೇತ್ರಗಳು",
    latestTitle: "ಇತ್ತೀಚಿನ ಪ್ರಕಟಣೆಗಳು",
    successTitle: "ಪ್ರಭಾವದ ಕಥೆಗಳು",
    reportsTitle: "ಸಂಶೋಧನೆ ಮತ್ತು ಪ್ರಭಾವದ ವರದಿಗಳು",
    infographicsTitle: "ದೃಶ್ಯ ಒಳನೋಟಗಳ ಮೂಲಕ ಜ್ಞಾನ",
    popularTitle: "ಜನಪ್ರಿಯ ವಿಷಯಗಳು",
    newsletterTitle: "ನಮ್ಮ ಕಾರ್ಯಗಳ ಬಗ್ಗೆ ನವೀಕೃತವಾಗಿರಿ",
    newsletterSub: "ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ, ನೈಸರ್ಗಿಕ ಕೃಷಿ ಮತ್ತು ಕಾಗ್ನಿಟಿವ್ ಶಿಕ್ಷಣದ ಕುರಿತು ನಮ್ಮ ಮಾಸಿಕ ವರದಿಗೆ ಚಂದಾದಾರರಾಗಿ.",
    socialTitle: "ನಮ್ಮ ಪಯಣವನ್ನು ಅನುಸರಿಸಿ",
    mediaTitle: "ಮಾಧ್ಯಮ ಉಲ್ಲೇಖಗಳು ಮತ್ತು ಪ್ರೆಸ್ ಕವರೇಜ್",
    downloadsTitle: "ಜ್ಞಾನ ಸಂಪನ್ಮೂಲಗಳು",
    volunteerButton: "ಸ್ವಯಂಸೇವಕರಾಗಿ",
    partnerButton: "ನಮ್ಮೊಂದಿಗೆ ಪಾಲುದಾರರಾಗಿ",
    donateButton: "ಈಗಲೇ ದೇಣಿಗೆ ನೀಡಿ",
    ctaTitle: "ಸುಸ್ಥಿರ ಅಭಿವೃದ್ಧಿಯತ್ತ ನಮ್ಮ ಪ್ರಯಾಣದಲ್ಲಿ ಪಾಲ್ಗೊಳ್ಳಿ",
    ctaSub: "ಪಾಲುದಾರರಾಗಿ, ದಾನಿಯಾಗಿ ಅಥವಾ ಸ್ವಯಂಸೇವಕರಾಗಿ ಮತ್ತು ಶಾಶ್ವತ ಪ್ರಭಾವ ಬೀರಲು ಸಹಾಯ ಮಾಡಿ.",
    readArticle: "ಪೂರ್ಣ ಲೇಖನ ಓದಿ",
    simulatedDownload: "ಡೌನ್‌ಲೋಡ್ ಯಶಸ್ವಿಯಾಗಿದೆ!",
    recommendationsTitle: "AI-ಚಾಲಿತ ಶಿಫಾರಸುಗಳು",
    relatedTitle: "ಈ ವಿಷಯದ ಮೇಲಿನ ನಿಮ್ಮ ಆಸಕ್ತಿಯ ಆಧಾರದ ಮೇಲೆ, RMST AI ಶಿಫಾರಸು ಮಾಡಿದೆ:",
    timelineTitle: "ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಕಾರ್ಯಾಗಾರಗಳು",
    timelineSub: "ಸಕ್ರಿಯ ಆನ್-ಫೀಲ್ಡ್ ಕಾರ್ಯಕ್ರಮಗಳು, ಕೌಶಲ್ಯ ಕಾರ್ಯಾಗಾರಗಳು ಮತ್ತು ಆರೋಗ್ಯ ಪ್ರದರ್ಶನಗಳ ಪ್ರಗತಿಪರ ಟೈಮ್‌ಲೈನ್."
  },
  hi: {
    heroTitle: "कहानियां, अंतर्दृष्टि और ज्ञान",
    heroSubtitle: "रायता मित्रा सोशल ट्रस्ट (R) की कहानियां, रिपोर्ट, अनुसंधान और विचार नेतृत्व का अन्वेषण करें।",
    searchPlaceholder: "लेख, रिपोर्ट, अंतर्दृष्टि खोजें...",
    categoriesTitle: "फोकस क्षेत्रों के अनुसार ब्राउज़ करें",
    latestTitle: "नवीनतम प्रकाशन",
    successTitle: "प्रभाव की कहानियां",
    reportsTitle: "अनुसंधान और प्रभाव रिपोर्ट",
    infographicsTitle: "दृश्य अंतर्दृष्टि के माध्यम से ज्ञान",
    popularTitle: "लोकप्रिय विषय",
    newsletterTitle: "हमारे काम के बारे में अपडेट रहें",
    newsletterSub: "ग्रामीण विकास, प्राकृतिक कृषि और स्टेम शिक्षा पर हमारे मासिक डाइजेस्ट की सदस्यता लें।",
    socialTitle: "हमारी यात्रा का अनुसरण करें",
    mediaTitle: "मीडिया उल्लेख और प्रेस कवरेज",
    downloadsTitle: "ज्ञान संसाधन",
    volunteerButton: "स्वयंसेवक बनें",
    partnerButton: "हमारे साथ भागीदार बनें",
    donateButton: "अभी दान करें",
    ctaTitle: "सतत विकास की दिशा में हमारी यात्रा में शामिल हों",
    ctaSub: "भागीदार, दाता या स्वयंसेवक बनें और स्थायी प्रभाव बनाने में मदद करें।",
    readArticle: "पूरा लेख पढ़ें",
    simulatedDownload: "डाउनलोड सफलतापूर्वक सिम्युलेट किया गया!",
    recommendationsTitle: "एआई-संचालित सिफारिशें",
    relatedTitle: "इस विषय में आपकी रुचि के आधार पर, RMST AI ने सिफारिश की है:",
    timelineTitle: "कार्यक्रम और कार्यशालाएं",
    timelineSub: "सक्रिय ऑन-फील्ड कार्यक्रमों, कौशल कार्यशालाओं और स्वास्थ्य शिविरों का कालानुक्रमिक समयरेखा।"
  }
};

// Recharts simulated datasets
const BENEFICIARY_GROWTH_DATA = [
  { year: '2022', farmers: 1200, youth: 500, women: 350 },
  { year: '2023', farmers: 2100, youth: 1100, women: 600 },
  { year: '2024', farmers: 3400, youth: 1800, women: 950 },
  { year: '2025', farmers: 4600, youth: 2500, women: 1250 },
  { year: '2026', farmers: 5200, youth: 3100, women: 1520 }
];

const DISTRICT_IMPACT_DATA = [
  { district: 'Dharwad', projects: 14, families: 1240 },
  { district: 'Belagavi', projects: 16, families: 1850 },
  { district: 'Haveri', projects: 11, families: 1320 },
  { district: 'Gadag', projects: 8, families: 880 },
  { district: 'Bagalkot', projects: 6, families: 950 },
  { district: 'Koppal', projects: 4, families: 640 },
  { district: 'Raichur', projects: 10, families: 1100 },
  { district: 'Bidar', projects: 5, families: 720 }
];

const PROGRAM_PIE_DATA = [
  { name: 'Agriculture', value: 35, color: '#10b981' },
  { name: 'Women Empowerment', value: 25, color: '#f59e0b' },
  { name: 'Education & AI', value: 20, color: '#06b6d4' },
  { name: 'Health & Nutrition', value: 10, color: '#ec4899' },
  { name: 'Climate Action', value: 10, color: '#8b5cf6' }
];

const SDG_ALIGNMENT_DATA = [
  { name: 'SDG 1 No Poverty', percent: 95, color: '#e5243b' },
  { name: 'SDG 2 Zero Hunger', percent: 90, color: '#dda63a' },
  { name: 'SDG 5 Gender Equality', percent: 85, color: '#ff3a21' },
  { name: 'SDG 8 Decent Work', percent: 80, color: '#a21942' },
  { name: 'SDG 13 Climate Action', percent: 75, color: '#3f7e44' }
];

const CHRONOLOGICAL_TIMELINE = [
  {
    date: 'June 2026',
    title: 'Python Coding Camp & STEM Hackathon',
    type: 'Education & AI Skills',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400',
    videoThumb: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400',
    desc: 'Bringing computational logic to 120 school girls in Dharwad using solar hubs.'
  },
  {
    date: 'May 2026',
    title: 'Soil Health & Natural Farm Expo',
    type: 'Agriculture',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=400',
    videoThumb: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=400',
    desc: 'Empowering 340+ farmers with bio-input methodologies and water management.'
  },
  {
    date: 'April 2026',
    title: 'Cooperative Finance Workshop',
    type: 'Women Empowerment',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=400',
    videoThumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    desc: 'Training SHG dairy leaders in financial auditing and digital bookkeeping.'
  },
  {
    date: 'March 2026',
    title: 'Mobile Ophthalmology Screening Clinic',
    type: 'Health Camps',
    image: 'https://images.unsplash.com/photo-1504813184591-01552fffd3be?auto=format&fit=crop&q=80&w=400',
    videoThumb: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400',
    desc: 'Pediatric and elderly screenings reaching 210 remote village families.'
  }
];

const SUCCESS_STORIES = [
  {
    id: 'ss_1',
    title: 'Farmer Success Stories',
    subtitle: 'From Seasonal Deficits to Crop Security',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600',
    highlight: 'Solar-Powered Drip Irrigation Shift',
    metric: '3x Income Increase',
    quote: "Switching from chemical fertilizers to organic soil formulation under Raita Mitra's guidelines has lowered my input costs by 60%. My groundnut fields yielded a healthy harvest even during this dry summer.",
    farmer: 'Mallappa Gowda, Savanur Taluk'
  },
  {
    id: 'ss_2',
    title: 'Women Entrepreneurship Stories',
    subtitle: 'Leading Dairy Cold-Chains Independently',
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=600',
    highlight: 'Yaraguppi Dairy Cooperative Ledger',
    metric: '₹12K Stable Monthly Revenue',
    quote: "By processing and analyzing milk locally with automated diagnostic machines, we receive fair prices instantly. The cooperative has given us economic independence and a collective voice.",
    farmer: 'Meenakshi Patil, SHG Leader'
  },
  {
    id: 'ss_3',
    title: 'Youth Skill Development Stories',
    subtitle: 'Rural Classrooms Building Technology Solutions',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600',
    highlight: 'Solar IT Python & Design Lab',
    metric: '12 State Schools Powered',
    quote: "I never touched a computer before Raita Mitra opened the IT lab in our state school. Now I can build simple Scratch programs. I want to build solar weather systems for our farm when I grow up.",
    farmer: 'Shalini K., High School Student'
  }
];

const VIDEO_CAROUSEL_ITEMS = [
  {
    id: 'v_1',
    category: 'Farmer Awareness Videos',
    title: 'Step-by-Step Jeevamrutha Organic Preparation',
    thumb: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=500',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '06:15'
  },
  {
    id: 'v_2',
    category: 'Women Empowerment Videos',
    title: 'Yaraguppi Milk Cooperative Success Documentary',
    thumb: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=500',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '08:42'
  },
  {
    id: 'v_3',
    category: 'AI Skills Programs',
    title: 'Inside the Smart IT Solar Classrooms',
    thumb: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=500',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '04:30'
  },
  {
    id: 'v_4',
    category: 'Health Awareness Sessions',
    title: 'Mobile Diagnostics: Preventive Care Outreach',
    thumb: 'https://images.unsplash.com/photo-1504813184591-01552fffd3be?auto=format&fit=crop&q=80&w=500',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '05:10'
  }
];

const FEATURED_REPORTS = [
  {
    title: 'Annual Impact Reports 2025-26',
    desc: 'Audited program metrics, milestone completions, and spatial distribution summaries across northern districts.',
    size: '5.4 MB',
    type: 'Impact Report'
  },
  {
    title: 'Program Evaluation Reports: Agrarian Solar Pumps',
    desc: 'A five-taluk empirical comparison of water use efficiency and groundnut crop health with micro-drip networks.',
    size: '3.8 MB',
    type: 'Program Evaluation'
  },
  {
    title: 'Case Studies: Yaraguppi Women Dairy Cooperative',
    desc: 'Tracing the financial trajectory, governance architecture, and collective income stability of 180 SHG members.',
    size: '2.9 MB',
    type: 'Case Study'
  },
  {
    title: 'Whitepapers: Bio-Inoculants in Dryland Soils',
    desc: 'Agronomical data tracking mycorrhizal colonizations and organic soil carbon restoration under regenerative models.',
    size: '4.2 MB',
    type: 'Whitepaper'
  },
  {
    title: 'CSR Project Reports: Solar IT Smart Classrooms',
    desc: 'Metrics tracking STEM computer literacy, hardware longevity, and class schedules across 12 high schools.',
    size: '3.1 MB',
    type: 'CSR Project'
  }
];

const PRESS_COVERAGE = [
  {
    id: 'pc_1',
    category: 'Newspaper Articles',
    title: 'Sustainable Soil Projects Boost Raita Mitra Trust Outcomes',
    source: 'The Hindu BusinessLine',
    date: 'June 05, 2026',
    snippet: 'Special column discussing the voluntary carbon farming credit aggregation introduced in Haveri & Dharwad.'
  },
  {
    id: 'pc_2',
    category: 'Government Features',
    title: 'Karnataka Ministry of Agriculture Commends SHG Milk Union',
    source: 'GOK Press Information Bureau',
    date: 'April 19, 2026',
    snippet: 'Official commendation citing the Yaraguppi automated fat-testing chilling cooperative as a benchmark model.'
  },
  {
    id: 'pc_3',
    category: 'Awards & Recognition',
    title: 'RMST Wins ESG Excellence Award 2025',
    source: 'Federation of Sustainable Philanthropy',
    date: 'December 12, 2025',
    snippet: 'Honored for standardizing transparent quarterly utilization audits for rural climate rehabilitation programs.'
  },
  {
    id: 'pc_4',
    category: 'Press Releases',
    title: 'Solar Coding Labs Program Expands to 5 More State Schools',
    source: 'RMST Communication Bureau',
    date: 'June 10, 2026',
    snippet: 'Public announcement details partnering with schools to deploy solar setups and offline computing directories.'
  }
];

const POPULAR_TOPICS = [
  'Sustainable Agriculture',
  'Organic Farming',
  'AI Education',
  'Women Empowerment',
  'CSR Projects',
  'Climate Change',
  'Livelihood Development',
  'Rural Entrepreneurship'
];

const DOWNLOADS_RESOURCES = [
  { name: 'CSR Partnership Brochure 2026', desc: 'Fully compliant projects aligned with MCA schedules.', size: '4.1 MB' },
  { name: 'RMST Comprehensive Brand Guidelines', desc: 'Media assets, logos, typography, and visual assets.', size: '1.8 MB' },
  { name: 'Decentralized Program Impact Audit 2025', desc: 'Audited metric performance and village progress logs.', size: '3.5 MB' },
  { name: 'Press Kit & Institutional Boilerplate', desc: 'Official overview, photos, press releases, and contacts.', size: '1.2 MB' }
];

export default function NewsBlog({ setActivePage, highContrast }: NewsBlogProps) {
  // Dynamic blogs list from localStorage
  const [blogsList, setBlogsList] = useState<ExtendedArticle[]>(() => {
    try {
      const stored = localStorage.getItem('raita_mitra_blogs_list');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return RICH_ARTICLES;
  });

  // Fetch blogs from server on mount
  useEffect(() => {
    fetch('/api/blogs')
      .then(res => {
        if (!res.ok) throw new Error('API response not ok');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setBlogsList(data);
          localStorage.setItem('raita_mitra_blogs_list', JSON.stringify(data));
        }
      })
      .catch(err => console.warn('Failed to load blogs from server:', err));
  }, []);

  // Navigation & Scroll resets
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, []);

  // Multi-Language state
  const [lang, setLang] = useState<'en' | 'kn' | 'hi'>('en');
  const t = TRANSLATIONS[lang];

  // Filters and search states
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortByLatest, setSortByLatest] = useState<boolean>(true);

  // Active overlays and modals
  const [activeArticle, setActiveArticle] = useState<ExtendedArticle | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [hoveredReport, setHoveredReport] = useState<number | null>(null);

  // Simulated download triggers
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  // Newsletter subscription
  const [subName, setSubName] = useState<string>('');
  const [subEmail, setSubEmail] = useState<string>('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Interactive Timeline toggle ('photo' vs 'video' preview)
  const [timelinePreviews, setTimelinePreviews] = useState<{ [key: number]: 'photo' | 'video' }>({
    0: 'photo',
    1: 'photo',
    2: 'photo',
    3: 'photo'
  });

  // Social Grid Simulated Interactions
  const [socialFeed, setSocialFeed] = useState([
    { id: 1, platform: 'Instagram', text: 'Empowering local smallholders to maintain soil hydration during dry spells using modular solar pumps and targeted drip arrays! #SustainableAgri #RaitaMitra', likes: 142, isLiked: false, commentText: '', comments: ['Inspirational!', 'Beautiful project!'] },
    { id: 2, platform: 'LinkedIn', text: 'We are incredibly proud to have our Yaraguppi Women\'s Dairy cooperative model recognized by GOK. Sustainable, decentralized livelihoods in action.', likes: 310, isLiked: false, commentText: '', comments: ['Incredible governance!', 'Strong model for replication.'] },
    { id: 3, platform: 'YouTube', text: 'Watch how Shailesh transitioned his 3-acre dry farm into a highly productive mixed orchard using organic soil composting. #FarmersInAction', likes: 418, isLiked: false, commentText: '', comments: ['Excellent guidance', 'Where is the compost unit?'] },
    { id: 4, platform: 'Facebook', text: 'Our mobile medical vans completed over 200 pediatric eye screenings in Savanur this week. Corrective glasses and consultations provided free.', likes: 89, isLiked: false, commentText: '', comments: ['Noble service!'] }
  ]);

  const categories = [
    { name: 'All', icon: Sparkles },
    { name: 'Agriculture', icon: Leaf },
    { name: 'Women Empowerment', icon: Users },
    { name: 'Education & AI Skills', icon: Laptop },
    { name: 'Health & Nutrition', icon: HeartPulse },
    { name: 'Climate Action', icon: Trees },
    { name: 'Entrepreneurship', icon: Briefcase },
    { name: 'CSR & ESG', icon: Building2 },
    { name: 'Events & Workshops', icon: Calendar }
  ];

  // Dynamic search, categorical and tag filtering logic
  const filteredArticles = useMemo(() => {
    let list = [...blogsList];

    // Category Filter
    if (activeCategory !== 'All') {
      list = list.filter(art => art.topic === activeCategory);
    }

    // Tag filter
    if (selectedTag) {
      list = list.filter(art => art.tags.includes(selectedTag));
    }

    // Keyword Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(art => 
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.content.toLowerCase().includes(q) ||
        art.author.toLowerCase().includes(q) ||
        art.topic.toLowerCase().includes(q) ||
        art.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortByLatest) {
      list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    return list;
  }, [blogsList, activeCategory, selectedTag, searchQuery, sortByLatest]);

  // AI-Based Recommendation algorithm (matches tags/category with similarity weights)
  const getAIRecommendations = (currentArticle: ExtendedArticle) => {
    return RICH_ARTICLES
      .filter(art => art.id !== currentArticle.id)
      .map(art => {
        let score = 0;
        if (art.topic === currentArticle.topic) score += 5;
        const matchingTags = art.tags.filter(t => currentArticle.tags.includes(t));
        score += matchingTags.length * 3;
        return { article: art, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.article);
  };

  // Simulated download triggers with visual meter progress
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
            alert(`${t.simulatedDownload}\nFile: "${docName}" has been encrypted & cached.`);
          }, 400);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  // Newsletter mock subscription handling
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName || !subEmail) return;
    setSubStatus('loading');

    // POST newsletter signup to Server backend
    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'Newsletter Signup',
        name: subName,
        email: subEmail,
        phone: '',
        subject: 'News & Blog Newsletter Signup',
        message: 'Subscribed to news feed, policy dispatches, and updates.',
        metadata: { page: 'News & Blog Feed' }
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('News/Blog newsletter signup logged:', data);
    })
    .catch(err => {
      console.error('Error logging newsletter signup:', err);
    });

    setTimeout(() => {
      setSubStatus('success');
      setTimeout(() => {
        setSubName('');
        setSubEmail('');
        setSubStatus('idle');
      }, 5000);
    }, 1200);
  };

  const handleLikeSocial = (id: number) => {
    setSocialFeed(prev => prev.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleCommentSocial = (id: number, text: string) => {
    if (!text.trim()) return;
    setSocialFeed(prev => prev.map(post => {
      if (post.id === id) {
        return {
          ...post,
          comments: [...post.comments, text],
          commentText: ''
        };
      }
      return post;
    }));
  };

  const featuredArticle = RICH_ARTICLES.find(a => a.isFeatured) || RICH_ARTICLES[0];

  return (
    <div className={`w-full transition-colors duration-300 ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`} id="news-blog-root">
      
      {/* Dynamic Language & Accessibility Bar */}
      <div className={`py-2 px-4 border-b text-xs flex justify-between items-center ${
        highContrast ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}>
        <div className="flex items-center gap-1">
          <Globe size={13} className="text-emerald-600 dark:text-emerald-400" />
          <span className="font-mono text-[10px]">PREMIUM MULTILINGUAL HUB:</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLang('en')} 
            className={`font-mono text-[10px] px-2 py-0.5 rounded cursor-pointer ${lang === 'en' ? 'bg-emerald-950 text-white font-bold' : 'hover:underline'}`}
          >
            English
          </button>
          <button 
            onClick={() => setLang('kn')} 
            className={`font-sans text-[10px] px-2 py-0.5 rounded cursor-pointer ${lang === 'kn' ? 'bg-emerald-950 text-white font-bold' : 'hover:underline'}`}
          >
            ಕನ್ನಡ
          </button>
          <button 
            onClick={() => setLang('hi')} 
            className={`font-sans text-[10px] px-2 py-0.5 rounded cursor-pointer ${lang === 'hi' ? 'bg-emerald-950 text-white font-bold' : 'hover:underline'}`}
          >
            हिन्दी
          </button>
        </div>
      </div>

      {/* 1. EDITORIAL HERO BANNER */}
      <section className="relative w-full py-20 md:py-28 bg-slate-950 text-white text-center overflow-hidden px-4" id="blog-hero">
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center mix-blend-overlay scale-102"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent z-10"></div>
        
        <div className="relative z-20 max-w-4xl mx-auto space-y-6">
          <nav className="flex justify-center items-center gap-2 text-xs font-mono tracking-wider text-slate-400">
            <span className="hover:text-gold cursor-pointer transition-colors" onClick={() => window.location.hash = '#/'}>Home</span>
            <ChevronRight size={12} className="opacity-50" />
            <span className="text-gold font-bold">News, Insights & Blog</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-gold/15 text-gold border border-gold/35">
            <Sparkles size={11} className="animate-pulse" />
            RMST Knowledge Center
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-slate-300 text-xs md:text-sm lg:text-base max-w-2xl mx-auto leading-relaxed font-sans">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* 2. FEATURED ARTICLE SECTION (MAGAZINE STYLE HERO) */}
      <section className="relative z-30 max-w-7xl mx-auto px-4 -mt-10" id="featured-article">
        <div 
          onClick={() => setActivePage(`blog/${featuredArticle.slug}`)}
          className={`group overflow-hidden rounded-3xl border text-left cursor-pointer transition-all duration-300 hover:shadow-xl ${
            highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/50 shadow-lg shadow-slate-200/30'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 relative aspect-video lg:aspect-auto min-h-[300px] md:min-h-[400px] overflow-hidden bg-slate-100">
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
              <span className="absolute top-4 left-4 bg-slate-900/95 text-gold font-mono text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm border border-gold/35">
                ★ FEATURED PUBLICATION
              </span>
            </div>

            <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  {featuredArticle.topic}
                </span>

                <h2 className={`font-display font-black text-xl md:text-2xl lg:text-3xl leading-snug group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors ${
                  highContrast ? 'text-white' : 'text-slate-900'
                }`}>
                  {featuredArticle.title}
                </h2>

                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-300 font-sans leading-relaxed">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={featuredArticle.authorImage} 
                    alt={featuredArticle.author} 
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">{featuredArticle.author}</h4>
                    <p className="text-[9px] text-slate-400 font-mono">{featuredArticle.authorRole}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {featuredArticle.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {featuredArticle.readTime}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button className="px-6 py-2.5 rounded-full text-xs font-bold bg-gold hover:bg-gold-light text-slate-950 transition-colors flex items-center gap-1.5 shadow-md">
                  <span>{t.readArticle}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STICKY SEARCH & FILTERS BAR */}
      <section className="sticky top-[72px] z-40 py-4 max-w-7xl mx-auto px-4 mt-12" id="search-filter-section">
        <div className={`p-4 rounded-2xl border flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 ${
          highContrast ? 'bg-black border-2 border-white' : 'bg-white/95 border-slate-200/60 shadow-md backdrop-blur-md'
        }`}>
          {/* Keyword Search */}
          <div className="relative flex-1">
            <input 
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-8 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent ${
                highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            />
            <Search size={14} className="absolute left-3 top-3 text-slate-400" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 font-mono text-xs cursor-pointer"
              >
                [Clear]
              </button>
            )}
          </div>

          {/* Quick interactive tags & sorting */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-mono uppercase text-slate-400">Sort by:</span>
            <button
              onClick={() => setSortByLatest(prev => !prev)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border cursor-pointer transition-colors ${
                highContrast 
                  ? 'border-white text-white bg-zinc-900' 
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              {sortByLatest ? 'Latest First' : 'Oldest First'}
            </button>
            {selectedTag && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                Tag: {selectedTag}
                <X size={10} className="cursor-pointer" onClick={() => setSelectedTag(null)} />
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 4. CATEGORIES SECTOR (HORIZONTAL GRAPHICAL CARDS) */}
      <section className="py-12 max-w-7xl mx-auto px-4" id="categories-sector">
        <div className="text-left space-y-1 mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">KNOWLEDGE FILTERING</span>
          <h3 className={`text-base font-bold font-display tracking-tight uppercase ${highContrast ? 'text-white' : 'text-slate-900'}`}>
            {t.categoriesTitle}
          </h3>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.name;
            const IconComponent = cat.icon;
            
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveCategory(cat.name);
                  setSelectedTag(null); // Clear specific tag when choosing category
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl border text-xs font-bold shrink-0 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? highContrast
                      ? 'bg-white text-black border-black font-extrabold shadow-md'
                      : 'bg-emerald-900 text-white border-emerald-950 shadow-md transform -translate-y-0.5'
                    : highContrast
                      ? 'bg-black text-white border-white hover:bg-zinc-900'
                      : 'bg-white border-slate-200/50 text-slate-700 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <IconComponent size={14} className={isSelected ? 'text-gold' : 'text-emerald-700'} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. LATEST ARTICLES SECTION (MAGAZINE GRID) */}
      <section className="py-12 max-w-7xl mx-auto px-4" id="latest-articles">
        <div className="text-left space-y-1 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">CHRONICLED DISPATCHES</span>
          <h2 className={`text-xl md:text-3xl font-display font-extrabold tracking-tight ${highContrast ? 'text-white' : 'text-slate-900'}`}>
            {t.latestTitle}
          </h2>
        </div>

        {/* Dynamic Masonry/Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((art) => (
              <motion.div
                key={art.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                onClick={() => setActivePage(`blog/${art.slug}`)}
                className={`group rounded-3xl border overflow-hidden flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-1 ${
                  highContrast 
                    ? 'bg-black border-2 border-white text-white' 
                    : 'bg-white border-slate-200/50 hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img 
                      src={art.image} 
                      alt={art.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/90 text-gold text-[8px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm border border-gold/25">
                      {art.topic}
                    </span>
                  </div>

                  <div className="p-6 text-left space-y-3">
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {art.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {art.readTime}
                      </span>
                    </div>

                    <h3 className={`font-display font-extrabold text-base md:text-lg leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors ${
                      highContrast ? 'text-white' : 'text-slate-800'
                    }`}>
                      {art.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-300 font-sans leading-relaxed line-clamp-3">
                      {art.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 dark:border-zinc-800 text-left flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <img 
                      src={art.authorImage} 
                      alt={art.author} 
                      className="w-6 h-6 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-800 dark:text-white">By {art.author}</h4>
                      <p className="text-[8px] text-slate-400 font-mono">{art.authorRole}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold font-mono text-emerald-700 dark:text-emerald-400 group-hover:underline flex items-center gap-1">
                    Read 
                    <ArrowRight size={12} />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredArticles.length === 0 && (
          <div className="py-16 text-center text-slate-400 font-mono text-xs">
            NO PUBLICATIONS MATCHED "{searchQuery || activeCategory}"
          </div>
        )}
      </section>

      {/* 6. SUCCESS STORIES SECTION (INTERACTIVE BENEFICIARY CARDS) */}
      <section className={`py-16 ${highContrast ? 'bg-black border-t-2 border-b-2 border-white' : 'bg-slate-100 border-t border-b border-slate-200/40'}`} id="success-stories">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">LIVED REALITIES</span>
            <h2 className={`text-2xl md:text-4xl font-display font-extrabold tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
              {t.successTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SUCCESS_STORIES.map((story) => (
              <div 
                key={story.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between text-left transition-all ${
                  highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/50 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100">
                    <img 
                      src={story.image} 
                      alt={story.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-3 left-3 bg-slate-900/90 text-white font-mono text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {story.highlight}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400">
                      {story.title}
                    </span>
                    <h3 className="text-base font-bold font-display text-slate-800 dark:text-white leading-tight">
                      {story.subtitle}
                    </h3>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-150/40 relative">
                    <span className="absolute -top-3 left-3 bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                      Audited Metric
                    </span>
                    <span className="text-lg md:text-xl font-display font-black text-emerald-700 dark:text-emerald-400 block pt-1.5">
                      {story.metric}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 italic font-serif leading-relaxed">
                    &quot;{story.quote}&quot;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 mt-4 text-[10px] text-slate-400 font-mono">
                  — {story.farmer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FEATURED REPORTS SECTION (RESEARCH & IMPACT AUDITS) */}
      <section className="py-20 max-w-7xl mx-auto px-4" id="featured-reports">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">EMPIRICAL DATA</span>
          <h2 className={`text-2xl md:text-4xl font-display font-extrabold tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
            {t.reportsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_REPORTS.map((rep, idx) => (
            <div 
              key={idx}
              onMouseEnter={() => setHoveredReport(idx)}
              onMouseLeave={() => setHoveredReport(null)}
              className={`p-6 rounded-3xl border text-left flex flex-col justify-between transition-all duration-300 ${
                highContrast 
                  ? 'bg-black border-2 border-white' 
                  : hoveredReport === idx 
                    ? 'bg-emerald-950 text-white border-emerald-950 scale-101 shadow-lg' 
                    : 'bg-white border-slate-200/50 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${
                    highContrast 
                      ? 'bg-zinc-800 text-white' 
                      : hoveredReport === idx ? 'bg-gold text-slate-950' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {rep.type}
                  </span>
                  <FileText size={16} className={hoveredReport === idx ? 'text-gold' : 'text-slate-400'} />
                </div>

                <h3 className={`text-sm md:text-base font-bold font-display leading-snug ${
                  hoveredReport === idx ? 'text-white' : 'text-slate-800 dark:text-white'
                }`}>
                  {rep.title}
                </h3>

                <p className={`text-xs leading-relaxed font-sans ${
                  hoveredReport === idx ? 'text-slate-200' : 'text-slate-500'
                }`}>
                  {rep.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100/30 mt-6 flex justify-between items-center text-[10px] font-mono">
                <span className={hoveredReport === idx ? 'text-gold' : 'text-slate-400'}>
                  Size: {rep.size}
                </span>
                <button 
                  onClick={() => startDownloadSimulation(rep.title)}
                  className={`flex items-center gap-1 font-bold hover:underline cursor-pointer ${
                    hoveredReport === idx ? 'text-white' : 'text-emerald-700 dark:text-emerald-400'
                  }`}
                >
                  <Download size={12} />
                  <span>Download Report</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. EVENT HIGHLIGHTS SECTION (TIMELINE CARDS WITH DYNAMIC PREVIEWS) */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t-2 border-b-2 border-white' : 'bg-slate-50 border-t border-b border-slate-200/40'}`} id="timeline-campaigns">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">CHRONOLOGICAL ROADMAP</span>
            <h2 className={`text-2xl md:text-4xl font-display font-extrabold tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
              {t.timelineTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto font-sans leading-relaxed">
              {t.timelineSub}
            </p>
          </div>

          <div className="relative border-l border-slate-200 dark:border-zinc-800 ml-4 md:ml-32 pl-6 md:pl-8 space-y-12">
            {CHRONOLOGICAL_TIMELINE.map((time, idx) => {
              const currentPreview = timelinePreviews[idx] || 'photo';
              
              return (
                <div key={idx} className="relative group">
                  {/* Absolute date badge on desktop left */}
                  <div className="hidden md:block absolute -left-40 top-1 text-right w-32">
                    <span className="text-xs font-mono font-bold text-slate-400 block uppercase tracking-wider">{time.date}</span>
                    <span className="text-[9px] font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase">{time.type}</span>
                  </div>

                  {/* Bullet node */}
                  <div className="absolute -left-[31px] md:-left-[39px] top-1 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white dark:border-black group-hover:scale-110 transition-transform"></div>

                  <div className={`p-6 rounded-3xl border text-left grid grid-cols-1 md:grid-cols-12 gap-6 ${
                    highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/50 shadow-sm'
                  }`}>
                    {/* Visual Preview panel */}
                    <div className="md:col-span-4 space-y-2">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950">
                        {currentPreview === 'photo' ? (
                          <img 
                            src={time.image} 
                            alt={time.title} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="relative w-full h-full">
                            <img 
                              src={time.videoThumb} 
                              alt="Video cover" 
                              className="w-full h-full object-cover opacity-60"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Play size={24} fill="#fff" className="text-white animate-pulse" />
                            </div>
                            <span className="absolute bottom-2 right-2 bg-rose-600 text-[8px] font-mono text-white px-1 py-0.5 rounded">
                              LIVE PLAYBACK
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Photo / Video preview toggle buttons */}
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setTimelinePreviews(prev => ({ ...prev, [idx]: 'photo' }))}
                          className={`px-2 py-1 text-[9px] font-mono font-bold rounded border cursor-pointer ${
                            currentPreview === 'photo' 
                              ? 'bg-slate-900 text-white border-slate-900' 
                              : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          Photo Frame
                        </button>
                        <button
                          onClick={() => {
                            setTimelinePreviews(prev => ({ ...prev, [idx]: 'video' }));
                            setActiveVideoUrl('dQw4w9WgXcQ'); // Launch lightbox for simulation
                          }}
                          className={`px-2 py-1 text-[9px] font-mono font-bold rounded border cursor-pointer ${
                            currentPreview === 'video' 
                              ? 'bg-rose-900 text-white border-rose-900' 
                              : 'bg-white text-rose-700 border-slate-200 hover:bg-rose-50'
                          }`}
                        >
                          Watch Video
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-8 space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="md:hidden text-xs font-mono font-bold text-slate-400 block uppercase tracking-wider mb-1">
                          {time.date} • {time.type}
                        </span>
                        <h3 className="text-sm md:text-base font-bold font-display text-slate-800 dark:text-white leading-tight">
                          {time.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-300 font-sans leading-relaxed">
                          {time.desc}
                        </p>
                      </div>

                      <div className="pt-2 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                        <span>Status: Verified Field Record</span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">100% Complete</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. VIDEO INSIGHTS SECTION (HORIZONTAL CAROUSEL WITH MODAL PLAYBACK) */}
      <section className="py-20 max-w-7xl mx-auto px-4" id="video-carousel">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">DIGITAL WEBINARS</span>
          <h2 className={`text-2xl md:text-4xl font-display font-extrabold tracking-tight ${highContrast ? 'text-white' : 'text-slate-900'}`}>
            Videos & Webinars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VIDEO_CAROUSEL_ITEMS.map((item) => (
            <div 
              key={item.id}
              onClick={() => setActiveVideoUrl(item.youtubeId)}
              className={`group cursor-pointer rounded-2xl border text-left overflow-hidden transition-all hover:shadow-md ${
                highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-sm'
              }`}
            >
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                <img 
                  src={item.thumb} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102 group-hover:opacity-85"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-gold hover:bg-gold-light text-slate-950 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <Play size={16} fill="currentColor" className="ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-slate-900/90 text-white text-[9px] font-mono px-2 py-0.5 rounded font-bold">
                  {item.duration}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[9px] font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400">
                  {item.category}
                </span>
                <h3 className="text-xs font-bold font-display leading-tight text-slate-800 dark:text-white line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. INFOGRAPHICS SECTION (KNOWLEDGE THROUGH VISUAL INSIGHTS INTERACTIVE DASHBOARD) */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t-2 border-b-2 border-white' : 'bg-slate-900 text-white'}`} id="infographic-dashboard">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">DATA-DRIVEN DEVELOPMENT</span>
            <h2 className="text-2xl md:text-4xl font-display font-extrabold tracking-tight text-white">
              {t.infographicsTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
              Explore dynamic metric tracking across key developmental clusters. Interactive indices are CA-audited and updated on-file.
            </p>
          </div>

          {/* Grid Layout of charts (Bento style grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Chart A: Farmer Beneficiary Growth (Line/Area) - 7 Columns */}
            <div className={`lg:col-span-7 p-6 rounded-3xl border flex flex-col justify-between ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-slate-950 border-zinc-800'
            }`}>
              <div className="mb-4 text-left">
                <span className="text-[9px] font-mono font-bold uppercase text-gold">CHART A • PROGRESS INDEX</span>
                <h3 className="text-sm md:text-base font-bold font-display text-white">Annual Beneficiary Growth Cumulative</h3>
                <p className="text-[10px] text-zinc-400">Illustrating active support lines across our three primary core verticals.</p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={BENEFICIARY_GROWTH_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorFarmers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorYouth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="year" stroke="#71717a" fontSize={10} fontFamily="monospace" />
                    <YAxis stroke="#71717a" fontSize={10} fontFamily="monospace" />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#d97706', borderRadius: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
                    <Area type="monotone" dataKey="farmers" stroke="#10b981" fillOpacity={1} fill="url(#colorFarmers)" name="Marginal Farmers" />
                    <Area type="monotone" dataKey="youth" stroke="#06b6d4" fillOpacity={1} fill="url(#colorYouth)" name="STEM Students" />
                    <Area type="monotone" dataKey="women" stroke="#f59e0b" fillOpacity={0} name="SHG Dairy Members" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart B: Program Budget Allocation (Pie) - 5 Columns */}
            <div className={`lg:col-span-5 p-6 rounded-3xl border flex flex-col justify-between ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-slate-950 border-zinc-800'
            }`}>
              <div className="mb-4 text-left">
                <span className="text-[9px] font-mono font-bold uppercase text-gold">CHART B • PROGRAM DENSITY</span>
                <h3 className="text-sm md:text-base font-bold font-display text-white">Program Effort Allocation</h3>
                <p className="text-[10px] text-zinc-400">Quarterly resource expenditure and implementation focus distributions.</p>
              </div>

              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={PROGRAM_PIE_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {PROGRAM_PIE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }} />
                    <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ fontSize: '9px', fontFamily: 'monospace' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart C: District Wise Families Reached (Bar) - 6 Columns */}
            <div className={`lg:col-span-6 p-6 rounded-3xl border flex flex-col justify-between ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-slate-950 border-zinc-800'
            }`}>
              <div className="mb-4 text-left">
                <span className="text-[9px] font-mono font-bold uppercase text-gold">CHART C • GEOGRAPHIC SCOPE</span>
                <h3 className="text-sm md:text-base font-bold font-display text-white">District-wise Families Reached</h3>
                <p className="text-[10px] text-zinc-400">Vetted household enumerations actively registered inside RMST directories.</p>
              </div>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DISTRICT_IMPACT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="district" stroke="#71717a" fontSize={8} fontFamily="monospace" />
                    <YAxis stroke="#71717a" fontSize={10} fontFamily="monospace" />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }} />
                    <Bar dataKey="families" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Families Reached" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart D: United Nations SDG Alignments (Radial Bar) - 6 Columns */}
            <div className={`lg:col-span-6 p-6 rounded-3xl border flex flex-col justify-between ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-slate-950 border-zinc-800'
            }`}>
              <div className="mb-4 text-left">
                <span className="text-[9px] font-mono font-bold uppercase text-gold">CHART D • GLOBAL GOALS</span>
                <h3 className="text-sm md:text-base font-bold font-display text-white">UN SDG Alignment Ratings</h3>
                <p className="text-[10px] text-zinc-400">Independent rating of RMST programs aligned with voluntary global indicators.</p>
              </div>

              <div className="h-60 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart 
                    cx="50%" 
                    cy="50%" 
                    innerRadius="30%" 
                    outerRadius="100%" 
                    barSize={10} 
                    data={SDG_ALIGNMENT_DATA}
                  >
                    <RadialBar
                      minAngle={15}
                      label={{ fill: '#fff', position: 'insideStart', fontSize: 8, fontFamily: 'monospace' }}
                      background
                      clockWise={true}
                      dataKey="percent"
                    >
                      {SDG_ALIGNMENT_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RadialBar>
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }} />
                    <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ fontSize: '8px', fontFamily: 'monospace' }} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. POPULAR TOPICS SECTION (INTERACTIVE TAG CLOUD) */}
      <section className="py-12 max-w-7xl mx-auto px-4" id="popular-topics">
        <div className="text-center space-y-3 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">KNOWLEDGE CLUSTERS</span>
          <h3 className={`text-base font-bold font-display uppercase ${highContrast ? 'text-white' : 'text-slate-900'}`}>
            {t.popularTitle}
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {POPULAR_TOPICS.map((topic) => {
            const isSelected = selectedTag === topic;
            
            return (
              <button
                key={topic}
                onClick={() => {
                  setSelectedTag(isSelected ? null : topic);
                  setActiveCategory('All'); // Reset category filter when targeting raw tag clouds
                }}
                className={`px-4 py-2 rounded-full border text-xs font-bold cursor-pointer transition-colors ${
                  isSelected
                    ? highContrast
                      ? 'bg-white text-black border-black font-extrabold'
                      : 'bg-emerald-900 text-white border-emerald-950'
                    : highContrast
                      ? 'bg-black text-white border-white hover:bg-zinc-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'
                }`}
              >
                #{topic}
              </button>
            );
          })}
        </div>
      </section>

      {/* 12. NEWSLETTER SECTION (PREMIUM CARD) */}
      <section className="py-12 max-w-7xl mx-auto px-4" id="newsletter-hub">
        <div className="relative overflow-hidden rounded-3xl bg-emerald-950 text-white border border-emerald-900 shadow-xl py-12 px-6 md:px-12 text-left">
          {/* Faint landscape overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider">MONTHLY INSIGHTS DIGEST</span>
              <h2 className="text-2xl md:text-4xl font-display font-extrabold tracking-tight text-white leading-tight">
                {t.newsletterTitle}
              </h2>
              <p className="text-sm text-slate-300 max-w-xl font-sans leading-relaxed">
                {t.newsletterSub}
              </p>
            </div>

            <div className="lg:col-span-5">
              {subStatus === 'success' ? (
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-gold/30 text-center space-y-3">
                  <Check className="mx-auto text-gold" size={32} />
                  <h4 className="text-sm font-bold text-white font-display">Subscription Registered Successfully</h4>
                  <p className="text-xs text-slate-400">You have been placed inside our verified public newsletter cluster. Check your inbox for compliance booklets.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div>
                    <input 
                      type="text"
                      placeholder="Your Full Name"
                      required
                      value={subName}
                      onChange={(e) => setSubName(e.target.value)}
                      className="w-full px-4 py-3 text-xs rounded-xl bg-slate-900/80 border border-emerald-800 focus:outline-none focus:ring-2 focus:ring-gold text-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="email"
                      placeholder="Your Corporate Email"
                      required
                      value={subEmail}
                      onChange={(e) => setSubEmail(e.target.value)}
                      className="flex-1 px-4 py-3 text-xs rounded-xl bg-slate-900/80 border border-emerald-800 focus:outline-none focus:ring-2 focus:ring-gold text-white"
                    />
                    <button 
                      type="submit"
                      disabled={subStatus === 'loading'}
                      className="px-6 py-3 rounded-xl text-xs font-bold bg-gold hover:bg-gold-light text-slate-950 transition-colors shrink-0 font-display cursor-pointer"
                    >
                      {subStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 13. SOCIAL MEDIA SECTION (INSTAGRAM STYLE GRID WITH SIMULATED ENGAGEMENT) */}
      <section className="py-20 max-w-7xl mx-auto px-4" id="social-live-grid">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">DIGITAL CHRONICLES</span>
          <h2 className={`text-2xl md:text-4xl font-display font-extrabold tracking-tight ${highContrast ? 'text-white' : 'text-slate-900'}`}>
            {t.socialTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialFeed.map((post) => (
            <div 
              key={post.id}
              className={`rounded-2xl border text-left p-5 flex flex-col justify-between space-y-4 ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/50 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">@{post.platform}</span>
                  <span className="text-slate-400">Live Feed</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {post.text}
                </p>
              </div>

              <div className="space-y-3">
                {/* Interaction Row */}
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-slate-100 dark:border-zinc-800">
                  <button 
                    onClick={() => handleLikeSocial(post.id)}
                    className={`flex items-center gap-1 hover:text-rose-600 cursor-pointer ${post.isLiked ? 'text-rose-600 font-bold' : ''}`}
                  >
                    <Heart size={14} fill={post.isLiked ? 'currentColor' : 'none'} />
                    <span>{post.likes}</span>
                  </button>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={14} />
                    <span>{post.comments.length}</span>
                  </span>
                </div>

                {/* Micro Comments stack */}
                <div className="space-y-1.5 pt-1">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="text-[10px] bg-slate-50 dark:bg-zinc-950 p-2 rounded-lg text-slate-500 font-sans border border-slate-100/50">
                      {comment}
                    </div>
                  ))}
                </div>

                {/* Comment Form input */}
                <div className="flex gap-1">
                  <input 
                    type="text"
                    placeholder="Write a comment..."
                    value={post.commentText}
                    onChange={(e) => {
                      const text = e.target.value;
                      setSocialFeed(prev => prev.map(p => p.id === post.id ? { ...p, commentText: text } : p));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCommentSocial(post.id, post.commentText);
                    }}
                    className={`flex-1 px-2.5 py-1 text-[10px] rounded-lg border focus:outline-none ${
                      highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                  <button 
                    onClick={() => handleCommentSocial(post.id, post.commentText)}
                    className="p-1 rounded bg-slate-900 text-white cursor-pointer hover:bg-slate-800"
                  >
                    <Send size={10} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 14. MEDIA COVERAGE SECTION (MAGAZINE CARDS) */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t-2 border-b-2 border-white' : 'bg-slate-100 border-t border-b border-slate-200/40'}`} id="press-coverage-sec">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">PRESS ARCHIVES</span>
            <h2 className={`text-2xl md:text-4xl font-display font-extrabold tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
              {t.mediaTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRESS_COVERAGE.map((pc) => (
              <div 
                key={pc.id}
                className={`p-6 rounded-3xl border text-left flex flex-col justify-between ${
                  highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/50 shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase">{pc.category}</span>
                    <span>{pc.date}</span>
                  </div>

                  <h3 className="text-xs md:text-sm font-bold font-display leading-tight text-slate-800 dark:text-white">
                    {pc.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 dark:text-slate-300 font-sans leading-relaxed">
                    {pc.snippet}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-150/40 mt-4 flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span className="font-bold">{pc.source}</span>
                  <span className="flex items-center gap-1 text-emerald-700 font-bold hover:underline cursor-pointer">
                    View Press Clip
                    <ExternalLink size={10} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. DOWNLOADS SECTION (KNOWLEDGE RESOURCES CARDS) */}
      <section className="py-20 max-w-7xl mx-auto px-4" id="knowledge-downloads">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">SECURE RESOURCE SYSTEM</span>
          <h2 className={`text-2xl md:text-4xl font-display font-extrabold tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
            {t.downloadsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOWNLOADS_RESOURCES.map((res, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-3xl border text-left flex flex-col justify-between ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/50 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <FileText size={24} className="text-emerald-700 dark:text-emerald-400" />
                <h3 className="text-xs md:text-sm font-bold font-display text-slate-800 dark:text-white leading-tight">
                  {res.name}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-300 font-sans leading-normal">
                  {res.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100/30 mt-6 flex justify-between items-center text-[10px] font-mono">
                <span className="text-slate-400">PDF • {res.size}</span>
                <button 
                  onClick={() => startDownloadSimulation(res.name)}
                  className="flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  <Download size={12} />
                  <span>Download file</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 16. AUTHOR SECTOR (PROFILE CARDS WITH SOCIAL LINKS) */}
      <section className="py-12 max-w-7xl mx-auto px-4" id="author-profiles">
        <div className="text-left space-y-1 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">RESEARCH DIRECTORY</span>
          <h2 className={`text-xl md:text-2xl font-display font-extrabold tracking-tight ${highContrast ? 'text-white' : 'text-slate-900'}`}>
            Trust Contributors & Authors
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: 'Dr. Mahadevappa S. Patil',
              role: 'Chairman & Soil Lead',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
              bio: 'Former State Agricultural Agronomist focusing on organic soil restoration.',
              linkedin: 'https://linkedin.com/'
            },
            {
              name: 'Anita Patel',
              role: 'Director of SHG Networks',
              image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              bio: 'Coordinating rural cooperative networks and micro-credit audits.',
              linkedin: 'https://linkedin.com/'
            },
            {
              name: 'Vikram S. Deshpande',
              role: 'Chief of STEM Literacy',
              image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              bio: 'Passionate computer science educator setting up decentralized rural IT labs.',
              linkedin: 'https://linkedin.com/'
            },
            {
              name: 'S. R. Gudadinni',
              role: 'Cooperative Treasurer',
              image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              bio: 'Supervising statutory CA reports and corporate CSR agreements.',
              linkedin: 'https://linkedin.com/'
            }
          ].map((auth, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-3xl border text-left space-y-4 ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/50 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <img 
                  src={auth.image} 
                  alt={auth.name} 
                  className="w-12 h-12 rounded-full object-cover border border-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-xs md:text-sm font-bold font-display text-slate-800 dark:text-white leading-tight">
                    {auth.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono">{auth.role}</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-300 leading-normal font-sans">
                {auth.bio}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center text-[10px] font-mono">
                <span className="text-slate-400">Vetted Expert</span>
                <a 
                  href={auth.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 18. CALL TO ACTION SECTION */}
      <section className="relative w-full py-20 bg-slate-950 text-white text-center overflow-hidden px-4" id="blog-cta">
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-slate-950/85 z-10"></div>
        
        <div className="relative z-20 max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-4xl font-display font-extrabold tracking-tight text-white leading-tight">
            {t.ctaTitle}
          </h2>

          <p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed font-sans">
            {t.ctaSub}
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              onClick={() => window.location.hash = '#/contact'}
              className="px-6 py-3 rounded-full text-xs md:text-sm font-bold bg-gold hover:bg-gold-light text-slate-950 transition-all font-display shadow-lg shadow-gold/20 cursor-pointer"
            >
              {t.partnerButton}
            </button>
            <button 
              onClick={() => window.location.hash = '#/donate'}
              className="px-6 py-3 rounded-full text-xs md:text-sm font-bold border border-white/20 hover:bg-white/10 transition-colors font-display cursor-pointer"
            >
              {t.donateButton}
            </button>
            <button 
              onClick={() => window.location.hash = '#/volunteer'}
              className="px-6 py-3 rounded-full text-xs md:text-sm font-bold border border-white/20 hover:bg-white/10 transition-colors font-display cursor-pointer"
            >
              {t.volunteerButton}
            </button>
          </div>
        </div>
      </section>


      {/* --- LIGHTBOX MODALS & OVERLAYS --- */}

      {/* A. Simulated Document Download progress notification bar */}
      <AnimatePresence>
        {downloadingDoc && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 p-5 rounded-2xl bg-slate-900 border border-gold/30 text-white shadow-2xl max-w-sm w-full space-y-3"
          >
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-gold">Encrypting PDF Pipeline...</span>
              <span>{downloadProgress}%</span>
            </div>
            
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-gold h-full transition-all duration-100"
                style={{ width: `${downloadProgress}%` }}
              ></div>
            </div>

            <p className="text-[10px] text-slate-400 font-mono">
              Downloading: &quot;{downloadingDoc}&quot;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* B. Article Detailed Read Lightbox with AI recommendations algorithm */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 bg-slate-950/70 backdrop-blur-sm pt-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className={`max-w-4xl w-full rounded-3xl border shadow-2xl p-6 md:p-10 text-left my-6 relative ${
                highContrast ? 'bg-black border-white text-white' : 'bg-white border-slate-100'
              }`}
            >
              {/* Close Button overlay */}
              <button 
                onClick={() => setActiveArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 font-mono text-sm cursor-pointer"
              >
                [CLOSE ×]
              </button>

              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase bg-gold/15 text-gold px-3 py-1 rounded-full border border-gold/25 inline-block">
                    {activeArticle.topic}
                  </span>
                  
                  <h2 className="font-display font-black text-2xl md:text-3xl lg:text-4xl leading-tight">
                    {activeArticle.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pt-2 border-b border-slate-100 dark:border-zinc-800 pb-4">
                    <div className="flex items-center gap-2">
                      <img 
                        src={activeArticle.authorImage} 
                        alt={activeArticle.author} 
                        className="w-7 h-7 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="font-bold text-slate-700 dark:text-white">Written by {activeArticle.author} ({activeArticle.authorRole})</span>
                    </div>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {activeArticle.date}
                    </span>
                    <span>•</span>
                    <span>{activeArticle.readTime}</span>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden aspect-video max-h-[400px] bg-slate-100 relative">
                  <img 
                    src={activeArticle.image} 
                    alt={activeArticle.title} 
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Main Article Content body */}
                <div className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed space-y-4 font-sans pt-4 border-t border-slate-100 dark:border-zinc-800">
                  {activeArticle.content.split('\n\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {/* Tags collection inside article */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {activeArticle.tags.map((tag) => (
                    <span 
                      key={tag}
                      onClick={() => {
                        setSelectedTag(tag);
                        setActiveArticle(null);
                        document.getElementById('search-filter-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-500 dark:text-slate-300 text-[10px] font-mono font-bold rounded cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* 17. RELATED ARTICLES SECTOR (AI-BASED RECOMMENDATION ALGORITHM) */}
                <div className="pt-8 border-t border-slate-100 dark:border-zinc-800 space-y-4">
                  <div className="flex items-center gap-2 text-gold">
                    <Sparkles size={16} className="animate-pulse" />
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider">
                      {t.recommendationsTitle}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {t.relatedTitle}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {getAIRecommendations(activeArticle).map((rec) => (
                      <div 
                        key={rec.id}
                        onClick={() => {
                          setActiveArticle(rec);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`p-4 rounded-2xl border text-left cursor-pointer transition-all hover:scale-101 ${
                          highContrast ? 'bg-zinc-950 border-white text-white' : 'bg-slate-50 border-slate-150/50 hover:bg-white hover:shadow-md'
                        }`}
                      >
                        <span className="text-[9px] font-mono text-emerald-700 dark:text-emerald-400 uppercase font-bold block mb-1">
                          {rec.topic}
                        </span>
                        <h5 className="text-xs font-bold font-display line-clamp-2 text-slate-800 dark:text-white leading-tight">
                          {rec.title}
                        </h5>
                        <p className="text-[10px] text-slate-400 font-mono pt-2">{rec.readTime}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-400">Raita Mitra Social Trust • Statutory Publications</span>
                  <button 
                    onClick={() => setActiveArticle(null)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer ${
                      highContrast ? 'bg-white text-black' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Close Article
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* C. Interactive Video Stories Lightbox Overlay Player */}
      <AnimatePresence>
        {activeVideoUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-3xl w-full rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-left relative shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-wider">
                  ▶ IMMERSIVE VIDEO SCREEN (SIMULATED YOUTUBE PLAYBACK)
                </span>
                <button 
                  onClick={() => setActiveVideoUrl(null)}
                  className="text-slate-400 hover:text-white font-mono text-xs cursor-pointer"
                >
                  [CLOSE PLAYER ×]
                </button>
              </div>

              {/* YouTube Simulated Sandbox Frame with audio simulation warning */}
              <div className="relative aspect-video rounded-2xl bg-black overflow-hidden border border-zinc-900">
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 text-center p-6 text-slate-300">
                  <Volume2 size={36} className="text-gold animate-bounce" />
                  <h4 className="text-sm font-bold font-display text-white">Interactive Documentary Story Player</h4>
                  <p className="text-xs max-w-md mx-auto leading-relaxed text-slate-400">
                    Your development server has successfully connected to the media stream. This simulation demonstrates a responsive HTML5 video layer with dynamic captions, offline buffers, and cross-origin controls.
                  </p>
                  <button 
                    onClick={() => {
                      setActiveVideoUrl(null);
                      alert('Interactive Stream Successful: The media buffer has been cleared.');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                  >
                    Dismiss Sandbox
                  </button>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                <span>Ref: RMST_PROD_STREAM_V2</span>
                <span>Active Link State: Online</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
