import { useState, useEffect } from 'react';
import { Globe, Menu, X, Mail, Calendar, Download, Linkedin, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import { Dialog, DialogContent, DialogTrigger } from './components/ui/dialog';
import NeonUIButton from "./components/ui/neon-button";
import CalendlyModal from "./components/calendly-modal";
import { cn } from "./lib/utils";
 

const content = {
  en: {
    nav: {
      projects: 'Projects',
      skills: 'Skills',
      about: 'About',
      bookMeeting: 'Book a meeting',
    },
    hero: {
      title: 'Abdelrahman Abouelella',
      subtitle: 'Data Analyst | AI Automation Engineer',
      oneliner: "I'm an AI Automation Engineer & Data Analyst specialized in building fully automated data analytics ecosystems - from Python ETL pipelines and machine learning workflows to Power BI dashboards and scheduled Excel/PDF reports. I transform fragmented, manual reporting processes into 24/7, bilingual insight systems that operate seamlessly in both Arabic and English environments. My work connects data from sales, finance, and HR systems into unified analytics layers that empower decision-makers with real-time visibility, executive summaries, and predictive insights.",
      viewProjects: 'View Projects',
      email: 'Email',
      downloadCV: 'Download CV',
      linkedin: 'LinkedIn',
      whatsapp: 'WhatsApp',
    },
    sections: {
      projects: 'Projects',
      skills: 'Skills',
      about: 'About',
    },
    tabs: ['Analytics Automation', 'Data Infrastructure', 'BI & AI Solutions'],
    readCaseStudy: 'Read case study',
    cards: {
      SARA: {
        title: 'SARA ( Sales AI Analytics & Reporting Automation )',
        impact: 'Reduced manual prep by 70–90%; unified "single source of truth".',
        bullets: [
          'Python ETL → governed CSVs → Power BI',
          'Holt-Winters forecasting with confidence bands',
          'Rolling MAPE/MAE backtests + anomaly detection (STL/IsolationForest)',
          'Scenario controls (price/volume/discount) + bilingual executive narrative',
          'Run logging & alerts',
        ],
        group: 0,
      },
      FARA: {
        title: 'FARA ( Financial AI Analytics & Reporting Automation )',
        impact: 'Month-end insight faster by 1–2 days; better cash-flow visibility.',
        bullets: [
          'ERP Actuals (GL/AR/AP), Budget/Forecast, FX scenarios mapped to P&L/BS/CF',
          'Forecasts for Revenue/Opex/EBITDA + backtesting (MAPE tracking)',
          'Anomaly detection (STL/IsolationForest/Benford)',
          'Scenario drivers (FX, payment terms, opex savings) + auto executive narrative',
        ],
        group: 0,
      },
      HARA: {
        title: 'HARA ( HR Analytics & Reporting Automation )',
        impact: '~80% reduction in HR reporting time; earlier attrition-risk visibility.',
        bullets: [
          'HRIS/ATS/Payroll merge → Power BI → scheduled Excel/PDF + auto-email',
          '12-month attrition forecasts + backtests',
          'Anomalies on departures/absence/overtime',
          'Attrition-risk scoring (Logistic/Tree) + bilingual labels & narrative',
        ],
        group: 0,
      },
      ExcelPDF: {
        title: 'Excel/PDF Distribution Engine',
        impact: 'On-schedule delivery via Outlook/SMTP; Arabic-friendly PDFs.',
        bullets: [
          'XlsxWriter templates; fpdf2 with arabic-reshaper + python-bidi',
          'Parameterized email subjects/bodies; attachments; Power Automate hooks',
        ],
        group: 1,
      },
      APEX: {
        title: 'Oracle APEX (KSA) : ZATCA E-Invoicing Workflows',
        impact: 'ZATCA-compliant invoicing for Saudi market.',
        bullets: [
          'Invoicing, validation, approvals, archiving',
        ],
        group: 1,
      },
      Invoicing: {
        title: '.NET (C#) + SQL Server Invoicing System',
        impact: 'VAT-ready billing with printable receipts.',
        bullets: [
          'CRUD/admin, role-based access, fast receipt printing',
        ],
        group: 1,
      },
      EcommerceBI: {
        title: 'E-commerce Power BI Dashboards',
        impact: 'Real-time operational insights with automated distribution.',
        bullets: [
          'Orders, revenue, returns, inventory',
          'Scheduled Excel/PDF distribution',
        ],
        group: 2,
      },
      Backtests: {
        title: 'Forecast Backtesting Suite',
        impact: 'Trustworthy models (typical MAPE ≈ 10–18%).',
        bullets: [
          'Rolling windows (MAE/MAPE), model comparison',
          'Visual diagnostics and error tracking dashboards',
        ],
        group: 2,
      },
      Chatbots: {
        title: 'AI Chatbots (Real Estate) : OpenAI + Voiceflow',
        impact: 'Automated lead qualification reducing manual effort.',
        bullets: [
          'Lead qualification & FAQs; bilingual responses',
        ],
        group: 2,
      },
    },
    skills: {
      analytics: {
        title: 'Analytics & Visualization',
        items: ['Power BI (DAX, Star Schema, Power Query, RLS)', 'Incremental Refresh', 'Field Parameters', 'Bookmarks/Drill-through', 'Performance tuning'],
      },
      python: {
        title: 'Python & ML',
        items: ['pandas', 'numpy', 'scikit-learn (IsolationForest/Logistic)', 'statsmodels (Holt-Winters)', 'matplotlib', 'ETL', 'backtesting (MAPE/MAE)'],
      },
      ai: {
        title: 'AI & Automation',
        items: ['OpenAI LLMs (executive narratives)', 'anomaly detection (STL-residual, Z-Score/MAD, IsolationForest)', 'scenario controls', 'prompt engineering'],
      },
      reporting: {
        title: 'Reporting Ops & Distribution',
        items: ['Excel automation (XlsxWriter)', 'Arabic RTL PDF (fpdf2 + arabic-reshaper + python-bidi)', 'scheduled email (Outlook/SMTP)', 'Power Automate'],
      },
      data: {
        title: 'Data & Backend',
        items: ['SQL', 'REST APIs (FastAPI/Flask basics)', 'Git/GitHub', 'CI (GitHub Actions)', 'VS Code', 'Windows Task Scheduler'],
      },
    },
    about: {
      bio: 'Specializing in end-to-end analytics automation systems that bridge Python ETL pipelines with Power BI dashboards, delivering 24/7 bilingual insights with AI-powered forecasting and anomaly detection.',
    },
    footer: {
      copyright: '© 2025 Abdelrahman Abouelella. All rights reserved.',
    },
  },
  ar: {
    nav: {
      projects: 'المشاريع',
      skills: 'المهارات',
      about: 'نبذة',
      bookMeeting: 'احجز موعدًا',
    },
    hero: {
      title: 'عبدالرحمن أبو العلا',
      subtitle: 'محلل بيانات | مهندس أتمتة ذكاء اصطناعي',
      oneliner: "أنا مهندس أتمتة ذكاء اصطناعي ومحلل بيانات متخصص في بناء أنظمة تحليلات بيانات آلية متكاملة - من خطوط Python ETL وسير عمل التعلم الآلي إلى لوحات معلومات Power BI وتقارير Excel/PDF المجدولة. أحوّل عمليات إعداد التقارير اليدوية المجزأة إلى أنظمة رؤى ثنائية اللغة تعمل على مدار الساعة طوال أيام الأسبوع بسلاسة في بيئات العربية والإنجليزية. يربط عملي البيانات من أنظمة المبيعات والمالية والموارد البشرية في طبقات تحليلات موحدة تمكّن صانعي القرار برؤية في الوقت الفعلي وملخصات تنفيذية ورؤى تنبؤية.",
      viewProjects: 'عرض المشاريع',
      email: 'البريد الإلكتروني',
      downloadCV: 'تحميل السيرة الذاتية',
      linkedin: 'لينكد إن',
      whatsapp: 'واتساب',
    },
    sections: {
      projects: 'المشاريع',
      skills: 'المهارات',
      about: 'نبذة',
    },
    tabs: ['أتمتة التحليلات', 'البنية التحتية للبيانات', 'حلول الذكاء الاصطناعي وBI'],
    readCaseStudy: 'قراءة دراسة الحالة',
    cards: {
      SARA: {
        title: 'SARA ( أتمتة تحليلات وتقارير المبيعات بالذكاء الاصطناعي )',
        impact: 'تقليل الإعداد اليدوي بنسبة 70-90٪؛ توحيد "مصدر الحقيقة الواحد".',
        bullets: [
          'Python ETL ← CSVs منظمة ← Power BI',
          'توقعات Holt-Winters مع نطاقات الثقة',
          'اختبارات MAPE/MAE المتداولة + كشف الشذوذ (STL/IsolationForest)',
          'ضوابط السيناريوهات (السعر/الحجم/الخصم) + سرد تنفيذي ثنائي اللغة',
          'تسجيل التشغيل والتنبيهات',
        ],
        group: 0,
      },
      FARA: {
        title: 'FARA ( أتمتة تحليلات وتقارير المالية بالذكاء الاصطناعي )',
        impact: 'رؤى نهاية الشهر أسرع بـ 1-2 يوم؛ رؤية أفضل للتدفق النقدي.',
        bullets: [
          'فعليات ERP (GL/AR/AP)، الميزانية/التوقعات، سيناريوهات العملات الأجنبية المعينة على P&L/BS/CF',
          'توقعات الإيرادات/المصروفات التشغيلية/EBITDA + اختبار رجعي (تتبع MAPE)',
          'كشف الشذوذ (STL/IsolationForest/Benford)',
          'محركات السيناريو (FX، شروط الدفع، توفير المصروفات التشغيلية) + سرد تنفيذي تلقائي',
        ],
        group: 0,
      },
      HARA: {
        title: 'HARA ( أتمتة تحليلات وتقارير الموارد البشرية )',
        impact: '~80٪ تقليل في وقت إعداد تقارير الموارد البشرية؛ رؤية أبكر لمخاطر الاستنزاف.',
        bullets: [
          'دمج HRIS/ATS/Payroll ← Power BI ← Excel/PDF مجدولة + بريد إلكتروني تلقائي',
          'توقعات استنزاف لمدة 12 شهرًا + اختبارات رجعية',
          'شذوذات في المغادرة/الغياب/العمل الإضافي',
          'تسجيل مخاطر الاستنزاف (Logistic/Tree) + تسميات وسرد ثنائي اللغة',
        ],
        group: 0,
      },
      ExcelPDF: {
        title: 'محرك توزيع Excel/PDF',
        impact: 'التسليم في الوقت المحدد عبر Outlook/SMTP؛ ملفات PDF متوافقة مع العربية.',
        bullets: [
          'قوالب XlsxWriter؛ fpdf2 مع arabic-reshaper + python-bidi',
          'موضوعات/نصوص بريد إلكتروني بمعاملات؛ مرفقات؛ روابط Power Automate',
        ],
        group: 1,
      },
      APEX: {
        title: 'Oracle APEX (السعودية) : سير عمل الفوترة الإلكترونية ZATCA',
        impact: 'فوترة متوافقة مع ZATCA للسوق السعودي.',
        bullets: [
          'الفوترة، التحقق، الموافقات، الأرشفة',
        ],
        group: 1,
      },
      Invoicing: {
        title: 'نظام الفواتير .NET (C#) + SQL Server',
        impact: 'فوترة جاهزة لضريبة القيمة المضافة مع إيصالات قابلة للطباعة.',
        bullets: [
          'CRUD/إدارة، وصول قائم على الأدوار، طباعة سريعة للإيصالات',
        ],
        group: 1,
      },
      EcommerceBI: {
        title: 'لوحات معلومات Power BI للتجارة الإلكترونية',
        impact: 'رؤى تشغيلية في الوقت الفعلي مع توزيع تلقائي.',
        bullets: [
          'الطلبات، الإيرادات، المرتجعات، المخزون',
          'توزيع Excel/PDF مجدول',
        ],
        group: 2,
      },
      Backtests: {
        title: 'مجموعة اختبار التوقعات الرجعي',
        impact: 'نماذج موثوقة (MAPE النموذجي ≈ 10-18٪).',
        bullets: [
          'نوافذ متداولة (MAE/MAPE)، مقارنة النماذج',
          'تشخيصات بصرية ولوحات تتبع الأخطاء',
        ],
        group: 2,
      },
      Chatbots: {
        title: 'روبوتات محادثة AI (العقارات) : OpenAI + Voiceflow',
        impact: 'تأهيل العملاء المحتملين التلقائي للحد من الجهد اليدوي.',
        bullets: [
          'تأهيل العملاء المحتملين والأسئلة الشائعة؛ استجابات ثنائية اللغة',
        ],
        group: 2,
      },
    },
    skills: {
      analytics: {
        title: 'التحليلات والتصور',
        items: ['Power BI (DAX، مخطط النجمة، Power Query، RLS)', 'التحديث التزايدي', 'معاملات الحقل', 'الإشارات المرجعية/التعمق', 'ضبط الأداء'],
      },
      python: {
        title: 'Python والتعلم الآلي',
        items: ['pandas', 'numpy', 'scikit-learn (IsolationForest/Logistic)', 'statsmodels (Holt-Winters)', 'matplotlib', 'ETL', 'اختبار رجعي (MAPE/MAE)'],
      },
      ai: {
        title: 'الذكاء الاصطناعي والأتمتة',
        items: ['OpenAI LLMs (سرديات تنفيذية)', 'كشف الشذوذ (STL-residual، Z-Score/MAD، IsolationForest)', 'ضوابط السيناريو', 'هندسة المطالبات'],
      },
      reporting: {
        title: 'عمليات التقارير والتوزيع',
        items: ['أتمتة Excel (XlsxWriter)', 'PDF RTL بالعربية (fpdf2 + arabic-reshaper + python-bidi)', 'بريد إلكتروني مجدول (Outlook/SMTP)', 'Power Automate'],
      },
      data: {
        title: 'البيانات والخلفية',
        items: ['SQL', 'REST APIs (أساسيات FastAPI/Flask)', 'Git/GitHub', 'CI (GitHub Actions)', 'VS Code', 'Windows Task Scheduler'],
      },
    },
    about: {
      bio: 'متخصص في أنظمة أتمتة التحليلات الشاملة التي تربط بين خطوط Python ETL ولوحات معلومات Power BI، لتقديم رؤى ثنائية اللغة على مدار الساعة طوال أيام الأسبوع مع توقعات مدعومة بالذكاء الاصطناعي وكشف الشذوذ.',
    },
    footer: {
      copyright: '© 2025 عبدالرحمن أبو العلا. جميع الحقوق محفوظة.',
    },
  },
};

const techChips = ['Power BI', 'Python', 'SQL', 'Machine Learning', 'Automation', 'APIs', 'Reporting Ops', 'GitHub'];

export default function Portfolio() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [activeTab, setActiveTab] = useState<number>(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [meetOpen, setMeetOpen] = useState(false);
  const BOOK_MEETING_URL =
    "https://calendly.com/abdo-abouelella96/meet-with-abdelrahman";
  const shouldReduceMotion = useReducedMotion();

  const t = content[lang];
  const isRTL = lang === 'ar';
  const bookLabel = (t as any)?.hero?.bookMeeting ?? (isRTL ? "احجز موعد" : "Book a meeting");

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as 'en' | 'ar' | null;
    if (savedLang) setLang(savedLang);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    if ((window as any).__VG_INJECTED__) return;
    (window as any).__VG_INJECTED__ = true;
    (window as any).VG_CONFIG = {
      ID: 'TCicuXkIPVvxdDpt',
      region: 'na',
      render: 'full-width',
      stylesheets: ['https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css'],
    };
    const script = document.createElement('script');
    script.src = 'https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js';
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const filteredProjects = Object.entries(t.cards).filter(([_, card]) => card.group === activeTab);

  const fadeIn = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-50px' },
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
      };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-screen dark text-[#E6EDF3] ${isRTL ? 'font-cairo' : 'font-inter'} relative`}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-150 ${
          scrolled
            ? 'bg-[#0F141A]/95 backdrop-blur-md shadow-lg h-14'
            : 'bg-transparent h-18'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size={scrolled ? 'sm' : 'default'}
                className="bg-[#4FB3FF] hover:bg-[#3A9DE8] text-white font-medium transition-all duration-150"
              >
                <Calendar className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                {t.nav.bookMeeting}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl h-[80vh] p-0 md:rounded-lg overflow-hidden">
              <iframe
                src="https://calendly.com/abdo-abouelella96/meet-with-abdelrahman"
                className="w-full h-full border-0"
                title="Book a meeting"
              />
            </DialogContent>
          </Dialog>

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('projects')}
              className="text-sm font-medium hover:text-[#4FB3FF] transition-colors"
            >
              {t.nav.projects}
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-sm font-medium hover:text-[#4FB3FF] transition-colors"
            >
              {t.nav.skills}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium hover:text-[#4FB3FF] transition-colors"
            >
              {t.nav.about}
            </button>

            <div className={`flex items-center gap-4 ${isRTL ? 'mr-4 border-r' : 'ml-4 border-l'} border-gray-700 ${isRTL ? 'pr-4' : 'pl-4'}`}>
              <button
                onClick={toggleLang}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                aria-label="Toggle language"
              >
                <Globe className="h-5 w-5" />
              </button>
            </div>
          </nav>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </SheetTrigger>
            <SheetContent side={isRTL ? 'left' : 'right'} className="bg-[#0F141A] border-gray-800">
              <nav className="flex flex-col gap-4 mt-8">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="text-lg font-medium hover:text-[#4FB3FF] transition-colors text-left"
                >
                  {t.nav.projects}
                </button>
                <button
                  onClick={() => scrollToSection('skills')}
                  className="text-lg font-medium hover:text-[#4FB3FF] transition-colors text-left"
                >
                  {t.nav.skills}
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-lg font-medium hover:text-[#4FB3FF] transition-colors text-left"
                >
                  {t.nav.about}
                </button>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-800">
                  <Globe className="h-5 w-5" />
                  <button onClick={toggleLang} className="text-sm hover:text-[#4FB3FF] transition-colors">
                    {lang === 'en' ? 'العربية' : 'English'}
                  </button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="pt-18">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-[#4FB3FF] to-[#2E8BC0] bg-clip-text text-transparent text-center">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-[#9FB0C0] mb-6 text-center">
              {t.hero.subtitle}
            </p>
            <p className="text-lg md:text-xl mb-8 leading-relaxed text-center">
              {t.hero.oneliner}
            </p>

            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {techChips.map((chip: string) => (
                <Badge key={chip} variant="secondary" className="text-sm px-4 py-2 font-medium">
                  {chip}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" variant="outline">
                <a href="mailto:abdo.abouelella96@gmail.com">
                  <Mail className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  {t.hero.email}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://docs.google.com/document/d/1Sc_lZjPR8OFdv1be9cDbZeSZY0q8V_dS7-wBhDvLOEY/edit?tab=t.0" target="_blank" rel="noopener noreferrer">
                  <Download className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  {t.hero.downloadCV}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://www.linkedin.com/in/abdelrahman-abouelella-2bb80a388/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  {t.hero.linkedin}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://wa.me/201117739645" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  {t.hero.whatsapp}
                </a>
              </Button>
            </div>
          </motion.div>
        </section>

        <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h2 {...fadeIn} className="text-4xl md:text-5xl font-bold mb-8 text-center">
            {t.sections.projects}
          </motion.h2>

          <motion.div {...fadeIn} className="mb-12 flex justify-center">
            <Tabs value={activeTab.toString()} onValueChange={(v: string) => setActiveTab(parseInt(v))}>
              <TabsList className="bg-[#0F141A] border border-gray-800">
                {t.tabs.map((tab: string, idx: number) => (
                  <TabsTrigger key={idx} value={idx.toString()} className="data-[state=active]:bg-[#4FB3FF] data-[state=active]:text-white">
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto place-items-center">
            {filteredProjects.map(([key, card]: [string, { title: string; impact: string; bullets: string[] }]) => (
              <motion.div key={key} {...fadeIn}>
                <Card className="h-full bg-[#0F141A] border-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-lg font-semibold leading-tight mb-2">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-[#4FB3FF] font-medium">
                      {card.impact}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ul className={`space-y-2 text-sm ${isRTL ? 'pr-4' : 'pl-4'}`}>
                      {card.bullets.map((bullet: string, idx: number) => (
                        <li key={idx} className="list-disc">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h2 {...fadeIn} className="text-4xl md:text-5xl font-bold mb-12 text-center">
            {t.sections.skills}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {Object.entries(t.skills).map(([key, skill]: [string, { title: string; items: string[] }]) => (
              <motion.div key={key} {...fadeIn}>
                <Card className="bg-[#0F141A] border-gray-800 rounded-2xl shadow-lg p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-semibold">{skill.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs border-gray-700">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h2 {...fadeIn} className="text-4xl md:text-5xl font-bold mb-8 text-center">
            {t.sections.about}
          </motion.h2>

          <motion.div {...fadeIn} className="flex justify-center">
            <Card className="bg-[#0F141A] border-gray-800 rounded-2xl shadow-lg p-6 max-w-3xl text-center">
              <CardContent className="p-0">
                <p className="text-lg leading-relaxed">{t.about.bio}</p>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mx-auto max-w-3xl mb-8">
            <div className="w-full flex items-center justify-center">
              <div id="VG_OVERLAY_CONTAINER" style={{ width: 500, height: 500 }} />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-center">Get in Contact</h2>

          <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" variant="outline">
              <a href="mailto:abdo.abouelella96@gmail.com">
                <Mail className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                {t.hero.email}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://www.linkedin.com/in/abdelrahman-abouelella-2bb80a388/" target="_blank" rel="noopener noreferrer">
                <Linkedin className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                {t.hero.linkedin}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/201117739645" target="_blank" rel="noopener noreferrer">
                <MessageCircle className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                {t.hero.whatsapp}
              </a>
            </Button>
            <div className="basis-full h-0" />
            <div className="basis-full flex justify-center mt-3">
              <NeonUIButton
                variant="solid"
                onClick={() => setMeetOpen(true)}
                aria-label={bookLabel}
                className={cn("inline-flex items-center gap-2 leading-none")}
              >
                <Calendar className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                {bookLabel}
              </NeonUIButton>
            </div>
          </div>
          <CalendlyModal open={meetOpen} onClose={() => setMeetOpen(false)} url={BOOK_MEETING_URL} />
        </section>
      </main>

      <footer className="border-t border-gray-800 bg-[#0F141A] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#9FB0C0]">{t.footer.copyright}</p>
            <button
              onClick={toggleLang}
              className="text-sm hover:text-[#4FB3FF] transition-colors"
            >
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Abdelrahman Abouelella',
            jobTitle: 'Data Analyst | AI Automation Engineer',
            description: 'End-to-end analytics automation specialist',
            url: 'https://example.com',
          }),
        }}
      />
    </div>
  );
}
