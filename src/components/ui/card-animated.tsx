'use client'

import { ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'

interface CardProps {
  title: string
  description: string
  image?: string
  link?: string
  tags?: string[]
  date?: string
  children?: ReactNode
  className?: string
}

export function Card({ title, description, image, link, tags, date, children, className = '' }: CardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  const background = useMotionTemplate`radial-gradient(
    300px circle at \${mouseX}px \${mouseY}px,
    var(--accent) 0%,
    transparent 80%
  )`

  const content = (
    <motion.div
      className={`group relative overflow-hidden rounded-lg border border-border bg-background p-6 transition-all hover:border-foreground/20 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-10"
        style={{ background }}
      />
      {image && (
        <div className="relative mb-6 aspect-[2/1] overflow-hidden rounded-md">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="space-y-2">
        <motion.h3 
          className="text-xl font-medium tracking-tight text-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        {date && (
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {new Date(date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </motion.p>
        )}
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {description}
        </motion.p>
      </div>
      {tags && tags.length > 0 && (
        <motion.div 
          className="mt-4 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {tags.map((tag, index) => (
            <motion.span
              key={tag}
              className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.3 + (index * 0.1) }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      )}
      {children}
    </motion.div>
  )

  if (link) {
    return (
      <Link href={link}>
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {content}
        </motion.div>
      </Link>
    )
  }

  return content
}
