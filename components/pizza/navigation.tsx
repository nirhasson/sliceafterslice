"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { Calculator, AlertCircle, BookOpen } from "lucide-react"

type TabValue = "menu" | "rescue" | "blog"

interface NavigationProps {
  activeTab: TabValue
  onTabChange: (tab: TabValue) => void
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const { t } = useLanguage()
  
  const tabs = [
    { value: "rescue" as const, label: t('rescue'), icon: AlertCircle },
    { value: "menu" as const, label: t('calculator'), icon: Calculator },
    { value: "blog" as const, label: t('blog'), icon: BookOpen },
  ]

  return (
    <nav className="flex border-2 border-border overflow-hidden">
      {tabs.map((tab, index) => {
        const Icon = tab.icon
        return (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider transition-all relative",
              activeTab === tab.value
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground hover:bg-muted",
              index < tabs.length - 1 && "border-r-2 border-border"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="leading-none">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
