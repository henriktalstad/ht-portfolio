import { SanityImage } from '@/types/sanity'
import { urlForImage } from '@/sanity/lib/image'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'

export function getSanityImageUrl(image: SanityImage): ImageUrlBuilder{
  return urlForImage(image)
}
