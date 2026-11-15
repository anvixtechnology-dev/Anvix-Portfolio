import { cn } from '@/utils/cn'

interface LogoMarkProps {
  className?: string
  /** Renders "ANVIX" in the display typeface next to the mark. */
  withWordmark?: boolean
  stacked?: boolean
}

/** Transparent-background ANVIX mark (ribbon "A" with arrow). */
export const LOGO_SRC = '/assets/images/anvix-logo.png'

/**
 * The ANVIX mark, optionally paired with the "ANVIX / Technologies" wordmark.
 */
export function LogoMark({ className, withWordmark = true, stacked = false }: LogoMarkProps) {
  const glyph = (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center',
        stacked ? 'h-12 w-12' : 'h-11 w-11',
        className,
      )}
    >
      <img
        src={LOGO_SRC}
        alt={withWordmark ? '' : 'ANVIX Technologies'}
        width={256}
        height={256}
        decoding="async"
        className="h-full w-full object-contain"
      />
    </span>
  )

  if (!withWordmark) return glyph

  return (
    <span className={cn('inline-flex items-center', stacked ? 'flex-col gap-3' : 'gap-2.5')}>
      {glyph}
      <span className={cn('flex flex-col leading-none', stacked ? 'items-center' : 'items-start')}>
        <span
          className={cn(
            'font-display font-semibold tracking-tight text-mist-50',
            stacked ? 'text-base' : 'text-[0.95rem] sm:text-base',
          )}
        >
          ANVIX
        </span>
        <span className="mt-1 font-mono text-[0.5rem] uppercase tracking-ultra text-azure-400/85">
          Technologies
        </span>
      </span>
    </span>
  )
}
