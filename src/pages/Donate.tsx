import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  Download, 
  ArrowRight, 
  Users, 
  Leaf, 
  Laptop, 
  HeartPulse, 
  Trees, 
  Building2, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  MessageSquare, 
  ThumbsUp, 
  Check, 
  Volume2, 
  Sparkles, 
  Globe, 
  X, 
  HelpCircle, 
  Info, 
  DollarSign, 
  Star, 
  Lock, 
  QrCode, 
  Smartphone, 
  CreditCard,
  GraduationCap,
  Briefcase,
  Wheat,
  Award,
  CheckCircle,
  Clock,
  Printer,
  Copy
} from 'lucide-react';

interface DonateProps {
  highContrast: boolean;
}

// 1. DATA DEFINITIONS

const IMPACT_CARDS = [
  {
    id: 'ic_1',
    amount: 1000,
    impact: "Supports comprehensive soil health diagnostics, custom microbial formulation training, and sustainable organic inputs for smallholder farming families.",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600",
    label: "Farmer Training & Soil Health"
  },
  {
    id: 'ic_2',
    amount: 5000,
    impact: "Supports interactive digital and Python/Scratch software literacy camps for rural schoolgirls utilizing solar-powered computer labs.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
    label: "Digital Learning & AI Skills"
  },
  {
    id: 'ic_3',
    amount: 10000,
    impact: "Empowers rural women self-help groups (SHGs) to establish automated fat-testing milk diagnostics and solar cold-chain systems.",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=600",
    label: "Women SHG Livelihoods"
  },
  {
    id: 'ic_4',
    amount: 25000,
    impact: "Funds comprehensive pediatric screenings, mobile medical clinics, ophthalmology consults, and micro-nutrient millet distributions in remote forest fringe villages.",
    image: "https://images.unsplash.com/photo-1504813184591-01552fffd3be?auto=format&fit=crop&q=80&w=600",
    label: "Community Health & Nutrition"
  }
];

const SUSTAINING_PLANS = [
  {
    id: 'sp_1',
    name: "Supporter",
    amount: 1000,
    interval: "month",
    benefits: [
      "Provides organic bio-seed kits for 1 farm family monthly",
      "Quarterly soil humic carbon test results summary",
      "Impact reports and newsletter sent to your email"
    ],
    highlight: false
  },
  {
    id: 'sp_2',
    name: "Champion",
    amount: 5000,
    interval: "month",
    benefits: [
      "Sponsors STEM computer literacy for 3 state school girls",
      "Direct invitations to our annual Agrarian Advisory Summit",
      "Detailed bi-annual audited project ledger report",
      "Listing on our online Recognition Wall of Sustaining Partners"
    ],
    highlight: true
  },
  {
    id: 'sp_3',
    name: "Impact Partner",
    amount: 10000,
    interval: "month",
    benefits: [
      "Secures solar micro-irrigation drip equipment for 1 family monthly",
      "One-on-one virtual consultation with field officers",
      "Dedicated coordinator for CSR/ESG tax compliance audit filing",
      "Printed Annual Board Review and personalized impact trophy"
    ],
    highlight: false
  }
];

const ACTIVE_CAMPAIGNS = [
  {
    id: 'c_1',
    title: "Empower Marginal Farmers",
    desc: "Deploying solar sub-surface water pumps and high-precision drip networks in dryland communities of North Karnataka.",
    raised: 1845000,
    target: 3000000,
    donors: 1420,
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600",
    category: "Sustainable Agriculture"
  },
  {
    id: 'c_2',
    title: "AI & Coding Skills for Rural Girls",
    desc: "Establishing solar-powered workstations and Scratch/Python logic curriculums across 15 high schools in Dharwad.",
    raised: 1240000,
    target: 2000000,
    donors: 890,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
    category: "Education & Tech"
  },
  {
    id: 'c_3',
    title: "Women-Led Dairy Micro-Colloids",
    desc: "Funding automated diagnostic fat-meters and bulk solar refrigeration systems for SAVANUR SHG cooperative.",
    raised: 920000,
    target: 1500000,
    donors: 610,
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=600",
    category: "Women Livelihoods"
  },
  {
    id: 'c_4',
    title: "Afforestation & Watershed Action",
    desc: "Constructing linear soil bunds and planting 10,000 native windbreaks to recharge depleted village aquifers.",
    raised: 680000,
    target: 1000000,
    donors: 395,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600",
    category: "Climate & Ecosystem"
  }
];

const BENEFICIARY_STORIES = [
  {
    id: 'bs_1',
    title: "Farmer Success Story",
    name: "Mallappa Gowda",
    location: "Savanur Taluk, Haveri",
    metric: "3x Crop Income Reached",
    quote: "With the solar drip arrays sponsored by RMST donors, my dry clay fields remained green during Karnataka's intense seasonal dry-spell. My input costs are down by 60% as we formulate bio-fertilizers locally.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
    youtubeId: "dQw4w9WgXcQ",
    videoDuration: "4:15",
    tags: ["Regenerative Farming", "Solar Pumps"]
  },
  {
    id: 'bs_2',
    title: "Women Entrepreneur Story",
    name: "Meenakshi Patil",
    location: "Yaraguppi Cooperative, Haveri",
    metric: "₹12,000 Steady Monthly Livelihood",
    quote: "Middlemen used to set unfair dairy fat rates, but our women cooperative now uses digital analyzer scales. We receive direct bank payments instantly. Our community is self-reliant now.",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=800",
    youtubeId: "dQw4w9WgXcQ",
    videoDuration: "5:30",
    tags: ["SHG Leadership", "Dairy Cold-Chains"]
  },
  {
    id: 'bs_3',
    title: "Youth Employment Story",
    name: "Shalini K.",
    location: "Kalghatgi high school, Dharwad",
    metric: "Voted Tech Student of the Year",
    quote: "I had never used a computer before RMST set up our solar IT hub. Now I code logical games on Scratch and help state-school teachers digitize worksheets. I want to become a software engineer.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
    youtubeId: "dQw4w9WgXcQ",
    videoDuration: "3:45",
    tags: ["Python Coding", "STEM Solar Hubs"]
  }
];

const FAQS = [
  {
    q: "Is my donation tax exempt under Indian laws?",
    a: "Yes, Raita Mitra Social Trust is fully registered with the Income Tax Department with valid 12A and 80G tax certifications. Individual and corporate Indian taxpayers receive an automatic 50% tax exemption under Section 80G of the Income Tax Act. A board-signed certificate is compiled and sent to your email instantly."
  },
  {
    q: "How are donations utilized and verified?",
    a: "We maintain a zero-leakage financial model. Exactly 92% of donated funds are spent directly on programmatic capital assets (solar pumps, laptops, seeds, diagnostics) in the field. The remaining 8% covers statutory auditing, field personnel, and transport. Annual audited statements are published transparently on our Compliance Hub."
  },
  {
    q: "Will I receive a direct formal receipt?",
    a: "Absolutely. A simulated transaction voucher is visible on your screen instantly. An official tax-receipt containing our statutory registration IDs, signing authority stamp, and your unique voucher code is generated and dispatched to your email immediately upon transaction approval."
  },
  {
    q: "Can international donors or NRIs donate safely?",
    a: "Yes, our PayPal and international card processing sandbox integrations support global credit cards and digital wallets. We comply with all relevant foreign-exchange reporting regulations for social trusts."
  },
  {
    q: "Can I earmark my donation for a specific cause?",
    a: "Yes, our multi-step checkout allows you to specifically allocate your contribution to Agricultural Solar Irrigation, Girls STEM Coding Labs, Women Dairy Cooperatives, or general unrestricted Trust Core Funds."
  }
];

const DONOR_TESTIMONIALS = [
  {
    id: 't_1',
    name: "Rajesh Sekhar",
    role: "CSR Director, Sekhar Technologies",
    quote: "Partnering with Raita Mitra for our Karnataka ESG goals has been phenomenal. Their georeferenced audits, instant utilization receipts, and MCA CSR-1 compliance make them a benchmark NGO.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 't_2',
    name: "Dr. Arundhati Nayak",
    role: "Philanthropist & Pediatric Consultant",
    quote: "I sustain three health camps a year through their Monthly Giving plan. The transparency and ground-level photos they provide show that every single rupee is treated with reverence.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 't_3',
    name: "Karan S. Bhatia",
    role: "NRI Tech Advisor",
    quote: "Empowering state-school girls in Dharwad with real programmatic skills is how we break the cycle of seasonal poverty. Raita Mitra's digital labs are laying the groundwork for rural high-tech talent.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150"
  }
];

const SUPPORTER_LOGOS = [
  { name: "Tata Trusts", logoText: "TATA" },
  { name: "GiveIndia Vetted", logoText: "GIVE" },
  { name: "Akshaya Patra", logoText: "AKSHAYA" },
  { name: "UNICEF Ally", logoText: "UNICEF" },
  { name: "NABARD Partner", logoText: "NABARD" },
  { name: "GOK Social Trust", logoText: "KARNATAKA" }
];

export default function Donate({ highContrast }: DonateProps) {
  // Navigation & Scroll resets
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, []);

  // Multi-Step Checkout States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Contact, 2: PAN & Purpose, 3: Simulated Payment Gateway, 4: Receipt/Exemption Certificate
  
  // Checkout Form Fields
  const [amount, setAmount] = useState<number>(2500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [campaignTitle, setCampaignTitle] = useState<string>('General Core Fund');
  
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorCountry, setDonorCountry] = useState('India');
  const [donorAddress, setDonorAddress] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [earmarkedPurpose, setEarmarkedPurpose] = useState('General Unrestricted Core Funds');
  const [paymentGateway, setPaymentGateway] = useState<'upi' | 'card' | 'netbanking' | 'paypal'>('upi');
  const [simulatedGatewayStep, setSimulatedGatewayStep] = useState<'selection' | 'processing' | 'otp' | 'success'>('selection');
  
  // Simulated Card/UPI fields
  const [cardNo, setCardNo] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [transactionId, setTransactionId] = useState('');
  const [certificateId, setCertificateId] = useState('');
  
  // Animated Counters
  const [countFarmers, setCountFarmers] = useState(0);
  const [countYouth, setCountYouth] = useState(0);
  const [countLivelihoods, setCountLivelihoods] = useState(0);

  useEffect(() => {
    const intervalFarmers = setInterval(() => {
      setCountFarmers(prev => (prev >= 5000 ? 5000 : prev + 120));
    }, 25);
    const intervalYouth = setInterval(() => {
      setCountYouth(prev => (prev >= 3000 ? 3000 : prev + 85));
    }, 25);
    const intervalLivelihoods = setInterval(() => {
      setCountLivelihoods(prev => (prev >= 1500 ? 1500 : prev + 45));
    }, 25);

    return () => {
      clearInterval(intervalFarmers);
      clearInterval(intervalYouth);
      clearInterval(intervalLivelihoods);
    };
  }, []);

  // Visual Slider background index for cinematic Hero
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const heroSlides = [
    {
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600",
      caption: "Sponsoring sustainable windbreaks and soil organic carbon sinks across arid Dharwad lands."
    },
    {
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600",
      caption: "Interactive STEM software literacy and Python code learning labs for state-school pupils."
    },
    {
      img: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=1600",
      caption: "All-women decentralized dairy cooperatives bypass middleman rates for steady livelihood security."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Dynamic Earmarked outcome calculated summary
  const getDynamicOutcome = (amt: number) => {
    if (amt < 1000) {
      return "Sponsors a complete micro-compost starter formulation and baseline soil testing for 1 organic farmer.";
    } else if (amt >= 1000 && amt < 2500) {
      return "Secures organic non-GMO high-germination crop seeds and bio-rejuvenating microbial kits for 1 family.";
    } else if (amt >= 2500 && amt < 5000) {
      return "Enables deep soil health card audits, water-conservation drip pipes, and natural crop defenses for 2 marginal farms.";
    } else if (amt >= 5000 && amt < 10000) {
      return "Sponsors digital learning, visual scratch blocks, and solar touchscreen tablet access for 1 rural student.";
    } else if (amt >= 10000 && amt < 25000) {
      return "Equips 1 rural woman with milk automated fat-testing instruments, solar battery backups, and cooperative ledger tools.";
    } else if (amt >= 25000 && amt < 100000) {
      return "Sponsors 1 mobile diagnostic clinic, eye refractions, free corrective specs, and micro-nutrient millet bags for a remote village.";
    } else {
      return "Adopts a full high-performance classroom with solar solar panels, 10 tablets, and offline educational directories.";
    }
  };

  // Faq Accordion index
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Beneficiary Stories index
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Simulated resource download
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

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
            alert(`Resource Download Simulated Successfully!\n"${docName}" has been securely compiled, checked for virus signatures, and saved to your device.`);
          }, 500);
          return 100;
        }
        return prev + 20;
      });
    }, 100);
  };

  // Fast preset values
  const presets = [500, 1000, 2500, 5000, 10000];

  const handlePresetSelect = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    const parsed = parseInt(val, 10);
    setAmount(isNaN(parsed) ? 0 : parsed);
  };

  // Custom Form Validations
  const handleNextStep = () => {
    const errors: Record<string, string> = {};
    if (checkoutStep === 1) {
      if (!donorName.trim()) errors.name = "Full Name is required for tax receipts.";
      if (!donorEmail.trim() || !donorEmail.includes("@") || !donorEmail.includes(".")) {
        errors.email = "A valid active email address is required.";
      }
      if (!donorPhone.trim() || donorPhone.length < 10) {
        errors.phone = "Provide a valid 10-digit mobile number.";
      }
      if (!donorAddress.trim()) errors.address = "Billing address is required.";
      
      setFormErrors(errors);
      if (Object.keys(errors).length === 0) {
        setCheckoutStep(2);
      }
    } else if (checkoutStep === 2) {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (donorPan.trim() && !panRegex.test(donorPan.toUpperCase())) {
        errors.pan = "Indian PAN Card format is invalid (e.g. ABCDE1234F).";
      }
      setFormErrors(errors);
      if (Object.keys(errors).length === 0) {
        setCheckoutStep(3);
        setSimulatedGatewayStep('selection');
      }
    }
  };

  // Submit simulated transaction
  const startSimulatedTransaction = () => {
    setSimulatedGatewayStep('processing');
    
    // Generate references
    const refId = "TXN" + Math.floor(Math.random() * 9000000 + 1000000);
    const certId = "RMST/80G/" + new Date().getFullYear() + "/" + Math.floor(Math.random() * 9000 + 1000);
    setTransactionId(refId);
    setCertificateId(certId);

    setTimeout(() => {
      setSimulatedGatewayStep('otp');
    }, 1800);
  };

  const verifySimulatedOtp = () => {
    setSimulatedGatewayStep('processing');
    setTimeout(() => {
      setSimulatedGatewayStep('success');
      setCheckoutStep(4);
    }, 1500);
  };

  const triggerDirectSponsorship = (amtVal: number, campaignName: string, recurring: boolean = false) => {
    setAmount(amtVal);
    setCustomAmount('');
    setIsRecurring(recurring);
    setCampaignTitle(campaignName);
    setIsCheckoutOpen(true);
    setCheckoutStep(1);
  };

  return (
    <div className={`w-full selection:bg-amber-500/20 ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`} id="donate-premium-view">
      
      {/* SECTION 1: EMOTIONAL FULL-WIDTH BANNED HERO */}
      <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden py-24 md:py-32 px-4" id="emotional-hero">
        {/* Animated Background Slideshow (Cinematic Fallback) */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.35, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroSlides[currentHeroSlide].img})` }}
            />
          </AnimatePresence>
          {/* Immersive Dark Radial and Linear Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent z-10" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/40 to-slate-950 z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto text-center space-y-8">
          {/* Breadcrumbs */}
          <nav className="flex justify-center items-center gap-2 text-xs font-mono tracking-widest text-emerald-400/90 font-semibold" aria-label="Breadcrumb">
            <span className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => window.location.hash = '#/'}>Home</span>
            <ChevronRight size={12} className="opacity-60 text-slate-400" />
            <span className="text-amber-400">Donate & Support Us</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Sparkles size={12} className="animate-pulse" />
            Empowering Rural Karnataka
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white tracking-tight leading-none">
            Together, We Can <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-amber-500">
              Create Lasting Change
            </span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed font-sans font-medium">
            Your support empowers smallholder farmers, strengthens rural girls with STEM opportunities, and builds sustainable, self-reliant communities across dryland regions.
          </p>

          {/* Active Overlay Caption */}
          <div className="text-xs font-mono text-emerald-300 bg-slate-900/60 inline-flex rounded-xl py-1 px-3 border border-emerald-500/20 backdrop-blur-sm max-w-sm">
            🛡️ Dynamic: {heroSlides[currentHeroSlide].caption}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button 
              onClick={() => {
                document.getElementById('donation-widget-split')?.scrollIntoView({ behavior: 'smooth' });
                setIsRecurring(false);
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-extrabold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all duration-300 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 tracking-wider cursor-pointer"
            >
              <Heart size={14} className="fill-current" />
              <span>DONATE NOW</span>
            </button>
            <button 
              onClick={() => {
                document.getElementById('monthly-giving')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-extrabold bg-slate-900/90 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300 flex items-center justify-center gap-2 tracking-wider cursor-pointer"
            >
              <Award size={14} />
              <span>BECOME A MONTHLY SUPPORTER</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: IMPACT COUNTER CARDS */}
      <section className="relative z-30 max-w-7xl mx-auto px-4 -mt-12" id="impact-counter-section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className={`p-6 rounded-3xl border flex items-center gap-5 transition-transform duration-300 hover:-translate-y-1 ${
            highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/60 shadow-lg shadow-slate-200/40 text-slate-800'
          }`}>
            <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              <Wheat size={28} className="stroke-[1.5]" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-3xl md:text-4xl font-display font-black tracking-tight font-mono text-emerald-800 dark:text-emerald-400">
                {countFarmers.toLocaleString()}+
              </h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider font-mono">Farmers Empowered</p>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border flex items-center gap-5 transition-transform duration-300 hover:-translate-y-1 ${
            highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/60 shadow-lg shadow-slate-200/40 text-slate-800'
          }`}>
            <div className="p-4 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
              <GraduationCap size={28} className="stroke-[1.5]" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-3xl md:text-4xl font-display font-black tracking-tight font-mono text-amber-800 dark:text-amber-400">
                {countYouth.toLocaleString()}+
              </h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider font-mono">Youth Trained</p>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border flex items-center gap-5 transition-transform duration-300 hover:-translate-y-1 ${
            highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/60 shadow-lg shadow-slate-200/40 text-slate-800'
          }`}>
            <div className="p-4 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400">
              <Briefcase size={28} className="stroke-[1.5]" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-3xl md:text-4xl font-display font-black tracking-tight font-mono text-teal-800 dark:text-teal-400">
                {countLivelihoods.toLocaleString()}+
              </h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider font-mono">Livelihoods Supported</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: SPLIT-SCREEN DONATION WIDGET SECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto" id="donation-widget-split">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Input Panel */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-500 font-bold">SECURE INTERACTIVE FLOW</span>
              <h2 className={`font-display font-extrabold text-2xl md:text-4xl leading-tight ${highContrast ? 'text-white' : 'text-slate-900'}`}>
                Choose Your Contribution
              </h2>
              <p className="text-xs md:text-sm text-slate-500 font-sans leading-relaxed">
                Configure your contribution parameters below. Raita Mitra Social Trust processes individual, HNI, and corporate CSR assets directly into village-level structural projects.
              </p>
            </div>

            {/* Donation Type Toggle */}
            <div className="flex bg-slate-200/60 p-1.5 rounded-2xl gap-1" id="type-selector">
              <button
                onClick={() => setIsRecurring(false)}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  !isRecurring 
                    ? highContrast ? 'bg-white text-black font-extrabold' : 'bg-emerald-900 text-white shadow'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                One-Time Donation
              </button>
              <button
                onClick={() => setIsRecurring(true)}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  isRecurring 
                    ? highContrast ? 'bg-white text-black font-extrabold' : 'bg-emerald-900 text-white shadow'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Monthly Giving Plan
              </button>
            </div>

            {/* Amount Presets */}
            <div className="space-y-4">
              <label className="block text-[11px] font-bold text-slate-400 font-mono uppercase tracking-wider">
                Select Donation Amount (INR)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {presets.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handlePresetSelect(val)}
                    className={`py-3.5 text-center text-xs font-extrabold rounded-2xl border transition-all cursor-pointer ${
                      amount === val && !customAmount
                        ? highContrast 
                          ? 'bg-white text-black border-black font-black' 
                          : 'bg-emerald-50 border-emerald-900 text-emerald-900 ring-2 ring-emerald-900/10'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm'
                    }`}
                  >
                    ₹{val.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="space-y-2">
                <label htmlFor="widget-custom-amount" className="block text-[11px] font-bold text-slate-400 font-mono uppercase tracking-wider">
                  Or Enter Custom Amount
                </label>
                <div className="relative max-w-md">
                  <span className="absolute left-4 top-3 text-sm font-mono font-bold text-slate-400">₹</span>
                  <input
                    id="widget-custom-amount"
                    type="number"
                    placeholder="E.g. 15000"
                    value={customAmount}
                    onChange={handleCustomAmtChange}
                    className={`w-full pl-8 pr-16 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-950 font-mono text-sm ${
                      highContrast ? 'bg-black border-white text-white' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
                    }`}
                  />
                  {customAmount && (
                    <button 
                      onClick={() => { setCustomAmount(''); setAmount(2500); }}
                      className="absolute right-3 top-2.5 text-[10px] font-mono text-rose-500 bg-rose-50 px-2 py-0.5 rounded uppercase"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Simulated Live Impact Outcome Box */}
            <div className={`p-6 rounded-3xl border flex gap-4 ${
              highContrast ? 'bg-black border-white text-white' : 'bg-emerald-500/5 border-emerald-500/15'
            }`}>
              <div className="p-3 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-xl h-12 w-12 flex items-center justify-center shrink-0">
                <TrendingUp size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                  Calculated Rural Outcome (Zero Leakage)
                </h4>
                <p className="text-xl font-display font-black text-emerald-950 dark:text-white">
                  ₹{amount.toLocaleString('en-IN')} {isRecurring ? '/ Month' : ''}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                  {getDynamicOutcome(amount)}
                </p>
              </div>
            </div>

            {/* Direct Exemption Notice */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200/50 flex gap-3 items-start text-xs">
              <ShieldCheck className="text-emerald-600 shrink-0 mt-0.5" size={16} />
              <div className="text-slate-500 dark:text-slate-400 leading-relaxed">
                <strong>80G Tax-Deduction Filing:</strong> Under Section 80G of the Income Tax Act, 1961, donors receive a 50% tax exemption. Raita Mitra Social Trust (R) automatically registers your PAN post-checkout and compiles your digital CA-vetted tax receipt.
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Options Panel */}
          <div className="lg:col-span-5">
            <div className={`p-6 md:p-8 rounded-3xl border text-left space-y-6 ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/60 shadow-xl'
            }`} id="checkout-panel">
              <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
                <div className="space-y-0.5">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-display">Simulated Sandbox Gateways</h3>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Select simulated check-out channel</p>
                </div>
                <Lock size={16} className="text-emerald-600" />
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-mono text-slate-400 uppercase">Interactive Gateways:</p>
                
                {/* Simulated payment button triggers */}
                <button
                  onClick={() => {
                    setPaymentGateway('upi');
                    setIsCheckoutOpen(true);
                    setCheckoutStep(1);
                  }}
                  className="w-full p-4 rounded-2xl border border-slate-200 hover:border-emerald-600 hover:bg-slate-50 flex items-center justify-between transition-all group text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                      <QrCode size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Razorpay UPI Checkout</h4>
                      <p className="text-[9px] font-mono text-slate-400">Instantly generate simulated UPI QR codes</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </button>

                <button
                  onClick={() => {
                    setPaymentGateway('card');
                    setIsCheckoutOpen(true);
                    setCheckoutStep(1);
                  }}
                  className="w-full p-4 rounded-2xl border border-slate-200 hover:border-emerald-600 hover:bg-slate-50 flex items-center justify-between transition-all group text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Stripe Card Platform</h4>
                      <p className="text-[9px] font-mono text-slate-400">Secure simulated international visa/mastercard gateway</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </button>

                <button
                  onClick={() => {
                    setPaymentGateway('paypal');
                    setIsCheckoutOpen(true);
                    setCheckoutStep(1);
                  }}
                  className="w-full p-4 rounded-2xl border border-slate-200 hover:border-emerald-600 hover:bg-slate-50 flex items-center justify-between transition-all group text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                      <Globe size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">PayPal International</h4>
                      <p className="text-[9px] font-mono text-slate-400">Supports NRI/Foreign currency transactions</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl text-[10px] text-slate-400 leading-normal space-y-1">
                <p>💡 <strong>Checkout Notice:</strong> Selecting any gateway above triggers our interactive sandbox wizard, allowing you to complete simulated checkout steps and download a customized formal 80G tax certificate instantly.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: IMPACT CARD SECTION */}
      <section className="py-20 px-4 bg-slate-900 text-white" id="impact-cards">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">TRANSPARENT SIZING</span>
            <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
              See The Difference Your Contribution Makes
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We translate exact sponsorship totals into concrete, measurable material allocations. Click any card below to instant-fill the donation widget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT_CARDS.map((card) => (
              <div 
                key={card.id}
                onClick={() => triggerDirectSponsorship(card.amount, card.label)}
                className="group relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950/80 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-2xl"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.label} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full text-[9px] font-mono bg-amber-400 text-slate-950 font-bold uppercase tracking-wider">
                    {card.label}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-mono font-black text-amber-400">
                      ₹{card.amount.toLocaleString('en-IN')}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {card.impact}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-amber-400 font-bold font-mono">
                    <span>SPONSOR THIS</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: WHY DONATE SECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto text-center" id="why-donate">
        <div className="space-y-12">
          
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 font-bold">STATUTORY INTEGRITY</span>
            <h2 className={`font-display font-black text-3xl tracking-tight ${highContrast ? 'text-white' : 'text-slate-900'}`}>
              Why Donate to Raita Mitra?
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-2xl mx-auto">
              We hold ourselves to strict corporate governance pathways to verify that your resources build permanent local assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className={`p-8 rounded-3xl border text-left space-y-4 ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-md shadow-slate-100/40'
            }`}>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-2xl w-12 h-12 flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Transparent Utilization</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Every single rupee is registered digitally. We host public bi-annual project audit ledgers, geotagged photos of installed micro-infrastructure, and direct feedback indicators.
              </p>
            </div>

            <div className={`p-8 rounded-3xl border text-left space-y-4 ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-md shadow-slate-100/40'
            }`}>
              <div className="p-3 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 rounded-2xl w-12 h-12 flex items-center justify-center">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Verified Registrations</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Our social trust status is validated via NGO Darpan, with active MCA CSR-1 authorization, continuous 12A clearances, and automatic 80G tax benefit processing.
              </p>
            </div>

            <div className={`p-8 rounded-3xl border text-left space-y-4 ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-md shadow-slate-100/40'
            }`}>
              <div className="p-3 bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 rounded-2xl w-12 h-12 flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Measurable Impact</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                We monitor seasonal humic carbon indicators in fields, math/coding grade boosts in state schools, and micro-dairy earnings ledger balances of our women cooperatives.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: MONTHLY GIVING PLAN SECTION */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-zinc-950 border-y border-slate-200/50" id="monthly-giving">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 font-bold">SUSTAINED PROGRESS</span>
            <h2 className={`font-display font-black text-3xl tracking-tight ${highContrast ? 'text-white' : 'text-slate-900'}`}>
              Become A Sustaining Partner
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto">
              Monthly subscriptions allow our agronomists, trainers, and educators to coordinate multi-season rural programs smoothly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SUSTAINING_PLANS.map((plan) => (
              <div 
                key={plan.id}
                className={`rounded-3xl border p-8 flex flex-col justify-between space-y-6 text-left relative transition-all duration-300 hover:shadow-xl ${
                  plan.highlight
                    ? highContrast 
                      ? 'bg-black border-4 border-amber-400 text-white' 
                      : 'bg-emerald-950 text-white border-2 border-amber-400 transform -translate-y-2'
                    : highContrast
                      ? 'bg-black border border-white text-white'
                      : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3.5 left-6 bg-amber-400 text-slate-950 text-[9px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-slate-900">
                    ★ MOST POWERFUL IMPACT
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className={`text-lg font-bold uppercase font-mono tracking-wider ${plan.highlight ? 'text-amber-400' : 'text-emerald-700'}`}>
                      {plan.name}
                    </h3>
                    <p className="text-3xl font-display font-black mt-2 font-mono">
                      ₹{plan.amount.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-slate-400">/month</span>
                    </p>
                  </div>

                  <ul className="space-y-2.5 text-xs">
                    {plan.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex gap-2 items-start">
                        <Check className="text-amber-400 shrink-0 mt-0.5" size={13} />
                        <span className={plan.highlight ? 'text-slate-300' : 'text-slate-600'}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => triggerDirectSponsorship(plan.amount, `${plan.name} Sustaining Partner`, true)}
                  className={`w-full py-3.5 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center ${
                    plan.highlight
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold'
                      : highContrast
                        ? 'bg-white text-black'
                        : 'bg-emerald-900 hover:bg-emerald-800 text-white'
                  }`}
                >
                  SELECT PLAN
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 7: CORPORATE CSR BANNER */}
      <section className="relative w-full py-24 md:py-28 bg-slate-950 text-white text-center overflow-hidden px-4" id="corporate-giving">
        <div className="absolute inset-0 z-0 opacity-25 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center mix-blend-overlay scale-102"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-10" />

        <div className="relative z-20 max-w-4xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-amber-400/10 text-amber-400 border border-amber-400/30">
            <Building2 size={11} />
            MCA CSR-1 REGISTERED PATHWAYS
          </span>

          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
            Corporate CSR Partnerships
          </h2>

          <p className="text-slate-300 text-xs md:text-sm lg:text-base max-w-2xl mx-auto leading-relaxed">
            Collaborate with Raita Mitra Social Trust to configure measurable, compliance-vetted CSR and ESG initiatives. We coordinate with internal board authorities to deliver deep water tables, solar drip setups, and digital school infrastructure.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => {
                triggerDirectSponsorship(150000, "Corporate CSR Solar Adopt Tier");
              }}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-full transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-400/10"
            >
              <span>Adopt a Solar Pump Hub (₹1.5L)</span>
              <ArrowRight size={13} />
            </button>
            <button 
              onClick={() => {
                triggerDirectSponsorship(300000, "Corporate CSR IT Lab Adopt Tier");
              }}
              className="px-6 py-3.5 bg-slate-900 border border-slate-700 hover:border-slate-500 text-white text-xs font-bold rounded-full transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Adopt a Computer IT Lab (₹3L)</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 8: CAMPAIGNS PROGRESS SECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto" id="campaigns-progress">
        <div className="space-y-12">
          
          <div className="text-left space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-500 font-bold font-mono">ONGOING CAUSES</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${highContrast ? 'text-white' : 'text-slate-900'}`}>
              Current Active Campaigns
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-sans max-w-2xl">
              Support specific micro-campaigns running actively across remote state villages in northern districts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACTIVE_CAMPAIGNS.map((camp) => {
              const progressPercent = Math.min(100, Math.floor((camp.raised / camp.target) * 100));
              return (
                <div 
                  key={camp.id}
                  className={`rounded-3xl border overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 ${
                    highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={camp.image} 
                      alt={camp.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-900/90 text-[8px] font-mono font-bold text-amber-400 uppercase border border-amber-400/20">
                      {camp.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2 text-left">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{camp.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-sans line-clamp-2">{camp.desc}</p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400">
                        <span>{progressPercent}% Funded</span>
                        <span>{camp.donors} Donors</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs font-mono font-bold pt-1">
                        <span className="text-emerald-700">₹{camp.raised.toLocaleString('en-IN')}</span>
                        <span className="text-slate-400">Target ₹{(camp.target / 100000).toFixed(0)}L</span>
                      </div>
                    </div>

                    <button
                      onClick={() => triggerDirectSponsorship(5000, camp.title)}
                      className={`w-full py-2.5 text-xs font-bold rounded-xl text-center cursor-pointer transition-colors ${
                        highContrast 
                          ? 'bg-white text-black' 
                          : 'bg-emerald-900 hover:bg-emerald-800 text-white'
                      }`}
                    >
                      CONTRIBUTE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 9: BENEFICIARY STORIES */}
      <section className="py-20 px-4 bg-slate-900 text-white" id="beneficiary-stories">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">MUTUAL TRANSFORMATION</span>
            <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight text-white">
              Lives Changed Through Your Support
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto">
              Real-world accounts of farmers, dairy coordinators, and high school children supported directly by donor assets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Story Details (5 cols) */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="inline-flex px-3 py-1 rounded bg-amber-400/10 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                {BENEFICIARY_STORIES[activeStoryIdx].title}
              </span>

              <h3 className="text-2xl md:text-3xl font-display font-black text-white leading-tight">
                {BENEFICIARY_STORIES[activeStoryIdx].name}
              </h3>
              
              <p className="text-xs font-mono text-emerald-400">
                📍 {BENEFICIARY_STORIES[activeStoryIdx].location} • 📈 {BENEFICIARY_STORIES[activeStoryIdx].metric}
              </p>

              <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 relative shadow-inner">
                <span className="text-6xl font-serif text-slate-800 absolute top-2 left-4">&ldquo;</span>
                <p className="text-xs text-slate-300 leading-relaxed italic relative z-10 font-sans">
                  {BENEFICIARY_STORIES[activeStoryIdx].quote}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {BENEFICIARY_STORIES[activeStoryIdx].tags.map((tag, tIdx) => (
                  <span key={tIdx} className="px-2.5 py-1 rounded bg-slate-800 text-[10px] font-mono text-slate-400">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Selector Tabs */}
              <div className="flex items-center gap-3 pt-6 border-t border-slate-800">
                {BENEFICIARY_STORIES.map((story, sIdx) => (
                  <button
                    key={story.id}
                    onClick={() => {
                      setActiveStoryIdx(sIdx);
                      setIsVideoPlaying(false);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeStoryIdx === sIdx
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Story {sIdx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Video / Picture Showcase (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
                <AnimatePresence mode="wait">
                  {!isVideoPlaying ? (
                    <motion.div
                      key="photo"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                    >
                      <img 
                        src={BENEFICIARY_STORIES[activeStoryIdx].image} 
                        alt={BENEFICIARY_STORIES[activeStoryIdx].name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply" />
                      
                      {/* Play Simulated Video button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                          onClick={() => setIsVideoPlaying(true)}
                          className="w-16 h-16 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center transition-transform hover:scale-105 shadow-xl animate-pulse cursor-pointer"
                        >
                          <span className="ml-1 text-xs font-mono font-extrabold tracking-wider">PLAY</span>
                        </button>
                      </div>

                      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-mono text-white bg-slate-950/80 rounded-full px-3 py-1.5 backdrop-blur-sm">
                        <Clock size={12} className="text-amber-400" />
                        <span>Documentary Duration: {BENEFICIARY_STORIES[activeStoryIdx].videoDuration}</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col justify-between p-6"
                    >
                      {/* Simulated Video Player UI */}
                      <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                        <span>▶ Playing RMST Documentary</span>
                        <button 
                          onClick={() => setIsVideoPlaying(false)}
                          className="px-2 py-0.5 bg-slate-800 rounded hover:text-white"
                        >
                          Exit Video
                        </button>
                      </div>

                      {/* Video Center Visual */}
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin mx-auto" />
                        <p className="text-xs font-mono text-slate-300">Simulating High-Definition Stream...</p>
                        <p className="text-[10px] font-mono text-slate-500">Audio Track: &quot;Rural Self-Reliance Voices v3&quot;</p>
                      </div>

                      {/* Progress Bar controls */}
                      <div className="space-y-2">
                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 w-1/3 animate-pulse" />
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-slate-500">
                          <span>01:12 / {BENEFICIARY_STORIES[activeStoryIdx].videoDuration}</span>
                          <span className="flex items-center gap-1">
                            <Volume2 size={10} /> 
                            <span>Stereo Audio</span>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 10: TRUST & COMPLIANCE BADGES */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200/50" id="trust-exemption">
        <div className="max-w-7xl mx-auto space-y-8 text-center">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 font-bold">GOVERNMENT APPROVED</span>
            <h3 className={`text-base font-bold font-display uppercase ${highContrast ? 'text-white' : 'text-slate-900'}`}>
              Trust, Security & statutory Compliance
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: " NGO Darpan Verified", desc: "Registered under statutory niti aayog directories." },
              { id: "MCA CSR-1 Approved", desc: "Statutory company partnership certification." },
              { id: "12A Permanent Exemption", desc: "Registered social welfare trust validation." },
              { id: "80G Exemption Receipt", desc: "50% direct tax benefits for Indian citizens." }
            ].map((item, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-2xl border text-center space-y-2 ${
                  highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 rounded-full inline-flex">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-white uppercase font-mono tracking-tight">{item.id}</h4>
                <p className="text-[10px] text-slate-400 font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: FAQ ACCORDION SECTION */}
      <section className="py-20 px-4 max-w-4xl mx-auto" id="faqs-accordion">
        <div className="space-y-12 text-left">
          
          <div className="space-y-2 text-center">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 font-bold">CLEAR ANSWERS</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl text-center ${highContrast ? 'text-white' : 'text-slate-900'}`}>
              Frequently Asked Questions
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto text-center">
              Have questions regarding tax exemptions, fund tracking, or global giving? Consult our directory.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    isExpanded 
                      ? highContrast ? 'border-amber-400' : 'bg-slate-50 border-emerald-900/20'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full p-5 flex items-center justify-between text-left text-xs font-bold text-slate-800 dark:text-white font-sans focus:outline-none cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-emerald-700 font-mono text-sm">
                      {isExpanded ? '[ - ]' : '[ + ]'}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-xs text-slate-500 font-sans leading-relaxed border-t border-slate-100">
                          {faq.a}
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

      {/* SECTION 12: DONOR TESTIMONIALS (GLASS CARDS) */}
      <section className="py-20 px-4 bg-slate-900 text-white" id="testimonials">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">PARTNER RECOGNITION</span>
            <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight text-white">
              Sponsor Voices
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto">
              Read how individual patrons, HNIs, and corporate ESG teams experience collaboration with Raita Mitra Social Trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DONOR_TESTIMONIALS.map((test) => (
              <div 
                key={test.id}
                className="p-8 rounded-3xl bg-slate-950/85 border border-slate-800 text-left space-y-5 flex flex-col justify-between relative"
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-current" />)}
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed italic">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <img 
                    src={test.image} 
                    alt={test.name} 
                    className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{test.name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 13: SUPPORTERS INFINITE LOGO SLIDER */}
      <section className="py-12 bg-white dark:bg-black border-t border-slate-200/50 overflow-hidden" id="supporters-wall">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <p className="text-center text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">
            SUPPORTED & VETTED BY INSTITUTIONAL PHILANTHROPIES
          </p>
          
          <div className="relative w-full flex items-center overflow-hidden py-4">
            {/* Double duplicate list to support clean seamless infinite CSS scrolling mock */}
            <div className="flex gap-12 shrink-0 animate-marquee whitespace-nowrap min-w-full justify-around items-center">
              {SUPPORTER_LOGOS.map((logo, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300 dark:text-zinc-700 hover:text-emerald-700 transition-colors font-sans">
                  <span className="text-xs font-mono font-black tracking-widest border border-slate-300 dark:border-zinc-800 rounded px-2.5 py-1">
                    {logo.logoText}
                  </span>
                  <span className="text-xs font-extrabold uppercase text-[11px] font-mono tracking-wider">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 15: RESOURCE DOWNLOAD CENTER */}
      <section className="py-20 px-4 max-w-7xl mx-auto text-center border-t border-slate-200/50" id="download-resources">
        <div className="space-y-12">
          
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 font-bold font-mono">PUBLIC LEDGER RESOURCE</span>
            <h2 className={`font-display font-black text-3xl tracking-tight ${highContrast ? 'text-white' : 'text-slate-900'}`}>
              Trust Resources & Compliance Publications
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto">
              Download statutory MCA filings, audited program results, brand guidelines, and direct 80G guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: "CSR Brochure 2026", desc: "Complete aligned rural program guidelines in northern districts.", size: "4.5 MB" },
              { name: "Annual Audit Report 2025", desc: "Detailed verified programmatic cash allocation maps.", size: "3.2 MB" },
              { name: "80G NGO Tax Certificate", desc: "Official direct board exemptions verified in Karnataka.", size: "1.9 MB" },
              { name: "Trust Brand Assets Kit", desc: "Official typography guidelines, imagery and logos.", size: "2.1 MB" }
            ].map((res, idx) => {
              const isThisDownloading = downloadingDoc === res.name;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border p-6 flex flex-col justify-between text-left space-y-4 ${
                    highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="space-y-1">
                    <FileText size={24} className="text-emerald-700 mb-2" />
                    <h4 className="text-xs font-extrabold text-slate-800 dark:text-white line-clamp-1">{res.name}</h4>
                    <p className="text-[10px] text-slate-400 font-sans leading-relaxed line-clamp-2">{res.desc}</p>
                    <span className="text-[9px] font-mono text-slate-400 block pt-1">File Size: {res.size}</span>
                  </div>

                  <div className="space-y-2">
                    {isThisDownloading && (
                      <div className="space-y-1">
                        <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                          <div className="bg-emerald-600 h-full transition-all duration-100" style={{ width: `${downloadProgress}%` }} />
                        </div>
                        <p className="text-[8px] font-mono text-emerald-600 text-right">Decrypting {downloadProgress}%</p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => startDownloadSimulation(res.name)}
                      disabled={!!downloadingDoc}
                      className={`w-full py-2.5 text-xs font-bold font-mono rounded-xl flex items-center justify-center gap-1.5 cursor-pointer ${
                        downloadingDoc ? 'opacity-50 cursor-not-allowed' : ''
                      } ${
                        highContrast ? 'bg-white text-black' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Download size={12} />
                      <span>DOWNLOAD</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 14: INTERACTIVE CHECKOUT MODAL BACKDROP & DIALOG */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border text-left flex flex-col justify-between max-h-[90vh] ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              
              {/* Modal Top Header */}
              <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-extrabold text-amber-500 uppercase tracking-widest">
                    SECURE TRANSACTION MODULE
                  </span>
                  <h3 className="text-base font-extrabold font-display text-slate-950 dark:text-white flex items-center gap-1.5 mt-0.5">
                    <Heart size={16} className="text-rose-500 fill-current animate-pulse" />
                    <span>Allocating: ₹{amount.toLocaleString('en-IN')} {isRecurring ? 'Monthly' : 'One-Time'}</span>
                  </h3>
                </div>
                <button 
                  onClick={() => setIsCheckoutOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Progress Steps Header */}
              <div className="bg-slate-50 dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800 py-3 px-6 grid grid-cols-4 gap-2 text-center text-[10px] font-mono font-bold text-slate-400">
                <span className={checkoutStep === 1 ? 'text-emerald-700' : checkoutStep > 1 ? 'text-emerald-600' : ''}>1. CONTACT</span>
                <span className={checkoutStep === 2 ? 'text-emerald-700' : checkoutStep > 2 ? 'text-emerald-600' : ''}>2. AUDIT/PAN</span>
                <span className={checkoutStep === 3 ? 'text-emerald-700' : checkoutStep > 3 ? 'text-emerald-600' : ''}>3. SANDBOX</span>
                <span className={checkoutStep === 4 ? 'text-emerald-700' : ''}>4. CERTIFICATE</span>
              </div>

              {/* Modal Core Viewport */}
              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                
                {/* STEP 1: CONTACT INFORMATION */}
                {checkoutStep === 1 && (
                  <div className="space-y-4 text-xs">
                    <div className="p-3 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 text-slate-500 text-[11px] leading-normal">
                      🛡️ Raita Mitra complies with statutory MCA reporting. The details configured below are utilized to register your 80G tax benefit ledger.
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label htmlFor="checkout-donor-name" className="block font-mono font-bold text-[10px] text-slate-400 uppercase mb-1">Donor Full Name</label>
                        <input
                          id="checkout-donor-name"
                          type="text"
                          placeholder="e.g. Anand Mahindra / Dr. Asha S."
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-950 focus:outline-none text-slate-800 text-xs"
                        />
                        {formErrors.name && <p className="text-[10px] text-rose-500 font-mono mt-1">{formErrors.name}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="checkout-donor-email" className="block font-mono font-bold text-[10px] text-slate-400 uppercase mb-1">Active Email</label>
                          <input
                            id="checkout-donor-email"
                            type="email"
                            placeholder="anand@mahindra.com"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-950 focus:outline-none text-slate-800 text-xs"
                          />
                          {formErrors.email && <p className="text-[10px] text-rose-500 font-mono mt-1">{formErrors.email}</p>}
                        </div>
                        <div>
                          <label htmlFor="checkout-donor-phone" className="block font-mono font-bold text-[10px] text-slate-400 uppercase mb-1">Mobile No</label>
                          <input
                            id="checkout-donor-phone"
                            type="tel"
                            placeholder="e.g. 9876543210"
                            value={donorPhone}
                            onChange={(e) => setDonorPhone(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-950 focus:outline-none text-slate-800 text-xs"
                          />
                          {formErrors.phone && <p className="text-[10px] text-rose-500 font-mono mt-1">{formErrors.phone}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="checkout-donor-country" className="block font-mono font-bold text-[10px] text-slate-400 uppercase mb-1">Country</label>
                          <select
                            id="checkout-donor-country"
                            value={donorCountry}
                            onChange={(e) => setDonorCountry(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-700 text-xs focus:ring-1 focus:ring-emerald-950 focus:outline-none"
                          >
                            <option value="India">India</option>
                            <option value="United States">United States (NRI)</option>
                            <option value="United Kingdom">United Kingdom (NRI)</option>
                            <option value="Singapore">Singapore (NRI)</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="checkout-donor-address" className="block font-mono font-bold text-[10px] text-slate-400 uppercase mb-1">Billing Address</label>
                          <input
                            id="checkout-donor-address"
                            type="text"
                            placeholder="e.g. MG Road, Bengaluru"
                            value={donorAddress}
                            onChange={(e) => setDonorAddress(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-950 focus:outline-none text-slate-800 text-xs"
                          />
                          {formErrors.address && <p className="text-[10px] text-rose-500 font-mono mt-1">{formErrors.address}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: TAX EXEMPTION & PURPOSE */}
                {checkoutStep === 2 && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <label htmlFor="checkout-donor-pan" className="block font-mono font-bold text-[10px] text-slate-400 uppercase mb-1">
                        Income Tax PAN Number (India citizens)
                      </label>
                      <input
                        id="checkout-donor-pan"
                        type="text"
                        placeholder="e.g. ABCDE1234F"
                        value={donorPan}
                        onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-950 focus:outline-none text-slate-800 text-xs font-mono tracking-wider"
                      />
                      <span className="text-[9px] text-slate-400 font-mono mt-1 block">
                        💡 Optional. PAN must exactly match registered Income Tax filings to map 80G automatic credit.
                      </span>
                      {formErrors.pan && <p className="text-[10px] text-rose-500 font-mono mt-1">{formErrors.pan}</p>}
                    </div>

                    <div>
                      <label htmlFor="checkout-earmarked-purpose" className="block font-mono font-bold text-[10px] text-slate-400 uppercase mb-1">
                        Earmarked Program Purpose
                      </label>
                      <select
                        id="checkout-earmarked-purpose"
                        value={earmarkedPurpose}
                        onChange={(e) => setEarmarkedPurpose(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-700 text-xs focus:ring-1 focus:ring-emerald-950 focus:outline-none"
                      >
                        <option value="General Unrestricted Core Funds">General Unrestricted Core Trust Allocation</option>
                        <option value="Agricultural Solar Irrigation grids">Agricultural Solar Drip Micro-irrigation</option>
                        <option value="Girls STEM High school Coding labs">Girls High School Python & Scratch Software literacy</option>
                        <option value="Women Dairy Cooperatives">Women Dairy cooperative fat-testers and chilling bulk tanks</option>
                        <option value="Forest Village Pediatric screen camps">Forest Fringe Pediatric Diagnostics & Millet nutrition distribution</option>
                      </select>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 text-slate-500 text-[11px] leading-relaxed">
                      🤝 <strong>Earmarking Protocol:</strong> Unrestricted giving allows the Board of Trustees to allocate cash to sudden forest-fringe drought needs, while earmarked funds are strictly mapped to material assets of that exact program directory.
                    </div>
                  </div>
                )}

                {/* STEP 3: SANDBOX PAYMENT SIMULATOR */}
                {checkoutStep === 3 && (
                  <div className="space-y-4 text-xs">
                    
                    {simulatedGatewayStep === 'selection' && (
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                          <p className="text-xs font-mono font-bold text-emerald-800">
                            SANDBOX MODE ACTIVE • ZERO REAL CASH DETACHED
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => setPaymentGateway('upi')}
                            className={`p-4 border rounded-2xl text-center space-y-1 cursor-pointer transition-all ${
                              paymentGateway === 'upi' ? 'border-emerald-600 bg-slate-50' : 'border-slate-200'
                            }`}
                          >
                            <QrCode size={18} className="mx-auto text-slate-700" />
                            <h4 className="text-xs font-bold text-slate-800">Razorpay UPI QR</h4>
                          </button>
                          <button
                            onClick={() => setPaymentGateway('card')}
                            className={`p-4 border rounded-2xl text-center space-y-1 cursor-pointer transition-all ${
                              paymentGateway === 'card' ? 'border-emerald-600 bg-slate-50' : 'border-slate-200'
                            }`}
                          >
                            <CreditCard size={18} className="mx-auto text-slate-700" />
                            <h4 className="text-xs font-bold text-slate-800">Stripe Card</h4>
                          </button>
                        </div>

                        {paymentGateway === 'upi' && (
                          <div className="space-y-3">
                            <div>
                              <label htmlFor="upi-vpa" className="block font-mono font-bold text-[10px] text-slate-400 uppercase mb-1">Enter UPI VPA ID</label>
                              <input
                                id="upi-vpa"
                                type="text"
                                placeholder="e.g. ramesh@okaxis"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-950"
                              />
                            </div>
                            
                            <div className="p-4 bg-slate-100 rounded-2xl flex items-center gap-4 border">
                              <QrCode size={48} className="text-slate-800 shrink-0" />
                              <p className="text-[10px] text-slate-500 font-sans leading-normal">
                                💡 <strong>UPI Sandbox Generation:</strong> Clicking the trigger button below will simulate a dynamic high-definition checkout QR and dispatch an approval alert to your simulated banking node.
                              </p>
                            </div>
                          </div>
                        )}

                        {paymentGateway === 'card' && (
                          <div className="space-y-3">
                            <div>
                              <label htmlFor="card-number" className="block font-mono font-bold text-[10px] text-slate-400 uppercase mb-1">Card Number</label>
                              <input
                                id="card-number"
                                type="text"
                                placeholder="4111 2222 3333 4444 (Simulated Stripe)"
                                value={cardNo}
                                onChange={(e) => setCardNo(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-950"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label htmlFor="card-expiry-date" className="block font-mono font-bold text-[10px] text-slate-400 uppercase mb-1">Expiry Date</label>
                                <input
                                  id="card-expiry-date"
                                  type="text"
                                  placeholder="MM/YY"
                                  value={cardExpiry}
                                  onChange={(e) => setCardExpiry(e.target.value)}
                                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-950"
                                />
                              </div>
                              <div>
                                <label htmlFor="card-cvv-no" className="block font-mono font-bold text-[10px] text-slate-400 uppercase mb-1">CVV</label>
                                <input
                                  id="card-cvv-no"
                                  type="password"
                                  placeholder="123"
                                  value={cardCvv}
                                  onChange={(e) => setCardCvv(e.target.value)}
                                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-950"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <button
                          onClick={startSimulatedTransaction}
                          className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white font-extrabold rounded-xl transition-all shadow cursor-pointer text-center"
                        >
                          INITIALIZE SIMULATED CHECKOUT (₹{amount})
                        </button>
                      </div>
                    )}

                    {simulatedGatewayStep === 'processing' && (
                      <div className="text-center py-12 space-y-4">
                        <div className="w-16 h-16 rounded-full border-4 border-emerald-700 border-t-transparent animate-spin mx-auto" />
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase font-mono tracking-wider animate-pulse">
                          Securing SSL Node Handshakes...
                        </h4>
                        <p className="text-[10px] text-slate-400 font-mono">
                          Gateway Reference: {transactionId || "TXN_PENDING"} • Encrypting Handshakes
                        </p>
                      </div>
                    )}

                    {simulatedGatewayStep === 'otp' && (
                      <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border text-center">
                        <div className="p-3 bg-blue-100 text-blue-800 rounded-full inline-flex">
                          <Smartphone size={24} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase font-mono tracking-wider">
                          Enter Simulated Bank OTP
                        </h4>
                        <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                          An active sandbox SMS validation OTP alert is triggered. Enter any four numbers below to bypass CA ledger constraints.
                        </p>
                        
                        <div className="max-w-xs mx-auto">
                          <input
                            type="text"
                            placeholder="e.g. 1234"
                            value={simulatedOtp}
                            onChange={(e) => setSimulatedOtp(e.target.value)}
                            className="w-full px-4 py-3 border rounded-xl text-center font-mono tracking-widest text-lg font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-950"
                          />
                        </div>

                        <button
                          onClick={verifySimulatedOtp}
                          className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl cursor-pointer"
                        >
                          SUBMIT SECURE PASSWORD
                        </button>
                      </div>
                    )}

                  </div>
                )}

                {/* STEP 4: PRINTABLE EXEMPTION CERTIFICATE */}
                {checkoutStep === 4 && (
                  <div className="space-y-6">
                    
                    {/* Exemption Certificate Frame */}
                    <div 
                      className="p-8 border-4 border-double border-emerald-900 bg-white text-slate-900 rounded-2xl relative shadow-inner text-left font-serif space-y-6"
                      id="printable-80g-certificate"
                    >
                      {/* Trust Seal */}
                      <div className="absolute top-4 right-4 text-emerald-800/20 font-mono text-center select-none border-4 border-dashed border-emerald-800/20 p-2 transform rotate-12">
                        <span className="text-[9px] font-bold block">80G CERTIFIED</span>
                        <span className="text-lg font-black block">RMST SEAL</span>
                      </div>

                      {/* Header */}
                      <div className="text-center space-y-2 pb-4 border-b-2 border-emerald-950/20">
                        <h4 className="text-base font-extrabold uppercase font-sans text-emerald-900 tracking-wide">
                          Raita Mitra Social Trust (R)
                        </h4>
                        <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest leading-none">
                          Registered Office: Dharwad Taluk, Dharwad, Karnataka, India
                        </p>
                        <p className="text-[8px] font-mono text-slate-400">
                          NGO Darpan: KA/2024/0410 • CSR-1 ID: CSR000842 • 12A Ref: AAA-TR-842
                        </p>
                        <p className="text-[10px] font-bold underline font-sans tracking-widest uppercase text-slate-800 pt-1">
                          Official 80G Donation Receipt & Exemption Certificate
                        </p>
                      </div>

                      {/* Certificate Grid body */}
                      <div className="grid grid-cols-2 gap-4 text-[10px] leading-relaxed">
                        <div>
                          <span className="text-slate-400 block font-sans">Certificate Reference No:</span>
                          <strong className="text-slate-800 font-mono">{certificateId}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-sans">Date of Handshake Receipt:</span>
                          <strong className="text-slate-800 font-mono">{new Date().toLocaleDateString('en-IN')}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-sans">Transaction Reference ID:</span>
                          <strong className="text-slate-800 font-mono">{transactionId}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-sans">Earmarked Purpose:</span>
                          <strong className="text-slate-800 font-sans">{earmarkedPurpose}</strong>
                        </div>
                      </div>

                      <div className="border-t border-b border-dashed border-slate-200 py-3 text-[11px]">
                        <p className="text-slate-700">
                          This certifies that the sum of <strong className="text-emerald-950">₹{amount.toLocaleString('en-IN')} INR</strong> was securely processed from <strong className="text-slate-900">{donorName}</strong> (Active Email: <em>{donorEmail}</em>) of billing address <em>{donorAddress}</em>.
                        </p>
                        {donorPan && (
                          <p className="pt-1.5 text-slate-700">
                            Permanent Account Number (PAN): <strong className="font-mono text-slate-900 uppercase">{donorPan}</strong>. This contribution is eligible for a 50% tax exemption under Section 80G of the Income Tax Act, 1961.
                          </p>
                        )}
                      </div>

                      {/* Signatories Stamp and Print action */}
                      <div className="flex justify-between items-end pt-4">
                        <div className="text-[9px] text-slate-400 font-sans">
                          <p>✓ Automated CA-Vetted Audit Log</p>
                          <p>✓ Board Seal Certified Electronic File</p>
                        </div>
                        
                        <div className="text-center font-sans">
                          <div className="h-10 w-24 bg-[url('https://images.unsplash.com/photo-1595974482597-4b8da8879bc5')] bg-cover mix-blend-multiply opacity-50 grayscale border-b border-emerald-950 mx-auto" />
                          <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500 block pt-1">
                            Board Signatory
                          </span>
                        </div>
                      </div>

                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => window.print()}
                        className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow"
                      >
                        <Printer size={13} />
                        <span>PRINT CERTIFICATE</span>
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`Certificate No: ${certificateId}\nDonor: ${donorName}\nAmount: ₹${amount}\nTransaction: ${transactionId}`);
                          alert("Exemption Certificate metadata successfully copied to your device clipboard!");
                        }}
                        className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer border"
                      >
                        <Copy size={13} />
                        <span>COPY REF</span>
                      </button>
                    </div>

                  </div>
                )}

              </div>

              {/* Modal Bottom Actions Bar */}
              <div className="p-6 border-t border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 flex items-center justify-between">
                <div>
                  {checkoutStep < 3 && (
                    <p className="text-[10px] text-slate-400 font-sans leading-none">
                      🔒 Sandbox transaction: Encrypted bank handshakes
                    </p>
                  )}
                  {checkoutStep === 3 && (
                    <button 
                      onClick={() => setCheckoutStep(2)}
                      className="text-xs font-bold font-mono text-slate-500 hover:underline cursor-pointer"
                    >
                      [ Return to Step 2 ]
                    </button>
                  )}
                  {checkoutStep === 4 && (
                    <p className="text-[10px] text-emerald-600 font-mono font-bold">
                      ✓ Sandbox completed successfully
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  {checkoutStep === 1 && (
                    <button
                      onClick={handleNextStep}
                      className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      CONTINUE TO PAN
                    </button>
                  )}
                  {checkoutStep === 2 && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCheckoutStep(1)}
                        className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNextStep}
                        className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                      >
                        PROCEED TO PAY
                      </button>
                    </div>
                  )}
                  {checkoutStep === 4 && (
                    <button
                      onClick={() => {
                        setIsCheckoutOpen(false);
                        setCheckoutStep(1);
                        setDonorName('');
                        setDonorEmail('');
                        setDonorPhone('');
                        setDonorPan('');
                      }}
                      className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      DONE
                    </button>
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
