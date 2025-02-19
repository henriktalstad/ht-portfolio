'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedSectionProps extends MotionProps {
  children: ReactNode
  className?: string
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

export function AnimatedSection({ children, className = '', ...props }: AnimatedSectionProps) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  )
}

export function AnimatedItem({ children, className = '', ...props }: AnimatedSectionProps) {
  return (
    <motion.div
      variants={itemVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
