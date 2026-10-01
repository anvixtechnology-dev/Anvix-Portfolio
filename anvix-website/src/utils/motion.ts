/** Framer Motion presets — one source of truth for motion language. */

import type { Transition, Variants } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1] as const

export const transition = {
  default: { duration: 0.55, ease: EASE } satisfies Transition,
  fast: { duration: 0.3, ease: EASE } satisfies Transition,
  slow: { duration: 0.8, ease: EASE } satisfies Transition,
  spring: { type: 'spring', stiffness: 220, damping: 28, mass: 0.7 } satisfies Transition,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: (i as number) * 0.08 },
  }),
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
}

export const stagger = (staggerChildren = 0.09, delayChildren = 0.05): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

export const viewportOnce = { once: true, amount: 0.25 } as const
export const viewportSoft = { once: true, amount: 0.15 } as const
