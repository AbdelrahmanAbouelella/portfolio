import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

const layers = [
  { name: "نطاق الشركة والسياق", desc: "فصل واضح بين الشركة، المجتمع، الوحدة، والمستخدم." },
  { name: "التحكم بالأدوار والصلاحيات", desc: "صلاحيات محددة، إجراءات محمية، وقواعد ظهور دقيقة." },
  { name: "سلامة البيانات العلائقية", desc: "جداول نظيفة، قيود، حالات تشغيل، وحقول تدقيق." },
  { name: "حدود API و RPC", desc: "اتصال آمن بين الواجهة وطبقة البيانات." },
  { name: "إدارة حالات سير العمل", desc: "دورات واضحة للطلبات، الموافقات، المدفوعات، التصاريح، والمهام." },
  { name: "الأتمتة والتكاملات", desc: "مهام مجدولة، إشعارات، تصدير، فوترة، وربط مع خدمات خارجية." },
  { name: "انضباط الإطلاق", desc: "Type checks، مراجعات، اختبارات، migrations، builds، وتجهيز للتسليم." },
];

export function Architecture() {
  return (
    <section className="py-32 bg-background relative overflow-hidden" id="architecture" dir="rtl">
      {/* Decorative diagram in background */}
      <motion.svg className="absolute top-10 left-10 w-[500px] h-[500px] text-foreground opacity-[0.04] pointer-events-none hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="10" y="10" width="30" height="30" strokeDasharray="2 2" />
        <rect x="60" y="10" width="30" height="30" strokeDasharray="2 2" />
        <rect x="35" y="60" width="30" height="30" strokeDasharray="2 2" />
        <line x1="25" y1="40" x2="50" y2="60" strokeDasharray="1 3" />
        <line x1="75" y1="40" x2="50" y2="60" strokeDasharray="1 3" />
      </motion.svg>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10" dir="ltr">
        <div className="w-full lg:w-1/2 flex flex-col items-center relative" dir="rtl">
          <div className="absolute top-0 bottom-0 left-1/2 -ml-px w-0.5 border-l-2 border-dashed border-border opacity-50 z-0" />

          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-full flex flex-col items-center group cursor-default relative z-10"
            >
              <div className="w-full sm:w-4/5 px-6 py-5 bg-surface sketch-border text-center transition-colors group-hover:bg-foreground group-hover:text-background duration-300">
                <span className="block text-sm font-serif font-bold tracking-wide">{layer.name}</span>
                <span className="block mt-2 text-xs opacity-70 font-medium tracking-wide leading-relaxed">{layer.desc}</span>
              </div>

              {i < layers.length - 1 && (
                <div className="h-10 w-full flex justify-center items-center relative">
                  <div className="absolute w-2 h-2 border border-foreground bg-background rotate-45 group-hover:bg-foreground transition-colors" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="lg:w-1/2 mb-16 lg:mb-0 flex justify-end" dir="rtl">
          <div className="w-full max-w-[620px] text-right flex flex-col items-end">
            <span className="text-[10px] tracking-[0.2em] font-bold text-foreground/60 mb-6 block w-full text-right">الأساس</span>
            <h2 className="w-full text-right text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-5 tracking-tight leading-tight">الأساسات التقنية</h2>
            <p className="w-full text-right text-lg md:text-xl text-foreground/90 font-medium mb-10 leading-relaxed max-w-[620px]">
              أبني الأنظمة على أساس تقني مترابط، حيث يعمل السياق، الصلاحيات، سلامة البيانات، حالات التشغيل، الأتمتة، وفحوصات الإطلاق كطبقات منظمة داخل منتج واحد واضح.
            </p>
            <a href="#projects" className="text-[10px] font-bold uppercase tracking-widest text-foreground hover:text-ink-blue transition-colors inline-flex items-center gap-4 group w-max sketch-underline pb-2 self-end">
              راجع الأنظمة المختارة
              <span className="w-12 h-px bg-foreground group-hover:w-16 transition-all"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
