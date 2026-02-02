"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  ArrowLeft, 
  Wheat, 
  Droplets, 
  Circle, 
  Clock, 
  Hash,
  Flame,
  Timer,
  Hand,
  Thermometer,
  Youtube,
  Share2,
  ExternalLink
} from "lucide-react"
import type { PizzaStyle, Recipe } from "@/lib/pizza-types"
import { PIZZA_STYLES, calculateRecipe } from "@/lib/pizza-types"

interface CalculatorProps {
  selectedStyle: PizzaStyle
  onBack: () => void
}

export function Calculator({ selectedStyle, onBack }: CalculatorProps) {
  const [numBalls, setNumBalls] = useState(4)
  const [ballWeight, setBallWeight] = useState(260)
  const [recipe, setRecipe] = useState<Recipe | null>(null)

  const config = PIZZA_STYLES[selectedStyle]

  const handleCalculate = () => {
    const result = calculateRecipe(ballWeight, numBalls, selectedStyle)
    setRecipe(result)
  }

  const handleShareRecipe = async () => {
    if (!recipe) return
    
    const shareText = `${config.name} Recipe (${numBalls} balls, ${ballWeight}g each):
    
Flour: ${recipe.flour}g
Water: ${recipe.water}g
Salt: ${recipe.salt}g
Yeast: ${recipe.yeast}g
${recipe.oil > 0 ? `Olive Oil: ${recipe.oil}g` : ''}

Baking: ${config.baking.temperature} for ${config.baking.bakingTime}

Made with SliceAfterSlice`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${config.name} Recipe`,
          text: shareText,
        })
      } catch (err) {
        // User cancelled or error
        console.log("Share cancelled")
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(shareText)
      alert("Recipe copied to clipboard!")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Card with Image */}
      <Card className="border-border/50 overflow-hidden">
        <div className="relative h-48 w-full">
          <Image
            src={config.image || "/placeholder.svg"}
            alt={config.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="absolute top-4 left-4 bg-background/80 hover:bg-background text-foreground"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            חזור
          </Button>
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-2xl font-bold text-white">{config.name}</h1>
            <p className="text-white/80 text-sm mt-1">{config.description}</p>
          </div>
        </div>
        
        <CardContent className="p-6 space-y-6">
          {/* Calculator Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numBalls" className="text-sm font-medium">
                מספר כדורי בצק
              </Label>
              <Input
                id="numBalls"
                type="number"
                min={1}
                max={20}
                value={numBalls}
                onChange={(e) => setNumBalls(Number(e.target.value))}
                className="text-center text-lg font-semibold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ballWeight" className="text-sm font-medium">
                משקל כדור (גרם)
              </Label>
              <Input
                id="ballWeight"
                type="number"
                min={150}
                max={500}
                value={ballWeight}
                onChange={(e) => setBallWeight(Number(e.target.value))}
                className="text-center text-lg font-semibold"
              />
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full" size="lg">
            <Hash className="h-5 w-5 ml-2" />
            חשב מתכון
          </Button>
        </CardContent>
      </Card>

      {/* Recipe Results */}
      {recipe && (
        <Card className="border-primary/20 bg-card animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">המתכון שלך</CardTitle>
                <CardDescription>
                  {numBalls} כדורים, {ballWeight}ג כדור
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShareRecipe}
                className="bg-transparent"
              >
                <Share2 className="h-4 w-4 mr-2" />
                שתף
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <IngredientRow icon={Wheat} label="קמח" amount={`${recipe.flour}g`} />
            <IngredientRow icon={Droplets} label="מים" amount={`${recipe.water}g`} />
            <IngredientRow icon={Circle} label="מלח" amount={`${recipe.salt}g`} />
            <IngredientRow icon={Clock} label="שמרים" amount={`${recipe.yeast}g`} />
            {recipe.oil > 0 && (
              <IngredientRow icon={Droplets} label="שמן זית" amount={`${recipe.oil}g`} />
            )}
          </CardContent>
        </Card>
      )}

      {/* Kneading Instructions */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Hand className="h-5 w-5 text-primary" />
            לישה
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">טכניקה</span>
            <span className="font-medium text-right max-w-[60%]">{config.kneading.technique}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">משך זמן</span>
            <span className="font-medium">{config.kneading.duration}</span>
          </div>
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">טיפים:</p>
            <ul className="space-y-1">
              {config.kneading.tips.map((tip, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Proofing Instructions */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Timer className="h-5 w-5 text-primary" />
            תפיחה
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">בטמפרטורת החדר</span>
            <span className="font-medium text-right max-w-[55%]">{config.proofing.roomTemp}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">תפיחה קרה</span>
            <span className="font-medium text-right max-w-[55%]">{config.proofing.coldProof}</span>
          </div>
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">טיפים:</p>
            <ul className="space-y-1">
              {config.proofing.tips.map((tip, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Baking Instructions */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Flame className="h-5 w-5 text-primary" />
            אפייה
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">טמפרטורה</span>
            <span className="font-medium">{config.baking.temperature}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">זמן אפייה</span>
            <span className="font-medium">{config.baking.bakingTime}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">סוג תנור</span>
            <span className="font-medium text-right max-w-[55%]">{config.baking.ovenType}</span>
          </div>
        </CardContent>
      </Card>

      {/* YouTube Links */}
      {config.youtubeLinks.length > 0 && (
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Youtube className="h-5 w-5 text-red-500" />
              למד עוד
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {config.youtubeLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
              >
                <div>
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">
                    {link.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{link.channel}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function IngredientRow({
  icon: Icon,
  label,
  amount,
}: {
  icon: React.ElementType
  label: string
  amount: string
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-background">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <span className="font-medium">{label}</span>
      </div>
      <span className="text-lg font-bold text-primary">{amount}</span>
    </div>
  )
}
