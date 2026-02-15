import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

// ---------- Sanity Client ----------

export const client = createClient({
  projectId: "xs013mwc",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // חשוב לפיתוח ולמניעת בעיות cache
})

// ---------- Image URL Builder ----------

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ---------- Types ----------

export interface SanityPizzaStyle {
  _id: string
  name: string
  slug: { current: string }
  description: string
  image: SanityImageSource
  hydration: number
  saltPercent: number
  yeastPercent: number
  oilPercent: number
  sugarPercent: number
  ballWeight: number
  kneading: {
    technique: string
    duration: string
    tips: string
  }
  proofing: {
    roomTemp: string
    coldProof: string
    tips: string
  }
  baking: {
    tempF: number
    tempC: number
    ovenType: string
    time: string
  }
  youtubeLinks: Array<{
    title: string
    url: string
    channel: string
  }>
}

export interface SanityArticle {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  mainImage?: SanityImageSource
  content: unknown[] // ⚠️ תואם לשם בסכמה שלך
  publishedAt?: string
  relatedPizzaStyle?: SanityPizzaStyle
}

// ---------- Queries ----------

export const pizzaStylesQuery = `
  *[_type == "pizzaStyle"] | order(name asc)
`

export const pizzaStyleBySlugQuery = `
  *[_type == "pizzaStyle" && slug.current == $slug][0]
`

export const articlesQuery = `
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug, // 👈 הוספנו את השדה הזה
    excerpt,
    content,
    publishedAt,
    mainImage,
    tags
  }
`

export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    excerpt,
    content,
    publishedAt,
    mainImage,
    tags,
    relatedPizzaStyle->
  }
`
