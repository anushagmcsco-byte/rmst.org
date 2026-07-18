import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Leaf, 
  HeartHandshake, 
  Phone, 
  Search, 
  Mic, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  Coins, 
  Users, 
  ArrowRight, 
  ChevronRight, 
  Download, 
  ExternalLink, 
  FileText, 
  Check, 
  Mail, 
  MessageCircle, 
  X, 
  SlidersHorizontal,
  Clock,
  Calendar,
  BookOpen,
  Volume2,
  VolumeX,
  HelpCircle,
  Database,
  Cpu,
  Brain,
  TrendingUp,
  Award
} from 'lucide-react';

interface SearchResultsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setActivePage: (page: string) => void;
  highContrast?: boolean;
}

// Extensive index of searchable content across the organization
const searchDatabase = [
  {
    id: 'prog-agri',
    title: 'Sustainable Agriculture Initiative',
    category: 'Programs',
    programArea: 'Agriculture',
    date: 'Last Month',
    readingTime: '5 min read',
    tags: ['Soil Health', 'Marginal Farmers', 'Farmer Programs', 'Eco Farming'],
    desc: 'Empowering marginal farmers in Hubballi-Dharwad with eco-friendly inputs, soil testing kits, seed banks, and rainwater harvesting techniques.',
    page: 'programs',
    thumbnail: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&q=80&w=400',
    breadcrumb: 'Programs > Agriculture > Sustainable'
  },
  {
    id: 'prog-women',
    title: 'Women Empowerment & Micro-Financing',
    category: 'Programs',
    programArea: 'Women Empowerment',
    date: 'Last Month',
    readingTime: '6 min read',
    tags: ['SHG', 'Financial Independence', 'Women Empowerment', 'Rural Craft'],
    desc: 'Facilitating active self-help groups (SHGs), digital literacy courses, bookkeeping tools, and financial market links for rural women entrepreneurs.',
    page: 'programs',
    thumbnail: 'https://images.unsplash.com/photo-1508847154043-be12a62861c1?auto=format&fit=crop&q=80&w=400',
    breadcrumb: 'Programs > Women > Micro-Finance'
  },
  {
    id: 'prog-edu',
    title: 'Education & AI Skills Program',
    category: 'Programs',
    programArea: 'Education',
    date: 'Last Year',
    readingTime: '7 min read',
    tags: ['AI Skills', 'Digital Literacy', 'Students', 'Youth Training'],
    desc: 'Providing rural students in Government schools with modern computer labs, foundational coding guides, and AI-oriented agricultural technology literacy.',
    page: 'programs',
    thumbnail: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=400',
    breadcrumb: 'Programs > Education > Tech Literacy'
  },
  {
    id: 'prog-climate',
    title: 'Climate Action & Green Afforestation',
    category: 'Programs',
    programArea: 'Climate Action',
    date: 'Last 7 Days',
    readingTime: '4 min read',
    tags: ['Climate Action', 'Environment', 'Tree Plantation', 'Ecology'],
    desc: 'Coordinating major carbon offset initiatives, native seed distribution, community tree plantation drives, and village water pond restorations.',
    page: 'programs',
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400',
    breadcrumb: 'Programs > Ecology > Climate Action'
  },
  {
    id: 'doc-csr1',
    title: 'CSR-1 Registration Certificate (MCA)',
    category: 'Resources',
    programArea: 'Entrepreneurship',
    date: 'Last Year',
    readingTime: '2 min read',
    tags: ['CSR-1 Registration', 'Compliance', 'Documents', 'Legal'],
    desc: 'Official filing with the Ministry of Corporate Affairs (MCA), Government of India, establishing Raita Mitra as a certified CSR execution agency.',
    page: 'compliance',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=400',
    breadcrumb: 'Transparency > Compliance > CSR-1'
  },
  {
    id: 'doc-80g',
    title: '80G Tax Exemption Certificate',
    category: 'Resources',
    programArea: 'Entrepreneurship',
    date: 'Last Year',
    readingTime: '2 min read',
    tags: ['80G Certificate', 'Tax Saving', 'Compliance', 'Audit'],
    desc: 'Approved Income Tax exemption certificates allowing individual and corporate donors to claim 100% tax deductions on all financial grants.',
    page: 'compliance',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400',
    breadcrumb: 'Transparency > Legal > 80G Exempt'
  },
  {
    id: 'report-annual',
    title: 'Annual Audited Report 2024-2025',
    category: 'Reports',
    programArea: 'Agriculture',
    date: 'Last Month',
    readingTime: '12 min read',
    tags: ['Annual Reports', 'Impact Reports', 'Financial Audit', 'Transparency'],
    desc: 'Detailed third-party audited financial sheets, project-by-project resource allocations, executive balance sheets, and key field metric summaries.',
    page: 'resources',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
    breadcrumb: 'Resources > Annual Reports > 24-25'
  },
  {
    id: 'art-soil',
    title: 'Revolutionizing Soil Health in Karnataka Villages',
    category: 'Articles',
    programArea: 'Agriculture',
    date: 'Last 7 Days',
    readingTime: '4 min read',
    tags: ['Soil Health', 'Agriculture', 'Technology', 'Impact Stories'],
    desc: 'How scientific NPK laboratory analysis is helping rural growers optimize organic fertilizers, cut overhead expenses, and increase crop yields by 22%.',
    page: 'blog',
    thumbnail: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=400',
    breadcrumb: 'Insights > NewsBlog > Soil Health'
  },
  {
    id: 'art-ai',
    title: 'How Artificial Intelligence is Empowering Rural Youth',
    category: 'Articles',
    programArea: 'Education',
    date: 'Last Month',
    readingTime: '5 min read',
    tags: ['AI Skills', 'Digital Literacy', 'Youth Training', 'Government Schools'],
    desc: 'Exploring our computer lab initiatives that introduce standard python syntax, AI modeling parameters, and automated drip irrigation scripts to youth.',
    page: 'blog',
    thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=400',
    breadcrumb: 'Insights > NewsBlog > Tech Rural'
  },
  {
    id: 'event-farmers-conclave',
    title: 'National Farmers Conclave 2026 - Hubballi',
    category: 'Events',
    programArea: 'Agriculture',
    date: 'Last Month',
    readingTime: '3 min read',
    tags: ['Farmer Programs', 'Events', 'Workshops', 'Policy'],
    desc: 'Our flagship symposium hosting over 500 local growers, agricultural scientists, policy makers, and seed testing experts to chart drylands solutions.',
    page: 'events',
    thumbnail: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=400',
    breadcrumb: 'Activities > Events > Conclave 2026'
  },
  {
    id: 'story-savitri',
    title: "Savitri's Journey to Financial Independence",
    category: 'Impact Stories',
    programArea: 'Women Empowerment',
    date: 'Last Month',
    readingTime: '5 min read',
    tags: ['Impact Stories', 'SHG', 'Micro-Finance', 'Success Stories'],
    desc: 'A case narrative outlining how our micro-credit models helped Savitri set up a regional cold-press oil mill in Dharwad district, creating 6 local jobs.',
    page: 'stories',
    thumbnail: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=400',
    breadcrumb: 'Impact > Stories > Savitri Dharwad'
  },
  {
    id: 'media-dd',
    title: "Raita Mitra's AI Education Featured on Doordarshan",
    category: 'Media',
    programArea: 'Education',
    date: 'Last Month',
    readingTime: '3 min read',
    tags: ['Media Articles', 'AI Skills', 'Press Release'],
    desc: 'National broadcaster Doordarshan highlights our team’s efforts in bringing coding curriculums and high-tech agrarian tools to government classrooms.',
    page: 'media',
    thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=400',
    breadcrumb: 'Transparency > Media > TV Coverage'
  }
];

export default function SearchResults({ 
  searchQuery, 
  setSearchQuery, 
  setActivePage,
  highContrast = false 
}: SearchResultsProps) {
  
  // Search state
  const [inputVal, setInputVal] = useState(searchQuery);
  const [aiSemanticSearch, setAiSemanticSearch] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const [aiInsight, setAiInsight] = useState<any | null>(null);
  
  // Sidebar Filter state
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([]);
  const [selectedProgramAreas, setSelectedProgramAreas] = useState<string[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<string>('');

  // Voice search simulation state
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceQueryIndex, setVoiceQueryIndex] = useState(0);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceHasSound, setVoiceHasSound] = useState(false);

  // Search suggestions and keyboard shortcut helper
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    '80G Certificate', 'FCRA Registration', 'Soil Testing Labs', 'Women Empowerment'
  ]);

  // Handle keyboard shortcut: '/' key focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Set default initial results based on URL/Props query
  useEffect(() => {
    setInputVal(searchQuery);
    executeSearchLogic(searchQuery, selectedContentTypes, selectedProgramAreas, selectedDateRange, aiSemanticSearch);
  }, [searchQuery]);

  // Execute unified filtering & search logic
  const executeSearchLogic = (
    query: string, 
    contentTypes: string[], 
    programAreas: string[], 
    dateRange: string,
    isSemantic: boolean
  ) => {
    const normalizedQuery = query.trim().toLowerCase();
    
    // 1. Initial base filtering: If query is empty, show everything or specific base
    let filtered = [...searchDatabase];

    // Apply keywords search if query exists
    if (normalizedQuery) {
      filtered = filtered.filter(item => {
        const matchesTitle = item.title.toLowerCase().includes(normalizedQuery);
        const matchesDesc = item.desc.toLowerCase().includes(normalizedQuery);
        const matchesBreadcrumb = item.breadcrumb.toLowerCase().includes(normalizedQuery);
        const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(normalizedQuery));
        const matchesCategory = item.category.toLowerCase().includes(normalizedQuery);
        const matchesProgram = item.programArea.toLowerCase().includes(normalizedQuery);
        
        return matchesTitle || matchesDesc || matchesBreadcrumb || matchesTags || matchesCategory || matchesProgram;
      });
    }

    // 2. Apply Content Type Filter
    if (contentTypes.length > 0) {
      filtered = filtered.filter(item => contentTypes.includes(item.category));
    }

    // 3. Apply Program Area Filter
    if (programAreas.length > 0) {
      filtered = filtered.filter(item => programAreas.includes(item.programArea));
    }

    // 4. Apply Date Filter
    if (dateRange) {
      filtered = filtered.filter(item => item.date === dateRange);
    }

    setResults(filtered);

    // 5. Generate Dynamic simulated "AI Recommendation" based on embeddings context
    if (normalizedQuery && isSemantic) {
      let recommendedReason = '';
      let recommendedDoc: any = null;

      if (normalizedQuery.includes('tax') || normalizedQuery.includes('exempt') || normalizedQuery.includes('80g') || normalizedQuery.includes('csr') || normalizedQuery.includes('compliance')) {
        recommendedDoc = searchDatabase.find(d => d.id === 'doc-80g');
        recommendedReason = 'Our vector embeddings similarity matched your query with high affinity (0.976 confidence score) against 12A/80G tax auditing compliance registries under Sec 80G income exemptions.';
      } else if (normalizedQuery.includes('soil') || normalizedQuery.includes('farm') || normalizedQuery.includes('agri') || normalizedQuery.includes('crop')) {
        recommendedDoc = searchDatabase.find(d => d.id === 'prog-agri');
        recommendedReason = 'Identified strong conceptual similarity (0.982 cosine match) with marginal farmer capacity workshops, scientific NPK soil testing lab networks, and organic certification guides.';
      } else if (normalizedQuery.includes('women') || normalizedQuery.includes('shg') || normalizedQuery.includes('girl') || normalizedQuery.includes('financ')) {
        recommendedDoc = searchDatabase.find(d => d.id === 'prog-women');
        recommendedReason = 'Strong relevance (0.959 confidence index) discovered with women cooperative self-help programs, micro-financing structures, and digital ledger bookkeeping initiatives.';
      } else if (normalizedQuery.includes('ai') || normalizedQuery.includes('school') || normalizedQuery.includes('tech') || normalizedQuery.includes('cod')) {
        recommendedDoc = searchDatabase.find(d => d.id === 'prog-edu');
        recommendedReason = 'Semantic query expansion mapped your request (0.967 relevance) directly to our computer-literacy labs, secondary school python scripts, and tech skills outreach.';
      } else if (normalizedQuery.includes('water') || normalizedQuery.includes('climate') || normalizedQuery.includes('tree') || normalizedQuery.includes('forest')) {
        recommendedDoc = searchDatabase.find(d => d.id === 'prog-climate');
        recommendedReason = 'Natural language pattern matched (0.941 confidence) to the green afforestation drives, native seeds banks, and rural rainwater catchment designs.';
      } else {
        // Default to a smart generic recommendation
        recommendedDoc = searchDatabase[0];
        recommendedReason = 'General semantic index mapping suggest checking the Sustainable Agriculture Initiative first, based on aggregate user query profiles in Hubballi.';
      }

      setAiInsight({
        doc: recommendedDoc,
        score: '98.2%',
        reason: recommendedReason
      });
    } else {
      setAiInsight(null);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputVal);
    
    // Add to recent searches
    if (inputVal.trim() && !recentSearches.includes(inputVal.trim())) {
      setRecentSearches(prev => [inputVal.trim(), ...prev.slice(0, 3)]);
    }
    
    executeSearchLogic(inputVal, selectedContentTypes, selectedProgramAreas, selectedDateRange, aiSemanticSearch);
  };

  const handleTagClick = (tag: string) => {
    setInputVal(tag);
    setSearchQuery(tag);
    if (!recentSearches.includes(tag)) {
      setRecentSearches(prev => [tag, ...prev.slice(0, 3)]);
    }
    executeSearchLogic(tag, selectedContentTypes, selectedProgramAreas, selectedDateRange, aiSemanticSearch);
  };

  const toggleContentType = (type: string) => {
    const updated = selectedContentTypes.includes(type)
      ? selectedContentTypes.filter(t => t !== type)
      : [...selectedContentTypes, type];
    setSelectedContentTypes(updated);
    executeSearchLogic(inputVal, updated, selectedProgramAreas, selectedDateRange, aiSemanticSearch);
  };

  const toggleProgramArea = (area: string) => {
    const updated = selectedProgramAreas.includes(area)
      ? selectedProgramAreas.filter(a => a !== area)
      : [...selectedProgramAreas, area];
    setSelectedProgramAreas(updated);
    executeSearchLogic(inputVal, selectedContentTypes, updated, selectedDateRange, aiSemanticSearch);
  };

  const handleDateSelect = (range: string) => {
    const updated = selectedDateRange === range ? '' : range;
    setSelectedDateRange(updated);
    executeSearchLogic(inputVal, selectedContentTypes, selectedProgramAreas, updated, aiSemanticSearch);
  };

  const resetFilters = () => {
    setSelectedContentTypes([]);
    setSelectedProgramAreas([]);
    setSelectedDateRange('');
    executeSearchLogic(inputVal, [], [], '', aiSemanticSearch);
  };

  // Simulated Voice Search loop
  const triggerVoiceSearch = () => {
    setIsVoiceActive(true);
    setVoiceTranscript('Listening for query...');
    setVoiceHasSound(true);

    const voiceQueries = [
      'Show 80G and CSR compliance files',
      'Where is the soil health testing laboratory located?',
      'Women empowerment self help groups training program',
      'How do I volunteer for tree plantation drives?'
    ];
    
    const selectedVoiceQuery = voiceQueries[voiceQueryIndex % voiceQueries.length];
    setVoiceQueryIndex(prev => prev + 1);

    // Stage 1: Simulating audio wave capture
    setTimeout(() => {
      setVoiceTranscript('Processing speech templates...');
      setVoiceHasSound(false);
    }, 1500);

    // Stage 2: Simulating Speech-To-Text translation text appearance
    setTimeout(() => {
      setVoiceTranscript(`"${selectedVoiceQuery}"`);
    }, 2800);

    // Stage 3: Setting input and searching
    setTimeout(() => {
      setInputVal(selectedVoiceQuery);
      setSearchQuery(selectedVoiceQuery);
      setIsVoiceActive(false);
    }, 4200);
  };

  // FAQ Expand state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className={`w-full ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* VOICE SEARCH SCREEN OVERLAY */}
      <AnimatePresence>
        {isVoiceActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-4 text-white"
          >
            <div className="max-w-md w-full text-center space-y-8 p-6 bg-slate-900 border border-slate-800 rounded-3xl relative">
              <button 
                onClick={() => setIsVoiceActive(false)} 
                className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center justify-center gap-1.5">
                  <Brain size={12} className="animate-pulse" /> Multilingual Speech Recognition
                </span>
                <h4 className="text-xl font-display font-extrabold text-white">Voice Search Engine</h4>
                <p className="text-xs text-slate-400">Speak naturally in Kannada or English to query our trust archives.</p>
              </div>

              {/* Animated Audio Waves */}
              <div className="flex items-center justify-center h-24 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bar) => (
                  <motion.div 
                    key={bar}
                    animate={{ 
                      height: voiceHasSound 
                        ? [15, Math.random() * 80 + 20, 15] 
                        : [15, 20, 15] 
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 0.6 + bar * 0.05,
                      ease: 'easeInOut' 
                    }}
                    className={`w-1.5 rounded-full ${voiceHasSound ? 'bg-emerald-500' : 'bg-slate-700'}`}
                  />
                ))}
              </div>

              {/* Voice Transcript text area */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 min-h-16 flex items-center justify-center">
                <p className="text-sm font-mono text-emerald-300 animate-pulse">{voiceTranscript}</p>
              </div>

              <div className="text-[10px] font-mono text-slate-500">
                AI powered speech conversion engine • Active
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION: Minimal AI Search Interface with abstract net patterns */}
      <section className="relative py-12 px-4 border-b border-slate-200/50 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50 overflow-hidden">
        {/* Abstract pattern backdrops */}
        <div className="absolute inset-0 z-0 opacity-[0.06] bg-[radial-gradient(#059669_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-100 rounded-full filter blur-3xl opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          
          {/* Breadcrumb path */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 font-bold justify-center md:justify-start">
            <span onClick={() => setActivePage('home')} className="hover:text-emerald-700 cursor-pointer">Home</span>
            <ChevronRight size={10} />
            <span className="text-slate-600">Search Results</span>
          </div>

          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-widest text-emerald-800 font-bold bg-emerald-100/60 px-3 py-1 rounded-full uppercase">
              Unified Search Gateway
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-none">
              Search Across Everything
            </h1>
            <p className="text-xs md:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Find programs, audited tax sheets, CSR registrations, events, blog insights and download resources instantly.
            </p>
          </div>
        </div>
      </section>

      {/* STICKY SEARCH INTERFACE & SUGGESTIONS BAR */}
      <section className="sticky top-[73px] z-30 bg-white/90 border-b border-slate-200/60 shadow-xs backdrop-blur-md py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Form */}
          <form onSubmit={handleFormSubmit} className="relative w-full md:max-w-xl">
            <div className="relative">
              <input 
                ref={searchInputRef}
                type="text"
                placeholder="Search programs, reports, blogs, events or impact stories..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full pl-5 pr-20 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs md:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-emerald-600 text-slate-900"
              />
              {/* Floating micro voice & submission elements */}
              <div className="absolute right-2 top-1.5 flex items-center gap-1">
                <button 
                  type="button" 
                  onClick={triggerVoiceSearch}
                  title="Voice Search (Simulated)"
                  className="p-2 text-slate-400 hover:text-emerald-700 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors"
                >
                  <Mic size={15} />
                </button>
                <button 
                  type="submit"
                  className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl cursor-pointer transition-colors"
                >
                  <Search size={15} />
                </button>
              </div>
            </div>
            
            {/* Keyboard shortcut label */}
            <div className="hidden lg:flex items-center gap-1.5 absolute -bottom-5 left-1 text-[9px] font-mono text-slate-400">
              <span>Press</span>
              <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded font-bold">/</kbd>
              <span>to focus search input anytime</span>
            </div>
          </form>

          {/* AI Semantic Search toggle switch */}
          <div className="flex items-center gap-3 border-t border-slate-100 md:border-0 pt-3 md:pt-0 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">AI Semantic Vector Search</span>
              <button 
                type="button"
                onClick={() => {
                  setAiSemanticSearch(!aiSemanticSearch);
                  executeSearchLogic(inputVal, selectedContentTypes, selectedProgramAreas, selectedDateRange, !aiSemanticSearch);
                }}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                  aiSemanticSearch ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                  aiSemanticSearch ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
            {aiSemanticSearch && (
              <span className="text-[9px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex items-center gap-0.5 animate-pulse">
                <Sparkles size={8} /> Active
              </span>
            )}
          </div>
        </div>
      </section>

      {/* QUICK SUGGESTIONS SECTION: Popular tag cloud */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white p-4 border border-slate-150 rounded-2xl">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold shrink-0">Popular Searches:</span>
          <div className="flex flex-wrap gap-1.5">
            {[
              "CSR-1 Registration", "80G Certificate", "Impact Stories", 
              "Annual Reports", "Volunteer Opportunities", "Women Empowerment", 
              "AI Skill Development", "Climate Action", "Farmer Programs"
            ].map((tag, idx) => (
              <button 
                key={idx}
                type="button"
                onClick={() => handleTagClick(tag)}
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  inputVal.toLowerCase() === tag.toLowerCase() 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-emerald-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN LAYOUT (Sticky Filter Sidebar + Search Results) */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* STICKY SIDEBAR FILTER PANEL */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-[160px] bg-white border border-slate-150 rounded-2xl p-5 space-y-6 shadow-3xs">
              
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-display font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <SlidersHorizontal size={14} className="text-emerald-600" /> Filter Results
                </h3>
                {(selectedContentTypes.length > 0 || selectedProgramAreas.length > 0 || selectedDateRange) && (
                  <button 
                    onClick={resetFilters} 
                    className="text-[10px] text-rose-600 hover:underline font-bold uppercase cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Category Filter Group 1: Content Type */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">Content Type</span>
                <div className="space-y-1.5">
                  {['Pages', 'Programs', 'Articles', 'Events', 'Reports', 'Resources', 'Impact Stories', 'Media'].map((type) => {
                    const isChecked = selectedContentTypes.includes(type);
                    return (
                      <label key={type} className="flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleContentType(type)}
                          className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                        />
                        <span>{type}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Category Filter Group 2: Program Areas */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">Program Areas</span>
                <div className="space-y-1.5">
                  {['Agriculture', 'Women Empowerment', 'Education', 'Health', 'Climate Action', 'Entrepreneurship'].map((area) => {
                    const isChecked = selectedProgramAreas.includes(area);
                    return (
                      <label key={area} className="flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleProgramArea(area)}
                          className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                        />
                        <span>{area}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Category Filter Group 3: Date Range */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">Publication Date</span>
                <div className="space-y-1.5">
                  {['Last 7 Days', 'Last Month', 'Last Year'].map((range) => {
                    const isChecked = selectedDateRange === range;
                    return (
                      <button 
                        key={range}
                        type="button"
                        onClick={() => handleDateSelect(range)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          isChecked 
                            ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-100' 
                            : 'hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <span>{range}</span>
                        {isChecked && <Check size={12} />}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* SEARCH RESULTS FEED AREA */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* AI RECOMMENDED RESULTS HIGHLIGHT CARD */}
            <AnimatePresence>
              {aiSemanticSearch && aiInsight && aiInsight.doc && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-radial from-emerald-950 to-slate-950 border border-emerald-800 rounded-3xl p-6 text-white relative overflow-hidden shadow-md"
                >
                  {/* Subtle vector lines overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:24px_24px]" />
                  <div className="absolute -right-12 -top-12 w-48 h-48 bg-emerald-700/20 rounded-full filter blur-2xl pointer-events-none" />

                  <div className="relative z-10 space-y-4">
                    
                    {/* Tag badge with cosine match score */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                        <Sparkles size={12} className="text-gold" /> AI RECOMMENDED VECTOR MATCH
                      </span>
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
                        Similarity Match: {aiInsight.score}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-400">{aiInsight.doc.breadcrumb}</span>
                      <h4 className="text-lg md:text-xl font-display font-extrabold text-white group cursor-pointer hover:underline" onClick={() => setActivePage(aiInsight.doc.page)}>
                        {aiInsight.doc.title}
                      </h4>
                      <p className="text-xs text-emerald-100/80 leading-relaxed font-sans">{aiInsight.doc.desc}</p>
                    </div>

                    {/* AI reasoning block */}
                    <div className="bg-emerald-950/70 border border-emerald-800/60 rounded-2xl p-4 space-y-2">
                      <span className="text-[9px] font-mono font-bold text-amber-400 uppercase flex items-center gap-1">
                        <Brain size={11} /> Embedding Reasoning Model
                      </span>
                      <p className="text-[11px] text-emerald-200/90 leading-relaxed font-mono">
                        {aiInsight.reason}
                      </p>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button 
                        onClick={() => setActivePage(aiInsight.doc.page)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Open Program Files</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* RESULTS STATISTICS & COUNTS */}
            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-xs font-mono font-bold text-slate-500">
                Showing {results.length} results of {searchDatabase.length} entries matching search filters
              </span>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                Search Speed: 14ms
              </span>
            </div>

            {/* GOOGLE STYLE CARDS LIST */}
            <div className="space-y-6">
              {results.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white border border-slate-150 rounded-2xl p-5 hover:border-emerald-600 hover:shadow-xs transition-all flex flex-col sm:flex-row gap-5"
                >
                  {/* Optional Card Thumbnail */}
                  <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Card Main Metadata */}
                  <div className="space-y-3 flex-grow text-left">
                    
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                      {/* Breadcrumb paths */}
                      <span className="text-slate-400 font-bold">{item.breadcrumb}</span>
                      <span className="text-slate-300">•</span>
                      {/* Reading/Review time */}
                      <span className="text-slate-400 font-semibold flex items-center gap-1">
                        <Clock size={10} /> {item.readingTime}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {/* Type badge category */}
                        <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full uppercase">
                          {item.category}
                        </span>
                        <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full uppercase">
                          {item.programArea}
                        </span>
                      </div>
                      <h3 
                        onClick={() => setActivePage(item.page)}
                        className="text-base md:text-lg font-display font-bold text-slate-900 hover:text-emerald-700 hover:underline cursor-pointer"
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">{item.desc}</p>
                    </div>

                    {/* Tags container */}
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tg, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleTagClick(tg)}
                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                        >
                          #{tg}
                        </button>
                      ))}
                    </div>

                  </div>

                  {/* Right side launch arrow */}
                  <div className="flex items-end justify-end sm:items-center sm:justify-start">
                    <button 
                      onClick={() => setActivePage(item.page)}
                      className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 transition-colors group cursor-pointer"
                    >
                      <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                </motion.div>
              ))}

              {/* EMPTY STATE SECTION */}
              {results.length === 0 && (
                <div className="p-10 text-center bg-white border border-slate-150 rounded-3xl space-y-6">
                  
                  {/* Centered Illustration */}
                  <div className="flex justify-center">
                    <div className="relative w-24 h-24 text-slate-300 flex items-center justify-center">
                      <Search size={64} className="stroke-[1]" />
                      <div className="absolute top-1 right-1 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                        <X size={14} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-display font-extrabold text-slate-900">No Search Results Found</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                      We couldn’t find any compliance registers, seed programs or events matching "{inputVal}". Try testing with other search terms or keywords.
                    </p>
                  </div>

                  {/* Recommendation Suggestions */}
                  <div className="max-w-md mx-auto p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-3">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Suggested Steps:</span>
                    <ul className="space-y-1.5">
                      {['Try another broader keyword like "80G" or "Soil"', 'Check spelling or query structures', 'Browse direct administrative programs lists', 'Contact our support desk for official trust registrations'].map((sug, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed">
                          <ChevronRight size={12} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{sug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-center gap-3 pt-2">
                    <button 
                      onClick={() => { setInputVal(''); executeSearchLogic('', [], [], '', aiSemanticSearch); }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Clear Filters
                    </button>
                    <button 
                      onClick={() => setActivePage('programs')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Browse Programs
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* SEARCH ANALYTICS SECTION: Trending Searches */}
      <section className="bg-white border-t border-b border-slate-200/50 py-12">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Search Analytics</span>
              <h2 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp size={22} className="text-emerald-600" /> Trending Searches
              </h2>
            </div>
            <p className="text-xs text-slate-500">Updated in real-time based on active monthly donor and stakeholder queries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="p-5 border border-slate-150 rounded-2xl space-y-3 hover:border-emerald-600 transition-colors">
              <span className="text-[10px] font-mono text-slate-400 block font-bold">MOST VIEWED DOCUMENT</span>
              <h4 className="text-xs font-bold text-slate-800 font-display">80G Certificate Registry</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">Securing instant tax exemptions on domestic social investments.</p>
              <div className="flex items-center justify-between pt-2 border-t text-[10px] font-mono">
                <span className="text-emerald-700 font-bold">1,840 views</span>
                <button onClick={() => setActivePage('compliance')} className="text-emerald-600 hover:underline flex items-center gap-0.5">View <ChevronRight size={10} /></button>
              </div>
            </div>

            <div className="p-5 border border-slate-150 rounded-2xl space-y-3 hover:border-emerald-600 transition-colors">
              <span className="text-[10px] font-mono text-slate-400 block font-bold">POPULAR DOWNLOADS</span>
              <h4 className="text-xs font-bold text-slate-800 font-display">Annual Audit Reports</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">Third-party audited balance statements and administrative logs.</p>
              <div className="flex items-center justify-between pt-2 border-t text-[10px] font-mono">
                <span className="text-emerald-700 font-bold">950 DLs</span>
                <button onClick={() => setActivePage('resources')} className="text-emerald-600 hover:underline flex items-center gap-0.5">View <ChevronRight size={10} /></button>
              </div>
            </div>

            <div className="p-5 border border-slate-150 rounded-2xl space-y-3 hover:border-emerald-600 transition-colors">
              <span className="text-[10px] font-mono text-slate-400 block font-bold">TRENDING INITIATIVE</span>
              <h4 className="text-xs font-bold text-slate-800 font-display">AI Digital Skills Hub</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">Equipping government school student with basic python logic.</p>
              <div className="flex items-center justify-between pt-2 border-t text-[10px] font-mono">
                <span className="text-emerald-700 font-bold">+45% growth</span>
                <button onClick={() => setActivePage('programs')} className="text-emerald-600 hover:underline flex items-center gap-0.5">View <ChevronRight size={10} /></button>
              </div>
            </div>

            <div className="p-5 border border-slate-150 rounded-2xl space-y-3 hover:border-emerald-600 transition-colors">
              <span className="text-[10px] font-mono text-slate-400 block font-bold">ACTIVE COMMUNITY</span>
              <h4 className="text-xs font-bold text-slate-800 font-display">Hubballi Conclave 2026</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">Village micro-financing forums and seed distribution plans.</p>
              <div className="flex items-center justify-between pt-2 border-t text-[10px] font-mono">
                <span className="text-emerald-700 font-bold">500+ RSVPs</span>
                <button onClick={() => setActivePage('events')} className="text-emerald-600 hover:underline flex items-center gap-0.5">View <ChevronRight size={10} /></button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RELATED CONTENT SECTION: Magazine Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16 space-y-8">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Deeper Discoveries</span>
          <h2 className="text-2xl font-display font-bold text-slate-900">Related Articles & Insights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Empowering Women through Collective Entrepreneurship", desc: "Setting up solid village governance networks for local micro-finances.", category: "Impact Stories", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
            { title: "Sustainable Water Catchment Models for Dryland Farming", desc: "Technical guides regarding low-cost check dams in Hubballi.", category: "Programs", img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=400" },
            { title: "CSR Partnerships & ESG Governance in Modern Social Trusts", desc: "Evaluating NITI Aayog filings and compliance requirements.", category: "Compliance", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400" }
          ].map((card, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-3xs flex flex-col justify-between hover:border-emerald-600 transition-all">
              <div className="h-44 overflow-hidden relative">
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 text-[9px] font-mono uppercase font-bold bg-white text-emerald-800 px-2 py-0.5 rounded-full">
                  {card.category}
                </span>
              </div>
              <div className="p-5 space-y-4 flex flex-col justify-between flex-grow">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 font-display leading-snug">{card.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
                <button 
                  onClick={() => setActivePage('blog')}
                  className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer self-start"
                >
                  <span>Read Article</span>
                  <ArrowRight size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROGRAMS SECTION: Popular Programs Cards */}
      <section className="bg-slate-100 py-16 border-t border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Interactive Hubs</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Explore Key Administrative Portals</h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Our trust operates specialized pipelines to guarantee maximum efficiency and verified social compliance standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white border border-slate-150 p-6 rounded-3xl space-y-4 shadow-3xs text-center flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                  <Coins size={22} />
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-display">Secure Donor Portal</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Log in to retrieve historical audited receipts, download 80G tax exemptions, and manage monthly sustainable seed grants.
                </p>
              </div>
              <button onClick={() => setActivePage('donate')} className="w-full py-2 bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 font-bold text-[10px] rounded-xl transition-all cursor-pointer">
                Access Donor Portal
              </button>
            </div>

            <div className="bg-white border border-slate-150 p-6 rounded-3xl space-y-4 shadow-3xs text-center flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                  <Users size={22} />
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-display">On-Field Volunteer Registry</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Apply for dynamic field fellowships in Hubballi, access calendar guidelines, and log active community hours.
                </p>
              </div>
              <button onClick={() => setActivePage('volunteer')} className="w-full py-2 bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 font-bold text-[10px] rounded-xl transition-all cursor-pointer">
                Access Volunteer Hub
              </button>
            </div>

            <div className="bg-white border border-slate-150 p-6 rounded-3xl space-y-4 shadow-3xs text-center flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                  <ShieldCheck size={22} />
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-display">CSR & Partner Platform</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Co-create programs, access live impact telemetry logs, and query audited MCA filing indexes directly.
                </p>
              </div>
              <button onClick={() => setActivePage('compliance')} className="w-full py-2 bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 font-bold text-[10px] rounded-xl transition-all cursor-pointer">
                Access Partner Desk
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* RESOURCE SUGGESTIONS SECTION: Recommended Downloads */}
      <section className="max-w-7xl mx-auto px-4 py-16 space-y-8">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Download Center</span>
          <h2 className="text-2xl font-display font-bold text-slate-900">Recommended Policy & Impact Downloads</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { title: "CSR Profile Brochure", size: "2.4 MB" },
            { title: "Annual Report 24-25", size: "12.8 MB" },
            { title: "Impact Studies Vol. II", size: "4.1 MB" },
            { title: "Case Studies Booklet", size: "1.8 MB" },
            { title: "PAN & 80G Compliances", size: "940 KB" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-150 p-4 rounded-2xl flex flex-col justify-between space-y-4 hover:border-emerald-600 transition-all text-left">
              <div className="space-y-1">
                <FileText className="text-emerald-600" size={24} />
                <h4 className="text-xs font-bold text-slate-950 leading-snug">{item.title}</h4>
                <span className="text-[10px] font-mono text-slate-400 block">{item.size}</span>
              </div>
              <button 
                onClick={() => setActivePage('resources')}
                className="w-full py-1.5 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-700 text-[9px] font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <Download size={10} /> Download PDF
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION: Accordions */}
      <section className="bg-white border-t border-b border-slate-200/50 py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-10">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Help & Knowledge</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Frequently Asked Search Questions</h2>
            <p className="text-xs text-slate-500">Quick answers on accessing compliance records and running advanced semantic queries.</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "How does the AI semantic search engine work?",
                a: "Our system matches search queries conceptually rather than relying purely on exact keyword strings. By utilizing simulated vector embeddings similarity matching, we align your query intent with our comprehensive agricultural, financial audit, and compliance archives."
              },
              {
                q: "Can I search and download audited annual reports?",
                a: "Yes! All official annual audits, balance sheets, NITI Aayog filings, and 12A/80G certificates are fully indexed. You can filter by 'Reports' or 'Resources' content categories to locate them immediately."
              },
              {
                q: "Are active agricultural workshops and training events indexed?",
                a: "Absolutely. All on-field programs, farmer symposiums, and self-help group meetings conducted in Hubballi and neighboring villages are cataloged. Select 'Events' content type filters to view dates and schedules."
              },
              {
                q: "Does simulated voice search support multiple languages?",
                a: "Yes. Our conversational voice interface is designed to support both Kannada and English. Click the microphone icon next to the search bar to experience real-time conversational processing simulation."
              },
              {
                q: "Can I filter results by specific agrarian program areas?",
                a: "Yes. Use our sticky sidebar filter to narrow search results down to Agriculture, Women Empowerment, Climate Action, Health, or Rural Tech Education initiatives instantly."
              }
            ].map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div key={idx} className="border border-slate-150 rounded-2xl overflow-hidden bg-slate-50">
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between font-bold text-xs md:text-sm text-slate-900 cursor-pointer hover:bg-slate-100/50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle size={15} className="text-emerald-600 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronRight size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden border-t border-slate-150/60 bg-white"
                      >
                        <p className="p-4 text-xs text-slate-500 leading-relaxed font-sans">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SUPPORT SECTION: Quick Help Cards */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <h3 className="font-display font-bold text-base text-slate-900">Still Can't Find What You Are Looking For?</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">Get in touch directly with our administrative desk in Hubballi, Karnataka. We are here to help!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="p-4 bg-white border border-slate-150 rounded-2xl flex items-start gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
              <Phone size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">Call Admin Office</span>
              <a href="tel:+917676376221" className="text-xs text-slate-800 font-bold hover:underline">+91 76763 76221</a>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-150 rounded-2xl flex items-start gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
              <Mail size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">Email Support</span>
              <a href="mailto:contact@raitamitrasocialtrust.org" className="text-xs text-slate-800 font-bold hover:underline">contact@raitamitrasocialtrust.org</a>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-150 rounded-2xl flex items-start gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
              <MessageCircle size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">WhatsApp Desk</span>
              <span className="text-xs text-slate-800 font-bold">Instant Assistant Desk</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER SECTION */}
      <section className="relative py-24 bg-emerald-950 text-white overflow-hidden text-center">
        {/* Background visual map */}
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200" 
            alt="Advanced community network maps" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 to-slate-950 z-0" />

        {/* Floating tech nodes visualization */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-500/10 rounded-full filter blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-teal-500/10 rounded-full filter blur-xl animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold bg-emerald-900/60 border border-emerald-800/80 px-3 py-1 rounded-full inline-block">
            Scalable Tech Architecture
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">Discover Knowledge, Create Impact</h2>
          <p className="text-xs md:text-sm text-emerald-100/85 max-w-2xl mx-auto leading-relaxed">
            Our technology architecture is built on vector search models, caching setups and standard PostgreSQL to offer transparent and high-speed resources searches.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button 
              onClick={() => setActivePage('programs')}
              className="px-6 py-3 bg-gold hover:bg-yellow-500 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Browse Programs
            </button>
            <button 
              onClick={() => setActivePage('resources')}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Visit Resource Center
            </button>
          </div>

          {/* Technical specification details tags */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-6 text-[9px] font-mono text-emerald-300/60">
            <span className="flex items-center gap-1"><Database size={10} /> Supabase pgvector</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Cpu size={10} /> OpenAI Embeddings</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Brain size={10} /> RAG Pipeline Ready</span>
          </div>
        </div>
      </section>

    </div>
  );
}
