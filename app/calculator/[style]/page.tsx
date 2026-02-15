import { Calculator } from "@/components/pizza/calculator"
import { Navigation } from "@/components/pizza/navigation"
import { PIZZA_STYLES, type PizzaStyle } from "@/lib/pizza-types"
import { client, urlFor } from "@/lib/sanity"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'

// --- פונקציית המטא-דאטה הדינמית ---
export async function generateMetadata({ params }: { params: Promise<{ style: string }> }): Promise<Metadata> {
  const { style } = await params;
  const styleKey = style as PizzaStyle;

  // שליפת נתוני סוג הפיצה מהסניטי לצורך תיאור ותמונה
  const sanityStyle = await client.fetch(`
    *[_type == "pizzaStyle" && slug.current == $slug][0]{
      name,
      description,
      image
    }
  `, { slug: style });

  // הגדרת השם שיוצג - לוקחים קודם מהקובץ המקומי כדי להבטיח עברית
  const pizzaNameHebrew = PIZZA_STYLES[styleKey]?.name || sanityStyle?.name || "פיצה";
  const displayDesc = sanityStyle?.description || `חשבו כמויות מדויקות והכינו ${pizzaNameHebrew} מושלמת בבית.`;

  // טיפול בתמונה לצורך תצוגה מקדימה בשיתופים (WhatsApp, Facebook וכו')
  let ogImage = "";
  try {
    if (sanityStyle?.image) {
      ogImage = urlFor(sanityStyle.image).url();
    }
  } catch (e) {
    console.error("Error generating OG image:", e);
  }

  return {
    // כאן הכותרת תופיע כ: "מתכון לפיצה נפוליטנית | Slice After Slice"
    title: `מתכון ל${pizzaNameHebrew} | Slice After Slice`,
    description: displayDesc,
    openGraph: {
      title: `איך מכינים ${pizzaNameHebrew}? מחשבון כמויות ומדריך`,
      description: displayDesc,
      images: ogImage ? [{ url: ogImage }] : [],
    }
  }
}

// --- הקומפוננטה של העמוד ---
export default async function CalculatorPage({ params }: { params: Promise<{ style: string }> }) {
  const { style } = await params;
  const styleKey = style as PizzaStyle;

  // בדיקה אם סוג הפיצה קיים במערכת
  if (!PIZZA_STYLES[styleKey]) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-right" dir="rtl">
      <Navigation />
      <div className="mt-8">
        {/* המחשבון מקבל את ה-Key (למשל 'neapolitan') אבל המטא-דאטה למעלה מציג עברית */}
        <Calculator selectedStyle={styleKey} />
      </div>
    </div>
  )
}