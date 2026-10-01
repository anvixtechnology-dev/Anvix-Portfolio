import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Sparkles } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/common/Reveal'
import { JobCard } from '@/components/sections/JobCard'
import { ApplicationForm } from '@/components/sections/ApplicationForm'
import { jobs } from '@/data/jobs'
import { site } from '@/data/site'
import { cn } from '@/utils/cn'
import { EASE } from '@/utils/motion'
import type { JobOpening } from '@/types'

const departmentFilters = ['All', 'Engineering', 'Design'] as const

export function Careers() {
  const [department, setDepartment] = useState<(typeof departmentFilters)[number]>('All')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [applying, setApplying] = useState<JobOpening | null>(null)

  const visible =
    department === 'All' ? jobs : jobs.filter((job) => job.department === department)

  return (
    <section id="openings" className="section-pad relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(20,33,58,0.55),transparent_70%)] blur-3xl"
      />

      <div className="container-anvix relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Intro — sticky on desktop */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Careers"
              title={
                <>
                  Build The Future <span className="text-azure-gradient">With Us.</span>
                </>
              }
              description="We are looking for passionate people who want to learn, build and create meaningful technology."
            />

            <Reveal delay={0.12} className="mt-8 space-y-5">
              <div className="surface-card p-6">
                <p className="body-md">
                  At ANVIX you will ship real features, work in a modern stack, review code with
                  experienced engineers and own what you build. We value clarity, curiosity and
                  steady progress over heroics.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    'Real projects, not practice exercises',
                    'Direct mentorship from founding partners',
                    'Flexible hybrid working',
                    'Strong portfolio and references',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-2xs text-mist-100/55">
                      <Sparkles className="h-3.5 w-3.5 shrink-0 text-azure-500/70" strokeWidth={1.6} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`mailto:${site.email}`}
                className="flex items-center justify-between gap-4 rounded-2xl border border-azure-500/25 bg-azure-500/[0.05] p-5 transition-colors duration-400 hover:border-azure-500/45 hover:bg-azure-500/[0.08]"
              >
                <span>
                  <span className="block font-mono text-2xs uppercase tracking-wide2 text-azure-400/85">
                    No matching role?
                  </span>
                  <span className="mt-1.5 block text-[0.875rem] text-mist-50">{site.email}</span>
                </span>
                <Mail className="h-4 w-4 shrink-0 text-azure-400" strokeWidth={1.6} />
              </a>
            </Reveal>
          </div>

          {/* Openings */}
          <div>
            <div
              role="group"
              aria-label="Filter openings by department"
              className="flex flex-wrap gap-2"
            >
              {departmentFilters.map((option) => {
                const isActive = department === option
                const count =
                  option === 'All'
                    ? jobs.length
                    : jobs.filter((job) => job.department === option).length
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setDepartment(option)}
                    aria-pressed={isActive}
                    className={cn(
                      'relative rounded-full border px-4 py-2 font-mono text-2xs uppercase tracking-wide2 transition-colors duration-300',
                      isActive
                        ? 'border-azure-500/50 text-azure-200'
                        : 'border-white/10 text-mist-100/50 hover:border-azure-500/30 hover:text-mist-100/80',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="career-filter-pill"
                        transition={{ duration: 0.4, ease: EASE }}
                        className="absolute inset-0 -z-10 rounded-full bg-azure-500/[0.12]"
                      />
                    )}
                    {option}
                    <span className="ml-1.5 text-mist-100/30">{count}</span>
                  </button>
                )
              })}
            </div>

            <motion.div layout className="mt-8 space-y-4">
              <AnimatePresence mode="popLayout">
                {visible.map((job, i) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    index={i}
                    onApply={setApplying}
                    expanded={expanded === job.id}
                    onToggle={() => setExpanded((prev) => (prev === job.id ? null : job.id))}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {visible.length === 0 && (
              <p className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-10 text-center body-md">
                No openings in this department right now — send us your profile and we will keep you
                in mind.
              </p>
            )}
          </div>
        </div>
      </div>

      {applying && <ApplicationForm job={applying} onClose={() => setApplying(null)} />}
    </section>
  )
}
