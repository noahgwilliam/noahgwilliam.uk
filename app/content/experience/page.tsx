import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { getExperiences } from "@/lib/sanity"

export const metadata: Metadata = {
	title: "Professional Experience | Noah Gwilliam",
	description: "My professional roles and experience",
}

async function ExperiencesList() {
	const experiences = await getExperiences()

	if (experiences.length === 0) {
		return (
			<div className="space-y-6">
				<article>
					<Link
						href="/content/experience/FlutterUKI"
						className="block hover:opacity-70 transition-opacity"
					>
						<h2 className="text-xl font-medium">Flutter UKI</h2>
						<p className="text-sm text-muted-foreground mt-1">Platform Engineer • 2023 - Present</p>
					</Link>
				</article>

				<article>
					<Link
						href="/content/experience/BAEDigitalIntelligence"
						className="block hover:opacity-70 transition-opacity"
					>
						<h2 className="text-xl font-medium">BAE Digital Intelligence</h2>
						<p className="text-sm text-muted-foreground mt-1">Previous Role • 2020 - 2023</p>
					</Link>
				</article>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			{experiences.map((exp) => (
				<article key={exp.slug.current}>
					<Link
						href={`/content/experience/${exp.slug.current}`}
						className="block hover:opacity-70 transition-opacity"
					>
						<h2 className="text-xl font-medium">{exp.company}</h2>
						<p className="text-sm text-muted-foreground mt-1">
							{exp.role} • {new Date(exp.startDate).getFullYear()} - {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
						</p>
						{exp.description && (
							<p className="text-base text-muted-foreground mt-2">{exp.description}</p>
						)}
					</Link>
				</article>
			))}
		</div>
	)
}

export default function ExperiencePage() {
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
					<h1 className="text-2xl font-medium">Professional Experience</h1>
					
					<Suspense fallback={<div className="text-muted-foreground">Loading experiences...</div>}>
						<ExperiencesList />
					</Suspense>
				</div>
			</main>
		</div>
	)
}
