import { motion, useScroll, useSpring, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

/* ── Data ── */
const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const skillCategories = [
  {
    icon: "⚡",
    title: "Languages",
    color: "cyan",
    items: ["Python", "SQL", "C", "HTML", "CSS"],
  },
  {
    icon: "🧠",
    title: "AI & Machine Learning",
    color: "green",
    items: ["YOLOv11", "Prophet", "LSTM", "Agentic Systems"],
  },
  {
    icon: "✨",
    title: "Generative AI",
    color: "pink",
    items: ["Generative AI", "LLMs", "RAG", "Prompt Engineering"],
  },
  {
    icon: "🧩",
    title: "Frameworks & Libraries",
    color: "yellow",
    items: ["FastAPI", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "Capacitor.js", "LangChain"],
  },
  {
    icon: "🗄️",
    title: "Databases",
    color: "cyan",
    items: ["MySQL", "PostgreSQL", "SQLite", "MongoDB", "Firestore", "ChromaDB"],
  },
  {
    icon: "☁️",
    title: "Cloud & Deployment",
    color: "green",
    items: ["Firebase", "AWS (EC2, S3)", "Google Cloud Platform", "Vercel", "Streamlit Cloud"],
  },
  {
    icon: "🛠️",
    title: "Tools & Platforms",
    color: "pink",
    items: ["Git", "GitHub", "Android Studio", "OpenCV", "Power BI", "WebSockets", "REST APIs", "Google AI Studio"],
  },
];

const certifications = [
  { name: "Google AI Professional Certificate", org: "Google (Coursera)", year: "2026" },
  { name: "Data Analytics with Python", org: "NPTEL, IIT Roorkee", year: "2026" },
  { name: "Artificial Intelligence Fundamentals", org: "IBM SkillsBuild", year: "2025" },
  { name: "Networking and Cloud Computing", org: "Microsoft (Coursera)", year: "2025" },
  { name: "Python Data Analysis", org: "Rice University (Coursera)", year: "2025" },
];

const projects = [
  {
    title: "Orbit AI Engineering Platform",
    date: "August 2026",
    description:
      "A full-stack AI engineering platform integrating Gemini-powered chat, RAG, AI agents, tool calling, workflows, and LLM evaluation.",
    problem:
      "Production AI applications need chat, retrieval, agents, and evaluation working together reliably — not as disconnected experiments.",
    solution:
      "Built a full-stack platform on FastAPI and React/TypeScript that unifies a Gemini-powered chat interface with a RAG pipeline, tool-calling agents, and an evaluation layer, backed by PostgreSQL and Redis.",
    architecture: [
      "Document ingestion → Gemini embeddings → vector retrieval",
      "Reranking of retrieved context for higher relevance",
      "Grounded chat responses with citations",
      "AI agents with tool calling for multi-step workflows",
      "Tavily-powered web research tool integration",
      "LLM evaluation layer to assess response quality",
    ],
    features: [
      "Gemini-powered chat",
      "RAG pipeline with document ingestion",
      "Gemini embeddings & vector retrieval",
      "Reranking",
      "Grounded responses with citations",
      "AI agents & tool calling",
      "Workflows",
      "LLM evaluation",
      "Tavily web research",
    ],
    tech: ["Python", "FastAPI", "React", "TypeScript", "Gemini", "LLMs", "RAG", "Embeddings", "Vector Search", "Reranking", "AI Agents", "Tool Calling", "LLM Evaluation", "PostgreSQL", "Redis", "Tavily"],
    metrics: ["Vercel frontend deployment", "Render backend deployment", "Supabase PostgreSQL", "Upstash Redis"],
    github: "https://github.com/amruthssss/Orbit_AI",
    demo: null,
    featured: true,
  },
  {
    title: "LaunchPad AI",
    date: "February 2026",
    description:
      "An autonomous multi-agent platform transforming a startup idea into market research, architecture, production-ready code, and ML-driven revenue forecasts.",
    problem:
      "Turning a raw startup idea into research, architecture, code, and financial projections normally takes many specialists and a lot of manual work.",
    solution:
      "Designed a multi-agent system on LangGraph and LangChain where specialized agents handle market research, architecture design, and code generation, with a self-correcting Critic Agent that scores outputs and routes retries, plus an ML forecasting layer for zero-historical-data revenue projections.",
    architecture: [
      "Startup idea → Market Research Agent",
      "Software Architecture Agent generates system design",
      "Code Generation Agent produces production-ready code",
      "Critic Agent scores output from 0.0–1.0 and triggers LangGraph retry routing",
      "RAG pipeline over ChromaDB with OpenAI embeddings for grounded context",
      "Forecasting Agent projects revenue using Prophet, XGBoost, and LSTM",
      "FastAPI backend streams progress to a React frontend over WebSockets",
    ],
    features: [
      "Multi-agent architecture",
      "Market research automation",
      "Software architecture generation",
      "Production-ready code generation",
      "ML-driven revenue forecasting",
      "Self-correcting Critic Agent",
      "LLM scoring from 0.0–1.0",
      "LangGraph retry routing",
      "RAG pipeline with ChromaDB",
      "OpenAI embeddings",
      "Zero-historical-data projections",
      "WebSocket streaming",
      "PostgreSQL persistence",
    ],
    tech: ["Python", "LangGraph", "LangChain", "FastAPI", "React", "PostgreSQL", "ChromaDB", "XGBoost", "LSTM", "RAG", "OpenAI GPT-4"],
    metrics: ["LLM critic scoring scale: 0.0 – 1.0", "Forecasting via Prophet, XGBoost & LSTM"],
    github: "https://github.com/amruthssss/LaunchPad-AI",
    demo: null,
    featured: true,
  },
  {
    title: "Multimodal Surveillance System for Intelligent Security Monitoring",
    date: "June 2025",
    description:
      "A real-time AI surveillance platform detecting fire, intrusion, explosion, accidents, and smoke from live feeds using parallel deep learning.",
    problem:
      "Single-model surveillance systems struggle to reliably flag diverse threats — fire, intrusion, explosions, accidents, smoke — from live video without excessive false alarms.",
    solution:
      "Combined YOLOv11 threat detection with 3D-CNN + LSTM action recognition and CNN-based emotion recognition, fused through an Adaptive Fusion Engine with temporal validation across frames to confirm threats before alerting.",
    architecture: [
      "Live camera feed → YOLOv11 object/threat detection",
      "3D-CNN + LSTM analyzes temporal action sequences",
      "CNN emotion recognition adds behavioral context",
      "Adaptive Fusion Engine combines model outputs",
      "Temporal validation requires 65% confidence across 5 frames before alerting",
      "Alerts trigger audio alarm plus SMS/email via Twilio",
      "Events logged to MongoDB, visualized on a Flask + React live dashboard",
    ],
    features: [
      "YOLOv11 threat detection",
      "3D-CNN + LSTM action recognition",
      "CNN emotion recognition",
      "Adaptive Fusion Engine",
      "Temporal validation across frames",
      "Audio alarm",
      "SMS/email notifications via Twilio",
      "MongoDB event logging",
      "Flask + React live dashboard",
    ],
    tech: ["Python", "YOLOv11", "3D-CNN", "LSTM", "PyTorch", "Flask", "React", "OpenCV", "PostgreSQL"],
    metrics: ["65% confidence threshold across 5 consecutive frames"],
    github: "https://github.com/amruthssss/multimodal-Surveillance",
    demo: null,
    featured: true,
  },
  {
    title: "EV Charging Analytics Platform",
    date: "March 2025",
    description:
      "An interactive ML platform tracking EV infrastructure usage, forecasting grid demand, and clustering patterns across 457 charging stations.",
    problem:
      "EV charging infrastructure generates usage data that's hard to interpret without tooling to forecast demand or identify behavioral patterns across stations.",
    solution:
      "Built a multi-page Streamlit application that forecasts grid demand with Facebook Prophet and clusters station behavior using K-Means and PCA, surfacing the results through interactive Plotly dashboards.",
    architecture: [
      "Raw usage data across 457 charging stations",
      "Facebook Prophet models for grid demand forecasting",
      "K-Means clustering + PCA for station behavior analysis",
      "4 station behavioral personas identified from clusters",
      "Results rendered through interactive Plotly dashboards in a multi-page Streamlit app",
    ],
    features: [
      "Grid demand forecasting",
      "Station behavior analysis",
      "K-Means clustering",
      "PCA dimensionality reduction",
      "4 station behavioral personas",
      "Interactive Plotly dashboards",
      "Multi-page Streamlit application",
    ],
    tech: ["Python", "Streamlit", "Facebook Prophet", "Scikit-learn", "K-Means", "PCA", "Plotly"],
    metrics: ["457 charging stations analyzed", "4 behavioral personas identified"],
    github: "https://github.com/amruthssss/ev_charging_analysis",
    demo: null,
    featured: false,
  },
  {
    title: "Retail Inventory and Sales Analytics Platform",
    date: "October 2024",
    description:
      "A full-stack retail dashboard providing real-time inventory visibility, AI-driven demand forecasting, and automated restock alerts.",
    problem:
      "Retail teams need real-time visibility into inventory and sales trends, plus early warning before stockouts or expiry, without manually cross-checking spreadsheets.",
    solution:
      "Built a login-protected Streamlit platform with an optimized MySQL query layer powering 8+ dashboards for inventory tracking, expiry monitoring, and sales funnels, with Facebook Prophet demand forecasts triggering automated SMTP restock alerts and PDF reports.",
    architecture: [
      "MySQL database with an optimized query layer",
      "Facebook Prophet forecasts demand from historical sales",
      "Automated restock alerts triggered via SMTP",
      "PDF report generation for stakeholders",
      "Login-based authentication with admin management",
      "8+ interactive Streamlit dashboards for inventory, expiry, and sales funnels",
    ],
    features: [
      "8+ interactive Streamlit dashboards",
      "Inventory tracking",
      "Expiry monitoring",
      "Sales funnels",
      "Demand forecasting",
      "Automated restock alerts",
      "Optimized MySQL query layer",
      "SMTP alerts",
      "PDF report generation",
      "Login-based authentication",
      "Admin management",
    ],
    tech: ["Python", "Streamlit", "MySQL", "Pandas", "Facebook Prophet", "SMTP"],
    metrics: ["8+ interactive dashboards"],
    github: "https://github.com/amruthssss/retail-project",
    demo: null,
    featured: false,
  },
  {
    title: "Spoken Keyword Spotting System",
    date: "September 2024",
    description:
      "A lightweight keyword spotting system built with a hybrid CNN-SVM pipeline using Librosa MFCC and mel-spectrogram features, trained on Google Speech Commands.",
    problem:
      "Edge devices need to recognize spoken keywords with low latency and a small footprint, ruling out large, heavyweight audio models.",
    solution:
      "Extracted MFCC and mel-spectrogram features with Librosa and trained a hybrid CNN-SVM pipeline on the Google Speech Commands dataset, then applied INT8 quantization to shrink the model for edge deployment.",
    architecture: [
      "Raw audio → Librosa MFCC + mel-spectrogram feature extraction",
      "CNN feature learning feeding an SVM classifier",
      "Trained and evaluated on Google Speech Commands (10 keyword classes)",
      "INT8 quantization applied for edge-device deployment",
    ],
    features: [
      "Hybrid CNN-SVM pipeline",
      "Librosa MFCC & mel-spectrogram features",
      "Trained on Google Speech Commands",
      "INT8 quantization",
      "Edge-device oriented",
    ],
    tech: ["Python", "TensorFlow", "Scikit-learn", "Librosa", "NumPy", "CNN", "SVM", "INT8 Quantization"],
    metrics: ["INT8 quantization reduced model size by 75%", "Latency reduced by 40%", "0.98 F1-score", "10 keyword classes"],
    github: "https://github.com/amruthssss/keySpotting/tree/master/Spoken-Keyword-Spotting",
    demo: null,
    featured: false,
  },
];

const experience = {
  company: "MindMatrix.io",
  companyUrl: "https://makes.mindmatrix.io/",
  role: "Android Developer Intern",
  location: "Bengaluru, India",
  period: "Feb 2026 – May 2026",
  bullets: [
    "Developed Akshara-Deepa, a full stack Android SSLC learning app using Capacitor.js, Firebase, and Google Sign-In.",
    "Integrated Gemini 1.5 Flash for adaptive quizzes, answer evaluation, personalized study planner, and AI tutor.",
    "Built Strength Map radar charts visualizing subject mastery, accuracy, and streaks synced via Firestore.",
    "Owned the full development lifecycle — UI/UX design using Material Design, Android Studio setup, APK testing and debugging, and production deployment via Gradle.",
    "Achieved a 100% crash-free launch on the Google Play internal test track.",
  ],
  tags: ["Capacitor.js", "Firebase", "Gemini 1.5 Flash", "Android Studio", "Material Design"],
};

const coursework = ["DBMS", "Operating Systems", "OOPS", "Machine Learning", "Artificial Intelligence", "Data Analytics"];

/* ── Neon color map ── */
const neon = {
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-400",
    border: "border-cyan-500/40",
    hoverBorder: "hover:border-cyan-400",
    glow: "shadow-cyan-500/20",
    badge: "bg-cyan-500/10 text-cyan-400",
  },
  pink: {
    text: "text-pink-400",
    bg: "bg-pink-400",
    border: "border-pink-500/40",
    hoverBorder: "hover:border-pink-400",
    glow: "shadow-pink-500/20",
    badge: "bg-pink-500/10 text-pink-400",
  },
  green: {
    text: "text-green-400",
    bg: "bg-green-400",
    border: "border-green-500/40",
    hoverBorder: "hover:border-green-400",
    glow: "shadow-green-500/20",
    badge: "bg-green-500/10 text-green-400",
  },
  yellow: {
    text: "text-yellow-400",
    bg: "bg-yellow-400",
    border: "border-yellow-500/40",
    hoverBorder: "hover:border-yellow-400",
    glow: "shadow-yellow-500/20",
    badge: "bg-yellow-500/10 text-yellow-400",
  },
};

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28, scale: 0.985, filter: "blur(8px)" },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.62, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 42, scale: 0.985, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Typewriter ── */
function useTypewriter(words, speed = 90, pause = 2000) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const w = words[wi];
    const t = setTimeout(
      () => {
        if (!del) {
          setText(w.slice(0, ci + 1));
          if (ci + 1 === w.length) setTimeout(() => setDel(true), pause);
          else setCi(ci + 1);
        } else {
          setText(w.slice(0, ci));
          if (ci === 0) {
            setDel(false);
            setWi((wi + 1) % words.length);
          } else setCi(ci - 1);
        }
      },
      del ? speed / 2 : speed
    );
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);

  return text;
}

function PipelineNode({ label, darkMode, highlight = false }) {
  return (
    <div
      className={`relative rounded-xl border px-3 py-2 text-center text-[11px] sm:text-xs font-mono tracking-wide transition-colors ${
        highlight
          ? darkMode
            ? "bg-pink-500/10 text-pink-300 border-pink-400/35 shadow-[0_0_20px_rgba(236,72,153,0.18)]"
            : "bg-violet-50 text-violet-700 border-violet-300"
          : darkMode
            ? "bg-white/[0.03] text-white/70 border-white/10"
            : "bg-slate-50 text-slate-700 border-slate-200"
      }`}
    >
      {label}
    </div>
  );
}

function FlowConnector({ darkMode, reducedMotion }) {
  return (
    <div className="relative h-6 sm:h-7 flex items-center justify-center" aria-hidden="true">
      <span className={`h-full w-px ${darkMode ? "bg-cyan-400/30" : "bg-indigo-300"}`} />
      {!reducedMotion && (
        <motion.span
          className={`absolute w-2 h-2 rounded-full ${darkMode ? "bg-cyan-300" : "bg-indigo-500"}`}
          animate={{ y: ["-45%", "45%"], opacity: [0.25, 1, 0.25] }}
          transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

function ProjectArchitectureFlow({ projectTitle, darkMode, reducedMotion }) {
  if (projectTitle === "Orbit AI Engineering Platform") {
    return (
      <div className={`mt-5 rounded-2xl border p-3 sm:p-5 ${darkMode ? "bg-black/30 border-cyan-500/20" : "bg-white border-indigo-200"}`}>
        <div className="max-w-xl mx-auto">
          <PipelineNode label="USER" darkMode={darkMode} />
          <FlowConnector darkMode={darkMode} reducedMotion={reducedMotion} />
          <PipelineNode label="REACT / TS" darkMode={darkMode} />
          <FlowConnector darkMode={darkMode} reducedMotion={reducedMotion} />
          <PipelineNode label="FASTAPI" darkMode={darkMode} />
          <FlowConnector darkMode={darkMode} reducedMotion={reducedMotion} />
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <PipelineNode label="RAG" darkMode={darkMode} />
            <PipelineNode label="AGENTS" darkMode={darkMode} />
            <PipelineNode label="WORKFLOWS" darkMode={darkMode} />
          </div>
          <FlowConnector darkMode={darkMode} reducedMotion={reducedMotion} />
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <PipelineNode label="EMBEDDINGS" darkMode={darkMode} />
            <PipelineNode label="TOOLS" darkMode={darkMode} />
            <PipelineNode label="EXECUTION" darkMode={darkMode} />
          </div>
          <FlowConnector darkMode={darkMode} reducedMotion={reducedMotion} />
          <PipelineNode label="VECTOR SEARCH" darkMode={darkMode} />
          <FlowConnector darkMode={darkMode} reducedMotion={reducedMotion} />
          <PipelineNode label="RERANKING" darkMode={darkMode} />
          <FlowConnector darkMode={darkMode} reducedMotion={reducedMotion} />
          <PipelineNode label="GROUNDED LLM RESPONSE" darkMode={darkMode} />
          <FlowConnector darkMode={darkMode} reducedMotion={reducedMotion} />
          <PipelineNode label="CITATIONS" darkMode={darkMode} />
        </div>
      </div>
    );
  }

  if (projectTitle === "LaunchPad AI") {
    const stages = [
      "STARTUP IDEA",
      "MARKET RESEARCH",
      "ARCHITECTURE",
      "CODE GENERATION",
      "CRITIC AGENT",
      "RETRY ROUTING",
      "RAG GROUNDING",
      "FORECASTING",
      "FINAL OUTPUT",
    ];
    return (
      <div className={`mt-5 rounded-2xl border p-3 sm:p-5 ${darkMode ? "bg-black/30 border-cyan-500/20" : "bg-white border-indigo-200"}`}>
        <div className="max-w-xl mx-auto">
          {stages.map((stage, index) => (
            <div key={stage}>
              <PipelineNode label={stage} darkMode={darkMode} highlight={stage === "CRITIC AGENT"} />
              {index < stages.length - 1 && <FlowConnector darkMode={darkMode} reducedMotion={reducedMotion} />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

/* ── Project detail modal ── */
function ProjectModal({ project, onClose, darkMode, reducedMotion }) {
  const ref = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyTouchAction = document.body.style.touchAction;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.touchAction = originalBodyTouchAction;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.26 }}
        className={`absolute inset-0 ${darkMode ? "bg-black/82" : "bg-slate-900/45"} backdrop-blur-sm`}
      />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: reducedMotion ? 0 : 15, scale: reducedMotion ? 1 : 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: reducedMotion ? 0 : 15, scale: reducedMotion ? 1 : 0.98 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl border flex flex-col ${
          darkMode ? "bg-black border-white/10" : "bg-white border-slate-200"
        }`}
      >
        <div className={`sticky top-0 z-20 flex items-start justify-between gap-3 border-b px-4 sm:px-7 py-4 sm:py-5 ${
          darkMode ? "bg-black/90 border-white/10 backdrop-blur-xl" : "bg-white/95 border-slate-200 backdrop-blur-xl"
        }`}>
          <div className="min-w-0">
            <p className={`text-xs font-mono tracking-widest ${darkMode ? "text-cyan-400/70" : "text-indigo-500"}`}>{project.date}</p>
            <h3 id="project-modal-title" className={`mt-2 text-xl sm:text-2xl font-black leading-tight break-words ${darkMode ? "text-white" : "text-slate-800"}`}>
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close project details"
            className={`group shrink-0 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center border transition-all duration-200 focus-visible:outline-offset-2 ${
              darkMode
                ? "border-white/15 text-white/65 hover:text-cyan-300 hover:border-cyan-400/45 hover:bg-cyan-500/10 focus-visible:outline-cyan-400"
                : "border-slate-300 text-slate-600 hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 focus-visible:outline-indigo-500"
            }`}
          >
            <span className="text-lg leading-none transition-transform duration-200 group-hover:scale-110 group-hover:rotate-90">✕</span>
          </button>
        </div>

        <div className="modal-scroll-area flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-7 pb-6 sm:pb-8 pt-4 sm:pt-6">
          <p className={`leading-relaxed break-words ${darkMode ? "text-white/50" : "text-slate-600"}`}>{project.description}</p>

          <div className="mt-8 grid sm:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h4 className={`section-label mb-2 ${darkMode ? "text-pink-400" : "text-violet-500"}`}>// problem</h4>
              <p className={`text-sm leading-relaxed break-words ${darkMode ? "text-white/40" : "text-slate-500"}`}>{project.problem}</p>
            </div>
            <div>
              <h4 className={`section-label mb-2 ${darkMode ? "text-green-400" : "text-emerald-500"}`}>// solution</h4>
              <p className={`text-sm leading-relaxed break-words ${darkMode ? "text-white/40" : "text-slate-500"}`}>{project.solution}</p>
            </div>
          </div>

          <div className="mt-8">
            <h4 className={`section-label mb-3 ${darkMode ? "text-cyan-400" : "text-indigo-500"}`}>// architecture &amp; workflow</h4>
            <ProjectArchitectureFlow projectTitle={project.title} darkMode={darkMode} reducedMotion={reducedMotion} />
            <ol className="mt-5 space-y-2">
              {project.architecture.map((step, i) => (
                <li key={i} className={`flex gap-3 text-sm leading-relaxed break-words ${darkMode ? "text-white/50" : "text-slate-600"}`}>
                  <span className={`font-mono shrink-0 ${darkMode ? "text-cyan-400/60" : "text-indigo-400"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8">
            <h4 className={`section-label mb-3 ${darkMode ? "text-yellow-400" : "text-amber-500"}`}>// key features</h4>
            <div className="flex flex-wrap gap-2">
              {project.features.map((f) => (
                <span
                  key={f}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                    darkMode ? "bg-white/[0.03] text-white/60 border-white/10 hover:border-cyan-500/30" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-300"
                  }`}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h4 className={`section-label mb-3 ${darkMode ? "text-cyan-400" : "text-indigo-500"}`}>// technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className={`text-xs font-mono px-2.5 py-1 rounded border transition-colors ${
                    darkMode ? "bg-cyan-500/5 text-cyan-400/70 border-cyan-500/10 hover:border-cyan-400/40" : "bg-indigo-50 text-indigo-600/80 border-indigo-200 hover:border-indigo-400"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-8">
              <h4 className={`section-label mb-3 ${darkMode ? "text-green-400" : "text-emerald-500"}`}>// results &amp; notes</h4>
              <ul className="grid sm:grid-cols-2 gap-2">
                {project.metrics.map((m) => (
                  <li
                    key={m}
                    className={`text-sm rounded-lg px-4 py-2.5 border ${
                      darkMode ? "bg-green-500/5 text-green-300/80 border-green-500/10" : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="neon-btn-sm !py-2.5 !px-5 group"
            >
              View on GitHub <span className="inline-block transition-transform group-hover:translate-x-0.5">↗</span>
            </a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="neon-btn-sm !py-2.5 !px-5 group">
                Live Demo <span className="inline-block transition-transform group-hover:translate-x-0.5">↗</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Component ── */
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const typed = useTypewriter(
    [
      "Building with LLMs, RAG & AI Agents.",
      "Turning ideas into production ML systems.",
      "Open to AI/ML & Software Engineering roles.",
    ],
    80,
    1800
  );

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  /* ── Active section observer ── */
  useEffect(() => {
    const sections = document.querySelectorAll(
      "section[id], [id='about'], [id='experience'], [id='skills'], [id='projects'], [id='certifications'], [id='education'], [id='contact']"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── Scroll-to-top visibility ── */
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ── Custom cursor ── */
  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);

    const addHover = () => setCursorHover(true);
    const removeHover = () => setCursorHover(false);
    const attach = () => {
      document.querySelectorAll("a, button, .hoverable, input, textarea").forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    };
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("mousemove", move);
      mo.disconnect();
      document.querySelectorAll("a, button, .hoverable, input, textarea").forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  const themeClasses = darkMode
    ? "bg-black text-white"
    : "bg-[#faf8f5] text-slate-900 light-mode";

  return (
    <div className={`min-h-screen overflow-x-clip font-sans scroll-smooth transition-colors duration-500 ${themeClasses} ${darkMode ? 'selection:bg-cyan-500/30 selection:text-white' : 'selection:bg-cyan-500/20 selection:text-cyan-900'}`}>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className={`absolute inset-0 ${darkMode ? "bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.09),transparent_45%),radial-gradient(circle_at_82%_18%,rgba(168,85,247,0.08),transparent_40%),radial-gradient(circle_at_50%_78%,rgba(34,197,94,0.05),transparent_45%)]" : "bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.11),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(236,72,153,0.08),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(45,212,191,0.08),transparent_45%)]"}`} />
        <div className={`absolute inset-0 opacity-[0.15] ${darkMode ? "bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]" : "bg-[linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px)]"} bg-[size:44px_44px]`} />
      </div>
      {/* ── Custom cursor (desktop only) ── */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="hidden lg:block fixed top-0 left-0 z-[100] pointer-events-none"
            animate={{ x: cursorPos.x - 4, y: cursorPos.y - 4 }}
            transition={{ type: "spring", stiffness: 1200, damping: 40, mass: 0.1 }}
          >
            <div className={`w-2 h-2 rounded-full transition-all duration-150 ${cursorHover ? 'bg-cyan-400 scale-0' : 'bg-cyan-400 scale-100'}`} />
          </motion.div>
          <motion.div
            className="hidden lg:block fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference"
            animate={{ x: cursorPos.x - (cursorHover ? 24 : 16), y: cursorPos.y - (cursorHover ? 24 : 16) }}
            transition={{ type: "spring", stiffness: 250, damping: 22, mass: 0.5 }}
          >
            <div className={`rounded-full border-2 transition-all duration-300 ${cursorHover ? 'w-12 h-12 border-white bg-white/20' : 'w-8 h-8 border-white/50 bg-transparent'}`} />
          </motion.div>
        </>
      )}

      {/* ── Scroll progress ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* ── Floating resume button ── */}
      <motion.a
        href="/Amruth_S_Sharma_Resume.pdf"
        download
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow group"
        aria-label="Download Resume"
      >
        <svg className="w-6 h-6 text-black group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M6 20h12" />
        </svg>
      </motion.a>

      {/* ── Scroll-to-top button ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={scrollToTop}
            className={`fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all group ${
              darkMode ? 'bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm' : 'bg-white hover:bg-slate-50 border border-slate-200 shadow-lg hover:shadow-indigo-100/50'
            }`}
            aria-label="Scroll to top"
          >
            <svg className={`w-5 h-5 group-hover:-translate-y-0.5 transition-transform ${darkMode ? 'text-white/60' : 'text-slate-500'}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Project detail modal ── */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} darkMode={darkMode} reducedMotion={prefersReducedMotion} />
        )}
      </AnimatePresence>

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-2xl border-b transition-colors duration-500 ${darkMode ? 'bg-black/60 border-white/5' : 'bg-[#faf8f5]/90 border-slate-200/60'}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <a href="#" className="text-xl sm:text-2xl font-black neon-text-cyan">
            A.
          </a>

          <ul className="hidden md:flex items-center space-x-5 lg:space-x-7 text-sm">
            {navLinks.map((l) => {
              const isActive = activeSection === l.href.replace('#', '');
              return (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className={`futuristic-link relative py-1 transition-colors duration-300 font-medium whitespace-nowrap ${
                      isActive
                        ? darkMode ? 'text-cyan-400' : 'text-indigo-600'
                        : darkMode ? 'text-white/50 hover:text-white/80' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="navIndicator"
                        className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${darkMode ? 'bg-cyan-400' : 'bg-indigo-500'}`}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
            <li>
              <a href="/Amruth_S_Sharma_Resume.pdf" download className="ml-1 neon-btn-sm">
                Resume ↓
              </a>
            </li>
            <li>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 border hover:scale-110 ${darkMode ? 'bg-white/5 border-white/10 hover:border-cyan-500/30 hover:bg-white/10 text-white/40' : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md text-slate-500'}`}
                aria-label="Toggle theme"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </li>
          </ul>

          <button
            className={`md:hidden text-2xl ${darkMode ? 'text-white/50' : 'text-slate-500'}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={`md:hidden border-t px-4 sm:px-6 pb-4 space-y-1 overflow-hidden ${darkMode ? 'bg-black/95 border-white/5 backdrop-blur-xl' : 'bg-[#faf8f5]/98 border-slate-200 backdrop-blur-xl'}`}
            >
              {navLinks.map((l) => {
                const isActive = activeSection === l.href.replace('#', '');
                return (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className={`block py-3.5 transition-colors border-b text-base ${
                        isActive
                          ? darkMode ? 'text-cyan-400 font-semibold' : 'text-indigo-600 font-semibold'
                          : darkMode ? 'text-white/60' : 'text-slate-600'
                      } ${darkMode ? 'border-white/5' : 'border-slate-100'}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {isActive && <span className="mr-2">›</span>}{l.label}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href="/Amruth_S_Sharma_Resume.pdf"
                  download
                  className={`block py-3.5 transition-colors border-b text-base font-medium ${darkMode ? 'text-cyan-400/80 border-white/5' : 'text-indigo-600 border-slate-100'}`}
                  onClick={() => setMenuOpen(false)}
                >
                  📄 Download Resume
                </a>
              </li>
              <li>
                <button
                  onClick={() => { setDarkMode(!darkMode); setMenuOpen(false); }}
                  className={`w-full py-3.5 text-left transition-colors text-base ${darkMode ? 'text-white/60' : 'text-slate-600'}`}
                >
                  {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
        <motion.div
          className={`absolute -top-24 left-1/2 -translate-x-1/2 w-[540px] sm:w-[780px] h-[540px] sm:h-[780px] rounded-full blur-[120px] sm:blur-[160px] ${darkMode ? 'bg-cyan-500/12' : 'bg-indigo-300/20'}`}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.65, 0.85, 0.65] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className={`absolute bottom-1/3 -right-20 sm:-right-40 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full blur-[100px] sm:blur-[150px] ${darkMode ? 'bg-pink-500/8' : 'bg-rose-300/15'}`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] rounded-full blur-[80px] sm:blur-[120px] ${darkMode ? 'bg-yellow-500/5' : 'bg-amber-200/15'}`} />
        <div className={`absolute inset-0 opacity-45 ${darkMode ? 'bg-[radial-gradient(rgba(255,255,255,0.045)_1px,transparent_1px)]' : 'bg-[radial-gradient(rgba(0,0,0,0.055)_1px,transparent_1px)]'} bg-[size:28px_28px] sm:bg-[size:36px_36px]`} />
        <div className={`absolute inset-0 ${darkMode ? "bg-[linear-gradient(to_right,rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.05)_1px,transparent_1px)]" : "bg-[linear-gradient(to_right,rgba(79,70,229,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(79,70,229,0.07)_1px,transparent_1px)]"} bg-[size:70px_70px] opacity-20`} />
        {!prefersReducedMotion && (
          <>
            <motion.div
              className={`absolute left-0 right-0 h-28 sm:h-36 ${darkMode ? "bg-gradient-to-b from-cyan-400/8 to-transparent" : "bg-gradient-to-b from-indigo-400/10 to-transparent"}`}
              animate={{ y: ["-25%", "105%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 hidden sm:block pointer-events-none">
              {[
                { top: "22%", left: "20%", width: "23%", rotate: "10deg" },
                { top: "38%", left: "41%", width: "20%", rotate: "-18deg" },
                { top: "52%", left: "24%", width: "29%", rotate: "7deg" },
                { top: "44%", left: "54%", width: "25%", rotate: "18deg" },
              ].map((line, idx) => (
                <motion.span
                  key={`line-${idx}`}
                  className={`absolute h-px origin-left ${darkMode ? "bg-cyan-300/25" : "bg-indigo-400/25"}`}
                  style={line}
                  animate={{ opacity: [0.2, 0.55, 0.2] }}
                  transition={{ duration: 3.8 + idx * 0.45, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
              {[
                { top: "18%", left: "20%" }, { top: "24%", left: "43%" }, { top: "34%", left: "70%" },
                { top: "55%", left: "26%" }, { top: "62%", left: "55%" }, { top: "44%", left: "82%" },
              ].map((node, idx) => (
                <motion.span
                  key={idx}
                  className={`absolute w-1.5 h-1.5 rounded-full ${darkMode ? "bg-cyan-300/80" : "bg-indigo-500/70"} shadow-[0_0_12px_rgba(56,189,248,0.45)]`}
                  style={node}
                  animate={{ scale: [1, 1.7, 1], opacity: [0.35, 0.95, 0.35] }}
                  transition={{ duration: 3 + idx * 0.35, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className={`inline-block mb-6 px-4 py-1.5 rounded-full border text-xs font-mono tracking-wider ${darkMode ? 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400' : 'border-indigo-300 bg-indigo-50 text-indigo-600'}`}
          >
            🚀 OPEN TO AI/ML &amp; SOFTWARE ENGINEERING ROLES
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter">
            <span className={darkMode ? 'text-white' : 'text-slate-800'}>Amruth</span>{" "}
            <span className={darkMode ? 'neon-text-gradient' : 'light-name-gradient'}>S Sharma</span>
          </h1>

          <p className={`mt-5 sm:mt-6 text-lg sm:text-2xl md:text-3xl font-bold tracking-tight ${darkMode ? 'text-white/80' : 'text-slate-700'}`}>
            AI/ML Engineer <span className={darkMode ? 'text-white/20' : 'text-slate-300'}>|</span>{" "}
            Generative AI <span className={darkMode ? 'text-white/20' : 'text-slate-300'}>|</span>{" "}
            LLMs <span className={darkMode ? 'text-white/20' : 'text-slate-300'}>|</span>{" "}
            RAG <span className={darkMode ? 'text-white/20' : 'text-slate-300'}>|</span>{" "}
            AI Agents
          </p>

          <p className={`mt-5 sm:mt-6 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg ${darkMode ? 'text-white/40' : 'text-slate-500'}`}>
            Computer Science Engineer focused on building production-oriented AI/ML and
            Generative AI systems, with hands-on experience in LLMs, RAG, AI agents,
            machine learning, deep learning, and full-stack AI applications.
          </p>

          <div className={`mt-5 sm:mt-6 h-7 sm:h-8 text-sm sm:text-base md:text-lg font-mono ${darkMode ? 'text-white/30' : 'text-slate-400'}`}>
            <span className={darkMode ? 'text-cyan-400/70' : 'text-indigo-400'}>&gt; </span>
            <span>{typed}</span>
            <span className={`animate-pulse ${darkMode ? 'text-pink-400' : 'text-violet-500'}`}>█</span>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <a href="#projects" className="neon-btn group text-center justify-center">
              View Projects
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="https://github.com/amruthssss"
              target="_blank"
              rel="noreferrer"
              className={`border px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg font-bold transition-all duration-300 hover:shadow-lg text-center ${darkMode ? 'border-white/10 text-white/60 hover:border-cyan-500/40 hover:text-cyan-400 hover:shadow-cyan-500/10' : 'border-slate-300 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 hover:shadow-indigo-200/50'}`}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/amruthssharma"
              target="_blank"
              rel="noreferrer"
              className={`border px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg font-bold transition-all duration-300 hover:shadow-lg text-center ${darkMode ? 'border-white/10 text-white/60 hover:border-pink-500/40 hover:text-pink-400 hover:shadow-pink-500/10' : 'border-slate-300 text-slate-600 hover:border-violet-400 hover:text-violet-600 hover:shadow-violet-200/50'}`}
            >
              LinkedIn
            </a>
            <a
              href="#contact"
              className={`border px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg font-bold transition-all duration-300 hover:shadow-lg text-center ${darkMode ? 'border-white/10 text-white/60 hover:border-yellow-500/40 hover:text-yellow-400 hover:shadow-yellow-500/10' : 'border-slate-300 text-slate-600 hover:border-amber-400 hover:text-amber-600 hover:shadow-amber-200/50'}`}
            >
              Contact
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className={`w-5 h-9 rounded-full border flex justify-center pt-2 ${darkMode ? 'border-white/10' : 'border-slate-300'}`}
          >
            <div className={`w-1 h-2 rounded-full ${darkMode ? 'bg-cyan-400' : 'bg-indigo-400'}`} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── About ── */}
      <motion.section
        id="about"
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionReveal}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
            <span className={`section-label ${darkMode ? 'text-cyan-400' : 'text-indigo-500'}`}>// about</span>
            <h2 className="section-heading">
              A bit about <span className={darkMode ? 'neon-text-cyan' : 'text-indigo-600'}>me</span>
            </h2>

            <div className="grid md:grid-cols-5 gap-6 sm:gap-8 mt-8 sm:mt-10">
              <div className="md:col-span-3 space-y-4 sm:space-y-5">
                <p className={`leading-relaxed text-base sm:text-lg ${darkMode ? 'text-white/40' : 'text-slate-600'}`}>
                  I&apos;m a{" "}
                  <span className={`font-semibold ${darkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
                    Computer Science Engineering
                  </span>{" "}
                  graduate with a focus on{" "}
                  <span className={`font-semibold ${darkMode ? 'text-pink-400' : 'text-violet-600'}`}>
                    Generative AI, LLMs, RAG, and AI agents
                  </span>
                  . I like building systems end-to-end — from a retrieval pipeline
                  and a multi-agent workflow down to the FastAPI backend and React
                  frontend that ship it.
                </p>
                <p className={`leading-relaxed text-base sm:text-lg ${darkMode ? 'text-white/30' : 'text-slate-500'}`}>
                  My project work spans multi-agent platforms, real-time computer
                  vision systems, and ML-driven analytics dashboards, built with
                  Python, PyTorch, TensorFlow, LangChain/LangGraph, and PostgreSQL.
                  I also spent time as an Android Developer Intern, shipping a
                  full-stack learning app with a Gemini-powered AI tutor.
                </p>
                <p className={`leading-relaxed text-base sm:text-lg ${darkMode ? 'text-white/30' : 'text-slate-500'}`}>
                  I&apos;m currently looking for AI/ML and Generative AI engineering
                  roles where I can keep building production-oriented systems and
                  grow alongside a strong team.
                </p>
              </div>
              <div className="md:col-span-2 space-y-3 sm:space-y-5">
                {[
                  { label: "Focus", value: "AI/ML · Generative AI · LLMs · RAG", icon: "🧠" },
                  { label: "Location", value: "Bengaluru, India", icon: "📍" },
                  { label: "University", value: "Sai Vidya Institute of Technology", icon: "🎓" },
                  { label: "Degree", value: "B.E. in CSE (2022–2026)", icon: "📜" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-4 rounded-xl p-4 sm:p-5 transition-all duration-300 border ${darkMode ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-cyan-500/20' : 'bg-white border-slate-200 hover:shadow-md hover:shadow-indigo-100/50 hover:border-indigo-200'}`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className={`text-[11px] uppercase tracking-widest font-mono ${darkMode ? 'text-white/20' : 'text-slate-400'}`}>
                        {item.label}
                      </p>
                      <p className={`font-medium ${darkMode ? 'text-white/70' : 'text-slate-700'}`}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Experience ── */}
      <motion.section
        id="experience"
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-transparent ${darkMode ? 'via-green-500/[0.02]' : 'via-emerald-500/[0.03]'}`} />
        <div className="max-w-5xl mx-auto relative z-10">
          <span className={`section-label ${darkMode ? 'text-green-400' : 'text-emerald-500'}`}>// experience</span>
          <h2 className="section-heading">
            Where I&apos;ve <span className={darkMode ? 'neon-text-green' : 'text-emerald-600'}>worked</span>
          </h2>

          <div className="relative mt-10">
            <div className={`absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b ${darkMode ? 'from-green-400 to-green-400/10 shadow-[0_0_8px_rgba(74,222,128,0.3)]' : 'from-emerald-400 to-emerald-400/10'}`} />

            <motion.div
              className="relative pl-10 sm:pl-16"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={`absolute left-[10px] sm:left-[18px] top-6 sm:top-8 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-400 shadow-lg shadow-green-400/50 ring-4 ${darkMode ? 'ring-black' : 'ring-zinc-50'}`} />

              <div className={`rounded-xl sm:rounded-2xl p-5 sm:p-8 border transition-all duration-500 hover:shadow-lg ${darkMode ? 'bg-white/[0.02] border-white/5 hover:border-green-500/30 hover:shadow-green-500/5' : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-emerald-100/50'}`}>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className={`text-xs font-mono px-3 py-1 rounded-full border ${darkMode ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                    {experience.period}
                  </span>
                  <span className={`text-xs font-mono px-3 py-1 rounded-full border ${darkMode ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-200'}`}>
                    Internship
                  </span>
                  <span className={`text-xs font-mono px-3 py-1 rounded-full border ${darkMode ? 'bg-white/5 text-white/40 border-white/10' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                    {experience.location}
                  </span>
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white/80' : 'text-slate-800'}`}>{experience.role}</h3>
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1.5 mt-1 text-sm font-medium transition-colors ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-emerald-600 hover:text-emerald-500'}`}
                >
                  {experience.company}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>

                <ul className="mt-4 space-y-2.5">
                  {experience.bullets.map((b, i) => (
                    <li key={i} className={`flex gap-2.5 leading-relaxed text-sm sm:text-base ${darkMode ? 'text-white/40' : 'text-slate-500'}`}>
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${darkMode ? 'bg-green-400' : 'bg-emerald-500'}`} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-5">
                  {experience.tags.map((t) => (
                    <span
                      key={t}
                      className={`text-xs font-mono px-2.5 py-1 rounded border ${darkMode ? 'bg-green-500/5 text-green-400/60 border-green-500/10' : 'bg-emerald-50 text-emerald-600/70 border-emerald-200'}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── Skills ── */}
      <motion.section
        id="skills"
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionReveal}
      >
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-transparent ${darkMode ? 'via-cyan-500/[0.02]' : 'via-indigo-500/[0.03]'}`} />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.span variants={fadeUp} className={`section-label ${darkMode ? 'text-pink-400' : 'text-violet-500'}`}>
              // skills
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-heading">
              Technical <span className={darkMode ? 'neon-text-pink' : 'text-violet-600'}>skills</span>
            </motion.h2>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mt-8 sm:mt-10">
              {skillCategories.map((cat, ci) => (
                <motion.div
                  key={cat.title}
                  custom={ci}
                  variants={fadeUp}
                  className={`group rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all duration-500 hover:shadow-lg ${darkMode ? `${neon[cat.color].hoverBorder} ${neon[cat.color].glow} bg-white/[0.02] border-white/5` : 'bg-white border-slate-200 shadow-sm hover:border-indigo-200 hover:shadow-indigo-100/30'}`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{cat.icon}</span>
                    <h3
                      className={`text-xs uppercase tracking-[0.2em] font-mono transition-colors ${darkMode ? `text-white/30 group-hover:${neon[cat.color].text}` : 'text-slate-400 group-hover:text-indigo-600'}`}
                    >
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((skill) => (
                      <span
                        key={skill}
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 cursor-default select-none ${darkMode ? 'bg-white/[0.04] text-white/50 border-white/5 hover:border-white/20 hover:text-white/80 hover:bg-white/[0.08]' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-slate-800 hover:bg-indigo-50/50 hover:shadow-sm'}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Projects ── */}
      <motion.section
        id="projects"
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionReveal}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            <motion.span variants={fadeUp} className={`section-label ${darkMode ? 'text-green-400' : 'text-teal-500'}`}>
              // projects
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-heading">
              Featured <span className={darkMode ? 'neon-text-green' : 'text-teal-600'}>projects</span>
            </motion.h2>
            <motion.p variants={fadeUp} className={`mt-3 max-w-2xl text-sm sm:text-base ${darkMode ? 'text-white/30' : 'text-slate-500'}`}>
              Click any project for the full breakdown — problem, solution, architecture, and results.
            </motion.p>

            <div className="space-y-4 sm:space-y-5 mt-8 sm:mt-10">
              {projects.map((proj, pi) => (
                <motion.div
                  key={proj.title}
                  custom={pi}
                  variants={fadeUp}
                  whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.008 }}
                  onClick={() => setActiveProject(proj)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveProject(proj)}
                  className={`group relative overflow-hidden block cursor-pointer rounded-xl sm:rounded-2xl border p-5 sm:p-8 transition-all duration-500 hover:shadow-lg ${
                    proj.featured
                      ? darkMode ? 'bg-white/[0.03] border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-cyan-500/20' : 'bg-white border-indigo-200 shadow-sm hover:border-indigo-300 hover:shadow-indigo-100/70'
                      : darkMode ? 'bg-white/[0.02] border-white/5 hover:border-cyan-500/35 hover:shadow-cyan-500/15' : 'bg-white border-slate-200 shadow-sm hover:border-indigo-200 hover:shadow-indigo-100/60'
                  }`}
                >
                  <div className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                    darkMode ? 'bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.12),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.12),transparent_40%)]' : 'bg-[radial-gradient(circle_at_15%_20%,rgba(79,70,229,0.12),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.1),transparent_40%)]'
                  }`} />
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                    <span className={`text-4xl sm:text-6xl font-black transition-all duration-500 font-mono shrink-0 leading-none ${darkMode ? 'text-white/[0.04] group-hover:text-cyan-500/20 group-hover:-translate-y-1' : 'text-slate-100 group-hover:text-indigo-100 group-hover:-translate-y-1'}`}>
                      {String(pi + 1).padStart(2, "0")}
                    </span>

                    <div className="relative z-10 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className={`text-lg sm:text-xl font-bold transition-colors ${darkMode ? 'text-white/80 group-hover:text-cyan-400' : 'text-slate-800 group-hover:text-indigo-600'}`}>
                          {proj.title}
                        </h3>
                        {proj.featured && (
                          <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${darkMode ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-200'}`}>
                            Featured
                          </span>
                        )}
                      </div>
                      <p className={`text-xs font-mono mb-3 ${darkMode ? 'text-white/20' : 'text-slate-400'}`}>{proj.date}</p>
                      <p className={`leading-relaxed mb-4 ${darkMode ? 'text-white/30' : 'text-slate-500'}`}>
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {proj.tech.slice(0, 6).map((t) => (
                          <span
                            key={t}
                            className={`text-xs font-mono px-2.5 py-1 rounded border transition-all duration-300 ${darkMode ? 'bg-cyan-500/5 text-cyan-400/60 border-cyan-500/10 group-hover:border-cyan-400/30 group-hover:text-cyan-300/80' : 'bg-teal-50 text-teal-600/70 border-teal-200 group-hover:border-indigo-300 group-hover:text-indigo-600'}`}
                          >
                            {t}
                          </span>
                        ))}
                        {proj.tech.length > 6 && (
                          <span className={`text-xs font-mono px-2.5 py-1 rounded border ${darkMode ? 'bg-white/[0.02] text-white/30 border-white/5' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                            +{proj.tech.length - 6} more
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${darkMode ? 'text-white/50 hover:text-cyan-400' : 'text-slate-600 hover:text-indigo-600'}`}
                        >
                          GitHub ↗
                        </a>
                        <span
                          className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${darkMode ? 'text-cyan-400/60 group-hover:text-cyan-300' : 'text-indigo-500/70 group-hover:text-indigo-600'}`}
                        >
                          View details <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Certifications ── */}
      <motion.section
        id="certifications"
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionReveal}
      >
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-transparent ${darkMode ? 'via-yellow-500/[0.02]' : 'via-amber-500/[0.03]'}`} />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.span variants={fadeUp} className={`section-label ${darkMode ? 'text-yellow-400' : 'text-amber-500'}`}>
              // certifications
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-heading">
              Certifications &amp; <span className={darkMode ? 'neon-text-yellow' : 'text-amber-600'}>courses</span>
            </motion.h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-8 sm:mt-10">
              {certifications.map((cert, ci) => (
                <motion.div
                  key={cert.name}
                  custom={ci}
                  variants={fadeUp}
                  className={`flex items-start gap-4 rounded-xl p-5 border transition-all duration-300 ${darkMode ? 'bg-white/[0.02] border-white/5 hover:border-yellow-500/20 hover:bg-white/[0.04]' : 'bg-white border-slate-200 hover:border-amber-200 hover:shadow-md hover:shadow-amber-100/40'}`}
                >
                  <span className="text-2xl mt-0.5">🏆</span>
                  <div>
                    <p className={`font-semibold leading-snug ${darkMode ? 'text-white/80' : 'text-slate-800'}`}>{cert.name}</p>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-white/30' : 'text-slate-500'}`}>{cert.org}</p>
                    <span className={`inline-block mt-2 text-xs font-mono px-2.5 py-1 rounded-full border ${darkMode ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
                      {cert.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Education ── */}
      <motion.section
        id="education"
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-transparent ${darkMode ? 'via-pink-500/[0.02]' : 'via-amber-500/[0.03]'}`} />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
            <span className={`section-label ${darkMode ? 'text-yellow-400' : 'text-amber-500'}`}>// education</span>
            <h2 className="section-heading">
              Where I <span className={darkMode ? 'neon-text-yellow' : 'text-amber-600'}>studied</span>
            </h2>

            <div className="relative mt-10">
              <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px neon-line" />

              <div className="relative pl-10 sm:pl-16">
                <div className={`absolute left-[10px] sm:left-[18px] top-6 sm:top-8 w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-lg ring-4 ${darkMode ? 'bg-pink-500 shadow-pink-500/50 ring-black' : 'bg-amber-500 shadow-amber-500/30 ring-[#faf8f5]'}`} />

                <div className={`rounded-xl sm:rounded-2xl p-5 sm:p-8 border transition-all duration-500 hover:shadow-lg ${darkMode ? 'bg-white/[0.02] border-white/5 hover:border-pink-500/30 hover:shadow-pink-500/5' : 'bg-white border-slate-200 shadow-sm hover:border-amber-200 hover:shadow-amber-100/40'}`}>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className={`text-xs font-mono px-3 py-1 rounded-full border ${darkMode ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
                      2022 – 2026
                    </span>
                    <span className={`text-xs font-mono px-3 py-1 rounded-full border ${darkMode ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-200'}`}>
                      CGPA: 8.2 / 10.0
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white/80' : 'text-slate-800'}`}>
                    B.E. Computer Science &amp; Engineering
                  </h3>
                  <p className={`mt-2 ${darkMode ? 'text-white/30' : 'text-slate-500'}`}>
                    Sai Vidya Institute of Technology, Bengaluru
                  </p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {coursework.map((c) => (
                      <span
                        key={c}
                        className={`text-xs font-mono px-2.5 py-1 rounded border ${darkMode ? 'bg-pink-500/5 text-pink-400/60 border-pink-500/10' : 'bg-amber-50 text-amber-600/70 border-amber-200'}`}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Contact ── */}
      <motion.section
        id="contact"
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
            <span className={`section-label ${darkMode ? 'text-cyan-400' : 'text-indigo-500'}`}>// contact</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6">
              <span className={darkMode ? 'text-white/90' : 'text-slate-800'}>I&apos;d love to</span>
              <br />
              <span className={darkMode ? 'neon-text-gradient' : 'light-name-gradient'}>hear from you.</span>
            </h2>
            <p className={`mb-8 text-lg max-w-xl mx-auto ${darkMode ? 'text-white/30' : 'text-slate-500'}`}>
              Whether it&apos;s an AI/ML role, a Generative AI project, or just a
              conversation about LLMs and agents — I&apos;m always happy to connect.
              I&apos;m actively looking for opportunities to build and ship.
            </p>

            <a href="mailto:amruths604@gmail.com" className="neon-btn-lg group">
              Get In Touch
              <span className="group-hover:rotate-12 transition-transform text-xl ml-3">✉️</span>
            </a>

            <div className="mt-10 grid sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left">
              <a
                href="mailto:amruths604@gmail.com"
                className={`flex items-center gap-3 rounded-xl p-4 border transition-all duration-300 ${darkMode ? 'bg-white/[0.02] border-white/5 hover:border-cyan-500/20 hover:bg-white/[0.04]' : 'bg-white border-slate-200 hover:border-indigo-200 hover:shadow-md'}`}
              >
                <span className="text-xl">📧</span>
                <span className={`text-sm font-medium truncate ${darkMode ? 'text-white/60' : 'text-slate-600'}`}>amruths604@gmail.com</span>
              </a>
              <a
                href="tel:+918050495260"
                className={`flex items-center gap-3 rounded-xl p-4 border transition-all duration-300 ${darkMode ? 'bg-white/[0.02] border-white/5 hover:border-green-500/20 hover:bg-white/[0.04]' : 'bg-white border-slate-200 hover:border-emerald-200 hover:shadow-md'}`}
              >
                <span className="text-xl">📱</span>
                <span className={`text-sm font-medium ${darkMode ? 'text-white/60' : 'text-slate-600'}`}>+91 80504 95260</span>
              </a>
              <a
                href="https://linkedin.com/in/amruthssharma"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-3 rounded-xl p-4 border transition-all duration-300 ${darkMode ? 'bg-white/[0.02] border-white/5 hover:border-pink-500/20 hover:bg-white/[0.04]' : 'bg-white border-slate-200 hover:border-violet-200 hover:shadow-md'}`}
              >
                <span className="text-xl">💼</span>
                <span className={`text-sm font-medium ${darkMode ? 'text-white/60' : 'text-slate-600'}`}>linkedin.com/in/amruthssharma</span>
              </a>
              <a
                href="https://github.com/amruthssss"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-3 rounded-xl p-4 border transition-all duration-300 ${darkMode ? 'bg-white/[0.02] border-white/5 hover:border-yellow-500/20 hover:bg-white/[0.04]' : 'bg-white border-slate-200 hover:border-amber-200 hover:shadow-md'}`}
              >
                <span className="text-xl">💻</span>
                <span className={`text-sm font-medium ${darkMode ? 'text-white/60' : 'text-slate-600'}`}>github.com/amruthssss</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Footer ── */}
      <footer className={`border-t py-8 sm:py-10 ${darkMode ? 'border-white/5' : 'border-slate-200'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <span className={`text-xl font-black ${darkMode ? 'neon-text-cyan' : 'text-indigo-600'}`}>A.</span>
            <span className={`text-sm font-mono ${darkMode ? 'text-white/20' : 'text-slate-400'}`}>
              © 2026 Amruth S Sharma
            </span>
          </div>
          <div className="flex gap-5">
            {[
              { label: "GitHub", href: "https://github.com/amruthssss" },
              { label: "LinkedIn", href: "https://linkedin.com/in/amruthssharma" },
              { label: "Email", href: "mailto:amruths604@gmail.com" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noreferrer" : undefined}
                className={`futuristic-link text-sm transition-colors font-mono ${darkMode ? 'text-white/20 hover:text-cyan-400' : 'text-slate-400 hover:text-indigo-600'}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
