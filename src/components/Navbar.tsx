import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

type Language = "en" | "ar";

type NavbarProps = {
  language: Language;
  onToggleLanguage: () => void;
};

const navLabels = {
  en: {
    why: "Why Me?",
    process: "Process",
    projects: "Featured Systems",
    toggle: "عربي",
    toggleLabel: "Switch to Arabic",
  },
  ar: {
    why: "العمل معي",
    process: "طريقة العمل",
    projects: "أنظمة مختارة",
    toggle: "English",
    toggleLabel: "Switch to English",
  },
};

export function Navbar({ language, onToggleLanguage }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const labels = navLabels[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav 
      dir={language === "ar" ? "rtl" : "ltr"}
      className={cn(
        "sticky top-0 z-50 transition-all duration-500 px-6 py-6 md:px-12",
        isScrolled ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm py-4" : "bg-transparent"
      )}
    >
      <div className="w-full flex items-center justify-between">
        <a href="#" className="group relative inline-flex items-center py-2">
          <span className="relative inline-block font-serif text-2xl md:text-[2rem] font-medium tracking-[0.08em] text-foreground leading-none">
            <span className="relative z-10">
              {language === "ar" ? "أبو العلا" : "Abouelella"}<span className="text-secondary-400">.</span>
            </span>
            <svg
              aria-hidden="true"
              className={`absolute ${language === "ar" ? "right-[-0.15em]" : "left-[-0.15em]"} bottom-[0.02em] z-0 h-[0.68em] w-[calc(100%+0.3em)] -rotate-2 overflow-visible`}
              viewBox="0 0 100 16"
              preserveAspectRatio="none"
            >
              <path
                d="M3 10.5 C18 7.8 36 8.8 51 7.9 C66 7 83 8.5 97 6.5"
                fill="none"
                stroke="#f5d547"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.72"
              />
            </svg>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8 text-sm font-bold tracking-wide">
          <a href="#why-me" className="text-foreground/90 hover:text-ink-blue transition-colors uppercase text-xs sketch-underline">{labels.why}</a>
          <a href="#process" className="text-foreground/90 hover:text-ink-blue transition-colors uppercase text-xs sketch-underline">{labels.process}</a>
          <a href="#projects" className="text-foreground/90 hover:text-ink-blue transition-colors uppercase text-xs sketch-underline">{labels.projects}</a>

          <div className="w-px h-8 border-l border-dashed border-border mx-2" />

          <button
            type="button"
            onClick={onToggleLanguage}
            className="sketch-button-primary px-8 py-3 font-bold uppercase text-xs ml-4"
            aria-label={labels.toggleLabel}
          >
            {labels.toggle}
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-4">
          <button 
            className="p-2 -mr-2 text-foreground/70 hover:text-foreground sketch-border"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-surface border-b border-border py-6 px-6 shadow-2xl flex flex-col gap-6 blueprint-grid">
          <a href="#why-me" onClick={closeMobileMenu} className="text-sm tracking-widest uppercase font-bold text-foreground/90 hover:text-ink-blue w-max sketch-underline">{labels.why}</a>
          <a href="#process" onClick={closeMobileMenu} className="text-sm tracking-widest uppercase font-bold text-foreground/90 hover:text-ink-blue w-max sketch-underline">{labels.process}</a>
          <a href="#projects" onClick={closeMobileMenu} className="text-sm tracking-widest uppercase font-bold text-foreground/90 hover:text-ink-blue w-max sketch-underline">{labels.projects}</a>
          <button
            type="button"
            onClick={() => {
              closeMobileMenu();
              onToggleLanguage();
            }}
            className="w-full text-center py-4 sketch-button-primary font-bold text-sm tracking-widest uppercase mt-4"
            aria-label={labels.toggleLabel}
          >
            {labels.toggle}
          </button>
        </div>
      )}
    </nav>
  );
}
