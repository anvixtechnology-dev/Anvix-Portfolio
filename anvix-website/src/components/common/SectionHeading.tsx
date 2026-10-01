import { motion } from 'framer-motion'
import { fadeUp, transition, viewportSoft } from '@/utils/motion'
import { cn } from '@/utils/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
  /** Adds the short azure rule above the eyebrow. */
  rule?: boolean
  as?: 'h2' | 'h3'
}

/**
 * Consistent section header: eyebrow → heading → supporting copy.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  rule = true,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportSoft}
      transition={transition.default}
      className={cn(
        'flex flex-col',
        centered ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      {eyebrow && (
        <div className={cn('flex items-center gap-3', centered && 'justify-center')}>
          {rule && <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-azure-500/80 to-transparent" />}
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}

      <Tag className={cn('mt-5 display-lg text-balance', centered && 'max-w-3xl')}>{title}</Tag>

      {description && (
        <p className={cn('mt-6 body-lg max-w-2xl text-pretty', centered && 'mx-auto')}>{description}</p>
      )}
    </motion.div>
  )
}
