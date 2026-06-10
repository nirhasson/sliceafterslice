"use client"

import Link from "next/link"
import { useState } from "react"
import { Calculator, BookOpen, MapPin, AlertCircle, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const allLinks = [
  { label: "מחשבון פיצה", icon: Calculator, href: "/", number: "01" },
  { label: "מגזין", icon: BookOpen, href: "/blog", number: "02" },
  { label: "מדריך פיצריות", icon: MapPin, href: "/pizzerias", number: "03" },
  { label: "הצלת בצק", icon: AlertCircle, href: "/rescue", number: "04" },
  { label: "צור קשר", icon: Mail, href: "/contact", number: "05" },
]

export function HamburgerMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  return (
    <>
      <style>{`
        @keyframes menu-stamp {
          from { opacity: 0; transform: translateY(-6px) scaleY(0.94); transform-origin: top right; }
          to   { opacity: 1; transform: translateY(0)  scaleY(1); }
        }
        @keyframes item-slide {
          from { opacity: 0; transform: translateX(10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .hb-menu  { animation: menu-stamp 0.16s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .hb-item  { animation: item-slide 0.2s cubic-bezier(0.16, 1, 0.3, 1) both; }
      `}</style>

      <div className="relative">
        <button
          onClick={() => setOpen(prev => !prev)}
          aria-label="תפריט"
          className={cn(
            "w-8 h-8 flex items-center justify-center transition-colors duration-150",
            open
              ? "border-2 border-primary bg-primary text-primary-foreground"
              : "border-t-2 border-r-2 border-border hover:border-primary hover:text-primary"
          )}
        >
          <div className="flex flex-col gap-[4px] items-center justify-center w-4">
            <span className={cn(
              "block h-[2px] bg-current transition-all duration-200 origin-center",
              open ? "w-3.5 rotate-45 translate-y-[6px]" : "w-3.5"
            )} />
            <span className={cn(
              "block h-[2px] bg-current transition-all duration-150",
              open ? "w-0 opacity-0" : "w-2.5"
            )} />
            <span className={cn(
              "block h-[2px] bg-current transition-all duration-200 origin-center",
              open ? "w-3.5 -rotate-45 -translate-y-[6px]" : "w-2"
            )} />
          </div>
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="hb-menu absolute top-full right-0 mt-1 w-64 bg-background border-2 border-border z-50 overflow-hidden" dir="rtl">
              <div className="px-4 py-2 border-b-2 border-border bg-muted">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground font-mono">
                  ניווט
                </span>
              </div>
              {allLinks.map((link, index) => {
                const Icon = link.icon
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{ animationDelay: `${index * 35}ms` }}
                    className={cn(
                      "hb-item group flex items-center gap-3 px-4 py-3.5 border-b-2 border-border last:border-b-0 transition-colors duration-100",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-foreground hover:bg-primary hover:text-primary-foreground"
                    )}
                  >
                    <span className={cn(
                      "text-[9px] font-black font-mono shrink-0 w-4 leading-none",
                      active ? "text-primary-foreground/50" : "text-muted-foreground group-hover:text-primary-foreground/50"
                    )}>
                      {link.number}
                    </span>
                    <span className="text-sm font-black uppercase tracking-wider leading-none flex-1">
                      {link.label}
                    </span>
                    <Icon className="h-3.5 w-3.5 shrink-0 opacity-50" />
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </div>
    </>
  )
}
