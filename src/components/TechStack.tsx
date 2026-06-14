import { motion } from "motion/react";
import { Monitor, Server, Database, BarChart3, Settings, Rocket } from "lucide-react";

const categories = [
  {
    icon: <Monitor className="w-5 h-5" />,
    title: "Interface Engineering",
    skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "Component Systems", "Form & State Logic"]
  },
  {
    icon: <Server className="w-5 h-5" />,
    title: "Application Layer",
    skills: ["Node.js / Express", "REST / RPC APIs", "Authentication Flows", "Validation Boundaries", "Workflow Services"]
  },
  {
    icon: <Database className="w-5 h-5" />,
    title: "Data & Security",
    skills: ["PostgreSQL / Supabase", "Schema Design", "RBAC / RLS", "Migrations", "Constraints & Data Integrity"]
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Reporting Layer",
    skills: ["Operational Dashboards", "Analytics Views", "Report Logic", "Activity Logs", "Data Exports"]
  },
  {
    icon: <Settings className="w-5 h-5" />,
    title: "Automation Layer",
    skills: ["Scheduled Jobs", "Notifications", "AI API Workflows", "External Tool Integrations", "Background Processes"]
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    title: "Delivery & Quality",
    skills: ["Git Workflows", "Environment Setup", "Type Checks", "Build Validation", "Documentation & Handover"]
  }
];

export function TechStack() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-20" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-foreground/40 mb-6 block">Technology</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-8 tracking-tight">Engineering Stack</h2>
          <p className="text-lg md:text-xl text-foreground/60 font-light max-w-2xl mx-auto leading-relaxed">
            Tools, patterns, and delivery practices I use to build complete software products from interface to infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="sketch-border p-10 bg-surface border border-transparent transition-all duration-500 hover:bg-surface-hover"
            >
              <div className="flex items-center gap-6 mb-10">
                <div className="text-foreground/40 sketch-border p-2 bg-background group-hover:text-foreground transition-colors">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-serif font-medium tracking-wide text-foreground">{cat.title}</h3>
              </div>
              <ul className="space-y-5">
                {cat.skills.map((skill, j) => (
                  <li key={j} className="text-foreground/60 text-sm flex items-center before:content-[''] before:w-1.5 before:h-px before:bg-foreground/30 before:mr-4 font-light tracking-wide">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
