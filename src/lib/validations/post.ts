import { z } from 'zod'

export const postSchema = z.object({
  _id: z.string(),
  _type: z.literal('post'),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  publishedAt: z.string(),
  mainImage: z.object({
    _type: z.literal('image'),
    asset: z.object({
      _ref: z.string(),
      _type: z.literal('reference'),
    }),
  }),
  categories: z.array(z.object({
    title: z.string(),
  })).optional(),
  excerpt: z.string().optional(),
  content: z.array(z.any()),
  author: z.object({
    name: z.string(),
    image: z.object({
      _type: z.literal('image'),
      asset: z.object({
        _ref: z.string(),
        _type: z.literal('reference'),
      }),
    }).optional(),
  }).optional(),
})

export type Post = z.infer<typeof postSchema>

export const postsSchema = z.array(postSchema)

export const postQuerySchema = z.object({
  query: z.string(),
  params: z.record(z.any()).optional(),
})
