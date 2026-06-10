"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { Calculator, AlertCircle, BookOpen, MapPin, Menu, X, Mail } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const tabs = [
    { value: "menu", label: t('calculator'), icon: Calculator, href: "/" },
    { value: "blog", label: t('blog'), icon: BookOpen, href: "/blog" },
    { value: "pizzerias", label: "מדריך פיצריות", icon: MapPin, href: "/pizzerias" },
    { value: "rescue", label: t('rescue'), icon: AlertCircle, href: "/rescue" },
  ]

  const mobileOnlyTabs = [
    { value: "contact", label: "צור קשר", icon: Mail, href: "/contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex border-2 border-border overflow-hidden">
        {tabs.map((tab, index) => {
          const Icon = tab.icon
          const active = isActive(tab.href)
          return (
            <Link
              key={tab.value}
              href={tab.href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-2 px-4 py-4 text-xs font-bold uppercase tracking-wider transition-all relative",
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground hover:bg-muted",
                index > 0 && "border-r-2 border-border"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="leading-tight text-center">{tab.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Mobile nav */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 border-2 border-border bg-background font-black uppercase tracking-wider text-sm"
        >
          <span>
            {tabs.find(t => isActive(t.href))?.label ?? "תפריט"}
          </span>
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {menuOpen && (
          <div className="border-2 border-t-0 border-border overflow-hidden">
            {[...tabs, ...mobileOnlyTabs].map((tab, index) => {
              const Icon = tab.icon
              const active = isActive(tab.href)
              return (
                <Link
                  key={tab.value}
                  href={tab.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground hover:bg-muted",
                    index > 0 && "border-t-2 border-border"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{tab.label}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
