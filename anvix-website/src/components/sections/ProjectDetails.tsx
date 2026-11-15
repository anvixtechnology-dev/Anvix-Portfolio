import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Layers,
  ListChecks,
  Quote,
  Sparkles,
  Target,
  Wrench,
} from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { ProjectVisual } from '@/components/common/ProjectVisual'
import { cn } from '@/utils/cn'
import { EASE } from '@/utils/motion'
import type { Project } from '@/types'

const visualFor = {
  dashboard: 'dashboard',
  mobile: 'mobile',
  planning: 'planning',
  reference: 'reference',
} as const

interface ProjectDetailsProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  return (
    <Modal
      open={Boolean(project)}
      onClose={onClose}
      variant="full"
      labelledBy={project ? `project-${project.id}` : undefined}
    >
      {project && <ProjectDetailContent project={project} onClose={onClose} />}
    </Modal>
  )
}

function ProjectDetailContent({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="relative">
      {/* ---------------- Header ---------------- */}
      <header className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="relative h-48 sm:h-60">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.name} preview`}
              className="h-full w-full object-cover"
            />
          ) : (
            <ProjectVisual
              variant={visualFor[project.gallery[0].kind]}
              label={`${project.name} — interface illustration`}
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="chip chip-azure backdrop-blur-sm">{project.category}</span>
              <span className="chip backdrop-blur-sm">{project.year}</span>
              <span className="chip backdrop-blur-sm">{project.platforms[0]}</span>
            </div>
            <h2
              id={`project-${project.id}`}
              className="mt-4 font-display text-2xl leading-tight text-mist-50 text-balance sm:text-4xl"
            >
              {project.name}
            </h2>
          </div>
        </div>

        {/* Quick facts */}
        <dl className="grid grid-cols-2 gap-px bg-white/[0.06] sm:grid-cols-4">
          {[
            { label: 'Category', value: project.category },
            { label: 'Year', value: project.year },
            { label: 'Platforms', value: project.platforms.join(', ') },
            { label: 'Role', value: project.role },
          ].map((fact) => (
            <div key={fact.label} className="bg-ink-950/95 px-5 py-4">
              <dt className="font-mono text-2xs uppercase tracking-wide2 text-mist-100/35">
                {fact.label}
              </dt>
              <dd className="mt-1.5 text-2xs leading-relaxed text-mist-100/70">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="space-y-12 p-6 sm:p-8">
        {/* Overview */}
        <Block title="Project overview" icon={Compass} index="01">
          <p className="body-lg text-pretty">{project.overview}</p>
          <p className="mt-4 body-md text-pretty">{project.description}</p>
        </Block>

        {/* Problem / Solution */}
        <div className="grid gap-5 lg:grid-cols-2">
          <Panel title="The problem" icon={Target} tone="neutral">
            <p className="body-md text-pretty">{project.problem}</p>
          </Panel>
          <Panel title="The solution" icon={Sparkles} tone="azure">
            <p className="body-md text-pretty">{project.solution}</p>
          </Panel>
        </div>

        {/* Features */}
        <Block title="Key features" icon={ListChecks} index="02">
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature.title}
                className="group flex gap-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors duration-400 hover:border-azure-500/30 hover:bg-white/[0.04]"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-azure-500/35 bg-azure-500/10 text-azure-300">
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="text-[0.875rem] font-medium text-mist-50">{feature.title}</p>
                  {feature.detail && (
                    <p className="mt-1.5 text-2xs leading-relaxed text-mist-100/45">{feature.detail}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Block>

        {/* Technologies */}
        <Block title="Technologies" icon={Layers} index="03">
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-lg border border-azure-500/25 bg-azure-500/[0.06] px-3.5 py-2 font-mono text-2xs tracking-wide2 text-azure-200/90"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Block>

        {/* Development approach */}
        <Block title="Development approach" icon={Wrench} index="04">
          <ol className="relative space-y-6 border-l border-white/[0.09] pl-7">
            {project.approach.map((step, i) => (
              <li key={step.phase} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.0625rem] top-1 grid h-5 w-5 place-items-center rounded-full border border-azure-500/40 bg-ink-950 font-mono text-[0.5rem] text-azure-300"
                >
                  {i + 1}
                </span>
                <p className="text-[0.875rem] font-medium text-mist-50">{step.phase}</p>
                <p className="mt-1.5 body-md text-pretty">{step.detail}</p>
              </li>
            ))}
          </ol>
        </Block>

        {/* Gallery */}
        <Block title="Project gallery" icon={Layers} index="05">
          <div className="grid gap-4 sm:grid-cols-3">
            {project.gallery.map((item) => (
              <figure
                key={item.id}
                className="group overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02]"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-40 w-full object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-[1.05]"
                  />
                ) : (
                  <div className="h-40 w-full">
                    <ProjectVisual variant={visualFor[item.kind]} label={item.title} />
                  </div>
                )}
                <figcaption className="border-t border-white/[0.06] px-4 py-3.5">
                  <p className="text-2xs font-medium text-mist-50">{item.title}</p>
                  <p className="mt-1 text-2xs leading-relaxed text-mist-100/40">{item.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Block>

        {/* Results */}
        <Block title="Results & outcome" icon={Sparkles} index="06">
          <div className="grid gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-3">
            {project.results.map((result) => (
              <div key={result.label} className="bg-ink-950/90 p-5">
                <p className="font-display text-2xl text-azure-gradient">{result.metric}</p>
                <p className="mt-2 text-2xs leading-relaxed text-mist-100/45">{result.label}</p>
              </div>
            ))}
          </div>

          <ul className="mt-5 space-y-3">
            {project.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-3 text-[0.875rem] leading-relaxed text-mist-100/60">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-azure-500" strokeWidth={2.2} />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </Block>

        {/* Quote */}
        <blockquote className="relative rounded-2xl border border-azure-500/20 bg-azure-500/[0.05] p-7 sm:p-8">
          <Quote className="h-6 w-6 text-azure-500/50" aria-hidden="true" />
          <p className="mt-4 font-display text-lg leading-relaxed text-mist-50/90 text-pretty">
            {project.summary}
          </p>
          <footer className="mt-4 font-mono text-2xs uppercase tracking-wide2 text-mist-100/35">
            ANVIX Technologies · {project.year}
          </footer>
        </blockquote>

        {/* CTA */}
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-azure-500/25 bg-[linear-gradient(120deg,rgba(30,30,28,0.6),rgba(11,11,11,0.6))] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h3 className="font-display text-lg text-mist-50">Discuss a similar project</h3>
            <p className="mt-2 max-w-md body-md">
              Tell us what you are building. We will respond with an approach, a timeline and a
              clear estimate.
            </p>
          </div>
          <Button
            size="lg"
            sheen
            onClick={() => {
              onClose()
              window.setTimeout(
                () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
                220,
              )
            }}
            className="shrink-0"
          >
            Discuss a Similar Project
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => {
                  if (link.href.startsWith('#')) {
                    event.preventDefault()
                    onClose()
                    window.setTimeout(
                      () => document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: 'smooth' }),
                      220,
                    )
                  }
                }}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer noopener' : undefined}
                className="inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-wide2 text-azure-300 transition-colors duration-300 hover:text-azure-200"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Layout helpers                                                      */
/* ------------------------------------------------------------------ */

function Block({
  title,
  icon: Icon,
  index,
  children,
}: {
  title: string
  icon: typeof Compass
  index: string
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-azure-500/25 bg-azure-500/[0.07] text-azure-400">
          <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
        </span>
        <h3 className="font-display text-base text-mist-50">{title}</h3>
        <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        <span className="font-mono text-2xs tracking-ultra text-mist-100/25">{index}</span>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function Panel({
  title,
  icon: Icon,
  tone,
  children,
}: {
  title: string
  icon: typeof Target
  tone: 'neutral' | 'azure'
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-6 sm:p-7',
        tone === 'azure'
          ? 'border-azure-500/25 bg-azure-500/[0.05]'
          : 'border-white/[0.07] bg-white/[0.02]',
      )}
    >
      <div className="flex items-center gap-2.5">
        <Icon
          className={cn('h-4 w-4', tone === 'azure' ? 'text-azure-400' : 'text-mist-100/40')}
          strokeWidth={1.6}
        />
        <h3
          className={cn(
            'font-mono text-2xs uppercase tracking-wide2',
            tone === 'azure' ? 'text-azure-300' : 'text-mist-100/45',
          )}
        >
          {title}
        </h3>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}

/** Small helper for animated list of approach steps (used by process section). */
export function StepDot({ active }: { active?: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="absolute inset-0 rounded-full border border-azure-500/50"
        />
      )}
    </AnimatePresence>
  )
}
