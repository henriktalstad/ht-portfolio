/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableTextBlock } from '@portabletext/types'

export interface SanityReference {
  _type: 'reference'
  _ref: string
  [key: string]: any
}

export interface SanityImage {
  _type: 'image'
  asset: SanityReference
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  [key: string]: any
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface Post {
  _type: 'post'
  _id: string
  title: string
  slug: SanitySlug
  publishedAt: string
  mainImage?: SanityImage
  content: PortableTextBlock[]
  categories: Array<{ title: string }>
  author: {
    name: string
    image?: SanityImage
  }
  readingTime: number
}

export interface Project {
  _type: 'project'
  _id: string
  title: string
  slug: SanitySlug
  image?: SanityImage
  summary: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
}

export interface Experience {
  position: string
  company: string
  startDate: string
  endDate?: string
  current: boolean
  description: PortableTextBlock[]
}

export interface Skill {
  category: string
  items: string[]
}

export interface SocialLink {
  platform: string
  url: string
}

export interface SEO {
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImage
}

export interface Education {
  degree: string
  fieldOfStudy: string
  institution: string
  startDate: string
  endDate?: string
  current: boolean
  description?: PortableTextBlock[]
}

export interface About {
  _type: 'about'
  _id: string
  name: string
  role: string
  headline: string
  profileImage?: SanityImage
  shortBio: string
  fullBio: PortableTextBlock[]
  skills: Skill[]
  experience: Experience[]
  education: Education[]
  email: string
  location: string
  availability: {
    status: string
    details?: string
  }
  socialLinks: SocialLink[]
  resumeFile?: {
    _type: 'file'
    asset: SanityReference
  }
  seo?: SEO
}
