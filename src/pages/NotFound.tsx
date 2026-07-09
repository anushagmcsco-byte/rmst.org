import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Leaf, 
  Heart, 
  Phone, 
  Search, 
  Building2, 
  ShieldCheck, 
  Users, 
  Coins, 
  MessageCircle, 
  Mail, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  ArrowRight, 
  ChevronRight, 
  AlertCircle, 
  Compass, 
  Sparkles,
  CheckCircle,
  HelpCircle,
  X
} from 'lucide-react';

interface NotFoundProps {
  setActivePage: (page: string) => void;
  highContrast?: boolean;
}

export default function NotFound({ setActivePage, highContrast = false }: NotFoundProps) {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any[] | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'FCRA Registration', 'Soil Health Card', 'Women Empowerment SHG', 'Donate Online'
  ]);

  // Newsletter state
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Animated counters state
  const [counts, setCounts] = useState({ farmers: 0, youth: 0, livelihoods: 0 });

  // Simulated AI smart search suggestions
  const [smartSuggestions, setSmartSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Staggered counter increment simulation
    const interval = setInterval(() => {
      setCounts(prev => {
        const nextFarmers = prev.farmers < 5000 ? prev.farmers + 125 : 5000;
        const nextYouth = prev.youth < 3000 ? prev.youth + 75 : 3000;
        const nextLivelihoods = prev.livelihoods < 1500 ? prev.livelihoods + 38 : 1500;
        if (nextFarmers === 5000 && nextYouth === 3000 && nextLivelihoods === 1500) {
          clearInterval(interval);
        }
        return { farmers: nextFarmers, youth: nextYouth, livelihoods: nextLivelihoods };
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Update suggestions based on typing (AI Search Recommendation simulation)
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const suggestions = [
        `How to donate to ${searchQuery}`,
        `Research studies regarding ${searchQuery}`,
        `Volunteering for ${searchQuery} programs`,
        `Careers related to ${searchQuery}`
      ];
      setSmartSuggestions(suggestions);
    } else {
      setSmartSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    if (!recentSearches.includes(searchQuery.trim())) {
      setRecentSearches(prev => [searchQuery.trim(), ...prev.slice(0, 3)]);
    }

    setTimeout(() => {
      // simulated search results
      const query = searchQuery.toLowerCase();
      const results = [];
      if (query.includes('donat') || query.includes('money') || query.includes('fund') || query.includes('contribut')) {
        results.push({ title: 'Donate & Support Our Programs', page: 'donate', desc: 'Contribute to marginal farmers, lab kits, and secure sustainable resources.' });
      }
      if (query.includes('program') || query.includes('agri') || query.includes('farm') || query.includes('water')) {
        results.push({ title: 'Our Core Agricultural Programs', page: 'programs', desc: 'Sustainable on-ground training, soil laboratory testing, and seed banks.' });
      }
      if (query.includes('complain') || query.includes('legal') || query.includes('tax') || query.includes('csr') || query.includes('fcra')) {
        results.push({ title: 'CSR & Compliance Hub', page: 'compliance', desc: 'View audited NGO financial certificates, FCRA compliance, and PAN logs.' });
      }
      if (query.includes('volunt') || query.includes('join') || query.includes('intern') || query.includes('fellow')) {
        results.push({ title: 'Volunteer Registration Form', page: 'volunteer', desc: 'Join on-field activities in Hubballi, Karnataka to empower marginal farmers.' });
      }
      if (query.includes('stori') || query.includes('impact') || query.includes('succes') || query.includes('farmer')) {
        results.push({ title: 'Agrarian Success Stories', page: 'stories', desc: 'Real life video documentaries and reports from women self-help groups.' });
      }

      if (results.length === 0) {
        results.push({ title: 'General FAQs and Help Desk', page: 'faq', desc: 'Find answers regarding donations, FCRA registration, and support details.' });
        results.push({ title: 'Contact Our Main Office', page: 'contact', desc: 'Get in touch with our representative officers directly in Hubballi.' });
      }

      setSearchResult(results);
      setIsSearching(false);
    }, 800);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterName || !newsletterEmail) return;
    setNewsletterSubscribed(true);

    // POST newsletter subscription to Server backend
    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'Newsletter Signup',
        name: newsletterName,
        email: newsletterEmail,
        phone: '',
        subject: '404 Page Newsletter Signup',
        message: 'Subscribed to newsletter from the Not Found page.',
        metadata: { page: 'Not Found' }
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Not Found page newsletter signup logged:', data);
    })
    .catch(err => {
      console.error('Error logging newsletter signup:', err);
    });

    setTimeout(() => {
      setNewsletterName('');
      setNewsletterEmail('');
    }, 3500);
  };

  return (
    <div className={`w-full overflow-hidden ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* HERO SECTION: Centered Layout with nature pattern gradient */}
      <section className="relative min-h-[500px] flex flex-col items-center justify-center py-20 px-4 text-center overflow-hidden">
        {/* Abstract Background nature SVG overlay */}
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50 z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Large Animated 404 Digits */}
          <div className="flex justify-center items-center gap-1.5 md:gap-3">
            <motion.span 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="text-7xl md:text-9xl font-display font-extrabold text-slate-950 select-none tracking-tighter"
            >
              4
            </motion.span>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="w-16 h-16 md:w-24 md:h-24 text-emerald-600 flex items-center justify-center"
            >
              <Compass size={80} className="w-16 h-16 md:w-24 md:h-24 stroke-[1.5]" />
            </motion.div>
            <motion.span 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15, type: 'spring' }}
              className="text-7xl md:text-9xl font-display font-extrabold text-slate-950 select-none tracking-tighter"
            >
              4
            </motion.span>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold bg-emerald-100/60 px-3.5 py-1 rounded-full">
              Oops! Page Not Found
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">
              Oops! We Couldn't Find That Page
            </h1>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              But don't worry — there are many ways to continue creating impact. Let's get you back on the right path.
            </p>
          </div>

          {/* Lottie fallback graphic: Farmers, trees & community path finding */}
          <div className="py-4 flex justify-center">
            <div className="w-full max-w-md p-4 bg-white/60 border border-slate-100 rounded-2xl shadow-sm relative overflow-hidden backdrop-blur-xs flex flex-col items-center">
              <svg viewBox="0 0 400 160" className="w-full h-32 text-emerald-600 stroke-[1.5] fill-none">
                {/* Hills / Fields */}
                <path d="M0 130 C120 100, 200 150, 400 120" stroke="#10b981" strokeWidth="2" />
                <path d="M0 145 C150 130, 250 160, 400 135" stroke="#047857" strokeWidth="1.5" />
                
                {/* Farmer icon / abstract trees */}
                <g transform="translate(70, 85)">
                  <circle cx="10" cy="10" r="5" fill="#f59e0b" />
                  <path d="M5 25 L15 25 L18 45 L2 45 Z" fill="#3b82f6" />
                  {/* hoe tool */}
                  <line x1="12" y1="20" x2="25" y2="40" stroke="#78350f" strokeWidth="2" />
                  <line x1="23" y1="38" x2="28" y2="35" stroke="#9ca3af" strokeWidth="3" />
                </g>

                <g transform="translate(300, 75)">
                  <polygon points="15,0 0,30 30,30" fill="#059669" />
                  <polygon points="15,15 5,40 25,40" fill="#047857" />
                  <rect x="13" y="40" width="4" height="10" fill="#78350f" />
                </g>

                {/* Dotted path leading to a home */}
                <path d="M100 132 C150 120, 220 110, 270 125" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
                <g transform="translate(265, 100)">
                  <rect x="5" y="15" width="20" height="15" fill="#0284c7" />
                  <polygon points="15,2 2,15 28,15" fill="#e11d48" />
                </g>

                {/* Sun */}
                <circle cx="340" cy="30" r="12" fill="#fbbf24" opacity="0.8" />
              </svg>
              <div className="absolute top-2 left-3 flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                <Sparkles size={11} className="text-gold" />
                <span>Navigating Raita Mitra Social Trust (R)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIMARY ACTIONS SECTION: Large CTA Buttons */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setActivePage('home')}
            className="p-4 bg-white border border-slate-150 rounded-2xl shadow-xs text-center hover:border-emerald-600 hover:bg-emerald-50/20 transition-all flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl group-hover:bg-emerald-100 transition-colors">
              <Home size={22} />
            </div>
            <span className="text-xs font-bold text-slate-800">Go To Homepage</span>
          </button>

          <button 
            onClick={() => setActivePage('programs')}
            className="p-4 bg-white border border-slate-150 rounded-2xl shadow-xs text-center hover:border-emerald-600 hover:bg-emerald-50/20 transition-all flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl group-hover:bg-emerald-100 transition-colors">
              <Leaf size={22} />
            </div>
            <span className="text-xs font-bold text-slate-800">Explore Programs</span>
          </button>

          <button 
            onClick={() => setActivePage('stories')}
            className="p-4 bg-white border border-slate-150 rounded-2xl shadow-xs text-center hover:border-emerald-600 hover:bg-emerald-50/20 transition-all flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl group-hover:bg-emerald-100 transition-colors">
              <Heart size={22} />
            </div>
            <span className="text-xs font-bold text-slate-800">Impact Stories</span>
          </button>

          <button 
            onClick={() => setActivePage('contact')}
            className="p-4 bg-white border border-slate-150 rounded-2xl shadow-xs text-center hover:border-emerald-600 hover:bg-emerald-50/20 transition-all flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl group-hover:bg-emerald-100 transition-colors">
              <Phone size={22} />
            </div>
            <span className="text-xs font-bold text-slate-800">Contact Us</span>
          </button>
        </div>
      </section>

      {/* SEARCH SECTION: Centered Search Bar with AISearch Simulator */}
      <section className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-bold flex items-center justify-center gap-1">
              <Sparkles size={11} className="text-amber-500" /> Smart AI Search Engine
            </span>
            <h3 className="text-base md:text-lg font-display font-bold text-slate-900">Search The Website</h3>
          </div>

          <form onSubmit={handleSearch} className="relative">
            <input 
              type="text"
              placeholder="Search programs, articles, reports or events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-5 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900"
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors cursor-pointer"
            >
              <Search size={16} />
            </button>
          </form>

          {/* AI Search Suggestions */}
          <AnimatePresence>
            {smartSuggestions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1.5 overflow-hidden"
              >
                <span className="text-[10px] font-mono text-slate-400 block font-bold">Recommended Topics</span>
                <div className="flex flex-wrap gap-2">
                  {smartSuggestions.map((suggestion, idx) => (
                    <button 
                      key={idx}
                      type="button"
                      onClick={() => setSearchQuery(suggestion)}
                      className="text-[10px] px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recent Searches */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] font-mono text-slate-400 font-bold mr-1">Recent Searches:</span>
            {recentSearches.map((term, idx) => (
              <button 
                key={idx}
                type="button"
                onClick={() => setSearchQuery(term)}
                className="text-[10px] px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-md transition-colors cursor-pointer border border-slate-100"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Search Result Simulator */}
          <AnimatePresence mode="wait">
            {isSearching ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-4 text-xs font-mono text-slate-500"
              >
                Searching secure compliance and database folders...
              </motion.div>
            ) : searchResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3"
              >
                <div className="flex justify-between items-center border-b pb-2 text-[10px] font-mono text-slate-400">
                  <span>Simulated Results for "{searchQuery}"</span>
                  <button onClick={() => setSearchResult(null)} className="hover:text-slate-900 cursor-pointer"><X size={12} /></button>
                </div>
                <div className="space-y-3">
                  {searchResult.map((res, idx) => (
                    <div key={idx} className="space-y-1 text-left">
                      <button 
                        onClick={() => setActivePage(res.page)}
                        className="text-xs font-bold text-emerald-700 hover:underline hover:text-emerald-800 font-display flex items-center gap-1.5"
                      >
                        {res.title} <ArrowRight size={10} />
                      </button>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{res.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* POPULAR PAGES SECTION: Glass Cards */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Secure Routes</span>
            <h2 className="text-2xl font-display font-bold text-slate-900">Popular Destinations</h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto">
              Skip the search and jump directly to our most accessed administrative or operational portals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "About Us", icon: Building2, desc: "Learn about the mission, founding history, and active board of trustees governing our activities.", page: 'about' },
              { title: "Our Programs", icon: Leaf, desc: "Browse detail matrices regarding seed labs, rainwater catchments, and marginal training events.", page: 'programs' },
              { title: "CSR & Compliance Hub", icon: ShieldCheck, desc: "Review 12A, 80G, FCRA registration files, audited tax sheets, and administrative logs.", page: 'compliance' },
              { title: "Impact Stories", icon: Heart, desc: "Read certified case stories and view video progress tracks from local Karnataka communities.", page: 'stories' },
              { title: "Donate & Support Us", icon: Coins, desc: "Configure tax-deductible contributions securely via Razorpay or direct bank transfer logs.", page: 'donate' },
              { title: "Volunteer With Us", icon: Users, desc: "Submit on-field fellowship applications, intern credentials, and check code criteria.", page: 'volunteer' }
            ].map((dest, idx) => (
              <button 
                key={idx}
                onClick={() => setActivePage(dest.page)}
                className="p-5 rounded-2xl bg-white border border-slate-100 flex flex-col items-start text-left gap-3 hover:border-emerald-600 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="p-2.5 rounded-xl bg-slate-50 text-emerald-700 group-hover:bg-emerald-50 transition-colors">
                  <dest.icon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xs md:text-sm font-display flex items-center gap-1.5">
                    {dest.title} <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600" />
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">{dest.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK LINKS SECTION: Horizontal Links */}
      <section className="max-w-4xl mx-auto px-4 py-8 border-t border-b border-slate-200/60">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Useful Quicklinks:</span>
          {[
            { label: 'Home', id: 'home' },
            { label: 'About Us', id: 'about' },
            { label: 'Programs', id: 'programs' },
            { label: 'Gallery', id: 'gallery' },
            { label: 'Blog', id: 'blog' },
            { label: 'Events', id: 'events' },
            { label: 'Contact Us', id: 'contact' }
          ].map((lnk, idx) => (
            <button 
              key={idx}
              onClick={() => setActivePage(lnk.id)}
              className="text-xs text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium cursor-pointer"
            >
              {lnk.label}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED PROGRAMS SECTION: Focus Areas with Images */}
      <section className="max-w-7xl mx-auto px-4 py-16 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">What We Do</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Explore Our Focus Areas</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Our social trust executes strategic, multi-layered operations across Karnataka to empower marginal agrarian families.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Sustainable Agriculture", desc: "Scientific soil-testing kits, eco-balanced seed distribution, and weather resilience workshops.", img: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&q=80&w=400" },
            { title: "Women Empowerment", desc: "Setting up robust self-help groups, micro-financing structures, and digital business tools.", img: "https://images.unsplash.com/photo-1508847154043-be12a62861c1?auto=format&fit=crop&q=80&w=400" },
            { title: "Education & AI Skills", desc: "Empowering rural students with computers, coding literacy, and modern agrarian tech tools.", img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=400" },
            { title: "Climate Action", desc: "Coordinating major afforestation programs, water catchment models, and solar setups.", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400" }
          ].map((item, idx) => (
            <div key={idx} className="group rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-3xs hover:border-emerald-600 hover:shadow-2xs transition-all flex flex-col justify-between">
              <div className="h-40 overflow-hidden relative">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-65" />
                <span className="absolute bottom-3 left-4 text-white font-bold font-display text-sm leading-tight">{item.title}</span>
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow space-y-4">
                <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                <button 
                  onClick={() => setActivePage('programs')}
                  className="w-full py-2 bg-slate-50 group-hover:bg-emerald-50 text-slate-800 group-hover:text-emerald-800 text-[10px] font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Learn Details</span>
                  <ArrowRight size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACT METRICS SECTION: Animated Counters */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-1">
            <span className="text-3xl md:text-5xl font-mono font-bold text-gold">{counts.farmers}+</span>
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block font-bold">Farmers Empowered</span>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">Providing advanced testing tools and water storage structures directly to marginal growers.</p>
          </div>

          <div className="space-y-1">
            <span className="text-3xl md:text-5xl font-mono font-bold text-gold">{counts.youth}+</span>
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block font-bold">Youth Trained</span>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">Delivering modern technology skills, code literacy, and computer literacy modules.</p>
          </div>

          <div className="space-y-1">
            <span className="text-3xl md:text-5xl font-mono font-bold text-gold">{counts.livelihoods}+</span>
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block font-bold">Livelihoods Supported</span>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">Helping families scale with microfinance SHG logs and direct market links.</p>
          </div>
        </div>
      </section>

      {/* QUOTE SECTION: Centered Quote Card */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white/80 border border-slate-150 rounded-3xl p-8 text-center relative overflow-hidden shadow-2xs backdrop-blur-xs">
          {/* Subtle background circles */}
          <div className="absolute -left-10 -top-10 w-32 h-32 bg-emerald-100 rounded-full filter blur-xl opacity-40 pointer-events-none" />
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-100 rounded-full filter blur-xl opacity-40 pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <span className="text-slate-300 font-serif text-6xl leading-none select-none block h-6">“</span>
            <blockquote className="text-base md:text-lg font-display font-medium text-slate-800 leading-relaxed max-w-2xl mx-auto italic">
              Every path may not lead where expected, but every step can still create impact.
            </blockquote>
            <span className="text-xs font-mono text-emerald-700 font-bold block uppercase tracking-wider">
              — Raita Mitra Social Trust (R)
            </span>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION: Stay Connected */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white border border-slate-150 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
          <div className="space-y-2 md:w-1/2 text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Stay Connected</span>
            <h3 className="text-lg md:text-xl font-display font-bold text-slate-900">Subscribe For Monthly Updates</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Get direct summaries of our village soil-preservation drives, CSR compliance files, and new symposium timelines.
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input 
                type="text" 
                placeholder="Your Name"
                required
                value={newsletterName}
                onChange={(e) => setNewsletterName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900"
              />
              <input 
                type="email" 
                placeholder="Email Address"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900"
              />
              <button 
                type="submit"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Join Monthly Bulletin
              </button>
            </form>

            <AnimatePresence>
              {newsletterSubscribed && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2.5 p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-[11px] flex items-center gap-2"
                >
                  <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                  <span>Success! You have subscribed to the Raita Mitra bulletin list.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION: Quick Support Cards */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-start gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <Phone size={16} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">Call Us</span>
              <a href="tel:+917676376221" className="text-xs text-slate-850 font-bold hover:underline">+91 76763 76221</a>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-start gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <Mail size={16} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">Email Us</span>
              <a href="mailto:contact@raitamitrasocialtrust.org" className="text-xs text-slate-850 font-bold hover:underline">contact@raitamitrasocialtrust.org</a>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-start gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <MessageCircle size={16} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">WhatsApp Helpline</span>
              <span className="text-xs text-slate-800 font-bold">Instant Assistance Desk</span>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL SECTION: Follow Our Journey */}
      <section className="max-w-4xl mx-auto px-4 pb-20 text-center space-y-4">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-bold">Follow Our Journey</span>
        <div className="flex items-center justify-center gap-4">
          {[
            { icon: Facebook, label: 'Facebook', url: '#' },
            { icon: Instagram, label: 'Instagram', url: '#' },
            { icon: Linkedin, label: 'LinkedIn', url: '#' },
            { icon: Youtube, label: 'YouTube', url: '#' }
          ].map((soc, idx) => (
            <a 
              key={idx} 
              href={soc.url}
              aria-label={soc.label}
              className="p-2.5 bg-white border border-slate-150 rounded-xl text-slate-600 hover:text-emerald-700 hover:border-emerald-600 transition-all shadow-3xs"
            >
              <soc.icon size={16} />
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER CTA SECTION */}
      <section className="relative py-20 bg-emerald-950 text-white overflow-hidden text-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1200" 
            alt="Sustainability and crop density patterns" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 to-slate-950 z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Let's Continue Creating Impact Together</h2>
          <p className="text-sm md:text-base text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
            Every step we make coordinates sustainable changes. Join us in setting up seed laboratory networks, training programs, and women SHG hubs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActivePage('contact')}
              className="px-6 py-3 bg-gold hover:bg-yellow-500 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Partner With Us
            </button>
            <button
              onClick={() => setActivePage('donate')}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Donate Now
            </button>
            <button
              onClick={() => setActivePage('volunteer')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Become A Volunteer
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
