import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently in view — used to highlight the
 * active navigation item.
 */
export function useActiveSection(ids: string[], offset = 140) {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    if (typeof window === 'undefined' || ids.length === 0) return

    const handler = () => {
      const position = window.scrollY + offset
      let current = ids[0] ?? ''

      let best = -Infinity

      // Pick the section nearest above the line, regardless of menu order.
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= position && top > best) {
          best = top
          current = id
        }
      }

      // Bottom of the page → last section
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
        current = ids[ids.length - 1] ?? current
      }

      setActive(current)
    }

    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [ids, offset])

  return active
}
