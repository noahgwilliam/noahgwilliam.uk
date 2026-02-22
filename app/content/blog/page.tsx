import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { getBlogPosts } from "@/lib/sanity"

export const metadata: Metadata = {
	title: "Blog | Noah Gwilliam",
	description: "My blog posts and articles",
}

async function BlogPostsList() {
	const posts = await getBlogPosts()

	if (posts.length === 0) {
		return (
			<div className="space-y-8">
				<article className="group">
					<Link href="#" className="block">
						<h2 className="group-hover:opacity-70 transition-opacity text-2xl font-medium">
							TBC - First Blog Post
						</h2>
						<time className="text-sm text-muted-foreground block mt-1">
							Coming Soon
						</time>
						<p className="text-base text-muted-foreground text-pretty leading-relaxed mt-2">
							TBC - Blog post description will go here.
						</p>
					</Link>
				</article>
			</div>
		)
	}

	return (
		<div className="space-y-8">
			{posts.map((post) => (
				<article key={post.slug.current} className="group">
					<Link href={`/content/blog/${post.slug.current}`} className="block">
						<h2 className="group-hover:opacity-70 transition-opacity text-2xl font-medium">
							{post.title}
						</h2>
						<time className="text-sm text-muted-foreground block mt-1">
							{new Date(post.publishedAt).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</time>
						{post.excerpt && (
							<p className="text-base text-muted-foreground text-pretty leading-relaxed mt-2">
								{post.excerpt}
							</p>
						)}
					</Link>
				</article>
			))}
		</div>
	)
}

export default function BlogPage() {
	return (
		<div>
			<main className="max-w-4xl mx-auto px-6 py-8">
				<Link
					href="/content"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
				>
					<span>←</span>
					<span>Back to Content</span>
				</Link>

				<div className="mt-8 space-y-8">
					<h1 className="text-2xl font-medium">Blog</h1>
					
					<Suspense fallback={<div className="text-muted-foreground">Loading posts...</div>}>
						<BlogPostsList />
					</Suspense>
				</div>
			</main>
		</div>
	)
}
