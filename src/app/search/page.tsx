import type { Metadata } from "next"
import { Suspense } from "react"
import SearchClientPage from "./SearchClientPage"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Search Hadiths",
  description: "Search across all hadith collections or filter by specific criteria to find relevant hadiths.",
  openGraph: {
    title: "Search Hadiths - Hadith API",
    description: "Search across all hadith collections or filter by specific criteria to find relevant hadiths.",
    url: "https://hadithapi.pages.dev/search",
  },
  twitter: {
    card: "summary",
    title: "Search Hadiths - Hadith API",
    description: "Search across all hadith collections or filter by specific criteria to find relevant hadiths.",
  },
}

export default function SearchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Search Hadiths",
            description:
              "Search across all hadith collections or filter by specific criteria to find relevant hadiths.",
            url: "https://hadithapi.pages.dev/search",
            isPartOf: {
              "@type": "WebSite",
              name: "Hadith API",
              url: "https://hadithapi.pages.dev",
            },
          }),
        }}
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="sr-only">Search Hadiths</h1>
        <Suspense fallback={<SearchSkeleton />}>
          <SearchClientPage />
        </Suspense>
      </div>
    </>
  )
}

function SearchSkeleton() {
  return (
    <div>
      <div className="mb-8">
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-10 w-64 mb-6" />

        <div className="p-6 bg-primary/5 rounded-lg border border-primary/10 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="bg-muted/50">
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-24 mt-2" />
                </div>
                <Skeleton className="h-9 w-28" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

