import { cn } from '@/utils/cn'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useEscapeKey, useFocusTrap } from '@/hooks/useFocusTrap'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useCallback, useRef } from 'react'
import { EASE } from '@/utils/motion'

export interface ModalProps {
  open: boolean
  onClose: () => void
  labelledBy?: string
  children: React.ReactNode
  className?: string
  /** `panel` = centred dialog, `sheet` = right-hand drawer, `full` = wide stage */
  variant?: 'panel' | 'sheet' | 'full'
}

const variantClasses: Record<NonNullable<ModalProps['variant']>, string> = {
  panel: 'max-w-3xl rounded-2xl border border-azure-500/20 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)]',
  sheet: 'max-w-xl h-full rounded-l-2xl border-l border-azure-500/20 shadow-[-40px_0_120px_-40px_rgba(0,0,0,0.95)]',
  full: 'max-w-5xl max-h-[92vh] rounded-2xl border border-azure-500/20 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)]',
}

export function Modal({
  open,
  onClose,
  labelledBy,
  children,
  className,
  variant = 'panel',
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useLockBodyScroll(open)
  useEscapeKey(open, onClose)
  useFocusTrap(panelRef, open)

  const onBackdrop = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) onClose()
    },
    [onClose],
  )

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
        >
          <motion.div
            className="fixed inset-0 bg-ink-950/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            onClick={onBackdrop}
          />

          <motion.div
            ref={panelRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: variant === 'sheet' ? 0 : 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: variant === 'sheet' ? 0 : 24, scale: 0.99 }}
            transition={{ duration: 0.42, ease: EASE }}
            className={cn(
              'relative z-10 my-auto flex w-full flex-col overflow-hidden bg-ink-900/95 outline-none',
              variant !== 'sheet' && 'max-h-[92vh]',
              variantClasses[variant],
              className,
            )}
          >
            {/* Close control stays pinned while the body scrolls */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-4 top-4 z-30 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-ink-950/70 text-mist-100/70 backdrop-blur transition-colors duration-300 hover:border-azure-500/50 hover:text-azure-300"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="min-h-0 flex-1 overscroll-contain overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
