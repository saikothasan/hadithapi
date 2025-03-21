import type { Metadata } from "next"
import { ResponsiveFeatures } from "@/components/responsive-features"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Smartphone, Tablet, Laptop, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Responsive Design - Hadith API",
  description: "Experience the Hadith API on any device with our fully responsive design.",
}

export default function ResponsivePage() {
  return (
    <div>
      <div className="bg-primary/5 border-b">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-primary">Responsive Design</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Access authentic hadiths on any device with our fully responsive interface that adapts to your screen
              size.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/search">
                  Try the Search
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/docs">View Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ResponsiveFeatures />

      <div className="bg-muted/20 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-primary">Optimized for Every Device</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our interface adapts seamlessly to provide the best experience no matter what device you're using.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="bg-background rounded-lg p-6 border shadow-sm text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Mobile</h3>
              <p className="text-muted-foreground">
                Optimized for one-handed use with touch-friendly controls and streamlined navigation.
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 border shadow-sm text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                <Tablet className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Tablet</h3>
              <p className="text-muted-foreground">
                Perfect for reading with a balanced layout that takes advantage of the larger screen.
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 border shadow-sm text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                <Laptop className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Desktop</h3>
              <p className="text-muted-foreground">
                Full-featured experience with advanced search options and multi-column layouts.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Experience It Yourself</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Try our responsive interface on different devices and see how it adapts to provide the best experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/search">Try the Search</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/collection/bukhari">Browse Collections</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

