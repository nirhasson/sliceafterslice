import type { Metadata } from "next"
import { ContactClient } from "./contact-client"

export const metadata: Metadata = {
  title: "צור קשר | Slice After Slice",
  description: "יש לך שאלה, רעיון לשיתוף פעולה, או סקירת פיצרייה? נשמח לשמוע — צרו קשר עם צוות Slice After Slice.",
}

export default function ContactPage() {
  return <ContactClient />
}
