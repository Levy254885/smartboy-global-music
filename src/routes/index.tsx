import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: SmartboyHome,
});

/* ------------------------------ DATA ------------------------------ */

const NAV = [
  { label: "About", href: "#about" },
  { label: "Leadership", href: "#leadership" },
  { label: "Roster", href: "#roster" },
  { label: "Services", href: "#services" },
  { label: "Releases", href: "#releases" },
  { label: "Partners", href: "#partners" },
  { label: "Contact", href: "#contact" },
];

const ARTISTS = [
  { name: "Dalla Stains", tag: "Singer · Songwriter", genre: "Afro-Soul · R&B · Nairobi", initials: "DS", accent: "var(--cyan)" },
  { name: "Nova Flow Boyz", tag: "Group · 4 Members", genre: "Hip-Hop · Trap · Nairobi", initials: "NF", accent: "var(--pink)" },
  { name: "50Boyz", tag: "Collective · Street", genre: "Gengetone · Drill · Kenya", initials: "5B", accent: "var(--yellow)" },
  { name: "Mr Handsome KE", tag: "Solo Artist", genre: "Afro-pop · Dance · Kenya", initials: "MH", accent: "var(--cyan)" },
];

const STATS = [
  { n: 4, suffix: "", label: "Signed Artists" },
  { n: 50, suffix: "+", label: "Releases" },
  { n: 12, suffix: "+", label: "Brand Deals" },
  { n: 3, suffix: "", label: "Countries" },
];

const SERVICES = [
  { name: "Recording & Production", desc: "Studio access, producer matchmaking, and full post-production for chart-ready releases." },
  { name: "Talent Management", desc: "Day-to-day career strategy, brand identity, and personal development for every artist." },
  { name: "Digital Distribution", desc: "Global distribution across Spotify, Apple Music, Audiomack, Boomplay and beyond." },
  { name: "PR & Media", desc: "Press, interviews, playlisting, and editorial placements across East Africa and diaspora media." },
  { name: "Brand Partnerships", desc: "Connecting our artists with brands that align with their identity and audience." },
  { name: "Touring & Events", desc: "Booking, logistics, and performance strategy for live shows and festival appearances." },
  { name: "Publishing & Sync", desc: "Songwriter representation, sync licensing, and royalty administration worldwide." },
  { name: "Content Production", desc: "Music videos, visualisers, BTS, and editorial campaigns built for the algorithm and the archive." },
];

const RELEASES = [
  { n: "01", title: "Love in Nairobi", artist: "Dalla Stains", meta: "Single · 2024", badge: "New" },
  { n: "02", title: "Flow Season Vol. 2", artist: "Nova Flow Boyz", meta: "EP · 2024", badge: "New" },
  { n: "03", title: "Fifty Deep", artist: "50Boyz", meta: "Album · 2024", badge: "Featured" },
  { n: "04", title: "Nairobi Boy Anthem", artist: "Mr Handsome KE", meta: "Single · 2023", badge: "Gold" },
  { n: "05", title: "Smartboy Compilation", artist: "Various Artists", meta: "Album · 2023", badge: "Label" },
];

import actsLogo from "../assets/acts-music-group.jpg.asset.json";
import warnerLogo from "../assets/warner-music-africa.jpg.asset.json";
import virginLogo from "../assets/virgin-music-group.jpg.asset.json";
import smartboyLogo from "../assets/smartboy-logo-v2.png.asset.json";

const PARTNERS = [
  { name: "ACTS Music Group", role: "Distribution · Publishing", logo: actsLogo.url },
  { name: "Warner Music Africa", role: "Global Label Partner", logo: warnerLogo.url },
  { name: "Virgin Music Group", role: "International Distribution", logo: virginLogo.url },
];

// WhatsApp destination for contact form submissions
const WHATSAPP_NUMBER = "254700000000"; // international format, no +

const SERVICE_ICONS: Record<string, string> = {
  "Recording & Production": "M9 18V5l12-2v13M9 9l12-2M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm15-3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  "Talent Management": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  "Digital Distribution": "M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07",
  "PR & Media": "M3 11l18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6",
  "Brand Partnerships": "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  "Touring & Events": "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zm-9 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  "Publishing & Sync": "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  "Content Production": "M23 7l-7 5 7 5V7zM14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z",
};

/* ----------------------------- HELPERS ----------------------------- */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setV(Math.floor((1 - Math.pow(1 - p, 3)) * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* ------------------------------ TICKER ------------------------------ */

function Ticker({
  items,
  bg,
  color,
  reverse = false,
}: {
  items: string[];
  bg: string;
  color: string;
  reverse?: boolean;
}) {
  const row = (
    <div className="flex shrink-0 items-center gap-10 px-5">
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-10 whitespace-nowrap headline text-[clamp(2rem,6vw,4rem)]">
          {t}
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden py-4" style={{ background: bg, color }}>
      <div className="flex w-max" style={{ animation: `${reverse ? "marquee-rev" : "marquee"} 28s linear infinite` }}>
        {row}{row}
      </div>
    </div>
  );
}

/* ------------------------------ NAV ------------------------------ */

function Logo({ dark = false }: { dark?: boolean }) {
  // logo is white-on-transparent; invert when on light background
  return (
    <img
      src={smartboyLogo.url}
      alt="Smartboy Management — East Africa's Premier Record Label"
      className="h-8 md:h-10 w-auto select-none"
      style={{ filter: dark ? "invert(1)" : "none" }}
      width={320}
      height={80}
      draggable={false}
    />
  );
}

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="flex h-9 w-9 items-center justify-center rounded-full border transition hover:scale-105"
      style={{
        borderColor: dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)",
        background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
        color: "var(--foreground)",
      }}
    >
      {dark ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
      )}
    </button>
  );
}

function MenuButton({ open, onClick, dark }: { open: boolean; onClick: () => void; dark: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label="Menu"
      className="relative flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border xl:hidden"
      style={{
        borderColor: dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)",
        background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
      }}
    >
      <span
        className="block h-[1.5px] w-4 transition-all"
        style={{ background: "var(--foreground)", transform: open ? "rotate(45deg) translate(3px,4px)" : "none" }}
      />
      <span
        className="block h-[1.5px] w-4 transition-all"
        style={{ background: "var(--foreground)", transform: open ? "rotate(-45deg) translate(3px,-4px)" : "none" }}
      />
    </button>
  );
}

/* ============================== PAGE ============================== */

function SmartboyHome() {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);
  useReveal();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("sbm-theme");
    if (saved === "light") setLight(true);
  }, []);
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("light", light);
    localStorage.setItem("sbm-theme", light ? "light" : "dark");
  }, [light]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = !light;

  return (
    <div className="min-h-screen">
      {/* ============= NAV ============= */}
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? (dark ? "rgba(8,8,10,0.78)" : "rgba(255,255,255,0.82)")
            : "transparent",
          backdropFilter: scrolled ? "saturate(140%) blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(140%) blur(18px)" : "none",
          borderBottom: scrolled ? `1px solid var(--border)` : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 md:px-8 md:py-4">
          <a href="#home" aria-label="Smartboy Management home" className="flex items-center">
            <Logo dark={!dark} />
          </a>

          <nav
            className="hidden lg:flex items-center gap-1 rounded-full border px-1.5 py-1.5"
            style={{
              borderColor: dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)",
              background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            }}
          >
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                style={{ color: "var(--foreground)" }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition hover:opacity-90"
              style={{ background: "var(--cyan)", color: "#000" }}
            >
              Work With Us <span aria-hidden>→</span>
            </a>
            <ThemeToggle dark={dark} onToggle={() => setLight(!light)} />
            <MenuButton open={menuOpen} onClick={() => setMenuOpen((o) => !o)} dark={dark} />
          </div>
        </div>
      </header>

      {/* ============= MOBILE / FULL MENU ============= */}
      <div
        className="fixed inset-0 z-40 transition-all duration-500 lg:hidden"
        style={{
          background: dark ? "rgba(8,8,10,0.96)" : "rgba(255,255,255,0.98)",
          backdropFilter: "blur(20px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <div className="flex h-full flex-col justify-center px-7 md:px-14">
          <ul className="space-y-3 md:space-y-4">
            {NAV.map((l, i) => (
              <li key={l.href} className="overflow-hidden">
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="headline block text-[clamp(2.25rem,8vw,4.5rem)] leading-[1.05] transition-all hover:translate-x-2 hover:text-[var(--cyan)]"
                  style={{
                    transitionDelay: menuOpen ? `${i * 50}ms` : "0ms",
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateY(0)" : "translateY(28px)",
                    transitionProperty: "opacity, transform, color",
                  }}
                >
                  <span className="mr-3 align-middle text-[0.45em] opacity-40">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-10 inline-flex w-fit items-center gap-3 rounded-full px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em]"
            style={{ background: "var(--cyan)", color: "#000" }}
          >
            Work With Us →
          </a>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.2em] opacity-60">
            <span>Nairobi · Est. 2020</span>
            <span>hello@smartboymgmt.co</span>
            <span>+254 700 000 000</span>
          </div>
        </div>
      </div>

      {/* ============= HERO ============= */}
      <section id="home" className="relative min-h-[92vh] overflow-hidden pt-28 md:pt-36">
        <BackgroundLights />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-8">
          <p className="mb-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: "var(--cyan)" }}>
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--cyan)" }} />
            Nairobi · Est. 2020
          </p>
          <h1 className="headline text-[clamp(2.75rem,9vw,7.5rem)] leading-[0.95] tracking-[-0.02em]">
            <RiseLines lines={["SMARTBOY", "MANAGEMENT."]} />
          </h1>
          <p className="mt-7 max-w-2xl text-[clamp(1rem,1.4vw,1.25rem)] font-medium leading-snug" style={{ color: "var(--foreground)" }}>
            We're here to turn{" "}
            <span style={{ color: "var(--cyan)" }}>dreams</span> into{" "}
            <span style={{ color: "var(--cyan)" }}>stardom</span> and{" "}
            <span style={{ color: "var(--pink)" }}>audiences</span> into{" "}
            <span style={{ color: "var(--pink)" }}>fans.</span>
          </p>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed opacity-70">
            SMARTBOY MANAGEMENT is East Africa's premier record label and talent management house —
            shaping the voices that define a generation.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#roster"
              className="group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] transition"
              style={{ background: "var(--cyan)", color: "#000" }}
            >
              Our Artists
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="text-[12px] font-bold uppercase tracking-[0.22em] underline underline-offset-8"
            >
              Submit a Demo
            </a>
          </div>

          <div className="mt-20 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] opacity-50">
            <span className="h-px w-10 bg-current" /> Scroll
          </div>
        </div>
      </section>


      {/* ============= TICKERS ============= */}
      <Ticker bg="var(--cyan)" color="#000" items={["RECORDING ARTISTS", "RECORDING ARTISTS", "RECORDING ARTISTS"]} />
      <Ticker bg="var(--pink)" color="#000" reverse items={["SONGWRITERS", "SONGWRITERS", "SONGWRITERS"]} />

      {/* ============= ROSTER ============= */}
      <section id="roster" className="px-5 py-24 md:px-8 md:py-32" style={{ background: "var(--ink)" }}>
        <div className="mx-auto max-w-[1400px]">
          <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--yellow)" }}>
                The Roster
              </p>
              <h2 className="headline text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]">
                BUILDING <span style={{ color: "var(--cyan)" }}>STARS</span>.
              </h2>
            </div>
            <a href="#contact" className="text-[12px] font-bold uppercase tracking-[0.22em] underline underline-offset-8">
              Join the roster →
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ARTISTS.map((a) => (
              <ArtistCard key={a.name} {...a} />
            ))}
          </div>
        </div>
      </section>

      <Ticker bg="var(--yellow)" color="#000" items={["BOOKINGS", "BOOKINGS", "BOOKINGS", "MANAGEMENT", "MANAGEMENT"]} />

      {/* ============= ABOUT ============= */}
      <section id="about" className="px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-12">
          <div className="reveal md:col-span-7">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--cyan)" }}>
              Our Story
            </p>
            <h2 className="headline text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]">
              THE SOUND OF
              <br />
              <span style={{ color: "var(--pink)" }}>EAST AFRICA.</span>
            </h2>
            <div className="mt-10 max-w-xl space-y-5 text-base leading-relaxed opacity-80">
              <p>
                SMARTBOY MANAGEMENT was founded with a singular mission: to give East African talent the
                world-class infrastructure it deserves. From the streets of Nairobi to global stages, we close
                the gap between raw talent and lasting impact.
              </p>
              <p>
                We are <strong className="opacity-100">more than a label</strong>. We are strategists,
                storytellers, and advocates — building careers with intention and protecting the art that
                defines our culture.
              </p>
              <p>
                With a roster spanning Afro-fusion, drill, trap, and R&amp;B, our sound is as diverse as the
                continent we represent.
              </p>
            </div>
          </div>

          <div className="reveal md:col-span-5">
            <div className="grid grid-cols-2 gap-px" style={{ background: "var(--border)" }}>
              {STATS.map((s) => (
                <div key={s.label} className="p-8 md:p-10" style={{ background: "var(--background)" }}>
                  <div className="headline text-[clamp(2.5rem,5vw,4.5rem)]">
                    <Counter value={s.n} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] opacity-60">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============= LEADERSHIP ============= */}
      <section id="leadership" className="px-5 py-24 md:px-8 md:py-32" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-[1400px]">
          <div className="reveal mb-12">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--yellow)" }}>
              Leadership
            </p>
            <h2 className="headline text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]">THE VISIONARY.</h2>
          </div>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="reveal md:col-span-5">
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, var(--blue) 0%, #000 100%)",
                }}
              >
                <svg viewBox="0 0 200 260" className="absolute inset-0 m-auto h-3/4 w-3/4 opacity-30">
                  <polygon points="100,10 190,60 190,200 100,250 10,200 10,60" fill="none" stroke="#fff" strokeWidth="1.5" />
                  <polygon points="100,30 170,72 170,188 100,230 30,188 30,72" fill="none" stroke="#fff" strokeWidth="0.8" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="headline text-[12rem] leading-none text-white/15">PO</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: "var(--cyan)", color: "#000" }}>
                  <div className="headline text-3xl">Peter Ombati</div>
                  <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em]">Founder &amp; CEO</div>
                </div>
              </div>
            </div>

            <div className="reveal md:col-span-7">
              <blockquote
                className="headline text-[clamp(1.6rem,3vw,2.4rem)] leading-tight"
                style={{ borderLeft: "3px solid var(--pink)", paddingLeft: "1.5rem" }}
              >
                "Music is the language of a generation. Our job is to make sure the world hears it."
              </blockquote>
              <div className="mt-8 space-y-5 text-base leading-relaxed opacity-80">
                <p>
                  Peter Ombati is the founder and chief executive of SMARTBOY MANAGEMENT, one of East
                  Africa's most forward-thinking music and talent companies. With a deep passion for African
                  music and an eye for raw, undiscovered talent, Peter built Smartboy from the ground up —
                  driven by the belief that Kenyan artists deserve world-class management.
                </p>
                <p>
                  Under his leadership, Smartboy has signed and elevated artists across multiple genres,
                  secured brand partnerships, and expanded the label's footprint across East Africa and
                  beyond. Peter's vision is simple:{" "}
                  <strong className="opacity-100">build legacies, not just careers.</strong>
                </p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3">
                <Meta label="Based In" value="Nairobi, Kenya" />
                <Meta label="Role" value="Founder & CEO" />
                <Meta label="Since" value="2020" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ticker bg="var(--pink)" color="#000" reverse items={["MUSIC WITHOUT LIMITS", "MUSIC WITHOUT LIMITS"]} />

      {/* ============= SERVICES ============= */}
      <section id="services" className="px-5 py-24 md:px-8 md:py-32" style={{ background: "var(--background)" }}>
        <div className="mx-auto max-w-[1400px]">
          <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-xl">
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--cyan)" }}>
                What We Do
              </p>
              <h2 className="headline text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]">
                FULL-SPECTRUM <span style={{ color: "var(--yellow)" }}>SUPPORT</span>.
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed opacity-70">
              From signing to stardom — we provide every tool an artist needs to build a sustainable, powerful career.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SERVICES.map((s, i) => (
              <article
                key={s.name}
                className="reveal group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(83,243,243,0.35)]"
                style={{
                  borderColor: "var(--border)",
                  background: "linear-gradient(180deg, var(--surface) 0%, var(--background) 100%)",
                }}
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: i % 3 === 0 ? "var(--cyan)" : i % 3 === 1 ? "var(--pink)" : "var(--yellow)" }}
                />
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl border transition-colors group-hover:border-transparent"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--background)",
                      color: i % 3 === 0 ? "var(--cyan)" : i % 3 === 1 ? "var(--pink)" : "var(--yellow)",
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={SERVICE_ICONS[s.name] || "M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"} />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.22em] opacity-40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="headline text-[1.35rem] leading-tight md:text-[1.5rem]">{s.name}</h3>
                <p className="mt-3 text-[14px] leading-relaxed opacity-70">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] opacity-60 transition-opacity group-hover:opacity-100">
                  Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* ============= RELEASES ============= */}
      <section id="releases" className="px-5 py-24 md:px-8 md:py-32" style={{ background: "var(--ink)" }}>
        <div className="mx-auto max-w-[1400px]">
          <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
                Discography
              </p>
              <h2 className="headline text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]">
                LATEST <span style={{ color: "var(--pink)" }}>RELEASES</span>.
              </h2>
            </div>
          </div>

          <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
            {RELEASES.map((r) => (
              <li
                key={r.n}
                className="reveal group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 transition-colors md:grid-cols-[3rem_1fr_1fr_auto_auto] md:gap-8 md:py-8"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="text-[12px] font-bold tracking-[0.22em] opacity-40">{r.n}</span>
                <div>
                  <div className="headline text-[clamp(1.4rem,3vw,2.2rem)] transition-colors group-hover:text-[var(--cyan)]">
                    {r.title}
                  </div>
                  <div className="mt-1 text-sm opacity-60 md:hidden">{r.artist}</div>
                </div>
                <div className="hidden text-sm opacity-70 md:block">{r.artist}</div>
                <div className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] opacity-60 md:block">
                  {r.meta}
                </div>
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ background: "var(--yellow)", color: "#000" }}
                >
                  {r.badge}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============= CONTACT ============= */}
      <section id="contact" className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32" style={{ background: "var(--surface)" }}>
        <div
          className="pointer-events-none absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--cyan)" }}
        />
        <div
          className="pointer-events-none absolute -right-32 top-10 h-[360px] w-[360px] rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--pink)" }}
        />

        <div className="relative mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--cyan)" }}>
              Get In Touch
            </p>
            <h2 className="headline text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]">
              READY TO BUILD<br />
              SOMETHING <span style={{ color: "var(--yellow)" }}>LEGENDARY?</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed opacity-70">
              Send us a message — it lands instantly on our WhatsApp. We reply fast.
            </p>

            <div className="mt-10 space-y-5">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener" className="group flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "#25D366", color: "#000" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.01c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.3zM12 21.8h-.01a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.9 9.9 0 1 1 18.4-5.2c0 5.4-4.4 9.9-9.9 9.9z"/></svg>
                </span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] opacity-60">WhatsApp</div>
                  <div className="text-base font-semibold group-hover:underline">+254 700 000 000</div>
                </div>
              </a>
              <a href="mailto:hello@smartboymgmt.co" className="group flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "var(--cyan)", color: "#000" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                </span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] opacity-60">Email</div>
                  <div className="text-base font-semibold group-hover:underline">hello@smartboymgmt.co</div>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "var(--pink)", color: "#000" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] opacity-60">Studio</div>
                  <div className="text-base font-semibold">Nairobi, Kenya</div>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = e.currentTarget as HTMLFormElement;
              const data = new FormData(f);
              const name = (data.get("name") as string) || "";
              const email = (data.get("email") as string) || "";
              const phone = (data.get("phone") as string) || "";
              const inquiry = (data.get("inquiry") as string) || "";
              const demo = (data.get("demo") as string) || "";
              const message = (data.get("message") as string) || "";
              const text =
                `*New Smartboy Inquiry*\n\n` +
                `*Name:* ${name}\n` +
                `*Email:* ${email}\n` +
                `*Phone:* ${phone}\n` +
                `*Type:* ${inquiry}\n` +
                (demo ? `*Demo/Link:* ${demo}\n` : "") +
                `\n*Message:*\n${message}`;
              const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
              window.open(url, "_blank", "noopener");
              setSent(true);
              setTimeout(() => setSent(false), 3500);
            }}
            className="reveal lg:col-span-7"
          >
            <div
              className="rounded-3xl border p-6 md:p-8"
              style={{
                borderColor: "var(--border)",
                background: "var(--background)",
                boxShadow: "0 30px 80px -40px rgba(0,0,0,0.4)",
              }}
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full Name" name="name" placeholder="Your name" />
                <Field label="Email" name="email" type="email" placeholder="your@email.com" />
                <Field label="Phone" name="phone" type="tel" placeholder="+254 ..." />
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-60">Inquiry Type</label>
                  <select
                    name="inquiry"
                    required
                    className="rounded-xl border bg-transparent px-4 py-3 text-[15px] font-medium outline-none transition focus:border-[var(--cyan)]"
                    style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                  >
                    <option style={{ color: "#000" }}>Artist Signing</option>
                    <option style={{ color: "#000" }}>Demo Submission</option>
                    <option style={{ color: "#000" }}>Brand Partnership</option>
                    <option style={{ color: "#000" }}>Event Booking</option>
                    <option style={{ color: "#000" }}>Press &amp; Media</option>
                    <option style={{ color: "#000" }}>General Inquiry</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Field label="Demo / Link (optional)" name="demo" placeholder="SoundCloud, Drive, etc." />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-60">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about yourself or your project..."
                    className="resize-none rounded-xl border bg-transparent px-4 py-3 text-[15px] font-medium outline-none transition focus:border-[var(--cyan)]"
                    style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-[11px] uppercase tracking-[0.2em] opacity-50">
                  Replies via WhatsApp · usually within 24h
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] transition hover:scale-[1.02]"
                  style={{ background: sent ? "var(--yellow)" : "#25D366", color: "#000" }}
                >
                  {sent ? "Opening WhatsApp ✓" : "Send via WhatsApp"}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.01c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.3z"/></svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>


      {/* ============= PARTNERS ============= */}
      <section id="partners" className="px-5 py-20 md:px-8 md:py-28" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-[1400px]">
          <div className="reveal mb-10 text-center">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
              Trusted By
            </p>
            <h2 className="headline text-[clamp(2rem,5vw,3.5rem)]">PARTNERS &amp; DISTRIBUTORS.</h2>
          </div>
          <div className="grid grid-cols-1 gap-px sm:grid-cols-3" style={{ background: "var(--border)" }}>
            {PARTNERS.map((p) => (
              <div
                key={p.name}
                className="reveal flex flex-col items-center justify-center gap-5 p-10 transition-transform hover:scale-[1.02]"
                style={{ background: "#fff" }}
              >
                <img
                  src={p.logo}
                  alt={`${p.name} — partner of Smartboy Management`}
                  className="h-20 md:h-24 w-auto object-contain"
                  loading="lazy"
                  width={240}
                  height={120}
                />
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">{p.role}</div>
              </div>
            ))}
          </div>
          <p className="reveal mt-10 text-center text-sm opacity-50">
            Proudly partnered with world-class organisations to deliver our artists the best resources globally.
          </p>
        </div>
      </section>

      {/* ============= FOOTER ============= */}
      <footer className="px-5 py-20 md:px-8 md:py-28" style={{ background: "var(--blue)", color: "#fff" }}>
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12">
            <Logo dark={false} />
          </div>
          <div className="grid gap-10 md:grid-cols-4">
            <FooterCol heading="Artists" links={["Roster", "Releases", "Submit Demo", "Bookings"]} />
            <FooterCol heading="Label" links={["About", "Leadership", "Services", "Partners"]} />
            <FooterCol heading="Contact" links={["Nairobi, Kenya", "hello@smartboymgmt.co", "+254 700 000 000"]} />
            <FooterCol heading="Follow" links={["Instagram", "Twitter / X", "YouTube", "TikTok"]} />
          </div>
          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/20 pt-6 text-[11px] font-semibold uppercase tracking-[0.22em] opacity-80 md:flex-row">
            <div>© {new Date().getFullYear()} Smartboy Management. Nairobi, Kenya. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ============================ Sub-components ============================ */

function RiseLines({ lines }: { lines: string[] }) {
  return (
    <span className="block">
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden">
          <span
            className="block"
            style={{
              animation: "rise 1s cubic-bezier(.2,.8,.2,1) both",
              animationDelay: `${li * 0.12 + 0.1}s`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

function BackgroundLights() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--blue)" }}
      />
      <div
        className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--pink)" }}
      />
      <div
        className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--cyan)" }}
      />
    </div>
  );
}

function ArtistCard({
  name,
  tag,
  genre,
  initials,
  accent,
}: {
  name: string;
  tag: string;
  genre: string;
  initials: string;
  accent: string;
}) {
  return (
    <article className="reveal group relative aspect-[3/4] overflow-hidden">
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        style={{
          background: `linear-gradient(150deg, ${accent} 0%, #000 75%)`,
        }}
      />
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" viewBox="0 0 300 400">
        <circle cx="150" cy="200" r="140" fill="none" stroke="#fff" strokeWidth="0.6" />
        <circle cx="150" cy="200" r="100" fill="none" stroke="#fff" strokeWidth="0.4" />
        <circle cx="150" cy="200" r="60" fill="none" stroke="#fff" strokeWidth="0.5" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="headline text-[7rem] leading-none text-white/25 md:text-[8rem]">{initials}</span>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 translate-y-3 p-5 transition-transform duration-500 group-hover:translate-y-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.2) 70%, transparent)",
        }}
      >
        <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: accent }}>
          {tag}
        </div>
        <div className="headline mt-2 text-2xl text-white md:text-3xl">{name}</div>
        <div className="mt-2 text-xs text-white/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {genre}
        </div>
      </div>
      <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur transition group-hover:bg-white group-hover:text-black">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--cyan)" }}>
        {label}
      </div>
      <div className="mt-1 text-base font-medium">{value}</div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-60">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="rounded-xl border bg-transparent px-4 py-3 text-[15px] font-medium outline-none transition focus:border-[var(--cyan)]"
        style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
      />
    </div>
  );
}

function FooterCol({ heading, links }: { heading: string; links: string[] }) {
  return (
    <div>
      <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] opacity-70">{heading}</h4>
      <ul className="space-y-2 text-base font-semibold">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="transition hover:opacity-70">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
