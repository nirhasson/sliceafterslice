"use client"

import { useState, useEffect, useRef } from "react"
import { SiteHeader } from "@/components/pizza/site-header"
import { PizzeriaMap, type PizzeriaMapHandle } from "@/components/pizza/pizzeria-map"
import { PIZZERIAS, REGION_LABELS, type Region, type Pizzeria } from "@/lib/pizzeria-data"
import { client, pizzeriasQuery, urlFor } from "@/lib/sanity"
import { cn } from "@/lib/utils"
import { MapPin } from "lucide-react"
import { SiteFooter } from "@/components/pizza/site-footer"

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
  const mapRef = useRef<PizzeriaMapHandle>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  const handleListClick = (pizzeria: Pizzeria) => {
    mapContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    setTimeout(() => mapRef.current?.selectPizzeria(pizzeria), 300)
  }

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

      <SiteHeader />

      <div className="max-w-4xl w-full mx-auto px-6 pb-4">
        <div className="flex items-end justify-between gap-4 border-b-2 border-border pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground font-mono">
                מדריך פיצריות
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground leading-none uppercase tracking-tighter">
              מדריך הפיצריות המומלצות של ישראל
            </h2>
          </div>
          <p className="text-xs text-muted-foreground font-mono hidden md:block">
            {counts[region]} פיצריות
          </p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3 max-w-2xl">
          המדריך המלא לפיצריות המומלצות בישראל - צוות האתר אוסף עבורכם את המקומות ששמים דגש על מקוריות, חומרי גלם איכותיים ומביאים משהו ייחודי לשוק הפיצה הישראלי.
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
        ref={mapContainerRef}
        className="mx-6 mb-6 max-w-4xl w-full self-center border-2 border-border relative"
        style={{ height: "60vh", minHeight: "520px" }}
      >
        <PizzeriaMap ref={mapRef} regionFilter={region} pizzerias={allPizzerias} />
      </div>

      <div className="max-w-4xl w-full mx-auto px-6 pb-8" dir="rtl">
        <div className="border-t-2 border-border pt-8 mb-4">
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">כל הפיצריות במדריך</h2>
          <div className="grid md:grid-cols-2 border-t-2 border-r-2 border-border">
            {(region === "all" ? allPizzerias : allPizzerias.filter(p => p.region === region)).map((p) => (
              <div
                key={p.id}
                onClick={() => handleListClick(p)}
                className="border-b-2 border-l-2 border-border p-5 cursor-pointer hover:bg-muted transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-black text-lg uppercase tracking-tight leading-none">{p.name}</h3>
                  <span className="text-[10px] font-black font-mono uppercase tracking-widest text-muted-foreground shrink-0 pt-0.5">
                    {REGION_LABELS[p.region]}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-mono mb-2">{p.city}{p.address ? ` · ${p.address}` : ""}</p>
                <p className="text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SiteFooter />

    </div>
  )
}
