import { motion, type Variants } from 'framer-motion'
import { fadeUp, stagger } from '@/utils/motion'
import { cn } from '@/utils/cn'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
  /** Use `once` for sections that should not re-animate on scroll back. */
  amount?: number
}

/** Single-element scroll reveal. */
export function Reveal({ children, delay = 0, y = 22, className, amount = 0.2 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface RevealGroupProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  amount?: number
  as?: 'div' | 'ul' | 'ol'
}

/** Staggered container — children should be <RevealItem>. */
export function RevealGroup({
  children,
  className,
  staggerDelay = 0.08,
  amount = 0.15,
  as = 'div',
}: RevealGroupProps) {
  const MotionTag = motion[as] as typeof motion.div
  const variants: Variants = stagger(staggerDelay)

  return (
    <MotionTag
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}

export function RevealItem({
  children,
  className,
  index = 0,
}: {
  children: React.ReactNode
  className?: string
  index?: number
}) {
  return (
    <motion.div variants={fadeUp} custom={index} className={cn(className)}>
      {children}
    </motion.div>
  )
}

/** Numbered / labelled section divider used between major sections. */
export function SectionDivider({ label, className }: { label?: string; className?: string }) {
  return (
    <Reveal className={cn('container-anvix', className)}>
      <div className="flex items-center gap-6">
        <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/10" />
        {label && <span className="font-mono text-2xs uppercase tracking-ultra text-mist-100/30">{label}</span>}
        <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/10" />
      </div>
    </Reveal>
  )
}
