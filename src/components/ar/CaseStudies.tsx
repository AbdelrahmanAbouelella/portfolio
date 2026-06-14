import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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
    type: "معمارية الواجهة الأمامية",
    title: "منظومة إدارة المجتمعات والعقارات",
    desc: "منصة تشغيل مترابطة للسكان، الفرق، الدخول، الفوترة، الحوكمة، والتقارير.",
    modules: ["تطبيقات السكان", "الدخول من البوابات", "مركز العمليات", "التحليلات"],
    architecture: "تطبيقات متعددة • موبايل • تشغيل • لوحات متابعة",
    gallery: [
      { title: "مركز إدارة المجتمع", image: "/deyrna-residents.png" },
      { title: "تطبيق السكان", image: "/deyrna-resident-app.png" },
      { title: "الحوكمة", image: "/deyrna-governance.png" },
      { title: "الدخول من البوابات", image: "/deyrna-gate-access.png" },
      { title: "فرق الصيانة الميدانية", image: "/deyrna-fm-tasks.png" },
      { title: "حجز المرافق", image: "/deyrna-amenities.png" },
      { title: "صندوق التواصل", image: "/deyrna-comms-inbox.png" },
      { title: "مركز قيادة الصيانة", image: "/deyrna-maintenance-command.png" },
      { title: "تحليلات · رؤية تشغيلية", image: "/deyrna-analytics.png" }
    ]
  },
  {
    type: "معمارية أتمتة الذكاء الاصطناعي",
    title: "منصة أتمتة Ad Spy Hub",
    desc: "خط أتمتة يحوّل إشارات الإعلانات المنافسة إلى اتجاه إبداعي منظم، نسخ متعددة مولّدة، ومخرجات جاهزة للنشر.",
    modules: ["اكتشاف الإشارات", "تحليل الفكرة الإعلانية", "توليد النسخ", "النشر"],
    architecture: "خط أتمتة • توليد بالذكاء الاصطناعي • عمليات إبداعية • نشر",
    gallery: [
      { title: "خط الأتمتة", image: "/adspy-pipeline.png" },
      { title: "إدخال المنتج", image: "/adspy-product-input.png" },
      { title: "اكتشاف الإشارات", image: "/adspy-signal-discovery.png" },
      { title: "تحليل الفكرة الإعلانية", image: "/adspy-creative-breakdown.png" },
      { title: "تكييف الفكرة مع البراند", image: "/adspy-brand-adaptation.png" },
      { title: "توليد بالذكاء الاصطناعي", image: "/adspy-ai-generation.png" },
      { title: "استوديو النسخ", image: "/adspy-variant-studio.png" },
      { title: "المخرجات النهائية", image: "/adspy-final-output.png" },
      { title: "النشر", image: "/adspy-publishing.png" }
    ]
  },
  {
    type: "معمارية الخلفية",
    title: "منصة ذكاء أخبار المستثمرين",
    desc: "Backend مبني على PostgreSQL وSupabase لتحويل أخبار السوق والإفصاحات إلى ذكاء استثماري موثق بالمصادر.",
    modules: ["نموذج البيانات", "أمان RLS", "خط الذكاء الاصطناعي", "قابلية التدقيق"],
    architecture: "PostgreSQL • Supabase RLS • SaaS متعدد العملاء • AI Data Pipeline",
    gallery: [
      { title: "معمارية الخلفية", frame: "architecture" },
      { title: "نموذج البيانات / ERD", frame: "dataModel" },
      { title: "مستعرض السكيمة", frame: "schemaExplorer" },
      { title: "نموذج أمان RLS", frame: "security" },
      { title: "خط ذكاء البيانات", frame: "aiPipeline" },
      { title: "التدقيق وجاهزية الإنتاج", frame: "production" }
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
            <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-foreground/45">معمارية خلفية</span>
            <h4 className="mt-4 text-3xl md:text-5xl font-display font-bold leading-tight text-foreground">
              ذكاء استثماري موثق بالمصادر، مصمم من قاعدة البيانات إلى أعلى.
            </h4>
            <p className="mt-6 text-sm md:text-base leading-relaxed text-foreground/68 max-w-xl">
              بنية خلفية متعددة العملاء تفصل مصادر السوق الخام، تفسير الذكاء الاصطناعي، التنبيهات، وسجل التدقيق داخل نطاقات واضحة وقابلة للتتبع.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-8">
              <StatCard label="جداول" value="44" />
              <StatCard label="سياسات RLS" value="84" />
              <StatCard label="دوال" value="11" />
              <StatCard label="Views" value="3" />
            </div>
          </div>

          <div className="relative pt-2">
            <div className="grid md:grid-cols-5 gap-3 md:gap-4">
              <FlowStep label="الأخبار والإفصاحات" note="بيانات المزوّد + معلومات المصدر" />
              <FlowStep label="تنظيم" note="إزالة التكرار، التوقيت، موثوقية المصدر" />
              <FlowStep label="مطابقة" note="ربط الكيانات بالأدوات بثقة" />
              <FlowStep label="تحليل" note="ملخص، اتجاه، تأثير، ثقة" />
              <FlowStep label="ملخص وتنبيه" note="مخرجات مرتبطة بقوائم المتابعة ومسنودة بدليل" />
            </div>
            <div className="mt-8 bg-background/55 border border-border/70 p-5 md:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-dashed border-border pb-4 mb-5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/45 font-bold">قاعدة التصميم</div>
                  <div className="mt-1 font-display font-bold text-xl">الحقائق ومخرجات الذكاء الاصطناعي لا يطغى أحدهما على الآخر.</div>
                </div>
                <div className="text-[10px] uppercase tracking-[0.14em] bg-surface-hover border border-border px-3 py-2 text-foreground/65 font-bold">تحليل معلوماتي</div>
              </div>
              <div className="grid md:grid-cols-3 gap-3 text-xs text-foreground/65">
                <div className="bg-surface/60 border border-border/60 p-4">مصادر خام غير قابلة للتغيير</div>
                <div className="bg-surface/60 border border-border/60 p-4">تحليل AI بإصدارات محفوظة</div>
                <div className="bg-surface/60 border border-border/60 p-4">عناصر ملخص مرتبطة بالمصدر</div>
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
          <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-foreground/45">عرض علاقات البيانات</span>
          <p className="mt-3 text-sm md:text-base text-foreground/65 leading-relaxed">
            النموذج يفصل بين العملاء، بيانات السوق المرجعية، إدخال المصادر، تفسير الذكاء الاصطناعي، مساحات عمل المستثمرين، والتنبيهات.
          </p>
        </div>
        <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
          <ErNode title="نواة العملاء" items={["tenants", "profiles", "tenant_memberships", "tenant_settings"]} />
          <ConnectionLabel>يحدد النطاق</ConnectionLabel>
          <ErNode title="مساحة عمل المستثمر" items={["portfolios", "portfolio_holdings", "watchlists", "watchlist_items"]} />
          <ConnectionLabel>يتابع</ConnectionLabel>
          <ErNode title="بيانات السوق" items={["exchanges", "instruments", "aliases", "sectors"]} />
        </div>
        <div className="flex justify-center my-5 text-foreground/30">
          <svg width="520" height="42" viewBox="0 0 520 42" fill="none" className="max-w-full">
            <path d="M260 0v40M70 20h380" stroke="currentColor" strokeDasharray="5 7" strokeWidth="1.5" />
            <path d="M260 40l-7-8M260 40l7-8" stroke="currentColor" strokeLinecap="round" />
          </svg>
        </div>
        <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
          <ErNode title="إدخال المصادر" items={["news_sources", "ingestion_runs", "news_articles", "raw_payloads"]} />
          <ConnectionLabel>يغذي</ConnectionLabel>
          <ErNode title="ذكاء البيانات" items={["ai_analysis_jobs", "article_ai_analysis", "daily_briefs", "brief_items"]} className="bg-surface-hover/55" />
          <ConnectionLabel>يشغّل</ConnectionLabel>
          <ErNode title="التنبيهات والتدقيق" items={["alert_rules", "alert_events", "source_links", "generated_content_audit"]} />
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
            <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-foreground/45">مستعرض السكيمة</span>
            <h4 className="mt-4 text-3xl md:text-4xl font-display font-bold leading-tight">طبقة بيانات تدعم محرك التحليل.</h4>
            <p className="mt-5 text-sm leading-relaxed text-foreground/65">
              يعتمد النظام على سكيمة منظمة حول تعدد العملاء، سياسات RLS، تتبع مخرجات الذكاء الاصطناعي، ربط المصادر، ودورة مراجعة واضحة للنتائج.
            </p>
            <div className="mt-7 space-y-3">
              {[
                "نواة متعددة العملاء",
                "سياسات مبنية على العضوية",
                "فصل مخرجات AI عن حقائق المصدر",
                "دورة مراجعة وتدقيق"
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
            <h4 className="mt-4 text-3xl md:text-5xl font-display font-bold leading-tight">عزل العملاء موجود داخل قاعدة البيانات.</h4>
            <p className="mt-6 text-sm md:text-base leading-relaxed text-foreground/65">
              التطبيق قد ينسى شرط فلترة. قاعدة البيانات لا يجب أن تفعل. العضوية، الدور، ظهور مساحات العمل، ومهام الخدمة تُفرض من خلال Row Level Security.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <StatCard label="جداول عليها RLS" value="44/44" />
              <StatCard label="RPCs عامة" value="0" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/65 border border-border/70 p-5">
                <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/45 font-bold">العميل A</div>
                <div className="mt-4 space-y-2 text-sm text-foreground/70">
                  <div className="bg-surface/80 border border-border p-3">دفتر أبحاث مشترك</div>
                  <div className="bg-surface/80 border border-border p-3">تحليل AI معتمد</div>
                  <div className="bg-surface/80 border border-border p-3">قائمة متابعة خاصة</div>
                </div>
              </div>
              <div className="bg-background/65 border border-border/70 p-5 opacity-65">
                <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/45 font-bold">العميل B</div>
                <div className="mt-4 space-y-2 text-sm text-foreground/45">
                  <div className="bg-surface/60 border border-border p-3">صفوف مخفية بواسطة RLS</div>
                  <div className="bg-surface/60 border border-border p-3">إدخال خارج النطاق مرفوض</div>
                  <div className="bg-surface/60 border border-border p-3">العناصر الخاصة محمية</div>
                </div>
              </div>
            </div>

            <div className="bg-background/65 border border-border/70 p-5">
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                {[
                  ["مشاهد", "قراءة الذكاء المشترك"],
                  ["محلل", "مراجعة مخرجات AI"],
                  ["مدير العميل", "إدارة نطاق العميل"]
                ].map(([role, access]) => (
                  <div key={role} className="bg-surface/70 border border-border/60 p-4">
                    <div className="font-display font-bold text-base">{role}</div>
                    <div className="mt-2 text-foreground/60 leading-relaxed">{access}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-dashed border-border pt-4 text-xs text-foreground/60">
                الدوال الحساسة تتحقق من الصلاحية داخلها، وتثبت <span className="font-mono">search_path</span>، وتمنع التنفيذ العام.
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
          <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-foreground/45">خط بيانات الذكاء الاصطناعي</span>
          <h4 className="mt-3 text-3xl md:text-5xl font-display font-bold leading-tight">من مصادر مزدحمة إلى ملخصات قابلة للتتبع.</h4>
        </div>

        <div className="grid md:grid-cols-6 gap-3">
          {[
            ["جلب", "مصادر المزودين"],
            ["تنظيم", "الخام مقابل الحقائق"],
            ["مطابقة", "ثقة ربط الرموز"],
            ["تحليل", "ملخص + درجات"],
            ["مراجعة", "اعتماد بشري"],
            ["تسليم", "ملخصات + تنبيهات"]
          ].map(([label, note]) => (
            <div key={label}>
              <FlowStep label={label} note={note} />
            </div>
          ))}
        </div>

        <div className="mt-8 grid lg:grid-cols-[1fr_1.1fr] gap-6">
          <div className="bg-background/65 border border-border/70 p-5 md:p-6">
            <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/45 font-bold">مخرج التحليل</div>
            <h5 className="mt-3 font-display font-bold text-2xl">تحديث توجيهات Novatix</h5>
            <p className="mt-3 text-sm text-foreground/65 leading-relaxed">
              ملخص موثق بالمصدر يتضمن: لماذا يهم، ملاحظات المخاطر، خلاصة المستثمر، الاتجاه، التأثير، والثقة.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="bg-surface/70 border border-border/60 p-3">
                <div className="text-[10px] text-foreground/45 uppercase tracking-[0.14em]">الاتجاه</div>
                <div className="font-display font-bold text-lg mt-1">سلبي</div>
              </div>
              <div className="bg-surface/70 border border-border/60 p-3">
                <div className="text-[10px] text-foreground/45 uppercase tracking-[0.14em]">التأثير</div>
                <div className="font-display font-bold text-lg mt-1">82</div>
              </div>
              <div className="bg-surface/70 border border-border/60 p-3">
                <div className="text-[10px] text-foreground/45 uppercase tracking-[0.14em]">الثقة</div>
                <div className="font-display font-bold text-lg mt-1">0.91</div>
              </div>
            </div>
          </div>

          <div className="bg-background/65 border border-border/70 p-5 md:p-6">
            <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/45 font-bold mb-4">التتبع المخزن</div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {[
                "model_name + model_version",
                "prompt_version",
                "عدد input / output tokens",
                "التكلفة المقدرة",
                "مصدر الخبر/الإفصاح",
                "حالة المراجعة"
              ].map((item) => (
                <div key={item} className="bg-surface/70 border border-border/60 p-4 text-foreground/65">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-dashed border-border pt-4 text-xs text-foreground/60">
              ملخصات AI لا تستبدل حقائق المصدر. النظام يحتفظ بالدليل الأصلي والتفسير المولد كطبقتين منفصلتين.
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
          <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-foreground/45">جاهزية الإنتاج</span>
          <h4 className="mt-4 text-3xl md:text-5xl font-display font-bold leading-tight">جاهزية تشغيل مبنية داخل الخلفية.</h4>
          <p className="mt-6 text-sm md:text-base leading-relaxed text-foreground/65">
            تدعم الخلفية استعلامات تحقق، بيانات تأسيس، صلاحيات RPC مؤمنة، ومسار تشغيل يساعد على اختبار نموذج الأمان وصيانته بثبات.
          </p>
          <div className="mt-8 bg-background/65 border border-border/70 p-5">
            <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/45 font-bold">ضابط أمان</div>
            <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
              السكيمة تخزن الذكاء، التأثير، الثقة، والملخصات. ولا تحتوي عمدًا على أي حقول توصية شراء أو بيع.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            ["تأمين RPC", "تم منع التنفيذ العام، وفصل مسارات الخدمة عن المسارات التي يستدعيها المستخدم."],
            ["عزل العملاء", "تم اختبار RLS بدور غير خارق، مع رفض عمليات كتابة مزيفة خارج نطاق العميل."],
            ["استراتيجية Seed", "يتم إنشاء مستخدمي Auth عبر Supabase Auth، وتُضاف بيانات العملاء بشكل منفصل."],
            ["مجموعة التحقق", "استعلامات تتحقق من RLS، الصلاحيات، تغطية tenant_id، الفهارس، المفاتيح الخارجية، وعدد بيانات seed."]
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
    <section className="py-32 bg-background relative overflow-hidden" id="projects" dir="rtl">
      <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-20" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-24">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-foreground/40 mb-6 block">أنظمة مختارة</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-8 tracking-tight">أنظمة مختارة</h2>
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
            مجموعة مختارة من أنظمة تعرض جوانب مختلفة من طريقة عملي.
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
                  onClick={goToNext}
                  aria-label={activeSlide === activeGallery.length - 1 ? "العودة إلى الأنظمة" : "الصورة التالية"}
                  className={`absolute left-0 md:left-1 top-[58%] z-20 h-14 w-14 md:h-20 md:w-20 -translate-y-1/2 text-ink-blue/70 hover:text-ink-blue transition-all duration-300 ${controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                >
                  <SketchArrow direction="left" />
                </button>

                <button
                  type="button"
                  onClick={goToPrevious}
                  aria-label={activeSlide === 0 ? "العودة إلى الأنظمة" : "الصورة السابقة"}
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
                        className="absolute top-8 left-8 w-12 h-12 text-ink-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <g transform="translate(100 0) scale(-1 1)">
                          <path d="M20 50 L80 50 M60 30 L80 50 L60 70 M10 80 Q 20 20 40 10" strokeDasharray="4 4" />
                        </g>
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
                      <h4 className="text-[10px] font-bold text-foreground/60 mb-5 tracking-[0.2em] uppercase">محور العرض</h4>
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
