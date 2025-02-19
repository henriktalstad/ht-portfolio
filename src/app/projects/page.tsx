import { Metadata } from 'next'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { Project, projectsSchema } from '@/lib/validations/project'
import Image from 'next/image'
import { FadeIn } from '@/components/animations/fade-in'
import { urlForImage } from '@/sanity/lib/image'
import { ExternalLink, Github } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Projects | Henrik Talstad',
  description: 'Explore my latest projects and work.',
}

export const revalidate = 3600

const query = groq`*[_type == "project"] | order(_createdAt desc) {
  _id,
  _type,
  title,
  slug,
  description,
  mainImage,
  technologies,
  demoUrl,
  repoUrl
}`

export default async function ProjectsPage() {
  const projects = await client.fetch<Project[]>(query)
  const validatedProjects = projectsSchema.parse(projects)

  return (
    <main className="container py-8 md:py-12">
      <FadeIn>
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Projects</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            A collection of my latest work and side projects
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {validatedProjects.map((project) => (
            <article
              key={project._id}
              className="group relative flex flex-col gap-4"
            >
              {project.mainImage && (
                <div className="relative aspect-[2/1] overflow-hidden rounded-lg">
                  <Image
                    src={urlForImage(project.mainImage).width(800).height(400).url()}
                    alt={project.title}
                    width={800}
                    height={400}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={false}
                  />
                </div>
              )}
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-xl font-medium tracking-tight">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={`${project._id}-${tech}-${index}`}
                        className="rounded-full bg-secondary px-3 py-1 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-4">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={`View source code for ${project.title}`}
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      <span>Source</span>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={`View live demo for ${project.title}`}
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      <span>Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </FadeIn>
    </main>
  )
}
