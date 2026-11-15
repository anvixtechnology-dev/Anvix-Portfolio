import { Github, Instagram, Linkedin, Mail, Twitter, ArrowUp } from 'lucide-react'
import { LogoMark } from '@/components/common/Logo'
import { footerColumns, site, socials } from '@/data/site'

const socialIcons = {
  linkedin: Linkedin,
  github: Github,
  x: Twitter,
  instagram: Instagram,
  mail: Mail,
} as const

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-midnight-950/50">
      {/* Ambient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-azure-500/30 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(21,38,79,0.6),transparent_70%)] blur-3xl"
      />

      <div className="container-anvix relative">
        {/* Top: brand + columns */}
        <div className="grid gap-10 py-12 lg:grid-cols-[1.35fr_2fr] lg:gap-16 lg:py-16">
          <div>
            <LogoMark stacked className="h-11 w-11" />

            <p className="mt-7 max-w-xs font-display text-lg leading-snug text-mist-50 text-balance">
              Building digital products that turn ideas into impact.
            </p>
            <p className="mt-5 max-w-sm body-md">{site.tagline}</p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {socials.map((social) => {
                const Icon = socialIcons[social.icon]
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                      aria-label={social.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-mist-100/55 transition-all duration-300 hover:-translate-y-0.5 hover:border-azure-500/45 hover:bg-azure-500/[0.08] hover:text-azure-300"
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="font-mono text-2xs uppercase tracking-ultra text-azure-400/85">
                  {column.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-[0.875rem] text-mist-100/55 transition-colors duration-300 hover:text-azure-200"
                      >
                        <span className="h-px w-0 bg-azure-500 transition-all duration-300 ease-premium group-hover:w-3" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Contact strip */}
        <div className="flex flex-col gap-4 border-t border-white/[0.07] py-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={`mailto:${site.email}`}
              className="text-[0.875rem] text-mist-100/60 transition-colors duration-300 hover:text-azure-200"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phoneHref}`}
              className="text-[0.875rem] text-mist-100/60 transition-colors duration-300 hover:text-azure-200"
            >
              {site.phone}
            </a>
            <a
              href={`tel:${site.phone2Href}`}
              className="text-[0.875rem] text-mist-100/60 transition-colors duration-300 hover:text-azure-200"
            >
              {site.phone2}
            </a>
            <span className="text-[0.875rem] text-mist-100/40">{site.location}</span>
          </div>

          <a
            href="#home"
            className="group inline-flex items-center gap-2 self-start font-mono text-2xs uppercase tracking-wide2 text-mist-100/40 transition-colors duration-300 hover:text-azure-300 sm:self-auto"
          >
            Back to top
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-colors duration-300 group-hover:border-azure-500/45">
              <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>

        {/* Bottom */}
        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-white/[0.07] py-6 sm:flex-row sm:items-center">
          <p className="text-center font-mono text-2xs text-mist-100/35 sm:text-left">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <a
                href="#privacy"
                className="text-2xs text-mist-100/35 transition-colors duration-300 hover:text-azure-300"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#terms"
                className="text-2xs text-mist-100/35 transition-colors duration-300 hover:text-azure-300"
              >
                Terms &amp; Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
