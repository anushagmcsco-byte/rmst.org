import { BoardMember } from '../types';

const INITIAL_BOARD_MEMBERS: BoardMember[] = [
  {
    id: 'patil',
    name: 'Dr. Mahadevappa S. Patil',
    role: 'Founder & Chairman',
    qualification: 'Ph.D. in Agronomy, UAS Dharwad',
    description: 'A veteran agricultural scientist with over 32 years of research and teaching experience. Dr. Patil specializes in dryland soil management and crop diversification, advising several Karnataka state agricultural panels.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    focusArea: 'Sustainable Agriculture & Soil Rejuvenation',
    linkedin: 'https://linkedin.com/in/mahadevappa-patil-placeholder'
  },
  {
    id: 'kallur',
    name: 'Smt. Savitha B. Kallur',
    role: 'Managing Trustee',
    qualification: 'Master of Social Work (MSW), Karnatak University',
    description: 'An exceptional community organizer with 15+ years of experience mobilizing Self-Help Groups (SHGs) across North Karnataka. Savitha leads the trust\'s gender empowerment initiatives and grassroots field operations.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    focusArea: 'Women Empowerment, SHGs & Secondary Livelihoods',
    linkedin: 'https://linkedin.com/in/savitha-kallur-placeholder'
  },
  {
    id: 'gudadinni',
    name: 'Shri. Shivappa R. Gudadinni',
    role: 'Trustee & Treasurer',
    qualification: 'Ex-Lead District Manager, Syndicate Bank',
    description: 'Retired banking professional with over 36 years in rural credit disbursement, micro-finance linkages, and institutional audit. Shivappa oversees our strict financial controls, compliance, and CSR transparent accounting.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    focusArea: 'Corporate Governance, Financial Audits & Micro-credit',
    linkedin: 'https://linkedin.com/in/shivappa-gudadinni-placeholder'
  },
  {
    id: 'mulimani',
    name: 'Smt. Anusha G. Mulimani',
    role: 'Trustee & CSR Director',
    qualification: 'B.E., Former Corporate CSR Committee Head',
    description: 'A tech veteran and CSR planning specialist. Anusha bridges the gap between grassroots needs and corporate ESG targets, focusing on digital classrooms, AI skill development for youth, and climate mitigation frameworks.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    focusArea: 'Digital Skill Labs, CSR Alliances & Technology Enablement',
    linkedin: 'https://linkedin.com/in/anusha-mulimani-placeholder'
  }
];

const LOCAL_STORAGE_KEY = 'raita_mitra_board_members';

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
    return JSON.parse(stored);
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
