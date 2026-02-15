"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Language = "he" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  he: {
    // Header
    siteName: "Slice After Slice",
    tagline: "מגזין הפיצה של ישראל",
    footer: "EST. 2026",

    // Navigation
    rescue: "הצלת בצק",
    calculator: "מחשבון",
    blog: "בלוג",

    // Pizza Styles
    neapolitan: "נפוליטנית",
    newYork: "ניו יורק",
    roman: "רומית (אל טליו)",
    newHaven: "ניו הייבן (אפיצה)",
    detroit: "דטרויט",
    sicilian: "סיציליאנית",

    // Calculator
    backToMenu: "חזרה לתפריט",
    ballWeight: "משקל כדור בצק",
    numberOfBalls: "מספר כדורים",
    grams: "גרם",
    balls: "כדורים",
    ingredients: "מרכיבים",
    flour: "קמח",
    water: "מים",
    salt: "מלח",
    yeast: "שמרים",
    oil: "שמן",
    sugar: "סוכר",
    kneading: "לישה",
    technique: "טכניקה",
    duration: "משך זמן",
    tips: "טיפים",
    proofing: "תפיחה",
    roomTemp: "טמפרטורת חדר",
    coldProof: "תפיחה קרה",
    baking: "אפייה",
    temperature: "טמפרטורה",
    ovenType: "סוג תנור",
    bakingTime: "זמן אפייה",
    videoTutorials: "מדריכי וידאו",
    shareRecipe: "שתף מתכון",

    // Rescue
    rescueTitle: "הצלת בצק",
    rescueDescription: "תיקון טעויות נפוצות בהכנת בצק",
    selectProblem: "בחר את הבעיה",
    tooMuchWater: "הוספתי יותר מדי מים",
    tooMuchFlour: "הוספתי יותר מדי קמח",
    forgotSalt: "שכחתי להוסיף מלח",
    tooSticky: "הבצק דביק מדי",
    actualFlour: "כמות קמח בפועל",
    actualWater: "כמות מים בפועל",
    targetStyle: "סגנון יעד",
    calculateSolution: "חשב פתרון",
    solutions: "פתרונות",

    // Blog
    blogComingSoon: "בקרוב...",
    blogDescription: "המדריך המקיף לכל מה שקשור לפיצה - ממתכונים למדריכי טכניקות",
    blogExpectations: "מה לצפות",
    blogRecipes: "מתכונים מפורטים",
    blogRecipesDesc: "מתכונים צעד אחר צעד לכל סוגי הפיצות",
    blogTechniques: "מדריכי טכניקות",
    blogTechniquesDesc: "שולט באומנות עיצוב והשלכת בצק",
    blogIngredients: "מדריכי מרכיבים",
    blogIngredientsDesc: "בחר את הקמח, השמרים והרכיבים הטובים ביותר",

    // Newsletter
    newsletter: {
      title: "כל הדברים הכי טעימים בעולם הפיצה",
      subtitle: "הירשמו לקבלת עידכונים, הטבות ודברים מעניינים",
      placeholder: "האימייל שלך",
      button: "הרשמה",
      privacy: "ניתן להסרה בכל עת, מבטיחים לא להטריד",
      success: "תודה שנרשמת! תקבל את הניוזלטר הבא שלנו בקרוב.",
      error: "אנא הזן כתובת אימייל תקינה",
    },

    // Footer
    footerTitle: "סלייס אחרי סלייס",
    footerYear: "EST. 2026",
  },
  en: {
    // Header
    siteName: "Slice After Slice",
    tagline: "Perfect Pizza — Every Time",
    footer: "EST. 2026",

    // Navigation
    rescue: "Dough Rescue",
    calculator: "Calculator",
    blog: "Blog",

    // Pizza Styles
    neapolitan: "Neapolitan",
    newYork: "New York",
    roman: "Roman (Al Taglio)",
    newHaven: "New Haven (Apizza)",
    detroit: "Detroit",
    sicilian: "Sicilian",

    // Calculator
    backToMenu: "Back to Menu",
    ballWeight: "Ball Weight",
    numberOfBalls: "Number of Balls",
    grams: "grams",
    balls: "balls",
    ingredients: "Ingredients",
    flour: "Flour",
    water: "Water",
    salt: "Salt",
    yeast: "Yeast",
    oil: "Oil",
    sugar: "Sugar",
    kneading: "Kneading",
    technique: "Technique",
    duration: "Duration",
    tips: "Tips",
    proofing: "Proofing",
    roomTemp: "Room Temperature",
    coldProof: "Cold Proof",
    baking: "Baking",
    temperature: "Temperature",
    ovenType: "Oven Type",
    bakingTime: "Baking Time",
    videoTutorials: "Video Tutorials",
    shareRecipe: "Share Recipe",

    // Rescue
    rescueTitle: "Dough Rescue",
    rescueDescription: "Fix common dough-making mistakes",
    selectProblem: "Select Your Problem",
    tooMuchWater: "Added too much water",
    tooMuchFlour: "Added too much flour",
    forgotSalt: "Forgot to add salt",
    tooSticky: "Dough is too sticky",
    actualFlour: "Actual Flour Amount",
    actualWater: "Actual Water Amount",
    targetStyle: "Target Style",
    calculateSolution: "Calculate Solution",
    solutions: "Solutions",

    // Blog
    blogComingSoon: "Coming Soon...",
    blogDescription: "Your comprehensive guide to all things pizza - from recipes to technique guides",
    blogExpectations: "What to Expect",
    blogRecipes: "Detailed Recipes",
    blogRecipesDesc: "Step-by-step recipes for every pizza style",
    blogTechniques: "Technique Guides",
    blogTechniquesDesc: "Master the art of shaping and stretching dough",
    blogIngredients: "Ingredient Guides",
    blogIngredientsDesc: "Choose the best flour, yeast, and toppings",

    // Newsletter
    newsletter: {
      title: "Join the Pizza Community",
      subtitle: "Get weekly recipes, tips, and tricks delivered to your inbox",
      placeholder: "your@email.com",
      button: "Subscribe",
      privacy: "No spam, unsubscribe anytime. We respect your privacy.",
      success: "Thanks for subscribing! You'll receive our next newsletter soon.",
      error: "Please enter a valid email address",
    },

    // Footer
    footerTitle: "SLICE AFTER SLICE",
    footerYear: "EST. 2026",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("he")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved) setLanguageState(saved)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr"
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return the key if not found
      }
    }

    return typeof value === 'string' ? value : key
  }

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === "he" ? "rtl" : "ltr"
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within LanguageProvider")
  return context
}
