import type { Metadata } from "next"
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "KWT Dorang Cinta",
  description:
    "Website resmi KWT Dorang Cinta - Urban Farming dan Hidroponik Modern",
  keywords: [
    "KWT Dorang Cinta",
    "Urban Farming",
    "Hidroponik",
    "Sayuran Sehat",
    "Pertanian Perkotaan",
    "UMKM Surabaya",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${montserrat.variable} ${plusJakartaSans.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
        <Toaster
          richColors
          position="top-right"
        />
      </body>
    </html>
  )
}