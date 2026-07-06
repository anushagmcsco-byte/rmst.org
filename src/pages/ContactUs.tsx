import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Send, 
  Building2, 
  Wallet, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Handshake,
  HeartHandshake,
  Users,
  Megaphone,
  Briefcase,
  Calendar,
  Video,
  Check,
  Sparkles,
  Map,
  Filter,
  MessageSquare,
  ExternalLink,
  ChevronDown,
  Lock,
  ArrowUpRight,
  Bell,
  Globe
} from 'lucide-react';

interface ContactUsProps {
  highContrast: boolean;
}

// 1. DATA DEFINITIONS FOR PREMIUM DESIGNS
const QUICK_CONTACTS = [
  {
    id: "qc_1",
    title: "Registered Office",
    icon: Building2,
    value: "#37, First Floor, Pride Icon, Gokul Road, Hubballi - 580030, Karnataka, India",
    actionText: "View on Map",
    actionId: "google-maps-view"
  },
  {
    id: "qc_2",
    title: "Direct Helpline Desk",
    icon: Phone,
    value: "+91 7676376221",
    actionText: "Call Now",
    actionLink: "tel:+917676376221"
  },
  {
    id: "qc_3",
    title: "Email Correspondence",
    icon: Mail,
    value: "contact@raitamitrasocialtrust.org",
    actionText: "Send Mail",
    actionLink: "mailto:contact@raitamitrasocialtrust.org"
  },
  {
    id: "qc_4",
    title: "Office Working Hours",
    icon: Clock,
    value: "Monday – Saturday | 10:00 AM - 6:00 PM",
    actionText: "Closed Sundays"
  }
];

const DEPARTMENTS = [
  {
    id: "dep_1",
    title: "Corporate CSR Partnerships",
    icon: Handshake,
    email: "csr@raitamitrasocialtrust.org",
    phone: "+91 7676376221 (Ext 11)",
    description: "Submit multi-year ESG proposals, audit schedules, or request regional project diagnostics."
  },
  {
    id: "dep_2",
    title: "Donor Relations",
    icon: HeartHandshake,
    email: "donors@raitamitrasocialtrust.org",
    phone: "+91 7676376221 (Ext 12)",
    description: "Enquire about 80G tax certifications, FCRA clearances, and individual dynamic support."
  },
  {
    id: "dep_3",
    title: "Volunteer Coordination",
    icon: Users,
    email: "volunteer@raitamitrasocialtrust.org",
    phone: "+91 7676376221 (Ext 13)",
    description: "Apply for campus ambassador opportunities, student internships, or regional teaching drives."
  },
  {
    id: "dep_4",
    title: "Media & Communications",
    icon: Megaphone,
    email: "media@raitamitrasocialtrust.org",
    phone: "+91 7676376221 (Ext 14)",
    description: "Press releases, brand kit licensing, or requests for documentary video production."
  },
  {
    id: "dep_5",
    title: "Programs & Operations",
    icon: Briefcase,
    email: "programs@raitamitrasocialtrust.org",
    phone: "+91 7676376221 (Ext 15)",
    description: "Inquire about dairy cooperative networks, farm pond diagnostics, or solar micro-grid installations."
  }
];

const KARNATAKA_DISTRICTS = [
  { name: "Dharwad", region: "North", families: "4,200+", centers: 8, status: "Active desk" },
  { name: "Belagavi", region: "North", families: "3,800+", centers: 6, status: "Operational" },
  { name: "Bagalkot", region: "North", families: "2,500+", centers: 4, status: "Active desk" },
  { name: "Bidar", region: "Northeast", families: "3,100+", centers: 5, status: "Operational" },
  { name: "Raichur", region: "Northeast", families: "4,500+", centers: 9, status: "Active desk" },
  { name: "Koppal", region: "Northeast", families: "2,200+", centers: 3, status: "Operational" },
  { name: "Gadag", region: "North", families: "2,800+", centers: 5, status: "Active desk" },
  { name: "Haveri", region: "North", families: "5,100+", centers: 11, status: "Active desk" },
  { name: "Vijayapura", region: "North", families: "3,600+", centers: 7, status: "Operational" },
  { name: "Ballari", region: "Central", families: "2,900+", centers: 4, status: "Operational" },
  { name: "Kalaburagi", region: "Northeast", families: "4,800+", centers: 8, status: "Active desk" },
  { name: "Yadgir", region: "Northeast", families: "2,400+", centers: 3, status: "Operational" }
];

const LANDMARKS = [
  { name: "Hubli Airport", distance: "3.5 KM", type: "Airway Connection" },
  { name: "Gokul Road Police Station", distance: "0.4 KM", type: "Local Landmark" },
  { name: "Hubballi Railway Junction", distance: "4.2 KM", type: "Railway Connection" },
  { name: "Pride Icon Retail Plaza", distance: "0.1 KM", type: "Immediate Hub" }
];

const FAQS = [
  {
    q: "How can I partner with Raita Mitra Social Trust?",
    a: "We welcome collaborations with Corporate CSR Committees, Institutional Foundations, and Government entities. Please submit your strategic interest using our Multi-Step form. Our Executive Director, Smt. Anusha Mulimani, will formulate an authorized project proposal matching your compliance criteria."
  },
  {
    q: "Can I schedule a physical field visit to operational sites?",
    a: "Absolutely. We arrange guided field visits for corporate ESG donors and media representatives to soil health diagnostic centers, solar STEM labs, and women's dairy cooperatives. You can book an alignment session via our interactive Calendar tool below."
  },
  {
    q: "How do I become a registered field or remote volunteer?",
    a: "You can apply via our dedicated Volunteer section or select 'Volunteer Opportunities' in the contact form. We certify both field-based (rural teaching, soil collection) and remote (software code, translation) contributions."
  },
  {
    q: "How long does it take to receive an official response?",
    a: "Our Helpline Desk operates Monday through Saturday. All corporate CSR briefs and donor inquiries receive an authenticated reply with relevant legal documents (80G, CSR-1) within 24 business hours."
  },
  {
    q: "Can organizations collaborate on specific co-branded CSR projects?",
    a: "Yes. We create customized co-branded regional projects (e.g., 'Solar Smart Village' or 'Miyawaki Green Windbreaks') that map directly to your organization's ESG targets. We provide comprehensive quarterly ledger audit statements."
  }
];

const SOCIAL_POSTS = [
  {
    platform: "LinkedIn",
    tag: "@raitamitra-trust",
    text: "Honored to host corporate partners from Bengaluru for a guided field tour of our new solar-powered STEM laboratories in Haveri district. Over 250 rural schoolgirls are coding daily! 🌾💻🔋 #CorporateCSR #RuralTech",
    likes: 148,
    comments: 24,
    date: "Yesterday"
  },
  {
    platform: "Instagram",
    tag: "@raitamitra_socialtrust",
    text: "Soil Health is Future Wealth! 🧪 Our field volunteer officers successfully completed 12 soil micro-nutrient diagnostics diagnostic sessions in Savanur taluk this week. Thank you, Tata Trusts, for the calibration kits! #Sustainability",
    likes: 312,
    comments: 15,
    date: "2 days ago"
  },
  {
    platform: "Facebook",
    tag: "@RaitaMitraSocialTrust",
    text: "Women entrepreneurs of Savanur Dairy Cooperative have successfully integrated digital accounting dashboards into daily collection ledgers. Zero errors, instant transparent payouts! 🐄🥛📊 #WomenEmpowerment #FinancialInclusion",
    likes: 215,
    comments: 11,
    date: "3 days ago"
  }
];

const TESTIMONIALS = [
  {
    id: "t_1",
    type: "Corporate Partner Feedback",
    author: "Nikhil Deshpande",
    role: "CSR Director, Savanna Tech Group",
    quote: "Raita Mitra is unique in their transparency. Their multi-step ESG brief allowed us to launch a solar irrigation project in Dharwad with zero operational friction. The auditing and GIS project reports were flawless.",
    rating: 5
  },
  {
    id: "t_2",
    type: "Volunteer Experience",
    author: "Prerna Hegde",
    role: "STEM Volunteer, Hubli",
    quote: "Coordinating Python block programming with high school boys and girls was the highlight of my summer. Smt. Anusha Mulimani's team has structured volunteer onboarding perfectly.",
    rating: 5
  },
  {
    id: "t_3",
    type: "Community Testimonial",
    author: "Basavaraj Patil",
    role: "Marginalized Farmer, Savanur",
    quote: "The soil diagnostic report from the Raita Mitra team saved me ₹14,000 in unnecessary nitrogen fertilizers this season. Our yields are better and the cooperative pays us directly on time.",
    rating: 5
  }
];

const GALLERY_PREVIEWS = [
  { title: "Agriculture Programs", img: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600" },
  { title: "Women Empowerment", img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=600" },
  { title: "Health Camps", img: "https://images.unsplash.com/photo-1504813184591-01552fffd3be?auto=format&fit=crop&q=80&w=600" },
  { title: "Skill Development Workshops", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600" },
  { title: "Tree Plantation Activities", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600" }
];

export default function ContactUs({ highContrast }: ContactUsProps) {
  // Page Title Update
  useEffect(() => {
    document.title = "Contact Us | Raita Mitra Social Trust";
  }, []);

  // Multi-Step Inquiry Form States
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    organizationName: '',
    designation: '',
    emailAddress: '',
    mobileNumber: '',
    state: 'Karnataka',
    city: 'Hubballi',
    subject: '',
    interestedIn: 'CSR Partnership',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState(false);
  const [integrationLogs, setIntegrationLogs] = useState<string[]>([]);
  const [simulatedTicketId, setSimulatedTicketId] = useState('');

  // Service Area Interaction States
  const [hoveredDistrict, setHoveredDistrict] = useState<typeof KARNATAKA_DISTRICTS[0] | null>(null);

  // Appointment Booking Widget States
  const [selectedMeetingType, setSelectedMeetingType] = useState('CSR Consultation');
  const [selectedDate, setSelectedDate] = useState<number>(5); // Default to July 5th
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM');
  const [selectedPlatform, setSelectedPlatform] = useState('Google Meet');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // FAQs Accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Testimonials Carousel State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Live Chatbot Drawer State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    { sender: 'bot', text: "Namaste! I am MitraAI, your Raita Mitra support assistant. How can I assist you with CSR, donations, or volunteering today?", time: "10:00 AM" }
  ]);
  const [userChatMsg, setUserChatMsg] = useState('');

  // Support Ticketing System state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Helpline Assistance');
  const [ticketMsg, setTicketMsg] = useState('');
  const [activeTickets, setActiveTickets] = useState<Array<{ id: string; subject: string; category: string; status: string; date: string }>>([
    { id: "TKT-84920", subject: "Soil Health Card Dispatch", category: "Helpline Assistance", status: "In Progress", date: "2026-07-04" }
  ]);
  const [ticketSuccess, setTicketSuccess] = useState(false);

  // Newsletter subscription
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateStep = (step: number) => {
    const errors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.fullName.trim()) errors.fullName = "Full Name is required.";
      if (!formData.organizationName.trim()) errors.organizationName = "Organization Name is required.";
      if (!formData.designation.trim()) errors.designation = "Designation is required.";
    } else if (step === 2) {
      if (!formData.emailAddress.trim() || !formData.emailAddress.includes('@')) {
        errors.emailAddress = "Valid corporate email address is required.";
      }
      if (!formData.mobileNumber.trim() || formData.mobileNumber.replace(/\D/g, '').length < 10) {
        errors.mobileNumber = "Valid 10-digit mobile number is required.";
      }
      if (!formData.city.trim()) errors.city = "City/District name is required.";
    } else if (step === 3) {
      if (!formData.subject.trim()) errors.subject = "Inquiry Subject is required.";
      if (!formData.message.trim() || formData.message.length < 15) {
        errors.message = "Message must detail your strategic inquiry (min 15 chars).";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const triggerNextStep = () => {
    if (validateStep(formStep)) {
      setFormStep(prev => prev + 1);
    }
  };

  const triggerPrevStep = () => {
    setFormStep(prev => Math.max(1, prev - 1));
  };

  const executeInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setSubmittingInquiry(true);
    setIntegrationLogs(["Intelligent Routing Node: Parsing inquiry payload..."]);

    const pipelineSteps = [
      "Securing Linkage: Authenticating with Resend Email API...",
      "CRM Node: Writing lead details into Hubballi database...",
      "Cloud Integration: Syncing master row to Google Sheets repository...",
      "Sovereign Notification: Sending WhatsApp API dispatch to Smt. Anusha Mulimani...",
      "Mailchimp Portal: Queueing updates into 'Trust CSR Committee' subscriber segment..."
    ];

    pipelineSteps.forEach((logMessage, index) => {
      setTimeout(() => {
        setIntegrationLogs(prev => [...prev, logMessage]);
      }, (index + 1) * 450);
    });

    setTimeout(() => {
      const generatedId = "TKT-" + Math.floor(Math.random() * 90000 + 10000);
      setSimulatedTicketId(generatedId);
      setSubmittingInquiry(false);
      setSubmittedInquiry(true);
    }, 2800);
  };

  const executeAppointmentBooking = () => {
    setBookingLoading(true);
    setTimeout(() => {
      setBookingLoading(false);
      setBookingConfirmed(true);
    }, 1200);
  };

  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userChatMsg.trim()) return;

    const userMsg = { sender: 'user' as const, text: userChatMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, userMsg]);
    const requestedTxt = userChatMsg.toLowerCase();
    setUserChatMsg('');

    setTimeout(() => {
      let botResponse = "Thank you for reaching out! A human CSR officer will review your message shortly. Please use our Multi-Step Brief Form to request detailed audited reports.";
      if (requestedTxt.includes('csr') || requestedTxt.includes('partner')) {
        botResponse = "Smt. Anusha Mulimani manages our Corporate ESG relations directly. Sponsoring a smart lab or tree plantation can be easily processed! Would you like to review our multi-step CSR Brief Form on this page?";
      } else if (requestedTxt.includes('volunteer') || requestedTxt.includes('student')) {
        botResponse = "Excellent! Raita Mitra recruits student ambassadors and professional mentors. We have a dedicated 'Volunteer Coordination' team. Check out the departments card above!";
      } else if (requestedTxt.includes('address') || requestedTxt.includes('where') || requestedTxt.includes('hubli')) {
        botResponse = "Our main trust secretariat is located at: #37, First Floor, Pride Icon, Gokul Road, Hubballi - 580030. It's just 3.5 KM from Hubli Airport.";
      } else if (requestedTxt.includes('phone') || requestedTxt.includes('call')) {
        botResponse = "You can dial Smt. Anusha Mulimani or the General Desk at +91 7676376221 between 10:00 AM and 6:00 PM.";
      }
      
      setChatMessages(prev => [...prev, {
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 800);
  };

  const createTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMsg.trim()) return;

    const newTicket = {
      id: "TKT-" + Math.floor(Math.random() * 90000 + 10000),
      subject: ticketSubject,
      category: ticketCategory,
      status: "Awaiting CSR Officer",
      date: new Date().toISOString().split('T')[0]
    };

    setActiveTickets(prev => [newTicket, ...prev]);
    setTicketSubject('');
    setTicketMsg('');
    setTicketSuccess(true);
    setTimeout(() => setTicketSuccess(false), 4000);
  };

  const triggerNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
  };

  const scrollSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`w-full relative selection:bg-amber-500/20 ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`} id="contact-us-root">
      
      {/* SECTION 1: HERO SECTION - PREMIUM BANNER */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden py-24 px-4" id="contact-hero">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 scale-102"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1600')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/45 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <nav className="flex justify-center items-center gap-2 text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase" aria-label="Breadcrumb">
            <span className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => window.location.hash = '#/'}>Home</span>
            <ChevronRight size={10} className="opacity-50 text-slate-400" />
            <span className="text-amber-400">Contact Us</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Sparkles size={11} className="animate-pulse" />
            GOVERNMENT &amp; CORPORATE HELPLINE DESK
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-none">
            Let's Build Sustainable<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-amber-500">
              Futures Together
            </span>
          </h1>

          <p className="text-slate-300 text-xs md:text-sm lg:text-base max-w-3xl mx-auto leading-relaxed font-sans font-medium">
            Connect with Raita Mitra Social Trust (R) for partnerships, volunteering, donations and high-impact sustainable agriculture and community initiatives across Karnataka.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button 
              onClick={() => scrollSection('contact-split-form')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all duration-300 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-1.5 tracking-wider cursor-pointer"
            >
              <Send size={13} />
              <span>SEND INQUIRY</span>
            </button>
            <a 
              href="https://wa.me/917676376221?text=Hello%20Raita%20Mitra%20Social%20Trust"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-300 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 tracking-wider cursor-pointer"
            >
              <MessageSquare size={13} />
              <span>WHATSAPP US</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: QUICK CONTACT CARDS */}
      <section className="py-16 px-4 max-w-7xl mx-auto -mt-16 relative z-20" id="quick-contact-coordinates">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUICK_CONTACTS.map((card) => (
            <div 
              key={card.id}
              className={`p-6 rounded-3xl border text-left flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 ${
                highContrast 
                  ? 'bg-black border-2 border-white text-white' 
                  : 'bg-white/90 border-slate-200/60 shadow-lg shadow-slate-100/50 backdrop-blur-sm hover:shadow-xl'
              }`}
            >
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 inline-flex">
                  <card.icon size={20} className="stroke-[2]" />
                </div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">{card.title}</h3>
                <p className="text-xs font-bold text-slate-800 dark:text-white leading-relaxed">{card.value}</p>
              </div>
              
              {card.actionLink ? (
                <a 
                  href={card.actionLink}
                  className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-black inline-flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>{card.actionText}</span>
                  <ArrowRight size={10} />
                </a>
              ) : card.actionId ? (
                <button 
                  onClick={() => scrollSection(card.actionId)}
                  className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-black inline-flex items-center gap-1 hover:underline text-left cursor-pointer"
                >
                  <span>{card.actionText}</span>
                  <ArrowRight size={10} />
                </button>
              ) : (
                <span className="text-[10px] font-mono text-slate-400">{card.actionText}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: CONTACT FORM SECTION - SPLIT SCREEN */}
      <section className="py-16 px-4 bg-slate-100 dark:bg-zinc-950 border-y border-slate-200/40" id="contact-split-form">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side: Premium Image Panel */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/60">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000"
                  alt="CSR Collaboration" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-white/10 text-white">
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">Sovereign Compliance Assurance</p>
                  <p className="text-[10px] text-slate-300 font-mono mt-0.5 leading-normal">Our operations comply with state audit procedures under 80G and CSR-1 guidelines.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold font-display text-slate-800 dark:text-white">Trusted by Corporate CSR Boards</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  We specialize in crafting professional, verifiable project proposals that map onto measurable environmental, social, and economic indicators across 12 targeted Karnataka districts.
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white text-[10px] flex items-center justify-center font-bold text-slate-950">TT</div>
                    <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white text-[10px] flex items-center justify-center font-bold text-white">GI</div>
                    <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white text-[10px] flex items-center justify-center font-bold text-white">AP</div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Comparable standards of Tata Trusts &amp; GiveIndia</span>
                </div>
              </div>
            </div>

            {/* Right side: Professional Multi-step Form */}
            <div className="lg:col-span-7">
              <div className={`p-6 md:p-8 rounded-3xl border text-left ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/60 shadow-xl'
              }`}>
                
                <div className="space-y-1 mb-6 border-b border-slate-100 dark:border-zinc-800 pb-4">
                  <h2 className="text-lg font-black font-display text-slate-900 dark:text-white">Send Us A Message</h2>
                  <p className="text-xs text-slate-500">Our administrative secretariat team will analyze and get back to you shortly.</p>
                </div>

                <AnimatePresence mode="wait">
                  {submittedInquiry ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 text-center py-8"
                    >
                      <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-500 inline-flex">
                        <CheckCircle size={36} className="stroke-[2.5]" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white">Inquiry Lodged Successfully!</h3>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                          Thank you, {formData.fullName}. Your multi-step institutional proposal brief has been parsed and archived under ID <strong className="text-emerald-600 font-mono">{simulatedTicketId}</strong>.
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 text-left space-y-2 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                        <p className="text-[9px] text-slate-400 font-bold uppercase border-b border-slate-200/60 dark:border-zinc-800 pb-1.5 mb-2">INTEGRATION META RECEIPT</p>
                        <p className="flex justify-between"><span>Contact Person:</span> <span className="font-bold text-slate-900 dark:text-white">{formData.fullName}</span></p>
                        <p className="flex justify-between"><span>Organization:</span> <span className="font-bold text-slate-900 dark:text-white">{formData.organizationName}</span></p>
                        <p className="flex justify-between"><span>CSR Area:</span> <span className="font-bold text-slate-900 dark:text-white">{formData.interestedIn}</span></p>
                        <p className="flex justify-between"><span>Assigned Node:</span> <span className="font-bold text-emerald-600">Hubballi Secretariat Hub</span></p>
                        <p className="flex justify-between"><span>Email Recipient:</span> <span className="font-bold text-slate-900 dark:text-white">{formData.emailAddress}</span></p>
                      </div>

                      <p className="text-[10px] text-slate-400 leading-normal max-w-md mx-auto">
                        A secure tracking digest has been dispatched to **{formData.emailAddress}**. Smt. Anusha Mulimani and our regional chapter managers will verify this request within 12 business hours.
                      </p>

                      <button 
                        onClick={() => {
                          setSubmittedInquiry(false);
                          setFormData({
                            fullName: '',
                            organizationName: '',
                            designation: '',
                            emailAddress: '',
                            mobileNumber: '',
                            state: 'Karnataka',
                            city: 'Hubballi',
                            subject: '',
                            interestedIn: 'CSR Partnership',
                            message: ''
                          });
                          setFormStep(1);
                        }}
                        className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-forest hover:bg-forest-light cursor-pointer"
                      >
                        File Another CSR Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={executeInquirySubmit} className="space-y-4 text-xs">
                      
                      {/* Step Progress Bar */}
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-[10px] font-mono text-slate-400 uppercase font-bold">
                          <span>Progress Tracker</span>
                          <span className="text-gold">Step {formStep} of 3</span>
                        </div>
                        <div className="w-full h-1 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                          <div className="bg-forest h-full transition-all duration-300" style={{ width: `${(formStep / 3) * 100}%` }} />
                        </div>
                      </div>

                      {formStep === 1 && (
                        <motion.div 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-3"
                        >
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-2">
                            <User size={14} className="text-gold" /> Step 1: Corporate Profile
                          </h3>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-mono">Full Name</label>
                            <input 
                              type="text" 
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="e.g. Vikram Hegde" 
                              className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-forest ${
                                formErrors.fullName ? 'border-rose-400 ring-1 ring-rose-100' : 'border-slate-200'
                              }`}
                            />
                            {formErrors.fullName && <p className="text-[10px] text-rose-500 mt-1">{formErrors.fullName}</p>}
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-mono">Organization Name</label>
                            <input 
                              type="text" 
                              name="organizationName"
                              value={formData.organizationName}
                              onChange={handleInputChange}
                              placeholder="e.g. Nayak Global Foundation" 
                              className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-forest ${
                                formErrors.organizationName ? 'border-rose-400 ring-1 ring-rose-100' : 'border-slate-200'
                              }`}
                            />
                            {formErrors.organizationName && <p className="text-[10px] text-rose-500 mt-1">{formErrors.organizationName}</p>}
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-mono">Designation</label>
                            <input 
                              type="text" 
                              name="designation"
                              value={formData.designation}
                              onChange={handleInputChange}
                              placeholder="e.g. Senior CSR Manager / ESG Lead" 
                              className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-forest ${
                                formErrors.designation ? 'border-rose-400 ring-1 ring-rose-100' : 'border-slate-200'
                              }`}
                            />
                            {formErrors.designation && <p className="text-[10px] text-rose-500 mt-1">{formErrors.designation}</p>}
                          </div>
                        </motion.div>
                      )}

                      {formStep === 2 && (
                        <motion.div 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-3"
                        >
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-2">
                            <MapPin size={14} className="text-gold" /> Step 2: Location & Contact
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-mono">Email Address</label>
                              <input 
                                type="email" 
                                name="emailAddress"
                                value={formData.emailAddress}
                                onChange={handleInputChange}
                                placeholder="vikram@nayakfoundation.org" 
                                className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-forest ${
                                  formErrors.emailAddress ? 'border-rose-400 ring-1 ring-rose-100' : 'border-slate-200'
                                }`}
                              />
                              {formErrors.emailAddress && <p className="text-[10px] text-rose-500 mt-1">{formErrors.emailAddress}</p>}
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-mono">Mobile Number</label>
                              <input 
                                type="tel" 
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleInputChange}
                                placeholder="e.g. +91 98765 43210" 
                                className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-forest ${
                                  formErrors.mobileNumber ? 'border-rose-400 ring-1 ring-rose-100' : 'border-slate-200'
                                }`}
                              />
                              {formErrors.mobileNumber && <p className="text-[10px] text-rose-500 mt-1">{formErrors.mobileNumber}</p>}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-mono">State</label>
                              <input 
                                type="text" 
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                placeholder="Karnataka" 
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-mono">City / Taluk</label>
                              <input 
                                type="text" 
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="e.g. Hubballi" 
                                className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-forest ${
                                  formErrors.city ? 'border-rose-400 ring-1 ring-rose-100' : 'border-slate-200'
                                }`}
                              />
                              {formErrors.city && <p className="text-[10px] text-rose-500 mt-1">{formErrors.city}</p>}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {formStep === 3 && (
                        <motion.div 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-3"
                        >
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-2">
                            <Wallet size={14} className="text-gold" /> Step 3: Interest & Inquiry Detail
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-mono">Subject</label>
                              <input 
                                type="text" 
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                placeholder="e.g. Solar STEM Labs Sponsorship" 
                                className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-forest ${
                                  formErrors.subject ? 'border-rose-400 ring-1 ring-rose-100' : 'border-slate-200'
                                }`}
                              />
                              {formErrors.subject && <p className="text-[10px] text-rose-500 mt-1">{formErrors.subject}</p>}
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-mono">Interested In</label>
                              <select 
                                name="interestedIn"
                                value={formData.interestedIn}
                                onChange={handleInputChange}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest bg-white"
                              >
                                <option value="CSR Partnership">CSR Partnership</option>
                                <option value="Donation">Donation</option>
                                <option value="Volunteer Opportunities">Volunteer Opportunities</option>
                                <option value="Media Inquiry">Media Inquiry</option>
                                <option value="General Inquiry">General Inquiry</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-mono">Detailed Brief Proposal Message</label>
                            <textarea 
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              rows={4}
                              placeholder="Describe your corporate allocation guidelines, targeted CSR funding brackets, audit schedules, or regional criteria..." 
                              className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-forest font-sans leading-normal ${
                                formErrors.message ? 'border-rose-400 ring-1 ring-rose-100' : 'border-slate-200'
                              }`}
                            />
                            {formErrors.message && <p className="text-[10px] text-rose-500 mt-1">{formErrors.message}</p>}
                          </div>
                        </motion.div>
                      )}

                      {/* Live Integration Logs console if submitting */}
                      {submittingInquiry && (
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[10px] text-emerald-400 space-y-1.5 shadow-inner my-4">
                          <p className="text-[8px] uppercase text-slate-500 border-b border-slate-800 pb-1 font-bold">LIVE API INTEGRATION LOGGER</p>
                          {integrationLogs.map((log, i) => (
                            <div key={i} className="flex gap-2 items-start">
                              <span className="text-amber-500 select-none">▶</span>
                              <span className="text-slate-300">{log}</span>
                            </div>
                          ))}
                          <div className="w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin inline-block mt-2" />
                        </div>
                      )}

                      {/* Form Navigation Buttons */}
                      <div className="flex gap-4 pt-3 border-t border-slate-100 dark:border-zinc-800 mt-4">
                        {formStep > 1 && (
                          <button
                            type="button"
                            onClick={triggerPrevStep}
                            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <ChevronLeft size={14} />
                            <span>Back</span>
                          </button>
                        )}

                        {formStep < 3 ? (
                          <button
                            type="button"
                            onClick={triggerNextStep}
                            className="flex-1 py-3 rounded-xl text-xs font-bold text-white bg-forest hover:bg-forest-light flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>Next Step</span>
                            <ChevronRight size={14} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={executeInquirySubmit}
                            disabled={submittingInquiry}
                            className="flex-1 py-3 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer disabled:opacity-50"
                          >
                            <Send size={12} />
                            <span>TRANSMIT CSR INQUIRY</span>
                          </button>
                        )}
                      </div>

                      <p className="text-[9px] text-slate-400 font-mono text-center flex items-center justify-center gap-1 pt-1">
                        <ShieldCheck size={11} className="text-emerald-500" /> Secure SSL verification active. CRM pipeline is real-time.
                      </p>

                    </form>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: DEPARTMENT CONTACTS SECTION */}
      <section className="py-24 px-4 max-w-7xl mx-auto text-left" id="department-contacts">
        <div className="space-y-16">
          <div className="space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-400 font-bold font-mono">SPECIFIC ENDPOINTS</span>
            <h2 className="font-display font-black text-2xl md:text-4xl tracking-tight">Connect With The Right Team</h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-2xl">
              Avoid routing delays. Contact our highly specialized departments directly for corporate collaborations, donor ledgers, media kits, or operative updates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.map((dept) => (
              <div 
                key={dept.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 ${
                  highContrast 
                    ? 'bg-black border-2 border-white text-white' 
                    : 'bg-white border-slate-200/60 shadow-md shadow-slate-100/30'
                }`}
              >
                <div className="space-y-4">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 inline-flex">
                    <dept.icon size={22} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white font-display leading-tight">{dept.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{dept.description}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                    <span>Email:</span>
                    <a href={`mailto:${dept.email}`} className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline">{dept.email}</a>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Phone line:</span>
                    <span className="font-bold">{dept.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: INTERACTIVE WHATSAPP HELPLINE BANNER */}
      <section className="relative w-full py-20 bg-slate-950 text-white overflow-hidden px-4" id="whatsapp-helpline">
        <div 
          className="absolute inset-0 z-0 opacity-15 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1600')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-10" />

        <div className="relative z-20 max-w-4xl mx-auto space-y-6 text-center">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            LIVE DESK HELPLINE
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-extrabold tracking-tight">Need Immediate Assistance?</h2>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
            Need real-time status of your donation, soil health card verification, or volunteer orientation schedules? Contact our regional Hubballi officers instantly on WhatsApp for expedited responses.
          </p>
          <div className="flex justify-center pt-2">
            <a 
              href="https://wa.me/917676376221?text=Hello%20Raita%20Mitra%20Social%20Trust"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 rounded-full text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-xl shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare size={14} />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 6: SERVICE AREA SECTION - OPERATIONAL DISTRICTS WITH HOVER STATISTICS */}
      <section className="py-24 px-4 bg-slate-100 dark:bg-zinc-950 border-y border-slate-200/40" id="operational-presence">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-400 font-bold font-mono">REGIONAL COVERAGE</span>
            <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">Operational Presence Across Karnataka</h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Hover or tap on any active district below to audit our regional farming households, local cooperative units, and voluntary field coverage statistics.
            </p>
          </div>

          {/* Interactive Districts Grid Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Districts Grid Board (7 cols) */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">⚡ ACTIVE DISTRICTS REGISTRATION MATRIX</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {KARNATAKA_DISTRICTS.map((dist, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredDistrict(dist)}
                    onClick={() => setHoveredDistrict(dist)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                      hoveredDistrict?.name === dist.name
                        ? 'bg-emerald-950 text-white border-emerald-500 shadow-lg shadow-emerald-950/20 scale-102'
                        : highContrast
                          ? 'bg-black border-2 border-white text-white'
                          : 'bg-white border-slate-200/60 hover:bg-emerald-50 hover:border-emerald-300 text-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">{dist.region}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <h4 className="text-xs font-extrabold font-display leading-tight">{dist.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 font-sans">{dist.families} Families</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics Detail Card (4 cols) */}
            <div className="lg:col-span-4">
              <div className={`p-6 md:p-8 rounded-3xl border text-left space-y-6 ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/60 shadow-xl'
              }`}>
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-zinc-800 pb-4">
                  <Map size={18} className="text-gold" />
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-extrabold">DISTRICT AUDIT SHEETS</h3>
                </div>

                <AnimatePresence mode="wait">
                  {hoveredDistrict ? (
                    <motion.div
                      key={hoveredDistrict.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-amber-500 font-extrabold uppercase tracking-widest">{hoveredDistrict.region} karnataka</span>
                        <h4 className="text-base font-black text-slate-900 dark:text-white font-display leading-none">{hoveredDistrict.name} District</h4>
                      </div>

                      <div className="space-y-3 pt-2 text-xs font-sans">
                        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-zinc-800">
                          <span className="text-slate-400">Primary Beneficiaries:</span>
                          <span className="font-bold text-slate-800 dark:text-white">{hoveredDistrict.families} Farming Households</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-zinc-800">
                          <span className="text-slate-400">Cooperative Units:</span>
                          <span className="font-bold text-slate-800 dark:text-white">{hoveredDistrict.centers} Field Centers</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-slate-400">Helpline Status:</span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                            {hoveredDistrict.status}
                          </span>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          setFormData(prev => ({ ...prev, city: hoveredDistrict.name, subject: `Regional CSR in ${hoveredDistrict.name}` }));
                          scrollSection('contact-split-form');
                        }}
                        className="w-full py-2.5 rounded-xl text-[11px] font-mono font-extrabold bg-emerald-950 text-white hover:bg-emerald-900 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Sponsor {hoveredDistrict.name} District</span>
                        <ArrowUpRight size={12} />
                      </button>
                    </motion.div>
                  ) : (
                    <div className="text-center py-12 text-slate-400 space-y-2">
                      <p className="text-xs">Hover over or select any district to display specific regional field metrics.</p>
                      <span className="inline-block text-[10px] font-mono text-amber-500 font-bold uppercase">12 Districts Active</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: APPOINTMENT SECTION - CALENDAR MEETING SCHEDULER */}
      <section className="py-24 px-4 max-w-7xl mx-auto" id="book-alignment-meeting">
        <div className="space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-400 font-bold font-mono">SECURE INTEGRATIONS</span>
            <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">Book A Meeting</h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-2xl mx-auto">
              Schedule a virtual consultations or physical field audit briefing with our Managing Board. Connects directly to Google Calendar, Zoom, and Google Meet.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            
            {/* Step 1: Config (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">📅 MEETING CRITERIA SETUP</span>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 font-mono">Meeting Objective</label>
                  <select 
                    value={selectedMeetingType}
                    onChange={(e) => setSelectedMeetingType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest bg-white text-xs"
                  >
                    <option value="CSR Consultation">CSR Consultation (Partnership Setup)</option>
                    <option value="Volunteer Orientation">Volunteer Orientation (Chapter Leads)</option>
                    <option value="Partnership Discussion">Partnership Discussion (NGO alliances)</option>
                    <option value="General Meeting">General Meeting (Trustee alignment)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 font-mono">Virtual Platform</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Google Meet", "Zoom", "Calendly Link"].map((plat) => (
                      <button
                        key={plat}
                        onClick={() => setSelectedPlatform(plat)}
                        className={`py-2 rounded-xl text-[10px] font-mono font-bold border transition-all cursor-pointer ${
                          selectedPlatform === plat
                            ? 'bg-emerald-950 text-white border-emerald-500'
                            : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        {plat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-500 leading-normal flex gap-3">
                  <Video size={18} className="text-gold shrink-0 mt-0.5" />
                  <p>Our secure meeting invitations automatically issue authentic Zoom or Meet links with calendar files (.ics) once authorized.</p>
                </div>
              </div>
            </div>

            {/* Step 2: Interactive Date Picker & Confirmer (7 cols) */}
            <div className="lg:col-span-7">
              <div className={`p-6 rounded-3xl border ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/60 shadow-lg'
              }`}>
                
                <AnimatePresence mode="wait">
                  {bookingConfirmed ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10 space-y-5"
                    >
                      <div className="p-3.5 rounded-full bg-emerald-500/10 text-emerald-500 inline-flex">
                        <CheckCircle size={32} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-white">Alignment Consultation Requested!</h4>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto">
                          A direct invitation request has been logged. An email containing authentication credentials has been delivered.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900 border text-left text-xs font-mono max-w-md mx-auto space-y-1.5">
                        <p className="text-[10px] text-slate-400 font-bold border-b pb-1">APPOINTMENT META SUMMARY</p>
                        <p className="flex justify-between"><span>Meeting Type:</span> <strong className="text-slate-800 dark:text-white">{selectedMeetingType}</strong></p>
                        <p className="flex justify-between"><span>Scheduled Date:</span> <strong className="text-slate-800 dark:text-white">July {selectedDate}, 2026</strong></p>
                        <p className="flex justify-between"><span>Time Slot:</span> <strong className="text-slate-800 dark:text-white">{selectedTimeSlot}</strong></p>
                        <p className="flex justify-between"><span>Secure Platform:</span> <strong className="text-emerald-600">{selectedPlatform}</strong></p>
                      </div>

                      <button 
                        onClick={() => setBookingConfirmed(false)}
                        className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-forest hover:bg-forest-light cursor-pointer"
                      >
                        Reschedule / Modify Meeting
                      </button>
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">SELECT DATE &amp; SLOT (JULY 2026)</h4>
                        <span className="text-[10px] text-emerald-600 font-mono font-bold flex items-center gap-1">
                          <Clock size={11} /> Hubballi Standard Time (IST)
                        </span>
                      </div>

                      {/* Micro Calendar Mockup Grid */}
                      <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-mono">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                          <span key={d} className="text-slate-400 font-extrabold">{d}</span>
                        ))}
                        {/* Empty spacer blocks */}
                        <span className="opacity-20">28</span>
                        <span className="opacity-20">29</span>
                        <span className="opacity-20">30</span>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((date) => (
                          <button
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={`p-2 rounded-lg font-bold transition-all cursor-pointer ${
                              selectedDate === date
                                ? 'bg-forest text-white shadow shadow-forest/20'
                                : 'bg-slate-50 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-zinc-800'
                            }`}
                          >
                            {date}
                          </button>
                        ))}
                      </div>

                      {/* Time Slots selector */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono text-left">Available Time Slots</label>
                        <div className="grid grid-cols-4 gap-2 text-[10px] font-mono">
                          {["10:00 AM", "11:00 AM", "12:30 PM", "2:00 PM", "3:30 PM", "4:30 PM"].map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`py-2 rounded-xl font-bold border transition-all cursor-pointer ${
                                selectedTimeSlot === slot
                                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                                  : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={executeAppointmentBooking}
                        disabled={bookingLoading}
                        className="w-full py-3 rounded-xl text-xs font-mono font-extrabold text-white bg-forest hover:bg-forest-light flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {bookingLoading ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>SYNCING CALENDAR...</span>
                          </>
                        ) : (
                          <>
                            <Calendar size={14} />
                            <span>CONFIRM MEETING VIA {selectedPlatform.toUpperCase()}</span>
                          </>
                        )}
                      </button>

                    </div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8: EMEDDED GOOGLE MAPS SECTION */}
      <section className="py-24 bg-slate-100 dark:bg-zinc-950 border-y border-slate-200/40 text-left" id="google-maps-view">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-400 font-bold font-mono">GEOGRAPHICAL GPS COORDINATES</span>
              <h2 className="font-display font-black text-2xl md:text-4xl tracking-tight">Find Us In Hubballi</h2>
              <p className="text-xs md:text-sm text-slate-500 max-w-xl">
                Our core administrative secretariat is headquartered inside the Pride Icon complex, situated on Gokul Road, Hubballi.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-500">📍 latitude: 15.3621° N</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-500">📍 longitude: 75.1245° E</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Embedded Iframe Map (8 cols) */}
            <div className="lg:col-span-8 h-[400px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white relative">
              <iframe 
                src="https://maps.google.com/maps?q=Pride%20Icon,%20Gokul%20Road,%20Hubballi&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title="Raita Mitra Headquarters Pride Icon Location Map"
              />
            </div>

            {/* Landmarks & Directions Guide (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div className={`p-6 rounded-3xl border h-full flex flex-col justify-between space-y-6 ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/60 shadow-lg'
              }`}>
                <div className="space-y-4 text-left">
                  <h4 className="text-xs font-mono uppercase text-slate-400 font-extrabold flex items-center gap-1.5 border-b pb-3">
                    <Globe size={14} className="text-gold" /> Nearby Landmarks Guide
                  </h4>
                  <div className="space-y-3">
                    {LANDMARKS.map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-xs font-sans">
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white">{item.name}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{item.type}</span>
                        </div>
                        <span className="font-mono text-emerald-700 dark:text-emerald-400 font-extrabold">{item.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 space-y-2 text-xs">
                  <p className="text-[10px] text-slate-400 leading-normal">
                    ✈️ Airport connectivity: Taxi services operate regularly from Hubli Domestic Airport (3.5 KM) direct to Gokul Road Pride Icon.
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Pride%20Icon,%20Gokul%20Road,%20Hubballi"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl text-[10px] font-mono font-black text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>GET DIRECTIONS IN GOOGLE MAPS</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9: FAQ SECTION */}
      <section className="py-24 px-4 max-w-4xl mx-auto text-left" id="contact-faqs">
        <div className="space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-400 font-bold font-mono">RESOLVING BLOCKS</span>
            <h2 className="font-display font-black text-2xl md:text-4xl tracking-tight text-center">Frequently Asked Questions</h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto text-center">
              Have instant queries? Review our authenticated policy declarations regarding CSR alignments and field tracking.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  openFaqIdx === index 
                    ? 'bg-emerald-50/20 border-emerald-400' 
                    : highContrast 
                      ? 'bg-black border-2 border-white' 
                      : 'bg-white border-slate-200/60 shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === index ? null : index)}
                  className="w-full p-5 flex justify-between items-center text-xs font-bold text-slate-800 dark:text-white hover:text-emerald-700 text-left cursor-pointer"
                >
                  <span className="font-sans font-extrabold pr-4">{faq.q}</span>
                  <ChevronDown size={16} className={`transition-transform shrink-0 ${openFaqIdx === index ? 'rotate-180 text-emerald-600' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {openFaqIdx === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-5 pt-0 border-t border-slate-100 dark:border-zinc-800/40 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: STAY CONNECTED - MODERN CARDS WITH LIVE FEED SIMULATOR */}
      <section className="py-24 px-4 bg-slate-900 text-white text-left" id="stay-connected-social">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">DIGITAL CHANNELS</span>
            <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">Stay Connected</h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Audit our live updates, view field action reels, and read weekly diagnostic reviews across various social media platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Live Feed Container (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">📡 RECENT TRUST HIGHLIGHTS FEED (LIVE COMPONENT)</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SOCIAL_POSTS.map((post, idx) => (
                  <div key={idx} className="p-5 rounded-3xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="px-2 py-0.5 rounded text-[8px] font-mono font-bold bg-amber-400/10 text-amber-400 uppercase tracking-wider">{post.platform}</span>
                        <span className="text-[9px] font-mono text-slate-500">{post.date}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                        {post.text}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-900 flex justify-between text-[10px] font-mono text-slate-500">
                      <span>👍 {post.likes} Likes</span>
                      <span>💬 {post.comments} Comments</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription Glass Card (4 cols) */}
            <div className="lg:col-span-4">
              <div className="p-6 md:p-8 rounded-3xl border border-slate-800 bg-slate-950/50 backdrop-blur-md text-left space-y-6 shadow-2xl" id="newsletter-form-container">
                <div className="space-y-1">
                  <h3 className="text-sm font-black font-display text-white">Subscribe To Our Updates</h3>
                  <p className="text-xs text-slate-400 leading-normal">Subscribe to get verified quarterly audited CSR summaries and soil diagnostics logs directly in your inbox.</p>
                </div>

                <AnimatePresence mode="wait">
                  {newsletterSubscribed ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2 py-6"
                    >
                      <CheckCircle className="text-emerald-400 mx-auto" size={24} />
                      <p className="text-xs font-bold text-white">Successfully Subscribed!</p>
                      <p className="text-[10px] text-slate-400 leading-normal">An authentication confirmation mail has been dispatched.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={triggerNewsletter} className="space-y-3 text-xs">
                      <div>
                        <input 
                          type="text"
                          required
                          value={newsletterName}
                          onChange={(e) => setNewsletterName(e.target.value)}
                          placeholder="Your Name / Institution"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <input 
                          type="email"
                          required
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="corporate@domain.org"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl text-xs font-mono font-black text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
                      >
                        SUBSCRIBE DIGEST
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 11: TESTIMONIALS CAROUSEL */}
      <section className="py-24 px-4 max-w-5xl mx-auto" id="contact-testimonials">
        <div className="space-y-12">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">TRUST COMPLIANCE REVIEWS</span>
            <h2 className="font-display font-black text-2xl md:text-3xl tracking-tight">What Our Stakeholders Say</h2>
          </div>

          <div className="relative p-6 md:p-10 rounded-3xl border border-slate-200/60 bg-white/70 shadow-lg text-left space-y-6">
            <div className="space-y-3 relative">
              <span className="text-6xl font-serif text-emerald-100 dark:text-zinc-800 leading-none select-none absolute -top-8 -left-4">“</span>
              <span className="px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                {TESTIMONIALS[activeTestimonial].type}
              </span>
              <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 italic font-sans leading-relaxed relative z-10">
                {TESTIMONIALS[activeTestimonial].quote}
              </p>
            </div>

            <div className="pt-4 border-t flex justify-between items-center text-xs font-sans">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white">{TESTIMONIALS[activeTestimonial].author}</h4>
                <p className="text-[10px] text-slate-400">{TESTIMONIALS[activeTestimonial].role}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTestimonial(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border cursor-pointer"
                  aria-label="Prev testimonial"
                >
                  <ChevronLeft size={14} />
                </button>
                <button 
                  onClick={() => setActiveTestimonial(prev => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: GALLERY PREVIEW SECTION */}
      <section className="py-24 px-4 bg-slate-100 dark:bg-zinc-950 border-y border-slate-200/40 text-left" id="gallery-masonry-preview">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">LIVED ACTION WORKSHOPS</span>
            <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight text-center">Life At Raita Mitra Social Trust</h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto text-center">
              Discover active field campaigns, tree planting, pediatric wellness diagnostics, and IT smart school sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {GALLERY_PREVIEWS.map((item, index) => (
              <div key={index} className="group relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-square shadow-md border border-white">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block mb-0.5">🌾 Raita Mitra Action</span>
                  <h4 className="text-xs font-bold leading-tight">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13: HELPLINE TICKETING SYSTEM & CHATBOT TRIGGER PANELS */}
      <section className="py-24 px-4 max-w-7xl mx-auto text-left" id="administrative-helpline-desk">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Support Ticket Submission form (7 cols) */}
          <div className="lg:col-span-7">
            <div className={`p-6 md:p-8 rounded-3xl border text-left space-y-6 ${
              highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200/60 shadow-xl'
            }`} id="support-ticketing-system">
              
              <div className="border-b pb-4">
                <p className="text-[10px] font-mono text-slate-400 font-extrabold uppercase">SECURE COMPLIANCE DESK</p>
                <h3 className="text-base font-extrabold font-display text-slate-800 dark:text-white mt-1">Lodge Helpline Ticketing Brief</h3>
                <p className="text-xs text-slate-400 mt-0.5">Registered farmers, corporate auditors, and CSR partners can log instant operational tickets.</p>
              </div>

              {ticketSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                  <CheckCircle size={16} />
                  <span>Ticket successfully catalogued and queued for CSR board assignment!</span>
                </div>
              )}

              <form onSubmit={createTicket} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1.5">Ticket Subject</label>
                    <input 
                      type="text" 
                      required
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      placeholder="e.g. Save Soil diagnostic shipment inquiry" 
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1.5">Administrative Category</label>
                    <select 
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                    >
                      <option value="Helpline Assistance">Helpline Assistance</option>
                      <option value="CSR Allocation Audits">CSR Allocation Audits</option>
                      <option value="Volunteer Coordination">Volunteer Coordination</option>
                      <option value="Soil Labs Diagnostics">Soil Labs Diagnostics</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1.5">Message / Issue Details</label>
                  <textarea 
                    rows={3}
                    required
                    value={ticketMsg}
                    onChange={(e) => setTicketMsg(e.target.value)}
                    placeholder="Describe specific timelines, dispatch reference numbers, taluk centers, or audit ledger criteria..." 
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                  />
                </div>

                <button 
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-mono text-xs font-black text-white bg-forest hover:bg-forest-light transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send size={12} />
                  <span>LOG ADMINISTRATIVE TICKET</span>
                </button>
              </form>
            </div>
          </div>

          {/* Active Tickets Tracker (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">📊 REAL-TIME TICKETS MONITOR (LIVE DEMO)</span>
            
            <div className="space-y-3">
              {activeTickets.map((tkt, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-200/60 bg-white text-xs text-left space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] text-slate-400">{tkt.id}</span>
                    <span className="font-mono text-[9px] text-slate-500">{tkt.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 font-display leading-tight">{tkt.subject}</h4>
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-slate-400">{tkt.category}</span>
                    <span className={`px-2 py-0.5 rounded font-extrabold uppercase ${
                      tkt.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800 animate-pulse'
                    }`}>
                      {tkt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950 text-white text-left space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-amber-400 font-bold uppercase tracking-wider block">🗣️ CHAT BOT COMPANION</span>
                <h4 className="text-xs font-bold font-display">Need instant answers without filing a ticket?</h4>
                <p className="text-[11px] text-slate-300 leading-normal font-sans">
                  MitraAI can assist you with directions, office hours, volunteering registration steps, and Smt. Anusha Mulimani's administrative emails instantly.
                </p>
              </div>
              <button 
                onClick={() => setChatOpen(true)}
                className="w-full py-2.5 rounded-xl text-xs font-mono font-black text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare size={13} />
                <span>LAUNCH CHATBOT DESK</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 14: EMERGENCY SUPPORT BANNER / CALL TO ACTION */}
      <section className="relative w-full py-24 bg-slate-950 text-white text-center overflow-hidden px-4" id="emergency-support-cta">
        <div 
          className="absolute inset-0 z-0 opacity-15 bg-cover bg-center mix-blend-overlay scale-102"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-10" />

        <div className="relative z-20 max-w-4xl mx-auto space-y-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-amber-400/10 text-amber-400 border border-amber-400/30">
            <HeartHandshake size={11} />
            ACT TODAY FOR RURAL KARNATAKA
          </span>

          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
            Together We Can Create Lasting Impact
          </h2>

          <p className="text-slate-300 text-xs md:text-sm lg:text-base max-w-2xl mx-auto leading-relaxed">
            Reach out to us and become part of the journey toward sustainable development. Together we can fund solar grid infrastructure, deploy STEM textbooks, or validate carbon capture soil health indexes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
            <button 
              onClick={() => {
                setFormData(prev => ({ ...prev, interestedIn: 'CSR Partnership', subject: 'Corporate Strategic Alliance Brief' }));
                setFormStep(1);
                scrollSection('contact-split-form');
              }}
              className="w-full py-3.5 rounded-full text-xs font-mono font-black text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
            >
              PARTNER WITH US
            </button>
            <button 
              onClick={() => {
                // Navigate to donate page
                window.location.hash = '#/donate';
              }}
              className="w-full py-3.5 rounded-full text-xs font-mono font-black text-white bg-forest hover:bg-forest-light transition-colors border border-emerald-500/30 cursor-pointer"
            >
              DONATE NOW
            </button>
            <button 
              onClick={() => {
                window.location.hash = '#/volunteer';
              }}
              className="w-full py-3.5 rounded-full text-xs font-mono font-black text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 transition-colors border border-slate-800 cursor-pointer"
            >
              BECOME A VOLUNTEER
            </button>
          </div>
        </div>
      </section>

      {/* LIVE CHAT DRAWER */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] rounded-3xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-2xl z-50 overflow-hidden flex flex-col justify-between"
            id="mitra-chatbot-drawer"
          >
            {/* Header */}
            <div className="p-4 bg-emerald-950 text-white flex justify-between items-center">
              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-full bg-emerald-900 border border-emerald-500 flex items-center justify-center font-bold text-xs">MA</div>
                <div>
                  <h4 className="text-xs font-extrabold font-display leading-tight">MitraAI Support Chatbot</h4>
                  <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Node Desk
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="p-1 rounded hover:bg-emerald-900 transition-colors text-slate-300 hover:text-white cursor-pointer font-bold text-xs"
              >
                Close ✕
              </button>
            </div>

            {/* Chat message content list */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-slate-50 dark:bg-zinc-900 text-xs">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col max-w-[80%] ${
                    msg.sender === 'user' ? 'ml-auto text-right' : 'mr-auto text-left'
                  }`}
                >
                  <span className="text-[8px] text-slate-400 mb-0.5 font-mono">{msg.sender === 'user' ? 'You' : 'MitraAI'} • {msg.time}</span>
                  <div className={`p-3 rounded-2xl ${
                    msg.sender === 'user' 
                      ? 'bg-forest text-white rounded-tr-none' 
                      : 'bg-white dark:bg-zinc-950 text-slate-800 dark:text-slate-100 border rounded-tl-none'
                  }`}>
                    <p className="leading-relaxed font-sans">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={sendChatMessage} className="p-3 border-t border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex gap-2">
              <input 
                type="text"
                required
                value={userChatMsg}
                onChange={(e) => setUserChatMsg(e.target.value)}
                placeholder="Ask about office hours, address, CSR..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 outline-none text-xs focus:ring-1 focus:ring-emerald-500"
              />
              <button 
                type="submit"
                className="p-2 px-4 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Send
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
