import { motion } from "motion/react";

const steps = [
  {
    number: "I",
    title: "Map the Workflow",
    desc: "I document exactly how your business operates, identifying users, roles, approvals, data inputs, workflow states, and edge cases before writing a single line of code."
  },
  {
    number: "II",
    title: "Design the Data Model",
    desc: "I structure the database around clear entities, relationships, constraints, statuses, and scalable foundations that support the product long term."
  },
  {
    number: "III",
    title: "Build Backend Logic",
    desc: "I develop the rules behind the system, including validation flows, protected actions, role-based permissions, API endpoints, and process handling."
  },
  {
    number: "IV",
    title: "Shape the Front End",
    desc: "I build clean, responsive interfaces shaped around user roles, task priority, clear navigation, form states, and smooth day-to-day interaction."
  },
  {
    number: "V",
    title: "Add Reporting & Automation",
    desc: "I connect dashboards, reporting logic, notifications, scheduled processes, exports, and integrations that help the business operate with better visibility."
  },
  {
    number: "VI",
    title: "Launch & Handover",
    desc: "I test the full workflow, prepare the production setup, document the system, and hand over software that can be operated, maintained, and extended."
  }
];

export function Process() {
  return (
    <section className="py-32 bg-background relative overflow-hidden" id="process">
      <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-40" />
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-28 relative">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-foreground/60 mb-6 block">Methodology</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-8 tracking-tight">How I Turn Ideas into Systems</h2>
          <p className="text-lg md:text-xl text-foreground/80 font-medium max-w-2xl mx-auto leading-relaxed">Structured from first idea to launch.</p>
          
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
              <div className="flex items-center justify-center w-12 h-12 bg-background border-2 border-foreground md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shrink-0 shadow-md transition-all duration-300 sketch-border group-hover:scale-110 group-hover:bg-foreground">
                <span className="text-xs font-serif font-bold text-foreground tracking-wider group-hover:text-background transition-colors">{step.number}</span>
              </div>
              
              {/* Content box */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-5rem)] pt-1 md:pt-0 pb-4 sketch-border bg-surface p-8 relative group-hover:bg-surface-hover transition-colors">
                {/* Connecting horizontal animated line (larger screens only) */}
                <motion.div className="hidden md:block absolute top-1/2 w-8 h-1 bg-foreground origin-left md:group-even:-left-12 md:group-even:rotate-180 md:group-odd:-right-12"
                  initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once:true }} transition={{ delay: 0.5 }}
                />

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
