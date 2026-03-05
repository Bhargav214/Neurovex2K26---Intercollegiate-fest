"use client";
import { useState } from "react";
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
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (!res.ok) {
                setStatus("error");
                setMessage(data.error || "Registration failed. Please try again.");
            } else {
                setStatus("success");
                setMessage("🎉 Registration successful! You're all set for NEUROVEX 2K26. Check your email for confirmation.");
                setForm({ name: "", college: "", phone: "", email: "", event: "", teamSize: "", notes: "" });
            }
        } catch {
            setStatus("error");
            setMessage("Network error. Please check your connection and try again.");
        }
    };

    const selectedEvent = events.find((e) => e.slug === form.event);

    return (
        <div>
            <div className="page-header">
                <div className="reg-badge">Free Registration</div>
                <h1>
                    Register for <span style={{ color: "var(--accent)", textShadow: "0 0 20px var(--accent)" }}>NEUROVEX 2K26</span>
                </h1>
                <p>Fill in the details below to secure your spot. No registration fee required.</p>
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
                                        onChange={handleChange}
                                        required
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

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="phone">Phone Number *</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        className="form-input"
                                        placeholder="+91 XXXXX XXXXX"
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                        pattern="[0-9+\-\s]{10,15}"
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
                                    </div>
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
        }
      `}</style>
        </div>
    );
}
