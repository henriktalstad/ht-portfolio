import { groq } from 'next-sanity'

export const homeQuery = groq`{
  "about": *[_type == "about"][0] {
    name,
    role,
    headline,
    shortBio,
    profileImage
  },
  "featuredProjects": *[_type == "project"] | order(_createdAt desc)[0...3] {
    _id,
    title,
    slug,
    "image": image.asset->url,
    summary,
    technologies
  },
  "latestPosts": *[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    "categories": categories[]->{ title },
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180)
  }
}`

export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    "image": image.asset->url,
    summary,
    technologies,
    githubUrl,
    liveUrl
  }
`

export const projectQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "image": image.asset->url,
    description,
    technologies,
    githubUrl,
    liveUrl
  }
`

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    "categories": categories[]->{ title },
    "author": author->{ name, image },
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180)
  }
`

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    content,
    "categories": categories[]->{ title },
    "author": author->{ name, image },
    "readingTime": round(length(pt::text(content)) / 5 / 180)
  }
`

export const aboutQuery = groq`
  *[_type == "about"][0] {
    _id,
    name,
    role,
    headline,
    profileImage,
    shortBio,
    fullBio,
    skills[] {
      category,
      items
    },
    experience[] {
      position,
      company,
      startDate,
      endDate,
      current,
      description
    },
    email,
    location,
    availability {
      status,
      details
    },
    socialLinks[] {
      platform,
      url
    },
    resumeFile,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`
