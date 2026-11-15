import { forwardRef, type CSSProperties } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'lime' | 'charcoal'

const faces: Record<Variant, Record<'front' | 'back' | 'top' | 'bottom' | 'side', string>> = {
  lime: {
    front: 'linear-gradient(100deg, #B5FF36 0%, #CAFF6B 55%, #A6EF2A 100%)',
    back: '#3A5709',
    top: '#DCFF9E',
    bottom: '#557F0D',
    side: '#74AA12',
  },
  charcoal: {
    front: 'linear-gradient(100deg, #1C1C1B 0%, #242422 60%, #171716 100%)',
    back: '#0C0C0C',
    top: '#2C2C2A',
    bottom: '#0A0A0A',
    side: '#141414',
  },
}

interface PrismProps {
  /** Length, height and depth in `em` — scale the whole object with font-size. */
  w?: number
  h?: number
  d?: number
  variant?: Variant
  className?: string
  style?: CSSProperties
  /** Draws a thin lime edge on the charcoal variant. */
  edge?: boolean
}

/**
 * A solid rectangular prism built from six CSS faces. Pure transforms — no
 * WebGL — so it stays cheap enough to animate at 60 FPS.
 */
export const Prism = forwardRef<HTMLDivElement, PrismProps>(function Prism(
  { w = 24, h = 3.2, d = 3.2, variant = 'lime', className, style, edge = false },
  ref,
) {
  const c = faces[variant]
  const border = edge ? '1px solid rgba(181,255,54,0.45)' : undefined
  const face = 'absolute left-1/2 top-1/2 backface-hidden'

  const box = (width: number, height: number, transform: string, background: string): CSSProperties => ({
    width: `${width}em`,
    height: `${height}em`,
    marginLeft: `${-width / 2}em`,
    marginTop: `${-height / 2}em`,
    transform,
    background,
    outline: border,
  })

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('relative preserve-3d will-transform', className)}
      style={{ width: `${w}em`, height: `${h}em`, ...style }}
    >
      <span className={face} style={box(w, h, `translateZ(${d / 2}em)`, c.front)} />
      <span className={face} style={box(w, h, `rotateY(180deg) translateZ(${d / 2}em)`, c.back)} />
      <span className={face} style={box(w, d, `rotateX(90deg) translateZ(${h / 2}em)`, c.top)} />
      <span className={face} style={box(w, d, `rotateX(-90deg) translateZ(${h / 2}em)`, c.bottom)} />
      <span className={face} style={box(d, h, `rotateY(90deg) translateZ(${w / 2}em)`, c.side)} />
      <span className={face} style={box(d, h, `rotateY(-90deg) translateZ(${w / 2}em)`, c.side)} />
    </div>
  )
})
