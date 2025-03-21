import type { Metadata } from "next"
import SearchClientPage from "./SearchClientPage"

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
        <SearchClientPage />
      </div>
    </>
  )
}

