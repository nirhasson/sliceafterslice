import { Rescue } from "@/components/pizza/rescue"
import { Newsletter } from "@/components/pizza/newsletter"
import { SiteHeader } from "@/components/pizza/site-header"
import { SiteFooter } from "@/components/pizza/site-footer"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'תיקון טעויות בבצק, הצלת בצק | Slice After Slice',
  description: 'הבצק נדבק? לא תופח? המדריך המהיר לפתרון בעיות נפוצות בהכנת פיצה.',
}

export default function RescuePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      <SiteHeader />
      <div className="max-w-4xl w-full mx-auto px-6 flex-1">
        <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter">
          הצלת בצק
        </h2>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono mb-8">
          פתרון בעיות בזמן אמת
        </p>
        <Rescue />
        <div className="mt-12">
          <Newsletter />
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
