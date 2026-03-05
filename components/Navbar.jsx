"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/register", label: "Register" },
    { href: "/winners", label: "Winners" },
    { href: "/coordinators", label: "Coordinators" },
    { href: "/venue", label: "Venue" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <nav className="navbar">
                <Link href="/" className="nav-logo">
                    <span className="logo-text">NEURO</span>
                    <span className="logo-accent">VEX</span>
                    <span className="logo-year">2K26</span>
                </Link>

                <div className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`nav-link ${pathname === link.href ? "nav-link--active" : ""}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/register" className="btn btn-primary nav-cta" onClick={() => setMenuOpen(false)}>
                        Register Now
                    </Link>
                </div>

                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`ham-bar ${menuOpen ? "ham-bar--top-open" : ""}`} />
                    <span className={`ham-bar ${menuOpen ? "ham-bar--mid-open" : ""}`} />
                    <span className={`ham-bar ${menuOpen ? "ham-bar--bot-open" : ""}`} />
                </button>
            </nav>

            {menuOpen && (
                <div
                    className="nav-overlay"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 70px;
          background: rgba(4, 12, 24, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 212, 255, 0.15);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }

        .nav-logo {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .logo-text {
          color: #ffffff;
        }

        .logo-accent {
          color: var(--accent);
          text-shadow: 0 0 16px var(--accent);
        }

        .logo-year {
          font-size: 0.65rem;
          color: var(--text-muted);
          font-weight: 500;
          margin-left: 8px;
          margin-top: 2px;
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid var(--border);
          padding: 2px 8px;
          border-radius: 100px;
          letter-spacing: 0.05em;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-link {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-secondary);
          padding: 8px 12px;
          border-radius: 8px;
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
          position: relative;
        }

        .nav-link:hover {
          color: var(--accent);
          background: rgba(0, 212, 255, 0.08);
        }

        .nav-link--active {
          color: var(--accent);
          background: rgba(0, 212, 255, 0.1);
        }

        .nav-link--active::after {
          content: "";
          position: absolute;
          bottom: 2px;
          left: 12px;
          right: 12px;
          height: 2px;
          background: var(--accent);
          border-radius: 1px;
          box-shadow: 0 0 6px var(--accent);
        }

        .nav-cta {
          margin-left: 8px;
          padding: 8px 20px !important;
          font-size: 0.72rem !important;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          z-index: 1010;
        }

        .ham-bar {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--accent);
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
          transform-origin: center;
        }

        .ham-bar--top-open { transform: translateY(7px) rotate(45deg); }
        .ham-bar--mid-open { opacity: 0; }
        .ham-bar--bot-open { transform: translateY(-7px) rotate(-45deg); }

        .nav-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 998;
        }

        @media (max-width: 900px) {
          .navbar { padding: 0 20px; }

          .nav-links {
            position: fixed;
            top: 70px;
            right: 0;
            bottom: 0;
            width: 280px;
            flex-direction: column;
            align-items: flex-start;
            background: rgba(4, 12, 24, 0.98);
            backdrop-filter: blur(20px);
            border-left: 1px solid var(--border);
            padding: 32px 24px;
            gap: 8px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            z-index: 999;
          }

          .nav-links--open {
            transform: translateX(0);
          }

          .nav-link {
            font-size: 0.8rem;
            padding: 12px 16px;
            width: 100%;
          }

          .nav-cta {
            margin-left: 0 !important;
            margin-top: 16px;
            width: 100%;
            justify-content: center;
          }

          .hamburger { display: flex; }
        }
      `}</style>
        </>
    );
}
