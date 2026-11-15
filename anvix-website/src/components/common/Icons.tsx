import { motion } from 'framer-motion'
import {
  Boxes,
  Code2,
  GitBranch,
  ShieldCheck,
  Sparkles,
  Workflow,
  Bot,
  Database,
  Cloud,
  Gauge,
  Megaphone,
  Mic,
  BarChart3,
  Search,
} from 'lucide-react'
import type { IconName } from '@/types'

/**
 * Monochrome line icons drawn in the brand's stroke weight — deliberately
 * neutral so azure is the only accent in the technology section.
 */
const icons: Record<IconName, typeof Code2> = {
  code: Code2,
  layers: Boxes,
  shield: ShieldCheck,
  gauge: Gauge,
  git: GitBranch,
  cloud: Cloud,
  database: Database,
  sparkles: Sparkles,
  bot: Bot,
  workflow: Workflow,
  megaphone: Megaphone,
  mic: Mic,
  chart: BarChart3,
  search: Search,
}

export function TechIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = icons[name] ?? Code2
  return <Icon className={className} strokeWidth={1.4} aria-hidden="true" />
}

/** Small numeric / index label used across cards. */
export function IndexBadge({ index, className }: { index: string; className?: string }) {
  return (
    <span className={`font-mono text-2xs tracking-ultra text-azure-500/80 ${className ?? ''}`}>
      {index}
    </span>
  )
}

/** Hairline azure corner accent used on premium cards. */
export function CornerAccent({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className ?? ''}`}>
      <span className="absolute left-0 top-0 h-px w-10 bg-gradient-to-r from-azure-500/70 to-transparent" />
      <span className="absolute left-0 top-0 h-10 w-px bg-gradient-to-b from-azure-500/70 to-transparent" />
    </span>
  )
}

/** Small azure dot used in lists. */
export function AccentDot({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-azure-500 ${className ?? ''}`}
    />
  )
}
