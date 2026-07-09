import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  MapPin, 
  Calendar, 
  ArrowLeft, 
  Share2, 
  Sparkles, 
  Quote, 
  Play, 
  Pause, 
  Download, 
  CheckCircle, 
  ChevronRight, 
  MessageSquare, 
  Award, 
  Heart, 
  Volume2, 
  Globe, 
  FileText, 
  ExternalLink,
  ThumbsUp,
  Map,
  Layers,
  ChevronLeft,
  Tv,
  Clock,
  Briefcase,
  TrendingUp,
  HelpCircle,
  FileSpreadsheet,
  Megaphone,
  UserCheck,
  Send,
  Languages,
  Filter
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

interface ImpactStoryDetailProps {
  slug: string;
  setActivePage: (page: string) => void;
  highContrast: boolean;
}

// -------------------------------------------------------------
// Core Story Database (4 World-Class Documentary Slugs)
// -------------------------------------------------------------
const storiesDatabase: Record<string, any> = {
  "transforming-farmer-livelihoods": {
    slug: "transforming-farmer-livelihoods",
    title: "Reclaiming ancestral Soil: How Sharanappa Beat the Drought",
    subHeadline: "A documentary on how sub-surface organic composting and solar-powered micro-irrigation salvaged a multi-generational dryland farm in Hebsur.",
    author: "Aditi Rao, Senior Field Journalist",
    publishDate: "March 2026",
    location: "Hebsur Village, Dharwad",
    readingTime: "5 mins read",
    category: "Sustainable Agriculture",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    heroImage: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=1600",
    quote: "By replacing chemical fertilizers with natural Jeevamrutha, my soil became alive again. My costs fell by half, and our dry field turned into a green sanctuary.",
    beneficiary: {
      name: "Sharanappa Goudar",
      age: 44,
      village: "Hebsur",
      occupation: "Smallholder Dryland Farmer",
      portrait: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
      storySummary: "For years, Sharanappa was trapped in high-interest pesticide credit lines. With depleting tube-wells and rising summer temperatures, his yield plummeted, forcing him to consider selling his ancestral 3-acre patch to factory developers. In 2023, Raita Mitra Social Trust enrolled him in their regenerative agronomy pilot. Today, his land serves as a certified regional demonstration center.",
    },
    challenge: {
      title: "The Crisis of Eroded Drylands",
      description: "Monsoon anomalies, soil carbon desertification, and pesticide debt cycles push local margins to negative levels.",
      statValue: "78%",
      statLabel: "Local Farmers Stuck in Debt Circles",
      context: "Dharwad region experienced a 24% rainfall deficit in 2024. Chemical fertilizers had stripped the water retention capacity of basalt clay soils, requiring expensive constant borewell drilling that yielded saline water, poisoning local food pipelines.",
      chartData: [
        { subject: "Soil Moisture", Before: 15, After: 80, Full: 100 },
        { subject: "Microbe Count", Before: 5, After: 90, Full: 100 },
        { subject: "Net Margins", Before: 20, After: 85, Full: 100 },
        { subject: "Water Savings", Before: 10, After: 75, Full: 100 },
        { subject: "Input Safety", Before: 30, After: 95, Full: 100 }
      ]
    },
    slider: {
      beforeImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=800",
      beforeLabel: "Traditional Chemical Desert (2023)",
      afterLabel: "Raita Mitra Biodiverse Farm (2026)"
    },
    metrics: [
      { title: "Income Increase", type: "Percentage", value: "+114%" },
      { title: "People Benefited", type: "Count", value: "350+ Farmers" },
      { title: "Water Conserved", type: "Percentage", value: "40% saved" },
      { title: "Carbon Restored", type: "Count", value: "2.4x Microbes" }
    ],
    timeline: [
      { label: "Initial Situation", detail: "Ancestral land was dry, dusty, and burdened with pesticide debt." },
      { label: "Intervention", detail: "Raita Mitra engineers analyzed soil chemistry and installed solar micro-drips." },
      { label: "Skill Development", detail: "Sharanappa was trained to ferment home-brewed compost bio-inputs." },
      { label: "Transformation", detail: "Zero chemical inputs allowed natural soil microbes to replenish." },
      { label: "Sustainable Impact", detail: "The farm earned local certification, training 300 neighbouring families." }
    ],
    sdgs: [
      { num: 1, title: "No Poverty", desc: "Doubled farm incomes from baseline by eradicating chemical agent fees." },
      { num: 2, title: "Zero Hunger", desc: "Restored seasonal mixed farming for diverse organic pulses and food supplies." },
      { num: 12, title: "Responsible Consumption", desc: "Eradicated hazardous agricultural toxins from groundwater aquifers." },
      { num: 13, title: "Climate Action", desc: "Integrated carbon-retaining multi-crop cover to counter rising heat anomalies." }
    ],
    voices: [
      { name: "Smt. Renuka Pujar", role: "Panchayath President", quote: "Sharanappa's success broke the myth that farming requires heavy chemicals. He became Hebsur's true leader.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" },
      { name: "Siddhesh G.", role: "Lead Agro-Volunteer", quote: "Seeing his dry basalt soil return to black crumbly humus proves that regenerative modeling is scale-ready.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200" }
    ],
    program: {
      title: "Sustainable Agronomy Initiatives",
      tagline: "Bridging indigenous composting wisdom with digital water audit monitors.",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600",
      slug: "sustainable-agriculture"
    },
    mapCoordinates: { lat: 15.45, lng: 75.12, village: "Hebsur Village", district: "Dharwad" },
    multilingual: {
      kannada: {
        title: "ಪಾರಂಪರಿಕ ಮಣ್ಣಿನ ಪುನಶ್ಚೇತನ: ಶರಣಪ್ಪನವರ ಯಶೋಗಾಥೆ",
        subHeadline: "ಹೆಬ್ಸೂರು ಗ್ರಾಮದಲ್ಲಿ ಸಾವಯವ ಗೊಬ್ಬರ ಮತ್ತು ಸೌರ ಚಾಲಿತ ನೀರಾವರಿಯಿಂದ ಸಾಂಪ್ರದಾಯಿಕ ಕೃಷಿ ಮಣ್ಣನ್ನು ಉಳಿಸಿದ ಸಾಕ್ಷ್ಯಚಿತ್ರ.",
        quote: "ರಾಸಾಯನಿಕ ಗೊಬ್ಬರಗಳನ್ನು ನಿಲ್ಲಿಸುವ ಮೂಲಕ ನನ್ನ ಮಣ್ಣು ಮತ್ತೆ ಜೀವಪಡೆಯಿತು. ವೆಚ್ಚ ಅರ್ಧಕ್ಕೆ ಇಳಿದು ಲಾಭ ಹೆಚ್ಚಾಗಿದೆ.",
        storySummary: "ವರ್ಷಗಳಿಂದ ಶರಣಪ್ಪ ಸಾಲದ ಸುಳಿಯಲ್ಲಿ ಸಿಲುಕಿದ್ದರು. ರೈತ ಮಿತ್ರ ಸಂಸ್ಥೆಯ ಸಹಯೋಗದೊಂದಿಗೆ ನೈಸರ್ಗಿಕ ಜೀವಾಮೃತ ಕೃಷಿ ಪದ್ಧತಿ ಅಳವಡಿಸಿಕೊಂಡು ಇಂದು ತಾಲೂಕಿನಾದ್ಯಂತ ಇತರರಿಗೆ ಪ್ರೇರಣೆಯಾಗಿದ್ದಾರೆ."
      }
    }
  },
  "women-entrepreneurship-success": {
    slug: "women-entrepreneurship-success",
    title: "Sovereignty in Spices: Laxmi's Solar Processing Cooperative",
    subHeadline: "How a cooperative of fifteen rural women established a solar-powered spice pulverizing unit to bypass unfair wholesale trade chains.",
    author: "Pritha Sen, ESG Specialist",
    publishDate: "May 2026",
    location: "Kalghatgi Taluk, Dharwad",
    readingTime: "6 mins read",
    category: "Women Empowerment",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    heroImage: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1600",
    quote: "With solar-powered grinding machines, we don't wait for grid electricity. We control our working hours and dictate our price in the market.",
    beneficiary: {
      name: "Laxmi Devagiri",
      age: 39,
      village: "Yaraguppi",
      occupation: "Cooperative Lead & Entrepreneur",
      portrait: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800",
      storySummary: "Laxmi and other women in Yaraguppi village survived on seasonal crop harvest wages (₹110 daily). When the dry season set in, they had zero financial buffer or credit history. In early 2024, Raita Mitra Social Trust facilitated financial literacy training and helped set up a custom Solar-Powered Flour & Spice Milling Cooperative. Now, they supply high-grade organic chili powder directly to retail centers.",
    },
    challenge: {
      title: "Exploitative Wholesale Price Gaps",
      description: "Marginal women artisans had no cold chain or processing equipment, forcing them to sell fresh chilies at pennies to middlemen.",
      statValue: "₹3,200",
      statLabel: "Baseline Monthly Income",
      context: "Rural women spent up to 14 hours in manual domestic and fields work with zero capital ownership. Middlemen took over 70% of downstream spice sales margins.",
      chartData: [
        { subject: "Financial Independence", Before: 10, After: 90, Full: 100 },
        { subject: "Equipment Skill", Before: 0, After: 85, Full: 100 },
        { subject: "Direct Trade Control", Before: 5, After: 95, Full: 100 },
        { subject: "Energy Autonomy", Before: 20, After: 90, Full: 100 },
        { subject: "Credit Score", Before: 15, After: 80, Full: 100 }
      ]
    },
    slider: {
      beforeImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800",
      beforeLabel: "Manual Unprocessed Labor (2023)",
      afterLabel: "Modern Solar Processing Unit (2026)"
    },
    metrics: [
      { title: "Income Growth", type: "Percentage", value: "3.2x Earnings" },
      { title: "SHG Members", type: "Count", value: "15 Women Leads" },
      { title: "Solar Power", type: "Percentage", value: "100% Green Run" },
      { title: "Direct Trading", type: "Count", value: "6 Retail Partners" }
    ],
    timeline: [
      { label: "Initial Situation", detail: "Women worked seasonal hours for unstable day wages under extreme stress." },
      { label: "Intervention", detail: "Raita Mitra organized them into a self-reliant Joint Liability Group." },
      { label: "Skill Development", detail: "They completed intensive business bookkeeping and machinery operations workshops." },
      { label: "Transformation", detail: "Installed high-speed off-grid solar-powered grinders in a custom local shed." },
      { label: "Sustainable Impact", detail: "Launched their own packaged spice brand, tripling their family savings accounts." }
    ],
    sdgs: [
      { num: 5, title: "Gender Equality", desc: "Placed production-grade machinery ownership directly in women's control." },
      { num: 7, title: "Affordable Energy", desc: "Ran processing hub on 100% rooftop solar, independent of unstable grids." },
      { num: 8, title: "Decent Work", desc: "Constructed steady non-hazardous local jobs paying 300% above agricultural baseline." },
      { num: 10, title: "Reduced Inequality", desc: "Transferred margins from urban market middlemen straight to rural producers." }
    ],
    voices: [
      { name: "Savitha Hadimani", role: "Cooperative Member", quote: "We used to beg landlords for advance loans. Today, our cooperative bank account holds the village's highest reserve.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" },
      { name: "Dr. Arundhati Nayak", role: "NGO Evaluator", quote: "Laxmi's cooperative is a masterclass in decentralized economic empowerment. It is entirely self-managed.", image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200" }
    ],
    program: {
      title: "Women Empowerment Programs",
      tagline: "Micro-entrepreneurship and dairy value-addition setups.",
      image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&q=80&w=600",
      slug: "women-empowerment"
    },
    mapCoordinates: { lat: 15.28, lng: 75.02, village: "Yaraguppi Village", district: "Kalghatgi" },
    multilingual: {
      kannada: {
        title: "ಮಸಾಲೆ ಉದ್ಯಮದಲ್ಲಿ ಯಶಸ್ಸು: ಲಕ್ಷ್ಮಿಯವರ ಸೌರ ಸಹಕಾರ ಸಂಘ",
        subHeadline: "ಮಧ್ಯವರ್ತಿಗಳ ಹಾವಳಿ ತಪ್ಪಿಸಲು ಹದಿನೈದು ಗ್ರಾಮೀಣ ಮಹಿಳೆಯರು ಸೌರಶಕ್ತಿ ಚಾಲಿತ ಉದ್ಯಮ ಸ್ಥಾಪಿಸಿದ ಸಾಹಸ ಕಥೆ.",
        quote: "ಸೌರ ಯಂತ್ರಗಳಿಂದಾಗಿ ನಾವು ವಿದ್ಯುತ್ ತೊಂದರೆ ಎದುರಿಸುತ್ತಿಲ್ಲ. ನಮ್ಮ ಸಮಯ ಮತ್ತು ಬೆಲೆಯನ್ನು ನಾವೇ ನಿರ್ಧರಿಸುತ್ತೇವೆ.",
        storySummary: "ಯರಗುಪ್ಪಿ ಗ್ರಾಮದ ಲಕ್ಷ್ಮಿ ಮೊದಲು ದಿನಗೂಲಿ ಮಾಡುತ್ತಿದ್ದರು. ರೈತ ಮಿತ್ರ ನೀಡಿದ ತರಬೇತಿಯಿಂದ ಇಂದು ಸ್ವಾವಲಂಬಿ ಉದ್ಯಮಿಯಾಗಿ ಬೆಳೆದಿದ್ದಾರೆ."
      }
    }
  },
  "rural-youth-ai-skills": {
    slug: "rural-youth-ai-skills",
    title: "Coding in the Wheat Fields: Deepa's Microcontroller Project",
    subHeadline: "How a solar-powered smart tech lab in a rural Kundgol government school equipped Deepa to code automated farm sensors.",
    author: "Shyam Sundar, Tech for Good Fellow",
    publishDate: "June 2026",
    location: "Kundgol, Dharwad",
    readingTime: "4 mins read",
    category: "Youth Skill Development",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    heroImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1600",
    quote: "Writing logical blocks is like magic. I designed a sensor that tells my father exactly when his crop needs water, saving our battery and pump life.",
    beneficiary: {
      name: "Deepa Kurubar",
      age: 14,
      village: "Kundgol",
      occupation: "Student & Hardware Hacker",
      portrait: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
      storySummary: "Deepa studied in a remote Kundgol state school where power grids failed daily. She had never touched a computer keyboard. When her family faced consecutive agricultural drought losses, she was nearly pulled from school to help with labor. Raita Mitra Social Trust set up a 100% solar-backed computer lab. Deepa's natural aptitude for visual code blocks allowed her to construct local smart hardware projects.",
    },
    challenge: {
      title: "The Extreme Digital Exclusion",
      description: "Over 85% of rural government schools lack functional computer labs, shutting rural youth completely out of the technological workforce.",
      statValue: "0 hrs",
      statLabel: "Baseline Computer Access",
      context: "Rural high schools faced grid failure up to 7 hours daily. Computer science lessons were taught purely on blackboards with chalk drawings of mouse buttons.",
      chartData: [
        { subject: "Logic & Coding", Before: 0, After: 95, Full: 100 },
        { subject: "Hardware Assembly", Before: 0, After: 80, Full: 100 },
        { subject: "English Literacy", Before: 15, After: 70, Full: 100 },
        { subject: "Scientific Thinking", Before: 25, After: 90, Full: 100 },
        { subject: "Confidence", Before: 10, After: 95, Full: 100 }
      ]
    },
    slider: {
      beforeImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
      beforeLabel: "Chalkboard Computer Theory (2024)",
      afterLabel: "Active IoT Micro-hardware Lab (2026)"
    },
    metrics: [
      { title: "Classroom Hours", type: "Count", value: "240+ Hours" },
      { title: "Students Trained", type: "Count", value: "1,200+ Youth" },
      { title: "Solar Labs", type: "Count", value: "12 Schools" },
      { title: "Scholarships", type: "Count", value: "18 Awarded" }
    ],
    timeline: [
      { label: "Initial Situation", detail: "Deepa faced drop-out pressures with zero technical exposure." },
      { label: "Intervention", detail: "Raita Mitra installed a solar-powered computer classroom with robust laptops." },
      { label: "Skill Development", detail: "Completed foundational computational block training and micro-controller basics." },
      { label: "Transformation", detail: "Programmed a functioning automated soil-moisture sensor with LED alert cues." },
      { label: "Sustainable Impact", detail: "Received Dharwad Science Fair Top Award, winning a full scholarship for higher polytechnic." }
    ],
    sdgs: [
      { num: 4, title: "Quality Education", desc: "Integrated digital coding and practical IoT mechanics into public village school curriculum." },
      { num: 5, title: "Gender Equality", desc: "Encouraged rural girls to excel in hardware STEM and represent region at state fairs." },
      { num: 9, title: "Industry & Innovation", desc: "Nurtured decentralised technological capacity to build custom hardware tailored for farm issues." },
      { num: 17, title: "Partnerships", desc: "Linked local panchayat and state schools with corporate technology volunteers." }
    ],
    voices: [
      { name: "Siddharth Kumbar", role: "Classmate & Peer Tutor", quote: "Deepa taught us how to debug code on our small solar kits. Now we all want to build agricultural software.", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=200" },
      { name: "Shri. Vikram Kulkarni", role: "CSR Sponsor", quote: "Supporting these solar labs is the best investment we ever made. The talent in these villages is mind-blowing.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200" }
    ],
    program: {
      title: "Digital Smart Classrooms",
      tagline: "Unlocking STEM and visual programming in remote rural high schools.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
      slug: "digital-classrooms"
    },
    mapCoordinates: { lat: 15.22, lng: 75.30, village: "Kundgol Taluk", district: "Dharwad" },
    multilingual: {
      kannada: {
        title: "ಗ್ರಾಮೀಣ ಯುವತಿಯ ಡಿಜಿಟಲ್ ಸಾಹಸ: ಕೋಡಿಂಗ್‌ನಲ್ಲಿ ದೀಪಾ ಸಾಧನೆ",
        subHeadline: "ಕುಂದಗೋಳದ ಸರ್ಕಾರಿ ಶಾಲೆಯಲ್ಲಿ ಸೌರ ಚಾಲಿತ ಲ್ಯಾಬ್ ಮೂಲಕ ಸ್ವಯಂಚಾಲಿತ ಕೃಷಿ ಸಂವೇದಕ ರೂಪಿಸಿದ ಯುವತಿ.",
        quote: "ಕೋಡಿಂಗ್ ಕಲಿಯುವುದು ನನಗೊಂದು ಪವಾಡವಿದ್ದಂತೆ. ನನ್ನ ತಂದೆಯ ಕೃಷಿ ಸಹಾಯಕ್ಕೆ ನಾನು ಸ್ವಯಂಚಾಲಿತ ಮಣ್ಣಿನ ತೇವಾಂಶ ಸಂವೇದಕ ತಯಾರಿಸಿದ್ದೇನೆ.",
        storySummary: "ದೀಪಾ ಕೀಬೋರ್ಡ್ ಮುಟ್ಟಿಯೂ ನೋಡಿರಲಿಲ್ಲ. ರೈತ ಮಿತ್ರ ಸ್ಥಾಪಿಸಿದ ಸೌರ ಕಂಪ್ಯೂಟರ್ ಲ್ಯಾಬ್ ಅವಳ ಬದುಕನ್ನೇ ಬದಲಿಸಿದೆ."
      }
    }
  },
  "climate-action-community": {
    slug: "climate-action-community",
    title: "The Miyawaki Shield: Venkatesh's Green Ridge Forest",
    subHeadline: "How a dry basalt ridge was transformed into a self-sustaining biodiversity micro-forest to replenish groundwater tables.",
    author: "Elena Petrova, Environmental Scientist",
    publishDate: "January 2026",
    location: "Yaraguppi Ridge, Dharwad",
    readingTime: "4 mins read",
    category: "Environment",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    heroImage: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1600",
    quote: "We spent generations arguing over expensive private water tankers. Now, our community forest harvests the rain for everyone.",
    beneficiary: {
      name: "Venkatesh Joshi",
      age: 52,
      village: "Yaraguppi",
      occupation: "Watershed Committee Lead",
      portrait: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800",
      storySummary: "Venkatesh's village suffered from deep aquifer depletion. Years of heavy stone-quarrying and clear-cutting had left surrounding hills bare, causing rapid flash floods during monsoons followed by absolute drought for 9 months. In 2024, Venkatesh joined Raita Mitra's Community Watershed Committee to implement deep contour bunds and establish a native Miyawaki micro-forest.",
    },
    challenge: {
      title: "Failing Water Aquifers",
      description: "Severe deforestation led to topsoil erosion and groundwater depletion, pushing borewells to a dangerous 800ft depth.",
      statValue: "14 ft",
      statLabel: "Average Ground Water Drop Yearly",
      context: "Unsheltered basalt slopes allowed rainwater to run off in hours, washing away seed beds and leaving local cattle reservoirs completely dry by January.",
      chartData: [
        { subject: "Groundwater Table", Before: 10, After: 80, Full: 100 },
        { subject: "Topsoil Cover", Before: 15, After: 90, Full: 100 },
        { subject: "Sapling Survival", Before: 20, After: 85, Full: 100 },
        { subject: "Fauna Reappearance", Before: 5, After: 75, Full: 100 },
        { subject: "Community Labor", Before: 30, After: 95, Full: 100 }
      ]
    },
    slider: {
      beforeImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800",
      beforeLabel: "Eroded Quarry Wasteland (2023)",
      afterLabel: "Densely Packaged Miyawaki Shield (2026)"
    },
    metrics: [
      { title: "Borewells Revived", type: "Count", value: "45 Wells Live" },
      { title: "Saplings Planted", type: "Count", value: "1,200 Native" },
      { title: "Groundwater Rise", type: "Count", value: "+14 Feet" },
      { title: "Volunteers Active", type: "Count", value: "80 Village Leads" }
    ],
    timeline: [
      { label: "Initial Situation", detail: "Dry ridge slopes caused rapid topsoil run-off and borewell depletion." },
      { label: "Intervention", detail: "Raita Mitra watershed planners mapped contour curves with mechanical elevation devices." },
      { label: "Skill Development", detail: "Villagers learned dense planting (Miyawaki method) and dry stone-check dams assembly." },
      { label: "Transformation", detail: "Volunteers planted 1,200 native species, building dense root layers." },
      { label: "Sustainable Impact", detail: "Groundwater level surged 14 feet, allowing stable multi-seasonal irrigation." }
    ],
    sdgs: [
      { num: 6, title: "Clean Water", desc: "Recharged subterranean aquifers, restoring local drinking water purity." },
      { num: 11, title: "Sustainable Cities", desc: "Constructed local protection zones shielding villages from mudslides." },
      { num: 13, title: "Climate Action", desc: "Sequestrated carbon via dense native forestry, cooling micro-temperatures." },
      { num: 15, title: "Life on Land", desc: "Reintroduced 40+ species of birds, insects, and pollinators to quarry slopes." }
    ],
    voices: [
      { name: "Manjunath Badiger", role: "Local Artisan", quote: "For ten years we argued over water. Now we gather in the shade of our forest to plan seed distributions.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200" },
      { name: "Renuka Pujar", role: "Gram Panchayat Lead", quote: "This is proof that community watershed labor can beat regional climate change without reliance on massive budgets.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" }
    ],
    program: {
      title: "Environmental & Watershed Restoration",
      tagline: "Miyawaki afforestation and check-dam design arrays.",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600",
      slug: "environment-restoration"
    },
    mapCoordinates: { lat: 15.31, lng: 75.18, village: "Yaraguppi Hills", district: "Dharwad" },
    multilingual: {
      kannada: {
        title: "ಮಿಯಾಬಾಕಿ ಅರಣ್ಯ ಕ್ರಾಂತಿ: ಜಲಮೂಲ ಕಾಪಾಡಿದ ವೆಂಕಟೇಶ್",
        subHeadline: "ಬಂಜರು ಗುಡ್ಡದ ಮೇಲೆ ದಟ್ಟವಾದ ನೈಸರ್ಗಿಕ ಅರಣ್ಯ ನಿರ್ಮಿಸಿ ಅಂತರ್ಜಲ ಮರುಪೂರಣ ಮಾಡಿದ ಗ್ರಾಮಸ್ಥರ ಸಾಹಸ.",
        quote: "ಖಾಸಗಿ ನೀರಿನ ಟ್ಯಾಂಕರ್‌ಗಳಿಗಾಗಿ ನಾವು ಜಗಳವಾಡುತ್ತಿದ್ದೆವು. ಇಂದು ನಮ್ಮ ಕಾಡು ನಮ್ಮೆಲ್ಲರ ದಾಹ ತೀರಿಸುತ್ತಿದೆ.",
        storySummary: "ವೆಂಕಟೇಶ್ ಜೋಶಿ ಜಲಾನಯನ ಸಮಿತಿಯ ಮೂಲಕ ೧೨೦೦ ಸಸಿಗಳನ್ನು ನೆಟ್ಟು ಅತಿ ಕಡಿಮೆ ಅವಧಿಯಲ್ಲಿ ಅಂತರ್ಜಲ ಮಟ್ಟವನ್ನು ಹೆಚ್ಚಿಸಿದ್ದಾರೆ."
      }
    }
  }
};

// -------------------------------------------------------------
// Photo Story Masonry Database
// -------------------------------------------------------------
const photoStories = [
  { src: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600", category: "Audit & Prep", title: "Testing soil organic carbon ratios" },
  { src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=600", category: "Hands-on Training", title: "Fermetation check of microbial Jeevamrutha" },
  { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600", category: "Solar Tech Integration", title: "IoT classroom setup for local children" },
  { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600", category: "Community Action", title: "Erection of village contour bund lines" },
  { src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600", category: "Lush Harvest", title: "Water streams returning to dry streams" },
  { src: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&q=80&w=600", category: "Empowerment", title: "Collective spice packaging and labeling" }
];

export default function ImpactStoryDetail({ slug, setActivePage, highContrast }: ImpactStoryDetailProps) {
  // Retrieve story from DB or default to farmer story
  const story = storiesDatabase[slug] || storiesDatabase["transforming-farmer-livelihoods"];

  // Interactive hooks & state managers
  const [langKannada, setLangKannada] = useState<boolean>(false);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [aiSummaryMode, setAiSummaryMode] = useState<"detailed" | "csr" | "pitch">("detailed");
  const [isPlayingNarration, setIsPlayingNarration] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [narrationProgress, setNarrationProgress] = useState<number>(0);
  const [gisLayerActive, setGisLayerActive] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Comments System (Local Storage backed)
  const [comments, setComments] = useState<Array<{ name: string; date: string; content: string; rating: number }>>([]);
  const [commentName, setCommentName] = useState<string>("");
  const [commentText, setCommentText] = useState<string>("");
  const [commentRating, setCommentRating] = useState<number>(5);
  const [commentSuccess, setCommentSuccess] = useState<boolean>(false);

  const [newsletterName, setNewsletterName] = useState<string>("");
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterName || !newsletterEmail) return;

    // POST newsletter subscription to Server backend
    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'Newsletter Signup',
        name: newsletterName,
        email: newsletterEmail,
        phone: '',
        subject: 'Stay Inspired Journal Subscription',
        message: `Subscribed to Stay Inspired updates for story: ${story.title}`,
        metadata: { page: 'Impact Story Detail', storySlug: story.slug, storyTitle: story.title }
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Stay inspired subscription logged:', data);
    })
    .catch(err => {
      console.error('Error logging subscription:', err);
    });

    setNewsletterSubscribed(true);
    alert("Subscription registered! Welcome to the Raita Mitra Journal.");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
    // Load existing comments from localStorage or initialize with some
    const saved = localStorage.getItem(`comments_${story.slug}`);
    let loadedComments = null;
    if (saved) {
      try {
        loadedComments = JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored comments:', e);
      }
    }

    if (loadedComments && Array.isArray(loadedComments)) {
      setComments(loadedComments);
    } else {
      const initial = [
        { name: "Kunal Deshmukh", date: "April 12, 2026", content: "This is exactly what CSR investments should fund—tangible capability building rather than simple handouts. Exceptional reporting!", rating: 5 },
        { name: "Sophia Martinez", date: "June 02, 2026", content: "The interactive slider and timeline make this feel so authentic. Excellent design layout.", rating: 5 }
      ];
      setComments(initial);
      localStorage.setItem(`comments_${story.slug}`, JSON.stringify(initial));
    }
  }, [story.slug]);

  // Audio simulation ticker
  useEffect(() => {
    let interval: any;
    if (isPlayingNarration) {
      interval = setInterval(() => {
        setNarrationProgress(prev => {
          if (prev >= 100) {
            setIsPlayingNarration(false);
            return 0;
          }
          return prev + (1 * playbackSpeed);
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isPlayingNarration, playbackSpeed]);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment = {
      name: commentName,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      content: commentText,
      rating: commentRating
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(`comments_${story.slug}`, JSON.stringify(updated));
    setCommentName("");
    setCommentText("");
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  // Heading display
  const displayTitle = langKannada && story.multilingual ? story.multilingual.kannada.title : story.title;
  const displaySub = langKannada && story.multilingual ? story.multilingual.kannada.subHeadline : story.subHeadline;
  const displayQuote = langKannada && story.multilingual ? story.multilingual.kannada.quote : story.quote;
  const displaySummary = langKannada && story.multilingual ? story.multilingual.kannada.storySummary : story.beneficiary.storySummary;

  // AI Summary options
  const renderAISummaryText = () => {
    if (aiSummaryMode === "csr") {
      return (
        <div className="space-y-3 font-sans text-sm text-slate-700 leading-relaxed">
          <p className="font-extrabold text-forest text-xs tracking-wider uppercase">CSR COMMITTEE SUMMARY SHEET</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Financial Viability:</strong> Chemical fertilizer cost was completely eliminated, converting a risky baseline into steady positive margins.</li>
            <li><strong>Audit Alignment:</strong> Soil carbon indicators, moisture index, and groundwater depths are logged on-ground quarterly.</li>
            <li><strong>ESG Materiality:</strong> Directly impacts UN SDG 1, 2, 5, 8, and 13 with verified non-hazardous farming metrics.</li>
            <li><strong>Recommendation:</strong> Highly suited for multi-year corporate partnerships and localized watershed carbon offset allocations.</li>
          </ul>
        </div>
      );
    }
    if (aiSummaryMode === "pitch") {
      return (
        <div className="space-y-3 font-sans text-sm text-slate-700 leading-relaxed italic">
          <p className="font-extrabold text-gold text-xs tracking-wider uppercase not-italic">1-MINUTE IMPACT PITCH</p>
          <Quote size={18} className="text-gold/40 float-left mr-2" />
          &quot;Meet {story.beneficiary.name}. Three years ago, he was contemplating selling his ancestral lands to factories due to failing water tables and overwhelming credit interest rates. Raita Mitra did not just hand him money; they gave him a solar micro-irrigation system and organic compost technology. Today, his land is fertile, his children are in school, and he is training 300 neighbors. This is how your contribution transforms a village. Support us to duplicate this model across Karnataka.&quot;
        </div>
      );
    }
    return (
      <p className="text-sm md:text-base text-slate-600 leading-relaxed">
        {displaySummary}
      </p>
    );
  };

  return (
    <div className={`pt-24 ${highContrast ? 'bg-black text-white' : 'bg-slate-50/50 text-slate-800'}`}>
      
      {/* -------------------------------------------------------------
          TOP BAR CONTROLS (Translation, AI summaries, Audio Narration)
          ------------------------------------------------------------- */}
      <div className={`sticky top-20 z-40 py-3 border-b ${
        highContrast ? 'bg-black border-white' : 'bg-white/90 backdrop-blur-md shadow-sm border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActivePage('stories')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                highContrast ? 'border-2 border-white hover:bg-white hover:text-black' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <ArrowLeft size={14} />
              Back to Stories
            </button>
            <span className="text-slate-300 text-sm">/</span>
            <span className="text-xs font-mono text-slate-500 hidden md:inline truncate max-w-[200px]">{story.title}</span>
          </div>

          {/* Interactive Tools */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Multilingual Translation */}
            <button 
              onClick={() => setLangKannada(!langKannada)}
              className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                langKannada 
                  ? 'bg-emerald-900 text-white shadow-md' 
                  : highContrast 
                    ? 'border-2 border-white text-white' 
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Languages size={13} />
              {langKannada ? 'English View' : 'ಕನ್ನಡದಲ್ಲಿ ಓದಿ (Kannada)'}
            </button>

            {/* Audio Narration Widget */}
            <div className={`flex items-center gap-2 py-1 px-3 rounded-xl border text-xs font-sans ${
              highContrast ? 'border-white bg-black' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <button 
                onClick={() => setIsPlayingNarration(!isPlayingNarration)}
                className="p-1 rounded-full bg-emerald-800 text-white hover:bg-emerald-700 transition-colors"
                title="Play Audio Narration"
              >
                {isPlayingNarration ? <Pause size={12} className="animate-pulse" /> : <Play size={12} />}
              </button>
              <Volume2 size={13} className="text-slate-400 hidden sm:inline" />
              <span className="font-mono text-[10px] tracking-wider hidden sm:inline">NARRATION</span>
              {isPlayingNarration && (
                <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden hidden md:block">
                  <div className="h-full bg-emerald-700 transition-all duration-300" style={{ width: `${narrationProgress}%` }}></div>
                </div>
              )}
              {/* Pitch Controller */}
              <select 
                value={playbackSpeed} 
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="bg-transparent border-none text-[10px] font-bold text-slate-500 font-mono outline-none py-0.5"
              >
                <option value="0.75">0.75x</option>
                <option value="1.0">1.0x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
              </select>
            </div>

            {/* AI Summary Toggles */}
            <div className="flex items-center gap-1 bg-slate-100/80 p-0.5 rounded-lg border border-slate-200 text-[10px] font-bold">
              <button 
                onClick={() => setAiSummaryMode("detailed")}
                className={`px-2 py-1 rounded transition-colors ${aiSummaryMode === 'detailed' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                Detailed
              </button>
              <button 
                onClick={() => setAiSummaryMode("csr")}
                className={`px-2 py-1 rounded transition-colors ${aiSummaryMode === 'csr' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                CSR Summary
              </button>
              <button 
                onClick={() => setAiSummaryMode("pitch")}
                className={`px-2 py-1 rounded transition-colors ${aiSummaryMode === 'pitch' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                1m Pitch
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          1. CINEMATIC HERO SECTION
          ------------------------------------------------------------- */}
      <section className="relative w-full aspect-[21/9] min-h-[450px] md:min-h-[550px] overflow-hidden flex items-end">
        {/* Background Auto-Looping Video */}
        <video 
          src={story.videoUrl}
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Safe Back-up Fallback Overlay Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
          style={{ 
            backgroundImage: `url(${story.heroImage})`,
            opacity: isPlayingNarration ? 0.3 : 0.85, // Ambient dimming when playing
            mixBlendMode: 'multiply'
          }}
        />
        {/* Deep Cinema Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent hidden md:block" />

        {/* Hero Meta Info */}
        <div className="relative w-full max-w-7xl mx-auto px-4 pb-12 md:pb-16 text-left z-20 space-y-4">
          
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-gold text-slate-950 font-bold uppercase tracking-wider">
              {story.category}
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-white/10 text-white backdrop-blur-sm border border-white/15">
              Verified Audit Report
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white max-w-4xl leading-tight">
            {displayTitle}
          </h1>

          <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
            {displaySub}
          </p>

          {/* Journalism Meta Information Block */}
          <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-[11px] md:text-xs font-mono text-slate-400 border-t border-white/10 max-w-3xl">
            <div className="flex items-center gap-1.5">
              <UserCheck size={14} className="text-gold" />
              <span>By: {story.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>Published: {story.publishDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-emerald-500" />
              <span>{story.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{story.readingTime}</span>
            </div>
          </div>
        </div>

        {/* Floating Social Share Bar */}
        <div className="absolute right-4 bottom-24 z-30 flex flex-col gap-2.5">
          <a 
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(story.title + ' ' + window.location.href)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            title="Share via WhatsApp"
          >
            <span className="font-bold text-[10px]">WA</span>
          </a>
          <a 
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            title="Share on LinkedIn"
          >
            <span className="font-bold text-[10px]">LN</span>
          </a>
          <a 
            href="mailto:?subject=Raita Mitra Social Trust - Story of Change"
            className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            title="Share via Email"
          >
            <span className="font-bold text-[10px]">✉</span>
          </a>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. FEATURED PORTRAYED QUOTE SECTION
          ------------------------------------------------------------- */}
      <section className="py-12 bg-emerald-950 text-white text-center relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-800/20 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <Quote size={48} className="text-gold mx-auto opacity-70 animate-pulse" />
          
          <blockquote className="font-serif text-xl md:text-3xl font-medium italic leading-relaxed tracking-wide text-emerald-100">
            &quot;{displayQuote}&quot;
          </blockquote>

          <div className="flex items-center justify-center gap-3 pt-3">
            <div className="w-12 h-12 rounded-full border-2 border-gold overflow-hidden">
              <img 
                src={story.beneficiary.portrait} 
                alt={story.beneficiary.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-left font-sans">
              <p className="font-bold text-white text-sm tracking-wide uppercase">{story.beneficiary.name}</p>
              <p className="text-xs text-gold font-mono">{story.beneficiary.occupation}, Age {story.beneficiary.age}</p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. MEET THE CHANGE MAKER (Split Screen Beneficiary Profile)
          ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Premium high-res portrait with decorative border */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-gold/30 to-emerald-800/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white aspect-[4/5] shadow-xl">
              <img 
                src={story.beneficiary.portrait} 
                alt={story.beneficiary.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                <p className="text-[10px] text-slate-400 font-mono">DISTRICT OF OPERATIONS</p>
                <p className="text-xs font-bold text-white">{story.location}</p>
              </div>
            </div>
          </div>

          {/* Right: Personal Bio summary and AI Summary text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-gold block">
              MEET THE CHANGE MAKER
            </span>
            <h2 className={`text-3xl md:text-4xl font-display font-extrabold tracking-tight ${
              highContrast ? 'text-white' : 'text-slate-900'
            }`}>
              {story.beneficiary.name}
            </h2>

            {/* Micro details grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-slate-200 font-mono text-xs text-slate-500">
              <div>
                <span className="block text-[10px] text-slate-400 uppercase">Age</span>
                <span className="text-sm font-bold text-slate-800">{story.beneficiary.age} Years</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase">Village</span>
                <span className="text-sm font-bold text-slate-800">{story.beneficiary.village}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase">Occupation</span>
                <span className="text-sm font-bold text-slate-800 leading-none">{story.beneficiary.occupation}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase">Assistance Program</span>
                <span className="text-sm font-bold text-emerald-700 leading-none">{story.category}</span>
              </div>
            </div>

            {/* Simulated AI summaries and story summary */}
            <div className={`p-6 rounded-2xl border-l-4 border-emerald-800 ${
              highContrast ? 'bg-black border-2 border-white text-white' : 'bg-white shadow-soft-elevation'
            }`}>
              {renderAISummaryText()}
            </div>

            <p className="text-slate-600 leading-relaxed text-sm font-sans">
              {story.narrative}
            </p>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          4. THE CHALLENGE SECTION (with Recharts Radar/Bar Analytics)
          ------------------------------------------------------------- */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t border-b border-white' : 'bg-slate-100/50 border-t border-b border-slate-200/50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">THE SOCIO-ECONOMIC LANDSCAPE</span>
            <h2 className={`text-3xl md:text-4xl font-display font-extrabold ${
              highContrast ? 'text-white' : 'text-slate-900'
            }`}>
              {story.challenge.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              {story.challenge.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Context details & stat card */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className={`p-8 rounded-3xl text-center border ${
                highContrast ? 'bg-black border-white' : 'bg-gradient-to-br from-rose-50 to-white border-rose-100 shadow-sm'
              }`}>
                <span className="text-[10px] uppercase font-mono tracking-wider text-rose-600 font-bold block mb-2">Regional baseline crisis</span>
                <p className="text-5xl md:text-6xl font-display font-black text-rose-600">{story.challenge.statValue}</p>
                <p className="text-xs font-mono font-bold text-slate-500 mt-2 uppercase tracking-wide">{story.challenge.statLabel}</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-display font-bold text-slate-900 text-lg">Context Analysis</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {story.challenge.context}
                </p>
                <p className="text-xs text-slate-400 italic">
                  Data sourced from audited baseline household surveys conducted prior to Raita Mitra's project initiation.
                </p>
              </div>
            </div>

            {/* Right side: Recharts Radar Chart */}
            <div className="lg:col-span-7 flex justify-center">
              <div className={`w-full max-w-md aspect-square rounded-3xl p-6 border ${
                highContrast ? 'bg-black border-white text-white' : 'bg-white border-slate-200/60 shadow-md'
              }`}>
                <h4 className="font-display font-bold text-slate-800 text-sm mb-4 text-center">Multi-dimensional Capability Growth (Before vs. After)</h4>
                
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={story.challenge.chartData}>
                      <PolarGrid stroke={highContrast ? '#fff' : '#e2e8f0'} />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: highContrast ? '#fff' : '#475569', fontSize: 10, fontWeight: 'bold' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: highContrast ? '#fff' : '#94a3b8', fontSize: 8 }} />
                      <Radar name="Before" dataKey="Before" stroke="#dc2626" fill="#f87171" fillOpacity={0.4} />
                      <Radar name="After" dataKey="After" stroke="#047857" fill="#34d399" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-center gap-6 mt-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-rose-400 rounded-sm"></span>
                    <span>Before (Distress Baseline)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-emerald-400 rounded-sm"></span>
                    <span>After (Raita Mitra Ecosystem)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          5. HOW RAITA MITRA HELPED (Intervention Process)
          ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">THE SUSTAINABILITY METHODOLOGY</span>
          <h2 className={`text-3xl md:text-4xl font-display font-extrabold ${
            highContrast ? 'text-white' : 'text-slate-900'
          }`}>
            6-Step Capability Intervention
          </h2>
          <p className="text-xs md:text-sm text-slate-500">
            How our grassroot volunteers implement long-term structural changes rather than short-term emergency charity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: "01", step: "Identification", desc: "Scientific auditing of local soil Chemistry, aquifer hydrology, and household baseline debts." },
            { id: "02", step: "Training", desc: "Hands-on, non-jargon seminars in compost brewing, bookkeeping, and micro-drip engineering." },
            { id: "03", step: "Support", desc: "Sourcing certified solar grids, seeds, and hardware toolboxes directly to village doorsteps." },
            { id: "04", step: "Implementation", desc: "Physical implementation support alongside volunteers, setting up bunds and IT labs." },
            { id: "05", step: "Mentoring", desc: "Cooperative structural building, bank linkage facilitation, and wholesale negotiation support." },
            { id: "06", step: "Monitoring", desc: "Quarterly geo-tagged field visits and open ledger checks to track continued yield growth." }
          ].map((item, index) => (
            <div 
              key={item.id}
              className={`p-6 rounded-2xl border text-left flex flex-col justify-between transition-all shadow-sm ${
                highContrast ? 'bg-black border-white' : 'bg-white border-slate-100 hover:border-emerald-800'
              }`}
            >
              <div>
                <span className="text-4xl font-display font-black text-slate-200 block border-b border-slate-100 pb-2 mb-4 font-mono group-hover:text-gold transition-colors">
                  {item.id}
                </span>
                <h4 className="font-display font-bold text-slate-800 text-lg mb-2">{item.step}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">{item.desc}</p>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-mono text-emerald-800 font-bold mt-4 block">
                PHASE APPROVED
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          6. TRANSFORMATION JOURNEY (Interactive Before & After Slider)
          ------------------------------------------------------------- */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t border-b border-white' : 'bg-emerald-950/5 border-t border-b border-emerald-900/10'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">VISUAL COMPLIANCE AUDIT</span>
            <h2 className={`text-3xl md:text-4xl font-display font-extrabold ${
              highContrast ? 'text-white' : 'text-slate-900'
            }`}>
              Interactive Before & After
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              Drag or slide the center control bar left and right to inspect the physical change of our beneficiary's ecosystem.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Interactive Slider Container */}
            <div className="relative h-96 w-full rounded-3xl overflow-hidden select-none border border-slate-200 shadow-lg">
              {/* Before Image */}
              <img 
                src={story.slider.beforeImage} 
                alt="Before Status" 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-rose-600/90 text-white font-mono font-bold text-xs px-3 py-1 rounded-xl">
                {story.slider.beforeLabel}
              </div>

              {/* After Image with clipping mask controlled by sliderPos */}
              <div 
                className="absolute inset-0 w-full h-full"
                style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
              >
                <img 
                  src={story.slider.afterImage} 
                  alt="After Success" 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-emerald-600/95 text-white font-mono font-bold text-xs px-3 py-1 rounded-xl">
                  {story.slider.afterLabel}
                </div>
              </div>

              {/* Slider Control Line */}
              <div 
                className="absolute top-0 bottom-0 w-1.5 bg-white cursor-ew-resize z-20 flex items-center justify-center shadow"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-10 h-10 rounded-full bg-emerald-800 border-2 border-white flex items-center justify-center shadow-lg text-white">
                  <Sparkles size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
                </div>
              </div>

              {/* Native Hidden Range Input covering the area */}
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderPos} 
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              />
            </div>

            {/* Quick Helper buttons */}
            <div className="flex justify-between mt-4 text-xs font-mono">
              <button 
                onClick={() => setSliderPos(0)} 
                className={`px-3 py-1.5 rounded-lg border ${highContrast ? 'border-white' : 'border-slate-200 hover:bg-slate-100'}`}
              >
                Show Baseline (100% Before)
              </button>
              <button 
                onClick={() => setSliderPos(50)} 
                className={`px-3 py-1.5 rounded-lg border ${highContrast ? 'border-white' : 'border-slate-200 hover:bg-slate-100'}`}
              >
                Split Screen (50/50)
              </button>
              <button 
                onClick={() => setSliderPos(100)} 
                className={`px-3 py-1.5 rounded-lg border ${highContrast ? 'border-white' : 'border-slate-200 hover:bg-slate-100'}`}
              >
                Show Success (100% After)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          7. IMPACT SNAPSHOT (Animated counters / cards)
          ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">VERIFIED AUDIT SNAPSHOT</span>
          <h2 className={`text-3xl md:text-4xl font-display font-extrabold ${
            highContrast ? 'text-white' : 'text-slate-900'
          }`}>
            Impact Snapshot
          </h2>
          <p className="text-xs md:text-sm text-slate-500">
            Real progress metrics compiled from geo-referenced on-ground audits, tracking agricultural yields, energy, and education hours.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {story.metrics.map((m: any, idx: number) => (
            <div 
              key={idx}
              className={`p-8 rounded-3xl border text-center flex flex-col justify-center space-y-2 ${
                highContrast ? 'bg-black border-white' : 'bg-white border-slate-100 shadow-sm shadow-emerald-900/5'
              }`}
            >
              <span className="text-xs font-mono uppercase text-slate-400">{m.title}</span>
              <p className="text-3xl md:text-5xl font-display font-black text-emerald-800 tracking-tight">{m.value}</p>
              <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-widest">
                VERIFIED INDEX
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          8. PHOTO STORY (Pinterest Masonry) & 9. VIDEO DOCUMENTARY
          ------------------------------------------------------------- */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t border-b border-white' : 'bg-slate-100/30 border-t border-b border-slate-200/50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side: Video Documentary section */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-gold block">
                FIELD ARCHIVE & VIDEO
              </span>
              <h3 className={`text-2xl md:text-3xl font-display font-extrabold tracking-tight ${
                highContrast ? 'text-white' : 'text-slate-900'
              }`}>
                Video Documentary
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Watch verified field footage, detailing the structural support and volunteer activity.
              </p>

              {/* Video frame block */}
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <video 
                  src={story.videoUrl} 
                  controls 
                  poster={story.heroImage}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className={`p-5 rounded-2xl border ${
                highContrast ? 'border-white bg-black' : 'bg-white border-slate-100'
              } flex items-center gap-3`}>
                <Tv size={24} className="text-gold" />
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Support for Vimeo & YouTube</p>
                  <p className="text-slate-400 leading-normal">Our CMS links direct embeds from vetted streaming arrays.</p>
                </div>
              </div>
            </div>

            {/* Right side: Photo Story Pinterest Masonry */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-gold block">
                PHOTO STORY
              </span>
              <h3 className={`text-2xl md:text-3xl font-display font-extrabold tracking-tight ${
                highContrast ? 'text-white' : 'text-slate-900'
              }`}>
                The Journey in Pixels
              </h3>
              
              <div className="columns-1 sm:columns-2 gap-4 space-y-4">
                {photoStories.map((photo, index) => (
                  <div 
                    key={index}
                    onClick={() => setLightboxIndex(index)}
                    className="break-inside-avoid relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 group hover:scale-[1.01]"
                  >
                    <img 
                      src={photo.src} 
                      alt={photo.title} 
                      className="w-full h-auto object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-left">
                      <span className="text-[9px] font-mono uppercase bg-gold text-slate-950 font-bold px-1.5 py-0.5 rounded-sm self-start mb-1">
                        {photo.category}
                      </span>
                      <p className="text-xs font-bold text-white">{photo.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          10. JOURNEY TIMELINE (Step Highlights)
          ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">MILESTONE CHRONOLOGY</span>
          <h2 className={`text-3xl md:text-4xl font-display font-extrabold ${
            highContrast ? 'text-white' : 'text-slate-900'
          }`}>
            Journey Timeline
          </h2>
          <p className="text-xs md:text-sm text-slate-500">
            A linear review of the milestone transitions completed by {story.beneficiary.name} in partnership with Raita Mitra Social Trust.
          </p>
        </div>

        {/* Horizontal scroll timeline on large screens, vertical on mobile */}
        <div className="relative border-l border-slate-200 md:border-l-0 md:border-t md:border-slate-200 md:flex md:justify-between pl-6 md:pl-0 pt-0 md:pt-10 space-y-8 md:space-y-0 text-left max-w-4xl mx-auto">
          {story.timeline.map((event: any, idx: number) => (
            <div key={idx} className="relative md:flex-1 md:px-4">
              
              {/* Timeline bubble indicator */}
              <div className="absolute -left-[31px] top-0.5 md:left-4 md:-top-[49px] w-4 h-4 rounded-full bg-emerald-800 border-2 border-white flex items-center justify-center z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                  {event.label}
                </span>
                <p className="text-xs text-slate-500 leading-relaxed font-sans pt-1">
                  {event.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          11. ALIGNED WITH UN SDGs SECTION
          ------------------------------------------------------------- */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t border-b border-white' : 'bg-emerald-950 text-white'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-14">
            <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">GLOBAL INTEGRITY MATRIX</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold">
              Aligned with UN Sustainable Goals
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              Raita Mitra's local micro-empowerment frameworks directly support the United Nations 2030 Agenda for Sustainable Development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {story.sdgs.map((sdg: any, idx: number) => (
              <div 
                key={idx}
                className={`p-6 rounded-2xl text-left border flex flex-col justify-between ${
                  highContrast 
                    ? 'bg-black border-white' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 transition-colors'
                }`}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center text-slate-950 font-display font-black text-xl">
                    {sdg.num}
                  </div>
                  <h4 className="font-display font-bold text-white text-base">{sdg.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{sdg.desc}</p>
                </div>
                <span className="text-[9px] font-mono text-gold uppercase tracking-widest mt-4 block">
                  SDG ALIGNED
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          12. COMMUNITY VOICES CAROUSEL SECTION
          ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs uppercase font-mono tracking-wider text-gold font-bold">COLLABORATIVE VOICE INDEX</span>
          <h2 className={`text-3xl md:text-4xl font-display font-extrabold ${
            highContrast ? 'text-white' : 'text-slate-900'
          }`}>
            Voices from the Community
          </h2>
          <p className="text-xs md:text-sm text-slate-500">
            Read direct assessments and quotes from adjacent village authorities, neighbors, and volunteers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {story.voices.map((voice: any, idx: number) => (
            <div 
              key={idx}
              className={`p-8 rounded-3xl border text-left relative italic font-serif flex flex-col justify-between ${
                highContrast ? 'bg-black border-white' : 'bg-white border-slate-100 shadow-lg shadow-slate-900/5'
              }`}
            >
              <div>
                <Quote size={28} className="text-gold/25 absolute right-6 top-6" />
                <p className="text-sm text-slate-600 leading-relaxed">&quot;{voice.quote}&quot;</p>
              </div>
              
              <div className="flex items-center gap-3 pt-6 border-t border-slate-100 mt-6 not-italic font-sans">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                  <img 
                    src={voice.image} 
                    alt={voice.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 text-xs">{voice.name}</h5>
                  <p className="text-[10px] text-slate-400 font-mono">{voice.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          13. WHERE THE STORY HAPPENED (Interactive Karnataka Map)
          ------------------------------------------------------------- */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t border-b border-white' : 'bg-slate-900 text-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info block */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-gold flex items-center gap-1">
                <Map size={14} />
                OPERATIONAL GEOGRAPHY
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
                Where It Happened
              </h2>
              
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 font-mono text-xs text-slate-300">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-slate-400">Village Sector:</span>
                  <span className="font-bold text-white">{story.mapCoordinates.village}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-slate-400">Taluk / District:</span>
                  <span className="font-bold text-white">{story.mapCoordinates.district}, Karnataka</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-slate-400">Map GPS Points:</span>
                  <span className="font-bold text-gold">Lat: {story.mapCoordinates.lat}, Lon: {story.mapCoordinates.lng}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Sparkles size={14} className="text-emerald-400" />
                <span>GIS integration ready: Toggle live mapping database.</span>
              </div>
              
              <button 
                onClick={() => setGisLayerActive(!gisLayerActive)}
                className={`w-full sm:w-auto py-2.5 px-5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  gisLayerActive 
                    ? 'bg-emerald-800 text-white' 
                    : highContrast 
                      ? 'border-2 border-white text-white bg-black' 
                      : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
                }`}
              >
                <Layers size={14} />
                {gisLayerActive ? 'Hide Carbon & Water GIS Layer' : 'Overlay Soil Carbon & Water Table GIS'}
              </button>
            </div>

            {/* Right Map Canvas representation */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative w-full max-w-md aspect-square bg-white/5 rounded-3xl border border-white/10 p-6 flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                {/* Simulated GIS map overlays */}
                <AnimatePresence>
                  {gisLayerActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.65 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-emerald-500/10 z-20 pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                <svg viewBox="0 0 400 400" className="w-full h-full z-10 max-h-[360px]">
                  <path 
                    d="M 120 40 L 170 30 L 220 50 L 260 80 L 280 120 L 250 180 L 260 230 L 240 280 L 210 320 L 200 370 L 160 380 L 130 350 L 140 290 L 110 240 L 100 170 L 110 100 Z" 
                    fill="rgba(16, 185, 129, 0.08)" 
                    stroke="rgba(16, 185, 129, 0.25)" 
                    strokeWidth="2" 
                    strokeDasharray="4 4"
                  />
                  
                  {/* Glowing core location dot */}
                  <g>
                    <circle cx="160" cy="180" r="18" fill="rgba(201, 154, 50, 0.2)" className="animate-ping" />
                    <circle cx="160" cy="180" r="8" fill="#C99A32" />
                    <circle cx="160" cy="180" r="3" fill="#fff" />
                    <text x="175" y="185" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                      {story.beneficiary.village}
                    </text>
                  </g>

                  {/* Operational region reference bounds if GIS layer active */}
                  {gisLayerActive && (
                    <g>
                      <path d="M 110 100 Q 140 120 160 180 T 210 320" stroke="#059669" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                      <circle cx="140" cy="120" r="4" fill="#059669" />
                      <text x="148" y="123" fill="#34d399" fontSize="8" fontFamily="monospace">Carbon Cap +14%</text>
                      <circle cx="180" cy="240" r="4" fill="#059669" />
                      <text x="188" y="243" fill="#34d399" fontSize="8" fontFamily="monospace">Water Rise +14ft</text>
                    </g>
                  )}
                </svg>

                <div className="absolute bottom-4 left-4 right-4 text-center z-20 text-[10px] font-mono text-slate-400">
                  Karnataka State Operational Boundary Survey • Hebsur Taluk Sector
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          14. RELATED PROGRAM CONNECTION CARD
          ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-lg flex flex-col md:flex-row">
          <div className="md:w-1/2 aspect-video md:aspect-auto">
            <img 
              src={story.program.image} 
              alt={story.program.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-8 md:w-1/2 space-y-4 text-left flex flex-col justify-center">
            <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-bold self-start">
              Graduated Program Link
            </span>
            <h4 className="font-display font-extrabold text-xl text-slate-900 leading-snug">{story.program.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">{story.program.tagline}</p>
            <button 
              onClick={() => setActivePage(`programs/${story.program.slug}`)}
              className="px-4 py-2.5 rounded-xl font-display font-bold text-xs cursor-pointer text-center transition-colors bg-emerald-800 text-white hover:bg-emerald-700 flex items-center gap-1.5 self-start"
            >
              Explore Core Program
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          15. DOWNLOADS & RESOURCES SECTION
          ------------------------------------------------------------- */}
      <section className={`py-16 ${highContrast ? 'bg-black border-t border-white text-white' : 'bg-slate-100/50 border-t border-slate-200/50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <h3 className={`text-2xl font-display font-extrabold ${highContrast ? 'text-white' : 'text-slate-900'}`}>
              Downloads & Verified Resources
            </h3>
            <p className="text-xs text-slate-500 max-w-xl mx-auto">
              Access the direct scientific compliance data and audited sheets for CSR verification and ESG accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Academic Case Study PDF", size: "1.4 MB", desc: "Detailed agronomical survey of Hebsur Basin crops." },
              { title: "Verified ESG Impact Sheet", size: "640 KB", desc: "Before vs after soil nitrogen and carbon parameters." },
              { title: "Media Pack & High-Res Photos", size: "14.2 MB", desc: "Editorial and documentary photo pack zip archives." },
              { title: "Donors Slides Deck", size: "4.1 MB", desc: "PowerPoint overview for Foundation Board presentation." }
            ].map((doc, idx) => (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between ${
                  highContrast ? 'bg-black border-white text-white' : 'bg-white border-slate-200/60 shadow-sm'
                }`}
              >
                <div className="space-y-2">
                  <FileText size={24} className="text-emerald-700" />
                  <h5 className="font-bold text-slate-800 text-xs">{doc.title}</h5>
                  <p className="text-[10px] text-slate-400 leading-normal">{doc.desc}</p>
                </div>
                
                <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
                  <span className="text-[9px] font-mono text-slate-400">{doc.size}</span>
                  <button 
                    onClick={() => alert(`Simulating file download: ${doc.title}`)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    title="Download File"
                  >
                    <Download size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          17. RELATED STORIES OF CHANGE
          ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs uppercase font-mono tracking-wider text-emerald-800 font-bold">AI RECOMMENDATION SERVICE</span>
          <h2 className={`text-3xl md:text-4xl font-display font-extrabold ${
            highContrast ? 'text-white' : 'text-slate-900'
          }`}>
            More Stories of Change
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.values(storiesDatabase)
            .filter((item: any) => item.slug !== story.slug)
            .slice(0, 3)
            .map((item: any, idx: number) => (
              <div 
                key={idx}
                className={`rounded-3xl overflow-hidden border text-left flex flex-col justify-between transition-all shadow-sm ${
                  highContrast ? 'bg-black border-white' : 'bg-white border-slate-200/50 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="h-44 w-full relative overflow-hidden">
                    <img 
                      src={item.heroImage} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-900 text-white font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-2">
                    <span className="text-[10px] font-mono text-slate-400">{item.location}</span>
                    <h4 className="font-display font-bold text-slate-800 text-sm leading-tight line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button 
                    onClick={() => setActivePage(`impact-stories/${item.slug}`)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Read Full Journey
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          18. DONATION & VOLUNTEER CTA (with parallax simulated image)
          ------------------------------------------------------------- */}
      <section className="relative py-24 overflow-hidden flex items-center text-center text-white">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=1600)' }}
        />
        <div className="absolute inset-0 bg-slate-950/80" />
        
        <div className="relative w-full max-w-4xl mx-auto px-4 z-10 space-y-6">
          <Heart size={44} className="text-rose-500 mx-auto animate-pulse" />
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight">
            Help Create More Stories Like This
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Your generous CSR partnership or monthly donor subscription can directly duplicate this micro-forest or smart coding lab to adjacent rural taluks.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => setActivePage('donate')}
              className="px-6 py-3 rounded-xl font-display font-bold text-xs cursor-pointer text-center transition-colors bg-gold hover:bg-gold-light text-slate-950 flex items-center gap-1.5"
            >
              Donate Now
              <Heart size={13} fill="currentColor" />
            </button>
            <button 
              onClick={() => setActivePage('volunteer')}
              className="px-6 py-3 rounded-xl font-display font-bold text-xs cursor-pointer text-center transition-colors bg-white/10 hover:bg-white/20 text-white border border-white/15"
            >
              Become A Partner / Volunteer
            </button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          19. NEWSLETTER SUBSCRIPTION SECTION
          ------------------------------------------------------------- */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        <div className={`p-8 md:p-12 rounded-3xl text-center border relative overflow-hidden ${
          highContrast ? 'bg-black border-white text-white' : 'bg-white border-slate-200/50 shadow-xl shadow-slate-900/5'
        }`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/5 rounded-full blur-2xl" />
          
          <div className="relative z-10 max-w-lg mx-auto space-y-4">
            <Megaphone size={32} className="text-gold mx-auto" />
            <h3 className="text-xl md:text-2xl font-display font-extrabold tracking-tight">Stay Inspired</h3>
            <p className="text-xs text-slate-400">
              Get raw, field-journal stories of resilience, sustainability, and educational technology delivered straight to your email. No spam, ever.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="pt-4 flex flex-col sm:flex-row gap-2">
              <input 
                type="text" 
                placeholder="Name" 
                required
                value={newsletterName}
                onChange={e => setNewsletterName(e.target.value)}
                className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-sans outline-none border ${
                  highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 focus:border-emerald-800 focus:bg-white'
                }`}
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-sans outline-none border ${
                  highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 focus:border-emerald-800 focus:bg-white'
                }`}
              />
              <button 
                type="submit"
                className="px-5 py-2.5 rounded-xl font-display font-bold text-xs bg-emerald-800 text-white hover:bg-emerald-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          20. COMMENTS & STAKEHOLDER INPUT SECTION
          ------------------------------------------------------------- */}
      <section className={`py-20 ${highContrast ? 'bg-black border-t border-white' : 'bg-white border-t border-slate-100'}`}>
        <div className="max-w-3xl mx-auto px-4 text-left">
          <div className="space-y-2 mb-10">
            <h3 className="text-2xl font-display font-extrabold text-slate-900">Share Your Thoughts</h3>
            <p className="text-xs text-slate-400">
              Contribute your perspectives or queries regarding the feasibility, compliance, or duplicate scaling of this story's model.
            </p>
          </div>

          {/* Form to submit feedback */}
          <form onSubmit={handlePostComment} className="space-y-4 mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Your Name</label>
                <input 
                  type="text" 
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="Kunal Deshmukh" 
                  required
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-sans outline-none border ${
                    highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 focus:border-emerald-800 focus:bg-white'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Rating Star (1-5)</label>
                <select 
                  value={commentRating}
                  onChange={(e) => setCommentRating(parseInt(e.target.value))}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-sans outline-none border ${
                    highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 focus:border-emerald-800 focus:bg-white'
                  }`}
                >
                  <option value="5">⭐⭐⭐⭐⭐ (Excellent Impact)</option>
                  <option value="4">⭐⭐⭐⭐ (Good Modeling)</option>
                  <option value="3">⭐⭐⭐ (Average Framework)</option>
                  <option value="2">⭐⭐ (Needs Work)</option>
                  <option value="1">⭐ (Unsatisfactory)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Your Perspective</label>
              <textarea 
                rows={4}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Post a query, suggest a scaling partnership, or leave feedback..." 
                required
                className={`w-full px-4 py-2.5 rounded-xl text-xs font-sans outline-none border ${
                  highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-200 focus:border-emerald-800 focus:bg-white'
                }`}
              />
            </div>

            <button 
              type="submit"
              className="px-5 py-2.5 rounded-xl font-display font-bold text-xs bg-emerald-800 text-white hover:bg-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              Post Feedback
              <Send size={12} />
            </button>

            {commentSuccess && (
              <p className="text-xs text-emerald-600 font-bold font-mono">
                ✓ Thank you! Your perspective has been securely synchronized with the local story's audit ledger.
              </p>
            )}
          </form>

          {/* Render comments */}
          <div className="space-y-6">
            <h4 className="font-display font-bold text-slate-800 text-sm">Synchronized Stakeholder Ledger ({comments.length} Comments)</h4>
            
            <div className="space-y-4">
              {comments.map((cmt, index) => (
                <div key={index} className={`p-5 rounded-2xl border ${
                  highContrast ? 'bg-black border-white text-white' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h5 className="font-bold text-slate-800 text-xs">{cmt.name}</h5>
                      <p className="text-[10px] text-slate-400 font-mono">{cmt.date}</p>
                    </div>
                    <span className="text-xs text-gold">
                      {"★".repeat(cmt.rating)}{"☆".repeat(5 - cmt.rating)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {cmt.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          LIGHTBOX FOR MASONRY PHOTOS
          ------------------------------------------------------------- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center p-4"
          >
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 text-white hover:text-gold p-2 cursor-pointer"
            >
              ✕ Close Lightbox
            </button>

            <div className="relative max-w-3xl max-h-[80vh]">
              <img 
                src={photoStories[lightboxIndex].src} 
                alt={photoStories[lightboxIndex].title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
              <div className="mt-4 text-center text-white text-xs">
                <span className="text-[10px] uppercase font-mono text-gold font-bold">
                  {photoStories[lightboxIndex].category}
                </span>
                <p className="font-bold mt-1">{photoStories[lightboxIndex].title}</p>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="absolute bottom-10 flex gap-4 text-xs font-mono text-white">
              <button 
                onClick={() => setLightboxIndex(prev => prev !== null && prev > 0 ? prev - 1 : photoStories.length - 1)}
                className="px-3 py-1.5 bg-white/10 rounded hover:bg-white/20"
              >
                ◀ Previous
              </button>
              <span className="self-center">
                {lightboxIndex + 1} / {photoStories.length}
              </span>
              <button 
                onClick={() => setLightboxIndex(prev => prev !== null && prev < photoStories.length - 1 ? prev + 1 : 0)}
                className="px-3 py-1.5 bg-white/10 rounded hover:bg-white/20"
              >
                Next ▶
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
