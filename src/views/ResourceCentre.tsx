import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Download, 
  Search, 
  BookOpen, 
  Briefcase, 
  ShieldCheck, 
  GraduationCap, 
  FolderOpen, 
  ExternalLink, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown, 
  Mail, 
  Phone, 
  Building, 
  CheckCircle2, 
  BarChart2, 
  PieChart, 
  Map, 
  Globe, 
  FileCheck2,
  Bookmark,
  TrendingUp,
  ThumbsUp,
  Info,
  Layers,
  ArrowUpRight
} from 'lucide-react';

// Resource Item Type definition
interface ResourceItem {
  id: string;
  title: string;
  category: 'annual' | 'impact' | 'case' | 'brochure' | 'policy' | 'training' | 'presentation' | 'toolkit';
  categoryLabel: string;
  publishDate: string;
  fileSize: string;
  fileType: string;
  downloadCount: number;
  rating: number;
  featured: boolean;
  abstract?: string;
  author?: string;
}

// Category configuration
const CATEGORIES = [
  { id: 'all', title: 'All Resources', icon: Layers, color: 'text-slate-600 bg-slate-50' },
  { id: 'annual', title: 'Annual Reports', icon: FileText, color: 'text-emerald-700 bg-emerald-50' },
  { id: 'impact', title: 'Impact Reports', icon: BarChart2, color: 'text-indigo-700 bg-indigo-50' },
  { id: 'case', title: 'Case Studies', icon: BookOpen, color: 'text-amber-700 bg-amber-50' },
  { id: 'brochure', title: 'CSR Brochures', icon: Briefcase, color: 'text-pink-700 bg-pink-50' },
  { id: 'policy', title: 'Policy Documents', icon: ShieldCheck, color: 'text-teal-700 bg-teal-50' },
  { id: 'training', title: 'Training Materials', icon: GraduationCap, color: 'text-violet-700 bg-violet-50' },
  { id: 'toolkit', title: 'Toolkits & Templates', icon: FolderOpen, color: 'text-rose-700 bg-rose-50' }
];

// Rich library database
const LIBRARY_RESOURCES: ResourceItem[] = [
  {
    id: 'res-csr-brochure',
    title: 'Raita Mitra Trust Comprehensive CSR Opportunities Brochure',
    category: 'brochure',
    categoryLabel: 'CSR Brochures',
    publishDate: 'June 2026',
    fileSize: '3.4 MB',
    fileType: 'PDF Brochure',
    downloadCount: 1240,
    rating: 4.9,
    featured: true,
    abstract: 'A complete corporate portfolio mapping active rural engagement sectors, statutory Section 135 compliance frameworks, and designated NITI Aayog development goals across northern districts.',
    author: 'Strategic Development Team'
  },
  {
    id: 'res-annual-2026',
    title: 'Annual Audited Financial Statements & Governance Report FY25-26',
    category: 'annual',
    categoryLabel: 'Annual Reports',
    publishDate: 'May 2026',
    fileSize: '5.1 MB',
    fileType: 'Audit PDF',
    downloadCount: 890,
    rating: 4.8,
    featured: true,
    abstract: 'Full balance sheet, program expenses, source funding, governance disclosure, and statutory auditor certificates verifying complete accountability.',
    author: 'Varma & Associates Chartered Accountants'
  },
  {
    id: 'res-ai-impact',
    title: 'Digital Literacy & Generative AI Literacy Inception Impact Assessment Report',
    category: 'impact',
    categoryLabel: 'Impact Reports',
    publishDate: 'June 2026',
    fileSize: '2.8 MB',
    fileType: 'Evaluation PDF',
    downloadCount: 540,
    rating: 4.7,
    featured: true,
    abstract: 'Independent statistical evaluation measuring digital self-efficacy, computer literacy gains, and remote micro-job opportunities among rural graduates in Dharwad and Savadatti.',
    author: 'Karnataka Rural Research Forum'
  },
  {
    id: 'res-case-farmer',
    title: 'Case Study: The 45% Input Cost Reduction Model of Savadatti Rice Farmers',
    category: 'case',
    categoryLabel: 'Case Studies',
    publishDate: 'April 2026',
    fileSize: '1.9 MB',
    fileType: 'Case Study PDF',
    downloadCount: 720,
    rating: 4.9,
    featured: false,
    abstract: 'A deep-dive analytical case study documenting the live application of Jeevamrutha compost formulas, biological pest deterrents, and microbial soil reconstruction.',
    author: 'Dr. Basavaraj Patil'
  },
  {
    id: 'res-case-women',
    title: 'Case Study: Dairy Collective Cooperative Model for Rural Women Entrepreneurship',
    category: 'case',
    categoryLabel: 'Case Studies',
    publishDate: 'March 2026',
    fileSize: '2.2 MB',
    fileType: 'Case Study PDF',
    downloadCount: 460,
    rating: 4.8,
    featured: false,
    abstract: 'Examining standard double-entry capacity training, micro-loan facilities, and direct supply-chain integrations established for marginal dairy farms.',
    author: 'Smt. Lakshmi Devamma'
  },
  {
    id: 'res-policy-child',
    title: 'Child Safeguarding & Preventive Community Care Policy Protocol',
    category: 'policy',
    categoryLabel: 'Policy Documents',
    publishDate: 'January 2026',
    fileSize: '1.1 MB',
    fileType: 'Policy PDF',
    downloadCount: 310,
    rating: 4.6,
    featured: false,
    abstract: 'Official compliance and ethics directive outlining the mandatory safety standards, volunteer vetting criteria, and local standard operating routines.',
    author: 'Ethics Advisory Council'
  },
  {
    id: 'res-toolkit-miyawaki',
    title: 'Arid Miyawaki Afforestation Field Toolkit (Kannada & English Edition)',
    category: 'toolkit',
    categoryLabel: 'Toolkits & Templates',
    publishDate: 'April 2026',
    fileSize: '4.7 MB',
    fileType: 'Interactive Toolkit',
    downloadCount: 650,
    rating: 4.9,
    featured: false,
    abstract: 'Detailed practical manual outlining soil treatment, dynamic native grid plantation spacing, local bio-organic fertilizer recipes, and water-surviving schedules.',
    author: 'Hegde Environmental Consultants'
  },
  {
    id: 'res-training-digital',
    title: 'Vernacular Generative AI & Digital Productivity Slide Deck',
    category: 'training',
    categoryLabel: 'Training Materials',
    publishDate: 'February 2026',
    fileSize: '8.4 MB',
    fileType: 'Slide Presentation',
    downloadCount: 910,
    rating: 4.8,
    featured: false,
    abstract: 'Modular educational curriculum including step-by-step visual training modules, secure internet usage rules, and introductory freelancing guides.',
    author: 'Prof. Arun Deshpande'
  }
];

const FAQ_ITEMS = [
  {
    q: "Can resources be downloaded freely by any organization?",
    a: "Yes. In accordance with Raita Mitra Social Trust's mandate for open research and complete operational transparency, all case studies, training manuals, and brochures are available for immediate download without any paywall."
  },
  {
    q: "Are reports available in local languages (Kannada)?",
    a: "Yes. Critical toolkits, training modules, and select program briefs are fully translated and illustrated in Kannada to support rural field coordinators and community leaders directly."
  },
  {
    q: "Can our organization request customized resource files?",
    a: "Yes. Corporate CSR committees and academic groups requiring specific regional metrics, audited ledger extracts, or detailed compliance statistics can use the request portal below to initiate a custom data package."
  },
  {
    q: "Are presentations available for open educational use?",
    a: "Absolutely. All slide decks, toolkits, and training guidelines are published under the Creative Commons License. Educators, students, and NGOs are free to adapt, modify, and present them with proper attribution to Raita Mitra Trust."
  },
  {
    q: "How frequently is the Resource Centre updated?",
    a: "We publish statutory filings, quarterly field assessments, and updated audit worksheets within 15 days of board reviews. Fresh educational toolkits are compiled monthly."
  }
];

export default function ResourceCentre({ highContrast }: { highContrast: boolean }) {
  // Navigation references
  const searchSectionRef = React.useRef<HTMLDivElement>(null);
  const requestSectionRef = React.useRef<HTMLDivElement>(null);

  // States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [aiRecommendationSelected, setAiRecommendationSelected] = useState<boolean>(false);
  const [activeMediaTab, setActiveMediaTab] = useState<'infographics' | 'videos' | 'podcasts'>('infographics');
  const [requestSubmitted, setRequestSubmitted] = useState<boolean>(false);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState<boolean>(false);
  
  // Folder tree toggle states
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'Annual Reports': true,
    'CSR Documents': true,
    'Case Studies': false,
    'Training Resources': false
  });

  // Resource request form state
  const [reqForm, setReqForm] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    category: 'annual',
    requirement: '',
    message: ''
  });

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingRequest(true);

    // POST document access request to Server backend
    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'Partner Onboarding',
        name: reqForm.fullName,
        email: reqForm.email,
        phone: reqForm.phone,
        subject: `Document Access Request: ${reqForm.requirement || reqForm.category}`,
        message: reqForm.message || 'Requested custom programmatic audits and governance dossiers.',
        metadata: {
          organization: reqForm.organization,
          category: reqForm.category,
          requirement: reqForm.requirement
        }
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Document access request logged:', data);
    })
    .catch(err => {
      console.error('Error logging document access request:', err);
    });

    setTimeout(() => {
      setIsSubmittingRequest(false);
      setRequestSubmitted(true);
      setReqForm({
        fullName: '',
        organization: '',
        email: '',
        phone: '',
        category: 'annual',
        requirement: '',
        message: ''
      });
      setTimeout(() => setRequestSubmitted(false), 5000);
    }, 1200);
  };

  // Filter logic representing keyword + AI semantic simulation
  const filteredResources = LIBRARY_RESOURCES.filter(res => {
    const matchesCategory = selectedCategory === 'all' || res.category === selectedCategory;
    
    const query = searchQuery.toLowerCase();
    const matchesQuery = searchQuery === '' || 
      res.title.toLowerCase().includes(query) || 
      res.abstract?.toLowerCase().includes(query) || 
      res.categoryLabel.toLowerCase().includes(query) ||
      res.author?.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });

  // Most Downloaded Resources
  const popularResources = [...LIBRARY_RESOURCES]
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, 3);

  return (
    <div className={`w-full relative overflow-x-hidden ${highContrast ? 'bg-black text-white' : 'bg-[#FAFAFA]'}`} id="resource-centre-knowledge-hub">
      
      {/* 1. HERO SECTION: PREMIUM KNOWLEDGE BANNER */}
      <section className="relative w-full min-h-[480px] md:min-h-[550px] flex items-center justify-center py-20 px-4 md:px-8 bg-slate-950 text-white overflow-hidden" id="resource-hero">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1600" 
            alt="Researchers, students, CSR leaders and communities accessing digital resources"
            className="w-full h-full object-cover opacity-15 filter contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest text-gold font-bold">
            <Sparkles size={14} className="text-gold animate-pulse" />
            OPEN-KNOWLEDGE REPOSITORY
          </div>
          
          <h1 className="font-display font-black text-4xl md:text-6xl tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
            Knowledge That Enables <span className="text-gold">Sustainable Change</span>
          </h1>
          
          <p className="text-slate-300 font-sans text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Explore verified trust reports, on-ground case studies, regional toolkits, and presentations engineered to empower local leadership and corporate CSR teams.
          </p>

          {/* Breadcrumb Navigation */}
          <nav className="flex justify-center items-center gap-2.5 text-xs text-slate-400 font-mono py-2">
            <span>Home</span>
            <ChevronRight size={12} />
            <span className="text-white font-bold">Resource Centre</span>
          </nav>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <button 
              onClick={() => searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className={`px-6 py-3.5 rounded-xl font-display font-extrabold text-sm tracking-wide cursor-pointer flex items-center gap-2 transition-all shadow-lg hover:scale-[1.02] ${
                highContrast ? 'bg-white text-black' : 'bg-gold hover:bg-gold-light text-slate-950'
              }`}
            >
              Browse Resources
            </button>
            <button 
              onClick={() => alert('Initiating download for standard FY26 CSR Brochure Pack.')}
              className={`px-6 py-3.5 rounded-xl font-display font-extrabold text-sm tracking-wide cursor-pointer flex items-center gap-2 transition-all border border-white/20 hover:bg-white/10 ${
                highContrast ? 'bg-black text-white border-2 border-white' : 'bg-white/5 text-white'
              }`}
            >
              <Download size={15} />
              Download CSR Brochure
            </button>
          </div>
        </div>
      </section>

      {/* 2. SEARCH SECTION: STICKY SEARCH BAR WITH AI SEMANTIC SIMULATION */}
      <section ref={searchSectionRef} className="py-12 px-4 md:px-8 max-w-7xl mx-auto" id="resource-search-portal">
        <div className={`p-8 rounded-3xl border text-left ${
          highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-xl'
        }`}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-forest uppercase">
                <Sparkles size={13} className="text-gold animate-bounce" />
                AI-Powered Semantic Search Engine
              </div>
              <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
                Find What You Need
              </h3>
            </div>
            
            {/* Semantic toggle */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  setAiRecommendationSelected(!aiRecommendationSelected);
                  if(!aiRecommendationSelected) {
                    setSearchQuery("Regenerative farming");
                  } else {
                    setSearchQuery("");
                  }
                }}
                className={`px-4.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                  aiRecommendationSelected 
                    ? 'bg-forest text-white border-forest shadow-md' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Sparkles size={14} />
                Try AI Recommendation: "Regenerative Farming"
              </button>
            </div>
          </div>

          {/* Search Box Grid */}
          <div className="mt-8 grid grid-cols-1 gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Ask me anything: e.g., 'NABARD incubation details', 'water management toolkits', or 'statutory annual statements'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl text-xs font-sans border focus:outline-none focus:ring-1 focus:ring-forest focus:border-forest ${
                  highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              />
            </div>
          </div>

          {/* Micro recommendation label */}
          {aiRecommendationSelected && (
            <div className="mt-3 p-3.5 rounded-2xl bg-forest/5 border border-forest/10 flex items-start gap-2.5 text-xs text-forest">
              <Info size={16} className="shrink-0 mt-0.5" />
              <p className="font-sans">
                <span className="font-bold">AI Recommendation Engine:</span> Found high-confidence semantic matches linking "Regenerative Farming" to dryland agronomy, Miyawaki afforestation spacing guides, and pesticide cost mitigation case studies.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. RESOURCE CATEGORIES SECTION */}
      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto" id="resource-categories">
        <div className="text-left space-y-1 mb-8">
          <span className="text-xs font-mono font-black text-forest uppercase tracking-widest">ARCHIVAL CLASSIFICATION</span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">
            Browse By Category
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => {
            const IconComp = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-5 rounded-2xl border-2 text-left flex items-start gap-4 cursor-pointer transition-all ${
                  isSelected 
                    ? highContrast ? 'bg-white text-black border-white' : 'bg-forest border-forest text-white shadow-md'
                    : highContrast ? 'bg-black text-white border-slate-700 hover:border-white' : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className={`p-3 rounded-xl shrink-0 ${isSelected ? 'bg-white/20' : cat.color}`}>
                  <IconComp size={20} />
                </div>
                <div className="min-w-0">
                  <span className="block font-display font-extrabold text-xs md:text-sm leading-snug truncate">
                    {cat.title}
                  </span>
                  <span className={`block text-[10px] mt-0.5 font-mono ${isSelected ? 'text-white/85' : 'text-slate-400'}`}>
                    {cat.id === 'all' 
                      ? `${LIBRARY_RESOURCES.length} documents` 
                      : `${LIBRARY_RESOURCES.filter(r => r.category === cat.id).length} files`
                    }
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURED RESOURCES SECTION */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto text-left" id="featured-resources">
        <div className="mb-8">
          <span className="text-xs font-mono font-black text-gold uppercase tracking-widest font-bold">TRUST ESSENTIALS</span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white mt-1">
            Featured Resources
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {LIBRARY_RESOURCES.filter(r => r.featured).map((res) => (
            <div 
              key={res.id}
              className={`group p-6 rounded-3xl border flex flex-col justify-between space-y-6 transition-all hover:shadow-xl ${
                highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-black text-forest bg-forest/5 px-2.5 py-0.5 rounded uppercase">
                    {res.categoryLabel}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{res.publishDate}</span>
                </div>

                <h3 className="font-display font-extrabold text-base md:text-lg text-slate-900 dark:text-white group-hover:text-forest transition-colors leading-snug">
                  {res.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-300 font-sans line-clamp-3 leading-relaxed">
                  {res.abstract}
                </p>

                <div className="text-[10px] font-mono text-slate-400">
                  <span>Author/Publisher: </span>
                  <span className="font-bold text-slate-600">{res.author}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400">{res.fileType} • {res.fileSize}</span>
                <button 
                  onClick={() => alert(`Initiating secure download for: ${res.title}`)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                    highContrast ? 'bg-white text-black' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <Download size={12} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DOWNLOADS STATS DASHBOARD SECTION */}
      <section className={`py-12 border-t border-b ${
        highContrast ? 'bg-black border-slate-800' : 'bg-slate-50 border-slate-100'
      }`} id="download-stats">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-left">
          <div className="mb-8">
            <span className="text-xs font-mono font-black text-forest uppercase tracking-widest font-bold">AUDIT READINESS &amp; POPULARITY</span>
            <h2 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-1">
              Most Downloaded Resources
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularResources.map((res, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 ${
                  highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">#0{idx+1} in Popularity</span>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold">
                    <Sparkles size={11} />
                    <span>Rating: {res.rating}</span>
                  </div>
                </div>

                <div className="text-left space-y-1">
                  <h3 className="font-display font-extrabold text-sm text-slate-800 dark:text-white leading-snug line-clamp-2">
                    {res.title}
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400">{res.categoryLabel} • {res.fileSize}</p>
                </div>

                <div className="pt-3 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center text-xs">
                  <span className="font-mono text-slate-500 font-bold">{res.downloadCount}+ downloads</span>
                  <button 
                    onClick={() => alert(`Starting download for popular resource: ${res.title}`)}
                    className="text-forest hover:underline font-mono font-bold inline-flex items-center gap-1.5"
                  >
                    Download
                    <Download size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DIGITAL LIBRARY FOLDER TREE DASHBOARD */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto text-left" id="document-library">
        <div className="mb-10">
          <span className="text-xs font-mono font-black text-gold uppercase tracking-widest font-bold">CENTRAL REPOSITORY</span>
          <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1">
            Digital Library
          </h2>
          <p className="text-slate-500 font-sans text-xs mt-1">
            An organized interactive folder tree representing our entire archival record index.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Folders Navigation Bar */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-wider font-bold">FOLDERS ARCHIVE</h4>
            <div className="space-y-1">
              {[
                { name: 'Annual Reports', count: 2 },
                { name: 'CSR Documents', count: 1 },
                { name: 'Case Studies', count: 2 },
                { name: 'Training Resources', count: 2 },
                { name: 'Policy Documents', count: 1 }
              ].map((folder) => {
                const isOpen = expandedFolders[folder.name];
                return (
                  <button
                    key={folder.name}
                    onClick={() => toggleFolder(folder.name)}
                    className={`w-full p-3 rounded-xl text-left flex items-center justify-between text-xs font-display font-bold cursor-pointer transition-all ${
                      isOpen
                        ? highContrast ? 'bg-white text-black' : 'bg-forest/5 text-forest'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FolderOpen size={15} className="text-gold shrink-0" />
                      <span>{folder.name}</span>
                    </div>
                    <span className="text-[10px] font-mono font-normal opacity-60">({folder.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Expanded Documents Panel */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-wider font-bold">DOCUMENT RECORDS</h4>
            
            <div className={`rounded-3xl border divide-y overflow-hidden ${
              highContrast ? 'border-2 border-white bg-black divide-white' : 'bg-white border-slate-100 divide-slate-100 shadow-sm'
            }`}>
              
              {/* Folder Block: Annual Reports */}
              {expandedFolders['Annual Reports'] && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400">
                    <ChevronDown size={14} />
                    <span>Annual Reports</span>
                  </div>
                  <div className="space-y-2 pl-4">
                    {LIBRARY_RESOURCES.filter(r => r.category === 'annual').map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                        <div className="flex items-center gap-2 truncate">
                          <FileText size={14} className="text-forest shrink-0" />
                          <span className="font-sans font-medium text-slate-800 dark:text-white truncate">{item.title}</span>
                        </div>
                        <button 
                          onClick={() => alert(`Starting download: ${item.title}`)}
                          className="text-forest hover:underline font-mono font-bold shrink-0 ml-4 flex items-center gap-1"
                        >
                          <Download size={12} />
                          {item.fileSize}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Folder Block: CSR Documents */}
              {expandedFolders['CSR Documents'] && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400">
                    <ChevronDown size={14} />
                    <span>CSR Documents &amp; Brochures</span>
                  </div>
                  <div className="space-y-2 pl-4">
                    {LIBRARY_RESOURCES.filter(r => r.category === 'brochure').map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                        <div className="flex items-center gap-2 truncate">
                          <FileCheck2 size={14} className="text-forest shrink-0" />
                          <span className="font-sans font-medium text-slate-800 dark:text-white truncate">{item.title}</span>
                        </div>
                        <button 
                          onClick={() => alert(`Starting download: ${item.title}`)}
                          className="text-forest hover:underline font-mono font-bold shrink-0 ml-4 flex items-center gap-1"
                        >
                          <Download size={12} />
                          {item.fileSize}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Folder Block: Case Studies */}
              {expandedFolders['Case Studies'] && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400">
                    <ChevronDown size={14} />
                    <span>Case Studies &amp; Research</span>
                  </div>
                  <div className="space-y-2 pl-4">
                    {LIBRARY_RESOURCES.filter(r => r.category === 'case').map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                        <div className="flex items-center gap-2 truncate">
                          <BookOpen size={14} className="text-forest shrink-0" />
                          <span className="font-sans font-medium text-slate-800 dark:text-white truncate">{item.title}</span>
                        </div>
                        <button 
                          onClick={() => alert(`Starting download: ${item.title}`)}
                          className="text-forest hover:underline font-mono font-bold shrink-0 ml-4 flex items-center gap-1"
                        >
                          <Download size={12} />
                          {item.fileSize}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Folder Block: Training Resources */}
              {expandedFolders['Training Resources'] && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400">
                    <ChevronDown size={14} />
                    <span>Training Resources</span>
                  </div>
                  <div className="space-y-2 pl-4">
                    {LIBRARY_RESOURCES.filter(r => r.category === 'training' || r.category === 'toolkit').map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                        <div className="flex items-center gap-2 truncate">
                          <GraduationCap size={14} className="text-forest shrink-0" />
                          <span className="font-sans font-medium text-slate-800 dark:text-white truncate">{item.title}</span>
                        </div>
                        <button 
                          onClick={() => alert(`Starting download: ${item.title}`)}
                          className="text-forest hover:underline font-mono font-bold shrink-0 ml-4 flex items-center gap-1"
                        >
                          <Download size={12} />
                          {item.fileSize}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* 7. MULTIMEDIA SECTION: VIDEOS, INFOGRAPHICS & EMBEDS */}
      <section className={`py-16 border-t border-b ${
        highContrast ? 'bg-black border-slate-800' : 'bg-[#FAFAFA] border-slate-100'
      }`} id="multimedia-library">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-left space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-xs font-mono font-black text-forest uppercase tracking-widest font-bold">INTERACTIVE DATA VISUALIZATIONS</span>
              <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1">
                Multimedia Library
              </h2>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900">
              {[
                { id: 'infographics', label: 'Infographics' },
                { id: 'videos', label: 'Videos & Webinars' },
                { id: 'podcasts', label: 'Podcasts' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMediaTab(tab.id as any)}
                  className={`px-4.5 py-2 rounded-lg text-xs font-display font-bold transition-all cursor-pointer ${
                    activeMediaTab === tab.id
                      ? highContrast ? 'bg-white text-black' : 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Multimedia Content Panels */}
          <div>
            {activeMediaTab === 'infographics' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Visual infographic card 1 */}
                <div className={`p-6 rounded-3xl border text-left ${
                  highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
                }`}>
                  <span className="text-[10px] font-mono font-black text-forest uppercase">MAPPED OUTREACH</span>
                  <h4 className="font-display font-extrabold text-sm md:text-base text-slate-800 dark:text-white mt-1">District Impact Mapping</h4>
                  <div className="mt-4 h-40 bg-slate-100 rounded-2xl flex flex-col items-center justify-center border border-dashed border-slate-200">
                    <Map className="text-forest animate-pulse mb-2" size={32} />
                    <span className="text-[10px] font-mono text-slate-400">12 Districts Covered in North Karnataka</span>
                    <span className="text-[9px] font-mono text-slate-500 mt-0.5">Dharwad, Savadatti, Bagalkot, Koppal...</span>
                  </div>
                </div>

                {/* Visual infographic card 2 */}
                <div className={`p-6 rounded-3xl border text-left ${
                  highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
                }`}>
                  <span className="text-[10px] font-mono font-black text-indigo-700 uppercase">GROWTH TIMELINE</span>
                  <h4 className="font-display font-extrabold text-sm md:text-base text-slate-800 dark:text-white mt-1">Beneficiary Growth Graph</h4>
                  <div className="mt-4 h-40 bg-slate-100 rounded-2xl flex flex-col items-center justify-center border border-dashed border-slate-200">
                    <TrendingUp className="text-indigo-600 mb-2" size={32} />
                    <span className="text-[10px] font-mono text-slate-400">5,000+ Farmers Active This Quarter</span>
                    <span className="text-[9px] font-mono text-slate-500 mt-0.5">Y-o-Y increase: 34% cooperative adoption</span>
                  </div>
                </div>

                {/* Visual infographic card 3 */}
                <div className={`p-6 rounded-3xl border text-left ${
                  highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
                }`}>
                  <span className="text-[10px] font-mono font-black text-amber-700 uppercase">ALIGNMENT MODEL</span>
                  <h4 className="font-display font-extrabold text-sm md:text-base text-slate-800 dark:text-white mt-1">SDG Alignment Matrix</h4>
                  <div className="mt-4 h-40 bg-slate-100 rounded-2xl flex flex-col items-center justify-center border border-dashed border-slate-200">
                    <Globe className="text-amber-600 mb-2" size={32} />
                    <span className="text-[10px] font-mono text-slate-400">UN SDG compliant development mapping</span>
                    <span className="text-[9px] font-mono text-slate-500 mt-0.5">SDG 1 (No Poverty), SDG 5 (Gender Equality)...</span>
                  </div>
                </div>

              </div>
            )}

            {activeMediaTab === 'videos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="rounded-3xl overflow-hidden aspect-video bg-black border border-slate-100 relative">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    title="Rural Computer Lab Inception Webinar"
                    allowFullScreen
                  />
                </div>
                <div className="rounded-3xl overflow-hidden aspect-video bg-black border border-slate-100 relative">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    title="Miyawaki Forestation Technical Field Tutorial"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {activeMediaTab === 'podcasts' && (
              <div className="p-8 text-center bg-slate-100 rounded-3xl">
                <Layers className="mx-auto text-slate-300 mb-4 animate-spin" size={40} />
                <p className="text-slate-500 font-mono text-xs">Podcast Library is expanding soon. Dynamic voice episodes mapping rural governance will be updated here in August 2026.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. RESOURCE REQUEST PORTAL */}
      <section ref={requestSectionRef} className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="resource-request">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          {/* Left Decorative Column */}
          <div className="lg:col-span-2 space-y-6 text-left">
            <span className="text-xs font-mono font-black text-gold uppercase tracking-widest font-bold">TAILORED INQUIRIES</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-950 dark:text-white leading-tight">
              Need A Specific Resource?
            </h2>
            <p className="text-slate-500 font-sans text-sm leading-relaxed font-light">
              Are you preparing academic theses, looking for micro-finance ledger audits, or designing corporate CSR campaigns? Connect with our knowledge coordinator to compile custom reports.
            </p>

            <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 space-y-4">
              <h4 className="font-display font-bold text-sm text-slate-800 dark:text-white">PR &amp; Academic Liaison Desk:</h4>
              <div className="space-y-2.5 text-xs font-mono text-slate-600 dark:text-slate-400">
                <p className="flex items-center gap-2">
                  <Mail size={14} className="text-forest shrink-0" />
                  <span>coordination@raitamitra.org</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={14} className="text-forest shrink-0" />
                  <span>+91 94805 54321</span>
                </p>
                <p className="flex items-center gap-2">
                  <Building size={14} className="text-gold shrink-0" />
                  <span>Raita Mitra Social Trust HQ, Dharwad, Karnataka</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className={`lg:col-span-3 rounded-3xl p-8 border ${
            highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-xl'
          }`}>
            <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white mb-6">
              Resource Request Form
            </h3>

            {requestSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="font-display font-bold text-lg text-slate-800 dark:text-white">Request Dispatched Successfully</h4>
                <p className="text-xs text-slate-500 font-sans max-w-sm mx-auto">
                  Your custom data pack requirements have been logged. Our coordinator will formulate the files and contact you via email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-mono text-slate-500 uppercase font-bold">Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={reqForm.fullName}
                      onChange={(e) => setReqForm({...reqForm, fullName: e.target.value})}
                      className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-forest ${
                        highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-mono text-slate-500 uppercase font-bold">Organization / Institution *</label>
                    <input 
                      type="text" 
                      required 
                      value={reqForm.organization}
                      onChange={(e) => setReqForm({...reqForm, organization: e.target.value})}
                      className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-forest ${
                        highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-mono text-slate-500 uppercase font-bold">Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      value={reqForm.email}
                      onChange={(e) => setReqForm({...reqForm, email: e.target.value})}
                      className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-forest ${
                        highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-mono text-slate-500 uppercase font-bold">Phone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      value={reqForm.phone}
                      onChange={(e) => setReqForm({...reqForm, phone: e.target.value})}
                      className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-forest ${
                        highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-mono text-slate-500 uppercase font-bold">Resource Category</label>
                  <select 
                    value={reqForm.category}
                    onChange={(e) => setReqForm({...reqForm, category: e.target.value})}
                    className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-forest ${
                      highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <option value="annual">Audited Annual Reports &amp; Balance Sheets</option>
                    <option value="impact">Field Impact Evaluation Statistics</option>
                    <option value="case">On-Ground Case Study Details</option>
                    <option value="toolkit">Technical Miyawaki / Agronomy Guides</option>
                    <option value="other">Other Customized Compliance Requirements</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-mono text-slate-500 uppercase font-bold">Specific Requirement Message *</label>
                  <textarea 
                    rows={4}
                    required 
                    value={reqForm.requirement}
                    onChange={(e) => setReqForm({...reqForm, requirement: e.target.value})}
                    className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-forest ${
                      highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                    placeholder="Specify target region, required metrics timeline, or data utilization scope..."
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmittingRequest}
                  className={`w-full py-3 rounded-xl font-display font-extrabold text-xs cursor-pointer text-center transition-all ${
                    highContrast ? 'bg-white text-black' : 'bg-forest text-white hover:bg-forest-light shadow-md'
                  }`}
                >
                  {isSubmittingRequest ? 'Submitting request...' : 'Submit Resource Request'}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className={`py-16 border-t ${
        highContrast ? 'bg-black border-slate-800' : 'bg-slate-50 border-slate-100'
      }`} id="resource-faq">
        <div className="max-w-4xl mx-auto px-4 text-left space-y-8">
          <div className="text-center">
            <span className="text-xs font-mono font-black text-forest uppercase tracking-widest font-bold">VALIDATED FAQS</span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <div 
                key={idx}
                className={`rounded-2xl border ${
                  highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="p-5 flex justify-between items-center text-left font-display font-bold text-xs md:text-sm text-slate-800 dark:text-white">
                  <span>{item.q}</span>
                </div>
                <div className="px-5 pb-5 pt-1 text-xs text-slate-500 font-sans leading-relaxed border-t border-slate-50 dark:border-slate-900">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
