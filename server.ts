import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config();

const SUBMISSIONS_FILE = path.join(process.cwd(), 'submissions.json');
const CONFIG_FILE = path.join(process.cwd(), 'sheets_config.json');
const GALLERY_FILE = path.join(process.cwd(), 'gallery.json');
const BLOGS_FILE = path.join(process.cwd(), 'blogs.json');
const EVENTS_FILE = path.join(process.cwd(), 'events.json');
const JOBS_FILE = path.join(process.cwd(), 'jobs.json');
const SEO_FILE = path.join(process.cwd(), 'seo.json');

const DEFAULT_GALLERY = [
  {
    id: 'photo_1',
    title: 'Solar-Powered Drip Irrigation Setup',
    tags: ['Agriculture', 'Hebsur Village, Dharwad'],
    type: 'Image',
    size: '2.4 MB',
    url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'photo_2',
    title: 'Yaraguppi Dairy Cooperative Ledger Review',
    tags: ['Women Empowerment', 'Yaraguppi, Kundgol'],
    type: 'Image',
    size: '1.8 MB',
    url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'photo_3',
    title: 'High School Girls Exploring Scratch Coding',
    tags: ['Education & AI Skills', 'Kundgol High School, Dharwad'],
    type: 'Image',
    size: '3.1 MB',
    url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'photo_4',
    title: 'Mobile Diagnostic Pediatric Screening',
    tags: ['Health Camps', 'Shiggaon, Haveri'],
    type: 'Image',
    size: '4.2 MB',
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'photo_5',
    title: 'Watershed Bunding & Sapling Afforestation',
    tags: ['Environment', 'Kalghatgi Taluk, Dharwad'],
    type: 'Image',
    size: '2.9 MB',
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'photo_6',
    title: 'Millet Processing Unit Packaging',
    tags: ['Entrepreneurship', 'Haveri Rural, Haveri'],
    type: 'Image',
    size: '2.2 MB',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'photo_7',
    title: 'Taluk Agrarian Advisory Assembly',
    tags: ['Events', 'Hubballi Training Centre, Dharwad'],
    type: 'Image',
    size: '3.5 MB',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'photo_8',
    title: 'Harvesting Diversified Horticulture Crops',
    tags: ['Agriculture', 'Savanur Taluk, Haveri'],
    type: 'Image',
    size: '2.7 MB',
    url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=1000'
  }
];

function getGallery() {
  try {
    if (!fs.existsSync(GALLERY_FILE)) {
      fs.writeFileSync(GALLERY_FILE, JSON.stringify(DEFAULT_GALLERY, null, 2));
      return DEFAULT_GALLERY;
    }
    const data = fs.readFileSync(GALLERY_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading gallery:', err);
    return DEFAULT_GALLERY;
  }
}

function saveGallery(gallery: any[]) {
  try {
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(gallery, null, 2));
  } catch (err) {
    console.error('Error writing gallery:', err);
  }
}

// Helper to load submissions
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

// Helper to save submissions
function saveSubmissions(submissions: any[]) {
  try {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
  } catch (err) {
    console.error('Error writing submissions:', err);
  }
}

// Helper to load Sheets config
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

// Helper to save Sheets config
function saveSheetsConfig(config: any) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  } catch (err) {
    console.error('Error writing sheets config:', err);
  }
}

// Helpers for blogs
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

// Helpers for events
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

// Helpers for jobs
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

// Helpers for SEO configs
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

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  // Middleware for parsing JSON requests with increased limit
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Initialize Gemini API client safely (lazy-load checked on endpoint request)
  let aiClient: GoogleGenAI | null = null;
  
  function getAiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn('WARNING: GEMINI_API_KEY is not defined. Mitra AI will run in Simulation Mode.');
        return null;
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  // System instruction providing rich context on Raita Mitra Social Trust (R)
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

  // API endpoint for conversational AI chat copilot
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: 'Invalid request body: "messages" array is required.' });
        return;
      }

      // Map client-side messages to Google GenAI content parts structure
      const contents = messages.map((msg: any) => {
        return {
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        };
      });

      // Lazy check for GoogleGenAI client
      const ai = getAiClient();

      if (!ai) {
        // Fallback simulation mode if GEMINI_API_KEY is not defined
        console.log('Mitra AI running in simulation mode');
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

        // Return simulated stream after a tiny timeout to feel authentic
        setTimeout(() => {
          res.json({
            text: reply,
            simulated: true,
            groundingMetadata: {
              groundingChunks: [
                { web: { title: 'Raita Mitra Trust Website', uri: '#/' } }
              ]
            }
          });
        }, 800);
        return;
      }

      // Generate response using gemini-3.5-flash as specified in the skill
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.75,
          tools: [{ googleSearch: {} }],
        }
      });

      // Extract results securely
      const textResponse = response.text || "I apologize, I wasn't able to compile a detailed response. Please let me know how I can help.";
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      res.json({
        text: textResponse,
        groundingMetadata: {
          groundingChunks: chunks
        }
      });

    } catch (error: any) {
      console.error('Gemini Copilot Error:', error);
      res.status(500).json({ 
        error: 'Error generating response from Mitra AI.', 
        details: error.message 
      });
    }
  });

  // GET Google Sheets configurations
  app.get('/api/sheets-config', (req, res) => {
    try {
      const config = getSheetsConfig();
      res.json(config);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to read sheets config', details: err.message });
    }
  });

  // Serve uploads folder statically
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsDir));

  // POST endpoint for base64 file upload
  app.post('/api/upload', (req, res) => {
    try {
      const { base64, name } = req.body;
      if (!base64 || typeof base64 !== 'string') {
        res.status(400).json({ error: 'base64 data is required' });
        return;
      }

      // Check if it's a data URL
      const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer: Buffer;
      let extension = 'png'; // default

      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        buffer = Buffer.from(matches[2], 'base64');
        const extMatch = mimeType.split('/');
        if (extMatch && extMatch[1]) {
          extension = extMatch[1];
        }
      } else {
        // Fallback to raw base64 if not data URL
        buffer = Buffer.from(base64, 'base64');
      }

      // Safe clean file name extension
      if (name) {
        const dotIndex = name.lastIndexOf('.');
        if (dotIndex !== -1) {
          const fileExt = name.substring(dotIndex + 1).toLowerCase();
          if (fileExt && /^[a-z0-9]{2,5}$/.test(fileExt)) {
            extension = fileExt;
          }
        }
      }

      const filename = `upload_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${extension}`;
      const filepath = path.join(uploadsDir, filename);

      fs.writeFileSync(filepath, buffer);
      
      const fileUrl = `/uploads/${filename}`;
      res.json({ success: true, url: fileUrl });
    } catch (err: any) {
      console.error('Failed to handle upload:', err);
      res.status(500).json({ error: 'Failed to upload media', details: err.message });
    }
  });

  // GET gallery items list
  app.get('/api/gallery', (req, res) => {
    try {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      const gallery = getGallery();
      res.json(gallery);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve gallery items', details: err.message });
    }
  });

  // POST update/save entire gallery items list
  app.post('/api/gallery', (req, res) => {
    try {
      const { galleryList } = req.body;
      if (!galleryList || !Array.isArray(galleryList)) {
        res.status(400).json({ error: 'galleryList must be a valid array' });
        return;
      }
      saveGallery(galleryList);
      res.json({ success: true, galleryList });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to save gallery items', details: err.message });
    }
  });

  // GET blogs items list
  app.get('/api/blogs', (req, res) => {
    try {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      const blogs = getBlogs();
      res.json(blogs);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve blogs', details: err.message });
    }
  });

  // POST update/save entire blogs items list
  app.post('/api/blogs', (req, res) => {
    try {
      const { blogsList } = req.body;
      if (!blogsList || !Array.isArray(blogsList)) {
        res.status(400).json({ error: 'blogsList must be a valid array' });
        return;
      }
      saveBlogs(blogsList);
      res.json({ success: true, blogsList });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to save blogs', details: err.message });
    }
  });

  // GET events items list
  app.get('/api/events', (req, res) => {
    try {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      const events = getEvents();
      res.json(events);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve events', details: err.message });
    }
  });

  // POST update/save entire events items list
  app.post('/api/events', (req, res) => {
    try {
      const { eventsList } = req.body;
      if (!eventsList || !Array.isArray(eventsList)) {
        res.status(400).json({ error: 'eventsList must be a valid array' });
        return;
      }
      saveEvents(eventsList);
      res.json({ success: true, eventsList });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to save events', details: err.message });
    }
  });

  // GET jobs items list
  app.get('/api/jobs', (req, res) => {
    try {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      const jobs = getJobs();
      res.json(jobs);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve jobs', details: err.message });
    }
  });

  // POST update/save entire jobs items list
  app.post('/api/jobs', (req, res) => {
    try {
      const { jobsList } = req.body;
      if (!jobsList || !Array.isArray(jobsList)) {
        res.status(400).json({ error: 'jobsList must be a valid array' });
        return;
      }
      saveJobs(jobsList);
      res.json({ success: true, jobsList });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to save jobs', details: err.message });
    }
  });

  // GET SEO configuration
  app.get('/api/seo', (req, res) => {
    try {
      const seo = getSeo();
      res.json(seo || {});
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve SEO configuration', details: err.message });
    }
  });

  // POST update/save SEO configuration
  app.post('/api/seo', (req, res) => {
    try {
      const { seoConfig } = req.body;
      if (!seoConfig || typeof seoConfig !== 'object') {
        res.status(400).json({ error: 'seoConfig must be a valid object' });
        return;
      }
      saveSeo(seoConfig);
      res.json({ success: true, seoConfig });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to save SEO configuration', details: err.message });
    }
  });

  // POST update Google Sheets configurations
  app.post('/api/sheets-config', (req, res) => {
    try {
      const { webAppUrl } = req.body;
      
      if (webAppUrl && webAppUrl.trim().includes('docs.google.com/spreadsheets')) {
        res.status(400).json({ 
          error: 'Invalid URL Type', 
          details: 'You pasted a Google Spreadsheet link instead of the Google Apps Script Web App Deployment URL!\n\nPlease follow the setup guide:\n1. Open your Spreadsheet.\n2. Click "Extensions" > "Apps Script".\n3. Paste the Apps Script code shown below.\n4. Click "Deploy" > "New Deployment" as a Web App.\n5. Select "Anyone" under "Who has access" (extremely important!).\n6. Copy the resulting Web App URL (which ends with "/exec") and paste it here.'
        });
        return;
      }

      const config = { webAppUrl: webAppUrl || '' };
      saveSheetsConfig(config);
      res.json({ success: true, config });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to save sheets config', details: err.message });
    }
  });

  // GET local submissions list
  app.get('/api/submissions', (req, res) => {
    try {
      const submissions = getSubmissions();
      res.json(submissions);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve submissions', details: err.message });
    }
  });

  // POST create a new submission
  app.post('/api/submissions', async (req, res) => {
    try {
      const { formType, name, email, phone, subject, message, metadata } = req.body;

      if (!formType || !name || !email) {
        res.status(400).json({ error: 'formType, name, and email are required fields.' });
        return;
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

      // Forward to Google Sheets Web App if configured
      const config = getSheetsConfig();
      let googleSheetsSynced = false;
      let syncError = null;

      if (config.webAppUrl && config.webAppUrl.trim().startsWith('http')) {
        if (config.webAppUrl.includes('docs.google.com/spreadsheets')) {
          syncError = 'Google Sheets Configuration Error: A Spreadsheet editor URL was saved instead of a Google Apps Script Web App Deployment URL. Please visit the Admin Panel and follow the setup instructions to deploy and configure a Google Apps Script Web App (ends with "/exec") with access set to "Anyone".';
          console.error(syncError);
        } else {
          try {
            console.log(`Forwarding submission to Google Sheets: ${config.webAppUrl}`);
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
                console.error(syncError);
              } else {
                googleSheetsSynced = true;
                console.log('Successfully synced to Google Sheets!');
              }
            } else {
              const errText = await response.text();
              if (errText.trim().startsWith('<!DOCTYPE html>') || response.status === 401 || response.status === 403) {
                syncError = `Google Permission Error (Status ${response.status}): Your Apps Script Web App requires Google sign-in. Please ensure you deployed the script with the access permission "Who has access" set to "Anyone" so our server can synchronize submissions.`;
              } else {
                syncError = `Sheets API returned status ${response.status}: ${errText.substring(0, 500)}`;
              }
              console.error(syncError);
            }
          } catch (err: any) {
            syncError = `Network/Connection Error: ${err.message || err}`;
            console.error('Failed to forward to Google Sheets:', err);
          }
        }
      }

      // Add synchronization status to the persistent record
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

    } catch (error: any) {
      console.error('Error processing submission:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });

  // POST clear local submissions
  app.post('/api/submissions/clear', (req, res) => {
    try {
      saveSubmissions([]);
      res.json({ success: true, message: 'Submissions cleared successfully' });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to clear submissions', details: err.message });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date() });
  });

  // Serve static assets or integrate Vite in dev
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Mitra AI Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
