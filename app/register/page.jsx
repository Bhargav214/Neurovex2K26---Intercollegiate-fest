"use client";
import { useState, useEffect } from "react";
import { events } from "@/data/events";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        college: "",
        phone: "",
        email: "",
        event: "",
        teamSize: "",
        notes: "",
    });
    const [teamMembers, setTeamMembers] = useState([]);
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [message, setMessage] = useState("");

    // Sync teamMembers array length with teamSize (extra members beyond member 1)
    useEffect(() => {
        const size = parseInt(form.teamSize, 10);
        if (!isNaN(size) && size > 1) {
            setTeamMembers((prev) => {
                const extra = size - 1; // member 1 is the registrant
                const updated = [...prev];
                while (updated.length < extra) updated.push("");
                return updated.slice(0, extra);
            });
        } else {
            setTeamMembers([]);
        }
    }, [form.teamSize]);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleMemberChange = (index, value) => {
        setTeamMembers((prev) => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        try {
            const payload = {
                ...form,
                teamMembers: teamMembers.filter(Boolean),
            };

            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (!res.ok) {
                setStatus("error");
                setMessage(data.error || "Registration failed. Please try again.");
            } else {
                setStatus("success");
                setMessage("🎉 Registration successful! You're all set for NEUROVEX 2K26.");
                setForm({ name: "", college: "", phone: "", email: "", event: "", teamSize: "", notes: "" });
                setTeamMembers([]);
            }
        } catch {
            setStatus("error");
            setMessage("Network error. Please check your connection and try again.");
        }
    };

    const selectedEvent = events.find((e) => e.slug === form.event);
    const teamSize = parseInt(form.teamSize, 10);
    const showTeamMembers = !isNaN(teamSize) && teamSize > 1;

    return (
        <div>
            <div className="page-header">
                <div className="reg-badge">Registration</div>
                <h1>
                    Register for <span style={{ color: "var(--accent)", textShadow: "0 0 20px var(--accent)" }}>NEUROVEX 2K26</span>
                </h1>
                <p>Fill in the details below to secure your spot.</p>
                <div style={{ marginTop: "16px", padding: "12px", background: "rgba(0, 212, 255, 0.06)", borderRadius: "8px", border: "1px solid rgba(0, 212, 255, 0.2)", display: "inline-block", textAlign: "left", fontSize: "0.9rem" }}>
                    <strong style={{ color: "var(--accent)" }}>Note:</strong> Entry fee will be collected offline.
                </div>
            </div>

            <div className="section" style={{ paddingTop: 0, maxWidth: "720px" }}>
                {status === "success" ? (
                    <div className="glass-card success-card">
                        <div className="success-icon">✅</div>
                        <h2 className="success-title">You&apos;re Registered!</h2>
                        <p className="success-message">{message}</p>
                        <button
                            className="btn btn-outline"
                            style={{ marginTop: "24px" }}
                            onClick={() => setStatus("idle")}
                        >
                            Register for Another Event
                        </button>
                    </div>
                ) : (
                    <div className="glass-card reg-form-card">
                        <h2 className="reg-form-title">Registration Form</h2>

                        {status === "error" && (
                            <div className="alert alert-error">{message}</div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Row 1: Name + College */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="name">Full Name *</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="form-input"
                                        placeholder="Enter your full name"
                                        value={form.name}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (/^[a-zA-Z\s]*$/.test(val)) {
                                                handleChange(e);
                                            }
                                        }}
                                        required
                                        pattern="[A-Za-z\s]+"
                                        title="Only alphabetic characters are allowed."
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="college">College Name *</label>
                                    <input
                                        id="college"
                                        name="college"
                                        type="text"
                                        className="form-input"
                                        placeholder="Name of your college"
                                        value={form.college}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Row 2: Phone + Email */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="phone">Phone Number *</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        className="form-input"
                                        placeholder="10-digit number"
                                        value={form.phone}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (/^\d{0,10}$/.test(val)) {
                                                handleChange(e);
                                            }
                                        }}
                                        required
                                        pattern="\d{10}"
                                        title="Please enter exactly 10 digits."
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">Email Address *</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="form-input"
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Row 3: Event + Team Size */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="event">Select Event *</label>
                                    <select
                                        id="event"
                                        name="event"
                                        className="form-select"
                                        value={form.event}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">-- Choose an Event --</option>
                                        {events.map((e) => (
                                            <option key={e.slug} value={e.slug}>
                                                {e.icon} {e.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="teamSize">Team Size *</label>
                                    <input
                                        id="teamSize"
                                        name="teamSize"
                                        type="number"
                                        min="1"
                                        max="10"
                                        className="form-input"
                                        placeholder="Number of members"
                                        value={form.teamSize}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {selectedEvent && (
                                <div className="event-hint">
                                    <span className="event-hint-icon">{selectedEvent.icon}</span>
                                    <div>
                                        <strong>{selectedEvent.title}</strong> — {selectedEvent.teamSize}
                                        {selectedEvent.entryFee && (
                                            <span className="event-hint-fee">💰 Entry Fee: {selectedEvent.entryFee}</span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* ── Team Members Section ── */}
                            {showTeamMembers && (
                                <div className="team-members-section">
                                    <div className="team-members-header">
                                        <span className="team-members-icon">👥</span>
                                        <div>
                                            <h3 className="team-members-title">Team Members</h3>
                                            <p className="team-members-subtitle">
                                                Enter the full names of all team members (excluding yourself as Member 1)
                                            </p>
                                        </div>
                                    </div>

                                    {/* Member 1 = registrant (read-only display) */}
                                    <div className="member-row">
                                        <span className="member-badge">Member 1</span>
                                        <div className="member-input-wrapper">
                                            <input
                                                type="text"
                                                className="form-input member-input member-input-readonly"
                                                value={form.name || "You (registrant)"}
                                                readOnly
                                                tabIndex={-1}
                                            />
                                            <span className="member-you-tag">You</span>
                                        </div>
                                    </div>

                                    {/* Members 2..N */}
                                    {teamMembers.map((member, i) => (
                                        <div className="member-row" key={i}>
                                            <span className="member-badge">Member {i + 2}</span>
                                            <input
                                                type="text"
                                                className="form-input member-input"
                                                placeholder={`Full name of Member ${i + 2}`}
                                                value={member}
                                                onChange={(e) => handleMemberChange(i, e.target.value)}
                                                required
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="form-group">
                                <label className="form-label" htmlFor="notes">Additional Notes</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    className="form-textarea"
                                    placeholder="Any additional information, dietary requirements, accessibility needs, etc."
                                    value={form.notes}
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ width: "100%", justifyContent: "center", padding: "14px" }}
                                disabled={status === "loading"}
                            >
                                {status === "loading" ? (
                                    <>
                                        <span className="btn-spinner" /> Submitting...
                                    </>
                                ) : (
                                    "⚡ Submit Registration"
                                )}
                            </button>
                        </form>
                    </div>
                )}
            </div>

            <style jsx>{`
        .reg-badge {
          display: inline-block;
          padding: 5px 16px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 100px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #34d399;
          margin-bottom: 20px;
          letter-spacing: 0.07em;
          font-family: var(--font-heading);
          text-transform: uppercase;
        }

        .reg-form-card { padding: 40px; }

        .reg-form-title {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 28px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .event-hint {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: rgba(0, 212, 255, 0.06);
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: 8px;
          margin: -8px 0 16px;
          font-size: 0.85rem;
          color: var(--accent);
        }

        .event-hint-icon { font-size: 1.2rem; }

        .event-hint strong { color: #fff; }

        .event-hint-fee {
          display: block;
          font-size: 0.78rem;
          color: #34d399;
          margin-top: 3px;
          font-weight: 600;
        }

        /* ── Team Members ── */
        .team-members-section {
          background: rgba(0, 212, 255, 0.04);
          border: 1px solid rgba(0, 212, 255, 0.18);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          animation: fadeSlideIn 0.3s ease;
        }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .team-members-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 18px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(0, 212, 255, 0.15);
        }

        .team-members-icon { font-size: 1.5rem; line-height: 1; margin-top: 2px; }

        .team-members-title {
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin: 0 0 4px;
        }

        .team-members-subtitle {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.5;
        }

        .member-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .member-row:last-child { margin-bottom: 0; }

        .member-badge {
          flex-shrink: 0;
          min-width: 76px;
          padding: 4px 10px;
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.25);
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.04em;
          font-family: var(--font-heading);
          text-align: center;
          text-transform: uppercase;
        }

        .member-input-wrapper {
          position: relative;
          flex: 1;
        }

        .member-input { flex: 1; margin-bottom: 0 !important; }

        .member-input-readonly {
          opacity: 0.55;
          cursor: default;
          padding-right: 48px;
        }

        .member-you-tag {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.68rem;
          font-weight: 700;
          color: #34d399;
          background: rgba(52, 211, 153, 0.12);
          border: 1px solid rgba(52, 211, 153, 0.3);
          border-radius: 4px;
          padding: 2px 7px;
          letter-spacing: 0.04em;
          font-family: var(--font-heading);
          text-transform: uppercase;
        }

        .btn-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(0,0,0,0.3);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
          display: inline-block;
        }

        /* Success state */
        .success-card {
          padding: 60px 40px;
          text-align: center;
        }

        .success-icon { font-size: 4rem; margin-bottom: 20px; }

        .success-title {
          font-size: 1.8rem;
          color: #34d399;
          text-shadow: 0 0 20px rgba(52, 211, 153, 0.4);
          margin-bottom: 16px;
        }

        .success-message {
          color: var(--text-secondary);
          font-size: 1rem;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
        }

        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr; }
          .reg-form-card { padding: 24px 20px; }
          .member-row { flex-wrap: wrap; }
          .member-badge { min-width: auto; }
        }
      `}</style>
        </div>
    );
}
