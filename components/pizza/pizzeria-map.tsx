"use client"

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react"
import { REGION_LABELS, REGION_VIEW, type Pizzeria, type Region } from "@/lib/pizzeria-data"
import { Clock, MapPin, Instagram, ExternalLink, X, Tag } from "lucide-react"

function PizzeriaPanel({ pizzeria, onClose }: { pizzeria: Pizzeria; onClose: () => void }) {
  return (
    <div
      className="absolute top-0 right-0 h-full w-full sm:w-[360px] bg-background border-l-2 border-border z-[1000] overflow-y-auto flex flex-col"
      style={{ direction: "rtl" }}
    >
      <div className="relative h-44 shrink-0 bg-muted overflow-hidden">
        {pizzeria.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={pizzeria.image}
            alt={pizzeria.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
        <button
          onClick={onClose}
          className="absolute top-3 left-3 w-9 h-9 bg-background/90 flex items-center justify-center border-2 border-border hover:border-primary transition-colors z-10"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="absolute bottom-3 right-4 left-4">
          <h2 className="text-3xl font-black text-white leading-none tracking-tighter uppercase">
            {pizzeria.name}
          </h2>
        </div>
      </div>
      <div className="p-5 space-y-4 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-primary text-primary-foreground px-3 py-1 text-[10px] font-black uppercase tracking-widest">
            {REGION_LABELS[pizzeria.region]}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
            <MapPin className="h-3 w-3" />{pizzeria.city}
          </span>
        </div>
        {pizzeria.address && (
          <div className="flex items-start gap-2 text-xs text-muted-foreground font-mono leading-relaxed -mt-1">
            <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <span>{pizzeria.address}</span>
          </div>
        )}
        <p className="text-sm text-foreground leading-relaxed">{pizzeria.description}</p>
        {pizzeria.specialties && pizzeria.specialties.length > 0 && (
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">התמחויות</p>
            <div className="flex flex-wrap gap-1.5">
              {pizzeria.specialties.map(s => (
                <span key={s} className="px-2.5 py-1 text-xs font-bold border-2 border-border bg-muted">{s}</span>
              ))}
            </div>
          </div>
        )}
        {pizzeria.hours && (
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span className="font-mono text-xs leading-relaxed">{pizzeria.hours}</span>
          </div>
        )}
        {pizzeria.tags && pizzeria.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <Tag className="h-3 w-3 text-muted-foreground shrink-0" />
            {pizzeria.tags.map(tag => (
              <span key={tag} className="text-xs text-muted-foreground font-mono">#{tag}</span>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-2 pt-2 border-t-2 border-border">
          <a
            href={pizzeria.mapsUrl ?? `https://www.google.com/maps?q=${pizzeria.lat},${pizzeria.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-colors"
          >
            <span>פתח ב-Google Maps</span><ExternalLink className="h-3.5 w-3.5" />
          </a>
          {pizzeria.instagram && (
            <a href={pizzeria.instagram} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 border-2 border-border text-xs font-bold uppercase tracking-wider hover:border-primary transition-colors">
              <span>Instagram</span><Instagram className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function loadLeaflet(): Promise<any> {
  return new Promise((resolve, reject) => {
    const w = window as any
    if (w.L) { resolve(w.L); return }

    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "/leaflet.css"
    document.head.appendChild(link)

    const script = document.createElement("script")
    script.src = "/leaflet.js"
    script.onload = () => resolve(w.L)
    script.onerror = () => reject(new Error("Failed to load /leaflet.js"))
    document.head.appendChild(script)
  })
}

export interface PizzeriaMapHandle {
  selectPizzeria: (pizzeria: Pizzeria) => void
}

interface PizzeriaMapProps {
  regionFilter: Region | "all"
  pizzerias: Pizzeria[]
}

export const PizzeriaMap = forwardRef<PizzeriaMapHandle, PizzeriaMapProps>(
  function PizzeriaMap({ regionFilter, pizzerias }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<any>(null)
    const markersRef = useRef<any[]>([])
    const [selected, setSelected] = useState<Pizzeria | null>(null)
    const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
    const [errorMsg, setErrorMsg] = useState("")
    const selectedRef = useRef<Pizzeria | null>(null)
    const regionRef = useRef(regionFilter)
    const pizzeriasRef = useRef(pizzerias)

    useEffect(() => { selectedRef.current = selected }, [selected])
    useEffect(() => { regionRef.current = regionFilter }, [regionFilter])
    useEffect(() => { pizzeriasRef.current = pizzerias }, [pizzerias])

    useImperativeHandle(ref, () => ({
      selectPizzeria: (pizzeria: Pizzeria) => {
        selectedRef.current = pizzeria
        setSelected(pizzeria)
        if (mapRef.current) {
          const L = (window as any).L
          if (L) {
            mapRef.current.flyTo([pizzeria.lat, pizzeria.lng], 14, { duration: 0.7 })
            buildMarkers(L, mapRef.current)
          }
        }
      }
    }))

    useEffect(() => {
      const container = containerRef.current
      if (!container) return
      let cancelled = false

      loadLeaflet()
        .then((L: any) => {
          if (cancelled || !container) return

          const c = container as any
          if (c._leaflet_id) { delete c._leaflet_id }

          const map = L.map(container, { center: [31.7, 34.9], zoom: 8, zoomControl: false })

          L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
            attribution: "© CARTO",
            maxZoom: 19,
          }).addTo(map)

          L.control.zoom({ position: "bottomleft" }).addTo(map)

          mapRef.current = map
          setTimeout(() => { if (!cancelled) { map.invalidateSize(); setStatus("ready") } }, 100)
          buildMarkers(L, map)
        })
        .catch((e: any) => {
          if (!cancelled) { setErrorMsg(e?.message ?? "error"); setStatus("error") }
        })

      return () => {
        cancelled = true
        if (mapRef.current) {
          try { mapRef.current.remove() } catch {}
          mapRef.current = null
          markersRef.current = []
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // כשמשתנה הפילטר — טס לאזור ומונה מחדש
    useEffect(() => {
      if (!mapRef.current) return
      const L = (window as any).L
      if (!L) return
      const [lat, lng, zoom] = REGION_VIEW[regionFilter]
      mapRef.current.flyTo([lat, lng], zoom, { duration: 0.8 })
      buildMarkers(L, mapRef.current)
    }, [regionFilter])

    // כשמשתנה הבחירה — מונה מחדש (לצבע הסמן)
    useEffect(() => {
      if (!mapRef.current) return
      const L = (window as any).L
      if (!L) return
      buildMarkers(L, mapRef.current)
    }, [selected])

    useEffect(() => {
      if (selected && regionFilter !== "all" && selected.region !== regionFilter) setSelected(null)
    }, [regionFilter, selected])

    function buildMarkers(L: any, map: any) {
      markersRef.current.forEach(m => { try { m.remove() } catch {} })
      markersRef.current = []

      const list = regionRef.current === "all"
        ? pizzeriasRef.current
        : pizzeriasRef.current.filter(p => p.region === regionRef.current)

      list.forEach(pizzeria => {
        const isActive = selectedRef.current?.id === pizzeria.id
        const size = isActive ? 22 : 16

        const icon = L.divIcon({
          className: "",
          html: `<div style="width:${size}px;height:${size}px;background:${isActive ? "oklch(0.93 0.20 50)" : "oklch(0.45 0.15 30)"};border:2px solid ${isActive ? "#222" : "rgba(255,255,255,0.9)"};border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.4);cursor:pointer;"></div>`,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        })

        const marker = L.marker([pizzeria.lat, pizzeria.lng], { icon })

        const ttEl = document.createElement("div")
        ttEl.innerHTML = `<b>${pizzeria.name}</b> · ${pizzeria.city}`
        ttEl.style.cssText = "background:#f5f0e8;border:2px solid #1a1a1a;padding:5px 10px;font-size:11px;font-weight:900;white-space:nowrap;box-shadow:2px 2px 0 rgba(0,0,0,0.15);direction:rtl;"
        marker.bindTooltip(ttEl, { direction: "top", offset: L.point(0, -(size / 2) - 6), opacity: 1, className: "pizzeria-tt" })

        marker.on("click", () => {
          setSelected(prev => prev?.id === pizzeria.id ? null : pizzeria)
          if (!isActive) map.flyTo([pizzeria.lat, pizzeria.lng], 14, { duration: 0.7 })
        })

        marker.addTo(map)
        markersRef.current.push(marker)
      })
    }

    if (status === "error") {
      return (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f0e8" }}>
          <div style={{ textAlign: "center", padding: "24px", fontFamily: "monospace", fontSize: "12px" }}>
            <div style={{ color: "red", marginBottom: 8 }}>שגיאה בטעינת המפה</div>
            <div style={{ color: "#666" }}>{errorMsg}</div>
          </div>
        </div>
      )
    }

    return (
      <div style={{ position: "absolute", inset: 0 }}>
        {status === "loading" && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f0e8", zIndex: 1 }}>
            <span style={{ fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#666" }}>
              טוען מפה...
            </span>
          </div>
        )}
        <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />
        {selected && <PizzeriaPanel pizzeria={selected} onClose={() => setSelected(null)} />}
      </div>
    )
  }
)
