import type { Metadata } from "next"
import Link from "next/link"
import { getExperiences, getBlogPosts } from "@/lib/sanity"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
	title: "Content | Noah Gwilliam",
	description: "My professional experiences and roles",
}

export default async function ContentIndexPage() {
	const experiences = await getExperiences(2)
	const blogPosts = await getBlogPosts(3)
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
							{experiences.length > 0 ? (
								<>
									{experiences.map((exp) => (
										<article key={exp._id} className="group">
											<Link
												href={`/content/experience/${exp.slug.current}`}
												className="block"
											>
												<h2 className="group-hover:opacity-70 transition-opacity text-2xl font-medium">
													{exp.company}
												</h2>
												<time className="text-sm text-muted-foreground block mt-1">
													{exp.role} • {exp.startDate} - {exp.endDate}
												</time>
												<p className="text-base text-muted-foreground text-pretty leading-relaxed mt-2">
													{exp.description}
												</p>
											</Link>
										</article>
									))}
								</>
							) : (
								<>
									<article className="group">
										<Link
											href="/content/experience/FlutterUKI"
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
											href="/content/experience/BAEDigitalIntelligence"
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
								</>
							)}

							<article className="group">
								<Link
									href="/content/experience"
									className="block"
								>
									<p className="text-base text-muted-foreground text-pretty leading-relaxed group-hover:opacity-70 transition-opacity">
										View all Professional Experiences
									</p>
								</Link>
							</article>
						</div>
					</section>

					<section>
						<h1 className="text-2xl font-medium mb-6">Blog</h1>
						
						<div className="space-y-8">
							{blogPosts.length > 0 ? (
								<>
									{blogPosts.map((post) => (
										<article key={post._id} className="group">
											<Link
												href={`/content/blog/${post.slug.current}`}
												className="block"
											>
												<h2 className="group-hover:opacity-70 transition-opacity text-2xl font-medium">
													{post.title}
												</h2>
												<time className="text-sm text-muted-foreground block mt-1">
													{new Date(post.publishedAt).toLocaleDateString('en-US', { 
														year: 'numeric', 
														month: 'long', 
														day: 'numeric' 
													})}
												</time>
												<p className="text-base text-muted-foreground text-pretty leading-relaxed mt-2">
													{post.excerpt}
												</p>
											</Link>
										</article>
									))}
								</>
							) : null}
							
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
