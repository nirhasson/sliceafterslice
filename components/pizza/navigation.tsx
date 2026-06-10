"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { Calculator, AlertCircle, BookOpen, MapPin } from "lucide-react"

export function Navigation() {
  const { t } = useLanguage()
  const pathname = usePathname()

  const tabs = [
    { value: "menu", label: t('calculator'), shortLabel: "מחשבון", icon: Calculator, href: "/", mobileHidden: false },
    { value: "blog", label: t('blog'), shortLabel: "מגזין", icon: BookOpen, href: "/blog", mobileHidden: false },
    { value: "pizzerias", label: "מדריך פיצריות", shortLabel: "פיצריות", icon: MapPin, href: "/pizzerias", mobileHidden: false },
    { value: "rescue", label: t('rescue'), shortLabel: "הצלה", icon: AlertCircle, href: "/rescue", mobileHidden: true },
  ]

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  return (
    <nav className="flex border-2 border-border overflow-hidden">
      {tabs.map((tab, index) => {
        const Icon = tab.icon
        const active = isActive(tab.href)
        return (
          <Link
            key={tab.value}
            href={tab.href}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1 md:gap-2",
              "px-1 py-2.5 md:px-4 md:py-4",
              "font-bold uppercase transition-all relative",
              tab.mobileHidden && "hidden md:flex",
              active
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground hover:bg-muted",
              index > 0 && "border-r-2 border-border"
            )}
          >
            <Icon className="h-4 w-4 md:h-5 md:w-5 shrink-0" />
            <span className="text-[9px] md:hidden leading-tight text-center">{tab.shortLabel}</span>
            <span className="hidden md:block text-xs leading-tight text-center tracking-wider">{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
