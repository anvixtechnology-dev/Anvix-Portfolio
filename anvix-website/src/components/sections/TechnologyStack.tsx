import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal, RevealGroup, RevealItem } from '@/components/common/Reveal'
import { TechIcon } from '@/components/common/Icons'
import { technologyGroups } from '@/data/content'

export function TechnologyStack() {
  return (
    <section
      id="technology"
      className="section-pad relative overflow-hidden border-y border-white/[0.06] bg-ink-950/40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_20%_10%,rgba(30,30,28,0.5),transparent_70%)]"
      />

      <div className="container-anvix relative">
        <SectionHeading
          eyebrow="Technology Stack"
          title={
            <>
              Technologies We <span className="text-azure-gradient">Work With</span>
            </>
          }
          description="A deliberately modern, well-supported stack — chosen for maintainability, performance and long-term scalability rather than novelty."
        />

        <RevealGroup
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          staggerDelay={0.06}
        >
          {technologyGroups.map((group, groupIndex) => (
            <RevealItem key={group.id} index={groupIndex} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-azure-500/35 hover:bg-white/[0.035] hover:shadow-card-hover sm:p-7">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px w-0 bg-gradient-to-r from-azure-500/70 via-azure-500/25 to-transparent transition-all duration-700 ease-premium group-hover:w-full"
                />

                <header className="flex items-center justify-between">
                  <h3 className="font-mono text-2xs uppercase tracking-ultra text-azure-400/85">
                    {group.label}
                  </h3>
                  <span className="font-mono text-2xs text-mist-100/25">
                    {String(groupIndex + 1).padStart(2, '0')}
                  </span>
                </header>

                <ul className="mt-6 flex-1 space-y-px">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="group/item flex items-start gap-3.5 rounded-lg px-2.5 py-2.5 -mx-2.5 transition-colors duration-300 hover:bg-white/[0.03]"
                    >
                      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.025] text-mist-100/45 transition-colors duration-400 group-hover/item:border-azure-500/35 group-hover/item:text-azure-300">
                        <TechIcon name={item.icon} className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.875rem] font-medium text-mist-50/90 transition-colors duration-300 group-hover/item:text-azure-100">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-2xs text-mist-100/35">{item.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}

          {/* Capability card — full-width row beneath the 6 groups */}
          <RevealItem index={6} className="h-full sm:col-span-2 lg:col-span-3">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full flex-col justify-between gap-7 overflow-hidden rounded-2xl border border-azure-500/25 lg:flex-row lg:items-center bg-[linear-gradient(150deg,rgba(30,30,28,0.7),rgba(11,11,11,0.85))] p-6 sm:p-7"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(181,255,54,0.2),transparent_70%)] blur-xl"
              />
              <div className="max-w-xl">
                <h3 className="font-display text-lg text-mist-50">Capability, not just tools</h3>
                <p className="mt-3 body-md">
                  We pick the stack per problem — the goal is a product your team can build on and
                  keep improving after launch.
                </p>
              </div>
              <ul className="space-y-2.5 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-2.5 lg:space-y-0">
                {['Architecture decisions', 'Performance budgets', 'Security defaults', 'CI-ready delivery'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2.5 text-2xs text-mist-100/50">
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-azure-500" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </motion.div>
          </RevealItem>
        </RevealGroup>

        {/* Marquee of capabilities */}
        <Reveal delay={0.1} className="mt-14">
          <div className="mask-fade-x relative overflow-hidden py-1">
            <div className="flex w-max animate-marquee items-center gap-8">
              {[...Array(2)].map((_, set) => (
                <div key={set} className="flex items-center gap-8" aria-hidden={set === 1}>
                  {[
                    'Web Platforms',
                    'Mobile Applications',
                    'AI & Automation',
                    'AI Voice Generation',
                    'Digital Marketing',
                    'E-Commerce',
                    'Admin Dashboards',
                    'Business Systems',
                    'API Development',
                    'UI Engineering',
                    'Cloud Deployment',
                  ].map((label) => (
                    <span
                      key={label}
                      className="flex shrink-0 items-center gap-8 whitespace-nowrap font-display text-lg text-mist-100/12"
                    >
                      {label}
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-azure-500/40" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
