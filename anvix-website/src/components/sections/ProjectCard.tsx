import { forwardRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
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

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

/**
 * Forwards its ref because the card is rendered inside
 * <AnimatePresence mode="popLayout">, which measures the exiting child.
 */
export const ProjectCard = forwardRef<HTMLElement, ProjectCardProps>(function ProjectCard(
  { project, index, onOpen },
  ref,
) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-azure-500/40 hover:shadow-card-hover"
    >
      {/* Visual */}
      <div className="relative h-56 shrink-0 overflow-hidden border-b border-white/[0.06] sm:h-64">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.name} interface preview`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-[1.05]"
          />
        ) : (
          <ProjectVisual
            variant={visualFor[project.gallery[0].kind]}
            label={`${project.name} — interface illustration`}
            className="transition-transform duration-[900ms] ease-premium group-hover:scale-[1.04]"
          />
        )}

        <span className="absolute left-4 top-4 z-10 chip chip-azure backdrop-blur-sm">
          {project.category}
        </span>

        <span className="absolute bottom-4 right-4 z-10 inline-flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-azure-500/40 bg-ink-950/80 text-azure-300 opacity-0 backdrop-blur-sm transition-all duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="font-mono text-2xs tracking-ultra text-azure-500/75">{project.index}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-white/[0.08]" />
          <span className="font-mono text-2xs text-mist-100/30">{project.year}</span>
        </div>

        <h3 className="mt-4 font-display text-xl leading-tight text-mist-50 text-balance">
          {project.name}
        </h3>
        <p className="mt-2 text-2xs uppercase tracking-wide2 text-azure-300/75">{project.category}</p>

        <p className="mt-4 body-md line-clamp-3 text-pretty">{project.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2 py-1 font-mono text-2xs text-mist-100/50"
            >
              {tech}
            </li>
          ))}
          {project.technologies.length > 4 && (
            <li className="rounded-md border border-white/[0.08] px-2 py-1 font-mono text-2xs text-mist-100/35">
              +{project.technologies.length - 4}
            </li>
          )}
        </ul>

        <div className="mt-7 flex items-center justify-between border-t border-white/[0.06] pt-5">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className={cn(
              'group/cta inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-wide2',
              'text-azure-300 transition-colors duration-300 hover:text-azure-200',
            )}
          >
            View Project
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
          </button>
          <span className="font-mono text-2xs text-mist-100/25">
            {project.features.length} features
          </span>
        </div>
      </div>
    </motion.article>
  )
})
