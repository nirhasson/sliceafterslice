"use client"

import { useState } from "react"
import { Navigation } from "@/components/pizza/navigation"
import { PizzaCard } from "@/components/pizza/pizza-card"
import { Calculator } from "@/components/pizza/calculator"
import { Rescue } from "@/components/pizza/rescue"
import { Blog } from "@/components/pizza/blog"
import { Newsletter } from "@/components/pizza/newsletter"
import { useLanguage } from "@/lib/language-context"
import { PIZZA_STYLES, type PizzaStyle } from "@/lib/pizza-types"

type TabValue = "menu" | "rescue" | "blog" | "share" // Add 'share' to TabValue type
type ViewState = { type: "menu" } | { type: "calculator"; style: PizzaStyle }

export default function SliceAfterSlice() {
  const [activeTab, setActiveTab] = useState<TabValue>("menu")
  const [viewState, setViewState] = useState<ViewState>({ type: "menu" })
  const { t } = useLanguage()

  const handleSelectPizza = (style: PizzaStyle) => {
    setViewState({ type: "calculator", style })
  }

  const handleBackToMenu = () => {
    setViewState({ type: "menu" })
  }

  const handleTabChange = (tab: TabValue) => {
    setActiveTab(tab)
    if (tab === "menu") {
      setViewState({ type: "menu" })
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        <header className="text-center mb-12 relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-border"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-border"></div>
          <h1 className="text-7xl md:text-8xl font-black text-primary mb-4 tracking-tighter leading-none" style={{ fontFamily: 'Impact, "Arial Black", sans-serif', letterSpacing: '-0.03em', fontWeight: 900 }}>
            {t('siteName').split(' ').map((word, i) => (
              <span key={i}>{word}<br/></span>
            ))}
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono mt-6">
            {t('tagline')}
          </p>
        </header>

        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />

        <main className="mt-6">
          {activeTab === "menu" && (
            viewState.type === "menu" ? (
              <div className="space-y-4">
                {(Object.entries(PIZZA_STYLES) as [PizzaStyle, typeof PIZZA_STYLES[PizzaStyle]][]).map(([style, config], index) => (
                  <PizzaCard
                    key={style}
                    style={style}
                    config={config}
                    onSelect={handleSelectPizza}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <Calculator
                selectedStyle={viewState.style}
                onBack={handleBackToMenu}
              />
            )
          )}

          {activeTab === "rescue" && <Rescue />}

          {activeTab === "blog" && <Blog />}
        </main>

        <div className="mt-12">
          <Newsletter />
        </div>

        <footer className="mt-12 pt-8 border-t-2 border-primary/20">
          <div className="flex justify-between items-center text-xs font-mono">
            <span>{t('siteName').toUpperCase()}</span>
            <span>{t('footer')}</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
