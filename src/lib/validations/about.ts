import { z } from 'zod'

export const socialLinkSchema = z.object({
  platform: z.enum(['github', 'linkedin', 'email']),
  url: z.string().url(),
})

export const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  description: z.string(),
})

export const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  description: z.string(),
})

export const aboutSchema = z.object({
  _type: z.literal('about'),
  name: z.string(),
  role: z.string(),
  headline: z.string(),
  profileImage: z.object({
    _type: z.literal('image'),
    asset: z.object({
      _ref: z.string(),
      _type: z.literal('reference'),
    }),
  }).optional().nullable(),
  shortBio: z.string(),
  longBio: z.string().optional(),
  skills: z.array(z.string()).optional(),
  experience: z.array(experienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  socialLinks: z.array(socialLinkSchema).optional(),
})

export type About = z.infer<typeof aboutSchema>
export type SocialLink = z.infer<typeof socialLinkSchema>
export type Experience = z.infer<typeof experienceSchema>
export type Education = z.infer<typeof educationSchema>
