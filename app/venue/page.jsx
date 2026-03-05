export const metadata = {
    title: "Venue – NEUROVEX 2K26",
    description: "Find us at NEUROVEX 2K26 – Venue details, map, and directions.",
};

export default function VenuePage() {
    return (
        <div>
            <div className="page-header">
                <h1>
                    Event <span className="accent-glow">Venue</span>
                </h1>
                <p>Find your way to NEUROVEX 2K26. We can&apos;t wait to see you there!</p>
            </div>

            <div className="section" style={{ paddingTop: 0 }}>
                <div className="venue-layout">
                    {/* Info Column */}
                    <div className="venue-info-col">
                        <div className="glass-card venue-info-card">
                            <h2 className="venue-card-title">📍 Location Details</h2>

                            {[
                                { icon: "🏛️", label: "Venue Name", value: "Main Auditorium & IT Labs" },
                                { icon: "🏫", label: "College", value: "Your College Name Here" },
                                {
                                    icon: "🗺️", label: "Address",
                                    value: "College Campus, Main Road, City Name – 600 000, Tamil Nadu, India"
                                },
                                { icon: "📅", label: "Date & Time", value: "March 20, 2026 · 9:00 AM – 5:00 PM" },
                            ].map((d) => (
                                <div key={d.label} className="venue-detail-row">
                                    <div className="venue-detail-icon">{d.icon}</div>
                                    <div>
                                        <div className="venue-detail-label">{d.label}</div>
                                        <div className="venue-detail-value">{d.value}</div>
                                    </div>
                                </div>
                            ))}

                            <div className="venue-cta-row">
                                <a
                                    href="https://maps.google.com/?q=Your+College+Name+City"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    🗺️ Google Maps
                                </a>
                                <a
                                    href="https://www.google.com/maps/dir/?api=1&destination=Your+College+Name+City"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline"
                                >
                                    🧭 Get Directions
                                </a>
                            </div>
                        </div>

                        <div className="glass-card venue-info-card">
                            <h2 className="venue-card-title">🚗 How to Reach</h2>
                            {[
                                { icon: "🚌", title: "By Bus", desc: "State transport buses route from City Bus Stand. Alight at College Main Gate." },
                                { icon: "🚂", title: "By Train", desc: "Nearest: City Railway Station (5 km). Auto/taxi available outside." },
                                { icon: "📱", title: "Cab Services", desc: 'Ola/Uber available. Search "Your College Name" as destination.' },
                                { icon: "🅿️", title: "Parking", desc: "Free parking inside campus. Enter via Main Gate." },
                            ].map((t) => (
                                <div key={t.title} className="transport-row">
                                    <div className="transport-icon">{t.icon}</div>
                                    <div>
                                        <div className="transport-title">{t.title}</div>
                                        <div className="transport-desc">{t.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Map Column */}
                    <div className="glass-card venue-map-card">
                        <div className="map-live-label">
                            <span className="map-live-dot" /> Live Map
                        </div>
                        <iframe
                            title="NEUROVEX 2K26 Venue Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.938!2d80.2280!3d13.0475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzUxLjAiTiA4MMKwMTMnNDAuOCJF!5e0!3m2!1sen!2sin!4v1000000000000!5m2!1sen!2sin"
                            className="venue-iframe"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
