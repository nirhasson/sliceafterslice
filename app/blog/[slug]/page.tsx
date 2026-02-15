import { client } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"
import { Navigation } from "@/components/pizza/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import urlBuilder from "@sanity/image-url"

// 1. הגדרת ה-URL Builder (קריטי!)
const builder = urlBuilder(client)
const urlFor = (source: any) => source ? builder.image(source).url() : "/placeholder.svg"

const FULL_FLOUR_GUIDE = `
      <p>הסוד לפיצה מצוינת מתחיל הרבה לפני התנור - הכל מתחיל בבחירת הקמח הנכון. בעולם הקמח, לא כל הקמחים נבראו שווים, ובחירת הקמח שלכם תשפיע באופן משמעותי על המרקם, הטעם והמראה של הקרום.</p>

      <h2>מדוע החלבון חשוב</h2>
      <p>תכולת החלבון בקמח היא הגורם המכריע ביותר בקביעת מאפייני הבצק שלכם. כאשר מערבבים קמח עם מים, החלבונים (בעיקר גלוטנין וגליאדין) נקשרים זה לזה ויוצרים את הגלוטן - הרשת האלסטית שנותנת לבצק את המבנה, הגמישות והיכולת להחזיק את בועות האוויר שנוצרות בתהליך התפיחה.</p>
      
      <p>קמח עם תכולת חלבון גבוהה יותר יפתח רשת גלוטן חזקה יותר, מה שמביא לבצק יותר גמיש וקרום עם "לעיסה" (chew). מאידך, קמח עם פחות חלבון יוצר קרום יותר רך ושביר. כל סגנון פיצה דורש איזון שונה של תכונות אלו.</p>
      
      <div class="bg-muted p-6 rounded-lg my-6">
        <h3 class="font-bold text-lg mb-4">מדריך מהיר לבחירת קמח לפי סגנון פיצה:</h3>
        <ul class="list-disc pr-6 space-y-3 text-sm">
          <li><strong>פיצה נפוליטנית / רומית:</strong> 11-12.5% חלבון (קמח Tipo 00) - לקרום רך, אוורירי ועדין</li>
          <li><strong>פיצה ניו יורקית / ניו הייבן:</strong> 12-13% חלבון (קמח לחם או קמח לכל מטרה) - לקרום עם לעיסה מאוזנת</li>
          <li><strong>דיפ-דיש / סיציליאנית:</strong> 13-14% חלבון (קמח לחם גלוטן גבוה) - לבצקים עבים ועמידים</li>
          <li><strong>פוקאצ'ה / פיצה ביאנקה:</strong> 11-12% חלבון - לבצק נפוח ורך במיוחד</li>
        </ul>
      </div>

      <h2>Tipo 00: תקן הזהב האיטלקי</h2>
      <p>קמח Tipo 00 הוא לב ליבה של הפיצה הנפוליטנית האותנטית. השם "00" מתייחס לרמת הטחינה - זהו הקמח הדק ביותר שאפשר למצוא, כמעט כמו אבקת טלק למגע. הטחינה העדינה הזו אינה משפיעה רק על המרקם - היא משנה את אופן ההתנהגות של הבצק.</p>

      <p>החלקיקים העדינים יותר של Tipo 00 יכולים לספוג מים בצורה אחידה ויעילה יותר, מה שמוביל להידרציה טובה יותר ולבצק חלק במיוחד. זה גם מאפשר תפיחה מהירה יותר ויוצר את המבנה האוורירי המיוחד של קרום נפוליטני - פנים רך עם קורניצ'ונה (שוליים) מנופחת ופריכה.</p>

      <img src="/images/blog-pizza-dough.jpg" alt="בצק פיצה טרי" class="my-6" />

      <h3>איך להשתמש ב-Tipo 00</h3>
      <p>בצק עשוי מ-Tipo 00 מתנהג קצת אחרת מקמח לחם רגיל. הוא רך יותר, פחות אלסטי, וקל יותר למתוח. זה אידיאלי לפיצות דקות במיוחד שצריכות להיאפות במהירות בטמפרטורות גבוהות מאוד (400-500°C בתנור עצים). אם אתם אופים בתנור ביתי רגיל, שקלו לערבב Tipo 00 עם קמח לחם לתוצאות טובות יותר.</p>

      <h2>קמח לחם אמריקאי: סוס העבודה</h2>
      <p>קמח לחם (Bread Flour) עם 12-14% חלבון הוא הבחירה המועדפת על אפיות ביתיות רבות בארה"ב ובעולם. זהו קמח רב-תכליתי שעובד מצוין עם מגוון רחב של סגנונות - מניו יורק ועד ניו הייבן.</p>

      <p>תכולת החלבון הגבוהה יותר יוצרת קרום עם "לעיסה" נעימה - לא קשה, אלא גמיש ומתמשך. זה מאפשר לבצק להחזיק טופינגים כבדים יותר מבלי להתמוטט, ויוצר מבנה שמתאים לאפייה בטמפרטורות נמוכות יותר (250-280°C) לזמן ארוך יותר.</p>

      <div class="bg-primary/5 border-r-4 border-primary p-6 my-6">
        <h3 class="font-bold text-lg mb-3">💡 טיפ מקצועי: ערבוב קמחים</h3>
        <p class="mb-3">אחד הסודות הכי שמורים של אפיות פיצה מקצועיות הוא ערבוב קמחים. זה מאפשר לכם לשלוט במדויק על תכונות הבצק ולהתאים אותו בדיוק לטעם האישי שלכם.</p>
        <p class="font-medium">תערובות מומלצות:</p>
        <ul class="list-disc pr-6 mt-2 space-y-2">
          <li><strong>50% Tipo 00 + 50% קמח לחם:</strong> שילוב מושלם של רכות ומבנה - מצוין לתנורים ביתיים</li>
          <li><strong>70% קמח לחם + 30% קמח מלא:</strong> מוסיף טעם עמוק ומורכב</li>
          <li><strong>80% Tipo 00 + 20% סולת דורום:</strong> מוסיף צבע זהוב ומרקם מיוחד</li>
        </ul>
      </div>

      <h2>קמח לכל מטרה: האופציה הזמינה</h2>
      <p>אם אין לכם גישה לקמח לחם או Tipo 00, קמח לכל מטרה (All-Purpose Flour) עם 10-12% חלבון עדיין יכול לתת תוצאות טובות. זה לא יהיה אותו הדבר בדיוק, אבל עם הטכניקות הנכונות - הידרציה גבוהה יותר, זמן תפיחה ארוך יותר, וטיפול עדין בבצק - תוכלו להשיג פיצה ביתית מצוינת.</p>

      <h2>איך לבחור בפועל</h2>
      <p>הנה כמה שאלות שיעזרו לכם לבחור את הקמח הנכון:</p>
      <ul class="list-disc pr-6 space-y-2 my-4">
        <li>באיזה טמפרטורה אתם אופים? תנורים חמים מאוד (מעל 400°C) מתאימים ל-Tipo 00, תנורים ביתיים רגילים - קמח לחם</li>
        <li>כמה עבה הקרום שאתם רוצים? דק ורך - Tipo 00, עבה יותר - קמח לחם</li>
        <li>איזה מרקם אתם מחפשים? פריך וקל - Tipo 00, לעיסתי - קמח לחם</li>
        <li>כמה זמן יש לכם לתפיחה? תפיחה קצרה - קמח עם יותר חלבון עוזר</li>
      </ul>

      <p class="text-lg font-medium mt-8">זכרו: הקמח הוא רק נקודת המוצא. הטכניקה, ההידרציה, זמן התפיחה והטיפול בבצק - כולם חשובים לא פחות. התחילו עם קמח איכותי, אבל אל תפחדו לנסות ולהתנסות עד שתמצאו את השילוב המושלם בשבילכם!</p>
    `;

import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "local-flour-guide" || slug === "local-1") {
    return { title: "מדריך הקמחים לפיצה | Pizza Shop", description: "הבסיס של כל פיצה מעולה" }
  }
  const article = await client.fetch(`*[_type == "article" && (slug.current == $slug || _id == $slug)][0]{title, excerpt}`, { slug });
  if (!article) return { title: "כתבה לא נמצאה" }
  return { title: `${article.title} | Pizza Blog`, description: article.excerpt }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === "local-flour-guide" || slug === "local-1") {
    return (
      <RenderPost
        post={{
          title: "בחירת הקמח המתאים לפיצה שלכם",
          excerpt: "הבסיס של כל פיצה מעולה מתחיל בקמח.",
          content: FULL_FLOUR_GUIDE,
          image: "/images/blog-flour-types.jpg",
          isLocal: true
        }}
      />
    );
  }

  const article = await client.fetch(`
    *[_type == "article" && (slug.current == $slug || _id == $slug)][0]{
      _id, title, excerpt, mainImage, content, publishedAt
    }
  `, { slug });

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">הכתבה לא נמצאה</h1>
        <Button asChild className="mt-8"><Link href="/blog">חזרה לבלוג</Link></Button>
      </div>
    );
  }

  return <RenderPost post={article} />;
}

function RenderPost({ post }: { post: any }) {
  // קומפוננטות רינדור ל-PortableText (מאוחד)
  const portableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        return (
          <div className="relative w-full h-96 my-6 rounded-lg overflow-hidden border border-border">
            <Image src={urlFor(value.asset)} alt={value.alt || "תמונה"} fill className="object-cover" />
          </div>
        );
      },
      spacer: ({ value }: any) => {
        const heights: Record<string, string> = { small: 'h-4', medium: 'h-12', large: 'h-24' };
        return <div className={heights[value.size] || 'h-12'} />;
      },
      youtube: ({ value }: any) => {
        const { url } = value;
        if (!url) return null;
        const id = url.includes('v=') ? url.split('v=')[1].split('&')[0] : url.split('/').pop().split('?')[0];
        return (
          <div className="my-10 relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg border-2 border-border bg-black">
            <iframe className="absolute top-0 left-0 w-full h-full" src={`https://www.youtube.com/embed/${id}`} title="YouTube" allowFullScreen></iframe>
          </div>
        );
      },
    },
    block: {
      h2: ({ children }: any) => <h2 className="text-3xl font-black mt-8 mb-4">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
      normal: ({ children }: any) => <p className="leading-relaxed mb-4 whitespace-pre-wrap">{children}</p>,
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-right" dir="rtl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/blog"><ChevronLeft className="h-4 w-4 ml-2" /> חזרה לבלוג</Link>
      </Button>
      <Navigation />
      <article className="mt-12 space-y-8">
        <header className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">{post.title}</h1>
          {post.excerpt && <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">{post.excerpt}</p>}
        </header>

        <div className="relative w-full h-[450px] border-2 border-border overflow-hidden bg-muted shadow-xl">
          <Image
            src={post.isLocal ? post.image : (post.mainImage?.asset ? urlFor(post.mainImage) : "/placeholder.svg")}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none prose-red dark:prose-invert">
          {post.isLocal ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <PortableText value={post.content} components={portableTextComponents} />
          )}
        </div>
      </article>
    </div>
  );
}