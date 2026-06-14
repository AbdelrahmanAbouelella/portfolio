import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

const layers = [
  { name: "Tenant & Context Scoping", desc: "Separated company, compound, unit, and user context." },
  { name: "Role-Based Access Control", desc: "Scoped permissions, protected actions, and visibility rules." },
  { name: "Relational Data Integrity", desc: "Clean schemas, constraints, statuses, and audit fields." },
  { name: "API & RPC Boundaries", desc: "Secure calls between the interface and data layer." },
  { name: "Workflow State Management", desc: "Clear lifecycles for requests, approvals, payments, passes, and tasks." },
  { name: "Automation & Integrations", desc: "Scheduled jobs, notifications, exports, billing, and external services." },
  { name: "Release Discipline", desc: "Type checks, audits, tests, migrations, builds, and handover readiness." },
];

export function Architecture() {
  return (
    <section className="py-32 bg-background relative overflow-hidden" id="architecture">
      {/* Decorative diagram in background */}
      <motion.svg className="absolute top-10 right-10 w-[500px] h-[500px] text-foreground opacity-[0.04] pointer-events-none hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="10" y="10" width="30" height="30" strokeDasharray="2 2"/>
        <rect x="60" y="10" width="30" height="30" strokeDasharray="2 2"/>
        <rect x="35" y="60" width="30" height="30" strokeDasharray="2 2"/>
        <line x1="25" y1="40" x2="50" y2="60" strokeDasharray="1 3"/>
        <line x1="75" y1="40" x2="50" y2="60" strokeDasharray="1 3"/>
      </motion.svg>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        <div className="lg:w-1/2 mb-16 lg:mb-0">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-foreground/60 mb-6 block">Foundation</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-8 tracking-tight">Technical Foundations</h2>
          <p className="text-lg md:text-xl text-foreground/90 font-medium mb-12 max-w-md leading-relaxed">
            I build systems on a connected technical foundation, where context, access control, data integrity, workflow states, automation, and release checks operate as structured layers within one coherent product.
          </p>
          <a href="#contact" className="text-[10px] font-bold uppercase tracking-widest text-foreground hover:text-ink-blue transition-colors flex items-center gap-4 group w-max sketch-underline pb-2">
            Discuss Your System
            <span className="w-12 h-px bg-foreground group-hover:w-16 transition-all"></span>
          </a>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center relative">
          {/* Vertical drawn connection line behind blocks */}
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
      </div>
    </section>
  );
}
