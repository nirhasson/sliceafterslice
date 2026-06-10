import Link from "next/link"

const links = [
  { href: "/", label: "מחשבון פיצה" },
  { href: "/blog", label: "מגזין" },
  { href: "/pizzerias", label: "מדריך פיצריות" },
  { href: "/rescue", label: "הצלת בצק" },
  { href: "/contact", label: "צור קשר" },
]

export function SiteFooter() {
  return (
    <footer className="max-w-4xl w-full mx-auto px-6 pb-8 mt-16">
      <div className="border-t-2 border-border pt-8 space-y-4">
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
          <span
            className="font-black text-foreground"
            style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
          >
            SLICE AFTER SLICE
          </span>
          <span>EST. 2026</span>
        </div>
      </div>
    </footer>
  )
}
