import { motion } from 'framer-motion'
import { GithubContributions } from './github-contributions'
import { SanityNextImage } from './ui/image'
import type { About } from '@/types/sanity'
import Link from 'next/link'
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

interface HeroProps {
  about: About
}

export function Hero({ about }: HeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container relative py-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {about.name}
              </h1>
              <p className="text-xl text-muted-foreground">{about.role}</p>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="max-w-[600px] text-lg text-muted-foreground"
            >
              {about.shortBio}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex gap-4"
            >
              <Link
                href="https://github.com/henrikt-ma"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm ring-1 ring-border/50 transition-all hover:ring-primary/50 hover:shadow-md"
              >
                <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="sr-only">GitHub Profile</span>
              </Link>
              <Link
                href="https://linkedin.com/in/henrik-talstad"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm ring-1 ring-border/50 transition-all hover:ring-primary/50 hover:shadow-md"
              >
                <Linkedin className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="sr-only">LinkedIn Profile</span>
              </Link>
              <Link
                href="mailto:henrik.talstad@gmail.com"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm ring-1 ring-border/50 transition-all hover:ring-primary/50 hover:shadow-md"
              >
                <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="sr-only">Email</span>
              </Link>
            </motion.div>
          </div>
          {about.profileImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.1,
              }}
              className="relative aspect-square w-[280px] shrink-0 md:w-[320px]"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-2xl" />
              <div className="relative aspect-square overflow-hidden rounded-full border-2 border-border/50 bg-gradient-to-br from-background to-muted shadow-xl">
                <SanityNextImage
                  image={about.profileImage}
                  alt={about.name}
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-16 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              GitHub Activity
            </h2>
            <Link
              href="https://github.com/henrikt-ma"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              View Profile
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <GithubContributions username="henrikttalstad" />
        </motion.div>
      </div>
    </motion.section>
  )
}
