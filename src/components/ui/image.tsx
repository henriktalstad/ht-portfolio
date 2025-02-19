import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getSanityImageUrl } from '@/lib/image'
import { SanityImage } from '@/types/sanity'

interface SanityNextImageProps extends Omit<React.ComponentPropsWithoutRef<typeof Image>, 'src'> {
  image: SanityImage
  className?: string
}

export function SanityNextImage({
  image,
  className,
  alt,
  ...props
}: SanityNextImageProps) {
  return (
    <div className={cn('overflow-hidden', className)}>
      <Image
        className="h-full w-full object-cover"
        src={getSanityImageUrl(image).url()}
        alt={alt ?? 'Image'}
        {...props}
      />
    </div>
  )
}
