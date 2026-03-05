import EventCard from "@/components/EventCard";
import { events } from "@/data/events";

export const metadata = {
  title: "Events – NEUROVEX 2K26",
  description: "Explore all 8 competitive IT events at NEUROVEX 2K26 Intercollegiate IT Fest.",
};

export default function EventsPage() {
  return (
    <div>
      <div className="page-header">
        <div className="events-header-badge">8 Competitive Events</div>
        <h1>
          Explore <span className="accent-glow">Events</span>
        </h1>
        <p>
          Choose your battlefield. From coding to debating, every event tests a
          unique facet of your IT expertise.
        </p>
      </div>

      <div className="section" style={{ paddingTop: 0 }}>
        <div className="events-page-grid">
          {events.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
