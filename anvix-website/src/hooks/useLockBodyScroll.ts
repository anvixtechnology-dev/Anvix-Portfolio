import { useEffect } from 'react'

/**
 * Locks body scroll while a modal / mobile menu is open, compensating for the
 * scrollbar so the layout does not shift.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbar = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [locked])
}

/** Adds or removes a class on <body> (e.g. to disable text selection). */
export function useBodyClass(className: string, active: boolean) {
  useEffect(() => {
    if (!active) return
    document.body.classList.add(className)
    return () => document.body.classList.remove(className)
  }, [className, active])
}
