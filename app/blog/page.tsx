import BlogServer from "@/components/pizza/blog-server"
import { Navigation } from "@/components/pizza/navigation"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'בלוג פיצה ומתכונים | Slice After Slice',
  description: 'מדריכים מעמיקים, סודות על קמחים, וכל מה שצריך לדעת כדי להכין פיצה מושלמת בבית.',
}

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter">הבלוג שלנו</h1>
      {/* הניווט שלך עדיין כאן, רק שהפעם הוא יוכל לעבור בין עמודים אמיתיים */}
      <Navigation />

      <main className="mt-8">
        <BlogServer />
      </main>
    </div>
  )
}