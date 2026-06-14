import { motion } from "motion/react";
import { Linkedin, Mail } from "lucide-react";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

type Language = "en" | "ar";

type IconProps = {
  className?: string;
};

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.3-4.4A8.4 8.4 0 1 1 20.5 11.8Z" />
      <path d="M8.6 8.2c.2-.5.4-.6.8-.6h.6c.2 0 .5.1.6.5l.5 1.2c.1.3.1.5-.1.7l-.4.5c.7 1.4 1.8 2.4 3.2 3.1l.5-.4c.2-.2.5-.2.8-.1l1.2.5c.4.2.5.4.5.7v.5c0 .5-.3.8-.7 1-1.1.4-3.2-.1-5.2-2.1-2-1.9-2.6-4.1-2.3-5.5Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "CV", href: asset("Abdelrahman_Abouelella_CV.docx"), download: true },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/abdelrahman-abouelella-2bb80a388/", external: true },
  { icon: WhatsAppIcon, label: "WhatsApp", href: "https://wa.me/201117739645", external: true },
  { icon: Mail, label: "Email", href: "mailto:abdo.abouelella96@gmail.com" },
];

export function Hero({ language = "en" }: { language?: Language }) {
  const isArabic = language === "ar";

  return (
    <section
      className={`relative min-h-[calc(100vh-88px)] xl:min-h-[90vh] overflow-hidden flex items-center px-6 lg:px-16 py-14 lg:py-20 ${isArabic ? "justify-end" : ""}`}
      id="home"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Full hero sketch image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={asset("portrait.png")}
          alt="Pencil sketch portrait of Abdelrahman in a business systems workspace"
          className={`h-full w-full object-cover object-center pointer-events-none select-none opacity-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isArabic
              ? "scale-100 -translate-x-[42%]"
              : "scale-100 translate-x-0"
          }`}
        />

        {isArabic ? (
          <>
            {/* Arabic state: the viewport pans across the same image. No mirroring. The readable area moves to the right. */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#1a1a1a]/94 via-[#292929]/72 to-[#f4f3ef]/10" />
            <div className="absolute inset-y-0 right-0 w-[64%] bg-[radial-gradient(circle_at_78%_44%,rgba(18,18,18,0.96)_0%,rgba(28,28,28,0.84)_35%,rgba(42,42,42,0.46)_58%,transparent_80%)]" />
          </>
        ) : (
          <>
            {/* Soft paper wash on the text side so the writing stays readable while the image still fills the hero */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/92 via-[#292929]/70 to-[#f4f3ef]/10" />
            <div className="absolute inset-y-0 left-0 w-[60%] bg-[radial-gradient(circle_at_20%_44%,rgba(18,18,18,0.96)_0%,rgba(28,28,28,0.82)_35%,rgba(42,42,42,0.42)_56%,transparent_78%)]" />
          </>
        )}
      </div>

      {/* Subtle grid layer to keep the blueprint/sketch identity */}
      <div className="absolute inset-0 z-[1] blueprint-grid opacity-20 pointer-events-none" />

      {/* Social buttons */}
      <motion.div
        initial={{ opacity: 0, x: isArabic ? -18 : 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className={`absolute ${isArabic ? "left-3 md:left-5" : "right-3 md:right-5"} top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4`}
        aria-label="Social links"
      >
        {socialLinks.map(({ icon: Icon, label, href, download, external }) => (
          <a
            key={label}
            href={href}
            download={download ? "Abdelrahman_Abouelella_CV.docx" : undefined}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            aria-label={label === "CV" ? "Download CV" : label}
            className="group w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-background/80 backdrop-blur-sm text-foreground border border-border sketch-border shadow-sm hover:bg-foreground hover:text-background transition-all duration-300"
          >
            {Icon ? (
              <Icon className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300" />
            ) : (
              <span className="text-[10px] md:text-xs font-black tracking-[0.14em] group-hover:scale-110 transition-transform duration-300">CV</span>
            )}
          </a>
        ))}
      </motion.div>

      {/* Content */}
      <div className={`relative z-20 w-full max-w-[760px] ${isArabic ? "mr-auto lg:mr-0 lg:ml-auto text-right" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <motion.svg
            className={`absolute top-28 ${isArabic ? "right-[48%]" : "left-[48%]"} w-40 h-40 opacity-25 text-foreground/40 -z-10 hidden sm:block`}
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          >
            <path d="M10,50 Q30,20 50,50 T90,50 Q80,80 50,80 T10,50 Z" strokeDasharray="5,5" />
          </motion.svg>

          <div className="mb-3">
            <span className="text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] text-[#7f9dc3] [font-family:'Caveat',cursive] font-semibold leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.18)]">
              {isArabic ? "أهلاً، أنا" : "Hi, I\u0027m"}
            </span>
          </div>

          <div className="relative inline-block mb-5">
            <h1 className="text-[3.1rem] sm:text-[4.1rem] md:text-[5rem] lg:text-[5.9rem] text-[#7f9dc3] [font-family:'Caveat',cursive] font-bold leading-[0.95] drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)]">
              {isArabic ? "عبد الرحمن" : "Abdelrahman"}
            </h1>
          </div>

          <div className="relative inline-block mb-8 max-w-full">
            <h2 className={`text-[2.7rem] sm:text-[3.8rem] md:text-[4.6rem] lg:text-[5.2rem] xl:text-[5.7rem] font-serif font-bold italic text-[#fff8ed] leading-[0.9] tracking-tighter max-w-full drop-shadow-[0_3px_14px_rgba(0,0,0,0.35)] ${isArabic ? "" : "whitespace-nowrap"}`}>
              {isArabic ? "مطور Full-Stack" : "Full-Stack Developer"}
            </h2>
            <motion.svg
              className={`absolute -bottom-4 ${isArabic ? "right-0" : "left-0"} w-full h-8 text-[#d59a52] z-0 opacity-95 ${isArabic ? "scale-x-[-1]" : ""}`}
              viewBox="0 0 300 20"
              preserveAspectRatio="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            >
              <path d="M5 15 Q 150 -5 295 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </motion.svg>
          </div>

          <div className={`mb-8 ${isArabic ? "min-h-[3.4rem]" : "h-[2.9rem] md:h-[3.35rem]"} relative inline-flex items-start max-w-full`}>
            <motion.div
              className="overflow-hidden whitespace-nowrap max-w-full"
              initial={{ clipPath: isArabic ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              transition={{ duration: 2.35, delay: 2.15, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <span className={`inline-block ${isArabic ? "pl-2 text-[1.65rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.45rem]" : "pr-2 text-[2rem] sm:text-[2.25rem] md:text-[2.55rem]"} text-[#d59a52] [font-family:'Caveat',cursive] font-bold leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.22)]`}>
                {isArabic ? "مطور أنظمة برمجية مخصصة متكاملة" : "Custom End-to-End Software Builder"}
              </span>
            </motion.div>
          </div>

          <p className={`text-base md:text-xl text-[#f2eadf] leading-relaxed font-semibold mb-12 max-w-2xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.28)] ${isArabic ? "ml-auto" : ""}`}>
            {isArabic
              ? "أحوّل الأفكار إلى برامج عملية، مبنية بوضوح ودقة، وجاهزة للتشغيل."
              : "I turn ideas into custom software, engineered with clarity, precision, and production-ready execution."}
          </p>

          <div className={`flex flex-col sm:flex-row items-center gap-6 relative mt-4 ${isArabic ? "sm:justify-start" : ""}`}>
            <motion.svg
              className={`absolute ${isArabic ? "-right-16 scale-x-[-1]" : "-left-16"} -top-10 w-12 h-12 text-[#d5cab6] hidden lg:block opacity-90`}
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
            >
              <path d="M10 10 Q 50 80 90 80 M 75 65 L 90 80 L 65 95" />
            </motion.svg>

            <a
              href="#contact"
              className="hero-sketch-button-primary w-full sm:w-auto text-center px-12 py-5 font-bold tracking-[0.1em] uppercase text-sm relative z-10"
            >
              {isArabic ? "تواصل معي" : "Contact Me"}
            </a>
            <a
              href="#projects"
              className="hero-sketch-button-secondary w-full sm:w-auto text-center px-12 py-5 tracking-[0.1em] uppercase text-sm font-bold relative z-10 backdrop-blur-sm"
            >
              {isArabic ? "استعرض الأنظمة" : "View Systems"}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}