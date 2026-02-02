"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Flame, Timer } from "lucide-react"
import type { PizzaStyle, PizzaStyleConfig } from "@/lib/pizza-types"

interface PizzaCardProps {
  style: PizzaStyle
  config: PizzaStyleConfig
  onSelect: (style: PizzaStyle) => void
  index?: number
}

export function PizzaCard({ style, config, onSelect, index }: PizzaCardProps) {
  return (
    <div 
      className="border-2 border-border p-6 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all cursor-pointer group relative"
      onClick={() => onSelect(style)}
    >
      {index !== undefined && (
        <div className="absolute top-2 right-2 text-xs font-mono opacity-40">
          {String(index + 1).padStart(2, '0')}
        </div>
      )}
      <div className="flex items-start gap-4">
        <div className="relative w-24 h-24 flex-shrink-0 border border-current overflow-hidden">
          <Image
            src={config.image || "/placeholder.svg"}
            alt={config.name}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-black text-2xl uppercase tracking-tight mb-2">
            {config.name}
          </h3>
          <p className="text-xs leading-relaxed opacity-70 mb-3">
            {config.description}
          </p>
          <div className="flex items-center gap-4 text-xs font-mono uppercase">
            <span className="flex items-center gap-1">
              <Flame className="h-3 w-3" />
              {config.baking.temperatureCelsius}°C
            </span>
            <span className="flex items-center gap-1">
              <Timer className="h-3 w-3" />
              {config.baking.bakingTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
