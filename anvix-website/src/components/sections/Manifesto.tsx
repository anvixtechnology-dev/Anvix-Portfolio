import { useRef } from 'react'
import { SplitChars } from '@/components/cinema/SplitChars'
import { useGsap, gsap, TABLET_UP } from '@/lib/gsap'

/**
 * BUILD THE FUTURE. / CREATE THE IMPACT.
 * Pinned on tablet+ and scrubbed letter by letter; phones get a single
 * staggered reveal per line.
 */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null)

  useGsap(ref, (mm, root) => {
    const q = gsap.utils.selector(root)

    mm.add(TABLET_UP, () => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=130%',
          pin: q('[data-pin]')[0],
          scrub: 0.7,
          anticipatePin: 1,
        },
      })
      tl.fromTo(q('[data-line="1"]'), { scale: 0.9 }, { scale: 1, duration: 1.4 }, 0)
        .fromTo(q('[data-line="1"] [data-char]'),
          { yPercent: 115, rotateX: -75, opacity: 0 },
          { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.5, stagger: 0.045 }, 0)
        .fromTo(q('[data-line="2"]'), { scale: 0.9 }, { scale: 1, duration: 1.4 }, 0.55)
        .fromTo(q('[data-line="2"] [data-char]'),
          { yPercent: 115, rotateX: -75, opacity: 0 },
          { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.5, stagger: 0.045 }, 0.55)
        .fromTo(q('[data-bar]'), { scaleX: 0 }, { scaleX: 1, duration: 0.8 }, 1.1)
        .fromTo(q('[data-support]'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, 1.35)
        .to(q('[data-line="1"]'), { xPercent: -3, duration: 0.6 }, 1.6)
        .to(q('[data-line="2"]'), { xPercent: 3, duration: 0.6 }, 1.6)
    })

    mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      q('[data-line]').forEach((line) => {
        gsap.fromTo(line.querySelectorAll('[data-char]'),
          { yPercent: 115 },
          { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.03, scrollTrigger: { trigger: line, start: 'top 85%' } })
      })
      gsap.fromTo(q('[data-bar]'), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: q('[data-bar]')[0], start: 'top 90%' } })
    })
  })

  return (
    <section ref={ref} aria-label="Our promise" className="relative overflow-hidden bg-ink-950">
      <div data-pin className="flex min-h-[80svh] flex-col justify-center py-24 md:h-[100svh] md:py-0">
        <div className="container-anvix">
          <h2 className="display-mega" style={{ perspective: '900px' }}>
            <span data-line="1" className="block origin-left will-transform">
              <SplitChars text="Build the future." />
            </span>
            <span data-line="2" className="block origin-right text-right will-transform">
              <SplitChars text="Create the impact." charClassName="text-neon-500" />
            </span>
          </h2>

          <div className="mt-10 flex flex-col gap-6 md:mt-14 md:flex-row md:items-center md:justify-between">
            <span data-bar aria-hidden="true" className="h-[3px] w-full origin-left bg-neon-500 md:w-1/3" />
            <p data-support className="max-w-md body-lg">
              From the first sketch to launch day and beyond — ANVIX engineers digital products that
              businesses rely on and customers remember.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
