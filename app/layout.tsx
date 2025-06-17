import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Εξάσκηση ΑΣΕΠ 2025 | Quiz Προετοιμασίας",
    template: "%s | ΑΣΕΠ 2025",
  },
  description:
    "Διαδραστικό quiz για την προετοιμασία υποψηφίων στις εξετάσεις ΑΣΕΠ 2025. Υποστήριξη για κινητές συσκευές και πολυγλωσσικό περιβάλλον.",
  applicationName: "ΑΣΕΠ Quiz",
  generator: "geotsa/ASEP Quiz Builder v1.0 (Next.js)",
  metadataBase: new URL("https://asep2025.otter-verse.com"),
  openGraph: {
    title: "Εξάσκηση ΑΣΕΠ 2025 | Quiz Προετοιμασίας",
    description: "Παίξε quiz εξάσκησης για τον ΑΣΕΠ 2025. Κατηγορίες: Παιδεία, Δίκαιο, Οικονομικά και άλλα.",
    url: "https://asep2025.otter-verse.com",
    siteName: "ΑΣΕΠ Quiz",
    images: ["/og-image.png"],
    locale: "el_GR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ΑΣΕΠ Quiz",
    description: "Δωρεάν quiz για εξάσκηση στις εξετάσεις ΑΣΕΠ 2025.",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ΑΣΕΠ Quiz",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const themeColor = "#2563eb"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="el">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#2563eb" />

        {/* PWA & Icons */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ΑΣΕΠ Quiz" />

        {/* SEO: Language alternates */}
        <link rel="alternate" hreflang="el" href="https://asep2025.otter-verse.com" />
        <link rel="alternate" hreflang="en" href="https://asep2025.otter-verse.com" />
        <meta name="keywords" content="ΑΣΕΠ, ΑΣΕΠ 2025, quiz, εξάσκηση, προετοιμασία, δημόσιο, τεστ, Παιδεία, Δίκαιο, Οικονομικά" />


        {/* OG + Twitter extras */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="el_GR" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:image" content="/og-image.png" />

        {/* Structured Data (WebApplication) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "ΑΣΕΠ Quiz",
              "applicationCategory": "EducationApplication",
              "operatingSystem": "All",
              "url": "https://asep2025.otter-verse.com",
              "description":
                "Διαδραστικό quiz εξάσκησης για υποψηφίους του ΑΣΕΠ 2025. Παίξε με ερωτήσεις πολλαπλής επιλογής από Παιδεία, Δίκαιο, Οικονομικά και άλλα.",
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
