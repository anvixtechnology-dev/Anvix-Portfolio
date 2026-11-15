import { memo, useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ProjectVisual } from '@/components/common/ProjectVisual'
import { useGsap, gsap, ScrollTrigger } from '@/lib/gsap'
import { EASE } from '@/utils/motion'
import type { Project } from '@/types'

const visualFor = {
  dashboard: 'dashboard',
  mobile: 'mobile',
  planning: 'planning',
  reference: 'reference',
} as const

const RIBBON_MEDIA = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'

/** Curve parameters — desktop gets the full ribbon, tablet a gentler one. */
function ribbonParams() {
  const desktop = window.innerWidth >= 1024
  return desktop
    ? { step: 30, radius: 720, tiltY: 14, tiltZ: 2.4, drift: 6, shrink: 0.09 }
    : { step: 26, radius: 560, tiltY: 8, tiltZ: 1.4, drift: 3, shrink: 0.075 }
}

/* ------------------------------------------------------------------ */
/* Shared preview — the project's screenshot inside a browser frame     */
/* ------------------------------------------------------------------ */

const Preview = memo(function Preview({ project, children }: { project: Project; children?: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-t-[14px] border-b border-white/[0.07] bg-ink-950">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-[#0B0F1A] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-neon-500/80" />
        <span className="ml-3 truncate rounded-md bg-white/[0.05] px-2.5 py-0.5 font-mono text-[0.625rem] text-mist-100/35">
          anvix.in/work/{project.slug}
        </span>
      </div>
      <div className="relative aspect-[16/10]">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.name} website preview`}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <ProjectVisual
            variant={visualFor[project.gallery[0].kind]}
            label={`${project.name} — interface preview`}
            className="absolute inset-0"
          />
        )}
        {children}
      </div>
    </div>
  )
})

/* ------------------------------------------------------------------ */
/* Ribbon card (tablet / desktop)                                      */
/* ------------------------------------------------------------------ */

const RibbonCard = memo(function RibbonCard({
  project,
  index,
  onSelect,
}: {
  project: Project
  index: number
  onSelect: (i: number) => void
}) {
  return (
    <div
      data-ribbon-card
      className="absolute left-1/2 top-1/2 w-[min(31rem,64vw)] will-transform backface-hidden hover:!z-[2000] lg:w-[min(36rem,42vw)]"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <button
        type="button"
        onClick={() => onSelect(index)}
        aria-label={`View ${project.name}`}
        className="group relative block w-full rounded-[14px] border border-white/[0.09] bg-[#0A0D16] text-left shadow-[0_2px_0_rgba(255,255,255,0.04)_inset,0_30px_60px_-28px_rgba(0,0,0,0.95),0_12px_24px_-16px_rgba(0,0,0,0.8)] transition-[transform,border-color] duration-500 ease-premium hover:scale-[1.035] hover:border-neon-500/40"
      >
        <Preview project={project}>
        {/* Hover reveal */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/55 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <p className="max-w-md text-[0.875rem] leading-relaxed text-mist-100/80 line-clamp-2">{project.summary}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((t) => (
              <li key={t} className="rounded border border-white/15 bg-black/40 px-2 py-0.5 font-mono text-[0.625rem] text-mist-100/70">
                {t}
              </li>
            ))}
          </ul>
        </div>
        </Preview>

        {/* Caption */}
        <div className="flex items-center gap-4 px-5 py-3.5">
          <span className="font-mono text-2xs tracking-ultra text-neon-500">{project.index}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-[0.95rem] text-mist-50">{project.name}</p>
            <p className="truncate font-mono text-[0.625rem] uppercase tracking-wide2 text-mist-100/40">{project.category}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-wide2 text-mist-100/60 transition-all duration-500 ease-premium group-hover:border-neon-500 group-hover:bg-neon-500 group-hover:text-ink-950">
            View
            <ArrowUpRight className="h-3 w-3 transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </div>

        {/* Depth shade — driven by the scroll scene */}
        <span data-shade aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[14px] bg-black opacity-0" />
      </button>
    </div>
  )
})

/* ------------------------------------------------------------------ */
/* Stack card (phones / reduced motion)                                 */
/* ------------------------------------------------------------------ */

function StackCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  return (
    <li
      className="sticky"
      style={{ top: `calc(var(--nav-height) + 0.75rem + ${index * 0.6}rem)` }}
    >
      <motion.button
        type="button"
        onClick={() => onOpen(project)}
        initial={{ opacity: 0, rotateX: 14, scale: 0.94, y: 30 }}
        whileInView={{ opacity: 1, rotateX: 0, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{ transformPerspective: 1000 }}
        className="block w-full overflow-hidden rounded-[14px] border border-white/[0.09] bg-[#0A0D16] text-left shadow-[0_-18px_40px_-20px_rgba(0,0,0,0.9)] active:scale-[0.99]"
      >
        <Preview project={project} />
        <div className="p-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xs tracking-ultra text-neon-500">{project.index}</span>
            <span className="h-px flex-1 bg-white/[0.08]" />
            <span className="font-mono text-[0.625rem] uppercase tracking-wide2 text-mist-100/40">{project.category}</span>
          </div>
          <h3 className="mt-3 font-condensed text-[1.7rem] font-normal uppercase leading-[0.95] text-mist-50">{project.name}</h3>
          <p className="mt-2.5 body-md line-clamp-3">{project.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((t) => (
              <li key={t} className="rounded border border-white/[0.08] px-2 py-0.5 font-mono text-[0.625rem] text-mist-100/50">{t}</li>
            ))}
          </ul>
          <span className="mt-5 inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-wide2 text-neon-500">
            View Project <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </motion.button>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* Showcase                                                             */
/* ------------------------------------------------------------------ */

export function ProjectRibbon({ projects, onOpen }: { projects: Project[]; onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const total = projects.length
  const span = Math.max(1, total - 1)

  useGsap(
    ref,
    (mm, root) => {
      mm.add(RIBBON_MEDIA, () => {
        const q = gsap.utils.selector(root)
        const cards = q('[data-ribbon-card]') as HTMLElement[]
        const shades = cards.map((c) => c.querySelector<HTMLElement>('[data-shade]'))
        const bar = q('[data-progress]')[0] as HTMLElement | undefined
        let P = ribbonParams()

        const render = (p: number) => {
          progressRef.current = p
          cards.forEach((card, i) => {
            const d = gsap.utils.clamp(-3.4, 3.4, i - p)
            const ad = Math.abs(d)
            const side = i % 2 === 0 ? -1 : 1
            const a = (d * P.step * Math.PI) / 180
            const y = Math.sin(a) * P.radius
            const z = (Math.cos(a) - 1) * P.radius
            const x = side * Math.min(ad, 2) * P.drift
            const rotY = side * Math.min(ad, 1.6) * P.tiltY
            const rotZ = -side * Math.min(ad, 2) * P.tiltZ
            const scale = 1 - Math.min(ad, 3) * P.shrink
            const opacity = gsap.utils.clamp(0, 1, 1 - (ad - 1.8) * 0.75)
            card.style.transform =
              `translate(-50%, -50%) translate3d(${x}%, ${y}px, ${z}px) ` +
              `rotateX(${-d * P.step}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`
            card.style.opacity = String(opacity)
            card.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible'
            card.style.zIndex = String(1000 - Math.round(ad * 100))
            card.style.pointerEvents = ad < 1.2 ? 'auto' : 'none'
            const shade = shades[i]
            if (shade) shade.style.opacity = String(Math.min(ad, 2.5) * 0.24)
          })
          if (bar) bar.style.transform = `scaleX(${total > 1 ? p / span : 1})`
          const nearest = Math.round(p)
          if (nearest !== activeRef.current) {
            activeRef.current = nearest
            setActive(nearest)
          }
        }

        const state = { p: 0 }
        render(0)

        if (total > 1) {
          const tween = gsap.to(state, {
            p: span,
            ease: 'none',
            onUpdate: () => render(state.p),
            scrollTrigger: {
              trigger: q('[data-ribbon-pin]')[0],
              start: 'top top',
              end: () => `+=${span * window.innerHeight * 0.65}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              snap: { snapTo: 1 / span, inertia: false, directional: false, duration: { min: 0.25, max: 0.7 }, delay: 0.08, ease: 'power2.inOut' },
              onRefresh: (self) => {
                triggerRef.current = self
                P = ribbonParams()
                render(state.p)
              },
            },
          })
          triggerRef.current = tween.scrollTrigger ?? null
          ScrollTrigger.sort()
          ScrollTrigger.refresh()
        }

        return () => {
          triggerRef.current = null
          cards.forEach((c) => c.removeAttribute('style'))
        }
      })
    },
    [projects],
  )

  // Clicking the centred card opens it; clicking a neighbour travels to it.
  const onSelect = useCallback(
    (i: number) => {
      const st = triggerRef.current
      if (!st || Math.abs(i - progressRef.current) < 0.5) {
        onOpen(projects[i])
        return
      }
      window.scrollTo({ top: st.start + (i / span) * (st.end - st.start), behavior: 'smooth' })
    },
    [projects, span, onOpen],
  )

  if (total === 0) return null
  const current = projects[Math.min(active, total - 1)]

  return (
    <div ref={ref}>
      {/* Tablet / desktop — pinned curved ribbon */}
      <div className="hidden md:motion-safe:block">
        <div
          data-ribbon-pin
          className="grid h-[100svh] gap-6 pb-8 pt-[calc(var(--nav-height)+1.25rem)] md:grid-rows-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-10"
        >
          {/* Now viewing */}
          <aside aria-live="polite" className="order-2 flex items-end gap-6 lg:order-1 lg:flex-col lg:items-start lg:justify-center lg:gap-8">
            <div className="hidden h-px w-40 bg-white/10 lg:block">
              <span data-progress className="block h-full origin-left bg-neon-500" style={{ transform: 'scaleX(0)' }} />
            </div>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="min-w-0 flex-1 lg:flex-none"
            >
              <p className="font-mono text-2xs uppercase tracking-ultra text-mist-100/40">
                <span className="text-neon-500">{current.index}</span> / {String(total).padStart(2, '0')} · {current.year}
              </p>
              <h3 className="mt-3 font-condensed text-[2rem] font-normal uppercase leading-[0.95] text-mist-50 lg:text-[2.6rem]">
                {current.name}
              </h3>
              <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-wide2 text-azure-300/80">{current.category}</p>
              <p className="mt-4 hidden body-md line-clamp-3 lg:block">{current.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {current.technologies.slice(0, 5).map((t) => (
                  <li key={t} className="rounded border border-white/[0.08] px-2 py-0.5 font-mono text-[0.625rem] text-mist-100/55">{t}</li>
                ))}
              </ul>
            </motion.div>
            <button
              type="button"
              onClick={() => onOpen(current)}
              className="group/cta inline-flex shrink-0 items-center gap-2 rounded-full border border-neon-500/50 px-5 py-2.5 font-mono text-2xs uppercase tracking-wide2 text-neon-500 transition-colors duration-300 hover:bg-neon-500 hover:text-ink-950"
            >
              View Project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:rotate-45" />
            </button>
          </aside>

          {/* Stage */}
          <div
            className="relative order-1 min-h-0 overflow-hidden lg:order-2 [mask-image:linear-gradient(180deg,transparent,#000_14%,#000_86%,transparent)]"
            style={{ perspective: '1700px', perspectiveOrigin: '50% 50%' }}
          >
            {projects.map((p, i) => (
              <RibbonCard key={p.id} project={p} index={i} onSelect={onSelect} />
            ))}
          </div>
        </div>
      </div>

      {/* Phones / reduced motion — stacked cards */}
      <ol className="mt-8 space-y-6 pb-4 md:motion-safe:hidden">
        {projects.map((p, i) => (
          <StackCard key={p.id} project={p} index={i} onOpen={onOpen} />
        ))}
      </ol>
    </div>
  )
}
