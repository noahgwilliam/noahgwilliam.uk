import matter from "gray-matter"
import { cacheLife, cacheTag } from "next/cache"
import { readdir, readFile } from "fs/promises"
import path from "path"

const contentPath = path.join(process.cwd(), "content")

export interface PostMetadata {
	title: string
	timestamp: string
	description: string
	slug: string
	tags?: string
	published?: boolean
}

export interface Post extends PostMetadata {
	content: string
}

function filenameToSlug(filename: string): string {
	return filename.replace(".mdx", "")
}

function slugToFilename(slug: string): string {
	return path.join(contentPath, `${slug}.mdx`)
}

async function getContentFiles(): Promise<Array<{ name: string; path: string }>> {
	try {
		const files = await readdir(contentPath)
		return files
			.filter((file) => file.endsWith(".mdx"))
			.map((file) => ({
				name: file,
				path: path.join(contentPath, file),
			}))
	} catch {
		return []
	}
}

async function getFileContent(filePath: string): Promise<string> {
	return await readFile(filePath, "utf-8")
}

export async function getFirstPostSlug(): Promise<string | null> {
	"use cache"
	cacheTag("posts-index")
	cacheLife("max")

	const files = await getContentFiles()
	if (files.length === 0) {
		return null
	}

	return filenameToSlug(files[0].name)
}

export async function getAllPosts(): Promise<PostMetadata[]> {
	"use cache"
	cacheTag("posts-index")
	cacheLife("max")

	const files = await getContentFiles()

	const posts = await Promise.all(
		files.map(async (file) => {
			const fileContent = await getFileContent(file.path)
			const { data } = matter(fileContent)

			return {
				title: data.title,
				timestamp: data.timestamp,
				description: data.description,
				slug: filenameToSlug(file.name),
				tags: data.tags,
				published: data.published,
			} as PostMetadata
		}),
	)

	return posts
		.filter((post) => post.published !== false)
		.sort((a, b) => {
			const dateA = a.timestamp ? new Date(a.timestamp).getTime() : 0
			const dateB = b.timestamp ? new Date(b.timestamp).getTime() : 0
			return dateB - dateA
		})
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
	"use cache"
	cacheTag(`post-${slug}`)
	cacheLife("max")

	try {
		const filePath = slugToFilename(slug)
		const fileContent = await getFileContent(filePath)
		const { data, content } = matter(fileContent)

		return {
			title: data.title,
			timestamp: data.timestamp,
			description: data.description,
			slug,
			tags: data.tags,
			published: data.published,
			content,
		}
	} catch {
		return null
	}
}

export async function getNextPost(currentSlug: string): Promise<PostMetadata | null> {
	const posts = await getAllPosts()
	const currentIndex = posts.findIndex((post) => post.slug === currentSlug)

	if (currentIndex === -1 || currentIndex === posts.length - 1) {
		return null
	}

	return posts.at(currentIndex + 1) ?? null
}
