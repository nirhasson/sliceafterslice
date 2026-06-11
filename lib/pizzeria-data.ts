export type Region = "north" | "haifa" | "center" | "jerusalem" | "south"

export interface Pizzeria {
  id: string
  name: string
  region: Region
  city: string
  address: string
  lat: number
  lng: number
  description: string
  specialties?: string[]
  hours: string
  image: string
  instagram?: string
  website?: string
  mapsUrl?: string
  tags?: string[]
}

export const REGION_LABELS: Record<Region, string> = {
  north: "צפון",
  haifa: "חיפה והסביבה",
  center: "מרכז",
  jerusalem: "ירושלים",
  south: "דרום",
}

export const REGION_VIEW: Record<Region | "all", [number, number, number]> = {
  all:       [31.9, 35.0, 8],
  north:     [32.95, 35.5, 10],
  haifa:     [32.82, 35.0, 11],
  center:    [32.07, 34.82, 11],
  jerusalem: [31.78, 35.22, 12],
  south:     [31.25, 34.79, 10],
}

export const PIZZERIAS: Pizzeria[] = [
  {
    id: "pizza halalit",
    name: "פיצה חללית",
    region: "haifa",
    city: "חיפה",
    address: "סירקין 12, חיפה",
    lat: 32.8104482,
    lng: 34.999648,
    description: "פיצרייה עם וייבים טובים וצעירים, פיצה ניו-יורקית בתנור אבן. תוספות מיוחדות ואופציות טבעוניות",
    hours: "ראשון–חמישי 18:00–22:00, שישי סגור, שבת 18:00–22:00",
    image: "/images/pizza map/pizza halalit.jpg",
  },
  {
    id: "teder",
    name: "פיצה תדר",
    region: "center",
    city: "תל אביב",
    address: "דרך יפו 9, תל אביב",
    lat: 32.0606806,
    lng: 34.76945,
    description: "פיצה מבית התדר ואייל שני. גדולה, איכותית, טעימה ומגיעה עם רטבים שמשדרגים אותה.",
    hours: "ראשון–חמישי 02:00–18:00, שישי–שבת 03:00–12:00",
    image: "/images/pizza map/teder-pizza.jpg",
  }
]
