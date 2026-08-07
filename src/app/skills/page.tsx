import { JsonLd } from "@/components/shared/json-ld";
import {
  Block,
  PageHeader,
  Pager,
  Panel,
  StatStrip,
} from "@/components/shared/page-shell";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { platformFeatures } from "@/data/features";
import { founder, founderSkills } from "@/data/founder";
import { technologies } from "@/data/technologies";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Skills",
  description:
    "The technical skills behind Plutox Tech — Laravel, PHP, Vue.js, Node.js, Express, .NET and TypeScript on the web; Java, Kotlin and Android SDK on mobile; Firebase Authentication, Firestore and Realtime Database; SQL and MongoDB; POS, ERP and CRM systems; Claude and AI prompt engineering; Selenium for QA.",
  path: "/skills",
  keywords: [
    "Laravel developer",
    "Vue.js developer",
    "Express Node.js developer",
    ".NET developer",
    "Kotlin Android developer",
    "Firebase authentication realtime database",
    "MongoDB developer",
    "CRM development",
    "AI prompt engineering",
    "Selenium test automation",
  ],
});

/** Group the stack by discipline so the grid reads as categories, not a soup. */
const STACK_CATEGORIES = [
  "Frontend",
  "Backend",
  "Mobile",
  "Database",
  "AI",
  "DevOps",
  "Cloud",
] as const;

export default function SkillsPage() {
  const totalSkills = founderSkills.reduce(
    (sum, group) => sum + group.skills.length,
    0,
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Intro", path: "/" },
          { name: "Skills", path: "/skills" },
        ])}
      />

      <PageHeader
        eyebrow="Skills"
        title={
          <>
            Hands-on across{" "}
            <span className="text-primary">the full delivery stack</span>
          </>
        }
        lede="Not a list of things learned once and delegated since. Every one of these is used on live client work — the four shipped products are built with them."
      >
        <StatStrip
          className="max-w-2xl border-t pt-4"
          items={[
            { value: String(totalSkills), label: "Core skills" },
            { value: String(founderSkills.length), label: "Disciplines" },
            { value: String(technologies.length), label: "Stack technologies" },
            { value: "4+", label: "Years hands-on" },
          ]}
        />
      </PageHeader>

      {/* ---------------- Founder skill matrix ---------------- */}
      <Block
        label="Core skills"
        title="By discipline"
        description={`What ${founder.name} builds with directly, day to day.`}
      >
        <RevealGroup stagger={0.06} className="grid gap-4 sm:grid-cols-2">
          {founderSkills.map((group) => {
            const Icon = group.icon;

            return (
              <RevealItem key={group.label} className="h-full">
                <Panel className="h-full p-6">
                  <div className="flex items-center gap-3 border-b border-border pb-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-md border border-border text-primary">
                      <Icon className="size-4" />
                    </span>
                    <h3 className="font-display text-sm font-semibold tracking-tight">
                      {group.label}
                    </h3>
                    <span className="ml-auto font-mono text-[0.625rem] whitespace-nowrap text-muted-foreground">
                      {group.skills.length} skills
                    </span>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded border border-border px-2 py-1 font-mono text-[0.6875rem] text-muted-foreground"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </Panel>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Block>

      {/* ---------------- Full stack ---------------- */}
      <Block
        label="The stack"
        title="What we build on"
        description="Mainstream, well-documented and easy to hire for — so your software stays maintainable long after we hand it over."
      >
        <div className="flex flex-col gap-8">
          {STACK_CATEGORIES.map((category) => {
            const items = technologies.filter(
              (tech) => tech.category === category,
            );
            if (items.length === 0) return null;

            return (
              <Reveal key={category} preset="fadeUp">
                <div>
                  <div className="flex items-center gap-4">
                    <p className="eyebrow text-muted-foreground">{category}</p>
                    <span className="h-px flex-1 bg-border" />
                    <span className="font-mono text-[0.625rem] whitespace-nowrap text-muted-foreground/70">
                      {items.length} tools
                    </span>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {items.map((tech) => (
                      <li
                        key={tech.name}
                        className="group/tech flex items-center gap-2 rounded-md border border-border px-3 py-2 transition-colors hover:border-primary/40"
                      >
                        <span
                          className="grid size-6 shrink-0 place-items-center rounded font-mono text-[0.5625rem] font-medium"
                          style={{
                            color: tech.color,
                            backgroundColor: `${tech.color}1f`,
                          }}
                        >
                          {tech.mark}
                        </span>
                        <span className="text-xs font-medium">{tech.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Block>

      {/* ---------------- Platform capabilities ---------------- */}
      <Block
        label="Applied"
        title="What that builds"
        description="The capabilities that ship in every Plutox product — not paid add-ons or a premium tier."
        last
      >
        <RevealGroup stagger={0.03} className="grid gap-x-8 sm:grid-cols-2">
          {platformFeatures.map((feature) => (
            <RevealItem key={feature.title}>
              <div className="group/pf flex gap-4 border-b border-border py-4 pl-1 transition-[colors,padding] duration-300 hover:bg-muted/30 hover:pl-2">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold">{feature.title}</h3>
                  <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Block>

      <Pager current="/skills" />
    </>
  );
}
