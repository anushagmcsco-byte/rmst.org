import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, ShieldCheck, BarChart3, Globe, FolderKanban, FileSpreadsheet, 
  Users, MessageSquare, Sparkles, Calendar, Plus, Check, ClipboardList, 
  MapPin, Image as ImageIcon, Video, HelpCircle, PhoneCall, Smartphone, 
  Lock, ArrowRight, Download, Eye, ExternalLink, ChevronRight, UserCheck, 
  Clock, Share2, Star, CheckSquare, PlusCircle, Send, SendHorizontal, Trash2, Edit2, Play, Info,
  ChevronDown, X, Settings, Database, Code, Sliders, Cpu, Activity, Key, RefreshCw, FileText,
  Mail, MessageCircle, AlertTriangle, Filter, Search, UserMinus, ToggleLeft, ToggleRight, CheckCircle2,
  AlertCircle, Grid, Layers, Terminal, Compass, LayoutGrid, Award, BookOpen, ThumbsUp, MoreVertical,
  Link, Zap
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Legend, LineChart, Line, RadialBarChart, RadialBar
} from 'recharts';

// Import Authoritative Data
import { RICH_ARTICLES } from '../data/blogArticles';
import { RICH_EVENTS } from '../data/events';

interface AdminDashboardProps {
  highContrast: boolean;
  setActivePage?: (page: string) => void;
  seoConfig?: Record<string, { title: string; description: string; futureImage: string }>;
  setSeoConfig?: React.Dispatch<React.SetStateAction<Record<string, { title: string; description: string; futureImage: string }>>>;
}

// ============================================================================
// AUTHORITATIVE ADMIN MOCK DATA
// ============================================================================

const ECOSYSTEM_METRICS = [
  { label: 'Total Donations', value: '₹52,75,400', change: '+18.4% YoY', trend: 'up', color: '#10b981', sub: '₹34.5L Personal • ₹18.2L CSR' },
  { label: 'Active Programs', value: '18 Clusters', change: '8 taluks covered', trend: 'neutral', color: '#3b82f6', sub: '12 Agriculture • 6 Education/STEM' },
  { label: 'Verified Donors', value: '1,420 Active', change: '+12% this month', trend: 'up', color: '#f59e0b', sub: '18 Corporate • 1,402 Individual' },
  { label: 'Volunteer Force', value: '480 Registered', change: '350 field-certified', trend: 'up', color: '#8b5cf6', sub: '12,500 cumulative hours' },
  { label: 'AI Co-pilot Queries', value: '4,850 Chats', change: '96% resolution rate', trend: 'up', color: '#ec4899', sub: 'Automated tax & program support' },
  { label: 'Website Visitors', value: '24.2K Unique', change: '+25% traffic growth', trend: 'up', color: '#6366f1', sub: 'Active session avg: 4.8 min' }
];

const CMS_PAGES = [
  { id: 'pg_home', title: 'Home Landing Page', author: 'Anusha Rao', status: 'Published', updated: '2026-07-05', version: 'v4.2', url: '/home' },
  { id: 'pg_about', title: 'About Raita Mitra Trust', author: 'Dr. Ramesh Patil', status: 'Published', updated: '2026-06-28', version: 'v2.1', url: '/about' },
  { id: 'pg_programs', title: 'Our Integrated Programs', author: 'Siddharth Deshmukh', status: 'Published', updated: '2026-07-02', version: 'v3.5', url: '/programs' },
  { id: 'pg_stories', title: 'Impact Stories & Chronology', author: 'Anusha Rao', status: 'Published', updated: '2026-07-04', version: 'v5.0', url: '/stories' },
  { id: 'pg_compliance', title: 'Statutory Transparency Hub', author: 'Board Secretary', status: 'Draft', updated: '2026-07-06', version: 'v1.0 (Draft)', url: '/compliance' }
];

const DONOR_CRM_DATA = [
  { id: 'dn_401', name: 'Rajesh S. Sekhar', email: 'rajesh@sekhargroup.com', segment: 'Corporate CSR', totalGiving: 450000, engagements: 94, recommended: 'Solar Pump Grid II', score: 98, status: 'Active Recurring' },
  { id: 'dn_402', name: 'Anusha Rao', email: 'anusha.gmcsco@gmail.com', segment: 'Premium Individual', totalGiving: 37500, engagements: 85, recommended: 'Girls STEM Camp', score: 92, status: 'Active Recurring' },
  { id: 'dn_403', name: 'Vikram Hegde', email: 'v.hegde@nri-found.org', segment: 'NRI Supporter', totalGiving: 120000, engagements: 72, recommended: 'Soil Humic Diagnostic Labs', score: 88, status: 'One-Time High' },
  { id: 'dn_404', name: 'Meera Deshpande', email: 'meera.d@organic.in', segment: 'General Individual', totalGiving: 15000, engagements: 50, recommended: 'Women Dairy Coop Scales', score: 75, status: 'Active Recurring' },
  { id: 'dn_405', name: 'Kiran Kulkarni', email: 'kiran.k@gmail.com', segment: 'Micro-Donor', totalGiving: 5000, engagements: 30, recommended: 'Millet Distribution', score: 62, status: 'One-Time Regular' }
];

const PROGRAM_PIPELINE = [
  { id: 'pr_1', title: 'Solar Drip Irrigation Hubs', manager: 'Siddharth D.', progress: 75, budget: 1850000, status: 'In Progress', beneficiaries: 3400, region: 'Haveri' },
  { id: 'pr_2', title: 'Girls Python & STEM Classrooms', manager: 'Anusha Rao', progress: 100, budget: 800000, status: 'Completed', beneficiaries: 1200, region: 'Savanur' },
  { id: 'pr_3', title: 'Women Dairy Cooperatives Fat Testers', manager: 'Siddharth D.', progress: 42, budget: 1420000, status: 'In Progress', beneficiaries: 2200, region: 'Kundgol' },
  { id: 'pr_4', title: 'Rainwater Watershed Contour Bunds', manager: 'Dr. Ramesh Patil', progress: 10, budget: 2200000, status: 'In Planning', beneficiaries: 4500, region: 'Shiggaon' }
];

const VOLUNTEER_APPLICATIONS = [
  { id: 'vl_01', name: 'Aravind Swamy', skill: 'Digital Literacy / Coding', location: 'Dharwad', status: 'Assigned', hours: 48 },
  { id: 'vl_02', name: 'Shreya Joshi', skill: 'Soil Carbon Diagnostics', location: 'Haveri', status: 'Pending Review', hours: 0 },
  { id: 'vl_03', name: 'Preeti Deshpande', skill: 'Women Enterprise Mentorship', location: 'Gadag', status: 'Assigned', hours: 32 },
  { id: 'vl_04', name: 'Ganesh Bhat', skill: 'Logistics & Solar Assembly', location: 'Kundgol', status: 'Assigned', hours: 64 },
  { id: 'vl_05', name: 'Nikhil Patil', skill: 'Healthcare Pediatric Screenings', location: 'Belagavi', status: 'On Hold', hours: 8 }
];

const INTEGRATIONS_HUB_ITEMS = [
  { id: 'int_1', name: 'Razorpay PG Gateway', category: 'Payments', desc: 'UPI and domestic bank mandate processing.', status: 'Connected', keyExpiry: '2027-04-12' },
  { id: 'int_2', name: 'Stripe Sandbox', category: 'Payments', desc: 'International donor credit card clearing.', status: 'Connected', keyExpiry: '2027-06-18' },
  { id: 'int_3', name: 'Google Workspace OAuth', category: 'Auth / Directory', desc: 'Provides employee single sign-on security.', status: 'Connected', keyExpiry: 'Never' },
  { id: 'int_4', name: 'OpenAI Embeddings Engine', category: 'AI Core', desc: 'Powers Donor Recommendation Algorithms & Vector indexing.', status: 'Connected', keyExpiry: '2026-12-31' },
  { id: 'int_5', name: 'Resend API Server', category: 'Communication', desc: 'Triggers instant digital 80G tax receipt PDF emails.', status: 'Connected', keyExpiry: '2026-11-20' },
  { id: 'int_6', name: 'WhatsApp Cloud API', category: 'Communication', desc: 'Sends automated crop yield reports to farm partners.', status: 'Disconnected', keyExpiry: 'Expired' }
];

const AUDIT_LOGS = [
  { time: '2026-07-06T10:15:22', user: 'Anusha Rao (Content Mgr)', action: 'Updated Landing Hero Headline to "See The Difference You Create"', severity: 'info', ip: '192.168.1.42' },
  { time: '2026-07-06T09:40:11', user: 'System (Automated Resend)', action: 'Generated & dispatched 80G Tax Receipt RMST/2026/1045 to user_dn_402', severity: 'success', ip: 'internal-cron' },
  { time: '2026-07-05T21:12:05', user: 'Super Admin', action: 'Rotated API client authorization credentials for Microsoft Entra Tenant ID', severity: 'warning', ip: '10.0.4.150' },
  { time: '2026-07-05T14:32:00', user: 'Finance Admin', action: 'Authorized escrow disbursement of ₹3,40,000 to Dharwad Solar Vendor', severity: 'danger', ip: '192.168.1.99' }
];

const MULTI_AGENT_CENTER = [
  { name: 'Content Marketing Agent', role: 'Generates blog outlines, drafts social media posts & updates faqs.', status: 'Idle', model: 'Gemini 2.5 Flash', accuracy: '94%' },
  { name: 'Donor Segmentation Agent', role: 'Scans transaction timelines to flag recurring donors & score engagement.', status: 'Active Processing', model: 'Gemini 1.5 Pro', accuracy: '98%' },
  { name: 'Volunteer Recruiter Agent', role: 'Triggers automated skill evaluation assessments for incoming applicants.', status: 'Idle', model: 'Gemini 2.5 Flash', accuracy: '91%' },
  { name: 'CSR Compliance Agent', role: 'Compiles certified MCA CSR-1 reports & draft program utilization ledgers.', status: 'Active Processing', model: 'Gemini 1.5 Pro', accuracy: '99%' }
];

const MEDIA_ASSETS_COLLECTION = [
  { title: 'Solar-Powered Drip Irrigation Setup', tags: ['Agriculture', 'Hebsur Village, Dharwad'], type: 'Image', size: '2.4 MB', url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=1000' },
  { title: 'Yaraguppi Dairy Cooperative Ledger Review', tags: ['Women Empowerment', 'Yaraguppi, Kundgol'], type: 'Image', size: '1.8 MB', url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1000' },
  { title: 'High School Girls Exploring Scratch Coding', tags: ['Education & AI Skills', 'Kundgol High School, Dharwad'], type: 'Image', size: '3.1 MB', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000' },
  { title: 'Mobile Diagnostic Pediatric Screening', tags: ['Health Camps', 'Shiggaon, Haveri'], type: 'Image', size: '4.2 MB', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1000' },
  { title: 'Watershed Bunding & Sapling Afforestation', tags: ['Environment', 'Kalghatgi Taluk, Dharwad'], type: 'Image', size: '2.9 MB', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000' },
  { title: 'Millet Processing Unit Packaging', tags: ['Entrepreneurship', 'Haveri Rural, Haveri'], type: 'Image', size: '2.2 MB', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1000' },
  { title: 'Taluk Agrarian Advisory Assembly', tags: ['Events', 'Hubballi Training Centre, Dharwad'], type: 'Image', size: '3.5 MB', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000' },
  { title: 'Harvesting Diversified Horticulture Crops', tags: ['Agriculture', 'Savanur Taluk, Haveri'], type: 'Image', size: '2.7 MB', url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=1000' }
];

const SYSTEM_HEALTH_METRICS = {
  cpu: '18%',
  memory: '2.4 GB / 8 GB (30%)',
  ping: '22ms (Asia-South-1 Ingress)',
  dbStatus: 'Fully Healthy (Synced Master-Replica)',
  backupTime: 'Today at 04:00 AM (Verified SHA-256 Checksum)',
  redisCacheHits: '98.4%'
};

// ============================================================================
// MAIN SYSTEM COMMAND CENTER
// ============================================================================

export default function AdminDashboard({ highContrast, setActivePage, seoConfig, setSeoConfig }: AdminDashboardProps) {
  const uploadMediaToServer = async (base64Url: string, name: string): Promise<string> => {
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ base64: base64Url, name })
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      return data.url || base64Url;
    } catch (err) {
      console.error('Failed to upload file to server, using base64 fallback:', err);
      return base64Url;
    }
  };

  const isFirstRender = useRef(true);
  const isGalleryLoadedFromServer = useRef(false);
  const isGalleryFirstRender = useRef(true);
  const isBlogsLoadedFromServer = useRef(false);
  const isBlogsFirstRender = useRef(true);
  const isEventsLoadedFromServer = useRef(false);
  const isEventsFirstRender = useRef(true);
  const isJobsLoadedFromServer = useRef(false);
  const isJobsFirstRender = useRef(true);
  const isSeoLoadedFromServer = useRef(false);

  // Custom Confirmation Dialog State
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const triggerConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      onConfirm
    });
  };

  // Authentication status simulators
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState({
    name: 'Anusha Rao',
    role: 'Super Admin',
    email: 'anusha.gmcsco@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    permissions: 'Global Write/Delete Executions'
  });

  const [authMethod, setAuthMethod] = useState<'microsoft' | 'google' | 'email'>('google');
  const [authInput, setAuthInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');

  // Primary Workspace state managers
  const [currentAdminTab, setCurrentAdminTab] = useState<'overview' | 'cms' | 'blogs' | 'events' | 'gallery' | 'seo' | 'programs' | 'crm' | 'volunteers' | 'careers' | 'workflow' | 'aistudio' | 'integrations' | 'system' | 'submissions'>('overview');
  
  // Form Submissions and Google Sheets Sync States
  const [submissionsList, setSubmissionsList] = useState<any[]>([]);
  const [sheetsConfig, setSheetsConfig] = useState<{ webAppUrl: string }>({ webAppUrl: '' });
  const [isConfigSaving, setIsConfigSaving] = useState(false);
  const [isSubmissionsLoading, setIsSubmissionsLoading] = useState(false);
  const [submissionsFilter, setSubmissionsFilter] = useState('All');
  const [testSyncLoading, setTestSyncLoading] = useState(false);
  const [testSyncResult, setTestSyncResult] = useState<string | null>(null);

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchSubmissionsAndConfig();
    }
  }, [isAdminLoggedIn]);

  const fetchSubmissionsAndConfig = () => {
    setIsSubmissionsLoading(true);
    Promise.all([
      fetch('/api/submissions').then(res => res.json()),
      fetch('/api/sheets-config').then(res => res.json())
    ])
    .then(([subs, config]) => {
      setSubmissionsList(subs);
      setSheetsConfig(config);
      setIsSubmissionsLoading(false);
    })
    .catch(err => {
      console.error('Failed to load submissions or sheets config:', err);
      setIsSubmissionsLoading(false);
    });
  };

  const handleSaveSheetsConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfigSaving(true);
    fetch('/api/sheets-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sheetsConfig)
    })
    .then(async res => {
      const isJson = res.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await res.json() : null;
      if (res.ok && data?.success) {
        alert('Google Sheets Sync Web App URL saved successfully!');
      } else {
        const errorMsg = data ? `${data.error}\n\n${data.details || ''}` : `Status ${res.status}`;
        alert('Failed to save configuration:\n\n' + errorMsg);
      }
      setIsConfigSaving(false);
    })
    .catch(err => {
      console.error(err);
      alert('Error saving configuration: ' + err.message);
      setIsConfigSaving(false);
    });
  };

  const handleClearSubmissions = () => {
    triggerConfirm(
      'Clear All Submissions',
      'Are you sure you want to clear all logged submissions from localhost? This action cannot be undone.',
      () => {
        fetch('/api/submissions/clear', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setSubmissionsList([]);
            alert('Submissions cleared successfully!');
          }
        })
        .catch(err => {
          console.error(err);
          alert('Error clearing submissions');
        });
      }
    );
  };

  const handleTestSync = () => {
    if (!sheetsConfig.webAppUrl || !sheetsConfig.webAppUrl.trim().startsWith('http')) {
      alert('Please enter a valid Web App URL first.');
      return;
    }
    setTestSyncLoading(true);
    setTestSyncResult(null);

    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'Test Sync Call',
        name: 'Test Connectivity User',
        email: 'test-sync@raitamitra.org',
        phone: '+91 9999999999',
        subject: 'Ping Connectivity Test',
        message: 'This is a test submission triggering sheets synchronization from Super-Admin Panel.',
        metadata: {
          browser: navigator.userAgent,
          testId: Math.floor(Math.random() * 1000000)
        }
      })
    })
    .then(res => res.json())
    .then(data => {
      setTestSyncLoading(false);
      if (data.googleSheetsSynced) {
        setTestSyncResult('✅ SUCCESS! Connection established. Row appended to your Google Sheet successfully.');
        fetchSubmissionsAndConfig(); // reload list
      } else {
        setTestSyncResult('❌ FAILED! ' + (data.syncError || 'Google Sheets Apps Script did not respond with 200 OK. Please verify your script deployment settings.'));
      }
    })
    .catch(err => {
      setTestSyncLoading(false);
      setTestSyncResult('❌ ERROR: ' + err.message);
    });
  };

  // Interactive Data lists
  const [cmsList, setCmsList] = useState(CMS_PAGES);
  const [donorList, setDonorList] = useState(DONOR_CRM_DATA);
  const [programList, setProgramList] = useState(PROGRAM_PIPELINE);
  const [volunteerList, setVolunteerList] = useState(VOLUNTEER_APPLICATIONS);

  // Helper to map program title to a valid dynamic route slug
  const getProgramSlug = (title: string): string => {
    const t = title.toLowerCase();
    if (t.includes('agri') || t.includes('solar drip') || t.includes('irrigation')) return 'sustainable-agriculture';
    if (t.includes('women') || t.includes('dairy') || t.includes('coop') || t.includes('shg')) return 'women-empowerment';
    if (t.includes('python') || t.includes('stem') || t.includes('classroom') || t.includes('school') || t.includes('education') || t.includes('coding') || t.includes('girls')) return 'education-ai-skills';
    if (t.includes('health') || t.includes('nutrition') || t.includes('clinic') || t.includes('pediatric')) return 'health-nutrition';
    if (t.includes('rainwater') || t.includes('watershed') || t.includes('bunds') || t.includes('climate')) return 'climate-action';
    if (t.includes('entrepreneurship') || t.includes('start-ups') || t.includes('rural')) return 'rural-entrepreneurship';
    return 'sustainable-agriculture';
  };

  // Dynamic Blogs, Events and Gallery state
  const [blogsList, setBlogsList] = useState<any[]>(() => {
    const saved = localStorage.getItem('raita_mitra_blogs_list');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) { console.error(e); }
    }
    return RICH_ARTICLES;
  });

  const [eventsList, setEventsList] = useState<any[]>(() => {
    const saved = localStorage.getItem('raita_mitra_events_list');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) { console.error(e); }
    }
    return RICH_EVENTS;
  });

  const [galleryList, setGalleryList] = useState<any[]>(() => {
    const saved = localStorage.getItem('raita_mitra_gallery_list');
    let initialList = MEDIA_ASSETS_COLLECTION;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          initialList = parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return initialList.map((item: any, idx: number) => ({
      id: item.id || `gallery-asset-${idx}-${Date.now()}`,
      ...item
    }));
  });

  // Load blogs list from server on mount
  useEffect(() => {
    fetch('/api/blogs?t=' + Date.now())
      .then(res => {
        if (!res.ok) throw new Error('API response not ok');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          isBlogsLoadedFromServer.current = true;
          setBlogsList(data);
        }
      })
      .catch(err => console.warn('Failed to load blogs from server, falling back to local storage:', err));
  }, []);

  // Sync blogs list state to local storage & server
  useEffect(() => {
    try {
      localStorage.setItem('raita_mitra_blogs_list', JSON.stringify(blogsList));
    } catch (err) {
      console.warn('LocalStorage quota limit exceeded for blogs list:', err);
    }
    
    if (isBlogsLoadedFromServer.current) {
      isBlogsLoadedFromServer.current = false;
      return;
    }
    if (isBlogsFirstRender.current) {
      isBlogsFirstRender.current = false;
      return;
    }

    fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blogsList })
    }).catch(err => console.error('Failed to sync blogs to server:', err));
  }, [blogsList]);

  // Load events list from server on mount
  useEffect(() => {
    fetch('/api/events?t=' + Date.now())
      .then(res => {
        if (!res.ok) throw new Error('API response not ok');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          isEventsLoadedFromServer.current = true;
          setEventsList(data);
        }
      })
      .catch(err => console.warn('Failed to load events from server, falling back to local storage:', err));
  }, []);

  // Sync events list state to local storage & server
  useEffect(() => {
    try {
      localStorage.setItem('raita_mitra_events_list', JSON.stringify(eventsList));
    } catch (err) {
      console.warn('LocalStorage quota limit exceeded for events list:', err);
    }
    
    if (isEventsLoadedFromServer.current) {
      isEventsLoadedFromServer.current = false;
      return;
    }
    if (isEventsFirstRender.current) {
      isEventsFirstRender.current = false;
      return;
    }

    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventsList })
    }).catch(err => console.error('Failed to sync events to server:', err));
  }, [eventsList]);

  // Load gallery list from server on mount
  useEffect(() => {
    fetch('/api/gallery?t=' + Date.now())
      .then(res => {
        if (!res.ok) throw new Error('API response not ok');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          isGalleryLoadedFromServer.current = true;
          setGalleryList(data);
        }
      })
      .catch(err => console.warn('Failed to load gallery from server, falling back to local storage:', err));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('raita_mitra_gallery_list', JSON.stringify(galleryList));
    } catch (err) {
      console.warn('LocalStorage quota limit exceeded for gallery list:', err);
    }
    
    // Prevent redundant POST on mount / server load
    if (isGalleryLoadedFromServer.current) {
      isGalleryLoadedFromServer.current = false;
      return;
    }
    if (isGalleryFirstRender.current) {
      isGalleryFirstRender.current = false;
      return;
    }

    // Save to server-side JSON API
    fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ galleryList })
    }).catch(err => console.error('Failed to sync gallery to server:', err));
  }, [galleryList]);

  const [jobsList, setJobsList] = useState<any[]>(() => {
    const saved = localStorage.getItem('raita_mitra_jobs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) { console.error(e); }
    }
    return [
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
    ];
  });

  // Load jobs list from server on mount
  useEffect(() => {
    fetch('/api/jobs?t=' + Date.now())
      .then(res => {
        if (!res.ok) throw new Error('API response not ok');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          isJobsLoadedFromServer.current = true;
          setJobsList(data);
        }
      })
      .catch(err => console.warn('Failed to load jobs from server, falling back to local storage:', err));
  }, []);

  // Sync jobs list state to local storage & server
  useEffect(() => {
    try {
      localStorage.setItem('raita_mitra_jobs', JSON.stringify(jobsList));
    } catch (err) {
      console.warn('LocalStorage quota limit exceeded for jobs:', err);
    }
    
    if (isJobsLoadedFromServer.current) {
      isJobsLoadedFromServer.current = false;
      return;
    }
    if (isJobsFirstRender.current) {
      isJobsFirstRender.current = false;
      return;
    }

    fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobsList })
    }).catch(err => console.error('Failed to sync jobs to server:', err));
  }, [jobsList]);

  const [editingJob, setEditingJob] = useState<any | null>(null);
  const [isCreatingJob, setIsCreatingJob] = useState<boolean>(false);
  const [newJobForm, setNewJobForm] = useState({
    title: '',
    department: 'Programs',
    location: 'Hubballi, Karnataka',
    type: 'Full-time',
    experience: '1-3 Years',
    salary: '₹4.5 - ₹6.0 LPA',
    description: '',
    requirements: ''
  });

  // CRUD editing and creation state managers
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState<boolean>(false);
  const [newBlogForm, setNewBlogForm] = useState({
    title: '',
    summary: '',
    topic: 'Agriculture',
    content: '',
    author: '',
    authorRole: '',
    image: '',
    imageName: '',
    video: '',
    videoName: ''
  });

  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState<boolean>(false);
  const [newEventForm, setNewEventForm] = useState({
    title: '',
    date: '2026-07-15',
    time: '10:00 AM - 4:00 PM',
    venue: '',
    category: 'agriculture',
    categoryLabel: 'Agriculture Programs',
    mode: 'Offline',
    seatsRemaining: 20,
    totalSeats: 50,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600',
    description: '',
    detailedInfo: '',
    imageName: '',
    video: '',
    videoName: ''
  });

  const [editingGallery, setEditingGallery] = useState<any | null>(null);
  const [isCreatingGallery, setIsCreatingGallery] = useState<boolean>(false);
  const [newGalleryForm, setNewGalleryForm] = useState({
    title: '',
    url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=300',
    tag1: 'Agriculture',
    tag2: 'Haveri',
    type: 'Image',
    size: '1.8 MB',
    imageName: '',
    videoName: ''
  });

  // CMS page states
  const [editingCms, setEditingCms] = useState<any | null>(null);
  const [isCreatingCms, setIsCreatingCms] = useState<boolean>(false);
  const [newCmsForm, setNewCmsForm] = useState({
    title: '',
    url: '',
    author: '',
    status: 'Draft',
    image: '',
    imageName: '',
    video: '',
    videoName: ''
  });

  // Programs states
  const [editingProgram, setEditingProgram] = useState<any | null>(null);
  const [isCreatingProgram, setIsCreatingProgram] = useState<boolean>(false);
  const [newProgramForm, setNewProgramForm] = useState({
    title: '',
    manager: '',
    region: '',
    status: 'In Progress',
    budget: 500000,
    beneficiaries: 1000,
    progress: 50,
    image: '',
    imageName: '',
    video: '',
    videoName: ''
  });

  // CRM states
  const [editingDonor, setEditingDonor] = useState<any | null>(null);
  const [isCreatingDonor, setIsCreatingDonor] = useState<boolean>(false);
  const [newDonorForm, setNewDonorForm] = useState({
    name: '',
    email: '',
    segment: 'Corporate CSR',
    totalGiving: 10000,
    engagements: 5,
    recommended: 'Solar Pump Grid II',
    status: 'Active Recurring',
    image: '',
    imageName: '',
    video: '',
    videoName: ''
  });

  // Volunteer states
  const [editingVolunteer, setEditingVolunteer] = useState<any | null>(null);
  const [isCreatingVolunteer, setIsCreatingVolunteer] = useState<boolean>(false);
  const [newVolunteerForm, setNewVolunteerForm] = useState({
    name: '',
    skill: '',
    location: '',
    status: 'Assigned',
    hours: 10,
    image: '',
    imageName: '',
    video: '',
    videoName: ''
  });
  
  // Search state variables
  const [donorSearch, setDonorSearch] = useState('');
  const [crmSegmentFilter, setCrmSegmentFilter] = useState('All');
  const [selectedDonorForDetail, setSelectedDonorForDetail] = useState<any | null>(null);

  // AI Studio generation interactive state
  const [studioPrompt, setStudioPrompt] = useState('Draft an engaging quarterly newsletter update summarizing how Mallappa Gowda achieved 3x crop yields through Raita Mitra Solar Pumps.');
  const [studioCategory, setStudioCategory] = useState<'blog' | 'proposal' | 'email' | 'social'>('blog');
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Workflow automation list
  const [workflowAutomations, setWorkflowAutomations] = useState([
    { id: 'wf_1', name: 'Trigger 80G Dispatched Email', active: true, trigger: 'Donation Received (Cleared)', integrations: ['Resend', 'Razorpay'] },
    { id: 'wf_2', name: 'Sync Corporate Teams to WhatsApp Groups', active: true, trigger: 'Corporate MOU Finalized', integrations: ['WhatsApp API', 'Google Sheets'] },
    { id: 'wf_3', name: 'Generate PDF Certificate on Volunteer Hour Mark', active: false, trigger: 'Volunteer Hours Reaches 50 Hrs', integrations: ['Resend'] },
    { id: 'wf_4', name: 'Disburse Agrarian Crop Reports to Dharwad Hubs', active: true, trigger: 'Monthly Soil Carbon Diagnostic Saved', integrations: ['WhatsApp API'] }
  ]);

  // System Config / Feature Flags Super Admin Settings
  const [featureFlags, setFeatureFlags] = useState({
    enableMultiTenant: true,
    enableMCPServer: false,
    enableBlockchainLedger: true,
    enableRealTimeGPSMap: true,
    maintenanceMode: false
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Auth simulators
  const handleAdminRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authInput.trim()) return;
    setOtpSent(true);
  };

  const handleAdminVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.trim()) {
      setIsAdminLoggedIn(true);
    }
  };

  // CMS functions
  const deleteCmsPage = (id: string) => {
    const page = cmsList.find(p => p.id === id);
    triggerConfirm(
      'Delete CMS Page Draft',
      `Are you sure you want to delete the content item: "${page?.title || 'Untitled'}"?`,
      () => {
        setCmsList(prev => prev.filter(p => p.id !== id));
      }
    );
  };

  const createCmsDraft = () => {
    const title = prompt('Enter page name:');
    if (!title) return;
    const newPage = {
      id: `pg_new_${Date.now()}`,
      title,
      author: adminUser.name,
      status: 'Draft',
      updated: new Date().toISOString().split('T')[0],
      version: 'v1.0 (Draft)',
      url: `/${title.toLowerCase().replace(/\s+/g, '-')}`
    };
    setCmsList([...cmsList, newPage]);
  };

  // AI Generation Simulation using server /api/chat as backup
  const handleGenerateAIContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studioPrompt.trim()) return;
    setIsGenerating(true);
    setGeneratedOutput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { sender: 'user', text: `As a professional non-profit copywriter for Raita Mitra Social Trust, generate a high-quality ${studioCategory} output based on this prompt: "${studioPrompt}"` }
          ]
        })
      });

      const data = await response.json();
      setGeneratedOutput(data.text || 'Error communicating with AI engine.');
      setIsGenerating(false);
    } catch (err) {
      console.error(err);
      // Fallback content if server fails
      setTimeout(() => {
        setGeneratedOutput(`✦ REGIONAL AGRARIAN OUTCOMES REPORT (DHARWAD & HAVERI) ✦\n\nWe are delighted to announce that Mallappa Gowda, our pioneering dryland farmer from Haveri, has successfully documented a 3x yield improvement on humic-rich organic soils using Raita Mitra's sponsored solar drip arrays.\n\n"The biological seed inputs, combined with uninterrupted solar-powered drip schedules, allowed my fields to thrive even amidst severe North Karnataka heatwaves. I saved exactly ₹18,400 in manual fuel costs this cycle."\n\nKEY BENCHMARKS MET:\n1. Acreage Restored: 4.8 Acres\n2. Soil Carbon Rehydration Quotient: +22%\n3. Escrow Fund Efficiency quotient: 92% direct program conversion.\n\nThank you to our dedicated individual and corporate patrons for enabling this transformation.`);
        setIsGenerating(false);
      }, 1000);
    }
  };

  // Toggle toggle flags
  const toggleFeatureFlag = (key: keyof typeof featureFlags) => {
    setFeatureFlags(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Toggle Workflow flag
  const toggleWorkflow = (id: string) => {
    setWorkflowAutomations(workflowAutomations.map(wf => {
      if (wf.id === id) return { ...wf, active: !wf.active };
      return wf;
    }));
  };

  const deleteWorkflow = (id: string) => {
    const wf = workflowAutomations.find(w => w.id === id);
    triggerConfirm(
      'Delete Automated Integration Script',
      `Are you sure you want to delete the automation flow: "${wf?.name || 'Untitled'}"?`,
      () => {
        setWorkflowAutomations(prev => prev.filter(wf => wf.id !== id));
      }
    );
  };

  // Filter donor CRM based on selection
  const filteredDonors = donorList.filter(d => {
    const matchStr = d.name.toLowerCase().includes(donorSearch.toLowerCase()) || d.email.toLowerCase().includes(donorSearch.toLowerCase());
    if (crmSegmentFilter === 'All') return matchStr;
    return matchStr && d.segment === crmSegmentFilter;
  });

  // Recharts Data definitions for Admin Charts
  const visitorTrafficData = [
    { name: 'Mon', 'Unique Visitors': 1400, 'Actions Count': 3200 },
    { name: 'Tue', 'Unique Visitors': 1800, 'Actions Count': 4100 },
    { name: 'Wed', 'Unique Visitors': 2200, 'Actions Count': 5200 },
    { name: 'Thu', 'Unique Visitors': 2400, 'Actions Count': 5900 },
    { name: 'Fri', 'Unique Visitors': 2100, 'Actions Count': 4900 },
    { name: 'Sat', 'Unique Visitors': 1200, 'Actions Count': 2600 },
    { name: 'Sun', 'Unique Visitors': 1600, 'Actions Count': 3500 }
  ];

  const categoryAcreageDistribution = [
    { name: 'Humic Seeds', value: 45, color: '#10b981' },
    { name: 'Solar Arrays', value: 35, color: '#3b82f6' },
    { name: 'STEM Classrooms', value: 12, color: '#8b5cf6' },
    { name: 'Pediatric Kits', value: 8, color: '#ec4899' }
  ];

  return (
    <div className={`w-full min-h-screen ${highContrast ? 'bg-black text-white' : 'bg-[#faf9f6] text-slate-800'}`}>
      
      {/* ECOSYSTEM ADHERENCE STATS HEADER */}
      <div className="bg-slate-950 text-white border-b border-slate-800 py-3.5 px-4 sticky top-0 z-40 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg">
        <div className="flex items-center gap-3 text-left">
          <span className="p-1.5 bg-amber-500 rounded text-slate-950">
            <Sliders className="w-4 h-4 animate-spin-slow" />
          </span>
          <div>
            <h4 className="text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
              Raita Mitra Unified Admin Control
              <span className="bg-emerald-950 border border-emerald-500/50 text-emerald-400 text-[9px] font-mono px-2 py-0.2 rounded-full font-bold">SuperUser Mode</span>
            </h4>
            <p className="text-[10px] text-slate-400 font-mono">Authenticated: {adminUser.email} • Authorization: {adminUser.permissions}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-emerald-400 hidden sm:inline">● SSL Vault Connected</span>
          <button 
            onClick={() => setIsAdminLoggedIn(!isAdminLoggedIn)}
            className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer"
          >
            {isAdminLoggedIn ? '🚪 Exit Command Center' : '🔑 Secure Admin Gate'}
          </button>
        </div>
      </div>

      {/* RENDER PHASE A: SECURE ADMIN LOGIN SCREEN */}
      {!isAdminLoggedIn ? (
        <section className="max-w-4xl mx-auto py-24 px-4">
          <div className={`grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border ${
            highContrast ? 'bg-black border-2 border-white' : 'bg-white border-slate-200/50 shadow-2xl'
          }`}>
            
            <div className="bg-slate-900 text-white p-10 flex flex-col justify-between min-h-[350px] text-left relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600")' }} />
              
              <div className="space-y-3 relative z-10">
                <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] font-mono rounded-full font-bold uppercase">
                  CRM COMMAND CORE
                </span>
                <h3 className="text-2xl font-display font-black leading-tight text-white">Trust Administration Gateway</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Authenticate with authorized credentials to verify statutory compliance, manipulate website draft pages, segment donor engagements, and supervise AI content synthesis pipelines.
                </p>
              </div>

              <p className="text-[9px] font-mono text-slate-500 relative z-10 pt-4 border-t border-slate-800">
                ⚠️ Secure auditing protocols active. All login iterations are timestamped and logged on pgvector database master ledgers.
              </p>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center text-left space-y-6 bg-white">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900 font-display">Credential Verification</h4>
                <p className="text-xs text-slate-400">Single Sign-On or Mobile OTP authorized for trust operators.</p>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl text-xs font-mono">
                {(['google', 'microsoft', 'email'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => { setAuthMethod(m); setOtpSent(false); }}
                    className={`py-2 rounded-lg text-center font-bold capitalize cursor-pointer transition-all ${
                      authMethod === m ? 'bg-slate-900 text-white shadow' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {m === 'google' ? 'Google SSO' : m === 'microsoft' ? 'Microsoft' : 'Email OTP'}
                  </button>
                ))}
              </div>

              <form onSubmit={otpSent ? handleAdminVerifyOtp : handleAdminRequestOtp} className="space-y-4">
                {authMethod === 'email' ? (
                  <div>
                    <label htmlFor="adm-email-input" className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">SuperUser Email</label>
                    <input
                      id="adm-email-input"
                      type="email"
                      required
                      placeholder="anusha.gmcsco@gmail.com"
                      value={authInput}
                      onChange={(e) => setAuthInput(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-slate-900 focus:outline-none text-xs font-mono text-slate-800"
                    />
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150 space-y-3">
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      Federated security is configured. Click the button below to simulate credential handshake via {authMethod.toUpperCase()} SSO.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsAdminLoggedIn(true)}
                      className="w-full py-2 bg-slate-900 text-white font-mono font-bold text-xs rounded-xl"
                    >
                      Bypass & Handshake via {authMethod.toUpperCase()}
                    </button>
                  </div>
                )}

                {otpSent && (
                  <div>
                    <label htmlFor="adm-otp-input" className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Verification OTP</label>
                    <input
                      id="adm-otp-input"
                      type="text"
                      required
                      maxLength={6}
                      placeholder="123456"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl text-center text-lg font-mono tracking-widest font-bold"
                    />
                  </div>
                )}

                {authMethod === 'email' && (
                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-xs font-mono uppercase tracking-wider"
                  >
                    {otpSent ? 'Verify Code' : 'Dispatched Administrative Key'}
                  </button>
                )}
              </form>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => setIsAdminLoggedIn(true)}
                  className="w-full text-center text-[11px] font-mono text-amber-600 hover:underline font-black cursor-pointer"
                >
                  ⚡ Force Entry: Access SuperAdmin Dashboard Instantly
                </button>
              </div>
            </div>

          </div>
        </section>
      ) : (
        /* RENDER PHASE B: COMPREHENSIVE WORKSPACE DESKTOP CODES */
        <main className="max-w-7xl mx-auto py-10 px-4 space-y-10 text-left">
          
          {/* USER WELCOME CARD */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-250 pb-6">
            <div className="flex items-center gap-4 text-left">
              <img 
                src={adminUser.avatar} 
                alt={adminUser.name} 
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-500 shadow-sm"
                referrerPolicy="referrer"
              />
              <div className="space-y-0.5">
                <h2 className="text-xl font-display font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Welcome Back, {adminUser.name}</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-mono font-bold rounded uppercase">
                    {adminUser.role}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Unified System Node Connected • Session Valid for 8 Hrs
                </p>
              </div>
            </div>

            {/* Quick Action Selector */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-mono self-stretch sm:self-auto justify-center">
              <button
                onClick={() => setCurrentAdminTab('overview')}
                className={`px-4 py-2 rounded-lg font-bold cursor-pointer transition-all ${
                  currentAdminTab === 'overview' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Executive Command
              </button>
              <button
                onClick={() => setCurrentAdminTab('system')}
                className={`px-4 py-2 rounded-lg font-bold cursor-pointer transition-all ${
                  currentAdminTab === 'system' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Super-Admin Settings
              </button>
            </div>
          </section>

          {/* DYNAMIC TWO-COLUMN WORKSPACE WRAPPER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: NAVIGATION SIDEBAR */}
            <div className="lg:col-span-3 space-y-6 text-left">
              
              <div className="bg-white rounded-3xl border border-slate-200 p-4 space-y-1.5 shadow-sm">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400 px-3 tracking-wider block mb-2">Command Center Links</span>
                
                {[
                  { id: 'overview', label: '📊 Command Dashboard' },
                  { id: 'cms', label: '📝 CMS Page Manager' },
                  { id: 'blogs', label: '📰 Blogs Manager ✦' },
                  { id: 'events', label: '📅 Events Manager ✦' },
                  { id: 'gallery', label: '🖼️ Gallery Manager ✦' },
                  { id: 'seo', label: '🔍 Page SEO Manager ✦' },
                  { id: 'submissions', label: '📋 Forms & Sheets Sync ✦' },
                  { id: 'programs', label: '🎯 Programs Kanban' },
                  { id: 'crm', label: '🤝 Donor CRM Hub' },
                  { id: 'volunteers', label: '🙋 Volunteer Force' },
                  { id: 'careers', label: '💼 Career Roles (CRUD)' },
                  { id: 'workflow', label: '⚡ Visual Flows (n8n)' },
                  { id: 'aistudio', label: '🎨 AI Copywriter Studio' },
                  { id: 'integrations', label: '🔗 Integration Keys' },
                  { id: 'system', label: '⚙️ Super-Admin Control' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentAdminTab(tab.id as any)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      currentAdminTab === tab.id 
                        ? 'bg-slate-950 text-white font-extrabold border-l-4 border-amber-500 shadow-sm'
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <ChevronRight size={12} className="opacity-40" />
                  </button>
                ))}
              </div>

              {/* Multi-Agent Live Status indicator */}
              <div className="bg-slate-950 text-white rounded-3xl p-5 space-y-4 border border-slate-800 text-left">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <h4 className="text-xs font-bold font-mono uppercase text-amber-400 flex items-center gap-1">
                    <Cpu size={14} className="animate-pulse" />
                    <span>AI Multi-Agent Center</span>
                  </h4>
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                </div>

                <div className="space-y-3 font-mono text-[10px]">
                  {MULTI_AGENT_CENTER.map((agent, i) => (
                    <div key={i} className="space-y-1 border-b border-slate-900 pb-2 last:border-0 last:pb-0">
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-200">{agent.name}</span>
                        <span className={`text-[8px] uppercase px-1.5 rounded ${
                          agent.status === 'Idle' ? 'bg-slate-800 text-slate-400' : 'bg-emerald-950 text-emerald-400'
                        }`}>{agent.status}</span>
                      </div>
                      <p className="text-[9px] text-slate-400 leading-normal">{agent.role}</p>
                      <div className="flex justify-between text-[8px] text-slate-500">
                        <span>Model: {agent.model}</span>
                        <span>Accuracy: {agent.accuracy}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Link Info panel */}
              <div className="p-4 bg-amber-50 rounded-2xl text-[11px] text-amber-800 space-y-1 text-left leading-relaxed">
                <strong>💡 Tip for SuperUsers:</strong> You can edit and manipulate drafts in the "CMS Page Manager" or test "Visual Flows" directly using the workspace sandbox templates below.
              </div>

            </div>

            {/* RIGHT COLUMN: CORE WORKSPACE CANVAS */}
            <div className="lg:col-span-9 space-y-6 text-left">
              
              {/* TAB 1: EXECUTIVE COMMAND CENTER OVERVIEW */}
              {currentAdminTab === 'overview' && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Dynamic Metrics Widgets Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {ECOSYSTEM_METRICS.map((metric, i) => (
                      <div key={i} className="p-6 bg-white border border-slate-200 rounded-3xl text-left space-y-2 shadow-sm">
                        <div className="flex justify-between items-start">
                          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{metric.label}</p>
                          <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded">
                            {metric.change}
                          </span>
                        </div>
                        <h3 className="text-3xl font-display font-black text-slate-900">{metric.value}</h3>
                        <div className="border-t border-slate-50 pt-2 text-[9px] font-mono text-slate-400">
                          {metric.sub}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recharts Analytics: Visitor Traffic Flow */}
                  <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider block">TRAFFIC FLOW STATS</span>
                        <h4 className="text-base font-bold font-display text-slate-900">Ecosystem Traffic & Client Handshakes</h4>
                      </div>
                      <span className="px-3 py-1 bg-slate-50 border rounded-xl text-xs font-mono font-bold text-slate-500">Live Weekly</span>
                    </div>

                    <div className="h-64 w-full pt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={visitorTrafficData} margin={{ left: -20, right: 10 }}>
                          <defs>
                            <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorAct" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} fontClassName="font-mono" />
                          <YAxis stroke="#94a3b8" fontSize={10} fontClassName="font-mono" />
                          <Tooltip />
                          <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
                          <Area type="monotone" dataKey="Unique Visitors" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVis)" strokeWidth={2} />
                          <Area type="monotone" dataKey="Actions Count" stroke="#10b981" fillOpacity={1} fill="url(#colorAct)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Programmatic allocations distribution (Pie Chart) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4">
                      <h4 className="text-xs font-mono font-bold uppercase text-slate-400">Trust Asset Distribution</h4>
                      
                      <div className="h-52 w-full flex items-center justify-center relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryAcreageDistribution}
                              cx="50%"
                              cy="50%"
                              innerRadius={45}
                              outerRadius={65}
                              paddingAngle={4}
                              dataKey="value"
                            >
                              {categoryAcreageDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                          <span className="text-xl font-mono font-black text-slate-800">18</span>
                          <span className="text-[8px] font-mono text-slate-400 uppercase">Supported Clusters</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-500">
                        {categoryAcreageDistribution.map((entry, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span>{entry.name} ({entry.value}%)</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Audit Timelines */}
                    <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase text-slate-400 pb-2 border-b border-slate-50">Ecosystem Health Metrics</h4>
                        <div className="space-y-2.5 pt-3 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-slate-500">App Server CPU Outlay</span>
                            <span className="font-bold text-emerald-600">{SYSTEM_HEALTH_METRICS.cpu}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Node JS Sandbox RAM</span>
                            <span className="font-bold text-slate-800">{SYSTEM_HEALTH_METRICS.memory}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Ingress Ping Latency</span>
                            <span className="font-bold text-slate-800">{SYSTEM_HEALTH_METRICS.ping}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Supabase DB Sync Node</span>
                            <span className="font-bold text-slate-800">{SYSTEM_HEALTH_METRICS.dbStatus}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Redis Cache Hit Rate</span>
                            <span className="font-bold text-emerald-600">{SYSTEM_HEALTH_METRICS.redisCacheHits}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl text-[10px] text-slate-400 font-sans leading-relaxed">
                        ⚡ <strong>Hot Reload Active:</strong> Developer servers are serving assets successfully on Port 3000. Next automatic backup triggers tomorrow 04:00 AM.
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: CMS MODULES */}
              {currentAdminTab === 'cms' && (
                <div className="p-6 bg-white border border-slate-200 rounded-3xl text-left space-y-6 animate-fade-in">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-extrabold font-display text-slate-900">Ecosystem Content Management (CMS)</h3>
                      <p className="text-xs text-slate-400">Manipulate active website routing definitions, manage story drafts, and draft compliance files.</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsCreatingCms(true);
                        setEditingCms(null);
                        setNewCmsForm({
                          title: '',
                          url: '',
                          author: adminUser.name,
                          status: 'Draft',
                          image: '',
                          imageName: '',
                          video: '',
                          videoName: ''
                        });
                      }}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <PlusCircle size={14} />
                      <span>CREATE CONTENT DRAFT</span>
                    </button>
                  </div>

                  {(isCreatingCms || editingCms) ? (
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs animate-fade-in font-sans">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <h4 className="font-extrabold text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                          <span>{isCreatingCms ? 'Draft New CMS Page' : 'Edit CMS Page Node'}</span>
                        </h4>
                        <button
                          onClick={() => {
                            setIsCreatingCms(false);
                            setEditingCms(null);
                          }}
                          className="px-2 py-1 bg-white hover:bg-slate-100 border text-slate-500 rounded font-mono text-[10px] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Page Node Title</label>
                            <input
                              type="text"
                              value={isCreatingCms ? newCmsForm.title : editingCms.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingCms) {
                                  setNewCmsForm({ ...newCmsForm, title: val, url: `/${val.toLowerCase().replace(/\s+/g, '-')}` });
                                } else {
                                  setEditingCms({ ...editingCms, title: val, url: `/${val.toLowerCase().replace(/\s+/g, '-')}` });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              placeholder="e.g., Agrarian Soil Micro-Grids"
                            />
                          </div>
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Public Route URI</label>
                            <input
                              type="text"
                              value={isCreatingCms ? newCmsForm.url : editingCms.url}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingCms) {
                                  setNewCmsForm({ ...newCmsForm, url: val });
                                } else {
                                  setEditingCms({ ...editingCms, url: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-mono"
                              placeholder="e.g., /soil-grids"
                            />
                          </div>
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Primary Editor / Author</label>
                            <input
                              type="text"
                              value={isCreatingCms ? newCmsForm.author : editingCms.author}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingCms) {
                                  setNewCmsForm({ ...newCmsForm, author: val });
                                } else {
                                  setEditingCms({ ...editingCms, author: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Page Status</label>
                            <select
                              value={isCreatingCms ? newCmsForm.status : editingCms.status}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingCms) {
                                  setNewCmsForm({ ...newCmsForm, status: val });
                                } else {
                                  setEditingCms({ ...editingCms, status: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                            >
                              <option value="Draft">Draft Mode</option>
                              <option value="Published">Published Live</option>
                            </select>
                          </div>

                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider font-mono">Upload CMS Page Assets</label>
                            <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-slate-200">
                              <div>
                                <span className="block mb-1 text-[9px] text-slate-400 font-mono font-bold">IMAGE FILE</span>
                                <div className="relative border border-dashed border-slate-200 hover:border-indigo-400 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50">
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const base64Url = reader.result as string;
                                          if (isCreatingCms) {
                                            setNewCmsForm({ ...newCmsForm, image: base64Url, imageName: file.name });
                                          } else {
                                            setEditingCms({ ...editingCms, image: base64Url, imageName: file.name });
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <ImageIcon className="w-4 h-4 text-slate-400 mb-0.5" />
                                  <span className="text-[9px] text-slate-600 font-bold truncate max-w-full">
                                    {(isCreatingCms ? newCmsForm.imageName : editingCms.imageName) || 'Choose Image'}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <span className="block mb-1 text-[9px] text-slate-400 font-mono font-bold">VIDEO FILE</span>
                                <div className="relative border border-dashed border-slate-200 hover:border-indigo-400 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50">
                                  <input 
                                    type="file" 
                                    accept="video/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const base64Url = reader.result as string;
                                          if (isCreatingCms) {
                                            setNewCmsForm({ ...newCmsForm, video: base64Url, videoName: file.name });
                                          } else {
                                            setEditingCms({ ...editingCms, video: base64Url, videoName: file.name });
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <Video className="w-4 h-4 text-slate-400 mb-0.5" />
                                  <span className="text-[9px] text-slate-600 font-bold truncate max-w-full">
                                    {(isCreatingCms ? newCmsForm.videoName : editingCms.videoName) || 'Choose Video'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Visual Asset Previews */}
                            <div className="mt-2 flex gap-2">
                              {(isCreatingCms ? newCmsForm.image : editingCms.image) && (
                                <div className="flex items-center gap-1.5 bg-indigo-50/50 p-1 rounded border text-[9px] text-indigo-700">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                  <span>Image Selected</span>
                                </div>
                              )}
                              {(isCreatingCms ? newCmsForm.video : editingCms.video) && (
                                <div className="flex items-center gap-1.5 bg-indigo-50/50 p-1 rounded border text-[9px] text-indigo-700">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                  <span>Video Selected</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-3 border-t font-mono">
                        <button
                          onClick={() => {
                            setIsCreatingCms(false);
                            setEditingCms(null);
                          }}
                          className="px-4 py-2 border rounded-xl hover:bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer"
                        >
                          CANCEL
                        </button>
                        <button
                          onClick={() => {
                            if (isCreatingCms) {
                              const newPage = {
                                id: `pg_new_${Date.now()}`,
                                title: newCmsForm.title || 'Untitled Node',
                                url: newCmsForm.url || '/untitled-node',
                                author: newCmsForm.author || adminUser.name,
                                status: newCmsForm.status,
                                updated: new Date().toISOString().split('T')[0],
                                version: 'v1.0 (Draft)',
                                image: newCmsForm.image,
                                video: newCmsForm.video
                              };
                              setCmsList([...cmsList, newPage]);
                              setIsCreatingCms(false);
                            } else {
                              const updated = cmsList.map(p => p.id === editingCms.id ? editingCms : p);
                              setCmsList(updated);
                              setEditingCms(null);
                            }
                          }}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                        >
                          {isCreatingCms ? 'PUBLISH PAGE DRAFT' : 'SAVE CMS CHANGES'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto font-sans">
                      <table className="w-full text-xs font-mono">
                        <thead>
                          <tr className="border-b text-slate-400 uppercase text-[10px] font-bold bg-slate-50">
                            <th className="py-3 px-4 text-left">Page Node ID</th>
                            <th className="py-3 px-4 text-left">Public Route URI</th>
                            <th className="py-3 px-4 text-left">Primary Editor</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Updated</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150">
                          {cmsList.map(page => (
                            <tr key={page.id} className="hover:bg-slate-50/50">
                              <td className="py-3.5 px-4 font-bold text-slate-800">{page.title}</td>
                              <td className="py-3.5 px-4 text-slate-500">{page.url}</td>
                              <td className="py-3.5 px-4 text-slate-500">{page.author}</td>
                              <td className="py-3.5 px-4">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                  page.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                }`}>
                                  {page.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-slate-400">{page.updated}</td>
                              <td className="py-3.5 px-4 text-right space-x-1">
                                <button
                                  onClick={() => {
                                    setEditingCms(page);
                                    setIsCreatingCms(false);
                                  }}
                                  className="px-2 py-1 bg-slate-50 text-slate-600 rounded border hover:bg-slate-100 cursor-pointer text-[10px]"
                                >
                                  Edit Draft
                                </button>
                                <button
                                  onClick={() => setActivePage?.(page.url.replace(/^\//, ''))}
                                  className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded border border-emerald-200 cursor-pointer text-[10px] inline-flex items-center gap-1"
                                >
                                  <ExternalLink size={10} />
                                  <span>Go Live</span>
                                </button>
                                <button
                                  onClick={() => deleteCmsPage(page.id)}
                                  className="px-2 py-1 bg-rose-50 text-rose-600 rounded border border-rose-200 hover:bg-rose-100 cursor-pointer text-[10px]"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Media Library component */}
                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 font-display">Media Asset Manager (Pinterest Grid)</h4>
                    <p className="text-xs text-slate-400 font-mono">Drag and drop assets. Cloudinary storage synchronization code is fully integrated.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      {MEDIA_ASSETS_COLLECTION.map((asset, index) => (
                        <div key={index} className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all">
                          <img src={asset.url} alt={asset.title} className="w-full h-36 object-cover" />
                          <div className="p-3 text-left space-y-1">
                            <h5 className="text-[11px] font-bold truncate text-slate-800">{asset.title}</h5>
                            <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono">
                              <span>{asset.size}</span>
                              <span className="bg-slate-100 px-1.5 py-0.2 rounded">{asset.type}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB: BLOGS MANAGER */}
              {currentAdminTab === 'blogs' && (
                <div className="p-6 bg-white border border-slate-200 rounded-3xl text-left space-y-6 animate-fade-in font-sans">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-extrabold font-display text-slate-900 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-indigo-500" />
                        <span>Ecosystem Blog Management Center</span>
                      </h3>
                      <p className="text-xs text-slate-400">Add, edit, or delete authoritative blog articles and agronomy tech guides.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsCreatingBlog(true);
                          setEditingBlog(null);
                          setNewBlogForm({
                            title: '',
                            summary: '',
                            topic: 'Agriculture',
                            content: '',
                            author: adminUser.name,
                            authorRole: adminUser.role
                          });
                        }}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <PlusCircle size={14} />
                        <span>PUBLISH NEW POST</span>
                      </button>
                      
                      <button
                        onClick={() => setActivePage?.('blog')}
                        className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-mono text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-indigo-200"
                      >
                        <ExternalLink size={14} />
                        <span>GO TO LIVE BLOG PAGE</span>
                      </button>
                    </div>
                  </div>

                  {(isCreatingBlog || editingBlog) ? (
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs animate-fade-in">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <h4 className="font-extrabold text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                          <span>{isCreatingBlog ? 'Publish New Blog Post' : 'Edit Blog Post Content'}</span>
                        </h4>
                        <button
                          onClick={() => {
                            setIsCreatingBlog(false);
                            setEditingBlog(null);
                          }}
                          className="px-2 py-1 bg-white hover:bg-slate-100 border text-slate-500 rounded font-mono text-[10px] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Article Title</label>
                            <input
                              type="text"
                              value={isCreatingBlog ? newBlogForm.title : editingBlog.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingBlog) {
                                  setNewBlogForm({ ...newBlogForm, title: val });
                                } else {
                                  setEditingBlog({ ...editingBlog, title: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              placeholder="e.g., New Solar Irrigation Micro-Drips Installed"
                            />
                          </div>
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Topic Focus</label>
                            <select
                              value={isCreatingBlog ? newBlogForm.topic : editingBlog.topic}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingBlog) {
                                  setNewBlogForm({ ...newBlogForm, topic: val });
                                } else {
                                  setEditingBlog({ ...editingBlog, topic: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                            >
                              <option value="Agriculture">Agriculture</option>
                              <option value="Women Empowerment">Women Empowerment</option>
                              <option value="Education & AI Skills">Education & AI Skills</option>
                              <option value="Health & Nutrition">Health & Nutrition</option>
                              <option value="Climate Action">Climate Action</option>
                              <option value="Entrepreneurship">Entrepreneurship</option>
                              <option value="CSR & ESG">CSR & ESG</option>
                            </select>
                          </div>
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Article Summary</label>
                            <textarea
                              value={isCreatingBlog ? newBlogForm.summary : editingBlog.summary}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingBlog) {
                                  setNewBlogForm({ ...newBlogForm, summary: val });
                                } else {
                                  setEditingBlog({ ...editingBlog, summary: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 leading-normal"
                              rows={3}
                              placeholder="Write a brief 1-2 sentence overview of the piece."
                            />
                          </div>
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider font-mono">Article Cover Assets</label>
                            <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-slate-200">
                              <div>
                                <span className="block mb-1 text-[9px] text-slate-400 font-mono font-bold">UPLOAD IMAGE</span>
                                <div className="relative border border-dashed border-slate-200 hover:border-indigo-400 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50">
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const base64Url = reader.result as string;
                                          if (isCreatingBlog) {
                                            setNewBlogForm(prev => ({ ...prev, image: '', imageName: 'Uploading...' }));
                                          } else {
                                            setEditingBlog(prev => prev ? ({ ...prev, image: '', imageName: 'Uploading...' }) : null);
                                          }
                                          uploadMediaToServer(base64Url, file.name).then(url => {
                                            if (isCreatingBlog) {
                                              setNewBlogForm(prev => ({ ...prev, image: url, imageName: file.name }));
                                            } else {
                                              setEditingBlog(prev => prev ? ({ ...prev, image: url, imageName: file.name }) : null);
                                            }
                                          });
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <ImageIcon className="w-4 h-4 text-slate-400 mb-0.5" />
                                  <span className="text-[9px] text-slate-600 font-bold truncate max-w-full">
                                    {(isCreatingBlog ? newBlogForm.imageName : editingBlog.imageName) || 'Choose Image'}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <span className="block mb-1 text-[9px] text-slate-400 font-mono font-bold">UPLOAD VIDEO</span>
                                <div className="relative border border-dashed border-slate-200 hover:border-indigo-400 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50">
                                  <input 
                                    type="file" 
                                    accept="video/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const base64Url = reader.result as string;
                                          if (isCreatingBlog) {
                                            setNewBlogForm(prev => ({ ...prev, video: '', videoName: 'Uploading...' }));
                                          } else {
                                            setEditingBlog(prev => prev ? ({ ...prev, video: '', videoName: 'Uploading...' }) : null);
                                          }
                                          uploadMediaToServer(base64Url, file.name).then(url => {
                                            if (isCreatingBlog) {
                                              setNewBlogForm(prev => ({ ...prev, video: url, videoName: file.name }));
                                            } else {
                                              setEditingBlog(prev => prev ? ({ ...prev, video: url, videoName: file.name }) : null);
                                            }
                                          });
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <Video className="w-4 h-4 text-slate-400 mb-0.5" />
                                  <span className="text-[9px] text-slate-600 font-bold truncate max-w-full">
                                    {(isCreatingBlog ? newBlogForm.videoName : editingBlog.videoName) || 'Choose Video'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Visual Asset Previews */}
                            <div className="mt-2 flex gap-2">
                              {(isCreatingBlog ? newBlogForm.image : editingBlog.image) && (
                                <div className="flex items-center gap-1.5 bg-indigo-50/50 p-1 rounded border text-[9px] text-indigo-700">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                  <span>Image Selected</span>
                                </div>
                              )}
                              {(isCreatingBlog ? newBlogForm.video : editingBlog.video) && (
                                <div className="flex items-center gap-1.5 bg-indigo-50/50 p-1 rounded border text-[9px] text-indigo-700">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                  <span>Video Selected</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Author Name</label>
                              <input
                                type="text"
                                value={isCreatingBlog ? newBlogForm.author : editingBlog.author}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingBlog) {
                                    setNewBlogForm({ ...newBlogForm, author: val });
                                  } else {
                                    setEditingBlog({ ...editingBlog, author: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                                placeholder="Author Name"
                              />
                            </div>
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Author Role</label>
                              <input
                                type="text"
                                value={isCreatingBlog ? newBlogForm.authorRole : editingBlog.authorRole}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingBlog) {
                                    setNewBlogForm({ ...newBlogForm, authorRole: val });
                                  } else {
                                    setEditingBlog({ ...editingBlog, authorRole: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                                placeholder="Author Role"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Full Content (Markdown or Plain Text)</label>
                            <textarea
                              value={isCreatingBlog ? newBlogForm.content : editingBlog.content}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingBlog) {
                                  setNewBlogForm({ ...newBlogForm, content: val });
                                } else {
                                  setEditingBlog({ ...editingBlog, content: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 leading-normal font-sans"
                              rows={6}
                              placeholder="Write the extensive article body content..."
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-3 border-t font-mono">
                        <button
                          onClick={() => {
                            setIsCreatingBlog(false);
                            setEditingBlog(null);
                          }}
                          className="px-4 py-2 border rounded-xl hover:bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer"
                        >
                          CANCEL
                        </button>
                        <button
                          onClick={() => {
                            if (isCreatingBlog) {
                              const title = newBlogForm.title || 'Untitled Article';
                              const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                              const newBlog = {
                                id: `art_new_${Date.now()}`,
                                title,
                                slug,
                                summary: newBlogForm.summary || 'No summary provided.',
                                category: 'insight',
                                topic: newBlogForm.topic,
                                tags: ['Community', newBlogForm.topic],
                                author: newBlogForm.author || adminUser.name,
                                authorRole: newBlogForm.authorRole || adminUser.role,
                                updatedDate: new Date().toISOString().split('T')[0],
                                viewsCount: 15,
                                content: newBlogForm.content || 'Actionable content details for our clusters.',
                                image: newBlogForm.image || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=800',
                                video: newBlogForm.video || ''
                              };
                              setBlogsList([newBlog, ...blogsList]);
                              setIsCreatingBlog(false);
                            } else {
                              const updated = blogsList.map(b => b.id === editingBlog.id ? { ...editingBlog, updatedDate: new Date().toISOString().split('T')[0] } : b);
                              setBlogsList(updated);
                              setEditingBlog(null);
                            }
                          }}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                        >
                          {isCreatingBlog ? 'PUBLISH NEW POST' : 'SAVE CHANGES'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto font-sans">
                      <table className="w-full text-xs font-mono">
                        <thead>
                          <tr className="border-b text-slate-400 uppercase text-[10px] font-bold bg-slate-50">
                            <th className="py-3 px-4 text-left">Article Title</th>
                            <th className="py-3 px-4 text-left">Category / Topic</th>
                            <th className="py-3 px-4 text-left">Primary Author</th>
                            <th className="py-3 px-4 text-left">Views</th>
                            <th className="py-3 px-4 text-left">Published</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150 font-mono text-[11px]">
                          {blogsList.map(blog => (
                            <tr key={blog.id} className="hover:bg-slate-50/50">
                              <td className="py-3.5 px-4 text-left font-bold text-slate-800">
                                <div className="max-w-[280px] truncate" title={blog.title}>{blog.title}</div>
                                <span className="text-[10px] text-slate-400 font-mono block">slug: {blog.slug}</span>
                              </td>
                              <td className="py-3.5 px-4 text-left">
                                <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600 font-bold uppercase text-[9px]">
                                  {blog.topic || 'Agriculture'}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-left text-slate-500">{blog.author}</td>
                              <td className="py-3.5 px-4 text-left text-slate-500 font-bold">{blog.viewsCount || 0}</td>
                              <td className="py-3.5 px-4 text-left text-slate-400">{blog.updatedDate || blog.date}</td>
                              <td className="py-3.5 px-4 text-right space-x-1">
                                <button
                                  onClick={() => {
                                    setEditingBlog(blog);
                                    setIsCreatingBlog(false);
                                  }}
                                  className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded border border-amber-200 cursor-pointer text-[10px]"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => setActivePage?.(`blog/${blog.slug}`)}
                                  className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded border border-indigo-200 cursor-pointer text-[10px] inline-flex items-center gap-1"
                                >
                                  <ExternalLink size={10} />
                                  <span>Go Live</span>
                                </button>
                                <button
                                  onClick={() => {
                                    triggerConfirm(
                                      'Delete Blog Post',
                                      `Are you sure you want to delete the blog post: "${blog.title}"? This will remove it from the public directory.`,
                                      () => {
                                        setBlogsList(prev => prev.filter(b => b.id !== blog.id));
                                      }
                                    );
                                  }}
                                  className="px-2 py-1 bg-rose-50 text-rose-600 rounded border border-rose-200 hover:bg-rose-100 cursor-pointer text-[10px]"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: EVENTS MANAGER */}
              {currentAdminTab === 'events' && (
                <div className="p-6 bg-white border border-slate-200 rounded-3xl text-left space-y-6 animate-fade-in font-sans">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-extrabold font-display text-slate-900 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-emerald-500" />
                        <span>Ecosystem Scheduled Campaigns & Events</span>
                      </h3>
                      <p className="text-xs text-slate-400">Schedule on-field diagnostic drives, coding sessions, or CSR summits.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsCreatingEvent(true);
                          setEditingEvent(null);
                          setNewEventForm({
                            title: '',
                            date: '2026-07-15',
                            time: '10:00 AM - 4:00 PM',
                            venue: '',
                            category: 'agriculture',
                            categoryLabel: 'Agriculture Programs',
                            mode: 'Offline',
                            seatsRemaining: 25,
                            totalSeats: 50,
                            image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600',
                            description: '',
                            detailedInfo: ''
                          });
                        }}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <PlusCircle size={14} />
                        <span>SCHEDULE NEW EVENT</span>
                      </button>
                      
                      <button
                        onClick={() => setActivePage?.('events')}
                        className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-mono text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-emerald-200"
                      >
                        <ExternalLink size={14} />
                        <span>GO TO LIVE EVENTS PAGE</span>
                      </button>
                    </div>
                  </div>

                  {(isCreatingEvent || editingEvent) ? (
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs animate-fade-in">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <h4 className="font-extrabold text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          <span>{isCreatingEvent ? 'Schedule New Outreach Event' : 'Edit Scheduled Campaign details'}</span>
                        </h4>
                        <button
                          onClick={() => {
                            setIsCreatingEvent(false);
                            setEditingEvent(null);
                          }}
                          className="px-2 py-1 bg-white hover:bg-slate-100 border text-slate-500 rounded font-mono text-[10px] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Campaign Title</label>
                            <input
                              type="text"
                              value={isCreatingEvent ? newEventForm.title : editingEvent.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingEvent) {
                                  setNewEventForm({ ...newEventForm, title: val });
                                } else {
                                  setEditingEvent({ ...editingEvent, title: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              placeholder="e.g., Drone Seed Dispersion Masterclass"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Date</label>
                              <input
                                type="text"
                                value={isCreatingEvent ? newEventForm.date : editingEvent.date}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingEvent) {
                                    setNewEventForm({ ...newEventForm, date: val });
                                  } else {
                                    setEditingEvent({ ...editingEvent, date: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                                placeholder="YYYY-MM-DD"
                              />
                            </div>
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Time Window</label>
                              <input
                                type="text"
                                value={isCreatingEvent ? newEventForm.time : editingEvent.time}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingEvent) {
                                    setNewEventForm({ ...newEventForm, time: val });
                                  } else {
                                    setEditingEvent({ ...editingEvent, time: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                                placeholder="e.g., 10:00 AM - 3:30 PM"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Campaign Venue Address</label>
                            <input
                              type="text"
                              value={isCreatingEvent ? newEventForm.venue : editingEvent.venue}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingEvent) {
                                  setNewEventForm({ ...newEventForm, venue: val });
                                } else {
                                  setEditingEvent({ ...editingEvent, venue: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              placeholder="e.g., Haveri Cooperative Hub, Karnataka"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Campaign Mode</label>
                              <select
                                value={isCreatingEvent ? newEventForm.mode : editingEvent.mode}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingEvent) {
                                    setNewEventForm({ ...newEventForm, mode: val });
                                  } else {
                                    setEditingEvent({ ...editingEvent, mode: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              >
                                <option value="Offline">Offline / Physical</option>
                                <option value="Online">Online / Zoom</option>
                              </select>
                            </div>
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Status</label>
                              <select
                                value={isCreatingEvent ? newEventForm.status : editingEvent.status}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingEvent) {
                                    setNewEventForm({ ...newEventForm, status: val });
                                  } else {
                                    setEditingEvent({ ...editingEvent, status: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              >
                                <option value="Upcoming">Upcoming</option>
                                <option value="Ongoing">Ongoing</option>
                                <option value="Past">Past Highlight</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Focus Category</label>
                              <select
                                value={isCreatingEvent ? newEventForm.category : editingEvent.category}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  const labelMap: Record<string, string> = {
                                    agriculture: 'Agriculture Programs',
                                    women: 'Women Empowerment',
                                    digital: 'AI & Digital Skills',
                                    health: 'Health & Nutrition',
                                    climate: 'Climate Action',
                                    entrepreneurship: 'Entrepreneurship'
                                  };
                                  if (isCreatingEvent) {
                                    setNewEventForm({ ...newEventForm, category: val, categoryLabel: labelMap[val] });
                                  } else {
                                    setEditingEvent({ ...editingEvent, category: val, categoryLabel: labelMap[val] });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              >
                                <option value="agriculture">Agriculture & Soils</option>
                                <option value="women">Women Cooperatives</option>
                                <option value="digital">AI & Vernacular Coding</option>
                                <option value="health">Health & Nutrition</option>
                                <option value="climate">Climate & Forests</option>
                                <option value="entrepreneurship">Rural Entrepreneurship</option>
                              </select>
                            </div>
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Total Seats Limit</label>
                              <input
                                type="number"
                                value={isCreatingEvent ? newEventForm.totalSeats : editingEvent.totalSeats}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value) || 50;
                                  if (isCreatingEvent) {
                                    setNewEventForm({ ...newEventForm, totalSeats: val, seatsRemaining: val });
                                  } else {
                                    setEditingEvent({ ...editingEvent, totalSeats: val, seatsRemaining: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Cover Image URL</label>
                            <input
                              type="text"
                              value={isCreatingEvent ? newEventForm.image : editingEvent.image}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingEvent) {
                                  setNewEventForm({ ...newEventForm, image: val });
                                } else {
                                  setEditingEvent({ ...editingEvent, image: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider font-mono">Upload Event Cover Assets</label>
                            <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-slate-200">
                              <div>
                                <span className="block mb-1 text-[9px] text-slate-400 font-mono font-bold">IMAGE FILE</span>
                                <div className="relative border border-dashed border-slate-200 hover:border-emerald-400 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50">
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const base64Url = reader.result as string;
                                          if (isCreatingEvent) {
                                            setNewEventForm(prev => ({ ...prev, image: '', imageName: 'Uploading...' }));
                                          } else {
                                            setEditingEvent(prev => prev ? ({ ...prev, image: '', imageName: 'Uploading...' }) : null);
                                          }
                                          uploadMediaToServer(base64Url, file.name).then(url => {
                                            if (isCreatingEvent) {
                                              setNewEventForm(prev => ({ ...prev, image: url, imageName: file.name }));
                                            } else {
                                              setEditingEvent(prev => prev ? ({ ...prev, image: url, imageName: file.name }) : null);
                                            }
                                          });
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <ImageIcon className="w-4 h-4 text-slate-400 mb-0.5" />
                                  <span className="text-[9px] text-slate-600 font-bold truncate max-w-full">
                                    {(isCreatingEvent ? newEventForm.imageName : editingEvent.imageName) || 'Choose Image'}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <span className="block mb-1 text-[9px] text-slate-400 font-mono font-bold">VIDEO FILE</span>
                                <div className="relative border border-dashed border-slate-200 hover:border-emerald-400 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50">
                                  <input 
                                    type="file" 
                                    accept="video/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const base64Url = reader.result as string;
                                          if (isCreatingEvent) {
                                            setNewEventForm(prev => ({ ...prev, video: '', videoName: 'Uploading...' }));
                                          } else {
                                            setEditingEvent(prev => prev ? ({ ...prev, video: '', videoName: 'Uploading...' }) : null);
                                          }
                                          uploadMediaToServer(base64Url, file.name).then(url => {
                                            if (isCreatingEvent) {
                                              setNewEventForm(prev => ({ ...prev, video: url, videoName: file.name }));
                                            } else {
                                              setEditingEvent(prev => prev ? ({ ...prev, video: url, videoName: file.name }) : null);
                                            }
                                          });
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <Video className="w-4 h-4 text-slate-400 mb-0.5" />
                                  <span className="text-[9px] text-slate-600 font-bold truncate max-w-full">
                                    {(isCreatingEvent ? newEventForm.videoName : editingEvent.videoName) || 'Choose Video'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Visual Asset Previews */}
                            <div className="mt-2 flex gap-2">
                              {(isCreatingEvent ? newEventForm.image : editingEvent.image) && (
                                <div className="flex items-center gap-1.5 bg-emerald-50/50 p-1 rounded border text-[9px] text-emerald-700">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                  <span>Image Selected</span>
                                </div>
                              )}
                              {(isCreatingEvent ? newEventForm.video : editingEvent.video) && (
                                <div className="flex items-center gap-1.5 bg-emerald-50/50 p-1 rounded border text-[9px] text-emerald-700">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                  <span>Video Selected</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Brief Summary</label>
                            <textarea
                              value={isCreatingEvent ? newEventForm.description : editingEvent.description}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingEvent) {
                                  setNewEventForm({ ...newEventForm, description: val });
                                } else {
                                  setEditingEvent({ ...editingEvent, description: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 leading-normal"
                              rows={2}
                              placeholder="Brief description summarizing the key on-ground takeaway..."
                            />
                          </div>
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Detailed Information & Schedule</label>
                            <textarea
                              value={isCreatingEvent ? newEventForm.detailedInfo : editingEvent.detailedInfo}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingEvent) {
                                  setNewEventForm({ ...newEventForm, detailedInfo: val });
                                } else {
                                  setEditingEvent({ ...editingEvent, detailedInfo: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 leading-normal"
                              rows={2}
                              placeholder="Add full timelines, requirements, and background context..."
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-3 border-t font-mono">
                        <button
                          onClick={() => {
                            setIsCreatingEvent(false);
                            setEditingEvent(null);
                          }}
                          className="px-4 py-2 border rounded-xl hover:bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer"
                        >
                          CANCEL
                        </button>
                        <button
                          onClick={() => {
                            if (isCreatingEvent) {
                              const title = newEventForm.title || 'Untitled Event';
                              const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                              const newEvent = {
                                id: `evt_new_${Date.now()}`,
                                slug,
                                title,
                                category: newEventForm.category,
                                categoryLabel: newEventForm.categoryLabel,
                                date: newEventForm.date,
                                time: newEventForm.time,
                                venue: newEventForm.venue || 'Learning Hub',
                                mode: newEventForm.mode,
                                seatsRemaining: newEventForm.seatsRemaining,
                                totalSeats: newEventForm.totalSeats,
                                image: newEventForm.image,
                                video: newEventForm.video || '',
                                status: newEventForm.status,
                                description: newEventForm.description || 'Interactive campaign drive.',
                                detailedInfo: newEventForm.detailedInfo || 'Full description of scheduled agenda.',
                                tagline: 'Empowering local clusters directly through active programs.',
                                speakers: [],
                                agenda: [],
                                testimonials: [],
                                faqs: [],
                                downloads: [],
                                certificateAvailable: true,
                                certificateType: 'Agronomy Certificate'
                              };
                              setEventsList([newEvent, ...eventsList]);
                              setIsCreatingEvent(false);
                            } else {
                              const updated = eventsList.map(e => e.id === editingEvent.id ? editingEvent : e);
                              setEventsList(updated);
                              setEditingEvent(null);
                            }
                          }}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                        >
                          {isCreatingEvent ? 'SCHEDULE NEW EVENT' : 'SAVE EVENT CHANGES'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto font-sans">
                      <table className="w-full text-xs font-mono">
                        <thead>
                          <tr className="border-b text-slate-400 uppercase text-[10px] font-bold bg-slate-50">
                            <th className="py-3 px-4 text-left">Event Title & Slug</th>
                            <th className="py-3 px-4 text-left">Category</th>
                            <th className="py-3 px-4 text-left">Date & Time</th>
                            <th className="py-3 px-4 text-left">Venue</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150 font-mono text-[11px]">
                          {eventsList.map(evt => (
                            <tr key={evt.id} className="hover:bg-slate-50/50">
                              <td className="py-3.5 px-4 text-left font-bold text-slate-800">
                                <div className="max-w-[280px] truncate" title={evt.title}>{evt.title}</div>
                                <span className="text-[10px] text-slate-400 font-mono block">slug: {evt.slug}</span>
                              </td>
                              <td className="py-3.5 px-4 text-left">
                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-bold uppercase text-[9px]">
                                  {evt.categoryLabel || evt.category || 'Digital'}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-left text-slate-500">
                                <div className="font-bold">{evt.date}</div>
                                <div className="text-[9px] text-slate-400">{evt.time}</div>
                              </td>
                              <td className="py-3.5 px-4 text-left text-slate-500 max-w-[180px] truncate" title={evt.venue}>{evt.venue}</td>
                              <td className="py-3.5 px-4 text-left">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                  evt.status === 'Upcoming' ? 'bg-amber-50 text-amber-700' : evt.status === 'Live' || evt.status === 'Ongoing' ? 'bg-emerald-50 text-emerald-800 animate-pulse' : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {evt.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right space-x-1">
                                <button
                                  onClick={() => {
                                    setEditingEvent(evt);
                                    setIsCreatingEvent(false);
                                  }}
                                  className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded border border-amber-200 cursor-pointer text-[10px]"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => setActivePage?.(`events/${evt.slug}`)}
                                  className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded border border-emerald-200 cursor-pointer text-[10px] inline-flex items-center gap-1"
                                >
                                  <ExternalLink size={10} />
                                  <span>Go Live</span>
                                </button>
                                <button
                                  onClick={() => {
                                    triggerConfirm(
                                      'Delete Event Record',
                                      `Are you sure you want to delete the event: "${evt.title}"? This will remove it from the public calendars.`,
                                      () => {
                                        setEventsList(prev => prev.filter(e => e.id !== evt.id));
                                      }
                                    );
                                  }}
                                  className="px-2 py-1 bg-rose-50 text-rose-600 rounded border border-rose-200 hover:bg-rose-100 cursor-pointer text-[10px]"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: GALLERY MANAGER */}
              {currentAdminTab === 'gallery' && (
                <div className="p-6 bg-white border border-slate-200 rounded-3xl text-left space-y-6 animate-fade-in font-sans">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-extrabold font-display text-slate-900 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-amber-500" />
                        <span>Ecosystem Media & Gallery Assets Control</span>
                      </h3>
                      <p className="text-xs text-slate-400">Manage high-contrast visual photo assets showing our real-world outcomes.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsCreatingGallery(true);
                          setEditingGallery(null);
                          setNewGalleryForm({
                            title: '',
                            url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600',
                            tag1: 'Agriculture',
                            tag2: 'Haveri',
                            type: 'Image',
                            size: '1.5 MB'
                          });
                        }}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <PlusCircle size={14} />
                        <span>ADD GALLERY ASSET</span>
                      </button>
                      
                      <button
                        onClick={() => setActivePage?.('gallery')}
                        className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 font-mono text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-amber-200"
                      >
                        <ExternalLink size={14} />
                        <span>GO TO LIVE GALLERY PAGE</span>
                      </button>
                    </div>
                  </div>

                  {(isCreatingGallery || editingGallery) ? (
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs animate-fade-in">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <h4 className="font-extrabold text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                          <span>{isCreatingGallery ? 'Add New Gallery Asset' : 'Edit Gallery Asset details'}</span>
                        </h4>
                        <button
                          onClick={() => {
                            setIsCreatingGallery(false);
                            setEditingGallery(null);
                          }}
                          className="px-2 py-1 bg-white hover:bg-slate-100 border text-slate-500 rounded font-mono text-[10px] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Asset Title</label>
                            <input
                              type="text"
                              value={isCreatingGallery ? newGalleryForm.title : editingGallery.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingGallery) {
                                  setNewGalleryForm({ ...newGalleryForm, title: val });
                                } else {
                                  setEditingGallery({ ...editingGallery, title: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              placeholder="e.g., Solar Installation at Dharwad Hub"
                            />
                          </div>
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Image / Media Asset URL</label>
                            <input
                              type="text"
                              value={isCreatingGallery ? newGalleryForm.url : editingGallery.url}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingGallery) {
                                  setNewGalleryForm({ ...newGalleryForm, url: val });
                                } else {
                                  setEditingGallery({ ...editingGallery, url: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-mono"
                              placeholder="https://images.unsplash.com/photo-..."
                            />
                          </div>
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider font-mono">Upload Media Files</label>
                            <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-slate-200">
                              <div>
                                <span className="block mb-1 text-[9px] text-slate-400 font-mono font-bold">IMAGE FILE</span>
                                <div className="relative border border-dashed border-slate-200 hover:border-amber-400 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50">
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const base64Url = reader.result as string;
                                          if (isCreatingGallery) {
                                            setNewGalleryForm(prev => ({ ...prev, url: '', imageName: 'Uploading...', type: 'Image' }));
                                          } else {
                                            setEditingGallery(prev => prev ? ({ ...prev, url: '', imageName: 'Uploading...', type: 'Image' }) : null);
                                          }
                                          uploadMediaToServer(base64Url, file.name).then(url => {
                                            if (isCreatingGallery) {
                                              setNewGalleryForm(prev => ({ ...prev, url, imageName: file.name, type: 'Image' }));
                                            } else {
                                              setEditingGallery(prev => prev ? ({ ...prev, url, imageName: file.name, type: 'Image' }) : null);
                                            }
                                          });
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <ImageIcon className="w-4 h-4 text-slate-400 mb-0.5" />
                                  <span className="text-[9px] text-slate-600 font-bold truncate max-w-full">
                                    {(isCreatingGallery ? newGalleryForm.imageName : editingGallery.imageName) || 'Choose Image'}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <span className="block mb-1 text-[9px] text-slate-400 font-mono font-bold">VIDEO FILE</span>
                                <div className="relative border border-dashed border-slate-200 hover:border-amber-400 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50">
                                  <input 
                                    type="file" 
                                    accept="video/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const base64Url = reader.result as string;
                                          if (isCreatingGallery) {
                                            setNewGalleryForm(prev => ({ ...prev, url: '', videoName: 'Uploading...', type: 'Video' }));
                                          } else {
                                            setEditingGallery(prev => prev ? ({ ...prev, url: '', videoName: 'Uploading...', type: 'Video' }) : null);
                                          }
                                          uploadMediaToServer(base64Url, file.name).then(url => {
                                            if (isCreatingGallery) {
                                              setNewGalleryForm(prev => ({ ...prev, url, videoName: file.name, type: 'Video' }));
                                            } else {
                                              setEditingGallery(prev => prev ? ({ ...prev, url, videoName: file.name, type: 'Video' }) : null);
                                            }
                                          });
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <Video className="w-4 h-4 text-slate-400 mb-0.5" />
                                  <span className="text-[9px] text-slate-600 font-bold truncate max-w-full">
                                    {(isCreatingGallery ? newGalleryForm.videoName : editingGallery.videoName) || 'Choose Video'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Visual Asset Previews */}
                            <div className="mt-2 flex gap-2">
                              {(isCreatingGallery ? newGalleryForm.url : editingGallery.url) && (
                                <div className="flex items-center gap-1.5 bg-amber-50/50 p-1 rounded border text-[9px] text-amber-700">
                                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                                  <span>Media Selected ({(isCreatingGallery ? newGalleryForm.type : (editingGallery.type || 'Image'))})</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Primary Category</label>
                              <select
                                value={isCreatingGallery ? newGalleryForm.tag1 : (editingGallery.tags?.[0] || 'Agriculture')}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingGallery) {
                                    setNewGalleryForm({ ...newGalleryForm, tag1: val });
                                  } else {
                                    const currentTags = editingGallery.tags || ['Agriculture', 'Haveri'];
                                    setEditingGallery({ ...editingGallery, tags: [val, currentTags[1] || 'Haveri'] });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              >
                                <option value="Agriculture">Agriculture</option>
                                <option value="Women Empowerment">Women Empowerment</option>
                                <option value="Education & AI Skills">Education & AI Skills</option>
                                <option value="Health Camps">Health Camps</option>
                                <option value="Environment">Environment</option>
                                <option value="Entrepreneurship">Entrepreneurship</option>
                                <option value="Events">Events</option>
                              </select>
                            </div>
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Location / Tag</label>
                              <input
                                type="text"
                                value={isCreatingGallery ? newGalleryForm.tag2 : (editingGallery.tags?.[1] || 'Haveri')}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingGallery) {
                                    setNewGalleryForm({ ...newGalleryForm, tag2: val });
                                  } else {
                                    const currentTags = editingGallery.tags || ['Agriculture', 'Haveri'];
                                    setEditingGallery({ ...editingGallery, tags: [currentTags[0] || 'Agriculture', val] });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                                placeholder="e.g., Savanur"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Media Type</label>
                              <select
                                value={isCreatingGallery ? newGalleryForm.type : editingGallery.type}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingGallery) {
                                    setNewGalleryForm({ ...newGalleryForm, type: val });
                                  } else {
                                    setEditingGallery({ ...editingGallery, type: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              >
                                <option value="Image">Image File</option>
                                <option value="Video">Video File</option>
                              </select>
                            </div>
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">File Size</label>
                              <input
                                type="text"
                                value={isCreatingGallery ? newGalleryForm.size : editingGallery.size}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingGallery) {
                                    setNewGalleryForm({ ...newGalleryForm, size: val });
                                  } else {
                                    setEditingGallery({ ...editingGallery, size: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                                placeholder="e.g., 2.3 MB"
                              />
                            </div>
                          </div>
                          <div className="border border-slate-200 rounded-xl bg-white p-3 flex items-center gap-3">
                            <img 
                              src={isCreatingGallery ? newGalleryForm.url : editingGallery.url} 
                              alt="Asset Preview" 
                              className="w-16 h-16 rounded object-cover border border-slate-100 bg-slate-50 shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=150';
                              }}
                            />
                            <div className="text-left">
                              <div className="font-extrabold text-slate-700 uppercase text-[9px] tracking-wider">Dynamic Preview</div>
                              <div className="text-[10px] text-slate-400 font-mono max-w-[200px] truncate">
                                {isCreatingGallery ? newGalleryForm.title || 'No Title Yet' : editingGallery.title}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-3 border-t font-mono">
                        <button
                          onClick={() => {
                            setIsCreatingGallery(false);
                            setEditingGallery(null);
                          }}
                          className="px-4 py-2 border rounded-xl hover:bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer"
                        >
                          CANCEL
                        </button>
                        <button
                          onClick={() => {
                            if (isCreatingGallery) {
                              const newAsset = {
                                id: `gallery-asset-${Date.now()}`,
                                title: newGalleryForm.title || 'Untitled Asset',
                                tags: [newGalleryForm.tag1, newGalleryForm.tag2],
                                type: newGalleryForm.type,
                                size: newGalleryForm.size,
                                url: newGalleryForm.url
                              };
                              setGalleryList(prev => [newAsset, ...prev]);
                              setIsCreatingGallery(false);
                            } else {
                              const updated = galleryList.map((g) => g.id === editingGallery.id ? editingGallery : g);
                              setGalleryList(updated);
                              setEditingGallery(null);
                            }
                          }}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                        >
                          {isCreatingGallery ? 'ADD GALLERY ASSET' : 'SAVE ASSET'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Gallery Grid List */
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
                      {galleryList.map((asset) => (
                        <div key={asset.id} className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm flex flex-col justify-between group relative animate-fade-in">
                          <div>
                            <img src={asset.url} alt={asset.title} className="w-full h-40 object-cover" />
                            <div className="p-4 space-y-1.5 text-left">
                              <h5 className="text-xs font-black text-slate-800 leading-tight">{asset.title}</h5>
                              <div className="flex flex-wrap gap-1">
                                {asset.tags?.map((t: string) => (
                                  <span key={t} className="bg-slate-100 text-slate-500 text-[9px] px-1.5 rounded font-mono font-bold">
                                    #{t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="p-4 pt-0 flex justify-between items-center border-t border-slate-100 mt-2 font-mono text-[10px]">
                            <span className="text-slate-400">{asset.size || '2.0 MB'}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingGallery(asset);
                                  setIsCreatingGallery(false);
                                }}
                                className="text-amber-600 hover:text-amber-800 font-bold font-mono cursor-pointer"
                              >
                                [Edit]
                              </button>
                              <button
                                onClick={() => {
                                  triggerConfirm(
                                    'Delete Gallery Asset',
                                    `Are you sure you want to delete the asset: "${asset.title}"? This will immediately remove it from the live gallery page.`,
                                    () => {
                                      setGalleryList(prev => prev.filter((g) => g.id !== asset.id));
                                    }
                                  );
                                }}
                                className="text-rose-500 hover:text-rose-700 font-bold font-mono cursor-pointer"
                              >
                                [Delete]
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: SEO MANAGER */}
              {currentAdminTab === 'seo' && (
                <div className="p-6 bg-white border border-slate-200 rounded-3xl text-left space-y-6 animate-fade-in font-sans">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-extrabold font-display text-slate-900 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                        <span>Search Engine Optimization (SEO) Metadata Center</span>
                      </h3>
                      <p className="text-xs text-slate-400">Configure page titles, meta descriptions, and featured future images for every single landing page node.</p>
                    </div>
                    <button
                      onClick={() => {
                        triggerConfirm(
                          'Restore SEO Defaults',
                          'Are you sure you want to restore all page SEO entries to trust defaults? This action will reload the page.',
                          () => {
                            localStorage.removeItem('raita_mitra_seo_config');
                            window.location.reload();
                          }
                        );
                      }}
                      className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-mono text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <RefreshCw size={14} />
                      <span>RESTORE DEFAULTS</span>
                    </button>
                  </div>

                  {/* SEO Entries List */}
                  <div className="space-y-6 max-h-[700px] overflow-y-auto pr-2">
                    {Object.keys(seoConfig || {}).map((pageKey) => {
                      const details = (seoConfig || {})[pageKey] || { title: '', description: '', futureImage: '' };
                      return (
                        <div key={pageKey} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                            <span className="text-xs font-black uppercase font-mono text-slate-500 flex items-center gap-2">
                              <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                              <span>{pageKey === 'home' ? '🏠 Home Page Node' : `📄 Page Key: "${pageKey}"`}</span>
                            </span>
                            <button
                              onClick={() => setActivePage?.(pageKey)}
                              className="px-2 py-1 bg-white border rounded text-[10px] text-slate-600 font-bold hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                            >
                              <ExternalLink size={10} />
                              <span>Test Link</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div>
                                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">Meta Title</label>
                                <input
                                  type="text"
                                  value={details.title}
                                  onChange={(e) => {
                                    if (setSeoConfig && seoConfig) {
                                      setSeoConfig({
                                        ...seoConfig,
                                        [pageKey]: {
                                          ...details,
                                          title: e.target.value
                                        }
                                      });
                                    }
                                  }}
                                  className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800"
                                />
                              </div>

                              <div>
                                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">Meta Description</label>
                                <textarea
                                  value={details.description}
                                  rows={2}
                                  onChange={(e) => {
                                    if (setSeoConfig && seoConfig) {
                                      setSeoConfig({
                                        ...seoConfig,
                                        [pageKey]: {
                                          ...details,
                                          description: e.target.value
                                        }
                                      });
                                    }
                                  }}
                                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 leading-normal"
                                />
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">Meta Future Image URL</label>
                                <input
                                  type="text"
                                  value={details.futureImage}
                                  onChange={(e) => {
                                    if (setSeoConfig && seoConfig) {
                                      setSeoConfig({
                                        ...seoConfig,
                                        [pageKey]: {
                                          ...details,
                                          futureImage: e.target.value
                                        }
                                      });
                                    }
                                  }}
                                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 font-mono"
                                />
                              </div>

                              <div>
                                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">Upload SEO Assets</label>
                                <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-slate-200">
                                  <div>
                                    <span className="block mb-1 text-[9px] text-slate-400 font-mono font-bold">IMAGE FILE</span>
                                    <div className="relative border border-dashed border-slate-200 hover:border-amber-400 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50">
                                      <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                              const base64Url = reader.result as string;
                                              if (setSeoConfig && seoConfig) {
                                                setSeoConfig({
                                                  ...seoConfig,
                                                  [pageKey]: {
                                                    ...details,
                                                    futureImage: base64Url,
                                                    imageName: file.name
                                                  }
                                                });
                                              }
                                            };
                                            reader.readAsDataURL(file);
                                          }
                                        }}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                      />
                                      <ImageIcon className="w-4 h-4 text-slate-400 mb-0.5" />
                                      <span className="text-[9px] text-slate-600 font-bold truncate max-w-full">
                                        {(details as any).imageName || 'Choose Image'}
                                      </span>
                                    </div>
                                  </div>
                                  <div>
                                    <span className="block mb-1 text-[9px] text-slate-400 font-mono font-bold">VIDEO FILE</span>
                                    <div className="relative border border-dashed border-slate-200 hover:border-amber-400 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50">
                                      <input 
                                        type="file" 
                                        accept="video/*"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                              const base64Url = reader.result as string;
                                              if (setSeoConfig && seoConfig) {
                                                setSeoConfig({
                                                  ...seoConfig,
                                                  [pageKey]: {
                                                    ...details,
                                                    futureVideo: base64Url,
                                                    videoName: file.name
                                                  }
                                                });
                                              }
                                            };
                                            reader.readAsDataURL(file);
                                          }
                                        }}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                      />
                                      <Video className="w-4 h-4 text-slate-400 mb-0.5" />
                                      <span className="text-[9px] text-slate-600 font-bold truncate max-w-full">
                                        {(details as any).videoName || 'Choose Video'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
                                <img src={details.futureImage} alt="Future Image Preview" className="w-12 h-12 object-cover rounded-lg border bg-slate-100" referrerPolicy="no-referrer" />
                                <div className="text-left font-mono">
                                  <div className="text-[9px] font-bold text-slate-500">IMAGE PREVIEW</div>
                                  <div className="text-[8px] text-slate-400 truncate max-w-[200px]">{details.futureImage}</div>
                                  {(details as any).videoName && (
                                    <div className="text-[8px] text-emerald-600 font-bold mt-1">✓ Video: {(details as any).videoName}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: PROGRAM MANAGEMENT KANBAN */}
              {currentAdminTab === 'programs' && (
                <div className="space-y-6 animate-fade-in font-sans text-left">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <h3 className="text-base font-extrabold font-display text-slate-900">Program Management Lifecycle</h3>
                      <p className="text-xs text-slate-400">Track taluk milestones, direct beneficiary statistics, and GIS coordinates.</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsCreatingProgram(true);
                        setEditingProgram(null);
                        setNewProgramForm({
                          title: '',
                          manager: '',
                          region: '',
                          status: 'In Progress',
                          budget: 500000,
                          beneficiaries: 1000,
                          progress: 50,
                          image: '',
                          imageName: '',
                          video: '',
                          videoName: ''
                        });
                      }}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <PlusCircle size={14} />
                      <span>ADD NEW PROGRAM</span>
                    </button>
                  </div>

                  {(isCreatingProgram || editingProgram) ? (
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs animate-fade-in font-sans">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <h4 className="font-extrabold text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          <span>{isCreatingProgram ? 'Initiate New Program' : 'Edit Program Details'}</span>
                        </h4>
                        <button
                          onClick={() => {
                            setIsCreatingProgram(false);
                            setEditingProgram(null);
                          }}
                          className="px-2 py-1 bg-white hover:bg-slate-100 border text-slate-500 rounded font-mono text-[10px] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Program Title</label>
                            <input
                              type="text"
                              value={isCreatingProgram ? newProgramForm.title : editingProgram.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingProgram) {
                                  setNewProgramForm({ ...newProgramForm, title: val });
                                } else {
                                  setEditingProgram({ ...editingProgram, title: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              placeholder="e.g., Savanur Rainwater Catchment"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Region / Taluk</label>
                              <input
                                type="text"
                                value={isCreatingProgram ? newProgramForm.region : editingProgram.region}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingProgram) {
                                    setNewProgramForm({ ...newProgramForm, region: val });
                                  } else {
                                    setEditingProgram({ ...editingProgram, region: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                                placeholder="e.g., Savanur"
                              />
                            </div>
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Lead Manager</label>
                              <input
                                type="text"
                                value={isCreatingProgram ? newProgramForm.manager : editingProgram.manager}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingProgram) {
                                    setNewProgramForm({ ...newProgramForm, manager: val });
                                  } else {
                                    setEditingProgram({ ...editingProgram, manager: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                                placeholder="e.g., Dr. Patil"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Outlay Budget (₹)</label>
                              <input
                                type="number"
                                value={isCreatingProgram ? newProgramForm.budget : editingProgram.budget}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value) || 0;
                                  if (isCreatingProgram) {
                                    setNewProgramForm({ ...newProgramForm, budget: val });
                                  } else {
                                    setEditingProgram({ ...editingProgram, budget: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-mono"
                              />
                            </div>
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Beneficiaries</label>
                              <input
                                type="number"
                                value={isCreatingProgram ? newProgramForm.beneficiaries : editingProgram.beneficiaries}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value) || 0;
                                  if (isCreatingProgram) {
                                    setNewProgramForm({ ...newProgramForm, beneficiaries: val });
                                  } else {
                                    setEditingProgram({ ...editingProgram, beneficiaries: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-mono"
                              />
                            </div>
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Progress %</label>
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={isCreatingProgram ? newProgramForm.progress : editingProgram.progress}
                                onChange={(e) => {
                                  const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                                  if (isCreatingProgram) {
                                    setNewProgramForm({ ...newProgramForm, progress: val });
                                  } else {
                                    setEditingProgram({ ...editingProgram, progress: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-mono"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Lifecycle Status</label>
                            <select
                              value={isCreatingProgram ? newProgramForm.status : editingProgram.status}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingProgram) {
                                  setNewProgramForm({ ...newProgramForm, status: val });
                                } else {
                                  setEditingProgram({ ...editingProgram, status: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                            >
                              <option value="In Planning">In Planning</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>

                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider font-mono">Upload Program Media Cover</label>
                            <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-slate-200">
                              <div>
                                <span className="block mb-1 text-[9px] text-slate-400 font-mono font-bold">IMAGE FILE</span>
                                <div className="relative border border-dashed border-slate-200 hover:border-emerald-400 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50">
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const base64Url = reader.result as string;
                                          if (isCreatingProgram) {
                                            setNewProgramForm({ ...newProgramForm, image: base64Url, imageName: file.name });
                                          } else {
                                            setEditingProgram({ ...editingProgram, image: base64Url, imageName: file.name });
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <ImageIcon className="w-4 h-4 text-slate-400 mb-0.5" />
                                  <span className="text-[9px] text-slate-600 font-bold truncate max-w-full">
                                    {(isCreatingProgram ? newProgramForm.imageName : editingProgram.imageName) || 'Choose Image'}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <span className="block mb-1 text-[9px] text-slate-400 font-mono font-bold">VIDEO FILE</span>
                                <div className="relative border border-dashed border-slate-200 hover:border-emerald-400 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50">
                                  <input 
                                    type="file" 
                                    accept="video/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const base64Url = reader.result as string;
                                          if (isCreatingProgram) {
                                            setNewProgramForm({ ...newProgramForm, video: base64Url, videoName: file.name });
                                          } else {
                                            setEditingProgram({ ...editingProgram, video: base64Url, videoName: file.name });
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <Video className="w-4 h-4 text-slate-400 mb-0.5" />
                                  <span className="text-[9px] text-slate-600 font-bold truncate max-w-full">
                                    {(isCreatingProgram ? newProgramForm.videoName : editingProgram.videoName) || 'Choose Video'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Previews */}
                            <div className="mt-2 flex gap-2">
                              {(isCreatingProgram ? newProgramForm.image : editingProgram.image) && (
                                <div className="flex items-center gap-1.5 bg-emerald-50/50 p-1 rounded border text-[9px] text-emerald-700">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                  <span>Image Selected</span>
                                </div>
                              )}
                              {(isCreatingProgram ? newProgramForm.video : editingProgram.video) && (
                                <div className="flex items-center gap-1.5 bg-emerald-50/50 p-1 rounded border text-[9px] text-emerald-700">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                  <span>Video Selected</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-3 border-t font-mono">
                        <button
                          onClick={() => {
                            setIsCreatingProgram(false);
                            setEditingProgram(null);
                          }}
                          className="px-4 py-2 border rounded-xl hover:bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer"
                        >
                          CANCEL
                        </button>
                        <button
                          onClick={() => {
                            if (isCreatingProgram) {
                              const newProg = {
                                id: `prog_new_${Date.now()}`,
                                title: newProgramForm.title || 'Untitled Program',
                                region: newProgramForm.region || 'Haveri',
                                manager: newProgramForm.manager || 'Dr. Patil',
                                status: newProgramForm.status,
                                budget: newProgramForm.budget,
                                beneficiaries: newProgramForm.beneficiaries,
                                progress: newProgramForm.progress,
                                image: newProgramForm.image,
                                video: newProgramForm.video
                              };
                              setProgramList([newProg, ...programList]);
                              setIsCreatingProgram(false);
                            } else {
                              const updated = programList.map(p => p.id === editingProgram.id ? editingProgram : p);
                              setProgramList(updated);
                              setEditingProgram(null);
                            }
                          }}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                        >
                          {isCreatingProgram ? 'CREATE PROGRAM' : 'SAVE CHANGES'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Grid Kanban board with controls */
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {['In Planning', 'In Progress', 'Completed'].map(col => (
                        <div key={col} className="p-4 bg-slate-100 rounded-3xl space-y-4 text-left min-h-[400px]">
                          <h4 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider flex justify-between">
                            <span>{col}</span>
                            <span className="px-2 py-0.2 bg-white text-slate-600 rounded font-bold">
                              {programList.filter(p => p.status === col).length}
                            </span>
                          </h4>

                          <div className="space-y-3">
                            {programList.filter(p => p.status === col).map(p => (
                              <div key={p.id} className="p-4 bg-white border rounded-2xl space-y-3 shadow-sm">
                                <div>
                                  <h5 className="text-xs font-black text-slate-800">{p.title}</h5>
                                  <p className="text-[10px] text-slate-400 font-mono">Region: {p.region} • Leader: {p.manager}</p>
                                </div>

                                <div className="space-y-1 font-mono text-[9px]">
                                  <div className="flex justify-between text-slate-500">
                                    <span>Outlay Budget:</span>
                                    <strong className="text-slate-800 font-bold">₹{p.budget?.toLocaleString('en-IN')}</strong>
                                  </div>
                                  <div className="flex justify-between text-slate-500">
                                    <span>Beneficiaries:</span>
                                    <strong className="text-slate-800 font-bold">{p.beneficiaries}+</strong>
                                  </div>
                                </div>

                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-emerald-600 h-full" style={{ width: `${p.progress}%` }} />
                                </div>

                                <div className="flex justify-between items-center text-[9px] font-mono">
                                  <span className="text-emerald-700">✓ {p.progress}% Completed</span>
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => {
                                        setEditingProgram(p);
                                        setIsCreatingProgram(false);
                                      }}
                                      className="text-amber-600 font-bold hover:underline cursor-pointer"
                                    >
                                      Edit
                                    </button>
                                    <button 
                                      onClick={() => {
                                        const slug = getProgramSlug(p.title);
                                        setActivePage?.(`programs/${slug}`);
                                      }}
                                      className="text-emerald-600 font-bold hover:underline cursor-pointer"
                                    >
                                      Go Live
                                    </button>
                                    <button 
                                      onClick={() => {
                                        triggerConfirm(
                                          'Delete Program Record',
                                          `Are you sure you want to delete the program: "${p.title}"? This will remove it from the public programs list.`,
                                          () => {
                                            setProgramList(prev => prev.filter(item => item.id !== p.id));
                                          }
                                        );
                                      }}
                                      className="text-rose-500 font-bold hover:underline cursor-pointer"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: DONOR CRM */}
              {currentAdminTab === 'crm' && (
                <div className="p-6 bg-white border border-slate-200 rounded-3xl text-left space-y-6 animate-fade-in">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b">
                    <div>
                      <h3 className="text-base font-extrabold font-display text-slate-900">Donor CRM Database Workspace</h3>
                      <p className="text-xs text-slate-400">Analyze cumulative giving histories, segments, engagement index values, and AI recommendations.</p>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center w-full md:w-auto font-mono">
                      <button
                        onClick={() => {
                          setIsCreatingDonor(true);
                          setEditingDonor(null);
                          setNewDonorForm({
                            name: '',
                            email: '',
                            segment: 'Corporate CSR',
                            totalGiving: 100000,
                            engagements: 90,
                            recommended: 'Solar Pump Grid II',
                            status: 'Active Recurring',
                            image: '',
                            imageName: '',
                            video: '',
                            videoName: ''
                          });
                        }}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <PlusCircle size={12} />
                        <span>ADD DONOR</span>
                      </button>

                      <div className="relative flex-1 md:w-48">
                        <Search size={12} className="absolute left-3 top-2.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search records..."
                          value={donorSearch}
                          onChange={(e) => setDonorSearch(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 border rounded-xl text-xs font-mono focus:outline-none"
                        />
                      </div>

                      <select
                        value={crmSegmentFilter}
                        onChange={(e) => setCrmSegmentFilter(e.target.value)}
                        className="px-3 py-1.5 border rounded-xl bg-white text-xs font-mono"
                      >
                        <option value="All">All Segments</option>
                        <option value="Corporate CSR">Corporate CSR</option>
                        <option value="Premium Individual">Premium Individual</option>
                        <option value="NRI Supporter">NRI Supporter</option>
                      </select>
                    </div>
                  </div>

                  {(isCreatingDonor || editingDonor) ? (
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs animate-fade-in font-sans">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <h4 className="font-extrabold text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                          <span>{isCreatingDonor ? 'Enroll New Supporter Profile' : 'Edit Supporter CRM Details'}</span>
                        </h4>
                        <button
                          onClick={() => {
                            setIsCreatingDonor(false);
                            setEditingDonor(null);
                          }}
                          className="px-2 py-1 bg-white hover:bg-slate-100 border text-slate-500 rounded font-mono text-[10px] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Full Supporter / Company Name</label>
                            <input
                              type="text"
                              value={isCreatingDonor ? newDonorForm.name : editingDonor.name}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingDonor) {
                                  setNewDonorForm({ ...newDonorForm, name: val });
                                } else {
                                  setEditingDonor({ ...editingDonor, name: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              placeholder="e.g., Deshpande Foundation"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Contact Email</label>
                              <input
                                type="email"
                                value={isCreatingDonor ? newDonorForm.email : editingDonor.email}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingDonor) {
                                    setNewDonorForm({ ...newDonorForm, email: val });
                                  } else {
                                    setEditingDonor({ ...editingDonor, email: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                                placeholder="email@domain.com"
                              />
                            </div>
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">CRM Segment Type</label>
                              <select
                                value={isCreatingDonor ? newDonorForm.segment : editingDonor.segment}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingDonor) {
                                    setNewDonorForm({ ...newDonorForm, segment: val });
                                  } else {
                                    setEditingDonor({ ...editingDonor, segment: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              >
                                <option value="Corporate CSR">Corporate CSR</option>
                                <option value="Premium Individual">Premium Individual</option>
                                <option value="NRI Supporter">NRI Supporter</option>
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Cumulative Giving (₹)</label>
                              <input
                                type="number"
                                value={isCreatingDonor ? newDonorForm.totalGiving : editingDonor.totalGiving}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value) || 0;
                                  if (isCreatingDonor) {
                                    setNewDonorForm({ ...newDonorForm, totalGiving: val });
                                  } else {
                                    setEditingDonor({ ...editingDonor, totalGiving: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-mono"
                              />
                            </div>
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Engagement Index %</label>
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={isCreatingDonor ? newDonorForm.engagements : (editingDonor.score || editingDonor.engagements || 80)}
                                onChange={(e) => {
                                  const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                                  if (isCreatingDonor) {
                                    setNewDonorForm({ ...newDonorForm, engagements: val });
                                  } else {
                                    setEditingDonor({ ...editingDonor, score: val, engagements: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-mono"
                              />
                            </div>
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">AI Recommendation</label>
                              <input
                                type="text"
                                value={isCreatingDonor ? newDonorForm.recommended : editingDonor.recommended}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingDonor) {
                                    setNewDonorForm({ ...newDonorForm, recommended: val });
                                  } else {
                                    setEditingDonor({ ...editingDonor, recommended: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                                placeholder="e.g., Savanur Soil Project"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider font-mono">Upload Donor/Partner Assets</label>
                            <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-slate-200">
                              <div>
                                <span className="block mb-1 text-[9px] text-slate-400 font-mono font-bold">IMAGE FILE</span>
                                <div className="relative border border-dashed border-slate-200 hover:border-indigo-400 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50">
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const base64Url = reader.result as string;
                                          if (isCreatingDonor) {
                                            setNewDonorForm({ ...newDonorForm, image: base64Url, imageName: file.name });
                                          } else {
                                            setEditingDonor({ ...editingDonor, image: base64Url, imageName: file.name });
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <ImageIcon className="w-4 h-4 text-slate-400 mb-0.5" />
                                  <span className="text-[9px] text-slate-600 font-bold truncate max-w-full">
                                    {(isCreatingDonor ? newDonorForm.imageName : editingDonor.imageName) || 'Choose Image'}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <span className="block mb-1 text-[9px] text-slate-400 font-mono font-bold">VIDEO FILE</span>
                                <div className="relative border border-dashed border-slate-200 hover:border-indigo-400 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50">
                                  <input 
                                    type="file" 
                                    accept="video/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const base64Url = reader.result as string;
                                          if (isCreatingDonor) {
                                            setNewDonorForm({ ...newDonorForm, video: base64Url, videoName: file.name });
                                          } else {
                                            setEditingDonor({ ...editingDonor, video: base64Url, videoName: file.name });
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <Video className="w-4 h-4 text-slate-400 mb-0.5" />
                                  <span className="text-[9px] text-slate-600 font-bold truncate max-w-full">
                                    {(isCreatingDonor ? newDonorForm.videoName : editingDonor.videoName) || 'Choose Video'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Previews */}
                            <div className="mt-2 flex gap-2">
                              {(isCreatingDonor ? newDonorForm.image : editingDonor.image) && (
                                <div className="flex items-center gap-1.5 bg-indigo-50/50 p-1 rounded border text-[9px] text-indigo-700">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                  <span>Image Selected</span>
                                </div>
                              )}
                              {(isCreatingDonor ? newDonorForm.video : editingDonor.video) && (
                                <div className="flex items-center gap-1.5 bg-indigo-50/50 p-1 rounded border text-[9px] text-indigo-700">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                  <span>Video Selected</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-3 border-t font-mono">
                        <button
                          onClick={() => {
                            setIsCreatingDonor(false);
                            setEditingDonor(null);
                          }}
                          className="px-4 py-2 border rounded-xl hover:bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer"
                        >
                          CANCEL
                        </button>
                        <button
                          onClick={() => {
                            if (isCreatingDonor) {
                              const newDon = {
                                id: `don_new_${Date.now()}`,
                                name: newDonorForm.name || 'Anonymous Donor',
                                email: newDonorForm.email || 'info@supporter.org',
                                segment: newDonorForm.segment,
                                totalGiving: newDonorForm.totalGiving,
                                score: newDonorForm.engagements,
                                recommended: newDonorForm.recommended,
                                image: newDonorForm.image,
                                video: newDonorForm.video
                              };
                              setDonorList([newDon, ...donorList]);
                              setIsCreatingDonor(false);
                            } else {
                              const updated = donorList.map(d => d.id === editingDonor.id ? editingDonor : d);
                              setDonorList(updated);
                              setEditingDonor(null);
                            }
                          }}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                        >
                          {isCreatingDonor ? 'SAVE NEW PROFILE' : 'SAVE CHANGES'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* CRM Grid Table */
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs font-mono">
                        <thead>
                          <tr className="border-b text-slate-400 uppercase text-[10px] font-bold bg-slate-50">
                            <th className="py-3 px-4 text-left">Donor Profile</th>
                            <th className="py-3 px-4 text-left">Segment Type</th>
                            <th className="py-3 px-4 text-right">Total Giving</th>
                            <th className="py-3 px-4 text-center">Engagement Index</th>
                            <th className="py-3 px-4 text-left">AI Next Program Suggestion</th>
                            <th className="py-3 px-4 text-right">Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {filteredDonors.map(donor => (
                            <tr key={donor.id} className="hover:bg-slate-50/50">
                              <td className="py-3.5 px-4 text-left">
                                <div className="font-bold text-slate-800">{donor.name}</div>
                                <div className="text-[10px] text-slate-400">{donor.email}</div>
                              </td>
                              <td className="py-3.5 px-4 text-slate-500">{donor.segment}</td>
                              <td className="py-3.5 px-4 text-right font-black text-slate-900">
                                ₹{donor.totalGiving.toLocaleString('en-IN')}
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold">
                                  {donor.score}% Index
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-slate-600 font-sans">{donor.recommended}</td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex gap-2 justify-end">
                                  <button
                                    onClick={() => setSelectedDonorForDetail(donor)}
                                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-[10px] font-bold transition-colors cursor-pointer"
                                  >
                                    View
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEditingDonor(donor);
                                      setIsCreatingDonor(false);
                                    }}
                                    className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 border rounded text-[10px] font-bold transition-colors cursor-pointer"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => {
                                      triggerConfirm(
                                        'Delete Donor Profile',
                                        `Are you sure you want to delete the donor profile of: "${donor.name}"? This action cannot be undone.`,
                                        () => {
                                          setDonorList(prev => prev.filter(d => d.id !== donor.id));
                                        }
                                      );
                                    }}
                                    className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded text-[10px] font-bold transition-colors cursor-pointer"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Selected donor detail view modal simulation */}
                  <AnimatePresence>
                    {selectedDonorForDetail && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                      >
                        <div className="flex justify-between items-center border-b pb-2">
                          <h4 className="text-xs font-bold uppercase text-slate-500 font-mono">CRM Single Record Audit</h4>
                          <button onClick={() => setSelectedDonorForDetail(null)} className="text-slate-400 hover:text-slate-700">
                            <X size={16} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                          <div>
                            <span className="text-slate-400 block">Record Holder:</span>
                            <strong>{selectedDonorForDetail.name}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Email Endpoint:</span>
                            <strong>{selectedDonorForDetail.email}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Status Flag:</span>
                            <strong className="text-emerald-700">{selectedDonorForDetail.status}</strong>
                          </div>
                        </div>

                        <div className="p-3.5 bg-white border rounded-xl text-xs font-sans leading-relaxed text-slate-600">
                          🤖 <strong>AI Preference Analyzer Output:</strong> Record shows deep affinity for agricultural intervention. Based on past engagements ({selectedDonorForDetail.engagements} telemetry triggers), next best action is a direct email pitch for <strong>"{selectedDonorForDetail.recommended}"</strong>.
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => alert(`Generated custom pitch brochure PDF for ${selectedDonorForDetail.name}`)}
                            className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-[11px] font-mono font-bold"
                          >
                            Generate Pitch
                          </button>
                          <button
                            onClick={() => alert(`Dispatched audited tax ledger summary to: ${selectedDonorForDetail.email}`)}
                            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-[11px] font-mono text-slate-700"
                          >
                            Resend 80G Dispatches
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              )}

              {/* TAB 5: VOLUNTEER MANAGEMENT */}
              {currentAdminTab === 'volunteers' && (
                <div className="p-6 bg-white border border-slate-200 rounded-3xl text-left space-y-6 animate-fade-in font-sans">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b">
                    <div>
                      <h3 className="text-base font-extrabold font-display text-slate-900">Volunteer Force Coordination</h3>
                      <p className="text-xs text-slate-400">Review onboarding skill profiles, assign regional task modules, and authorize service certification certificates.</p>
                    </div>

                    <button
                      onClick={() => {
                        setIsCreatingVolunteer(true);
                        setEditingVolunteer(null);
                        setNewVolunteerForm({
                          name: '',
                          skill: '',
                          location: '',
                          status: 'Assigned',
                          hours: 10,
                          image: '',
                          imageName: '',
                          video: '',
                          videoName: ''
                        });
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <PlusCircle size={12} />
                      <span>ADD VOLUNTEER</span>
                    </button>
                  </div>

                  {(isCreatingVolunteer || editingVolunteer) ? (
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs animate-fade-in font-sans text-left">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <h4 className="font-extrabold text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          <span>{isCreatingVolunteer ? 'Add New Volunteer Force' : 'Edit Volunteer Force Details'}</span>
                        </h4>
                        <button
                          onClick={() => {
                            setIsCreatingVolunteer(false);
                            setEditingVolunteer(null);
                          }}
                          className="px-2 py-1 bg-white hover:bg-slate-100 border text-slate-500 rounded font-mono text-[10px] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Volunteer Full Name</label>
                            <input
                              type="text"
                              value={isCreatingVolunteer ? newVolunteerForm.name : editingVolunteer.name}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingVolunteer) {
                                  setNewVolunteerForm({ ...newVolunteerForm, name: val });
                                } else {
                                  setEditingVolunteer({ ...editingVolunteer, name: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              placeholder="e.g., Rajesh Kumar"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Skill Profile</label>
                              <input
                                type="text"
                                value={isCreatingVolunteer ? newVolunteerForm.skill : editingVolunteer.skill}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingVolunteer) {
                                    setNewVolunteerForm({ ...newVolunteerForm, skill: val });
                                  } else {
                                    setEditingVolunteer({ ...editingVolunteer, skill: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                                placeholder="e.g., Soil Chemist"
                              />
                            </div>
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Region / Location</label>
                              <input
                                type="text"
                                value={isCreatingVolunteer ? newVolunteerForm.location : editingVolunteer.location}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingVolunteer) {
                                    setNewVolunteerForm({ ...newVolunteerForm, location: val });
                                  } else {
                                    setEditingVolunteer({ ...editingVolunteer, location: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                                placeholder="e.g., Haveri"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Contribution Hours</label>
                              <input
                                type="number"
                                value={isCreatingVolunteer ? newVolunteerForm.hours : editingVolunteer.hours}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value) || 0;
                                  if (isCreatingVolunteer) {
                                    setNewVolunteerForm({ ...newVolunteerForm, hours: val });
                                  } else {
                                    setEditingVolunteer({ ...editingVolunteer, hours: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-mono"
                              />
                            </div>
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Work Status</label>
                              <select
                                value={isCreatingVolunteer ? newVolunteerForm.status : editingVolunteer.status}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingVolunteer) {
                                    setNewVolunteerForm({ ...newVolunteerForm, status: val });
                                  } else {
                                    setEditingVolunteer({ ...editingVolunteer, status: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              >
                                <option value="Assigned">Assigned</option>
                                <option value="Pending">Pending</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider font-mono">Upload Volunteer Assets</label>
                            <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-slate-200">
                              <div>
                                <span className="block mb-1 text-[9px] text-slate-400 font-mono font-bold">IMAGE FILE</span>
                                <div className="relative border border-dashed border-slate-200 hover:border-emerald-400 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50">
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const base64Url = reader.result as string;
                                          if (isCreatingVolunteer) {
                                            setNewVolunteerForm({ ...newVolunteerForm, image: base64Url, imageName: file.name });
                                          } else {
                                            setEditingVolunteer({ ...editingVolunteer, image: base64Url, imageName: file.name });
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <ImageIcon className="w-4 h-4 text-slate-400 mb-0.5" />
                                  <span className="text-[9px] text-slate-600 font-bold truncate max-w-full">
                                    {(isCreatingVolunteer ? newVolunteerForm.imageName : editingVolunteer.imageName) || 'Choose Image'}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <span className="block mb-1 text-[9px] text-slate-400 font-mono font-bold">VIDEO FILE</span>
                                <div className="relative border border-dashed border-slate-200 hover:border-emerald-400 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50">
                                  <input 
                                    type="file" 
                                    accept="video/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const base64Url = reader.result as string;
                                          if (isCreatingVolunteer) {
                                            setNewVolunteerForm({ ...newVolunteerForm, video: base64Url, videoName: file.name });
                                          } else {
                                            setEditingVolunteer({ ...editingVolunteer, video: base64Url, videoName: file.name });
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <Video className="w-4 h-4 text-slate-400 mb-0.5" />
                                  <span className="text-[9px] text-slate-600 font-bold truncate max-w-full">
                                    {(isCreatingVolunteer ? newVolunteerForm.videoName : editingVolunteer.videoName) || 'Choose Video'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Previews */}
                            <div className="mt-2 flex gap-2">
                              {(isCreatingVolunteer ? newVolunteerForm.image : editingVolunteer.image) && (
                                <div className="flex items-center gap-1.5 bg-emerald-50/50 p-1 rounded border text-[9px] text-emerald-700">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                  <span>Image Selected</span>
                                </div>
                              )}
                              {(isCreatingVolunteer ? newVolunteerForm.video : editingVolunteer.video) && (
                                <div className="flex items-center gap-1.5 bg-emerald-50/50 p-1 rounded border text-[9px] text-emerald-700">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                  <span>Video Selected</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-3 border-t font-mono">
                        <button
                          onClick={() => {
                            setIsCreatingVolunteer(false);
                            setEditingVolunteer(null);
                          }}
                          className="px-4 py-2 border rounded-xl hover:bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer"
                        >
                          CANCEL
                        </button>
                        <button
                          onClick={() => {
                            if (isCreatingVolunteer) {
                              const newVol = {
                                id: `vol_new_${Date.now()}`,
                                name: newVolunteerForm.name || 'Anonymous Volunteer',
                                skill: newVolunteerForm.skill || 'Agriculture Support',
                                location: newVolunteerForm.location || 'Haveri',
                                status: newVolunteerForm.status,
                                hours: newVolunteerForm.hours,
                                image: newVolunteerForm.image,
                                video: newVolunteerForm.video
                              };
                              setVolunteerList([newVol, ...volunteerList]);
                              setIsCreatingVolunteer(false);
                            } else {
                              const updated = volunteerList.map(v => v.id === editingVolunteer.id ? editingVolunteer : v);
                              setVolunteerList(updated);
                              setEditingVolunteer(null);
                            }
                          }}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                        >
                          {isCreatingVolunteer ? 'SAVE NEW PROFILE' : 'SAVE CHANGES'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Volunteers Table */
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs font-mono">
                        <thead>
                          <tr className="border-b text-slate-400 uppercase text-[10px] font-bold bg-slate-50">
                            <th className="py-3 px-4 text-left">Volunteer Profile</th>
                            <th className="py-3 px-4 text-left">Onboarding Skill Match</th>
                            <th className="py-3 px-4 text-left">Target Region</th>
                            <th className="py-3 px-4 text-left">Work status</th>
                            <th className="py-3 px-4 text-right">Contribution Hours</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {volunteerList.map(vol => (
                            <tr key={vol.id} className="hover:bg-slate-50/50">
                              <td className="py-3.5 px-4 text-left font-bold text-slate-800">{vol.name}</td>
                              <td className="py-3.5 px-4 text-slate-500">{vol.skill}</td>
                              <td className="py-3.5 px-4 text-slate-600">{vol.location}</td>
                              <td className="py-3.5 px-4">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                  vol.status === 'Assigned' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                }`}>
                                  {vol.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right font-black">{vol.hours} Hrs</td>
                              <td className="py-3.5 px-4 text-right space-x-1">
                                <button
                                  onClick={() => {
                                    alert(`Generating signed, board-validated service certification PDF for ${vol.name} (Total hours: ${vol.hours})`);
                                  }}
                                  className="px-2 py-1 bg-amber-50 text-amber-800 rounded border border-amber-200 text-[10px] cursor-pointer"
                                >
                                  Issue Certificate
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingVolunteer(vol);
                                    setIsCreatingVolunteer(false);
                                  }}
                                  className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 border rounded text-[10px] font-bold transition-colors cursor-pointer"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    triggerConfirm(
                                      'Delete Volunteer Profile',
                                      `Are you sure you want to delete the volunteer profile for: "${vol.name}"? This action cannot be undone.`,
                                      () => {
                                        setVolunteerList(prev => prev.filter(v => v.id !== vol.id));
                                      }
                                    );
                                  }}
                                  className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded text-[10px] font-bold transition-colors cursor-pointer"
                                  id={`delete-volunteer-${vol.id}`}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                </div>
              )}

              {/* TAB: CAREERS MANAGEMENT */}
              {currentAdminTab === 'careers' && (
                <div className="p-6 bg-white border border-slate-200 rounded-3xl text-left space-y-6 animate-fade-in font-sans">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b">
                    <div>
                      <h3 className="text-base font-extrabold font-display text-slate-900">Career Roles Manager</h3>
                      <p className="text-xs text-slate-400 font-sans">Configure current openings, modify hiring requirements, and sync vacancies with the Careers application page.</p>
                    </div>

                    <button
                      onClick={() => {
                        setIsCreatingJob(true);
                        setEditingJob(null);
                        setNewJobForm({
                          title: '',
                          department: 'Programs',
                          location: 'Hubballi, Karnataka',
                          type: 'Full-time',
                          experience: '1-3 Years',
                          salary: '₹4.5 - ₹6.0 LPA',
                          description: '',
                          requirements: ''
                        });
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <PlusCircle size={12} />
                      <span>ADD JOB POSITION</span>
                    </button>
                  </div>

                  {(isCreatingJob || editingJob) ? (
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs animate-fade-in text-left">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <h4 className="font-extrabold text-slate-800 flex items-center gap-1.5 font-display">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          <span>{isCreatingJob ? 'Create New Job Position' : 'Edit Job Position'}</span>
                        </h4>
                        <button
                          onClick={() => {
                            setIsCreatingJob(false);
                            setEditingJob(null);
                          }}
                          className="px-2 py-1 bg-white hover:bg-slate-100 border text-slate-500 rounded font-mono text-[10px] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider font-mono">Job Title *</label>
                            <input
                              type="text"
                              required
                              value={isCreatingJob ? newJobForm.title : editingJob.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingJob) {
                                  setNewJobForm({ ...newJobForm, title: val });
                                } else {
                                  setEditingJob({ ...editingJob, title: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              placeholder="e.g. Senior Program Coordinator"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider font-mono font-mono">Department *</label>
                              <select
                                value={isCreatingJob ? newJobForm.department : editingJob.department}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingJob) {
                                    setNewJobForm({ ...newJobForm, department: val });
                                  } else {
                                    setEditingJob({ ...editingJob, department: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              >
                                <option value="Programs">Programs</option>
                                <option value="Operations">Operations</option>
                                <option value="Finance">Finance</option>
                                <option value="Communications">Communications</option>
                                <option value="Technology">Technology</option>
                                <option value="Monitoring & Evaluation">Monitoring & Evaluation</option>
                              </select>
                            </div>

                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider font-mono">Location *</label>
                              <input
                                type="text"
                                required
                                value={isCreatingJob ? newJobForm.location : editingJob.location}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingJob) {
                                    setNewJobForm({ ...newJobForm, location: val });
                                  } else {
                                    setEditingJob({ ...editingJob, location: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                                placeholder="e.g. Hubballi, Karnataka"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider font-mono">Employment Type</label>
                              <select
                                value={isCreatingJob ? newJobForm.type : editingJob.type}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingJob) {
                                    setNewJobForm({ ...newJobForm, type: val });
                                  } else {
                                    setEditingJob({ ...editingJob, type: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                              >
                                <option value="Full-time">Full-time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>
                              </select>
                            </div>

                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider font-mono">Experience</label>
                              <input
                                type="text"
                                value={isCreatingJob ? newJobForm.experience : editingJob.experience}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingJob) {
                                    setNewJobForm({ ...newJobForm, experience: val });
                                  } else {
                                    setEditingJob({ ...editingJob, experience: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                                placeholder="e.g. 2-4 Years"
                              />
                            </div>

                            <div>
                              <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider font-mono font-mono">CTC / Salary</label>
                              <input
                                type="text"
                                value={isCreatingJob ? newJobForm.salary : editingJob.salary}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (isCreatingJob) {
                                    setNewJobForm({ ...newJobForm, salary: val });
                                  } else {
                                    setEditingJob({ ...editingJob, salary: val });
                                  }
                                }}
                                className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-medium"
                                placeholder="e.g. ₹4.5 - ₹6.0 LPA"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider font-mono">Role Overview / Description *</label>
                            <textarea
                              required
                              rows={3}
                              value={isCreatingJob ? newJobForm.description : editingJob.description}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingJob) {
                                  setNewJobForm({ ...newJobForm, description: val });
                                } else {
                                  setEditingJob({ ...editingJob, description: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-sans"
                              placeholder="Detail the core objectives of this role..."
                            />
                          </div>

                          <div>
                            <label className="block mb-1 font-bold text-slate-500 uppercase text-[9px] tracking-wider font-mono font-mono">Detailed Requirements (Comma Separated) *</label>
                            <textarea
                              required
                              rows={2}
                              value={isCreatingJob ? newJobForm.requirements : (Array.isArray(editingJob.requirements) ? editingJob.requirements.join(', ') : editingJob.requirements)}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (isCreatingJob) {
                                  setNewJobForm({ ...newJobForm, requirements: val });
                                } else {
                                  setEditingJob({ ...editingJob, requirements: val });
                                }
                              }}
                              className="w-full p-2.5 border rounded-lg bg-white text-slate-800 font-sans"
                              placeholder="e.g. Degree in social work, Fluency in Kannada, Driver's license..."
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-3 border-t font-mono">
                        <button
                          onClick={() => {
                            setIsCreatingJob(false);
                            setEditingJob(null);
                          }}
                          className="px-4 py-2 border rounded-xl hover:bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer"
                        >
                          CANCEL
                        </button>
                        <button
                          onClick={() => {
                            if (isCreatingJob) {
                              if (!newJobForm.title || !newJobForm.description) {
                                alert("Please fill in Title and Description.");
                                return;
                              }
                              const reqArray = newJobForm.requirements.split(',').map(r => r.trim()).filter(Boolean);
                              const newJobItem = {
                                id: `job-${Date.now()}`,
                                title: newJobForm.title,
                                department: newJobForm.department,
                                location: newJobForm.location,
                                type: newJobForm.type,
                                experience: newJobForm.experience,
                                salary: newJobForm.salary,
                                description: newJobForm.description,
                                requirements: reqArray.length ? reqArray : ['Relevant experience in social trust works']
                              };
                              setJobsList([newJobItem, ...jobsList]);
                              setIsCreatingJob(false);
                            } else {
                              if (!editingJob.title || !editingJob.description) {
                                alert("Please fill in Title and Description.");
                                return;
                              }
                              const reqs = editingJob.requirements;
                              const reqArray = typeof reqs === 'string' ? reqs.split(',').map((r: string) => r.trim()).filter(Boolean) : reqs;
                              const updatedJob = {
                                ...editingJob,
                                requirements: reqArray
                              };
                              setJobsList(jobsList.map(j => j.id === editingJob.id ? updatedJob : j));
                              setEditingJob(null);
                            }
                          }}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                        >
                          {isCreatingJob ? 'SAVE NEW ROLE' : 'SAVE CHANGES'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Careers Table List */
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs font-mono">
                        <thead>
                          <tr className="border-b text-slate-400 uppercase text-[10px] font-bold bg-slate-50">
                            <th className="py-3 px-4 text-left">Role Title &amp; Department</th>
                            <th className="py-3 px-4 text-left">Location &amp; Type</th>
                            <th className="py-3 px-4 text-left">Experience Required</th>
                            <th className="py-3 px-4 text-center">Requirements</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {jobsList.map(job => (
                            <tr key={job.id} className="hover:bg-slate-50/50">
                              <td className="py-3.5 px-4 text-left">
                                <div className="font-bold text-slate-800">{job.title}</div>
                                <div className="text-[10px] text-emerald-700 font-bold">{job.department}</div>
                              </td>
                              <td className="py-3.5 px-4 text-left text-slate-500">
                                <div>{job.location}</div>
                                <div className="text-[10px]">{job.type}</div>
                              </td>
                              <td className="py-3.5 px-4 text-left text-slate-600">
                                <div>Exp: {job.experience}</div>
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                                  {job.requirements ? job.requirements.length : 0} items
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right space-x-1">
                                <button
                                  onClick={() => {
                                    setEditingJob({
                                      ...job,
                                      requirements: job.requirements || []
                                    });
                                    setIsCreatingJob(false);
                                  }}
                                  className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 border rounded text-[10px] font-bold transition-colors cursor-pointer"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    triggerConfirm(
                                      'Delete Job Position',
                                      `Are you sure you want to delete the job position: "${job.title}"? This action cannot be undone.`,
                                      () => {
                                        setJobsList(prev => prev.filter(j => j.id !== job.id));
                                      }
                                    );
                                  }}
                                  className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded text-[10px] font-bold transition-colors cursor-pointer"
                                  id={`delete-job-${job.id}`}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: WORKFLOW AUTOMATION (n8n/Visual builder) */}
              {currentAdminTab === 'workflow' && (
                <div className="p-6 bg-white border border-slate-200 rounded-3xl text-left space-y-6 animate-fade-in">
                  <div className="pb-4 border-b">
                    <h3 className="text-base font-extrabold font-display text-slate-900">Ecosystem Workflow Automations</h3>
                    <p className="text-xs text-slate-400">Observe triggered event loops and synchronize system tranches natively via Zapier, n8n, and WhatsApp API configurations.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {workflowAutomations.map(wf => (
                      <div key={wf.id} className="p-5 bg-slate-50 border rounded-2xl space-y-4 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Pipeline Flow: {wf.id}</span>
                            
                            <button
                              onClick={() => toggleWorkflow(wf.id)}
                              className="text-slate-400 hover:text-slate-700 cursor-pointer"
                            >
                              {wf.active ? (
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded">Active Syncing</span>
                              ) : (
                                <span className="px-2 py-0.5 bg-slate-200 text-slate-600 text-[9px] font-bold rounded">Suspended</span>
                              )}
                            </button>
                          </div>

                          <h4 className="text-sm font-bold text-slate-800">{wf.name}</h4>
                          <p className="text-xs text-slate-500 font-mono">Event Trigger: <strong>{wf.trigger}</strong></p>
                        </div>

                        <div className="border-t pt-3 flex justify-between items-center text-[10px] font-mono text-slate-400">
                          <div className="flex items-center gap-1.5">
                            {wf.integrations.map((int, i) => (
                              <span key={i} className="px-1.5 py-0.5 bg-white border rounded text-slate-600">
                                {int}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={() => deleteWorkflow(wf.id)}
                            className="p-1 hover:bg-rose-50 text-rose-600 rounded"
                            title="Delete Flow"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 text-xs font-mono">
                    <h4 className="font-bold text-amber-400 flex items-center gap-1">
                      <Zap size={14} />
                      <span>Visual Webhook Constructor</span>
                    </h4>
                    <p className="text-[10px] text-slate-300 leading-relaxed">
                      All system endpoints automatically expose standard REST headers. Point your n8n or Zapier webhooks directly to:
                      <br />
                      <code className="text-emerald-400 font-bold">https://raita-mitra-api.run.app/v1/webhooks/donations</code>
                    </p>
                  </div>

                </div>
              )}

              {/* TAB 7: AI STUDIO (Copywriter generation) */}
              {currentAdminTab === 'aistudio' && (
                <div className="p-6 bg-white border border-slate-200 rounded-3xl text-left space-y-6 animate-fade-in">
                  <div className="pb-4 border-b">
                    <h3 className="text-base font-extrabold font-display text-slate-900">AI Copywriter & Proposal Studio</h3>
                    <p className="text-xs text-slate-400">Synthesize outreach scripts, proposal drafts, social media threads, or audited ESG summaries instantly via Gemini Pro.</p>
                  </div>

                  <form onSubmit={handleGenerateAIContent} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-slate-100 p-1 rounded-xl text-xs font-mono">
                      {['blog', 'proposal', 'email', 'social'].map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setStudioCategory(cat as any)}
                          className={`py-2 rounded-lg text-center font-bold capitalize transition-all cursor-pointer ${
                            studioCategory === cat ? 'bg-slate-900 text-white shadow' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          {cat} Assistant
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="studio-prompt-input" className="block text-[10px] font-mono font-bold text-slate-400 uppercase">Write your generation prompt context:</label>
                      <textarea
                        id="studio-prompt-input"
                        rows={4}
                        value={studioPrompt}
                        onChange={(e) => setStudioPrompt(e.target.value)}
                        className="w-full p-4 border rounded-2xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-slate-50 text-slate-850"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="w-full py-3 bg-slate-950 hover:bg-slate-800 disabled:bg-slate-300 text-white font-mono text-xs font-bold rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Generating via Gemini Pro Server...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={14} className="text-amber-400" />
                          <span>Generate Output Statement</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Generation Output */}
                  <AnimatePresence>
                    {generatedOutput && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-slate-50 border rounded-2xl space-y-4 text-left"
                      >
                        <h4 className="text-xs font-bold font-mono text-slate-500 uppercase">Gemini Generated Output Draft:</h4>
                        <div className="text-xs font-sans leading-relaxed text-slate-700 whitespace-pre-wrap font-medium">
                          {generatedOutput}
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(generatedOutput);
                            alert('Copied to system clipboard!');
                          }}
                          className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border rounded-lg text-[10px] font-mono text-slate-600 font-bold"
                        >
                          Copy Output
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              )}

              {/* TAB: FORM SUBMISSIONS & GOOGLE SHEETS SYNC */}
              {currentAdminTab === 'submissions' && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Google Sheets Sync Settings card */}
                  <div className="p-6 bg-white border border-slate-200 rounded-3xl text-left space-y-6">
                    <div className="pb-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider block">CLOUD DATA PIPELINE</span>
                        <h3 className="text-lg font-extrabold font-display text-slate-900">Google Sheets Integration Panel</h3>
                        <p className="text-xs text-slate-400">Configure your Google Sheets Web App endpoint proxy to synchronize form submissions instantly.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${sheetsConfig.webAppUrl ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                        <span className="text-xs font-mono font-bold text-slate-600">
                          {sheetsConfig.webAppUrl ? 'Pipeline: ACTIVE' : 'Pipeline: INACTIVE'}
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleSaveSheetsConfig} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="sheets-url-input" className="block text-[11px] font-mono font-bold text-slate-500 uppercase">
                          Google Apps Script Web App Deployment URL *
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            id="sheets-url-input"
                            type="url"
                            placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                            value={sheetsConfig.webAppUrl}
                            onChange={(e) => setSheetsConfig({ webAppUrl: e.target.value })}
                            className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-emerald-500 text-slate-850"
                          />
                          <button
                            type="submit"
                            disabled={isConfigSaving}
                            className="px-6 py-3 bg-slate-950 hover:bg-slate-800 disabled:bg-slate-300 text-white font-mono text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap"
                          >
                            {isConfigSaving ? 'Saving...' : '💾 Save Webhook URL'}
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal">
                          Create a spreadsheet, go to <strong>Extensions &gt; Apps Script</strong>, paste the Google Apps Script Web App handler code, click <strong>Deploy &gt; New Deployment</strong> as Web App, set access to "Anyone", and paste the resulting URL here.
                        </p>
                      </div>
                    </form>

                    {/* Quick Connectivity Testing Tools */}
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-mono font-bold uppercase text-slate-600">Integration Handshake Tester</h4>
                        <button
                          onClick={handleTestSync}
                          disabled={testSyncLoading}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer"
                        >
                          {testSyncLoading ? 'Running Handshake...' : '⚡ Trigger Test Sync Submission'}
                        </button>
                      </div>
                      
                      {testSyncResult && (
                        <div className="p-3 bg-white border rounded-xl text-[11px] font-mono whitespace-pre-wrap leading-relaxed">
                          {testSyncResult}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submissions data table card */}
                  <div className="p-6 bg-white border border-slate-200 rounded-3xl text-left space-y-6">
                    <div className="pb-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider block">LOCAL PERSISTENT STORAGE</span>
                        <h3 className="text-lg font-extrabold font-display text-slate-900">Form Submissions Ledger</h3>
                        <p className="text-xs text-slate-400">View and audit all verified form submissions recorded locally in the file storage engine (submissions.json).</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={fetchSubmissionsAndConfig}
                          disabled={isSubmissionsLoading}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-mono font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          {isSubmissionsLoading ? 'Syncing...' : '🔄 Refresh Lists'}
                        </button>
                        <button
                          onClick={handleClearSubmissions}
                          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-mono font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          🗑️ Clear local logs
                        </button>
                      </div>
                    </div>

                    {/* Submissions Filters */}
                    <div className="flex flex-wrap gap-2">
                      {['All', 'Contact Inquiry', 'Support Ticket', 'Newsletter Signup', 'Career Application', 'Volunteer Hours Log', 'Partner Onboarding'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setSubmissionsFilter(filter)}
                          className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
                            submissionsFilter === filter
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>

                    {/* Submissions List Render */}
                    {isSubmissionsLoading ? (
                      <div className="py-12 text-center text-xs font-mono text-slate-400 animate-pulse">
                        Querying localhost storage files...
                      </div>
                    ) : submissionsList.length === 0 ? (
                      <div className="py-12 text-center text-xs font-mono text-slate-400 border border-dashed rounded-2xl">
                        No submissions recorded on this environment yet. Try submitting the contact or career forms to see them populate here in real-time.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {submissionsList
                          .filter(sub => submissionsFilter === 'All' || sub.formType === submissionsFilter)
                          .map((sub, index) => (
                            <div key={index} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold rounded">
                                    {sub.formType}
                                  </span>
                                  <h4 className="text-xs font-black text-slate-800">{sub.subject || 'Form Inquiry'}</h4>
                                </div>
                                <span className="text-[10px] font-mono text-slate-400">
                                  {sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : 'Just Now'}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                                <div>
                                  <p className="text-[10px] font-mono text-slate-400 uppercase">Sender Name</p>
                                  <p className="font-semibold text-slate-800">{sub.name}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-mono text-slate-400 uppercase">Email Address</p>
                                  <p className="font-semibold text-slate-800">{sub.email}</p>
                                </div>
                                {sub.phone && (
                                  <div>
                                    <p className="text-[10px] font-mono text-slate-400 uppercase">Phone Number</p>
                                    <p className="font-semibold text-slate-800">{sub.phone}</p>
                                  </div>
                                )}
                              </div>

                              {sub.message && (
                                <div className="p-3.5 bg-white border rounded-xl text-xs text-slate-600 leading-relaxed font-sans font-medium whitespace-pre-wrap">
                                  {sub.message}
                                </div>
                              )}

                              {sub.metadata && Object.keys(sub.metadata).length > 0 && (
                                <div className="space-y-1">
                                  <p className="text-[9px] font-mono text-slate-400 uppercase">Extended Metadata Payload</p>
                                  <div className="p-3 bg-slate-900 text-slate-300 text-[10px] font-mono rounded-xl overflow-x-auto">
                                    <pre>{JSON.stringify(sub.metadata, null, 2)}</pre>
                                  </div>
                                </div>
                              )}

                              {/* Google Sheets Sync Status Panel */}
                              <div className="pt-2 border-t border-slate-200/60 flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-mono text-slate-400 uppercase">GOOGLE SHEETS PIPELINE:</span>
                                  {sub.googleSheetsSynced ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                      Synchronized Successfully
                                    </span>
                                  ) : sub.syncError ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200/60">
                                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                      Sync Failed (Action Required)
                                    </span>
                                  ) : sheetsConfig.webAppUrl ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                      Configured (Unsynced or Retrying)
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                      Not Connected
                                    </span>
                                  )}
                                </div>
                                {sub.syncError && (
                                  <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl text-xs text-rose-800 space-y-2">
                                    <p className="font-bold flex items-center gap-1">
                                      ⚠️ Sync Error Details:
                                    </p>
                                    <p className="font-medium font-sans leading-relaxed text-[11px] whitespace-pre-line bg-white/60 p-2.5 rounded-lg border border-rose-200/40">{sub.syncError}</p>
                                    
                                    {(sub.syncError.includes('Google Permission Error') || sub.syncError.includes('Google Apps Script Permission Error') || sub.syncError.includes('401') || sub.syncError.includes('403')) ? (
                                      <div className="pt-1.5 text-[10px] text-rose-700/90 font-sans space-y-1.5 bg-white/80 p-3 rounded-lg border border-rose-200/60">
                                        <p className="font-bold uppercase tracking-wide">💡 Step-by-Step Fix for this Apps Script Permission Issue:</p>
                                        <ol className="list-decimal pl-4 space-y-1 font-medium leading-relaxed">
                                          <li>Open the <strong>Google Sheet</strong> where you want to store submissions.</li>
                                          <li>Click <strong>Extensions &gt; Apps Script</strong> in the main toolbar.</li>
                                          <li>In the upper right corner, click the blue <strong>Deploy</strong> button and choose <strong>Manage deployments</strong>.</li>
                                          <li>Click the pencil icon (<strong>Edit</strong>) for your active Web App deployment.</li>
                                          <li>Change <strong>"Who has access"</strong> from <em>"Only myself"</em> to <strong>"Anyone"</strong>. (This allows our secure background proxy to forward submission data).</li>
                                          <li>Under <strong>"Project version"</strong>, select <strong>"New version"</strong> (Google will NOT apply permission changes without creating a new version!).</li>
                                          <li>Click <strong>Deploy</strong>.</li>
                                          <li>Copy the new <strong>Web App URL</strong> (ends with <code>/exec</code>).</li>
                                          <li>Paste that URL into the <strong>Google Sheets Sync Web App URL</strong> field above and click <strong>Save</strong>.</li>
                                        </ol>
                                      </div>
                                    ) : null}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}

                    {/* Google Apps Script Integration Snippet Instructions */}
                    <div className="pt-6 border-t border-slate-100 space-y-4">
                      <h4 className="text-xs font-mono font-bold uppercase text-slate-500">Google Apps Script Snippet (Deploy as Web App)</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        To build a direct pipeline to your spreadsheet, copy this Apps Script, paste it into your sheet's App Script editor, click <strong>Deploy &gt; New Deployment (Web App)</strong>, and configure access as <strong>"Anyone"</strong>:
                      </p>
                      
                      <div className="p-4 bg-slate-950 text-slate-200 text-xs font-mono rounded-2xl overflow-x-auto border border-slate-800 max-h-60">
                        <pre>{`function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Auto-create header if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Form Type", "Name", "Email", "Phone", "Subject", "Message", "Metadata JSON"]);
    }
    
    sheet.appendRow([
      new Date(),
      data.formType || "",
      data.name || "",
      data.email || "",
      data.phone || "",
      data.subject || "",
      data.message || "",
      data.metadata ? JSON.stringify(data.metadata) : ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: INTEGRATIONS HUB */}
              {currentAdminTab === 'integrations' && (
                <div className="p-6 bg-white border border-slate-200 rounded-3xl text-left space-y-6 animate-fade-in">
                  <div className="pb-4 border-b">
                    <h3 className="text-base font-extrabold font-display text-slate-900">Integrations Hub & Key Ring</h3>
                    <p className="text-xs text-slate-400">Manage client certificates and secret key rings for domestic UPI and foreign exchange channels.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {INTEGRATIONS_HUB_ITEMS.map(int => (
                      <div key={int.id} className="p-5 bg-slate-50 border rounded-2xl space-y-3 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono text-slate-400 font-bold">{int.category}</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                              int.status === 'Connected' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                            }`}>{int.status}</span>
                          </div>
                          <h4 className="text-xs font-black text-slate-800">{int.name}</h4>
                          <p className="text-[11px] text-slate-500 leading-normal">{int.desc}</p>
                        </div>

                        <div className="pt-2 border-t text-[9px] font-mono text-slate-400 flex justify-between">
                          <span>Key Expiry: {int.keyExpiry}</span>
                          <button 
                            onClick={() => alert(`Initiating key rotation handshake for: ${int.name}`)}
                            className="text-amber-700 font-bold hover:underline"
                          >
                            Rotate Secret
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 9: SUPER ADMIN CONTROL PANEL */}
              {currentAdminTab === 'system' && (
                <div className="p-6 bg-white border border-slate-200 rounded-3xl text-left space-y-6 animate-fade-in">
                  <div className="pb-4 border-b">
                    <h3 className="text-base font-extrabold font-display text-slate-900">Super-Admin Configuration Panel</h3>
                    <p className="text-xs text-slate-400">Toggle system flags, view master database backups, and control environment variables.</p>
                  </div>

                  {/* Feature Flags */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold uppercase text-slate-400">Ecosystem Feature Flags</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      {[
                        { key: 'enableMultiTenant', label: 'Multi-Tenant SaaS Architecture' },
                        { key: 'enableMCPServer', label: 'Model Context Protocol (MCP) Server Access' },
                        { key: 'enableBlockchainLedger', label: 'Solidity Hash Trust Ledger Proofs' },
                        { key: 'enableRealTimeGPSMap', label: 'Live GPS Satellite Grounding Map' },
                        { key: 'maintenanceMode', label: 'Ecosystem Under Maintenance Flag' }
                      ].map(item => {
                        const val = featureFlags[item.key as keyof typeof featureFlags];
                        return (
                          <div key={item.key} className="p-4 bg-slate-50 border rounded-2xl flex justify-between items-center">
                            <span>{item.label}</span>
                            <button
                              onClick={() => toggleFeatureFlag(item.key as any)}
                              className="text-slate-600"
                            >
                              {val ? (
                                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Enabled</span>
                              ) : (
                                <span className="px-2 py-1 bg-slate-200 text-slate-600 text-[10px] font-bold rounded">Disabled</span>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Environment variables simulation */}
                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <h4 className="text-xs font-mono font-bold uppercase text-slate-400">Environment Variables Config (.env)</h4>
                    
                    <div className="space-y-2 text-xs font-mono bg-slate-950 text-slate-300 p-4 rounded-2xl border border-slate-800">
                      <div>
                        <span className="text-emerald-500">DATABASE_URL</span>=
                        <span className="text-slate-400">postgresql://postgres:********@db.supa.internal:5432/raita-mitra</span>
                      </div>
                      <div>
                        <span className="text-emerald-500">GEMINI_API_KEY</span>=
                        <span className="text-slate-400">AIzaSyB_********************_MOCK_KEY</span>
                      </div>
                      <div>
                        <span className="text-emerald-500">REDIS_CACHE_SERVER</span>=
                        <span className="text-slate-400">redis://default:********@redis-cache.internal:6379</span>
                      </div>
                      <div>
                        <span className="text-emerald-500">MCA_DARPAN_ACCESS_SECRET</span>=
                        <span className="text-slate-400">mca_sha256_****************_v4</span>
                      </div>
                    </div>
                  </div>

                  {/* System Health Audit log snippet */}
                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <h4 className="text-xs font-mono font-bold uppercase text-slate-400">Super-Admin Audit Trail Ledger</h4>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px] font-mono text-slate-600">
                        <thead>
                          <tr className="border-b uppercase text-[9px] font-bold text-slate-400">
                            <th className="py-2 px-2 text-left">Timestamp</th>
                            <th className="py-2 px-2 text-left">Operator Node</th>
                            <th className="py-2 px-2 text-left">Action Payload</th>
                            <th className="py-2 px-2 text-right">IP Address</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {AUDIT_LOGS.map((log, i) => (
                            <tr key={i}>
                              <td className="py-3 px-2 text-slate-400">{log.time}</td>
                              <td className="py-3 px-2 font-bold text-slate-800">{log.user}</td>
                              <td className="py-3 px-2">
                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase mr-1.5 ${
                                  log.severity === 'danger' ? 'bg-rose-50 text-rose-700' : log.severity === 'warning' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700'
                                }`}>
                                  {log.severity}
                                </span>
                                <span>{log.action}</span>
                              </td>
                              <td className="py-3 px-2 text-right text-slate-400">{log.ip}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>

        </main>
      )}

      {/* CUSTOM SYSTEM-WIDE CONFIRMATION MODAL */}
      <AnimatePresence>
        {confirmDialog && confirmDialog.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmDialog(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            {/* Dialog Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative w-full max-w-md p-6 rounded-3xl border shadow-2xl z-10 text-left space-y-4 ${
                highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-rose-50 text-rose-600 shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold font-display">
                    {confirmDialog.title || 'Confirm Action'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {confirmDialog.message}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2 font-mono">
                <button
                  onClick={() => setConfirmDialog(null)}
                  className="px-4 py-2 border rounded-xl hover:bg-slate-50 text-slate-600 text-xs font-bold cursor-pointer transition-colors"
                >
                  CANCEL
                </button>
                <button
                  onClick={() => {
                    confirmDialog.onConfirm();
                    setConfirmDialog(null);
                  }}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  CONFIRM EXECUTION
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
