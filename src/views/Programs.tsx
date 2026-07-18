import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Users, 
  Laptop, 
  HeartPulse, 
  Trees, 
  BriefcaseBusiness,
  ArrowRight, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Award, 
  ShieldAlert, 
  Target, 
  Zap, 
  MapPin, 
  Compass, 
  GitCommit,
  Layers,
  LineChart,
  Grid,
  TrendingUp,
  Mail,
  Download,
  Activity,
  Heart
} from 'lucide-react';
import { programsData } from '../data/programs';

interface ProgramsProps {
  setActivePage: (page: string) => void;
  highContrast: boolean;
}

export default function Programs({ setActivePage, highContrast }: ProgramsProps) {
  // State for the expandable program deep dives
  const [expandedProgram, setExpandedProgram] = useState<string | null>('agriculture');
  
  // State for the Interactive Infographics Suite
  const [activeInfographic, setActiveInfographic] = useState<string>('change');

  // State for the district map hover in infographic
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  // Focus Area Icon mapping
  const focusIcons: Record<string, any> = {
    agriculture: Leaf,
    women: Users,
    education: Laptop,
    health: HeartPulse,
    climate: Trees,
    entrepreneurship: BriefcaseBusiness
  };

  const slugMap: Record<string, string> = {
    agriculture: 'sustainable-agriculture',
    women: 'women-empowerment',
    education: 'education-ai-skills',
    health: 'health-nutrition',
    climate: 'climate-action',
    entrepreneurship: 'rural-entrepreneurship'
  };

  // SDG icons map to render colors/labels beautifully
  const sdgMetadata: Record<string, { label: string; color: string; number: number }> = {
    'SDG 1': { label: 'No Poverty', color: 'bg-rose-600 text-white', number: 1 },
    'SDG 2': { label: 'Zero Hunger', color: 'bg-amber-600 text-white', number: 2 },
    'SDG 3': { label: 'Good Health & Well-being', color: 'bg-emerald-600 text-white', number: 3 },
    'SDG 4': { label: 'Quality Education', color: 'bg-red-700 text-white', number: 4 },
    'SDG 5': { label: 'Gender Equality', color: 'bg-orange-500 text-white', number: 5 },
    'SDG 6': { label: 'Clean Water & Sanitation', color: 'bg-sky-500 text-white', number: 6 },
    'SDG 8': { label: 'Decent Work & Economic Growth', color: 'bg-red-800 text-white', number: 8 },
    'SDG 13': { label: 'Climate Action', color: 'bg-emerald-800 text-white', number: 13 },
    'SDG 15': { label: 'Life on Land', color: 'bg-lime-600 text-white', number: 15 },
  };

  // Static definition of aligned SDGs requested by the prompt
  const alignedSDGs = [
    { title: "No Poverty", number: 1, desc: "End poverty in all its forms everywhere by building rural financial buffers.", color: "border-rose-500 bg-rose-50/10 text-rose-600" },
    { title: "Zero Hunger", number: 2, desc: "Achieve food security, improve nutrition, and promote regenerative farming.", color: "border-amber-500 bg-amber-50/10 text-amber-600" },
    { title: "Good Health & Well-being", number: 3, desc: "Ensure healthy lives and promote well-being with localized diagnostic clinics.", color: "border-emerald-500 bg-emerald-50/10 text-emerald-600" },
    { title: "Quality Education", number: 4, desc: "Ensure inclusive and equitable quality digital, STEM, and AI foundational education.", color: "border-red-600 bg-red-50/10 text-red-600" },
    { title: "Gender Equality", number: 5, desc: "Empower all women and girls via local SHGs, micro-grants, and dairy loops.", color: "border-orange-500 bg-orange-50/10 text-orange-600" },
    { title: "Clean Water & Sanitation", number: 6, desc: "Ensure sustainable management of water through desilting and watershed works.", color: "border-sky-500 bg-sky-50/10 text-sky-600" },
    { title: "Decent Work & Economic Growth", number: 8, desc: "Promote sustained, inclusive, and productive employment via rural start-ups.", color: "border-red-800 bg-red-50/10 text-red-800" },
    { title: "Climate Action", number: 13, desc: "Take urgent action to combat climate change using resilient Miyawaki forestry.", color: "border-emerald-800 bg-emerald-50/10 text-emerald-800" },
    { title: "Life on Land", number: 15, desc: "Protect, restore and promote sustainable use of terrestrial dryland ecosystems.", color: "border-lime-600 bg-lime-50/10 text-lime-600" }
  ];

  const toggleExpandProgram = (id: string) => {
    if (expandedProgram === id) {
      setExpandedProgram(null);
    } else {
      setExpandedProgram(id);
    }
  };

  return (
    <div className="w-full relative overflow-x-hidden" id="programs-focus-areas-container">
      
      {/* 1. HERO SECTION (WIDE BANNER LAYOUT WITH GRADIENT OVERLAY) */}
      <section className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center py-20 px-4 md:px-8 bg-slate-950 text-white overflow-hidden" id="programs-hero">
        
        {/* Background Visual representation of programs */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1600" 
            alt="Karnataka farmers working in fields"
            className="w-full h-full object-cover opacity-20 filter grayscale scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Fallback pattern overlay */}
          <div className="absolute inset-0 bg-radial-gradient from-forest/30 via-slate-950/80 to-slate-950 pointer-events-none"></div>
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>

        {/* Content Area */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          
          {/* Breadcrumb navigation */}
          <div className="flex items-center justify-center gap-2 text-[10px] md:text-xs font-mono uppercase tracking-widest text-slate-400">
            <button onClick={() => setActivePage('home')} className="hover:text-gold transition-colors cursor-pointer">Home</button>
            <span>/</span>
            <span className="text-gold font-bold">Programs & Focus Areas</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-[10px] md:text-xs uppercase font-mono tracking-widest text-gold bg-gold/10 px-3.5 py-1.5 rounded-full font-extrabold border border-gold/20 inline-block">
              INTEGRATED COMMUNITY DEVELOPMENT
            </span>
            
            <h1 className="font-display font-black text-3xl md:text-6xl text-white tracking-tight leading-tight max-w-4xl mx-auto">
              Transforming Communities Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-emerald-400 to-emerald-200">Sustainable Programs</span>
            </h1>
            
            <p className="text-slate-300 text-xs md:text-lg font-sans max-w-3xl mx-auto leading-relaxed">
              Creating measurable impact across Karnataka through agriculture, education, women empowerment, health, climate action and entrepreneurship.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <a href="#focus-areas-grid" className="px-6 py-3 bg-forest text-white hover:bg-forest-light text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2">
              <span>View Six Focus Areas</span>
              <ArrowRight size={14} />
            </a>
            <a href="#impact-dashboard" className="px-6 py-3 border border-slate-700 bg-white/5 backdrop-blur hover:bg-white/10 text-xs font-bold rounded-xl transition-all">
              Impact Dashboard
            </a>
          </div>

        </div>
      </section>

      {/* 2. OVERVIEW SECTION (SPLIT SCREEN LAYOUT) */}
      <section className={`py-20 px-4 md:px-8 border-b border-slate-100 ${
        highContrast ? 'bg-black text-white border-white' : 'bg-white'
      }`} id="programs-overview">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Collage representation of 6 programs */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-square shadow-md transform hover:scale-[1.02] transition-transform duration-300">
                  <img src="https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=300" alt="Sustainable Agriculture" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-md transform hover:scale-[1.02] transition-transform duration-300">
                  <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=300" alt="Women Empowerment" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-md transform hover:scale-[1.02] transition-transform duration-300">
                  <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=300" alt="Students learning computers" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square shadow-md transform hover:scale-[1.02] transition-transform duration-300">
                  <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=300" alt="Tree planting" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
            
            {/* Absolute overlay badge with trust stamp */}
            <div className={`absolute -bottom-6 -right-6 p-4 rounded-2xl shadow-xl flex items-center gap-3 border ${
              highContrast ? 'bg-black border-white' : 'bg-forest text-white border-forest'
            }`}>
              <Award className="text-gold" size={24} />
              <div className="text-left">
                <p className="text-[10px] uppercase font-mono tracking-wider opacity-85">Raita Mitra</p>
                <p className="text-xs font-bold">SDG Integrated Model</p>
              </div>
            </div>
          </div>

          {/* Right Side: Professional overview content */}
          <div className="lg:col-span-7 text-left space-y-6 lg:pl-6">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Integrated Development Strategy</span>
            
            <h2 className={`font-display font-black text-2xl md:text-4xl leading-tight ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Integrated Community Development Model
            </h2>
            
            <div className="w-16 h-1 bg-gold rounded-full"></div>

            <p className="text-slate-600 dark:text-slate-300 text-xs md:text-base leading-relaxed font-sans">
              Raita Mitra Social Trust (R) addresses interconnected social and economic challenges through a holistic approach that strengthens livelihoods, improves access to opportunities, and builds resilient communities.
            </p>

            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed font-sans">
              Rather than tackling agrarian poverty or child literacy in isolation, we build multi-layered structures: where soil health testing lowers input costs, enabling families to reinvest in female micro-enterprise poultry loops, while their children access high-tech AI skill-labs at local village primary schools.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3 items-start">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                  <CheckCircle size={15} />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">FCCC Audited Impact</h4>
                  <p className="text-[10px] text-slate-400">Strict regulatory oversight and real-time GIS verification.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                  <CheckCircle size={15} />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">Community Handover</h4>
                  <p className="text-[10px] text-slate-400">3-year lifecycle transition ensuring long-term self-reliance.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FOCUS AREA GRID (3 X 2 PREMIUM CARDS WITH HOVER ANIMATION) */}
      <section className={`py-20 px-4 md:px-8 border-b border-slate-100 ${
        highContrast ? 'bg-black text-white border-white' : 'bg-slate-50'
      }`} id="focus-areas-grid">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Six Pillars of Progress</span>
            <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Our Six Core Focus Areas
            </h2>
            <p className="text-slate-500 text-xs md:text-base">
              Raita Mitra works directly with smallholder farming clusters and marginalized groups across Karnataka. Select a focus area to explore our targeted programs.
            </p>
          </div>

          {/* Premium Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 'agriculture',
                title: 'Sustainable Agriculture & Farmer Empowerment',
                icon: Leaf,
                image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600',
                desc: 'Promoting soil health management, natural inputs, solar-powered micro-irrigation, and robust market ties.'
              },
              {
                id: 'women',
                title: 'Women Empowerment & Livelihoods',
                icon: Users,
                image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=600',
                desc: 'Strengthening women-led livelihoods, financial literacy, micro-credit structures, and dairy cooperatives.'
              },
              {
                id: 'education',
                title: 'Education, Digital & AI Skills',
                icon: Laptop,
                image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600',
                desc: 'Preparing youth for tomorrow through tech-bootcamps, interactive smart labs, and introductory AI training.'
              },
              {
                id: 'health',
                title: 'Health, Nutrition & Community Well-being',
                icon: HeartPulse,
                image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
                desc: 'Preventive healthcare clinics, hemoglobin anemia drives, maternal counseling, and backyard organic nutrition.'
              },
              {
                id: 'climate',
                title: 'Environment & Climate Action',
                icon: Trees,
                image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600',
                desc: 'Conserving vital resources through Miyawaki dense micro-afforestation, rainwater systems, and dry lake desilting.'
              },
              {
                id: 'entrepreneurship',
                title: 'Livelihoods & Rural Entrepreneurship',
                icon: BriefcaseBusiness,
                image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600',
                desc: 'Supporting micro-mills, solar cold storages, local value-addition processing, and offline wholesale markets.'
              }
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div 
                  key={card.id}
                  className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-2xl flex flex-col text-left ${
                    highContrast 
                      ? 'bg-black border-white text-white hover:bg-zinc-900' 
                      : 'bg-white border-slate-100 shadow-md hover:border-forest/20'
                  }`}
                >
                  {/* Card Visual Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    
                    {/* Floating Icon */}
                    <div className="absolute top-4 left-4 p-3 bg-white/15 backdrop-blur-md text-white rounded-2xl border border-white/20">
                      <Icon size={20} className="stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className={`font-display font-extrabold text-sm md:text-base tracking-tight leading-tight group-hover:text-gold transition-colors ${
                        highContrast ? 'text-white' : 'text-slate-800'
                      }`}>
                        {card.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px] md:text-xs leading-relaxed font-sans">
                        {card.desc}
                      </p>
                    </div>

                    <button 
                      onClick={() => setActivePage(`programs/${slugMap[card.id] || card.id}`)}
                      className={`w-full py-2.5 rounded-xl border text-center text-xs font-extrabold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                        highContrast 
                          ? 'border-white hover:bg-white hover:text-black' 
                          : 'border-slate-200 text-forest hover:bg-forest hover:text-white hover:border-forest'
                      }`}
                    >
                      <span>Explore Program</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. EXPANDABLE PROGRAM DEEP DIVES (REUSABLE, EASILY EXPANDED FOR FUTURE PROGRAMS) */}
      <section className={`py-20 px-4 md:px-8 border-b border-slate-100 ${
        highContrast ? 'bg-black text-white border-white' : 'bg-white'
      }`} id="detailed-programs-list">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Deep Dive Blueprints</span>
            <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Program Blueprint & Interventions
            </h2>
            <p className="text-slate-500 text-xs md:text-base">
              Explore our core methodologies, target demographics, UN Sustainable Development Goals alignment, and measurable field outputs.
            </p>
          </div>

          <div className="space-y-6 max-w-5xl mx-auto">
            {programsData.map((prog) => {
              const isExpanded = expandedProgram === prog.id;
              const Icon = focusIcons[prog.id] || Leaf;

              // Customize SDG tags for each program since some don't have tags in standard data
              const mappedSDGs = prog.id === 'agriculture' ? ['SDG 1', 'SDG 2', 'SDG 13']
                               : prog.id === 'women' ? ['SDG 5', 'SDG 8']
                               : prog.id === 'education' ? ['SDG 4', 'SDG 8']
                               : prog.id === 'health' ? ['SDG 3']
                               : prog.id === 'climate' ? ['SDG 6', 'SDG 13', 'SDG 15']
                               : ['SDG 1', 'SDG 8'];

              return (
                <div 
                  key={prog.id}
                  id={`program-${prog.id}`}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? highContrast ? 'border-white bg-zinc-950' : 'border-forest/20 shadow-lg bg-slate-50/40'
                      : highContrast ? 'border-white/50 bg-black' : 'border-slate-100 bg-white hover:bg-slate-50/50'
                  }`}
                >
                  {/* Collapsed Header Trigger */}
                  <button
                    onClick={() => toggleExpandProgram(prog.id)}
                    className="w-full text-left p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex gap-4 items-center">
                      <div className={`p-3 rounded-2xl shrink-0 ${
                        isExpanded 
                          ? 'bg-forest text-white' 
                          : 'bg-slate-100 text-slate-500 dark:bg-zinc-800'
                      }`}>
                        <Icon size={20} className="stroke-[2.5]" />
                      </div>
                      <div className="space-y-1 text-left">
                        <h3 className="font-display font-black text-sm md:text-lg leading-tight text-slate-800 dark:text-white">
                          {prog.title}
                        </h3>
                        <p className="text-slate-400 text-[10px] md:text-xs font-sans line-clamp-1 max-w-xl">
                          {prog.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                      <div className="flex gap-1.5">
                        {mappedSDGs.map((sdg) => {
                          const meta = sdgMetadata[sdg];
                          return (
                            <span 
                              key={sdg}
                              title={meta?.label}
                              className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded shrink-0 ${
                                meta?.color || 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              Goal {meta?.number}
                            </span>
                          );
                        })}
                      </div>
                      
                      <div className="p-1 rounded-full text-slate-400">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content Drawer */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-slate-100 dark:border-zinc-800 overflow-hidden text-left"
                      >
                        <div className="p-6 md:p-8 space-y-8">
                          
                          {/* Banner & Text Block */}
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            
                            <div className="lg:col-span-4 aspect-video sm:aspect-[21/9] lg:aspect-square rounded-2xl overflow-hidden bg-slate-100">
                              <img 
                                src={prog.image} 
                                alt={prog.title} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            <div className="lg:col-span-8 space-y-4">
                              <h4 className="text-[10px] font-mono uppercase tracking-wider text-gold font-bold flex items-center gap-1.5">
                                <Activity size={14} />
                                Technical Methodology
                              </h4>
                              <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm font-sans leading-relaxed">
                                {prog.detailedOverview}
                              </p>
                              
                              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row gap-2">
                                <span className="font-mono text-[10px] uppercase font-bold text-slate-400 shrink-0">Impact Horizon:</span>
                                <span className="text-xs text-slate-600 dark:text-slate-400 font-sans">{prog.beneficiaries}</span>
                              </div>
                            </div>

                          </div>

                          {/* Infographic metrics inside section */}
                          <div className="pt-6 border-t border-slate-100 dark:border-zinc-800 space-y-4">
                            <h4 className="text-[10px] font-mono uppercase tracking-wider text-gold font-bold">
                              Intervention Performance Indices
                            </h4>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {prog.keyMetrics.map((m, idx) => (
                                <div 
                                  key={idx}
                                  className="p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-black text-center space-y-1"
                                >
                                  <p className="font-mono font-black text-lg md:text-xl text-forest dark:text-white">
                                    {m.value}
                                  </p>
                                  <p className="text-slate-400 text-[10px] leading-tight font-sans">
                                    {m.label}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* High-fidelity checklist grids */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100 dark:border-zinc-800">
                            
                            {/* Key Highlights */}
                            <div className="space-y-3">
                              <h5 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                                <CheckCircle size={13} className="text-emerald-500" />
                                Strategic Pillars
                              </h5>
                              <ul className="space-y-2 text-xs text-slate-500 font-sans leading-relaxed">
                                {prog.highlights.map((h, idx) => (
                                  <li key={idx} className="flex gap-2 items-start">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    <span>{h}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Practical Activities */}
                            <div className="space-y-3">
                              <h5 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                                <Target size={13} className="text-gold" />
                                Key Field Interventions
                              </h5>
                              <ul className="space-y-2 text-xs text-slate-500 font-sans leading-relaxed">
                                {prog.activities.map((a, idx) => (
                                  <li key={idx} className="flex gap-2 items-start">
                                    <span className="text-gold font-bold">•</span>
                                    <span>{a}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                          </div>

                          {/* Action callout bar */}
                          <div className="pt-4 flex flex-wrap justify-between items-center gap-4 bg-slate-100/50 dark:bg-zinc-900/50 p-4 rounded-2xl">
                            <span className="text-[11px] text-slate-500 font-sans">Would you like to fund or audit this specific vertical&apos;s geolocated interventions?</span>
                            <div className="flex flex-wrap gap-2">
                              <button onClick={() => setActivePage(`programs/${slugMap[prog.id] || prog.id}`)} className="px-4 py-2 bg-forest hover:bg-forest-light text-white text-[11px] font-bold rounded-lg cursor-pointer">
                                View Full Program Dashboard
                              </button>
                              <button onClick={() => setActivePage('donate')} className="px-4 py-2 bg-gold hover:bg-gold-light text-white text-[11px] font-bold rounded-lg cursor-pointer">
                                Allocate CSR Grants
                              </button>
                              <button onClick={() => setActivePage('contact')} className="px-4 py-2 border border-slate-200 bg-white dark:bg-black text-[11px] font-bold text-slate-700 dark:text-slate-300 rounded-lg cursor-pointer">
                                Audit Reports
                              </button>
                            </div>
                          </div>

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

      {/* 5. INTERACTIVE INFOGRAPHICS SUITE (PREMIUM HIGH-FIDELITY COMPONENT) */}
      <section className={`py-20 px-4 md:px-8 border-b border-slate-100 ${
        highContrast ? 'bg-black text-white border-white' : 'bg-slate-50'
      }`} id="interactive-infographics-suite">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Interactive Infographics</span>
            <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Theory of Change & Data Infrastructure
            </h2>
            <p className="text-slate-500 text-xs md:text-base">
              Raita Mitra believes in total transparency. Click through our structural infographics below to explore our flow of capital, regional coverage, annual scale, and holistic ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Infographics Sidebar Selector */}
            <div className="lg:col-span-4 space-y-2">
              {[
                { id: 'change', label: 'Theory of Change Flowchart', icon: GitCommit, desc: 'Logical pathways from donor inputs to community outcomes.' },
                { id: 'map', label: 'District Coverage Map', icon: MapPin, desc: 'Our targeted taluks and active villages in Northern Karnataka.' },
                { id: 'distribution', label: 'Beneficiary Distribution', icon: Grid, desc: 'Visual division of our empowered farming communities.' },
                { id: 'lifecycle', label: 'Program Lifecycle Model', icon: Layers, desc: 'The four-stage village baseline, training, and exit blueprint.' },
                { id: 'annual', label: 'Annual Scale-up Path', icon: LineChart, desc: 'FCCC audited trajectory of beneficiaries from 2022 to 2026.' },
                { id: 'ecosystem', label: 'Community Development Ecosystem', icon: Compass, desc: 'Nested hub-and-spoke multi-sector rural network.' }
              ].map((info) => {
                const SelectedIcon = info.icon;
                const isSelected = activeInfographic === info.id;
                return (
                  <button
                    key={info.id}
                    onClick={() => setActiveInfographic(info.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex gap-3.5 items-center ${
                      highContrast
                        ? isSelected ? 'bg-white text-black border-black' : 'bg-black text-white border-white'
                        : isSelected 
                          ? 'bg-forest/5 border-forest/20 text-forest shadow-md' 
                          : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${
                      isSelected ? 'bg-forest text-white' : 'bg-slate-100 text-slate-500 dark:bg-zinc-800'
                    }`}>
                      <SelectedIcon size={16} />
                    </div>
                    <div className="text-left space-y-0.5">
                      <p className="font-display font-extrabold text-xs">{info.label}</p>
                      <p className="text-[10px] text-slate-400 font-sans line-clamp-1">{info.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Infographics Active Display Container */}
            <div className="lg:col-span-8">
              <div className={`p-6 md:p-10 rounded-3xl border text-center flex flex-col justify-center items-center relative overflow-hidden ${
                highContrast ? 'bg-zinc-950 border-white text-white' : 'bg-white border-slate-100 shadow-xl'
              } min-h-[480px]`}>
                
                {/* 5.1 THEORY OF CHANGE */}
                {activeInfographic === 'change' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full space-y-6">
                    <div className="text-center space-y-2">
                      <h4 className="font-display font-extrabold text-base text-slate-800 dark:text-white">FCCC Theory of Change Model</h4>
                      <p className="text-slate-500 text-xs font-sans max-w-xl mx-auto">Our proven operational sequence ensuring CSR funding transforms directly into community-owned self-reliance.</p>
                    </div>

                    {/* Flowchart Node Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 relative">
                      {[
                        { step: "1. Inputs", label: "CSR Capital & Seed Assets", desc: "Corporate grants, agricultural equipment, bio-inputs, digital lab tablet kits.", color: "border-forest/20 bg-forest/5 text-forest" },
                        { step: "2. Activities", label: "Skills Training & Audits", desc: "Regenerative soil labs, micro-grid set-ups, women dairy self-reliance groups.", color: "border-gold/20 bg-gold/5 text-gold-dark" },
                        { step: "3. Outputs", label: "Sustainable Assets", desc: "Drip fields established, solar smart labs running, revolving funds deployed.", color: "border-sky-500/20 bg-sky-500/5 text-sky-600" },
                        { step: "4. Outcomes", label: "Autonomous Change", desc: "35% crop cost reduction, 94% literacy, ₹45k avg household annual savings.", color: "border-emerald-500/20 bg-emerald-500/5 text-emerald-600" }
                      ].map((node, idx) => (
                        <div key={idx} className={`p-4 rounded-2xl border text-left relative flex flex-col justify-between space-y-3 ${node.color}`}>
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono uppercase tracking-wider opacity-75 font-bold">{node.step}</span>
                            <h5 className="font-display font-black text-xs leading-tight">{node.label}</h5>
                            <p className="text-[10px] text-slate-500 leading-normal font-sans">{node.desc}</p>
                          </div>
                          {idx < 3 && (
                            <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 p-1 rounded-full bg-white dark:bg-black border border-slate-100 dark:border-zinc-800 text-slate-400">
                              <ArrowRight size={10} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 5.2 DISTRICT COVERAGE MAP */}
                {activeInfographic === 'map' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full space-y-6">
                    <div className="text-center space-y-2">
                      <h4 className="font-display font-extrabold text-base text-slate-800 dark:text-white">Active Operational Clusters</h4>
                      <p className="text-slate-500 text-xs font-sans max-w-xl mx-auto">Hover or touch a highlighted district to inspect verified agrarian metrics.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 items-center">
                      
                      {/* Stylized Interactive Map Layout */}
                      <div className="md:col-span-7 flex justify-center">
                        <svg viewBox="0 0 400 420" className="w-full max-w-[280px] h-auto drop-shadow-md">
                          {/* Map Background Base */}
                          <rect x="0" y="0" width="400" height="420" fill="none" />
                          
                          {/* Stylized Karnataka outline polygons for target districts */}
                          <path 
                            d="M 120 100 L 190 110 L 220 140 L 180 180 L 150 170 L 110 130 Z" 
                            className={`transition-colors cursor-pointer stroke-[1.5] ${
                              hoveredDistrict === 'belagavi' 
                                ? 'fill-forest/35 stroke-forest' 
                                : 'fill-slate-100 stroke-slate-300 dark:fill-zinc-900 dark:stroke-zinc-800'
                            }`}
                            onMouseEnter={() => setHoveredDistrict('belagavi')}
                            onMouseLeave={() => setHoveredDistrict(null)}
                          />
                          <text x="145" y="135" className="text-[10px] font-mono fill-slate-400 font-bold pointer-events-none">Belagavi</text>

                          <path 
                            d="M 190 110 L 250 120 L 260 160 L 230 185 L 180 180 L 220 140 Z" 
                            className={`transition-colors cursor-pointer stroke-[1.5] ${
                              hoveredDistrict === 'bagalkot' 
                                ? 'fill-forest/35 stroke-forest' 
                                : 'fill-slate-100 stroke-slate-300 dark:fill-zinc-900 dark:stroke-zinc-800'
                            }`}
                            onMouseEnter={() => setHoveredDistrict('bagalkot')}
                            onMouseLeave={() => setHoveredDistrict(null)}
                          />
                          <text x="215" y="150" className="text-[10px] font-mono fill-slate-400 font-bold pointer-events-none">Bagalkot</text>

                          <path 
                            d="M 180 180 L 230 185 L 240 230 L 200 240 L 150 215 L 150 170 Z" 
                            className={`transition-colors cursor-pointer stroke-[1.5] ${
                              hoveredDistrict === 'dharwad' 
                                ? 'fill-forest stroke-forest text-white' 
                                : 'fill-forest/20 stroke-forest/40 dark:fill-forest/10'
                            }`}
                            onMouseEnter={() => setHoveredDistrict('dharwad')}
                            onMouseLeave={() => setHoveredDistrict(null)}
                          />
                          <text x="180" y="205" className="text-[11px] font-mono fill-forest dark:fill-emerald-400 font-extrabold pointer-events-none">DHARWAD</text>

                          <path 
                            d="M 230 185 L 280 190 L 290 230 L 240 230 Z" 
                            className={`transition-colors cursor-pointer stroke-[1.5] ${
                              hoveredDistrict === 'gadag' 
                                ? 'fill-forest stroke-forest text-white' 
                                : 'fill-forest/20 stroke-forest/40 dark:fill-forest/10'
                            }`}
                            onMouseEnter={() => setHoveredDistrict('gadag')}
                            onMouseLeave={() => setHoveredDistrict(null)}
                          />
                          <text x="250" y="210" className="text-[11px] font-mono fill-forest dark:fill-emerald-400 font-extrabold pointer-events-none">GADAG</text>

                          <path 
                            d="M 150 215 L 200 240 L 220 290 L 160 280 L 130 250 Z" 
                            className={`transition-colors cursor-pointer stroke-[1.5] ${
                              hoveredDistrict === 'haveri' 
                                ? 'fill-forest stroke-forest text-white' 
                                : 'fill-forest/20 stroke-forest/40 dark:fill-forest/10'
                            }`}
                            onMouseEnter={() => setHoveredDistrict('haveri')}
                            onMouseLeave={() => setHoveredDistrict(null)}
                          />
                          <text x="165" y="260" className="text-[11px] font-mono fill-forest dark:fill-emerald-400 font-extrabold pointer-events-none">HAVERI</text>
                        </svg>
                      </div>

                      {/* Info Panel depending on district */}
                      <div className="md:col-span-5 text-left bg-slate-50 dark:bg-zinc-900/50 p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 space-y-3">
                        <span className="text-[9px] font-mono uppercase text-slate-400 font-bold">District Highlight Card</span>
                        
                        {hoveredDistrict === 'dharwad' || hoveredDistrict === null ? (
                          <div className="space-y-2">
                            <h5 className="font-display font-black text-sm text-forest dark:text-emerald-400">Dharwad Cluster</h5>
                            <ul className="text-xs text-slate-500 space-y-1.5 font-sans">
                              <li>• <strong>Marginal Farmers:</strong> 1,840+ Active</li>
                              <li>• <strong>Women SHGs:</strong> 22 Groups</li>
                              <li>• <strong>Tablet Labs:</strong> 5 School Labs</li>
                              <li>• <strong>Focus:</strong> Natural input formulation</li>
                            </ul>
                          </div>
                        ) : hoveredDistrict === 'gadag' ? (
                          <div className="space-y-2">
                            <h5 className="font-display font-black text-sm text-forest dark:text-emerald-400">Gadag Cluster</h5>
                            <ul className="text-xs text-slate-500 space-y-1.5 font-sans">
                              <li>• <strong>Marginal Farmers:</strong> 710 Active</li>
                              <li>• <strong>Women SHGs:</strong> 15 Groups</li>
                              <li>• <strong>Tablet Labs:</strong> 3 School Labs</li>
                              <li>• <strong>Focus:</strong> Miyawaki lake protection</li>
                            </ul>
                          </div>
                        ) : hoveredDistrict === 'haveri' ? (
                          <div className="space-y-2">
                            <h5 className="font-display font-black text-sm text-forest dark:text-emerald-400">Haveri Cluster</h5>
                            <ul className="text-xs text-slate-500 space-y-1.5 font-sans">
                              <li>• <strong>Marginal Farmers:</strong> 1,450 Active</li>
                              <li>• <strong>Women SHGs:</strong> 18 Groups</li>
                              <li>• <strong>Tablet Labs:</strong> 4 School Labs</li>
                              <li>• <strong>Focus:</strong> Financial dairy incubation</li>
                            </ul>
                          </div>
                        ) : (
                          <div className="space-y-1 text-slate-400">
                            <h5 className="font-display font-black text-sm text-slate-600 capitalize">{hoveredDistrict} Block</h5>
                            <p className="text-xs">Identified baseline scoping underway for future expansion clusters.</p>
                          </div>
                        )}
                        <p className="text-[9px] text-slate-400 font-mono leading-tight pt-1.5 border-t border-slate-200/60 dark:border-zinc-800/80">Active hubs indicated in bright forest green text.</p>
                      </div>

                    </div>
                  </motion.div>
                )}

                {/* 5.3 BENEFICIARY DISTRIBUTION */}
                {activeInfographic === 'distribution' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full space-y-6">
                    <div className="text-center space-y-2">
                      <h4 className="font-display font-extrabold text-base text-slate-800 dark:text-white">Active Beneficiary Distribution</h4>
                      <p className="text-slate-500 text-xs font-sans max-w-xl mx-auto">Relative proportions of targeted direct beneficiaries across our 6 operating verticals.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 items-center">
                      
                      {/* Stylized SVG Circle Donut Chart */}
                      <div className="flex justify-center">
                        <svg viewBox="0 0 200 200" className="w-full max-w-[180px] h-auto">
                          {/* Segment 1: Farmers 50% */}
                          <circle cx="100" cy="100" r="70" fill="transparent" stroke="#1E3E2B" strokeWidth="24" strokeDasharray="220 440" strokeDashoffset="0" />
                          {/* Segment 2: Youth 25% */}
                          <circle cx="100" cy="100" r="70" fill="transparent" stroke="#E6A123" strokeWidth="24" strokeDasharray="110 440" strokeDashoffset="-220" />
                          {/* Segment 3: Women SHG 15% */}
                          <circle cx="100" cy="100" r="70" fill="transparent" stroke="#0EA5E9" strokeWidth="24" strokeDasharray="66 440" strokeDashoffset="-330" />
                          {/* Segment 4: Other 10% */}
                          <circle cx="100" cy="100" r="70" fill="transparent" stroke="#10B981" strokeWidth="24" strokeDasharray="44 440" strokeDashoffset="-396" />
                          
                          {/* Center Hole */}
                          <circle cx="100" cy="100" r="58" fill={highContrast ? '#09090b' : '#ffffff'} />
                          <text x="100" y="103" textAnchor="middle" className="font-display font-black text-xs fill-slate-700 dark:fill-white">10.5K+</text>
                          <text x="100" y="115" textAnchor="middle" className="text-[7px] font-mono fill-slate-400 font-bold">TOTAL REACH</text>
                        </svg>
                      </div>

                      {/* Legend Grid */}
                      <div className="text-left space-y-3">
                        {[
                          { percent: "50%", label: "Marginal Dryland Farmers", desc: "Regenerative soil inputs, seeds and micro-grid pumps.", color: "bg-forest" },
                          { percent: "25%", label: "Rural Students & Youth", desc: "STEM toolkits, smart computers and digital AI certified labs.", color: "bg-gold" },
                          { percent: "15%", label: "Women SHG Entrepreneurs", desc: "Micro-mills and revolving loan structures.", color: "bg-sky-500" },
                          { percent: "10%", label: "Health & Well-being Group", desc: "Nutrition diagnostics, kitchen seeds and iron supplements.", color: "bg-emerald-500" }
                        ].map((legend, idx) => (
                          <div key={idx} className="flex gap-3 items-start">
                            <div className={`w-3 h-3 rounded-full shrink-0 mt-1 ${legend.color}`}></div>
                            <div className="space-y-0.5">
                              <p className="font-display font-black text-xs text-slate-800 dark:text-white flex gap-1.5">
                                <span>{legend.percent}</span>
                                <span className="text-slate-400 font-sans font-normal">|</span>
                                <span>{legend.label}</span>
                              </p>
                              <p className="text-[10px] text-slate-400 leading-normal font-sans">{legend.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  </motion.div>
                )}

                {/* 5.4 PROGRAM LIFECYCLE MODEL */}
                {activeInfographic === 'lifecycle' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full space-y-6">
                    <div className="text-center space-y-2">
                      <h4 className="font-display font-extrabold text-base text-slate-800 dark:text-white">Program Lifecycle & Handover Model</h4>
                      <p className="text-slate-500 text-xs font-sans max-w-xl mx-auto">Our structured 4-stage village engagement framework designed to achieve sustainable local autonomy within 36 months.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 text-left">
                      {[
                        { step: "Stage 01", title: "Village Scoping", desc: "GIS mapping, baseline soil health audit, dry lake evaluation, school digitizing readiness reports." },
                        { step: "Stage 02", title: "Cooperative Build", desc: "Formation of smallholder FPOs, women self-help savings circles, and parent-teacher local IT boards." },
                        { step: "Stage 03", title: "Input & Skill Sync", desc: "Deep agronomical natural input training, solar drip installations, IT tablet deployment, and dairy feeds setup." },
                        { step: "Stage 04", title: "Autonomous Exit", desc: "Handover of equipment, linking FPOs directly to retailers, establishing bank systems, independent audits." }
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-black space-y-2">
                          <span className="font-mono text-[9px] uppercase font-bold text-gold">{item.step}</span>
                          <h5 className="font-display font-black text-xs text-slate-800 dark:text-white leading-tight">{item.title}</h5>
                          <p className="text-[10px] text-slate-500 font-sans leading-normal">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 5.5 ANNUAL SCALE-UP PATH */}
                {activeInfographic === 'annual' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full space-y-6">
                    <div className="text-center space-y-2">
                      <h4 className="font-display font-extrabold text-base text-slate-800 dark:text-white">FCCC Audited Scale Trajectory</h4>
                      <p className="text-slate-500 text-xs font-sans max-w-xl mx-auto">Audited annual progression of total rural households reached from the trust&apos;s inception to 2026 targets.</p>
                    </div>

                    {/* Area Growth Graph in SVG */}
                    <div className="pt-4 max-w-xl mx-auto">
                      <svg viewBox="0 0 500 200" className="w-full h-auto">
                        {/* Grid lines */}
                        <line x1="40" y1="20" x2="480" y2="20" stroke="#E2E8F0" strokeDasharray="3 3" />
                        <line x1="40" y1="70" x2="480" y2="70" stroke="#E2E8F0" strokeDasharray="3 3" />
                        <line x1="40" y1="120" x2="480" y2="120" stroke="#E2E8F0" strokeDasharray="3 3" />
                        <line x1="40" y1="170" x2="480" y2="170" stroke="#CBD5E1" strokeWidth="1" />

                        {/* Area Polygon */}
                        <polygon 
                          points="40,170 120,150 200,130 280,95 360,65 440,30 440,170" 
                          fill="url(#graph-grad)" 
                          opacity="0.15"
                        />

                        {/* Graph Line */}
                        <path 
                          d="M 40 170 L 120 150 L 200 130 L 280 95 L 360 65 L 440 30" 
                          fill="none" 
                          stroke="#1E3E2B" 
                          strokeWidth="3.5"
                        />

                        {/* Nodes with counts */}
                        <circle cx="40" cy="170" r="4.5" fill="#1E3E2B" />
                        <text x="40" y="185" textAnchor="middle" className="text-[9px] font-mono font-bold fill-slate-400">2021</text>

                        <circle cx="120" cy="150" r="4.5" fill="#1E3E2B" />
                        <text x="120" y="140" textAnchor="middle" className="text-[9px] font-mono font-bold fill-forest">1.2K</text>
                        <text x="120" y="185" textAnchor="middle" className="text-[9px] font-mono font-bold fill-slate-400">2022</text>

                        <circle cx="200" cy="130" r="4.5" fill="#1E3E2B" />
                        <text x="200" y="120" textAnchor="middle" className="text-[9px] font-mono font-bold fill-forest">2.5K</text>
                        <text x="200" y="185" textAnchor="middle" className="text-[9px] font-mono font-bold fill-slate-400">2023</text>

                        <circle cx="280" cy="95" r="4.5" fill="#1E3E2B" />
                        <text x="280" y="85" textAnchor="middle" className="text-[9px] font-mono font-bold fill-forest">4.8K</text>
                        <text x="280" y="185" textAnchor="middle" className="text-[9px] font-mono font-bold fill-slate-400">2024</text>

                        <circle cx="360" cy="65" r="4.5" fill="#1E3E2B" />
                        <text x="360" y="55" textAnchor="middle" className="text-[9px] font-mono font-bold fill-forest">7.2K</text>
                        <text x="360" y="185" textAnchor="middle" className="text-[9px] font-mono font-bold fill-slate-400">2025</text>

                        <circle cx="440" cy="30" r="5" fill="#E6A123" />
                        <text x="440" y="18" textAnchor="middle" className="text-[10px] font-mono font-black fill-gold-dark">10.5K+</text>
                        <text x="440" y="185" textAnchor="middle" className="text-[9px] font-mono font-bold fill-slate-400">2026 (Target)</text>

                        {/* Gradient definition */}
                        <defs>
                          <linearGradient id="graph-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#1E3E2B" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </motion.div>
                )}

                {/* 5.6 COMMUNITY DEVELOPMENT ECOSYSTEM */}
                {activeInfographic === 'ecosystem' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full space-y-6">
                    <div className="text-center space-y-2">
                      <h4 className="font-display font-extrabold text-base text-slate-800 dark:text-white">Community Development Ecosystem</h4>
                      <p className="text-slate-500 text-xs font-sans max-w-xl mx-auto">Nested hub-and-spoke multi-sector rural networks connecting various domains to maximize compounding outcomes.</p>
                    </div>

                    <div className="relative flex justify-center items-center py-6 min-h-[220px]">
                      {/* Central Hub */}
                      <div className="w-24 h-24 rounded-full bg-forest text-white border-4 border-white dark:border-zinc-950 flex flex-col justify-center items-center shadow-xl z-10 text-center">
                        <span className="text-[8px] font-mono uppercase tracking-widest opacity-80">Raita Mitra</span>
                        <span className="text-xs font-bold font-display leading-tight">Hub Centric</span>
                      </div>

                      {/* Radial spokes using absolute positions */}
                      {[
                        { label: "Agrarian", pos: "-top-2 left-1/2 -translate-x-1/2", bg: "bg-emerald-50 text-emerald-600 border-emerald-200" },
                        { label: "Women SHG", pos: "top-12 left-6 md:left-24", bg: "bg-sky-50 text-sky-600 border-sky-200" },
                        { label: "Schools IT", pos: "top-12 right-6 md:right-24", bg: "bg-purple-50 text-purple-600 border-purple-200" },
                        { label: "Micro Enterprise", pos: "-bottom-2 left-6 md:left-20", bg: "bg-amber-50 text-amber-600 border-amber-200" },
                        { label: "Watershed", pos: "-bottom-2 right-6 md:right-20", bg: "bg-teal-50 text-teal-600 border-teal-200" }
                      ].map((spoke, idx) => (
                        <div 
                          key={idx}
                          className={`absolute px-4 py-1.5 rounded-full border text-[10px] font-bold font-mono tracking-tight shadow-md z-0 ${spoke.pos} ${spoke.bg}`}
                        >
                          {spoke.label}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. IMPACT DASHBOARD SNAPSHOT */}
      <section className={`py-20 px-4 md:px-8 border-b border-slate-100 ${
        highContrast ? 'bg-black text-white border-white' : 'bg-white'
      }`} id="impact-dashboard">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Audited Progress Snapshot</span>
            <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Program Impact Snapshot
            </h2>
            <p className="text-slate-500 text-xs md:text-base">
              Verified metric indicators across our target rural taluks and collaborative blocks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { count: "5,000+", title: "Farmers Empowered", desc: "Lower input costs and organic certifications verified." },
              { count: "3,000+", title: "Youth Trained", desc: "Equipped with STEM tools and certified computer literacy." },
              { count: "1,500+", title: "Livelihoods Supported", desc: "Through dairy SHGs, revolving funds, and tailoring mills." },
              { count: "12+", title: "Districts Covered", desc: "Actively monitoring agrarian parameters in Northern Karnataka." }
            ].map((dash, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-3xl border text-center space-y-2 transform hover:-translate-y-1 transition-all ${
                  highContrast 
                    ? 'bg-zinc-950 border-white text-white' 
                    : 'bg-white border-slate-100 shadow-md hover:shadow-xl'
                }`}
              >
                <p className={`text-3xl md:text-4xl font-display font-black font-mono tracking-tight ${
                  highContrast ? 'text-white' : 'text-forest'
                }`}>
                  {dash.count}
                </p>
                <h4 className="font-display font-extrabold text-xs text-slate-800 dark:text-white leading-tight uppercase tracking-wider">{dash.title}</h4>
                <p className="text-[10px] text-slate-400 font-sans leading-normal">{dash.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. SDG ALIGNMENT SECTION (SHOW OFFICIAL SDG ICONS & DETAILS) */}
      <section className={`py-20 px-4 md:px-8 border-b border-slate-100 ${
        highContrast ? 'bg-black text-white border-white' : 'bg-slate-50'
      }`} id="sdg-alignment-dashboard">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold font-semibold">Global Framework Integration</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Aligned with United Nations Sustainable Development Goals
            </h2>
            <p className="text-slate-500 text-xs md:text-base">
              Raita Mitra maps every field program directly to international progress indicators. Our interventions actively secure the following nine sustainable milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alignedSDGs.map((sdg) => (
              <div 
                key={sdg.number}
                className={`p-6 rounded-2xl border text-left flex items-start gap-4 transition-all duration-300 hover:shadow-md ${
                  highContrast 
                    ? 'bg-zinc-950 border-white text-white' 
                    : `bg-white border-slate-100 hover:border-forest/20`
                }`}
              >
                {/* Official SDG representation placeholder box */}
                <div className={`w-12 h-12 rounded-xl shrink-0 flex flex-col justify-center items-center text-center font-mono border-2 ${sdg.color}`}>
                  <span className="text-[9px] font-bold opacity-80">SDG</span>
                  <span className="text-sm font-black font-mono leading-none">{sdg.number}</span>
                </div>

                <div className="space-y-1">
                  <h4 className={`font-display font-black text-xs md:text-sm tracking-tight ${
                    highContrast ? 'text-white' : 'text-slate-800'
                  }`}>
                    {sdg.title}
                  </h4>
                  <p className="text-slate-500 text-[10px] md:text-xs leading-relaxed font-sans">
                    {sdg.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. SUCCESS STORIES PREVIEW (THREE CARDS WITH REDIRECT CTA) */}
      <section className={`py-20 px-4 md:px-8 border-b border-slate-100 ${
        highContrast ? 'bg-black text-white border-white' : 'bg-white'
      }`} id="success-stories-preview">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">Proof of Intervention</span>
            <h2 className={`font-display font-extrabold text-2xl md:text-4xl ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Stories of Transformed Livelihoods
            </h2>
            <p className="text-slate-500 text-xs md:text-base">
              Behind every FCCC audited statistic is a genuine story of household financial self-reliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Rejuvenating Soil and Slashing Crop Costs",
                image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600",
                narrative: "Shri. Ramesh Naik of Gadag, Dharwad taluk, adopted organic bio-formulation treatment. Today, his crop chemical expenses are slashed by 35%, while his dryland organic yield remains stable.",
                category: "Farmer Success Story"
              },
              {
                title: "From Debt to Cooperative Dairy Owner",
                image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=600",
                narrative: "Smt. Shanta Gowda led a team of 12 women to organize a localized dairy collection point with bank ties. Today, the cooperative generates sustained secondary income for families.",
                category: "Women Entrepreneur Story"
              },
              {
                title: "School Dropout Deploys Digital IT Lab",
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
                narrative: "An unemployed local graduate was trained as a system teacher for the trust's smart lab. Today, he certified 150 local students in computer productivity and basic coding.",
                category: "Youth Employment Story"
              }
            ].map((story, idx) => (
              <div 
                key={idx}
                className={`rounded-3xl border overflow-hidden flex flex-col justify-between text-left ${
                  highContrast 
                    ? 'bg-zinc-950 border-white text-white' 
                    : 'bg-white border-slate-100 shadow-md hover:shadow-lg transition-shadow'
                }`}
              >
                <div>
                  <div className="aspect-video bg-slate-100 relative overflow-hidden">
                    <img src={story.image} alt={story.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <span className="absolute top-4 left-4 text-[9px] font-mono uppercase bg-slate-950/75 backdrop-blur-md text-white px-2.5 py-1 rounded font-bold">
                      {story.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-display font-extrabold text-sm md:text-base leading-tight text-slate-800 dark:text-white">
                      {story.title}
                    </h3>
                    <p className="text-slate-500 text-[11px] md:text-xs font-sans leading-relaxed line-clamp-3">
                      {story.narrative}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button 
                    onClick={() => setActivePage('stories')}
                    className="text-xs font-bold text-forest hover:text-gold cursor-pointer flex items-center gap-1 mt-2.5 font-display"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button 
              onClick={() => setActivePage('stories')}
              className={`px-8 py-3.5 text-xs font-black rounded-xl shadow-lg cursor-pointer ${
                highContrast ? 'bg-white text-black' : 'bg-forest hover:bg-forest-light text-white'
              }`}
            >
              View Impact Stories
            </button>
          </div>

        </div>
      </section>

      {/* 9. CSR PARTNERSHIP BLOCK */}
      <section className="relative py-24 px-4 md:px-8 bg-slate-950 text-white overflow-hidden" id="programs-csr-partnership">
        
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1600" 
            alt="Corporate volunteers and rural community" 
            className="w-full h-full object-cover opacity-15 filter grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-gold bg-gold/15 px-3 py-1 rounded font-bold border border-gold/20 inline-block">Institutional Partnerships</span>
            <h2 className="font-display font-black text-2xl md:text-4xl leading-tight text-white">
              Collaborate With Us To Scale Impact
            </h2>
            <p className="text-slate-300 text-xs md:text-sm font-sans max-w-2xl leading-relaxed">
              Partner with us for sustainable and measurable community development initiatives. Raita Mitra provides full-stack legal compliant planning, FCCC auditable logs, GIS tracking, and transparent reporting.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0 justify-start lg:items-stretch">
            <button 
              onClick={() => setActivePage('contact')}
              className="px-6 py-3 bg-forest hover:bg-forest-light text-white text-xs font-bold rounded-xl text-center cursor-pointer transition-colors shadow-lg flex items-center justify-center gap-1.5"
            >
              <Mail size={14} />
              <span>Become a CSR Partner</span>
            </button>

            <button 
              onClick={() => setActivePage('compliance')}
              className="px-6 py-3 border border-slate-700 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl text-center cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <Download size={14} />
              <span>Download CSR Brochure</span>
            </button>
          </div>

        </div>
      </section>

      {/* 10. GALLERY SECTION (MASONRY GALLERY) */}
      <section className={`py-20 px-4 md:px-8 ${
        highContrast ? 'bg-black text-white' : 'bg-white'
      }`} id="programs-gallery">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold font-semibold">Interventions in Pictures</span>
            <h2 className={`font-display font-black text-2xl md:text-4xl ${
              highContrast ? 'text-white' : 'text-forest'
            }`}>
              Project Gallery
            </h2>
            <p className="text-slate-500 text-xs md:text-base">
              Verified photography of our field activities across dryland Karnataka.
            </p>
          </div>

          {/* Masonry Layout Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              {
                title: "Sustainable Agriculture",
                desc: "Marginal farmers inspecting organic soil inputs in Dharwad cluster.",
                image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=500"
              },
              {
                title: "Women Empowerment & Self Help Groups",
                desc: "SHG financial records and business incubation assembly.",
                image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=500"
              },
              {
                title: "Healthcare Camps",
                desc: "Preventive general health screening and maternal nutrition kit delivery.",
                image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=500"
              },
              {
                title: "Smart Digital Lab",
                desc: "Rural school kids operating computer tablets in Hubballi primary block.",
                image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=500"
              },
              {
                title: "Environment Activities",
                desc: "Miyawaki afforestation sapling preparation and community watershed bunding.",
                image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=500"
              }
            ].map((pic, idx) => (
              <div 
                key={idx}
                className={`break-inside-avoid rounded-3xl overflow-hidden border p-3 flex flex-col gap-3 group transition-all duration-300 ${
                  highContrast 
                    ? 'bg-zinc-950 border-white text-white' 
                    : 'bg-white border-slate-100 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="rounded-2xl overflow-hidden aspect-auto max-h-[350px] bg-slate-50">
                  <img src={pic.image} alt={pic.title} className="w-full object-cover group-hover:scale-102 transition-transform duration-300" referrerPolicy="no-referrer" />
                </div>
                <div className="text-left px-1 space-y-1">
                  <h4 className="font-display font-extrabold text-xs text-slate-800 dark:text-white group-hover:text-gold transition-colors">{pic.title}</h4>
                  <p className="text-[10px] text-slate-400 font-sans leading-normal">{pic.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
