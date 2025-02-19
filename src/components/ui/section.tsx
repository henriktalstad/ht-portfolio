'use client'

import { ReactNode } from 'react'
import { motion, type MotionProps } from 'motion/react'

interface SectionProps extends MotionProps {
  children: ReactNode
  className?: string
  title?: string
  description?: string
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Section({ children, className = '', title, description, ...props }: SectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`py-12 md:py-16 lg:py-20 ${className}`}
      {...props}
    >
      {(title || description) && (
        <div className="mx-auto max-w-2xl text-center mb-12">
          {title && (
            <motion.h2
              className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl"
              variants={fadeUpVariants}
              custom={0}
            >
              {title}
            </motion.h2>
          )}
          {description && (
            <motion.p
              className="mt-4 text-lg text-muted-foreground"
              variants={fadeUpVariants}
              custom={1}
            >
              {description}
            </motion.p>
          )}
        </div>
      )}
      <motion.div
        variants={fadeUpVariants}
        custom={2}
      >
        {children}
      </motion.div>
    </motion.section>
  )
}
