import { motion } from 'framer-motion'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { processSteps } from '@/data/content'
import { EASE } from '@/utils/motion'

/**
 * "How We Build" — horizontal timeline on desktop, vertical on mobile/tablet.
 */
export function Process() {
  return (
    <section id="process" className="section-pad relative overflow-hidden">
      <div className="container-anvix relative">
        <SectionHeading
          eyebrow="Our Process"
          title="How We Build"
          description="A predictable five-step engagement. You always know what is happening, what comes next and what you receive at each stage."
        />

        {/* ---------------- Desktop: horizontal ---------------- */}
        <div className="mt-12 hidden lg:block">
          <div className="relative">
            {/* Track */}
            <div aria-hidden="true" className="absolute inset-x-0 top-[3.125rem] h-px bg-white/[0.08]">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.5, ease: EASE, delay: 0.15 }}
                className="h-px w-full origin-left bg-gradient-to-r from-azure-500/70 via-azure-500/35 to-transparent"
              />
            </div>

            <ol className="grid grid-cols-5 gap-6">
              {processSteps.map((step, i) => (
                <motion.li
                  key={step.index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.65, ease: EASE, delay: 0.12 + i * 0.12 }}
                  className="group relative"
                >
                  {/* Node */}
                  <div className="relative flex h-[6.25rem] items-start">
                    <span className="relative z-10 inline-flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full border border-azure-500/30 bg-ink-950 font-display text-lg text-azure-gradient transition-all duration-500 ease-premium group-hover:border-azure-500/60 group-hover:shadow-azure">
                      <span className="absolute inset-[0.375rem] rounded-full border border-white/[0.05]" />
                      <span className="relative">{step.index}</span>
                    </span>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-display text-lg text-mist-50 transition-colors duration-400 group-hover:text-azure-200">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-[0.875rem] leading-relaxed text-mist-100/55 text-pretty">
                      {step.body}
                    </p>
                    <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wide2 text-azure-400/70">
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-azure-500" />
                      {step.deliverable}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        {/* ---------------- Mobile / tablet: vertical ---------------- */}
        <ol className="relative mt-10 space-y-8 pl-10 lg:hidden">
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-[1.0625rem] top-4 w-px bg-white/[0.08]"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.3, ease: EASE, delay: 0.1 }}
              className="h-full w-full origin-top bg-gradient-to-b from-azure-500/70 via-azure-500/30 to-transparent"
            />
          </div>

          {processSteps.map((step, i) => (
            <motion.li
              key={step.index}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="group relative"
            >
              <span className="absolute -left-10 top-0 inline-flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full border border-azure-500/35 bg-ink-950 font-mono text-2xs text-azure-300">
                {step.index}
              </span>
              <h3 className="font-display text-lg text-mist-50">{step.title}</h3>
              <p className="mt-2 body-md text-pretty">{step.body}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wide2 text-azure-400/70">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-azure-500" />
                {step.deliverable}
              </p>
            </motion.li>
          ))}
        </ol>

        <Reveal delay={0.1} className="mt-10">
          <p className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-6 text-center body-md sm:px-8">
            Every engagement ends with documentation, deployment and a clear handover — so you
            never depend on us to keep your product running.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
