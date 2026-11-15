import { useState } from 'react'
import {
  ArrowUpRight,
  Clock,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/common/Reveal'
import { TextAreaField, TextField, SelectField } from '@/components/ui/Field'
import { SubmitButton, SubmitFeedback, useAsyncState } from '@/components/common/SubmitFeedback'
import { budgetRanges, projectTypes, site, socials } from '@/data/site'
import { api } from '@/utils/api'
import { MIN_MESSAGE_LENGTH, isEmail, isNonEmpty, isPhone } from '@/utils/validation'
import type { ContactEnquiry } from '@/types'

type FieldKey = keyof ContactEnquiry

const EMPTY: ContactEnquiry = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  budgetRange: '',
  message: '',
}

const socialIcons = {
  linkedin: Linkedin,
  github: Github,
  x: Twitter,
  instagram: Instagram,
  mail: Mail,
} as const

function validateField(key: FieldKey, value: string): string | undefined {
  const raw = value ?? ''
  switch (key) {
    case 'name':
      return raw.trim().length >= 2 ? undefined : 'Please enter your name.'
    case 'email':
      return isEmail(raw) ? undefined : 'Enter a valid email address.'
    case 'phone':
      return !isNonEmpty(raw) || isPhone(raw) ? undefined : 'Enter a valid phone number.'
    case 'company':
      return undefined
    case 'projectType':
      return isNonEmpty(raw) ? undefined : 'Select a project type.'
    case 'budgetRange':
      return isNonEmpty(raw) ? undefined : 'Select an approximate budget range.'
    case 'message':
      return raw.trim().length >= MIN_MESSAGE_LENGTH
        ? undefined
        : `Tell us a little more about the project (at least ${MIN_MESSAGE_LENGTH} characters).`
    default:
      return undefined
  }
}

export function Contact() {
  const [form, setForm] = useState<ContactEnquiry>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({})
  const status = useAsyncState()

  const set = (key: FieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (touched[key]) setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }))
  }

  const blur = (key: FieldKey) => {
    setTouched((prev) => ({ ...prev, [key]: true }))
    setErrors((prev) => ({ ...prev, [key]: validateField(key, form[key]) }))
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const required: FieldKey[] = ['name', 'email', 'phone', 'projectType', 'budgetRange', 'message']
    const nextErrors: Partial<Record<FieldKey, string>> = {}
    required.forEach((key) => {
      const error = validateField(key, form[key])
      if (error) nextErrors[key] = error
    })

    setTouched(
      required.reduce<Partial<Record<FieldKey, boolean>>>((acc, key) => {
        acc[key] = true
        return acc
      }, {}),
    )
    setErrors(nextErrors)

    const firstInvalid = required.find((key) => nextErrors[key])
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus()
      return
    }

    status.start()
    const result = await api.submitEnquiry(form)

    if (result.ok) {
      status.succeed(
        `Thanks ${form.name.split(' ')[0]} — we have your enquiry. ${site.responseTime}`,
      )
      setForm(EMPTY)
      setTouched({})
    } else {
      status.fail(result.message ?? 'We could not send your enquiry. Please try again.')
    }
  }

  return (
    <section
      id="contact"
      className="section-pad relative overflow-hidden border-t border-white/[0.06] bg-midnight-950/30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_25%_15%,rgba(21,38,79,0.6),transparent_70%)]"
      />

      <div className="container-anvix relative">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          {/* ---------------- Details ---------------- */}
          <div>
            <SectionHeading
              eyebrow="Contact"
              title={
                <>
                  Let's Build Something <span className="text-azure-gradient">Together.</span>
                </>
              }
              description="Have an idea, business requirement or product you want to build? Talk to the ANVIX Technologies team."
            />

            <Reveal delay={0.1} className="mt-10 space-y-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06]">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: site.email,
                  href: `mailto:${site.email}`,
                  note: 'Write to us any time',
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: site.phone,
                  href: `tel:${site.phoneHref}`,
                  note: site.hours,
                },
                {
                  icon: Phone,
                  label: 'Alternate phone',
                  value: site.phone2,
                  href: `tel:${site.phone2Href}`,
                  note: site.hours,
                },
                {
                  icon: MapPin,
                  label: 'Location',
                  value: site.locationShort,
                  href: undefined,
                  note: 'Working with clients across India & worldwide',
                },
                {
                  icon: Clock,
                  label: 'Response time',
                  value: site.responseTime,
                  href: undefined,
                  note: 'Monday – Saturday',
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="group flex items-start gap-4 bg-ink-950/90 p-5 transition-colors duration-400 hover:bg-midnight-900/50"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-azure-500/25 bg-azure-500/[0.07] text-azure-400 transition-colors duration-400 group-hover:border-azure-500/50">
                    <row.icon className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-2xs uppercase tracking-wide2 text-mist-100/35">
                      {row.label}
                    </p>
                    {row.href ? (
                      <a
                        href={row.href}
                        className="mt-1.5 inline-flex items-center gap-1.5 break-words text-[0.9375rem] text-mist-50 transition-colors duration-300 hover:text-azure-200"
                      >
                        {row.value}
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
                      </a>
                    ) : (
                      <p className="mt-1.5 text-[0.9375rem] text-mist-50">{row.value}</p>
                    )}
                    <p className="mt-1 text-2xs text-mist-100/35">{row.note}</p>
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.16} className="mt-6">
              <p className="font-mono text-2xs uppercase tracking-ultra text-mist-100/35">
                Follow ANVIX
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {socials.map((social) => {
                  const Icon = socialIcons[social.icon]
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target={social.href.startsWith('http') ? '_blank' : undefined}
                        rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                        aria-label={social.label}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-mist-100/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-azure-500/45 hover:bg-azure-500/[0.08] hover:text-azure-300"
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>

          {/* ---------------- Form ---------------- */}
          <Reveal delay={0.08}>
            <div className="relative overflow-hidden rounded-2xl border border-azure-500/20 bg-white/[0.022] p-6 shadow-card sm:p-8 lg:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-azure-500/55 to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(61,139,255,0.12),transparent_70%)] blur-2xl"
              />

              <div className="relative">
                <h3 className="font-display text-lg text-mist-50 sm:text-xl">
                  Start Your Project
                </h3>
                <p className="mt-2.5 body-md">
                  Share a few details and we will come back with next steps, an approach and a
                  timeline.
                </p>

                <form onSubmit={onSubmit} noValidate className="mt-8 space-y-1">
                  <div className="grid gap-1 sm:grid-cols-2">
                    <TextField
                      id="contact-name"
                      label="Name"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      value={form.name}
                      error={touched.name ? errors.name : undefined}
                      onChange={(e) => set('name', e.target.value)}
                      onBlur={() => blur('name')}
                    />
                    <TextField
                      id="contact-email"
                      label="Email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={form.email}
                      error={touched.email ? errors.email : undefined}
                      onChange={(e) => set('email', e.target.value)}
                      onBlur={() => blur('email')}
                    />
                    <TextField
                      id="contact-phone"
                      label="Phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="+91 00000 00000"
                      value={form.phone}
                      error={touched.phone ? errors.phone : undefined}
                      onChange={(e) => set('phone', e.target.value)}
                      onBlur={() => blur('phone')}
                    />
                    <TextField
                      id="contact-company"
                      label="Company"
                      autoComplete="organization"
                      placeholder="Company or brand name"
                      hint="Optional"
                      value={form.company}
                      error={touched.company ? errors.company : undefined}
                      onChange={(e) => set('company', e.target.value)}
                      onBlur={() => blur('company')}
                    />
                  </div>

                  <div className="grid gap-1 sm:grid-cols-2">
                    <SelectField
                      id="contact-projectType"
                      label="Project type"
                      required
                      options={projectTypes}
                      placeholder="Select a project type"
                      value={form.projectType}
                      error={touched.projectType ? errors.projectType : undefined}
                      onChange={(e) => set('projectType', e.target.value)}
                      onBlur={() => blur('projectType')}
                    />
                    <SelectField
                      id="contact-budgetRange"
                      label="Budget range"
                      required
                      options={budgetRanges}
                      placeholder="Select a budget range"
                      value={form.budgetRange}
                      error={touched.budgetRange ? errors.budgetRange : undefined}
                      onChange={(e) => set('budgetRange', e.target.value)}
                      onBlur={() => blur('budgetRange')}
                    />
                  </div>

                  <TextAreaField
                    id="contact-message"
                    label="Message"
                    required
                    rows={5}
                    placeholder="Describe your project, the problem you want to solve and any timeline you are working towards."
                    value={form.message}
                    error={touched.message ? errors.message : undefined}
                    onChange={(e) => set('message', e.target.value)}
                    onBlur={() => blur('message')}
                  />

                  <SubmitFeedback
                    state={status.state}
                    message={status.message}
                    successTitle="Enquiry sent"
                    onReset={status.reset}
                  />

                  <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xs text-2xs leading-relaxed text-mist-100/30">
                      Your details are used only to respond to this enquiry.
                    </p>
                    <SubmitButton
                      state={status.state}
                      label="Send Enquiry"
                      loadingLabel="Sending…"
                      className="sm:min-w-[12rem]"
                    />
                  </div>
                </form>

                <p className="mt-6 border-t border-white/[0.06] pt-5 text-2xs leading-relaxed text-mist-100/35">
                  Prefer email? Write to{' '}
                  <a
                    href={`mailto:${site.email}`}
                    className="text-azure-300 underline decoration-azure-500/40 underline-offset-4 transition-colors duration-300 hover:text-azure-200"
                  >
                    {site.email}
                  </a>{' '}
                  or call{' '}
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="text-azure-300 underline decoration-azure-500/40 underline-offset-4 transition-colors duration-300 hover:text-azure-200"
                  >
                    {site.phone}
                  </a>{' '}
                  /{' '}
                  <a
                    href={`tel:${site.phone2Href}`}
                    className="text-azure-300 underline decoration-azure-500/40 underline-offset-4 transition-colors duration-300 hover:text-azure-200"
                  >
                    {site.phone2}
                  </a>
                  .
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
