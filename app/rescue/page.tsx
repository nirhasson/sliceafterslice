import { Navigation } from "@/components/pizza/navigation"
import { Rescue } from "@/components/pizza/rescue"
import { Newsletter } from "@/components/pizza/newsletter" // ייבוא הניוזלטר
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: תיקון טעויות בבצק, הצלת בצק| Slice After Slice',
description: 'הבצק נדבק? לא תופח? המדריך המהיר לפתרון בעיות נפוצות בהכנת פיצה.',
}

export default function RescuePage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            {/* צמצמנו את mb-8 ל-mb-2 כדי שהכותרת המשנה תתקרב */}
            <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter text-foreground">
                הצלת בצק: פתרונות לבעיות נפוצות בבצק פיצה
            </h1>

            {/* צמצמנו את mt-6 ל-mt-0 ושינינו ל-mb-8 כדי להרחיק מהניווט */}
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono mb-8">
                פתרון בעיות בזמן אמת
            </p>

            <Navigation />

            <main className="mt-8">
                <Rescue />
            </main>

            {/* הוספת הניוזלטר בתחתית */}
            <div className="mt-12">
                <Newsletter />
            </div>

            <footer className="mt-12 pt-8 border-t-2 border-primary/20 text-xs font-mono text-center opacity-50">
                SLICE AFTER SLICE • RESCUE PROTOCOL
            </footer>
        </div>
    )
}