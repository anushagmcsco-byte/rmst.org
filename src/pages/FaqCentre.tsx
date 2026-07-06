import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CircleHelp, 
  HandCoins, 
  Handshake, 
  Users, 
  Leaf, 
  ShieldCheck, 
  Calendar, 
  Newspaper, 
  Search, 
  Sparkles, 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown, 
  BookOpen, 
  Download, 
  CheckCircle2, 
  Globe, 
  Languages, 
  Volume2, 
  Database, 
  Network, 
  ExternalLink, 
  FileText, 
  Check,
  User,
  X,
  Clock,
  Briefcase,
  Layers,
  ArrowUpRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

// Interfaces
interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
}

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface FaqCentreProps {
  setActivePage: (page: string) => void;
  highContrast?: boolean;
}

export default function FaqCentre({ setActivePage, highContrast = false }: FaqCentreProps) {
  // --- States ---
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'faqs' | 'ai-assistant' | 'scheduler'>('faqs');
  
  // AI Assistant chat states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: "Namaste! I am the Raita Mitra AI Knowledge Assistant. I can help you search our compliance, donations, volunteer programs, or impact reports. What would you like to know today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Scalability Features Simulation State
  const [featuresState, setFeaturesState] = useState({
    enableAIChatbot: true,
    enableVoiceSearch: false,
    enableMultilingualFAQs: false,
    enableSmartRecommendations: true,
    enableKnowledgeGraph: false
  });

  const [activeLanguage, setActiveLanguage] = useState<'en' | 'kn'>('en');

  // Interactive scheduler states
  const [scheduleName, setScheduleName] = useState<string>('');
  const [scheduleEmail, setScheduleEmail] = useState<string>('');
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [scheduleTime, setScheduleTime] = useState<string>('');
  const [scheduleType, setScheduleType] = useState<string>('Corporate CSR');
  const [schedulerStatus, setSchedulerStatus] = useState<'idle' | 'success'>('idle');

  // Newsletter states
  const [newsletterName, setNewsletterName] = useState<string>('');
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState<boolean>(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // --- Static Library Data ---
  const CATEGORIES = [
    { id: 'all', title: 'All Questions', icon: Layers, color: 'text-slate-600 bg-slate-50 border-slate-200' },
    { id: 'general', title: 'General Questions', icon: CircleHelp, color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
    { id: 'donations', title: 'Donations & Tax Benefits', icon: HandCoins, color: 'text-indigo-700 bg-indigo-50 border-indigo-100' },
    { id: 'csr', title: 'Corporate CSR Partnerships', icon: Handshake, color: 'text-amber-700 bg-amber-50 border-amber-100' },
    { id: 'volunteer', title: 'Volunteer Opportunities', icon: Users, color: 'text-rose-700 bg-rose-50 border-rose-100' },
    { id: 'programs', title: 'Programs & Impact', icon: Leaf, color: 'text-teal-700 bg-teal-50 border-teal-100' },
    { id: 'compliance', title: 'Governance & Compliance', icon: ShieldCheck, color: 'text-violet-700 bg-violet-50 border-violet-100' },
    { id: 'events', title: 'Events & Workshops', icon: Calendar, color: 'text-sky-700 bg-sky-50 border-sky-100' },
    { id: 'media', title: 'Media & Resources', icon: Newspaper, color: 'text-pink-700 bg-pink-50 border-pink-100' }
  ];

  const POPULAR_SEARCH_TAGS = [
    "80G Certificate", "CSR Registration", "Volunteer Registration", 
    "Annual Reports", "Donation Receipt", "Impact Reports", "Programs", "Events"
  ];

  const FAQS: FAQItem[] = [
    // General Questions
    {
      id: 'g-1',
      category: 'general',
      question: 'What is Raita Mitra Social Trust (R)?',
      answer: 'Raita Mitra Social Trust (R) is a Karnataka-based non-profit organization registered under the Indian Trusts Act, 1882. We are deeply committed to empowering smallholder farmers, strengthening rural livelihoods, creating digital and AI skill labs, and promoting climate-resilient sustainable agricultural development across Karnataka.',
      tags: ['raita mitra', 'trust', 'overview', 'karnataka', 'non-profit', 'ngo']
    },
    {
      id: 'g-2',
      category: 'general',
      question: 'When was the Trust established?',
      answer: 'The Trust was established in 2021 by a group of passionate agricultural scientists, social entrepreneurs, and community leaders. We are headquartered in Hubballi, Karnataka, allowing us to actively serve rural and semi-urban communities throughout North Karnataka and surrounding districts.',
      tags: ['established', '2021', 'hubballi', 'headquarters', 'history']
    },
    {
      id: 'g-3',
      category: 'general',
      question: 'Which districts do you operate in?',
      answer: 'The Trust primarily works across rural and underserved districts of Karnataka, including Dharwad, Belagavi, Gadag, Haveri, Bagalkote, Vijayapura, and Koppal. Our strategic focus is on rain-fed agricultural zones and communities requiring systemic support in technology, female entrepreneurship, and sustainable water management.',
      tags: ['districts', 'dharwad', 'belagavi', 'gadag', 'haveri', 'geography', 'operation']
    },
    // Donations & Tax Benefits
    {
      id: 'd-1',
      category: 'donations',
      question: 'Are donations tax exempt?',
      answer: 'Yes, absolutely. Raita Mitra Social Trust (R) is registered under Section 12A of the Income Tax Act, 1961, and has been approved for tax exemption privileges under Section 80G. This approval permits all individual and corporate donors to claim a 50% tax deduction on their voluntary contributions relative to their taxable income limits.',
      tags: ['tax exemption', '80g', 'deduction', 'income tax', 'benefits', 'compliance']
    },
    {
      id: 'd-2',
      category: 'donations',
      question: 'How are donations utilized?',
      answer: 'We maintain a strict 100% accountability model. Approximately 88% of all donation inflows are routed directly into our on-field projects (such as distributing seed kits, building drip-irrigation networks, organizing health camps, and building Digital & AI Skill Labs). The remaining 12% is allocated to essential statutory overheads, audits, program monitoring, and impact reporting.',
      tags: ['utilization', 'funding', 'where money goes', 'finances', 'transparency']
    },
    {
      id: 'd-3',
      category: 'donations',
      question: 'Will I receive a donation receipt?',
      answer: 'Yes, always. Within 24-48 hours of your online or offline transaction, a digital donation receipt is generated and emailed to you. Additionally, at the end of the fiscal year, we submit Form 10BD to the Income Tax Department, which generates the formal Form 10BE tax certificate for your income tax filings.',
      tags: ['receipt', 'form 10be', 'form 10bd', 'certificate', 'donation receipt', 'tax certificate']
    },
    {
      id: 'd-4',
      category: 'donations',
      question: 'Can I make recurring donations?',
      answer: 'Yes, we offer monthly, quarterly, and annual automated recurring giving options. Recurring donations provide our field workers and administrative team with predictable funding, allowing us to sustain programs such as the rural women self-help circles and seasonal farmer training workshops.',
      tags: ['recurring', 'monthly', 'annual', 'giving', 'automated support']
    },
    // Corporate CSR Partnerships
    {
      id: 'c-1',
      category: 'csr',
      question: 'Is the Trust eligible to receive CSR funds?',
      answer: 'Yes. Raita Mitra Social Trust (R) is registered with the Ministry of Corporate Affairs (MCA), Government of India, to receive and implement Corporate Social Responsibility (CSR) funds under Section 135. Our official MCA registration number is CSR00059487, and we are fully eligible to partner with Indian and multinational corporations.',
      tags: ['csr registration', 'mca', 'eligible', 'section 135', 'corporate partnership', 'csr00059487']
    },
    {
      id: 'c-2',
      category: 'csr',
      question: 'Do you provide utilization certificates?',
      answer: 'Yes. For every CSR initiative, we provide quarterly milestone progress reports, high-resolution photo/video documentation, statutory audited financial balance sheets, and a comprehensive final Utilization Certificate (UC) signed by an independent Chartered Accountant in compliance with MCA norms.',
      tags: ['utilization certificates', 'reports', 'chartered accountant', 'milestones', 'audited reports']
    },
    {
      id: 'c-3',
      category: 'csr',
      question: 'Can CSR partners conduct field visits?',
      answer: 'We highly encourage active participation. We arrange guided field visits for corporate CSR committees, board members, and employees to experience the impact directly on the ground. This includes interaction with beneficiary farming families, women self-help groups, and rural youth enrolled in our AI digital labs.',
      tags: ['field visits', 'corporate engagement', 'verification', 'impact', 'meetings']
    },
    // Volunteer Opportunities
    {
      id: 'v-1',
      category: 'volunteer',
      question: 'Who can volunteer?',
      answer: 'We welcome volunteers from all walks of life—including students, working professionals, agricultural scientists, software developers, and retirees. We offer on-field volunteering (e.g., teaching in rural digital labs, assisting in soil health testing camps) as well as remote/virtual volunteering (e.g., content writing, graphic design, software development, data analysis).',
      tags: ['who can volunteer', 'students', 'professionals', 'remote', 'on-field', 'volunteer opportunities']
    },
    {
      id: 'v-2',
      category: 'volunteer',
      question: 'Do volunteers receive certificates?',
      answer: 'Yes, we issue formal certificates of participation, appreciation, and project-specific experience letters to all volunteers who fulfill their agreed project milestones and hour requirements. High-performing volunteers are also eligible for letters of recommendation from our Board of Trustees.',
      tags: ['certificate', 'recommendation', 'volunteer certificate', 'appreciation', 'recognition']
    },
    {
      id: 'v-3',
      category: 'volunteer',
      question: 'Can corporate teams volunteer?',
      answer: 'Yes, we host customized Corporate Employee Engagement (EE) programs. These include day-long rural service trips, technical coaching bootcamps for rural youths, or joint tree-planting drives. Our team takes care of logistics, safety briefings, and reporting on behalf of the sponsoring corporation.',
      tags: ['corporate volunteer', 'employee engagement', 'team bonding', 'corporate teams', 'workshops']
    },
    // Programs & Impact
    {
      id: 'p-1',
      category: 'programs',
      question: 'What are your key focus areas?',
      answer: 'We operate across 5 primary pillars: (1) Sustainable Agriculture & Drip Irrigation, (2) Women Empowerment & Micro-Livelihoods through Self-Help Groups (SHGs), (3) Digital Literacy & AI Skill Labs for youth, (4) Climate-Resilient Organic Farming Practices, and (5) Rural Health, Education, and Entrepreneurship support.',
      tags: ['focus areas', 'agriculture', 'women', 'education', 'ai labs', 'climate action', 'programs']
    },
    {
      id: 'p-2',
      category: 'programs',
      question: 'How is impact measured?',
      answer: 'We implement rigorous Monitoring, Evaluation, and Learning (MEL) frameworks. We track key indicators like household income growth, soil organic carbon recovery, water saved in liters, and digital/AI certificates earned by rural youngsters. Independent third-party agencies conduct periodic impact evaluation audits to verify outcomes.',
      tags: ['impact', 'monitoring', 'metrics', 'sdg', 'audits', 'measurement']
    },
    // Governance & Compliance
    {
      id: 'gov-1',
      category: 'compliance',
      question: 'Where can I access compliance documents?',
      answer: 'In the interest of full transparency, all of our official registration papers (Trust Deed, 80G Approval Certificate, 12A Registration, MCA CSR-1, PAN/TAN, and NGO Darpan registration details) are available for public download. You can find them directly on our "CSR & Compliance Hub" page in the navigation dropdown.',
      tags: ['compliance documents', 'registration papers', 'trust deed', '80g certificate', '12a registration', 'download']
    },
    {
      id: 'gov-2',
      category: 'compliance',
      question: 'Are annual reports publicly available?',
      answer: 'Yes, we publish our Annual Reports and Audited Financial Statements by July of every succeeding fiscal year. They include a complete breakdown of project-wise expenditures, operational reports, and statutory declarations. You can download current and historic records in our "Annual Reports & Transparency" portal.',
      tags: ['annual reports', 'financials', 'audit report', 'download reports', 'balance sheet']
    },
    // Events & Workshops
    {
      id: 'e-1',
      category: 'events',
      question: 'How do I register for an upcoming workshop?',
      answer: 'You can view our calendar of upcoming community events and tech workshops on our "Events & Workshops" page. Once you select a workshop, simply click the "Register" button, fill in your details, and a dynamic registration slip with location coordinates will be generated for you.',
      tags: ['register', 'workshops', 'calendar', 'events', 'participation']
    },
    {
      id: 'e-2',
      category: 'events',
      question: 'Are agricultural training camps free for farmers?',
      answer: 'Yes. All Raita Mitra extension programs, seed-distribution meets, smart-agriculture workshops, and soil health diagnostics camps are offered entirely free of cost to marginal and smallholder farmers. These camps are subsidized through generous individual donations and corporate CSR funding.',
      tags: ['free workshops', 'farmers support', 'training cost', 'agriculture camps']
    },
    // Media & Resources
    {
      id: 'm-1',
      category: 'media',
      question: 'Can we republish your impact studies and photographs?',
      answer: 'Yes. All of our original articles, research reports, and photo libraries are licensed under Creative Commons (CC BY-NC 4.0). You are welcome to republish them for non-commercial or academic purposes, provided you credit "Raita Mitra Social Trust (R)" clearly.',
      tags: ['republish', 'media kit', 'photos', 'creative commons', 'academic use']
    },
    {
      id: 'm-2',
      category: 'media',
      question: 'Who should we contact for media inquiries?',
      answer: 'For press releases, media kits, or official executive statements, you can reach out directly to our Media Relations cell at media@raitamitrasocialtrust.org or submit a ticket through our "Media & Press Centre" page.',
      tags: ['media contact', 'press releases', 'interviews', 'email media']
    }
  ];

  // --- Filter and Search Logic ---
  const filteredFaqs = FAQS.filter(faq => {
    // Category match
    const categoryMatch = selectedCategory === 'all' || faq.category === selectedCategory;
    
    // Search match
    const query = searchQuery.toLowerCase().trim();
    if (!query) return categoryMatch;

    const matchesQuestion = faq.question.toLowerCase().includes(query);
    const matchesAnswer = faq.answer.toLowerCase().includes(query);
    const matchesTags = faq.tags.some(tag => tag.toLowerCase().includes(query));

    return categoryMatch && (matchesQuestion || matchesAnswer || matchesTags);
  });

  // Toggle Single FAQ accordion
  const toggleFaq = (id: string) => {
    setOpenFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Expand all active FAQs helper
  const expandAllFiltered = () => {
    const newOpenState: Record<string, boolean> = {};
    filteredFaqs.forEach(f => {
      newOpenState[f.id] = true;
    });
    setOpenFaqs(newOpenState);
  };

  // Collapse all FAQs helper
  const collapseAll = () => {
    setOpenFaqs({});
  };

  // --- Simulated AI Chat Bot Engine ---
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    const currentInput = chatInput;
    setChatInput('');
    setIsTyping(true);

    // Dynamic responses based on keywords
    setTimeout(() => {
      let replyText = "I have scanned our knowledge graphs, policy reports, and audited financials. ";
      const cleanInput = currentInput.toLowerCase();

      if (cleanInput.includes('tax') || cleanInput.includes('80g') || cleanInput.includes('deduct')) {
        replyText += "Yes, Raita Mitra Social Trust holds active 80G tax exemption approvals. For all donations, individual or corporate, a 50% deduction is allowed under Section 80G. We will generate and email your receipt within 24-48 hours, followed by Form 10BE at the end of the financial year.";
      } else if (cleanInput.includes('csr') || cleanInput.includes('135') || cleanInput.includes('mca')) {
        replyText += "Raita Mitra Social Trust (R) is registered with the Ministry of Corporate Affairs under ID CSR00059487. We execute comprehensive programs mapped to Schedule VII of the Companies Act. We provide professional audited utilization certificates, quarterly reports, and support on-field due diligence visits.";
      } else if (cleanInput.includes('volunteer') || cleanInput.includes('join') || cleanInput.includes('opportunity')) {
        replyText += "We offer excellent volunteering avenues for both remote and on-field tasks. Volunteers receive formal certificates and appreciation letters. For corporate teams, we conduct structured 'Employee Engagement Rural Camps'. Feel free to fill our Volunteer form or message our desk!";
      } else if (cleanInput.includes('audit') || cleanInput.includes('report') || cleanInput.includes('financial') || cleanInput.includes('compliance')) {
        replyText += "Our trust is fully compliant. Registered on NGO Darpan (KA/2023/0342549) and CSR-1. Our annual statements are audited by Varma & Associates Chartered Accountants and are published transparently on our Transparency Hub under Resources.";
      } else if (cleanInput.includes('contact') || cleanInput.includes('phone') || cleanInput.includes('email') || cleanInput.includes('call')) {
        replyText += "You can reach our centralized support desk at +91 7676376221, email us at contact@raitamitrasocialtrust.org, or message us on WhatsApp for rapid assistance.";
      } else if (cleanInput.includes('program') || cleanInput.includes('focus') || cleanInput.includes('agriculture') || cleanInput.includes('women')) {
        replyText += "Our trust operates 5 central pillars focusing on: 1. Sustainable farming & Drip irrigation systems, 2. Rural Women SHG Livelihoods, 3. Digital skill labs, 4. Climate action & Organic manures, and 5. Rural youth incubation.";
      } else {
        // Fallback search in FAQ answers
        const match = FAQS.find(faq => 
          faq.question.toLowerCase().includes(cleanInput) || 
          faq.answer.toLowerCase().includes(cleanInput)
        );

        if (match) {
          replyText += `Here is what I found regarding "${match.question}": ${match.answer}`;
        } else {
          replyText += "We operate across multiple districts in Karnataka (Dharwad, Gadag, Belagavi) delivering direct interventions for rural households. To best assist you on this specific topic, would you like me to schedule a meeting with our Project Director, or trigger a direct callback to +91 7676376221?";
        }
      }

      setChatMessages(prev => [...prev, {
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1200);
  };

  // Trigger quick question in chat assistant
  const handleQuickQuestion = (qText: string) => {
    setChatInput(qText);
    setTimeout(() => {
      const form = document.getElementById('ai-chat-form') as HTMLFormElement;
      if (form) form.requestSubmit();
    }, 100);
  };

  // --- Interactive Scheduler Logic ---
  const handleSchedulerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleName || !scheduleEmail || !scheduleDate) return;
    setSchedulerStatus('success');
  };

  const resetScheduler = () => {
    setScheduleName('');
    setScheduleEmail('');
    setScheduleDate('');
    setScheduleTime('');
    setSchedulerStatus('idle');
  };

  // --- Dynamic Search Tags Activation ---
  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setSelectedCategory('all');
    // Scroll smoothly to FAQs
    const faqGrid = document.getElementById('faq-results-section');
    if (faqGrid) {
      faqGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll to bottom of chat
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  return (
    <div className={`w-full overflow-hidden ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* 1. HERO BANNER SECTION (Premium Help Center Banner) */}
      <section className="relative min-h-[480px] flex items-center justify-center py-20 bg-emerald-950 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" 
            alt="Community interactions and knowledge sharing" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-slate-900/90 to-emerald-950 z-0" />

        {/* Decorative Grid Overlays (UNICEF & World Bank vibe) */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 mb-4 text-xs font-mono text-emerald-400">
            <button onClick={() => setActivePage('home')} className="hover:underline hover:text-white transition-colors">Home</button>
            <ChevronRight size={12} />
            <span className="text-white/70">FAQ Centre</span>
          </div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4"
          >
            Frequently Asked <span className="text-gold">Questions</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm md:text-lg text-emerald-100/90 max-w-3xl mx-auto mb-10 leading-relaxed font-sans"
          >
            Find answers to common questions about our programs, donations, volunteering, partnerships and governance.
          </motion.p>

          {/* High-Fidelity Search Bar with AI Semantic Search indicators */}
          <div className="max-w-2xl mx-auto relative">
            <div className={`relative flex items-center p-1.5 rounded-2xl shadow-2xl transition-all duration-300 ${
              highContrast ? 'bg-black border-2 border-white' : 'bg-white text-slate-800 focus-within:ring-4 focus-within:ring-emerald-500/20'
            }`}>
              <div className="pl-3.5 pr-2 text-slate-400">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Search questions, keywords, or legal provisions (e.g., '80G', 'CSR')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 px-1 text-sm bg-transparent outline-none font-sans"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-1 mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
              <button 
                onClick={expandAllFiltered}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl tracking-wider transition-colors shrink-0 shadow-md cursor-pointer"
              >
                <Sparkles size={13} className="animate-pulse" />
                AI SEMANTIC
              </button>
            </div>

            {/* AI Active Indicator */}
            <div className="flex items-center justify-center gap-4 mt-4 flex-wrap text-xs text-emerald-300">
              <span className="flex items-center gap-1.5 bg-emerald-900/40 border border-emerald-800/60 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Semantic Engine Active
              </span>
              <span className="opacity-75 hidden md:inline">|</span>
              <span className="opacity-90">
                Statutory disclosures matching <b>FY 2025-26</b> Audits
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TAB CONTROLLER BAR (Smooth Interactive Switch) */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center overflow-x-auto gap-4 py-1">
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {[
              { id: 'faqs', label: 'FAQ Database', icon: Database },
              { id: 'ai-assistant', label: 'AI Help Assistant', icon: Sparkles, badge: 'Active' },
              { id: 'scheduler', label: 'Meeting Scheduler', icon: Calendar }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-3 md:px-5 text-xs md:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <tab.icon size={15} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono pr-4 shrink-0">
            <Globe size={13} />
            <span>Language:</span>
            <button 
              onClick={() => setActiveLanguage('en')}
              className={`px-2 py-0.5 rounded transition-all ${activeLanguage === 'en' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-100'}`}
            >
              English
            </button>
            <button 
              onClick={() => {
                setActiveLanguage('kn');
                setFeaturesState(prev => ({ ...prev, enableMultilingualFAQs: true }));
              }}
              className={`px-2 py-0.5 rounded transition-all ${activeLanguage === 'kn' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-100'}`}
            >
              ಕನ್ನಡ (KN)
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        
        {/* VIEW 1: MAIN FAQ DATABASE */}
        {activeTab === 'faqs' && (
          <div className="space-y-12">
            
            {/* POPULAR SEARCH TAGS CLOUD */}
            <div className={`p-5 rounded-2xl border ${highContrast ? 'border-white bg-black' : 'bg-white border-slate-100 shadow-sm'} flex flex-col md:flex-row items-start md:items-center gap-4`}>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 shrink-0 flex items-center gap-1.5">
                <TrendingUp size={13} className="text-gold animate-bounce" />
                Popular Searches:
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCH_TAGS.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer font-medium ${
                      searchQuery === tag 
                        ? 'bg-emerald-600 text-white shadow-sm font-bold scale-105' 
                        : 'bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* QUICK CATEGORY GRID */}
            <div>
              <h2 className="text-lg md:text-xl font-display font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <Layers size={18} className="text-emerald-600" />
                Browse Help By Category
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CATEGORIES.map((cat) => {
                  const IconComponent = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-5 rounded-2xl text-left border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-emerald-600 bg-emerald-50/75 shadow-lg shadow-emerald-500/10 scale-[1.02]' 
                          : 'border-slate-100 bg-white hover:border-emerald-200 hover:shadow-md'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <IconComponent size={20} />
                      </div>
                      <h3 className="font-semibold text-sm text-slate-900 mb-1 leading-snug">
                        {cat.title}
                      </h3>
                      <p className="text-[10px] text-slate-500 leading-tight">
                        {cat.id === 'all' ? 'All available FAQs' : `View issues related to ${cat.title.split(' ')[0]}`}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FAQ ACCORDION LISTING */}
            <div id="faq-results-section" className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Left filter sidebars & stats */}
              <div className="space-y-6 lg:sticky lg:top-24">
                <div className="bg-gradient-to-tr from-emerald-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-2 mb-4 text-emerald-400 font-mono text-xs uppercase tracking-wider">
                    <Database size={14} />
                    Knowledge Metrics
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2">Self-Service Portal</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    Raita Mitra maintains compliance frameworks and educational repositories to provide unhindered access to audited documentation.
                  </p>

                  <div className="space-y-4 font-mono">
                    <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                      <span className="opacity-75">Statutory Standard</span>
                      <span className="font-semibold text-emerald-300">Section 135 MCA</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                      <span className="opacity-75">Tax Exemption Status</span>
                      <span className="font-semibold text-emerald-300">Approved 80G</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                      <span className="opacity-75">Filing Frequency</span>
                      <span className="font-semibold text-emerald-300">Quarterly Audits</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="opacity-75">Trust Status</span>
                      <span className="font-semibold text-emerald-300">MCA Registered</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button 
                      onClick={() => setActiveTab('ai-assistant')}
                      className="w-full py-3 bg-white hover:bg-gold hover:text-black text-slate-900 text-xs font-bold rounded-xl tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles size={13} className="text-amber-500 animate-spin" />
                      Ask AI Assistant
                    </button>
                  </div>
                </div>

                {/* Developer Hub & SEO Schema Info Panel */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    Structured Schema Audit
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-normal mb-4">
                    This module automatically prints Google-compliant <b>FAQPage JSON-LD Schema</b> dynamically for advanced SEO crawl accessibility.
                  </p>

                  <div className="p-3.5 bg-slate-50 rounded-xl font-mono text-[10px] text-slate-600 space-y-1">
                    <div>{"{"}</div>
                    <div className="pl-3">{"\"@context\": \"https://schema.org\","}</div>
                    <div className="pl-3">{"\"@type\": \"FAQPage\","}</div>
                    <div className="pl-3">
                      {"\"mainEntity\": ["} 
                      <span className="text-emerald-600 font-bold">
                        {filteredFaqs.length} items loaded
                      </span>
                      {"]"}
                    </div>
                    <div>{"}"}</div>
                  </div>

                  {/* Active Toggles */}
                  <div className="mt-6 border-t border-slate-100 pt-4 space-y-3">
                    <span className="text-xs font-semibold text-slate-700 block">Future Scalability Modules:</span>
                    {[
                      { key: 'enableAIChatbot', label: 'AI Semantic Chatbot' },
                      { key: 'enableVoiceSearch', label: 'Voice Query Search' },
                      { key: 'enableMultilingualFAQs', label: 'Auto Multilingual (Kannada)' },
                      { key: 'enableSmartRecommendations', label: 'Smart Context Recs' },
                      { key: 'enableKnowledgeGraph', label: 'MCA Knowledge Graph' }
                    ].map((feat) => (
                      <div key={feat.key} className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">{feat.label}</span>
                        <button
                          onClick={() => setFeaturesState(prev => ({
                            ...prev,
                            [feat.key]: !prev[feat.key as keyof typeof prev]
                          }))}
                          className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                            featuresState[feat.key as keyof typeof featuresState] ? 'bg-emerald-600' : 'bg-slate-300'
                          }`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                            featuresState[feat.key as keyof typeof featuresState] ? 'translate-x-4' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Accordion FAQS list */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Search controller state text */}
                <div className="flex justify-between items-center bg-emerald-50/50 px-4 py-3 rounded-xl border border-emerald-100/40">
                  <span className="text-xs text-slate-600">
                    Showing <b>{filteredFaqs.length}</b> questions in <span className="font-semibold text-emerald-800 uppercase">"{selectedCategory === 'all' ? 'All' : CATEGORIES.find(c => c.id === selectedCategory)?.title}"</span>
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={expandAllFiltered} 
                      className="text-[10px] font-bold text-emerald-700 hover:underline cursor-pointer"
                    >
                      Expand All
                    </button>
                    <span className="text-slate-300">|</span>
                    <button 
                      onClick={collapseAll} 
                      className="text-[10px] font-bold text-slate-500 hover:underline cursor-pointer"
                    >
                      Collapse All
                    </button>
                  </div>
                </div>

                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                    <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle size={28} />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-slate-900 mb-2">No matching questions found</h3>
                    <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                      We couldn't find any FAQs matching "{searchQuery}" under this category. Let our AI Assistant answer it directly or schedule a meeting.
                    </p>
                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={() => {
                          setActiveTab('ai-assistant');
                          handleQuickQuestion(searchQuery);
                        }}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                      >
                        Ask AI Assistant
                      </button>
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                        }}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-lg cursor-pointer"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredFaqs.map((faq) => {
                      const isOpen = !!openFaqs[faq.id];
                      return (
                        <div 
                          key={faq.id}
                          className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                            isOpen 
                              ? 'bg-white border-emerald-500 shadow-md ring-1 ring-emerald-500/10' 
                              : 'bg-white border-slate-100 shadow-sm hover:border-slate-300'
                          }`}
                        >
                          {/* Accordion Trigger */}
                          <button
                            onClick={() => toggleFaq(faq.id)}
                            className="w-full text-left px-5 md:px-6 py-4 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                          >
                            <div className="space-y-1">
                              {/* Category Tag */}
                              <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                                {CATEGORIES.find(c => c.id === faq.category)?.title || faq.category}
                              </span>
                              <h3 className="text-sm md:text-base font-semibold text-slate-900 pr-4 mt-1.5">
                                {activeLanguage === 'kn' ? `[ಕನ್ನಡ] ${faq.question}` : faq.question}
                              </h3>
                            </div>
                            <div className={`mt-4 w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                              isOpen ? 'bg-emerald-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                            }`}>
                              <ChevronDown size={16} />
                            </div>
                          </button>

                          {/* Accordion Content */}
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                              >
                                <div className="px-5 md:px-6 pb-6 pt-1 border-t border-slate-50 text-slate-600 leading-relaxed text-xs md:text-sm">
                                  <p>{activeLanguage === 'kn' ? `ಕನ್ನಡ ವಿವರಣೆ: ${faq.answer}` : faq.answer}</p>
                                  
                                  {/* Internal Tags Cloud for SEO / Relevance */}
                                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                                    <div className="flex flex-wrap gap-1.5">
                                      {faq.tags.map((tag, idx) => (
                                        <span key={idx} className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                          #{tag}
                                        </span>
                                      ))}
                                    </div>
                                    <div className="flex gap-2">
                                      <button 
                                        onClick={() => {
                                          alert("Form 10BE and Audits can be downloaded directly in our CSR and Compliance Hub!");
                                          setActivePage('compliance');
                                        }}
                                        className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-1"
                                      >
                                        <BookOpen size={10} />
                                        Audit Docs
                                      </button>
                                      <span className="text-slate-300">|</span>
                                      <button 
                                        onClick={() => {
                                          setActiveTab('ai-assistant');
                                          handleQuickQuestion(faq.question);
                                        }}
                                        className="text-[10px] font-bold text-indigo-700 hover:underline flex items-center gap-1"
                                      >
                                        <Sparkles size={10} />
                                        Interactive Search
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
                )}
              </div>

            </div>

          </div>
        )}

        {/* VIEW 2: AI HELP ASSISTANT (Chat Widget Preview) */}
        {activeTab === 'ai-assistant' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Info panel on left */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase font-bold">
                  Co-pilot Interface
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mt-4 mb-3">
                  AI Help Assistant
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Ask our system natural language questions in English or Kannada about Section 80G tax claims, project auditing, board trustees, and seasonal schedules.
                </p>

                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500">
                    Engine Capabilities:
                  </h4>
                  {[
                    "Semantic search across all compliance sheets",
                    "Real-time Karnataka district project queries",
                    "Direct linking to download audit folders",
                    "Simulated multilingual assistance"
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-slate-600">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Quick Prompts */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-700 block mb-3">Suggested Queries:</span>
                <div className="space-y-2">
                  {[
                    "Is Raita Mitra tax-exempt under 80G?",
                    "Where is the Trust registered under CSR-1?",
                    "What districts in Karnataka do you operate?",
                    "How are donations utilized?"
                  ].map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(q)}
                      className="w-full text-left px-3.5 py-2.5 bg-slate-50 hover:bg-emerald-50 rounded-xl text-xs text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer block border border-slate-100 hover:border-emerald-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Chat Interface on right */}
            <div className="lg:col-span-2 bg-slate-950 text-slate-200 rounded-3xl shadow-2xl flex flex-col min-h-[550px] overflow-hidden border border-slate-800">
              
              {/* Top Chat Bar */}
              <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-tr from-emerald-600 to-indigo-600 rounded-full flex items-center justify-center font-display font-bold text-white text-sm">
                      RM
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white">Trust Knowledge Bot</h4>
                    <span className="text-[10px] text-emerald-400 font-mono">Generative Co-Pilot v2.4</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-1 rounded">
                    SYS: ONLINE
                  </span>
                </div>
              </div>

              {/* Chat Output Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-xs md:text-sm">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-4 ${
                      msg.sender === 'user' 
                        ? 'bg-emerald-600 text-white rounded-br-none' 
                        : 'bg-slate-900 text-slate-100 rounded-bl-none border border-slate-800'
                    }`}>
                      <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                      <span className="block text-[10px] opacity-65 text-right mt-2 font-mono">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-900 rounded-2xl rounded-bl-none p-4 border border-slate-800 flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono">Scanning Audits &amp; Compliance Hub...</span>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Chat Input Bar */}
              <form id="ai-chat-form" onSubmit={handleChatSubmit} className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask any question regarding tax, audits, CSR, or farming programs..."
                  className="w-full bg-slate-950 text-white rounded-xl py-3 px-4 outline-none border border-slate-800 focus:border-emerald-600 text-xs md:text-sm"
                />
                <button 
                  type="submit" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0"
                >
                  <Send size={16} />
                </button>
              </form>

              <div className="px-6 py-2 bg-slate-950 text-[10px] text-slate-500 text-center font-mono border-t border-slate-900">
                Authorized by the General Secretary of Raita Mitra Social Trust (R), Hubballi.
              </div>

            </div>

          </div>
        )}

        {/* VIEW 3: MEETING SCHEDULER */}
        {activeTab === 'scheduler' && (
          <div className="bg-white border border-slate-100 rounded-3xl shadow-xl overflow-hidden max-w-4xl mx-auto">
            
            {/* Split Screen Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Left Side Visual Cover */}
              <div className="relative bg-emerald-950 text-white p-8 md:p-12 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 opacity-20 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1521791136368-1a46827d091c?auto=format&fit=crop&q=80&w=600" 
                    alt="Corporate meeting and support desk" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 z-0 opacity-90" />

                <div className="relative z-10 space-y-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-900/50 border border-emerald-800 px-3 py-1 rounded-full">
                    Due Diligence &amp; CSR Calls
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold">Schedule A Live Consultation</h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Need customized board papers, compliance clarification, or details on active rural sites? Book a direct video call or phone diagnostic meeting with our Project Management Unit (PMU).
                  </p>
                </div>

                <div className="relative z-10 space-y-4 pt-10 border-t border-white/10 font-sans text-xs">
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-emerald-400 shrink-0" />
                    <span>Slots: Mon - Sat | 10:00 AM - 6:00 PM IST</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>Meeting platform: Google Meet / MS Teams</span>
                  </div>
                </div>
              </div>

              {/* Right Side Interactive Scheduling Form */}
              <div className="p-8 md:p-12">
                {schedulerStatus === 'success' ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="font-display font-bold text-lg text-slate-900">Meeting Requested Successfully</h4>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                      Namaste! Thank you, <b>{scheduleName}</b>. We have queued your request for <b>{scheduleDate}</b> at <b>{scheduleTime || "11:00 AM"}</b>. An invite code and calendar link has been sent to <b>{scheduleEmail}</b>.
                    </p>
                    <div className="pt-4">
                      <button 
                        onClick={resetScheduler}
                        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
                      >
                        Book Another Slot
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSchedulerSubmit} className="space-y-4 font-sans text-xs">
                    <h4 className="font-display font-semibold text-sm text-slate-900 uppercase tracking-wider mb-2">
                      Booking Information
                    </h4>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Your Name / Organisation</label>
                      <input 
                        type="text" 
                        required
                        value={scheduleName}
                        onChange={(e) => setScheduleName(e.target.value)}
                        placeholder="e.g. CSR Representative - Tata Projects"
                        className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Official Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={scheduleEmail}
                        onChange={(e) => setScheduleEmail(e.target.value)}
                        placeholder="e.g. contact@tataprojects.com"
                        className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Preferred Date</label>
                        <input 
                          type="date" 
                          required
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-emerald-500/20 outline-none text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Preferred Time Slot</label>
                        <select 
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                          className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-emerald-500/20 outline-none text-xs"
                        >
                          <option value="11:00 AM">11:00 AM IST</option>
                          <option value="12:30 PM">12:30 PM IST</option>
                          <option value="3:00 PM">03:00 PM IST</option>
                          <option value="4:30 PM">04:30 PM IST</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Consultation Topic</label>
                      <select 
                        value={scheduleType}
                        onChange={(e) => setScheduleType(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-emerald-500/20 outline-none text-xs font-semibold text-slate-700"
                      >
                        <option value="Corporate CSR">Corporate CSR &amp; Project Funding</option>
                        <option value="Donation Query">Donations &amp; 80G Tax Certificates</option>
                        <option value="Volunteering">Volunteering Opportunities &amp; Camps</option>
                        <option value="Audits">Audits, Compliance &amp; Governance Files</option>
                        <option value="Other">General Partnership</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit"
                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-colors shadow-md cursor-pointer"
                      >
                        Confirm Slot Request
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>

          </div>
        )}

      </div>

      {/* 3. STILL NEED HELP SECTION (Split Screen layout) */}
      <section className="bg-slate-900 text-white overflow-hidden py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side Visual banner */}
            <div className="relative rounded-3xl overflow-hidden h-[340px] shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800" 
                alt="Support team interacting with rural farming communities" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-mono tracking-widest text-gold bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full uppercase">
                  Centralized Support Desk
                </span>
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed max-w-sm">
                  Connecting corporations, global donors, rural beneficiaries and field teams under unified accountability streams.
                </p>
              </div>
            </div>

            {/* Right side details with buttons */}
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} className="text-gold" />
                Contact Streams
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold">Still Need Help?</h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
                If your specific statutory query, donation tracking receipt request, or CSR Board resolution clearance requires personalized intervention, our dedicated Desk Officers are happy to assist you directly.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button 
                  onClick={() => setActivePage('contact')}
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-colors shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <Mail size={14} />
                  Contact Us
                </button>
                <a 
                  href="https://wa.me/917676376221" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-colors border border-slate-700 flex items-center gap-2"
                >
                  <MessageCircle size={14} className="text-emerald-400" />
                  WhatsApp Support
                </a>
                <button 
                  onClick={() => {
                    setActiveTab('scheduler');
                    const el = document.getElementById('top-utility-bar');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-gold text-xs font-bold rounded-xl tracking-wider uppercase transition-colors border border-gold/30 flex items-center gap-2"
                >
                  <Calendar size={14} />
                  Schedule A Meeting
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. RECOMMENDED RESOURCES & KNOWLEDGE BASE SECTION */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-emerald-600 uppercase tracking-widest font-bold">
              Knowledge Base
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mt-2">
              Recommended Resources
            </h2>
            <p className="text-xs md:text-sm text-slate-500 mt-2">
              Navigate directly to other central repositories, statutory disclosures and directories in the Raita Mitra ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { title: 'Resource Centre', id: 'resources', desc: 'Centralized policy papers, training logs', icon: BookOpen },
              { title: 'Annual Reports', id: 'transparency', desc: 'Balance sheets, auditor certificates', icon: FileText },
              { title: 'CSR Brochure', id: 'resources', desc: 'MCA registrations and portfolio profiles', icon: Briefcase },
              { title: 'Impact Stories', id: 'stories', desc: 'Success timelines and metrics', icon: Leaf },
              { title: 'Events & Workshops', id: 'events', desc: 'Agricultural diagnostics camp logs', icon: Calendar }
            ].map((res, idx) => {
              const IconComp = res.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActivePage(res.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-200 transition-all text-left cursor-pointer flex flex-col justify-between"
                >
                  <div className="w-9 h-9 bg-white text-emerald-600 rounded-lg flex items-center justify-center shadow-sm mb-4">
                    <IconComp size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs md:text-sm text-slate-950 mb-1 leading-snug">
                      {res.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 leading-snug">
                      {res.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CONTACT SUPPORT DESK SECTION */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-emerald-600 uppercase tracking-widest font-bold">
              Direct Contact Channels
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mt-2">
              Corporate Support Desk
            </h2>
            <p className="text-xs md:text-sm text-slate-500 mt-2">
              Have urgent questions or need help? Reach our corporate office team instantly through our support channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Phone, title: 'Call Support', value: '+91 7676376221', desc: 'Mon - Sat (10:00 AM - 6:00 PM IST)', action: 'tel:+917676376221', actionLabel: 'Place Call' },
              { icon: Mail, title: 'Email Support', value: 'contact@raitamitrasocialtrust.org', desc: 'Average response within 24 hours', action: 'mailto:contact@raitamitrasocialtrust.org', actionLabel: 'Draft Email' },
              { icon: MessageCircle, title: 'WhatsApp Support', value: 'Instant Assistance', desc: 'Secure verification desk officer', action: 'https://wa.me/917676376221', actionLabel: 'Start Chat' }
            ].map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between items-start"
                >
                  <div className="space-y-4 w-full">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                      <IconComp size={18} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-500">{card.title}</h4>
                      <h3 className="font-semibold text-sm md:text-base text-slate-900 mt-1">{card.value}</h3>
                      <p className="text-[10px] text-slate-500 mt-1 leading-snug">{card.desc}</p>
                    </div>
                  </div>
                  <div className="w-full mt-6 pt-4 border-t border-slate-50">
                    <a 
                      href={card.action} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
                    >
                      {card.actionLabel}
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER JOIN (Stay Connected) */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-tr from-emerald-950 to-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-gold bg-slate-900/60 px-3 py-1 rounded-full border border-gold/20">
                Newsletter Registration
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold">Stay Connected</h2>
              <p className="text-xs md:text-sm text-emerald-100/80 leading-relaxed">
                Join our list to receive audited micro-project summaries, upcoming farmer skill camps, and compliance updates direct to your inbox.
              </p>

              {newsletterSubmitted ? (
                <div className="bg-emerald-900/40 border border-emerald-500/30 p-6 rounded-2xl max-w-md mx-auto space-y-2">
                  <CheckCircle2 size={24} className="text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-sm text-white">Subscription Successful</h4>
                  <p className="text-xs text-slate-300">
                    Thank you! We have registered your details for our monthly audited impact dispatch.
                  </p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail) setNewsletterSubmitted(true);
                  }}
                  className="space-y-3 max-w-md mx-auto"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    <div>
                      <input 
                        type="text" 
                        required
                        value={newsletterName}
                        onChange={(e) => setNewsletterName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full bg-white/10 border border-white/10 rounded-xl py-3 px-4 focus:bg-white/20 outline-none text-xs text-white"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full bg-white/10 border border-white/10 rounded-xl py-3 px-4 focus:bg-white/20 outline-none text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <button 
                      type="submit"
                      className="w-full py-3 bg-gold text-slate-950 text-xs font-bold rounded-xl tracking-wider uppercase hover:bg-yellow-400 transition-colors shadow-lg cursor-pointer"
                    >
                      Subscribe Now
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-400 block pt-1 font-mono">
                    Zero spam guaranteed. Unsubscribe at any time.
                  </span>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
