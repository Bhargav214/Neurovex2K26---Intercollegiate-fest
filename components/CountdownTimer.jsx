"use client";
import { useState, useEffect } from "react";

function pad(n) {
    return String(n).padStart(2, "0");
}

export default function CountdownTimer({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const target = new Date(targetDate).getTime();

        const tick = () => {
            const now = Date.now();
            const diff = target - now;

            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    if (!timeLeft) {
        return (
            <div className="countdown">
                <div className="countdown-loading">Calculating...</div>
            </div>
        );
    }

    const isOver = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

    if (isOver) {
        return (
            <div className="countdown">
                <div className="countdown-over">🎉 The Fest is LIVE!</div>
            </div>
        );
    }

    const units = [
        { label: "Days", value: pad(timeLeft.days) },
        { label: "Hours", value: pad(timeLeft.hours) },
        { label: "Minutes", value: pad(timeLeft.minutes) },
        { label: "Seconds", value: pad(timeLeft.seconds) },
    ];

    return (
        <div className="countdown">
            {units.map((u, i) => (
                <div key={u.label} className="countdown-unit">
                    <div className="countdown-value" aria-label={u.label}>
                        {u.value}
                    </div>
                    <div className="countdown-label">{u.label}</div>
                    {i < units.length - 1 && <div className="countdown-sep">:</div>}
                </div>
            ))}

            <style jsx>{`
        .countdown {
          display: flex;
          align-items: flex-start;
          gap: 0;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .countdown-loading,
        .countdown-over {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          color: var(--accent);
          text-shadow: 0 0 20px var(--accent);
          letter-spacing: 0.1em;
        }

        .countdown-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .countdown-value {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          color: #fff;
          background: rgba(0, 20, 50, 0.8);
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 12px;
          min-width: clamp(80px, 12vw, 120px);
          text-align: center;
          padding: 16px 8px;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.2), inset 0 1px 0 rgba(255,255,255,0.05);
          position: relative;
          overflow: hidden;
          line-height: 1;
        }

        .countdown-value::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(0, 212, 255, 0.15);
        }

        .countdown-label {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          margin-top: 8px;
          text-shadow: 0 0 10px var(--accent);
        }

        .countdown-sep {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: var(--accent);
          opacity: 0.6;
          padding: 16px 4px 0;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.1; }
        }

        @media (max-width: 480px) {
          .countdown { gap: 8px; }
          .countdown-value { min-width: 68px; padding: 12px 4px; }
        }
      `}</style>
        </div>
    );
}
