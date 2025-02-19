/**
 * Global animation variants and transitions for consistent animations across components
 */

import type { MotionProps } from 'motion/react'

export const fadeIn: MotionProps['variants'] = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
}

export const fadeInScale: MotionProps['variants'] = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

export const stagger: MotionProps['variants'] = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const quickTransition = {
  duration: 0.2,
  ease: [0.25, 0.1, 0.25, 1],
}

export const buttonTapScale = {
  scale: 0.98,
  transition: {
    duration: 0.1,
  },
}

export const linkHover = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: 'easeInOut',
  },
}

export const slideIn: MotionProps['variants'] = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
}

export const containerVariants: MotionProps['variants'] = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

export const itemVariants: MotionProps['variants'] = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}
