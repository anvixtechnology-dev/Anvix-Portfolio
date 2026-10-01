import { useMemo, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { site } from '@/data/site'
import { heroLabels } from '@/data/content'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { EASE } from '@/utils/motion'

/* ------------------------------------------------------------------ */
/* Abstract orbital visual                                             */
/* ------------------------------------------------------------------ */

/** Deterministic pseudo-random so SSR/CSR renders stay identical. */
const seeded = (index: number, salt: number) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

function Particles({ count = 26 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: seeded(i, 1) * 100,
        y: seeded(i, 2) * 100,
        size: 1 + seeded(i, 3) * 1.9,
        delay: seeded(i, 4) * 8,
        duration: 5 + seeded(i, 5) * 7,
        opacity: 0.18 + seeded(i, 6) * 0.42,
      })),
    [count],
  )

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-azure-300 will-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: '0 0 8px rgba(31,99,224,0.55)',
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

function OrbitalVisual() {
  const reduce = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 26])
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -28])

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[34rem]"
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(31,99,224,0.16),transparent_68%)] blur-2xl" />

      {/* Grid plane */}
      <div className="absolute inset-0 grid-lines mask-fade-b opacity-40 [transform:perspective(900px)_rotateX(64deg)_translateY(18%)] [transform-origin:center_bottom]" />

      {/* Static hairlines */}
      <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="178" stroke="rgba(31,99,224,0.14)" strokeWidth="1" />
        <circle cx="200" cy="200" r="120" stroke="rgba(31,99,224,0.1)" strokeWidth="1" />
        <path d="M22 200h356M200 22v356" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      </svg>

      {/* Rotating orbit rings */}
      <motion.div
        style={reduce ? undefined : { rotate, y }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-azure-500/40 to-transparent" />
          <div className="absolute bottom-0 left-1/2 h-1/2 w-px -translate-x-1/2 bg-gradient-to-t from-transparent via-azure-500/40 to-transparent" />
        </div>
        <div className="absolute inset-[6%] animate-spin-reverse">
          <div className="absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-azure-400/30 to-transparent" />
        </div>
        <div className="absolute inset-[13%] animate-spin-slow [animation-duration:34s]">
          <div className="absolute right-0 top-1/2 h-px w-1/2 -translate-y-1/2 bg-gradient-to-l from-transparent via-mist-200/25 to-transparent" />
        </div>
      </motion.div>

      {/* Orbiting nodes */}
      {!reduce && (
        <>
          <div className="absolute inset-[6%] animate-spin-slow">
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-azure-300 shadow-[0_0_16px_rgba(31,99,224,0.85)]" />
          </div>
          <div className="absolute inset-[13%] animate-spin-reverse [animation-duration:34s]">
            <span className="absolute right-0 top-1/2 h-2 w-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-azure-400/85 shadow-[0_0_14px_rgba(31,99,224,0.7)]" />
          </div>
        </>
      )}

      {/* Core monogram */}
      <div className="absolute inset-[26%] grid place-items-center">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 rounded-full border border-azure-500/25 bg-ink-950/60 backdrop-blur-md" />
          <div className="absolute inset-[12%] animate-pulse-ring rounded-full border border-azure-500/30" />
          <div className="absolute inset-[12%] rounded-full border border-azure-500/20" />
          <div className="absolute inset-0 grid place-items-center">
            <svg viewBox="0 0 120 120" className="h-[58%] w-[58%]" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="hero-azure" x1="14" y1="10" x2="106" y2="110" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#B4D1FF" />
                  <stop offset="0.5" stopColor="#1F63E0" />
                  <stop offset="1" stopColor="#113C99" />
                </linearGradient>
              </defs>
              <path d="M60 20 L86 100 H74.5 L60 60 L45.5 100 H34 Z" fill="url(#hero-azure)" />
              <path
                d="M60 20 L60 60 L45.5 100 H34 Z"
                fill="url(#hero-azure)"
                fillOpacity="0.55"
              />
              <rect x="53" y="76" width="14" height="6" rx="3" fill="#1F63E0" fillOpacity="0.75" />
              <ellipse
                cx="60"
                cy="60"
                rx="52"
                ry="20"
                stroke="#1F63E0"
                strokeOpacity="0.45"
                strokeWidth="1.4"
                transform="rotate(-26 60 60)"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Node labels */}
      <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 -translate-x-1 sm:block">
        <span className="chip chip-azure">API</span>
      </div>
      <div className="absolute right-0 top-[18%] hidden -translate-y-1/2 translate-x-1/3 sm:block">
        <span className="chip">Cloud</span>
      </div>
      <div className="absolute bottom-[14%] right-[6%] hidden -translate-y-1/2 translate-x-1/3 sm:block">
        <span className="chip">AI</span>
      </div>

      <Particles />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function Hero() {
  const words = ['WE BUILD', 'DIGITAL EXPERIENCES', 'THAT MATTER.']

  return (
    <section
      id="home"
      className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-28 lg:pt-44"
    >
      {/* Background layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(75%_60%_at_75%_20%,rgba(20,33,58,0.6),transparent_70%)]" />
        <div className="absolute inset-0 grid-lines mask-fade-b opacity-[0.55]" />
        <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(31,99,224,0.09),transparent_65%)] blur-3xl" />
      </div>

      <div className="container-anvix relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
          {/* Copy */}
          <div>
            {/* Availability pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-3 rounded-full border border-azure-500/25 bg-azure-500/[0.06] py-1.5 pl-2 pr-4 backdrop-blur-sm"
            >
              <span className="relative flex h-5 w-5 items-center justify-center">
                <span className="absolute h-2 w-2 rounded-full bg-azure-400/60 animate-pulse-ring" />
                <span className="h-1.5 w-1.5 rounded-full bg-azure-300" />
              </span>
              <span className="font-mono text-2xs uppercase tracking-wide2 text-azure-200/90">
                Accepting new projects · {site.founded}+
              </span>
            </motion.div>

            {/* Category label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="mt-8 font-mono text-2xs uppercase tracking-ultra text-mist-100/40 sm:mt-10"
            >
              {heroLabels.join('  •  ')}
            </motion.p>

            {/* Heading */}
            <h1 className="mt-5 font-display font-semibold tracking-tightest">
              {words.map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.95, delay: 0.14 + i * 0.11, ease: EASE }}
                    className={cnWordClass(i)}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Supporting copy */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="mt-7 max-w-xl body-lg text-pretty"
            >
              ANVIX Technologies transforms ideas into scalable digital products through software,
              mobile applications, intelligent systems and modern technology.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.62, ease: EASE }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
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

            {/* Trust row */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
              className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/[0.07] pt-7"
            >
              {[
                { k: '4+', v: 'Products shipped' },
                { k: '2', v: 'Founding partners' },
                { k: '100%', v: 'Commitment' },
              ].map((item) => (
                <div key={item.v}>
                  <dt className="font-display text-2xl text-azure-gradient">{item.k}</dt>
                  <dd className="mt-1.5 font-mono text-2xs uppercase tracking-wide2 text-mist-100/40">
                    {item.v}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
            className="relative"
          >
            <OrbitalVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* The middle line gets the azure treatment; the others stay mist. */
function cnWordClass(index: number) {
  const base =
    'block text-[1.7rem] leading-[1.1] sm:text-5xl sm:leading-[1.06] lg:text-[3.85rem] lg:leading-[1.03]'
  return index === 1 ? `${base} text-azure-gradient` : `${base} text-mist-50`
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
