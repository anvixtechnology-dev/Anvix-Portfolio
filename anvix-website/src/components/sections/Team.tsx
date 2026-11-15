import { Github, Linkedin, Mail, Phone, Globe, UserRound } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { CornerAccent, AccentDot } from '@/components/common/Icons'
import { team } from '@/data/team'
import { cn } from '@/utils/cn'
import { EASE } from '@/utils/motion'
import type { SocialLink, TeamMember } from '@/types'

const socialIcons: Record<SocialLink['icon'], typeof Mail> = {
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
  phone: Phone,
  globe: Globe,
}

/**
 * Portrait area. Renders the real photograph when `member.image` is provided,
 * otherwise an elegant monogram placeholder — no fake people are generated.
 */
function PartnerPortrait({ member }: { member: TeamMember }) {
  const initials = member.name
    .replace(/^Sangisetti\s+/i, '')
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-midnight-900/70">
      {member.image ? (
        <img
          src={member.image}
          alt={`${member.name}, ${member.role} at ANVIX Technologies`}
          loading="lazy"
          decoding="async"
          width={640}
          height={800}
          className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-premium group-hover:scale-[1.06]"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          {/* Placeholder texture */}
          <div className="absolute inset-0 grid-lines opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_25%,rgba(181,255,54,0.13),transparent_70%)]" />

          <div className="relative flex flex-col items-center gap-4 px-6 text-center">
            <span className="inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-azure-500/30 bg-ink-950/50 font-display text-2xl tracking-tightest text-azure-300 backdrop-blur-sm">
              {initials}
            </span>
            <div>
              <p className="font-mono text-2xs uppercase tracking-wide2 text-mist-100/40">
                Portrait forthcoming
              </p>
              <p className="mt-1.5 max-w-[15rem] text-2xs leading-relaxed text-mist-100/25">
                Add the photograph to <span className="text-azure-400/70">/assets/images</span> and
                reference it in <span className="text-azure-400/70">src/data/team.ts</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Gradient base so text below blends into the card */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950 to-transparent" />

      {/* Index chip */}
      <span className="absolute left-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-azure-500/30 bg-ink-950/70 font-mono text-2xs tracking-ultra text-azure-300 backdrop-blur-sm">
        {member.index}
      </span>

      {/* Social / contact icons — revealed on hover and on keyboard focus */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2 opacity-100 transition-all duration-500 ease-premium md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
        {member.socials.map((social) => {
          const Icon = socialIcons[social.icon] ?? Globe
          return (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
              aria-label={`${member.name} — ${social.label}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-ink-950/80 text-mist-100/70 backdrop-blur-sm transition-all duration-300 hover:border-azure-500/55 hover:bg-azure-500/15 hover:text-azure-200"
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
            </a>
          )
        })}
      </div>
    </div>
  )
}

function PartnerCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: EASE, delay: index * 0.12 }}
      tabIndex={0}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]',
        'transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-azure-500/45 hover:bg-white/[0.035] hover:shadow-card-hover',
        'focus-visible:-translate-y-1 focus-visible:border-azure-500/45',
      )}
    >
      <CornerAccent className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(181,255,54,0.09),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <PartnerPortrait member={member} />

      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <p className="font-mono text-2xs uppercase tracking-wide2 text-azure-400/85">
          Partner {member.index}
        </p>
        <h3 className="mt-3 font-display text-[1.3125rem] leading-tight text-mist-50 text-balance">
          {member.name}
        </h3>
        <p className="mt-2 text-[0.8125rem] font-medium text-azure-300/90">{member.role}</p>

        <div className="rule-azure my-5" />

        <p className="body-md text-pretty">{member.description}</p>

        <div className="mt-6">
          <p className="font-mono text-2xs uppercase tracking-ultra text-mist-100/35">
            Skills & areas
          </p>
          <ul className="mt-4 space-y-2.5">
            {member.skills.map((skill) => (
              <li key={skill} className="flex gap-3 text-[0.8125rem] text-mist-100/60">
                <AccentDot />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-5">
          <span className="inline-flex items-center gap-1.5 text-2xs text-mist-100/35">
            <UserRound className="h-3 w-3" />
            {member.location}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export function Team() {
  return (
    <section id="team" className="section-pad relative overflow-hidden bg-ink-950/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-azure-500/25 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(30,30,28,0.5),transparent_70%)] blur-3xl"
      />

      <div className="container-anvix relative">
        <SectionHeading
          eyebrow="Founding Team"
          title={
            <>
              Meet The People Behind <span className="text-azure-gradient">ANVIX</span>
            </>
          }
          description="ANVIX is led by two founding partners — one owning technology and engineering, the other owning operations and client relationships. Small team, direct accountability."
          align="center"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:gap-8">
          {team.map((member, i) => (
            <PartnerCard key={member.id} member={member} index={i} />
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div className="flex justify-center rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-6 text-center">
            <p className="body-md max-w-xl">
              We keep the team intentionally small so every project is led by a founder and handled
              with real care.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
