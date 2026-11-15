import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/common/SectionHeading'
import { reasons } from '@/data/content'
import { EASE } from '@/utils/motion'

export function WhyAnvix() {
  return (
    <section
      id="why"
      className="section-pad relative overflow-hidden border-y border-white/[0.06] bg-midnight-950/40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_20%,rgba(21,38,79,0.6),transparent_70%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-lines opacity-25" />

      <div className="container-anvix relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Why ANVIX"
              title={
                <>
                  Why Work With <span className="text-azure-gradient">ANVIX?</span>
                </>
              }
              description="Six reasons that stay true from the first conversation to long after launch."
            />
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2">
            {reasons.map((reason, i) => (
              <motion.article
                key={reason.index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                className="group relative overflow-hidden bg-ink-950/90 p-6 transition-colors duration-500 hover:bg-midnight-900/60 sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,rgba(61,139,255,0.1),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <span className="relative font-mono text-2xs tracking-ultra text-azure-500/75">
                  {reason.index}
                </span>
                <h3 className="relative mt-4 font-display text-[1.0625rem] leading-snug text-mist-50 text-balance">
                  {reason.title}
                </h3>
                <p className="relative mt-3 body-md text-pretty">{reason.body}</p>

                <span
                  aria-hidden="true"
                  className="relative mt-5 block h-px w-8 bg-gradient-to-r from-azure-500/70 to-transparent transition-all duration-500 ease-premium group-hover:w-16"
                />
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
