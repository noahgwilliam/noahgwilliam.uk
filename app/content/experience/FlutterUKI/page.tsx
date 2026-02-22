import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: "Flutter UKI | Noah Gwilliam",
	description: "Platform Engineer at Flutter UKI",
}

export default function FlutterUKIPage() {
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
						<h1 className="text-3xl font-medium">Flutter UKI</h1>
						<p className="text-lg text-muted-foreground mt-2">
							Platform Engineer (DevOps) • March 2023 - Present • Leeds, England (Hybrid)
						</p>
					</header>

					<div className="prose prose-gray max-w-none">
						<h2 className="text-2xl font-medium mt-8 mb-4">Overview</h2>
						<p className="text-muted-foreground leading-relaxed">
							Platform Engineer (DevOps) with low-level interests including Golang-made plugins and Kubernetes operators, working across Flutter UKI's brands including Paddy Power and Betfair.
						</p>

						<h2 className="text-2xl font-medium mt-8 mb-4">Key Responsibilities</h2>
						
						<h3 className="text-xl font-medium mt-6 mb-3">CI/CD Tooling</h3>
						<p className="text-muted-foreground leading-relaxed">
							Maintaining automation across Flutter UKI's brands, including the maintenance of self-hosted tooling such as GitHub runners (Ubuntu/Rocky) with internal tooling access. Written in CDK and hosted in AWS, with experience in Ansible and EC2 Image Builder for AMI creation.
						</p>
						<p className="text-muted-foreground leading-relaxed mt-2">
							Strong administrator understanding of two Jenkins ecosystems, including use of the Jenkins Kubernetes operator (hosted on-prem).
						</p>

						<h3 className="text-xl font-medium mt-6 mb-3">Event Streaming (Data in Transit)</h3>
						<p className="text-muted-foreground leading-relaxed">
							Strong administrator understanding of event streaming tools including Confluent Cloud, Confluent Platform, and Apache Kafka (on-prem).
						</p>

						<h3 className="text-xl font-medium mt-6 mb-3">Package Management</h3>
						<p className="text-muted-foreground leading-relaxed">
							Strong administrator understanding of package management tooling including two Artifactory services (AWS & on-prem), as well as Nexus. Led migration efforts from Nexus (Maven packages + metadata) to self-hosted Artifactory.
						</p>

						<h3 className="text-xl font-medium mt-6 mb-3">Secrets Management</h3>
						<p className="text-muted-foreground leading-relaxed">
							Former admin experience of HCP Vault. Enhanced the now internalized Vault plugin (Hydrant Plugin). Reference: <a href="https://github.com/PaddyPowerBetfair/vault-plugin-hydrant-pki" className="text-blue-600 hover:underline">github.com/PaddyPowerBetfair/vault-plugin-hydrant-pki</a>
						</p>

						<h3 className="text-xl font-medium mt-6 mb-3">Source Control Management</h3>
						<p className="text-muted-foreground leading-relaxed">
							Strong administrator understanding of self-hosted, on-prem GitLab and Bitbucket, as well as designing and creating automation for a large-scale GitHub organization.
						</p>

						<h3 className="text-xl font-medium mt-6 mb-3">Best Practices & Professional Development</h3>
						<p className="text-muted-foreground leading-relaxed">
							Enthusiastic about quality of life and best practices including high-quality documentation, security, and maintaining a clean backlog. Actively progressing professional skills, currently studying for the ILM3 qualification.
						</p>

						<h2 className="text-2xl font-medium mt-8 mb-4">Technologies & Tools</h2>
						<p className="text-muted-foreground leading-relaxed">
							AWS (CDK), Ansible, EC2, GitHub Actions, Jenkins, Kubernetes, Confluent (Cloud & Platform), Apache Kafka, Artifactory, Nexus, HCP Vault, GitLab, Bitbucket, GOCD, Selenium, WebPageTest, Confluence, Crucible, Chef Automation, Chef Supermarket, Groovy, Terraform
						</p>
					</div>
				</article>
			</main>
		</div>
	)
}
