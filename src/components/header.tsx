import Image from "next/image";
import Link from "next/link";
import { siteLinks } from "../data/portfolio";

export function Header() {
  return (
    <header className="glass-nav site-header">
      <div className="container nav-shell">
        <Link className="brand" href="/" aria-label="Go to home">
          <span className="brand-avatar">
            <Image src="/Ayyaz.jpg" alt="Muhammad Ayyaz" fill sizes="48px" className="avatar-image" priority />
          </span>
          <span className="brand-copy">
            <span className="brand-name"></span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {siteLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="button button-ghost" href="/contact">
          Contact
        </Link>
      </div>
    </header>
  );
}