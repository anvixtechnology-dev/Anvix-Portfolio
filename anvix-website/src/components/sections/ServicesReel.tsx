import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { services } from '@/data/content'
import { useGsap, gsap, ScrollTrigger, DESKTOP } from '@/lib/gsap'
import { EASE } from '@/utils/motion'

/* ------------------------------------------------------------------ */
/* Per-service art — one consistent language: charcoal frame, hairline  */
/* grid, a single diagonal lime bar, and a small product motif.         */
/* ------------------------------------------------------------------ */

const bar = 'absolute h-7 w-[58%] -rotate-[28deg] bg-azure-500'
const card = 'absolute rounded-lg border border-white/[0.08] bg-ink-900/95'
const line = 'h-1.5 rounded-full bg-white/15'

function Art({ id }: { id: string }) {
  switch (id) {
    case 'svc-web':
      return (
        <>
          <div className={`${bar} -right-[10%] bottom-[22%]`} />
          <div className={`${card} inset-x-[10%] top-[14%] bottom-[18%] overflow-hidden`}>
            <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-3 py-2">
              {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/20" />)}
              <span className="ml-2 h-1.5 w-1/3 rounded-full bg-white/10" />
            </div>
            <div className="p-4">
              <div className="h-3 w-2/3 rounded-full bg-white/25" />
              <div className={`${line} mt-2.5 w-1/2`} />
              <div className="mt-4 h-6 w-24 rounded-full bg-azure-500" />
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => <div key={i} className="aspect-[4/3] rounded-md bg-white/[0.06]" />)}
              </div>
            </div>
          </div>
        </>
      )
    case 'svc-mobile':
      return (
        <>
          <div className={`${bar} -left-[12%] top-[26%]`} />
          {[{ l: '22%', r: -8, t: '14%' }, { l: '50%', r: 6, t: '20%' }].map((p, i) => (
            <div
              key={i}
              className="absolute w-[28%] min-w-[6.5rem] rounded-[1.2rem] border border-white/12 bg-ink-950 p-1.5"
              style={{ left: p.l, top: p.t, transform: `rotate(${p.r}deg)` }}
            >
              <div className="rounded-[0.9rem] bg-ink-900 p-2.5">
                <div className="mx-auto mb-2.5 h-1 w-6 rounded-full bg-white/15" />
                <div className={`aspect-square rounded-md ${i ? 'bg-azure-500' : 'bg-white/[0.07]'}`} />
                <div className={`${line} mt-2.5 w-3/4`} />
                <div className={`${line} mt-1.5 w-1/2 bg-white/10`} />
                <div className="mt-3 h-4 rounded-full bg-white/10" />
              </div>
            </div>
          ))}
        </>
      )
    case 'svc-ai':
      return (
        <>
          <div className={`${bar} -right-[14%] top-[18%]`} />
          <div className="absolute inset-x-[12%] top-[16%] space-y-3">
            <div className={`${card} relative ml-auto w-[62%] p-3`}><div className={`${line} w-full`} /><div className={`${line} mt-1.5 w-2/3`} /></div>
            <div className="relative w-[74%] rounded-lg border border-azure-500/40 bg-azure-500/[0.08] p-3">
              <div className="h-1.5 w-full rounded-full bg-azure-500/70" />
              <div className="mt-1.5 h-1.5 w-5/6 rounded-full bg-azure-500/50" />
              <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-azure-500/40" />
            </div>
            <div className={`${card} relative ml-auto w-[48%] p-3`}><div className={`${line} w-full`} /></div>
          </div>
        </>
      )
    case 'svc-software':
      return (
        <>
          <div className={`${bar} -left-[14%] bottom-[18%]`} />
          <div className={`${card} inset-x-[10%] top-[14%] bottom-[16%] p-4`}>
            <div className="flex h-[48%] items-end gap-1.5">
              {[40, 62, 48, 75, 58, 88, 70, 95].map((h, i) => (
                <span key={i} className={`flex-1 rounded-sm ${i === 7 ? 'bg-azure-500' : 'bg-white/15'}`} style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3 border-t border-white/[0.06] pt-2">
                  <span className="h-1.5 w-1/4 rounded-full bg-white/20" />
                  <span className="h-1.5 w-1/3 rounded-full bg-white/10" />
                  <span className={`ml-auto h-1.5 w-10 rounded-full ${i === 0 ? 'bg-azure-500' : 'bg-white/15'}`} />
                </div>
              ))}
            </div>
          </div>
        </>
      )
    case 'svc-marketing':
      return (
        <>
          <div className={`${bar} -right-[12%] bottom-[16%]`} />
          <div className={`${card} inset-x-[10%] top-[14%] h-[56%] p-4`}>
            <svg viewBox="0 0 200 90" className="h-full w-full" fill="none" aria-hidden="true">
              <path d="M0 80 H200 M0 55 H200 M0 30 H200" stroke="rgba(255,255,255,0.06)" />
              <path d="M0 78 C30 74 45 60 70 62 S110 40 135 36 S175 14 200 8" stroke="#B5FF36" strokeWidth="2.5" />
              <path d="M0 82 C40 80 70 72 100 70 S160 58 200 52" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
              <circle cx="200" cy="8" r="4" fill="#B5FF36" />
            </svg>
          </div>
          <div className="absolute bottom-[12%] left-[10%] flex gap-2">
            {['SEO', 'Ads', 'Social'].map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
        </>
      )
    case 'svc-voice':
      return (
        <>
          <div className={`${bar} -left-[12%] top-[20%]`} />
          <div className="absolute inset-x-[10%] top-1/2 flex h-[42%] -translate-y-1/2 items-center gap-[3px]">
            {Array.from({ length: 44 }, (_, i) => {
              const h = 18 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.17)) * 82
              return <span key={i} className={`flex-1 rounded-full ${i > 16 && i < 28 ? 'bg-azure-500' : 'bg-white/20'}`} style={{ height: `${h}%` }} />
            })}
          </div>
          <div className="absolute bottom-[12%] left-[10%] font-mono text-2xs uppercase tracking-ultra text-mist-100/40">
            Text → Voice · Multilingual
          </div>
        </>
      )
    default:
      return <div className={`${bar} -right-[10%] bottom-[22%]`} />
  }
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

function ServiceCard({ service, i }: { service: (typeof services)[number]; i: number }) {
  return (
    <article
      data-card
      className="group relative flex h-full flex-col overflow-hidden rounded-[18px] lg:flex-row border border-white/[0.07] bg-ink-900/60 transition-colors duration-500 hover:border-azure-500/40"
    >
      <div data-art className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.07] bg-[#0B0B0B] lg:aspect-auto lg:w-[44%] lg:shrink-0 lg:border-b-0 lg:border-r">
        <div data-art-inner className="absolute inset-0 transition-transform duration-[900ms] ease-premium will-transform group-hover:scale-[1.04]">
          <div className="absolute inset-0 grid-lines opacity-30" />
          <Art id={service.id} />
        </div>
      </div>

      <div className="relative flex flex-col p-6 sm:p-7 lg:flex-1 lg:justify-center">
        <div className="flex items-start justify-between gap-6">
          <span className="font-condensed text-5xl leading-none text-outline transition-colors duration-500 group-hover:[-webkit-text-stroke-color:rgba(181,255,54,0.8)]">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-mist-100/60 transition-all duration-500 ease-premium group-hover:rotate-45 group-hover:border-azure-500 group-hover:bg-azure-500 group-hover:text-ink-950">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-5 overflow-hidden">
          <h3 data-title className="font-condensed text-[2rem] font-normal uppercase leading-[0.95] text-mist-50 transition-colors duration-500 group-hover:text-azure-500 sm:text-[2.4rem]">
            {service.title}
          </h3>
        </div>
        <p className="mt-3 body-md">{service.body}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {service.capabilities.map((cap) => (
            <li key={cap} className="chip">{cap}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function ServicesReel() {
  const ref = useRef<HTMLElement>(null)

  useGsap(ref, (mm, root) => {
    const q = gsap.utils.selector(root)

    // Desktop — pinned horizontal reel, each card's art unmasks as it arrives.
    mm.add(DESKTOP, () => {
      const track = q('[data-track]')[0] as HTMLElement
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 64)

      const reel = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: q('[data-pin]')[0],
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      gsap.fromTo(q('[data-progress]'), { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: q('[data-pin]')[0], start: 'top top', end: () => `+=${distance()}`, scrub: true },
      })

      q('[data-track] [data-card]').forEach((cardEl, idx) => {
        const art = cardEl.querySelector('[data-art]')
        const inner = cardEl.querySelector('[data-art-inner]')
        const title = cardEl.querySelector('[data-title]')
        // The first cards are already in view when the pin starts.
        if (idx < 2) return
        const st = { trigger: cardEl, containerAnimation: reel, start: 'left 92%', end: 'left 45%', scrub: true }
        gsap.fromTo(art, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: st })
        gsap.fromTo(inner, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: st })
        gsap.fromTo(title, { yPercent: 100 }, { yPercent: 0, ease: 'none', scrollTrigger: { ...st, end: 'left 60%' } })
      })

      ScrollTrigger.refresh()
    })
  })

  return (
    <section ref={ref} id="services" aria-label="Services" className="relative scroll-mt-28 bg-ink-950">
      <div data-pin className="section-pad lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:overflow-hidden lg:pb-8 lg:pt-24">
        <div className="container-anvix">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="What we do"
              title={
                <>
                  Six practice areas, <span className="text-azure-gradient">one standard.</span>
                </>
              }
            />
            <p className="max-w-sm body-md">
              Each engagement is scoped around a business outcome, then engineered to be
              maintainable long after the first release.
            </p>
          </div>
        </div>

        {/* Desktop reel */}
        <div className="mt-8 hidden lg:block">
          <div data-track className="flex h-[min(50svh,30rem)] gap-5 pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))] will-transform">
            {services.map((service, i) => (
              <div key={service.id} className="h-full w-[min(48rem,62vw)] shrink-0">
                <ServiceCard service={service} i={i} />
              </div>
            ))}
          </div>
          <div className="container-anvix mt-6">
            <div className="h-px w-full bg-white/10">
              <div data-progress className="h-px w-full origin-left bg-azure-500" />
            </div>
          </div>
        </div>

        {/* Tablet / phone grid */}
        <div className="container-anvix mt-10 grid gap-5 sm:grid-cols-2 lg:hidden">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ clipPath: 'inset(100% 0% 0% 0% round 18px)' }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 18px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: EASE, delay: (i % 2) * 0.12 }}
            >
              <ServiceCard service={service} i={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
