import React from "react"
import type { Metadata } from 'next'
import { Heebo, Assistant, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import './globals.css'

const heebo = Heebo({ 
  subsets: ["latin", "hebrew"], 
  variable: '--font-display',
  weight: ['400', '700', '800', '900']
});
const assistant = Assistant({ 
  subsets: ["latin", "hebrew"], 
  variable: '--font-sans',
  weight: ['400', '600', '700']
});
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-mono' });
const spaceGrotesk = { variable: '--font-space-grotesk' }; // Declaring the spaceGrotesk variable

export const metadata: Metadata = {
  title: 'סלייס אחרי סלייס - פיצה מושלמת בכל פעם',
  description: 'מחשבון בצק מקצועי, מדריכי אפייה וקהילת פיצה. שלוט באומנות הפיצה הביתית.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} ${assistant.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
