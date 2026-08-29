import { getAllTags, getBlogPosts, getPublishedSeries } from "@/lib/utils"

export const baseUrl = 'https://b128s.dev'

export default async function sitemap() {
  let blogs = (await getBlogPosts()).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let series = (await getPublishedSeries()).map((entry) => ({
    url: `${baseUrl}/series/${entry.slug}`,
    lastModified: entry.posts[0].metadata.publishedAt,
  }))

  let tags = (await getAllTags()).map((tag) => ({
    url: `${baseUrl}/tags/${tag.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  let routes = ['', '/blog', '/series', '/tags'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs, ...series, ...tags]
}
