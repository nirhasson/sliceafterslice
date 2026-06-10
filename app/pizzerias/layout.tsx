import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "מדריך הפיצריות של ישראל | Slice After Slice",
  description: "אנחנו אוספים עבורכם את הפיצריות המומלצות, האיכותיות והמקוריות ביותר בארץ. היכנסו למפה המלאה!",
}

export default function PizzeriasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
