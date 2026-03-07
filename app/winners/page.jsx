import WinnerCard from "@/components/WinnerCard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
    title: "Winners – NEUROVEX 2K26",
    description: "Congratulations to the winners of NEUROVEX 2K26 Intercollegiate IT Fest.",
};

async function getWinners() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/winners`, { cache: "no-store" });
        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}

export default async function WinnersPage() {
    const winners = await getWinners();

    // Group winners by event
    const grouped = winners.reduce((acc, w) => {
        if (!acc[w.event]) acc[w.event] = [];
        acc[w.event].push(w);
        return acc;
    }, {});

    const eventNames = Object.keys(grouped);

    return (
        <div>
            <div className="page-header">
                <div className="winners-badge-top">🏆 Hall of Fame</div>
                <h1>
                    NEUROVEX <span className="accent-glow">Winners</span>
                </h1>
                <p>
                    Celebrating the champions who proved their mettle at NEUROVEX 2K26.
                    Results are published live by the admin team.
                </p>
            </div>

            <div className="section" style={{ paddingTop: 0 }}>
                {eventNames.length === 0 ? (
                    <div className="no-winners-box glass-card">
                        <div className="no-winners-icon">⏳</div>
                        <h2 className="no-winners-title">Results Not Yet Published</h2>
                        <p>
                            Winners will be announced after the events conclude.
                            Check back soon!
                        </p>
                    </div>
                ) : (
                    <div className="winners-sections">
                        {eventNames.map((eventName) => (
                            <div key={eventName} className="winners-event-section">
                                <div className="winners-event-header">
                                    <h2 className="winners-event-title">{eventName}</h2>
                                    <div className="winners-event-line" />
                                </div>
                                <div className="winners-cards-grid">
                                    {grouped[eventName]
                                        .sort((a, b) => {
                                            const order = { "1st": 1, "2nd": 2 };
                                            return (order[a.position] || 99) - (order[b.position] || 99);
                                        })
                                        .map((winner) => (
                                            <WinnerCard key={winner.id} winner={winner} />
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
