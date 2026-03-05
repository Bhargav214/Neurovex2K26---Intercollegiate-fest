export const metadata = {
    title: "Coordinators – NEUROVEX 2K26",
    description: "Meet the coordinators and organizers of NEUROVEX 2K26 Intercollegiate IT Fest.",
};

const coordinators = [
    { name: "Dr. S. Rajesh Kumar", role: "Faculty Coordinator", department: "Head of Department, MCA", phone: "+91 98XXX XXXXX", email: "hod.mca@college.edu" },
    { name: "Prof. Anitha Krishnan", role: "Faculty In-charge", department: "Dept. of MCA", phone: "+91 87XXX XXXXX", email: "anitha.k@college.edu" },
    { name: "Aravind Kumar", role: "Student Coordinator", department: "Coding & Debugging", phone: "+91 98XXX XXXXX", email: "aravind.coordinator@gmail.com" },
    { name: "Divya Menon", role: "Student Coordinator", department: "IT Quiz", phone: "+91 99XXX XXXXX", email: "divya.coord@gmail.com" },
    { name: "Sneha Pillai", role: "Student Coordinator", department: "Treasure Hunt", phone: "+91 97XXX XXXXX", email: "sneha.coord@gmail.com" },
    { name: "Vishnu Suresh", role: "Student Coordinator", department: "IT Gaming", phone: "+91 95XXX XXXXX", email: "vishnu.coord@gmail.com" },
    { name: "Meera Gopinath", role: "Student Coordinator", department: "Logo Design", phone: "+91 96XXX XXXXX", email: "meera.coord@gmail.com" },
    { name: "Sooraj Babu", role: "Student Coordinator", department: "IT Manager", phone: "+91 94XXX XXXXX", email: "sooraj.coord@gmail.com" },
    { name: "Nithya Krishnan", role: "Student Coordinator", department: "Corporate Walk", phone: "+91 93XXX XXXXX", email: "nithya.coord@gmail.com" },
    { name: "Aishwarya Pillai", role: "Student Coordinator", department: "IT Debate", phone: "+91 92XXX XXXXX", email: "aishwarya.coord@gmail.com" },
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
                    <a href={`mailto:${c.email}`} className="coord-contact-btn coord-mail">✉️ Email</a>
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
