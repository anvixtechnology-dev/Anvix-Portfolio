import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { ProjectDetails } from '@/components/sections/ProjectDetails'
import { SectionHeading } from '@/components/common/SectionHeading'
import { projectCategories, projects } from '@/data/projects'
import { cn } from '@/utils/cn'
import { EASE } from '@/utils/motion'
import type { Project, ProjectCategoryOption } from '@/types'

type FilterValue = ProjectCategoryOption['value']

export function Projects() {
  const [filter, setFilter] = useState<FilterValue>('all')
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <section id="projects" className="section-pad relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-1/4 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(15,28,61,0.9),transparent_70%)] blur-3xl"
      />

      <div className="container-anvix relative">
        <SectionHeading
          eyebrow="Our Projects"
          title={
            <>
              Built For The <span className="text-azure-gradient">Real World.</span>
            </>
          }
          description="From business management systems to mobile applications and intelligent planning tools, our projects are designed around real-world requirements."
        />

        {/* Filter bar */}
        <div className="mt-10 flex flex-col gap-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {projectCategories.map((option) => {
              const isActive = filter === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFilter(option.value)}
                  aria-pressed={isActive}
                  className={cn(
                    'relative shrink-0 rounded-full border px-4 py-2 font-mono text-2xs uppercase tracking-wide2 transition-colors duration-300',
                    isActive
                      ? 'border-azure-500/50 text-azure-200'
                      : 'border-white/10 text-mist-100/50 hover:border-azure-500/30 hover:text-mist-100/80',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter-pill"
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute inset-0 -z-10 rounded-full bg-azure-500/[0.12]"
                    />
                  )}
                  {option.label}
                  <span className="ml-1.5 text-mist-100/30">{option.count}</span>
                </button>
              )
            })}
          </div>

          <p className="shrink-0 font-mono text-2xs uppercase tracking-wide2 text-mist-100/30">
            Showing {visible.length} of {projects.length} projects
          </p>
        </div>

        {/* Grid */}
        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpen={setActiveProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-10 text-center body-md">
            No projects in this category yet.
          </p>
        )}
      </div>

      <ProjectDetails project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}
