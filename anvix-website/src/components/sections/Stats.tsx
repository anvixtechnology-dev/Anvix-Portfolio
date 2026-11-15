import { motion } from 'framer-motion'
import { heroStatsPreview } from '@/data/content'
import { useCountUp } from '@/hooks/useCountUp'
import type { Stat } from '@/types'
import { EASE } from '@/utils/motion'

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const { ref, value } = useCountUp({ to: stat.value })

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.09 }}
      className="group relative flex flex-col justify-between overflow-hidden border-t border-white/[0.08] py-8 pr-6 sm:py-9"
    >
      {/* Hover wash */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(61,139,255,0.09),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px w-0 bg-gradient-to-r from-azure-500/70 to-transparent transition-all duration-700 ease-premium group-hover:w-full"
      />

      <div>
        <p className="flex items-baseline font-display font-semibold tracking-tightest">
          <span className="sr-only">{stat.value}</span>
          <span
            ref={ref}
            aria-hidden="true"
            className="text-azure-gradient text-[2.75rem] leading-none sm:text-[3.5rem]"
          >
            {value}
            {stat.suffix}
          </span>
        </p>
        <h3 className="mt-5 font-display text-[1.0625rem] text-mist-50">{stat.label}</h3>
      </div>

      <p className="mt-4 text-2xs leading-relaxed text-mist-100/40">{stat.detail}</p>
    </motion.div>
  )
}

export function Stats() {
  return (
    <section aria-label="Company statistics" className="relative border-y border-white/[0.06] bg-ink-950/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(21,38,79,0.45),transparent_70%)]"
      />
      <div className="container-anvix relative">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 lg:grid-cols-4 lg:gap-x-10">
          {heroStatsPreview.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
