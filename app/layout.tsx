import React from "react"
import type { Metadata } from 'next'
import { Heebo, Assistant, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import './globals.css'
import { GoogleTagManager } from '@next/third-parties/google'

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
  title: 'Slice After Slice - מגזין הפיצה של ישראל - מתכונים, מחשבון פיצה ומאמרים',
  description: 'מחשבון בצק מקצועי, מדריכי אפייה וקהילת פיצה. כל מה שחובב פיצה צריך לדעת.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/favicon-96x96.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/web-app-manifest-192x192.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: 'web-app-manifest-512x512.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl">
      {/* הוספת Google Tag Manager */}
      <GoogleTagManager gtmId="GTM-PRK5KZPW" />
      <body className={`${heebo.variable} ${assistant.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}