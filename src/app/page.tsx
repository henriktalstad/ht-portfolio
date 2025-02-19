import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ArrowUpRight } from 'lucide-react'
import { getClient } from '@/sanity/lib/client'
import { homeQuery } from '@/lib/sanity.queries'
import { getSanityImageUrl } from '@/lib/image'
import { AnimatedSection, AnimatedDiv } from '@/components/home/animated-section'
import { containerVariants, fadeIn, stagger } from '@/lib/animations'
import type { About, Project, Post } from '@/types/sanity'
import { GithubContributions } from '@/components/github-contributions'
import { Suspense } from 'react'
import { Newsletter } from '@/components/newsletter'
import { motion } from 'framer-motion'
export const revalidate = 3600

interface HomeData {
  about: About
  featuredProjects: Project[]
  latestPosts: Post[]
}

async function getHomeData(): Promise<HomeData> {
  const data = await getClient().fetch(homeQuery)
  return data
}

export default async function Home() {
  const { about, featuredProjects, latestPosts } = await getHomeData()

  const projects = featuredProjects.map((project) => ({
    _id: project._id,
    title: project.title,
    slug: project.slug.current,
    description: project.summary,
    technologies: project.technologies,
    imageUrl: getSanityImageUrl(project.image).url(),
  }))

  const posts = latestPosts.map((post) => ({
    _id: post._id,
    title: post.title,
    slug: post.slug.current,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    imageUrl: getSanityImageUrl(post.mainImage).url(),
  }))

  return (
    <div className="container-lg">
      {/* Hero Section */}
      <AnimatedSection
        className="py-24 md:py-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <AnimatedDiv variants={fadeIn} className="max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {about.name}
          </h1>
          <p className="text-xl text-muted-foreground md:text-2xl">
            {about.headline}
          </p>
        </AnimatedDiv>
      </AnimatedSection>

      {/* Featured Projects */}
      <AnimatedSection
        className="mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <AnimatedDiv
          className="mb-12 flex items-center justify-between"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Link
            href="/projects"
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </AnimatedDiv>

        <AnimatedDiv
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
        >
          {projects.map((project) => (
            <motion.article
              key={project._id}
              className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
              variants={fadeIn}
            >
              {project.imageUrl && (
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                <p className="mb-4 text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech: string) => (
                    <span
                      key={tech}
                      className="rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatedDiv>
      </AnimatedSection>

      {/* Latest Posts */}
      <AnimatedSection
        className="mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <AnimatedDiv
          className="mb-12 flex items-center justify-between"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold">Latest Posts</h2>
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            View all posts
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </AnimatedDiv>

        <AnimatedDiv
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
        >
          {posts.map((post) => (
            <motion.article
              key={post._id}
              className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
              variants={fadeIn}
            >
              {post.imageUrl && (
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <time className="text-sm text-muted-foreground">
                  {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                </time>
                <h3 className="mb-2 mt-2 text-xl font-bold">{post.title}</h3>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </AnimatedDiv>
      </AnimatedSection>

      {/* GitHub Contributions */}
      <AnimatedSection
        className="mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <AnimatedDiv
          className="mb-12 flex items-center justify-between"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold">GitHub Activity</h2>
        </AnimatedDiv>

        <Suspense fallback={<div>Loading...</div>}>
          <GithubContributions username="henriktalstad" />
        </Suspense>
      </AnimatedSection>

      {/* Newsletter Section */}
      <AnimatedSection
        className="mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <Newsletter />
      </AnimatedSection>
    </div>
  )
}
