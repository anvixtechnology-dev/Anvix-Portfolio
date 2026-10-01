import { forwardRef, useId, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { AlertCircle, Check } from 'lucide-react'
import { cn } from '@/utils/cn'

/* ------------------------------------------------------------------ */
/* Shared field shell                                                  */
/* ------------------------------------------------------------------ */

interface FieldShellProps {
  label: string
  error?: string
  required?: boolean
  hint?: string
  className?: string
  children: (props: { id: string; describedBy: string | undefined; invalid: boolean }) => React.ReactNode
}

function FieldShell({ label, error, required, hint, className, children }: FieldShellProps) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = error ? errorId : hint ? hintId : undefined

  return (
    <div className={cn('w-full', className)}>
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span className="ml-1 text-azure-500/80">*</span>}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      <div className="mt-1.5 min-h-[1.125rem]">
        {error ? (
          <p id={errorId} role="alert" className="flex items-center gap-1.5 text-2xs text-red-400/90">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className="text-2xs text-mist-100/35">
            {hint}
          </p>
        ) : null}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Text input                                                          */
/* ------------------------------------------------------------------ */

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string
  error?: string
  valid?: boolean
  hint?: string
  containerClassName?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, error, valid, hint, required, containerClassName, className, ...props },
    ref,
  ) {
    return (
      <FieldShell label={label} error={error} required={required} hint={hint} className={containerClassName}>
        {({ id, describedBy, invalid }) => (
          <div className="relative">
            <input
              ref={ref}
              id={id}
              required={required}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              className={cn(
                'field',
                invalid && 'field-error',
                valid && !invalid && 'border-azure-500/40',
                'pr-10',
                className,
              )}
              {...props}
            />
            {valid && !invalid && (
              <Check className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-azure-400" />
            )}
          </div>
        )}
      </FieldShell>
    )
  },
)

/* ------------------------------------------------------------------ */
/* Textarea                                                            */
/* ------------------------------------------------------------------ */

export interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  hint?: string
  containerClassName?: string
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  function TextAreaField(
    { label, error, hint, required, containerClassName, className, rows = 5, ...props },
    ref,
  ) {
    return (
      <FieldShell
        label={label}
        error={error}
        required={required}
        hint={hint}
        className={containerClassName}
      >
        {({ id, describedBy, invalid }) => (
          <textarea
            ref={ref}
            id={id}
            rows={rows}
            required={required}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={cn('field resize-y', invalid && 'field-error', className)}
            {...props}
          />
        )}
      </FieldShell>
    )
  },
)

/* ------------------------------------------------------------------ */
/* Select                                                              */
/* ------------------------------------------------------------------ */

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  hint?: string
  options: readonly string[]
  placeholder?: string
  containerClassName?: string
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField(
    {
      label,
      error,
      hint,
      options,
      placeholder = 'Select an option',
      required,
      containerClassName,
      className,
      ...props
    },
    ref,
  ) {
    return (
      <FieldShell
        label={label}
        error={error}
        required={required}
        hint={hint}
        className={containerClassName}
      >
        {({ id, describedBy, invalid }) => (
          <select
            ref={ref}
            id={id}
            required={required}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={cn('field field-select', invalid && 'field-error', className)}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </FieldShell>
    )
  },
)
