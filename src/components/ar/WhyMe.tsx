import { motion } from "motion/react";

const partnerPoints = [
  "للشركات التي تريد أن تنمو على أساس برمجي واضح، بتقارير أسهل وقرارات مبنية على بياناتها.",
  "للأعمال التي تحتاج برنامجًا يناسب طريقتها في التشغيل، بدل الاعتماد على حلول عامة لا تعكس تفاصيلها.",
  "للفِرَق التي تحتاج تجربة حديثة وسهلة، يفهمها المستخدم بسرعة ويتعامل معها بسلاسة.",
  "للمنتجات التي تحتاج ما هو أعمق من الواجهة: بيانات منظمة، صلاحيات واضحة، تقارير، أتمتة، ومنطق يحافظ على ترتيب النظام مع التوسع.",
  "للشركات التي تخطط لإضافة مزايا جديدة، دعم مستخدمين أكثر، ربط أدوات مختلفة، وتطوير النظام خطوة بعد خطوة.",
  "الهدف هو برنامج واضح، مصمم بعناية، يعمل بثبات، ويظل مفيدًا كلما كبر العمل وتطورت احتياجاته."
];

export function WhyMe() {
  return (
    <section className="py-32 lg:py-40 bg-surface relative overflow-hidden" id="why-me" dir="rtl">
      <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-30" />

      <motion.svg className="absolute bottom-10 left-10 w-[600px] h-[600px] text-foreground opacity-5 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
        <circle cx="50" cy="50" r="45" strokeDasharray="2 4" />
        <circle cx="50" cy="50" r="30" strokeDasharray="1 5" />
        <line x1="50" y1="0" x2="50" y2="100" strokeDasharray="4 4" />
        <line x1="0" y1="50" x2="100" y2="50" strokeDasharray="4 4" />
      </motion.svg>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-28">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-foreground/70 mb-6 block">القيمة</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-8 tracking-tight">لماذا العمل معي؟</h2>
          <p className="text-lg md:text-xl text-foreground/90 font-medium max-w-3xl mx-auto leading-relaxed">
            إذا كنت تريد بناء برنامج خاص بعملك، مصمم حول طريقة تشغيل فريقك، تفاصيل يومك، والقرارات التي تحتاج أن تراها بوضوح.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-x-20 gap-y-16 max-w-6xl mx-auto">
          {partnerPoints.map((point, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-8 border-t border-dashed border-border pt-10 group"
            >
              <div className="mt-2 w-4 h-4 sketch-border border-foreground shrink-0 group-hover:bg-foreground group-hover:rotate-12 transition-all duration-300 relative">
                <div className="absolute inset-0 bg-ink-blue scale-0 group-hover:scale-100 transition-transform duration-300 rounded-[1px] m-0.5"></div>
              </div>
              <p className="text-foreground/80 text-lg leading-relaxed font-medium">{point}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
