import { useCallback, useEffect, useState } from 'react'
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { IntroSequence, shouldPlayIntro } from '@/components/cinema/IntroSequence'
import { Hero } from '@/components/sections/Hero'
import { SplitShowcase } from '@/components/sections/SplitShowcase'
import { Manifesto } from '@/components/sections/Manifesto'
import { Stats } from '@/components/sections/Stats'
import { About } from '@/components/sections/About'
import { ServicesReel } from '@/components/sections/ServicesReel'
import { Team } from '@/components/sections/Team'
import { Projects } from '@/components/sections/Projects'
import { TechnologyStack } from '@/components/sections/TechnologyStack'
import { Process } from '@/components/sections/Process'
import { WhyAnvix } from '@/components/sections/WhyAnvix'
import { Contact } from '@/components/sections/Contact'
import { site } from '@/data/site'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { ScrollTrigger } from '@/lib/gsap'

/** Thin blue line tracking page progress — ties every scene together. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-azure-500"
    />
  )
}

export function Home() {
  useDocumentMeta({
    title: `${site.legalName} — ${site.tagline}`,
    description: site.description,
  })

  const [playIntro] = useState(shouldPlayIntro)
  const [introMounted, setIntroMounted] = useState(playIntro)
  const [ready, setReady] = useState(!playIntro)

  const handleReveal = useCallback(() => setReady(true), [])
  const handleComplete = useCallback(() => setIntroMounted(false), [])

  // Recalculate pinned scenes once fonts and the intro have settled.
  useEffect(() => {
    if (introMounted) return
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [introMounted])

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-clip">
        {introMounted && <IntroSequence onReveal={handleReveal} onComplete={handleComplete} />}
        <ScrollProgress />
        <Navbar />
        <main id="main">
          <Hero ready={ready} />
          <SplitShowcase />
          <Manifesto />
          <Stats />
          <About />
          <ServicesReel />
          <Team />
          <Projects />
          <TechnologyStack />
          <Process />
          <WhyAnvix />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
