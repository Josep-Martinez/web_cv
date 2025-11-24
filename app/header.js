/**
 * Header Component
 * 
 * Responsive navigation header with "liquid glass" effect on scroll.
 * Features:
 * - Transforms into pill shape with glassmorphism when scrolled
 * - Mobile hamburger menu with full-screen overlay
 * - Auto-scroll to top on navigation
 * - Language-aware navigation labels
 * 
 * HOW TO MODIFY:
 * - Glass effect: Adjust bg-navy-900/30, backdrop-blur-xl, border-white/10
 * - Scroll trigger: Change threshold in line 19 (currently 20px)
 * - Add/remove pages: Modify navLinks array
 * - Enable chat link: Set SHOW_CHAT_LINK to true
 */

// app/header.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LanguageContext";
import { useState, useEffect } from "react";
import UfoLink from "./components/layout/UfoLink";
import SpaceRunnerGame from "./components/space-runner/SpaceRunnerGame";

// Toggle to show/hide chat link in navigation
const SHOW_CHAT_LINK = false;

export default function Header() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eggUnlocked, setEggUnlocked] = useState(false);

  useEffect(() => {
    // Listen for unlock event
    const handleUnlock = () => setEggUnlocked(true);
    window.addEventListener("unlockSpaceRunner", handleUnlock);

    // Reset if navigating away from game or works (logic: if unlocked, and we change path, check if we are going to game)
    // Actually, user wants: "si cambias de pagina se vuelve a reiniciar".
    // So if we are unlocked, and pathname changes to anything OTHER than /space-runner, we reset.
    // But we also need to allow going FROM works TO space-runner.
    // And FROM space-runner back to home (reset).

    return () => window.removeEventListener("unlockSpaceRunner", handleUnlock);
  }, []);

  // Reset logic on pathname change
  useEffect(() => {
    if (eggUnlocked) {
      if (pathname !== "/space-runner" && pathname !== "/works") {
        // If we are not on the game page and not on the works page (where we unlocked it),
        // wait... if we unlock on works, we are on works. Then we click link to go to /space-runner.
        // So transition works -> space-runner should be allowed.
        // Transition space-runner -> anywhere else should reset.
        // Transition works -> anywhere else should reset.

        // Actually, simpler: If we are NOT on /space-runner, and we move to another page that is NOT /space-runner, we reset?
        // No, we need to see the link on /works to click it.
        // So if we leave /works and go to /space-runner -> Keep unlocked.
        // If we leave /works and go to /about -> Reset.
        // If we leave /space-runner -> Reset.

        // Let's try: If target is NOT /space-runner, reset.
        // But we are on /works when we unlock.
        // So if we are on /works, we see the link.
        // If we click it, we go to /space-runner.
        // If we click "About", we go to /about.

        // So, if pathname is NOT /space-runner AND NOT /works... reset?
        // But if we are on /space-runner, we want to play.
        // If we go back to /works, should it still be there? User said "si cambias de pagina se vuelve a reiniciar".
        // Maybe strictly: The link appears. If you navigate anywhere else (except the game), it's gone.
        // If you go to the game, you are playing. If you leave the game, it's gone.
      }

      // Strict Reset:
      // If we are navigating TO something that is NOT /space-runner, and we are NOT currently on /space-runner (waiting to go there? no pathname updates after nav).
      // Let's just say: If we are not on /space-runner, and we are not on /works (where it spawned), reset.
      // But wait, if I am on /works, unlock it, then go to /about, it should reset.
      // If I am on /works, unlock it, then go to /space-runner, it should stay (or just not matter because we are on the game page).

      if (pathname !== "/works" && pathname !== "/space-runner") {
        setEggUnlocked(false);
      }
    }
  }, [pathname, eggUnlocked]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const texts = {
    EN: { about: "About", experience: "Experience", projects: "Projects", chat: "Chat", contact: "Contact" },
    ES: { about: "Sobre mí", experience: "Experiencia", projects: "Proyectos", chat: "Chat", contact: "Contacto" },
  };

  const navLinks = [
    { href: "/", label: texts[language].about },
    { href: "/works", label: texts[language].experience },
    { href: "/projects", label: texts[language].projects },
    { href: "/contact", label: texts[language].contact },
  ];

  if (SHOW_CHAT_LINK) {
    navLinks.splice(3, 0, { href: "/chat", label: texts[language].chat });
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-center ${scrolled ? "py-4" : "py-6"
          }`}
      >
        <div
          className={`relative flex items-center justify-between px-6 transition-all duration-500 ${scrolled
            ? "w-[90%] md:w-[80%] max-w-5xl h-14 rounded-full bg-navy-900/30 backdrop-blur-xl border border-white/10 shadow-lg"
            : "w-full max-w-7xl h-20 bg-transparent border border-transparent rounded-none"
            }`}
        >

          <div className="flex items-center z-10">
            <Link
              href="/"
              className="group flex items-center gap-2"
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className={`w-8 h-8 border-2 border-electric rounded-full flex items-center justify-center text-electric font-bold font-mono text-lg transition-all duration-300 ${scrolled ? "scale-90" : "scale-100"}`}>
                J
              </div>
              <span className={`font-heading font-bold text-xl text-gray-100 tracking-tight group-hover:text-electric transition-colors ${scrolled ? "text-lg" : "text-xl"}`}>
                Josep Martínez
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 z-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full font-sans text-sm font-medium transition-all duration-300 ${isActive
                    ? "text-navy-900 bg-electric shadow-[0_0_15px_rgba(100,255,218,0.4)]"
                    : "text-slate-light hover:text-white hover:bg-white/10"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* UFO Link (Visible on both Mobile & Desktop) */}
          {eggUnlocked && <UfoLink />}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-electric z-10 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-navy-900/90 backdrop-blur-xl transition-all duration-300 md:hidden flex items-center justify-center ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-2xl font-heading font-bold transition-all duration-300 transform ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  } ${isActive ? "text-electric" : "text-slate-light hover:text-white"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}