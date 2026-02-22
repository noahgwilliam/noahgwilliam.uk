import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: "BAE Digital Intelligence | Noah Gwilliam",
	description: "Previous role at BAE Digital Intelligence",
}

export default function BAEDigitalIntelligencePage() {
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

				<article className="mt-8 space-y-6">
					<header>
						<h1 className="text-3xl font-medium">BAE Systems Applied Intelligence</h1>
						<p className="text-lg text-muted-foreground mt-2">
							Platform Engineer • February 2021 - March 2023 • 2 years 2 months
						</p>
					</header>

					<div className="prose prose-gray max-w-none">
						<h2 className="text-2xl font-medium mt-8 mb-4">Overview</h2>
						<p className="text-muted-foreground leading-relaxed">
							Platform Engineer (DevOps) role focused on building and maintaining CI/CD infrastructure, containerization, and cloud-based solutions.
						</p>

						<h2 className="text-2xl font-medium mt-8 mb-4">Key Responsibilities</h2>
						<ul className="text-muted-foreground leading-relaxed space-y-3">
							<li><strong>CI/CD Pipelines:</strong> Designed and maintained Jenkins-based continuous integration and delivery pipelines</li>
							<li><strong>Containerization:</strong> Implemented Docker containerization strategies for application deployment</li>
							<li><strong>Infrastructure as Code:</strong> Managed infrastructure using Terraform for AWS environments</li>
							<li><strong>Container Orchestration:</strong> Administered Kubernetes clusters using Rancher platform</li>
							<li><strong>Cloud Infrastructure:</strong> Worked extensively with AWS services including ECS</li>
						</ul>

						<h2 className="text-2xl font-medium mt-8 mb-4">Technologies & Tools</h2>
						<p className="text-muted-foreground leading-relaxed">
							Jenkins, Docker, Terraform (IaC), AWS, Amazon ECS, Kubernetes (Rancher), Groovy, Java, Node.js, Bash, Python
						</p>
					</div>
				</article>
			</main>
		</div>
	)
}
