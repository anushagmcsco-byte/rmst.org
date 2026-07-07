import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware for parsing JSON requests
  app.use(express.json());

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
