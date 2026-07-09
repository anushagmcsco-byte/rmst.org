import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Quote, 
  Play, 
  Pause, 
  Download, 
  Mail, 
  Layers, 
  Globe, 
  Building, 
  Heart, 
  Sprout, 
  Award, 
  TrendingUp, 
  Activity, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle,
  FileText,
  HelpCircle,
  Clock,
  X,
  Send,
  Sliders,
  Maximize2,
  GraduationCap
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';

interface ImpactStoriesProps {
  setActivePage: (page: string) => void;
  highContrast: boolean;
}

// 1. Karnataka Districts Data for the Interactive Map
const districtStats: Record<string, { reached: string, water: string, schools: string, income: string, description: string, coordinates: string }> = {
  "Dharwad": { 
    reached: "1,240 families", 
    water: "85 watershed units", 
    schools: "6 Smart IT Labs", 
    income: "+48% Avg Growth",
    description: "Centering sustainable natural input centers and rural digital classrooms under Hubballi Taluk partnerships.",
    coordinates: "Lat: 15.45, Lon: 75.00"
  },
  "Belagavi": { 
    reached: "1,850 families", 
    water: "140 recharge wells", 
    schools: "12 Smart IT Labs", 
    income: "+52% Avg Growth",
    description: "Extensive crop-diversity campaigns and women-led dairy cooperatives in Athani and surrounding border villages.",
    coordinates: "Lat: 15.85, Lon: 74.50"
  },
  "Bagalkot": { 
    reached: "950 families", 
    water: "60 drip-irrigation farms", 
    schools: "4 Smart IT Labs", 
    income: "+45% Avg Growth",
    description: "Horticulture enrichment programs teaching drip optimization for pomegranate and local crop fields.",
    coordinates: "Lat: 16.18, Lon: 75.70"
  },
  "Bidar": { 
    reached: "720 families", 
    water: "45 custom trenches", 
    schools: "3 Smart IT Labs", 
    income: "+40% Avg Growth",
    description: "Millets restoration program and organic certification assistance in highly drought-prone border clusters.",
    coordinates: "Lat: 17.91, Lon: 77.53"
  },
  "Raichur": { 
    reached: "1,100 families", 
    water: "95 desilted lakes", 
    schools: "8 Smart IT Labs", 
    income: "+44% Avg Growth",
    description: "Youth technical skill programs and soil organic carbon remediation models near key river delta zones.",
    coordinates: "Lat: 16.20, Lon: 77.35"
  },
  "Gadag": { 
    reached: "880 families", 
    water: "75 recharge shafts", 
    schools: "5 Smart IT Labs", 
    income: "+50% Avg Growth",
    description: "Windbreak farming installations, agro-forestry, and collective seed bank distribution points.",
    coordinates: "Lat: 15.43, Lon: 75.62"
  },
  "Koppal": { 
    reached: "640 families", 
    water: "35 rain-water harvests", 
    schools: "2 Smart IT Labs", 
    income: "+38% Avg Growth",
    description: "Self-reliant microfinance SHG setups and basic business-literacy programs for rural home entrepreneurs.",
    coordinates: "Lat: 15.35, Lon: 76.15"
  },
  "Haveri": { 
    reached: "1,320 families", 
    water: "110 borewell recharges", 
    schools: "9 Smart IT Labs", 
    income: "+55% Avg Growth",
    description: "High-yield natural farming trials, organic chili cooperative setups, and direct-market trading forums.",
    coordinates: "Lat: 14.80, Lon: 75.40"
  },
  "Vijayapura": { 
    reached: "1,050 families", 
    water: "80 farm ponds", 
    schools: "7 Smart IT Labs", 
    income: "+42% Avg Growth",
    description: "Grape grower tech-integrations and customized organic micro-fertilizer distribution centers.",
    coordinates: "Lat: 16.83, Lon: 75.71"
  }
};

// 2. Before/After Stories Data
const beforeAfterStories = [
  {
    id: "ba-farmer",
    category: "Farmer Empowerment",
    headline: "From Uncertainty To Sustainable Farming",
    beforeText: "Faced consecutive crop failures due to failing groundwater and high chemical costs, leading to overwhelming debt burdens and crop insecurity.",
    afterText: "Adoption of organic input production (Jeevamrutha) and sub-surface solar-drip setups has reduced costs by 50% while doubling seasonal net yields.",
    beforeImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=800",
    beneficiary: "Sharanappa Goudar, Hubballi"
  },
  {
    id: "ba-women",
    category: "Women Empowerment",
    headline: "Creating Independent Women Entrepreneurs",
    beforeText: "Erratically paid, erratic manual labor earning less than ₹3,000 monthly. No banking history, zero capital resources, and zero financial safety.",
    afterText: "Elected Cooperative Lead of Yaraguppi Dairy SHG. Manages 400+ liters daily via digital weighing devices. Earns ₹18,000+ monthly.",
    beforeImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800",
    beneficiary: "Savitha Hadimani, Yaraguppi"
  },
  {
    id: "ba-youth",
    category: "Youth Skill Development",
    headline: "Preparing Youth For Future Careers",
    beforeText: "Studying in a rural school with no working computers or backup power, leaving rural youth structurally excluded from the growing digital economy.",
    afterText: "Completes Raita Mitra solar-lab coding block. Builds microcontroller soil-sensors and receives scholarship for polytechnic college.",
    beforeImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
    beneficiary: "Deepa Kurubar, Kundgol"
  }
];

// 3. Success Stories Grid (Masonry Cards)
const successStories = [
  {
    id: "sc-agri",
    category: "Agriculture",
    title: "Enhancing Farm Productivity",
    headline: "Restoring the Lifeline of ancestral Soil",
    beneficiary: "Basappa Malagi",
    location: "Savadatti Taluk",
    summary: "How a marginalized dryland farmer integrated natural multi-cropping to beat severe regional drought cycles.",
    narrative: "Basappa Malagi owned 2.5 acres of highly eroded basalt soil. After joining our regenerative agriculture program in 2024, he integrated sub-surface composting, multi-cropping (growing millets along with pigeon pea), and natural insect-repellent solutions. His water dependency dropped by 40% and his dry soil transformed into fertile, crumbly organic farmland. He harvested a robust yield despite a 25% rainfall deficit in his taluk.",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600",
    quote: "Our land is not just dust; it is our mother. Once you feed her natural compost, she sustains you."
  },
  {
    id: "sc-women",
    category: "Women Empowerment",
    title: "Building Sustainable Livelihoods",
    headline: "From Marginal Stitching to Organic Agro-Processing",
    beneficiary: "Laxmi Devagiri & SHG members",
    location: "Kalghatgi Taluk",
    summary: "A cooperative of 15 women who pooled micro-savings to establish a solar-powered flour and spice grinding facility.",
    narrative: "Laxmi led a group of women who previously survived on erratic seasonal agricultural labor. With a dedicated ₹75,000 machinery grant and structural mentoring from Raita Mitra, they purchased high-speed solar-powered pulverizers. Today, they package and market certified organic chili powder and millet flour across retail hubs in Dharwad, tripling their individual household incomes.",
    image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&q=80&w=600",
    quote: "With solar power, we don't wait for the electricity board. We control our own working hours."
  },
  {
    id: "sc-edu",
    category: "Education",
    title: "Bridging The Digital Divide",
    headline: "Rural Classrooms Code the Future",
    beneficiary: "Siddharth Kumbar",
    location: "Hebsur Taluk",
    summary: "How solar-powered computer labs gave Siddharth the coding blocks to construct regional weather alert scripts.",
    narrative: "Siddharth, a 9th-grade student at Hebsur High School, used to walk 8 km for internet access. When Raita Mitra set up a solar-powered IT Lab, Siddharth learned visual programming blocks and Python basics. Fascinated by climate change, he programmed an automated regional weather monitor that notifies local panchayat heads about immediate high-heat warnings.",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600",
    quote: "Writing code makes me feel powerful. I want to build farm-tech software for my village."
  },
  {
    id: "sc-health",
    category: "Health",
    title: "Promoting Health Awareness",
    headline: "Diagnostic Medicine Reaches the Last Mile",
    beneficiary: "Karewwa Harijan",
    location: "Kundgol Cluster",
    summary: "Mobile diagnostic vans and micro-health camps identify vital conditions early, shielding families from medical debt.",
    narrative: "Living far from hospitals, Karewwa ignored a chronic cough for months until our mobile health clinic arrived in her village. Diagnosed with advanced respiratory distress, our on-ground team arranged immediate specialist consults in Hubballi and helped register her for government cashless healthcare programs, saving her family from catastrophic private health debt.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    quote: "The doctors came right to our village temple courtyard. They saved my health and our savings."
  },
  {
    id: "sc-env",
    category: "Environment",
    title: "Protecting Future Generations",
    headline: "Restoring Groundwater via Micro-Watershed Structures",
    beneficiary: "Venkatesh Joshi",
    location: "Yaraguppi Village",
    summary: "Community-led afforestation and deep bunding recharges dried local aquifers within 18 months.",
    narrative: "Venkatesh's village suffered from deep aquifer depletion. In 2024, our watershed engineers organized community volunteers to construct 14 stone check-dams and plant 1,200 native saplings along dry ridges. By monsoon end, the local water level rose by 14 feet, turning dry borewells operational again for over 45 marginal farming families.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600",
    quote: "We spent years arguing over water tankers. Now, our community forest harvests the rain for us."
  },
  {
    id: "sc-entre",
    category: "Entrepreneurship",
    title: "Creating Economic Opportunities",
    headline: "Unlocking Micro-Enterprise Growth",
    beneficiary: "Manjunath Badiger",
    location: "Navalgund Taluk",
    summary: "Assisting rural carpenters to modernize tools and launch custom retail wooden furniture businesses.",
    narrative: "Manjunath was a traditional artisan restricted to repairing simple field ploughs. Supported by a tailored entrepreneurial mentoring circle, he acquired specialized electric tools, perfected design schemas, and learned to sell products online. He now employs three local youth apprentices and services orders from major towns.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
    quote: "Custom tooling tripled my daily speed. Now, my handcrafts travel to homes across the state."
  }
];

// 4. Video Stories Carousel Data
const videoStories = [
  {
    title: "Sowing Seeds of Self-Reliance",
    duration: "4:15 mins",
    beneficiary: "Sharanappa's natural farming transformation",
    videoMockUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600",
    category: "Farmer Story"
  },
  {
    title: "The Dairy Cooperative Revolution",
    duration: "3:40 mins",
    beneficiary: "Savitha's cooperative leadership path",
    videoMockUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=600",
    category: "Women Entrepreneur Story"
  },
  {
    title: "Coding in the Green Fields",
    duration: "5:02 mins",
    beneficiary: "Deepa's journey inside the solar IT lab",
    videoMockUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
    category: "Youth Skill Development Story"
  },
  {
    title: "Healthcare at the Doorstep",
    duration: "2:55 mins",
    beneficiary: "Mobile diagnostic vans entering remote taluks",
    videoMockUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    category: "Health Camp Story"
  }
];

// 5. Testimonial Data (Institutional & Community)
const testimonials = [
  {
    quote: "Raita Mitra Social Trust has set an exceptional benchmark for field execution and financial transparency. Their quarterly, geo-tagged field reports and auditable compliance documentation made it effortless for our ESG committee to sanction and double our support.",
    name: "Shri. Vikram Kulkarni",
    designation: "Head of CSR and ESG Investments",
    organization: "Karnataka Industrial Alloys Ltd.",
    location: "Bengaluru",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    rating: 5
  },
  {
    quote: "Amartya Sen's Capability Approach is often talked about in academic journals, but Raita Mitra actually implements it. They focus on expanding real freedoms—the freedom to irrigate, the freedom to read code, and the freedom to self-govern. The results are life-changing.",
    name: "Dr. Arundhati Nayak",
    designation: "Director of Rural Development Programmes",
    organization: "Nayak Global Foundation",
    location: "Hubballi",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200",
    rating: 5
  },
  {
    quote: "Unlike many NGOs who just run one-day workshops and leave, Raita Mitra's team stays on the ground. They work alongside our farmers, resolve daily micro-irrigation failures, and help our schools organize computer classes. They are like family to Hebsur.",
    name: "Smt. Renuka Pujar",
    designation: "Village Panchayath President",
    organization: "Hebsur Gram Panchayath",
    location: "Hebsur Village",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    rating: 5
  },
  {
    quote: "With the scholarship from Raita Mitra, I am studying polytechnic engineering. Today, my whole village looks at me with pride. I want to build solar automation tools to make agriculture easier for my father.",
    name: "Deepa Kurubar",
    designation: "Scholarship Recipient & Student",
    organization: "Government Girls Polytechnic",
    location: "Kundgol",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=200",
    rating: 5
  }
];

// 6. Photo Gallery Section
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=800", category: "Agriculture Training", title: "Natural input preparation workshop" },
  { src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800", category: "Women SHG Activities", title: "Yaraguppi dairy computer testing setup" },
  { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800", category: "Digital Skill Programs", title: "Smart IT Lab session at Kundgol School" },
  { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800", category: "Health Camps", title: "Mobile clinic checking pediatric health" },
  { src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800", category: "Tree Plantation", title: "Ridge afforestation to boost water table" },
  { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800", category: "Community Events", title: "Panchayat stakeholder coordination meeting" },
  { src: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&q=80&w=800", category: "Women SHG Activities", title: "Millet spice processing collective packaging" },
  { src: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800", category: "Agriculture Training", title: "Sub-surface compost lines demo on field" }
];

export default function ImpactStories({ setActivePage, highContrast }: ImpactStoriesProps) {
  // Navigation tracking
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, []);

  // State managers
  const [hoveredDistrict, setHoveredDistrict] = useState<string>("Haveri");
  const [activeDistrictData, setActiveDistrictData] = useState(districtStats["Haveri"]);
  
  // Custom Slider Positions for Before/After Cards
  const [sliderPositions, setSliderPositions] = useState<Record<string, number>>({
    "ba-farmer": 50,
    "ba-women": 50,
    "ba-youth": 50
  });

  // Category filters
  const [storyFilter, setStoryFilter] = useState<string>("All");
  const [activeStoryModal, setActiveStoryModal] = useState<any>(null);

  // Video Stories section state
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);

  // Infographics tab selection
  const [activeInfographicTab, setActiveInfographicTab] = useState<string>("growth");

  // Testimonials Carousel state
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);

  // Photo Gallery Lightbox state
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [activeLightboxTitle, setActiveLightboxTitle] = useState<string>("");

  // Download Report Simulated Auditing flow
  const [isDownloadingReport, setIsDownloadingReport] = useState<boolean>(false);
  const [downloadStep, setDownloadStep] = useState<string>("");
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Corporate Partnership Sliding Drawer/Modal Form
  const [showPartnershipModal, setShowPartnershipModal] = useState<boolean>(false);
  const [partnershipForm, setPartnershipForm] = useState({
    name: "",
    org: "",
    email: "",
    focus: "Agriculture",
    budget: "₹10L - ₹25L",
    notes: ""
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Newsletter Section state
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterName, setNewsletterName] = useState<string>("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  // Handle map interaction
  const handleMapDistrictSelect = (district: string) => {
    if (districtStats[district]) {
      setHoveredDistrict(district);
      setActiveDistrictData(districtStats[district]);
    }
  };

  // Recharts Growth Graph data
  const growthData = [
    { year: '2021', beneficiaries: 1200, funding: 15, impactScore: 68 },
    { year: '2022', beneficiaries: 2100, funding: 24, impactScore: 74 },
    { year: '2023', beneficiaries: 3400, funding: 42, impactScore: 82 },
    { year: '2024', beneficiaries: 4800, funding: 65, impactScore: 89 },
    { year: '2025', beneficiaries: 6100, funding: 80, impactScore: 94 },
    { year: '2026', beneficiaries: 7800, funding: 110, impactScore: 98 },
  ];

  // Recharts Program Distribution Pie Chart data
  const programPieData = [
    { name: 'Regenerative Agriculture', value: 40, color: '#0f5132' },
    { name: 'Women Cooperatives & SHG', value: 25, color: '#f3c64f' },
    { name: 'Rural IT Labs & Scholarships', value: 20, color: '#10b981' },
    { name: 'Mobile Health Clinics', value: 15, color: '#06b6d4' }
  ];

  // Simulated Brochure Download
  const handleDownloadBrochure = () => {
    alert("CSR Partnership Brochure initiated. Download starting... (Simulated PDF)");
  };

  // Automated report downloading progress loops
  const triggerReportDownload = () => {
    setIsDownloadingReport(true);
    setDownloadSuccess(false);
    
    const steps = [
      "Accessing Raita Mitra encrypted audit databases...",
      "Verifying NGO Darpan registry certificate KA/2023/0342549...",
      "Verifying 12A / 80G tax clearance signatures...",
      "Generating high-resolution financial flow statements...",
      "Assembling community outcomes report & certified photos...",
      "Compiling final high-impact PDF artifact..."
    ];

    let currentStepIndex = 0;
    setDownloadStep(steps[0]);

    const interval = setInterval(() => {
      currentStepIndex++;
      if (currentStepIndex < steps.length) {
        setDownloadStep(steps[currentStepIndex]);
      } else {
        clearInterval(interval);
        setIsDownloadingReport(false);
        setDownloadSuccess(true);
        // Automatically hide success after 5 seconds
        setTimeout(() => setDownloadSuccess(false), 5000);
      }
    }, 850);
  };

  // Handle partnership form submits
  const submitPartnership = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    // POST partnership request to Server backend
    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'Partner Onboarding',
        name: partnershipForm.name,
        email: partnershipForm.email,
        phone: '',
        subject: `Partnership Proposal: ${partnershipForm.org}`,
        message: partnershipForm.notes || 'Interested in partnership with Raita Mitra.',
        metadata: {
          organization: partnershipForm.org,
          focusIntervention: partnershipForm.focus,
          estimatedBudget: partnershipForm.budget
        }
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Partnership request logged:', data);
    })
    .catch(err => {
      console.error('Error logging partnership request:', err);
    });

    setTimeout(() => {
      setShowPartnershipModal(false);
      setFormSubmitted(false);
      const nameSaved = partnershipForm.name;
      const emailSaved = partnershipForm.email;
      // reset form
      setPartnershipForm({
        name: "",
        org: "",
        email: "",
        focus: "Agriculture",
        budget: "₹10L - ₹25L",
        notes: ""
      });
      alert(`Thank you ${nameSaved}. A representative from Raita Mitra's ESG Compliance division will contact you at ${emailSaved} within 24 business hours.`);
    }, 1800);
  };

  // Handle newsletter capture submits
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterName || !newsletterEmail) return;
    setNewsletterSubscribed(true);

    // POST newsletter signup to Server backend
    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'Newsletter Signup',
        name: newsletterName,
        email: newsletterEmail,
        phone: '',
        subject: 'Impact Newsletter Signup',
        message: 'Subscribed to Impact Stories Journal updates.',
        metadata: { page: 'Impact Stories' }
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Impact stories newsletter signup logged:', data);
    })
    .catch(err => {
      console.error('Error logging newsletter signup:', err);
    });

    setTimeout(() => {
      setNewsletterSubscribed(false);
      setNewsletterName("");
      setNewsletterEmail("");
    }, 4000);
  };

  return (
    <div className={`w-full font-sans transition-colors duration-300 ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`} id="impact-stories-view-container">
      
      {/* SECTION 1: CINEMATIC BANNER HERO SECTION */}
      <section className="relative w-full py-28 md:py-36 bg-slate-950 flex flex-col justify-center items-center overflow-hidden text-center text-white px-4" id="impact-hero">
        {/* Animated background overlays representing lush green rural areas */}
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center mix-blend-overlay scale-105 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40 z-10"></div>
        
        <div className="relative z-20 max-w-4xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <nav className="flex justify-center items-center gap-2 text-xs font-mono tracking-wider text-slate-400 mb-2">
            <span onClick={() => setActivePage('home')} className="hover:text-gold cursor-pointer transition-colors">Home</span>
            <ChevronRight size={12} className="opacity-50" />
            <span className="text-gold font-bold">Impact Stories</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-gold/15 text-gold border border-gold/30">
            <Award size={12} />
            Certified Community Outcomes
          </span>

          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
            Stories That Inspire <br />
            <span className="bg-gradient-to-r from-emerald-400 via-gold to-yellow-300 bg-clip-text text-transparent">
              Sustainable Change
            </span>
          </h1>

          <p className="text-slate-300 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            Every life transformed creates a ripple of hope and opportunity across rural Karnataka. We translate CSR compliance into verified livelihood milestones.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              onClick={() => {
                const element = document.getElementById("impact-at-a-glance");
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-full text-xs md:text-sm font-bold bg-gradient-to-r from-emerald-600 to-forest hover:shadow-lg hover:shadow-emerald-900/20 cursor-pointer transition-all flex items-center gap-2"
            >
              Explore Field Outcomes
              <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => setShowPartnershipModal(true)}
              className="px-6 py-3 rounded-full text-xs md:text-sm font-bold border border-white/20 hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-2"
            >
              CSR Partnership Setup
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: ANIMATED INFOGRAPHIC DASHBOARD (OUR IMPACT AT A GLANCE) */}
      <section className={`py-12 -mt-10 relative z-30 max-w-7xl mx-auto px-4`} id="impact-at-a-glance">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { count: "5000+", label: "Farmers Empowered", sub: "Shifted to chemical-free organic farming", icon: Sprout, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
            { count: "3000+", label: "Youth Trained", sub: "Equipped with digital, computer & AI skills", icon: GraduationCap, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
            { count: "1500+", label: "Livelihoods Supported", sub: "Women SHGs dairy micro-cooperatives", icon: Building, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20" },
            { count: "12+", label: "Districts Reached", sub: "Active watershed and diagnostic programs", icon: Globe, color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20" },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-3xl border transition-all duration-300 group hover:-translate-y-1 ${
                highContrast 
                  ? 'bg-black border-2 border-white text-white' 
                  : 'bg-white border-slate-200/60 shadow-md shadow-slate-100/50 hover:shadow-xl hover:shadow-slate-200/50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl border ${card.color}`}>
                  <card.icon size={24} />
                </div>
                <span className="text-[10px] font-mono tracking-wider uppercase font-semibold text-slate-400 group-hover:text-gold transition-colors">
                  LIVE OUTCOME
                </span>
              </div>
              <div className="mt-4 space-y-1 text-left">
                <h3 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 dark:text-white group-hover:scale-102 transition-transform origin-left">
                  {card.count}
                </h3>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {card.label}
                </h4>
                <p className="text-xs text-slate-500 leading-normal">
                  {card.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: FEATURED STORY SECTION (SPLIT SCREEN) */}
      <section className="py-20 max-w-7xl mx-auto px-4" id="featured-story">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Video Playback Area */}
          <div className="lg:col-span-6 space-y-4">
            <div className={`relative rounded-3xl overflow-hidden aspect-video group cursor-pointer border shadow-lg ${
              highContrast ? 'border-2 border-white' : 'border-slate-100'
            }`} onClick={() => setIsPlayingVideo(true)}>
              <img 
                src="https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=800" 
                alt="Farmer Sharanappa" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/50 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gold hover:bg-yellow-400 text-slate-950 flex items-center justify-center shadow-xl animate-pulse group-hover:scale-110 transition-transform">
                  <Play size={24} className="ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-slate-950/80 backdrop-blur-md py-2 px-4 rounded-xl text-xs text-white">
                <span className="font-mono tracking-wider">FEATURED STORY: SHARANAPPA GOUDAR</span>
                <span className="bg-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold">4:15 MINS</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 italic text-center">
              Click the thumbnail to watch the full verified documentary from Hebsur Taluk.
            </p>
          </div>

          {/* Right Side: Narrative Summary */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-gold">
              FIELD PROFILE & DIGITAL AUDIT
            </span>
            <h2 className={`text-2xl md:text-4xl font-display font-extrabold tracking-tight ${
              highContrast ? 'text-white' : 'text-slate-900'
            }`}>
              Transforming Lives Through <br />
              <span className="text-emerald-700">Sustainable Agriculture</span>
            </h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Empowering farmers with traditional organic knowledge, high-grade solar micro-irrigation lines, and cooperative direct-market links to replace high-interest chemical agricultural debt cycles.
            </p>

            <div className={`p-6 rounded-2xl border-l-4 border-gold relative italic font-serif text-sm ${
              highContrast ? 'bg-black border-2 border-white text-white' : 'bg-gold/5 border-gold-light/20 text-slate-700'
            }`}>
              <Quote size={28} className="absolute right-4 top-4 text-gold/15 rotate-180" />
              &quot;By stopping chemical inputs, my soil became alive again. Today, my dry field generates steady vegetable yields, and my seasonal debt is completely gone.&quot;
              <p className="mt-2 text-xs font-mono font-bold tracking-wider text-slate-500 not-italic block uppercase">
                — Sharanappa Goudar, Certified Cohort Leader
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setIsPlayingVideo(true)}
                className="px-5 py-3 text-xs md:text-sm font-bold bg-emerald-800 text-white hover:bg-emerald-700 rounded-xl cursor-pointer flex items-center gap-2 animate-pulse"
              >
                <Play size={14} />
                Watch Story
              </button>
              <button 
                onClick={() => setActivePage('impact-stories/transforming-farmer-livelihoods')}
                className="px-5 py-3 text-xs md:text-sm font-bold bg-gold hover:bg-gold-light text-slate-950 rounded-xl cursor-pointer flex items-center gap-2"
              >
                <Sparkles size={14} />
                Explore Full Immersive Page
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById("infographics-section");
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3 text-xs md:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer"
              >
                View Audit Charts
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: SUCCESS STORIES GRID (MASONRY FILTER CARDS) */}
      <section className="py-20 max-w-7xl mx-auto px-4" id="success-masonry">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Empathetic Human Portraits</span>
          <h2 className={`text-2xl md:text-4xl font-display font-extrabold ${
            highContrast ? 'text-white' : 'text-slate-900'
          }`}>
            Stories Of Hope & Transformation
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Browse through vetted success records across agriculture, women cooperatives, health clinics, and rural classrooms.
          </p>

          {/* Filtering tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {["All", "Agriculture", "Women Empowerment", "Education", "Health", "Environment", "Entrepreneurship"].map((category) => (
              <button
                key={category}
                onClick={() => setStoryFilter(category)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  storyFilter === category
                    ? "bg-emerald-900 text-white shadow-md"
                    : highContrast 
                      ? "border border-white hover:bg-white hover:text-black text-white" 
                      : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories
            .filter(story => storyFilter === "All" || story.category === storyFilter)
            .map((story) => (
              <motion.div
                layout
                key={story.id}
                className={`rounded-3xl overflow-hidden border text-left flex flex-col justify-between transition-all duration-300 ${
                  highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/50 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-emerald-900/90 text-white font-mono font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {story.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                      <MapPin size={12} className="text-gold" />
                      <span>{story.location}</span>
                      <span>•</span>
                      <span>{story.beneficiary}</span>
                    </div>

                    <h3 className="font-display font-extrabold text-lg text-slate-900 leading-tight">
                      {story.headline}
                    </h3>
                    
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      {story.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button 
                    onClick={() => {
                      setActiveStoryModal(story);
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Read Full Journey
                    <Maximize2 size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* SECTION 6: INTERACTIVE IMPACT MAP */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t-2 border-b-2 border-white' : 'bg-emerald-950 text-white'}`} id="interactive-map">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side Map controls */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-gold flex items-center gap-1">
                <MapPin size={14} />
                Live Taluk Operations
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
                Impact Across Karnataka
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Hover or click on the interactive markers in the map visualization to read live statistics, active families reached, and environmental metrics directly overseen by our field teams.
              </p>

              {/* Display card for selected district */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredDistrict}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4"
                >
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <div>
                      <h4 className="text-lg font-bold text-gold">{hoveredDistrict} District</h4>
                      <p className="text-[10px] text-slate-400 font-mono">{activeDistrictData.coordinates}</p>
                    </div>
                    <span className="text-[10px] uppercase font-mono bg-emerald-800 text-white px-2 py-0.5 rounded font-bold">
                      ACTIVE AUDIT
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Families Reached</span>
                      <p className="text-base font-bold text-white mt-0.5">{activeDistrictData.reached}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Water Infrastructure</span>
                      <p className="text-base font-bold text-white mt-0.5">{activeDistrictData.water}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Smart Classrooms</span>
                      <p className="text-base font-bold text-white mt-0.5">{activeDistrictData.schools}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Livelihood Growth</span>
                      <p className="text-base font-bold text-white mt-0.5">{activeDistrictData.income}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                    {activeDistrictData.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* District Shortcut selector buttons for small screen */}
              <div className="flex flex-wrap gap-2 lg:hidden">
                {Object.keys(districtStats).map((d) => (
                  <button
                    key={d}
                    onClick={() => handleMapDistrictSelect(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors ${
                      hoveredDistrict === d ? 'bg-gold text-slate-900' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side High Fidelity Interactive Map Visualizer */}
            <div className="lg:col-span-7 flex justify-center items-center">
              <div className="relative w-full max-w-lg aspect-square bg-white/5 rounded-3xl border border-white/10 p-6 flex flex-col items-center justify-center overflow-hidden">
                
                {/* Background Grid Accent Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                {/* Schematic Karnataka SVG Representation */}
                <svg viewBox="0 0 400 400" className="w-full h-full z-10 max-h-[360px]">
                  {/* Stylized Karnataka outline polygon map placeholder */}
                  <path 
                    d="M 120 40 L 170 30 L 220 50 L 260 80 L 280 120 L 250 180 L 260 230 L 240 280 L 210 320 L 200 370 L 160 380 L 130 350 L 140 290 L 110 240 L 100 170 L 110 100 Z" 
                    fill="rgba(16, 185, 129, 0.08)" 
                    stroke="rgba(16, 185, 129, 0.25)" 
                    strokeWidth="2" 
                    strokeDasharray="4 4"
                  />

                  {/* Haveri Line / Region Connections */}
                  <circle cx="160" cy="210" r="42" fill="rgba(243, 198, 79, 0.04)" stroke="rgba(243, 198, 79, 0.15)" strokeWidth="1" />
                  <circle cx="150" cy="150" r="38" fill="rgba(16, 185, 129, 0.03)" stroke="rgba(16, 185, 129, 0.12)" strokeWidth="1" />

                  {/* Map Hotspots / Markers for 9 Districts */}
                  {[
                    { name: "Bidar", cx: 230, cy: 60, r: 8, color: "fill-emerald-400" },
                    { name: "Vijayapura", cx: 180, cy: 90, r: 9, color: "fill-amber-400" },
                    { name: "Belagavi", cx: 130, cy: 130, r: 10, color: "fill-emerald-400" },
                    { name: "Bagalkot", cx: 185, cy: 135, r: 9, color: "fill-amber-400" },
                    { name: "Dharwad", cx: 145, cy: 180, r: 11, color: "fill-emerald-400" },
                    { name: "Gadag", cx: 190, cy: 185, r: 9, color: "fill-amber-400" },
                    { name: "Koppal", cx: 215, cy: 200, r: 8, color: "fill-emerald-400" },
                    { name: "Raichur", cx: 245, cy: 155, r: 10, color: "fill-amber-400" },
                    { name: "Haveri", cx: 160, cy: 230, r: 11, color: "fill-gold font-bold" }
                  ].map((node) => {
                    const isSelected = hoveredDistrict === node.name;
                    return (
                      <g 
                        key={node.name}
                        onClick={() => handleMapDistrictSelect(node.name)}
                        onMouseEnter={() => handleMapDistrictSelect(node.name)}
                        className="cursor-pointer group"
                      >
                        {/* Hover Pulse Ring */}
                        <circle 
                          cx={node.cx} 
                          cy={node.cy} 
                          r={node.r + (isSelected ? 8 : 4)} 
                          className={`transition-all duration-300 ${
                            isSelected 
                              ? 'fill-gold/20 stroke-gold/50 animate-ping' 
                              : 'fill-white/0 stroke-white/0 group-hover:fill-white/10 group-hover:stroke-white/30'
                          }`}
                          strokeWidth="1.5"
                        />
                        {/* Core Dot */}
                        <circle 
                          cx={node.cx} 
                          cy={node.cy} 
                          r={isSelected ? 6 : 4.5} 
                          className={`transition-all duration-300 ${
                            isSelected ? 'fill-gold' : 'fill-emerald-400 group-hover:fill-gold'
                          }`}
                        />
                        {/* Text Label */}
                        <text 
                          x={node.cx + 12} 
                          y={node.cy + 4} 
                          className={`font-mono text-[9px] tracking-wider transition-all duration-300 pointer-events-none ${
                            isSelected ? 'fill-gold font-bold scale-105' : 'fill-slate-400 group-hover:fill-white'
                          }`}
                        >
                          {node.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-slate-400 pointer-events-none">
                  <span>Interactive Map Visualizer</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span> Selected: {hoveredDistrict}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: VIDEO STORIES CAROUSEL SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4" id="video-carousel-section">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12 text-left">
          <div className="space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Voices From The Field</span>
            <h2 className={`text-2xl md:text-4xl font-display font-extrabold ${
              highContrast ? 'text-white' : 'text-slate-900'
            }`}>
              Documentaries & Video Records
            </h2>
          </div>
          {/* Navigation indicators */}
          <div className="flex gap-2">
            <button 
              onClick={() => {
                setActiveVideoIndex(prev => Math.max(0, prev - 1));
                setIsPlayingVideo(false);
              }}
              disabled={activeVideoIndex === 0}
              className={`p-2.5 rounded-full border cursor-pointer transition-colors ${
                activeVideoIndex === 0 
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed' 
                  : 'border-slate-300 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={() => {
                setActiveVideoIndex(prev => Math.min(videoStories.length - 1, prev + 1));
                setIsPlayingVideo(false);
              }}
              disabled={activeVideoIndex === videoStories.length - 1}
              className={`p-2.5 rounded-full border cursor-pointer transition-colors ${
                activeVideoIndex === videoStories.length - 1 
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed' 
                  : 'border-slate-300 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Video Frame & selector layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Major Video screen */}
          <div className="lg:col-span-8">
            <div className={`relative w-full aspect-video rounded-3xl overflow-hidden bg-black border ${
              highContrast ? 'border-2 border-white' : 'border-slate-200 shadow-md'
            }`}>
              
              {/* Play video if isPlayingVideo is true */}
              {isPlayingVideo ? (
                <video 
                  src={videoStories[activeVideoIndex].videoMockUrl} 
                  className="w-full h-full object-cover" 
                  controls 
                  autoPlay
                />
              ) : (
                <div className="relative w-full h-full">
                  <img 
                    src={videoStories[activeVideoIndex].thumbnail} 
                    alt={videoStories[activeVideoIndex].title} 
                    className="w-full h-full object-cover opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-between p-6 text-white">
                    <span className="self-start text-[10px] font-mono uppercase bg-gold text-slate-900 px-2 py-0.5 rounded font-bold">
                      {videoStories[activeVideoIndex].category}
                    </span>

                    <div className="space-y-3 text-left">
                      <h3 className="text-xl md:text-3xl font-display font-extrabold leading-tight">
                        {videoStories[activeVideoIndex].title}
                      </h3>
                      <p className="text-xs text-slate-300 font-sans max-w-md">
                        Beneficiary: {videoStories[activeVideoIndex].beneficiary}
                      </p>
                      
                      <div className="flex items-center gap-4 pt-2">
                        <button 
                          onClick={() => setIsPlayingVideo(true)}
                          className="px-5 py-2.5 bg-gold hover:bg-yellow-400 text-slate-900 font-bold rounded-xl flex items-center gap-1.5 transition-colors text-xs"
                        >
                          <Play size={14} fill="currentColor" />
                          Play Documentary ({videoStories[activeVideoIndex].duration})
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Quick List Right Menu */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 text-left">
              Select Field Segment
            </h4>
            
            <div className="space-y-3">
              {videoStories.map((v, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setActiveVideoIndex(i);
                    setIsPlayingVideo(false);
                  }}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    activeVideoIndex === i
                      ? 'bg-emerald-950/5 border-emerald-800/30 shadow-md'
                      : 'bg-white hover:bg-slate-50 border-slate-100'
                  }`}
                >
                  <div className="flex gap-3 items-center">
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <img src={v.thumbnail} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Play size={12} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-gold font-bold">
                        {v.category}
                      </span>
                      <h5 className="font-display font-bold text-xs text-slate-900 leading-tight line-clamp-1 mt-0.5">
                        {v.title}
                      </h5>
                      <p className="text-[10px] text-slate-400 leading-none mt-1">
                        Duration: {v.duration}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 8: MEASURING CHANGE (IMPACT INFOGRAPHICS / CHARTS) */}
      <section className={`py-20 border-t border-b ${highContrast ? 'bg-black border-white' : 'bg-white border-slate-200/50'}`} id="infographics-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs uppercase font-mono tracking-wider text-emerald-700 font-extrabold flex justify-center items-center gap-1">
              <Activity size={14} className="animate-pulse" />
              Rigorous Quantitative Visuals
            </span>
            <h2 className={`text-2xl md:text-4xl font-display font-extrabold ${
              highContrast ? 'text-white' : 'text-slate-900'
            }`}>
              Measuring Sustainable Change
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Auditable growth metrics, geographical program spreads, and strategic Theories of Change structured for ESG integration.
            </p>

            {/* Selector tabs */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {[
                { id: "growth", label: "Beneficiary Growth" },
                { id: "distribution", label: "Program Distribution" },
                { id: "timeline", label: "Timeline Achievements" },
                { id: "ecosystem", label: "Ecosystem Flow" },
                { id: "theory", label: "Theory Of Change" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveInfographicTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all cursor-pointer ${
                    activeInfographicTab === tab.id
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive render based on tab */}
          <div className="w-full min-h-[380px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: Beneficiary Growth Graph */}
              {activeInfographicTab === "growth" && (
                <motion.div
                  key="growth-chart"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full max-w-3xl aspect-video bg-slate-50 rounded-3xl border border-slate-100 p-6 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start mb-4 text-left">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Beneficiary Capability Expansion</h4>
                      <p className="text-xs text-slate-400">Growth in validated cohort sizes over years (Active Farmers & Youth)</p>
                    </div>
                    <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                      Auditable CAG: 45.4%
                    </span>
                  </div>

                  <div className="w-full h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={growthData}>
                        <defs>
                          <linearGradient id="colorBeneficiary" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0f5132" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#0f5132" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                        <YAxis stroke="#94a3b8" fontSize={12} />
                        <Tooltip />
                        <Area type="monotone" dataKey="beneficiaries" stroke="#0f5132" strokeWidth={3} fillOpacity={1} fill="url(#colorBeneficiary)" name="Families Covered" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <p className="text-[10px] text-slate-400 font-mono text-center">
                    Data source: Raita Mitra internal GIS registry coordinates from November 2021 - June 2026.
                  </p>
                </motion.div>
              )}

              {/* Tab 2: Program Distribution Pie Chart */}
              {activeInfographicTab === "distribution" && (
                <motion.div
                  key="distribution-chart"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 rounded-3xl border border-slate-100 p-6"
                >
                  <div className="w-full h-64 flex justify-center items-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={programPieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {programPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-4 text-left">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Program Resource Allocations</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Percentage breakdown of financial grants applied directly to beneficiary capabilities.</p>
                    </div>

                    <div className="space-y-2">
                      {programPieData.map((p, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs">
                          <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: p.color }}></div>
                          <span className="text-slate-600 font-bold">{p.value}%</span>
                          <span className="text-slate-500 font-sans">{p.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Timeline Achievements */}
              {activeInfographicTab === "timeline" && (
                <motion.div
                  key="timeline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full max-w-3xl space-y-6 text-left"
                >
                  {[
                    { year: "2021", milestone: "Establishment & First Cohorts", desc: "Incorporated the Social Trust and initiated water-shed and crop protection trials with 50 families in Hebsur." },
                    { year: "2023", milestone: "Solar IT Labs & Cooperative Growth", desc: "Launched secondary solar-powered school smart labs and assisted the first 12 dairy cooperatives." },
                    { year: "2025", milestone: "NITI Aayog Darpan Registry Integration", desc: "Successfully achieved institutional audits, registering direct credentials under Darpan registry code KA/2023/0342549." },
                    { year: "2026", milestone: "Scaling Watersheds & Millennial Skills", desc: "Doubled districts reached to 12+, incorporating visual AI logic into rural school programs." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 relative group">
                      {idx < 3 && <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-emerald-800/20 group-hover:bg-emerald-800/45 transition-colors"></div>}
                      <div className="w-9 h-9 rounded-full bg-emerald-950 text-gold shrink-0 flex items-center justify-center font-mono font-bold text-xs z-10 border border-gold/20">
                        {item.year.slice(2)}
                      </div>
                      <div className="space-y-1 pb-4">
                        <h4 className="font-bold text-slate-800 text-sm leading-tight">{item.milestone}</h4>
                        <p className="text-xs text-slate-500 font-sans leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Tab 4: Ecosystem Flow */}
              {activeInfographicTab === "ecosystem" && (
                <motion.div
                  key="ecosystem"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full max-w-3xl aspect-video bg-slate-900 rounded-3xl p-6 text-white flex flex-col justify-between"
                >
                  <div className="text-left space-y-1 border-b border-white/10 pb-2">
                    <h4 className="font-bold text-gold text-sm">Community Development Ecosystem Flow</h4>
                    <p className="text-[10px] text-slate-400">Structured linkage of resource provision, field audits, and actual direct-empowerment loops.</p>
                  </div>

                  {/* Flow layout */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center py-6 text-center text-xs font-mono">
                    
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <span className="text-gold font-bold block mb-1">STAGE 1</span>
                      <Building size={16} className="mx-auto mb-1 opacity-70" />
                      Corporate CSR
                    </div>

                    <ChevronRight size={16} className="mx-auto text-slate-500 rotate-90 md:rotate-0" />

                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <span className="text-gold font-bold block mb-1">STAGE 2</span>
                      <Users size={16} className="mx-auto mb-1 opacity-70" />
                      Field Officers
                    </div>

                    <ChevronRight size={16} className="mx-auto text-slate-500 rotate-90 md:rotate-0" />

                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <span className="text-gold font-bold block mb-1">STAGE 3</span>
                      <Sprout size={16} className="mx-auto mb-1 opacity-70" />
                      Beneficiaries
                    </div>

                  </div>

                  <p className="text-[10px] text-slate-500 text-center italic">
                    All financial flow lines represent transparently verified transfers subject to regular public accounts audits.
                  </p>
                </motion.div>
              )}

              {/* Tab 5: Theory Of Change */}
              {activeInfographicTab === "theory" && (
                <motion.div
                  key="theory"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full max-w-3xl bg-slate-50 rounded-3xl border border-slate-100 p-6 text-slate-700 text-left space-y-4"
                >
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Theory of Change Flowchart</h4>
                    <p className="text-xs text-slate-400 leading-normal">Logical linkage mapping our structural inputs directly to long-term systemic impact benchmarks.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-slate-100 space-y-1">
                      <h5 className="font-mono font-bold text-slate-400 uppercase text-[9px]">1. Inputs</h5>
                      <p className="font-sans leading-relaxed">CSR Grants, Government Allocations, Expert Watershed Volunteers.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-100 space-y-1">
                      <h5 className="font-mono font-bold text-emerald-600 uppercase text-[9px]">2. Activities</h5>
                      <p className="font-sans leading-relaxed">Smart IT Labs, Sub-Surface Drips, SHG Dairy Cow Linkages.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-100 space-y-1">
                      <h5 className="font-mono font-bold text-amber-600 uppercase text-[9px]">3. Outcomes</h5>
                      <p className="font-sans leading-relaxed">Doubled soil carbon ratio, computer literacy, triple SHG income.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-100 space-y-1">
                      <h5 className="font-mono font-bold text-indigo-600 uppercase text-[9px]">4. Systemic Impact</h5>
                      <p className="font-sans leading-relaxed">Generational reversal of dryland agricultural distress in Karnataka.</p>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 9: TESTIMONIALS CAROUSEL */}
      <section className={`py-20 ${highContrast ? 'bg-black border-b-2 border-white' : 'bg-slate-50'}`} id="testimonials">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Global Endorsements</span>
            <h2 className={`text-2xl md:text-4xl font-display font-extrabold ${
              highContrast ? 'text-white' : 'text-slate-900'
            }`}>
              What Communities Say
            </h2>
          </div>

          {/* Testimonial slider view */}
          <div className="relative max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 text-left">
            <Quote size={42} className="absolute left-6 top-6 text-gold/15 rotate-180" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                    <span key={i} className="text-base">★</span>
                  ))}
                </div>

                <p className="text-base md:text-xl text-slate-700 italic font-serif leading-relaxed">
                  &quot;{testimonials[activeTestimonial].quote}&quot;
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <img 
                    src={testimonials[activeTestimonial].image} 
                    alt={testimonials[activeTestimonial].name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-gold"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className="text-xs text-slate-500 font-sans">
                      {testimonials[activeTestimonial].designation}, {testimonials[activeTestimonial].organization}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                      <MapPin size={10} />
                      {testimonials[activeTestimonial].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination dots */}
            <div className="flex justify-end gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    activeTestimonial === i ? 'bg-gold w-6' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* SECTION 12: CSR PARTNERSHIP BANNER */}
      <section className={`py-20 text-center ${highContrast ? 'bg-black border-t-2 border-white text-white' : 'bg-emerald-950 text-white'}`} id="csr-partnership">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-gold/15 text-gold border border-gold/30">
            <Building size={12} />
            Institutional ESG Collaborations
          </span>

          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight">
            Together We Can Create Greater Impact
          </h2>

          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Partner with Raita Mitra Social Trust (R) to design, execute, and monitor verified community developments compliant with Section 135 schedule VII guidelines.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              onClick={() => setShowPartnershipModal(true)}
              className="px-6 py-3 rounded-xl bg-gold hover:bg-yellow-400 text-slate-950 font-bold text-xs cursor-pointer transition-all flex items-center gap-2"
            >
              Partner With Us
              <ArrowRight size={14} />
            </button>
            <button 
              onClick={handleDownloadBrochure}
              className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 text-white font-bold text-xs cursor-pointer transition-all"
            >
              Download CSR Brochure
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 13: MEDIA MENTIONS SECTION (LOGO SLIDER) */}
      <section className="py-12 border-b border-slate-100 max-w-7xl mx-auto px-4" id="media-mentions">
        <h4 className="text-center text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-8">
          Recognized & Endorsed By Leading Institutions
        </h4>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-75">
          {["News Publications", "Government Recognition", "Corporate Partners", "Academic Institutions"].map((mention, index) => (
            <div 
              key={index} 
              className="px-4 py-2 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold font-mono tracking-wider text-slate-500 hover:text-slate-800 transition-colors"
            >
              {mention.toUpperCase()}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 14: SOCIAL PROOF SECTION (ANIMATED METRICS) */}
      <section className="py-16 max-w-7xl mx-auto px-4 text-center space-y-8" id="social-proof-metrics">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gold">
          VERIFIED BY NITI AAYOG ID: KA/2023/0342549
        </h4>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: "5000+ Farmers", desc: "Regenerative cohort" },
            { value: "3000+ Youth", desc: "Digital & Coding students" },
            { value: "1500+ Livelihoods", desc: "SHG Dairy members" },
            { value: "12+ Districts", desc: "Karnataka coverage" }
          ].map((m, idx) => (
            <div key={idx} className="text-center space-y-1">
              <h3 className="text-2xl md:text-4xl font-display font-extrabold text-slate-900 leading-tight">
                {m.value}
              </h3>
              <p className="text-xs text-slate-500 leading-none">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 15: NEWSLETTER SECTION */}
      <section className={`py-16 ${highContrast ? 'bg-black border-t-2 border-white' : 'bg-slate-100'}`} id="impact-newsletter">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <Mail size={32} className="mx-auto text-emerald-800 animate-bounce" />
          
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900 leading-tight">
              Stay Updated With Our Impact Journey
            </h3>
            <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto">
              Receive verified monthly field updates, financial audit briefs, and invitations to visit our rural demonstration centers.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={newsletterName}
              onChange={(e) => setNewsletterName(e.target.value)}
              required
              className="px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white text-xs text-slate-800 text-left"
            />
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white text-xs text-slate-800 text-left flex-1"
              />
              <button 
                type="submit" 
                className="px-4 py-3 bg-emerald-950 text-white font-bold text-xs rounded-xl hover:bg-emerald-900 transition-colors cursor-pointer shrink-0"
              >
                Join
              </button>
            </div>
          </form>

          {newsletterSubscribed && (
            <div className="text-xs font-mono font-bold text-emerald-700">
              ✓ Successfully subscribed! Thank you for walking alongside our rural communities.
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX MODAL FOR PHOTO GALLERY */}
      {activeLightboxImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-center items-center p-4"
          onClick={() => setActiveLightboxImage(null)}
        >
          <button 
            onClick={() => setActiveLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gold p-2 bg-white/10 rounded-full"
          >
            <X size={20} />
          </button>
          
          <img 
            src={activeLightboxImage} 
            alt="Gallery view" 
            className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl"
            referrerPolicy="no-referrer"
          />
          
          <p className="text-white mt-4 font-display font-bold text-sm md:text-base px-6 py-2 bg-slate-900/60 rounded-xl">
            {activeLightboxTitle}
          </p>
        </div>
      )}

      {/* SUCCESS STORIES DETAIL NARRATIVE MODAL */}
      {activeStoryModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-slate-100 shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Header image */}
            <div className="relative h-48 w-full overflow-hidden shrink-0">
              <img 
                src={activeStoryModal.image} 
                alt={activeStoryModal.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent flex flex-col justify-end p-6 text-white text-left">
                <span className="text-[9px] font-mono uppercase bg-gold text-slate-900 px-2 py-0.5 rounded self-start font-bold mb-1">
                  {activeStoryModal.category}
                </span>
                <h3 className="font-display font-extrabold text-xl leading-snug">{activeStoryModal.headline}</h3>
              </div>
              <button 
                onClick={() => setActiveStoryModal(null)}
                className="absolute top-3 right-3 text-white hover:text-gold bg-slate-950/40 p-1.5 rounded-full"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable text */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto text-left text-slate-700 text-xs md:text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-1"><MapPin size={12} /> {activeStoryModal.location}</span>
                <span>Beneficiary: <strong>{activeStoryModal.beneficiary}</strong></span>
              </div>

              <div className="p-4 bg-gold/5 border-l-4 border-gold rounded-r-xl italic font-serif">
                &quot;{activeStoryModal.quote}&quot;
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-[10px] uppercase font-bold text-slate-400">Verifiable Development Path</h4>
                <p className="leading-relaxed font-sans text-slate-600">
                  {activeStoryModal.narrative}
                </p>
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-100 shrink-0">
                <button 
                  onClick={() => {
                    setActiveStoryModal(null);
                    setActivePage('donate');
                  }}
                  className="px-4 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Fund Similar Programs
                </button>
                <button 
                  onClick={() => setActiveStoryModal(null)}
                  className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Close Record
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* INSTITUTIONAL CSR PARTNERSHIP FORM MODAL */}
      {showPartnershipModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-md w-full border border-slate-100 shadow-2xl p-6 md:p-8 relative">
            
            <button 
              onClick={() => setShowPartnershipModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-2"
            >
              <X size={18} />
            </button>

            <div className="text-left space-y-2 mb-6">
              <span className="text-[10px] font-mono uppercase bg-gold text-slate-900 px-2 py-0.5 rounded font-bold">
                ESG REGISTRY
              </span>
              <h3 className="text-xl md:text-2xl font-display font-extrabold text-slate-900 leading-tight">
                CSR Partnership Portal
              </h3>
              <p className="text-xs text-slate-500">
                Initiate a certified corporate project. Complete this brief framework request to fetch your compliance baseline.
              </p>
            </div>

            <form onSubmit={submitPartnership} className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Representative Name</label>
                <input 
                  type="text" 
                  value={partnershipForm.name}
                  onChange={(e) => setPartnershipForm(prev => ({ ...prev, name: e.target.value }))}
                  required 
                  placeholder="e.g. Vikram Kulkarni"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-xs text-left"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Corporate Organization</label>
                <input 
                  type="text" 
                  value={partnershipForm.org}
                  onChange={(e) => setPartnershipForm(prev => ({ ...prev, org: e.target.value }))}
                  required 
                  placeholder="e.g. Karnataka Alloys Ltd."
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-xs text-left"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Representative Email</label>
                <input 
                  type="email" 
                  value={partnershipForm.email}
                  onChange={(e) => setPartnershipForm(prev => ({ ...prev, email: e.target.value }))}
                  required 
                  placeholder="e.g. corporate@alloys.co.in"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-xs text-left"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Focus Program</label>
                  <select 
                    value={partnershipForm.focus}
                    onChange={(e) => setPartnershipForm(prev => ({ ...prev, focus: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none bg-white text-xs"
                  >
                    <option value="Agriculture">Regenerative Agri</option>
                    <option value="SHG">Women Cooperatives</option>
                    <option value="Education">Smart IT Classrooms</option>
                    <option value="Health">Mobile Health Vans</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Anticipated Budget</label>
                  <select 
                    value={partnershipForm.budget}
                    onChange={(e) => setPartnershipForm(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none bg-white text-xs"
                  >
                    <option value="₹10L - ₹25L">₹10L - ₹25L</option>
                    <option value="₹25L - ₹50L">₹25L - ₹50L</option>
                    <option value="₹50L - ₹1Cr">₹50L - ₹1Cr</option>
                    <option value="₹1Cr+">₹1Cr+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Partnership Notes (Optional)</label>
                <textarea 
                  value={partnershipForm.notes}
                  onChange={(e) => setPartnershipForm(prev => ({ ...prev, notes: e.target.value }))}
                  rows={2}
                  placeholder="Tell us about your specific taluk priorities..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-xs text-left"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-1"
              >
                Submit Partnership Query
                <Send size={12} />
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
