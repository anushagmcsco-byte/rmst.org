import { ComplianceDocument, GeoFieldReport } from '../types';

export const COMPLIANCE_IDENTIFIERS = {
  ngo_darpan_id: 'KA/2023/0342549',
  csr_registration_number: 'CSR00059487',
  pan: 'AAETR3286K',
  urn_12a: 'AAETR3286KE20221',
  urn_80g: 'AAETR3286KF20231',
  incorporation_date: 'August 12, 2021',
  headquarters: '#37, First Floor, Pride Icon, Gokul Road, Hubballi – 580030, Karnataka, India'
};

export const complianceDocuments: ComplianceDocument[] = [
  {
    id: 'csr_1',
    title: 'MCA CSR-1 Registration Certificate',
    description: 'Official approval from the Ministry of Corporate Affairs, Government of India, certifying Raita Mitra for undertaking corporate CSR activities.',
    category: 'registration',
    refNo: 'CSR00059487',
    date: '2023-04-18',
    downloadUrl: '#',
    size: '1.2 MB'
  },
  {
    id: 'darpan',
    title: 'NITI Aayog NGO Darpan Unique ID Document',
    description: 'Registration profile and verification certificate from NITI Aayog portal for institutional project matching.',
    category: 'registration',
    refNo: 'KA/2023/0342549',
    date: '2023-09-02',
    downloadUrl: '#',
    size: '850 KB'
  },
  {
    id: 'cert_12a',
    title: 'Income Tax 12A Permanent Registration',
    description: 'Order granting lifetime income tax exemption to Raita Mitra Social Trust under Section 12A of the Income Tax Act, 1961.',
    category: 'tax',
    refNo: 'AAETR3286KE20221',
    date: '2022-11-05',
    downloadUrl: '#',
    size: '1.8 MB'
  },
  {
    id: 'cert_80g',
    title: 'Income Tax 80G Exemption Approval',
    description: 'Certificate granting 50% tax exemption on donations made by individuals or corporations to the Trust under Section 80G.',
    category: 'tax',
    refNo: 'AAETR3286KF20231',
    date: '2023-01-24',
    downloadUrl: '#',
    size: '1.9 MB'
  },
  {
    id: 'audit_24_25',
    title: 'Audited Financial Statements (FY 2024-25)',
    description: 'Complete Balance Sheet, Income & Expenditure Statement, Receipts & Payments Statement, and Auditor\'s Report certified by M/s Hegde & Associates, Chartered Accountants.',
    category: 'financial',
    refNo: 'HA/AUD/24-25/082',
    date: '2025-06-15',
    downloadUrl: '#',
    size: '3.4 MB'
  },
  {
    id: 'audit_23_24',
    title: 'Audited Financial Statements (FY 2023-24)',
    description: 'Annual financial audit statements and transaction logs, filed and audited under strict NGO reporting rules.',
    category: 'financial',
    refNo: 'HA/AUD/23-24/114',
    date: '2024-06-20',
    downloadUrl: '#',
    size: '2.9 MB'
  },
  {
    id: 'annual_report_24_25',
    title: 'Annual Progress & Impact Report 2024-25',
    description: 'Comprehensive narrative detailing program completions, village-wise beneficiary counts, and audited metrics for our six focus areas.',
    category: 'report',
    refNo: 'RMST/AR/2024-25',
    date: '2025-06-28',
    downloadUrl: '#',
    size: '5.2 MB'
  },
  {
    id: 'itr_7_24',
    title: 'Income Tax Return Form ITR-7 (AY 2024-25)',
    description: 'Submitted copy of the Trust\'s official annual Income Tax return for assessment year 2024-25.',
    category: 'tax',
    refNo: 'ITR7-65824961502',
    date: '2024-10-15',
    downloadUrl: '#',
    size: '1.5 MB'
  },
  {
    id: 'policy_whistle',
    title: 'Whistleblower & Anti-Bribery Policy',
    description: 'Strict guidelines and anonymous reporting channels ensuring zero-tolerance for corruption, commercial bribery, or misappropriation.',
    category: 'policy',
    refNo: 'RMST/POL/01-A',
    date: '2021-09-01',
    downloadUrl: '#',
    size: '640 KB'
  },
  {
    id: 'policy_child',
    title: 'Child Protection & Safeguarding Policy',
    description: 'Framework to prevent exploitation, child labor, or discrimination across all educational digital labs and community sessions supported by the trust.',
    category: 'policy',
    refNo: 'RMST/POL/04-C',
    date: '2021-09-01',
    downloadUrl: '#',
    size: '780 KB'
  },
  {
    id: 'policy_gender',
    title: 'Gender Equality, Inclusion & Prevention of Sexual Harassment',
    description: 'Internal POSH framework, code of conduct, and grievance committees to protect women employees, volunteers, and beneficiaries.',
    category: 'policy',
    refNo: 'RMST/POL/03-G',
    date: '2021-09-01',
    downloadUrl: '#',
    size: '920 KB'
  }
];

export const geoFieldReports: GeoFieldReport[] = [
  {
    id: 'geo_1',
    title: 'Solar Drip Irrigation Hub Installation',
    date: '2026-05-14',
    location: 'Hebsur Village, Hubballi Taluk',
    latitude: 15.4372,
    longitude: 75.2843,
    activity: 'Agriculture',
    description: 'Completed the installation of a 5HP solar-powered water pump connected to a customized drip grid covering 14 smallholder farms. This setup eliminates electricity blackouts and cuts dry-season crop failure to zero.',
    beneficiariesCount: 42,
    officerName: 'Suresh Patil (Field Director)',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'geo_2',
    title: 'Rural Smart Digital Lab Launch',
    date: '2026-06-02',
    location: 'Kundgol Government High School',
    latitude: 15.2581,
    longitude: 75.2494,
    activity: 'Education',
    description: 'Inaugurated a modular classroom with 15 modern low-power tablets, high-speed regional Wi-Fi router, and standard interactive STEM software. Local youth trained as part-time mentors.',
    beneficiariesCount: 180,
    officerName: 'Anusha G. Mulimani (CSR Lead)',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'geo_3',
    title: 'Community Dairy Chilling Center Setup',
    date: '2026-04-20',
    location: 'Yaraguppi Village, Kalghatgi Taluk',
    latitude: 15.1842,
    longitude: 75.0115,
    activity: 'Women Empowerment',
    description: 'Provided cooperative milk testing equipment, automated weighing machines, and a 1,000-liter bulk chilling unit for an all-women SHG micro-cooperative. Boosts local dairy price yield by ₹4 per liter.',
    beneficiariesCount: 64,
    officerName: 'Savitha B. Kallur (Managing Trustee)',
    imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'geo_4',
    title: 'Desilting and Bunding of Amrit Sarovar Lake',
    date: '2026-05-28',
    location: 'Byadagi Village, Haveri District',
    latitude: 14.6811,
    longitude: 75.4522,
    activity: 'Climate Action',
    description: 'Removed 1,400 tractor-loads of clay silt from the community lake bed and reinforced the borders with deep-root Vetiver grass. Recharges ground wells within 3 kilometers.',
    beneficiariesCount: 1200,
    officerName: 'Basavaraj Hiremath (Hydrologist)',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'geo_5',
    title: 'Millet Processing and Flour Mill Setup',
    date: '2026-06-12',
    location: 'Shiggaon Rural Enterprise Zone',
    latitude: 14.9961,
    longitude: 75.2285,
    activity: 'Rural Entrepreneurship',
    description: 'Inaugurated a millet de-huller, pulverizer, and clean packaging station operated by three trained local engineering dropouts. Mill serves farmers from 8 neighboring villages.',
    beneficiariesCount: 150,
    officerName: 'Shivappa Gudadinni (Financial Advisor)',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400'
  }
];
