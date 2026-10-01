import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, AlertTriangle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import type { SubmitState } from '@/types'

export interface SubmitFeedbackProps {
  state: SubmitState
  message?: string
  onReset?: () => void
  successTitle?: string
  className?: string
}

/**
 * Shared success / error / loading panel rendered beneath every form so all
 * submission states look and behave identically across the site.
 */
export function SubmitFeedback({
  state,
  message,
  onReset,
  successTitle = 'Submitted successfully',
  className,
}: SubmitFeedbackProps) {
  return (
    <AnimatePresence mode="wait">
      {state === 'success' && (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          className={cn(
            'flex flex-col items-start gap-3 rounded-xl border border-azure-500/35 bg-azure-500/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between',
            className,
          )}
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-azure-400" />
            <div>
              <p className="font-display text-[0.9375rem] text-mist-50">{successTitle}</p>
              <p className="mt-1 body-md text-mist-100/60">
                {message ?? 'Thank you. Our team will get back to you shortly.'}
              </p>
            </div>
          </div>
          {onReset && (
            <Button type="button" variant="ghost" size="sm" onClick={onReset} className="shrink-0">
              <RotateCcw className="h-3.5 w-3.5" />
              Send another
            </Button>
          )}
        </motion.div>
      )}

      {state === 'error' && (
        <motion.div
          key="error"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="alert"
          className={cn(
            'flex items-start gap-3 rounded-xl border border-red-500/35 bg-red-500/[0.07] p-4',
            className,
          )}
        >
          <AlertTriangle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-red-400" />
          <div>
            <p className="text-[0.875rem] text-red-200">Something went wrong</p>
            <p className="mt-1 text-2xs text-red-200/70">
              {message ?? 'We could not submit your request. Please try again or email us directly.'}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function SubmitButton({
  state,
  label,
  loadingLabel = 'Sending…',
  className,
  onClick,
  type = 'submit',
  disabled,
}: {
  state: SubmitState
  label: string
  loadingLabel?: string
  className?: string
  onClick?: () => void
  type?: 'submit' | 'button'
  disabled?: boolean
}) {
  const loading = state === 'loading'

  return (
    <Button
      type={type}
      size="lg"
      sheen
      disabled={loading || disabled}
      onClick={onClick}
      className={className}
      aria-busy={loading}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  )
}

/** Small inline "sending" indicator for secondary actions. */
export function useAsyncState() {
  const [state, setState] = useState<SubmitState>('idle')
  const [message, setMessage] = useState<string>('')

  return {
    state,
    message,
    setState,
    setMessage,
    start: () => {
      setState('loading')
      setMessage('')
    },
    succeed: (msg: string) => {
      setState('success')
      setMessage(msg)
    },
    fail: (msg: string) => {
      setState('error')
      setMessage(msg)
    },
    reset: () => {
      setState('idle')
      setMessage('')
    },
  }
}
