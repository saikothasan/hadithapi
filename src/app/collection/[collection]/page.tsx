import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Search, Filter, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export const runtime = "edge"

interface HadithProps {
  id: number
  header: string
  hadith_english: string
  book: string
  refno: string
  bookName: string
  chapterName: string
}

// Add type interface for the hadith data
interface HadithData {
  hadith: Array<{
    id: number
    header: string
    hadith_english: string
    book: string
    refno: string
    bookName: string
    chapterName: string
  }>
}

interface CollectionPageProps {
  params: {
    collection: string
  }
  searchParams: {
    page?: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CollectionPageProps) {
  const { collection } = params

  // Validate collection name
  const validCollections = {
    bukhari: "Sahih Bukhari",
    muslim: "Sahih Muslim",
    abudawud: "Sunan Abu Dawud",
    ibnmajah: "Sunan Ibn Majah",
    tirmidhi: "Jami at-Tirmidhi",
  }

  if (!Object.keys(validCollections).includes(collection)) {
    return {
      title: "Collection Not Found",
      description: "The requested hadith collection could not be found.",
    }
  }

  const collectionName = validCollections[collection as keyof typeof validCollections]

  return {
    title: `${collectionName} - Hadith Collection`,
    description: `Browse the complete collection of hadiths from ${collectionName}. Access authentic narrations with full text and references.`,
    openGraph: {
      title: `${collectionName} - Hadith Collection`,
      description: `Browse the complete collection of hadiths from ${collectionName}. Access authentic narrations with full text and references.`,
      type: "website",
      url: `https://hadithapi.pages.dev/collection/${collection}`,
    },
    twitter: {
      card: "summary",
      title: `${collectionName} - Hadith Collection`,
      description: `Browse the complete collection of hadiths from ${collectionName}. Access authentic narrations with full text and references.`,
    },
  }
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { collection } = params
  const page = Number.parseInt(searchParams.page || "1")
  const limit = 10

  // Validate collection name
  const validCollections = {
    bukhari: "Sahih Bukhari",
    muslim: "Sahih Muslim",
    abudawud: "Sunan Abu Dawud",
    ibnmajah: "Sunan Ibn Majah",
    tirmidhi: "Jami at-Tirmidhi",
  }

  const collectionDescriptions = {
    bukhari:
      "Sahih al-Bukhari is a collection of hadith compiled by Imam Muhammad al-Bukhari. It is considered the most authentic collection of hadith.",
    muslim:
      "Sahih Muslim is a collection of hadith compiled by Imam Muslim ibn al-Hajjaj. It is considered one of the most authentic collections of hadith.",
    abudawud:
      "Sunan Abu Dawud is a collection of hadith compiled by Imam Abu Dawud Sulayman ibn al-Ash'ath. It is one of the six canonical hadith collections.",
    ibnmajah:
      "Sunan Ibn Majah is a collection of hadith compiled by Imam Muhammad ibn Yazid Ibn Majah. It is one of the six canonical hadith collections.",
    tirmidhi:
      "Jami at-Tirmidhi is a collection of hadith compiled by Imam Abu Isa Muhammad at-Tirmidhi. It is one of the six canonical hadith collections.",
  }

  if (!Object.keys(validCollections).includes(collection)) {
    notFound()
  }

  // Fetch the JSON file
  try {
    const response = await fetch(`https://hadithapi.pages.dev/${collection}.json`)

    if (!response.ok) {
      throw new Error(`Failed to fetch ${collection} collection`)
    }

    // Update the fetch response handling with type assertion
    const data = (await response.json()) as HadithData

    // Calculate pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const hadiths = data.hadith.slice(startIndex, endIndex)

    // Prepare pagination metadata
    const totalHadiths = data.hadith.length
    const totalPages = Math.ceil(totalHadiths / limit)

    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8">
          <Link
            href="/"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to collections
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 text-primary">
                {validCollections[collection as keyof typeof validCollections]}
              </h1>
              <p className="text-muted-foreground">
                Browsing hadiths {startIndex + 1}-{Math.min(endIndex, totalHadiths)} of {totalHadiths}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/search?collection=${collection}`}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Link>
              </Button>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="p-6 bg-primary/5 rounded-lg border border-primary/10 mb-8 shadow-sm">
            <h2 className="text-lg font-medium mb-2 text-primary">About this Collection</h2>
            <p className="text-muted-foreground">
              {collectionDescriptions[collection as keyof typeof collectionDescriptions]}
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {hadiths.map((hadith: HadithProps) => (
            <Card
              key={hadith.id}
              className="overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-md hover:border-primary/20"
            >
              <CardHeader className="bg-primary/5 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-primary" />
                      Hadith #{hadith.id}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{hadith.refno}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Link href={`/hadith/${collection}/${hadith.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {hadith.chapterName && (
                    <div>
                      <h3 className="text-sm font-medium text-primary mb-1">Chapter</h3>
                      <p className="text-foreground">{hadith.chapterName}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-medium text-primary mb-1">Hadith</h3>
                    <p className="text-foreground line-clamp-4">{hadith.hadith_english}</p>
                    {hadith.hadith_english.length > 300 && (
                      <Button variant="link" size="sm" asChild className="p-0 h-auto mt-2">
                        <Link href={`/hadith/${collection}/${hadith.id}`}>Read more</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Pagination className="mt-8">
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`/collection/${collection}?page=${page - 1}`} />
              </PaginationItem>
            )}

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around the current page
              let pageNum = page - 2 + i
              if (pageNum < 1) pageNum = i + 1
              if (pageNum > totalPages) pageNum = totalPages - (4 - i)

              if (pageNum > 0 && pageNum <= totalPages) {
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink href={`/collection/${collection}?page=${pageNum}`} isActive={pageNum === page}>
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              }
              return null
            })}

            {page < totalPages && (
              <PaginationItem>
                <PaginationNext href={`/collection/${collection}?page=${page + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: validCollections[collection as keyof typeof validCollections],
              description: collectionDescriptions[collection as keyof typeof collectionDescriptions],
              url: `https://hadithapi.pages.dev/collection/${collection}`,
              isPartOf: {
                "@type": "WebSite",
                name: "Hadith API",
                url: "https://hadithapi.pages.dev",
              },
              about: {
                "@type": "Book",
                name: validCollections[collection as keyof typeof validCollections],
              },
            }),
          }}
        />
      </div>
    )
  } catch (error) {
    console.error("Error reading hadiths:", error)
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4 text-primary">Error</h1>
        <p>Failed to load hadiths. Please try again later.</p>
      </div>
    )
  }
}

