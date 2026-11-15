import { useRef } from 'react'
import { useGsap, gsap, TABLET_UP } from '@/lib/gsap'

/* ------------------------------------------------------------------ */
/* Panel visuals — composed in code, no stock imagery                   */
/* ------------------------------------------------------------------ */

const code = [
  [['k', 'export async function '], ['f', 'createQuotation'], ['p', '(input: QuoteInput) {']],
  [['p', '  const items = '], ['k', 'await '], ['f', 'catalogue.resolve'], ['p', '(input.items)']],
  [['p', '  const total = items.'], ['f', 'reduce'], ['p', '((sum, i) => sum + i.price * i.qty, 0)']],
  [['c', '  // GST, discounts and rounding handled in one place']],
  [['p', '  const quote = '], ['f', 'withTax'], ['p', '(total, input.gst)']],
  [['k', '  return '], ['f', 'db.quotations.insert'], ['p', '({ ...input, quote })']],
  [['p', '}']],
  [['p', '']],
  [['k', 'export const '], ['f', 'router'], ['p', ' = api.'], ['f', 'route'], ['p', "('/quotations')"]],
  [['p', '  .'], ['f', 'post'], ['p', '(auth, validate(QuoteInput), createQuotation)']],
  [['p', '  .'], ['f', 'get'], ['p', '(auth, listQuotations)']],
] as const

const tone: Record<string, string> = {
  k: 'text-azure-400',
  f: 'text-mist-50',
  p: 'text-mist-100/55',
  c: 'text-mist-100/30 italic',
}

function CodeVisual() {
  return (
    <div className="absolute inset-0 bg-[#08122B]">
      <div className="absolute inset-0 grid-lines opacity-40" />
      <div className="absolute inset-x-[7%] top-[12%] overflow-hidden rounded-xl border border-white/[0.08] bg-ink-900/95 shadow-card">
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-azure-500" />
          <span className="ml-3 font-mono text-2xs text-mist-100/40">quotations.service.ts</span>
        </div>
        <pre className="overflow-hidden px-4 py-4 font-mono text-[0.68rem] leading-[1.85] sm:text-[0.74rem]">
          {code.map((row, i) => (
            <div key={i} className="flex whitespace-pre">
              <span className="mr-4 w-5 shrink-0 select-none text-right text-mist-100/20">{i + 1}</span>
              {row.map(([t, s], j) => (
                <span key={j} className={tone[t]}>{s}</span>
              ))}
            </div>
          ))}
        </pre>
      </div>
      <div className="absolute -right-[12%] bottom-[18%] h-10 w-[55%] -rotate-[28deg] bg-azure-500" />
    </div>
  )
}

function ProductVisual() {
  return (
    <div className="absolute inset-0 bg-[#0A1531]">
      <div className="absolute inset-0 grid-lines opacity-30" />
      <div className="absolute -left-[10%] top-[16%] h-10 w-[50%] -rotate-[28deg] bg-azure-500" />

      {/* Storefront card */}
      <div className="absolute right-[7%] top-[12%] w-[58%] overflow-hidden rounded-xl border border-white/[0.08] bg-ink-900/95">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
          <span className="font-condensed text-sm uppercase tracking-wide text-mist-50">Storefront</span>
          <span className="h-5 w-12 rounded-full bg-azure-500/90" />
        </div>
        <div className="grid grid-cols-2 gap-2.5 p-3.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2">
              <div className={`aspect-[4/3] rounded-md ${i === 1 ? 'bg-azure-500/80' : 'bg-white/[0.07]'}`} />
              <div className="mt-2 h-1.5 w-3/4 rounded-full bg-white/15" />
              <div className="mt-1.5 h-1.5 w-1/3 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </div>

      {/* Phone */}
      <div className="absolute bottom-[8%] left-[9%] w-[30%] min-w-[7.5rem] rounded-[1.4rem] border border-white/12 bg-ink-950 p-2 shadow-card">
        <div className="rounded-[1rem] bg-ink-900 p-3">
          <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-white/15" />
          <div className="font-condensed text-lg uppercase leading-none text-mist-50">Today</div>
          <div className="mt-3 space-y-2">
            {[70, 45, 85].map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`h-5 w-5 shrink-0 rounded-md ${i === 0 ? 'bg-azure-500' : 'bg-white/10'}`} />
                <span className="h-1.5 rounded-full bg-white/15" style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-4 h-7 rounded-full bg-azure-500" />
        </div>
      </div>

      {/* Analytics strip */}
      <div className="absolute bottom-[12%] right-[7%] flex h-[22%] w-[42%] items-end gap-1.5 rounded-xl border border-white/[0.08] bg-ink-900/95 p-3">
        {[35, 52, 44, 68, 60, 82, 96].map((h, i) => (
          <span key={i} className={`flex-1 rounded-sm ${i === 6 ? 'bg-azure-500' : 'bg-white/15'}`} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

const panels = [
  {
    key: 'l',
    index: '01',
    label: 'Engineering',
    title: 'Software that runs your business',
    body: 'Web platforms, APIs and business systems engineered to be fast, secure and maintainable.',
    Visual: CodeVisual,
  },
  {
    key: 'r',
    index: '02',
    label: 'Experience',
    title: 'Products people love to use',
    body: 'Storefronts, mobile apps and dashboards designed around how real customers behave.',
    Visual: ProductVisual,
  },
]

export function SplitShowcase() {
  const ref = useRef<HTMLElement>(null)

  useGsap(ref, (mm, root) => {
    const q = gsap.utils.selector(root)

    // Tablet / desktop — pinned, scrubbed split-screen reveal.
    mm.add(TABLET_UP, () => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=150%',
          pin: q('[data-pin]')[0],
          scrub: 0.8,
          anticipatePin: 1,
        },
      })
      tl.fromTo(q('[data-panel="l"]'), { clipPath: 'inset(100% 0% 0% 0% round 18px)' }, { clipPath: 'inset(0% 0% 0% 0% round 18px)', duration: 1 }, 0)
        .fromTo(q('[data-panel="r"]'), { clipPath: 'inset(0% 0% 100% 0% round 18px)' }, { clipPath: 'inset(0% 0% 0% 0% round 18px)', duration: 1 }, 0.2)
        .fromTo(q('[data-media="l"]'), { scale: 1.28 }, { scale: 1, duration: 1.3 }, 0)
        .fromTo(q('[data-media="r"]'), { scale: 1.28 }, { scale: 1, duration: 1.3 }, 0.2)
        .fromTo(q('[data-caption]'), { yPercent: 110 }, { yPercent: 0, duration: 0.5, stagger: 0.15 }, 0.75)
        .fromTo(q('[data-rule]'), { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 0.85)
        // Parallax drift while the scene holds
        .to(q('[data-media="l"]'), { yPercent: -5, duration: 0.9 }, 1.3)
        .to(q('[data-media="r"]'), { yPercent: 5, duration: 0.9 }, 1.3)
    })

    // Phones — simple one-shot reveals as each panel enters.
    mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      q('[data-panel]').forEach((panel) => {
        gsap.fromTo(panel,
          { clipPath: 'inset(0% 0% 100% 0% round 18px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 18px)', duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: panel, start: 'top 85%' } })
        gsap.fromTo(panel.querySelector('[data-media]'),
          { scale: 1.2 }, { scale: 1, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: panel, start: 'top 85%' } })
      })
    })
  })

  return (
    <section ref={ref} aria-label="What we make" className="relative bg-ink-950">
      <div data-pin className="flex min-h-[100svh] flex-col justify-center py-20 md:h-[100svh] md:py-0">
        <div className="container-anvix">
          <div className="mb-6 flex items-center justify-between gap-6 font-mono text-2xs uppercase tracking-ultra text-mist-100/40">
            <span>What we make</span>
            <span data-rule className="h-px flex-1 origin-left bg-white/10" />
            <span className="text-azure-500">Build × Experience</span>
          </div>

          <div className="grid gap-4 md:h-[72svh] md:grid-cols-2 lg:gap-5">
            {panels.map(({ key, index, label, title, body, Visual }) => (
              <article
                key={key}
                data-panel={key}
                className="relative h-[68svh] overflow-hidden rounded-[18px] border border-white/[0.07] md:h-full"
              >
                <div data-media={key} className="absolute inset-x-0 -inset-y-[7%] will-transform">
                  <Visual />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950 via-ink-950/85 to-transparent p-6 pt-24 sm:p-8 sm:pt-28">
                  <div className="overflow-hidden">
                    <div data-caption>
                      <p className="font-mono text-2xs uppercase tracking-ultra text-azure-500">
                        {index} — {label}
                      </p>
                      <h3 className="mt-3 max-w-md font-condensed text-[2.1rem] font-normal uppercase leading-[0.95] text-mist-50 sm:text-[2.6rem] lg:text-[3.1rem]">
                        {title}
                      </h3>
                      <p className="mt-3 max-w-sm text-[0.875rem] leading-relaxed text-mist-100/60">{body}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
