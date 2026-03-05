"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { events } from "@/data/events";

// ── Helpers ─────────────────────────────────────────────────
function exportCSV(data, filename) {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const rows = data.map((r) => headers.map((h) => `"${(r[h] || "").replace(/"/g, '""')}"`).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// ── Dashboard ────────────────────────────────────────────────
export default function AdminDashboard() {
    const router = useRouter();
    const [tab, setTab] = useState("registrations"); // registrations | winners
    const [registrations, setRegistrations] = useState([]);
    const [winners, setWinners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filterEvent, setFilterEvent] = useState("all");
    const [winnerForm, setWinnerForm] = useState({
        event: "", position: "", participantName: "", college: "",
    });
    const [editingWinner, setEditingWinner] = useState(null);
    const [saving, setSaving] = useState(false);
    const [actionMsg, setActionMsg] = useState("");

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const [regRes, winRes] = await Promise.all([
                fetch("/api/registrations"),
                fetch("/api/winners"),
            ]);

            if (regRes.status === 401) {
                router.replace("/admin");
                return;
            }

            const regData = regRes.ok ? await regRes.json() : [];
            const winData = winRes.ok ? await winRes.json() : [];
            setRegistrations(Array.isArray(regData) ? regData : []);
            setWinners(Array.isArray(winData) ? winData : []);
        } catch {
            setError("Failed to load data.");
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const showMsg = (msg) => {
        setActionMsg(msg);
        setTimeout(() => setActionMsg(""), 3000);
    };

    // Registrations actions
    const approveReg = async (id) => {
        await fetch(`/api/registrations/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "approved" }),
        });
        showMsg("✅ Approved");
        fetchData();
    };

    const deleteReg = async (id) => {
        if (!confirm("Delete this registration?")) return;
        await fetch(`/api/registrations/${id}`, { method: "DELETE" });
        showMsg("🗑️ Deleted");
        fetchData();
    };

    // Winners actions
    const saveWinner = async () => {
        setSaving(true);
        try {
            if (editingWinner) {
                await fetch(`/api/winners/${editingWinner}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(winnerForm),
                });
                showMsg("✅ Winner updated");
            } else {
                await fetch("/api/winners", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(winnerForm),
                });
                showMsg("✅ Winner added");
            }
            setWinnerForm({ event: "", position: "", participantName: "", college: "" });
            setEditingWinner(null);
            fetchData();
        } catch {
            showMsg("❌ Failed to save winner");
        }
        setSaving(false);
    };

    const editWinner = (w) => {
        setEditingWinner(w.id);
        setWinnerForm({ event: w.event, position: w.position, participantName: w.participantName, college: w.college });
        setTab("winners");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const deleteWinner = async (id) => {
        if (!confirm("Delete this winner?")) return;
        await fetch(`/api/winners/${id}`, { method: "DELETE" });
        showMsg("🗑️ Winner deleted");
        fetchData();
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.replace("/admin");
    };

    // Filtered registrations
    const filtered = filterEvent === "all"
        ? registrations
        : registrations.filter((r) => r.event === filterEvent);

    // Stats
    const totalReg = registrations.length;
    const approvedReg = registrations.filter((r) => r.status === "approved").length;
    const pendingReg = registrations.filter((r) => r.status === "pending").length;
    const uniqueEvents = [...new Set(registrations.map((r) => r.event))].length;

    return (
        <div className="dashboard">
            {/* Header */}
            <div className="dash-header">
                <div>
                    <div className="dash-title">
                        NEURO<span>VEX</span> Admin
                    </div>
                    <div className="dash-subtitle">Control Panel</div>
                </div>
                <div className="dash-header-actions">
                    {actionMsg && <div className="action-msg">{actionMsg}</div>}
                    <button className="btn btn-outline" onClick={fetchData} title="Refresh data">
                        🔄 Refresh
                    </button>
                    <button className="btn btn-danger" onClick={handleLogout}>
                        🚪 Logout
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="dash-stats">
                {[
                    { label: "Total Registrations", value: totalReg, icon: "📋" },
                    { label: "Approved", value: approvedReg, icon: "✅" },
                    { label: "Pending", value: pendingReg, icon: "⏳" },
                    { label: "Events Filled", value: uniqueEvents, icon: "🎯" },
                    { label: "Winners Published", value: winners.length, icon: "🏆" },
                ].map((s) => (
                    <div key={s.label} className="stat-card glass-card">
                        <div className="stat-icon">{s.icon}</div>
                        <div className="stat-value">{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="dash-tabs">
                <button
                    className={`tab-btn ${tab === "registrations" ? "tab-btn--active" : ""}`}
                    onClick={() => setTab("registrations")}
                >
                    📋 Registrations ({totalReg})
                </button>
                <button
                    className={`tab-btn ${tab === "winners" ? "tab-btn--active" : ""}`}
                    onClick={() => setTab("winners")}
                >
                    🏆 Winners ({winners.length})
                </button>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {loading ? (
                <div className="spinner" />
            ) : (
                <>
                    {/* ── REGISTRATIONS TAB ── */}
                    {tab === "registrations" && (
                        <div className="tab-content">
                            <div className="tab-toolbar">
                                <div className="filter-group">
                                    <label className="form-label" htmlFor="filter-event">Filter by Event</label>
                                    <select
                                        id="filter-event"
                                        className="form-select"
                                        style={{ width: "220px" }}
                                        value={filterEvent}
                                        onChange={(e) => setFilterEvent(e.target.value)}
                                    >
                                        <option value="all">All Events ({totalReg})</option>
                                        {events.map((e) => {
                                            const count = registrations.filter((r) => r.event === e.slug).length;
                                            return (
                                                <option key={e.slug} value={e.slug}>
                                                    {e.title} ({count})
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <button
                                    className="btn btn-outline"
                                    onClick={() =>
                                        exportCSV(
                                            filtered,
                                            `neurovex_registrations_${filterEvent}_${Date.now()}.csv`
                                        )
                                    }
                                    disabled={filtered.length === 0}
                                >
                                    📥 Export CSV
                                </button>
                            </div>

                            {filtered.length === 0 ? (
                                <div className="dash-empty">No registrations found.</div>
                            ) : (
                                <div className="table-wrap glass-card">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>College</th>
                                                <th>Phone</th>
                                                <th>Email</th>
                                                <th>Event</th>
                                                <th>Team</th>
                                                <th>Timestamp</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filtered.map((r, i) => (
                                                <tr key={r.id}>
                                                    <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                                                    <td style={{ fontWeight: 600, color: "#fff" }}>{r.name}</td>
                                                    <td>{r.college}</td>
                                                    <td>
                                                        <a href={`tel:${r.phone}`} style={{ color: "var(--accent)" }}>{r.phone}</a>
                                                    </td>
                                                    <td>{r.email}</td>
                                                    <td>
                                                        <span className="badge badge-accent" style={{ fontSize: "0.7rem" }}>
                                                            {events.find((e) => e.slug === r.event)?.title || r.event}
                                                        </span>
                                                    </td>
                                                    <td style={{ textAlign: "center" }}>{r.teamSize}</td>
                                                    <td style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                                                        {r.timestamp ? new Date(r.timestamp).toLocaleString("en-IN") : "—"}
                                                    </td>
                                                    <td>
                                                        <span
                                                            className={`badge ${r.status === "approved" ? "badge-success" : r.status === "rejected" ? "badge-danger" : "badge-pending"}`}
                                                        >
                                                            {r.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="action-btns">
                                                            {r.status !== "approved" && (
                                                                <button
                                                                    className="btn btn-success"
                                                                    style={{ padding: "5px 10px", fontSize: "0.72rem" }}
                                                                    onClick={() => approveReg(r.id)}
                                                                >
                                                                    ✅
                                                                </button>
                                                            )}
                                                            <button
                                                                className="btn btn-danger"
                                                                style={{ padding: "5px 10px", fontSize: "0.72rem" }}
                                                                onClick={() => deleteReg(r.id)}
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── WINNERS TAB ── */}
                    {tab === "winners" && (
                        <div className="tab-content">
                            {/* Add / Edit Winner Form */}
                            <div className="glass-card winner-form-card">
                                <h3 className="winner-form-title">
                                    {editingWinner ? "✏️ Edit Winner" : "➕ Add Winner"}
                                </h3>
                                <div className="winner-form-grid">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="w-event">Event *</label>
                                        <select
                                            id="w-event"
                                            className="form-select"
                                            value={winnerForm.event}
                                            onChange={(e) => setWinnerForm((p) => ({ ...p, event: e.target.value }))}
                                        >
                                            <option value="">Select Event</option>
                                            {events.map((e) => (
                                                <option key={e.slug} value={e.title}>{e.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="w-position">Position *</label>
                                        <select
                                            id="w-position"
                                            className="form-select"
                                            value={winnerForm.position}
                                            onChange={(e) => setWinnerForm((p) => ({ ...p, position: e.target.value }))}
                                        >
                                            <option value="">Select Position</option>
                                            <option value="1st">🥇 1st Place</option>
                                            <option value="2nd">🥈 2nd Place</option>
                                            <option value="3rd">🥉 3rd Place</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="w-name">Participant Name *</label>
                                        <input
                                            id="w-name"
                                            type="text"
                                            className="form-input"
                                            placeholder="Winner's name"
                                            value={winnerForm.participantName}
                                            onChange={(e) => setWinnerForm((p) => ({ ...p, participantName: e.target.value }))}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="w-college">College *</label>
                                        <input
                                            id="w-college"
                                            type="text"
                                            className="form-input"
                                            placeholder="Winner's college"
                                            value={winnerForm.college}
                                            onChange={(e) => setWinnerForm((p) => ({ ...p, college: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div className="winner-form-actions">
                                    <button
                                        className="btn btn-primary"
                                        onClick={saveWinner}
                                        disabled={saving || !winnerForm.event || !winnerForm.position || !winnerForm.participantName || !winnerForm.college}
                                    >
                                        {saving ? "Saving..." : editingWinner ? "💾 Update Winner" : "➕ Add Winner"}
                                    </button>
                                    {editingWinner && (
                                        <button
                                            className="btn btn-outline"
                                            onClick={() => { setEditingWinner(null); setWinnerForm({ event: "", position: "", participantName: "", college: "" }); }}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Winners Table */}
                            {winners.length === 0 ? (
                                <div className="dash-empty">No winners published yet.</div>
                            ) : (
                                <div className="table-wrap glass-card">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Event</th>
                                                <th>Position</th>
                                                <th>Name</th>
                                                <th>College</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {winners.map((w) => (
                                                <tr key={w.id}>
                                                    <td>
                                                        <span className="badge badge-accent" style={{ fontSize: "0.7rem" }}>{w.event}</span>
                                                    </td>
                                                    <td>
                                                        <span className={`badge ${w.position === "1st" ? "badge-gold" : w.position === "2nd" ? "badge-silver" : "badge-bronze"}`}>
                                                            {w.position === "1st" ? "🥇" : w.position === "2nd" ? "🥈" : "🥉"} {w.position}
                                                        </span>
                                                    </td>
                                                    <td style={{ fontWeight: 600, color: "#fff" }}>{w.participantName}</td>
                                                    <td>{w.college}</td>
                                                    <td>
                                                        <div className="action-btns">
                                                            <button
                                                                className="btn btn-outline"
                                                                style={{ padding: "5px 10px", fontSize: "0.72rem" }}
                                                                onClick={() => editWinner(w)}
                                                            >
                                                                ✏️
                                                            </button>
                                                            <button
                                                                className="btn btn-danger"
                                                                style={{ padding: "5px 10px", fontSize: "0.72rem" }}
                                                                onClick={() => deleteWinner(w.id)}
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}

            <style jsx>{`
        .dashboard {
          padding: 24px 32px 60px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .dash-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .dash-title {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          color: #fff;
        }

        .dash-title span {
          color: var(--accent);
          text-shadow: 0 0 16px var(--accent);
        }

        .dash-subtitle {
          font-family: var(--font-heading);
          font-size: 0.68rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .dash-header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .action-msg {
          font-size: 0.85rem;
          color: #34d399;
          font-weight: 600;
          padding: 6px 12px;
          background: rgba(52, 211, 153, 0.1);
          border: 1px solid rgba(52, 211, 153, 0.3);
          border-radius: 8px;
          animation: fadeInUp 0.3s ease;
        }

        .dash-stats {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-card {
          padding: 20px 16px;
          text-align: center;
        }

        .stat-icon { font-size: 1.6rem; margin-bottom: 8px; }

        .stat-value {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--accent);
          text-shadow: 0 0 12px var(--accent);
          line-height: 1;
          margin-bottom: 6px;
        }

        .stat-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
        }

        .dash-tabs {
          display: flex;
          gap: 4px;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0;
        }

        .tab-btn {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          background: none;
          border: none;
          padding: 12px 20px;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          margin-bottom: -1px;
        }

        .tab-btn:hover { color: var(--text-primary); }

        .tab-btn--active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }

        .tab-content { margin-top: 0; }

        .tab-toolbar {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .table-wrap {
          padding: 0;
          overflow: hidden;
          overflow-x: auto;
        }

        .action-btns {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .dash-empty {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-muted);
          font-size: 0.9rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
        }

        /* Winner form */
        .winner-form-card {
          padding: 28px;
          margin-bottom: 24px;
        }

        .winner-form-title {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }

        .winner-form-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 16px;
        }

        .winner-form-actions {
          display: flex;
          gap: 12px;
        }

        /* Medal badges */
        .badge-gold { background: rgba(255,215,0,0.12); border: 1px solid rgba(255,215,0,0.3); color: #ffd700; }
        .badge-silver { background: rgba(192,192,192,0.12); border: 1px solid rgba(192,192,192,0.3); color: #c0c0c0; }
        .badge-bronze { background: rgba(205,127,50,0.12); border: 1px solid rgba(205,127,50,0.3); color: #cd7f32; }

        @media (max-width: 1200px) {
          .dash-stats { grid-template-columns: repeat(3, 1fr); }
          .winner-form-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .dashboard { padding: 16px 16px 40px; }
          .dash-stats { grid-template-columns: repeat(2, 1fr); }
          .winner-form-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
}
