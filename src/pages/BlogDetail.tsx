import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  ThumbsUp, 
  MessageSquare, 
  Download, 
  Play, 
  Pause, 
  ChevronRight, 
  Copy, 
  Check, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  Globe, 
  Send, 
  Eye, 
  BookOpen, 
  Heart, 
  Tv, 
  Settings, 
  Compass, 
  Award, 
  Info,
  Facebook,
  Linkedin,
  Twitter,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, Line, 
  BarChart, Bar, 
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { RICH_ARTICLES, ExtendedArticle } from '../data/blogArticles';

interface BlogDetailProps {
  slug: string;
  setActivePage: (page: string) => void;
  highContrast: boolean;
}

export default function BlogDetail({ slug, setActivePage, highContrast }: BlogDetailProps) {
  // Retrieve dynamic blogs list
  const [blogsList, setBlogsList] = useState<any[]>(() => {
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
        if (Array.isArray(data)) {
          setBlogsList(data);
          try {
            localStorage.setItem('raita_mitra_blogs_list', JSON.stringify(data));
          } catch (err) {
            console.warn('LocalStorage quota limit exceeded when saving blogs list:', err);
          }
        }
      })
      .catch(err => console.warn('Failed to load blogs from server:', err));
  }, []);

  // Fallbacks for newly created articles that lack full nested properties
  const DEFAULT_ARTICLE_FALLBACKS = useMemo(() => ({
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=800',
    title: 'Untitled Article',
    topic: 'Agriculture',
    summary: 'No summary provided.',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    author: 'Raita Mitra Editor',
    authorRole: 'Contributor',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    viewsCount: 15,
    tags: ['Community', 'Agriculture'],
    content: 'Details are being compiled for this article.',
    keyTakeaways: [
      'Empowering regional smallholder communities directly through programmatic action.',
      'Transitioning to organic practices with long-term ecological baselines.'
    ],
    infographics: {
      title: 'Soils Organic Baseline Estimates',
      chartType: 'line',
      description: 'Progress metric tracking soil carbon indicators in selected clusters.',
      data: [
        { year: '2023', carbon: 0.5, moisture: 15, yield: 500 },
        { year: '2026', carbon: 1.2, moisture: 25, yield: 700 }
      ]
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600', caption: 'Field intervention tracking.' }
    ],
    citation: {
      apa: 'Raita Mitra Social Trust. (2026). Technical agronomy and social report. Retrieved from https://raitamitra.org',
      mla: 'Raita Mitra Social Trust. "Technical agronomy and social report," 2026.',
      chicago: 'Raita Mitra Social Trust. "Technical agronomy and social report," 2026.'
    },
    references: [
      'Raita Mitra Social Trust. (2025). Programmatic field logs & utilization reports.',
      'Karnataka Department of Agriculture. (2024). Agricultural census data & soil maps.'
    ],
    authorBio: 'Raita Mitra senior contributor coordinating technical field outreach and sustainable rural ecosystems.',
    authorSocials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'info@raitamitra.org'
    }
  }), []);

  // Fetch active article by slug
  const article = useMemo(() => {
    const found = blogsList.find(a => a.slug === slug) || blogsList[0];
    if (!found) return DEFAULT_ARTICLE_FALLBACKS;

    return {
      ...DEFAULT_ARTICLE_FALLBACKS,
      ...found,
      citation: {
        ...DEFAULT_ARTICLE_FALLBACKS.citation,
        ...(found.citation || {})
      },
      infographics: {
        ...DEFAULT_ARTICLE_FALLBACKS.infographics,
        ...(found.infographics || {})
      },
      authorSocials: {
        ...DEFAULT_ARTICLE_FALLBACKS.authorSocials,
        ...(found.authorSocials || {})
      }
    };
  }, [slug, blogsList, DEFAULT_ARTICLE_FALLBACKS]);

  // Global resets
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [slug]);

  // States
  const [activeTab, setActiveTab] = useState<'APA' | 'MLA' | 'Chicago'>('APA');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Audio Narrator states
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioLang, setAudioLang] = useState<'en' | 'kn' | 'hi'>('en');
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Lightbox and video states
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [videoVolume, setVideoVolume] = useState<number>(80);

  // Download states
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  // Comments state
  const [comments, setComments] = useState<Array<{
    id: number;
    name: string;
    avatar: string;
    date: string;
    text: string;
    likes: number;
    hasLiked: boolean;
    replies: Array<{
      id: number;
      name: string;
      avatar: string;
      date: string;
      text: string;
    }>;
    showReplyInput: boolean;
    replyText: string;
  }>>([
    {
      id: 1,
      name: 'Prof. Ramachandra Gowda',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      date: 'June 29, 2026',
      text: 'This is a phenomenal model. Aggregating 1,000 dryland farmers is a major operational hurdle, but standardizing baseline checks electronically is the breakthrough that secures real global buyer trust. Exceptional work by the Raita Mitra team!',
      likes: 24,
      hasLiked: false,
      replies: [
        {
          id: 11,
          name: 'Anita Patel',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
          date: 'June 30, 2026',
          text: 'Thank you Professor! Our cellular telemetry arrays have reduced manual soils testing lead times from 14 days down to 2 hours.'
        }
      ],
      showReplyInput: false,
      replyText: ''
    },
    {
      id: 2,
      name: 'Sudheendra Kulkarni',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150',
      date: 'June 29, 2026',
      text: 'How are you managing the statutory tax declarations for carbon payouts? Since standard agricultural incomes are untaxed, do these voluntary credits qualify as agro-business incomes under Karnataka laws?',
      likes: 12,
      hasLiked: false,
      replies: [],
      showReplyInput: false,
      replyText: ''
    }
  ]);
  const [newCommentName, setNewCommentName] = useState<string>('');
  const [newCommentText, setNewCommentText] = useState<string>('');

  // SEO Dashboard collapsible
  const [isSeoConsoleOpen, setIsSeoConsoleOpen] = useState<boolean>(false);

  // Future Scalability Toggles
  const [aiSummaryEnabled, setAiSummaryEnabled] = useState<boolean>(false);
  const [multilingualMode, setMultilingualMode] = useState<boolean>(false);
  const [ragQuery, setRagQuery] = useState<string>('');
  const [ragAnswer, setRagAnswer] = useState<string>('');
  const [isRagLoading, setIsRagLoading] = useState<boolean>(false);

  // Share Notification
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);

  // Audio simulation timer
  useEffect(() => {
    if (isPlaying) {
      audioIntervalRef.current = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
            return 0;
          }
          return prev + (1.2 * audioSpeed);
        });
      }, 1000);
    } else {
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
    }
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [isPlaying, audioSpeed]);

  // Copy Citation Helper
  const handleCopyCitation = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(format);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Copy Link Helper
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2500);
  };

  // Simulated Document Download
  const handleStartDownload = (docName: string) => {
    if (downloadingDoc) return;
    setDownloadingDoc(docName);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadingDoc(null);
            alert(`Resource Download Complete!\nFile: "${docName}" has been successfully verified, signed, and saved to your device.`);
          }, 300);
          return 100;
        }
        return prev + 20;
      });
    }, 120);
  };

  // Simulated RAG Search Engine Query
  const handleRagSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ragQuery.trim()) return;
    setIsRagLoading(true);
    setRagAnswer('');

    setTimeout(() => {
      const q = ragQuery.toLowerCase();
      let ans = '';

      if (q.includes('how much') || q.includes('payout') || q.includes('income') || q.includes('cash')) {
        if (article.id === 'art_1') {
          ans = 'According to page 3 of our verified natural farming audit, farmers receive cash payments up to ₹8,000 per acre directly inside their cooperative accounts, bypassing traditional market middlemen completely.';
        } else if (article.id === 'art_2') {
          ans = 'Our Savanur Milk Cooperatives ledger demonstrates that women dairy group members earn a stable monthly income of ₹12,000, paid out based on automated FAT testing parameters.';
        } else {
          ans = 'The value-addition milling models demonstrate that processing raw millets locally raises cooperative youth revenues by up to 3.25x (an increase from ₹20/kg up to ₹65/pack).';
        }
      } else if (q.includes('carbon') || q.includes('soil') || q.includes('organic')) {
        ans = 'Raita Mitra utilizes Sentinel-2 satellite NDVIs paired with manual core sample spectrometry. Our active organic carbon targets strive to restore soils back to a healthy 1.38% organic carbon content ratio.';
      } else if (q.includes('middlemen') || q.includes('middleman') || q.includes('bypass')) {
        ans = 'By establishing localized chilling units and direct electronic weighing scales, Raita Mitra removes regional exploitative milk and crop brokers, returning 100% of fair value directly to farming households.';
      } else if (q.includes('school') || q.includes('python') || q.includes('girl')) {
        ans = 'The Smart IT Labs camp has deployed off-grid solar computer terminals inside 12 Dharwad public high schools, introducing Scratch visual programming and fundamental Python variables to 120 school girls.';
      } else {
        ans = `Based on a semantic vector lookup of "${article.title}", the RMST RAG engine has extracted that this initiative integrates on-field technical telemetry with local community ownership to ensure audited, transparent social progress.`;
      }

      setRagAnswer(ans);
      setIsRagLoading(false);
    }, 900);
  };

  // Add Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;
    
    const comment = {
      id: Date.now(),
      name: newCommentName,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      date: 'Today',
      text: newCommentText,
      likes: 0,
      hasLiked: false,
      replies: [],
      showReplyInput: false,
      replyText: ''
    };

    setComments([comment, ...comments]);
    setNewCommentName('');
    setNewCommentText('');
  };

  // Reply Comment
  const handleAddReply = (commentId: number) => {
    setComments(comments.map(c => {
      if (c.id === commentId && c.replyText.trim()) {
        const rep = {
          id: Date.now(),
          name: 'Consultant Visitor',
          avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
          date: 'Just now',
          text: c.replyText
        };
        return {
          ...c,
          replies: [...c.replies, rep],
          replyText: '',
          showReplyInput: false
        };
      }
      return c;
    }));
  };

  // Like Comment Toggle
  const handleLikeComment = (commentId: number) => {
    setComments(comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          likes: c.hasLiked ? c.likes - 1 : c.likes + 1,
          hasLiked: !c.hasLiked
        };
      }
      return c;
    }));
  };

  // Semantic Recommended Programs
  const relatedPrograms = useMemo(() => {
    if (article.topic === 'Agriculture' || article.topic === 'Climate Action') {
      return [
        { id: 'agriculture', title: 'Sustainable Agriculture Interventions', desc: 'Deploying custom Jeevamrutha microbial soil formulations and organic certification mapping.' },
        { id: 'climate', title: 'Afforestation & Micro-Watershed Rejuvenation', desc: 'Constructing community soil bunding and windbreak trees to replenish depleting aquifers.' }
      ];
    } else if (article.topic === 'Women Empowerment' || article.topic === 'Entrepreneurship') {
      return [
        { id: 'women', title: 'Women Cooperative Dairy Cold-Chains', desc: 'Setting up automated testing and solar chilling bulk tanks owned wholly by rural women SHGs.' },
        { id: 'entrepreneurship', title: 'Rural Youth Entrepreneurship Hubs', desc: 'Sponsoring localized value-add processing mills to retain healthy crop profits within rural clusters.' }
      ];
    } else {
      return [
        { id: 'education', title: 'Solar-Powered Smart IT & AI Literacy Labs', desc: 'Establishing grid-independent coding hubs in state high schools, mentoring girls in Python.' },
        { id: 'health', title: 'Mobile Micro-Nutrient Pediatrics Clinics', desc: 'Conducting village screening tours and formulating regional millet dietary recovery packs.' }
      ];
    }
  }, [article]);

  // Semantic Recommended Articles (Vector search mock)
  const relatedArticles = useMemo(() => {
    return RICH_ARTICLES
      .filter(art => art.id !== article.id)
      .slice(0, 3);
  }, [article]);

  return (
    <div className={`min-h-screen pb-24 ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`} id="blog-detail-root">
      
      {/* 1. BREADCRUMBS & COMPASS ROW */}
      <div className={`max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center text-xs font-mono border-b ${
        highContrast ? 'border-zinc-800 text-zinc-300' : 'border-slate-200/60 text-slate-500'
      }`}>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setActivePage('home')} className="hover:text-emerald-700 cursor-pointer">HOME</button>
          <ChevronRight size={12} />
          <button onClick={() => setActivePage('blog')} className="hover:text-emerald-700 cursor-pointer">NEWS & KNOWLEDGE BLOG</button>
          <ChevronRight size={12} />
          <span className="text-slate-400 truncate max-w-[200px] md:max-w-sm uppercase">{article.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Compass size={14} className="text-gold animate-spin-slow" />
          <span className="text-[10px] text-slate-400 uppercase">EDITORIAL DIRECTORY INDEX</span>
        </div>
      </div>

      {/* 2. DYNAMIC SEO & SCHEMA PREVIEW CONSOLE (Collapsible) */}
      <div className="max-w-7xl mx-auto px-4 mt-4">
        <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
          highContrast ? 'bg-zinc-950 border-white/40' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <button 
            onClick={() => setIsSeoConsoleOpen(!isSeoConsoleOpen)}
            className="w-full py-3 px-5 flex justify-between items-center text-xs font-mono font-bold text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-900 cursor-pointer text-left"
          >
            <div className="flex items-center gap-2">
              <Settings size={14} className="text-emerald-700" />
              <span>[CONSOLE] CMS SECURE METADATA & SCHEMA (JSON-LD) ENGINE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400">AUDIT PREVIEW</span>
              {isSeoConsoleOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
          </button>

          <AnimatePresence>
            {isSeoConsoleOpen && (
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden border-t border-slate-100 dark:border-zinc-800"
              >
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-mono">
                  <div className="space-y-4 text-left">
                    <h4 className="font-bold text-emerald-700 dark:text-emerald-400 text-xs uppercase">Meta Parameters & SEO Index</h4>
                    <div className="space-y-2 bg-slate-50 dark:bg-zinc-950 p-4 rounded-xl border border-slate-200/50">
                      <div><span className="text-slate-400">Meta Title:</span> <span className="text-slate-700 dark:text-zinc-200">{article.title} | Raita Mitra Social Trust</span></div>
                      <div><span className="text-slate-400">Meta Description:</span> <span className="text-slate-700 dark:text-zinc-300">{article.summary}</span></div>
                      <div><span className="text-slate-400">OpenGraph Image:</span> <span className="text-emerald-600 truncate block">{article.image}</span></div>
                      <div><span className="text-slate-400">Keywords:</span> <span className="text-slate-600 dark:text-zinc-400">{article.tags.join(', ')}</span></div>
                      <div><span className="text-slate-400">Indexed Crawl State:</span> <span className="text-emerald-700 font-bold">● ACTIVE INDEXED (200 OK)</span></div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex gap-2 text-[11px] text-amber-700 leading-normal">
                      <AlertCircle size={14} className="shrink-0 mt-0.5" />
                      <span>This diagnostic console verifies that the Raita Mitra CMS pipeline correctly injects JSON-LD Structured Data to prevent semantic spoofing and secure high organic visibility indices.</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-left">
                    <h4 className="font-bold text-emerald-700 dark:text-emerald-400 text-xs uppercase">Auto-Generated JSON-LD Structured Schema</h4>
                    <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl text-[10px] overflow-x-auto max-h-60 border border-zinc-800 scrollbar-thin">
{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://raitamitra.org/blog/${article.slug}",
      "headline": "${article.title}",
      "description": "${article.summary}",
      "image": "${article.image}",
      "datePublished": "${article.date}",
      "dateModified": "${article.updatedDate}",
      "author": {
        "@type": "Person",
        "name": "${article.author}",
        "jobTitle": "${article.authorRole}"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Raita Mitra Social Trust (R)",
        "logo": "https://raitamitra.org/logo.png"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home"},
        {"@type": "ListItem", "position": 2, "name": "News & Blog"},
        {"@type": "ListItem", "position": 3, "name": "${article.title}"}
      ]
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. HERO SECTION (EDITORIAL BANNER) */}
      <section className="relative mt-6 overflow-hidden max-w-7xl mx-auto px-4">
        <div className="relative min-h-[500px] md:min-h-[600px] rounded-3xl overflow-hidden flex flex-col justify-end p-6 md:p-16 text-left">
          {/* Cover image with parralax effect simulation */}
          <div className="absolute inset-0 z-0 bg-slate-950">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover opacity-35"
              referrerPolicy="no-referrer"
            />
            {/* Ambient Dark editorial gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/10"></div>
          </div>

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-emerald-900/95 border border-emerald-700 text-white font-mono text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-md">
                {article.topic}
              </span>
              <span className="bg-gold/25 border border-gold/35 text-gold font-mono text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                ★ RMST ORIGINAL
              </span>
            </div>

            <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-slate-200 text-sm md:text-lg max-w-3xl leading-relaxed font-sans font-medium">
              {article.summary}
            </p>

            {/* Author Profile block */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center gap-4">
                <img 
                  src={article.authorImage} 
                  alt={article.author} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                    {article.author}
                    <Award size={13} className="text-gold" />
                  </h4>
                  <p className="text-[10px] text-slate-300 font-mono">{article.authorRole}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-[11px] text-slate-300 font-mono">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-emerald-500" />
                  PUBLISHED: {article.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-emerald-500" />
                  READ TIME: {article.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye size={13} className="text-emerald-500" />
                  VIEWS: {article.viewsCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FLOATING SOCIAL SHARE BAR & STICKY METADATA BAR */}
      <div className={`sticky top-[72px] z-40 py-3.5 border-b backdrop-blur-md transition-colors duration-300 ${
        highContrast ? 'bg-black border-zinc-800 text-white' : 'bg-white/95 border-slate-200 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">TAG CLUSTERS:</span>
            {article.tags.map((tag) => (
              <span 
                key={tag}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  highContrast 
                    ? 'bg-zinc-800 text-white border border-zinc-700' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2.5 sm:pt-0">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">SHARE DISPATCH:</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCopyLink}
                className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-600 dark:text-zinc-200 cursor-pointer"
                title="Copy Article Link"
              >
                {shareSuccess ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              </button>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-1.5 rounded bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5]/20">
                <Linkedin size={13} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-1.5 rounded bg-sky-100 text-sky-600 hover:bg-sky-200">
                <Twitter size={13} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-1.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100">
                <Facebook size={13} />
              </a>
              <button onClick={() => alert('Opening secure WhatsApp share portal')} className="p-1.5 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100">
                <Share2 size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN EDITORIAL BLOCK */}
      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: STICKY TOC SIDEBAR (3 Columns) */}
        <aside className="lg:col-span-3 hidden lg:block text-left">
          <div className="sticky top-[150px] space-y-8">
            
            {/* Table of Contents */}
            <div className={`p-6 rounded-2xl border ${highContrast ? 'border-zinc-800 bg-zinc-950' : 'bg-white border-slate-200/60 shadow-sm'}`}>
              <h3 className="text-xs font-mono font-bold uppercase text-gold tracking-widest mb-4">CONTENTS</h3>
              <ul className="space-y-3.5 text-xs font-mono">
                <li>
                  <a href="#section-summary" className="hover:text-emerald-700 text-slate-500 dark:text-zinc-400 block transition-colors border-l-2 border-slate-100 dark:border-zinc-800 pl-3">
                    01 • Executive Summary
                  </a>
                </li>
                <li>
                  <a href="#section-takeaways" className="hover:text-emerald-700 text-slate-500 dark:text-zinc-400 block transition-colors border-l-2 border-slate-100 dark:border-zinc-800 pl-3">
                    02 • Strategic Takeaways
                  </a>
                </li>
                <li>
                  <a href="#section-narrative" className="hover:text-emerald-700 text-slate-500 dark:text-zinc-400 block transition-colors border-l-2 border-slate-100 dark:border-zinc-800 pl-3">
                    03 • Core Case Study
                  </a>
                </li>
                <li>
                  <a href="#section-insights" className="hover:text-emerald-700 text-slate-500 dark:text-zinc-400 block transition-colors border-l-2 border-slate-100 dark:border-zinc-800 pl-3">
                    04 • Data & Infographics
                  </a>
                </li>
                <li>
                  <a href="#section-gallery" className="hover:text-emerald-700 text-slate-500 dark:text-zinc-400 block transition-colors border-l-2 border-slate-100 dark:border-zinc-800 pl-3">
                    05 • Field Photo Highlights
                  </a>
                </li>
                <li>
                  <a href="#section-multimedia" className="hover:text-emerald-700 text-slate-500 dark:text-zinc-400 block transition-colors border-l-2 border-slate-100 dark:border-zinc-800 pl-3">
                    06 • Immersive Media
                  </a>
                </li>
                <li>
                  <a href="#section-references" className="hover:text-emerald-700 text-slate-500 dark:text-zinc-400 block transition-colors border-l-2 border-slate-100 dark:border-zinc-800 pl-3">
                    07 • Citations & Footnotes
                  </a>
                </li>
                <li>
                  <a href="#section-discussion" className="hover:text-emerald-700 text-slate-500 dark:text-zinc-400 block transition-colors border-l-2 border-slate-100 dark:border-zinc-800 pl-3">
                    08 • Public Discussion
                  </a>
                </li>
              </ul>
            </div>

            {/* AI Narrator Widget */}
            <div className={`p-6 rounded-2xl border text-left space-y-4 ${
              highContrast ? 'border-zinc-800 bg-zinc-950' : 'bg-emerald-950 text-white border-emerald-900 shadow-md'
            }`}>
              <div className="flex items-center gap-1.5 text-gold">
                <Sparkles size={14} className="animate-pulse" />
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest">AUDIO NARRATION SYSTEM</h4>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                Listen to a human-vibe simulated speech synthesis of this report compiled across regional dialects.
              </p>

              {/* Progress meter */}
              <div className="space-y-1">
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="bg-gold h-full" style={{ width: `${audioProgress}%` }}></div>
                </div>
                <div className="flex justify-between text-[9px] font-mono text-slate-400">
                  <span>{isPlaying ? 'STREAMING...' : 'IDLE'}</span>
                  <span>{Math.floor(audioProgress)}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3.5 py-1.5 rounded-lg bg-gold hover:bg-gold-light text-slate-950 text-xs font-bold font-display flex items-center gap-1 cursor-pointer"
                >
                  {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                  <span>{isPlaying ? 'PAUSE' : 'LISTEN'}</span>
                </button>

                <div className="flex gap-1.5">
                  <select 
                    value={audioLang}
                    onChange={(e) => {
                      setAudioLang(e.target.value as any);
                      setAudioProgress(0);
                    }}
                    className="bg-slate-900 border border-zinc-800 text-[10px] p-1 rounded font-mono text-slate-300 focus:outline-none"
                  >
                    <option value="en">English (US)</option>
                    <option value="kn">ಕನ್ನಡ (KN)</option>
                    <option value="hi">हिंदी (HI)</option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </aside>

        {/* RIGHT COLUMN: CORE CONTENT AND INTERACTIONS (9 Columns) */}
        <main className="lg:col-span-9 space-y-16 text-left">
          
          {/* 5. FUTURE SCALABILITY BAR (Toggles for Multilingual & AI Summary) */}
          <div className={`p-6 rounded-3xl border flex flex-col md:flex-row justify-between gap-6 items-stretch md:items-center ${
            highContrast ? 'bg-zinc-950 border-white' : 'bg-white border-slate-200/60 shadow-sm'
          }`} id="scalability-switches">
            <div className="space-y-1 max-w-md">
              <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider block">NEXT-GEN ROADMAP DEMOS</span>
              <h3 className="text-sm font-bold font-display text-slate-800 dark:text-white">Cognitive Content Pipeline Switches</h3>
              <p className="text-[11px] text-slate-500 leading-normal font-sans">
                Simulate advanced features such as AI summarization overlays, instant translation rendering, and vector semantic lookups.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => setAiSummaryEnabled(!aiSummaryEnabled)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer border transition-all ${
                  aiSummaryEnabled 
                    ? 'bg-emerald-900 text-white border-emerald-950' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                }`}
              >
                🤖 {aiSummaryEnabled ? 'Disable AI Summary' : 'Enable AI Summary'}
              </button>

              <button 
                onClick={() => setMultilingualMode(!multilingualMode)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer border transition-all ${
                  multilingualMode 
                    ? 'bg-gold/90 text-slate-950 border-gold' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                }`}
              >
                🌐 {multilingualMode ? 'Show English Original' : 'Draft Translation'}
              </button>
            </div>
          </div>

          {/* 6. AI SUMMARY OVERLAY SECTION */}
          <AnimatePresence>
            {aiSummaryEnabled && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 to-teal-950 border border-emerald-900 text-white space-y-4 shadow-md text-left"
              >
                <div className="flex items-center gap-2 text-gold">
                  <Sparkles size={16} className="animate-bounce" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider">AI COGNITIVE SUMMARY OVERLAY</h4>
                </div>
                <div className="text-xs space-y-3 text-slate-200 leading-relaxed font-sans">
                  <p>
                    <strong>Executive Assessment:</strong> This dossier evaluates Raita Mitra Social Trust&apos;s geolocated intervention template focusing on <strong>{article.topic}</strong>. By aggregating on-field data channels and establishing community cooperative hubs, the program eliminates intermediary leakage and guarantees direct socioeconomic value injection.
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2">
                    <li><strong>Statutory Benchmark:</strong> Backed by audited MCA CSR-1 certifications.</li>
                    <li><strong>Intervention Focus:</strong> Restoring natural baselines and providing structural training to local households.</li>
                    <li><strong>Target Beneficiaries:</strong> Smallholder families in northern dryland districts.</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 7. ARTICLE CONTENT SECTION (MEDIUM-STYLE LAYOUT) */}
          <article className="space-y-8" id="section-summary">
            {multilingualMode ? (
              // Multilingual View (Simulated Kannada Draft)
              <div className="space-y-6 text-left">
                <span className="text-[10px] font-mono bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded uppercase font-bold">
                  KANNADA COMPUTERIZED TRANSCRIPTS DRAFT
                </span>
                <p className="text-base md:text-lg font-serif leading-relaxed text-slate-800 dark:text-zinc-200 indent-8">
                  ನೈಸರ್ಗಿಕ ಕೃಷಿ ವಿಧಾನಗಳು ಮತ್ತು ಜೈವಿಕ ಒಳಹರಿವುಗಳು ಮಣ್ಣನ್ನು ಪುನಶ್ಚೇತನಗೊಳಿಸುವುದಲ್ಲದೆ, ಭೂಮಿಯೊಳಗೆ ಇಂಗಾಲವನ್ನು ಸಕ್ರಿಯವಾಗಿ ಸೆರೆಹಿಡಿಯುತ್ತವೆ ಮತ್ತು ಸಂಗ್ರಹಿಸುತ್ತವೆ. ರೈತ ಮಿತ್ರ ಸೋಷಿಯಲ್ ಟ್ರಸ್ಟ್ ಧಾರವಾಡ ತಾಲೂಕಿನಲ್ಲಿ ಗ್ರಾಮೀಣ ಇಂಗಾಲದ ಸಾಲ ಸಂಗ್ರಹಣೆಯ ಚೌಕಟ್ಟನ್ನು ಪೈಲಟ್ ಮಾಡುತ್ತಿದೆ. 1,000 ಸಣ್ಣ ಹಿಡುವಳಿದಾರ ರೈತರನ್ನು ಒಂದೇ ಸ್ವಯಂಪ್ರೇರಿತ ಇಂಗಾಲದ ಪೂಲ್ ಅಡಿಯಲ್ಲಿ ವರ್ಗೀಕರಿಸುವ ಮೂಲಕ, ನಾವು ಆನ್-ಫೀಲ್ಡ್ ಮಣ್ಣಿನ ತಪಾಸಣೆ ಮತ್ತು ಜಿಪಿಎಸ್ ಆಧಾರಿತ ಆಡಿಟಿಂಗ್ ವ್ಯವಸ್ಥೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನಿರ್ವಹಿಸುತ್ತಿದ್ದೇವೆ.
                </p>
                <p className="text-base md:text-lg font-serif leading-relaxed text-slate-800 dark:text-zinc-200">
                  middlemen ಹಾವಳಿಯನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತಡೆಗಟ್ಟುವ ಮೂಲಕ, ರೈತರು ಮಾರುಕಟ್ಟೆಯ ಇತ್ತೀಚಿನ ಬೆಲೆಗಳನ್ನು ಮೊಬೈಲ್ ಮೂಲಕ ನೇರವಾಗಿ ಪಡೆದುಕೊಳ್ಳುತ್ತಿದ್ದಾರೆ. ಈ ಜೀವಕೋಶದ ಮಾದರಿಯನ್ನು ಕರ್ನಾಟಕ ಸರ್ಕಾರವು ರಾಜ್ಯ ಮಟ್ಟದ ಮಾದರಿಯಾಗಿ ಪರಿಗಣಿಸಿದೆ.
                </p>
              </div>
            ) : (
              // English Original with drop caps and beautiful block elements
              <div className="space-y-8 font-serif text-slate-800 dark:text-zinc-200 text-sm md:text-lg leading-relaxed text-left">
                
                {/* Paragraph 1: Drop Cap */}
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-emerald-800 first-letter:dark:text-emerald-400 first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:leading-none">
                  {article.content.split('\n\n')[0]}
                </p>

                {/* Paragraph 2 */}
                <p className="pt-2">
                  {article.content.split('\n\n')[1] || 'Our programs emphasize local community responsibility as the core engine of rural rehabilitation. By establishing independent on-field monitoring committees, we transfer audit responsibility directly to beneficiary farmer networks, building deep regional capacity.'}
                </p>

                {/* Highlighted Callout Box */}
                <div className={`p-6 rounded-2xl border-l-4 border-emerald-700 italic font-sans text-slate-700 dark:text-zinc-300 text-xs md:text-sm my-6 ${
                  highContrast ? 'bg-zinc-950 text-white' : 'bg-emerald-50/70 dark:bg-emerald-950/20'
                }`}>
                  &quot;The transition from high-chemical inputs to customized local organic bio-formulations lowers operational agricultural budgets by up to 60%, delivering critical safety buffers during extreme drought seasons.&quot;
                </div>

                {/* Paragraph 3 */}
                <p>
                  {article.content.split('\n\n')[2] || 'Quarterly inspections evaluate progress indicators, which are logged directly onto our public ledger servers to verify complete statutory accountability and prevent corporate greenwashing.'}
                </p>

                {/* Standard Academic Data Table inside Rich Text */}
                <div className="py-6 font-sans">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 text-left">
                    Table 1: Key Performance Metrics & Soil Carbon Density
                  </h4>
                  <div className="overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 font-mono text-slate-600 dark:text-zinc-300">
                          <th className="p-3">Intervention District</th>
                          <th className="p-3">Audit Area (Acres)</th>
                          <th className="p-3">Baseline SOC (%)</th>
                          <th className="p-3">Target SOC (%)</th>
                          <th className="p-3">Direct Payouts (INR)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                        <tr className="hover:bg-slate-50 dark:hover:bg-zinc-900/35">
                          <td className="p-3 font-bold text-slate-700 dark:text-white">Dharwad taluk</td>
                          <td className="p-3">1,240</td>
                          <td className="p-3 font-mono">0.45%</td>
                          <td className="p-3 font-mono text-emerald-700 font-bold">1.38%</td>
                          <td className="p-3 font-mono text-emerald-700">₹9,92,000</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-zinc-900/35">
                          <td className="p-3 font-bold text-slate-700 dark:text-white">Haveri district</td>
                          <td className="p-3">1,850</td>
                          <td className="p-3 font-mono">0.38%</td>
                          <td className="p-3 font-mono text-emerald-700 font-bold">1.12%</td>
                          <td className="p-3 font-mono text-emerald-700">₹14,80,000</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-zinc-900/35">
                          <td className="p-3 font-bold text-slate-700 dark:text-white">Belagavi cluster</td>
                          <td className="p-3">1,100</td>
                          <td className="p-3 font-mono">0.51%</td>
                          <td className="p-3 font-mono text-emerald-700 font-bold">1.45%</td>
                          <td className="p-3 font-mono text-emerald-700">₹8,80,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Technical Automation Code Block inside Article */}
                <div className="py-4 font-sans text-left">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1.5">Figure 1.1: Automated Water Resource Irrigation Allocation Code (Python)</span>
                  <div className="bg-slate-900 rounded-xl border border-zinc-800 p-4 font-mono text-[11px] text-emerald-400 overflow-x-auto">
{`# Automated micro-drip pump allocation algorithm based on soil tension indices
def calculate_water_allocation(soil_moisture_percentage, crop_coefficient_kc):
    threshold_moisture = 35.0  # Critical soil moisture percentage
    optimal_allocation_liters = 450.0  # Peak volume index
    
    if soil_moisture_percentage < threshold_moisture:
        deficit_ratio = (threshold_moisture - soil_moisture_percentage) / threshold_moisture
        return round(optimal_allocation_liters * deficit_ratio * crop_coefficient_kc, 2)
    return 0.0  # Aquifer water resource conservation state`}
                  </div>
                </div>

              </div>
            )}
          </article>

          {/* 8. KEY TAKEAWAYS SECTION (GLASS CARDS) */}
          <section className="scroll-mt-24" id="section-takeaways">
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">EXECUTIVE INSIGHTS</span>
              <h2 className={`text-xl md:text-2xl font-display font-black tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
                {article.title} • Critical Takeaways
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {article.keyTakeaways.map((takeaway, idx) => (
                <div 
                  key={idx}
                  className={`p-6 rounded-3xl border text-left flex gap-4 ${
                    highContrast 
                      ? 'bg-black border-2 border-white text-white' 
                      : 'bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border-slate-200/50 shadow-sm'
                  }`}
                >
                  <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center shrink-0 text-emerald-800 dark:text-emerald-400 text-xs font-mono font-bold">
                    0{idx + 1}
                  </span>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-sans">
                    {takeaway}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 9. INFOGRAPHICS & INTERACTIVE RECHARTS BLOCK */}
          <section className="scroll-mt-24 space-y-6" id="section-insights">
            <div className="text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">DATA VISUALIZATION HUB</span>
              <h2 className={`text-xl md:text-2xl font-display font-black tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
                {article.infographics.title}
              </h2>
              <p className={`text-xs mt-1.5 ${highContrast ? 'text-zinc-300' : 'text-slate-500'}`}>
                {article.infographics.description}
              </p>
            </div>

            <div className={`p-6 rounded-3xl border ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-slate-950 border-zinc-800'
            }`}>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {article.infographics.chartType === 'line' ? (
                    <LineChart data={article.infographics.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                      <XAxis dataKey="year" stroke="#71717a" fontSize={10} fontFamily="monospace" />
                      <YAxis stroke="#71717a" fontSize={10} fontFamily="monospace" />
                      <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }} />
                      <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
                      <Line type="monotone" dataKey="carbon" stroke="#10b981" strokeWidth={3} name="Carbon Density (%)" />
                      <Line type="monotone" dataKey="moisture" stroke="#f59e0b" strokeWidth={2} name="Moisture Retained (%)" />
                      <Line type="monotone" dataKey="yield" stroke="#06b6d4" strokeWidth={2} name="Crop Yield index" />
                    </LineChart>
                  ) : article.infographics.chartType === 'bar' ? (
                    <BarChart data={article.infographics.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                      <XAxis dataKey="month" stroke="#71717a" fontSize={10} fontFamily="monospace" />
                      <YAxis stroke="#71717a" fontSize={10} fontFamily="monospace" />
                      <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }} />
                      <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
                      <Bar dataKey="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Financial Volume" />
                      <Bar dataKey="members" fill="#10b981" radius={[4, 4, 0, 0]} name="Cooperative Members" />
                    </BarChart>
                  ) : (
                    <PieChart>
                      <Pie
                        data={article.infographics.data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {article.infographics.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : index === 1 ? '#f59e0b' : index === 2 ? '#06b6d4' : '#ec4899'} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }} />
                      <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* 10. PHOTO GALLERY MASONRY (LIGHTBOX SUPPORT) */}
          <section className="scroll-mt-24 space-y-6" id="section-gallery">
            <div className="text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">FIELD CHRONICLES</span>
              <h2 className={`text-xl md:text-2xl font-display font-black tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
                On-Field Photo Highlights
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {article.gallery.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveLightboxImage(img.url)}
                  className={`group overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-101 hover:shadow-md ${
                    highContrast ? 'border-zinc-800' : 'border-slate-200'
                  }`}
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    <img 
                      src={img.url} 
                      alt={img.caption} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono">
                      [VIEW FULLSCREEN ×]
                    </div>
                  </div>
                  <div className="p-4 text-left">
                    <p className={`text-[11px] leading-normal font-sans ${highContrast ? 'text-zinc-300' : 'text-slate-500'}`}>
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 11. EMBEDDED IMMERSIVE VIDEO CARD */}
          <section className="scroll-mt-24 space-y-6" id="section-multimedia">
            <div className="text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">MULTIMEDIA COVERAGE</span>
              <h2 className={`text-xl md:text-2xl font-display font-black tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
                Immersive Video Insights
              </h2>
            </div>

            <div className={`overflow-hidden rounded-3xl border flex flex-col md:flex-row ${
              highContrast ? 'bg-zinc-950 border-white text-white' : 'bg-white border-slate-200/60 shadow-sm'
            }`}>
              <div className="md:w-1/2 aspect-video relative overflow-hidden bg-black">
                {isVideoPlaying ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 p-6 text-center text-white">
                    <Sparkles className="text-gold animate-spin" size={32} />
                    <h4 className="text-xs font-mono font-bold text-gold">ACTIVE SECURE STREAM BUFFERS ONLINE</h4>
                    <p className="text-[11px] text-zinc-300 max-w-xs">
                      Simulated YouTube playback layer verified. Dynamic caption feeds and volume matrices operational.
                    </p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsVideoPlaying(false)}
                        className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] rounded font-mono font-bold"
                      >
                        PAUSE
                      </button>
                      <button 
                        onClick={() => alert('Static captions compiled successfully.')}
                        className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] rounded font-mono font-bold"
                      >
                        CAPTIONS
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <img 
                      src={article.image} 
                      alt="Video thumbnail" 
                      className="w-full h-full object-cover opacity-60"
                      referrerPolicy="no-referrer"
                    />
                    <button 
                      onClick={() => setIsVideoPlaying(true)}
                      className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-gold hover:bg-gold-light text-slate-950 flex items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-xl shadow-gold/25 z-10"
                    >
                      <Play size={20} fill="currentColor" className="ml-1" />
                    </button>
                  </>
                )}
              </div>

              <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between text-left space-y-4">
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider">
                    DOCUMENTARY CLIPS
                  </span>
                  <h3 className="text-base font-bold font-display text-slate-800 dark:text-white leading-tight">
                    On-Field Documentary: Tracing Rural Agrarian Interventions
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-sans">
                    This verified segment follows Raita Mitra agronomists and local cooperative leaders as they map spatial soil moisture grids, deploy mobile testing laboratories, and audit local cash payout ledgers.
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-100 dark:border-zinc-800 pt-3">
                  <span>REF: RMST_VIDEO_DOC_04</span>
                  <span>TIME BUFFER: 06:15 MINS</span>
                </div>
              </div>
            </div>
          </section>

          {/* 12. RAG SEMANTIC KNOWLEDGE PLAYGROUND */}
          <section className="scroll-mt-24 space-y-6" id="section-rag">
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-zinc-800 text-white text-left space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-gold animate-bounce" />
                  <div>
                    <h3 className="text-sm font-bold font-display text-white">RAG SEMANTIC RESEARCH INTERACTION PLAYGROUND</h3>
                    <p className="text-[11px] text-zinc-400 font-mono">Ask questions directly to the RMST Article Database</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded uppercase font-bold">
                  VECTOR pgvector ACTIVE
                </span>
              </div>

              <form onSubmit={handleRagSearch} className="flex gap-2">
                <input 
                  type="text"
                  placeholder="e.g. How much payouts do farmers receive? or How is soil carbon verified?"
                  required
                  value={ragQuery}
                  onChange={(e) => setRagQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold text-white font-mono"
                />
                <button 
                  type="submit"
                  disabled={isRagLoading}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-slate-950 text-xs font-bold font-display cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  {isRagLoading ? 'QUERIED...' : 'QUERY AI'}
                </button>
              </form>

              <AnimatePresence>
                {ragAnswer && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-left"
                  >
                    <span className="text-[9px] font-mono text-gold uppercase block">Verified Document Extraction:</span>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {ragAnswer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* 13. DOWNLOAD RESOURCES DOWNLOAD BLOCK */}
          <section className="scroll-mt-24 space-y-6" id="section-downloads">
            <div className="text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">KNOWLEDGE DISSEMINATION</span>
              <h2 className={`text-xl md:text-2xl font-display font-black tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
                Verified Strategic Resources
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Dossier PDF Publication', size: '2.4 MB', type: 'PDF VERSION' },
                { name: 'Board Audit Presentation', size: '4.8 MB', type: 'PRESENTATION' },
                { name: 'Field Intervention Case Study', size: '1.2 MB', type: 'CASE STUDY' },
                { name: 'SDG Metrics Infographic', size: '3.1 MB', type: 'INFOGRAPHIC' }
              ].map((res, idx) => (
                <div 
                  key={idx}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between space-y-4 ${
                    highContrast ? 'bg-zinc-950 border-white text-white' : 'bg-white border-slate-200/50 shadow-sm'
                  }`}
                >
                  <div className="space-y-1.5">
                    <FileText size={20} className="text-emerald-700 dark:text-emerald-400" />
                    <span className="text-[9px] font-mono font-bold text-slate-400 block">{res.type}</span>
                    <h4 className="text-xs font-bold font-display leading-tight text-slate-800 dark:text-white">
                      {res.name}
                    </h4>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center text-[10px] font-mono">
                    <span className="text-slate-400">{res.size}</span>
                    <button 
                      onClick={() => handleStartDownload(res.name)}
                      className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      <Download size={11} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated progress tracker bar */}
            <AnimatePresence>
              {downloadingDoc && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-4 rounded-xl bg-slate-900 border border-gold/30 text-white text-left text-xs font-mono max-w-md space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span>Downloading Resource Package...</span>
                    <span>{downloadProgress}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gold h-full" style={{ width: `${downloadProgress}%` }}></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* 14. AUTHOR PROFILES & SOCIAL CHANNELS */}
          <section className="scroll-mt-24 space-y-6" id="section-author">
            <div className="text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">RESEARCH CONTRIBUTOR</span>
              <h2 className={`text-xl md:text-2xl font-display font-black tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
                About The Author
              </h2>
            </div>

            <div className={`p-6 md:p-8 rounded-3xl border text-left ${
              highContrast ? 'bg-zinc-950 border-white' : 'bg-white border-slate-200/50 shadow-sm'
            }`}>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img 
                  src={article.authorImage} 
                  alt={article.author} 
                  className="w-16 h-16 rounded-full object-cover border border-slate-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold font-display text-slate-800 dark:text-white">
                      {article.author}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">{article.authorRole}</p>
                  </div>

                  <p className="text-xs md:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-sans">
                    {article.authorBio || 'Raita Mitra senior advisor and researcher coordinating rural agricultural systems audits across northern dryland Karnataka districts.'}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono border-t border-slate-100 dark:border-zinc-800 pt-3">
                    <div className="flex gap-4">
                      {article.authorSocials?.linkedin && (
                        <a href={article.authorSocials.linkedin} target="_blank" rel="noreferrer" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
                          LinkedIn
                        </a>
                      )}
                      {article.authorSocials?.twitter && (
                        <a href={article.authorSocials.twitter} target="_blank" rel="noreferrer" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
                          Twitter
                        </a>
                      )}
                      {article.authorSocials?.email && (
                        <a href={`mailto:${article.authorSocials.email}`} className="text-slate-400 hover:underline">
                          {article.authorSocials.email}
                        </a>
                      )}
                    </div>
                    <span className="text-slate-400 uppercase font-bold text-[9px] bg-slate-50 dark:bg-zinc-900 border px-2 py-0.5 rounded">
                      Vetted Scholar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 15. ACADEMIC CITATION BLOCK */}
          <section className="scroll-mt-24 space-y-6" id="section-references">
            <div className="text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">BIBLIOGRAPHY METRIC</span>
              <h2 className={`text-xl md:text-2xl font-display font-black tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
                References & Academic Citations
              </h2>
            </div>

            <div className={`p-6 rounded-3xl border text-left space-y-6 ${
              highContrast ? 'bg-zinc-950 border-white' : 'bg-white border-slate-200/50 shadow-sm'
            }`}>
              
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider border-b pb-2">Academic Citation Formats</h4>
                
                {/* Citations Tabbed view */}
                <div className="flex gap-2 border-b border-slate-100 dark:border-zinc-800 pb-2">
                  {(['APA', 'MLA', 'Chicago'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 text-xs font-mono rounded-lg border cursor-pointer transition-colors ${
                        activeTab === tab
                          ? 'bg-emerald-900 text-white border-emerald-950'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-zinc-900 dark:border-zinc-800'
                      }`}
                    >
                      {tab} Format
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-150/50 text-xs font-mono leading-relaxed relative text-slate-600 dark:text-zinc-300">
                  <p className="pr-12">
                    {activeTab === 'APA' ? article.citation.apa : activeTab === 'MLA' ? article.citation.mla : article.citation.chicago}
                  </p>
                  <button 
                    onClick={() => handleCopyCitation(activeTab === 'APA' ? article.citation.apa : activeTab === 'MLA' ? article.citation.mla : article.citation.chicago, activeTab)}
                    className="absolute top-4 right-4 p-1.5 rounded bg-white hover:bg-slate-100 border border-slate-200 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:border-zinc-700 cursor-pointer"
                    title="Copy Citation"
                  >
                    {copiedText === activeTab ? <Check size={12} className="text-emerald-700" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>

              {/* References list */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider text-left">References & Sources</h4>
                <ol className="list-decimal list-inside text-xs text-slate-500 dark:text-zinc-400 space-y-2 leading-relaxed">
                  {article.references.map((ref, idx) => (
                    <li key={idx} className="hover:text-slate-800 dark:hover:text-white transition-colors">
                      {ref} <a href="https://scholar.google.com" target="_blank" rel="noreferrer" className="inline-block align-middle ml-1 text-emerald-700" title="Crossref Indexed"><ExternalLink size={10} /></a>
                    </li>
                  ))}
                </ol>
              </div>

            </div>
          </section>

          {/* 16. RELATED NGO PROGRAMS cards */}
          <section className="space-y-6">
            <div className="text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">COOPERATIVE ALIGNMENT</span>
              <h2 className={`text-xl md:text-2xl font-display font-black tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
                Related Programs & Interventions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPrograms.map((prog) => (
                <div 
                  key={prog.id}
                  className={`p-6 rounded-3xl border text-left flex flex-col justify-between space-y-4 ${
                    highContrast ? 'bg-zinc-950 border-white text-white' : 'bg-white border-slate-200/50 shadow-sm'
                  }`}
                >
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase font-bold inline-block">
                      ACTIVE STRATEGIC PILLAR
                    </span>
                    <h3 className="text-sm font-bold font-display text-slate-800 dark:text-white leading-tight">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 leading-normal font-sans">
                      {prog.desc}
                    </p>
                  </div>

                  <button 
                    onClick={() => setActivePage('programs')}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold font-display text-center inline-block cursor-pointer"
                  >
                    Explore Pillar Details
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 17. RELATED RECOMMENDED ARTICLES SECTION */}
          <section className="space-y-6">
            <div className="text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">SEMANTIC VECTOR MATCH</span>
              <h2 className={`text-xl md:text-2xl font-display font-black tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
                Recommended Reading
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((art) => (
                <div 
                  key={art.id}
                  onClick={() => setActivePage(`blog/${art.slug}`)}
                  className={`group rounded-3xl border overflow-hidden cursor-pointer text-left transition-all hover:-translate-y-1 hover:shadow-md ${
                    highContrast ? 'bg-zinc-950 border-white text-white' : 'bg-white border-slate-200/50'
                  }`}
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    <img 
                      src={art.image} 
                      alt={art.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 left-2 bg-slate-900/90 text-gold text-[8px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                      {art.topic}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="text-xs font-bold font-display text-slate-800 dark:text-white line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors">
                      {art.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono">{art.readTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 18. INTERACTIVE DISCUSSIONS BLOCK */}
          <section className="scroll-mt-24 space-y-6" id="section-discussion">
            <div className="text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">KNOWLEDGE CONCORD</span>
              <h2 className={`text-xl md:text-2xl font-display font-black tracking-tight ${highContrast ? 'text-white' : 'text-slate-950'}`}>
                Public Discussion & Feedback
              </h2>
            </div>

            <div className={`p-6 md:p-8 rounded-3xl border text-left space-y-8 ${
              highContrast ? 'bg-zinc-950 border-white' : 'bg-white border-slate-200/50 shadow-sm'
            }`}>
              
              {/* Discuss notification future */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/40 border flex gap-3 text-xs leading-normal text-slate-500 dark:text-zinc-400">
                <Info size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                <span>Discussion pipeline authenticated securely. This hub supports markdown notes and holds future adapters to synch comments directly with <strong>Disqus</strong> and <strong>Supabase PostgreSQL Realtime</strong> engines.</span>
              </div>

              {/* Submit comment form */}
              <form onSubmit={handleAddComment} className="space-y-4 pt-2">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400">Join the discussion</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Your Professional Name" 
                    required
                    value={newCommentName}
                    onChange={(e) => setNewCommentName(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 dark:bg-zinc-950 dark:border-zinc-800 rounded-xl text-slate-800 dark:text-white"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2.5 bg-slate-950 hover:bg-slate-900 text-white rounded-xl text-xs font-bold font-display cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Send size={12} />
                    Publish Comment
                  </button>
                </div>
                <textarea 
                  placeholder="Write your feedback or technical audit query..." 
                  rows={3}
                  required
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full p-4 text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 dark:bg-zinc-950 dark:border-zinc-800 rounded-xl text-slate-800 dark:text-white font-sans"
                ></textarea>
              </form>

              {/* Comment list */}
              <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-zinc-800">
                {comments.map((comm) => (
                  <div key={comm.id} className="space-y-4">
                    <div className="flex gap-4">
                      <img 
                        src={comm.avatar} 
                        alt={comm.name} 
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-1.5 flex-1 text-left">
                        <div className="flex justify-between items-center text-xs">
                          <h4 className="font-bold text-slate-800 dark:text-white font-display">{comm.name}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">{comm.date}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-sans font-medium">
                          {comm.text}
                        </p>

                        <div className="flex gap-4 pt-1 text-[10px] font-mono text-slate-400">
                          <button 
                            onClick={() => handleLikeComment(comm.id)}
                            className={`flex items-center gap-1 cursor-pointer hover:text-emerald-700 ${comm.hasLiked ? 'text-emerald-700 font-bold' : ''}`}
                          >
                            <ThumbsUp size={12} />
                            <span>{comm.likes} Upvotes</span>
                          </button>

                          <button 
                            onClick={() => {
                              setComments(comments.map(c => c.id === comm.id ? { ...c, showReplyInput: !c.showReplyInput } : c));
                            }}
                            className="flex items-center gap-1 cursor-pointer hover:text-emerald-700"
                          >
                            <MessageSquare size={12} />
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Replies array */}
                    {comm.replies.map((rep) => (
                      <div key={rep.id} className="pl-12 flex gap-3 text-left">
                        <img 
                          src={rep.avatar} 
                          alt={rep.name} 
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-1 bg-slate-50 dark:bg-zinc-900 p-3 rounded-xl border border-slate-200/40 flex-1">
                          <div className="flex justify-between items-center text-[10px]">
                            <h5 className="font-bold text-slate-700 dark:text-zinc-200">{rep.name}</h5>
                            <span className="text-[9px] text-slate-400 font-mono">{rep.date}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-zinc-300 font-sans leading-normal">
                            {rep.text}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Reply input field */}
                    {comm.showReplyInput && (
                      <div className="pl-12 flex gap-2">
                        <input 
                          type="text"
                          placeholder="Write reply response..."
                          value={comm.replyText}
                          onChange={(e) => {
                            const text = e.target.value;
                            setComments(comments.map(c => c.id === comm.id ? { ...c, replyText: text } : c));
                          }}
                          className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border focus:outline-none dark:bg-zinc-950 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-white font-sans"
                        />
                        <button 
                          onClick={() => handleAddReply(comm.id)}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs rounded-lg font-bold font-display cursor-pointer"
                        >
                          Reply
                        </button>
                      </div>
                    )}

                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* 19. NEWSLETTER SUBSCRIPTION (GLASSMOPHIC CARD) */}
          <section className="scroll-mt-24" id="newsletter-subscription">
            <div className="relative overflow-hidden rounded-3xl bg-emerald-950 text-white border border-emerald-900 shadow-xl py-10 px-8 text-left">
              {/* Cover background pattern opacity */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center"></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-wider block">KNOWLEDGE DIRECTIVE</span>
                  <h3 className="text-lg md:text-2xl font-display font-black text-white leading-tight">
                    Subscribe For Direct Knowledge Digests
                  </h3>
                  <p className="text-xs text-slate-300 leading-normal font-sans">
                    Receive statutory compliance updates, on-field progress summaries, and spatial development indices compiled monthly by the RMST Board of Advisors.
                  </p>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-2">
                  <input 
                    type="text" 
                    placeholder="Your Professional Name"
                    className="w-full px-4 py-2 bg-slate-900/80 border border-emerald-800 focus:outline-none focus:ring-2 focus:ring-gold text-white text-xs rounded-lg"
                  />
                  <div className="flex gap-1.5">
                    <input 
                      type="email" 
                      placeholder="Corporate Email"
                      className="flex-1 px-4 py-2 bg-slate-900/80 border border-emerald-800 focus:outline-none focus:ring-2 focus:ring-gold text-white text-xs rounded-lg"
                    />
                    <button 
                      onClick={() => alert('Subscription registered successfully!')}
                      className="px-4 py-2 bg-gold hover:bg-gold-light text-slate-950 text-xs font-bold font-display rounded-lg cursor-pointer shrink-0"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 20. CTA IMPACT BANNER */}
          <section className="relative overflow-hidden rounded-3xl bg-slate-950 text-white py-16 px-8 text-center" id="cta-impact">
            <div className="absolute inset-0 z-0 opacity-25 bg-[url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-slate-950/85 z-10"></div>

            <div className="relative z-20 max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl md:text-3xl font-display font-black tracking-tight text-white leading-tight">
                Together We Create Sustainable Change
              </h2>
              <p className="text-slate-300 text-xs leading-relaxed font-sans">
                Support our geolocated climate rehabilitation, cooperative dairy cold chains, and smart IT high school mentorships. Your statutory grant transforms rural development outcomes.
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button 
                  onClick={() => setActivePage('donate')}
                  className="px-5 py-2.5 bg-gold hover:bg-gold-light text-slate-950 rounded-full text-xs font-bold font-display cursor-pointer shadow-lg shadow-gold/15"
                >
                  Donate CSR Funds
                </button>
                <button 
                  onClick={() => setActivePage('volunteer')}
                  className="px-5 py-2.5 border border-white/20 hover:bg-white/10 text-white rounded-full text-xs font-bold font-display cursor-pointer"
                >
                  Join as Volunteer
                </button>
                <button 
                  onClick={() => setActivePage('contact')}
                  className="px-5 py-2.5 border border-white/20 hover:bg-white/10 text-white rounded-full text-xs font-bold font-display cursor-pointer"
                >
                  Partner With Us
                </button>
              </div>
            </div>
          </section>

          {/* Back button link */}
          <div className="pt-6 border-t border-slate-200 dark:border-zinc-800 text-left">
            <button 
              onClick={() => setActivePage('blog')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-xs font-bold hover:bg-slate-100 dark:hover:bg-zinc-900 cursor-pointer text-slate-700 dark:text-zinc-200 font-display"
            >
              <ArrowLeft size={14} />
              Return to Knowledge Hub
            </button>
          </div>

        </main>

      </div>

      {/* --- LIGHTBOX MODALS & OVERLAYS --- */}

      {/* 21. LIGHTBOX MODAL IMAGE VISUAL */}
      <AnimatePresence>
        {activeLightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl w-full flex flex-col space-y-4 text-left relative"
            >
              <button 
                onClick={() => setActiveLightboxImage(null)}
                className="absolute top-[-30px] right-0 text-white hover:text-slate-300 font-mono text-sm cursor-pointer"
              >
                [CLOSE GALLERY ×]
              </button>
              <div className="bg-black border border-zinc-800 rounded-2xl overflow-hidden aspect-video">
                <img 
                  src={activeLightboxImage} 
                  alt="Enlarged visual" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
