import { Metadata } from 'next'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { About, aboutSchema } from '@/lib/validations/about'
import { urlForImage } from '@/sanity/lib/image'
import { Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import { format } from 'date-fns'
import { GithubContributions } from '@/components/github-contributions'
import { Newsletter } from '@/components/newsletter'
import { AnimatedSection, AnimatedItem } from '@/components/animations/animated-section'

export const metadata: Metadata = {
  title: 'About | Henrik Talstad',
  description: 'Learn more about Henrik Talstad and his work.',
}

export const revalidate = 60

const query = groq`*[_type == "about"][0]{
  _type,
  name,
  role,
  headline,
  profileImage,
  shortBio,
  longBio,
  skills,
  experience[]{
    company,
    role,
    startDate,
    endDate,
    description
  },
  education[]{
    institution,
    degree,
    startDate,
    endDate,
    description
  },
  socialLinks[]{
    platform,
    url
  }
}`

export default async function AboutPage() {
  const about = await client.fetch<About>(query)
  if (!about) return null

  const validatedAbout = aboutSchema.parse(about)

  return (
    <main className="container py-8 md:py-12">
      <AnimatedSection className="grid gap-12 md:grid-cols-[2fr,3fr]">
        {/* Profile Section */}
        <div className="space-y-6">
          {validatedAbout.profileImage && (
            <AnimatedItem className="overflow-hidden rounded-2xl">
              <Image
                src={urlForImage(validatedAbout.profileImage).width(400).height(400).url()}
                alt={validatedAbout.name}
                width={400}
                height={400}
                priority
                className="h-full w-full object-cover"
              />
            </AnimatedItem>
          )}
          <AnimatedItem>
            <div>
              <h1 className="mb-2 text-3xl font-bold">{validatedAbout.name}</h1>
              <p className="text-xl text-muted-foreground">{validatedAbout.role}</p>
            </div>
            <p className="text-lg">{validatedAbout.headline}</p>
          </AnimatedItem>
          
          {validatedAbout.socialLinks && validatedAbout.socialLinks.length > 0 && (
            <AnimatedItem className="flex gap-4">
              {validatedAbout.socialLinks.map((link) => {
                const Icon = {
                  github: Github,
                  linkedin: Linkedin,
                  email: Mail,
                }[link.platform] || Mail

                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={`Visit my ${link.platform} profile`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                )
              })}
            </AnimatedItem>
          )}

          {/* GitHub Contributions */}
          <AnimatedItem>
            <section aria-labelledby="contributions-heading" className="pt-4">
              <h2 id="contributions-heading" className="mb-4 text-2xl font-semibold">GitHub Activity</h2>
              <GithubContributions username="henriktalstad" />
            </section>
          </AnimatedItem>

          {/* Newsletter */}
          <AnimatedItem>
            <section aria-labelledby="newsletter-heading" className="pt-4">
              <Newsletter />
            </section>
          </AnimatedItem>
        </div>

        {/* Content Section */}
        <div className="space-y-12">
          {/* Bio */}
          <AnimatedItem>
            <section aria-labelledby="about-heading">
              <h2 id="about-heading" className="mb-4 text-2xl font-semibold">About Me</h2>
              <div className="prose prose-lg dark:prose-invert">
                <p>{validatedAbout.longBio || validatedAbout.shortBio}</p>
              </div>
            </section>
          </AnimatedItem>

          {/* Skills */}
          {validatedAbout.skills && validatedAbout.skills.length > 0 && (
            <AnimatedItem>
              <section aria-labelledby="skills-heading">
                <h2 id="skills-heading" className="mb-4 text-2xl font-semibold">Skills & Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {validatedAbout.skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full bg-secondary px-3 py-1 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </AnimatedItem>
          )}

          {/* Experience */}
          {validatedAbout.experience && validatedAbout.experience.length > 0 && (
            <AnimatedItem>
              <section aria-labelledby="experience-heading">
                <h2 id="experience-heading" className="mb-4 text-2xl font-semibold">Experience</h2>
                <div className="space-y-8">
                  {validatedAbout.experience.map((exp, index) => (
                    <div key={`${exp.company}-${index}`} className="group space-y-2">
                      <div>
                        <h3 className="font-medium text-lg">{exp.role}</h3>
                        <p className="text-muted-foreground">{exp.company}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(exp.startDate), 'MMM yyyy')}
                        {exp.endDate ? ` - ${format(new Date(exp.endDate), 'MMM yyyy')}` : ' - Present'}
                      </p>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </AnimatedItem>
          )}

          {/* Education */}
          {validatedAbout.education && validatedAbout.education.length > 0 && (
            <AnimatedItem>
              <section aria-labelledby="education-heading">
                <h2 id="education-heading" className="mb-4 text-2xl font-semibold">Education</h2>
                <div className="space-y-8">
                  {validatedAbout.education.map((edu, index) => (
                    <div key={`${edu.institution}-${index}`} className="group space-y-2">
                      <div>
                        <h3 className="font-medium text-lg">{edu.degree}</h3>
                        <p className="text-muted-foreground">{edu.institution}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(edu.startDate), 'MMM yyyy')}
                        {edu.endDate ? ` - ${format(new Date(edu.endDate), 'MMM yyyy')}` : ' - Present'}
                      </p>
                      <p className="text-muted-foreground">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </AnimatedItem>
          )}
        </div>
      </AnimatedSection>
    </main>
  )
}
