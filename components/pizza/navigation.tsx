"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { Calculator, AlertCircle, BookOpen } from "lucide-react"

type TabValue = "menu" | "rescue" | "blog"

export function Navigation() {
  const { t } = useLanguage()
  const pathname = usePathname() // 👈 מזהה באיזה עמוד אנחנו נמצאים כרגע

  const tabs = [
    {
      value: "rescue" as const,
      label: t('rescue'),
      icon: AlertCircle,
      href: "/rescue"
    },
    {
      value: "menu" as const,
      label: t('calculator'),
      icon: Calculator,
      href: "/"
    },
    {
      value: "blog" as const,
      label: t('blog'),
      icon: BookOpen,
      href: "/blog"
    },
  ]

  // פונקציה לבדיקה אם הטאב פעיל לפי הכתובת
  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

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
              "flex-1 flex flex-col items-center justify-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider transition-all relative",
              active
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground hover:bg-muted",
              index < tabs.length - 1 && "border-r-2 border-border"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="leading-none">{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}