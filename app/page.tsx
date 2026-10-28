import type { Metadata } from "next"
import { Home } from "@/components/pizza/home"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return <Home />
}
