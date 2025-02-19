'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import type { MotionProps } from 'motion/react'

interface AnimatedSectionProps extends MotionProps {
  children: ReactNode
  className?: string
}

export function AnimatedSection({ children, className = '', ...motionProps }: AnimatedSectionProps) {
  return (
    <motion.section 
      className={className}
      {...motionProps}
    >
      {children}
    </motion.section>
  )
}

export function AnimatedDiv({ children, className = '', ...motionProps }: AnimatedSectionProps) {
  return (
    <motion.div 
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}
