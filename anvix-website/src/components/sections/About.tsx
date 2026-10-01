import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal, RevealGroup, RevealItem } from '@/components/common/Reveal'
import { AccentDot, TechIcon } from '@/components/common/Icons'
import { services, valueCards } from '@/data/content'

export function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden">
      {/* Ambient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(20,33,58,0.55),transparent_70%)] blur-3xl"
      />

      <div className="container-anvix relative">
        {/* Intro */}
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="About ANVIX"
              title={
                <>
                  Technology With <span className="text-azure-gradient">Purpose.</span>
                </>
              }
            />

            <Reveal delay={0.1} className="mt-8">
              <div className="surface-card p-6 sm:p-7">
                <p className="font-mono text-2xs uppercase tracking-ultra text-azure-400/80">
                  Founded 2024 · Independent software company
                </p>
                <div className="rule-azure my-5" />
                <ul className="space-y-3.5">
                  {[
                    'Practical, scalable, user-centric digital solutions',
                    'Web, mobile, automation and emerging technologies',
                    'Every project treated as a product, not a task',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-mist-100/60">
                      <AccentDot />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Narrative */}
          <div className="space-y-7">
            <Reveal>
              <p className="font-display text-xl leading-[1.5] text-mist-50/90 sm:text-[1.5rem] sm:leading-[1.45] text-pretty">
                ANVIX Technologies is a growing technology company focused on building practical,
                scalable and user-centric digital solutions. We work across web development, mobile
                applications, automation and emerging technologies to transform ideas into reliable
                digital products.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="body-lg text-pretty">
                Our approach combines modern technology, clean design and real-world problem solving.
                Every project is treated as a product rather than simply a piece of software.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="body-md text-pretty">
                That means understanding the workflow before writing the code, choosing an
                architecture that will still make sense in a year, and delivering something the
                team can confidently maintain after launch. We are a small, focused company — which
                means the people you meet are the people building your product.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Value cards */}
        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-3 lg:mt-20" staggerDelay={0.1}>
          {valueCards.map((card, i) => (
            <RevealItem key={card.index} index={i}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-azure-500/35 hover:bg-white/[0.035] hover:shadow-card-hover">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_0%,rgba(31,99,224,0.1),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative flex items-start justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-azure-500/25 bg-azure-500/[0.07] text-azure-400 transition-colors duration-500 group-hover:border-azure-500/50 group-hover:bg-azure-500/[0.12]">
                    <TechIcon name={card.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-3xl font-light tracking-tightest text-white/10 transition-colors duration-500 group-hover:text-azure-500/35">
                    {card.index}
                  </span>
                </div>
                <h3 className="relative mt-7 font-display text-lg text-mist-50">{card.title}</h3>
                <p className="relative mt-3 body-md">{card.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Services */}
        <div id="services" className="mt-20 scroll-mt-28 lg:mt-28">
          <Reveal>
            <div className="flex flex-col gap-6 border-t border-white/[0.07] pt-12 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="eyebrow">What we do</span>
                <h3 className="mt-4 display-md max-w-xl text-balance">
                  Four practice areas, one delivery standard.
                </h3>
              </div>
              <p className="max-w-sm body-md">
                Each engagement is scoped around a business outcome, then engineered to be
                maintainable long after the first release.
              </p>
            </div>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2" staggerDelay={0.07}>
            {services.map((service, i) => (
              <RevealItem key={service.id} index={i} className="h-full">
                <article                   className="group relative h-full bg-ink-950/80 p-7 transition-colors duration-500 hover:bg-midnight-900/60 sm:p-8">
                  <span className="font-mono text-2xs tracking-ultra text-azure-500/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="mt-4 font-display text-lg text-mist-50 transition-colors duration-500 group-hover:text-azure-200">
                    {service.title}
                  </h4>
                  <p className="mt-3 body-md">{service.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="chip">
                        {cap}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
