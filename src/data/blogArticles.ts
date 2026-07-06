import { NewsArticle } from '../types';

export interface ExtendedArticle extends NewsArticle {
  slug: string;
  topic: string; // "Agriculture" | "Women Empowerment" | "Education & AI Skills" | "Health & Nutrition" | "Climate Action" | "Entrepreneurship" | "CSR & ESG" | "Events & Workshops"
  tags: string[];
  authorImage: string;
  authorRole: string;
  authorBio?: string;
  authorSocials?: { twitter?: string; linkedin?: string; email?: string };
  updatedDate: string;
  viewsCount: number;
  youtubeId?: string;
  isFeatured?: boolean;
  
  // Rich data for the award-winning template sections
  keyTakeaways: string[];
  audioSources: {
    en: string;
    kn: string;
    hi: string;
  };
  references: string[];
  citation: {
    apa: string;
    mla: string;
    chicago: string;
  };
  infographics: {
    title: string;
    chartType: 'bar' | 'pie' | 'line' | 'mix';
    data: Array<Record<string, string | number>>;
    description: string;
  };
  gallery: Array<{
    url: string;
    caption: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const RICH_ARTICLES: ExtendedArticle[] = [
  {
    id: 'art_1',
    title: 'Leveraging Carbon Credits: A New Revenue Stream for Small Farmers',
    slug: 'leveraging-carbon-credits-small-farmers',
    summary: 'Exploring how organic natural farming soil restoration allows smallholders in North Karnataka to access international carbon offset voluntary credits.',
    content: `Regenerative farming methods, such as zero-tillage, bio-inputs, and vetiver grass planting, do more than rejuvenate soil. They actively capture and sequester carbon inside the earth. Raita Mitra Social Trust is piloting a rural carbon credit aggregation framework in Dharwad taluk. By grouping 1,000 farmers into a single voluntary carbon pool, we are handling baseline soil checks and electronic verification. This allows individual farmers to receive direct cash payments from ESG credit aggregators, elevating seasonal income by up to ₹8,000 per acre.

This initiative acts as an ecological stabilizer, shifting the focus from short-term chemical yields to long-term humic density. By restoring deep mycorrhizal fungal networks, soil captures moisture efficiently, safeguarding crops from Karnataka's sudden rain deficits. As voluntary carbon pricing spikes globally, Raita Mitra serves as an institutional bridge ensuring funds flow directly to smallholder bank accounts under clean, zero-leakage audited pathways.

Our on-field operations utilize cellular telemetry and manual core sample spectrometry. Every quarterly audit checks soil organic carbon (SOC) levels. These readings are cross-verified with Sentinel-2 NDVI vegetative indices to prove persistent carbon sequestration. The combined verification results are then published to a public ledger, allowing corporate sponsors to retire verified carbon credits confidently knowing that local smallholders are the primary beneficiaries.`,
    category: 'insight',
    topic: 'Agriculture',
    tags: ['Sustainable Agriculture', 'Organic Farming', 'Climate Change', 'Carbon Credits', 'Soil Health'],
    author: 'Dr. Mahadevappa S. Patil',
    authorRole: 'Chairman & Principal Agronomist',
    authorBio: 'Former State Agricultural Agronomist focusing on organic soil restoration with over 25 years of research in dryland soil microbiomes.',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    authorSocials: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com', email: 'patil@raitamitra.org' },
    date: '2026-06-28',
    updatedDate: '2026-06-29',
    viewsCount: 1845,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min read',
    isFeatured: true,
    youtubeId: 'dQw4w9WgXcQ',
    keyTakeaways: [
      'Carbon credits provide smallholders a steady secondary income stream up to ₹8,000 per acre.',
      'Transitioning to organic practices increases soil organic carbon (SOC) and improves soil moisture capacity.',
      'Centralized cooperative aggregation allows marginal farmers to bundle land and bypass international transaction entry barriers.',
      'Independent telemetry and soil spectrometry prevent greenwashing and secure top-tier CSR and ESG corporate sponsorships.'
    ],
    audioSources: {
      en: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      kn: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      hi: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    },
    references: [
      'Patil, M. S., & Deshpande, P. (2025). Soil Organic Carbon Sequestration in Northern Karnataka Drylands. Journal of Regenerative Agriculture, 14(2), 112-125.',
      'United Nations Framework Convention on Climate Change (UNFCCC). (2024). Smallholder Agroforestry and Voluntary Carbon Pools in South Asia.',
      'Karnataka State Council for Science and Technology. (2025). Spatial Water Table Mapping in Haveri and Dharwad Districts.'
    ],
    citation: {
      apa: 'Patil, M. S. (2026). Leveraging Carbon Credits: A New Revenue Stream for Small Farmers. Raita Mitra Social Trust Publications. Retrieved from https://raitamitra.org/#blog/leveraging-carbon-credits-small-farmers',
      mla: 'Patil, Mahadevappa S. "Leveraging Carbon Credits: A New Revenue Stream for Small Farmers." Raita Mitra Social Trust Publications, 28 June 2026, https://raitamitra.org/#blog/leveraging-carbon-credits-small-farmers.',
      chicago: 'Patil, Mahadevappa S. "Leveraging Carbon Credits: A New Revenue Stream for Small Farmers." Raita Mitra Social Trust Publications. June 28, 2026. https://raitamitra.org/#blog/leveraging-carbon-credits-small-farmers.'
    },
    infographics: {
      title: 'Soil Organic Carbon Growth (2022-2026)',
      chartType: 'line',
      data: [
        { year: '2022', carbon: 0.45, moisture: 12, yield: 450 },
        { year: '2023', carbon: 0.62, moisture: 15, yield: 510 },
        { year: '2024', carbon: 0.88, moisture: 19, yield: 590 },
        { year: '2025', carbon: 1.15, moisture: 24, yield: 680 },
        { year: '2026', carbon: 1.38, moisture: 28, yield: 740 }
      ],
      description: 'Progressive improvements in Soil Organic Carbon (%) and relative soil moisture capacity (%) across 1,000 audited pilot acres, resulting in an index increase in dryland crop yields (kg/acre).'
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=400', caption: 'Soil core collection and carbon density spectroscopy audits in Dharwad farm clusters.' },
      { url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=400', caption: 'Deep root systems of windbreak vetiver grass anchoring volatile dryland topsoil.' },
      { url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400', caption: 'Local farmers receiving direct voluntary carbon cash payouts via cooperative banking.' }
    ],
    faqs: [
      { question: 'What is a voluntary carbon credit pool?', answer: 'It is a system where small landholdings are combined into a single entity (minimum 1,000 acres) to meet the validation sizes required by international carbon buyers.' },
      { question: 'Do farmers need to stop tilling completely?', answer: 'Minimal shallow tilling is acceptable, but deep mechanical soil turning is avoided to prevent trapped carbon from oxidizing back into the atmosphere.' },
      { question: 'How is carbon measurement verified?', answer: 'We combine physical soil core core sampling with satellite multispectral vegetative indexing (NDVI) to ensure complete audit transparency.' }
    ]
  },
  {
    id: 'art_2',
    title: 'How Women SHGs are Transforming Dairy Processing in Haveri',
    slug: 'women-shgs-dairy-processing-haveri',
    summary: 'A comprehensive study on the all-women milk testing and cold-chain facility establishing stable economic baselines.',
    content: `For decades, women in rural Karnataka have provided seasonal manual agriculture labor with fluctuating daily wages. In Savanur Taluk of Haveri, Raita Mitra Social Trust coordinated with village elders to form the Yaraguppi Dairy Union. Fully managed by women Self-Help Groups (SHGs), this cooperative features automated fat-testing milk analyzers, electronic weighbridges, and a 1,500-liter solar-powered chilling bulk storage tank.

By bypassing exploitative regional middlemen, cooperative members receive direct bank deposits based on daily fat parameters. This model has generated steady income streams independent of dry monsoons, and the cooperative distributes quarterly dividends back to its 180 members. The success of this model has prompted the Karnataka Ministry of Rural Development to cite the Yaraguppi Dairy Union as an exemplary template for village-level asset creation.

In addition to milk collection, the cooperative has set up a ghee clarifying and curd formulation packaging sub-unit. By selling processed dairy derivatives to regional markets, these rural women retain maximum value-add within their community, funding local scholarships for girls.`,
    category: 'news',
    topic: 'Women Empowerment',
    tags: ['Women Empowerment', 'Rural Entrepreneurship', 'Livelihood Development', 'Dairy Cooperative', 'Haveri'],
    author: 'Anita Patel',
    authorRole: 'Cooperative Coordinator',
    authorBio: 'Coordinating rural cooperative networks and micro-credit audits, with 12 years of experience in microfinance structural design.',
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    authorSocials: { linkedin: 'https://linkedin.com', email: 'anita@raitamitra.org' },
    date: '2026-06-20',
    updatedDate: '2026-06-22',
    viewsCount: 1250,
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    youtubeId: 'dQw4w9WgXcQ',
    keyTakeaways: [
      'Bypassing dairy middlemen increased milk payout rates from ₹22/liter to ₹34/liter.',
      'Solar bulk coolers prevent chemical milk souring, cutting waste rates to less than 0.5%.',
      'Direct-to-bank mobile transfers secure financial agency for women, preventing domestic money diversion.',
      'Livelihood diversity provides drought resilience during failed monsoons.'
    ],
    audioSources: {
      en: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      kn: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      hi: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
    },
    references: [
      'Patel, A. (2025). Micro-credit and Solarized Cold Chains: Empowering Women in Haveri. Journal of Cooperative Economics, 8(1), 45-56.',
      'National Bank for Agriculture and Rural Development (NABARD). (2024). Dairy Value Addition Models in Southern India.'
    ],
    citation: {
      apa: 'Patel, A. (2026). How Women SHGs are Transforming Dairy Processing in Haveri. Raita Mitra Social Trust Publications. https://raitamitra.org/#blog/women-shgs-dairy-processing-haveri',
      mla: 'Patel, Anita. "How Women SHGs are Transforming Dairy Processing in Haveri." Raita Mitra Social Trust Publications, 20 June 2026.',
      chicago: 'Patel, Anita. "How Women SHGs are Transforming Dairy Processing in Haveri." Raita Mitra Social Trust Publications. June 20, 2026.'
    },
    infographics: {
      title: 'Dairy Payout Growth and Milk Quality Index',
      chartType: 'bar',
      data: [
        { month: 'Jan', revenue: 140, members: 80, quality: 3.8 },
        { month: 'Feb', revenue: 180, members: 105, quality: 4.0 },
        { month: 'Mar', revenue: 230, members: 120, quality: 4.2 },
        { month: 'Apr', revenue: 310, members: 150, quality: 4.5 },
        { month: 'May', revenue: 420, members: 180, quality: 4.6 }
      ],
      description: 'Monthly financial volume (in thousands ₹), total active cooperative members, and average fat quality percentage metrics indicating consistent operational growth.'
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=400', caption: 'Electronic weighbridge and fat testing analyzer in Yaraguppi dairy collection center.' },
      { url: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=400', caption: 'Cooperative leaders reviewing daily billing ledgers during the audit committee session.' }
    ],
    faqs: [
      { question: 'How do solar chillers help rural dairies?', answer: 'In areas with frequent power outages, solar refrigeration maintains the cold-chain, avoiding souring and allowing storage of evening milk.' },
      { question: 'What fat percentage determines pricing?', answer: 'Standard milk pricing relies on fat and Solid-Not-Fat (SNF) variables, evaluated instantly by our digital analyzers.' }
    ]
  },
  {
    id: 'art_3',
    title: 'Bridging the Digital Gap: Python & Scratch Workshops in Rural Dharwad',
    slug: 'digital-gap-python-scratch-workshops',
    summary: 'STEM mentoring camps introducing computational thinking and programmatic logic to state high school girls.',
    content: `Isolated state schools in northern Karnataka often lack basic computer access, leaving talented students behind in the digital economy. Raita Mitra's 'Smart IT Labs' program has established solar-powered computer labs loaded with offline educational software across 12 high schools.

Our recent Python and Scratch coding hackathon demonstrated that rural children, when provided structured, hands-on access, can grasp complex programmatic abstractions quickly. Over 120 girls from local farming families built custom games and simple utilities addressing community issues, such as local water rationing algorithms and crop disease identification flows. This initiative builds analytical and problem-solving skills that prepare rural youth for the modern technology landscape.`,
    category: 'insight',
    topic: 'Education & AI Skills',
    tags: ['AI Education', 'Livelihood Development', 'STEM Labs', 'Coding Workshops', 'Rural Dharwad'],
    author: 'Vikram S. Deshpande',
    authorRole: 'Director of Education Programs',
    authorBio: 'Passionate computer science educator setting up decentralized rural IT labs, focusing on equity in digital access.',
    authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    authorSocials: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com', email: 'deshpande@raitamitra.org' },
    date: '2026-06-15',
    updatedDate: '2026-06-16',
    viewsCount: 1560,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    youtubeId: 'dQw4w9WgXcQ',
    keyTakeaways: [
      'Establishing solar-powered labs creates computer access independent of grid instability.',
      'Computational thinking camps boost logical reasoning and math score outcomes by 22%.',
      'Targeting school girls supports systemic gender equality in technology.',
      'Developing localized applications builds community problem-solving mindsets.'
    ],
    audioSources: {
      en: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
      kn: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
      hi: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3'
    },
    references: [
      'Deshpande, V. S. (2025). Off-grid Solar Digital Infrastructure in State Schools of Dharwad. Journal of Educational Equity, 19(3), 201-218.'
    ],
    citation: {
      apa: 'Deshpande, V. S. (2026). Bridging the Digital Gap: Python & Scratch Workshops in Rural Dharwad. https://raitamitra.org/#blog/digital-gap-python-scratch-workshops',
      mla: 'Deshpande, Vikram S. "Bridging the Digital Gap..." Raita Mitra Social Trust, 15 June 2026.',
      chicago: 'Deshpande, Vikram S. "Bridging the Digital Gap..." Raita Mitra Social Trust. 2026.'
    },
    infographics: {
      title: 'Digital Literacy Growth Metrics in Target Schools',
      chartType: 'pie',
      data: [
        { name: 'Basic Computer Navigation', value: 45 },
        { name: 'Visual Coding (Scratch)', value: 30 },
        { name: 'Syntax Coding (Python)', value: 15 },
        { name: 'Unassisted Project Design', value: 10 }
      ],
      description: 'Distribution of technology competencies achieved among 400 rural high school students after attending the intensive 12-week mentoring cycle.'
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400', caption: 'High school students working together on Scratch games addressing water distribution.' }
    ],
    faqs: [
      { question: 'What is Scratch visual coding?', answer: 'Scratch is a block-based coding language developed by MIT that helps beginners understand loops, logic, and variables visually without syntax errors.' }
    ]
  },
  {
    id: 'art_4',
    title: 'Combating Infant Malnutrition: Micro-Nutrient Millet Distribution Clinics',
    slug: 'combatting-infant-malnutrition-millet-distribution',
    summary: 'Mobile pediatric screenings and community-led nutritional rehabilitation across forest villages.',
    content: `Malnutrition remains a persistent concern among tribal and marginal communities in forest fringe villages. Raita Mitra Social Trust has teamed up with pediatricians to run comprehensive health and diagnostic clinics.

Alongside detailed screening, families receive monthly 'RMST Nutrition Packs' containing locally-sourced ragi, foxtail millets, and groundnut flour processed at our youth-run milling hubs. These nutrient-dense, culturally accepted grains have improved body mass and energy parameters among 400 children screened, showing how regional agricultural solutions can address critical public health challenges directly.`,
    category: 'news',
    topic: 'Health & Nutrition',
    tags: ['Livelihood Development', 'Organic Farming', 'Public Health', 'Nutrition', 'Millets'],
    author: 'Dr. G. Rao, MD',
    authorRole: 'Chief Medical Consultant',
    authorBio: 'Consulting pediatrician focusing on maternal and infant nutrition in marginalized communities, with 18 years in rural medical outreach.',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    authorSocials: { email: 'dr_rao@raitamitra.org' },
    date: '2026-05-30',
    updatedDate: '2026-06-01',
    viewsCount: 1105,
    image: 'https://images.unsplash.com/photo-1504813184591-01552fffd3be?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    youtubeId: 'dQw4w9WgXcQ',
    keyTakeaways: [
      'Micro-nutrient millets combat severe acute malnutrition (SAM) effectively.',
      'Mobile screening reaches isolated forest fringes that lack medical infrastructure.',
      'Locally formulated grain packs improve long-term adherence because they fit regional tastes.',
      'Milling grains in rural hubs keeps cooperative livelihoods robust.'
    ],
    audioSources: {
      en: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
      kn: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
      hi: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3'
    },
    references: [
      'Rao, G. (2025). Clinical Studies on Foxtail and Finger Millets in Childhood Nutrition. Journal of Tropical Pediatrics, 34(4), 410-422.'
    ],
    citation: {
      apa: 'Rao, G. (2026). Combating Infant Malnutrition: Micro-Nutrient Millet Distribution Clinics. Raita Mitra Social Trust.',
      mla: 'Rao, G. "Combating Infant Malnutrition..." Raita Mitra Social Trust, 2026.',
      chicago: 'Rao, G. "Combating Infant Malnutrition..." Raita Mitra Social Trust, 2026.'
    },
    infographics: {
      title: 'Nutrition Level Improvement Metrics (BMI / Weight %)',
      chartType: 'mix',
      data: [
        { week: 'Wk 1', healthy: 30, moderate: 45, severe: 25 },
        { week: 'Wk 4', healthy: 42, moderate: 43, severe: 15 },
        { week: 'Wk 8', healthy: 58, moderate: 34, severe: 8 },
        { week: 'Wk 12', healthy: 74, moderate: 22, severe: 4 }
      ],
      description: 'Progressive weekly drop in severe/moderate malnutrition rates and corresponding growth in normal body mass metrics among 400 monitored children.'
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400', caption: 'Mobile clinical health camp and weight evaluation audits in forest taluks.' }
    ],
    faqs: [
      { question: 'What ingredients are in the RMST Nutrition Packs?', answer: 'The pack is a roasted grain formulation containing organic finger millet (ragi), foxtail millet, amaranth, malted chickpea, and defatted peanut flour.' }
    ]
  },
  {
    id: 'art_5',
    title: 'Afforestation and Soil Bunding Projects for Micro-Watershed Rejuvenation',
    slug: 'afforestation-soil-bunding-watershed-rejuvenation',
    summary: 'Enlisting community volunteers and local farmers to counter severe water table depletion and topsoil run-off.',
    content: `With unpredictable monsoons and high summer temperatures, the water table in northern Karnataka has faced steep declines. To address this, Raita Mitra organized an afforestation and micro-watershed development campaign in Kalghatgi taluk.

Volunteers built thousands of linear meters of soil bunds to catch rapid rain run-off, allowing moisture to seep deep into the earth. Simultaneously, we planted over 5,000 native windbreak trees, which anchor the soil, reduce evaporation, and restore biodiversity. This simple, community-driven approach has already recharged dozens of dry farm wells, demonstrating the power of decentralized ecosystem restoration.`,
    category: 'report',
    topic: 'Climate Action',
    tags: ['Climate Change', 'Sustainable Agriculture', 'Organic Farming', 'Watershed Rejuvenation', 'Soil Conservation'],
    author: 'P. Deshpande',
    authorRole: 'Environmental Program Lead',
    authorBio: 'Environmental scientist specializing in micro-watershed development and hydrology models for arid agricultural clusters.',
    authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    authorSocials: { linkedin: 'https://linkedin.com', email: 'enviro@raitamitra.org' },
    date: '2026-05-12',
    updatedDate: '2026-05-15',
    viewsCount: 1422,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    readTime: '7 min read',
    youtubeId: 'dQw4w9WgXcQ',
    keyTakeaways: [
      'Soil bunds reduce surface runoff velocity, increasing water infiltration into shallow aquifers.',
      'Native windbreak tree planting drops ambient wind evaporation rates on crops by 15%.',
      'Decentralized community-owned watersheds succeed because farmers hold maintenance equity.',
      'Restored well levels provide critical secondary protective watering during dry spells.'
    ],
    audioSources: {
      en: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
      kn: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
      hi: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3'
    },
    references: [
      'Deshpande, P. (2025). Decentralized Watershed Restoration and Community Aquifer Hydrology. Green Lands Journal, 22(1), 89-102.'
    ],
    citation: {
      apa: 'Deshpande, P. (2026). Afforestation and Soil Bunding Projects for Micro-Watershed Rejuvenation. Raita Mitra Social Trust.',
      mla: 'Deshpande, P. "Afforestation and Soil Bunding..." Raita Mitra Social Trust, May 2026.',
      chicago: 'Deshpande, P. "Afforestation and Soil Bunding..." Raita Mitra Social Trust, 2026.'
    },
    infographics: {
      title: 'Groundwater Table Recharge Velocity Mapping',
      chartType: 'line',
      data: [
        { month: 'Jun', baseline: 180, bunded: 180, trees: 100 },
        { month: 'Jul', baseline: 175, bunded: 162, trees: 250 },
        { month: 'Aug', baseline: 172, bunded: 148, trees: 500 },
        { month: 'Sep', baseline: 170, bunded: 135, trees: 820 },
        { month: 'Oct', baseline: 168, bunded: 112, trees: 1200 }
      ],
      description: 'Comparative depth to water (feet - lower means closer to surface) showing rapid well recovery rates in bunded areas versus unbunded regional controls.'
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400', caption: 'Constructed linear soil contour bunds designed to capture high-velocity monsoon runoff.' }
    ],
    faqs: [
      { question: 'What is a soil bund?', answer: 'It is a mechanical earthen bank thrown up perpendicular to land slope to block water velocity and encourage local seepage.' }
    ]
  },
  {
    id: 'art_6',
    title: 'Millet Processing Units: Expanding Rural Youth Entrepreneurship Hubs',
    slug: 'millet-processing-units-youth-entrepreneurship',
    summary: 'Establishing local value-addition mills that keep agricultural processing margins within rural clusters.',
    content: `Most smallholders sell raw grains at harvest when prices are lowest. By introducing local processing, farmers can capture significantly higher margins. Raita Mitra Social Trust has set up three millet milling units owned and operated by rural youth.

These units clean, de-husk, and pack ragi, bajra, and organic millets, which are sold to urban distributors under the Raita Mitra cooperative brand. This keeps the economic value-addition loop within the local community, creating steady, skilled jobs for youth who might otherwise migrate to cities in search of work.`,
    category: 'press',
    topic: 'Entrepreneurship',
    tags: ['Rural Entrepreneurship', 'Livelihood Development', 'Millet Processing', 'Youth Employment'],
    author: 'S. R. Gudadinni',
    authorRole: 'Treasurer & Enterprise Director',
    authorBio: 'Specializing in agrarian cooperative business design, structural tax planning, and statutory audit compliance.',
    authorImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    authorSocials: { linkedin: 'https://linkedin.com', email: 'gudadinni@raitamitra.org' },
    date: '2026-04-24',
    updatedDate: '2026-04-26',
    viewsCount: 980,
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    youtubeId: 'dQw4w9WgXcQ',
    keyTakeaways: [
      'Raw millets sell for ₹20/kg, but processed packaged millets command ₹65/kg.',
      'Milling hubs provide mechanical grain de-husking services, reducing manual women labor by 80%.',
      'Cooperative youth managers receive training in digital inventory tracking and logistics management.',
      'Rural branding creates customer loyalty in modern health-food urban markets.'
    ],
    audioSources: {
      en: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
      kn: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      hi: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    references: [
      'Gudadinni, S. R. (2025). Grain De-husking Innovations and Economic Retention in Rural Clusters. Journal of Agriculture Enterprise, 11(2), 154-166.'
    ],
    citation: {
      apa: 'Gudadinni, S. R. (2026). Millet Processing Units: Expanding Rural Youth Entrepreneurship Hubs. Raita Mitra Social Trust.',
      mla: 'Gudadinni, S. R. "Millet Processing Units..." Raita Mitra Social Trust, 2026.',
      chicago: 'Gudadinni, S. R. "Millet Processing..." Raita Mitra Social Trust, 2026.'
    },
    infographics: {
      title: 'Value Addition Price Multiplication Indices',
      chartType: 'bar',
      data: [
        { stage: 'Raw Grain', price: 20 },
        { stage: 'De-husked', price: 35 },
        { stage: 'Cleaned/Graded', price: 48 },
        { stage: 'Coop Packaged', price: 65 },
        { stage: 'Retail Organic', price: 85 }
      ],
      description: 'Progressive incremental market value index (₹ per kg) showing the benefits of localized mechanical processing versus raw commodity sales.'
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=400', caption: 'High-speed organic grain sorting and grading units managed by local youth cooperative leaders.' }
    ],
    faqs: [
      { question: 'What is millet de-husking?', answer: 'Millets have an indigestible outer fibrous husk that must be mechanical rubbed off while preserving the nutrient-dense germ and endosperm layers.' }
    ]
  },
  {
    id: 'art_7',
    title: 'Unlocking ESG Corporate Funding for Smallholder Micro-Irrigation',
    slug: 'unlocking-esg-corporate-funding-irrigation',
    summary: 'How CSR compliance and detailed electronic reporting make RMST a reliable partner for major ESG funds.',
    content: `Corporate Social Responsibility (CSR) funds offer a powerful lever for rural development, but corporations require high transparency and audited compliance. Raita Mitra Social Trust’s MCA CSR-1 status ensures we meet all statutory requirements.

Our project management system tracks every rupee spent with geo-tagged coordinates of installed solar pumps and audited balance sheets. This level of rigor has attracted major CSR partners, allowing us to roll out high-precision drip systems that conserve water while lifting marginal farmers out of poverty.`,
    category: 'report',
    topic: 'CSR & ESG',
    tags: ['CSR Projects', 'Sustainable Agriculture', 'Corporate Funding', 'Water Conservation', 'Transparency'],
    author: 'Hegde & Associates',
    authorRole: 'External ESG Auditor',
    authorBio: 'Consulting auditor specializing in ESG performance audits, carbon credit pipelines, and MCA statutory compliance structures.',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    authorSocials: { linkedin: 'https://linkedin.com' },
    date: '2026-04-10',
    updatedDate: '2026-04-12',
    viewsCount: 1650,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    readTime: '8 min read',
    youtubeId: 'dQw4w9WgXcQ',
    keyTakeaways: [
      'Statutory CSR-1 registration and annual audits are vital to secure corporate financial grants.',
      'Interactive geo-tagged intervention mapping proves actual field delivery to foreign corporate sponsors.',
      'Micro-drip setups save up to 55% water compared to flood irrigation models.',
      'Sustained corporate partnerships enable long-term capital investments in rural green machinery.'
    ],
    audioSources: {
      en: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      kn: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      hi: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
    },
    references: [
      'MCA CSR Guidance Manual. (2025). Section 135 Schedule VII of the Companies Act Compliance.'
    ],
    citation: {
      apa: 'Hegde & Associates. (2026). Unlocking ESG Corporate Funding for Smallholder Micro-Irrigation. Raita Mitra Social Trust.',
      mla: 'Hegde & Associates. "Unlocking ESG Corporate..." Raita Mitra, 2026.',
      chicago: 'Hegde & Associates. "Unlocking ESG Corporate..." Raita Mitra, 2026.'
    },
    infographics: {
      title: 'CSR Fund Allocations and Target Interventions',
      chartType: 'pie',
      data: [
        { name: 'Water-Saving Solar Pumps', value: 40 },
        { name: 'Drip Piping Lines', value: 25 },
        { name: 'Farmer Training Workshops', value: 15 },
        { name: 'Hydrology Aquifer Mapping', value: 12 },
        { name: 'Cooperative Audits', value: 8 }
      ],
      description: 'Structural breakdown of how corporate ESG and CSR donor capitals are spent directly across on-field rural infrastructure improvements.'
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400', caption: 'Corporate social responsibility compliance presentation and solar pump geo-tagging demonstrations.' }
    ],
    faqs: [
      { question: 'What is a CSR-1 form?', answer: 'It is a registration document filed with the Ministry of Corporate Affairs (MCA) in India that registers an NGO to receive statutory corporate philanthropic allocations.' }
    ]
  },
  {
    id: 'art_8',
    title: 'State Agrarian Advisory Summit: Training 300+ Smallholders',
    slug: 'state-agrarian-advisory-summit-training',
    summary: 'Vetted agronomists and organic practitioners engaging farmers on zero-budget microbial soil formulation.',
    content: `Practical, hands-on learning is the fastest way to drive agrarian change. Our annual Agrarian Advisory Summit brought together over 300 farmers, along with state agronomists and soil health experts.

Farmers participated in practical workshops on zero-budget natural farming, organic microbial formulation preparation (Jeevamrutha), and crop diversification strategies. This collective exchange of knowledge empowers smallholders to lower input costs, transition away from chemical fertilizers, and improve long-term soil fertility.`,
    category: 'press',
    topic: 'Events & Workshops',
    tags: ['Sustainable Agriculture', 'Organic Farming', 'Farmer Summit', 'Knowledge Exchange', 'Workshops'],
    author: 'Trust Secretariat',
    authorRole: 'Media & Public Affairs Bureau',
    authorBio: 'Official communications hub of the Raita Mitra Social Trust, publishing certified programmatic updates and news.',
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    authorSocials: { email: 'media@raitamitra.org' },
    date: '2026-03-18',
    updatedDate: '2026-03-20',
    viewsCount: 890,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min read',
    youtubeId: 'dQw4w9WgXcQ',
    keyTakeaways: [
      'Bringing together agronomists and organic practitioners creates unified practical guidance.',
      'Practical workshops on preparing organic soil formulations (Jeevamrutha) increase adoption.',
      'Inter-district farmer exchanges distribute successful local dryland farming techniques.',
      'Laying out simple soil testing steps demystifies science for non-literate smallholders.'
    ],
    audioSources: {
      en: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
      kn: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
      hi: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
    },
    references: [
      'Raita Mitra Trust. (2026). Agrarian Advisory Summit Program Proceedings. Dharwad.'
    ],
    citation: {
      apa: 'Trust Secretariat. (2026). State Agrarian Advisory Summit: Training 300+ Smallholders. Raita Mitra Social Trust.',
      mla: 'Trust Secretariat. "State Agrarian Advisory Summit..." Raita Mitra, 2026.',
      chicago: 'Trust Secretariat. "State Agrarian Advisory..." Raita Mitra, 2026.'
    },
    infographics: {
      title: 'Summit Attendance and Farmer Reach Metrics',
      chartType: 'bar',
      data: [
        { district: 'Dharwad', farmers: 120, women: 35 },
        { district: 'Belagavi', farmers: 85, women: 22 },
        { district: 'Haveri', farmers: 65, women: 18 },
        { district: 'Gadag', farmers: 45, women: 12 },
        { district: 'Other', farmers: 25, women: 8 }
      ],
      description: 'District-wise attendance distributions of agrarian practitioners and active women micro-dairy cooperative participants during the 2026 Summit.'
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400', caption: 'State Agrarian Advisory Summit lecture halls hosting interactive agro-ecology workshops.' }
    ],
    faqs: [
      { question: 'What is Jeevamrutha?', answer: 'It is a bio-input liquid fertilizer made from fermenting water, cow dung, cow urine, local pulse flour, jaggery, and virgin local soil, which acts as a rich microbial inoculant.' }
    ]
  }
];
