"use client"

import { Navigation } from "@/components/pizza/navigation"
import { PizzaCard } from "@/components/pizza/pizza-card"
import { Newsletter } from "@/components/pizza/newsletter"
import { useLanguage } from "@/lib/language-context"
import { PIZZA_STYLES, type PizzaStyle } from "@/lib/pizza-types"

export default function SliceAfterSlice() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background relative">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="text-center mb-12 relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-border" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-border" />

          <h1
            className="text-7xl md:text-8xl font-black text-primary mb-4 tracking-tighter leading-none"
            style={{
              fontFamily: 'Impact, "Arial Black", sans-serif',
              letterSpacing: "-0.03em",
              fontWeight: 900,
            }}
          >
            {t("siteName")
              .split(" ")
              .map((word, i) => (
                <span key={i}>
                  {word}
                  <br />
                </span>
              ))}
          </h1>

          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono mt-6">
            {t("tagline")}
          </p>
        </header>

        {/* הניווט החדש שמוביל לעמודים נפרדים */}
        <Navigation />

        <main className="mt-6">
          <div className="space-y-4">
            {(
              Object.entries(PIZZA_STYLES) as [
                PizzaStyle,
                typeof PIZZA_STYLES[PizzaStyle]
              ][]
            ).map(([style, config], index) => (
              <PizzaCard
                key={style}
                style={style}
                config={config}
                index={index}
              />
            ))}
          </div>
        </main>

        <div className="mt-12">
          <Newsletter />
        </div>

        <footer className="mt-12 pt-8 border-t-2 border-primary/20">
          <div className="flex justify-between items-center text-xs font-mono">
            <span>{t("siteName").toUpperCase()}</span>
            <span>{t("footer")}</span>
          </div>
        </footer>
      </div>
    </div>
  )
}