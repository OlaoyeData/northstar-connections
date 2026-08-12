import React, { useState, useMemo, useEffect, useRef } from "react";
import { Menu, X, ShieldCheck, Compass, Sparkles, Mail, Globe2, ArrowRight, Check, Crown } from "lucide-react";

/* ------------------------------------------------------------------
   NorthStar Connections
   A faith-guided matchmaking service for mature Christian singles.

   Design language: midnight-navy sky, brushed gold, high-contrast
   serif display (Playfair Display) paired with a quiet grotesque
   (Inter). Signature motif: an illustrated compass-star constellation
   standing in for stock "couple" photography — literalizes
   "guided by faith, connected with purpose" without relying on
   generic stock imagery. Fonts are loaded via <link> in index.html.
------------------------------------------------------------------- */

const NAVY_950 = "#080E1F";

/* ---------------------------- helpers ---------------------------- */

function useStars(count, seed = 1) {
  return useMemo(() => {
    let s = seed;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: rand() * 100,
      left: rand() * 100,
      size: rand() * 1.6 + 0.6,
      delay: rand() * 6,
      dur: rand() * 3 + 3,
      opacity: rand() * 0.5 + 0.35,
    }));
  }, [count, seed]);
}

function StarField({ count = 90, seed = 1, className = "" }) {
  const stars = useStars(count, seed);
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white motion-safe:animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

/* Logo mark: the brand's compass-star PNG asset. */
function StarMark({ size = 28 }) {
  return (
    <img
      src="/logo-mark.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}

/* Large, faint compass-star watermark used behind the hero + guiding
   principles panel — the page's signature illustration, standing in
   for photography. True 8-point compass star: 4 long cardinal spikes,
   4 shorter diagonal spikes, matching the brand logo's proportions. */
function ConstellationMark({ className = "", spin = true }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={`${className} ${spin ? "motion-safe:animate-spin-slow" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="constGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C468" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#E8C468" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <g stroke="url(#constGrad)" strokeWidth="1" fill="none">
        <path d="M200 10 L256.57 143.43 L390 200 L256.57 256.57 L200 390 L143.43 256.57 L10 200 L143.43 143.43 Z" />
        <path d="M200 90 L232.5 167.5 L310 200 L232.5 232.5 L200 310 L167.5 232.5 L90 200 L167.5 167.5 Z" opacity="0.6" />
        <circle cx="200" cy="200" r="150" strokeDasharray="2 8" opacity="0.4" />
      </g>
      {[
        [200, 10], [390, 200], [200, 390], [10, 200],
        [256.57, 143.43], [256.57, 256.57], [143.43, 256.57], [143.43, 143.43],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i < 4 ? 3 : 2} fill="#F4D98A" />
      ))}
    </svg>
  );
}

/* Silhouette skyline used at the base of the hero, in place of a
   photographic backdrop. */
function Skyline({ className = "" }) {
  return (
    <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M0,140 L0,80 L120,55 L220,90 L340,40 L470,95 L600,60 L730,100 L860,50 L1000,95 L1140,65 L1280,100 L1440,70 L1440,140 Z"
        fill={NAVY_950}
      />
    </svg>
  );
}

function Eyebrow({ children, dark }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-px w-8 ${dark ? "bg-[#E8C468]/60" : "bg-[#B8912A]/60"}`} />
      <span
        className={`text-[11px] font-medium uppercase tracking-[0.25em] ${
          dark ? "text-[#E8C468]" : "text-[#96731A]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/* ------------------------------ nav ------------------------------ */

function NavBar({ page, setPage, transparent }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !transparent || scrolled;

  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "how", label: "How It Works" },
    { id: "membership", label: "Membership" },
  ];
  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        solid ? "bg-[#0E1A38]/95 backdrop-blur border-b border-white/5" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C468] rounded"
        >
          <StarMark size={26} id="nav" />
          <span className="font-serif text-lg tracking-wide text-white">NorthStar Connections</span>
        </button>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className={`text-[13px] font-medium uppercase tracking-[0.12em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C468] rounded ${
                page === l.id ? "text-[#E8C468]" : "text-white/75 hover:text-white"
              }`}
            >
              {l.label}
              {page === l.id && <span className="mt-1 block h-px bg-[#E8C468]" />}
            </button>
          ))}
          <button
            onClick={() => setPage("apply")}
            className="rounded-sm bg-gradient-to-b from-[#E8C468] to-[#C9A227] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1B1400] transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Apply Now
          </button>
        </div>

        <button
          className="text-white md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C468] rounded"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#0E1A38] px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  setPage(l.id);
                  setOpen(false);
                }}
                className={`text-left text-sm font-medium uppercase tracking-[0.12em] ${
                  page === l.id ? "text-[#E8C468]" : "text-white/80"
                }`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => {
                setPage("apply");
                setOpen(false);
              }}
              className="mt-2 rounded-sm bg-gradient-to-b from-[#E8C468] to-[#C9A227] px-5 py-2.5 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1B1400]"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ----------------------------- footer ----------------------------- */

function Footer({ setPage }) {
  return (
    <footer className="bg-[#050810] px-6 py-16 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <button onClick={() => setPage("home")} className="flex items-center gap-2.5 focus:outline-none">
            <StarMark size={24} id="foot" />
            <span className="font-serif text-lg text-[#DCE3F5]">NorthStar Connections</span>
          </button>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
            © 2026 NorthStar Connections. Guided by faith. Connected with purpose.
          </p>
          <div className="mt-5 flex gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50">
              <Globe2 size={15} />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50">
              <Mail size={15} />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm text-white/45 md:items-center">
          <span className="mb-1 text-[11px] uppercase tracking-[0.2em] text-white/25">Legal</span>
          <span className="cursor-pointer hover:text-white/70">Privacy Policy</span>
          <span className="cursor-pointer hover:text-white/70">Terms of Service</span>
        </div>

        <div className="flex flex-col gap-3 text-sm text-white/45 md:items-end">
          <span className="mb-1 text-[11px] uppercase tracking-[0.2em] text-white/25">Support</span>
          <span className="cursor-pointer hover:text-white/70">Contact Us</span>
          <span className="cursor-pointer hover:text-white/70">FAQ</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------ home ------------------------------ */

function DividerStar() {
  return (
    <div className="mx-auto flex max-w-xs items-center gap-4 md:max-w-sm">
      <span className="h-px flex-1 bg-current opacity-20" />
      <StarMark size={16} id={`div-${Math.random()}`} />
      <span className="h-px flex-1 bg-current opacity-20" />
    </div>
  );
}

function Hero({ setPage }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1530] via-[#0E1A38] to-[#060A16] px-6 pb-28 pt-20 text-center md:px-10 md:pt-28">
      <StarField count={110} seed={7} />
      <ConstellationMark
        className="pointer-events-none absolute -right-20 top-10 h-72 w-72 opacity-30 sm:-right-32 sm:h-[420px] sm:w-[420px] md:h-[520px] md:w-[520px] md:opacity-40"
        spin
      />
      <ConstellationMark
        className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 opacity-20 sm:-left-40 sm:h-[420px] sm:w-[420px]"
        spin={false}
      />

      <div className="relative mx-auto max-w-3xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#E8C468]/80">
          Welcome to NorthStar Connections
        </p>
        <h1 className="mt-6 font-serif text-4xl leading-[1.15] text-white sm:text-5xl md:text-6xl">
          Meaningful Relationships.
          <br />
          <span className="italic font-medium text-[#E8C468]">Intentional Connections.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-[13px] font-medium uppercase tracking-[0.22em] text-white/55">
          Guided by faith. Connected with purpose.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => setPage("apply")}
            className="w-full rounded-sm bg-gradient-to-b from-[#E8C468] to-[#C9A227] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1B1400] transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
          >
            Ready to Join
          </button>
          <button
            onClick={() => setPage("how")}
            className="w-full rounded-sm border border-white/30 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/90 transition-colors hover:border-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C468] sm:w-auto"
          >
            How It Works
          </button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <Skyline className="h-24 w-full opacity-80 md:h-32" />
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="bg-[#FBF9F4] px-6 py-24 md:px-10">
      <DividerStar />
      <div className="mx-auto mt-16 grid max-w-6xl gap-12 md:grid-cols-[0.85fr,1.15fr] md:gap-20">
        <div>
          <Eyebrow>Our Why</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-[#0E1A38] md:text-4xl">
            Why NorthStar Connections?
          </h2>
          <span className="mt-5 block h-[3px] w-14 bg-[#C9A227]" />
        </div>
        <div className="space-y-5 text-[15px] leading-relaxed text-[#3C4356]">
          <p>
            In a world of fleeting interactions and superficial swiping, finding a partner who
            shares your deepest values can feel isolating. Many mature Christian singles struggle
            to find authentic connections in environments not designed for intentionality.
          </p>
          <p>
            We believe your journey should be guided by faith and purpose, surrounded by a
            community that honors your character and commitment to building a lasting, meaningful
            relationship.
          </p>
        </div>
      </div>
    </section>
  );
}

function principleIcon(name) {
  const cls = "h-5 w-5 text-[#0E1A38]";
  if (name === "faith") return <Sparkles className={cls} />;
  if (name === "character") return <ShieldCheck className={cls} />;
  return <Compass className={cls} />;
}

const PRINCIPLES = [
  {
    key: "faith",
    title: "Faith as the Foundation",
    body: "Connections rooted in shared beliefs, ensuring your spiritual journey is aligned and nurtured together.",
  },
  {
    key: "character",
    title: "Character over Convenience",
    body: "A vetted community where integrity and depth are prioritized above superficial metrics.",
  },
  {
    key: "intentionality",
    title: "Intentionality in Every Step",
    body: "Curated experiences and guided processes designed to foster genuine, lasting relationships.",
  },
];

function GuidingPrinciples() {
  return (
    <section className="relative overflow-hidden bg-[#0E1A38] px-6 py-24 md:px-10">
      <StarField count={50} seed={11} className="opacity-60" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-sm border border-[#E8C468]/25">
          <img
            src="/man.jfif"
            alt="Man standing with his arm around a woman, looking at the horizon"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1430] via-[#0A1430]/10 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 border-t border-[#E8C468]/30 pt-4 text-center">
            <p className="font-serif italic text-sm text-[#F5EDD6]">Two lights, one alignment.</p>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl text-white md:text-[2.5rem]">Our Guiding Principles</h2>
          <div className="mt-9 space-y-8">
            {PRINCIPLES.map((p, i) => (
              <div key={p.key} className={`flex gap-5 ${i > 0 ? "border-t border-white/10 pt-8" : ""}`}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#E8C468] to-[#C9A227]">
                  {principleIcon(p.key)}
                </span>
                <div>
                  <h3 className="font-serif text-lg text-white">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const JOURNEY = [
  {
    n: "01",
    title: "Apply",
    body: "Submit your application detailing your faith, values, and what you seek in a partner. We prioritize depth to ensure an aligned community.",
  },
  {
    n: "02",
    title: "Review",
    body: "Our dedicated team personally reviews every application, conducting interviews to verify character and readiness for intentional connection.",
  },
  {
    n: "03",
    title: "Connect",
    body: "Enter a curated space where you can engage meaningfully with others who share your commitment to a faith-guided relationship.",
  },
];

function Journey({ setPage }) {
  return (
    <section className="bg-[#FBF9F4] px-6 py-24 md:px-10">
      <DividerStar />
      <div className="mx-auto mt-14 max-w-2xl text-center">
        <h2 className="font-serif text-3xl text-[#C9A227] md:text-4xl">The Journey to Connection</h2>
      </div>

      <div className="mx-auto mt-16 max-w-2xl">
        {JOURNEY.map((step, i) => (
          <div key={step.n} className="relative flex gap-6 pb-14 last:pb-0">
            {i < JOURNEY.length - 1 && (
              <span className="absolute left-[23px] top-12 h-full w-px bg-[#0E1A38]/15" />
            )}
            <span className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#0E1A38] font-serif text-sm text-[#E8C468]">
              {step.n}
            </span>
            <div>
              <h3 className="font-serif text-xl text-[#0E1A38]">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#5B6172]">{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 flex justify-center px-4 sm:px-0">
        <button
          onClick={() => setPage("apply")}
          className="w-full rounded-sm bg-[#0E1A38] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E1A38] sm:w-auto"
        >
          Ready to Join
        </button>
      </div>
    </section>
  );
}

function HomePage({ setPage }) {
  return (
    <>
      <Hero setPage={setPage} />
      <WhySection />
      <GuidingPrinciples />
      <Journey setPage={setPage} />
    </>
  );
}

/* ------------------------------ about ------------------------------ */

const ABOUT_PRINCIPLES = [
  {
    key: "faith",
    title: "Faith",
    body: "Rooted in shared beliefs, honoring a foundation that transcends the temporal.",
  },
  {
    key: "character",
    title: "Character",
    body: "Valuing integrity, kindness, and the depth of an individual over surface appeal.",
  },
  {
    key: "intentionality",
    title: "Intentionality",
    body: "Approaching every connection with purpose, aiming for a lasting, meaningful bond.",
  },
];

function principleIconOutline(name) {
  const cls = "h-5 w-5 text-[#E8C468]";
  if (name === "faith") return <Sparkles className={cls} />;
  if (name === "character") return <ShieldCheck className={cls} />;
  return <Compass className={cls} />;
}

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#050810] px-6 pb-24 pt-20 md:px-10">
        <StarField count={70} seed={3} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
          <div>
            <h1 className="font-serif text-4xl leading-tight text-white md:text-[2.75rem]">
              Why NorthStar Connections?
            </h1>
            <div className="mt-5 flex items-center gap-4">
              <span className="h-px w-12 bg-[#E8C468]/50" />
              <StarMark size={14} id="about-div" />
              <span className="h-px w-12 bg-[#E8C468]/50" />
            </div>
            <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-white/55">
              <p>
                In a world of fleeting interactions and superficial swiping, finding a partner who
                shares your deepest values can feel isolating. Many mature Christian singles
                struggle to find authentic connections in environments not designed for
                intentionality.
              </p>
              <p>
                We believe your journey should be guided by faith and purpose, surrounded by a
                community that honors your character and commitment to building a lasting,
                meaningful relationship.
              </p>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm border border-[#E8C468]/20">
            <img
              src="/hand.jfif"
              alt="Couple together"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/50 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="bg-[#050810] px-6 pb-28 md:px-10">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-serif text-3xl text-[#E8C468] md:text-4xl">Our Guiding Principles</h2>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {ABOUT_PRINCIPLES.map((p) => (
              <div
                key={p.key}
                className="rounded-sm border border-white/10 bg-[#0E1A38] p-8 text-left transition-colors hover:border-[#E8C468]/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8C468]/40">
                  {principleIconOutline(p.key)}
                </span>
                <h3 className="mt-6 font-serif text-xl text-white">{p.title}</h3>
                <span className="mt-2 block h-px w-8 bg-[#E8C468]/50" />
                <p className="mt-3 text-sm leading-relaxed text-white/50">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* --------------------------- how it works --------------------------- */

function HowPage({ setPage }) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1530] to-[#0E1A38] px-6 py-24 text-center md:px-10">
        <StarField count={60} seed={5} />
        <div className="relative mx-auto max-w-2xl">
          <Eyebrow dark>Process</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl text-white md:text-5xl">How It Works</h1>
          <p className="mt-5 text-[15px] leading-relaxed text-white/55">
            Three deliberate steps carry every member from application to genuine, faith-aligned
            connection — no swiping, no guesswork.
          </p>
        </div>
      </section>

      <section className="bg-[#FBF9F4] px-6 py-24 md:px-10">
        <div className="mx-auto max-w-2xl">
          {JOURNEY.map((step, i) => (
            <div key={step.n} className="relative flex gap-6 pb-14 last:pb-0">
              {i < JOURNEY.length - 1 && (
                <span className="absolute left-[23px] top-12 h-full w-px bg-[#0E1A38]/15" />
              )}
              <span className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#0E1A38] font-serif text-sm text-[#E8C468]">
                {step.n}
              </span>
              <div>
                <h3 className="font-serif text-xl text-[#0E1A38]">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#5B6172]">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0E1A38] px-6 py-20 text-center md:px-10">
        <StarField count={40} seed={9} />
        <div className="relative mx-auto max-w-xl">
          <h2 className="font-serif text-2xl text-white md:text-3xl">Ready for the next step?</h2>
          <p className="mt-3 text-sm text-white/50">
            Choose the membership path that matches where you are in your journey.
          </p>
          <button
            onClick={() => setPage("membership")}
            className="mt-8 w-full rounded-sm bg-gradient-to-b from-[#E8C468] to-[#C9A227] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1B1400] transition-transform hover:scale-[1.03] sm:w-auto"
          >
            View Membership
          </button>
        </div>
      </section>
    </>
  );
}

/* ---------------------------- membership ---------------------------- */

const PLANS = [
  {
    key: "founding",
    name: "Founding Member",
    price: "$19.99",
    period: "/month",
    badge: "Early Access",
    features: [
      "Locked-in founding member rate",
      "Access to all launch events",
      "Priority access to future features",
      "Founding Member recognition",
    ],
    cta: "Become a Founder",
    style: "solid",
  },
  {
    key: "community",
    name: "NorthStar Community",
    price: "$24.99",
    period: "/month",
    features: [
      "Private online community",
      "Monthly virtual gatherings",
      "Relationship and faith resources",
      "Access to member directory",
    ],
    cta: "Join Community",
    style: "outline",
  },
  {
    key: "plus",
    name: "NorthStar Plus",
    price: "$69.99",
    period: "/month",
    features: [
      "Everything in Community",
      "Priority profile visibility",
      "Quarterly coaching sessions",
      "Personalized introduction",
    ],
    cta: "Upgrade to Plus",
    style: "outline",
  },
  {
    key: "concierge",
    name: "NorthStar Concierge",
    price: "$1,500",
    period: "– $5,000",
    note: "Bespoke service, tailored entirely to you.",
    features: [
      "Personal, in-depth interview",
      "Detailed compatibility assessment",
      "Highly curated, vetted introductions",
    ],
    cta: "Inquire Now",
    style: "featured",
  },
];

function PlanCard({ plan, onApply }) {
  const featured = plan.style === "featured";
  return (
    <div
      className={`flex flex-col rounded-sm border p-6 sm:p-8 ${
        featured
          ? "border-[#E8C468] bg-[#0E1A38] shadow-[0_0_0_1px_rgba(232,196,104,0.15)]"
          : "border-white/10 bg-[#0E1A38]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-xl text-white">{plan.name}</h3>
        {plan.badge && (
          <span className="shrink-0 rounded-sm bg-gradient-to-b from-[#E8C468] to-[#C9A227] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#1B1400]">
            {plan.badge}
          </span>
        )}
        {featured && <Crown className="h-5 w-5 shrink-0 text-[#E8C468]" />}
      </div>

      <div className="mt-5 flex flex-wrap items-baseline gap-1">
        <span className="font-serif text-4xl text-white">{plan.price}</span>
        <span className="text-sm text-white/50">{plan.period}</span>
      </div>
      {plan.note && <p className="mt-1 text-xs italic text-white/40">{plan.note}</p>}

      <ul className="mt-7 flex-1 space-y-3.5 border-t border-white/10 pt-7">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E8C468]" />
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={onApply}
        className={`mt-8 rounded-sm px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C468] ${
          featured
            ? "bg-gradient-to-b from-[#E8C468] to-[#C9A227] text-[#1B1400] flex items-center justify-center gap-2"
            : "border border-white/25 text-white hover:bg-white/5"
        }`}
      >
        {plan.cta}
        {featured && <ArrowRight className="h-4 w-4" />}
      </button>
    </div>
  );
}

function MembershipPage({ setPage }) {
  return (
    <section className="relative overflow-hidden bg-[#0A1430] px-6 py-24 md:px-10">
      <StarField count={70} seed={13} />
      <div className="relative mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl text-[#E8C468] md:text-5xl">Membership</h1>
        <p className="mt-5 text-[15px] leading-relaxed text-white/55">
          Choose the path that aligns with your intentional journey.
        </p>
        <div className="mt-8">
          <DividerStar />
        </div>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2">
        {PLANS.map((p) => (
          <PlanCard key={p.key} plan={p} onApply={() => setPage("apply")} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ apply ------------------------------ */

function ApplyPage() {
  useEffect(() => {
    const src = "https://tally.so/widgets/embed.js";

    const hydrateEmbeds = () => {
      if (typeof window.Tally !== "undefined") {
        window.Tally.loadEmbeds();
      } else {
        document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((iframe) => {
          iframe.src = iframe.dataset.tallySrc;
        });
      }
    };

    if (typeof window.Tally !== "undefined") {
      hydrateEmbeds();
    } else if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script");
      script.src = src;
      script.onload = hydrateEmbeds;
      script.onerror = hydrateEmbeds;
      document.body.appendChild(script);
    } else {
      hydrateEmbeds();
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0A1430] px-6 py-24 md:px-10">
      <StarField count={60} seed={17} />
      <div className="relative mx-auto max-w-2xl text-center">
        <Eyebrow dark>Membership Application</Eyebrow>
        <h1 className="mt-5 font-serif text-4xl text-white md:text-5xl">Apply to Join</h1>
        <p className="mt-5 text-[15px] leading-relaxed text-white/55">
          Tell us about your faith, your values, and what you're looking for. Our team personally
          reviews every application.
        </p>
      </div>

      <div className="relative mx-auto mt-14 max-w-3xl overflow-hidden rounded-sm bg-white">
        <iframe
          data-tally-src="https://tally.so/embed/PdrzjV?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height="3722"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="NorthStar Connections Membership Application"
          className="w-full"
        />
      </div>
    </section>
  );
}

/* ------------------------------- app ------------------------------- */

export default function App() {
  const [page, setPage] = useState("home");
  const topRef = useRef(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [page]);

  const isHero = page === "home" || page === "how" || page === "membership" || page === "apply";

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0E1A38] font-sans text-white antialiased">
      <style>{`
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }
        .font-sans { font-family: 'Inter', system-ui, sans-serif; }
        @keyframes twinkle { 0%,100% { opacity: 0.2; } 50% { opacity: 1; } }
        .animate-twinkle { animation-name: twinkle; animation-iteration-count: infinite; animation-timing-function: ease-in-out; }
        @keyframes spin-slow { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        .animate-spin-slow { animation: spin-slow 90s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-twinkle, .animate-spin-slow { animation: none !important; }
        }
      `}</style>

      <div ref={topRef} />
      <NavBar page={page} setPage={setPage} transparent={isHero} />

      {page === "home" && <HomePage setPage={setPage} />}
      {page === "about" && <AboutPage />}
      {page === "how" && <HowPage setPage={setPage} />}
      {page === "membership" && <MembershipPage setPage={setPage} />}
      {page === "apply" && <ApplyPage />}

      <Footer setPage={setPage} />
    </div>
  );
}