"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HadithActions } from "@/components/hadith-actions"
import { trackHadithView } from "@/lib/analytics"

interface HadithPageProps {
  params: {
    collection: string
    id: string
  }
}

// Create a client component for tracking
function HadithViewTracker({ collection, id }: { collection: string; id: number }) {
  useEffect(() => {
    trackHadithView(collection, id)
  }, [collection, id])

  return null
}

export default function HadithClientPage({ params }: HadithPageProps) {
  const { collection, id } = params
  const idNumber = Number.parseInt(id)

  // Validate collection name
  const validCollections = {
    bukhari: "Sahih Bukhari",
    muslim: "Sahih Muslim",
    abudawud: "Sunan Abu Dawud",
    ibnmajah: "Sunan Ibn Majah",
    tirmidhi: "Jami at-Tirmidhi",
  }

  if (!Object.keys(validCollections).includes(collection)) {
    notFound()
  }

  // Validate ID ranges based on collection
  const maxIds = {
    bukhari: 7563,
    muslim: 3032,
    abudawud: 3998,
    ibnmajah: 4342,
    tirmidhi: 3956,
  }

  if (isNaN(idNumber) || idNumber < 1 || idNumber > maxIds[collection as keyof typeof maxIds]) {
    notFound()
  }

  try {
    // Fetch the JSON file
    const response = fetch(`https://hadithapi.pages.dev/${collection}.json`).then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch ${collection} collection`)
      }
      return res.json()
    })

    // Also update the fetch response handling with type assertion in the main component
    const dataPromise = response as Promise<{ hadith: Array<any> }>

    return dataPromise
      .then((data) => {
        // Find the hadith with the matching ID
        const hadith = data.hadith.find((h: any) => h.id === idNumber)

        if (!hadith) {
          notFound()
        }

        // Find previous and next hadith IDs
        const prevId = idNumber > 1 ? idNumber - 1 : null
        const nextId = idNumber < maxIds[collection as keyof typeof maxIds] ? idNumber + 1 : null

        return (
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <HadithViewTracker collection={collection} id={idNumber} />
            <div className="mb-8">
              <Link
                href={`/collection/${collection}`}
                className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to {validCollections[collection as keyof typeof validCollections]}
              </Link>
              <h1 className="text-3xl font-bold tracking-tight mb-2 text-primary">Hadith #{hadith.id}</h1>
              <p className="text-muted-foreground">{hadith.refno}</p>
            </div>

            <Card className="mb-8 overflow-hidden border-primary/10 shadow-lg">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="text-primary">{hadith.book}</CardTitle>
                {hadith.bookName && <p className="text-sm text-muted-foreground">{hadith.bookName.trim()}</p>}
              </CardHeader>
              <CardContent className="pt-6 px-6 md:px-8">
                <div className="space-y-6">
                  {hadith.chapterName && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Chapter</h3>
                      <p className="text-lg font-medium">{hadith.chapterName}</p>
                    </div>
                  )}
                  {hadith.header && (
                    <div className="p-4 bg-muted/30 rounded-lg border border-muted">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Narration Chain</h3>
                      <p className="text-md italic">{hadith.header}</p>
                    </div>
                  )}
                  <div className="py-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Hadith</h3>
                    <p className="text-lg leading-relaxed">{hadith.hadith_english}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-4 border-t p-4 bg-muted/5">
                <HadithActions
                  hadith={{
                    id: hadith.id,
                    collection: collection,
                    refno: hadith.refno,
                    hadith_english: hadith.hadith_english,
                    chapterName: hadith.chapterName,
                  }}
                />

                <div className="flex gap-2">
                  {prevId && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/hadith/${collection}/${prevId}`} className="group">
                        <ChevronLeft className="h-4 w-4 mr-1 group-hover:text-primary transition-colors" />
                        Previous
                      </Link>
                    </Button>
                  )}
                  {nextId && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/hadith/${collection}/${nextId}`} className="group">
                        Next
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:text-primary transition-colors" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>

            <div className="border rounded-lg p-6 bg-muted/5 shadow-md">
              <h2 className="text-xl font-bold mb-4 text-primary">API Endpoint</h2>
              <code className="block bg-background p-4 rounded-md border">
                GET /api/{collection}/{hadith.id}
              </code>
              <div className="mt-4 flex gap-2">
                <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
                  <a href={`/api/${collection}/${hadith.id}`} target="_blank" rel="noopener noreferrer">
                    Try API
                  </a>
                </Button>
              </div>
            </div>

            {/* Structured data for SEO */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Article",
                  headline: `${hadith.refno} - ${hadith.chapterName || "Hadith"}`,
                  description: hadith.hadith_english,
                  author: {
                    "@type": "Person",
                    name: hadith.book,
                  },
                  publisher: {
                    "@type": "Organization",
                    name: "Hadith API",
                    logo: {
                      "@type": "ImageObject",
                      url: "https://hadithapi.pages.dev/logo.png",
                    },
                  },
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": `https://hadithapi.pages.dev/hadith/${collection}/${id}`,
                  },
                }),
              }}
            />
          </div>
        )
      })
      .catch((error) => {
        console.error("Error reading hadith:", error)
        return (
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold tracking-tight mb-4 text-primary">Error</h1>
            <p>Failed to load hadith. Please try again later.</p>
          </div>
        )
      })
  } catch (error) {
    console.error("Error reading hadith:", error)
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4 text-primary">Error</h1>
        <p>Failed to load hadith. Please try again later.</p>
      </div>
    )
  }
}

