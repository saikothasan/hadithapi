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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const collection = searchParams.get("collection")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
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
      allResults = searchInCollection(data.hadith, query, collection)
    } else {
      // Search in all collections
      for (const col of validCollections) {
        const response = await fetch(`${baseUrl}/${col}.json`)

        if (!response.ok) {
          console.error(`Failed to retrieve ${col} collection`)
          continue
        }

        const data = (await response.json()) as HadithData
        const results = searchInCollection(data.hadith, query, col)
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

function searchInCollection(hadiths: any[], query: string, collectionName: string) {
  const lowerQuery = query.toLowerCase()

  return hadiths
    .filter((hadith) => {
      return (
        (hadith.hadith_english && hadith.hadith_english.toLowerCase().includes(lowerQuery)) ||
        (hadith.chapterName && hadith.chapterName.toLowerCase().includes(lowerQuery))
      )
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

