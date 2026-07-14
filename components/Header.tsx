"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { LeadButton } from "@/components/LeadButton";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-container header-inner">
        <a href="#top" aria-label="jclick" className="header-logo">
          <Logo compact />
        </a>
        <LeadButton arrow className="header-cta" />
      </div>
    </header>
  );
}
