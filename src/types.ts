export interface BoardMember {
  id: string;
  name: string;
  role: string;
  qualification: string;
  description: string;
  image: string;
  focusArea?: string;
  linkedin?: string;
  isEditable?: boolean;
}

export interface ProgramMetric {
  label: string;
  value: string;
}

export interface Program {
  id: string;
  title: string;
  tagline: string;
  description: string;
  detailedOverview: string;
  beneficiaries: string;
  keyMetrics: ProgramMetric[];
  image: string;
  highlights: string[];
  activities: string[];
}

export interface ImpactStory {
  id: string;
  title: string;
  beneficiaryName: string;
  age: number;
  location: string;
  narrative: string;
  beforeTrust: string;
  afterTrust: string;
  quote: string;
  focusArea: string;
  image: string;
  date: string;
}

export interface ComplianceDocument {
  id: string;
  title: string;
  description: string;
  category: 'registration' | 'tax' | 'financial' | 'report' | 'policy';
  refNo: string;
  date: string;
  downloadUrl: string;
  size: string;
}

export interface GeoFieldReport {
  id: string;
  title: string;
  date: string;
  location: string;
  latitude: number;
  longitude: number;
  activity: string;
  description: string;
  beneficiariesCount: number;
  officerName: string;
  imageUrl: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'insight' | 'news' | 'press' | 'report';
  author: string;
  date: string;
  image: string;
  readTime: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  organization: string;
  quote: string;
  rating: number;
  image: string;
}

export interface PartnerLogo {
  name: string;
  type: 'csr' | 'foundation' | 'government';
  logoText: string;
}

export interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  raised: number;
  target: number;
  donorsCount: number;
  category: string;
  image: string;
}
