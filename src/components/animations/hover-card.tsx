'use client'

import { ReactNode } from 'react'
import { motion, type MotionProps } from 'motion/react'

interface HoverCardProps extends MotionProps {
  children: ReactNode
  className?: string
}

export function HoverCard({ children, className = '', ...props }: HoverCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
