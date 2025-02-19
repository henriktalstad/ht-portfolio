import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { codeInput } from '@sanity/code-input'
import { schema } from './schema'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

interface SanityDocument {
  _type: string
  slug?: {
    current: string
  }
}

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    deskTool(),
    visionTool(),
    media(),
    codeInput(),
  ],
  document: {
    // For drafts implementation
    productionUrl: async (prev, context) => {
      const { document } = context as { document: SanityDocument }

      if (!document?.slug?.current) {
        return prev
      }

      const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'
      const prefix = document._type === 'blogPost' 
        ? '/blog' 
        : document._type === 'project'
        ? '/projects'
        : '/products'

      return `${baseUrl}${prefix}/${document.slug.current}`
    },
  },
})
