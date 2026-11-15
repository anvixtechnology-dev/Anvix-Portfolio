import { forwardRef, type CSSProperties } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'accent' | 'charcoal'

const faces: Record<Variant, Record<'front' | 'back' | 'top' | 'bottom' | 'side', string>> = {
  accent: {
    front: 'linear-gradient(100deg, #3D8BFF 0%, #6FA9FF 55%, #2F7BF0 100%)',
    back: '#102C60',
    top: '#A9CBFF',
    bottom: '#163F88',
    side: '#1B54B3',
  },
  charcoal: {
    front: 'linear-gradient(100deg, #13234A 0%, #182B57 60%, #101E40 100%)',
    back: '#09142F',
    top: '#1D3363',
    bottom: '#081129',
    side: '#0E1A3A',
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
  /** Draws a thin blue edge on the charcoal variant. */
  edge?: boolean
}

/**
 * A solid rectangular prism built from six CSS faces. Pure transforms — no
 * WebGL — so it stays cheap enough to animate at 60 FPS.
 */
export const Prism = forwardRef<HTMLDivElement, PrismProps>(function Prism(
  { w = 24, h = 3.2, d = 3.2, variant = 'accent', className, style, edge = false },
  ref,
) {
  const c = faces[variant]
  const border = edge ? '1px solid rgba(61,139,255,0.45)' : undefined
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
