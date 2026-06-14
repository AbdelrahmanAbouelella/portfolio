import { motion } from "motion/react";

const steps = [
  {
    number: "I",
    title: "أفهم سير العمل",
    desc: "أبدأ بفهم طريقة العمل الحقيقية، الأدوار، نقاط التعطّل، الحالات الخاصة، والمشاكل المتكررة قبل كتابة أي كود."
  },
  {
    number: "II",
    title: "أصمم نموذج البيانات",
    desc: "أبني قاعدة البيانات حول كيانات واضحة، علاقات صحيحة، قيود، حالات تشغيل، وأساس قابل للتوسع على المدى الطويل."
  },
  {
    number: "III",
    title: "أبني منطق الخلفية",
    desc: "أطوّر القواعد التي تدير النظام: التحقق، الإجراءات المحمية، الصلاحيات، واجهات الربط، ومعالجة العمليات."
  },
  {
    number: "IV",
    title: "أشكّل الواجهة",
    desc: "أبني واجهات نظيفة ومتجاوبة حول أدوار المستخدمين، أولوية المهام، وضوح التنقل، حالات النماذج، وسهولة الاستخدام اليومي."
  },
  {
    number: "V",
    title: "أضيف التقارير والأتمتة",
    desc: "أربط لوحات المتابعة، منطق التقارير، الإشعارات، العمليات المجدولة، التصدير، والتكاملات التي تمنح العمل رؤية أفضل."
  },
  {
    number: "VI",
    title: "التسليم",
    desc: "أختبر التدفق بالكامل، أجهز بيئة التشغيل، أوثق النظام، وأسلم برمجية يمكن تشغيلها وصيانتها وتطويرها لاحقًا."
  }
];

export function Process() {
  return (
    <section className="py-32 bg-background relative overflow-hidden" id="process" dir="rtl">
      <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-40" />
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-28 relative">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-foreground/60 mb-6 block">منهجية العمل</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-8 tracking-tight">كيف أحوّل الفكرة إلى نظام</h2>
          <p className="text-lg md:text-xl text-foreground/80 font-medium max-w-2xl mx-auto leading-relaxed">مسار واضح من أول فكرة حتى الإطلاق.</p>

          {/* Fun drawn swirl accent */}
          <motion.svg className="absolute top-0 right-10 md:right-32 w-16 h-16 text-sepia opacity-50 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" align="center" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}>
            <path d="M 20 50 Q 50 10 80 50 T 50 90 T 20 60 T 40 40 T 60 50" />
          </motion.svg>
        </div>

        <div className="space-y-16 lg:space-y-24 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:border-l-2 before:border-dashed before:border-border">

          {/* Animated vertical drawn line that fills on scroll */}
          <motion.div 
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: "linear" }}
            className="absolute inset-0 ml-[1.4rem] -translate-x-px md:mx-auto md:translate-x-0 w-1 bg-foreground origin-top"
          />

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="relative flex items-start md:items-center justify-between md:justify-normal md:even:flex-row-reverse group"
            >
              {/* Timeline marker */}
              <div className="flex items-center justify-center w-12 h-12 bg-background border-2 border-foreground md:order-1 md:group-even:translate-x-1/2 md:group-odd:-translate-x-1/2 z-10 shrink-0 shadow-md transition-all duration-300 sketch-border group-hover:scale-110 group-hover:bg-foreground">
                <span className="text-xs font-serif font-bold text-foreground tracking-wider group-hover:text-background transition-colors">{step.number}</span>
              </div>

              {/* Content box */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-5rem)] pt-1 md:pt-0 pb-4 sketch-border bg-surface p-8 relative group-hover:bg-surface-hover transition-colors">
                <h3 className="text-2xl font-serif font-bold mb-3 text-foreground sketch-underline w-max">{step.title}</h3>
                <p className="text-foreground/90 text-base leading-relaxed font-medium mt-4">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
