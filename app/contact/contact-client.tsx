"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/pizza/site-header"
import { SiteFooter } from "@/components/pizza/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("success")
        setForm({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      <SiteHeader />

      <div className="max-w-4xl w-full mx-auto px-6 flex-1">
        <div className="grid md:grid-cols-2 gap-12">

          {/* טקסט */}
          <div className="space-y-5">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground font-mono">
                צור קשר
              </span>
              <h2 className="text-4xl font-black leading-none mt-1 uppercase tracking-tighter">
                דברו איתנו
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm">
              צוות האתר שם לו למטרה לתת במה לקהילת הפיצה בישראל, קהילה שהופכת מיום ליום לגדולה וסקרנית יותר. הפיצה היא מאכל אהוב בארץ, משהו שכיף לשבת ולאכול במסעדה איכותית, פיצרייה שכונתית או להכין בבית.
            </p>

            <p className="text-muted-foreground leading-relaxed text-sm">
              האתר עוד מתפתח מיום ליום ולאט לאט יתווסף עוד תוכן, שיתופי פעולה, סקירת פיצריות ועוד.
            </p>

            <p className="text-muted-foreground leading-relaxed text-sm">
              את האתר הקים ניר חסון, חובב פיצה ואופה עם מעל עשור בתחום. לאורך השנים השתתף בקורסים שונים בארץ, קרא כמעט כל ספר אפשרי ואין שבוע שעובר שבו לא מתנסה באפייה של משהו חדש ומסקרן.
            </p>

            <p className="text-muted-foreground leading-relaxed text-sm">
              אם יש לכם שאלות או רעיונות לשיתופי פעולה — אשמח שתיצרו קשר בטופס.
            </p>
          </div>

          {/* טופס */}
          <div>
            {status === "success" ? (
              <div className="border-2 border-primary p-8 text-center space-y-3">
                <p
                  className="text-2xl font-black uppercase"
                  style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                >
                  ההודעה נשלחה!
                </p>
                <p className="text-muted-foreground text-sm font-mono">נחזור אליך בהקדם.</p>
                <Button variant="outline" onClick={() => setStatus("idle")}>
                  שלח הודעה נוספת
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest block mb-1.5">
                    שם מלא
                  </label>
                  <Input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="הכנס שם מלא"
                    required
                    className="border-2 rounded-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest block mb-1.5">
                    אימייל
                  </label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    required
                    className="border-2 rounded-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest block mb-1.5">
                    הודעה
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="כתוב את הודעתך כאן..."
                    required
                    rows={6}
                    className="w-full border-2 border-input bg-background px-3 py-2 text-sm rounded-none resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-500 font-mono">משהו השתבש, נסה שוב.</p>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full font-black uppercase tracking-widest rounded-none"
                >
                  {status === "loading" ? "שולח..." : "שלח הודעה"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
