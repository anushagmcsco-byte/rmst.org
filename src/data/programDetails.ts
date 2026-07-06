export interface MetricDetail {
  value: string;
  label: string;
}

export interface ProblemStat {
  metric: string;
  label: string;
  description: string;
}

export interface SDGAlignment {
  goalNumber: number;
  title: string;
  description: string;
  color: string;
}

export interface BeneficiaryStory {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  narrative: string;
  before: string;
  after: string;
  image: string;
  videoUrl?: string;
}

export interface ChartPoint {
  name: string;
  value: number;
  secondary?: number;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface ProgramActivity {
  title: string;
  description: string;
  metric: string;
}

export interface ProgramEvent {
  title: string;
  date: string;
  location: string;
  status: 'Upcoming' | 'Completed';
}

export interface DownloadItem {
  title: string;
  type: 'Brochure' | 'Impact Report' | 'Case Study' | 'Presentation' | 'Training Material';
  size: string;
}

export interface PartnerItem {
  name: string;
  logoText: string;
  type: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface DetailedProgramData {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  mission: string;
  heroVideoUrl: string; // Simulated or embed
  heroFallbackImage: string;
  quickImpactMetrics: MetricDetail[];
  aboutDescription: string;
  aboutHighlights: string[];
  aboutImage: string;
  problemStatement: {
    text: string;
    stats: ProblemStat[];
    researchData: string;
  };
  solutionSteps: {
    phase: string;
    title: string;
    description: string;
  }[];
  sdgs: SDGAlignment[];
  beneficiaryStories: BeneficiaryStory[];
  beforeAfter: {
    beforeImage: string;
    afterImage: string;
    beforeLabel: string;
    afterLabel: string;
  };
  photoGallery: string[];
  videoGallery: {
    title: string;
    thumbnail: string;
    videoUrl: string;
    duration: string;
  }[];
  dashboard: {
    beneficiaryGrowth: ChartPoint[];
    districtCoverage: ChartPoint[];
    yoyProgress: ChartPoint[];
    genderRatio: { name: string; value: number; color: string }[];
    ageDistribution: { name: string; value: number }[];
  };
  timeline: TimelineEvent[];
  activities: ProgramActivity[];
  events: ProgramEvent[];
  downloads: DownloadItem[];
  partners: PartnerItem[];
  testimonials: {
    name: string;
    designation: string;
    organization: string;
    quote: string;
    image: string;
  }[];
  faqs: FAQItem[];
  relatedSlugs: string[];
}

export const programDetails: Record<string, DetailedProgramData> = {
  'sustainable-agriculture': {
    id: 'agriculture',
    slug: 'sustainable-agriculture',
    title: 'Sustainable Agriculture & Farmer Empowerment',
    tagline: 'Securing farmer livelihoods through soil rejuvenation, solar-powered micro-irrigation, and robust market links.',
    mission: 'To transition 10,000+ marginal farmers in dryland regions of Northern Karnataka from expensive chemical inputs to climate-resilient, regenerative agriculture by 2028.',
    heroVideoUrl: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&q=80&w=1200',
    heroFallbackImage: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&q=80&w=1200',
    quickImpactMetrics: [
      { value: '5,000+', label: 'Beneficiaries Reached' },
      { value: '45+', label: 'Villages Covered' },
      { value: '3', label: 'Districts Covered' },
      { value: '18', label: 'Projects Executed' }
    ],
    aboutDescription: 'The Sustainable Agriculture initiative represents Raita Mitra’s foundational pillar, directly addressing agrarian distress in Dharwad, Haveri, and Gadag. By coupling traditional biological input formulations (like Jeevamrutha and Neemastra) with scientific soil profiling, we help marginal growers reclaim exhausted clay soils, slash synthetic fertilizer expenses by up to 35%, and secure high-value organic certifications.',
    aboutHighlights: [
      'Establishing 12 decentralized Community Bio-Input Resource Centers run by local rural cooperatives.',
      'Deploying solar-powered localized drip and sprinkler systems to optimize water use during dry spells.',
      'Forming and operationalizing 4 registered Farmer Producer Organizations (FPOs) for collective market negotiation.',
      'Integrating mobile Soil Testing Laboratories that deliver localized digital NPK recommendations in Kannada.'
    ],
    aboutImage: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&q=80&w=800',
    problemStatement: {
      text: 'Marginal farmers in drylands of Northern Karnataka face a dual crisis: rapidly degrading soil carbon levels caused by years of intensive chemical monoculture, and highly erratic monsoon rainfall models. High retail costs for commercial fertilizers often force smallholders into heavy informal debt cycles before harvest begins.',
      stats: [
        { metric: '0.35%', label: 'Soil Organic Carbon', description: 'Critical organic depletion levels in drylands compared to the ideal 0.8% - 1% threshold.' },
        { metric: '42%', label: 'Input Cost Burden', description: 'Portion of seasonal agricultural loans consumed solely by commercial chemical inputs.' },
        { metric: '1.2m', label: 'Water Table Drop', description: 'Average annual drop in deep borewell reserves due to flood irrigation practices.' }
      ],
      researchData: 'Ministry of Agriculture and Farmers Welfare (AICRPDA) Dryland Survey Reports • NABARD Rural Sector Assessment 2024'
    },
    solutionSteps: [
      { phase: 'Phase 1', title: 'Community Assessment', description: 'Identifying soil-depleted clusters, mapping current groundwater tables, and registering smallholders.' },
      { phase: 'Phase 2', title: 'Capacity Building', description: 'Intensive hands-on workshops on ZBNF formulation techniques, soil health profiling, and seed preservation.' },
      { phase: 'Phase 3', title: 'Implementation', description: 'Setting up custom bio-resource points and deploying solar drip pipelines in collaborative farming grids.' },
      { phase: 'Phase 4', title: 'Monitoring & Traceability', description: 'Utilizing geotagged photo reports and mobile apps to track soil carbon recovery progress over successive seasons.' },
      { phase: 'Phase 5', title: 'Impact Evaluation', description: 'Conducting formal NPK chemical lab evaluations, calculating household net cash flows, and refining input recipe mixtures.' },
      { phase: 'Phase 6', title: 'Scaling', description: 'Pooling farmers into FPOs, streamlining organic bulk supply lines, and certifying produce for urban organic networks.' }
    ],
    sdgs: [
      { goalNumber: 1, title: 'No Poverty', description: 'Lifting marginal farming households out of debt by boosting net income by 40% through organic cost-cutting.', color: 'bg-rose-600 text-white' },
      { goalNumber: 2, title: 'Zero Hunger', description: 'Securing community food reserves and promoting ecological agriculture that stands resilient against heat waves.', color: 'bg-amber-600 text-white' },
      { goalNumber: 12, title: 'Responsible Consumption', description: 'Reducing toxic synthetic runoff into drinking water sources through closed-loop bio-inputs.', color: 'bg-yellow-600 text-white' },
      { goalNumber: 13, title: 'Climate Action', description: 'Rebuilding soil organic matter which traps carbon and retains soil moisture during prolonged droughts.', color: 'bg-emerald-800 text-white' }
    ],
    beneficiaryStories: [
      {
        id: 'story-basappa',
        name: 'Basappa Gowda',
        role: 'Marginal Farmer',
        location: 'Sulla Village, Dharwad',
        quote: 'My inputs costs fell from ₹24,000 to ₹7,000 per acre. My soil is soft again, and my cotton crops withstood 25 days of intense heat without drying up.',
        narrative: 'Basappa was buried in informal credit debts due to failed borewells and skyrocketing commercial pesticide bills. He was on the verge of migrating to Hubballi for construction labor until joining Raita Mitra’s natural farming collective.',
        before: 'Heavy debt, high chemical dependency, depleted yields from dry clay soil.',
        after: 'Debt-free, 100% natural inputs, stabilized annual yields, secure organic cotton premium pricing.',
        image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400'
      }
    ],
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
      afterImage: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&q=80&w=800',
      beforeLabel: 'Depleted Chemical monoculture',
      afterLabel: 'Lush Multi-Crop Organic Farm'
    },
    photoGallery: [
      'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1563514223727-6fc090952783?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600'
    ],
    videoGallery: [
      { title: 'Reclaiming Black Clay Soils', thumbnail: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&q=80&w=400', videoUrl: 'https://www.youtube.com/embed/6_rreEfeBAs', duration: '4:20' },
      { title: 'Decentralized Bio-Input Centers', thumbnail: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&q=80&w=400', videoUrl: 'https://www.youtube.com/embed/SshmXqO-2v4', duration: '5:45' }
    ],
    dashboard: {
      beneficiaryGrowth: [
        { name: '2022', value: 1200 },
        { name: '2023', value: 2100 },
        { name: '2024', value: 3400 },
        { name: '2025', value: 4500 },
        { name: '2026', value: 5000 }
      ],
      districtCoverage: [
        { name: 'Dharwad', value: 25 },
        { name: 'Haveri', value: 12 },
        { name: 'Gadag', value: 8 }
      ],
      yoyProgress: [
        { name: 'Bio-Inputs', value: 80, secondary: 90 },
        { name: 'Drip Grids', value: 65, secondary: 85 },
        { name: 'FPO sales', value: 40, secondary: 75 }
      ],
      genderRatio: [
        { name: 'Male Farmers', value: 68, color: '#047857' },
        { name: 'Female Farmers', value: 32, color: '#f59e0b' }
      ],
      ageDistribution: [
        { name: '18-35 yrs', value: 24 },
        { name: '36-50 yrs', value: 52 },
        { name: '51+ yrs', value: 24 }
      ]
    },
    timeline: [
      { year: '2022', title: 'Baseline Launch', description: 'Commenced initial soil auditing and registered 1,200 marginal growers across Sulla taluk.' },
      { year: '2023', title: 'Solar Drip Grids', description: 'Installed 45 solar-powered decentralized micro-irrigation systems supporting community lands.' },
      { year: '2024', title: 'FPO Incorporation', description: 'Formed and registered 3 Farmer Producer Organizations directly bypassing middleman trade networks.' },
      { year: '2025', title: 'Carbon Credit Audit', description: 'Assessed first verified soil organic carbon increase metrics, certifying 3,500+ acres as regenerative.' }
    ],
    activities: [
      { title: 'Decentralized Bio-resource Stations', description: 'Setting up cooperative tanks for formulating concentrated natural nutrients.', metric: '12 active stations' },
      { title: 'Interactive Soil Diagnostics', description: 'Providing portable NPK colorimetric testing kits to village lead volunteers.', metric: '3,800 tests run' },
      { title: 'Regenerative Drip Infrastructure', description: 'Installing low-cost gravity-fed drip rings around orchard systems.', metric: '1,200 acres irrigated' }
    ],
    events: [
      { title: 'Summer Natural Agriculture Workshop', date: 'Jul 24, 2026', location: 'Dharwad Krishi Mela Grounds', status: 'Upcoming' },
      { title: 'FPO Board & Price Discovery Conclave', date: 'Aug 12, 2026', location: 'Hubballi Office Center', status: 'Upcoming' }
    ],
    downloads: [
      { title: 'Zero-Budget Natural Inputs Recipe Book (Kannada)', type: 'Training Material', size: '4.8 MB' },
      { title: 'Annual Regenerative Soil Audit Report 2025', type: 'Impact Report', size: '3.2 MB' },
      { title: 'Sustainable FPO Scalability Blueprint', type: 'Case Study', size: '1.9 MB' }
    ],
    partners: [
      { name: 'NABARD', logoText: 'NABARD Foundation', type: 'Government' },
      { name: 'Deshpande Foundation', logoText: 'Deshpande Sandbox', type: 'CSR Partner' },
      { name: 'Tata Trusts', logoText: 'Tata Trusts Agri', type: 'Foundation' }
    ],
    testimonials: [
      {
        name: 'Dr. Girish Kulkarni',
        designation: 'Senior Soil Agronomist',
        organization: 'UAS Dharwad',
        quote: 'Raita Mitra is executing what text books have always advocated: scalable biological inputs. Rebuilding organic soil carbon directly translates to climate protection.',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200'
      }
    ],
    faqs: [
      { question: 'What is Zero-Budget Natural Farming (ZBNF)?', answer: 'It is a chemical-free agricultural method that utilizes cow dung and urine based formulations (Jeevamrutha, Bijamrutha) and local soil cultures to cultivate crops, reducing dependency on commercial inputs.' },
      { question: 'How does the Trust fund and monitor these geolocated interventions?', answer: 'We register each farm on a mobile system with unique geocoordinates. Before/after soil tests, yield records, and farm photos are compiled for corporate CSR partners to review online.' }
    ],
    relatedSlugs: ['climate-action', 'rural-entrepreneurship']
  },
  'women-empowerment': {
    id: 'women',
    slug: 'women-empowerment',
    title: 'Women Empowerment & Livelihoods',
    tagline: 'Fostering financial independence through micro-enterprises, dairy husbandry, and skill training.',
    mission: 'To financially secure 3,000+ rural women by organizing active self-help groups, building secondary agricultural value streams, and enabling digital bookkeeping systems by 2028.',
    heroVideoUrl: 'https://images.unsplash.com/photo-1508847154043-be12a62861c1?auto=format&fit=crop&q=80&w=1200',
    heroFallbackImage: 'https://images.unsplash.com/photo-1508847154043-be12a62861c1?auto=format&fit=crop&q=80&w=1200',
    quickImpactMetrics: [
      { value: '1,500+', label: 'Women Empowered' },
      { value: '32+', label: 'Villages Covered' },
      { value: '2', label: 'Districts Covered' },
      { value: '12', label: 'Projects Executed' }
    ],
    aboutDescription: 'The Women Empowerment & Livelihoods division transforms rural women into proactive entrepreneurs and community leaders. By establishing community-managed revolving funds and micro-credit linkages, Raita Mitra supports specialized training in scientific dairy farming, backyard poultry, custom tailoring, and organic compost sales, building strong income buffers outside of seasonal rainfall schedules.',
    aboutHighlights: [
      'Establishing 110 active Self-Help Groups (SHGs) with standardized digital ledger accounting tools.',
      'Constructing collaborative dairy collection kiosks equipped with automated milk quality analyzers.',
      'Sponsoring high-yield animal husbandry training alongside subsidized veterinary medical care.',
      'Incubating regional handicraft and value-added food processing collectives run by women groups.'
    ],
    aboutImage: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=800',
    problemStatement: {
      text: 'Rural women in Northern Karnataka bear the brunt of dryland farming stress. While contributing major field hours, they rarely own land titles or capital, leaving them financially vulnerable and isolated from commercial banking services. Cultural barriers also limit their access to job markets.',
      stats: [
        { metric: '8%', label: 'Capital Ownership', description: 'Rural women who have direct, independent control of financial credit or bank accounts.' },
        { metric: '₹2,500', label: 'Baseline Cash-flow', description: 'Average monthly personal income of rural housewives prior to forming credit links.' },
        { metric: '65%', label: 'Under-employment', description: 'Portion of rural women relying entirely on highly unstable seasonal farm labor contracts.' }
      ],
      researchData: 'Ministry of Rural Development State SHG Statistics • Karnataka State Women Development Corporation Report'
    },
    solutionSteps: [
      { phase: 'Phase 1', title: 'Community Assessment', description: 'Conducting focus group discussions, identifying vulnerable households, and forming mutual-trust SHGs.' },
      { phase: 'Phase 2', title: 'Capacity Building', description: 'Standard financial literacy training, digital bookkeeping courses, and basic banking instruction.' },
      { phase: 'Phase 3', title: 'Implementation', description: 'Distributing micro-grants, establishing community feed centers, and registering dairy collectives.' },
      { phase: 'Phase 4', title: 'Monitoring & Traceability', description: 'Logging SHG loan repayment ratios, tracking animal immunization records, and updating digital ledgers.' },
      { phase: 'Phase 5', title: 'Impact Evaluation', description: 'Measuring shifts in average household nutrition expenditures, schooling rates for daughters, and individual cash-flows.' },
      { phase: 'Phase 6', title: 'Scaling', description: 'Linking certified local cooperatives with regional bulk buyers and state-sponsored microfinance programs.' }
    ],
    sdgs: [
      { goalNumber: 5, title: 'Gender Equality', description: 'Ensuring women gain full financial autonomy, equal resource access, and public leadership roles within local governance.', color: 'bg-orange-500 text-white' },
      { goalNumber: 8, title: 'Decent Work', description: 'Incubating sustainable micro-enterprises that create safe, year-round employment in rural areas.', color: 'bg-red-800 text-white' },
      { goalNumber: 10, title: 'Reduced Inequalities', description: 'Directly bridging the credit gap for marginalized rural families through community microfinance pools.', color: 'bg-purple-600 text-white' }
    ],
    beneficiaryStories: [
      {
        id: 'story-savitri',
        name: 'Savitri Pujar',
        role: 'Cooperative Leader',
        location: 'Hebsur Village, Dharwad',
        quote: 'With a credit of ₹25,000, I bought two cows. Today, I earn a stable profit of ₹9,000 every month and can afford my daughter’s high-school college books.',
        narrative: 'Savitri was a daily wage laborer earning unstable pay. By joining Raita Mitra’s "Pragati" SHG, she gained financial skills and secured a micro-loan to purchase livestock, ultimately establishing a cooperative milk collection unit.',
        before: 'Highly unstable casual field labor, heavy dependence on husband’s earnings, zero savings.',
        after: 'Cooperative board member, owning 3 healthy milch cows, secure monthly income, independent bank account.',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'
      }
    ],
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
      afterImage: 'https://images.unsplash.com/photo-1508847154043-be12a62861c1?auto=format&fit=crop&q=80&w=800',
      beforeLabel: 'Vulnerable Daily Casual Labor',
      afterLabel: 'Proud Dairy Business Entrepreneur'
    },
    photoGallery: [
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1508847154043-be12a62861c1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600'
    ],
    videoGallery: [
      { title: 'Women-Led Cooperative Dairy Models', thumbnail: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=400', videoUrl: 'https://www.youtube.com/embed/O-Lh9ObyY0k', duration: '5:10' },
      { title: 'SHG Microfinance & Digital Ledger Training', thumbnail: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=400', videoUrl: 'https://www.youtube.com/embed/RAnfB9gA2gU', duration: '3:45' }
    ],
    dashboard: {
      beneficiaryGrowth: [
        { name: '2022', value: 350 },
        { name: '2023', value: 680 },
        { name: '2024', value: 1050 },
        { name: '2025', value: 1350 },
        { name: '2026', value: 1500 }
      ],
      districtCoverage: [
        { name: 'Dharwad', value: 18 },
        { name: 'Haveri', value: 14 }
      ],
      yoyProgress: [
        { name: 'Active SHGs', value: 40, secondary: 110 },
        { name: 'Micro-Businesses', value: 90, secondary: 280 },
        { name: 'Credit Disbursed', value: 15, secondary: 45 }
      ],
      genderRatio: [
        { name: 'Female Beneficiaries', value: 100, color: '#f59e0b' }
      ],
      ageDistribution: [
        { name: '18-30 yrs', value: 38 },
        { name: '31-45 yrs', value: 48 },
        { name: '46+ yrs', value: 14 }
      ]
    },
    timeline: [
      { year: '2022', title: 'SHG Mobilization', description: 'Registered and trained the first cluster of 30 women self-help groups in Hubballi rural.' },
      { year: '2023', title: 'Dairy Cattle Linkage', description: 'Connected certified groups with formal banking loans to procure highly productive milch cows.' },
      { year: '2024', title: 'Micro-Mills Program', description: 'Distributed 15 automated, solar-powered oil expellers and grain-grinding mills to community centers.' },
      { year: '2025', title: 'Regional Brand Launch', description: 'Established "Namma Mitra" collective branding, packing spices and cold-pressed oils for retail shops.' }
    ],
    activities: [
      { title: 'Animal Husbandry Advisory', description: 'Organizing routine veterinary camps, cattle feeds, and vaccination checks.', metric: '850+ cattle managed' },
      { title: 'Digital Ledger Software', description: 'Providing tablet-based accounting tools to village SHG cluster managers.', metric: '100% digital trace' },
      { title: 'Advanced Tailoring Units', description: 'Distributing computerized motor-driven sewing rigs for stitching retail uniforms.', metric: '140 women certified' }
    ],
    events: [
      { title: 'Regional Women Cooperative Fair', date: 'Jul 29, 2026', location: 'Hebsur Gram Panchayat Hall', status: 'Upcoming' },
      { title: 'Digital Bookkeeping Masterclass', date: 'Aug 04, 2026', location: 'Hubballi Training Center', status: 'Upcoming' }
    ],
    downloads: [
      { title: 'SHG Bookkeeping Ledger Guide (Kannada)', type: 'Training Material', size: '2.4 MB' },
      { title: 'Maternal Dairy and Cattle Care Best Practices', type: 'Training Material', size: '1.8 MB' },
      { title: 'Rural Microfinance Audit Sheet 2025', type: 'Impact Report', size: '1.2 MB' }
    ],
    partners: [
      { name: 'Karnataka Milk Federation', logoText: 'KMF Nandini', type: 'Government' },
      { name: 'SELCO Foundation', logoText: 'SELCO Solar Care', type: 'CSR Partner' },
      { name: 'SIDBI Bank', logoText: 'SIDBI Micro-Loans', type: 'Financial Link' }
    ],
    testimonials: [
      {
        name: 'Smt. Renuka Devi',
        designation: 'Director of Cooperatives',
        organization: 'Dharwad Women Union',
        quote: 'Giving women credit is the fastest shortcut to rural development. If a mother earns, she reinvests 90% of her funds back into her children’s health and education.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
      }
    ],
    faqs: [
      { question: 'What is a revolving fund?', answer: 'A community fund that continuously lends money to group members. As old loans are repaid, the funds are immediately lent out to other members, maximizing credit speed.' },
      { question: 'Are these self-help groups legally compliant?', answer: 'Yes, all our collectives are formally registered with regional cooperative authorities and hold audited bank accounts linked with national banks.' }
    ],
    relatedSlugs: ['rural-entrepreneurship', 'education-ai-skills']
  },
  'education-ai-skills': {
    id: 'education',
    slug: 'education-ai-skills',
    title: 'Education, Digital & AI Skills',
    tagline: 'Bridging the rural digital divide with computer literacy, STEM education, and AI foundations.',
    mission: 'To equip 5,000+ underserved rural children and youth with high-demand digital literacy, visual coding, and introductory AI skills to prepare them for the future workforce by 2028.',
    heroVideoUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=1200',
    heroFallbackImage: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=1200',
    quickImpactMetrics: [
      { value: '3,000+', label: 'Students Certified' },
      { value: '12', label: 'Schools Adopted' },
      { value: '3', label: 'Districts Covered' },
      { value: '15', label: 'Smart Labs Run' }
    ],
    aboutDescription: 'The Education, Digital & AI Skills Program bridges the massive technology gap separating rural government schools from modern urban institutions. By establishing state-of-the-art computer labs and developing localized, bilingual (English/Kannada) tech curricula, Raita Mitra ensures primary and secondary students master foundational typing, scratch visual block coding, basic Python programming, and practical AI applications (like automated agricultural sensors and weather API checks).',
    aboutHighlights: [
      'Establishing 12 permanent "Smart Digital Labs" in rural government schools.',
      'Deploying low-power solar-driven offline servers to access coding tools without grid outages.',
      'Conducting intensive coding and STEM masterclasses for local high-school graduates.',
      'Developing hands-on agricultural AI modules (e.g. soil moisture sensor code using Raspberry Pi).'
    ],
    aboutImage: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800',
    problemStatement: {
      text: 'Government schools in rural Karnataka lack functional computer infrastructure, internet connectivity, and skilled teachers. While urban youth leverage generative AI tools to advance, rural students complete secondary schooling without basic digital skills, locking them out of the modern digital economy.',
      stats: [
        { metric: '9%', label: 'Computer Literacy', description: 'Government school students in rural clusters who have ever used a personal computer or keyboard.' },
        { metric: '0', label: 'Bilingual Coding Material', description: 'State textbook libraries offering foundational programming or computer science materials translated in Kannada.' },
        { metric: '82%', label: 'Unskilled Graduation', description: 'High school graduates in villages who migrate into manual casual labor due to a total lack of technical skills.' }
      ],
      researchData: 'Annual Status of Education Report (ASER) Karnataka Assessment • NASSCOM Future Skills Foundation Survey 2024'
    },
    solutionSteps: [
      { phase: 'Phase 1', title: 'Needs Assessment', description: 'Selecting underfunded Government primary and secondary schools and designing solar-power storage backups.' },
      { phase: 'Phase 2', title: 'Infrastructure Setup', description: 'Shipping flat-screen systems, offline network routers, and STEM electronics learning kits.' },
      { phase: 'Phase 3', title: 'Teacher Training', description: 'Training local college graduates as permanent, paid technology instructors to ensure school sustainability.' },
      { phase: 'Phase 4', title: 'Curriculum Delivery', description: 'Bilingual (Kannada-English) lessons on file structures, Scratch animations, Python syntax, and basic logic.' },
      { phase: 'Phase 5', title: 'Impact Evaluation', description: 'Conducting standardized computer literacy exams, coding challenges, and tracking graduate employment.' },
      { phase: 'Phase 6', title: 'Scaling', description: 'Setting up advanced youth training centers that offer certifiable software courses to rural graduates.' }
    ],
    sdgs: [
      { goalNumber: 4, title: 'Quality Education', description: 'Providing cutting-edge, tech-forward education to girls and boys, eliminating the deep rural-urban knowledge divide.', color: 'bg-red-700 text-white' },
      { goalNumber: 8, title: 'Decent Work', description: 'Equipping rural youth with computer certifications that unlock high-value employment in software support, e-governance, and tech roles.', color: 'bg-red-800 text-white' },
      { goalNumber: 9, title: 'Industry & Innovation', description: 'Introducing students to advanced automation systems, smart sensors, and local artificial intelligence solutions.', color: 'bg-sky-600 text-white' }
    ],
    beneficiaryStories: [
      {
        id: 'story-kartik',
        name: 'Kartik Madar',
        role: 'High School Student',
        location: 'Shiraguppi Village, Dharwad',
        quote: 'I used to struggle with math, but when I learned to write Python code to calculate soil moisture ratios, it all made sense. Now I want to study computer science.',
        narrative: 'Kartik is the son of a sugarcane cutter. He had never seen a laptop until Raita Mitra installed a Smart Digital Lab in his government school. In just 12 months, he learned computer typing and basic visual coding blocks.',
        before: 'Zero keyboard experience, fear of tech devices, limited vocational prospects.',
        after: 'Consistently ranks #1 in regional school coding hackathons, can write basic Python conditional scripts.',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400'
      }
    ],
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
      afterImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
      beforeLabel: 'Standard Empty Blackboards',
      afterLabel: 'Modern Interactive Computer Lab'
    },
    photoGallery: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600'
    ],
    videoGallery: [
      { title: 'Coding Hackathon in Government Classrooms', thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400', videoUrl: 'https://www.youtube.com/embed/V6_03nN2r0k', duration: '4:15' },
      { title: 'Agrarian AI & Sensor Training with Raspberry Pi', thumbnail: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=400', videoUrl: 'https://www.youtube.com/embed/oG_pIomrD4U', duration: '6:12' }
    ],
    dashboard: {
      beneficiaryGrowth: [
        { name: '2022', value: 400 },
        { name: '2023', value: 1100 },
        { name: '2024', value: 1950 },
        { name: '2025', value: 2700 },
        { name: '2026', value: 3000 }
      ],
      districtCoverage: [
        { name: 'Dharwad', value: 8 },
        { name: 'Haveri', value: 3 },
        { name: 'Gadag', value: 1 }
      ],
      yoyProgress: [
        { name: 'Labs Setup', value: 3, secondary: 12 },
        { name: 'Certified Kids', value: 15, secondary: 40 },
        { name: 'STEM Kits', value: 10, secondary: 40 }
      ],
      genderRatio: [
        { name: 'Girls Enrolled', value: 52, color: '#ec4899' },
        { name: 'Boys Enrolled', value: 48, color: '#0ea5e9' }
      ],
      ageDistribution: [
        { name: '8-11 yrs', value: 45 },
        { name: '12-15 yrs', value: 40 },
        { name: '16-22 yrs', value: 15 }
      ]
    },
    timeline: [
      { year: '2022', title: 'Phase 1 Computer Lab Launch', description: 'Installed first set of 3 computer laboratories in rural government schools with offline servers.' },
      { year: '2023', title: 'Scratch Coding Syllabus', description: 'Introduced visual block coding (Scratch) into the daily schedules of 5th to 7th grades.' },
      { year: '2024', title: 'High School STEM Toolkits', description: 'Deployed 40 physical robotics and electronics learning kits with breadboards and microcontrollers.' },
      { year: '2025', title: 'AI & Sensor Prototyping', description: 'Students prototyped soil moisture sensor scripts connected to weather API databases.' }
    ],
    activities: [
      { title: 'Smart Digital Lab Management', description: 'Setting up computer nodes with solar backup rigs to run software offline.', metric: '12 labs active' },
      { title: 'Interactive STEM Workshops', description: 'Fostering mechanical thinking via DIY motor and gear-based electronics assembly.', metric: '80+ projects built' },
      { title: 'Certified Youth IT bootcamps', description: 'Weekend courses for local graduates covering database queries and web layouts.', metric: '850+ graduates trained' }
    ],
    events: [
      { title: 'Inter-School Robotics & Coding Exhibition', date: 'Aug 09, 2026', location: 'Dharwad Science Center Auditorium', status: 'Upcoming' },
      { title: 'Youth Software Skills & Resume Fair', date: 'Sep 02, 2026', location: 'Hubballi Civic Hall', status: 'Upcoming' }
    ],
    downloads: [
      { title: 'Bilingual Scratch Coding Curriculum (English-Kannada)', type: 'Training Material', size: '5.2 MB' },
      { title: 'Raspberry Pi Soil Sensor Python Code Snippets', type: 'Training Material', size: '1.4 MB' },
      { title: 'Annual Digital Skills Impact Evaluation Sheet 2025', type: 'Impact Report', size: '2.8 MB' }
    ],
    partners: [
      { name: 'Infosys Foundation', logoText: 'Infosys CSR', type: 'Corporate' },
      { name: 'Department of Public Instruction', logoText: 'Govt. of Karnataka', type: 'Government' },
      { name: 'Wipro Cares', logoText: 'Wipro Cares Education', type: 'Corporate' }
    ],
    testimonials: [
      {
        name: 'Smt. Shailaja Banashankari',
        designation: 'Headmistress',
        organization: 'GHP School Shiraguppi',
        quote: 'Before Raita Mitra, our computer lab was a locked storage room of dusty keyboards. Today, children skip lunch hours to write animated coding projects.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
      }
    ],
    faqs: [
      { question: 'Do the schools require stable electricity and internet?', answer: 'No. Raita Mitra installs low-power solar backups for the labs, and all coding software and lessons are designed to run completely offline from local central servers.' },
      { question: 'How can our company sponsor a school lab?', answer: 'Through corporate CSR alignments, we set up full smart labs in your chosen regional school, managing the instructor hiring and providing quarterly audits.' }
    ],
    relatedSlugs: ['women-empowerment', 'rural-entrepreneurship']
  },
  'health-nutrition': {
    id: 'health',
    slug: 'health-nutrition',
    title: 'Health, Nutrition & Community Well-being',
    tagline: 'Eradicating rural malnutrition and anemia through preventive health services and balanced diets.',
    mission: 'To systematically reduce severe anemia rates by 50% among rural teenage girls and pregnant women across 50 vulnerable villages in Karnataka by 2028.',
    heroVideoUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200',
    heroFallbackImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200',
    quickImpactMetrics: [
      { value: '4,500+', label: 'Mothers & Kids Reached' },
      { value: '35', label: ' villages Covered' },
      { value: '2', label: 'Districts Covered' },
      { value: '35', label: 'Medical Camps Run' }
    ],
    aboutDescription: 'The Health, Nutrition & Community Well-being initiative addresses deep-rooted malnutrition, vitamin deficiencies, and maternal anemia that restrict rural growth. By coordinating diagnostic screening camps, supplying specialized nutrient packs (made of native ragi, millet extracts, and iron compounds), and teaching families to establish highly productive backyard kitchen gardens, we secure household wellness.',
    aboutHighlights: [
      'Conducting monthly automated hemoglobin diagnostics for school-going adolescent girls.',
      'Distributing customized medical nutritional kits to pregnant and lactating mothers.',
      'Sponsoring diverse, high-germination seed baskets for low-cost household kitchen gardens.',
      'Partnering with regional Anganwadis to chart toddler growth rates and dietary patterns.'
    ],
    aboutImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    problemStatement: {
      text: 'Iron-deficiency anemia and protein energy malnutrition are epidemic in drylands, affecting child growth and maternity health. Rural families rely mostly on dry grains with poor access to fresh green vegetables or high-quality dietary counseling.',
      stats: [
        { metric: '58%', label: 'Severe Anemia Rate', description: 'Adolescent girls and expectant mothers with critically low hemoglobin (below 10g/dL).' },
        { metric: '34%', label: 'Toddler Stunting', description: 'Children under age 5 with below-average height-for-age parameters due to poor maternal nutrition.' },
        { metric: '82%', label: 'Anganwadi Supply Gap', description: 'Underfunded local childcare centers lacking functional weighing balances and nutrition monitoring cards.' }
      ],
      researchData: 'National Family Health Survey (NFHS-5) Karnataka Profile • WHO Rural Malnutrition Index'
    },
    solutionSteps: [
      { phase: 'Phase 1', title: 'Diagnostic Baseline', description: 'Screening girls and young mothers to map iron and BMI deficiencies across villages.' },
      { phase: 'Phase 2', title: 'Targeted Distribution', description: 'Distributing micro-nutrient kits and iron supplements with simple dosage schedules.' },
      { phase: 'Phase 3', title: 'Kitchen Gardening', description: 'Training households to cultivate high-yield green leafy vegetables in backyard patches.' },
      { phase: 'Phase 4', title: 'Anganwadi Coordination', description: 'Empowering Anganwadi workers with digital height/weight monitoring tools and nutritional cards.' },
      { phase: 'Phase 5', title: 'Impact Evaluation', description: 'Re-testing blood levels after 6 months to measure hemoglobin levels and tracking toddler weight recovery.' },
      { phase: 'Phase 6', title: 'Sustained Integration', description: 'Handing over garden seed distributions to local school groups to preserve dietary diversity.' }
    ],
    sdgs: [
      { goalNumber: 3, title: 'Good Health & Well-being', description: 'Reducing maternal and neonatal mortality by preventing critical anemia-related childbirth complications.', color: 'bg-emerald-600 text-white' },
      { goalNumber: 2, title: 'Zero Hunger', description: 'Eradicating micro-nutrient malnutrition through backyard organic kitchen gardens and balanced traditional grains.', color: 'bg-amber-600 text-white' },
      { goalNumber: 6, title: 'Clean Water', description: 'Sponsoring clean drinking water storage models to prevent gastrointestinal infections that limit food absorption.', color: 'bg-sky-500 text-white' }
    ],
    beneficiaryStories: [
      {
        id: 'story-kasturi',
        name: 'Kasturi Nayak',
        role: 'Lactating Mother',
        location: 'Tarihal Village, Dharwad',
        quote: 'My baby was born healthy at 3.1 kg, and my hemoglobin is now 12.2 g/dL. The nutrition kits and backyard drumstick tree changed my life.',
        narrative: 'Kasturi had low energy levels during her third pregnancy, with hemoglobin levels at 8.4 g/dL. Raita Mitra registered her for monthly nutritional counseling, provided mineral kits, and helped set up a kitchen garden.',
        before: 'Critically low hemoglobin, fatigue, lack of access to fresh greens, at-risk pregnancy.',
        after: 'Healthy childbirth, normal hemoglobin, daily access to fresh spinach, drumsticks, and tomatoes from her backyard.',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'
      }
    ],
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
      afterImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
      beforeLabel: 'Deficient Diets & High Fatigue',
      afterLabel: 'Healthy Mothers & Backyard Nutrition Gardens'
    },
    photoGallery: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&q=80&w=600'
    ],
    videoGallery: [
      { title: 'Backyard Kitchen Gardens & Anemia Recovery', thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400', videoUrl: 'https://www.youtube.com/embed/H01A_6V7S6k', duration: '3:30' },
      { title: 'Anganwadi Growth Diagnostic Systems', thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400', videoUrl: 'https://www.youtube.com/embed/I0T8hXF8_wU', duration: '4:50' }
    ],
    dashboard: {
      beneficiaryGrowth: [
        { name: '2022', value: 800 },
        { name: '2023', value: 1600 },
        { name: '2024', value: 2900 },
        { name: '2025', value: 3800 },
        { name: '2026', value: 4500 }
      ],
      districtCoverage: [
        { name: 'Dharwad', value: 22 },
        { name: 'Haveri', value: 13 }
      ],
      yoyProgress: [
        { name: 'Medical Camps', value: 10, secondary: 35 },
        { name: 'Nutrition Kits', value: 45, secondary: 110 },
        { name: 'Bio-Gardens', value: 60, secondary: 310 }
      ],
      genderRatio: [
        { name: 'Females Enrolled', value: 84, color: '#f59e0b' },
        { name: 'Children Under 5', value: 16, color: '#0ea5e9' }
      ],
      ageDistribution: [
        { name: '0-5 yrs', value: 16 },
        { name: '12-18 yrs', value: 34 },
        { name: '19-45 yrs', value: 50 }
      ]
    },
    timeline: [
      { year: '2022', title: 'Hemoglobin Diagnostic Baseline', description: 'Audited hemoglobin levels of 1,200 adolescent girls in government rural schools.' },
      { year: '2023', title: 'Nutrition Kit Distribution', description: 'Sourced and distributed premium organic nutrient formulas to 1,500 under-weight mothers.' },
      { year: '2024', title: 'Kitchen Gardening Network', description: 'Constructed 150 dense backyard bio-gardens loaded with leafy nutrient crops.' },
      { year: '2025', title: 'Anganwadi Upgrade Drive', description: 'Equipped 25 government Anganwadis with high-quality child growth tracking software.' }
    ],
    activities: [
      { title: 'Nutritional Seed Auditing', description: 'Procuring and distributing pesticide-free, high-vitamin seed boxes.', metric: '310 gardens built' },
      { title: 'Bilingual Health Advisories', description: 'Weekly village counseling sessions on child immunity, clean hygiene, and traditional millets.', metric: '4,500 counseling booklets' },
      { title: 'Automated Diagnostic Clinics', description: 'Mobile health screening camps with spot hemoglobin tests and iron supply.', metric: '35 camps executed' }
    ],
    events: [
      { title: 'Village Anganwadi Nutrition & Health Camp', date: 'Aug 14, 2026', location: 'Tarihal Anganwadi Premises', status: 'Upcoming' },
      { title: 'Backyard Kitchen Gardening Seed Fair', date: 'Aug 21, 2026', location: 'Dharwad Rural Community Hall', status: 'Upcoming' }
    ],
    downloads: [
      { title: 'Rural Nutrition Recipes & Anemia Prevention Guide (Kannada)', type: 'Training Material', size: '3.1 MB' },
      { title: 'Anganwadi Toddler Growth Tracking Sheets', type: 'Training Material', size: '1.2 MB' },
      { title: 'Anemia Reduction Impact Survey 2025', type: 'Impact Report', size: '2.4 MB' }
    ],
    partners: [
      { name: 'St. John’s Medical Research', logoText: 'St John’s Medicine', type: 'Research Partner' },
      { name: 'Narayana Health', logoText: 'Narayana Camps', type: 'CSR Partner' },
      { name: 'Department of Women & Child Welfare', logoText: 'Govt. of Karnataka', type: 'Government' }
    ],
    testimonials: [
      {
        name: 'Dr. Asha Patil',
        designation: 'Pediatric Nutrition Lead',
        organization: 'SDM Medical Hospital',
        quote: 'Preventative diagnostics cut healthcare burdens by 80%. Raita Mitra’s kitchen garden models establish self-reliance right in the backyard.',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200'
      }
    ],
    faqs: [
      { question: 'What is inside the customized nutrition kits?', answer: 'The kits contain iron and folic acid formulations, vitamin-dense micro-nutrients, and traditional sprouted multi-millet powders (sattu/malt).' },
      { question: 'Who qualifies to receive these kitchen garden kits?', answer: 'We prioritize any household with children under 5, adolescent schoolgirls, or pregnant women exhibiting low hemoglobin levels.' }
    ],
    relatedSlugs: ['women-empowerment', 'sustainable-agriculture']
  },
  'climate-action': {
    id: 'climate',
    slug: 'climate-action',
    title: 'Environment & Climate Action',
    tagline: 'Building community-led ecological resilience through tree planting, watershed management, and waste recycling.',
    mission: 'To plant and sustain 50,000+ native saplings and restore 15 major dryland aquifers and water catchment basins in Northern Karnataka by 2028.',
    heroVideoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200',
    heroFallbackImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200',
    quickImpactMetrics: [
      { value: '15,000+', label: 'Saplings Sustained' },
      { value: '25+', label: 'Villages Covered' },
      { value: '12M+ L', label: 'Water Recharged' },
      { value: '3', label: 'Lakes Restored' }
    ],
    aboutDescription: 'The Environment & Climate Action program builds deep ecological barriers against desertification and soil erosion in dryland zones. By implementing rapid Miyawaki micro-forest planting on common land patches, restoring degraded village ponds through deep physical desilting, and installing customizable domestic rainwater harvesting systems, we recharge local water tables and secure vital resources.',
    aboutHighlights: [
      'Sustaining 15,000+ native multi-species trees using biological organic watering.',
      'Desilting and rebuilding physical earthen bunds for 3 massive village community lakes.',
      'Sponsoring and constructing domestic school roof rainwater capture systems.',
      'Forming "Prakruthi Mitras" (Nature Friends) youth groups to monitor local conservation sites.'
    ],
    aboutImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800',
    problemStatement: {
      text: 'Erratic rainfall patterns have depleted dryland water tables, leaving open wells and borewells dry before summer. Devegetation and overgrazing have stripped topsoil layers, while village waste dumps contaminate local surface runoff.',
      stats: [
        { metric: '140m', label: 'Aquifer Depletion', description: 'Average depth to find reliable groundwater, down from 60m a decade ago.' },
        { metric: '91%', label: 'Topsoil Loss', description: 'Portion of common pasture lands experiencing severe wind and water erosion due to a lack of vegetative cover.' },
        { metric: '75%', label: 'Siltation Rate', description: 'Reduced water capacity in village reservoirs due to years of clay accumulation.' }
      ],
      researchData: 'Central Ground Water Board (CGWB) Dharwad Assessment • Karnataka State Disaster Management Authority Report'
    },
    solutionSteps: [
      { phase: 'Phase 1', title: 'Ecological Survey', description: 'Mapping local drainage contours and selecting low-capacity common lands.' },
      { phase: 'Phase 2', title: 'Community Mobilization', description: 'Forming village water committees and recruiting volunteers.' },
      { phase: 'Phase 3', title: 'Water Recharge & Miyawaki', description: 'Excavating silt traps, setting up recharge shafts, and soil preparation for multi-species Miyawaki forests.' },
      { phase: 'Phase 4', title: 'Monitoring & Care', description: 'Tracking tree growth ratios with geotagged photography and maintaining silt screens.' },
      { phase: 'Phase 5', title: 'Impact Evaluation', description: 'Measuring summer water tables in surrounding agricultural wells and counting green biomass volume.' },
      { phase: 'Phase 6', title: 'Scaling', description: 'Expanding models into adjacent villages and linking with state carbon offset incentives.' }
    ],
    sdgs: [
      { goalNumber: 13, title: 'Climate Action', description: 'Building resilient local ecological structures that mitigate dry spells and extreme heat waves.', color: 'bg-emerald-800 text-white' },
      { goalNumber: 6, title: 'Clean Water', description: 'Replenishing village groundwater tables and securing access to clean rainwater reserves.', color: 'bg-sky-500 text-white' },
      { goalNumber: 15, title: 'Life on Land', description: 'Restoring degraded soils and establishing native multi-species biodiversity zones.', color: 'bg-lime-600 text-white' }
    ],
    beneficiaryStories: [
      {
        id: 'story-basayya',
        name: 'Basayya Hiremath',
        role: 'Village Panchayat Representative',
        location: 'Yaraguppi Village, Dharwad',
        quote: 'When we desilted Yaraguppi lake, we recharged 12 open wells within a 1.5 km radius. For the first time in 6 years, our wells held water in May.',
        narrative: 'Basayya saw Yaraguppi’s historic public lake fill with silt and garbage, forcing farmers to buy drinking water from commercial trucks in the summer. He collaborated with Raita Mitra to desilt the basin.',
        before: 'Silted lake, dried agricultural wells, expensive tank water dependence.',
        after: 'Restored community water body, continuous water tables in surrounding wells, lush bird nesting zones.',
        image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400'
      }
    ],
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
      afterImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800',
      beforeLabel: 'Dried Silted Earthen Ponds',
      afterLabel: 'Deep, Clear Community Water catchment'
    },
    photoGallery: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&q=80&w=600'
    ],
    videoGallery: [
      { title: 'Community Water Conservation & Aquifer Recharge', thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400', videoUrl: 'https://www.youtube.com/embed/N-Zg_6GgUxE', duration: '4:55' },
      { title: 'Miyawaki Multi-Species Afforestation Guide', thumbnail: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=400', videoUrl: 'https://www.youtube.com/embed/S2pEAsb6xRE', duration: '3:40' }
    ],
    dashboard: {
      beneficiaryGrowth: [
        { name: '2022', value: 3000 },
        { name: '2023', value: 7500 },
        { name: '2024', value: 11000 },
        { name: '2025', value: 13500 },
        { name: '2026', value: 15000 }
      ],
      districtCoverage: [
        { name: 'Dharwad', value: 15 },
        { name: 'Haveri', value: 7 },
        { name: 'Gadag', value: 3 }
      ],
      yoyProgress: [
        { name: 'Trees Sustained', value: 2000, secondary: 15000 },
        { name: 'Lakes Restored', value: 1, secondary: 3 },
        { name: 'Rainwater Units', value: 15, secondary: 85 }
      ],
      genderRatio: [
        { name: 'Forestry Sites', value: 65, color: '#047857' },
        { name: 'Wetland Sites', value: 35, color: '#0ea5e9' }
      ],
      ageDistribution: [
        { name: 'Native Trees', value: 78 },
        { name: 'Fodder Shrubs', value: 22 }
      ]
    },
    timeline: [
      { year: '2022', title: 'Community Watershed Design', description: 'Mapped out geographic elevation patterns across 5 target villages.' },
      { year: '2023', title: 'Yaraguppi Lake Desilting', description: 'Excavated 14,000 cubic meters of heavy silt, restoring water capacity.' },
      { year: '2024', title: 'Miyawaki Forest Planting', description: 'Planted 4,000 native saplings in a dense, multi-tiered organic soil matrix.' },
      { year: '2025', title: 'School Rainwater Harvesting', description: 'Completed roof capture installations in 22 government secondary schools.' }
    ],
    activities: [
      { title: 'Groundwater Recharge Wells', description: 'Installing gravel filtration shafts next to dried agricultural borewells.', metric: '85 setups running' },
      { title: 'Eco-Education Programs', description: 'Workshops for rural students on ecological mapping and waste segregation.', metric: '2,200 kids trained' },
      { title: 'Community Forestry Care', description: 'Organizing organic mulching and biweekly watering for native tree species.', metric: '94% tree survival' }
    ],
    events: [
      { title: 'Prakruthi Mitra Watershed Field Day', date: 'Aug 18, 2026', location: 'Yaraguppi Forest Sanctuary', status: 'Upcoming' },
      { title: 'Monsoon Sapling Planting Marathon', date: 'Sep 05, 2026', location: 'Shiraguppi Public Lands', status: 'Upcoming' }
    ],
    downloads: [
      { title: 'Dryland Miyawaki Afforestation Blueprint (Kannada)', type: 'Training Material', size: '4.2 MB' },
      { title: 'Pond Desilting & Silt-Trap Engineering Guidelines', type: 'Training Material', size: '2.5 MB' },
      { title: 'Aquifer Replenishment Audit Report 2025', type: 'Impact Report', size: '3.6 MB' }
    ],
    partners: [
      { name: 'Azim Premji Foundation', logoText: 'Azim Premji Philanthropy', type: 'Foundation' },
      { name: 'State Pollution Control Board', logoText: 'KSPCB Karnataka', type: 'Government' },
      { name: 'ITC Limited', logoText: 'ITC Mission Sunehra Kal', type: 'Corporate' }
    ],
    testimonials: [
      {
        name: 'Smt. Malini Gowda',
        designation: 'Panchayat Environmental Lead',
        organization: 'Haveri District Council',
        quote: 'Droughts are inevitable in drylands, but water scarcity is a management failure. Desilting community ponds gives villages self-reliance in water.',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
      }
    ],
    faqs: [
      { question: 'What is the Miyawaki afforestation method?', answer: 'A technique of planting native tree species close together in prepared organic soil, leading to 10x faster growth and 30x denser multi-tier forest canopies.' },
      { question: 'How is the survival rate of these trees monitored?', answer: 'Local youth groups are hired to water and monitor tree health. Every site is mapped and audited quarterly via geotagged photos.' }
    ],
    relatedSlugs: ['sustainable-agriculture', 'rural-entrepreneurship']
  },
  'rural-entrepreneurship': {
    id: 'entrepreneurship',
    slug: 'rural-entrepreneurship',
    title: 'Rural Entrepreneurship & Incubation',
    tagline: 'Supporting local agro-processing, value-addition micro-mills, and cold storage chains.',
    mission: 'To incubate 200+ rural micro-enterprises and agri-startups, creating 1,500+ direct jobs in Northern Karnataka by 2028.',
    heroVideoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200',
    heroFallbackImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200',
    quickImpactMetrics: [
      { value: '120+', label: 'Startups Supported' },
      { value: '45', label: 'Units Set Up' },
      { value: '25', label: 'Retail Markets' },
      { value: '480+', label: 'Jobs Created' }
    ],
    aboutDescription: 'The Rural Entrepreneurship & Incubation program transforms villages from primary producers to value-added manufacturing hubs, directly retaining rural GDP. By providing equipment subsidies, technical training, business planning, and market linkages, Raita Mitra supports local processors in milling traditional millet flours, extracting cold-pressed oils, grinding spices, and utilizing solar cold rooms.',
    aboutHighlights: [
      'Incubating regional food-processing units managed by rural youth cooperatives.',
      'Sponsoring FSSAI food quality licensing, packaging design, and legal paperwork.',
      'Constructing solar-powered storage centers to stabilize fresh produce prices.',
      'Structuring cooperative B2B connections with organic retail stores in Hubballi.'
    ],
    aboutImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    problemStatement: {
      text: 'Rural growers lose up to 30% of their potential income by selling raw produce immediately after harvest due to a total lack of local processing machinery or cold storage options. Unemployed youth migrate to cities for insecure manual work due to zero village jobs.',
      stats: [
        { metric: '30%', label: 'Harvest Price Drop', description: 'Average decrease in fresh grain prices during peak harvest gluts.' },
        { metric: '15x', label: 'Value-Addition Multiplier', description: 'Typical price premium for refined organic cold-pressed oil compared to raw sesame seeds.' },
        { metric: '70%', label: 'Migration Intent', description: 'Unemployed rural youth seeking casual labor in cities due to a total lack of local options.' }
      ],
      researchData: 'Ministry of MSME Village Industries Profile • Indian Institute of Millets Research Market Survey'
    },
    solutionSteps: [
      { phase: 'Phase 1', title: 'Ecosystem Mapping', description: 'Identifying surplus local crops and scouting prospective youth and SHG entrepreneurs.' },
      { phase: 'Phase 2', title: 'Business Bootcamps', description: 'Conducting pricing, bookkeeping, cashflow management, and regulatory compliance seminars.' },
      { phase: 'Phase 3', title: 'Infrastructure Setup', description: 'Co-funding grain sorters, oil expellers, FSSAI registrations, and packaging layouts.' },
      { phase: 'Phase 4', title: 'Market Linkage', description: 'Coordinating shelf listings in urban supermarkets and setting up e-commerce portals.' },
      { phase: 'Phase 5', title: 'Impact Evaluation', description: 'Tracking enterprise profitability, average household income changes, and jobs created.' },
      { phase: 'Phase 6', title: 'Scaling', description: 'Pooling enterprises under unified cooperative brands and securing bank loans for processing machinery.' }
    ],
    sdgs: [
      { goalNumber: 8, title: 'Decent Work', description: 'Boosting village economies and reducing mass urban migration through competitive rural processing jobs.', color: 'bg-red-800 text-white' },
      { goalNumber: 9, title: 'Industry & Innovation', description: 'Deploying solar-powered cold storages and localized micro-milling machinery in villages.', color: 'bg-sky-600 text-white' },
      { goalNumber: 12, title: 'Responsible Production', description: 'Minimizing transport emissions and packaging waste by processing raw crops directly inside cultivation zones.', color: 'bg-yellow-600 text-white' }
    ],
    beneficiaryStories: [
      {
        id: 'story-mallappa',
        name: 'Mallappa Kalghatgi',
        role: 'Founder, Mitra Agro Mills',
        location: 'Morab Village, Dharwad',
        quote: 'By milling our chili crop locally and designing neat retail packages, our profit margins grew by 65%. We now employ 8 local women in our mill.',
        narrative: 'Mallappa used to sell his harvest at rock-bottom prices immediately. Recognizing the high retail demand for authentic spices, he joined Raita Mitra’s incubation cohort to acquire milling equipment.',
        before: 'Low profit margins on raw chili sales, zero business management skills, no local processing options.',
        after: 'Registered brand owner, processing 8 tons of ground spices annually, employing 8 women, FSSAI certified.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
      }
    ],
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      afterImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
      beforeLabel: 'Raw Low-Value Harvest Trade',
      afterLabel: 'Modern Certified Packaging & Milling Unit'
    },
    photoGallery: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=600'
    ],
    videoGallery: [
      { title: 'Agro-processing Incubators & Branding', thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400', videoUrl: 'https://www.youtube.com/embed/5F2o3eIe3Zk', duration: '5:20' },
      { title: 'Solar Powered Localized Cold Storages', thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400', videoUrl: 'https://www.youtube.com/embed/3WbO4r46NTo', duration: '4:15' }
    ],
    dashboard: {
      beneficiaryGrowth: [
        { name: '2022', value: 25 },
        { name: '2023', value: 55 },
        { name: '2024', value: 85 },
        { name: '2025', value: 110 },
        { name: '2026', value: 120 }
      ],
      districtCoverage: [
        { name: 'Dharwad', value: 28 },
        { name: 'Haveri', value: 12 },
        { name: 'Gadag', value: 5 }
      ],
      yoyProgress: [
        { name: 'Mills Set Up', value: 10, secondary: 45 },
        { name: 'Local Jobs', value: 120, secondary: 480 },
        { name: 'Profit Shift', value: 20, secondary: 55 }
      ],
      genderRatio: [
        { name: 'Co-op Members', value: 62, color: '#047857' },
        { name: 'Individual Owners', value: 38, color: '#0ea5e9' }
      ],
      ageDistribution: [
        { name: '18-25 yrs', value: 25 },
        { name: '26-40 yrs', value: 60 },
        { name: '41+ yrs', value: 15 }
      ]
    },
    timeline: [
      { year: '2022', title: 'Incubation Lab Launch', description: 'Recruited initial cohort of 25 youth to map surplus agro-raw materials.' },
      { year: '2023', title: 'FSSAI Compliance Hub', description: 'Established legal registration guidelines for decentralized village enterprises.' },
      { year: '2024', title: 'Cold-Chain Pilot', description: 'Installed first set of 4 cooperative solar cold storages in cotton zones.' },
      { year: '2025', title: 'Supermarket Shelf Listings', description: 'Partnered with major organic retail chains in Hubballi to list local products.' }
    ],
    activities: [
      { title: 'Subsidized Micro-machinery', description: 'Co-funding flour mills, oil expellers, and packaging equipment.', metric: '45 processing units' },
      { title: 'Regulatory License Support', description: 'Assisting with FSSAI, GST, MSME, and barcode registrations.', metric: '100% compliant' },
      { title: 'Solar Cold Room Maintenance', description: 'Daily monitoring of temperature parameters at fresh crop points.', metric: '12 tons capacity' }
    ],
    events: [
      { title: 'Rural Spice & Flour Enterprise Showcase', date: 'Aug 22, 2026', location: 'Morab Cooperative Mill Premises', status: 'Upcoming' },
      { title: 'State Subsidy & Bank Loan Workshop', date: 'Sep 10, 2026', location: 'Hubballi MSME Training Center', status: 'Upcoming' }
    ],
    downloads: [
      { title: 'Agro-Processing Business Plan Template (Kannada)', type: 'Training Material', size: '3.8 MB' },
      { title: 'FSSAI Licensing and Labeling Guidelines', type: 'Training Material', size: '1.9 MB' },
      { title: 'Rural Enterprise Impact and GDP Audit 2025', type: 'Impact Report', size: '2.5 MB' }
    ],
    partners: [
      { name: 'Ministry of MSME', logoText: 'Govt. of India', type: 'Government' },
      { name: 'CSIR CFTRI Mysore', logoText: 'CFTRI Tech Research', type: 'Research Partner' },
      { name: 'HDFC Bank CSR', logoText: 'HDFC Parivartan', type: 'Corporate' }
    ],
    testimonials: [
      {
        name: 'Dr. Ramesh Hegde',
        designation: 'Director of Rural Incubation',
        organization: 'CFTRI Research Mysore',
        quote: 'Adding value at source is the most secure path to rural wealth. Processing raw cotton or millets inside the village protects farmers from market crashes.',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200'
      }
    ],
    faqs: [
      { question: 'What machinery subsidies are available?', answer: 'We offer up to 50% co-funding on micro-milling, oil expelling, and crop grading equipment through corporate CSR partnerships.' },
      { question: 'Who manages these village micro-enterprises?', answer: 'The units are owned and operated by local registered youth cooperatives or women self-help federations, with Raita Mitra providing advisory support.' }
    ],
    relatedSlugs: ['women-empowerment', 'sustainable-agriculture']
  }
};
