import { motion } from "motion/react";
import { Users, Building2, Calendar, Package, LineChart, Layout } from "lucide-react";

const capabilities = [
  {
    icon: <Users className="w-5 h-5 text-foreground/60 group-hover:text-primary-500 transition-colors" />,
    title: "منصات العملاء والمبيعات",
    desc: "تسجيل العملاء، إدارة البيانات، خطوط البيع، المتابعات، سجل النشاط، تقارير واضحة، وسير عمل منظم لفريق المبيعات."
  },
  {
    icon: <Package className="w-5 h-5 text-foreground/60 group-hover:text-primary-500 transition-colors" />,
    title: "أنظمة التشغيل وسير العمل",
    desc: "دورات طلبات، موافقات، توزيع مهام، جدولة، تتبع حالات، حركة مخزون، ولوحات تشغيلية تساعد الفريق يعمل بوضوح."
  },
  {
    icon: <Building2 className="w-5 h-5 text-foreground/60 group-hover:text-primary-500 transition-colors" />,
    title: "أنظمة الموظفين والموارد البشرية",
    desc: "ملفات موظفين، حضور، رواتب، بوابات خدمة ذاتية، موافقات، مستندات، وإدارة مبنية على الأدوار والصلاحيات."
  },
  {
    icon: <LineChart className="w-5 h-5 text-foreground/60 group-hover:text-primary-500 transition-colors" />,
    title: "الماليات والفوترة والتقارير",
    desc: "فواتير، مدفوعات، مصروفات، متابعة التدفقات، منطق تقارير، ولوحات تحول بيانات العمل إلى رؤية أوضح للإدارة."
  },
  {
    icon: <Layout className="w-5 h-5 text-foreground/60 group-hover:text-primary-500 transition-colors" />,
    title: "البوابات ولوحات الإدارة",
    desc: "بوابات مخصصة للعملاء، الموظفين، المديرين، والمشرفين، مع إجراءات محمية وصلاحيات واضحة ورؤية إدارية."
  },
  {
    icon: <Calendar className="w-5 h-5 text-foreground/60 group-hover:text-primary-500 transition-colors" />,
    title: "حلول مصممة حول تفاصيل العمل",
    desc: "أنظمة تُبنى حول قواعدك الخاصة، خطواتك التشغيلية، التكاملات التي تحتاجها، والتفاصيل التي تجعل البرنامج مناسبًا لطريقة عملك من البداية."
  }
];

export function Capabilities() {
  return (
    <section className="py-32 px-6 bg-background relative" id="systems" dir="rtl">
      <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-20" />
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-foreground/40 mb-6 block">القدرات</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-8 tracking-tight">أنظمة تُبنى على طريقة عملك أنت</h2>
          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto font-light leading-relaxed">
            كل شركة لها تفاصيلها، وطريقة تشغيلها، ومشاكلها اليومية. لذلك أبني برمجيات مصممة حول طريقة عملك الفعلية: كيف يتحرك الطلب، من يوافق، أين تتوقف العملية، وما الذي تحتاج الإدارة أن تراه بوضوح.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="sketch-border p-10 bg-surface border border-transparent group hover:bg-background transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-8 bg-surface-hover border border-border group-hover:scale-110 group-hover:-rotate-3 transition-transform text-ink-blue">
                {cap.icon}
              </div>
              <h3 className="text-xl font-serif font-bold mb-4 text-foreground group-hover:text-ink-blue transition-colors sketch-underline w-max">{cap.title}</h3>
              <p className="text-foreground/80 leading-relaxed font-medium text-sm mt-4">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
