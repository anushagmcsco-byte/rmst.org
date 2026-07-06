export interface EventSpeaker {
  name: string;
  designation: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  description: string;
}

export interface EventDownload {
  title: string;
  size: string;
  type: string;
}

export interface EventTestimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
  image: string;
}

export interface EventFAQ {
  question: string;
  answer: string;
}

export interface PastHighlight {
  title: string;
  metric: string;
  image: string;
}

export interface RichEventItem {
  id: string;
  slug: string;
  title: string;
  category: 'agriculture' | 'women' | 'digital' | 'health' | 'climate' | 'entrepreneurship';
  categoryLabel: string;
  date: string; // YYYY-MM-DD
  time: string;
  venue: string;
  mode: 'Online' | 'Offline';
  seatsRemaining: number;
  totalSeats: number;
  image: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  googleCalendarUrl: string;
  description: string;
  detailedInfo: string;
  
  // Custom detail fields for the Dynamic Template (TED / Apple style)
  tagline: string;
  videoUrl?: string; // YouTube or fallback
  speakers: EventSpeaker[];
  agenda: AgendaItem[];
  testimonials: EventTestimonial[];
  faqs: EventFAQ[];
  downloads: EventDownload[];
  pastHighlights?: PastHighlight[];
  certificateAvailable: boolean;
  certificateType: string;
  locationDetails: {
    lat: number;
    lng: number;
    parking: string;
    landmarks: string[];
    address: string;
  };
}

export const RICH_EVENTS: RichEventItem[] = [
  {
    id: 'evt-ai-skills',
    slug: 'ai-skills-for-rural-youth',
    title: 'AI Skills for Rural Youth',
    category: 'digital',
    categoryLabel: 'AI & Digital Skills',
    date: '2026-07-15',
    time: '10:00 AM - 4:00 PM',
    venue: 'Digital Learning Hub, Haveri Government School',
    mode: 'Offline',
    seatsRemaining: 14,
    totalSeats: 40,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1200',
    status: 'Upcoming',
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=AI+Skills+for+Rural+Youth&dates=20260715T100000/20260715T160000&details=Vernacular+introduction+to+generative+AI+tools+by+Raita+Mitra&location=Haveri+Government+School',
    description: 'A custom vernacular introduction to generative AI tools, prompt designing, and local micro-job opportunities.',
    detailedInfo: 'This high-impact workshop introduces local high school graduates and rural youth to the foundations of the digital economy. Topics include prompt engineering, secure mobile internet usage, basic software utilities, and local e-commerce, taught completely in Kannada with low-power solar computers.',
    tagline: 'Bridging the rural-urban technical divide through direct vernacular coding and artificial intelligence literacy.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Demo video link
    speakers: [
      {
        name: 'Prof. Arun Deshpande',
        designation: 'Director of AI Literacy Initiatives & IISc Alumnus',
        role: 'Keynote Speaker & Lead Trainer',
        bio: 'Prof. Deshpande has over 15 years designing modular solar-powered hardware architectures and native language curricula to bring computer intelligence to state schools.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
        linkedin: 'https://linkedin.com'
      },
      {
        name: 'Megha Kulkarni',
        designation: 'Senior Developer at AgriTech Sol',
        role: 'Hands-on Python Instructor',
        bio: 'Megha specializes in teaching introductory algorithmic logic and block-based coding (Scratch) to first-generation learners across Karnataka.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
        linkedin: 'https://linkedin.com'
      }
    ],
    agenda: [
      { time: '10:00 AM - 10:30 AM', title: 'Registration & Welcome Keynote', description: 'Participant check-in, dynamic kit distribution, and setting the learning objectives.' },
      { time: '10:30 AM - 12:00 PM', title: 'Generative AI & LLMs in Vernacular', description: 'De-mystifying how modern language models operate. Formulating Kannada prompts for farming, business, and school work.' },
      { time: '12:00 PM - 01:00 PM', title: 'Interactive Coding & Scratch Lab', description: 'Hands-on development of logical blocks. Youth build their first functional game on local solar-powered laptops.' },
      { time: '01:00 PM - 02:00 PM', title: 'Networking Luncheon', description: 'Complimentary traditional millet lunch and interactive chat with tech industry mentors.' },
      { time: '02:00 PM - 03:30 PM', title: 'Micro-Freelancing & Job Portals', description: 'Step-by-step guidance on how to identify micro-data entry and transcription roles online securely without scams.' },
      { time: '03:30 PM - 04:00 PM', title: 'Interactive Q&A & Certificate Awards', description: 'Open-mic question round followed by QR-secured physical certificate distributions.' }
    ],
    testimonials: [
      {
        quote: 'The computer lab changed my life. I learned how to prompt artificial intelligence to translate English articles into Kannada and check soil parameters.',
        name: 'Priyanka Kumbar',
        role: 'Degree Student',
        location: 'Haveri District',
        image: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=150'
      },
      {
        quote: 'I used my phone to apply for an online data annotator position using lessons from the workshop. Now I earn while studying.',
        name: 'Ramesh Hosmani',
        role: 'Class XII Graduate',
        location: 'Byadgi Town',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150'
      }
    ],
    downloads: [
      { title: 'AI for Rural Youth Curriculum Syllabus', size: '1.2 MB', type: 'PDF Document' },
      { title: 'Interactive Scratch Coding Quick Cheat-Sheet', size: '2.5 MB', type: 'Reference Sheet' },
      { title: 'Vernacular Prompts Resource Guide', size: '4.8 MB', type: 'Illustrated Handbook' }
    ],
    faqs: [
      { question: 'Is prior computer programming experience required?', answer: 'Not at all! This course is explicitly engineered for absolute beginners. We teach digital logic from the absolute ground up in Kannada.' },
      { question: 'Will computers be provided on-site?', answer: 'Yes, Raita Mitra Social Trust installs its custom low-power solar workstations at the school lab for use by all registered attendees during the workshop.' },
      { question: 'Is there a registration fee?', answer: 'No, all public educational training programs hosted by Raita Mitra Social Trust are entirely free of cost, funded via CSR partnerships.' }
    ],
    pastHighlights: [
      { title: 'Haveri Digital Drive', metric: '340+ Students Certified', image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=300' },
      { title: 'School Systems Activated', metric: '12 Active Solar Labs', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=300' }
    ],
    certificateAvailable: true,
    certificateType: 'ISO 9001:2015 Digital Skills Credentials',
    locationDetails: {
      lat: 14.7964,
      lng: 75.3999,
      parking: 'Ample free parking inside the school playground gateway',
      landmarks: ['Opposite Government Taluk Hospital', 'Next to Haveri Public Library Clocktower'],
      address: 'Digital Learning Wing, Govt Boys High School Compound, Haveri, Karnataka - 581110'
    }
  },
  {
    id: 'evt-farmer-awareness',
    slug: 'farmer-awareness-program',
    title: 'Regenerative Agriculture Masterclass',
    category: 'agriculture',
    categoryLabel: 'Agriculture Programs',
    date: '2026-07-18',
    time: '09:30 AM - 01:30 PM',
    venue: 'Raita Mitra Demonstration Field, Dharwad',
    mode: 'Offline',
    seatsRemaining: 8,
    totalSeats: 60,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=1200',
    status: 'Upcoming',
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Regenerative+Agriculture+Masterclass&dates=20260718T093000/20260718T133000&details=Hands-on+natural+farming+composting+and+bio-inputs&location=Raita+Mitra+Demonstration+Field,+Dharwad',
    description: 'Learn bio-pesticide preparation (Jeevamrutha), organic composting, and soil microbiomics in detail.',
    detailedInfo: 'A hands-on, muddy-boots workshop designed for marginal and smallholder farmers. Participants will witness live formulation of organic insect repellents, learn soil health testing using basic test kits, and discover micro-irrigation techniques to survive arid summer cycles.',
    tagline: 'Restoring native humic topsoil density and drastically lowering chemical fertilizer costs through microbial science.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    speakers: [
      {
        name: 'Dr. Basavaraj Patil',
        designation: 'Regenerative Agronomist & Organic Input Expert',
        role: 'Lead Field Facilitator',
        bio: 'An expert in dryland agricultural biology, Dr. Patil has converted 2,500+ acres of chemical-ridden clay soil into self-healing, bio-diverse fertile structures.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
        linkedin: 'https://linkedin.com'
      }
    ],
    agenda: [
      { time: '09:30 AM - 10:00 AM', title: 'Traditional Soil Greeting & Registration', description: 'Farmers gather around the live input setup with local seeds display.' },
      { time: '10:00 AM - 11:30 AM', title: 'Jeevamrutha Formulation Workshop', description: 'Step-by-step mixing of native cow dung, cow urine, jaggery, pulses flour, and forest soil to multiply microflora.' },
      { time: '11:30 AM - 12:30 PM', title: 'Humic Acid & Multi-cropping Science', description: 'How root exudates feed mycorrhizal networks to capture deep water table levels.' },
      { time: '12:30 PM - 01:30 PM', title: 'Free Soil Testing Kit Demonstration & Closing', description: 'Distributing portable soil test reagents and discussing organic certification procedures.' }
    ],
    testimonials: [
      {
        quote: 'My pesticide cost fell to zero using Dr. Patil’s neem decoction formula. The cotton yields are extremely stable.',
        name: 'Malleshappa Gowda',
        role: 'Marginal Farmer',
        location: 'Savadatti Taluk',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
      }
    ],
    downloads: [
      { title: 'Bio-Organic Formulation Playbook (Kannada)', size: '3.4 MB', type: 'Illustrated Manual' },
      { title: 'Regenerative Soil Assessment Chart', size: '1.1 MB', type: 'Field Sheet' }
    ],
    faqs: [
      { question: 'What should we bring with us?', answer: 'Please wear comfortable field clothes and boots. We highly encourage bringing a 250g dry sample of your farm soil for live pH testing!' }
    ],
    certificateAvailable: true,
    certificateType: 'Agronomic Soil Restoration Certificate',
    locationDetails: {
      lat: 15.4589,
      lng: 75.0078,
      parking: 'Dedicated tractor and vehicle parking next to the main field water well',
      landmarks: ['Behind the Hebballi Village Panchayat Office', '3km from Dharwad bypass toll plaza'],
      address: 'Raita Mitra Eco-Demonstration Farm, Survey No. 42, Hebballi Road, Dharwad District, Karnataka - 580005'
    }
  },
  {
    id: 'evt-women-entrepreneur',
    slug: 'women-entrepreneurship-workshop',
    title: 'Women Entrepreneurship & SHG Finance',
    category: 'women',
    categoryLabel: 'Women Empowerment',
    date: '2026-07-22',
    time: '11:00 AM - 03:00 PM',
    venue: 'Town Panchayat Hall, Belagavi',
    mode: 'Offline',
    seatsRemaining: 22,
    totalSeats: 50,
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200',
    status: 'Upcoming',
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Women+Entrepreneurship+Workshop&dates=20260722T110000/20260722T150000&details=SHG+financial+record-keeping+and+dairy+logistics&location=Town+Panchayat+Hall,+Belagavi',
    description: 'Capacity building and record-keeping workshops for dairy cooperatives and rural handicraft collectives.',
    detailedInfo: 'This module is tailored for Self-Help Groups (SHGs) entering rural trade. We cover simple double-entry bookkeeping, digital UPI payments, micro-grant applications, and cold-chain supply logistics for farm-gate dairy milk producers.',
    tagline: 'Fostering financial self-reliance and establishing scalable female-led micro-enterprises with institutional backings.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    speakers: [
      {
        name: 'Smt. Lakshmi Devamma',
        designation: 'NABARD Rural Cooperative Fellow',
        role: 'Main Speaker & Financial Consultant',
        bio: 'Smt. Lakshmi Devamma has spent 25 years in rural banking, forming over 400 cooperative credit federations across dryland regions.',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=300',
        linkedin: 'https://linkedin.com'
      }
    ],
    agenda: [
      { time: '11:00 AM - 11:30 AM', title: 'SHG Roll Call & Icebreaker', description: 'Introductions from different local village milk and weaving unions.' },
      { time: '11:30 AM - 01:00 PM', title: 'Cooperative Auditing & UPI Setup', description: 'Practicing cashless vendor transactions and bookkeeping ledgers.' },
      { time: '01:00 PM - 01:45 PM', title: 'Traditional Lunch Break', description: 'Millet rotis, buttermilk, and discussions on packaging and market channels.' },
      { time: '01:45 PM - 03:00 PM', title: 'Government Grants & NABARD Schemes', description: 'Completing sample application templates for interest-free machinery capital loans.' }
    ],
    testimonials: [
      {
        quote: 'Our SHG avoided high-interest local loan sharks because of NABARD schemes explained by Lakshmi Ma’am.',
        name: 'Rukmini Savadatti',
        role: 'SHG Co-op Treasurer',
        location: 'Belagavi District',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'
      }
    ],
    downloads: [
      { title: 'SHG Double Entry Ledger Template', size: '2.1 MB', type: 'Excel / PDF' },
      { title: 'NABARD Rural Credit Subsidy Brochure', size: '1.4 MB', type: 'Govt Circular PDF' }
    ],
    faqs: [
      { question: 'Do participants need a bank account already?', answer: 'It is helpful but not mandatory. We will have bank representatives present to open PMJDY accounts for eligible members on the spot!' }
    ],
    certificateAvailable: true,
    certificateType: 'Cooperative Financial Management Certificate',
    locationDetails: {
      lat: 15.8497,
      lng: 74.4977,
      parking: 'Public parking across the street at the Belagavi Fort Municipal ground',
      landmarks: ['Opposite Fort Lake Walkway Gateway', 'Near Central Police Commissionerate'],
      address: 'Town Panchayat Main Auditorium, Fort Road Area, Belagavi, Karnataka - 590016'
    }
  },
  {
    id: 'evt-miyawaki-climate',
    slug: 'climate-action-drive',
    title: 'Miyawaki Forestation & Watershed Drive',
    category: 'climate',
    categoryLabel: 'Climate Action',
    date: '2026-07-28',
    time: '08:00 AM - 11:30 AM',
    venue: 'Arid Lands Perimeter, Bagalkot',
    mode: 'Offline',
    seatsRemaining: 45,
    totalSeats: 100,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    status: 'Upcoming',
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Miyawaki+Forestation+Drive&dates=20260728T080000/20260728T113000&details=Planting+dense+indigenous+woodland+systems&location=Bagalkot+Arid+Lands',
    description: 'A physical tree-planting campaign combined with training in dense afforestation and water conservation.',
    detailedInfo: 'Help build a drought-shield urban forest patch. This community activity teaches school youth and civic volunteers how to design rich native sapling grids that require minimal water and grow 10x faster than traditional plantations.',
    tagline: 'Mitigating climate warming margins by constructing robust microclimate ecosystems using native wood biomass.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    speakers: [
      {
        name: 'Shri Suresh Hegde',
        designation: 'Distinguished Environmentalist & Miyawaki Advocate',
        role: 'Campaign Lead',
        bio: 'Shri Suresh has successfully raised 45 micro-forest patches across arid regions of Deccan Plateau using purely indigenous organic soil boosters.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
        linkedin: 'https://linkedin.com'
      }
    ],
    agenda: [
      { time: '08:00 AM - 08:30 AM', title: 'Sapling Distribution & Bio-mulch preparation', description: 'Volunteers pick up native species and mix coconut coir dust and straw.' },
      { time: '08:30 AM - 10:30 AM', title: 'Dense Miyawaki Planting Round', description: 'Strategic grid planting of 3 saplings per square meter to trigger upward competitive survival hormones.' },
      { time: '10:30 AM - 11:30 AM', title: 'Watershed Bund Construction', description: 'Shaping earth channels to ensure immediate monsoonal rain is stored directly next to roots.' }
    ],
    testimonials: [
      {
        quote: 'Seeing dry lakebeds transform into green shade cover is the most rewarding community action I have ever joined.',
        name: 'Vinayak Patil',
        role: 'College Volunteer',
        location: 'Bagalkot Town',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150'
      }
    ],
    downloads: [
      { title: 'Dryland Miyawaki Species Guidebook', size: '5.2 MB', type: 'Illustrated Flora Guide' },
      { title: 'Decentralized Rainwater Earthwork Blueprints', size: '2.8 MB', type: 'Technical Drawings' }
    ],
    faqs: [
      { question: 'Will planting tools and gloves be provided?', answer: 'Yes! Raita Mitra Social Trust provides fully sanitized shovels, trench hoes, canvas gloves, and custom wind-resistant sapling guards.' }
    ],
    certificateAvailable: true,
    certificateType: 'Ecosystem Restoration Volunteer Credentials',
    locationDetails: {
      lat: 16.1822,
      lng: 75.6984,
      parking: 'Ample gravel parking beside the Lake Rejuvenation stone monument',
      landmarks: ['Opposite Bagalkot Sector 12 Solar Station', 'Along the Ghataprabha River feeder canal'],
      address: 'Miyawaki Project Site, Arid Sector Bypass, Bagalkot District, Karnataka - 587102'
    }
  }
];
