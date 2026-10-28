import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity' // וודא שהנתיב ל-client שלך נכון

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.sliceafterslice.co.il'
  const lastModified = new Date()

  // 1. רשימת העמודים הקבועים באתר
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/rescue`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/calculator/neapolitan`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/calculator/newyork`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/calculator/roman`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/calculator/newhaven`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/calculator/detroit`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/calculator/sicilian`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pizzerias`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    // Written in code, not in Sanity, so the query below doesn't find it
    { url: `${baseUrl}/blog/local-flour-guide`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
  ]

  // 2. משיכה דינמית של כל הכתבות מה-Sanity
  // השאילתה מושכת את ה-slug ואת תאריך העדכון האחרון של כל פוסט
  const query = `*[_type == "article" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`

  let dynamicPages: MetadataRoute.Sitemap = []

  try {
    const posts = await client.fetch(query)

    dynamicPages = posts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error)
  }

  return [...staticPages, ...dynamicPages]
}