"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Login failed.");
                setStatus("idle");
            } else {
                router.replace("/admin/dashboard");
            }
        } catch {
            setError("Network error. Please try again.");
            setStatus("idle");
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-card glass-card cyber-corners">
                <div className="admin-login-logo">
                    NEURO<span>VEX</span>
                </div>
                <div className="admin-login-subtitle">Admin Access Portal</div>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            className="form-input"
                            placeholder="Admin username"
                            value={form.username}
                            onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                            required
                            autoComplete="username"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: "100%", justifyContent: "center", marginTop: "8px" }}
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? "Authenticating..." : "🔐 Login"}
                    </button>
                </form>

                <p className="admin-login-note">
                    🔒 Secured area — admin access only
                </p>
            </div>

            <style jsx>{`
        .admin-login-page {
          min-height: calc(100vh - 70px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }

        .admin-login-card {
          width: 100%;
          max-width: 420px;
          padding: 48px 40px;
        }

        .admin-login-logo {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          color: #fff;
          text-align: center;
          margin-bottom: 4px;
        }

        .admin-login-logo span {
          color: var(--accent);
          text-shadow: 0 0 20px var(--accent);
        }

        .admin-login-subtitle {
          font-family: var(--font-heading);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 32px;
        }

        .admin-login-note {
          text-align: center;
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-top: 20px;
        }
      `}</style>
        </div>
    );
}
