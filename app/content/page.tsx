import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: "Content | Noah Gwilliam",
	description: "My professional experiences and roles",
}

export default function ContentIndexPage() {
	return (
		<div>
			<main className="max-w-4xl mx-auto px-6 py-8">
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
				>
					<span>←</span>
					<span>Home</span>
				</Link>
				<div className="space-y-12 mt-8">
					<section>
						<h1 className="text-2xl font-medium mb-6">Professional Experience</h1>
						
						<div className="space-y-8">
							<article className="group">
								<Link
									href="/content/roles/FlutterUKI"
									className="block"
								>
									<h2 className="group-hover:opacity-70 transition-opacity text-2xl font-medium">
										Flutter UKI
									</h2>
									<time className="text-sm text-muted-foreground block mt-1">
										Platform Engineer • 2023 - Present
									</time>
									<p className="text-base text-muted-foreground text-pretty leading-relaxed mt-2">
										Building and maintaining cloud infrastructure and platform services.
									</p>
								</Link>
							</article>

							<article className="group">
								<Link
									href="/content/roles/BAEDigitalIntelligence"
									className="block"
								>
									<h2 className="group-hover:opacity-70 transition-opacity text-2xl font-medium">
										BAE Digital Intelligence
									</h2>
									<time className="text-sm text-muted-foreground block mt-1">
										Previous Role • 2020 - 2023
									</time>
									<p className="text-base text-muted-foreground text-pretty leading-relaxed mt-2">
										Working on digital intelligence solutions and infrastructure.
									</p>
								</Link>
							</article>
						</div>
					</section>

					<section>
						<h1 className="text-2xl font-medium mb-6">Blog</h1>
						
						<div className="space-y-8">
							<article className="group">
								<Link
									href="/content/blog"
									className="block"
								>
									<h2 className="group-hover:opacity-70 transition-opacity text-2xl font-medium">
										View All Posts
									</h2>
									<p className="text-base text-muted-foreground text-pretty leading-relaxed mt-2">
										Read my latest thoughts and articles.
									</p>
								</Link>
							</article>
						</div>
					</section>
				</div>
			</main>
		</div>
	)
}
