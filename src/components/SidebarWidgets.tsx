import { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp, X, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarWidgetsProps {
  highContrast: boolean;
  setActivePage: (page: string) => void;
}

export default function SidebarWidgets({ highContrast, setActivePage }: SidebarWidgetsProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showCookies, setShowCookies] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    
    // Check cookie consent
    const consent = localStorage.getItem('raita_mitra_cookie_consent');
    if (!consent) {
      setShowCookies(true);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('raita_mitra_cookie_consent', 'accepted');
    setShowCookies(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Action Elements Container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3" id="floating-interaction-group">
        
        {/* Floating Mitra AI Assistant Button */}
        <button 
          onClick={() => setActivePage('ai-assistant')}
          className={`p-3.5 rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-150 cursor-pointer relative group ${
            highContrast 
              ? 'bg-white text-black border-2 border-black' 
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
          aria-label="Chat with Mitra AI Copilot"
          title="Chat with Mitra AI Copilot"
          id="ai-floating-trigger"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gold"></span>
          </span>
          <MessageSquare className="w-6 h-6 fill-current stroke-[2.5]" />
          
          {/* Elegant Tooltip */}
          <div className="absolute right-14 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center">
            <div className="bg-slate-950 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl border border-slate-800">
              Chat with Mitra AI ✦
            </div>
          </div>
        </button>

        {/* Back To Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className={`p-3 rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer ${
                highContrast 
                  ? 'bg-black text-white border-2 border-white' 
                  : 'bg-forest text-white hover:bg-forest-light'
              }`}
              aria-label="Back to Top"
              title="Back to Top"
              id="back-to-top-trigger"
            >
              <ArrowUp className="w-5 h-5 stroke-[2.5]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Cookie Consent banner */}
      <AnimatePresence>
        {showCookies && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-slate-900/40 backdrop-blur-md border-t border-slate-800"
            id="cookie-consent-container"
          >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex gap-3 items-start">
                <ShieldAlert className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed font-sans max-w-3xl">
                  We use cookies and basic local storage engines to enhance your browsing experience, display geo-tagged compliance metrics, and remember editable board of trustees preferences. By clicking &quot;Accept All&quot;, you consent to our use of these local tools.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button 
                  onClick={acceptCookies}
                  className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer transition-all ${
                    highContrast ? 'bg-white text-black' : 'bg-gold hover:bg-gold-light text-white'
                  }`}
                >
                  Accept All
                </button>
                <button 
                  onClick={() => setShowCookies(false)}
                  className={`p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ${
                    highContrast ? 'border border-white text-white bg-black' : ''
                  }`}
                  aria-label="Close Cookie Consent"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
