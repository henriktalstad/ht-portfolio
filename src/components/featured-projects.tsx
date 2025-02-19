import { motion } from 'framer-motion'
import { SanityNextImage } from './ui/image'
import type { Project } from '@/types/sanity'
import Link from 'next/link'
import { ArrowUpRight, Github } from 'lucide-react'
import { Badge } from './ui/badge'

interface FeaturedProjectsProps {
  projects: Project[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="container py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
          <p className="max-w-[600px] text-muted-foreground">
            Here are some of my favorite projects I&apos;ve worked on. Each one
            taught me something new and helped me grow as a developer.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
            >
              {project.image && (
                <div className="relative aspect-video overflow-hidden">
                  <SanityNextImage
                    image={project.image}
                    alt={project.title}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="space-y-4 p-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">{project.summary}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium hover:text-primary"
                    >
                      Live Demo
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium hover:text-primary"
                    >
                      GitHub
                      <Github className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
