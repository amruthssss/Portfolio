import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/* ── Data ── */
const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const skillCategories = [
  {
    icon: "⚡",
    title: "Languages & Libraries",
    color: "cyan",
    items: ["Python", "SQL", "Pandas", "NumPy", "Scikit-learn"],
  },
  {
    icon: "🔗",
    title: "Web & APIs",
    color: "pink",
    items: ["FastAPI", "Flask", "Streamlit", "React"],
  },
  {
    icon: "☁️",
    title: "Cloud & DevOps",
    color: "green",
    items: ["AWS", "GCP", "Docker", "Git"],
  },
  {
    icon: "📊",
    title: "Data & Visualization",
    color: "yellow",
    items: ["MySQL", "Power BI", "Matplotlib", "Seaborn"],
  },
];

const projects = [
  {
    title: "Retail Inventory & Sales Analytics",
    description:
      "Built a dashboard to help track inventory and predict demand using Prophet. It's not perfect, but it handles real-time stock alerts and multi-store data — and I learned a ton about time-series along the way.",
    tech: ["Python", "Streamlit", "MySQL", "Prophet"],
    github: "https://github.com/amruthssss/retail-dashboard",
  },
  {
    title: "EV Charging Analytics Platform",
    description:
      "An analytics tool for EV charging stations — user clustering, usage forecasting, and a containerized backend. My first serious attempt at Docker, and it actually worked.",
    tech: ["Python", "FastAPI", "Docker", "Scikit-learn"],
    github: "https://github.com/amruthssss/keySpotting",
  },
  {
    title: "Multimodal Surveillance System",
    description:
      "Combined YOLOv8 for object detection with activity recognition to flag potential threats in real time. A challenging project that pushed me to figure out how to make multiple ML models talk to each other.",
    tech: ["Python", "YOLOv8", "Flask", "React"],
    github: "https://github.com/amruthssss/multimodal-Surveillance-",
  },
  {
    title: "Spoken Keyword Spotting System",
    description:
      "Built a hybrid CNN-SVM model that spots 20+ spoken keywords in real-time audio streams — hit an F1 of 0.98 and cut inference time by 40% with quantization. Also set up the full ML pipeline end-to-end so it's actually reusable and not just a one-off notebook.",
    tech: ["Python", "TensorFlow", "Scikit-learn", "NumPy"],
    github: "https://github.com/amruthssss/keySpotting",
  },
];

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
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
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

/* ── Component ── */
/* ── Section reveal variant ── */
const sectionReveal = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const typed = useTypewriter(
    ["I build things that work.", "I learn fast, ship faster.", "I'm looking for my next role."],
    80,
    1800
  );

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  /* ── Custom cursor ── */
  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    const addHover = () => setCursorHover(true);
    const removeHover = () => setCursorHover(false);
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, .hoverable").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });
    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button, .hoverable").forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  const themeClasses = darkMode
    ? "bg-black text-white"
    : "bg-zinc-50 text-zinc-900";

  return (
    <div className={`min-h-screen font-sans scroll-smooth transition-colors duration-500 ${themeClasses} ${darkMode ? 'selection:bg-cyan-500/30 selection:text-white' : 'selection:bg-cyan-500/20 selection:text-cyan-900'}`}>
      {/* ── Custom cursor (desktop only) ── */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 z-[100] pointer-events-none"
        animate={{
          x: cursorPos.x - (cursorHover ? 20 : 10),
          y: cursorPos.y - (cursorHover ? 20 : 10),
          scale: cursorHover ? 1 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className={`w-10 h-10 rounded-full border transition-all duration-200 ${
          cursorHover
            ? 'border-cyan-400/60 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
            : 'border-white/20 bg-transparent'
        }`} />
      </motion.div>

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
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow group"
        aria-label="Download Resume"
      >
        <svg className="w-6 h-6 text-black group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M6 20h12" />
        </svg>
      </motion.a>

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-2xl border-b transition-colors duration-500 ${darkMode ? 'bg-black/60 border-white/5' : 'bg-white/70 border-zinc-200'}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#" className="text-2xl font-black neon-text-cyan">
            A.
          </a>

          <ul className="hidden md:flex items-center space-x-8 text-sm">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={`hover:text-cyan-400 transition-colors duration-300 ${darkMode ? 'text-white/40' : 'text-zinc-500'}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/Amruth_S_Sharma_Resume.pdf"
                download
                className="ml-2 neon-btn-sm"
              >
                Resume ↓
              </a>
            </li>
            <li>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 border ${darkMode ? 'bg-white/5 border-white/10 hover:border-cyan-500/30 text-white/40' : 'bg-zinc-100 border-zinc-200 hover:border-cyan-500/30 text-zinc-500'}`}
                aria-label="Toggle theme"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </li>
          </ul>

          <button
            className="md:hidden text-2xl text-white/50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={`md:hidden border-t px-6 pb-4 space-y-1 overflow-hidden ${darkMode ? 'bg-black/90 border-white/5' : 'bg-white/95 border-zinc-200'}`}
          >
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={`block py-3 hover:text-cyan-400 transition-colors border-b ${darkMode ? 'text-white/60 border-white/5' : 'text-zinc-500 border-zinc-100'}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-full py-3 text-left hover:text-cyan-400 transition-colors ${darkMode ? 'text-white/60' : 'text-zinc-500'}`}
              >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </li>
          </motion.ul>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        {/* Neon glow orbs */}
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 -right-40 w-[500px] h-[500px] bg-pink-500/8 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[120px]" />

        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-mono tracking-wider"
          >
            🚀 ACTIVELY LOOKING FOR ROLES
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-black leading-[0.9] tracking-tighter">
            <span className="text-white">Amruth</span>
            <br />
            <span className="neon-text-gradient">S Sharma</span>
          </h1>

          {/* Available for badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              { label: "Full-Time", color: "cyan" },
              { label: "Internship", color: "green" },
              { label: "Jobs", color: "pink" },
            ].map((tag) => (
              <span
                key={tag.label}
                className={`text-xs font-mono px-3 py-1.5 rounded-full border ${
                  tag.color === 'cyan' ? 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400'
                  : tag.color === 'green' ? 'border-green-500/20 bg-green-500/5 text-green-400'
                  : 'border-pink-500/20 bg-pink-500/5 text-pink-400'
                }`}
              >
                ● {tag.label}
              </span>
            ))}
          </div>

          <div className="mt-6 h-8 text-lg md:text-xl font-mono text-white/30">
            <span className="text-cyan-400/70">&gt; </span>
            <span>{typed}</span>
            <span className="animate-pulse text-pink-400">█</span>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a href="#projects" className="neon-btn group">
              See What I&apos;ve Built
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
            <a
              href="/Amruth_S_Sharma_Resume.pdf"
              download
              className="border border-white/10 text-white/50 hover:border-pink-500/50 hover:text-pink-400 px-8 py-3.5 rounded-lg font-bold transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10"
            >
              Download Resume
            </a>
          </div>

          <div className="mt-10 flex justify-center gap-4">
            {[
              {
                href: "https://github.com/amruthssss",
                label: "GitHub",
                d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z",
              },
              {
                href: "https://linkedin.com/in/amruth-s-sharma-3412a12a7",
                label: "LinkedIn",
                d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="social-icon-neon"
                aria-label={s.label}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
            <a
              href="mailto:amruthssharma.22cs@saividya.ac.in"
              className="social-icon-neon"
              aria-label="Email"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-9 rounded-full border border-white/10 flex justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-cyan-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── About ── */}
      <motion.section
        id="about"
        className="py-32 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionReveal}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="section-label text-cyan-400">// about</span>
            <h2 className="section-heading">
              A bit about <span className="neon-text-cyan">me</span>
            </h2>

            <div className="grid md:grid-cols-5 gap-8 mt-10">
              <div className="md:col-span-3 space-y-5">
                <p className="text-white/40 leading-relaxed text-lg">
                  I&apos;m a final-year{" "}
                  <span className="text-cyan-400 font-semibold">
                    Computer Science Engineering
                  </span>{" "}
                  student who genuinely enjoys building things — whether
                  it&apos;s a dashboard that makes data easier to understand,
                  an API that just works, or a side project that taught me
                  something new at 2 AM.
                </p>
                <p className="text-white/30 leading-relaxed text-lg">
                  I don&apos;t claim to know everything, but I pick things up
                  quickly and I&apos;m not afraid to dive into unfamiliar
                  territory. I&apos;ve worked with Python, cloud platforms,
                  and a handful of frameworks — enough to know what I&apos;m
                  doing, and enough to know there&apos;s always more to learn.
                </p>
                <p className="text-white/30 leading-relaxed text-lg">
                  Right now, I&apos;m looking for a role where I can contribute
                  meaningfully, grow alongside a good team, and keep getting
                  better at what I do.
                </p>
              </div>
              <div className="md:col-span-2 space-y-5">
                {[
                  { label: "Status", value: "Actively seeking roles", icon: "🟢" },
                  { label: "Location", value: "Bengaluru, India", icon: "📍" },
                  { label: "University", value: "SVIT", icon: "🎓" },
                  { label: "Degree", value: "B.E. in CSE (2022–2026)", icon: "📜" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:border-cyan-500/20 transition-colors"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-white/20 font-mono">
                        {item.label}
                      </p>
                      <p className="text-white/70 font-medium">{item.value}</p>
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
        className="py-32 px-6 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/[0.02] to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <span className="section-label text-green-400">// experience</span>
          <h2 className="section-heading">
            Where I&apos;ve <span className="neon-text-green">worked</span>
          </h2>

          <div className="relative mt-10">
            {/* Neon line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-green-400 to-green-400/10 shadow-[0_0_8px_rgba(74,222,128,0.3)]" />

            <motion.div
              className="relative pl-16"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Dot */}
              <div className="absolute left-[18px] top-8 w-4 h-4 rounded-full bg-green-400 shadow-lg shadow-green-400/50 ring-4 ring-black" />

              <div className={`rounded-2xl p-8 border transition-all duration-500 hover:shadow-lg hover:shadow-green-500/5 ${darkMode ? 'bg-white/[0.02] border-white/5 hover:border-green-500/30' : 'bg-white border-zinc-200 hover:border-green-400/40'}`}>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="text-xs font-mono bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">
                    Current · 2025
                  </span>
                  <span className="text-xs font-mono bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20">
                    Internship
                  </span>
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white/80' : 'text-zinc-800'}`}>
                  Android Developer (Gen AI)
                </h3>
                <a
                  href="https://makes.mindmatrix.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 mt-1 text-sm font-medium transition-colors"
                >
                  MindMatrix
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
                <p className={`mt-4 leading-relaxed ${darkMode ? 'text-white/30' : 'text-zinc-500'}`}>
                  Working on Android development powered by Generative AI. Building
                  features that bring AI capabilities into mobile experiences — still
                  early, still figuring things out, but learning something new every day.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Android", "Gen AI", "Kotlin", "Mobile Dev"].map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono bg-green-500/5 text-green-400/60 px-2.5 py-1 rounded border border-green-500/10"
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
        className="py-32 px-6 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionReveal}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="section-label text-pink-400">
              // skills
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-heading">
              Tools I&apos;m <span className="neon-text-pink">comfortable with</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-5 mt-10">
              {skillCategories.map((cat, ci) => (
                <motion.div
                  key={cat.title}
                  custom={ci}
                  variants={fadeUp}
                  className={`group bg-white/[0.02] rounded-2xl p-6 border border-white/5 ${neon[cat.color].hoverBorder} transition-all duration-500 hover:shadow-lg ${neon[cat.color].glow}`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{cat.icon}</span>
                    <h3
                      className={`text-xs uppercase tracking-[0.2em] font-mono text-white/30 group-hover:${neon[cat.color].text} transition-colors`}
                    >
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((skill) => (
                      <span
                        key={skill}
                        className="bg-white/[0.04] text-white/50 px-3.5 py-2 rounded-lg text-sm font-medium border border-white/5 hover:border-white/20 hover:text-white/80 transition-all cursor-default"
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
        className="py-32 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionReveal}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="section-label text-green-400">
              // projects
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-heading">
              Projects I&apos;ve <span className="neon-text-green">worked on</span>
            </motion.h2>

            <div className="space-y-5 mt-10">
              {projects.map((proj, pi) => (
                <motion.a
                  key={proj.title}
                  href={proj.github}
                  target="_blank"
                  rel="noreferrer"
                  custom={pi}
                  variants={fadeUp}
                  whileHover={{ x: 6 }}
                  className="group block bg-white/[0.02] rounded-2xl border border-white/5 hover:border-cyan-500/30 p-8 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/5"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <span className="text-6xl font-black text-white/[0.04] group-hover:text-cyan-500/10 transition-colors font-mono shrink-0 leading-none">
                      {String(pi + 1).padStart(2, "0")}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-white/80 group-hover:text-cyan-400 transition-colors">
                          {proj.title}
                        </h3>
                        <svg
                          className="w-4 h-4 text-white/10 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </div>
                      <p className="text-white/30 leading-relaxed mb-4">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {proj.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs font-mono bg-cyan-500/5 text-cyan-400/60 px-2.5 py-1 rounded border border-cyan-500/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Education ── */}
      <motion.section
        id="education"
        className="py-32 px-6 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/[0.02] to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="section-label text-yellow-400">// education</span>
            <h2 className="section-heading">
              Where I <span className="neon-text-yellow">studied</span>
            </h2>

            <div className="relative mt-10">
              {/* Neon line */}
              <div className="absolute left-6 top-0 bottom-0 w-px neon-line" />

              <div className="relative pl-16">
                {/* Dot */}
                <div className="absolute left-[18px] top-8 w-4 h-4 rounded-full bg-pink-500 shadow-lg shadow-pink-500/50 ring-4 ring-black" />

                <div className="bg-white/[0.02] rounded-2xl p-8 border border-white/5 hover:border-pink-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-pink-500/5">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="text-xs font-mono bg-pink-500/10 text-pink-400 px-3 py-1 rounded-full border border-pink-500/20">
                      2022 – 2026
                    </span>
                    <span className="text-xs font-mono bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20">
                      CGPA: 8.0 / 10
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white/80">
                    B.E. Computer Science &amp; Engineering
                  </h3>
                  <p className="text-white/30 mt-2">
                    Sai Vidya Institute of Technology, Bengaluru
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Contact ── */}
      <motion.section
        id="contact"
        className="py-32 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="section-label text-cyan-400">// contact</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              <span className="text-white/90">I&apos;d love to</span>
              <br />
              <span className="neon-text-gradient">hear from you.</span>
            </h2>
            <p className="text-white/30 mb-8 text-lg max-w-xl mx-auto">
              Whether it&apos;s a job opportunity, a freelance gig, or just a
              conversation about tech — I&apos;m always happy to connect.
              I&apos;m actively looking for roles where I can learn and
              contribute.
            </p>
            <p className="text-white/20 mb-12 text-sm max-w-md mx-auto font-mono">
              Seriously, even if you just want to say hi — my inbox is open.
            </p>
            <a
              href="mailto:amruthssharma.22cs@saividya.ac.in"
              className="neon-btn-lg group"
            >
              Get In Touch
              <span className="group-hover:rotate-12 transition-transform text-xl ml-3">
                ✉️
              </span>
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black neon-text-cyan">A.</span>
            <span className="text-white/20 text-sm font-mono">
              © 2026 Amruth S Sharma
            </span>
          </div>
          <div className="flex gap-5">
            {[
              { label: "GitHub", href: "https://github.com/amruthssss" },
              {
                label: "LinkedIn",
                href: "https://linkedin.com/in/amruth-s-sharma-3412a12a7",
              },
              {
                label: "Email",
                href: "mailto:amruthssharma.22cs@saividya.ac.in",
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noreferrer" : undefined}
                className="text-sm text-white/20 hover:text-cyan-400 transition-colors font-mono"
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
