import { createClient } from 'next-sanity'
import { sanityConfig } from '../config'

export const client = createClient(sanityConfig)

export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

export const getClient = (preview?: boolean) => (preview ? previewClient : client)
