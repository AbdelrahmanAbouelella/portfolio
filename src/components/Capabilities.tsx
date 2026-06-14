import { motion } from "motion/react";
import { Users, Building2, Calendar, Package, LineChart, Layout } from "lucide-react";

const capabilities = [
  {
    icon: <Users className="w-5 h-5 text-foreground/60 group-hover:text-primary-500 transition-colors" />,
    title: "Customer & Sales Platforms",
    desc: "Lead capture, customer records, pipelines, follow-ups, activity history, reporting views, and controlled sales workflows."
  },
  {
    icon: <Package className="w-5 h-5 text-foreground/60 group-hover:text-primary-500 transition-colors" />,
    title: "Operations & Workflow Systems",
    desc: "Request lifecycles, approvals, task assignment, scheduling, status tracking, stock movement, and operational dashboards."
  },
  {
    icon: <Building2 className="w-5 h-5 text-foreground/60 group-hover:text-primary-500 transition-colors" />,
    title: "HR & Employee Systems",
    desc: "Employee profiles, attendance, payroll workflows, self-service portals, approvals, documents, and role-based management views."
  },
  {
    icon: <LineChart className="w-5 h-5 text-foreground/60 group-hover:text-primary-500 transition-colors" />,
    title: "Finance, Billing & Reporting",
    desc: "Invoices, payments, expenses, cashflow views, reporting logic, and dashboards that turn business data into decisions."
  },
  {
    icon: <Layout className="w-5 h-5 text-foreground/60 group-hover:text-primary-500 transition-colors" />,
    title: "Portals & Admin Tools",
    desc: "Role-based portals for clients, employees, managers, and admins, with protected actions, permissions, and oversight."
  },
  {
    icon: <Calendar className="w-5 h-5 text-foreground/60 group-hover:text-primary-500 transition-colors" />,
    title: "Specialized Custom Systems",
    desc: "Software designed around unique business rules, complex workflows, integrations, and processes that standard tools cannot handle."
  }
];

export function Capabilities() {
  return (
    <section className="py-32 px-6 bg-background relative" id="systems">
      <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-20" />
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-foreground/40 mb-6 block">Capabilities</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-8 tracking-tight">Custom Systems, Built Around the Business</h2>
          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto font-light leading-relaxed">Every business runs differently. I build tailored software around the way your operations run, from internal platforms and client portals to workflows, reporting, automation, and specialized systems designed for your exact needs.</p>
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
