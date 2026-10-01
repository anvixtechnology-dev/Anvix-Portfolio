import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface UseCountUpOptions {
  to: number
  duration?: number
  /** Keep the "+" style prefix/suffix, e.g. 4+ */
  decimals?: number
  start?: boolean
}

/**
 * Counts from 0 → `to` with an ease-out curve once the element scrolls into view.
 * Returns the formatted value plus whether the animation has finished.
 */
export function useCountUp({ to, duration = 1800, start = true }: UseCountUpOptions) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start || !inView) return
    if (typeof window === 'undefined') return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(to)
      return
    }

    let frame = 0
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * to))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [to, duration, start, inView])

  return { ref, value, done: value === to }
}

/** Tracks a media query (used to switch timelines / nav behaviour). */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
