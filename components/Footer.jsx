import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-root">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">NEURO<span>VEX</span> 2K26</div>
          <p className="footer-tagline">
            Intercollegiate IT Fest — Powering the next generation of tech innovators.
          </p>
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <Link href="/" className="footer-link">Home</Link>
          <Link href="/events" className="footer-link">Events</Link>
          <Link href="/register" className="footer-link">Register</Link>
          <Link href="/winners" className="footer-link">Winners</Link>
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">Info</h4>
          <Link href="/coordinators" className="footer-link">Coordinators</Link>
          <Link href="/venue" className="footer-link">Venue</Link>
        </div>
      </div>
      <div className="footer-bottom-wrap">
        <div className="footer-divider-line" />
        <div className="footer-bottom">
          <span>© {year} NEUROVEX 2K26. Department of MCA.</span>
          <span>Powered by Innovation ⚡</span>
        </div>
      </div>
    </footer>
  );
}
