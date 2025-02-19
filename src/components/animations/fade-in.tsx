'use client'

import { ReactNode } from 'react'
import { motion, type MotionProps } from 'motion/react'

interface FadeInProps extends MotionProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  once?: boolean
}

export function FadeIn({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.5,
  once = true,
  ...props
}: FadeInProps) {
  const directions = {
    up: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 10 },
    },
    down: {
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
    },
    left: {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -10 },
    },
    right: {
      initial: { opacity: 0, x: 10 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 10 },
    },
  }

  const selectedDirection = directions[direction]

  return (
    <motion.div
      initial={selectedDirection.initial}
      whileInView={selectedDirection.animate}
      viewport={{ once }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      exit={selectedDirection.exit}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
