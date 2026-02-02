"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, Star, Send, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

export function Share() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [notes, setNotes] = useState("")
  const [imageUploaded, setImageUploaded] = useState(false)

  const handleImageUpload = () => {
    // Note: This is a mock upload. To actually upload images,
    // you would need to integrate with a storage service like Vercel Blob
    setImageUploaded(true)
  }

  const handleSubmit = () => {
    alert(`Thanks for sharing! Rating: ${rating} stars`)
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Camera className="h-6 w-6 text-primary" />
            Pizza Gallery
          </CardTitle>
          <CardDescription>
            Upload your pizza photos and share your creations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Upload Image</Label>
            <button
              onClick={handleImageUpload}
              className={cn(
                "w-full border-2 border-dashed rounded-lg p-8 transition-all duration-200 flex flex-col items-center gap-3",
                imageUploaded
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <div className={cn(
                "p-4 rounded-full",
                imageUploaded ? "bg-primary/10" : "bg-muted"
              )}>
                <Upload className={cn(
                  "h-8 w-8",
                  imageUploaded ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <span className={cn(
                "text-sm font-medium",
                imageUploaded ? "text-primary" : "text-muted-foreground"
              )}>
                {imageUploaded ? "Image uploaded successfully!" : "Click to upload image"}
              </span>
            </button>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">How did your pizza turn out?</Label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform duration-200 hover:scale-110"
                >
                  <Star
                    className={cn(
                      "h-8 w-8 transition-colors duration-200",
                      (hoveredRating || rating) >= star
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes (optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Tell us about your experience..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          <Button 
            onClick={handleSubmit} 
            className="w-full" 
            size="lg"
            disabled={!rating}
          >
            <Send className="h-5 w-5 mr-2" />
            Share
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
