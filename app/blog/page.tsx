import BlogServer from "@/components/pizza/blog-server"
import { SiteHeader } from "@/components/pizza/site-header"
import { SiteFooter } from "@/components/pizza/site-footer"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מגזין פיצה ומתכונים | Slice After Slice',
  description: 'מדריכים מעמיקים, סודות על קמחים, וכל מה שצריך לדעת כדי להכין פיצה מושלמת בבית.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      <SiteHeader />
      <div className="max-w-4xl w-full mx-auto px-6 flex-1">
        <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter">
          המגזין שלנו
        </h2>
        <BlogServer />
      </div>
      <SiteFooter />
    </div>
  )
}
