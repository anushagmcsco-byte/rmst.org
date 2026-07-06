import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, GraduationCap, HeartHandshake, Globe, FileText, UserCheck, Award, 
  ChevronRight, ChevronLeft, Check, CheckCircle, HelpCircle, ArrowRight, 
  Building, Trees, Stethoscope, Laptop, Heart, MapPin, Sparkles, 
  MessageSquare, Database, Share2, Send, Calendar, Lock, Clock, Search,
  TrendingUp, BarChart2, Shield, PlusCircle, CheckSquare, Star, MessageCircle, Phone, BookOpen
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

interface VolunteerProps {
  highContrast: boolean;
}

export default function Volunteer({ highContrast }: VolunteerProps) {
  // Main Navigation state: 'landing' (public) or 'portal' (gamified workspace)
  const [viewMode, setViewMode] = useState<'landing' | 'portal'>('portal');
  
  // Authentication status inside portal
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authMethod, setAuthMethod] = useState<string>('');
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // Active sub-section inside logged-in portal
  const [portalTab, setPortalTab] = useState<'dashboard' | 'opportunities' | 'academy' | 'schedule' | 'hours' | 'certificates' | 'community' | 'leaderboard' | 'support'>('dashboard');

  // Simulated Volunteer User State
  const [userProfile, setUserProfile] = useState({
    fullName: "Anusha Gowda",
    email: "anusha.gmcsco@gmail.com",
    mobile: "+91 98452 10321",
    address: "HSR Layout, Bengaluru, Karnataka",
    education: "B.Tech in Computer Science",
    profession: "Software Engineer",
    skills: "React, Python, Data Analytics, Curriculum Design",
    languages: "Kannada, English, Hindi",
    linkedin: "linkedin.com/in/anushagowda",
    areasOfInterest: "Teaching & AI Skills",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    volunteerId: "RMST-VOL-5231",
    points: 2450,
    level: 4,
    hoursApproved: 38,
    badges: ["Soil Pioneer", "STEM Mentor", "CSR Catalyst"]
  });

  // Profile Edit fields
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...userProfile });

  // Quiz State (Trailhead style)
  const [quizStarted, setQuizStarted] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  // Simulated live state arrays
  const [userHoursLogs, setUserHoursLogs] = useState([
    { id: 1, date: "2026-06-15", project: "STEM Literacy Lab", hours: 4, status: "Approved", description: "Delivered Scratch programming block logic to Savanur girls." },
    { id: 2, date: "2026-06-22", project: "STEM Literacy Lab", hours: 4, status: "Approved", description: "Conducted Python fundamentals workshop." },
    { id: 3, date: "2026-06-28", project: "Climate Action Bunds", hours: 6, status: "Approved", description: "Soil health audit & linear aquifer diagnostics in Shiggaon." },
    { id: 4, date: "2026-07-04", project: "Soil Diagnostics Camp", hours: 5, status: "Pending", description: "Soil carbon profiling and dryland farmer registration." }
  ]);

  // Hours logging form state
  const [newLog, setNewLog] = useState({
    date: new Date().toISOString().split('T')[0],
    project: "STEM Literacy Lab",
    hours: 4,
    description: ""
  });
  
  // Application checklist statuses
  const [appliedRoles, setAppliedRoles] = useState<Record<string, string>>({
    "Teaching & AI Skills": "Screening"
  });

  // Active scheduler / task items
  const [events, setEvents] = useState([
    { id: 1, title: "STEM Classroom Session", date: "2026-07-11", time: "10:00 AM - 01:00 PM", location: "Dharwad Government High School", meetLink: "https://meet.google.com/abc-defg-hij" },
    { id: 2, title: "Haveri Soil Audit Mobilization", date: "2026-07-18", time: "08:30 AM - 04:00 PM", location: "Savanur Cluster Venues", meetLink: "https://meet.google.com/xyz-pqrs-tuv" },
    { id: 3, title: "Onboarding Call with Chapter Coordinator", date: "2026-07-08", time: "05:00 PM - 05:30 PM", location: "Virtual Video Briefing", meetLink: "https://meet.google.com/mnp-qrst-uvw" }
  ]);

  // Active Forum Posts state
  const [forumPosts, setForumPosts] = useState([
    { id: 1, author: "Dr. Ramesh Patil", role: "Agronomist (Retired)", text: "Just completed our 14th dryland soil health report diagnostics in Kundgol. The farmers were incredibly receptive to micro-nutrient bio-enrichment suggestions!", likes: 24, liked: false, comments: ["Kudos, Ramesh sir!", "Inspirational field work!"] },
    { id: 2, author: "Sanjay Kumar", role: "Student Volunteer", text: "Excited to share that 20 state-school girls successfully ran their first nested loops in Python today in our solar touchscreen lab! Incredible feeling.", likes: 42, liked: false, comments: ["Brilliant achievement!", "STEM education is powerful."] }
  ]);
  const [newPostText, setNewPostText] = useState("");
  const [newCommentTexts, setNewCommentTexts] = useState<Record<number, string>>({});

  // Reset scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [viewMode, portalTab]);

  const handleLogin = (method: string) => {
    setAuthMethod(method);
    setAuthLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setAuthLoading(false);
    }, 1500);
  };

  const handleLogHours = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.description.trim()) return;
    const newEntry = {
      id: Date.now(),
      date: newLog.date,
      project: newLog.project,
      hours: Number(newLog.hours),
      status: "Approved", // Auto-approved for premium user simulation
      description: newLog.description
    };
    setUserHoursLogs([newEntry, ...userHoursLogs]);
    setUserProfile(prev => ({
      ...prev,
      hoursApproved: prev.hoursApproved + newEntry.hours,
      points: prev.points + (newEntry.hours * 25)
    }));
    setNewLog({
      date: new Date().toISOString().split('T')[0],
      project: "STEM Literacy Lab",
      hours: 4,
      description: ""
    });
  };

  const handleSaveProfile = () => {
    setUserProfile({ ...editedProfile });
    setIsEditingProfile(false);
  };

  const handleForumPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    const newPost = {
      id: Date.now(),
      author: userProfile.fullName,
      role: `${userProfile.profession} (Volunteer)`,
      text: newPostText,
      likes: 0,
      liked: false,
      comments: []
    };
    setForumPosts([newPost, ...forumPosts]);
    setNewPostText("");
  };

  const handleAddComment = (postId: number) => {
    const commentText = newCommentTexts[postId];
    if (!commentText || !commentText.trim()) return;
    setForumPosts(forumPosts.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, commentText] };
      }
      return p;
    }));
    setNewCommentTexts({ ...newCommentTexts, [postId]: "" });
  };

  const handleLikePost = (postId: number) => {
    setForumPosts(forumPosts.map(p => {
      if (p.id === postId) {
        return { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked };
      }
      return p;
    }));
  };

  // Simulated Quiz Data for Course Assessment
  const academyCourses = [
    { id: "orientation", title: "Volunteer Orientation 101", duration: "1.5 hrs", level: "Beginner", xp: 150, badge: "Onboarding Star", questions: [
      { q: "What is the primary mission of Raita Mitra Social Trust?", options: ["Rural agrarian & digital community development", "Urban infrastructure development", "Pure commercial retail farming"], correct: 0 },
      { q: "Who does Raita Mitra primarily focus on empowering in rural areas?", options: ["Large estate developers", "Dryland smallholders, women cooperatives, and rural students", "Commercial agrochemical conglomerates"], correct: 1 }
    ]},
    { id: "community", title: "Effective Community Mobilization", duration: "2 hrs", level: "Intermediate", xp: 200, badge: "Community Voice", questions: [
      { q: "When entering a village for field audits, who is the primary stakeholder to align with?", options: ["Local Gram Panchayat & community leaders", "External state police forces", "Private soil chemical retailers"], correct: 0 },
      { q: "What strategy works best to encourage farmer participation in soil health drives?", options: ["Coercion and fees", "Actionable, transparent bio-fertilizer demonstration and cost-benefit reports", "Direct commercial cash giveaways"], correct: 1 }
    ]},
    { id: "digital", title: "Empowering Girls with Tech and AI", duration: "3 hrs", level: "Advanced", xp: 300, badge: "STEM Mentor Extraordinaire", questions: [
      { q: "What is the core pedagogical tool inside Raita Mitra touchscreen labs?", options: ["Text-heavy rote learning manuals", "Interactive Scratch, Python blocks, and local coding frameworks", "Standard commercial accounting spreadsheets only"], correct: 1 }
    ]}
  ];

  const handleStartQuiz = (courseId: string) => {
    setQuizStarted(courseId);
    setAnswers({});
    setQuizScore(null);
  };

  const handleAnswerSubmit = (courseId: string) => {
    const course = academyCourses.find(c => c.id === courseId);
    if (!course) return;
    let correctCount = 0;
    course.questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) correctCount++;
    });
    const finalScore = Math.round((correctCount / course.questions.length) * 100);
    setQuizScore(finalScore);

    if (finalScore >= 80) {
      // Award XP points and add badge
      setUserProfile(prev => {
        const updatedBadges = prev.badges.includes(course.badge) ? prev.badges : [...prev.badges, course.badge];
        return {
          ...prev,
          points: prev.points + course.xp,
          badges: updatedBadges
        };
      });
    }
  };

  // Chart Data preparation
  const chartData = [
    { name: "Jan", Hours: 4, Points: 100 },
    { name: "Feb", Hours: 12, Points: 300 },
    { name: "Mar", Hours: 18, Points: 450 },
    { name: "Apr", Hours: 22, Points: 550 },
    { name: "May", Hours: 30, Points: 750 },
    { name: "Jun", Hours: userHoursLogs.filter(l => l.date.includes("2026-06") && l.status === "Approved").reduce((sum, current) => sum + current.hours, 0), Points: 950 },
    { name: "Jul", Hours: userHoursLogs.filter(l => l.date.includes("2026-07") && l.status === "Approved").reduce((sum, current) => sum + current.hours, 0), Points: 1050 }
  ];

  return (
    <div className={`w-full min-h-screen ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* GLOBAL BANNER TOGGLE BETWEEN LANDING VIEW AND THE PORTAL WORKSPACE */}
      <div className="bg-slate-900 text-white py-3 px-4 flex flex-col md:flex-row justify-between items-center gap-3 border-b border-slate-800 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 bg-emerald-600 rounded-lg text-white">
            <Award className="w-5 h-5 animate-pulse" />
          </span>
          <div className="text-left">
            <h4 className="text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
              Raita Mitra Changemaker Ecosystem
              <span className="bg-amber-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded-full">v2.1</span>
            </h4>
            <p className="text-[10px] text-slate-400 font-mono">Inspired by UN Volunteers, UNICEF Volunteers & Salesforce Trailhead</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('landing')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'landing' 
                ? 'bg-amber-400 text-slate-900 font-extrabold shadow-md' 
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            📢 Public Site View
          </button>
          <button
            onClick={() => setViewMode('portal')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              viewMode === 'portal' 
                ? 'bg-emerald-600 text-white font-extrabold shadow-md' 
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            🏆 Volunteer Portal Workspace {isLoggedIn && "• Active"}
          </button>
        </div>
      </div>

      {/* VIEW MODE A: PUBLIC LANDING PAGE */}
      {viewMode === 'landing' ? (
        <div className="animate-fade-in">
          {/* Public Hero section */}
          <section className="relative py-20 bg-slate-950 text-white text-center overflow-hidden px-4">
            <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center"></div>
            <div className="relative z-10 max-w-4xl mx-auto space-y-6">
              <span className="px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-[10px] font-mono tracking-widest font-bold inline-flex items-center gap-1">
                <Sparkles size={12} /> VOLUNTEERING SCHEMES
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-black leading-tight text-white">
                Become A Force For <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-amber-500">
                  Sustainable Agrarian Growth
                </span>
              </h1>
              <p className="text-slate-300 text-xs md:text-sm lg:text-base max-w-2xl mx-auto leading-relaxed">
                Raita Mitra Social Trust invites students, developers, agronomists, and corporate CSR groups to contribute directly to soil audits, crop-tech literacy, and digital laboratories in Karnataka.
              </p>
              <div className="pt-4 flex gap-3 justify-center">
                <button 
                  onClick={() => { setViewMode('portal'); setIsLoggedIn(false); }}
                  className="px-6 py-3 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-900 transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <UserCheck size={14} /> REGISTER / SIGN IN NOW
                </button>
                <button 
                  onClick={() => { setViewMode('portal'); setIsLoggedIn(true); setPortalTab('opportunities'); }}
                  className="px-6 py-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 transition-colors cursor-pointer"
                >
                  VIEW ACTIVE CAMPAIGNS
                </button>
              </div>
            </div>
          </section>

          {/* Core Paths bento */}
          <section className="py-16 px-4 max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-4xl font-black font-display text-slate-900 dark:text-white">Our Strategic Engagement Categories</h2>
              <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto">We design specific, highly organized tracks that fit your precise background.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Agriculture Program Support", icon: Trees, desc: "Participate in soil sample extractions, direct bio-inoculant distribution drives, and georeferenced crop data tracking in Haveri." },
                { title: "Teaching & Tech Mentorship", icon: Laptop, desc: "Facilitate custom block-programming Scratch modules or Python data fundamentals inside our solar-powered village high school labs." },
                { title: "Corporate ESG & Advisory Support", icon: Building, desc: "Empower dairy and organic packaging micro-cooperatives on bank ledger reconciliation, logistics optimization, and legal registrations." }
              ].map((path, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all space-y-4 text-left">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl inline-block">
                    <path.icon size={24} />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-white">{path.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{path.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        /* VIEW MODE B: INTERACTIVE VOLUNTEER PORTAL WORKSPACE */
        <div className="animate-fade-in font-sans">
          
          {/* PORTAL CASE A: AUTHENTICATION FLOW */}
          {!isLoggedIn ? (
            <div className="max-w-6xl mx-auto py-12 px-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-slate-200/60 dark:border-zinc-800 shadow-2xl">
                
                {/* Auth Left Banner */}
                <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 text-white p-8 md:p-12 flex flex-col justify-between relative">
                  <div className="space-y-6 relative z-10">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border border-white/20">
                      🔒 SECURE GATEWAY
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display font-black leading-tight">
                      Volunteer Hub Login
                    </h2>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Authenticate to log volunteer hours, access customized Salesforce Trailhead-style learning modules, and print verified PDF contribution certificates.
                    </p>
                    <div className="space-y-3 pt-4 text-xs font-mono">
                      <div className="flex items-center gap-2 text-emerald-300">
                        <CheckSquare size={14} /> Total Registered: 520+ Volunteers
                      </div>
                      <div className="flex items-center gap-2 text-emerald-300">
                        <CheckSquare size={14} /> Certified Impact: 12 Districts
                      </div>
                      <div className="flex items-center gap-2 text-emerald-300">
                        <CheckSquare size={14} /> Accredited Digital Badges
                      </div>
                    </div>
                  </div>

                  <div className="pt-12 text-[10px] text-slate-400 border-t border-slate-800 font-mono space-y-1">
                    <p>✓ Secured with OAuth & SHA256 Encryption</p>
                    <p>© Raita Mitra Social Trust (R)</p>
                  </div>
                </div>

                {/* Auth Right Form */}
                <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center text-left space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Sign In to Your Workspace</h3>
                    <p className="text-xs text-slate-400">Choose one of the secure sign-in options to access your metrics and logs.</p>
                  </div>

                  {authLoading ? (
                    <div className="py-12 flex flex-col items-center justify-center space-y-4">
                      <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                      <div className="text-xs font-mono text-emerald-600 font-bold">CONTACTING {authMethod.toUpperCase()} IDENTITY SECURE SERVICE...</div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => handleLogin('Google')}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 hover:border-emerald-600 hover:bg-emerald-500/5 transition-all text-left space-y-2 cursor-pointer"
                      >
                        <div className="text-lg">🔴</div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-white">Google Sign-In</h4>
                        <p className="text-[10px] text-slate-400">Use your primary Google profile</p>
                      </button>

                      <button
                        onClick={() => handleLogin('LinkedIn')}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 hover:border-emerald-600 hover:bg-emerald-500/5 transition-all text-left space-y-2 cursor-pointer"
                      >
                        <div className="text-lg">🔵</div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-white">LinkedIn Account</h4>
                        <p className="text-[10px] text-slate-400">Sync with professional experience</p>
                      </button>

                      <button
                        onClick={() => handleLogin('Email OTP')}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 hover:border-emerald-600 hover:bg-emerald-500/5 transition-all text-left space-y-2 cursor-pointer"
                      >
                        <div className="text-lg">✉️</div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-white">Email Address OTP</h4>
                        <p className="text-[10px] text-slate-400">Secure one-time-passcode</p>
                      </button>

                      <button
                        onClick={() => handleLogin('Phone OTP')}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 hover:border-emerald-600 hover:bg-emerald-500/5 transition-all text-left space-y-2 cursor-pointer"
                      >
                        <div className="text-lg">📱</div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-white">Mobile Phone OTP</h4>
                        <p className="text-[10px] text-slate-400">Ideal for ground field testing</p>
                      </button>
                    </div>
                  )}

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800 border border-slate-150 dark:border-zinc-700/50 text-[10px] text-slate-500 leading-relaxed font-mono">
                    💡 <strong>Quick Access Demo Tip:</strong> Tap any login block above! It will authenticate you instantly to load simulated credentials, including charts, certificates, and profiles.
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* PORTAL CASE B: LOGGED IN INTERACTIVE WORKSPACE */
            <div className="max-w-7xl mx-auto py-6 px-4">
              
              {/* Upper Dashboard Header (Quick stats & XP Tier) */}
              <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl mb-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={userProfile.avatar} 
                      alt="Avatar" 
                      className="w-16 h-16 rounded-full border-2 border-emerald-500 object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 text-[10px] flex items-center justify-center font-bold">✓</span>
                  </div>
                  <div className="text-left space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold font-display">{userProfile.fullName}</h2>
                      <span className="bg-emerald-950 border border-emerald-500 text-emerald-400 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full">LEVEL {userProfile.level}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">ID: {userProfile.volunteerId} • {userProfile.profession}</p>
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                      <Star size={12} className="fill-current animate-pulse" /> {userProfile.points.toLocaleString()} XP Points (Silver Changemaker Status)
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 md:gap-8 divide-x divide-slate-800">
                  <div className="px-3 text-center">
                    <span className="block text-xl font-bold font-mono text-emerald-400">{userProfile.hoursApproved}h</span>
                    <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">Approved Hours</span>
                  </div>
                  <div className="px-3 text-center">
                    <span className="block text-xl font-bold font-mono text-amber-400">{userProfile.badges.length}</span>
                    <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">Earned Badges</span>
                  </div>
                  <div className="px-3 text-center">
                    <span className="block text-xl font-bold font-mono text-sky-400">Level 4</span>
                    <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">Trailhead Rank</span>
                  </div>
                </div>
              </div>

              {/* Grid-Layout: Workspace Navigation and Main Views */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* 1. Left Navigation Sidebar Panel */}
                <div className="lg:col-span-3 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/60 dark:border-zinc-800 p-4 space-y-2 text-left">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider px-3 block mb-2">Workspace Navigation</span>
                  
                  {[
                    { id: 'dashboard', label: '🏠 Dashboard Overview' },
                    { id: 'opportunities', label: '🎯 Open Opportunities' },
                    { id: 'academy', label: '🎓 Volunteer Academy' },
                    { id: 'hours', label: '📊 Log Hours & Analytics' },
                    { id: 'schedule', label: '📅 Scheduler & Tasks' },
                    { id: 'certificates', label: '🏆 Certificates & Badges' },
                    { id: 'community', label: '💬 Community Feed' },
                    { id: 'leaderboard', label: '🏅 Leaderboard Hall' },
                    { id: 'support', label: '📱 Support & Mobile App' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setPortalTab(tab.id as any)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        portalTab === tab.id
                          ? 'bg-emerald-950 text-white border-l-4 border-emerald-500 shadow-sm'
                          : 'hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <ChevronRight size={12} className="opacity-50" />
                    </button>
                  ))}

                  <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 mt-4 text-center">
                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors"
                    >
                      🚪 Log Out Securely
                    </button>
                  </div>
                </div>

                {/* 2. Main Portal Interactive Content Panel (9 cols) */}
                <div className="lg:col-span-9 space-y-6">
                  
                  {/* TAB A: PORTAL DASHBOARD OVERVIEW */}
                  {portalTab === 'dashboard' && (
                    <div className="space-y-6 animate-fade-in text-left">
                      {/* Trailhead level up progression progress bar widget */}
                      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold block">SALESFORCE TRAILHEAD PROGRESSION</span>
                            <h3 className="text-base font-bold text-slate-800 dark:text-white">Level 4: Rural Tech Mentor</h3>
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-400">2,450 XP / 3,000 XP to Level 5</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden border border-slate-200/40">
                          <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full" style={{ width: '81.6%' }}></div>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-sans">
                          🌟 You need <strong>550 XP more</strong> to rank up to <strong>Level 5: Agri-Tech Strategist</strong>! Take the quizzes inside the <em>Volunteer Academy</em> or complete field hours to secure XP immediately.
                        </p>
                      </div>

                      {/* Bento Grid layout with summary blocks */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Box 1: Profile completion checklist */}
                        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-4">
                          <h4 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                            <span className="p-1 bg-sky-100 dark:bg-sky-950 text-sky-600 rounded-lg"><UserCheck size={14}/></span>
                            Profile Completion Progress
                          </h4>
                          <div className="flex items-center gap-4">
                            {/* SVG circular progress ring */}
                            <div className="relative w-16 h-16 shrink-0">
                              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <path className="text-slate-100 dark:text-zinc-800 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path className="text-emerald-500 stroke-current" strokeWidth="3" strokeDasharray="90, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-slate-800 dark:text-white">90%</div>
                            </div>
                            <div className="text-xs space-y-1 text-slate-500">
                              <p className="text-slate-700 dark:text-slate-300 font-bold">Almost Complete!</p>
                              <p>Add your high-contrast profile photo and languages list to secure 100 XP.</p>
                            </div>
                          </div>
                          <div className="space-y-1.5 text-xs font-mono">
                            <div className="flex items-center gap-2 text-emerald-600"><Check size={14}/> Contact info registered</div>
                            <div className="flex items-center gap-2 text-emerald-600"><Check size={14}/> Educational credentials sync</div>
                            <div className="flex items-center gap-2 text-emerald-600"><Check size={14}/> LinkedIn handle updated</div>
                            <button onClick={() => setPortalTab('support')} className="text-[10px] text-emerald-600 font-bold hover:underline">Edit full Profile details ➔</button>
                          </div>
                        </div>

                        {/* Box 2: Next Field Action & Google Meet sync */}
                        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-4">
                          <h4 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                            <span className="p-1 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded-lg"><Calendar size={14}/></span>
                            Next Scheduled Event
                          </h4>
                          <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl space-y-2">
                            <div className="flex justify-between items-start">
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-mono rounded-md font-bold uppercase">Field Drive</span>
                              <span className="text-[9px] text-slate-400 font-mono">July 11, 2026</span>
                            </div>
                            <h5 className="text-xs font-bold text-slate-800 dark:text-white">{events[0].title}</h5>
                            <p className="text-[11px] text-slate-500">📍 {events[0].location}</p>
                            <p className="text-[10px] text-slate-400 font-mono">⌚ {events[0].time}</p>
                          </div>
                          <a 
                            href={events[0].meetLink} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="w-full block py-2 bg-slate-900 text-amber-400 text-center rounded-xl text-xs font-bold font-mono transition-colors border border-amber-500/30"
                          >
                            🔗 JOIN MEETING LINK PREVIEW
                          </a>
                        </div>

                      </div>

                      {/* Smart Recommendations Section */}
                      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 justify-between">
                          <h4 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                            <span className="p-1 bg-teal-100 dark:bg-teal-950 text-teal-600 rounded-lg"><Sparkles size={14}/></span>
                            AI Recommended Opportunities & Courses
                          </h4>
                          <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">Matching Your Skills</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl border border-slate-150 dark:border-zinc-800 space-y-2">
                            <span className="text-[9px] font-mono text-slate-400 block">🎯 OPPORTUNITY MATCH • 96% ACCURACY</span>
                            <h5 className="text-xs font-bold text-slate-800 dark:text-white">Digital Literacy & AI Training Coach</h5>
                            <p className="text-[11px] text-slate-500 leading-normal">Matches your skills in <em>React, Python, and block curriculum design</em> perfectly.</p>
                            <button onClick={() => setPortalTab('opportunities')} className="text-[10px] font-bold text-emerald-600 hover:underline block pt-1">Go to Opportunities tab ➔</button>
                          </div>
                          <div className="p-4 rounded-2xl border border-slate-150 dark:border-zinc-800 space-y-2">
                            <span className="text-[9px] font-mono text-slate-400 block">🎓 COURSE MATCH • +300 XP AVAILABLE</span>
                            <h5 className="text-xs font-bold text-slate-800 dark:text-white">Empowering Girls with Tech and AI</h5>
                            <p className="text-[11px] text-slate-500 leading-normal">Interactive course on leading school-level AI programming labs.</p>
                            <button onClick={() => setPortalTab('academy')} className="text-[10px] font-bold text-teal-600 hover:underline block pt-1">Go to Academy tab ➔</button>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB B: OPEN OPPORTUNITIES & ONBOARDING STAGES */}
                  {portalTab === 'opportunities' && (
                    <div className="space-y-6 animate-fade-in text-left">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">AI Recommended Opportunities</h3>
                        <p className="text-xs text-slate-500">We analyze your registered skills and background to recommend the absolute best match.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { title: "Teaching & AI Skills Trainer", matching: "96% Fit (High Match)", desc: "Lead block-based programming lessons utilizing our solar school touchscreen tablets.", category: "Education", skillsNeeded: "Python, Scratch, Kannada" },
                          { title: "Soil Health Audit Assistant", matching: "74% Fit (Medium Match)", desc: "Collect soil carbon sample cores and assist agronomists with mapping micro-nutrients.", category: "Agriculture", skillsNeeded: "Data Analysis, Field work" },
                          { title: "Dairy Co-Op Package Mentor", matching: "68% Fit (Medium Match)", desc: "Support rural dairy women leaders with financial bookkeeping ledgers and pack designs.", category: "Women Livelihoods", skillsNeeded: "Accounting, Design" },
                          { title: "Climate Windbreak Mobilizer", matching: "50% Fit", desc: "Construct linear soil water trenches and georeference tree saplings with mobile app.", category: "Climate Action", skillsNeeded: "Field coordination" }
                        ].map((role, idx) => {
                          const isApplied = appliedRoles[role.title] !== undefined;
                          const currentStage = appliedRoles[role.title];
                          return (
                            <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-4 flex flex-col justify-between">
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 uppercase tracking-wider">{role.category}</span>
                                  <span className="text-[10px] font-mono text-amber-500 font-extrabold">{role.matching}</span>
                                </div>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-white">{role.title}</h4>
                                <p className="text-xs text-slate-500 leading-relaxed font-sans">{role.desc}</p>
                                <div className="text-[10px] font-mono text-slate-400">⚡ Required: <em>{role.skillsNeeded}</em></div>
                              </div>

                              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                                {isApplied ? (
                                  <span className="text-[10px] font-mono font-bold text-amber-500 flex items-center gap-1.5 bg-amber-500/5 border border-amber-500/20 px-2 py-1 rounded-lg">
                                    ● Applied ({currentStage} Stage)
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => setAppliedRoles({ ...appliedRoles, [role.title]: "Screening" })}
                                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-950 hover:bg-emerald-900 text-white cursor-pointer transition-colors"
                                  >
                                    Apply Instantly
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Onboarding assignment workflow tracking visualization */}
                      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-4">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                          <span className="p-1 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 rounded-lg"><UserCheck size={14}/></span>
                          My Application & Onboarding Progress Workflow
                        </h4>
                        <p className="text-xs text-slate-500">Track your real-time authorization states below for active campaign paths.</p>

                        {Object.entries(appliedRoles).map(([role, stage]) => (
                          <div key={role} className="p-4 bg-slate-50 dark:bg-zinc-800 rounded-2xl border border-slate-150 dark:border-zinc-700/50 space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-800 dark:text-white">{role}</span>
                              <span className="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 px-2 py-0.5 rounded-md font-bold uppercase">{stage} Phase</span>
                            </div>

                            {/* Workflow checklist visualization mapping Browse -> Apply -> Screening -> Approval -> Onboarding -> Assignment */}
                            <div className="grid grid-cols-6 gap-2">
                              {[
                                { name: "Browse", state: "done" },
                                { name: "Apply", state: "done" },
                                { name: "Screening", state: stage === "Screening" ? "current" : "done" },
                                { name: "Approval", state: stage === "Screening" ? "pending" : "done" },
                                { name: "Onboard", state: "pending" },
                                { name: "Assign", state: "pending" }
                              ].map((step, idx) => (
                                <div key={idx} className="text-center space-y-2">
                                  <div className={`mx-auto w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${
                                    step.state === 'done' 
                                      ? 'bg-emerald-500 text-white' 
                                      : step.state === 'current'
                                        ? 'bg-amber-400 text-slate-900 animate-pulse'
                                        : 'bg-slate-200 dark:bg-zinc-700 text-slate-400'
                                  }`}>
                                    {step.state === 'done' ? "✓" : idx + 1}
                                  </div>
                                  <span className="block text-[9px] font-mono text-slate-400 truncate">{step.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB C: VOLUNTEER ACADEMY (TRAILHEAD STYLE LEARNING MODULES) */}
                  {portalTab === 'academy' && (
                    <div className="space-y-6 animate-fade-in text-left">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Volunteer Academy & Skill Badges</h3>
                        <p className="text-xs text-slate-500">Accredit yourself with specialized modules, comparable to Salesforce Trailhead. Score 80% to earn points and exclusive badges.</p>
                      </div>

                      {quizStarted ? (
                        /* QUIZ RENDER PANEL */
                        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-md space-y-6 animate-fade-in">
                          {(() => {
                            const course = academyCourses.find(c => c.id === quizStarted);
                            if (!course) return null;
                            return (
                              <>
                                <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-zinc-800">
                                  <div>
                                    <span className="text-[10px] font-mono text-emerald-600 block">TRAIL ASSESSMENT</span>
                                    <h4 className="text-base font-bold text-slate-800 dark:text-white">{course.title}</h4>
                                  </div>
                                  <button onClick={() => setQuizStarted(null)} className="text-xs font-mono font-bold text-slate-400 hover:text-slate-600">❌ Cancel</button>
                                </div>

                                {quizScore === null ? (
                                  <div className="space-y-6">
                                    {course.questions.map((q, qIdx) => (
                                      <div key={qIdx} className="space-y-3">
                                        <h5 className="text-xs font-bold text-slate-800 dark:text-white font-mono">{qIdx + 1}. {q.q}</h5>
                                        <div className="space-y-2">
                                          {q.options.map((opt, oIdx) => (
                                            <label 
                                              key={oIdx} 
                                              className={`p-3 rounded-xl border flex items-center gap-3 text-xs cursor-pointer transition-colors ${
                                                answers[qIdx] === oIdx 
                                                  ? 'border-emerald-600 bg-emerald-500/5 font-bold text-slate-800 dark:text-white' 
                                                  : 'border-slate-150 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-300'
                                              }`}
                                            >
                                              <input 
                                                type="radio" 
                                                name={`q-${qIdx}`} 
                                                checked={answers[qIdx] === oIdx} 
                                                onChange={() => setAnswers({ ...answers, [qIdx]: oIdx })} 
                                                className="accent-emerald-600"
                                              />
                                              <span>{opt}</span>
                                            </label>
                                          ))}
                                        </div>
                                      </div>
                                    ))}

                                    <button
                                      onClick={() => handleAnswerSubmit(course.id)}
                                      className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer"
                                    >
                                      Submit Assessment & Check Score
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-center py-6 space-y-4">
                                    <div className="text-4xl">
                                      {quizScore >= 80 ? "🎉" : "💪"}
                                    </div>
                                    <h4 className="text-base font-bold text-slate-800 dark:text-white">Your Score: {quizScore}%</h4>
                                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                      {quizScore >= 80 
                                        ? `Excellent work! You earned +${course.xp} XP points and unlocked the high-visibility digital badge "${course.badge}". It's now active on your profile.`
                                        : "You need 80% correct to pass. Re-read the Raita Mitra handbook guidelines and try again."
                                      }
                                    </p>
                                    <div className="flex gap-2 justify-center pt-2">
                                      <button 
                                        onClick={() => setQuizStarted(null)}
                                        className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                                      >
                                        Back to Courses
                                      </button>
                                      {quizScore < 80 && (
                                        <button 
                                          onClick={() => handleStartQuiz(course.id)}
                                          className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-950 text-white hover:bg-emerald-900 cursor-pointer"
                                        >
                                          Try Again
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      ) : (
                        /* COURSE LISTING */
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {academyCourses.map((course) => {
                            const isCompleted = userProfile.badges.includes(course.badge);
                            return (
                              <div key={course.id} className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between items-start">
                                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-zinc-800 text-[9px] font-mono text-slate-500 rounded font-bold">{course.level}</span>
                                    <span className="text-[10px] font-mono font-bold text-amber-500">+{course.xp} XP</span>
                                  </div>
                                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">{course.title}</h4>
                                  <p className="text-[11px] text-slate-500 leading-normal">Interactive course • Estimated: {course.duration}</p>
                                  {isCompleted && (
                                    <span className="text-[10px] font-mono text-emerald-600 font-bold block pt-1">✅ Earned Badge: {course.badge}</span>
                                  )}
                                </div>

                                <button
                                  onClick={() => handleStartQuiz(course.id)}
                                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
                                >
                                  {isCompleted ? "Retake Assessment" : "Start Trail Module"}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB D: HOURS TRACKER LOGGING & CHART ANALYTICS */}
                  {portalTab === 'hours' && (
                    <div className="space-y-6 animate-fade-in text-left">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Volunteer Hours Analytics Dashboard</h3>
                        <p className="text-xs text-slate-500">Track and log your active hours. View dynamic trends of points and volunteer time logged by month.</p>
                      </div>

                      {/* Live charts built with recharts */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Area Chart: Cumulative Hours */}
                        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-2">
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5 font-mono uppercase tracking-wider">
                            <TrendingUp size={14} className="text-emerald-500"/> Cumulative Volunteer Hours Monthly
                          </h4>
                          <div className="h-64 pt-4">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={chartData}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} />
                                <YAxis stroke="#888888" fontSize={11} tickLine={false} />
                                <Tooltip />
                                <Area type="monotone" dataKey="Hours" stroke="#10b981" fillOpacity={0.2} fill="url(#colorHours)" />
                                <defs>
                                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Bar Chart: XP earned */}
                        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-2">
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5 font-mono uppercase tracking-wider">
                            <BarChart2 size={14} className="text-amber-500"/> XP Points Accrued Monthly
                          </h4>
                          <div className="h-64 pt-4">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={chartData}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} />
                                <YAxis stroke="#888888" fontSize={11} tickLine={false} />
                                <Tooltip />
                                <Bar dataKey="Points" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                      </div>

                      {/* Interactive log hours form */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Logging form (col-span-1) */}
                        <form onSubmit={handleLogHours} className="md:col-span-1 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-4">
                          <h4 className="font-bold text-slate-800 dark:text-white text-xs font-mono uppercase">Log New Hours</h4>
                          
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-slate-400 block">Date of Action</label>
                            <input 
                              type="date" 
                              value={newLog.date} 
                              onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs dark:bg-zinc-800 dark:border-zinc-700"
                              required
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-slate-400 block">Project Area</label>
                            <select 
                              value={newLog.project} 
                              onChange={(e) => setNewLog({ ...newLog, project: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs dark:bg-zinc-800 dark:border-zinc-700"
                            >
                              <option value="STEM Literacy Lab">STEM Literacy Lab</option>
                              <option value="Soil Diagnostics Camp">Soil Diagnostics Camp</option>
                              <option value="Climate Action Bunds">Climate Action Bunds</option>
                              <option value="Women Co-op Financials">Women Co-op Financials</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-slate-400 block">Hours Spent</label>
                            <input 
                              type="number" 
                              min="1" 
                              max="12"
                              value={newLog.hours} 
                              onChange={(e) => setNewLog({ ...newLog, hours: Number(e.target.value) })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs dark:bg-zinc-800 dark:border-zinc-700"
                              required
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-slate-400 block">Description / Field Report Summary</label>
                            <textarea 
                              rows={3}
                              placeholder="Brief report on what you supported..."
                              value={newLog.description} 
                              onChange={(e) => setNewLog({ ...newLog, description: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                              required
                            />
                          </div>

                          <button 
                            type="submit"
                            className="w-full py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <PlusCircle size={13}/>
                            <span>Submit Hours Log</span>
                          </button>
                        </form>

                        {/* Recent Hours List (col-span-2) */}
                        <div className="md:col-span-2 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-4">
                          <h4 className="font-bold text-slate-800 dark:text-white text-xs font-mono uppercase">My Volunteer Activity Ledger Logs</h4>
                          
                          <div className="space-y-3 overflow-y-auto max-h-[360px] pr-2">
                            {userHoursLogs.map((log) => (
                              <div key={log.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800 border border-slate-150 dark:border-zinc-700/50 space-y-1 text-left">
                                <div className="flex justify-between items-center">
                                  <span className="text-[11px] font-mono text-slate-400">{log.date}</span>
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                                    log.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800 animate-pulse'
                                  }`}>{log.status}</span>
                                </div>
                                <h5 className="text-xs font-bold text-slate-800 dark:text-white">{log.project} • {log.hours} Field Hours</h5>
                                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">{log.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* TAB E: SCHEDULER, MEETINGS & GOOGLE CALENDAR SYNC */}
                  {portalTab === 'schedule' && (
                    <div className="space-y-6 animate-fade-in text-left">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Active Calendar & Task Scheduler</h3>
                        <p className="text-xs text-slate-500">Coordinate and check upcoming live assignments. Sync simulated credentials directly with Google Calendar.</p>
                      </div>

                      {/* Google Calendar Sync Card */}
                      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <span className="text-emerald-500">✓</span> Connected to Google Calendar
                          </h4>
                          <p className="text-xs text-slate-400">Your profile syncs calendar appointments with local chapter coordinators instantly.</p>
                        </div>
                        <button className="px-4 py-2 bg-slate-900 text-amber-400 rounded-xl text-xs font-mono font-bold border border-amber-500/20">
                          Force Manual Re-Sync
                        </button>
                      </div>

                      {/* Interactive Calendar list of events */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Event list (2 cols) */}
                        <div className="md:col-span-2 space-y-4">
                          <h4 className="font-bold text-slate-800 dark:text-white text-xs font-mono uppercase">Upcoming Field Mobilizations & Briefings</h4>
                          
                          <div className="space-y-4">
                            {events.map((evt) => (
                              <div key={evt.id} className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] font-mono text-emerald-600 font-bold">{evt.date} • {evt.time}</span>
                                  <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 text-[9px] font-mono rounded">Confirmed</span>
                                </div>
                                <h5 className="text-xs font-extrabold text-slate-800 dark:text-white">{evt.title}</h5>
                                <p className="text-xs text-slate-500">📍 Location: <strong>{evt.location}</strong></p>
                                
                                <div className="pt-2 flex gap-3">
                                  <a 
                                    href={evt.meetLink} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="px-4 py-2 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-[10px] font-mono font-bold"
                                  >
                                    Join Google Meet Link Preview
                                  </a>
                                  <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-mono font-bold">
                                    Set SMS Reminder
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Calendar Grid Representation Mock (1 col) */}
                        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-4 text-center">
                          <h4 className="font-bold text-slate-800 dark:text-white text-xs font-mono uppercase text-left">July 2026 Grid</h4>
                          <div className="grid grid-cols-7 gap-1 text-[10px] font-mono">
                            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                              <div key={i} className="font-bold text-slate-400 py-1">{d}</div>
                            ))}
                            {Array.from({ length: 31 }).map((_, idx) => {
                              const day = idx + 1;
                              const isEventDay = day === 8 || day === 11 || day === 18;
                              return (
                                <div 
                                  key={idx} 
                                  className={`p-1.5 rounded-md font-bold ${
                                    isEventDay 
                                      ? 'bg-amber-400 text-slate-900' 
                                      : 'hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-400'
                                  }`}
                                >
                                  {day}
                                </div>
                              );
                            })}
                          </div>
                          <div className="text-[10px] text-slate-400 text-left pt-2">
                            💡 Days in <span className="bg-amber-400 px-1 py-0.2 rounded text-slate-900 font-bold">yellow</span> indicate confirmed assignment mobilization drives.
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* TAB F: CERTIFICATES & RECOGNITION (BLOCKCHAIN VERIFIED PREVIEWS) */}
                  {portalTab === 'certificates' && (
                    <div className="space-y-6 animate-fade-in text-left">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Certificates & Digital Badges</h3>
                        <p className="text-xs text-slate-500">Download premium, board-signed, QR-verifiable digital certificates highlighting your total contribution hours securely.</p>
                      </div>

                      {/* PDF Certificate printable preview block */}
                      <div className="p-8 rounded-3xl bg-amber-500/5 dark:bg-zinc-900 border-2 border-amber-500/20 shadow-2xl relative overflow-hidden">
                        {/* Elegant watermark background */}
                        <div className="absolute inset-0 opacity-5 select-none pointer-events-none flex items-center justify-center font-display font-black text-6xl">RAITA MITRA</div>
                        
                        <div className="border border-slate-200 dark:border-zinc-800 p-8 rounded-2xl bg-white dark:bg-zinc-950 space-y-6 text-center shadow-lg">
                          <div className="space-y-2">
                            <span className="text-2xl">🌾</span>
                            <h4 className="text-xs font-mono font-bold tracking-widest text-emerald-600 uppercase">Certificate of Contribution & Merit</h4>
                            <p className="text-[10px] text-slate-400 font-mono">Blockchain Node Verified: RMST-TXN-9023412</p>
                          </div>

                          <div className="space-y-3 py-4">
                            <p className="text-xs text-slate-400 italic font-serif">This certifies that</p>
                            <h3 className="text-xl font-black font-display text-slate-800 dark:text-white tracking-wide underline decoration-amber-400 decoration-2">{userProfile.fullName}</h3>
                            <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
                              has successfully completed <strong>{userProfile.hoursApproved} accredited field volunteering hours</strong> with <strong>Raita Mitra Social Trust (R)</strong>, supporting dryland micro-carbon diagnostics and digital education block curriculum.
                            </p>
                          </div>

                          <div className="pt-6 border-t border-slate-100 dark:border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="text-left space-y-1">
                              <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Board of Trustees</p>
                              <p className="text-[9px] text-slate-400 font-mono">RMST Central Office, Dharwad</p>
                            </div>
                            
                            {/* QR code validation simulator block */}
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-slate-900 rounded p-1 flex items-center justify-center shrink-0 border border-slate-800">
                                {/* HTML representation of QR code */}
                                <div className="grid grid-cols-4 gap-0.5 w-full h-full">
                                  {Array.from({ length: 16 }).map((_, i) => (
                                    <div key={i} className={`rounded-[1px] ${i % 3 === 0 ? 'bg-white' : 'bg-transparent'}`} />
                                  ))}
                                </div>
                              </div>
                              <div className="text-left">
                                <p className="text-[10px] font-mono font-bold text-emerald-600 flex items-center gap-1">🔒 Scan QR to Verify</p>
                                <p className="text-[9px] text-slate-400 font-mono">Secure integrity hash check</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Download action buttons and social sharing */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Download choices */}
                        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-3">
                          <h4 className="font-bold text-slate-800 dark:text-white text-xs font-mono uppercase">Download Credentials</h4>
                          <p className="text-xs text-slate-500">Export high-resolution documents for university registries, visa audits, or professional resumes.</p>
                          <div className="space-y-2 pt-2">
                            <button className="w-full py-2 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-mono font-bold transition-all">
                              💾 Download Certified PDF Document
                            </button>
                            <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-mono font-bold transition-all">
                              💾 Export Verified Blockchain Ledger JSON
                            </button>
                          </div>
                        </div>

                        {/* LinkedIn social share templates generator */}
                        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-3 text-left">
                          <h4 className="font-bold text-slate-800 dark:text-white text-xs font-mono uppercase">Share Certificate to LinkedIn</h4>
                          <p className="text-xs text-slate-400">Generate a pre-formatted post draft to copy into your LinkedIn profile feed directly.</p>
                          
                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-150 text-[10px] font-mono text-slate-500 leading-normal select-all">
                            "Thrilled to share that I've completed {userProfile.hoursApproved} hours of certified volunteering with Raita Mitra Social Trust! Grateful to support dryland agricultural soil audits and digital tech training in Haveri. #ESG #Volunteering #Community"
                          </div>

                          <button 
                            onClick={() => alert("LinkedIn post draft template copied to clipboard!")}
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5"
                          >
                            <Share2 size={13}/>
                            <span>Copy Post Template Code</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* TAB G: SOCIAL COMMUNITY FORUMS & DISCUSSION FEED */}
                  {portalTab === 'community' && (
                    <div className="space-y-6 animate-fade-in text-left">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Volunteer Discussion Forums</h3>
                        <p className="text-xs text-slate-500">Collaborate, share field photographs, write updates, and brainstorm with certified changemakers across Karnataka taluks.</p>
                      </div>

                      {/* Add new post input */}
                      <form onSubmit={handleForumPost} className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-4">
                        <h4 className="font-bold text-slate-800 dark:text-white text-xs font-mono uppercase">Share A Field Story</h4>
                        <textarea 
                          rows={3}
                          value={newPostText}
                          onChange={(e) => setNewPostText(e.target.value)}
                          placeholder="What did you experience on your field campaign today? Share with fellow volunteers..."
                          className="w-full p-4 border border-slate-200 rounded-2xl text-xs dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          required
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-slate-400 font-mono">Posting as {userProfile.fullName}</span>
                          <button 
                            type="submit"
                            className="px-6 py-2 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer"
                          >
                            Publish Story
                          </button>
                        </div>
                      </form>

                      {/* Discussion feed posts */}
                      <div className="space-y-6">
                        {forumPosts.map((post) => (
                          <div key={post.id} className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-4">
                            <div className="flex justify-between items-start">
                              <div className="text-left space-y-0.5">
                                <h4 className="text-xs font-bold text-slate-800 dark:text-white">{post.author}</h4>
                                <p className="text-[10px] font-mono text-slate-400">{post.role}</p>
                              </div>
                            </div>

                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">{post.text}</p>

                            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center gap-6 text-xs font-mono text-slate-400">
                              <button 
                                onClick={() => handleLikePost(post.id)}
                                className={`flex items-center gap-1.5 hover:text-emerald-500 transition-colors cursor-pointer ${post.liked ? 'text-emerald-500 font-bold' : ''}`}
                              >
                                💚 {post.likes} Likes
                              </button>
                              <span>💬 {post.comments.length} Comments</span>
                            </div>

                            {/* Comment drawer list inside post */}
                            {post.comments.length > 0 && (
                              <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl space-y-2">
                                {post.comments.map((comment, cIdx) => (
                                  <div key={cIdx} className="text-xs leading-normal">
                                    <span className="font-bold text-slate-700 dark:text-slate-300">Community Member:</span> <span className="text-slate-600 dark:text-slate-400">{comment}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Add comment form input */}
                            <div className="flex gap-2">
                              <input 
                                type="text"
                                placeholder="Write a supportive comment..."
                                value={newCommentTexts[post.id] || ""}
                                onChange={(e) => setNewCommentTexts({ ...newCommentTexts, [post.id]: e.target.value })}
                                className="flex-1 px-3 py-2 border border-slate-150 rounded-xl text-xs dark:bg-zinc-800 dark:border-zinc-700"
                              />
                              <button 
                                onClick={() => handleAddComment(post.id)}
                                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-mono font-bold cursor-pointer"
                              >
                                Send
                              </button>
                            </div>

                          </div>
                        ))}
                      </div>

                    </div>
                  )}

                  {/* TAB H: LEADERBOARD & HALL OF CHANGEMAKERS */}
                  {portalTab === 'leaderboard' && (
                    <div className="space-y-6 animate-fade-in text-left">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Hall of Changemakers</h3>
                        <p className="text-xs text-slate-500">Live taluk rankings celebrating volunteers with the highest cumulative approved campaign hours and skill points.</p>
                      </div>

                      {/* Interactive high density leaderboard list */}
                      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-4">
                        <div className="grid grid-cols-12 text-[10px] font-mono text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-zinc-800">
                          <div className="col-span-2">Rank</div>
                          <div className="col-span-5">Volunteer & Location</div>
                          <div className="col-span-3 text-center">Approved Hours</div>
                          <div className="col-span-2 text-right">Trail XP</div>
                        </div>

                        {[
                          { rank: 1, name: "Suresh Patil", location: "Hubli", hours: 94, points: 5850, isUser: false, badges: ["Soil Pioneer", "Community Lead"] },
                          { rank: 2, name: "Prerna Deshpande", location: "Bengaluru", hours: 82, points: 4900, isUser: false, badges: ["Agri Champion"] },
                          { rank: 3, name: "Aakash Shetty", location: "Dharwad", hours: 64, points: 3800, isUser: false, badges: ["STEM Educator"] },
                          { rank: 4, name: "Anusha Gowda (You)", location: "HSR Layout", hours: userProfile.hoursApproved, points: userProfile.points, isUser: true, badges: userProfile.badges },
                          { rank: 5, name: "Kiran Belagavi", location: "Savanur", hours: 32, points: 2100, isUser: false, badges: ["Field Mobilizer"] }
                        ].map((leader) => (
                          <div 
                            key={leader.rank} 
                            className={`grid grid-cols-12 py-3 items-center text-xs rounded-xl px-2 transition-colors ${
                              leader.isUser 
                                ? 'bg-amber-400/10 border border-amber-400/30 font-bold' 
                                : 'hover:bg-slate-50 dark:hover:bg-zinc-800'
                            }`}
                          >
                            <div className="col-span-2 font-mono flex items-center gap-1.5">
                              <span>{leader.rank === 1 ? "🥇" : leader.rank === 2 ? "🥈" : leader.rank === 3 ? "🥉" : `#${leader.rank}`}</span>
                            </div>
                            
                            <div className="col-span-5 text-left">
                              <span className="block font-bold text-slate-800 dark:text-white">{leader.name}</span>
                              <span className="text-[10px] text-slate-400">{leader.location}</span>
                              <div className="flex flex-wrap gap-1 pt-1">
                                {leader.badges.map((b, i) => (
                                  <span key={i} className="text-[8px] font-mono bg-slate-100 dark:bg-zinc-800 text-slate-500 px-1 py-0.2 rounded">{b}</span>
                                ))}
                              </div>
                            </div>

                            <div className="col-span-3 text-center font-mono font-bold text-emerald-600">
                              {leader.hours}h
                            </div>

                            <div className="col-span-2 text-right font-mono font-bold text-amber-500">
                              {leader.points.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB I: TECHNICAL SUPPORT & MOBILE APP MOCKUP */}
                  {portalTab === 'support' && (
                    <div className="space-y-6 animate-fade-in text-left">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Volunteer Support & Mobile Companion App</h3>
                        <p className="text-xs text-slate-500">Access support options, and preview the high-fidelity mobile workspace design showcasing offline field audit logs.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        
                        {/* Support Channels (col-span-5) */}
                        <div className="md:col-span-5 space-y-4">
                          <h4 className="font-bold text-slate-800 dark:text-white text-xs font-mono uppercase">Direct Support Channels</h4>
                          
                          <div className="space-y-3">
                            <a 
                              href="https://wa.me/917676376221?text=Hi%20Coordinator,%20I'd%20like%2520to%20discuss%20RMST%20volunteering."
                              target="_blank" 
                              rel="noreferrer"
                              className="p-4 rounded-2xl bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 block text-left space-y-1 transition-colors"
                            >
                              <h5 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                                <Phone size={13}/> WhatsApp Advisors Channel
                              </h5>
                              <p className="text-[11px] text-slate-500">Chat instantly with Dharwad central CSR project directors.</p>
                            </a>

                            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 space-y-1 text-left">
                              <h5 className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                                ✉️ Email Help Desk
                              </h5>
                              <p className="text-[11px] text-slate-400 font-mono">volunteers@raitamitra.org</p>
                              <p className="text-[10px] text-slate-500 leading-normal">Typically replies within 4 working hours with accredited certificates assistance.</p>
                            </div>

                            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 space-y-1 text-left">
                              <h5 className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                                ⌚ Weekly Orientation Meetings
                              </h5>
                              <p className="text-[11px] text-slate-500">Every Saturday, 5:00 PM onwards.</p>
                              <p className="text-[10px] text-emerald-600 font-bold font-mono">Google Meet integration active</p>
                            </div>
                          </div>
                        </div>

                        {/* Animated Smartphone Mockup container (col-span-7) */}
                        <div className="md:col-span-7 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-4">
                          <h4 className="font-bold text-slate-800 dark:text-white text-xs font-mono uppercase">Companion Mobile App Mockup Preview</h4>
                          
                          {/* HTML smartphone container frame */}
                          <div className="max-w-[280px] mx-auto rounded-[36px] border-[10px] border-slate-900 bg-slate-950 p-4 shadow-2xl space-y-4 relative overflow-hidden text-white font-mono text-[10px]">
                            {/* Phone Speaker Notch */}
                            <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto -mt-6 mb-4 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                            </div>

                            <div className="space-y-3">
                              {/* Upper Header */}
                              <div className="flex justify-between items-center text-[8px] text-emerald-400">
                                <span>🟢 GPS Attendance ACTIVE</span>
                                <span>🔋 98%</span>
                              </div>

                              {/* Mock Card A */}
                              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-left">
                                <h5 className="font-bold text-[9px] text-white">Offline Field Logging Mode</h5>
                                <p className="text-[8px] text-slate-400 leading-normal">Logs soil data offline in dryland zones, auto-syncing when network resumes.</p>
                                <span className="bg-emerald-950 text-emerald-400 text-[8px] px-1 rounded block w-fit">Accurate Cache Enabled</span>
                              </div>

                              {/* Mock Card B */}
                              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-left">
                                <h5 className="font-bold text-[9px] text-white">Taluk Attendance Check-In</h5>
                                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center rounded">
                                  ✓ Tap to Check-in via GPS (Haveri)
                                </div>
                              </div>
                            </div>

                            {/* Home Indicator line */}
                            <div className="w-20 h-1 bg-slate-800 rounded-full mx-auto mt-4" />
                          </div>

                          <p className="text-[11px] text-slate-500 text-center leading-normal">
                            💡 Raita Mitra companion app enables offline GPS attendance registration and automated SMS notification checkouts for remote dryland soil audits.
                          </p>
                        </div>

                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

        </div>
      )}

      {/* FOOTER WIDGET */}
      <footer className="py-8 bg-slate-950 text-white border-t border-slate-800 text-center text-[11px] font-mono space-y-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-left space-y-1">
            <p className="font-bold">Raita Mitra Social Trust (R) Volunteer Portal Workspace</p>
            <p className="text-slate-400">Accredited social partner supporting Karnataka agrarian development blocks.</p>
          </div>
          <div className="text-slate-500">
            © {new Date().getFullYear()} RMST. Built with WCAG Level AA Compliance standards.
          </div>
        </div>
      </footer>

    </div>
  );
}
