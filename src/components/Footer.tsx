import React, { useState } from 'react';
import { RaitaMitraLogoFull } from './RaitaMitraLogo';
import { 
  Sprout, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  CheckCircle, 
  Send 
} from 'lucide-react';

interface FooterProps {
  setActivePage: (page: string) => void;
  highContrast: boolean;
}

export default function Footer({ setActivePage, highContrast }: FooterProps) {
  const [newsName, setNewsName] = useState('');
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsName.trim() || !newsEmail.trim()) {
      setError('Please fill in both name and email.');
      return;
    }
    if (!newsEmail.includes('@') || !newsEmail.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }
    
    // Simulate API registration
    setError('');
    setSubscribed(true);
    setNewsName('');
    setNewsEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <footer className={`w-full py-16 px-4 md:px-8 border-t transition-colors duration-200 ${
      highContrast 
        ? 'bg-black text-white border-white' 
        : 'bg-slate-950 text-slate-300 border-slate-900'
    }`} id="application-footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-6 xl:gap-8">
        
        {/* NGO Core Profile and Trust Badges */}
        <div className="space-y-6 lg:col-span-1">
          <div className="flex flex-col gap-1.5">
            <RaitaMitraLogoFull 
              width={240} 
              height={56} 
              highContrast={highContrast} 
              theme="dark"
              className="h-12 w-auto -ml-4"
            />
            <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-0.5 pl-1">ESTD: 2021 | Hubballi</p>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            Empowering marginal farmers, enabling women self-reliance, driving STEM-AI classrooms, and implementing community climate action models in Karnataka.
          </p>

          {/* Verification Badges */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {[
              { label: 'MCA CSR-1 Reg', ref: 'CSR00059487' },
              { label: 'NGO Darpan Verified', ref: 'KA/2023/0342549' },
              { label: '12A Income Tax', ref: 'Verified Exemption' },
              { label: '80G Registered', ref: 'Tax Benefit' }
            ].map((badge, idx) => (
              <div 
                key={idx} 
                className={`p-2 rounded-lg text-left border ${
                  highContrast 
                    ? 'border-white bg-black' 
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <p className="text-[9px] font-bold text-white uppercase tracking-wider">{badge.label}</p>
                <p className="text-[10px] text-slate-400 font-mono leading-none mt-0.5">{badge.ref}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Program Navigation */}
        <div className="space-y-6">
          <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider border-l-2 border-gold pl-3">
            Core Programs
          </h3>
          <ul className="space-y-3.5 text-sm">
            {[
              { label: 'Sustainable Agriculture & Irrigation', id: 'programs' },
              { label: 'Women Empowerment & Dairy Co-ops', id: 'programs' },
              { label: 'AI & Digital Skill Labs', id: 'programs' },
              { label: 'Health, Nutrition & Kitchen Gardens', id: 'programs' },
              { label: 'Miyawaki Forest & Lake Watersheds', id: 'programs' },
              { label: 'Agro-Processing & Entrepreneurship', id: 'programs' }
            ].map((link, idx) => (
              <li key={idx}>
                <button 
                  onClick={() => setActivePage(link.id)}
                  className={`hover:text-white transition-colors cursor-pointer text-left block w-full ${
                    highContrast ? 'underline' : ''
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-6">
          <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider border-l-2 border-gold pl-3">
            Resources
          </h3>
          <ul className="space-y-3.5 text-sm">
            {[
              { label: 'Mitra AI Copilot ✦', id: 'ai-assistant' },
              { label: 'Donor Portal & Impact Ledger ✦', id: 'donor-portal' },
              { label: 'Partner Portal & CSR Hub ✦', id: 'partner-portal' },
              { label: 'Super Admin Core ✦', id: 'admin-dashboard' },
              { label: 'CSR & Compliance', id: 'compliance' },
              { label: 'Annual Reports & Audits', id: 'transparency' },
              { label: 'Impact Stories', id: 'stories' },
              { label: 'Gallery', id: 'gallery' },
              { label: 'Events & Workshops', id: 'events' },
              { label: 'Media & Press Centre', id: 'media' },
              { label: 'Resource Centre & Knowledge Hub', id: 'resources' },
              { label: 'FAQ Centre & Help Desk', id: 'faq' },
              { label: 'Careers & Opportunities', id: 'careers' },
              { label: 'About Our Trust', id: 'about' },
              { label: 'Volunteer Opportunity', id: 'volunteer' },
              { label: 'Donate / Support Cause', id: 'donate' }
            ].map((link, idx) => (
              <li key={idx}>
                <button 
                  onClick={() => setActivePage(link.id)}
                  className={`hover:text-white transition-colors cursor-pointer text-left block w-full ${
                    highContrast ? 'underline' : ''
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Headquarters & Contact Details */}
        <div className="space-y-6">
          <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider border-l-2 border-gold pl-3">
            Headquarters
          </h3>
          <ul className="space-y-4 text-sm font-sans text-slate-400">
            <li className="flex gap-3 items-start">
              <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
              <span>
                #37, First Floor, Pride Icon, Gokul Road, Hubballi – 580030, Karnataka, India
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={16} className="text-gold shrink-0" />
              <a href="tel:+917676376221" className="hover:text-white transition-colors font-mono">
                +91 76763 76221
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={16} className="text-gold shrink-0" />
              <a href="mailto:contact@raitamitrasocialtrust.org" className="hover:text-white transition-colors font-mono">
                contact@raitamitrasocialtrust.org
              </a>
            </li>
          </ul>

          {/* Social Links */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs uppercase font-bold text-slate-400 font-mono tracking-wider">Connect Globally</h4>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: 'Facebook', url: '#' },
                { icon: Instagram, label: 'Instagram', url: '#' },
                { icon: Linkedin, label: 'LinkedIn', url: '#' },
                { icon: Youtube, label: 'YouTube', url: '#' }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.url}
                  className={`p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-all ${
                    highContrast ? 'border border-white hover:bg-white hover:text-black' : ''
                  }`}
                  aria-label={`Raita Mitra on ${social.label}`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CSR Newsletter Sign Up */}
        <div className="space-y-6">
          <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider border-l-2 border-gold pl-3">
            CSR Newsletter
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Receive our quarterly geo-tagged impact logs, audited summaries, and rural development insights directly.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3">
            <div>
              <label htmlFor="newsletter-name" className="sr-only">Full Name</label>
              <input 
                id="newsletter-name"
                type="text"
                placeholder="Full Name / Company Name"
                value={newsName}
                onChange={(e) => setNewsName(e.target.value)}
                className={`w-full px-4 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-forest ${
                  highContrast ? 'bg-black border border-white text-white' : 'bg-slate-900 border-slate-800 text-white'
                }`}
              />
            </div>
            <div className="flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">Corporate Email</label>
              <input 
                id="newsletter-email"
                type="email"
                placeholder="Corporate Email"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                className={`flex-1 px-4 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-forest ${
                  highContrast ? 'bg-black border border-white text-white' : 'bg-slate-900 border-slate-800 text-white'
                }`}
              />
              <button 
                type="submit"
                className={`p-2.5 rounded-xl cursor-pointer flex items-center justify-center transition-all ${
                  highContrast ? 'bg-white text-black' : 'bg-gold hover:bg-gold-light text-white'
                }`}
                aria-label="Subscribe to newsletter"
              >
                <Send size={15} />
              </button>
            </div>

            {error && <p className="text-xs text-rose-400 font-medium font-mono">{error}</p>}
            
            {subscribed && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-start gap-2 animate-fade-in">
                <CheckCircle size={15} className="shrink-0 mt-0.5" />
                <p className="text-xs font-semibold leading-tight">
                  Thank you! Subscription successful.
                </p>
              </div>
            )}
          </form>

          {/* Compliance Exemption Notice */}
          <p className="text-[10px] text-slate-500 leading-normal font-mono pt-2">
            Donations are 100% tax-exempt under Sec 80G of Income Tax Act 1961 (Govt of India). NGO registered with NITI Aayog & Ministry of Corporate Affairs.
          </p>
        </div>

      </div>

      {/* Under-Footer Copyright */}
      <div className={`max-w-7xl mx-auto mt-16 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500 ${
        highContrast ? 'border-white text-slate-400' : 'border-slate-900'
      }`}>
        <p>© 2021-{new Date().getFullYear()} Raita Mitra Social Trust (R). All Rights Reserved.</p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
          <button onClick={() => setActivePage('donor-portal')} className="hover:underline cursor-pointer font-bold text-amber-500">Donor Portal</button>
          <span>•</span>
          <button onClick={() => setActivePage('partner-portal')} className="hover:underline cursor-pointer font-bold text-emerald-500">Partner Portal</button>
          <span>•</span>
          <button onClick={() => setActivePage('admin-dashboard')} className="hover:underline cursor-pointer font-bold text-rose-500">Admin Dashboard</button>
          <span>•</span>
          <button onClick={() => setActivePage('compliance')} className="hover:underline cursor-pointer">Compliance</button>
          <span>•</span>
          <button onClick={() => setActivePage('transparency')} className="hover:underline cursor-pointer">Annual Reports</button>
          <span>•</span>
          <button onClick={() => setActivePage('privacy')} className="hover:underline cursor-pointer">Privacy Policy</button>
          <span>•</span>
          <button onClick={() => setActivePage('terms')} className="hover:underline cursor-pointer">Terms &amp; Conditions</button>
          <span>•</span>
          <button onClick={() => setActivePage('refund')} className="hover:underline cursor-pointer">Refund Policy</button>
          <span>•</span>
          <button onClick={() => setActivePage('cookies')} className="hover:underline cursor-pointer">Cookie Policy</button>
          <span>•</span>
          <button onClick={() => setActivePage('notfound')} className="hover:underline cursor-pointer">404 Error Page</button>
          <span>•</span>
          <button onClick={() => setActivePage('search-results')} className="hover:underline cursor-pointer">Global Search</button>
        </div>
      </div>
    </footer>
  );
}
