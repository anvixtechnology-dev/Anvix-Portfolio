import { useRef, useState } from 'react'
import { FileUp, Paperclip, X } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { TextAreaField, TextField, SelectField } from '@/components/ui/Field'
import { SubmitButton, SubmitFeedback, useAsyncState } from '@/components/common/SubmitFeedback'
import { experienceOptions } from '@/data/jobs'
import { api } from '@/utils/api'
import {
  MAX_RESUME_BYTES,
  RESUME_ACCEPT,
  formatBytes,
  isEmail,
  isNonEmpty,
  isPhone,
  isUrl,
  MIN_MESSAGE_LENGTH,
} from '@/utils/validation'
import { cn } from '@/utils/cn'
import type { JobApplication, JobOpening } from '@/types'

type FormState = Omit<JobApplication, 'resume'> & { resume: File | null }

const VALIDATED_KEYS = [
  'name',
  'email',
  'phone',
  'experience',
  'portfolio',
  'message',
  'resume',
] as const satisfies readonly (keyof FormState)[]

type ValidatedKey = (typeof VALIDATED_KEYS)[number]

interface ApplicationFormProps {
  job: JobOpening
  onClose: () => void
}

const emptyForm = (job: JobOpening): FormState => ({
  jobId: job.id,
  jobTitle: job.title,
  name: '',
  email: '',
  phone: '',
  experience: '',
  portfolio: '',
  resume: null,
  message: '',
})

/** Field rules live outside the component so they can be reused server-side. */
function validateField(key: ValidatedKey, value: unknown): string | undefined {
  const raw = typeof value === 'string' ? value : ''

  switch (key) {
    case 'name':
      return raw.trim().length >= 2 ? undefined : 'Please enter your full name.'
    case 'email':
      return isEmail(raw) ? undefined : 'Enter a valid email address.'
    case 'phone':
      return isPhone(raw) ? undefined : 'Enter a valid phone number.'
    case 'experience':
      return isNonEmpty(raw) ? undefined : 'Select your experience level.'
    case 'portfolio':
      return !isNonEmpty(raw) || isUrl(raw) ? undefined : 'Enter a valid URL (github.com/you).'
    case 'message':
      return raw.trim().length >= MIN_MESSAGE_LENGTH
        ? undefined
        : `Tell us a little more (at least ${MIN_MESSAGE_LENGTH} characters).`
    case 'resume':
      return value ? undefined : 'Please attach your resume.'
    default:
      return undefined
  }
}

export function ApplicationForm({ job, onClose }: ApplicationFormProps) {
  const [form, setForm] = useState<FormState>(() => emptyForm(job))
  const [errors, setErrors] = useState<Partial<Record<ValidatedKey, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<ValidatedKey, boolean>>>({})
  const [dragging, setDragging] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const status = useAsyncState()

  const set = <K extends ValidatedKey>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (touched[key]) {
      const error = validateField(key, value)
      setErrors((prev) => ({ ...prev, [key]: error }))
    }
  }

  const blur = (key: ValidatedKey) => {
    setTouched((prev) => ({ ...prev, [key]: true }))
    setErrors((prev) => ({ ...prev, [key]: validateField(key, form[key]) }))
  }

  const acceptFile = (file: File | undefined) => {
    if (!file) return
    setTouched((prev) => ({ ...prev, resume: true }))

    if (file.size > MAX_RESUME_BYTES) {
      setErrors((prev) => ({
        ...prev,
        resume: `File is too large (max ${formatBytes(MAX_RESUME_BYTES)}).`,
      }))
      return
    }
    if (!/\.(pdf|doc|docx)$/i.test(file.name)) {
      setErrors((prev) => ({ ...prev, resume: 'Only PDF, DOC or DOCX files are accepted.' }))
      return
    }

    setErrors((prev) => ({ ...prev, resume: undefined }))
    setForm((prev) => ({ ...prev, resume: file }))
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: Partial<Record<ValidatedKey, string>> = {}
    VALIDATED_KEYS.forEach((key) => {
      const error = validateField(key, form[key])
      if (error) nextErrors[key] = error
    })

    setTouched(
      VALIDATED_KEYS.reduce<Partial<Record<ValidatedKey, boolean>>>((acc, key) => {
        acc[key] = true
        return acc
      }, {}),
    )
    setErrors(nextErrors)

    const firstInvalid = VALIDATED_KEYS.find((key) => nextErrors[key])
    if (firstInvalid) {
      document.getElementById(`apply-${firstInvalid}`)?.focus()
      return
    }

    status.start()
    const result = await api.submitApplication(form)

    if (result.ok) {
      const firstName = form.name.split(' ')[0]
      status.succeed(
        `Thanks ${firstName} — your application for ${job.title} has been received. We will be in touch if your profile matches.`,
      )
      setForm(emptyForm(job))
      setTouched({})
    } else {
      status.fail(result.message ?? 'We could not submit your application. Please try again.')
    }
  }

  return (
    <Modal open onClose={onClose} variant="sheet" labelledBy="application-form-title">
      <div className="flex min-h-full flex-col">
        <header className="border-b border-white/[0.07] px-6 py-6 pr-16 sm:px-8">
          <p className="font-mono text-2xs uppercase tracking-ultra text-azure-400/85">Apply now</p>
          <h2 id="application-form-title" className="mt-3 font-display text-xl leading-snug text-mist-50">
            {job.title}
          </h2>
          <p className="mt-2 text-2xs text-mist-100/40">
            {job.type} · {job.mode} · {job.location}
          </p>
        </header>

        <form onSubmit={onSubmit} noValidate className="flex-1 space-y-1 px-6 py-6 sm:px-8">
          <div className="grid gap-1 sm:grid-cols-2">
            <TextField
              id="apply-name"
              label="Full name"
              required
              autoComplete="name"
              placeholder="Your name"
              value={form.name}
              error={touched.name ? errors.name : undefined}
              onChange={(e) => set('name', e.target.value)}
              onBlur={() => blur('name')}
            />
            <TextField
              id="apply-email"
              label="Email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              error={touched.email ? errors.email : undefined}
              onChange={(e) => set('email', e.target.value)}
              onBlur={() => blur('email')}
            />
            <TextField
              id="apply-phone"
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
            <SelectField
              id="apply-experience"
              label="Experience"
              required
              options={experienceOptions}
              placeholder="Select experience"
              value={form.experience}
              error={touched.experience ? errors.experience : undefined}
              onChange={(e) => set('experience', e.target.value)}
              onBlur={() => blur('experience')}
            />
          </div>

          <TextField
            id="apply-portfolio"
            label="Portfolio / GitHub"
            placeholder="https://github.com/you"
            hint="Optional — GitHub, portfolio or a live project link."
            value={form.portfolio}
            error={touched.portfolio ? errors.portfolio : undefined}
            onChange={(e) => set('portfolio', e.target.value)}
            onBlur={() => blur('portfolio')}
          />

          {/* Resume upload */}
          <div className="w-full">
            <span className="field-label">
              Resume<span className="ml-1 text-azure-500/80">*</span>
            </span>
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragging(false)
                acceptFile(e.dataTransfer.files?.[0])
              }}
              className={cn(
                'rounded-xl border border-dashed p-5 transition-colors duration-300',
                dragging
                  ? 'border-azure-500/70 bg-azure-500/[0.07]'
                  : errors.resume
                    ? 'border-red-500/50 bg-red-500/[0.04]'
                    : 'border-white/[0.12] bg-ink-950/40 hover:border-azure-500/35',
              )}
            >
              <input
                ref={fileInput}
                id="apply-resume"
                type="file"
                accept={RESUME_ACCEPT}
                className="sr-only"
                onChange={(e) => {
                  acceptFile(e.target.files?.[0])
                  e.target.value = ''
                }}
              />

              {form.resume ? (
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-azure-500/30 bg-azure-500/[0.08] text-azure-300">
                    <Paperclip className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.875rem] text-mist-50">{form.resume.name}</p>
                    <p className="mt-0.5 font-mono text-2xs text-mist-100/40">
                      {formatBytes(form.resume.size)} · ready to send
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => fileInput.current?.click()}
                      className="rounded-md px-2.5 py-1.5 font-mono text-2xs uppercase tracking-wide2 text-mist-100/50 transition-colors duration-300 hover:text-azure-300"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, resume: null }))
                        setErrors((prev) => ({ ...prev, resume: undefined }))
                      }}
                      aria-label="Remove attached resume"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-mist-100/40 transition-colors duration-300 hover:text-red-400"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 py-2 text-center">
                  <FileUp className="h-5 w-5 text-azure-500/70" />
                  <div>
                    <p className="text-[0.875rem] text-mist-100/75">
                      Drag &amp; drop your resume, or{' '}
                      <button
                        type="button"
                        onClick={() => fileInput.current?.click()}
                        className="text-azure-300 underline decoration-azure-500/40 underline-offset-4 transition-colors duration-300 hover:text-azure-200"
                      >
                        browse files
                      </button>
                    </p>
                    <p className="mt-1.5 font-mono text-2xs text-mist-100/35">
                      PDF, DOC or DOCX · up to {formatBytes(MAX_RESUME_BYTES)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-1.5 min-h-[1.125rem]">
              {errors.resume ? (
                <p role="alert" className="text-2xs text-red-400/90">
                  {errors.resume}
                </p>
              ) : (
                <p className="text-2xs text-mist-100/30">Attach your latest resume — PDF preferred.</p>
              )}
            </div>
          </div>

          <TextAreaField
            id="apply-message"
            label="Message"
            required
            rows={4}
            placeholder="Tell us about yourself, what you have built and why this role interests you."
            value={form.message}
            error={touched.message ? errors.message : undefined}
            onChange={(e) => set('message', e.target.value)}
            onBlur={() => blur('message')}
          />

          <SubmitFeedback
            state={status.state}
            message={status.message}
            successTitle="Application received"
            onReset={status.reset}
          />

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xs text-2xs leading-relaxed text-mist-100/30">
              By applying you agree we may store your details for recruitment purposes.
            </p>
            <SubmitButton
              state={status.state}
              label="Submit Application"
              loadingLabel="Submitting…"
              className="sm:min-w-[13rem]"
            />
          </div>
        </form>
      </div>
    </Modal>
  )
}
