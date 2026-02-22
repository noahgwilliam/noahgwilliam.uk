import { notFound } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"
import { client } from "@/lib/sanity"
import type { BlogPost } from "@/lib/sanity"

export async function generateStaticParams() {
  try {
    const posts = await client.fetch<BlogPost[]>('*[_type == "blogPost"]')
    
    // Next.js 16 requires at least one entry
    if (posts.length === 0) {
      return [{ slug: 'placeholder' }]
    }
    
    return posts.map((post) => ({
      slug: post.slug.current,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return [{ slug: 'placeholder' }]
  }
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const query = `*[_type == "blogPost" && slug.current == $slug][0]`
    return await client.fetch<BlogPost>(query, { slug })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

async function BlogPostContent({ slug }: { slug: string }) {
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="mt-8">
      <h1 className="text-4xl font-medium mb-4">{post.title}</h1>
      
      <time className="text-sm text-muted-foreground block mb-8">
        {new Date(post.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>

      {post.excerpt && (
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          {post.excerpt}
        </p>
      )}

      {post.content && (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 flex gap-2 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div>
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Link
          href="/content/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>←</span>
          <span>Back to Blog</span>
        </Link>

        <Suspense fallback={<div className="mt-8 text-muted-foreground">Loading...</div>}>
          <BlogPostContent slug={slug} />
        </Suspense>
      </main>
    </div>
  )
}
