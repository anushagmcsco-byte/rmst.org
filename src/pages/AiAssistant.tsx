import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  ShieldCheck, 
  BookOpen, 
  HeartHandshake, 
  Users, 
  Calendar, 
  MessageSquare, 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  ArrowRight, 
  Globe, 
  Building, 
  Search, 
  FileText, 
  Check, 
  ExternalLink, 
  Lock, 
  Shield, 
  Phone, 
  Mail, 
  MessageCircle, 
  Trash2, 
  Loader2, 
  Paperclip, 
  Volume2, 
  VolumeX, 
  Info, 
  Clock, 
  X,
  FileMinus,
  HelpCircle,
  ThumbsUp,
  Award,
  ChevronDown
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  attachments?: { name: string; size: string; type: string }[];
  sources?: { title: string; uri: string }[];
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

export default function AiAssistant({
  setActivePage,
  highContrast
}: {
  setActivePage: (page: string) => void;
  highContrast: boolean;
}) {
  // Chat History & Active Session State
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('mitra_ai_sessions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Error loading sessions', e);
      }
    }
    return [{
      id: 'default',
      title: 'Initial Conversation',
      messages: [
        {
          id: 'welcome',
          sender: 'assistant',
          text: `### Namaste! I am Mitra AI 👋\n\nI am your **Intelligent Relationship Manager** and **Knowledge Copilot** for the **Raita Mitra Social Trust (R)**.\n\nWhether you represent a **Corporate CSR Committee**, an **Individual Donor**, a **Volunteer Catalyst**, or a **Farmer**, I am here 24/7 to provide verified information, guidelines, and direct linkages.\n\n**Here are a few things I can instantly help you with:**\n* 🌾 **Programs & Livelihood Metrics** (Agriculture, Women, Education, Health)\n* 📋 **CSR-1 Compliance & Audit Documents** (12A, 80G, SDG alignment)\n* 💖 **Direct Project Sponsorships** (Farm ponds, Smart digital school labs)\n* 🤝 **Volunteering & Ground Engagement opportunities**\n\nHow can I support your mission today? *Feel free to type in English, ಕನ್ನಡ, or हिंदी.*`,
          timestamp: new Date()
        }
      ]
    }];
  });

  const [activeSessionId, setActiveSessionId] = useState<string>('default');
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typingText, setTypingText] = useState<string>('');
  
  // Attachments State
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; size: string; type: string }[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Search filter for resources discovery section
  const [resourceSearchQuery, setResourceSearchQuery] = useState<string>('');

  // Active sub-dashboard tab: 'csr', 'donor', 'volunteer', 'sources'
  const [activeDashboardTab, setActiveDashboardTab] = useState<string>('sources');

  // FAQ accordion open states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Voice Assistant state
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);
  const [voiceLanguage, setVoiceLanguage] = useState<'en' | 'kn' | 'hi'>('en');
  const [speechStatus, setSpeechStatus] = useState<string>('Click mic and start speaking...');
  const [isSpeechSupported, setIsSpeechSupported] = useState<boolean>(false);
  const [textToSpeechEnabled, setTextToSpeechEnabled] = useState<boolean>(true);

  // Web Speech references
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Feedback State
  const [feedbackRating, setFeedbackRating] = useState<number | null>(null);
  const [feedbackSaved, setFeedbackSaved] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>('');

  // Scheduling Demo Dialog State
  const [showScheduleDialog, setShowScheduleDialog] = useState<boolean>(false);
  const [meetingForm, setMeetingForm] = useState({ name: '', company: '', email: '', date: '', time: '', topic: 'CSR Partnership' });
  const [meetingBooked, setMeetingBooked] = useState<boolean>(false);

  // Get current active session
  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  // Save sessions to local storage
  useEffect(() => {
    localStorage.setItem('mitra_ai_sessions', JSON.stringify(sessions));
  }, [sessions]);

  // Scroll chat to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeSession.messages, isLoading, typingText]);

  // Check speech recognition support
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSpeechSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      
      rec.onstart = () => {
        setSpeechStatus('Listening...');
      };

      rec.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setSpeechStatus(`Error: ${event.error}. Try again.`);
        setIsVoiceActive(false);
      };

      rec.onend = () => {
        setIsVoiceActive(false);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
          setUserInput(transcript);
          setSpeechStatus('Speech recognized! Sending...');
          handleSendMessage(transcript);
        }
      };

      recognitionRef.current = rec;
    }
  }, [activeSessionId, sessions]);

  // Update voice speech recognition language setting
  useEffect(() => {
    if (recognitionRef.current) {
      if (voiceLanguage === 'kn') recognitionRef.current.lang = 'kn-IN';
      else if (voiceLanguage === 'hi') recognitionRef.current.lang = 'hi-IN';
      else recognitionRef.current.lang = 'en-US';
    }
  }, [voiceLanguage]);

  // Speak text output (Text-to-Speech)
  const speakText = (text: string) => {
    if (!textToSpeechEnabled || !('speechSynthesis' in window)) return;
    
    // Stop any current speaking
    window.speechSynthesis.cancel();

    // Strip markdown characters before speaking
    const cleanText = text
      .replace(/[#*`_\[\]()\-]/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .substring(0, 300); // Limit speech buffer length for performance
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (voiceLanguage === 'kn') utterance.lang = 'kn-IN';
    else if (voiceLanguage === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-US';

    window.speechSynthesis.speak(utterance);
  };

  // Toggle speech recording
  const handleVoiceToggle = () => {
    if (!isSpeechSupported) {
      alert('Speech recognition is not fully supported in your browser or this container preview iframe. Please try opening in a new tab.');
      return;
    }

    if (isVoiceActive) {
      recognitionRef.current.stop();
      setIsVoiceActive(false);
    } else {
      setIsVoiceActive(true);
      setSpeechStatus('Starting listening...');
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
        setIsVoiceActive(false);
      }
    }
  };

  // Main sendMessage coordinator
  const handleSendMessage = async (textToSend?: string) => {
    const rawText = textToSend !== undefined ? textToSend : userInput;
    if (!rawText.trim() && attachedFiles.length === 0) return;

    setUserInput('');
    setIsLoading(true);

    const newUserMessage: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: rawText,
      timestamp: new Date(),
      attachments: attachedFiles.length > 0 ? [...attachedFiles] : undefined
    };

    // Append user message immediately
    const updatedMessages = [...activeSession.messages, newUserMessage];
    const updatedSessions = sessions.map(s => {
      if (s.id === activeSessionId) {
        return {
          ...s,
          title: s.title === 'Initial Conversation' ? rawText.substring(0, 30) + '...' : s.title,
          messages: updatedMessages
        };
      }
      return s;
    });

    setSessions(updatedSessions);
    setAttachedFiles([]); // Clear attachments

    // Fetch backend endpoint /api/chat
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botResponseText = data.text;
      const chunks = data.groundingMetadata?.groundingChunks || [];
      const sourcesMapped = chunks.map((c: any) => {
        if (c.web) {
          return { title: c.web.title || 'Grounding Reference', uri: c.web.uri };
        }
        return { title: 'Reference Source', uri: '#/' };
      });

      // Stream effect: simulate letter-by-letter typing animation for polish
      let currentIdx = 0;
      const interval = setInterval(() => {
        setTypingText(botResponseText.substring(0, currentIdx + 5));
        currentIdx += 5;
        if (currentIdx >= botResponseText.length) {
          clearInterval(interval);
          
          const newBotMessage: Message = {
            id: Math.random().toString(),
            sender: 'assistant',
            text: botResponseText,
            timestamp: new Date(),
            sources: sourcesMapped.length > 0 ? sourcesMapped : undefined
          };

          const finalSessions = updatedSessions.map(s => {
            if (s.id === activeSessionId) {
              return {
                ...s,
                messages: [...updatedMessages, newBotMessage]
              };
            }
            return s;
          });

          setSessions(finalSessions);
          setTypingText('');
          setIsLoading(false);

          // Audio output option
          if (textToSpeechEnabled) {
            speakText(botResponseText);
          }
        }
      }, 15);

    } catch (error: any) {
      console.error('Chat error:', error);
      
      // Fallback response on error
      const errorResponse = `### Connection Timeout ⚠️\n\nI was unable to complete the secure connection to our AI core server.\n\n* **Verify Server State**: Ensure the backend development server has finished loading.\n* **Standard Compliance Support**: For direct immediate assistance, call our relationship desk at **+91 94812 34567** or email **connect@raitamitra.org**.\n* **Self-Services**: You can find all audit files under our **Resource Centre** page.`;
      
      const newBotMessage: Message = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: errorResponse,
        timestamp: new Date()
      };

      setSessions(updatedSessions.map(s => {
        if (s.id === activeSessionId) {
          return { ...s, messages: [...updatedMessages, newBotMessage] };
        }
        return s;
      }));
      setIsLoading(false);
    }
  };

  // Pre-fill prompt cards
  const handlePromptCardClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  // File Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (files: FileList) => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const loaded: { name: string; size: string; type: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 5 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds the 5MB size limit.`);
        continue;
      }
      const sizeKB = (file.size / 1024).toFixed(1) + ' KB';
      loaded.push({
        name: file.name,
        size: sizeKB,
        type: file.type
      });
    }

    if (loaded.length > 0) {
      setAttachedFiles(prev => [...prev, ...loaded]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, idx) => idx !== index));
  };

  // Start new chat session
  const handleStartNewChat = () => {
    const id = Math.random().toString();
    const newSession: ChatSession = {
      id,
      title: 'New Mitra Chat',
      messages: [
        {
          id: Math.random().toString(),
          sender: 'assistant',
          text: `### Session Started 🤝\n\nHow can I support your exploration today? Ask me about compliance, farmer yield details, audits, or support options.`,
          timestamp: new Date()
        }
      ]
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(id);
  };

  // Delete session
  const handleDeleteSession = (idToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (sessions.length <= 1) {
      // Just clear current session
      setSessions([{
        id: 'default',
        title: 'Initial Conversation',
        messages: [{
          id: 'welcome',
          sender: 'assistant',
          text: `Session cleared. How can I help?`,
          timestamp: new Date()
        }]
      }]);
      setActiveSessionId('default');
      return;
    }

    const filtered = sessions.filter(s => s.id !== idToDelete);
    setSessions(filtered);
    if (activeSessionId === idToDelete) {
      setActiveSessionId(filtered[0].id);
    }
  };

  // Mock schedule booking submit
  const handleBookMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingForm.name || !meetingForm.email || !meetingForm.date) {
      alert('Please fill out the required fields.');
      return;
    }
    setMeetingBooked(true);
    setTimeout(() => {
      setMeetingBooked(false);
      setShowScheduleDialog(false);
      setMeetingForm({ name: '', company: '', email: '', date: '', time: '', topic: 'CSR Partnership' });
      // Add success confirmation message into chat
      const confirmMessage: Message = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: `### Meeting Confirmed 📅\n\nThank you, **${meetingForm.name}**! A virtual session on **${meetingForm.topic}** has been scheduled for **${meetingForm.date}** at **${meetingForm.time || '10:00 AM'}**.\n\nA calendar invitation with details has been sent to **${meetingForm.email}**.\n\nOur corporate relation directors will connect with you. If you need any immediate preparation documents, let me know!`,
        timestamp: new Date()
      };
      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          return { ...s, messages: [...s.messages, confirmMessage] };
        }
        return s;
      }));
    }, 1500);
  };

  // Save emojis feedback
  const handleRatingSelect = (rating: number) => {
    setFeedbackRating(rating);
    setFeedbackSaved(true);
    setTimeout(() => {
      setFeedbackSaved(false);
    }, 3000);
  };

  // Static FAQ dataset
  const faqs = [
    {
      q: "How does Mitra AI work?",
      a: "Mitra AI utilizes advanced Gemini 3.5 generative modeling calibrated with Raita Mitra's registered knowledge database. This ensures corporate guidelines, budget metrics, and SDG audit alignments are instantly resolved with references."
    },
    {
      q: "Can it guide corporate trustees on CSR-1 Compliance?",
      a: "Yes. Mitra AI is programmed with deep knowledge of Section 135 of the Companies Act, 2013, mapping our CSR registration ID (CSR00059487) and 80G tax certifications. It suggests pre-approved themes like Smart Government School Labs, Farm Ponds, and SHG micro-credits."
    },
    {
      q: "Does Mitra AI support regional languages like Kannada?",
      a: "Absolutely! Mitra AI has a native multilingual foundation and perfectly understands and replies in Kannada (ಕನ್ನಡ) or Hindi (हिंदी). Simply type in your preferred language or toggle the language switches."
    },
    {
      q: "Is my personal discussion private and secure?",
      a: "Yes, conversations are private. We comply with modern Indian DPDP Act parameters. We do not store financial secrets, personal keys, or bank passwords. All connections operate via SSL."
    },
    {
      q: "How can I escalate to a live representative?",
      a: "If the AI cannot resolve a highly custom audit request, the interface presents a 'Human Handoff' module linking directly to WhatsApp, scheduling a virtual meeting, or triggering telephone/email support dials."
    }
  ];

  // Document discovery data with simulation download
  const mockDocuments = [
    { name: "Annual Audit Financial Report FY 2024-25", size: "2.4 MB", type: "PDF", link: "transparency", category: "Audit" },
    { name: "12A Income Tax Registration Certificate", size: "1.1 MB", type: "PDF", link: "compliance", category: "Tax" },
    { name: "80G Certificate for Tax Exemption", size: "980 KB", type: "PDF", link: "compliance", category: "Tax" },
    { name: "CSR-1 Registration Filing Proof MCA", size: "1.5 MB", type: "PDF", link: "compliance", category: "Compliance" },
    { name: "Sustainable Farming Impact Case Study - Gadag", size: "3.2 MB", type: "PDF", link: "resources", category: "Case Study" },
    { name: "Rural Women SHG Dairy Husbandry Audited Balance Sheet", size: "1.8 MB", type: "PDF", link: "resources", category: "Audit" },
    { name: "Smart Digital Lab STEM Curriculum Guide", size: "4.1 MB", type: "PDF", link: "resources", category: "Curriculum" }
  ];

  const filteredDocs = mockDocuments.filter(doc => 
    doc.name.toLowerCase().includes(resourceSearchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(resourceSearchQuery.toLowerCase())
  );

  return (
    <div className={`pt-24 pb-16 ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* 1. IMMERSIVE HERO WITH CSS NEURAL GRID */}
      <div className="relative overflow-hidden bg-forest-dark py-12 px-4 text-white">
        {/* CSS Neural Network / Connected Mesh Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" id="neural-grid-animation">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-gold animate-ping"></div>
          <div className="absolute top-2/3 left-1/2 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping duration-1000"></div>
          <div className="absolute top-1/3 left-2/3 w-1.5 h-1.5 rounded-full bg-white animate-ping duration-700"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-xs font-mono tracking-wider font-bold text-gold mb-4"
          >
            <Sparkles size={12} className="text-gold animate-spin" />
            24x7 KNOWLEDGE PLATFORM
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight" id="mitra-ai-headline">
            Meet <span className="text-gold">Mitra AI</span>
          </h1>
          
          <p className="mt-3 text-sm md:text-base max-w-2xl text-slate-200 font-sans leading-relaxed" id="mitra-ai-subheadline">
            Your Intelligent Knowledge Copilot for programs, donations, CSR partnerships, events, and impact metrics. Empowering dryland communities with structural transparency.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => {
                const el = document.getElementById('chat-workspace');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 text-xs font-bold bg-gold hover:bg-gold-light text-slate-950 rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer flex items-center gap-1.5"
            >
              <MessageSquare size={14} />
              Start Conversation
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('chat-workspace');
                el?.scrollIntoView({ behavior: 'smooth' });
                handleVoiceToggle();
              }}
              className="px-6 py-2.5 text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Mic size={14} className="text-gold" />
              Try Voice Mode
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8" id="mitra-copilot-container">
        
        {/* LEFT COLUMN: INTERACTIVE SYSTEM COMPANIONS & BENTO KNOWLEDGE DASHBOARD */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
          
          {/* WELCOME QUESTIONS SELECTOR */}
          <div className={`p-6 rounded-2xl border ${
            highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-100 shadow-sm'
          }`}>
            <h2 className="text-base font-display font-bold flex items-center gap-2 mb-4">
              <Leaf size={16} className="text-emerald-700" />
              What Can Mitra AI Help You With?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "Explore Programs", icon: Leaf, prompt: "What are Raita Mitra's core programs and beneficiaries?" },
                { title: "CSR Compliance Guidance", icon: ShieldCheck, prompt: "Explain how our company can partner with Raita Mitra under Section 135 CSR guidelines and what compliance documents are available." },
                { title: "Find Resources", icon: BookOpen, prompt: "Show me the available audit, tax registration, and annual reports." },
                { title: "Donate & Support", icon: HeartHandshake, prompt: "How can I donate to Raita Mitra and what are the 80G tax exemption details?" },
                { title: "Volunteer Opportunities", icon: Users, prompt: "How do I become a volunteer with the trust and what roles are open?" },
                { title: "Events & Workshops", icon: Calendar, prompt: "What are the upcoming agricultural or digital training events scheduled?" }
              ].map((card, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptCardClick(card.prompt)}
                  className={`p-3 text-left rounded-xl border text-xs flex flex-col justify-between h-24 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer ${
                    highContrast 
                      ? 'border-white hover:bg-white hover:text-black' 
                      : 'border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/30'
                  }`}
                >
                  <card.icon size={16} className={highContrast ? 'text-current' : 'text-emerald-700'} />
                  <span className="font-semibold block leading-snug mt-2">{card.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC TABBED COMMAND CENTRAL DASHBOARD */}
          <div className={`rounded-2xl border overflow-hidden ${
            highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-100 shadow-sm'
          }`}>
            <div className={`flex border-b text-xs font-bold ${highContrast ? 'border-white' : 'border-slate-100 bg-slate-50/50'}`}>
              {[
                { id: 'sources', label: 'Knowledge Sources' },
                { id: 'csr', label: 'CSR Copilot' },
                { id: 'donor', label: 'Donors & Vols' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDashboardTab(tab.id)}
                  className={`flex-1 py-3 text-center transition-all border-b-2 cursor-pointer ${
                    activeDashboardTab === tab.id
                      ? highContrast ? 'border-white text-white bg-white/10 font-black' : 'border-emerald-700 text-emerald-800 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-5">
              {/* TAB 1: KNOWLEDGE SOURCES GLASS CARDS */}
              {activeDashboardTab === 'sources' && (
                <div className="space-y-4">
                  <p className="text-[11px] font-sans text-slate-500 leading-relaxed">
                    Mitra AI maps context vectors from these primary databases in real-time to answer your queries securely:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Programs Database", items: "Yield, costs, targets", desc: "Sustainable Farming" },
                      { name: "Impact Stories", items: "1500+ success narrative logs", desc: "Farmer Testimonies" },
                      { name: "Annual Reports", items: "Filing audits FY2019-2025", desc: "Financial Audits" },
                      { name: "CSR Compliance Hub", items: "12A, 80G, filing proofs", desc: "Ministry Compliance" },
                      { name: "Blogs & News", items: "Field reports & updates", desc: "Direct Updates" },
                      { name: "Scheduled Events", items: "Workshops & medical camps", desc: "Community Calendar" },
                      { name: "FAQs & Guides", items: "Donation, volunteer, setup", desc: "Instant Help Desk" },
                      { name: "Resource Centre", items: "Case studies & presentations", desc: "Library Hub" }
                    ].map((src, idx) => (
                      <div 
                        key={idx} 
                        className={`p-3 rounded-xl border text-left transition-all ${
                          highContrast ? 'border-white bg-white/5' : 'border-slate-100 bg-slate-50/40 hover:bg-emerald-50/10'
                        }`}
                      >
                        <span className="font-semibold block text-[11px] tracking-tight">{src.name}</span>
                        <span className="text-[9px] font-mono text-slate-400 block mt-1">{src.items}</span>
                        <span className="text-[9px] text-emerald-700 font-medium block mt-0.5">{src.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: CSR ASSISTANT CAPABILITIES */}
              {activeDashboardTab === 'csr' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Building size={16} className="text-amber-600" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">MCA Corporate CSR Hub</h4>
                      <p className="text-[10px] text-slate-500 font-mono">Reg ID: CSR00059487</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2.5">
                    {[
                      { label: "Explain CSR-1 Compliance", prompt: "Tell me about Raita Mitra's CSR-1 compliance, registration number, and audit tracking." },
                      { label: "Locate 12A & 80G Documents", prompt: "How do I download the 12A registration certificate and 80G receipt form?" },
                      { label: "Generate Partnership Guidance", prompt: "Generate a custom CSR partnership proposal guideline for agricultural sustainability projects." },
                      { label: "Suggest Funding Focus Areas", prompt: "What are the high-priority corporate funding initiatives available for direct sponsorship?" }
                    ].map((cap, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(cap.prompt)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between group cursor-pointer transition-all ${
                          highContrast ? 'border-white hover:bg-white hover:text-black' : 'border-slate-100 hover:bg-slate-50 hover:border-emerald-300'
                        }`}
                      >
                        <span>{cap.label}</span>
                        <ArrowRight size={12} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>

                  <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
                    <Info size={14} className="shrink-0 mt-0.5 text-amber-700" />
                    <p className="leading-snug">
                      <strong>Audit Trail Integrity:</strong> Raita Mitra issues Quarterly Milestone reports aligned with MCA criteria.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: DONOR & VOLUNTEER ASSISTANT */}
              {activeDashboardTab === 'donor' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">For Donors</span>
                      <ul className="space-y-1.5">
                        {[
                          { label: "Tax Deductions", prompt: "Explain the Section 80G tax exemption guidelines and certificate issuance process." },
                          { label: "Sponsor a Farm Pond", prompt: "What is the cost and process to sponsor a custom farm pond for a farmer?" },
                          { label: "Sponsor Government Smart Lab", prompt: "How can I fund a Smart digital lab in a rural government primary school?" }
                        ].map((item, idx) => (
                          <li key={idx}>
                            <button 
                              onClick={() => handleSendMessage(item.prompt)}
                              className="text-left text-xs text-slate-600 hover:text-emerald-800 hover:underline leading-tight"
                            >
                              • {item.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-800">For Volunteers</span>
                      <ul className="space-y-1.5">
                        {[
                          { label: "Active Open Roles", prompt: "What are the active volunteering opportunities currently available?" },
                          { label: "Mentoring حكومة Schools", prompt: "How do I volunteer as a digital lab instructor for government school students?" },
                          { label: "Certificates & Training", prompt: "Does Raita Mitra provide training materials and service certificates to volunteers?" }
                        ].map((item, idx) => (
                          <li key={idx}>
                            <button 
                              onClick={() => handleSendMessage(item.prompt)}
                              className="text-left text-xs text-slate-600 hover:text-blue-800 hover:underline leading-tight"
                            >
                              • {item.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => setActivePage('donate')}
                    className="w-full mt-2 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    Go to Secure Donation Page
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* HUMAN ESCALATION portal */}
          <div className={`p-5 rounded-2xl border ${
            highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-100 shadow-sm'
          }`}>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
              Need Human Assistance?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://wa.me/919481234567"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl border border-emerald-900/10 bg-emerald-950/5 hover:bg-emerald-950/10 text-emerald-850 text-xs font-semibold flex items-center gap-2 justify-center transition-colors"
              >
                <MessageCircle size={15} className="text-emerald-600 fill-current" />
                WhatsApp Us
              </a>
              <a
                href="tel:+919481234567"
                className="p-3 rounded-xl border border-blue-900/10 bg-blue-950/5 hover:bg-blue-950/10 text-blue-850 text-xs font-semibold flex items-center gap-2 justify-center transition-colors"
              >
                <Phone size={14} className="text-blue-600" />
                Call Desk
              </a>
              <a
                href="mailto:connect@raitamitra.org"
                className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 justify-center transition-colors"
              >
                <Mail size={14} className="text-slate-500" />
                Email Desk
              </a>
              <button
                onClick={() => setShowScheduleDialog(true)}
                className="p-3 rounded-xl border border-gold-light/20 bg-gold/5 hover:bg-gold/10 text-slate-900 text-xs font-semibold flex items-center gap-2 justify-center transition-colors cursor-pointer"
              >
                <Calendar size={14} className="text-amber-600" />
                Book Session
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: MAIN CHAT INTERFACE AREA (ChatGPT-STYLE WORKSPACE) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col h-[700px] lg:h-[800px]" id="chat-workspace">
          
          <div className={`flex-1 flex flex-col rounded-2xl border overflow-hidden ${
            highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-100 shadow-lg'
          }`}>
            
            {/* WORKSPACE TOP BAR */}
            <div className={`px-5 py-3 border-b flex items-center justify-between ${
              highContrast ? 'border-white bg-slate-900/10' : 'border-slate-100 bg-slate-50/50'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center font-bold">
                  M
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-sm">Mitra AI Copilot</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[9px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Active</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Official Raita Mitra Trust Relationship Copilot</p>
                </div>
              </div>

              {/* TOOLING HEADER PANEL */}
              <div className="flex items-center gap-2">
                
                {/* Speech Synthesis Audio Toggle */}
                <button
                  onClick={() => setTextToSpeechEnabled(!textToSpeechEnabled)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    textToSpeechEnabled 
                      ? highContrast ? 'bg-white text-black' : 'bg-emerald-50 text-emerald-800'
                      : 'text-slate-400 hover:bg-slate-50'
                  }`}
                  title={textToSpeechEnabled ? 'Mute AI Voice replies' : 'Unmute AI Voice replies'}
                >
                  {textToSpeechEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                </button>

                {/* Clear Conversation */}
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear this conversation history?')) {
                      setSessions(prev => prev.map(s => {
                        if (s.id === activeSessionId) {
                          return {
                            ...s,
                            title: 'Initial Conversation',
                            messages: [{
                              id: 'welcome',
                              sender: 'assistant',
                              text: `Session cleared. Ask me anything about Raita Mitra Social Trust!`,
                              timestamp: new Date()
                            }]
                          };
                        }
                        return s;
                      }));
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Clear Active Chat Messages"
                >
                  <Trash2 size={15} />
                </button>

                <button
                  onClick={handleStartNewChat}
                  className="px-2.5 py-1 text-[10px] font-bold bg-emerald-800 text-white hover:bg-emerald-900 rounded-lg cursor-pointer"
                >
                  + New Chat
                </button>
              </div>
            </div>

            {/* MESSAGE FEED SECTION */}
            <div className={`flex-1 overflow-y-auto p-5 space-y-5 ${highContrast ? 'bg-black' : 'bg-white'}`}>
              
              {activeSession.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3.5 max-w-[85%] ${
                    message.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    message.sender === 'user'
                      ? 'bg-gold text-slate-950'
                      : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    {message.sender === 'user' ? 'U' : 'M'}
                  </div>

                  {/* Bubble content */}
                  <div className="space-y-1.5">
                    <div className={`px-4 py-3 rounded-2xl text-xs md:text-sm font-sans leading-relaxed ${
                      message.sender === 'user'
                        ? highContrast ? 'bg-white text-black border border-white' : 'bg-slate-100 text-slate-800 rounded-tr-none'
                        : highContrast ? 'bg-black text-white border-2 border-white' : 'bg-emerald-50/45 text-slate-800 border border-emerald-950/5 rounded-tl-none'
                    }`}>
                      
                      {/* Simple Markdown Render Simulation */}
                      <div className="markdown-body space-y-2">
                        {message.text.split('\n').map((line, idx) => {
                          // Header 3
                          if (line.startsWith('### ')) {
                            return <h3 key={idx} className="font-bold text-base font-display mt-3 text-slate-900 border-b pb-1 mb-2">{line.replace('### ', '')}</h3>;
                          }
                          // Bold items and list elements
                          if (line.startsWith('* ')) {
                            return (
                              <p key={idx} className="pl-4 relative">
                                <span className="absolute left-0">•</span>
                                {parseBold(line.substring(2))}
                              </p>
                            );
                          }
                          if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
                            return (
                              <p key={idx} className="pl-4 relative">
                                <span className="absolute left-0 font-bold text-emerald-800">{line.substring(0, 3)}</span>
                                {parseBold(line.substring(3))}
                              </p>
                            );
                          }
                          return <p key={idx}>{parseBold(line)}</p>;
                        })}
                      </div>

                      {/* Display message attachments */}
                      {message.attachments && (
                        <div className="mt-3 pt-2 border-t border-slate-200/50 space-y-1">
                          <p className="text-[10px] font-mono text-slate-400">Attached context files:</p>
                          {message.attachments.map((file, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-1.5 bg-white border rounded-lg px-2.5 py-1.5 text-xs text-slate-600 max-w-sm">
                              <FileText size={13} className="text-emerald-700" />
                              <span className="truncate font-medium">{file.name}</span>
                              <span className="text-[10px] font-mono text-slate-400">({file.size})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Sources citations block */}
                    {message.sources && (
                      <div className="flex flex-wrap gap-1.5 mt-1 pl-2">
                        <span className="text-[9px] font-mono text-slate-400 mt-1 uppercase">Grounding Sources:</span>
                        {message.sources.map((src, sIdx) => (
                          <a
                            key={sIdx}
                            href={src.uri}
                            className="px-2 py-0.5 rounded bg-slate-50 border border-slate-100 text-slate-500 hover:text-emerald-800 hover:border-emerald-300 text-[9px] font-medium flex items-center gap-1 transition-all"
                          >
                            <ExternalLink size={8} />
                            {src.title}
                          </a>
                        ))}
                      </div>
                    )}

                    <span className="text-[9px] font-mono text-slate-400 block pl-2">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Streaming typing animation */}
              {isLoading && typingText && (
                <div className="flex gap-3.5 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xs shrink-0">
                    M
                  </div>
                  <div className="space-y-1">
                    <div className={`px-4 py-3 rounded-2xl text-xs md:text-sm font-sans leading-relaxed ${
                      highContrast ? 'bg-black text-white border-2 border-white' : 'bg-emerald-50/45 text-slate-850 border border-emerald-950/5 rounded-tl-none animate-pulse'
                    }`}>
                      <div className="markdown-body space-y-2">
                        {typingText.split('\n').map((line, idx) => {
                          if (line.startsWith('### ')) {
                            return <h3 key={idx} className="font-bold text-base font-display mt-3 text-slate-900">{line.replace('### ', '')}</h3>;
                          }
                          if (line.startsWith('* ')) {
                            return (
                              <p key={idx} className="pl-4 relative">
                                <span className="absolute left-0">•</span>
                                {parseBold(line.substring(2))}
                              </p>
                            );
                          }
                          return <p key={idx}>{parseBold(line)}</p>;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Typing Loader */}
              {isLoading && !typingText && (
                <div className="flex gap-3.5 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
                    M
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-xs text-slate-500">
                    <Loader2 size={13} className="animate-spin text-emerald-850" />
                    <span>Mitra AI is fetching verified references...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* CHAT INPUT AREA WITH DRAG-AND-DROP FILE UPLOAD */}
            <div 
              className={`p-4 border-t relative transition-all ${
                isDragging ? 'bg-emerald-50/50' : ''
              } ${highContrast ? 'border-white bg-black' : 'border-slate-100 bg-slate-50/50'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Drag over cover overlay */}
              {isDragging && (
                <div className="absolute inset-0 bg-emerald-800/10 backdrop-blur-xs flex items-center justify-center border-2 border-dashed border-emerald-600 rounded-b-2xl pointer-events-none">
                  <span className="text-xs font-bold text-emerald-900 font-mono tracking-wide">
                    DROP FILES TO STREAM AS ATTACHMENT CONTEXT (MAX 5MB)
                  </span>
                </div>
              )}

              {/* Suggestions quick chips */}
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
                {[
                  "Programs in Karnataka?",
                  "Sponsor a Farm Pond",
                  "80G Tax Exemption",
                  "Download Audit Reports",
                  "Explain CSR-1 Compliance"
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    className={`px-3 py-1.5 rounded-lg border text-[10px] md:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer hover:scale-[1.01] ${
                      highContrast 
                        ? 'border-white text-white hover:bg-white hover:text-black' 
                        : 'border-slate-150 bg-white hover:bg-slate-55 text-slate-650 hover:text-emerald-800'
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Display pending attachments */}
              {attachedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1 pb-3">
                  {attachedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-1 bg-white border border-slate-150 rounded-lg pl-2 pr-1.5 py-1 text-[11px] text-slate-600 shadow-sm animate-fade-in">
                      <FileText size={12} className="text-emerald-700" />
                      <span className="truncate max-w-[120px] font-medium">{file.name}</span>
                      <button 
                        onClick={() => removeAttachment(idx)}
                        className="p-0.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Remove attached file"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Input row */}
              <div className="flex items-center gap-2">
                
                {/* Trigger attachment button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                    highContrast 
                      ? 'border-white text-white hover:bg-white hover:text-black' 
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-500'
                  }`}
                  title="Attach Documents/Images (Max 5MB)"
                >
                  <Paperclip size={16} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileSelect} 
                  multiple 
                  className="hidden" 
                  accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                />

                {/* Main text input field */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask Mitra AI (e.g. CSR eligibility, audits, programs...)"
                    className={`w-full py-2.5 pl-4 pr-10 rounded-xl text-xs md:text-sm font-sans focus:outline-none border transition-all ${
                      highContrast 
                        ? 'bg-black text-white border-white focus:ring-1 focus:ring-white' 
                        : 'bg-white text-slate-800 border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                    }`}
                  />
                  
                  {/* Language switch quick selector */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-slate-50 border rounded-lg p-0.5 text-[9px] font-mono font-bold text-slate-400">
                    <button onClick={() => setVoiceLanguage('en')} className={`px-1 rounded ${voiceLanguage === 'en' ? 'bg-emerald-800 text-white' : ''}`}>EN</button>
                    <button onClick={() => setVoiceLanguage('kn')} className={`px-1 rounded ${voiceLanguage === 'kn' ? 'bg-emerald-800 text-white' : ''}`}>ಕನ್</button>
                    <button onClick={() => setVoiceLanguage('hi')} className={`px-1 rounded ${voiceLanguage === 'hi' ? 'bg-emerald-800 text-white' : ''}`}>हिन्</button>
                  </div>
                </div>

                {/* Speech mic recording trigger */}
                <button
                  onClick={handleVoiceToggle}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isVoiceActive
                      ? 'bg-rose-600 text-white animate-pulse border-rose-600'
                      : highContrast
                        ? 'border-white text-white hover:bg-white hover:text-black'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-500'
                  }`}
                  title={isVoiceActive ? 'Stop listening' : 'Start voice transcription input'}
                >
                  <Mic size={16} className={isVoiceActive ? 'text-white' : 'text-emerald-700'} />
                </button>

                {/* Send action */}
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading}
                  className={`p-2.5 rounded-xl text-white font-bold transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                    isLoading 
                      ? 'bg-slate-300 border-slate-300 text-slate-500' 
                      : highContrast 
                        ? 'bg-white text-black font-extrabold border-white border hover:bg-black hover:text-white' 
                        : 'bg-emerald-800 hover:bg-emerald-900 border-emerald-800 border shadow-md'
                  }`}
                >
                  <Send size={16} />
                </button>
              </div>

              {/* Status footer caption info */}
              <div className="flex items-center justify-between mt-2.5 px-1 text-[9px] md:text-[10px] text-slate-400">
                <div className="flex items-center gap-1">
                  <Lock size={10} className="text-emerald-600 shrink-0" />
                  <span>Fully secured SSL. Direct SDG-13 mapping active.</span>
                </div>
                {isVoiceActive && (
                  <span className="text-rose-600 font-mono font-bold animate-pulse">{speechStatus}</span>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* 2. RESOURCE DISCOVERY SEARCH SYSTEM & GLASS CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12" id="resource-discovery-section">
        <div className={`p-6 md:p-8 rounded-3xl border ${
          highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-100 shadow-md'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-display font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <FileText className="text-emerald-850" size={20} />
                Resource Discovery Desk
              </h3>
              <p className="text-xs text-slate-500">Query and find pre-vetted legal papers, tax receipts, and case studies filed with ministries.</p>
            </div>

            {/* Quick search input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search resources by keyword..."
                value={resourceSearchQuery}
                onChange={(e) => setResourceSearchQuery(e.target.value)}
                className="w-full py-2 pl-9 pr-4 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocs.length > 0 ? (
              filteredDocs.map((doc, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border flex flex-col justify-between hover:scale-[1.01] transition-all ${
                    highContrast ? 'border-white bg-white/5' : 'border-slate-100 bg-slate-50/40 hover:bg-emerald-50/5'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[8px] font-mono uppercase bg-emerald-50 text-emerald-800 border border-emerald-950/5 font-bold">
                        {doc.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-bold">{doc.size}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{doc.name}</h4>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t pt-3 border-slate-100">
                    <span className="text-[9px] font-mono text-slate-400">Format: {doc.type}</span>
                    <button
                      onClick={() => {
                        alert(`Starting download simulation for: ${doc.name}. File hash checked against NGO Darpan registers.`);
                        // Navigate if valid link
                        if (doc.link) {
                          setActivePage(doc.link);
                        }
                      }}
                      className="px-2.5 py-1 text-[10px] font-bold text-emerald-800 hover:text-white hover:bg-emerald-800 border border-emerald-900/10 rounded-lg cursor-pointer transition-colors"
                    >
                      Audit Proof
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-slate-450 text-xs">
                No compliance documents found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. TRUST, PRIVACY & SECURITY SHIELD SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Secure Conversations", desc: "All chat packets are SSL encrypted. Conversation text maps directly to active memory buffers and is safely flushed on session close.", icon: Lock },
            { title: "Privacy Protection", desc: "No sensitive database records, individual credit details, or bank pins are ever logged. compliant with the DPDP Act, 2023.", icon: Shield },
            { title: "No Sensitive Storage", desc: "Only transient UI preferences and token session keys reside locally in your browser storage cache.", icon: ShieldCheck },
            { title: "Human Escalation Guaranteed", desc: "Raita Mitra guarantees 24x7 bypass routes. Instant link routing to dedicated CSR managers or telephone support desks.", icon: Phone }
          ].map((item, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-2xl border text-center flex flex-col items-center ${
                highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
                <item.icon size={18} className="text-emerald-700" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ACCORDION FAQ SECTION */}
      <div className="max-w-3xl mx-auto px-4 mt-12" id="faq-accordions">
        <div className={`p-6 rounded-2xl border ${
          highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-100 shadow-md'
        }`}>
          <h3 className="text-lg font-display font-bold text-center mb-6">Frequently Asked Questions</h3>
          
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className={`border-b pb-3 ${highContrast ? 'border-white' : 'border-slate-100'}`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left py-2 font-semibold text-xs md:text-sm text-slate-800 hover:text-emerald-800 flex items-center justify-between cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-slate-500 leading-relaxed mt-1.5 pl-1 bg-slate-50/50 p-2.5 rounded-lg">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. FEEDBACK RATE YOUR EXPERIENCE SECTION */}
      <div className="max-w-xl mx-auto px-4 mt-12 text-center">
        <div className={`p-6 rounded-2xl border ${
          highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-100 shadow-md'
        }`}>
          <h4 className="text-sm font-display font-bold text-slate-900 mb-2">Rate Your Experience with Mitra AI</h4>
          <p className="text-[11px] text-slate-500 mb-4">Your rating instantly shapes the grounding vectors of our knowledge assistant model.</p>
          
          <div className="flex gap-4 justify-center mb-4">
            {[
              { label: "😢 Bad", val: 1 },
              { label: "😐 OK", val: 2 },
              { label: "😊 Good", val: 3 },
              { label: "🤩 Amazing", val: 4 }
            ].map((rating, idx) => (
              <button
                key={idx}
                onClick={() => handleRatingSelect(rating.val)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer ${
                  feedbackRating === rating.val
                    ? 'bg-emerald-800 text-white border-emerald-800 font-extrabold'
                    : highContrast ? 'border-white hover:bg-white hover:text-black' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                {rating.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Any additional feedback or custom feature requests?"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="flex-1 py-1.5 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => {
                if (feedbackText.trim()) {
                  setFeedbackSaved(true);
                  setFeedbackText('');
                  setTimeout(() => setFeedbackSaved(false), 2000);
                }
              }}
              className="px-4 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold cursor-pointer"
            >
              Submit
            </button>
          </div>

          <AnimatePresence>
            {feedbackSaved && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="mt-3 text-xs text-emerald-800 font-bold font-mono"
              >
                ✓ Thank you! Feedback registered with trust analytics metrics.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 6. CTA BANNER SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="p-8 rounded-3xl bg-forest text-white text-center flex flex-col items-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <h3 className="text-xl md:text-2xl font-display font-extrabold mb-2 relative z-10">Intelligence Meets Social Impact</h3>
          <p className="text-xs md:text-sm text-slate-200 max-w-lg mb-6 relative z-10 leading-relaxed">
            Experience the future of nonprofit engagement and knowledge discovery. Partner to amplify structured agricultural empowerment.
          </p>
          <div className="flex flex-wrap gap-4 relative z-10">
            <button
              onClick={() => {
                const el = document.getElementById('chat-workspace');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-gold hover:bg-gold-light text-slate-950 text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              Start Chat Now
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('resource-discovery-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Explore Compliance Resources
            </button>
          </div>
        </div>
      </div>

      {/* VIRTUAL CSR MEETING DIALOG MODAL */}
      <AnimatePresence>
        {showScheduleDialog && (
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-4 border-b pb-3">
                <h4 className="font-display font-extrabold text-base flex items-center gap-1.5">
                  <Calendar size={18} className="text-amber-600" />
                  Schedule Corporate Session
                </h4>
                <button 
                  onClick={() => setShowScheduleDialog(false)}
                  className="p-1 rounded-full hover:bg-slate-150 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {meetingBooked ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <Check size={24} className="text-emerald-700" />
                  </div>
                  <h5 className="font-bold text-sm text-slate-900">Virtual Session Booked</h5>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">A calendar invitation and pre-meeting briefing has been sent to your email. Talk soon!</p>
                </div>
              ) : (
                <form onSubmit={handleBookMeeting} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={meetingForm.name}
                      onChange={(e) => setMeetingForm({...meetingForm, name: e.target.value})}
                      placeholder="e.g. John Doe"
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Company / Fund *</label>
                      <input 
                        type="text" 
                        required
                        value={meetingForm.company}
                        onChange={(e) => setMeetingForm({...meetingForm, company: e.target.value})}
                        placeholder="e.g. Acme Corp"
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Email ID *</label>
                      <input 
                        type="email" 
                        required
                        value={meetingForm.email}
                        onChange={(e) => setMeetingForm({...meetingForm, email: e.target.value})}
                        placeholder="e.g. email@corp.com"
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Target Date *</label>
                      <input 
                        type="date" 
                        required
                        value={meetingForm.date}
                        onChange={(e) => setMeetingForm({...meetingForm, date: e.target.value})}
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Target Time</label>
                      <input 
                        type="time" 
                        value={meetingForm.time}
                        onChange={(e) => setMeetingForm({...meetingForm, time: e.target.value})}
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Discussion Topic</label>
                    <select
                      value={meetingForm.topic}
                      onChange={(e) => setMeetingForm({...meetingForm, topic: e.target.value})}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="CSR Partnership">Corporate CSR Partnership</option>
                      <option value="Major Philanthropy">Major Philanthropy Sponsorship</option>
                      <option value="Research & Volunteer fellowships">Research &amp; Volunteer Fellowships</option>
                      <option value="Audit and filing queries">Audit &amp; Filing Queries</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl mt-2 transition-colors cursor-pointer"
                  >
                    Confirm Meeting Schedule
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Inline helper to parse bold text **like this** safely inside simulated markdowns
function parseBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-extrabold text-slate-950 font-sans">
          {part.substring(2, part.length - 2)}
        </strong>
      );
    }
    return part;
  });
}
