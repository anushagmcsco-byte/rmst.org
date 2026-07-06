import React, { useState } from 'react';
import { MapPin, Users, Sprout, ArrowRight, BookOpen, ShieldCheck, Award } from 'lucide-react';

interface DistrictData {
  id: string;
  name: string;
  farmers: number;
  womenSHGs: number;
  aiClassrooms: number;
  investment: string;
  primaryFocus: string;
  narrative: string;
}

const DISTRICTS_DATA: Record<string, DistrictData> = {
  dharwad: {
    id: 'dharwad',
    name: 'Dharwad',
    farmers: 1840,
    womenSHGs: 32,
    aiClassrooms: 12,
    investment: '₹42.5 Lakhs',
    primaryFocus: 'Agri-Tech & STEM Education',
    narrative: 'As the headquarters region, Dharwad hosts our central vermicompost innovation clusters, direct linkage hubs for market pricing, and smart digital labs in rural government schools.'
  },
  belagavi: {
    id: 'belagavi',
    name: 'Belagavi',
    farmers: 1250,
    womenSHGs: 24,
    aiClassrooms: 6,
    investment: '₹28.0 Lakhs',
    primaryFocus: 'Organic Transition & Watersheds',
    narrative: 'Focusing on heavy soil regeneration and community watershed tanks. Farmers have successfully reduced synthetic fertilizer dependencies by 40% through organic seed banks.'
  },
  bagalkot: {
    id: 'bagalkot',
    name: 'Bagalkot',
    farmers: 920,
    womenSHGs: 18,
    aiClassrooms: 4,
    investment: '₹19.5 Lakhs',
    primaryFocus: 'Solar Drip Irrigation Grid',
    narrative: 'In dry terrain, we engineered community-owned, solar-powered drip networks, ensuring year-round stable crop cycles and reducing high-voltage pump grid accidents.'
  },
  gadag: {
    id: 'gadag',
    name: 'Gadag',
    farmers: 710,
    womenSHGs: 15,
    aiClassrooms: 3,
    investment: '₹14.2 Lakhs',
    primaryFocus: 'Agro-Forestry & Soil Testing',
    narrative: 'Implementing precision dry-land horticulture to prevent desertification. Mobile soil testing labs provide micro-nutrient maps directly to smallholder farmers.'
  },
  haveri: {
    id: 'haveri',
    name: 'Haveri',
    farmers: 850,
    womenSHGs: 20,
    aiClassrooms: 5,
    investment: '₹18.8 Lakhs',
    primaryFocus: 'Women SHG Micro-Cooperatives',
    narrative: 'Empowering women-led millet processing micro-enterprises to retain value within villages, supported by interest-free micro-finance linkages.'
  },
  koppal: {
    id: 'koppal',
    name: 'Koppal',
    farmers: 650,
    womenSHGs: 12,
    aiClassrooms: 2,
    investment: '₹11.0 Lakhs',
    primaryFocus: 'Climate Resilient Seed Preservation',
    narrative: 'Nurturing climate-hardy native crop seed bank libraries, helping dryland communities navigate erratic monsoons with traditional, low-water millets.'
  }
};

interface KarnatakaImpactMapProps {
  highContrast: boolean;
}

export default function KarnatakaImpactMap({ highContrast }: KarnatakaImpactMapProps) {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('dharwad');
  const active = DISTRICTS_DATA[selectedDistrict] || DISTRICTS_DATA.dharwad;

  return (
    <div className={`p-6 md:p-10 rounded-3xl border text-left ${
      highContrast ? 'bg-black border-white text-white' : 'bg-white border-slate-100 shadow-soft-elevation'
    }`} id="karnataka-impact-map-container">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Side: Dynamic Symmetrical District Map Visualizer (5 columns) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
          <div className="text-center lg:text-left w-full">
            <span className="text-[10px] font-mono uppercase bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-md font-bold inline-block">
              Geographical Footprint
            </span>
            <h3 className="font-display font-extrabold text-xl md:text-2xl text-slate-800 dark:text-white mt-1.5">
              Northern Karnataka Focus
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Interactive region locator. Hover or tap a district to load metrics.
            </p>
          </div>

          {/* Interactive Custom SVG representing North Karnataka District Clusters */}
          <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center p-2 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
            <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Belagavi - Top-Left */}
              <path
                d="M 15 35 Q 28 20 40 30 L 32 48 L 18 42 Z"
                className={`transition-all duration-200 cursor-pointer stroke-[1.2] ${
                  selectedDistrict === 'belagavi'
                    ? 'fill-forest text-white'
                    : 'fill-slate-200 dark:fill-slate-800 hover:fill-emerald-100 dark:hover:fill-emerald-900/30'
                }`}
                stroke={highContrast ? '#FFFFFF' : '#94A3B8'}
                onClick={() => setSelectedDistrict('belagavi')}
              />
              <text x="23" y="38" className="text-[5px] font-bold fill-slate-500 pointer-events-none font-sans uppercase">Belagavi</text>

              {/* Bagalkot - Mid-North */}
              <path
                d="M 40 30 Q 52 24 64 34 L 54 48 L 32 48 Z"
                className={`transition-all duration-200 cursor-pointer stroke-[1.2] ${
                  selectedDistrict === 'bagalkot'
                    ? 'fill-forest text-white'
                    : 'fill-slate-200 dark:fill-slate-800 hover:fill-emerald-100 dark:hover:fill-emerald-900/30'
                }`}
                stroke={highContrast ? '#FFFFFF' : '#94A3B8'}
                onClick={() => setSelectedDistrict('bagalkot')}
              />
              <text x="44" y="38" className="text-[5px] font-bold fill-slate-500 pointer-events-none font-sans uppercase">Bagalkot</text>

              {/* Dharwad - Central Left */}
              <path
                d="M 18 42 L 32 48 L 30 64 L 14 60 Z"
                className={`transition-all duration-200 cursor-pointer stroke-[1.2] ${
                  selectedDistrict === 'dharwad'
                    ? 'fill-forest text-white'
                    : 'fill-slate-200 dark:fill-slate-800 hover:fill-emerald-100 dark:hover:fill-emerald-900/30'
                }`}
                stroke={highContrast ? '#FFFFFF' : '#94A3B8'}
                onClick={() => setSelectedDistrict('dharwad')}
              />
              <text x="20" y="54" className="text-[5px] font-bold fill-slate-500 pointer-events-none font-sans uppercase">Dharwad</text>

              {/* Gadag - Central Mid */}
              <path
                d="M 32 48 L 54 48 L 52 64 L 30 64 Z"
                className={`transition-all duration-200 cursor-pointer stroke-[1.2] ${
                  selectedDistrict === 'gadag'
                    ? 'fill-forest text-white'
                    : 'fill-slate-200 dark:fill-slate-800 hover:fill-emerald-100 dark:hover:fill-emerald-900/30'
                }`}
                stroke={highContrast ? '#FFFFFF' : '#94A3B8'}
                onClick={() => setSelectedDistrict('gadag')}
              />
              <text x="38" y="57" className="text-[5px] font-bold fill-slate-500 pointer-events-none font-sans uppercase">Gadag</text>

              {/* Koppal - East */}
              <path
                d="M 54 48 Q 66 40 76 54 L 64 74 L 52 64 Z"
                className={`transition-all duration-200 cursor-pointer stroke-[1.2] ${
                  selectedDistrict === 'koppal'
                    ? 'fill-forest text-white'
                    : 'fill-slate-200 dark:fill-slate-800 hover:fill-emerald-100 dark:hover:fill-emerald-900/30'
                }`}
                stroke={highContrast ? '#FFFFFF' : '#94A3B8'}
                onClick={() => setSelectedDistrict('koppal')}
              />
              <text x="60" y="59" className="text-[5px] font-bold fill-slate-500 pointer-events-none font-sans uppercase">Koppal</text>

              {/* Haveri - Bottom-Left */}
              <path
                d="M 30 64 L 52 64 L 46 86 L 24 78 Z"
                className={`transition-all duration-200 cursor-pointer stroke-[1.2] ${
                  selectedDistrict === 'haveri'
                    ? 'fill-forest text-white'
                    : 'fill-slate-200 dark:fill-slate-800 hover:fill-emerald-100 dark:hover:fill-emerald-900/30'
                }`}
                stroke={highContrast ? '#FFFFFF' : '#94A3B8'}
                onClick={() => setSelectedDistrict('haveri')}
              />
              <text x="34" y="74" className="text-[5px] font-bold fill-slate-500 pointer-events-none font-sans uppercase">Haveri</text>
            </svg>

            {/* Pulsing indicator overlay for active district */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <span className="text-[10px] uppercase font-mono font-bold bg-forest text-white px-1.5 py-0.5 rounded shadow">
                {active.name} Selected
              </span>
            </div>
          </div>

          {/* Symmetrical district toggles for robust layout redundancy */}
          <div className="grid grid-cols-3 gap-2 w-full">
            {Object.values(DISTRICTS_DATA).map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDistrict(d.id)}
                className={`px-2 py-1.5 text-[10px] font-bold rounded-xl border text-center transition-all cursor-pointer truncate ${
                  selectedDistrict === d.id
                    ? (highContrast ? 'bg-white text-black border-white' : 'bg-forest text-white border-forest')
                    : 'bg-transparent border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: High-fidelity Impact Details Card (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main header block */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="flex justify-between items-center">
              <h4 className="font-display font-extrabold text-2xl text-slate-800 dark:text-white flex items-center gap-2">
                <MapPin className="text-gold" size={22} />
                District: {active.name}
              </h4>
              <span className={`text-xs uppercase font-mono tracking-wider font-extrabold px-3 py-1 rounded-full ${
                highContrast ? 'bg-white text-black' : 'bg-gold/10 text-gold-dark border border-gold/20'
              }`}>
                {active.primaryFocus}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-500 mt-2 font-sans leading-relaxed">
              {active.narrative}
            </p>
          </div>

          {/* Metrics Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
              <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 inline-block mb-2">
                <Sprout size={16} />
              </div>
              <p className="text-[10px] font-mono text-slate-400 uppercase leading-none">Farmers</p>
              <p className="text-lg font-extrabold text-slate-800 dark:text-white mt-1 font-mono">{active.farmers}+</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
              <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 inline-block mb-2">
                <Users size={16} />
              </div>
              <p className="text-[10px] font-mono text-slate-400 uppercase leading-none">SHGs Formed</p>
              <p className="text-lg font-extrabold text-slate-800 dark:text-white mt-1 font-mono">{active.womenSHGs}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
              <div className="p-1.5 rounded-lg bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-400 inline-block mb-2">
                <BookOpen size={16} />
              </div>
              <p className="text-[10px] font-mono text-slate-400 uppercase leading-none">STEM Labs</p>
              <p className="text-lg font-extrabold text-slate-800 dark:text-white mt-1 font-mono">{active.aiClassrooms}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
              <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 inline-block mb-2">
                <Award size={16} />
              </div>
              <p className="text-[10px] font-mono text-slate-400 uppercase leading-none">ESG Allocation</p>
              <p className="text-lg font-extrabold text-slate-800 dark:text-white mt-1 font-mono">{active.investment}</p>
            </div>

          </div>

          {/* Trust Validation Quote/Fact */}
          <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 flex gap-3.5 items-start">
            <ShieldCheck className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" size={20} />
            <div>
              <h5 className="text-xs font-bold text-slate-800 dark:text-white">Third-Party Audited Milestones</h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                All beneficiary databases are matched with central NGO Darpan entries and verified with unique Aadhaar card linkage protocols to prevent double-funding overlap.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
