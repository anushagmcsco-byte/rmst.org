import { BoardMember } from '../types';

const INITIAL_BOARD_MEMBERS: BoardMember[] = [
  {
    id: 'patil',
    name: 'Dr. Mahadevappa S. Patil',
    role: 'Founder & Chairman',
    qualification: 'Ph.D. in Agronomy, UAS Dharwad',
    description: 'A veteran agricultural scientist with over 32 years of research and teaching experience. Dr. Patil specializes in dryland soil management and crop diversification, advising several Karnataka state agricultural panels.',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=400',
    focusArea: 'Sustainable Agriculture & Soil Rejuvenation',
    linkedin: 'https://linkedin.com/in/mahadevappa-patil-placeholder'
  },
  {
    id: 'kallur',
    name: 'Smt. Savitha B. Kallur',
    role: 'Managing Trustee',
    qualification: 'Master of Social Work (MSW), Karnatak University',
    description: 'An exceptional community organizer with 15+ years of experience mobilizing Self-Help Groups (SHGs) across North Karnataka. Savitha leads the trust\'s gender empowerment initiatives and grassroots field operations.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=400',
    focusArea: 'Women Empowerment, SHGs & Secondary Livelihoods',
    linkedin: 'https://linkedin.com/in/savitha-kallur-placeholder'
  },
  {
    id: 'gudadinni',
    name: 'Shri. Shivappa R. Gudadinni',
    role: 'Trustee & Treasurer',
    qualification: 'Ex-Lead District Manager, Syndicate Bank',
    description: 'Retired banking professional with over 36 years in rural credit disbursement, micro-finance linkages, and institutional audit. Shivappa oversees our strict financial controls, compliance, and CSR transparent accounting.',
    image: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=400',
    focusArea: 'Corporate Governance, Financial Audits & Micro-credit',
    linkedin: 'https://linkedin.com/in/shivappa-gudadinni-placeholder'
  },
  {
    id: 'mulimani',
    name: 'Smt. Anusha G. Mulimani',
    role: 'Trustee & CSR Director',
    qualification: 'B.E., Former Corporate CSR Committee Head',
    description: 'A tech veteran and CSR planning specialist. Anusha bridges the gap between grassroots needs and corporate ESG targets, focusing on digital classrooms, AI skill development for youth, and climate mitigation frameworks.',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=400',
    focusArea: 'Digital Skill Labs, CSR Alliances & Technology Enablement',
    linkedin: 'https://linkedin.com/in/anusha-mulimani-placeholder'
  }
];

const LOCAL_STORAGE_KEY = 'raita_mitra_board_members_v2';

export function getBoardMembers(): BoardMember[] {
  if (typeof window === 'undefined') {
    return INITIAL_BOARD_MEMBERS;
  }
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_BOARD_MEMBERS));
    return INITIAL_BOARD_MEMBERS;
  }
  try {
    const parsed = JSON.parse(stored);
    if (parsed && Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_BOARD_MEMBERS;
  } catch (e) {
    console.error('Error parsing board members, resetting store:', e);
    return INITIAL_BOARD_MEMBERS;
  }
}

export function saveBoardMembers(members: BoardMember[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(members));
  }
}

export function resetBoardMembers(): BoardMember[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_BOARD_MEMBERS));
  }
  return INITIAL_BOARD_MEMBERS;
}
