import { type SchemaTypeDefinition } from 'sanity'
import { blogPost } from './schemas/blog-post'
import { product } from './schemas/product'
import project from './schemas/project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPost, product, project],
}
