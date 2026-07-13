import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, ShieldCheck, BarChart3, Globe, FolderKanban, FileSpreadsheet, 
  Users, MessageSquare, Sparkles, Calendar, Plus, Check, ClipboardList, 
  MapPin, Image as ImageIcon, Video, HelpCircle, PhoneCall, Smartphone, 
  Lock, ArrowRight, Download, Eye, ExternalLink, ChevronRight, UserCheck, 
  Clock, Share2, Star, CheckSquare, PlusCircle, Send, SendHorizontal, Trash2, Edit2, Play, Info,
  ChevronDown, X
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Legend, LineChart, Line, RadialBarChart, RadialBar
} from 'recharts';

interface PartnerPortalProps {
  highContrast: boolean;
}

// ============================================================================
// SYSTEM MOCK DATA & CONSTANTS
// ============================================================================

const SYSTEM_ROLES = [
  { id: 'csr_head', label: 'CSR Head (Primary Editor)', desc: 'Full authority to approve budgets and view audited financials.' },
  { id: 'finance', label: 'Finance Team (Read/Write)', desc: 'Generates utilization certificates and checks escrow transfers.' },
  { id: 'hr_coordinator', label: 'HR & Volunteer Coord (Read/Write)', desc: 'Manages employee schedules and reviews community hours.' },
  { id: 'leadership', label: 'Leadership Executive (Read Only)', desc: 'High-level ESG impact graphs and board reports.' }
];

const COMPLIANCE_DOCUMENTS = [
  { name: 'CSR-1 Registration Certificate', desc: 'Ministry of Corporate Affairs accreditation code: CSR00010482', date: '2022-04-12', size: '2.1 MB', code: 'CSR1-MCA' },
  { name: 'NGO Darpan Registration', desc: 'NITI Aayog registration code: KA/2021/0285901', date: '2021-08-05', size: '1.4 MB', code: 'DARPAN-NITI' },
  { name: 'Section 12A Permanent Tax Exemption', desc: 'Statutory approval copy validating charitable tax exemption', date: '2021-12-20', size: '1.8 MB', code: '12A-TAX' },
  { name: 'Section 80G Approval Certificate', desc: 'Allows partner corporate contributors to claim 50% state tax rebate', date: '2021-12-22', size: '2.4 MB', code: '80G-REBATE' },
  { name: 'Signed MoU - Haveri Smart Water Cluster', desc: 'Tri-party contract between RMST, local Panchayat & Agrarian Corp', date: '2025-10-15', size: '4.8 MB', code: 'MOU-HAVERI' },
  { name: 'FY 25-26 Independent Auditor Report', desc: 'Statutory audited ledger prepared by accredited CA firm', date: '2026-05-30', size: '3.6 MB', code: 'AUDIT-FY26' }
];

const KANBAN_PROJECT_DATA = [
  { 
    id: 'p_1', 
    title: 'Haveri Smart Drip Grid Deployment', 
    stage: 'In Progress', 
    timeline: 'Jan 2026 — Dec 2026',
    progress: 68,
    indicators: 'On Track', 
    risk: 'Low',
    deliverables: ['120 solar solar arrays set up', 'Soil sensors calibrated', 'Panchayat registration signed'],
    budget: '₹18,50,000'
  },
  { 
    id: 'p_2', 
    title: 'Savanur State Girls High School Tech Hub', 
    stage: 'Completed', 
    timeline: 'Jun 2025 — Apr 2026',
    progress: 100,
    indicators: 'Completed', 
    risk: 'None',
    deliverables: ['18 Solar workstations installed', 'Python smart-tutor system active', '80 schoolgirls certified'],
    budget: '₹8,00,000'
  },
  { 
    id: 'p_3', 
    title: 'Women Dairy Cooperative Digital Scale Network', 
    stage: 'In Progress', 
    timeline: 'Mar 2026 — Feb 2027',
    progress: 42,
    indicators: 'On Track', 
    risk: 'Medium (Hardware Supply Lag)',
    deliverables: ['8 fat analyzers integrated', 'Ledger app localizations tested'],
    budget: '₹14,20,000'
  },
  { 
    id: 'p_4', 
    title: 'Shiggaon Rainwater Agroforest Bunds', 
    stage: 'In Planning', 
    timeline: 'Aug 2026 — Jul 2027',
    progress: 10,
    indicators: 'Planning Stage', 
    risk: 'Low',
    deliverables: ['Topographic mapping done', 'Seedling cultivars secured'],
    budget: '₹22,00,000'
  }
];

const GEO_ACTIVITIES_GALLERY = [
  { id: 1, title: 'Installing High School Touchscreens', location: 'Savanur High School', coordinates: '14.97° N, 75.34° E', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600' },
  { id: 2, title: 'Soil Humic Core Testing Diagnostics', location: 'Kundgol Drylands', coordinates: '15.26° N, 75.25° E', img: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'Solar Drip Pump Assembly Review', location: 'Shiggaon Farmland Cluster', coordinates: '14.99° N, 75.22° E', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600' }
];

const SDG_MAPPING_DATA = [
  { name: 'SDG 1 (No Poverty)', value: 85, fill: '#e5243b' },
  { name: 'SDG 4 (Quality Education)', value: 90, fill: '#c5192d' },
  { name: 'SDG 5 (Gender Equality)', value: 75, fill: '#ff3a21' },
  { name: 'SDG 8 (Decent Work & Growth)', value: 80, fill: '#a21942' },
  { name: 'SDG 13 (Climate Action)', value: 95, fill: '#3f7e44' }
];

const GENDER_DISTRIBUTION_DATA = [
  { name: 'Female Beneficiaries', value: 6200, color: '#0d9488' },
  { name: 'Male Beneficiaries', value: 3800, color: '#f59e0b' }
];

const YEAR_OVER_YEAR_GROWTH = [
  { year: '2023', 'CSR Funds (Lakhs)': 12, 'Families Reached': 450 },
  { year: '2024', 'CSR Funds (Lakhs)': 28, 'Families Reached': 1100 },
  { year: '2025', 'CSR Funds (Lakhs)': 52, 'Families Reached': 2400 },
  { year: '2026', 'CSR Funds (Lakhs)': 84, 'Families Reached': 4800 }
];

const MEETING_REMINDERS_FEED = [
  { id: 'm_1', title: 'Q2 Performance Audit Video Review', date: '2026-07-14', time: '11:00 AM', platform: 'Microsoft Teams', host: 'Ramesh Patel' },
  { id: 'm_2', title: 'Haveri Watershed Milestone Handover', date: '2026-07-28', time: '02:30 PM', platform: 'Google Meet', host: 'Sanjay Deshpande' }
];

const NOTIFICATIONS_CENTER_ITEMS = [
  { id: 'nt_1', title: 'Milestone Completed: Savanur Tech Hub', desc: 'All 18 workstations are fully validated and registered under trust assets.', time: '10 mins ago', type: 'success' },
  { id: 'nt_2', title: 'Q1 Comprehensive Performance Ledger Generated', desc: 'The verified programmatic output report has been compiled by our CA board.', time: '1 day ago', type: 'info' },
  { id: 'nt_3', title: 'Field Visit Invite: Kundgol Soil Diagnostics', desc: 'Join the board of trustees for a direct stakeholder roundtable on August 3rd.', time: '3 days ago', type: 'alert' }
];

const FAQ_ACCORDION = [
  { q: "How do partners access statutory audited ledgers?", a: "Statutory ledgers are accessible inside the Compliance & Document Repository tab. You can download secure PDF copies with certified cryptographic SHA-256 signatures for your quarterly ESG meetings." },
  { q: "Can multiple corporate users access a single portal account?", a: "Yes. By selecting the Role Switcher at the top bar, you can simulate team-wide corporate roles including CSR Head, Finance Team, HR & Volunteer Coordinator, and Executive Leadership." },
  { q: "How are field project locations tracked?", a: "Under the GIS Karnataka Map tab, village-level progress and solar-powered drip system coordinates are fully plotted on our active map interface, accompanied by geotagged field activity photographs." },
  { q: "Does the portal support employee volunteer scheduling?", a: "Absolutely. HR and CSR heads can manage volunteer roll drafts inside the Employee Volunteering tab and schedule video performance audits using our integrated calendar interface." }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function PartnerPortal({ highContrast }: PartnerPortalProps) {
  // Session/Auth State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [authProvider, setAuthProvider] = useState<'microsoft' | 'google' | 'email'>('microsoft');
  const [authInput, setAuthInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  
  // Current active tenant role simulation
  const [currentRole, setCurrentRole] = useState<string>('csr_head');
  
  // Tab managers
  const [activePortalTab, setActivePortalTab] = useState<'overview' | 'tracking' | 'analytics' | 'gis' | 'documents' | 'volunteer' | 'collaboration' | 'support'>('overview');
  const [kanbanFilter, setKanbanFilter] = useState<'All' | 'In Progress' | 'Completed' | 'In Planning'>('All');
  
  // Document downloads animation simulation
  const [downloadingDocCode, setDownloadingDocCode] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<any | null>(null);

  // Collaboration Space live interactive states
  const [collaborationTasks, setCollaborationTasks] = useState([
    { id: 't_1', task: 'Upload signed Haveri MoU signature pages', assignedTo: 'CSR Head', completed: true },
    { id: 't_2', task: 'Cross-check 12A exemption codes on ledger drafts', assignedTo: 'Finance Team', completed: false },
    { id: 't_3', task: 'Configure Google Workspace email lists for employee mentors', assignedTo: 'HR Coordinator', completed: false },
    { id: 't_4', task: 'Draft executive summary for board presentation', assignedTo: 'CSR Head', completed: false }
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('CSR Head');

  const [collabComments, setCollabComments] = useState([
    { id: 1, author: 'Siddharth Deshmukh', role: 'Securitas ESG Lead', text: 'Just reviewed the soil humic diagnostics numbers for Q1. Outstanding reduction in agrarian inputs. Ready to authorize the next escrow tranche!', timestamp: 'Jul 4, 2026 at 02:40 PM' },
    { id: 2, author: 'Dr. Ramesh Patil', role: 'Trust Advisor', text: 'Thank you Siddharth! The solar drip grid is yielding immediate water conservancy gains in Kundgol as well.', timestamp: 'Jul 5, 2026 at 09:12 AM' }
  ]);
  const [newCommentInput, setNewCommentInput] = useState('');

  // AI CSR Copilot Chat integration
  const [copilotMessages, setCopilotMessages] = useState([
    { id: '1', sender: 'ai', text: 'Good morning. I am your Raita Mitra AI CSR Copilot. I can parse audit ledgers, generate milestone utilization summaries, suggest SDG alignment values, or analyze gender distribution ratios. How can I assist you today?', timestamp: '09:00 AM' }
  ]);
  const [copilotInput, setCopilotInput] = useState('');
  const [copilotTyping, setCopilotTyping] = useState(false);
  const copilotEndRef = useRef<HTMLDivElement>(null);

  // Gallery lightbox preview
  const [lightboxImg, setLightboxImg] = useState<any | null>(null);

  // Interactive meeting scheduler form
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scheduleForm, setScheduleForm] = useState({
    title: 'Audit Review',
    date: '2026-07-20',
    time: '11:00 AM',
    platform: 'Microsoft Teams',
    description: ''
  });

  useEffect(() => {
    copilotEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [copilotMessages, copilotTyping]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [activePortalTab, isLoggedIn]);

  // Auth simulators
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authInput.trim()) return;
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.trim()) {
      setIsLoggedIn(true);
    }
  };

  // AI chat communication
  const handleCopilotSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!copilotInput.trim()) return;

    const userMessage = { id: Date.now().toString(), sender: 'user', text: copilotInput, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setCopilotMessages(prev => [...prev, userMessage]);
    setCopilotInput('');
    setCopilotTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...copilotMessages, userMessage].map(m => ({
            sender: m.sender === 'user' ? 'user' : 'model',
            text: m.text
          }))
        })
      });

      const data = await response.json();
      setCopilotTyping(false);
      setCopilotMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.text || 'I analyzed the portfolio metrics. Raita Mitra shows 92% direct program allocation with 8% administration expense. SDG 13 (Climate Action) is our highest rated pillar.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error('Error in Copilot call:', err);
      setCopilotTyping(false);
      setCopilotMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `Here is a custom summary of Raita Mitra's ESG data for your role as **${SYSTEM_ROLES.find(r => r.id === currentRole)?.label}**:\n- **Total Active Outlay**: ₹52,70,000 across 12 North Karnataka taluks.\n- **UN Sustainable Development Goals (SDG) Alignment**: Map points peak at SDG 13 (Climate Action) and SDG 4 (Quality Education).\n- **Utilization Factor**: 92.0% direct programmatic asset delivery.\n\nWould you like me to draft an executive utilization summary PDF statement for your quarterly board?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  };

  const simulateDocDownload = (doc: any) => {
    if (downloadingDocCode) return;
    setDownloadingDocCode(doc.code);
    
    setTimeout(() => {
      setDownloadingDocCode(null);
      alert(`Resource compiled!\nVerified secure copy of "${doc.name}" has been download-signed and saved.`);
    }, 1200);
  };

  // Add collaboration task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      task: newTaskInput,
      assignedTo: newTaskAssignee,
      completed: false
    };
    setCollaborationTasks([...collaborationTasks, newTask]);
    setNewTaskInput('');
  };

  const toggleTaskCompleted = (id: string) => {
    setCollaborationTasks(collaborationTasks.map(t => {
      if (t.id === id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  };

  const deleteCompletedTasks = () => {
    setCollaborationTasks(collaborationTasks.filter(t => !t.completed));
  };

  // Add collaboration comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentInput.trim()) return;
    const comment = {
      id: Date.now(),
      author: 'You (' + (SYSTEM_ROLES.find(r => r.id === currentRole)?.label?.split(' ')[0] || 'Partner') + ')',
      role: 'Securitas ESG Lead Partner',
      text: newCommentInput,
      timestamp: new Date().toLocaleString()
    };
    setCollabComments([...collabComments, comment]);
    setNewCommentInput('');
  };

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();

    // POST partner meeting to Server backend
    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'Partner Onboarding',
        name: activeRoleDetails?.label || 'Authorized Corporate Partner',
        email: 'esg@infosys-foundations.org',
        phone: '+91 9886000000',
        subject: `Schedule Meeting: ${scheduleForm.title}`,
        message: `Requested platform review meeting. Target Platform: ${scheduleForm.platform}`,
        metadata: {
          date: scheduleForm.date,
          time: scheduleForm.time,
          platform: scheduleForm.platform,
          roleId: currentRole,
          roleLabel: activeRoleDetails?.label
        }
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Partner meeting request logged to server:', data);
    })
    .catch(err => {
      console.error('Error logging partner meeting request:', err);
    });

    alert(`Meeting Confirmed on ${scheduleForm.date} at ${scheduleForm.time}!\nA secure invitation link with ${scheduleForm.platform} diagnostics has been synchronized with your corporate workspace calendar.`);
    setShowScheduleModal(false);
  };

  const activeRoleDetails = SYSTEM_ROLES.find(r => r.id === currentRole);

  const filteredKanban = KANBAN_PROJECT_DATA.filter(p => {
    if (kanbanFilter === 'All') return true;
    return p.stage === kanbanFilter;
  });

  return (
    <div className={`w-full min-h-screen ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* GLOBAL NOTIFICATION BANNER */}
      <div className="bg-emerald-950 text-white py-3 px-4 border-b border-emerald-800/80 flex flex-col sm:flex-row justify-between items-center gap-3 sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-2.5 text-left">
          <span className="p-1 bg-emerald-500 rounded-md text-slate-950">
            <ShieldCheck className="w-4 h-4 animate-pulse" />
          </span>
          <div>
            <h4 className="text-xs font-black tracking-wider uppercase flex items-center gap-2">
              Enterprise CSR Partner Hub
              <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full">Pro SaaS v4.0</span>
            </h4>
            <p className="text-[10px] text-emerald-300 font-mono">Compliant with MCA CSR-1, NITI Darpan, and Karnataka Trust Audits</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-emerald-200 hidden md:inline">● Connected: Securitas Corporate ESG Group</span>
          <button 
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer"
          >
            {isLoggedIn ? '🚪 Secure Logout' : '🔑 Partner Gateway'}
          </button>
        </div>
      </div>

      {/* RENDER CASE A: SECURE LOGIN GATEWAY */}
      {!isLoggedIn ? (
        <section className="max-w-6xl mx-auto py-20 px-4">
          <div className={`grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden border ${
            highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/60 shadow-2xl'
          }`}>
            
            {/* Visual Column */}
            <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 p-10 text-white flex flex-col justify-between min-h-[400px] relative">
              <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800")' }} />
              
              <div className="relative z-10 space-y-4 text-left">
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[9px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  ENTERPRISE IDENTITY
                </span>
                <h2 className="text-3xl font-display font-black leading-tight text-white">
                  Corporate & Institutional Portal
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dedicated interface for CSR committees, institutional trustees, and ESG coordinators to perform statutory evaluations, monitor physical project locations, and verify ledger accounts.
                </p>
              </div>

              <div className="relative z-10 border-t border-slate-800/80 pt-6 space-y-3 text-left">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                  <span>92.0% Direct Field Efficiency</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                  <span>Interactive Power BI Integrations</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                  <span>ISO 27001 Certified Vault</span>
                </div>
              </div>
            </div>

            {/* Auth Selector Form */}
            <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center text-left space-y-6 bg-white dark:bg-zinc-900">
              <div className="space-y-1">
                <h3 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white">Partner Authentication</h3>
                <p className="text-xs text-slate-400">Choose your authorized enterprise authentication method below.</p>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl text-xs font-mono">
                {(['microsoft', 'google', 'email'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => { setAuthProvider(p); setOtpSent(false); }}
                    className={`py-2 rounded-lg text-center font-bold capitalize transition-all cursor-pointer ${
                      authProvider === p ? 'bg-emerald-950 text-white shadow' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {p === 'microsoft' ? 'Microsoft SSO' : p === 'google' ? 'Google Workspace' : 'Email OTP'}
                  </button>
                ))}
              </div>

              <form onSubmit={otpSent ? handleVerifyOtp : handleRequestOtp} className="space-y-4">
                {authProvider === 'email' ? (
                  <div>
                    <label htmlFor="p-email-input" className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Corporate Email Address</label>
                    <input
                      id="p-email-input"
                      type="email"
                      required
                      placeholder="siddharth.deshmukh@securitas-esg.com"
                      value={authInput}
                      onChange={(e) => setAuthInput(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-950 focus:outline-none text-xs font-mono"
                    />
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800 border border-slate-150 space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">SSO Authorized Tenant Sync</h4>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Your enterprise identity tenant registry is configured to handle multi-factor credentials natively via {authProvider === 'microsoft' ? 'Microsoft Entra ID' : 'Google Cloud Identity'}.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsLoggedIn(true)}
                      className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl text-xs font-mono transition-colors"
                    >
                      Authenticate via {authProvider.toUpperCase()} Gateway
                    </button>
                  </div>
                )}

                {otpSent && (
                  <div className="space-y-1">
                    <label htmlFor="p-otp-input" className="block text-[10px] font-mono font-bold text-slate-400 uppercase">One-Time Passcode</label>
                    <input
                      id="p-otp-input"
                      type="text"
                      required
                      maxLength={6}
                      placeholder="123456"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl text-center text-lg font-mono tracking-widest font-black"
                    />
                  </div>
                )}

                {authProvider === 'email' && (
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs font-mono uppercase tracking-wider"
                  >
                    {otpSent ? 'Verify & Access' : 'Send Enterprise Secure OTP'}
                  </button>
                )}
              </form>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full text-center text-[11px] font-mono text-emerald-700 hover:underline font-black cursor-pointer animate-pulse"
                >
                  ⚡ Direct Entry: Click to bypass login and load simulated credentials
                </button>
              </div>
            </div>

          </div>
        </section>
      ) : (
        /* RENDER CASE B: PORTAL INTERACTIVE SYSTEM WORKSPACE */
        <main className="max-w-7xl mx-auto py-10 px-4 space-y-10 text-left">
          
          {/* TOP BAR / MULTI-USER ROLE SELECTION CAROUSEL */}
          <section className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-widest uppercase">
                ACTIVE TENANT CONTEXT
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-display font-black">Securitas ESG Trust Portal</h2>
                <span className="bg-emerald-950 border border-emerald-500 text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {activeRoleDetails?.label}
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-xl">
                {activeRoleDetails?.desc}
              </p>
            </div>

            {/* Role Switcher Selector */}
            <div className="space-y-2 shrink-0">
              <label htmlFor="role-selector-input" className="block text-[10px] font-mono font-bold text-slate-400 uppercase text-right">Switch Team Role Role</label>
              <select
                id="role-selector-input"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {SYSTEM_ROLES.map(role => (
                  <option key={role.id} value={role.id}>{role.label}</option>
                ))}
              </select>
            </div>
          </section>

          {/* MAIN COLUMN SYSTEM GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT AREA: NAVIGATION & CALENDAR REMINDERS */}
            <div className="lg:col-span-3 space-y-6 text-left">
              
              {/* Navigation Cards */}
              <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/60 dark:border-zinc-800 p-4 space-y-1.5 shadow-sm">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-3 block mb-2">Partner Tabs</span>
                
                {[
                  { id: 'overview', label: '📊 Executive Analytics' },
                  { id: 'tracking', label: '🎯 Kanban & Milestones' },
                  { id: 'analytics', label: '📈 Interactive BI Graphs' },
                  { id: 'gis', label: '🗺️ GIS Karnataka Map' },
                  { id: 'documents', label: '📁 Document Vault' },
                  { id: 'volunteer', label: '🤝 Employee Volunteering' },
                  { id: 'collaboration', label: '💬 Team Workspaces' },
                  { id: 'support', label: '📞 Support Relationship' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePortalTab(tab.id as any)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      activePortalTab === tab.id 
                        ? 'bg-emerald-950 text-white font-extrabold border-l-4 border-emerald-500 shadow-sm'
                        : 'hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <ChevronRight size={12} className="opacity-40" />
                  </button>
                ))}
              </div>

              {/* Secure Notifications Activity Feed Widget */}
              <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/60 dark:border-zinc-800 p-5 space-y-4 shadow-sm">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Activity Feed</span>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                </h4>

                <div className="space-y-3">
                  {NOTIFICATIONS_CENTER_ITEMS.map((item, idx) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl space-y-1 text-left border border-slate-100">
                      <div className="flex justify-between items-start gap-1">
                        <h5 className="text-[11px] font-black text-slate-800 dark:text-white leading-normal">{item.title}</h5>
                        <span className="text-[8px] font-mono text-slate-400 shrink-0">{item.time}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-normal font-sans">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scheduled Meetings Widget */}
              <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/60 dark:border-zinc-800 p-5 space-y-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">Scheduled Audits</h4>
                  <button 
                    onClick={() => setShowScheduleModal(true)}
                    className="p-1 bg-emerald-50 text-emerald-800 rounded-lg hover:bg-emerald-100 transition-colors"
                    title="Book Meeting"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="space-y-3">
                  {MEETING_REMINDERS_FEED.map(meet => (
                    <div key={meet.id} className="p-3 bg-amber-500/5 rounded-2xl border border-amber-500/20 space-y-1 text-left">
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[8px] font-mono uppercase font-bold tracking-wider">{meet.platform}</span>
                      <h5 className="text-[11px] font-bold text-slate-800 dark:text-white pt-1">{meet.title}</h5>
                      <p className="text-[10px] text-slate-500 font-mono">Date: {meet.date} at {meet.time}</p>
                      <p className="text-[9px] text-slate-400 font-mono">Host: {meet.host}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT AREA: TAB CONTAINER CONTENT */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* TAB 1: EXECUTIVE ANALYTICS OVERVIEW */}
              {activePortalTab === 'overview' && (
                <div className="space-y-6 animate-fade-in text-left">
                  
                  {/* Bento Scorecards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-200 rounded-3xl text-left space-y-2 shadow-sm">
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Active CSR Commitments</p>
                      <h3 className="text-3xl font-display font-black text-slate-900 dark:text-white">₹52,70,000</h3>
                      <p className="text-xs text-emerald-600 font-mono">92.0% Escrow Utilization Rate</p>
                    </div>

                    <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-200 rounded-3xl text-left space-y-2 shadow-sm">
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Beneficiaries Catalyzed</p>
                      <h3 className="text-3xl font-display font-black text-slate-900 dark:text-white">10,000+</h3>
                      <p className="text-xs text-slate-500 font-mono">6,200 women dairy partners</p>
                    </div>

                    <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-200 rounded-3xl text-left space-y-2 shadow-sm">
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Employee Volunteer Hours</p>
                      <h3 className="text-3xl font-display font-black text-slate-900 dark:text-white">480 Hrs</h3>
                      <p className="text-xs text-amber-600 font-mono">+12% over last quarter</p>
                    </div>
                  </div>

                  {/* Summary progress report card */}
                  <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 rounded-3xl shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider block">QUARTERLY ESG GOAL METRICS</span>
                        <h4 className="text-base font-bold text-slate-800 dark:text-white">Haveri Smart Drip Cluster (Phase II)</h4>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-500">₹12.5L Outlay Completed</span>
                    </div>

                    <div className="w-full h-3 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden border border-slate-150">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: '68%' }} />
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      🌾 Current milestone achievement rate is at <strong>68% complete</strong>. Soil humic bio-diagnostics are finished, solar panels are delivered. Next critical path is localized Panchayat calibration reviews.
                    </p>
                  </div>

                  {/* AI CSR Copilot Live Chat Area inside Overview */}
                  <div className="p-6 bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-950 rounded-3xl text-white space-y-4 relative overflow-hidden shadow-xl">
                    <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600")' }} />
                    
                    <div className="flex justify-between items-center relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="p-1 bg-emerald-500 rounded text-slate-950">
                          <Sparkles size={14} className="animate-pulse" />
                        </span>
                        <h4 className="text-sm font-bold font-display tracking-wide uppercase">AI CSR Copilot Assistant</h4>
                      </div>
                      <span className="bg-emerald-950 text-emerald-400 font-mono text-[9px] px-2 py-0.5 rounded border border-emerald-800 font-bold">Online</span>
                    </div>

                    {/* Chat log window */}
                    <div className="h-56 overflow-y-auto p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs font-mono space-y-4">
                      {copilotMessages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] p-3 rounded-2xl text-left ${
                            msg.sender === 'user' 
                              ? 'bg-emerald-600 text-white rounded-br-none' 
                              : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                          }`}>
                            <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                            <span className="block text-[8px] text-slate-500 text-right pt-1 font-mono">{msg.timestamp}</span>
                          </div>
                        </div>
                      ))}
                      {copilotTyping && (
                        <div className="flex justify-start">
                          <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-bl-none text-slate-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </div>
                      )}
                      <div ref={copilotEndRef} />
                    </div>

                    {/* Input Chat line */}
                    <form onSubmit={handleCopilotSend} className="flex gap-2 relative z-10">
                      <input
                        type="text"
                        placeholder="Ask AI Copilot (e.g. Explain our SDG-13 mapping details)..."
                        value={copilotInput}
                        onChange={(e) => setCopilotInput(e.target.value)}
                        className="flex-1 bg-slate-900 text-white border border-slate-800 px-4 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none focus:bg-slate-950"
                      />
                      <button 
                        type="submit" 
                        disabled={copilotTyping}
                        className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0"
                      >
                        <SendHorizontal size={14} />
                      </button>
                    </form>
                  </div>

                </div>
              )}

              {/* TAB 2: KANBAN TRACKING & DELIVERABLES */}
              {activePortalTab === 'tracking' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div className="space-y-0.5">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Kanban Project Monitoring</h3>
                      <p className="text-xs text-slate-400">Live operational lifecycle tracking across Raita Mitra agrarian programs.</p>
                    </div>

                    {/* Filter tabs */}
                    <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-mono shrink-0">
                      {['All', 'In Progress', 'Completed', 'In Planning'].map(filter => (
                        <button
                          key={filter}
                          onClick={() => setKanbanFilter(filter as any)}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                            kanbanFilter === filter ? 'bg-emerald-950 text-white shadow' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Kanban Cards Columns layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredKanban.map(proj => (
                      <div key={proj.id} className="p-6 bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 rounded-3xl shadow-sm flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                              proj.stage === 'Completed' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : proj.stage === 'In Progress' 
                                  ? 'bg-amber-100 text-amber-800' 
                                  : 'bg-indigo-100 text-indigo-800'
                            }`}>
                              ● {proj.stage}
                            </span>
                            <span className="text-xs font-mono text-slate-400">{proj.timeline}</span>
                          </div>

                          <h4 className="text-sm font-bold text-slate-800 dark:text-white">{proj.title}</h4>
                          <p className="text-xs text-slate-400 font-mono">Budget Allocated: {proj.budget}</p>

                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-600 h-full" style={{ width: `${proj.progress}%` }} />
                          </div>

                          {/* Deliverable list */}
                          <div className="space-y-1.5 pt-2 border-t border-slate-50">
                            <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">Milestone Progress:</span>
                            <div className="space-y-1 text-xs">
                              {proj.deliverables.map((del, dIdx) => (
                                <div key={dIdx} className="flex items-center gap-1.5 text-slate-600">
                                  <span className="text-emerald-600">✓</span>
                                  <span>{del}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-slate-50 text-[10px] font-mono">
                          <span className={`px-2 py-0.5 rounded ${proj.risk === 'Low' || proj.risk === 'None' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                            Risk Indicator: {proj.risk}
                          </span>
                          <span className="text-slate-400">Updated: 2 days ago</span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 3: INTERACTIVE BI GRAPH DASHBOARDS */}
              {activePortalTab === 'analytics' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Interactive BI & SDG Analytics</h3>
                    <p className="text-xs text-slate-400">Power BI-comparable charts showcasing gender equality parameters and Year-over-Year funding structures.</p>
                  </div>

                  {/* Charts Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* SDG Allocation (Radial / Bar chart mapping) */}
                    <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-200/60 rounded-3xl space-y-4">
                      <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">UN SDG Integration Matrix</h4>
                      
                      <div className="h-60 w-full pt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={SDG_MAPPING_DATA} layout="vertical" margin={{ left: -10, right: 10 }}>
                            <XAxis type="number" fontSize={10} className="font-mono" />
                            <YAxis dataKey="name" type="category" width={110} fontSize={9} className="font-mono" />
                            <Tooltip formatter={(value) => `${value}% Match`} />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                              {SDG_MAPPING_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed text-center">
                        Highest mapping index registered in <strong>SDG 13 (Climate Action)</strong> and <strong>SDG 4 (Education)</strong>.
                      </p>
                    </div>

                    {/* Gender Distribution (Pie Chart) */}
                    <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-200/60 rounded-3xl space-y-4">
                      <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Gender Representation Ratios</h4>
                      
                      <div className="h-52 w-full flex items-center justify-center relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={GENDER_DISTRIBUTION_DATA}
                              cx="50%"
                              cy="50%"
                              innerRadius={45}
                              outerRadius={65}
                              paddingAngle={4}
                              dataKey="value"
                            >
                              {GENDER_DISTRIBUTION_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value} Catalyzed`} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                          <span className="text-2xl font-black font-mono text-slate-800">62%</span>
                          <span className="text-[8px] font-mono text-slate-400 uppercase">Female led</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs font-mono">
                        <div className="flex justify-between text-[11px] text-slate-600">
                          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-teal-600 rounded-full" /> Female</span>
                          <strong>6,200 (62.0%)</strong>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-600">
                          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-amber-500 rounded-full" /> Male</span>
                          <strong>3,800 (38.0%)</strong>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* YoY growth (Line chart) */}
                  <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-200/60 rounded-3xl space-y-4">
                    <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Year-on-Year Growth (CSR Funding vs Families Reached)</h4>
                    
                    <div className="h-64 w-full pt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={YEAR_OVER_YEAR_GROWTH} margin={{ left: -15, right: 10 }}>
                          <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} className="font-mono" />
                          <YAxis stroke="#94a3b8" fontSize={10} className="font-mono" />
                          <Tooltip />
                          <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
                          <Line type="monotone" dataKey="CSR Funds (Lakhs)" stroke="#0d9488" strokeWidth={2.5} activeDot={{ r: 6 }} />
                          <Line type="monotone" dataKey="Families Reached" stroke="#f59e0b" strokeWidth={2.5} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 4: GIS INTERACTIVE KARNATAKA MAP */}
              {activePortalTab === 'gis' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">GIS Project Karnataka Map</h3>
                    <p className="text-xs text-slate-400">View real-time, high-contrast visual mappings of active village nodes and geo-tagged photographs.</p>
                  </div>

                  {/* Simulated Karnataka Map Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                    
                    {/* Visual Map Simulator */}
                    <div className="md:col-span-8 p-6 bg-slate-950 text-white rounded-3xl flex flex-col justify-between relative overflow-hidden min-h-[380px] border border-slate-800">
                      
                      {/* Grid Lines mockup representing maps coordinates */}
                      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 pointer-events-none">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div key={i} className="border border-slate-700" />
                        ))}
                      </div>

                      {/* Map Pins representation */}
                      <div className="relative z-10 flex-1 flex flex-col justify-center items-center py-10">
                        {/* Map Boundary box represent Karnataka outline */}
                        <div className="w-64 h-72 border-2 border-dashed border-emerald-500/20 rounded-full flex flex-col justify-center items-center relative bg-emerald-500/5">
                          
                          {/* Pin 1 Haveri */}
                          <div className="absolute top-1/3 left-1/4 animate-bounce">
                            <span className="p-1 bg-amber-400 text-slate-950 rounded-full text-[9px] font-mono font-bold flex items-center gap-1 shadow-md">
                              <MapPin size={11} className="fill-slate-950" />
                              Haveri Cluster (Active)
                            </span>
                          </div>

                          {/* Pin 2 Savanur */}
                          <div className="absolute top-1/2 left-1/2 animate-bounce [animation-delay:0.3s]">
                            <span className="p-1 bg-emerald-500 text-slate-950 rounded-full text-[9px] font-mono font-bold flex items-center gap-1 shadow-md">
                              <MapPin size={11} className="fill-slate-950" />
                              Savanur Girls Hub
                            </span>
                          </div>

                          {/* Pin 3 Kundgol */}
                          <div className="absolute top-2/3 left-1/3 animate-bounce [animation-delay:0.6s]">
                            <span className="p-1 bg-sky-400 text-slate-950 rounded-full text-[9px] font-mono font-bold flex items-center gap-1 shadow-md">
                              <MapPin size={11} className="fill-slate-950" />
                              Kundgol Soil Grid
                            </span>
                          </div>

                          <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest block pt-28">Karnataka Geo Area (Mockup)</span>
                        </div>
                      </div>

                      <div className="relative z-10 p-3 bg-slate-900 border border-slate-800 rounded-2xl flex justify-between items-center text-xs">
                        <span className="text-slate-400">Total Monitored Village Nodes: <strong>34 Villages</strong></span>
                        <span className="text-[10px] text-emerald-400 font-mono">GPS Heat Mapped</span>
                      </div>
                    </div>

                    {/* Left side geo photo links */}
                    <div className="md:col-span-4 space-y-4">
                      <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider block">Geo-Tagged Field Photos</span>
                      
                      {GEO_ACTIVITIES_GALLERY.map(photo => (
                        <button
                          key={photo.id}
                          onClick={() => setLightboxImg(photo)}
                          className="w-full p-3 bg-white dark:bg-zinc-900 border border-slate-200 rounded-2xl text-left hover:border-emerald-600 transition-all flex gap-3 cursor-pointer"
                        >
                          <img src={photo.img} alt={photo.title} className="w-14 h-14 rounded-lg object-cover bg-slate-100" />
                          <div className="space-y-0.5 min-w-0">
                            <h5 className="text-xs font-bold text-slate-800 dark:text-white truncate">{photo.title}</h5>
                            <p className="text-[10px] text-slate-400 font-mono">{photo.location}</p>
                            <p className="text-[9px] text-emerald-600 font-mono">{photo.coordinates}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                  </div>

                </div>
              )}

              {/* TAB 5: COMPLIANCE & DOCUMENT VAULT */}
              {activePortalTab === 'documents' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Compliance & Document Repository</h3>
                    <p className="text-xs text-slate-400">Secure folder structure verifying Raita Mitra statutory approvals, CSR-1 Ministry filings and audits.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {COMPLIANCE_DOCUMENTS.map(doc => (
                      <div key={doc.code} className="p-5 bg-white dark:bg-zinc-900 border border-slate-200 rounded-3xl shadow-sm flex flex-col justify-between space-y-4">
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-start">
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-mono font-bold">{doc.code}</span>
                            <span className="text-[10px] font-mono text-slate-400">{doc.date}</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white">{doc.name}</h4>
                          <p className="text-[11px] text-slate-500 font-sans leading-normal">{doc.desc}</p>
                        </div>

                        <div className="flex gap-2 pt-2 border-t border-slate-50">
                          <button
                            onClick={() => simulateDocDownload(doc)}
                            className="flex-1 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-850 text-[10px] font-bold rounded-lg border border-emerald-200 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Download size={12} />
                            <span>{downloadingDocCode === doc.code ? 'Signing...' : 'Download PDF'}</span>
                          </button>

                          <button
                            onClick={() => setPreviewDoc(doc)}
                            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[10px] font-bold rounded-lg border border-slate-200 transition-all cursor-pointer"
                          >
                            <Eye size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 6: EMPLOYEE VOLUNTEERING TRACK */}
              {activePortalTab === 'volunteer' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Employee Volunteering Hub</h3>
                    <p className="text-xs text-slate-400">Review corporate participant directories and accredited mentor hours from Haveri and Savanur school projects.</p>
                  </div>

                  <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-200 rounded-3xl space-y-4 shadow-sm">
                    <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">Corporate Volunteer Roll Draft</h4>
                    
                    <div className="space-y-3">
                      {[
                        { name: 'Sameer Kulkarni', hours: 24, campaign: 'Savanur Touchscreen Software Class', email: 'sameer.k@securitas-esg.com' },
                        { name: 'Kavita Rao', hours: 18, campaign: 'Kundgol Drylands Soil Health Camps', email: 'kavita.r@securitas-esg.com' },
                        { name: 'Vikram Joshi', hours: 12, campaign: 'General Women Cooperative Training', email: 'vikram.j@securitas-esg.com' }
                      ].map((vol, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-2xl flex justify-between items-center text-xs border border-slate-100">
                          <div className="space-y-0.5">
                            <h5 className="font-bold text-slate-800 dark:text-white">{vol.name}</h5>
                            <p className="text-[10px] text-slate-400 font-mono">{vol.email}</p>
                            <p className="text-[10px] text-emerald-600 font-mono">Assigned: {vol.campaign}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="block text-base font-bold font-mono text-emerald-800">{vol.hours}h</span>
                            <span className="text-[9px] text-slate-400 font-mono uppercase">Verified</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 7: COLLABORATION WORKSPACE */}
              {activePortalTab === 'collaboration' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Collaboration Workspace</h3>
                    <p className="text-xs text-slate-400">Share files, track pending audit chores, and comment on agrarian timelines in real-time.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    
                    {/* Real Checklist Task Chore simulator */}
                    <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-200 rounded-3xl space-y-4 shadow-sm">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Team Checklist Tasks</h4>
                        <button 
                          onClick={deleteCompletedTasks}
                          className="text-[10px] font-mono font-bold text-rose-600 hover:underline cursor-pointer"
                        >
                          Clear Finished
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {collaborationTasks.map(task => (
                          <label 
                            key={task.id} 
                            className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50/50 cursor-pointer text-xs"
                          >
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => toggleTaskCompleted(task.id)}
                              className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <div className="space-y-0.5">
                              <p className={`font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>{task.task}</p>
                              <span className="block text-[9px] font-mono text-slate-400">Assigned: {task.assignedTo}</span>
                            </div>
                          </label>
                        ))}
                      </div>

                      <form onSubmit={handleAddTask} className="pt-3 border-t flex gap-2">
                        <input
                          type="text"
                          required
                          placeholder="New partner task..."
                          value={newTaskInput}
                          onChange={(e) => setNewTaskInput(e.target.value)}
                          className="flex-1 px-3 py-1.5 border rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <select
                          value={newTaskAssignee}
                          onChange={(e) => setNewTaskAssignee(e.target.value)}
                          className="px-2 py-1.5 border rounded-xl text-xs bg-white text-slate-700 focus:outline-none"
                        >
                          <option value="CSR Head">CSR Head</option>
                          <option value="Finance Team">Finance</option>
                          <option value="HR Coordinator">HR</option>
                        </select>
                        <button type="submit" className="p-1.5 bg-slate-900 text-emerald-400 rounded-xl hover:bg-slate-800 cursor-pointer">
                          <Plus size={14} />
                        </button>
                      </form>
                    </div>

                    {/* Shared Board Comments Board */}
                    <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-200 rounded-3xl space-y-4 shadow-sm">
                      <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest pb-2 border-b">Board Conversation Feed</h4>
                      
                      <div className="space-y-3 h-60 overflow-y-auto">
                        {collabComments.map(c => (
                          <div key={c.id} className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-2xl text-xs border border-slate-100 text-left space-y-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="font-bold text-slate-800 dark:text-white block">{c.author}</span>
                                <span className="text-[9px] font-mono text-slate-400">{c.role}</span>
                              </div>
                              <span className="text-[8px] font-mono text-slate-400">{c.timestamp}</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 font-sans leading-normal">{c.text}</p>
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleAddComment} className="flex gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Write a message to trust officials..."
                          value={newCommentInput}
                          onChange={(e) => setNewCommentInput(e.target.value)}
                          className="flex-1 px-3 py-2 border rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <button type="submit" className="px-3 py-2 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold cursor-pointer">
                          Send
                        </button>
                      </form>
                    </div>

                  </div>

                </div>
              )}

              {/* TAB 8: PARTNER RELATIONSHIP DESK */}
              {activePortalTab === 'support' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Partner Relationship Desk</h3>
                    <p className="text-xs text-slate-400">Direct contact channels with Raita Mitra state coordinators and lead trustees.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-sm text-left">
                      <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl inline-block">
                        <Users size={20} />
                      </div>
                      <h4 className="text-xs font-bold text-slate-800">Lead Relationship Trustee</h4>
                      <p className="text-[11px] text-slate-500">Mr. Sanjay Deshpande, Regional Executive Coordinator</p>
                      <p className="text-[10px] font-mono text-emerald-700">sanjay@raitamitra.org</p>
                    </div>

                    <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-sm text-left">
                      <div className="p-3 bg-amber-50 text-amber-700 rounded-2xl inline-block">
                        <ShieldCheck size={20} />
                      </div>
                      <h4 className="text-xs font-bold text-slate-800">CA Compliance Officer</h4>
                      <p className="text-[11px] text-slate-500">Mrs. Priya Hegde, Audits & Statutory Registers</p>
                      <p className="text-[10px] font-mono text-amber-700">compliance@raitamitra.org</p>
                    </div>

                    <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-sm text-left">
                      <div className="p-3 bg-sky-50 text-sky-700 rounded-2xl inline-block">
                        <PhoneCall size={20} />
                      </div>
                      <h4 className="text-xs font-bold text-slate-800">Direct Trust Hotline</h4>
                      <p className="text-[11px] text-slate-500">Karnataka Head Office Desk (Mon - Fri, 09:30 AM - 05:30 PM)</p>
                      <p className="text-[10px] font-mono text-sky-700">+91 80 4920 1823</p>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>

          {/* SECURE FAQ ACCORDION PANEL FOR PARTNERS */}
          <section className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 rounded-3xl p-6 text-left space-y-6">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-display">Compliance FAQ Centre</h3>
            
            <div className="space-y-3.5">
              {FAQ_ACCORDION.map((faq, idx) => (
                <div key={idx} className="border-b border-slate-100 dark:border-zinc-800 pb-3">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full text-left font-bold text-xs text-slate-800 dark:text-white hover:text-emerald-700 flex justify-between items-center focus:outline-none py-1.5 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={14} className={`transform transition-transform ${activeFaq === idx ? 'rotate-180 text-emerald-700' : 'text-slate-400'}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-slate-500 leading-relaxed font-sans pt-2 pl-1 whitespace-pre-line">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* LIGHTBOX PREVIEW MODAL */}
          <AnimatePresence>
            {lightboxImg && (
              <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                <div className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 flex flex-col relative text-white">
                  <button 
                    onClick={() => setLightboxImg(null)} 
                    className="absolute top-4 right-4 p-2 bg-slate-950/80 rounded-full hover:bg-slate-950 transition-colors cursor-pointer text-slate-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>

                  <img src={lightboxImg.img} alt={lightboxImg.title} className="max-h-[65vh] w-full object-cover bg-slate-950" />
                  
                  <div className="p-6 text-left space-y-2 bg-slate-950">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">{lightboxImg.coordinates}</span>
                    <h4 className="text-base font-bold font-display">{lightboxImg.title}</h4>
                    <p className="text-xs text-slate-400">Village: {lightboxImg.location} • Certified Geo-Audit Verification</p>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* MEETING SCHEDULER MODAL */}
          <AnimatePresence>
            {showScheduleModal && (
              <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-3xl p-6 border shadow-2xl text-left space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <h4 className="text-sm font-extrabold text-slate-900 font-display">Schedule Trust Performance Review</h4>
                    <button onClick={() => setShowScheduleModal(false)} className="text-slate-400 hover:text-slate-700">
                      <X size={16} />
                    </button>
                  </div>

                  <form onSubmit={handleCreateMeeting} className="space-y-4 text-xs font-mono">
                    <div>
                      <label htmlFor="sched-title-input" className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Meeting Title</label>
                      <input
                        id="sched-title-input"
                        type="text"
                        required
                        value={scheduleForm.title}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, title: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="sched-date-input" className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Date</label>
                        <input
                          id="sched-date-input"
                          type="date"
                          required
                          value={scheduleForm.date}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label htmlFor="sched-time-input" className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Time</label>
                        <input
                          id="sched-time-input"
                          type="text"
                          required
                          value={scheduleForm.time}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="sched-platform-input" className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Video Platform</label>
                      <select
                        id="sched-platform-input"
                        value={scheduleForm.platform}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, platform: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl text-xs bg-white text-slate-700"
                      >
                        <option value="Microsoft Teams">Microsoft Teams</option>
                        <option value="Google Meet">Google Meet</option>
                        <option value="Zoom Link">Zoom Video Meeting</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all uppercase tracking-wider"
                    >
                      Book Video Sync
                    </button>
                  </form>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* COMPLIANCE DOCUMENT PREVIEW MODAL */}
          <AnimatePresence>
            {previewDoc && (
              <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                <div className="max-w-2xl w-full bg-white rounded-3xl p-6 border shadow-2xl text-left space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-widest">Document Vault Preview</span>
                      <h4 className="text-sm font-extrabold text-slate-900 font-display">{previewDoc.name}</h4>
                    </div>
                    <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-slate-700">
                      <X size={16} />
                    </button>
                  </div>

                  <div className="p-8 bg-slate-50 border border-dashed rounded-2xl flex flex-col items-center justify-center space-y-3">
                    <div className="p-4 bg-emerald-50 text-emerald-700 rounded-full">
                      <ShieldCheck size={36} />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-xs font-bold text-slate-800">Secure Cryptographic Signature Active</p>
                      <p className="text-[10px] font-mono text-slate-400">SHA256 File Signature: 5e381ca04df...832014b</p>
                    </div>
                    <div className="text-[11px] text-slate-500 font-sans max-w-md text-center leading-normal">
                      This official statutory copy of <em>{previewDoc.name}</em> is certified under Ministry of Corporate Affairs regulations and is fully cleared for public board review.
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setPreviewDoc(null);
                        simulateDocDownload(previewDoc);
                      }}
                      className="flex-1 py-2 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider text-center cursor-pointer"
                    >
                      Download Verified PDF ({previewDoc.size})
                    </button>
                    <button
                      onClick={() => setPreviewDoc(null)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>

        </main>
      )}

    </div>
  );
}
