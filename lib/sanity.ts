import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
})

function isSanityConfigured(): boolean {
  return !!projectId && projectId !== 'placeholder'
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  content?: string
  tags?: string[]
}

export interface Experience {
  _id: string
  company: string
  role: string
  slug: { current: string }
  startDate: string
  endDate: string
  description: string
  content?: string
  order: number
}

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  if (!isSanityConfigured()) {
    return []
  }

  try {
    const query = `*[_type == "blogPost"] | order(publishedAt desc)${limit ? `[0...${limit}]` : ''}`
    return await client.fetch<BlogPost[]>(query)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getExperiences(limit?: number): Promise<Experience[]> {
  if (!isSanityConfigured()) {
    return []
  }

  try {
    const query = `*[_type == "experience"] | order(order asc)${limit ? `[0...${limit}]` : ''}`
    return await client.fetch<Experience[]>(query)
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return []
  }
}
