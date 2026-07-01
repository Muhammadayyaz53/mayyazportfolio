"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteLinks } from "../data/portfolio";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="glass-nav site-header">
      <div className="container nav-shell">
        <div style={{ display: "flex" }}>
          <Link className="brand" href="/" aria-label="Go to home">
            <span className="brand-avatar">
              <Image src="/Ayyaz.jpg" alt="Muhammad Ayyaz" fill sizes="48px" className="avatar-image" priority />
            </span>
            <span className="brand-copy">
              <span className="brand-name"></span>
            </span>
          </Link>
        </div>

        <nav className="nav-links" aria-label="Primary">
          {siteLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "16px" }}>
          <Link className="button button-ghost desktop-only" href="/contact">
            Contact
          </Link>

          {/* Mobile hamburger button */}
          <button
            className={`mobile-menu-btn ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>

      {/* Mobile nav overlay */}
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <div className="mobile-nav-links" style={{ gap: "24px" }}>
            {siteLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: "1.5rem" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div style={{ marginTop: "auto", display: "flex", justifyContent: "center" }}>
             <Link 
               className="button button-primary" 
               href="/contact"
               onClick={() => setMenuOpen(false)}
               style={{ width: "100%", maxWidth: "300px" }}
             >
               Contact
             </Link>
          </div>
        </nav>
      )}
    </header>
  );
}