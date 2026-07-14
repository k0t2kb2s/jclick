"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { LeadButton } from "@/components/LeadButton";

const navLinks = [
  { href: "#how", label: "Как работает" },
  { href: "#pricing", label: "Цены" },
  { href: "#faq", label: "Вопросы" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    const frame = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-container header-inner">
        <a href="#top" aria-label="jclick" className="header-logo">
          <Logo compact />
        </a>
        <nav className="header-nav" aria-label="Разделы страницы">
          {navLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <LeadButton arrow className="header-cta" />
      </div>
    </header>
  );
}
