import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import SidebarWidgets from './components/SidebarWidgets';

// Import All Core Views
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Programs from './pages/Programs';
import ImpactStories from './pages/ImpactStories';
import ComplianceHub from './pages/ComplianceHub';
import Gallery from './pages/Gallery';
import NewsBlog from './pages/NewsBlog';
import Donate from './pages/Donate';
import Volunteer from './pages/Volunteer';
import ContactUs from './pages/ContactUs';
import AnnualReports from './pages/AnnualReports';
import Events from './pages/Events';
import MediaPress from './pages/MediaPress';
import ResourceCentre from './pages/ResourceCentre';
import FaqCentre from './pages/FaqCentre';
import Careers from './pages/Careers';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import RefundPolicy from './pages/RefundPolicy';
import CookiePolicy from './pages/CookiePolicy';
import NotFound from './pages/NotFound';
import SearchResults from './pages/SearchResults';
import ProgramDetail from './pages/ProgramDetail';
import BlogDetail from './pages/BlogDetail';
import EventDetail from './pages/EventDetail';
import ImpactStoryDetail from './pages/ImpactStoryDetail';
import AiAssistant from './pages/AiAssistant';
import DonorPortal from './pages/DonorPortal';
import PartnerPortal from './pages/PartnerPortal';
import AdminDashboard from './pages/AdminDashboard';

// Search Data references for the global engine
import { programsData } from './data/programs';
import { complianceDocuments } from './data/compliance';

export default function App() {
  // Get initial page from hash or default to 'home'
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (hash.startsWith('programs/')) {
      return hash;
    }
    if (hash.startsWith('blog/')) {
      return hash;
    }
    if (hash.startsWith('events/')) {
      return hash;
    }
    if (hash.startsWith('impact-stories/')) {
      return hash;
    }
    const validPages = ['home', 'about', 'programs', 'compliance', 'stories', 'gallery', 'blog', 'donate', 'volunteer', 'contact', 'transparency', 'events', 'media', 'resources', 'faq', 'careers', 'privacy', 'terms', 'refund', 'cookies', 'notfound', 'search-results', 'ai-assistant', 'donor-portal', 'partner-portal', 'admin-dashboard'];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [activePage, setActivePageInternal] = useState<string>(getInitialPage());
  const [fontScale, setFontScale] = useState<number>(1.0);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Default SEO configurations for every single page
  const [seoConfig, setSeoConfig] = useState<Record<string, { title: string; description: string; futureImage: string }>>(() => {
    const saved = localStorage.getItem('raita_mitra_seo_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored SEO config:', e);
      }
    }
    return {
      home: {
        title: 'Raita Mitra Trust | Empowering Farmers & Rural Communities',
        description: 'Empowering small farmers in North Karnataka through solar micro-irrigation, sustainable organic agriculture, digital skills, and certified field networks.',
        futureImage: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600'
      },
      about: {
        title: 'About Us | Raita Mitra Trust - Our Mission & Vision',
        description: 'Read about the Raita Mitra Trust history, leadership board, agronomists, and our dedication to direct on-ground rural community upliftment.',
        futureImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600'
      },
      programs: {
        title: 'Our Programs | Raita Mitra Trust - Farmer Welfare & STEM Education',
        description: 'Discover our integrated solutions: Solar Drip Irrigation hubs, Girls Python & STEM Classrooms, and Soil Diagnostics in Haveri & Savanur.',
        futureImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600'
      },
      compliance: {
        title: 'Statutory Compliance & CSR Hub | Raita Mitra Trust',
        description: 'View trust 12A/80G tax exemptions, NGO Darpan filings, FCRA status, and CSR activity ledger audits for verified donor trust.',
        futureImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600'
      },
      stories: {
        title: 'Impact Stories | Raita Mitra Trust - Real Change on the Ground',
        description: 'Chronological timeline of successes and direct quotes from smallholders whose lives were changed by Raita Mitra programs.',
        futureImage: 'https://images.unsplash.com/photo-1574943320219-553dd213f725?auto=format&fit=crop&q=80&w=600'
      },
      gallery: {
        title: 'Media Gallery | Raita Mitra Trust - Visual Chronology',
        description: 'High-definition photo and video documentation of our on-field projects, solar drip installations, and STEM classes.',
        futureImage: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600'
      },
      blog: {
        title: 'News & Blog | Raita Mitra Trust - Agrarian Updates & Tech Guides',
        description: 'Expert agronomy guides, carbon credit tutorials, market access briefings, and technology updates for progressive rural farming.',
        futureImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600'
      },
      donate: {
        title: 'Donate & Support | Raita Mitra Trust - Contribute to Rural Progress',
        description: 'Support smallholders and STEM classrooms through direct, 100% tax-exempt donations. Secure payments via Razorpay & Stripe.',
        futureImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=600'
      },
      volunteer: {
        title: 'Volunteer With Us | Raita Mitra Trust - Certified Field Force',
        description: 'Join our certified field volunteers to assemble solar equipment, train rural schoolchildren in IT, or conduct diagnostic checks.',
        futureImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600'
      },
      contact: {
        title: 'Contact Us | Raita Mitra Trust - Haveri, Savanur & Dharwad',
        description: 'Get in touch with our administrative offices, on-ground hubs, or email our support desk for partnerships and inquiries.',
        futureImage: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=600'
      },
      transparency: {
        title: 'Financial Transparency & Audits | Raita Mitra Trust',
        description: 'Read verified audited accounts, balance sheets, and utilization files validating our perfect project conversion index.',
        futureImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600'
      },
      events: {
        title: 'Upcoming Events & Campaigns | Raita Mitra Trust',
        description: 'Participate in our seed diagnostic drives, on-field solar assembly workshops, and coding camps in regional clusters.',
        futureImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600'
      },
      media: {
        title: 'Media & Press Relations | Raita Mitra Trust',
        description: 'Official press releases, television reporting, high-contrast imagery, and trusted news coverage detailing our impact.',
        futureImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600'
      },
      resources: {
        title: 'Farmer Resource Centre | Raita Mitra Trust',
        description: 'Free download and consultation materials: crop calendars, government subsidy directories, soil treatment indexes, and manuals.',
        futureImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=600'
      },
      faq: {
        title: 'FAQ Centre | Raita Mitra Trust - Answers to Key Queries',
        description: 'Detailed, clear questions and answers detailing solar pumps, certified seed selections, CSR tax audits, and volunteer safety.',
        futureImage: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=600'
      },
      careers: {
        title: 'Careers & Internships | Raita Mitra Trust',
        description: 'View full-time administrative and structural field opportunities or apply for technical agronomy and computer training internships.',
        futureImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600'
      },
      privacy: {
        title: 'Privacy Policy | Raita Mitra Trust',
        description: 'Learn how we manage and safeguard your personal details, donation accounts, email subscriptions, and digital safety.',
        futureImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600'
      },
      terms: {
        title: 'Terms & Conditions | Raita Mitra Trust',
        description: 'Read the terms of use, structural constraints, general agreements, and responsibilities governing Raita Mitra digital platforms.',
        futureImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600'
      },
      refund: {
        title: 'Refund Policy | Raita Mitra Trust',
        description: 'Examine our payment processing guidelines and options for donation reversals under genuine accidental entry scenarios.',
        futureImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=600'
      },
      cookies: {
        title: 'Cookie Policy | Raita Mitra Trust',
        description: 'Understand how our web platforms use cookies to enhance responsive accessibility, load maps faster, and remember segments.',
        futureImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=600'
      },
      'ai-assistant': {
        title: 'Mitra AI Assistant & Copilot | Raita Mitra Trust',
        description: 'Interact with Mitra, our conversational AI agronomist trained in soil diagnostics, government subsidies, and legal CSR parameters.',
        futureImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600'
      },
      'donor-portal': {
        title: 'Donor Portal & Impact Ledger | Raita Mitra Trust',
        description: 'Log in to track your personal or corporate impact timeline, audit ledger transactions, and download tax-deductible receipts.',
        futureImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600'
      },
      'partner-portal': {
        title: 'Partner Portal & CSR Hub | Raita Mitra Trust',
        description: 'Examine active CSR agreements, download board certifications, verify progress ledgers, and manage team compliance reports.',
        futureImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600'
      },
      'admin-dashboard': {
        title: 'Super Admin Command Center | Raita Mitra Trust',
        description: 'Secure dashboard for Raita Mitra board members to manage CMS entries, blogs, events, media files, and global configurations.',
        futureImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600'
      }
    };
  });

  // Keep localStorage in sync when seoConfig state changes
  useEffect(() => {
    localStorage.setItem('raita_mitra_seo_config', JSON.stringify(seoConfig));
  }, [seoConfig]);

  // Synchronize document.title and other meta tags dynamically
  useEffect(() => {
    let pageKey = activePage;
    if (activePage.startsWith('programs/')) pageKey = 'programs';
    else if (activePage.startsWith('blog/')) pageKey = 'blog';
    else if (activePage.startsWith('events/')) pageKey = 'events';
    else if (activePage.startsWith('impact-stories/')) pageKey = 'stories';

    const currentSeo = seoConfig[pageKey] || seoConfig['home'] || {
      title: 'Raita Mitra Trust',
      description: 'Empowering Farmers and Rural Communities.',
      futureImage: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600'
    };

    // 1. Update Title
    document.title = currentSeo.title;

    // 2. Update Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', currentSeo.description);

    // 3. Update Open Graph properties
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', currentSeo.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', currentSeo.description);

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', currentSeo.futureImage);
  }, [activePage, seoConfig]);

  // Update hash when activePage changes to make pages dynamic
  const setActivePage = (page: string) => {
    if (page === 'home') {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    } else {
      window.location.hash = `#/${page}`;
    }
    setActivePageInternal(page);
  };

  // Sync state on browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const page = getInitialPage();
      setActivePageInternal(page);
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [activePage]);

  // Global search trigger
  const handleGlobalSearch = (query: string) => {
    if (!query.trim()) {
      setSearchQuery('');
      setSearchResults([]);
      return;
    }

    setSearchQuery(query);
    const lowercaseQuery = query.toLowerCase();
    const results: any[] = [];

    // Search Programs
    programsData.forEach((prog) => {
      if (
        prog.title.toLowerCase().includes(lowercaseQuery) ||
        prog.tagline.toLowerCase().includes(lowercaseQuery) ||
        prog.detailedOverview.toLowerCase().includes(lowercaseQuery)
      ) {
        results.push({
          type: 'Program',
          title: prog.title,
          desc: prog.tagline,
          page: 'programs',
          id: prog.id
        });
      }
    });

    // Search Compliance Documents
    complianceDocuments.forEach((doc) => {
      if (
        doc.title.toLowerCase().includes(lowercaseQuery) ||
        doc.refNo.toLowerCase().includes(lowercaseQuery) ||
        doc.description.toLowerCase().includes(lowercaseQuery)
      ) {
        results.push({
          type: 'Compliance File',
          title: doc.title,
          desc: `Reference ID: ${doc.refNo} - Size: ${doc.size}`,
          page: 'compliance',
          id: doc.id
        });
      }
    });

    setSearchResults(results);
    setActivePage('search-results');
  };

  const renderActivePage = () => {
    // If dynamic program route
    if (activePage.startsWith('programs/')) {
      const slug = activePage.replace('programs/', '');
      return (
        <ProgramDetail 
          slug={slug}
          setActivePage={setActivePage}
          highContrast={highContrast}
        />
      );
    }

    // If dynamic blog route
    if (activePage.startsWith('blog/')) {
      const slug = activePage.replace('blog/', '');
      return (
        <BlogDetail 
          slug={slug}
          setActivePage={setActivePage}
          highContrast={highContrast}
        />
      );
    }

    // If dynamic event route
    if (activePage.startsWith('events/')) {
      const slug = activePage.replace('events/', '');
      return (
        <EventDetail 
          slug={slug}
          setActivePage={setActivePage}
          highContrast={highContrast}
        />
      );
    }

    // If dynamic impact story route
    if (activePage.startsWith('impact-stories/')) {
      const slug = activePage.replace('impact-stories/', '');
      return (
        <ImpactStoryDetail 
          slug={slug}
          setActivePage={setActivePage}
          highContrast={highContrast}
        />
      );
    }

    // If inside global search view
    if (activePage === 'search-results') {
      return (
        <SearchResults 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActivePage={setActivePage}
          highContrast={highContrast}
        />
      );
    }

    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} highContrast={highContrast} />;
      case 'about':
        return <AboutUs highContrast={highContrast} />;
      case 'programs':
        return <Programs setActivePage={setActivePage} highContrast={highContrast} />;
      case 'compliance':
        return <ComplianceHub highContrast={highContrast} />;
      case 'stories':
        return <ImpactStories setActivePage={setActivePage} highContrast={highContrast} />;
      case 'gallery':
        return <Gallery highContrast={highContrast} />;
      case 'blog':
        return <NewsBlog setActivePage={setActivePage} highContrast={highContrast} />;
      case 'donate':
        return <Donate highContrast={highContrast} />;
      case 'volunteer':
        return <Volunteer highContrast={highContrast} />;
      case 'contact':
        return <ContactUs highContrast={highContrast} />;
      case 'transparency':
        return <AnnualReports highContrast={highContrast} />;
      case 'events':
        return <Events setActivePage={setActivePage} highContrast={highContrast} />;
      case 'media':
        return <MediaPress highContrast={highContrast} />;
      case 'resources':
        return <ResourceCentre highContrast={highContrast} />;
      case 'faq':
        return <FaqCentre setActivePage={setActivePage} highContrast={highContrast} />;
      case 'careers':
        return <Careers setActivePage={setActivePage} highContrast={highContrast} />;
      case 'privacy':
        return <PrivacyPolicy setActivePage={setActivePage} highContrast={highContrast} />;
      case 'terms':
        return <TermsConditions setActivePage={setActivePage} highContrast={highContrast} />;
      case 'refund':
        return <RefundPolicy setActivePage={setActivePage} highContrast={highContrast} />;
      case 'cookies':
        return <CookiePolicy setActivePage={setActivePage} highContrast={highContrast} />;
      case 'notfound':
        return <NotFound setActivePage={setActivePage} highContrast={highContrast} />;
      case 'ai-assistant':
        return <AiAssistant setActivePage={setActivePage} highContrast={highContrast} />;
      case 'donor-portal':
        return <DonorPortal highContrast={highContrast} />;
      case 'partner-portal':
        return <PartnerPortal highContrast={highContrast} />;
      case 'admin-dashboard':
        return (
          <AdminDashboard 
            highContrast={highContrast} 
            setActivePage={setActivePage}
            seoConfig={seoConfig}
            setSeoConfig={setSeoConfig}
          />
        );
      default:
        return <Home setActivePage={setActivePage} highContrast={highContrast} />;
    }
  };

  return (
    <div 
      className={`min-h-screen flex flex-col justify-between selection:bg-gold/30 ${
        highContrast ? 'bg-black text-white' : 'bg-white text-slate-800'
      }`}
      style={{ fontSize: `${fontScale}em` }}
      id="root-application-layout"
    >
      {/* Sticky Navigation Header */}
      <Header 
        activePage={activePage}
        setActivePage={setActivePage}
        fontScale={fontScale}
        setFontScale={setFontScale}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        onSearch={handleGlobalSearch}
      />

      {/* Main Content Render Area */}
      <main id="main-content" className="flex-1 w-full overflow-hidden" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Trust & General Purpose Footer */}
      <Footer 
        setActivePage={setActivePage}
        highContrast={highContrast}
      />

      {/* Floating widgets: WhatsApp chat, cookie consent, Back-to-top */}
      <SidebarWidgets highContrast={highContrast} setActivePage={setActivePage} />
    </div>
  );
}
