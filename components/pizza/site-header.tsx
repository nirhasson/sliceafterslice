"use client"

import Link from "next/link"
import { Navigation } from "./navigation"

export function SiteHeader() {
  return (
    <>
      <header className="max-w-4xl w-full mx-auto px-6 pt-10 pb-4 relative">
        <div className="absolute top-10 right-6 w-8 h-8 border-t-2 border-r-2 border-border" />
        <div className="absolute top-10 left-6 w-8 h-8 border-t-2 border-l-2 border-border" />
        <Link href="/">
          <h1
            className="text-5xl md:text-6xl font-black text-primary tracking-tighter leading-none text-center hover:text-foreground transition-colors duration-200"
            style={{ fontFamily: 'Impact, "Arial Black", sans-serif', letterSpacing: "-0.03em" }}
          >
            SLICE AFTER SLICE
          </h1>
        </Link>
      </header>
      <div className="max-w-4xl w-full mx-auto px-6 pb-6">
        <Navigation />
      </div>
    </>
  )
}
