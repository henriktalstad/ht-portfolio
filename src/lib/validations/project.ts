import { z } from 'zod'

export const projectSchema = z.object({
  _id: z.string(),
  _type: z.literal('project'),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  description: z.string(),
  mainImage: z.object({
    _type: z.literal('image'),
    asset: z.object({
      _ref: z.string(),
      _type: z.literal('reference'),
    }),
  }).optional(),
  technologies: z.array(z.string()),
  demoUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
})

export type Project = z.infer<typeof projectSchema>

export const projectsSchema = z.array(projectSchema)
