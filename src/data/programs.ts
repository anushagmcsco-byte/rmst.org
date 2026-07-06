import { Program } from '../types';

export const programsData: Program[] = [
  {
    id: 'agriculture',
    title: 'Sustainable Agriculture & Farmer Empowerment',
    tagline: 'Securing farmer livelihoods through soil rejuvenation, solar-powered micro-irrigation, and robust market links.',
    description: 'Empowering smallholder farmers in dryland regions of Karnataka to adopt high-yielding, resilient, natural agricultural practices.',
    detailedOverview: 'This initiative addresses agrarian distress by providing access to customized bio-inputs, organic certifications, and modern water-efficient technologies. Through deep-rooted training and Farmer Producer Organizations (FPOs), small farmers transition from high-input dependency to regenerative farming, significantly lowering costs and stabilizing yield.',
    beneficiaries: '5,000+ Smallholder and Marginal Farmers across Dharwad, Haveri, and Gadag districts.',
    keyMetrics: [
      { label: 'Soil Health Cards Distributed', value: '3,800+' },
      { label: 'Organic Input Units Set Up', value: '450' },
      { label: 'Input Cost Reduction', value: '35%' },
      { label: 'Yield Increase', value: '22%' }
    ],
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=800',
    highlights: [
      'Transitioning marginal dryland farmers to Zero-Budget Natural Farming (ZBNF).',
      'Establishing solar-powered drip and sprinkler micro-irrigation models to combat dry spells.',
      'Providing end-to-end support for Farmer Producer Organizations (FPOs) for collective bargaining.',
      'Establishing digital price information kiosks and custom hiring services for farm equipment.'
    ],
    activities: [
      'Conducting practical field demonstrations on bio-fertilizer formulations (Jeevamrutha, Neemastra).',
      'Deploying water conservation structures including farm ponds, bunds, and check-dams.',
      'Developing market channels connecting organic farmers directly to retail chains and corporate suppliers.',
      'Training farmers on seed treatment, post-harvest handling, and climate-resilient crop rotation schemes.'
    ]
  },
  {
    id: 'women',
    title: 'Women Empowerment & Livelihoods',
    tagline: 'Fostering financial independence through micro-enterprises, dairy husbandry, and skill training.',
    description: 'Transforming rural women into self-reliant leaders and breadwinners via community self-help groups (SHGs).',
    detailedOverview: 'By establishing community-managed revolving funds and micro-credit institutions, we enable rural women to start sustainable micro-enterprises. Programs focus heavily on secondary agricultural avenues like scientific dairy farming, backyard poultry, organic vermicomposting, and customized tailoring units.',
    beneficiaries: '1,500+ Rural Women and Self-Help Group (SHG) members in Hubballi and surrounding rural blocks.',
    keyMetrics: [
      { label: 'Micro-enterprises Created', value: '280+' },
      { label: 'Average Household Income Boost', value: '45%' },
      { label: 'Active SHG Groups', value: '110' },
      { label: 'Credit Mobilized', value: '₹45L+' }
    ],
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800',
    highlights: [
      'Capacity-building and financial literacy training for community-led SHGs.',
      'Technical training in livestock rearing, feed optimization, and high-yield dairy management.',
      'Incubating sustainable home-run tailoring, food processing, and handicraft units.',
      'Enabling bank linkage and low-interest loan disbursements for certified enterprises.'
    ],
    activities: [
      'Delivering credit management, book-keeping, and leadership workshops for SHG leaders.',
      'Organizing veterinary camps, artificial insemination drives, and cattle health monitoring sessions.',
      'Setting up cooperative dairy collection kiosks with automated milk analyzers.',
      'Providing industrial sewing machines, quality raw materials, and collective marketing brands.'
    ]
  },
  {
    id: 'education',
    title: 'Education, Digital & AI Skill Development',
    tagline: 'Bridging the rural digital divide with computer literacy, STEM education, and AI foundations.',
    description: 'Preparing the next generation of rural children and youth for the future digital economy.',
    detailedOverview: 'This program equips underserved government school students with modern STEM toolkits, interactive tablets, and basic computer science skills. For older youth, we provide specialized foundational courses in digital productivity, basic programming, and introductory AI concepts to make them highly employable.',
    beneficiaries: '3,000+ Rural Students and Unemployed Youth across Hubballi and Dharwad taluks.',
    keyMetrics: [
      { label: 'Digital Labs Set Up', value: '12' },
      { label: 'Rural Youth Certified', value: '850+' },
      { label: 'Digital Literacy Rate', value: '94%' },
      { label: 'STEM Kits Deployed', value: '40' }
    ],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
    highlights: [
      'Establishing state-of-the-art "Smart Digital Labs" in rural government primary and high schools.',
      'Introducing children to STEM concepts, visual programming blocks, and logical reasoning.',
      'Conducting certified job-ready IT courses (Office suites, web design, digital marketing).',
      'Delivering introductory AI foundation courses, preparing rural youth for modern service roles.'
    ],
    activities: [
      'Providing daily computer science classes integrated into the school curriculum.',
      'Organizing regional hackathons, science fairs, and tech-exhibitions for school students.',
      'Offering intensive skills bootcamps for local graduates, including resume building and job searches.',
      'Recruiting and training local youth as computer instructors to sustain regional skill pipelines.'
    ]
  },
  {
    id: 'health',
    title: 'Health, Nutrition & Community Well-being',
    tagline: 'Eradicating rural malnutrition and anemia through preventive health services and balanced diets.',
    description: 'Improving maternal-child health and health awareness among vulnerable rural communities.',
    detailedOverview: 'Malnutrition and severe iron-deficiency anemia limit the developmental potential of rural children and the health of mothers. Our trust partners with medical experts to organize preventive checkups, distribute tailored nutrition kits, and build domestic nutrition gardens (nutrition-dense backyard patches).',
    beneficiaries: '4,500+ Pregnant Women, Lactating Mothers, and Young Children.',
    keyMetrics: [
      { label: 'Medical Camps Organised', value: '35' },
      { label: 'Nutrition Kits Distributed', value: '2,200+' },
      { label: 'Anemia Detection & Follow-ups', value: '1,200+' },
      { label: 'Backyard Nutrition Gardens', value: '310' }
    ],
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    highlights: [
      'Focused campaigns to eliminate iron-deficiency anemia in adolescent girls and pregnant women.',
      'Distributing customized nutrition kits (rich in millet extracts, vitamins, and minerals).',
      'Training rural households on setting up low-cost bio-intensive kitchen gardens.',
      'Organizing specialized general, pediatric, and gynecological screening camps at the village level.'
    ],
    activities: [
      'Conducting monthly hemoglobin checks and providing free iron supplements and medical consultations.',
      'Distributing diverse high-germination vegetable seeds and organic manure for backyard garden cultivation.',
      'Running community workshops on clean drinking water, sanitation practices, and dietary diversity.',
      'Partnering with local Anganwadi centers to track toddler developmental and height/weight metrics.'
    ]
  },
  {
    id: 'climate',
    title: 'Environment & Climate Action',
    tagline: 'Building community-led ecological resilience through tree planting, watershed management, and waste recycling.',
    description: 'Sustaining local biodiversity and vital water reserves in face of severe climate shifts.',
    detailedOverview: 'Our environmental program drives community-led climate action by implementing dense afforestation (Miyawaki method), reviving degraded rural lakes, and driving scientific rainwater harvesting. These projects preserve agricultural water tables and local natural capital.',
    beneficiaries: '25+ Rural Villages benefiting from restored aquifers and clean green cover.',
    keyMetrics: [
      { label: 'Saplings Planted & Sustained', value: '15,000+' },
      { label: 'Community Lakes Restored', value: '3' },
      { label: 'Water Recharge Capacity (L)', value: '12M+' },
      { label: 'Rainwater Systems Installed', value: '85' }
    ],
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    highlights: [
      'Deploying dense Miyawaki micro-forests on common lands to maximize biodiversity.',
      'Undertaking physical desilting, bundling, and vegetation planting for dry lake basins.',
      'Installing customized roof rainwater harvesting structures in schools and community centers.',
      'Introducing bio-degradable waste composting and scientific waste segregation models.'
    ],
    activities: [
      'Organizing green rallies, plantation drives, and carbon-reduction workshops with local schools.',
      'Constructing deep recharge wells and gravel-bed soak pits to replenish groundwater aquifers.',
      'Training farming groups on soil carbon sequestration and low-emission crop residue management.',
      'Forming "Prakruthi Mitras" (Nature Friends) youth groups to monitor local conservation sites.'
    ]
  },
  {
    id: 'entrepreneurship',
    title: 'Rural Entrepreneurship & Incubation',
    tagline: 'Supporting local agro-processing, value-addition micro-mills, and cold storage chains.',
    description: 'Converting rural raw materials into value-added products to boost village GDP.',
    detailedOverview: 'To prevent mass migration to urban slums, we empower rural youth and farmers to become entrepreneurs in their own villages. Raita Mitra provides machinery subsidies, marketing linkages, technical training, and business planning templates for value-adding micro-enterprises.',
    beneficiaries: '120+ Micro-entrepreneurs and Agri-startups supported in Northern Karnataka.',
    keyMetrics: [
      { label: 'Agro-processing Units', value: '45' },
      { label: 'Direct Village Jobs Created', value: '480+' },
      { label: 'Average Business Profit Shift', value: '55%' },
      { label: 'Access to Retail Markets', value: '25' }
    ],
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
    highlights: [
      'Incubating regional food-processing ventures (millet powders, cold-pressed oils, spice grinding).',
      'Facilitating state-supported industrial licenses (FSSAI) and packaging guidelines.',
      'Establishing localized, solar-powered cold storage points for short shelf-life crops.',
      'Creating strong cooperative branding and B2B linkages for regional village enterprises.'
    ],
    activities: [
      'Conducting business modeling, pricing, cashflow planning, and brand-building bootcamps.',
      'Setting up community oil expellers and grain-sorting machines managed by local youth cooperatives.',
      'Linking rural brands to online e-commerce portals and physical organic supermarkets in Hubballi.',
      'Assisting entrepreneurs in registering under MSME and applying for government subsidy schemes.'
    ]
  }
];
