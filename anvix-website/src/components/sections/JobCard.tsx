import { forwardRef } from 'react'
import { Briefcase, ChevronDown, MapPin, Timer, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { EASE } from '@/utils/motion'
import { cn } from '@/utils/cn'
import type { JobOpening } from '@/types'

interface JobCardProps {
  job: JobOpening
  index: number
  onApply: (job: JobOpening) => void
  expanded: boolean
  onToggle: () => void
}

/** Forwards its ref for <AnimatePresence mode="popLayout"> in the careers list. */
export const JobCard = forwardRef<HTMLElement, JobCardProps>(function JobCard(
  { job, index, onApply, expanded, onToggle },
  ref,
) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.99 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.07 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border bg-white/[0.02] transition-all duration-500 ease-premium',
        expanded
          ? 'border-azure-500/40 bg-white/[0.035] shadow-card-hover'
          : 'border-white/[0.07] hover:-translate-y-1 hover:border-azure-500/35 hover:bg-white/[0.03] hover:shadow-card-hover',
      )}
    >
      {job.featured && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-azure-500/60 to-transparent"
        />
      )}

      <div className="p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="chip chip-azure">{job.type}</span>
              <span className="chip">{job.mode}</span>
              {job.featured && <span className="chip">Priority</span>}
            </div>

            <h3 className="mt-4 font-display text-lg leading-snug text-mist-50 text-balance sm:text-xl">
              {job.title}
            </h3>
          </div>

          <span className="font-mono text-2xs tracking-ultra text-azure-500/60">
            {job.openings} {job.openings === 1 ? 'opening' : 'openings'}
          </span>
        </div>

        <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-azure-500/70" strokeWidth={1.7} />
            <dt className="sr-only">Location</dt>
            <dd className="text-2xs text-mist-100/50">{job.location}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-3.5 w-3.5 text-azure-500/70" strokeWidth={1.7} />
            <dt className="sr-only">Department</dt>
            <dd className="text-2xs text-mist-100/50">{job.department}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-3.5 w-3.5 text-azure-500/70" strokeWidth={1.7} />
            <dt className="sr-only">Experience</dt>
            <dd className="text-2xs text-mist-100/50">{job.experience}</dd>
          </div>
        </dl>

        <p className="mt-5 body-md text-pretty">{job.description}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {job.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 font-mono text-2xs text-mist-100/50"
            >
              {skill}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-5">
          <Button size="md" sheen onClick={() => onApply(job)}>
            Apply Now
          </Button>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={`job-detail-${job.id}`}
            className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wide2 text-mist-100/50 transition-colors duration-300 hover:text-azure-300"
          >
            {expanded ? 'Hide details' : 'View details'}
            <ChevronDown
              className={cn('h-3.5 w-3.5 transition-transform duration-300', expanded && 'rotate-180')}
            />
          </button>

          {job.openings > 1 && (
            <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-2xs text-mist-100/30">
              <Users className="h-3 w-3" />
              {job.openings} positions
            </span>
          )}
        </div>

        {/* Expandable responsibilities */}
        <motion.div
          id={`job-detail-${job.id}`}
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.42, ease: EASE }}
          className="overflow-hidden"
        >
          <div className="pt-6">
            <p className="font-mono text-2xs uppercase tracking-ultra text-mist-100/35">
              What you will do
            </p>
            <ul className="mt-4 space-y-2.5">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex gap-3 text-[0.875rem] leading-relaxed text-mist-100/55">
                  <span aria-hidden="true" className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-azure-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.article>
  )
})
