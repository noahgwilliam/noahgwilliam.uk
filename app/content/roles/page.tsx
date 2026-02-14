import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: "Roles | Noah Gwilliam",
	description: "My professional roles and experience",
}

export default function RolesPage() {
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
					<h1 className="text-2xl font-medium">Professional Roles</h1>
					
					<div className="space-y-6">
						<article>
							<Link
								href="/content/roles/FlutterUKI"
								className="block hover:opacity-70 transition-opacity"
							>
								<h2 className="text-xl font-medium">Flutter UKI</h2>
								<p className="text-sm text-muted-foreground mt-1">Platform Engineer • 2023 - Present</p>
							</Link>
						</article>

						<article>
							<Link
								href="/content/roles/BAEDigitalIntelligence"
								className="block hover:opacity-70 transition-opacity"
							>
								<h2 className="text-xl font-medium">BAE Digital Intelligence</h2>
								<p className="text-sm text-muted-foreground mt-1">Previous Role • 2020 - 2023</p>
							</Link>
						</article>
					</div>
				</div>
			</main>
		</div>
	)
}
