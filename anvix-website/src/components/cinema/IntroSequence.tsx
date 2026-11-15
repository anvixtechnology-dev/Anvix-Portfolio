import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Prism } from './Prism'
import { SplitChars } from './SplitChars'

const SEEN_KEY = 'anvix:intro-seen'

/** The intro plays once per browser session and never for reduced-motion users. */
export function shouldPlayIntro() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return window.sessionStorage.getItem(SEEN_KEY) !== '1'
  } catch {
    return true
  }
}

interface IntroSequenceProps {
  /** Fired as the curtains begin to open — the hero starts its entrance here. */
  onReveal: () => void
  /** Fired once the overlay has fully cleared and can be unmounted. */
  onComplete: () => void
}

/**
 * Full-screen cinematic opening:
 * black → accent lines draw → ANVIX unmasks horizontally → INNOVATION /
 * DIGITAL IMPACT rise letter by letter while a blue prism sweeps diagonally
 * through the frame → the frame splits into two curtains to reveal the site.
 */
export function IntroSequence({ onReveal, onComplete }: IntroSequenceProps) {
  const root = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const callbacks = useRef({ onReveal, onComplete })
  callbacks.current = { onReveal, onComplete }

  // Lock scrolling while the overlay is up.
  useEffect(() => {
    window.scrollTo(0, 0)
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    try {
      window.sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* storage unavailable — the intro simply plays again next visit */
    }
    return () => {
      html.style.overflow = prev
    }
  }, [])

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const q = gsap.utils.selector(el)
    let revealed = false
    const reveal = () => {
      if (revealed) return
      revealed = true
      callbacks.current.onReveal()
    }

    const ctx = gsap.context(() => {
      const counter = { v: 0 }
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'expo.out' },
        onComplete: () => callbacks.current.onComplete(),
      })
      tlRef.current = tl

      tl.set(q('[data-stage]'), { autoAlpha: 1 })
        // Thin accent lines draw out from the centre
        .fromTo(q('[data-line]'), { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: 'power3.inOut', stagger: 0.09 }, 0)
        .fromTo(q('[data-vline]'), { scaleY: 0 }, { scaleY: 1, duration: 1.1, ease: 'power3.inOut' }, 0.2)
        .fromTo(q('[data-glow]'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' }, 0.1)
        .to(counter, {
          v: 100,
          duration: 2.9,
          ease: 'power1.inOut',
          onUpdate: () => {
            const node = q('[data-count]')[0]
            if (node) node.textContent = String(Math.round(counter.v)).padStart(3, '0')
          },
        }, 0)
        // ANVIX — horizontal mask reveal
        .fromTo(q('[data-brand]'),
          { clipPath: 'inset(0% 50% 0% 50%)', opacity: 0.2, scale: 1.06 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1, duration: 1.2 }, 0.3)
        .fromTo(q('[data-brand-sub]'), { yPercent: 110 }, { yPercent: 0, duration: 0.9 }, 0.8)
        // ANVIX wipes out to the right
        .to(q('[data-brand]'), { clipPath: 'inset(0% 0% 0% 100%)', duration: 0.75, ease: 'power3.in' }, 1.5)
        .to(q('[data-brand-sub]'), { yPercent: -110, duration: 0.5, ease: 'power3.in' }, 1.5)
        // INNOVATION / DIGITAL IMPACT — letter by letter
        .fromTo(q('[data-left] [data-char]'), { yPercent: 115 }, { yPercent: 0, duration: 1, stagger: 0.035 }, 1.95)
        .fromTo(q('[data-right] [data-char]'), { yPercent: 115 }, { yPercent: 0, duration: 1, stagger: 0.03 }, 2.05)
        .fromTo(q('[data-caption]'), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, 2.3)
        // Diagonal prism sweep with 3D rotation and motion blur
        .fromTo(q('[data-blade-track]'), { x: '-115vmax' }, { x: '115vmax', duration: 1.7, ease: 'power2.inOut' }, 1.7)
        .fromTo(q('[data-blade]'),
          { rotateX: -70, rotateY: -35, rotateZ: -6 },
          { rotateX: 290, rotateY: 35, rotateZ: 6, duration: 1.7, ease: 'none' }, 1.7)
        .fromTo(q('[data-blur]'),
          { filter: 'blur(14px)' },
          { keyframes: [
            { filter: 'blur(0px)', duration: 0.85, ease: 'power2.out' },
            { filter: 'blur(14px)', duration: 0.85, ease: 'power2.in' },
          ] }, 1.7)
        .fromTo(q('[data-streak]'), { scaleX: 0, opacity: 0 }, {
          keyframes: [
            { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
            { scaleX: 0, opacity: 0, duration: 0.7, ease: 'power2.in' },
          ] }, 1.85)
        // Exit
        .addLabel('exit', 3.55)
        .to(q('[data-char]'), { yPercent: -115, duration: 0.6, ease: 'power3.in', stagger: 0.012 }, 'exit')
        .to(q('[data-caption], [data-meta]'), { autoAlpha: 0, duration: 0.4 }, 'exit')
        .to(q('[data-line]'), { scaleX: 0, duration: 0.6, ease: 'power3.in' }, 'exit+=0.1')
        .to(q('[data-vline]'), { scaleY: 0, duration: 0.5, ease: 'power3.in' }, 'exit+=0.1')
        .to(q('[data-glow]'), { opacity: 0, duration: 0.6 }, 'exit')
        .addLabel('reveal', 'exit+=0.65')
        .call(reveal, [], 'reveal')
        .to(q('[data-curtain="l"]'), { xPercent: -100, duration: 1.15, ease: 'power4.inOut' }, 'reveal')
        .to(q('[data-curtain="r"]'), { xPercent: 100, duration: 1.15, ease: 'power4.inOut' }, 'reveal+=0.06')
        .set(el, { pointerEvents: 'none' }, 'reveal')
        .to(q('[data-stage]'), { autoAlpha: 0, duration: 0.3 }, 'reveal')
    }, el)

    // Start once the display font is ready so the type never swaps mid-shot.
    let started = false
    const start = () => {
      if (started) return
      started = true
      tlRef.current?.play()
    }
    const fallback = window.setTimeout(start, 1400)
    document.fonts?.ready.then(start).catch(start)

    return () => {
      window.clearTimeout(fallback)
      ctx.revert()
    }
  }, [])

  const skip = () => {
    const tl = tlRef.current
    if (!tl) return
    tl.play()
    if (tl.time() < tl.labels.exit) tl.seek('exit')
    tl.timeScale(1.6)
  }

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[150] overflow-hidden"
      role="presentation"
      onKeyDown={(e) => e.key === 'Escape' && skip()}
    >
      {/* Curtains — the two halves that split open at the end */}
      <div data-curtain="l" className="absolute inset-y-0 left-0 w-1/2 bg-ink-950 will-transform" />
      <div data-curtain="r" className="absolute inset-y-0 right-0 w-1/2 bg-ink-950 will-transform" />

      <div data-stage className="invisible absolute inset-0">
        {/* Cinematic glow — one soft, low-opacity pool of light */}
        <div
          data-glow
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(61,139,255,0.13),transparent_62%)]"
        />

        {/* Accent lines */}
        <div aria-hidden="true" className="absolute inset-x-0 top-[22%] h-px origin-center bg-white/15" data-line />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-[22%] h-px origin-center bg-white/15" data-line />
        <div aria-hidden="true" className="absolute inset-x-[30%] top-1/2 h-px origin-center bg-azure-500/60" data-line />
        <div aria-hidden="true" className="absolute inset-y-[22%] left-1/2 w-px origin-top bg-white/10" data-vline />

        {/* Corner meta */}
        <div data-meta className="absolute left-5 top-5 font-mono text-2xs uppercase tracking-ultra text-mist-100/45 sm:left-8 sm:top-7">
          ANVIX / Technologies
        </div>
        <div data-meta className="absolute right-5 top-5 font-mono text-2xs tracking-ultra text-azure-500 sm:right-8 sm:top-7">
          <span data-count>000</span>
        </div>

        {/* Brand */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div data-brand className="display-mega will-transform" style={{ fontSize: 'clamp(4.5rem, 21vw, 19rem)' }}>
              ANVIX<span className="text-azure-500">.</span>
            </div>
            <div className="mt-2 overflow-hidden">
              <p data-brand-sub className="font-mono text-2xs uppercase tracking-ultra text-mist-100/55 sm:text-xs">
                Building ideas · Creating technology
              </p>
            </div>
          </div>
        </div>

        {/* Split typography */}
        <div className="absolute inset-x-5 top-[22%] bottom-[22%] flex flex-col justify-between py-6 sm:inset-x-8 md:flex-row md:items-center md:py-0">
          <div data-left className="md:w-1/2">
            <div className="font-condensed uppercase leading-[0.88] text-mist-50" style={{ fontSize: 'clamp(3rem, 9.5vw, 9.5rem)' }}>
              <SplitChars text="Innovation" />
            </div>
            <p data-caption className="mt-3 font-mono text-2xs uppercase tracking-ultra text-mist-100/45">
              01 — Engineering
            </p>
          </div>
          <div data-right className="text-right md:w-1/2">
            <div className="font-condensed uppercase leading-[0.88] text-azure-500" style={{ fontSize: 'clamp(3rem, 9.5vw, 9.5rem)' }}>
              <SplitChars text="Digital Impact" />
            </div>
            <p data-caption className="mt-3 font-mono text-2xs uppercase tracking-ultra text-mist-100/45">
              02 — Experience
            </p>
          </div>
        </div>

        {/* Diagonal prism sweep */}
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0 -rotate-[28deg]">
          <div data-blade-track className="will-transform">
            <div
              data-streak
              className="absolute right-[6em] top-1/2 h-px w-[60vmax] origin-right -translate-y-1/2 bg-gradient-to-l from-azure-500/70 to-transparent"
            />
            <div data-blur className="will-transform">
              <div
                className="-translate-x-1/2 -translate-y-1/2 text-[clamp(9px,1.25vw,17px)]"
                style={{ perspective: '900px' }}
              >
                <div data-blade className="preserve-3d will-transform">
                  <Prism w={30} h={3.4} d={3.4} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        data-meta
        onClick={skip}
        className="absolute bottom-5 right-5 z-10 rounded-full border border-white/15 px-4 py-2 font-mono text-2xs uppercase tracking-wide2 text-mist-100/60 transition-colors duration-300 hover:border-azure-500/60 hover:text-azure-300 sm:bottom-7 sm:right-8"
      >
        Skip intro
      </button>
    </div>
  )
}
