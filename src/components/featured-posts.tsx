import { motion } from 'framer-motion'
import { SanityNextImage } from './ui/image'
import type { Post } from '@/types/sanity'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { format } from 'date-fns'

interface FeaturedPostsProps {
  posts: Post[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="container py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
          <p className="max-w-[600px] text-muted-foreground">
            I write about web development, design, and my experiences as a
            developer. Here are my latest posts.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <motion.article
              key={post._id}
              variants={itemVariants}
              className="group relative space-y-4"
            >
              {post.mainImage && (
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="relative aspect-[2/1] block overflow-hidden rounded-lg"
                >
                  <SanityNextImage
                    image={post.mainImage}
                    alt={post.title}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              )}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <time dateTime={post.publishedAt}>
                    {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                  </time>
                  <span>·</span>
                  <span>{post.readingTime} min read</span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight">
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h3>
                {post.categories && post.categories.length > 0 && (
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    {post.categories.map((category, index) => (
                      <span key={category.title}>
                        {category.title}
                        {index < post.categories.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary"
          >
            View All Posts
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
