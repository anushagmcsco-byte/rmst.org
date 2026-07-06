import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartHandshake, 
  GraduationCap, 
  Users, 
  Lightbulb, 
  Briefcase, 
  Laptop, 
  Microscope, 
  Megaphone, 
  BookOpen, 
  Clock, 
  Award, 
  Medal, 
  Heart, 
  FileText, 
  Filter, 
  MessageCircle, 
  ClipboardCheck, 
  BadgeCheck, 
  Handshake, 
  Upload, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  MapPin, 
  Building2, 
  ArrowRight, 
  Check, 
  Plus, 
  Sparkles, 
  Send, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Youtube, 
  AlertCircle, 
  FileDown, 
  User, 
  CheckCircle2, 
  Sliders, 
  BrainCircuit, 
  ShieldCheck, 
  Trash2,
  Bookmark,
  X
} from 'lucide-react';

// Interfaces
interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // Full-time, Internship, Contract
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
}

interface TeamMember {
  name: string;
  role: string;
  experience: string;
  photo: string;
  quote: string;
  impactStory: string;
}

interface CareersProps {
  setActivePage: (page: string) => void;
  highContrast?: boolean;
}

export default function Careers({ setActivePage, highContrast = false }: CareersProps) {
  // --- States ---
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  
  // Custom job management (unlimited job postings through CMS simulator)
  const [jobs, setJobs] = useState<JobOpening[]>([
    {
      id: 'job-1',
      title: 'Rural Program Coordinator',
      department: 'Programs',
      location: 'Hubballi, Karnataka',
      type: 'Full-time',
      experience: '2-4 Years',
      salary: '₹4.5 - ₹6.0 LPA',
      description: 'Lead grassroots execution of sustainable agriculture and women self-help circle programs in Dharwad and Gadag districts.',
      requirements: [
        'Master’s degree in Social Work (MSW), Agriculture, Rural Development, or related disciplines.',
        'Fluency in Kannada and English is mandatory.',
        'Willingness to travel extensively to rural communities.',
        'Experience coordinating with local government stakeholders.'
      ]
    },
    {
      id: 'job-2',
      title: 'Digital & AI Skill Lab Mentor',
      department: 'Technology',
      location: 'Belagavi, Karnataka',
      type: 'Full-time',
      experience: '1-3 Years',
      salary: '₹3.6 - ₹5.0 LPA',
      description: 'Train rural youth in foundational digital skills, coding literacy, and AI applications to bridge the digital divide.',
      requirements: [
        'B.Tech/BCA/B.Sc in Computer Science or equivalent field experience.',
        'Strong knowledge of digital workflows, basic frontend, and AI tools (ChatGPT, Gemini API, Canva).',
        'Passion for teaching and community development.',
        'Ability to translate technical jargon into simple Kannada/English.'
      ]
    },
    {
      id: 'job-3',
      title: 'Impact Monitoring & Evaluation Associate',
      department: 'Monitoring & Evaluation',
      location: 'Hubballi, Karnataka',
      type: 'Full-time',
      experience: '2-5 Years',
      salary: '₹4.0 - ₹5.5 LPA',
      description: 'Design and implement scientific monitoring frameworks to measure project effectiveness and write comprehensive audit reports.',
      requirements: [
        'Degree in Statistics, Economics, Social Sciences, or Data Science.',
        'Proficiency in Excel, SPSS, or mobile data collection platforms (KoboToolbox, ODK).',
        'Strong report-writing and narrative formulation skills.',
        'Detail-oriented approach to financial and social audits.'
      ]
    },
    {
      id: 'job-4',
      title: 'Donor Relations & Communications Lead',
      department: 'Communications',
      location: 'Bengaluru / Hybrid',
      type: 'Full-time',
      experience: '3-6 Years',
      salary: '₹6.0 - ₹8.0 LPA',
      description: 'Manage institutional and retail fundraising campaigns, draft CSR brochures, and tell powerful impact stories to corporate committees.',
      requirements: [
        'Degree in Public Relations, Journalism, Marketing, or Business Development.',
        'Exceptional written and oral presentation skills in English.',
        'Prior experience in fundraising, donor management, or CSR sales.',
        'Knowledge of Canva, Mailchimp, and CRM systems.'
      ]
    },
    {
      id: 'job-5',
      title: 'Finance & Compliance Executive',
      department: 'Finance',
      location: 'Hubballi, Karnataka',
      type: 'Full-time',
      experience: '3-5 Years',
      salary: '₹5.0 - ₹7.0 LPA',
      description: 'Maintain strict accounts, coordinate quarterly independent audits, and draft MCA CSR utilization certificates for corporate partners.',
      requirements: [
        'B.Com/M.Com/Inter-CA with deep understanding of NGO finances.',
        'Familiarity with Section 80G, 12A, CSR-1, and NGO Darpan reporting guidelines.',
        'Hands-on expertise in Tally Prime, GST, and TDS filings.',
        'High degree of transparency and detail orientation.'
      ]
    },
    {
      id: 'job-6',
      title: 'Agricultural Extension Officer',
      department: 'Programs',
      location: 'Haveri, Karnataka',
      type: 'Full-time',
      experience: '1-3 Years',
      salary: '₹3.5 - ₹4.8 LPA',
      description: 'Advise smallholder farmers on climate-resilient agriculture, drip irrigation, and sustainable crop cycles on the field.',
      requirements: [
        'B.Sc in Agriculture, Horticulture, or Agronomy.',
        'Excellent practical understanding of Karnataka rainfed agricultural constraints.',
        'Strong relational skills to communicate with marginal farming households.',
        'Familiarity with organic farming formulations.'
      ]
    }
  ]);

  // ATS Multi-Step Form States
  const [formStep, setFormStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    linkedin: '',
    position: 'Rural Program Coordinator',
    experience: '1-3 Years',
    qualification: 'Post Graduate',
    resumeName: '',
    coverLetter: '',
    message: ''
  });
  const [resumeFileSelected, setResumeFileSelected] = useState<boolean>(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [isAtsAnalyzing, setIsAtsAnalyzing] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Scalability Features Simulation State
  const [hrFeatures, setHrFeatures] = useState({
    enableATSIntegration: true,
    enableEmployeePortal: false,
    enableJobAlerts: true,
    enableLinkedInSync: true,
    enableCandidateDashboard: false,
    enableAIResumeScreening: true
  });

  // Dynamic user job adding (CMS simulator)
  const [isAddingJob, setIsAddingJob] = useState<boolean>(false);
  const [newJob, setNewJob] = useState({
    title: '',
    department: 'Programs',
    location: 'Hubballi, Karnataka',
    type: 'Full-time',
    experience: '0-2 Years',
    salary: 'Negotiable',
    description: '',
    requirements: ''
  });

  // Carousel index for Testimonials
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState<number>(0);

  // Open FAQ Accordion tracking
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  // --- Static/Mock Data defined inside page ---
  const TESTIMONIALS = [
    {
      name: "Suresh Shivasangappa",
      role: "Senior Program Coordinator",
      exp: "4 Years at Trust",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      quote: "Working here has given my technical knowledge a real-world purpose. Helping 500+ marginal farmers adopt climate-smart drip irrigation has been the most fulfilling chapter of my professional life.",
      impact: "Helped restore 120+ acres of dry soil in Gadag district."
    },
    {
      name: "Deepa Patil",
      role: "Lead Mentor, AI Skill Labs",
      exp: "2 Years at Trust",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      quote: "Seeing young village girls who never used a computer code their first web pages using AI prompts is absolutely magical. The Trust's culture is dynamic, supportive, and extremely fast-paced.",
      impact: "Trained 350+ rural young women in computational skills."
    },
    {
      name: "Rohan Gowda",
      role: "M&E Associate",
      exp: "3 Years at Trust",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      quote: "Transparency is not just a buzzword here. We mathematically audit where every single rupee is spent and compile detailed social impact matrices for our corporate CSR partners quarterly.",
      impact: "Spearheaded MCA-compliant audits for 14 CSR programs."
    }
  ];

  const FAQS = [
    {
      q: "How can I apply for jobs?",
      a: "You can apply directly using our ATS-Ready Multi-Step application form at the bottom of this page. Select the position you are applying for, fill in your credentials, and upload your resume in PDF/DOCX format. Our HR team reviews every submission within 7-10 business days."
    },
    {
      q: "Do you offer internships?",
      a: "Yes! We run structured 2-month and 6-month social impact internships across Programs, Digital/AI Labs, Rural Research, and Communications. Interns gain direct rural field experience and receive formal training from seasoned sector experts."
    },
    {
      q: "Can volunteers transition into careers?",
      a: "Absolutely. Many of our full-time project coordinators and program leads started their journeys as dedicated volunteers. We highly prioritize internal talent who are already deeply familiar with Raita Mitra's on-ground ethics and rural communities."
    },
    {
      q: "Is remote work supported?",
      a: "While roles in Digital Labs and Programs require extensive physical field presence in rural Karnataka, several research, communications, and strategy-focused positions are offered in hybrid or fully remote formats."
    },
    {
      q: "How long does recruitment take?",
      a: "Our standard recruitment cycle takes 2 to 3 weeks. It includes initial resume scanning, a phone screening round, a brief case-study assessment, and a final personal panel interview (online or in-person at Hubballi)."
    }
  ];

  // Filtering Job Board
  const filteredJobs = jobs.filter(job => {
    const matchesDept = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const toggleFaq = (idx: number) => {
    setOpenFaqs(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Simulated ATS resume scan
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setFormData(prev => ({ ...prev, resumeName: fileName }));
      setResumeFileSelected(true);
      
      // Automatically trigger an "AI ATS Screen simulation" for interactive engagement
      setIsAtsAnalyzing(true);
      setTimeout(() => {
        // Calculate a simulated high-quality ATS score based on matching terms
        const isMatch = fileName.toLowerCase().includes('resume') || fileName.toLowerCase().includes('cv');
        const score = isMatch ? Math.floor(Math.random() * 15) + 81 : Math.floor(Math.random() * 20) + 70;
        setAtsScore(score);
        setIsAtsAnalyzing(false);
      }, 1500);
    }
  };

  const handleApplyNextStep = () => {
    if (formStep < 3) {
      setFormStep(prev => prev + 1);
    }
  };

  const handleApplyPrevStep = () => {
    if (formStep > 1) {
      setFormStep(prev => prev - 1);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all mandatory fields before submitting.");
      return;
    }
    setFormSubmitted(true);
  };

  const resetApplicationForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      city: '',
      linkedin: '',
      position: 'Rural Program Coordinator',
      experience: '1-3 Years',
      qualification: 'Post Graduate',
      resumeName: '',
      coverLetter: '',
      message: ''
    });
    setFormStep(1);
    setResumeFileSelected(false);
    setAtsScore(null);
    setFormSubmitted(false);
  };

  // Add job from CMS simulator
  const handleAddJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.description) return;

    const newJobObj: JobOpening = {
      id: `custom-job-${Date.now()}`,
      title: newJob.title,
      department: newJob.department,
      location: newJob.location,
      type: newJob.type,
      experience: newJob.experience,
      salary: newJob.salary,
      description: newJob.description,
      requirements: newJob.requirements.split(',').map(r => r.trim()).filter(Boolean)
    };

    setJobs(prev => [newJobObj, ...prev]);
    setIsAddingJob(false);
    setNewJob({
      title: '',
      department: 'Programs',
      location: 'Hubballi, Karnataka',
      type: 'Full-time',
      experience: '0-2 Years',
      salary: 'Negotiable',
      description: '',
      requirements: ''
    });
  };

  return (
    <div className={`w-full overflow-hidden ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* 1. HERO SECTION: Full Width Employer Branding Banner */}
      <section className="relative min-h-[520px] flex items-center justify-center py-20 bg-emerald-950 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200" 
            alt="Young professionals and community organizers collaborating" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-slate-900/95 to-emerald-950 z-0" />
        {/* SVG Grid Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 mb-4 text-xs font-mono text-emerald-400">
            <button onClick={() => setActivePage('home')} className="hover:underline hover:text-white transition-colors">Home</button>
            <ChevronRight size={12} />
            <span className="text-white/70">Careers &amp; Opportunities</span>
          </div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4"
          >
            Build A Career With <span className="text-gold">Purpose</span>
          </motion.h1>

          {/* SubHeadline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm md:text-lg text-emerald-100/90 max-w-3xl mx-auto mb-10 leading-relaxed font-sans"
          >
            Join a mission-driven organization creating sustainable impact across Karnataka through agriculture, women empowerment, digital/AI labs, climate action, and rural livelihoods.
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="#openings-section" 
              className="px-6 py-3 bg-gold hover:bg-yellow-500 text-slate-950 font-semibold text-sm rounded-xl transition-all shadow-lg shadow-gold/20 flex items-center gap-2"
            >
              <Briefcase size={16} />
              <span>View Open Positions</span>
            </a>
            <a 
              href="#apply-section" 
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 hover:text-white text-white font-semibold text-sm rounded-xl transition-all border border-emerald-500/30 flex items-center gap-2"
            >
              <FileText size={16} />
              <span>Apply Now</span>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-24">
        
        {/* 2. WHY JOIN SECTION: Work with Us Premium Glass Cards */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Employer Value Proposition</span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-slate-900">Why Work With Us</h2>
            <p className="text-sm md:text-base text-slate-600">
              We offer more than just jobs—we offer a lifetime platform to incubate change, learn from veterans, and directly elevate rural communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Meaningful Impact", icon: HeartHandshake, color: "text-rose-600 bg-rose-50", desc: "Contribute to initiatives that transform rural livelihoods and empower marginalized farmers on the ground." },
              { title: "Learning & Growth", icon: GraduationCap, color: "text-emerald-600 bg-emerald-50", desc: "Develop professional execution strategies, state policy frameworks, and direct technical leadership capabilities." },
              { title: "Collaborative Culture", icon: Users, color: "text-indigo-600 bg-indigo-50", desc: "Work side-by-side with agricultural scientists, social entrepreneurs, and highly supportive, purpose-driven teams." },
              { title: "Innovation & Sustainability", icon: Lightbulb, color: "text-amber-600 bg-amber-50", desc: "Build climate-resilient water networks, localized crop calculators, and cutting-edge Digital & AI Skill Labs." }
            ].map((card, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col items-start"
              >
                <div className={`p-3 rounded-xl ${card.color} mb-5`}>
                  <card.icon size={22} />
                </div>
                <h3 className="font-display font-semibold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. CURRENT OPENINGS SECTION: Live Job Board (CMS Simulator) */}
        <section id="openings-section" className="space-y-8 scroll-mt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold">Opportunities List</span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Current Openings</h2>
              <p className="text-sm text-slate-500">
                Find your perfect matching role or create a new one. All standard jobs are fully audited.
              </p>
            </div>
            
            {/* Dynamic Custom Job Poster (CMS Simulator) Trigger */}
            <button
              onClick={() => setIsAddingJob(!isAddingJob)}
              className="px-4 py-2.5 bg-emerald-900 text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-emerald-800 transition-colors shadow-sm cursor-pointer"
            >
              <Plus size={14} />
              <span>Post New Role (CMS Simulator)</span>
            </button>
          </div>

          {/* Simulated Job Creator Modal */}
          <AnimatePresence>
            {isAddingJob && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-inner"
              >
                <form onSubmit={handleAddJobSubmit} className="space-y-4">
                  <h3 className="font-bold text-sm text-emerald-900 flex items-center gap-2">
                    <Sparkles size={14} className="text-gold" />
                    Dynamic CMS Posting Engine
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. CSR Partnership Director"
                        value={newJob.title}
                        onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 bg-white rounded-lg border text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                      <select 
                        value={newJob.department}
                        onChange={(e) => setNewJob(prev => ({ ...prev, department: e.target.value }))}
                        className="w-full px-3 py-2 bg-white rounded-lg border text-xs outline-none"
                      >
                        <option value="Programs">Programs</option>
                        <option value="Operations">Operations</option>
                        <option value="Finance">Finance</option>
                        <option value="Communications">Communications</option>
                        <option value="Technology">Technology</option>
                        <option value="Monitoring &amp; Evaluation">M&amp;E</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                      <input 
                        type="text" 
                        value={newJob.location}
                        onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 bg-white rounded-lg border text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Type</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Full-time / Internship"
                        value={newJob.type}
                        onChange={(e) => setNewJob(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full px-3 py-2 bg-white rounded-lg border text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Experience Required</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 1-2 Years / Freshers"
                        value={newJob.experience}
                        onChange={(e) => setNewJob(prev => ({ ...prev, experience: e.target.value }))}
                        className="w-full px-3 py-2 bg-white rounded-lg border text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated CTC</label>
                      <input 
                        type="text" 
                        placeholder="e.g. ₹4.0 - ₹6.0 LPA"
                        value={newJob.salary}
                        onChange={(e) => setNewJob(prev => ({ ...prev, salary: e.target.value }))}
                        className="w-full px-3 py-2 bg-white rounded-lg border text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description *</label>
                    <textarea 
                      required 
                      rows={2}
                      placeholder="Detail the core objectives of this role..."
                      value={newJob.description}
                      onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 bg-white rounded-lg border text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Key Requirements (Comma Separated)</label>
                    <input 
                      type="text" 
                      placeholder="Degree in Agronomy, Fluent Kannada, Drip design experience..."
                      value={newJob.requirements}
                      onChange={(e) => setNewJob(prev => ({ ...prev, requirements: e.target.value }))}
                      className="w-full px-3 py-2 bg-white rounded-lg border text-xs outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button 
                      type="button" 
                      onClick={() => setIsAddingJob(false)}
                      className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Publish to Portal
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Job Filter Tabs Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100">
            {["All", "Programs", "Operations", "Finance", "Communications", "Technology", "Monitoring & Evaluation"].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedDepartment === dept
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-600'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job Results Board Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-100">
                <AlertCircle size={32} className="mx-auto text-amber-500 mb-3" />
                <h3 className="font-semibold text-slate-800">No vacancies found</h3>
                <p className="text-xs text-slate-500">No active positions match your selected department filter.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div 
                  key={job.id}
                  className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                        {job.department}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Building2 size={13} className="text-slate-400" />
                        {job.type}
                      </span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-slate-900 hover:text-emerald-700 transition-colors">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-slate-400" />
                        {job.location}
                      </span>
                      <span>•</span>
                      <span>Exp: {job.experience}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-semibold">{job.salary}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pt-2 line-clamp-3">
                      {job.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Requirements</span>
                      <ChevronRight size={14} />
                    </button>
                    <a
                      href="#apply-section"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, position: job.title }));
                        setFormStep(1);
                      }}
                      className="px-4 py-2 bg-slate-900 hover:bg-emerald-600 hover:text-white text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Apply Directly
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Dynamic Job Requirements Modal */}
        <AnimatePresence>
          {selectedJob && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl relative"
              >
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-full text-slate-500 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">
                    {selectedJob.department}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-slate-900">{selectedJob.title}</h3>
                  <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-500">
                    <span>{selectedJob.location}</span>
                    <span>•</span>
                    <span>{selectedJob.type}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">{selectedJob.salary}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Role Overview</h4>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Detailed Requirements</h4>
                    <ul className="space-y-2.5">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-600 leading-relaxed">
                          <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                  <button 
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
                  >
                    Close
                  </button>
                  <a 
                    href="#apply-section"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, position: selectedJob.title }));
                      setSelectedJob(null);
                      setFormStep(1);
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Apply Now
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 4. INTERNSHIPS & FELLOWSHIPS: Double Bento Grid Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Internships Box */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold">Educational Pathways</span>
              <h3 className="text-2xl font-display font-bold text-slate-900">Internship Programs</h3>
              <p className="text-sm text-slate-500">
                Immersive 2 to 6 months practical field internships for academic credits.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Social Impact Internship", icon: Briefcase, color: "text-rose-600 bg-rose-50", desc: "Gain hands-on rural extension experience with farmer networks." },
                { title: "Digital & AI Internship", icon: Laptop, color: "text-emerald-600 bg-emerald-50", desc: "Co-teach algorithmic coding and AI prompt tools to village youths." },
                { title: "Research Internship", icon: Microscope, color: "text-violet-600 bg-violet-50", desc: "Audit soil carbons and write academic reports on water reservoirs." },
                { title: "Communications Internship", icon: Megaphone, color: "text-indigo-600 bg-indigo-50", desc: "Produce high-fidelity documentary vlogs and CSR brochure designs." }
              ].map((intern, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-emerald-300 transition-colors">
                  <div className={`p-2.5 rounded-lg ${intern.color} w-fit mb-4`}>
                    <intern.icon size={18} />
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900 mb-1.5">{intern.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{intern.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fellowships Box */}
          <div className="space-y-6 bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Leadership Incubator</span>
              <h3 className="text-2xl font-display font-bold">Fellowships &amp; Fellow Leadership</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Elite 1-year residential programs modeled after world-class humanitarian templates to create the next generation of social innovators in Karnataka.
              </p>
            </div>

            <div className="space-y-3.5 my-6">
              {[
                { title: "Rural Development Fellowship", duration: "12 Months", reward: "₹30,000 / Month Stipend" },
                { title: "Women Leadership Fellowship", duration: "12 Months", reward: "₹28,000 / Month Stipend" },
                { title: "Youth Changemaker Program", duration: "9 Months", reward: "₹25,000 / Month Stipend" },
                { title: "AI for Social Impact Fellowship", duration: "12 Months", reward: "₹35,000 / Month Stipend" }
              ].map((fellow, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-semibold">{fellow.title}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-slate-400 block">{fellow.duration}</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">{fellow.reward}</span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => {
                setFormData(prev => ({ ...prev, position: 'Rural Development Fellowship' }));
                const applySect = document.getElementById('apply-section');
                if (applySect) applySect.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl tracking-wide uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply for Fellowship</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </section>

        {/* 5. CAREER PATHWAY SECTION: Volunteer to Career Journey Infographic */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Strategic Ecosystem</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Volunteer To Career Journey</h2>
            <p className="text-sm text-slate-600">
              We provide clear meritocratic trajectories, allowing young graduates to rise from local on-field interns to institutional leadership roles.
            </p>
          </div>

          {/* Horizontal Pathway Infographic */}
          <div className="relative pt-8 pb-4">
            {/* Background connecting line */}
            <div className="hidden lg:block absolute top-[68px] left-[8%] right-[8%] h-0.5 bg-slate-200 z-0" />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
              {[
                { step: "01", name: "Volunteer", roles: "Flexible remote tasks / Rural teaching camps" },
                { step: "02", name: "Intern", roles: "2-6 month structured thesis & field audit credits" },
                { step: "03", name: "Project Associate", roles: "Direct responsibility of village clusters" },
                { step: "04", name: "Program Coordinator", roles: "Execute entire regional sub-programs" },
                { step: "05", name: "Program Manager", roles: "Manage institutional budgets & CSR audits" },
                { step: "06", name: "Leadership Roles", roles: "Executive trust director / Strategic advisor" }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center space-y-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs relative">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xs font-mono text-emerald-700 font-bold shadow-inner">
                    {step.step}
                  </div>
                  <h4 className="font-display font-bold text-slate-900 text-sm">{step.name}</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">{step.roles}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. TEAM STORIES SECTION: Meet Our Team Stories */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold">On-field Voices</span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 font-bold">Meet Our Team</h2>
              <p className="text-sm text-slate-500">
                Hear from the young professionals driving climate resilience and computational literacy directly in Karnataka.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((member, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{member.name}</h4>
                      <p className="text-xs text-emerald-700 font-medium">{member.role}</p>
                      <span className="text-[10px] font-mono text-slate-400">{member.exp}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic pt-2">
                    "{member.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="text-[9px] font-mono uppercase text-slate-400 block tracking-wider">Verified Milestone Contribution</span>
                  <span className="text-xs font-semibold text-slate-800">{member.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. BENEFITS SECTION: Benefits & Growth Glass Cards */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Total Rewards</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Benefits &amp; Growth Opportunities</h2>
            <p className="text-sm text-slate-600">
              We look after our people with clean compensation structures, comprehensive field insurances, and continuous capacity development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Continuous Learning", icon: BookOpen, desc: "Sponsored attendance to global development forums, ESG certificate courses, and agrarian research seminars." },
              { title: "Flexible Work Culture", icon: Clock, desc: "Task-oriented schedules with flexible compensatory offs for weekend social audits and community programs." },
              { title: "Leadership Development", icon: Award, desc: "Direct mentorship pathways from senior social directors, Chartered Accountants, and retired state IAS advisors." },
              { title: "Networking Opportunities", icon: Users, desc: "Interact directly with elite CSR chairs of leading tech conglomerates, world-class researchers, and district collectors." },
              { title: "Recognition Programs", icon: Medal, desc: "Quarterly excellence certifications, field milestones badges, and public appreciation credits in our Annual Reports." },
              { title: "Purpose-Driven Work", icon: Heart, desc: "Wake up every single morning knowing your code, coordination, or research is physically putting food on rural plates." }
            ].map((ben, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white/80 border border-slate-100 shadow-xs hover:border-emerald-300 transition-colors flex gap-4"
              >
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700 shrink-0 h-fit">
                  <ben.icon size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-slate-900 text-sm">{ben.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{ben.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. APPLICATION PROCESS: Hiring Infographic Steps */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Statutory Process</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Our Hiring Process</h2>
            <p className="text-sm text-slate-600">
              Raita Mitra practices complete transparency. Our hiring process is 100% objective, merit-based, and free of prejudice.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
            {[
              { step: "Step 01", name: "Application Submit", desc: "Submit details in the form below with PDF Resume", icon: FileText, bg: "bg-rose-50 text-rose-700" },
              { step: "Step 02", name: "Shortlisting", desc: "Our HR committee scans details against guidelines", icon: Filter, bg: "bg-emerald-50 text-emerald-700" },
              { step: "Step 03", name: "Interview Round", desc: "Brief telephonic screening of your goals and values", icon: MessageCircle, bg: "bg-violet-50 text-violet-700" },
              { step: "Step 04", name: "Assessment", desc: "A minor offline research or extension case study", icon: ClipboardCheck, bg: "bg-amber-50 text-amber-700" },
              { step: "Step 05", name: "Final Offer", desc: "Formal offer letter detailing statutory terms", icon: BadgeCheck, bg: "bg-teal-50 text-teal-700" },
              { step: "Step 06", name: "Onboarding", desc: "Complete field induction at our Hubballi headquarters", icon: Handshake, bg: "bg-sky-50 text-sky-700" }
            ].map((proc, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-100 shadow-2xs flex flex-col items-center text-center space-y-3"
              >
                <div className={`p-3 rounded-full ${proc.bg}`}>
                  <proc.icon size={20} />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase text-slate-400 block">{proc.step}</span>
                  <h4 className="font-display font-bold text-slate-900 text-xs mt-1">{proc.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-normal">{proc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. APPLICATION SECTION: ATS Ready Multi-Step Form */}
        <section id="apply-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden scroll-mt-20">
          
          {/* Left Split Image Screen */}
          <div className="lg:col-span-5 relative min-h-[300px] bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
              <img 
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=600" 
                alt="Professionals in office space discussing data" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 z-0" />

            <div className="relative z-10 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">Applicant Hub</span>
              <h3 className="text-2xl md:text-3xl font-display font-bold">Apply For Opportunities</h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Raita Mitra Social Trust processes applications with dynamic ATS parsing. Drop your CV to receive real-time compatibility score!
              </p>
            </div>

            {/* ATS Verification Indicator Box */}
            <div className="relative z-10 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 mt-12">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <BrainCircuit size={13} className="animate-pulse" />
                ATS Parser Integrations Active
              </span>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1 text-emerald-300">
                  <Check size={10} /> LinkedIn Sync
                </span>
                <span className="flex items-center gap-1 text-emerald-300">
                  <Check size={10} /> Cloudinary Store
                </span>
                <span className="flex items-center gap-1 text-emerald-300">
                  <Check size={10} /> Sheets API
                </span>
                <span className="flex items-center gap-1 text-emerald-300">
                  <Check size={10} /> AI Screening
                </span>
              </div>
            </div>
          </div>

          {/* Right Split ATS Form Area */}
          <div className="lg:col-span-7 p-8 md:p-12">
            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-bold text-slate-900">Application Submitted!</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Namaste, {formData.fullName}. Your application has been logged into our ATS registry. A receipt confirmation has been sent to <b>{formData.email}</b>.
                  </p>
                </div>

                {atsScore && (
                  <div className="p-4 bg-emerald-50 rounded-2xl max-w-sm mx-auto border border-emerald-100">
                    <span className="text-[10px] font-mono text-emerald-800 uppercase font-bold tracking-wider block">Simulated Resume Compliance Score</span>
                    <span className="text-3xl font-display font-bold text-emerald-700 block my-1">{atsScore}%</span>
                    <span className="text-[10px] text-slate-500 block leading-normal">
                      Excellent! Your resume lists keywords matching agricultural development standards.
                    </span>
                  </div>
                )}

                <div className="pt-4">
                  <button 
                    onClick={resetApplicationForm}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
                  >
                    Submit Another Application
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* Form Progress Indicator Header */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-slate-400">Multi-Step ATS Wizard</span>
                    <h4 className="text-sm font-bold text-slate-800">
                      {formStep === 1 ? "1. Personal Contact Credentials" : 
                       formStep === 2 ? "2. Experience & Qualifications" : 
                       "3. Document Repository & Statement"}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs font-bold text-slate-500">
                    <span className={formStep === 1 ? 'text-emerald-700 font-extrabold' : ''}>1</span>
                    <span>/</span>
                    <span className={formStep === 2 ? 'text-emerald-700 font-extrabold' : ''}>2</span>
                    <span>/</span>
                    <span className={formStep === 3 ? 'text-emerald-700 font-extrabold' : ''}>3</span>
                  </div>
                </div>

                {/* Form Step Contents */}
                {formStep === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Name *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Ramesh Kumar"
                          value={formData.fullName}
                          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                          className="w-full px-3 py-2.5 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email Address *</label>
                        <input 
                          type="email" 
                          required
                          placeholder="ramesh@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 py-2.5 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Phone Number *</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 py-2.5 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Current City *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Hubballi, Karnataka"
                          value={formData.city}
                          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          className="w-full px-3 py-2.5 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">LinkedIn Profile Url</label>
                      <input 
                        type="url" 
                        placeholder="https://linkedin.com/in/username"
                        value={formData.linkedin}
                        onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                        className="w-full px-3 py-2.5 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </motion.div>
                )}

                {formStep === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Position Applying For *</label>
                      <select
                        value={formData.position}
                        onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                        className="w-full px-3 py-2.5 border rounded-lg text-xs outline-none"
                      >
                        {jobs.map(j => (
                          <option key={j.id} value={j.title}>{j.title}</option>
                        ))}
                        <option value="Rural Development Fellowship">Rural Development Fellowship</option>
                        <option value="Other / General Application">Other / General Application</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Total Work Experience *</label>
                        <select
                          value={formData.experience}
                          onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                          className="w-full px-3 py-2.5 border rounded-lg text-xs outline-none"
                        >
                          <option value="Fresher">Fresher / Graduate</option>
                          <option value="1-3 Years">1-3 Years</option>
                          <option value="3-5 Years">3-5 Years</option>
                          <option value="5+ Years">5+ Years</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Highest Qualification *</label>
                        <select
                          value={formData.qualification}
                          onChange={(e) => setFormData(prev => ({ ...prev, qualification: e.target.value }))}
                          className="w-full px-3 py-2.5 border rounded-lg text-xs outline-none"
                        >
                          <option value="Graduate">Bachelor's Degree (B.Sc/BA/B.Com)</option>
                          <option value="Post Graduate">Master's Degree (MSW/M.Sc/MBA)</option>
                          <option value="Doctorate">Doctorate / Ph.D.</option>
                          <option value="Undergraduate">Undergraduate / Diploma</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Tell us about your rural motivation</label>
                      <textarea 
                        rows={3}
                        placeholder="Briefly describe why you are excited to work in rural communities across Karnataka..."
                        value={formData.coverLetter}
                        onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                        className="w-full px-3 py-2.5 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </motion.div>
                )}

                {formStep === 3 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    {/* Resume Drag & Drop Upload Simulator */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Resume Upload (PDF/DOCX) *</label>
                      <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer transition-colors relative">
                        <input 
                          type="file" 
                          required={!formData.resumeName}
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <Upload size={24} className="mx-auto text-slate-400 mb-2" />
                        <span className="text-xs font-semibold text-slate-800 block">
                          {formData.resumeName || "Drag & drop file or click to choose"}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-1">Accepted: PDF, DOC, DOCX up to 5MB</span>
                      </div>
                    </div>

                    {/* AI Screening Live Simulation Feedback */}
                    {isAtsAnalyzing && (
                      <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        <span className="text-[11px] text-indigo-700 font-medium">Scanning Resume against Section 135 &amp; Agr agrarian keywords...</span>
                      </div>
                    )}

                    {!isAtsAnalyzing && atsScore !== null && (
                      <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Check size={14} className="text-emerald-600" />
                          <span className="text-[11px] text-slate-600">Simulated ATS Keyword Score:</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-800">{atsScore}% Match</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Additional Message / Cover Letter Note</label>
                      <textarea 
                        rows={3}
                        placeholder="Any additional details or questions regarding compensation, timing or previous publications..."
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-3 py-2.5 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Form Navigation Controls */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  {formStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleApplyPrevStep}
                      className="px-4 py-2 border hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg cursor-pointer"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {formStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleApplyNextStep}
                      className="px-5 py-2 bg-slate-900 hover:bg-emerald-600 hover:text-white text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Continue</span>
                      <ChevronRight size={13} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Submit Application</span>
                      <Send size={12} />
                    </button>
                  )}
                </div>

              </form>
            )}
          </div>
        </section>

        {/* 10. FAQS SECTION: Accordion Questions */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Career FAQ Portal</h2>
            <p className="text-sm text-slate-500">Answers to common queries regarding compensation, remote setups and evaluations.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = !!openFaqs[idx];
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen ? 'bg-white border-emerald-500 shadow-md' : 'bg-white border-slate-100 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <h4 className="font-semibold text-slate-900 text-xs md:text-sm">{faq.q}</h4>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'bg-emerald-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <ChevronDown size={14} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* 11. SOCIAL MEDIA & HR PANEL: Connect with Us & Toggles */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Social Media Link Grid */}
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Employer Network</span>
              <h3 className="text-xl font-display font-bold text-slate-900">Connect With Us</h3>
              <p className="text-xs text-slate-500">Follow our handles to view live field pictures, celebratory meets, and spot recruitment updates.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {[
                { name: "LinkedIn", icon: Linkedin, color: "text-blue-700 bg-blue-50 border-blue-100", handle: "Raita Mitra Social Trust", link: "#" },
                { name: "Facebook", icon: Facebook, color: "text-blue-800 bg-blue-100 border-blue-200", handle: "/raitamitra.trust", link: "#" },
                { name: "Instagram", icon: Instagram, color: "text-pink-700 bg-pink-50 border-pink-100", handle: "@raitamitra_org", link: "#" },
                { name: "YouTube", icon: Youtube, color: "text-rose-700 bg-rose-50 border-rose-100", handle: "@RaitaMitraTrust", link: "#" }
              ].map((plat, idx) => (
                <a
                  key={idx}
                  href={plat.link}
                  className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all hover:-translate-y-0.5 hover:shadow-xs ${plat.color}`}
                >
                  <plat.icon size={20} />
                  <div>
                    <span className="text-[10px] font-mono font-bold block">{plat.name}</span>
                    <span className="text-[9px] text-slate-500 block truncate max-w-[120px]">{plat.handle}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* HR & ATS Configuration Panel Widget */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sliders size={14} />
                HR Operations Panel
              </span>
              <h3 className="text-lg font-display font-bold">Scalability Operations</h3>
              <p className="text-[11px] text-slate-300 leading-normal">
                Toggles to test automated recruitment features in our upcoming Next.js enterprise migration.
              </p>
            </div>

            <div className="space-y-4 my-4">
              {[
                { key: 'enableATSIntegration', label: 'ATS Automation integration' },
                { key: 'enableEmployeePortal', label: 'Portal profiles for staff' },
                { key: 'enableJobAlerts', label: 'Push weekly alerts to matches' },
                { key: 'enableLinkedInSync', label: 'Direct Sync with LinkedIn Talent' },
                { key: 'enableCandidateDashboard', label: 'Applicant dynamic board' },
                { key: 'enableAIResumeScreening', label: 'Resume Parser Keyword Scorer' }
              ].map((feat) => (
                <div key={feat.key} className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">{feat.label}</span>
                  <button
                    onClick={() => setHrFeatures(prev => ({
                      ...prev,
                      [feat.key]: !prev[feat.key as keyof typeof prev]
                    }))}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                      hrFeatures[feat.key as keyof typeof hrFeatures] ? 'bg-emerald-500' : 'bg-white/10'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                      hrFeatures[feat.key as keyof typeof hrFeatures] ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
              <span className="text-[10px] font-mono text-slate-400 block">Database Registry Status</span>
              <span className="text-xs font-semibold text-emerald-400">ONLINE • Active on Port 3000</span>
            </div>
          </div>
        </section>

        {/* 12. CTA BANNER SECTION */}
        <section className="relative rounded-3xl bg-emerald-950 text-white overflow-hidden py-16 px-6 md:px-12 text-center">
          <div className="absolute inset-0 z-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600" 
              alt="Happy team members" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950 via-slate-900 to-emerald-900 z-0" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h3 className="text-3xl md:text-4xl font-display font-bold">Create Impact Through Your Career</h3>
            <p className="text-sm md:text-base text-emerald-100/80 leading-relaxed max-w-2xl mx-auto">
              Join us in building stronger and more sustainable communities. Our talent coordinators would love to talk to you.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a 
                href="#openings-section" 
                className="px-6 py-3 bg-gold hover:bg-yellow-500 text-slate-950 text-xs font-bold rounded-xl tracking-wider uppercase transition-colors"
              >
                View Openings
              </a>
              <a 
                href="#apply-section" 
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-colors border border-white/20"
              >
                Apply Today
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

// Minimal Simple Cross Icon for the modal
function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
