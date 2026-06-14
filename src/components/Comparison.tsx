import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const frontEndItems = [
  "Interfaces designed around user flows, roles, and task priority",
  "Clean layouts with consistent components, states, and feedback",
  "Forms, dashboards, pages, and actions built for smooth interaction",
  "Responsive experiences that stay clear across devices and screens",
  "Visual and interaction details that keep the experience polished, organized, and consistent"
];

const backEndItems = [
  "Data structures planned around the product’s modules and workflows",
  "Access control for users, roles, permissions, and protected actions",
  "Logic that handles requests, approvals, statuses, and system outcomes",
  "Reporting layers that turn stored data into useful visibility",
  "Automation for notifications, schedules, repeated tasks, and process flow",
  "Maintainable architecture built for stability, extension, and long-term use"
];

export function Comparison() {
  return (
    <section className="py-32 bg-background relative overflow-hidden" id="comparison">
      <div className="absolute inset-0 blueprint-grid pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24 relative">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-8 tracking-tight">
            Elegant by design. Engineered with sophistication.
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-4xl mx-auto font-medium leading-relaxed">
            I build both sides of the product: the front-end experience users interact with, and the back-end foundation that organizes data, controls access, handles logic, and keeps the system operating with clarity.
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
              <span className="text-ink-blue sketch-underline inline-block">Front End</span> Experience
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
              <span className="text-warm-orange sketch-underline inline-block">Back End</span> Engineering
            </h3>
            <ul className="space-y-6">
              {backEndItems.map((item, i) => (
                <li key={i} className="flex items-start gap-5 text-foreground/90 font-bold tracking-wide">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 text-warm-orange shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            
            <motion.svg className="absolute bottom-10 right-10 w-20 h-20 text-sepia opacity-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" initial={{ rotate: -45, scale: 0 }} whileInView={{ rotate: 10, scale: 1 }} viewport={{ once:true }} transition={{ type: "spring", delay: 0.5 }}>
              <polygon points="50,10 61,39 92,39 67,58 76,87 50,70 24,87 33,58 8,39 39,39" strokeDasharray="2 2" />
            </motion.svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
