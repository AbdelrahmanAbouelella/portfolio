import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const frontEndItems = [
  "واجهات تجمع بين جمال الشكل ووضوح الاستخدام، بحيث تخدم العمل قبل أن تزيّن الشاشة.",
  "ترتيب واضح للمهام، الأدوار، والأزرار المهمة، يساعد المستخدم يعرف خطوته التالية بسهولة.",
  "صفحات ونماذج ولوحات متابعة سهلة القراءة وسريعة في الاستخدام اليومي.",
  "تجربة متماسكة على الكمبيوتر والموبايل، مع الحفاظ على وضوح التفاصيل المهمة.",
  "تفاصيل بصرية وتفاعلية تجعل المنتج منظمًا، مريحًا، ومناسبًا للاستخدام الفعلي."
];

const backEndItems = [
  "قاعدة بيانات مصممة حول كيانات العمل وسير التشغيل.",
  "صلاحيات واضحة للمستخدمين، الأدوار، والإجراءات الحساسة داخل النظام.",
  "منطق يدير الطلبات، الموافقات، الحالات، والنتائج بطريقة منظمة وقابلة للتتبع.",
  "تقارير ولوحات متابعة تحول البيانات اليومية إلى رؤية مفهومة للإدارة.",
  "أتمتة للمهام المتكررة، الإشعارات، الجداول، وحركة العمليات داخل النظام.",
  "معمارية قابلة للتوسع والصيانة، بحيث يظل النظام ثابتًا مع زيادة المستخدمين والوظائف."
];

export function Comparison() {
  return (
    <section className="py-32 bg-background relative overflow-hidden" id="comparison" dir="rtl">
      <div className="absolute inset-0 blueprint-grid pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24 relative">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-8 tracking-tight">
            واجهة أنيقة. وهندسة عميقة.
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-4xl mx-auto font-medium leading-relaxed">
            أبني المنتج من الجهتين: واجهة واضحة وسلسة يتعامل معها المستخدم بثقة، وبنية خلفية تنظّم البيانات، تضبط الصلاحيات، تدير قواعد العمل، وتحافظ على ثبات النظام مع كل عملية.
          </p>

          <motion.svg className="absolute -top-10 left-10 w-24 h-24 text-warm-orange opacity-40 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}>
            <path d="M 20 80 Q 50 10 80 80 M 30 50 L 70 50" strokeDasharray="3 3"/>
          </motion.svg>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-stretch">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sketch-border p-10 md:p-14 bg-surface relative overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-500"
          >
            <h3 className="text-3xl font-serif font-bold mb-10 text-foreground">
              <span className="text-ink-blue sketch-underline inline-block">الواجهة</span> وتجربة الاستخدام
            </h3>
            <ul className="space-y-6">
              {frontEndItems.map((item, i) => (
                <li key={i} className="flex items-start gap-5 text-foreground/90 font-bold tracking-wide">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 text-ink-blue shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="sketch-border p-10 md:p-14 bg-surface relative overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-500 z-10"
          >
            <h3 className="text-3xl font-serif font-bold mb-10 text-foreground">
              <span className="text-warm-orange sketch-underline inline-block">البنية</span> والمنطق التشغيلي
            </h3>
            <ul className="space-y-6">
              {backEndItems.map((item, i) => (
                <li key={i} className="flex items-start gap-5 text-foreground/90 font-bold tracking-wide">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 text-warm-orange shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
