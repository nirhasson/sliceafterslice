"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/pizza/navigation"
import { PizzeriaMap } from "@/components/pizza/pizzeria-map"
import { PIZZERIAS, REGION_LABELS, type Region, type Pizzeria } from "@/lib/pizzeria-data"
import { client, pizzeriasQuery, urlFor } from "@/lib/sanity"
import { cn } from "@/lib/utils"
import { MapPin } from "lucide-react"

type FilterValue = "all" | Region

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "הכל" },
  { value: "north", label: REGION_LABELS.north },
  { value: "center", label: REGION_LABELS.center },
  { value: "south", label: REGION_LABELS.south },
]

function sanityToPizzeria(p: any): Pizzeria {
  return {
    id: p._id,
    name: p.name,
    region: p.region,
    city: p.city,
    address: p.address ?? "",
    lat: p.lat,
    lng: p.lng,
    description: p.description ?? "",
    hours: p.hours ?? "",
    image: p.image ? urlFor(p.image).width(600).url() : "/placeholder.jpg",
    specialties: p.specialties,
    tags: p.tags,
    instagram: p.instagram,
    mapsUrl: p.mapsUrl,
  }
}

export default function PizzeriasPage() {
  const [region, setRegion] = useState<FilterValue>("all")
  const [sanityPizzerias, setSanityPizzerias] = useState<Pizzeria[]>([])

  useEffect(() => {
    client.fetch(pizzeriasQuery)
      .then((data: any[]) => setSanityPizzerias(data.map(sanityToPizzeria)))
      .catch(console.error)
  }, [])

  const allPizzerias = [...sanityPizzerias, ...PIZZERIAS]

  const counts = {
    all: allPizzerias.length,
    north: allPizzerias.filter(p => p.region === "north").length,
    center: allPizzerias.filter(p => p.region === "center").length,
    south: allPizzerias.filter(p => p.region === "south").length,
  }

  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ direction: "rtl" }}>

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

      <div className="max-w-4xl w-full mx-auto px-6 pb-4">
        <Navigation />
      </div>

      <div className="max-w-4xl w-full mx-auto px-6 pb-4">
        <div className="flex items-end justify-between gap-4 border-b-2 border-border pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground font-mono">
                מדריך פיצריות
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-black text-foreground leading-none"
              style={{ letterSpacing: "-0.03em", fontFamily: 'Impact, "Arial Black", sans-serif' }}
            >
              מדריך הפיצריות המומלצות של ישראל
            </h2>
          </div>
          <p className="text-xs text-muted-foreground font-mono hidden md:block">
            {counts[region]} פיצריות
          </p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3 max-w-2xl">
          המדריך המלא לפיצריות המומלצות בישראל — צוות האתר אוסף עבורכם את המקומות ששמים דגש על מקוריות, חומרי גלם איכותיים ומביאים משהו ייחודי לשוק הפיצה הישראלי.
        </p>
      </div>

      <div className="max-w-4xl w-full mx-auto px-6 pb-3">
        <div className="flex gap-0 border-2 border-border overflow-hidden w-fit">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setRegion(f.value)}
              className={cn(
                "px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all duration-150 relative",
                "border-l-2 border-border first:border-l-0",
                region === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground hover:bg-muted"
              )}
            >
              {f.label}
              <span className={cn(
                "mr-1.5 text-[10px] font-mono",
                region === f.value ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                {counts[f.value]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        className="mx-6 mb-6 max-w-4xl w-full self-center border-2 border-border relative"
        style={{ height: "60vh", minHeight: "520px" }}
      >
        <PizzeriaMap regionFilter={region} pizzerias={allPizzerias} />
      </div>

      <footer className="max-w-4xl w-full mx-auto px-6 pb-6">
        <div className="flex justify-between items-center text-xs font-mono text-muted-foreground border-t-2 border-border pt-4">
          <span>SLICE AFTER SLICE</span>
          <span>EST. 2026</span>
        </div>
      </footer>

    </div>
  )
}
