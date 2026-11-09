import { PostFeed } from '@/components/posts'
import { getBlogPosts } from '@/lib/utils'
import { alternates } from '@/lib/metadata'

export const metadata = {
  alternates: alternates('/'),
}

export default async function Page() {
  const posts = await getBlogPosts()
  return <PostFeed posts={posts} />
}
