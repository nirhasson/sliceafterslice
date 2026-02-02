"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Clock, User, Search, ChevronLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "בחירת הקמח המתאים לפיצה שלכם",
    excerpt: "הבסיס של כל פיצה מעולה מתחיל בקמח. הנה כל מה שאתם צריכים לדעת על בחירת הקמח המושלם לסגנון שלכם.",
    image: "/images/blog-flour-types.jpg",
    date: "29 ינואר, 2026",
    readTime: "8 דקות קריאה",
    author: "צוות הפיצה",
    tags: ["קמח", "מרכיבים", "טיפים"],
    content: `
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
    `
  },
  {
    id: 2,
    title: "5 טעויות נפוצות בהכנת בצק",
    excerpt: "נמנעו מטעויות האלו כדי להשיג את הבצק המושלם בכל פעם. מאפיות ביתיות עושות את אלו כל הזמן.",
    image: "/images/blog-pizza-dough.jpg",
    date: "25 ינואר, 2026",
    readTime: "6 דקות קריאה",
    author: "צוות הפיצה",
    tags: ["בצק", "טעויות", "טיפים"],
    content: "<p>תוכן מלא יגיע בקרוב...</p>"
  },
  {
    id: 3,
    title: "איך לשדרג את התנור הביתי שלכם",
    excerpt: "אין לכם תנור פיצה? אין בעיה. השיגו תוצאות ברמת מסעדה עם התנור הרגיל שלכם באמצעות הטריקים האלו.",
    image: "/images/blog-flour-types.jpg",
    date: "20 ינואר, 2026",
    readTime: "5 דקות קריאה",
    author: "צוות הפיצה",
    tags: ["תנור", "טכניקות", "ציוד"],
    content: "<p>תוכן מלא יגיע בקרוב...</p>"
  }
]

export function Blog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null)

  const filteredPosts = blogPosts.filter(post => {
    const query = searchQuery.toLowerCase()
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  })

  if (selectedPost) {
    return (
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedPost(null)}
          className="mb-6 hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4 ml-2" />
          חזרה לבלוג
        </Button>

        <article className="space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                {selectedPost.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                {selectedPost.readTime}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-3 w-3" />
                {selectedPost.author}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black uppercase leading-tight">
              {selectedPost.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {selectedPost.excerpt}
            </p>
            <div className="flex gap-2">
              {selectedPost.tags.map(tag => (
                <span key={tag} className="text-xs px-3 py-1 bg-primary/10 text-primary font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="relative w-full h-[400px] border-2 border-border">
            <Image
              src={selectedPost.image || "/placeholder.svg"}
              alt={selectedPost.title}
              fill
              className="object-cover"
            />
          </div>

          <div 
            className="prose prose-lg max-w-none space-y-6"
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          />
        </article>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="חיפוש כתבות, תגיות..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
      </div>

      {/* Blog Posts Grid */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">לא נמצאו כתבות התואמות את החיפוש</p>
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="border-2 border-border hover:border-primary transition-colors overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="space-y-3">
                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-bold leading-tight hover:text-primary transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-muted-foreground leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex gap-2 flex-wrap">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 bg-muted text-foreground font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Button 
                      variant="outline" 
                      className="mt-4 w-fit bg-transparent"
                      onClick={() => setSelectedPost(post)}
                    >
                      המשך קריאה
                      <ChevronLeft className="h-4 w-4 mr-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
