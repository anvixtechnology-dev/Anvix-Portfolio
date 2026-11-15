import { cn } from '@/utils/cn'

interface SplitCharsProps {
  text: string
  /** Class applied to each character span (the animation target). */
  charClassName?: string
  className?: string
  /** Mask each word so characters rise out of an invisible baseline. */
  mask?: boolean
}

/**
 * Splits a string into individually animatable characters while keeping the
 * readable text available to assistive technology via `aria-label`.
 * Words stay unbroken so lines wrap naturally on small screens.
 */
export function SplitChars({ text, charClassName, className, mask = true }: SplitCharsProps) {
  const words = text.split(' ')
  return (
    <span aria-label={text} role="text" className={cn('inline', className)}>
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} aria-hidden="true" className="inline-block whitespace-nowrap">
          <span className={cn('inline-block', mask && 'overflow-hidden pb-[0.04em] -mb-[0.04em]')}>
            {Array.from(word).map((char, ci) => (
              <span key={ci} data-char className={cn('inline-block will-transform', charClassName)}>
                {char}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}
