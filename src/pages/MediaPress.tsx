import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Download, 
  Search, 
  Newspaper, 
  ExternalLink, 
  Award, 
  Video, 
  Image as ImageIcon, 
  FolderOpen, 
  Palette, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Mail, 
  Phone, 
  Building, 
  ChevronDown, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  ArrowRight,
  Briefcase
} from 'lucide-react';

// Types
interface NewsCard {
  id: string;
  title: string;
  category: 'Impact' | 'Collaboration' | 'Success' | 'Announcement';
  date: string;
  source?: string;
  summary: string;
  image: string;
}

interface PressRelease {
  id: string;
  title: string;
  publishDate: string;
  pdfUrl: string;
  tags: string[];
}

interface MediaCoverageItem {
  id: string;
  title: string;
  source: string;
  logoText: string;
  category: 'Newspaper Features' | 'Online Publications' | 'TV Coverage' | 'Government Mentions';
  date: string;
  link: string;
}

// Data Sets
const FEATURED_NEWS: NewsCard[] = [
  {
    id: 'news-1',
    title: 'Raita Mitra Trust Partners with NABARD to Establish 15 New Rural Incubation Centres',
    category: 'Collaboration',
    date: 'June 28, 2026',
    summary: 'A landmark partnership of ₹4.5 Crores signed to build custom digital skill classrooms, high-tech composting pits, and cold-chain logistics across northern Karnataka.',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'news-2',
    title: 'How Generative AI Skills Changed the Career Trajectory of 120 Village High Schoolers',
    category: 'Impact',
    date: 'May 15, 2026',
    summary: 'Raita Mitra\'s specialized vernacular generative AI syllabus leads to first-ever local freelance graphic and content micro-jobs in Savadatti and Haveri.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'news-3',
    title: 'Smt. Lakshmi Gowda Named CSR Champion of Karnataka for Rural Women Dairy Collective',
    category: 'Success',
    date: 'April 20, 2026',
    summary: 'Under Lakshmi\'s stellar guidance, local milk production cooperatives generated ₹18 Lakhs in self-sustaining debt relief and micro-loans this financial year.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800'
  }
];

const PRESS_RELEASES: PressRelease[] = [
  {
    id: 'pr-1',
    title: 'Raita Mitra Announces Miyawaki Forestation Drive Map Covering Arid Perimeter Bagalkot',
    publishDate: 'June 18, 2026',
    pdfUrl: '#',
    tags: ['Afforestation', 'Climate Action', 'CSR']
  },
  {
    id: 'pr-2',
    title: 'NITI Aayog Praises Raita Mitra Trust For Strict CSR-1 Filing and Direct Beneficiary Audit Logs',
    publishDate: 'May 29, 2026',
    pdfUrl: '#',
    tags: ['Compliance', 'NITI Aayog', 'Audit']
  },
  {
    id: 'pr-3',
    title: 'Launch of Free Anemia and Maternal Preventive Healthcare Camps Across Northern Districts',
    publishDate: 'May 10, 2026',
    pdfUrl: '#',
    tags: ['Health', 'Preventive Health', 'Rural Care']
  },
  {
    id: 'pr-4',
    title: 'Launch of Modern Millet Baking Incubator and Organic Nutritional Labeling Hub at Gadag',
    publishDate: 'April 05, 2026',
    pdfUrl: '#',
    tags: ['Millet', 'Entrepreneurship', 'Value Addition']
  }
];

const MEDIA_COVERAGE: MediaCoverageItem[] = [
  {
    id: 'cov-1',
    title: 'Raita Mitra: Cultivating Digital Intelligence in Remote Northern Schools',
    source: 'The Hindu',
    logoText: 'TH',
    category: 'Newspaper Features',
    date: 'June 12, 2026',
    link: 'https://thehindu.com'
  },
  {
    id: 'cov-2',
    title: 'Pioneering Miyawaki Urban Afforestation Shielding Arid Watersheds of Gadag',
    source: 'Deccan Herald',
    logoText: 'DH',
    category: 'Online Publications',
    date: 'May 22, 2026',
    link: 'https://deccanherald.com'
  },
  {
    id: 'cov-3',
    title: 'Prime Time Spotlight: How Micro-finance Saved Savadatti Farmers from High-Interest Debt Loops',
    source: 'Suvarna News',
    logoText: 'SN',
    category: 'TV Coverage',
    date: 'April 30, 2026',
    link: 'https://youtube.com'
  },
  {
    id: 'cov-4',
    title: 'State Development Report: Raita Mitra Model Suggested for Village Cooperative Digitization',
    source: 'Govt of Karnataka Press Release',
    logoText: 'GOK',
    category: 'Government Mentions',
    date: 'March 15, 2026',
    link: 'https://karnataka.gov.in'
  }
];

const AWARDS = [
  {
    year: '2026',
    title: 'Karnataka State Environment Conservation Shield',
    issuer: 'Department of Ecology, Govt of Karnataka',
    description: 'Awarded for pioneering dense Miyawaki afforestation campaigns planting over 45,000 native saplings in drought-prone areas.'
  },
  {
    year: '2025',
    title: 'CSR Excellence and Transparency Award',
    issuer: 'Social Venture Summit India',
    description: 'Honored with highest level of structural audits and double-entry trust transparency mapping across South India.'
  },
  {
    year: '2024',
    title: 'Best Rural Innovation and Capacity Builder',
    issuer: 'NABARD Rural Outreach Forum',
    description: 'Recognized for establishing bio-organic preparation models (Jeevamrutha Composting) that cut farmer inputs cost by 45%.'
  }
];

const MEDIA_KIT_RESOURCES = [
  { title: "Trust Profile & Legal Compliances", icon: FileText, size: "2.4 MB", type: "PDF Booklet" },
  { title: "Comprehensive Media Kit (2026)", icon: FolderOpen, size: "12.8 MB", type: "ZIP Archive" },
  { title: "Official Brand & Logo Guidelines", icon: Palette, size: "1.8 MB", type: "Style Guide" },
  { title: "High-Res Logo Assets (Vector Packs)", icon: ImageIcon, size: "5.4 MB", type: "ZIP Bundle" },
  { title: "Portraits of Board Members", icon: Users, size: "8.1 MB", type: "JPG Asset Pack" },
  { title: "CSR Collaboration Brochure", icon: BookOpen, size: "3.2 MB", type: "Interactive PDF" }
];

const LEADERSHIP = [
  {
    name: "Dr. Basavaraj Patil",
    role: "President & Founder Trustee",
    bio: "Pioneering dryland agronomist and social leader. Guides active soil-conservation workshops across 12 northern districts.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Smt. Lakshmi Devamma",
    role: "Director of Women Empowerment",
    bio: "Former cooperative bank analyst and NABARD fellow. Spearheads double-entry capacity training for 40+ SHG cooperatives.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Prof. Arun Deshpande",
    role: "Chief Digital Literacy Architect",
    bio: "IISc alumnus and tech activist. Designs low-power solar computer learning centers running custom native curricula.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  }
];

const FAQ_ITEMS = [
  {
    q: "How can journalists request official interviews?",
    a: "Please fill out the Media Enquiries form below, or contact our public relations office at pr@raitamitra.org. We typically schedule interviews with our board members within 24 to 48 hours."
  },
  {
    q: "Where can high-resolution media assets be downloaded?",
    a: "You can download print-quality photos, logos, vector templates, and our standard brand color guidelines directly under the 'Media Resource Centre' and 'Brand Assets' grid sections on this page."
  },
  {
    q: "How can media houses collaborate on reporting?",
    a: "We welcome video crews, photojournalists, and print reporters to join our scheduled regional field camps. We provide local coordination, on-ground translations, and transparent beneficiary interviews."
  },
  {
    q: "Who handles strategic press and CSR communications?",
    a: "Our Board of Trustees, assisted by official NABARD and corporate liaison advisers, reviews all press requests to ensure highest compliance with CSR-1 disclosure parameters."
  },
  {
    q: "Can reporters visit active training and Miyawaki project sites?",
    a: "Yes. Site visits can be arranged to Dharwad, Savadatti, Bagalkot, or Koppal by requesting an appointment. Our local project leads will accompany journalists for authentic evaluations."
  }
];

export default function MediaPress({ highContrast }: { highContrast: boolean }) {
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Photos' | 'Videos' | 'Press Conferences'>('Photos');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  
  // Form State
  const [form, setForm] = useState({
    name: '',
    organization: '',
    designation: '',
    email: '',
    phone: '',
    mediaType: 'Print',
    subject: '',
    deadline: '',
    message: ''
  });

  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // Filters
  const filteredPressReleases = PRESS_RELEASES.filter(pr => 
    pr.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    pr.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactSubmitted(true);
      setForm({
        name: '',
        organization: '',
        designation: '',
        email: '',
        phone: '',
        mediaType: 'Print',
        subject: '',
        deadline: '',
        message: ''
      });
      setTimeout(() => setContactSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <div className={`w-full relative overflow-x-hidden ${highContrast ? 'bg-black text-white' : 'bg-[#FAFAFA]'}`} id="media-press-hub">
      
      {/* 1. HERO SECTION: PREMIUM EDITORIAL BANNER */}
      <section className="relative w-full min-h-[480px] md:min-h-[550px] flex items-center justify-center py-20 px-4 md:px-8 bg-slate-950 text-white overflow-hidden" id="media-hero-section">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600" 
            alt="Press conferences, community impact stories and media coverage"
            className="w-full h-full object-cover opacity-15 filter contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest text-gold font-bold">
            <Sparkles size={14} className="text-gold animate-pulse" />
            OFFICIAL NEWSROOM &amp; PRESS DESK
          </div>
          
          <h1 className="font-display font-black text-4xl md:text-6xl tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
            Media &amp; <span className="text-gold">Press Centre</span>
          </h1>
          
          <p className="text-slate-300 font-sans text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Discover validated impact reports, press statements, newspaper write-ups, and downloadable branding resources representing Raita Mitra Trust outreach.
          </p>

          {/* Breadcrumb Navigation */}
          <nav className="flex justify-center items-center gap-2.5 text-xs text-slate-400 font-mono py-2">
            <span>Home</span>
            <ChevronRight size={12} />
            <span>Resources</span>
            <ChevronRight size={12} />
            <span className="text-white font-bold">Media &amp; Press Centre</span>
          </nav>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <a 
              href="#media-kit-downloads"
              className={`px-6 py-3.5 rounded-xl font-display font-extrabold text-sm tracking-wide cursor-pointer flex items-center gap-2 transition-all shadow-lg hover:scale-[1.02] ${
                highContrast ? 'bg-white text-black' : 'bg-gold hover:bg-gold-light text-slate-950'
              }`}
            >
              <Download size={16} />
              Download Media Kit
            </a>
            <a 
              href="#media-enquiry-form"
              className={`px-6 py-3.5 rounded-xl font-display font-extrabold text-sm tracking-wide cursor-pointer flex items-center gap-2 transition-all border border-white/20 hover:bg-white/10 ${
                highContrast ? 'bg-black text-white border-2 border-white' : 'bg-white/5 text-white'
              }`}
            >
              Contact Media Team
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. FEATURED NEWS SECTION */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto text-left" id="featured-news-section">
        <div className="mb-10">
          <span className="text-xs font-mono font-black text-gold uppercase tracking-widest">EDITORIAL SPOTLIGHT</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white mt-1">
            Featured News
          </h2>
          <p className="text-slate-500 font-sans text-sm mt-2 max-w-xl">
            Major announcements, award notices, and collaborative breakthroughs making on-ground differences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {FEATURED_NEWS.map((news) => (
            <article 
              key={news.id}
              className={`group flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${
                highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="relative h-56 overflow-hidden shrink-0">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] font-mono font-bold bg-gold text-slate-950 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {news.category}
                </span>
                <span className="absolute bottom-4 left-4 text-xs font-mono text-white/90">
                  {news.date}
                </span>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-lg md:text-xl text-slate-900 dark:text-white leading-snug group-hover:text-forest transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-300 font-sans leading-relaxed">
                    {news.summary}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-semibold text-forest">
                  <span>Read Full Article</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. PRESS RELEASES SECTION */}
      <section className={`py-16 border-t border-b ${
        highContrast ? 'bg-black border-slate-800' : 'bg-slate-50 border-slate-100'
      }`} id="press-releases">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-left">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <span className="text-xs font-mono font-black text-forest uppercase tracking-widest">STATUTORY COMMUNIQUÉS</span>
              <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1">
                Press Releases
              </h2>
            </div>

            {/* Search filter for press releases */}
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search releases or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-sans border focus:outline-none focus:ring-1 focus:ring-forest ${
                  highContrast ? 'bg-black border-white text-white' : 'bg-white border-slate-200 text-slate-800'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPressReleases.length > 0 ? (
              filteredPressReleases.map((pr) => (
                <div 
                  key={pr.id}
                  className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 transition-all hover:shadow-md ${
                    highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-slate-400 font-bold">{pr.publishDate}</span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-red-600 bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded">
                        Verified PDF
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-base md:text-lg text-slate-800 dark:text-white leading-snug">
                      {pr.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {pr.tags.map((t, idx) => (
                      <span key={idx} className="text-[9px] font-mono font-semibold bg-slate-100 text-slate-600 dark:bg-slate-900 px-2 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                    <button 
                      onClick={() => alert(`Downloading Press Release PDF for: ${pr.title}`)}
                      className={`inline-flex items-center gap-2 text-xs font-mono font-bold text-forest hover:underline cursor-pointer`}
                    >
                      <Download size={14} />
                      Download Press PDF (English &amp; Kannada)
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-slate-500 font-mono text-sm">No press releases match your search query.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. MEDIA COVERAGE SECTION */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto text-left" id="media-coverage">
        <div className="mb-10">
          <span className="text-xs font-mono font-black text-gold uppercase tracking-widest">EXTERNAL PUBLICATIONS</span>
          <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1">
            Media Coverage
          </h2>
          <p className="text-slate-500 font-sans text-xs mt-2">
            Independent coverage of our community initiatives documented by mainstream journalism houses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {MEDIA_COVERAGE.map((cov) => (
            <div 
              key={cov.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between min-h-[200px] transition-all hover:shadow-md ${
                highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="h-7 px-2.5 rounded bg-slate-900 flex items-center justify-center text-[10px] font-mono font-black text-gold tracking-wider">
                    {cov.source}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{cov.date}</span>
                </div>
                
                <h3 className="font-display font-extrabold text-xs md:text-sm text-slate-800 dark:text-white leading-snug pt-2">
                  "{cov.title}"
                </h3>
              </div>

              <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center text-[11px] font-mono">
                <span className="text-slate-400">{cov.category}</span>
                <a 
                  href={cov.link}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="text-forest hover:underline inline-flex items-center gap-1 font-bold"
                >
                  Visit Link
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. AWARDS & RECOGNITION SECTION */}
      <section className={`py-16 border-t border-b ${
        highContrast ? 'bg-black border-slate-800' : 'bg-slate-50 border-slate-100'
      }`} id="awards">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-left space-y-10">
          <div>
            <span className="text-xs font-mono font-black text-forest uppercase tracking-widest">GOVERNMENT &amp; CSR AUDITS</span>
            <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1">
              Awards &amp; Recognitions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {AWARDS.map((aw, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-3xl border relative overflow-hidden flex flex-col justify-between ${
                  highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-forest/5 rounded-bl-full flex items-start justify-end p-4">
                  <Award size={24} className="text-gold" />
                </div>

                <div className="space-y-4">
                  <span className="inline-block text-sm font-mono font-black text-forest bg-forest/5 px-3 py-1 rounded-full">
                    {aw.year}
                  </span>

                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-base md:text-lg text-slate-800 dark:text-white">
                      {aw.title}
                    </h3>
                    <p className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                      Issued by: {aw.issuer}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    {aw.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MEDIA GALLERY TABBED SECTION */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto text-left" id="media-gallery">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <span className="text-xs font-mono font-black text-gold uppercase tracking-widest">ON-GROUND DOCUMENTARY</span>
            <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1">
              Media Gallery
            </h2>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900">
            {(['Photos', 'Videos', 'Press Conferences'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-display font-bold transition-all cursor-pointer ${
                  activeTab === tab
                    ? highContrast ? 'bg-white text-black' : 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeTab === 'Photos' && (
            <>
              <div className="rounded-3xl overflow-hidden h-72 relative group border border-slate-100">
                <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600" alt="Farmers Training" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 text-left">
                  <span className="text-[10px] font-mono text-gold font-bold">FIELD CAMP</span>
                  <p className="text-xs font-sans text-white font-bold">Regenerative Farming Composting</p>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden h-72 relative group border border-slate-100">
                <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600" alt="Rural Computer Classroom" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 text-left">
                  <span className="text-[10px] font-mono text-gold font-bold">DIGITAL INCLUSION</span>
                  <p className="text-xs font-sans text-white font-bold">Rural AI Literacy Classroom</p>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden h-72 relative group border border-slate-100">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600" alt="SHG Meeting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 text-left">
                  <span className="text-[10px] font-mono text-gold font-bold">SHG FINANCE</span>
                  <p className="text-xs font-sans text-white font-bold">Women Cooperative Audit Training</p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'Videos' && (
            <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-3xl overflow-hidden border border-slate-100 bg-black aspect-video relative group">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="Farmer Success Stories Video Highlights"
                  allowFullScreen
                />
              </div>
              <div className="rounded-3xl overflow-hidden border border-slate-100 bg-black aspect-video relative group">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="Rural AI Literacy Classroom Inception Video"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {activeTab === 'Press Conferences' && (
            <div className="col-span-3 text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-3xl">
              <ImageIcon size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 font-mono text-xs">Press meet visual catalogs from Dharwad Town Panchayat are archived. Please check our Media Kit download packs.</p>
            </div>
          )}
        </div>
      </section>

      {/* 7. MEDIA RESOURCE CENTRE (DOWNLOADS) */}
      <section className={`py-16 border-t border-b ${
        highContrast ? 'bg-black border-slate-800' : 'bg-[#FAFAFA] border-slate-100'
      }`} id="media-kit-downloads">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-left space-y-10">
          <div>
            <span className="text-xs font-mono font-black text-forest uppercase tracking-widest font-bold">JOURNALIST HELPDESK</span>
            <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1">
              Media Resource Centre
            </h2>
            <p className="text-slate-500 font-sans text-xs mt-1">
              Print-quality corporate files, logo vectors, leader portraits, and verified brochures ready for immediate distribution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MEDIA_KIT_RESOURCES.map((res, idx) => {
              const IconComp = res.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-3xl border flex items-start gap-4 transition-all hover:shadow-md ${
                    highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
                  }`}
                >
                  <div className="p-3 rounded-2xl bg-forest/5 text-forest shrink-0">
                    <IconComp size={22} />
                  </div>

                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="text-left">
                      <h3 className="font-display font-extrabold text-sm md:text-base text-slate-800 dark:text-white truncate">
                        {res.title}
                      </h3>
                      <p className="text-[10px] font-mono text-slate-400 mt-1">
                        {res.type} | Size: <span className="font-bold text-slate-600">{res.size}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => alert(`Starting download for: ${res.title}`)}
                      className={`px-3 py-1.5 rounded-lg font-mono font-bold text-[10px] inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                        highContrast ? 'bg-white text-black' : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      <Download size={11} />
                      Download Asset
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. LEADERSHIP PROFILES */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto text-left" id="leadership-profiles">
        <div className="mb-10">
          <span className="text-xs font-mono font-black text-gold uppercase tracking-widest font-bold">THE TEAM REPRESENTING US</span>
          <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1">
            Leadership Profiles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LEADERSHIP.map((leader, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 ${
                highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <img 
                  src={leader.image} 
                  alt={leader.name} 
                  className="w-16 h-16 rounded-full object-cover shrink-0"
                />
                <div>
                  <h3 className="font-display font-extrabold text-base text-slate-800 dark:text-white leading-tight">
                    {leader.name}
                  </h3>
                  <p className="text-xs text-forest font-mono mt-0.5">
                    {leader.role}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                {leader.bio}
              </p>

              <div className="pt-2 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                <button
                  onClick={() => alert(`Downloading official portrait for: ${leader.name}`)}
                  className="text-[10px] font-mono text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                >
                  <Download size={12} />
                  Download Press Portrait
                </button>
                <div className="flex gap-2">
                  <a href="#" className="text-slate-400 hover:text-forest"><Linkedin size={14} /></a>
                  <a href="#" className="text-slate-400 hover:text-forest"><Twitter size={14} /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. IMPACT SNAPSHOT */}
      <section className={`py-12 ${highContrast ? 'bg-black' : 'bg-forest text-white'}`} id="impact-snapshot-press">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-8">
          <div>
            <span className={`text-xs font-mono font-black uppercase tracking-widest ${highContrast ? 'text-white' : 'text-gold'}`}>OUTREACH STATS FOR REPORTERS</span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl mt-1">
              Raita Mitra Impact Snapshot
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { count: "5,000+", title: "Farmers Empowered" },
              { count: "3,000+", title: "Youth Trained" },
              { count: "1,500+", title: "Livelihoods Supported" },
              { count: "12+", title: "Districts Covered" }
            ].map((st, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                <p className="font-display font-black text-3xl md:text-4xl text-gold">{st.count}</p>
                <p className="text-xs text-slate-200 mt-2 font-medium">{st.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. MEDIA ENQUIRIES CONTACT FORM */}
      <section ref={form => {}} className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="media-enquiry-form">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-2 space-y-6 text-left">
            <span className="text-xs font-mono font-black text-gold uppercase tracking-widest">VALIDATED CORRESPONDENCE</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-950 dark:text-white leading-tight">
              Media Enquiries
            </h2>
            <p className="text-slate-500 font-sans text-sm leading-relaxed font-light">
              Are you writing a report, investigating field micro-finance systems, or filming a documentary on dryland organic farming? Connect directly with our liaison desk.
            </p>

            <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 space-y-4">
              <h4 className="font-display font-bold text-sm text-slate-800 dark:text-white">PR Outreach Contacts:</h4>
              <div className="space-y-2.5 text-xs font-mono text-slate-600 dark:text-slate-400">
                <p className="flex items-center gap-2">
                  <Mail size={14} className="text-forest shrink-0" />
                  <span>pr@raitamitra.org</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={14} className="text-forest shrink-0" />
                  <span>+91 94805 12345 (Liaison Lead)</span>
                </p>
                <p className="flex items-center gap-2">
                  <Building size={14} className="text-gold shrink-0" />
                  <span>Raita Mitra Social Trust HQ, Dharwad, Karnataka</span>
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-40 border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600" 
                alt="Journalists interviewing local farmers"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right actual form column */}
          <div className={`lg:col-span-3 rounded-3xl p-8 border ${
            highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-xl'
          }`}>
            <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white mb-6">
              Press Contact Portal
            </h3>

            {contactSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="font-display font-bold text-lg text-slate-800 dark:text-white">Press Ticket Dispatched Successfully</h4>
                <p className="text-xs text-slate-500 font-sans max-w-sm mx-auto">
                  Your enquiry has been logged with Raita Mitra Board relations. One of our liaison leads will get back to you within 12 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-mono text-slate-500 uppercase font-bold">Contact Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-forest ${
                        highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-mono text-slate-500 uppercase font-bold">Press/Media House *</label>
                    <input 
                      type="text" 
                      required 
                      value={form.organization}
                      onChange={(e) => setForm({...form, organization: e.target.value})}
                      className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-forest ${
                        highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-mono text-slate-500 uppercase font-bold">Official Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
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
                      value={form.phone}
                      onChange={(e) => setForm({...form, phone: e.target.value})}
                      className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-forest ${
                        highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-mono text-slate-500 uppercase font-bold">Media Type</label>
                    <select 
                      value={form.mediaType}
                      onChange={(e) => setForm({...form, mediaType: e.target.value})}
                      className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-forest ${
                        highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <option value="Print">Print Publication / Newspaper</option>
                      <option value="Online">Online Blog / Digital Portal</option>
                      <option value="TV">TV / Video Broadcast</option>
                      <option value="Researcher">Independent Academic Researcher</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-mono text-slate-500 uppercase font-bold">Publishing Deadline *</label>
                    <input 
                      type="date" 
                      required 
                      value={form.deadline}
                      onChange={(e) => setForm({...form, deadline: e.target.value})}
                      className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-forest ${
                        highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-mono text-slate-500 uppercase font-bold">Subject *</label>
                  <input 
                    type="text" 
                    required 
                    value={form.subject}
                    onChange={(e) => setForm({...form, subject: e.target.value})}
                    className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-forest ${
                      highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-mono text-slate-500 uppercase font-bold">Enquiry Message *</label>
                  <textarea 
                    rows={4}
                    required 
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-forest ${
                      highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                    placeholder="Specific questions, site visit requests, interview agendas..."
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmittingContact}
                  className={`w-full py-3 rounded-xl font-display font-extrabold text-xs cursor-pointer text-center transition-all ${
                    highContrast ? 'bg-white text-black' : 'bg-forest text-white hover:bg-forest-light'
                  }`}
                >
                  {isSubmittingContact ? 'Submitting ticket...' : 'Submit Media Enquiry Ticket'}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 11. FAQ SECTION ACCORDION */}
      <section className={`py-16 border-t ${
        highContrast ? 'bg-black border-slate-800' : 'bg-slate-50 border-slate-100'
      }`} id="faq-accordions">
        <div className="max-w-4xl mx-auto px-4 text-left space-y-8">
          <div className="text-center">
            <span className="text-xs font-mono font-black text-forest uppercase tracking-widest font-bold">VALIDATED FAQS</span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = faqOpenIndex === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    highContrast ? 'border-2 border-white bg-black' : 'bg-white border-slate-100 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 flex justify-between items-center text-left font-display font-bold text-xs md:text-sm text-slate-800 dark:text-white cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={16} className={`text-forest transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-xs text-slate-500 font-sans leading-relaxed border-t border-slate-50 dark:border-slate-900">
                          {item.a}
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

      {/* 12. SOCIAL MEDIA SECTION */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto" id="press-social">
        <div className="text-center space-y-1.5 mb-10">
          <span className="text-xs font-mono font-black text-forest uppercase tracking-widest">LIVE DIGITAL FEEDS</span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">
            Follow Our Stories
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <a href="#" className="p-6 rounded-3xl border flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow">
            <Facebook size={32} className="text-blue-600" />
            <span className="font-mono text-xs font-bold text-slate-700">Facebook Feed</span>
          </a>
          <a href="#" className="p-6 rounded-3xl border flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow">
            <Twitter size={32} className="text-sky-500" />
            <span className="font-mono text-xs font-bold text-slate-700">Twitter Feed</span>
          </a>
          <a href="#" className="p-6 rounded-3xl border flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow">
            <Linkedin size={32} className="text-blue-700" />
            <span className="font-mono text-xs font-bold text-slate-700">LinkedIn Updates</span>
          </a>
          <a href="#" className="p-6 rounded-3xl border flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow">
            <Youtube size={32} className="text-red-600" />
            <span className="font-mono text-xs font-bold text-slate-700">YouTube Channel</span>
          </a>
        </div>
      </section>

      {/* 13. CTA BANNER SECTION */}
      <section className="relative w-full py-16 px-4 md:px-8 bg-slate-900 text-white text-center overflow-hidden" id="press-cta-banner">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
            alt="Community and media professionals documenting impact"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white">
            Amplifying Stories That Matter
          </h2>
          <p className="text-slate-300 font-sans text-xs md:text-sm leading-relaxed max-w-xl mx-auto">
            Together, we can inspire change through stories of hope, digital transformation, and sustainable agrarian systems.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            <a 
              href="#media-enquiry-form"
              className={`px-5 py-2.5 rounded-xl font-display font-extrabold text-xs cursor-pointer ${
                highContrast ? 'bg-white text-black' : 'bg-gold hover:bg-gold-light text-slate-950 shadow-md'
              }`}
            >
              Contact Media Team
            </a>
            <a 
              href="#media-kit-downloads"
              className="px-5 py-2.5 rounded-xl font-display font-semibold text-xs border border-white/20 hover:bg-white/10"
            >
              Download Media Kit
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
