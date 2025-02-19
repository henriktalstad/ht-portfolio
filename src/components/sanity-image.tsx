'use client'

import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import type { Image as SanityImageType } from 'sanity'

interface SanityImageProps {
  image: SanityImageType
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function SanityImage({
  image,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = '(min-width: 768px) 42rem, 100vw',
}: SanityImageProps) {
  const imageUrl = urlForImage(image).url()

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      quality={90}
      fill={!width || !height}
      blurDataURL={urlForImage(image).width(50).quality(20).blur(50).url()}
      placeholder="blur"
    />
  )
}
