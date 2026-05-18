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
  // Ganti dengan domain asli Anda saat production
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://kwt-dorang-cinta.vercel.app/"
  ),
  title: {
    default: "KWT Dorang Cinta | Urban Farming & Hidroponik Modern",
    template: "%s | KWT Dorang Cinta", // Otomatis menambahkan nama web di halaman lain
  },
  description:
    "Website resmi KWT Dorang Cinta - Solusi Urban Farming dan Hidroponik Modern untuk menghasilkan sayuran sehat di Surabaya.",
  keywords: [
    "KWT Dorang Cinta",
    "Urban Farming",
    "Hidroponik",
    "Sayuran Sehat",
    "Pertanian Perkotaan",
    "UMKM Surabaya",
  ],
  authors: [{ name: "KWT Dorang Cinta" }],
  creator: "KWT Dorang Cinta",

  verification: {
    google: "qo8Wz2aiLMonKZKOtoJEQIeGSsDRS6zfbJhnIxAL8XM",
  },

  // Open Graph untuk share di WhatsApp, Facebook, dll
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "KWT Dorang Cinta | Urban Farming & Hidroponik Modern",
    description: "Website resmi KWT Dorang Cinta - Urban Farming dan Hidroponik Modern",
    siteName: "KWT Dorang Cinta",
    images: [
      {
        url: "/bg-hero.jpg", // Pastikan Anda menaruh file bg-hero.jpg di folder /public
        width: 1200,
        height: 630,
        alt: "KWT Dorang Cinta Preview",
      },
    ],
  },

  // Twitter Card untuk share di X/Twitter
  twitter: {
    card: "summary_large_image",
    title: "KWT Dorang Cinta | Urban Farming & Hidroponik Modern",
    description: "Website resmi KWT Dorang Cinta - Urban Farming dan Hidroponik Modern",
    images: ["/bg-hero.jpg"],
  },

  // Aturan untuk Search Engine Bot
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}