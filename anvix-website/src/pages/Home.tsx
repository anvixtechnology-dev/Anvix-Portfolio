import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { About } from '@/components/sections/About'
import { Team } from '@/components/sections/Team'
import { Projects } from '@/components/sections/Projects'
import { TechnologyStack } from '@/components/sections/TechnologyStack'
import { Process } from '@/components/sections/Process'
import { WhyAnvix } from '@/components/sections/WhyAnvix'
import { Careers } from '@/components/sections/Careers'
import { Contact } from '@/components/sections/Contact'
import { site } from '@/data/site'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

export function Home() {
  useDocumentMeta({
    title: `${site.legalName} — ${site.tagline}`,
    description: site.description,
  })

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Navbar />
      <main id="main">
        <Hero />
        <Stats />
        <About />
        <Team />
        <Projects />
        <TechnologyStack />
        <Process />
        <WhyAnvix />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
