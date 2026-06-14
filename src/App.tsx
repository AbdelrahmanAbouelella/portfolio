/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";

import { Comparison } from "./components/Comparison";
import { Capabilities } from "./components/Capabilities";
import { Process } from "./components/Process";
import { Architecture } from "./components/Architecture";
import { CaseStudies } from "./components/CaseStudies";
import { TechStack } from "./components/TechStack";
import { WhyMe } from "./components/WhyMe";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { ChatbotWidget } from "./components/ChatbotWidget";

import { Comparison as ComparisonAr } from "./components/ar/Comparison";
import { Capabilities as CapabilitiesAr } from "./components/ar/Capabilities";
import { Process as ProcessAr } from "./components/ar/Process";
import { Architecture as ArchitectureAr } from "./components/ar/Architecture";
import { CaseStudies as CaseStudiesAr } from "./components/ar/CaseStudies";
import { TechStack as TechStackAr } from "./components/ar/TechStack";
import { WhyMe as WhyMeAr } from "./components/ar/WhyMe";
import { CTA as CTAAr } from "./components/ar/CTA";
import { Footer as FooterAr } from "./components/ar/Footer";
import { ChatbotWidget as ChatbotWidgetAr } from "./components/ar/ChatbotWidget";

type Language = "en" | "ar";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem("portfolio-language") === "ar" ? "ar" : "en";
}

export default function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language === "ar" ? "ar" : "en";
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  const isArabic = language === "ar";

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8 flex min-h-[100dvh]">
      <div className="relative flex flex-col flex-grow bg-background rounded-3xl md:rounded-[2.5rem] border border-border overflow-hidden shadow-2xl shadow-black/20 transition-colors duration-300">
        <Navbar
          language={language}
          onToggleLanguage={() => setLanguage((current) => current === "en" ? "ar" : "en")}
        />

        <main className="flex-grow">
          <Hero language={language} />
          {isArabic ? (
            <>
              <ComparisonAr />
              <CapabilitiesAr />
              <ProcessAr />
              <ArchitectureAr />
              <CaseStudiesAr />
              <TechStackAr />
              <WhyMeAr />
              <CTAAr />
            </>
          ) : (
            <>
              <Comparison />
              <Capabilities />
              <Process />
              <Architecture />
              <CaseStudies />
              <TechStack />
              <WhyMe />
              <CTA />
            </>
          )}
        </main>

        {isArabic ? <FooterAr /> : <Footer />}
        {isArabic ? <ChatbotWidgetAr /> : <ChatbotWidget />}
      </div>
    </div>
  );
}
