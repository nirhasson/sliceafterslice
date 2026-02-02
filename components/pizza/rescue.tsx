"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Droplet, Wheat, Circle, Hand, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DoughProblem, PizzaStyle } from "@/lib/pizza-types"
import { DOUGH_PROBLEMS, PIZZA_STYLES, calculateRescue } from "@/lib/pizza-types"

const problemIcons: Record<DoughProblem, React.ElementType> = {
  tooMuchWater: Droplet,
  tooMuchFlour: Wheat,
  forgotSalt: Circle,
  tooSticky: Hand,
}

export function Rescue() {
  const [selectedProblem, setSelectedProblem] = useState<DoughProblem | null>(null)
  const [actualFlour, setActualFlour] = useState("")
  const [actualWater, setActualWater] = useState("")
  const [targetStyle, setTargetStyle] = useState<PizzaStyle>("neapolitan")
  const [result, setResult] = useState<string[] | null>(null)

  const handleProblemSelect = (problem: DoughProblem) => {
    setSelectedProblem(problem)
    setResult(null) // Clear results when switching problems
  }

  const handleCalculate = () => {
    if (!selectedProblem || !actualFlour || !actualWater) return
    const solutions = calculateRescue(
      Number(actualFlour),
      Number(actualWater),
      selectedProblem,
      targetStyle
    )
    setResult(solutions)
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <AlertCircle className="h-6 w-6 text-primary" />
            הצלת בצק
          </CardTitle>
          <CardDescription>
            משהו השתבש? בואו נתקן את זה ביחד
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">מה קרה לבצק?</Label>
            <div className="grid grid-cols-2 gap-3">
              {DOUGH_PROBLEMS.map((problem) => {
                const Icon = problemIcons[problem.value as DoughProblem]
                return (
                  <button
                    key={problem.value}
                    onClick={() => handleProblemSelect(problem.value as DoughProblem)}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 text-left",
                      selectedProblem === problem.value
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className={cn(
                      "h-5 w-5 shrink-0",
                      selectedProblem === problem.value ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className="text-sm font-medium">{problem.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {selectedProblem && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="actualFlour" className="text-sm font-medium">
                    כמות קמח (גרם)
                  </Label>
                  <Input
                    id="actualFlour"
                    type="number"
                    placeholder="לדוגמה: 500"
                    value={actualFlour}
                    onChange={(e) => setActualFlour(e.target.value)}
                    className="text-center"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="actualWater" className="text-sm font-medium">
                    כמות מים (גרם)
                  </Label>
                  <Input
                    id="actualWater"
                    type="number"
                    placeholder="לדוגמה: 350"
                    value={actualWater}
                    onChange={(e) => setActualWater(e.target.value)}
                    className="text-center"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">סגנון פיצה מטרה</Label>
                <Select value={targetStyle} onValueChange={(v) => setTargetStyle(v as PizzaStyle)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(PIZZA_STYLES) as [PizzaStyle, typeof PIZZA_STYLES[PizzaStyle]][]).map(([key, style]) => {
                      if (!style) return null;
                      return (
                        <SelectItem key={key} value={key}>
                          {style.name} ({style.hydration}% הידרציה)
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleCalculate} 
                className="w-full" 
                size="lg"
                disabled={!actualFlour || !actualWater}
              >
                הציל את הבצק שלי
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {result && result.length > 0 && (
        <Card className="border-2 border-dashed border-muted-foreground/30 bg-muted/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-3">
                <h3 className="font-bold text-xl uppercase tracking-wide">פתרונות</h3>
                <ul className="space-y-3">
                  {result.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground/90 leading-relaxed">
                      <span className="font-mono font-bold shrink-0 mt-0.5 text-foreground">{index + 1}.</span>
                      <span className="text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
