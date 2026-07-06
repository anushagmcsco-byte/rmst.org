import { ImpactStory, Testimonial } from '../types';

export const impactStories: ImpactStory[] = [
  {
    id: 'story_sharanappa',
    title: 'Reclaiming the Soil: How Sharanappa Rescued His Family Farm',
    beneficiaryName: 'Sharanappa Goudar',
    age: 44,
    location: 'Hebsur Village, Hubballi Taluk',
    focusArea: 'Sustainable Agriculture',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600',
    date: 'March 2026',
    quote: "By stopping chemical fertilizers, my soil became alive again. Today, I harvest more and my costs have fallen by half.",
    beforeTrust: "Overwhelmed by high chemical fertilizer debts (₹35,000 annually) and depleting groundwater, Sharanappa faced consecutive crop losses and severe financial mental distress, contemplating selling off his ancestral 3 acres.",
    afterTrust: "Enrolled in Raita Mitra's Natural Farming cohort in 2023. Learned organic input preparation (Jeevamrutha, Ghana-Jeevamrutha) and was assisted with solar micro-irrigation lines. His chemical usage dropped to zero, net margins soared by 55%, and his soil carbon ratio doubled in just 2 years.",
    narrative: "Sharanappa’s farm has now become a certified model demonstration site for the entire taluk. In 2025, over 300 neighboring farmers visited his field to learn natural pest resistance and soil mulching methods, triggering a regional wave of chemical-free crop cultivation."
  },
  {
    id: 'story_savitha',
    title: 'From Tailoring Struggles to Heading a Dairy Cooperative',
    beneficiaryName: 'Savitha Hadimani',
    age: 38,
    location: 'Yaraguppi Village, Kalghatgi Taluk',
    focusArea: 'Women Empowerment',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=600',
    date: 'May 2026',
    quote: "Raita Mitra did not just give us training; they taught us how to stand together, bargain collectively, and lead a business.",
    beforeTrust: "As a single mother with limited schooling, Savitha relied on erratic seasonal tailoring work, making less than ₹3,000 a month. She had zero access to bank accounts, formal credit, or secondary safety assets.",
    afterTrust: "Formed a self-help group with 12 other women under Raita Mitra's training. Acquired two high-yield Gir cows via bank linkage and completed dairy husbandry workshops. She was elected President of the newly established Yaraguppi Women\'s Dairy Cooperative.",
    narrative: "Under Savitha's leadership, the cooperative now aggregates 420 liters of milk daily, directly testing and weighing with electronic devices. Savitha personally earns over ₹18,000 monthly, has secured her children\'s higher education, and represents rural women in taluk administrative forums."
  },
  {
    id: 'story_deepa',
    title: 'Bridging the Future: Deepa\'s Digital Leap into AI Coding',
    beneficiaryName: 'Deepa Kurubar',
    age: 14,
    location: 'Kundgol Government High School',
    focusArea: 'Digital & AI Skill Development',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600',
    date: 'June 2026',
    quote: "I used to think computers were only for city students. In the Raita Mitra lab, I wrote my first code to track soil humidity.",
    beforeTrust: "Studying in a rural school with zero electricity backup and no digital lab, Deepa had never touched a keyboard. High-tech careers felt completely out of reach, and her family planned on dropping her out post-matriculation.",
    afterTrust: "Raita Mitra set up a solar-powered Smart Lab in her high school. Deepa participated in the 6-month foundational computer science and visual STEM curriculum, showing special interest in logical coding blocks.",
    narrative: "Deepa topped the regional science fair by building a functional micro-controller soil moisture sensor with automated water-drip alerts. Her parents have canceled marriage plans and are proudly supporting her application for an engineering polytechnic in Hubballi, backed by a Raita Mitra youth scholarship."
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 'test_1',
    name: 'Shri. Vikram Kulkarni',
    designation: 'Head of CSR and ESG Investments',
    organization: 'Karnataka Industrial Alloys Ltd.',
    quote: "Raita Mitra Social Trust has set a new benchmark for field execution and financial transparency. Their quarterly, geo-tagged field reports and auditable compliance documentation made it effortless for our ESG committee to sanction and double our support for their watershed projects.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'test_2',
    name: 'Dr. Arundhati Nayak',
    designation: 'Director of Rural Development Programmes',
    organization: 'Nayak Global Foundation',
    quote: "Amartya Sen\'s Capability Approach is often talked about in academic journals, but Raita Mitra actually implements it. They focus on expanding real freedoms—the freedom to irrigate, the freedom to read code, the freedom to self-govern. The results are life-changing and self-sustaining.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'test_3',
    name: 'Smt. Renuka Pujar',
    designation: 'Village Panchayath President',
    organization: 'Hebsur Gram Panchayath, Hubballi',
    quote: "Unlike many NGOs who just run one-day workshops and leave, Raita Mitra\'s team stays on the ground. They work alongside our farmers, resolve daily micro-irrigation failures, and help our schools organize daily computer classes. They are like family to Hebsur.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  }
];
