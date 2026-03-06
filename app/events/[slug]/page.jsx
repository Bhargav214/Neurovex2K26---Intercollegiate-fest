import { events } from "@/data/events";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return {};
  return { title: `${event.title} – NEUROVEX 2K26`, description: event.description };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <div>
      {/* Hero */}
      <div className="event-detail-hero">
        <div className="event-detail-hero-glow" />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Link href="/events" className="event-back-link">← All Events</Link>
          <div className="event-detail-icon">{event.icon}</div>
          <h1 className="event-detail-title">{event.title}</h1>
          <p className="event-detail-tagline">{event.tagline}</p>
          <Link href="/register" className="btn btn-primary" style={{ marginTop: "24px", display: "inline-flex" }}>
            Register for this Event
          </Link>
        </div>
      </div>

      <div className="section event-detail-layout" style={{ paddingTop: "48px" }}>
        {/* Main */}
        <div className="event-detail-main">
          <div className="glass-card event-detail-card">
            <h2 className="event-detail-section-title">📋 About the Event</h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>{event.description}</p>
          </div>

          <div className="glass-card event-detail-card">
            <h2 className="event-detail-section-title">📜 Rules & Guidelines</h2>
            <ul className="event-rules-list">
              {event.rules.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
            {event.rulespdf && (
              <a
                href={event.rulespdf}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ marginTop: "16px", display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                📄 Download Rules PDF
              </a>
            )}
          </div>

          <div className="glass-card event-detail-card">
            <h2 className="event-detail-section-title">🔄 Round Structure</h2>
            <div className="event-rounds-list">
              {event.rounds.map((r, i) => (
                <div key={i} className="event-round-item">
                  <div className="event-round-num">{i + 1}</div>
                  <div>
                    <div className="event-round-title">{r.round}</div>
                    <div className="event-round-desc">{r.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card event-detail-card">
            <h2 className="event-detail-section-title">⚖️ Judging Criteria</h2>
            <ul className="event-rules-list">
              {event.judgingCriteria.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="event-detail-sidebar">
          <div className="glass-card event-detail-card">
            <h2 className="event-detail-section-title">ℹ️ Quick Info</h2>
            {[
              { label: "Team Size", value: event.teamSize },
              { label: "Rounds", value: String(event.rounds.length) },
              { label: "Date", value: "March 20, 2026" },
            ].map((item) => (
              <div key={item.label} className="event-quick-row">
                <span className="event-quick-label">{item.label}</span>
                <span className="event-quick-value">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="glass-card event-detail-card">
            <h2 className="event-detail-section-title">🏆 Prizes</h2>
            <div className="prize-row prize-gold"><span>🥇 1st Place</span><span>{event.prizes.first}</span></div>
            <div className="prize-row prize-silver"><span>🥈 2nd Place</span><span>{event.prizes.second}</span></div>
          </div>

          <div className="glass-card event-detail-card">
            <h2 className="event-detail-section-title">📞 Coordinators</h2>
            {event.coordinators.map((c, i) => (
              <div key={i} className="event-coord-row">
                <div className="event-coord-avatar">{c.name.charAt(0)}</div>
                <div>
                  <div className="event-coord-name">{c.name}</div>
                  <div className="event-coord-role">{c.role}</div>
                  <a href={`tel:${c.phone}`} className="event-coord-phone">{c.phone}</a>
                  <br />
                  <a href={`https://wa.me/${c.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="event-coord-wa">💬 WhatsApp</a>
                </div>
              </div>
            ))}
          </div>

          <Link href="/register" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            ⚡ Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}
