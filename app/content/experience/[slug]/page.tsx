import { notFound } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"
import { client } from "@/lib/sanity"
import type { Experience } from "@/lib/sanity"

export async function generateStaticParams() {
  try {
    const experiences = await client.fetch<Experience[]>('*[_type == "experience"]')
    
    // If no experiences in Sanity, return hardcoded ones
    if (experiences.length === 0) {
      return [
        { slug: 'FlutterUKI' },
        { slug: 'BAEDigitalIntelligence' },
      ]
    }
    
    return experiences.map((exp) => ({
      slug: exp.slug.current,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    // Return hardcoded fallback on error
    return [
      { slug: 'FlutterUKI' },
      { slug: 'BAEDigitalIntelligence' },
    ]
  }
}

async function getExperience(slug: string): Promise<Experience | null> {
  try {
    const query = `*[_type == "experience" && slug.current == $slug][0]`
    return await client.fetch<Experience>(query, { slug })
  } catch (error) {
    console.error('Error fetching experience:', error)
    return null
  }
}

async function ExperienceContent({ slug }: { slug: string }) {
  const experience = await getExperience(slug)

  if (!experience) {
    notFound()
  }

  return (
    <article className="mt-8">
      <h1 className="text-4xl font-medium mb-2">{experience.company}</h1>
      <p className="text-xl text-muted-foreground mb-8">
        {experience.role} • {new Date(experience.startDate).getFullYear()} - {experience.endDate ? new Date(experience.endDate).getFullYear() : 'Present'}
      </p>

      {experience.description && (
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          {experience.description}
        </p>
      )}

      {experience.content && (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap">{experience.content}</p>
        </div>
      )}
    </article>
  )
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div>
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Link
          href="/content/experience"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>←</span>
          <span>Back to Experience</span>
        </Link>

        <Suspense fallback={<div className="mt-8 text-muted-foreground">Loading...</div>}>
          <ExperienceContent slug={slug} />
        </Suspense>
      </main>
    </div>
  )
}
