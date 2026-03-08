export const metadata = {
    title: "Coordinators – NEUROVEX 2K26",
    description: "Meet the coordinators and organizers of NEUROVEX 2K26 Intercollegiate IT Fest.",
};

const coordinators = [
    { name: "Prof.Rekha Raichal", role: "Faculty Coordinator", department: "Head of Department, MCA", phone: "+91 9986344574" },
    { name: "Prof.Thimmappa N T", role: "Faculty In-charge", department: "Dept. of MCA", phone: "+91 7899999042" },
    { name: "Prof.Chirag D", role: "Faculty In-charge", department: "Dept. of MCA", phone: "+91 8310228857" },
    { name: "Sathyasimha H N", role: "Organizer", phone: "6360582689" },
    { name: "Sujith Kumar", role: "Organizer", phone: "8431576586" },
    { name: "Bhargav Sai P", role: "Organizer", phone: "8618252933" },
    { name: "Saajan D", role: "Organizer", phone: "+91 8904712928" },
    { name: "Syed Ayan", role: "Organizer", phone: "9353027996" },
];

function CoordCard({ c }) {
    const isFaculty = c.role.toLowerCase().includes("faculty");
    const initials = c.name.split(" ").slice(0, 2).map((n) => n[0]).join("");
    return (
        <div className={`glass-card coord-item-card ${isFaculty ? "coord-faculty-card" : ""}`}>
            <div className="coord-avatar-circle">{initials}</div>
            <div className="coord-item-info">
                <div className="coord-item-name">{c.name}</div>
                {isFaculty && <span className="badge badge-accent" style={{ fontSize: "0.6rem", marginBottom: "4px", display: "inline-block" }}>Faculty</span>}
                <div className="coord-item-role">{c.role}</div>
                <div className="coord-item-dept">{c.department}</div>
                <div className="coord-contact-row">
                    <a href={`tel:${c.phone}`} className="coord-contact-btn coord-call">{c.phone}</a>
                    <a href={`https://wa.me/${c.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="coord-contact-btn coord-wa">💬 WhatsApp</a>
                    {/* <a href={`mailto:${c.email}`} className="coord-contact-btn coord-mail">✉️ Email</a> */}
                </div>
            </div>
        </div>
    );
}

export default function CoordinatorsPage() {
    const faculty = coordinators.filter((c) => c.role.toLowerCase().includes("faculty"));
    const students = coordinators.filter((c) => !c.role.toLowerCase().includes("faculty"));
    return (
        <div>
            <div className="page-header">
                <h1>Meet the <span className="accent-glow">Team</span></h1>
                <p>The dedicated team behind NEUROVEX 2K26. Reach out to any coordinator for event-specific queries.</p>
            </div>
            <div className="section" style={{ paddingTop: 0 }}>
                <div className="coord-group">
                    <div className="coord-group-title">🎓 Faculty Coordinators</div>
                    <div className="coord-grid-2">{faculty.map((c) => <CoordCard key={c.name} c={c} />)}</div>
                </div>
                <div className="coord-group">
                    <div className="coord-group-title">⚡ Student Coordinators</div>
                    <div className="coord-grid-3">{students.map((c) => <CoordCard key={c.name} c={c} />)}</div>
                </div>
            </div>
        </div>
    );
}
