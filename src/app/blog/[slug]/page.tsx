import { notFound } from 'next/navigation'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { Post, postSchema } from '@/lib/validations/post'
import { format } from 'date-fns'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/image'
import { FadeIn } from '@/components/animations/fade-in'
import Image from 'next/image'

interface Props {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const query = groq`*[_type == "post" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    publishedAt,
    mainImage,
    content,
    "categories": categories[]->{ title },
    author->{
      name,
      image
    }
  }`
  
  const post = await client.fetch<Post>(query, { slug })
  if (!post) return null
  
  try {
    return postSchema.parse(post)
  } catch (error) {
    console.error('Post validation error:', error)
    return null
  }
}

export async function generateMetadata({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) return {}

  const ogImage = post.mainImage ? urlForImage(post.mainImage).width(1200).height(630).url() : undefined

  return {
    title: `${post.title} | Henrik Talstad`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <article className="container relative mx-auto max-w-3xl py-8 md:py-12">
      <FadeIn>
        <header className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <time dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
            </time>
            {post.categories && post.categories.length > 0 && (
              <>
                <span aria-hidden="true">•</span>
                <div className="flex gap-2">
                  {post.categories.map((category, index) => (
                    <span 
                      key={`${post._id}-${category.title}-${index}`}
                      className="rounded-full bg-secondary px-2 py-0.5 text-xs"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            {post.title}
          </h1>
          {post.author && (
            <div className="flex items-center justify-center gap-2">
              {post.author.image && (
                <Image
                  src={urlForImage(post.author.image).width(40).height(40).url()}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              )}
              <span className="text-muted-foreground">{post.author.name}</span>
            </div>
          )}
        </header>

        {post.mainImage && (
          <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={urlForImage(post.mainImage).width(1200).height(675).url()}
              alt={post.title}
              width={1200}
              height={675}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg prose-zinc dark:prose-invert mx-auto">
          <PortableText 
            value={post.content}
            components={{
              block: {
                h2: ({ children }) => <h2 className="scroll-m-20">{children}</h2>,
                h3: ({ children }) => <h3 className="scroll-m-20">{children}</h3>,
              },
              marks: {
                link: ({ children, value }) => (
                  <a 
                    href={value?.href} 
                    className="underline decoration-primary decoration-2 underline-offset-4 hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              },
            }}
          />
        </div>
      </FadeIn>
    </article>
  )
}

export async function generateStaticParams() {
  const query = groq`*[_type == "post"] { slug }`
  const posts = await client.fetch<Post[]>(query)
  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}
