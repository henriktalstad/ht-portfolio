import { Metadata } from 'next'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { Post, postsSchema } from '@/lib/validations/post'
import { format } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { urlForImage } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Blog | Henrik Talstad',
  description: 'Thoughts on software development, design, and technology.',
}

export const revalidate = 60

const query = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  _type,
  title,
  slug,
  publishedAt,
  mainImage,
  "categories": categories[]->{ title },
  excerpt
}`

export default async function BlogPage() {
  const posts = await client.fetch<Post[]>(query)
  const validatedPosts = postsSchema.parse(posts)

  return (
    <main className="container py-8 md:py-12">
      <FadeIn>
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Blog Posts</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Thoughts and insights about software development and technology
          </p>
        </header>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {validatedPosts.map((post) => (
            <Link 
              key={post._id} 
              href={`/blog/${post.slug.current}`}
              className="group focus-visible:outline-none"
              aria-label={`Read ${post.title}`}
            >
              <div className="h-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 group-hover:shadow-lg group-hover:shadow-primary/5 group-focus-visible:ring-2 group-focus-visible:ring-primary">
                {post.mainImage && (
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src={urlForImage(post.mainImage).width(800).height(450).url()}
                      alt={post.title}
                      width={800}
                      height={450}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      priority={false}
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
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
                  <h2 className="mb-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mb-4 line-clamp-2 text-muted-foreground">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center text-primary">
                    <span className="text-sm font-medium">Read article</span>
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </FadeIn>
    </main>
  )
}
