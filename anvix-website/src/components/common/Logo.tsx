import { cn } from '@/utils/cn'

interface LogoMarkProps {
  className?: string
  /** Renders "ANVIX" in the display typeface next to the mark. */
  withWordmark?: boolean
  stacked?: boolean
}

/**
 * The ANVIX mark: a faceted "A" monogram inside an orbital ring — drawn in
 * SVG so it stays crisp at any size and needs no image asset.
 */
export function LogoMark({ className, withWordmark = true, stacked = false }: LogoMarkProps) {
  const glyph = (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center',
        stacked ? 'h-10 w-10' : 'h-9 w-9',
        className,
      )}
    >
      <svg viewBox="0 0 48 48" fill="none" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="anvix-azure" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D9FF94" />
            <stop offset="0.45" stopColor="#B5FF36" />
            <stop offset="1" stopColor="#557F0D" />
          </linearGradient>
          <linearGradient id="anvix-midnight" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#1E1E1C" />
            <stop offset="1" stopColor="#080808" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="46" height="46" rx="12" fill="url(#anvix-midnight)" />
        <rect
          x="1"
          y="1"
          width="46"
          height="46"
          rx="12"
          stroke="url(#anvix-azure)"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        {/* faceted A monogram */}
        <path d="M24 12 L33 35 H28.6 L24 22.6 L19.4 35 H15 Z" fill="url(#anvix-azure)" />
        <path d="M24 12 L24 22.6 L19.4 35 H15 Z" fill="url(#anvix-azure)" fillOpacity="0.65" />
        <rect x="21.4" y="27.6" width="5.2" height="2" rx="1" fill="#B5FF36" fillOpacity="0.8" />
        <circle cx="24" cy="24" r="0" fill="none" />
        {/* orbital ring */}
        <ellipse
          cx="24"
          cy="24"
          rx="21"
          ry="8.4"
          stroke="#B5FF36"
          strokeOpacity="0.5"
          strokeWidth="1"
          transform="rotate(-24 24 24)"
        />
      </svg>
    </span>
  )

  if (!withWordmark) return glyph

  return (
    <span className={cn('inline-flex items-center', stacked ? 'flex-col gap-3' : 'gap-3')}>
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