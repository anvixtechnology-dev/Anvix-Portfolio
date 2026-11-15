import { useLayoutEffect, type DependencyList, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Shared cinematic easing — matches the Framer Motion EASE curve. */
export const CINEMA_EASE = 'expo.out'
export const CINEMA_INOUT = 'power4.inOut'

/** Media conditions used by every scroll scene, so they behave consistently. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const DESKTOP = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'
export const TABLET_UP = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'

/**
 * Runs GSAP setup scoped to `scope`, and reverts every tween / ScrollTrigger
 * it created when the component unmounts or `deps` change.
 *
 * The callback receives a `gsap.matchMedia()` instance: register animations
 * under `MOTION_OK` / `DESKTOP` / `TABLET_UP` so reduced-motion users and
 * small screens get the static layout automatically.
 */
export function useGsap(
  scope: RefObject<HTMLElement>,
  setup: (mm: gsap.MatchMedia, root: HTMLElement) => void,
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root) return
    const mm = gsap.matchMedia(root)
    setup(mm, root)
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export { gsap, ScrollTrigger }
