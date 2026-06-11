import type { Metadata } from "next"
import { PIZZERIAS } from "@/lib/pizzeria-data"

export const metadata: Metadata = {
  title: "מדריך הפיצריות של ישראל | Slice After Slice",
  description: "אנחנו אוספים עבורכם את הפיצריות המומלצות, האיכותיות והמקוריות ביותר בארץ. היכנסו למפה המלאה!",
}

export default function PizzeriasLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "מדריך הפיצריות המומלצות של ישראל",
    "url": "https://sliceafterslice.co.il/pizzerias",
    "itemListElement": PIZZERIAS.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Restaurant",
        "name": p.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": p.address,
          "addressLocality": p.city,
          "addressCountry": "IL"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": p.lat,
          "longitude": p.lng
        },
        "description": p.description,
        "servesCuisine": "Pizza",
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
