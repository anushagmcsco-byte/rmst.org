import React, { useState, useEffect, useRef } from 'react';
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
  Building2, 
  Calendar, 
  ChevronRight, 
  MessageSquare, 
  Check, 
  Sparkles, 
  Globe, 
  X, 
  HelpCircle, 
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
  Copy,
  Mail,
  Phone,
  Search,
  Filter,
  Users2,
  Trash2,
  Share2,
  Send,
  UserCheck,
  Bell,
  Sliders,
  ChevronDown
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line 
} from 'recharts';

interface DonorPortalProps {
  highContrast: boolean;
}

// ============================================================================
// AUTHORITATIVE CORE DATA
// ============================================================================

const IMPACT_METRICS = [
  { name: 'Lives Impacted', value: 8750, color: '#059669', change: '+12% this year' },
  { name: 'Projects Sustained', value: 34, color: '#d97706', change: '8 active clusters' },
  { name: 'District Coverage', value: 12, color: '#0d9488', change: 'North Karnataka' },
  { name: 'Tax Benefit Managed', value: '50% Off', color: '#4f46e5', change: '80G Registered' }
];

const DONATION_HISTORY_DATA = [
  { id: 'tx_101', date: '2026-06-18', amount: 15000, method: 'Stripe Card', campaign: 'Girls STEM Software Literacy', status: 'Cleared', receiptId: 'RMST/80G/2026/1045' },
  { id: 'tx_102', date: '2026-04-12', amount: 5000, method: 'Razorpay UPI', campaign: 'General Unrestricted Core Funds', status: 'Cleared', receiptId: 'RMST/80G/2026/0920' },
  { id: 'tx_103', date: '2026-01-05', amount: 10000, method: 'PayPal (NRI)', campaign: 'Sustainable Agriculture Grids', status: 'Cleared', receiptId: 'RMST/80G/2026/0512' },
  { id: 'tx_104', date: '2025-10-22', amount: 2500, method: 'Razorpay UPI', campaign: 'Women Dairy Cooperatives', status: 'Cleared', receiptId: 'RMST/80G/2025/1190' },
  { id: 'tx_105', date: '2025-07-06', amount: 5000, method: 'Stripe Card', campaign: 'General Unrestricted Core Funds', status: 'Cleared', receiptId: 'RMST/80G/2025/0842' },
];

const RECOMMENDED_PROGRAMS = [
  { 
    id: 'rp_1',
    category: 'Agriculture',
    title: 'Solar-Powered Drip Irrigation Grids',
    description: 'Provide dryland farmers with soil humic diagnostics, bio-rejuvenation seed kits, and solar water pumps.',
    impact: 'Saves 60% input costs, increases yield by 35% for rural farm families.',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=400',
    tags: ['Regenerative Farming', 'Water Action']
  },
  { 
    id: 'rp_2',
    category: 'Women Empowerment',
    title: 'Women Dairy Cooperative Digital Scales',
    description: 'Deploy computerized fat testing equipment and solar cold-chains to eliminate middleman margins.',
    impact: 'Secures ₹12,000 steady monthly cashflow for rural women collectives.',
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=400',
    tags: ['Micro-Enterprises', 'Direct Markets']
  },
  { 
    id: 'rp_3',
    category: 'Education & AI Skills',
    title: 'Solar High School STEM & Python Labs',
    description: 'Equip village state schools with off-grid touchscreen workstations, smart tutors, and coding curriculums.',
    impact: 'Delivers software literacy & robotics modules to 850+ rural students.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400',
    tags: ['STEM Tools', 'Coding Camps']
  },
  { 
    id: 'rp_4',
    category: 'Health & Nutrition',
    title: 'Millet Distribution & Pediatric Screenings',
    description: 'Support pediatric medical vans providing micro-nutrient kits and anemia diagnostic tests.',
    impact: 'Reaches 2,200+ kids and establishes backyard organic food gardens.',
    image: 'https://images.unsplash.com/photo-1504813184591-01552fffd3be?auto=format&fit=crop&q=80&w=400',
    tags: ['Eradicate Malnutrition', 'Wellness']
  },
  { 
    id: 'rp_5',
    category: 'Climate Action',
    title: 'Afforestation & Linear Watershed Bunds',
    description: 'Construct soil contour bunds and plant native windbreak trees to recharge depleted aquifers.',
    impact: 'Prevents soil erosion while restoring local microclimates.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400',
    tags: ['Bio-Sinks', 'Aquifer Recharge']
  },
  { 
    id: 'rp_6',
    category: 'Livelihood Development',
    title: 'Youth Digital Mentors & Tech Guilds',
    description: 'Certify rural high school graduates in tech operations and digital tools to secure remote jobs.',
    impact: 'Develops career readiness and local tutoring income circles.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400',
    tags: ['Skills Training', 'Rural Careers']
  }
];

const RECURRING_PLANS = [
  { id: 'rec_m', name: 'Monthly Giving', amount: 1500, period: 'Month', desc: 'Sustains 1 organic farm soil kit and bio-seeds month over month.', benefits: ['Instant 80G tax receipt', 'Quarterly soil carbon metrics dashboard', 'Sponsor wall recognition'] },
  { id: 'rec_q', name: 'Quarterly Giving', amount: 4500, period: 'Quarter', desc: 'Enables 1 solar smart workstation for state schoolgirls.', benefits: ['Complete bi-annual audited statements', 'Invitations to virtual farmer roundtable audits', 'Detailed programmatic ledger'] },
  { id: 'rec_a', name: 'Annual Patron', amount: 18000, period: 'Year', desc: 'Establishes a village dairy diagnostic booth with solar cold storage.', benefits: ['Dedicated RMST relationship manager', 'Signed plaque of appreciation', 'Custom ESG performance metrics report'] }
];

const NOTIFICATION_FEED = [
  { id: 'n_1', title: 'New Impact Story Published', desc: 'Read how Mallappa Gowda achieved 3x crop yields using sponsored solar drip kits.', time: '2 hours ago', unread: true },
  { id: 'n_2', title: 'FY 25-26 Tax Receipts Available', desc: 'Your comprehensive annual giving audited summary is now certified and ready for download.', time: '1 day ago', unread: true },
  { id: 'n_3', title: 'Campaign Accomplished!', desc: 'The Savanur Women Dairy Cooperative has met its target of ₹15,00,000 for automatic fat analyzers.', time: '3 days ago', unread: false },
  { id: 'n_4', title: 'Upcoming Stakeholder Briefing', desc: 'Join our board of trustees on Zoom on July 15th for the regional climate action review.', time: '1 week ago', unread: false }
];

const FAQ_ACCORDION = [
  { q: 'How do I download my official 80G tax receipts?', a: 'All receipts are compiled digitally by our CA-vetted tax platform instantly after transaction clearance. You can find them under the "Tax Receipts & 80G Documents" section below and download them as printable certificates.' },
  { q: 'Can I set up recurring automated giving?', a: 'Yes! Our monthly, quarterly, and annual subscription giving plans leverage Stripe Sandbox & Razorpay recurrent mandates. You can manage, upgrade, or cancel your plans directly via this secure portal anytime.' },
  { q: 'How is my donation distributed (Fund Utilization)?', a: 'Raita Mitra runs a strict zero-leakage financial model. Exactly 92% of donated funds are mapped directly to programmatic capital field assets (solar panels, seed formulations, labs). Only 8% is allocated to statutory audit, personnel, and compliance.' },
  { q: 'Can families or groups set up memorial giving?', a: 'Absolutely. Our "Family & Memorial Giving Circles" allow you to create collective contribution targets in honor of birthdays, anniversaries, or to establish dedicated legacy farm ponds.' },
  { q: 'Are international currency donations supported?', a: 'Yes, we are registered to accept international credit cards, global PayPal accounts, and direct NRI transfers. We strictly comply with foreign-exchange reporting regulations.' }
];

// ============================================================================
// COMPONENT RENDER
// ============================================================================

export default function DonorPortal({ highContrast }: DonorPortalProps) {
  // Session / Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [authMethod, setAuthMethod] = useState<'google' | 'email' | 'phone' | 'linkedin'>('email');
  const [authInput, setAuthInput] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpInput, setOtpInput] = useState<string>('');
  const [currentUser, setCurrentUser] = useState({
    name: 'Anusha Rao',
    email: 'anusha.gmcsco@gmail.com',
    phone: '+91 94812 34567',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    givingLevel: 'Silver Supporter',
    impactScore: 920,
    totalContributed: 37500
  });

  // UI state managers
  const [historySearch, setHistorySearch] = useState('');
  const [historyFilter, setHistoryFilter] = useState('All');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [recommendationPreference, setRecommendationPreference] = useState<string>('All');
  const [copiedTxn, setCopiedTxn] = useState<string | null>(null);

  // Simulated AI Assistant Chat States
  const [chatMessages, setChatMessages] = useState<any[]>([
    { id: '1', sender: 'ai', text: 'Namaskara! I am your AI Donor Assistant. How can I help you track your contributions, fetch tax certificates, or review recommended programs today?', time: '12:00 PM' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [aiTyping, setAiTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Corporate CSR Mode Switch
  const [isCorporateMode, setIsCorporateMode] = useState<boolean>(false);

  // Simulated download animations
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // 80G printable receipt state
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);

  // Recurring subscription configuration state
  const [sponsorshipAmount, setSponsorshipAmount] = useState<number>(1500);
  const [sponsorshipPlan, setSponsorshipPlan] = useState<string>('Monthly Giving');
  const [showSponsorshipModal, setShowSponsorshipModal] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<'plan' | 'payment' | 'done'>('plan');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  // Trigger scroll to chat end
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, aiTyping]);

  // Auth OTP generator simulation
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authInput.trim()) return;
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.trim()) {
      setIsLoggedIn(true);
    }
  };

  // Custom simulation for downloading resource
  const simulateDownload = (docName: string) => {
    if (downloadingDoc) return;
    setDownloadingDoc(docName);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadingDoc(null);
            alert(`Resource successfully compiled!\n"${docName}" has been checked for security signatures and exported to your download directory.`);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 100);
  };

  // Trigger copy transaction ID
  const copyTxId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedTxn(id);
    setTimeout(() => setCopiedTxn(null), 2000);
  };

  // AI assistant chat call
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { id: Date.now().toString(), sender: 'user', text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setAiTyping(true);

    try {
      // Connect directly to our /api/chat Express endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg].map(m => ({
            sender: m.sender === 'user' ? 'user' : 'model',
            text: m.text
          }))
        })
      });

      const data = await response.json();
      setAiTyping(false);
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.text || 'I apologize, but I could not connect to my knowledge systems. Please try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error('Error talking to AI Server:', err);
      // Fallback response if server fails or network is disconnected
      setAiTyping(false);
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `As your Raita Mitra Copilot, I checked your account profile:\n- **Total Contributions**: ₹${currentUser.totalContributed.toLocaleString('en-IN')}\n- **Sponsor Level**: ${currentUser.givingLevel}\n- **80G Status**: Fully Compliant\n\nIs there a specific tax receipt or program details you would like me to locate?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  };

  // Filter history list
  const filteredDonations = DONATION_HISTORY_DATA.filter(tx => {
    const matchesSearch = tx.campaign.toLowerCase().includes(historySearch.toLowerCase()) || 
                          tx.id.toLowerCase().includes(historySearch.toLowerCase());
    if (historyFilter === 'All') return matchesSearch;
    if (historyFilter === 'High Value') return matchesSearch && tx.amount >= 10000;
    if (historyFilter === 'Recurring') return matchesSearch && tx.campaign.includes('General');
    return matchesSearch;
  });

  // Recharts Data definitions
  const livesImpactedData = [
    { year: '2023', 'Agriculture': 1200, 'Education': 600, 'Women SHG': 400 },
    { year: '2024', 'Agriculture': 2500, 'Education': 1400, 'Women SHG': 950 },
    { year: '2025', 'Agriculture': 4100, 'Education': 2200, 'Women SHG': 1500 },
    { year: '2026', 'Agriculture': 5000, 'Education': 3000, 'Women SHG': 2500 }
  ];

  const districtUtilizationData = [
    { district: 'Dharwad', allocation: 1550000, color: '#0f766e' },
    { district: 'Haveri', allocation: 1250000, color: '#0d9488' },
    { district: 'Gadag', allocation: 920000, color: '#14b8a6' },
    { district: 'Belagavi', allocation: 680000, color: '#5eead4' }
  ];

  const allocationPieData = [
    { name: 'Programmatic Assets', value: 92, color: '#059669' },
    { name: 'Administrative/Audit', value: 8, color: '#f59e0b' }
  ];

  const recommendedFiltered = RECOMMENDED_PROGRAMS.filter(p => {
    if (recommendationPreference === 'All') return true;
    return p.category === recommendationPreference;
  });

  return (
    <div className={`w-full min-h-screen font-sans ${highContrast ? 'bg-black text-white' : 'bg-[#fcfbf9] text-slate-800'}`} id="donor-portal-experience">
      
      {/* SECTION 1: HERO IMPACT BANNER */}
      <section className="relative min-h-[50vh] flex flex-col justify-center items-center text-center px-4 py-20 bg-slate-950 text-white overflow-hidden">
        {/* Cinematic Backdrop Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=1600")' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-radial-at-t from-emerald-500/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Sparkles size={11} className="animate-pulse" />
            Vetted Transparency Platform
          </span>

          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white leading-tight">
            See The Difference <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              You Create
            </span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Track your contributions, measure real-time impact indicators, and download certified 80G tax summaries inside Raita Mitra's unified trust dashboard.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center pt-4">
            <button 
              onClick={() => {
                if (!isLoggedIn) {
                  document.getElementById('login-portal')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  document.getElementById('executive-dashboard')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 py-3 rounded-full text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all duration-300 shadow-lg shadow-emerald-500/10 flex items-center gap-2 tracking-wider cursor-pointer font-mono"
            >
              <Award size={14} />
              <span>ACCESS DASHBOARD</span>
            </button>
            <button 
              onClick={() => {
                document.getElementById('recurring-plans')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-full text-xs font-bold bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 transition-all duration-300 flex items-center gap-2 tracking-wider cursor-pointer font-mono"
            >
              <Heart size={14} className="text-rose-400 fill-current" />
              <span>SUPPORT A PROGRAM</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: AUTHENTICATION (SPLIT SCREEN SIMULATOR) */}
      <AnimatePresence>
        {!isLoggedIn && (
          <section className="py-16 px-4 max-w-7xl mx-auto" id="login-portal">
            <div className={`grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/60 shadow-xl'
            }`}>
              
              {/* Left Column: Visual/Story */}
              <div className="relative bg-slate-900 text-white p-10 flex flex-col justify-between overflow-hidden min-h-[400px]">
                <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800")' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-slate-900/90 to-transparent" />

                <div className="relative z-10 space-y-2">
                  <h3 className="text-xl font-display font-black text-amber-300">Raita Mitra Trust</h3>
                  <p className="text-xs text-slate-300 max-w-sm">
                    "Every rupee received by Raita Mitra is treated as a sacred trust, transformed fully into clean drinking water, software classrooms, or biological inputs."
                  </p>
                </div>

                <div className="relative z-10 border-t border-slate-800 pt-6 space-y-2">
                  <p className="text-xs italic text-slate-300">
                    "Having instant 80G tax receipt access and live project metrics on Haveri SHGs is the reason I support Raita Mitra quarterly."
                  </p>
                  <p className="text-[10px] font-mono text-emerald-400 font-bold">— Rajesh S., Sekhar Tech CSR</p>
                </div>
              </div>

              {/* Right Column: Dynamic Login Options */}
              <div className="p-8 md:p-12 flex flex-col justify-center text-left space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider">SECURE AUTHORIZATION</span>
                  <h2 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white">Secure Login</h2>
                  <p className="text-xs text-slate-400">Authenticate to view your custom giving timeline & download compliance certificates.</p>
                </div>

                {/* Login Method Toggle */}
                <div className="grid grid-cols-4 gap-2 bg-slate-100 p-1 rounded-xl text-xs font-mono">
                  {(['email', 'phone', 'google', 'linkedin'] as const).map(method => (
                    <button
                      key={method}
                      onClick={() => { setAuthMethod(method); setOtpSent(false); }}
                      className={`py-2 rounded-lg text-center font-bold capitalize transition-all cursor-pointer ${
                        authMethod === method ? 'bg-emerald-850 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                {/* Input Fields */}
                <form onSubmit={otpSent ? handleVerifyOtp : handleRequestOtp} className="space-y-4">
                  {authMethod === 'email' && (
                    <div>
                      <label htmlFor="auth-email-input" className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Donor Email Address</label>
                      <input
                        id="auth-email-input"
                        type="email"
                        required
                        disabled={otpSent}
                        placeholder="anusha.gmcsco@gmail.com"
                        value={authInput}
                        onChange={(e) => setAuthInput(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-950 focus:outline-none text-slate-850 text-xs font-mono"
                      />
                    </div>
                  )}

                  {authMethod === 'phone' && (
                    <div>
                      <label htmlFor="auth-phone-input" className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Mobile Number (OTP)</label>
                      <input
                        id="auth-phone-input"
                        type="tel"
                        required
                        disabled={otpSent}
                        placeholder="+91 94812 34567"
                        value={authInput}
                        onChange={(e) => setAuthInput(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-950 focus:outline-none text-slate-850 text-xs font-mono"
                      />
                    </div>
                  )}

                  {otpSent && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <label htmlFor="auth-otp-input" className="block text-[10px] font-mono font-bold text-slate-400 uppercase">One-Time Password (OTP)</label>
                      <input
                        id="auth-otp-input"
                        type="text"
                        required
                        maxLength={6}
                        placeholder="123456"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-950 focus:outline-none text-slate-850 text-center text-lg font-mono tracking-widest font-black"
                      />
                      <p className="text-[10px] text-slate-400 font-mono text-center">Enter any code to instantly bypass verification for demonstration.</p>
                    </motion.div>
                  )}

                  {(authMethod === 'google' || authMethod === 'linkedin') ? (
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => {
                          setAuthInput('authenticated_user@provider.com');
                          setIsLoggedIn(true);
                        }}
                        className="w-full py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-mono hover:bg-slate-100 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <UserCheck size={14} className="text-emerald-700" />
                        <span>Simulate {authMethod === 'google' ? 'Google' : 'LinkedIn'} Instant Auth Bypass</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-850 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs font-mono transition-all uppercase tracking-wider cursor-pointer"
                    >
                      {otpSent ? 'VERIFY OTP & LOG IN' : 'SEND SIMULATED OTP'}
                    </button>
                  )}
                </form>

                {/* Instant sandbox access button */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setAuthInput('anusha.gmcsco@gmail.com');
                      setIsLoggedIn(true);
                    }}
                    className="w-full text-center text-[11px] font-mono text-amber-600 hover:text-amber-700 underline font-extrabold cursor-pointer"
                  >
                    ⚡ Skip Setup: Login Instantly with Premium Demo Sandbox Profile
                  </button>
                </div>
              </div>

            </div>
          </section>
        )}
      </AnimatePresence>

      {/* SECURE DASHBOARD EXPERIENCE */}
      {isLoggedIn && (
        <main className="py-12 px-4 max-w-7xl mx-auto space-y-12" id="executive-dashboard">
          
          {/* USER WELCOME HEADER & LEVEL BAR */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-200/60 pb-6">
            <div className="flex items-center gap-4 text-left">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-display font-black text-slate-900 dark:text-white">{currentUser.name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-850 dark:text-amber-400 font-extrabold uppercase">
                    {currentUser.givingLevel}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Registered Profile: {currentUser.email} • ID: RMST_DN_940
                </p>
              </div>
            </div>

            {/* Corporate Mode Toggle */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full md:w-auto">
              <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-mono">
                <button
                  onClick={() => setIsCorporateMode(false)}
                  className={`px-4 py-2 rounded-lg font-bold cursor-pointer transition-all ${
                    !isCorporateMode ? 'bg-emerald-850 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Personal Dashboard
                </button>
                <button
                  onClick={() => setIsCorporateMode(true)}
                  className={`px-4 py-2 rounded-lg font-bold cursor-pointer transition-all ${
                    isCorporateMode ? 'bg-emerald-850 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Corporate CSR Account
                </button>
              </div>

              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-rose-50 hover:bg-rose-100 text-rose-600 transition-all font-bold border border-rose-200 cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </section>

          {/* SECTION 3: EXECUTIVE STATS WIDGETS */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl border text-left flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 ${
                  highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-md shadow-slate-100/30'
                }`}
              >
                <div className="flex justify-between items-start">
                  <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">{metric.name}</p>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                    {metric.change}
                  </span>
                </div>
                
                <div className="py-4">
                  <h3 className="text-3xl font-display font-black tracking-tight text-slate-900 dark:text-white">
                    {idx === 0 && '8,750+'}
                    {idx === 1 && '34'}
                    {idx === 2 && '12 Districts'}
                    {idx === 3 && '₹22,500'}
                  </h3>
                </div>

                <div className="border-t border-slate-100 dark:border-zinc-800 pt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>
                    {idx === 0 && 'Farmers, students, micro-dairy operators'}
                    {idx === 1 && 'Solar arrays, libraries, SHG cold-chains'}
                    {idx === 2 && 'Active clusters across North Karnataka'}
                    {idx === 3 && 'Estimated 80G tax benefit saved'}
                  </span>
                </div>
              </div>
            ))}
          </section>

          {/* SECTION 5: INTERACTIVE IMPACT TRACKING CHARTS */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Lives Impacted Over Time (Area Chart) */}
            <div className={`lg:col-span-8 p-6 rounded-3xl border text-left space-y-4 ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-lg'
            }`}>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-zinc-800">
                <div className="space-y-0.5">
                  <h3 className="text-base font-extrabold text-slate-950 dark:text-white font-display">Your Impact Journey</h3>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Lives Impacted & supported by region</p>
                </div>
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <TrendingUp size={16} />
                </div>
              </div>

              {/* Area Chart visualization */}
              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={livesImpactedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAgri" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#059669" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorEdu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d97706" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} className="font-mono" />
                    <YAxis stroke="#94a3b8" fontSize={10} className="font-mono" />
                    <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px', fontFamily: 'monospace' }} />
                    <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                    <Area type="monotone" dataKey="Agriculture" stroke="#059669" fillOpacity={1} fill="url(#colorAgri)" strokeWidth={2} />
                    <Area type="monotone" dataKey="Education" stroke="#d97706" fillOpacity={1} fill="url(#colorEdu)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Fund Utilization Transparency (Radial Pie / Utilization Bar) */}
            <div className={`lg:col-span-4 p-6 rounded-3xl border text-left space-y-6 ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-lg'
            }`}>
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-zinc-800">
                <div className="space-y-0.5">
                  <h3 className="text-base font-extrabold text-slate-950 dark:text-white font-display">Fund Utilization</h3>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Audited programmatic allocations</p>
                </div>
                <div className="p-2 bg-teal-50 rounded-xl text-teal-700">
                  <ShieldCheck size={16} />
                </div>
              </div>

              {/* Pie Chart representation of Zero Leakage */}
              <div className="h-44 w-full flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {allocationPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
                  </PieChart>
                </ResponsiveContainer>

                {/* Center metric */}
                <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                  <span className="text-2xl font-black font-mono text-emerald-900">92%</span>
                  <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider">Field Capital</span>
                </div>
              </div>

              {/* Text Highlights */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full" />
                    <span>Programmatic Assets</span>
                  </span>
                  <strong>92% (₹34.5L Deployed)</strong>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
                    <span>Administrative/Audit</span>
                  </span>
                  <strong>8% (₹3.0L Audited)</strong>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border rounded-2xl text-[10px] text-slate-400 font-sans leading-relaxed">
                🛡️ <strong>Zero-Leakage Mandate:</strong> Verified and signed bi-annually by licensed statutory Chartered Accountants. Compliant with Karnataka State Trust Audits.
              </div>
            </div>
          </section>

          {/* DISTRICT ALLOCATION & ANNUAL TRENDS */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* District Coverage bar chart */}
            <div className={`p-6 rounded-3xl border text-left space-y-4 ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-lg'
            }`}>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">District Allocation Summary</h4>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Regional trust asset deployment across Dharwad/Haveri/Gadag</p>
              
              <div className="h-56 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={districtUtilizationData} margin={{ left: -20 }}>
                    <XAxis dataKey="district" stroke="#94a3b8" fontSize={10} className="font-mono" />
                    <YAxis stroke="#94a3b8" fontSize={10} className="font-mono" />
                    <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                    <Bar dataKey="allocation" radius={[6, 6, 0, 0]}>
                      {districtUtilizationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Annual Impact trends */}
            <div className={`p-6 rounded-3xl border text-left space-y-4 ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-lg'
            }`}>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">Annual Impact Trends</h4>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Growth of organic acreage and student certifications</p>
              
              <div className="h-56 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { year: '2023', 'Acreage': 400, 'Certifications': 120 },
                    { year: '2024', 'Acreage': 950, 'Certifications': 310 },
                    { year: '2025', 'Acreage': 1800, 'Certifications': 580 },
                    { year: '2026', 'Acreage': 3200, 'Certifications': 850 }
                  ]} margin={{ left: -20, right: 10 }}>
                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} className="font-mono" />
                    <YAxis stroke="#94a3b8" fontSize={10} className="font-mono" />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
                    <Line type="monotone" dataKey="Acreage" stroke="#0f766e" strokeWidth={2.5} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Certifications" stroke="#d97706" strokeWidth={2.5} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* SECTION 4: DONATION HISTORY DATA TABLE */}
          <section className={`p-6 md:p-8 rounded-3xl border text-left space-y-6 ${
            highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/60 shadow-xl'
          }`} id="donation-history">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100 dark:border-zinc-800">
              <div className="space-y-0.5">
                <h3 className="text-lg font-extrabold text-slate-950 dark:text-white font-display">Donation History</h3>
                <p className="text-xs text-slate-400">Review your historical audit trail, check settlement clearing statuses, and download 80G PDF receipts.</p>
              </div>

              {/* Filters / Search Bar */}
              <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
                <div className="relative flex-1 md:w-60">
                  <span className="absolute left-3 top-2.5 text-slate-400">
                    <Search size={14} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by campaign..."
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-xl text-xs font-mono focus:ring-1 focus:ring-emerald-950 focus:outline-none bg-white text-slate-800"
                  />
                </div>

                <select
                  value={historyFilter}
                  onChange={(e) => setHistoryFilter(e.target.value)}
                  className="px-3 py-1.5 border border-slate-200 rounded-xl bg-white text-slate-700 text-xs font-mono focus:outline-none"
                >
                  <option value="All">All Transactions</option>
                  <option value="High Value">High Value (≥₹10,000)</option>
                  <option value="Recurring">Unrestricted Core</option>
                </select>
              </div>
            </div>

            {/* Custom Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-zinc-850 text-slate-400 text-[10px] font-bold uppercase tracking-wider bg-slate-50 dark:bg-zinc-900">
                    <th className="py-3 px-4 text-left">Transaction ID</th>
                    <th className="py-3 px-4 text-left">Clearance Date</th>
                    <th className="py-3 px-4 text-left">Allocated Campaign</th>
                    <th className="py-3 px-4 text-right">Amount (INR)</th>
                    <th className="py-3 px-4 text-center">Settlement Status</th>
                    <th className="py-3 px-4 text-right">80G Audit Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-850">
                  {filteredDonations.length > 0 ? (
                    filteredDonations.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                        <td className="py-4 px-4 text-left font-bold text-slate-500 flex items-center gap-1">
                          <span>{tx.id}</span>
                          <button 
                            onClick={() => copyTxId(tx.id)}
                            className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-emerald-700 cursor-pointer"
                            title="Copy ID"
                          >
                            {copiedTxn === tx.id ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                          </button>
                        </td>
                        <td className="py-4 px-4 text-left text-slate-500">{tx.date}</td>
                        <td className="py-4 px-4 text-left font-sans text-slate-800 dark:text-slate-300">
                          <div className="font-bold">{tx.campaign}</div>
                          <div className="text-[9px] font-mono text-slate-400">Processed via {tx.method}</div>
                        </td>
                        <td className="py-4 px-4 text-right font-black text-slate-900 dark:text-white">
                          ₹{tx.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700">
                            <CheckCircle size={10} />
                            <span>{tx.status}</span>
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => setSelectedReceipt(tx)}
                            className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-lg border border-emerald-200 transition-all cursor-pointer inline-flex items-center gap-1"
                          >
                            <FileText size={11} />
                            <span>View Receipt</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400 italic">
                        No transactions found matching the specified parameters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 6: TAX RECEIPTS & 80G DOCUMENTS CARDS */}
          <section className="space-y-6" id="tax-receipts">
            <div className="text-left space-y-1">
              <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider">COMPLIANCE LEDGER</span>
              <h3 className="text-lg font-extrabold text-slate-950 dark:text-white font-display">Tax Receipts & 80G Documents</h3>
              <p className="text-xs text-slate-400">Download audited board-signed annual reports and individual contribution certificates.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { name: 'Annual Giving Summary FY 25-26', desc: 'Comprehensive CA-vetted tax statement summarizing your donations.', size: '1.2 MB', code: 'FY25-26-AGS' },
                { name: 'RMST 80G Registration Approval', desc: 'Statutory Board Approval certificate for Section 80G tax benefit validation.', size: '2.5 MB', code: '80G-REG-KAR' },
                { name: 'Section 12A Exemption Certificate', desc: 'Permanent registration copy validating RMST public charitable trust status.', size: '1.8 MB', code: '12A-EXEMPT-PERM' },
                { name: 'CSR-1 MCA Compliance Approval', desc: 'Ministry of Corporate Affairs registration for executing company budgets.', size: '3.1 MB', code: 'CSR-1-MCA-MOCK' }
              ].map((doc, idx) => {
                const isThisDownloading = downloadingDoc === doc.name;
                return (
                  <div
                    key={idx}
                    className={`p-6 rounded-3xl border text-left flex flex-col justify-between space-y-4 ${
                      highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-sm hover:shadow-md transition-shadow'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl inline-block mb-1">
                        <FileText size={20} />
                      </div>
                      <h4 className="text-xs font-extrabold text-slate-800 dark:text-white line-clamp-1">{doc.name}</h4>
                      <p className="text-[10px] text-slate-400 leading-normal line-clamp-2">{doc.desc}</p>
                      <span className="text-[8px] font-mono text-slate-400 block pt-1">Code: {doc.code} • {doc.size}</span>
                    </div>

                    <div className="space-y-2">
                      {isThisDownloading && (
                        <div className="space-y-1">
                          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                            <div className="bg-emerald-600 h-full transition-all duration-100" style={{ width: `${downloadProgress}%` }} />
                          </div>
                          <p className="text-[8px] font-mono text-emerald-600 text-right">Compiling {downloadProgress}%</p>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => simulateDownload(doc.name)}
                          disabled={!!downloadingDoc}
                          className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[10px] font-bold font-mono rounded-lg border border-slate-200 cursor-pointer text-center"
                        >
                          Download
                        </button>
                        <button
                          onClick={() => alert(`Statutory notification dispatched!\nAn encrypted, digitally signed PDF of "${doc.name}" has been routed to your registered mailbox: ${currentUser.email}.`)}
                          className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono rounded-lg border border-emerald-200 cursor-pointer text-center"
                        >
                          Email Copy
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 7: RECURRING GIVING (SUBSCRIPTION PRICING CARDS) */}
          <section className="py-8 border-y border-slate-200/60" id="recurring-plans">
            <div className="text-center space-y-2 pb-8">
              <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider">SUSTAINED GROWTH</span>
              <h3 className="text-2xl font-display font-black tracking-tight text-slate-900 dark:text-white">Recurring Giving Plans</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Become an active stakeholder. Subscribe to monthly, quarterly, or annual plans to sustain regular regional operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RECURRING_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-6 rounded-3xl border text-left flex flex-col justify-between space-y-6 relative ${
                    plan.id === 'rec_q' 
                      ? 'border-emerald-600 bg-emerald-500/5 ring-1 ring-emerald-600/20' 
                      : highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50'
                  }`}
                >
                  {plan.id === 'rec_q' && (
                    <span className="absolute top-3 right-3 bg-emerald-700 text-white text-[8px] font-mono font-bold uppercase px-2 py-0.5 rounded-full">
                      Highly Recommended
                    </span>
                  )}

                  <div className="space-y-3">
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-display uppercase">{plan.name}</h4>
                    <p className="text-3xl font-display font-black text-emerald-950 dark:text-white">
                      ₹{plan.amount.toLocaleString('en-IN')}
                      <span className="text-xs font-mono font-normal text-slate-400"> / {plan.period}</span>
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">{plan.desc}</p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Includes Benefits:</p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {plan.benefits.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-1.5">
                          <Check size={12} className="text-emerald-700 mt-0.5 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setSponsorshipAmount(plan.amount);
                      setSponsorshipPlan(plan.name);
                      setShowSponsorshipModal(true);
                      setCheckoutStep('plan');
                    }}
                    className={`w-full py-3 text-xs font-bold font-mono rounded-xl cursor-pointer text-center transition-all ${
                      plan.id === 'rec_q'
                        ? 'bg-emerald-900 hover:bg-emerald-850 text-white shadow'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    SUBSCRIBE PLAN
                  </button>
                </div>
              ))}
            </div>

            {/* Payment Method icons */}
            <div className="pt-6 text-center space-y-2">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Supported checkout methods in simulated sandbox:</p>
              <div className="flex justify-center items-center gap-6 text-slate-400 font-mono text-[10px] font-bold">
                <span className="flex items-center gap-1"><QrCode size={12} /> UPI Direct Auto-debit</span>
                <span className="flex items-center gap-1"><CreditCard size={12} /> Credit/Debit Cards</span>
                <span className="flex items-center gap-1"><Building2 size={12} /> Corporate Net Banking</span>
                <span className="flex items-center gap-1"><Globe size={12} /> NRI Global Currency (PayPal)</span>
              </div>
            </div>
          </section>

          {/* SECTION 8: PROJECT RECOMMENDATIONS (AI ENGINE) */}
          <section className="space-y-6" id="ai-recommendations">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="text-left space-y-1">
                <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider">AI RECOMMENDATION ENGINE</span>
                <h3 className="text-lg font-extrabold text-slate-950 dark:text-white font-display">Recommended Programs</h3>
                <p className="text-xs text-slate-400">Dynamic allocation targets aligned with your preferences using OpenAI vector similarity indexes.</p>
              </div>

              {/* Preference category chips */}
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px] font-bold">
                {['All', 'Agriculture', 'Women Empowerment', 'Education & AI Skills', 'Health & Nutrition', 'Climate Action'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setRecommendationPreference(cat)}
                    className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                      recommendationPreference === cat
                        ? 'bg-emerald-900 border-emerald-900 text-white'
                        : 'bg-white border-slate-200 text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedFiltered.map((p) => (
                <div
                  key={p.id}
                  className={`rounded-3xl border overflow-hidden flex flex-col justify-between ${
                    highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-md hover:shadow-lg transition-shadow'
                  }`}
                >
                  <div className="relative aspect-video">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[8px] font-mono bg-amber-400 text-slate-950 font-black uppercase">
                      {p.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
                    <div className="space-y-2">
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-display leading-tight">{p.title}</h4>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2">{p.description}</p>
                      
                      <div className="p-3 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 text-[11px] text-emerald-850">
                        <strong>Impact Target:</strong> {p.impact}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center text-[10px] font-mono">
                      <div className="flex gap-1">
                        {p.tags.map((t, idx) => (
                          <span key={idx} className="text-slate-400">#{t}</span>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => {
                          setSponsorshipAmount(5000);
                          setSponsorshipPlan(`Earmarked Support: ${p.title}`);
                          setShowSponsorshipModal(true);
                          setCheckoutStep('plan');
                        }}
                        className="text-emerald-700 hover:text-emerald-900 font-black flex items-center gap-1 cursor-pointer"
                      >
                        <span>Sponsor Project</span>
                        <ArrowRight size={10} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 9: STORIES YOU HELPED CREATE (EDITORIAL STORY SHOWCASE) */}
          <section className="py-8" id="impact-stories">
            <div className="text-center space-y-2 pb-8">
              <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider">EDITORIAL CHRONICLES</span>
              <h3 className="text-2xl font-display font-black tracking-tight text-slate-900 dark:text-white">Stories You Helped Create</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Read direct ground reports, testimonials, and video chronicles from local agrarian leaders in Dharwad and Haveri.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Mallappa Gowda Reaches 3x Crop Income',
                  desc: 'How deployment of our solar-driven smart sub-surface drip irrigation systems protected Mallappa’s groundnuts from Karnataka seasonal dry spells.',
                  image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600',
                  duration: '4:15 min video',
                  location: 'Savanur Taluk'
                },
                {
                  title: 'State School Girls Launch First AI Projects',
                  desc: 'Equipped with solar touchscreens and visual scratch nodes, Shalini K. and her batch designed local agrarian weather monitoring programs.',
                  image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600',
                  duration: '3:30 min video',
                  location: 'Kalghatgi school'
                }
              ].map((story, sIdx) => (
                <div
                  key={sIdx}
                  className={`rounded-3xl overflow-hidden border flex flex-col sm:flex-row ${
                    highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-md'
                  }`}
                >
                  <div className="relative aspect-video sm:aspect-square sm:w-44 shrink-0">
                    <img 
                      src={story.image} 
                      alt={story.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-950/20" />
                  </div>

                  <div className="p-6 flex flex-col justify-between text-left space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-mono text-amber-500 font-extrabold uppercase">📍 {story.location}</span>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-display leading-tight">{story.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">{story.desc}</p>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-zinc-800 text-[10px] font-mono text-slate-400">
                      <span>🎬 {story.duration}</span>
                      <button 
                        onClick={() => alert('Simulated documentary stream started!\nIn a live environment, this loads the high-definition narrative clip of beneficiaries.')}
                        className="text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer"
                      >
                        Play Chronicle
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 11: RECOGNITION WALL */}
          <section className="py-8" id="recognition-wall">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-gradient-to-br from-emerald-950 to-slate-950 p-8 md:p-12 rounded-3xl text-white">
              <div className="md:col-span-4 text-left space-y-4">
                <span className="inline-block px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-400 font-mono text-[9px] font-black uppercase">
                  Donor Hall of Honour
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-black text-white leading-tight">Recognition Wall & Badges</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  We celebrate our sustained patrons whose recurring support funds local coordinators, mobile clinics, and technical smart labs.
                </p>
                <div className="pt-2">
                  <span className="text-2xl font-mono font-black text-amber-400">{currentUser.impactScore}</span>
                  <span className="text-xs font-mono text-slate-400"> Impact Score Points</span>
                </div>
              </div>

              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: 'Humic Rejuvenator Badge', desc: 'Sustained 5 organic soil health card diagnostics.', score: '+200 pts', icon: Wheat },
                  { name: 'STEM Mentor Supporter', desc: 'Funded solar computers for high schoolgirls.', score: '+400 pts', icon: Laptop },
                  { name: 'Dairy Cooperative Pioneer', desc: 'Sustained local diagnostic milk scales.', score: '+320 pts', icon: Award }
                ].map((badge, bIdx) => (
                  <div
                    key={bIdx}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 text-left flex flex-col justify-between space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-amber-400/10 text-amber-400 rounded-xl">
                        <badge.icon size={18} />
                      </div>
                      <span className="text-[8px] font-mono text-emerald-300 font-bold bg-emerald-500/15 px-1.5 py-0.5 rounded">
                        {badge.score}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-100">{badge.name}</h4>
                      <p className="text-[10px] text-slate-400 font-sans leading-normal">{badge.desc}</p>
                    </div>

                    <span className="text-[8px] font-mono text-amber-400 font-bold uppercase tracking-wider">Unblocked / Earned</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 12: FAMILY & MEMORIAL GIVING COHORTS */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left" id="family-giving">
            {/* Family Giving Circles */}
            <div className={`p-6 md:p-8 rounded-3xl border space-y-6 ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-md'
            }`}>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider">LEGACY COLLABORATION</span>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white font-display">Family & Memorial Giving Circles</h4>
                <p className="text-xs text-slate-400">Set up custom collective milestone targets in honor of loved ones or special events.</p>
              </div>

              <div className="space-y-3">
                {[
                  { title: 'The Rao Family Giving Circle', target: '₹1,00,000', raised: '₹75,000', program: 'Agricultural Solar Pumps', pct: '75%' },
                  { title: 'In Loving Memory of Late S. K. Rao', target: '₹50,000', raised: '₹50,000', program: 'Dharwad Government smart labs', pct: '100%' }
                ].map((circle, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900 border space-y-3 text-xs">
                    <div className="flex justify-between items-center">
                      <strong className="text-slate-800 dark:text-white">{circle.title}</strong>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                        {circle.pct} Complete
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">Earmarked Goal: {circle.program}</p>
                    <div className="space-y-1">
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-600 h-full" style={{ width: circle.pct }} />
                      </div>
                      <div className="flex justify-between text-[9px] font-mono text-slate-400">
                        <span>Raised: {circle.raised}</span>
                        <span>Target: {circle.target}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => alert('Family Giving Circle Builder initiated!\nOur support staff will coordinate custom milestones and tax summaries.')}
                className="w-full py-2.5 text-xs font-bold font-mono text-emerald-850 hover:bg-emerald-50 border border-emerald-300 rounded-xl transition-all cursor-pointer text-center"
              >
                + CREATE GIVING CIRCLE
              </button>
            </div>

            {/* Corporate & CSR Accounts Console */}
            <div className={`p-6 md:p-8 rounded-3xl border space-y-6 ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-md'
            }`}>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider">SECTION 135 COMPLIANCE</span>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white font-display">Corporate & CSR Accounts Console</h4>
                <p className="text-xs text-slate-400">Vetted compliance reporting and custom audit-ready utilization ledgers for ESG committees.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-2xl border text-center space-y-1">
                    <Building2 size={16} className="mx-auto text-emerald-700" />
                    <h5 className="text-[11px] font-bold text-slate-800 dark:text-white">CSR-1 Certified</h5>
                    <p className="text-[9px] text-slate-400 font-mono">Reg. CSR00059487</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-2xl border text-center space-y-1">
                    <FileText size={16} className="mx-auto text-emerald-700" />
                    <h5 className="text-[11px] font-bold text-slate-800 dark:text-white">Audit Certificates</h5>
                    <p className="text-[9px] text-slate-400 font-mono">CA-Signed Receipts</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Register multiple audit observers, track regional UN SDG alignments, and download instant quarterly progress reports.
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => simulateDownload('CSR Utilization Certificate Template')}
                    disabled={!!downloadingDoc}
                    className="w-full py-2.5 text-xs font-bold font-mono bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all cursor-pointer text-center"
                  >
                    DOWNLOAD CSR COMPLIANCE TEMPLATE
                  </button>
                  <button
                    onClick={() => alert('Corporate observer seat added!\nYou can register up to 5 corporate auditing team members for read-only access.')}
                    className="w-full py-2.5 text-xs font-bold font-mono text-slate-600 hover:bg-slate-50 border border-slate-300 rounded-xl transition-all cursor-pointer text-center"
                  >
                    + REGISTER AUDIT OBSERVER SEAT
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 15: NOTIFICATION CENTER FEED */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            
            {/* Notifications panel (8 cols) */}
            <div className={`lg:col-span-8 p-6 md:p-8 rounded-3xl border space-y-6 ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-md'
            }`} id="notification-center">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-zinc-800">
                <div className="space-y-0.5">
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white font-display">Notification Center</h4>
                  <p className="text-xs text-slate-400">Instant alerts on receipt compilation, campaign updates, and board newsletters.</p>
                </div>
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl relative">
                  <Bell size={16} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                </div>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                {NOTIFICATION_FEED.map((n) => (
                  <div key={n.id} className="py-4 flex gap-4 items-start hover:bg-slate-50/50 transition-colors rounded-xl px-2">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${n.unread ? 'bg-emerald-600' : 'bg-slate-200'}`} />
                    <div className="space-y-1 text-xs flex-1">
                      <div className="flex justify-between items-center">
                        <strong className="text-slate-800 dark:text-white">{n.title}</strong>
                        <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{n.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Board Preview (4 cols) */}
            <div className={`lg:col-span-4 p-6 rounded-3xl border space-y-6 ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-md'
            }`} id="community-supporters">
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">Supporters Circle</h4>
              <p className="text-xs text-slate-400 leading-normal">Discuss farm pond metrics and volunteer curriculums directly with other patrons.</p>

              <div className="space-y-3">
                {[
                  { user: 'Karan S. Bhatia', comment: 'Sponsoring solar IT smart workstations in Dharwad schools has given 250+ pupils direct code training.', likes: 14 },
                  { user: 'Dr. Arundhati Nayak', comment: 'Loved visiting the Haveri women dairy analyzer unit last month. Incredible zero-leakage transparency.', likes: 22 }
                ].map((post, pIdx) => (
                  <div key={pIdx} className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-2xl border text-xs text-left space-y-2">
                    <div className="flex justify-between items-center">
                      <strong className="text-slate-800 dark:text-white font-mono">{post.user}</strong>
                      <span className="text-[10px] text-slate-400">👍 {post.likes}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">"{post.comment}"</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => alert('Supporters Circle Community board launching soon!\nYou will have instant forum publishing rights.')}
                className="w-full py-2.5 text-xs font-bold font-mono bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all cursor-pointer text-center"
              >
                JOIN COMMUNITY DISCUSSION
              </button>
            </div>
          </section>

          {/* SECTION 16: MOBILE APP DEVICE PREVIEWS */}
          <section className="py-12 bg-slate-100 dark:bg-zinc-900 rounded-3xl p-8 md:p-12 text-left" id="mobile-app">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[9px] font-black uppercase">
                  Continuous Engagement
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-black text-slate-900 dark:text-white leading-tight">
                  RMST Donor Mobile App
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Carry your impact tracking tools in your pocket. Access digital wallets, scan QR codes at community centers, receive instant push notifications on field harvests, and review certificates offline.
                </p>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-white dark:bg-black rounded-2xl border space-y-1">
                    <Smartphone size={16} className="text-emerald-700" />
                    <strong className="text-slate-800 dark:text-white block">Digital Wallet</strong>
                    <p className="text-[10px] text-slate-400">Store active periodic sponsorship cards in Apple/Google Wallet.</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-black rounded-2xl border space-y-1">
                    <QrCode size={16} className="text-emerald-700" />
                    <strong className="text-slate-800 dark:text-white block">Offline Receipts</strong>
                    <p className="text-[10px] text-slate-400">Download and show tax certificates offline without active internet nodes.</p>
                  </div>
                </div>
              </div>

              {/* Mobile iPhone Style Mockup */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-64 h-[440px] bg-slate-950 border-[8px] border-slate-800 rounded-[36px] relative shadow-2xl overflow-hidden flex flex-col justify-between p-4 font-mono">
                  {/* Camera notch */}
                  <div className="w-24 h-4 bg-slate-800 absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-xl z-20" />

                  {/* App Screen Content */}
                  <div className="relative z-10 space-y-3 pt-6 text-[10px] text-slate-200 text-left">
                    <div className="flex justify-between text-[8px] text-slate-400">
                      <span>Raita Mitra Mobile</span>
                      <span>LTE 🔋 98%</span>
                    </div>

                    <div className="p-3 bg-emerald-950 rounded-xl border border-emerald-800 space-y-2">
                      <p className="text-[8px] text-slate-400 uppercase tracking-widest font-bold">Your Balance</p>
                      <h4 className="text-lg font-black text-white">₹37,500</h4>
                      <p className="text-[8px] text-emerald-400 flex items-center gap-1">✔ 50% 80G tax benefit applied</p>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-xl space-y-1.5">
                      <p className="text-[8px] text-slate-400 uppercase tracking-wider font-bold">Latest Alert</p>
                      <p className="text-[9px] text-slate-300">Mallappa Gowda deployed organic humic seeds this morning in Dharwad taluk! 🌾</p>
                    </div>

                    {/* App mini-QR */}
                    <div className="p-3 bg-white text-slate-900 rounded-xl text-center space-y-1">
                      <QrCode size={48} className="mx-auto" />
                      <p className="text-[8px] font-bold uppercase text-slate-500">Scan for direct site donations</p>
                    </div>
                  </div>

                  <p className="text-[8px] text-slate-400 text-center pb-2">iOS & Android App Simulator v1.2</p>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 18: FAQ ACCORDION */}
          <section className="py-8 max-w-4xl mx-auto text-left" id="faq-accordions">
            <div className="text-center space-y-2 pb-8">
              <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider">RESOLVING QUERIES</span>
              <h3 className="text-2xl font-display font-black tracking-tight text-slate-900 dark:text-white">Frequently Asked Questions</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Consult our transparent policies on tax returns, foreign exchange compliance, and regional field audits.
              </p>
            </div>

            <div className="space-y-3">
              {FAQ_ACCORDION.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className={`border rounded-2xl overflow-hidden transition-all duration-350 ${
                      isOpen 
                        ? 'border-emerald-600 bg-emerald-500/5' 
                        : 'border-slate-200 bg-white dark:bg-black'
                    }`}
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full p-5 flex justify-between items-center text-xs font-bold font-mono text-slate-850 dark:text-white cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className="text-emerald-700 font-bold">{isOpen ? '[ - ]' : '[ + ]'}</span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-slate-100 dark:border-zinc-850"
                        >
                          <p className="p-5 text-xs text-slate-500 leading-relaxed font-sans">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 19: DONOR SUPPORT CARD CHANNELS */}
          <section className="space-y-6" id="support-desk">
            <div className="text-left space-y-1">
              <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider">RELATIONSHIP DESK</span>
              <h3 className="text-lg font-extrabold text-slate-950 dark:text-white font-display">Donor Support Channels</h3>
              <p className="text-xs text-slate-400">Reach our dedicated relationship managers 24/7 regarding audit ledgers or CSR alignments.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-left">
              {[
                { channel: 'WhatsApp Helpdesk', desc: 'Secure live chat with donor relationship executives.', actionText: 'Message Now', value: 'WhatsApp Active', icon: MessageSquare, href: 'https://wa.me/919481234567' },
                { channel: 'Email Support desk', desc: 'Write to our finance officer for Section 80G tax clearance schedules.', actionText: 'Write Email', value: 'connect@raitamitra.org', icon: Mail, href: 'mailto:connect@raitamitra.org' },
                { channel: 'Phone Hotline Desk', desc: 'Call our Central Office Hubballi for statutory queries.', actionText: 'Call Helpline', value: '+91 94812 34567', icon: Phone, href: 'tel:+919481234567' },
                { channel: 'Schedule Meeting', desc: 'Book a 1-on-1 virtual regional audit presentation with trustees.', actionText: 'Book Slot', value: '15-min zoom briefing', icon: Calendar, href: '#/' }
              ].map((card, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 ${
                    highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-sm'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl inline-block">
                      <card.icon size={18} />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white font-display">{card.channel}</h4>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{card.desc}</p>
                    <span className="text-[10px] font-mono font-bold block text-emerald-700">{card.value}</span>
                  </div>

                  <a
                    href={card.href}
                    onClick={() => {
                      if (card.channel.includes('Meeting')) {
                        alert('Consultation scheduling model triggered!\nOur relationship officers will arrange a calendar invite.');
                      }
                    }}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-center font-bold font-mono rounded-lg border border-slate-200 cursor-pointer block"
                  >
                    {card.actionText}
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* FLOATING AI ASSISTANT CHAT DIALOG IN WIDGET */}
          <div className="fixed bottom-24 right-6 z-40" id="ai-chat-widget">
            <div className="relative group">
              
              {/* Trigger floating button with badge */}
              <button
                onClick={() => {
                  const widget = document.getElementById('floating-chat-window');
                  if (widget) {
                    widget.classList.toggle('hidden');
                  }
                }}
                className="w-14 h-14 bg-emerald-900 hover:bg-emerald-800 text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 transition-all relative z-50"
              >
                <MessageSquare size={24} />
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-black font-mono text-[9px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce border-2 border-white">
                  AI
                </span>
              </button>

              {/* Collapsed Window Frame */}
              <div 
                id="floating-chat-window" 
                className="hidden absolute bottom-16 right-0 w-80 sm:w-96 h-[480px] rounded-3xl bg-white dark:bg-black border border-slate-200 shadow-2xl flex flex-col justify-between overflow-hidden z-50 text-left font-mono"
              >
                {/* Chat Top header */}
                <div className="p-4 bg-emerald-900 text-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                    <div>
                      <h4 className="text-xs font-bold font-sans">Mitra AI Donor Assistant</h4>
                      <p className="text-[8px] text-emerald-300 font-mono">RMST Knowledge Copilot v2.1</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => document.getElementById('floating-chat-window')?.classList.add('hidden')}
                    className="p-1 hover:bg-emerald-850 rounded text-slate-200"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Chat Scroll container */}
                <div className="p-4 overflow-y-auto flex-1 space-y-4 bg-slate-50 dark:bg-zinc-950 text-[11px] leading-relaxed">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-3 rounded-2xl max-w-[85%] space-y-1 ${
                        msg.sender === 'user' 
                          ? 'bg-emerald-950 text-slate-100 rounded-tr-none' 
                          : 'bg-white dark:bg-zinc-900 text-slate-800 dark:text-slate-200 border rounded-tl-none shadow-sm'
                      }`}>
                        <p className="font-sans whitespace-pre-line">{msg.text}</p>
                        <span className="text-[8px] text-slate-400 block text-right">{msg.time}</span>
                      </div>
                    </div>
                  ))}

                  {aiTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-zinc-900 border rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Form Footer */}
                <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-black border-t border-slate-100 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type tax queries, program suggestions..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-950 text-xs bg-slate-50 text-slate-800"
                  />
                  <button 
                    type="submit"
                    className="p-2 bg-emerald-900 hover:bg-emerald-850 text-white rounded-xl cursor-pointer"
                  >
                    <Send size={14} />
                  </button>
                </form>
              </div>

            </div>
          </div>

        </main>
      )}

      {/* SECTION 20: CTA BANNER SECTION */}
      <section className="relative py-24 bg-emerald-950 text-white text-center px-4 overflow-hidden" id="cta-banner">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1200")' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-tight">
            Every Contribution Creates Change
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Together, we are establishing off-grid software hubs, supporting local women collectives, and recharging depleted Karnataka village aquifers. Join us.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <button 
              onClick={() => {
                document.getElementById('recurring-plans')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-full text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono tracking-wider transition-all cursor-pointer"
            >
              DONATE AGAIN
            </button>
            <button 
              onClick={() => {
                window.location.hash = '#/programs';
              }}
              className="px-6 py-3 rounded-full text-xs font-bold bg-emerald-900 hover:bg-emerald-850 text-white font-mono tracking-wider border border-emerald-700 transition-all cursor-pointer"
            >
              EXPLORE PROGRAMS
            </button>
          </div>
        </div>
      </section>

      {/* 80G COMPLIANCE RECEIPT VIEW DIALOG MODAL */}
      <AnimatePresence>
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border text-left p-6 max-h-[90vh] overflow-y-auto ${
                highContrast ? 'bg-black border-white text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              {/* Modal controls */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-[9px] font-mono font-black text-emerald-700 uppercase tracking-widest">Digital Audit Certificate</span>
                <button 
                  onClick={() => setSelectedReceipt(null)}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Printable frame */}
              <div className="p-8 border-4 border-double border-emerald-900 bg-white text-slate-900 rounded-2xl relative space-y-6 font-serif mt-4 text-xs">
                
                {/* Official seal */}
                <div className="absolute top-4 right-4 text-emerald-800/10 font-mono text-center border-4 border-dashed border-emerald-800/15 p-2 select-none transform rotate-12">
                  <span className="text-[8px] font-bold block">80G VETTED</span>
                  <span className="text-base font-black block">RMST SEAL</span>
                </div>

                <div className="text-center space-y-1.5 pb-4 border-b-2 border-slate-200">
                  <h4 className="text-base font-black uppercase text-emerald-900 tracking-wide font-sans">
                    Raita Mitra Social Trust (R)
                  </h4>
                  <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                    Hubballi, Karnataka, India • connect@raitamitra.org
                  </p>
                  <p className="text-[8px] font-mono text-slate-400">
                    NGO Darpan ID: KA/2023/0342549 • Section 135 CSR Reg: CSR00059487
                  </p>
                  <p className="text-[10px] font-bold font-sans underline text-slate-800 pt-1 tracking-wider uppercase">
                    Official 80G Contribution Voucher & Receipt
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[9px] leading-relaxed">
                  <div>
                    <span className="text-slate-400 block">Certificate Ref No:</span>
                    <strong className="text-slate-800 font-mono">{selectedReceipt.receiptId}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Settlement Clearance Date:</span>
                    <strong className="text-slate-800 font-mono">{selectedReceipt.date}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Transaction Reference ID:</span>
                    <strong className="text-slate-800 font-mono">{selectedReceipt.id}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Allocated Campaign:</span>
                    <strong className="text-slate-800 font-sans">{selectedReceipt.campaign}</strong>
                  </div>
                </div>

                <div className="border-t border-b border-dashed border-slate-200 py-4">
                  <p className="text-slate-700 leading-relaxed font-sans text-xs">
                    This certifies that the sum of <strong className="text-emerald-950 font-mono text-sm">₹{selectedReceipt.amount.toLocaleString('en-IN')} INR</strong> was processed from <strong className="text-slate-900">{currentUser.name}</strong> of registered email <em>{currentUser.email}</em>.
                  </p>
                  <p className="text-slate-500 font-sans text-[10px] pt-2 leading-relaxed">
                    Under Section 80G of the Income Tax Act, 1961, individual donors receive a 50% tax exemption credit automatically linked to their Permanent Account Number (PAN) upon annual statutory reporting.
                  </p>
                </div>

                <div className="flex justify-between items-end text-[9px] pt-4 font-sans text-slate-500">
                  <div className="space-y-1">
                    <p>Signature status: <strong>Digitally CA-Signed</strong></p>
                    <p>Signing Authority Stamp ID: <strong>RMST-8495-EX</strong></p>
                  </div>
                  <div className="text-center font-bold text-slate-800 space-y-1">
                    <div className="w-24 border-b border-slate-300 mx-auto h-8" />
                    <p className="text-[8px] uppercase tracking-wider font-mono">Board Trustee Stamp</p>
                  </div>
                </div>

              </div>

              {/* Action buttons */}
              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer size={12} />
                  <span>PRINT VOUCHER</span>
                </button>
                <button
                  onClick={() => simulateDownload(`Tax Receipt ${selectedReceipt.id}`)}
                  disabled={!!downloadingDoc}
                  className="flex-1 py-3 bg-emerald-900 hover:bg-emerald-850 text-white font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download size={12} />
                  <span>DOWNLOAD PDF RECEIPT</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUBSCRIPTION TRANSACTION PROGRESS MODAL */}
      <AnimatePresence>
        {showSponsorshipModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border text-left p-6 ${
                highContrast ? 'bg-black border-white text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-[10px] font-mono font-black text-amber-500 uppercase tracking-widest">
                  Secure Checkout Mandate
                </span>
                <button 
                  onClick={() => setShowSponsorshipModal(false)}
                  className="p-1 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {checkoutStep === 'plan' && (
                <div className="space-y-6 pt-4 text-xs font-mono">
                  <div className="space-y-2">
                    <p className="text-slate-400">Selected Plan: <strong className="text-slate-800 dark:text-white">{sponsorshipPlan}</strong></p>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white">₹{sponsorshipAmount.toLocaleString('en-IN')} INR</h4>
                    <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                      This transaction is handled securely within Raita Mitra's sandbox environment. No actual banking credentials will be charged.
                    </p>
                  </div>

                  <div className="space-y-2 text-left text-xs font-sans">
                    <label htmlFor="modal-payment-method" className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Select Gateway Channel</label>
                    <select
                      id="modal-payment-method"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs focus:ring-1 focus:ring-emerald-950 focus:outline-none"
                    >
                      <option value="upi">Razorpay Unified UPI Payment</option>
                      <option value="card">Stripe Credit/Debit Card Secure Vault</option>
                      <option value="netbanking">Net Banking Portal</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setCheckoutStep('payment')}
                    className="w-full py-3 bg-emerald-900 hover:bg-emerald-850 text-white font-bold rounded-xl text-center cursor-pointer"
                  >
                    PROCEED TO PAYMENT SIMULATION
                  </button>
                </div>
              )}

              {checkoutStep === 'payment' && (
                <div className="space-y-6 pt-4 text-center font-mono">
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-700 border-t-transparent animate-spin mx-auto" />
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-slate-800 uppercase animate-pulse">Securing SSL Handshake Node...</h5>
                    <p className="text-[9px] text-slate-400">Merchant: Raita Mitra Social Trust • Sandbox Clearance</p>
                  </div>

                  <button
                    onClick={() => {
                      // Add simulated transaction to local history representation
                      const newTx = {
                        id: 'tx_' + Math.floor(Math.random() * 900 + 100),
                        date: new Date().toISOString().split('T')[0],
                        amount: sponsorshipAmount,
                        method: paymentMethod.toUpperCase(),
                        campaign: sponsorshipPlan,
                        status: 'Cleared',
                        receiptId: 'RMST/80G/' + new Date().getFullYear() + '/' + Math.floor(Math.random() * 9000 + 1000)
                      };
                      DONATION_HISTORY_DATA.unshift(newTx);
                      setCurrentUser(prev => ({
                        ...prev,
                        totalContributed: prev.totalContributed + sponsorshipAmount,
                        impactScore: prev.impactScore + Math.floor(sponsorshipAmount / 50)
                      }));
                      setCheckoutStep('done');
                    }}
                    className="w-full py-3 bg-emerald-900 hover:bg-emerald-850 text-white font-bold rounded-xl text-xs cursor-pointer text-center"
                  >
                    ⚡ BYPASS & CONFIRM SIMULATED PAYMENT
                  </button>
                </div>
              )}

              {checkoutStep === 'done' && (
                <div className="space-y-6 pt-4 text-center font-mono">
                  <div className="p-3 bg-emerald-100 text-emerald-800 rounded-full inline-block">
                    <CheckCircle size={32} />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold text-slate-900">Subscription Mandate Activated!</h5>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                      Thank you! Your simulated giving plan has been safely recorded. Your custom tax statement and appreciation badges have been upgraded.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border text-left text-[10px] space-y-1">
                    <p><strong>Allocated Campaign:</strong> {sponsorshipPlan}</p>
                    <p><strong>Amount cleared:</strong> ₹{sponsorshipAmount.toLocaleString()}</p>
                    <p><strong>Receipt Status:</strong> Dispatching to {currentUser.email}</p>
                  </div>

                  <button
                    onClick={() => setShowSponsorshipModal(false)}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer text-center"
                  >
                    RETURN TO DASHBOARD
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
