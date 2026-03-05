import Link from "next/link";

export default function EventCard({ event }) {
    return (
        <Link href={`/events/${event.slug}`} className="event-card-link">
            <div className="event-card glass-card">
                <div className="event-card-icon">{event.icon}</div>
                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-card-tagline">{event.tagline}</p>
                <p className="event-card-desc">
                    {event.description.slice(0, 120)}...
                </p>
                <div className="event-card-footer">
                    <span className="badge badge-accent">{event.teamSize.split(" ")[0]}</span>
                    <span className="event-card-cta">View Details →</span>
                </div>
            </div>
        </Link>
    );
}
