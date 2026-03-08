import CountdownTimer from "@/components/CountdownTimer";
import EventCard from "@/components/EventCard";
import Link from "next/link";
import { events } from "@/data/events";

const FEST_DATE = process.env.NEXT_PUBLIC_FEST_DATE || "2026-03-17T09:00:00+05:30";

export const metadata = {
  title: "NEUROVEX 2K26 – Intercollegiate IT Fest",
  description: "NEUROVEX 2K26 – The biggest annual IT extravaganza. Compete. Innovate. Conquer. Eight epic events. One ultimate champion.",
};

export default function HomePage() {
  const featuredEvents = events.slice(0, 4);

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="hero-glow hero-glow-1" aria-hidden="true" />
        <div className="hero-glow hero-glow-2" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-badge fade-in-up">
            🎉&nbsp;Intercollegiate IT Fest — 2026
          </div>
          <h1 className="hero-title fade-in-up">
            <span className="hero-title-main">NEURO</span>
            <span className="hero-title-accent">VEX</span>
            <br />
            <span className="hero-title-sub">2K26</span>
          </h1>
          <p className="hero-desc fade-in-up">
            The biggest annual IT extravaganza. Compete. Innovate. Conquer.
            <br />
            Eight epic events. One ultimate champion.
          </p>

          <div className="hero-meta fade-in-up">
            <div className="hero-meta-item">
              <span className="hero-meta-icon">📅</span>
              <div>
                <div className="hero-meta-label">Date</div>
                <div className="hero-meta-value">March 17, 2026</div>
              </div>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-icon">⏰</span>
              <div>
                <div className="hero-meta-label">Time</div>
                <div className="hero-meta-value">9:00 AM Onwards</div>
              </div>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-icon">📍</span>
              <div>
                <div className="hero-meta-label">Venue</div>
                <div className="hero-meta-value">Seshadripuram First Grade College, Yelahanka</div>
              </div>
            </div>
          </div>

          <div className="hero-ctas fade-in-up">
            <Link href="/register" className="btn btn-primary hero-btn">
              ⚡ Register Now
            </Link>
            <Link href="/events" className="btn btn-outline hero-btn">
              Explore Events →
            </Link>
          </div>
        </div>
      </section>

      {/* ── COUNTDOWN ───────────────────────────────────────── */}
      <section className="countdown-section">
        <div className="section" style={{ textAlign: "center" }}>
          <p className="countdown-label-top">Time left to the big day</p>
          <CountdownTimer targetDate={FEST_DATE} />
        </div>
      </section>

      {/* ── ABOUT MCA ───────────────────────────────────────── */}
      <section className="section about-section">
        <div className="about-grid">
          <div className="about-text">
            <div className="about-eyebrow">About Us</div>
            <h2 className="about-title">
              Department of <span className="text-accent">MCA</span>
            </h2>
            <p>
              The Master of Computer Applications (MCA) Department is a centre of
              excellence for computer science and technology education. With
              state-of-the-art labs, experienced faculty, and industry-aligned
              curriculum, we prepare students to lead in the digital age.
            </p>
            <p style={{ marginTop: "16px" }}>
              NEUROVEX is our flagship annual event — a platform for students from
              across the region to showcase their technical talent, compete, learn,
              and network with peers and industry professionals.
            </p>
            <div className="about-stats">
              <div className="about-stat">
                <div className="about-stat-value">8+</div>
                <div className="about-stat-label">Events</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-value">500+</div>
                <div className="about-stat-label">Participants</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-value">50+</div>
                <div className="about-stat-label">Colleges</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-value">₹4K+</div>
                <div className="about-stat-label">Prize Pool</div>
              </div>
            </div>
          </div>
          <div className="about-visual">
            <div className="about-card glass-card">
              <div className="about-card-icon">🎓</div>
              <h3>Our Mission</h3>
              <p>
                Empower students through practical exposure to emerging technologies
                and provide a competitive edge in the global tech landscape.
              </p>
            </div>
            <div className="about-card glass-card">
              <div className="about-card-icon">🚀</div>
              <h3>Why NEUROVEX?</h3>
              <p>
                A unique convergence of technical events, creative challenges, and
                management scenarios — testing every dimension of IT prowess.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EVENTS PREVIEW ──────────────────────────────────── */}
      <section className="section events-preview">
        <h2 className="section-title">
          Featured <span className="accent">Events</span>
        </h2>
        <div className="section-divider" />
        <div className="grid-4">
          {featuredEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link href="/events" className="btn btn-outline">
            View All 8 Events →
          </Link>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────── */}
      <section className="cta-banner">
        <div className="cta-inner glass-card">
          <h2 className="cta-title">
            Ready to <span>compete</span>?
          </h2>
          <p className="cta-desc">
            Registrations are open! Secure your spot at NEUROVEX 2K26 before
            seats fill up.
            <br /><br />
            <strong>Note:</strong> On-spot registration is available!.
          </p>
          <Link href="/register" className="btn btn-primary">
            ⚡ Register Now
          </Link>
        </div>
      </section>
    </div>
  );
}
