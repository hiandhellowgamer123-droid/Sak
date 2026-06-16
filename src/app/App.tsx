import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  BookOpen,
  Microscope,
  Monitor,
  Music,
  Trophy,
  Users,
  Star,
  ArrowRight,
  GraduationCap,
  Dumbbell,
  Library,
  FlaskConical,
  Send,
  ChevronDown,
  Quote,
  ExternalLink,
} from "lucide-react";

type Page = "home" | "about" | "academics" | "facilities" | "gallery" | "contact";
type GalleryFilter = "all" | "events" | "sports" | "classrooms" | "labs";

const NAV_LINKS: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Academics", page: "academics" },
  { label: "Facilities", page: "facilities" },
  { label: "Gallery", page: "gallery" },
  { label: "Contact", page: "contact" },
];

const STATS = [
  { value: "2063", label: "Est. B.S.", suffix: "" },
  { value: "PG–12", label: "Grade Range", suffix: "" },
  { value: "2000+", label: "Students", suffix: "" },
  { value: "150+", label: "Qualified Staff", suffix: "" },
];

const FACILITIES_DATA = [
  {
    icon: FlaskConical,
    title: "Science Labs",
    desc: "Fully equipped Chemistry, Biology, and Physics labs supporting hands-on practical learning.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-700",
  },
  {
    icon: Monitor,
    title: "Computer Labs",
    desc: "Two modern computer labs with high-speed internet, supporting digital literacy and programming.",
    color: "bg-blue-50",
    iconColor: "text-blue-700",
  },
  {
    icon: Library,
    title: "Library",
    desc: "A well-stocked library with thousands of volumes across subjects, periodicals, and digital resources.",
    color: "bg-indigo-50",
    iconColor: "text-indigo-700",
  },
  {
    icon: Music,
    title: "Music Lab",
    desc: "Dedicated music facility nurturing creative expression and performing arts education.",
    color: "bg-purple-50",
    iconColor: "text-purple-700",
  },
  {
    icon: Dumbbell,
    title: "Futsal Ground",
    desc: "Professional futsal court and spacious playground promoting fitness and team sports culture.",
    color: "bg-amber-50",
    iconColor: "text-amber-700",
  },
  {
    icon: BookOpen,
    title: "STEM Centre",
    desc: "Integrated STEM learning environment bridging science, technology, engineering, and mathematics.",
    color: "bg-teal-50",
    iconColor: "text-teal-700",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Parent, Grade 10",
    text: "Satyawati Academy has given my daughter a structured, nurturing environment. The quality of teaching and facilities here is unmatched in Kailali.",
    avatar: "PS",
  },
  {
    name: "Ram Bahadur Thapa",
    role: "Alumni, +2 Science 2079",
    text: "The science labs and dedicated teachers prepared me exceptionally well for my entrance exams. I owe my success to the foundation built here.",
    avatar: "RT",
  },
  {
    name: "Sita Devi Joshi",
    role: "Parent, Grade 7",
    text: "Discipline, care, and academic rigour — Satyawati delivers all three. The school genuinely invests in every child's development.",
    avatar: "SJ",
  },
];

const GALLERY_ITEMS = [
  {
    id: 1,
    category: "events",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&auto=format",
    alt: "Annual school ceremony with students on stage",
    label: "Annual Function 2080",
  },
  {
    id: 2,
    category: "labs",
    url: "https://images.unsplash.com/photo-1532094349884-543559c5bb4b?w=600&h=400&fit=crop&auto=format",
    alt: "Students working in science laboratory",
    label: "Chemistry Lab Session",
  },
  {
    id: 3,
    category: "sports",
    url: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&h=400&fit=crop&auto=format",
    alt: "Students playing futsal on the school ground",
    label: "Inter-house Futsal Tournament",
  },
  {
    id: 4,
    category: "classrooms",
    url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop&auto=format",
    alt: "Students attentive in modern classroom",
    label: "Grade 9 Science Class",
  },
  {
    id: 5,
    category: "labs",
    url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop&auto=format",
    alt: "Students at computers in computer lab",
    label: "Computer Lab — Programming Session",
  },
  {
    id: 6,
    category: "events",
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&auto=format",
    alt: "Students receiving awards at graduation ceremony",
    label: "Results & Awards Day 2080",
  },
  {
    id: 7,
    category: "sports",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&auto=format",
    alt: "Students in yoga and physical education session",
    label: "Yoga & Sports Day",
  },
  {
    id: 8,
    category: "classrooms",
    url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop&auto=format",
    alt: "Students reading books in library",
    label: "Library Reading Hour",
  },
  {
    id: 9,
    category: "events",
    url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop&auto=format",
    alt: "Cultural programme with students performing",
    label: "Cultural Programme 2080",
  },
];

const VALUES = [
  { title: "Academic Excellence", desc: "We uphold rigorous academic standards that prepare students for national and international opportunities." },
  { title: "Discipline & Character", desc: "Consistent routines and respectful conduct are pillars that shape responsible citizens." },
  { title: "Holistic Growth", desc: "Beyond academics, we nurture sports, arts, and social responsibility in every student." },
  { title: "Inclusive Community", desc: "We welcome students from all backgrounds and celebrate diversity as a source of strength." },
];

function useScrollTo() {
  return (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
}

function Navbar({ activePage, setPage }: { activePage: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [activePage]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"
      }`}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div
                className="font-bold text-sm leading-tight"
                style={{
                  color: scrolled ? "#0d1f15" : "white",
                  fontFamily: "'Fraunces', serif",
                }}
              >
                Satyawati Academy
              </div>
              <div
                className="text-xs leading-tight"
                style={{ color: scrolled ? "#4d6b57" : "rgba(255,255,255,0.8)" }}
              >
                Kailali, Nepal
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.page}
                onClick={() => setPage(link.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activePage === link.page
                    ? "bg-primary text-white"
                    : scrolled
                    ? "text-foreground hover:bg-muted hover:text-primary"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => setPage("contact")}
              className="ml-3 px-5 py-2 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-primary transition-colors duration-200"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden p-2 rounded-lg ${scrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-border shadow-lg">
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.page}
                onClick={() => setPage(link.page)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activePage === link.page
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => setPage("contact")}
              className="mt-2 px-4 py-3 bg-accent text-white rounded-lg text-sm font-semibold text-center"
            >
              Enquire Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=900&fit=crop&auto=format"
            alt="School campus with students"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,45,92,0.88) 0%, rgba(26,92,56,0.75) 100%)" }} />
        </div>

        <div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-10 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Est. 2063 B.S. · Ring Road, Attariya, Kailali
              </span>
            </div>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}
            >
              Satyawati
              <br />
              <span className="text-accent">Academy</span>
              <br />
              Kailali
            </h1>
            <p
              className="text-xl text-white/80 mb-3 italic"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              "To produce quality and civilised people"
            </p>
            <p className="text-base text-white/70 mb-10 max-w-xl leading-relaxed">
              From Play Group to Grade 12 — including +2 Science and Computer Science — we shape futures through discipline, modern facilities, and excellence in education.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setPage("academics")}
                className="px-7 py-3.5 bg-accent hover:bg-primary text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 group"
              >
                Explore Academics
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setPage("contact")}
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 transition-all duration-200 backdrop-blur-sm"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-primary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-3xl font-bold text-white mb-1"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {s.value}
                </div>
                <div className="text-sm text-white/70 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-8 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  World-Class Facilities
                </span>
              </div>
              <h2
                className="text-4xl font-bold text-foreground"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Built for
                <br />
                Deeper Learning
              </h2>
            </div>
            <button
              onClick={() => setPage("facilities")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors group"
            >
              View all facilities
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FACILITIES_DATA.map((f) => (
              <div
                key={f.title}
                className={`${f.color} rounded-2xl p-6 border border-border hover:shadow-md transition-shadow duration-300`}
              >
                <div className={`w-11 h-11 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm`}>
                  <f.icon className={`w-5 h-5 ${f.iconColor}`} />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic overview */}
      <section className="py-20 bg-secondary text-white overflow-hidden relative">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "#2d9e6b", transform: "translate(30%, -30%)" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-accent" />
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                  Academics
                </span>
              </div>
              <h2
                className="text-4xl font-bold text-white mb-5"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                From Playgroup
                <br />
                to Grade 12
              </h2>
              <p className="text-white/75 text-base leading-relaxed mb-8">
                Our curriculum spans Play Group through Grade 12, with dedicated +2 streams in Science and Computer Science. Instruction is delivered in English — with Nepali and Social Studies taught in Nepali — ensuring bilingual competency and national curriculum alignment.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "+2 Science Stream", desc: "Physics, Chemistry, Biology, Maths" },
                  { label: "+2 Computer Science", desc: "Programming, Networking, Mathematics" },
                  { label: "Primary to Grade 10", desc: "Strong foundational academics" },
                  { label: "Play Group & Nursery", desc: "Nurturing early childhood education" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <div className="font-semibold text-sm text-accent mb-1">{item.label}</div>
                    <div className="text-white/60 text-xs">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&h=500&fit=crop&auto=format"
                alt="Students engaged in classroom learning"
                className="rounded-2xl w-full object-cover"
                style={{ height: 380 }}
              />
              <div
                className="absolute -bottom-5 -left-5 bg-primary rounded-xl p-5 shadow-xl"
              >
                <div
                  className="text-2xl font-bold text-white mb-0.5"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  #1
                </div>
                <div className="text-xs text-white/75 font-medium">Trusted School<br />in Kailali Region</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Testimonials
              </span>
              <div className="h-px w-8 bg-primary" />
            </div>
            <h2
              className="text-4xl font-bold text-foreground"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              What Families Say
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-7 border border-border hover:shadow-md transition-shadow duration-300 relative"
              >
                <Quote className="w-8 h-8 text-muted-foreground/30 absolute top-5 right-5" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Begin Your Child's
            <br />
            Journey With Us
          </h2>
          <p className="text-white/80 text-base mb-8 max-w-xl mx-auto">
            Admissions for 2083 B.S. are open. Reach out to our team for enquiries, a campus tour, or admission guidance.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setPage("contact")}
              className="px-8 py-3.5 bg-white text-accent hover:bg-primary hover:text-white font-bold rounded-lg transition-all duration-200"
            >
              Enquire Now
            </button>
            <button
              onClick={() => setPage("about")}
              className="px-8 py-3.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-lg border border-white/30 transition-all duration-200"
            >
              Learn About Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-secondary overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #2d9e6b 0%, transparent 60%), radial-gradient(circle at 80% 20%, #1a5c38 0%, transparent 50%)`,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Our Story
              </span>
            </div>
            <h1
              className="text-5xl font-bold text-white mb-5"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              About Satyawati Academy
            </h1>
            <p className="text-white/75 text-base leading-relaxed">
              Over six decades in Nepal's educational landscape, Satyawati Academy has been a pillar of quality learning, discipline, and community development in the Kailali region.
            </p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Our History
                </span>
              </div>
              <h2
                className="text-4xl font-bold text-foreground mb-5"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Founded in 2063 B.S.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Satyawati Academy was established in 2063 B.S. (Bikram Sambat) with a founding vision to bring quality English-medium education to the Kailali district — one of the most significant educational centres of the Far-Western Province of Nepal.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Located on Ring Road, Attariya, Godawari-2, the school began with a modest intake of students and a commitment to combining academic rigour with character development. Over the decades, it has grown into a comprehensive institution offering education from Play Group through Grade 12, including +2 streams in Science and Computer Science.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, Satyawati Academy is recognised as one of the most trusted schools in the Kailali region, known for its results, infrastructure, and the discipline it instils in every student.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&h=500&fit=crop&auto=format"
                alt="School building and campus"
                className="rounded-2xl w-full object-cover shadow-lg"
                style={{ height: 380 }}
              />
              <div className="absolute -bottom-4 -right-4 bg-primary rounded-xl p-5 text-white shadow-xl">
                <div
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  60+ yrs
                </div>
                <div className="text-xs text-white/75">of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold text-foreground"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Mission & Vision
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3
                className="text-xl font-bold text-foreground mb-3"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To deliver an exceptional English-medium education that balances academic depth, practical skills, and ethical character — producing graduates who contribute meaningfully to society and are prepared for national and global challenges.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                <GraduationCap className="w-6 h-6 text-secondary" />
              </div>
              <h3
                className="text-xl font-bold text-foreground mb-3"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the foremost institution of learning in the Kailali region — a school where every child, regardless of background, has access to quality education, grows in confidence and discipline, and emerges as a civilised, capable individual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Core Values</span>
              <div className="h-px w-8 bg-primary" />
            </div>
            <h2
              className="text-4xl font-bold text-foreground"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <div key={v.title} className="text-center p-6">
                <div
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm mx-auto mb-4"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-bold text-foreground mb-2 text-base">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal Message */}
      <section className="py-20 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="w-28 h-28 rounded-full bg-primary/30 border-2 border-accent flex items-center justify-center mb-4">
                <Users className="w-12 h-12 text-accent" />
              </div>
              <div
                className="text-xl font-bold text-white"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Yashoda Dhyadi Kadayat
              </div>
              <div className="text-sm text-accent font-semibold mt-1">Principal</div>
              <div className="text-xs text-white/60 mt-0.5">Satyawati Academy Kailali</div>
            </div>
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-accent" />
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                  Principal's Message
                </span>
              </div>
              <h2
                className="text-3xl font-bold text-white mb-5"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Shaping Tomorrow's
                <br />
                Leaders, Today
              </h2>
              <blockquote className="text-white/80 leading-relaxed border-l-2 border-accent pl-5 italic text-base mb-4">
                "Education at Satyawati is not merely about grades — it is about shaping the whole person. We hold every student to high standards of discipline, intellectual curiosity, and respect for others. Our teachers are dedicated not just to academic delivery but to mentoring young minds who will go on to contribute positively to society."
              </blockquote>
              <p className="text-white/65 text-sm leading-relaxed">
                Under the guidance of our committed teaching staff and the support of the community, Satyawati Academy continues to grow and improve — ensuring that every child who walks through our doors receives the best education that Kailali has to offer.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AcademicsPage() {
  const [activeLevel, setActiveLevel] = useState<"primary" | "secondary" | "plus2">("primary");

  const levels = {
    primary: {
      title: "Play Group to Grade 5",
      subtitle: "Foundation Years",
      desc: "Our foundational programme builds strong literacy, numeracy, and curiosity in young learners. Classes are structured, engaging, and delivered in English, with careful attention to each child's individual pace.",
      subjects: ["English Language Arts", "Mathematics", "Environmental Science", "Social Studies (Nepali medium)", "Nepali Language", "Computer Basics", "Arts & Craft", "Physical Education"],
      highlight: "English-medium instruction with Nepali language and Social Studies in Nepali.",
    },
    secondary: {
      title: "Grade 6 to Grade 10",
      subtitle: "Secondary Education",
      desc: "The secondary years deepen knowledge across core disciplines while introducing critical thinking, scientific inquiry, and exam preparation. Students are well-prepared for the SEE (Secondary Education Examination).",
      subjects: ["English", "Nepali", "Mathematics", "Science & Technology", "Social Studies", "Health, Population & Environment", "Computer Science", "Optional Maths", "Physical Education"],
      highlight: "Comprehensive SEE preparation with optional Mathematics available for advanced students.",
    },
    plus2: {
      title: "+2 Grade 11 & 12",
      subtitle: "Higher Secondary",
      desc: "Satyawati Academy offers two prestigious +2 streams — Science and Computer Science — equipping students for university entrance examinations, engineering, medicine, and IT careers.",
      subjects: [],
      highlight: "Two streams: +2 Science (PCB/PCM) and +2 Computer Science.",
      streams: [
        {
          name: "+2 Science",
          subjects: ["Physics", "Chemistry", "Biology / Mathematics", "English", "Nepali", "Supplementary Maths"],
          icon: FlaskConical,
          color: "bg-emerald-50 border-emerald-200",
          iconColor: "text-emerald-700",
        },
        {
          name: "+2 Computer Science",
          subjects: ["Computer Science", "Mathematics", "Physics", "English", "Nepali", "Statistics"],
          icon: Monitor,
          color: "bg-blue-50 border-blue-200",
          iconColor: "text-blue-700",
        },
      ],
    },
  };

  const current = levels[activeLevel];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="pt-20">
      <section className="relative py-24 bg-primary overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 50%, #2d9e6b 0%, transparent 60%)`,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Academics</span>
          </div>
          <h1
            className="text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Academic Programme
          </h1>
          <p className="text-white/75 max-w-xl leading-relaxed">
            A structured, progressive curriculum from Play Group to Grade 12 with focused +2 streams in Science and Computer Science.
          </p>
        </div>
      </section>

      {/* Level Tabs */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 mb-10 border border-border rounded-xl p-1.5 bg-card w-fit">
            {(["primary", "secondary", "plus2"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setActiveLevel(level)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeLevel === level
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {level === "primary" ? "Primary (PG–5)" : level === "secondary" ? "Secondary (6–10)" : "+2 Level (11–12)"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                {current.subtitle}
              </div>
              <h2
                className="text-3xl font-bold text-foreground mb-4"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {current.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{current.desc}</p>
              <div className="bg-primary/8 border border-primary/20 rounded-xl p-4 mb-6">
                <div className="flex gap-2 items-start">
                  <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-primary font-medium">{current.highlight}</p>
                </div>
              </div>

              {activeLevel !== "plus2" && current.subjects.length > 0 && (
                <div>
                  <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide mb-3">Subjects Offered</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {current.subjects.map((s) => (
                      <div key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              {activeLevel === "plus2" && "streams" in current && current.streams ? (
                <div className="flex flex-col gap-5">
                  {current.streams.map((stream) => (
                    <div key={stream.name} className={`rounded-2xl p-6 border ${stream.color}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                          <stream.icon className={`w-5 h-5 ${stream.iconColor}`} />
                        </div>
                        <h3 className="font-bold text-foreground text-lg">{stream.name}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {stream.subjects.map((s) => (
                          <div key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50 flex-shrink-0" />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={
                      activeLevel === "primary"
                        ? "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&h=500&fit=crop&auto=format"
                        : "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&h=500&fit=crop&auto=format"
                    }
                    alt={activeLevel === "primary" ? "Young students learning in classroom" : "Secondary students in class"}
                    className="w-full object-cover"
                    style={{ height: 360 }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold text-foreground"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Our Teaching Approach
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: BookOpen, title: "English-Medium Core", desc: "All subjects except Nepali and Social Studies are taught in English, ensuring bilingual confidence." },
              { icon: FlaskConical, title: "Practical & Lab-Based", desc: "Science, Computer, and STEM subjects emphasise hands-on lab work and experimentation." },
              { icon: Users, title: "Mentor-Led Learning", desc: "Small class sizes and dedicated teachers enable meaningful teacher-student engagement." },
              { icon: Trophy, title: "Exam-Focused Results", desc: "Structured revision, mock exams, and academic coaching ensure strong SEE and +2 board outcomes." },
            ].map((m) => (
              <div key={m.title} className="bg-white rounded-2xl p-6 border border-border text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <m.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-base">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FacilitiesPage() {
  const facilities = [
    {
      title: "Science Laboratories",
      icon: FlaskConical,
      img: "https://images.unsplash.com/photo-1532094349884-543559c5bb4b?w=800&h=500&fit=crop&auto=format",
      imgAlt: "Well-equipped science laboratory with equipment",
      desc: "Our science wing houses three dedicated laboratories — Chemistry, Biology, and Physics — each stocked with modern apparatus, reagents, and instruments aligned with the national curriculum.",
      features: ["Chemistry Lab with standard reagents and safety equipment", "Biology Lab with microscopes, specimens, and dissection kits", "Physics Lab with optics, mechanics, and electricity setups", "Safety protocols and trained lab assistants"],
      tag: "3 Labs",
    },
    {
      title: "Computer Laboratories",
      icon: Monitor,
      img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop&auto=format",
      imgAlt: "Modern computer lab with rows of computers",
      desc: "Two well-equipped computer labs provide students with access to modern hardware and software. Labs support both basic digital literacy for younger students and advanced programming for +2 Computer Science students.",
      features: ["2 labs with 30+ computers each", "High-speed broadband internet", "Software for programming, design, and office applications", "Scheduled lab time for all grades"],
      tag: "2 Labs",
    },
    {
      title: "Library",
      icon: Library,
      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=500&fit=crop&auto=format",
      imgAlt: "Quiet school library with bookshelves",
      desc: "Our library is a quiet sanctuary for study and discovery. It holds thousands of volumes across all subject areas, reference books, periodicals, and a growing collection of educational digital resources.",
      features: ["Thousands of subject books and reference materials", "Dedicated reading zones for different age groups", "Periodicals and educational magazines", "Structured reading periods built into the timetable"],
      tag: "5,000+ Books",
    },
    {
      title: "Music Laboratory",
      icon: Music,
      img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=500&fit=crop&auto=format",
      imgAlt: "Music room with instruments",
      desc: "The music lab provides a creative outlet for students, housing instruments including tabla, harmonium, guitar, keyboard, and flute. Music education forms an integral part of our holistic development programme.",
      features: ["Traditional Nepali instruments", "Western instruments: guitar, keyboard, flute", "Regular music classes integrated into the curriculum", "Participation in cultural programmes and events"],
      tag: "Full Studio",
    },
    {
      title: "Playground & Futsal Ground",
      icon: Dumbbell,
      img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop&auto=format",
      imgAlt: "Students playing sports on school ground",
      desc: "Our spacious campus includes a large open playground and a dedicated futsal court. Physical fitness and team sports are central to life at Satyawati Academy.",
      features: ["Professional futsal ground", "Large open playground for cricket, athletics, and games", "Physical Education as a core subject", "Annual Sports Day and inter-house competitions"],
      tag: "Spacious Campus",
    },
    {
      title: "STEM Learning Centre",
      icon: Microscope,
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop&auto=format",
      imgAlt: "Students working on STEM projects",
      desc: "Our STEM Centre bridges the gap between science, technology, engineering, and mathematics through project-based learning. Students design, build, and test real solutions.",
      features: ["Project-based learning approach", "Robotics and maker space components", "Science fairs and STEM competitions", "Integration with +2 Science and Computer streams"],
      tag: "Integrated STEM",
    },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="pt-20">
      <section className="relative py-24 bg-secondary overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{ backgroundImage: `radial-gradient(circle at 30% 60%, #1a5c38 0%, transparent 55%)` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Facilities</span>
          </div>
          <h1
            className="text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            World-Class
            <br />
            Learning Environment
          </h1>
          <p className="text-white/75 max-w-xl leading-relaxed">
            Designed to inspire curiosity and enable hands-on learning — from labs and libraries to sports grounds.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16">
            {facilities.map((f, i) => (
              <div
                key={f.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                    <img
                      src={f.img}
                      alt={f.imgAlt}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ height: 300 }}
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-full"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {f.tag}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2
                    className="text-3xl font-bold text-foreground mb-3"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {f.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-5">{f.desc}</p>
                  <ul className="flex flex-col gap-2">
                    {f.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ChevronRight className="w-3 h-3 text-accent" />
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function GalleryPage() {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [lightbox, setLightbox] = useState<null | typeof GALLERY_ITEMS[0]>(null);

  const filtered = filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === filter);

  const FILTERS: { key: GalleryFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "events", label: "Events" },
    { key: "sports", label: "Sports" },
    { key: "classrooms", label: "Classrooms" },
    { key: "labs", label: "Labs" },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="pt-20">
      <section className="relative py-24 bg-primary overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `radial-gradient(circle at 60% 40%, #2d9e6b 0%, transparent 50%)` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Gallery</span>
          </div>
          <h1
            className="text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Life at Satyawati
          </h1>
          <p className="text-white/75 max-w-xl">
            A glimpse into the vibrant academic, cultural, and sporting life that defines the Satyawati Academy experience.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  filter === f.key
                    ? "bg-primary text-white border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary bg-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <button
                key={item.id}
                className="relative rounded-2xl overflow-hidden group text-left shadow-sm hover:shadow-lg transition-shadow duration-300"
                onClick={() => setLightbox(item)}
              >
                <img
                  src={item.url}
                  alt={item.alt}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105 bg-muted"
                  style={{ height: 240 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-1 block">
                    {item.category}
                  </span>
                  <p className="text-white text-sm font-semibold">{item.label}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-card rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.url.replace("w=600", "w=900").replace("h=400", "h=600")}
              alt={lightbox.alt}
              className="w-full object-cover"
              style={{ maxHeight: 500 }}
            />
            <div className="p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">{lightbox.category}</span>
                <p className="font-semibold text-foreground text-base">{lightbox.label}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="p-2 rounded-lg bg-muted hover:bg-border transition-colors text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="pt-20">
      <section className="relative py-24 bg-secondary overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{ backgroundImage: `radial-gradient(circle at 70% 50%, #1a5c38 0%, transparent 55%)` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Contact</span>
          </div>
          <h1
            className="text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Get in Touch
          </h1>
          <p className="text-white/75 max-w-lg">
            We welcome enquiries about admissions, facilities, or any other matter. Our team is happy to assist.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Info */}
            <div>
              <h2
                className="text-3xl font-bold text-foreground mb-6"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Contact Information
              </h2>
              <div className="flex flex-col gap-5 mb-10">
                {[
                  {
                    icon: MapPin,
                    label: "Address",
                    text: "Ring Road, Attariya, Kailali\nGodawari-2, Sudurpashchim Province\nNepal",
                  },
                  { icon: Phone, label: "Phone", text: "+977-091-551236\n+977-9865709200" },
                  { icon: Mail, label: "Email", text: "info@satyawatiacademy.edu.np\nadmissions@satyawatiacademy.edu.np" },
                ].map((c) => (
                  <div key={c.label} className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                        {c.label}
                      </div>
                      <div className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                        {c.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-muted h-64 flex items-center justify-center relative">
                <iframe
                  title="Satyawati Academy Kailali Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3514.0!2d80.5935!3d28.8058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQ4JzIwLjkiTiA4MMKwMzUnMzYuNiJF!5e0!3m2!1sen!2snp!4v1000000000000!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
                <div className="absolute bottom-3 right-3">
                  <a
                    href="https://maps.google.com/?q=Attariya,Kailali,Nepal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 bg-white shadow text-xs font-semibold text-primary rounded-lg hover:bg-muted transition-colors"
                  >
                    Open in Maps
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mb-4">
                    <Send className="w-7 h-7 text-accent" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-foreground mb-2"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Message Received
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Thank you for reaching out. Our team will respond within 1-2 business days.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="mt-6 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-accent transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2
                    className="text-2xl font-bold text-foreground mb-1"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Send an Enquiry
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    Fill in the form below and we will get back to you promptly.
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Hari Prasad Sharma"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+977-98XXXXXXXX"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                        Subject
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="admissions">Admissions Enquiry</option>
                        <option value="academics">Academic Information</option>
                        <option value="facilities">Facilities Tour</option>
                        <option value="fees">Fee Structure</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                        Message *
                      </label>
                      <textarea
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        placeholder="Tell us how we can help..."
                        className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-primary hover:bg-accent text-white font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 group"
                    >
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer
      className="bg-foreground text-white"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm" style={{ fontFamily: "'Fraunces', serif" }}>
                  Satyawati Academy
                </div>
                <div className="text-xs text-white/50">Kailali, Nepal</div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Established 2063 B.S. · Providing quality education from Play Group to Grade 12 in Attariya, Kailali.
            </p>
            <p className="text-xs text-white/40 italic" style={{ fontFamily: "'Fraunces', serif" }}>
              "To produce quality and civilised people"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Quick Links</div>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.page}
                  onClick={() => setPage(link.page)}
                  className="text-sm text-white/65 hover:text-white transition-colors text-left w-fit"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Programmes */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Programmes</div>
            <div className="flex flex-col gap-2 text-sm text-white/65">
              {["Play Group & Nursery", "Grade 1 – Grade 5", "Grade 6 – Grade 10", "+2 Science Stream", "+2 Computer Science"].map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Location</div>
            <div className="flex flex-col gap-3 text-sm text-white/65">
              <div className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>Ring Road, Attariya<br />Godawari-2, Kailali<br />Sudurpashchim, Nepal</span>
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <span>+977-091-551236</span>
              </div>
              <div className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span>info@satyawatiacademy.edu.np</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © 2083 B.S. Satyawati Academy Kailali. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Best school in Kailali · Best school in Attariya · +2 Science Nepal
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar activePage={page} setPage={setPage} />

      <main>
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "about" && <AboutPage />}
        {page === "academics" && <AcademicsPage />}
        {page === "facilities" && <FacilitiesPage />}
        {page === "gallery" && <GalleryPage />}
        {page === "contact" && <ContactPage />}
      </main>

      <Footer setPage={setPage} />
    </div>
  );
}
