import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-premium disabled:cursor-not-allowed disabled:opacity-55 whitespace-nowrap'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-azure-sheen text-ink-950 shadow-[0_16px_40px_-18px_rgba(181,255,54,0.75)] hover:shadow-[0_20px_52px_-16px_rgba(181,255,54,0.85)] hover:brightness-[1.06] active:scale-[0.985]',
  secondary:
    'border border-white/12 bg-white/[0.04] text-mist-50 hover:border-azure-500/45 hover:bg-white/[0.07] active:scale-[0.985]',
  outline:
    'border border-azure-500/45 text-azure-300 hover:border-azure-400 hover:bg-azure-500/[0.09] active:scale-[0.985]',
  ghost: 'text-mist-100/70 hover:text-azure-300',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-[0.8125rem]',
  md: 'h-11 px-6 text-[0.875rem]',
  lg: 'h-[3.25rem] px-8 text-[0.9375rem]',
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  /** Adds the animated sheen sweep on hover (primary variant). */
  sheen?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = 'primary',
    size = 'md',
    fullWidth,
    sheen = false,
    type = 'button',
    children,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {sheen && variant === 'primary' && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <span className="absolute -inset-y-6 -left-1/3 w-1/3 -skew-x-12 bg-white/35 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 group-hover/btn:animate-sheen" />
        </span>
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  )
})
