import { type NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

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

// Improve error handling in the search API

// Update the error handling in the GET function
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const collection = searchParams.get("collection")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const exact = searchParams.get("exact") === "true"
  const narrator = searchParams.get("narrator")
  const bookName = searchParams.get("bookName")
  const chapterName = searchParams.get("chapterName")
  const excludeTerms = searchParams.get("exclude")
  const baseUrl = new URL(request.url).origin

  // Validate query
  if (!query || query.trim().length === 0) {
    return NextResponse.json({ error: "Search query is required" }, { status: 400 })
  }

  // Validate collection if provided
  const validCollections = ["bukhari", "muslim", "abudawud", "ibnmajah", "tirmidhi"]
  if (collection && !validCollections.includes(collection)) {
    return NextResponse.json({ error: "Invalid collection name" }, { status: 400 })
  }

  // Validate pagination parameters
  if (isNaN(page) || page < 1) {
    return NextResponse.json({ error: "Page must be a positive integer" }, { status: 400 })
  }

  if (isNaN(limit) || limit < 1 || limit > 100) {
    return NextResponse.json({ error: "Limit must be between 1 and 100" }, { status: 400 })
  }

  try {
    let allResults: any[] = []

    // Update the fetch response handling with type assertion in the collection search
    if (collection) {
      const response = await fetch(`${baseUrl}/${collection}.json`)

      if (!response.ok) {
        return NextResponse.json({ error: `Failed to retrieve ${collection} collection` }, { status: 500 })
      }

      const data = (await response.json()) as HadithData
      allResults = searchInCollection(
        data.hadith,
        query,
        collection,
        exact,
        narrator,
        bookName,
        chapterName,
        excludeTerms,
      )
    } else {
      // Search in all collections
      for (const col of validCollections) {
        const response = await fetch(`${baseUrl}/${col}.json`)

        if (!response.ok) {
          console.error(`Failed to retrieve ${col} collection`)
          continue
        }

        const data = (await response.json()) as HadithData
        const results = searchInCollection(
          data.hadith,
          query,
          col,
          exact,
          narrator,
          bookName,
          chapterName,
          excludeTerms,
        )
        allResults = [...allResults, ...results]
      }
    }

    // Sort results by relevance (simple implementation)
    allResults.sort((a, b) => {
      const aScore = countOccurrences(a.hadith_english.toLowerCase(), query.toLowerCase())
      const bScore = countOccurrences(b.hadith_english.toLowerCase(), query.toLowerCase())
      return bScore - aScore
    })

    // Calculate pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedResults = allResults.slice(startIndex, endIndex)

    // Prepare pagination metadata
    const totalResults = allResults.length
    const totalPages = Math.ceil(totalResults / limit)

    return NextResponse.json({
      results: paginatedResults,
      pagination: {
        total: totalResults,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    })
  } catch (error) {
    console.error("Error searching hadiths:", error)
    return NextResponse.json({ error: "Failed to search hadiths" }, { status: 500 })
  }
}

// Update the searchInCollection function to handle additional filters
function searchInCollection(
  hadiths: any[],
  query: string,
  collectionName: string,
  exact = false,
  narrator?: string | null,
  bookName?: string | null,
  chapterName?: string | null,
  excludeTerms?: string | null,
) {
  const lowerQuery = query.toLowerCase()
  const excludeArray = excludeTerms
    ? excludeTerms
        .toLowerCase()
        .split(",")
        .map((term) => term.trim())
    : []

  return hadiths
    .filter((hadith) => {
      // Check if hadith matches the main query
      const matchesQuery = exact
        ? (hadith.hadith_english && hadith.hadith_english.toLowerCase().includes(lowerQuery)) ||
          (hadith.chapterName && hadith.chapterName.toLowerCase().includes(lowerQuery))
        : (hadith.hadith_english && hadith.hadith_english.toLowerCase().includes(lowerQuery)) ||
          (hadith.chapterName && hadith.chapterName.toLowerCase().includes(lowerQuery))

      // Check if hadith matches narrator filter
      const matchesNarrator =
        !narrator || !narrator.trim() || (hadith.header && hadith.header.toLowerCase().includes(narrator.toLowerCase()))

      // Check if hadith matches book name filter
      const matchesBookName =
        !bookName ||
        !bookName.trim() ||
        (hadith.bookName && hadith.bookName.toLowerCase().includes(bookName.toLowerCase()))

      // Check if hadith matches chapter name filter
      const matchesChapterName =
        !chapterName ||
        !chapterName.trim() ||
        (hadith.chapterName && hadith.chapterName.toLowerCase().includes(chapterName.toLowerCase()))

      // Check if hadith contains any excluded terms
      const containsExcludedTerms =
        excludeArray.length > 0 &&
        excludeArray.some(
          (term) =>
            (hadith.hadith_english && hadith.hadith_english.toLowerCase().includes(term)) ||
            (hadith.chapterName && hadith.chapterName.toLowerCase().includes(term)),
        )

      return matchesQuery && matchesNarrator && matchesBookName && matchesChapterName && !containsExcludedTerms
    })
    .map((hadith) => ({
      ...hadith,
      collection: collectionName,
    }))
}

function countOccurrences(text: string, searchString: string): number {
  let count = 0
  let position = text.indexOf(searchString)

  while (position !== -1) {
    count++
    position = text.indexOf(searchString, position + 1)
  }

  return count
}

