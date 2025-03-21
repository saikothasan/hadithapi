import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import Script from "next/script"
import { Github, Book, Code, Search } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { Toaster } from "@/components/toaster"
import { AnalyticsProvider } from "@/components/analytics-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    default: "Hadith API - Access Authentic Hadith Collections",
    template: "%s | Hadith API",
  },
  description: "Access authentic hadiths from major collections through our simple API or browse them directly.",
  keywords: [
    "hadith",
    "api",
    "islam",
    "islamic",
    "quran",
    "sunnah",
    "bukhari",
    "muslim",
    "abudawud",
    "ibnmajah",
    "tirmidhi",
  ],
  authors: [{ name: "Hadith API Team" }],
  creator: "Hadith API",
  publisher: "Hadith API",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://hadithapi.pages.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hadithapi.pages.dev",
    title: "Hadith API - Access Authentic Hadith Collections",
    description: "Access authentic hadiths from major collections through our simple API or browse them directly.",
    siteName: "Hadith API",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hadith API - Access Authentic Hadith Collections",
    description: "Access authentic hadiths from major collections through our simple API or browse them directly.",
    creator: "@hadithapi",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION_ID", // Replace with your actual verification ID
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AnalyticsProvider>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center px-4">
                  <Link href="/" className="font-bold text-xl flex items-center text-primary">
                    <Book className="h-5 w-5 mr-2" />
                    Hadith API
                  </Link>
                  <nav className="hidden md:flex ml-10 gap-6">
                    <Link
                      href="/collection/bukhari"
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      Bukhari
                    </Link>
                    <Link
                      href="/collection/muslim"
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      Muslim
                    </Link>
                    <Link
                      href="/collection/abudawud"
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      Abu Dawud
                    </Link>
                    <Link
                      href="/collection/ibnmajah"
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      Ibn Majah
                    </Link>
                    <Link
                      href="/collection/tirmidhi"
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      Tirmidhi
                    </Link>
                  </nav>
                  <div className="ml-auto flex items-center gap-2">
                    <Link
                      href="/search"
                      className="hidden md:flex text-sm font-medium hover:text-primary transition-colors mr-4"
                    >
                      <Search className="h-4 w-4 mr-1" />
                      Search
                    </Link>
                    <Link
                      href="/docs"
                      className="hidden md:flex text-sm font-medium hover:text-primary transition-colors mr-4"
                    >
                      <Code className="h-4 w-4 mr-1" />
                      API
                    </Link>
                    <Link
                      href="/about"
                      className="hidden md:flex text-sm font-medium hover:text-primary transition-colors mr-4"
                    >
                      About
                    </Link>
                    <div className="hidden md:flex items-center gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href="https://github.com/saikothasan/hadithapi" target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </Link>
                      </Button>
                      <ModeToggle />
                    </div>
                    <MobileNav />
                  </div>
                </div>
              </header>
              <main className="flex-1">{children}</main>
              <footer className="border-t py-12 bg-muted/40">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                      <Link href="/" className="font-bold text-xl flex items-center text-primary mb-4">
                        <Book className="h-5 w-5 mr-2" />
                        Hadith API
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        Access authentic hadiths from major collections through our simple API or browse them directly.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-4">Collections</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/collection/bukhari"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            Sahih Bukhari
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/collection/muslim"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            Sahih Muslim
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/collection/abudawud"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            Sunan Abu Dawud
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/collection/ibnmajah"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            Sunan Ibn Majah
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/collection/tirmidhi"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            Jami at-Tirmidhi
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-4">Resources</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/docs"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            API Documentation
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/search"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            Search
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/about"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            About
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="https://github.com/saikothasan/hadithapi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            GitHub
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-4">Legal</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/terms"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            Terms of Service
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/privacy"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            Privacy Policy
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/license"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            License
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t text-center">
                    <p className="text-sm text-muted-foreground">
                      © {new Date().getFullYear()} Hadith API. All rights reserved.
                    </p>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster />
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'