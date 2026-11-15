import { useRef } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Prism } from '@/components/cinema/Prism'
import { site } from '@/data/site'
import { heroLabels } from '@/data/content'
import { useGsap, gsap, MOTION_OK } from '@/lib/gsap'
import { EASE } from '@/utils/motion'

const lines = [
  { text: 'We Build', accent: false, drift: -4 },
  { text: 'Digital Experiences', accent: true, drift: 3 },
  { text: 'That Matter.', accent: false, drift: -2 },
]

const rise: Variants = {
  hidden: { y: '108%' },
  show: (i: number) => ({ y: '0%', transition: { duration: 1.05, delay: 0.05 + i * 0.1, ease: EASE } }),
}

const fade: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.85, delay: d, ease: EASE } }),
}

/* ------------------------------------------------------------------ */
/* Diagonal geometric object — echoes the intro's sweeping prism        */
/* ------------------------------------------------------------------ */

function DiagonalObject({ ready }: { ready: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
      animate={ready ? { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
      transition={{ duration: 1.4, delay: 0.35, ease: EASE }}
      aria-hidden="true"
      className="relative h-[17rem] w-full sm:h-[22rem] lg:h-[26rem]"
    >
      {/* Frame lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-white/[0.06]" />
      <span className="absolute left-0 top-3 font-mono text-2xs uppercase tracking-ultra text-mist-100/35">
        Fig. 01 — Build
      </span>
      <span className="absolute bottom-3 right-0 font-mono text-2xs uppercase tracking-ultra text-mist-100/35">
        Web · Mobile · AI
      </span>

      <div className="absolute inset-0 grid place-items-center" style={{ perspective: '1100px' }}>
        <div data-hero-object className="preserve-3d will-transform text-[clamp(8px,1.05vw,14px)]">
          <div className="preserve-3d" style={{ transform: 'rotateZ(-28deg) rotateX(18deg) rotateY(-22deg)' }}>
            <div className="preserve-3d" style={{ transform: 'translate3d(-2em, -4.6em, -3em)' }}>
              <Prism variant="charcoal" edge w={26} h={2.4} d={2.4} />
            </div>
            <div className="preserve-3d" style={{ transform: 'translate3d(0, 0, 0)' }}>
              <Prism w={34} h={3.6} d={3.6} />
            </div>
            <div className="preserve-3d" style={{ transform: 'translate3d(3em, 4.8em, 2em)' }}>
              <Prism variant="neon" w={20} h={2.4} d={2.4} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function Hero({ ready = true }: { ready?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const state = ready ? 'show' : 'hidden'

  // Scroll-linked depth: headline lines drift apart, the object rotates.
  useGsap(ref, (mm, root) => {
    mm.add(MOTION_OK, () => {
      const trigger = { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 }
      root.querySelectorAll<HTMLElement>('[data-drift]').forEach((line) => {
        gsap.to(line, { xPercent: Number(line.dataset.drift), ease: 'none', scrollTrigger: trigger })
      })
      gsap.fromTo('[data-hero-object]',
        { rotateX: 0, rotateY: 0 },
        { rotateX: -38, rotateY: 42, ease: 'none', scrollTrigger: { ...trigger, start: 'top 80%' } })
      gsap.to('[data-hero-fade]', { opacity: 0.15, y: -40, ease: 'none', scrollTrigger: { ...trigger, start: 'center center' } })
    })
  })

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-14 pt-32 sm:pb-16 sm:pt-36 lg:pb-20"
    >
      {/* Background — hairline grid only, no colour washes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-lines mask-fade-b opacity-[0.35]" />
      </div>

      <div className="container-anvix relative">
        {/* Top meta row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <motion.div
            variants={fade}
            custom={0}
            initial="hidden"
            animate={state}
            className="inline-flex items-center gap-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon-500" />
            <span className="font-mono text-2xs uppercase tracking-wide2 text-mist-100/70">
              Accepting new projects · {site.founded}+
            </span>
          </motion.div>
          <motion.p
            variants={fade}
            custom={0.1}
            initial="hidden"
            animate={state}
            className="font-mono text-2xs uppercase tracking-ultra text-mist-100/40"
          >
            {heroLabels.join('  /  ')}
          </motion.p>
        </div>

        {/* Headline */}
        <h1 className="mt-8 font-condensed font-normal uppercase leading-[0.88] tracking-[-0.012em] sm:mt-10">
          {lines.map((line, i) => (
            <span key={line.text} className="block overflow-hidden pb-[0.03em]">
              <motion.span
                variants={rise}
                custom={i}
                initial="hidden"
                animate={state}
                className="block will-transform"
              >
                <span
                  data-drift={line.drift}
                  className={`block text-[clamp(2.7rem,9.4vw,9.75rem)] ${line.accent ? 'text-neon-500' : 'text-mist-50'}`}
                >
                  {line.text}
                </span>
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Lower band */}
        <div className="mt-10 grid items-end gap-10 lg:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div data-hero-fade>
            <motion.p
              variants={fade}
              custom={0.45}
              initial="hidden"
              animate={state}
              className="max-w-xl body-lg text-pretty"
            >
              ANVIX Technologies transforms ideas into scalable digital products through software,
              mobile applications, intelligent systems and modern technology.
            </motion.p>

            <motion.div
              variants={fade}
              custom={0.55}
              initial="hidden"
              animate={state}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button size="lg" sheen onClick={() => scrollTo('projects')}>
                View Our Projects
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
              <Button size="lg" variant="secondary" onClick={() => scrollTo('contact')}>
                Work With Us
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </Button>
            </motion.div>

            <motion.dl
              variants={fade}
              custom={0.7}
              initial="hidden"
              animate={state}
              className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/[0.08] pt-6"
            >
              {[
                { k: '6+', v: 'Products shipped' },
                { k: '2', v: 'Founding partners' },
                { k: '100%', v: 'Commitment' },
              ].map((item) => (
                <div key={item.v}>
                  <dt className="font-condensed text-4xl text-mist-50">{item.k}</dt>
                  <dd className="mt-1.5 font-mono text-2xs uppercase tracking-wide2 text-mist-100/40">
                    {item.v}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <DiagonalObject ready={ready} />
        </div>
      </div>
    </section>
  )
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
