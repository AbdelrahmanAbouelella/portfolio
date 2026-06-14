import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, ChevronDown } from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { id: 'build', label: 'ماذا يمكنك أن تبني؟' },
  { id: 'projects', label: 'اعرض الأنظمة' },
  { id: 'process', label: 'ما طريقة العمل؟' },
  { id: 'contact', label: 'كيف أتواصل مع عبد الرحمن؟' },
];

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
}

const containsAny = (value: string, keywords: string[]) =>
  keywords.some((keyword) => value.includes(keyword));

const isArabicText = (value: string) => /[\u0600-\u06FF]/.test(value);

function getSmartReply(rawText: string): string {
  const original = rawText.trim();
  const text = original.toLowerCase();
  const replyInArabic = isArabicText(original);

  if (containsAny(text, ['hello', 'hi', 'hey', 'good morning', 'good evening', 'اهلا', 'أهلا', 'السلام', 'مرحبا', 'هاي'])) {
    return replyInArabic
      ? 'أهلًا! أنا جودي، مساعد أبو العلا. أقدر أعرّفك بسرعة على عبد الرحمن، نوع الأنظمة التي يبنيها، المشاريع المعروضة، طريقة العمل، أو طرق التواصل.'
      : 'Hi! I’m Judy, Abouelella’s assistant. I can help you explore Abdelrahman’s work, systems, process, technical stack, and contact options.';
  }

  if (containsAny(text, ['who', 'about', 'عبد الرحمن', 'عبدالرحمن', 'مين', 'من هو', 'تعريف', 'about you'])) {
    return replyInArabic
      ? 'عبد الرحمن مطور Full-Stack يركز على بناء أنظمة وبرامج مخصصة للأعمال. قوته في تحويل فكرة أو احتياج تشغيلي إلى نظام عملي: قاعدة بيانات منظمة، منطق خلفي، صلاحيات، تقارير، أتمتة، وواجهة واضحة.'
      : 'Abdelrahman is a Full-Stack Developer focused on custom business systems. He turns operational needs into usable software: structured databases, backend logic, access control, reporting, automation, and clean interfaces.';
  }

  if (containsAny(text, ['build', 'services', 'what can', 'software', 'system', 'systems', 'program', 'تعمل', 'تبني', 'بناء', 'برنامج', 'برامج', 'نظام', 'انظمة', 'أنظمة'])) {
    return replyInArabic
      ? 'يقدر يبني برامج وأنظمة مخصصة مثل: منصات العملاء والمبيعات، أنظمة التشغيل وسير العمل، HR، الفوترة والتقارير، لوحات الإدارة، بوابات المستخدمين، وأتمتة المهام المتكررة. الفكرة الأساسية: برنامج معمول على طريقة شغلك، مش قالب جاهز.'
      : 'He can build custom systems such as CRM and sales platforms, workflow tools, HR systems, billing and reporting dashboards, admin portals, user portals, and automation flows. The goal is software shaped around how the business actually works.';
  }

  if (containsAny(text, ['project', 'projects', 'case', 'portfolio', 'systems', 'examples', 'اعمال', 'أعمال', 'مشاريع', 'مشروعات', 'انظمة مختارة', 'أنظمة مختارة', 'امثلة', 'أمثلة'])) {
    return replyInArabic
      ? 'الأنظمة المختارة في الموقع تعرض 3 اتجاهات قوية:\n\n1. Deyrna: منصة تشغيل مجتمعات وعقارات.\n2. Ad Spy Hub: منصة أتمتة وتحليل إعلانات بالذكاء الاصطناعي.\n3. Investor News Intelligence: Backend لتحويل أخبار السوق إلى ذكاء استثماري موثق بالمصادر.\n\nاستخدم زر "استعرض الأنظمة" لفتح المعروضات.'
      : 'The featured systems show three different strengths:\n\n1. Deyrna: a property/community operations platform.\n2. Ad Spy Hub: an AI automation platform for ad intelligence and creative workflows.\n3. Investor News Intelligence: a backend system for source-backed investor news intelligence.\n\nUse “View Systems” to explore them.';
  }

  if (containsAny(text, ['deyrna', 'property', 'community', 'real estate', 'compound', 'ديرنا', 'عقارات', 'كومباوند', 'مجتمعات'])) {
    return replyInArabic
      ? 'Deyrna يوضح قدرة عبد الرحمن على بناء نظام تشغيل كبير متعدد التطبيقات: Resident App، Community HQ، Gate Access، FM/Maintenance، Amenities، Governance، Comms، وAnalytics. المشروع يعرض خبرة في الواجهات، التدفقات، الصلاحيات، وتجربة المستخدم.'
      : 'Deyrna shows Abdelrahman’s ability to build a large multi-app operations platform: Resident App, Community HQ, Gate Access, FM/Maintenance, Amenities, Governance, Comms, and Analytics. It highlights UI architecture, workflows, permissions, and user experience.';
  }

  if (containsAny(text, ['ad spy', 'adspy', 'ads', 'advertising', 'creative', 'ai automation', 'اعلانات', 'إعلانات', 'اد سباي', 'ذكاء اصطناعي', 'اوتوميشن', 'أتمتة'])) {
    return replyInArabic
      ? 'Ad Spy Hub يعرض نظام أتمتة بالذكاء الاصطناعي يحوّل إشارات الإعلانات المنافسة إلى تحليل منظم، أفكار إبداعية، برومبتات، نسخ متعددة، ومخرجات جاهزة للنشر. الهدف هو فهم النمط الناجح وتكييفه للبراند، وليس نسخ المنافسين.'
      : 'Ad Spy Hub demonstrates an AI automation system that turns competitor ad signals into structured analysis, creative direction, prompts, generated variants, and publishing assets. The goal is to adapt winning patterns to a brand, not copy competitors.';
  }

  if (containsAny(text, ['investor', 'news', 'backend', 'supabase', 'postgres', 'rls', 'database', 'استثمار', 'اخبار', 'أخبار', 'باك اند', 'خلفية', 'قاعدة بيانات', 'بوستجرس'])) {
    return replyInArabic
      ? 'Investor News Intelligence يركز على الباك إند وقاعدة البيانات: PostgreSQL/Supabase، Multi-tenant structure، RLS، تتبع المصادر، تحليل AI، تنبيهات، وتدقيق. مناسب لإظهار قوة عبد الرحمن في تصميم السكيمة والأمان والمنطق الخلفي.'
      : 'Investor News Intelligence focuses on backend and database engineering: PostgreSQL/Supabase, multi-tenant structure, RLS, source tracking, AI analysis, alerts, and auditability. It shows Abdelrahman’s strength in schema design, security, and backend logic.';
  }

  if (containsAny(text, ['tech', 'stack', 'tools', 'react', 'next', 'typescript', 'tailwind', 'node', 'api', 'تقنيات', 'ادوات', 'أدوات', 'ستاك', 'تكنولوجيا'])) {
    return replyInArabic
      ? 'الستاك المعروض يشمل: React / Next.js، TypeScript، Tailwind، Node.js / Express، REST/RPC APIs، PostgreSQL/Supabase، RBAC/RLS، تقارير، Analytics، أتمتة، Jobs، Notifications، Git، Type Checks، Build Validation، وتوثيق وتسليم.'
      : 'The stack includes React / Next.js, TypeScript, Tailwind, Node.js / Express, REST/RPC APIs, PostgreSQL/Supabase, RBAC/RLS, reporting, analytics, automation, jobs, notifications, Git workflows, type checks, build validation, and handover documentation.';
  }

  if (containsAny(text, ['process', 'work', 'steps', 'method', 'how do you work', 'طريقة العمل', 'خطوات', 'تشتغل', 'تعمل ازاي', 'ازاي'])) {
    return replyInArabic
      ? 'طريقة العمل عادة تبدأ بفهم سير العمل الحقيقي، ثم تصميم نموذج البيانات، بناء منطق الخلفية، تشكيل الواجهة، إضافة التقارير والأتمتة، ثم الاختبار والتسليم. الهدف أن النظام يطلع واضح، قابل للتوسع، وسهل الاستخدام.'
      : 'The process usually starts with understanding the real workflow, then designing the data model, building backend logic, shaping the interface, adding reporting and automation, then testing and handover. The goal is a clear, scalable, usable system.';
  }

  if (containsAny(text, ['why', 'choose', 'value', 'different', 'work with', 'لماذا', 'ليه', 'القيمة', 'مختلف', 'العمل معي'])) {
    return replyInArabic
      ? 'القيمة الأساسية في العمل معه أنه لا يبدأ من الشاشة فقط. هو يفهم طريقة التشغيل، يبني قاعدة البيانات والمنطق والصلاحيات والتقارير، ثم يضع واجهة تجعل النظام سهلًا على المستخدم. النتيجة برنامج يخدم العمل فعلًا.'
      : 'The main value is that he does not start only from the screen. He understands the workflow, builds the database, logic, permissions, and reporting, then creates an interface that makes the system usable. The result is software that actually serves the business.';
  }

  if (containsAny(text, ['full stack', 'frontend', 'front-end', 'ui', 'ux', 'backend', 'back-end', 'فل ستاك', 'فرونت', 'واجهة', 'باك', 'خلفية'])) {
    return replyInArabic
      ? 'نعم، عبد الرحمن يعرض نفسه كمطور Full-Stack لأنه يعمل على الرحلة كاملة: من البنية الخلفية وقاعدة البيانات والصلاحيات، حتى الواجهة وتجربة الاستخدام والتقارير والتسليم.'
      : 'Yes. Abdelrahman positions himself as a Full-Stack Developer because he works across the whole system: backend, database, permissions, UI, user experience, reporting, and delivery.';
  }

  if (containsAny(text, ['cv', 'resume', 'download', 'سيرة', 'السي في', 'cv', 'تحميل'])) {
    return replyInArabic
      ? 'يمكنك استخدام زر Download Resume في الموقع لتحميل السيرة الذاتية. لو تريد ملخصًا سريعًا: عبد الرحمن Full-Stack Developer متخصص في أنظمة الأعمال، قواعد البيانات، الواجهات، التقارير، والأتمتة.'
      : 'You can use the Download Resume button on the site. Quick summary: Abdelrahman is a Full-Stack Developer focused on business systems, databases, interfaces, reporting, and automation.';
  }

  if (containsAny(text, ['contact', 'email', 'meeting', 'call', 'hire', 'project', 'تواصل', 'ايميل', 'إيميل', 'مقابلة', 'اجتماع', 'مشروع', 'شغل'])) {
    return replyInArabic
      ? 'أفضل خطوة هي الضغط على زر "تواصل معي" أو استخدام قسم التواصل في آخر الصفحة. اكتب له باختصار: فكرة النظام، المشكلة الحالية، المستخدمين المتوقعين، وأهم 3 نتائج تريدها من البرنامج.'
      : 'The best next step is to use the “Contact Me” button or the contact section at the bottom. Briefly share the system idea, the current problem, expected users, and the top 3 outcomes you want from the software.';
  }

  if (containsAny(text, ['price', 'cost', 'budget', 'timeline', 'time', 'سعر', 'تكلفة', 'ميزانية', 'وقت', 'مدة'])) {
    return replyInArabic
      ? 'التكلفة والمدة تعتمد على حجم النظام، عدد المستخدمين، الصلاحيات، التقارير، التكاملات، وهل المطلوب MVP أو نظام كامل. أفضل بداية هي وصف الفكرة والتدفقات الأساسية ليتم تقديرها بشكل منطقي.'
      : 'Cost and timeline depend on the system size, users, permissions, reports, integrations, and whether you need an MVP or a full production system. The best start is to describe the idea and core workflows.';
  }

  return replyInArabic
    ? 'السؤال ده محتاج إجابة مباشرة من عبد الرحمن. يمكنك التواصل معه على الرقم: +20 1201501443'
    : 'This question needs a direct answer from Abdelrahman. You can contact him at: +20 1201501443';
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "أهلًا، أنا جودي — مساعد أبو العلا. اسألني عن عبد الرحمن، الأنظمة التي بناها، طريقة العمل، التقنيات، أو بدء مشروع جديد.",
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowTooltip(false);
    }
  };

  const handleSend = (text: string = inputValue) => {
    const messageText = text.trim();
    if (!messageText) return;

    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: messageText }]);
    setInputValue('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          id: (Date.now() + 1).toString(), 
          type: 'bot', 
          text: getSmartReply(messageText),
        }
      ]);
    }, 450);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start" dir="ltr">

      <AnimatePresence>
        {!isOpen && showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="mb-4 ml-2 max-w-[240px] origin-bottom-left"
            dir="rtl"
          >
            <div className="sketch-border bg-background p-4 shadow-xl relative cursor-pointer" onClick={toggleChat}>
              <span className="text-sm font-bold text-foreground leading-snug block">تحتاج مساعدة في استكشاف الأنظمة؟</span>
              <div className="absolute -bottom-2 left-6 w-4 h-4 bg-background border-b border-l border-foreground transform -rotate-45 z-10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom left' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className="sketch-border bg-background shadow-2xl flex flex-col w-[90vw] sm:w-[380px] h-[550px] max-h-[80vh] mb-4 overflow-hidden"
            dir="rtl"
          >
            <div className="p-4 border-b-2 border-border bg-surface flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sketch-border bg-background overflow-hidden shrink-0">
                  <img src="/judy-avatar.png" alt="Judy assistant avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground uppercase tracking-widest">جودي · مساعد أبو العلا</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                     <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] text-foreground/70 font-bold uppercase tracking-widest">وضع ذكي محلي</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-foreground/50 hover:text-foreground transition-colors group"
                aria-label="تصغير المحادثة"
              >
                <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface/30 blueprint-grid relative">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.type === 'bot' && (
                    <div className="w-6 h-6 rounded bg-background border border-border overflow-hidden mr-2 shrink-0 mt-1">
                      <img src="/judy-avatar.png" alt="Judy assistant avatar" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[85%] p-3 text-sm font-medium leading-relaxed whitespace-pre-line ${
                      msg.type === 'user' 
                        ? 'bg-foreground text-background border-2 border-foreground' 
                        : 'bg-background text-foreground border-2 border-border shadow-sm'
                    }`}
                    style={{
                      borderRadius: msg.type === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0'
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-col gap-2 mt-6 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1 ml-8">أسئلة مقترحة</span>
                  <div className="flex flex-wrap gap-2 pl-8">
                    {QUICK_ACTIONS.map(action => (
                      <button
                        key={action.id}
                        onClick={() => handleSend(action.label)}
                        className="text-[11px] font-bold tracking-wide uppercase px-3 py-2 bg-background border border-foreground border-dashed text-foreground hover:bg-foreground hover:text-background transition-colors text-left shadow-sm"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t-2 border-border bg-background">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2 group"
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="اكتب سؤالك..."
                    className="w-full bg-surface border-2 border-border focus:border-foreground outline-none px-4 py-3 text-sm font-bold placeholder-foreground/50 transition-colors"
                  />
                  <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-focus-within:w-full"></div>
                </div>
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 flex items-center justify-center bg-foreground text-background hover:bg-surface hover:text-foreground border-2 border-foreground disabled:opacity-50 disabled:cursor-not-allowed shrink-0 transition-colors group/btn"
                  aria-label="إرسال الرسالة"
                >
                  <Send className="w-5 h-5 ml-1 group-hover/btn:scale-110 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleChat}
        className="w-16 h-16 rounded-none sketch-button-primary flex items-center justify-center shadow-2xl relative z-50 group self-start"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="فتح أو إغلاق المحادثة"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="w-7 h-7 group-hover:scale-110 transition-transform" />
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && showTooltip && (
          <span className="absolute -top-1.5 -left-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warm-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-warm-orange border-2 border-background"></span>
          </span>
        )}
      </motion.button>

    </div>
  );
}

export default ChatbotWidget;
