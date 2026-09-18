import { useState, useEffect, useRef } from 'react'

const PORTRAIT = '/image.png'

const NAV_LINKS = ['ABOUT', 'WORK', 'EXPERIENCE', 'STACK', 'CONTACT']

// --- Reusable primitives ---

function Separator() {
  return <div className="w-full border-t border-[#252821]/12" />
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block border border-[#526653]/40 text-[#526653] text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1">
      {children}
    </span>
  )
}

// --- Navbar (same pill style as MARRAM hero, adapted for portfolio) ---

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl transition-all duration-300"
    >
      <div
        className={`flex items-center justify-between rounded-full px-1.5 py-1.5 border border-white/10 transition-all duration-300 ${
          scrolled
            ? 'bg-[#263A2D]/95 backdrop-blur-md shadow-lg'
            : 'bg-neutral-900/90 backdrop-blur-sm'
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-neutral-700/70 rounded-full px-4 py-1.5 shrink-0"
        >
          <span className="text-white text-[10px] font-bold tracking-widest uppercase">
            SUMIT KUMAR
          </span>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link.toLowerCase())}
                className="text-white/75 hover:text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* Availability badge */}
        <div className="hidden md:flex items-center gap-1.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A5AD91] animate-pulse" />
          <span className="text-[#A5AD91] text-[9px] font-semibold tracking-widest uppercase mr-2">
            Open to Opportunities
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden bg-neutral-700/70 rounded-full px-4 py-1.5 text-white text-[10px] font-semibold tracking-widest uppercase"
        >
          {open ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* Mobile Sheet */}
      {open && (
        <div className="md:hidden mt-2 bg-[#263A2D]/97 backdrop-blur-md rounded-3xl border border-white/10 py-6 px-6">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link.toLowerCase())}
                  className="text-white/80 hover:text-white text-sm font-semibold tracking-widest uppercase w-full text-left"
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 mt-6 pt-6 border-t border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A5AD91] animate-pulse" />
            <span className="text-[#A5AD91] text-[9px] font-semibold tracking-widest uppercase">
              Open to Opportunities
            </span>
          </div>
        </div>
      )}
    </header>
  )
}

// --- Hero Section ---

function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const parallax = scrollY * 0.4
  const opacity = Math.max(0, 1 - scrollY / 600)
  const titleY = scrollY * 0.25

  return (
    <section ref={heroRef} className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Portrait */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${parallax}px)`, willChange: 'transform' }}
      >
        <img
          src={PORTRAIT}
          alt="Sumit Kumar"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Warm olive overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#263A2D]/20 via-[#263A2D]/10 to-[#252821]/70" />

      {/* Hero text */}
      <div
        className="absolute inset-0 flex flex-col justify-end px-8 md:px-14 pb-16 z-10"
        style={{ opacity, transform: `translateY(-${titleY}px)`, willChange: 'transform, opacity' }}
      >
        {/* Meta tags */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[#A5AD91] text-[10px] font-semibold tracking-widest uppercase">
            ML • FULL STACK • SYSTEMS
          </span>
        </div>

        {/* Name */}
        <h1
          className="font-display text-white font-bold leading-none mb-4"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', letterSpacing: '-0.03em' }}
        >
          SUMIT KUMAR
        </h1>

        {/* Title */}
        <p
          className="font-display text-white/80 font-light italic mb-6"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2rem)' }}
        >
          ML Engineer &amp; Full Stack Developer
        </p>

        <p className="text-white/60 text-sm font-medium max-w-lg mb-8 leading-relaxed tracking-wide">
          Building intelligent systems and full-stack products from idea to deployment.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-white/30 text-white text-[10px] font-semibold tracking-widest uppercase px-6 py-3 hover:bg-white/10 transition-colors"
          >
            VIEW MY WORK
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-white/15 text-white/70 text-[10px] font-semibold tracking-widest uppercase px-6 py-3 hover:bg-white/5 transition-colors"
          >
            CONTACT ME
          </button>
        </div>
      </div>

      {/* Bottom labels */}
      <div className="absolute bottom-6 left-8 md:left-14 z-10" style={{ opacity }}>
        <span className="text-white/30 text-[9px] font-semibold tracking-widest uppercase">
          SCROLL TO EXPLORE
        </span>
      </div>
      <div className="absolute bottom-6 right-8 md:right-14 z-10" style={{ opacity }}>
        <span className="text-white/30 text-[9px] font-semibold tracking-widest uppercase">
          NEW DELHI / INDIA
        </span>
      </div>
    </section>
  )
}

// --- About Section ---

function About() {
  return (
    <section id="about" className="bg-[#F3EFE4] pt-28 pb-0 md:pt-36">
      <div className="max-w-6xl mx-auto px-8 md:px-14">
        {/* Label row */}
        <div className="flex items-center justify-between mb-16 border-t border-[#252821]/12 pt-10">
          <p className="text-[#72766C] text-[10px] font-semibold tracking-widest uppercase">01 — ABOUT</p>
          <p className="text-[#72766C] text-[10px] font-semibold tracking-widest uppercase hidden md:block">NEW DELHI, INDIA</p>
        </div>

        {/* Large statement — full width, editorial */}
        <h2
          className="font-display text-[#252821] font-semibold leading-[1.05] mb-16"
          style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', letterSpacing: '-0.02em' }}
        >
          I like working where<br />
          <em className="text-[#526653] not-italic">intelligent models</em><br />
          meet real products.
        </h2>

        {/* Two-column body */}
        <div className="grid md:grid-cols-[1fr_320px] gap-16 md:gap-24 pb-20 border-b border-[#252821]/12">
          <div>
            <p className="text-[#72766C] text-lg leading-relaxed mb-10 max-w-2xl">
              I'm Sumit Kumar — an ML Engineer and Full Stack Developer focused on building practical
              technology across machine learning, backend systems and modern web applications. I work at
              the intersection of data-driven intelligence and user-facing product, turning ideas into
              systems that are deployed, not just demonstrated.
            </p>

            {/* Discipline blocks */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#252821]/10">
              {[
                { title: 'Machine Learning', sub: 'Models · Pipelines · CV' },
                { title: 'Full Stack Dev', sub: 'Web · Mobile · APIs' },
                { title: 'Backend Eng.', sub: 'Systems · Architecture' },
                { title: 'AI Applications', sub: 'LLMs · Agents · RAG' },
                { title: 'System Design', sub: 'Scalable · Modular' },
              ].map((d) => (
                <div key={d.title} className="bg-[#F3EFE4] px-5 py-5 hover:bg-[#EBE7DA] transition-colors">
                  <p className="text-[#252821] text-sm font-semibold mb-1">{d.title}</p>
                  <p className="text-[#72766C] text-[11px] tracking-wide">{d.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Side */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[#72766C] text-[9px] font-semibold tracking-widest uppercase mb-6 pb-4 border-b border-[#252821]/12">
                CURRENTLY FOCUSED ON
              </p>
              <ul className="space-y-5">
                {['Machine Learning', 'Full Stack Systems', 'AI Applications', 'Backend Architecture'].map((item, i) => (
                  <li key={item} className="flex items-center gap-4">
                    <span className="font-display text-[#D8CFBD] font-bold text-xl leading-none">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[#252821] text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 pt-8 border-t border-[#252821]/12">
              <p className="font-display text-[#526653] text-2xl italic font-light leading-snug">
                "Engineering that ships."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Projects ---

const PROJECTS = [
  {
    num: '01',
    title: 'SATELLITE IMAGE\nCHANGE DETECTION\nSYSTEM',
    category: 'Machine Learning / Computer Vision',
    description:
      'An AI pipeline for detecting and classifying changes between multi-temporal satellite images, reducing the complexity of manual geospatial analysis.',
    flow: ['Satellite Images', 'Preprocessing', 'Pixel Difference', 'SAM Segmentation', 'CLIP Classification', 'Natural / Man-Made Change'],
    highlights: ['MODEL-ASSISTED SEGMENTATION', 'POST-PROCESSING FOR NOISE REDUCTION', 'MODULAR PIPELINE DESIGN', 'NATURAL VS MAN-MADE CLASSIFICATION'],
    tech: ['Python', 'PIL', 'SAM (ViT-B)', 'CLIP', 'NumPy'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Kumarsumit11/satellite-images-change-detection-' },
      { label: 'Live Demo', href: 'https://kumarsumit11.github.io/MY-PORTFOLIO/#' },
    ],
  },
  {
    num: '02',
    title: 'REPLATE\nSMART DONATION\nPLATFORM',
    category: 'Full Stack / Social Impact',
    description:
      'A real-time donation platform connecting restaurants, NGOs and individuals to reduce food waste through coordinated availability and location-based matching.',
    flow: ['Restaurant', 'Donation', 'Matching', 'NGO', 'Pickup', 'Impact'],
    highlights: ['ROLE-BASED ACCESS CONTROL', 'REAL-WORLD WORKFLOW MODELING', 'LOCATION-BASED MATCHING', 'REAL-TIME AVAILABILITY', 'ACCESSIBILITY-AWARE UI'],
    tech: ['HTML', 'CSS', 'JavaScript', 'REST APIs', 'Azure', 'Component Architecture'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Kumarsumit11/REPLATE101' },
      { label: 'Website', href: 'https://kumarsumit11.github.io/REPLATE101/' },
    ],
  },
  {
    num: '03',
    title: 'MEDICAL SYSTEM\nBLOCKCHAIN × ZERO\nTRUST × AI',
    category: 'Healthcare / Blockchain / AI',
    description:
      'A privacy-focused medical system designed around decentralized verification, offline-first access and an AI assistant for emergency scenarios.',
    flow: ['AUTH', 'MEDICAL DATA', 'BLOCKCHAIN', 'AI ASSISTANT'],
    highlights: ['BLOCKCHAIN HASH VERIFICATION', 'ZERO TRUST ARCHITECTURE', 'QR-BASED DATA ACCESS', 'LLM-BASED AI ASSISTANT', 'OFFLINE-FIRST DESIGN'],
    tech: ['React Native', 'FastAPI', 'Python', 'Supabase', 'Solidity', 'Web3.py', 'Ganache'],
    links: [
      { label: 'Codebase', href: 'https://drive.google.com/drive/folders/1xpIXUQUJ3r4ykpwkMcZ0_BF7ENRIpbhe?usp=sharing' },
      { label: 'Docs', href: 'https://drive.google.com/file/d/1hMqE1thlhgPNQaNmsitkPkNKiK3M4-Zy/view?usp=sharing' },
      { label: 'App Video', href: 'https://drive.google.com/file/d/1qIkb2jHMefQeI_P_3EHJjK36nL3u8r0a/view?usp=sharing' },
    ],
  },
]

function Projects() {
  return (
    <section id="work" className="bg-[#F3EFE4] py-8">
      <div className="max-w-6xl mx-auto px-8 md:px-14">
        <div className="flex items-baseline justify-between mb-20 border-t border-[#252821]/12 pt-20">
          <div>
            <p className="text-[#72766C] text-[10px] font-semibold tracking-widest uppercase mb-4">
              02 — SELECTED WORK
            </p>
            <h2
              className="font-display text-[#252821] font-semibold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Projects built around real<br />problems and applied engineering.
            </h2>
          </div>
        </div>

        <div className="space-y-0">
          {PROJECTS.map((project, i) => (
            <div key={project.num}>
              <Separator />
              <div className={`py-16 flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-20 items-start`}>
                {/* Left / Number + Title */}
                <div className="md:w-2/5 shrink-0">
                  <span
                    className="font-display text-[#D8CFBD] font-bold leading-none block mb-4"
                    style={{ fontSize: 'clamp(4rem, 8vw, 7rem)' }}
                  >
                    {project.num}
                  </span>
                  <h3
                    className="font-display text-[#252821] font-semibold leading-tight mb-4 whitespace-pre-line"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-[#72766C] text-[10px] font-semibold tracking-widest uppercase mb-6">
                    {project.category}
                  </p>
                  {/* Flow visualization */}
                  <div className="flex flex-wrap gap-1 items-center mb-6">
                    {project.flow.map((step, si) => (
                      <span key={step} className="flex items-center gap-1">
                        <span className="text-[#526653] text-[10px] font-semibold tracking-wide uppercase">{step}</span>
                        {si < project.flow.length - 1 && (
                          <span className="text-[#A5AD91] text-xs">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right / Details */}
                <div className="flex-1">
                  <p className="text-[#72766C] leading-relaxed text-base mb-8">
                    {project.description}
                  </p>

                  <div className="mb-8">
                    <p className="text-[#72766C] text-[9px] font-semibold tracking-widest uppercase mb-4">
                      ENGINEERING HIGHLIGHTS
                    </p>
                    <div className="space-y-2">
                      {project.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-3">
                          <span className="w-4 border-t border-[#A5AD91]" />
                          <span className="text-[#252821] text-[11px] font-semibold tracking-wider uppercase">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {project.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#526653]/40 text-[#526653] text-[10px] font-semibold tracking-widest uppercase px-4 py-2.5 hover:bg-[#526653] hover:text-white transition-colors"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Separator />
        </div>
      </div>
    </section>
  )
}

// --- Experience ---

const EXPERIENCES = [
  {
    num: '01',
    role: 'ML ENGINEER',
    company: 'JAVIN GLOBAL',
    type: 'OFFLINE INTERNSHIP',
    period: 'MAY 2026 — AUGUST 2026',
    description:
      'Developed and trained a machine learning model for predicting market trends and Gold GC price movements using live gold market data.',
    highlights: ['ML MODEL DEVELOPMENT', 'MARKET TREND PREDICTION', 'GOLD GC PRICE PREDICTION', 'LIVE MARKET DATA'],
  },
  {
    num: '02',
    role: 'FULL STACK DEVELOPER INTERN',
    company: 'A&A INTERNATIONAL',
    type: 'HYBRID',
    period: 'MID JUNE 2026 — END AUGUST 2026',
    description:
      'Developed a complete end-to-end company website for DNH Fintech, covering the product experience from frontend interface to backend functionality.',
    highlights: ['FULL-STACK DEVELOPMENT', 'END-TO-END PRODUCT DEVELOPMENT', 'COMPANY WEBSITE', 'PRODUCTION-READY IMPLEMENTATION'],
    link: { label: 'DNH Fintech', href: 'https://www.dnhfintech.com/' },
  },
  {
    num: '03',
    role: 'SDE INTERN',
    company: 'BLUESTOCK',
    type: '2025',
    period: '2025',
    description:
      'Contributed to product features and backend engineering, working on system improvements as part of the development team.',
    highlights: ['BACKEND ENGINEERING', 'PRODUCT DEVELOPMENT', 'SYSTEM IMPROVEMENTS'],
  },
]

function Experience() {
  return (
    <section id="experience" className="bg-[#F3EFE4] py-8">
      <div className="max-w-6xl mx-auto px-8 md:px-14">
        <div className="border-t border-[#252821]/12 pt-20 mb-16">
          <p className="text-[#72766C] text-[10px] font-semibold tracking-widest uppercase mb-4">
            03 — EXPERIENCE
          </p>
          <h2
            className="font-display text-[#252821] font-semibold leading-tight max-w-2xl"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Building across machine learning, backend engineering and full-stack product development.
          </h2>
        </div>

        {/* Experience cards — all three equally prominent */}
        <div className="grid md:grid-cols-3 gap-px bg-[#252821]/10 mb-0">
          {EXPERIENCES.map((exp) => (
            <div key={exp.num} className="bg-[#F3EFE4] p-8 flex flex-col">
              {/* Number + period */}
              <div className="flex items-start justify-between mb-8">
                <span className="font-display text-[#D8CFBD] font-bold leading-none text-5xl">{exp.num}</span>
                <div className="text-right">
                  <p className="text-[#72766C] text-[9px] font-semibold tracking-widest uppercase leading-tight">{exp.type}</p>
                  <p className="text-[#72766C] text-[9px] font-semibold tracking-widest uppercase leading-tight mt-0.5">{exp.period}</p>
                </div>
              </div>

              {/* Role + company */}
              <h3
                className="font-display text-[#252821] font-semibold leading-tight mb-1"
                style={{ fontSize: 'clamp(1.2rem, 2vw, 1.7rem)' }}
              >
                {exp.role}
              </h3>
              <p className="text-[#526653] text-[10px] font-bold tracking-widest uppercase mb-6 pb-6 border-b border-[#252821]/10">
                {exp.company}
              </p>

              {/* Description */}
              <p className="text-[#72766C] text-sm leading-relaxed mb-6 flex-1">{exp.description}</p>

              {/* Highlights */}
              <div className="space-y-2 mb-6">
                {exp.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2.5">
                    <span className="w-3 border-t border-[#A5AD91] shrink-0" />
                    <span className="text-[#252821] text-[10px] font-semibold tracking-wider uppercase leading-tight">{h}</span>
                  </div>
                ))}
              </div>

              {exp.link && (
                <a
                  href={exp.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#526653] text-[10px] font-bold tracking-widest uppercase border-b border-[#526653]/30 pb-px hover:border-[#526653] transition-colors w-fit mt-auto"
                >
                  {exp.link.label} ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Microsoft Imagine Cup — visually distinct but balanced */}
      <div className="mt-0 border-t border-[#252821]/12 bg-[#263A2D]">
        <div className="max-w-6xl mx-auto px-8 md:px-14 py-20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10 justify-between">
            {/* Left: label + title */}
            <div className="flex items-center gap-10">
              <div className="hidden md:block">
                <p className="font-display text-[#A5AD91]/40 font-bold leading-none select-none"
                  style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}>
                  ★
                </p>
              </div>
              <div>
                <p className="text-[#A5AD91] text-[9px] font-semibold tracking-widest uppercase mb-3">
                  MAJOR ACHIEVEMENT · 2026
                </p>
                <h2
                  className="font-display text-[#F3EFE4] font-semibold leading-tight"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', letterSpacing: '-0.02em' }}
                >
                  Microsoft Imagine Cup
                </h2>
              </div>
            </div>

            {/* Right: description */}
            <div className="md:max-w-xs">
              <p className="text-[#D8CFBD]/70 text-sm leading-relaxed mb-4">
                Presented a technology innovation project at Microsoft's global student competition.
              </p>
              <div className="flex items-center gap-2">
                <span className="w-6 border-t border-[#A5AD91]/50" />
                <span className="text-[#A5AD91] text-[10px] font-semibold tracking-widest uppercase">Global Student Competition</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Achievements ---

const ACHIEVEMENTS = [
  { title: 'SMART INDIA HACKATHON 2025', desc: 'Built a PSU job-reallocation platform and led cloud deployment in a 36-hour sprint.' },
  { title: 'SMART INDIA HACKATHON 2024', desc: 'Built a SAR satellite image analysis platform and reached the national round.' },
  { title: 'NHAI HACKATHON', desc: 'Semi-finalist in the National Highways Authority of India hackathon.' },
  { title: 'CTF COMPETITION', desc: '5th Place — Capture The Flag cybersecurity competition.' },
  { title: 'IIT BOMBAY E-CELL', desc: 'Attended IIT Bombay E-Cell regional competitions.' },
]

function Achievements() {
  return (
    <section className="bg-[#F3EFE4] py-8">
      <div className="max-w-6xl mx-auto px-8 md:px-14">
        <div className="border-t border-[#252821]/12 pt-20 mb-12">
          <p className="text-[#72766C] text-[10px] font-semibold tracking-widest uppercase mb-4">
            04 — RECOGNITION
          </p>
          <h2
            className="font-display text-[#252821] font-semibold"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            More Highlights
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-0">
          {ACHIEVEMENTS.map((a, i) => (
            <div key={a.title} className={`py-8 pr-8 ${i % 2 === 0 && i < ACHIEVEMENTS.length - 1 ? 'md:border-r border-[#252821]/12' : ''} border-t border-[#252821]/12`}>
              <p className="text-[#526653] text-[10px] font-bold tracking-widest uppercase mb-2">{a.title}</p>
              <p className="text-[#72766C] text-sm leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- Tech Stack ---

const STACK = [
  {
    category: 'LANGUAGES',
    accent: '#526653',
    items: ['Python', 'Dart', 'JavaScript', 'Java', 'C', 'C++', 'SQL'],
  },
  {
    category: 'AI / ML',
    accent: '#263A2D',
    items: ['PyTorch', 'SAM (ViT-B)', 'CLIP', 'NumPy', 'PIL', 'Matplotlib', 'Computer Vision', 'NLP', 'LangChain', 'Flowise'],
  },
  {
    category: 'WEB & MOBILE',
    accent: '#72766C',
    items: ['Flutter', 'React', 'React Native', 'Expo', 'HTML5', 'CSS3', 'Tailwind CSS', 'Node.js', 'Flask', 'Django'],
  },
  {
    category: 'DATABASES / BACKEND',
    accent: '#526653',
    items: ['PostgreSQL', 'SQLite', 'Supabase', 'REST APIs', 'Blockchain Integration'],
  },
  {
    category: 'CLOUD & DEVOPS',
    accent: '#263A2D',
    items: ['AWS', 'Azure', 'Git', 'GitHub', 'CI/CD', 'Automation Scripts'],
  },
  {
    category: 'CORE',
    accent: '#72766C',
    items: ['System Design', 'Operating Systems', 'Computer Networks', 'Cybersecurity'],
  },
]

function Stack() {
  return (
    <section id="stack" className="bg-[#F3EFE4] py-8">
      <div className="max-w-6xl mx-auto px-8 md:px-14">
        <div className="border-t border-[#252821]/12 pt-20 mb-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-[#72766C] text-[10px] font-semibold tracking-widest uppercase mb-4">
                05 — TECHNICAL STACK
              </p>
              <h2
                className="font-display text-[#252821] font-semibold leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Tools, Languages<br />&amp; Frameworks
              </h2>
            </div>
            <p className="text-[#72766C] text-sm max-w-xs leading-relaxed md:text-right">
              A cross-disciplinary stack spanning AI research, full-stack product, and mobile development.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#252821]/10">
          {STACK.map((group) => (
            <div key={group.category} className="bg-[#F3EFE4] p-8 group hover:bg-[#EBE7DA] transition-colors duration-200">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-[#252821]/10">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: group.accent }}
                />
                <p className="text-[#252821] text-[10px] font-bold tracking-widest uppercase">
                  {group.category}
                </p>
              </div>

              {/* Items */}
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-block text-[11px] font-semibold tracking-wide px-2.5 py-1 border transition-colors duration-150"
                    style={{
                      borderColor: `${group.accent}30`,
                      color: group.accent,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer bar */}
        <div className="bg-[#263A2D] px-8 py-5 flex items-center justify-between">
          <span className="text-[#A5AD91] text-[10px] font-semibold tracking-widest uppercase">
            Continuously learning
          </span>
          <span className="font-display text-[#A5AD91]/40 italic text-sm">
            engineering that compounds
          </span>
        </div>
      </div>
    </section>
  )
}

// --- Contact ---

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="bg-[#263A2D] py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-8 md:px-14">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          {/* Left */}
          <div className="flex-1">
            <h2
              className="font-display text-[#F3EFE4] font-bold leading-none mb-8"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
            >
              LET'S BUILD<br />SOMETHING<br />USEFUL.
            </h2>
            <p className="text-[#A5AD91] leading-relaxed text-base max-w-sm mb-12">
              Whether you're building an intelligent product, a full-stack system or something that sits somewhere between the two, I'd love to hear about it.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:info2sumitkumar@gmail.com"
                className="flex items-center gap-3 text-[#D8CFBD] hover:text-white transition-colors group"
              >
                <span className="text-[9px] font-semibold tracking-widest uppercase text-[#A5AD91] w-14">EMAIL</span>
                <span className="text-sm font-medium group-hover:underline underline-offset-4">info2sumitkumar@gmail.com</span>
              </a>
              <a
                href="https://linkedin.com/in/sumitkumar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#D8CFBD] hover:text-white transition-colors group"
              >
                <span className="text-[9px] font-semibold tracking-widest uppercase text-[#A5AD91] w-14">LINKEDIN</span>
                <span className="text-sm font-medium group-hover:underline underline-offset-4">linkedin.com/in/sumitkumar</span>
              </a>
              <a
                href="https://github.com/kumarsumit11"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#D8CFBD] hover:text-white transition-colors group"
              >
                <span className="text-[9px] font-semibold tracking-widest uppercase text-[#A5AD91] w-14">GITHUB</span>
                <span className="text-sm font-medium group-hover:underline underline-offset-4">github.com/kumarsumit11</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-96 shrink-0">
            {sent ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="font-display text-[#F3EFE4] text-3xl font-semibold mb-3">Message sent.</p>
                  <p className="text-[#A5AD91] text-sm">I'll get back to you soon.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-[#A5AD91] text-[9px] font-semibold tracking-widest uppercase block mb-2">NAME</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-[#A5AD91]/30 text-[#F3EFE4] text-sm py-3 outline-none focus:border-[#A5AD91] transition-colors placeholder:text-[#72766C]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-[#A5AD91] text-[9px] font-semibold tracking-widest uppercase block mb-2">EMAIL</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-[#A5AD91]/30 text-[#F3EFE4] text-sm py-3 outline-none focus:border-[#A5AD91] transition-colors placeholder:text-[#72766C]"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-[#A5AD91] text-[9px] font-semibold tracking-widest uppercase block mb-2">MESSAGE</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full bg-transparent border-b border-[#A5AD91]/30 text-[#F3EFE4] text-sm py-3 outline-none focus:border-[#A5AD91] transition-colors placeholder:text-[#72766C] resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full border border-[#A5AD91]/50 text-[#F3EFE4] text-[10px] font-semibold tracking-widest uppercase py-4 hover:bg-[#A5AD91]/10 transition-colors"
                >
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Footer ---

function Footer() {
  return (
    <footer className="bg-[#252821] py-12 px-8 md:px-14">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-display text-[#F3EFE4] text-xl font-semibold mb-1">SUMIT KUMAR</p>
          <p className="text-[#72766C] text-[10px] font-semibold tracking-widest uppercase">
            ML ENGINEER / FULL STACK DEVELOPER · NEW DELHI, INDIA
          </p>
        </div>
        <div className="flex items-center gap-6">
          {[
            { label: 'GitHub', href: 'https://github.com/kumarsumit11' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/sumitkumar' },
            { label: 'Email', href: 'mailto:info2sumitkumar@gmail.com' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#72766C] hover:text-[#F3EFE4] text-[10px] font-semibold tracking-widest uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5">
        <p className="text-[#72766C] text-[10px]">© 2026 Sumit Kumar</p>
      </div>
    </footer>
  )
}

// --- Root ---

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Achievements />
      <Stack />
      <Contact />
      <Footer />
    </div>
  )
}
