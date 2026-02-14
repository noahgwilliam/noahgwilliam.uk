import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: "Blog | Noah Gwilliam",
	description: "My blog posts and articles",
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
					
					<div className="space-y-8">
						<article className="group">
							<Link
								href="#"
								className="block"
							>
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
				</div>
			</main>
		</div>
	)
}
