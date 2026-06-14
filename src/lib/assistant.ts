/**
 * Abdelrahman Abouelella — Portfolio Assistant
 *
 * A fully local, dependency-free knowledge base + intent-matching engine.
 * It works without any backend or API key so the site keeps running as a
 * static GitHub Pages deployment.
 *
 * Design rules (must be respected):
 *  - Never invent facts: years of experience, companies, clients, prices,
 *    availability, or capabilities that are not encoded here.
 *  - If confidence is low, return the language-appropriate fallback that
 *    points the visitor to a real contact channel.
 *  - The assistant represents Abdelrahman. It never claims to *be* him.
 *  - Scenario groups + response variety make replies feel natural, not robotic.
 */

export type Lang = 'en' | 'ar';

/* ------------------------------------------------------------------ */
/* Confirmed contact details (the only contact facts the bot may use) */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  email: 'abdo.abouelella96@gmail.com',
  whatsapp: '+20 1117739645',
  whatsappLink: 'https://wa.me/201117739645',
  linkedin: 'https://www.linkedin.com/in/abdelrahman-abouelella-2bb80a388/',
  calendly: 'https://calendly.com/abdo-abouelella96/meet-with-abdelrahman',
  cvFile: 'Abdelrahman_Abouelella_CV.docx',
} as const;

/* ------------------------------------------------------------------ */
/* Language detection                                                 */
/* ------------------------------------------------------------------ */

const ARABIC_RANGE = /[\u0600-\u06FF]/;

export const isArabicText = (value: string): boolean => ARABIC_RANGE.test(value);

/**
 * Decide the reply language. We prefer the language of the visitor's own
 * message (so an Arabic question in the EN widget still gets Arabic), and
 * fall back to the active UI language when the message has no strong signal
 * (e.g. a project name typed in Latin letters).
 */
export const detectReplyLang = (message: string, uiLang: Lang): Lang => {
  const trimmed = message.trim();
  if (!trimmed) return uiLang;
  if (ARABIC_RANGE.test(trimmed)) return 'ar';
  if (/[a-z]{2,}/i.test(trimmed)) return 'en';
  return uiLang;
};

/* ------------------------------------------------------------------ */
/* Normalisation helpers (for robust keyword matching)                */
/* ------------------------------------------------------------------ */

const normalize = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, '') // strip Arabic diacritics
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/گ/g, 'ك')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ') // drop punctuation
    .replace(/\s+/g, ' ')
    .trim();

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/* ------------------------------------------------------------------ */
/* Scenario definitions                                               */
/* ------------------------------------------------------------------ */

/**
 * Each scenario can return several answer templates per language so the bot
 * does not feel repetitive. Facts stay identical across templates; only the
 * phrasing changes.
 */
interface Scenario {
  id: string;
  /** Keywords matched against the normalized message. */
  keywords: string[];
  /** Strong phrases that boost the score noticeably when present. */
  phrases?: string[];
  /** 1–3 answer variants per language. */
  answers: Record<Lang, string[]>;
}

const SCENARIOS: Scenario[] = [
  /* ----------------------------- greeting ----------------------------- */
  {
    id: 'greeting',
    keywords: [
      'hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon',
      'salam', 'greetings', 'yo',
      'اهلا', 'السلام', 'مرحبا', 'هاي', 'صباح', 'مساء', 'ازيك', 'هلا',
    ],
    answers: {
      en: [
        "Hi! I'm Abdelrahman's portfolio assistant. I can tell you what he builds, walk you through his projects, cover his technical skills and backend/AI work, or help you reach him. What would you like to know?",
        "Hello! I'm here to help you explore Abdelrahman's work — his systems, his stack, the case studies, or how to book a meeting. Where should we start?",
      ],
      ar: [
        'أهلًا! أنا مساعد عبد الرحمن في البورتفوليو. أقدر أوضّحلك بيعمل إيه، أعرّفك على مشاريعه، أحكيلك عن مهاراته التقنية وشغل الباك إند والذكاء الاصطناعي، أو أساعدك توصله. تحب تعرف إيه؟',
        'أهلًا بيك! أنا هنا أساعدك تستكشف شغل عبد الرحمن — أنظمته، التقنيات اللي بيستخدمها، دراسات الحالة، أو إزاي تحجز اجتماع. نبدأ منين؟',
      ],
    },
  },

  /* --------------------------- A) identity ---------------------------- */
  {
    id: 'identity',
    keywords: [
      'who is', 'who are you', 'about abdelrahman', 'about him', 'about you',
      'introduce', 'tell me about yourself', 'what do you do', 'what does he do',
      'your background', 'positioning', 'who',
      'مين', 'من هو', 'مين هو', 'عرفني', 'عرفني بنفسك', 'بتعمل ايه',
      'بيعمل ايه', 'تعريف', 'هو مين', 'انت مين',
    ],
    phrases: [
      'who is abdelrahman', 'tell me about yourself', 'what do you do',
      'من هو عبد الرحمن', 'عبد الرحمن مين', 'عرفني بنفسك', 'بتعمل ايه',
    ],
    answers: {
      en: [
        'Abdelrahman Abouelella is a Full-Stack Software Developer. He builds custom business systems, operational tools, database-driven platforms, and practical AI automation. In short, Abdelrahman turns ideas into custom software, engineered with clarity, precision, and production-ready execution.',
        'Abdelrahman is a Full-Stack Software Developer focused on custom business systems — operational tools, database-backed platforms, backend workflows, reporting, and AI automation. He works across the whole build, from data model to interface.',
      ],
      ar: [
        'عبد الرحمن أبو العلا مطوّر Full-Stack. بيبني أنظمة أعمال مخصّصة، أدوات تشغيلية، منصّات مبنية على قواعد البيانات، وأتمتة عملية بالذكاء الاصطناعي. باختصار، عبد الرحمن بيحوّل الأفكار لبرامج مخصّصة، مبنية بوضوح ودقّة وجاهزة للإنتاج.',
        'عبد الرحمن مطوّر Full-Stack متخصص في أنظمة الأعمال المخصّصة — أدوات تشغيلية، منصّات على قواعد بيانات، سير عمل باك إند، تقارير، وأتمتة بالذكاء الاصطناعي. بيشتغل على البناء كله من نموذج البيانات للواجهة.',
      ],
    },
  },

  /* -------------------------- B) business fit ------------------------- */
  {
    id: 'business_fit',
    keywords: [
      'my company', 'my business', 'for my team', 'my startup', 'my work',
      'manual process', 'manual work', 'automate', 'replace excel', 'excel',
      'spreadsheet', 'spreadsheets', 'google sheets', 'paperwork',
      'i have an idea', 'where to start', 'turn my', 'digitize', 'digitise',
      'شركتي', 'شغلي', 'بيزنس', 'فكره', 'عندي فكره', 'شغل يدوي', 'يدوي',
      'اكسيل', 'اكسل', 'شيت', 'شيتات', 'ورق', 'ابدا منين', 'احول',
    ],
    phrases: [
      'build a system for my company', 'i have a manual process', 'replace excel',
      'i use excel', 'i have an idea', 'يقدر يبني سيستم لشركتي',
      'عندي شغل يدوي', 'عندي فكره ومش عارف ابدا', 'بستخدم اكسيل',
    ],
    answers: {
      en: [
        "Yes — that's exactly his focus. Abdelrahman turns manual workflows, spreadsheets, and operational problems into clear software plans and custom systems. If you describe the process, who uses it, and the outcome you want, that's enough for a solid starting point.",
        "That's a good fit. He takes business workflows — even messy Excel-based ones — and turns them into structured, role-aware systems. Share what the process does today and where it breaks, and he can map it to a real plan.",
      ],
      ar: [
        'أيوه — ده بالظبط تخصّصه. عبد الرحمن بيحوّل الشغل اليدوي والإكسيل والمشاكل التشغيلية لخطط برمجية واضحة وأنظمة مخصّصة. لو وصفت العملية، مين بيستخدمها، والنتيجة اللي عايزها، ده كفاية كبداية قوية.',
        'ده مناسب ليك. بياخد سير العمل في شغلك — حتى لو شغّال دلوقتي على إكسيل متشعبط — ويحوّله لنظام منظّم بصلاحيات. احكيلي العملية بتعمل إيه دلوقتي وبتقع فين، وهو يقدر يحوّلها لخطة فعلية.',
      ],
    },
  },

  /* ------------------------ C) services / build ----------------------- */
  {
    id: 'services',
    keywords: [
      'build', 'do you build', 'what do you build', 'what does he build',
      'what can he build', 'what can', 'services', 'help with', 'develop',
      'make me', 'create', 'crm', 'dashboard', 'dashboards', 'internal system',
      'internal tool', 'client portal', 'portal', 'admin panel', 'admin',
      'reporting', 'reports', 'platform', 'custom system',
      'يبني', 'بيبني', 'تبني', 'بناء', 'يعمل', 'بيعمل', 'خدمات', 'يطور',
      'داشبورد', 'لوحه تحكم', 'نظام داخلي', 'بوابه', 'بورتال', 'تقارير',
      'سي ار ام', 'كرم', 'منصه', 'ادمن',
    ],
    phrases: [
      'what can he build', 'can he build a crm', 'can he build dashboards',
      'can he build internal systems', 'هل يقدر يبني داشبورد',
      'هل يقدر يبني نظام داخلي', 'عبد الرحمن بيبني ايه',
    ],
    answers: {
      en: [
        'Abdelrahman builds internal business systems, admin dashboards, reporting dashboards, database-backed platforms, role-based systems, client portals, workflow and AI automation, and other operational tools. Everything is shaped around how the team actually works — not a generic template.',
        'He can build things like internal tools, admin and reporting dashboards, CRMs, client portals, role-based platforms, and AI automation workflows. The common thread is custom software built around a real operational process.',
      ],
      ar: [
        'عبد الرحمن بيبني أنظمة أعمال داخلية، لوحات إدارة، لوحات تقارير، منصّات على قواعد بيانات، أنظمة بصلاحيات حسب الدور، بوابات عملاء، أتمتة سير عمل وأتمتة بالذكاء الاصطناعي، وأدوات تشغيلية تانية. كله معمول على طريقة شغل الفريق فعلًا — مش قالب جاهز.',
        'يقدر يبني أدوات داخلية، لوحات إدارة وتقارير، أنظمة CRM، بوابات عملاء، منصّات بصلاحيات، وسير عمل أتمتة بالذكاء الاصطناعي. القاسم المشترك إنه برنامج مخصّص مبني حوالين عملية تشغيلية حقيقية.',
      ],
    },
  },

  /* ------------------------ D) technical skills ----------------------- */
  {
    id: 'skills',
    keywords: [
      'tech', 'technology', 'technologies', 'stack', 'tools', 'skills',
      'full stack', 'fullstack', 'languages', 'frameworks',
      'react', 'typescript', 'javascript', 'tailwind', 'supabase',
      'postgres', 'postgresql', 'oracle', 'apex', 'plsql', 'pl sql',
      'ords', 'rest', 'api', 'apis',
      'تقنيات', 'تكنولوجيا', 'ادوات', 'ستاك', 'مهارات', 'لغات', 'بيستخدم',
      'فول ستاك', 'فرونت اند باك', 'فريم ورك',
    ],
    phrases: [
      'what technologies does he use', 'is he full stack', 'what does he use',
      'بيستخدم ايه', 'هل هو فول ستاك', 'بيستخدم ايه من تقنيات',
    ],
    answers: {
      en: [
        'On the web side he uses React, TypeScript, JavaScript, and Tailwind CSS. On data and backend: Supabase, PostgreSQL, schema design, Row Level Security / access control, backend workflows, REST APIs, and reporting. He also works with the Oracle stack — Oracle APEX, Oracle Database, PL/SQL, and ORDS — and deploys to GitHub Pages.',
        'Yes, he\'s full-stack. Front end: React, TypeScript, Tailwind. Backend & data: Supabase, PostgreSQL, database schema design, RLS/access control, backend workflows, REST APIs, plus the Oracle stack (APEX, Oracle Database, PL/SQL, ORDS), reporting, and GitHub Pages deployment.',
      ],
      ar: [
        'في الويب بيستخدم React وTypeScript وJavaScript وTailwind CSS. في البيانات والباك إند: Supabase، PostgreSQL، تصميم السكيمة، Row Level Security / التحكّم في الصلاحيات، سير عمل الباك إند، REST APIs، والتقارير. وكمان بيشتغل على منظومة Oracle — Oracle APEX وOracle Database وPL/SQL وORDS — وبينشر على GitHub Pages.',
        'أيوه، هو فول ستاك. الفرونت: React وTypeScript وTailwind. الباك إند والبيانات: Supabase، PostgreSQL، تصميم سكيمة قواعد البيانات، RLS/الصلاحيات، سير عمل الباك إند، REST APIs، بالإضافة لمنظومة Oracle (APEX، Oracle Database، PL/SQL، ORDS)، التقارير، والنشر على GitHub Pages.',
      ],
    },
  },

  /* --------------------- E) backend / database depth ------------------ */
  {
    id: 'backend',
    keywords: [
      'backend', 'back end', 'database', 'databases', 'db', 'schema', 'schemas',
      'data model', 'permissions', 'roles', 'role based', 'rls',
      'row level security', 'access control', 'secure access', 'security model',
      'only frontend', 'just frontend', 'frontend only', 'sql',
      'باك اند', 'الخلفيه', 'قاعده بيانات', 'قواعد بيانات', 'داتابيز',
      'سكيما', 'صلاحيات', 'ادوار', 'امان', 'فرونت بس', 'فرونت فقط',
    ],
    phrases: [
      'is he only frontend', 'can he design database schemas', 'can he handle permissions',
      'هو فرونت بس', 'بيعرف يعمل داتابيز', 'يقدر يعمل صلاحيات',
    ],
    answers: {
      en: [
        'No — he\'s not only frontend. Abdelrahman works across UI, data structure, business logic, access control, backend workflows, and reporting. He designs database schemas, builds role-based permissions and Row Level Security, and handles secure access control. Investor News Intelligence is the clearest showcase of this depth.',
        'He\'s genuinely full-stack, not frontend-only. He designs PostgreSQL/Supabase schemas, builds role-based access and RLS, writes validation queries, and owns backend workflows and reporting — alongside the interface layer.',
      ],
      ar: [
        'لأ — هو مش فرونت بس. عبد الرحمن بيشتغل على الواجهة، بنية البيانات، منطق الشغل، الصلاحيات، سير عمل الباك إند، والتقارير. بيصمّم سكيمة قواعد البيانات، يعمل صلاحيات حسب الدور وRow Level Security، ويتعامل مع التحكّم الآمن في الدخول. مشروع Investor News Intelligence أوضح مثال على العمق ده.',
        'هو فول ستاك بجد، مش فرونت بس. بيصمّم سكيمة PostgreSQL/Supabase، يعمل صلاحيات حسب الدور وRLS، يكتب استعلامات تحقّق، ويمتلك سير عمل الباك إند والتقارير — جنب طبقة الواجهة.',
      ],
    },
  },

  /* ----------------------------- F) Deyrna ---------------------------- */
  {
    id: 'deyrna',
    keywords: [
      'deyrna', 'property management', 'community management', 'real estate',
      'compound', 'compounds', 'resident', 'residents', 'gate access',
      'maintenance', 'facility', 'fm',
      'ديرنا', 'ادراه عقارات', 'عقار', 'عقارات', 'كومباوند', 'كمبوند',
      'كومباوندات', 'مجتمعات', 'ساكن', 'سكان', 'صيانه', 'بوابه',
    ],
    phrases: [
      'tell me about deyrna', 'property management project', 'what did he build for communities',
      'اشرح مشروع ديرنا', 'مشروع الكمبوندات', 'مشروع الكومباوندات',
    ],
    answers: {
      en: [
        'Deyrna is a property/community management ecosystem. It covers a resident app, community HQ, gate access and security, maintenance/FM workflows, a command center, billing, access control, reporting, and multi-role operational workflows. It\'s built around real operations — permissions and day-to-day processes, not just screens.',
        'Deyrna is an end-to-end property/community operations platform: resident app, community HQ, gate access/security, maintenance and FM, a command center, billing, access control, and reporting — all tied together with multi-role permissions and real workflows.',
      ],
      ar: [
        'Deyrna منظومة إدارة عقارات ومجتمعات. بتغطّي تطبيق للساكن، مركز إدارة المجتمع، الدخول والأمن عند البوابات، سير عمل الصيانة/FM، غرفة تحكّم، فوترة، التحكّم في الصلاحيات، تقارير، وسير عمل تشغيلي متعدّد الأدوار. مبنية حوالين عمليات حقيقية — صلاحيات وعمليات يومية، مش مجرد شاشات.',
        'Deyrna منصّة تشغيل عقارات ومجتمعات متكاملة: تطبيق ساكن، مركز إدارة المجتمع، دخول وأمن البوابات، صيانة وFM، غرفة تحكّم، فوترة، تحكّم في الصلاحيات، وتقارير — كلها مربوطة بصلاحيات متعدّدة الأدوار وسير عمل حقيقي.',
      ],
    },
  },

  /* --------------------------- G) Ad Spy Hub -------------------------- */
  {
    id: 'adspy',
    keywords: [
      'ad spy', 'adspy', 'ad spy hub', 'ads', 'advertising', 'advert', 'adverts',
      'creative', 'marketing intelligence', 'variants', 'ad automation',
      'اعلان', 'اعلانات', 'اد سباي', 'تسويق', 'كرييتف', 'فاريانت', 'فاريانتس',
    ],
    phrases: [
      'tell me about ad spy hub', 'ai ad system', 'ad automation project',
      'مشروع الاعلانات', 'ad spy hub بيعمل ايه',
    ],
    answers: {
      en: [
        'Ad Spy Hub is an AI automation and marketing-intelligence workflow. It helps collect ad signals, analyze creative patterns, identify winning concepts, adapt them to new brands/products, generate variants, and support content/ad production. The value is the automated workflow behind it, not just the UI.',
        'Ad Spy Hub is an AI-driven marketing intelligence system: it gathers ad signals, breaks down what makes top ads work, adapts those patterns to a new brand or product, and generates creative variants — an automated pipeline for content and ad production.',
      ],
      ar: [
        'Ad Spy Hub سير عمل أتمتة وذكاء تسويقي بالذكاء الاصطناعي. بيساعد في جمع إشارات الإعلانات، تحليل أنماط الإبداع، تحديد الأفكار الناجحة، تكييفها لبراندات/منتجات جديدة، توليد نسخ متعدّدة، ودعم إنتاج المحتوى والإعلانات. القيمة في منظومة الأتمتة وراه، مش بس الواجهة.',
        'Ad Spy Hub نظام ذكاء تسويقي مدفوع بالذكاء الاصطناعي: بيجمّع إشارات الإعلانات، يفكّك إيه اللي بيخلّي الإعلان الأعلى أداءً ناجح، يكيّف الأنماط دي لبراند أو منتج جديد، ويولّد نسخ إبداعية — منظومة مؤتمتة لإنتاج المحتوى والإعلانات.',
      ],
    },
  },

  /* ----------------- H) Investor News Intelligence ------------------- */
  {
    id: 'investor',
    keywords: [
      'investor', 'investor news', 'news intelligence', 'data intelligence',
      'investor news intelligence', 'seed data', 'validation', 'documentation',
      'backend intelligence',
      'استثمار', 'مستثمر', 'مستثمرين', 'اخبار', 'الاخبار', 'ذكاء البيانات',
      'ذكاء بيانات', 'بيانات استثماريه',
    ],
    phrases: [
      'tell me about investor news intelligence', 'backend intelligence project',
      'what did he build in backend', 'مشروع الاخبار والاستثمار',
      'مشروع الاخبار', 'مشروع المستثمرين',
    ],
    answers: {
      en: [
        'Investor News Intelligence is a backend/data intelligence system. It focuses on schema design, an RLS/security model, role-based access, seed data, validation queries, structured information workflows, and backend documentation. It\'s the clearest example of Abdelrahman\'s backend and database engineering.',
        'Investor News Intelligence is a backend-heavy project: structured schema design, role-based access with RLS, seed data, validation queries, documented backend workflows, and clean information pipelines. It demonstrates his depth in data modelling and security.',
      ],
      ar: [
        'Investor News Intelligence نظام باك إند وذكاء بيانات. بيركّز على تصميم السكيمة، نموذج أمان RLS، الصلاحيات حسب الدور، البيانات الأولية (seed)، استعلامات التحقّق، سير عمل منظّم للمعلومات، وتوثيق الباك إند. أوضح مثال على هندسة عبد الرحمن في الباك إند وقواعد البيانات.',
        'Investor News Intelligence مشروع مركّز على الباك إند: تصميم سكيمة منظّم، صلاحيات حسب الدور مع RLS، بيانات أولية، استعلامات تحقّق، سير عمل باك إند موثّق، ومسارات معلومات نظيفة. بيوضّح عمقه في نمذجة البيانات والأمان.',
      ],
    },
  },

  /* ----------------------- I) experience / credibility ---------------- */
  {
    id: 'experience',
    keywords: [
      'experience', 'background', 'expert', 'expertise', 'real systems',
      'real projects', 'mockups', 'mockup', 'just ui', 'only ui', 'fake',
      'credibility', 'proven', 'portfolio real',
      'خبره', 'خبرته', 'خبره فعليه', 'مشاريع حقيقيه', 'حقيقيه', 'حقيقي',
      'موك اب', 'مجرد واجهات', 'واجهات بس',
    ],
    phrases: [
      'what experience does he have', 'has he built real systems',
      'are these just ui mockups', 'هل دي مشاريع حقيقيه', 'هل عنده خبره فعليه',
    ],
    answers: {
      en: [
        'These are real operational systems and case studies — built around workflows, databases, permissions, and business logic, not decorative UI mockups. For exact details of his experience, the CV and a direct conversation are the best source.',
        'The work is grounded in real systems: data models, role-based access, backend workflows, and reporting — not just screens. For specifics on his background, it\'s best to check the CV or ask him directly.',
      ],
      ar: [
        'دي أنظمة تشغيلية ودراسات حالة حقيقية — مبنية حوالين سير العمل، قواعد البيانات، الصلاحيات، ومنطق الشغل، مش مجرد واجهات شكلية. لتفاصيل خبرته بالظبط، الـ CV والكلام المباشر هما أفضل مصدر.',
        'الشغل قايم على أنظمة حقيقية: نماذج بيانات، صلاحيات حسب الدور، سير عمل باك إند، وتقارير — مش مجرد شاشات. لتفاصيل خلفيته، الأفضل تشوف الـ CV أو تسأله مباشرة.',
      ],
    },
  },

  /* --------------------------- J) CV / resume ------------------------- */
  {
    id: 'cv',
    keywords: [
      'cv', 'resume', 'curriculum', 'download cv', 'download resume', 'send cv',
      'سيره', 'السيره', 'سيره ذاتيه', 'سي في', 'تحميل', 'حمل', 'تنزيل', 'ابعتلي',
    ],
    phrases: [
      'where is his cv', 'can i download his resume', 'download cv',
      'فين السيره الذاتيه', 'ابعتلي السي في',
    ],
    answers: {
      en: [
        `You can download Abdelrahman's CV from the portfolio using the CV / Resume button. The file is ${CONTACT.cvFile}. Quick summary: Full-Stack Software Developer focused on custom business systems, databases, backend workflows, reporting, and AI automation.`,
        `His CV is available right on the site — use the CV / Resume download button (file: ${CONTACT.cvFile}). In short, he's a Full-Stack Software Developer specializing in custom business systems and backend/data work.`,
      ],
      ar: [
        `تقدر تحمّل الـ CV بتاع عبد الرحمن من الموقع عن طريق زر CV / السيرة الذاتية. اسم الملف ${CONTACT.cvFile}. ملخّص سريع: مطوّر Full-Stack متخصص في أنظمة الأعمال المخصّصة، قواعد البيانات، سير عمل الباك إند، التقارير، والأتمتة بالذكاء الاصطناعي.`,
        `الـ CV متاح على الموقع مباشرة — استخدم زر تحميل CV / السيرة الذاتية (الملف: ${CONTACT.cvFile}). باختصار، هو مطوّر Full-Stack متخصص في أنظمة الأعمال المخصّصة وشغل الباك إند والبيانات.`,
      ],
    },
  },

  /* ----------------------------- K) contact --------------------------- */
  {
    id: 'contact',
    keywords: [
      'contact', 'email', 'e mail', 'reach', 'reach him', 'get in touch',
      'phone', 'whatsapp', 'whats app', 'linkedin', 'connect', 'message him',
      'تواصل', 'اتواصل', 'ايميل', 'بريد', 'واتساب', 'واتس', 'لينكد', 'لينكدان',
      'رقم', 'اكلمه', 'اوصله',
    ],
    phrases: [
      'how can i contact him', 'what is his email', 'what is his whatsapp',
      'ازاي اتواصل معاه', 'ايميله ايه', 'واتسابه ايه',
    ],
    answers: {
      en: [
        `You can reach Abdelrahman directly:\n\n• Email: ${CONTACT.email}\n• WhatsApp: ${CONTACT.whatsapp}\n• LinkedIn: ${CONTACT.linkedin}\n\nOr book a meeting on Calendly: ${CONTACT.calendly}`,
        `Here's how to get in touch with Abdelrahman:\n\n• Email — ${CONTACT.email}\n• WhatsApp — ${CONTACT.whatsapp}\n• LinkedIn — ${CONTACT.linkedin}\n• Book a meeting — ${CONTACT.calendly}`,
      ],
      ar: [
        `تقدر تتواصل مع عبد الرحمن مباشرة:\n\n• الإيميل: ${CONTACT.email}\n• واتساب: ${CONTACT.whatsapp}\n• لينكدإن: ${CONTACT.linkedin}\n\nأو احجز اجتماع على Calendly: ${CONTACT.calendly}`,
        `طرق التواصل مع عبد الرحمن:\n\n• الإيميل — ${CONTACT.email}\n• واتساب — ${CONTACT.whatsapp}\n• لينكدإن — ${CONTACT.linkedin}\n• احجز اجتماع — ${CONTACT.calendly}`,
      ],
    },
  },

  /* ----------------------------- booking ------------------------------ */
  {
    id: 'meeting',
    keywords: [
      'meeting', 'book', 'booking', 'schedule', 'call', 'calendly',
      'appointment', 'consultation', 'book a call', 'set up a call',
      'اجتماع', 'احجز', 'حجز', 'ميعاد', 'موعد', 'مكالمه', 'كاليندلي', 'مقابله',
    ],
    phrases: [
      'how do i book a meeting', 'book a meeting', 'schedule a call',
      'احجز اجتماع', 'احجز اجتماع ازاي', 'اجتماع ازاي',
    ],
    answers: {
      en: [
        `The quickest way is the Calendly link, where you can pick a time directly:\n${CONTACT.calendly}\n\nPrefer to message first? WhatsApp ${CONTACT.whatsapp} or email ${CONTACT.email} both work.`,
        `To book a meeting, use Calendly and choose a slot that suits you:\n${CONTACT.calendly}\n\nYou can also reach out on WhatsApp (${CONTACT.whatsapp}) or by email (${CONTACT.email}) first.`,
      ],
      ar: [
        `أسرع طريقة هي رابط Calendly، وتقدر تختار الوقت مباشرة:\n${CONTACT.calendly}\n\nتحب تكلّمه الأول؟ واتساب ${CONTACT.whatsapp} أو الإيميل ${CONTACT.email} الاتنين تمام.`,
        `لحجز اجتماع، استخدم Calendly واختار الميعاد اللي يناسبك:\n${CONTACT.calendly}\n\nتقدر كمان تتواصل على واتساب (${CONTACT.whatsapp}) أو بالإيميل (${CONTACT.email}) الأول.`,
      ],
    },
  },

  /* ------------- L) pricing / availability (sensitive) ---------------- */
  {
    id: 'pricing_availability',
    keywords: [
      'price', 'pricing', 'cost', 'how much', 'charge', 'rate', 'rates', 'budget',
      'fee', 'quote', 'available', 'availability', 'free now', 'start tomorrow',
      'when can he start', 'capacity', 'hourly',
      'سعر', 'سعره', 'تكلفه', 'بكام', 'كام', 'ميزانيه', 'اجر', 'متاح',
      'متاح امتى', 'يبدا امتى', 'فاضي', 'يبدا بكره',
    ],
    phrases: [
      'how much does he charge', 'is he available now', 'can he start tomorrow',
      'سعره كام', 'متاح امتى', 'يبدا بكره',
    ],
    answers: {
      en: [
        "I don't have confirmed pricing or availability to share — those depend on the project scope and current schedule. The best step is to contact Abdelrahman directly so he can give you an accurate answer.",
        "I can't quote prices or confirm availability from here, since both depend on scope and timing. Reach out to Abdelrahman directly (email, WhatsApp, or Calendly) for a reliable answer.",
      ],
      ar: [
        'مش عندي سعر أو حالة توافر مؤكدة أقولهالك — دول بيعتمدوا على حجم المشروع والجدول الحالي. أفضل خطوة إنك تتواصل مع عبد الرحمن مباشرة عشان يدّيك إجابة دقيقة.',
        'مش قادر أحدّد سعر أو أأكّد توافر من هنا، لأن الاتنين بيعتمدوا على حجم الشغل والتوقيت. تواصل مع عبد الرحمن مباشرة (إيميل، واتساب، أو Calendly) عشان إجابة موثوقة.',
      ],
    },
  },

  /* ----------------------------- thanks ------------------------------- */
  {
    id: 'thanks',
    keywords: [
      'thank', 'thanks', 'thank you', 'appreciate', 'great', 'awesome', 'cool',
      'شكرا', 'متشكر', 'تسلم', 'تمام', 'جميل', 'حلو',
    ],
    answers: {
      en: [
        "You're welcome! If anything else comes up about Abdelrahman's work or how to reach him, just ask.",
        'Happy to help! Ask me anything else about his projects, skills, or contact details.',
      ],
      ar: [
        'العفو! لو عندك أي حاجة تانية عن شغل عبد الرحمن أو طريقة التواصل معاه، اسأل في أي وقت.',
        'تحت أمرك! اسألني أي حاجة تانية عن مشاريعه أو مهاراته أو بيانات التواصل.',
      ],
    },
  },
];

/* ------------------------------------------------------------------ */
/* Clarifying scenario (vague requests)                               */
/* ------------------------------------------------------------------ */

const CLARIFIER: Record<Lang, string> = {
  en: 'Tell me what the system should manage, who will use it, and what process you want to improve — then I can point you in the right direction.',
  ar: 'احكِ لي النظام المفروض يدير إيه، مين هيستخدمه، وإيه العملية اللي عايز تطوّرها — وساعتها أقدر أوجّهك صح.',
};

/**
 * Vague asks like "I need a system", "عندي فكرة", "can you help" should trigger
 * a short follow-up question rather than a generic answer or a fallback.
 */
const VAGUE_PATTERNS: RegExp[] = [
  /^(i (need|want|have)) (a )?(system|software|app|website|idea|project)$/i,
  /^(can you help|help me|i need help)$/i,
  /^(i have an? idea)$/i,
  /^عندي (فكره|نظام|سيستم|مشروع)$/,
  /^(محتاج|عايز|عاوز) (نظام|سيستم|برنامج|سوفت وير)$/,
  /^(ممكن تساعدني|ساعدني|محتاج مساعده)$/,
];

// Matched against the normalized message so Arabic letter variants (e.g.
// final ة → ه) are handled consistently with the rest of the engine.
const isVague = (normalizedMsg: string): boolean =>
  VAGUE_PATTERNS.some((re) => re.test(normalizedMsg));

/* ------------------------------------------------------------------ */
/* Fallbacks                                                          */
/* ------------------------------------------------------------------ */

export const FALLBACK: Record<Lang, string> = {
  en: "I don't have enough confirmed information about that. You can contact Abdelrahman directly by email, WhatsApp, or book a meeting.",
  ar: 'مش عندي معلومة مؤكدة عن النقطة دي. تقدر تتواصل مع عبد الرحمن مباشرة بالإيميل أو واتساب أو تحجز اجتماع.',
};

/* ------------------------------------------------------------------ */
/* Scoring engine                                                     */
/* ------------------------------------------------------------------ */

/** Distinctive tokens that should strongly pin a specific scenario. */
const STRONG_TOKENS = new Set([
  'deyrna', 'adspy', 'investor', 'calendly', 'linkedin', 'whatsapp',
  'supabase', 'postgres', 'postgresql', 'oracle', 'apex', 'plsql', 'ords',
  'crm', 'rls', 'ديرنا', 'كاليندلي', 'واتساب', 'لينكدان',
]);

const scoreScenario = (normalizedMsg: string, scenario: Scenario): number => {
  let score = 0;

  for (const phrase of scenario.phrases ?? []) {
    if (normalizedMsg.includes(normalize(phrase))) score += 5;
  }

  for (const keyword of scenario.keywords) {
    const nk = normalize(keyword);
    if (!nk) continue;
    if (nk.includes(' ')) {
      if (normalizedMsg.includes(nk)) score += 3;
    } else {
      const wordRe = new RegExp(`(^|\\s)${escapeRegExp(nk)}(\\s|$)`);
      const strong = STRONG_TOKENS.has(nk);
      if (wordRe.test(normalizedMsg)) score += strong ? 6 : 2;
      else if (nk.length >= 4 && normalizedMsg.includes(nk)) score += strong ? 4 : 1;
    }
  }

  return score;
};

/** Minimum score required to trust a scenario over the fallback. */
const CONFIDENCE_THRESHOLD = 2;

export interface AssistantResult {
  text: string;
  lang: Lang;
  intentId: string | null;
  matched: boolean;
}

/**
 * Deterministic-ish variant picker. Uses a lightweight hash of the message so
 * the same question gives a stable answer, but different questions that hit the
 * same scenario rotate through the available templates.
 */
const pickVariant = (variants: string[], seed: string): string => {
  if (variants.length === 1) return variants[0];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return variants[hash % variants.length];
};

/**
 * Resolve a visitor message to a reply using the local knowledge base.
 * Never invents anything: below the confidence threshold it returns the
 * language-appropriate fallback (or a clarifying question for vague asks).
 */
export const getLocalReply = (message: string, uiLang: Lang): AssistantResult => {
  const lang = detectReplyLang(message, uiLang);
  const normalized = normalize(message);

  if (!normalized) {
    return { text: FALLBACK[lang], lang, intentId: null, matched: false };
  }

  // Vague requests → short clarifying follow-up.
  if (isVague(normalized)) {
    return { text: CLARIFIER[lang], lang, intentId: 'clarify', matched: true };
  }

  const scored = SCENARIOS
    .map((scenario) => ({ scenario, score: scoreScenario(normalized, scenario) }))
    .sort((a, b) => b.score - a.score);

  const best = scored[0];

  if (best && best.score >= CONFIDENCE_THRESHOLD) {
    const variant = pickVariant(best.scenario.answers[lang], normalized);
    return { text: variant, lang, intentId: best.scenario.id, matched: true };
  }

  return { text: FALLBACK[lang], lang, intentId: null, matched: false };
};

/* ------------------------------------------------------------------ */
/* Optional AI fallback (off by default)                              */
/* ------------------------------------------------------------------ */

/**
 * Reads optional Vite env vars. When VITE_ASSISTANT_AI is "true" and an
 * endpoint is configured, the widget may call out to it. If anything is
 * missing or fails, the local engine is always the source of truth, so the
 * static GitHub Pages build keeps working with no keys.
 *
 *   VITE_ASSISTANT_AI=true
 *   VITE_ASSISTANT_AI_ENDPOINT=https://your-endpoint.example/chat
 */
export const aiConfig = () => {
  const enabled = import.meta.env.VITE_ASSISTANT_AI === 'true';
  const endpoint = import.meta.env.VITE_ASSISTANT_AI_ENDPOINT as string | undefined;
  return { enabled: Boolean(enabled && endpoint), endpoint };
};

const SYSTEM_GUARDRAILS = `You are the portfolio assistant for Abdelrahman Abouelella (a Full-Stack Software Developer). You represent him; never claim to BE him. Be concise and helpful. Only use confirmed facts. Never invent years of experience, companies, clients, prices, or availability. If you don't know, say so and point the visitor to email ${CONTACT.email}, WhatsApp ${CONTACT.whatsapp}, or Calendly ${CONTACT.calendly}. Reply in the same language as the visitor (English or Egyptian Arabic).`;

/**
 * Best-effort optional AI call. Returns null on any failure so the caller
 * falls back to the local reply. The endpoint contract is intentionally
 * simple: POST { message, lang, system } -> { reply: string }.
 */
export const tryAiReply = async (
  message: string,
  lang: Lang,
): Promise<string | null> => {
  const { enabled, endpoint } = aiConfig();
  if (!enabled || !endpoint) return null;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, lang, system: SYSTEM_GUARDRAILS }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { reply?: unknown };
    return typeof data.reply === 'string' && data.reply.trim()
      ? data.reply.trim()
      : null;
  } catch {
    return null;
  }
};

/* ------------------------------------------------------------------ */
/* Dev-only smoke tests                                               */
/* ------------------------------------------------------------------ */

/**
 * Lightweight self-check used by scripts/assistant.test.ts. Returns the list
 * of failing cases (empty array means all passed). Not imported by the app.
 */
export const runAssistantSelfTest = (): string[] => {
  const cases: Array<{ q: string; ui: Lang; expect: string | null }> = [
    { q: 'Who is Abdelrahman?', ui: 'en', expect: 'identity' },
    { q: 'مين عبد الرحمن؟', ui: 'ar', expect: 'identity' },
    { q: 'Tell me about Deyrna', ui: 'en', expect: 'deyrna' },
    { q: 'اشرح مشروع ديرنا', ui: 'ar', expect: 'deyrna' },
    { q: 'Tell me about Ad Spy Hub', ui: 'en', expect: 'adspy' },
    { q: 'مشروع الإعلانات ده إيه؟', ui: 'ar', expect: 'adspy' },
    { q: 'Tell me about Investor News Intelligence', ui: 'en', expect: 'investor' },
    { q: 'مشروع الأخبار والاستثمار ده إيه؟', ui: 'ar', expect: 'investor' },
    { q: 'What technologies does he use?', ui: 'en', expect: 'skills' },
    { q: 'بيستخدم إيه من تقنيات؟', ui: 'ar', expect: 'skills' },
    { q: 'Can he design database schemas?', ui: 'en', expect: 'backend' },
    { q: 'هو فرونت بس؟', ui: 'ar', expect: 'backend' },
    { q: 'How can I contact him?', ui: 'en', expect: 'contact' },
    { q: 'إزاي أتواصل معاه؟', ui: 'ar', expect: 'contact' },
    { q: 'How do I book a meeting?', ui: 'en', expect: 'meeting' },
    { q: 'أحجز اجتماع إزاي؟', ui: 'ar', expect: 'meeting' },
    { q: 'Where is his CV?', ui: 'en', expect: 'cv' },
    { q: 'فين السيرة الذاتية؟', ui: 'ar', expect: 'cv' },
    { q: 'How much does he charge?', ui: 'en', expect: 'pricing_availability' },
    { q: 'سعره كام؟', ui: 'ar', expect: 'pricing_availability' },
    { q: 'I use Excel for operations, can he replace it?', ui: 'en', expect: 'business_fit' },
    { q: 'عندي شغل يدوي كتير، يقدر يعمله نظام؟', ui: 'ar', expect: 'business_fit' },
    { q: 'Can he build a CRM?', ui: 'en', expect: 'services' },
    { q: 'I need a system', ui: 'en', expect: 'clarify' },
    { q: 'عندي فكرة', ui: 'ar', expect: 'clarify' },
    { q: 'What is the weather today?', ui: 'en', expect: null },
    { q: 'ما هو لونه المفضل؟', ui: 'ar', expect: null },
  ];

  const failures: string[] = [];
  for (const c of cases) {
    const r = getLocalReply(c.q, c.ui);
    const got = r.matched ? r.intentId : null;
    if (got !== c.expect) {
      failures.push(`[${c.ui}] "${c.q}" expected=${c.expect ?? 'FALLBACK'} got=${got ?? 'FALLBACK'}`);
    }
  }
  return failures;
};
