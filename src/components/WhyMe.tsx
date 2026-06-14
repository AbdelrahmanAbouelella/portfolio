import { motion } from "motion/react";

const partnerPoints = [
  "For businesses that want to grow with the right software foundation, clearer reporting, and better decisions built from their own data.",
  "For companies that have outgrown generic templates and need software that belongs to their operation, their users, and their way of working.",
  "For teams that need a clean, modern experience their users can understand, trust, and use without friction.",
  "For products that need structure behind the scenes: data, permissions, reports, automation, and logic that stay organized as the system grows.",
  "For businesses planning to expand later, add new features, support more users, connect more tools, and evolve without starting from scratch every time.",
  "The goal is software that looks polished, works clearly, and stays useful as the business becomes bigger, faster, and more demanding."
];

export function WhyMe() {
  return (
    <section className="py-32 lg:py-40 bg-surface relative overflow-hidden" id="why-me">
      <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-30" />

      {/* Floating abstract sketch background elements */}
      <motion.svg className="absolute bottom-10 left-10 w-[600px] h-[600px] text-foreground opacity-5 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
        <circle cx="50" cy="50" r="45" strokeDasharray="2 4" />
        <circle cx="50" cy="50" r="30" strokeDasharray="1 5" />
        <line x1="50" y1="0" x2="50" y2="100" strokeDasharray="4 4" />
        <line x1="0" y1="50" x2="100" y2="50" strokeDasharray="4 4" />
      </motion.svg>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-28">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-foreground/70 mb-6 block">Value</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-8 tracking-tight">Why Partner With Me</h2>
          <p className="text-lg md:text-xl text-foreground/90 font-medium max-w-3xl mx-auto leading-relaxed">
            If you want to build your own software, shaped around your business, your workflow, and the way your team actually operates.
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
              {/* Fun animated checklist dot */}
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
