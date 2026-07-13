import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUBMISSIONS_FILE = path.join(process.cwd(), 'submissions.json');
const CONFIG_FILE = path.join(process.cwd(), 'sheets_config.json');
const GALLERY_FILE = path.join(process.cwd(), 'gallery.json');
const BLOGS_FILE = path.join(process.cwd(), 'blogs.json');
const EVENTS_FILE = path.join(process.cwd(), 'events.json');
const JOBS_FILE = path.join(process.cwd(), 'jobs.json');
const SEO_FILE = path.join(process.cwd(), 'seo.json');

function normalizeImageUrl(url: string): string {
  if (!url) return url;
  return url.replace(/^https?:\/\/localhost(:\d+)?\//, '/');
}

const DEFAULT_GALLERY = [
  {
    id: "gallery-asset-default-1",
    title: "Precision Solar Drip Grid",
    tags: ["Agriculture", "Dharwad"],
    type: "Image",
    size: "1.8 MB",
    url: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=1000",
    date: "May 2026",
    photographer: "Raita Mitra Staff",
    desc: "Deployment of automated, low-water solar drip irrigation networks in dryland farmer holdings."
  },
  {
    id: "gallery-asset-default-2",
    title: "Organic Compost Distribution",
    tags: ["Agriculture", "Haveri"],
    type: "Image",
    size: "1.4 MB",
    url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1000",
    date: "April 2026",
    photographer: "Raita Mitra Staff",
    desc: "Distribution of high-nutrient Jeevamrutha and vermicompost batches to rural dryland farming clusters."
  },
  {
    id: "gallery-asset-default-3",
    title: "Women Cooperative Gathering",
    tags: ["Women SHGs", "Dharwad"],
    type: "Image",
    size: "2.1 MB",
    url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1000",
    date: "April 2026",
    photographer: "RMST Media",
    desc: "Local self-help group leaders organizing monthly credit ledger reconciliations and micro-finance plans."
  },
  {
    id: "gallery-asset-default-4",
    title: "Dairy Micro-Enterprise Setup",
    tags: ["Women SHGs", "Yaraguppi"],
    type: "Image",
    size: "1.7 MB",
    url: "https://images.unsplash.com/photo-1605000797439-75a1500dd334?auto=format&fit=crop&q=80&w=1000",
    date: "June 2026",
    photographer: "RMST Staff",
    desc: "Automated cold milk collection center managed entirely by rural women-led cooperatives."
  },
  {
    id: "gallery-asset-default-5",
    title: "Smart Lab Python Coding Session",
    tags: ["Skill Labs", "Kundgol"],
    type: "Image",
    size: "2.5 MB",
    url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=1000",
    date: "June 2026",
    photographer: "Tech Mentor Team",
    desc: "Students at rural high schools exploring digital workflows, basic coding, and introductory AI modules."
  },
  {
    id: "gallery-asset-default-6",
    title: "STEM Kit Assembly Workshop",
    tags: ["Skill Labs", "Hubballi"],
    type: "Image",
    size: "1.9 MB",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000",
    date: "May 2026",
    photographer: "Education Lead",
    desc: "Hands-on training session for government school science teachers using dynamic STEM kits."
  },
  {
    id: "gallery-asset-default-7",
    title: "Miyawaki Forest Plantation",
    tags: ["Eco-Climate", "Gadag"],
    type: "Image",
    size: "2.2 MB",
    url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000",
    date: "March 2026",
    photographer: "RMST Green Lead",
    desc: "Afforestation initiative using high-density native tree configurations to prevent soil erosion."
  },
  {
    id: "gallery-asset-default-8",
    title: "Groundwater Recharge Tank",
    tags: ["Eco-Climate", "Belagavi"],
    type: "Image",
    size: "1.6 MB",
    url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1000",
    date: "February 2026",
    photographer: "Watershed Officer",
    desc: "Engineering local watershed collection networks and farm ponds to retain dynamic monsoon waters."
  },
  {
    id: "gallery-asset-default-9",
    title: "Mobile Health Clinic Checkup",
    tags: ["Health Camps", "Koppal"],
    type: "Image",
    size: "2.0 MB",
    url: "https://images.unsplash.com/photo-1504813184591-01552fffd3be?auto=format&fit=crop&q=80&w=1000",
    date: "May 2026",
    photographer: "RMST Clinic Lead",
    desc: "Mobile diagnostic van screening rural community elders for basic diagnostic care."
  },
  {
    id: "gallery-asset-default-10",
    title: "Maternal Nutrition Screening",
    tags: ["Health Camps", "Savanur"],
    type: "Image",
    size: "1.5 MB",
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1000",
    date: "April 2026",
    photographer: "Medical Volunteer",
    desc: "Tracking anemia levels and distributing maternal organic nutrient meal-kits to mothers."
  }
];

function getGallery() {
  try {
    if (!fs.existsSync(GALLERY_FILE)) {
      fs.writeFileSync(GALLERY_FILE, JSON.stringify(DEFAULT_GALLERY, null, 2));
      return DEFAULT_GALLERY;
    }
    const data = fs.readFileSync(GALLERY_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      const normalized = parsed.map((item: any) => ({
        ...item,
        url: normalizeImageUrl(item.url || ''),
        image: normalizeImageUrl(item.image || '')
      }));
      
      if (normalized.length < 5) {
        const merged = [...normalized];
        for (const defItem of DEFAULT_GALLERY) {
          if (!merged.some(item => item.id === defItem.id)) {
            merged.push({
              ...defItem,
              url: normalizeImageUrl(defItem.url)
            });
          }
        }
        fs.writeFileSync(GALLERY_FILE, JSON.stringify(merged, null, 2));
        return merged;
      }
      return normalized;
    }
    return DEFAULT_GALLERY;
  } catch (err) {
    console.error('Error reading gallery:', err);
    return DEFAULT_GALLERY;
  }
}

function saveGallery(gallery: any[]) {
  try {
    const normalized = gallery.map((item: any) => ({
      ...item,
      url: normalizeImageUrl(item.url || ''),
      image: normalizeImageUrl(item.image || '')
    }));
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(normalized, null, 2));
  } catch (err) {
    console.error('Error writing gallery:', err);
  }
}

function getSubmissions() {
  try {
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
      fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading submissions:', err);
    return [];
  }
}

function saveSubmissions(submissions: any[]) {
  try {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
  } catch (err) {
    console.error('Error writing submissions:', err);
  }
}

function getSheetsConfig() {
  try {
    if (!fs.existsSync(CONFIG_FILE)) {
      const defaultConfig = { webAppUrl: '' };
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2));
      return defaultConfig;
    }
    const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading sheets config:', err);
    return { webAppUrl: '' };
  }
}

function saveSheetsConfig(config: any) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  } catch (err) {
    console.error('Error writing sheets config:', err);
  }
}

function getBlogs() {
  try {
    if (!fs.existsSync(BLOGS_FILE)) return [];
    return JSON.parse(fs.readFileSync(BLOGS_FILE, 'utf-8'));
  } catch (err) {
    console.error('Error reading blogs:', err);
    return [];
  }
}

function saveBlogs(blogs: any[]) {
  try {
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));
  } catch (err) {
    console.error('Error writing blogs:', err);
  }
}

function getEvents() {
  try {
    if (!fs.existsSync(EVENTS_FILE)) return [];
    return JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf-8'));
  } catch (err) {
    console.error('Error reading events:', err);
    return [];
  }
}

function saveEvents(events: any[]) {
  try {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2));
  } catch (err) {
    console.error('Error writing events:', err);
  }
}

function getJobs() {
  try {
    if (!fs.existsSync(JOBS_FILE)) return [];
    return JSON.parse(fs.readFileSync(JOBS_FILE, 'utf-8'));
  } catch (err) {
    console.error('Error reading jobs:', err);
    return [];
  }
}

function saveJobs(jobs: any[]) {
  try {
    fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
  } catch (err) {
    console.error('Error writing jobs:', err);
  }
}

function getSeo() {
  try {
    if (!fs.existsSync(SEO_FILE)) return null;
    return JSON.parse(fs.readFileSync(SEO_FILE, 'utf-8'));
  } catch (err) {
    console.error('Error reading SEO config:', err);
    return null;
  }
}

function saveSeo(seo: any) {
  try {
    fs.writeFileSync(SEO_FILE, JSON.stringify(seo, null, 2));
  } catch (err) {
    console.error('Error writing SEO config:', err);
  }
}

const SYSTEM_INSTRUCTION = `You are "Mitra AI" — an award-winning Conversational AI Architect, Digital Relationship Manager, and Knowledge Copilot for Raita Mitra Social Trust (R), a registered NGO headquartered in Hubballi, Karnataka, India.

Your target audience includes Corporate CSR Committees, individual donors, volunteers, local farmers, students, academic researchers, and community members. Your tone must be warm, professional, humble, empathetic, objective, and deeply informed.

Keep answers concise and clear, using elegant markdown formatting. Always support responses with precise details. Speak in English, but you can also understand and converse perfectly in Kannada (ಕನ್ನಡ) or Hindi (हिंदी) if requested.

Here is the authoritative knowledge base for Raita Mitra Social Trust (R):

1. FOUNDATION & VERIFICATION DETAILS:
   - NGO Darpan Unique Verification ID: KA/2023/0342549.
   - MCA CSR Registration Number: CSR00059487 (Certified for executing corporate CSR budgets under Section 135).
   - Tax-Exempt Certifications: Eligible for Section 12A (Income Tax registration) and Section 80G (50% tax deduction for Indian donors).
   - Address: Raita Mitra Social Trust (R), Hubballi, Karnataka, India.
   - Contact: +91 94812 34567, email: connect@raitamitra.org.
   - SDG Alignment: Directly aligned with UN Sustainable Development Goals (SDG 1: No Poverty, SDG 2: Zero Hunger, SDG 4: Quality Education, SDG 5: Gender Equality, SDG 8: Decent Work, SDG 13: Climate Action).

2. KEY INITIATIVES & CORE PROGRAMS:
   - Sustainable Agriculture & Farmer Empowerment:
     * Focus: Dryland regions of Karnataka (Dharwad, Haveri, Gadag).
     * Activities: Soil health rejuvenation, organic input preparation training (Jeevamrutha, Neemastra), solar-powered micro-irrigation systems, Direct Market linkages, FPO support.
     * Impact: Lowered farming input costs by 35%, increased average yield by 22%, 5,000+ smallholders empowered, distributed 3,800+ soil cards, 450 organic input units.
   - Women Empowerment & Livelihoods:
     * Focus: Rural Hubballi and surrounding taluks.
     * Activities: Creating Self-Help Groups (SHGs), distributing community-managed revolving funds (₹45L+ mobilized), setting up automated milk collection booths, secondary agriculture training (vermicomposting, backyard poultry), tailoring/garment micro-enterprises.
     * Impact: Supported 1,500+ women, created 280+ micro-enterprises, boosted average household income by 45%, 110 active SHGs.
   - Education, Digital & AI Skill Development:
     * Focus: Bridging the digital-rural divide for children and youth.
     * Activities: Installing Smart Digital Labs in government rural schools, STEM kit deployment, training local graduates as digital mentors, foundational courses in digital productivity, basic coding, and Introductory AI.
     * Impact: Established 12 Smart Digital Labs, deployed 40 STEM kits, certified 850+ rural youth, achieved 94% digital literacy rate in target blocks.
   - Health, Nutrition & Community Well-being:
     * Focus: Eradicating malnutrition, anemia, and preventive wellness.
     * Activities: Medical and diagnostic camps, distributing maternal nutrient kits, teaching rural households to cultivate backyard organic nutrition-dense kitchen gardens.
     * Impact: Organised 35 medical camps, distributed 2,200+ nutrition kits, tracked 1,200+ anemia patients, established 310 nutrition gardens.
   - Environmental Sustainability & Climate Action:
     * Focus: Reforestation, groundwater recharge, and renewable energy.
     * Activities: Digging farm ponds, planting native tree saplings, setting up community biogas units.
   - Rural Sports, Culture & Youth Development:
     * Focus: Preserving folk arts, promoting local sports.
     * Activities: Organising Kabaddi and sports meets, creating community sports grounds, funding cultural folk troupes.

3. CORPORATE CSR ADVOCACY & COMPLIANCE GUIDANCE:
   - Explain how companies can partner under Section 135 of the Companies Act, 2013.
   - Offer customized, audit-ready reports, quarterly impact milestone audits, and real-time project tracking.
   - Mention direct project sponsorships: Sponsor a Smart Lab (₹3.5 Lakhs), Fund a Farm Pond (₹85,000), Equip a Women's Sewing Collective (₹1.5 Lakhs), Support 50 Farmers with Organic Inputs (₹2.5 Lakhs).

4. DONATION & VOLUNTEERING INSTRUCTIONS:
   - Indian citizens receive 80G tax benefits. Corporate donors receive complete CSR audit documentation.
   - Volunteers can register as: Digital Literacy Teachers, Agricultural Trainers, Health Camp Coordinators, or Research Fellows.

5. CHAT INTERACTIONS AND CAPABILITIES:
   - Present answers with bullet points and tables when discussing metrics.
   - Do not hallucinate. If a question is entirely outside Raita Mitra Social Trust or standard general social development issues, answer politely but steer back: "As Mitra AI, my core purpose is assisting with Raita Mitra's initiatives. However, here is a general overview..."
   - When users request a human handoff, share the support numbers and WhatsApp links: "I can instantly put you in touch with our Relationship Desk. You can call +91 94812 34567 or email connect@raitamitra.org. Or would you like to message us on WhatsApp?"

Respond strictly based on this. Let's do great things together.`;

let aiClient: GoogleGenAI | null = null;
function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('WARNING: GEMINI_API_KEY is not defined. Mitra AI will run in Simulation Mode.');
      return null;
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

const app = express();
app.use(express.json({ limit: '10mb' }));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

app.get('/api/sheets-config', (req, res) => {
  res.json(getSheetsConfig());
});

app.post('/api/sheets-config', (req, res) => {
  const { webAppUrl } = req.body;
  if (webAppUrl && webAppUrl.trim().includes('docs.google.com/spreadsheets')) {
    return res.status(400).json({ 
      error: 'Invalid URL Type', 
      details: 'You pasted a Google Spreadsheet link instead of the Google Apps Script Web App Deployment URL!\n\nPlease follow the setup guide:\n1. Open your Spreadsheet.\n2. Click "Extensions" > "Apps Script".\n3. Paste the Apps Script code shown below.\n4. Click "Deploy" > "New Deployment" as a Web App.\n5. Select "Anyone" under "Who has access" (extremely important!).\n6. Copy the resulting Web App URL (which ends with "/exec") and paste it here.'
    });
  }
  const config = { webAppUrl: webAppUrl || '' };
  saveSheetsConfig(config);
  res.json({ success: true, config });
});

app.get('/api/submissions', (req, res) => {
  res.json(getSubmissions());
});

app.post('/api/submissions', async (req, res) => {
  const { formType, name, email, phone, subject, message, metadata } = req.body;
  if (!formType || !name || !email) {
    return res.status(400).json({ error: 'formType, name, and email are required fields.' });
  }

  const newSubmission: any = {
    id: 'SUB-' + Math.floor(Math.random() * 900000 + 100000),
    formType,
    name,
    email,
    phone: phone || '',
    subject: subject || '',
    message: message || '',
    metadata: metadata || {},
    createdAt: new Date().toISOString()
  };

  const config = getSheetsConfig();
  let googleSheetsSynced = false;
  let syncError = null;

  if (config.webAppUrl && config.webAppUrl.trim().startsWith('http')) {
    if (config.webAppUrl.includes('docs.google.com/spreadsheets')) {
      syncError = 'Google Sheets Configuration Error: A Spreadsheet editor URL was saved instead of a Google Apps Script Web App Deployment URL. Please visit the Admin Panel and follow the setup instructions to deploy and configure a Google Apps Script Web App (ends with "/exec") with access set to "Anyone".';
    } else {
      try {
        const response = await fetch(config.webAppUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSubmission)
        });
        
        if (response.ok) {
          const contentType = response.headers.get('content-type') || '';
          const text = await response.text();
          
          if (contentType.includes('text/html') || text.trim().startsWith('<!DOCTYPE html>') || text.includes('google-site-verification') || text.includes('Sorry, unable to open the file') || text.includes('Sign in - Google Accounts')) {
            googleSheetsSynced = false;
            syncError = 'Google Apps Script Permission Error: The Web App returned an HTML login or error page instead of a successful confirmation. This almost always means "Who has access" was not set to "Anyone" during deployment, making it private. Please open Apps Script, click "Deploy" > "Manage Deployments", edit the Web App, set access to "Anyone", and re-deploy.';
          } else {
            googleSheetsSynced = true;
          }
        } else {
          const errText = await response.text();
          if (errText.trim().startsWith('<!DOCTYPE html>') || response.status === 401 || response.status === 403) {
            syncError = `Google Permission Error (Status ${response.status}): Your Apps Script Web App requires Google sign-in. Please ensure you deployed the script with the access permission "Who has access" set to "Anyone" so our server can synchronize submissions.`;
          } else {
            syncError = `Sheets API returned status ${response.status}: ${errText.substring(0, 500)}`;
          }
        }
      } catch (err: any) {
        syncError = `Network/Connection Error: ${err.message || err}`;
      }
    }
  }

  newSubmission.googleSheetsSynced = googleSheetsSynced;
  newSubmission.syncError = syncError;

  const submissions = getSubmissions();
  submissions.unshift(newSubmission);
  saveSubmissions(submissions);

  res.json({
    success: true,
    submission: newSubmission,
    googleSheetsSynced,
    syncError
  });
});

app.post('/api/submissions/clear', (req, res) => {
  saveSubmissions([]);
  res.json({ success: true, message: 'Submissions cleared successfully' });
});

app.get('/api/gallery', (req, res) => {
  res.json(getGallery());
});

app.post('/api/gallery', (req, res) => {
  const { galleryList } = req.body;
  if (!galleryList || !Array.isArray(galleryList)) {
    return res.status(400).json({ error: 'galleryList must be a valid array' });
  }
  saveGallery(galleryList);
  res.json({ success: true, galleryList });
});

app.get('/api/blogs', (req, res) => {
  res.json(getBlogs());
});

app.post('/api/blogs', (req, res) => {
  const { blogsList } = req.body;
  if (!blogsList || !Array.isArray(blogsList)) {
    return res.status(400).json({ error: 'blogsList must be a valid array' });
  }
  saveBlogs(blogsList);
  res.json({ success: true, blogsList });
});

app.get('/api/events', (req, res) => {
  res.json(getEvents());
});

app.post('/api/events', (req, res) => {
  const { eventsList } = req.body;
  if (!eventsList || !Array.isArray(eventsList)) {
    return res.status(400).json({ error: 'eventsList must be a valid array' });
  }
  saveEvents(eventsList);
  res.json({ success: true, eventsList });
});

app.get('/api/jobs', (req, res) => {
  res.json(getJobs());
});

app.post('/api/jobs', (req, res) => {
  const { jobsList } = req.body;
  if (!jobsList || !Array.isArray(jobsList)) {
    return res.status(400).json({ error: 'jobsList must be a valid array' });
  }
  saveJobs(jobsList);
  res.json({ success: true, jobsList });
});

app.get('/api/seo', (req, res) => {
  res.json(getSeo() || {});
});

app.post('/api/seo', (req, res) => {
  const { seoConfig } = req.body;
  if (!seoConfig || typeof seoConfig !== 'object') {
    return res.status(400).json({ error: 'seoConfig must be a valid object' });
  }
  saveSeo(seoConfig);
  res.json({ success: true, seoConfig });
});

app.post('/api/upload', (req, res) => {
  const { base64, name } = req.body;
  if (!base64 || typeof base64 !== 'string') {
    return res.status(400).json({ error: 'base64 data is required' });
  }

  const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  let buffer: Buffer;
  let extension = 'png';

  if (matches && matches.length === 3) {
    const mimeType = matches[1];
    buffer = Buffer.from(matches[2], 'base64');
    const extMatch = mimeType.split('/');
    if (extMatch && extMatch[1]) {
      extension = extMatch[1];
    }
  } else {
    buffer = Buffer.from(base64, 'base64');
  }

  if (name) {
    const dotIndex = name.lastIndexOf('.');
    if (dotIndex !== -1) {
      const fileExt = name.substring(dotIndex + 1).toLowerCase();
      if (fileExt && /^[a-z0-9]{2,5}$/.test(fileExt)) {
        extension = fileExt;
      }
    }
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filename = `upload_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${extension}`;
  const filepath = path.join(uploadsDir, filename);

  fs.writeFileSync(filepath, buffer);
  
  const fileUrl = `/uploads/${filename}`;
  res.json({ success: true, url: fileUrl });
});

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body: "messages" array is required.' });
  }

  const contents = messages.map((msg: any) => {
    return {
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    };
  });

  const ai = getAiClient();

  if (!ai) {
    const lastUserMessage = messages[messages.length - 1]?.text || 'Hello';
    let reply = '';
    if (lastUserMessage.toLowerCase().includes('program') || lastUserMessage.toLowerCase().includes('initiative')) {
      reply = `### Raita Mitra Core Programs 🌾\n\nI'm running in **Simulation Mode** (API key not configured), but I can tell you about our core programs:\n\n1. **Sustainable Agriculture**: Lowering input costs by 35% and supporting 5,000+ farmers with bio-inputs.\n2. **Women Empowerment**: Empowering 1,500+ women, creating 280+ micro-enterprises, and boosting income by 45%.\n3. **Education & Digital/AI Skills**: Establishing 12 Smart Labs and introducing rural students to STEM & AI.\n4. **Health, Nutrition & Well-being**: Eradicating malnutrition through 35+ camps and backyard nutrition gardens.\n\n*Would you like to explore how to partner or support any of these programs?*`;
    } else if (lastUserMessage.toLowerCase().includes('csr') || lastUserMessage.toLowerCase().includes('compliance')) {
      reply = `### Corporate CSR Partnerships 🏢\n\nWe provide 100% compliant, audited channels for corporate partnership:\n- **CSR Registration Number**: CSR00059487\n- **NGO Darpan ID**: KA/2023/0342549\n- **Tax Benefit**: 12A & 80G certified.\n\nWe generate comprehensive audit reports, quarterly milestones, and alignment with UN SDGs.\n\n*Would you like to connect with our CSR relationship manager at +91 94812 34567 or email connect@raitamitra.org?*`;
    } else if (lastUserMessage.toLowerCase().includes('donate') || lastUserMessage.toLowerCase().includes('support') || lastUserMessage.toLowerCase().includes('tax')) {
      reply = `### Supporting Our Livelihood Projects ❤️\n\nYour support creates direct ground-level impact in rural Karnataka:\n- **Sponsor a Smart Lab**: ₹3.5L (empowers 250+ rural school students)\n- **Sponsor a Farm Pond**: ₹85K (guards against droughts for years)\n- **Equip an SHG Sewing Unit**: ₹1.5L (makes 10+ rural women self-reliant)\n\nAll Indian donations are eligible for a **50% tax exemption under Section 80G**.\n\n*Would you like me to guide you to our quick Donation gateway or initiate a human relationship coordinator?*`;
    } else if (lastUserMessage.toLowerCase().includes('volunteer')) {
      reply = `### Volunteer Opportunities 🤝\n\nJoin hands with Raita Mitra as a catalyst for rural change! We are actively seeking:\n- **Digital Literacy Teachers**: Mentoring government school students in our Smart Labs.\n- **Agriculture Consultants**: Helping dryland farmers adopt organic inputs and Jeevamrutha methods.\n- **Health Camp Coordinators**: Assisting medical partners in tracking anemia and nutrition progress.\n\n*Type "apply" to proceed or connect on WhatsApp at +91 94812 34567!*`;
    } else {
      reply = `### Greetings! I am Mitra AI 👋\n\nWelcome! I am your **Intelligent Copilot** for the Raita Mitra Social Trust.\n\nWhether you are a **CSR Trustee**, a **Donor**, a **Volunteer**, or a **Student**, I'm here 24x7 to help you discover:\n- Detailed **Programs & Outcomes** 🌾\n- Corporate **CSR-1 Compliance & Audits** 📋\n- Direct **Donation & SDG Impact** 💖\n- Local **Volunteering & Training Camps** 🤝\n\n*How can I assist you in your community journey today?*`;
    }

    return res.json({
      text: reply,
      simulated: true,
      groundingMetadata: {
        groundingChunks: [
          { web: { title: 'Raita Mitra Trust Website', uri: '#/' } }
        ]
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.75,
        tools: [{ googleSearch: {} }],
      }
    });

    const textResponse = response.text || "I apologize, I wasn't able to compile a detailed response. Please let me know how I can help.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    res.json({
      text: textResponse,
      groundingMetadata: {
        groundingChunks: chunks
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend assets
if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });
  app.use(vite.middlewares);
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
});
