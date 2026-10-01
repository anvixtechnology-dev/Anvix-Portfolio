import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { LogoMark } from '@/components/common/Logo'
import { Button } from '@/components/ui/Button'
import { navigation } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useEscapeKey } from '@/hooks/useFocusTrap'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/utils/cn'
import { EASE } from '@/utils/motion'

const SECTION_IDS = navigation.map((item) => item.id)

export function Navbar() {
  const scrolled = useScrolled(20)
  const active = useActiveSection(SECTION_IDS)
  const [menuOpen, setMenuOpen] = useState(false)

  useLockBodyScroll(menuOpen)
  useEscapeKey(menuOpen, () => setMenuOpen(false))

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-azure-500 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink-950"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[100] transition-all duration-500 ease-premium',
          scrolled ? 'py-2' : 'py-4 sm:py-5',
        )}
      >
        <div className="container-anvix">
          <nav
            aria-label="Primary"
            className={cn(
              'flex items-center justify-between gap-4 transition-all duration-500 ease-premium',
              scrolled
                ? 'h-14 rounded-full border border-white/[0.08] bg-ink-900/75 px-3.5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:h-16 sm:px-5'
                : 'h-16 rounded-2xl border border-transparent px-1 sm:px-2',
            )}
          >
            {/* Brand */}
            <a
              href="#home"
              className="group flex shrink-0 items-center gap-3 rounded-full py-1 pr-2"
              aria-label="ANVIX Technologies — home"
            >
              <LogoMark className="transition-transform duration-500 ease-premium group-hover:scale-[1.04]" />
            </a>

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 lg:flex">
              {navigation.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'relative block rounded-full px-4 py-2 text-[0.8125rem] font-medium tracking-tight transition-colors duration-300',
                        isActive ? 'text-azure-300' : 'text-mist-100/60 hover:text-mist-50',
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          transition={{ duration: 0.45, ease: EASE }}
                          className="absolute inset-0 -z-10 rounded-full border border-azure-500/25 bg-azure-500/[0.09]"
                        />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                sheen
                className="hidden sm:inline-flex"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Start a Project
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Button>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-mist-100/80 transition-colors duration-300 hover:border-azure-500/45 hover:text-azure-300 lg:hidden"
              >
                <Menu className="h-4.5 w-4.5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            className="fixed inset-0 z-[110] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <div
              className="absolute inset-0 bg-ink-950/90 backdrop-blur-xl"
              onClick={closeMenu}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-white/[0.08] bg-midnight-950/95"
            >
              <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
                <LogoMark />
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-mist-100/70 transition-colors duration-300 hover:border-azure-500/45 hover:text-azure-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <ul className="flex-1 overflow-y-auto px-6 py-8">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.055, duration: 0.45, ease: EASE }}
                    className="border-b border-white/[0.05] last:border-0"
                  >
                    <a
                      href={item.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between py-4 font-display text-xl text-mist-100/85 transition-colors duration-300 hover:text-azure-300"
                    >
                      {item.label}
                      <span className="font-mono text-2xs text-mist-100/25">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="border-t border-white/[0.07] px-6 py-6">
                <Button
                  fullWidth
                  size="lg"
                  sheen
                  onClick={() => {
                    closeMenu()
                    window.setTimeout(
                      () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
                      220,
                    )
                  }}
                >
                  Start a Project
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <p className="mt-4 text-center font-mono text-2xs uppercase tracking-wide2 text-mist-100/30">
                  Building Ideas. Creating Technology.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
