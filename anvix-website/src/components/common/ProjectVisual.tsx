import { cn } from '@/utils/cn'

/**
 * Branded, abstract project artwork rendered entirely in SVG/CSS.
 *
 * Real screenshots should replace these by setting `project.image` — the card
 * then renders a lazily loaded <img> instead.
 */
export function ProjectVisual({
  variant,
  className,
  label,
}: {
  variant: 'dashboard' | 'mobile' | 'planning' | 'reference'
  className?: string
  label?: string
}) {
  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden bg-midnight-900/60',
        className,
      )}
      aria-label={label}
      role="img"
    >
      <div className="absolute inset-0 bg-[radial-gradient(85%_70%_at_20%_0%,rgba(61,139,255,0.12),transparent_68%)]" />
      <div className="absolute inset-0 grid-lines opacity-30" />

      {variant === 'dashboard' && <DashboardArt />}
      {variant === 'mobile' && <MobileArt />}
      {variant === 'planning' && <PlanningArt />}
      {variant === 'reference' && <ReferenceArt />}

      {/* Base fade into the card */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-950/85 to-transparent" />
    </div>
  )
}

/* ---------------- Dashboard ---------------- */

function DashboardArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <div className="w-full max-w-sm rounded-lg border border-white/10 bg-ink-950/70 p-3 shadow-2xl backdrop-blur-sm">
        {/* Window chrome */}
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-azure-500/50" />
        </div>
        {/* Stat blocks */}
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded border border-white/[0.07] bg-white/[0.03] p-2">
              <div className="h-1 w-8 rounded-full bg-white/10" />
              <div
                className="mt-2 h-2 rounded-full bg-azure-sheen"
                style={{ width: `${60 - i * 12}%` }}
              />
            </div>
          ))}
        </div>
        {/* Chart */}
        <div className="mt-2 flex h-16 items-end gap-1.5 rounded border border-white/[0.07] bg-white/[0.02] p-2">
          {[38, 62, 45, 80, 55, 92, 68, 100, 74, 88, 60, 96].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-[2px] bg-gradient-to-t from-azure-700/35 to-azure-400/70"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        {/* Rows */}
        <div className="mt-2 space-y-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-4 w-4 shrink-0 rounded-full bg-white/[0.06]" />
              <span className="h-1 flex-1 rounded-full bg-white/[0.09]" style={{ maxWidth: `${85 - i * 18}%` }} />
              <span className="h-3 w-8 shrink-0 rounded-full bg-azure-500/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------------- Mobile ---------------- */

function MobileArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-5 p-8">
      {/* Rear phone */}
      <div className="hidden h-40 w-24 -translate-y-3 rotate-[-7deg] rounded-xl border border-white/10 bg-ink-950/70 p-1.5 shadow-xl backdrop-blur-sm sm:block">
        <div className="h-full rounded-lg border border-white/[0.06] bg-white/[0.02] p-1.5">
          <div className="h-2 w-8 rounded-full bg-azure-500/30" />
          <div className="mt-2 space-y-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-1 rounded-full bg-white/10" style={{ width: `${90 - i * 12}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Front phone */}
      <div className="h-48 w-28 rotate-[3deg] rounded-2xl border border-azure-500/25 bg-ink-950/85 p-1.5 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] backdrop-blur-sm">
        <div className="relative flex h-full flex-col rounded-xl border border-white/[0.07] bg-midnight-900/60 p-2">
          <span className="absolute left-1/2 top-1 h-1 w-6 -translate-x-1/2 rounded-full bg-white/15" />
          <div className="mt-3 h-8 rounded-md border border-azure-500/25 bg-azure-500/[0.09] p-1.5">
            <div className="h-1 w-8 rounded-full bg-azure-300/60" />
            <div className="mt-1.5 h-1 w-12 rounded-full bg-white/12" />
          </div>
          <div className="mt-2 space-y-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-white/[0.07]" />
                <span className="h-1 flex-1 rounded-full bg-white/10" style={{ maxWidth: `${95 - i * 15}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-auto grid grid-cols-4 gap-1 rounded-md bg-white/[0.03] p-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-3 rounded-[3px] bg-white/[0.06]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- Planning / canvas ---------------- */

function PlanningArt() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 grid-lines opacity-45" />

      <svg
        viewBox="0 0 400 240"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="plan-fill" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#3D8BFF" stopOpacity="0.2" />
            <stop offset="1" stopColor="#3D8BFF" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="plan-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#A9CBFF" />
            <stop offset="1" stopColor="#3D8BFF" />
          </linearGradient>
        </defs>

        {/* Plot boundary with dimensions */}
        <rect
          x="70"
          y="40"
          width="260"
          height="160"
          stroke="url(#plan-stroke)"
          strokeWidth="1.4"
          fill="url(#plan-fill)"
        />
        {/* Dimension lines */}
        <line x1="70" y1="28" x2="330" y2="28" stroke="#3D8BFF" strokeOpacity="0.5" strokeWidth="1" />
        <line x1="70" y1="23" x2="70" y2="33" stroke="#3D8BFF" strokeOpacity="0.5" />
        <line x1="330" y1="23" x2="330" y2="33" stroke="#3D8BFF" strokeOpacity="0.5" />
        <line x1="56" y1="40" x2="56" y2="200" stroke="#3D8BFF" strokeOpacity="0.5" />
        <line x1="51" y1="40" x2="61" y2="40" stroke="#3D8BFF" strokeOpacity="0.5" />
        <line x1="51" y1="200" x2="61" y2="200" stroke="#3D8BFF" strokeOpacity="0.5" />

        {/* Rooms */}
        <rect x="78" y="48" width="110" height="72" stroke="url(#plan-stroke)" strokeWidth="1" fill="#3D8BFF" fillOpacity="0.08" />
        <rect x="196" y="48" width="126" height="72" stroke="url(#plan-stroke)" strokeWidth="1" fill="#3D8BFF" fillOpacity="0.05" />
        <rect x="78" y="128" width="90" height="64" stroke="url(#plan-stroke)" strokeWidth="1" fill="#3D8BFF" fillOpacity="0.05" />
        <rect x="176" y="128" width="146" height="64" stroke="url(#plan-stroke)" strokeWidth="1" fill="#3D8BFF" fillOpacity="0.08" />

        {/* Door arcs */}
        <path d="M188 120 a12 12 0 0 1 12 12" stroke="#3D8BFF" strokeOpacity="0.55" strokeWidth="1" />
        <path d="M168 128 a12 12 0 0 0 -12 12" stroke="#3D8BFF" strokeOpacity="0.55" strokeWidth="1" />

        {/* Selection handles */}
        {[
          [78, 48],
          [188, 48],
          [78, 120],
          [188, 120],
        ].map(([cx, cy]) => (
          <rect key={`${cx}-${cy}`} x={cx - 3} y={cy - 3} width="6" height="6" fill="#3D8BFF" />
        ))}

        {/* Room labels */}
        <text x="133" y="88" textAnchor="middle" fill="#E6ECFA" fillOpacity="0.55" fontSize="9" fontFamily="monospace" letterSpacing="1">
          HALL
        </text>
        <text x="259" y="88" textAnchor="middle" fill="#E6ECFA" fillOpacity="0.4" fontSize="9" fontFamily="monospace" letterSpacing="1">
          BEDROOM
        </text>
        <text x="123" y="164" textAnchor="middle" fill="#E6ECFA" fillOpacity="0.4" fontSize="9" fontFamily="monospace" letterSpacing="1">
          KITCHEN
        </text>
        <text x="249" y="164" textAnchor="middle" fill="#E6ECFA" fillOpacity="0.55" fontSize="9" fontFamily="monospace" letterSpacing="1">
          LIVING
        </text>
        <text x="200" y="22" textAnchor="middle" fill="#3D8BFF" fillOpacity="0.7" fontSize="8" fontFamily="monospace" letterSpacing="1">
          40'
        </text>
        <text x="46" y="124" textAnchor="middle" fill="#3D8BFF" fillOpacity="0.7" fontSize="8" fontFamily="monospace" letterSpacing="1" transform="rotate(-90 46 124)">
          30'
        </text>
      </svg>

      {/* Toolbar */}
      <div className="absolute left-4 top-1/2 flex -translate-y-1/2 flex-col gap-1.5 rounded-lg border border-white/10 bg-ink-950/70 p-1.5 backdrop-blur-sm">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn('h-4 w-4 rounded-[3px]', i === 0 ? 'bg-azure-500/45' : 'bg-white/[0.08]')}
          />
        ))}
      </div>
    </div>
  )
}

/* ---------------- Reference / content ---------------- */

function ReferenceArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <div className="w-full max-w-[17rem] rounded-lg border border-white/10 bg-ink-950/70 p-4 shadow-2xl backdrop-blur-sm">
        <div className="h-2 w-20 rounded-full bg-azure-sheen" />
        <div className="mt-3.5 space-y-2">
          {[100, 92, 96, 78, 88, 64, 90, 82, 95, 70].map((w, i) => (
            <div
              key={i}
              className={cn(
                'h-1 rounded-full',
                i % 4 === 0 ? 'bg-azure-500/30' : 'bg-white/[0.10]',
              )}
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[0, 1].map((i) => (
            <div key={i} className="rounded border border-white/[0.07] bg-white/[0.02] p-2">
              <div className="h-6 rounded bg-azure-500/10" />
              <div className="mt-1.5 h-1 w-10 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
