import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

type InvestorFrameKey =
  | "architecture"
  | "dataModel"
  | "schemaExplorer"
  | "security"
  | "aiPipeline"
  | "production";

type GalleryItem = {
  title: string;
  image?: string;
  frame?: InvestorFrameKey;
};

type Study = {
  type: string;
  title: string;
  desc: string;
  modules: string[];
  architecture: string;
  gallery?: GalleryItem[];
};

const studies: Study[] = [
  {
    type: "Front-End Architecture",
    title: "Property Management Ecosystem",
    desc: "A connected operations platform for residents, teams, access, billing, governance, and reporting.",
    modules: ["Resident Apps", "Gate Access", "Operations HQ", "Analytics"],
    architecture: "Multi-App • Mobile • Operations • Dashboards",
    gallery: [
      { title: "Community HQ", image: asset("deyrna-residents.png") },
      { title: "Resident App", image: asset("deyrna-resident-app.png") },
      { title: "Governance", image: asset("deyrna-governance.png") },
      { title: "Gate Access", image: asset("deyrna-gate-access.png") },
      { title: "FM Field", image: asset("deyrna-fm-tasks.png") },
      { title: "Amenities Booking", image: asset("deyrna-amenities.png") },
      { title: "Comms Inbox", image: asset("deyrna-comms-inbox.png") },
      { title: "Maintenance Command", image: asset("deyrna-maintenance-command.png") },
      { title: "Analytics · Operational Insight", image: asset("deyrna-analytics.png") }
    ]
  },
  {
    type: "AI Automation Architecture",
    title: "AI Automation Ad Spy Hub",
    desc: "A production-style automation pipeline that turns competitor ad signals into structured creative direction, generated variants, and publish-ready assets.",
    modules: ["Signal Discovery", "Creative Breakdown", "Variant Generation", "Publishing"],
    architecture: "Automation Pipeline • AI Generation • Creative Ops • Publishing",
    gallery: [
      { title: "The Pipeline", image: asset("adspy-pipeline.png") },
      { title: "Product Input", image: asset("adspy-product-input.png") },
      { title: "Signal Discovery", image: asset("adspy-signal-discovery.png") },
      { title: "Creative Breakdown", image: asset("adspy-creative-breakdown.png") },
      { title: "Brand Adaptation", image: asset("adspy-brand-adaptation.png") },
      { title: "AI Generation", image: asset("adspy-ai-generation.png") },
      { title: "Variant Studio", image: asset("adspy-variant-studio.png") },
      { title: "Final Output", image: asset("adspy-final-output.png") },
      { title: "Publishing", image: asset("adspy-publishing.png") }
    ]
  },
  {
    type: "Back-End Architecture",
    title: "Investor News Intelligence",
    desc: "A PostgreSQL/Supabase backend built to turn market news and disclosures into source-backed investor intelligence.",
    modules: ["Data Model", "RLS Security", "AI Pipeline", "Auditability"],
    architecture: "PostgreSQL • Supabase RLS • Multi-Tenant SaaS • AI Data Pipeline",
    gallery: [
      { title: "Backend Architecture", frame: "architecture" },
      { title: "Data Model / ERD", frame: "dataModel" },
      { title: "Schema Explorer", frame: "schemaExplorer" },
      { title: "RLS Security Model", frame: "security" },
      { title: "AI Intelligence Pipeline", frame: "aiPipeline" },
      { title: "Audit & Production Readiness", frame: "production" }
    ]
  }
];

function SketchArrow({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g transform={direction === "left" ? "translate(100 0) scale(-1 1)" : undefined}>
        <path d="M20 50 L80 50 M60 30 L80 50 L60 70 M10 80 Q 20 20 40 10" strokeDasharray="4 4" />
      </g>
    </svg>
  );
}

function SketchCloseIcon() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M32 32 L68 68 M70 30 L30 70" strokeDasharray="4 4" />
    </svg>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background/55 border border-border/70 p-4 shadow-sm">
      <div className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-foreground/55 font-bold">{label}</div>
    </div>
  );
}

function FlowStep({ label, note }: { label: string; note?: string }) {
  return (
    <div className="relative bg-background/65 border border-border/70 px-4 py-4 min-h-[92px] flex flex-col justify-center shadow-sm">
      <div className="text-sm md:text-base font-display font-bold text-foreground">{label}</div>
      {note && <div className="mt-2 text-[11px] leading-relaxed text-foreground/60">{note}</div>}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-[#161616] text-[#f4f3ef] border border-foreground/20 p-4 md:p-5 text-[11px] md:text-xs leading-relaxed overflow-hidden shadow-lg shadow-black/10 font-mono whitespace-pre-wrap">
      {children}
    </pre>
  );
}

function ErNode({ title, items, className = "" }: { title: string; items: string[]; className?: string }) {
  return (
    <div className={`bg-background/60 border border-border/80 p-4 shadow-sm ${className}`}>
      <h4 className="font-display font-bold text-base mb-3 text-foreground">{title}</h4>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-[11px] md:text-xs text-foreground/65 flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rotate-45 border border-foreground/35 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ConnectionLabel({ children }: { children: string }) {
  return (
    <div className="hidden md:flex items-center justify-center text-[10px] uppercase tracking-[0.14em] text-foreground/40 font-bold">
      {children}
    </div>
  );
}

function InvestorFrame({ frame }: { frame: InvestorFrameKey }) {
  if (frame === "architecture") {
    return (
      <div className="min-h-[58vh] bg-transparent px-2 md:px-10 py-4 md:py-8">
        <div className="grid lg:grid-cols-[0.95fr_1.4fr] gap-8 lg:gap-12 items-start">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-foreground/45">Backend architecture</span>
            <h4 className="mt-4 text-3xl md:text-5xl font-display font-bold leading-tight text-foreground">
              Source-backed investor intelligence, designed from the database up.
            </h4>
            <p className="mt-6 text-sm md:text-base leading-relaxed text-foreground/68 max-w-xl">
              A multi-tenant backend that keeps raw market sources, AI interpretation, alerts, and audit trails separated, scoped, and traceable.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-8">
              <StatCard label="Tables" value="44" />
              <StatCard label="RLS Policies" value="84" />
              <StatCard label="Functions" value="11" />
              <StatCard label="Views" value="3" />
            </div>
          </div>

          <div className="relative pt-2">
            <div className="grid md:grid-cols-5 gap-3 md:gap-4">
              <FlowStep label="News & Disclosures" note="provider payloads + source metadata" />
              <FlowStep label="Normalize" note="dedupe, timestamps, source reliability" />
              <FlowStep label="Match" note="entities to instruments with confidence" />
              <FlowStep label="Analyze" note="summary, sentiment, impact, confidence" />
              <FlowStep label="Brief & Alert" note="watchlist-aware output with evidence" />
            </div>
            <div className="mt-8 bg-background/55 border border-border/70 p-5 md:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-dashed border-border pb-4 mb-5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/45 font-bold">Design rule</div>
                  <div className="mt-1 font-display font-bold text-xl">Facts and AI output never overwrite each other.</div>
                </div>
                <div className="text-[10px] uppercase tracking-[0.14em] bg-surface-hover border border-border px-3 py-2 text-foreground/65 font-bold">Informational analysis</div>
              </div>
              <div className="grid md:grid-cols-3 gap-3 text-xs text-foreground/65">
                <div className="bg-surface/60 border border-border/60 p-4">Immutable raw payloads</div>
                <div className="bg-surface/60 border border-border/60 p-4">Versioned AI analysis</div>
                <div className="bg-surface/60 border border-border/60 p-4">Source-linked brief items</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (frame === "dataModel") {
    return (
      <div className="min-h-[58vh] bg-transparent px-2 md:px-10 py-4 md:py-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-foreground/45">Entity relationship view</span>
          <p className="mt-3 text-sm md:text-base text-foreground/65 leading-relaxed">
            The model separates tenancy, market reference data, source ingestion, AI interpretation, investor workspaces, and alerts.
          </p>
        </div>
        <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
          <ErNode title="Tenant Core" items={["tenants", "profiles", "tenant_memberships", "tenant_settings"]} />
          <ConnectionLabel>scopes</ConnectionLabel>
          <ErNode title="Investor Workspace" items={["portfolios", "portfolio_holdings", "watchlists", "watchlist_items"]} />
          <ConnectionLabel>watches</ConnectionLabel>
          <ErNode title="Market Reference" items={["exchanges", "instruments", "aliases", "sectors"]} />
        </div>
        <div className="flex justify-center my-5 text-foreground/30">
          <svg width="520" height="42" viewBox="0 0 520 42" fill="none" className="max-w-full">
            <path d="M260 0v40M70 20h380" stroke="currentColor" strokeDasharray="5 7" strokeWidth="1.5" />
            <path d="M260 40l-7-8M260 40l7-8" stroke="currentColor" strokeLinecap="round" />
          </svg>
        </div>
        <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
          <ErNode title="Source Ingestion" items={["news_sources", "ingestion_runs", "news_articles", "raw_payloads"]} />
          <ConnectionLabel>feeds</ConnectionLabel>
          <ErNode title="AI Intelligence" items={["ai_analysis_jobs", "article_ai_analysis", "daily_briefs", "brief_items"]} className="bg-surface-hover/55" />
          <ConnectionLabel>triggers</ConnectionLabel>
          <ErNode title="Alerts & Audit" items={["alert_rules", "alert_events", "source_links", "generated_content_audit"]} />
        </div>
      </div>
    );
  }

  if (frame === "schemaExplorer") {
    const tenantSnippet = `create table tenants (\n  id         uuid primary key default gen_random_uuid(),\n  slug       citext not null unique,\n  name       text not null,\n  is_active  boolean not null default true,\n  deleted_at timestamptz,\n  created_at timestamptz not null default now(),\n  constraint tenants_slug_format\n    check (slug ~ '^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$')\n);`;
    const rlsSnippet = `create policy portfolios_read on portfolios\n  for select using (\n    app.is_tenant_member(tenant_id) and (\n      visibility = 'tenant_shared'\n      or owner_id = auth.uid()\n      or app.has_tenant_role(tenant_id, array['tenant_admin']::tenant_role[])\n    )\n  );`;
    const aiSnippet = `create table article_ai_analysis (\n  tenant_id        uuid references tenants(id) on delete cascade,\n  article_id       uuid not null references news_articles(id),\n  summary          text not null,\n  sentiment        sentiment_label not null default 'neutral',\n  impact_score     numeric(5,2) check (impact_score between 0 and 100),\n  confidence_score numeric(4,3) check (confidence_score between 0 and 1),\n  model_name       text not null,\n  prompt_version   text not null,\n  review_status    review_status not null default 'unreviewed'\n);`;

    return (
      <div className="min-h-[58vh] bg-transparent px-2 md:px-10 py-4 md:py-7">
        <div className="grid lg:grid-cols-[0.85fr_1.35fr] gap-6 lg:gap-10 items-start">
          <div className="lg:sticky lg:top-4">
            <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-foreground/45">Schema Explorer</span>
            <h4 className="mt-4 text-3xl md:text-4xl font-display font-bold leading-tight">Schema logic behind the intelligence engine.</h4>
            <p className="mt-5 text-sm leading-relaxed text-foreground/65">
              The system is organized around tenancy, RLS policies, AI provenance, source evidence, and review workflows, with selected schema sections showing how the backend is structured.
            </p>
            <div className="mt-7 space-y-3">
              {[
                "Multi-tenant core",
                "Membership-driven policies",
                "AI output separated from source facts",
                "Review and audit lifecycle"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-foreground/75">
                  <span className="h-2 w-2 rotate-45 border border-foreground/45" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <CodeBlock>{tenantSnippet}</CodeBlock>
            <CodeBlock>{rlsSnippet}</CodeBlock>
            <CodeBlock>{aiSnippet}</CodeBlock>
          </div>
        </div>
      </div>
    );
  }

  if (frame === "security") {
    return (
      <div className="min-h-[58vh] bg-transparent px-2 md:px-10 py-4 md:py-8">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-foreground/45">RLS security model</span>
            <h4 className="mt-4 text-3xl md:text-5xl font-display font-bold leading-tight">Tenant isolation lives in the database.</h4>
            <p className="mt-6 text-sm md:text-base leading-relaxed text-foreground/65">
              The app can forget a filter. The database should not. Membership, role, workspace visibility, and service-only jobs are enforced with Row Level Security.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <StatCard label="Tables with RLS" value="44/44" />
              <StatCard label="Public RPCs" value="0" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/65 border border-border/70 p-5">
                <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/45 font-bold">Tenant A</div>
                <div className="mt-4 space-y-2 text-sm text-foreground/70">
                  <div className="bg-surface/80 border border-border p-3">Shared research book</div>
                  <div className="bg-surface/80 border border-border p-3">Approved AI analysis</div>
                  <div className="bg-surface/80 border border-border p-3">Private watchlist</div>
                </div>
              </div>
              <div className="bg-background/65 border border-border/70 p-5 opacity-65">
                <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/45 font-bold">Tenant B</div>
                <div className="mt-4 space-y-2 text-sm text-foreground/45">
                  <div className="bg-surface/60 border border-border p-3">Rows hidden by RLS</div>
                  <div className="bg-surface/60 border border-border p-3">Foreign insert rejected</div>
                  <div className="bg-surface/60 border border-border p-3">Private objects protected</div>
                </div>
              </div>
            </div>

            <div className="bg-background/65 border border-border/70 p-5">
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                {[
                  ["Viewer", "Read shared intelligence"],
                  ["Analyst", "Review AI output"],
                  ["Tenant admin", "Manage tenant scope"]
                ].map(([role, access]) => (
                  <div key={role} className="bg-surface/70 border border-border/60 p-4">
                    <div className="font-display font-bold text-base">{role}</div>
                    <div className="mt-2 text-foreground/60 leading-relaxed">{access}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-dashed border-border pt-4 text-xs text-foreground/60">
                Privileged RPCs authorize in-body, pin <span className="font-mono">search_path</span>, and revoke PUBLIC execute.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (frame === "aiPipeline") {
    return (
      <div className="min-h-[58vh] bg-transparent px-2 md:px-10 py-4 md:py-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-foreground/45">AI data pipeline</span>
          <h4 className="mt-3 text-3xl md:text-5xl font-display font-bold leading-tight">From noisy sources to traceable brief items.</h4>
        </div>

        <div className="grid md:grid-cols-6 gap-3">
          {[
            ["Fetch", "provider feeds"],
            ["Normalize", "raw vs facts"],
            ["Match", "ticker confidence"],
            ["Analyze", "summary + scores"],
            ["Review", "human approval"],
            ["Deliver", "briefs + alerts"]
          ].map(([label, note]) => (
            <div key={label}>
              <FlowStep label={label} note={note} />
            </div>
          ))}
        </div>

        <div className="mt-8 grid lg:grid-cols-[1fr_1.1fr] gap-6">
          <div className="bg-background/65 border border-border/70 p-5 md:p-6">
            <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/45 font-bold">Analysis artifact</div>
            <h5 className="mt-3 font-display font-bold text-2xl">Novatix guidance update</h5>
            <p className="mt-3 text-sm text-foreground/65 leading-relaxed">
              Source-backed summary with why-it-matters, risk notes, investor takeaway, sentiment, impact, and confidence.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="bg-surface/70 border border-border/60 p-3">
                <div className="text-[10px] text-foreground/45 uppercase tracking-[0.14em]">Sentiment</div>
                <div className="font-display font-bold text-lg mt-1">Negative</div>
              </div>
              <div className="bg-surface/70 border border-border/60 p-3">
                <div className="text-[10px] text-foreground/45 uppercase tracking-[0.14em]">Impact</div>
                <div className="font-display font-bold text-lg mt-1">82</div>
              </div>
              <div className="bg-surface/70 border border-border/60 p-3">
                <div className="text-[10px] text-foreground/45 uppercase tracking-[0.14em]">Confidence</div>
                <div className="font-display font-bold text-lg mt-1">0.91</div>
              </div>
            </div>
          </div>

          <div className="bg-background/65 border border-border/70 p-5 md:p-6">
            <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/45 font-bold mb-4">Stored provenance</div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {[
                "model_name + model_version",
                "prompt_version",
                "input / output token count",
                "estimated cost",
                "source article/disclosure",
                "review status"
              ].map((item) => (
                <div key={item} className="bg-surface/70 border border-border/60 p-4 text-foreground/65">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-dashed border-border pt-4 text-xs text-foreground/60">
              AI summaries never overwrite source facts. The system keeps the original evidence and the generated interpretation separate.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[58vh] bg-transparent px-2 md:px-10 py-4 md:py-8">
      <div className="grid lg:grid-cols-[0.9fr_1.2fr] gap-8 lg:gap-12 items-start">
        <div>
          <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-foreground/45">Production readiness</span>
          <h4 className="mt-4 text-3xl md:text-5xl font-display font-bold leading-tight">Backend readiness built into the system.</h4>
          <p className="mt-6 text-sm md:text-base leading-relaxed text-foreground/65">
            Validation queries, seed flows, hardened RPC grants, and operating notes support a security model that can be tested, reproduced, and maintained.
          </p>
          <div className="mt-8 bg-background/65 border border-border/70 p-5">
            <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/45 font-bold">Guardrail</div>
            <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
              The schema stores intelligence, impact, confidence, and briefs. It deliberately contains no buy/sell recommendation fields.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            ["RPC hardening", "PUBLIC execute revoked; service-only paths separated from user-callable paths."],
            ["Tenant isolation", "RLS checked under a non-superuser role with forged cross-tenant writes rejected."],
            ["Seed strategy", "Auth users are created through Supabase Auth; tenant data is seeded separately."],
            ["Validation suite", "Queries verify RLS, grants, tenant_id coverage, indexes, foreign keys, and seed counts."]
          ].map(([title, body]) => (
            <div key={title} className="bg-background/65 border border-border/70 p-5 md:p-6 flex gap-4">
              <span className="mt-1 h-4 w-4 border border-foreground/45 rotate-45 shrink-0" />
              <div>
                <div className="font-display font-bold text-xl">{title}</div>
                <div className="mt-2 text-sm text-foreground/62 leading-relaxed">{body}</div>
              </div>
            </div>
          ))}
          <CodeBlock>{`revoke all on function record_usage(...) from public;\ngrant execute on function record_usage(...) to service_role;\n\n-- user-facing RPCs still validate tenant membership in-body\ngrant execute on function generate_daily_brief(...) to authenticated, service_role;`}</CodeBlock>
        </div>
      </div>
    </div>
  );
}

export function CaseStudies() {
  const [activeGallery, setActiveGallery] = useState<GalleryItem[] | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const pageFlipVariants = {
    enter: (direction: 1 | -1) => ({
      opacity: 0,
      x: direction * 70,
      rotateY: direction * -18,
      rotateZ: direction * 0.7,
      filter: "blur(1px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      rotateZ: 0,
      filter: "blur(0px)",
    },
    exit: (direction: 1 | -1) => ({
      opacity: 0,
      x: direction * -70,
      rotateY: direction * 18,
      rotateZ: direction * -0.7,
      filter: "blur(1px)",
    }),
  };

  const revealControls = (delay = 520) => {
    window.setTimeout(() => setControlsVisible(true), delay);
  };

  const openGallery = (gallery?: GalleryItem[]) => {
    if (!gallery) return;
    setControlsVisible(false);
    setSlideDirection(1);
    setActiveSlide(0);
    setActiveGallery(gallery);
    revealControls(620);
  };

  const closeGallery = () => {
    setActiveGallery(null);
    setSlideDirection(1);
    setActiveSlide(0);
    setControlsVisible(true);
  };

  const goToPrevious = () => {
    if (!activeGallery) return;
    if (activeSlide === 0) {
      closeGallery();
      return;
    }
    setControlsVisible(false);
    setSlideDirection(-1);
    setActiveSlide((current) => current - 1);
    revealControls();
  };

  const goToNext = () => {
    if (!activeGallery) return;
    if (activeSlide === activeGallery.length - 1) {
      closeGallery();
      return;
    }
    setControlsVisible(false);
    setSlideDirection(1);
    setActiveSlide((current) => current + 1);
    revealControls();
  };

  const activeItem = activeGallery?.[activeSlide];

  return (
    <section className="py-32 bg-background relative overflow-hidden" id="projects">
      <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-20" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-24">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-foreground/40 mb-6 block">Portfolio</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-8 tracking-tight">Featured Systems</h2>
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
            Selected builds showing different sides of my work.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {activeGallery && activeItem ? (
            <motion.div
              key="showcase"
              initial={{ opacity: 0, y: 30, rotateX: -8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: 20, rotateX: 8 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="bg-surface sketch-border border border-border/70 p-5 md:p-8 lg:p-10 shadow-2xl shadow-black/10 relative overflow-hidden"
              style={{ transformPerspective: "1400px" }}
            >
              <button
                type="button"
                onClick={closeGallery}
                aria-label="Close showcase and return to systems"
                className={`absolute right-5 md:right-8 top-6 md:top-8 z-30 h-10 w-10 text-foreground/55 hover:text-ink-blue transition-all duration-300 ${controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <SketchCloseIcon />
              </button>

              <div className="relative">
                <AnimatePresence mode="wait" custom={slideDirection}>
                  <motion.div
                    key={activeSlide}
                    custom={slideDirection}
                    variants={pageFlipVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="origin-center"
                    style={{
                      transformPerspective: "1400px",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="relative mb-8 min-h-[3.5rem] flex items-center justify-center px-12 md:px-16">
                      <h3 className="max-w-[calc(100%-1rem)] text-center text-[2.2rem] md:text-[3.4rem] text-ink-blue [font-family:'Caveat',cursive] font-bold leading-none tracking-tight">
                        {activeItem.title}
                      </h3>
                    </div>

                    {(() => {
                      const isAdSpy = activeItem.image?.includes("/adspy-");
                      const isInvestor = Boolean(activeItem.frame);
                      const wrapperClass = isAdSpy || isInvestor
                        ? "relative bg-transparent p-0 border-0 shadow-none overflow-visible"
                        : "relative bg-surface sketch-border p-3 md:p-5 shadow-xl shadow-black/10 overflow-hidden";
                      const imageClass = isAdSpy
                        ? "relative z-10 block w-full max-h-[72vh] object-contain"
                        : "relative z-10 w-full max-h-[72vh] object-contain rounded-sm drop-shadow-[0_16px_28px_rgba(17,17,17,0.08)]";

                      return (
                        <div className={wrapperClass}>
                          {activeItem.frame ? (
                            <InvestorFrame frame={activeItem.frame} />
                          ) : activeItem.image ? (
                            <img
                              src={activeItem.image}
                              alt={activeItem.title}
                              className={imageClass}
                            />
                          ) : null}
                        </div>
                      );
                    })()}
                  </motion.div>
                </AnimatePresence>

                <button
                  type="button"
                  onClick={goToPrevious}
                  aria-label={activeSlide === 0 ? "Return to systems" : "Previous image"}
                  className={`absolute left-0 md:left-1 top-[58%] z-20 h-14 w-14 md:h-20 md:w-20 -translate-y-1/2 text-ink-blue/70 hover:text-ink-blue transition-all duration-300 ${controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                >
                  <SketchArrow direction="left" />
                </button>

                <button
                  type="button"
                  onClick={goToNext}
                  aria-label={activeSlide === activeGallery.length - 1 ? "Return to systems" : "Next image"}
                  className={`absolute right-0 md:right-1 top-[58%] z-20 h-14 w-14 md:h-20 md:w-20 -translate-y-1/2 text-ink-blue/70 hover:text-ink-blue transition-all duration-300 ${controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                >
                  <SketchArrow direction="right" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid lg:grid-cols-3 gap-10"
            >
              {studies.map((study, i) => (
                <motion.div
                  key={study.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => openGallery(study.gallery)}
                  className={`flex flex-col h-full bg-surface sketch-border group transition-all duration-500 hover:bg-background hover:-translate-y-2 ${study.gallery ? "cursor-pointer" : ""}`}
                >
                  <div className="p-10 lg:p-12 flex-1 flex flex-col pt-12 border border-transparent group-hover:border-border transition-colors relative">
                    {study.gallery && (
                      <motion.svg
                        className="absolute top-8 right-8 w-12 h-12 text-ink-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d="M20 50 L80 50 M60 30 L80 50 L60 70 M10 80 Q 20 20 40 10" strokeDasharray="4 4" />
                      </motion.svg>
                    )}

                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/70 mb-6 block sketch-border bg-surface-hover px-3 py-1 inline-block self-start">
                      {study.type}
                    </span>

                    <h3 className="text-3xl font-serif font-bold mb-6 text-foreground group-hover:text-ink-blue transition-colors w-max max-w-full sketch-underline">{study.title}</h3>
                    <p className="text-foreground/90 mb-10 font-medium text-base leading-relaxed">
                      {study.desc}
                    </p>

                    <div className="mt-auto">
                      <div className="h-px w-full border-t border-dashed border-border mb-8" />
                      <h4 className="text-[10px] font-bold text-foreground/60 mb-5 tracking-[0.2em] uppercase">Showcase Focus</h4>
                      <ul className="flex flex-col gap-3 mb-10">
                        {study.modules.map((mod) => (
                          <li key={mod} className="text-sm text-foreground/80 tracking-wide font-medium flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:border before:border-foreground/50 before:rotate-45 before:mr-3">
                            {mod}
                          </li>
                        ))}
                      </ul>

                      <div className="pt-6 border-t border-dashed border-border">
                        <p className="text-[10px] text-foreground/70 font-sans font-bold tracking-[0.1em] uppercase">
                          {study.architecture}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}